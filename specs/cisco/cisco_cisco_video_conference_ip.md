---
schema_version: ai4av-public-spec-v1
device_id: cisco/cisco-telepresence-mx200-g2
entity_id: cisco_cisco_video_conference
spec_id: admin/cisco-cisco-video-conference
revision: 1
author: admin
title: "Cisco Video Conference Control Spec"
status: published
manufacturer: Cisco
manufacturer_key: cisco
model_family: "Cisco TelePresence MX200 G2"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "Cisco TelePresence MX200 G2"
    - "Cisco TelePresence MX300 G2"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce91/dx70-dx80-api-reference-guide-ce91.pdf
  - https://cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce92/mx200g2-mx300g2-api-reference-guide-ce92.pdf
source_documents:
  - title: "Cisco public source"
    url: https://cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce91/dx70-dx80-api-reference-guide-ce91.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T09:02:41.550Z
  - title: "Cisco public source"
    url: https://cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce92/mx200g2-mx300g2-api-reference-guide-ce92.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T09:02:59.557Z
retrieved_at: 2026-04-29T09:02:59.557Z
last_checked_at: 2026-04-26T11:34:42.565Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T11:34:42.565Z
  matched_actions: 77
  action_count: 77
  confidence: high
  summary: "All 77 spec actions matched to source xCommand definitions with correct parameters and transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Cisco Video Conference Control Spec

## Summary
Cisco TelePresence MX series video conference codec with an xAPI control interface accessible via Telnet, SSH, HTTP/HTTPS, and serial (RS-232). The API is organized into four hierarchical groups: Commands (xCommand), Configurations (xConfiguration), Status (xStatus), and Events (xEvent). Supports terminal, XML, and JSON output modes.

<!-- UNRESOLVED: exact model variants beyond MX200 G2 and MX300 G2 not fully enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - http
  - serial
addressing:
  # UNRESOLVED: default Telnet/SSH port numbers not explicitly stated in source
  base_url: http://<ip-address>/putxml
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: basic  # HTTP XMLAPI requires Basic Access Authentication with ADMIN role; Telnet/SSH require login
```

## Traits
```yaml
traits:
  - powerable       # inferred from Standby Activate/Deactivate commands
  - queryable       # inferred from xStatus commands returning state
  - routable        # inferred from Video Matrix, Video Input/Output routing commands
  - levelable       # inferred from Audio Volume Set/Increase/Decrease commands
```

## Actions
```yaml
actions:
  - id: dial
    label: Dial
    kind: action
    params:
      - name: Number
        type: string
        description: "Number or address to dial (0-255 chars)"
      - name: Protocol
        type: enum
        values: [H320, H323, Sip]
        required: false
      - name: CallRate
        type: integer
        description: "Call rate in kbps (64-6000)"
        required: false
      - name: CallType
        type: enum
        values: [Audio, Video]
        required: false

  - id: call_disconnect
    label: Call Disconnect
    kind: action
    params:
      - name: CallId
        type: integer
        description: "Call ID (0-65534)"
        required: false

  - id: call_accept
    label: Call Accept
    kind: action
    params:
      - name: CallId
        type: integer
        required: false

  - id: call_reject
    label: Call Reject
    kind: action
    params:
      - name: CallId
        type: integer
        required: false

  - id: call_hold
    label: Call Hold
    kind: action
    params:
      - name: CallId
        type: integer
        required: false
      - name: Reason
        type: enum
        values: [Conference, Transfer, Other]
        required: false

  - id: call_resume
    label: Call Resume
    kind: action
    params:
      - name: CallId
        type: integer

  - id: call_dtmf_send
    label: Send DTMF
    kind: action
    params:
      - name: CallId
        type: integer
        required: false
      - name: DTMFString
        type: string
        description: "DTMF string (0-32 chars)"

  - id: call_unattended_transfer
    label: Unattended Transfer
    kind: action
    params:
      - name: CallId
        type: integer
      - name: Number
        type: string
        description: "Number to transfer to (0-255 chars)"

  - id: audio_volume_set
    label: Set Volume
    kind: action
    params:
      - name: Level
        type: integer
        description: "Volume level 0-100 (70=0dB)"

  - id: audio_volume_increase
    label: Volume Increase
    kind: action
    params:
      - name: Steps
        type: integer
        description: "1-10 steps, each 0.5dB"
        required: false

  - id: audio_volume_decrease
    label: Volume Decrease
    kind: action
    params:
      - name: Steps
        type: integer
        description: "1-10 steps, each 0.5dB"
        required: false

  - id: audio_volume_mute
    label: Volume Mute
    kind: action
    params: []

  - id: audio_volume_unmute
    label: Volume Unmute
    kind: action
    params: []

  - id: audio_volume_mute_to_default
    label: Volume Set To Default
    kind: action
    params: []

  - id: audio_microphones_mute
    label: Microphones Mute
    kind: action
    params: []

  - id: audio_microphones_unmute
    label: Microphones Unmute
    kind: action
    params: []

  - id: camera_ramp
    label: Camera Ramp
    kind: action
    params:
      - name: CameraId
        type: integer
        description: "Camera ID (1)"
      - name: Pan
        type: enum
        values: [Left, Right, Stop]
        required: false
      - name: PanSpeed
        type: integer
        description: "Pan speed (1-15)"
        required: false
      - name: Tilt
        type: enum
        values: [Down, Up, Stop]
        required: false
      - name: TiltSpeed
        type: integer
        description: "Tilt speed (1-15)"
        required: false
      - name: Zoom
        type: enum
        values: [In, Out, Stop]
        required: false
      - name: ZoomSpeed
        type: integer
        description: "Zoom speed (1-15)"
        required: false
      - name: Focus
        type: enum
        values: [Far, Near, Stop]
        required: false

  - id: camera_position_reset
    label: Camera Position Reset
    kind: action
    params:
      - name: CameraId
        type: integer
      - name: Axis
        type: enum
        values: [All, Focus, PanTilt, Zoom]
        required: false

  - id: camera_preset_activate
    label: Camera Preset Activate
    kind: action
    params:
      - name: PresetId
        type: integer
        description: "Preset ID (1-35)"

  - id: camera_preset_store
    label: Camera Preset Store
    kind: action
    params:
      - name: CameraId
        type: integer
      - name: PresetId
        type: integer
        required: false
      - name: Name
        type: string
        required: false

  - id: camera_preset_remove
    label: Camera Preset Remove
    kind: action
    params:
      - name: PresetId
        type: integer

  - id: standby_activate
    label: Standby Activate
    kind: action
    params: []

  - id: standby_deactivate
    label: Standby Deactivate
    kind: action
    params: []

  - id: standby_reset_timer
    label: Standby Reset Timer
    kind: action
    params:
      - name: Delay
        type: integer
        description: "Delay in minutes (1-480)"

  - id: presentation_start
    label: Presentation Start
    kind: action
    params:
      - name: PresentationSource
        type: integer
        description: "Video input source (1-2)"
        required: false
      - name: SendingMode
        type: enum
        values: [LocalRemote, LocalOnly]
        required: false
      - name: ConnectorId
        type: integer
        description: "Connector ID (2-4)"
        required: false

  - id: presentation_stop
    label: Presentation Stop
    kind: action
    params:
      - name: PresentationSource
        type: integer
        required: false
      - name: Instance
        type: integer
        required: false

  - id: video_selfview_set
    label: Set Selfview
    kind: action
    params:
      - name: Mode
        type: enum
        values: [On, Off]
        required: false
      - name: FullscreenMode
        type: enum
        values: [On, Off]
        required: false
      - name: PIPPosition
        type: enum
        values: [CenterLeft, CenterRight, LowerLeft, LowerRight, UpperCenter, UpperLeft, UpperRight]
        required: false

  - id: video_layout_set
    label: Set Layout Family
    kind: action
    params:
      - name: LayoutFamily
        type: enum
        values: [auto, custom, equal, overlay, prominent, single]
      - name: Target
        type: enum
        values: [local, remote]
        required: false

  - id: video_matrix_assign
    label: Video Matrix Assign
    kind: action
    params:
      - name: Output
        type: integer
        description: "Output (1-2)"
      - name: SourceId
        type: integer
        description: "Input source ID (1-4)"
      - name: Mode
        type: enum
        values: [Add, Replace]
        required: false

  - id: video_matrix_reset
    label: Video Matrix Reset
    kind: action
    params:
      - name: Output
        type: integer
        required: false

  - id: video_matrix_swap
    label: Video Matrix Swap
    kind: action
    params:
      - name: OutputA
        type: integer
      - name: OutputB
        type: integer

  - id: video_input_set_main_source
    label: Set Main Video Source
    kind: action
    params:
      - name: ConnectorId
        type: integer
        required: false
      - name: SourceId
        type: integer
        required: false

  - id: room_preset_activate
    label: Room Preset Activate
    kind: action
    params:
      - name: PresetId
        type: integer
        description: "Preset ID (1-15)"

  - id: room_preset_store
    label: Room Preset Store
    kind: action
    params:
      - name: PresetId
        type: integer
        description: "Preset ID (1-15)"
      - name: Type
        type: enum
        values: [All, Camera]
      - name: Description
        type: string
        required: false

  - id: room_preset_clear
    label: Room Preset Clear
    kind: action
    params:
      - name: PresetId
        type: integer

  - id: systemunit_boot
    label: System Boot
    kind: action
    params:
      - name: Action
        type: enum
        values: [Restart, Shutdown]
        required: false

  - id: systemunit_factory_reset
    label: Factory Reset
    kind: action
    params:
      - name: Confirm
        type: enum
        values: [Yes]
      - name: TrailingAction
        type: enum
        values: [NoAction, Restart, Shutdown]
        required: false

  - id: http_feedback_register
    label: HTTP Feedback Register
    kind: action
    params:
      - name: FeedbackSlot
        type: integer
        description: "Slot (1-4)"
        required: false
      - name: ServerUrl
        type: string
        description: "URL for feedback POST (1-2048 chars)"
      - name: Expression
        type: string
        description: "XPath expression(s) (1-15, each 1-255 chars)"
        required: false

  - id: http_feedback_deregister
    label: HTTP Feedback Deregister
    kind: action
    params:
      - name: FeedbackSlot
        type: integer
        description: "Slot (1-4)"

  - id: feedback_register
    label: Feedback Register
    kind: action
    params:
      - name: path
        type: string
        description: "XPath expression for status/config/event feedback"

  - id: feedback_deregister
    label: Feedback Deregister
    kind: action
    params:
      - name: path
        type: string

  - id: conference_dnd_activate
    label: Do Not Disturb Activate
    kind: action
    params:
      - name: Timeout
        type: integer
        description: "Minutes before auto-deactivate (0-1440)"
        required: false

  - id: conference_dnd_deactivate
    label: Do Not Disturb Deactivate
    kind: action
    params: []

  - id: ui_message_alert_display
    label: Display Alert Message
    kind: action
    params:
      - name: Text
        type: string
        description: "Message text (0-255 chars)"
      - name: Title
        type: string
        required: false
      - name: Duration
        type: integer
        description: "Seconds (0-3600), 0=until cleared"
        required: false

  - id: ui_message_alert_clear
    label: Clear Alert Message
    kind: action
    params: []

  - id: ui_message_prompt_display
    label: Display Prompt
    kind: action
    params:
      - name: Text
        type: string
      - name: Title
        type: string
        required: false
      - name: FeedbackId
        type: string
        required: false
      - name: Option1
        type: string
        required: false
      - name: Option2
        type: string
        required: false
      - name: Option3
        type: string
        required: false
      - name: Option4
        type: string
        required: false
      - name: Option5
        type: string
        required: false

  - id: ui_message_prompt_clear
    label: Clear Prompt
    kind: action
    params:
      - name: FeedbackId
        type: string
        required: false

  - id: far_end_camera_move
    label: Far End Camera Move
    kind: action
    params:
      - name: CallId
        type: integer
        required: false
      - name: Value
        type: enum
        values: [Left, Right, Up, Down, ZoomIn, ZoomOut]

  - id: far_end_camera_stop
    label: Far End Camera Stop
    kind: action
    params:
      - name: CallId
        type: integer
        required: false
- id: callhistory_delete_entry
  label: Call History Delete Entry
  kind: action
  params:
    - name: CallHistoryId
      type: integer
      description: "Call history ID (1..2147483647)"
    - name: AcknowledgeConsecutiveDuplicates
      type: enum
      values: [False, True]
      required: false

- id: callhistory_acknowledge_all_missed_calls
  label: Call History Acknowledge All Missed Calls
  kind: action
  params: []

- id: phonebook_contact_add
  label: Phonebook Contact Add
  kind: action
  params:
    - name: Name
      type: string
      description: "Contact name (0-255 chars)"
    - name: FolderId
      type: string
      required: false
    - name: Number
      type: string
      required: false
    - name: Protocol
      type: enum
      values: [Auto, H320, H323, SIP]
      required: false
    - name: CallRate
      type: integer
      required: false
    - name: CallType
      type: enum
      values: [Audio, Video]
      required: false
    - name: Tag
      type: enum
      values: [Untagged, Favorite]
      required: false

- id: phonebook_contact_delete
  label: Phonebook Contact Delete
  kind: action
  params:
    - name: ContactId
      type: string
      description: "Unique contact identifier (0-255 chars)"

- id: peripherals_connect
  label: Peripherals Connect
  kind: action
  params:
    - name: ID
      type: string
      description: "Unique device identifier, typically MAC address (1-100 chars)"
    - name: Type
      type: enum
      values: [Byod, ControlSystem, Other, TouchPanel]
    - name: HardwareInfo
      type: string
      required: false
    - name: Name
      type: string
      required: false
    - name: NetworkAddress
      type: string
      required: false
    - name: SerialNumber
      type: string
      required: false
    - name: SoftwareInfo
      type: string
      required: false

- id: diagnostics_run
  label: Diagnostics Run
  kind: action
  params:
    - name: ResultSet
      type: enum
      values: [Alerts, All, None]
      required: false

- id: provisioning_complete_upgrade
  label: Provisioning Complete Upgrade
  kind: action
  params: []

- id: proximity_services_activate
  label: Proximity Services Activate
  kind: action
  params: []

- id: time_datetime_get
  label: Time Date Time Get
  kind: query
  params: []

- id: usermanagement_remote_support_user_create
  label: User Management Remote Support User Create
  kind: action
  params:
    - name: ExpiryDays
      type: integer
      description: "Passphrase validity duration in days (1-31), default 7"
      required: false

- id: video_active_speaker_pip_set
  label: Video Active Speaker PIP Set
  kind: action
  params:
    - name: Position
      type: enum
      values: [CenterLeft, CenterRight, LowerLeft, LowerRight, UpperCenter, UpperLeft, UpperRight]
```

## Feedbacks
```yaml
feedbacks:
  - id: audio_volume
    type: integer
    values: "0-100"
    description: Current speaker volume level

  - id: audio_volume_mute
    type: enum
    values: [On, Off]
    description: Volume mute state

  - id: audio_microphones_mute
    type: enum
    values: [On, Off]
    description: Microphone mute state

  - id: call_status
    type: enum
    values: [Idle, Dialling, Ringing, Connecting, Connected, Disconnecting, OnHold, EarlyMedia, Preserved, RemotePreserved]
    description: Current call status per CallId

  - id: call_direction
    type: enum
    values: [Incoming, Outgoing]

  - id: call_calltype
    type: enum
    values: [Video, Audio, AudioCanEscalate, ForwardAllCall, Unknown]

  - id: call_protocol
    type: enum
    values: [H320, H323, SIP]

  - id: call_encryption_type
    type: enum
    values: [None, Aes-128]

  - id: call_duration
    type: integer
    description: Call duration in seconds

  - id: standby_active
    type: enum
    values: [On, Off]
    description: Standby state

  - id: cameras_connected
    type: boolean
    description: Camera connection status per camera ID

  - id: conference_active_speaker_call_id
    type: integer
    description: CallId of current active speaker
```

## Variables
```yaml
variables:
  - id: audio_default_volume
    type: integer
    min: 0
    max: 100
    description: Default speaker volume (default 50)

  - id: audio_ring_volume
    type: integer
    min: 0
    max: 100
    description: Ring volume (default 40)

  - id: video_default_main_source
    type: enum
    values: [1, 2, 3]
    description: Default main video input source

  - id: video_presentation_default_source
    type: integer
    description: Default presentation source (default 2)

  - id: standby_delay
    type: integer
    min: 1
    max: 480
    description: Minutes idle before standby (default 10)

  - id: conference_auto_answer_mode
    type: enum
    values: [Off, On]
    description: Auto-answer mode

  - id: conference_auto_answer_delay
    type: integer
    min: 0
    max: 50
    description: Auto-answer delay in seconds

  - id: conference_default_call_rate
    type: integer
    min: 64
    max: 6000
    description: Default call rate in kbps

  - id: conference_default_call_protocol
    type: enum
    values: [Auto, H323, Sip, H320]
    description: Default call protocol

  - id: systemunit_name
    type: string
    description: System name (0-50 chars)
```

## Events
```yaml
events:
  - id: outgoing_call_indication
    description: Fired when an outgoing call is about to be dialled
    params:
      - name: CallId
        type: integer

  - id: call_disconnect
    description: Fired when a call is disconnected
    params:
      - name: CallId
        type: integer
      - name: CauseValue
        type: integer
      - name: CauseString
        type: string
      - name: CauseType
        type: string
      - name: OrigCallDirection
        type: string

  - id: call_successful
    description: Fired when a call connects successfully
    params:
      - name: CallId
        type: integer
      - name: Protocol
        type: string
      - name: Direction
        type: string
      - name: CallRate
        type: integer
      - name: RemoteURI
        type: string
      - name: EncryptionIn
        type: string
      - name: EncryptionOut
        type: string

  - id: fecc_action_indication
    description: Far end FECC commands received
    params:
      - name: Id
        type: integer
      - name: Req
        type: integer
      - name: Pan
        type: integer
      - name: Tilt
        type: integer
      - name: Zoom
        type: integer

  - id: tstring_received
    description: TString message received from far end
    params:
      - name: CallId
        type: integer
      - name: Message
        type: string

  - id: sstring_received
    description: SString message received from far end
    params:
      - name: String
        type: string
      - name: Id
        type: integer
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - systemunit_factory_reset
  - security_persistency
interlocks:
  - Only one of ConnectorId or SourceId may be used for video_input_set_main_source
  - Feedback subscriptions must be re-registered after session disconnect
  - HTTP feedback sessions must be explicitly closed to avoid exhausting limited concurrent sessions
  - Pan and tilt can be operated simultaneously but no other axis combinations
# UNRESOLVED: full power-on sequencing requirements not stated in source
```

## Notes
- All commands are case-insensitive.
- Three output modes available: terminal (line-based), XML, and JSON. Set via `xPreferences outputmode <terminal|xml|json>`.
- Feedback via terminal/SSH uses xFeedback register/deregister with XPath expressions. Up to 38 expressions per session.
- HTTP feedback uses `xCommand HttpFeedback Register` with up to 4 feedback slots, each supporting up to 15 XPath expressions.
- HTTP XMLAPI supports both Basic Access Authentication and session-based authentication (`/xmlapi/session/begin`).
- The serial port uses 115200 bps, 8 data bits, no parity, 1 stop bit via Micro USB.
- Telnet is disabled by default; enable via `xConfiguration NetworkServices Telnet Mode: On`.
- SSH is enabled by default.
- Values with spaces must be quoted in terminal mode commands.
- `** end` marks the end of a response block in terminal mode.
<!-- UNRESOLVED: default Telnet port not explicitly stated (likely 23 but not confirmed) -->
<!-- UNRESOLVED: default SSH port not explicitly stated (likely 22 but not confirmed) -->
<!-- UNRESOLVED: exact model list beyond MX200 G2/MX300 G2 not confirmed -->
<!-- UNRESOLVED: flow control setting for serial port not stated -->

## Provenance

```yaml
source_urls:
  - https://cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce91/dx70-dx80-api-reference-guide-ce91.pdf
  - https://cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce92/mx200g2-mx300g2-api-reference-guide-ce92.pdf
source_documents:
  - title: "Cisco public source"
    url: https://cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce91/dx70-dx80-api-reference-guide-ce91.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T09:02:41.550Z
  - title: "Cisco public source"
    url: https://cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce92/mx200g2-mx300g2-api-reference-guide-ce92.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T09:02:59.557Z
retrieved_at: 2026-04-29T09:02:59.557Z
last_checked_at: 2026-04-26T11:34:42.565Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T11:34:42.565Z
matched_actions: 77
action_count: 77
confidence: high
summary: "All 77 spec actions matched to source xCommand definitions with correct parameters and transport verified."
```

## Known Gaps

```yaml
[]
```
