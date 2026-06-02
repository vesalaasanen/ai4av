---
spec_id: admin/tandberg-video-conferencing
schema_version: ai4av-public-spec-v1
revision: 1
title: "Tandberg Video Conferencing Control Spec"
manufacturer: Tandberg
model_family: "Cisco TelePresence Codec C40"
aliases: []
compatible_with:
  manufacturers:
    - Tandberg
  models:
    - "Cisco TelePresence Codec C40"
    - "Cisco TelePresence Codec C60"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
  - community.cisco.com
source_urls:
  - https://www.cisco.com/en/US/docs/telepresence/endpoint/codec-c-series/tc6/api_reference_guide/codec-c90-api-reference-guide-tc62.pdf
  - https://www.cisco.com/en/US/docs/telepresence/endpoint/codec-c-series/tc5/api_reference_guide/codec_c60-c40_api_reference_guide_tc50.pdf
  - https://community.cisco.com/kxiwq67737/attachments/kxiwq67737/discussions-telepresence-video-infra/102802/3/codec-c60-c40-api-reference-guide-tc72.pdf
retrieved_at: 2026-05-14T18:17:21.166Z
last_checked_at: 2026-05-14T18:17:21.166Z
generated_at: 2026-05-14T18:17:21.166Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "xCommand Boot"
  - "xCommand Call DisconnectAll"
  - "xCommand Call HoldAll"
  - "xCommand FarEndControl"
  - "xCommand Preset"
  - "xCommand Conference"
  - "xCommand Logging"
  - "xCommand Message"
  - "xCommand Key"
  - "xCommand Video"
  - "xCommand SystemUnit"
  - "xCommand UserManagement"
  - "exact firmware version range not stated; document references TC4.0 through TC7.x"
  - "TCP port numbers for Telnet and HTTP not explicitly stated in source"
  - "SSH port not stated in source"
  - "Telnet port not stated in source"
  - "no explicit multi-step macro sequences documented in source"
  - "power-on sequencing requirements not documented in this source"
  - "exact TCP port numbers for Telnet, SSH, and HTTP not stated"
  - "firmware version compatibility range not stated"
  - "maximum number of simultaneous sessions not stated"
  - "command response timing/latency not documented"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.166Z
  matched_actions: 29
  action_count: 39
  confidence: medium
  summary: "All 29 spec actions matched literal xCommand tokens in source; transport parameters (38400 baud, serial, HTTP) verified; specification covers core call/media control comprehensively. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# Tandberg Video Conferencing Control Spec

## Summary
Tandberg (Cisco) TelePresence C40/C60 video conferencing codec with a comprehensive text-based API. The API is accessible over RS-232 serial, Telnet (TCP), SSH, and HTTP/HTTPS. Commands follow an xCommand/xConfiguration/xStatus/xEvent hierarchy with both terminal (line-based) and XML output modes. This spec covers the serial, Telnet, and HTTP control interfaces.

<!-- UNRESOLVED: exact firmware version range not stated; document references TC4.0 through TC7.x -->
<!-- UNRESOLVED: TCP port numbers for Telnet and HTTP not explicitly stated in source -->
<!-- UNRESOLVED: SSH port not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from Telnet/SSH mentions
  - http
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  # UNRESOLVED: Telnet port not stated in source
  # UNRESOLVED: SSH port not stated in source
  base_url: http://<ip-address>/putxml
auth:
  type: credential
  # Source states password prompting is on by default for serial; admin password
  # initially blank. Telnet/SSH require login. HTTP uses the same credentials.
  # Login required/optional is configurable per interface via xConfiguration.
```

## Traits
```yaml
traits:
  - powerable  # inferred from Standby Control On/Off
  - queryable  # inferred from xStatus query commands
  - routable  # inferred from Video Input Source routing and MainVideoSource
  - levelable  # inferred from Audio Volume (0..100), microphone levels, etc.
```

## Actions
```yaml
actions:
  - id: dial
    label: Dial
    kind: action
    description: Place a call to a number or URI
    params:
      - name: Number
        type: string
        description: Number or URI to dial
        required: true
      - name: Protocol
        type: enum
        values: [H323, Sip, H320]
        required: false
    command: "xCommand Dial Number: <number> Protocol: <protocol>"

  - id: hangup
    label: Hang Up
    kind: action
    description: Disconnect a call
    params:
      - name: CallId
        type: integer
        required: false
    command: "xCommand Call Disconnect"

  - id: answer
    label: Answer Incoming Call
    kind: action
    params: []
    command: "xCommand Call Accept"

  - id: reject
    label: Reject Incoming Call
    kind: action
    params: []
    command: "xCommand Call Reject"

  - id: standby_activate
    label: Activate Standby
    kind: action
    description: Put the codec into standby mode
    params: []
    command: "xCommand Standby Activate"

  - id: standby_deactivate
    label: Deactivate Standby
    kind: action
    description: Wake the codec from standby
    params: []
    command: "xCommand Standby Deactivate"

  - id: audio_volume_set
    label: Set Volume
    kind: action
    params:
      - name: Level
        type: integer
        description: Volume level 0..100
    command: "xCommand Audio Volume Set Level: <level>"

  - id: audio_volume_mute
    label: Mute Audio
    kind: action
    params: []
    command: "xCommand Audio Volume Mute"

  - id: audio_volume_unmute
    label: Unmute Audio
    kind: action
    params: []
    command: "xCommand Audio Volume Unmute"

  - id: presentation_start
    label: Start Presentation
    kind: action
    params:
      - name: Source
        type: integer
        description: Video input source number (1..3)
    command: "xCommand Presentation Start"

  - id: presentation_stop
    label: Stop Presentation
    kind: action
    params: []
    command: "xCommand Presentation Stop"

  - id: camera_position_set
    label: Set Camera Position
    kind: action
    params:
      - name: CameraId
        type: integer
        description: Camera ID (1..7)
        required: true
      - name: Pan
        type: integer
        required: false
      - name: Tilt
        type: integer
        required: false
      - name: Zoom
        type: integer
        required: false
    command: "xCommand Camera PositionSet CameraId: <id> Pan: <pan> Tilt: <tilt> Zoom: <zoom>"

  - id: camera_preset_store
    label: Store Camera Preset
    kind: action
    params:
      - name: PresetId
        type: integer
        description: Preset number (1..15)
        required: true
      - name: CameraId
        type: integer
        required: false
      - name: Type
        type: enum
        values: [Camera, All]
        required: false
    command: "xCommand Camera Preset Store"

  - id: camera_preset_activate
    label: Activate Camera Preset
    kind: action
    params:
      - name: PresetId
        type: integer
        description: Preset number (1..15)
        required: true
    command: "xCommand Camera Preset Activate"

  - id: video_layout_assign_call
    label: Assign Video Layout to Call
    kind: action
    params:
      - name: CallId
        type: integer
        required: true
      - name: LayoutId
        type: integer
        required: true
    command: "xCommand Video Layout AssignCall CallId: <callid> LayoutId: <layoutid>"

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
      - name: OnMonitorRole
        type: enum
        values: [First, Second, Third, Fourth]
        required: false
      - name: PIPPosition
        type: enum
        values: [CenterLeft, CenterRight, LowerLeft, LowerRight, UpperCenter, UpperLeft, UpperRight]
        required: false
    command: "xCommand Video Selfview Set"

  - id: dtmf_send
    label: Send DTMF
    kind: action
    params:
      - name: CallId
        type: integer
        required: false
      - name: DTMF
        type: string
        required: true
    command: "xCommand DTMFSend"

  - id: systemunit_adminpassword_set
    label: Set Admin Password
    kind: action
    params:
      - name: Password
        type: string
        required: true
    command: "xCommand SystemUnit AdminPassword Set Password: <password>"

  - id: phonebook_search
    label: Search Phonebook
    kind: action
    params:
      - name: SearchString
        type: string
        required: false
    command: "xCommand Phonebook Search"

  - id: httpfeedback_register
    label: Register HTTP Feedback
    kind: action
    description: Register HTTP POST callback for unsolicited feedback
    params:
      - name: FeedbackSlot
        type: integer
        description: Slot number (1..4)
        required: true
      - name: ServerUrl
        type: string
        required: true
      - name: Expression
        type: string
        description: XPath expression for feedback (up to 15 per slot)
        required: false
    command: "xCommand HttpFeedback Register FeedbackSlot: <slot> ServerUrl: <url> Expression: <expr>"

  - id: feedback_register
    label: Register Feedback Expression
    kind: action
    description: Register feedback for the current terminal session
    params:
      - name: Path
        type: string
        description: XPath expression (e.g. /Status/Audio)
        required: true
    command: "xFeedback register <path>"

  - id: feedback_deregister
    label: Deregister Feedback Expression
    kind: action
    params:
      - name: Path
        type: string
        required: true
    command: "xFeedback deregister <path>"

  - id: preferences_outputmode
    label: Set Output Mode
    kind: action
    description: Switch between terminal and XML output
    params:
      - name: Mode
        type: enum
        values: [terminal, xml]
        required: true
    command: "xPreferences outputmode <mode>"

  - id: bye
    label: Disconnect Session
    kind: action
    description: Close the command line interface session
    params: []
    command: "bye"
  - id: status_systemunit
    label: Query SystemUnit Status
    kind: query
    description: Query top-level system unit status including hardware and software version
    params: []
    command: "xStatus SystemUnit"

  - id: status_camera
    label: Query Camera Status
    kind: query
    description: Query top-level camera status including connection state
    params: []
    command: "xStatus Camera"

  - id: status_video
    label: Query Video Status
    kind: query
    description: Query top-level video status including layout and output information
    params: []
    command: "xStatus Video"

  - id: status_audio
    label: Query Audio Status
    kind: query
    description: Query top-level audio status including local and remote inputs
    params: []
    command: "xStatus Audio"

  - id: status_network
    label: Query Network Status
    kind: query
    description: Query top-level network status including IP and Ethernet information
    params: []
    command: "xStatus Network"

  - id: status_h323
    label: Query H323 Status
    kind: query
    description: Query top-level H323 status including gatekeeper registration
    params: []
    command: "xStatus H323"

  - id: status_sip
    label: Query SIP Status
    kind: query
    description: Query top-level SIP proxy and registration status
    params: []
    command: "xStatus SIP"

  - id: status_mediachannel
    label: Query Media Channels Status
    kind: query
    description: Query top-level media channel status for active calls
    params: []
    command: "xStatus MediaChannels"

  - id: status_call
    label: Query Call Status
    kind: query
    description: Query status of all active calls including call ID and state
    params: []
    command: "xStatus Call"

  - id: status_conference
    label: Query Conference Status
    kind: query
    description: Query top-level conference status including presentation mode
    params: []
    command: "xStatus Conference"

  - id: history_calllogs
    label: Query Call History
    kind: query
    description: Return call logs including missed, received, and outgoing calls
    params: []
    command: "xHistory"

  - id: configuration_get_cameras
    label: Get Cameras Configuration
    kind: query
    description: Read current cameras configuration including speaker track and camera settings
    params: []
    command: "xConfiguration Cameras"

  - id: configuration_get_network
    label: Get Network Configuration
    kind: query
    description: Read current network configuration including IPv4/IPv6 and QoS settings
    params: []
    command: "xConfiguration Network"

  - id: configuration_get_h323
    label: Get H323 Configuration
    kind: query
    description: Read current H323 profile configuration including gatekeeper settings
    params: []
    command: "xConfiguration H323"

  - id: configuration_get_sip
    label: Get SIP Configuration
    kind: query
    description: Read current SIP profile configuration
    params: []
    command: "xConfiguration SIP"

  # === xCommands documented in source but not previously enumerated ===
  # Each command literal appears verbatim in the refined source.

  - id: audio_microphones_mute
    label: Mute all microphones
    kind: action
    params: []
    command: "xCommand Audio Microphones Mute"

  - id: audio_microphones_unmute
    label: Unmute all microphones
    kind: action
    params: []
    command: "xCommand Audio Microphones Unmute"

  - id: boot
    label: Reboot the system
    kind: action
    params: []
    command: "xCommand Boot"

  - id: call_hold
    label: Place active call on hold
    kind: action
    params: []
    command: "xCommand Call Hold"

  - id: call_resume
    label: Resume held call
    kind: action
    params: []
    command: "xCommand Call Resume"

  - id: call_disconnect_all
    label: Disconnect all active calls
    kind: action
    params: []
    command: "xCommand Call DisconnectAll"

  - id: callhistory_get
    label: Get call history
    kind: query
    params: []
    command: "xCommand CallHistory Get"

  - id: callhistory_delete_all
    label: Delete all call history entries
    kind: action
    params: []
    command: "xCommand CallHistory DeleteAll"

  - id: farend_camera_move
    label: Move far-end camera
    kind: action
    params: []
    command: "xCommand FarEndControl Camera Move"

  - id: farend_preset_activate
    label: Activate a far-end camera preset
    kind: action
    params: []
    command: "xCommand FarEndControl Preset Activate"

  - id: preset_store
    label: Store a local camera preset
    kind: action
    params: []
    command: "xCommand Preset Store"

  - id: preset_activate
    label: Activate a local camera preset
    kind: action
    params: []
    command: "xCommand Preset Activate"

  - id: conference_dnd_activate
    label: Activate Do Not Disturb
    kind: action
    params: []
    command: "xCommand Conference DoNotDisturb Activate"

  - id: camera_ramp
    label: Continuous camera move ("ramp")
    kind: action
    params: []
    command: "xCommand Camera Ramp"

  - id: camera_trigger_autofocus
    label: Trigger one-shot autofocus on local camera
    kind: action
    params: []
    command: "xCommand Camera TriggerAutofocus"

  - id: gpio_set
    label: Set GPIO pin manual state
    kind: action
    params: []
    command: "xCommand GPIO ManualState Set"

  - id: message_alert_display
    label: Display an on-screen alert message
    kind: action
    params: []
    command: "xCommand Message Alert Display"

  - id: peripherals_connect
    label: Register a connected peripheral with the system
    kind: action
    params: []
    command: "xCommand Peripherals Connect"

  - id: security_fips_activate
    label: Activate FIPS-140 cryptographic mode
    kind: action
    params: []
    command: "xCommand Security FIPSMode Activate"

  - id: systemunit_factory_reset
    label: Reset the system to factory defaults
    kind: action
    params: []
    command: "xCommand SystemUnit FactoryReset"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [active, standby]
    description: Queried via xStatus Standby Active
    query: "xStatus Standby Active"
    response_prefix: "*s Standby Active:"

  - id: call_status
    type: string
    description: Returns call state, direction, protocol, remote number, call rate, etc.
    query: "xStatus Call"
    response_prefix: "*s Call"

  - id: audio_volume
    type: integer
    description: Current volume level 0..100
    query: "xStatus Audio Volume"
    response_prefix: "*s Audio Volume"

  - id: audio_mute
    type: enum
    values: [On, Off]
    description: Microphone mute state
    query: "xStatus Audio Microphones Mute"
    response_prefix: "*s Audio Microphones Mute:"

  - id: video_input_source_resolution
    type: string
    description: Resolution of video input sources
    query: "xStatus //vid//res//wid"
    response_prefix: "*s Video"

  - id: systemunit_software_version
    type: string
    query: "xStatus SystemUnit Software Version"
    response_prefix: "*s SystemUnit Software Version:"
```

## Variables
```yaml
variables:
  - id: audio_default_volume
    type: integer
    min: 0
    max: 100
    description: Default speaker volume (restored on power-on)
    set: "xConfiguration Audio DefaultVolume: <value>"
    query: "xConfiguration Audio DefaultVolume"

  - id: audio_ring_volume
    type: integer
    min: 0
    max: 100
    description: Ring volume for incoming calls
    set: "xConfiguration Audio SoundsAndAlerts RingVolume: <value>"
    query: "xConfiguration Audio SoundsAndAlerts RingVolume"

  - id: video_main_source
    type: integer
    min: 1
    max: 3
    description: Main video source selection
    set: "xConfiguration Video MainVideoSource: <value>"
    query: "xConfiguration Video MainVideoSource"

  - id: conference_autoanswer_mode
    type: enum
    values: [Off, On]
    set: "xConfiguration Conference 1 AutoAnswer Mode: <value>"
    query: "xConfiguration Conference 1 AutoAnswer Mode"

  - id: conference_defaultcall_protocol
    type: enum
    values: [Auto, H323, Sip, H320]
    set: "xConfiguration Conference 1 DefaultCall Protocol: <value>"
    query: "xConfiguration Conference 1 DefaultCall Protocol"

  - id: conference_defaultcall_rate
    type: integer
    min: 64
    max: 6000
    description: Default call rate in kbps
    set: "xConfiguration Conference 1 DefaultCall Rate: <value>"
    query: "xConfiguration Conference 1 DefaultCall Rate"

  - id: standby_delay
    type: integer
    min: 1
    max: 480
    description: Minutes of idle before standby
    set: "xConfiguration Standby Delay: <value>"
    query: "xConfiguration Standby Delay"

  - id: serial_baud_rate
    type: enum
    values: [9600, 19200, 38400, 57600, 115200]
    description: Serial port baud rate (requires reboot)
    set: "xConfiguration SerialPort BaudRate: <value>"
    query: "xConfiguration SerialPort BaudRate"

  - id: system_name
    type: string
    max_length: 50
    set: "xConfiguration SystemUnit Name: <value>"
    query: "xConfiguration SystemUnit Name"

  - id: telnet_mode
    type: enum
    values: [Off, On]
    description: Enable/disable Telnet access (factory default Off)
    set: "xConfiguration NetworkServices Telnet Mode: <value>"
    query: "xConfiguration NetworkServices Telnet Mode"

  - id: http_mode
    type: enum
    values: [Off, On]
    set: "xConfiguration NetworkServices HTTP Mode: <value>"
    query: "xConfiguration NetworkServices HTTP Mode"

  - id: https_mode
    type: enum
    values: [Off, On]
    set: "xConfiguration NetworkServices HTTPS Mode: <value>"
    query: "xConfiguration NetworkServices HTTPS Mode"
```

## Events
```yaml
events:
  - id: outgoing_call_indication
    description: Fired when an outgoing call is about to be dialed
    format: "*e OutgoingCallIndication CallId: <id>"

  - id: call_successful
    description: Fired when a call is connected successfully
    format: '*e CallSuccessful CallId: <id> Protocol: "<proto>" Direction: "<dir>" CallRate: <rate>'

  - id: call_disconnect
    description: Fired when a call is disconnected
    format: '*e CallDisconnect CallId: <id> CauseValue: <val> CauseType: <type>'

  - id: fecc_action
    description: Far End Camera Control action request
    format: "*e FeccActionInd Id: <id> Req: <req> Pan: <pan> Tilt: <tilt> Zoom: <zoom>"

  - id: tstring_message
    description: TString message received from far end
    format: '*e TString CallId: <id> Message: "<msg>"'
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# The source mentions that changing serial port baud rate or enabling/disabling
# HTTP/HTTPS requires a reboot of the codec. No explicit safety interlocks described.
# UNRESOLVED: power-on sequencing requirements not documented in this source
```

## Notes
- All commands are case-insensitive. `xCommand Dial`, `xcommand dial`, and `XCOMMAND DIAL` all work.
- The API has two output modes: **terminal** (line-based, default) and **XML** (switch with `xPreferences outputmode xml`).
- Feedback registration is per-session: each RS-232/Telnet/SSH session must register its own feedback expressions independently.
- Up to 38 feedback expressions can be registered per session.
- For HTTP feedback, the codec can POST notifications to up to 4 external server URLs (FeedbackSlot 1..4). Avoid FeedbackSlot 3 if Cisco TMS is in use.
- The `//` search shortcut (e.g. `xConfiguration //dvi`) works for inspection but should not be used in production integrations — always use complete command paths.
- During the initial boot sequence, the codec uses 38400 baud regardless of the configured serial baud rate.
- The codec supports the `xGetxml` command and `/getxml?location=<path>` HTTP endpoint for querying XML documents.
- HTTP POST commands require `Content-Type: text/xml`.
- The default admin password is initially blank; setting it is strongly recommended.

<!-- UNRESOLVED: exact TCP port numbers for Telnet, SSH, and HTTP not stated -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: maximum number of simultaneous sessions not stated -->
<!-- UNRESOLVED: command response timing/latency not documented -->

## Provenance

```yaml
source_domains:
  - cisco.com
  - community.cisco.com
source_urls:
  - https://www.cisco.com/en/US/docs/telepresence/endpoint/codec-c-series/tc6/api_reference_guide/codec-c90-api-reference-guide-tc62.pdf
  - https://www.cisco.com/en/US/docs/telepresence/endpoint/codec-c-series/tc5/api_reference_guide/codec_c60-c40_api_reference_guide_tc50.pdf
  - https://community.cisco.com/kxiwq67737/attachments/kxiwq67737/discussions-telepresence-video-infra/102802/3/codec-c60-c40-api-reference-guide-tc72.pdf
retrieved_at: 2026-05-14T18:17:21.166Z
last_checked_at: 2026-05-14T18:17:21.166Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.166Z
matched_actions: 29
action_count: 39
confidence: medium
summary: "All 29 spec actions matched literal xCommand tokens in source; transport parameters (38400 baud, serial, HTTP) verified; specification covers core call/media control comprehensively. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "xCommand Boot"
- "xCommand Call DisconnectAll"
- "xCommand Call HoldAll"
- "xCommand FarEndControl"
- "xCommand Preset"
- "xCommand Conference"
- "xCommand Logging"
- "xCommand Message"
- "xCommand Key"
- "xCommand Video"
- "xCommand SystemUnit"
- "xCommand UserManagement"
- "exact firmware version range not stated; document references TC4.0 through TC7.x"
- "TCP port numbers for Telnet and HTTP not explicitly stated in source"
- "SSH port not stated in source"
- "Telnet port not stated in source"
- "no explicit multi-step macro sequences documented in source"
- "power-on sequencing requirements not documented in this source"
- "exact TCP port numbers for Telnet, SSH, and HTTP not stated"
- "firmware version compatibility range not stated"
- "maximum number of simultaneous sessions not stated"
- "command response timing/latency not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
