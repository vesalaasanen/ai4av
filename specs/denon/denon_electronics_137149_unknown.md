---
spec_id: admin/denon-electronics-137149
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics HEOS CLI Control Spec"
manufacturer: Denon
model_family: HEOS
aliases: []
compatible_with:
  manufacturers:
    - Denon
    - "Denon Electronics"
  models:
    - HEOS
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rn.dmglobal.com
  - web.archive.org
source_urls:
  - https://rn.dmglobal.com/usmodel/HEOS_CLI_ProtocolSpecification-Version-1.17.pdf
  - "https://web.archive.org/web/20220910064651/https://support.denon.com/app/answers/detail/a_id/6953/~/heos-control-protocol-(cli)"
retrieved_at: 2026-06-30T12:19:43.356Z
last_checked_at: 2026-07-07T11:32:14.377Z
generated_at: 2026-07-07T11:32:14.377Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Physical/electrical specs not in source."
  - "no safety/interlock procedures in source."
  - "firmware version compatibility not stated in source."
  - "physical/electrical specs not in source."
  - "default/max records per browse response depends on service type (50 or 100) — not enumerated per service."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:32:14.377Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 60 spec actions are confirmed by verbatim command strings in the source; transport port 1255 and TCP protocol explicitly stated; the spec covers all source command groups completely. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Denon Electronics HEOS CLI Control Spec

## Summary
The Denon HEOS is a network-connected, wireless, multi-room music system. This spec covers the HEOS Command Line Interface (CLI), accessed over a telnet (TCP) connection to port 1255 on a HEOS speaker. Commands are ASCII text strings of the form `heos://command_group/command?attribute=value` delimited by `\r\n`; responses are JSON. The CLI supports player transport control, volume/mute, queue management, multi-player grouping, browsing of local and online music sources, and unsolicited change events.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Physical/electrical specs not in source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 1255
auth:
  type: none  # inferred: no CLI connection auth procedure in source. Optional HEOS account sign_in exists for music-service access (see sign_in action).
```

## Traits
```yaml
traits:
  - queryable  # inferred: numerous get_ query commands in source
  - levelable  # inferred: set_volume / volume_up / volume_down commands in source
  - routable   # inferred: play_input routes source inputs to destination players; set_group groups players
```

## Actions
```yaml
# Command delimiter: \r\n. Special chars &, =, % in attribute values must be
# percent-encoded (%26, %3D, %25). Responses are JSON; some browse/search return
# a "command under process" intermediate response.

# ---- System commands ----
- id: register_for_change_events
  label: Register for Change Events
  kind: action
  command: "heos://system/register_for_change_events?enable={on_or_off}"
  params:
    - name: enable
      type: string
      description: "Register or unregister for unsolicited change events"
      enum: [on, off]

- id: check_account
  label: HEOS Account Check
  kind: query
  command: "heos://system/check_account"
  params: []

- id: sign_in
  label: HEOS Account Sign In
  kind: action
  command: "heos://system/sign_in?un={username}&pw={password}"
  params:
    - name: un
      type: string
      description: HEOS account username
    - name: pw
      type: string
      description: HEOS account password

- id: sign_out
  label: HEOS Account Sign Out
  kind: action
  command: "heos://system/sign_out"
  params: []

- id: heart_beat
  label: HEOS System Heart Beat
  kind: action
  command: "heos://system/heart_beat"
  params: []

- id: reboot
  label: HEOS Speaker Reboot
  kind: action
  command: "heos://system/reboot"
  params: []

- id: prettify_json_response
  label: Prettify JSON Response
  kind: action
  command: "heos://system/prettify_json_response?enable={on_or_off}"
  params:
    - name: enable
      type: string
      description: "Enable/disable prettification of JSON responses"
      enum: [on, off]

# ---- Player commands ----
- id: get_players
  label: Get Players
  kind: query
  command: "heos://player/get_players"
  params: []

- id: get_player_info
  label: Get Player Info
  kind: query
  command: "heos://player/get_player_info?pid={player_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: get_play_state
  label: Get Play State
  kind: query
  command: "heos://player/get_play_state?pid={player_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: set_play_state
  label: Set Play State
  kind: action
  command: "heos://player/set_play_state?pid={player_id}&state={play_state}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: state
      type: string
      description: Player play state
      enum: [play, pause, stop]

- id: get_now_playing_media
  label: Get Now Playing Media
  kind: query
  command: "heos://player/get_now_playing_media?pid={player_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: get_volume
  label: Get Volume
  kind: query
  command: "heos://player/get_volume?pid={player_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: set_volume
  label: Set Volume
  kind: action
  command: "heos://player/set_volume?pid={player_id}&level={vol_level}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: level
      type: integer
      description: Player volume level
      range: [0, 100]

- id: volume_up
  label: Volume Up
  kind: action
  command: "heos://player/volume_up?pid={player_id}&step={step_level}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: step
      type: integer
      description: Player volume step level (default 5)
      range: [1, 10]

- id: volume_down
  label: Volume Down
  kind: action
  command: "heos://player/volume_down?pid={player_id}&step={step_level}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: step
      type: integer
      description: Player volume step level (default 5)
      range: [1, 10]

- id: get_mute
  label: Get Mute
  kind: query
  command: "heos://player/get_mute?pid={player_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: set_mute
  label: Set Mute
  kind: action
  command: "heos://player/set_mute?pid={player_id}&state={on_or_off}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: state
      type: string
      description: Player mute state
      enum: [on, off]

- id: toggle_mute
  label: Toggle Mute
  kind: action
  command: "heos://player/toggle_mute?pid={player_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: get_play_mode
  label: Get Play Mode
  kind: query
  command: "heos://player/get_play_mode?pid={player_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: set_play_mode
  label: Set Play Mode
  kind: action
  command: "heos://player/set_play_mode?pid={player_id}&repeat={repeat}&shuffle={shuffle}"
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

- id: get_queue
  label: Get Queue
  kind: query
  command: "heos://player/get_queue?pid={player_id}&range={start,end}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: range
      type: string
      description: "Optional start,end record index (0-based). Omit for all records; max 100 returned per response."
      required: false

- id: play_queue
  label: Play Queue Item
  kind: action
  command: "heos://player/play_queue?pid={player_id}&qid={queue_song_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: qid
      type: string
      description: Queue id for song returned by get_queue

- id: remove_from_queue
  label: Remove Item(s) from Queue
  kind: action
  command: "heos://player/remove_from_queue?pid={player_id}&qid={queue_ids}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: qid
      type: string
      description: Comma-separated list of queue ids returned by get_queue

- id: save_queue
  label: Save Queue as Playlist
  kind: action
  command: "heos://player/save_queue?pid={player_id}&name={playlist_name}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: name
      type: string
      description: New playlist name (max 128 unicode characters)

- id: clear_queue
  label: Clear Queue
  kind: action
  command: "heos://player/clear_queue?pid={player_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: move_queue_item
  label: Move Queue Item
  kind: action
  command: "heos://player/move_queue_item?pid={player_id}&sqid={source_ids}&dqid={dest_id}"
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

- id: play_next
  label: Play Next
  kind: action
  command: "heos://player/play_next?pid={player_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: play_previous
  label: Play Previous
  kind: action
  command: "heos://player/play_previous?pid={player_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: set_quickselect
  label: Set QuickSelect
  kind: action
  command: "heos://player/set_quickselect?pid={player_id}&id={quick_select_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: id
      type: integer
      description: Quick select id to store currently playing source
      range: [1, 6]
  notes: "LS AVR Only (LEGO AVR, HEOS BAR)"

- id: play_quickselect
  label: Play QuickSelect
  kind: action
  command: "heos://player/play_quickselect?pid={player_id}&id={quick_select_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: id
      type: integer
      description: Quick select id whose source should be played
      range: [1, 6]
  notes: "LS AVR Only (LEGO AVR, HEOS BAR)"

- id: get_quickselects
  label: Get QuickSelects
  kind: query
  command: "heos://player/get_quickselects?pid={player_id}&id={quick_select_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: id
      type: integer
      description: "Optional id for info required (1-6). Omit for all quick selects."
      range: [1, 6]
      required: false
  notes: "LS AVR Only (LEGO AVR, HEOS BAR)"

- id: check_update
  label: Check for Firmware Update
  kind: query
  command: "heos://player/check_update?pid={player_id}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

# ---- Group commands ----
- id: get_groups
  label: Get Groups
  kind: query
  command: "heos://group/get_groups"
  params: []

- id: get_group_info
  label: Get Group Info
  kind: query
  command: "heos://group/get_group_info?gid={group_id}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups

- id: set_group
  label: Set Group
  kind: action
  command: "heos://group/set_group?pid={player_ids}"
  params:
    - name: pid
      type: string
      description: "Comma-separated player ids; first id is group leader. Create/modify group, or single leader id to ungroup."
  notes: "First pid = group leader. Single pid = ungroup all members."

- id: group_get_volume
  label: Get Group Volume
  kind: query
  command: "heos://group/get_volume?gid={group_id}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups

- id: group_set_volume
  label: Set Group Volume
  kind: action
  command: "heos://group/set_volume?gid={group_id}&level={vol_level}"
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
  command: "heos://group/volume_up?gid={group_id}&step={step_level}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups
    - name: step
      type: integer
      description: Group volume step level (default 5)
      range: [1, 10]

- id: group_volume_down
  label: Group Volume Down
  kind: action
  command: "heos://group/volume_down?gid={group_id}&step={step_level}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups
    - name: step
      type: integer
      description: Group volume step level (default 5)
      range: [1, 10]

- id: group_get_mute
  label: Get Group Mute
  kind: query
  command: "heos://group/get_mute?gid={group_id}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups

- id: group_set_mute
  label: Set Group Mute
  kind: action
  command: "heos://group/set_mute?gid={group_id}&state={on_or_off}"
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
  command: "heos://group/toggle_mute?gid={group_id}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups

# ---- Browse commands ----
- id: get_music_sources
  label: Get Music Sources
  kind: query
  command: "heos://browse/get_music_sources"
  params: []

- id: get_source_info
  label: Get Source Info
  kind: query
  command: "heos://browse/get_source_info?sid={source_id}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources (or browse for heos_server/heos_service)

- id: browse_source
  label: Browse Source
  kind: query
  command: "heos://browse/browse?sid={source_id}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: range
      type: string
      description: "Optional start,end index (0-based); supported only while browsing Favorites."
      required: false

- id: browse_source_container
  label: Browse Source Containers
  kind: query
  command: "heos://browse/browse?sid={source_id}&cid={container_id}&range={start,end}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: cid
      type: string
      description: Container id returned by browse or search
    - name: range
      type: string
      description: "Optional start,end index (0-based); max 50 or 100 per response depending on service."
      required: false

- id: get_search_criteria
  label: Get Source Search Criteria
  kind: query
  command: "heos://browse/get_search_criteria?sid={source_id}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources

- id: search
  label: Search
  kind: query
  command: "heos://browse/search?sid={source_id}&search={search_string}&scid={search_criteria}&range={start,end}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: search
      type: string
      description: Search string (max 128 unicode chars, may include '*' wildcard)
    - name: scid
      type: string
      description: Search criteria id returned by get_search_criteria
      enum: [artist, album, song, station]
    - name: range
      type: string
      description: "Optional start,end index (0-based)."
      required: false

- id: play_station
  label: Play Station
  kind: action
  command: "heos://browse/play_stream?pid={player_id}&sid={source_id}&cid={container_id}&mid={media_id}&name={station_name}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: cid
      type: string
      description: Container id (ignore if none, e.g. station from search)
    - name: mid
      type: string
      description: Media id of station type returned by browse or search
    - name: name
      type: string
      description: Station name returned by browse

- id: play_preset
  label: Play Preset Station
  kind: action
  command: "heos://browse/play_preset?pid={player_id}&preset={preset_position}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: preset
      type: integer
      description: Station offset in HEOS Favorites (1 and above)

- id: play_input
  label: Play Input Source
  kind: action
  command: "heos://browse/play_input?pid={player_id}&input={input_name}"
  params:
    - name: pid
      type: string
      description: Destination player id returned by get_players or get_groups
    - name: spid
      type: string
      description: "Optional source player id when playing input from another speaker."
      required: false
    - name: input
      type: string
      description: "Input source name, e.g. inputs/aux_in_1, inputs/optical_in_1, inputs/hdmi_in_1, inputs/tv"
  notes: "External input distribution limited to one player or one group; cannot play an already-selected external input."

- id: play_url
  label: Play URL
  kind: action
  command: "heos://browse/play_stream?pid={player_id}&url={url_path}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: url
      type: string
      description: Absolute path to a playable stream (must be last attribute pair)
  notes: "url=value must be the last attribute pair in the command."

- id: add_container_to_queue
  label: Add Container to Queue
  kind: action
  command: "heos://browse/add_to_queue?pid={player_id}&sid={source_id}&cid={container_id}&aid={add_criteria}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: cid
      type: string
      description: Playable container id returned by browse or search
    - name: aid
      type: integer
      description: Add criteria id
      enum: {1: play_now, 2: play_next, 3: add_to_end, 4: replace_and_play}

- id: add_track_to_queue
  label: Add Track to Queue
  kind: action
  command: "heos://browse/add_to_queue?pid={player_id}&sid={source_id}&cid={container_id}&mid={media_id}&aid={add_criteria}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: cid
      type: string
      description: Container id from browse or search
    - name: mid
      type: string
      description: Track media id returned by browse or search
    - name: aid
      type: integer
      description: Add criteria id
      enum: {1: play_now, 2: play_next, 3: add_to_end, 4: replace_and_play}

- id: rename_playlist
  label: Rename HEOS Playlist
  kind: action
  command: "heos://browse/rename_playlist?sid={source_id}&cid={container_id}&name={playlist_name}"
  params:
    - name: sid
      type: string
      description: Source id (HEOS source for HEOS playlists)
    - name: cid
      type: string
      description: Container id returned in Get HEOS Playlists
    - name: name
      type: string
      description: New playlist name (max 128 unicode chars)

- id: delete_playlist
  label: Delete HEOS Playlist
  kind: action
  command: "heos://browse/delete_playlist?sid={source_id}&cid={container_id}"
  params:
    - name: sid
      type: string
      description: Source id (HEOS source for HEOS playlists)
    - name: cid
      type: string
      description: Container id returned in Get HEOS Playlists

- id: retrieve_metadata
  label: Retrieve Album Metadata
  kind: query
  command: "heos://browse/retrieve_metadata?sid={source_id}&cid={album_id}"
  params:
    - name: sid
      type: string
      description: Source id (Rhapsody/Napster)
    - name: cid
      type: string
      description: Album id from browse or get_now_playing_media
  notes: "Supported for Rhapsody/Napster album art retrieval."

- id: get_service_options
  label: Get Service Options (Obsolete)
  kind: query
  command: "heos://browse/get_service_options?sid={source_id}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources
  notes: "OBSOLETE per source. get_now_playing_media now returns supported options."

- id: set_service_option
  label: Set Service Option
  kind: action
  command: "heos://browse/set_service_option?sid={source_id}&option={option_id}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources
    - name: option
      type: integer
      description: "Service option id. 1=Add Track to Library, 2=Add Album, 3=Add Station, 4=Add Playlist, 5=Remove Track, 6=Remove Album, 7=Remove Station, 8=Remove Playlist, 11=Thumbs Up, 12=Thumbs Down, 13=Create New Station, 20=Remove from HEOS Favorites"
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 20]
    - name: mid
      type: string
      description: "Media id (track/station) from browse source containers. Used by options 1,3,5,7,11,12,20."
      required: false
    - name: cid
      type: string
      description: "Container id (album/playlist) from browse source containers. Used by options 2,4,6,8."
      required: false
    - name: pid
      type: string
      description: "Player id from get_players. Used by options 11,12."
      required: false
    - name: name
      type: string
      description: "Search string for new station. Used by option 13."
      required: false
    - name: scid
      type: integer
      description: "Station criteria id (1=Artist, 3=Track, 5=Show). Used by option 13."
      required: false
  notes: "Generic command selecting options advertised by get_now_playing_media / browse responses. Option 13 supports optional range queries."
```

## Feedbacks
```yaml
# Query responses return values in the heos.message field as attribute=value
# pairs delimited by '&', or in the JSON payload.
- id: play_state
  type: enum
  values: [play, pause, stop]
  query: get_play_state
- id: volume_level
  type: integer
  range: [0, 100]
  query: get_volume
- id: mute_state
  type: enum
  values: [on, off]
  query: get_mute
- id: play_mode_repeat
  type: enum
  values: [on_all, on_one, off]
  query: get_play_mode
- id: play_mode_shuffle
  type: enum
  values: [on, off]
  query: get_play_mode
- id: account_state
  type: enum
  values: [signed_in, signed_out]
  query: check_account
- id: firmware_update
  type: enum
  values: [update_none, update_exist]
  query: check_update
- id: group_volume_level
  type: integer
  range: [0, 100]
  query: group_get_volume
- id: group_mute_state
  type: enum
  values: [on, off]
  query: group_get_mute
```

## Variables
```yaml
# Discrete settable values are represented as Actions above. No additional
# continuous variables beyond volume (covered by set_volume action).
```

## Events
```yaml
# Unsolicited notifications. Sent only after register_for_change_events?enable=on.
# Requires registration via register_for_change_events.
- id: sources_changed
  command: "event/sources_changed"
- id: players_changed
  command: "event/players_changed"
- id: groups_changed
  command: "event/groups_changed"
- id: player_state_changed
  command: "event/player_state_changed"
  message: "pid={player_id}&state={play_state}"
- id: player_now_playing_changed
  command: "event/player_now_playing_changed"
  message: "pid={player_id}"
- id: player_now_playing_progress
  command: "event/player_now_playing_progress"
  message: "pid={player_id}&cur_pos={position_ms}&duration={duration_ms}"
- id: player_playback_error
  command: "event/player_playback_error"
  message: "pid={player_id}&error={error_string}"
- id: player_queue_changed
  command: "event/player_queue_changed"
  message: "pid={player_id}"
- id: player_volume_changed
  command: "event/player_volume_changed"
  message: "pid={player_id}&level={vol_level}&mute={on_or_off}"
- id: repeat_mode_changed
  command: "event/repeat_mode_changed"
  message: "pid={player_id}&repeat={on_all_or_on_one_or_off}"
- id: shuffle_mode_changed
  command: "event/shuffle_mode_changed"
  message: "pid={player_id}&shuffle={on_or_off}"
- id: group_volume_changed
  command: "event/group_volume_changed"
  message: "gid={group_id}&level={vol_level}&mute={on_or_off}"
- id: user_changed
  command: "event/user_changed"
  message: "signed_out | signed_in&un={current_user_name}"
```

## Macros
```yaml
# Recommended driver initialization sequence from source (section 2.1.1):
# 1. register_for_change_events?enable=off
# 2. sign_in (if user credentials available)
# 3. retrieve status: get_players, get_music_sources, get_groups, get_queue,
#    get_now_playing_media, get_volume, get_play_state
# 4. register_for_change_events?enable=on
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source documents no safety interlocks. reboot command affects only the
# connected speaker. No power-sequencing requirements stated.
# UNRESOLVED: no safety/interlock procedures in source.
```

## Notes
- Discovery: HEOS products are discovered via UPnP SSDP; M-SEARCH search target (ST) is `urn:schemas-denon-com:device:ACT-Denon:1`. Once IP is known, open telnet to port 1255.
- A controller should connect to ONE speaker to control the whole HEOS ecosystem; do not connect to every speaker. Max 32 simultaneous socket connections per speaker. Typical pattern: one socket for change events, one for user actions.
- On first connection the CLI core spawns and needs time to discover players; expect a spew of events initially. Follow the initialization macro above.
- Command and JSON response delimiter is `\r\n`. Special characters `&`, `=`, `%` in attribute values are percent-encoded (`%26`, `%3D`, `%%25`); responses are similarly encoded and may need decoding for display.
- Browse/search responses may be deferred: a `{ "result": "success", "message": "command under process" }` intermediate response is sent while CLI fetches from a remote server/service.
- Custom argument `SEQUENCE=<number>` may be added to browse commands to correlate request/response.
- Error responses: `{ "heos": { "result": "fail", "message": "eid=<id>&text=<text>&<command_args>" } }`. Documented error codes: 1 unrecognized command, 2 invalid id, 3 wrong number of arguments, 4 data not available, 5 resource not available, 6 invalid credentials, 7 command not executed, 8 user not logged in, 9 parameter out of range, 10 user not found, 11 internal error, 12 system error (with syserrno), 13 processing previous command, 14 media can't be played, 15 option not supported, 16 too many commands in queue, 17 reached skip limit.
- Changes made to the HEOS account via the HEOS app are not reflected in CLI until the controller re-signs-in; provide sign-out/sign-in in the UI.
- QuickSelect commands (set/play/get_quickselects) apply only to LS AVR products (LEGO AVR, HEOS BAR).
- Supported online music services and their CLI browse/search capabilities are listed in source section 1.1; not all services support all transport controls.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: physical/electrical specs not in source. -->
<!-- UNRESOLVED: default/max records per browse response depends on service type (50 or 100) — not enumerated per service. -->

## Provenance

```yaml
source_domains:
  - rn.dmglobal.com
  - web.archive.org
source_urls:
  - https://rn.dmglobal.com/usmodel/HEOS_CLI_ProtocolSpecification-Version-1.17.pdf
  - "https://web.archive.org/web/20220910064651/https://support.denon.com/app/answers/detail/a_id/6953/~/heos-control-protocol-(cli)"
retrieved_at: 2026-06-30T12:19:43.356Z
last_checked_at: 2026-07-07T11:32:14.377Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:32:14.377Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 60 spec actions are confirmed by verbatim command strings in the source; transport port 1255 and TCP protocol explicitly stated; the spec covers all source command groups completely. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Physical/electrical specs not in source."
- "no safety/interlock procedures in source."
- "firmware version compatibility not stated in source."
- "physical/electrical specs not in source."
- "default/max records per browse response depends on service type (50 or 100) — not enumerated per service."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
