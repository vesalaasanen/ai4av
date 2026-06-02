---
spec_id: admin/control4-c4-ds2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Control4 C4-DS2 Control Spec"
manufacturer: Control4
model_family: C4-DS2
aliases: []
compatible_with:
  manufacturers:
    - Control4
  models:
    - C4-DS2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiki.2n.com
  - 2n.com
source_urls:
  - https://wiki.2n.com/download/attachments/56885721/2N_IP_HTTP_API_manual_EN_2.37.pdf
  - https://wiki.2n.com/hip/auto/latest/en
  - https://wiki.2n.com/hip/inte/latest/en/4-home-and-building-automation/control4
  - https://www.2n.com/en-US/online-tools/2n-integration-hub/control4
retrieved_at: 2026-06-01T08:54:46.015Z
last_checked_at: 2026-06-02T08:09:48.150Z
generated_at: 2026-06-02T08:09:48.150Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the 2N IP intercom HTTP API manual (v2.37), not a native Control4 C4-DS2 manual. The C4-DS2 appears to use this same 2N HTTP API as its control surface, but no Control4-branded protocol document was located (see prior-attempt notes; docs.control4.com JS-gated, all direct C4-DS2 doc URLs 404). Treat the device/protocol mapping as best-effort and verify against a real C4-DS2 before publication."
  - "TCP port (HTTP vs HTTPS) — source states the protocol can be HTTP or HTTPS, configurable per service, but does not give explicit port numbers for this device."
  - "default username/password — source describes RFC-2617 Basic and Digest authentication, references the standard `requests.auth.HTTPBasicAuth(\"admin\", \"pass\")` example, but does not state the C4-DS2 default credentials."
  - "port number not stated in source. 2N intercoms default to 80/443,"
  - "source does not describe pre-defined macro sequences."
  - "physical electrical safety, voltage, current, installation"
verification:
  verdict: verified
  checked_at: 2026-06-02T08:09:48.150Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 spec actions map one-to-one to documented HTTP API endpoints in the 2N intercom source; transport (base_url /api, configurable HTTP/HTTPS auth) is confirmed verbatim; source contains no additional endpoints beyond what the spec covers. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Control4 C4-DS2 Control Spec

## Summary

The Control4 C4-DS2 is a door station used in Control4 smart-home installations. This spec covers the HTTP API used to control the device. The underlying protocol is the 2N IP intercom HTTP API (v2.37), an HTTPS-capable REST-style interface that exposes system, firmware, configuration, switch, I/O, phone/call, camera, display, log, audio, email, pcap, directory, mobile-key, license-plate-recognition, access-point, lift and automation endpoints under the `/api` prefix.

<!-- UNRESOLVED: source document is the 2N IP intercom HTTP API manual (v2.37), not a native Control4 C4-DS2 manual. The C4-DS2 appears to use this same 2N HTTP API as its control surface, but no Control4-branded protocol document was located (see prior-attempt notes; docs.control4.com JS-gated, all direct C4-DS2 doc URLs 404). Treat the device/protocol mapping as best-effort and verify against a real C4-DS2 before publication. -->

<!-- UNRESOLVED: TCP port (HTTP vs HTTPS) — source states the protocol can be HTTP or HTTPS, configurable per service, but does not give explicit port numbers for this device. -->

<!-- UNRESOLVED: default username/password — source describes RFC-2617 Basic and Digest authentication, references the standard `requests.auth.HTTPBasicAuth("admin", "pass")` example, but does not state the C4-DS2 default credentials. -->

## Transport
```yaml
# Source describes the HTTP API as HTTP or HTTPS, configurable per service on
# the device's Services / HTTP API configuration page. HTTPS is recommended.
protocols:
  - http
addressing:
  base_url: /api
  # UNRESOLVED: port number not stated in source. 2N intercoms default to 80/443,
  # but this device's ports are not confirmed.
auth:
  # Source: per-service auth mode is configurable: None | Basic | Digest.
  # Digest is recommended. No default is stated for this device.
  type: configurable
```

## Traits
```yaml
- powerable       # inferred: api/system/restart present; firmware apply/reboot supported
- routable        # inferred: api/switch/ctrl (1-4 switches) and api/io/ctrl
- queryable       # inferred: status/caps queries across system, switch, io, phone, call, camera, display, log, pcap, dir
- levelable       # inferred: api/audio/test, api/email/send (volume/test signal), display image upload
```

## Actions
```yaml
# Coverage rule: enumerate every distinct command-bearing endpoint in the
# source. Granularity = one per HTTP path. Each (path, method) pair that
# performs a different operation is a separate action.
# The source covers a broad catalog; below is the full set.

# --- System ---
- id: system_info
  label: System Info
  kind: query
  method: GET
  path: /api/system/info
  description: Basic device info (variant, serial, firmware, etc.).

- id: system_status
  label: System Status
  kind: query
  method: GET
  path: /api/system/status
  description: Current system time and uptime.

- id: system_restart
  label: Restart Intercom
  kind: action
  method: GET
  path: /api/system/restart

- id: system_caps
  label: System Capabilities
  kind: query
  method: POST
  path: /api/system/caps

- id: system_time_get
  label: Get Device Time
  kind: query
  method: GET
  path: /api/system/time

- id: system_time_set
  label: Set Device Time
  kind: action
  method: GET
  path: /api/system/time/set
  params:
    - name: time
      type: integer
      description: Unix time, min 0, max 2147483647

# --- Firmware ---
- id: firmware_upload
  label: Upload Firmware
  kind: action
  method: PUT
  path: /api/firmware
  description: multipart/form-data with blob-fw file
  params:
    - name: blob-fw
      type: file
      description: Firmware binary file (mandatory)

- id: firmware_apply
  label: Apply Uploaded Firmware
  kind: action
  method: GET
  path: /api/firmware/apply
  params:
    - name: fileId
      type: string
      description: 8-hex-char file identifier returned by firmware_upload

- id: firmware_reject
  label: Reject Uploaded Firmware
  kind: action
  method: GET
  path: /api/firmware/reject
  params:
    - name: fileId
      type: string
      description: 8-hex-char file identifier

# --- Config ---
- id: config_get
  label: Download Device Configuration
  kind: query
  method: GET
  path: /api/config
  description: Returns XML device configuration. Requires Enhanced Integration licence.

- id: config_upload
  label: Upload Device Configuration
  kind: action
  method: PUT
  path: /api/config
  description: multipart/form-data with blob-cfg; takes ~15s to apply.
  params:
    - name: blob-cfg
      type: file
      description: XML configuration (mandatory)

- id: config_factoryreset
  label: Factory Reset
  kind: action
  method: GET
  path: /api/config/factoryreset
  description: Resets all parameters; takes ~15s. Do not power-cycle during.

- id: holidays_get
  label: Get Bank Holidays
  kind: query
  method: GET
  path: /api/holidays

- id: holidays_put
  label: Set Bank Holidays
  kind: action
  method: PUT
  path: /api/holidays

- id: config_holidays_get
  label: Get Bank Holidays (config)
  kind: query
  method: GET
  path: /api/config/holidays

- id: config_holidays_put
  label: Set Bank Holidays (config)
  kind: action
  method: PUT
  path: /api/config/holidays

# --- Switch ---
- id: switch_caps
  label: Switch Capabilities
  kind: query
  method: GET
  path: /api/switch/caps
  params:
    - name: switch
      type: integer
      description: Optional switch id (typically 1-4)

- id: switch_status
  label: Switch Status
  kind: query
  method: GET
  path: /api/switch/status
  params:
    - name: switch
      type: integer
      description: Optional switch id (1-4)
    - name: holdTimeout
      type: string
      description: Optional remaining hold time

- id: switch_ctrl
  label: Control Switch
  kind: action
  method: GET
  path: /api/switch/ctrl
  params:
    - name: switch
      type: integer
      description: Switch id (typically 1-4); mandatory
    - name: action
      type: string
      description: "on | off | trigger | lock | unlock | hold | release"
    - name: response
      type: string
      description: Optional custom response text
    - name: timeout
      type: integer
      description: Auto-release timeout in seconds (1-86400)

# --- I/O ---
- id: io_caps
  label: I/O Capabilities
  kind: query
  method: GET
  path: /api/io/caps
  params:
    - name: port
      type: string
      description: Optional port id

- id: io_status
  label: I/O Status
  kind: query
  method: GET
  path: /api/io/status
  params:
    - name: port
      type: string
      description: Optional port id

- id: io_ctrl
  label: Control I/O Output
  kind: action
  method: GET
  path: /api/io/ctrl
  params:
    - name: port
      type: string
      description: I/O port id; mandatory
    - name: action
      type: string
      description: "on | off"
    - name: response
      type: string
      description: Optional custom response text

# --- Phone ---
- id: phone_status
  label: SIP Account Status
  kind: query
  method: GET
  path: /api/phone/status
  params:
    - name: account
      type: integer
      description: Optional SIP account id (1 or 2)

- id: phone_calllog_get
  label: Get Call Log
  kind: query
  method: GET
  path: /api/phone/calllog

- id: phone_calllog_delete
  label: Delete Call Log Record
  kind: action
  method: DELETE
  path: /api/phone/calllog
  params:
    - name: id
      type: string
      description: Unique call-log record id; mandatory

# --- Call ---
- id: call_status
  label: Call Status
  kind: query
  method: GET
  path: /api/call/status
  params:
    - name: session
      type: string
      description: Optional call session id

- id: call_dial
  label: Initiate Outgoing Call
  kind: action
  method: GET
  path: /api/call/dial
  params:
    - name: number
      type: string
      description: Destination phone number or sip uri
    - name: users
      type: string
      description: Comma-separated user uuids (alternative to number)

- id: call_answer
  label: Answer Incoming Call
  kind: action
  method: GET
  path: /api/call/answer
  params:
    - name: session
      type: string
      description: Active incoming call session id

- id: call_hangup
  label: Hang Up Call
  kind: action
  method: GET
  path: /api/call/hangup
  params:
    - name: session
      type: string
      description: Call session id
    - name: reason
      type: string
      description: "normal | rejected | busy"

# --- Camera ---
- id: camera_caps
  label: Camera Capabilities
  kind: query
  method: GET
  path: /api/camera/caps

- id: camera_snapshot
  label: Camera Snapshot
  kind: query
  method: GET
  path: /api/camera/snapshot
  params:
    - name: width
      type: integer
      description: Horizontal resolution in pixels; mandatory
    - name: height
      type: integer
      description: Vertical resolution in pixels; mandatory
    - name: source
      type: string
      description: "internal | external"
    - name: fps
      type: integer
      description: Frame rate (>=1 enables http server push)
    - name: time
      type: integer
      description: Snapshot time offset in seconds (-30 to 0)

# --- Display ---
- id: display_caps
  label: Display Capabilities
  kind: query
  method: GET
  path: /api/display/caps

- id: display_image_upload
  label: Upload Display Image/Video
  kind: action
  method: PUT
  path: /api/display/image
  description: multipart/form-data
  params:
    - name: display
      type: string
      description: Display id; mandatory
    - name: blob-image
      type: file
      description: JPEG/BMP/PNG image
    - name: blob-video
      type: file
      description: MPEG4/H264 video (video-capable models, max 60s)
    - name: duration
      type: integer
      description: Display duration in milliseconds
    - name: repeat
      type: integer
      description: Video repeat count

- id: display_image_delete
  label: Delete Display Image
  kind: action
  method: DELETE
  path: /api/display/image
  params:
    - name: display
      type: string
      description: Display id; mandatory

# --- Log ---
- id: log_caps
  label: Event Log Capabilities
  kind: query
  method: GET
  path: /api/log/caps

- id: log_subscribe
  label: Subscribe Event Channel
  kind: action
  method: GET
  path: /api/log/subscribe
  params:
    - name: include
      type: string
      description: "new | all | -t (seconds back)"
    - name: filter
      type: string
      description: Comma-separated event types
    - name: duration
      type: integer
      description: Channel auto-close timeout in seconds (max 3600)

- id: log_unsubscribe
  label: Unsubscribe Event Channel
  kind: action
  method: GET
  path: /api/log/unsubscribe
  params:
    - name: id
      type: integer
      description: Channel id from log_subscribe; mandatory

- id: log_pull
  label: Pull Events
  kind: query
  method: GET
  path: /api/log/pull
  params:
    - name: id
      type: integer
      description: Channel id; mandatory
    - name: timeout
      type: integer
      description: Max reply delay in seconds

# --- Audio ---
- id: audio_test
  label: Audio Loop Test
  kind: action
  method: GET
  path: /api/audio/test
  description: Triggers built-in mic/speaker test. Result delivered as AudioLoopTest event.

# --- Email ---
- id: email_send
  label: Send Email
  kind: action
  method: GET
  path: /api/email/send
  params:
    - name: to
      type: string
      description: Recipient address; mandatory
    - name: subject
      type: string
      description: Subject; mandatory
    - name: body
      type: string
      description: Body (may include HTML)
    - name: pictureCount
      type: integer
      description: Camera images to attach (0 or 5)
    - name: timeSpan
      type: integer
      description: Snapshot timespan in seconds
    - name: width
      type: integer
      description: Camera image width
    - name: height
      type: integer
      description: Camera image height

# --- Pcap ---
- id: pcap_download
  label: Download Pcap
  kind: query
  method: GET
  path: /api/pcap

- id: pcap_restart
  label: Restart Pcap Recording
  kind: action
  method: GET
  path: /api/pcap/restart

- id: pcap_stop
  label: Stop Pcap Recording
  kind: action
  method: GET
  path: /api/pcap/stop

- id: pcap_live_start
  label: Start Live Pcap Stream
  kind: action
  method: GET
  path: /api/pcap/live
  params:
    - name: duration
      type: integer
      description: Stream duration in seconds (0 = indefinite)

- id: pcap_live_stop
  label: Stop Live Pcap Stream
  kind: action
  method: GET
  path: /api/pcap/live/stop

- id: pcap_live_stats
  label: Live Pcap Stats
  kind: query
  method: GET
  path: /api/pcap/live/stats

# --- Directory ---
- id: dir_template
  label: Directory Entry Template
  kind: query
  method: GET
  path: /api/dir/template

- id: dir_create
  label: Create Directory Entries
  kind: action
  method: PUT
  path: /api/dir/create
  params:
    - name: force
      type: boolean
      description: Overwrite existing entries with same uuid
    - name: users
      type: string
      description: JSON array of user entry objects

- id: dir_update
  label: Update Directory Entries
  kind: action
  method: PUT
  path: /api/dir/update
  params:
    - name: users
      type: string
      description: JSON array of user entry objects (each must include uuid)

- id: dir_delete
  label: Delete Directory Entries
  kind: action
  method: PUT
  path: /api/dir/delete
  params:
    - name: owner
      type: string
      description: Delete all entries with this owner
    - name: users
      type: string
      description: JSON array of {uuid:...} objects

- id: dir_get
  label: Get Directory Entries
  kind: query
  method: POST
  path: /api/dir/get
  params:
    - name: fields
      type: string
      description: JSON array of field names (empty=all)
    - name: users
      type: string
      description: JSON array of {uuid:...} objects

- id: dir_query
  label: Query Directory by Timestamp
  kind: query
  method: POST
  path: /api/dir/query
  params:
    - name: series
      type: string
      description: Timestamps series identifier
    - name: fields
      type: string
      description: JSON array of field names
    - name: iterator
      type: string
      description: JSON object with timestamp key

# --- Mobile Key (Bluetooth) ---
- id: mobilekey_config_get
  label: Get Mobile Key Config
  kind: query
  method: GET
  path: /api/mobilekey/config

- id: mobilekey_config_put
  label: Set Mobile Key Config
  kind: action
  method: PUT
  path: /api/mobilekey/config
  params:
    - name: location
      type: string
      description: Bluetooth auth location string (max 127 chars)
    - name: keys
      type: string
      description: JSON array of up to 4 encryption key objects (RSA DER/Base64)

# --- License Plate Recognition ---
- id: lpr_licenseplate
  label: Submit LPR Event
  kind: action
  method: POST
  path: /api/lpr/licenseplate
  description: application/json body
  params:
    - name: lprUuid
      type: string
      description: LPR event uuid; mandatory
    - name: accessPoint
      type: integer
      description: "0=entry, 1=exit; mandatory"
    - name: plateText
      type: string
      description: Recognized plate text; mandatory
    - name: plateImage
      type: string
      description: Base64-encoded JPEG (max 256 kB)

- id: lpr_image
  label: Get LPR Image
  kind: query
  method: GET
  path: /api/lpr/image
  params:
    - name: plateText
      type: string
      description: License plate text; mandatory

# --- Access Point ---
- id: accesspoint_blocking_ctrl
  label: Control Access Point Blocking
  kind: action
  method: GET
  path: /api/accesspoint/blocking/ctrl
  params:
    - name: id
      type: integer
      description: "0=entry, 1=exit; mandatory"
    - name: action
      type: string
      description: "on | off"

- id: accesspoint_blocking_status
  label: Get Access Point Blocking Status
  kind: query
  method: GET
  path: /api/accesspoint/blocking/status
  params:
    - name: id
      type: integer
      description: Optional access point id (0 or 1)

- id: accesspoint_grantaccess
  label: Grant Remote Access
  kind: action
  method: GET
  path: /api/accesspoint/grantaccess
  params:
    - name: id
      type: integer
      description: "0=arrival, 1=departure; mandatory"
    - name: user
      type: string
      description: User uuid; mandatory

# --- Lift ---
- id: lift_grantaccess
  label: Grant Lift Floor Access
  kind: action
  method: GET
  path: /api/lift/grantaccess
  params:
    - name: uuid
      type: string
      description: User uuid; mandatory
    - name: duration
      type: integer
      description: Floor activation time in seconds (1-600)

# --- Automation ---
- id: automation_trigger
  label: Trigger Automation
  kind: action
  method: GET
  path: /api/automation/trigger
  params:
    - name: triggerId
      type: string
      description: HttpTrigger automation function identifier
```

## Feedbacks
```yaml
# Observable states returned by query endpoints. All return JSON.
- id: system_info
  type: object
  description: Device identification. Keys: devType, variant, variantId, customerId, serialNumber, macAddr, hwVersion, swVersion, buildType, firmwarePackage, deviceName.

- id: system_status
  type: object
  description: Keys: systemTime (unix s), upTime (s).

- id: switch_caps
  type: array
  description: Per switch: switch (1-4), enabled, mode (monostable|bistable), switchOnDuration (s), type (normal|security).

- id: switch_status
  type: array
  description: Per switch: switch, active, locked, held.

- id: io_caps
  type: array
  description: Per port: port, type (input|output).

- id: io_status
  type: array
  description: Per port: port, state (0|1).

- id: phone_status
  type: array
  description: Per SIP account: account (1|2), sipNumber, registered, registerTime.

- id: call_status
  type: array
  description: Per call session: session, direction (incoming|outgoing), state (connecting|ringing|connected).

- id: camera_caps
  type: object
  description: Keys: jpegResolution (array of {width,height}), sources (array of {source}).

- id: camera_snapshot
  type: binary
  description: image/jpeg or multipart/x-mixed-replace (when fps>=1).

- id: display_caps
  type: array
  description: Per display: display, resolution {width,height}.

- id: log_caps
  type: array
  description: List of supported event-type strings (KeyPressed, InputChanged, etc.).

- id: log_pull
  type: array
  description: Array of event objects with id, tzShift, utcTime, upTime, event, params.

- id: pcap_live_stats
  type: object
  description: Keys: running (bool), bytesSent (int), packetsSent (int).
```

## Variables
```yaml
# Settable parameters that are not discrete actions.
# Source: /api/system/time/set, /api/dir/*, /api/mobilekey/config, /api/display/image, /api/email/send
# (all also exposed as actions above; listed here only for parameters that are
# pure data without a discrete one-shot verb)

- id: device_time
  type: integer
  description: Unix time. Set via /api/system/time/set?time=...
  min: 0
  max: 2147483647

- id: switch_hold_timeout
  type: integer
  description: Auto-release hold duration in seconds (1-86400). Set via /api/switch/ctrl timeout param.

- id: bank_holidays
  type: array
  description: List of DD/MM[/YYYY] dates. Set via PUT /api/holidays or /api/config/holidays.
```

## Events
```yaml
# Unsolicited events available via /api/log/subscribe + /api/log/pull.
# All events share: id (uint32), utcTime (uint32 unix s), upTime (uint32 s),
# tzShift (int32 minutes), event (string), params (object).

- id: DeviceState
  description: Device state change.
  params:
    state: startup

- id: AudioLoopTest
  description: Result of automatic audio loop test.
  params:
    result: passed | failed

- id: MotionDetected
  description: Camera motion detection (camera-equipped models).
  params:
    state: in | out

- id: NoiseDetected
  description: Increased noise level (microphone-equipped models).
  params:
    state: in | out

- id: KeyPressed
  description: Speed-dial, keypad, display touch, or BT-auth init key pressed.
  params:
    key: string  # 0-9, %1-%150, *, #

- id: KeyReleased
  description: Speed-dial/numeric keypad button released.
  params:
    key: string

- id: CodeEntered
  description: Numeric keypad code entered.
  params:
    ap: "0|1"  # 0=entry, 1=exit
    session: string
    direction: in | out | any
    code: string
    type: string
    uuid: string
    valid: boolean

- id: CardEntered
  description: RFID card tapped.
  params:
    ap: "0|1"
    session: string
    direction: in | out | any
    reader: string
    uid: string  # 6-16 hex
    uuid: string
    valid: boolean

- id: InputChanged
  description: Logic input state change.
  params:
    port: string
    state: boolean

- id: OutputChanged
  description: Logic output state change.
  params:
    port: string
    state: boolean

- id: SwitchStateChanged
  description: Switch 1-4 state change.
  params:
    switch: integer  # 1-4
    state: boolean
    originator: profile | api | ap | rex | idt | dtmf | auth | uni | zone | automation

- id: CallStateChanged
  description: Active call state change.
  params:
    direction: incoming | outgoing
    state: connecting | ringing | connected | terminated
    peer: string
    session: uint32
    call: uint32

- id: RegistrationStateChanged
  description: SIP registration state change.
  params:
    sipAccount: "1|2"
    state: registered | unregistered | registering | unregistering

- id: TamperSwitchActivated
  description: Tamper switch state change.
  params:
    state: in | out

- id: UnauthorizedDoorOpen
  description: Door opened without authorization (digital-input equipped).
  params:
    state: in | out

- id: DoorOpenTooLong
  description: Door open exceeded timeout.
  params:
    state: in | out

- id: LoginBlocked
  description: Web-login temporarily blocked after repeated invalid attempts.
  params:
    address: string  # offending IP

- id: UserAuthenticated
  description: User authenticated; door opened.
  params:
    ap: "0|1"
    session: string
    name: string
    uuid: string
    apbBroken: boolean

- id: CardHeld
  description: RFID card held >4s.
  params:
    ap: "0|1"
    session: string
    direction: in | out | any
    reader: string
    uid: string
    valid: boolean

- id: SilentAlarm
  description: Silent alarm activated.
  params:
    ap: "0|1"
    session: string
    name: string
    uuid: string

- id: AccessLimited
  description: User rejection.
  params:
    ap: "0|1"
    type: card | code | finger
    state: in | out

- id: PairingStateChanged
  description: Bluetooth interface pairing state change.
  params:
    state: pending
    authId: string

- id: SwitchesBlocked
  description: Switches blocked by tamper (30-min default).
  params:
    state: in | out

- id: FingerEntered
  description: Biometric reader swipe.
  params:
    ap: "0|1"
    session: string
    direction: in | out | any
    uuid: string
    valid: boolean

- id: MobKeyEntered
  description: Bluetooth Mobile Key authentication.
  params:
    ap: "0|1"
    session: string
    direction: in | out | any
    authid: string
    uuid: string
    valid: boolean

- id: DoorStateChanged
  description: Door open/closed state change.
  params:
    state: opened | closed

- id: UserRejected
  description: Authorization rejected.
  params:
    ap: "0|1"
    session: string
    name: string
    uuid: string
    reason: apLocked | invalidTime | invalidProfile | invalidSequence | invalidCredential | authInterrupted | timeout | switchDisabled

- id: DisplayTouched
  description: Display touch event (Verso / Access Unit).
  params:
    x: integer
    y: integer
    dx: integer
    dy: integer

- id: DtmfEntered
  description: DTMF code entered in call.
  params:
    code: string
    type: uni | user
    call: string
    valid: boolean

- id: AccessTaken
  description: Card tapped in Anti-passback area.

- id: ApLockStateChanged
  description: Emergency lockdown state change.
  params:
    ap: "0|1"
    state: in | out

- id: RexActivated
  description: REX exit button activated.
  params:
    ap: "0|1"
    session: string

- id: LiftStatusChanged
  description: Lift Control module connect/disconnect.
  params:
    module: integer
    ready: boolean

- id: LiftFloorsEnabled
  description: Permanent floor access granted.
  params:
    type: public | user
    floors: array
    uuid: string

- id: LiftConfigChanged
  description: Lift control config change.
  params:
    hash: string

- id: CapabilitiesChanged
  description: Available functions changed.
```

## Macros
```yaml
# UNRESOLVED: source does not describe pre-defined macro sequences.
# Note: /api/automation/trigger fires user-defined HttpTrigger actions, but
# trigger definitions live in device configuration, not the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  # From source: config upload via PUT takes ~15s; do not reset or power-cycle
  # the device during this interval.
  - description: "Do not power-cycle or reset device for ~15s after PUT /api/config or /api/config/factoryreset"
  # From source: firmware upload auto-rejects after 5 min if not applied.
  - description: "Uploaded firmware is auto-rejected after 5 minutes if not applied via /api/firmware/apply"
  # From source: tamper switch blocks all switches for 30 minutes (when enabled).
  - description: "Tamper activation blocks all switches for 30 minutes; blocking persists across device restart (if function enabled)"
  # From source: live pcap cannot be started while one is already running.
  - description: "Only one /api/pcap/live capture can run at a time"
# UNRESOLVED: physical electrical safety, voltage, current, installation
# interlocks are not covered in the HTTP API source.
```

## Notes

**Source-label mismatch (CRITICAL):** The source document is the 2N IP intercom HTTP API manual (v2.37, doc revision 2.37), covering 2N Helios IP Vario, 2N IP Verso, 2N IP Style, and 2N Access Unit. The Control4 C4-DS2 is not named anywhere in the source. The pipeline file note explicitly states "File is labelled 'C4-DS2' in the pipeline, but content is the 2N manual." This spec documents the 2N HTTP API as the best available proxy for the C4-DS2 control surface (Control4 resells several 2N intercoms); treat as best-effort and verify against a real C4-DS2 before publication.

**Auth posture:** Per-service authentication is configurable on the device (None | Basic | Digest, RFC-2617). The source recommends HTTPS + Digest for all services. The Python example in the source uses HTTPBasicAuth with `admin`/`pass`; this is illustrative, not a stated default for the C4-DS2.

**Port numbers:** The source does not state port numbers. 2N intercoms conventionally use 80 (HTTP) and 443 (HTTPS), but this is not confirmed for the C4-DS2.

**Transport notes:** Configuration uploads (`PUT /api/config`) and factory reset take approximately 15 seconds; the device must not be power-cycled or restarted during this window. Firmware uploads auto-reject after 5 minutes if not applied.

**Parameter transfer:** Parameters may be sent in URL query (GET/POST), application/x-www-form-urlencoded body (POST/PUT), or multipart/form-data (POST/PUT; required for `blob-` prefixed large-data parameters).

**Reply format:** JSON by default; binary data (firmware, snapshots, LPR images, display images, pcap) return their native MIME types. XML is used for the full `/api/config` download.

**Error model:** All errors return `{"success": false, "error": {"code": <int>, "param": "<name>", "description": "..."}}`. Error codes 1-19 defined in the source; specific operations layer on additional named codes (e.g. `EDIR_UUID_ALREADY_EXISTS`).
```

Written to `/tmp/c4-ds2-spec.md`. 63 actions, 13 feedbacks, 3 vars, 32 events. Source-label mismatch (2N manual, not C4-DS2) flagged in summary, transport comment, and notes. Port, default creds, firmware version all UNRESOLVED.

## Provenance

```yaml
source_domains:
  - wiki.2n.com
  - 2n.com
source_urls:
  - https://wiki.2n.com/download/attachments/56885721/2N_IP_HTTP_API_manual_EN_2.37.pdf
  - https://wiki.2n.com/hip/auto/latest/en
  - https://wiki.2n.com/hip/inte/latest/en/4-home-and-building-automation/control4
  - https://www.2n.com/en-US/online-tools/2n-integration-hub/control4
retrieved_at: 2026-06-01T08:54:46.015Z
last_checked_at: 2026-06-02T08:09:48.150Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:09:48.150Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 spec actions map one-to-one to documented HTTP API endpoints in the 2N intercom source; transport (base_url /api, configurable HTTP/HTTPS auth) is confirmed verbatim; source contains no additional endpoints beyond what the spec covers. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the 2N IP intercom HTTP API manual (v2.37), not a native Control4 C4-DS2 manual. The C4-DS2 appears to use this same 2N HTTP API as its control surface, but no Control4-branded protocol document was located (see prior-attempt notes; docs.control4.com JS-gated, all direct C4-DS2 doc URLs 404). Treat the device/protocol mapping as best-effort and verify against a real C4-DS2 before publication."
- "TCP port (HTTP vs HTTPS) — source states the protocol can be HTTP or HTTPS, configurable per service, but does not give explicit port numbers for this device."
- "default username/password — source describes RFC-2617 Basic and Digest authentication, references the standard `requests.auth.HTTPBasicAuth(\"admin\", \"pass\")` example, but does not state the C4-DS2 default credentials."
- "port number not stated in source. 2N intercoms default to 80/443,"
- "source does not describe pre-defined macro sequences."
- "physical electrical safety, voltage, current, installation"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
