---
spec_id: admin/cisco-cisco-video-conference
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco TelePresence MX200 G2 and MX300 G2 Video Conference Control Spec"
manufacturer: Cisco
model_family: "Cisco TelePresence MX200 G2"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "Cisco TelePresence MX200 G2"
    - "Cisco TelePresence MX300 G2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce91/mx200g2-mx300g2-api-reference-guide-ce91.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce91/dx70-dx80-api-reference-guide-ce91.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce92/mx200g2-mx300g2-api-reference-guide-ce92.pdf
retrieved_at: 2026-06-01T23:29:55.954Z
last_checked_at: 2026-05-14T18:17:15.020Z
generated_at: 2026-05-14T18:17:15.020Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "port numbers for Telnet/SSH/HTTP/HTTPS not explicitly stated in source (defaults would be 23/22/80/443 but source leaves these open)."
  - "firmware version compatibility range not stated; source examples include CE8.0, CE8.2.0, TC6.0.0.199465."
  - "TCP port (Telnet default 23, SSH default 22) not stated in source"
  - "H.323 call signalling port 1720 and media range 2326-2487 / 5555-6555 stated; SIP default 5060 for TCP/UDP stated"
  - "source mentions \"startup scripts\" containing sequences of xCommand"
  - "baud rate other than 115200/8N1 for serial — source only states 115200 8N1 once, no other rate."
  - "full call-port range for H.323 media (2326-2487, 5555-6555) noted; SIP listen port range not stated."
  - "specific firmware version compatibility range not stated; the source examples include CE6, CE8.0, CE8.2.0, TC6.0.0.199465."
  - "full systemtools admin commands exist (network ping/traceroute, pki, securitysettings, etc.) but are stated to be \"for advanced troubleshooting\" and \"should not be used to program the codec\" — not included above."
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.020Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 77 spec actions matched to source xCommand definitions with correct parameters and transport verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Cisco TelePresence MX200 G2 and MX300 G2 Control Spec

## Summary
Spec covers the Cisco xAPI exposed by Cisco TelePresence MX200 G2 and MX300 G2 codecs. Control surfaces are TCP (Telnet disabled by default, SSH enabled by default), HTTP/HTTPS (XMLAPI), and serial (RS-232 via Micro USB at 115200 8N1). The API exposes four groups: `xCommand`, `xConfiguration`, `xStatus`, and `xEvent`, with line-based (terminal) and XML encoding. All commands are case-insensitive.

<!-- UNRESOLVED: port numbers for Telnet/SSH/HTTP/HTTPS not explicitly stated in source (defaults would be 23/22/80/443 but source leaves these open). -->
<!-- UNRESOLVED: firmware version compatibility range not stated; source examples include CE8.0, CE8.2.0, TC6.0.0.199465. -->

## Transport
```yaml
protocols:
  - tcp
  - http
  - serial
addressing:
  http:
    base_url: "http://<ip-address>/putxml"  # path from source; port not stated
  # UNRESOLVED: TCP port (Telnet default 23, SSH default 22) not stated in source
  # UNRESOLVED: H.323 call signalling port 1720 and media range 2326-2487 / 5555-6555 stated; SIP default 5060 for TCP/UDP stated
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # default user "admin", no password initially; admin password must be set for SSH and HTTP/XMLAPI access
  # HTTP XMLAPI uses HTTP Basic Access Authentication with ADMIN role
```

## Traits
```yaml
- powerable       # inferred from Standby Activate/Deactivate, SystemUnit Boot commands
- routable        # inferred from video input source selection, matrix assign, presentation routing
- queryable       # inferred from xStatus read commands
- levelable       # inferred from Audio Volume Increase/Decrease/Set commands
```

## Actions
```yaml
# === Audio ===
- id: audio_volume_decrease
  label: Decrease volume
  kind: action
  command: "xCommand Audio Volume Decrease [Steps: {Steps}]"
  params:
    - name: Steps
      type: integer
      range: "1..10"
      description: One step equals 0.5 dB decrease
- id: audio_volume_increase
  label: Increase volume
  kind: action
  command: "xCommand Audio Volume Increase [Steps: {Steps}]"
  params:
    - name: Steps
      type: integer
      range: "1..10"
      description: One step equals 0.5 dB increase
- id: audio_volume_set
  label: Set volume level
  kind: action
  command: "xCommand Audio Volume Set Level: {Level}"
  params:
    - name: Level
      type: integer
      range: "0..100"
      description: Default 70 = 0 dB gain; 100 = 15 dB gain
- id: audio_volume_set_to_default
  label: Set volume to default
  kind: action
  command: "xCommand Audio Volume SetToDefault"
  params: []
- id: audio_volume_mute
  label: Mute volume
  kind: action
  command: "xCommand Audio Volume Mute"
  params: []
- id: audio_volume_unmute
  label: Unmute volume
  kind: action
  command: "xCommand Audio Volume Unmute"
  params: []
- id: audio_microphones_mute
  label: Mute microphones
  kind: action
  command: "xCommand Audio Microphones Mute"
  params: []
- id: audio_microphones_unmute
  label: Unmute microphones
  kind: action
  command: "xCommand Audio Microphones Unmute"
  params: []
- id: audio_soundsandalerts_ringtone_list
  label: List available ringtones
  kind: query
  command: "xCommand Audio SoundsAndAlerts Ringtone List"
  params: []
- id: audio_soundsandalerts_ringtone_play
  label: Play ringtone
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone Play RingTone: \"{RingTone}\""
  params:
    - name: RingTone
      type: string
      description: Name of the ringtone
- id: book_audio_default_volume
  label: Audio DefaultVolume
  kind: action
  command: "xConfiguration Audio DefaultVolume: {DefaultVolume}"
  params:
    - name: DefaultVolume
      type: integer
      range: "0..100"
- id: book_audio_ringvolume
  label: Audio SoundsAndAlerts RingVolume
  kind: action
  command: "xConfiguration Audio SoundsAndAlerts RingVolume: {RingVolume}"
  params:
    - name: RingVolume
      type: integer
      range: "0..100"
      description: "Steps of 5 from 0 to 100 (-34.5 dB to 15 dB); 0 = Off"
- id: book_audio_microphone_mode
  label: Audio Input Microphone Mode
  kind: action
  command: "xConfiguration Audio Input Microphone {n} Mode: {Mode}"
  params:
    - name: n
      type: integer
      description: Microphone index
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_audio_internal_speaker_mode
  label: Audio Output InternalSpeaker Mode
  kind: action
  command: "xConfiguration Audio Output InternalSpeaker Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]

# === Bookings ===
- id: bookings_clear
  label: Clear bookings
  kind: action
  command: "xCommand Bookings Clear"
  params: []
- id: bookings_list
  label: List bookings
  kind: query
  command: "xCommand Bookings List [Days: {Days}] [DayOffset: {DayOffset}] [Limit: {Limit}] [Offset: {Offset}]"
  params:
    - name: Days
      type: integer
      range: "1..365"
    - name: DayOffset
      type: integer
      range: "0..365"
    - name: Limit
      type: integer
      range: "1..65534"
    - name: Offset
      type: integer
      range: "0..65534"

# === Call ===
- id: call_dial
  label: Dial out
  kind: action
  command: "xCommand Dial Number: \"{Number}\" [Protocol: {Protocol}] [CallRate: {CallRate}] [CallType: {CallType}] [BookingId: \"{BookingId}\"] [Appearance: {Appearance}] [DisplayName: \"{DisplayName}\"]"
  params:
    - name: Number
      type: string
      description: Number or address
    - name: Protocol
      type: enum
      values: [H320, H323, Sip]
    - name: CallRate
      type: integer
      range: "64..6000"
    - name: CallType
      type: enum
      values: [Audio, Video]
    - name: BookingId
      type: string
    - name: Appearance
      type: integer
      range: "1..999999999"
    - name: DisplayName
      type: string
- id: call_accept
  label: Accept incoming call
  kind: action
  command: "xCommand Call Accept [CallId: {CallId}]"
  params:
    - name: CallId
      type: integer
      range: "0..65534"
- id: call_disconnect
  label: Disconnect call
  kind: action
  command: "xCommand Call Disconnect [CallId: {CallId}]"
  params:
    - name: CallId
      type: integer
      range: "0..65534"
- id: call_reject
  label: Reject incoming call
  kind: action
  command: "xCommand Call Reject [CallId: {CallId}]"
  params:
    - name: CallId
      type: integer
      range: "0..65534"
- id: call_ignore
  label: Ignore incoming call ringtone
  kind: action
  command: "xCommand Call Ignore CallId: {CallId}"
  params:
    - name: CallId
      type: integer
      range: "0..65534"
- id: call_hold
  label: Put call on hold
  kind: action
  command: "xCommand Call Hold [CallId: {CallId}] [Reason: {Reason}]"
  params:
    - name: CallId
      type: integer
      range: "0..65534"
    - name: Reason
      type: enum
      values: [Conference, Transfer, Other]
- id: call_resume
  label: Resume call
  kind: action
  command: "xCommand Call Resume CallId: {CallId}"
  params:
    - name: CallId
      type: integer
      range: "0..65534"
- id: call_join
  label: Join call
  kind: action
  command: "xCommand Call Join CallId: {CallId}"
  params:
    - name: CallId
      type: integer
      range: "0..65534"
- id: call_unattended_transfer
  label: Unattended transfer
  kind: action
  command: "xCommand Call UnattendedTransfer CallId: {CallId} Number: \"{Number}\""
  params:
    - name: CallId
      type: integer
      range: "0..65534"
    - name: Number
      type: string
- id: call_dtmf_send
  label: Send DTMF tones
  kind: action
  command: "xCommand Call DTMFSend [CallId: {CallId}] DTMFString: \"{DTMFString}\""
  params:
    - name: CallId
      type: integer
      range: "0..65534"
    - name: DTMFString
      type: string
      max_len: 32
- id: call_farend_camera_move
  label: Move far end camera
  kind: action
  command: "xCommand Call FarEndControl Camera Move [CallId: {CallId}] Value: {Value}"
  params:
    - name: CallId
      type: integer
      range: "0..65534"
    - name: Value
      type: enum
      values: [Left, Right, Up, Down, ZoomIn, ZoomOut]
- id: call_farend_camera_stop
  label: Stop far end camera
  kind: action
  command: "xCommand Call FarEndControl Camera Stop [CallId: {CallId}]"
  params:
    - name: CallId
      type: integer
      range: "0..65534"
- id: call_farend_source_select
  label: Select far end video source
  kind: action
  command: "xCommand Call FarEndControl Source Select [CallId: {CallId}] SourceId: {SourceId}"
  params:
    - name: CallId
      type: integer
      range: "0..65534"
    - name: SourceId
      type: integer
      range: "0..15"
- id: call_farend_roompreset_activate
  label: Activate far end room preset
  kind: action
  command: "xCommand Call FarEndControl RoomPreset Activate [CallId: {CallId}] PresetId: {PresetId}"
  params:
    - name: CallId
      type: integer
      range: "0..65534"
    - name: PresetId
      type: integer
      range: "1..15"

# === CallHistory ===
- id: callhistory_get
  label: Get call history
  kind: query
  command: "xCommand CallHistory Get [Filter: {Filter}] [Offset: {Offset}] [Limit: {Limit}] [DetailLevel: {DetailLevel}] [SearchString: \"{SearchString}\"] [CallHistoryId: {CallHistoryId}]"
  params:
    - name: Filter
      type: enum
      values: [All, Missed, AnsweredElsewhere, Forwarded, Placed, NoAnswer, Received, Rejected, UnacknowledgedMissed]
    - name: Offset
      type: integer
      range: "0..65534"
    - name: Limit
      type: integer
      range: "0..65534"
    - name: DetailLevel
      type: enum
      values: [Basic, Full]
    - name: SearchString
      type: string
    - name: CallHistoryId
      type: integer
      range: "0..65534"
- id: callhistory_recents
  label: Get recent calls
  kind: query
  command: "xCommand CallHistory Recents [Filter: {Filter}] [Offset: {Offset}] [Limit: {Limit}] [DetailLevel: {DetailLevel}] [SearchString: \"{SearchString}\"] [CallHistoryId: {CallHistoryId}] [Order: {Order}]"
  params:
    - name: Order
      type: enum
      values: [OccurrenceTime, OccurrenceFrequency]
- id: callhistory_delete_entry
  label: Delete call history entry
  kind: action
  command: "xCommand CallHistory DeleteEntry CallHistoryId: {CallHistoryId} [AcknowledgeConsecutiveDuplicates: {Ack}]"
  params:
    - name: CallHistoryId
      type: integer
    - name: Ack
      type: enum
      values: [False, True]
- id: callhistory_delete_all
  label: Delete all call history
  kind: action
  command: "xCommand CallHistory DeleteAll [Filter: {Filter}]"
  params:
    - name: Filter
      type: enum
      values: [All, Missed, Placed, Received]
- id: callhistory_acknowledge_missed
  label: Acknowledge missed call
  kind: action
  command: "xCommand CallHistory AcknowledgeMissedCall CallHistoryId: {CallHistoryId} [AcknowledgeConsecutiveDuplicates: {Ack}]"
  params:
    - name: CallHistoryId
      type: integer
    - name: Ack
      type: enum
      values: [False, True]
- id: callhistory_acknowledge_all_missed
  label: Acknowledge all missed calls
  kind: action
  command: "xCommand CallHistory AcknowledgeAllMissedCalls"
  params: []

# === Camera ===
- id: camera_position_reset
  label: Reset camera position
  kind: action
  command: "xCommand Camera PositionReset [Axis: {Axis}] CameraId: {CameraId}"
  params:
    - name: Axis
      type: enum
      values: [All, Focus, PanTilt, Zoom]
    - name: CameraId
      type: integer
      range: "1..1"
- id: camera_trigger_autofocus
  label: Trigger autofocus
  kind: action
  command: "xCommand Camera TriggerAutofocus CameraId: {CameraId}"
  params:
    - name: CameraId
      type: integer
      range: "1..1"
- id: camera_ramp
  label: Ramp camera
  kind: action
  command: "xCommand Camera Ramp CameraId: {CameraId} [Pan: {Pan}] [PanSpeed: {PanSpeed}] [Tilt: {Tilt}] [TiltSpeed: {TiltSpeed}] [Zoom: {Zoom}] [ZoomSpeed: {ZoomSpeed}] [Focus: Focus]"
  params:
    - name: CameraId
      type: integer
      range: "1..1"
    - name: Pan
      type: enum
      values: [Left, Right, Stop]
    - name: PanSpeed
      type: integer
      range: "1..15"
    - name: Tilt
      type: enum
      values: [Down, Up, Stop]
    - name: TiltSpeed
      type: integer
      range: "1..15"
    - name: Zoom
      type: enum
      values: [In, Out, Stop]
    - name: ZoomSpeed
      type: integer
      range: "1..15"
    - name: Focus
      type: enum
      values: [Far, Near, Stop]
- id: camera_preset_activate
  label: Activate camera preset
  kind: action
  command: "xCommand Camera Preset Activate PresetId: {PresetId}"
  params:
    - name: PresetId
      type: integer
      range: "1..35"
- id: camera_preset_activate_default
  label: Activate camera default preset
  kind: action
  command: "xCommand Camera Preset ActivateDefaultPosition [CameraId: {CameraId}]"
  params:
    - name: CameraId
      type: integer
      range: "1..1"
- id: camera_preset_store
  label: Store camera preset
  kind: action
  command: "xCommand Camera Preset Store [PresetId: {PresetId}] CameraId: {CameraId} [ListPosition: {ListPosition}] [Name: \"{Name}\"] [TakeSnapshot: {TakeSnapshot}] [DefaultProsition: {DefaultProsition}]"
  params:
    - name: PresetId
      type: integer
      range: "1..35"
    - name: CameraId
      type: integer
      range: "1..1"
    - name: ListPosition
      type: integer
      range: "1..35"
    - name: Name
      type: string
    - name: TakeSnapshot
      type: enum
      values: [False, True]
    - name: DefaultProsition
      type: enum
      values: [False, True]
- id: camera_preset_edit
  label: Edit camera preset
  kind: action
  command: "xCommand Camera Preset Edit PresetId: {PresetId} [ListPosition: {ListPosition}] [Name: \"{Name}\"] [DefaultProsition: {DefaultProsition}]"
  params:
    - name: PresetId
      type: integer
      range: "1..35"
- id: camera_preset_remove
  label: Remove camera preset
  kind: action
  command: "xCommand Camera Preset Remove PresetId: {PresetId}"
  params:
    - name: PresetId
      type: integer
      range: "1..35"
- id: camera_preset_list
  label: List camera presets
  kind: query
  command: "xCommand Camera Preset List CameraId: {CameraId} [DefaultPosition: {DefaultPosition}]"
  params:
    - name: CameraId
      type: integer
      range: "1..1"
    - name: DefaultPosition
      type: enum
      values: [False, True]
- id: camera_preset_show
  label: Show camera preset
  kind: query
  command: "xCommand Camera Preset Show PresetId: {PresetId}"
  params:
    - name: PresetId
      type: integer
      range: "1..35"
- id: book_cameras_backlight
  label: Cameras Camera Backlight DefaultMode
  kind: action
  command: "xConfiguration Cameras Camera {n} Backlight DefaultMode: {DefaultMode}"
  params:
    - name: n
      type: integer
    - name: DefaultMode
      type: enum
      values: [Off, On]
- id: book_cameras_brightness_mode
  label: Cameras Camera Brightness Mode
  kind: action
  command: "xConfiguration Cameras Camera {n} Brightness Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Auto, Manual]
- id: book_cameras_brightness_level
  label: Cameras Camera Brightness DefaultLevel
  kind: action
  command: "xConfiguration Cameras Camera {n} Brightness DefaultLevel: {DefaultLevel}"
  params:
    - name: DefaultLevel
      type: integer
      range: "1..31"
- id: book_cameras_focus_mode
  label: Cameras Camera Focus Mode
  kind: action
  command: "xConfiguration Cameras Camera {n} Focus Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Auto, Manual]
- id: book_cameras_gamma_mode
  label: Cameras Camera Gamma Mode
  kind: action
  command: "xConfiguration Cameras Camera {n} Gamma Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Auto, Manual]
- id: book_cameras_gamma_level
  label: Cameras Camera Gamma Level
  kind: action
  command: "xConfiguration Cameras Camera {n} Gamma Level: {Level}"
  params:
    - name: Level
      type: integer
      range: "0..7"
- id: book_cameras_mirror
  label: Cameras Camera Mirror
  kind: action
  command: "xConfiguration Cameras Camera {n} Mirror: {Mirror}"
  params:
    - name: Mirror
      type: enum
      values: [Off, On]
- id: book_cameras_whitebalance_mode
  label: Cameras Camera Whitebalance Mode
  kind: action
  command: "xConfiguration Cameras Camera {n} Whitebalance Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Auto, Manual]
- id: book_cameras_whitebalance_level
  label: Cameras Camera Whitebalance Level
  kind: action
  command: "xConfiguration Cameras Camera {n} Whitebalance Level: {Level}"
  params:
    - name: Level
      type: integer
      range: "1..16"
- id: book_cameras_preset_trigger_autofocus
  label: Cameras Preset TriggerAutofocus
  kind: action
  command: "xConfiguration Cameras Preset TriggerAutofocus: {TriggerAutofocus}"
  params:
    - name: TriggerAutofocus
      type: enum
      values: [Auto, Off, On]

# === Conference ===
- id: conference_donotdisturb_activate
  label: Activate Do Not Disturb
  kind: action
  command: "xCommand Conference DoNotDisturb Activate [Timeout: {Timeout}]"
  params:
    - name: Timeout
      type: integer
      range: "0..1440"
      description: Minutes until DND auto-deactivates; default 1440 (24h)
- id: conference_donotdisturb_deactivate
  label: Deactivate Do Not Disturb
  kind: action
  command: "xCommand Conference DoNotDisturb Deactivate"
  params: []
- id: conference_speakerlock_set
  label: Lock speaker
  kind: action
  command: "xCommand Conference SpeakerLock Set Target: {Target} [CallId: {CallId}]"
  params:
    - name: Target
      type: enum
      values: [local, remote]
    - name: CallId
      type: integer
      range: "0..65534"
- id: conference_speakerlock_release
  label: Release speaker lock
  kind: action
  command: "xCommand Conference SpeakerLock Release"
  params: []
- id: book_conference_autoanswer_mode
  label: Conference AutoAnswer Mode
  kind: action
  command: "xConfiguration Conference AutoAnswer Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_conference_autoanswer_delay
  label: Conference AutoAnswer Delay
  kind: action
  command: "xConfiguration Conference AutoAnswer Delay: {Delay}"
  params:
    - name: Delay
      type: integer
      range: "0..50"
- id: book_conference_autoanswer_mute
  label: Conference AutoAnswer Mute
  kind: action
  command: "xConfiguration Conference AutoAnswer Mute: {Mute}"
  params:
    - name: Mute
      type: enum
      values: [Off, On]
- id: book_conference_defaultcall_protocol
  label: Conference DefaultCall Protocol
  kind: action
  command: "xConfiguration Conference DefaultCall Protocol: {Protocol}"
  params:
    - name: Protocol
      type: enum
      values: [Auto, H323, Sip, H320]
- id: book_conference_defaultcall_rate
  label: Conference DefaultCall Rate
  kind: action
  command: "xConfiguration Conference DefaultCall Rate: {Rate}"
  params:
    - name: Rate
      type: integer
      range: "64..6000"
- id: book_conference_encryption_mode
  label: Conference Encryption Mode
  kind: action
  command: "xConfiguration Conference Encryption Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On, BestEffort]
- id: book_conference_donotdisturb_timeout
  label: Conference DoNotDisturb DefaultTimeout
  kind: action
  command: "xConfiguration Conference DoNotDisturb DefaultTimeout: {DefaultTimeout}"
  params:
    - name: DefaultTimeout
      type: integer
      range: "0..1440"
- id: book_conference_farendcontrol_mode
  label: Conference FarEndControl Mode
  kind: action
  command: "xConfiguration Conference FarEndControl Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_conference_max_receive_callrate
  label: Conference MaxReceiveCallRate
  kind: action
  command: "xConfiguration Conference MaxReceiveCallRate: {MaxReceiveCallRate}"
  params:
    - name: MaxReceiveCallRate
      type: integer
      range: "64..6000"
- id: book_conference_max_transmit_callrate
  label: Conference MaxTransmitCallRate
  kind: action
  command: "xConfiguration Conference MaxTransmitCallRate: {MaxTransmitCallRate}"
  params:
    - name: MaxTransmitCallRate
      type: integer
      range: "64..6000"
- id: book_conference_max_total_receive
  label: Conference MaxTotalReceiveCallRate
  kind: action
  command: "xConfiguration Conference MaxTotalReceiveCallRate: {MaxTotalReceiveCallRate}"
  params:
    - name: MaxTotalReceiveCallRate
      type: integer
      range: "64..10000"
- id: book_conference_max_total_transmit
  label: Conference MaxTotalTransmitCallRate
  kind: action
  command: "xConfiguration Conference MaxTotalTransmitCallRate: {MaxTotalTransmitCallRate}"
  params:
    - name: MaxTotalTransmitCallRate
      type: integer
      range: "64..10000"
- id: book_conference_multistream_mode
  label: Conference MultiStream Mode
  kind: action
  command: "xConfiguration Conference MultiStream Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Auto, Off]

# === Diagnostics ===
- id: diagnostics_run
  label: Run self-diagnostics
  kind: action
  command: "xCommand Diagnostics Run [ResultSet: {ResultSet}]"
  params:
    - name: ResultSet
      type: enum
      values: [Alerts, All, None]

# === H323 ===
- id: book_h323_authentication_mode
  label: H323 Authentication Mode
  kind: action
  command: "xConfiguration H323 Authentication Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_h323_authentication_loginname
  label: H323 Authentication LoginName
  kind: action
  command: "xConfiguration H323 Authentication LoginName: \"{LoginName}\""
  params:
    - name: LoginName
      type: string
- id: book_h323_authentication_password
  label: H323 Authentication Password
  kind: action
  command: "xConfiguration H323 Authentication Password: \"{Password}\""
  params:
    - name: Password
      type: string
- id: book_h323_callsetup_mode
  label: H323 CallSetup Mode
  kind: action
  command: "xConfiguration H323 CallSetup Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Direct, Gatekeeper]
- id: book_h323_encryption_keysize
  label: H323 Encryption KeySize
  kind: action
  command: "xConfiguration H323 Encryption KeySize: {KeySize}"
  params:
    - name: KeySize
      type: enum
      values: [Min1024bit, Max1024bit, Min2048bit]
- id: book_h323_gatekeeper_address
  label: H323 Gatekeeper Address
  kind: action
  command: "xConfiguration H323 Gatekeeper Address: \"{Address}\""
  params:
    - name: Address
      type: string
- id: book_h323_alias_e164
  label: H323 H323Alias E164
  kind: action
  command: "xConfiguration H323 H323Alias E164: \"{E164}\""
  params:
    - name: E164
      type: string
- id: book_h323_alias_id
  label: H323 H323Alias ID
  kind: action
  command: "xConfiguration H323 H323Alias ID: \"{ID}\""
  params:
    - name: ID
      type: string
- id: book_h323_nat_mode
  label: H323 NAT Mode
  kind: action
  command: "xConfiguration H323 NAT Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Auto, Off, On]
- id: book_h323_nat_address
  label: H323 NAT Address
  kind: action
  command: "xConfiguration H323 NAT Address: \"{Address}\""
  params:
    - name: Address
      type: string
- id: book_networkservices_h323_mode
  label: NetworkServices H323 Mode
  kind: action
  command: "xConfiguration NetworkServices H323 Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]

# === HttpFeedback ===
- id: httpfeedback_register
  label: Register HTTP feedback
  kind: action
  command: "xCommand HttpFeedback Register [FeedbackSlot: {FeedbackSlot}] ServerUrl: \"{ServerUrl}\" [Expression[1..15]: \"{Expression[1..15]}\"]"
  params:
    - name: FeedbackSlot
      type: integer
      range: "1..4"
    - name: ServerUrl
      type: string
    - name: Expression
      type: string
      description: XPath expression (1..15 entries)
- id: httpfeedback_deregister
  label: Deregister HTTP feedback
  kind: action
  command: "xCommand HttpFeedback Deregister FeedbackSlot: {FeedbackSlot}"
  params:
    - name: FeedbackSlot
      type: integer
      range: "1..4"

# === Network ===
- id: book_network_dns_domain
  label: Network DNS Domain Name
  kind: action
  command: "xConfiguration Network {n} DNS Domain Name: \"{Name}\""
  params:
    - name: n
      type: integer
      range: "1..1"
    - name: Name
      type: string
- id: book_network_dns_server_address
  label: Network DNS Server Address
  kind: action
  command: "xConfiguration Network {n} DNS Server {m} Address: \"{Address}\""
  params:
    - name: n
      type: integer
      range: "1..1"
    - name: m
      type: integer
      range: "1..3"
    - name: Address
      type: string
- id: book_network_ieee8021x_mode
  label: Network IEEE8021X Mode
  kind: action
  command: "xConfiguration Network {n} IEEE8021X Mode: {Mode}"
  params:
    - name: n
      type: integer
      range: "1..1"
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_network_ieee8021x_identity
  label: Network IEEE8021X Identity
  kind: action
  command: "xConfiguration Network {n} IEEE8021X Identity: \"{Identity}\""
  params:
    - name: Identity
      type: string
- id: book_network_ieee8021x_password
  label: Network IEEE8021X Password
  kind: action
  command: "xConfiguration Network {n} IEEE8021X Password: \"{Password}\""
  params:
    - name: Password
      type: string
- id: book_network_ipstack
  label: Network IPStack
  kind: action
  command: "xConfiguration Network {n} IPStack: {IPStack}"
  params:
    - name: IPStack
      type: enum
      values: [Dual, IPv4, IPv6]
- id: book_network_ipv4_assignment
  label: Network IPv4 Assignment
  kind: action
  command: "xConfiguration Network {n} IPv4 Assignment: {Assignment}"
  params:
    - name: Assignment
      type: enum
      values: [Static, DHCP]
- id: book_network_ipv4_address
  label: Network IPv4 Address
  kind: action
  command: "xConfiguration Network {n} IPv4 Address: \"{Address}\""
  params:
    - name: Address
      type: string
- id: book_network_ipv4_gateway
  label: Network IPv4 Gateway
  kind: action
  command: "xConfiguration Network {n} IPv4 Gateway: \"{Gateway}\""
  params:
    - name: Gateway
      type: string
- id: book_network_ipv4_subnetmask
  label: Network IPv4 SubnetMask
  kind: action
  command: "xConfiguration Network {n} IPv4 SubnetMask: \"{SubnetMask}\""
  params:
    - name: SubnetMask
      type: string
- id: book_network_ipv6_assignment
  label: Network IPv6 Assignment
  kind: action
  command: "xConfiguration Network {n} IPv6 Assignment: {Assignment}"
  params:
    - name: Assignment
      type: enum
      values: [Static, DHCPv6, Autoconf]
- id: book_network_mtu
  label: Network MTU
  kind: action
  command: "xConfiguration Network {n} MTU: {MTU}"
  params:
    - name: MTU
      type: integer
      range: "576..1500"
- id: book_network_qos_mode
  label: Network QoS Mode
  kind: action
  command: "xConfiguration Network {n} QoS Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, Diffserv]
- id: book_network_qos_diffserv_audio
  label: Network QoS Diffserv Audio
  kind: action
  command: "xConfiguration Network {n} QoS Diffserv Audio: {Audio}"
  params:
    - name: Audio
      type: integer
      range: "0..63"
- id: book_network_qos_diffserv_video
  label: Network QoS Diffserv Video
  kind: action
  command: "xConfiguration Network {n} QoS Diffserv Video: {Video}"
  params:
    - name: Video
      type: integer
      range: "0..63"
- id: book_network_qos_diffserv_data
  label: Network QoS Diffserv Data
  kind: action
  command: "xConfiguration Network {n} QoS Diffserv Data: {Data}"
  params:
    - name: Data
      type: integer
      range: "0..63"
- id: book_network_qos_diffserv_signalling
  label: Network QoS Diffserv Signalling
  kind: action
  command: "xConfiguration Network {n} QoS Diffserv Signalling: {Signalling}"
  params:
    - name: Signalling
      type: integer
      range: "0..63"
- id: book_network_speed
  label: Network Speed
  kind: action
  command: "xConfiguration Network {n} Speed: {Speed}"
  params:
    - name: Speed
      type: enum
      values: [Auto, "10half", "10full", "100half", "100full", "1000full"]
- id: book_network_vlan_voice_mode
  label: Network VLAN Voice Mode
  kind: action
  command: "xConfiguration Network {n} VLAN Voice Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Auto, Manual, Off]
- id: book_network_vlan_voice_vlanid
  label: Network VLAN Voice VlanId
  kind: action
  command: "xConfiguration Network {n} VLAN Voice VlanId: {VlanId}"
  params:
    - name: VlanId
      type: integer
      range: "1..4094"
- id: book_network_remoteaccess_allow
  label: Network RemoteAccess Allow
  kind: action
  command: "xConfiguration Network {n} RemoteAccess Allow: \"{Allow}\""
  params:
    - name: Allow
      type: string

# === NetworkServices ===
- id: book_networkservices_cdp_mode
  label: NetworkServices CDP Mode
  kind: action
  command: "xConfiguration NetworkServices CDP Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_networkservices_http_mode
  label: NetworkServices HTTP Mode
  kind: action
  command: "xConfiguration NetworkServices HTTP Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, "HTTP+HTTPS", HTTPS]
- id: book_networkservices_https_mode
  label: NetworkServices HTTPS Mode
  kind: action
  command: "xConfiguration NetworkServices HTTPS Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_networkservices_telnet_mode
  label: NetworkServices Telnet Mode
  kind: action
  command: "xConfiguration NetworkServices Telnet Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_networkservices_ssh_mode
  label: NetworkServices SSH Mode
  kind: action
  command: "xConfiguration NetworkServices SSH Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_networkservices_sip_mode
  label: NetworkServices SIP Mode
  kind: action
  command: "xConfiguration NetworkServices SIP Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_networkservices_ntp_mode
  label: NetworkServices NTP Mode
  kind: action
  command: "xConfiguration NetworkServices NTP Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Auto, Manual, Off]
- id: book_networkservices_ntp_server
  label: NetworkServices NTP Server Address
  kind: action
  command: "xConfiguration NetworkServices NTP Server {n} Address: \"{Address}\""
  params:
    - name: n
      type: integer
      range: "1..3"
    - name: Address
      type: string
- id: book_networkservices_snmp_mode
  label: NetworkServices SNMP Mode
  kind: action
  command: "xConfiguration NetworkServices SNMP Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, ReadOnly, ReadWrite]
- id: book_networkservices_snmp_host
  label: NetworkServices SNMP Host Address
  kind: action
  command: "xConfiguration NetworkServices SNMP Host {n} Address: \"{Address}\""
  params:
    - name: n
      type: integer
      range: "1..3"
    - name: Address
      type: string
- id: book_networkservices_snmp_community
  label: NetworkServices SNMP CommunityName
  kind: action
  command: "xConfiguration NetworkServices SNMP CommunityName: \"{CommunityName}\""
  params:
    - name: CommunityName
      type: string
- id: book_networkservices_welcometext
  label: NetworkServices WelcomeText
  kind: action
  command: "xConfiguration NetworkServices WelcomeText: {WelcomeText}"
  params:
    - name: WelcomeText
      type: enum
      values: [Off, On]

# === Peripherals ===
- id: peripherals_connect
  label: Connect peripheral
  kind: action
  command: "xCommand Peripherals Connect [HardwareInfo: \"{HardwareInfo}\"] ID: \"{ID}\" [Name: \"{Name}\"] [NetworkAddress: \"{NetworkAddress}\"] [SerialNumber: \"{SerialNumber}\"] [SoftwareInfo: \"{SoftwareInfo}\"] Type: {Type}"
  params:
    - name: HardwareInfo
      type: string
    - name: ID
      type: string
      description: Typically a MAC address
    - name: Name
      type: string
    - name: NetworkAddress
      type: string
    - name: SerialNumber
      type: string
    - name: SoftwareInfo
      type: string
    - name: Type
      type: enum
      values: [Byod, ControlSystem, Other, TouchPanel]
- id: peripherals_heartbeat
  label: Peripheral heartbeat
  kind: action
  command: "xCommand Peripherals HeartBeat ID: \"{ID}\" [Timeout: {Timeout}]"
  params:
    - name: ID
      type: string
    - name: Timeout
      type: integer
      range: "1..65535"
- id: peripherals_list
  label: List peripherals
  kind: query
  command: "xCommand Peripherals List [Connected: {Connected}] [Type: {Type}]"
  params:
    - name: Connected
      type: enum
      values: [False, True]
    - name: Type
      type: enum
      values: [All, ControlSystem, ISDNLink, Other, TouchPanel]
- id: peripherals_pairing_discovery_start
  label: Start peripheral discovery
  kind: action
  command: "xCommand Peripherals Pairing DeviceDiscovery Start [AutoPairing: {AutoPairing}] [DeviceType: {DeviceType}] [Timeout: {Timeout}]"
  params:
    - name: AutoPairing
      type: enum
      values: [On, Off]
    - name: DeviceType
      type: enum
      values: [ISDNLink]
    - name: Timeout
      type: integer
      range: "3..60"
- id: peripherals_pairing_pair
  label: Pair peripheral
  kind: action
  command: "xCommand Peripherals Pairing Pair MacAddress: \"{MacAddress}\""
  params:
    - name: MacAddress
      type: string
- id: peripherals_pairing_unpair
  label: Unpair peripheral
  kind: action
  command: "xCommand Peripherals Pairing Unpair MacAddress: \"{MacAddress}\""
  params:
    - name: MacAddress
      type: string
- id: peripherals_purge
  label: Purge peripheral
  kind: action
  command: "xCommand Peripherals Purge ID: \"{ID}\""
  params:
    - name: ID
      type: string
      description: MAC address
- id: book_peripherals_touchpanels
  label: Peripherals Profile TouchPanels
  kind: action
  command: "xConfiguration Peripherals Profile TouchPanels: {TouchPanels}"
  params:
    - name: TouchPanels
      type: enum
      values: [NotSet, Minimum1, "0", "1", "2", "3", "4", "5"]

# === Phonebook ===
- id: phonebook_search
  label: Search phonebook
  kind: query
  command: "xCommand Phonebook Search [PhonebookId: \"{PhonebookId}\"] [PhonebookType: {PhonebookType}] [SearchString: \"{SearchString}\"] [SearchField: {SearchField}] [Offset: {Offset}] [FolderId: \"{FolderId}\"] [Limit: {Limit}] [Recursive: {Recursive}] [ContactType: {ContactType}] [Tag: {Tag}]"
  params:
    - name: PhonebookType
      type: enum
      values: [Corporate, Local]
    - name: SearchField
      type: enum
      values: [Name, Number]
    - name: Recursive
      type: enum
      values: [False, True]
    - name: ContactType
      type: enum
      values: [Any, Folder, Contact]
    - name: Tag
      type: enum
      values: [Untagged, Favorite]
- id: phonebook_contact_add
  label: Add contact
  kind: action
  command: "xCommand Phonebook Contact Add Name: \"{Name}\" [FolderId: \"{FolderId}\"] [ImageURL: \"{ImageURL}\"] [Title: \"{Title}\"] [Number: \"{Number}\"] [Protocol: {Protocol}] [CallRate: {CallRate}] [CallType: {CallType}] [Device: {Device}] [Tag: {Tag}]"
  params:
    - name: Name
      type: string
    - name: Number
      type: string
    - name: Protocol
      type: enum
      values: [Auto, H320, H323, SIP]
    - name: CallRate
      type: integer
      range: "0..6000"
    - name: CallType
      type: enum
      values: [Audio, Video]
    - name: Device
      type: enum
      values: [Mobile, Other, Telephone, Video]
    - name: Tag
      type: enum
      values: [Untagged, Favorite]
- id: phonebook_contact_modify
  label: Modify contact
  kind: action
  command: "xCommand Phonebook Contact Modify ContactId: \"{ContactId}\" [Name: \"{Name}\"] [FolderId: \"{FolderId}\"] [ImageURL: \"{ImageURL}\"] [Title: \"{Title}\"] [Tag: {Tag}]"
  params:
    - name: ContactId
      type: string
- id: phonebook_contact_delete
  label: Delete contact
  kind: action
  command: "xCommand Phonebook Contact Delete ContactId: \"{ContactId}\""
  params:
    - name: ContactId
      type: string
- id: phonebook_contactmethod_add
  label: Add contact method
  kind: action
  command: "xCommand Phonebook ContactMethod Add ContactId: \"{ContactId}\" [Device: {Device}] Number: \"{Number}\" [Protocol: {Protocol}] [CallRate: {CallRate}] [CallType: {CallType}]"
  params:
    - name: ContactId
      type: string
    - name: Number
      type: string
- id: phonebook_contactmethod_modify
  label: Modify contact method
  kind: action
  command: "xCommand Phonebook ContactMethod Modify ContactId: \"{ContactId}\" ContactMethodId: \"{ContactMethodId}\" [Device: {Device}] [Number: \"{Number}\"] [Protocol: {Protocol}] [CallRate: {CallRate}] [CallType: {CallType}]"
  params:
    - name: ContactId
      type: string
    - name: ContactMethodId
      type: string
- id: phonebook_contactmethod_delete
  label: Delete contact method
  kind: action
  command: "xCommand Phonebook ContactMethod Delete ContactId: \"{ContactId}\" ContactMethodId: \"{ContactMethodId}\""
  params:
    - name: ContactId
      type: string
    - name: ContactMethodId
      type: string
- id: phonebook_folder_add
  label: Add folder
  kind: action
  command: "xCommand Phonebook Folder Add Name: \"{Name}\" [ParentFolderId: \"{ParentFolderId}\"]"
  params:
    - name: Name
      type: string
- id: phonebook_folder_modify
  label: Modify folder
  kind: action
  command: "xCommand Phonebook Folder Modify FolderId: \"{FolderId}\" [Name: \"{Name}\"] [ParentFolderId: \"{ParentFolderId}\"]"
  params:
    - name: FolderId
      type: string
- id: phonebook_folder_delete
  label: Delete folder
  kind: action
  command: "xCommand Phonebook Folder Delete FolderId: \"{FolderId}\""
  params:
    - name: FolderId
      type: string
- id: book_phonebook_server_url
  label: Phonebook Server URL
  kind: action
  command: "xConfiguration Phonebook Server {n} URL: \"{URL}\""
  params:
    - name: n
      type: integer
    - name: URL
      type: string
- id: book_phonebook_server_id
  label: Phonebook Server ID
  kind: action
  command: "xConfiguration Phonebook Server {n} ID: \"{ID}\""
  params:
    - name: n
      type: integer
    - name: ID
      type: string
- id: book_phonebook_server_type
  label: Phonebook Server Type
  kind: action
  command: "xConfiguration Phonebook Server {n} Type: {Type}"
  params:
    - name: n
      type: integer
    - name: Type
      type: enum
      values: [Off, VCS, TMS, CUCM]

# === Presentation ===
- id: presentation_start
  label: Start presentation
  kind: action
  command: "xCommand Presentation Start [PresentationSource: {PresentationSource}] [SendingMode: {SendingMode}] [ConnectorId: {ConnectorId}] [Instance: {Instance}]"
  params:
    - name: PresentationSource
      type: integer
      range: "1..2"
    - name: SendingMode
      type: enum
      values: [LocalRemote, LocalOnly]
    - name: ConnectorId
      type: integer
      range: "2..4"
    - name: Instance
      type: enum
      values: [New, "1", "2", "3", "4", "5", "6"]
- id: presentation_stop
  label: Stop presentation
  kind: action
  command: "xCommand Presentation Stop [Instance: {Instance}] [PresentationSource: {PresentationSource}]"
  params:
    - name: Instance
      type: enum
      values: ["1", "2", "3", "4", "5", "6"]
    - name: PresentationSource
      type: integer
      range: "1..2"
- id: book_video_default_main_source
  label: Video DefaultMainSource
  kind: action
  command: "xConfiguration Video DefaultMainSource: {DefaultMainSource}"
  params:
    - name: DefaultMainSource
      type: integer
      range: "1..3"
- id: book_video_presentation_default_source
  label: Video Presentation DefaultSource
  kind: action
  command: "xConfiguration Video Presentation DefaultSource: {DefaultSource}"
  params:
    - name: DefaultSource
      type: integer
- id: book_video_selfview_default_mode
  label: Video Selfview Default Mode
  kind: action
  command: "xConfiguration Video Selfview Default Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, Current, On]
- id: book_video_selfview_default_fullscreenmode
  label: Video Selfview Default FullscreenMode
  kind: action
  command: "xConfiguration Video Selfview Default FullscreenMode: {FullscreenMode}"
  params:
    - name: FullscreenMode
      type: enum
      values: [Off, Current, On]
- id: book_video_selfview_default_pipposition
  label: Video Selfview Default PIPPosition
  kind: action
  command: "xConfiguration Video Selfview Default PIPPosition: {PIPPosition}"
  params:
    - name: PIPPosition
      type: enum
      values: [Current, UpperLeft, UpperCenter, UpperRight, CenterLeft, CenterRight, LowerLeft, LowerRight]
- id: book_video_selfview_oncall_mode
  label: Video Selfview OnCall Mode
  kind: action
  command: "xConfiguration Video Selfview OnCall Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_video_selfview_oncall_duration
  label: Video Selfview OnCall Duration
  kind: action
  command: "xConfiguration Video Selfview OnCall Duration: {Duration}"
  params:
    - name: Duration
      type: integer
      range: "1..60"
- id: book_video_monitors
  label: Video Monitors
  kind: action
  command: "xConfiguration Video Monitors: {Monitors}"
  params:
    - name: Monitors
      type: enum
      values: [Auto, DualPresentationOnly]
- id: book_video_output_cec_mode
  label: Video Output Connector CEC Mode
  kind: action
  command: "xConfiguration Video Output Connector {n} CEC Mode: {Mode}"
  params:
    - name: n
      type: integer
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_video_output_overscanlevel
  label: Video Output Connector OverscanLevel
  kind: action
  command: "xConfiguration Video Output Connector {n} OverscanLevel: {OverscanLevel}"
  params:
    - name: n
      type: integer
    - name: OverscanLevel
      type: enum
      values: [None, Medium, High]
- id: book_video_output_resolution
  label: Video Output Connector Resolution
  kind: action
  command: "xConfiguration Video Output Connector {n} Resolution: {Resolution}"
  params:
    - name: n
      type: integer
      range: "1..2"
    - name: Resolution
      type: enum
      values: [Auto, "1024_768_60", "1280_1024_60", "1280_720_50", "1280_720_60", "1920_1080_50", "1920_1080_60", "1280_768_60", "1360_768_60", "1366_768_60"]
- id: book_video_input_visibility
  label: Video Input Connector Visibility
  kind: action
  command: "xConfiguration Video Input Connector {n} Visibility: {Visibility}"
  params:
    - name: n
      type: integer
      range: "1..4"
    - name: Visibility
      type: enum
      values: [Never, Always, IfSignal]
- id: book_video_input_quality
  label: Video Input Connector Quality
  kind: action
  command: "xConfiguration Video Input Connector {n} Quality: {Quality}"
  params:
    - name: n
      type: integer
      range: "2..4"
    - name: Quality
      type: enum
      values: [Motion, Sharpness]
- id: book_video_input_presentationselection
  label: Video Input Connector PresentationSelection
  kind: action
  command: "xConfiguration Video Input Connector {n} PresentationSelection: {PresentationSelection}"
  params:
    - name: n
      type: integer
      range: "2..4"
    - name: PresentationSelection
      type: enum
      values: [Manual, OnConnect]
- id: book_video_input_inputourcetype
  label: Video Input Connector InputSourceType
  kind: action
  command: "xConfiguration Video Input Connector {n} InputSourceType: {InputSourceType}"
  params:
    - name: n
      type: integer
      range: "1..4"
    - name: InputSourceType
      type: enum
      values: [camera, PC, mediaplayer, document_camera, whiteboard, other]

# === Provisioning ===
- id: provisioning_complete_upgrade
  label: Complete software upgrade
  kind: action
  command: "xCommand Provisioning CompleteUpgrade"
  params: []
- id: provisioning_start_upgrade
  label: Start software upgrade
  kind: action
  command: "xCommand Provisioning StartUpgrade"
  params: []
- id: provisioning_postpone_upgrade
  label: Postpone software upgrade
  kind: action
  command: "xCommand Provisioning PostponeUpgrade SecondsToPostpone: {SecondsToPostpone}"
  params:
    - name: SecondsToPostpone
      type: integer
      range: "0..65534"
- id: provisioning_cucm_ctl_show
  label: Show CUCM CTL
  kind: query
  command: "xCommand Provisioning CUCM CTL Show"
  params: []
- id: provisioning_cucm_ctl_delete
  label: Delete CUCM CTL
  kind: action
  command: "xCommand Provisioning CUCM CTL Delete"
  params: []
- id: book_provisioning_connectivity
  label: Provisioning Connectivity
  kind: action
  command: "xConfiguration Provisioning Connectivity: {Connectivity}"
  params:
    - name: Connectivity
      type: enum
      values: [Internal, External, Auto]
- id: book_provisioning_mode
  label: Provisioning Mode
  kind: action
  command: "xConfiguration Provisioning Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, Auto, TMS, VCS, CUCM, Edge]
- id: book_provisioning_loginname
  label: Provisioning LoginName
  kind: action
  command: "xConfiguration Provisioning LoginName: \"{LoginName}\""
  params:
    - name: LoginName
      type: string
- id: book_provisioning_password
  label: Provisioning Password
  kind: action
  command: "xConfiguration Provisioning Password: \"{Password}\""
  params:
    - name: Password
      type: string
- id: book_provisioning_httpmethod
  label: Provisioning HttpMethod
  kind: action
  command: "xConfiguration Provisioning HttpMethod: {HttpMethod}"
  params:
    - name: HttpMethod
      type: enum
      values: [GET, POST]
- id: book_provisioning_externalmanager_address
  label: Provisioning ExternalManager Address
  kind: action
  command: "xConfiguration Provisioning ExternalManager Address: \"{Address}\""
  params:
    - name: Address
      type: string
- id: book_provisioning_externalmanager_alternate
  label: Provisioning ExternalManager AlternateAddress
  kind: action
  command: "xConfiguration Provisioning ExternalManager AlternateAddress: \"{AlternateAddress}\""
  params:
    - name: AlternateAddress
      type: string
- id: book_provisioning_externalmanager_path
  label: Provisioning ExternalManager Path
  kind: action
  command: "xConfiguration Provisioning ExternalManager Path: \"{Path}\""
  params:
    - name: Path
      type: string
- id: book_provisioning_externalmanager_domain
  label: Provisioning ExternalManager Domain
  kind: action
  command: "xConfiguration Provisioning ExternalManager Domain: \"{Domain}\""
  params:
    - name: Domain
      type: string
- id: book_provisioning_externalmanager_protocol
  label: Provisioning ExternalManager Protocol
  kind: action
  command: "xConfiguration Provisioning ExternalManager Protocol: {Protocol}"
  params:
    - name: Protocol
      type: enum
      values: [HTTPS, HTTP]

# === Proximity ===
- id: proximity_services_activate
  label: Activate proximity services
  kind: action
  command: "xCommand Proximity Services Activate"
  params: []
- id: proximity_services_deactivate
  label: Deactivate proximity services
  kind: action
  command: "xCommand Proximity Services Deactivate"
  params: []
- id: book_proximity_mode
  label: Proximity Mode
  kind: action
  command: "xConfiguration Proximity Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_proximity_contentshare_fromclients
  label: Proximity Services ContentShare FromClients
  kind: action
  command: "xConfiguration Proximity Services ContentShare FromClients: {FromClients}"
  params:
    - name: FromClients
      type: enum
      values: [Enabled, Disabled]
- id: book_proximity_contentshare_toclients
  label: Proximity Services ContentShare ToClients
  kind: action
  command: "xConfiguration Proximity Services ContentShare ToClients: {ToClients}"
  params:
    - name: ToClients
      type: enum
      values: [Enabled, Disabled]
- id: book_proximity_callcontrol
  label: Proximity Services CallControl
  kind: action
  command: "xConfiguration Proximity Services CallControl: {CallControl}"
  params:
    - name: CallControl
      type: enum
      values: [Enabled, Disabled]

# === RoomPreset ===
- id: roompreset_activate
  label: Activate room preset
  kind: action
  command: "xCommand RoomPreset Activate PresetId: {PresetId}"
  params:
    - name: PresetId
      type: integer
      range: "1..15"
- id: roompreset_store
  label: Store room preset
  kind: action
  command: "xCommand RoomPreset Store [Description: \"{Description}\"] PresetId: {PresetId} Type: {Type}"
  params:
    - name: PresetId
      type: integer
      range: "1..15"
    - name: Type
      type: enum
      values: [All, Camera]
- id: roompreset_clear
  label: Clear room preset
  kind: action
  command: "xCommand RoomPreset Clear PresetId: {PresetId}"
  params:
    - name: PresetId
      type: integer
      range: "1..15"

# === Security ===
- id: security_persistency
  label: Set security persistency
  kind: action
  command: "xCommand Security Persistency Configurations: {Configurations} CallHistory: {CallHistory} InternalLogging: {InternalLogging} LocalPhonebook: {LocalPhonebook} DHCP: {DHCP} ConfirmAndReboot: {ConfirmAndReboot}"
  params:
    - name: Configurations
      type: enum
      values: [NonPersistent, Persistent]
    - name: CallHistory
      type: enum
      values: [NonPersistent, Persistent]
    - name: InternalLogging
      type: enum
      values: [NonPersistent, Persistent]
    - name: LocalPhonebook
      type: enum
      values: [NonPersistent, Persistent]
    - name: DHCP
      type: enum
      values: [NonPersistent, Persistent]
    - name: ConfirmAndReboot
      type: enum
      values: [Yes]

# === Serial Port ===
- id: book_serialport_mode
  label: SerialPort Mode
  kind: action
  command: "xConfiguration SerialPort Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_serialport_loginrequired
  label: SerialPort LoginRequired
  kind: action
  command: "xConfiguration SerialPort LoginRequired: {LoginRequired}"
  params:
    - name: LoginRequired
      type: enum
      values: [Off, On]

# === SIP ===
- id: book_sip_authentication_username
  label: SIP Authentication UserName
  kind: action
  command: "xConfiguration SIP Authentication UserName: \"{UserName}\""
  params:
    - name: UserName
      type: string
- id: book_sip_authentication_password
  label: SIP Authentication Password
  kind: action
  command: "xConfiguration SIP Authentication Password: \"{Password}\""
  params:
    - name: Password
      type: string
- id: book_sip_default_transport
  label: SIP DefaultTransport
  kind: action
  command: "xConfiguration SIP DefaultTransport: {DefaultTransport}"
  params:
    - name: DefaultTransport
      type: enum
      values: [TCP, UDP, Tls, Auto]
- id: book_sip_displayname
  label: SIP DisplayName
  kind: action
  command: "xConfiguration SIP DisplayName: \"{DisplayName}\""
  params:
    - name: DisplayName
      type: string
- id: book_sip_ice_mode
  label: SIP Ice Mode
  kind: action
  command: "xConfiguration SIP Ice Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Auto, Off, On]
- id: book_sip_ice_defaultcandidate
  label: SIP Ice DefaultCandidate
  kind: action
  command: "xConfiguration SIP Ice DefaultCandidate: {DefaultCandidate}"
  params:
    - name: DefaultCandidate
      type: enum
      values: [Host, Rflx, Relay]
- id: book_sip_listenport
  label: SIP ListenPort
  kind: action
  command: "xConfiguration SIP ListenPort: {ListenPort}"
  params:
    - name: ListenPort
      type: enum
      values: [Off, On]
- id: book_sip_turn_server
  label: SIP Turn Server
  kind: action
  command: "xConfiguration SIP Turn Server: \"{Server}\""
  params:
    - name: Server
      type: string
- id: book_sip_turn_username
  label: SIP Turn UserName
  kind: action
  command: "xConfiguration SIP Turn UserName: \"{UserName}\""
  params:
    - name: UserName
      type: string
- id: book_sip_turn_password
  label: SIP Turn Password
  kind: action
  command: "xConfiguration SIP Turn Password: \"{Password}\""
  params:
    - name: Password
      type: string
- id: book_sip_proxy_address
  label: SIP Proxy Address
  kind: action
  command: "xConfiguration SIP Proxy {n} Address: \"{Address}\""
  params:
    - name: n
      type: integer
      range: "1..4"
    - name: Address
      type: string
- id: book_sip_uri
  label: SIP URI
  kind: action
  command: "xConfiguration SIP URI: \"{URI}\""
  params:
    - name: URI
      type: string

# === Standby ===
- id: standby_activate
  label: Activate standby
  kind: action
  command: "xCommand Standby Activate"
  params: []
- id: standby_deactivate
  label: Deactivate standby
  kind: action
  command: "xCommand Standby Deactivate"
  params: []
- id: standby_reset_timer
  label: Reset standby timer
  kind: action
  command: "xCommand Standby ResetTimer Delay: {Delay}"
  params:
    - name: Delay
      type: integer
      range: "1..480"
- id: book_standby_control
  label: Standby Control
  kind: action
  command: "xConfiguration Standby Control: {Control}"
  params:
    - name: Control
      type: enum
      values: [Off, On]
- id: book_standby_delay
  label: Standby Delay
  kind: action
  command: "xConfiguration Standby Delay: {Delay}"
  params:
    - name: Delay
      type: integer
      range: "1..480"
- id: book_standby_boot_action
  label: Standby BootAction
  kind: action
  command: "xConfiguration Standby BootAction: {BootAction}"
  params:
    - name: BootAction
      type: enum
      values: [None, RestoreCameraPosition, DefaultCameraPosition]
- id: book_standby_wakeup_action
  label: Standby WakeupAction
  kind: action
  command: "xConfiguration Standby WakeupAction: {WakeupAction}"
  params:
    - name: WakeupAction
      type: enum
      values: [None, RestoreCameraPosition, DefaultCameraPosition]
- id: book_standby_standby_action
  label: Standby StandbyAction
  kind: action
  command: "xConfiguration Standby StandbyAction: {StandbyAction}"
  params:
    - name: StandbyAction
      type: enum
      values: [None, PrivacyPosition]

# === SystemUnit ===
- id: systemunit_boot
  label: Boot system
  kind: action
  command: "xCommand SystemUnit Boot [Action: {Action}]"
  params:
    - name: Action
      type: enum
      values: [Restart, Shutdown]
- id: systemunit_factory_reset
  label: Factory reset
  kind: action
  command: "xCommand SystemUnit FactoryReset Confirm: {Confirm} [TrailingAction: {TrailingAction}]"
  params:
    - name: Confirm
      type: enum
      values: [Yes]
    - name: TrailingAction
      type: enum
      values: [NoAction, Restart, Shutdown]
- id: systemunit_notifications_remove_all
  label: Clear system notifications
  kind: action
  command: "xCommand SystemUnit Notifications RemoveAll"
  params: []
- id: systemunit_optionkey_add
  label: Add option key
  kind: action
  command: "xCommand SystemUnit OptionKey Add Key: \"{Key}\""
  params:
    - name: Key
      type: string
      description: "Length 16-24"
- id: systemunit_optionkey_remove
  label: Remove option key
  kind: action
  command: "xCommand SystemUnit OptionKey Remove Type: {Type}"
  params:
    - name: Type
      type: enum
      values: [Encryption, MultiSite, PremiumResolution, RemoteMonitoring]
- id: systemunit_optionkey_remove_all
  label: Remove all option keys
  kind: action
  command: "xCommand SystemUnit OptionKey RemoveAll Confirm: {Confirm}"
  params:
    - name: Confirm
      type: enum
      values: [Yes]
- id: systemunit_software_upgrade
  label: Software upgrade from URL
  kind: action
  command: "xCommand SystemUnit SoftwareUpgrade URL: \"{URL}\" [UserName: \"{UserName}\"] [Password: \"{Password}\"]"
  params:
    - name: URL
      type: string
    - name: UserName
      type: string
    - name: Password
      type: string
- id: book_systemunit_name
  label: SystemUnit Name
  kind: action
  command: "xConfiguration SystemUnit Name: \"{Name}\""
  params:
    - name: Name
      type: string

# === Time ===
- id: time_datetime_get
  label: Get date and time
  kind: query
  command: "xCommand Time DateTime Get"
  params: []
- id: time_datetime_set
  label: Set date and time
  kind: action
  command: "xCommand Time DateTime Set [Year: {Year}] [Month: {Month}] [Day: {Day}] [Hour: {Hour}] [Minute: {Minute}] [Second: {Second}]"
  params:
    - name: Year
      type: integer
      range: "2015..2037"
    - name: Month
      type: integer
      range: "1..12"
    - name: Day
      type: integer
      range: "1..31"
    - name: Hour
      type: integer
      range: "0..23"
    - name: Minute
      type: integer
      range: "0..59"
    - name: Second
      type: integer
      range: "0..59"
- id: book_time_timeformat
  label: Time TimeFormat
  kind: action
  command: "xConfiguration Time TimeFormat: {TimeFormat}"
  params:
    - name: TimeFormat
      type: enum
      values: ["24H", "12H"]
- id: book_time_dateformat
  label: Time DateFormat
  kind: action
  command: "xConfiguration Time DateFormat: {DateFormat}"
  params:
    - name: DateFormat
      type: enum
      values: [DD_MM_YY, MM_DD_YY, YY_MM_DD]
- id: book_time_zone
  label: Time Zone
  kind: action
  command: "xConfiguration Time Zone: {Zone}"
  params:
    - name: Zone
      type: string
      description: IANA tz database zone

# === UserInterface ===
- id: uimessage_alert_display
  label: Display alert message
  kind: action
  command: "xCommand UserInterface Message Alert Display [Title: \"{Title}\"] Text: \"{Text}\" [Duration: {Duration}]"
  params:
    - name: Title
      type: string
    - name: Text
      type: string
    - name: Duration
      type: integer
      range: "0..3600"
- id: uimessage_alert_clear
  label: Clear alert message
  kind: action
  command: "xCommand UserInterface Message Alert Clear"
  params: []
- id: uimessage_prompt_display
  label: Display prompt
  kind: action
  command: "xCommand UserInterface Message Prompt Display [Title: \"{Title}\"] Text: \"{Text}\" [FeedbackId: \"{FeedbackId}\"] [Option.1: \"{Option.1}\"] [Option.2: \"{Option.2}\"] [Option.3: \"{Option.3}\"] [Option.4: \"{Option.4}\"] [Option.5: \"Option.5\"]"
  params:
    - name: Title
      type: string
    - name: Text
      type: string
    - name: FeedbackId
      type: string
    - name: Option1..5
      type: string
- id: uimessage_prompt_clear
  label: Clear prompt
  kind: action
  command: "xCommand UserInterface Message Prompt Clear [FeedbackId: \"{FeedbackId}\"]"
  params:
    - name: FeedbackId
      type: string
- id: uimessage_prompt_response
  label: Respond to prompt
  kind: action
  command: "xCommand UserInterface Message Prompt Response [FeedbackId: \"{FeedbackId}\"] OptionId: {OptionId}"
  params:
    - name: OptionId
      type: integer
      range: "1..5"
- id: uimessage_textline_display
  label: Display text line
  kind: action
  command: "xCommand UserInterface Message TextLine Display Text: \"{Text}\" [X: {X}] [Y: {Y}] [Duration: {Duration}]"
  params:
    - name: X
      type: integer
      range: "1..10000"
    - name: Y
      type: integer
      range: "1..10000"
    - name: Duration
      type: integer
      range: "0..3600"
- id: uimessage_textline_clear
  label: Clear text line
  kind: action
  command: "xCommand UserInterface Message TextLine Clear"
  params: []
- id: book_uicontactinfo_type
  label: UserInterface ContactInfo Type
  kind: action
  command: "xConfiguration UserInterface ContactInfo Type: {Type}"
  params:
    - name: Type
      type: enum
      values: [Auto, None, IPv4, IPv6, H323Id, H320Number, E164Alias, SipUri, SystemName, DisplayName]
- id: book_uikeytones_mode
  label: UserInterface KeyTones Mode
  kind: action
  command: "xConfiguration UserInterface KeyTones Mode: {Mode}"
  params:
    - name: Mode
      type: enum
      values: [Off, On]
- id: book_uiosd_output
  label: UserInterface OSD Output
  kind: action
  command: "xConfiguration UserInterface OSD Output: {Output}"
  params:
    - name: Output
      type: enum
      values: [Auto, "1", "2"]
- id: book_ui_language
  label: UserInterface Language
  kind: action
  command: "xConfiguration UserInterface Language: {Language}"
  params:
    - name: Language
      type: enum
      values: [English, ChineseSimplified, ChineseTraditional, Catalan, Czech, Danish, Dutch, Finnish, French, German, Hungarian, Italian, Japanese, Korean, Norwegian, Polish, PortugueseBrazilian, Russian, Spanish, Swedish, Turkish, Arabic, Hebrew]

# === UserManagement ===
- id: um_remote_support_get_state
  label: Get remote support user state
  kind: query
  command: "xCommand UserManagement RemoteSupportUser GetState"
  params: []
- id: um_remote_support_create
  label: Create remote support user
  kind: action
  command: "xCommand UserManagement RemoteSupportUser Create [ExpiryDays: {ExpiryDays}]"
  params:
    - name: ExpiryDays
      type: integer
      range: "1..31"
- id: um_remote_support_delete
  label: Delete remote support user
  kind: action
  command: "xCommand UserManagement RemoteSupportUser Delete"
  params: []
- id: um_remote_support_disable_permanently
  label: Disable remote support permanently
  kind: action
  command: "xCommand UserManagement RemoteSupportUser DisablePermanently Confirm: {Confirm}"
  params:
    - name: Confirm
      type: enum
      values: [Yes]
- id: um_user_passphrase_change
  label: Change user passphrase
  kind: action
  command: "xCommand UserManagement User Passphrase Change NewPassphrase: \"{NewPassphrase}\" OldPassphrase: \"{OldPassphrase}\""
  params:
    - name: NewPassphrase
      type: string
    - name: OldPassphrase
      type: string
- id: um_user_passphrase_set
  label: Set user passphrase
  kind: action
  command: "xCommand UserManagement User Passphrase Set NewPassphrase: \"{NewPassphrase}\" Username: \"{Username}\" YourPassphrase: \"{YourPassphrase}\""
  params:
    - name: NewPassphrase
      type: string
    - name: Username
      type: string
    - name: YourPassphrase
      type: string

# === Video ===
- id: video_active_speaker_pip_set
  label: Set active speaker PiP
  kind: action
  command: "xCommand Video ActiveSpeakerPIP Set Position: {Position}"
  params:
    - name: Position
      type: enum
      values: [CenterLeft, CenterRight, LowerLeft, LowerRight, UpperCenter, UpperLeft, UpperRight]
- id: video_input_set_main_source
  label: Set main video source
  kind: action
  command: "xCommand Video Input SetMainVideoSource [ConnectorId: {ConnectorId}] [SourceId: {SourceId}]"
  params:
    - name: ConnectorId
      type: integer
      range: "1..5"
    - name: SourceId
      type: integer
      range: "1..4"
- id: video_input_set_active_connector
  label: Set active connector
  kind: action
  command: "xCommand Video Input Source SetActiveConnector [ConnectorId: {ConnectorId}]"
  params:
    - name: ConnectorId
      type: integer
      range: "2..4"
- id: video_matrix_assign
  label: Video matrix assign
  kind: action
  command: "xCommand Video Matrix Assign [Mode: {Mode}] Output: {Output} SourceId: {SourceId}"
  params:
    - name: Mode
      type: enum
      values: [Add, Replace]
    - name: Output
      type: integer
      range: "1..2"
    - name: SourceId
      type: integer
      range: "1..4"
- id: video_matrix_unassign
  label: Video matrix unassign
  kind: action
  command: "xCommand Video Matrix Unassign Output: {Output} SourceId: {SourceId}"
  params:
    - name: Output
      type: integer
      range: "1..2"
    - name: SourceId
      type: integer
      range: "1..4"
- id: video_matrix_swap
  label: Video matrix swap
  kind: action
  command: "xCommand Video Matrix Swap OutputA: {OutputA} OutputB: {OutputB}"
  params:
    - name: OutputA
      type: integer
      range: "1..2"
    - name: OutputB
      type: integer
      range: "1..2"
- id: video_matrix_reset
  label: Video matrix reset
  kind: action
  command: "xCommand Video Matrix Reset [Output: {Output}]"
  params:
    - name: Output
      type: integer
      range: "1..2"
- id: video_layout_family_set
  label: Set layout family
  kind: action
  command: "xCommand Video Layout LayoutFamily Set [Target: {Target}] [CallId: {CallId}] LayoutFamily: {LayoutFamily} [CustomLayoutName: \"{CustomLayoutName}\"]"
  params:
    - name: Target
      type: enum
      values: [local, remote]
    - name: CallId
      type: integer
      range: "0..65534"
    - name: LayoutFamily
      type: enum
      values: [auto, custom, equal, overlay, prominent, single]
- id: video_presentation_pip_set
  label: Set presentation PiP
  kind: action
  command: "xCommand Video PresentationPIP Set Position: {Position}"
  params:
    - name: Position
      type: enum
      values: [CenterLeft, CenterRight, LowerLeft, LowerRight, UpperCenter, UpperLeft, UpperRight]
- id: video_selfview_set
  label: Set self-view
  kind: action
  command: "xCommand Video Selfview Set [Mode: {Mode}] [FullscreenMode: {FullscreenMode}] [PIPPosition: {PIPPosition}] [OnMonitorRole: {OnMonitorRole}]"
  params:
    - name: Mode
      type: enum
      values: [On, Off]
    - name: FullscreenMode
      type: enum
      values: [On, Off]
    - name: PIPPosition
      type: enum
      values: [CenterLeft, CenterRight, LowerLeft, LowerRight, UpperCenter, UpperLeft, UpperRight]
    - name: OnMonitorRole
      type: enum
      values: [First, Fourth, Second, Third]

# === xFeedback (terminal session registration) ===
- id: xfeedback_register
  label: Register feedback expression
  kind: action
  command: "xFeedback register {path}"
  params:
    - name: path
      type: string
      description: XPath expression
- id: xfeedback_deregister
  label: Deregister feedback expression
  kind: action
  command: "xFeedback deregister {path}"
  params:
    - name: path
      type: string
- id: xfeedback_list
  label: List feedback expressions
  kind: query
  command: "xFeedback list"
  params: []

# === xPreferences ===
- id: xpreferences_outputmode
  label: Set output mode
  kind: action
  command: "xPreferences outputmode {mode}"
  params:
    - name: mode
      type: enum
      values: [terminal, xml, json]
- id: echo
  label: Set echo
  kind: action
  command: "echo {state}"
  params:
    - name: state
      type: enum
      values: [on, off]
- id: bye
  label: Close CLI session
  kind: action
  command: "bye"
  params: []
- id: help
  label: List top-level CLI commands
  kind: query
  command: "?"
  params: []
```

## Feedbacks
```yaml
# Observable state from xStatus queries. Each maps to a `*s <path>: <value>` response line.
- id: audio_volume
  type: integer
  range: "0..100"
  description: Current loudspeaker volume level
- id: audio_volume_mute
  type: enum
  values: [On, Off]
- id: audio_microphones_mute
  type: enum
  values: [On, Off]
- id: audio_mic_connection_status
  type: enum
  values: [Connected, NotConnected, Unknown]
- id: call_status
  type: enum
  values: [Idle, Dialling, Ringing, Connecting, Connected, Disconnecting, OnHold, EarlyMedia, Preserved, RemotePreserved]
- id: call_type
  type: enum
  values: [Video, Audio, AudioCanEscalate, ForwardAllCall, Unknown]
- id: call_answer_state
  type: enum
  values: [Unanswered, Ignored, Autoanswered, Answered]
- id: call_direction
  type: enum
  values: [Incoming, Outgoing]
- id: call_device_type
  type: enum
  values: [Endpoint, MCU]
- id: call_encryption_type
  type: enum
  values: [None, Aes-128]
- id: call_placed_on_hold
  type: enum
  values: [True, False]
- id: call_protocol
  type: enum
  values: [H320, H323, SIP]
- id: call_receive_call_rate
  type: integer
  range: "0..6000"
  description: kbps
- id: call_transmit_call_rate
  type: integer
  range: "0..6000"
  description: kbps
- id: conference_active_speaker_callid
  type: integer
- id: conference_do_not_disturb
  type: enum
  values: [Active, Inactive]
- id: conference_line_mode
  type: enum
  values: [Shared, Private]
- id: conference_multipoint_mode
  type: enum
  values: [Auto, CUCMMediaResourceGroupList, MultiSite, Off]
- id: conference_presentation_mode
  type: enum
  values: [On, Off]
- id: conference_speakerlock_mode
  type: enum
  values: [On, Off]
- id: conference_speakerlock_callid
  type: integer
- id: conference_fecc_mode
  type: enum
  values: [On, Off]
- id: capabilities_conference_max_video_calls
  type: integer
  range: "0..5"
- id: capabilities_conference_max_active_calls
  type: integer
  range: "0..5"
- id: capabilities_conference_max_audio_calls
  type: integer
- id: capabilities_conference_max_calls
  type: integer
  range: "0..5"
- id: camera_connected
  type: enum
  values: [True, False]
- id: camera_capabilities_options
  type: string
  description: e.g. "ptzf"
- id: camera_manufacturer
  type: string
- id: camera_model
  type: string
- id: camera_software_id
  type: string
- id: diagnostics_message_level
  type: enum
  values: [Error, Warning, Critical]
- id: diagnostics_message_type
  type: string
- id: h323_gatekeeper_address
  type: string
- id: h323_gatekeeper_port
  type: integer
- id: h323_gatekeeper_status
  type: enum
  values: [Required, Discovering, Discovered, Authenticating, Authenticated, Registering, Registered, Inactive, Rejected]
- id: h323_mode_status
  type: enum
  values: [Enabled, Disabled]
- id: h323_mode_reason
  type: string
- id: httpfeedback_url
  type: string
- id: network_ipv4_address
  type: string
- id: network_ipv4_gateway
  type: string
- id: network_ipv4_subnetmask
  type: string
- id: network_ipv6_address
  type: string
- id: network_ipv6_gateway
  type: string
- id: network_dns_domain_name
  type: string
- id: network_dns_server_address
  type: string
- id: network_ethernet_mac_address
  type: string
- id: network_ethernet_speed
  type: enum
  values: ["10half", "10full", "100half", "100full", "1000full"]
- id: network_vlan_voice_vlanid
  type: string
  description: "Off or 1..4094"
- id: network_cdp_address
  type: string
- id: networkservices_ntp_status
  type: enum
  values: [Unknown, Synced, Discarded]
- id: networkservices_ntp_current_address
  type: string
- id: peripherals_connected_device_status
  type: enum
  values: [Connected, ResponseTimedOut]
- id: peripherals_connected_device_type
  type: enum
  values: [Byod, Camera, ControlSystem, ISDNLink, Other, SpeakerTrack, TouchPanel]
- id: peripherals_connected_device_id
  type: string
- id: peripherals_connected_device_name
  type: string
- id: peripherals_connected_device_software_info
  type: string
- id: peripherals_connected_device_hardware_info
  type: string
- id: peripherals_connected_device_upgrade_status
  type: enum
  values: [Downloading, Failed, Installing, InstallationReady, None, Succeeded, Rebooting, Retrying, Aborted, Paused]
- id: provisioning_status
  type: enum
  values: [Failed, AuthenticationFailed, Provisioned, Idle, NeedConfig, ConfigError]
- id: provisioning_software_current_version
  type: string
- id: provisioning_software_upgrade_status_status
  type: enum
  values: [None, InProgress, Failed, InstallationFailed, Succeeded]
- id: provisioning_software_upgrade_status_phase
  type: enum
  values: [None, DownloadPending, FormingHierarchy, Downloading, DownloadPaused, DownloadDone, Seeding, AboutToInstallUpgrade, Postponed, PeripheralsReady, UpgradingPeripherals, Installing, InstallingPeripherals]
- id: proximity_services_availability
  type: enum
  values: [Available, Disabled, Deactivated]
- id: security_fips_mode
  type: enum
  values: [On, Off]
- id: security_persistency_configurations
  type: enum
  values: [NonPersistent, Persistent]
- id: security_persistency_callhistory
  type: enum
  values: [NonPersistent, Persistent]
- id: security_persistency_internallogging
  type: enum
  values: [NonPersistent, Persistent]
- id: security_persistency_localphonebook
  type: enum
  values: [NonPersistent, Persistent]
- id: security_persistency_dhcp
  type: enum
  values: [NonPersistent, Persistent]
- id: sip_proxy_address
  type: string
- id: sip_proxy_status
  type: enum
  values: [Active, DNSFailed, Off, Timeout, UnableTCP, UnableTLS, Unknown, AuthenticationFailed]
- id: sip_proxy_secure
  type: enum
  values: [True, False]
- id: sip_proxy_verified
  type: enum
  values: [True, False]
- id: sip_registration_status
  type: enum
  values: [Deregister, Failed, Inactive, Registered, Registering]
- id: sip_registration_uri
  type: string
- id: sip_callforward_mode
  type: enum
  values: [On, Off]
- id: sip_callforward_uri
  type: string
- id: sip_mailbox_messages_waiting
  type: integer
- id: sip_mailbox_uri
  type: string
- id: sip_authentication
  type: enum
  values: [Digest, Off]
- id: sip_secure
  type: enum
  values: [True, False]
- id: sip_verified
  type: enum
  values: [True, False]
- id: standby_state
  type: enum
  values: [Standby, Off]
- id: systemunit_state_number_of_active_calls
  type: integer
  range: "0..5"
- id: systemunit_state_number_of_in_progress_calls
  type: integer
  range: "0..5"
- id: systemunit_state_number_of_suspended_calls
  type: integer
  range: "0..5"
- id: systemunit_uptime
  type: integer
- id: systemunit_hardware_temperature
  type: string
  description: Celsius
- id: systemunit_product_id
  type: string
- id: systemunit_product_type
  type: string
- id: systemunit_software_name
  type: string
- id: systemunit_software_version
  type: string
- id: systemunit_software_release_date
  type: string
- id: systemunit_software_optionkeys_encryption
  type: enum
  values: [True, False]
- id: systemunit_software_optionkeys_multisite
  type: enum
  values: [True, False]
- id: systemunit_software_optionkeys_premiumresolution
  type: enum
  values: [True, False]
- id: systemunit_software_optionkeys_remotemonitoring
  type: enum
  values: [True, False]
- id: systemunit_notifications_text
  type: string
- id: systemunit_notifications_type
  type: enum
  values: [FactoryResetOK, FactoryResetFailed, SoftwareUpgradeOK, SoftwareUpgradeFailed, RebootRequired, Other]
- id: time_system_time
  type: string
- id: userinterface_contactinfo_name
  type: string
- id: userinterface_contactinfo_number
  type: string
- id: video_input_connector_connected
  type: enum
  values: [True, False, Unknown]
- id: video_input_connector_signal_state
  type: enum
  values: [OK, Unknown, Unsupported]
- id: video_input_connector_type
  type: enum
  values: [Composite, DVI, HDMI, Unknown, YC]
- id: video_input_source_resolution_width
  type: integer
  range: "0..4000"
- id: video_input_source_resolution_height
  type: integer
  range: "0..3000"
- id: video_input_source_resolution_refreshrate
  type: integer
  range: "0..300"
- id: video_input_source_format_status
  type: enum
  values: [Ok, OutOfRange, NotFound, Interlaced, Error, Unknown]
- id: video_input_main_video_source
  type: integer
- id: video_monitors
  type: enum
  values: [Single, Dual, DualPresentationOnly, Triple, Quadruple]
- id: video_output_connector_connected
  type: enum
  values: [True, False]
- id: video_output_connector_type
  type: enum
  values: [HDMI, DVI]
- id: video_output_connector_resolution_width
  type: integer
  range: "176..4000"
- id: video_output_connector_resolution_height
  type: integer
  range: "120..3000"
- id: video_output_connector_resolution_refreshrate
  type: integer
  range: "1..300"
- id: video_output_connector_monitor_role
  type: enum
  values: [First, Second, Third, PresentationOnly, Recorder]
- id: video_output_connector_cec_device_type
  type: enum
  values: [Unknown, TV, Reserved, Recorder, Tuner, Playback, Audio]
- id: video_output_connector_cec_power_control
  type: enum
  values: [Unknown, Ok, "In progress", "Failed to power on", "Failed to standby"]
- id: video_output_connector_cec_power_status
  type: enum
  values: [Unknown, Ok, "In progress", "Failed to power on", "Failed to standby"]
- id: video_output_connected_device_name
  type: string
- id: video_output_connected_device_preferred_format
  type: string
- id: video_selfview_mode
  type: enum
  values: [On, Off]
- id: video_selfview_fullscreenmode
  type: enum
  values: [On, Off]
- id: video_selfview_pipposition
  type: enum
  values: [UpperLeft, UpperCenter, UpperRight, CenterLeft, CenterRight, LowerLeft, LowerRight]
- id: video_selfview_onmonitorrole
  type: enum
  values: [First, Second, Third, Fourth]
- id: video_presentation_pipposition
  type: enum
  values: [UpperLeft, UpperCenter, UpperRight, CenterLeft, CenterRight, LowerLeft, LowerRight]
- id: video_active_speaker_pipposition
  type: enum
  values: [UpperLeft, UpperCenter, UpperRight, CenterLeft, CenterRight, LowerLeft, LowerRight]
```

## Variables
```yaml
# xConfiguration settings surfaced as runtime-adjustable parameters. The codec
# holds the value of each xConfiguration; setting is a separate xConfiguration
# action. Listed values that are not exposed as discrete actions above.
- id: audio_default_volume
  type: integer
  range: "0..100"
  command: "xConfiguration Audio DefaultVolume"
- id: audio_ring_volume
  type: integer
  range: "0..100"
  command: "xConfiguration Audio SoundsAndAlerts RingVolume"
- id: audio_ring_tone
  type: string
  values_from: "Sunrise/Mischief/Ripples/Reflections/Vibes/Delight/Evolve/Playful/Ascent/Calculation/Mellow/Ringer"
  command: "xConfiguration Audio SoundsAndAlerts RingTone"
- id: audio_input_microphone_mode
  type: enum
  values: [Off, On]
  command: "xConfiguration Audio Input Microphone [n] Mode"
- id: audio_output_internal_speaker_mode
  type: enum
  values: [Off, On]
  command: "xConfiguration Audio Output InternalSpeaker Mode"
- id: camera_brightness_level
  type: integer
  range: "1..31"
  command: "xConfiguration Cameras Camera [n] Brightness DefaultLevel"
- id: camera_gamma_level
  type: integer
  range: "0..7"
  command: "xConfiguration Cameras Camera [n] Gamma Level"
- id: camera_whitebalance_level
  type: integer
  range: "1..16"
  command: "xConfiguration Cameras Camera [n] Whitebalance Level"
- id: conference_defaultcall_rate
  type: integer
  range: "64..6000"
  command: "xConfiguration Conference DefaultCall Rate"
- id: h323_alias_id
  type: string
  command: "xConfiguration H323 H323Alias ID"
- id: h323_alias_e164
  type: string
  command: "xConfiguration H323 H323Alias E164"
- id: sip_uri
  type: string
  command: "xConfiguration SIP URI"
- id: sip_display_name
  type: string
  command: "xConfiguration SIP DisplayName"
- id: systemunit_name
  type: string
  command: "xConfiguration SystemUnit Name"
- id: userinterface_language
  type: string
  command: "xConfiguration UserInterface Language"
- id: standby_delay
  type: integer
  range: "1..480"
  command: "xConfiguration Standby Delay"
- id: volume_level
  type: integer
  range: "0..100"
  command: "xConfiguration Audio DefaultVolume"
```

## Events
```yaml
# xEvent notifications; emitted as `*e <Name> ...` lines on the terminal session,
# pushed to HTTP via HttpFeedback Register, or returned in HTTP feedback POSTs.
- id: outgoing_call_indication
  type: event
  payload: "CallId"
  description: Reported when an outgoing call is about to be dialled
- id: call_disconnect
  type: event
  payload: "CallId, CauseValue, CauseType, CauseString, OrigCallDirection, RemoteURI, CauseCode, CauseOrigin"
  description: Reported when a call is disconnected
- id: call_successful
  type: event
  payload: "CallId, Protocol, Direction, CallRate, RemoteURI, EncryptionIn, EncryptionOut"
  description: Reported when a call is connected successfully
- id: fecc_action_indication
  type: event
  payload: "Id, Req, Pan, PanRight, Tilt, TiltUp, Zoom, ZoomIn, Focus, FocusIn, Timeout, VideoSrc, m"
  description: Reported when far end is sending FECC commands
- id: tstring_received
  type: event
  payload: "CallId, Message"
  description: Reported when far end has sent a TString message
- id: sstring_received
  type: event
  payload: "String, Id"
  description: Reported when far end has sent a SString message
```

## Macros
```yaml
# UNRESOLVED: source mentions "startup scripts" containing sequences of xCommand
# and xConfiguration entries, but does not provide a specific example sequence.
# The xCommand SystemUnit FactoryReset, Standby Activate, Provisioning
# CompleteUpgrade, and Security Persistency commands each describe a built-in
# multi-step effect (e.g. Persistency accepts multiple state arguments + reboot).
```

## Safety
```yaml
[]
# No explicit safety warnings, interlocks, or power-on sequencing requirements
# were stated in the source. The codec is an end-user collaboration device and
# does not require confirmation for its control actions in this API.
```

## Notes
- Cisco xAPI exposes four command groups (`xCommand`, `xConfiguration`, `xStatus`, `xEvent`) plus session-level `xFeedback` and `xPreferences`. Commands are case-insensitive; values containing spaces must be quoted.
- Three output modes: `terminal` (default, line-based), `xml`, and `json`. Switch with `xPreferences outputmode <terminal|xml|json>`. Examples in the source assume terminal mode.
- HTTP/XMLAPI authentication uses HTTP Basic Access Authentication with the `ADMIN` role; alternatively, sessions can be opened with `POST /xmlapi/session/begin` and reused with a `SessionId` cookie. Always explicitly close the session via `POST /xmlapi/session/end` to avoid exhausting the concurrent-sessions pool.
- The XML encoding of commands mirrors the terminal form via parent-child hierarchy (e.g. `xCommand Dial Number: "12345"` ↔ `<Command><Dial command="True"><Number>12345</Number></Dial></Command>`).
- Telnet is disabled by default; SSH is enabled by default. The default user is `admin` with no initial password; an admin password must be set before SSH and HTTP/XMLAPI access is granted.
- The serial port uses 115200 bps, 8 data bits, no parity, 1 stop bit. Login can be required or skipped via `xConfiguration SerialPort LoginRequired`.
- Camera control via xCommand is per individual camera; the `xCommand Preset` family covers all connected cameras plus the video input switcher as a unit.
- The `xCommand FarEndControl` family only works when `xConfiguration Conference FarEndControl Mode` is set to `On` on the far-end codec.
- HTTP API URL cheat sheet (all from source):
  - `GET  http://<ip>/status.xml` — complete status document
  - `GET  http://<ip>/configuration.xml` — complete configuration document
  - `GET  http://<ip>/command.xml` — complete command document
  - `GET  http://<ip>/valuespace.xml` — complete valuespace document
  - `GET  http://<ip>/getxml?location=<path>` — partial document
  - `POST http://<ip>/putxml` — body contains commands/configurations as XML
  - `POST http://<ip>/xmlapi/session/begin` and `POST .../session/end` for session-based auth
- `xFeedback` register/deregister over a terminal session is per-session and must be re-registered after a reconnect; up to 38 expressions per session. The HTTP variant uses `xCommand HttpFeedback Register` with up to 4 server slots and 15 expressions per slot.

<!-- UNRESOLVED: baud rate other than 115200/8N1 for serial — source only states 115200 8N1 once, no other rate. -->
<!-- UNRESOLVED: full call-port range for H.323 media (2326-2487, 5555-6555) noted; SIP listen port range not stated. -->
<!-- UNRESOLVED: specific firmware version compatibility range not stated; the source examples include CE6, CE8.0, CE8.2.0, TC6.0.0.199465. -->
<!-- UNRESOLVED: full systemtools admin commands exist (network ping/traceroute, pki, securitysettings, etc.) but are stated to be "for advanced troubleshooting" and "should not be used to program the codec" — not included above. -->

## Provenance

```yaml
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce91/mx200g2-mx300g2-api-reference-guide-ce91.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce91/dx70-dx80-api-reference-guide-ce91.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce92/mx200g2-mx300g2-api-reference-guide-ce92.pdf
retrieved_at: 2026-06-01T23:29:55.954Z
last_checked_at: 2026-05-14T18:17:15.020Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.020Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 77 spec actions matched to source xCommand definitions with correct parameters and transport verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "port numbers for Telnet/SSH/HTTP/HTTPS not explicitly stated in source (defaults would be 23/22/80/443 but source leaves these open)."
- "firmware version compatibility range not stated; source examples include CE8.0, CE8.2.0, TC6.0.0.199465."
- "TCP port (Telnet default 23, SSH default 22) not stated in source"
- "H.323 call signalling port 1720 and media range 2326-2487 / 5555-6555 stated; SIP default 5060 for TCP/UDP stated"
- "source mentions \"startup scripts\" containing sequences of xCommand"
- "baud rate other than 115200/8N1 for serial — source only states 115200 8N1 once, no other rate."
- "full call-port range for H.323 media (2326-2487, 5555-6555) noted; SIP listen port range not stated."
- "specific firmware version compatibility range not stated; the source examples include CE6, CE8.0, CE8.2.0, TC6.0.0.199465."
- "full systemtools admin commands exist (network ping/traceroute, pki, securitysettings, etc.) but are stated to be \"for advanced troubleshooting\" and \"should not be used to program the codec\" — not included above."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
