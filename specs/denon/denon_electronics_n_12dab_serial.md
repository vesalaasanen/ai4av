---
spec_id: admin/denon-electronics-n-12dab
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics N 12Dab Control Spec"
manufacturer: Denon
model_family: "N 12Dab"
aliases: []
compatible_with:
  manufacturers:
    - Denon
    - "Denon Electronics"
  models:
    - "N 12Dab"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.denon.com
source_urls:
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-08-14T22:13:04.207Z
last_checked_at: 2026-08-19T09:12:54.829Z
generated_at: 2026-08-19T09:12:54.829Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic \"HEOS CLI Protocol Specification\" and does not mention the N 12Dab model by name; model assignment comes from operator-provided input metadata. Input metadata declared protocol RS-232C, but the source document only documents telnet/TCP control — no serial config appears anywhere in the source. Firmware compatibility, error-recovery sequences, and protocol version not stated."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source"
  - "protocol version number not stated in source"
  - "input validity per specific HEOS device type stated only generically (\"depends on the type of source HEOS device\")"
  - "exact source-id (sid) assignments per music service not enumerated in source"
verification:
  verdict: verified
  checked_at: 2026-08-19T09:12:54.829Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions match literal heos:// command strings in the HEOS CLI source, transport port 1255 confirmed, no fabricated or drifted actions. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-15
---

# Denon Electronics N 12Dab Control Spec

## Summary
Denon HEOS network-connected multi-room music system, controlled via the HEOS Command Line Interface (CLI) over a telnet (TCP) connection. Commands are ASCII text strings in `heos://command_group/command?attribute=value` format; responses are JSON. Covers system, player, group, and browse commands plus unsolicited change events.

<!-- UNRESOLVED: source is the generic "HEOS CLI Protocol Specification" and does not mention the N 12Dab model by name; model assignment comes from operator-provided input metadata. Input metadata declared protocol RS-232C, but the source document only documents telnet/TCP control — no serial config appears anywhere in the source. Firmware compatibility, error-recovery sequences, and protocol version not stated. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 1255
auth:
  type: none  # inferred: no login/password required for the CLI connection; optional HEOS account sign-in exists for streaming services
```

Notes on transport (from source):
- Telnet connection to port 1255 on the HEOS product's IP address.
- Device discovery via UPnP SSDP; M-SEARCH search target (ST): `urn:schemas-denon-com:device:ACT-Denon:1`. IP can also be set statically.
- Command string delimiter: `\r\n`. JSON command response delimiter: `\r\n`.
- Max 32 simultaneous socket connections per speaker. Recommended: connect to one speaker only; multiple connections to that speaker are allowed (e.g. one for events, one for user actions).

## Traits
```yaml
# - powerable: no power on/off command in source (reboot only) - not claimed
- levelable    # inferred: player and group volume set/up/down commands present
- queryable    # inferred: extensive get_* query commands present
- routable     # inferred: play_input / play_stream / play_preset source-selection commands present
```

## Actions
```yaml
# All commands verbatim from source. Parameterized parts shown as {param}.
# Base format: heos://command_group/command?attribute1=value1&attribute2=value2
# Special characters in attribute values URL-encoded: & = %26, = = %3D, % = %25

# ===== System commands =====
- id: register_for_change_events
  label: Register for Change Events
  kind: action
  command: "heos://system/register_for_change_events?enable={enable}"
  params:
    - name: enable
      type: enum
      description: "Register or unregister for unsolicited change events (on, off)"

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
  kind: query
  command: "heos://system/heart_beat"
  params: []

- id: reboot
  label: HEOS Speaker Reboot
  kind: action
  command: "heos://system/reboot"
  params: []
  # Reboots only the HEOS device the controller is connected to via CLI port.

- id: prettify_json_response
  label: Prettify JSON Response
  kind: action
  command: "heos://system/prettify_json_response?enable={enable}"
  params:
    - name: enable
      type: enum
      description: "Enable or disable prettification of JSON response (on, off)"

# ===== Player commands =====
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
      description: "Play state (play, pause, stop)"

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
      description: "Volume level, 0 to 100"

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
      description: "Step level 1 to 10 (default 5)"

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
      description: "Step level 1 to 10 (default 5)"

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
      description: "Mute state (on, off)"

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
      description: "Optional 'start#, end#' record index; omit for all records (max 100 per response); range starts from 0"

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
  command: "heos://player/remove_from_queue?pid={pid}&qid={qid_list}"
  params:
    - name: pid
      type: string
      description: Player id
    - name: qid_list
      type: string
      description: Comma-separated list of queue ids from get_queue

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

# ===== Group commands =====
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
      description: Comma-separated player ids; first id is group leader. Create: heos://group/set_group?pid=3,1,4. Modify members: pid=3,1,5. Ungroup all: pid=3 (leader only)

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
      description: "Group volume level, 0 to 100"

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
      description: "Step level 1 to 10 (default 5)"

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
      description: "Step level 1 to 10 (default 5)"

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
      type: enum
      description: "Mute state (on, off)"

- id: toggle_group_mute
  label: Toggle Group Mute
  kind: action
  command: "heos://group/toggle_mute?gid={gid}"
  params:
    - name: gid
      type: string
      description: Group id

# ===== Browse commands =====
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
      description: Source id returned by get_music_sources or browse

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
      description: "Optional 'start#, end#'; omit for all records (max 50 or 100 per response depending on service); range starts from 0"

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
  command: "heos://browse/search?sid={sid}&search={search_string}&scid={scid}&range={range}"
  params:
    - name: sid
      type: string
      description: Source id
    - name: search_string
      type: string
      description: Search string limited to 128 unicode characters; may contain '*' wildcard if supported by scid
    - name: scid
      type: enum
      description: "Search criteria id from get_search_criteria (artist, album, song, station)"
    - name: range
      type: string
      description: "Optional 'start#, end#'"

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
      description: Container id; ignore if no container (e.g. station from Search)
    - name: mid
      type: string
      description: Media id from browse or search; must be 'station' media type
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
  label: Play Input Source
  kind: action
  command: "heos://browse/play_input?pid={pid}&spid={spid}&input={input}"
  params:
    - name: pid
      type: string
      description: Destination player id
    - name: spid
      type: string
      description: "Optional source player id (playing input on another speaker); omit for same speaker"
    - name: input
      type: enum
      description: "Input source name, e.g. inputs/aux_in_1, inputs/line_in_1..4, inputs/coax_in_1..2, inputs/optical_in_1..2, inputs/hdmi_in_1, inputs/hdmi_arc_1, inputs/cable_sat, inputs/dvd, inputs/bluray, inputs/game, inputs/mediaplayer, inputs/cd, inputs/tuner, inputs/hdradio, inputs/tvaudio, inputs/phono"

- id: add_to_queue_container
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
      description: Container id from browse or search; must be a 'playable' container type
    - name: aid
      type: enum
      description: "Add criteria id (1 play now, 2 play next, 3 add to end, 4 replace and play)"

- id: add_to_queue_track
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
      description: Media id from browse or search; must be 'track' media type
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
      description: Source id (select HEOS source)
    - name: cid
      type: string
      description: Container id from Get HEOS Playlists
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
      description: Source id (select HEOS source)
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
      description: Source id (Rhapsody/Napster)
    - name: cid
      type: string
      description: Rhapsody/Napster album id from browse or get_now_playing_media

- id: get_service_options
  label: Get Service Options for Now Playing Screen (OBSOLETE)
  kind: query
  command: "heos://browse/get_service_options?sid={sid}"
  params:
    - name: sid
      type: string
      description: Source id
  # Source marks this OBSOLETE - get_now_playing_media now includes supported options.

- id: set_service_option
  label: Set Service Option
  kind: action
  command: "heos://browse/set_service_option?sid={sid}&option={option}&mid={mid}&cid={cid}&name={name}&pid={pid}&scid={scid}&range={range}"
  params:
    - name: sid
      type: string
      description: Source id (not used by all options)
    - name: option
      type: enum
      description: "Option id (1 Add Track to Library, 2 Add Album to Library, 3 Add Station to Library, 4 Add Playlist to Library, 5 Remove Track from Library, 6 Remove Album from Library, 7 Remove Station from Library, 8 Remove Playlist from Library, 11 Thumbs Up, 12 Thumbs Down, 13 Create New Station, 19 Add station to HEOS Favorites, 20 Remove from HEOS Favorites)"
    - name: mid
      type: string
      description: Media id (options 1, 3, 5, 7, 12, 20)
    - name: cid
      type: string
      description: Container id (options 2, 4, 6, 8, 19)
    - name: name
      type: string
      description: Playlist name (option 4) or search string (option 13)
    - name: pid
      type: string
      description: Player id (options 11, 12, 19 on now-playing screen)
    - name: scid
      type: enum
      description: "Station-create criteria (option 13): 1 Artist, 3 Track, 5 Show"
    - name: range
      type: string
      description: Optional range query for option 13

# Get HEOS Playlists (4.4.12) and Get HEOS History (4.4.15) have no dedicated
# commands in the source - they refer to Browse Source / Browse Source Containers.
```

## Feedbacks
```yaml
- id: play_state
  type: enum
  values: [play, pause, stop]
  via: "get_play_state response message: pid='player_id'&state='play_state'"

- id: volume_level
  type: integer
  values: "0 to 100"
  via: "get_volume / get_group_volume response message: level='vol_level'"

- id: mute_state
  type: enum
  values: [on, off]
  via: "get_mute / get_group_mute response message: state='on_or_off'"

- id: play_mode
  type: object
  via: "get_play_mode response message: repeat=on_all_or_on_one_or_off & shuffle=on_or_off"

- id: now_playing_media
  type: object
  via: "get_now_playing_media payload (song, album, artist, image_url, mid, qid, sid, type song/station)"

- id: queue
  type: list
  via: "get_queue payload (song, album, artist, image_url, qid, mid, album_id per item)"

- id: players_list
  type: list
  via: "get_players payload (name, pid, gid, model, version, network wired/wifi, lineout, control)"

- id: groups_list
  type: list
  via: "get_groups payload (name, gid, players with pid and role leader/member)"

- id: account_status
  type: enum
  values: [signed_in, signed_out]
  via: "check_account response message: 'signed_out' or 'signed_in&un=<current user name>'"

- id: music_sources
  type: list
  via: "get_music_sources payload (name, image_url, type music_service/heos_service/heos_server/dlna_server, sid)"

- id: search_criteria
  type: list
  via: "get_search_criteria payload (name, scid, wildcard, playable, cid)"
```

## Variables
```yaml
# No separate variable mechanism in source - all settable state is via Actions
# (set_volume, set_mute, set_play_state, set_play_mode, set_group_*).
```

## Events
```yaml
# Unsolicited JSON responses, received only after register_for_change_events?enable=on
- id: sources_changed
  payload: '{ "heos": { "command": "event/sources_changed" } }'

- id: players_changed
  payload: '{ "heos": { "command": "event/players_changed" } }'

- id: groups_changed
  payload: '{ "heos": { "command": "event/groups_changed" } }'

- id: source_data_changed
  payload: '{ "heos": { "command": "event/source_data_changed", "message": "sid=''source_id''" } }'

- id: player_state_changed
  payload: '{ "heos": { "command": "event/player_state_changed", "message": "pid=''player_id''&state=''play_state''" } }'

- id: player_now_playing_changed
  payload: '{ "heos": { "command": "event/player_now_playing_changed", "message": "pid=''player_id''" } }'

- id: player_now_playing_progress
  payload: '{ "heos": { "command": "event/player_now_playing_progress", "message": "pid=player_id&cur_pos=position_ms&duration=duration_ms" } }'

- id: player_playback_error
  payload: '{ "heos": { "command": "event/player_playback_error", "message": "pid=player_id&error=Could Not Download" } }'
  # Error string represents error type; displayable directly to user.

- id: player_queue_changed
  payload: '{ "heos": { "command": "event/player_queue_changed", "message": "pid=''player_id''" } }'

- id: player_volume_changed
  payload: '{ "heos": { "command": "event/player_volume_changed", "message": "pid=''player_id''&level=''vol_level''" } }'

- id: player_mute_changed
  payload: '{ "heos": { "command": "event/player_mute_changed", "message": "pid=''player_id''&state=''on_or_off''" } }'

- id: repeat_mode_changed
  payload: '{ "heos": { "command": "event/repeat_mode_changed", "message": "pid=''player_id''&repeat=''on_all_or_on_one_or_off''" } }'

- id: shuffle_mode_changed
  payload: '{ "heos": { "command": "event/shuffle_mode_changed", "message": "pid=''player_id''&shuffle=''on_or_off''" } }'

- id: group_changed
  payload: '{ "heos": { "command": "event/group_changed", "message": "gid=''group_id''" } }'

- id: group_volume_changed
  payload: '{ "heos": { "command": "event/group_volume_changed", "message": "gid=''group_id''&level=''vol_level''" } }'

- id: group_mute_changed
  payload: '{ "heos": { "command": "event/group_mute_changed", "message": "gid=''group_id''&state=''on_or_off''" } }'

- id: user_changed
  payload: '{ "heos": { "command": "event/user_changed", "message": "signed_out or signed_in&un=<current user name>" } }'
```

## Macros
```yaml
- id: driver_initialization
  label: Driver Initialization Sequence
  steps:
    - "Un-register for change events (system/register_for_change_events?enable=off)"
    - "Sign in to HEOS account if credentials available (system/sign_in)"
    - "Retrieve ecosystem status (get_players, get_sources, get_groups, get_queue, get_now_playing_media, get_volume, get_play_state)"
    - "Register for change events (system/register_for_change_events?enable=on)"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. reboot command exists but carries no
# documented safety constraints.
```

## Notes
- Source document is the generic "HEOS CLI Protocol Specification" for the Denon HEOS multi-room system; it does not name the N 12Dab model explicitly. Input metadata declared RS-232C, but the source documents only telnet/TCP control on port 1255 — no serial transport, baud rate, or wiring appears anywhere in the source.
- CLI module runs dormant until first socket connection; expect initial event spew and delayed player discovery before pids resolve.
- Controllers should connect to a single speaker and control the whole network through it; up to 32 simultaneous sockets per speaker; keep an idle connection to avoid dormancy re-entry.
- Keep-alive via `system/heart_beat`.
- Changes made in the HEOS app (e.g. added/removed music services) do not reflect via CLI until re sign-in; expose sign-out/sign-in in controller UI.
- Custom argument `SEQUENCE=<number>` allowed in browse commands to correlate command/response.
- When response cannot be populated immediately (browse/search on remote servers), a `command under process` interim response is sent.
- External input distribution limited to one player or one group; cannot play an external input already selected elsewhere, and self-playing external input cannot be distributed.
- Obsolete commands: `browse/get_service_options` (use get_now_playing_media options) and `play_stream` variant requiring `sid` (use `play_input`).
- URL-encoding required for `&`, `=`, `%` in attribute values (`%26`, `%3D`, `%25`); decoded strings needed for GUI display.
- Error responses: `"result": "fail"` with `message` containing `eid=<error_id>&text=<error text>`; error codes 1–17 defined (unrecognized command, invalid ID, wrong argument count, data unavailable, resource unavailable, invalid credentials, command not executed, not logged in, out of range, user not found, internal error, system error, processing previous command, cannot play, option not supported, queue overflow, skip limit).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version number not stated in source -->
<!-- UNRESOLVED: input validity per specific HEOS device type stated only generically ("depends on the type of source HEOS device") -->
<!-- UNRESOLVED: exact source-id (sid) assignments per music service not enumerated in source -->

## Provenance

```yaml
source_domains:
  - assets.denon.com
source_urls:
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-08-14T22:13:04.207Z
last_checked_at: 2026-08-19T09:12:54.829Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:12:54.829Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions match literal heos:// command strings in the HEOS CLI source, transport port 1255 confirmed, no fabricated or drifted actions. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic \"HEOS CLI Protocol Specification\" and does not mention the N 12Dab model by name; model assignment comes from operator-provided input metadata. Input metadata declared protocol RS-232C, but the source document only documents telnet/TCP control — no serial config appears anywhere in the source. Firmware compatibility, error-recovery sequences, and protocol version not stated."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source"
- "protocol version number not stated in source"
- "input validity per specific HEOS device type stated only generically (\"depends on the type of source HEOS device\")"
- "exact source-id (sid) assignments per music service not enumerated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
