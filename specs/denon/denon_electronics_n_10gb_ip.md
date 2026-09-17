---
spec_id: admin/denon-electronics-n-10gb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics N 10Gb Control Spec"
manufacturer: Denon
model_family: "N 10Gb"
aliases: []
compatible_with:
  manufacturers:
    - Denon
    - "Denon Electronics"
  models:
    - "N 10Gb"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.denon.com
source_urls:
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-09-15T18:43:02.596Z
last_checked_at: 2026-09-15T22:16:27.268Z
generated_at: 2026-09-15T22:16:27.268Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "source documents no power on/off commands (reboot only)"
  - "device hardware specifications (voltage, power) not in source"
  - "none applicable from source"
  - "source contains no safety warnings or interlock procedures."
  - "protocol version number not stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-15T22:16:27.268Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions match source 4.1-4.4 commands literally; transport port 1255 verified; no source commands unrepresented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-15
---

# Denon Electronics N 10Gb Control Spec

## Summary
Denon HEOS N 10Gb is a network-connected wireless multi-room music player. This spec covers the HEOS Command Line Interface (CLI), accessed over a TCP telnet socket (port 1255): controllers send ASCII command strings in `heos://command_group/command?attribute=value` form terminated by `\r\n`, and receive JSON responses (also `\r\n`-terminated). The CLI supports player/group management, playback transport, volume/mute, queue management, music-source browsing/search, and unsolicited change events.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: source documents no power on/off commands (reboot only) -->
<!-- UNRESOLVED: device hardware specifications (voltage, power) not in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 1255
auth:
  type: none  # inferred: no connection-level auth procedure in source; HEOS account sign_in is optional and only required for online music services
```

## Traits
```yaml
# Inferred from command evidence in source:
- levelable   # inferred: set_volume / volume_up / volume_down (level 0-100), per-player and per-group
- queryable   # inferred: get_players, get_play_state, get_volume, get_mute, get_queue, etc.
- routable    # inferred: play_input routes an input source to same or another player (pid/spid)
```

## Actions
```yaml
# System commands
- id: register_for_change_events
  label: Register For Change Events
  kind: action
  command: "heos://system/register_for_change_events?enable={enable}"
  params:
    - name: enable
      type: string
      description: "on or off; on enables unsolicited change events (off by default)"

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
  kind: query
  command: "heos://system/heart_beat"
  params: []

- id: reboot
  label: HEOS Speaker Reboot
  kind: action
  command: "heos://system/reboot"
  params: []
  # Note from source: reboots only the HEOS device the controller is connected to via CLI port.

- id: prettify_json_response
  label: Prettify JSON Response
  kind: action
  command: "heos://system/prettify_json_response?enable={enable}"
  params:
    - name: enable
      type: string
      description: "on or off; prettifies JSON responses for telnet use"

# Player commands
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
      description: "play, pause, or stop"

- id: get_now_playing_media
  label: Get Now Playing Media
  kind: query
  command: "heos://player/get_now_playing_media?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id returned by get_players or get_groups

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
      description: Player volume level, 0 to 100

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
      description: Volume step level, 1 to 10 (default 5)

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
      description: Volume step level, 1 to 10 (default 5)

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
      description: "on or off"

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
      description: "on_all, on_one, or off"
    - name: shuffle
      type: string
      description: "on or off"

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
      description: "Optional 'start#,end#' record index (starts from 0); omitting returns up to 100 records per response"

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
      description: Queue id for song returned by get_queue

- id: remove_from_queue
  label: Remove Item(s) From Queue
  kind: action
  command: "heos://player/remove_from_queue?pid={pid}&qid={qid_list}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: qid_list
      type: string
      description: Comma-separated list of queue ids returned by get_queue

- id: save_queue
  label: Save Queue As Playlist
  kind: action
  command: "heos://player/save_queue?pid={pid}&name={name}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: name
      type: string
      description: New playlist name, limited to 128 unicode characters

- id: clear_queue
  label: Clear Queue
  kind: action
  command: "heos://player/clear_queue?pid={pid}"
  params:
    - name: pid
      type: string
      description: Player id

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

# Group commands
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
  label: Set Group (Create / Modify / Ungroup)
  kind: action
  command: "heos://group/set_group?pid={pid_list}"
  params:
    - name: pid_list
      type: string
      description: "Comma-separated player ids; first pid is group leader. Multiple pids create/modify a group; a single leader pid ungroups all players in that group"

- id: group_get_volume
  label: Get Group Volume
  kind: query
  command: "heos://group/get_volume?gid={gid}"
  params:
    - name: gid
      type: string
      description: Group id

- id: group_set_volume
  label: Set Group Volume
  kind: action
  command: "heos://group/set_volume?gid={gid}&level={level}"
  params:
    - name: gid
      type: string
      description: Group id
    - name: level
      type: integer
      description: Group volume level, 0 to 100

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
      description: Group volume step level, 1 to 10 (default 5)

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
      description: Group volume step level, 1 to 10 (default 5)

- id: group_get_mute
  label: Get Group Mute
  kind: query
  command: "heos://group/get_mute?gid={gid}"
  params:
    - name: gid
      type: string
      description: Group id

- id: group_set_mute
  label: Set Group Mute
  kind: action
  command: "heos://group/set_mute?gid={gid}&state={state}"
  params:
    - name: gid
      type: string
      description: Group id
    - name: state
      type: string
      description: "on or off"

- id: group_toggle_mute
  label: Toggle Group Mute
  kind: action
  command: "heos://group/toggle_mute?gid={gid}"
  params:
    - name: gid
      type: string
      description: Group id

# Browse commands
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
      description: Source id returned by get_music_sources (or by browse for heos_server / heos_service types)

- id: browse_source
  label: Browse Source
  kind: query
  command: "heos://browse/browse?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id; used for browsing 'heos_server' / 'heos_service' sources and top music view

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
      description: Container id returned by browse or search
    - name: range
      type: string
      description: "Optional 'start#,end#' (starts from 0); omitting returns up to 50 or 100 records depending on service"

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
      description: Search string limited to 128 unicode characters; may contain '*' wildcard if supported by scid
    - name: scid
      type: string
      description: Search criteria id returned by get_search_criteria
    - name: range
      type: string
      description: "Optional 'start#,end#' (starts from 0)"

- id: play_stream
  label: Play Station (Play Stream)
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
      description: Container id used to browse current container; ignore when no cid (e.g. station from Search)
    - name: mid
      type: string
      description: Media id of 'station' media type returned by browse or search
    - name: name
      type: string
      description: Station name returned by browse

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
      description: Station offset in HEOS Favorites, 1 and above

- id: play_input
  label: Play Input Source (Same Speaker)
  kind: action
  command: "heos://browse/play_input?pid={pid}&input={input}"
  params:
    - name: pid
      type: string
      description: Player id of the selected speaker
    - name: input
      type: string
      description: "Input source name, e.g. inputs/aux_in_1, inputs/line_in_1, inputs/coax_in_1, inputs/optical_in_1, inputs/hdmi_in_1, inputs/hdmi_arc_1, inputs/cable_sat, inputs/dvd, inputs/bluray, inputs/game, inputs/mediaplayer, inputs/cd, inputs/tuner, inputs/hdradio, inputs/tvaudio, inputs/phono; validity depends on source HEOS device type"

- id: play_input_remote
  label: Play Input Source (Another Speaker)
  kind: action
  command: "heos://browse/play_input?pid={pid}&spid={spid}&input={input}"
  params:
    - name: pid
      type: string
      description: Player id of destination HEOS speaker
    - name: spid
      type: string
      description: Player id of the HEOS device acting as the source
    - name: input
      type: string
      description: Input source name (see play_input)

- id: play_stream_obsolete
  label: Play Stream (Obsolete sid Variant)
  kind: action
  command: "heos://browse/play_stream?pid={pid}&sid={sid}&mid={mid}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: sid
      type: string
      description: Source id
    - name: mid
      type: string
      description: Media id
  # Source marks this variant OBSOLETE; use play_input instead.

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
      description: 'Playable' container id returned by browse or search
    - name: aid
      type: integer
      description: "Add criteria: 1 play now, 2 play next, 3 add to end, 4 replace and play"

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
      description: Container id used to browse/search current container
    - name: mid
      type: string
      description: Media id of 'track' media type returned by browse or search
    - name: aid
      type: integer
      description: "Add criteria: 1 play now, 2 play next, 3 add to end, 4 replace and play"

- id: rename_playlist
  label: Rename HEOS Playlist
  kind: action
  command: "heos://browse/rename_playlist?sid={sid}&cid={cid}&name={name}"
  params:
    - name: sid
      type: string
      description: Source id; select HEOS source to get HEOS playlists
    - name: cid
      type: string
      description: Container id returned in Get HEOS Playlists
    - name: name
      type: string
      description: New playlist name limited to 128 unicode characters

- id: delete_playlist
  label: Delete HEOS Playlist
  kind: action
  command: "heos://browse/delete_playlist?sid={sid}&cid={cid}"
  params:
    - name: sid
      type: string
      description: Source id; select HEOS source to get HEOS playlists
    - name: cid
      type: string
      description: Container id returned in Get HEOS Playlists

- id: retrieve_metadata
  label: Retrieve Album Metadata
  kind: query
  command: "heos://browse/retrieve_metadata?sid={sid}&cid={cid}"
  params:
    - name: sid
      type: string
      description: "Source id; supported sources are Rhapsody / Napster"
    - name: cid
      type: string
      description: Album id returned by browse or get_now_playing_media (Rhapsody/Napster album ids)

- id: get_service_options
  label: Get Service Options for Now Playing Screen (Obsolete)
  kind: query
  command: "heos://browse/get_service_options?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id
  # Source marks this command OBSOLETE; get_now_playing_media now includes options.

- id: set_service_option
  label: Set Service Option
  kind: action
  command: "heos://browse/set_service_option?sid={sid}&option={option}&mid={mid}"
  params:
    - name: sid
      type: string
      description: Source id
    - name: option
      type: integer
      description: "Option id: 1 Add Track to Library (Rhapsody), 2 Add Album to Library (Rhapsody), 3 Add Station to Library (Rhapsody), 4 Add Playlist to Library (Rhapsody), 5 Remove Track from Library (Rhapsody), 6 Remove Album from Library (Rhapsody), 7 Remove Station from Library (Rhapsody), 8 Remove Playlist from Library (Rhapsody), 11 Thumbs Up (Pandora), 12 Thumbs Down (Pandora), 13 Create New Station (Pandora, iHeartRadio; optional scid and range params), 19 Add Station to HEOS Favorites (optional pid, or sid/cid/mid on browse screen), 20 Remove from HEOS Favorites"
    - name: mid
      type: string
      description: "Optional; media/container id or name depending on option (mid for track/station ids, cid for album/playlist ids, name for Create New Station search string, pid for options 11/12/19)"
```

## Feedbacks
```yaml
# Populated from query-response payloads documented in source:
- id: players
  type: list
  description: "Player list: name, pid, gid (optional), model, version, network (wired|wifi), lineout (1 variable|2 fixed), control (1 None|2 IR|3 Trigger|4 Network, only when lineout=2)"

- id: groups
  type: list
  description: "Group list: name, gid, players[] each with name, pid, role (leader or member)"

- id: play_state
  type: enum
  values: [play, pause, stop]

- id: now_playing_media
  type: object
  description: "Payload: type (song|station), song, album, artist, station (when type=station), image_url, mid, qid, sid, options[]"

- id: volume_level
  type: integer
  description: Volume level 0 to 100 (per player via get_volume; per group via group/get_volume)

- id: mute_state
  type: enum
  values: [on, off]

- id: play_mode
  type: object
  description: "repeat (on_all|on_one|off) and shuffle (on|off), via get_play_mode"

- id: queue
  type: list
  description: "Queue items: song, album, artist, image_url, qid, mid, album_id; max 100 records per response"

- id: music_sources
  type: list
  description: "Source list: name, image_url, type (music_service|heos_service|heos_server|dlna_server), sid"

- id: account_status
  type: enum
  values: [signed_in, signed_out]
```

## Variables
```yaml
# No settable parameters beyond the discrete actions above; volume, mute, and
# play mode are all covered by dedicated set/toggle actions.
# UNRESOLVED: none applicable from source
```

## Events
```yaml
# Unsolicited change events; only sent after register_for_change_events?enable=on.
- id: sources_changed
  description: '{ "heos": { "command": "event/sources_changed" } }'

- id: players_changed
  description: '{ "heos": { "command": "event/players_changed" } }'

- id: groups_changed
  description: '{ "heos": { "command": "event/groups_changed" } }'

- id: source_data_changed
  description: '{ "heos": { "command": "event/source_data_changed", "message": "sid=''source_id''" } }'

- id: player_state_changed
  description: '{ "heos": { "command": "event/player_state_changed", "message": "pid=''player_id''&state=''play_state''" } }'

- id: player_now_playing_changed
  description: '{ "heos": { "command": "event/player_now_playing_changed", "message": "pid=''player_id''" } }'

- id: player_now_playing_progress
  description: '{ "heos": { "command": "event/player_now_playing_progress", "message": "pid=player_id&cur_pos=position_ms&duration=duration_ms" } }'

- id: player_playback_error
  description: '{ "heos": { "command": "event/player_playback_error", "message": "pid=player_id&error=Could Not Download" } }'

- id: player_queue_changed
  description: '{ "heos": { "command": "event/player_queue_changed", "message": "pid=''player_id''" } }'

- id: player_volume_changed
  description: '{ "heos": { "command": "event/player_volume_changed", "message": "pid=''player_id''&level=''vol_level''" } }'

- id: player_mute_changed
  description: '{ "heos": { "command": "event/player_mute_changed", "message": "pid=''player_id''&state=''on_or_off''" } }'

- id: repeat_mode_changed
  description: '{ "heos": { "command": "event/repeat_mode_changed", "message": "pid=''player_id''&repeat=''on_all_or_on_one_or_off''" } }'

- id: shuffle_mode_changed
  description: '{ "heos": { "command": "event/shuffle_mode_changed", "message": "pid=''player_id''&shuffle=''on_or_off''" } }'

- id: group_changed
  description: '{ "heos": { "command": "event/group_changed", "message": "gid=''group_id''" } }'

- id: group_volume_changed
  description: '{ "heos": { "command": "event/group_volume_changed", "message": "gid=''group_id''&level=''vol_level''" } }'

- id: group_mute_changed
  description: '{ "heos": { "command": "event/group_mute_changed", "message": "gid=''group_id''&state=''on_or_off''" } }'

- id: user_changed
  description: '{ "heos": { "command": "event/user_changed", "message": "signed_out or signed_in&un=<current user name>" } }'
```

## Macros
```yaml
# Driver initialization sequence from source Section 2.1.1:
- id: driver_initialization
  steps:
    - "heos://system/register_for_change_events?enable=off"
    - "heos://system/sign_in?un={un}&pw={pw}"  # only if user credentials available
    - "heos://player/get_players"
    - "heos://browse/get_music_sources"
    - "heos://group/get_groups"
    - "heos://player/get_queue?pid={pid}"
    - "heos://player/get_now_playing_media?pid={pid}"
    - "heos://player/get_volume?pid={pid}"
    - "heos://player/get_play_state?pid={pid}"
    - "heos://system/register_for_change_events?enable=on"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
# Note: system/reboot restarts the connected device; source states no interlock requirements.
```

## Notes
- Connection: telnet-style TCP socket to port 1255. Device discoverable via UPnP SSDP; M-SEARCH search target (ST) is `urn:schemas-denon-com:device:ACT-Denon:1`. IP can also be set statically.
- One socket connection to a single HEOS speaker controls all HEOS speakers on the network; do not connect to every speaker. Controllers may open multiple connections (typically one for events, one for user actions). Maximum 32 simultaneous socket connections per speaker.
- Framing: commands and JSON responses are delimited by `\r\n`. Commands are ASCII `heos://` URI strings; responses are JSON with `heos` (command/result/message) and optional `payload`.
- URL encoding required in attribute values: `&` → `%26`, `=` → `%3D`, `%` → `%25`. Strings received in browse responses are already encoded and can be reused directly.
- Browse/search commands may return an interim `{"heos": {"message": "command under process"}}` response when data cannot be populated immediately.
- CLI module runs dormant until first socket connection; allow time for player discovery before issuing player commands, and expect an initial spew of events on connect (hence the un-register-first init sequence).
- HEOS account changes made in the HEOS app do not reflect via CLI until re sign-in; provide sign-out/sign-in in controller UI.
- Custom argument `SEQUENCE=<number>` may be added to browse commands to correlate command/response.
- External input distribution limitation: an external input can be distributed to only one player or one group at a time and cannot be re-selected while already playing.
- Error responses carry `result: "fail"` with `message` containing `eid=<code>&text=<text>`; codes 1–17 documented (e.g. 1 unrecognized command, 6 invalid credentials, 8 user not logged in, 13 processing previous command, 17 reached skip limit).
- Supported online services: Deezer, iHeartRadio, Napster, Pandora, Rhapsody, SoundCloud, SiriusXM, Tidal, TuneIn, Amazon Music; plus local USB media, DLNA servers, HEOS Favorites/Playlists/History, and HEOS aux inputs.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version number not stated in source -->

## Provenance

```yaml
source_domains:
  - assets.denon.com
source_urls:
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-09-15T18:43:02.596Z
last_checked_at: 2026-09-15T22:16:27.268Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-15T22:16:27.268Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions match source 4.1-4.4 commands literally; transport port 1255 verified; no source commands unrepresented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "source documents no power on/off commands (reboot only)"
- "device hardware specifications (voltage, power) not in source"
- "none applicable from source"
- "source contains no safety warnings or interlock procedures."
- "protocol version number not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
