---
spec_id: admin/polycom-poly-studio-x-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Polycom Poly Studio X Series REST API Control Spec"
manufacturer: Polycom
model_family: "Poly G7500"
aliases: []
compatible_with:
  manufacturers:
    - Polycom
  models:
    - "Poly G7500"
    - "Poly Studio X50"
    - "Poly Studio X30"
  firmware: "3.1.0\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - polycom-moscow.ru
  - kaas.hpcloud.hp.com
  - api.lens.poly.com
source_urls:
  - https://polycom-moscow.ru/pdf/poly-video-restapi.pdf
  - https://kaas.hpcloud.hp.com/pdf-public/pdf_9122921_en-US-1.pdf
  - https://kaas.hpcloud.hp.com/pdf-public/pdf_9121204_en-US-1.pdf
  - https://kaas.hpcloud.hp.com/pdf-public/pdf_8740172_en-US-1.pdf
  - https://api.lens.poly.com
retrieved_at: 2026-06-10T23:39:53.509Z
last_checked_at: 2026-06-11T13:44:55.390Z
generated_at: 2026-06-11T13:44:55.390Z
firmware_coverage: "3.1.0\""
protocol_coverage: []
known_gaps:
  - "HTTPS port not stated in source (commonly 443)"
  - "exact auth header scheme not stated (Basic vs Digest vs custom token). Source only documents the /rest/session login returning a sessionId."
  - "most system configuration setters are out of scope of this refined doc"
  - "source describes GET-based state queries only; no unsolicited"
  - "source does not document any multi-step macro sequences."
  - "source does not document safety warnings, interlock procedures,"
  - "webhook / event-stream notification endpoints; HTTPS port number; auth header scheme; firmware version compatibility ranges across G7500 / X50 / X30; applicable return codes row missing on some endpoints."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:44:55.390Z
  matched_actions: 98
  action_count: 98
  confidence: medium
  summary: "All 98 spec actions match documented source endpoints with correct paths, methods, and shapes; base_url /rest confirmed; no extra source endpoints. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Polycom Poly Studio X Series REST API Control Spec

## Summary
REST API for Poly G7500, Poly Studio X50, and Poly Studio X30 video systems running Poly VideoOS 3.1.x. All endpoints are HTTPS; bodies are JSON. Administrator credentials required for authentication.

<!-- UNRESOLVED: HTTPS port not stated in source (commonly 443) -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: /rest  # source: every endpoint path begins with /rest
auth:
  type: basic  # inferred: source states "Administrator credentials are required for access authentication"; no specific scheme named, but /rest/session takes {user, password} in JSON body
  # UNRESOLVED: exact auth header scheme not stated (Basic vs Digest vs custom token). Source only documents the /rest/session login returning a sessionId.
```

## Traits
```yaml
- queryable  # inferred: many GET endpoints return device state
- routable   # inferred: camera select, input select commands present
- levelable  # inferred: audio/volume POST present
```

## Actions
```yaml
- id: audio_get
  label: Get audio state
  kind: query
  method: GET
  path: /rest/audio
- id: audio_action
  label: Audio action (DTMF / test tone / itpSegmentDetection)
  kind: action
  method: POST
  path: /rest/audio
  body_schema:
    action: string  # start | playDTMF | playTestTone | stopPlayingTestTone | itpSegmentDetection
    dtmfChar: string
    speaker: string  # SPEAKER_LEFT | SPEAKER_RIGHT | SPEAKER_BOTH
- id: audio_acousticfence_action
  label: Acoustic fence action
  kind: action
  method: POST
  path: /rest/audio/acousticfence
  body_schema:
    action: string
    dtmfChar: string
    speaker: string
- id: audio_audiometers_get
  label: Get audio meter info
  kind: query
  method: GET
  path: /rest/audio/audiometers
- id: audio_microphones_get
  label: Get microphone list
  kind: query
  method: GET
  path: /rest/audio/microphones
- id: audio_muted_get
  label: Get mic mute status
  kind: query
  method: GET
  path: /rest/audio/muted
- id: audio_muted_set
  label: Set mic mute
  kind: action
  method: POST
  path: /rest/audio/muted
  body_schema:
    boolean: true_to_mute_false_to_unmute
- id: audio_volume_get
  label: Get audio volume
  kind: query
  method: GET
  path: /rest/audio/volume
- id: audio_volume_set
  label: Set audio volume
  kind: action
  method: POST
  path: /rest/audio/volume
  body_schema:
    integer: volume_level

- id: calendar_get
  label: Get calendar server status
  kind: query
  method: GET
  path: /rest/calendar
- id: calendar_meetings_get
  label: Get calendar meetings
  kind: query
  method: GET
  path: /rest/calendar/meetings
  query_schema:
    number: integer  # max upcoming events
    start: integer   # epoch seconds
    end: integer     # epoch seconds
- id: calendar_meetings_get_one
  label: Get single meeting
  kind: query
  method: GET
  path: /rest/calendar/meetings/{meetingId}
  path_params:
    - name: meetingId
      type: string
- id: calendar_meetings_dial
  label: Dial calendar meeting
  kind: action
  method: POST
  path: /rest/calendar/meetings/{meetingId}
  path_params:
    - name: meetingId
      type: string
- id: calendar_discover
  label: Discover calendar server
  kind: action
  method: POST
  path: /rest/calendar/discover
  body_schema:
    domain: string  # sip | email
    email: string
    username: string
    password: string
    userdomain: string

- id: cameras_sourceselectable_get
  label: Get near source selection availability
  kind: query
  method: GET
  path: /rest/cameras/sourceselectable
- id: cameras_contentstatus_get
  label: Get content status
  kind: query
  method: GET
  path: /rest/cameras/contentstatus
- id: cameras_near_all_get
  label: Get all near camera sources
  kind: query
  method: GET
  path: /rest/cameras/near/all
- id: cameras_near_people_get
  label: Get all near people camera sources
  kind: query
  method: GET
  path: /rest/cameras/near/people
- id: cameras_near_content_get
  label: Get all near content camera sources
  kind: query
  method: GET
  path: /rest/cameras/near/content
- id: cameras_near_source_get
  label: Get near camera by sourceID
  kind: query
  method: GET
  path: /rest/cameras/near/{sourceID}
  path_params:
    - name: sourceID
      type: string
- id: cameras_near_source_move
  label: Move near camera by sourceID
  kind: action
  method: POST
  path: /rest/cameras/near/{sourceID}
  path_params:
    - name: sourceID
      type: string
  body_schema:
    action: string  # moveStart | moveStop | store | clear | activate
    direction: string  # MOVE_LEFT|MOVE_RIGHT|MOVE_UP|MOVE_DOWN|MOVE_ZOOMIN|MOVE_ZOOMOUT|MOVE_FOCUSNEAR|MOVE_FOCUSFAR
    message: string  # LeftCamera|RightCamera|BothCamera
    withImage: string  # Yes|No
- id: cameras_near_selectedpeople_get
  label: Get selected near people camera
  kind: query
  method: GET
  path: /rest/cameras/near/selectedpeople
- id: cameras_near_selectedpeople_move
  label: Move selected near people camera
  kind: action
  method: POST
  path: /rest/cameras/near/selectedpeople
  body_schema:
    action: string
    direction: string
    message: string
    withImage: string
- id: cameras_near_selectedcontent_get
  label: Get selected near content camera
  kind: query
  method: GET
  path: /rest/cameras/near/selectedcontent
- id: cameras_near_selectedcontent_move
  label: Move selected near content camera
  kind: action
  method: POST
  path: /rest/cameras/near/selectedcontent
  body_schema:
    action: string
    direction: string
    message: string
    withImage: string
- id: cameras_near_presets_all_get
  label: Get all near camera presets
  kind: query
  method: GET
  path: /rest/cameras/near/presets/all
- id: cameras_near_presets_index_get
  label: Get near camera preset at index
  kind: query
  method: GET
  path: /rest/cameras/near/presets/{index}
  path_params:
    - name: index
      type: integer
- id: cameras_near_presets_index_update
  label: Update near camera preset at index
  kind: action
  method: POST
  path: /rest/cameras/near/presets/{index}
  path_params:
    - name: index
      type: integer
  body_schema:
    action: string
    direction: string
    message: string
    withImage: string
- id: cameras_near_position_move
  label: Move near camera to position
  kind: action
  method: POST
  path: /rest/cameras/near/position/{sourceID}
  path_params:
    - name: sourceID
      type: string  # valid: SELECTED_PEOPLE
  body_schema:
    camPosition:
      pan: integer  # -50000..50000
      tilt: integer
      zoom: integer
    relative: boolean
- id: cameras_far_all_get
  label: Get all far camera sources
  kind: query
  method: GET
  path: /rest/cameras/far/all
- id: cameras_far_selectedpeople_get
  label: Get selected far people camera
  kind: query
  method: GET
  path: /rest/cameras/far/selectedpeople
- id: cameras_far_selectedpeople_move
  label: Move selected far people camera
  kind: action
  method: POST
  path: /rest/cameras/far/selectedpeople
  body_schema:
    action: string
    direction: string
    message: string
    withImage: string
- id: cameras_far_source_get
  label: Get far camera by sourceID
  kind: query
  method: GET
  path: /rest/cameras/far/{sourceID}
  path_params:
    - name: sourceID
      type: string
- id: cameras_far_source_move
  label: Move far camera by sourceID
  kind: action
  method: POST
  path: /rest/cameras/far/{sourceID}
  path_params:
    - name: sourceID
      type: string
  body_schema:
    action: string
    direction: string
    message: string
    withImage: string
- id: cameras_snapshot_get
  label: Get camera snapshot
  kind: query
  method: GET
  path: /rest/cameras/snapshot/{snapshotID}
  path_params:
    - name: snapshotID
      type: string  # near_image_1.jpg | far_image_1.jpg | content_image_1.jpg

- id: collaboration_get
  label: Get collaboration session state
  kind: query
  method: GET
  path: /rest/collaboration
- id: collaboration_end
  label: End collaboration session
  kind: action
  method: POST
  path: /rest/collaboration
  body_schema:
    action: END
- id: collaboration_content_start
  label: Begin content save
  kind: action
  method: POST
  path: /rest/collaboration/content
  query_schema:
    pin: string
- id: collaboration_content_get
  label: Get saved content
  kind: query
  method: GET
  path: /rest/collaboration/content
  query_schema:
    pin: string
    context-id: string
- id: collaboration_contentsavestatus_get
  label: Get content save status
  kind: query
  method: GET
  path: /rest/collaboration/contentsavestatus
  query_schema:
    pin: string
    context-id: string
- id: collaboration_content_all_get
  label: Download all saved content (ZIP)
  kind: query
  method: GET
  path: /rest/collaboration/content/all
  query_schema:
    pin: string

- id: conferences_get
  label: Get list of active conferences
  kind: query
  method: GET
  path: /rest/conferences
- id: conferences_dial
  label: Dial single participant conference call
  kind: action
  method: POST
  path: /rest/conferences
  body_schema:
    address: string
    rate: integer
    dialType: string  # LOOPBACK|AUTO|VIDEO|VOICE|H320|H323|SIP|GATEWAY|POTS|ISDN_VOICE|SIP_SPEAKERPHONE|POTS_SPEAKERPHONE|VOICE_H323|VOICE_SIP|VOICE_GATEWAY
    password: string
- id: conferences_blast
  label: Blast dial multi-participant conference
  kind: action
  method: POST
  path: /rest/conferences/blast
  body_schema:
    endPointList: array
    password: string
- id: conferences_capabilities_get
  label: Get conference capabilities
  kind: query
  method: GET
  path: /rest/conferences/capabilities
- id: conferences_get_one
  label: Get conference by confID
  kind: query
  method: GET
  path: /rest/conferences/{confID}
  path_params:
    - name: confID
      type: string
- id: conferences_hangup
  label: Hang up conference
  kind: action
  method: DELETE
  path: /rest/conferences/{confID}
  path_params:
    - name: confID
      type: string
- id: conferences_connections_get
  label: Get conference connections
  kind: query
  method: GET
  path: /rest/conferences/{confID}/connections
  path_params:
    - name: confID
      type: string
  query_schema:
    filter: string  # ALL|ACTIVE|ANSWERABLE|INCOMING|PENDING
- id: conferences_connections_add
  label: Add endpoint to conference
  kind: action
  method: POST
  path: /rest/conferences/{confID}/connections
  path_params:
    - name: confID
      type: string
  query_schema:
    filter: string
  body_schema:
    rate: integer
    dialType: string
    password: string
- id: conferences_connection_get
  label: Get specific connection
  kind: query
  method: GET
  path: /rest/conferences/{confID}/connections/{connID}
  path_params:
    - name: confID
      type: string
    - name: connID
      type: string
- id: conferences_connection_hangup
  label: Hang up specific connection
  kind: action
  method: DELETE
  path: /rest/conferences/{confID}/connections/{connID}
  path_params:
    - name: confID
      type: string
    - name: connID
      type: string
- id: conferences_terminals_get
  label: Get conference terminals
  kind: query
  method: GET
  path: /rest/conferences/{confID}/terminals
  path_params:
    - name: confID
      type: string
- id: conferences_terminal_get
  label: Get specific terminal
  kind: query
  method: GET
  path: /rest/conferences/{confID}/terminals/{termID}
  path_params:
    - name: confID
      type: string
    - name: termID
      type: string
- id: conferences_terminal_hangup
  label: Hang up specific terminal
  kind: action
  method: DELETE
  path: /rest/conferences/{confID}/terminals/{termID}
  path_params:
    - name: confID
      type: string
    - name: termID
      type: string
- id: conferences_mediastats_get
  label: Get conference media stats
  kind: query
  method: GET
  path: /rest/conferences/{confID}/mediastats
  path_params:
    - name: confID
      type: string
- id: conferences_connection_mediastat_get
  label: Get connection media stat
  kind: query
  method: GET
  path: /rest/conferences/{confID}/connections/{connID}/mediastat
  path_params:
    - name: confID
      type: string
    - name: connID
      type: string
- id: conferences_terminal_mediastats_get
  label: Get terminal media stats
  kind: query
  method: GET
  path: /rest/conferences/{confID}/mediastats/terminals/{termID}
  path_params:
    - name: confID
      type: string
    - name: termID
      type: string
- id: conferences_term_mediastats_get
  label: Get all terminal media stats
  kind: query
  method: GET
  path: /rest/conferences/{confID}/termmediastats
  path_params:
    - name: confID
      type: string

- id: directory_favorites_get
  label: Get favorite directory entries
  kind: query
  method: GET
  path: /rest/directory/favorites
  query_schema:
    start: integer
    limit: integer
- id: directory_global_server_get
  label: Get global directory server
  kind: query
  method: GET
  path: /rest/directory/global/server
- id: directory_global_mtddefaultgroupentry_get
  label: Get MTD default group entry
  kind: query
  method: GET
  path: /rest/directory/global/mtddefaultgroupentry
- id: directory_local_server_get
  label: Get local directory server
  kind: query
  method: GET
  path: /rest/directory/local/server
- id: directory_local_entries_add
  label: Add local directory entry
  kind: action
  method: POST
  path: /rest/directory/local/entries
  body_schema:
    type: string  # SINGLE|GROUP
    displayName: string
    firstName: string
    lastName: string
    fullName: string
    email: string
    homePhone: string
    workPhone: string
    mobilePhone: string
    imageLocation: string
    favorite: boolean
    devices: array
- id: directory_local_entries_get
  label: Get local directory entry
  kind: query
  method: GET
  path: /rest/directory/local/entries/{entryId}
  path_params:
    - name: entryId
      type: string
- id: directory_local_entries_delete
  label: Delete local directory entry
  kind: action
  method: DELETE
  path: /rest/directory/local/entries/{entryId}
  path_params:
    - name: entryId
      type: string
- id: directory_local_entries_update
  label: Update local directory entry
  kind: action
  method: PUT
  path: /rest/directory/local/entries/{entryId}
  path_params:
    - name: entryId
      type: string
  body_schema:
    type: string
    displayName: string
    firstName: string
    lastName: string
    fullName: string
    email: string
    homePhone: string
    workPhone: string
    mobilePhone: string
    imageLocation: string
    favorite: boolean
    devices: array
- id: directory_local_entries_action
  label: Action on local directory entry
  kind: action
  method: POST
  path: /rest/directory/local/entries/{entryId}
  path_params:
    - name: entryId
      type: string
  body_schema:
    action: dial
    deviceId: string
- id: directory_local_entries_favorite_set
  label: Set local entry favorite
  kind: action
  method: PUT
  path: /rest/directory/local/entries/{entryId}/favorite
  path_params:
    - name: entryId
      type: string
  body_schema:
    favorite: boolean
- id: directory_local_entries_favorite_reorder
  label: Reorder local favorite entry
  kind: action
  method: POST
  path: /rest/directory/local/entries/{entryId}/favorite
  path_params:
    - name: entryId
      type: string
  body_schema:
    index: integer
- id: directory_local_entries_members
  label: Action on local group members
  kind: action
  method: POST
  path: /rest/directory/local/entries/{entryId}/members
  path_params:
    - name: entryId
      type: string
  body_schema:
    action: string  # query|add|remove
    entryId: string
- id: directory_queries_start
  label: Start directory search query
  kind: action
  method: POST
  path: /rest/directory/queries
  body_schema:
    searchString: string
    serverScope: string  # ALL|LOCAL|GLOBAL|FAVORITES
    entryScope: string  # SINGLE|GROUP|ANY_TIERED|ANY
    groupScope: string  # ONE_LEVEL|RECURSIVE
    order: string  # FIRST_NAME|LAST_NAME|DISPLAY_NAME
    groupID: string
- id: directory_queries_initial_get
  label: Start default directory search
  kind: query
  method: GET
  path: /rest/directory/queries/initial
- id: directory_queries_get
  label: Get directory query results
  kind: query
  method: GET
  path: /rest/directory/queries/{queryId}
  path_params:
    - name: queryId
      type: string
  query_schema:
    start: integer
    limit: integer
- id: directory_queries_delete
  label: Delete directory query
  kind: action
  method: DELETE
  path: /rest/directory/queries/{queryId}
  path_params:
    - name: queryId
      type: string
- id: directory_server_entry_get
  label: Get entry from directory server
  kind: query
  method: GET
  path: /rest/directory/{serverId}/entries/{entryId}
  path_params:
    - name: serverId
      type: string
    - name: entryId
      type: string
- id: directory_server_entry_action
  label: Action on directory server entry
  kind: action
  method: POST
  path: /rest/directory/{serverId}/entries/{entryId}
  path_params:
    - name: serverId
      type: string
    - name: entryId
      type: string
  body_schema:
    action: dial
    deviceId: string
- id: directory_server_entry_favorite_set
  label: Set server entry favorite
  kind: action
  method: PUT
  path: /rest/directory/{serverId}/entries/{entryId}/favorite
  path_params:
    - name: serverId
      type: string
    - name: entryId
      type: string
  body_schema:
    favorite: boolean
- id: directory_server_entry_favorite_reorder
  label: Reorder server favorite entry
  kind: action
  method: POST
  path: /rest/directory/{serverId}/entries/{entryId}/favorite
  path_params:
    - name: serverId
      type: string
    - name: entryId
      type: string
  body_schema:
    index: integer
- id: directory_server_entry_members
  label: Action on server group members
  kind: action
  method: POST
  path: /rest/directory/{serverId}/entries/{entryId}/members
  path_params:
    - name: serverId
      type: string
    - name: entryId
      type: string
  body_schema:
    action: string  # query|add|remove
    entryId: string
- id: directory_import
  label: Import directory entries from XML
  kind: action
  method: PUT
  path: /rest/directory/import
- id: directory_export
  label: Export directory entries to XML
  kind: action
  method: GET
  path: /rest/directory/export

- id: session_login
  label: Create and authenticate session
  kind: action
  method: POST
  path: /rest/session
  body_schema:
    user: string
    password: string

- id: system_h323gatekeepers_get
  label: Get H323 gatekeeper servers
  kind: query
  method: GET
  path: /rest/system/h323gatekeepers
- id: system_logs_get
  label: Get system logs (tar attachment)
  kind: query
  method: GET
  path: /rest/system/logs
- id: system_network_ping
  label: ICMP ping destination host
  kind: action
  method: POST
  path: /rest/system/network/ping
  body_schema:
    destination: string  # IP address
- id: system_network_traceroute
  label: Traceroute destination host
  kind: action
  method: POST
  path: /rest/system/network/traceroute
  body_schema:
    destination: string  # IP address
- id: system_reboot
  label: Reboot system
  kind: action
  method: POST
  path: /rest/system/reboot
  body_schema:
    action: reboot
- id: system_resetsettings
  label: Reset system settings
  kind: action
  method: POST
  path: /rest/system/resetsettings
  body_schema:
    action: resetsettings
    keepCertificates: boolean
    keepCdr: boolean
    keepDirectory: boolean
    keepLogs: boolean
- id: system_sipservers_get
  label: Get SIP servers
  kind: query
  method: GET
  path: /rest/system/sipservers
- id: system_status_get
  label: Get system status
  kind: query
  method: GET
  path: /rest/system/status
- id: system_time_get
  label: Get system time (epoch ms + tz offset)
  kind: query
  method: GET
  path: /rest/system/time
- id: system_time_set
  label: Set system time (epoch ms)
  kind: action
  method: POST
  path: /rest/system/time
  body_schema:
    time: long
    tzOffset: integer
- id: system_time_local_get
  label: Get system local time (ISO 8601)
  kind: query
  method: GET
  path: /rest/system/time/local

- id: mediastats_get
  label: Get shared content media stats
  kind: query
  method: GET
  path: /rest/mediastats

- id: video_local_mute_get
  label: Get local video hidden status
  kind: query
  method: GET
  path: /rest/video/local/mute
- id: video_local_mute_set
  label: Hide/unhide local video
  kind: action
  method: POST
  path: /rest/video/local/mute
  body_schema:
    mute: boolean
- id: video_remote_conf_mute_get
  label: Get remote video hidden status
  kind: query
  method: GET
  path: /rest/video/remote/{confID}/mute
  path_params:
    - name: confID
      type: string
- id: video_remote_conf_mutelock_get
  label: Get remote video mute lock status
  kind: query
  method: GET
  path: /rest/video/remote/{confID}/mutelock
  path_params:
    - name: confID
      type: string
```

## Feedbacks
```yaml
# Sample of structured response fields documented in source.
- id: audio_state
  type: object
  fields: [muteLocked, muted, numOfMicsConnected, volume]
- id: audio_muted
  type: boolean
- id: audio_volume
  type: integer
- id: calendar_status
  type: enum
  values: [DISABLED, OFFLINE, ONLINE, CONNECTING, ERR_AUTHENTICATION, ERR_UNKNOWN]
- id: calendar_meeting
  type: object
  fields: [actions, body, canDial, canceled, duration, id, inCall, location, optionalAttendees, organizer, privateMeeting, recurring, requiredAttendees, startTime, subject, lastSyncTime]
- id: camera_near
  type: object
  fields: [cameraIndex, iconName, model, name, sessionID, sourceType, stateAutoFocus, stateFreeze, stateMarker, connected, hasAutoFocus, hasFocus, hasFreeze, hasMarker, hasPan, hasTilt, hasZoom, nearCamera, ptzcapable, selected, trackable]
- id: camera_preset
  type: object
  fields: [imageLocation, index, sessionId, near, stored]
- id: camera_content_status
  type: enum
  values: [CONTENT_IDLE]
- id: conference
  type: object
  fields: [id, connections, duration, holdStartTime, holdState, isActive, isHolding, isMute, isSvcConference, isWaitingInLobby, mediaServerControlEvent, mediaServerType, startTime, terminals, capabilities]
- id: conference_dial_type
  type: enum
  values: [LOOPBACK, AUTO, VIDEO, VOICE, H320, H323, SIP, GATEWAY, POTS, ISDN_VOICE, SIP_SPEAKERPHONE, POTS_SPEAKERPHONE, VOICE_H323, VOICE_SIP, VOICE_GATEWAY]
- id: directory_entry
  type: object
  fields: [serverId, type, displayName, firstName, lastName, fullName, presence, email, homePhone, workPhone, mobilePhone, imageLocation, serverProtocol, devices, favorite, readOnly, addedLocally]
- id: directory_presence
  type: enum
  values: [OFFLINE]
- id: h323_gatekeeper
  type: object
  fields: [state, address, version, model]
- id: sip_server
  type: object
  fields: [state, address, version, model]
- id: system_time
  type: object
  fields: [time, tzOffset]  # time in epoch ms
- id: system_time_local
  type: string  # ISO 8601
- id: mediastats_vars
  type: object
  fields: [bitrate, clientID, duration, framerate, height, sourceID, sourceType, start, width]
- id: video_mute_result
  type: boolean
- id: session
  type: object
  fields: [sessionId, role, clientType, location, userId, creationTime, isAuthenticated, isStale, isNew, isConnected]
- id: ping_result
  type: object
  fields: [icmpReachable, responseTime, h323Reachable, sipReachable]
- id: traceroute_result
  type: object
  fields: [success, totalHops, hops]
```

## Variables
```yaml
# Settable system parameters reachable via REST.
# UNRESOLVED: most system configuration setters are out of scope of this refined doc
# excerpt; the source focuses on audio/camera/call/directory control. Documented
# system-level setters in scope:
- id: system_time
  label: System clock
  type: object
  settable_via: /rest/system/time POST
  fields:
    - name: time
      type: long
    - name: tzOffset
      type: integer
```

## Events
```yaml
# UNRESOLVED: source describes GET-based state queries only; no unsolicited
# notification / webhook / SSE / event-stream endpoints are documented.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlock procedures,
# or power-on sequencing requirements.
```

## Notes
- HTTPS is named in source but no port is stated; do not assume 443.
- Auth: source documents a /rest/session POST that returns a sessionId after
  validating user/password. The exact header scheme used to send that
  sessionId on subsequent calls is not named in the source.
- "Administrator credentials are required for access authentication" — most
  documented endpoints list "Access Level: Admin" explicitly; some do not.
- The /rest/audio GET returns multiple shape variants in the source (muteLocked/muted/numOfMicsConnected/volume). The /rest/audio POST shape (action/dtmfChar/speaker) is documented separately.
- Conference dial POST (single-participant) is documented without an explicit HTTPS method label; the matching blast endpoint is explicitly POST; treat the single dial as POST by symmetry.
- The /rest/collaboration content endpoint POST returns `context_id`; the GET counterpart uses `context-id` (hyphenated) as the query parameter name.
- Directory /rest/directory/queries/{queryId} DELETE is documented as a protocol+method+path row, but applicable return codes row is missing in the source.

<!-- UNRESOLVED: webhook / event-stream notification endpoints; HTTPS port number; auth header scheme; firmware version compatibility ranges across G7500 / X50 / X30; applicable return codes row missing on some endpoints. -->

## Provenance

```yaml
source_domains:
  - polycom-moscow.ru
  - kaas.hpcloud.hp.com
  - api.lens.poly.com
source_urls:
  - https://polycom-moscow.ru/pdf/poly-video-restapi.pdf
  - https://kaas.hpcloud.hp.com/pdf-public/pdf_9122921_en-US-1.pdf
  - https://kaas.hpcloud.hp.com/pdf-public/pdf_9121204_en-US-1.pdf
  - https://kaas.hpcloud.hp.com/pdf-public/pdf_8740172_en-US-1.pdf
  - https://api.lens.poly.com
retrieved_at: 2026-06-10T23:39:53.509Z
last_checked_at: 2026-06-11T13:44:55.390Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:44:55.390Z
matched_actions: 98
action_count: 98
confidence: medium
summary: "All 98 spec actions match documented source endpoints with correct paths, methods, and shapes; base_url /rest confirmed; no extra source endpoints. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTPS port not stated in source (commonly 443)"
- "exact auth header scheme not stated (Basic vs Digest vs custom token). Source only documents the /rest/session login returning a sessionId."
- "most system configuration setters are out of scope of this refined doc"
- "source describes GET-based state queries only; no unsolicited"
- "source does not document any multi-step macro sequences."
- "source does not document safety warnings, interlock procedures,"
- "webhook / event-stream notification endpoints; HTTPS port number; auth header scheme; firmware version compatibility ranges across G7500 / X50 / X30; applicable return codes row missing on some endpoints."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
