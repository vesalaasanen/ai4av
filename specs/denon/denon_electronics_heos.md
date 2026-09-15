---
spec_id: admin/denon-electronics-heos
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics HEOS Control Spec"
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
  - assets.denon.com
  - marantz.com
source_urls:
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
  - https://www.marantz.com/on/demandware.static/-/Library-Sites-marantz_northamerica_shared/en_US/v1709469166640/archive-downloads/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-09-02T17:12:19.455Z
last_checked_at: 2026-09-03T22:20:53.230Z
generated_at: 2026-09-03T22:20:53.230Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "error code section reference (\"Section TBD\") incomplete in source"
  - "no settable non-action parameters in source; volume/mute/play-mode are discrete CLI commands (see Actions)"
  - "no safety warnings or interlock procedures in source"
  - "source references error code list as \"Section TBD\" (table present in this document, codes 1-17)"
verification:
  verdict: verified
  checked_at: 2026-09-03T22:20:53.230Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions map to unique HEOS CLI command URIs documented verbatim in the source, transport port 1255 is supported, no extra source commands remain. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Denon Electronics HEOS Control Spec

## Summary
Denon HEOS is a network-connected wireless multi-room music system. The HEOS Command Line Interface (CLI) lets external control systems manage, browse, play, and get status from HEOS products over a telnet (TCP) connection. Commands are ASCII text strings (`heos://command_group/command?attributes`), responses are JSON, terminated with `\r\n`.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: error code section reference ("Section TBD") incomplete in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 1255
auth:
  type: none  # inferred: no connection auth procedure in source (sign_in is HEOS account, optional)
```

## Traits
```yaml
- queryable  # inferred: extensive get_* query commands
- levelable  # inferred: volume set/up/down commands (0-100)
- routable   # inferred: play_input can route a source device input to another player (spid)
```

## Actions
```yaml
# System commands
- id: register_for_change_events
  label: Register for Change Events
  kind: action
  command: "heos://system/register_for_change_events?enable={enable}"
  params:
    - name: enable
      type: enum
      description: "Register or unregister for change events (on, off)"

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
    - name: username
      type: string
      description: HEOS account username
    - name: password
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
      type: enum
      description: "Enable or disable prettification of JSON response (on, off)"

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
      type: enum
      description: "Player play state (play, pause, stop)"

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
      description: "Player volume level (0 to 100)"

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
      description: "Volume step level (1 to 10, default 5)"

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
      description: "Volume step level (1 to 10, default 5)"

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
      type: enum
      description: "Player mute state (on, off)"

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
      type: enum
      description: "Repeat state (on_all, on_one, off)"
    - name: shuffle
      type: enum
      description: "Shuffle state (on, off)"

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
      description: "Optional 'start#,end#' record index (starts from 0); omitted returns up to 100 records per response"

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
  label: Remove Item(s) from Queue
  kind: action
  command: "heos://player/remove_from_queue?pid={pid}&qid={qid_list}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: qid_list
      type: string
      description: Comma-separated queue ids returned by get_queue

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
  label: Set Group (Create/Modify/Ungroup)
  kind: action
  command: "heos://group/set_group?pid={pid_list}"
  params:
    - name: pid_list
      type: string
      description: Comma-separated player ids; first is group leader. Single leader pid = ungroup all players in group.

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
      description: "Group volume level (0 to 100)"

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
      description: "Group volume step level (1 to 10, default 5)"

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
      description: "Group volume step level (1 to 10, default 5)"

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
      type: enum
      description: "Group mute state (on, off)"

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
      description: Source id returned by get_music_sources or browse

- id: browse_source
  label: Browse Source
  kind: query
  command: "heos://browse/browse?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources or browse (heos_server / heos_service types)

- id: browse_source_containers
  label: Browse Source Containers
  kind: query
  command: "heos://browse/browse?sid={sid}&cid={cid}&range={range}"
  params:
    - name: sid
      type: string
      description: Source id returned by get_music_sources or browse
    - name: cid
      type: string
      description: Container id returned by browse or search
    - name: range
      type: string
      description: "Optional 'start#,end#' record index (starts from 0); omitted returns up to 50 or 100 records depending on service"

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
      description: Search string limited to 128 unicode characters, may contain '*' wildcard if supported
    - name: scid
      type: string
      description: Search criteria id returned by get_search_criteria
    - name: range
      type: string
      description: "Optional 'start#,end#' record index (starts from 0)"

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
      description: Container id; ignore if no container id (station from Search)
    - name: mid
      type: string
      description: Media id returned by browse or search; must be 'station' media type
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
      description: Station offset in HEOS Favorites (1 and above)

- id: play_input
  label: Play Input Source (Same Speaker)
  kind: action
  command: "heos://browse/play_input?pid={pid}&input={input}"
  params:
    - name: pid
      type: string
      description: Player id of destination HEOS speaker
    - name: input
      type: string
      description: "Input source name, e.g. inputs/aux_in_1, inputs/line_in_1..4, inputs/coax_in_1..2, inputs/optical_in_1..2, inputs/hdmi_in_1, inputs/hdmi_arc_1, inputs/cable_sat, inputs/dvd, inputs/bluray, inputs/game, inputs/mediaplayer, inputs/cd, inputs/tuner, inputs/hdradio, inputs/tvaudio, inputs/phono"

- id: play_input_remote
  label: Play Input Source (Another Speaker)
  kind: action
  command: "heos://browse/play_input?pid={pid}&spid={spid}&input={input}"
  params:
    - name: pid
      type: string
      description: Destination player id
    - name: spid
      type: string
      description: Player id of HEOS device acting as source
    - name: input
      type: string
      description: Input source name (same enumeration as play_input)

- id: play_stream_obsolete
  label: Play Stream via sid (OBSOLETE)
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
      description: Media id, e.g. inputs/aux_in_1
  # Source marks this variant OBSOLETE; use play_input instead

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
      description: Container id returned by browse or search; must be a 'playable' container
    - name: aid
      type: enum
      description: "Add criteria id (1 play now, 2 play next, 3 add to end, 4 replace and play)"

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
      description: Media id returned by browse or search; must be 'track' media type
    - name: aid
      type: enum
      description: "Add criteria id (1 play now, 2 play next, 3 add to end, 4 replace and play)"

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
      description: Source id (supported: Rhapsody/Napster)
    - name: cid
      type: string
      description: Album id returned by browse or get_now_playing_media

- id: get_service_options
  label: Get Service Options for Now Playing Screen (OBSOLETE)
  kind: query
  command: "heos://browse/get_service_options?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id
  # Source marks this OBSOLETE; get_now_playing_media now includes supported options

- id: set_service_option
  label: Set Service Option
  kind: action
  command: "heos://browse/set_service_option?sid={sid}&option={option_id}&mid={mid}"
  params:
    - name: sid
      type: string
      description: Source id (optional for options 19/20 on now-playing screen)
    - name: option_id
      type: enum
      description: "1 Add Track to Library, 2 Add Album to Library, 3 Add Station to Library, 4 Add Playlist to Library, 5 Remove Track from Library, 6 Remove Album from Library, 7 Remove Station from Library, 8 Remove Playlist from Library, 11 Thumbs Up (Pandora), 12 Thumbs Down (Pandora), 13 Create New Station, 19 Add station to HEOS Favorites, 20 Remove from HEOS Favorites"
    - name: mid
      type: string
      description: Media/container/station id obtained through browse (varies by option; may be cid or pid instead)
  # Additional params per option: cid (album/playlist), name (playlist name, create-station search string), scid (create-station criteria), pid (thumbs up/down), range (optional, option 13)
```

## Feedbacks
```yaml
- id: players_list
  type: object
  description: get_players payload - name, pid, gid (optional), model, version, network (wired/wifi), lineout (1 variable, 2 fixed), control (1 None, 2 IR, 3 Trigger, 4 Network; only when lineout=2)

- id: player_info
  type: object
  description: get_player_info payload - same fields as players_list entry

- id: play_state
  type: enum
  values: [play, pause, stop]

- id: now_playing_media
  type: object
  description: get_now_playing_media payload - type (song/station), song, station, album, artist, image_url, mid, qid, sid, options

- id: volume_level
  type: integer
  description: "Volume level 0-100, message field level='vol_level'"

- id: mute_state
  type: enum
  values: [on, off]

- id: play_mode
  type: object
  description: "repeat (on_all/on_one/off) and shuffle (on/off)"

- id: queue
  type: object
  description: get_queue payload - song, album, artist, image_url, qid, mid, album_id per item

- id: groups_list
  type: object
  description: get_groups payload - group name, gid, players with pid/name/role (leader or member)

- id: group_info
  type: object
  description: get_group_info payload - same structure as groups_list entry

- id: group_volume_level
  type: integer
  description: "Group volume level 0-100"

- id: group_mute_state
  type: enum
  values: [on, off]

- id: music_sources
  type: object
  description: get_music_sources payload - name, image_url, type (music_service/heos_service/heos_server/dlna_server), sid

- id: browse_result
  type: object
  description: browse payload - media items (container yes/no, playable yes/no, type song/station/genre/artist/album/container, name, image_url, cid, mid) plus returned/count and options

- id: search_criteria
  type: object
  description: get_search_criteria payload - name, scid, wildcard, playable, cid prefix (SEARCHED_TRACKS-)

- id: account_status
  type: enum
  values: [signed_in, signed_out]
  description: check_account / user_changed message - "signed_out" or "signed_in&un=<current user name>"

- id: error_response
  type: object
  description: "General error: result=fail, message eid=<1-17>&text=<error text> (1 Unrecognized Command, 2 Invalid ID, 3 Wrong Number of Arguments, 4 Requested data not available, 5 Resource not available, 6 Invalid Credentials, 7 Command Could Not Be Executed, 8 User not logged In, 9 Parameter out of range, 10 User not found, 11 Internal Error, 12 System Error, 13 Processing Previous Command, 14 Media can't be played, 15 Option not supported, 16 Too many commands in queue, 17 Reached skip limit)"
```

## Variables
```yaml
# UNRESOLVED: no settable non-action parameters in source; volume/mute/play-mode are discrete CLI commands (see Actions)
```

## Events
```yaml
- id: sources_changed
  description: "Unsolicited: { \"heos\": { \"command\": \"event/sources_changed\" } }"

- id: players_changed
  description: "Unsolicited: { \"heos\": { \"command\": \"event/players_changed\" } }"

- id: groups_changed
  description: "Unsolicited: { \"heos\": { \"command\": \"event/groups_changed\" } }"

- id: source_data_changed
  description: "Unsolicited: message sid='source_id'"

- id: player_state_changed
  description: "Unsolicited: message pid='player_id'&state='play_state'"

- id: player_now_playing_changed
  description: "Unsolicited: message pid='player_id'"

- id: player_now_playing_progress
  description: "Unsolicited: message pid=player_id&cur_pos=position_ms&duration=duration_ms"

- id: player_playback_error
  description: "Unsolicited: message pid=player_id&error=<error string, e.g. Could Not Download>"

- id: player_queue_changed
  description: "Unsolicited: message pid='player_id'"

- id: player_volume_changed
  description: "Unsolicited: message pid='player_id'&level='vol_level'"

- id: player_mute_changed
  description: "Unsolicited: message pid='player_id'&state='on_or_off'"

- id: repeat_mode_changed
  description: "Unsolicited: message pid='player_id'&repeat='on_all_or_on_one_or_off'"

- id: shuffle_mode_changed
  description: "Unsolicited: message pid='player_id'&shuffle='on_or_off'"

- id: group_changed
  description: "Unsolicited: message gid='group_id'"

- id: group_volume_changed
  description: "Unsolicited: message gid='group_id'&level='vol_level'"

- id: group_mute_changed
  description: "Unsolicited: message gid='group_id'&state='on_or_off'"

- id: user_changed
  description: "Unsolicited: message 'signed_out' or 'signed_in&un=<current user name>'"
```

## Macros
```yaml
- id: driver_initialization
  label: Driver Initialization Sequence
  steps:
    - "heos://system/register_for_change_events?enable=off  # un-register for change events (default is off)"
    - "heos://system/sign_in?un={username}&pw={password}  # if user credentials available"
    - "heos://player/get_players / heos://browse/get_music_sources / heos://group/get_groups / heos://player/get_queue / heos://player/get_now_playing_media / heos://player/get_volume / heos://player/get_play_state  # retrieve current HEOS ecosystem status"
    - "heos://system/register_for_change_events?enable=on  # register for change events"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Discovery: HEOS products found via UPnP SSDP; M-SEARCH search target (ST) is `urn:schemas-denon-com:device:ACT-Denon:1`. IP can also be set statically.
- Command delimiter `\r\n`; responses JSON, delimiter `\r\n`. Special characters encoded: `&`→`%26`, `=`→`%3D`, `%`→`%25`.
- Control all HEOS speakers via one socket connection to one speaker; recommended NOT to connect to every speaker. Max 32 simultaneous socket connections per speaker. Typical controllers use one connection for change events, one for user actions.
- CLI module runs dormant until first socket connection; after connect, allow time for player discovery (pids) before issuing player commands; expect initial spew of events.
- Keep an idle connection to prevent CLI reverting to dormant mode if controller disconnects/reconnects.
- Deferred response: browse/search may return `{"heos": {"command": "...", "message": "command under process"}}` before the real response.
- Custom argument `SEQUENCE=<number>` allowed in browse commands to correlate command and response.
- Changes made to HEOS account via HEOS app do not reflect via CLI until controller re-signs-in; expose sign-out/sign-in in controller UI.
- External Input distribution limited to one player or one group; cannot play an External Input already selected elsewhere.
- get_queue / browse responses paginated: max 100 (queue) or 50/100 (browse, service dependent) records per response; `count=0` means unknown size — query until returned=0.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: source references error code list as "Section TBD" (table present in this document, codes 1-17) -->

## Provenance

```yaml
source_domains:
  - assets.denon.com
  - marantz.com
source_urls:
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
  - https://www.marantz.com/on/demandware.static/-/Library-Sites-marantz_northamerica_shared/en_US/v1709469166640/archive-downloads/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-09-02T17:12:19.455Z
last_checked_at: 2026-09-03T22:20:53.230Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-03T22:20:53.230Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions map to unique HEOS CLI command URIs documented verbatim in the source, transport port 1255 is supported, no extra source commands remain. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "error code section reference (\"Section TBD\") incomplete in source"
- "no settable non-action parameters in source; volume/mute/play-mode are discrete CLI commands (see Actions)"
- "no safety warnings or interlock procedures in source"
- "source references error code list as \"Section TBD\" (table present in this document, codes 1-17)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
