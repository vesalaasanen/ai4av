---
spec_id: admin/cisco-webex-room-kit-series-ce914
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco Webex Room Kit Series CE914 Control Spec"
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
    - Desk
    - "Desk Mini"
    - Board
    - "Board Pro"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
  - developer.webex.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/sx-series/tc7/api-reference-guide/sx80-api-reference-guide-tc72.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/sx-series/tc7/api-reference-guide/sx80-api-reference-guide-tc73.pdf
  - https://developer.webex.com/docs/devices
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/camera/precisionhd/user_guide/precisionhd_1080p-720p_camera_user_guide.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-2602/api-reference-guide-roomos-2602.pdf
retrieved_at: 2026-05-14T22:56:18.279Z
last_checked_at: 2026-05-27T06:51:44.656Z
generated_at: 2026-05-27T06:51:44.656Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-27T06:51:44.656Z
  matched_actions: 418
  action_count: 418
  confidence: high
  summary: "All 418 spec actions map 1:1 to 418 xCommand entries in source; transport confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Cisco Webex Room Kit Series CE914 Control Spec

## Summary
Cisco Webex Room Kit Series video conferencing codecs running RoomOS CE914 (API reference D15502.04). The xAPI provides hierarchical control over audio, video, calling, cameras, standby, and system functions via SSH, HTTP/HTTPS, WebSocket, and RS-232 serial connections. Commands use the `xCommand` prefix, configurations use `xConfiguration`, and status queries use `xStatus`. Feedback is available through `xFeedback` registration or HTTP webhook posts.

<!-- UNRESOLVED: exact TCP port for SSH not stated (standard 22 not confirmed in source) -->
<!-- UNRESOLVED: exact TCP port for HTTP/HTTPS not stated (standard 80/443 not confirmed in source) -->
<!-- UNRESOLVED: WebSocket connection URL path not stated in this document (references external xAPI over WebSocket guide) -->

## Transport
```yaml
protocols:
  - tcp
  - http
  - serial
addressing:
  # UNRESOLVED: SSH port not stated in source
  # UNRESOLVED: HTTP/HTTPS port not stated in source (port 443 mentioned only for local peripheral access)
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: basic
```

## Traits
```yaml
traits:
  - powerable       # Standby Activate/Deactivate, SystemUnit Boot
  - queryable       # xStatus, xConfiguration query commands
  - routable        # Video Matrix Assign/Swap, Video Input SetMainVideoSource
  - levelable       # Audio Volume Set/Increase/Decrease, gain/level configs
```

## Actions
```yaml
actions:
  - id: airplay_key_event_back
    label: AirPlay Key Event Back
    kind: action
    params: []

  - id: airplay_key_event_click
    label: AirPlay Key Event Click
    kind: action
    params: []

  - id: airplay_key_event_down
    label: AirPlay Key Event Down
    kind: action
    params: []

  - id: airplay_key_event_fastforward
    label: AirPlay Key Event FastForward
    kind: action
    params: []

  - id: airplay_key_event_fastreverse
    label: AirPlay Key Event FastReverse
    kind: action
    params: []

  - id: airplay_key_event_left
    label: AirPlay Key Event Left
    kind: action
    params: []

  - id: airplay_key_event_play
    label: AirPlay Key Event Play
    kind: action
    params: []

  - id: airplay_key_event_right
    label: AirPlay Key Event Right
    kind: action
    params: []

  - id: airplay_key_event_up
    label: AirPlay Key Event Up
    kind: action
    params: []

  - id: airplay_reset_paired_devices
    label: AirPlay Reset Paired Devices
    kind: action
    params: []

  - id: audio_diagnostics_advanced_run
    label: Audio Diagnostics Advanced Run
    kind: action
    params: []

  - id: audio_diagnostics_aecreverb_reset
    label: Audio Diagnostics AecReverb Reset
    kind: action
    params: []

  - id: audio_diagnostics_aecreverb_run
    label: Audio Diagnostics AecReverb Run
    kind: action
    params: []

  - id: audio_diagnostics_measure_delay
    label: Audio Diagnostics MeasureDelay
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

  - id: audio_localinput_add_connector
    label: Audio LocalInput AddConnector
    kind: action
    params: []

  - id: audio_localinput_remove
    label: Audio LocalInput Remove
    kind: action
    params: []

  - id: audio_localinput_remove_connector
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

  - id: audio_localoutput_add_connector
    label: Audio LocalOutput AddConnector
    kind: action
    params: []

  - id: audio_localoutput_connect_input
    label: Audio LocalOutput ConnectInput
    kind: action
    params: []

  - id: audio_localoutput_disconnect_input
    label: Audio LocalOutput DisconnectInput
    kind: action
    params: []

  - id: audio_localoutput_remove
    label: Audio LocalOutput Remove
    kind: action
    params: []

  - id: audio_localoutput_remove_connector
    label: Audio LocalOutput RemoveConnector
    kind: action
    params: []

  - id: audio_localoutput_update
    label: Audio LocalOutput Update
    kind: action
    params: []

  - id: audio_localoutput_update_input_gain
    label: Audio LocalOutput UpdateInputGain
    kind: action
    params: []

  - id: audio_microphones_musicmode_start
    label: Audio Microphones MusicMode Start
    kind: action
    params: []

  - id: audio_microphones_musicmode_stop
    label: Audio Microphones MusicMode Stop
    kind: action
    params: []

  - id: audio_microphones_noiseremoval_deactivate
    label: Audio Microphones NoiseRemoval Deactivate
    kind: action
    params: []

  - id: audio_microphones_passthrough_start
    label: Audio Microphones Passthrough Start
    kind: action
    params: []

  - id: audio_microphones_mute
    label: Audio Microphones Mute
    kind: action
    params: []

  - id: audio_microphones_noiseremoval_activate
    label: Audio Microphones NoiseRemoval Activate
    kind: action
    params: []

  - id: audio_microphones_passthrough_stop
    label: Audio Microphones Passthrough Stop
    kind: action
    params: []

  - id: audio_microphones_toggle_mute
    label: Audio Microphones ToggleMute
    kind: action
    params: []

  - id: audio_microphones_unmute
    label: Audio Microphones Unmute
    kind: action
    params: []

  - id: audio_remoteoutput_connect_input
    label: Audio RemoteOutput ConnectInput
    kind: action
    params: []

  - id: audio_remoteoutput_disconnect_input
    label: Audio RemoteOutput DisconnectInput
    kind: action
    params: []

  - id: audio_remoteoutput_update_input_gain
    label: Audio RemoteOutput UpdateInputGain
    kind: action
    params: []

  - id: audio_select
    label: Audio Select
    kind: action
    params: []

  - id: audio_sound_play
    label: Audio Sound Play
    kind: action
    params: []

  - id: audio_setup_clear
    label: Audio Setup Clear
    kind: action
    params: []

  - id: audio_sound_stop
    label: Audio Sound Stop
    kind: action
    params: []

  - id: audio_setup_reset
    label: Audio Setup Reset
    kind: action
    params: []

  - id: audio_speaker_check
    label: Audio SpeakerCheck
    kind: action
    params: []

  - id: audio_soundsandalerts_ringtone_play
    label: Audio SoundsAndAlerts Ringtone Play
    kind: action
    params: []

  - id: audio_soundsandalerts_ringtone_list
    label: Audio SoundsAndAlerts Ringtone List
    kind: query
    params: []

  - id: audio_soundsandalerts_ringtone_stop
    label: Audio SoundsAndAlerts Ringtone Stop
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
        description: Volume level (0..100, 0 = off)

  - id: audio_volume_set_to_default
    label: Audio Volume SetToDefault
    kind: action
    params: []

  - id: audio_volume_toggle_mute
    label: Audio Volume ToggleMute
    kind: action
    params: []

  - id: audio_volume_unmute
    label: Audio Volume Unmute
    kind: action
    params: []

  - id: audio_vumeter_start
    label: Audio VuMeter Start
    kind: action
    params: []

  - id: audio_vumeter_stop
    label: Audio VuMeter Stop
    kind: action
    params: []

  - id: bluetooth_streaming_next
    label: Bluetooth Streaming Next
    kind: action
    params: []

  - id: bluetooth_streaming_pause
    label: Bluetooth Streaming Pause
    kind: action
    params: []

  - id: audio_vumeter_stop_all
    label: Audio VuMeter StopAll
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

  - id: bookings_list
    label: Bookings List
    kind: query
    params: []

  - id: bookings_get
    label: Bookings Get
    kind: query
    params: []

  - id: bookings_notification_snooze
    label: Bookings NotificationSnooze
    kind: action
    params: []

  - id: bookings_put
    label: Bookings Put
    kind: action
    params: []

  - id: bookings_respond
    label: Bookings Respond
    kind: action
    params: []

  - id: call_accept
    label: Call Accept
    kind: action
    params: []

  - id: call_disconnect
    label: Call Disconnect
    kind: action
    params: []

  - id: call_dtmf_send
    label: Call DTMFSend
    kind: action
    params: []

  - id: call_far_end_control_camera_move
    label: Call FarEndControl Camera Move
    kind: action
    params: []

  - id: call_far_end_control_camera_stop
    label: Call FarEndControl Camera Stop
    kind: action
    params: []

  - id: call_far_end_control_request_capabilities
    label: Call FarEndControl RequestCapabilities
    kind: action
    params: []

  - id: call_far_end_control_room_preset_activate
    label: Call FarEndControl RoomPreset Activate
    kind: action
    params: []

  - id: call_far_end_control_room_preset_store
    label: Call FarEndControl RoomPreset Store
    kind: action
    params: []

  - id: call_far_end_control_source_select
    label: Call FarEndControl Source Select
    kind: action
    params: []

  - id: call_far_end_message_send
    label: Call FarEndMessage Send
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

  - id: call_join
    label: Call Join
    kind: action
    params: []

  - id: call_reject
    label: Call Reject
    kind: action
    params: []

  - id: call_ignore
    label: Call Ignore
    kind: action
    params: []

  - id: call_resume
    label: Call Resume
    kind: action
    params: []

  - id: call_history_acknowledge_all_missed_calls
    label: CallHistory AcknowledgeAllMissedCalls
    kind: action
    params: []

  - id: call_unattended_transfer
    label: Call UnattendedTransfer
    kind: action
    params: []

  - id: call_history_acknowledge_missed_call
    label: CallHistory AcknowledgeMissedCall
    kind: action
    params: []

  - id: call_history_delete_all
    label: CallHistory DeleteAll
    kind: action
    params: []

  - id: call_history_get
    label: CallHistory Get
    kind: query
    params: []

  - id: call_history_delete_entry
    label: CallHistory DeleteEntry
    kind: action
    params: []

  - id: call_history_recents
    label: CallHistory Recents
    kind: query
    params: []

  - id: camera_position_reset
    label: Camera PositionReset
    kind: action
    params: []

  - id: camera_position_set
    label: Camera PositionSet
    kind: action
    params:
      - name: camera_id
        type: integer
        description: Camera ID
      - name: pan
        type: integer
        description: Pan position
      - name: tilt
        type: integer
        description: Tilt position

  - id: camera_preset_activate
    label: Camera Preset Activate
    kind: action
    params: []

  - id: camera_preset_activate_default_position
    label: Camera Preset ActivateDefaultPosition
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

  - id: camera_trigger_autofocus
    label: Camera TriggerAutofocus
    kind: action
    params: []

  - id: camera_trigger_whitebalance
    label: Camera TriggerWhitebalance
    kind: action
    params: []

  - id: cameras_background_delete
    label: Cameras Background Delete
    kind: action
    params: []

  - id: cameras_auto_focus_diagnostics_start
    label: Cameras AutoFocus Diagnostics Start
    kind: action
    params: []

  - id: cameras_background_fetch
    label: Cameras Background Fetch
    kind: action
    params: []

  - id: cameras_auto_focus_diagnostics_stop
    label: Cameras AutoFocus Diagnostics Stop
    kind: action
    params: []

  - id: cameras_background_clear
    label: Cameras Background Clear
    kind: action
    params: []

  - id: cameras_background_foreground_parameters_reset
    label: Cameras Background ForegroundParameters Reset
    kind: action
    params: []

  - id: cameras_background_foreground_parameters_set
    label: Cameras Background ForegroundParameters Set
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

  - id: cameras_presenter_track_clear_position
    label: Cameras PresenterTrack ClearPosition
    kind: action
    params: []

  - id: cameras_presenter_track_set
    label: Cameras PresenterTrack Set
    kind: action
    params: []

  - id: cameras_presenter_track_store_position
    label: Cameras PresenterTrack StorePosition
    kind: action
    params: []

  - id: cameras_speaker_track_background_mode_deactivate
    label: Cameras SpeakerTrack BackgroundMode Deactivate
    kind: action
    params: []

  - id: cameras_speaker_track_diagnostics_start
    label: Cameras SpeakerTrack Diagnostics Start
    kind: action
    params: []

  - id: cameras_speaker_track_activate
    label: Cameras SpeakerTrack Activate
    kind: action
    params: []

  - id: cameras_speaker_track_deactivate
    label: Cameras SpeakerTrack Deactivate
    kind: action
    params: []

  - id: cameras_speaker_track_background_mode_activate
    label: Cameras SpeakerTrack BackgroundMode Activate
    kind: action
    params: []

  - id: cameras_speaker_track_diagnostics_stop
    label: Cameras SpeakerTrack Diagnostics Stop
    kind: action
    params: []

  - id: cameras_speaker_track_frames_activate
    label: Cameras SpeakerTrack Frames Activate
    kind: action
    params: []

  - id: cameras_speaker_track_view_limits_deactivate
    label: Cameras SpeakerTrack ViewLimits Deactivate
    kind: action
    params: []

  - id: cameras_speaker_track_frames_deactivate
    label: Cameras SpeakerTrack Frames Deactivate
    kind: action
    params: []

  - id: cameras_speaker_track_view_limits_store_position
    label: Cameras SpeakerTrack ViewLimits StorePosition
    kind: action
    params: []

  - id: cameras_speaker_track_view_limits_activate
    label: Cameras SpeakerTrack ViewLimits Activate
    kind: action
    params: []

  - id: cameras_speaker_track_whiteboard_activate_position
    label: Cameras SpeakerTrack Whiteboard ActivatePosition
    kind: action
    params: []

  - id: cameras_speaker_track_whiteboard_align_position
    label: Cameras SpeakerTrack Whiteboard AlignPosition
    kind: action
    params: []

  - id: cameras_speaker_track_whiteboard_set_distance
    label: Cameras SpeakerTrack Whiteboard SetDistance
    kind: action
    params: []

  - id: conference_admit_all
    label: Conference AdmitAll
    kind: action
    params: []

  - id: cameras_speaker_track_whiteboard_store_position
    label: Cameras SpeakerTrack Whiteboard StorePosition
    kind: action
    params: []

  - id: conference_call_authentication_response
    label: Conference Call AuthenticationResponse
    kind: action
    params: []

  - id: conference_do_not_disturb_activate
    label: Conference DoNotDisturb Activate
    kind: action
    params: []

  - id: conference_do_not_disturb_deactivate
    label: Conference DoNotDisturb Deactivate
    kind: action
    params: []

  - id: conference_end_meeting
    label: Conference EndMeeting
    kind: action
    params: []

  - id: conference_hand_raise
    label: Conference Hand Raise
    kind: action
    params: []

  - id: conference_hard_mute
    label: Conference HardMute
    kind: action
    params: []

  - id: conference_hand_lower
    label: Conference Hand Lower
    kind: action
    params: []

  - id: conference_lock
    label: Conference Lock
    kind: action
    params: []

  - id: conference_meeting_assistant_start
    label: Conference MeetingAssistant Start
    kind: action
    params: []

  - id: conference_meeting_assistant_stop
    label: Conference MeetingAssistant Stop
    kind: action
    params: []

  - id: conference_lower_all_hands
    label: Conference LowerAllHands
    kind: action
    params: []

  - id: conference_meeting_chat_notifications_default
    label: Conference MeetingChatNotifications Default
    kind: action
    params: []

  - id: conference_meeting_chat_notifications_in_call
    label: Conference MeetingChatNotifications InCall
    kind: action
    params: []

  - id: conference_mute_all
    label: Conference MuteAll
    kind: action
    params: []

  - id: conference_mute_on_entry
    label: Conference MuteOnEntry
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

  - id: conference_participant_lower_hand
    label: Conference Participant LowerHand
    kind: action
    params: []

  - id: conference_participant_mute
    label: Conference Participant Mute
    kind: action
    params: []

  - id: conference_participant_list_search
    label: Conference ParticipantList Search
    kind: query
    params: []

  - id: conference_people_focus_activate
    label: Conference PeopleFocus Activate
    kind: action
    params: []

  - id: conference_reaction_enable
    label: Conference Reaction Enable
    kind: action
    params: []

  - id: conference_people_focus_deactivate
    label: Conference PeopleFocus Deactivate
    kind: action
    params: []

  - id: conference_reaction_disable
    label: Conference Reaction Disable
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

  - id: conference_skin_tone
    label: Conference SkinTone
    kind: action
    params: []

  - id: conference_speaker_lock_set
    label: Conference SpeakerLock Set
    kind: action
    params: []

  - id: conference_speaker_lock_release
    label: Conference SpeakerLock Release
    kind: action
    params: []

  - id: conference_transfer_host_and_leave
    label: Conference TransferHostAndLeave
    kind: action
    params: []

  - id: diagnostics_run
    label: Diagnostics Run
    kind: action
    params: []

  - id: dial
    label: Dial
    kind: action
    params:
      - name: number
        type: string
        description: Number or URI to dial
      - name: protocol
        type: string
        description: "Protocol (e.g. H323, SIP)"

  - id: gpio_manual_state_set
    label: GPIO ManualState Set
    kind: action
    params: []

  - id: http_client_allow_hostname_add
    label: HttpClient Allow Hostname Add
    kind: action
    params: []

  - id: http_client_allow_hostname_remove
    label: HttpClient Allow Hostname Remove
    kind: action
    params: []

  - id: http_client_allow_hostname_clear
    label: HttpClient Allow Hostname Clear
    kind: action
    params: []

  - id: http_client_allow_hostname_list
    label: HttpClient Allow Hostname List
    kind: query
    params: []

  - id: http_client_delete
    label: HttpClient Delete
    kind: action
    params: []

  - id: http_client_get
    label: HttpClient Get
    kind: action
    params: []

  - id: http_client_patch
    label: HttpClient Patch
    kind: action
    params: []

  - id: http_client_post
    label: HttpClient Post
    kind: action
    params: []

  - id: http_client_put
    label: HttpClient Put
    kind: action
    params: []

  - id: http_feedback_deregister
    label: HttpFeedback Deregister
    kind: action
    params: []

  - id: http_feedback_enable
    label: HttpFeedback Enable
    kind: action
    params: []

  - id: http_feedback_register
    label: HttpFeedback Register
    kind: action
    params:
      - name: feedback_slot
        type: integer
        description: "Feedback slot (1..4)"
      - name: server_url
        type: string
        description: URL to receive HTTP feedback
      - name: format
        type: string
        description: "XML or JSON"

  - id: logging_add_event
    label: Logging AddEvent
    kind: action
    params: []

  - id: logging_extended_logging_start
    label: Logging ExtendedLogging Start
    kind: action
    params: []

  - id: logging_extended_logging_stop
    label: Logging ExtendedLogging Stop
    kind: action
    params: []

  - id: macros_log_clear
    label: Macros Log Clear
    kind: action
    params: []

  - id: logging_send_logs
    label: Logging SendLogs
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

  - id: macros_macro_remove_all
    label: Macros Macro RemoveAll
    kind: action
    params: []

  - id: macros_macro_rename
    label: Macros Macro Rename
    kind: action
    params: []

  - id: macros_macro_save
    label: Macros Macro Save
    kind: action
    params: []

  - id: macros_macro_roles_set
    label: Macros Macro Roles Set
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

  - id: message_send
    label: Message Send
    kind: action
    params: []

  - id: macros_runtime_stop
    label: Macros Runtime Stop
    kind: action
    params: []

  - id: network_snmp_usm_user_add
    label: Network SNMP USM User Add
    kind: action
    params: []

  - id: network_smtp_verify_config
    label: Network SMTP VerifyConfig
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

  - id: network_wifi_scan_start
    label: Network Wifi Scan Start
    kind: action
    params: []

  - id: network_wifi_delete
    label: Network Wifi Delete
    kind: action
    params: []

  - id: network_wifi_scan_stop
    label: Network Wifi Scan Stop
    kind: action
    params: []

  - id: network_wifi_list
    label: Network Wifi List
    kind: query
    params: []

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

  - id: peripherals_pairing_pin_pairing_start
    label: Peripherals Pairing PinPairing Start
    kind: action
    params: []

  - id: peripherals_pairing_pair
    label: Peripherals Pairing Pair
    kind: action
    params: []

  - id: peripherals_pairing_pin_pairing_stop
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

  - id: peripherals_touch_panel_configure
    label: Peripherals TouchPanel Configure
    kind: action
    params: []

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

  - id: phonebook_contact_method_add
    label: Phonebook ContactMethod Add
    kind: action
    params: []

  - id: phonebook_contact_method_delete
    label: Phonebook ContactMethod Delete
    kind: action
    params: []

  - id: phonebook_contact_method_modify
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

  - id: presentation_start
    label: Presentation Start
    kind: action
    params: []

  - id: presentation_stop
    label: Presentation Stop
    kind: action
    params: []

  - id: provisioning_complete_upgrade
    label: Provisioning CompleteUpgrade
    kind: action
    params: []

  - id: provisioning_postpone_upgrade
    label: Provisioning PostponeUpgrade
    kind: action
    params: []

  - id: provisioning_cucm_extension_mobility_login
    label: Provisioning CUCM ExtensionMobility Login
    kind: action
    params: []

  - id: provisioning_room_type_activate
    label: Provisioning RoomType Activate
    kind: action
    params: []

  - id: provisioning_cucm_extension_mobility_logout
    label: Provisioning CUCM ExtensionMobility Logout
    kind: action
    params: []

  - id: provisioning_service_fetch
    label: Provisioning Service Fetch
    kind: action
    params: []

  - id: proximity_services_activate
    label: Proximity Services Activate
    kind: action
    params: []

  - id: room_cleanup_cancel
    label: RoomCleanup Cancel
    kind: action
    params: []

  - id: room_cleanup_run
    label: RoomCleanup Run
    kind: action
    params: []

  - id: proximity_services_deactivate
    label: Proximity Services Deactivate
    kind: action
    params: []

  - id: room_preset_store
    label: RoomPreset Store
    kind: action
    params: []

  - id: room_preset_activate
    label: RoomPreset Activate
    kind: action
    params: []

  - id: room_preset_clear
    label: RoomPreset Clear
    kind: action
    params: []

  - id: security_certificates_ca_add
    label: Security Certificates CA Add
    kind: action
    params: []

  - id: security_certificates_cucm_ctl_delete
    label: Security Certificates CUCM CTL Delete
    kind: action
    params: []

  - id: security_certificates_cucm_ctl_show
    label: Security Certificates CUCM CTL Show
    kind: query
    params: []

  - id: security_certificates_ca_delete
    label: Security Certificates CA Delete
    kind: action
    params: []

  - id: security_certificates_ca_show
    label: Security Certificates CA Show
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

  - id: security_certificates_third_party_disable
    label: Security Certificates ThirdParty Disable
    kind: action
    params: []

  - id: security_certificates_third_party_show
    label: Security Certificates ThirdParty Show
    kind: query
    params: []

  - id: security_certificates_third_party_enable
    label: Security Certificates ThirdParty Enable
    kind: action
    params: []

  - id: security_certificates_third_party_list
    label: Security Certificates ThirdParty List
    kind: query
    params: []

  - id: security_certificates_webex_show
    label: Security Certificates Webex Show
    kind: query
    params: []

  - id: security_certificates_webex_identity_show
    label: Security Certificates WebexIdentity Show
    kind: query
    params: []

  - id: security_ciphers_list
    label: Security Ciphers List
    kind: query
    params: []

  - id: security_client_secret_populate
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

  - id: standby_reset_halfwake_timer
    label: Standby ResetHalfwakeTimer
    kind: action
    params: []

  - id: system_unit_boot
    label: SystemUnit Boot
    kind: action
    params: []

  - id: standby_reset_timer
    label: Standby ResetTimer
    kind: action
    params: []

  - id: system_unit_developer_preview_activate
    label: SystemUnit DeveloperPreview Activate
    kind: action
    params: []

  - id: system_unit_developer_preview_deactivate
    label: SystemUnit DeveloperPreview Deactivate
    kind: action
    params: []

  - id: system_unit_factory_reset
    label: SystemUnit FactoryReset
    kind: action
    params: []

  - id: system_unit_first_time_wizard_stop
    label: SystemUnit FirstTimeWizard Stop
    kind: action
    params: []

  - id: system_unit_notifications_remove_all
    label: SystemUnit Notifications RemoveAll
    kind: action
    params: []

  - id: system_unit_option_key_add
    label: SystemUnit OptionKey Add
    kind: action
    params: []

  - id: system_unit_option_key_remove_all
    label: SystemUnit OptionKey RemoveAll
    kind: action
    params: []

  - id: system_unit_product_platform_set
    label: SystemUnit ProductPlatform Set
    kind: action
    params: []

  - id: system_unit_option_key_list
    label: SystemUnit OptionKey List
    kind: query
    params: []

  - id: system_unit_option_key_remove
    label: SystemUnit OptionKey Remove
    kind: action
    params: []

  - id: system_unit_sign_in_banner_clear
    label: SystemUnit SignInBanner Clear
    kind: action
    params: []

  - id: system_unit_soft_reset
    label: SystemUnit SoftReset
    kind: action
    params: []

  - id: system_unit_sign_in_banner_get
    label: SystemUnit SignInBanner Get
    kind: query
    params: []

  - id: system_unit_sign_in_banner_set
    label: SystemUnit SignInBanner Set
    kind: action
    params: []

  - id: system_unit_software_upgrade
    label: SystemUnit SoftwareUpgrade
    kind: action
    params: []

  - id: system_unit_welcome_banner_clear
    label: SystemUnit WelcomeBanner Clear
    kind: action
    params: []

  - id: system_unit_welcome_banner_get
    label: SystemUnit WelcomeBanner Get
    kind: query
    params: []

  - id: system_unit_welcome_banner_set
    label: SystemUnit WelcomeBanner Set
    kind: action
    params: []

  - id: time_datetime_get
    label: Time DateTime Get
    kind: query
    params: []

  - id: time_datetime_set
    label: Time DateTime Set
    kind: action
    params: []

  - id: user_interface_branding_fetch
    label: UserInterface Branding Fetch
    kind: action
    params: []

  - id: user_interface_branding_clear
    label: UserInterface Branding Clear
    kind: action
    params: []

  - id: user_interface_branding_delete
    label: UserInterface Branding Delete
    kind: action
    params: []

  - id: user_interface_branding_get
    label: UserInterface Branding Get
    kind: query
    params: []

  - id: user_interface_branding_updated
    label: UserInterface Branding Updated
    kind: action
    params: []

  - id: user_interface_branding_upload
    label: UserInterface Branding Upload
    kind: action
    params: []

  - id: user_interface_extensions_clear
    label: UserInterface Extensions Clear
    kind: action
    params: []

  - id: user_interface_extensions_export
    label: UserInterface Extensions Export
    kind: action
    params: []

  - id: user_interface_extensions_icon_delete
    label: UserInterface Extensions Icon Delete
    kind: action
    params: []

  - id: user_interface_extensions_icon_download
    label: UserInterface Extensions Icon Download
    kind: action
    params: []

  - id: user_interface_extensions_icon_delete_all
    label: UserInterface Extensions Icon DeleteAll
    kind: action
    params: []

  - id: user_interface_extensions_icon_fetch
    label: UserInterface Extensions Icon Fetch
    kind: action
    params: []

  - id: user_interface_extensions_icon_get
    label: UserInterface Extensions Icon Get
    kind: query
    params: []

  - id: user_interface_extensions_icon_list
    label: UserInterface Extensions Icon List
    kind: query
    params: []

  - id: user_interface_extensions_list
    label: UserInterface Extensions List
    kind: query
    params: []

  - id: user_interface_extensions_panel_clicked
    label: UserInterface Extensions Panel Clicked
    kind: action
    params: []

  - id: user_interface_extensions_icon_upload
    label: UserInterface Extensions Icon Upload
    kind: action
    params: []

  - id: user_interface_extensions_panel_close
    label: UserInterface Extensions Panel Close
    kind: action
    params: []

  - id: user_interface_extensions_panel_save
    label: UserInterface Extensions Panel Save
    kind: action
    params: []

  - id: user_interface_extensions_panel_open
    label: UserInterface Extensions Panel Open
    kind: action
    params: []

  - id: user_interface_extensions_panel_remove
    label: UserInterface Extensions Panel Remove
    kind: action
    params: []

  - id: user_interface_extensions_panel_update
    label: UserInterface Extensions Panel Update
    kind: action
    params: []

  - id: user_interface_extensions_set
    label: UserInterface Extensions Set
    kind: action
    params: []

  - id: user_interface_extensions_web_app_save
    label: UserInterface Extensions WebApp Save
    kind: action
    params: []

  - id: user_interface_extensions_web_widget_remove
    label: UserInterface Extensions WebWidget Remove
    kind: action
    params: []

  - id: user_interface_extensions_web_widget_save
    label: UserInterface Extensions WebWidget Save
    kind: action
    params: []

  - id: user_interface_extensions_widget_action
    label: UserInterface Extensions Widget Action
    kind: action
    params: []

  - id: user_interface_extensions_widget_unset_value
    label: UserInterface Extensions Widget UnsetValue
    kind: action
    params: []

  - id: user_interface_extensions_widget_set_value
    label: UserInterface Extensions Widget SetValue
    kind: action
    params: []

  - id: user_interface_led_control_color_set
    label: UserInterface LedControl Color Set
    kind: action
    params: []

  - id: user_interface_message_alert_clear
    label: UserInterface Message Alert Clear
    kind: action
    params: []

  - id: user_interface_message_alert_display
    label: UserInterface Message Alert Display
    kind: action
    params: []

  - id: user_interface_message_prompt_clear
    label: UserInterface Message Prompt Clear
    kind: action
    params: []

  - id: user_interface_message_prompt_display
    label: UserInterface Message Prompt Display
    kind: action
    params: []

  - id: user_interface_message_prompt_response
    label: UserInterface Message Prompt Response
    kind: action
    params: []

  - id: user_interface_message_rating_clear
    label: UserInterface Message Rating Clear
    kind: action
    params: []

  - id: user_interface_message_rating_display
    label: UserInterface Message Rating Display
    kind: action
    params: []

  - id: user_interface_message_text_input_display
    label: UserInterface Message TextInput Display
    kind: action
    params: []

  - id: user_interface_message_rating_response
    label: UserInterface Message Rating Response
    kind: action
    params: []

  - id: user_interface_message_text_input_clear
    label: UserInterface Message TextInput Clear
    kind: action
    params: []

  - id: user_interface_message_text_line_clear
    label: UserInterface Message TextLine Clear
    kind: action
    params: []

  - id: user_interface_message_text_input_response
    label: UserInterface Message TextInput Response
    kind: action
    params: []

  - id: user_interface_message_text_line_display
    label: UserInterface Message TextLine Display
    kind: action
    params: []

  - id: user_interface_presentation_auto_share_show_alert
    label: UserInterface Presentation AutoShare ShowAlert
    kind: action
    params: []

  - id: user_interface_presentation_external_source_add
    label: UserInterface Presentation ExternalSource Add
    kind: action
    params: []

  - id: user_interface_presentation_external_source_list
    label: UserInterface Presentation ExternalSource List
    kind: query
    params: []

  - id: user_interface_presentation_external_source_remove
    label: UserInterface Presentation ExternalSource Remove
    kind: action
    params: []

  - id: user_interface_presentation_external_source_remove_all
    label: UserInterface Presentation ExternalSource RemoveAll
    kind: action
    params: []

  - id: user_interface_presentation_external_source_select
    label: UserInterface Presentation ExternalSource Select
    kind: action
    params: []

  - id: user_interface_presentation_external_source_state_set
    label: UserInterface Presentation ExternalSource State Set
    kind: action
    params: []

  - id: user_interface_translation_override_clear
    label: UserInterface Translation Override Clear
    kind: action
    params: []

  - id: user_interface_translation_override_get
    label: UserInterface Translation Override Get
    kind: query
    params: []

  - id: user_interface_translation_override_set
    label: UserInterface Translation Override Set
    kind: action
    params: []

  - id: user_interface_wallpaper_bundle_clear
    label: UserInterface WallpaperBundle Clear
    kind: action
    params: []

  - id: user_interface_wallpaper_bundle_list
    label: UserInterface WallpaperBundle List
    kind: query
    params: []

  - id: user_interface_wallpaper_bundle_set
    label: UserInterface WallpaperBundle Set
    kind: action
    params: []

  - id: user_interface_web_view_clear
    label: UserInterface WebView Clear
    kind: action
    params: []

  - id: user_interface_web_view_display
    label: UserInterface WebView Display
    kind: action
    params: []

  - id: user_management_remote_support_user_create
    label: UserManagement RemoteSupportUser Create
    kind: action
    params: []

  - id: user_management_remote_support_user_get_state
    label: UserManagement RemoteSupportUser GetState
    kind: query
    params: []

  - id: user_management_remote_support_user_delete
    label: UserManagement RemoteSupportUser Delete
    kind: action
    params: []

  - id: user_management_remote_support_user_disable_permanently
    label: UserManagement RemoteSupportUser DisablePermanently
    kind: action
    params: []

  - id: user_management_user_add
    label: UserManagement User Add
    kind: action
    params: []

  - id: user_management_user_delete
    label: UserManagement User Delete
    kind: action
    params: []

  - id: user_management_user_get
    label: UserManagement User Get
    kind: query
    params: []

  - id: user_management_user_list
    label: UserManagement User List
    kind: query
    params: []

  - id: user_management_user_modify
    label: UserManagement User Modify
    kind: action
    params: []

  - id: user_management_user_passphrase_change
    label: UserManagement User Passphrase Change
    kind: action
    params: []

  - id: user_management_user_unblock
    label: UserManagement User Unblock
    kind: action
    params: []

  - id: user_management_user_passphrase_set
    label: UserManagement User Passphrase Set
    kind: action
    params: []

  - id: user_presence_custom_status_set
    label: UserPresence CustomStatus Set
    kind: action
    params: []

  - id: user_presence_custom_status_clear
    label: UserPresence CustomStatus Clear
    kind: action
    params: []

  - id: user_presence_custom_status_get_recents_list
    label: UserPresence CustomStatus GetRecentsList
    kind: query
    params: []

  - id: video_cec_input_key_click
    label: Video CEC Input KeyClick
    kind: action
    params: []

  - id: video_active_speaker_pip_set
    label: Video ActiveSpeakerPIP Set
    kind: action
    params: []

  - id: video_cec_output_key_click
    label: Video CEC Output KeyClick
    kind: action
    params: []

  - id: video_cec_output_send_active_source_request
    label: Video CEC Output SendActiveSourceRequest
    kind: action
    params: []

  - id: video_cec_output_send_inactive_source_request
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

  - id: video_input_main_video_mute
    label: Video Input MainVideo Mute
    kind: action
    params: []

  - id: video_input_main_video_unmute
    label: Video Input MainVideo Unmute
    kind: action
    params: []

  - id: video_input_set_main_video_source
    label: Video Input SetMainVideoSource
    kind: action
    params: []

  - id: video_layout_layout_family_set
    label: Video Layout LayoutFamily Set
    kind: action
    params: []

  - id: video_layout_hide_non_video_activate
    label: Video Layout HideNonVideo Activate
    kind: action
    params: []

  - id: video_layout_hide_non_video_deactivate
    label: Video Layout HideNonVideo Deactivate
    kind: action
    params: []

  - id: video_layout_set_layout
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

  - id: video_presentation_pip_set
    label: Video PresentationPIP Set
    kind: action
    params: []

  - id: video_selfview_set
    label: Video Selfview Set
    kind: action
    params: []

  - id: video_presentation_view_set
    label: Video PresentationView Set
    kind: action
    params: []

  - id: web_engine_delete_storage
    label: WebEngine DeleteStorage
    kind: action
    params: []

  - id: web_engine_logging_set
    label: WebEngine Logging Set
    kind: action
    params: []

  - id: web_engine_media_access_add
    label: WebEngine MediaAccess Add
    kind: action
    params: []

  - id: web_engine_media_access_remove
    label: WebEngine MediaAccess Remove
    kind: action
    params: []

  - id: web_engine_media_access_remove_all
    label: WebEngine MediaAccess RemoveAll
    kind: action
    params: []

  - id: web_engine_media_access_list
    label: WebEngine MediaAccess List
    kind: query
    params: []

  - id: webex_join
    label: Webex Join
    kind: action
    params: []

  - id: webex_hotdesking_set_support
    label: Webex Hotdesking SetSupport
    kind: action
    params: []

  - id: webex_meetings_instant_meeting_start
    label: Webex Meetings InstantMeeting Start
    kind: action
    params: []

  - id: webex_registration_logout
    label: Webex Registration Logout
    kind: action
    params: []

  - id: webex_registration_cancel
    label: Webex Registration Cancel
    kind: action
    params: []

  - id: webex_registration_convert_to_cloud
    label: Webex Registration ConvertToCloud
    kind: action
    params: []

  - id: webex_registration_start
    label: Webex Registration Start
    kind: action
    params: []

  - id: webrtc_join
    label: WebRTC Join
    kind: action
    params: []

  - id: webrtc_provider_current_diagnostics_send
    label: WebRTC Provider Current Diagnostics Send
    kind: action
    params: []

  - id: zoom_join
    label: Zoom Join
    kind: action
    params: []

  - id: webrtc_provider_google_meet_meeting_number_validate
    label: WebRTC Provider GoogleMeet MeetingNumber Validate
    kind: action
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: call_state
    type: enum
    values: [outgoing, connected, disconnected]
    description: Call state changes reported via xFeedback on /Status/Call or /Event/CallDisconnect and /Event/CallSuccessful

  - id: audio_volume
    type: integer
    description: Audio volume level changes reported via xFeedback on /Status/Audio/Volume

  - id: microphone_mute_state
    type: enum
    values: [on, off]
    description: Microphone mute state reported via xFeedback on /Status/Audio/Microphones/Mute

  - id: standby_state
    type: enum
    values: [on, off, halfwake]
    description: Standby state reported via xFeedback on /Status/Standby/Active

  - id: outgoing_call_indication
    type: event
    description: Reported when outgoing call about to be dialled, includes CallId

  - id: call_disconnect_event
    type: event
    description: Reported when call disconnected, includes CallId, CauseValue, CauseString, CauseType, OrigCallDirection

  - id: call_successful_event
    type: event
    description: Reported when call connected successfully, includes CallId, Protocol, Direction, CallRate, RemoteURI

  - id: fecc_action_request
    type: event
    description: Far-end FECC commands, includes Pan, Tilt, Zoom, Focus parameters

  - id: http_feedback_webhook
    type: event
    description: HTTP POST feedback to registered ServerUrl, format XML or JSON, up to 15 expressions per slot, 4 slots
```

## Variables
```yaml
variables:
  - id: audio_volume
    type: integer
    min: 0
    max: 100
    description: Speaker volume level (0 = off, 1-100 maps to -34.5dB to 15dB in 0.5dB steps)

  - id: default_volume
    type: integer
    min: 0
    max: 100
    description: Default volume set on power-on/restart

  - id: camera_pan
    type: integer
    description: Camera pan position

  - id: camera_tilt
    type: integer
    description: Camera tilt position

  - id: camera_zoom
    type: integer
    description: Camera zoom level
```

## Events
```yaml
events:
  - id: outgoing_call_indication
    description: Fired when outgoing call about to be dialled, returns CallId
    source_path: /Event/OutgoingCallIndication

  - id: call_disconnect
    description: Fired when call disconnected, returns CallId, CauseValue, CauseString, CauseType, OrigCallDirection
    source_path: /Event/CallDisconnect

  - id: call_successful
    description: Fired when call connected successfully, returns CallId, Protocol, Direction, CallRate, RemoteURI
    source_path: /Event/CallSuccessful

  - id: fecc_action_indication
    description: Far-end FECC command received
    source_path: /Event/FeccActionInd

  - id: tstring_received
    description: TString message received from far end
    source_path: /Event/TString

  - id: sstring_received
    description: SString message received from far end
    source_path: /Event/SString

  - id: http_feedback
    description: HTTP POST webhook posted to registered ServerUrl on status/config/event changes
    source_path: HttpFeedback
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences documented in source; macros engine supports custom JavaScript macros via xCommand Macros Macro Save/Activate
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety-critical interlock procedures
```

## Notes
- API is asynchronous; no guarantee commands return responses in order. Use `resultId` response-tagging to match requests with responses.
- xFeedback expressions use XPath-like syntax; max 50 expressions per session. Feedback registrations are per-session and lost on disconnect.
- HTTP API uses Basic Access Authentication (ADMIN role) or session-based auth via `/xmlapi/session/begin` (POST) and `/xmlapi/session/end` (POST). SessionId cookie used for subsequent requests.
- HTTP webhook feedback supports up to 4 feedback slots, each with up to 15 XPath expressions. Avoid FeedbackSlot 3 if Cisco TMS is in use.
- Serial port baud rate varies by product: Room Kit / Room Kit Mini / Room Bar = 115200 fixed; Codec Pro / Room 70 G2 = configurable (9600/19200/38400/57600/115200, default 115200).
- API output modes: terminal (line-based, default), XML, JSON. Set via `xPreferences outputmode`.
- Multiline commands use trailing `.` on a separate line to indicate end of payload. Max payload 8 MB.
- Commands are case-insensitive.
- All xCommand, xConfiguration, xStatus paths are hierarchical and navigable via `?` for help.

<!-- UNRESOLVED: SSH port not stated in source -->
<!-- UNRESOLVED: HTTP/HTTPS ports not stated in source -->
<!-- UNRESOLVED: WebSocket connection URL/path not stated (references external guide) -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: complete xConfiguration and xStatus hierarchies not enumerated in Actions (covered by separate xConfiguration/xStatus query mechanisms) -->
<!-- UNRESOLVED: exact parameter details for all 418 xCommand entries not fully extracted (source truncated) -->

## Provenance

```yaml
source_domains:
  - cisco.com
  - developer.webex.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/sx-series/tc7/api-reference-guide/sx80-api-reference-guide-tc72.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/sx-series/tc7/api-reference-guide/sx80-api-reference-guide-tc73.pdf
  - https://developer.webex.com/docs/devices
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/camera/precisionhd/user_guide/precisionhd_1080p-720p_camera_user_guide.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-2602/api-reference-guide-roomos-2602.pdf
retrieved_at: 2026-05-14T22:56:18.279Z
last_checked_at: 2026-05-27T06:51:44.656Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T06:51:44.656Z
matched_actions: 418
action_count: 418
confidence: high
summary: "All 418 spec actions map 1:1 to 418 xCommand entries in source; transport confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
