---
spec_id: admin/cisco-tandberg-c20
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco TANDBERG Codec C20 Control Spec"
manufacturer: Cisco
model_family: "TANDBERG Codec C20"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "TANDBERG Codec C20"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/en/US/docs/telepresence/endpoint/codec-c-series/tc3/api_reference_guide/tandberg_codec-c60-c40_api_guide_tc31.pdf
retrieved_at: 2026-05-22T05:45:14.973Z
last_checked_at: 2026-06-09T07:43:19.202Z
generated_at: 2026-06-09T07:43:19.202Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version compatibility range not stated"
  - "SSH port not explicitly stated (assumed standard 22)"
  - "Telnet port not explicitly stated in source (Telnet disabled by default, must be enabled via xConfiguration NetworkServices Telnet Mode: On)"
  - "TXAS HTTP base URL not explicitly stated; source says \"connects to the normal web port (80)\" but exact path structure follows /getxml, /formputxml, /putxml"
  - "no explicit multi-step sequences described in source"
  - "source does not describe explicit safety interlocks or power-on sequencing"
  - "SSH port not explicitly stated"
  - "exact firmware version compatibility for TC3.1 API not specified"
  - "maximum concurrent Telnet/SSH sessions not stated"
verification:
  verdict: verified
  checked_at: 2026-06-09T07:43:19.202Z
  matched_actions: 97
  action_count: 97
  confidence: medium
  summary: "All 97 spec actions found with literal wire-level command matches and correct parameter shapes in TANDBERG API source; transport parameters verified in source documentation. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Cisco TANDBERG Codec C20 Control Spec

## Summary

The Cisco TANDBERG Codec C20 is a video conferencing codec controllable via the TANDBERG XACLI command-line interface over RS-232 serial, Telnet, or SSH, and via the TANDBERG XML API Service (TXAS) over HTTP/HTTPS. The API uses a hierarchical path model (XPath or SimplePath) with three command types: xConfiguration (read/write settings), xCommand (actions), and xStatus (state queries). Feedback subscriptions push state changes to connected control systems.

<!-- UNRESOLVED: exact firmware version compatibility range not stated -->
<!-- UNRESOLVED: SSH port not explicitly stated (assumed standard 22) -->

## Transport

```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: null  # UNRESOLVED: Telnet port not explicitly stated in source (Telnet disabled by default, must be enabled via xConfiguration NetworkServices Telnet Mode: On)
  base_url: null  # UNRESOLVED: TXAS HTTP base URL not explicitly stated; source says "connects to the normal web port (80)" but exact path structure follows /getxml, /formputxml, /putxml
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: DTR/RTS ignored, DSR/CD/CTS always asserted
auth:
  type: credential
  username: admin
  password: TANDBERG
  # Default credentials stated in source for Telnet/SSH and serial login
```

## Traits

```yaml
traits:
  - powerable       # inferred: xCommand Boot (reboot), xCommand Standby Activate/Deactivate
  - queryable       # inferred: xStatus commands return system state
  - levelable       # inferred: Audio Volume (0..100), input/output levels
  - routable        # inferred: Video source selection, presentation source, audio routing
```

## Actions

```yaml
actions:
  - id: boot
    label: Boot / Reboot
    kind: action
    command: xCommand Boot
    params: []
    response: "*r BootResult (status=OK):"

  - id: dial
    label: Dial
    kind: action
    command: xCommand Dial
    params:
      - name: Number
        type: string
        required: true
        description: "Dial string (S: 0, 255)"
      - name: Protocol
        type: enum
        values: [H323, Sip]
        description: Call protocol
      - name: CallRate
        type: integer
        description: "Call rate (64..6000)"
      - name: CallType
        type: enum
        values: [Audio, Video]
        description: Call type
    response: "*r DialResult (status=OK): CallId: <n> ConferenceId: <n>"

  - id: call_accept
    label: Accept Incoming Call
    kind: action
    command: xCommand Call Accept
    params:
      - name: CallId
        type: integer
        description: "Call ID (0..65534)"
    response: "*r CallAcceptResult (status=OK):"

  - id: call_reject
    label: Reject Incoming Call
    kind: action
    command: xCommand Call Reject
    params:
      - name: CallId
        type: integer
        description: "Call ID (0..65534)"
    response: "*r CallRejectResult (status=OK):"

  - id: call_disconnect
    label: Disconnect Call
    kind: action
    command: xCommand Call Disconnect
    params:
      - name: CallId
        type: integer
        description: "Call ID (0..65534)"
    response: "*r DisconnectCallResult (status=OK):"

  - id: call_disconnect_all
    label: Disconnect All Calls
    kind: action
    command: xCommand Call DisconnectAll
    params: []
    response: "*r DisconnectAllResult (status=OK):"

  - id: standby_activate
    label: Enter Standby
    kind: action
    command: xCommand Standby Activate
    params: []
    response: "*r ActivateResult (status=OK):"

  - id: standby_deactivate
    label: Exit Standby
    kind: action
    command: xCommand Standby Deactivate
    params: []
    response: "*r DeactivateResult (status=OK):"

  - id: standby_reset_timer
    label: Reset Standby Timer
    kind: action
    command: xCommand Standby ResetTimer
    params:
      - name: Delay
        type: integer
        description: "Delay in minutes (1..480)"

  - id: mic_mute
    label: Mute Microphones
    kind: action
    command: xCommand Audio Microphones Mute
    params: []
    response: "*r AudioMicrophonesMuteResult (status=OK):"

  - id: mic_unmute
    label: Unmute Microphones
    kind: action
    command: xCommand Audio Microphones Unmute
    params: []
    response: "*r AudioMicrophonesUnmuteResult (status=OK):"

  - id: audio_sound_play
    label: Play Sound
    kind: action
    command: xCommand Audio Sound Play
    params:
      - name: Sound
        type: enum
        required: true
        values: [Busy, CallWaiting, Dial, KeyTone, Ringing, SpecialInfo, TelephoneCall, VideoCall]
      - name: Loop
        type: enum
        values: [On, Off]

  - id: audio_sound_stop
    label: Stop Sound
    kind: action
    command: xCommand Audio Sound Stop
    params: []

  - id: presentation_start
    label: Start Presentation
    kind: action
    command: xCommand Presentation Start
    params:
      - name: PresentationSource
        type: integer
        description: "Source (1..5)"
    response: "*r PresentationStartResult (status=OK):"

  - id: presentation_stop
    label: Stop Presentation
    kind: action
    command: xCommand Presentation Stop
    params: []
    response: "*r PresentationStopResult (status=OK):"

  - id: camera_position_set
    label: Set Camera Position
    kind: action
    command: xCommand Camera PositionSet
    params:
      - name: CameraId
        type: integer
        required: true
        description: "Camera ID (1..7)"
      - name: Pan
        type: integer
        description: "Pan position (-65535..65535)"
      - name: Tilt
        type: integer
        description: "Tilt position (-65535..65535)"
      - name: Zoom
        type: integer
        description: "Zoom position (0..65535)"
      - name: Focus
        type: integer
        description: "Focus position (0..65535)"
    response: "*r CameraPositionSetResult (status=OK):"

  - id: camera_ramp
    label: Camera Ramp (Continuous Move)
    kind: action
    command: xCommand Camera Ramp
    params:
      - name: CameraId
        type: integer
        required: true
        description: "Camera ID (1..7)"
      - name: Pan
        type: enum
        values: [Left, Right, Stop]
      - name: PanSpeed
        type: integer
        description: "Pan speed (1..15)"
      - name: Tilt
        type: enum
        values: [Down, Stop, Up]
      - name: TiltSpeed
        type: integer
        description: "Tilt speed (1..15)"
      - name: Zoom
        type: enum
        values: [In, Out, Stop]
      - name: ZoomSpeed
        type: integer
        description: "Zoom speed (1..15)"
      - name: Focus
        type: enum
        values: [Far, Near, Stop]

  - id: camera_pantilt_reset
    label: Camera Pan/Tilt Reset
    kind: action
    command: xCommand Camera PanTiltReset
    params:
      - name: CameraId
        type: integer
        required: true
        description: "Camera ID (1..7)"

  - id: camera_trigger_autofocus
    label: Trigger Autofocus
    kind: action
    command: xCommand Camera TriggerAutofocus
    params:
      - name: CameraId
        type: integer
        required: true
        description: "Camera ID (1..7)"

  - id: preset_store
    label: Store Preset
    kind: action
    command: xCommand Preset Store
    params:
      - name: PresetId
        type: integer
        required: true
        description: "Preset ID (1..15)"
      - name: Type
        type: enum
        required: true
        values: [All, Camera]
      - name: Description
        type: string
        description: "Preset description (S: 0, 255)"

  - id: preset_activate
    label: Activate Preset
    kind: action
    command: xCommand Preset Activate
    params:
      - name: PresetId
        type: integer
        required: true
        description: "Preset ID (1..15)"

  - id: preset_clear
    label: Clear Preset
    kind: action
    command: xCommand Preset Clear
    params:
      - name: PresetId
        type: integer
        required: true
        description: "Preset ID (1..15)"

  - id: dtmf_send
    label: Send DTMF
    kind: action
    command: xCommand DTMFSend
    params:
      - name: CallId
        type: integer
        required: true
        description: "Call ID (0..65534)"
      - name: DTMFString
        type: string
        required: true
        description: "DTMF digits (S: 0, 32)"

  - id: key_click
    label: Simulate Key Click
    kind: action
    command: xCommand Key Click
    params:
      - name: Key
        type: enum
        required: true
        values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, C, Call, Disconnect, Down, F1, F2, F3, F4, F5, Grab, Home, Layout, Left, Mute, MuteMic, Ok, PhoneBook, Presentation, Right, Selfview, Square, SrcAux, SrcCamera, SrcDocCam, SrcPc, SrcVcr, Star, Up, VolumeDown, VolumeUp, ZoomIn, ZoomOut]

  - id: key_press
    label: Simulate Key Press
    kind: action
    command: xCommand Key Press
    params:
      - name: Key
        type: enum
        required: true
        description: Same values as Key Click

  - id: key_release
    label: Simulate Key Release
    kind: action
    command: xCommand Key Release
    params:
      - name: Key
        type: enum
        required: true
        description: Same values as Key Click

  - id: message_alert_display
    label: Display Alert Message
    kind: action
    command: xCommand Message Alert Display
    params:
      - name: Text
        type: string
        required: true
        description: "Alert text (S: 0, 255)"
      - name: Duration
        type: integer
        description: "Display duration in seconds (0..3600)"

  - id: message_alert_clear
    label: Clear Alert Message
    kind: action
    command: xCommand Message Alert Clear
    params: []

  - id: message_prompt_display
    label: Display Prompt with Options
    kind: action
    command: xCommand Message Prompt Display
    params:
      - name: Title
        type: string
        description: "Prompt title (S: 0, 255)"
      - name: Text
        type: string
        required: true
        description: "Prompt text (S: 0, 255)"
      - name: FeedbackId
        type: string
        description: "Feedback ID (S: 0, 255)"
      - name: Option.1
        type: string
        description: "Option 1 text (S: 0, 255)"
      - name: Option.2
        type: string
        description: "Option 2 text (S: 0, 255)"
      - name: Option.3
        type: string
        description: "Option 3 text (S: 0, 255)"
      - name: Option.4
        type: string
        description: "Option 4 text (S: 0, 255)"
      - name: Option.5
        type: string
        description: "Option 5 text (S: 0, 255)"

  - id: far_end_camera_move
    label: Far End Camera Move
    kind: action
    command: xCommand FarEndControl Camera Move
    params:
      - name: CallId
        type: integer
        required: true
        description: "Call ID (0..65534)"
      - name: Value
        type: enum
        required: true
        values: [Left, Right, Up, Down, ZoomIn, ZoomOut]

  - id: far_end_camera_stop
    label: Far End Camera Stop
    kind: action
    command: xCommand FarEndControl Camera Stop
    params:
      - name: CallId
        type: integer
        required: true
        description: "Call ID (0..65534)"

  - id: http_feedback_register
    label: Register HTTP Feedback
    kind: action
    command: xCommand HttpFeedback Register
    params:
      - name: FeedbackSlot
        type: integer
        description: "Slot (1..3)"
      - name: ServerUrl
        type: string
        required: true
        description: "Feedback receiver URL (S: 1, 256)"
      - name: Expression
        type: string
        description: "XPath expression (S: 1, 256), up to 15 expressions"

  - id: http_feedback_deregister
    label: Deregister HTTP Feedback
    kind: action
    command: xCommand HttpFeedback Deregister
    params:
      - name: FeedbackSlot
        type: integer
        description: "Slot (1..3)"

  - id: gpio_set
    label: Set GPIO Pin State
    kind: action
    command: xCommand GPIO ManualState Set
    params:
      - name: Pin1
        type: enum
        values: [High, Low]
      - name: Pin2
        type: enum
        values: [High, Low]
      - name: Pin3
        type: enum
        values: [High, Low]
      - name: Pin4
        type: enum
        values: [High, Low]

  - id: systemunit_factory_reset
    label: Factory Reset
    kind: action
    command: xCommand SystemUnit FactoryReset
    params:
      - name: Confirm
        type: enum
        required: true
        values: [Yes]
    response: "*r FactoryResetConfirmResult (status=OK):"

  - id: video_layout_set
    label: Set Video Layout
    kind: action
    command: xCommand Video PictureLayoutSet
    params:
      - name: LayoutFamily
        type: enum
        required: true
        values: [Auto, Equal, Fullscreen, PresentationLargeSpeaker, PresentationSmallSpeaker]

  - id: camctrl_pip
    label: Toggle PiP Mode
    kind: action
    command: xCommand CamCtrlPip
    params:
      - name: Mode
        type: enum
        required: true
        values: [On, Off]
  - id: audio_equalizer_list
    label: List Audio Equalizer Settings
    kind: query
    command: xCommand Audio Equalizer List
    params:
      - name: EqualizerId
        type: integer
        description: "Equalizer ID (1..8)"
    response: "*r AudioEqualizerListResult Equalizer <n> Section <n> FilterType: ..."

  - id: audio_equalizer_update
    label: Update Audio Equalizer
    kind: action
    command: xCommand Audio Equalizer Update
    params:
      - name: EqualizerId
        type: integer
        required: true
        description: "Equalizer ID (1..8)"
      - name: Section
        type: integer
        required: true
        description: "Section (1..6)"
      - name: FilterType
        type: enum
        required: true
        values: [HighPass, HighShelf, LowPass, LowShelf, None, Peaking]
      - name: Frequency
        type: string
        required: true
        description: "Frequency value (S: 0, 32)"
      - name: Q
        type: string
        required: true
        description: "Q value (S: 0, 32)"
      - name: Gain
        type: string
        required: true
        description: "Gain value (S: 0, 32)"

  - id: audio_local_input_add
    label: Add Audio Local Input Group
    kind: action
    command: xCommand Audio LocalInput Add
    params:
      - name: InputId
        type: integer
        description: "Input ID (0..65534)"
      - name: Name
        type: string
        description: "Input name (S: 0, 255)"
      - name: MixerMode
        type: enum
        values: [Auto, Fixed, GainShared]
      - name: AGC
        type: enum
        values: [On, Off]
      - name: Mute
        type: enum
        values: [On, Off]
      - name: Channels
        type: integer
        description: "Number of channels (1..2)"
    response: "*r AudioInputGroupAddResult (status=OK): InputId: <n>"

  - id: audio_local_input_update
    label: Update Audio Local Input Group
    kind: action
    command: xCommand Audio LocalInput Update
    params:
      - name: InputId
        type: integer
        required: true
        description: "Input ID (0..65534)"
      - name: Name
        type: string
        description: "Input name (S: 0, 255)"
      - name: MixerMode
        type: enum
        required: true
        values: [Auto, Fixed, GainShared]
      - name: AGC
        type: enum
        required: true
        values: [On, Off]
      - name: Mute
        type: enum
        required: true
        values: [On, Off]
      - name: Channels
        type: integer
        required: true
        description: "Number of channels (1..2)"
    response: "*r AudioInputGroupUpdateResult (status=OK):"

  - id: audio_local_input_remove
    label: Remove Audio Local Input Group
    kind: action
    command: xCommand Audio LocalInput Remove
    params:
      - name: InputId
        type: integer
        required: true
        description: "Input ID (0..65534)"
    response: "*r AudioInputGroupRemoveResult (status=OK):"

  - id: audio_local_input_add_connector
    label: Add Connector to Audio Local Input Group
    kind: action
    command: xCommand Audio LocalInput AddConnector
    params:
      - name: InputId
        type: integer
        required: true
        description: "Input ID (0..65534)"
      - name: ConnectorType
        type: enum
        required: true
        values: [HDMI, Line, Microphone]
      - name: ConnectorId
        type: integer
        required: true
        description: "Connector ID (1..8)"
    response: "*r AudioInputGroupAddConnectorResult (status=OK):"

  - id: audio_local_input_remove_connector
    label: Remove Connector from Audio Local Input Group
    kind: action
    command: xCommand Audio LocalInput RemoveConnector
    params:
      - name: InputId
        type: integer
        required: true
        description: "Input ID (0..65534)"
      - name: ConnectorType
        type: enum
        required: true
        values: [HDMI, Line, Microphone]
      - name: ConnectorId
        type: integer
        required: true
        description: "Connector ID (1..8)"
    response: "*r AudioInputGroupRemoveConnectorResult (status=OK):"

  - id: audio_local_output_add
    label: Add Audio Local Output Group
    kind: action
    command: xCommand Audio LocalOutput Add
    params:
      - name: OutputId
        type: integer
        description: "Output ID (0..65534)"
      - name: Name
        type: string
        description: "Output name (S: 0, 255)"
      - name: Loudspeaker
        type: enum
        values: [On, Off]
      - name: Channels
        type: integer
        description: "Number of channels (1..2)"
    response: "*r AudioOutputGroupAddResult (status=OK): OutputId: <n>"

  - id: audio_local_output_update
    label: Update Audio Local Output Group
    kind: action
    command: xCommand Audio LocalOutput Update
    params:
      - name: OutputId
        type: integer
        required: true
        description: "Output ID (0..65534)"
      - name: Name
        type: string
        required: true
        description: "Output name (S: 0, 255)"
      - name: Loudspeaker
        type: enum
        required: true
        values: [On, Off]
      - name: Channels
        type: integer
        required: true
        description: "Number of channels (1..2)"
    response: "*r AudioOutputGroupUpdateResult (status=OK):"

  - id: audio_local_output_remove
    label: Remove Audio Local Output Group
    kind: action
    command: xCommand Audio LocalOutput Remove
    params:
      - name: OutputId
        type: integer
        required: true
        description: "Output ID (0..65534)"
    response: "*r AudioOutputGroupRemoveResult (status=OK):"

  - id: audio_local_output_add_connector
    label: Add Connector to Audio Local Output Group
    kind: action
    command: xCommand Audio LocalOutput AddConnector
    params:
      - name: OutputId
        type: integer
        required: true
        description: "Output ID (0..65534)"
      - name: ConnectorType
        type: enum
        required: true
        values: [HDMI, Line]
      - name: ConnectorId
        type: integer
        required: true
        description: "Connector ID (1..8)"
    response: "*r AudioOutputGroupAddConnectorResult (status=OK):"

  - id: audio_local_output_remove_connector
    label: Remove Connector from Audio Local Output Group
    kind: action
    command: xCommand Audio LocalOutput RemoveConnector
    params:
      - name: OutputId
        type: integer
        required: true
        description: "Output ID (0..65534)"
      - name: ConnectorType
        type: enum
        required: true
        values: [HDMI, Line]
      - name: ConnectorId
        type: integer
        required: true
        description: "Connector ID (1..8)"
    response: "*r AudioOutputGroupRemoveConnectorResult (status=OK):"

  - id: audio_local_output_connect_input
    label: Connect Input to Audio Local Output
    kind: action
    command: xCommand Audio LocalOutput ConnectInput
    params:
      - name: OutputId
        type: integer
        required: true
        description: "Output ID (0..65534)"
      - name: InputId
        type: integer
        required: true
        description: "Input ID (0..65534)"
      - name: InputGain
        type: integer
        description: "Input gain (-54..15)"
    response: "*r AudioOutputGroupConnectInputResult (status=OK):"

  - id: audio_local_output_disconnect_input
    label: Disconnect Input from Audio Local Output
    kind: action
    command: xCommand Audio LocalOutput DisconnectInput
    params:
      - name: OutputId
        type: integer
        required: true
        description: "Output ID (0..65534)"
      - name: InputId
        type: integer
        required: true
        description: "Input ID (0..65534)"
    response: "*r AudioOutputGroupDisconnectInputResult (status=OK):"

  - id: audio_local_output_update_input_gain
    label: Update Input Gain on Audio Local Output
    kind: action
    command: xCommand Audio LocalOutput UpdateInputGain
    params:
      - name: OutputId
        type: integer
        required: true
        description: "Output ID (0..65534)"
      - name: InputId
        type: integer
        required: true
        description: "Input ID (0..65534)"
      - name: InputGain
        type: integer
        description: "Input gain (-54..15)"
    response: "*r AudioOutputGroupUpdateInputGainResult (status=OK):"

  - id: audio_remote_output_connect_input
    label: Connect Input to Audio Remote Output
    kind: action
    command: xCommand Audio RemoteOutput ConnectInput
    params:
      - name: OutputId
        type: integer
        required: true
        description: "Output ID (0..65534)"
      - name: InputId
        type: integer
        required: true
        description: "Input ID (0..65534)"
      - name: InputGain
        type: integer
        description: "Input gain (-54..15)"
    response: "*r AudioRemoteOutputGroupConnectInputResult (status=OK):"

  - id: audio_remote_output_update_input_gain
    label: Update Input Gain on Audio Remote Output
    kind: action
    command: xCommand Audio RemoteOutput UpdateInputGain
    params:
      - name: OutputId
        type: integer
        required: true
        description: "Output ID (0..65534)"
      - name: InputId
        type: integer
        required: true
        description: "Input ID (0..65534)"
      - name: InputGain
        type: integer
        description: "Input gain (-54..15)"
    response: "*r AudioRemoteOutputGroupUpdateInputGainResult (status=OK):"

  - id: audio_remote_output_disconnect_input
    label: Disconnect Input from Audio Remote Output
    kind: action
    command: xCommand Audio RemoteOutput DisconnectInput
    params:
      - name: OutputId
        type: integer
        required: true
        description: "Output ID (0..65534)"
      - name: InputId
        type: integer
        required: true
        description: "Input ID (0..65534)"
    response: "*r AudioRemoteOutputGroupDisconnectInputResult (status=OK):"

  - id: audio_remote_input_update
    label: Update Audio Remote Input
    kind: action
    command: xCommand Audio RemoteInput Update
    params:
      - name: InputId
        type: integer
        required: true
        description: "Input ID (0..65534)"
      - name: AGC
        type: enum
        required: true
        values: [On, Off]
    response: "*r AudioRemoteInputGroupUpdateResult (status=OK):"

  - id: audio_vumeter_start
    label: Start Audio VU Meter
    kind: action
    command: xCommand Audio Vumeter Start
    params:
      - name: ConnectorType
        type: enum
        required: true
        values: [HDMI, Line, Microphone]
      - name: ConnectorId
        type: integer
        required: true
        description: "Connector ID (1..8)"
    response: "*r AudioVumeterStartResult (status=OK):"

  - id: audio_vumeter_stop
    label: Stop Audio VU Meter
    kind: action
    command: xCommand Audio Vumeter Stop
    params:
      - name: ConnectorType
        type: enum
        required: true
        values: [HDMI, Line, Microphone]
      - name: ConnectorId
        type: integer
        required: true
        description: "Connector ID (1..8)"
    response: "*r AudioVumeterStopResult (status=OK):"

  - id: audio_setup_clear
    label: Clear Audio Setup
    kind: action
    command: xCommand Audio Setup Clear
    params: []
    response: "*r AudioSetupClearResult (status=OK):"

  - id: calllog_clear
    label: Clear Call Log
    kind: action
    command: xCommand CallLog Clear
    params: []
    response: "*r ClearResult (status=OK):"

  - id: calllog_received_delete
    label: Delete Received Call Log Entry
    kind: action
    command: xCommand CallLog Received Delete
    params:
      - name: LogTag
        type: string
        description: "Log tag (S: 0, 255)"

  - id: calllog_recent_delete
    label: Delete Recent Call Log Entry
    kind: action
    command: xCommand CallLog Recent Delete
    params:
      - name: LogTag
        type: string
        description: "Log tag (S: 0, 255)"

  - id: calllog_missed_delete
    label: Delete Missed Call Log Entry
    kind: action
    command: xCommand CallLog Missed Delete
    params:
      - name: LogTag
        type: string
        description: "Log tag (S: 0, 255)"

  - id: calllog_outgoing_delete
    label: Delete Outgoing Call Log Entry
    kind: action
    command: xCommand CallLog Outgoing Delete
    params:
      - name: LogTag
        type: string
        description: "Log tag (S: 0, 255)"

  - id: camera_reconfigure_chain
    label: Reconfigure Camera Chain
    kind: action
    command: xCommand Camera ReconfigureCameraChain
    params: []
    response: "*r ReconfigureCameraChainResult (status=OK):"

  - id: far_end_preset_activate
    label: Activate Far End Preset
    kind: action
    command: xCommand FarEndControl Preset Activate
    params:
      - name: CallId
        type: integer
        required: true
        description: "Call ID (0..65534)"
      - name: PresetId
        type: integer
        required: true
        description: "Preset ID (1..15)"
    response: "*r FECCPresetActivateResult (status=OK):"

  - id: far_end_preset_store
    label: Store Far End Preset
    kind: action
    command: xCommand FarEndControl Preset Store
    params:
      - name: CallId
        type: integer
        required: true
        description: "Call ID (0..65534)"
      - name: PresetId
        type: integer
        required: true
        description: "Preset ID (0..15)"
    response: "*r FECCPresetStoreResult (status=OK):"

  - id: far_end_source_select
    label: Select Far End Source
    kind: action
    command: xCommand FarEndControl Source Select
    params:
      - name: CallId
        type: integer
        required: true
        description: "Call ID (0..65534)"
      - name: SourceId
        type: integer
        required: true
        description: "Source ID (0..15)"
    response: "*r FECCSelectSourceResult (status=OK):"

  - id: message_prompt_clear
    label: Clear Prompt Message
    kind: action
    command: xCommand Message Prompt Clear
    params:
      - name: FeedbackId
        type: string
        description: "Feedback ID (S: 0, 255)"
    response: "*r MessagePromptClearResult (status=OK):"

  - id: message_prompt_response
    label: Send Prompt Response
    kind: action
    command: xCommand Message Prompt Response
    params:
      - name: FeedbackId
        type: string
        description: "Feedback ID (S: 0, 255)"
      - name: OptionId
        type: integer
        required: true
        description: "Option ID (0..5)"
    response: "*r MessagePromptResponseResult (status=OK):"

  - id: phonebook_folder_add
    label: Add Phonebook Folder
    kind: action
    command: xCommand Phonebook Folder Add
    params:
      - name: Name
        type: string
        required: true
        description: "Folder name (S: 0, 255)"
      - name: ParentFolderId
        type: string
        description: "Parent folder ID (S: 0, 255)"
    response: "*r PhonebookFolderAddResult (status=OK): Name: <id>"

  - id: phonebook_folder_modify
    label: Modify Phonebook Folder
    kind: action
    command: xCommand Phonebook Folder Modify
    params:
      - name: FolderId
        type: string
        required: true
        description: "Folder ID (S: 0, 255)"
      - name: Name
        type: string
        description: "Folder name (S: 0, 255)"
      - name: ParentFolderId
        type: string
        description: "Parent folder ID (S: 0, 255)"

  - id: phonebook_folder_delete
    label: Delete Phonebook Folder
    kind: action
    command: xCommand Phonebook Folder Delete
    params:
      - name: FolderId
        type: string
        required: true
        description: "Folder ID (S: 0, 255)"

  - id: phonebook_contact_add
    label: Add Phonebook Contact
    kind: action
    command: xCommand Phonebook Contact Add
    params:
      - name: Name
        type: string
        required: true
        description: "Contact name (S: 0, 255)"
      - name: FolderId
        type: string
        description: "Folder ID (S: 0, 255)"
      - name: ImageURL
        type: string
        description: "Image URL (S: 0, 255)"
      - name: Title
        type: string
        description: "Title (S: 0, 255)"
      - name: Number
        type: string
        description: "Dial number (S: 0, 255)"
      - name: Protocol
        type: enum
        values: [H323, SIP]
      - name: CallRate
        type: integer
        description: "Call rate (0..65534)"
      - name: Device
        type: enum
        values: [Mobile, Other, Telephone, Video]
    response: "*r PhonebookContactAddResult (status=OK): Name: <id>"

  - id: phonebook_contact_modify
    label: Modify Phonebook Contact
    kind: action
    command: xCommand Phonebook Contact Modify
    params:
      - name: ContactId
        type: string
        required: true
        description: "Contact ID (S: 0, 255)"
      - name: Name
        type: string
        description: "Contact name (S: 0, 255)"
      - name: FolderId
        type: string
        description: "Folder ID (S: 0, 255)"
      - name: ImageURL
        type: string
        description: "Image URL (S: 0, 255)"
      - name: Title
        type: string
        description: "Title (S: 0, 255)"

  - id: phonebook_contact_delete
    label: Delete Phonebook Contact
    kind: action
    command: xCommand Phonebook Contact Delete
    params:
      - name: ContactId
        type: string
        required: true
        description: "Contact ID (S: 0, 255)"

  - id: phonebook_contactmethod_add
    label: Add Phonebook Contact Method
    kind: action
    command: xCommand Phonebook ContactMethod Add
    params:
      - name: ContactId
        type: string
        required: true
        description: "Contact ID (S: 0, 255)"
      - name: Device
        type: enum
        values: [Mobile, Other, Telephone, Video]
      - name: Number
        type: string
        required: true
        description: "Dial number (S: 0, 255)"
      - name: Protocol
        type: enum
        values: [H323, SIP]
      - name: CallRate
        type: integer
        description: "Call rate (0..65534)"

  - id: phonebook_contactmethod_delete
    label: Delete Phonebook Contact Method
    kind: action
    command: xCommand Phonebook ContactMethod Delete
    params:
      - name: ContactId
        type: string
        required: true
        description: "Contact ID (S: 0, 255)"
      - name: ContactMethodId
        type: string
        required: true
        description: "Contact method ID (S: 0, 255)"

  - id: phonebook_search
    label: Search Phonebook
    kind: query
    command: xCommand Phonebook Search
    params:
      - name: PhonebookId
        type: string
        description: "Phonebook ID (S: 0, 255)"
      - name: PhonebookType
        type: enum
        values: [Corporate, Local]
      - name: SearchString
        type: string
        description: "Search string (S: 0, 255)"
      - name: SearchField
        type: enum
        values: [Name, Number]
      - name: FolderId
        type: string
        description: "Folder ID (S: 0, 255)"
      - name: Offset
        type: integer
        description: "Result offset (0..65534)"
      - name: Limit
        type: integer
        description: "Result limit (0..65534)"

  - id: provisioning_start_upgrade
    label: Start Provisioning Upgrade
    kind: action
    command: xCommand Provisioning StartUpgrade
    params:
      - name: AutoComplete
        type: enum
        values: [On, Off]
    response: "*r StartUpgradeResult (status=OK):"

  - id: provisioning_complete_upgrade
    label: Complete Provisioning Upgrade
    kind: action
    command: xCommand Provisioning CompleteUpgrade
    params: []
    response: "*r CompleteUpgradeResult (status=OK):"

  - id: provisioning_cancel_upgrade
    label: Cancel Provisioning Upgrade
    kind: action
    command: xCommand Provisioning CancelUpgrade
    params: []
    response: "*r CancelUpgradeResult (status=OK):"

  - id: sstring_send
    label: Send SString Message
    kind: action
    command: xCommand SStringSend
    params:
      - name: Message
        type: string
        required: true
        description: "Message content (S: 1, 256)"
      - name: CallId
        type: integer
        description: "Call ID (0..65534)"
    response: "*r SStringSendResult (status=OK):"

  - id: tstring_send
    label: Send TString Message
    kind: action
    command: xCommand TStringSend
    params:
      - name: Message
        type: string
        required: true
        description: "Message content (S: 1, 1450)"
      - name: CallId
        type: integer
        description: "Call ID (0..65534)"
    response: "*r TStringSendResult (status=OK):"

  - id: systemunit_option_key_add
    label: Add Option Key
    kind: action
    command: xCommand SystemUnit OptionKey Add
    params:
      - name: Key
        type: string
        required: true
        description: "Option key (S: 16, 24)"
    response: "*r OptionKeyResult (status=OK):"

  - id: systemunit_release_key_add
    label: Add Release Key
    kind: action
    command: xCommand SystemUnit ReleaseKey Add
    params:
      - name: Key
        type: string
        required: true
        description: "Release key (S: 16, 24)"
    response: "*r ReleaseKeyResult (status=OK):"

  - id: systemunit_admin_password_set
    label: Set Admin Password
    kind: action
    command: xCommand SystemUnit AdminPassword Set
    params:
      - name: Password
        type: string
        required: true
        description: "Password (S: 0, 255)"
    response: "*r AdminPasswordSetResult (status=OK):"

  - id: systemunit_menu_password_set
    label: Set Menu Password
    kind: action
    command: xCommand SystemUnit MenuPassword Set
    params:
      - name: Password
        type: string
        required: true
        description: "Password (S: 0, 255)"
    response: "*r MenuPasswordSetResult (status=OK):"

  - id: systemunit_menu_password_validate
    label: Validate Menu Password
    kind: action
    command: xCommand SystemUnit MenuPassword Validate
    params:
      - name: Password
        type: string
        required: true
        description: "Password (S: 0, 255)"
    response: "*r MenuPasswordValidateResult (status=OK):"

  - id: systemunit_datetime_get
    label: Get System Date and Time
    kind: query
    command: xCommand SystemUnit DateTime Get
    params: []
    response: "*r DateTimeGetResult (status=OK): Year: <n> Month: <n> Day: <n> Hour: <n> Minute: <n> Second: <n>"

  - id: systemunit_datetime_set
    label: Set System Date and Time
    kind: action
    command: xCommand SystemUnit DateTime Set
    params:
      - name: Year
        type: integer
        description: "Year (2008..2037)"
      - name: Month
        type: integer
        description: "Month (1..12)"
      - name: Day
        type: integer
        description: "Day (1..31)"
      - name: Hour
        type: integer
        description: "Hour (0..23)"
      - name: Minute
        type: integer
        description: "Minute (0..59)"
      - name: Second
        type: integer
        description: "Second (0..59)"
    response: "*r DateTimeSetResult (status=OK):"

  - id: systemunit_config_profile_save
    label: Save Current Configuration Profile
    kind: action
    command: xCommand SystemUnit ConfigurationProfile SaveCurrentConfigurationAs
    params:
      - name: Name
        type: string
        description: "Profile name (S: 0, 255)"
    response: "*r ConfigurationProfileSaveCurrentConfigurationResult (status=OK):"

  - id: systemunit_config_profile_list
    label: List Configuration Profiles
    kind: query
    command: xCommand SystemUnit ConfigurationProfile List
    params: []
    response: "*r ConfigurationProfileListResult (status=OK): Profile: <name> ..."

  - id: systemunit_config_profile_remove
    label: Remove Configuration Profile
    kind: action
    command: xCommand SystemUnit ConfigurationProfile Remove
    params:
      - name: Name
        type: string
        description: "Profile name (S: 0, 255)"

  - id: systemunit_config_profile_change
    label: Change Active Configuration Profile
    kind: action
    command: xCommand SystemUnit ConfigurationProfile Change
    params:
      - name: Name
        type: string
        description: "Profile name (S: 0, 255)"

  - id: systemunit_config_profile_cancel_change
    label: Cancel Configuration Profile Change
    kind: action
    command: xCommand SystemUnit ConfigurationProfile CancelChange
    params:
      - name: Name
        type: string
        description: "Profile name (S: 0, 255)"

  - id: video_layout_add
    label: Add Custom Video Layout
    kind: action
    command: xCommand Video Layout Add
    params: []
    response: "*r VideoLayoutAddResult (status=OK): LayoutId: <n>"

  - id: video_layout_reset
    label: Reset Video Layout
    kind: action
    command: xCommand Video Layout Reset
    params: []
    response: "*r VideoLayoutResetResult (status=OK):"

  - id: video_layout_remove
    label: Remove Video Layout
    kind: action
    command: xCommand Video Layout Remove
    params:
      - name: LayoutId
        type: integer
        required: true
        description: "Layout ID (1..2147483647)"

  - id: video_layout_remove_all
    label: Remove All Video Layouts
    kind: action
    command: xCommand Video Layout RemoveAll
    params: []
    response: "*r VideoLayoutRemoveAllResult (status=OK):"

  - id: video_layout_frame_add
    label: Add Frame to Video Layout
    kind: action
    command: xCommand Video Layout Frame Add
    params:
      - name: LayoutId
        type: integer
        required: true
        description: "Layout ID (1..2147483647)"
      - name: FrameId
        type: integer
        description: "Frame ID (1..65535)"
      - name: PositionX
        type: integer
        required: true
        description: "X position (0..10000)"
      - name: PositionY
        type: integer
        required: true
        description: "Y position (0..10000)"
      - name: Width
        type: integer
        required: true
        description: "Width (1..10000)"
      - name: Height
        type: integer
        required: true
        description: "Height (1..10000)"
      - name: Layer
        type: integer
        required: true
        description: "Layer (1..5)"
      - name: Border
        type: enum
        values: [On, Off]
      - name: VideoSourceId
        type: integer
        description: "Video source ID (0..256)"
      - name: VideoSourceType
        type: enum
        required: true
        values: [Graphic, LocalInput, LocalMain, LocalPresentation, MostSpeaking, OtherMain, OwnMain, Presentation, RemoteMain, RemotePresentation, VideoFile]
    response: "*r VideoLayoutFrameAddResult (status=OK): FrameId: <n>"

  - id: video_layout_frame_remove
    label: Remove Frame from Video Layout
    kind: action
    command: xCommand Video Layout Frame Remove
    params:
      - name: LayoutId
        type: integer
        required: true
        description: "Layout ID (1..2147483647)"
      - name: FrameId
        type: integer
        required: true
        description: "Frame ID (1..65535)"
    response: "*r VideoLayoutFrameRemoveResult (status=OK):"

  - id: video_layout_frame_update
    label: Update Frame in Video Layout
    kind: action
    command: xCommand Video Layout Frame Update
    params:
      - name: LayoutId
        type: integer
        required: true
        description: "Layout ID (1..2147483647)"
      - name: FrameId
        type: integer
        required: true
        description: "Frame ID (1..65535)"
      - name: PositionX
        type: integer
        required: true
        description: "X position (0..10000)"
      - name: PositionY
        type: integer
        required: true
        description: "Y position (0..10000)"
      - name: Width
        type: integer
        required: true
        description: "Width (1..10000)"
      - name: Height
        type: integer
        required: true
        description: "Height (1..10000)"
      - name: Layer
        type: integer
        required: true
        description: "Layer (1..5)"
      - name: Border
        type: enum
        values: [On, Off]
      - name: VideoSourceId
        type: integer
        description: "Video source ID (0..256)"
      - name: VideoSourceType
        type: enum
        required: true
        values: [Graphic, LocalInput, LocalMain, LocalPresentation, MostSpeaking, OtherMain, OwnMain, Presentation, RemoteMain, RemotePresentation, VideoFile]

  - id: video_layout_assign
    label: Assign Layout to Call/Output
    kind: action
    command: xCommand Video Layout Assign
    params:
      - name: CallId
        type: integer
        description: "Call ID (0..65534)"
      - name: OutputId
        type: integer
        description: "Output ID (0..65534)"
      - name: LayoutId
        type: integer
        required: true
        description: "Layout ID (1..2147483647)"
    response: "*r VideoLayoutAssignResult (status=OK):"

  - id: video_layout_assign_call
    label: Assign Layout to Call
    kind: action
    command: xCommand Video Layout AssignCall
    params:
      - name: CallId
        type: integer
        required: true
        description: "Call ID (0..65534)"
      - name: LayoutId
        type: integer
        required: true
        description: "Layout ID (1..2147483647)"
    response: "*r VideoLayoutAssignCallResult (status=OK):"

  - id: video_layout_assign_local_output
    label: Assign Layout to Local Output
    kind: action
    command: xCommand Video Layout AssignLocalOutput
    params:
      - name: OutputId
        type: integer
        required: true
        description: "Output ID (0..65534)"
      - name: LayoutId
        type: integer
        required: true
        description: "Layout ID (1..2147483647)"
    response: "*r VideoLayoutAssignLocalOutputResult (status=OK):"

  - id: video_layout_assign_presentation
    label: Assign Layout to Presentation
    kind: action
    command: xCommand Video Layout AssignPresentation
    params:
      - name: LayoutId
        type: integer
        required: true
        description: "Layout ID (1..2147483647)"
    response: "*r VideoLayoutAssignPresentationResult (status=OK):"

  - id: video_layout_unassign
    label: Unassign Layout from Call/Output
    kind: action
    command: xCommand Video Layout UnAssign
    params:
      - name: CallId
        type: integer
        description: "Call ID (0..65534)"
      - name: OutputId
        type: integer
        description: "Output ID (0..65534)"
    response: "*r VideoLayoutUnassignResult (status=OK):"

  - id: video_layout_unassign_call
    label: Unassign Layout from Call
    kind: action
    command: xCommand Video Layout UnAssignCall
    params:
      - name: CallId
        type: integer
        required: true
        description: "Call ID (0..65534)"
      - name: LayoutId
        type: integer
        required: true
        description: "Layout ID (1..2147483647)"
    response: "*r VideoLayoutUnAssignCallResult (status=OK):"

  - id: video_layout_automode_set_layout_family
    label: Set Auto Layout Family
    kind: action
    command: xCommand Video Layout AutoMode SetLayoutFamily
    params:
      - name: Monitors
        type: enum
        required: true
        values: [Dual, Single]
      - name: Selfview
        type: enum
        required: true
        values: [On, Off]
      - name: Presentation
        type: enum
        required: true
        values: ["16_9", "4_3", Off]
      - name: NumberOfCalls
        type: integer
        required: true
        description: "Number of calls (0..3)"
      - name: LayoutFamily
        type: enum
        required: true
        values: [Auto, Equal, Fullscreen, PresentationLargeSpeaker, PresentationSmallSpeaker]

  - id: video_layout_automode_reset
    label: Reset Auto Layout Mode
    kind: action
    command: xCommand Video Layout AutoMode Reset
    params: []
    response: "*r VideoLayoutAutoModeResetResult (status=OK):"

  - id: video_layout_automode_list
    label: List Auto Layout Mode Entries
    kind: query
    command: xCommand Video Layout AutoMode List
    params: []
    response: "*r VideoLayoutAutoModeListResult ..."

  - id: video_layout_automode_remote_set_layout_family
    label: Set Remote Auto Layout Family
    kind: action
    command: xCommand Video Layout AutoModeRemote SetLayoutFamily
    params:
      - name: PresentationCapability
        type: enum
        required: true
        values: [On, Off]
      - name: Presentation
        type: enum
        values: [On, Off]
      - name: NumberOfCalls
        type: integer
        required: true
        description: "Number of calls (1..3)"
      - name: LayoutFamily
        type: enum
        required: true
        values: [Equal, FollowLocal, FullScreen, PresentationLargeSpeaker, PresentationSmallSpeaker]

  - id: video_layout_automode_remote_reset
    label: Reset Remote Auto Layout Mode
    kind: action
    command: xCommand Video Layout AutoModeRemote Reset
    params: []
    response: "*r VideoLayoutAutoModeRemoteResetResult (status=OK):"

  - id: video_layout_automode_remote_list
    label: List Remote Auto Layout Mode Entries
    kind: query
    command: xCommand Video Layout AutoModeRemote List
    params: []
    response: "*r VideoLayoutAutoModeRemoteListResult ..."

  - id: video_layout_list_layout_family
    label: List Layout Families
    kind: query
    command: xCommand Video Layout ListLayoutFamily
    params:
      - name: LayoutFamilyId
        type: integer
        description: "Layout family ID (0..65534)"
      - name: DescriptorId
        type: integer
        description: "Descriptor ID (0..65534)"

  - id: video_layout_list_layout_graphic
    label: List Layout Graphics
    kind: query
    command: xCommand Video Layout ListLayoutGraphic
    params:
      - name: LayoutGraphicId
        type: integer
        description: "Layout graphic ID (0..65534)"
      - name: FrameId
        type: integer
        description: "Frame ID (0..65534)"

  - id: video_layout_unassign_local_output
    label: Unassign Layout from Local Output
    kind: action
    command: xCommand Video Layout UnAssignLocalOutput
    params:
      - name: OutputId
        type: integer
        required: true
        description: "Output ID (0..65534)"
      - name: LayoutId
        type: integer
        required: true
        description: "Layout ID (1..2147483647)"

  - id: video_layout_unassign_presentation
    label: Unassign Layout from Presentation
    kind: action
    command: xCommand Video Layout UnAssignPresentation
    params:
      - name: LayoutId
        type: integer
        required: true
        description: "Layout ID (1..2147483647)"
```

## Feedbacks

```yaml
feedbacks:
  - id: call_status
    type: enum
    values: [Dialling, Connecting, Ringing, Connected, Idle]
    query: xStatus Call
    description: Current call status per call instance

  - id: call_direction
    type: enum
    values: [Incoming, Outgoing]
    query: xStatus Call <id> Direction

  - id: call_protocol
    type: enum
    values: [H323, SIP]
    query: xStatus Call <id> Protocol

  - id: call_encryption
    type: enum
    values: [None, Aes-128]
    query: xStatus Call <id> Encryption Type

  - id: call_placed_on_hold
    type: enum
    values: [True, False]
    query: xStatus Call <id> PlacedOnHold

  - id: mic_mute_state
    type: enum
    values: [On, Off]
    query: xStatus Audio Microphones Mute

  - id: audio_volume
    type: integer
    range: [0, 100]
    query: xStatus Audio Volume

  - id: standby_state
    type: enum
    values: [On, Off]
    query: xStatus Standby Active

  - id: system_state
    type: enum
    values: [InCall, Initialized, Initializing, Multisite, Sleeping]
    query: xStatus SystemUnit State System

  - id: presentation_mode
    type: enum
    values: [Off, Sending, Receiving]
    query: xStatus Conference Presentation Mode

  - id: camera_connected
    type: enum
    values: [True, False]
    query: xStatus Camera <id> Connected

  - id: camera_position_pan
    type: integer
    range: [-65535, 65535]
    query: xStatus Camera <id> Position Pan

  - id: camera_position_tilt
    type: integer
    range: [-65535, 65535]
    query: xStatus Camera <id> Position Tilt

  - id: camera_position_zoom
    type: integer
    range: [0, 65535]
    query: xStatus Camera <id> Position Zoom

  - id: camera_position_focus
    type: integer
    range: [0, 65535]
    query: xStatus Camera <id> Position Focus

  - id: preset_defined
    type: enum
    values: [True, False]
    query: xStatus Preset <id> Defined

  - id: gpio_pin_state
    type: enum
    values: [High, Low]
    query: xStatus GPIO Pin <id> State

  - id: h323_gatekeeper_status
    type: enum
    values: [Registered, Inactive, Rejected]
    query: xStatus H323 Gatekeeper Status

  - id: sip_registration_status
    type: enum
    values: [Deregister, Failed, Inactive, Registered, Registering]
    query: xStatus SIP Registration <id> Status

  - id: network_ipv4_address
    type: string
    query: xStatus Network 1 IPv4 Address

  - id: video_input_source_resolution
    type: object
    query: xStatus Video Input Source <id> Resolution
    description: Returns Height, Width, RefreshRate

  - id: video_output_resolution
    type: object
    query: xStatus Video Output <type> <id> Resolution
    description: Returns Height, Width, RefreshRate for HDMI/DVI/Legacy outputs

  - id: video_input_connected
    type: enum
    values: [True, False, Unknown]
    query: xStatus Video Input <type> <id> Connected

  - id: video_input_signal_state
    type: enum
    values: [Unknown, OK, Unsupported]
    query: xStatus Video Input <type> <id> SignalState

  - id: provisioning_status
    type: enum
    values: [Failed, AuthenticationFailed, Provisioned, Idle, NeedConfig]
    query: xStatus Provisioning Status

  - id: number_of_active_calls
    type: integer
    query: xStatus SystemUnit State NumberOfActiveCalls

  - id: preset_description
    type: string
    query: xStatus Preset <id> Description

  - id: preset_type
    type: enum
    values: [All, Camera]
    query: xStatus Preset <id> Type
```

## Variables

```yaml
variables:
  - id: audio_volume
    label: Master Volume
    type: integer
    range: [0, 100]
    command: xConfiguration Audio Volume
    description: Master audio volume level

  - id: ring_volume
    label: Ring Volume
    type: integer
    range: [0, 100]
    command: xConfiguration Audio SoundsAndAlerts RingVolume

  - id: serial_baud_rate
    label: Serial Port Baud Rate
    type: enum
    values: [9600, 19200, 38400, 57600, 115200]
    command: xConfiguration SerialPort BaudRate

  - id: video_main_source
    label: Main Video Source
    type: integer
    range: [1, 3]
    command: xConfiguration Video MainVideoSource

  - id: default_presentation_source
    label: Default Presentation Source
    type: integer
    range: [1, 3]
    command: xConfiguration Video DefaultPresentationSource

  - id: standby_delay
    label: Standby Delay
    type: integer
    range: [1, 480]
    command: xConfiguration Standby Delay
    description: Minutes before entering standby

  - id: standby_control
    label: Standby Control
    type: enum
    values: [On, Off]
    command: xConfiguration Standby Control

  - id: auto_answer_mode
    label: Auto Answer Mode
    type: enum
    values: [On, Off]
    command: xConfiguration Conference 1 AutoAnswer Mode

  - id: do_not_disturb
    label: Do Not Disturb Mode
    type: enum
    values: [On, Off]
    command: xConfiguration Conference 1 DoNotDisturb Mode

  - id: default_call_protocol
    label: Default Call Protocol
    type: enum
    values: [H323, SIP]
    command: xConfiguration Conference 1 DefaultCall Protocol

  - id: default_call_rate
    label: Default Call Rate
    type: integer
    range: [64, 6000]
    command: xConfiguration Conference 1 DefaultCall Rate

  - id: encryption_mode
    label: Encryption Mode
    type: enum
    values: [BestEffort, On, Off]
    command: xConfiguration Conference 1 Encryption Mode

  - id: telnet_mode
    label: Telnet Mode
    type: enum
    values: [On, Off]
    command: xConfiguration NetworkServices Telnet Mode

  - id: system_name
    label: System Unit Name
    type: string
    command: xConfiguration SystemUnit Name

  - id: video_monitors
    label: Monitor Configuration
    type: enum
    values: [Single, Dual, DualPresentationOnly]
    command: xConfiguration Video Monitors

  - id: video_selfview
    label: Selfview
    type: enum
    values: [On, Off]
    command: xConfiguration Video Selfview

  - id: video_osd_mode
    label: OSD Mode
    type: enum
    values: [On, Off]
    command: xConfiguration Video OSD Mode

  - id: audio_input_mic_level
    label: Microphone Input Level
    type: integer
    range: [0, 24]
    command: xConfiguration Audio Input Microphone <id> Level

  - id: audio_input_line_level
    label: Line Input Level
    type: integer
    range: [0, 24]
    command: xConfiguration Audio Input Line <id> Level

  - id: camera_brightness_level
    label: Camera Brightness Level
    type: integer
    range: [1, 31]
    command: xConfiguration Cameras Camera <id> Brightness Level

  - id: max_transmit_call_rate
    label: Max Transmit Call Rate
    type: integer
    range: [64, 6000]
    command: xConfiguration Conference 1 MaxTransmitCallRate

  - id: max_receive_call_rate
    label: Max Receive Call Rate
    type: integer
    range: [64, 6000]
    command: xConfiguration Conference 1 MaxReceiveCallRate
```

## Events

```yaml
events:
  - id: feedback_event
    description: >
      The xFeedback mechanism pushes status/configuration changes to registered
      listeners. Register via xFeedback Register <XPath> (serial/Telnet/SSH) or
      xCommand HttpFeedback Register (HTTP). Feedback is session-specific for
      serial/Telnet/SSH. Changes are prefixed with *s (status), *c (configuration).
    examples:
      - "*s Call <id> Status: Connected"
      - "*s Audio Volume: 70"
      - "*s Standby Active: On"
```

## Macros

```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety

```yaml
confirmation_required_for:
  - factory_reset  # xCommand SystemUnit FactoryReset requires Confirm: Yes
interlocks: []
# UNRESOLVED: source does not describe explicit safety interlocks or power-on sequencing
```

## Notes

- The XACLI uses three command prefixes: `xConfiguration` (settings, read/write), `xCommand` (actions), and `xStatus` (queries). Responses use prefixes `*c` (config), `*r` (command result), `*s` (status), `*h` (help/history). Multi-line responses end with `** end`.
- Telnet is disabled by default. Must enable via `xConfiguration NetworkServices Telnet Mode: On` over RS-232 or SSH first.
- Default serial baud rate is 38400 (not the typical 9600). Boot messages always output at 38400 regardless of configured rate. A reboot is required for serial port changes to take effect.
- The TXAS HTTP API uses endpoints `/getxml` (read), `/formputxml` (POST configuration/command), and `/putxml` (raw XML body). HTTP connects on port 80.
- xFeedback supports monitoring via XPath expressions. Up to 3 HTTP feedback slots with up to 15 expressions each. Registering all status changes is discouraged due to volume.
- GPIO pins support modes including InputNoAction, OutputManualState, OutputInCall, OutputMicrophonesMuted, OutputPresentationOn, OutputAllCallsEncrypted, InputMuteMicrophones.
- Default login credentials are admin / TANDBERG for both serial and Telnet/SSH.
- Straight-through RS-232 cable required. Codec is DCE. DTR and RTS are ignored; DSR, CD, CTS always asserted.

<!-- UNRESOLVED: SSH port not explicitly stated -->
<!-- UNRESOLVED: exact firmware version compatibility for TC3.1 API not specified -->
<!-- UNRESOLVED: maximum concurrent Telnet/SSH sessions not stated -->

## Provenance

```yaml
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/en/US/docs/telepresence/endpoint/codec-c-series/tc3/api_reference_guide/tandberg_codec-c60-c40_api_guide_tc31.pdf
retrieved_at: 2026-05-22T05:45:14.973Z
last_checked_at: 2026-06-09T07:43:19.202Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:43:19.202Z
matched_actions: 97
action_count: 97
confidence: medium
summary: "All 97 spec actions found with literal wire-level command matches and correct parameter shapes in TANDBERG API source; transport parameters verified in source documentation. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version compatibility range not stated"
- "SSH port not explicitly stated (assumed standard 22)"
- "Telnet port not explicitly stated in source (Telnet disabled by default, must be enabled via xConfiguration NetworkServices Telnet Mode: On)"
- "TXAS HTTP base URL not explicitly stated; source says \"connects to the normal web port (80)\" but exact path structure follows /getxml, /formputxml, /putxml"
- "no explicit multi-step sequences described in source"
- "source does not describe explicit safety interlocks or power-on sequencing"
- "SSH port not explicitly stated"
- "exact firmware version compatibility for TC3.1 API not specified"
- "maximum concurrent Telnet/SSH sessions not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
