---
spec_id: admin/cisco-webex-room-kit-series-ce93
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco Webex Room Kit Series CE93 Control Spec"
manufacturer: Cisco
model_family: "Room Kit"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "Room Kit"
    - "Room Kit Mini"
    - "Room Bar"
    - "Room Bar Pro"
    - "Room 55"
    - "Room 55 Dual"
    - "Room 70"
    - "Room 70 G2"
    - "Room 70 Panorama"
    - "Room Panorama"
    - "Codec Plus"
    - "Codec Pro"
    - "Codec EQ"
    - "Desk Pro"
    - "Desk Mini"
    - Desk
    - "Board 55"
    - "Board 70"
    - "Board Pro"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-115/api-reference-guide-roomos-115.pdf
retrieved_at: 2026-05-27T04:41:35.847Z
last_checked_at: 2026-05-27T06:51:41.563Z
generated_at: 2026-05-27T06:51:41.563Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific SSH port not stated in source (only SSH mentioned, no port number)"
  - "HTTP port implied as 80/443 but not explicitly stated as default"
  - "firmware version compatibility range not stated"
  - "the source is a large multi-product reference manual; not all commands apply to every model"
  - "SSH port not explicitly stated in source"
  - "source says \"Hardware flow control: Off\" for most devices"
  - "full list of feedback paths not exhaustively enumerated;"
  - "many more configuration variables exist (serial baud rate,"
  - "source describes xEvent mechanism but does not exhaustively"
  - "source describes macro system (xCommand Macros Macro Save/Activate)"
  - "source does not document safety interlocks or confirmation"
  - "SSH port number not stated in source"
  - "HTTP/HTTPS default ports not explicitly stated"
  - "WebSocket connection URL/path not detailed (refers to separate guide)"
  - "firmware version compatibility not stated"
  - "xConfiguration commands (hundreds of settings) not enumerated as separate actions"
  - "xStatus queries not enumerated as separate actions (covered by generic xStatus mechanism)"
  - "complete event catalogue not listed in source (only examples provided)"
verification:
  verdict: verified
  checked_at: 2026-05-27T06:51:41.563Z
  matched_actions: 418
  action_count: 418
  confidence: medium
  summary: "All 418 spec xCommand actions match source verbatim; transport confirmed. (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Cisco Webex Room Kit Series CE93 Control Spec

## Summary
Cisco Webex Room Kit Series (RoomOS CE93) video conferencing codecs and collaboration bars. This spec covers the xAPI control interface accessible via SSH (TCP), HTTP/HTTPS, WebSocket, and RS-232 serial. The API exposes four major groups: Commands (xCommand), Configurations (xConfiguration), Status (xStatus), and Events (xEvent). Commands are case-insensitive, structured hierarchically, and support terminal, XML, and JSON output modes.

<!-- UNRESOLVED: specific SSH port not stated in source (only SSH mentioned, no port number) -->
<!-- UNRESOLVED: HTTP port implied as 80/443 but not explicitly stated as default -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: the source is a large multi-product reference manual; not all commands apply to every model -->

## Transport
```yaml
protocols:
  - tcp
  - http
  - serial
addressing:
  # UNRESOLVED: SSH port not explicitly stated in source
  port: null
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source says "Hardware flow control: Off" for most devices
auth:
  type: basic
  description: >-
    HTTP requires Basic Access Authentication with ADMIN role. SSH and serial
    require login by default (xConfiguration SerialPort LoginRequired: On).
    HTTP supports session-based auth via POST /xmlapi/session/begin with
    SessionId cookie. Default user is 'admin' with initially no passphrase.
```

## Traits
```yaml
traits:
  - powerable    # SystemUnit Boot, Standby Activate/Deactivate
  - queryable    # xStatus, xConfiguration queries
  - routable     # Video Matrix Assign/Swap, Video Input SetMainVideoSource
  - levelable    # Audio Volume Set/Increase/Decrease, gain controls
  - dialable     # Dial, Call Accept/Reject/Disconnect
```

## Actions
```yaml
# 418 distinct xCommand entries documented in the source (excludes the
# introductory "xCommand commands" section header).
#
# Each entry below corresponds to one named xCommand path as listed in the
# source. Parameter ranges inside a single command do NOT multiply into
# separate actions.

# --- AirPlay ---
- id: airplay_keyevent_back
  label: AirPlay Key Event Back
  kind: action
  command: xCommand AirPlay KeyEvent Back
  params: []

- id: airplay_keyevent_click
  label: AirPlay Key Event Click
  kind: action
  command: xCommand AirPlay KeyEvent Click
  params: []

- id: airplay_keyevent_down
  label: AirPlay Key Event Down
  kind: action
  command: xCommand AirPlay KeyEvent Down
  params: []

- id: airplay_keyevent_fastforward
  label: AirPlay Key Event FastForward
  kind: action
  command: xCommand AirPlay KeyEvent FastForward
  params: []

- id: airplay_keyevent_fastreverse
  label: AirPlay Key Event FastReverse
  kind: action
  command: xCommand AirPlay KeyEvent FastReverse
  params: []

- id: airplay_keyevent_left
  label: AirPlay Key Event Left
  kind: action
  command: xCommand AirPlay KeyEvent Left
  params: []

- id: airplay_keyevent_play
  label: AirPlay Key Event Play
  kind: action
  command: xCommand AirPlay KeyEvent Play
  params: []

- id: airplay_keyevent_right
  label: AirPlay Key Event Right
  kind: action
  command: xCommand AirPlay KeyEvent Right
  params: []

- id: airplay_keyevent_up
  label: AirPlay Key Event Up
  kind: action
  command: xCommand AirPlay KeyEvent Up
  params: []

- id: airplay_resetpaireddevices
  label: AirPlay Reset Paired Devices
  kind: action
  command: xCommand AirPlay ResetPairedDevices
  params: []

# --- Audio Diagnostics ---
- id: audio_diagnostics_advanced_run
  label: Audio Diagnostics Advanced Run
  kind: action
  command: xCommand Audio Diagnostics Advanced Run
  params: []

- id: audio_diagnostics_aecreverb_reset
  label: Audio Diagnostics AecReverb Reset
  kind: action
  command: xCommand Audio Diagnostics AecReverb Reset
  params: []

- id: audio_diagnostics_aecreverb_run
  label: Audio Diagnostics AecReverb Run
  kind: action
  command: xCommand Audio Diagnostics AecReverb Run
  params: []

- id: audio_diagnostics_measuredelay
  label: Audio Diagnostics MeasureDelay
  kind: action
  command: xCommand Audio Diagnostics MeasureDelay
  params: []

# --- Audio Equalizer ---
- id: audio_equalizer_list
  label: Audio Equalizer List
  kind: query
  command: xCommand Audio Equalizer List
  params: []

- id: audio_equalizer_update
  label: Audio Equalizer Update
  kind: action
  command: xCommand Audio Equalizer Update
  params: []

# --- Audio LocalInput ---
- id: audio_localinput_add
  label: Audio LocalInput Add
  kind: action
  command: xCommand Audio LocalInput Add
  params: []

- id: audio_localinput_addconnector
  label: Audio LocalInput AddConnector
  kind: action
  command: xCommand Audio LocalInput AddConnector
  params: []

- id: audio_localinput_remove
  label: Audio LocalInput Remove
  kind: action
  command: xCommand Audio LocalInput Remove
  params: []

- id: audio_localinput_removeconnector
  label: Audio LocalInput RemoveConnector
  kind: action
  command: xCommand Audio LocalInput RemoveConnector
  params: []

- id: audio_localinput_update
  label: Audio LocalInput Update
  kind: action
  command: xCommand Audio LocalInput Update
  params: []

- id: audio_localinput_ethernet_deregister
  label: Audio LocalInput Ethernet Deregister
  kind: action
  command: xCommand Audio LocalInput Ethernet Deregister
  params: []

- id: audio_localinput_ethernet_register
  label: Audio LocalInput Ethernet Register
  kind: action
  command: xCommand Audio LocalInput Ethernet Register
  params: []

# --- Audio LocalOutput ---
- id: audio_localoutput_add
  label: Audio LocalOutput Add
  kind: action
  command: xCommand Audio LocalOutput Add
  params: []

- id: audio_localoutput_addconnector
  label: Audio LocalOutput AddConnector
  kind: action
  command: xCommand Audio LocalOutput AddConnector
  params: []

- id: audio_localoutput_connectinput
  label: Audio LocalOutput ConnectInput
  kind: action
  command: xCommand Audio LocalOutput ConnectInput
  params: []

- id: audio_localoutput_disconnectinput
  label: Audio LocalOutput DisconnectInput
  kind: action
  command: xCommand Audio LocalOutput DisconnectInput
  params: []

- id: audio_localoutput_remove
  label: Audio LocalOutput Remove
  kind: action
  command: xCommand Audio LocalOutput Remove
  params: []

- id: audio_localoutput_removeconnector
  label: Audio LocalOutput RemoveConnector
  kind: action
  command: xCommand Audio LocalOutput RemoveConnector
  params: []

- id: audio_localoutput_update
  label: Audio LocalOutput Update
  kind: action
  command: xCommand Audio LocalOutput Update
  params: []

- id: audio_localoutput_updateinputgain
  label: Audio LocalOutput UpdateInputGain
  kind: action
  command: xCommand Audio LocalOutput UpdateInputGain
  params: []

# --- Audio Microphones ---
- id: audio_microphones_musicmode_start
  label: Audio Microphones MusicMode Start
  kind: action
  command: xCommand Audio Microphones MusicMode Start
  params: []

- id: audio_microphones_musicmode_stop
  label: Audio Microphones MusicMode Stop
  kind: action
  command: xCommand Audio Microphones MusicMode Stop
  params: []

- id: audio_microphones_noiseremoval_activate
  label: Audio Microphones NoiseRemoval Activate
  kind: action
  command: xCommand Audio Microphones NoiseRemoval Activate
  params: []

- id: audio_microphones_noiseremoval_deactivate
  label: Audio Microphones NoiseRemoval Deactivate
  kind: action
  command: xCommand Audio Microphones NoiseRemoval Deactivate
  params: []

- id: audio_microphones_passthrough_start
  label: Audio Microphones Passthrough Start
  kind: action
  command: xCommand Audio Microphones Passthrough Start
  params: []

- id: audio_microphones_passthrough_stop
  label: Audio Microphones Passthrough Stop
  kind: action
  command: xCommand Audio Microphones Passthrough Stop
  params: []

- id: audio_microphones_mute
  label: Audio Microphones Mute
  kind: action
  command: xCommand Audio Microphones Mute
  params: []

- id: audio_microphones_togglemute
  label: Audio Microphones ToggleMute
  kind: action
  command: xCommand Audio Microphones ToggleMute
  params: []

- id: audio_microphones_unmute
  label: Audio Microphones Unmute
  kind: action
  command: xCommand Audio Microphones Unmute
  params: []

# --- Audio RemoteOutput ---
- id: audio_remoteoutput_connectinput
  label: Audio RemoteOutput ConnectInput
  kind: action
  command: xCommand Audio RemoteOutput ConnectInput
  params: []

- id: audio_remoteoutput_disconnectinput
  label: Audio RemoteOutput DisconnectInput
  kind: action
  command: xCommand Audio RemoteOutput DisconnectInput
  params: []

- id: audio_remoteoutput_updateinputgain
  label: Audio RemoteOutput UpdateInputGain
  kind: action
  command: xCommand Audio RemoteOutput UpdateInputGain
  params: []

# --- Audio General ---
- id: audio_select
  label: Audio Select
  kind: action
  command: xCommand Audio Select
  params: []

- id: audio_sound_play
  label: Audio Sound Play
  kind: action
  command: xCommand Audio Sound Play
  params: []

- id: audio_sound_stop
  label: Audio Sound Stop
  kind: action
  command: xCommand Audio Sound Stop
  params: []

- id: audio_setup_clear
  label: Audio Setup Clear
  kind: action
  command: xCommand Audio Setup Clear
  params: []

- id: audio_setup_reset
  label: Audio Setup Reset
  kind: action
  command: xCommand Audio Setup Reset
  params: []

- id: audio_speakercheck
  label: Audio SpeakerCheck
  kind: action
  command: xCommand Audio SpeakerCheck
  params: []

# --- Audio SoundsAndAlerts ---
- id: audio_soundsandalerts_ringtone_play
  label: Audio SoundsAndAlerts Ringtone Play
  kind: action
  command: xCommand Audio SoundsAndAlerts Ringtone Play
  params: []

- id: audio_soundsandalerts_ringtone_list
  label: Audio SoundsAndAlerts Ringtone List
  kind: query
  command: xCommand Audio SoundsAndAlerts Ringtone List
  params: []

- id: audio_soundsandalerts_ringtone_stop
  label: Audio SoundsAndAlerts Ringtone Stop
  kind: action
  command: xCommand Audio SoundsAndAlerts Ringtone Stop
  params: []

# --- Audio Volume ---
- id: audio_volume_decrease
  label: Audio Volume Decrease
  kind: action
  command: xCommand Audio Volume Decrease
  params:
    - name: Step
      type: integer
      description: Volume step to decrease (default 1)

- id: audio_volume_increase
  label: Audio Volume Increase
  kind: action
  command: xCommand Audio Volume Increase
  params:
    - name: Step
      type: integer
      description: Volume step to increase (default 1)

- id: audio_volume_mute
  label: Audio Volume Mute
  kind: action
  command: xCommand Audio Volume Mute
  params: []

- id: audio_volume_set
  label: Audio Volume Set
  kind: action
  command: xCommand Audio Volume Set
  params:
    - name: Level
      type: integer
      description: "Volume level (0..100, where 0 = off, range -34.5dB to 15dB)"

- id: audio_volume_settodefault
  label: Audio Volume SetToDefault
  kind: action
  command: xCommand Audio Volume SetToDefault
  params: []

- id: audio_volume_togglemute
  label: Audio Volume ToggleMute
  kind: action
  command: xCommand Audio Volume ToggleMute
  params: []

- id: audio_volume_unmute
  label: Audio Volume Unmute
  kind: action
  command: xCommand Audio Volume Unmute
  params: []

# --- Audio VuMeter ---
- id: audio_vumeter_start
  label: Audio VuMeter Start
  kind: action
  command: xCommand Audio VuMeter Start
  params: []

- id: audio_vumeter_stop
  label: Audio VuMeter Stop
  kind: action
  command: xCommand Audio VuMeter Stop
  params: []

- id: audio_vumeter_stopall
  label: Audio VuMeter StopAll
  kind: action
  command: xCommand Audio VuMeter StopAll
  params: []

# --- Bluetooth ---
- id: bluetooth_streaming_next
  label: Bluetooth Streaming Next
  kind: action
  command: xCommand Bluetooth Streaming Next
  params: []

- id: bluetooth_streaming_pause
  label: Bluetooth Streaming Pause
  kind: action
  command: xCommand Bluetooth Streaming Pause
  params: []

- id: bluetooth_streaming_play
  label: Bluetooth Streaming Play
  kind: action
  command: xCommand Bluetooth Streaming Play
  params: []

- id: bluetooth_streaming_previous
  label: Bluetooth Streaming Previous
  kind: action
  command: xCommand Bluetooth Streaming Previous
  params: []

# --- Bookings ---
- id: bookings_book
  label: Bookings Book
  kind: action
  command: xCommand Bookings Book
  params: []

- id: bookings_clear
  label: Bookings Clear
  kind: action
  command: xCommand Bookings Clear
  params: []

- id: bookings_delete
  label: Bookings Delete
  kind: action
  command: xCommand Bookings Delete
  params: []

- id: bookings_edit
  label: Bookings Edit
  kind: action
  command: xCommand Bookings Edit
  params: []

- id: bookings_extend
  label: Bookings Extend
  kind: action
  command: xCommand Bookings Extend
  params: []

- id: bookings_list
  label: Bookings List
  kind: query
  command: xCommand Bookings List
  params: []

- id: bookings_get
  label: Bookings Get
  kind: query
  command: xCommand Bookings Get
  params: []

- id: bookings_notificationsnooze
  label: Bookings NotificationSnooze
  kind: action
  command: xCommand Bookings NotificationSnooze
  params: []

- id: bookings_put
  label: Bookings Put
  kind: action
  command: xCommand Bookings Put
  params: []

- id: bookings_respond
  label: Bookings Respond
  kind: action
  command: xCommand Bookings Respond
  params: []

# --- Call ---
- id: call_accept
  label: Call Accept
  kind: action
  command: xCommand Call Accept
  params: []

- id: call_disconnect
  label: Call Disconnect
  kind: action
  command: xCommand Call Disconnect
  params: []

- id: call_dtmfsend
  label: Call DTMFSend
  kind: action
  command: xCommand Call DTMFSend
  params:
    - name: DTMFString
      type: string
      description: DTMF tones to send

- id: call_farendcontrol_camera_move
  label: Call FarEndControl Camera Move
  kind: action
  command: xCommand Call FarEndControl Camera Move
  params:
    - name: Pan
      type: integer
    - name: Tilt
      type: integer
    - name: Zoom
      type: integer
    - name: CameraId
      type: integer

- id: call_farendcontrol_camera_stop
  label: Call FarEndControl Camera Stop
  kind: action
  command: xCommand Call FarEndControl Camera Stop
  params: []

- id: call_farendcontrol_requestcapabilities
  label: Call FarEndControl RequestCapabilities
  kind: action
  command: xCommand Call FarEndControl RequestCapabilities
  params: []

- id: call_farendcontrol_roompreset_activate
  label: Call FarEndControl RoomPreset Activate
  kind: action
  command: xCommand Call FarEndControl RoomPreset Activate
  params:
    - name: PresetId
      type: integer

- id: call_farendcontrol_roompreset_store
  label: Call FarEndControl RoomPreset Store
  kind: action
  command: xCommand Call FarEndControl RoomPreset Store
  params: []

- id: call_farendcontrol_source_select
  label: Call FarEndControl Source Select
  kind: action
  command: xCommand Call FarEndControl Source Select
  params: []

- id: call_farendmessage_send
  label: Call FarEndMessage Send
  kind: action
  command: xCommand Call FarEndMessage Send
  params:
    - name: Message
      type: string

- id: call_forward
  label: Call Forward
  kind: action
  command: xCommand Call Forward
  params: []

- id: call_hold
  label: Call Hold
  kind: action
  command: xCommand Call Hold
  params: []

- id: call_join
  label: Call Join
  kind: action
  command: xCommand Call Join
  params: []

- id: call_reject
  label: Call Reject
  kind: action
  command: xCommand Call Reject
  params: []

- id: call_ignore
  label: Call Ignore
  kind: action
  command: xCommand Call Ignore
  params: []

- id: call_resume
  label: Call Resume
  kind: action
  command: xCommand Call Resume
  params: []

- id: call_unattendedtransfer
  label: Call UnattendedTransfer
  kind: action
  command: xCommand Call UnattendedTransfer
  params: []

# --- CallHistory ---
- id: callhistory_acknowledgeallmissedcalls
  label: CallHistory AcknowledgeAllMissedCalls
  kind: action
  command: xCommand CallHistory AcknowledgeAllMissedCalls
  params: []

- id: callhistory_acknowledgemissedcall
  label: CallHistory AcknowledgeMissedCall
  kind: action
  command: xCommand CallHistory AcknowledgeMissedCall
  params: []

- id: callhistory_deleteall
  label: CallHistory DeleteAll
  kind: action
  command: xCommand CallHistory DeleteAll
  params: []

- id: callhistory_get
  label: CallHistory Get
  kind: query
  command: xCommand CallHistory Get
  params: []

- id: callhistory_deleteentry
  label: CallHistory DeleteEntry
  kind: action
  command: xCommand CallHistory DeleteEntry
  params: []

- id: callhistory_recents
  label: CallHistory Recents
  kind: query
  command: xCommand CallHistory Recents
  params: []

# --- Camera ---
- id: camera_positionreset
  label: Camera PositionReset
  kind: action
  command: xCommand Camera PositionReset
  params:
    - name: CameraId
      type: integer

- id: camera_positionset
  label: Camera PositionSet
  kind: action
  command: xCommand Camera PositionSet
  params:
    - name: CameraId
      type: integer
    - name: Pan
      type: integer
    - name: Tilt
      type: integer
    - name: Zoom
      type: integer
    - name: Focus
      type: integer

- id: camera_preset_activate
  label: Camera Preset Activate
  kind: action
  command: xCommand Camera Preset Activate
  params:
    - name: PresetId
      type: integer

- id: camera_preset_activatedefaultposition
  label: Camera Preset ActivateDefaultPosition
  kind: action
  command: xCommand Camera Preset ActivateDefaultPosition
  params: []

- id: camera_preset_edit
  label: Camera Preset Edit
  kind: action
  command: xCommand Camera Preset Edit
  params: []

- id: camera_preset_list
  label: Camera Preset List
  kind: query
  command: xCommand Camera Preset List
  params: []

- id: camera_preset_remove
  label: Camera Preset Remove
  kind: action
  command: xCommand Camera Preset Remove
  params: []

- id: camera_preset_show
  label: Camera Preset Show
  kind: action
  command: xCommand Camera Preset Show
  params: []

- id: camera_preset_store
  label: Camera Preset Store
  kind: action
  command: xCommand Camera Preset Store
  params:
    - name: PresetId
      type: integer
    - name: Description
      type: string

- id: camera_ramp
  label: Camera Ramp
  kind: action
  command: xCommand Camera Ramp
  params:
    - name: CameraId
      type: integer
    - name: PanSpeed
      type: integer
    - name: TiltSpeed
      type: integer
    - name: ZoomSpeed
      type: integer

- id: camera_triggerautofocus
  label: Camera TriggerAutofocus
  kind: action
  command: xCommand Camera TriggerAutofocus
  params: []

- id: camera_triggerwhitebalance
  label: Camera TriggerWhitebalance
  kind: action
  command: xCommand Camera TriggerWhitebalance
  params: []

# --- Cameras Background ---
- id: cameras_background_delete
  label: Cameras Background Delete
  kind: action
  command: xCommand Cameras Background Delete
  params: []

- id: cameras_autofocus_diagnostics_start
  label: Cameras AutoFocus Diagnostics Start
  kind: action
  command: xCommand Cameras AutoFocus Diagnostics Start
  params: []

- id: cameras_background_fetch
  label: Cameras Background Fetch
  kind: action
  command: xCommand Cameras Background Fetch
  params: []

- id: cameras_autofocus_diagnostics_stop
  label: Cameras AutoFocus Diagnostics Stop
  kind: action
  command: xCommand Cameras AutoFocus Diagnostics Stop
  params: []

- id: cameras_background_clear
  label: Cameras Background Clear
  kind: action
  command: xCommand Cameras Background Clear
  params: []

- id: cameras_background_foregroundparameters_reset
  label: Cameras Background ForegroundParameters Reset
  kind: action
  command: xCommand Cameras Background ForegroundParameters Reset
  params: []

- id: cameras_background_foregroundparameters_set
  label: Cameras Background ForegroundParameters Set
  kind: action
  command: xCommand Cameras Background ForegroundParameters Set
  params: []

- id: cameras_background_get
  label: Cameras Background Get
  kind: query
  command: xCommand Cameras Background Get
  params: []

- id: cameras_background_list
  label: Cameras Background List
  kind: query
  command: xCommand Cameras Background List
  params: []

- id: cameras_background_set
  label: Cameras Background Set
  kind: action
  command: xCommand Cameras Background Set
  params: []

- id: cameras_background_upload
  label: Cameras Background Upload
  kind: action
  command: xCommand Cameras Background Upload
  params: []

# --- Cameras PresenterTrack ---
- id: cameras_presentertrack_clearposition
  label: Cameras PresenterTrack ClearPosition
  kind: action
  command: xCommand Cameras PresenterTrack ClearPosition
  params: []

- id: cameras_presentertrack_set
  label: Cameras PresenterTrack Set
  kind: action
  command: xCommand Cameras PresenterTrack Set
  params: []

- id: cameras_presentertrack_storeposition
  label: Cameras PresenterTrack StorePosition
  kind: action
  command: xCommand Cameras PresenterTrack StorePosition
  params: []

# --- Cameras SpeakerTrack ---
- id: cameras_speakertrack_backgroundmode_deactivate
  label: Cameras SpeakerTrack BackgroundMode Deactivate
  kind: action
  command: xCommand Cameras SpeakerTrack BackgroundMode Deactivate
  params: []

- id: cameras_speakertrack_diagnostics_start
  label: Cameras SpeakerTrack Diagnostics Start
  kind: action
  command: xCommand Cameras SpeakerTrack Diagnostics Start
  params: []

- id: cameras_speakertrack_activate
  label: Cameras SpeakerTrack Activate
  kind: action
  command: xCommand Cameras SpeakerTrack Activate
  params: []

- id: cameras_speakertrack_deactivate
  label: Cameras SpeakerTrack Deactivate
  kind: action
  command: xCommand Cameras SpeakerTrack Deactivate
  params: []

- id: cameras_speakertrack_backgroundmode_activate
  label: Cameras SpeakerTrack BackgroundMode Activate
  kind: action
  command: xCommand Cameras SpeakerTrack BackgroundMode Activate
  params: []

- id: cameras_speakertrack_diagnostics_stop
  label: Cameras SpeakerTrack Diagnostics Stop
  kind: action
  command: xCommand Cameras SpeakerTrack Diagnostics Stop
  params: []

- id: cameras_speakertrack_frames_activate
  label: Cameras SpeakerTrack Frames Activate
  kind: action
  command: xCommand Cameras SpeakerTrack Frames Activate
  params: []

- id: cameras_speakertrack_viewlimits_deactivate
  label: Cameras SpeakerTrack ViewLimits Deactivate
  kind: action
  command: xCommand Cameras SpeakerTrack ViewLimits Deactivate
  params: []

- id: cameras_speakertrack_frames_deactivate
  label: Cameras SpeakerTrack Frames Deactivate
  kind: action
  command: xCommand Cameras SpeakerTrack Frames Deactivate
  params: []

- id: cameras_speakertrack_viewlimits_storeposition
  label: Cameras SpeakerTrack ViewLimits StorePosition
  kind: action
  command: xCommand Cameras SpeakerTrack ViewLimits StorePosition
  params: []

- id: cameras_speakertrack_viewlimits_activate
  label: Cameras SpeakerTrack ViewLimits Activate
  kind: action
  command: xCommand Cameras SpeakerTrack ViewLimits Activate
  params: []

- id: cameras_speakertrack_whiteboard_activateposition
  label: Cameras SpeakerTrack Whiteboard ActivatePosition
  kind: action
  command: xCommand Cameras SpeakerTrack Whiteboard ActivatePosition
  params: []

- id: cameras_speakertrack_whiteboard_alignposition
  label: Cameras SpeakerTrack Whiteboard AlignPosition
  kind: action
  command: xCommand Cameras SpeakerTrack Whiteboard AlignPosition
  params: []

- id: cameras_speakertrack_whiteboard_setdistance
  label: Cameras SpeakerTrack Whiteboard SetDistance
  kind: action
  command: xCommand Cameras SpeakerTrack Whiteboard SetDistance
  params: []

- id: cameras_speakertrack_whiteboard_storeposition
  label: Cameras SpeakerTrack Whiteboard StorePosition
  kind: action
  command: xCommand Cameras SpeakerTrack Whiteboard StorePosition
  params: []

# --- Conference ---
- id: conference_admitall
  label: Conference AdmitAll
  kind: action
  command: xCommand Conference AdmitAll
  params: []

- id: conference_call_authenticationresponse
  label: Conference Call AuthenticationResponse
  kind: action
  command: xCommand Conference Call AuthenticationResponse
  params: []

- id: conference_donotdisturb_activate
  label: Conference DoNotDisturb Activate
  kind: action
  command: xCommand Conference DoNotDisturb Activate
  params: []

- id: conference_donotdisturb_deactivate
  label: Conference DoNotDisturb Deactivate
  kind: action
  command: xCommand Conference DoNotDisturb Deactivate
  params: []

- id: conference_endmeeting
  label: Conference EndMeeting
  kind: action
  command: xCommand Conference EndMeeting
  params: []

- id: conference_hand_raise
  label: Conference Hand Raise
  kind: action
  command: xCommand Conference Hand Raise
  params: []

- id: conference_hardmute
  label: Conference HardMute
  kind: action
  command: xCommand Conference HardMute
  params: []

- id: conference_hand_lower
  label: Conference Hand Lower
  kind: action
  command: xCommand Conference Hand Lower
  params: []

- id: conference_lock
  label: Conference Lock
  kind: action
  command: xCommand Conference Lock
  params: []

- id: conference_meetingassistant_start
  label: Conference MeetingAssistant Start
  kind: action
  command: xCommand Conference MeetingAssistant Start
  params: []

- id: conference_meetingassistant_stop
  label: Conference MeetingAssistant Stop
  kind: action
  command: xCommand Conference MeetingAssistant Stop
  params: []

- id: conference_lowerallhands
  label: Conference LowerAllHands
  kind: action
  command: xCommand Conference LowerAllHands
  params: []

- id: conference_meetingchatnotifications_default
  label: Conference MeetingChatNotifications Default
  kind: action
  command: xCommand Conference MeetingChatNotifications Default
  params: []

- id: conference_meetingchatnotifications_incall
  label: Conference MeetingChatNotifications InCall
  kind: action
  command: xCommand Conference MeetingChatNotifications InCall
  params: []

- id: conference_muteall
  label: Conference MuteAll
  kind: action
  command: xCommand Conference MuteAll
  params: []

- id: conference_muteonentry
  label: Conference MuteOnEntry
  kind: action
  command: xCommand Conference MuteOnEntry
  params: []

- id: conference_participant_add
  label: Conference Participant Add
  kind: action
  command: xCommand Conference Participant Add
  params: []

- id: conference_participant_admit
  label: Conference Participant Admit
  kind: action
  command: xCommand Conference Participant Admit
  params: []

- id: conference_participant_disconnect
  label: Conference Participant Disconnect
  kind: action
  command: xCommand Conference Participant Disconnect
  params: []

- id: conference_participant_lowerhand
  label: Conference Participant LowerHand
  kind: action
  command: xCommand Conference Participant LowerHand
  params: []

- id: conference_participant_mute
  label: Conference Participant Mute
  kind: action
  command: xCommand Conference Participant Mute
  params: []

- id: conference_participantlist_search
  label: Conference ParticipantList Search
  kind: query
  command: xCommand Conference ParticipantList Search
  params: []

- id: conference_peoplefocus_activate
  label: Conference PeopleFocus Activate
  kind: action
  command: xCommand Conference PeopleFocus Activate
  params: []

- id: conference_reaction_enable
  label: Conference Reaction Enable
  kind: action
  command: xCommand Conference Reaction Enable
  params: []

- id: conference_peoplefocus_deactivate
  label: Conference PeopleFocus Deactivate
  kind: action
  command: xCommand Conference PeopleFocus Deactivate
  params: []

- id: conference_reaction_disable
  label: Conference Reaction Disable
  kind: action
  command: xCommand Conference Reaction Disable
  params: []

- id: conference_reaction_send
  label: Conference Reaction Send
  kind: action
  command: xCommand Conference Reaction Send
  params: []

- id: conference_recording_pause
  label: Conference Recording Pause
  kind: action
  command: xCommand Conference Recording Pause
  params: []

- id: conference_recording_resume
  label: Conference Recording Resume
  kind: action
  command: xCommand Conference Recording Resume
  params: []

- id: conference_recording_start
  label: Conference Recording Start
  kind: action
  command: xCommand Conference Recording Start
  params: []

- id: conference_recording_stop
  label: Conference Recording Stop
  kind: action
  command: xCommand Conference Recording Stop
  params: []

- id: conference_skintone
  label: Conference SkinTone
  kind: action
  command: xCommand Conference SkinTone
  params: []

- id: conference_speakerlock_set
  label: Conference SpeakerLock Set
  kind: action
  command: xCommand Conference SpeakerLock Set
  params: []

- id: conference_speakerlock_release
  label: Conference SpeakerLock Release
  kind: action
  command: xCommand Conference SpeakerLock Release
  params: []

- id: conference_transferhostandleave
  label: Conference TransferHostAndLeave
  kind: action
  command: xCommand Conference TransferHostAndLeave
  params: []

# --- Diagnostics ---
- id: diagnostics_run
  label: Diagnostics Run
  kind: action
  command: xCommand Diagnostics Run
  params: []

# --- Dial ---
- id: dial
  label: Dial
  kind: action
  command: xCommand Dial
  params:
    - name: Number
      type: string
      description: Number or URI to dial
    - name: Protocol
      type: string
      description: "Protocol (H323, SIP, etc.)"

# --- GPIO ---
- id: gpio_manualstate_set
  label: GPIO ManualState Set
  kind: action
  command: xCommand GPIO ManualState Set
  params: []

# --- HttpClient ---
- id: httpclient_allow_hostname_add
  label: HttpClient Allow Hostname Add
  kind: action
  command: xCommand HttpClient Allow Hostname Add
  params: []

- id: httpclient_allow_hostname_remove
  label: HttpClient Allow Hostname Remove
  kind: action
  command: xCommand HttpClient Allow Hostname Remove
  params: []

- id: httpclient_allow_hostname_clear
  label: HttpClient Allow Hostname Clear
  kind: action
  command: xCommand HttpClient Allow Hostname Clear
  params: []

- id: httpclient_allow_hostname_list
  label: HttpClient Allow Hostname List
  kind: query
  command: xCommand HttpClient Allow Hostname List
  params: []

- id: httpclient_delete
  label: HttpClient Delete
  kind: action
  command: xCommand HttpClient Delete
  params: []

- id: httpclient_get
  label: HttpClient Get
  kind: action
  command: xCommand HttpClient Get
  params: []

- id: httpclient_patch
  label: HttpClient Patch
  kind: action
  command: xCommand HttpClient Patch
  params: []

- id: httpclient_post
  label: HttpClient Post
  kind: action
  command: xCommand HttpClient Post
  params: []

- id: httpclient_put
  label: HttpClient Put
  kind: action
  command: xCommand HttpClient Put
  params: []

# --- HttpFeedback ---
- id: httpfeedback_deregister
  label: HttpFeedback Deregister
  kind: action
  command: xCommand HttpFeedback Deregister
  params: []

- id: httpfeedback_enable
  label: HttpFeedback Enable
  kind: action
  command: xCommand HttpFeedback Enable
  params: []

- id: httpfeedback_register
  label: HttpFeedback Register
  kind: action
  command: xCommand HttpFeedback Register
  params:
    - name: FeedbackSlot
      type: integer
      description: "Slot number (1..4)"
    - name: ServerUrl
      type: string
      description: URL for HTTP feedback
    - name: Format
      type: string
      description: "XML or JSON"

# --- Logging ---
- id: logging_addevent
  label: Logging AddEvent
  kind: action
  command: xCommand Logging AddEvent
  params: []

- id: logging_extendedlogging_start
  label: Logging ExtendedLogging Start
  kind: action
  command: xCommand Logging ExtendedLogging Start
  params: []

- id: logging_extendedlogging_stop
  label: Logging ExtendedLogging Stop
  kind: action
  command: xCommand Logging ExtendedLogging Stop
  params: []

- id: logging_sendlogs
  label: Logging SendLogs
  kind: action
  command: xCommand Logging SendLogs
  params: []

# --- Macros ---
- id: macros_log_clear
  label: Macros Log Clear
  kind: action
  command: xCommand Macros Log Clear
  params: []

- id: macros_log_get
  label: Macros Log Get
  kind: query
  command: xCommand Macros Log Get
  params: []

- id: macros_macro_activate
  label: Macros Macro Activate
  kind: action
  command: xCommand Macros Macro Activate
  params:
    - name: Id
      type: integer

- id: macros_macro_deactivate
  label: Macros Macro Deactivate
  kind: action
  command: xCommand Macros Macro Deactivate
  params:
    - name: Id
      type: integer

- id: macros_macro_get
  label: Macros Macro Get
  kind: query
  command: xCommand Macros Macro Get
  params: []

- id: macros_macro_remove
  label: Macros Macro Remove
  kind: action
  command: xCommand Macros Macro Remove
  params: []

- id: macros_macro_removeall
  label: Macros Macro RemoveAll
  kind: action
  command: xCommand Macros Macro RemoveAll
  params: []

- id: macros_macro_rename
  label: Macros Macro Rename
  kind: action
  command: xCommand Macros Macro Rename
  params: []

- id: macros_macro_save
  label: Macros Macro Save
  kind: action
  command: xCommand Macros Macro Save
  params: []

- id: macros_macro_roles_set
  label: Macros Macro Roles Set
  kind: action
  command: xCommand Macros Macro Roles Set
  params: []

- id: macros_runtime_restart
  label: Macros Runtime Restart
  kind: action
  command: xCommand Macros Runtime Restart
  params: []

- id: macros_runtime_start
  label: Macros Runtime Start
  kind: action
  command: xCommand Macros Runtime Start
  params: []

- id: macros_runtime_status
  label: Macros Runtime Status
  kind: query
  command: xCommand Macros Runtime Status
  params: []

- id: macros_runtime_stop
  label: Macros Runtime Stop
  kind: action
  command: xCommand Macros Runtime Stop
  params: []

# --- Message ---
- id: message_send
  label: Message Send
  kind: action
  command: xCommand Message Send
  params: []

# --- Network ---
- id: network_snmp_usm_user_add
  label: Network SNMP USM User Add
  kind: action
  command: xCommand Network SNMP USM User Add
  params: []

- id: network_smtp_verifyconfig
  label: Network SMTP VerifyConfig
  kind: action
  command: xCommand Network SMTP VerifyConfig
  params: []

- id: network_snmp_usm_user_delete
  label: Network SNMP USM User Delete
  kind: action
  command: xCommand Network SNMP USM User Delete
  params: []

- id: network_snmp_usm_user_list
  label: Network SNMP USM User List
  kind: query
  command: xCommand Network SNMP USM User List
  params: []

- id: network_wifi_configure
  label: Network Wifi Configure
  kind: action
  command: xCommand Network Wifi Configure
  params: []

- id: network_wifi_scan_start
  label: Network Wifi Scan Start
  kind: action
  command: xCommand Network Wifi Scan Start
  params: []

- id: network_wifi_delete
  label: Network Wifi Delete
  kind: action
  command: xCommand Network Wifi Delete
  params: []

- id: network_wifi_scan_stop
  label: Network Wifi Scan Stop
  kind: action
  command: xCommand Network Wifi Scan Stop
  params: []

- id: network_wifi_list
  label: Network Wifi List
  kind: query
  command: xCommand Network Wifi List
  params: []

# --- Peripherals ---
- id: peripherals_connect
  label: Peripherals Connect
  kind: action
  command: xCommand Peripherals Connect
  params: []

- id: peripherals_heartbeat
  label: Peripherals HeartBeat
  kind: action
  command: xCommand Peripherals HeartBeat
  params: []

- id: peripherals_list
  label: Peripherals List
  kind: query
  command: xCommand Peripherals List
  params: []

- id: peripherals_pairing_pinpairing_start
  label: Peripherals Pairing PinPairing Start
  kind: action
  command: xCommand Peripherals Pairing PinPairing Start
  params: []

- id: peripherals_pairing_pair
  label: Peripherals Pairing Pair
  kind: action
  command: xCommand Peripherals Pairing Pair
  params: []

- id: peripherals_pairing_pinpairing_stop
  label: Peripherals Pairing PinPairing Stop
  kind: action
  command: xCommand Peripherals Pairing PinPairing Stop
  params: []

- id: peripherals_pairing_unpair
  label: Peripherals Pairing Unpair
  kind: action
  command: xCommand Peripherals Pairing Unpair
  params: []

- id: peripherals_purge
  label: Peripherals Purge
  kind: action
  command: xCommand Peripherals Purge
  params: []

- id: peripherals_touchpanel_configure
  label: Peripherals TouchPanel Configure
  kind: action
  command: xCommand Peripherals TouchPanel Configure
  params: []

# --- Phonebook ---
- id: phonebook_contact_add
  label: Phonebook Contact Add
  kind: action
  command: xCommand Phonebook Contact Add
  params: []

- id: phonebook_contact_delete
  label: Phonebook Contact Delete
  kind: action
  command: xCommand Phonebook Contact Delete
  params: []

- id: phonebook_contact_modify
  label: Phonebook Contact Modify
  kind: action
  command: xCommand Phonebook Contact Modify
  params: []

- id: phonebook_contactmethod_add
  label: Phonebook ContactMethod Add
  kind: action
  command: xCommand Phonebook ContactMethod Add
  params: []

- id: phonebook_contactmethod_delete
  label: Phonebook ContactMethod Delete
  kind: action
  command: xCommand Phonebook ContactMethod Delete
  params: []

- id: phonebook_contactmethod_modify
  label: Phonebook ContactMethod Modify
  kind: action
  command: xCommand Phonebook ContactMethod Modify
  params: []

- id: phonebook_folder_add
  label: Phonebook Folder Add
  kind: action
  command: xCommand Phonebook Folder Add
  params: []

- id: phonebook_folder_delete
  label: Phonebook Folder Delete
  kind: action
  command: xCommand Phonebook Folder Delete
  params: []

- id: phonebook_folder_modify
  label: Phonebook Folder Modify
  kind: action
  command: xCommand Phonebook Folder Modify
  params: []

- id: phonebook_search
  label: Phonebook Search
  kind: query
  command: xCommand Phonebook Search
  params:
    - name: SearchString
      type: string

# --- Presentation ---
- id: presentation_start
  label: Presentation Start
  kind: action
  command: xCommand Presentation Start
  params:
    - name: SendingMode
      type: string

- id: presentation_stop
  label: Presentation Stop
  kind: action
  command: xCommand Presentation Stop
  params: []

# --- Provisioning ---
- id: provisioning_completeupgrade
  label: Provisioning CompleteUpgrade
  kind: action
  command: xCommand Provisioning CompleteUpgrade
  params: []

- id: provisioning_postponeupgrade
  label: Provisioning PostponeUpgrade
  kind: action
  command: xCommand Provisioning PostponeUpgrade
  params: []

- id: provisioning_cucm_extensionmobility_login
  label: Provisioning CUCM ExtensionMobility Login
  kind: action
  command: xCommand Provisioning CUCM ExtensionMobility Login
  params: []

- id: provisioning_roomtype_activate
  label: Provisioning RoomType Activate
  kind: action
  command: xCommand Provisioning RoomType Activate
  params: []

- id: provisioning_cucm_extensionmobility_logout
  label: Provisioning CUCM ExtensionMobility Logout
  kind: action
  command: xCommand Provisioning CUCM ExtensionMobility Logout
  params: []

- id: provisioning_service_fetch
  label: Provisioning Service Fetch
  kind: action
  command: xCommand Provisioning Service Fetch
  params: []

# --- Proximity ---
- id: proximity_services_activate
  label: Proximity Services Activate
  kind: action
  command: xCommand Proximity Services Activate
  params: []

- id: proximity_services_deactivate
  label: Proximity Services Deactivate
  kind: action
  command: xCommand Proximity Services Deactivate
  params: []

# --- RoomCleanup ---
- id: roomcleanup_cancel
  label: RoomCleanup Cancel
  kind: action
  command: xCommand RoomCleanup Cancel
  params: []

- id: roomcleanup_run
  label: RoomCleanup Run
  kind: action
  command: xCommand RoomCleanup Run
  params: []

# --- RoomPreset ---
- id: roompreset_store
  label: RoomPreset Store
  kind: action
  command: xCommand RoomPreset Store
  params: []

- id: roompreset_activate
  label: RoomPreset Activate
  kind: action
  command: xCommand RoomPreset Activate
  params: []

- id: roompreset_clear
  label: RoomPreset Clear
  kind: action
  command: xCommand RoomPreset Clear
  params: []

# --- Security ---
- id: security_certificates_ca_add
  label: Security Certificates CA Add
  kind: action
  command: xCommand Security Certificates CA Add
  params: []

- id: security_certificates_cucm_ctl_delete
  label: Security Certificates CUCM CTL Delete
  kind: action
  command: xCommand Security Certificates CUCM CTL Delete
  params: []

- id: security_certificates_cucm_ctl_show
  label: Security Certificates CUCM CTL Show
  kind: query
  command: xCommand Security Certificates CUCM CTL Show
  params: []

- id: security_certificates_ca_delete
  label: Security Certificates CA Delete
  kind: action
  command: xCommand Security Certificates CA Delete
  params: []

- id: security_certificates_ca_show
  label: Security Certificates CA Show
  kind: query
  command: xCommand Security Certificates CA Show
  params: []

- id: security_certificates_cucm_itl_show
  label: Security Certificates CUCM ITL Show
  kind: query
  command: xCommand Security Certificates CUCM ITL Show
  params: []

- id: security_certificates_cucm_mic_show
  label: Security Certificates CUCM MIC Show
  kind: query
  command: xCommand Security Certificates CUCM MIC Show
  params: []

- id: security_certificates_services_activate
  label: Security Certificates Services Activate
  kind: action
  command: xCommand Security Certificates Services Activate
  params: []

- id: security_certificates_services_add
  label: Security Certificates Services Add
  kind: action
  command: xCommand Security Certificates Services Add
  params: []

- id: security_certificates_services_deactivate
  label: Security Certificates Services Deactivate
  kind: action
  command: xCommand Security Certificates Services Deactivate
  params: []

- id: security_certificates_services_delete
  label: Security Certificates Services Delete
  kind: action
  command: xCommand Security Certificates Services Delete
  params: []

- id: security_certificates_services_show
  label: Security Certificates Services Show
  kind: query
  command: xCommand Security Certificates Services Show
  params: []

- id: security_certificates_thirdparty_disable
  label: Security Certificates ThirdParty Disable
  kind: action
  command: xCommand Security Certificates ThirdParty Disable
  params: []

- id: security_certificates_thirdparty_show
  label: Security Certificates ThirdParty Show
  kind: query
  command: xCommand Security Certificates ThirdParty Show
  params: []

- id: security_certificates_thirdparty_enable
  label: Security Certificates ThirdParty Enable
  kind: action
  command: xCommand Security Certificates ThirdParty Enable
  params: []

- id: security_certificates_thirdparty_list
  label: Security Certificates ThirdParty List
  kind: query
  command: xCommand Security Certificates ThirdParty List
  params: []

- id: security_certificates_webex_show
  label: Security Certificates Webex Show
  kind: query
  command: xCommand Security Certificates Webex Show
  params: []

- id: security_certificates_webexidentity_show
  label: Security Certificates WebexIdentity Show
  kind: query
  command: xCommand Security Certificates WebexIdentity Show
  params: []

- id: security_ciphers_list
  label: Security Ciphers List
  kind: query
  command: xCommand Security Ciphers List
  params: []

- id: security_clientsecret_populate
  label: Security ClientSecret Populate
  kind: action
  command: xCommand Security ClientSecret Populate
  params: []

- id: security_persistency
  label: Security Persistency
  kind: action
  command: xCommand Security Persistency
  params: []

- id: security_session_get
  label: Security Session Get
  kind: query
  command: xCommand Security Session Get
  params: []

- id: security_session_list
  label: Security Session List
  kind: query
  command: xCommand Security Session List
  params: []

- id: security_session_terminate
  label: Security Session Terminate
  kind: action
  command: xCommand Security Session Terminate
  params: []

# --- Standby ---
- id: standby_activate
  label: Standby Activate
  kind: action
  command: xCommand Standby Activate
  params: []

- id: standby_deactivate
  label: Standby Deactivate
  kind: action
  command: xCommand Standby Deactivate
  params: []

- id: standby_halfwake
  label: Standby Halfwake
  kind: action
  command: xCommand Standby Halfwake
  params: []

- id: standby_resethalfwaketimer
  label: Standby ResetHalfwakeTimer
  kind: action
  command: xCommand Standby ResetHalfwakeTimer
  params: []

- id: standby_resettimer
  label: Standby ResetTimer
  kind: action
  command: xCommand Standby ResetTimer
  params: []

# --- SystemUnit ---
- id: systemunit_boot
  label: SystemUnit Boot
  kind: action
  command: xCommand SystemUnit Boot
  params: []

- id: systemunit_developerpreview_activate
  label: SystemUnit DeveloperPreview Activate
  kind: action
  command: xCommand SystemUnit DeveloperPreview Activate
  params: []

- id: systemunit_developerpreview_deactivate
  label: SystemUnit DeveloperPreview Deactivate
  kind: action
  command: xCommand SystemUnit DeveloperPreview Deactivate
  params: []

- id: systemunit_factoryreset
  label: SystemUnit FactoryReset
  kind: action
  command: xCommand SystemUnit FactoryReset
  params: []

- id: systemunit_firsttimewizard_stop
  label: SystemUnit FirstTimeWizard Stop
  kind: action
  command: xCommand SystemUnit FirstTimeWizard Stop
  params: []

- id: systemunit_notifications_removeall
  label: SystemUnit Notifications RemoveAll
  kind: action
  command: xCommand SystemUnit Notifications RemoveAll
  params: []

- id: systemunit_optionkey_add
  label: SystemUnit OptionKey Add
  kind: action
  command: xCommand SystemUnit OptionKey Add
  params: []

- id: systemunit_optionkey_removeall
  label: SystemUnit OptionKey RemoveAll
  kind: action
  command: xCommand SystemUnit OptionKey RemoveAll
  params: []

- id: systemunit_productplatform_set
  label: SystemUnit ProductPlatform Set
  kind: action
  command: xCommand SystemUnit ProductPlatform Set
  params: []

- id: systemunit_optionkey_list
  label: SystemUnit OptionKey List
  kind: query
  command: xCommand SystemUnit OptionKey List
  params: []

- id: systemunit_optionkey_remove
  label: SystemUnit OptionKey Remove
  kind: action
  command: xCommand SystemUnit OptionKey Remove
  params: []

- id: systemunit_signinbanner_clear
  label: SystemUnit SignInBanner Clear
  kind: action
  command: xCommand SystemUnit SignInBanner Clear
  params: []

- id: systemunit_softreset
  label: SystemUnit SoftReset
  kind: action
  command: xCommand SystemUnit SoftReset
  params: []

- id: systemunit_signinbanner_get
  label: SystemUnit SignInBanner Get
  kind: query
  command: xCommand SystemUnit SignInBanner Get
  params: []

- id: systemunit_signinbanner_set
  label: SystemUnit SignInBanner Set
  kind: action
  command: xCommand SystemUnit SignInBanner Set
  params: []

- id: systemunit_softwareupgrade
  label: SystemUnit SoftwareUpgrade
  kind: action
  command: xCommand SystemUnit SoftwareUpgrade
  params: []

- id: systemunit_welcomebanner_clear
  label: SystemUnit WelcomeBanner Clear
  kind: action
  command: xCommand SystemUnit WelcomeBanner Clear
  params: []

- id: systemunit_welcomebanner_get
  label: SystemUnit WelcomeBanner Get
  kind: query
  command: xCommand SystemUnit WelcomeBanner Get
  params: []

- id: systemunit_welcomebanner_set
  label: SystemUnit WelcomeBanner Set
  kind: action
  command: xCommand SystemUnit WelcomeBanner Set
  params: []

# --- Time ---
- id: time_datetime_get
  label: Time DateTime Get
  kind: query
  command: xCommand Time DateTime Get
  params: []

- id: time_datetime_set
  label: Time DateTime Set
  kind: action
  command: xCommand Time DateTime Set
  params: []

# --- UserInterface Branding ---
- id: userinterface_branding_fetch
  label: UserInterface Branding Fetch
  kind: action
  command: xCommand UserInterface Branding Fetch
  params: []

- id: userinterface_branding_clear
  label: UserInterface Branding Clear
  kind: action
  command: xCommand UserInterface Branding Clear
  params: []

- id: userinterface_branding_delete
  label: UserInterface Branding Delete
  kind: action
  command: xCommand UserInterface Branding Delete
  params: []

- id: userinterface_branding_get
  label: UserInterface Branding Get
  kind: query
  command: xCommand UserInterface Branding Get
  params: []

- id: userinterface_branding_updated
  label: UserInterface Branding Updated
  kind: action
  command: xCommand UserInterface Branding Updated
  params: []

- id: userinterface_branding_upload
  label: UserInterface Branding Upload
  kind: action
  command: xCommand UserInterface Branding Upload
  params: []

# --- UserInterface Extensions ---
- id: userinterface_extensions_clear
  label: UserInterface Extensions Clear
  kind: action
  command: xCommand UserInterface Extensions Clear
  params: []

- id: userinterface_extensions_export
  label: UserInterface Extensions Export
  kind: action
  command: xCommand UserInterface Extensions Export
  params: []

- id: userinterface_extensions_icon_delete
  label: UserInterface Extensions Icon Delete
  kind: action
  command: xCommand UserInterface Extensions Icon Delete
  params: []

- id: userinterface_extensions_icon_download
  label: UserInterface Extensions Icon Download
  kind: action
  command: xCommand UserInterface Extensions Icon Download
  params: []

- id: userinterface_extensions_icon_deleteall
  label: UserInterface Extensions Icon DeleteAll
  kind: action
  command: xCommand UserInterface Extensions Icon DeleteAll
  params: []

- id: userinterface_extensions_icon_fetch
  label: UserInterface Extensions Icon Fetch
  kind: action
  command: xCommand UserInterface Extensions Icon Fetch
  params: []

- id: userinterface_extensions_icon_get
  label: UserInterface Extensions Icon Get
  kind: query
  command: xCommand UserInterface Extensions Icon Get
  params: []

- id: userinterface_extensions_icon_list
  label: UserInterface Extensions Icon List
  kind: query
  command: xCommand UserInterface Extensions Icon List
  params: []

- id: userinterface_extensions_list
  label: UserInterface Extensions List
  kind: query
  command: xCommand UserInterface Extensions List
  params: []

- id: userinterface_extensions_icon_upload
  label: UserInterface Extensions Icon Upload
  kind: action
  command: xCommand UserInterface Extensions Icon Upload
  params: []

- id: userinterface_extensions_panel_clicked
  label: UserInterface Extensions Panel Clicked
  kind: action
  command: xCommand UserInterface Extensions Panel Clicked
  params: []

- id: userinterface_extensions_panel_close
  label: UserInterface Extensions Panel Close
  kind: action
  command: xCommand UserInterface Extensions Panel Close
  params: []

- id: userinterface_extensions_panel_save
  label: UserInterface Extensions Panel Save
  kind: action
  command: xCommand UserInterface Extensions Panel Save
  params: []

- id: userinterface_extensions_panel_open
  label: UserInterface Extensions Panel Open
  kind: action
  command: xCommand UserInterface Extensions Panel Open
  params: []

- id: userinterface_extensions_panel_remove
  label: UserInterface Extensions Panel Remove
  kind: action
  command: xCommand UserInterface Extensions Panel Remove
  params: []

- id: userinterface_extensions_panel_update
  label: UserInterface Extensions Panel Update
  kind: action
  command: xCommand UserInterface Extensions Panel Update
  params: []

- id: userinterface_extensions_set
  label: UserInterface Extensions Set
  kind: action
  command: xCommand UserInterface Extensions Set
  params: []

- id: userinterface_extensions_webapp_save
  label: UserInterface Extensions WebApp Save
  kind: action
  command: xCommand UserInterface Extensions WebApp Save
  params: []

- id: userinterface_extensions_webwidget_remove
  label: UserInterface Extensions WebWidget Remove
  kind: action
  command: xCommand UserInterface Extensions WebWidget Remove
  params: []

- id: userinterface_extensions_webwidget_save
  label: UserInterface Extensions WebWidget Save
  kind: action
  command: xCommand UserInterface Extensions WebWidget Save
  params: []

- id: userinterface_extensions_widget_action
  label: UserInterface Extensions Widget Action
  kind: action
  command: xCommand UserInterface Extensions Widget Action
  params: []

- id: userinterface_extensions_widget_unsetvalue
  label: UserInterface Extensions Widget UnsetValue
  kind: action
  command: xCommand UserInterface Extensions Widget UnsetValue
  params: []

- id: userinterface_extensions_widget_setvalue
  label: UserInterface Extensions Widget SetValue
  kind: action
  command: xCommand UserInterface Extensions Widget SetValue
  params: []

# --- UserInterface LedControl ---
- id: userinterface_ledcontrol_color_set
  label: UserInterface LedControl Color Set
  kind: action
  command: xCommand UserInterface LedControl Color Set
  params: []

# --- UserInterface Message ---
- id: userinterface_message_alert_clear
  label: UserInterface Message Alert Clear
  kind: action
  command: xCommand UserInterface Message Alert Clear
  params: []

- id: userinterface_message_alert_display
  label: UserInterface Message Alert Display
  kind: action
  command: xCommand UserInterface Message Alert Display
  params:
    - name: Title
      type: string
    - name: Text
      type: string
    - name: Duration
      type: integer

- id: userinterface_message_prompt_clear
  label: UserInterface Message Prompt Clear
  kind: action
  command: xCommand UserInterface Message Prompt Clear
  params: []

- id: userinterface_message_prompt_display
  label: UserInterface Message Prompt Display
  kind: action
  command: xCommand UserInterface Message Prompt Display
  params: []

- id: userinterface_message_prompt_response
  label: UserInterface Message Prompt Response
  kind: action
  command: xCommand UserInterface Message Prompt Response
  params: []

- id: userinterface_message_rating_clear
  label: UserInterface Message Rating Clear
  kind: action
  command: xCommand UserInterface Message Rating Clear
  params: []

- id: userinterface_message_rating_display
  label: UserInterface Message Rating Display
  kind: action
  command: xCommand UserInterface Message Rating Display
  params: []

- id: userinterface_message_textinput_display
  label: UserInterface Message TextInput Display
  kind: action
  command: xCommand UserInterface Message TextInput Display
  params: []

- id: userinterface_message_rating_response
  label: UserInterface Message Rating Response
  kind: action
  command: xCommand UserInterface Message Rating Response
  params: []

- id: userinterface_message_textinput_clear
  label: UserInterface Message TextInput Clear
  kind: action
  command: xCommand UserInterface Message TextInput Clear
  params: []

- id: userinterface_message_textline_clear
  label: UserInterface Message TextLine Clear
  kind: action
  command: xCommand UserInterface Message TextLine Clear
  params: []

- id: userinterface_message_textinput_response
  label: UserInterface Message TextInput Response
  kind: action
  command: xCommand UserInterface Message TextInput Response
  params: []

- id: userinterface_message_textline_display
  label: UserInterface Message TextLine Display
  kind: action
  command: xCommand UserInterface Message TextLine Display
  params: []

# --- UserInterface Presentation ---
- id: userinterface_presentation_autoshare_showalert
  label: UserInterface Presentation AutoShare ShowAlert
  kind: action
  command: xCommand UserInterface Presentation AutoShare ShowAlert
  params: []

- id: userinterface_presentation_externalsource_add
  label: UserInterface Presentation ExternalSource Add
  kind: action
  command: xCommand UserInterface Presentation ExternalSource Add
  params: []

- id: userinterface_presentation_externalsource_list
  label: UserInterface Presentation ExternalSource List
  kind: query
  command: xCommand UserInterface Presentation ExternalSource List
  params: []

- id: userinterface_presentation_externalsource_remove
  label: UserInterface Presentation ExternalSource Remove
  kind: action
  command: xCommand UserInterface Presentation ExternalSource Remove
  params: []

- id: userinterface_presentation_externalsource_removeall
  label: UserInterface Presentation ExternalSource RemoveAll
  kind: action
  command: xCommand UserInterface Presentation ExternalSource RemoveAll
  params: []

- id: userinterface_presentation_externalsource_select
  label: UserInterface Presentation ExternalSource Select
  kind: action
  command: xCommand UserInterface Presentation ExternalSource Select
  params: []

- id: userinterface_presentation_externalsource_state_set
  label: UserInterface Presentation ExternalSource State Set
  kind: action
  command: xCommand UserInterface Presentation ExternalSource State Set
  params: []

# --- UserInterface Translation ---
- id: userinterface_translation_override_clear
  label: UserInterface Translation Override Clear
  kind: action
  command: xCommand UserInterface Translation Override Clear
  params: []

- id: userinterface_translation_override_get
  label: UserInterface Translation Override Get
  kind: query
  command: xCommand UserInterface Translation Override Get
  params: []

- id: userinterface_translation_override_set
  label: UserInterface Translation Override Set
  kind: action
  command: xCommand UserInterface Translation Override Set
  params: []

# --- UserInterface Wallpaper/WebView ---
- id: userinterface_wallpaperbundle_clear
  label: UserInterface WallpaperBundle Clear
  kind: action
  command: xCommand UserInterface WallpaperBundle Clear
  params: []

- id: userinterface_wallpaperbundle_list
  label: UserInterface WallpaperBundle List
  kind: query
  command: xCommand UserInterface WallpaperBundle List
  params: []

- id: userinterface_wallpaperbundle_set
  label: UserInterface WallpaperBundle Set
  kind: action
  command: xCommand UserInterface WallpaperBundle Set
  params: []

- id: userinterface_webview_clear
  label: UserInterface WebView Clear
  kind: action
  command: xCommand UserInterface WebView Clear
  params: []

- id: userinterface_webview_display
  label: UserInterface WebView Display
  kind: action
  command: xCommand UserInterface WebView Display
  params:
    - name: URL
      type: string

# --- UserManagement ---
- id: usermanagement_remotesupportuser_create
  label: UserManagement RemoteSupportUser Create
  kind: action
  command: xCommand UserManagement RemoteSupportUser Create
  params: []

- id: usermanagement_remotesupportuser_getstate
  label: UserManagement RemoteSupportUser GetState
  kind: query
  command: xCommand UserManagement RemoteSupportUser GetState
  params: []

- id: usermanagement_remotesupportuser_delete
  label: UserManagement RemoteSupportUser Delete
  kind: action
  command: xCommand UserManagement RemoteSupportUser Delete
  params: []

- id: usermanagement_remotesupportuser_disablepermanently
  label: UserManagement RemoteSupportUser DisablePermanently
  kind: action
  command: xCommand UserManagement RemoteSupportUser DisablePermanently
  params: []

- id: usermanagement_user_add
  label: UserManagement User Add
  kind: action
  command: xCommand UserManagement User Add
  params: []

- id: usermanagement_user_delete
  label: UserManagement User Delete
  kind: action
  command: xCommand UserManagement User Delete
  params: []

- id: usermanagement_user_get
  label: UserManagement User Get
  kind: query
  command: xCommand UserManagement User Get
  params: []

- id: usermanagement_user_list
  label: UserManagement User List
  kind: query
  command: xCommand UserManagement User List
  params: []

- id: usermanagement_user_modify
  label: UserManagement User Modify
  kind: action
  command: xCommand UserManagement User Modify
  params: []

- id: usermanagement_user_passphrase_change
  label: UserManagement User Passphrase Change
  kind: action
  command: xCommand UserManagement User Passphrase Change
  params: []

- id: usermanagement_user_unblock
  label: UserManagement User Unblock
  kind: action
  command: xCommand UserManagement User Unblock
  params: []

- id: usermanagement_user_passphrase_set
  label: UserManagement User Passphrase Set
  kind: action
  command: xCommand UserManagement User Passphrase Set
  params: []

# --- UserPresence ---
- id: userpresence_customstatus_set
  label: UserPresence CustomStatus Set
  kind: action
  command: xCommand UserPresence CustomStatus Set
  params: []

- id: userpresence_customstatus_clear
  label: UserPresence CustomStatus Clear
  kind: action
  command: xCommand UserPresence CustomStatus Clear
  params: []

- id: userpresence_customstatus_getrecentslist
  label: UserPresence CustomStatus GetRecentsList
  kind: query
  command: xCommand UserPresence CustomStatus GetRecentsList
  params: []

# --- Video CEC ---
- id: video_cec_input_keyclick
  label: Video CEC Input KeyClick
  kind: action
  command: xCommand Video CEC Input KeyClick
  params: []

- id: video_activespeakerpip_set
  label: Video ActiveSpeakerPIP Set
  kind: action
  command: xCommand Video ActiveSpeakerPIP Set
  params: []

- id: video_cec_output_keyclick
  label: Video CEC Output KeyClick
  kind: action
  command: xCommand Video CEC Output KeyClick
  params: []

- id: video_cec_output_sendactivesourcerequest
  label: Video CEC Output SendActiveSourceRequest
  kind: action
  command: xCommand Video CEC Output SendActiveSourceRequest
  params: []

- id: video_cec_output_sendinactivesourcerequest
  label: Video CEC Output SendInactiveSourceRequest
  kind: action
  command: xCommand Video CEC Output SendInactiveSourceRequest
  params: []

# --- Video Graphics/Input ---
- id: video_graphics_clear
  label: Video Graphics Clear
  kind: action
  command: xCommand Video Graphics Clear
  params: []

- id: video_graphics_text_display
  label: Video Graphics Text Display
  kind: action
  command: xCommand Video Graphics Text Display
  params: []

- id: video_input_mainvideo_mute
  label: Video Input MainVideo Mute
  kind: action
  command: xCommand Video Input MainVideo Mute
  params: []

- id: video_input_mainvideo_unmute
  label: Video Input MainVideo Unmute
  kind: action
  command: xCommand Video Input MainVideo Unmute
  params: []

- id: video_input_setmainvideosource
  label: Video Input SetMainVideoSource
  kind: action
  command: xCommand Video Input SetMainVideoSource
  params:
    - name: SourceId
      type: integer
      description: Video input connector ID

# --- Video Layout ---
- id: video_layout_layoutfamily_set
  label: Video Layout LayoutFamily Set
  kind: action
  command: xCommand Video Layout LayoutFamily Set
  params: []

- id: video_layout_hidenonvideo_activate
  label: Video Layout HideNonVideo Activate
  kind: action
  command: xCommand Video Layout HideNonVideo Activate
  params: []

- id: video_layout_hidenonvideo_deactivate
  label: Video Layout HideNonVideo Deactivate
  kind: action
  command: xCommand Video Layout HideNonVideo Deactivate
  params: []

- id: video_layout_setlayout
  label: Video Layout SetLayout
  kind: action
  command: xCommand Video Layout SetLayout
  params: []

# --- Video Matrix ---
- id: video_matrix_assign
  label: Video Matrix Assign
  kind: action
  command: xCommand Video Matrix Assign
  params: []

- id: video_matrix_reset
  label: Video Matrix Reset
  kind: action
  command: xCommand Video Matrix Reset
  params: []

- id: video_matrix_unassign
  label: Video Matrix Unassign
  kind: action
  command: xCommand Video Matrix Unassign
  params: []

- id: video_matrix_swap
  label: Video Matrix Swap
  kind: action
  command: xCommand Video Matrix Swap
  params: []

# --- Video Output ---
- id: video_output_hdmi_passthrough_start
  label: Video Output HDMI Passthrough Start
  kind: action
  command: xCommand Video Output HDMI Passthrough Start
  params: []

- id: video_output_hdmi_passthrough_stop
  label: Video Output HDMI Passthrough Stop
  kind: action
  command: xCommand Video Output HDMI Passthrough Stop
  params: []

- id: video_output_monitor_color_select
  label: Video Output Monitor Color Select
  kind: action
  command: xCommand Video Output Monitor Color Select
  params: []

- id: video_output_monitor_backlight_set
  label: Video Output Monitor Backlight Set
  kind: action
  command: xCommand Video Output Monitor Backlight Set
  params: []

- id: video_output_monitor_reset
  label: Video Output Monitor Reset
  kind: action
  command: xCommand Video Output Monitor Reset
  params: []

# --- Video PIP/Selfview ---
- id: video_presentationpip_set
  label: Video PresentationPIP Set
  kind: action
  command: xCommand Video PresentationPIP Set
  params: []

- id: video_selfview_set
  label: Video Selfview Set
  kind: action
  command: xCommand Video Selfview Set
  params: []

- id: video_presentationview_set
  label: Video PresentationView Set
  kind: action
  command: xCommand Video PresentationView Set
  params: []

# --- WebEngine ---
- id: webengine_deletestorage
  label: WebEngine DeleteStorage
  kind: action
  command: xCommand WebEngine DeleteStorage
  params: []

- id: webengine_logging_set
  label: WebEngine Logging Set
  kind: action
  command: xCommand WebEngine Logging Set
  params: []

- id: webengine_mediaaccess_add
  label: WebEngine MediaAccess Add
  kind: action
  command: xCommand WebEngine MediaAccess Add
  params: []

- id: webengine_mediaaccess_remove
  label: WebEngine MediaAccess Remove
  kind: action
  command: xCommand WebEngine MediaAccess Remove
  params: []

- id: webengine_mediaaccess_removeall
  label: WebEngine MediaAccess RemoveAll
  kind: action
  command: xCommand WebEngine MediaAccess RemoveAll
  params: []

- id: webengine_mediaaccess_list
  label: WebEngine MediaAccess List
  kind: query
  command: xCommand WebEngine MediaAccess List
  params: []

# --- Webex ---
- id: webex_join
  label: Webex Join
  kind: action
  command: xCommand Webex Join
  params: []

- id: webex_hotdesking_setsupport
  label: Webex Hotdesking SetSupport
  kind: action
  command: xCommand Webex Hotdesking SetSupport
  params: []

- id: webex_meetings_instantmeeting_start
  label: Webex Meetings InstantMeeting Start
  kind: action
  command: xCommand Webex Meetings InstantMeeting Start
  params: []

- id: webex_registration_logout
  label: Webex Registration Logout
  kind: action
  command: xCommand Webex Registration Logout
  params: []

- id: webex_registration_cancel
  label: Webex Registration Cancel
  kind: action
  command: xCommand Webex Registration Cancel
  params: []

- id: webex_registration_converttocloud
  label: Webex Registration ConvertToCloud
  kind: action
  command: xCommand Webex Registration ConvertToCloud
  params: []

- id: webex_registration_start
  label: Webex Registration Start
  kind: action
  command: xCommand Webex Registration Start
  params: []

# --- WebRTC ---
- id: webrtc_join
  label: WebRTC Join
  kind: action
  command: xCommand WebRTC Join
  params: []

- id: webrtc_provider_current_diagnostics_send
  label: WebRTC Provider Current Diagnostics Send
  kind: action
  command: xCommand WebRTC Provider Current Diagnostics Send
  params: []

- id: webrtc_provider_googlemeet_meetingnumber_validate
  label: WebRTC Provider GoogleMeet MeetingNumber Validate
  kind: action
  command: xCommand WebRTC Provider GoogleMeet MeetingNumber Validate
  params: []

# --- Zoom ---
- id: zoom_join
  label: Zoom Join
  kind: action
  command: xCommand Zoom Join
  params: []
```

## Feedbacks
```yaml
# Feedback is registered via xFeedback register <path> on the Status,
# Configuration, and Event XPath documents. Up to 50 expressions per session.
# HTTP feedback via xCommand HttpFeedback Register (up to 4 slots, 15 expressions each).

- id: power_state
  type: enum
  values: [on, standby, halfwake]
  path: /Status/Standby
  description: Device power/standby state

- id: call_state
  type: enum
  values: [idle, ringing, connected, connecting]
  path: /Status/Call
  description: Current call state

- id: audio_volume
  type: integer
  path: /Status/Audio/Volume
  description: Current speaker volume level (0..100)

- id: audio_mute
  type: enum
  values: [muted, unmuted]
  path: /Status/Audio/Microphones/Mute
  description: Microphone mute state

- id: video_input_source
  type: string
  path: /Status/Video/Input/MainVideoSource
  description: Current main video source

- id: presentation_state
  type: enum
  values: [active, inactive]
  path: /Status/Video/Presentation
  description: Current presentation state

- id: conference_participants
  type: string
  path: /Status/Conference/Participant
  description: Conference participant list

# UNRESOLVED: full list of feedback paths not exhaustively enumerated;
# the source describes the mechanism (xFeedback register) and provides examples
# but does not list every possible feedback path
```

## Variables
```yaml
- id: audio_volume_level
  label: Audio Volume Level
  type: integer
  min: 0
  max: 100
  unit: "dB (-34.5 to 15 in 0.5dB steps, 0 = off)"
  set_command: xCommand Audio Volume Set Level
  get_command: xStatus Audio Volume

- id: audio_default_volume
  label: Audio Default Volume
  type: integer
  min: 0
  max: 100
  set_command: xConfiguration Audio DefaultVolume
  get_command: xConfiguration Audio DefaultVolume

- id: camera_brightness
  label: Camera Brightness Level
  type: integer
  min: 1
  max: 31
  set_command: xConfiguration Cameras Camera [n] Brightness DefaultLevel
  get_command: xConfiguration Cameras Camera [n] Brightness DefaultLevel

# UNRESOLVED: many more configuration variables exist (serial baud rate,
# network settings, etc.) but exhaustive enumeration exceeds scope of
# control-focused spec
```

## Events
```yaml
- id: outgoing_call_indication
  description: Emitted when an outgoing call is about to be dialled
  prefix: "*e OutgoingCallIndication"
  fields:
    - name: CallId
      type: integer

- id: call_disconnect
  description: Emitted when a call is disconnected
  prefix: "*e CallDisconnect"
  fields:
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
  description: Emitted when a call is connected successfully
  prefix: "*e CallSuccessful"
  fields:
    - name: CallId
      type: integer
    - name: Protocol
      type: string
    - name: Direction
      type: string
    - name: CallRate
      type: integer

- id: fecc_action
  description: Far end FECC command received
  prefix: "*e FeccActionInd"
  fields:
    - name: Id
      type: integer
    - name: Req
      type: integer

- id: tstring_received
  description: TString message received from far end
  prefix: "*e TString"
  fields:
    - name: CallId
      type: integer
    - name: Message
      type: string

- id: sstring_received
  description: SString message received from far end
  prefix: "*e SString"
  fields:
    - name: String
      type: string
    - name: Id
      type: integer

# UNRESOLVED: source describes xEvent mechanism but does not exhaustively
# list all event types; full event catalogue requires xEvent * on device
```

## Macros
```yaml
# UNRESOLVED: source describes macro system (xCommand Macros Macro Save/Activate)
# but does not document specific macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety interlocks or confirmation
# requirements. Commands like SystemUnit FactoryReset, SystemUnit Boot,
# and Video Matrix Reset may warrant confirmation in production use but
# no explicit safety procedures are stated in the source.
```

## Notes
- All commands are case-insensitive (e.g., XCOMMAND, xcommand, and xCommand all work).
- Commands are prefixed with `xCommand` for actions, `xConfiguration` for settings, `xStatus` for queries, and `xEvent` for events.
- HTTP API uses `Content-Type: text/xml` with POST to `/putxml` for commands/configurations. GET to `/getxml?location=<path>` for status/configuration retrieval.
- HTTP session auth via `POST /xmlapi/session/begin` (Basic Auth) returns `SessionId` cookie. Sessions are limited; explicitly close with `POST /xmlapi/session/end`.
- Feedback is session-scoped on SSH/serial; must re-register after reconnection. Up to 50 expressions per session.
- HTTP feedback (webhooks) supports up to 4 slots with 15 XPath expressions each.
- WebSocket uses JSON-RPC encoding (see separate xAPI over WebSocket guide).
- Serial baud rate for most devices is 115200 (fixed); Codec Pro / Room 70 G2 / Room Panorama support configurable rates (9600..115200).
- API works asynchronously; use `resultId` tagging to match requests with responses.
- Default output mode is terminal; switch with `xPreferences outputmode xml` or `xPreferences outputmode json`.
- Values containing spaces must be quoted.
- Use complete command paths (not abbreviations) for production integrations.
- Multiline commands terminated with a period (`.`) on a separate line.

<!-- UNRESOLVED: SSH port number not stated in source -->
<!-- UNRESOLVED: HTTP/HTTPS default ports not explicitly stated -->
<!-- UNRESOLVED: WebSocket connection URL/path not detailed (refers to separate guide) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: xConfiguration commands (hundreds of settings) not enumerated as separate actions -->
<!-- UNRESOLVED: xStatus queries not enumerated as separate actions (covered by generic xStatus mechanism) -->
<!-- UNRESOLVED: complete event catalogue not listed in source (only examples provided) -->

## Provenance

```yaml
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-115/api-reference-guide-roomos-115.pdf
retrieved_at: 2026-05-27T04:41:35.847Z
last_checked_at: 2026-05-27T06:51:41.563Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T06:51:41.563Z
matched_actions: 418
action_count: 418
confidence: medium
summary: "All 418 spec xCommand actions match source verbatim; transport confirmed. (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific SSH port not stated in source (only SSH mentioned, no port number)"
- "HTTP port implied as 80/443 but not explicitly stated as default"
- "firmware version compatibility range not stated"
- "the source is a large multi-product reference manual; not all commands apply to every model"
- "SSH port not explicitly stated in source"
- "source says \"Hardware flow control: Off\" for most devices"
- "full list of feedback paths not exhaustively enumerated;"
- "many more configuration variables exist (serial baud rate,"
- "source describes xEvent mechanism but does not exhaustively"
- "source describes macro system (xCommand Macros Macro Save/Activate)"
- "source does not document safety interlocks or confirmation"
- "SSH port number not stated in source"
- "HTTP/HTTPS default ports not explicitly stated"
- "WebSocket connection URL/path not detailed (refers to separate guide)"
- "firmware version compatibility not stated"
- "xConfiguration commands (hundreds of settings) not enumerated as separate actions"
- "xStatus queries not enumerated as separate actions (covered by generic xStatus mechanism)"
- "complete event catalogue not listed in source (only examples provided)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
