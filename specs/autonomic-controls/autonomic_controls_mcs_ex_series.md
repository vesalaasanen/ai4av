---
spec_id: admin/autonomic-controls-mcs-ex-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Autonomic Controls MCS-EX Series Control Spec"
manufacturer: "Autonomic Controls"
model_family: "MCS-EX Series"
aliases: []
compatible_with:
  manufacturers:
    - "Autonomic Controls"
  models:
    - "MCS-EX Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - autonomic.atlassian.net
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
retrieved_at: 2026-04-30T04:34:49.227Z
last_checked_at: 2026-06-02T21:40:18.993Z
generated_at: 2026-06-02T21:40:18.993Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific sub-models within MCS-EX Series not enumerated in source. Firmware compatibility not stated."
  - "specific sub-models within MCS-EX Series not enumerated. Firmware version compatibility not stated. Mute command not documented (only the Mute event). Device-level power on/off not documented (only per-instance and trigger control)."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:40:18.993Z
  matched_actions: 75
  action_count: 75
  confidence: medium
  summary: "All 75 spec actions match literal command tokens in source; transport parameters (port 5004, HTTP base_url:5005/api/, no auth) verified; coverage complete. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Autonomic Controls MCS-EX Series Control Spec

## Summary

The Autonomic MCS-EX Series is a multi-source media server (MMS) controlled over TCP socket or telnet on port 5004 using an ASCII text protocol terminated with CR+LF, with an equivalent HTTP/JSON API on port 5005. This spec covers the connection preamble, transport, browse/control commands, presets, scenes, playlists, now-playing queue, and trigger I/O documented in the vendor control protocol.

<!-- UNRESOLVED: specific sub-models within MCS-EX Series not enumerated in source. Firmware compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 5004
  base_url: http://{ipOrNameOfServer}:5005/api/
auth:
  type: none  # inferred: no auth procedure in source
```

The TCP control port is **5004**. Commands and responses are terminated with carriage return + line feed (`\r\n`). The HTTP JSON API is rooted at `/api/` on port 5005 (port 80 also accepted for `/getart` requests).

## Traits
```yaml
queryable: true   # inferred: GetStatus command, state events returned by MMS
levelable: true   # inferred: SetVolume 0-50 on selected output instance
routable: true    # inferred: SetInstance for output routing, SetOutputTrigger for trigger routing
```

## Actions
```yaml
# Connection preamble / setup
- id: set_client_type
  label: Set Client Type
  kind: action
  command: "SetClientType {type}"
  params:
    - name: type
      type: string
      description: Free-form client identifier string

- id: set_client_version
  label: Set Client Version
  kind: action
  command: "SetClientVersion {version}"
  params:
    - name: version
      type: string
      description: MAJOR.MINOR.BUILD.REVISION

- id: set_host
  label: Set Host
  kind: action
  command: "SetHost {ip}"
  params:
    - name: ip
      type: string
      description: IP address the client used to reach the MMS

- id: set_xml_mode
  label: Set XML Mode
  kind: action
  command: "SetXmlMode {mode}"
  params:
    - name: mode
      type: string
      description: 'None or Lists'

- id: set_encoding
  label: Set Encoding
  kind: action
  command: "SetEncoding {codePage}"
  params:
    - name: codePage
      type: integer
      description: Code page; 65001 (UTF-8) recommended

- id: set_instance
  label: Set Instance
  kind: action
  command: "SetInstance {instance}"
  params:
    - name: instance
      type: string
      description: Output/zone name (e.g. Player_A)

- id: subscribe_events
  label: Subscribe Events
  kind: action
  command: "SubscribeEvents {filter}"
  params:
    - name: filter
      type: string
      description: 'Optional: true|false, or comma-delimited event list. Omit for all events.'

- id: get_status
  label: Get Status
  kind: query
  command: "GetStatus"
  params: []

- id: set_option
  label: Set Option
  kind: action
  command: "SetOption {option}={value}"
  params:
    - name: option
      type: string
      description: 'Known options: supports_playnow, supports_inputbox, supports_urls'
    - name: value
      type: string
      description: 'true or false'

# Playback control
- id: play
  label: Play
  kind: action
  command: "Play"
  params: []

- id: pause
  label: Pause
  kind: action
  command: "Pause"
  params: []

- id: play_pause
  label: Play/Pause
  kind: action
  command: "PlayPause"
  params: []

- id: seek
  label: Seek
  kind: action
  command: "Seek {position}"
  params:
    - name: position
      type: integer
      description: 'Non-negative int (seconds from start) or negative int (seconds from end)'

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

- id: thumbs_up
  label: Thumbs Up
  kind: action
  command: "ThumbsUp"
  params: []

- id: thumbs_down
  label: Thumbs Down
  kind: action
  command: "ThumbsDown"
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  command: "SetVolume {level}"
  params:
    - name: level
      type: integer
      description: Integer 0-50; output must be in variable gain mode

- id: back
  label: Back
  kind: action
  command: "Back {depth}"
  params:
    - name: depth
      type: integer
      description: Number of navigation pages to pop

- id: repeat
  label: Repeat
  kind: action
  command: "Repeat"
  params: []

- id: shuffle
  label: Shuffle
  kind: action
  command: "Shuffle"
  params: []

- id: set_stars
  label: Set Stars
  kind: action
  command: "SetStars {count}"
  params:
    - name: count
      type: integer
      description: 'Integer -1 to 5. -1=disabled, 0-5=enabled'

- id: ack_button
  label: Ack Button
  kind: action
  command: "AckButton {button}"
  params:
    - name: button
      type: string
      description: Button identifier (e.g. CONTEXT)

- id: ack_pick_item
  label: Ack Pick Item
  kind: action
  command: "AckPickItem {guid}"
  params:
    - name: guid
      type: string
      description: Item GUID from a picklist

- id: set_music_filter
  label: Set Music Filter
  kind: action
  command: "SetMusicFilter {filter}"
  params:
    - name: filter
      type: string
      description: 'e.g. Clear'

- id: set_radio_filter
  label: Set Radio Filter
  kind: action
  command: "SetRadioFilter Source={guid}"
  params:
    - name: guid
      type: string
      description: Service GUID from BrowseRadioSources

- id: set_pick_list_count
  label: Set Pick List Count
  kind: action
  command: "SetPickListCount {count}"
  params:
    - name: count
      type: integer
      description: Maximum items per picklist response

- id: set_service_account
  label: Set Service Account
  kind: action
  command: "SetServiceAccount {serviceGuid} {accountGuid} {latched}"
  params:
    - name: serviceGuid
      type: string
      description: Service GUID (or "Service" or "Clear")
    - name: accountGuid
      type: string
      description: Account GUID (or "Clear")
    - name: latched
      type: string
      description: 'Optional. False to latch to current output. Omit for per-connection default.'

- id: clarify_title_intent
  label: Clarify Title Intent
  kind: action
  command: "ClarifyTitleIntent {guid} {verb}"
  params:
    - name: guid
      type: string
      description: Item GUID
    - name: verb
      type: string
      description: 'Queue verb (Next, Now, Replace, AddToQueue, AddToPlaylist). Omit to prompt user.'

# Browse
- id: browse_albums
  label: Browse Albums
  kind: action
  command: "BrowseAlbums {start} {count}"
  params:
    - name: start
      type: integer
      description: 1-based start index
    - name: count
      type: integer
      description: Maximum items to return

- id: browse_artists
  label: Browse Artists
  kind: action
  command: "BrowseArtists {start} {count}"
  params: []

- id: browse_composers
  label: Browse Composers
  kind: action
  command: "BrowseComposers {start} {count}"
  params: []

- id: browse_favorites
  label: Browse Favorites
  kind: action
  command: "BrowseFavorites {start} {count}"
  params: []

- id: browse_genres
  label: Browse Genres
  kind: action
  command: "BrowseGenres {start} {count}"
  params: []

- id: browse_now_playing
  label: Browse Now Playing
  kind: action
  command: "BrowseNowPlaying {start} {count}"
  params: []

- id: browse_picklist
  label: Browse Picklist
  kind: action
  command: "BrowsePicklist"
  params: []

- id: browse_playlists
  label: Browse Playlists
  kind: action
  command: "BrowsePlaylists {start} {count}"
  params: []

- id: browse_presets
  label: Browse Presets
  kind: action
  command: "BrowsePresets {start} {count}"
  params: []

- id: browse_radio_sources
  label: Browse Radio Sources
  kind: action
  command: "BrowseRadioSources"
  params: []

- id: browse_radio_stations
  label: Browse Radio Stations
  kind: action
  command: "BrowseRadioStations"
  params: []

- id: browse_radio_genres
  label: Browse Radio Genres
  kind: action
  command: "BrowseRadioGenres"
  params: []

- id: browse_service_accounts
  label: Browse Service Accounts
  kind: action
  command: "BrowseServiceAccounts"
  params: []

- id: browse_titles
  label: Browse Titles
  kind: action
  command: "BrowseTitles {start} {count}"
  params: []

- id: browse_top_menu
  label: Browse Top Menu
  kind: action
  command: "BrowseTopMenu {itemGuid}"
  params:
    - name: itemGuid
      type: string
      description: 'Optional. Child node GUID to root at (e.g. itemGuid=<childGuid>).'

- id: browse_scenes
  label: Browse Scenes
  kind: action
  command: "BrowseScenes {start} {count}"
  params: []

# Direct playback
- id: play_album
  label: Play Album
  kind: action
  command: "PlayAlbum {guid} {verb}"
  params:
    - name: guid
      type: string
      description: Album GUID
    - name: verb
      type: string
      description: 'Optional queue verb: Next, Now, Replace, AddToQueue, AddToPlaylist'

- id: play_artist
  label: Play Artist
  kind: action
  command: "PlayArtist {guid} {verb}"
  params: []

- id: play_composer
  label: Play Composer
  kind: action
  command: "PlayComposer {guid} {verb}"
  params: []

- id: play_genre
  label: Play Genre
  kind: action
  command: "PlayGenre {guid} {verb}"
  params: []

- id: play_playlist
  label: Play Playlist
  kind: action
  command: "PlayPlaylist {guid} {verb}"
  params: []

- id: play_preset
  label: Play Preset
  kind: action
  command: "PlayPreset {guid} {verb}"
  params: []

- id: play_scene
  label: Play Scene
  kind: action
  command: "PlayScene {guid} {verb}"
  params: []

- id: play_title
  label: Play Title
  kind: action
  command: "PlayTitle {guid} {verb}"
  params: []

# Queue modification verbs (appended to Play<Container> commands)
- id: queue_next
  label: Queue Next
  kind: action
  command: "{baseCommand} Next"
  params:
    - name: baseCommand
      type: string
      description: Play<Container> command without verb; inserts addressed content after currently playing track

- id: queue_now
  label: Queue Now
  kind: action
  command: "{baseCommand} Now"
  params:
    - name: baseCommand
      type: string
      description: Play<Container> command; inserts after current track and skips to it

- id: queue_replace
  label: Queue Replace
  kind: action
  command: "{baseCommand} Replace"
  params:
    - name: baseCommand
      type: string
      description: Play<Container> command; replaces entire queue

- id: queue_add_to_queue
  label: Add To Queue
  kind: action
  command: "{baseCommand} AddToQueue"
  params: []

- id: queue_add_to_playlist
  label: Add To Playlist
  kind: action
  command: "{baseCommand} AddToPlaylist"
  params: []

# Presets
- id: store_preset
  label: Store Preset
  kind: action
  command: "StorePreset {name}"
  params:
    - name: name
      type: string
      description: 'Optional. Double-quoted preset name. Omit to prompt via InputBox.'

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "RecallPreset {nameOrId}"
  params:
    - name: nameOrId
      type: string
      description: Double-quoted preset name or unique ID

- id: edit_preset
  label: Edit Preset
  kind: action
  command: "EditPreset {nameOrId}"
  params: []

- id: rename_preset
  label: Rename Preset
  kind: action
  command: "RenamePreset {nameOrId} {newName}"
  params: []

- id: delete_preset
  label: Delete Preset
  kind: action
  command: "DeletePreset {nameOrId}"
  params: []

# Scenes
- id: store_scene
  label: Store Scene
  kind: action
  command: "StoreScene {name}"
  params:
    - name: name
      type: string
      description: 'Optional. Double-quoted scene name. Omit to prompt via InputBox.'

- id: recall_scene
  label: Recall Scene
  kind: action
  command: "RecallScene {nameOrId}"
  params: []

- id: delete_scene
  label: Delete Scene
  kind: action
  command: "DeleteScene {nameOrId}"
  params: []

# Playlists
- id: rename_playlist
  label: Rename Playlist
  kind: action
  command: "RenamePlaylist {oldName} {newName}"
  params: []

- id: delete_playlist
  label: Delete Playlist
  kind: action
  command: "DeletePlaylist {nameOrId}"
  params: []

- id: reorder_playlist
  label: Reorder Playlist
  kind: action
  command: "ReorderPlaylist {playlistId} {srcTrackId} {destTrackId}"
  params: []

# Now Playing queue
- id: jump_to_now_playing_item
  label: Jump To Now Playing Item
  kind: action
  command: "JumpToNowPlayingitem {index}"
  params:
    - name: index
      type: integer
      description: 1-based index into the now playing queue

- id: reorder_now_playing
  label: Reorder Now Playing
  kind: action
  command: "ReorderNowPlaying {indexToMove} {indexToMoveTo}"
  params: []

- id: remove_now_playing_item
  label: Remove Now Playing Item
  kind: action
  command: "RemoveNowPlayingItem {index}"
  params: []

- id: clear_now_playing
  label: Clear Now Playing
  kind: action
  command: "ClearNowPlaying {stopStations}"
  params:
    - name: stopStations
      type: string
      description: 'False=clear queue and stop station content. True or omit=clear queue but keep stations playing.'

# Triggers
- id: set_output_trigger
  label: Set Output Trigger
  kind: action
  command: "SetOutputTrigger {index} {state}"
  params:
    - name: index
      type: integer
      description: Trigger index in trigger order (1-based; not label order)
    - name: state
      type: string
      description: 'true or false'

# HTTP-only ordering helper
- id: script
  label: Script (HTTP ordering)
  kind: action
  command: "Script {commands}"
  params:
    - name: commands
      type: string
      description: URL-encoded sub-commands; forces ordered execution over HTTP
  notes: HTTP API only. Each sub-command is a parameter, not a command.
```

## Feedbacks
```yaml
- id: media_control
  type: enum
  values: [Play, Pause, Stop]
  description: Playback control state (parallels PlayState)

- id: play_state
  type: enum
  values: [Playing, Paused, Stopped]
  description: Playback state of the output

- id: mute
  type: boolean
  description: Whether the selected instance is muted

- id: track_time
  type: integer
  description: Current track position in seconds (non-negative integer)

- id: track_duration
  type: integer
  description: Total track length in seconds; 0 when unavailable (e.g. live radio)

- id: repeat
  type: boolean
  description: Whether Repeat is currently enabled

- id: shuffle
  type: boolean
  description: Whether Shuffle is currently enabled

- id: back
  type: boolean
  description: Whether there is anything in the navigation stack

- id: browse_now_playing_available
  type: boolean
  description: Whether the now-playing queue can be browsed

- id: play_pause_available
  type: boolean
  description: Whether Play/Pause/PlayPause commands are valid

- id: repeat_available
  type: boolean
  description: Whether Repeat command is valid

- id: seek_available
  type: boolean
  description: Whether Seek command is valid

- id: shuffle_available
  type: boolean
  description: Whether Shuffle command is valid

- id: skip_next_available
  type: boolean
  description: Whether SkipNext command is valid

- id: skip_previous_available
  type: boolean
  description: Whether SkipPrevious command is valid

- id: context_menu
  type: boolean
  description: Whether AckButton CONTEXT is valid (TuneBridge available)

- id: thumbs_up
  type: integer
  enum: [-1, 0, 1]
  description: ThumbsUp state (-1=disabled, 0=enabled+unset, 1=enabled+set)

- id: thumbs_down
  type: integer
  enum: [-1, 0, 1]
  description: ThumbsDown state (-1=disabled, 0=enabled+unset, 1=enabled+set)

- id: stars
  type: integer
  range: [-1, 5]
  description: Stars rating state (-1=disabled, 0-5=enabled)

- id: meta_label_1
  type: string
  description: Label for MetaData1 (e.g. radio station name)

- id: meta_label_2
  type: string
  description: Label for MetaData2 (e.g. Artist)

- id: meta_label_3
  type: string
  description: Label for MetaData3 (e.g. Album)

- id: meta_label_4
  type: string
  description: Label for MetaData4 (e.g. Track)

- id: meta_data_1
  type: string
  description: Metadata line 1 value

- id: meta_data_2
  type: string
  description: Metadata line 2 value (typically artist)

- id: meta_data_3
  type: string
  description: Metadata line 3 value (typically album)

- id: meta_data_4
  type: string
  description: Metadata line 4 value (typically track)

- id: now_playing_guid
  type: string
  description: GUID of the now-playing item

- id: base_web_url
  type: string
  description: Protocol/address/port base for cover art URLs (e.g. http://192.168.0.59:5005)

- id: favorites_changed
  type: boolean
  description: Fires true on any preset change (add, delete, rename)

- id: favorites_count
  type: integer
  description: Current number of presets (fires on add/delete only)

- id: scenes_changed
  type: boolean
  description: Fires true on any scene change

- id: scenes_count
  type: integer
  description: Current number of scenes

- id: playlists_changed
  type: boolean
  description: Fires true on any playlist change

- id: playlist_count
  type: integer
  description: Current number of playlists (fires on add/delete only)

- id: local_queue_options
  type: string
  description: Comma-delimited list of queue modification verbs currently available (Next, Now, Replace, AddToQueue, AddToPlaylist)
```

## Events
```yaml
# Unsolicited events pushed after SubscribeEvents. Format: EventReason Source Event=Value
# All state-change events listed in Feedbacks are also pushed as StateChanged / ReportState.

- id: state_changed
  description: 'StateChanged <instance> <event>=<value> - pushed when subscribed state changes'

- id: report_state
  description: 'ReportState <instance> <event>=<value> - alternate report form used for initial state dumps'

- id: trigger_in
  description: 'TriggerIn1..TriggerIn<x> = true|false - fires when voltage is applied to the corresponding input trigger pin'

# HTTP API events payload (returned by GET /api/)
- id: http_events
  description: JSON `events` array - name/value pairs mirroring the IP protocol events
- id: http_browse
  description: JSON `browse` object - response to the most recent browse request
- id: http_messages
  description: JSON `messages` array - generic messages
- id: http_controls
  description: JSON `controls` object - returned alongside browse responses
```

## Variables
```yaml
# Settable per-connection state. The server has no documented settable variables beyond
# per-connection options and the playback state machine.
- id: client_type
  type: string
  writable: true
  description: Set via SetClientType

- id: client_version
  type: string
  writable: true
  description: Set via SetClientVersion

- id: host
  type: string
  writable: true
  description: Set via SetHost

- id: xml_mode
  type: string
  writable: true
  enum: [None, Lists]
  description: Set via SetXmlMode

- id: encoding
  type: integer
  writable: true
  description: Set via SetEncoding (e.g. 65001 for UTF-8)

- id: instance
  type: string
  writable: true
  description: Set via SetInstance; target of subsequent browse/control commands

- id: volume
  type: integer
  writable: true
  range: [0, 50]
  description: Set via SetVolume; instance must be in variable gain mode

- id: service_account
  type: string
  writable: true
  description: Set via SetServiceAccount; per-connection default account per service
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Electrical specifications documented in source:
#   - Input triggers:  5-24V AC or DC applied to input pin activates the trigger
#   - Output triggers: 12VDC, 100mA max supplied on output pin
# These are the only safety-relevant electrical parameters stated in the source.
# No power-on sequencing, fault, or interlock procedures are documented in the source.
```

## Notes

- **HTTP API ordering caveat:** HTTP requests are not guaranteed to be processed in send order. Use the `Script` command to force ordered execution.
- **`clientId` required for HTTP:** All HTTP API requests must include a `clientId=<UUID>` query string to prevent inter-client crosstalk; missing clientId causes crosstalk.
- **Polling pattern over HTTP:** Commands are sent as `GET` to `/api/<Command>/<args>`. Responses arrive on the next `GET` to bare `/api/`.
- **`SetHost` usage:** Only required in non-flat network topologies where the client's view of the MMS IP differs from the MMS' local IP. Setting to a wrong address degrades performance and behavior.
- **Variable-gain mode required for volume:** `SetVolume` only works on outputs configured for variable gain in the device's System tab.
- **ThumbsDown on some services skips to next track** when set to `1`.
- **`Repeat` and `Shuffle` are commands** (not just flags); the `*Available` events indicate whether they are valid.
- **`NowPlayingGuid` plus `BaseWebUrl` plus `getart?guid=...&w=...&h=...`** construct cover art URLs. Port 5005 and port 80 are equivalent for `/getart`.
<!-- UNRESOLVED: specific sub-models within MCS-EX Series not enumerated. Firmware version compatibility not stated. Mute command not documented (only the Mute event). Device-level power on/off not documented (only per-instance and trigger control). -->

## Provenance

```yaml
source_domains:
  - autonomic.atlassian.net
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
retrieved_at: 2026-04-30T04:34:49.227Z
last_checked_at: 2026-06-02T21:40:18.993Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:40:18.993Z
matched_actions: 75
action_count: 75
confidence: medium
summary: "All 75 spec actions match literal command tokens in source; transport parameters (port 5004, HTTP base_url:5005/api/, no auth) verified; coverage complete. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific sub-models within MCS-EX Series not enumerated in source. Firmware compatibility not stated."
- "specific sub-models within MCS-EX Series not enumerated. Firmware version compatibility not stated. Mute command not documented (only the Mute event). Device-level power on/off not documented (only per-instance and trigger control)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
