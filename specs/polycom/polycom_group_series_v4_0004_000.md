---
spec_id: admin/polycom-group-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Polycom Group Series Control Spec"
manufacturer: Polycom
model_family: "Group Series v4.0004.000"
aliases: []
compatible_with:
  manufacturers:
    - Polycom
  models:
    - "Group Series v4.0004.000"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - kaas.hpcloud.hp.com
source_urls:
  - https://kaas.hpcloud.hp.com/pdf-public/pdf_9122356_en-US-1.pdf
  - https://kaas.hpcloud.hp.com/pdf-public/pdf_9126112_en-US-1.pdf
retrieved_at: 2026-04-29T12:08:33.887Z
last_checked_at: 2026-10-01T22:19:13.837Z
generated_at: 2026-10-01T22:19:13.837Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model number exact match to v4.0004.000 not verified against unit"
  - "port 24 also used for telnet API; port 22 for SSH - both stated but no single primary"
  - "no standalone settable parameters found beyond action params"
  - "no multi-step macros explicitly defined in source"
  - "no interlock procedures stated in source"
  - "authentication credential format not specified in source"
  - "SSH key or certificate auth details not stated in source"
  - "TCP keepalive or session timeout values not stated"
  - "maximum concurrent API sessions not stated"
verification:
  verdict: verified
  checked_at: 2026-10-01T22:19:13.837Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions map to documented source commands; transport parameters (9600/8/N/1, port 23, password auth) are sourced verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Polycom Group Series Control Spec

## Summary
Polycom RealPresence Group Series video conferencing system. Supports RS-232 serial and TCP/IP (Telnet/SSH) control. API controls cameras, presets, dialing, mute, volume, and system settings. Port 23/24 for Telnet, port 22 for SSH.

<!-- UNRESOLVED: device model number exact match to v4.0004.000 not verified against unit -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # default; also supports 14400,19200,38400,57600,115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # Telnet default
  # UNRESOLVED: port 24 also used for telnet API; port 22 for SSH - both stated but no single primary
auth:
  type: password  # telnet requires remote access password; SSH supports local and AD accounts
```

## Traits
```yaml
- powerable       # reboot now, resetsystem commands
- routable        # camera near/far source selection, video input routing
- queryable       # mute near get, volume get, camera near getposition, callstate, whoami
- levelable       # volume up/down/set, camera near setposition
```

## Actions
```yaml
- id: camera_near
  label: Select Near Camera
  kind: action
  params:
    - name: index
      type: integer
      description: Camera index 1-4

- id: camera_far
  label: Select Far Camera
  kind: action
  params:
    - name: index
      type: integer
      description: Camera index 1-4

- id: camera_move
  label: Move Camera
  kind: action
  params:
    - name: side
      type: enum
      values: [near, far]
    - name: direction
      type: enum
      values: [left, right, up, down, zoom+, zoom-, stop]

- id: camera_source
  label: Get Camera Source
  kind: action
  params:
    - name: side
      type: enum
      values: [near, far]

- id: camera_stop
  label: Stop Camera Movement
  kind: action
  params:
    - name: side
      type: enum
      values: [near, far]

- id: camera_getposition
  label: Get PTZ Coordinates
  kind: action
  params:
    - name: side
      type: enum
      values: [near, far]

- id: camera_setposition
  label: Set PTZ Coordinates
  kind: action
  params:
    - name: x
      type: integer
      description: Pan coordinate (-5000 to 5000)
    - name: y
      type: integer
      description: Tilt coordinate (-5000 to 5000)
    - name: z
      type: integer
      description: Zoom coordinate (-5000 to 5000)

- id: camera_ppcip
  label: Select People+Content IP Source
  kind: action
  params: []

- id: camera_tracking_stats
  label: Get Tracking Statistics
  kind: action
  params: []

- id: camera_tracking
  label: Camera Tracking Control
  kind: action
  params:
    - name: mode
      type: enum
      values: [get, on, off]

- id: camera_for_people
  label: Set People Camera Source
  kind: action
  params:
    - name: index
      type: integer
      description: Camera index 1-4

- id: camera_for_content
  label: Set Content Camera Source
  kind: action
  params:
    - name: index
      type: integer
      description: Camera index 1-4

- id: camera_list_content
  label: List Content Cameras
  kind: action
  params: []

- id: preset_register
  label: Register for Preset Notifications
  kind: action
  params: []

- id: preset_unregister
  label: Unregister Preset Notifications
  kind: action
  params: []

- id: preset_far_go
  label: Go to Far Camera Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset index 0-15

- id: preset_far_set
  label: Set Far Camera Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset index 0-15

- id: preset_near_go
  label: Go to Near Camera Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset index 0-99

- id: preset_near_set
  label: Set Near Camera Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset index 0-99

- id: rs232_baud
  label: Get/Set RS-232 Baud Rate
  kind: action
  params:
    - name: rate
      type: enum
      values: [get, 9600, 14400, 19200, 38400, 57600, 115200]

- id: rs232_mode
  label: Get/Set RS-232 Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [get, off, control, passthru, camera_ptz, closed_caption]

- id: dial_addressbook
  label: Dial from Address Book
  kind: action
  params:
    - name: name
      type: string
      description: Address book entry name

- id: dial_auto
  label: Auto Dial
  kind: action
  params:
    - name: speed
      type: string
    - name: dialstr
      type: string

- id: dial_manual
  label: Manual Dial
  kind: action
  params:
    - name: speed
      type: string
    - name: dialstr1
      type: string
    - name: dialstr2
      type: string
    - name: protocol
      type: enum
      values: [h323, ip, sip]

- id: dial_phone
  label: Dial Phone
  kind: action
  params:
    - name: dialstring
      type: string

- id: hangup_video
  label: Hang Up Video Call
  kind: action
  params:
    - name: callid
      type: integer
      description: Optional call ID to disconnect

- id: hangup_all
  label: Hang Up All Calls
  kind: action
  params: []

- id: mute_register
  label: Register for Mute Notifications
  kind: action
  params: []

- id: mute_unregister
  label: Unregister Mute Notifications
  kind: action
  params: []

- id: mute_near
  label: Near Site Mute Control
  kind: action
  params:
    - name: state
      type: enum
      values: [get, on, off, toggle]

- id: mute_far_get
  label: Get Far Site Mute State
  kind: action
  params: []

- id: notify
  label: Register for Notifications
  kind: action
  params:
    - name: type
      type: enum
      values: [callstatus, linestatus, mutestatus, screenchanges, sysstatus, sysalerts, vidsourcechanges, calendarmeetings]

- id: nonotify
  label: Unregister Notifications
  kind: action
  params:
    - name: type
      type: enum
      values: [callstatus, linestatus, mutestatus, screenchanges, sysstatus, sysalerts, vidsourcechanges]

- id: callstate
  label: Call State Control
  kind: action
  params:
    - name: mode
      type: enum
      values: [get, register, unregister]

- id: volume
  label: Volume Control
  kind: action
  params:
    - name: action
      type: enum
      values: [register, unregister, get, up, down, set]
    - name: level
      type: integer
      description: Volume level 0-50 (when using set)

- id: volume_range
  label: Get Volume Range
  kind: action
  params: []

- id: sshenable
  label: Enable/Disable SSH
  kind: action
  params:
    - name: enabled
      type: boolean

- id: whoami
  label: Get System Info
  kind: action
  params: []

- id: apiport
  label: Get/Set Telnet API Port
  kind: action
  params:
    - name: port
      type: enum
      values: [get, 23, 24]

- id: telnetenabled
  label: Get/Set Telnet Enable
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, port24only]

- id: reboot
  label: Reboot System
  kind: action
  params: []

- id: resetsystem
  label: Reset System
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: camera_ack
  label: Camera Command Acknowledgement
  type: string
  description: Echoes the camera command sent

- id: preset_notification
  label: Preset Notification
  type: string
  description: Notification when user sets or goes to preset

- id: mute_state_near
  label: Near Mute State
  type: enum
  values: [on, off]

- id: mute_state_far
  label: Far Mute State
  type: enum
  values: [on, off]

- id: volume_level
  label: Volume Level
  type: integer
  description: Current volume 0-50

- id: vidsource_notification
  label: Video Source Change Notification
  type: string
  description: Format: notification:vidsourcechange:<near|far>:<camera index>:<camera name>:<people|content>

- id: callstate_update
  label: Call State Update
  type: string
  description: Format: cs: call[N] chan[N] dialstr[N] state[STATE]; active: call[N] speed[N]

- id: call_cleared
  label: Call Cleared Notification
  type: string
  description: Format: cleared: call[N] dialstr[IP:...] NAME:... ended: call[N]

- id: rs232_baud_status
  label: RS-232 Baud Rate Status
  type: string

- id: rs232_mode_status
  label: RS-232 Mode Status
  type: string

- id: tracking_statistics
  label: Tracking Statistics
  type: string
  description: Returns tracking disable percentage and view switching frequency

- id: tracking_mode
  label: Tracking Mode
  type: enum
  values: [GroupFrame, Voice]

- id: whoami_info
  label: System Info
  type: object
  properties:
    - name: model
      type: string
    - name: serial
      type: string
    - name: software_version
      type: string
    - name: ip_video_number
      type: string
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found beyond action params
```

## Events
```yaml
- id: vidsourcechange
  label: Video Source Change
  description: Unsolicited notification when camera source changes
  format: notification:vidsourcechange:<near|far>:<camera index>:<camera name>:<people|content>

- id: callstatus_change
  label: Call Status Change
  description: Unsolicited notification for call state changes

- id: mutestatus_change
  label: Mute Status Change
  description: Unsolicited notification when mute state changes

- id: screenchange
  label: Screen Change
  description: Unsolicited notification when UI screen is displayed

- id: sysstatus_change
  label: System Status Change
  description: Unsolicited system status notifications

- id: sysalert
  label: System Alert
  description: Unsolicited system alerts

- id: linestatus_change
  label: Line Status Change
  description: Unsolicited line status notifications
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros explicitly defined in source
```

## Safety
```yaml
confirmation_required_for:
  - reboot now     # causes system restart with no confirmation prompt
  - resetsystem   # causes system reset with no confirmation prompt
interlocks: []
# UNRESOLVED: no interlock procedures stated in source
```

## Notes
- API processes one command at a time. Recommend 200ms delay between commands; longer for commands returning extensive responses (addrbook, gaddrbook, whoami).
- Do not send commands during call establishment.
- Registration writes to Flash memory; retained across restarts. Register once in initialization.
- Registrations are specific to the port registered from; registering on com port 1 does not send to com port 2 or Telnet port 24.
- System does not provide flow control; re-establish connection if lost.
<!-- UNRESOLVED: authentication credential format not specified in source -->
<!-- UNRESOLVED: SSH key or certificate auth details not stated in source -->
<!-- UNRESOLVED: TCP keepalive or session timeout values not stated -->
<!-- UNRESOLVED: maximum concurrent API sessions not stated -->

## Provenance

```yaml
source_domains:
  - kaas.hpcloud.hp.com
source_urls:
  - https://kaas.hpcloud.hp.com/pdf-public/pdf_9122356_en-US-1.pdf
  - https://kaas.hpcloud.hp.com/pdf-public/pdf_9126112_en-US-1.pdf
retrieved_at: 2026-04-29T12:08:33.887Z
last_checked_at: 2026-10-01T22:19:13.837Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T22:19:13.837Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions map to documented source commands; transport parameters (9600/8/N/1, port 23, password auth) are sourced verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model number exact match to v4.0004.000 not verified against unit"
- "port 24 also used for telnet API; port 22 for SSH - both stated but no single primary"
- "no standalone settable parameters found beyond action params"
- "no multi-step macros explicitly defined in source"
- "no interlock procedures stated in source"
- "authentication credential format not specified in source"
- "SSH key or certificate auth details not stated in source"
- "TCP keepalive or session timeout values not stated"
- "maximum concurrent API sessions not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
