---
spec_id: admin/cisco-spark-room-kit-ce90
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco Spark Room Kit Control Spec"
manufacturer: Cisco
model_family: "Spark Room Kit"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "Spark Room Kit"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
  - ciscolive.com
  - manualslib.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-2602/api-reference-guide-roomos-2602.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce915/collaboration-endpoint-software-api-reference-guide-ce915.pdf
  - https://www.ciscolive.com/c/dam/r/ciscolive/emea/docs/2025/pdf/BRKTRS-3090.pdf
  - https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9300-series-switches/224586-troubleshoot-unknown-protocol-drops-in.html
  - https://www.manualslib.com/manual/687637/Cisco-Catalyst-2960.html
retrieved_at: 2026-05-14T22:56:18.279Z
last_checked_at: 2026-06-25T08:54:13.911Z
generated_at: 2026-06-25T08:54:13.911Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware/CE version targeted by this device instance not stated in source. Voltage/current/power specs not in source. Default credentials are deliberately unset (passphrase must be set on first login)."
  - "SSH TCP port not explicitly stated in source (default 22 not confirmed)"
  - "WebSocket endpoint path/port not explicitly stated (tied to HTTP service)"
  - "actual passphrase/credentials not provided in source (must be configured per-device)"
  - "the source documents an extensive xConfiguration hierarchy (persistent device"
  - "no multi-step macro sequences explicitly described in source as canned"
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "full xConfiguration (Variables) catalogue not enumerated in this draft."
  - "full xEvent catalogue not enumerated (only documented examples captured)."
  - "device firmware/CE version not stated; SSH port and WebSocket endpoint not explicitly stated."
  - "power/electrical specifications not present in this source."
verification:
  verdict: verified
  checked_at: 2026-06-25T08:54:13.911Z
  matched_actions: 1240
  action_count: 1240
  confidence: medium
  summary: "deterministic presence proof: 1240/1240 payloads verbatim in source; stratified Sonnet sample corroborated (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Cisco Spark Room Kit Control Spec

## Summary
The Cisco Spark Room Kit is an integrated video conferencing codec with built-in camera, microphone array, and speaker. This spec covers the RoomOS xAPI control interface (the Cisco CE/RoomOS command API), accessible over SSH (TCP/IP), HTTP/HTTPS XMLAPI, WebSocket (JSON-RPC), and RS-232 serial. The API exposes device Configurations (persistent settings), Commands (actions such as dial, volume, camera), Status (current device state), Events (unsolicited notifications), and a Feedback subscription mechanism.

<!-- UNRESOLVED: exact firmware/CE version targeted by this device instance not stated in source. Voltage/current/power specs not in source. Default credentials are deliberately unset (passphrase must be set on first login). -->

## Transport
```yaml
# Source documents four access methods: SSH, HTTP/HTTPS, WebSocket, and Serial.
# SSH and WebSocket run over TCP; HTTP/HTTPS is its own protocol; Serial is RS-232.
# All methods expose the SAME xAPI. Not all methods available on all products.
protocols:
  - tcp       # SSH command-line access (xConfiguration NetworkServices SSH Mode)
  - http      # HTTP/HTTPS XMLAPI (xConfiguration NetworkServices HTTP Mode: Off/HTTP+HTTPS/HTTPS)
  - serial    # RS-232 API access (xConfiguration SerialPort Mode: Off/On)
addressing:
  port: 443   # HTTPS (source: "use SSH or HTTP (port 443) to reach the device")
  # UNRESOLVED: SSH TCP port not explicitly stated in source (default 22 not confirmed)
  # UNRESOLVED: WebSocket endpoint path/port not explicitly stated (tied to HTTP service)
serial:
  # Spark Room Kit row: USB-A + RS-232 adapter, baud 115200, 8/N/1, HW flow control Off
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none   # source: "Hardware flow control: Off"
auth:
  type: basic   # HTTP XMLAPI uses HTTP Basic Access Authentication (ADMIN role required)
  # Serial & SSH: password prompting ON by default (xConfiguration SerialPort LoginRequired: On).
  # Default user "admin"; passphrase MUST be set on first login (not pre-set).
  # HTTP also supports Session Authentication via POST /xmlapi/session/begin (SessionId cookie).
  # UNRESOLVED: actual passphrase/credentials not provided in source (must be configured per-device)
```

## Traits
```yaml
# Inferred from the documented xCommand / xStatus catalogues:
traits:
  - powerable    # inferred: xCommand Standby Activate/Deactivate/Halfwake present
  - queryable    # inferred: extensive xStatus query hierarchy documented
  - routable     # inferred: xCommand Video Matrix Assign/Swap, Audio Select, Video Input set present
  - levelable    # inferred: xCommand Audio Volume Set/Increase/Decrease present
```

## Actions
```yaml
- id: x_command_security_certificates_ca_add
  label: "xCommand Security Certificates CA Add"
  kind: action
  command: "xCommand Security Certificates CA Add"
  params: []

- id: x_command_air_play_key_event_back
  label: "xCommand AirPlay KeyEvent Back"
  kind: action
  command: "xCommand AirPlay KeyEvent Back"
  params: []

- id: x_command_air_play_key_event_click
  label: "xCommand AirPlay KeyEvent Click"
  kind: action
  command: "xCommand AirPlay KeyEvent Click"
  params: []

- id: x_command_air_play_key_event_down
  label: "xCommand AirPlay KeyEvent Down"
  kind: action
  command: "xCommand AirPlay KeyEvent Down"
  params: []

- id: x_command_air_play_key_event_fast_forward
  label: "xCommand AirPlay KeyEvent FastForward"
  kind: action
  command: "xCommand AirPlay KeyEvent FastForward"
  params: []

- id: x_command_air_play_key_event_fast_reverse
  label: "xCommand AirPlay KeyEvent FastReverse"
  kind: action
  command: "xCommand AirPlay KeyEvent FastReverse"
  params: []

- id: x_command_air_play_key_event_left
  label: "xCommand AirPlay KeyEvent Left"
  kind: action
  command: "xCommand AirPlay KeyEvent Left"
  params: []

- id: x_command_air_play_key_event_play
  label: "xCommand AirPlay KeyEvent Play"
  kind: action
  command: "xCommand AirPlay KeyEvent Play"
  params: []

- id: x_command_air_play_key_event_right
  label: "xCommand AirPlay KeyEvent Right"
  kind: action
  command: "xCommand AirPlay KeyEvent Right"
  params: []

- id: x_command_air_play_reset_paired_devices
  label: "xCommand AirPlay ResetPairedDevices"
  kind: action
  command: "xCommand AirPlay ResetPairedDevices"
  params: []

- id: x_command_air_play_key_event_up
  label: "xCommand AirPlay KeyEvent Up"
  kind: action
  command: "xCommand AirPlay KeyEvent Up"
  params: []

- id: x_command_audio_diagnostics_advanced_run
  label: "xCommand Audio Diagnostics Advanced Run"
  kind: action
  command: "xCommand Audio Diagnostics Advanced Run"
  params: []

- id: x_command_audio_diagnostics_aec_reverb_reset
  label: "xCommand Audio Diagnostics AecReverb Reset"
  kind: action
  command: "xCommand Audio Diagnostics AecReverb Reset"
  params: []

- id: x_command_audio_diagnostics_aec_reverb_run
  label: "xCommand Audio Diagnostics AecReverb Run"
  kind: action
  command: "xCommand Audio Diagnostics AecReverb Run"
  params: []

- id: x_command_audio_diagnostics_measure_delay
  label: "xCommand Audio Diagnostics MeasureDelay"
  kind: action
  command: "xCommand Audio Diagnostics MeasureDelay"
  params: []

- id: x_command_audio_equalizer_list
  label: "xCommand Audio Equalizer List"
  kind: action
  command: "xCommand Audio Equalizer List"
  params: []

- id: x_command_audio_equalizer_update
  label: "xCommand Audio Equalizer Update"
  kind: action
  command: "xCommand Audio Equalizer Update"
  params: []

- id: x_command_audio_local_input_add
  label: "xCommand Audio LocalInput Add"
  kind: action
  command: "xCommand Audio LocalInput Add"
  params: []

- id: x_command_audio_local_input_add_connector
  label: "xCommand Audio LocalInput AddConnector"
  kind: action
  command: "xCommand Audio LocalInput AddConnector"
  params: []

- id: x_command_audio_local_input_ethernet_deregister
  label: "xCommand Audio LocalInput Ethernet Deregister"
  kind: action
  command: "xCommand Audio LocalInput Ethernet Deregister"
  params: []

- id: x_command_audio_local_input_ethernet_register
  label: "xCommand Audio LocalInput Ethernet Register"
  kind: action
  command: "xCommand Audio LocalInput Ethernet Register"
  params: []

- id: x_command_audio_local_input_ethernet_packet_statistics_reset
  label: "xCommand Audio LocalInput Ethernet PacketStatisticsReset"
  kind: action
  command: "xCommand Audio LocalInput Ethernet PacketStatisticsReset"
  params: []

- id: x_command_audio_local_input_remove
  label: "xCommand Audio LocalInput Remove"
  kind: action
  command: "xCommand Audio LocalInput Remove"
  params: []

- id: x_command_audio_local_input_remove_connector
  label: "xCommand Audio LocalInput RemoveConnector"
  kind: action
  command: "xCommand Audio LocalInput RemoveConnector"
  params: []

- id: x_command_audio_local_input_update
  label: "xCommand Audio LocalInput Update"
  kind: action
  command: "xCommand Audio LocalInput Update"
  params: []

- id: x_command_audio_local_output_add
  label: "xCommand Audio LocalOutput Add"
  kind: action
  command: "xCommand Audio LocalOutput Add"
  params: []

- id: x_command_audio_local_output_add_connector
  label: "xCommand Audio LocalOutput AddConnector"
  kind: action
  command: "xCommand Audio LocalOutput AddConnector"
  params: []

- id: x_command_audio_local_output_connect_input
  label: "xCommand Audio LocalOutput ConnectInput"
  kind: action
  command: "xCommand Audio LocalOutput ConnectInput"
  params: []

- id: x_command_audio_local_output_disconnect_input
  label: "xCommand Audio LocalOutput DisconnectInput"
  kind: action
  command: "xCommand Audio LocalOutput DisconnectInput"
  params: []

- id: x_command_audio_local_output_ethernet_deregister
  label: "xCommand Audio LocalOutput Ethernet Deregister"
  kind: action
  command: "xCommand Audio LocalOutput Ethernet Deregister"
  params: []

- id: x_command_audio_local_output_ethernet_register
  label: "xCommand Audio LocalOutput Ethernet Register"
  kind: action
  command: "xCommand Audio LocalOutput Ethernet Register"
  params: []

- id: x_command_audio_local_output_remove
  label: "xCommand Audio LocalOutput Remove"
  kind: action
  command: "xCommand Audio LocalOutput Remove"
  params: []

- id: x_command_audio_local_output_remove_connector
  label: "xCommand Audio LocalOutput RemoveConnector"
  kind: action
  command: "xCommand Audio LocalOutput RemoveConnector"
  params: []

- id: x_command_audio_local_output_update
  label: "xCommand Audio LocalOutput Update"
  kind: action
  command: "xCommand Audio LocalOutput Update"
  params: []

- id: x_command_audio_local_output_update_input_gain
  label: "xCommand Audio LocalOutput UpdateInputGain"
  kind: action
  command: "xCommand Audio LocalOutput UpdateInputGain"
  params: []

- id: x_command_audio_microphones_music_mode_start
  label: "xCommand Audio Microphones MusicMode Start"
  kind: action
  command: "xCommand Audio Microphones MusicMode Start"
  params: []

- id: x_command_audio_microphones_music_mode_stop
  label: "xCommand Audio Microphones MusicMode Stop"
  kind: action
  command: "xCommand Audio Microphones MusicMode Stop"
  params: []

- id: x_command_audio_microphones_mute
  label: "xCommand Audio Microphones Mute"
  kind: action
  command: "xCommand Audio Microphones Mute"
  params: []

- id: x_command_audio_microphones_noise_removal_activate
  label: "xCommand Audio Microphones NoiseRemoval Activate"
  kind: action
  command: "xCommand Audio Microphones NoiseRemoval Activate"
  params: []

- id: x_command_audio_microphones_passthrough_start
  label: "xCommand Audio Microphones Passthrough Start"
  kind: action
  command: "xCommand Audio Microphones Passthrough Start"
  params: []

- id: x_command_audio_microphones_noise_removal_deactivate
  label: "xCommand Audio Microphones NoiseRemoval Deactivate"
  kind: action
  command: "xCommand Audio Microphones NoiseRemoval Deactivate"
  params: []

- id: x_command_audio_microphones_passthrough_stop
  label: "xCommand Audio Microphones Passthrough Stop"
  kind: action
  command: "xCommand Audio Microphones Passthrough Stop"
  params: []

- id: x_command_audio_microphones_toggle_mute
  label: "xCommand Audio Microphones ToggleMute"
  kind: action
  command: "xCommand Audio Microphones ToggleMute"
  params: []

- id: x_command_audio_microphones_unmute
  label: "xCommand Audio Microphones Unmute"
  kind: action
  command: "xCommand Audio Microphones Unmute"
  params: []

- id: x_command_audio_remote_output_connect_input
  label: "xCommand Audio RemoteOutput ConnectInput"
  kind: action
  command: "xCommand Audio RemoteOutput ConnectInput"
  params: []

- id: x_command_audio_remote_output_disconnect_input
  label: "xCommand Audio RemoteOutput DisconnectInput"
  kind: action
  command: "xCommand Audio RemoteOutput DisconnectInput"
  params: []

- id: x_command_audio_remote_output_update_input_gain
  label: "xCommand Audio RemoteOutput UpdateInputGain"
  kind: action
  command: "xCommand Audio RemoteOutput UpdateInputGain"
  params: []

- id: x_command_audio_select
  label: "xCommand Audio Select"
  kind: action
  command: "xCommand Audio Select"
  params: []

- id: x_command_audio_sound_play
  label: "xCommand Audio Sound Play"
  kind: action
  command: "xCommand Audio Sound Play"
  params: []

- id: x_command_audio_setup_clear
  label: "xCommand Audio Setup Clear"
  kind: action
  command: "xCommand Audio Setup Clear"
  params: []

- id: x_command_audio_setup_reset
  label: "xCommand Audio Setup Reset"
  kind: action
  command: "xCommand Audio Setup Reset"
  params: []

- id: x_command_audio_sound_stop
  label: "xCommand Audio Sound Stop"
  kind: action
  command: "xCommand Audio Sound Stop"
  params: []

- id: x_command_audio_sounds_and_alerts_ringtone_list
  label: "xCommand Audio SoundsAndAlerts Ringtone List"
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone List"
  params: []

- id: x_command_audio_sounds_and_alerts_ringtone_play
  label: "xCommand Audio SoundsAndAlerts Ringtone Play"
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone Play"
  params: []

- id: x_command_audio_sounds_and_alerts_ringtone_stop
  label: "xCommand Audio SoundsAndAlerts Ringtone Stop"
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone Stop"
  params: []

- id: x_command_audio_speaker_check
  label: "xCommand Audio SpeakerCheck"
  kind: action
  command: "xCommand Audio SpeakerCheck"
  params: []

- id: x_command_audio_volume_decrease
  label: "xCommand Audio Volume Decrease"
  kind: action
  command: "xCommand Audio Volume Decrease"
  params: []

- id: x_command_audio_volume_increase
  label: "xCommand Audio Volume Increase"
  kind: action
  command: "xCommand Audio Volume Increase"
  params: []

- id: x_command_audio_volume_mute
  label: "xCommand Audio Volume Mute"
  kind: action
  command: "xCommand Audio Volume Mute"
  params: []

- id: x_command_audio_volume_set
  label: "xCommand Audio Volume Set"
  kind: action
  command: "xCommand Audio Volume Set"
  params: []

- id: x_command_audio_volume_set_to_default
  label: "xCommand Audio Volume SetToDefault"
  kind: action
  command: "xCommand Audio Volume SetToDefault"
  params: []

- id: x_command_audio_volume_toggle_mute
  label: "xCommand Audio Volume ToggleMute"
  kind: action
  command: "xCommand Audio Volume ToggleMute"
  params: []

- id: x_command_audio_volume_unmute
  label: "xCommand Audio Volume Unmute"
  kind: action
  command: "xCommand Audio Volume Unmute"
  params: []

- id: x_command_audio_vu_meter_start
  label: "xCommand Audio VuMeter Start"
  kind: action
  command: "xCommand Audio VuMeter Start"
  params: []

- id: x_command_audio_vu_meter_stop
  label: "xCommand Audio VuMeter Stop"
  kind: action
  command: "xCommand Audio VuMeter Stop"
  params: []

- id: x_command_bluetooth_streaming_next
  label: "xCommand Bluetooth Streaming Next"
  kind: action
  command: "xCommand Bluetooth Streaming Next"
  params: []

- id: x_command_bluetooth_streaming_pause
  label: "xCommand Bluetooth Streaming Pause"
  kind: action
  command: "xCommand Bluetooth Streaming Pause"
  params: []

- id: x_command_audio_vu_meter_stop_all
  label: "xCommand Audio VuMeter StopAll"
  kind: action
  command: "xCommand Audio VuMeter StopAll"
  params: []

- id: x_command_bluetooth_streaming_play
  label: "xCommand Bluetooth Streaming Play"
  kind: action
  command: "xCommand Bluetooth Streaming Play"
  params: []

- id: x_command_bookings_book
  label: "xCommand Bookings Book"
  kind: action
  command: "xCommand Bookings Book"
  params: []

- id: x_command_bluetooth_streaming_previous
  label: "xCommand Bluetooth Streaming Previous"
  kind: action
  command: "xCommand Bluetooth Streaming Previous"
  params: []

- id: x_command_bookings_check_out
  label: "xCommand Bookings CheckOut"
  kind: action
  command: "xCommand Bookings CheckOut"
  params: []

- id: x_command_bookings_check_in
  label: "xCommand Bookings CheckIn"
  kind: action
  command: "xCommand Bookings CheckIn"
  params: []

- id: x_command_bookings_clear
  label: "xCommand Bookings Clear"
  kind: action
  command: "xCommand Bookings Clear"
  params: []

- id: x_command_bookings_delete
  label: "xCommand Bookings Delete"
  kind: action
  command: "xCommand Bookings Delete"
  params: []

- id: x_command_bookings_edit
  label: "xCommand Bookings Edit"
  kind: action
  command: "xCommand Bookings Edit"
  params: []

- id: x_command_bookings_extend
  label: "xCommand Bookings Extend"
  kind: action
  command: "xCommand Bookings Extend"
  params: []

- id: x_command_bookings_get
  label: "xCommand Bookings Get"
  kind: action
  command: "xCommand Bookings Get"
  params: []

- id: x_command_bookings_list
  label: "xCommand Bookings List"
  kind: action
  command: "xCommand Bookings List"
  params: []

- id: x_command_bookings_notification_snooze
  label: "xCommand Bookings NotificationSnooze"
  kind: action
  command: "xCommand Bookings NotificationSnooze"
  params: []

- id: x_command_bookings_put
  label: "xCommand Bookings Put"
  kind: action
  command: "xCommand Bookings Put"
  params: []

- id: x_command_bookings_respond
  label: "xCommand Bookings Respond"
  kind: action
  command: "xCommand Bookings Respond"
  params: []

- id: x_command_call_accept
  label: "xCommand Call Accept"
  kind: action
  command: "xCommand Call Accept"
  params: []

- id: x_command_call_dtmfsend
  label: "xCommand Call DTMFSend"
  kind: action
  command: "xCommand Call DTMFSend"
  params: []

- id: x_command_call_disconnect
  label: "xCommand Call Disconnect"
  kind: action
  command: "xCommand Call Disconnect"
  params: []

- id: x_command_call_far_end_control_camera_move
  label: "xCommand Call FarEndControl Camera Move"
  kind: action
  command: "xCommand Call FarEndControl Camera Move"
  params: []

- id: x_command_call_far_end_control_camera_stop
  label: "xCommand Call FarEndControl Camera Stop"
  kind: action
  command: "xCommand Call FarEndControl Camera Stop"
  params: []

- id: x_command_call_far_end_control_request_capabilities
  label: "xCommand Call FarEndControl RequestCapabilities"
  kind: action
  command: "xCommand Call FarEndControl RequestCapabilities"
  params: []

- id: x_command_call_far_end_control_room_preset_activate
  label: "xCommand Call FarEndControl RoomPreset Activate"
  kind: action
  command: "xCommand Call FarEndControl RoomPreset Activate"
  params: []

- id: x_command_call_far_end_control_room_preset_store
  label: "xCommand Call FarEndControl RoomPreset Store"
  kind: action
  command: "xCommand Call FarEndControl RoomPreset Store"
  params: []

- id: x_command_call_far_end_control_source_select
  label: "xCommand Call FarEndControl Source Select"
  kind: action
  command: "xCommand Call FarEndControl Source Select"
  params: []

- id: x_command_call_far_end_message_send
  label: "xCommand Call FarEndMessage Send"
  kind: action
  command: "xCommand Call FarEndMessage Send"
  params: []

- id: x_command_call_forward
  label: "xCommand Call Forward"
  kind: action
  command: "xCommand Call Forward"
  params: []

- id: x_command_call_hold
  label: "xCommand Call Hold"
  kind: action
  command: "xCommand Call Hold"
  params: []

- id: x_command_call_ignore
  label: "xCommand Call Ignore"
  kind: action
  command: "xCommand Call Ignore"
  params: []

- id: x_command_call_join
  label: "xCommand Call Join"
  kind: action
  command: "xCommand Call Join"
  params: []

- id: x_command_call_reject
  label: "xCommand Call Reject"
  kind: action
  command: "xCommand Call Reject"
  params: []

- id: x_command_call_resume
  label: "xCommand Call Resume"
  kind: action
  command: "xCommand Call Resume"
  params: []

- id: x_command_call_history_acknowledge_all_missed_calls
  label: "xCommand CallHistory AcknowledgeAllMissedCalls"
  kind: action
  command: "xCommand CallHistory AcknowledgeAllMissedCalls"
  params: []

- id: x_command_call_unattended_transfer
  label: "xCommand Call UnattendedTransfer"
  kind: action
  command: "xCommand Call UnattendedTransfer"
  params: []

- id: x_command_call_history_acknowledge_missed_call
  label: "xCommand CallHistory AcknowledgeMissedCall"
  kind: action
  command: "xCommand CallHistory AcknowledgeMissedCall"
  params: []

- id: x_command_call_history_delete_all
  label: "xCommand CallHistory DeleteAll"
  kind: action
  command: "xCommand CallHistory DeleteAll"
  params: []

- id: x_command_call_history_get
  label: "xCommand CallHistory Get"
  kind: action
  command: "xCommand CallHistory Get"
  params: []

- id: x_command_call_history_delete_entry
  label: "xCommand CallHistory DeleteEntry"
  kind: action
  command: "xCommand CallHistory DeleteEntry"
  params: []

- id: x_command_call_history_recents
  label: "xCommand CallHistory Recents"
  kind: action
  command: "xCommand CallHistory Recents"
  params: []

- id: x_command_camera_boot
  label: "xCommand Camera Boot"
  kind: action
  command: "xCommand Camera Boot"
  params: []

- id: x_command_camera_factory_reset
  label: "xCommand Camera FactoryReset"
  kind: action
  command: "xCommand Camera FactoryReset"
  params: []

- id: x_command_camera_installation_tilt_ramp
  label: "xCommand Camera InstallationTilt Ramp"
  kind: action
  command: "xCommand Camera InstallationTilt Ramp"
  params: []

- id: x_command_camera_position_set
  label: "xCommand Camera PositionSet"
  kind: action
  command: "xCommand Camera PositionSet"
  params: []

- id: x_command_camera_position_reset
  label: "xCommand Camera PositionReset"
  kind: action
  command: "xCommand Camera PositionReset"
  params: []

- id: x_command_camera_preset_activate_default_position
  label: "xCommand Camera Preset ActivateDefaultPosition"
  kind: action
  command: "xCommand Camera Preset ActivateDefaultPosition"
  params: []

- id: x_command_camera_preset_activate
  label: "xCommand Camera Preset Activate"
  kind: action
  command: "xCommand Camera Preset Activate"
  params: []

- id: x_command_camera_preset_edit
  label: "xCommand Camera Preset Edit"
  kind: action
  command: "xCommand Camera Preset Edit"
  params: []

- id: x_command_camera_preset_list
  label: "xCommand Camera Preset List"
  kind: action
  command: "xCommand Camera Preset List"
  params: []

- id: x_command_camera_preset_remove
  label: "xCommand Camera Preset Remove"
  kind: action
  command: "xCommand Camera Preset Remove"
  params: []

- id: x_command_camera_preset_show
  label: "xCommand Camera Preset Show"
  kind: action
  command: "xCommand Camera Preset Show"
  params: []

- id: x_command_camera_preset_store
  label: "xCommand Camera Preset Store"
  kind: action
  command: "xCommand Camera Preset Store"
  params: []

- id: x_command_camera_ramp
  label: "xCommand Camera Ramp"
  kind: action
  command: "xCommand Camera Ramp"
  params: []

- id: x_command_camera_trigger_autofocus
  label: "xCommand Camera TriggerAutofocus"
  kind: action
  command: "xCommand Camera TriggerAutofocus"
  params: []

- id: x_command_camera_trigger_whitebalance
  label: "xCommand Camera TriggerWhitebalance"
  kind: action
  command: "xCommand Camera TriggerWhitebalance"
  params: []

- id: x_command_cameras_background_delete
  label: "xCommand Cameras Background Delete"
  kind: action
  command: "xCommand Cameras Background Delete"
  params: []

- id: x_command_cameras_auto_focus_diagnostics_start
  label: "xCommand Cameras AutoFocus Diagnostics Start"
  kind: action
  command: "xCommand Cameras AutoFocus Diagnostics Start"
  params: []

- id: x_command_cameras_auto_focus_diagnostics_stop
  label: "xCommand Cameras AutoFocus Diagnostics Stop"
  kind: action
  command: "xCommand Cameras AutoFocus Diagnostics Stop"
  params: []

- id: x_command_cameras_background_clear
  label: "xCommand Cameras Background Clear"
  kind: action
  command: "xCommand Cameras Background Clear"
  params: []

- id: x_command_cameras_background_fetch
  label: "xCommand Cameras Background Fetch"
  kind: action
  command: "xCommand Cameras Background Fetch"
  params: []

- id: x_command_cameras_background_foreground_parameters_reset
  label: "xCommand Cameras Background ForegroundParameters Reset"
  kind: action
  command: "xCommand Cameras Background ForegroundParameters Reset"
  params: []

- id: x_command_cameras_background_foreground_parameters_set
  label: "xCommand Cameras Background ForegroundParameters Set"
  kind: action
  command: "xCommand Cameras Background ForegroundParameters Set"
  params: []

- id: x_command_cameras_background_get
  label: "xCommand Cameras Background Get"
  kind: action
  command: "xCommand Cameras Background Get"
  params: []

- id: x_command_cameras_background_set
  label: "xCommand Cameras Background Set"
  kind: action
  command: "xCommand Cameras Background Set"
  params: []

- id: x_command_cameras_background_list
  label: "xCommand Cameras Background List"
  kind: action
  command: "xCommand Cameras Background List"
  params: []

- id: x_command_cameras_background_upload
  label: "xCommand Cameras Background Upload"
  kind: action
  command: "xCommand Cameras Background Upload"
  params: []

- id: x_command_cameras_presenter_track_set
  label: "xCommand Cameras PresenterTrack Set"
  kind: action
  command: "xCommand Cameras PresenterTrack Set"
  params: []

- id: x_command_cameras_presenter_track_clear_position
  label: "xCommand Cameras PresenterTrack ClearPosition"
  kind: action
  command: "xCommand Cameras PresenterTrack ClearPosition"
  params: []

- id: x_command_cameras_presenter_track_store_position
  label: "xCommand Cameras PresenterTrack StorePosition"
  kind: action
  command: "xCommand Cameras PresenterTrack StorePosition"
  params: []

- id: x_command_cameras_speaker_track_background_mode_deactivate
  label: "xCommand Cameras SpeakerTrack BackgroundMode Deactivate"
  kind: action
  command: "xCommand Cameras SpeakerTrack BackgroundMode Deactivate"
  params: []

- id: x_command_cameras_speaker_track_activate
  label: "xCommand Cameras SpeakerTrack Activate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Activate"
  params: []

- id: x_command_cameras_speaker_track_calibration_diagnostics_start
  label: "xCommand Cameras SpeakerTrack Calibration Diagnostics Start"
  kind: action
  command: "xCommand Cameras SpeakerTrack Calibration Diagnostics Start"
  params: []

- id: x_command_cameras_speaker_track_background_mode_activate
  label: "xCommand Cameras SpeakerTrack BackgroundMode Activate"
  kind: action
  command: "xCommand Cameras SpeakerTrack BackgroundMode Activate"
  params: []

- id: x_command_cameras_speaker_track_calibration_diagnostics_stop
  label: "xCommand Cameras SpeakerTrack Calibration Diagnostics Stop"
  kind: action
  command: "xCommand Cameras SpeakerTrack Calibration Diagnostics Stop"
  params: []

- id: x_command_cameras_speaker_track_closeup_activate
  label: "xCommand Cameras SpeakerTrack Closeup Activate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Closeup Activate"
  params: []

- id: x_command_cameras_speaker_track_diagnostics_start
  label: "xCommand Cameras SpeakerTrack Diagnostics Start"
  kind: action
  command: "xCommand Cameras SpeakerTrack Diagnostics Start"
  params: []

- id: x_command_cameras_speaker_track_closeup_deactivate
  label: "xCommand Cameras SpeakerTrack Closeup Deactivate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Closeup Deactivate"
  params: []

- id: x_command_cameras_speaker_track_diagnostics_stop
  label: "xCommand Cameras SpeakerTrack Diagnostics Stop"
  kind: action
  command: "xCommand Cameras SpeakerTrack Diagnostics Stop"
  params: []

- id: x_command_cameras_speaker_track_deactivate
  label: "xCommand Cameras SpeakerTrack Deactivate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Deactivate"
  params: []

- id: x_command_cameras_speaker_track_frames_activate
  label: "xCommand Cameras SpeakerTrack Frames Activate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Frames Activate"
  params: []

- id: x_command_cameras_speaker_track_frames_deactivate
  label: "xCommand Cameras SpeakerTrack Frames Deactivate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Frames Deactivate"
  params: []

- id: x_command_cameras_speaker_track_set
  label: "xCommand Cameras SpeakerTrack Set"
  kind: action
  command: "xCommand Cameras SpeakerTrack Set"
  params: []

- id: x_command_cameras_speaker_track_view_limits_activate
  label: "xCommand Cameras SpeakerTrack ViewLimits Activate"
  kind: action
  command: "xCommand Cameras SpeakerTrack ViewLimits Activate"
  params: []

- id: x_command_cameras_speaker_track_view_limits_deactivate
  label: "xCommand Cameras SpeakerTrack ViewLimits Deactivate"
  kind: action
  command: "xCommand Cameras SpeakerTrack ViewLimits Deactivate"
  params: []

- id: x_command_cameras_speaker_track_view_limits_store_position
  label: "xCommand Cameras SpeakerTrack ViewLimits StorePosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack ViewLimits StorePosition"
  params: []

- id: x_command_cameras_speaker_track_whiteboard_activate_position
  label: "xCommand Cameras SpeakerTrack Whiteboard ActivatePosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard ActivatePosition"
  params: []

- id: x_command_cameras_speaker_track_whiteboard_set_distance
  label: "xCommand Cameras SpeakerTrack Whiteboard SetDistance"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard SetDistance"
  params: []

- id: x_command_cameras_speaker_track_whiteboard_align_position
  label: "xCommand Cameras SpeakerTrack Whiteboard AlignPosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard AlignPosition"
  params: []

- id: x_command_cameras_speaker_track_whiteboard_store_position
  label: "xCommand Cameras SpeakerTrack Whiteboard StorePosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard StorePosition"
  params: []

- id: x_command_cameras_stereoscopic_mute
  label: "xCommand Cameras Stereoscopic Mute"
  kind: action
  command: "xCommand Cameras Stereoscopic Mute"
  params: []

- id: x_command_cameras_stereoscopic_selfview_activate
  label: "xCommand Cameras Stereoscopic Selfview Activate"
  kind: action
  command: "xCommand Cameras Stereoscopic Selfview Activate"
  params: []

- id: x_command_conference_admit_all
  label: "xCommand Conference AdmitAll"
  kind: action
  command: "xCommand Conference AdmitAll"
  params: []

- id: x_command_cameras_stereoscopic_selfview_deactivate
  label: "xCommand Cameras Stereoscopic Selfview Deactivate"
  kind: action
  command: "xCommand Cameras Stereoscopic Selfview Deactivate"
  params: []

- id: x_command_cameras_stereoscopic_unmute
  label: "xCommand Cameras Stereoscopic Unmute"
  kind: action
  command: "xCommand Cameras Stereoscopic Unmute"
  params: []

- id: x_command_conference_call_authentication_response
  label: "xCommand Conference Call AuthenticationResponse"
  kind: action
  command: "xCommand Conference Call AuthenticationResponse"
  params: []

- id: x_command_conference_do_not_disturb_activate
  label: "xCommand Conference DoNotDisturb Activate"
  kind: action
  command: "xCommand Conference DoNotDisturb Activate"
  params: []

- id: x_command_conference_do_not_disturb_deactivate
  label: "xCommand Conference DoNotDisturb Deactivate"
  kind: action
  command: "xCommand Conference DoNotDisturb Deactivate"
  params: []

- id: x_command_conference_end_meeting
  label: "xCommand Conference EndMeeting"
  kind: action
  command: "xCommand Conference EndMeeting"
  params: []

- id: x_command_conference_hand_raise
  label: "xCommand Conference Hand Raise"
  kind: action
  command: "xCommand Conference Hand Raise"
  params: []

- id: x_command_conference_hard_mute
  label: "xCommand Conference HardMute"
  kind: action
  command: "xCommand Conference HardMute"
  params: []

- id: x_command_conference_hand_lower
  label: "xCommand Conference Hand Lower"
  kind: action
  command: "xCommand Conference Hand Lower"
  params: []

- id: x_command_conference_lock
  label: "xCommand Conference Lock"
  kind: action
  command: "xCommand Conference Lock"
  params: []

- id: x_command_conference_meeting_assistant_start
  label: "xCommand Conference MeetingAssistant Start"
  kind: action
  command: "xCommand Conference MeetingAssistant Start"
  params: []

- id: x_command_conference_lower_all_hands
  label: "xCommand Conference LowerAllHands"
  kind: action
  command: "xCommand Conference LowerAllHands"
  params: []

- id: x_command_conference_meeting_assistant_stop
  label: "xCommand Conference MeetingAssistant Stop"
  kind: action
  command: "xCommand Conference MeetingAssistant Stop"
  params: []

- id: x_command_conference_mute_all
  label: "xCommand Conference MuteAll"
  kind: action
  command: "xCommand Conference MuteAll"
  params: []

- id: x_command_conference_mute_on_entry
  label: "xCommand Conference MuteOnEntry"
  kind: action
  command: "xCommand Conference MuteOnEntry"
  params: []

- id: x_command_conference_participant_add
  label: "xCommand Conference Participant Add"
  kind: action
  command: "xCommand Conference Participant Add"
  params: []

- id: x_command_conference_participant_admit
  label: "xCommand Conference Participant Admit"
  kind: action
  command: "xCommand Conference Participant Admit"
  params: []

- id: x_command_conference_participant_disconnect
  label: "xCommand Conference Participant Disconnect"
  kind: action
  command: "xCommand Conference Participant Disconnect"
  params: []

- id: x_command_conference_participant_move_to_lobby
  label: "xCommand Conference Participant MoveToLobby"
  kind: action
  command: "xCommand Conference Participant MoveToLobby"
  params: []

- id: x_command_conference_participant_lower_hand
  label: "xCommand Conference Participant LowerHand"
  kind: action
  command: "xCommand Conference Participant LowerHand"
  params: []

- id: x_command_conference_participant_mute
  label: "xCommand Conference Participant Mute"
  kind: action
  command: "xCommand Conference Participant Mute"
  params: []

- id: x_command_conference_participant_transfer_role
  label: "xCommand Conference Participant TransferRole"
  kind: action
  command: "xCommand Conference Participant TransferRole"
  params: []

- id: x_command_conference_participant_list_search
  label: "xCommand Conference ParticipantList Search"
  kind: action
  command: "xCommand Conference ParticipantList Search"
  params: []

- id: x_command_conference_people_focus_activate
  label: "xCommand Conference PeopleFocus Activate"
  kind: action
  command: "xCommand Conference PeopleFocus Activate"
  params: []

- id: x_command_conference_people_focus_deactivate
  label: "xCommand Conference PeopleFocus Deactivate"
  kind: action
  command: "xCommand Conference PeopleFocus Deactivate"
  params: []

- id: x_command_conference_reaction_disable
  label: "xCommand Conference Reaction Disable"
  kind: action
  command: "xCommand Conference Reaction Disable"
  params: []

- id: x_command_conference_reaction_enable
  label: "xCommand Conference Reaction Enable"
  kind: action
  command: "xCommand Conference Reaction Enable"
  params: []

- id: x_command_conference_recording_pause
  label: "xCommand Conference Recording Pause"
  kind: action
  command: "xCommand Conference Recording Pause"
  params: []

- id: x_command_conference_recording_resume
  label: "xCommand Conference Recording Resume"
  kind: action
  command: "xCommand Conference Recording Resume"
  params: []

- id: x_command_conference_reaction_send
  label: "xCommand Conference Reaction Send"
  kind: action
  command: "xCommand Conference Reaction Send"
  params: []

- id: x_command_conference_recording_start
  label: "xCommand Conference Recording Start"
  kind: action
  command: "xCommand Conference Recording Start"
  params: []

- id: x_command_conference_recording_stop
  label: "xCommand Conference Recording Stop"
  kind: action
  command: "xCommand Conference Recording Stop"
  params: []

- id: x_command_conference_send_email_invitation
  label: "xCommand Conference SendEmailInvitation"
  kind: action
  command: "xCommand Conference SendEmailInvitation"
  params: []

- id: x_command_conference_simultaneous_interpretation_select_language
  label: "xCommand Conference SimultaneousInterpretation SelectLanguage"
  kind: action
  command: "xCommand Conference SimultaneousInterpretation SelectLanguage"
  params: []

- id: x_command_conference_simultaneous_interpretation_set_mixer
  label: "xCommand Conference SimultaneousInterpretation SetMixer"
  kind: action
  command: "xCommand Conference SimultaneousInterpretation SetMixer"
  params: []

- id: x_command_conference_skin_tone
  label: "xCommand Conference SkinTone"
  kind: action
  command: "xCommand Conference SkinTone"
  params: []

- id: x_command_conference_speaker_lock_release
  label: "xCommand Conference SpeakerLock Release"
  kind: action
  command: "xCommand Conference SpeakerLock Release"
  params: []

- id: x_command_conference_transfer_host_and_leave
  label: "xCommand Conference TransferHostAndLeave"
  kind: action
  command: "xCommand Conference TransferHostAndLeave"
  params: []

- id: x_command_conference_speaker_lock_set
  label: "xCommand Conference SpeakerLock Set"
  kind: action
  command: "xCommand Conference SpeakerLock Set"
  params: []

- id: x_command_diagnostics_run
  label: "xCommand Diagnostics Run"
  kind: action
  command: "xCommand Diagnostics Run"
  params: []

- id: x_command_dial
  label: "xCommand Dial"
  kind: action
  command: "xCommand Dial"
  params: []

- id: x_command_gpio_manual_state_set
  label: "xCommand GPIO ManualState Set"
  kind: action
  command: "xCommand GPIO ManualState Set"
  params: []

- id: x_command_http_client_allow_hostname_add
  label: "xCommand HttpClient Allow Hostname Add"
  kind: action
  command: "xCommand HttpClient Allow Hostname Add"
  params: []

- id: x_command_http_client_allow_hostname_remove
  label: "xCommand HttpClient Allow Hostname Remove"
  kind: action
  command: "xCommand HttpClient Allow Hostname Remove"
  params: []

- id: x_command_http_client_allow_hostname_clear
  label: "xCommand HttpClient Allow Hostname Clear"
  kind: action
  command: "xCommand HttpClient Allow Hostname Clear"
  params: []

- id: x_command_http_client_allow_hostname_list
  label: "xCommand HttpClient Allow Hostname List"
  kind: action
  command: "xCommand HttpClient Allow Hostname List"
  params: []

- id: x_command_http_client_delete
  label: "xCommand HttpClient Delete"
  kind: action
  command: "xCommand HttpClient Delete"
  params: []

- id: x_command_http_client_get
  label: "xCommand HttpClient Get"
  kind: action
  command: "xCommand HttpClient Get"
  params: []

- id: x_command_http_client_patch
  label: "xCommand HttpClient Patch"
  kind: action
  command: "xCommand HttpClient Patch"
  params: []

- id: x_command_http_client_post
  label: "xCommand HttpClient Post"
  kind: action
  command: "xCommand HttpClient Post"
  params: []

- id: x_command_http_client_put
  label: "xCommand HttpClient Put"
  kind: action
  command: "xCommand HttpClient Put"
  params: []

- id: x_command_http_feedback_deregister
  label: "xCommand HttpFeedback Deregister"
  kind: action
  command: "xCommand HttpFeedback Deregister"
  params: []

- id: x_command_http_feedback_register
  label: "xCommand HttpFeedback Register"
  kind: action
  command: "xCommand HttpFeedback Register"
  params: []

- id: x_command_http_feedback_enable
  label: "xCommand HttpFeedback Enable"
  kind: action
  command: "xCommand HttpFeedback Enable"
  params: []

- id: x_command_logging_add_event
  label: "xCommand Logging AddEvent"
  kind: action
  command: "xCommand Logging AddEvent"
  params: []

- id: x_command_logging_extended_logging_start
  label: "xCommand Logging ExtendedLogging Start"
  kind: action
  command: "xCommand Logging ExtendedLogging Start"
  params: []

- id: x_command_logging_extended_logging_stop
  label: "xCommand Logging ExtendedLogging Stop"
  kind: action
  command: "xCommand Logging ExtendedLogging Stop"
  params: []

- id: x_command_macros_log_clear
  label: "xCommand Macros Log Clear"
  kind: action
  command: "xCommand Macros Log Clear"
  params: []

- id: x_command_logging_send_logs
  label: "xCommand Logging SendLogs"
  kind: action
  command: "xCommand Logging SendLogs"
  params: []

- id: x_command_macros_log_get
  label: "xCommand Macros Log Get"
  kind: action
  command: "xCommand Macros Log Get"
  params: []

- id: x_command_macros_macro_activate
  label: "xCommand Macros Macro Activate"
  kind: action
  command: "xCommand Macros Macro Activate"
  params: []

- id: x_command_macros_macro_deactivate
  label: "xCommand Macros Macro Deactivate"
  kind: action
  command: "xCommand Macros Macro Deactivate"
  params: []

- id: x_command_macros_macro_get
  label: "xCommand Macros Macro Get"
  kind: action
  command: "xCommand Macros Macro Get"
  params: []

- id: x_command_macros_macro_remove
  label: "xCommand Macros Macro Remove"
  kind: action
  command: "xCommand Macros Macro Remove"
  params: []

- id: x_command_macros_macro_remove_all
  label: "xCommand Macros Macro RemoveAll"
  kind: action
  command: "xCommand Macros Macro RemoveAll"
  params: []

- id: x_command_macros_macro_rename
  label: "xCommand Macros Macro Rename"
  kind: action
  command: "xCommand Macros Macro Rename"
  params: []

- id: x_command_macros_macro_roles_set
  label: "xCommand Macros Macro Roles Set"
  kind: action
  command: "xCommand Macros Macro Roles Set"
  params: []

- id: x_command_macros_macro_save
  label: "xCommand Macros Macro Save"
  kind: action
  command: "xCommand Macros Macro Save"
  params: []

- id: x_command_macros_runtime_restart
  label: "xCommand Macros Runtime Restart"
  kind: action
  command: "xCommand Macros Runtime Restart"
  params: []

- id: x_command_macros_runtime_start
  label: "xCommand Macros Runtime Start"
  kind: action
  command: "xCommand Macros Runtime Start"
  params: []

- id: x_command_macros_runtime_status
  label: "xCommand Macros Runtime Status"
  kind: action
  command: "xCommand Macros Runtime Status"
  params: []

- id: x_command_message_send
  label: "xCommand Message Send"
  kind: action
  command: "xCommand Message Send"
  params: []

- id: x_command_macros_runtime_stop
  label: "xCommand Macros Runtime Stop"
  kind: action
  command: "xCommand Macros Runtime Stop"
  params: []

- id: x_command_microsoft_teams_join
  label: "xCommand MicrosoftTeams Join"
  kind: action
  command: "xCommand MicrosoftTeams Join"
  params: []

- id: x_command_microsoft_teams_install
  label: "xCommand MicrosoftTeams Install"
  kind: action
  command: "xCommand MicrosoftTeams Install"
  params: []

- id: x_command_microsoft_teams_list
  label: "xCommand MicrosoftTeams List"
  kind: action
  command: "xCommand MicrosoftTeams List"
  params: []

- id: x_command_microsoft_teams_sign_out
  label: "xCommand MicrosoftTeams SignOut"
  kind: action
  command: "xCommand MicrosoftTeams SignOut"
  params: []

- id: x_command_microsoft_teams_reset
  label: "xCommand MicrosoftTeams Reset"
  kind: action
  command: "xCommand MicrosoftTeams Reset"
  params: []

- id: x_command_microsoft_teams_software_upgrade
  label: "xCommand MicrosoftTeams SoftwareUpgrade"
  kind: action
  command: "xCommand MicrosoftTeams SoftwareUpgrade"
  params: []

- id: x_command_network_snmp_usm_user_add
  label: "xCommand Network SNMP USM User Add"
  kind: action
  command: "xCommand Network SNMP USM User Add"
  params: []

- id: x_command_network_ping
  label: "xCommand Network Ping"
  kind: action
  command: "xCommand Network Ping"
  params: []

- id: x_command_network_smtp_verify_config
  label: "xCommand Network SMTP VerifyConfig"
  kind: action
  command: "xCommand Network SMTP VerifyConfig"
  params: []

- id: x_command_network_snmp_usm_user_delete
  label: "xCommand Network SNMP USM User Delete"
  kind: action
  command: "xCommand Network SNMP USM User Delete"
  params: []

- id: x_command_network_traceroute
  label: "xCommand Network Traceroute"
  kind: action
  command: "xCommand Network Traceroute"
  params: []

- id: x_command_network_snmp_usm_user_list
  label: "xCommand Network SNMP USM User List"
  kind: action
  command: "xCommand Network SNMP USM User List"
  params: []

- id: x_command_network_wifi_configure
  label: "xCommand Network Wifi Configure"
  kind: action
  command: "xCommand Network Wifi Configure"
  params: []

- id: x_command_network_wifi_delete
  label: "xCommand Network Wifi Delete"
  kind: action
  command: "xCommand Network Wifi Delete"
  params: []

- id: x_command_network_wifi_list
  label: "xCommand Network Wifi List"
  kind: action
  command: "xCommand Network Wifi List"
  params: []

- id: x_command_network_wifi_scan_start
  label: "xCommand Network Wifi Scan Start"
  kind: action
  command: "xCommand Network Wifi Scan Start"
  params: []

- id: x_command_peripherals_boot
  label: "xCommand Peripherals Boot"
  kind: action
  command: "xCommand Peripherals Boot"
  params: []

- id: x_command_network_wifi_scan_stop
  label: "xCommand Network Wifi Scan Stop"
  kind: action
  command: "xCommand Network Wifi Scan Stop"
  params: []

- id: x_command_peripherals_connect
  label: "xCommand Peripherals Connect"
  kind: action
  command: "xCommand Peripherals Connect"
  params: []

- id: x_command_peripherals_device_management_disable
  label: "xCommand Peripherals DeviceManagement Disable"
  kind: action
  command: "xCommand Peripherals DeviceManagement Disable"
  params: []

- id: x_command_peripherals_device_management_enable
  label: "xCommand Peripherals DeviceManagement Enable"
  kind: action
  command: "xCommand Peripherals DeviceManagement Enable"
  params: []

- id: x_command_peripherals_heart_beat
  label: "xCommand Peripherals HeartBeat"
  kind: action
  command: "xCommand Peripherals HeartBeat"
  params: []

- id: x_command_peripherals_pairing_pin_pairing_start
  label: "xCommand Peripherals Pairing PinPairing Start"
  kind: action
  command: "xCommand Peripherals Pairing PinPairing Start"
  params: []

- id: x_command_peripherals_list
  label: "xCommand Peripherals List"
  kind: action
  command: "xCommand Peripherals List"
  params: []

- id: x_command_peripherals_pairing_pin_pairing_stop
  label: "xCommand Peripherals Pairing PinPairing Stop"
  kind: action
  command: "xCommand Peripherals Pairing PinPairing Stop"
  params: []

- id: x_command_peripherals_pairing_unpair
  label: "xCommand Peripherals Pairing Unpair"
  kind: action
  command: "xCommand Peripherals Pairing Unpair"
  params: []

- id: x_command_peripherals_purge
  label: "xCommand Peripherals Purge"
  kind: action
  command: "xCommand Peripherals Purge"
  params: []

- id: x_command_peripherals_security_certificates_services_activate
  label: "xCommand Peripherals Security Certificates Services Activate"
  kind: action
  command: "xCommand Peripherals Security Certificates Services Activate"
  params: []

- id: x_command_peripherals_security_certificates_services_delete
  label: "xCommand Peripherals Security Certificates Services Delete"
  kind: action
  command: "xCommand Peripherals Security Certificates Services Delete"
  params: []

- id: x_command_peripherals_security_certificates_services_enrollment
  label: "xCommand Peripherals Security Certificates Services Enrollment"
  kind: action
  command: "xCommand Peripherals Security Certificates Services Enrollment"
  params: []

- id: x_command_peripherals_security_certificates_services_show
  label: "xCommand Peripherals Security Certificates Services Show"
  kind: action
  command: "xCommand Peripherals Security Certificates Services Show"
  params: []

- id: x_command_peripherals_touch_panel_configure
  label: "xCommand Peripherals TouchPanel Configure"
  kind: action
  command: "xCommand Peripherals TouchPanel Configure"
  params: []

- id: x_command_peripherals_user_management_user_add
  label: "xCommand Peripherals UserManagement User Add"
  kind: action
  command: "xCommand Peripherals UserManagement User Add"
  params: []

- id: x_command_peripherals_user_management_user_delete
  label: "xCommand Peripherals UserManagement User Delete"
  kind: action
  command: "xCommand Peripherals UserManagement User Delete"
  params: []

- id: x_command_peripherals_user_management_user_get
  label: "xCommand Peripherals UserManagement User Get"
  kind: action
  command: "xCommand Peripherals UserManagement User Get"
  params: []

- id: x_command_peripherals_user_management_user_list
  label: "xCommand Peripherals UserManagement User List"
  kind: action
  command: "xCommand Peripherals UserManagement User List"
  params: []

- id: x_command_peripherals_user_management_user_modify
  label: "xCommand Peripherals UserManagement User Modify"
  kind: action
  command: "xCommand Peripherals UserManagement User Modify"
  params: []

- id: x_command_peripherals_user_management_user_passphrase_set
  label: "xCommand Peripherals UserManagement User Passphrase Set"
  kind: action
  command: "xCommand Peripherals UserManagement User Passphrase Set"
  params: []

- id: x_command_peripherals_user_management_user_unblock
  label: "xCommand Peripherals UserManagement User Unblock"
  kind: action
  command: "xCommand Peripherals UserManagement User Unblock"
  params: []

- id: x_command_phonebook_contact_add
  label: "xCommand Phonebook Contact Add"
  kind: action
  command: "xCommand Phonebook Contact Add"
  params: []

- id: x_command_phonebook_contact_modify
  label: "xCommand Phonebook Contact Modify"
  kind: action
  command: "xCommand Phonebook Contact Modify"
  params: []

- id: x_command_phonebook_contact_delete
  label: "xCommand Phonebook Contact Delete"
  kind: action
  command: "xCommand Phonebook Contact Delete"
  params: []

- id: x_command_phonebook_contact_method_add
  label: "xCommand Phonebook ContactMethod Add"
  kind: action
  command: "xCommand Phonebook ContactMethod Add"
  params: []

- id: x_command_phonebook_contact_method_delete
  label: "xCommand Phonebook ContactMethod Delete"
  kind: action
  command: "xCommand Phonebook ContactMethod Delete"
  params: []

- id: x_command_phonebook_contact_method_modify
  label: "xCommand Phonebook ContactMethod Modify"
  kind: action
  command: "xCommand Phonebook ContactMethod Modify"
  params: []

- id: x_command_phonebook_folder_add
  label: "xCommand Phonebook Folder Add"
  kind: action
  command: "xCommand Phonebook Folder Add"
  params: []

- id: x_command_phonebook_folder_delete
  label: "xCommand Phonebook Folder Delete"
  kind: action
  command: "xCommand Phonebook Folder Delete"
  params: []

- id: x_command_phonebook_folder_modify
  label: "xCommand Phonebook Folder Modify"
  kind: action
  command: "xCommand Phonebook Folder Modify"
  params: []

- id: x_command_phonebook_search
  label: "xCommand Phonebook Search"
  kind: action
  command: "xCommand Phonebook Search"
  params: []

- id: x_command_presentation_start
  label: "xCommand Presentation Start"
  kind: action
  command: "xCommand Presentation Start"
  params: []

- id: x_command_presentation_stop
  label: "xCommand Presentation Stop"
  kind: action
  command: "xCommand Presentation Stop"
  params: []

- id: x_command_provisioning_cucm_extension_mobility_login
  label: "xCommand Provisioning CUCM ExtensionMobility Login"
  kind: action
  command: "xCommand Provisioning CUCM ExtensionMobility Login"
  params: []

- id: x_command_provisioning_complete_upgrade
  label: "xCommand Provisioning CompleteUpgrade"
  kind: action
  command: "xCommand Provisioning CompleteUpgrade"
  params: []

- id: x_command_provisioning_postpone_upgrade
  label: "xCommand Provisioning PostponeUpgrade"
  kind: action
  command: "xCommand Provisioning PostponeUpgrade"
  params: []

- id: x_command_provisioning_cucm_extension_mobility_logout
  label: "xCommand Provisioning CUCM ExtensionMobility Logout"
  kind: action
  command: "xCommand Provisioning CUCM ExtensionMobility Logout"
  params: []

- id: x_command_provisioning_room_type_activate
  label: "xCommand Provisioning RoomType Activate"
  kind: action
  command: "xCommand Provisioning RoomType Activate"
  params: []

- id: x_command_provisioning_service_fetch
  label: "xCommand Provisioning Service Fetch"
  kind: action
  command: "xCommand Provisioning Service Fetch"
  params: []

- id: x_command_proximity_services_activate
  label: "xCommand Proximity Services Activate"
  kind: action
  command: "xCommand Proximity Services Activate"
  params: []

- id: x_command_remote_access_end_session
  label: "xCommand RemoteAccess EndSession"
  kind: action
  command: "xCommand RemoteAccess EndSession"
  params: []

- id: x_command_proximity_services_deactivate
  label: "xCommand Proximity Services Deactivate"
  kind: action
  command: "xCommand Proximity Services Deactivate"
  params: []

- id: x_command_room_cleanup_cancel
  label: "xCommand RoomCleanup Cancel"
  kind: action
  command: "xCommand RoomCleanup Cancel"
  params: []

- id: x_command_room_cleanup_run
  label: "xCommand RoomCleanup Run"
  kind: action
  command: "xCommand RoomCleanup Run"
  params: []

- id: x_command_room_preset_activate
  label: "xCommand RoomPreset Activate"
  kind: action
  command: "xCommand RoomPreset Activate"
  params: []

- id: x_command_room_preset_clear
  label: "xCommand RoomPreset Clear"
  kind: action
  command: "xCommand RoomPreset Clear"
  params: []

- id: x_command_room_preset_store
  label: "xCommand RoomPreset Store"
  kind: action
  command: "xCommand RoomPreset Store"
  params: []

- id: x_command_security_certificates_ca_delete
  label: "xCommand Security Certificates CA Delete"
  kind: action
  command: "xCommand Security Certificates CA Delete"
  params: []

- id: x_command_security_certificates_ca_show
  label: "xCommand Security Certificates CA Show"
  kind: action
  command: "xCommand Security Certificates CA Show"
  params: []

- id: x_command_security_certificates_csr_create
  label: "xCommand Security Certificates CSR Create"
  kind: action
  command: "xCommand Security Certificates CSR Create"
  params: []

- id: x_command_security_certificates_csr_link
  label: "xCommand Security Certificates CSR Link"
  kind: action
  command: "xCommand Security Certificates CSR Link"
  params: []

- id: x_command_security_certificates_cucm_ctl_delete
  label: "xCommand Security Certificates CUCM CTL Delete"
  kind: action
  command: "xCommand Security Certificates CUCM CTL Delete"
  params: []

- id: x_command_security_certificates_cucm_ctl_show
  label: "xCommand Security Certificates CUCM CTL Show"
  kind: action
  command: "xCommand Security Certificates CUCM CTL Show"
  params: []

- id: x_command_security_certificates_cucm_itl_show
  label: "xCommand Security Certificates CUCM ITL Show"
  kind: action
  command: "xCommand Security Certificates CUCM ITL Show"
  params: []

- id: x_command_security_certificates_cucm_mic_show
  label: "xCommand Security Certificates CUCM MIC Show"
  kind: action
  command: "xCommand Security Certificates CUCM MIC Show"
  params: []

- id: x_command_security_certificates_services_activate
  label: "xCommand Security Certificates Services Activate"
  kind: action
  command: "xCommand Security Certificates Services Activate"
  params: []

- id: x_command_security_certificates_services_add
  label: "xCommand Security Certificates Services Add"
  kind: action
  command: "xCommand Security Certificates Services Add"
  params: []

- id: x_command_security_certificates_services_deactivate
  label: "xCommand Security Certificates Services Deactivate"
  kind: action
  command: "xCommand Security Certificates Services Deactivate"
  params: []

- id: x_command_security_certificates_services_delete
  label: "xCommand Security Certificates Services Delete"
  kind: action
  command: "xCommand Security Certificates Services Delete"
  params: []

- id: x_command_security_certificates_services_enrollment_profiles_delete
  label: "xCommand Security Certificates Services Enrollment Profiles Delete"
  kind: action
  command: "xCommand Security Certificates Services Enrollment Profiles Delete"
  params: []

- id: x_command_security_certificates_services_enrollment_scep_profiles_set
  label: "xCommand Security Certificates Services Enrollment SCEP Profiles Set"
  kind: action
  command: "xCommand Security Certificates Services Enrollment SCEP Profiles Set"
  params: []

- id: x_command_security_certificates_services_enrollment_profiles_list
  label: "xCommand Security Certificates Services Enrollment Profiles List"
  kind: action
  command: "xCommand Security Certificates Services Enrollment Profiles List"
  params: []

- id: x_command_security_certificates_services_enrollment_scep_renewal_request
  label: "xCommand Security Certificates Services Enrollment SCEP Renewal Request"
  kind: action
  command: "xCommand Security Certificates Services Enrollment SCEP Renewal Request"
  params: []

- id: x_command_security_certificates_services_enrollment_scep_request
  label: "xCommand Security Certificates Services Enrollment SCEP Request"
  kind: action
  command: "xCommand Security Certificates Services Enrollment SCEP Request"
  params: []

- id: x_command_security_certificates_services_show
  label: "xCommand Security Certificates Services Show"
  kind: action
  command: "xCommand Security Certificates Services Show"
  params: []

- id: x_command_security_certificates_third_party_disable
  label: "xCommand Security Certificates ThirdParty Disable"
  kind: action
  command: "xCommand Security Certificates ThirdParty Disable"
  params: []

- id: x_command_security_certificates_third_party_enable
  label: "xCommand Security Certificates ThirdParty Enable"
  kind: action
  command: "xCommand Security Certificates ThirdParty Enable"
  params: []

- id: x_command_security_certificates_third_party_list
  label: "xCommand Security Certificates ThirdParty List"
  kind: action
  command: "xCommand Security Certificates ThirdParty List"
  params: []

- id: x_command_security_certificates_third_party_show
  label: "xCommand Security Certificates ThirdParty Show"
  kind: action
  command: "xCommand Security Certificates ThirdParty Show"
  params: []

- id: x_command_security_certificates_webex_show
  label: "xCommand Security Certificates Webex Show"
  kind: action
  command: "xCommand Security Certificates Webex Show"
  params: []

- id: x_command_security_certificates_webex_identity_show
  label: "xCommand Security Certificates WebexIdentity Show"
  kind: action
  command: "xCommand Security Certificates WebexIdentity Show"
  params: []

- id: x_command_security_client_secret_populate
  label: "xCommand Security ClientSecret Populate"
  kind: action
  command: "xCommand Security ClientSecret Populate"
  params: []

- id: x_command_security_ciphers_list
  label: "xCommand Security Ciphers List"
  kind: action
  command: "xCommand Security Ciphers List"
  params: []

- id: x_command_security_persistency
  label: "xCommand Security Persistency"
  kind: action
  command: "xCommand Security Persistency"
  params: []

- id: x_command_security_session_get
  label: "xCommand Security Session Get"
  kind: action
  command: "xCommand Security Session Get"
  params: []

- id: x_command_security_session_list
  label: "xCommand Security Session List"
  kind: action
  command: "xCommand Security Session List"
  params: []

- id: x_command_security_session_terminate
  label: "xCommand Security Session Terminate"
  kind: action
  command: "xCommand Security Session Terminate"
  params: []

- id: x_command_serial_port_peripheral_control_send
  label: "xCommand SerialPort PeripheralControl Send"
  kind: action
  command: "xCommand SerialPort PeripheralControl Send"
  params: []

- id: x_command_standby_activate
  label: "xCommand Standby Activate"
  kind: action
  command: "xCommand Standby Activate"
  params: []

- id: x_command_standby_reset_halfwake_timer
  label: "xCommand Standby ResetHalfwakeTimer"
  kind: action
  command: "xCommand Standby ResetHalfwakeTimer"
  params: []

- id: x_command_standby_deactivate
  label: "xCommand Standby Deactivate"
  kind: action
  command: "xCommand Standby Deactivate"
  params: []

- id: x_command_standby_halfwake
  label: "xCommand Standby Halfwake"
  kind: action
  command: "xCommand Standby Halfwake"
  params: []

- id: x_command_standby_reset_timer
  label: "xCommand Standby ResetTimer"
  kind: action
  command: "xCommand Standby ResetTimer"
  params: []

- id: x_command_system_unit_boot
  label: "xCommand SystemUnit Boot"
  kind: action
  command: "xCommand SystemUnit Boot"
  params: []

- id: x_command_system_unit_factory_reset
  label: "xCommand SystemUnit FactoryReset"
  kind: action
  command: "xCommand SystemUnit FactoryReset"
  params: []

- id: x_command_system_unit_developer_preview_activate
  label: "xCommand SystemUnit DeveloperPreview Activate"
  kind: action
  command: "xCommand SystemUnit DeveloperPreview Activate"
  params: []

- id: x_command_system_unit_developer_preview_deactivate
  label: "xCommand SystemUnit DeveloperPreview Deactivate"
  kind: action
  command: "xCommand SystemUnit DeveloperPreview Deactivate"
  params: []

- id: x_command_system_unit_option_key_add
  label: "xCommand SystemUnit OptionKey Add"
  kind: action
  command: "xCommand SystemUnit OptionKey Add"
  params: []

- id: x_command_system_unit_first_time_wizard_stop
  label: "xCommand SystemUnit FirstTimeWizard Stop"
  kind: action
  command: "xCommand SystemUnit FirstTimeWizard Stop"
  params: []

- id: x_command_system_unit_option_key_list
  label: "xCommand SystemUnit OptionKey List"
  kind: action
  command: "xCommand SystemUnit OptionKey List"
  params: []

- id: x_command_system_unit_notifications_remove_all
  label: "xCommand SystemUnit Notifications RemoveAll"
  kind: action
  command: "xCommand SystemUnit Notifications RemoveAll"
  params: []

- id: x_command_system_unit_option_key_remove
  label: "xCommand SystemUnit OptionKey Remove"
  kind: action
  command: "xCommand SystemUnit OptionKey Remove"
  params: []

- id: x_command_system_unit_option_key_remove_all
  label: "xCommand SystemUnit OptionKey RemoveAll"
  kind: action
  command: "xCommand SystemUnit OptionKey RemoveAll"
  params: []

- id: x_command_system_unit_sign_in_banner_clear
  label: "xCommand SystemUnit SignInBanner Clear"
  kind: action
  command: "xCommand SystemUnit SignInBanner Clear"
  params: []

- id: x_command_system_unit_sign_in_banner_get
  label: "xCommand SystemUnit SignInBanner Get"
  kind: action
  command: "xCommand SystemUnit SignInBanner Get"
  params: []

- id: x_command_system_unit_product_platform_set
  label: "xCommand SystemUnit ProductPlatform Set"
  kind: action
  command: "xCommand SystemUnit ProductPlatform Set"
  params: []

- id: x_command_system_unit_sign_in_banner_set
  label: "xCommand SystemUnit SignInBanner Set"
  kind: action
  command: "xCommand SystemUnit SignInBanner Set"
  params: []

- id: x_command_system_unit_soft_reset
  label: "xCommand SystemUnit SoftReset"
  kind: action
  command: "xCommand SystemUnit SoftReset"
  params: []

- id: x_command_system_unit_software_upgrade
  label: "xCommand SystemUnit SoftwareUpgrade"
  kind: action
  command: "xCommand SystemUnit SoftwareUpgrade"
  params: []

- id: x_command_system_unit_welcome_banner_set
  label: "xCommand SystemUnit WelcomeBanner Set"
  kind: action
  command: "xCommand SystemUnit WelcomeBanner Set"
  params: []

- id: x_command_system_unit_welcome_banner_clear
  label: "xCommand SystemUnit WelcomeBanner Clear"
  kind: action
  command: "xCommand SystemUnit WelcomeBanner Clear"
  params: []

- id: x_command_system_unit_welcome_banner_get
  label: "xCommand SystemUnit WelcomeBanner Get"
  kind: action
  command: "xCommand SystemUnit WelcomeBanner Get"
  params: []

- id: x_command_time_date_time_get
  label: "xCommand Time DateTime Get"
  kind: action
  command: "xCommand Time DateTime Get"
  params: []

- id: x_command_time_date_time_set
  label: "xCommand Time DateTime Set"
  kind: action
  command: "xCommand Time DateTime Set"
  params: []

- id: x_command_user_interface_accessibility_screen_reader_set
  label: "xCommand UserInterface Accessibility ScreenReader Set"
  kind: action
  command: "xCommand UserInterface Accessibility ScreenReader Set"
  params: []

- id: x_command_user_interface_branding_clear
  label: "xCommand UserInterface Branding Clear"
  kind: action
  command: "xCommand UserInterface Branding Clear"
  params: []

- id: x_command_user_interface_branding_delete
  label: "xCommand UserInterface Branding Delete"
  kind: action
  command: "xCommand UserInterface Branding Delete"
  params: []

- id: x_command_user_interface_branding_fetch
  label: "xCommand UserInterface Branding Fetch"
  kind: action
  command: "xCommand UserInterface Branding Fetch"
  params: []

- id: x_command_user_interface_branding_get
  label: "xCommand UserInterface Branding Get"
  kind: action
  command: "xCommand UserInterface Branding Get"
  params: []

- id: x_command_user_interface_branding_updated
  label: "xCommand UserInterface Branding Updated"
  kind: action
  command: "xCommand UserInterface Branding Updated"
  params: []

- id: x_command_user_interface_branding_upload
  label: "xCommand UserInterface Branding Upload"
  kind: action
  command: "xCommand UserInterface Branding Upload"
  params: []

- id: x_command_user_interface_extensions_clear
  label: "xCommand UserInterface Extensions Clear"
  kind: action
  command: "xCommand UserInterface Extensions Clear"
  params: []

- id: x_command_user_interface_extensions_export
  label: "xCommand UserInterface Extensions Export"
  kind: action
  command: "xCommand UserInterface Extensions Export"
  params: []

- id: x_command_user_interface_extensions_icon_delete
  label: "xCommand UserInterface Extensions Icon Delete"
  kind: action
  command: "xCommand UserInterface Extensions Icon Delete"
  params: []

- id: x_command_user_interface_extensions_icon_delete_all
  label: "xCommand UserInterface Extensions Icon DeleteAll"
  kind: action
  command: "xCommand UserInterface Extensions Icon DeleteAll"
  params: []

- id: x_command_user_interface_extensions_icon_download
  label: "xCommand UserInterface Extensions Icon Download"
  kind: action
  command: "xCommand UserInterface Extensions Icon Download"
  params: []

- id: x_command_user_interface_extensions_icon_fetch
  label: "xCommand UserInterface Extensions Icon Fetch"
  kind: action
  command: "xCommand UserInterface Extensions Icon Fetch"
  params: []

- id: x_command_user_interface_extensions_icon_get
  label: "xCommand UserInterface Extensions Icon Get"
  kind: action
  command: "xCommand UserInterface Extensions Icon Get"
  params: []

- id: x_command_user_interface_extensions_icon_list
  label: "xCommand UserInterface Extensions Icon List"
  kind: action
  command: "xCommand UserInterface Extensions Icon List"
  params: []

- id: x_command_user_interface_extensions_icon_upload
  label: "xCommand UserInterface Extensions Icon Upload"
  kind: action
  command: "xCommand UserInterface Extensions Icon Upload"
  params: []

- id: x_command_user_interface_extensions_list
  label: "xCommand UserInterface Extensions List"
  kind: action
  command: "xCommand UserInterface Extensions List"
  params: []

- id: x_command_user_interface_extensions_panel_close
  label: "xCommand UserInterface Extensions Panel Close"
  kind: action
  command: "xCommand UserInterface Extensions Panel Close"
  params: []

- id: x_command_user_interface_extensions_panel_open
  label: "xCommand UserInterface Extensions Panel Open"
  kind: action
  command: "xCommand UserInterface Extensions Panel Open"
  params: []

- id: x_command_user_interface_extensions_panel_clicked
  label: "xCommand UserInterface Extensions Panel Clicked"
  kind: action
  command: "xCommand UserInterface Extensions Panel Clicked"
  params: []

- id: x_command_user_interface_extensions_panel_remove
  label: "xCommand UserInterface Extensions Panel Remove"
  kind: action
  command: "xCommand UserInterface Extensions Panel Remove"
  params: []

- id: x_command_user_interface_extensions_panel_save
  label: "xCommand UserInterface Extensions Panel Save"
  kind: action
  command: "xCommand UserInterface Extensions Panel Save"
  params: []

- id: x_command_user_interface_extensions_panel_update
  label: "xCommand UserInterface Extensions Panel Update"
  kind: action
  command: "xCommand UserInterface Extensions Panel Update"
  params: []

- id: x_command_user_interface_extensions_web_app_save
  label: "xCommand UserInterface Extensions WebApp Save"
  kind: action
  command: "xCommand UserInterface Extensions WebApp Save"
  params: []

- id: x_command_user_interface_extensions_set
  label: "xCommand UserInterface Extensions Set"
  kind: action
  command: "xCommand UserInterface Extensions Set"
  params: []

- id: x_command_user_interface_extensions_web_widget_remove
  label: "xCommand UserInterface Extensions WebWidget Remove"
  kind: action
  command: "xCommand UserInterface Extensions WebWidget Remove"
  params: []

- id: x_command_user_interface_extensions_web_widget_save
  label: "xCommand UserInterface Extensions WebWidget Save"
  kind: action
  command: "xCommand UserInterface Extensions WebWidget Save"
  params: []

- id: x_command_user_interface_extensions_widget_action
  label: "xCommand UserInterface Extensions Widget Action"
  kind: action
  command: "xCommand UserInterface Extensions Widget Action"
  params: []

- id: x_command_user_interface_extensions_widget_set_value
  label: "xCommand UserInterface Extensions Widget SetValue"
  kind: action
  command: "xCommand UserInterface Extensions Widget SetValue"
  params: []

- id: x_command_user_interface_extensions_widget_unset_value
  label: "xCommand UserInterface Extensions Widget UnsetValue"
  kind: action
  command: "xCommand UserInterface Extensions Widget UnsetValue"
  params: []

- id: x_command_user_interface_led_control_color_set
  label: "xCommand UserInterface LedControl Color Set"
  kind: action
  command: "xCommand UserInterface LedControl Color Set"
  params: []

- id: x_command_user_interface_message_alert_clear
  label: "xCommand UserInterface Message Alert Clear"
  kind: action
  command: "xCommand UserInterface Message Alert Clear"
  params: []

- id: x_command_user_interface_message_alert_display
  label: "xCommand UserInterface Message Alert Display"
  kind: action
  command: "xCommand UserInterface Message Alert Display"
  params: []

- id: x_command_user_interface_message_prompt_clear
  label: "xCommand UserInterface Message Prompt Clear"
  kind: action
  command: "xCommand UserInterface Message Prompt Clear"
  params: []

- id: x_command_user_interface_message_prompt_display
  label: "xCommand UserInterface Message Prompt Display"
  kind: action
  command: "xCommand UserInterface Message Prompt Display"
  params: []

- id: x_command_user_interface_message_prompt_response
  label: "xCommand UserInterface Message Prompt Response"
  kind: action
  command: "xCommand UserInterface Message Prompt Response"
  params: []

- id: x_command_user_interface_message_rating_clear
  label: "xCommand UserInterface Message Rating Clear"
  kind: action
  command: "xCommand UserInterface Message Rating Clear"
  params: []

- id: x_command_user_interface_message_rating_display
  label: "xCommand UserInterface Message Rating Display"
  kind: action
  command: "xCommand UserInterface Message Rating Display"
  params: []

- id: x_command_user_interface_message_rating_response
  label: "xCommand UserInterface Message Rating Response"
  kind: action
  command: "xCommand UserInterface Message Rating Response"
  params: []

- id: x_command_user_interface_message_text_input_clear
  label: "xCommand UserInterface Message TextInput Clear"
  kind: action
  command: "xCommand UserInterface Message TextInput Clear"
  params: []

- id: x_command_user_interface_message_text_input_display
  label: "xCommand UserInterface Message TextInput Display"
  kind: action
  command: "xCommand UserInterface Message TextInput Display"
  params: []

- id: x_command_user_interface_message_text_input_response
  label: "xCommand UserInterface Message TextInput Response"
  kind: action
  command: "xCommand UserInterface Message TextInput Response"
  params: []

- id: x_command_user_interface_message_text_line_clear
  label: "xCommand UserInterface Message TextLine Clear"
  kind: action
  command: "xCommand UserInterface Message TextLine Clear"
  params: []

- id: x_command_user_interface_message_text_line_display
  label: "xCommand UserInterface Message TextLine Display"
  kind: action
  command: "xCommand UserInterface Message TextLine Display"
  params: []

- id: x_command_user_interface_presentation_external_source_add
  label: "xCommand UserInterface Presentation ExternalSource Add"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource Add"
  params: []

- id: x_command_user_interface_presentation_external_source_remove
  label: "xCommand UserInterface Presentation ExternalSource Remove"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource Remove"
  params: []

- id: x_command_user_interface_presentation_external_source_remove_all
  label: "xCommand UserInterface Presentation ExternalSource RemoveAll"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource RemoveAll"
  params: []

- id: x_command_user_interface_presentation_external_source_select
  label: "xCommand UserInterface Presentation ExternalSource Select"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource Select"
  params: []

- id: x_command_user_interface_presentation_external_source_list
  label: "xCommand UserInterface Presentation ExternalSource List"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource List"
  params: []

- id: x_command_user_interface_presentation_external_source_state_set
  label: "xCommand UserInterface Presentation ExternalSource State Set"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource State Set"
  params: []

- id: x_command_user_interface_screen_lock_admin_initiate_recovery
  label: "xCommand UserInterface ScreenLock AdminInitiateRecovery"
  kind: action
  command: "xCommand UserInterface ScreenLock AdminInitiateRecovery"
  params: []

- id: x_command_user_interface_translation_override_clear
  label: "xCommand UserInterface Translation Override Clear"
  kind: action
  command: "xCommand UserInterface Translation Override Clear"
  params: []

- id: x_command_user_interface_translation_override_get
  label: "xCommand UserInterface Translation Override Get"
  kind: action
  command: "xCommand UserInterface Translation Override Get"
  params: []

- id: x_command_user_interface_translation_override_set
  label: "xCommand UserInterface Translation Override Set"
  kind: action
  command: "xCommand UserInterface Translation Override Set"
  params: []

- id: x_command_user_interface_wallpaper_bundle_list
  label: "xCommand UserInterface WallpaperBundle List"
  kind: action
  command: "xCommand UserInterface WallpaperBundle List"
  params: []

- id: x_command_user_interface_wallpaper_bundle_clear
  label: "xCommand UserInterface WallpaperBundle Clear"
  kind: action
  command: "xCommand UserInterface WallpaperBundle Clear"
  params: []

- id: x_command_user_interface_wallpaper_bundle_set
  label: "xCommand UserInterface WallpaperBundle Set"
  kind: action
  command: "xCommand UserInterface WallpaperBundle Set"
  params: []

- id: x_command_user_interface_web_view_clear
  label: "xCommand UserInterface WebView Clear"
  kind: action
  command: "xCommand UserInterface WebView Clear"
  params: []

- id: x_command_user_interface_web_view_display
  label: "xCommand UserInterface WebView Display"
  kind: action
  command: "xCommand UserInterface WebView Display"
  params: []

- id: x_command_user_management_remote_support_user_create
  label: "xCommand UserManagement RemoteSupportUser Create"
  kind: action
  command: "xCommand UserManagement RemoteSupportUser Create"
  params: []

- id: x_command_user_management_remote_support_user_get_state
  label: "xCommand UserManagement RemoteSupportUser GetState"
  kind: action
  command: "xCommand UserManagement RemoteSupportUser GetState"
  params: []

- id: x_command_user_management_remote_support_user_delete
  label: "xCommand UserManagement RemoteSupportUser Delete"
  kind: action
  command: "xCommand UserManagement RemoteSupportUser Delete"
  params: []

- id: x_command_user_management_remote_support_user_disable_permanently
  label: "xCommand UserManagement RemoteSupportUser DisablePermanently"
  kind: action
  command: "xCommand UserManagement RemoteSupportUser DisablePermanently"
  params: []

- id: x_command_user_management_user_add
  label: "xCommand UserManagement User Add"
  kind: action
  command: "xCommand UserManagement User Add"
  params: []

- id: x_command_user_management_user_delete
  label: "xCommand UserManagement User Delete"
  kind: action
  command: "xCommand UserManagement User Delete"
  params: []

- id: x_command_user_management_user_get
  label: "xCommand UserManagement User Get"
  kind: action
  command: "xCommand UserManagement User Get"
  params: []

- id: x_command_user_management_user_list
  label: "xCommand UserManagement User List"
  kind: action
  command: "xCommand UserManagement User List"
  params: []

- id: x_command_user_management_user_modify
  label: "xCommand UserManagement User Modify"
  kind: action
  command: "xCommand UserManagement User Modify"
  params: []

- id: x_command_user_management_user_passphrase_change
  label: "xCommand UserManagement User Passphrase Change"
  kind: action
  command: "xCommand UserManagement User Passphrase Change"
  params: []

- id: x_command_user_management_user_passphrase_set
  label: "xCommand UserManagement User Passphrase Set"
  kind: action
  command: "xCommand UserManagement User Passphrase Set"
  params: []

- id: x_command_user_management_user_unblock
  label: "xCommand UserManagement User Unblock"
  kind: action
  command: "xCommand UserManagement User Unblock"
  params: []

- id: x_command_user_presence_custom_status_clear
  label: "xCommand UserPresence CustomStatus Clear"
  kind: action
  command: "xCommand UserPresence CustomStatus Clear"
  params: []

- id: x_command_user_presence_custom_status_get_recents_list
  label: "xCommand UserPresence CustomStatus GetRecentsList"
  kind: action
  command: "xCommand UserPresence CustomStatus GetRecentsList"
  params: []

- id: x_command_user_presence_custom_status_set
  label: "xCommand UserPresence CustomStatus Set"
  kind: action
  command: "xCommand UserPresence CustomStatus Set"
  params: []

- id: x_command_video_active_speaker_pip_set
  label: "xCommand Video ActiveSpeakerPIP Set"
  kind: action
  command: "xCommand Video ActiveSpeakerPIP Set"
  params: []

- id: x_command_video_cec_input_key_click
  label: "xCommand Video CEC Input KeyClick"
  kind: action
  command: "xCommand Video CEC Input KeyClick"
  params: []

- id: x_command_video_cec_output_key_click
  label: "xCommand Video CEC Output KeyClick"
  kind: action
  command: "xCommand Video CEC Output KeyClick"
  params: []

- id: x_command_video_cec_output_send_active_source_request
  label: "xCommand Video CEC Output SendActiveSourceRequest"
  kind: action
  command: "xCommand Video CEC Output SendActiveSourceRequest"
  params: []

- id: x_command_video_cec_output_send_inactive_source_request
  label: "xCommand Video CEC Output SendInactiveSourceRequest"
  kind: action
  command: "xCommand Video CEC Output SendInactiveSourceRequest"
  params: []

- id: x_command_video_graphics_text_display
  label: "xCommand Video Graphics Text Display"
  kind: action
  command: "xCommand Video Graphics Text Display"
  params: []

- id: x_command_video_graphics_clear
  label: "xCommand Video Graphics Clear"
  kind: action
  command: "xCommand Video Graphics Clear"
  params: []

- id: x_command_video_input_main_video_mute
  label: "xCommand Video Input MainVideo Mute"
  kind: action
  command: "xCommand Video Input MainVideo Mute"
  params: []

- id: x_command_video_input_main_video_unmute
  label: "xCommand Video Input MainVideo Unmute"
  kind: action
  command: "xCommand Video Input MainVideo Unmute"
  params: []

- id: x_command_video_input_miracast_activate
  label: "xCommand Video Input Miracast Activate"
  kind: action
  command: "xCommand Video Input Miracast Activate"
  params: []

- id: x_command_video_input_miracast_deactivate
  label: "xCommand Video Input Miracast Deactivate"
  kind: action
  command: "xCommand Video Input Miracast Deactivate"
  params: []

- id: x_command_video_input_miracast_pin_attempts_reset
  label: "xCommand Video Input Miracast PinAttemptsReset"
  kind: action
  command: "xCommand Video Input Miracast PinAttemptsReset"
  params: []

- id: x_command_video_input_set_main_video_source
  label: "xCommand Video Input SetMainVideoSource"
  kind: action
  command: "xCommand Video Input SetMainVideoSource"
  params: []

- id: x_command_video_layout_layout_family_set
  label: "xCommand Video Layout LayoutFamily Set"
  kind: action
  command: "xCommand Video Layout LayoutFamily Set"
  params: []

- id: x_command_video_layout_hide_non_video_activate
  label: "xCommand Video Layout HideNonVideo Activate"
  kind: action
  command: "xCommand Video Layout HideNonVideo Activate"
  params: []

- id: x_command_video_layout_hide_non_video_deactivate
  label: "xCommand Video Layout HideNonVideo Deactivate"
  kind: action
  command: "xCommand Video Layout HideNonVideo Deactivate"
  params: []

- id: x_command_video_layout_set_layout
  label: "xCommand Video Layout SetLayout"
  kind: action
  command: "xCommand Video Layout SetLayout"
  params: []

- id: x_command_video_layout_stage_participants_reset
  label: "xCommand Video Layout StageParticipants Reset"
  kind: action
  command: "xCommand Video Layout StageParticipants Reset"
  params: []

- id: x_command_video_layout_stage_participants_set_by_id
  label: "xCommand Video Layout StageParticipants Set ById"
  kind: action
  command: "xCommand Video Layout StageParticipants Set ById"
  params: []

- id: x_command_video_layout_stage_participants_set_by_name
  label: "xCommand Video Layout StageParticipants Set ByName"
  kind: action
  command: "xCommand Video Layout StageParticipants Set ByName"
  params: []

- id: x_command_video_matrix_assign
  label: "xCommand Video Matrix Assign"
  kind: action
  command: "xCommand Video Matrix Assign"
  params: []

- id: x_command_video_matrix_reset
  label: "xCommand Video Matrix Reset"
  kind: action
  command: "xCommand Video Matrix Reset"
  params: []

- id: x_command_video_matrix_unassign
  label: "xCommand Video Matrix Unassign"
  kind: action
  command: "xCommand Video Matrix Unassign"
  params: []

- id: x_command_video_matrix_swap
  label: "xCommand Video Matrix Swap"
  kind: action
  command: "xCommand Video Matrix Swap"
  params: []

- id: x_command_video_output_hdmi_passthrough_start
  label: "xCommand Video Output HDMI Passthrough Start"
  kind: action
  command: "xCommand Video Output HDMI Passthrough Start"
  params: []

- id: x_command_video_output_hdmi_passthrough_stop
  label: "xCommand Video Output HDMI Passthrough Stop"
  kind: action
  command: "xCommand Video Output HDMI Passthrough Stop"
  params: []

- id: x_command_video_output_monitor_backlight_set
  label: "xCommand Video Output Monitor Backlight Set"
  kind: action
  command: "xCommand Video Output Monitor Backlight Set"
  params: []

- id: x_command_video_output_monitor_color_select
  label: "xCommand Video Output Monitor Color Select"
  kind: action
  command: "xCommand Video Output Monitor Color Select"
  params: []

- id: x_command_video_output_monitor_reset
  label: "xCommand Video Output Monitor Reset"
  kind: action
  command: "xCommand Video Output Monitor Reset"
  params: []

- id: x_command_video_presentation_view_set
  label: "xCommand Video PresentationView Set"
  kind: action
  command: "xCommand Video PresentationView Set"
  params: []

- id: x_command_video_presentation_pip_set
  label: "xCommand Video PresentationPIP Set"
  kind: action
  command: "xCommand Video PresentationPIP Set"
  params: []

- id: x_command_video_selfview_set
  label: "xCommand Video Selfview Set"
  kind: action
  command: "xCommand Video Selfview Set"
  params: []

- id: x_command_web_engine_allow_insecure_https_add
  label: "xCommand WebEngine AllowInsecureHttps Add"
  kind: action
  command: "xCommand WebEngine AllowInsecureHttps Add"
  params: []

- id: x_command_web_engine_allow_insecure_https_remove
  label: "xCommand WebEngine AllowInsecureHttps Remove"
  kind: action
  command: "xCommand WebEngine AllowInsecureHttps Remove"
  params: []

- id: x_command_web_engine_allow_insecure_https_remove_all
  label: "xCommand WebEngine AllowInsecureHttps RemoveAll"
  kind: action
  command: "xCommand WebEngine AllowInsecureHttps RemoveAll"
  params: []

- id: x_command_web_engine_allow_insecure_https_list
  label: "xCommand WebEngine AllowInsecureHttps List"
  kind: action
  command: "xCommand WebEngine AllowInsecureHttps List"
  params: []

- id: x_command_web_engine_delete_storage
  label: "xCommand WebEngine DeleteStorage"
  kind: action
  command: "xCommand WebEngine DeleteStorage"
  params: []

- id: x_command_web_engine_logging_set
  label: "xCommand WebEngine Logging Set"
  kind: action
  command: "xCommand WebEngine Logging Set"
  params: []

- id: x_command_web_engine_media_access_add
  label: "xCommand WebEngine MediaAccess Add"
  kind: action
  command: "xCommand WebEngine MediaAccess Add"
  params: []

- id: x_command_web_engine_media_access_remove
  label: "xCommand WebEngine MediaAccess Remove"
  kind: action
  command: "xCommand WebEngine MediaAccess Remove"
  params: []

- id: x_command_web_engine_media_access_list
  label: "xCommand WebEngine MediaAccess List"
  kind: action
  command: "xCommand WebEngine MediaAccess List"
  params: []

- id: x_command_web_engine_media_access_remove_all
  label: "xCommand WebEngine MediaAccess RemoveAll"
  kind: action
  command: "xCommand WebEngine MediaAccess RemoveAll"
  params: []

- id: x_command_web_engine_tracing_start
  label: "xCommand WebEngine Tracing Start"
  kind: action
  command: "xCommand WebEngine Tracing Start"
  params: []

- id: x_command_web_engine_tracing_stop
  label: "xCommand WebEngine Tracing Stop"
  kind: action
  command: "xCommand WebEngine Tracing Stop"
  params: []

- id: x_command_web_rtc_join
  label: "xCommand WebRTC Join"
  kind: action
  command: "xCommand WebRTC Join"
  params: []

- id: x_command_web_rtc_provider_current_diagnostics_send
  label: "xCommand WebRTC Provider Current Diagnostics Send"
  kind: action
  command: "xCommand WebRTC Provider Current Diagnostics Send"
  params: []

- id: x_command_webex_join
  label: "xCommand Webex Join"
  kind: action
  command: "xCommand Webex Join"
  params: []

- id: x_command_web_rtc_provider_google_meet_meeting_number_validate
  label: "xCommand WebRTC Provider GoogleMeet MeetingNumber Validate"
  kind: action
  command: "xCommand WebRTC Provider GoogleMeet MeetingNumber Validate"
  params: []

- id: x_command_webex_meetings_instant_meeting_start
  label: "xCommand Webex Meetings InstantMeeting Start"
  kind: action
  command: "xCommand Webex Meetings InstantMeeting Start"
  params: []

- id: x_command_webex_registration_convert_to_cloud
  label: "xCommand Webex Registration ConvertToCloud"
  kind: action
  command: "xCommand Webex Registration ConvertToCloud"
  params: []

- id: x_command_webex_registration_airgap_prepare
  label: "xCommand Webex Registration Airgap Prepare"
  kind: action
  command: "xCommand Webex Registration Airgap Prepare"
  params: []

- id: x_command_webex_registration_logout
  label: "xCommand Webex Registration Logout"
  kind: action
  command: "xCommand Webex Registration Logout"
  params: []

- id: x_command_webex_registration_cancel
  label: "xCommand Webex Registration Cancel"
  kind: action
  command: "xCommand Webex Registration Cancel"
  params: []

- id: x_command_webex_registration_start
  label: "xCommand Webex Registration Start"
  kind: action
  command: "xCommand Webex Registration Start"
  params: []

- id: x_command_webex_software_upgrade
  label: "xCommand Webex Software Upgrade"
  kind: action
  command: "xCommand Webex Software Upgrade"
  params: []

- id: x_command_webex_software_validate
  label: "xCommand Webex Software Validate"
  kind: action
  command: "xCommand Webex Software Validate"
  params: []

- id: x_command_whiteboard_email_send
  label: "xCommand Whiteboard Email Send"
  kind: action
  command: "xCommand Whiteboard Email Send"
  params: []

- id: x_command_whiteboard_email_cancel
  label: "xCommand Whiteboard Email Cancel"
  kind: action
  command: "xCommand Whiteboard Email Cancel"
  params: []

- id: x_command_zoom_join
  label: "xCommand Zoom Join"
  kind: action
  command: "xCommand Zoom Join"
  params: []

- id: x_command_zoom_registration_start
  label: "xCommand Zoom Registration Start"
  kind: action
  command: "xCommand Zoom Registration Start"
  params: []

- id: x_command_zoom_reset
  label: "xCommand Zoom Reset"
  kind: action
  command: "xCommand Zoom Reset"
  params: []
```

## Feedbacks
```yaml
- id: x_status_audio_devices_handset_usb_cradle
  label: "xStatus Audio Devices HandsetUSB Cradle"
  kind: query
  query_command: "xStatus Audio Devices HandsetUSB Cradle"

- id: x_status_audio_devices_bluetooth_active_profile
  label: "xStatus Audio Devices Bluetooth ActiveProfile"
  kind: query
  query_command: "xStatus Audio Devices Bluetooth ActiveProfile"

- id: x_status_audio_devices_headset_analog_connection_status
  label: "xStatus Audio Devices HeadsetAnalog ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Devices HeadsetAnalog ConnectionStatus"

- id: x_status_audio_devices_handset_usb_connection_status
  label: "xStatus Audio Devices HandsetUSB ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Devices HandsetUSB ConnectionStatus"

- id: x_status_audio_devices_headset_usb_connection_status
  label: "xStatus Audio Devices HeadsetUSB ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Devices HeadsetUSB ConnectionStatus"

- id: x_status_audio_devices_headset_usb_description
  label: "xStatus Audio Devices HeadsetUSB Description"
  kind: query
  query_command: "xStatus Audio Devices HeadsetUSB Description"

- id: x_status_audio_input_connectors_ethernet_n_packets_lost_total
  label: "xStatus Audio Input Connectors Ethernet [n] PacketsLost Total"
  kind: query
  query_command: "xStatus Audio Input Connectors Ethernet [n] PacketsLost Total"

- id: x_status_audio_devices_headset_usb_manufacturer
  label: "xStatus Audio Devices HeadsetUSB Manufacturer"
  kind: query
  query_command: "xStatus Audio Devices HeadsetUSB Manufacturer"

- id: x_status_audio_input_connectors_ethernet_n_packets_received_total
  label: "xStatus Audio Input Connectors Ethernet [n] PacketsReceived Total"
  kind: query
  query_command: "xStatus Audio Input Connectors Ethernet [n] PacketsReceived Total"

- id: x_status_audio_input_connectors_ethernet_n_mute
  label: "xStatus Audio Input Connectors Ethernet [n] Mute"
  kind: query
  query_command: "xStatus Audio Input Connectors Ethernet [n] Mute"

- id: x_status_audio_input_connectors_ethernet_n_stream_name
  label: "xStatus Audio Input Connectors Ethernet [n] StreamName"
  kind: query
  query_command: "xStatus Audio Input Connectors Ethernet [n] StreamName"

- id: x_status_audio_input_connectors_hdmi_n_mute
  label: "xStatus Audio Input Connectors HDMI [n] Mute"
  kind: query
  query_command: "xStatus Audio Input Connectors HDMI [n] Mute"

- id: x_status_audio_input_connectors_line_n_mute
  label: "xStatus Audio Input Connectors Line [n] Mute"
  kind: query
  query_command: "xStatus Audio Input Connectors Line [n] Mute"

- id: x_status_audio_input_connectors_microphone_n_connection_status
  label: "xStatus Audio Input Connectors Microphone [n] ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Input Connectors Microphone [n] ConnectionStatus"

- id: x_status_audio_input_connectors_microphone_n_ec_reference_delay
  label: "xStatus Audio Input Connectors Microphone [n] EcReferenceDelay"
  kind: query
  query_command: "xStatus Audio Input Connectors Microphone [n] EcReferenceDelay"

- id: x_status_audio_input_connectors_microphone_n_mute
  label: "xStatus Audio Input Connectors Microphone [n] Mute"
  kind: query
  query_command: "xStatus Audio Input Connectors Microphone [n] Mute"

- id: x_status_audio_input_connectors_usbc_n_mute
  label: "xStatus Audio Input Connectors USBC [n] Mute"
  kind: query
  query_command: "xStatus Audio Input Connectors USBC [n] Mute"

- id: x_status_audio_input_ethernet_discovered_stream_n_channels
  label: "xStatus Audio Input Ethernet DiscoveredStream [n] Channels"
  kind: query
  query_command: "xStatus Audio Input Ethernet DiscoveredStream [n] Channels"

- id: x_status_audio_input_ethernet_discovered_stream_n_media_ip
  label: "xStatus Audio Input Ethernet DiscoveredStream [n] MediaIP"
  kind: query
  query_command: "xStatus Audio Input Ethernet DiscoveredStream [n] MediaIP"

- id: x_status_audio_input_ethernet_discovered_stream_n_name
  label: "xStatus Audio Input Ethernet DiscoveredStream [n] Name"
  kind: query
  query_command: "xStatus Audio Input Ethernet DiscoveredStream [n] Name"

- id: x_status_audio_input_ethernet_discovered_stream_n_origin_ip
  label: "xStatus Audio Input Ethernet DiscoveredStream [n] OriginIP"
  kind: query
  query_command: "xStatus Audio Input Ethernet DiscoveredStream [n] OriginIP"

- id: x_status_audio_input_ethernet_discovered_stream_n_status
  label: "xStatus Audio Input Ethernet DiscoveredStream [n] Status"
  kind: query
  query_command: "xStatus Audio Input Ethernet DiscoveredStream [n] Status"

- id: x_status_audio_input_local_input_n_connector_n
  label: "xStatus Audio Input LocalInput [n] Connector [n]"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Connector [n]"

- id: x_status_audio_input_local_input_n_agc
  label: "xStatus Audio Input LocalInput [n] AGC"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] AGC"

- id: x_status_audio_input_local_input_n_direct
  label: "xStatus Audio Input LocalInput [n] Direct"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Direct"

- id: x_status_audio_input_local_input_n_channels
  label: "xStatus Audio Input LocalInput [n] Channels"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Channels"

- id: x_status_audio_input_local_input_n_mixer_mode
  label: "xStatus Audio Input LocalInput [n] MixerMode"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] MixerMode"

- id: x_status_audio_input_local_input_n_name
  label: "xStatus Audio Input LocalInput [n] Name"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Name"

- id: x_status_audio_input_remote_input_n_call_id
  label: "xStatus Audio Input RemoteInput [n] CallId"
  kind: query
  query_command: "xStatus Audio Input RemoteInput [n] CallId"

- id: x_status_audio_input_local_input_n_mute
  label: "xStatus Audio Input LocalInput [n] Mute"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Mute"

- id: x_status_audio_input_remote_input_n_role
  label: "xStatus Audio Input RemoteInput [n] Role"
  kind: query
  query_command: "xStatus Audio Input RemoteInput [n] Role"

- id: x_status_audio_input_remote_input_n_stream_id
  label: "xStatus Audio Input RemoteInput [n] StreamId"
  kind: query
  query_command: "xStatus Audio Input RemoteInput [n] StreamId"

- id: x_status_audio_microphones_music_mode
  label: "xStatus Audio Microphones MusicMode"
  kind: query
  query_command: "xStatus Audio Microphones MusicMode"

- id: x_status_audio_microphones_noise_removal
  label: "xStatus Audio Microphones NoiseRemoval"
  kind: query
  query_command: "xStatus Audio Microphones NoiseRemoval"

- id: x_status_audio_microphones_voice_activity_detector_activity
  label: "xStatus Audio Microphones VoiceActivityDetector Activity"
  kind: query
  query_command: "xStatus Audio Microphones VoiceActivityDetector Activity"

- id: x_status_audio_microphones_mute
  label: "xStatus Audio Microphones Mute"
  kind: query
  query_command: "xStatus Audio Microphones Mute"

- id: x_status_audio_output_connectors_arc_n_delay_ms
  label: "xStatus Audio Output Connectors ARC [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors ARC [n] DelayMs"

- id: x_status_audio_output_connectors_ethernet_n_delay_ms
  label: "xStatus Audio Output Connectors Ethernet [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors Ethernet [n] DelayMs"

- id: x_status_audio_output_connectors_arc_n_mode
  label: "xStatus Audio Output Connectors ARC [n] Mode"
  kind: query
  query_command: "xStatus Audio Output Connectors ARC [n] Mode"

- id: x_status_audio_output_connectors_ethernet_n_channels
  label: "xStatus Audio Output Connectors Ethernet [n] Channels"
  kind: query
  query_command: "xStatus Audio Output Connectors Ethernet [n] Channels"

- id: x_status_audio_output_connectors_ethernet_n_media_ip
  label: "xStatus Audio Output Connectors Ethernet [n] MediaIP"
  kind: query
  query_command: "xStatus Audio Output Connectors Ethernet [n] MediaIP"

- id: x_status_audio_output_connectors_ethernet_n_stream_name
  label: "xStatus Audio Output Connectors Ethernet [n] StreamName"
  kind: query
  query_command: "xStatus Audio Output Connectors Ethernet [n] StreamName"

- id: x_status_audio_output_connectors_hdmi_n_delay_ms
  label: "xStatus Audio Output Connectors HDMI [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors HDMI [n] DelayMs"

- id: x_status_audio_output_connectors_hdmi_n_mic_passthrough
  label: "xStatus Audio Output Connectors HDMI [n] MicPassthrough"
  kind: query
  query_command: "xStatus Audio Output Connectors HDMI [n] MicPassthrough"

- id: x_status_audio_output_connectors_hdmi_n_mode
  label: "xStatus Audio Output Connectors HDMI [n] Mode"
  kind: query
  query_command: "xStatus Audio Output Connectors HDMI [n] Mode"

- id: x_status_audio_output_connectors_internal_speaker_n_delay_ms
  label: "xStatus Audio Output Connectors InternalSpeaker [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors InternalSpeaker [n] DelayMs"

- id: x_status_audio_output_connectors_usbinterface_n_delay_ms
  label: "xStatus Audio Output Connectors USBInterface [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors USBInterface [n] DelayMs"

- id: x_status_audio_output_connectors_line_n_connection_status
  label: "xStatus Audio Output Connectors Line [n] ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Output Connectors Line [n] ConnectionStatus"

- id: x_status_audio_output_local_output_n_autoconnect_remote
  label: "xStatus Audio Output LocalOutput [n] AutoconnectRemote"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] AutoconnectRemote"

- id: x_status_audio_output_connectors_line_n_delay_ms
  label: "xStatus Audio Output Connectors Line [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors Line [n] DelayMs"

- id: x_status_audio_output_local_output_n_channels
  label: "xStatus Audio Output LocalOutput [n] Channels"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Channels"

- id: x_status_audio_output_local_output_n_connector_n
  label: "xStatus Audio Output LocalOutput [n] Connector [n]"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Connector [n]"

- id: x_status_audio_output_local_output_n_loudspeaker
  label: "xStatus Audio Output LocalOutput [n] Loudspeaker"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Loudspeaker"

- id: x_status_audio_output_local_output_n_name
  label: "xStatus Audio Output LocalOutput [n] Name"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Name"

- id: x_status_audio_output_local_output_n_input_n_gain
  label: "xStatus Audio Output LocalOutput [n] Input [n] Gain"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Input [n] Gain"

- id: x_status_audio_output_local_output_n_volume_controlled
  label: "xStatus Audio Output LocalOutput [n] VolumeControlled"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] VolumeControlled"

- id: x_status_audio_output_remote_output_n_call_id
  label: "xStatus Audio Output RemoteOutput [n] CallId"
  kind: query
  query_command: "xStatus Audio Output RemoteOutput [n] CallId"

- id: x_status_audio_output_measured_hdmi_arc_delay
  label: "xStatus Audio Output MeasuredHdmiArcDelay"
  kind: query
  query_command: "xStatus Audio Output MeasuredHdmiArcDelay"

- id: x_status_audio_output_measured_hdmi_delay
  label: "xStatus Audio Output MeasuredHdmiDelay"
  kind: query
  query_command: "xStatus Audio Output MeasuredHdmiDelay"

- id: x_status_audio_output_remote_output_n_input_n_gain
  label: "xStatus Audio Output RemoteOutput [n] Input [n] Gain"
  kind: query
  query_command: "xStatus Audio Output RemoteOutput [n] Input [n] Gain"

- id: x_status_audio_output_remote_output_n_role
  label: "xStatus Audio Output RemoteOutput [n] Role"
  kind: query
  query_command: "xStatus Audio Output RemoteOutput [n] Role"

- id: x_status_audio_usb_connection_status_capture
  label: "xStatus Audio USB ConnectionStatus Capture"
  kind: query
  query_command: "xStatus Audio USB ConnectionStatus Capture"

- id: x_status_audio_output_reported_hdmi_cec_delay
  label: "xStatus Audio Output ReportedHdmiCecDelay"
  kind: query
  query_command: "xStatus Audio Output ReportedHdmiCecDelay"

- id: x_status_audio_selected_device
  label: "xStatus Audio SelectedDevice"
  kind: query
  query_command: "xStatus Audio SelectedDevice"

- id: x_status_audio_usb_connection_status_playback
  label: "xStatus Audio USB ConnectionStatus Playback"
  kind: query
  query_command: "xStatus Audio USB ConnectionStatus Playback"

- id: x_status_audio_usb_product
  label: "xStatus Audio USB Product"
  kind: query
  query_command: "xStatus Audio USB Product"

- id: x_status_audio_usb_serial_number
  label: "xStatus Audio USB SerialNumber"
  kind: query
  query_command: "xStatus Audio USB SerialNumber"

- id: x_status_audio_usb_terminal_type_playback
  label: "xStatus Audio USB TerminalType Playback"
  kind: query
  query_command: "xStatus Audio USB TerminalType Playback"

- id: x_status_audio_usb_volume_control_capture_max
  label: "xStatus Audio USB VolumeControl Capture Max"
  kind: query
  query_command: "xStatus Audio USB VolumeControl Capture Max"

- id: x_status_audio_usb_terminal_type_capture
  label: "xStatus Audio USB TerminalType Capture"
  kind: query
  query_command: "xStatus Audio USB TerminalType Capture"

- id: x_status_audio_usb_volume_control_capture_min
  label: "xStatus Audio USB VolumeControl Capture Min"
  kind: query
  query_command: "xStatus Audio USB VolumeControl Capture Min"

- id: x_status_audio_usb_volume_control_capture_value
  label: "xStatus Audio USB VolumeControl Capture Value"
  kind: query
  query_command: "xStatus Audio USB VolumeControl Capture Value"

- id: x_status_audio_usb_volume_control_playback_value
  label: "xStatus Audio USB VolumeControl Playback Value"
  kind: query
  query_command: "xStatus Audio USB VolumeControl Playback Value"

- id: x_status_audio_usb_volume_control_playback_max
  label: "xStatus Audio USB VolumeControl Playback Max"
  kind: query
  query_command: "xStatus Audio USB VolumeControl Playback Max"

- id: x_status_audio_ultrasound_volume
  label: "xStatus Audio Ultrasound Volume"
  kind: query
  query_command: "xStatus Audio Ultrasound Volume"

- id: x_status_audio_usb_volume_control_playback_min
  label: "xStatus Audio USB VolumeControl Playback Min"
  kind: query
  query_command: "xStatus Audio USB VolumeControl Playback Min"

- id: x_status_audio_volume
  label: "xStatus Audio Volume"
  kind: query
  query_command: "xStatus Audio Volume"

- id: x_status_audio_volume_headset_bluetooth
  label: "xStatus Audio VolumeHeadsetBluetooth"
  kind: query
  query_command: "xStatus Audio VolumeHeadsetBluetooth"

- id: x_status_audio_volume_mute
  label: "xStatus Audio VolumeMute"
  kind: query
  query_command: "xStatus Audio VolumeMute"

- id: x_status_bluetooth_streaming_album
  label: "xStatus Bluetooth Streaming Album"
  kind: query
  query_command: "xStatus Bluetooth Streaming Album"

- id: x_status_bluetooth_streaming_state
  label: "xStatus Bluetooth Streaming State"
  kind: query
  query_command: "xStatus Bluetooth Streaming State"

- id: x_status_bluetooth_streaming_artist
  label: "xStatus Bluetooth Streaming Artist"
  kind: query
  query_command: "xStatus Bluetooth Streaming Artist"

- id: x_status_bluetooth_streaming_title
  label: "xStatus Bluetooth Streaming Title"
  kind: query
  query_command: "xStatus Bluetooth Streaming Title"

- id: x_status_bluetooth_streaming_duration
  label: "xStatus Bluetooth Streaming Duration"
  kind: query
  query_command: "xStatus Bluetooth Streaming Duration"

- id: x_status_bookings_availability_status
  label: "xStatus Bookings Availability Status"
  kind: query
  query_command: "xStatus Bookings Availability Status"

- id: x_status_bookings_current_id
  label: "xStatus Bookings Current Id"
  kind: query
  query_command: "xStatus Bookings Current Id"

- id: x_status_bookings_availability_time_stamp
  label: "xStatus Bookings Availability TimeStamp"
  kind: query
  query_command: "xStatus Bookings Availability TimeStamp"

- id: x_status_call_n_answer_state
  label: "xStatus Call [n] AnswerState"
  kind: query
  query_command: "xStatus Call [n] AnswerState"

- id: x_status_call_n_callback_number
  label: "xStatus Call [n] CallbackNumber"
  kind: query
  query_command: "xStatus Call [n] CallbackNumber"

- id: x_status_call_n_attended_transfer_from
  label: "xStatus Call [n] AttendedTransferFrom"
  kind: query
  query_command: "xStatus Call [n] AttendedTransferFrom"

- id: x_status_call_n_device_type
  label: "xStatus Call [n] DeviceType"
  kind: query
  query_command: "xStatus Call [n] DeviceType"

- id: x_status_call_n_call_type
  label: "xStatus Call [n] CallType"
  kind: query
  query_command: "xStatus Call [n] CallType"

- id: x_status_call_n_direction
  label: "xStatus Call [n] Direction"
  kind: query
  query_command: "xStatus Call [n] Direction"

- id: x_status_call_n_display_name
  label: "xStatus Call [n] DisplayName"
  kind: query
  query_command: "xStatus Call [n] DisplayName"

- id: x_status_call_n_duration
  label: "xStatus Call [n] Duration"
  kind: query
  query_command: "xStatus Call [n] Duration"

- id: x_status_call_n_encryption_type
  label: "xStatus Call [n] Encryption Type"
  kind: query
  query_command: "xStatus Call [n] Encryption Type"

- id: x_status_call_n_facility_service_id
  label: "xStatus Call [n] FacilityServiceId"
  kind: query
  query_command: "xStatus Call [n] FacilityServiceId"

- id: x_status_call_n_hold_reason
  label: "xStatus Call [n] HoldReason"
  kind: query
  query_command: "xStatus Call [n] HoldReason"

- id: x_status_call_n_placed_on_hold
  label: "xStatus Call [n] PlacedOnHold"
  kind: query
  query_command: "xStatus Call [n] PlacedOnHold"

- id: x_status_call_n_protocol
  label: "xStatus Call [n] Protocol"
  kind: query
  query_command: "xStatus Call [n] Protocol"

- id: x_status_call_n_ice
  label: "xStatus Call [n] Ice"
  kind: query
  query_command: "xStatus Call [n] Ice"

- id: x_status_call_n_receive_call_rate
  label: "xStatus Call [n] ReceiveCallRate"
  kind: query
  query_command: "xStatus Call [n] ReceiveCallRate"

- id: x_status_call_n_remote_number
  label: "xStatus Call [n] RemoteNumber"
  kind: query
  query_command: "xStatus Call [n] RemoteNumber"

- id: x_status_call_n_transmit_call_rate
  label: "xStatus Call [n] TransmitCallRate"
  kind: query
  query_command: "xStatus Call [n] TransmitCallRate"

- id: x_status_call_n_status
  label: "xStatus Call [n] Status"
  kind: query
  query_command: "xStatus Call [n] Status"

- id: x_status_cameras_camera_n_capabilities_options
  label: "xStatus Cameras Camera [n] Capabilities Options"
  kind: query
  query_command: "xStatus Cameras Camera [n] Capabilities Options"

- id: x_status_cameras_background_image
  label: "xStatus Cameras Background Image"
  kind: query
  query_command: "xStatus Cameras Background Image"

- id: x_status_cameras_camera_n_connected
  label: "xStatus Cameras Camera [n] Connected"
  kind: query
  query_command: "xStatus Cameras Camera [n] Connected"

- id: x_status_cameras_background_mode
  label: "xStatus Cameras Background Mode"
  kind: query
  query_command: "xStatus Cameras Background Mode"

- id: x_status_cameras_camera_n_detected_connector
  label: "xStatus Cameras Camera [n] DetectedConnector"
  kind: query
  query_command: "xStatus Cameras Camera [n] DetectedConnector"

- id: x_status_cameras_camera_n_flip
  label: "xStatus Cameras Camera [n] Flip"
  kind: query
  query_command: "xStatus Cameras Camera [n] Flip"

- id: x_status_cameras_camera_n_lenses_n_lens
  label: "xStatus Cameras Camera [n] Lenses [n] Lens"
  kind: query
  query_command: "xStatus Cameras Camera [n] Lenses [n] Lens"

- id: x_status_cameras_camera_n_framerate
  label: "xStatus Cameras Camera [n] Framerate"
  kind: query
  query_command: "xStatus Cameras Camera [n] Framerate"

- id: x_status_cameras_camera_n_lighting_conditions
  label: "xStatus Cameras Camera [n] LightingConditions"
  kind: query
  query_command: "xStatus Cameras Camera [n] LightingConditions"

- id: x_status_cameras_camera_n_hardware_id
  label: "xStatus Cameras Camera [n] HardwareID"
  kind: query
  query_command: "xStatus Cameras Camera [n] HardwareID"

- id: x_status_cameras_camera_n_mac_address
  label: "xStatus Cameras Camera [n] MacAddress"
  kind: query
  query_command: "xStatus Cameras Camera [n] MacAddress"

- id: x_status_cameras_camera_n_manufacturer
  label: "xStatus Cameras Camera [n] Manufacturer"
  kind: query
  query_command: "xStatus Cameras Camera [n] Manufacturer"

- id: x_status_cameras_camera_n_model
  label: "xStatus Cameras Camera [n] Model"
  kind: query
  query_command: "xStatus Cameras Camera [n] Model"

- id: x_status_cameras_camera_n_position_focus
  label: "xStatus Cameras Camera [n] Position Focus"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Focus"

- id: x_status_cameras_camera_n_position_lens
  label: "xStatus Cameras Camera [n] Position Lens"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Lens"

- id: x_status_cameras_camera_n_position_pan
  label: "xStatus Cameras Camera [n] Position Pan"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Pan"

- id: x_status_cameras_camera_n_position_roll
  label: "xStatus Cameras Camera [n] Position Roll"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Roll"

- id: x_status_cameras_camera_n_serial_number
  label: "xStatus Cameras Camera [n] SerialNumber"
  kind: query
  query_command: "xStatus Cameras Camera [n] SerialNumber"

- id: x_status_cameras_camera_n_position_tilt
  label: "xStatus Cameras Camera [n] Position Tilt"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Tilt"

- id: x_status_cameras_camera_n_software_id
  label: "xStatus Cameras Camera [n] SoftwareID"
  kind: query
  query_command: "xStatus Cameras Camera [n] SoftwareID"

- id: x_status_cameras_camera_n_position_zoom
  label: "xStatus Cameras Camera [n] Position Zoom"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Zoom"

- id: x_status_cameras_presenter_track_availability
  label: "xStatus Cameras PresenterTrack Availability"
  kind: query
  query_command: "xStatus Cameras PresenterTrack Availability"

- id: x_status_cameras_presenter_track_presenter_detected
  label: "xStatus Cameras PresenterTrack PresenterDetected"
  kind: query
  query_command: "xStatus Cameras PresenterTrack PresenterDetected"

- id: x_status_cameras_speaker_track_active_connector
  label: "xStatus Cameras SpeakerTrack ActiveConnector"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack ActiveConnector"

- id: x_status_cameras_presenter_track_status
  label: "xStatus Cameras PresenterTrack Status"
  kind: query
  query_command: "xStatus Cameras PresenterTrack Status"

- id: x_status_cameras_speaker_track_availability
  label: "xStatus Cameras SpeakerTrack Availability"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Availability"

- id: x_status_cameras_speaker_track_closeup_status
  label: "xStatus Cameras SpeakerTrack Closeup Status"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Closeup Status"

- id: x_status_cameras_speaker_track_background_mode
  label: "xStatus Cameras SpeakerTrack BackgroundMode"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack BackgroundMode"

- id: x_status_cameras_speaker_track_behavior_active
  label: "xStatus Cameras SpeakerTrack Behavior Active"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Behavior Active"

- id: x_status_cameras_speaker_track_frames_availability
  label: "xStatus Cameras SpeakerTrack Frames Availability"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Frames Availability"

- id: x_status_cameras_speaker_track_frames_status
  label: "xStatus Cameras SpeakerTrack Frames Status"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Frames Status"

- id: x_status_cameras_speaker_track_status
  label: "xStatus Cameras SpeakerTrack Status"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Status"

- id: x_status_cameras_speaker_track_state
  label: "xStatus Cameras SpeakerTrack State"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack State"

- id: x_status_cameras_speaker_track_view_limits_pan
  label: "xStatus Cameras SpeakerTrack ViewLimits Pan"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack ViewLimits Pan"

- id: x_status_cameras_speaker_track_view_limits_status
  label: "xStatus Cameras SpeakerTrack ViewLimits Status"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack ViewLimits Status"

- id: x_status_cameras_stereoscopic_calibrated
  label: "xStatus Cameras Stereoscopic Calibrated"
  kind: query
  query_command: "xStatus Cameras Stereoscopic Calibrated"

- id: x_status_cameras_speaker_track_view_limits_tilt
  label: "xStatus Cameras SpeakerTrack ViewLimits Tilt"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack ViewLimits Tilt"

- id: x_status_cameras_stereoscopic_status
  label: "xStatus Cameras Stereoscopic Status"
  kind: query
  query_command: "xStatus Cameras Stereoscopic Status"

- id: x_status_cameras_speaker_track_view_limits_zoom
  label: "xStatus Cameras SpeakerTrack ViewLimits Zoom"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack ViewLimits Zoom"

- id: x_status_capabilities_conference_max_active_calls
  label: "xStatus Capabilities Conference MaxActiveCalls"
  kind: query
  query_command: "xStatus Capabilities Conference MaxActiveCalls"

- id: x_status_capabilities_conference_max_video_calls
  label: "xStatus Capabilities Conference MaxVideoCalls"
  kind: query
  query_command: "xStatus Capabilities Conference MaxVideoCalls"

- id: x_status_capabilities_conference_max_audio_calls
  label: "xStatus Capabilities Conference MaxAudioCalls"
  kind: query
  query_command: "xStatus Capabilities Conference MaxAudioCalls"

- id: x_status_capabilities_conference_max_calls
  label: "xStatus Capabilities Conference MaxCalls"
  kind: query
  query_command: "xStatus Capabilities Conference MaxCalls"

- id: x_status_conference_call_n_authentication_request
  label: "xStatus Conference Call [n] AuthenticationRequest"
  kind: query
  query_command: "xStatus Conference Call [n] AuthenticationRequest"

- id: x_status_conference_active_speaker_call_id
  label: "xStatus Conference ActiveSpeaker CallId"
  kind: query
  query_command: "xStatus Conference ActiveSpeaker CallId"

- id: x_status_conference_call_n_booking_id
  label: "xStatus Conference Call [n] BookingId"
  kind: query
  query_command: "xStatus Conference Call [n] BookingId"

- id: x_status_conference_call_n_capabilities_disable_reactions
  label: "xStatus Conference Call [n] Capabilities DisableReactions"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities DisableReactions"

- id: x_status_conference_call_n_capabilities_admit_from_lobby
  label: "xStatus Conference Call [n] Capabilities AdmitFromLobby"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities AdmitFromLobby"

- id: x_status_conference_call_n_capabilities_emergency_call_capability
  label: "xStatus Conference Call [n] Capabilities EmergencyCallCapability"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities EmergencyCallCapability"

- id: x_status_conference_call_n_capabilities_dtmf
  label: "xStatus Conference Call [n] Capabilities DTMF"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities DTMF"

- id: x_status_conference_call_n_capabilities_enable_reactions
  label: "xStatus Conference Call [n] Capabilities EnableReactions"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities EnableReactions"

- id: x_status_conference_call_n_capabilities_end_meeting
  label: "xStatus Conference Call [n] Capabilities EndMeeting"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities EndMeeting"

- id: x_status_conference_call_n_capabilities_fecc_number_of_presets
  label: "xStatus Conference Call [n] Capabilities FECC NumberOfPresets"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC NumberOfPresets"

- id: x_status_conference_call_n_capabilities_fecc_number_of_sources
  label: "xStatus Conference Call [n] Capabilities FECC NumberOfSources"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC NumberOfSources"

- id: x_status_conference_call_n_capabilities_fecc_mode
  label: "xStatus Conference Call [n] Capabilities FECC Mode"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC Mode"

- id: x_status_conference_call_n_capabilities_fecc_source_n_name
  label: "xStatus Conference Call [n] Capabilities FECC Source [n] Name"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC Source [n] Name"

- id: x_status_conference_call_n_capabilities_fecc_source_n_options
  label: "xStatus Conference Call [n] Capabilities FECC Source [n] Options"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC Source [n] Options"

- id: x_status_conference_call_n_capabilities_hard_mute
  label: "xStatus Conference Call [n] Capabilities HardMute"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities HardMute"

- id: x_status_conference_call_n_capabilities_hold
  label: "xStatus Conference Call [n] Capabilities Hold"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities Hold"

- id: x_status_conference_call_n_capabilities_fecc_source_n_source_id
  label: "xStatus Conference Call [n] Capabilities FECC Source [n] SourceId"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC Source [n] SourceId"

- id: x_status_conference_call_n_capabilities_farend_message_mode
  label: "xStatus Conference Call [n] Capabilities FarendMessage Mode"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FarendMessage Mode"

- id: x_status_conference_call_n_capabilities_is_moderator
  label: "xStatus Conference Call [n] Capabilities IsModerator"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities IsModerator"

- id: x_status_conference_call_n_capabilities_ix_channel_status
  label: "xStatus Conference Call [n] Capabilities IxChannel Status"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities IxChannel Status"

- id: x_status_conference_call_n_capabilities_lower_participants_hand
  label: "xStatus Conference Call [n] Capabilities LowerParticipantsHand"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities LowerParticipantsHand"

- id: x_status_conference_call_n_capabilities_lock_control
  label: "xStatus Conference Call [n] Capabilities LockControl"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities LockControl"

- id: x_status_conference_call_n_capabilities_meeting_assistant_start
  label: "xStatus Conference Call [n] Capabilities MeetingAssistant Start"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities MeetingAssistant Start"

- id: x_status_conference_call_n_capabilities_lower_all_hands
  label: "xStatus Conference Call [n] Capabilities LowerAllHands"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities LowerAllHands"

- id: x_status_conference_call_n_capabilities_meeting_assistant_stop
  label: "xStatus Conference Call [n] Capabilities MeetingAssistant Stop"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities MeetingAssistant Stop"

- id: x_status_conference_call_n_capabilities_move_to_lobby
  label: "xStatus Conference Call [n] Capabilities MoveToLobby"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities MoveToLobby"

- id: x_status_conference_call_n_capabilities_mute_all
  label: "xStatus Conference Call [n] Capabilities MuteAll"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities MuteAll"

- id: x_status_conference_call_n_capabilities_participant_add
  label: "xStatus Conference Call [n] Capabilities ParticipantAdd"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities ParticipantAdd"

- id: x_status_conference_call_n_capabilities_mute_on_entry
  label: "xStatus Conference Call [n] Capabilities MuteOnEntry"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities MuteOnEntry"

- id: x_status_conference_call_n_capabilities_participant_disconnect
  label: "xStatus Conference Call [n] Capabilities ParticipantDisconnect"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities ParticipantDisconnect"

- id: x_status_conference_call_n_capabilities_participant_list
  label: "xStatus Conference Call [n] Capabilities ParticipantList"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities ParticipantList"

- id: x_status_conference_call_n_capabilities_presentation
  label: "xStatus Conference Call [n] Capabilities Presentation"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities Presentation"

- id: x_status_conference_call_n_capabilities_participant_mute
  label: "xStatus Conference Call [n] Capabilities ParticipantMute"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities ParticipantMute"

- id: x_status_conference_call_n_capabilities_participant_request_unmute
  label: "xStatus Conference Call [n] Capabilities ParticipantRequestUnmute"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities ParticipantRequestUnmute"

- id: x_status_conference_call_n_capabilities_raise_hand
  label: "xStatus Conference Call [n] Capabilities RaiseHand"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities RaiseHand"

- id: x_status_conference_call_n_capabilities_reactions
  label: "xStatus Conference Call [n] Capabilities Reactions"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities Reactions"

- id: x_status_conference_call_n_capabilities_recording_stop
  label: "xStatus Conference Call [n] Capabilities Recording Stop"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities Recording Stop"

- id: x_status_conference_call_n_capabilities_self_mute
  label: "xStatus Conference Call [n] Capabilities SelfMute"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities SelfMute"

- id: x_status_conference_call_n_capabilities_recording_pause
  label: "xStatus Conference Call [n] Capabilities Recording Pause"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities Recording Pause"

- id: x_status_conference_call_n_capabilities_recording_resume
  label: "xStatus Conference Call [n] Capabilities Recording Resume"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities Recording Resume"

- id: x_status_conference_call_n_capabilities_recording_start
  label: "xStatus Conference Call [n] Capabilities Recording Start"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities Recording Start"

- id: x_status_conference_call_n_capabilities_unmute_all
  label: "xStatus Conference Call [n] Capabilities UnmuteAll"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities UnmuteAll"

- id: x_status_conference_call_n_locked
  label: "xStatus Conference Call [n] Locked"
  kind: query
  query_command: "xStatus Conference Call [n] Locked"

- id: x_status_conference_call_n_manufacturer
  label: "xStatus Conference Call [n] Manufacturer"
  kind: query
  query_command: "xStatus Conference Call [n] Manufacturer"

- id: x_status_conference_call_n_event_center_mode
  label: "xStatus Conference Call [n] EventCenter Mode"
  kind: query
  query_command: "xStatus Conference Call [n] EventCenter Mode"

- id: x_status_conference_call_n_meeting
  label: "xStatus Conference Call [n] Meeting"
  kind: query
  query_command: "xStatus Conference Call [n] Meeting"

- id: x_status_conference_call_n_hard_muted
  label: "xStatus Conference Call [n] HardMuted"
  kind: query
  query_command: "xStatus Conference Call [n] HardMuted"

- id: x_status_conference_call_n_meeting_assistant_enabled
  label: "xStatus Conference Call [n] MeetingAssistantEnabled"
  kind: query
  query_command: "xStatus Conference Call [n] MeetingAssistantEnabled"

- id: x_status_conference_call_n_meeting_platform
  label: "xStatus Conference Call [n] MeetingPlatform"
  kind: query
  query_command: "xStatus Conference Call [n] MeetingPlatform"

- id: x_status_conference_call_n_microphones_muted
  label: "xStatus Conference Call [n] MicrophonesMuted"
  kind: query
  query_command: "xStatus Conference Call [n] MicrophonesMuted"

- id: x_status_conference_call_n_raise_hand
  label: "xStatus Conference Call [n] RaiseHand"
  kind: query
  query_command: "xStatus Conference Call [n] RaiseHand"

- id: x_status_conference_call_n_recording
  label: "xStatus Conference Call [n] Recording"
  kind: query
  query_command: "xStatus Conference Call [n] Recording"

- id: x_status_conference_call_n_proximity_call
  label: "xStatus Conference Call [n] ProximityCall"
  kind: query
  query_command: "xStatus Conference Call [n] ProximityCall"

- id: x_status_conference_call_n_session_type
  label: "xStatus Conference Call [n] SessionType"
  kind: query
  query_command: "xStatus Conference Call [n] SessionType"

- id: x_status_conference_call_n_simultaneous_interpretation_languages_n_language_code
  label: "xStatus Conference Call [n] SimultaneousInterpretation Languages [n] LanguageCode"
  kind: query
  query_command: "xStatus Conference Call [n] SimultaneousInterpretation Languages [n] LanguageCode"

- id: x_status_conference_call_n_simultaneous_interpretation_mixer_level
  label: "xStatus Conference Call [n] SimultaneousInterpretation MixerLevel"
  kind: query
  query_command: "xStatus Conference Call [n] SimultaneousInterpretation MixerLevel"

- id: x_status_conference_call_n_simultaneous_interpretation_languages_n
  label: "xStatus Conference Call [n] SimultaneousInterpretation Languages [n]"
  kind: query
  query_command: "xStatus Conference Call [n] SimultaneousInterpretation Languages [n]"

- id: x_status_conference_call_n_sip_session_id
  label: "xStatus Conference Call [n] Sip SessionId"
  kind: query
  query_command: "xStatus Conference Call [n] Sip SessionId"

- id: x_status_conference_call_n_simultaneous_interpretation_selected_language
  label: "xStatus Conference Call [n] SimultaneousInterpretation SelectedLanguage"
  kind: query
  query_command: "xStatus Conference Call [n] SimultaneousInterpretation SelectedLanguage"

- id: x_status_conference_call_n_software_id
  label: "xStatus Conference Call [n] SoftwareID"
  kind: query
  query_command: "xStatus Conference Call [n] SoftwareID"

- id: x_status_conference_call_n_simultaneous_interpretation_streams_n_id
  label: "xStatus Conference Call [n] SimultaneousInterpretation Streams [n] Id"
  kind: query
  query_command: "xStatus Conference Call [n] SimultaneousInterpretation Streams [n] Id"

- id: x_status_conference_call_n_streamed
  label: "xStatus Conference Call [n] Streamed"
  kind: query
  query_command: "xStatus Conference Call [n] Streamed"

- id: x_status_conference_call_n_simultaneous_interpretation_streams_n_language_code
  label: "xStatus Conference Call [n] SimultaneousInterpretation Streams [n] LanguageCode"
  kind: query
  query_command: "xStatus Conference Call [n] SimultaneousInterpretation Streams [n] LanguageCode"

- id: x_status_conference_call_n_transcoded
  label: "xStatus Conference Call [n] Transcoded"
  kind: query
  query_command: "xStatus Conference Call [n] Transcoded"

- id: x_status_conference_end_to_end_encryption_availability
  label: "xStatus Conference EndToEndEncryption Availability"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption Availability"

- id: x_status_conference_call_n_webex_meeting_invite_link
  label: "xStatus Conference Call [n] Webex MeetingInviteLink"
  kind: query
  query_command: "xStatus Conference Call [n] Webex MeetingInviteLink"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_fingerprint
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] Fingerprint"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] Fingerprint"

- id: x_status_conference_do_not_disturb
  label: "xStatus Conference DoNotDisturb"
  kind: query
  query_command: "xStatus Conference DoNotDisturb"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_not_after
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] NotAfter"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] NotAfter"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_not_before
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] NotBefore"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] NotBefore"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_primary_name
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] PrimaryName"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] PrimaryName"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_public_key_algorithm
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] PublicKeyAlgorithm"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] PublicKeyAlgorithm"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_serial_number
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] SerialNumber"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] SerialNumber"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_signature_algorithm
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] SignatureAlgorithm"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] SignatureAlgorithm"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_validity
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] Validity"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] Validity"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_subject_n_name
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] Subject [n] Name"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] Subject [n] Name"

- id: x_status_conference_end_to_end_encryption_external_identity_identity
  label: "xStatus Conference EndToEndEncryption ExternalIdentity Identity"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity Identity"

- id: x_status_conference_end_to_end_encryption_external_identity_status
  label: "xStatus Conference EndToEndEncryption ExternalIdentity Status"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity Status"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_not_after
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] NotAfter"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] NotAfter"

- id: x_status_conference_end_to_end_encryption_external_identity_verification
  label: "xStatus Conference EndToEndEncryption ExternalIdentity Verification"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity Verification"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_fingerprint
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] Fingerprint"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] Fingerprint"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_not_before
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] NotBefore"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] NotBefore"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_primary_name
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] PrimaryName"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] PrimaryName"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_serial_number
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] SerialNumber"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] SerialNumber"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_public_key_algorithm
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] PublicKeyAlgorithm"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] PublicKeyAlgorithm"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_signature_algorithm
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] SignatureAlgorithm"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] SignatureAlgorithm"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_subject_n_name
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] Subject [n] Name"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] Subject [n] Name"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_validity
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] Validity"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] Validity"

- id: x_status_conference_end_to_end_encryption_internal_identity_identity
  label: "xStatus Conference EndToEndEncryption InternalIdentity Identity"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity Identity"

- id: x_status_conference_end_to_end_encryption_internal_identity_status
  label: "xStatus Conference EndToEndEncryption InternalIdentity Status"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity Status"

- id: x_status_conference_end_to_end_encryption_internal_identity_verification
  label: "xStatus Conference EndToEndEncryption InternalIdentity Verification"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity Verification"

- id: x_status_conference_hide_non_video_active
  label: "xStatus Conference HideNonVideo Active"
  kind: query
  query_command: "xStatus Conference HideNonVideo Active"

- id: x_status_conference_line_n_mode
  label: "xStatus Conference Line [n] Mode"
  kind: query
  query_command: "xStatus Conference Line [n] Mode"

- id: x_status_conference_multipoint_mode
  label: "xStatus Conference Multipoint Mode"
  kind: query
  query_command: "xStatus Conference Multipoint Mode"

- id: x_status_conference_hide_non_video_available
  label: "xStatus Conference HideNonVideo Available"
  kind: query
  query_command: "xStatus Conference HideNonVideo Available"

- id: x_status_conference_people_focus_active
  label: "xStatus Conference PeopleFocus Active"
  kind: query
  query_command: "xStatus Conference PeopleFocus Active"

- id: x_status_conference_people_focus_available
  label: "xStatus Conference PeopleFocus Available"
  kind: query
  query_command: "xStatus Conference PeopleFocus Available"

- id: x_status_conference_presentation_call_id
  label: "xStatus Conference Presentation CallId"
  kind: query
  query_command: "xStatus Conference Presentation CallId"

- id: x_status_conference_presentation_local_instance_n_direct_share
  label: "xStatus Conference Presentation LocalInstance [n] DirectShare"
  kind: query
  query_command: "xStatus Conference Presentation LocalInstance [n] DirectShare"

- id: x_status_conference_presentation_local_instance_n_sending_mode
  label: "xStatus Conference Presentation LocalInstance [n] SendingMode"
  kind: query
  query_command: "xStatus Conference Presentation LocalInstance [n] SendingMode"

- id: x_status_conference_presentation_whiteboard_board_url
  label: "xStatus Conference Presentation Whiteboard BoardUrl"
  kind: query
  query_command: "xStatus Conference Presentation Whiteboard BoardUrl"

- id: x_status_conference_presentation_local_instance_n_source
  label: "xStatus Conference Presentation LocalInstance [n] Source"
  kind: query
  query_command: "xStatus Conference Presentation LocalInstance [n] Source"

- id: x_status_conference_presentation_whiteboard_mode
  label: "xStatus Conference Presentation Whiteboard Mode"
  kind: query
  query_command: "xStatus Conference Presentation Whiteboard Mode"

- id: x_status_conference_presentation_mode
  label: "xStatus Conference Presentation Mode"
  kind: query
  query_command: "xStatus Conference Presentation Mode"

- id: x_status_conference_presentation_whiteboard_transcoding_selected
  label: "xStatus Conference Presentation Whiteboard TranscodingSelected"
  kind: query
  query_command: "xStatus Conference Presentation Whiteboard TranscodingSelected"

- id: x_status_conference_speaker_lock_mode
  label: "xStatus Conference SpeakerLock Mode"
  kind: query
  query_command: "xStatus Conference SpeakerLock Mode"

- id: x_status_conference_selected_call_protocol
  label: "xStatus Conference SelectedCallProtocol"
  kind: query
  query_command: "xStatus Conference SelectedCallProtocol"

- id: x_status_conference_speaker_lock_call_id
  label: "xStatus Conference SpeakerLock CallId"
  kind: query
  query_command: "xStatus Conference SpeakerLock CallId"

- id: x_status_diagnostics_message_n_description
  label: "xStatus Diagnostics Message [n] Description"
  kind: query
  query_command: "xStatus Diagnostics Message [n] Description"

- id: x_status_diagnostics_message_n_references
  label: "xStatus Diagnostics Message [n] References"
  kind: query
  query_command: "xStatus Diagnostics Message [n] References"

- id: x_status_diagnostics_message_n_level
  label: "xStatus Diagnostics Message [n] Level"
  kind: query
  query_command: "xStatus Diagnostics Message [n] Level"

- id: x_status_diagnostics_message_n_type
  label: "xStatus Diagnostics Message [n] Type"
  kind: query
  query_command: "xStatus Diagnostics Message [n] Type"

- id: x_status_gpio_pin_n_state
  label: "xStatus GPIO Pin [n] State"
  kind: query
  query_command: "xStatus GPIO Pin [n] State"

- id: x_status_h323_gatekeeper_status
  label: "xStatus H323 Gatekeeper Status"
  kind: query
  query_command: "xStatus H323 Gatekeeper Status"

- id: x_status_h323_gatekeeper_address
  label: "xStatus H323 Gatekeeper Address"
  kind: query
  query_command: "xStatus H323 Gatekeeper Address"

- id: x_status_h323_mode_reason
  label: "xStatus H323 Mode Reason"
  kind: query
  query_command: "xStatus H323 Mode Reason"

- id: x_status_h323_gatekeeper_port
  label: "xStatus H323 Gatekeeper Port"
  kind: query
  query_command: "xStatus H323 Gatekeeper Port"

- id: x_status_h323_gatekeeper_reason
  label: "xStatus H323 Gatekeeper Reason"
  kind: query
  query_command: "xStatus H323 Gatekeeper Reason"

- id: x_status_h323_mode_status
  label: "xStatus H323 Mode Status"
  kind: query
  query_command: "xStatus H323 Mode Status"

- id: x_status_http_feedback_n_expression_n
  label: "xStatus HttpFeedback [n] Expression [n]"
  kind: query
  query_command: "xStatus HttpFeedback [n] Expression [n]"

- id: x_status_http_feedback_n_format
  label: "xStatus HttpFeedback [n] Format"
  kind: query
  query_command: "xStatus HttpFeedback [n] Format"

- id: x_status_http_feedback_n_status
  label: "xStatus HttpFeedback [n] Status"
  kind: query
  query_command: "xStatus HttpFeedback [n] Status"

- id: x_status_http_feedback_n_url
  label: "xStatus HttpFeedback [n] URL"
  kind: query
  query_command: "xStatus HttpFeedback [n] URL"

- id: x_status_ice_call_n_media_line_n_local_candidate
  label: "xStatus ICE Call [n] MediaLine [n] Local Candidate"
  kind: query
  query_command: "xStatus ICE Call [n] MediaLine [n] Local Candidate"

- id: x_status_ice_call_n_media_line_n_local_ip
  label: "xStatus ICE Call [n] MediaLine [n] Local IP"
  kind: query
  query_command: "xStatus ICE Call [n] MediaLine [n] Local IP"

- id: x_status_ice_call_n_media_line_n_local_transport
  label: "xStatus ICE Call [n] MediaLine [n] Local Transport"
  kind: query
  query_command: "xStatus ICE Call [n] MediaLine [n] Local Transport"

- id: x_status_ice_call_n_media_line_n_remote_xtls_fqdn_host
  label: "xStatus ICE Call [n] MediaLine [n] Remote XtlsFqdnHost"
  kind: query
  query_command: "xStatus ICE Call [n] MediaLine [n] Remote XtlsFqdnHost"

- id: x_status_ice_call_n_media_line_n_remote_candidate
  label: "xStatus ICE Call [n] MediaLine [n] Remote Candidate"
  kind: query
  query_command: "xStatus ICE Call [n] MediaLine [n] Remote Candidate"

- id: x_status_ice_call_n_media_line_n_remote_ip
  label: "xStatus ICE Call [n] MediaLine [n] Remote IP"
  kind: query
  query_command: "xStatus ICE Call [n] MediaLine [n] Remote IP"

- id: x_status_ice_call_n_media_path
  label: "xStatus ICE Call [n] MediaPath"
  kind: query
  query_command: "xStatus ICE Call [n] MediaPath"

- id: x_status_ice_call_n_negotiation_time
  label: "xStatus ICE Call [n] NegotiationTime"
  kind: query
  query_command: "xStatus ICE Call [n] NegotiationTime"

- id: x_status_ice_call_n_result
  label: "xStatus ICE Call [n] Result"
  kind: query
  query_command: "xStatus ICE Call [n] Result"

- id: x_status_logging_extended_logging_mode
  label: "xStatus Logging ExtendedLogging Mode"
  kind: query
  query_command: "xStatus Logging ExtendedLogging Mode"

- id: x_status_logging_extended_logging_packet_dump
  label: "xStatus Logging ExtendedLogging PacketDump"
  kind: query
  query_command: "xStatus Logging ExtendedLogging PacketDump"

- id: x_status_logging_extended_logging_rendering_dump
  label: "xStatus Logging ExtendedLogging RenderingDump"
  kind: query
  query_command: "xStatus Logging ExtendedLogging RenderingDump"

- id: x_status_media_channels_call_n_channel_n_audio_channel_role
  label: "xStatus MediaChannels Call [n] Channel [n] Audio ChannelRole"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Audio ChannelRole"

- id: x_status_media_channels_call_n_channel_n_audio_channels
  label: "xStatus MediaChannels Call [n] Channel [n] Audio Channels"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Audio Channels"

- id: x_status_media_channels_call_n_channel_n_audio_mute
  label: "xStatus MediaChannels Call [n] Channel [n] Audio Mute"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Audio Mute"

- id: x_status_media_channels_call_n_channel_n_direction
  label: "xStatus MediaChannels Call [n] Channel [n] Direction"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Direction"

- id: x_status_media_channels_call_n_channel_n_audio_protocol
  label: "xStatus MediaChannels Call [n] Channel [n] Audio Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Audio Protocol"

- id: x_status_media_channels_call_n_channel_n_encryption
  label: "xStatus MediaChannels Call [n] Channel [n] Encryption"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Encryption"

- id: x_status_media_channels_call_n_channel_n_netstat_bytes
  label: "xStatus MediaChannels Call [n] Channel [n] Netstat Bytes"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Netstat Bytes"

- id: x_status_media_channels_call_n_channel_n_netstat_channel_rate
  label: "xStatus MediaChannels Call [n] Channel [n] Netstat ChannelRate"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Netstat ChannelRate"

- id: x_status_media_channels_call_n_channel_n_netstat_last_interval_lost
  label: "xStatus MediaChannels Call [n] Channel [n] Netstat LastIntervalLost"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Netstat LastIntervalLost"

- id: x_status_media_channels_call_n_channel_n_netstat_end_to_end_delay
  label: "xStatus MediaChannels Call [n] Channel [n] Netstat EndToEndDelay"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Netstat EndToEndDelay"

- id: x_status_media_channels_call_n_channel_n_netstat_last_interval_received
  label: "xStatus MediaChannels Call [n] Channel [n] Netstat LastIntervalReceived"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Netstat LastIntervalReceived"

- id: x_status_media_channels_call_n_channel_n_netstat_jitter
  label: "xStatus MediaChannels Call [n] Channel [n] Netstat Jitter"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Netstat Jitter"

- id: x_status_media_channels_call_n_channel_n_netstat_loss
  label: "xStatus MediaChannels Call [n] Channel [n] Netstat Loss"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Netstat Loss"

- id: x_status_media_channels_call_n_channel_n_netstat_max_jitter
  label: "xStatus MediaChannels Call [n] Channel [n] Netstat MaxJitter"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Netstat MaxJitter"

- id: x_status_media_channels_call_n_channel_n_netstat_round_trip_time
  label: "xStatus MediaChannels Call [n] Channel [n] Netstat RoundTripTime"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Netstat RoundTripTime"

- id: x_status_media_channels_call_n_channel_n_netstat_packets
  label: "xStatus MediaChannels Call [n] Channel [n] Netstat Packets"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Netstat Packets"

- id: x_status_media_channels_call_n_channel_n_participant_id
  label: "xStatus MediaChannels Call [n] Channel [n] ParticipantId"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] ParticipantId"

- id: x_status_media_channels_call_n_channel_n_type
  label: "xStatus MediaChannels Call [n] Channel [n] Type"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Type"

- id: x_status_media_channels_call_n_channel_n_video_frame_rate
  label: "xStatus MediaChannels Call [n] Channel [n] Video FrameRate"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video FrameRate"

- id: x_status_media_channels_call_n_channel_n_video_channel_role
  label: "xStatus MediaChannels Call [n] Channel [n] Video ChannelRole"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video ChannelRole"

- id: x_status_media_channels_call_n_channel_n_video_intra_frames
  label: "xStatus MediaChannels Call [n] Channel [n] Video IntraFrames"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video IntraFrames"

- id: x_status_media_channels_call_n_channel_n_video_concealment_type
  label: "xStatus MediaChannels Call [n] Channel [n] Video ConcealmentType"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video ConcealmentType"

- id: x_status_media_channels_call_n_channel_n_video_protocol
  label: "xStatus MediaChannels Call [n] Channel [n] Video Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video Protocol"

- id: x_status_media_channels_call_n_channel_n_video_resolution_y
  label: "xStatus MediaChannels Call [n] Channel [n] Video ResolutionY"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video ResolutionY"

- id: x_status_media_channels_direct_share_n_channel_n_audio_channels
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Audio Channels"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Audio Channels"

- id: x_status_media_channels_call_n_channel_n_video_resolution_x
  label: "xStatus MediaChannels Call [n] Channel [n] Video ResolutionX"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video ResolutionX"

- id: x_status_media_channels_direct_share_n_channel_n_audio_protocol
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Audio Protocol"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Audio Protocol"

- id: x_status_media_channels_direct_share_n_channel_n_encryption_type
  label: "xStatus MediaChannels DirectShare [n] Channel [n] EncryptionType"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] EncryptionType"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_bytes
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Bytes"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Bytes"

- id: x_status_media_channels_direct_share_n_channel_n_encryption
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Encryption"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Encryption"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_channel_rate
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat ChannelRate"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat ChannelRate"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_jitter
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Jitter"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Jitter"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_loss
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Loss"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Loss"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_last_interval_lost
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat LastIntervalLost"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat LastIntervalLost"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_max_jitter
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat MaxJitter"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat MaxJitter"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_last_interval_received
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat LastIntervalReceived"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat LastIntervalReceived"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_packets
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Packets"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Packets"

- id: x_status_media_channels_direct_share_n_channel_n_type
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Type"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Type"

- id: x_status_media_channels_direct_share_n_channel_n_video_frame_rate
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Video FrameRate"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Video FrameRate"

- id: x_status_media_channels_direct_share_n_channel_n_video_resolution_x
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Video ResolutionX"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Video ResolutionX"

- id: x_status_media_channels_direct_share_n_channel_n_video_protocol
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Video Protocol"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Video Protocol"

- id: x_status_media_channels_direct_share_n_channel_n_video_resolution_y
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Video ResolutionY"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Video ResolutionY"

- id: x_status_media_channels_miracast_n_channel_n_audio_channels
  label: "xStatus MediaChannels Miracast [n] Channel [n] Audio Channels"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Audio Channels"

- id: x_status_media_channels_miracast_n_channel_n_audio_protocol
  label: "xStatus MediaChannels Miracast [n] Channel [n] Audio Protocol"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Audio Protocol"

- id: x_status_media_channels_miracast_n_channel_n_encryption
  label: "xStatus MediaChannels Miracast [n] Channel [n] Encryption"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Encryption"

- id: x_status_media_channels_miracast_n_channel_n_encryption_type
  label: "xStatus MediaChannels Miracast [n] Channel [n] EncryptionType"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] EncryptionType"

- id: x_status_media_channels_miracast_n_channel_n_netstat_jitter
  label: "xStatus MediaChannels Miracast [n] Channel [n] Netstat Jitter"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Netstat Jitter"

- id: x_status_media_channels_miracast_n_channel_n_netstat_last_interval_lost
  label: "xStatus MediaChannels Miracast [n] Channel [n] Netstat LastIntervalLost"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Netstat LastIntervalLost"

- id: x_status_media_channels_miracast_n_channel_n_netstat_bytes
  label: "xStatus MediaChannels Miracast [n] Channel [n] Netstat Bytes"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Netstat Bytes"

- id: x_status_media_channels_miracast_n_channel_n_netstat_channel_rate
  label: "xStatus MediaChannels Miracast [n] Channel [n] Netstat ChannelRate"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Netstat ChannelRate"

- id: x_status_media_channels_miracast_n_channel_n_netstat_last_interval_received
  label: "xStatus MediaChannels Miracast [n] Channel [n] Netstat LastIntervalReceived"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Netstat LastIntervalReceived"

- id: x_status_media_channels_miracast_n_channel_n_netstat_loss
  label: "xStatus MediaChannels Miracast [n] Channel [n] Netstat Loss"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Netstat Loss"

- id: x_status_media_channels_miracast_n_channel_n_netstat_max_jitter
  label: "xStatus MediaChannels Miracast [n] Channel [n] Netstat MaxJitter"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Netstat MaxJitter"

- id: x_status_media_channels_miracast_n_channel_n_netstat_packets
  label: "xStatus MediaChannels Miracast [n] Channel [n] Netstat Packets"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Netstat Packets"

- id: x_status_media_channels_miracast_n_channel_n_video_frame_rate
  label: "xStatus MediaChannels Miracast [n] Channel [n] Video FrameRate"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Video FrameRate"

- id: x_status_media_channels_miracast_n_channel_n_video_protocol
  label: "xStatus MediaChannels Miracast [n] Channel [n] Video Protocol"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Video Protocol"

- id: x_status_media_channels_miracast_n_channel_n_video_resolution_x
  label: "xStatus MediaChannels Miracast [n] Channel [n] Video ResolutionX"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Video ResolutionX"

- id: x_status_media_channels_miracast_n_channel_n_video_resolution_y
  label: "xStatus MediaChannels Miracast [n] Channel [n] Video ResolutionY"
  kind: query
  query_command: "xStatus MediaChannels Miracast [n] Channel [n] Video ResolutionY"

- id: x_status_media_channels_remote_access_n_channel_n_audio_protocol
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Audio Protocol"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Audio Protocol"

- id: x_status_media_channels_remote_access_n_channel_n_audio_channel_role
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Audio ChannelRole"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Audio ChannelRole"

- id: x_status_media_channels_remote_access_n_channel_n_audio_channels
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Audio Channels"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Audio Channels"

- id: x_status_media_channels_remote_access_n_channel_n_audio_mute
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Audio Mute"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Audio Mute"

- id: x_status_media_channels_remote_access_n_channel_n_direction
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Direction"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Direction"

- id: x_status_media_channels_remote_access_n_channel_n_encryption
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Encryption"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Encryption"

- id: x_status_media_channels_remote_access_n_channel_n_netstat_bytes
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat Bytes"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat Bytes"

- id: x_status_media_channels_remote_access_n_channel_n_netstat
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat"

- id: x_status_media_channels_remote_access_n_channel_n_netstat_loss
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat Loss"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat Loss"

- id: x_status_media_channels_remote_access_n_channel_n_netstat_end_to_end_delay
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat EndToEndDelay"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat EndToEndDelay"

- id: x_status_media_channels_remote_access_n_channel_n_netstat_jitter
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat Jitter"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat Jitter"

- id: x_status_media_channels_remote_access_n_channel_n_netstat_max_jitter
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat MaxJitter"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat MaxJitter"

- id: x_status_media_channels_remote_access_n_channel_n_netstat_last_interval_lost
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat LastIntervalLost"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat LastIntervalLost"

- id: x_status_media_channels_remote_access_n_channel_n_netstat_last_interval_received
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat LastIntervalReceived"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat LastIntervalReceived"

- id: x_status_media_channels_remote_access_n_channel_n_netstat_packets
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat Packets"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat Packets"

- id: x_status_media_channels_remote_access_n_channel_n_netstat_round_trip_time
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat RoundTripTime"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Netstat RoundTripTime"

- id: x_status_media_channels_remote_access_n_channel_n_participant_id
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] ParticipantId"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] ParticipantId"

- id: x_status_media_channels_remote_access_n_channel_n_type
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Type"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Type"

- id: x_status_media_channels_remote_access_n_channel_n_video_channel_role
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video ChannelRole"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video ChannelRole"

- id: x_status_media_channels_remote_access_n_channel_n_video_concealment_type
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video ConcealmentType"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video ConcealmentType"

- id: x_status_media_channels_remote_access_n_channel_n_video_frame_rate
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video FrameRate"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video FrameRate"

- id: x_status_media_channels_remote_access_n_channel_n_video_protocol
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video Protocol"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video Protocol"

- id: x_status_media_channels_remote_access_n_channel_n_video_resolution_x
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video ResolutionX"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video ResolutionX"

- id: x_status_media_channels_remote_access_n_channel_n_video_resolution_y
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video ResolutionY"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video ResolutionY"

- id: x_status_media_channels_remote_access_n_channel_n_video
  label: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video"
  kind: query
  query_command: "xStatus MediaChannels RemoteAccess [n] Channel [n] Video"

- id: x_status_microsoft_teams_cvi_cross_tenant
  label: "xStatus MicrosoftTeams CVI CrossTenant"
  kind: query
  query_command: "xStatus MicrosoftTeams CVI CrossTenant"

- id: x_status_microsoft_teams_calling_in_call
  label: "xStatus MicrosoftTeams Calling InCall"
  kind: query
  query_command: "xStatus MicrosoftTeams Calling InCall"

- id: x_status_microsoft_teams_hardware_accelerator_decoder_n_cropped_width
  label: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] CroppedWidth"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] CroppedWidth"

- id: x_status_microsoft_teams_hardware_accelerator_decoder_n_fps
  label: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] Fps"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] Fps"

- id: x_status_microsoft_teams_calling_incoming_call
  label: "xStatus MicrosoftTeams Calling IncomingCall"
  kind: query
  query_command: "xStatus MicrosoftTeams Calling IncomingCall"

- id: x_status_microsoft_teams_hardware_accelerator_decoder_n
  label: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n]"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n]"

- id: x_status_microsoft_teams_hardware_accelerator_decoder_n_frame_count
  label: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] FrameCount"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] FrameCount"

- id: x_status_microsoft_teams_hardware_accelerator_decoder_n_sample_period_us
  label: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] SamplePeriodUs"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] SamplePeriodUs"

- id: x_status_microsoft_teams_hardware_accelerator_decoder_n_height
  label: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] Height"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] Height"

- id: x_status_microsoft_teams_hardware_accelerator_decoder_n_width
  label: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] Width"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] Width"

- id: x_status_microsoft_teams_hardware_accelerator_decoder_n_output_mode
  label: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] OutputMode"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Decoder [n] OutputMode"

- id: x_status_microsoft_teams_hardware_accelerator_encoder_n_fps
  label: "xStatus MicrosoftTeams HardwareAccelerator Encoder [n] Fps"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Encoder [n] Fps"

- id: x_status_microsoft_teams_hardware_accelerator_encoder_n_input_mode
  label: "xStatus MicrosoftTeams HardwareAccelerator Encoder [n] InputMode"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Encoder [n] InputMode"

- id: x_status_microsoft_teams_hardware_accelerator_encoder_n_frame_count
  label: "xStatus MicrosoftTeams HardwareAccelerator Encoder [n] FrameCount"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Encoder [n] FrameCount"

- id: x_status_microsoft_teams_hardware_accelerator_encoder_n_sample_period_us
  label: "xStatus MicrosoftTeams HardwareAccelerator Encoder [n] SamplePeriodUs"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Encoder [n] SamplePeriodUs"

- id: x_status_microsoft_teams_hardware_accelerator_encoder_n_height
  label: "xStatus MicrosoftTeams HardwareAccelerator Encoder [n] Height"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Encoder [n] Height"

- id: x_status_microsoft_teams_hardware_accelerator_encoder_n_width
  label: "xStatus MicrosoftTeams HardwareAccelerator Encoder [n] Width"
  kind: query
  query_command: "xStatus MicrosoftTeams HardwareAccelerator Encoder [n] Width"

- id: x_status_microsoft_teams_software_version_authenticator
  label: "xStatus MicrosoftTeams Software Version Authenticator"
  kind: query
  query_command: "xStatus MicrosoftTeams Software Version Authenticator"

- id: x_status_microsoft_teams_pairing_active
  label: "xStatus MicrosoftTeams Pairing Active"
  kind: query
  query_command: "xStatus MicrosoftTeams Pairing Active"

- id: x_status_microsoft_teams_software_version_microsoft_intune
  label: "xStatus MicrosoftTeams Software Version MicrosoftIntune"
  kind: query
  query_command: "xStatus MicrosoftTeams Software Version MicrosoftIntune"

- id: x_status_microsoft_teams_software_version_android
  label: "xStatus MicrosoftTeams Software Version Android"
  kind: query
  query_command: "xStatus MicrosoftTeams Software Version Android"

- id: x_status_microsoft_teams_software_version_oemagent
  label: "xStatus MicrosoftTeams Software Version OEMAgent"
  kind: query
  query_command: "xStatus MicrosoftTeams Software Version OEMAgent"

- id: x_status_microsoft_teams_software_version_teams_admin_agent
  label: "xStatus MicrosoftTeams Software Version TeamsAdminAgent"
  kind: query
  query_command: "xStatus MicrosoftTeams Software Version TeamsAdminAgent"

- id: x_status_microsoft_teams_software_version_code_microsoft_intune
  label: "xStatus MicrosoftTeams Software VersionCode MicrosoftIntune"
  kind: query
  query_command: "xStatus MicrosoftTeams Software VersionCode MicrosoftIntune"

- id: x_status_microsoft_teams_software_version_code_oemagent
  label: "xStatus MicrosoftTeams Software VersionCode OEMAgent"
  kind: query
  query_command: "xStatus MicrosoftTeams Software VersionCode OEMAgent"

- id: x_status_microsoft_teams_software_version_teams_app
  label: "xStatus MicrosoftTeams Software Version TeamsApp"
  kind: query
  query_command: "xStatus MicrosoftTeams Software Version TeamsApp"

- id: x_status_microsoft_teams_software_version_code_teams_admin_agent
  label: "xStatus MicrosoftTeams Software VersionCode TeamsAdminAgent"
  kind: query
  query_command: "xStatus MicrosoftTeams Software VersionCode TeamsAdminAgent"

- id: x_status_microsoft_teams_software_version_code_authenticator
  label: "xStatus MicrosoftTeams Software VersionCode Authenticator"
  kind: query
  query_command: "xStatus MicrosoftTeams Software VersionCode Authenticator"

- id: x_status_network_n_active_interface
  label: "xStatus Network [n] ActiveInterface"
  kind: query
  query_command: "xStatus Network [n] ActiveInterface"

- id: x_status_microsoft_teams_software_version_code_teams_app
  label: "xStatus MicrosoftTeams Software VersionCode TeamsApp"
  kind: query
  query_command: "xStatus MicrosoftTeams Software VersionCode TeamsApp"

- id: x_status_microsoft_teams_user_signed_in
  label: "xStatus MicrosoftTeams User SignedIn"
  kind: query
  query_command: "xStatus MicrosoftTeams User SignedIn"

- id: x_status_network_n_cdp_address
  label: "xStatus Network [n] CDP Address"
  kind: query
  query_command: "xStatus Network [n] CDP Address"

- id: x_status_network_n_cdp_capabilities
  label: "xStatus Network [n] CDP Capabilities"
  kind: query
  query_command: "xStatus Network [n] CDP Capabilities"

- id: x_status_network_n_cdp_duplex
  label: "xStatus Network [n] CDP Duplex"
  kind: query
  query_command: "xStatus Network [n] CDP Duplex"

- id: x_status_network_n_cdp_primary_mgmt_address
  label: "xStatus Network [n] CDP PrimaryMgmtAddress"
  kind: query
  query_command: "xStatus Network [n] CDP PrimaryMgmtAddress"

- id: x_status_network_n_cdp_platform
  label: "xStatus Network [n] CDP Platform"
  kind: query
  query_command: "xStatus Network [n] CDP Platform"

- id: x_status_network_n_cdp_sys_name
  label: "xStatus Network [n] CDP SysName"
  kind: query
  query_command: "xStatus Network [n] CDP SysName"

- id: x_status_network_n_cdp_sys_object_id
  label: "xStatus Network [n] CDP SysObjectID"
  kind: query
  query_command: "xStatus Network [n] CDP SysObjectID"

- id: x_status_network_n_cdp_vo_ipappliance_vlan_id
  label: "xStatus Network [n] CDP VoIPApplianceVlanID"
  kind: query
  query_command: "xStatus Network [n] CDP VoIPApplianceVlanID"

- id: x_status_network_n_cdp_vtpmgmt_domain
  label: "xStatus Network [n] CDP VTPMgmtDomain"
  kind: query
  query_command: "xStatus Network [n] CDP VTPMgmtDomain"

- id: x_status_network_n_dns_domain_name
  label: "xStatus Network [n] DNS Domain Name"
  kind: query
  query_command: "xStatus Network [n] DNS Domain Name"

- id: x_status_network_n_cdp_version
  label: "xStatus Network [n] CDP Version"
  kind: query
  query_command: "xStatus Network [n] CDP Version"

- id: x_status_network_n_dns_server_n_address
  label: "xStatus Network [n] DNS Server [n] Address"
  kind: query
  query_command: "xStatus Network [n] DNS Server [n] Address"

- id: x_status_network_n_ieee8021_x_reason
  label: "xStatus Network [n] IEEE8021X Reason"
  kind: query
  query_command: "xStatus Network [n] IEEE8021X Reason"

- id: x_status_network_n_ethernet_mac_address
  label: "xStatus Network [n] Ethernet MacAddress"
  kind: query
  query_command: "xStatus Network [n] Ethernet MacAddress"

- id: x_status_network_n_ethernet_speed
  label: "xStatus Network [n] Ethernet Speed"
  kind: query
  query_command: "xStatus Network [n] Ethernet Speed"

- id: x_status_network_n_ieee8021_x_status
  label: "xStatus Network [n] IEEE8021X Status"
  kind: query
  query_command: "xStatus Network [n] IEEE8021X Status"

- id: x_status_network_n_fqdn
  label: "xStatus Network [n] FQDN"
  kind: query
  query_command: "xStatus Network [n] FQDN"

- id: x_status_network_n_ipv4_address
  label: "xStatus Network [n] IPv4 Address"
  kind: query
  query_command: "xStatus Network [n] IPv4 Address"

- id: x_status_network_n_ipv6_address
  label: "xStatus Network [n] IPv6 Address"
  kind: query
  query_command: "xStatus Network [n] IPv6 Address"

- id: x_status_network_n_ipv6_temporary_address_n_address
  label: "xStatus Network [n] IPv6 Temporary Address [n] Address"
  kind: query
  query_command: "xStatus Network [n] IPv6 Temporary Address [n] Address"

- id: x_status_network_n_lldp_chassis_idtype
  label: "xStatus Network [n] LLDP Chassis IDType"
  kind: query
  query_command: "xStatus Network [n] LLDP Chassis IDType"

- id: x_status_network_n_ipv6_temporary_address_n_state
  label: "xStatus Network [n] IPv6 Temporary Address [n] State"
  kind: query
  query_command: "xStatus Network [n] IPv6 Temporary Address [n] State"

- id: x_status_network_n_ipv6_temporary_address_n_valid_until
  label: "xStatus Network [n] IPv6 Temporary Address [n] ValidUntil"
  kind: query
  query_command: "xStatus Network [n] IPv6 Temporary Address [n] ValidUntil"

- id: x_status_network_n_lldp_duplex
  label: "xStatus Network [n] LLDP Duplex"
  kind: query
  query_command: "xStatus Network [n] LLDP Duplex"

- id: x_status_network_n_lldp_chassis_id
  label: "xStatus Network [n] LLDP Chassis ID"
  kind: query
  query_command: "xStatus Network [n] LLDP Chassis ID"

- id: x_status_network_n_lldp_port_id
  label: "xStatus Network [n] LLDP Port ID"
  kind: query
  query_command: "xStatus Network [n] LLDP Port ID"

- id: x_status_network_n_vlan_voice_vlan_id
  label: "xStatus Network [n] VLAN Voice VlanId"
  kind: query
  query_command: "xStatus Network [n] VLAN Voice VlanId"

- id: x_status_network_n_lldp_sys_descr
  label: "xStatus Network [n] LLDP SysDescr"
  kind: query
  query_command: "xStatus Network [n] LLDP SysDescr"

- id: x_status_network_n_wifi_bssid
  label: "xStatus Network [n] Wifi BSSID"
  kind: query
  query_command: "xStatus Network [n] Wifi BSSID"

- id: x_status_network_n_wifi_connectivity
  label: "xStatus Network [n] Wifi Connectivity"
  kind: query
  query_command: "xStatus Network [n] Wifi Connectivity"

- id: x_status_network_n_wifi_clmversion
  label: "xStatus Network [n] Wifi CLMVersion"
  kind: query
  query_command: "xStatus Network [n] Wifi CLMVersion"

- id: x_status_network_n_wifi_fwversion
  label: "xStatus Network [n] Wifi FWVersion"
  kind: query
  query_command: "xStatus Network [n] Wifi FWVersion"

- id: x_status_network_n_wifi_channel
  label: "xStatus Network [n] Wifi Channel"
  kind: query
  query_command: "xStatus Network [n] Wifi Channel"

- id: x_status_network_n_wifi_frequency
  label: "xStatus Network [n] Wifi Frequency"
  kind: query
  query_command: "xStatus Network [n] Wifi Frequency"

- id: x_status_network_n_wifi_interface_enabled
  label: "xStatus Network [n] Wifi InterfaceEnabled"
  kind: query
  query_command: "xStatus Network [n] Wifi InterfaceEnabled"

- id: x_status_network_n_wifi_interface_reason
  label: "xStatus Network [n] Wifi InterfaceReason"
  kind: query
  query_command: "xStatus Network [n] Wifi InterfaceReason"

- id: x_status_network_n_wifi_key_mgmt
  label: "xStatus Network [n] Wifi KeyMgmt"
  kind: query
  query_command: "xStatus Network [n] Wifi KeyMgmt"

- id: x_status_network_n_wifi_mac_address
  label: "xStatus Network [n] Wifi MacAddress"
  kind: query
  query_command: "xStatus Network [n] Wifi MacAddress"

- id: x_status_network_n_wifi_noise
  label: "xStatus Network [n] Wifi Noise"
  kind: query
  query_command: "xStatus Network [n] Wifi Noise"

- id: x_status_network_n_wifi_phase2_method
  label: "xStatus Network [n] Wifi Phase2Method"
  kind: query
  query_command: "xStatus Network [n] Wifi Phase2Method"

- id: x_status_network_n_wifi_profile_id
  label: "xStatus Network [n] Wifi ProfileID"
  kind: query
  query_command: "xStatus Network [n] Wifi ProfileID"

- id: x_status_network_n_wifi_rssi
  label: "xStatus Network [n] Wifi RSSI"
  kind: query
  query_command: "xStatus Network [n] Wifi RSSI"

- id: x_status_network_n_wifi_raw_ssid
  label: "xStatus Network [n] Wifi RawSSID"
  kind: query
  query_command: "xStatus Network [n] Wifi RawSSID"

- id: x_status_network_n_wifi_reason
  label: "xStatus Network [n] Wifi Reason"
  kind: query
  query_command: "xStatus Network [n] Wifi Reason"

- id: x_status_network_n_wifi_region
  label: "xStatus Network [n] Wifi Region"
  kind: query
  query_command: "xStatus Network [n] Wifi Region"

- id: x_status_network_n_wifi_snr
  label: "xStatus Network [n] Wifi SNR"
  kind: query
  query_command: "xStatus Network [n] Wifi SNR"

- id: x_status_network_n_wifi_ssid
  label: "xStatus Network [n] Wifi SSID"
  kind: query
  query_command: "xStatus Network [n] Wifi SSID"

- id: x_status_network_n_wifi_scan_result_n_raw_ssid
  label: "xStatus Network [n] Wifi ScanResult [n] RawSSID"
  kind: query
  query_command: "xStatus Network [n] Wifi ScanResult [n] RawSSID"

- id: x_status_network_n_wifi_swversion
  label: "xStatus Network [n] Wifi SWVersion"
  kind: query
  query_command: "xStatus Network [n] Wifi SWVersion"

- id: x_status_network_n_wifi_scan_result_n_ssid
  label: "xStatus Network [n] Wifi ScanResult [n] SSID"
  kind: query
  query_command: "xStatus Network [n] Wifi ScanResult [n] SSID"

- id: x_status_network_n_wifi_scan_result_n_auth_type
  label: "xStatus Network [n] Wifi ScanResult [n] AuthType"
  kind: query
  query_command: "xStatus Network [n] Wifi ScanResult [n] AuthType"

- id: x_status_network_n_wifi_scan_result_n_signal_level
  label: "xStatus Network [n] Wifi ScanResult [n] SignalLevel"
  kind: query
  query_command: "xStatus Network [n] Wifi ScanResult [n] SignalLevel"

- id: x_status_network_n_wifi_speed
  label: "xStatus Network [n] Wifi Speed"
  kind: query
  query_command: "xStatus Network [n] Wifi Speed"

- id: x_status_network_n_wifi_tools_version
  label: "xStatus Network [n] Wifi ToolsVersion"
  kind: query
  query_command: "xStatus Network [n] Wifi ToolsVersion"

- id: x_status_network_n_wifi_type
  label: "xStatus Network [n] Wifi Type"
  kind: query
  query_command: "xStatus Network [n] Wifi Type"

- id: x_status_network_n_wifi_status
  label: "xStatus Network [n] Wifi Status"
  kind: query
  query_command: "xStatus Network [n] Wifi Status"

- id: x_status_network_services_ntp_current_address
  label: "xStatus NetworkServices NTP CurrentAddress"
  kind: query
  query_command: "xStatus NetworkServices NTP CurrentAddress"

- id: x_status_network_services_ntp_server_n_address
  label: "xStatus NetworkServices NTP Server [n] Address"
  kind: query
  query_command: "xStatus NetworkServices NTP Server [n] Address"

- id: x_status_network_services_upn_p_status
  label: "xStatus NetworkServices UPnP Status"
  kind: query
  query_command: "xStatus NetworkServices UPnP Status"

- id: x_status_network_services_ntp_status
  label: "xStatus NetworkServices NTP Status"
  kind: query
  query_command: "xStatus NetworkServices NTP Status"

- id: x_status_peripherals_connected_device_n_dram
  label: "xStatus Peripherals ConnectedDevice [n] DRAM"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] DRAM"

- id: x_status_peripherals_connected_device_n_location
  label: "xStatus Peripherals ConnectedDevice [n] Location"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Location"

- id: x_status_peripherals_connected_device_n_hardware_info
  label: "xStatus Peripherals ConnectedDevice [n] HardwareInfo"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] HardwareInfo"

- id: x_status_peripherals_connected_device_n_id
  label: "xStatus Peripherals ConnectedDevice [n] ID"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] ID"

- id: x_status_peripherals_connected_device_n_model
  label: "xStatus Peripherals ConnectedDevice [n] Model"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Model"

- id: x_status_peripherals_connected_device_n_name
  label: "xStatus Peripherals ConnectedDevice [n] Name"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Name"

- id: x_status_peripherals_connected_device_n_network_address
  label: "xStatus Peripherals ConnectedDevice [n] NetworkAddress"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] NetworkAddress"

- id: x_status_peripherals_connected_device_n_placement_rz
  label: "xStatus Peripherals ConnectedDevice [n] Placement RZ"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Placement RZ"

- id: x_status_peripherals_connected_device_n_placement_rx
  label: "xStatus Peripherals ConnectedDevice [n] Placement RX"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Placement RX"

- id: x_status_peripherals_connected_device_n_placement_x
  label: "xStatus Peripherals ConnectedDevice [n] Placement X"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Placement X"

- id: x_status_peripherals_connected_device_n_placement_ry
  label: "xStatus Peripherals ConnectedDevice [n] Placement RY"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Placement RY"

- id: x_status_peripherals_connected_device_n_placement_y
  label: "xStatus Peripherals ConnectedDevice [n] Placement Y"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Placement Y"

- id: x_status_peripherals_connected_device_n_placement_z
  label: "xStatus Peripherals ConnectedDevice [n] Placement Z"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Placement Z"

- id: x_status_peripherals_connected_device_n_role
  label: "xStatus Peripherals ConnectedDevice [n] Role"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Role"

- id: x_status_peripherals_connected_device_n_room_analytics_ambient_temperature
  label: "xStatus Peripherals ConnectedDevice [n] RoomAnalytics AmbientTemperature"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] RoomAnalytics AmbientTemperature"

- id: x_status_peripherals_connected_device_n_room_analytics_air_quality
  label: "xStatus Peripherals ConnectedDevice [n] RoomAnalytics AirQuality"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] RoomAnalytics AirQuality"

- id: x_status_peripherals_connected_device_n_software_info
  label: "xStatus Peripherals ConnectedDevice [n] SoftwareInfo"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] SoftwareInfo"

- id: x_status_peripherals_connected_device_n_security_certificates_last_synced
  label: "xStatus Peripherals ConnectedDevice [n] Security Certificates LastSynced"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Security Certificates LastSynced"

- id: x_status_peripherals_connected_device_n_status
  label: "xStatus Peripherals ConnectedDevice [n] Status"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Status"

- id: x_status_peripherals_connected_device_n_serial_number
  label: "xStatus Peripherals ConnectedDevice [n] SerialNumber"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] SerialNumber"

- id: x_status_peripherals_connected_device_n_type
  label: "xStatus Peripherals ConnectedDevice [n] Type"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Type"

- id: x_status_peripherals_connected_device_n_upgrade_failure_reason
  label: "xStatus Peripherals ConnectedDevice [n] UpgradeFailureReason"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] UpgradeFailureReason"

- id: x_status_peripherals_connected_device_n_upgrade_url
  label: "xStatus Peripherals ConnectedDevice [n] UpgradeURL"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] UpgradeURL"

- id: x_status_peripherals_pin_pairing_pin_visible_on_screen
  label: "xStatus Peripherals PinPairing PinVisibleOnScreen"
  kind: query
  query_command: "xStatus Peripherals PinPairing PinVisibleOnScreen"

- id: x_status_peripherals_connected_device_n_upgrade_status
  label: "xStatus Peripherals ConnectedDevice [n] UpgradeStatus"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] UpgradeStatus"

- id: x_status_peripherals_pin_pairing_retries_remaining
  label: "xStatus Peripherals PinPairing RetriesRemaining"
  kind: query
  query_command: "xStatus Peripherals PinPairing RetriesRemaining"

- id: x_status_peripherals_pin_pairing_time_remaining
  label: "xStatus Peripherals PinPairing TimeRemaining"
  kind: query
  query_command: "xStatus Peripherals PinPairing TimeRemaining"

- id: x_status_provisioning_cucm_customization_checksum
  label: "xStatus Provisioning CUCM Customization Checksum"
  kind: query
  query_command: "xStatus Provisioning CUCM Customization Checksum"

- id: x_status_peripherals_stylus_n_presence
  label: "xStatus Peripherals Stylus [n] Presence"
  kind: query
  query_command: "xStatus Peripherals Stylus [n] Presence"

- id: x_status_provisioning_cucm_extension_mobility_enabled
  label: "xStatus Provisioning CUCM ExtensionMobility Enabled"
  kind: query
  query_command: "xStatus Provisioning CUCM ExtensionMobility Enabled"

- id: x_status_provisioning_cucm_extension_mobility_last_logged_in_user_id
  label: "xStatus Provisioning CUCM ExtensionMobility LastLoggedInUserId"
  kind: query
  query_command: "xStatus Provisioning CUCM ExtensionMobility LastLoggedInUserId"

- id: x_status_provisioning_cucm_extension_mobility_logged_in
  label: "xStatus Provisioning CUCM ExtensionMobility LoggedIn"
  kind: query
  query_command: "xStatus Provisioning CUCM ExtensionMobility LoggedIn"

- id: x_status_provisioning_server
  label: "xStatus Provisioning Server"
  kind: query
  query_command: "xStatus Provisioning Server"

- id: x_status_provisioning_reason
  label: "xStatus Provisioning Reason"
  kind: query
  query_command: "xStatus Provisioning Reason"

- id: x_status_provisioning_software_current_completed_at
  label: "xStatus Provisioning Software Current CompletedAt"
  kind: query
  query_command: "xStatus Provisioning Software Current CompletedAt"

- id: x_status_provisioning_room_type
  label: "xStatus Provisioning RoomType"
  kind: query
  query_command: "xStatus Provisioning RoomType"

- id: x_status_provisioning_software_current_url
  label: "xStatus Provisioning Software Current URL"
  kind: query
  query_command: "xStatus Provisioning Software Current URL"

- id: x_status_provisioning_software_current_version_id
  label: "xStatus Provisioning Software Current VersionId"
  kind: query
  query_command: "xStatus Provisioning Software Current VersionId"

- id: x_status_provisioning_software_upgrade_status_message
  label: "xStatus Provisioning Software UpgradeStatus Message"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Message"

- id: x_status_provisioning_software_upgrade_status_phase
  label: "xStatus Provisioning Software UpgradeStatus Phase"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Phase"

- id: x_status_provisioning_software_upgrade_status_last_change
  label: "xStatus Provisioning Software UpgradeStatus LastChange"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus LastChange"

- id: x_status_provisioning_software_upgrade_status_session_id
  label: "xStatus Provisioning Software UpgradeStatus SessionId"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus SessionId"

- id: x_status_provisioning_software_upgrade_status_status
  label: "xStatus Provisioning Software UpgradeStatus Status"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Status"

- id: x_status_provisioning_software_upgrade_status_url
  label: "xStatus Provisioning Software UpgradeStatus URL"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus URL"

- id: x_status_provisioning_software_upgrade_status_urgency
  label: "xStatus Provisioning Software UpgradeStatus Urgency"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Urgency"

- id: x_status_provisioning_software_upgrade_status_version_id
  label: "xStatus Provisioning Software UpgradeStatus VersionId"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus VersionId"

- id: x_status_provisioning_status
  label: "xStatus Provisioning Status"
  kind: query
  query_command: "xStatus Provisioning Status"

- id: x_status_provisioning_webex_calling_reason
  label: "xStatus Provisioning WebexCalling Reason"
  kind: query
  query_command: "xStatus Provisioning WebexCalling Reason"

- id: x_status_provisioning_webex_calling_status
  label: "xStatus Provisioning WebexCalling Status"
  kind: query
  query_command: "xStatus Provisioning WebexCalling Status"

- id: x_status_proximity_pairing_count
  label: "xStatus Proximity PairingCount"
  kind: query
  query_command: "xStatus Proximity PairingCount"

- id: x_status_proximity_services_availability
  label: "xStatus Proximity Services Availability"
  kind: query
  query_command: "xStatus Proximity Services Availability"

- id: x_status_remote_access_session_n_state
  label: "xStatus RemoteAccess Session [n] State"
  kind: query
  query_command: "xStatus RemoteAccess Session [n] State"

- id: x_status_remote_access_availability_reason
  label: "xStatus RemoteAccess Availability Reason"
  kind: query
  query_command: "xStatus RemoteAccess Availability Reason"

- id: x_status_remote_access_availability_state
  label: "xStatus RemoteAccess Availability State"
  kind: query
  query_command: "xStatus RemoteAccess Availability State"

- id: x_status_remote_access_session_n_initiator_name
  label: "xStatus RemoteAccess Session [n] InitiatorName"
  kind: query
  query_command: "xStatus RemoteAccess Session [n] InitiatorName"

- id: x_status_remote_access_session_n_initiator_permit
  label: "xStatus RemoteAccess Session [n] InitiatorPermit"
  kind: query
  query_command: "xStatus RemoteAccess Session [n] InitiatorPermit"

- id: x_status_room_analytics_ambient_noise_level_a
  label: "xStatus RoomAnalytics AmbientNoise Level A"
  kind: query
  query_command: "xStatus RoomAnalytics AmbientNoise Level A"

- id: x_status_room_analytics_engagement_close_proximity
  label: "xStatus RoomAnalytics Engagement CloseProximity"
  kind: query
  query_command: "xStatus RoomAnalytics Engagement CloseProximity"

- id: x_status_room_analytics_ambient_temperature
  label: "xStatus RoomAnalytics AmbientTemperature"
  kind: query
  query_command: "xStatus RoomAnalytics AmbientTemperature"

- id: x_status_room_analytics_people_count_capacity
  label: "xStatus RoomAnalytics PeopleCount Capacity"
  kind: query
  query_command: "xStatus RoomAnalytics PeopleCount Capacity"

- id: x_status_room_analytics_people_count_current
  label: "xStatus RoomAnalytics PeopleCount Current"
  kind: query
  query_command: "xStatus RoomAnalytics PeopleCount Current"

- id: x_status_room_analytics_relative_humidity
  label: "xStatus RoomAnalytics RelativeHumidity"
  kind: query
  query_command: "xStatus RoomAnalytics RelativeHumidity"

- id: x_status_room_analytics_people_presence
  label: "xStatus RoomAnalytics PeoplePresence"
  kind: query
  query_command: "xStatus RoomAnalytics PeoplePresence"

- id: x_status_room_analytics_reverberation_time_last_run
  label: "xStatus RoomAnalytics ReverberationTime LastRun"
  kind: query
  query_command: "xStatus RoomAnalytics ReverberationTime LastRun"

- id: x_status_room_analytics_reverberation_time_measurement_state
  label: "xStatus RoomAnalytics ReverberationTime MeasurementState"
  kind: query
  query_command: "xStatus RoomAnalytics ReverberationTime MeasurementState"

- id: x_status_room_analytics_reverberation_time_middle_rt60
  label: "xStatus RoomAnalytics ReverberationTime Middle RT60"
  kind: query
  query_command: "xStatus RoomAnalytics ReverberationTime Middle RT60"

- id: x_status_room_analytics_reverberation_time_octaves_n_rt60
  label: "xStatus RoomAnalytics ReverberationTime Octaves [n] RT60"
  kind: query
  query_command: "xStatus RoomAnalytics ReverberationTime Octaves [n] RT60"

- id: x_status_room_analytics_reverberation_time_octaves_n_center_frequency
  label: "xStatus RoomAnalytics ReverberationTime Octaves [n] CenterFrequency"
  kind: query
  query_command: "xStatus RoomAnalytics ReverberationTime Octaves [n] CenterFrequency"

- id: x_status_room_analytics_room_in_use
  label: "xStatus RoomAnalytics RoomInUse"
  kind: query
  query_command: "xStatus RoomAnalytics RoomInUse"

- id: x_status_room_analytics_sound_level_a
  label: "xStatus RoomAnalytics Sound Level A"
  kind: query
  query_command: "xStatus RoomAnalytics Sound Level A"

- id: x_status_room_analytics_ultrasound_presence
  label: "xStatus RoomAnalytics UltrasoundPresence"
  kind: query
  query_command: "xStatus RoomAnalytics UltrasoundPresence"

- id: x_status_room_analytics_t3_alarm_detected
  label: "xStatus RoomAnalytics T3Alarm Detected"
  kind: query
  query_command: "xStatus RoomAnalytics T3Alarm Detected"

- id: x_status_room_preset_n_defined
  label: "xStatus RoomPreset [n] Defined"
  kind: query
  query_command: "xStatus RoomPreset [n] Defined"

- id: x_status_sip_alternate_uri_alias_n_uri
  label: "xStatus SIP AlternateURI Alias [n] URI"
  kind: query
  query_command: "xStatus SIP AlternateURI Alias [n] URI"

- id: x_status_sip_alternate_uri_primary_uri
  label: "xStatus SIP AlternateURI Primary URI"
  kind: query
  query_command: "xStatus SIP AlternateURI Primary URI"

- id: x_status_room_preset_n_description
  label: "xStatus RoomPreset [n] Description"
  kind: query
  query_command: "xStatus RoomPreset [n] Description"

- id: x_status_room_preset_n_type
  label: "xStatus RoomPreset [n] Type"
  kind: query
  query_command: "xStatus RoomPreset [n] Type"

- id: x_status_sip_authentication
  label: "xStatus SIP Authentication"
  kind: query
  query_command: "xStatus SIP Authentication"

- id: x_status_sip_call_forward_display_name
  label: "xStatus SIP CallForward DisplayName"
  kind: query
  query_command: "xStatus SIP CallForward DisplayName"

- id: x_status_sip_call_forward_mode
  label: "xStatus SIP CallForward Mode"
  kind: query
  query_command: "xStatus SIP CallForward Mode"

- id: x_status_sip_call_forward_uri
  label: "xStatus SIP CallForward URI"
  kind: query
  query_command: "xStatus SIP CallForward URI"

- id: x_status_sip_mailbox_messages_waiting
  label: "xStatus SIP Mailbox MessagesWaiting"
  kind: query
  query_command: "xStatus SIP Mailbox MessagesWaiting"

- id: x_status_sip_mailbox_uri
  label: "xStatus SIP Mailbox URI"
  kind: query
  query_command: "xStatus SIP Mailbox URI"

- id: x_status_sip_proxy_n_address
  label: "xStatus SIP Proxy [n] Address"
  kind: query
  query_command: "xStatus SIP Proxy [n] Address"

- id: x_status_sip_proxy_n_status
  label: "xStatus SIP Proxy [n] Status"
  kind: query
  query_command: "xStatus SIP Proxy [n] Status"

- id: x_status_sip_registration_n_status
  label: "xStatus SIP Registration [n] Status"
  kind: query
  query_command: "xStatus SIP Registration [n] Status"

- id: x_status_sip_registration_n_authentication
  label: "xStatus SIP Registration [n] Authentication"
  kind: query
  query_command: "xStatus SIP Registration [n] Authentication"

- id: x_status_sip_registration_n_uri
  label: "xStatus SIP Registration [n] URI"
  kind: query
  query_command: "xStatus SIP Registration [n] URI"

- id: x_status_sip_registration_n_reason
  label: "xStatus SIP Registration [n] Reason"
  kind: query
  query_command: "xStatus SIP Registration [n] Reason"

- id: x_status_sip_secure
  label: "xStatus SIP Secure"
  kind: query
  query_command: "xStatus SIP Secure"

- id: x_status_security_persistency_call_history
  label: "xStatus Security Persistency CallHistory"
  kind: query
  query_command: "xStatus Security Persistency CallHistory"

- id: x_status_sip_verified
  label: "xStatus SIP Verified"
  kind: query
  query_command: "xStatus SIP Verified"

- id: x_status_security_persistency_configurations
  label: "xStatus Security Persistency Configurations"
  kind: query
  query_command: "xStatus Security Persistency Configurations"

- id: x_status_security_persistency_dhcp
  label: "xStatus Security Persistency DHCP"
  kind: query
  query_command: "xStatus Security Persistency DHCP"

- id: x_status_security_persistency_internal_logging
  label: "xStatus Security Persistency InternalLogging"
  kind: query
  query_command: "xStatus Security Persistency InternalLogging"

- id: x_status_sensors_radar_mode
  label: "xStatus Sensors Radar Mode"
  kind: query
  query_command: "xStatus Sensors Radar Mode"

- id: x_status_security_persistency_local_phonebook
  label: "xStatus Security Persistency LocalPhonebook"
  kind: query
  query_command: "xStatus Security Persistency LocalPhonebook"

- id: x_status_standby_level
  label: "xStatus Standby Level"
  kind: query
  query_command: "xStatus Standby Level"

- id: x_status_system_unit_broadcast_name
  label: "xStatus SystemUnit BroadcastName"
  kind: query
  query_command: "xStatus SystemUnit BroadcastName"

- id: x_status_standby_state
  label: "xStatus Standby State"
  kind: query
  query_command: "xStatus Standby State"

- id: x_status_system_unit_developer_preview_mode
  label: "xStatus SystemUnit DeveloperPreview Mode"
  kind: query
  query_command: "xStatus SystemUnit DeveloperPreview Mode"

- id: x_status_system_unit_extensions_microsoft_supported
  label: "xStatus SystemUnit Extensions Microsoft Supported"
  kind: query
  query_command: "xStatus SystemUnit Extensions Microsoft Supported"

- id: x_status_system_unit_hardware_module_compatibility_level
  label: "xStatus SystemUnit Hardware Module CompatibilityLevel"
  kind: query
  query_command: "xStatus SystemUnit Hardware Module CompatibilityLevel"

- id: x_status_system_unit_hardware_dram
  label: "xStatus SystemUnit Hardware DRAM"
  kind: query
  query_command: "xStatus SystemUnit Hardware DRAM"

- id: x_status_system_unit_hardware_has_wifi
  label: "xStatus SystemUnit Hardware HasWifi"
  kind: query
  query_command: "xStatus SystemUnit Hardware HasWifi"

- id: x_status_system_unit_hardware_module_device_id
  label: "xStatus SystemUnit Hardware Module DeviceId"
  kind: query
  query_command: "xStatus SystemUnit Hardware Module DeviceId"

- id: x_status_system_unit_hardware_main_board_revision
  label: "xStatus SystemUnit Hardware MainBoard Revision"
  kind: query
  query_command: "xStatus SystemUnit Hardware MainBoard Revision"

- id: x_status_system_unit_hardware_module_serial_number
  label: "xStatus SystemUnit Hardware Module SerialNumber"
  kind: query
  query_command: "xStatus SystemUnit Hardware Module SerialNumber"

- id: x_status_system_unit_hardware_monitoring_fan_n_status
  label: "xStatus SystemUnit Hardware Monitoring Fan [n] Status"
  kind: query
  query_command: "xStatus SystemUnit Hardware Monitoring Fan [n] Status"

- id: x_status_system_unit_hardware_usbc_n_connected
  label: "xStatus SystemUnit Hardware USBC [n] Connected"
  kind: query
  query_command: "xStatus SystemUnit Hardware USBC [n] Connected"

- id: x_status_system_unit_hardware_monitoring_temperature_status
  label: "xStatus SystemUnit Hardware Monitoring Temperature Status"
  kind: query
  query_command: "xStatus SystemUnit Hardware Monitoring Temperature Status"

- id: x_status_system_unit_last_shutdown_reason
  label: "xStatus SystemUnit LastShutdownReason"
  kind: query
  query_command: "xStatus SystemUnit LastShutdownReason"

- id: x_status_system_unit_last_shutdown_time
  label: "xStatus SystemUnit LastShutdownTime"
  kind: query
  query_command: "xStatus SystemUnit LastShutdownTime"

- id: x_status_system_unit_hardware_udi
  label: "xStatus SystemUnit Hardware UDI"
  kind: query
  query_command: "xStatus SystemUnit Hardware UDI"

- id: x_status_system_unit_notifications_notification_n_type
  label: "xStatus SystemUnit Notifications Notification [n] Type"
  kind: query
  query_command: "xStatus SystemUnit Notifications Notification [n] Type"

- id: x_status_system_unit_notifications_notification_n_text
  label: "xStatus SystemUnit Notifications Notification [n] Text"
  kind: query
  query_command: "xStatus SystemUnit Notifications Notification [n] Text"

- id: x_status_system_unit_product_id
  label: "xStatus SystemUnit ProductId"
  kind: query
  query_command: "xStatus SystemUnit ProductId"

- id: x_status_system_unit_product_platform
  label: "xStatus SystemUnit ProductPlatform"
  kind: query
  query_command: "xStatus SystemUnit ProductPlatform"

- id: x_status_system_unit_product_type
  label: "xStatus SystemUnit ProductType"
  kind: query
  query_command: "xStatus SystemUnit ProductType"

- id: x_status_system_unit_software_option_keys_avintegrator
  label: "xStatus SystemUnit Software OptionKeys AVIntegrator"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys AVIntegrator"

- id: x_status_system_unit_software_display_name
  label: "xStatus SystemUnit Software DisplayName"
  kind: query
  query_command: "xStatus SystemUnit Software DisplayName"

- id: x_status_system_unit_software_option_keys_developer_preview
  label: "xStatus SystemUnit Software OptionKeys DeveloperPreview"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys DeveloperPreview"

- id: x_status_system_unit_software_name
  label: "xStatus SystemUnit Software Name"
  kind: query
  query_command: "xStatus SystemUnit Software Name"

- id: x_status_system_unit_software_option_keys_encryption
  label: "xStatus SystemUnit Software OptionKeys Encryption"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys Encryption"

- id: x_status_system_unit_software_option_keys_multi_site
  label: "xStatus SystemUnit Software OptionKeys MultiSite"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys MultiSite"

- id: x_status_system_unit_software_version
  label: "xStatus SystemUnit Software Version"
  kind: query
  query_command: "xStatus SystemUnit Software Version"

- id: x_status_system_unit_state_camera_lid
  label: "xStatus SystemUnit State CameraLid"
  kind: query
  query_command: "xStatus SystemUnit State CameraLid"

- id: x_status_system_unit_software_option_keys_remote_monitoring
  label: "xStatus SystemUnit Software OptionKeys RemoteMonitoring"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys RemoteMonitoring"

- id: x_status_system_unit_state_number_of_active_calls
  label: "xStatus SystemUnit State NumberOfActiveCalls"
  kind: query
  query_command: "xStatus SystemUnit State NumberOfActiveCalls"

- id: x_status_system_unit_software_release_date
  label: "xStatus SystemUnit Software ReleaseDate"
  kind: query
  query_command: "xStatus SystemUnit Software ReleaseDate"

- id: x_status_system_unit_state_number_of_in_progress_calls
  label: "xStatus SystemUnit State NumberOfInProgressCalls"
  kind: query
  query_command: "xStatus SystemUnit State NumberOfInProgressCalls"

- id: x_status_system_unit_state_number_of_suspended_calls
  label: "xStatus SystemUnit State NumberOfSuspendedCalls"
  kind: query
  query_command: "xStatus SystemUnit State NumberOfSuspendedCalls"

- id: x_status_system_unit_state_system
  label: "xStatus SystemUnit State System"
  kind: query
  query_command: "xStatus SystemUnit State System"

- id: x_status_system_unit_uptime
  label: "xStatus SystemUnit Uptime"
  kind: query
  query_command: "xStatus SystemUnit Uptime"

- id: x_status_system_unit_state_subsystem_application
  label: "xStatus SystemUnit State Subsystem Application"
  kind: query
  query_command: "xStatus SystemUnit State Subsystem Application"

- id: x_status_thousand_eyes_status
  label: "xStatus ThousandEyes Status"
  kind: query
  query_command: "xStatus ThousandEyes Status"

- id: x_status_thousand_eyes_version
  label: "xStatus ThousandEyes Version"
  kind: query
  query_command: "xStatus ThousandEyes Version"

- id: x_status_time_system_time
  label: "xStatus Time SystemTime"
  kind: query
  query_command: "xStatus Time SystemTime"

- id: x_status_user_interface_accessibility_screen_reader_mode
  label: "xStatus UserInterface Accessibility ScreenReader Mode"
  kind: query
  query_command: "xStatus UserInterface Accessibility ScreenReader Mode"

- id: x_status_user_interface_branding_custom_id_background
  label: "xStatus UserInterface Branding CustomId Background"
  kind: query
  query_command: "xStatus UserInterface Branding CustomId Background"

- id: x_status_user_interface_branding_custom_id_branding
  label: "xStatus UserInterface Branding CustomId Branding"
  kind: query
  query_command: "xStatus UserInterface Branding CustomId Branding"

- id: x_status_user_interface_contact_info_contact_method_n_number
  label: "xStatus UserInterface ContactInfo ContactMethod [n] Number"
  kind: query
  query_command: "xStatus UserInterface ContactInfo ContactMethod [n] Number"

- id: x_status_user_interface_branding_custom_id_halfwake_background
  label: "xStatus UserInterface Branding CustomId HalfwakeBackground"
  kind: query
  query_command: "xStatus UserInterface Branding CustomId HalfwakeBackground"

- id: x_status_user_interface_contact_info_name
  label: "xStatus UserInterface ContactInfo Name"
  kind: query
  query_command: "xStatus UserInterface ContactInfo Name"

- id: x_status_user_interface_branding_custom_id_halfwake_branding
  label: "xStatus UserInterface Branding CustomId HalfwakeBranding"
  kind: query
  query_command: "xStatus UserInterface Branding CustomId HalfwakeBranding"

- id: x_status_user_interface_extensions_widget_n_value
  label: "xStatus UserInterface Extensions Widget [n] Value"
  kind: query
  query_command: "xStatus UserInterface Extensions Widget [n] Value"

- id: x_status_user_interface_extensions_widget_n_widget_id
  label: "xStatus UserInterface Extensions Widget [n] WidgetId"
  kind: query
  query_command: "xStatus UserInterface Extensions Widget [n] WidgetId"

- id: x_status_user_interface_features_calendar_start
  label: "xStatus UserInterface Features Calendar Start"
  kind: query
  query_command: "xStatus UserInterface Features Calendar Start"

- id: x_status_user_interface_features_call_ainotes
  label: "xStatus UserInterface Features Call AINotes"
  kind: query
  query_command: "xStatus UserInterface Features Call AINotes"

- id: x_status_user_interface_features_call_audio_mute
  label: "xStatus UserInterface Features Call AudioMute"
  kind: query
  query_command: "xStatus UserInterface Features Call AudioMute"

- id: x_status_user_interface_features_call_breakouts
  label: "xStatus UserInterface Features Call Breakouts"
  kind: query
  query_command: "xStatus UserInterface Features Call Breakouts"

- id: x_status_user_interface_features_call_hdmi_passthrough
  label: "xStatus UserInterface Features Call HdmiPassthrough"
  kind: query
  query_command: "xStatus UserInterface Features Call HdmiPassthrough"

- id: x_status_user_interface_features_call_camera_controls
  label: "xStatus UserInterface Features Call CameraControls"
  kind: query
  query_command: "xStatus UserInterface Features Call CameraControls"

- id: x_status_user_interface_features_call_join_google_meet
  label: "xStatus UserInterface Features Call JoinGoogleMeet"
  kind: query
  query_command: "xStatus UserInterface Features Call JoinGoogleMeet"

- id: x_status_user_interface_features_call_end
  label: "xStatus UserInterface Features Call End"
  kind: query
  query_command: "xStatus UserInterface Features Call End"

- id: x_status_user_interface_features_call_join_webex
  label: "xStatus UserInterface Features Call JoinWebex"
  kind: query
  query_command: "xStatus UserInterface Features Call JoinWebex"

- id: x_status_user_interface_features_call_join_zoom
  label: "xStatus UserInterface Features Call JoinZoom"
  kind: query
  query_command: "xStatus UserInterface Features Call JoinZoom"

- id: x_status_user_interface_features_call_layout_controls
  label: "xStatus UserInterface Features Call LayoutControls"
  kind: query
  query_command: "xStatus UserInterface Features Call LayoutControls"

- id: x_status_user_interface_features_call_keypad
  label: "xStatus UserInterface Features Call Keypad"
  kind: query
  query_command: "xStatus UserInterface Features Call Keypad"

- id: x_status_user_interface_features_call_mid_call_controls
  label: "xStatus UserInterface Features Call MidCallControls"
  kind: query
  query_command: "xStatus UserInterface Features Call MidCallControls"

- id: x_status_user_interface_features_call_music_mode
  label: "xStatus UserInterface Features Call MusicMode"
  kind: query
  query_command: "xStatus UserInterface Features Call MusicMode"

- id: x_status_user_interface_features_call_start
  label: "xStatus UserInterface Features Call Start"
  kind: query
  query_command: "xStatus UserInterface Features Call Start"

- id: x_status_user_interface_features_call_participant_list
  label: "xStatus UserInterface Features Call ParticipantList"
  kind: query
  query_command: "xStatus UserInterface Features Call ParticipantList"

- id: x_status_user_interface_features_call_video_mute
  label: "xStatus UserInterface Features Call VideoMute"
  kind: query
  query_command: "xStatus UserInterface Features Call VideoMute"

- id: x_status_user_interface_features_call_selfview_controls
  label: "xStatus UserInterface Features Call SelfviewControls"
  kind: query
  query_command: "xStatus UserInterface Features Call SelfviewControls"

- id: x_status_user_interface_features_call_webcam
  label: "xStatus UserInterface Features Call Webcam"
  kind: query
  query_command: "xStatus UserInterface Features Call Webcam"

- id: x_status_user_interface_features_whiteboard_start
  label: "xStatus UserInterface Features Whiteboard Start"
  kind: query
  query_command: "xStatus UserInterface Features Whiteboard Start"

- id: x_status_user_interface_features_files_start
  label: "xStatus UserInterface Features Files Start"
  kind: query
  query_command: "xStatus UserInterface Features Files Start"

- id: x_status_user_interface_led_control_color
  label: "xStatus UserInterface LedControl Color"
  kind: query
  query_command: "xStatus UserInterface LedControl Color"

- id: x_status_user_interface_features_share_start
  label: "xStatus UserInterface Features Share Start"
  kind: query
  query_command: "xStatus UserInterface Features Share Start"

- id: x_status_user_interface_osd_output
  label: "xStatus UserInterface OSD Output"
  kind: query
  query_command: "xStatus UserInterface OSD Output"

- id: x_status_user_interface_screen_lock_status
  label: "xStatus UserInterface ScreenLock Status"
  kind: query
  query_command: "xStatus UserInterface ScreenLock Status"

- id: x_status_user_interface_translation_override_checksum
  label: "xStatus UserInterface Translation Override Checksum"
  kind: query
  query_command: "xStatus UserInterface Translation Override Checksum"

- id: x_status_user_interface_web_view_n_error_description
  label: "xStatus UserInterface WebView [n] ErrorDescription"
  kind: query
  query_command: "xStatus UserInterface WebView [n] ErrorDescription"

- id: x_status_user_interface_settings_menu_visibility
  label: "xStatus UserInterface SettingsMenu Visibility"
  kind: query
  query_command: "xStatus UserInterface SettingsMenu Visibility"

- id: x_status_user_interface_web_view_n_error_type
  label: "xStatus UserInterface WebView [n] ErrorType"
  kind: query
  query_command: "xStatus UserInterface WebView [n] ErrorType"

- id: x_status_user_interface_web_view_n_type
  label: "xStatus UserInterface WebView [n] Type"
  kind: query
  query_command: "xStatus UserInterface WebView [n] Type"

- id: x_status_user_interface_web_view_n_http_response_status_code
  label: "xStatus UserInterface WebView [n] HttpResponseStatusCode"
  kind: query
  query_command: "xStatus UserInterface WebView [n] HttpResponseStatusCode"

- id: x_status_user_interface_web_view_n_status
  label: "xStatus UserInterface WebView [n] Status"
  kind: query
  query_command: "xStatus UserInterface WebView [n] Status"

- id: x_status_user_interface_web_view_n_url
  label: "xStatus UserInterface WebView [n] URL"
  kind: query
  query_command: "xStatus UserInterface WebView [n] URL"

- id: x_status_video_active_speaker_pipposition
  label: "xStatus Video ActiveSpeaker PIPPosition"
  kind: query
  query_command: "xStatus Video ActiveSpeaker PIPPosition"

- id: x_status_video_hdmi_output
  label: "xStatus Video HdmiOutput"
  kind: query
  query_command: "xStatus Video HdmiOutput"

- id: x_status_video_input_air_play_activity
  label: "xStatus Video Input AirPlay Activity"
  kind: query
  query_command: "xStatus Video Input AirPlay Activity"

- id: x_status_video_input_connector_n_connected
  label: "xStatus Video Input Connector [n] Connected"
  kind: query
  query_command: "xStatus Video Input Connector [n] Connected"

- id: x_status_video_input_connector_n_connected_device_cec_n_device_type
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] DeviceType"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] DeviceType"

- id: x_status_video_input_air_play_status
  label: "xStatus Video Input AirPlay Status"
  kind: query
  query_command: "xStatus Video Input AirPlay Status"

- id: x_status_video_input_connector_n_connected_device_cec_n_logical_address
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] LogicalAddress"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] LogicalAddress"

- id: x_status_video_input_connector_n_connected_device_cec_n_name
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] Name"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] Name"

- id: x_status_video_input_connector_n_connected_device_cec_n_power_status
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] PowerStatus"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] PowerStatus"

- id: x_status_video_input_connector_n_signal_state
  label: "xStatus Video Input Connector [n] SignalState"
  kind: query
  query_command: "xStatus Video Input Connector [n] SignalState"

- id: x_status_video_input_connector_n_source_id
  label: "xStatus Video Input Connector [n] SourceId"
  kind: query
  query_command: "xStatus Video Input Connector [n] SourceId"

- id: x_status_video_input_connector_n_connected_device_cec_n_vendor_id
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] VendorId"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] VendorId"

- id: x_status_video_input_connector_n_type
  label: "xStatus Video Input Connector [n] Type"
  kind: query
  query_command: "xStatus Video Input Connector [n] Type"

- id: x_status_video_input_direct_share_n_peer_address
  label: "xStatus Video Input DirectShare [n] Peer Address"
  kind: query
  query_command: "xStatus Video Input DirectShare [n] Peer Address"

- id: x_status_video_input_main_video_mute
  label: "xStatus Video Input MainVideoMute"
  kind: query
  query_command: "xStatus Video Input MainVideoMute"

- id: x_status_video_input_direct_share_n_peer_peripheral_id
  label: "xStatus Video Input DirectShare [n] Peer PeripheralID"
  kind: query
  query_command: "xStatus Video Input DirectShare [n] Peer PeripheralID"

- id: x_status_video_input_main_video_source
  label: "xStatus Video Input MainVideoSource"
  kind: query
  query_command: "xStatus Video Input MainVideoSource"

- id: x_status_video_input_direct_share_n_type
  label: "xStatus Video Input DirectShare [n] Type"
  kind: query
  query_command: "xStatus Video Input DirectShare [n] Type"

- id: x_status_video_input_miracast_channel
  label: "xStatus Video Input Miracast Channel"
  kind: query
  query_command: "xStatus Video Input Miracast Channel"

- id: x_status_video_input_miracast_transport
  label: "xStatus Video Input Miracast Transport"
  kind: query
  query_command: "xStatus Video Input Miracast Transport"

- id: x_status_video_input_miracast_pin_attempts_left
  label: "xStatus Video Input Miracast PinAttemptsLeft"
  kind: query
  query_command: "xStatus Video Input Miracast PinAttemptsLeft"

- id: x_status_video_input_miracast_status
  label: "xStatus Video Input Miracast Status"
  kind: query
  query_command: "xStatus Video Input Miracast Status"

- id: x_status_video_input_source_n_availability
  label: "xStatus Video Input Source [n] Availability"
  kind: query
  query_command: "xStatus Video Input Source [n] Availability"

- id: x_status_video_input_source_n_connector_id
  label: "xStatus Video Input Source [n] ConnectorId"
  kind: query
  query_command: "xStatus Video Input Source [n] ConnectorId"

- id: x_status_video_input_source_n_media_channel_id
  label: "xStatus Video Input Source [n] MediaChannelId"
  kind: query
  query_command: "xStatus Video Input Source [n] MediaChannelId"

- id: x_status_video_input_source_n_format_status
  label: "xStatus Video Input Source [n] FormatStatus"
  kind: query
  query_command: "xStatus Video Input Source [n] FormatStatus"

- id: x_status_video_input_source_n_resolution_height
  label: "xStatus Video Input Source [n] Resolution Height"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution Height"

- id: x_status_video_input_source_n_resolution_refresh_rate
  label: "xStatus Video Input Source [n] Resolution RefreshRate"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution RefreshRate"

- id: x_status_video_input_source_n_resolution_width
  label: "xStatus Video Input Source [n] Resolution Width"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution Width"

- id: x_status_video_layout_current_layouts_available_layouts_n_layout_name
  label: "xStatus Video Layout CurrentLayouts AvailableLayouts [n] LayoutName"
  kind: query
  query_command: "xStatus Video Layout CurrentLayouts AvailableLayouts [n] LayoutName"

- id: x_status_video_layout_active_speaker_on_stage
  label: "xStatus Video Layout ActiveSpeakerOnStage"
  kind: query
  query_command: "xStatus Video Layout ActiveSpeakerOnStage"

- id: x_status_video_layout_current_layouts_active_layout
  label: "xStatus Video Layout CurrentLayouts ActiveLayout"
  kind: query
  query_command: "xStatus Video Layout CurrentLayouts ActiveLayout"

- id: x_status_video_layout_current_layouts_default_layout
  label: "xStatus Video Layout CurrentLayouts DefaultLayout"
  kind: query
  query_command: "xStatus Video Layout CurrentLayouts DefaultLayout"

- id: x_status_video_layout_layout_family_local
  label: "xStatus Video Layout LayoutFamily Local"
  kind: query
  query_command: "xStatus Video Layout LayoutFamily Local"

- id: x_status_video_layout_stage_active_speaker_index
  label: "xStatus Video Layout StageActiveSpeakerIndex"
  kind: query
  query_command: "xStatus Video Layout StageActiveSpeakerIndex"

- id: x_status_video_layout_layout_family_remote
  label: "xStatus Video Layout LayoutFamily Remote"
  kind: query
  query_command: "xStatus Video Layout LayoutFamily Remote"

- id: x_status_video_layout_local_stage_updates_disallowed
  label: "xStatus Video Layout LocalStageUpdatesDisallowed"
  kind: query
  query_command: "xStatus Video Layout LocalStageUpdatesDisallowed"

- id: x_status_video_layout_stage_controlled_by_host
  label: "xStatus Video Layout StageControlledByHost"
  kind: query
  query_command: "xStatus Video Layout StageControlledByHost"

- id: x_status_video_layout_stage_participant_n_call_id
  label: "xStatus Video Layout StageParticipant [n] CallId"
  kind: query
  query_command: "xStatus Video Layout StageParticipant [n] CallId"

- id: x_status_video_layout_self_on_stage
  label: "xStatus Video Layout SelfOnStage"
  kind: query
  query_command: "xStatus Video Layout SelfOnStage"

- id: x_status_video_layout_stage_participant_n_participant_id
  label: "xStatus Video Layout StageParticipant [n] ParticipantId"
  kind: query
  query_command: "xStatus Video Layout StageParticipant [n] ParticipantId"

- id: x_status_video_output_connector_n_connected
  label: "xStatus Video Output Connector [n] Connected"
  kind: query
  query_command: "xStatus Video Output Connector [n] Connected"

- id: x_status_video_output_connector_n_connected_device_cec_n_device_type
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] DeviceType"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] DeviceType"

- id: x_status_video_monitors
  label: "xStatus Video Monitors"
  kind: query
  query_command: "xStatus Video Monitors"

- id: x_status_video_output_connector_n_connected_device_cec_n_logical_address
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] LogicalAddress"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] LogicalAddress"

- id: x_status_video_output_connector_n_connected_device_cec_n_power_status
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] PowerStatus"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] PowerStatus"

- id: x_status_video_output_connector_n_connected_device_preferred_format
  label: "xStatus Video Output Connector [n] ConnectedDevice PreferredFormat"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice PreferredFormat"

- id: x_status_video_output_connector_n_connected_device_screen_size
  label: "xStatus Video Output Connector [n] ConnectedDevice ScreenSize"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice ScreenSize"

- id: x_status_video_output_connector_n_connected_device_cec_n_vendor_id_applies_to_all_products
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] VendorId _Applies to: All products_"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] VendorId _Applies to: All products_"

- id: x_status_video_output_connector_n_connected_device_supported_format_res_1920_1080_50
  label: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_1920_1080_50"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_1920_1080_50"

- id: x_status_video_output_connector_n_connected_device_supported_format_res_1920_1200_50
  label: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_1920_1200_50"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_1920_1200_50"

- id: x_status_video_output_connector_n_connected_device_supported_format_res_1920_1080_60
  label: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_1920_1080_60"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_1920_1080_60"

- id: x_status_video_output_connector_n_connected_device_supported_format_res_1920_1200_60
  label: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_1920_1200_60"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_1920_1200_60"

- id: x_status_video_output_connector_n_connected_device_supported_format_res_2560_1080_60
  label: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_2560_1080_60"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_2560_1080_60"

- id: x_status_video_output_connector_n_connected_device_supported_format_res_2560_1440_60
  label: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_2560_1440_60"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_2560_1440_60"

- id: x_status_video_output_connector_n_connected_device_supported_format_res_3840_1600_60
  label: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_3840_1600_60"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_3840_1600_60"

- id: x_status_video_output_connector_n_connected_device_supported_format_res_3840_1620_60
  label: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_3840_1620_60"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_3840_1620_60"

- id: x_status_video_output_connector_n_connected_device_supported_format_res_3840_2160_60
  label: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_3840_2160_60"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice SupportedFormat Res_3840_2160_60"

- id: x_status_video_output_connector_n_hdcp_state
  label: "xStatus Video Output Connector [n] HDCP State"
  kind: query
  query_command: "xStatus Video Output Connector [n] HDCP State"

- id: x_status_video_output_connector_n_monitor_role
  label: "xStatus Video Output Connector [n] MonitorRole"
  kind: query
  query_command: "xStatus Video Output Connector [n] MonitorRole"

- id: x_status_video_output_connector_n_hdcp_version
  label: "xStatus Video Output Connector [n] HDCP Version"
  kind: query
  query_command: "xStatus Video Output Connector [n] HDCP Version"

- id: x_status_video_output_connector_n_resolution_height
  label: "xStatus Video Output Connector [n] Resolution Height"
  kind: query
  query_command: "xStatus Video Output Connector [n] Resolution Height"

- id: x_status_video_output_connector_n_resolution_refresh_rate
  label: "xStatus Video Output Connector [n] Resolution RefreshRate"
  kind: query
  query_command: "xStatus Video Output Connector [n] Resolution RefreshRate"

- id: x_status_video_output_hdmi_passthrough_status
  label: "xStatus Video Output HDMI Passthrough Status"
  kind: query
  query_command: "xStatus Video Output HDMI Passthrough Status"

- id: x_status_video_output_connector_n_resolution_width
  label: "xStatus Video Output Connector [n] Resolution Width"
  kind: query
  query_command: "xStatus Video Output Connector [n] Resolution Width"

- id: x_status_video_output_monitor_n_backlight
  label: "xStatus Video Output Monitor [n] Backlight"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Backlight"

- id: x_status_video_output_connector_n_type
  label: "xStatus Video Output Connector [n] Type"
  kind: query
  query_command: "xStatus Video Output Connector [n] Type"

- id: x_status_video_output_monitor_n_calibrated
  label: "xStatus Video Output Monitor [n] Calibrated"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Calibrated"

- id: x_status_video_output_monitor_n_firmware_version
  label: "xStatus Video Output Monitor [n] FirmwareVersion"
  kind: query
  query_command: "xStatus Video Output Monitor [n] FirmwareVersion"

- id: x_status_video_output_monitor_n_color_temperature_selected
  label: "xStatus Video Output Monitor [n] ColorTemperature Selected"
  kind: query
  query_command: "xStatus Video Output Monitor [n] ColorTemperature Selected"

- id: x_status_video_output_monitor_n_ip_address
  label: "xStatus Video Output Monitor [n] IpAddress"
  kind: query
  query_command: "xStatus Video Output Monitor [n] IpAddress"

- id: x_status_video_output_monitor_n_configured
  label: "xStatus Video Output Monitor [n] Configured"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Configured"

- id: x_status_video_output_monitor_n_mdc_id
  label: "xStatus Video Output Monitor [n] MDC Id"
  kind: query
  query_command: "xStatus Video Output Monitor [n] MDC Id"

- id: x_status_video_output_monitor_n_mdc_port
  label: "xStatus Video Output Monitor [n] MDC Port"
  kind: query
  query_command: "xStatus Video Output Monitor [n] MDC Port"

- id: x_status_video_output_monitor_n_model_name
  label: "xStatus Video Output Monitor [n] ModelName"
  kind: query
  query_command: "xStatus Video Output Monitor [n] ModelName"

- id: x_status_video_output_monitor_n_manufacturer
  label: "xStatus Video Output Monitor [n] Manufacturer"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Manufacturer"

- id: x_status_video_output_monitor_n_position
  label: "xStatus Video Output Monitor [n] Position"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Position"

- id: x_status_video_output_monitor_n_manufacturer_id
  label: "xStatus Video Output Monitor [n] ManufacturerId"
  kind: query
  query_command: "xStatus Video Output Monitor [n] ManufacturerId"

- id: x_status_video_output_monitor_n_serial_number
  label: "xStatus Video Output Monitor [n] SerialNumber"
  kind: query
  query_command: "xStatus Video Output Monitor [n] SerialNumber"

- id: x_status_video_output_monitor_n_temperature
  label: "xStatus Video Output Monitor [n] Temperature"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Temperature"

- id: x_status_video_output_webcam_status
  label: "xStatus Video Output Webcam Status"
  kind: query
  query_command: "xStatus Video Output Webcam Status"

- id: x_status_video_output_webcam_mode
  label: "xStatus Video Output Webcam Mode"
  kind: query
  query_command: "xStatus Video Output Webcam Mode"

- id: x_status_video_presentation_pipposition
  label: "xStatus Video Presentation PIPPosition"
  kind: query
  query_command: "xStatus Video Presentation PIPPosition"

- id: x_status_video_selfview_pipposition
  label: "xStatus Video Selfview PIPPosition"
  kind: query
  query_command: "xStatus Video Selfview PIPPosition"

- id: x_status_video_selfview_fullscreen_mode
  label: "xStatus Video Selfview FullscreenMode"
  kind: query
  query_command: "xStatus Video Selfview FullscreenMode"

- id: x_status_video_selfview_mode
  label: "xStatus Video Selfview Mode"
  kind: query
  query_command: "xStatus Video Selfview Mode"

- id: x_status_video_selfview_on_monitor_role
  label: "xStatus Video Selfview OnMonitorRole"
  kind: query
  query_command: "xStatus Video Selfview OnMonitorRole"

- id: x_status_web_engine_chromium_version
  label: "xStatus WebEngine ChromiumVersion"
  kind: query
  query_command: "xStatus WebEngine ChromiumVersion"

- id: x_status_web_engine_features_signage
  label: "xStatus WebEngine Features Signage"
  kind: query
  query_command: "xStatus WebEngine Features Signage"

- id: x_status_web_engine_features_web_engine
  label: "xStatus WebEngine Features WebEngine"
  kind: query
  query_command: "xStatus WebEngine Features WebEngine"

- id: x_status_web_engine_features_web_rtc
  label: "xStatus WebEngine Features WebRTC"
  kind: query
  query_command: "xStatus WebEngine Features WebRTC"

- id: x_status_web_engine_log_level
  label: "xStatus WebEngine LogLevel"
  kind: query
  query_command: "xStatus WebEngine LogLevel"

- id: x_status_web_engine_log_level_verbosity
  label: "xStatus WebEngine LogLevelVerbosity"
  kind: query
  query_command: "xStatus WebEngine LogLevelVerbosity"

- id: x_status_web_engine_restart_reason
  label: "xStatus WebEngine Restart Reason"
  kind: query
  query_command: "xStatus WebEngine Restart Reason"

- id: x_status_web_engine_tracing_duration
  label: "xStatus WebEngine Tracing Duration"
  kind: query
  query_command: "xStatus WebEngine Tracing Duration"

- id: x_status_web_engine_restart_required
  label: "xStatus WebEngine Restart Required"
  kind: query
  query_command: "xStatus WebEngine Restart Required"

- id: x_status_web_engine_tracing_mode
  label: "xStatus WebEngine Tracing Mode"
  kind: query
  query_command: "xStatus WebEngine Tracing Mode"

- id: x_status_web_engine_tracing_custom_categories
  label: "xStatus WebEngine Tracing CustomCategories"
  kind: query
  query_command: "xStatus WebEngine Tracing CustomCategories"

- id: x_status_web_engine_tracing_systrace
  label: "xStatus WebEngine Tracing Systrace"
  kind: query
  query_command: "xStatus WebEngine Tracing Systrace"

- id: x_status_web_rtc_provider_google_meet_availability
  label: "xStatus WebRTC Provider GoogleMeet Availability"
  kind: query
  query_command: "xStatus WebRTC Provider GoogleMeet Availability"

- id: x_status_webex_airgap_status
  label: "xStatus Webex Airgap Status"
  kind: query
  query_command: "xStatus Webex Airgap Status"

- id: x_status_webex_developer_id
  label: "xStatus Webex DeveloperId"
  kind: query
  query_command: "xStatus Webex DeveloperId"

- id: x_status_web_rtc_provider_microsoft_teams_availability
  label: "xStatus WebRTC Provider MicrosoftTeams Availability"
  kind: query
  query_command: "xStatus WebRTC Provider MicrosoftTeams Availability"

- id: x_status_webex_device_personalization_hotdesking_session_status
  label: "xStatus Webex DevicePersonalization Hotdesking SessionStatus"
  kind: query
  query_command: "xStatus Webex DevicePersonalization Hotdesking SessionStatus"

- id: x_status_webex_meetings_instant_meeting_availability
  label: "xStatus Webex Meetings InstantMeeting Availability"
  kind: query
  query_command: "xStatus Webex Meetings InstantMeeting Availability"

- id: x_status_webex_device_personalization_personalized
  label: "xStatus Webex DevicePersonalization Personalized"
  kind: query
  query_command: "xStatus Webex DevicePersonalization Personalized"

- id: x_status_webex_meetings_join_protocol
  label: "xStatus Webex Meetings JoinProtocol"
  kind: query
  query_command: "xStatus Webex Meetings JoinProtocol"

- id: x_status_webex_domain
  label: "xStatus Webex Domain"
  kind: query
  query_command: "xStatus Webex Domain"

- id: x_status_webex_services_provisional_status
  label: "xStatus Webex Services Provisional Status"
  kind: query
  query_command: "xStatus Webex Services Provisional Status"

- id: x_status_webex_services_proximity_guest_token
  label: "xStatus Webex Services Proximity GuestToken"
  kind: query
  query_command: "xStatus Webex Services Proximity GuestToken"

- id: x_status_webex_services_user_presence_status
  label: "xStatus Webex Services UserPresence Status"
  kind: query
  query_command: "xStatus Webex Services UserPresence Status"

- id: x_status_webex_status
  label: "xStatus Webex Status"
  kind: query
  query_command: "xStatus Webex Status"

- id: x_status_webex_services_user_presence_custom_status
  label: "xStatus Webex Services UserPresence CustomStatus"
  kind: query
  query_command: "xStatus Webex Services UserPresence CustomStatus"

- id: x_status_zoom_app_experience_user_signed_in
  label: "xStatus Zoom AppExperience User SignedIn"
  kind: query
  query_command: "xStatus Zoom AppExperience User SignedIn"

- id: x_status_zoom_app_experience_software_version_zoom
  label: "xStatus Zoom AppExperience Software Version Zoom"
  kind: query
  query_command: "xStatus Zoom AppExperience Software Version Zoom"

- id: x_status_zoom_app_experience_state
  label: "xStatus Zoom AppExperience State"
  kind: query
  query_command: "xStatus Zoom AppExperience State"
```

## Variables
```yaml
# UNRESOLVED: the source documents an extensive xConfiguration hierarchy (persistent device
# settings: Audio, Video, Cameras, Network, Standby, SystemUnit, etc.). These are settable
# parameters (Variables) but were NOT enumerated in this draft's deterministic extraction,
# which captured xCommand actions and xStatus statuses only. A follow-up pass should ingest
# the xConfiguration command list (hundreds of entries) as Variables.
variables: []
```

## Events
```yaml
# Unsolicited xEvent notifications the device emits. The source gives these documented
# examples (event category is distinct from xCommand/xStatus; not in the merged sets):
events:
  - id: outgoing_call_indication
    label: Outgoing Call Indication
    description: "Emitted when an outgoing call is about to be dialled. Returns assigned CallId."
    payload_example: '*e OutgoingCallIndication CallId: x'
  - id: call_successful
    label: Call Successful
    description: "Emitted when a call connects (all channels up)."
    payload_example: '*e CallSuccessful CallId: 132 Protocol: "h223" Direction: "outgoing" CallRate: 768 RemoteURI: "h223:integratorHQ@company.com" EncryptionIn: "Off" EncryptionOut: "Off"'
  - id: call_disconnect
    label: Call Disconnect
    description: "Emitted when a call disconnects. Returns CallId and disconnection reason."
    payload_example: '*e CallDisconnect CallId: x CauseValue: 0 CauseString: "" CauseType: LocalDisconnect OrigCallDirection: "outgoing"'
  - id: fecc_action_request
    label: FECC Action Request
    description: "Emitted when far end sends Far-End Camera Control commands."
    payload_example: '*e FeccActionInd Id: 132 Req: 1 Pan: 1 PanRight: 1 Tilt: 0 TiltUp: 0 Zoom: 0 ZoomIn: 0 Focus: 0 FocusIn: 0 Timeout: 300 VideoSrc: 0 m: 0'
  - id: tstring_message_received
    label: TString Message Received
    description: "Emitted when far end sends a TString message."
    payload_example: '*e TString CallId: 132 Message: "ee"'
  - id: sstring_message_received
    label: SString Message Received
    description: "Emitted when far end sends an SString message."
    payload_example: '*e SString String: "ee" Id: 132'
# NOTE: source states these are EXAMPLES ("some of the events available on the API"),
# not an exhaustive list. Enumerate full event set via `xEvent *` on a live device.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly described in source as canned
# sequences. (The device does support a Macro runtime - xCommand Macros * - but those are
# user-authored scripts, not documented fixed sequences.)
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Factory reset / software upgrade / boot commands
# exist but carry no documented safety interlocks in this source.
```

## Notes
**API structure.** All four transports (SSH, HTTP/HTTPS, WebSocket, serial) expose the identical xAPI. Choose by application fit; availability varies by product (serial API access not available on Room 55 Dual / Room 70).

**Command prefixes.** `xConfiguration` (persistent settings), `xCommand` (actions), `xStatus` (current state), `xFeedback` (subscriptions), `xEvent` (event catalogue), `xGetxml` (raw XML by path), `xPreferences` (session output mode).

**Case sensitivity.** All commands are case-insensitive (`XCOMMAND`, `xcommand`, `xCommand` all valid).

**Output modes.** Terminal (line-based, default), XML, or JSON — set per session via `xPreferences outputmode <terminal|xml|json>`.

**Asynchronous.** No guarantee command responses arrive in issue order. Use the `resultId="..."` response-tagging mechanism (`xcommand ... | resultId="tag"`) to match requests to responses. Works with all command types.

**Multiline commands.** Payload sent after the command line, terminated by a line containing only `.`. Max payload 8 MB (exceeding throws ERROR). Used for UI extensions, branding images (base64), macros, banners, certificates.

**Quoting.** Values containing spaces must be quoted (e.g. `xCommand dial number: "my number contains spaces"`).

**Serial baud change.** New baud rate takes effect only after device reboot (`xConfiguration SerialPort BaudRate`). Some device types support a baud range; Room Kit is fixed at 115200.

**Feedback limits.** Up to 50 expressions per serial/SSH session; up to 4 HTTP feedback slots × 15 expressions each. WARNING (source): never `xFeedback register /Status` — excessive feedback can congest the control application. Subscribe only to what is needed.

**HTTP sessions.** Limited concurrent sessions; explicitly close via `POST /xmlapi/session/end`. Device reboot invalidates all sessions. Inactivity timeout: `xConfiguration Security Session InactivityTimeout`.

**Ethernet.** Main network port (port 1) reserved for LAN; cannot traverse between LAN and peripheral ports. Peripheral local network: Cisco peripherals 169.254.1.41–200, non-Cisco 169.254.1.30 / .225–254. Device reachable at 169.254.1.1 (SSH or HTTPS port 443).

**User roles.** ADMIN (most settings, users, calls), USER (calls, limited settings), AUDIT (audit settings/certs), ROOMCONTROL (UI extensions), INTEGRATOR (AV integration + UI extensions).

<!-- UNRESOLVED: full xConfiguration (Variables) catalogue not enumerated in this draft. -->
<!-- UNRESOLVED: full xEvent catalogue not enumerated (only documented examples captured). -->
<!-- UNRESOLVED: device firmware/CE version not stated; SSH port and WebSocket endpoint not explicitly stated. -->
<!-- UNRESOLVED: power/electrical specifications not present in this source. -->
````

## Provenance

```yaml
source_domains:
  - cisco.com
  - ciscolive.com
  - manualslib.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-2602/api-reference-guide-roomos-2602.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce915/collaboration-endpoint-software-api-reference-guide-ce915.pdf
  - https://www.ciscolive.com/c/dam/r/ciscolive/emea/docs/2025/pdf/BRKTRS-3090.pdf
  - https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9300-series-switches/224586-troubleshoot-unknown-protocol-drops-in.html
  - https://www.manualslib.com/manual/687637/Cisco-Catalyst-2960.html
retrieved_at: 2026-05-14T22:56:18.279Z
last_checked_at: 2026-06-25T08:54:13.911Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T08:54:13.911Z
matched_actions: 1240
action_count: 1240
confidence: medium
summary: "deterministic presence proof: 1240/1240 payloads verbatim in source; stratified Sonnet sample corroborated (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware/CE version targeted by this device instance not stated in source. Voltage/current/power specs not in source. Default credentials are deliberately unset (passphrase must be set on first login)."
- "SSH TCP port not explicitly stated in source (default 22 not confirmed)"
- "WebSocket endpoint path/port not explicitly stated (tied to HTTP service)"
- "actual passphrase/credentials not provided in source (must be configured per-device)"
- "the source documents an extensive xConfiguration hierarchy (persistent device"
- "no multi-step macro sequences explicitly described in source as canned"
- "source contains no explicit safety warnings, interlock procedures, or"
- "full xConfiguration (Variables) catalogue not enumerated in this draft."
- "full xEvent catalogue not enumerated (only documented examples captured)."
- "device firmware/CE version not stated; SSH port and WebSocket endpoint not explicitly stated."
- "power/electrical specifications not present in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
