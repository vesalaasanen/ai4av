---
spec_id: admin/televic-confidea-wcap-g3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Televic Confidea WCAP G3 Control Spec"
manufacturer: Televic
model_family: "Confidea WCAP G3"
aliases: []
compatible_with:
  manufacturers:
    - Televic
  models:
    - "Confidea WCAP G3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - static.televic-conference.com
  - manualslib.com
  - televic.com
  - manuals.plus
source_urls:
  - https://static.televic-conference.com/confero-customer-api/index.html
  - https://static.televic-conference.com/ConferoManual/Content/03_Technician/13_Settings.htm
  - https://www.manualslib.com/manual/3873342/Televic-Confidea-Wcap-G3.html
  - https://www.televic.com/en/conference/products/features/smart-audio-control/advanced-integration-tools
  - https://manuals.plus/m/e4b32f39ab18a388953d977c4ba39f7919ee60808609d12c8f5469a962fc9c7a
retrieved_at: 2026-07-26T15:37:30.442Z
last_checked_at: 2026-08-05T08:48:36.777Z
generated_at: 2026-08-05T08:48:36.777Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the Confero Customer REST API doc, which applies to any Conference Controller (Plixus Central Unit or WAP). Confirm WCAP G3 firmware ships this API surface and version."
  - "firmware version compatibility range not stated in source"
  - "API version label is \"1.0 OAS3\"; runtime version confirmation against a live WCAP G3 not done"
  - "no fixed default port - 9080 vs 9443 depends on whether an HTTPS certificate has been uploaded"
  - "certificate creation/upload/renewal is client's responsibility; source does not state a default CA"
  - "source does not enumerate every status code; only 200/204 explicitly stated"
  - "source does not document named multi-step sequences. Meeting-action union"
  - "source contains no stated interlock procedures or power-on sequencing; populate only if a"
  - "live endpoint schemas not present in source excerpt — verify against `<ip>/openapi` on a real WCAP G3"
  - "firmware version compatibility range not stated"
  - "exact set of HTTP status codes beyond 200/204 not enumerated"
  - "source does not state whether the WCAP G3 ships the same API version as Plixus Central Unit; assume parity but unverified"
  - "token format / length / character set not specified"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:48:36.777Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions map one-to-one to documented source endpoints with matching HTTP method + path; transport ports and bearer auth verified. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Televic Confidea WCAP G3 Control Spec

## Summary
The Confidea WCAP G3 is a Televic Conference wireless access point / Conference Controller unit. This spec covers the Confero Customer REST API (OAS3 1.0): a REST/JSON control interface hosted on the Conference Controller over TCP/IP, used to subscribe to events and control meetings, discussion, audio, interpretation, recording, room, system, video, and wireless coupling. Notifications are delivered via HTTP long polling against an event store.

<!-- UNRESOLVED: source is the Confero Customer REST API doc, which applies to any Conference Controller (Plixus Central Unit or WAP). Confirm WCAP G3 firmware ships this API surface and version. -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: API version label is "1.0 OAS3"; runtime version confirmation against a live WCAP G3 not done -->

## Transport
```yaml
protocols:
  - http
addressing:
  # Base URL is the Conference Controller's IP address (example from source: http://192.168.0.110:9080/).
  # OpenAPI/Swagger spec is served at <ip_conference_controller>/openapi
  base_url: "http://{ip_conference_controller}"  # {ip} supplied at runtime
  port: 9080  # HTTP (insecure) when no certificate uploaded; 9443 when HTTPS certificate uploaded
auth:
  type: bearer  # bearer token in Authorization header; token generated in Confero "API Settings & Types" tab
  notes: "Authorization: Bearer <token>. Calls without a valid token are not executed. Tokens are generated/revoked via the Confero UI."
# UNRESOLVED: no fixed default port - 9080 vs 9443 depends on whether an HTTPS certificate has been uploaded
# UNRESOLVED: certificate creation/upload/renewal is client's responsibility; source does not state a default CA
```

## Traits
```yaml
# Inferred from documented command surface
traits:
  - queryable  # inferred: many GET endpoints return state (audio config, discussion seats, meeting, recording, etc.)
  - levelable  # inferred: loudspeaker volume and default channel selector volume PUT endpoints
  # NOTE: powerable / routable not inferred - no power on/off command and no A/V input-output routing matrix in source
```

## Actions
```yaml
# Source: Confero Customer REST API 1.0 OAS3. Every documented endpoint listed as a distinct action.
# HTTP method + path is the literal command payload (verbatim from source).
# GET endpoints are kind: query; POST/PUT/PATCH/DELETE are kind: action.
# Path variables ({...}) are parameterized; no query/body schemas expanded here (source lists schemas by name only).

# ---- Audio module ----
- id: audio_get_configurations
  label: Get Audio Configurations
  kind: query
  module: Audio
  command: "GET /api/audio/configurations"
  params: []

- id: audio_activate_configuration
  label: Activate Audio Configuration
  kind: action
  module: Audio
  command: "POST /api/audio/configurations/{id}/activate"
  params:
    - name: id
      type: string
      description: Identifier of the audio configuration to activate

- id: audio_get_default_channel_selector_volume
  label: Get Default Channel Selector Volume
  kind: query
  module: Audio
  command: "GET /api/audio/defaultchannelselectorvolume"
  params: []

- id: audio_set_default_channel_selector_volume
  label: Set Default Channel Selector Volume
  kind: action
  module: Audio
  command: "PUT /api/audio/defaultchannelselectorvolume"
  params:
    - name: body
      type: Volume
      description: Volume payload (schema 'Volume' from source)

- id: audio_push_default_channel_selector_volume
  label: Push Default Channel Selector Volume To Units
  kind: action
  module: Audio
  command: "PUT /api/audio/defaultchannelselectorvolume/push"
  params: []

- id: audio_get_loudspeaker_volume
  label: Get Loudspeaker Volume
  kind: query
  module: Audio
  command: "GET /api/audio/loudspeakervolume"
  params: []

- id: audio_set_loudspeaker_volume
  label: Set Loudspeaker Volume
  kind: action
  module: Audio
  command: "PUT /api/audio/loudspeakervolume"
  params:
    - name: body
      type: Volume
      description: Volume payload (schema 'Volume' from source)

- id: audio_get_seat_input_sensitivity_offset
  label: Get Seat Input Sensitivity Offset
  kind: query
  module: Audio
  command: "GET /api/audio/seats/{seat_id}/inputsensitivityoffset"
  params:
    - name: seat_id
      type: string
      description: Seat identifier

- id: audio_set_seat_input_sensitivity_offset
  label: Set Seat Input Sensitivity Offset
  kind: action
  module: Audio
  command: "PUT /api/audio/seats/{seat_id}/inputsensitivityoffset"
  params:
    - name: seat_id
      type: string
      description: Seat identifier
    - name: body
      type: InputSensitivityOffset
      description: Sensitivity offset payload (schema 'InputSensitivityOffset' from source)

# ---- Device module ----
- id: device_list_devices
  label: List Devices
  kind: query
  module: Device
  command: "GET /api/device/devices"
  params: []

- id: device_get_device
  label: Get Device By Serial
  kind: query
  module: Device
  command: "GET /api/device/devices/{serial}"
  params:
    - name: serial
      type: string
      description: Device serial number

- id: device_perform_action
  label: Perform Device Action
  kind: action
  module: Device
  command: "POST /api/device/devices/actions"
  params:
    - name: body
      type: DevicesAction
      description: Action payload (schema 'DevicesAction' from source)

# ---- Discussion module ----
- id: discussion_get_settings
  label: Get Discussion Settings
  kind: query
  module: Discussion
  command: "GET /api/discussion/settings"
  params: []

- id: discussion_set_settings
  label: Set Discussion Settings
  kind: action
  module: Discussion
  command: "PUT /api/discussion/settings"
  params:
    - name: body
      type: DiscussionSettings
      description: Discussion settings payload (schemas 'DiscussionSettings*' from source)

- id: discussion_get_all_seats
  label: Get Discussion State Of All Seats
  kind: query
  module: Discussion
  command: "GET /api/discussion/seats"
  params: []

- id: discussion_get_seat
  label: Get Discussion State Of Seat
  kind: query
  module: Discussion
  command: "GET /api/discussion/seats/{seat}"
  params:
    - name: seat
      type: string
      description: Seat identifier

- id: discussion_set_seat
  label: Set Discussion State Of Seat
  kind: action
  module: Discussion
  command: "PUT /api/discussion/seats/{seat}"
  params:
    - name: seat
      type: string
      description: Seat identifier
    - name: body
      type: SeatDiscussionState
      description: Discussion state payload (schema 'SeatDiscussionState' from source)

- id: discussion_get_speakers
  label: Get Speaker List
  kind: query
  module: Discussion
  command: "GET /api/discussion/speakers"
  params: []

- id: discussion_clear_all_speakers
  label: Clear All Speakers (Delegates And Chairpersons)
  kind: action
  module: Discussion
  command: "DELETE /api/discussion/speakers"
  params: []

- id: discussion_clear_delegate_speakers
  label: Clear Delegate Speakers
  kind: action
  module: Discussion
  command: "DELETE /api/discussion/speakers/delegates"
  params: []

- id: discussion_get_requests
  label: Get Request List
  kind: query
  module: Discussion
  command: "GET /api/discussion/requests"
  params: []

- id: discussion_clear_requests
  label: Clear All Requests
  kind: action
  module: Discussion
  command: "DELETE /api/discussion/requests"
  params: []

# ---- Interpretation module ----
- id: interpretation_get_active_channels
  label: Get Active Interpretation Channels
  kind: query
  module: Interpretation
  command: "GET /api/interpretation/configurations/active/channels"
  params: []

- id: interpretation_patch_active_channel
  label: Patch Active Interpretation Channel
  kind: action
  module: Interpretation
  command: "PATCH /api/interpretation/configurations/active/channels/{id}"
  notes: "Changes to active configuration are not persistent across reboots; selected preset restored after reboot."
  params:
    - name: id
      type: string
      description: Channel identifier
    - name: body
      type: InterpretationChannelPatch
      description: Channel patch payload (schema 'InterpretationChannelPatch' from source)

# ---- Meeting module ----
- id: meeting_get_scheduled_meetings
  label: Get Scheduled Meetings
  kind: query
  module: Meeting
  command: "GET /api/meeting/scheduled-meetings"
  params: []

- id: meeting_get_open_meeting
  label: Get Open Meeting
  kind: query
  module: Meeting
  command: "GET /api/meeting"
  params: []

- id: meeting_post_meeting
  label: Create / Post Meeting
  kind: action
  module: Meeting
  command: "POST /api/meeting"
  params:
    - name: body
      type: NewOpenMeeting
      description: New meeting payload (schemas 'NewOpenMeeting*' / 'NewMeetingFrom*' from source)

- id: meeting_close_open_meeting
  label: Close Open Meeting
  kind: action
  module: Meeting
  command: "DELETE /api/meeting"
  params: []

- id: meeting_post_action
  label: Post Action On Open Meeting
  kind: action
  module: Meeting
  command: "POST /api/meeting/actions"
  params:
    - name: body
      type: OpenMeetingAction
      description: Meeting action payload (union of 'OpenMeeting*Action' schemas from source)

- id: meeting_get_participant
  label: Get Meeting Participant
  kind: query
  module: Meeting
  command: "GET /api/meeting/participants/{participantId}"
  params:
    - name: participantId
      type: string
      description: Participant identifier

- id: meeting_get_voting_results
  label: Get Voting Results
  kind: query
  module: Meeting
  command: "GET /api/meeting/voting-results"
  params: []

# ---- Notification module ----
- id: notification_get_modules
  label: Get Notification Modules
  kind: query
  module: Notification
  command: "GET /api/notification/modules"
  params: []

- id: notification_get_events
  label: Get Next Event (Long Poll)
  kind: query
  module: Notification
  command: "GET /api/notification/events?include-filter={modules}&minimal-id={id}"
  notes: "include-filter is mandatory, comma-separated module list. minimal-id is optional (= last seen id + 1). Long-polls until event or timeout (HTTP 204 on timeout, HTTP 200 + JSON event body otherwise)."
  params:
    - name: include-filter
      type: string
      description: Comma-separated module filter (e.g. Audio,Discussion)
    - name: minimal-id
      type: integer
      description: Last seen event id + 1; omit for fresh long poll

# ---- Recording module ----
- id: recording_get_state
  label: Get Recording State
  kind: query
  module: Recording
  command: "GET /api/recording/state"
  params: []

- id: recording_set_state
  label: Change Recording State
  kind: action
  module: Recording
  command: "PUT /api/recording/state"
  params:
    - name: body
      type: RecordingState
      description: Recording state payload (schema 'RecordingState' from source)

# ---- Room module ----
- id: room_patch_seat
  label: Modify Room Seat (Role Only)
  kind: action
  module: Room
  command: "PATCH /api/room/seats/{seat}"
  notes: "Only seat role can be changed."
  params:
    - name: seat
      type: string
      description: Seat identifier
    - name: body
      type: Seat
      description: Seat patch payload (schema 'Seat' / 'Role' from source)

- id: room_get_discussion_seats
  label: Get Discussion Seats
  kind: query
  module: Room
  command: "GET /api/room/seats/discussion"
  params: []

- id: room_get_discussion_seat
  label: Get Discussion Seat
  kind: query
  module: Room
  command: "GET /api/room/seats/discussion/{seat}"
  params:
    - name: seat
      type: string
      description: Seat identifier

# ---- System module ----
- id: system_reboot
  label: Reboot System
  kind: action
  module: System
  command: "POST /api/system/reboot"
  params: []

- id: system_get_reordering_state
  label: Get Seat Reordering State
  kind: query
  module: System
  command: "GET /api/system/reordering-state"
  params: []

- id: system_set_reordering_state
  label: Set Seat Reordering State
  kind: action
  module: System
  command: "PUT /api/system/reordering-state"
  params:
    - name: body
      type: SeatReorderingState
      description: Reordering state payload (schema 'SeatReorderingState' from source)

# ---- Video module ----
- id: video_get_configurations
  label: Get Video Configurations
  kind: query
  module: Video
  command: "GET /api/video/configurations"
  params: []

- id: video_activate_configuration
  label: Activate Video Configuration
  kind: action
  module: Video
  command: "POST /api/video/configurations/{id}/activate"
  params:
    - name: id
      type: string
      description: Identifier of the video configuration to activate

# ---- WirelessCoupling module ----
- id: wirelesscoupling_get_state
  label: Get Wireless Coupling State And Pairing Mode
  kind: query
  module: WirelessCoupling
  command: "GET /api/wirelesscoupling"
  params: []

- id: wirelesscoupling_get_coupled_state
  label: Get Wireless Coupling State Of Access Point
  kind: query
  module: WirelessCoupling
  command: "GET /api/wirelesscoupling/{serial}/coupled-state"
  params:
    - name: serial
      type: string
      description: Access point serial number

- id: wirelesscoupling_set_coupled_state
  label: Set Wireless Coupling State Of Access Point
  kind: action
  module: WirelessCoupling
  command: "PUT /api/wirelesscoupling/{serial}/coupled-state"
  params:
    - name: serial
      type: string
      description: Access point serial number
    - name: body
      type: CoupledState
      description: Coupled-state payload (schema 'CoupledState' from source)

- id: wirelesscoupling_get_pairing_mode
  label: Get Pairing Mode Of Access Point
  kind: query
  module: WirelessCoupling
  command: "GET /api/wirelesscoupling/{serial}/pairing-mode"
  params:
    - name: serial
      type: string
      description: Access point serial number

- id: wirelesscoupling_set_pairing_mode
  label: Set Pairing Mode Of Access Point
  kind: action
  module: WirelessCoupling
  command: "PUT /api/wirelesscoupling/{serial}/pairing-mode"
  params:
    - name: serial
      type: string
      description: Access point serial number
    - name: body
      type: WirelessPairingMode
      description: Pairing-mode payload (schemas 'WirelessPairingMode*' from source)

- id: wirelesscoupling_get_paired_devices
  label: Get Paired Devices
  kind: query
  module: WirelessCoupling
  command: "GET /api/wirelesscoupling/paired-devices"
  params: []

- id: wirelesscoupling_clear_paired_devices
  label: Clear All Paired Devices
  kind: action
  module: WirelessCoupling
  command: "DELETE /api/wirelesscoupling/paired-devices"
  params: []

- id: wirelesscoupling_delete_paired_device
  label: Delete Paired Device (Or All Devices On Access Point)
  kind: action
  module: WirelessCoupling
  command: "DELETE /api/wirelesscoupling/paired-devices/{serial}"
  notes: "Deletes one device; if {serial} is an access point, deletes all devices from that access point."
  params:
    - name: serial
      type: string
      description: Device serial, or access point serial to clear that AP
```

## Feedbacks
```yaml
# API uses HTTP response codes for request feedback; long-poll returns HTTP 200 (event) or HTTP 204 (timeout no-content).
# Per-event payloads are JSON with fields: id, discontinuity, module, name, data.
- id: http_response_code
  type: enum
  values: [200, 204, 4xx, 5xx]  # UNRESOLVED: source does not enumerate every status code; only 200/204 explicitly stated
  notes: "200 = event delivered; 204 = long-poll timeout, no content. Other codes not enumerated in source."

- id: notification_event_envelope
  type: object
  fields:
    id: integer  # event id
    discontinuity: boolean  # whether an event was missed
    module: string  # source module
    name: string  # event name
    data: object  # event-specific payload
  notes: "Envelope for all events returned by GET /api/notification/events"
```

## Variables
```yaml
# Settable parameters exposed as standalone variables (state that is GET + PUT/PATCH):
- name: default_channel_selector_volume
  type: integer
  access: [read, write]
  schema: Volume
  notes: "Room-wide default channel selector volume"

- name: loudspeaker_volume
  type: integer
  access: [read, write]
  schema: Volume
  notes: "Room loudspeaker volume"

- name: seat_input_sensitivity_offset
  type: object
  access: [read, write]
  schema: InputSensitivityOffset
  notes: "Per-seat input sensitivity offset (keyed by seat_id)"

- name: discussion_settings
  type: object
  access: [read, write]
  schema: DiscussionSettings
  notes: "Microphone mode, activation type, LED color settings"

- name: recording_state
  type: object
  access: [read, write]
  schema: RecordingState

- name: seat_reordering_state
  type: object
  access: [read, write]
  schema: SeatReorderingState

- name: seat_role
  type: enum
  access: [write]
  schema: Role
  notes: "Seat role; only role is patchable on a room seat"
```

## Events
```yaml
# Unsolicited (server-to-client) events delivered via the long-poll notification connection.
# Source documents these as GET /api/events/... documentation-only paths; each is a distinct event name.
# Every module's documented event is listed verbatim.
- id: audio_configurations_changed
  module: Audio
  name: ConfigurationsChanged
  path: "GET /api/events/audio/ConfigurationsChanged"
  description: Available audio configurations changed

- id: audio_loudspeaker_volume_changed
  module: Audio
  name: LoudspeakerVolumeChanged
  path: "GET /api/events/audio/LoudspeakerVolumeChanged"
  description: Loudspeaker volume in the room changed

- id: audio_default_channel_selector_volume_changed
  module: Audio
  name: DefaultChannelSelectorVolumeChanged
  path: "GET /api/events/audio/DefaultChannelSelectorVolumeChanged"
  description: Default channel selector volume changed

- id: device_added
  module: Device
  name: DeviceAdded
  path: "GET /api/events/device/DeviceAdded"
  description: New device added

- id: device_removed
  module: Device
  name: DeviceRemoved
  path: "GET /api/events/device/DeviceRemoved"
  description: Device removed

- id: device_changed
  module: Device
  name: DeviceChanged
  path: "GET /api/events/device/DeviceChanged"
  description: Device changed

- id: discussion_seat_changed
  module: Discussion
  name: SeatChanged
  path: "GET /api/events/discussion/SeatChanged"
  description: Discussion state of a seat changed

- id: discussion_settings_changed
  module: Discussion
  name: SettingsChanged
  path: "GET /api/events/discussion/SettingsChanged"
  description: Room discussion settings changed

- id: discussion_speakers_changed
  module: Discussion
  name: SpeakersChanged
  path: "GET /api/events/discussion/SpeakersChanged"
  description: Speaker list changed

- id: discussion_requests_changed
  module: Discussion
  name: RequestsChanged
  path: "GET /api/events/discussion/RequestsChanged"
  description: Request list changed

- id: interpretation_active_configuration_channels_changed
  module: Interpretation
  name: ActiveConfigurationChannelsChanged
  path: "GET /api/events/interpretation/ActiveConfigurationChannelsChanged"
  description: Interpretation channels in the active configuration changed

- id: meeting_scheduled_meetings_changed
  module: Meeting
  name: ScheduledMeetingsChanged
  path: "GET /api/events/meeting/ScheduledMeetingsChanged"
  description: List of scheduled meetings changed

- id: meeting_meeting_state_changed
  module: Meeting
  name: MeetingStateChanged
  path: "GET /api/events/meeting/MeetingStateChanged"
  description: Meeting state changed

- id: meeting_participant_added
  module: Meeting
  name: ParticipantAdded
  path: "GET /api/events/meeting/ParticipantAdded"
  description: Participant added to a running meeting

- id: meeting_participant_removed
  module: Meeting
  name: ParticipantRemoved
  path: "GET /api/events/meeting/ParticipantRemoved"
  description: Participant removed from a running meeting

- id: meeting_participant_changed
  module: Meeting
  name: ParticipantChanged
  path: "GET /api/events/meeting/ParticipantChanged"
  description: Participant in a running meeting changed

- id: meeting_participant_presence_changed
  module: Meeting
  name: ParticipantPresenceChanged
  path: "GET /api/events/meeting/ParticipantPresenceChanged"
  description: Participant presence changed

- id: meeting_voting_results_changed
  module: Meeting
  name: VotingResultsChanged
  path: "GET /api/events/meeting/VotingResultsChanged"
  description: Voting results changed

- id: recording_state_changed
  module: Recording
  name: StateChanged
  path: "GET /api/events/recording/StateChanged"
  description: Recording state changed

- id: room_seat_added
  module: Room
  name: SeatAdded
  path: "GET /api/events/room/SeatAdded"
  description: A seat got added

- id: room_seat_removed
  module: Room
  name: SeatRemoved
  path: "GET /api/events/room/SeatRemoved"
  description: A seat got removed

- id: room_seat_changed
  module: Room
  name: SeatChanged
  path: "GET /api/events/room/SeatChanged"
  description: A seat got changed

- id: system_seat_reordering_state_changed
  module: System
  name: SeatReorderingStateChanged
  path: "GET /api/events/system/SeatReorderingStateChanged"
  description: Reordering state of seats in the room changed

- id: video_configurations_changed
  module: Video
  name: ConfigurationsChanged
  path: "GET /api/events/video/ConfigurationsChanged"
  description: Available video configurations changed

- id: wirelesscoupling_access_point_changed
  module: WirelessCoupling
  name: AccesPointChanged
  path: "GET /api/events/wirelesscoupling/AccesPointChanged"
  description: Access point changed pairing mode or coupling states when connected to a CU
```

## Macros
```yaml
# UNRESOLVED: source does not document named multi-step sequences. Meeting-action union
# (POST /api/meeting/actions) accepts discrete single-step actions (start/stop discussion, start/stop voting,
# add/remove participant, set presence, set/clear badge, set name) but does not bundle them into macros.
```

## Safety
```yaml
confirmation_required_for:
  - action_id: system_reboot
    reason: "Reboots the Conference Controller; source documents POST /api/system/reboot as a system action."
  - action_id: wirelesscoupling_clear_paired_devices
    reason: "Clears the entire paired-device list."
  - action_id: wirelesscoupling_delete_paired_device
    reason: "When {serial} is an access point, deletes all devices from that AP."
  - action_id: meeting_close_open_meeting
    reason: "Closes the open meeting."
  - action_id: discussion_clear_all_speakers
    reason: "Clears all speaking delegates and chairpersons."
  - action_id: discussion_clear_delegate_speakers
    reason: "Clears all speaking delegates."
  - action_id: discussion_clear_requests
    reason: "Clears all request-to-speak entries."
interlocks: []
notes: |
  Source describes no explicit hardware interlocks or power-on sequencing. Confirmation list above is
  inferred from the destructive/global effect of each documented endpoint, not from explicit source warnings.
# UNRESOLVED: source contains no stated interlock procedures or power-on sequencing; populate only if a
# later source (installation manual, release notes) documents them.
```

## Notes
- API is a REST/JSON API. Served OpenAPI/Swagger spec at `<ip_conference_controller>/openapi` — authoritative for live schemas; this spec reflects the static PDF document.
- Two parallel HTTP connections are expected: one kept-open notification connection (long-poll on `GET /api/notification/events`) plus any number of control connections.
- Long polling: notification connection held open; server returns HTTP 200 + JSON event when an event matching the include-filter occurs, or HTTP 204 No Content on timeout. Client must immediately re-open the connection after each response.
- Event-store model: every event has a monotonic id. Client must track last-seen id and pass `minimal-id = last_seen + 1`. Omitting `minimal-id` risks missed events (source warns explicitly).
- Performance guidance from source: limit number of connections, keep connections open (especially notification), only subscribe to needed modules.
- HTTPS (port 9443) requires an uploaded certificate; HTTP (port 9080) is the no-certificate fallback. Certificate creation/upload/renewal is the client's responsibility — source recommends a CA-signed certificate over self-signed.
- Auth is a bearer token in the `Authorization` header. Tokens are generated/edited/revoked in the Confero "API Settings & Types" tab. No calls execute without a valid token.
- Source lists schema names (e.g. `Volume`, `DiscussionSettings`, `OpenMeetingAction`) but does not expand field-level definitions in the refined excerpt; field-level validation requires the live `/openapi` endpoint.

<!-- UNRESOLVED: live endpoint schemas not present in source excerpt — verify against `<ip>/openapi` on a real WCAP G3 -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: exact set of HTTP status codes beyond 200/204 not enumerated -->
<!-- UNRESOLVED: source does not state whether the WCAP G3 ships the same API version as Plixus Central Unit; assume parity but unverified -->
<!-- UNRESOLVED: token format / length / character set not specified -->
````

## Provenance

```yaml
source_domains:
  - static.televic-conference.com
  - manualslib.com
  - televic.com
  - manuals.plus
source_urls:
  - https://static.televic-conference.com/confero-customer-api/index.html
  - https://static.televic-conference.com/ConferoManual/Content/03_Technician/13_Settings.htm
  - https://www.manualslib.com/manual/3873342/Televic-Confidea-Wcap-G3.html
  - https://www.televic.com/en/conference/products/features/smart-audio-control/advanced-integration-tools
  - https://manuals.plus/m/e4b32f39ab18a388953d977c4ba39f7919ee60808609d12c8f5469a962fc9c7a
retrieved_at: 2026-07-26T15:37:30.442Z
last_checked_at: 2026-08-05T08:48:36.777Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:48:36.777Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions map one-to-one to documented source endpoints with matching HTTP method + path; transport ports and bearer auth verified. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the Confero Customer REST API doc, which applies to any Conference Controller (Plixus Central Unit or WAP). Confirm WCAP G3 firmware ships this API surface and version."
- "firmware version compatibility range not stated in source"
- "API version label is \"1.0 OAS3\"; runtime version confirmation against a live WCAP G3 not done"
- "no fixed default port - 9080 vs 9443 depends on whether an HTTPS certificate has been uploaded"
- "certificate creation/upload/renewal is client's responsibility; source does not state a default CA"
- "source does not enumerate every status code; only 200/204 explicitly stated"
- "source does not document named multi-step sequences. Meeting-action union"
- "source contains no stated interlock procedures or power-on sequencing; populate only if a"
- "live endpoint schemas not present in source excerpt — verify against `<ip>/openapi` on a real WCAP G3"
- "firmware version compatibility range not stated"
- "exact set of HTTP status codes beyond 200/204 not enumerated"
- "source does not state whether the WCAP G3 ships the same API version as Plixus Central Unit; assume parity but unverified"
- "token format / length / character set not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
