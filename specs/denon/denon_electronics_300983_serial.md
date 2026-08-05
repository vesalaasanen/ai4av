---
spec_id: admin/denon-electronics-300983-heos
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
  - assets.denon.com
source_urls:
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-07-08T06:27:32.212Z
last_checked_at: 2026-07-08T14:24:19.271Z
generated_at: 2026-07-08T14:24:19.271Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Input metadata declared protocol \"RS-232C\" but the source document describes only a TCP/telnet CLI on port 1255. This spec follows the source (TCP). No serial config is documented."
  - "No specific hardware model SKU enumerated; source refers generically to \"Denon HEOS\" products. Model field set to \"HEOS\"."
  - "Firmware version compatibility not stated in source."
  - "Protocol/version number of the CLI not stated in source."
  - "no separate variable set beyond action parameters."
  - "no multi-step device-side macros documented."
  - "no power-on sequencing requirements or hardware interlocks stated beyond the above."
  - "Input metadata declared protocol \"RS-232C\"; source describes only TCP/telnet CLI on port 1255. No serial electrical/line config (baud, parity, etc.) present in source."
  - "Specific hardware model SKU/family not enumerated in source (generic \"Denon HEOS\")."
  - "Firmware/protocol version compatibility ranges not stated in source."
  - "CLI protocol version number not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-08T14:24:19.271Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec actions (system/player/group/browse) map literally to source commands with matching param shapes; events and error codes also fully represented. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-08
---

# Denon Electronics HEOS CLI Control Spec

## Summary
The Denon HEOS is a network-connected, wireless, multi-room music system. This spec covers the HEOS Command Line Interface (CLI), a human-readable (ASCII) command / JSON response protocol carried over a telnet (TCP) socket on port 1255. Commands follow a `heos://command_group/command?attr=value` URL scheme delimited by `\r\n`, enabling external control systems to browse, play, group players, and query status across HEOS products.

<!-- UNRESOLVED: Input metadata declared protocol "RS-232C" but the source document describes only a TCP/telnet CLI on port 1255. This spec follows the source (TCP). No serial config is documented. -->
<!-- UNRESOLVED: No specific hardware model SKU enumerated; source refers generically to "Denon HEOS" products. Model field set to "HEOS". -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Protocol/version number of the CLI not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 1255
  # discovery: UPnP SSDP, ST = urn:schemas-denon-com:device:ACT-Denon:1 (not a connection param, noted for implementers)
  base_url: heos://  # command URL scheme prefix per source
auth:
  type: none  # inferred: no socket login/password procedure in source for the CLI connection.
  # Note: system/sign_in exists but authenticates the HEOS *user account* (music services), not socket access.
```

## Traits
```yaml
traits:
  - queryable   # inferred: many get_* query commands returning state (get_play_state, get_volume, get_mute, etc.)
  - levelable   # inferred: volume level set/up/down commands (0-100) for player and group
  - routable    # inferred: play_input routes an input source to a speaker; group/set_group routes players into groups
```

## Actions
```yaml
# All commands verbatim from source. Command string delimiter is "\r\n".
# Special chars in attribute values are %-encoded: & -> %26, = -> %3D, % -> %25.

# ---- System commands (4.1) ----
- id: register_for_change_events
  label: Register for Change Events
  kind: action
  command: "heos://system/register_for_change_events?enable={enable}"
  params:
    - name: enable
      type: string
      description: "Enable/disable unsolicited change events (on, off)"

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
      description: "Enable/disable prettified JSON (on, off)"

# ---- Player commands (4.2) ----
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
      type: integer
      description: Player id returned by get_players or get_groups

- id: get_play_state
  label: Get Play State
  kind: query
  command: "heos://player/get_play_state?pid={pid}"
  params:
    - name: pid
      type: integer
      description: Player id

- id: set_play_state
  label: Set Play State
  kind: action
  command: "heos://player/set_play_state?pid={pid}&state={state}"
  params:
    - name: pid
      type: integer
      description: Player id
    - name: state
      type: string
      description: "Player play state (play, pause, stop)"

- id: get_now_playing_media
  label: Get Now Playing Media
  kind: query
  command: "heos://player/get_now_playing_media?pid={pid}"
  params:
    - name: pid
      type: integer
      description: Player id

- id: get_volume
  label: Get Volume
  kind: query
  command: "heos://player/get_volume?pid={pid}"
  params:
    - name: pid
      type: integer
      description: Player id

- id: set_volume
  label: Set Volume
  kind: action
  command: "heos://player/set_volume?pid={pid}&level={level}"
  params:
    - name: pid
      type: integer
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
      type: integer
      description: Player id
    - name: step
      type: integer
      description: "Step level (1 to 10, default 5)"

- id: volume_down
  label: Volume Down
  kind: action
  command: "heos://player/volume_down?pid={pid}&step={step}"
  params:
    - name: pid
      type: integer
      description: Player id
    - name: step
      type: integer
      description: "Step level (1 to 10, default 5)"

- id: get_mute
  label: Get Mute
  kind: query
  command: "heos://player/get_mute?pid={pid}"
  params:
    - name: pid
      type: integer
      description: Player id

- id: set_mute
  label: Set Mute
  kind: action
  command: "heos://player/set_mute?pid={pid}&state={state}"
  params:
    - name: pid
      type: integer
      description: Player id
    - name: state
      type: string
      description: "Mute state (on, off)"

- id: toggle_mute
  label: Toggle Mute
  kind: action
  command: "heos://player/toggle_mute?pid={pid}"
  params:
    - name: pid
      type: integer
      description: Player id

- id: get_play_mode
  label: Get Play Mode
  kind: query
  command: "heos://player/get_play_mode?pid={pid}"
  params:
    - name: pid
      type: integer
      description: Player id

- id: set_play_mode
  label: Set Play Mode
  kind: action
  command: "heos://player/set_play_mode?pid={pid}&repeat={repeat}&shuffle={shuffle}"
  params:
    - name: pid
      type: integer
      description: Player id
    - name: repeat
      type: string
      description: "Repeat state (on_all, on_one, off)"
    - name: shuffle
      type: string
      description: "Shuffle state (on, off)"

- id: get_queue
  label: Get Queue
  kind: query
  command: "heos://player/get_queue?pid={pid}&range={range}"
  params:
    - name: pid
      type: integer
      description: Player id
    - name: range
      type: string
      description: "Optional 'start#,end#' record index (range starts from 0). Omitting returns up to 100 records."

- id: play_queue
  label: Play Queue Item
  kind: action
  command: "heos://player/play_queue?pid={pid}&qid={qid}"
  params:
    - name: pid
      type: integer
      description: Player id
    - name: qid
      type: integer
      description: Queue id returned by get_queue

- id: remove_from_queue
  label: Remove Item(s) from Queue
  kind: action
  command: "heos://player/remove_from_queue?pid={pid}&qid={qid}"
  params:
    - name: pid
      type: integer
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
      type: integer
      description: Player id
    - name: name
      type: string
      description: New playlist name (max 128 unicode characters)

- id: clear_queue
  label: Clear Queue
  kind: action
  command: "heos://player/clear_queue?pid={pid}"
  params:
    - name: pid
      type: integer
      description: Player id

- id: play_next
  label: Play Next
  kind: action
  command: "heos://player/play_next?pid={pid}"
  params:
    - name: pid
      type: integer
      description: Player id

- id: play_previous
  label: Play Previous
  kind: action
  command: "heos://player/play_previous?pid={pid}"
  params:
    - name: pid
      type: integer
      description: Player id

# ---- Group commands (4.3) ----
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
      type: integer
      description: Group id returned by get_groups

- id: set_group
  label: Set Group
  kind: action
  command: "heos://group/set_group?pid={pid}"
  params:
    - name: pid
      type: string
      description: Comma-separated player ids; first id is group leader. Single id = ungroup all players in that group.

- id: group_get_volume
  label: Get Group Volume
  kind: query
  command: "heos://group/get_volume?gid={gid}"
  params:
    - name: gid
      type: integer
      description: Group id

- id: group_set_volume
  label: Set Group Volume
  kind: action
  command: "heos://group/set_volume?gid={gid}&level={level}"
  params:
    - name: gid
      type: integer
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
      type: integer
      description: Group id
    - name: step
      type: integer
      description: "Step level (1 to 10, default 5)"

- id: group_volume_down
  label: Group Volume Down
  kind: action
  command: "heos://group/volume_down?gid={gid}&step={step}"
  params:
    - name: gid
      type: integer
      description: Group id
    - name: step
      type: integer
      description: "Step level (1 to 10, default 5)"

- id: group_get_mute
  label: Get Group Mute
  kind: query
  command: "heos://group/get_mute?gid={gid}"
  params:
    - name: gid
      type: integer
      description: Group id

- id: group_set_mute
  label: Set Group Mute
  kind: action
  command: "heos://group/set_mute?gid={gid}&state={state}"
  params:
    - name: gid
      type: integer
      description: Group id
    - name: state
      type: string
      description: "Mute state (on, off)"

- id: group_toggle_mute
  label: Toggle Group Mute
  kind: action
  command: "heos://group/toggle_mute?gid={gid}"
  params:
    - name: gid
      type: integer
      description: Group id

# ---- Browse commands (4.4) ----
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
      type: integer
      description: Source id returned by get_music_sources

- id: browse
  label: Browse Source / Container
  kind: query
  command: "heos://browse/browse?sid={sid}&cid={cid}&range={range}"
  params:
    - name: sid
      type: integer
      description: Source id
    - name: cid
      type: string
      description: Optional container id returned by browse/search; omit when browsing top level
    - name: range
      type: string
      description: "Optional 'start#,end#' (range from 0). Max 50 or 100 records per response depending on service."

- id: get_search_criteria
  label: Get Source Search Criteria
  kind: query
  command: "heos://browse/get_search_criteria?sid={sid}"
  params:
    - name: sid
      type: integer
      description: Source id

- id: search
  label: Search
  kind: query
  command: "heos://browse/search?sid={sid}&search={search}&scid={scid}&range={range}"
  params:
    - name: sid
      type: integer
      description: Source id
    - name: search
      type: string
      description: Search string (max 128 unicode chars, may contain '*' wildcard if supported)
    - name: scid
      type: string
      description: Search criteria id (artist, album, song, station)
    - name: range
      type: string
      description: Optional 'start#,end#'

- id: play_stream
  label: Play Station
  kind: action
  command: "heos://browse/play_stream?pid={pid}&sid={sid}&cid={cid}&mid={mid}&name={name}"
  params:
    - name: pid
      type: integer
      description: Player id
    - name: sid
      type: integer
      description: Source id
    - name: cid
      type: string
      description: Container id (ignore if none, e.g. station from Search)
    - name: mid
      type: string
      description: Media id; must be a 'station' media type
    - name: name
      type: string
      description: Station name returned by browse

- id: play_preset
  label: Play Preset Station
  kind: action
  command: "heos://browse/play_preset?pid={pid}&preset={preset}"
  params:
    - name: pid
      type: integer
      description: Player id
    - name: preset
      type: integer
      description: Station offset in HEOS Favorites (1 and above)

- id: play_input
  label: Play Input Source
  kind: action
  command: "heos://browse/play_input?pid={pid}&spid={spid}&input={input}"
  params:
    - name: pid
      type: integer
      description: Destination player id
    - name: spid
      type: integer
      description: Optional source player id (play input from another speaker); omit for same speaker
    - name: input
      type: string
      description: "Input source name, e.g. inputs/aux_in_1, inputs/line_in_1, inputs/optical_in_1, inputs/hdmi_arc_1, inputs/cable_sat, inputs/tuner, inputs/phono, etc."

- id: add_to_queue
  label: Add Container/Track to Queue
  kind: action
  command: "heos://browse/add_to_queue?pid={pid}&sid={sid}&cid={cid}&mid={mid}&aid={aid}"
  params:
    - name: pid
      type: integer
      description: Player id
    - name: sid
      type: integer
      description: Source id
    - name: cid
      type: string
      description: Container id (playable container type)
    - name: mid
      type: string
      description: Optional media id (track); omit for container add
    - name: aid
      type: integer
      description: "Add criteria (1=play now, 2=play next, 3=add to end, 4=replace and play)"

- id: rename_playlist
  label: Rename HEOS Playlist
  kind: action
  command: "heos://browse/rename_playlist?sid={sid}&cid={cid}&name={name}"
  params:
    - name: sid
      type: integer
      description: Source id (HEOS Playlists source)
    - name: cid
      type: string
      description: Container id from Get HEOS Playlists
    - name: name
      type: string
      description: New playlist name (max 128 unicode chars)

- id: delete_playlist
  label: Delete HEOS Playlist
  kind: action
  command: "heos://browse/delete_playlist?sid={sid}&cid={cid}"
  params:
    - name: sid
      type: integer
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
      type: integer
      description: "Source id (currently Rhapsody/Napster)"
    - name: cid
      type: string
      description: Album id returned by browse/get_now_playing_media

- id: get_service_options
  label: Get Service Options (OBSOLETE)
  kind: query
  command: "heos://browse/get_service_options?sid={sid}"
  params:
    - name: sid
      type: integer
      description: Source id
  notes: "OBSOLETE per source; use get_now_playing_media for now-playing options."

- id: set_service_option
  label: Set Service Option
  kind: action
  command: "heos://browse/set_service_option?sid={sid}&option={option}&mid={mid}&cid={cid}&pid={pid}&scid={scid}&name={name}&range={range}"
  params:
    - name: sid
      type: integer
      description: Source id (required for options 1-8)
    - name: option
      type: integer
      description: "Option id (1=Add Track to Library, 2=Add Album, 3=Add Station, 4=Add Playlist, 5=Remove Track, 6=Remove Album, 7=Remove Station, 8=Remove Playlist [Rhapsody]; 11=Thumbs Up, 12=Thumbs Down [Pandora]; 13=Create New Station [Pandora/iHeartRadio]; 19=Add station to HEOS Favorites; 20=Remove from HEOS Favorites)"
    - name: mid
      type: string
      description: Media id (track/station) - used per option
    - name: cid
      type: string
      description: Container/album/playlist id - used per option
    - name: pid
      type: integer
      description: Player id (used for options 11,12,19 now-playing)
    - name: scid
      type: integer
      description: "Create-new-station criteria (1=Artist, 5=Show, 3=Track) for option 13"
    - name: name
      type: string
      description: Search string for creating new station (option 13) / playlist name (option 4)
    - name: range
      type: string
      description: Optional range for option 13 results
```

## Feedbacks
```yaml
# Query responses (values carried in heos.message and/or payload). One entry per queryable state.
- id: account_state
  type: enum
  values: [signed_in, signed_out]
- id: play_state
  type: enum
  values: [play, pause, stop]
- id: player_volume
  type: range
  min: 0
  max: 100
- id: player_mute
  type: enum
  values: [on, off]
- id: repeat_mode
  type: enum
  values: [on_all, on_one, off]
- id: shuffle_mode
  type: enum
  values: [on, off]
- id: group_volume
  type: range
  min: 0
  max: 100
- id: group_mute
  type: enum
  values: [on, off]
- id: now_playing_media
  type: object
  description: Now-playing payload (song/station, album, artist, image_url, mid, qid, sid, options)
- id: queue
  type: object
  description: List of queue items (song, album, artist, image_url, qid, mid, album_id)
- id: players
  type: object
  description: List of players (name, pid, gid, model, version, network, lineout, control)
- id: groups
  type: object
  description: List of groups (name, gid, players[role=leader|member])
- id: music_sources
  type: object
  description: List of sources (name, image_url, type, sid)
- id: command_result
  type: enum
  values: [success, fail]
- id: command_under_process
  type: flag
  description: "Returned when response cannot be populated immediately (browse/search)."
```

## Variables
```yaml
# Settable parameters are exposed via the set_* actions above (set_volume, set_mute,
# set_play_state, set_play_mode, group_set_volume, group_set_mute). No additional
# standalone variables documented.
# UNRESOLVED: no separate variable set beyond action parameters.
```

## Events
```yaml
# Unsolicited responses (only received after register_for_change_events?enable=on).
- id: sources_changed
  command: "event/sources_changed"
- id: players_changed
  command: "event/players_changed"
- id: groups_changed
  command: "event/groups_changed"
- id: source_data_changed
  command: "event/source_data_changed"
  message: "sid={source_id}"
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
  message: "pid={player_id}&level={vol_level}"
- id: player_mute_changed
  command: "event/player_mute_changed"
  message: "pid={player_id}&state={on_or_off}"
- id: repeat_mode_changed
  command: "event/repeat_mode_changed"
  message: "pid={player_id}&repeat={on_all_or_on_one_or_off}"
- id: shuffle_mode_changed
  command: "event/shuffle_mode_changed"
  message: "pid={player_id}&shuffle={on_or_off}"
- id: group_changed
  command: "event/group_changed"
  message: "gid={group_id}"
- id: group_volume_changed
  command: "event/group_volume_changed"
  message: "gid={group_id}&level={vol_level}"
- id: group_mute_changed
  command: "event/group_mute_changed"
  message: "gid={group_id}&state={on_or_off}"
- id: user_changed
  command: "event/user_changed"
  message: "signed_out or signed_in&un={current_user_name}"
```

## Macros
```yaml
# Source documents a suggested driver initialization sequence (not a device macro):
#   1. register_for_change_events?enable=off
#   2. sign_in (if user credentials available)
#   3. get_players / get_music_sources / get_groups / get_queue / get_now_playing_media / get_volume / get_play_state
#   4. register_for_change_events?enable=on
# Not a single device command; listed here as guidance only.
# UNRESOLVED: no multi-step device-side macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: "system/reboot"
    note: "Reboots only the HEOS device the controller is connected to via CLI port."
  - command: "browse/play_input"
    note: "External Input distribution limited to one player or one group at a time. An External Input already selected cannot be played elsewhere; while playing external input on itself, it cannot be distributed to other players."
# UNRESOLVED: no power-on sequencing requirements or hardware interlocks stated beyond the above.
```

## Notes
- Command/response encoding: commands are ASCII text terminated by `\r\n`; responses are JSON terminated by `\r\n`. Special characters in attribute values are percent-encoded (`&`→`%26`, `=`→`%3D`, `%`→`%25`).
- General command format: `heos://command_group/command?attribute1=value1&...&attributeN=valueN`.
- Discovery: UPnP SSDP, M-SEARCH ST `urn:schemas-denon-com:device:ACT-Denon:1`; IP may also be statically configured.
- CLI core modules spawn dormant until the first socket connection; allow time after connect before issuing player commands, and expect an initial spew of events.
- Max 32 simultaneous socket connections per speaker. Recommend one connection for events, one for user actions; do NOT connect to every speaker individually.
- A SEQUENCE custom argument may be added to browse commands to correlate command/response.
- Some commands (e.g. `player/clear_queue`, `browse/play_stream`, `browse/play_input`, `browse/add_to_queue`) also trigger unsolicited change events (now-playing / queue / state).
- Error responses carry `result: "fail"` with `message: "eid={id}&text={text}&..."`; error id table documented (codes 1-17).

<!-- UNRESOLVED: Input metadata declared protocol "RS-232C"; source describes only TCP/telnet CLI on port 1255. No serial electrical/line config (baud, parity, etc.) present in source. -->
<!-- UNRESOLVED: Specific hardware model SKU/family not enumerated in source (generic "Denon HEOS"). -->
<!-- UNRESOLVED: Firmware/protocol version compatibility ranges not stated in source. -->
<!-- UNRESOLVED: CLI protocol version number not stated in source. -->
````



- **Protocol mismatch:** input said `RS-232C`, source says TCP telnet **port 1255**. Followed source per Tier 1 policy, flagged as UNRESOLVED.
- `auth.type: none` inferred for socket (sign_in is HEOS account, not access control).
- Traits: `queryable`, `levelable`, `routable`. No `powerable` — no power on/off command exists.
- Granularity: same-opcode variants (`browse/browse`, `play_input`, `add_to_queue`) collapsed into one parameterized action per the opcode rule; `set_service_option` options kept as a param enum, not split.

## Provenance

```yaml
source_domains:
  - assets.denon.com
source_urls:
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-07-08T06:27:32.212Z
last_checked_at: 2026-07-08T14:24:19.271Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-08T14:24:19.271Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec actions (system/player/group/browse) map literally to source commands with matching param shapes; events and error codes also fully represented. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Input metadata declared protocol \"RS-232C\" but the source document describes only a TCP/telnet CLI on port 1255. This spec follows the source (TCP). No serial config is documented."
- "No specific hardware model SKU enumerated; source refers generically to \"Denon HEOS\" products. Model field set to \"HEOS\"."
- "Firmware version compatibility not stated in source."
- "Protocol/version number of the CLI not stated in source."
- "no separate variable set beyond action parameters."
- "no multi-step device-side macros documented."
- "no power-on sequencing requirements or hardware interlocks stated beyond the above."
- "Input metadata declared protocol \"RS-232C\"; source describes only TCP/telnet CLI on port 1255. No serial electrical/line config (baud, parity, etc.) present in source."
- "Specific hardware model SKU/family not enumerated in source (generic \"Denon HEOS\")."
- "Firmware/protocol version compatibility ranges not stated in source."
- "CLI protocol version number not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
