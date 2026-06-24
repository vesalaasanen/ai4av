---
spec_id: admin/autonomic-controls-m3-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Autonomic Controls M3 Control Spec"
manufacturer: "Autonomic Controls"
model_family: "Autonomic Mirage Media Server"
aliases: []
compatible_with:
  manufacturers:
    - "Autonomic Controls"
    - "Autonomic Controls, Inc"
  models:
    - "Autonomic Mirage Media Server"
    - "Autonomic Media Control System (MCS 3.0)"
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
  - http://www.autonomic-controls.com/documents/mcs30/mcs_3.0_IP_Control_Protocol.pdf
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1596620801/Control+Protocols
retrieved_at: 2026-05-19T21:55:40.422Z
last_checked_at: 2026-06-23T09:39:08.135Z
generated_at: 2026-06-23T09:39:08.135Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 is mentioned in the overview but no serial configuration (baud rate, data bits, parity, stop bits) is documented in the source. Only TCP/IP parameters are specified."
verification:
  verdict: verified
  checked_at: 2026-06-23T09:39:08.135Z
  matched_actions: 101
  action_count: 101
  confidence: medium
  summary: "All 101 spec actions (82 Actions + 19 Feedbacks with query_command) have exact wire-literal matches; transport port 5004 and no-auth confirmed. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Autonomic Controls M3 Control Spec

## Summary

The Autonomic Media Control System (MCS) 3.0 is an IP-based media playback engine implemented in the Autonomic Mirage Media Server, MCS 3.0 software, and NuVo MPS4 series music servers. This spec covers the ASCII TCP/IP control protocol on port 5004, which provides two-way communication for transport control, media library browsing, multi-instance management, volume, and radio source selection. Commands are case-insensitive and terminated with CRLF.

<!-- UNRESOLVED: RS-232 is mentioned in the overview but no serial configuration (baud rate, data bits, parity, stop bits) is documented in the source. Only TCP/IP parameters are specified. -->

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
- queryable   # inferred from GetStatus and SubscribeEvents query commands
- levelable   # inferred from Volume state reported in GetStatus/StateChanged
```

## Actions
```yaml
- id: banner
  label: Display Connection Banner
  kind: query
  command: "banner"
  params: []

- id: set_xml_mode_none
  label: Set Response Mode to ASCII
  kind: action
  command: "setxmlmode none"
  params: []

- id: set_xml_mode_lists
  label: Set Response Mode to XML
  kind: action
  command: "setxmlmode lists"
  params: []

- id: cls
  label: Clear ANSI Terminal
  kind: action
  command: "cls"
  params: []

- id: exit
  label: End Session
  kind: action
  command: "exit"
  params: []

- id: help
  label: Display Help
  kind: query
  command: "help"
  params: []

- id: help_command
  label: Display Help for Command
  kind: query
  command: "help {command}"
  params:
    - name: command
      type: string
      description: Command name to get help for

- id: get_versions
  label: Get Component Versions
  kind: query
  command: "GetVersions"
  params: []

- id: get_license_message
  label: Get License Message
  kind: query
  command: "GetLicenseMessage"
  params: []

- id: time
  label: Get System Time
  kind: query
  command: "Time"
  params: []

- id: time_formatted
  label: Get System Time with Format
  kind: query
  command: "Time {format}"
  params:
    - name: format
      type: string
      description: Format code (d, D, f, F, g, G, m, r, s, U)

- id: uptime
  label: Get MCS Uptime
  kind: query
  command: "Uptime"
  params: []

- id: browse_encodings
  label: Browse Text Encodings
  kind: query
  command: "BrowseEncodings"
  params: []

- id: set_encoding
  label: Set Text Encoding
  kind: action
  command: "SetEncoding {encoding_id}"
  params:
    - name: encoding_id
      type: integer
      description: Encoding ID (e.g. 20105 for Western European IA5)

- id: start_mcs
  label: Start MCS Session
  kind: action
  command: "StartMCS"
  params: []

- id: browse_instances
  label: Browse MCS Instances
  kind: query
  command: "BrowseInstances"
  params: []

- id: set_instance
  label: Select MCS Instance
  kind: action
  command: "SetInstance \"{instance_id}\""
  params:
    - name: instance_id
      type: string
      description: Instance name or * for current console instance

- id: msg_box
  label: Display Message Box Dialog
  kind: action
  command: "MsgBox {id} \"{caption}\" \"{message}\" \"{buttons}\" \"{timeout}\""
  params:
    - name: id
      type: integer
      description: Question ID to match response
    - name: caption
      type: string
      description: Dialog caption
    - name: message
      type: string
      description: Dialog message text
    - name: buttons
      type: string
      description: Semicolon-delimited button labels
    - name: timeout
      type: integer
      description: Timeout in seconds (default 5)

- id: get_status
  label: Get Full MCS Status
  kind: query
  command: "GetStatus"
  params: []

- id: subscribe_events_true
  label: Enable Event Notifications
  kind: action
  command: "SubscribeEvents True"
  params: []

- id: subscribe_events_false
  label: Disable Event Notifications
  kind: action
  command: "SubscribeEvents False"
  params: []

- id: subscribe_events_filter
  label: Subscribe to Specific Events
  kind: action
  command: "SubscribeEvents \"{event_list}\""
  params:
    - name: event_list
      type: string
      description: Comma-delimited list of event names (e.g. MetaData1,MetaData2)

- id: navigate_fm_radio
  label: Navigate to FM Radio
  kind: action
  command: "Navigate FMRadio"
  params: []

- id: navigate_internet_radio
  label: Navigate to Internet Radio
  kind: action
  command: "Navigate InternetRadio"
  params: []

- id: navigate_live_tv
  label: Navigate to Live TV
  kind: action
  command: "Navigate LiveTV"
  params: []

- id: navigate_more_programs
  label: Navigate to More Programs
  kind: action
  command: "Navigate MorePrograms"
  params: []

- id: navigate_music_albums
  label: Navigate to Music Albums
  kind: action
  command: "Navigate MusicAlbums"
  params: []

- id: navigate_music_artists
  label: Navigate to Music Artists
  kind: action
  command: "Navigate MusicArtists"
  params: []

- id: navigate_music_songs
  label: Navigate to Music Songs
  kind: action
  command: "Navigate MusicSongs"
  params: []

- id: navigate_my_music
  label: Navigate to My Music
  kind: action
  command: "Navigate MyMusic"
  params: []

- id: navigate_my_pictures
  label: Navigate to My Pictures
  kind: action
  command: "Navigate MyPictures"
  params: []

- id: navigate_my_tv
  label: Navigate to My TV
  kind: action
  command: "Navigate MyTV"
  params: []

- id: navigate_my_videos
  label: Navigate to My Videos
  kind: action
  command: "Navigate MyVideos"
  params: []

- id: navigate_recorded_tv
  label: Navigate to Recorded TV
  kind: action
  command: "Navigate RecordedTV"
  params: []

- id: navigate_recorder_storage_settings
  label: Navigate to Recorder Storage Settings
  kind: action
  command: "Navigate RecorderStorageSettings"
  params: []

- id: navigate_scheduled_tv_recordings
  label: Navigate to Scheduled TV Recordings
  kind: action
  command: "Navigate ScheduledTVRecordings"
  params: []

- id: navigate_slide_show
  label: Navigate to Slide Show
  kind: action
  command: "Navigate SlideShow"
  params: []

- id: navigate_start
  label: Navigate to Start Page
  kind: action
  command: "Navigate Start"
  params: []

- id: navigate_tv_guide
  label: Navigate to TV Guide
  kind: action
  command: "Navigate TVGuide"
  params: []

- id: navigate_visualizations
  label: Navigate to Visualizations
  kind: action
  command: "Navigate Visualizations"
  params: []

- id: navigate_photo_details
  label: Navigate to Photo Details
  kind: action
  command: "Navigate PhotoDetails"
  params: []

- id: navigate_slide_show_settings
  label: Navigate to Slide Show Settings
  kind: action
  command: "Navigate SlideShowSettings"
  params: []

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
  label: Play/Pause Toggle
  kind: action
  command: "PlayPause"
  params: []

- id: skip_next
  label: Skip to Next Track
  kind: action
  command: "SkipNext"
  params: []

- id: skip_previous
  label: Skip to Previous Track
  kind: action
  command: "SkipPrevious"
  params: []

- id: shuffle_on
  label: Enable Shuffle
  kind: action
  command: "Shuffle true"
  params: []

- id: shuffle_off
  label: Disable Shuffle
  kind: action
  command: "Shuffle false"
  params: []

- id: shuffle_toggle
  label: Toggle Shuffle
  kind: action
  command: "Shuffle toggle"
  params: []

- id: repeat_on
  label: Enable Repeat
  kind: action
  command: "Repeat true"
  params: []

- id: repeat_off
  label: Disable Repeat
  kind: action
  command: "Repeat false"
  params: []

- id: repeat_toggle
  label: Toggle Repeat
  kind: action
  command: "Repeat toggle"
  params: []

- id: browse_albums
  label: Browse Albums
  kind: query
  command: "BrowseAlbums {start} {reqcount}"
  params:
    - name: start
      type: integer
      description: Start position (integer or letter for alpha index)
    - name: reqcount
      type: integer
      description: Number of items to return

- id: browse_artists
  label: Browse Artists
  kind: query
  command: "BrowseArtists {start} {reqcount}"
  params:
    - name: start
      type: integer
      description: Start position (integer or letter for alpha index)
    - name: reqcount
      type: integer
      description: Number of items to return

- id: browse_genres
  label: Browse Genres
  kind: query
  command: "BrowseGenres {start} {reqcount}"
  params:
    - name: start
      type: integer
      description: Start position (integer or letter for alpha index)
    - name: reqcount
      type: integer
      description: Number of items to return

- id: browse_now_playing
  label: Browse Now Playing Queue
  kind: query
  command: "BrowseNowPlaying {start} {reqcount}"
  params:
    - name: start
      type: integer
      description: Start position
    - name: reqcount
      type: integer
      description: Number of items to return

- id: browse_playlists
  label: Browse Playlists
  kind: query
  command: "BrowsePlaylists {start} {reqcount}"
  params:
    - name: start
      type: integer
      description: Start position
    - name: reqcount
      type: integer
      description: Number of items to return

- id: browse_radio_genres
  label: Browse Radio Genres
  kind: query
  command: "BrowseRadioGenres {start} {reqcount}"
  params:
    - name: start
      type: integer
      description: Start position
    - name: reqcount
      type: integer
      description: Number of items to return

- id: browse_radio_stations
  label: Browse Radio Stations
  kind: query
  command: "BrowseRadioStations {start} {reqcount}"
  params:
    - name: start
      type: integer
      description: Start position
    - name: reqcount
      type: integer
      description: Number of items to return

- id: browse_radio_sources
  label: Browse Radio Sources
  kind: query
  command: "BrowseRadioSources {start} {reqcount}"
  params:
    - name: start
      type: integer
      description: Start position
    - name: reqcount
      type: integer
      description: Number of items to return

- id: browse_titles
  label: Browse Titles
  kind: query
  command: "BrowseTitles {start} {reqcount}"
  params:
    - name: start
      type: integer
      description: Start position
    - name: reqcount
      type: integer
      description: Number of items to return

- id: play_album
  label: Play Album by GUID or Name
  kind: action
  command: "PlayAlbum {guid_or_name} {enqueue}"
  params:
    - name: guid_or_name
      type: string
      description: Album GUID or quoted album name
    - name: enqueue
      type: boolean
      description: True to add to queue without interrupting; False to clear queue first

- id: play_artist
  label: Play Artist by GUID or Name
  kind: action
  command: "PlayArtist {guid_or_name} {enqueue}"
  params:
    - name: guid_or_name
      type: string
      description: Artist GUID or quoted artist name
    - name: enqueue
      type: boolean
      description: True to add to queue without interrupting; False to clear queue first

- id: play_genre
  label: Play Genre by GUID or Name
  kind: action
  command: "PlayGenre {guid_or_name} {enqueue}"
  params:
    - name: guid_or_name
      type: string
      description: Genre GUID or quoted genre name
    - name: enqueue
      type: boolean
      description: True to add to queue without interrupting; False to clear queue first

- id: play_playlist
  label: Play Playlist by GUID or Name
  kind: action
  command: "PlayPlaylist {guid_or_name} {enqueue}"
  params:
    - name: guid_or_name
      type: string
      description: Playlist GUID or quoted playlist name
    - name: enqueue
      type: boolean
      description: True to add to queue without interrupting; False to clear queue first

- id: play_title
  label: Play Title by GUID or Name
  kind: action
  command: "PlayTitle {guid_or_name} {enqueue}"
  params:
    - name: guid_or_name
      type: string
      description: Title GUID or quoted song name
    - name: enqueue
      type: boolean
      description: True to add to queue without interrupting; False to clear queue first

- id: jump_to_now_playing_item_guid
  label: Jump to Now Playing Item by GUID
  kind: action
  command: "JumpToNowPlayingItem {guid}"
  params:
    - name: guid
      type: string
      description: GUID of the track from BrowseNowPlaying

- id: jump_to_now_playing_item_index
  label: Jump to Now Playing Item by Index
  kind: action
  command: "JumpToNowPlayingItem {index}"
  params:
    - name: index
      type: integer
      description: 1-based index from top of queue

- id: remove_now_playing_item_guid
  label: Remove Now Playing Item by GUID
  kind: action
  command: "RemoveNowPlayingItem {guid}"
  params:
    - name: guid
      type: string
      description: GUID of the track to remove from the now playing queue

- id: remove_now_playing_item_index
  label: Remove Now Playing Item by Index
  kind: action
  command: "RemoveNowPlayingItem {index}"
  params:
    - name: index
      type: integer
      description: 1-based index of the track to remove from the now playing queue

- id: play_radio_station
  label: Play Radio Station by GUID or Name
  kind: action
  command: "PlayRadioStation {guid_or_name}"
  params:
    - name: guid_or_name
      type: string
      description: Radio station GUID or quoted station name

- id: set_music_filter_tag_guid
  label: Set Music Filter by Tag and GUID
  kind: action
  command: "SetMusicFilter {tag}={guid}"
  params:
    - name: tag
      type: string
      description: Filter tag (Artist, Album, Genre, Playlist, or Title)
    - name: guid
      type: string
      description: GUID obtained from a Browse command

- id: set_music_filter_search
  label: Set Music Filter by Search String
  kind: action
  command: "SetMusicFilter Search=\"{searchstring}\""
  params:
    - name: searchstring
      type: string
      description: Search string; wildcard * supported (e.g. *Diana*)

- id: set_music_filter_clear
  label: Clear Music Filter
  kind: action
  command: "SetMusicFilter Clear"
  params: []

- id: set_radio_filter_tag_guid
  label: Set Radio Filter by Tag and GUID
  kind: action
  command: "SetRadioFilter {tag}={guid}"
  params:
    - name: tag
      type: string
      description: Filter tag (Source or Genre)
    - name: guid
      type: string
      description: GUID obtained from a Browse command

- id: set_radio_filter_clear
  label: Clear Radio Filter
  kind: action
  command: "SetRadioFilter Clear"
  params: []

- id: ack_pick_item
  label: Select a PickList Item
  kind: action
  command: "AckPickItem {guid}"
  params:
    - name: guid
      type: string
      description: GUID of the PickListItem to select

- id: set_pick_list_count
  label: Set PickList Display Count
  kind: action
  command: "SetPickListCount {count}"
  params:
    - name: count
      type: integer
      description: Number of items the client displays in a PickList

- id: ack_button
  label: Acknowledge MessageBox or InputBox Button
  kind: action
  command: "AckButton {guid} \"{button_text}\""
  params:
    - name: guid
      type: string
      description: GUID from the MessageBox or InputBox UI event
    - name: button_text
      type: string
      description: Text of the button pressed or input value

- id: send_keys
  label: Send IR Key Command (MCS Software Only)
  kind: action
  command: "SendKeys {irkey}"
  params:
    - name: irkey
      type: string
      description: "IR key name: Home, Up, Down, Left, Right, OK, Back, Details, Guide, Jump, MoreInfo, Play, Pause, Stop, Record, FastForward, Rewind, Skip, Replay, Volume+, Volume-, Chan/Page+, Chan/Page-, Mute, DVDMenu, Standby, 0-9, Clear, Enter"
```

## Feedbacks
```yaml
- id: fb_get_status
  query_command: "GetStatus"
  description: Returns all current state parameters as ReportState messages (TrackName, ArtistName, MediaName, MediaControl, Volume, Shuffle, Repeat, Running, SessionStart, TrackTime, TrackDuration, TotalTracks, TrackNumber, RepeatSet, CD)

- id: fb_state_changed_media_control
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> MediaControl=<value> - transport state (Play, Stop, Pause, FF1, FF2, FF3, Rewind1, Rewind2, Rewind3, SkipNext, SkipPrev, SlowMotion1, SlowMotion2, SlowMotion3, NextFrame, PrevFrame)

- id: fb_state_changed_track_name
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> TrackName=<value> - name of the currently playing track

- id: fb_state_changed_artist_name
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> ArtistName=<value> - artist of the currently playing media

- id: fb_state_changed_media_name
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> MediaName=<value> - name of the currently playing media (all media types)

- id: fb_state_changed_volume
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> Volume=<value> - current master MCS volume level

- id: fb_state_changed_track_time
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> TrackTime=<seconds> - current track playback progress in seconds

- id: fb_state_changed_track_duration
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> TrackDuration=<seconds> - total duration of current track in seconds

- id: fb_state_changed_total_tracks
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> TotalTracks=<value> - total tracks in current media set

- id: fb_state_changed_track_number
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> TrackNumber=<value> - current track number

- id: fb_state_changed_shuffle
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> Shuffle=<True|False> - shuffle mode status changed

- id: fb_state_changed_repeat_set
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> RepeatSet=<True|False> - repeat mode status changed

- id: fb_state_changed_running
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> Running=<True|False> - MCS shell running state

- id: fb_state_changed_navigation
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> Navigation=<value> - navigation state (FS_Home, FS_DVD, FS_TV, Music, Photos, Radio, Videos, Guide, RecordedShows, Extensibility, Unknown)

- id: fb_state_changed_session_start
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> SessionStart=<value> - MCS shell started with session type

- id: fb_state_changed_session_end
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> SessionEnd - MCS shell ended

- id: fb_state_changed_radio_frequency
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> RadioFrequency=<value> - current radio station frequency

- id: fb_state_changed_media_type
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> MediaType=<value> - type of currently playing media

- id: fb_state_changed_media_time
  query_command: "SubscribeEvents True"
  description: StateChanged <instance> MediaTime=<value> - total duration of currently playing media (video, music, or TV)
```

## Variables
```yaml
[]
```

## Events
```yaml
[]
```

## Macros
```yaml
[]
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes

- Transport: TCP/IP on port 5004 (default; configurable in MCS software only); album art served via HTTP on port 80 (Mirage) or 5005 (MCS software).
- Terminator: all commands and responses use CRLF (carriage return + line feed).
- Duplex: full-duplex asynchronous; server may interleave StateChanged event messages between list response items; clients must parse responses in any order.

## Provenance

```yaml
source_domains:
  - autonomic-controls.com
  - autonomic.atlassian.net
source_urls:
  - http://www.autonomic-controls.com/documents/mcs30/mcs_3.0_IP_Control_Protocol.pdf
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1596620801/Control+Protocols
retrieved_at: 2026-05-19T21:55:40.422Z
last_checked_at: 2026-06-23T09:39:08.135Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T09:39:08.135Z
matched_actions: 101
action_count: 101
confidence: medium
summary: "All 101 spec actions (82 Actions + 19 Feedbacks with query_command) have exact wire-literal matches; transport port 5004 and no-auth confirmed. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 is mentioned in the overview but no serial configuration (baud rate, data bits, parity, stop bits) is documented in the source. Only TCP/IP parameters are specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
