---
spec_id: admin/denon-electronics-137286-refurbished
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics 137286 Refurbished Control Spec"
manufacturer: Denon
model_family: "Denon Electronics 137286 Refurbished"
aliases: []
compatible_with:
  manufacturers:
    - Denon
    - "Denon Electronics"
  models:
    - "Denon Electronics 137286 Refurbished"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.denon.com
  - support-eu.denon.com
source_urls:
  - https://assets.denon.com/documentmaster/us/heos_cli_protocolspecification-version_04062020.pdf
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
  - "https://support-eu.denon.com/app/answers/detail/a_id/20406/~/heos-control-protocol-(cli)"
retrieved_at: 2026-06-30T12:35:43.121Z
last_checked_at: 2026-07-07T11:32:15.710Z
generated_at: 2026-07-07T11:32:15.710Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "hardware model number \"137286\" not corroborated as a HEOS product model inside the source text; source names \"Denon HEOS\" generically. Exact model identity unconfirmed."
  - "full now-playing-media payload schema (song/album/artist/mid/qid/sid/image_url/album_id/options) not enumerated here in detail; refer to source section 4.2.5."
  - "none identified in source beyond action params."
  - "no other named macros documented."
  - "source contains no explicit power-on sequencing, voltage/current, or hard interlock warnings. Only the play_input distribution limitation above is stated."
  - "\"137286 Refurbished\" model identity not confirmed inside the HEOS CLI source text (source describes generic Denon HEOS)."
  - "firmware version compatibility not stated."
  - "protocol version number not stated in source."
  - "exact hardware input set per model not stated; play_input lists a superset of possible input names."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:32:15.710Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 60 spec actions map one-to-one to documented HEOS CLI commands in the source; transport port 1255 and heos:// scheme confirmed; source has 60 distinct commands, coverage ratio 1.0. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Denon Electronics 137286 Refurbished Control Spec

## Summary
Denon HEOS network-connected wireless multi-room music system. This spec covers the HEOS Command Line Interface (CLI), a telnet connection over TCP port 1255 used to manage, browse, play, and query status of HEOS players and groups. Commands are ASCII `heos://` URIs terminated by `\r\n`; responses are JSON objects terminated by `\r\n`.

<!-- UNRESOLVED: hardware model number "137286" not corroborated as a HEOS product model inside the source text; source names "Denon HEOS" generically. Exact model identity unconfirmed. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 1255
  base_url: "heos://"  # scheme used in all command strings; command format: heos://command_group/command?attr=val&...
auth:
  type: none  # inferred: no auth procedure required to open CLI socket. HEOS account sign-in (system/sign_in) is OPTIONAL and only used to enable online music services, not for CLI access.
```

## Traits
```yaml
traits:
  - queryable    # inferred: many get_* query commands present (get_players, get_volume, get_play_state, etc.)
  - levelable    # inferred: volume set/up/down commands with 0-100 level present
  - routable     # inferred: play_input source selection + group/set_group membership routing present
```

## Actions
```yaml
# All commands are ASCII strings terminated with "\r\n". Attribute pairs delimited by '&', name=value by '='.
# Special chars '&','=','%' must be percent-encoded (%26,%3D,%25) in attribute values.

# --- System commands (heos://system/*) ---
- id: register_for_change_events
  label: Register for Change Events
  kind: action
  command: "heos://system/register_for_change_events?enable={enable}"
  params:
    - name: enable
      type: string
      description: "on or off. Enables/disables unsolicited change events."
      enum: [on, off]

- id: check_account
  label: HEOS Account Check
  kind: query
  command: "heos://system/check_account"
  params: []

- id: sign_in
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
  command: "heos://system/prettify_json_response?enable={enable}"
  params:
    - name: enable
      type: string
      description: "on or off. Enables pretty-printed JSON for telnet use."
      enum: [on, off]

# --- Player commands (heos://player/*) ---
- id: get_players
  label: Get Players
  kind: query
  command: "heos://player/get_players"
  params: []

- id: get_player_info
  label: Get Player Info
  kind: query
  command: "heos://player/get_player_info?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

- id: get_play_state
  label: Get Play State
  kind: query
  command: "heos://player/get_play_state?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id

- id: set_play_state
  label: Set Play State
  kind: action
  command: "heos://player/set_play_state?pid={pid}&state={state}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: state
      type: string
      enum: [play, pause, stop]

- id: get_now_playing_media
  label: Get Now Playing Media
  kind: query
  command: "heos://player/get_now_playing_media?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id

- id: get_volume
  label: Get Volume
  kind: query
  command: "heos://player/get_volume?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id

- id: set_volume
  label: Set Volume
  kind: action
  command: "heos://player/set_volume?pid={pid}&level={level}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: level
      type: integer
      description: "Player volume level"
      range: [0, 100]

- id: volume_up
  label: Volume Up
  kind: action
  command: "heos://player/volume_up?pid={pid}&step={step}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: step
      type: integer
      description: "Step level (default 5)"
      range: [1, 10]

- id: volume_down
  label: Volume Down
  kind: action
  command: "heos://player/volume_down?pid={pid}&step={step}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: step
      type: integer
      description: "Step level (default 5)"
      range: [1, 10]

- id: get_mute
  label: Get Mute
  kind: query
  command: "heos://player/get_mute?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id

- id: set_mute
  label: Set Mute
  kind: action
  command: "heos://player/set_mute?pid={pid}&state={state}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: state
      type: string
      enum: [on, off]

- id: toggle_mute
  label: Toggle Mute
  kind: action
  command: "heos://player/toggle_mute?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id

- id: get_play_mode
  label: Get Play Mode
  kind: query
  command: "heos://player/get_play_mode?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id

- id: set_play_mode
  label: Set Play Mode
  kind: action
  command: "heos://player/set_play_mode?pid={pid}&repeat={repeat}&shuffle={shuffle}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: repeat
      type: string
      enum: [on_all, on_one, off]
    - name: shuffle
      type: string
      enum: [on, off]

- id: get_queue
  label: Get Queue
  kind: query
  command: "heos://player/get_queue?pid={pid}&range={range}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: range
      type: string
      description: "Optional 'start#,end#' (range starts from 0). Omitting returns all records, max 100 per response."
      required: false

- id: play_queue
  label: Play Queue Item
  kind: action
  command: "heos://player/play_queue?pid={pid}&qid={qid}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: qid
      type: string
      description: Queue id returned by get_queue

- id: remove_from_queue
  label: Remove Item(s) from Queue
  kind: action
  command: "heos://player/remove_from_queue?pid={pid}&qid={qid}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: qid
      type: string
      description: Comma-separated list of queue ids

- id: save_queue
  label: Save Queue as Playlist
  kind: action
  command: "heos://player/save_queue?pid={pid}&name={name}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: name
      type: string
      description: "New playlist name (max 128 unicode chars)"

- id: clear_queue
  label: Clear Queue
  kind: action
  command: "heos://player/clear_queue?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id

- id: move_queue_item
  label: Move Queue Item
  kind: action
  command: "heos://player/move_queue_item?pid={pid}&sqid={sqid}&dqid={dqid}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: sqid
      type: string
      description: "Comma-separated source queue ids (range 1 to queue size)"
    - name: dqid
      type: integer
      description: "Destination queue id (range 1 to queue size)"

- id: play_next
  label: Play Next
  kind: action
  command: "heos://player/play_next?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id

- id: play_previous
  label: Play Previous
  kind: action
  command: "heos://player/play_previous?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id

- id: set_quickselect
  label: Set QuickSelect (LS AVR Only)
  kind: action
  command: "heos://player/set_quickselect?pid={pid}&id={id}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: id
      type: integer
      description: Quick select id to store current source
      range: [1, 6]

- id: play_quickselect
  label: Play QuickSelect (LS AVR Only)
  kind: action
  command: "heos://player/play_quickselect?pid={pid}&id={id}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: id
      type: integer
      description: Quick select id to play
      range: [1, 6]

- id: get_quickselects
  label: Get QuickSelects (LS AVR Only)
  kind: query
  command: "heos://player/get_quickselects?pid={pid}&id={id}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: id
      type: integer
      description: "Optional id (1-6); omit for all"
      required: false

- id: check_update
  label: Check for Firmware Update
  kind: query
  command: "heos://player/check_update?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id

# --- Group commands (heos://group/*) ---
- id: get_groups
  label: Get Groups
  kind: query
  command: "heos://group/get_groups"
  params: []

- id: get_group_info
  label: Get Group Info
  kind: query
  command: "heos://group/get_group_info?gid={gid}"
  params:
    - name: gid
      type: string
      description: Group id returned by get_groups

- id: set_group
  label: Set Group
  kind: action
  command: "heos://group/set_group?pid={pid}"
  params:
    - name: pid
      type: string
      description: "Comma-separated player ids; first id is group leader. Single id (the leader) ungroups all members."

- id: get_group_volume
  label: Get Group Volume
  kind: query
  command: "heos://group/get_volume?gid={gid}"
  params:
    - name: gid
      type: string
      description: Group id

- id: set_group_volume
  label: Set Group Volume
  kind: action
  command: "heos://group/set_volume?gid={gid}&level={level}"
  params:
    - name: gid
      type: string
      description: Group id
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
      description: Group id
    - name: step
      type: integer
      description: "Step level (default 5)"
      range: [1, 10]

- id: group_volume_down
  label: Group Volume Down
  kind: action
  command: "heos://group/volume_down?gid={gid}&step={step}"
  params:
    - name: gid
      type: string
      description: Group id
    - name: step
      type: integer
      description: "Step level (default 5)"
      range: [1, 10]

- id: get_group_mute
  label: Get Group Mute
  kind: query
  command: "heos://group/get_mute?gid={gid}"
  params:
    - name: gid
      type: string
      description: Group id

- id: set_group_mute
  label: Set Group Mute
  kind: action
  command: "heos://group/set_mute?gid={gid}&state={state}"
  params:
    - name: gid
      type: string
      description: Group id
    - name: state
      type: string
      enum: [on, off]

- id: toggle_group_mute
  label: Toggle Group Mute
  kind: action
  command: "heos://group/toggle_mute?gid={gid}"
  params:
    - name: gid
      type: string
      description: Group id

# --- Browse commands (heos://browse/*) ---
- id: get_music_sources
  label: Get Music Sources
  kind: query
  command: "heos://browse/get_music_sources"
  params: []

- id: get_source_info
  label: Get Source Info
  kind: query
  command: "heos://browse/get_source_info?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id from get_music_sources or browse

- id: browse_source
  label: Browse Source
  kind: query
  command: "heos://browse/browse?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id

- id: browse_source_containers
  label: Browse Source Containers
  kind: query
  command: "heos://browse/browse?sid={sid}&cid={cid}&range={range}"
  params:
    - name: sid
      type: string
      description: Source id
    - name: cid
      type: string
      description: Container id from browse or search
    - name: range
      type: string
      description: "Optional 'start#,end#' (from 0)"
      required: false

- id: get_search_criteria
  label: Get Source Search Criteria
  kind: query
  command: "heos://browse/get_search_criteria?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id

- id: search
  label: Search
  kind: query
  command: "heos://browse/search?sid={sid}&search={search}&scid={scid}&range={range}"
  params:
    - name: sid
      type: string
      description: Source id
    - name: search
      type: string
      description: "Search string (max 128 unicode chars, '*' wildcard if supported)"
    - name: scid
      type: string
      description: Search criteria id
    - name: range
      type: string
      description: "Optional 'start#,end#' (from 0)"
      required: false

- id: play_stream_station
  label: Play Station
  kind: action
  command: "heos://browse/play_stream?pid={pid}&sid={sid}&cid={cid}&mid={mid}&name={name}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: sid
      type: string
      description: Source id
    - name: cid
      type: string
      description: Container id (may be omitted when playing from Search)
      required: false
    - name: mid
      type: string
      description: Media id (must be a 'station' media type)
    - name: name
      type: string
      description: Station name from browse

- id: play_preset
  label: Play Preset Station
  kind: action
  command: "heos://browse/play_preset?pid={pid}&preset={preset}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: preset
      type: integer
      description: "Station offset in HEOS Favorites (>= 1)"

- id: play_input
  label: Play Input Source
  kind: action
  command: "heos://browse/play_input?pid={pid}&spid={spid}&input={input}"
  params:
    - name: pid
      type: string
      description: "Destination player id"
    - name: spid
      type: string
      description: "Source player id (when playing input from another speaker). Omit for same-speaker input."
      required: false
    - name: input
      type: string
      description: Input source name (e.g. inputs/aux_in_1, inputs/optical_in_1, inputs/hdmi_in_1, inputs/cable_sat, inputs/dvd, inputs/tuner, inputs/phono, etc.)

- id: play_url
  label: Play URL
  kind: action
  command: "heos://browse/play_stream?pid={pid}&url={url}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: url
      type: string
      description: "Absolute path to a playable stream. Must be the LAST attribute pair in the command."

- id: add_container_to_queue
  label: Add Container to Queue with Options
  kind: action
  command: "heos://browse/add_to_queue?pid={pid}&sid={sid}&cid={cid}&aid={aid}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: sid
      type: string
      description: Source id
    - name: cid
      type: string
      description: Container id (must be a playable container)
    - name: aid
      type: integer
      description: Add criteria
      enum: [1, 2, 3, 4]
      enum_desc:
        1: play now
        2: play next
        3: add to end
        4: replace and play

- id: add_track_to_queue
  label: Add Track to Queue with Options
  kind: action
  command: "heos://browse/add_to_queue?pid={pid}&sid={sid}&cid={cid}&mid={mid}&aid={aid}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: sid
      type: string
      description: Source id
    - name: cid
      type: string
      description: Container id
    - name: mid
      type: string
      description: Media id (must be a 'track' media type)
    - name: aid
      type: integer
      enum: [1, 2, 3, 4]
      enum_desc:
        1: play now
        2: play next
        3: add to end
        4: replace and play

- id: rename_playlist
  label: Rename HEOS Playlist
  kind: action
  command: "heos://browse/rename_playlist?sid={sid}&cid={cid}&name={name}"
  params:
    - name: sid
      type: string
      description: Source id (HEOS Playlists source)
    - name: cid
      type: string
      description: Container id from Get HEOS Playlists
    - name: name
      type: string
      description: "New playlist name (max 128 unicode chars)"

- id: delete_playlist
  label: Delete HEOS Playlist
  kind: action
  command: "heos://browse/delete_playlist?sid={sid}&cid={cid}"
  params:
    - name: sid
      type: string
      description: Source id (HEOS Playlists source)
    - name: cid
      type: string
      description: Container id from Get HEOS Playlists

- id: retrieve_metadata
  label: Retrieve Album Metadata
  kind: query
  command: "heos://browse/retrieve_metadata?sid={sid}&cid={cid}"
  params:
    - name: sid
      type: string
      description: "Source id (supported: Rhapsody/Napster)"
    - name: cid
      type: string
      description: Album id from browse or get_now_playing_media

- id: get_service_options
  label: Get Service Options for Now Playing (OBSOLETE)
  kind: query
  command: "heos://browse/get_service_options?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id
  notes: "OBSOLETE per source. Use get_now_playing_media, which now includes supported options."

- id: set_service_option
  label: Set Service Option
  kind: action
  command: "heos://browse/set_service_option?sid={sid}&option={option}&mid={mid}&cid={cid}&pid={pid}&name={name}&scid={scid}"
  params:
    - name: sid
      type: string
      description: Source id
    - name: option
      type: integer
      description: "Service option id. Required."
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13]
      enum_desc:
        1: Add Track to Library
        2: Add Album to Library
        3: Add Station to Library
        4: Add Playlist to Library
        5: Remove Track from Library
        6: Remove Album from Library
        7: Remove Station from Library
        8: Remove Playlist from Library
        11: Thumbs Up
        12: Thumbs Down
        13: Create New Station
    - name: mid
      type: string
      description: Media id (for track/station options)
      required: false
    - name: cid
      type: string
      description: Container id (for album/playlist options)
      required: false
    - name: pid
      type: string
      description: Player id (for thumbs up/down)
      required: false
    - name: name
      type: string
      description: "Search string (for Create New Station, option 13)"
      required: false
    - name: scid
      type: integer
      description: "Station criteria id for option 13 (1=Artist, 5=Show, 3=Track)"
      required: false
```

## Feedbacks
```yaml
# Query responses carry state in the heos.message attribute string (pid=..&state=..&level=..).
# Observable states enumerated from query command responses:
- id: play_state
  type: enum
  values: [play, pause, stop]
- id: mute_state
  type: enum
  values: [on, off]
- id: volume_level
  type: integer
  range: [0, 100]
- id: repeat_mode
  type: enum
  values: [on_all, on_one, off]
- id: shuffle_mode
  type: enum
  values: [on, off]
- id: account_state
  type: enum
  values: [signed_in, signed_out]
- id: update_available
  type: enum
  values: [update_none, update_exist]
# UNRESOLVED: full now-playing-media payload schema (song/album/artist/mid/qid/sid/image_url/album_id/options) not enumerated here in detail; refer to source section 4.2.5.
```

## Variables
```yaml
# Settable parameters already represented as action params (volume level, play_mode, etc.).
# No additional standalone settable variables beyond those actions.
# UNRESOLVED: none identified in source beyond action params.
```

## Events
```yaml
# Unsolicited change events. Only emitted after register_for_change_events?enable=on.
# All arrive as JSON with command "event/*" and a message attribute string.
- id: sources_changed
  command: "event/sources_changed"
- id: players_changed
  command: "event/players_changed"
- id: groups_changed
  command: "event/groups_changed"
- id: player_state_changed
  command: "event/player_state_changed"
  message: "pid={pid}&state={state}"
- id: player_now_playing_changed
  command: "event/player_now_playing_changed"
  message: "pid={pid}"
- id: player_now_playing_progress
  command: "event/player_now_playing_progress"
  message: "pid={pid}&cur_pos={position_ms}&duration={duration_ms}"
- id: player_playback_error
  command: "event/player_playback_error"
  message: "pid={pid}&error={error_string}"
- id: player_queue_changed
  command: "event/player_queue_changed"
  message: "pid={pid}"
- id: player_volume_changed
  command: "event/player_volume_changed"
  message: "pid={pid}&level={level}&mute={mute}"
- id: repeat_mode_changed
  command: "event/repeat_mode_changed"
  message: "pid={pid}&repeat={repeat}"
- id: shuffle_mode_changed
  command: "event/shuffle_mode_changed"
  message: "pid={pid}&shuffle={shuffle}"
- id: group_volume_changed
  command: "event/group_volume_changed"
  message: "gid={gid}&level={level}&mute={mute}"
- id: user_changed
  command: "event/user_changed"
  message: "signed_out OR signed_in&un={username}"
```

## Macros
```yaml
# Recommended driver initialization sequence (source section 2.1.1):
#   1. system/register_for_change_events?enable=off
#   2. system/sign_in (if user credentials available)
#   3. player/get_players, browse/get_music_sources, group/get_groups, player/get_queue, player/get_now_playing_media, player/get_volume, player/get_play_state
#   4. system/register_for_change_events?enable=on
# Multi-step sequences not otherwise encoded as single commands.
# UNRESOLVED: no other named macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "play_input external input distribution is limited to one player or one group; an already-selected external input cannot be played elsewhere, and an input playing on a device itself cannot be distributed to other players."
# UNRESOLVED: source contains no explicit power-on sequencing, voltage/current, or hard interlock warnings. Only the play_input distribution limitation above is stated.
```

## Notes
- Discovery: HEOS products discovered via UPnP SSDP. M-SEARCH search target (ST): `urn:schemas-denon-com:device:ACT-Denon:1`. IP can also be set statically.
- Connection: telnet socket to TCP port 1255. Max 32 simultaneous socket connections per speaker. Controllers should connect to ONE speaker and control all via that single connection (not one socket per speaker). Recommended to keep an idle connection to avoid the CLI module returning to dormant mode.
- Command string delimiter: `\r\n`. JSON response delimiter: `\r\n`.
- URL-encoding: `&`=`%26`, `=`=`%3D`, `%`=`%25` in attribute values. Strings returned from browse/search are already encoded; reuse them verbatim in play_stream/add_to_queue.
- `browse/play_stream?...&url=...` — the `url=` pair MUST be the last attribute pair.
- `player/clear_queue` and similar can trigger multiple events (e.g. Player Queue Changed + Player State Changed).
- Asynchronous "command under process" interim response is sent for slow browse/search operations.
- QuickSelect commands (set/play/get) are LS AVR only (LEGO AVR, HEOS BAR per source).
- `browse/get_service_options` is marked OBSOLETE; `get_now_playing_media` now carries those options.
- `browse/play_stream?sid=..&mid=..` (old input variant) is marked OBSOLETE; use `browse/play_input` instead.

<!-- UNRESOLVED: "137286 Refurbished" model identity not confirmed inside the HEOS CLI source text (source describes generic Denon HEOS). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: protocol version number not stated in source. -->
<!-- UNRESOLVED: exact hardware input set per model not stated; play_input lists a superset of possible input names. -->
````

## Provenance

```yaml
source_domains:
  - assets.denon.com
  - support-eu.denon.com
source_urls:
  - https://assets.denon.com/documentmaster/us/heos_cli_protocolspecification-version_04062020.pdf
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
  - "https://support-eu.denon.com/app/answers/detail/a_id/20406/~/heos-control-protocol-(cli)"
retrieved_at: 2026-06-30T12:35:43.121Z
last_checked_at: 2026-07-07T11:32:15.710Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:32:15.710Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 60 spec actions map one-to-one to documented HEOS CLI commands in the source; transport port 1255 and heos:// scheme confirmed; source has 60 distinct commands, coverage ratio 1.0. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "hardware model number \"137286\" not corroborated as a HEOS product model inside the source text; source names \"Denon HEOS\" generically. Exact model identity unconfirmed."
- "full now-playing-media payload schema (song/album/artist/mid/qid/sid/image_url/album_id/options) not enumerated here in detail; refer to source section 4.2.5."
- "none identified in source beyond action params."
- "no other named macros documented."
- "source contains no explicit power-on sequencing, voltage/current, or hard interlock warnings. Only the play_input distribution limitation above is stated."
- "\"137286 Refurbished\" model identity not confirmed inside the HEOS CLI source text (source describes generic Denon HEOS)."
- "firmware version compatibility not stated."
- "protocol version number not stated in source."
- "exact hardware input set per model not stated; play_input lists a superset of possible input names."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
