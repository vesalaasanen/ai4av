---
spec_id: admin/cisco-webex-room-kit-series-ce913
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco Webex Room Kit Series CE9.13 Control Spec"
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
    - "Codec EQ"
    - "Codec Plus"
    - "Codec Pro"
    - "Room 55"
    - "Room 55 Dual"
    - "Room 70"
    - "Room 70 G2"
    - "Room 70 Panorama"
    - "Room Panorama"
    - "Desk Pro"
    - "Desk Mini"
    - Desk
    - "Board 55"
    - "Board 70"
    - "Board Pro"
  firmware: "RoomOS CE9.13 (API reference states RoomOS 11.5.2)"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-115/api-reference-guide-roomos-115.pdf
retrieved_at: 2026-05-27T04:30:41.488Z
last_checked_at: 2026-06-09T09:09:18.376Z
generated_at: 2026-06-09T09:09:18.376Z
firmware_coverage: "RoomOS CE9.13 (API reference states RoomOS 11.5.2)"
protocol_coverage: []
known_gaps:
  - "exact port numbers for SSH/HTTP not stated in source (source references <ip-address> placeholders)"
  - "firmware version compatibility range not stated"
  - "specific TCP port numbers not stated in source"
  - "source references macro framework but does not document specific macro sequences"
  - "no specific safety interlock procedures found in source beyond GPIO pin modes"
  - "specific TCP port numbers for SSH/HTTP not stated in source"
  - "WebSocket JSON-RPC command encoding details reference external xAPI over WebSocket guide"
  - "complete xStatus and xConfiguration command listings partially extracted — source contains hundreds of configuration entries beyond what is enumerated here"
verification:
  verdict: verified
  checked_at: 2026-06-09T09:09:18.376Z
  matched_actions: 418
  action_count: 418
  confidence: medium
  summary: "Claude(Sonnet) re-verify of the amended on-disk spec: all 418 semantic-id actions map 1:1 to xCommand entries in source; transport confirmed verbatim. Independent confirmation of the prior codex-verified merge. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Cisco Webex Room Kit Series CE9.13 Control Spec

## Summary
The Cisco Webex Room Kit series are video conferencing codecs running RoomOS CE9.13. The xAPI provides control over audio, video, calls, cameras, standby, and system functions via SSH, HTTP/HTTPS, WebSocket, or RS-232 serial. This spec covers the xCommand, xConfiguration, xStatus, and xEvent API groups.

<!-- UNRESOLVED: exact port numbers for SSH/HTTP not stated in source (source references <ip-address> placeholders) -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->

## Transport
```yaml
protocols:
  - tcp
  - http
  - serial
addressing:
  # UNRESOLVED: specific TCP port numbers not stated in source
  port: null
  base_url: "http://<ip-address>/putxml"
auth:
  type: basic
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
```

## Traits
```yaml
- powerable    # inferred: Standby Activate/Deactivate commands present
- routable     # inferred: Video Input SetMainVideoSource, Presentation Start/Stop commands present
- queryable    # inferred: xStatus queries return device state
- levelable    # inferred: Audio Volume Set Level, various gain/level controls present
```

## Actions
```yaml
# AirPlay commands
- id: airplay_keyevent_back
  label: AirPlay Key Event Back
  kind: action
  params: []

- id: airplay_keyevent_click
  label: AirPlay Key Event Click
  kind: action
  params: []

- id: airplay_keyevent_down
  label: AirPlay Key Event Down
  kind: action
  params: []

- id: airplay_keyevent_fastforward
  label: AirPlay Key Event Fast Forward
  kind: action
  params: []

- id: airplay_keyevent_fastreverse
  label: AirPlay Key Event Fast Reverse
  kind: action
  params: []

- id: airplay_keyevent_left
  label: AirPlay Key Event Left
  kind: action
  params: []

- id: airplay_keyevent_play
  label: AirPlay Key Event Play
  kind: action
  params: []

- id: airplay_keyevent_right
  label: AirPlay Key Event Right
  kind: action
  params: []

- id: airplay_keyevent_up
  label: AirPlay Key Event Up
  kind: action
  params: []

- id: airplay_resetpaireddevices
  label: AirPlay Reset Paired Devices
  kind: action
  params: []

# Audio commands
- id: audio_diagnostics_advanced_run
  label: Audio Diagnostics Advanced Run
  kind: action
  params:
    - name: volume
      type: integer
      description: Test signal volume (0..50, default 20)
    - name: measurementlength
      type: integer
      description: Measurement length

- id: audio_diagnostics_aecreverb_reset
  label: Audio Diagnostics AEC Reverb Reset
  kind: action
  params: []

- id: audio_diagnostics_aecreverb_run
  label: Audio Diagnostics AEC Reverb Run
  kind: action
  params: []

- id: audio_diagnostics_measuredelay
  label: Audio Diagnostics Measure Delay
  kind: action
  params: []

- id: audio_equalizer_list
  label: Audio Equalizer List
  kind: query
  params: []

- id: audio_equalizer_update
  label: Audio Equalizer Update
  kind: action
  params: []

- id: audio_localinput_add
  label: Audio LocalInput Add
  kind: action
  params: []

- id: audio_localinput_addconnector
  label: Audio LocalInput AddConnector
  kind: action
  params: []

- id: audio_localinput_remove
  label: Audio LocalInput Remove
  kind: action
  params: []

- id: audio_localinput_removeconnector
  label: Audio LocalInput RemoveConnector
  kind: action
  params: []

- id: audio_localinput_update
  label: Audio LocalInput Update
  kind: action
  params: []

- id: audio_localinput_ethernet_deregister
  label: Audio LocalInput Ethernet Deregister
  kind: action
  params: []

- id: audio_localinput_ethernet_register
  label: Audio LocalInput Ethernet Register
  kind: action
  params: []

- id: audio_localoutput_add
  label: Audio LocalOutput Add
  kind: action
  params: []

- id: audio_localoutput_addconnector
  label: Audio LocalOutput AddConnector
  kind: action
  params: []

- id: audio_localoutput_connectinput
  label: Audio LocalOutput ConnectInput
  kind: action
  params: []

- id: audio_localoutput_disconnectinput
  label: Audio LocalOutput DisconnectInput
  kind: action
  params: []

- id: audio_localoutput_remove
  label: Audio LocalOutput Remove
  kind: action
  params: []

- id: audio_localoutput_removeconnector
  label: Audio LocalOutput RemoveConnector
  kind: action
  params: []

- id: audio_localoutput_update
  label: Audio LocalOutput Update
  kind: action
  params: []

- id: audio_localoutput_updateinputgain
  label: Audio LocalOutput UpdateInputGain
  kind: action
  params: []

- id: audio_microphones_musicmode_start
  label: Audio Microphones Music Mode Start
  kind: action
  params: []

- id: audio_microphones_musicmode_stop
  label: Audio Microphones Music Mode Stop
  kind: action
  params: []

- id: audio_microphones_mute
  label: Audio Microphones Mute
  kind: action
  params: []

- id: audio_microphones_noiseremoval_activate
  label: Audio Microphones Noise Removal Activate
  kind: action
  params: []

- id: audio_microphones_noiseremoval_deactivate
  label: Audio Microphones Noise Removal Deactivate
  kind: action
  params: []

- id: audio_microphones_passthrough_start
  label: Audio Microphones Passthrough Start
  kind: action
  params: []

- id: audio_microphones_passthrough_stop
  label: Audio Microphones Passthrough Stop
  kind: action
  params: []

- id: audio_microphones_togglemute
  label: Audio Microphones Toggle Mute
  kind: action
  params: []

- id: audio_microphones_unmute
  label: Audio Microphones Unmute
  kind: action
  params: []

- id: audio_remoteoutput_connectinput
  label: Audio RemoteOutput ConnectInput
  kind: action
  params: []

- id: audio_remoteoutput_disconnectinput
  label: Audio RemoteOutput DisconnectInput
  kind: action
  params: []

- id: audio_remoteoutput_updateinputgain
  label: Audio RemoteOutput UpdateInputGain
  kind: action
  params: []

- id: audio_select
  label: Audio Select
  kind: action
  params: []

- id: audio_setup_clear
  label: Audio Setup Clear
  kind: action
  params: []

- id: audio_setup_reset
  label: Audio Setup Reset
  kind: action
  params: []

- id: audio_sound_play
  label: Audio Sound Play
  kind: action
  params: []

- id: audio_sound_stop
  label: Audio Sound Stop
  kind: action
  params: []

- id: audio_speakercheck
  label: Audio Speaker Check
  kind: action
  params: []

- id: audio_soundsandalerts_ringtone_list
  label: Audio Sounds and Alerts Ringtone List
  kind: query
  params: []

- id: audio_soundsandalerts_ringtone_play
  label: Audio Sounds and Alerts Ringtone Play
  kind: action
  params: []

- id: audio_soundsandalerts_ringtone_stop
  label: Audio Sounds and Alerts Ringtone Stop
  kind: action
  params: []

- id: audio_volume_decrease
  label: Audio Volume Decrease
  kind: action
  params: []

- id: audio_volume_increase
  label: Audio Volume Increase
  kind: action
  params: []

- id: audio_volume_mute
  label: Audio Volume Mute
  kind: action
  params: []

- id: audio_volume_set
  label: Audio Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level (0..100, where 0 is off)

- id: audio_volume_settodefault
  label: Audio Volume Set To Default
  kind: action
  params: []

- id: audio_volume_togglemute
  label: Audio Volume Toggle Mute
  kind: action
  params: []

- id: audio_volume_unmute
  label: Audio Volume Unmute
  kind: action
  params: []

- id: audio_vumeter_start
  label: Audio VU Meter Start
  kind: action
  params: []

- id: audio_vumeter_stop
  label: Audio VU Meter Stop
  kind: action
  params: []

- id: audio_vumeter_stopall
  label: Audio VU Meter Stop All
  kind: action
  params: []

# Bluetooth commands
- id: bluetooth_streaming_next
  label: Bluetooth Streaming Next
  kind: action
  params: []

- id: bluetooth_streaming_pause
  label: Bluetooth Streaming Pause
  kind: action
  params: []

- id: bluetooth_streaming_play
  label: Bluetooth Streaming Play
  kind: action
  params: []

- id: bluetooth_streaming_previous
  label: Bluetooth Streaming Previous
  kind: action
  params: []

# Bookings commands
- id: bookings_book
  label: Bookings Book
  kind: action
  params: []

- id: bookings_clear
  label: Bookings Clear
  kind: action
  params: []

- id: bookings_delete
  label: Bookings Delete
  kind: action
  params: []

- id: bookings_edit
  label: Bookings Edit
  kind: action
  params: []

- id: bookings_extend
  label: Bookings Extend
  kind: action
  params: []

- id: bookings_get
  label: Bookings Get
  kind: query
  params: []

- id: bookings_list
  label: Bookings List
  kind: query
  params: []

- id: bookings_notificationsnooze
  label: Bookings Notification Snooze
  kind: action
  params: []

- id: bookings_respond
  label: Bookings Respond
  kind: action
  params: []

- id: bookings_put
  label: Bookings Put
  kind: action
  params: []

# Call commands
- id: call_accept
  label: Call Accept
  kind: action
  params: []

- id: call_disconnect
  label: Call Disconnect
  kind: action
  params: []

- id: call_dtmfsend
  label: Call DTMF Send
  kind: action
  params: []

- id: call_farendcontrol_camera_move
  label: Call Far End Control Camera Move
  kind: action
  params: []

- id: call_farendcontrol_camera_stop
  label: Call Far End Control Camera Stop
  kind: action
  params: []

- id: call_farendcontrol_requestcapabilities
  label: Call Far End Control Request Capabilities
  kind: action
  params: []

- id: call_farendcontrol_roompreset_activate
  label: Call Far End Control Room Preset Activate
  kind: action
  params: []

- id: call_farendcontrol_roompreset_store
  label: Call Far End Control Room Preset Store
  kind: action
  params: []

- id: call_farendcontrol_source_select
  label: Call Far End Control Source Select
  kind: action
  params: []

- id: call_farendmessage_send
  label: Call Far End Message Send
  kind: action
  params: []

- id: call_forward
  label: Call Forward
  kind: action
  params: []

- id: call_hold
  label: Call Hold
  kind: action
  params: []

- id: call_ignore
  label: Call Ignore
  kind: action
  params: []

- id: call_join
  label: Call Join
  kind: action
  params: []

- id: call_reject
  label: Call Reject
  kind: action
  params: []

- id: call_resume
  label: Call Resume
  kind: action
  params: []

- id: call_unattendedtransfer
  label: Call Unattended Transfer
  kind: action
  params: []

# CallHistory commands
- id: callhistory_acknowledgeallmissedcalls
  label: CallHistory Acknowledge All Missed Calls
  kind: action
  params: []

- id: callhistory_acknowledgemissedcall
  label: CallHistory Acknowledge Missed Call
  kind: action
  params: []

- id: callhistory_deleteall
  label: CallHistory Delete All
  kind: action
  params: []

- id: callhistory_deleteentry
  label: CallHistory Delete Entry
  kind: action
  params: []

- id: callhistory_get
  label: CallHistory Get
  kind: query
  params: []

- id: callhistory_recents
  label: CallHistory Recents
  kind: query
  params: []

# Camera commands
- id: camera_positionreset
  label: Camera Position Reset
  kind: action
  params: []

- id: camera_positionset
  label: Camera Position Set
  kind: action
  params:
    - name: cameraid
      type: integer
      description: Camera ID
    - name: pan
      type: integer
      description: Pan position
    - name: tilt
      type: integer
      description: Tilt position
    - name: zoom
      type: integer
      description: Zoom position

- id: camera_preset_activate
  label: Camera Preset Activate
  kind: action
  params: []

- id: camera_preset_activatedefaultposition
  label: Camera Preset Activate Default Position
  kind: action
  params: []

- id: camera_preset_edit
  label: Camera Preset Edit
  kind: action
  params: []

- id: camera_preset_list
  label: Camera Preset List
  kind: query
  params: []

- id: camera_preset_remove
  label: Camera Preset Remove
  kind: action
  params: []

- id: camera_preset_show
  label: Camera Preset Show
  kind: action
  params: []

- id: camera_preset_store
  label: Camera Preset Store
  kind: action
  params: []

- id: camera_ramp
  label: Camera Ramp
  kind: action
  params: []

- id: camera_triggerautofocus
  label: Camera Trigger Autofocus
  kind: action
  params: []

- id: camera_triggerwhitebalance
  label: Camera Trigger White Balance
  kind: action
  params: []

# Cameras commands
- id: cameras_autofocus_diagnostics_start
  label: Cameras AutoFocus Diagnostics Start
  kind: action
  params: []

- id: cameras_autofocus_diagnostics_stop
  label: Cameras AutoFocus Diagnostics Stop
  kind: action
  params: []

- id: cameras_background_clear
  label: Cameras Background Clear
  kind: action
  params: []

- id: cameras_background_delete
  label: Cameras Background Delete
  kind: action
  params: []

- id: cameras_background_fetch
  label: Cameras Background Fetch
  kind: action
  params: []

- id: cameras_background_foregroundparameters_reset
  label: Cameras Background Foreground Parameters Reset
  kind: action
  params: []

- id: cameras_background_foregroundparameters_set
  label: Cameras Background Foreground Parameters Set
  kind: action
  params: []

- id: cameras_background_get
  label: Cameras Background Get
  kind: query
  params: []

- id: cameras_background_list
  label: Cameras Background List
  kind: query
  params: []

- id: cameras_background_set
  label: Cameras Background Set
  kind: action
  params: []

- id: cameras_background_upload
  label: Cameras Background Upload
  kind: action
  params: []

- id: cameras_presentertrack_clearposition
  label: Cameras PresenterTrack Clear Position
  kind: action
  params: []

- id: cameras_presentertrack_set
  label: Cameras PresenterTrack Set
  kind: action
  params: []

- id: cameras_presentertrack_storeposition
  label: Cameras PresenterTrack Store Position
  kind: action
  params: []

- id: cameras_speakertrack_activate
  label: Cameras SpeakerTrack Activate
  kind: action
  params: []

- id: cameras_speakertrack_deactivate
  label: Cameras SpeakerTrack Deactivate
  kind: action
  params: []

- id: cameras_speakertrack_backgroundmode_activate
  label: Cameras SpeakerTrack Background Mode Activate
  kind: action
  params: []

- id: cameras_speakertrack_backgroundmode_deactivate
  label: Cameras SpeakerTrack Background Mode Deactivate
  kind: action
  params: []

- id: cameras_speakertrack_diagnostics_start
  label: Cameras SpeakerTrack Diagnostics Start
  kind: action
  params: []

- id: cameras_speakertrack_diagnostics_stop
  label: Cameras SpeakerTrack Diagnostics Stop
  kind: action
  params: []

- id: cameras_speakertrack_frames_activate
  label: Cameras SpeakerTrack Frames Activate
  kind: action
  params: []

- id: cameras_speakertrack_frames_deactivate
  label: Cameras SpeakerTrack Frames Deactivate
  kind: action
  params: []

- id: cameras_speakertrack_viewlimits_activate
  label: Cameras SpeakerTrack ViewLimits Activate
  kind: action
  params: []

- id: cameras_speakertrack_viewlimits_deactivate
  label: Cameras SpeakerTrack ViewLimits Deactivate
  kind: action
  params: []

- id: cameras_speakertrack_viewlimits_storeposition
  label: Cameras SpeakerTrack ViewLimits Store Position
  kind: action
  params: []

- id: cameras_speakertrack_whiteboard_activateposition
  label: Cameras SpeakerTrack Whiteboard Activate Position
  kind: action
  params: []

- id: cameras_speakertrack_whiteboard_alignposition
  label: Cameras SpeakerTrack Whiteboard Align Position
  kind: action
  params: []

- id: cameras_speakertrack_whiteboard_setdistance
  label: Cameras SpeakerTrack Whiteboard Set Distance
  kind: action
  params: []

- id: cameras_speakertrack_whiteboard_storeposition
  label: Cameras SpeakerTrack Whiteboard Store Position
  kind: action
  params: []

# Conference commands
- id: conference_admitall
  label: Conference Admit All
  kind: action
  params: []

- id: conference_call_authenticationresponse
  label: Conference Call Authentication Response
  kind: action
  params: []

- id: conference_donotdisturb_activate
  label: Conference Do Not Disturb Activate
  kind: action
  params: []

- id: conference_donotdisturb_deactivate
  label: Conference Do Not Disturb Deactivate
  kind: action
  params: []

- id: conference_endmeeting
  label: Conference End Meeting
  kind: action
  params: []

- id: conference_hand_lower
  label: Conference Hand Lower
  kind: action
  params: []

- id: conference_hand_raise
  label: Conference Hand Raise
  kind: action
  params: []

- id: conference_hardmute
  label: Conference Hard Mute
  kind: action
  params: []

- id: conference_lock
  label: Conference Lock
  kind: action
  params: []

- id: conference_lowerallhands
  label: Conference Lower All Hands
  kind: action
  params: []

- id: conference_meetingassistant_start
  label: Conference Meeting Assistant Start
  kind: action
  params: []

- id: conference_meetingassistant_stop
  label: Conference Meeting Assistant Stop
  kind: action
  params: []

- id: conference_meetingchatnotifications_default
  label: Conference Meeting Chat Notifications Default
  kind: action
  params: []

- id: conference_meetingchatnotifications_incall
  label: Conference Meeting Chat Notifications InCall
  kind: action
  params: []

- id: conference_muteall
  label: Conference Mute All
  kind: action
  params: []

- id: conference_muteonentry
  label: Conference Mute On Entry
  kind: action
  params: []

- id: conference_participant_add
  label: Conference Participant Add
  kind: action
  params: []

- id: conference_participant_admit
  label: Conference Participant Admit
  kind: action
  params: []

- id: conference_participant_disconnect
  label: Conference Participant Disconnect
  kind: action
  params: []

- id: conference_participant_lowerhand
  label: Conference Participant Lower Hand
  kind: action
  params: []

- id: conference_participant_mute
  label: Conference Participant Mute
  kind: action
  params: []

- id: conference_participantlist_search
  label: Conference Participant List Search
  kind: query
  params: []

- id: conference_peoplefocus_activate
  label: Conference PeopleFocus Activate
  kind: action
  params: []

- id: conference_peoplefocus_deactivate
  label: Conference PeopleFocus Deactivate
  kind: action
  params: []

- id: conference_reaction_disable
  label: Conference Reaction Disable
  kind: action
  params: []

- id: conference_reaction_enable
  label: Conference Reaction Enable
  kind: action
  params: []

- id: conference_reaction_send
  label: Conference Reaction Send
  kind: action
  params: []

- id: conference_recording_pause
  label: Conference Recording Pause
  kind: action
  params: []

- id: conference_recording_resume
  label: Conference Recording Resume
  kind: action
  params: []

- id: conference_recording_start
  label: Conference Recording Start
  kind: action
  params: []

- id: conference_recording_stop
  label: Conference Recording Stop
  kind: action
  params: []

- id: conference_skintone
  label: Conference SkinTone
  kind: action
  params: []

- id: conference_speakerlock_release
  label: Conference SpeakerLock Release
  kind: action
  params: []

- id: conference_speakerlock_set
  label: Conference SpeakerLock Set
  kind: action
  params: []

- id: conference_transferhostandleave
  label: Conference Transfer Host And Leave
  kind: action
  params: []

# Diagnostics commands
- id: diagnostics_run
  label: Diagnostics Run
  kind: action
  params: []

# Dial commands
- id: dial
  label: Dial
  kind: action
  params:
    - name: number
      type: string
      description: Number or URI to dial
    - name: protocol
      type: string
      description: "Call protocol: H323, Sip, or Spark"

# GPIO commands
- id: gpio_manualstate_set
  label: GPIO ManualState Set
  kind: action
  params: []

# HttpClient commands
- id: httpclient_allow_hostname_add
  label: HttpClient Allow Hostname Add
  kind: action
  params: []

- id: httpclient_allow_hostname_clear
  label: HttpClient Allow Hostname Clear
  kind: action
  params: []

- id: httpclient_allow_hostname_list
  label: HttpClient Allow Hostname List
  kind: query
  params: []

- id: httpclient_allow_hostname_remove
  label: HttpClient Allow Hostname Remove
  kind: action
  params: []

- id: httpclient_delete
  label: HttpClient Delete
  kind: action
  params: []

- id: httpclient_get
  label: HttpClient Get
  kind: action
  params: []

- id: httpclient_patch
  label: HttpClient Patch
  kind: action
  params: []

- id: httpclient_post
  label: HttpClient Post
  kind: action
  params: []

- id: httpclient_put
  label: HttpClient Put
  kind: action
  params: []

# HttpFeedback commands
- id: httpfeedback_deregister
  label: HttpFeedback Deregister
  kind: action
  params: []

- id: httpfeedback_enable
  label: HttpFeedback Enable
  kind: action
  params: []

- id: httpfeedback_register
  label: HttpFeedback Register
  kind: action
  params:
    - name: feedbackslot
      type: integer
      description: "Feedback slot (1..4)"
    - name: serverurl
      type: string
      description: URL for HTTP feedback posts
    - name: format
      type: string
      description: "Output format: XML or JSON"

# Logging commands
- id: logging_addevent
  label: Logging AddEvent
  kind: action
  params: []

- id: logging_extendedlogging_start
  label: Logging Extended Logging Start
  kind: action
  params: []

- id: logging_extendedlogging_stop
  label: Logging Extended Logging Stop
  kind: action
  params: []

- id: logging_sendlogs
  label: Logging Send Logs
  kind: action
  params: []

# Macros commands
- id: macros_log_clear
  label: Macros Log Clear
  kind: action
  params: []

- id: macros_log_get
  label: Macros Log Get
  kind: query
  params: []

- id: macros_macro_activate
  label: Macros Macro Activate
  kind: action
  params: []

- id: macros_macro_deactivate
  label: Macros Macro Deactivate
  kind: action
  params: []

- id: macros_macro_get
  label: Macros Macro Get
  kind: query
  params: []

- id: macros_macro_remove
  label: Macros Macro Remove
  kind: action
  params: []

- id: macros_macro_removeall
  label: Macros Macro Remove All
  kind: action
  params: []

- id: macros_macro_rename
  label: Macros Macro Rename
  kind: action
  params: []

- id: macros_macro_roles_set
  label: Macros Macro Roles Set
  kind: action
  params: []

- id: macros_macro_save
  label: Macros Macro Save
  kind: action
  params: []

- id: macros_runtime_restart
  label: Macros Runtime Restart
  kind: action
  params: []

- id: macros_runtime_start
  label: Macros Runtime Start
  kind: action
  params: []

- id: macros_runtime_status
  label: Macros Runtime Status
  kind: query
  params: []

- id: macros_runtime_stop
  label: Macros Runtime Stop
  kind: action
  params: []

# Message commands
- id: message_send
  label: Message Send
  kind: action
  params: []

# Network commands
- id: network_smtp_verifyconfig
  label: Network SMTP Verify Config
  kind: action
  params: []

- id: network_snmp_usm_user_add
  label: Network SNMP USM User Add
  kind: action
  params: []

- id: network_snmp_usm_user_delete
  label: Network SNMP USM User Delete
  kind: action
  params: []

- id: network_snmp_usm_user_list
  label: Network SNMP USM User List
  kind: query
  params: []

- id: network_wifi_configure
  label: Network Wifi Configure
  kind: action
  params: []

- id: network_wifi_delete
  label: Network Wifi Delete
  kind: action
  params: []

- id: network_wifi_list
  label: Network Wifi List
  kind: query
  params: []

- id: network_wifi_scan_start
  label: Network Wifi Scan Start
  kind: action
  params: []

- id: network_wifi_scan_stop
  label: Network Wifi Scan Stop
  kind: action
  params: []

# Peripherals commands
- id: peripherals_connect
  label: Peripherals Connect
  kind: action
  params: []

- id: peripherals_heartbeat
  label: Peripherals HeartBeat
  kind: action
  params: []

- id: peripherals_list
  label: Peripherals List
  kind: query
  params: []

- id: peripherals_pairing_pair
  label: Peripherals Pairing Pair
  kind: action
  params: []

- id: peripherals_pairing_pinpairing_start
  label: Peripherals Pairing PinPairing Start
  kind: action
  params: []

- id: peripherals_pairing_pinpairing_stop
  label: Peripherals Pairing PinPairing Stop
  kind: action
  params: []

- id: peripherals_pairing_unpair
  label: Peripherals Pairing Unpair
  kind: action
  params: []

- id: peripherals_purge
  label: Peripherals Purge
  kind: action
  params: []

- id: peripherals_touchpanel_configure
  label: Peripherals TouchPanel Configure
  kind: action
  params: []

# Phonebook commands
- id: phonebook_contact_add
  label: Phonebook Contact Add
  kind: action
  params: []

- id: phonebook_contact_delete
  label: Phonebook Contact Delete
  kind: action
  params: []

- id: phonebook_contact_modify
  label: Phonebook Contact Modify
  kind: action
  params: []

- id: phonebook_contactmethod_add
  label: Phonebook ContactMethod Add
  kind: action
  params: []

- id: phonebook_contactmethod_delete
  label: Phonebook ContactMethod Delete
  kind: action
  params: []

- id: phonebook_contactmethod_modify
  label: Phonebook ContactMethod Modify
  kind: action
  params: []

- id: phonebook_folder_add
  label: Phonebook Folder Add
  kind: action
  params: []

- id: phonebook_folder_delete
  label: Phonebook Folder Delete
  kind: action
  params: []

- id: phonebook_folder_modify
  label: Phonebook Folder Modify
  kind: action
  params: []

- id: phonebook_search
  label: Phonebook Search
  kind: query
  params: []

# Presentation commands
- id: presentation_start
  label: Presentation Start
  kind: action
  params:
    - name: presentationsource
      type: integer
      description: Presentation source connector ID

- id: presentation_stop
  label: Presentation Stop
  kind: action
  params: []

# Provisioning commands
- id: provisioning_completeupgrade
  label: Provisioning Complete Upgrade
  kind: action
  params: []

- id: provisioning_postponeupgrade
  label: Provisioning Postpone Upgrade
  kind: action
  params: []

- id: provisioning_cucm_extensionmobility_login
  label: Provisioning CUCM Extension Mobility Login
  kind: action
  params: []

- id: provisioning_cucm_extensionmobility_logout
  label: Provisioning CUCM Extension Mobility Logout
  kind: action
  params: []

- id: provisioning_roomtype_activate
  label: Provisioning RoomType Activate
  kind: action
  params: []

- id: provisioning_service_fetch
  label: Provisioning Service Fetch
  kind: action
  params: []

# Proximity commands
- id: proximity_services_activate
  label: Proximity Services Activate
  kind: action
  params: []

- id: proximity_services_deactivate
  label: Proximity Services Deactivate
  kind: action
  params: []

# RoomCleanup commands
- id: roomcleanup_cancel
  label: RoomCleanup Cancel
  kind: action
  params: []

- id: roomcleanup_run
  label: RoomCleanup Run
  kind: action
  params: []

# RoomPreset commands
- id: roompreset_activate
  label: RoomPreset Activate
  kind: action
  params: []

- id: roompreset_clear
  label: RoomPreset Clear
  kind: action
  params: []

- id: roompreset_store
  label: RoomPreset Store
  kind: action
  params: []

# Security commands
- id: security_certificates_ca_add
  label: Security Certificates CA Add
  kind: action
  params: []

- id: security_certificates_ca_delete
  label: Security Certificates CA Delete
  kind: action
  params: []

- id: security_certificates_ca_show
  label: Security Certificates CA Show
  kind: query
  params: []

- id: security_certificates_cucm_ctl_delete
  label: Security Certificates CUCM CTL Delete
  kind: action
  params: []

- id: security_certificates_cucm_ctl_show
  label: Security Certificates CUCM CTL Show
  kind: query
  params: []

- id: security_certificates_cucm_itl_show
  label: Security Certificates CUCM ITL Show
  kind: query
  params: []

- id: security_certificates_cucm_mic_show
  label: Security Certificates CUCM MIC Show
  kind: query
  params: []

- id: security_certificates_services_activate
  label: Security Certificates Services Activate
  kind: action
  params: []

- id: security_certificates_services_add
  label: Security Certificates Services Add
  kind: action
  params: []

- id: security_certificates_services_deactivate
  label: Security Certificates Services Deactivate
  kind: action
  params: []

- id: security_certificates_services_delete
  label: Security Certificates Services Delete
  kind: action
  params: []

- id: security_certificates_services_show
  label: Security Certificates Services Show
  kind: query
  params: []

- id: security_certificates_thirdparty_disable
  label: Security Certificates ThirdParty Disable
  kind: action
  params: []

- id: security_certificates_thirdparty_enable
  label: Security Certificates ThirdParty Enable
  kind: action
  params: []

- id: security_certificates_thirdparty_list
  label: Security Certificates ThirdParty List
  kind: query
  params: []

- id: security_certificates_thirdparty_show
  label: Security Certificates ThirdParty Show
  kind: query
  params: []

- id: security_certificates_webex_show
  label: Security Certificates Webex Show
  kind: query
  params: []

- id: security_certificates_webexidentity_show
  label: Security Certificates Webex Identity Show
  kind: query
  params: []

- id: security_ciphers_list
  label: Security Ciphers List
  kind: query
  params: []

- id: security_clientsecret_populate
  label: Security ClientSecret Populate
  kind: action
  params: []

- id: security_persistency
  label: Security Persistency
  kind: action
  params: []

- id: security_session_get
  label: Security Session Get
  kind: query
  params: []

- id: security_session_list
  label: Security Session List
  kind: query
  params: []

- id: security_session_terminate
  label: Security Session Terminate
  kind: action
  params: []

# Standby commands
- id: standby_activate
  label: Standby Activate
  kind: action
  params: []

- id: standby_deactivate
  label: Standby Deactivate
  kind: action
  params: []

- id: standby_halfwake
  label: Standby Halfwake
  kind: action
  params: []

- id: standby_resethalfwaketimer
  label: Standby Reset Halfwake Timer
  kind: action
  params: []

- id: standby_resettimer
  label: Standby Reset Timer
  kind: action
  params: []

# SystemUnit commands
- id: systemunit_boot
  label: SystemUnit Boot
  kind: action
  params: []

- id: systemunit_developerpreview_activate
  label: SystemUnit DeveloperPreview Activate
  kind: action
  params: []

- id: systemunit_developerpreview_deactivate
  label: SystemUnit DeveloperPreview Deactivate
  kind: action
  params: []

- id: systemunit_factoryreset
  label: SystemUnit Factory Reset
  kind: action
  params: []

- id: systemunit_firsttimewizard_stop
  label: SystemUnit FirstTimeWizard Stop
  kind: action
  params: []

- id: systemunit_notifications_removeall
  label: SystemUnit Notifications Remove All
  kind: action
  params: []

- id: systemunit_optionkey_add
  label: SystemUnit OptionKey Add
  kind: action
  params: []

- id: systemunit_optionkey_list
  label: SystemUnit OptionKey List
  kind: query
  params: []

- id: systemunit_optionkey_remove
  label: SystemUnit OptionKey Remove
  kind: action
  params: []

- id: systemunit_optionkey_removeall
  label: SystemUnit OptionKey Remove All
  kind: action
  params: []

- id: systemunit_productplatform_set
  label: SystemUnit ProductPlatform Set
  kind: action
  params: []

- id: systemunit_signinbanner_clear
  label: SystemUnit SignInBanner Clear
  kind: action
  params: []

- id: systemunit_signinbanner_get
  label: SystemUnit SignInBanner Get
  kind: query
  params: []

- id: systemunit_signinbanner_set
  label: SystemUnit SignInBanner Set
  kind: action
  params: []

- id: systemunit_softreset
  label: SystemUnit Soft Reset
  kind: action
  params: []

- id: systemunit_softwareupgrade
  label: SystemUnit Software Upgrade
  kind: action
  params: []

- id: systemunit_welcomebanner_clear
  label: SystemUnit WelcomeBanner Clear
  kind: action
  params: []

- id: systemunit_welcomebanner_get
  label: SystemUnit WelcomeBanner Get
  kind: query
  params: []

- id: systemunit_welcomebanner_set
  label: SystemUnit WelcomeBanner Set
  kind: action
  params: []

# Time commands
- id: time_datetime_get
  label: Time DateTime Get
  kind: query
  params: []

- id: time_datetime_set
  label: Time DateTime Set
  kind: action
  params: []

# UserInterface commands
- id: userinterface_branding_clear
  label: UserInterface Branding Clear
  kind: action
  params: []

- id: userinterface_branding_delete
  label: UserInterface Branding Delete
  kind: action
  params: []

- id: userinterface_branding_fetch
  label: UserInterface Branding Fetch
  kind: action
  params: []

- id: userinterface_branding_get
  label: UserInterface Branding Get
  kind: query
  params: []

- id: userinterface_branding_updated
  label: UserInterface Branding Updated
  kind: action
  params: []

- id: userinterface_branding_upload
  label: UserInterface Branding Upload
  kind: action
  params: []

- id: userinterface_extensions_clear
  label: UserInterface Extensions Clear
  kind: action
  params: []

- id: userinterface_extensions_export
  label: UserInterface Extensions Export
  kind: action
  params: []

- id: userinterface_extensions_icon_delete
  label: UserInterface Extensions Icon Delete
  kind: action
  params: []

- id: userinterface_extensions_icon_deleteall
  label: UserInterface Extensions Icon Delete All
  kind: action
  params: []

- id: userinterface_extensions_icon_download
  label: UserInterface Extensions Icon Download
  kind: action
  params: []

- id: userinterface_extensions_icon_fetch
  label: UserInterface Extensions Icon Fetch
  kind: action
  params: []

- id: userinterface_extensions_icon_get
  label: UserInterface Extensions Icon Get
  kind: query
  params: []

- id: userinterface_extensions_icon_list
  label: UserInterface Extensions Icon List
  kind: query
  params: []

- id: userinterface_extensions_icon_upload
  label: UserInterface Extensions Icon Upload
  kind: action
  params: []

- id: userinterface_extensions_set
  label: UserInterface Extensions Set
  kind: action
  params: []

- id: userinterface_message_alert_display
  label: UserInterface Message Alert Display
  kind: action
  params: []

- id: userinterface_message_prompt_display
  label: UserInterface Message Prompt Display
  kind: action
  params: []

- id: userinterface_message_rating_display
  label: UserInterface Message Rating Display
  kind: action
  params: []

- id: userinterface_message_rating_response
  label: UserInterface Message Rating Response
  kind: action
  params: []

- id: userinterface_message_textinput_clear
  label: UserInterface Message TextInput Clear
  kind: action
  params: []

- id: userinterface_message_textinput_display
  label: UserInterface Message TextInput Display
  kind: action
  params: []

- id: userinterface_message_textinput_response
  label: UserInterface Message TextInput Response
  kind: action
  params: []

- id: userinterface_message_textline_clear
  label: UserInterface Message TextLine Clear
  kind: action
  params: []

- id: userinterface_message_textline_display
  label: UserInterface Message TextLine Display
  kind: action
  params: []

- id: userinterface_presentation_autoshare_showalert
  label: UserInterface Presentation AutoShare ShowAlert
  kind: action
  params: []

- id: userinterface_presentation_externalsource_add
  label: UserInterface Presentation ExternalSource Add
  kind: action
  params: []

- id: userinterface_presentation_externalsource_list
  label: UserInterface Presentation ExternalSource List
  kind: query
  params: []

- id: userinterface_presentation_externalsource_remove
  label: UserInterface Presentation ExternalSource Remove
  kind: action
  params: []

- id: userinterface_presentation_externalsource_removeall
  label: UserInterface Presentation ExternalSource Remove All
  kind: action
  params: []

- id: userinterface_presentation_externalsource_select
  label: UserInterface Presentation ExternalSource Select
  kind: action
  params: []

- id: userinterface_presentation_externalsource_state_set
  label: UserInterface Presentation ExternalSource State Set
  kind: action
  params: []

- id: userinterface_translation_override_clear
  label: UserInterface Translation Override Clear
  kind: action
  params: []

- id: userinterface_translation_override_get
  label: UserInterface Translation Override Get
  kind: query
  params: []

- id: userinterface_translation_override_set
  label: UserInterface Translation Override Set
  kind: action
  params: []

# UserPresence commands
- id: userpresence_customstatus_clear
  label: UserPresence CustomStatus Clear
  kind: action
  params: []

- id: userpresence_customstatus_getrecentslist
  label: UserPresence CustomStatus Get Recents List
  kind: query
  params: []

- id: userpresence_customstatus_set
  label: UserPresence CustomStatus Set
  kind: action
  params: []

# Video commands
- id: video_activespeakerpip_set
  label: Video ActiveSpeakerPIP Set
  kind: action
  params: []

- id: video_cec_input_keyclick
  label: Video CEC Input KeyClick
  kind: action
  params: []

- id: video_cec_output_keyclick
  label: Video CEC Output KeyClick
  kind: action
  params: []

- id: video_cec_output_sendactivesourcerequest
  label: Video CEC Output SendActiveSourceRequest
  kind: action
  params: []

- id: video_cec_output_sendinactivesourcerequest
  label: Video CEC Output SendInactiveSourceRequest
  kind: action
  params: []

- id: video_graphics_clear
  label: Video Graphics Clear
  kind: action
  params: []

- id: video_graphics_text_display
  label: Video Graphics Text Display
  kind: action
  params: []

- id: video_input_mainvideo_mute
  label: Video Input MainVideo Mute
  kind: action
  params: []

- id: video_input_mainvideo_unmute
  label: Video Input MainVideo Unmute
  kind: action
  params: []

- id: video_input_setmainvideosource
  label: Video Input Set Main Video Source
  kind: action
  params:
    - name: connectorid
      type: integer
      description: Video input connector ID

- id: video_layout_hidenonvideo_activate
  label: Video Layout HideNonVideo Activate
  kind: action
  params: []

# WebEngine commands
- id: webengine_mediaaccess_list
  label: WebEngine MediaAccess List
  kind: query
  params: []

- id: webengine_mediaaccess_remove
  label: WebEngine MediaAccess Remove
  kind: action
  params: []

- id: webengine_mediaaccess_removeall
  label: WebEngine MediaAccess Remove All
  kind: action
  params: []

# Webex commands
- id: webex_hotdesking_setsupport
  label: Webex Hotdesking Set Support
  kind: action
  params: []

- id: webex_join
  label: Webex Join
  kind: action
  params: []

- id: webex_meetings_instantmeeting_start
  label: Webex Meetings InstantMeeting Start
  kind: action
  params: []

- id: webex_registration_cancel
  label: Webex Registration Cancel
  kind: action
  params: []

- id: webex_registration_converttocloud
  label: Webex Registration Convert To Cloud
  kind: action
  params: []

- id: webex_registration_logout
  label: Webex Registration Logout
  kind: action
  params: []

- id: webex_registration_start
  label: Webex Registration Start
  kind: action
  params: []

# WebRTC commands
- id: webrtc_join
  label: WebRTC Join
  kind: action
  params: []

- id: webrtc_provider_current_diagnostics_send
  label: WebRTC Provider Current Diagnostics Send
  kind: action
  params: []

- id: webrtc_provider_googlemeet_meetingnumber_validate
  label: WebRTC Provider GoogleMeet MeetingNumber Validate
  kind: action
  params: []

# Zoom commands
- id: zoom_join
  label: Zoom Join
  kind: action
  params: []
- id: userinterface_extensions_list
  label: UserInterface Extensions List
  kind: query
  params: []

- id: userinterface_extensions_panel_clicked
  label: UserInterface Extensions Panel Clicked
  kind: action
  params: []

- id: userinterface_extensions_panel_close
  label: UserInterface Extensions Panel Close
  kind: action
  params: []

- id: userinterface_extensions_panel_save
  label: UserInterface Extensions Panel Save
  kind: action
  params: []

- id: userinterface_extensions_panel_open
  label: UserInterface Extensions Panel Open
  kind: action
  params: []

- id: userinterface_extensions_panel_remove
  label: UserInterface Extensions Panel Remove
  kind: action
  params: []

- id: userinterface_extensions_panel_update
  label: UserInterface Extensions Panel Update
  kind: action
  params: []

- id: userinterface_extensions_webapp_save
  label: UserInterface Extensions WebApp Save
  kind: action
  params: []

- id: userinterface_extensions_webwidget_remove
  label: UserInterface Extensions WebWidget Remove
  kind: action
  params: []

- id: userinterface_extensions_webwidget_save
  label: UserInterface Extensions WebWidget Save
  kind: action
  params: []

- id: userinterface_extensions_widget_action
  label: UserInterface Extensions Widget Action
  kind: action
  params: []

- id: userinterface_extensions_widget_unsetvalue
  label: UserInterface Extensions Widget UnsetValue
  kind: action
  params: []

- id: userinterface_extensions_widget_setvalue
  label: UserInterface Extensions Widget SetValue
  kind: action
  params: []

- id: userinterface_ledcontrol_color_set
  label: UserInterface LedControl Color Set
  kind: action
  params: []

- id: userinterface_message_alert_clear
  label: UserInterface Message Alert Clear
  kind: action
  params: []

- id: userinterface_message_prompt_clear
  label: UserInterface Message Prompt Clear
  kind: action
  params: []

- id: userinterface_message_prompt_response
  label: UserInterface Message Prompt Response
  kind: action
  params: []

- id: userinterface_message_rating_clear
  label: UserInterface Message Rating Clear
  kind: action
  params: []

- id: userinterface_wallpaperbundle_clear
  label: UserInterface WallpaperBundle Clear
  kind: action
  params: []

- id: userinterface_wallpaperbundle_list
  label: UserInterface WallpaperBundle List
  kind: query
  params: []

- id: userinterface_wallpaperbundle_set
  label: UserInterface WallpaperBundle Set
  kind: action
  params: []

- id: userinterface_webview_clear
  label: UserInterface WebView Clear
  kind: action
  params: []

- id: userinterface_webview_display
  label: UserInterface WebView Display
  kind: action
  params: []

- id: usermanagement_remotesupportuser_create
  label: UserManagement RemoteSupportUser Create
  kind: action
  params: []

- id: usermanagement_remotesupportuser_getstate
  label: UserManagement RemoteSupportUser GetState
  kind: query
  params: []

- id: usermanagement_remotesupportuser_delete
  label: UserManagement RemoteSupportUser Delete
  kind: action
  params: []

- id: usermanagement_remotesupportuser_disablepermanently
  label: UserManagement RemoteSupportUser DisablePermanently
  kind: action
  params: []

- id: usermanagement_user_add
  label: UserManagement User Add
  kind: action
  params: []

- id: usermanagement_user_delete
  label: UserManagement User Delete
  kind: action
  params: []

- id: usermanagement_user_get
  label: UserManagement User Get
  kind: query
  params: []

- id: usermanagement_user_list
  label: UserManagement User List
  kind: query
  params: []

- id: usermanagement_user_modify
  label: UserManagement User Modify
  kind: action
  params: []

- id: usermanagement_user_passphrase_change
  label: UserManagement User Passphrase Change
  kind: action
  params: []

- id: usermanagement_user_unblock
  label: UserManagement User Unblock
  kind: action
  params: []

- id: usermanagement_user_passphrase_set
  label: UserManagement User Passphrase Set
  kind: action
  params: []

- id: video_layout_layoutfamily_set
  label: Video Layout LayoutFamily Set
  kind: action
  params: []

- id: video_layout_hidenonvideo_deactivate
  label: Video Layout HideNonVideo Deactivate
  kind: action
  params: []

- id: video_layout_setlayout
  label: Video Layout SetLayout
  kind: action
  params: []

- id: video_matrix_assign
  label: Video Matrix Assign
  kind: action
  params: []

- id: video_matrix_reset
  label: Video Matrix Reset
  kind: action
  params: []

- id: video_matrix_unassign
  label: Video Matrix Unassign
  kind: action
  params: []

- id: video_matrix_swap
  label: Video Matrix Swap
  kind: action
  params: []

- id: video_output_hdmi_passthrough_start
  label: Video Output HDMI Passthrough Start
  kind: action
  params: []

- id: video_output_hdmi_passthrough_stop
  label: Video Output HDMI Passthrough Stop
  kind: action
  params: []

- id: video_output_monitor_color_select
  label: Video Output Monitor Color Select
  kind: action
  params: []

- id: video_output_monitor_backlight_set
  label: Video Output Monitor Backlight Set
  kind: action
  params: []

- id: video_output_monitor_reset
  label: Video Output Monitor Reset
  kind: action
  params: []

- id: video_presentationpip_set
  label: Video PresentationPIP Set
  kind: action
  params: []

- id: video_selfview_set
  label: Video Selfview Set
  kind: action
  params: []

- id: video_presentationview_set
  label: Video PresentationView Set
  kind: action
  params: []

- id: webengine_deletestorage
  label: WebEngine DeleteStorage
  kind: action
  params: []

- id: webengine_logging_set
  label: WebEngine Logging Set
  kind: action
  params: []

- id: webengine_mediaaccess_add
  label: WebEngine MediaAccess Add
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: standby_state
  type: enum
  values: [active, halfwake, standby]
  description: Current standby state (*s Standby Active: On/Off)

- id: call_state
  type: enum
  values: [idle, ringing, connected]
  description: Call connection state from xStatus

- id: audio_volume_level
  type: integer
  description: Current volume level (0..100)

- id: microphones_mute_state
  type: enum
  values: [on, off]
  description: Microphone mute state (*s Audio Microphones Mute: On/Off)

- id: presentation_state
  type: enum
  values: [active, inactive]
  description: Whether a presentation is being shared

- id: outgoing_call_indication
  type: event
  description: Outgoing call about to be dialled, returns CallId

- id: call_disconnect
  type: event
  description: Call disconnected event with CallId and CauseString

- id: call_successful
  type: event
  description: Call connected successfully with CallId and Protocol
```

## Variables
```yaml
- id: audio_default_volume
  type: integer
  min: 0
  max: 100
  description: Default speaker volume (1..100, 0 = off)

- id: audio_input_hdmi_level
  type: integer
  min: -24
  max: 0
  description: HDMI audio input gain in dB

- id: audio_input_microphone_gain
  type: integer
  min: 0
  max: 24
  description: Microphone input gain in dB

- id: cameras_brightness_defaultlevel
  type: integer
  min: 1
  max: 31
  description: Camera brightness level

- id: conference_maxreceivecallrate
  type: integer
  min: 64
  max: 20000
  description: Max receive call rate in kbps

- id: conference_maxtransmitcallrate
  type: integer
  min: 64
  max: 20000
  description: Max transmit call rate in kbps
```

## Events
```yaml
- id: outgoingcallindication
  description: Outgoing call about to be dialled
  payload: CallId

- id: calldisconnect
  description: Call disconnected
  payload: CallId, CauseValue, CauseString, CauseType, OrigCallDirection

- id: callsuccessful
  description: Call connected successfully
  payload: CallId, Protocol, Direction, CallRate, RemoteURI, EncryptionIn, EncryptionOut

- id: feccactionind
  description: Far end FECC command
  payload: Id, Req, Pan, Tilt, Zoom, Focus, Timeout, VideoSrc

- id: tstring_message
  description: TString message received from far end
  payload: CallId, Message

- id: sstring_message
  description: SString message received from far end
  payload: String, Id
```

## Macros
```yaml
# UNRESOLVED: source references macro framework but does not document specific macro sequences
```

## Safety
```yaml
confirmation_required_for:
  - systemunit_factoryreset
  - systemunit_boot
interlocks: []
# UNRESOLVED: no specific safety interlock procedures found in source beyond GPIO pin modes
```

## Notes
- The xAPI is asynchronous; command responses may arrive out of order. Use `resultId` tagging for request-response matching.
- Commands are case-insensitive.
- The API supports three output modes: Terminal (default), XML, and JSON. Set via `xPreferences outputmode`.
- Feedback subscriptions are per-session and limited to 50 expressions. Must re-register after reconnection.
- HTTP API uses `POST /putxml` with `Content-Type: text/xml` for commands/configurations.
- HTTP session authentication via `POST /xmlapi/session/begin` with Basic Auth returns a `SessionId` cookie.
- HTTP feedback (webhooks) support up to 4 feedback slots, each with up to 15 XPath expressions.
- Multiline commands terminate with a period (`.`) on a separate line.
- Serial connection default baud rate is 115200 for most Room Kit devices; some Codec Pro/Room 70 G2 variants support 9600-115200.
- `xFeedback register /Status` should never be used as it may overwhelm the control application.

<!-- UNRESOLVED: specific TCP port numbers for SSH/HTTP not stated in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: WebSocket JSON-RPC command encoding details reference external xAPI over WebSocket guide -->
<!-- UNRESOLVED: complete xStatus and xConfiguration command listings partially extracted — source contains hundreds of configuration entries beyond what is enumerated here -->

## Provenance

```yaml
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-115/api-reference-guide-roomos-115.pdf
retrieved_at: 2026-05-27T04:30:41.488Z
last_checked_at: 2026-06-09T09:09:18.376Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T09:09:18.376Z
matched_actions: 418
action_count: 418
confidence: medium
summary: "Claude(Sonnet) re-verify of the amended on-disk spec: all 418 semantic-id actions map 1:1 to xCommand entries in source; transport confirmed verbatim. Independent confirmation of the prior codex-verified merge. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact port numbers for SSH/HTTP not stated in source (source references <ip-address> placeholders)"
- "firmware version compatibility range not stated"
- "specific TCP port numbers not stated in source"
- "source references macro framework but does not document specific macro sequences"
- "no specific safety interlock procedures found in source beyond GPIO pin modes"
- "specific TCP port numbers for SSH/HTTP not stated in source"
- "WebSocket JSON-RPC command encoding details reference external xAPI over WebSocket guide"
- "complete xStatus and xConfiguration command listings partially extracted — source contains hundreds of configuration entries beyond what is enumerated here"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
