---
spec_id: admin/autonomic_controls-msb20e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Autonomic Controls MSB20e Control Spec"
manufacturer: "Autonomic Controls"
model_family: MSB20e
aliases: []
compatible_with:
  manufacturers:
    - "Autonomic Controls"
  models:
    - MSB20e
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - autonomic.atlassian.net
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
retrieved_at: 2026-05-04T18:04:32.414Z
last_checked_at: 2026-05-20T04:53:06.258Z
generated_at: 2026-05-20T04:53:06.258Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T04:53:06.258Z
  matched_actions: 60
  action_count: 60
  confidence: high
  summary: "All 60 spec actions matched to source commands; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Autonomic Controls MSB20e Control Spec

## Summary
The MSB20e is a media server controlled via TCP socket on port 5004 or JSON HTTP API. Commands are text-based terminated with CR+LF. Supports playback, browsing, presets, scenes, playlists, triggers, and album art retrieval.

<!-- UNRESOLVED: power commands not documented in source -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 5004  # TCP socket / telnet
  base_url: http://ipOrNameOfServer/api/  # HTTP API root
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # UNRESOLVED: no power commands in source, inferred from product type
- routable        # UNRESOLVED: input/output routing not explicitly documented
- queryable       # GetStatus, query events present
- levelable       # SetVolume command present
```

## Actions
```yaml
# Playback
- id: play
  label: Play
  kind: action
  params: []

- id: pause
  label: Pause
  kind: action
  params: []

- id: play_pause
  label: PlayPause
  kind: action
  params: []

- id: seek
  label: Seek
  kind: action
  params:
    - name: position
      type: integer
      description: Track position in seconds. Non-negative relative to start, negative relative to end.

- id: skip_next
  label: SkipNext
  kind: action
  params: []

- id: skip_previous
  label: SkipPrevious
  kind: action
  params: []

- id: thumbs_up
  label: ThumbsUp
  kind: action
  params: []

- id: thumbs_down
  label: ThumbsDown
  kind: action
  params: []

- id: set_volume
  label: SetVolume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 0-50

# Connection setup
- id: set_client_type
  label: SetClientType
  kind: action
  params:
    - name: client_name
      type: string
      description: Client identifier string

- id: set_client_version
  label: SetClientVersion
  kind: action
  params:
    - name: version
      type: string
      description: Version string MAJOR.MINOR.BUILD.REVISION

- id: set_host
  label: SetHost
  kind: action
  params:
    - name: address
      type: string
      description: Client IP address for cover art URL generation

- id: set_xml_mode
  label: SetXmlMode
  kind: action
  params:
    - name: mode
      type: string
      description: XML mode - None or Lists

- id: set_encoding
  label: SetEncoding
  kind: action
  params:
    - name: encoding
      type: integer
      description: Character encoding code (65001 = UTF-8)

- id: set_instance
  label: SetInstance
  kind: action
  params:
    - name: instance_name
      type: string
      description: Instance name (e.g. Player_A)

- id: set_option
  label: SetOption
  kind: action
  params:
    - name: option
      type: string
    - name: value
      type: string
      description: Option and value (e.g. supports_playnow=true)

- id: subscribe_events
  label: SubscribeEvents
  kind: action
  params:
    - name: events_or_true
      type: string
      description: Optional comma-separated event list or true/false

- id: get_status
  label: GetStatus
  kind: action
  params: []

# Service accounts
- id: set_service_account
  label: SetServiceAccount
  kind: action
  params:
    - name: service_guid
      type: string
    - name: account_guid
      type: string
    - name: latch
      type: string
      description: Optional False to latch per output

# Playback with content
- id: play_album
  label: PlayAlbum
  kind: action
  params:
    - name: album_guid
      type: string
    - name: verb
      type: string
      description: Optional - Next/Now/Replace/AddToQueue

- id: play_artist
  label: PlayArtist
  kind: action
  params:
    - name: artist_guid
      type: string
    - name: verb
      type: string

- id: play_composer
  label: PlayComposer
  kind: action
  params:
    - name: composer_guid
      type: string
    - name: verb
      type: string

- id: play_genre
  label: PlayGenre
  kind: action
  params:
    - name: genre_guid
      type: string
    - name: verb
      type: string

- id: play_playlist
  label: PlayPlaylist
  kind: action
  params:
    - name: name_or_id
      type: string
    - name: verb
      type: string

- id: play_preset
  label: PlayPreset
  kind: action
  params:
    - name: preset_guid
      type: string
    - name: verb
      type: string

- id: play_scene
  label: PlayScene
  kind: action
  params:
    - name: scene_guid
      type: string
    - name: verb
      type: string

- id: play_title
  label: PlayTitle
  kind: action
  params:
    - name: title_guid
      type: string
    - name: verb
      type: string

# Queue modification
- id: jump_to_now_playing_item
  label: JumpToNowPlayingitem
  kind: action
  params:
    - name: index
      type: integer
      description: 1-based index

- id: reorder_now_playing
  label: ReorderNowPlaying
  kind: action
  params:
    - name: track_index
      type: integer
    - name: target_index
      type: integer

- id: remove_now_playing_item
  label: RemoveNowPlayingItem
  kind: action
  params:
    - name: index
      type: integer

- id: clear_now_playing
  label: ClearNowPlaying
  kind: action
  params:
    - name: stop_stations
      type: boolean
      description: Optional False to stop station content

# Presets
- id: store_preset
  label: StorePreset
  kind: action
  params:
    - name: name
      type: string
      description: Optional double-quoted preset name

- id: recall_preset
  label: RecallPreset
  kind: action
  params:
    - name: name_or_id
      type: string

- id: edit_preset
  label: EditPreset
  kind: action
  params:
    - name: name_or_id
      type: string

- id: rename_preset
  label: RenamePreset
  kind: action
  params:
    - name: name_or_id
      type: string
    - name: new_name
      type: string

- id: delete_preset
  label: DeletePreset
  kind: action
  params:
    - name: name_or_id
      type: string

# Scenes
- id: store_scene
  label: StoreScene
  kind: action
  params:
    - name: name
      type: string
      description: Optional double-quoted scene name

- id: recall_scene
  label: RecallScene
  kind: action
  params:
    - name: name_or_id
      type: string

- id: delete_scene
  label: DeleteScene
  kind: action
  params:
    - name: name_or_id
      type: string

# Playlists
- id: rename_playlist
  label: RenamePlaylist
  kind: action
  params:
    - name: old_name
      type: string
    - name: new_name
      type: string

- id: delete_playlist
  label: DeletePlaylist
  kind: action
  params:
    - name: name_or_id
      type: string

- id: reorder_playlist
  label: ReorderPlaylist
  kind: action
  params:
    - name: playlist_id
      type: string
    - name: source_track_id
      type: string
    - name: dest_track_id
      type: string

# Browse
- id: browse_albums
  label: BrowseAlbums
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_artists
  label: BrowseArtists
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_composers
  label: BrowseComposers
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_favorites
  label: BrowseFavorites
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_genres
  label: BrowseGenres
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_now_playing
  label: BrowseNowPlaying
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_picklist
  label: BrowsePicklist
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_playlists
  label: BrowsePlaylists
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_radio_sources
  label: BrowseRadioSources
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_titles
  label: BrowseTitles
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_top_menu
  label: BrowseTopMenu
  kind: action
  params:
    - name: item_guid
      type: string
      description: Optional child GUID to browse specific node

- id: browse_service_accounts
  label: BrowseServiceAccounts
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

# Triggers
- id: set_output_trigger
  label: SetOutputTrigger
  kind: action
  params:
    - name: trigger_index
      type: integer
      description: 1-based trigger index
    - name: state
      type: boolean
      description: true/false

# HTTP API only
- id: script
  label: Script
  kind: action
  params:
    - name: commands
      type: string
      description: URL-encoded commands separated by /

- id: clarify_title_intent
  label: ClarifyTitleIntent
  kind: action
  params:
    - name: guid
      type: string
    - name: verb
      type: string
      description: Next/Now/Replace/AddToQueue

- id: ack_pick_item
  label: AckPickItem
  kind: action
  params:
    - name: guid
      type: string

- id: back
  label: Back
  kind: action
  params:
    - name: pages
      type: integer
      description: Number of pages to go back

- id: set_stars
  label: SetStars
  kind: action
  params:
    - name: rating
      type: integer
      description: Stars rating -1 to 5
```

## Feedbacks
```yaml
# Playback state
- id: play_state
  label: PlayState
  type: enum
  values: [Playing, Paused, Stopped]

- id: media_control
  label: MediaControl
  type: enum
  values: [Play, Pause, Stop]

# Track info
- id: track_time
  label: TrackTime
  type: integer
  description: Current track position in seconds

- id: track_duration
  label: TrackDuration
  type: integer
  description: Total track length in seconds (0 for live streams)

# Metadata
- id: meta_data_1
  label: MetaData1
  type: string
  description: Radio station name or track count

- id: meta_data_2
  label: MetaData2
  type: string
  description: Artist name

- id: meta_data_3
  label: MetaData3
  type: string
  description: Album name

- id: meta_data_4
  label: MetaData4
  type: string
  description: Track name

- id: meta_label_1
  label: MetaLabel1
  type: string

- id: meta_label_2
  label: MetaLabel2
  type: string

- id: meta_label_3
  label: MetaLabel3
  type: string

- id: meta_label_4
  label: MetaLabel4
  type: string

# Album art
- id: now_playing_guid
  label: NowPlayingGuid
  type: string

- id: media_art_changed
  label: MediaArtChanged
  type: boolean
  description: Art has changed for current item

- id: base_web_url
  label: BaseWebUrl
  type: string
  description: Protocol, address, port for art retrieval

# Flags
- id: back
  label: Back
  type: boolean
  description: Navigation stack has items

- id: browse_now_playing_available
  label: BrowseNowPlayingAvailable
  type: boolean

- id: context_menu
  label: ContextMenu
  type: boolean

- id: mute
  label: Mute
  type: boolean

- id: play_pause_available
  label: PlayPauseAvailable
  type: boolean

- id: repeat_available
  label: RepeatAvailable
  type: boolean

- id: repeat
  label: Repeat
  type: boolean

- id: seek_available
  label: SeekAvailable
  type: boolean

- id: shuffle_available
  label: ShuffleAvailable
  type: boolean

- id: shuffle
  label: Shuffle
  type: boolean

- id: skip_next_available
  label: SkipNextAvailable
  type: boolean

- id: skip_prev_available
  label: SkipPrevAvailable
  type: boolean

# Multistate flags
- id: thumbs_up
  label: ThumbsUp
  type: enum
  values: [-1, 0, 1]
  description: "-1=disabled, 0=enabled not set, 1=enabled and set"

- id: thumbs_down
  label: ThumbsDown
  type: enum
  values: [-1, 0, 1]

- id: stars
  label: Stars
  type: enum
  values: [-1, 0, 1, 2, 3, 4, 5]

# Preset/scene/playlist events
- id: favorites_changed
  label: FavoritesChanged
  type: boolean

- id: favorites_count
  label: FavoritesCount
  type: integer

- id: scenes_changed
  label: ScenesChanged
  type: boolean

- id: scenes_count
  label: ScenesCount
  type: integer

- id: playlists_changed
  label: PlaylistsChanged
  type: boolean

- id: playlist_count
  label: PlaylistCount
  type: integer

# Trigger events
- id: trigger_in_1
  label: TriggerIn1
  type: boolean
- id: trigger_in_x
  label: TriggerIn<x>
  type: boolean
  description: Dynamic - TriggerIn1 through TriggerIn<x>

# Queue options
- id: local_queue_options
  label: LocalQueueOptions
  type: string
  description: Available queue modification options

# State events
- id: state_changed
  label: StateChanged
  type: string
  description: Generic state change event - Source Event=Value format

- id: report_state
  label: ReportState
  type: string
  description: Generic state report event - Source Event=Value format
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside of actions documented
```

## Events
```yaml
# Events are pushed from server to client during SubscribeEvents session.
# See Feedbacks section for full event list.
# Server pushes: StateChanged, ReportState with event name and value pairs.
# UNRESOLVED: complete event taxonomy not enumerated in source
```

## Macros
```yaml
# Initialization sequence (connection preamble)
- id: connect_sequence
  label: Connect Sequence
  description: Standard initialization for new connection
  steps:
    - SetClientType DemoClient
    - SetClientVersion 1.0.0.0
    - SetHost <client_ip>
    - SetXmlMode Lists
    - SetEncoding 65001
    - SetInstance Player_A
    - SubscribeEvents
    - GetStatus
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
TCP socket or telnet connection on port 5004. HTTP JSON API on port 80 at `/api/`. Commands terminated with carriage return and line feed (`\r\n`). HTTP API requires `clientId` query parameter for routing. Events pushed server-to-client during subscribed session. Album art retrieved via `BaseWebUrl` + `/getart` endpoint with query parameters. Output triggers: 12VDC 100mA max. Input triggers: 5-24V AC or DC.
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/current/power specs not stated -->
<!-- UNRESOLVED: error codes and fault behavior not documented -->

## Provenance

```yaml
source_domains:
  - autonomic.atlassian.net
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
retrieved_at: 2026-05-04T18:04:32.414Z
last_checked_at: 2026-05-20T04:53:06.258Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T04:53:06.258Z
matched_actions: 60
action_count: 60
confidence: high
summary: "All 60 spec actions matched to source commands; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
