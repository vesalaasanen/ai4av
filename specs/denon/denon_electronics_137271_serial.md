---
spec_id: admin/denon-electronics-137271
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics 137271 HEOS CLI Control Spec"
manufacturer: Denon
model_family: "Denon HEOS (HEOS CLI applies to all HEOS-enabled Denon devices; 137271 / DRA-800H is a HEOS Built-in device)"
aliases: []
compatible_with:
  manufacturers:
    - Denon
    - "Denon Electronics"
  models:
    - "Denon HEOS (HEOS CLI applies to all HEOS-enabled Denon devices; 137271 / DRA-800H is a HEOS Built-in device)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rn.dmglobal.com
source_urls:
  - https://rn.dmglobal.com/usmodel/HEOS_CLI_ProtocolSpecification-Version-1.17.pdf
retrieved_at: 2026-07-25T01:39:55.655Z
last_checked_at: 2026-10-07T11:17:55.286Z
generated_at: 2026-10-07T11:17:55.286Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the model-agnostic HEOS CLI protocol doc, not a 137271-specific manual; per-device model/firmware confirmation not stated"
  - "no RS-232 protocol content present in source despite \"Serial\" hint and filename"
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source"
  - "no RS-232 / serial transport parameters present in source despite task hint"
  - "no per-device confirmation that 137271 (DRA-800H) implements every HEOS CLI command listed"
  - "power on/off command for the device itself not present in source (only `reboot`)"
verification:
  verdict: verified
  checked_at: 2026-10-07T11:17:55.286Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 spec commands match source HEOS CLI templates and transport values; source is a model-agnostic HEOS doc, so exact 137271 applicability is not proven. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Denon Electronics 137271 HEOS CLI Control Spec

## Summary
Denon HEOS is a network-connected, wireless, multi-room music system. This spec covers the HEOS Command Line Interface (CLI), accessed over a telnet (TCP) connection on port 1255. The control system sends ASCII text commands of the form `heos://command_group/command?attr=value&...` (delimited by `\r\n`) and receives JSON responses. Browse/search use a REST-like style; other commands are static. Although the task's `Known protocol` hint was "RS-232C", the supplied source document describes only the HEOS CLI over TCP telnet (port 1255) — no RS-232 content is present in the source.

<!-- UNRESOLVED: source is the model-agnostic HEOS CLI protocol doc, not a 137271-specific manual; per-device model/firmware confirmation not stated -->
<!-- UNRESOLVED: no RS-232 protocol content present in source despite "Serial" hint and filename -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 1255
  discovery: upnp_ssdp  # source: discovery via UPnP SSDP, ST = 'urn:schemas-denon-com:device:ACT-Denon:1'
auth:
  type: UNRESOLVED  # Source documents HEOS account sign-in commands but does not specify connection-level authentication.
framing:
  command_delimiter: "\r\n"
  response_delimiter: "\r\n"
  encoding: ascii
  max_simultaneous_socket_connections: 32
```

## Traits
```yaml
# - powerable: NOT inferred - source describes playback/queue control, not device power on/off. A `reboot` command exists but is not power control.
# - queryable: inferred - many `get_*` query commands present
# - levelable: inferred - volume set/up/down commands present (0-100)
# - routable: NOT inferred - grouping is multi-room grouping, not input/output signal routing
traits:
  - queryable  # inferred from get_* command examples
  - levelable  # inferred from set_volume/volume_up/volume_down examples
```

## Actions
```yaml
# Source documents ~62 distinct HEOS CLI commands. Each listed verbatim below.
# Per coverage rule: every command-bearing entry in the source enumerated.
# Parameterized commands carry the literal `heos://...` template from the source.

# ===== 4.1 System Commands =====
- id: system_register_for_change_events
  label: Register for Change Events
  kind: action
  command: "heos://system/register_for_change_events?enable={enable}"
  params:
    - name: enable
      type: string
      description: Register or unregister for change events
      enum: [on, off]

- id: system_check_account
  label: HEOS Account Check
  kind: query
  command: "heos://system/check_account"
  params: []

- id: system_sign_in
  label: HEOS Account Sign In
  kind: action
  command: "heos://system/sign_in?un={un}&pw={pw}"
  params:
    - name: un
      type: string
      description: HEOS account username
    - name: pw
      type: string
      description: HEOS account password

- id: system_sign_out
  label: HEOS Account Sign Out
  kind: action
  command: "heos://system/sign_out"
  params: []

- id: system_heart_beat
  label: HEOS System Heart Beat
  kind: action
  command: "heos://system/heart_beat"
  params: []

- id: system_reboot
  label: HEOS Speaker Reboot
  kind: action
  command: "heos://system/reboot"
  params: []

- id: system_prettify_json_response
  label: Prettify JSON Response
  kind: action
  command: "heos://system/prettify_json_response?enable={enable}"
  params:
    - name: enable
      type: string
      description: Enable or disable prettification of JSON response
      enum: [on, off]

# ===== 4.2 Player Commands =====
- id: player_get_players
  label: Get Players
  kind: query
  command: "heos://player/get_players"
  params: []

- id: player_get_player_info
  label: Get Player Info
  kind: query
  command: "heos://player/get_player_info?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: player_get_play_state
  label: Get Play State
  kind: query
  command: "heos://player/get_play_state?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: player_set_play_state
  label: Set Play State
  kind: action
  command: "heos://player/set_play_state?pid={pid}&state={state}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: state
      type: string
      description: Player play state
      enum: [play, pause, stop]

- id: player_get_now_playing_media
  label: Get Now Playing Media
  kind: query
  command: "heos://player/get_now_playing_media?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: player_get_volume
  label: Get Volume
  kind: query
  command: "heos://player/get_volume?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: player_set_volume
  label: Set Volume
  kind: action
  command: "heos://player/set_volume?pid={pid}&level={level}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: level
      type: integer
      description: Player volume level
      range: [0, 100]

- id: player_volume_up
  label: Volume Up
  kind: action
  command: "heos://player/volume_up?pid={pid}&step={step}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: step
      type: integer
      description: Player volume step level
      range: [1, 10]
      default: 5

- id: player_volume_down
  label: Volume Down
  kind: action
  command: "heos://player/volume_down?pid={pid}&step={step}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: step
      type: integer
      description: Player volume step level
      range: [1, 10]
      default: 5

- id: player_get_mute
  label: Get Mute
  kind: query
  command: "heos://player/get_mute?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: player_set_mute
  label: Set Mute
  kind: action
  command: "heos://player/set_mute?pid={pid}&state={state}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: state
      type: string
      description: Player mute state
      enum: [on, off]

- id: player_toggle_mute
  label: Toggle Mute
  kind: action
  command: "heos://player/toggle_mute?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: player_get_play_mode
  label: Get Play Mode
  kind: query
  command: "heos://player/get_play_mode?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: player_set_play_mode
  label: Set Play Mode
  kind: action
  command: "heos://player/set_play_mode?pid={pid}&repeat={repeat}&shuffle={shuffle}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: repeat
      type: string
      description: Player repeat state
      enum: [on_all, on_one, off]
    - name: shuffle
      type: string
      description: Player shuffle state
      enum: [on, off]

- id: player_get_queue
  label: Get Queue
  kind: query
  command: "heos://player/get_queue?pid={pid}&range={range}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: range
      type: string
      description: "Optional start,end record index (0-based). Omitting returns up to 100 records."
      required: false

- id: player_play_queue
  label: Play Queue Item
  kind: action
  command: "heos://player/play_queue?pid={pid}&qid={qid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: qid
      type: string
      description: Queue id for song returned by get_queue

- id: player_remove_from_queue
  label: Remove Item(s) from Queue
  kind: action
  command: "heos://player/remove_from_queue?pid={pid}&qid={qid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: qid
      type: string
      description: Comma-separated list of queue_ids returned by get_queue

- id: player_save_queue
  label: Save Queue as Playlist
  kind: action
  command: "heos://player/save_queue?pid={pid}&name={name}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: name
      type: string
      description: New playlist name (max 128 unicode characters)

- id: player_clear_queue
  label: Clear Queue
  kind: action
  command: "heos://player/clear_queue?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: player_move_queue_item
  label: Move Queue Item
  kind: action
  command: "heos://player/move_queue_item?pid={pid}&sqid={sqid}&dqid={dqid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: sqid
      type: string
      description: Comma-separated source queue ids (1 to size of queue)
    - name: dqid
      type: integer
      description: Destination queue id (1 to size of queue)

- id: player_play_next
  label: Play Next
  kind: action
  command: "heos://player/play_next?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: player_play_previous
  label: Play Previous
  kind: action
  command: "heos://player/play_previous?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: player_set_quickselect
  label: Set QuickSelect (LS AVR Only)
  kind: action
  command: "heos://player/set_quickselect?pid={pid}&id={id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: id
      type: integer
      description: Quick select Id to store currently playing source
      range: [1, 6]

- id: player_play_quickselect
  label: Play QuickSelect (LS AVR Only)
  kind: action
  command: "heos://player/play_quickselect?pid={pid}&id={id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: id
      type: integer
      description: Quick select Id whose source should be played
      range: [1, 6]

- id: player_get_quickselects
  label: Get QuickSelects (LS AVR Only)
  kind: query
  command: "heos://player/get_quickselects?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: player_check_update
  label: Check for Firmware Update
  kind: query
  command: "heos://player/check_update?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

# ===== 4.3 Group Commands =====
- id: group_get_groups
  label: Get Groups
  kind: query
  command: "heos://group/get_groups"
  params: []

- id: group_get_group_info
  label: Get Group Info
  kind: query
  command: "heos://group/get_group_info?gid={gid}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups

- id: group_set_group
  label: Set Group (create/modify/ungroup)
  kind: action
  command: "heos://group/set_group?pid={pid}"
  params:
    - name: pid
      type: string
      description: Comma-separated player ids; first id is group leader. Single id = ungroup.

- id: group_get_volume
  label: Get Group Volume
  kind: query
  command: "heos://group/get_volume?gid={gid}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups

- id: group_set_volume
  label: Set Group Volume
  kind: action
  command: "heos://group/set_volume?gid={gid}&level={level}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups
    - name: level
      type: integer
      description: Group volume level
      range: [0, 100]

- id: group_volume_up
  label: Group Volume Up
  kind: action
  command: "heos://group/volume_up?gid={gid}&step={step}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups
    - name: step
      type: integer
      description: Group volume step level
      range: [1, 10]
      default: 5

- id: group_volume_down
  label: Group Volume Down
  kind: action
  command: "heos://group/volume_down?gid={gid}&step={step}"
  params:
    - name: gid
      type: string
      description: Group volume step level
      range: [1, 10]
      default: 5

- id: group_get_mute
  label: Get Group Mute
  kind: query
  command: "heos://group/get_mute?gid={gid}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups

- id: group_set_mute
  label: Set Group Mute
  kind: action
  command: "heos://group/set_mute?gid={gid}&state={state}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups
    - name: state
      type: string
      description: Group mute state
      enum: [on, off]

- id: group_toggle_mute
  label: Toggle Group Mute
  kind: action
  command: "heos://group/toggle_mute?gid={gid}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups

# ===== 4.4 Browse Commands =====
- id: browse_get_music_sources
  label: Get Music Sources
  kind: query
  command: "heos://browse/get_music_sources"
  params: []

- id: browse_get_source_info
  label: Get Source Info
  kind: query
  command: "heos://browse/get_source_info?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources (or browse for heos_server/heos_service)

- id: browse_browse_source
  label: Browse Source
  kind: query
  command: "heos://browse/browse?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: range
      type: string
      description: "Optional start,end index (0-based). Supported only while browsing Favorites."
      required: false

- id: browse_browse_source_containers
  label: Browse Source Containers
  kind: query
  command: "heos://browse/browse?sid={sid}&cid={cid}&range={range}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: cid
      type: string
      description: Container id returned by browse or search
    - name: range
      type: string
      description: "Optional start,end index (0-based); omit returns up to 50/100 records."
      required: false

- id: browse_get_search_criteria
  label: Get Source Search Criteria
  kind: query
  command: "heos://browse/get_search_criteria?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources

- id: browse_search
  label: Search
  kind: query
  command: "heos://browse/search?sid={sid}&search={search}&scid={scid}&range={range}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: search
      type: string
      description: Search string (max 128 unicode chars; '*' wildcard if supported)
    - name: scid
      type: string
      description: Search criteria id returned by get_search_criteria
      enum: [artist, album, song, station]
    - name: range
      type: string
      description: "Optional start,end index (0-based); omit returns up to 50/100 records."
      required: false

- id: browse_play_stream_station
  label: Play Station (play_stream)
  kind: action
  command: "heos://browse/play_stream?pid={pid}&sid={sid}&cid={cid}&mid={mid}&name={name}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: cid
      type: string
      description: Container id from browse (ignore if not applicable, e.g. station from search)
    - name: mid
      type: string
      description: Media id returned by browse or search (must be a 'station' media type)
    - name: name
      type: string
      description: Station name returned by browse

- id: browse_play_preset
  label: Play Preset Station
  kind: action
  command: "heos://browse/play_preset?pid={pid}&preset={preset}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: preset
      type: integer
      description: Station offset in HEOS Favorites (1 and above)

- id: browse_play_input_same
  label: Play Input Source (same speaker)
  kind: action
  command: "heos://browse/play_input?pid={pid}&input={input}"
  params:
    - name: pid
      type: string
      description: Player id of selected (destination) HEOS speaker
    - name: input
      type: string
      description: Input source name (e.g. inputs/aux_in_1, inputs/optical_in_1, inputs/hdmi_in_1)

- id: browse_play_input_other
  label: Play Input Source (another speaker)
  kind: action
  command: "heos://browse/play_input?pid={pid}&spid={spid}&input={input}"
  params:
    - name: pid
      type: string
      description: Destination player id
    - name: spid
      type: string
      description: Source player id (HEOS device acting as source)
    - name: input
      type: string
      description: Input source name

- id: browse_play_url
  label: Play URL (play_stream with url)
  kind: action
  command: "heos://browse/play_stream?pid={pid}&url={url}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: url
      type: string
      description: Absolute path to a playable stream (must be last attribute=value pair)

- id: browse_add_container_to_queue
  label: Add Container to Queue with Options
  kind: action
  command: "heos://browse/add_to_queue?pid={pid}&sid={sid}&cid={cid}&aid={aid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: cid
      type: string
      description: Container id returned by browse or search (must be 'playable' container)
    - name: aid
      type: integer
      description: Add criteria id
      enum:
        - 1  # play now
        - 2  # play next
        - 3  # add to end
        - 4  # replace and play

- id: browse_add_track_to_queue
  label: Add Track to Queue with Options
  kind: action
  command: "heos://browse/add_to_queue?pid={pid}&sid={sid}&cid={cid}&mid={mid}&aid={aid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: cid
      type: string
      description: Container id used to browse/search current container
    - name: mid
      type: string
      description: Media id returned by browse or search (must be 'track' media type)
    - name: aid
      type: integer
      description: Add criteria id
      enum:
        - 1  # play now
        - 2  # play next
        - 3  # add to end
        - 4  # replace and play

- id: browse_rename_playlist
  label: Rename HEOS Playlist
  kind: action
  command: "heos://browse/rename_playlist?sid={sid}&cid={cid}&name={name}"
  params:
    - name: sid
      type: string
      description: Source id (select HEOS source for HEOS playlists)
    - name: cid
      type: string
      description: Container id returned in Get HEOS Playlists
    - name: name
      type: string
      description: New playlist name (max 128 unicode characters)

- id: browse_delete_playlist
  label: Delete HEOS Playlist
  kind: action
  command: "heos://browse/delete_playlist?sid={sid}&cid={cid}"
  params:
    - name: sid
      type: string
      description: Source id (select HEOS source for HEOS playlists)
    - name: cid
      type: string
      description: Container id returned in Get HEOS Playlists

- id: browse_retrieve_metadata
  label: Retrieve Album Metadata
  kind: query
  command: "heos://browse/retrieve_metadata?sid={sid}&cid={cid}"
  params:
    - name: sid
      type: string
      description: Source id (currently Rhapsody/Napster)
    - name: cid
      type: string
      description: Container id (Rhapsody/Napster album id) returned by browse or get_now_playing_media

- id: browse_get_service_options
  label: Get Service Options for Now Playing (OBSOLETE)
  kind: query
  command: "heos://browse/get_service_options?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources
  notes: Obsolete - use get_now_playing_media which includes supported options.

- id: browse_set_service_option
  label: Set Service Option
  kind: action
  command: "heos://browse/set_service_option?sid={sid}&option={option}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: option
      type: integer
      description: Service option id (1-8 add/remove library items, 11 Thumbs Up, 12 Thumbs Down, 13 Create New Station, 20 Remove from HEOS Favorites)
    - name: mid
      type: string
      description: Track/station/album id (option-dependent)
      required: false
    - name: cid
      type: string
      description: Album/playlist id (option-dependent)
      required: false
    - name: pid
      type: string
      description: Player id (for options 11/12)
      required: false
    - name: name
      type: string
      description: Search string (option 13) or playlist name (option 4)
      required: false
    - name: scid
      type: string
      description: Search criteria id (option 13; 1=Artist, 5=Show, 3=Track)
      required: false
```

## Feedbacks
```yaml
# Query responses return JSON; the heos.message field carries encoded key=value pairs.
# Observable state surfaces (per documented query commands):
- id: play_state
  type: enum
  values: [play, pause, stop]
  source_query: player_get_play_state
- id: volume_level
  type: integer
  range: [0, 100]
  source_query: player_get_volume
- id: mute_state
  type: enum
  values: [on, off]
  source_query: player_get_mute
- id: play_mode
  type: object
  fields:
    repeat: { type: enum, values: [on_all, on_one, off] }
    shuffle: { type: enum, values: [on, off] }
  source_query: player_get_play_mode
- id: group_volume_level
  type: integer
  range: [0, 100]
  source_query: group_get_volume
- id: group_mute_state
  type: enum
  values: [on, off]
  source_query: group_get_mute
- id: now_playing_media
  type: object
  fields: [type, song, album, artist, image_url, mid, qid, sid, station, album_id]
  source_query: player_get_now_playing_media
- id: firmware_update_availability
  type: enum
  values: [update_none, update_exist]
  source_query: player_check_update
- id: account_state
  type: object
  fields:
    signed_in: { type: boolean }
    username: { type: string }
  source_query: system_check_account
- id: error_response
  type: object
  description: Returned when heos.result == "fail"; message contains eid and text
  error_codes:
    1: "Unrecognized Command"
    2: "Invalid ID"
    3: "Wrong Number of Command Arguments"
    4: "Requested data not available"
    5: "Resource currently not available"
    6: "Invalid Credentials"
    7: "Command Could Not Be Executed"
    8: "User not logged In"
    9: "Parameter out of range"
    10: "User not found"
    11: "Internal Error"
    12: "System Error (syserrno=XXX; e.g. -9 remote service error, -1061 service not registered, -1063 not logged in, -1056 user not found, -1201 content auth error, -1232 user auth error, -1239 invalid account params)"
    13: "Processing Previous Command"
    14: "Media can't be played"
    15: "Option not supported"
    16: "Too many commands in message queue"
    17: "Reached skip limit"
```

## Variables
```yaml
# Settable continuous/enum parameters that are not discrete one-shot actions are
# represented as actions above (set_volume, set_play_state, set_play_mode, etc.).
# No additional settable variables are documented in the source beyond those.
```

## Events
```yaml
# Unsolicited notifications emitted when register_for_change_events?enable=on.
# Each event arrives as JSON on the open telnet socket.
- id: sources_changed
  command: "event/sources_changed"
  payload: {}
- id: players_changed
  command: "event/players_changed"
  payload: {}
- id: groups_changed
  command: "event/groups_changed"
  payload: {}
- id: player_state_changed
  command: "event/player_state_changed"
  payload:
    pid: { type: string }
    state: { type: enum, values: [play, pause, stop] }
- id: player_now_playing_changed
  command: "event/player_now_playing_changed"
  payload:
    pid: { type: string }
- id: player_now_playing_progress
  command: "event/player_now_playing_progress"
  payload:
    pid: { type: string }
    cur_pos: { type: integer, unit: ms }
    duration: { type: integer, unit: ms }
- id: player_playback_error
  command: "event/player_playback_error"
  payload:
    pid: { type: string }
    error: { type: string, example: "Could Not Download" }
- id: player_queue_changed
  command: "event/player_queue_changed"
  payload:
    pid: { type: string }
- id: player_volume_changed
  command: "event/player_volume_changed"
  payload:
    pid: { type: string }
    level: { type: integer, range: [0, 100] }
    mute: { type: enum, values: [on, off] }
- id: repeat_mode_changed
  command: "event/repeat_mode_changed"
  payload:
    pid: { type: string }
    repeat: { type: enum, values: [on_all, on_one, off] }
- id: shuffle_mode_changed
  command: "event/shuffle_mode_changed"
  payload:
    pid: { type: string }
    shuffle: { type: enum, values: [on, off] }
- id: group_volume_changed
  command: "event/group_volume_changed"
  payload:
    gid: { type: string }
    level: { type: integer, range: [0, 100] }
    mute: { type: enum, values: [on, off] }
- id: user_changed
  command: "event/user_changed"
  payload:
    signed_in: { type: boolean }
    un: { type: string, description: "Current user name (only when signed in)" }
```

## Macros
```yaml
# Driver initialization sequence explicitly recommended in source (section 2.1.1):
- id: driver_initialization
  name: HEOS CLI Driver Initialization
  steps:
    - send: "heos://system/register_for_change_events?enable=off"
      reason: Un-register for change events (good practice even though default is off)
    - send: "heos://system/sign_in?un={un}&pw={pw}"
      reason: Sign in to HEOS user account if credentials available (optional)
      conditional: user_credentials_available
    - send: "heos://player/get_players"
    - send: "heos://browse/get_music_sources"
    - send: "heos://group/get_groups"
    - send: "heos://player/get_queue?pid={pid}"
    - send: "heos://player/get_now_playing_media?pid={pid}"
    - send: "heos://player/get_volume?pid={pid}"
    - send: "heos://player/get_play_state?pid={pid}"
    - send: "heos://system/register_for_change_events?enable=on"
      reason: Register for change events once initial state retrieved
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. The `system/reboot` command reboots only the
# directly-connected HEOS device per source text but carries no stated safety caveat.
```

## Notes
- **Protocol mismatch warning:** The task hint (`Known protocol: RS-232C`) and the source filename (`..._serial.refined.md`) suggest RS-232, but the extracted source text describes ONLY the HEOS CLI over TCP telnet on port 1255. No RS-232 content (baud/data bits/parity) appears in the source. Transport section therefore reflects the actual source content.
- **Model scope:** The HEOS CLI protocol is model-agnostic across HEOS-enabled Denon/Marantz devices. The entity `denon_electronics_137271` corresponds to the Denon DRA-800H (a HEOS Built-in AVR per prior discovery notes), but the source doc does not name 137271 specifically.
- **Command/response framing:** Commands are ASCII strings terminated by `\r\n`. Responses are JSON terminated by `\r\n`. Special characters `&`, `=`, `%` must be URL-encoded as `%26`, `%3D`, `%25` in attribute values.
- **Async processing:** Browse/search responses may return `{ "result": "success", "message": "command under process" }` first, then the real payload later (CLI fetching from remote media server/service).
- **Driver initialization:** See Macros — source recommends a specific connect sequence to avoid event flooding and player-not-yet-discovered races. Keep an idle connection to prevent the CLI module from returning to dormant mode.
- **Multi-socket:** Up to 32 simultaneous socket connections to a single HEOS speaker are supported. Recommended pattern: one connection for change events, one for user actions. Do NOT connect to each speaker individually — one speaker proxies the whole HEOS network.
- **Service-specific transport controls:** Available play/pause/stop/next/prev controls vary per music service and per station-vs-song (see source table 2.1.3). CLI control of a service does not equal CLI browse/search support.
- **QuickSelect / LS AVR commands:** `set_quickselect`, `play_quickselect`, `get_quickselects` are documented as "LS AVR Only" (currently LEGO AVR, HEOS BAR).
- **`get_service_options` is obsolete** — replaced by options embedded in `get_now_playing_media`.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no RS-232 / serial transport parameters present in source despite task hint -->
<!-- UNRESOLVED: no per-device confirmation that 137271 (DRA-800H) implements every HEOS CLI command listed -->
<!-- UNRESOLVED: power on/off command for the device itself not present in source (only `reboot`) -->

## Provenance

```yaml
source_domains:
  - rn.dmglobal.com
source_urls:
  - https://rn.dmglobal.com/usmodel/HEOS_CLI_ProtocolSpecification-Version-1.17.pdf
retrieved_at: 2026-07-25T01:39:55.655Z
last_checked_at: 2026-10-07T11:17:55.286Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:17:55.286Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 spec commands match source HEOS CLI templates and transport values; source is a model-agnostic HEOS doc, so exact 137271 applicability is not proven. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the model-agnostic HEOS CLI protocol doc, not a 137271-specific manual; per-device model/firmware confirmation not stated"
- "no RS-232 protocol content present in source despite \"Serial\" hint and filename"
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source"
- "no RS-232 / serial transport parameters present in source despite task hint"
- "no per-device confirmation that 137271 (DRA-800H) implements every HEOS CLI command listed"
- "power on/off command for the device itself not present in source (only `reboot`)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
