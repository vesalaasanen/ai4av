---
spec_id: admin/cisco-webex-room-kit-series-ce914
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco Webex Room Kit Series (CE 9.14) xAPI Control Spec"
manufacturer: Cisco
model_family: "Webex Room Kit"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "Webex Room Kit"
    - "Webex Room Kit Mini"
    - "Webex Room Bar"
    - "Webex Room Bar Pro"
    - "Webex Room 55"
    - "Webex Room 55 Dual"
    - "Webex Room 70"
    - "Webex Room 70 G2"
    - "Webex Room Panorama"
    - "Webex Room 70 Panorama"
    - "Webex Codec Plus"
    - "Webex Codec Pro"
    - "Webex Codec EQ"
    - "Webex Desk Pro"
    - "Webex Desk Mini"
    - "Webex Desk"
    - "Webex Board"
    - "Webex Board Pro"
  firmware: "\"RoomOS 11.5.2 (CE 9.14 release line)\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-115/api-reference-guide-roomos-115.pdf
retrieved_at: 2026-05-27T04:34:59.632Z
last_checked_at: 2026-05-27T06:51:44.656Z
generated_at: 2026-05-27T06:51:44.656Z
firmware_coverage: "\"RoomOS 11.5.2 (CE 9.14 release line)\""
protocol_coverage: []
known_gaps:
  - "product-to-command compatibility varies widely across the Room Kit family; this spec lists the full command surface but per-model applicability is determined by the compatibility matrix in Chapter 6 of the source."
  - "specific firmware version compatibility per product model not stated in source."
  - "explicit interlock procedures (e.g. confirm-before-reboot) are not"
  - "specific RoomOS 11.5.2 firmware build and per-product firmware version compatibility ranges not stated in the source."
  - "voltage, current, and power specifications not stated in source."
  - "fault behavior and error recovery sequences not stated."
verification:
  verdict: verified
  checked_at: 2026-05-27T06:51:44.656Z
  matched_actions: 418
  action_count: 418
  confidence: medium
  summary: "All 418 spec actions map 1:1 to 418 xCommand entries in source; transport confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Cisco Webex Room Kit Series (CE 9.14) xAPI Control Spec

## Summary
Spec for the Cisco xAPI exposed by Webex Room Kit Series video conferencing devices running RoomOS 11.5.2 (CE 9.14). Covers the four transport methods (SSH, HTTP/HTTPS, WebSocket, RS-232) and the full xAPI command groups: `xConfiguration`, `xCommand`, `xStatus`, `xEvent`, `xFeedback`, plus `xGetxml` and `xPreferences`. Transport uses HTTP Basic Access Authentication (with optional session cookie over HTTP) for HTTP; SSH key/password for SSH; optional login prompt for serial.

<!-- UNRESOLVED: product-to-command compatibility varies widely across the Room Kit family; this spec lists the full command surface but per-model applicability is determined by the compatibility matrix in Chapter 6 of the source. -->
<!-- UNRESOLVED: specific firmware version compatibility per product model not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 22   # SSH, default port 22 used by SSH service
  # HTTP/HTTPS: default ports 80/443 (NetworkServices HTTP Mode setting)
  # WebSocket: tied to HTTP/HTTPS (NetworkServices Websocket setting)
serial:
  baud_rate: 115200   # default for most models; 9600..115200 for Codec Pro / Room 70 G2 / Room Panorama
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: off
auth:
  type: basic
  notes: |
    HTTP XMLAPI uses HTTP Basic Access Authentication (ADMIN role required);
    session-cookie authentication available via POST /xmlapi/session/begin.
    SSH uses standard SSH authentication (password or key) tied to the device user accounts.
    Serial port login prompt is configurable via xConfiguration SerialPort LoginRequired (default On);
    when Off no password is required. All accounts have a default `admin` user with no initial passphrase.
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# CRITICAL: this xAPI exposes ~300+ xCommand entries, ~400+ xConfiguration entries,
# and ~250+ xStatus entries per Chapter 6 of the source. The list below enumerates
# the distinct command groups (top-level paths) documented in the source, with the
# key sub-commands that appear as separate rows in the source's "Description of the
# xCommand commands" chapter. Parameterized sub-commands (those that take arguments
# the source lists as a single row) are represented with `{name}` placeholders.
#
# The xAPI command syntax is: `xCommand <Category> <SubCommand> [Key: Value] ...`
# Commands are case-insensitive. Multi-line payloads end with a line containing only `.`.

- id: xcommand_dial
  label: Dial (place a call)
  kind: action
  command: "xCommand Dial Number: {number} [Protocol: {sip|h323}]"
  params:
    - name: number
      type: string
      description: Address to dial (URI, E.164 number, or H.323 alias)
    - name: protocol
      type: enum
      values: [sip, h323]
      description: Optional call protocol

# === AirPlay ===
- id: xcommand_airplay_keyevent_back
  label: AirPlay KeyEvent Back
  kind: action
  command: "xCommand AirPlay KeyEvent Back"
- id: xcommand_airplay_keyevent_click
  label: AirPlay KeyEvent Click
  kind: action
  command: "xCommand AirPlay KeyEvent Click"
- id: xcommand_airplay_keyevent_down
  label: AirPlay KeyEvent Down
  kind: action
  command: "xCommand AirPlay KeyEvent Down"
- id: xcommand_airplay_keyevent_fastforward
  label: AirPlay KeyEvent FastForward
  kind: action
  command: "xCommand AirPlay KeyEvent FastForward"
- id: xcommand_airplay_keyevent_fastreverse
  label: AirPlay KeyEvent FastReverse
  kind: action
  command: "xCommand AirPlay KeyEvent FastReverse"
- id: xcommand_airplay_keyevent_left
  label: AirPlay KeyEvent Left
  kind: action
  command: "xCommand AirPlay KeyEvent Left"
- id: xcommand_airplay_keyevent_play
  label: AirPlay KeyEvent Play
  kind: action
  command: "xCommand AirPlay KeyEvent Play"
- id: xcommand_airplay_keyevent_right
  label: AirPlay KeyEvent Right
  kind: action
  command: "xCommand AirPlay KeyEvent Right"
- id: xcommand_airplay_keyevent_up
  label: AirPlay KeyEvent Up
  kind: action
  command: "xCommand AirPlay KeyEvent Up"
- id: xcommand_airplay_resetpaireddevices
  label: AirPlay ResetPairedDevices
  kind: action
  command: "xCommand AirPlay ResetPairedDevices"

# === Audio ===
- id: xcommand_audio_diagnostics_advanced_run
  label: Audio Diagnostics Advanced Run
  kind: action
  command: "xCommand Audio Diagnostics Advanced Run"
- id: xcommand_audio_diagnostics_aecreverb_reset
  label: Audio Diagnostics AecReverb Reset
  kind: action
  command: "xCommand Audio Diagnostics AecReverb Reset"
- id: xcommand_audio_diagnostics_aecreverb_run
  label: Audio Diagnostics AecReverb Run
  kind: action
  command: "xCommand Audio Diagnostics AecReverb Run"
- id: xcommand_audio_diagnostics_measuredelay
  label: Audio Diagnostics MeasureDelay
  kind: action
  command: "xCommand Audio Diagnostics MeasureDelay"
- id: xcommand_audio_equalizer_list
  label: Audio Equalizer List
  kind: query
  command: "xCommand Audio Equalizer List"
- id: xcommand_audio_equalizer_update
  label: Audio Equalizer Update
  kind: action
  command: "xCommand Audio Equalizer Update"
- id: xcommand_audio_localinput_add
  label: Audio LocalInput Add
  kind: action
  command: "xCommand Audio LocalInput Add"
- id: xcommand_audio_localinput_addconnector
  label: Audio LocalInput AddConnector
  kind: action
  command: "xCommand Audio LocalInput AddConnector"
- id: xcommand_audio_localinput_remove
  label: Audio LocalInput Remove
  kind: action
  command: "xCommand Audio LocalInput Remove"
- id: xcommand_audio_localinput_removeconnector
  label: Audio LocalInput RemoveConnector
  kind: action
  command: "xCommand Audio LocalInput RemoveConnector"
- id: xcommand_audio_localinput_update
  label: Audio LocalInput Update
  kind: action
  command: "xCommand Audio LocalInput Update"
- id: xcommand_audio_localinput_ethernet_deregister
  label: Audio LocalInput Ethernet Deregister
  kind: action
  command: "xCommand Audio LocalInput Ethernet Deregister"
- id: xcommand_audio_localinput_ethernet_register
  label: Audio LocalInput Ethernet Register
  kind: action
  command: "xCommand Audio LocalInput Ethernet Register"
- id: xcommand_audio_localoutput_add
  label: Audio LocalOutput Add
  kind: action
  command: "xCommand Audio LocalOutput Add"
- id: xcommand_audio_localoutput_addconnector
  label: Audio LocalOutput AddConnector
  kind: action
  command: "xCommand Audio LocalOutput AddConnector"
- id: xcommand_audio_localoutput_connectinput
  label: Audio LocalOutput ConnectInput
  kind: action
  command: "xCommand Audio LocalOutput ConnectInput"
- id: xcommand_audio_localoutput_disconnectinput
  label: Audio LocalOutput DisconnectInput
  kind: action
  command: "xCommand Audio LocalOutput DisconnectInput"
- id: xcommand_audio_localoutput_remove
  label: Audio LocalOutput Remove
  kind: action
  command: "xCommand Audio LocalOutput Remove"
- id: xcommand_audio_localoutput_removeconnector
  label: Audio LocalOutput RemoveConnector
  kind: action
  command: "xCommand Audio LocalOutput RemoveConnector"
- id: xcommand_audio_localoutput_update
  label: Audio LocalOutput Update
  kind: action
  command: "xCommand Audio LocalOutput Update"
- id: xcommand_audio_localoutput_updateinputgain
  label: Audio LocalOutput UpdateInputGain
  kind: action
  command: "xCommand Audio LocalOutput UpdateInputGain"
- id: xcommand_audio_microphones_musicmode_start
  label: Audio Microphones MusicMode Start
  kind: action
  command: "xCommand Audio Microphones MusicMode Start"
- id: xcommand_audio_microphones_musicmode_stop
  label: Audio Microphones MusicMode Stop
  kind: action
  command: "xCommand Audio Microphones MusicMode Stop"
- id: xcommand_audio_microphones_mute
  label: Audio Microphones Mute
  kind: action
  command: "xCommand Audio Microphones Mute"
- id: xcommand_audio_microphones_noiseremoval_activate
  label: Audio Microphones NoiseRemoval Activate
  kind: action
  command: "xCommand Audio Microphones NoiseRemoval Activate"
- id: xcommand_audio_microphones_noiseremoval_deactivate
  label: Audio Microphones NoiseRemoval Deactivate
  kind: action
  command: "xCommand Audio Microphones NoiseRemoval Deactivate"
- id: xcommand_audio_microphones_passthrough_start
  label: Audio Microphones Passthrough Start
  kind: action
  command: "xCommand Audio Microphones Passthrough Start"
- id: xcommand_audio_microphones_passthrough_stop
  label: Audio Microphones Passthrough Stop
  kind: action
  command: "xCommand Audio Microphones Passthrough Stop"
- id: xcommand_audio_microphones_togglemute
  label: Audio Microphones ToggleMute
  kind: action
  command: "xCommand Audio Microphones ToggleMute"
- id: xcommand_audio_microphones_unmute
  label: Audio Microphones Unmute
  kind: action
  command: "xCommand Audio Microphones Unmute"
- id: xcommand_audio_remoteoutput_connectinput
  label: Audio RemoteOutput ConnectInput
  kind: action
  command: "xCommand Audio RemoteOutput ConnectInput"
- id: xcommand_audio_remoteoutput_disconnectinput
  label: Audio RemoteOutput DisconnectInput
  kind: action
  command: "xCommand Audio RemoteOutput DisconnectInput"
- id: xcommand_audio_remoteoutput_updateinputgain
  label: Audio RemoteOutput UpdateInputGain
  kind: action
  command: "xCommand Audio RemoteOutput UpdateInputGain"
- id: xcommand_audio_select
  label: Audio Select
  kind: action
  command: "xCommand Audio Select"
- id: xcommand_audio_setup_clear
  label: Audio Setup Clear
  kind: action
  command: "xCommand Audio Setup Clear"
- id: xcommand_audio_setup_reset
  label: Audio Setup Reset
  kind: action
  command: "xCommand Audio Setup Reset"
- id: xcommand_audio_sound_play
  label: Audio Sound Play
  kind: action
  command: "xCommand Audio Sound Play"
- id: xcommand_audio_sound_stop
  label: Audio Sound Stop
  kind: action
  command: "xCommand Audio Sound Stop"
- id: xcommand_audio_speakercheck
  label: Audio SpeakerCheck
  kind: action
  command: "xCommand Audio SpeakerCheck"
- id: xcommand_audio_soundsandalerts_ringtone_list
  label: Audio SoundsAndAlerts Ringtone List
  kind: query
  command: "xCommand Audio SoundsAndAlerts Ringtone List"
- id: xcommand_audio_soundsandalerts_ringtone_play
  label: Audio SoundsAndAlerts Ringtone Play
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone Play"
- id: xcommand_audio_soundsandalerts_ringtone_stop
  label: Audio SoundsAndAlerts Ringtone Stop
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone Stop"
- id: xcommand_audio_volume_decrease
  label: Audio Volume Decrease
  kind: action
  command: "xCommand Audio Volume Decrease"
- id: xcommand_audio_volume_increase
  label: Audio Volume Increase
  kind: action
  command: "xCommand Audio Volume Increase"
- id: xcommand_audio_volume_mute
  label: Audio Volume Mute
  kind: action
  command: "xCommand Audio Volume Mute"
- id: xcommand_audio_volume_set
  label: Audio Volume Set
  kind: action
  command: "xCommand Audio Volume Set Level: {level}"
  params:
    - name: level
      type: integer
      description: Volume level 0..100 (0 = mute)
- id: xcommand_audio_volume_settodefault
  label: Audio Volume SetToDefault
  kind: action
  command: "xCommand Audio Volume SetToDefault"
- id: xcommand_audio_volume_togglemute
  label: Audio Volume ToggleMute
  kind: action
  command: "xCommand Audio Volume ToggleMute"
- id: xcommand_audio_volume_unmute
  label: Audio Volume Unmute
  kind: action
  command: "xCommand Audio Volume Unmute"
- id: xcommand_audio_vumeter_start
  label: Audio VuMeter Start
  kind: action
  command: "xCommand Audio VuMeter Start"
- id: xcommand_audio_vumeter_stop
  label: Audio VuMeter Stop
  kind: action
  command: "xCommand Audio VuMeter Stop"
- id: xcommand_audio_vumeter_stopall
  label: Audio VuMeter StopAll
  kind: action
  command: "xCommand Audio VuMeter StopAll"

# === Bluetooth ===
- id: xcommand_bluetooth_streaming_next
  label: Bluetooth Streaming Next
  kind: action
  command: "xCommand Bluetooth Streaming Next"
- id: xcommand_bluetooth_streaming_pause
  label: Bluetooth Streaming Pause
  kind: action
  command: "xCommand Bluetooth Streaming Pause"
- id: xcommand_bluetooth_streaming_play
  label: Bluetooth Streaming Play
  kind: action
  command: "xCommand Bluetooth Streaming Play"
- id: xcommand_bluetooth_streaming_previous
  label: Bluetooth Streaming Previous
  kind: action
  command: "xCommand Bluetooth Streaming Previous"

# === Bookings ===
- id: xcommand_bookings_book
  label: Bookings Book
  kind: action
  command: "xCommand Bookings Book"
- id: xcommand_bookings_clear
  label: Bookings Clear
  kind: action
  command: "xCommand Bookings Clear"
- id: xcommand_bookings_delete
  label: Bookings Delete
  kind: action
  command: "xCommand Bookings Delete"
- id: xcommand_bookings_edit
  label: Bookings Edit
  kind: action
  command: "xCommand Bookings Edit"
- id: xcommand_bookings_extend
  label: Bookings Extend
  kind: action
  command: "xCommand Bookings Extend"
- id: xcommand_bookings_get
  label: Bookings Get
  kind: query
  command: "xCommand Bookings Get"
- id: xcommand_bookings_list
  label: Bookings List
  kind: query
  command: "xCommand Bookings List"
- id: xcommand_bookings_notificationsnooze
  label: Bookings NotificationSnooze
  kind: action
  command: "xCommand Bookings NotificationSnooze"
- id: xcommand_bookings_respond
  label: Bookings Respond
  kind: action
  command: "xCommand Bookings Respond"
- id: xcommand_bookings_put
  label: Bookings Put
  kind: action
  command: "xCommand Bookings Put"

# === Call ===
- id: xcommand_call_accept
  label: Call Accept
  kind: action
  command: "xCommand Call Accept CallId: {callId}"
  params:
    - name: callId
      type: integer
      description: ID of incoming call
- id: xcommand_call_disconnect
  label: Call Disconnect
  kind: action
  command: "xCommand Call Disconnect CallId: {callId}"
- id: xcommand_call_dtmfsend
  label: Call DTMFSend
  kind: action
  command: "xCommand Call DTMFSend"
- id: xcommand_call_farendcontrol_camera_move
  label: Call FarEndControl Camera Move
  kind: action
  command: "xCommand Call FarEndControl Camera Move"
- id: xcommand_call_farendcontrol_camera_stop
  label: Call FarEndControl Camera Stop
  kind: action
  command: "xCommand Call FarEndControl Camera Stop"
- id: xcommand_call_farendcontrol_requestcapabilities
  label: Call FarEndControl RequestCapabilities
  kind: action
  command: "xCommand Call FarEndControl RequestCapabilities"
- id: xcommand_call_farendcontrol_roompreset_activate
  label: Call FarEndControl RoomPreset Activate
  kind: action
  command: "xCommand Call FarEndControl RoomPreset Activate"
- id: xcommand_call_farendcontrol_roompreset_store
  label: Call FarEndControl RoomPreset Store
  kind: action
  command: "xCommand Call FarEndControl RoomPreset Store"
- id: xcommand_call_farendcontrol_source_select
  label: Call FarEndControl Source Select
  kind: action
  command: "xCommand Call FarEndControl Source Select"
- id: xcommand_call_farendmessage_send
  label: Call FarEndMessage Send
  kind: action
  command: "xCommand Call FarEndMessage Send"
- id: xcommand_call_forward
  label: Call Forward
  kind: action
  command: "xCommand Call Forward"
- id: xcommand_call_hold
  label: Call Hold
  kind: action
  command: "xCommand Call Hold"
- id: xcommand_call_ignore
  label: Call Ignore
  kind: action
  command: "xCommand Call Ignore"
- id: xcommand_call_join
  label: Call Join
  kind: action
  command: "xCommand Call Join"
- id: xcommand_call_reject
  label: Call Reject
  kind: action
  command: "xCommand Call Reject"
- id: xcommand_call_resume
  label: Call Resume
  kind: action
  command: "xCommand Call Resume"
- id: xcommand_call_unattendedtransfer
  label: Call UnattendedTransfer
  kind: action
  command: "xCommand Call UnattendedTransfer"

# === CallHistory ===
- id: xcommand_callhistory_acknowledgeallmissedcalls
  label: CallHistory AcknowledgeAllMissedCalls
  kind: action
  command: "xCommand CallHistory AcknowledgeAllMissedCalls"
- id: xcommand_callhistory_acknowledgismissedcall
  label: CallHistory AcknowledgeMissedCall
  kind: action
  command: "xCommand CallHistory AcknowledgeMissedCall"
- id: xcommand_callhistory_deleteall
  label: CallHistory DeleteAll
  kind: action
  command: "xCommand CallHistory DeleteAll"
- id: xcommand_callhistory_deleteentry
  label: CallHistory DeleteEntry
  kind: action
  command: "xCommand CallHistory DeleteEntry"
- id: xcommand_callhistory_get
  label: CallHistory Get
  kind: query
  command: "xCommand CallHistory Get"
- id: xcommand_callhistory_recents
  label: CallHistory Recents
  kind: query
  command: "xCommand CallHistory Recents"

# === Camera / Cameras ===
- id: xcommand_camera_positionreset
  label: Camera PositionReset
  kind: action
  command: "xCommand Camera PositionReset"
- id: xcommand_camera_positionset
  label: Camera PositionSet
  kind: action
  command: "xCommand Camera PositionSet CameraId: {cameraId} Pan: {pan} Tilt: {tilt} Zoom: {zoom}"
  params:
    - name: cameraId
      type: integer
    - name: pan
      type: integer
      description: Pan value
    - name: tilt
      type: integer
    - name: zoom
      type: integer
- id: xcommand_camera_preset_activate
  label: Camera Preset Activate
  kind: action
  command: "xCommand Camera Preset Activate PresetId: {presetId}"
- id: xcommand_camera_preset_activatedefaultposition
  label: Camera Preset ActivateDefaultPosition
  kind: action
  command: "xCommand Camera Preset ActivateDefaultPosition"
- id: xcommand_camera_preset_edit
  label: Camera Preset Edit
  kind: action
  command: "xCommand Camera Preset Edit"
- id: xcommand_camera_preset_list
  label: Camera Preset List
  kind: query
  command: "xCommand Camera Preset List"
- id: xcommand_camera_preset_remove
  label: Camera Preset Remove
  kind: action
  command: "xCommand Camera Preset Remove"
- id: xcommand_camera_preset_show
  label: Camera Preset Show
  kind: action
  command: "xCommand Camera Preset Show"
- id: xcommand_camera_preset_store
  label: Camera Preset Store
  kind: action
  command: "xCommand Camera Preset Store"
- id: xcommand_camera_ramp
  label: Camera Ramp
  kind: action
  command: "xCommand Camera Ramp"
- id: xcommand_camera_triggerautofocus
  label: Camera TriggerAutofocus
  kind: action
  command: "xCommand Camera TriggerAutofocus"
- id: xcommand_camera_triggerwhitebalance
  label: Camera TriggerWhitebalance
  kind: action
  command: "xCommand Camera TriggerWhitebalance"
- id: xcommand_cameras_background_set
  label: Cameras Background Set
  kind: action
  command: "xCommand Cameras Background Set"
- id: xcommand_cameras_background_upload
  label: Cameras Background Upload
  kind: action
  command: "xCommand Cameras Background Upload"
- id: xcommand_cameras_presentertrack_clearposition
  label: Cameras PresenterTrack ClearPosition
  kind: action
  command: "xCommand Cameras PresenterTrack ClearPosition"
- id: xcommand_cameras_presentertrack_set
  label: Cameras PresenterTrack Set
  kind: action
  command: "xCommand Cameras PresenterTrack Set"
- id: xcommand_cameras_presentertrack_storeposition
  label: Cameras PresenterTrack StorePosition
  kind: action
  command: "xCommand Cameras PresenterTrack StorePosition"
- id: xcommand_cameras_speakertrack_activate
  label: Cameras SpeakerTrack Activate
  kind: action
  command: "xCommand Cameras SpeakerTrack Activate"
- id: xcommand_cameras_speakertrack_deactivate
  label: Cameras SpeakerTrack Deactivate
  kind: action
  command: "xCommand Cameras SpeakerTrack Deactivate"
- id: xcommand_cameras_speakertrack_backgroundmode_activate
  label: Cameras SpeakerTrack BackgroundMode Activate
  kind: action
  command: "xCommand Cameras SpeakerTrack BackgroundMode Activate"
- id: xcommand_cameras_speakertrack_backgroundmode_deactivate
  label: Cameras SpeakerTrack BackgroundMode Deactivate
  kind: action
  command: "xCommand Cameras SpeakerTrack BackgroundMode Deactivate"
- id: xcommand_cameras_speakertrack_diagnostics_start
  label: Cameras SpeakerTrack Diagnostics Start
  kind: action
  command: "xCommand Cameras SpeakerTrack Diagnostics Start"
- id: xcommand_cameras_speakertrack_diagnostics_stop
  label: Cameras SpeakerTrack Diagnostics Stop
  kind: action
  command: "xCommand Cameras SpeakerTrack Diagnostics Stop"
- id: xcommand_cameras_speakertrack_frames_activate
  label: Cameras SpeakerTrack Frames Activate
  kind: action
  command: "xCommand Cameras SpeakerTrack Frames Activate"
- id: xcommand_cameras_speakertrack_frames_deactivate
  label: Cameras SpeakerTrack Frames Deactivate
  kind: action
  command: "xCommand Cameras SpeakerTrack Frames Deactivate"
- id: xcommand_cameras_speakertrack_viewlimits_activate
  label: Cameras SpeakerTrack ViewLimits Activate
  kind: action
  command: "xCommand Cameras SpeakerTrack ViewLimits Activate"
- id: xcommand_cameras_speakertrack_viewlimits_deactivate
  label: Cameras SpeakerTrack ViewLimits Deactivate
  kind: action
  command: "xCommand Cameras SpeakerTrack ViewLimits Deactivate"
- id: xcommand_cameras_speakertrack_viewlimits_storeposition
  label: Cameras SpeakerTrack ViewLimits StorePosition
  kind: action
  command: "xCommand Cameras SpeakerTrack ViewLimits StorePosition"
- id: xcommand_cameras_speakertrack_whiteboard_activateposition
  label: Cameras SpeakerTrack Whiteboard ActivatePosition
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard ActivatePosition"
- id: xcommand_cameras_speakertrack_whiteboard_alignposition
  label: Cameras SpeakerTrack Whiteboard AlignPosition
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard AlignPosition"
- id: xcommand_cameras_speakertrack_whiteboard_setdistance
  label: Cameras SpeakerTrack Whiteboard SetDistance
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard SetDistance"
- id: xcommand_cameras_speakertrack_whiteboard_storeposition
  label: Cameras SpeakerTrack Whiteboard StorePosition
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard StorePosition"

# === Conference ===
- id: xcommand_conference_admitall
  label: Conference AdmitAll
  kind: action
  command: "xCommand Conference AdmitAll"
- id: xcommand_conference_call_authenticationresponse
  label: Conference Call AuthenticationResponse
  kind: action
  command: "xCommand Conference Call AuthenticationResponse"
- id: xcommand_conference_donotdisturb_activate
  label: Conference DoNotDisturb Activate
  kind: action
  command: "xCommand Conference DoNotDisturb Activate"
- id: xcommand_conference_donotdisturb_deactivate
  label: Conference DoNotDisturb Deactivate
  kind: action
  command: "xCommand Conference DoNotDisturb Deactivate"
- id: xcommand_conference_endmeeting
  label: Conference EndMeeting
  kind: action
  command: "xCommand Conference EndMeeting"
- id: xcommand_conference_hand_lower
  label: Conference Hand Lower
  kind: action
  command: "xCommand Conference Hand Lower"
- id: xcommand_conference_hand_raise
  label: Conference Hand Raise
  kind: action
  command: "xCommand Conference Hand Raise"
- id: xcommand_conference_hardmute
  label: Conference HardMute
  kind: action
  command: "xCommand Conference HardMute"
- id: xcommand_conference_lock
  label: Conference Lock
  kind: action
  command: "xCommand Conference Lock"
- id: xcommand_conference_lowerallhands
  label: Conference LowerAllHands
  kind: action
  command: "xCommand Conference LowerAllHands"
- id: xcommand_conference_meetingassistant_start
  label: Conference MeetingAssistant Start
  kind: action
  command: "xCommand Conference MeetingAssistant Start"
- id: xcommand_conference_meetingassistant_stop
  label: Conference MeetingAssistant Stop
  kind: action
  command: "xCommand Conference MeetingAssistant Stop"
- id: xcommand_conference_meetingchatnotifications_default
  label: Conference MeetingChatNotifications Default
  kind: action
  command: "xCommand Conference MeetingChatNotifications Default"
- id: xcommand_conference_meetingchatnotifications_incall
  label: Conference MeetingChatNotifications InCall
  kind: action
  command: "xCommand Conference MeetingChatNotifications InCall"
- id: xcommand_conference_muteall
  label: Conference MuteAll
  kind: action
  command: "xCommand Conference MuteAll"
- id: xcommand_conference_muteonentry
  label: Conference MuteOnEntry
  kind: action
  command: "xCommand Conference MuteOnEntry"
- id: xcommand_conference_participant_add
  label: Conference Participant Add
  kind: action
  command: "xCommand Conference Participant Add"
- id: xcommand_conference_participant_admit
  label: Conference Participant Admit
  kind: action
  command: "xCommand Conference Participant Admit"
- id: xcommand_conference_participant_disconnect
  label: Conference Participant Disconnect
  kind: action
  command: "xCommand Conference Participant Disconnect"
- id: xcommand_conference_participant_lowerhand
  label: Conference Participant LowerHand
  kind: action
  command: "xCommand Conference Participant LowerHand"
- id: xcommand_conference_participant_mute
  label: Conference Participant Mute
  kind: action
  command: "xCommand Conference Participant Mute"
- id: xcommand_conference_participantlist_search
  label: Conference ParticipantList Search
  kind: query
  command: "xCommand Conference ParticipantList Search"
- id: xcommand_conference_peoplefocus_activate
  label: Conference PeopleFocus Activate
  kind: action
  command: "xCommand Conference PeopleFocus Activate"
- id: xcommand_conference_peoplefocus_deactivate
  label: Conference PeopleFocus Deactivate
  kind: action
  command: "xCommand Conference PeopleFocus Deactivate"
- id: xcommand_conference_reaction_disable
  label: Conference Reaction Disable
  kind: action
  command: "xCommand Conference Reaction Disable"
- id: xcommand_conference_reaction_enable
  label: Conference Reaction Enable
  kind: action
  command: "xCommand Conference Reaction Enable"
- id: xcommand_conference_reaction_send
  label: Conference Reaction Send
  kind: action
  command: "xCommand Conference Reaction Send"
- id: xcommand_conference_recording_pause
  label: Conference Recording Pause
  kind: action
  command: "xCommand Conference Recording Pause"
- id: xcommand_conference_recording_resume
  label: Conference Recording Resume
  kind: action
  command: "xCommand Conference Recording Resume"
- id: xcommand_conference_recording_start
  label: Conference Recording Start
  kind: action
  command: "xCommand Conference Recording Start"
- id: xcommand_conference_recording_stop
  label: Conference Recording Stop
  kind: action
  command: "xCommand Conference Recording Stop"
- id: xcommand_conference_skintone
  label: Conference SkinTone
  kind: action
  command: "xCommand Conference SkinTone"
- id: xcommand_conference_speakerlock_release
  label: Conference SpeakerLock Release
  kind: action
  command: "xCommand Conference SpeakerLock Release"
- id: xcommand_conference_speakerlock_set
  label: Conference SpeakerLock Set
  kind: action
  command: "xCommand Conference SpeakerLock Set"
- id: xcommand_conference_transferhostandleave
  label: Conference TransferHostAndLeave
  kind: action
  command: "xCommand Conference TransferHostAndLeave"
- id: xcommand_diagnostics_run
  label: Diagnostics Run
  kind: action
  command: "xCommand Diagnostics Run"
- id: xcommand_gpio_manualstate_set
  label: GPIO ManualState Set
  kind: action
  command: "xCommand GPIO ManualState Set"

# === HttpClient ===
- id: xcommand_httpclient_allow_hostname_add
  label: HttpClient Allow Hostname Add
  kind: action
  command: "xCommand HttpClient Allow Hostname Add"
- id: xcommand_httpclient_allow_hostname_clear
  label: HttpClient Allow Hostname Clear
  kind: action
  command: "xCommand HttpClient Allow Hostname Clear"
- id: xcommand_httpclient_allow_hostname_list
  label: HttpClient Allow Hostname List
  kind: query
  command: "xCommand HttpClient Allow Hostname List"
- id: xcommand_httpclient_allow_hostname_remove
  label: HttpClient Allow Hostname Remove
  kind: action
  command: "xCommand HttpClient Allow Hostname Remove"
- id: xcommand_httpclient_delete
  label: HttpClient Delete
  kind: action
  command: "xCommand HttpClient Delete"
- id: xcommand_httpclient_get
  label: HttpClient Get
  kind: action
  command: "xCommand HttpClient Get"
- id: xcommand_httpclient_patch
  label: HttpClient Patch
  kind: action
  command: "xCommand HttpClient Patch"
- id: xcommand_httpclient_post
  label: HttpClient Post
  kind: action
  command: "xCommand HttpClient Post"
- id: xcommand_httpclient_put
  label: HttpClient Put
  kind: action
  command: "xCommand HttpClient Put"

# === HttpFeedback ===
- id: xcommand_httpfeedback_deregister
  label: HttpFeedback Deregister
  kind: action
  command: "xCommand HttpFeedback Deregister"
- id: xcommand_httpfeedback_enable
  label: HttpFeedback Enable
  kind: action
  command: "xCommand HttpFeedback Enable"
- id: xcommand_httpfeedback_register
  label: HttpFeedback Register
  kind: action
  command: "xCommand HttpFeedback Register FeedbackSlot: {slot} ServerUrl: {url} Format: {format}"
  params:
    - name: slot
      type: integer
      description: FeedbackSlot 1..4
    - name: url
      type: string
      description: HTTP(S) server URL to receive POSTs
    - name: format
      type: enum
      values: [XML, JSON]

# === Logging ===
- id: xcommand_logging_addevent
  label: Logging AddEvent
  kind: action
  command: "xCommand Logging AddEvent"
- id: xcommand_logging_extendedlogging_start
  label: Logging ExtendedLogging Start
  kind: action
  command: "xCommand Logging ExtendedLogging Start"
- id: xcommand_logging_extendedlogging_stop
  label: Logging ExtendedLogging Stop
  kind: action
  command: "xCommand Logging ExtendedLogging Stop"
- id: xcommand_logging_sendlogs
  label: Logging SendLogs
  kind: action
  command: "xCommand Logging SendLogs"

# === Macros ===
- id: xcommand_macros_log_clear
  label: Macros Log Clear
  kind: action
  command: "xCommand Macros Log Clear"
- id: xcommand_macros_log_get
  label: Macros Log Get
  kind: query
  command: "xCommand Macros Log Get"
- id: xcommand_macros_macro_activate
  label: Macros Macro Activate
  kind: action
  command: "xCommand Macros Macro Activate"
- id: xcommand_macros_macro_deactivate
  label: Macros Macro Deactivate
  kind: action
  command: "xCommand Macros Macro Deactivate"
- id: xcommand_macros_macro_get
  label: Macros Macro Get
  kind: query
  command: "xCommand Macros Macro Get"
- id: xcommand_macros_macro_remove
  label: Macros Macro Remove
  kind: action
  command: "xCommand Macros Macro Remove"
- id: xcommand_macros_macro_removeall
  label: Macros Macro RemoveAll
  kind: action
  command: "xCommand Macros Macro RemoveAll"
- id: xcommand_macros_macro_rename
  label: Macros Macro Rename
  kind: action
  command: "xCommand Macros Macro Rename"
- id: xcommand_macros_macro_roles_set
  label: Macros Macro Roles Set
  kind: action
  command: "xCommand Macros Macro Roles Set"
- id: xcommand_macros_macro_save
  label: Macros Macro Save
  kind: action
  command: "xCommand Macros Macro Save"
- id: xcommand_macros_runtime_restart
  label: Macros Runtime Restart
  kind: action
  command: "xCommand Macros Runtime Restart"
- id: xcommand_macros_runtime_start
  label: Macros Runtime Start
  kind: action
  command: "xCommand Macros Runtime Start"
- id: xcommand_macros_runtime_status
  label: Macros Runtime Status
  kind: query
  command: "xCommand Macros Runtime Status"
- id: xcommand_macros_runtime_stop
  label: Macros Runtime Stop
  kind: action
  command: "xCommand Macros Runtime Stop"

# === Message ===
- id: xcommand_message_send
  label: Message Send
  kind: action
  command: "xCommand Message Send"

# === Network ===
- id: xcommand_network_smtp_verifyconfig
  label: Network SMTP VerifyConfig
  kind: action
  command: "xCommand Network SMTP VerifyConfig"
- id: xcommand_network_snmp_usm_user_add
  label: Network SNMP USM User Add
  kind: action
  command: "xCommand Network SNMP USM User Add"
- id: xcommand_network_snmp_usm_user_delete
  label: Network SNMP USM User Delete
  kind: action
  command: "xCommand Network SNMP USM User Delete"
- id: xcommand_network_snmp_usm_user_list
  label: Network SNMP USM User List
  kind: query
  command: "xCommand Network SNMP USM User List"
- id: xcommand_network_wifi_configure
  label: Network Wifi Configure
  kind: action
  command: "xCommand Network Wifi Configure"
- id: xcommand_network_wifi_delete
  label: Network Wifi Delete
  kind: action
  command: "xCommand Network Wifi Delete"
- id: xcommand_network_wifi_list
  label: Network Wifi List
  kind: query
  command: "xCommand Network Wifi List"
- id: xcommand_network_wifi_scan_start
  label: Network Wifi Scan Start
  kind: action
  command: "xCommand Network Wifi Scan Start"
- id: xcommand_network_wifi_scan_stop
  label: Network Wifi Scan Stop
  kind: action
  command: "xCommand Network Wifi Scan Stop"

# === Peripherals ===
- id: xcommand_peripherals_connect
  label: Peripherals Connect
  kind: action
  command: "xCommand Peripherals Connect"
- id: xcommand_peripherals_heartbeat
  label: Peripherals HeartBeat
  kind: action
  command: "xCommand Peripherals HeartBeat"
- id: xcommand_peripherals_list
  label: Peripherals List
  kind: query
  command: "xCommand Peripherals List"
- id: xcommand_peripherals_pairing_pair
  label: Peripherals Pairing Pair
  kind: action
  command: "xCommand Peripherals Pairing Pair"
- id: xcommand_peripherals_pairing_pinpairing_start
  label: Peripherals Pairing PinPairing Start
  kind: action
  command: "xCommand Peripherals Pairing PinPairing Start"
- id: xcommand_peripherals_pairing_pinpairing_stop
  label: Peripherals Pairing PinPairing Stop
  kind: action
  command: "xCommand Peripherals Pairing PinPairing Stop"
- id: xcommand_peripherals_pairing_unpair
  label: Peripherals Pairing Unpair
  kind: action
  command: "xCommand Peripherals Pairing Unpair"
- id: xcommand_peripherals_purge
  label: Peripherals Purge
  kind: action
  command: "xCommand Peripherals Purge"
- id: xcommand_peripherals_touchpanel_configure
  label: Peripherals TouchPanel Configure
  kind: action
  command: "xCommand Peripherals TouchPanel Configure"

# === Phonebook ===
- id: xcommand_phonebook_contact_add
  label: Phonebook Contact Add
  kind: action
  command: "xCommand Phonebook Contact Add"
- id: xcommand_phonebook_contact_delete
  label: Phonebook Contact Delete
  kind: action
  command: "xCommand Phonebook Contact Delete"
- id: xcommand_phonebook_contact_modify
  label: Phonebook Contact Modify
  kind: action
  command: "xCommand Phonebook Contact Modify"
- id: xcommand_phonebook_contactmethod_add
  label: Phonebook ContactMethod Add
  kind: action
  command: "xCommand Phonebook ContactMethod Add"
- id: xcommand_phonebook_contactmethod_delete
  label: Phonebook ContactMethod Delete
  kind: action
  command: "xCommand Phonebook ContactMethod Delete"
- id: xcommand_phonebook_contactmethod_modify
  label: Phonebook ContactMethod Modify
  kind: action
  command: "xCommand Phonebook ContactMethod Modify"
- id: xcommand_phonebook_folder_add
  label: Phonebook Folder Add
  kind: action
  command: "xCommand Phonebook Folder Add"
- id: xcommand_phonebook_folder_delete
  label: Phonebook Folder Delete
  kind: action
  command: "xCommand Phonebook Folder Delete"
- id: xcommand_phonebook_folder_modify
  label: Phonebook Folder Modify
  kind: action
  command: "xCommand Phonebook Folder Modify"
- id: xcommand_phonebook_search
  label: Phonebook Search
  kind: query
  command: "xCommand Phonebook Search"

# === Presentation ===
- id: xcommand_presentation_start
  label: Presentation Start
  kind: action
  command: "xCommand Presentation Start"
- id: xcommand_presentation_stop
  label: Presentation Stop
  kind: action
  command: "xCommand Presentation Stop"

# === Provisioning ===
- id: xcommand_provisioning_completeupgrade
  label: Provisioning CompleteUpgrade
  kind: action
  command: "xCommand Provisioning CompleteUpgrade"
- id: xcommand_provisioning_postponeupgrade
  label: Provisioning PostponeUpgrade
  kind: action
  command: "xCommand Provisioning PostponeUpgrade"
- id: xcommand_provisioning_cucm_extensionmobility_login
  label: Provisioning CUCM ExtensionMobility Login
  kind: action
  command: "xCommand Provisioning CUCM ExtensionMobility Login"
- id: xcommand_provisioning_cucm_extensionmobility_logout
  label: Provisioning CUCM ExtensionMobility Logout
  kind: action
  command: "xCommand Provisioning CUCM ExtensionMobility Logout"
- id: xcommand_provisioning_roomtype_activate
  label: Provisioning RoomType Activate
  kind: action
  command: "xCommand Provisioning RoomType Activate"
- id: xcommand_provisioning_service_fetch
  label: Provisioning Service Fetch
  kind: action
  command: "xCommand Provisioning Service Fetch"

# === Proximity ===
- id: xcommand_proximity_services_activate
  label: Proximity Services Activate
  kind: action
  command: "xCommand Proximity Services Activate"
- id: xcommand_proximity_services_deactivate
  label: Proximity Services Deactivate
  kind: action
  command: "xCommand Proximity Services Deactivate"

# === RoomCleanup ===
- id: xcommand_roomcleanup_cancel
  label: RoomCleanup Cancel
  kind: action
  command: "xCommand RoomCleanup Cancel"
- id: xcommand_roomcleanup_run
  label: RoomCleanup Run
  kind: action
  command: "xCommand RoomCleanup Run"

# === RoomPreset ===
- id: xcommand_roompreset_activate
  label: RoomPreset Activate
  kind: action
  command: "xCommand RoomPreset Activate"
- id: xcommand_roompreset_clear
  label: RoomPreset Clear
  kind: action
  command: "xCommand RoomPreset Clear"
- id: xcommand_roompreset_store
  label: RoomPreset Store
  kind: action
  command: "xCommand RoomPreset Store"

# === Security ===
- id: xcommand_security_certificates_ca_add
  label: Security Certificates CA Add
  kind: action
  command: "xCommand Security Certificates CA Add"
- id: xcommand_security_certificates_ca_delete
  label: Security Certificates CA Delete
  kind: action
  command: "xCommand Security Certificates CA Delete"
- id: xcommand_security_certificates_ca_show
  label: Security Certificates CA Show
  kind: query
  command: "xCommand Security Certificates CA Show"
- id: xcommand_security_certificates_cucm_ctl_delete
  label: Security Certificates CUCM CTL Delete
  kind: action
  command: "xCommand Security Certificates CUCM CTL Delete"
- id: xcommand_security_certificates_cucm_ctl_show
  label: Security Certificates CUCM CTL Show
  kind: query
  command: "xCommand Security Certificates CUCM CTL Show"
- id: xcommand_security_certificates_cucm_itl_show
  label: Security Certificates CUCM ITL Show
  kind: query
  command: "xCommand Security Certificates CUCM ITL Show"
- id: xcommand_security_certificates_cucm_mic_show
  label: Security Certificates CUCM MIC Show
  kind: query
  command: "xCommand Security Certificates CUCM MIC Show"
- id: xcommand_security_certificates_services_activate
  label: Security Certificates Services Activate
  kind: action
  command: "xCommand Security Certificates Services Activate"
- id: xcommand_security_certificates_services_add
  label: Security Certificates Services Add
  kind: action
  command: "xCommand Security Certificates Services Add"
- id: xcommand_security_certificates_services_deactivate
  label: Security Certificates Services Deactivate
  kind: action
  command: "xCommand Security Certificates Services Deactivate"
- id: xcommand_security_certificates_services_delete
  label: Security Certificates Services Delete
  kind: action
  command: "xCommand Security Certificates Services Delete"
- id: xcommand_security_certificates_services_show
  label: Security Certificates Services Show
  kind: query
  command: "xCommand Security Certificates Services Show"
- id: xcommand_security_certificates_thirdparty_disable
  label: Security Certificates ThirdParty Disable
  kind: action
  command: "xCommand Security Certificates ThirdParty Disable"
- id: xcommand_security_certificates_thirdparty_enable
  label: Security Certificates ThirdParty Enable
  kind: action
  command: "xCommand Security Certificates ThirdParty Enable"
- id: xcommand_security_certificates_thirdparty_list
  label: Security Certificates ThirdParty List
  kind: query
  command: "xCommand Security Certificates ThirdParty List"
- id: xcommand_security_certificates_thirdparty_show
  label: Security Certificates ThirdParty Show
  kind: query
  command: "xCommand Security Certificates ThirdParty Show"
- id: xcommand_security_certificates_webex_show
  label: Security Certificates Webex Show
  kind: query
  command: "xCommand Security Certificates Webex Show"
- id: xcommand_security_certificates_webexidentity_show
  label: Security Certificates WebexIdentity Show
  kind: query
  command: "xCommand Security Certificates WebexIdentity Show"
- id: xcommand_security_ciphers_list
  label: Security Ciphers List
  kind: query
  command: "xCommand Security Ciphers List"
- id: xcommand_security_clientsecret_populate
  label: Security ClientSecret Populate
  kind: action
  command: "xCommand Security ClientSecret Populate"
- id: xcommand_security_persistency
  label: Security Persistency
  kind: action
  command: "xCommand Security Persistency"
- id: xcommand_security_session_get
  label: Security Session Get
  kind: query
  command: "xCommand Security Session Get"
- id: xcommand_security_session_list
  label: Security Session List
  kind: query
  command: "xCommand Security Session List"
- id: xcommand_security_session_terminate
  label: Security Session Terminate
  kind: action
  command: "xCommand Security Session Terminate"

# === Standby ===
- id: xcommand_standby_activate
  label: Standby Activate
  kind: action
  command: "xCommand Standby Activate"
- id: xcommand_standby_deactivate
  label: Standby Deactivate
  kind: action
  command: "xCommand Standby Deactivate"
- id: xcommand_standby_halfwake
  label: Standby Halfwake
  kind: action
  command: "xCommand Standby Halfwake"
- id: xcommand_standby_resethalwaketimer
  label: Standby ResetHalfwakeTimer
  kind: action
  command: "xCommand Standby ResetHalfwakeTimer"
- id: xcommand_standby_resettimer
  label: Standby ResetTimer
  kind: action
  command: "xCommand Standby ResetTimer"

# === SystemUnit ===
- id: xcommand_systemunit_boot
  label: SystemUnit Boot
  kind: action
  command: "xCommand SystemUnit Boot"
- id: xcommand_systemunit_developerpreview_activate
  label: SystemUnit DeveloperPreview Activate
  kind: action
  command: "xCommand SystemUnit DeveloperPreview Activate"
- id: xcommand_systemunit_developerpreview_deactivate
  label: SystemUnit DeveloperPreview Deactivate
  kind: action
  command: "xCommand SystemUnit DeveloperPreview Deactivate"
- id: xcommand_systemunit_factoryreset
  label: SystemUnit FactoryReset
  kind: action
  command: "xCommand SystemUnit FactoryReset"
- id: xcommand_systemunit_firsttimewizard_stop
  label: SystemUnit FirstTimeWizard Stop
  kind: action
  command: "xCommand SystemUnit FirstTimeWizard Stop"
- id: xcommand_systemunit_notifications_removeall
  label: SystemUnit Notifications RemoveAll
  kind: action
  command: "xCommand SystemUnit Notifications RemoveAll"
- id: xcommand_systemunit_optionkey_add
  label: SystemUnit OptionKey Add
  kind: action
  command: "xCommand SystemUnit OptionKey Add"
- id: xcommand_systemunit_optionkey_list
  label: SystemUnit OptionKey List
  kind: query
  command: "xCommand SystemUnit OptionKey List"
- id: xcommand_systemunit_optionkey_remove
  label: SystemUnit OptionKey Remove
  kind: action
  command: "xCommand SystemUnit OptionKey Remove"
- id: xcommand_systemunit_optionkey_removeall
  label: SystemUnit OptionKey RemoveAll
  kind: action
  command: "xCommand SystemUnit OptionKey RemoveAll"
- id: xcommand_systemunit_productplatform_set
  label: SystemUnit ProductPlatform Set
  kind: action
  command: "xCommand SystemUnit ProductPlatform Set"
- id: xcommand_systemunit_signinbanner_clear
  label: SystemUnit SignInBanner Clear
  kind: action
  command: "xCommand SystemUnit SignInBanner Clear"
- id: xcommand_systemunit_signinbanner_get
  label: SystemUnit SignInBanner Get
  kind: query
  command: "xCommand SystemUnit SignInBanner Get"
- id: xcommand_systemunit_signinbanner_set
  label: SystemUnit SignInBanner Set
  kind: action
  command: "xCommand SystemUnit SignInBanner Set"
- id: xcommand_systemunit_softreset
  label: SystemUnit SoftReset
  kind: action
  command: "xCommand SystemUnit SoftReset"
- id: xcommand_systemunit_softwareupgrade
  label: SystemUnit SoftwareUpgrade
  kind: action
  command: "xCommand SystemUnit SoftwareUpgrade"
- id: xcommand_systemunit_welcomebanner_clear
  label: SystemUnit WelcomeBanner Clear
  kind: action
  command: "xCommand SystemUnit WelcomeBanner Clear"
- id: xcommand_systemunit_welcomebanner_get
  label: SystemUnit WelcomeBanner Get
  kind: query
  command: "xCommand SystemUnit WelcomeBanner Get"
- id: xcommand_systemunit_welcomebanner_set
  label: SystemUnit WelcomeBanner Set
  kind: action
  command: "xCommand SystemUnit WelcomeBanner Set"

# === Time ===
- id: xcommand_time_datetime_get
  label: Time DateTime Get
  kind: query
  command: "xCommand Time DateTime Get"
- id: xcommand_time_datetime_set
  label: Time DateTime Set
  kind: action
  command: "xCommand Time DateTime Set"

# === UserInterface ===
- id: xcommand_userinterface_branding_clear
  label: UserInterface Branding Clear
  kind: action
  command: "xCommand UserInterface Branding Clear"
- id: xcommand_userinterface_branding_delete
  label: UserInterface Branding Delete
  kind: action
  command: "xCommand UserInterface Branding Delete"
- id: xcommand_userinterface_branding_fetch
  label: UserInterface Branding Fetch
  kind: action
  command: "xCommand UserInterface Branding Fetch"
- id: xcommand_userinterface_branding_get
  label: UserInterface Branding Get
  kind: query
  command: "xCommand UserInterface Branding Get"
- id: xcommand_userinterface_branding_updated
  label: UserInterface Branding Updated
  kind: action
  command: "xCommand UserInterface Branding Updated"
- id: xcommand_userinterface_branding_upload
  label: UserInterface Branding Upload
  kind: action
  command: "xCommand UserInterface Branding Upload"
- id: xcommand_userinterface_extensions_clear
  label: UserInterface Extensions Clear
  kind: action
  command: "xCommand UserInterface Extensions Clear"
- id: xcommand_userinterface_extensions_export
  label: UserInterface Extensions Export
  kind: action
  command: "xCommand UserInterface Extensions Export"
- id: xcommand_userinterface_extensions_list
  label: UserInterface Extensions List
  kind: query
  command: "xCommand UserInterface Extensions List"
- id: xcommand_userinterface_extensions_set
  label: UserInterface Extensions Set
  kind: action
  command: "xCommand UserInterface Extensions Set"
- id: xcommand_userinterface_extensions_panel_clicked
  label: UserInterface Extensions Panel Clicked
  kind: action
  command: "xCommand UserInterface Extensions Panel Clicked"
- id: xcommand_userinterface_extensions_panel_open
  label: UserInterface Extensions Panel Open
  kind: action
  command: "xCommand UserInterface Extensions Panel Open"
- id: xcommand_userinterface_extensions_panel_close
  label: UserInterface Extensions Panel Close
  kind: action
  command: "xCommand UserInterface Extensions Panel Close"
- id: xcommand_userinterface_message_prompt_display
  label: UserInterface Message Prompt Display
  kind: action
  command: "xCommand UserInterface Message Prompt Display"
- id: xcommand_userinterface_message_prompt_response
  label: UserInterface Message Prompt Response
  kind: action
  command: "xCommand UserInterface Message Prompt Response"
- id: xcommand_userinterface_message_rating_display
  label: UserInterface Message Rating Display
  kind: action
  command: "xCommand UserInterface Message Rating Display"
- id: xcommand_userinterface_message_textinput_display
  label: UserInterface Message TextInput Display
  kind: action
  command: "xCommand UserInterface Message TextInput Display"
- id: xcommand_userinterface_message_textline_display
  label: UserInterface Message TextLine Display
  kind: action
  command: "xCommand UserInterface Message TextLine Display"
- id: xcommand_userinterface_presentation_autoshare_showalert
  label: UserInterface Presentation AutoShare ShowAlert
  kind: action
  command: "xCommand UserInterface Presentation AutoShare ShowAlert"
- id: xcommand_userinterface_presentation_externalsource_add
  label: UserInterface Presentation ExternalSource Add
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource Add"
- id: xcommand_userinterface_presentation_externalsource_list
  label: UserInterface Presentation ExternalSource List
  kind: query
  command: "xCommand UserInterface Presentation ExternalSource List"
- id: xcommand_userinterface_presentation_externalsource_remove
  label: UserInterface Presentation ExternalSource Remove
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource Remove"
- id: xcommand_userinterface_presentation_externalsource_select
  label: UserInterface Presentation ExternalSource Select
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource Select"
- id: xcommand_userinterface_translation_override_set
  label: UserInterface Translation Override Set
  kind: action
  command: "xCommand UserInterface Translation Override Set"
- id: xcommand_userinterface_webview_display
  label: UserInterface WebView Display
  kind: action
  command: "xCommand UserInterface WebView Display"

# === UserManagement ===
- id: xcommand_usermanagement_user_add
  label: UserManagement User Add
  kind: action
  command: "xCommand UserManagement User Add"
- id: xcommand_usermanagement_user_delete
  label: UserManagement User Delete
  kind: action
  command: "xCommand UserManagement User Delete"
- id: xcommand_usermanagement_user_get
  label: UserManagement User Get
  kind: query
  command: "xCommand UserManagement User Get"
- id: xcommand_usermanagement_user_list
  label: UserManagement User List
  kind: query
  command: "xCommand UserManagement User List"
- id: xcommand_usermanagement_user_modify
  label: UserManagement User Modify
  kind: action
  command: "xCommand UserManagement User Modify"
- id: xcommand_usermanagement_user_passphrase_change
  label: UserManagement User Passphrase Change
  kind: action
  command: "xCommand UserManagement User Passphrase Change"
- id: xcommand_usermanagement_user_passphrase_set
  label: UserManagement User Passphrase Set
  kind: action
  command: "xCommand UserManagement User Passphrase Set"
- id: xcommand_usermanagement_user_unblock
  label: UserManagement User Unblock
  kind: action
  command: "xCommand UserManagement User Unblock"

# === UserPresence ===
- id: xcommand_userpresence_customstatus_clear
  label: UserPresence CustomStatus Clear
  kind: action
  command: "xCommand UserPresence CustomStatus Clear"
- id: xcommand_userpresence_customstatus_set
  label: UserPresence CustomStatus Set
  kind: action
  command: "xCommand UserPresence CustomStatus Set"

# === Video ===
- id: xcommand_video_activespeakerpip_set
  label: Video ActiveSpeakerPIP Set
  kind: action
  command: "xCommand Video ActiveSpeakerPIP Set"
- id: xcommand_video_cec_input_keyclick
  label: Video CEC Input KeyClick
  kind: action
  command: "xCommand Video CEC Input KeyClick"
- id: xcommand_video_cec_output_keyclick
  label: Video CEC Output KeyClick
  kind: action
  command: "xCommand Video CEC Output KeyClick"
- id: xcommand_video_cec_output_sendactivesourcerequest
  label: Video CEC Output SendActiveSourceRequest
  kind: action
  command: "xCommand Video CEC Output SendActiveSourceRequest"
- id: xcommand_video_cec_output_sendinactivesourcerequest
  label: Video CEC Output SendInactiveSourceRequest
  kind: action
  command: "xCommand Video CEC Output SendInactiveSourceRequest"
- id: xcommand_video_graphics_clear
  label: Video Graphics Clear
  kind: action
  command: "xCommand Video Graphics Clear"
- id: xcommand_video_graphics_text_display
  label: Video Graphics Text Display
  kind: action
  command: "xCommand Video Graphics Text Display"
- id: xcommand_video_input_mainvideo_mute
  label: Video Input MainVideo Mute
  kind: action
  command: "xCommand Video Input MainVideo Mute"
- id: xcommand_video_input_mainvideo_unmute
  label: Video Input MainVideo Unmute
  kind: action
  command: "xCommand Video Input MainVideo Unmute"
- id: xcommand_video_input_setmainvideosource
  label: Video Input SetMainVideoSource
  kind: action
  command: "xCommand Video Input SetMainVideoSource"
- id: xcommand_video_layout_hidenonvideo_activate
  label: Video Layout HideNonVideo Activate
  kind: action
  command: "xCommand Video Layout HideNonVideo Activate"
- id: xcommand_video_layout_hidenonvideo_deactivate
  label: Video Layout HideNonVideo Deactivate
  kind: action
  command: "xCommand Video Layout HideNonVideo Deactivate"
- id: xcommand_video_layout_layoutfamily_set
  label: Video Layout LayoutFamily Set
  kind: action
  command: "xCommand Video Layout LayoutFamily Set"
- id: xcommand_video_layout_setlayout
  label: Video Layout SetLayout
  kind: action
  command: "xCommand Video Layout SetLayout"
- id: xcommand_video_matrix_assign
  label: Video Matrix Assign
  kind: action
  command: "xCommand Video Matrix Assign"
- id: xcommand_video_matrix_reset
  label: Video Matrix Reset
  kind: action
  command: "xCommand Video Matrix Reset"
- id: xcommand_video_matrix_swap
  label: Video Matrix Swap
  kind: action
  command: "xCommand Video Matrix Swap"
- id: xcommand_video_matrix_unassign
  label: Video Matrix Unassign
  kind: action
  command: "xCommand Video Matrix Unassign"
- id: xcommand_video_output_hdmi_passthrough_start
  label: Video Output HDMI Passthrough Start
  kind: action
  command: "xCommand Video Output HDMI Passthrough Start"
- id: xcommand_video_output_hdmi_passthrough_stop
  label: Video Output HDMI Passthrough Stop
  kind: action
  command: "xCommand Video Output HDMI Passthrough Stop"
- id: xcommand_video_output_monitor_backlight_set
  label: Video Output Monitor Backlight Set
  kind: action
  command: "xCommand Video Output Monitor Backlight Set"
- id: xcommand_video_output_monitor_color_select
  label: Video Output Monitor Color Select
  kind: action
  command: "xCommand Video Output Monitor Color Select"
- id: xcommand_video_output_monitor_reset
  label: Video Output Monitor Reset
  kind: action
  command: "xCommand Video Output Monitor Reset"
- id: xcommand_video_presentationpip_set
  label: Video PresentationPIP Set
  kind: action
  command: "xCommand Video PresentationPIP Set"
- id: xcommand_video_presentationview_set
  label: Video PresentationView Set
  kind: action
  command: "xCommand Video PresentationView Set"
- id: xcommand_video_selfview_set
  label: Video Selfview Set
  kind: action
  command: "xCommand Video Selfview Set"

# === WebEngine ===
- id: xcommand_webengine_deletestorage
  label: WebEngine DeleteStorage
  kind: action
  command: "xCommand WebEngine DeleteStorage"
- id: xcommand_webengine_logging_set
  label: WebEngine Logging Set
  kind: action
  command: "xCommand WebEngine Logging Set"
- id: xcommand_webengine_mediaaccess_add
  label: WebEngine MediaAccess Add
  kind: action
  command: "xCommand WebEngine MediaAccess Add"
- id: xcommand_webengine_mediaaccess_list
  label: WebEngine MediaAccess List
  kind: query
  command: "xCommand WebEngine MediaAccess List"
- id: xcommand_webengine_mediaaccess_remove
  label: WebEngine MediaAccess Remove
  kind: action
  command: "xCommand WebEngine MediaAccess Remove"
- id: xcommand_webengine_mediaaccess_removeall
  label: WebEngine MediaAccess RemoveAll
  kind: action
  command: "xCommand WebEngine MediaAccess RemoveAll"

# === Webex / WebRTC / Zoom ===
- id: xcommand_webex_join
  label: Webex Join
  kind: action
  command: "xCommand Webex Join"
- id: xcommand_webex_meetings_instantmeeting_start
  label: Webex Meetings InstantMeeting Start
  kind: action
  command: "xCommand Webex Meetings InstantMeeting Start"
- id: xcommand_webex_registration_cancel
  label: Webex Registration Cancel
  kind: action
  command: "xCommand Webex Registration Cancel"
- id: xcommand_webex_registration_start
  label: Webex Registration Start
  kind: action
  command: "xCommand Webex Registration Start"
- id: xcommand_webrtc_join
  label: WebRTC Join
  kind: action
  command: "xCommand WebRTC Join"
- id: xcommand_zoom_join
  label: Zoom Join
  kind: action
  command: "xCommand Zoom Join"

# === Top-level meta ===
- id: bye
  label: Close the CLI session
  kind: action
  command: "bye"
- id: help
  label: List top-level commands
  kind: query
  command: "?"
- id: echo_on
  label: Echo key inputs on the CLI
  kind: action
  command: "echo on"
- id: echo_off
  label: Suppress key input echo on the CLI
  kind: action
  command: "echo off"
- id: xfeedback_register
  label: Register a feedback expression
  kind: action
  command: "xFeedback register {path}"
  params:
    - name: path
      type: string
      description: "XPath expression under /Status, /Configuration, or /Event"
- id: xfeedback_deregister
  label: Deregister a feedback expression
  kind: action
  command: "xFeedback deregister {path}"
- id: xfeedback_list
  label: List registered feedback expressions
  kind: query
  command: "xFeedback list"
- id: xpreferences_outputmode
  label: Set CLI output mode
  kind: action
  command: "xPreferences outputmode {mode}"
  params:
    - name: mode
      type: enum
      values: [terminal, xml, json]
- id: xgetxml
  label: Retrieve XML/JSON document by path
  kind: query
  command: "xgetxml {path}"
  params:
    - name: path
      type: string
      description: "XPath under /Status, /Configuration, /Command, or /Valuespace"
```

## Feedbacks
```yaml
- id: audio_microphones_mute
  type: enum
  values: [On, Off]
  source: "xStatus Audio Microphones Mute"
- id: standby_active
  type: enum
  values: [On, Off]
  source: "xStatus Standby Active"
- id: systemunit_state_numberofactivecalls
  type: integer
  source: "xStatus SystemUnit State NumberOfActiveCalls"
- id: audio_volume
  type: integer
  range: [0, 100]
  source: "xStatus Audio Volume"
- id: audio_volumemute
  type: enum
  values: [On, Off]
  source: "xStatus Audio VolumeMute"
- id: video_input_mainvideomute
  type: enum
  values: [On, Off]
  source: "xStatus Video Input MainVideoMute"
- id: video_input_mainvideosource
  type: integer
  range: [1, n]
  source: "xStatus Video Input MainVideoSource"
- id: roomanalytics_peoplecount_current
  type: integer
  source: "xStatus RoomAnalytics PeopleCount Current"
- id: roomanalytics_peoplepresence
  type: enum
  values: [Yes, No, Unknown]
  source: "xStatus RoomAnalytics PeoplePresence"
- id: cameras_speakertrack_state
  type: enum
  values: [Inactive, Following, Background]
  source: "xStatus Cameras SpeakerTrack State"
- id: call_status
  type: enum
  values: [Connected, Disconnected, Connecting, Idle]
  source: "xStatus Call [n] Status"
- id: conference_donotdisturb
  type: enum
  values: [Active, Inactive]
  source: "xStatus Conference DoNotDisturb"
- id: conference_multipoint_mode
  type: enum
  values: [Auto, MultiSite, Off]
  source: "xStatus Conference Multipoint Mode"
- id: systemunit_software_version
  type: string
  source: "xStatus SystemUnit Software Version"
- id: systemunit_productid
  type: string
  source: "xStatus SystemUnit ProductId"
- id: systemunit_producttype
  type: string
  source: "xStatus SystemUnit ProductType"
```

## Events
```yaml
# Unsolicited events the device emits, prefixed with `*e` in the wire format.
# All examples below are from the source's "Events" section.
- id: outgoingcallindication
  label: Outgoing Call Indication
  wire_format: "*e OutgoingCallIndication CallId: {callId}"
  params:
    - name: callId
      type: integer
- id: calldisconnect
  label: Call Disconnect
  wire_format: "*e CallDisconnect CallId: {callId} CauseValue: {causeValue} CauseString: \"{causeString}\" CauseType: {causeType} OrigCallDirection: {direction}"
  params:
    - name: callId
      type: integer
    - name: causeValue
      type: integer
    - name: causeString
      type: string
    - name: causeType
      type: enum
      values: [LocalDisconnect, UnknownRemoteSite, LocalBusy, LocalReject, InsufficientSecurity, OtherRemote, RemoteDisconnect, RemoteBusy, RemoteRejected, RemoteNoAnswer, CallForwarded, NetworkRejected, OtherLocal]
    - name: direction
      type: enum
      values: [outgoing, incoming]
- id: callsuccessful
  label: Call Successful
  wire_format: "*e CallSuccessful CallId: {callId} Protocol: {protocol} Direction: {direction} CallRate: {rate} RemoteURI: {uri} EncryptionIn: {encIn} EncryptionOut: {encOut}"
  params:
    - name: callId
      type: integer
    - name: protocol
      type: string
    - name: direction
      type: enum
      values: [outgoing, incoming]
    - name: rate
      type: integer
      description: Call rate in kbps
    - name: uri
      type: string
    - name: encIn
      type: enum
      values: [On, Off]
    - name: encOut
      type: enum
      values: [On, Off]
- id: feccactionind
  label: FECC Action request
  wire_format: "*e FeccActionInd Id: {id} Req: {req} Pan: {pan} PanRight: {panRight} Tilt: {tilt} TiltUp: {tiltUp} Zoom: {zoom} ZoomIn: {zoomIn} Focus: {focus} FocusIn: {focusIn} Timeout: {timeout} VideoSrc: {videoSrc} m: {m}"
- id: tstring
  label: TString message received
  wire_format: "*e TString CallId: {callId} Message: \"{message}\""
  params:
    - name: callId
      type: integer
    - name: message
      type: string
- id: sstring
  label: SString message received
  wire_format: "*e SString String: \"{message}\" Id: {id}"
  params:
    - name: id
      type: integer
    - name: message
      type: string
```

## Variables
```yaml
# Settable device parameters reachable via xConfiguration. Listed by category.
# Each entry maps to a top-level xConfiguration setting enumerated in the source.
- id: audio_defaultvolume
  type: integer
  range: [0, 100]
  default: 50
  command: "xConfiguration Audio DefaultVolume: {value}"
- id: audio_input_arc_mode
  type: enum
  values: [Off, On]
  command: "xConfiguration Audio Input ARC [n] Mode: {value}"
- id: audio_input_hdmi_mode
  type: enum
  values: [Off, On]
  command: "xConfiguration Audio Input HDMI [n] Mode: {value}"
- id: audio_microphones_mute_enabled
  type: enum
  values: [Off, On]
  command: "xConfiguration Audio Microphones Mute Enabled: {value}"
- id: audio_input_microphonemode
  type: enum
  values: [Focused, Wide]
  default: Focused
  command: "xConfiguration Audio Input MicrophoneMode: {value}"
- id: cameras_speakertrack_mode
  type: enum
  values: [Auto, Off, On]
  command: "xConfiguration Cameras SpeakerTrack Mode: {value}"
- id: conference_defaultcall_protocol
  type: enum
  values: [H323, Sip, Spark]
  command: "xConfiguration Conference DefaultCall Protocol: {value}"
- id: conference_donotdisturb_defaulttimeout
  type: integer
  command: "xConfiguration Conference DoNotDisturb DefaultTimeout: {value}"
- id: conference_encryption_mode
  type: enum
  values: [Auto, Off, On]
  command: "xConfiguration Conference Encryption Mode: {value}"
- id: conference_maxreceivecallrate
  type: integer
  command: "xConfiguration Conference MaxReceiveCallRate: {value}"
- id: conference_maxtransmitcallrate
  type: integer
  command: "xConfiguration Conference MaxTransmitCallRate: {value}"
- id: networkservices_http_mode
  type: enum
  values: [Off, HTTP+HTTPS, HTTPS]
  command: "xConfiguration NetworkServices HTTP Mode: {value}"
- id: networkservices_ssh_mode
  type: enum
  values: [Off, On]
  command: "xConfiguration NetworkServices SSH Mode: {value}"
- id: networkservices_websocket
  type: enum
  values: [Off, FollowHTTPService]
  command: "xConfiguration NetworkServices Websocket: {value}"
- id: serialport_mode
  type: enum
  values: [Off, On]
  command: "xConfiguration SerialPort Mode: {value}"
- id: serialport_baudrate
  type: enum
  values: [9600, 19200, 38400, 57600, 115200]
  default: 115200
  command: "xConfiguration SerialPort BaudRate: {value}"
- id: serialport_loginrequired
  type: enum
  values: [Off, On]
  command: "xConfiguration SerialPort LoginRequired: {value}"
- id: standby_control
  type: enum
  values: [Off, On]
  command: "xConfiguration Standby Control: {value}"
- id: standby_delay
  type: integer
  command: "xConfiguration Standby Delay: {value}"
- id: systemunit_name
  type: string
  command: "xConfiguration SystemUnit Name: \"{value}\""
- id: video_defaultmainsource
  type: integer
  command: "xConfiguration Video DefaultMainSource: {value}"
- id: video_monitors
  type: integer
  command: "xConfiguration Video Monitors: {value}"
- id: voicecontrol_wakeword_mode
  type: enum
  values: [Off, On]
  command: "xConfiguration VoiceControl Wakeword Mode: {value}"
```

## Safety
```yaml
confirmation_required_for:
  - xcommand_systemunit_factoryreset
  - xcommand_systemunit_softreset
  - xcommand_callhistory_deleteall
  - xcommand_usermanagement_user_delete
  - xcommand_security_certificates_thirdparty_disable
interlocks: []
# UNRESOLVED: explicit interlock procedures (e.g. confirm-before-reboot) are not
# enumerated in the source beyond FactoryReset requiring ADMIN role.
```

## Notes
- The xAPI is a unified surface exposed identically over SSH, HTTP/HTTPS (XML/JSON), WebSocket (JSON-RPC), and RS-232. Output mode (`xPreferences outputmode`) controls the response wire format on terminal sessions; HTTP uses XML or JSON; WebSocket uses JSON-RPC.
- HTTP XMLAPI authentication is HTTP Basic with `ADMIN` role. Session-cookie auth via `POST /xmlapi/session/begin` and `POST /xmlapi/session/end` is recommended for high-volume clients. Unauthenticated requests return 401.
- RS-232 default is 115200 bps 8N1 for most models (Room Bar, Room Bar Pro, Room Kit Mini, Room Kit, Room 55, Codec Plus, Codec EQ, Desk Pro, Desk Mini, Desk, Board Pro, Board). Codec Pro / Room 70 G2 / Room Panorama support 9600/19200/38400/57600/115200 with a Euroblock COM port recommended. Room 55 Dual and Room 70 have no serial API access. Webex Board 55/70 always have serial enabled and it cannot be disabled.
- The default `admin` account ships with no passphrase; setting one is mandatory for security. Serial login prompt is ON by default but can be disabled with `xConfiguration SerialPort LoginRequired: Off`.
- HTTP `POST /putxml` with `Content-Type: text/xml` is the command submission endpoint. Multiline commands are wrapped in `<body>` and terminated with a line containing only `.` after a `xCommand <path>\n` opening.
- Feedback is delivered via either terminal session (xFeedback register), HTTP webhook (xCommand HttpFeedback Register, up to 4 slots, 15 XPath expressions each), or polling (`xgetxml` or `xStatus <path>`). Avoid `xFeedback register /Status` as it floods the session.
- Response-tagging via `resultId="..."` is supported on xcommand/xconfiguration/xstatus for matching async responses to requests.
- For full per-product applicability of each xCommand / xConfiguration / xStatus entry, see the compatibility matrix in Chapter 6 of the source. Entries vary in scope from "all 16 product lines" to "a single model".

<!-- UNRESOLVED: specific RoomOS 11.5.2 firmware build and per-product firmware version compatibility ranges not stated in the source. -->
<!-- UNRESOLVED: voltage, current, and power specifications not stated in source. -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not stated. -->

## Provenance

```yaml
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-115/api-reference-guide-roomos-115.pdf
retrieved_at: 2026-05-27T04:34:59.632Z
last_checked_at: 2026-05-27T06:51:44.656Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T06:51:44.656Z
matched_actions: 418
action_count: 418
confidence: medium
summary: "All 418 spec actions map 1:1 to 418 xCommand entries in source; transport confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "product-to-command compatibility varies widely across the Room Kit family; this spec lists the full command surface but per-model applicability is determined by the compatibility matrix in Chapter 6 of the source."
- "specific firmware version compatibility per product model not stated in source."
- "explicit interlock procedures (e.g. confirm-before-reboot) are not"
- "specific RoomOS 11.5.2 firmware build and per-product firmware version compatibility ranges not stated in the source."
- "voltage, current, and power specifications not stated in source."
- "fault behavior and error recovery sequences not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
