---
spec_id: admin/autonomic-ma6
schema_version: ai4av-public-spec-v1
revision: 1
title: "Autonomic Ma6 Control Spec"
manufacturer: "Autonomic Controls"
model_family: "Mirage Media Server"
aliases: []
compatible_with:
  manufacturers:
    - "Autonomic Controls"
    - Autonomic
  models:
    - "Mirage Media Server"
    - "Media Control System Software 3.0"
    - "NuVo MPS4 Music Server"
    - "NuVo MPS4 Elite Music Server"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - autonomic-controls.com
  - autonomic.atlassian.net
source_urls:
  - http://www.autonomic-controls.com/documents/MCS30/MCS_3.0_IP_Control_Protocol.pdf
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/25788450/MRAD+Communications+on+MAS
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/overview
retrieved_at: 2026-06-30T10:08:08.280Z
last_checked_at: 2026-07-07T11:04:04.776Z
generated_at: 2026-07-07T11:04:04.776Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the MCS 3.0 IP/Serial spec, not a Ma6-specific manual; no Ma6 model string found in source."
  - "source documents state parameters as ReportState/StateChanged key=value tokens rather than discrete settable variables. Treat Volume as settable via transport (UNRESOLVED for explicit Set Volume command - not documented)."
  - "source describes asynchronous state changes but no formal multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "RS-232 specifics (baud rate, parity, framing) for Ma6 not stated in source; source describes \"Ethernet and RS-232 control protocol\" but only TCP port 5004 documented. Firmware version not stated. Ma6 model name not found in source — spec covers the MCS 3.0 family."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:04:04.776Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions match verbatim source commands; transport port 5004 confirmed; SendKeys consolidated into 4 parameterized spec actions covers full source key table; source command catalogue fully represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Autonomic Ma6 Control Spec

## Summary
ASCII command protocol over TCP for media server control. Covers media transport, library browsing, and feedback/notification. Doc covers MCS 3.0 family; Ma6-specific firmware/commands not stated.

<!-- UNRESOLVED: source is the MCS 3.0 IP/Serial spec, not a Ma6-specific manual; no Ma6 model string found in source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 5004
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # inferred: GetStatus, GetVersions, GetLicenseMessage, Time, Uptime, Browse*
- routable        # inferred: SetInstance, Navigate, SetMusicFilter, SetRadioFilter
```

## Actions
```yaml
- id: banner
  label: Banner
  kind: query
  command: "banner"
  params: []
- id: set_xml_mode
  label: Set XML Mode
  kind: action
  command: "setxmlmode {mode}"
  params:
    - name: mode
      type: enum
      values: [none, lists]
- id: cls
  label: Clear Screen
  kind: action
  command: "cls"
  params: []
- id: exit
  label: Exit Session
  kind: action
  command: "exit"
  params: []
- id: help
  label: Help
  kind: query
  command: "help {command}"
  params:
    - name: command
      type: string
      description: Optional command name
- id: get_versions
  label: Get Versions
  kind: query
  command: "GetVersions"
  params: []
- id: get_license_message
  label: Get License Message
  kind: query
  command: "GetLicenseMessage"
  params: []
- id: time
  label: Time
  kind: query
  command: "Time {format}"
  params:
    - name: format
      type: string
      description: Optional format code (d, D, f, F, g, G, m, r, s, U)
- id: uptime
  label: Uptime
  kind: query
  command: "Uptime"
  params: []
- id: browse_encodings
  label: Browse Encodings
  kind: query
  command: "BrowseEncodings"
  params: []
- id: set_encoding
  label: Set Encoding
  kind: action
  command: "SetEncoding {id}"
  params:
    - name: id
      type: integer
- id: browse_instances
  label: Browse Instances
  kind: query
  command: "BrowseInstances"
  params: []
- id: set_instance
  label: Set Instance
  kind: action
  command: "SetInstance \"{instance}\""
  params:
    - name: instance
      type: string
      description: Instance name, or "*" for current
- id: start_mcs
  label: Start MCS
  kind: action
  command: "StartMCS"
  params: []
- id: msg_box
  label: MsgBox (MCS Software Only)
  kind: action
  command: "MsgBox {id} \"{caption}\" \"{message}\" \"{buttons}\" \"{timeout}\""
  params:
    - name: id
      type: integer
    - name: caption
      type: string
    - name: message
      type: string
    - name: buttons
      type: string
      description: Semicolon delimited button texts
    - name: timeout
      type: integer
      description: Timeout in seconds (default 5)
- id: get_status
  label: Get Status
  kind: query
  command: "GetStatus"
  params: []
- id: subscribe_events
  label: Subscribe Events
  kind: action
  command: "SubscribeEvents {events}"
  params:
    - name: events
      type: string
      description: "True, False, or comma-delimited event list"
- id: navigate
  label: Navigate (MCS Software Only)
  kind: action
  command: "Navigate {screen}"
  params:
    - name: screen
      type: enum
      values: [FMRadio, InternetRadio, LiveTV, MorePrograms, MusicAlbums, MusicArtists, MusicSongs, MyMusic, MyPictures, MyTV, MyVideos, RecordedTV, RecorderStorageSettings, ScheduledTVRecordings, SlideShow, Start, TVGuide, Visualizations, PhotoDetails, SlideShowSettings]
- id: play
  label: Play
  kind: action
  command: "Play"
  params: []
- id: stop
  label: Stop
  kind: action
  command: "Stop"
  params: []
- id: pause
  label: Pause
  kind: action
  command: "Pause"
  params: []
- id: play_pause
  label: PlayPause
  kind: action
  command: "PlayPause"
  params: []
- id: skip_next
  label: Skip Next
  kind: action
  command: "SkipNext"
  params: []
- id: skip_previous
  label: Skip Previous
  kind: action
  command: "SkipPrevious"
  params: []
- id: shuffle
  label: Shuffle
  kind: action
  command: "Shuffle {mode}"
  params:
    - name: mode
      type: enum
      values: [true, false, toggle]
- id: repeat
  label: Repeat
  kind: action
  command: "Repeat {mode}"
  params:
    - name: mode
      type: enum
      values: [true, false, toggle]
- id: browse_albums
  label: Browse Albums
  kind: query
  command: "BrowseAlbums {start} {reqcount}"
  params:
    - name: start
      type: integer
    - name: reqcount
      type: integer
- id: browse_artists
  label: Browse Artists
  kind: query
  command: "BrowseArtists {start} {reqcount}"
  params:
    - name: start
      type: integer
    - name: reqcount
      type: integer
- id: browse_genres
  label: Browse Genres
  kind: query
  command: "BrowseGenres {start} {reqcount}"
  params:
    - name: start
      type: integer
    - name: reqcount
      type: integer
- id: browse_now_playing
  label: Browse Now Playing
  kind: query
  command: "BrowseNowPlaying {start} {reqcount}"
  params:
    - name: start
      type: integer
    - name: reqcount
      type: integer
- id: browse_playlists
  label: Browse Playlists
  kind: query
  command: "BrowsePlaylists {start} {reqcount}"
  params:
    - name: start
      type: integer
    - name: reqcount
      type: integer
- id: browse_radio_genres
  label: Browse Radio Genres
  kind: query
  command: "BrowseRadioGenres {start} {reqcount}"
  params:
    - name: start
      type: integer
    - name: reqcount
      type: integer
- id: browse_radio_stations
  label: Browse Radio Stations
  kind: query
  command: "BrowseRadioStations {start} {reqcount}"
  params:
    - name: start
      type: integer
    - name: reqcount
      type: integer
- id: browse_radio_sources
  label: Browse Radio Sources
  kind: query
  command: "BrowseRadioSources {start} {reqcount}"
  params:
    - name: start
      type: integer
    - name: reqcount
      type: integer
- id: browse_titles
  label: Browse Titles
  kind: query
  command: "BrowseTitles {start} {reqcount}"
  params:
    - name: start
      type: integer
    - name: reqcount
      type: integer
- id: browse_radio_stations_picklist
  label: Browse Radio Stations (PickList)
  kind: query
  command: "BrowseRadioStations 1 10"
  params: []
- id: set_radio_filter
  label: Set Radio Filter
  kind: action
  command: "SetRadioFilter {tag}={value}"
  params:
    - name: tag
      type: enum
      values: [Source, Genre]
    - name: value
      type: string
- id: set_radio_filter_clear
  label: Clear Radio Filter
  kind: action
  command: "SetRadioFilter Clear"
  params: []
- id: ack_pick_item
  label: Ack Pick Item
  kind: action
  command: "AckPickItem {guid}"
  params:
    - name: guid
      type: string
- id: set_pick_list_count
  label: Set PickList Count
  kind: action
  command: "SetPickListCount {count}"
  params:
    - name: count
      type: integer
- id: play_album
  label: Play Album
  kind: action
  command: "PlayAlbum \"{album}\" {enqueue}"
  params:
    - name: album
      type: string
      description: GUID or album name in quotes
    - name: enqueue
      type: enum
      values: [true, false]
- id: play_artist
  label: Play Artist
  kind: action
  command: "PlayArtist \"{artist}\" {enqueue}"
  params:
    - name: artist
      type: string
      description: GUID or artist name in quotes
    - name: enqueue
      type: enum
      values: [true, false]
- id: play_genre
  label: Play Genre
  kind: action
  command: "PlayGenre \"{genre}\" {enqueue}"
  params:
    - name: genre
      type: string
      description: GUID or genre name in quotes
    - name: enqueue
      type: enum
      values: [true, false]
- id: play_playlist
  label: Play Playlist
  kind: action
  command: "PlayPlaylist \"{playlist}\" {enqueue} {startGuid}"
  params:
    - name: playlist
      type: string
      description: GUID or playlist name in quotes
    - name: enqueue
      type: enum
      values: [true, false]
    - name: startGuid
      type: string
      description: Optional starting track GUID
- id: play_title
  label: Play Title
  kind: action
  command: "PlayTitle \"{title}\" {enqueue}"
  params:
    - name: title
      type: string
      description: GUID or song name in quotes
    - name: enqueue
      type: enum
      values: [true, false]
- id: jump_to_now_playing_item
  label: Jump To Now Playing Item
  kind: action
  command: "JumpToNowPlayingItem {target}"
  params:
    - name: target
      type: string
      description: GUID or 1-based queue index
- id: remove_now_playing_item
  label: Remove Now Playing Item
  kind: action
  command: "RemoveNowPlayingItem {target}"
  params:
    - name: target
      type: string
      description: GUID or 1-based queue index
- id: play_radio_station
  label: Play Radio Station
  kind: action
  command: "PlayRadioStation \"{station}\""
  params:
    - name: station
      type: string
      description: GUID or station name in quotes
- id: set_music_filter
  label: Set Music Filter
  kind: action
  command: "SetMusicFilter {tag}={value}"
  params:
    - name: tag
      type: enum
      values: [Artist, Album, Genre, Playlist, Title, Search]
    - name: value
      type: string
      description: GUID, string, or Search="expr" with optional * wildcards
- id: set_music_filter_clear
  label: Clear Music Filter
  kind: action
  command: "SetMusicFilter Clear"
  params: []
- id: send_keys_navigation
  label: SendKeys - Navigation (MCS Software Only)
  kind: action
  command: "SendKeys {key}"
  params:
    - name: key
      type: enum
      values: [Home, Up, Down, Left, Right, OK, Back, Details, Guide, Jump, MoreInfo]
- id: send_keys_transport
  label: SendKeys - Transport (MCS Software Only)
  kind: action
  command: "SendKeys {key}"
  params:
    - name: key
      type: enum
      values: [Play, Pause, Stop, Record, FastForward, Rewind, Skip, Replay]
- id: send_keys_av_power
  label: SendKeys - AV / Power (MCS Software Only)
  kind: action
  command: "SendKeys {key}"
  params:
    - name: key
      type: enum
      values: [Volume+, Volume-, Chan/Page+, Chan/Page-, Mute, DVDMenu, Standby]
- id: send_keys_data_entry
  label: SendKeys - Data Entry (MCS Software Only)
  kind: action
  command: "SendKeys {key}"
  params:
    - name: key
      type: enum
      values: ["0","1","2","3","4","5","6","7","8","9", Clear, Enter]
```

## Feedbacks
```yaml
- id: connection_banner
  type: string
  description: Banner sent on connect, includes version (e.g. "Welcome to the Autonomic Media Control Server version 3.0.XXXX.XXX Release.")
- id: report_state
  type: object
  description: Key=value tokens reported via ReportState (response to GetStatus) and StateChanged (events). Keys include Volume, MediaControl, MediaName, ArtistName, TrackName, TrackNumber, TotalTracks, TrackTime, TrackDuration, Shuffle, RepeatSet, Running, SessionStart, MediaType, CD, DVD, Radio, Recording, RadioFrequency, ParentalAdvisoryRating, CallingPartyName, CallingPartyNumber, PhoneCall, TitleNumber, Visualization, TransitionTime, MediaTime, Error, Ejecting, GuideLoaded, SessionEnd.
- id: media_control_state
  type: enum
  values: [Play, Stop, Pause, Rewind1, Rewind2, Rewind3, FF1, FF2, FF3, NextFrame, PrevFrame, SlowMotion1, SlowMotion2, SlowMotion3, SkipNext, SkipPrev]
- id: navigation_state
  type: enum
  values: [FS_Home, FS_DVD, FS_TV, Guide, Music, Photos, Radio, RecordedShows, Videos, Extensibility, Unknown]
- id: ui_event_navigate
  type: string
  description: StateChanged Main UI=<Navigate page="..."/> with page in [NowPlaying, RefreshList]
- id: ui_event_status_message
  type: string
  description: StateChanged Main UI=<StatusMessage message="..."/>
- id: ui_event_clear
  type: string
  description: StateChanged Main UI=<Clear guid="..."/>
- id: ui_event_message_box
  type: object
  description: StateChanged Main UI=<MessageBox caption="..." message="..." timeout="..."> with Button children
- id: ui_event_input_box
  type: object
  description: StateChanged Main UI=<InputBox caption="..." message="..." timeout="..." value="..." action="..."/>
- id: msgbox_response
  type: string
  description: Server reply format "MsgBox [id] [button]" with 1-based button index
```

## Variables
```yaml
# UNRESOLVED: source documents state parameters as ReportState/StateChanged key=value tokens rather than discrete settable variables. Treat Volume as settable via transport (UNRESOLVED for explicit Set Volume command - not documented).
- id: volume
  type: integer
  description: Master MCS volume level, reported in ReportState/StateChanged. No explicit Set command documented.
```

## Events
```yaml
- id: state_changed
  type: object
  description: StateChanged <instance> <name>=<value> emitted after SubscribeEvents True. Documented name/value pairs listed in "Valid Name / Values" table of the source.
- id: ui_event
  type: object
  description: StateChanged Main UI=... envelope for Navigate / StatusMessage / Clear / MessageBox / InputBox.
```

## Macros
```yaml
# UNRESOLVED: source describes asynchronous state changes but no formal multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
Protocol is case-insensitive ASCII over TCP, CRLF terminated. Default port 5004. Album art served over HTTP on port 80 (Mirage) or 5005 (MCS Software) via /albumart path with query params c/guid/fmt/h/w/rfle/rflh/rflo/rz. List responses can be Standard ASCII or XML (toggle via `setxmlmode lists`). PickLists respond asynchronously; use `AckPickItem` and `SetPickListCount`. Source covers MCS 3.0 family generally — Ma6-specific features not found in source.

<!-- UNRESOLVED: RS-232 specifics (baud rate, parity, framing) for Ma6 not stated in source; source describes "Ethernet and RS-232 control protocol" but only TCP port 5004 documented. Firmware version not stated. Ma6 model name not found in source — spec covers the MCS 3.0 family. -->

## Provenance

```yaml
source_domains:
  - autonomic-controls.com
  - autonomic.atlassian.net
source_urls:
  - http://www.autonomic-controls.com/documents/MCS30/MCS_3.0_IP_Control_Protocol.pdf
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/25788450/MRAD+Communications+on+MAS
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/overview
retrieved_at: 2026-06-30T10:08:08.280Z
last_checked_at: 2026-07-07T11:04:04.776Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:04:04.776Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions match verbatim source commands; transport port 5004 confirmed; SendKeys consolidated into 4 parameterized spec actions covers full source key table; source command catalogue fully represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the MCS 3.0 IP/Serial spec, not a Ma6-specific manual; no Ma6 model string found in source."
- "source documents state parameters as ReportState/StateChanged key=value tokens rather than discrete settable variables. Treat Volume as settable via transport (UNRESOLVED for explicit Set Volume command - not documented)."
- "source describes asynchronous state changes but no formal multi-step macro sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "RS-232 specifics (baud rate, parity, framing) for Ma6 not stated in source; source describes \"Ethernet and RS-232 control protocol\" but only TCP port 5004 documented. Firmware version not stated. Ma6 model name not found in source — spec covers the MCS 3.0 family."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
