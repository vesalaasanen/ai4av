---
spec_id: admin/televic-cocon-v1_4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Televic CoCon v1.4 Control Spec"
manufacturer: Televic
model_family: "CoCon Room Server v1.4"
aliases: []
compatible_with:
  manufacturers:
    - Televic
  models:
    - "CoCon Room Server v1.4"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - documents.televic.digital
source_urls:
  - "https://documents.televic.digital/conference/index.php/s/HW2RLc6ifDY9tDJ/download/API%20Document%20for%206.11.pdf"
retrieved_at: 2026-04-30T04:32:41.058Z
last_checked_at: 2026-05-14T18:17:21.227Z
generated_at: 2026-05-14T18:17:21.227Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.227Z
  matched_actions: 62
  action_count: 64
  confidence: high
  summary: "All 62 spec actions matched to documented CoCon API endpoints; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Televic CoCon v1.4 Control Spec

## Summary
Televic CoCon is a conference room server providing REST/JSON API over HTTP (port 8890). Supports publish/subscribe model with long-polling notifications, conference management (microphones, meetings, voting, timers, delegates, interpretation), and external control via client-to-server commands. Plixus Core API is a subset of CoCon Core API.

<!-- UNRESOLVED: complete command enumeration exceeds scope; representative actions documented -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 8890  # stated in source (sections 2.1, 2.2, 3.4.2)
  base_url: http://localhost:8890/CoCon  # example URI from source
auth:
  type: none  # inferred: no auth procedure in source; API examples show direct access
```

## Traits
```yaml
- powerable  # UNRESOLVED: no explicit power on/off commands found in source
- queryable  # inferred from GetXxx query commands (GetRoomServerName, GetActiveRoomInfo, GetAllUnitsState, etc.)
- routable  # UNRESOLVED: audio routing matrix present in data models but no explicit routing commands documented
- levelable  # inferred from volume control commands (SetVolumeForRoom, SetDefaultVolumeForRoom)
```

## Actions
```yaml
# General (4.3.1)
- id: connect
  label: Connect
  kind: action
  params: []
  uri: /CoCon/Connect
- id: disconnect
  label: Disconnect
  kind: action
  params:
    - name: Id
      type: string
      description: Connection ID returned by Connect
  uri: /CoCon/Disconnect
- id: subscribe
  label: Subscribe
  kind: action
  params:
    - name: Model
      type: string
      description: Model to subscribe to (Room|Microphone|MeetingAgenda|Voting|Timer|Delegate|Audio|Interpretation|Logging|ButtonLED_Event|Interactive|External|Intercom|Video)
    - name: id
      type: string
      description: Connection ID
    - name: details
      type: boolean
      description: Include detailed updates (default true)
  uri: /CoCon/Subscribe
- id: unsubscribe
  label: Unsubscribe
  kind: action
  params:
    - name: Model
      type: string
    - name: id
      type: string
  uri: /CoCon/Unsubscribe
- id: get_notification
  label: Get Notification
  kind: action
  params:
    - name: id
      type: string
  uri: /CoCon/Notification
- id: reboot_system
  label: Reboot System
  kind: action
  params: []
  uri: /CoCon/RebootSystem

# Room (4.3.2)
- id: get_room_server_name
  label: Get Room Server Name
  kind: query
  params: []
  uri: /CoCon/Room/GetRoomServerName
- id: get_active_room_info
  label: Get Active Room Info
  kind: query
  params: []
  uri: /CoCon/Room/GetActiveRoomInfo
- id: get_status_cu_db_connection
  label: Get Status of CU and DB Connection
  kind: query
  params: []
  uri: /CoCon/Room/GetStatusOfCuAndDbConnection
- id: set_initialization_state
  label: Set Initialization State
  kind: action
  params:
    - name: State
      type: string
      description: "Reset|Stop"
  uri: /CoCon/Room/SetInitializationState
- id: get_all_units_state
  label: Get All Units State
  kind: query
  params:
    - name: RoomId
      type: integer
  uri: /CoCon/Room/GetAllUnitsState
- id: set_default_volume_for_room
  label: Set Default Volume for Room
  kind: action
  params:
    - name: Room
      type: integer
    - name: Volume
      type: integer
      description: Volume level 0-25
  uri: /CoCon/Room/SetDefaultVolumeForRoom
- id: get_default_microphone_mode_for_room
  label: Get Default Microphone Mode for Room
  kind: query
  params: []
  uri: /CoCon/Room/GetDefaultMicrophoneModeForRoom
- id: set_default_microphone_mode_for_room
  label: Set Default Microphone Mode for Room
  kind: action
  params:
    - name: Mode
      type: string
      description: "Operator|DirectSpeak|Request|Vox|OnlyRequest"
    - name: MaxNrActive
      type: integer
    - name: AllowRequest
      type: boolean
    - name: AllowCancelRequest
      type: boolean
    - name: FIFO
      type: boolean
    - name: AllowSwitchOffMic
      type: boolean
  uri: /CoCon/Room/SetDefaultMicrophoneModeForRoom
- id: set_volume_for_room
  label: Set Volume for Room
  kind: action
  params:
    - name: Room
      type: integer
    - name: Volume
      type: integer
      description: Volume level 0-25
  uri: /CoCon/Room/SetVolumeForRoom
- id: add_synoptic
  label: Add Synoptic
  kind: action
  params: []
  uri: /CoCon/Room/AddSynoptic
- id: get_synoptic
  label: Get Synoptic
  kind: query
  params:
    - name: SynopticId
      type: integer
  uri: /CoCon/Room/GetSynoptic
- id: get_all_seats
  label: Get All Seats
  kind: query
  params:
    - name: RoomId
      type: integer
  uri: /CoCon/Room/GetAllSeats
- id: get_booths
  label: Get Booths
  kind: query
  params: []
  uri: /CoCon/Room/GetBooths
- id: edit_seat
  label: Edit Seat
  kind: action
  params:
    - name: SeatNumber
      type: integer
    - name: Intercom
      type: boolean
    - name: Description
      type: string
    - name: IsChairMan
      type: boolean
  uri: /CoCon/Room/EditSeat
- id: get_all_units
  label: Get All Units
  kind: query
  params:
    - name: Type
      type: string
      description: Unit type filter (optional)
  uri: /CoCon/Room/GetAllUnits
- id: set_operating_mode
  label: Set Operating Mode
  kind: action
  params:
    - name: Mode
      type: integer
      description: "0=default, 1=open_access, 2=from_config, 3=auto_init, 4=man_init"
    - name: Append
      type: boolean
    - name: ConfigName
      type: string
  uri: /CoCon/Room/SetOperatingMode
- id: get_operating_mode
  label: Get Operating Mode
  kind: query
  params: []
  uri: /CoCon/Room/GetOperatingMode
- id: clear_all_meeting_and_delegate_data
  label: Clear All Meeting and Delegate Data
  kind: action
  params:
    - name: IncludeService
      type: boolean
  uri: /CoCon/Room/ClearAllMeetingAndDelegateData
- id: set_seat_priority
  label: Set Seat Priority
  kind: action
  params:
    - name: SeatNumber
      type: integer
    - name: Priority
      type: string
      description: "Delegate|Vip|Chairman"
  uri: /CoCon/Room/SetSeatPriority

# Microphone (4.3.3)
- id: microphone_set_state
  label: Set Microphone State
  kind: action
  params:
    - name: State
      type: string
      description: "On|Off|Request|Toggle"
    - name: SeatNr
      type: integer
  uri: /CoCon/Microphone/SetState
- id: microphone_set_mode
  label: Set Microphone Mode
  kind: action
  params:
    - name: Mode
      type: string
    - name: MaxNrActive
      type: integer
    - name: AllowRequest
      type: boolean
    - name: AllowCancelRequest
      type: boolean
    - name: FIFO
      type: boolean
    - name: AllowSwitchOffMic
      type: boolean
  uri: /CoCon/Microphone/SetMicrophoneMode
- id: microphone_get
  label: Get Microphone State
  kind: query
  params:
    - name: SeatNr
      type: integer
  uri: /CoCon/Microphone/Get
- id: microphone_get_state
  label: Get Microphone State
  kind: query
  params: []
  uri: /CoCon/Microphone/GetState
- id: microphone_clear_list
  label: Clear Microphone List
  kind: action
  params: []
  uri: /CoCon/Microphone/ClearMicrophoneList
- id: microphone_get_mode
  label: Get Microphone Mode
  kind: query
  params: []
  uri: /CoCon/Microphone/GetMicrophoneMode
- id: microphone_activate_next
  label: Activate Next Microphone
  kind: action
  params: []
  uri: /CoCon/Microphone/ActivateNextMicrophone

# Meeting Agenda (4.3.4) - UNRESOLVED: many commands; partial list from source
- id: meeting_set_state
  label: Set Meeting State
  kind: action
  params:
    - name: State
      type: string
  uri: /CoCon/MeetingAgenda/SetMeetingState
- id: meeting_start_empty
  label: Start Empty Meeting
  kind: action
  params: []
  uri: /CoCon/MeetingAgenda/StartEmptyMeeting
- id: meeting_get_for_today
  label: Get Meetings For Today
  kind: query
  params: []
  uri: /CoCon/MeetingAgenda/GetMeetingsForToday
- id: meeting_get_by_id
  label: Get Meeting By ID
  kind: query
  params:
    - name: MeetingId
      type: integer
  uri: /CoCon/MeetingAgenda/GetMeetingById
- id: meeting_start_via_template
  label: Start Meeting Via Template
  kind: action
  params:
    - name: TemplateId
      type: integer
  uri: /CoCon/MeetingAgenda/StartMeetingViaMeetingTemplate
- id: meeting_end_active
  label: End Active Meeting
  kind: action
  params: []
  uri: /CoCon/MeetingAgenda/EndActiveMeeting

# Voting (4.3.5) - UNRESOLVED: partial list
- id: voting_set_state
  label: Set Voting State
  kind: action
  params:
    - name: State
      type: string
      description: "Start|Stop|Pause|Clear"
    - name: VotingAgendaItemId
      type: integer
  uri: /CoCon/Voting/SetVotingState
- id: voting_add_instant
  label: Add Instant Vote
  kind: action
  params: []
  uri: /CoCon/Voting/AddInstantVote
- id: voting_get_state
  label: Get Voting State
  kind: query
  params: []
  uri: /CoCon/Voting/GetVotingState
- id: voting_get_results
  label: Get General Voting Results
  kind: query
  params: []
  uri: /CoCon/Voting/GetGeneralVotingResults

# Audio (4.3.9)
- id: audio_get_current_config
  label: Get Current Audio Software Configuration
  kind: query
  params: []
  uri: /CoCon/Audio/GetCurrentAudioSoftwareConfiguration
- id: audio_get_configurations
  label: Get Audio Software Configurations
  kind: query
  params: []
  uri: /CoCon/Audio/GetAudioSoftwareConfigurations
- id: audio_set_config_by_id
  label: Set Audio Software Configuration By ID
  kind: action
  params:
    - name: ConfigurationId
      type: integer
  uri: /CoCon/Audio/SetAudioSoftwareConfigurationById
- id: audio_change_matrix_node
  label: Change Matrix Node Status
  kind: action
  params:
    - name: InputGroupName
      type: string
    - name: OutputGroupName
      type: string
    - name: MixValue
      type: integer
      description: "-100 to 0"
    - name: Status
      type: boolean
  uri: /CoCon/Audio/ChangeMatrixNodeStatus
- id: audio_get_matrix_node_status
  label: Get Matrix Node Status
  kind: query
  params:
    - name: InputGroupName
      type: string
    - name: OutputGroupName
      type: string
  uri: /CoCon/Audio/GetMatrixNodeStatus

# Button LED (4.3.11)
- id: set_buttons_enabled
  label: Set Buttons Enabled
  kind: action
  params:
    - name: SeatNr
      type: integer
    - name: ButtonMask
      type: integer
      description: Button enable mask
  uri: /CoCon/ButtonLED_Event/SetButtonsEnabled
- id: set_led
  label: Set LED
  kind: action
  params:
    - name: SeatNr
      type: integer
    - name: ButtonNr
      type: integer
    - name: Color
      type: string
  uri: /CoCon/ButtonLED_Event/SetLED

# Interpretation (4.3.13)
- id: interpretation_get_all_booths
  label: Get All Booths In Room
  kind: query
  params: []
  uri: /CoCon/Interpretation/GetAllBoothsInRoom
- id: interpretation_add_language
  label: Add Language
  kind: action
  params:
    - name: Language
      type: string
  uri: /CoCon/Interpretation/AddLanguage
- id: interpretation_set_channel
  label: Set Channel
  kind: action
  params:
    - name: ChannelId
      type: integer
    - name: AudioRouting
      type: string
  uri: /CoCon/Interpretation/AddChannel
- id: interpretation_assign_desk_to_booth
  label: Assign Desk To Booth
  kind: action
  params:
    - name: DeskId
      type: integer
    - name: BoothId
      type: integer
  uri: /CoCon/Interpretation/AssignDeskToBooth

# Recording (4.3.15) - Plixus Core / AE-R only
- id: recording_get_files_info
  label: Get Recording Files Info
  kind: query
  params: []
  uri: /CoCon/Recording/GetRecordingFilesInfo
- id: recording_start
  label: Start Recording
  kind: action
  params: []
  uri: /CoCon/Recording/StartRecording
- id: recording_stop
  label: Stop Recording
  kind: action
  params: []
  uri: /CoCon/Recording/StopRecording
- id: recording_get_state
  label: Get Recording State
  kind: query
  params: []
  uri: /CoCon/Recording/GetRecordingState

# Wireless Coupling (4.3.16)
- id: wcap_get_info
  label: Get WCAP Info
  kind: query
  params: []
  uri: /CoCon/WirelessCoupling/GetWcapInfo
- id: wcap_set_coupled_mode
  label: Set WCAP Coupled Mode
  kind: action
  params:
    - name: Coupled
      type: boolean
    - name: SerialNumber
      type: integer
  uri: /CoCon/WirelessCoupling/SetWcapCoupledMode

# Intercom (4.3.19)
- id: intercom_register_to_seat
  label: Register To Seat
  kind: action
  params:
    - name: SeatNr
      type: integer
  uri: /CoCon/Intercom/RegisterToSeat
- id: intercom_get_caller_list
  label: Get Caller List
  kind: query
  params: []
  uri: /CoCon/Intercom/GetCallerList
- id: intercom_request_conversation
  label: Request Conversation
  kind: action
  params:
    - name: ToSeatNr
      type: integer
  uri: /CoCon/Intercom/RequestConversation
- id: intercom_accept_conversation
  label: Accept Conversation
  kind: action
  params:
    - name: CallerId
      type: integer
  uri: /CoCon/Intercom/AcceptConversation
- id: intercom_end_conversation
  label: End Conversation
  kind: action
  params:
    - name: CallerId
      type: integer
  uri: /CoCon/Intercom/EndConversation
```

## Feedbacks
```yaml
# Server-to-client events (4.2)
# Room
- id: initialization_state
  type: object
  fields:
    - name: InitialisationState
      type: string
      description: "Start|Stop|Retrieve|Auto|Reset"
- id: unit_state_changed
  type: object
  fields:
    - name: Id
      type: integer
    - name: State
      type: integer
      description: "0=offline, 1=online"
    - name: BatteryState
      type: integer
    - name: Snr
      type: integer
    - name: PacketLoss
      type: integer
- id: volume_changed_for_room
  type: object
  fields:
    - name: Id
      type: integer
    - name: Volume
      type: integer
- id: unit_error
  type: object
  fields:
    - name: State
      type: string
    - name: UnitId
      type: integer

# Microphone
- id: microphone_state
  type: object
  fields:
    - name: Speakers
      type: array
      items: integer
    - name: Requests
      type: array
      items: integer
    - name: Replies
      type: array
      items: integer
- id: microphone_mode
  type: object
  fields:
    - name: Mode
      type: string
    - name: MaxNrActive
      type: integer
    - name: AllowRequest
      type: boolean
    - name: AllowCancelRequest
      type: boolean
    - name: FIFO
      type: boolean
    - name: AllowSwitchOffMic
      type: boolean
    - name: ReplyRequest
      type: boolean
- id: mic_button_event
  type: object
  fields:
    - name: SeatNr
      type: integer
    - name: Event
      type: string
      description: "up|down"

# Voting
- id: voting_state
  type: object
  fields:
    - name: Id
      type: integer
    - name: State
      type: string
      description: "Start|Stop|Pause|Clear"
    - name: VotingTemplate
      type: string
- id: voting_outcome
  type: object
  fields:
    - name: Id
      type: integer
    - name: VotingOptionId
      type: integer
    - name: Outcome
      type: string
- id: general_voting_results
  type: object
  fields:
    - name: Id
      type: integer
    - name: VotingResults
      type: object

# Timer
- id: meeting_timer_event
  type: object
  fields:
    - name: MeetingTimer
      type: object
- id: delegate_timer_event
  type: object
  fields:
    - name: DelegateTimer
      type: object
- id: group_timer_event
  type: object
  fields:
    - name: GroupTimer
      type: object
- id: seat_timer_event
  type: object
  fields:
    - name: SeatTimer
      type: object

# Delegate
- id: badge_event
  type: object
  fields:
    - name: SeatNr
      type: integer
    - name: Delegate
      type: object
    - name: BadgeInserted
      type: boolean
- id: delegate_on_seat
  type: object
  fields:
    - name: SeatNr
      type: integer
    - name: Delegate
      type: object
    - name: OnSeat
      type: boolean
- id: delegates_in_meeting_updated
  type: object
  fields:
    - name: MeetingId
      type: integer

# Interpretation
- id: i_microphone_state_updated
  type: object
  fields:
    - name: Order
      type: integer
    - name: Language
      type: string
    - name: Booth
      type: string
    - name: Desk
      type: integer
    - name: Micstate
      type: integer
      description: "0=ON, 2=OFF"
- id: i_activated_channel_updated
  type: object
  fields:
    - name: Order
      type: integer
    - name: Language
      type: string
    - name: Booth
      type: string
    - name: Desk
      type: integer
    - name: ActiveChannel
      type: integer
      description: "0=channel A, 1=channel B, 2=channel C"
- id: speak_slower_request
  type: object
  fields:
    - name: UnitId
      type: integer
- id: active_preset_state_changed
  type: object
  fields:
    - name: ActivePresetStateChanged
      type: boolean

# Intercom
- id: caller_unit_state_updated
  type: object
  fields:
    - name: UnitId
      type: integer
    - name: State
      type: integer
      description: "0=Disabled, 1=Enabled, 2=Occupied"
- id: caller_state_updated
  type: object
  fields:
    - name: CallerId
      type: integer
    - name: State
      type: integer
      description: "0=Free, 1=Busy"
- id: conversation_requested
  type: object
  fields:
    - name: FromCid
      type: integer
    - name: FromUid
      type: integer
    - name: ToId
      type: integer
- id: conversation_accepted
  type: object
  fields:
    - name: FromCid
      type: integer
    - name: FromUid
      type: integer
    - name: ToId
      type: integer
- id: conversation_ended
  type: object
  fields:
    - name: FromCid
      type: integer
    - name: FromUid
      type: integer
    - name: ToId
      type: integer

# Button LED
- id: button_pressed
  type: object
  fields:
    - name: SeatNr
      type: integer
    - name: ButtonNr
      type: integer
- id: next_button_pressed
  type: object
  fields:
    - name: UnitId
      type: integer
- id: prior_button_pressed
  type: object
  fields:
    - name: UnitId
      type: integer

# Connection
- id: connection_lost_central_unit
  type: object
  fields:
    - name: State
      type: string
      description: "Connected|Disconnected"
- id: connection_lost_database
  type: object
  fields:
    - name: State
      type: string
      description: "Connected|Disconnected"

# Recording
- id: recording_status_update
  type: object
  fields:
    - name: RecordingState
      type: string
      description: "idle|recording|stopped"

# Wireless Coupling
- id: wcap_info_updated
  type: object
  fields:
    - name: ipa
      type: string
    - name: serial
      type: integer
    - name: online
      type: integer
- id: wcap_coupled_updated
  type: object
  fields:
    - name: CoupledMode
      type: boolean
    - name: WcapSerial
      type: integer
```

## Variables
```yaml
# Data models (4.1) - structures used in requests/responses
# UNRESOLVED: complete model definitions exceed scope; key models noted
- id: meeting
  type: object
  fields:
    - Id: integer
    - Title: string
    - State: string
- id: delegate
  type: object
  fields:
    - Id: integer
    - Name: string
    - VotingRight: boolean
    - VotingWeight: integer
- id: timer
  type: object
  fields:
    - TotalTime: string
    - TimeUsed: string
    - CountingDown: boolean
    - WarningTime: string
- id: audio_matrix_node
  type: object
  fields:
    - InputGroupName: string
    - OutputGroupName: string
    - MixValue: integer
    - Status: boolean
```

## Events
```yaml
# All server-to-client notifications (see Feedbacks section above)
# UNRESOLVED: complete event enumeration exceeds scope
```

## Macros
```yaml
# Multi-step sequences described explicitly in source
# UNRESOLVED: no explicit multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source. Button/LED control noted as unavailable during
# voting sessions (CoCon uses buttons/LEDs for voting functionality).
```

## Notes
- Port 8890 stated in sections 2.1, 2.2, 3.4.2 for both CoCon for Plixus Core and Plixus Core.
- Notification connection timeout: 30 sec; session expiry: 180 sec without get_notification request.
- New notification connection must be created within 60 sec or server discards client data.
- ButtonLED_Event commands unavailable during active voting sessions.
- CoCon for Plixus Core API is a superset of Plixus Core API.
- Long polling used for server-to-client notifications (section 3.1.2).
- Default subscription to all models; ButtonLED_Event excluded by default (blacklisted).
- API client must re-open notification connection after each received event.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: complete command list exceeds 300+ entries; representative subset documented -->
<!-- UNRESOLVED: authentication mechanism not described in source -->
<!-- UNRESOLVED: audio routing command details not fully documented -->
<!-- UNRESOLVED: voting template management commands partial list only -->
<!-- UNRESOLVED: meeting agenda commands partial list only -->

## Provenance

```yaml
source_domains:
  - documents.televic.digital
source_urls:
  - "https://documents.televic.digital/conference/index.php/s/HW2RLc6ifDY9tDJ/download/API%20Document%20for%206.11.pdf"
retrieved_at: 2026-04-30T04:32:41.058Z
last_checked_at: 2026-05-14T18:17:21.227Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.227Z
matched_actions: 62
action_count: 64
confidence: high
summary: "All 62 spec actions matched to documented CoCon API endpoints; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
