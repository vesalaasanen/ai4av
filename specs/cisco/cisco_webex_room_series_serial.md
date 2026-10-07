---
spec_id: admin/cisco-webex-room-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco Webex Room Series Control Spec"
manufacturer: Cisco
model_family: "Room Kit Mini"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "Room Kit Mini"
    - "Room Kit"
    - "Room 55"
    - "Room 55 Dual"
    - "Room 70"
    - "Room 70 G2"
    - "Room Panorama"
    - "Room 70 Panorama"
    - "Codec Plus"
    - "Codec Pro"
    - "Desk Pro"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - roomos.cisco.com
  - developer.cisco.com
  - cisco.com
source_urls:
  - https://roomos.cisco.com/xapi
  - https://developer.cisco.com/docs/room-os-api/
  - https://www.cisco.com/c/en/us/support/collaboration-endpoints/spark-room-kit-series/products-command-reference-list.html
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce915/collaboration-endpoint-software-api-reference-guide-ce915.pdf
retrieved_at: 2026-09-05T01:53:43.619Z
last_checked_at: 2026-10-01T12:47:44.644Z
generated_at: 2026-10-01T12:47:44.644Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware/CE release compatibility for each model not stated beyond CE9.13 change notes; voltage/power specs not in source; TCP/HTTP port numbers not explicitly stated in source (SSH/Telnet/HTTP enable flags are stated, but no port values given)."
  - "source states enable/disable configuration flags for SSH, Telnet,"
  - "no port numbers stated in source"
  - "full xConfiguration valuespace not enumerated here; see valuespace.xml on device."
  - "no explicit multi-step macro sequences documented in this source excerpt."
  - "no hardware interlock / power-sequencing / fault-recovery procedures in this source excerpt."
  - "TCP port numbers (SSH/Telnet/HTTP/HTTPS) not stated in source."
  - "firmware/CE release compatibility matrix per model not stated beyond CE9.13 change notes."
  - "full xConfiguration valuespace and xStatus document not enumerated in this excerpt."
  - "voltage, current, power, and environmental specs not in source."
verification:
  verdict: verified
  checked_at: 2026-10-01T12:47:44.644Z
  matched_actions: 106
  action_count: 106
  confidence: medium
  summary: "All 106 spec action literals appear as xCommand headings in the source; transport fields resolve to source quotes or are explicitly marked UNRESOLVED. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-09
---

# Cisco Webex Room Series Control Spec

## Summary
The Cisco Webex Room Series is a family of video conferencing room devices (Room Kit, Room 55, Room 70, Codec Plus/Pro, Desk Pro, etc.) running Cisco Collaboration Endpoint (CE) software. This spec covers the device's **xAPI** control interface accessed primarily over **RS-232 serial**, with SSH/Telnet/HTTP/HTTPS/WebSocket also documented as alternative transports exposing the same API. The xAPI is hierarchically organized into four groups: Commands (`xCommand`), Configurations (`xConfiguration`), Status (`xStatus`), and Events (`xEvent`).

<!-- UNRESOLVED: exact firmware/CE release compatibility for each model not stated beyond CE9.13 change notes; voltage/power specs not in source; TCP/HTTP port numbers not explicitly stated in source (SSH/Telnet/HTTP enable flags are stated, but no port values given). -->

## Transport
```yaml
# Source documents five access methods, all exposing the same xAPI:
#   SSH, Telnet, HTTP/HTTPS, WebSocket, and RS-232 serial.
# Per the Known protocol (RS-232C) serial is the primary transport modelled here;
# tcp and http are emitted as additional documented protocols.
protocols:
  - serial
  - tcp
  - http
serial:
  # Baud rate varies by device type (source table). 115200 is the fixed rate for
  # Room Kit Mini / Room Kit / Room 55 / Codec Plus / Desk Pro / SX10, and the
  # default for Codec Pro / Room 70 G2 / Room Panorama / Room 70 Panorama (which
  # also accept 9600/19200/38400/57600).
  baud_rate: 115200  # default for most Room-series models; configurable on Codec Pro / Room 70 G2 / Room Panorama variants
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # Hardware flow control: Off (stated for all rows)
# Connectors vary by model: USB-A + RS-232 adapter (Room Kit Mini, Room Kit,
# Room 55, Codec Plus, Desk Pro, SX10) or COM Euroblock 3-pin / D-SUB 9
# (Codec Pro, Room 70 G2, Room Panorama, SX80, MX700/MX800).
addressing:
  # UNRESOLVED: source states enable/disable configuration flags for SSH, Telnet,
  # HTTP/HTTPS, and WebSocket but does NOT state port numbers. Do not assume 22/23/80/443.
  port: null  # UNRESOLVED: no port numbers stated in source
  base_url: "http://<ip-address>"  # pattern from source URL cheat sheet (host is device-specific)
auth:
  # Serial: password prompting ON by default, configurable via
  #   xConfiguration SerialPort LoginRequired: <Off/On>
  # Default user is 'admin' with no passphrase initially; a passphrase is mandatory
  # to restrict config access. HTTP XMLAPI requires HTTP Basic Access Auth as a user
  # with ADMIN role (or session auth via POST /xmlapi/session/begin).
  type: UNRESOLVED  # source does not state this (was inferred credentials: source describes a login/passphrase procedure (credentials required by default))
```

## Traits
```yaml
# Inferred from documented command groups in source:
- powerable      # inferred: standby / systemunit control described
- queryable      # inferred: xStatus query commands and feedback mechanism described
- routable       # inferred: video/audio input-output routing and source-select commands described
# Note: trait evidence is provisional; deterministic Actions merge carries the per-command detail.
```

## Actions
```yaml
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

- id: x_command_audio_sound_play
  label: "xCommand Audio Sound Play"
  kind: action
  command: "xCommand Audio Sound Play"
  params: []

- id: x_command_audio_speaker_check
  label: "xCommand Audio SpeakerCheck"
  kind: action
  command: "xCommand Audio SpeakerCheck"
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

- id: x_command_audio_volume_decrease
  label: "xCommand Audio Volume Decrease"
  kind: action
  command: "xCommand Audio Volume Decrease"
  params: []

- id: x_command_audio_sounds_and_alerts_ringtone_stop
  label: "xCommand Audio SoundsAndAlerts Ringtone Stop"
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone Stop"
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

- id: x_command_audio_volume_unmute
  label: "xCommand Audio Volume Unmute"
  kind: action
  command: "xCommand Audio Volume Unmute"
  params: []

- id: x_command_audio_volume_toggle_mute
  label: "xCommand Audio Volume ToggleMute"
  kind: action
  command: "xCommand Audio Volume ToggleMute"
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

- id: x_command_audio_vu_meter_stop_all
  label: "xCommand Audio VuMeter StopAll"
  kind: action
  command: "xCommand Audio VuMeter StopAll"
  params: []

- id: x_command_bookings_clear
  label: "xCommand Bookings Clear"
  kind: action
  command: "xCommand Bookings Clear"
  params: []

- id: x_command_bookings_book
  label: "xCommand Bookings Book"
  kind: action
  command: "xCommand Bookings Book"
  params: []

- id: x_command_bookings_delete
  label: "xCommand Bookings Delete"
  kind: action
  command: "xCommand Bookings Delete"
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

- id: x_command_call_accept
  label: "xCommand Call Accept"
  kind: action
  command: "xCommand Call Accept"
  params: []

- id: x_command_call_disconnect
  label: "xCommand Call Disconnect"
  kind: action
  command: "xCommand Call Disconnect"
  params: []

- id: x_command_call_dtmfsend
  label: "xCommand Call DTMFSend"
  kind: action
  command: "xCommand Call DTMFSend"
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

- id: x_command_call_far_end_message_sstring_send
  label: "xCommand Call FarEndMessage SStringSend"
  kind: action
  command: "xCommand Call FarEndMessage SStringSend"
  params: []

- id: x_command_call_far_end_message_tstring_send
  label: "xCommand Call FarEndMessage TStringSend"
  kind: action
  command: "xCommand Call FarEndMessage TStringSend"
  params: []

- id: x_command_call_forward
  label: "xCommand Call Forward"
  kind: action
  command: "xCommand Call Forward"
  params: []

- id: x_command_call_ignore
  label: "xCommand Call Ignore"
  kind: action
  command: "xCommand Call Ignore"
  params: []

- id: x_command_call_hold
  label: "xCommand Call Hold"
  kind: action
  command: "xCommand Call Hold"
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

- id: x_command_call_unattended_transfer
  label: "xCommand Call UnattendedTransfer"
  kind: action
  command: "xCommand Call UnattendedTransfer"
  params: []

- id: x_command_call_resume
  label: "xCommand Call Resume"
  kind: action
  command: "xCommand Call Resume"
  params: []

- id: x_command_call_history_delete_all
  label: "xCommand CallHistory DeleteAll"
  kind: action
  command: "xCommand CallHistory DeleteAll"
  params: []

- id: x_command_call_history_acknowledge_all_missed_calls
  label: "xCommand CallHistory AcknowledgeAllMissedCalls"
  kind: action
  command: "xCommand CallHistory AcknowledgeAllMissedCalls"
  params: []

- id: x_command_call_history_acknowledge_missed_call
  label: "xCommand CallHistory AcknowledgeMissedCall"
  kind: action
  command: "xCommand CallHistory AcknowledgeMissedCall"
  params: []

- id: x_command_call_history_delete_entry
  label: "xCommand CallHistory DeleteEntry"
  kind: action
  command: "xCommand CallHistory DeleteEntry"
  params: []

- id: x_command_call_history_get
  label: "xCommand CallHistory Get"
  kind: action
  command: "xCommand CallHistory Get"
  params: []

- id: x_command_call_history_recents
  label: "xCommand CallHistory Recents"
  kind: action
  command: "xCommand CallHistory Recents"
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

- id: x_command_cameras_background_delete
  label: "xCommand Cameras Background Delete"
  kind: action
  command: "xCommand Cameras Background Delete"
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

- id: x_command_cameras_background_list
  label: "xCommand Cameras Background List"
  kind: action
  command: "xCommand Cameras Background List"
  params: []

- id: x_command_cameras_background_set
  label: "xCommand Cameras Background Set"
  kind: action
  command: "xCommand Cameras Background Set"
  params: []

- id: x_command_cameras_background_upload
  label: "xCommand Cameras Background Upload"
  kind: action
  command: "xCommand Cameras Background Upload"
  params: []

- id: x_command_cameras_presenter_track_clear_position
  label: "xCommand Cameras PresenterTrack ClearPosition"
  kind: action
  command: "xCommand Cameras PresenterTrack ClearPosition"
  params: []

- id: x_command_cameras_presenter_track_set
  label: "xCommand Cameras PresenterTrack Set"
  kind: action
  command: "xCommand Cameras PresenterTrack Set"
  params: []

- id: x_command_cameras_presenter_track_store_position
  label: "xCommand Cameras PresenterTrack StorePosition"
  kind: action
  command: "xCommand Cameras PresenterTrack StorePosition"
  params: []

- id: x_command_cameras_speaker_track_activate
  label: "xCommand Cameras SpeakerTrack Activate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Activate"
  params: []

- id: x_command_cameras_speaker_track_deactivate
  label: "xCommand Cameras SpeakerTrack Deactivate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Deactivate"
  params: []

- id: x_command_cameras_speaker_track_diagnostics_stop
  label: "xCommand Cameras SpeakerTrack Diagnostics Stop"
  kind: action
  command: "xCommand Cameras SpeakerTrack Diagnostics Stop"
  params: []

- id: x_command_cameras_speaker_track_view_limits_activate
  label: "xCommand Cameras SpeakerTrack ViewLimits Activate"
  kind: action
  command: "xCommand Cameras SpeakerTrack ViewLimits Activate"
  params: []

- id: x_command_cameras_speaker_track_diagnostics_start
  label: "xCommand Cameras SpeakerTrack Diagnostics Start"
  kind: action
  command: "xCommand Cameras SpeakerTrack Diagnostics Start"
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

- id: x_command_cameras_speaker_track_whiteboard_align_position
  label: "xCommand Cameras SpeakerTrack Whiteboard AlignPosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard AlignPosition"
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

- id: x_command_cameras_speaker_track_whiteboard_store_position
  label: "xCommand Cameras SpeakerTrack Whiteboard StorePosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard StorePosition"
  params: []

- id: x_command_conference_do_not_disturb_activate
  label: "xCommand Conference DoNotDisturb Activate"
  kind: action
  command: "xCommand Conference DoNotDisturb Activate"
  params: []

- id: x_command_conference_call_authentication_response
  label: "xCommand Conference Call AuthenticationResponse"
  kind: action
  command: "xCommand Conference Call AuthenticationResponse"
  params: []

- id: x_command_conference_do_not_disturb_deactivate
  label: "xCommand Conference DoNotDisturb Deactivate"
  kind: action
  command: "xCommand Conference DoNotDisturb Deactivate"
  params: []

- id: x_command_conference_hand_lower
  label: "xCommand Conference Hand Lower"
  kind: action
  command: "xCommand Conference Hand Lower"
  params: []

- id: x_command_conference_participant_admit
  label: "xCommand Conference Participant Admit"
  kind: action
  command: "xCommand Conference Participant Admit"
  params: []

- id: x_command_conference_hand_raise
  label: "xCommand Conference Hand Raise"
  kind: action
  command: "xCommand Conference Hand Raise"
  params: []

- id: x_command_conference_participant_disconnect
  label: "xCommand Conference Participant Disconnect"
  kind: action
  command: "xCommand Conference Participant Disconnect"
  params: []

- id: x_command_conference_participant_mute
  label: "xCommand Conference Participant Mute"
  kind: action
  command: "xCommand Conference Participant Mute"
  params: []

- id: x_command_conference_participant_list_search
  label: "xCommand Conference ParticipantList Search"
  kind: action
  command: "xCommand Conference ParticipantList Search"
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

- id: x_command_conference_recording_start
  label: "xCommand Conference Recording Start"
  kind: action
  command: "xCommand Conference Recording Start"
  params: []

- id: x_command_conference_speaker_lock_release
  label: "xCommand Conference SpeakerLock Release"
  kind: action
  command: "xCommand Conference SpeakerLock Release"
  params: []

- id: x_command_conference_recording_stop
  label: "xCommand Conference Recording Stop"
  kind: action
  command: "xCommand Conference Recording Stop"
  params: []

- id: x_command_conference_speaker_lock_set
  label: "xCommand Conference SpeakerLock Set"
  kind: action
  command: "xCommand Conference SpeakerLock Set"
  params: []

- id: x_command_conference_transfer_host_and_leave
  label: "xCommand Conference TransferHostAndLeave"
  kind: action
  command: "xCommand Conference TransferHostAndLeave"
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
```

## Feedbacks
```yaml

```

## Variables
```yaml
# xConfiguration tree (persistent device settings, hierarchical). Examples from source:
#   xConfiguration NetworkServices HTTP Mode: <Off, HTTP+HTTPS, HTTPS>
#   xConfiguration NetworkServices SSH Mode: <Off, On>
#   xConfiguration NetworkServices Telnet Mode: <Off, On>
#   xConfiguration NetworkServices WebSocket: <Off, FollowHTTPService>
#   xConfiguration SerialPort Mode: <Off, On>
#   xConfiguration SerialPort BaudRate: <9600/19200/38400/57600/115200>
#   xConfiguration SerialPort LoginRequired: <Off, On>
#   xConfiguration H323 Profile 1 H323Alias ID: "<string>"
# UNRESOLVED: full xConfiguration valuespace not enumerated here; see valuespace.xml on device.
```

## Events
```yaml
# xEvent returns available feedback events. Top-level categories listed via `xEvent`,
# sub-categories via `xEvent <category>`, all via `xEvent *`. Documented event
# examples: OutgoingCallIndication, CallDisconnect, CallSuccessful, FeccActionInd,
# TString, SString. Full event set is device/state dependent.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in this source excerpt.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "New serial baud rate takes effect only after a device reboot."  # stated in source
  - "Initial boot sequence uses 38400 bps regardless of configured baud rate."  # source footnote 6
  - "WebSocket requires HTTP or HTTPS to be enabled first (FollowHTTPService)."  # stated
  - "API sessions (HTTP XMLAPI) are limited and do not time out automatically - explicitly close sessions to avoid exhaustion."  # stated
  - "Do not register xFeedback register /Status - excessive feedback may cause sluggish/unpredictable behavior."  # source WARNING
  - "Serial API access not available for DX70, DX80, Room 55 Dual, and Room 70."  # source footnote 3
# UNRESOLVED: no hardware interlock / power-sequencing / fault-recovery procedures in this source excerpt.
```

## Notes
**API structure.** Four hierarchical groups: `xCommand` (actions), `xConfiguration` (persistent settings), `xStatus` (current state), `xEvent` (events). All commands are case-insensitive. Command arguments are key:value pairs; values containing spaces must be quoted. Value types: integer ranges `<x..y>`, literals `<X/Y/Z>`, strings `<S: x, y>`.

**Output modes.** RS-232/Telnet/SSH sessions support Terminal (line-based, default), XML, or JSON output via `xPreferences outputmode {terminal|xml|json}`.

**Multiline commands.** Payload commands (welcome banners, macros, branding images, certificates, room-control definitions) use:
```
xCommand <path>
<payload>
.
```
A line containing only `.` terminates input. Examples: `xCommand SystemUnit WelcomeBanner Set`.

**Async API + response tagging.** Responses may arrive out of order. Append `| resultId="tag"` to any xcommand/xconfiguration/xstatus to match request↔response.

**HTTP XMLAPI.** URLs: `GET /status.xml`, `/configuration.xml`, `/command.xml`, `/valuespace.xml`, `/getxml?location=<path>`, `POST /putxml`. Auth: HTTP Basic (ADMIN role) or session auth (`POST /xmlapi/session/begin`, returns SessionId cookie).

**Searching.** `//` wildcard within xConfiguration/xStatus/xGetxml paths (e.g. `xconfiguration //out//hdmi`). Source warns against using `//` shortcuts in production apps — use full paths to avoid ambiguity across firmware releases.

**User roles.** ADMIN, USER, AUDIT, ROOMCONTROL, INTEGRATOR. Most xCommands require ADMIN; some require ADMIN+INTEGRATOR or ADMIN+INTEGRATOR+USER (per command in source).

**Connector notes.** Some devices (DX70/DX80, Desk Pro, Room Kit, Room Kit Mini, Room 55) have multiple audio units (loudspeaker/headset/handset); volume commands accept an optional `Device` selector.

<!-- UNRESOLVED: TCP port numbers (SSH/Telnet/HTTP/HTTPS) not stated in source. -->
<!-- UNRESOLVED: firmware/CE release compatibility matrix per model not stated beyond CE9.13 change notes. -->
<!-- UNRESOLVED: full xConfiguration valuespace and xStatus document not enumerated in this excerpt. -->
<!-- UNRESOLVED: voltage, current, power, and environmental specs not in source. -->
````

规格说明已编写完成。`Actions` 函数体已清空（由 106 个确定性 `action ids` 合并）。串行模块已从源参数表中完全填充；`port` 和固件版本标记为 `UNRESOLVED`（源文件中未说明）。后续步骤：如果需要，请填写 `entity_id`，并运行 `ingest drafts.jsonl`。

## Provenance

```yaml
source_domains:
  - roomos.cisco.com
  - developer.cisco.com
  - cisco.com
source_urls:
  - https://roomos.cisco.com/xapi
  - https://developer.cisco.com/docs/room-os-api/
  - https://www.cisco.com/c/en/us/support/collaboration-endpoints/spark-room-kit-series/products-command-reference-list.html
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce915/collaboration-endpoint-software-api-reference-guide-ce915.pdf
retrieved_at: 2026-09-05T01:53:43.619Z
last_checked_at: 2026-10-01T12:47:44.644Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T12:47:44.644Z
matched_actions: 106
action_count: 106
confidence: medium
summary: "All 106 spec action literals appear as xCommand headings in the source; transport fields resolve to source quotes or are explicitly marked UNRESOLVED. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware/CE release compatibility for each model not stated beyond CE9.13 change notes; voltage/power specs not in source; TCP/HTTP port numbers not explicitly stated in source (SSH/Telnet/HTTP enable flags are stated, but no port values given)."
- "source states enable/disable configuration flags for SSH, Telnet,"
- "no port numbers stated in source"
- "full xConfiguration valuespace not enumerated here; see valuespace.xml on device."
- "no explicit multi-step macro sequences documented in this source excerpt."
- "no hardware interlock / power-sequencing / fault-recovery procedures in this source excerpt."
- "TCP port numbers (SSH/Telnet/HTTP/HTTPS) not stated in source."
- "firmware/CE release compatibility matrix per model not stated beyond CE9.13 change notes."
- "full xConfiguration valuespace and xStatus document not enumerated in this excerpt."
- "voltage, current, power, and environmental specs not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
