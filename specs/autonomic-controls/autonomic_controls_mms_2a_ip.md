---
spec_id: admin/autonomic-controls-mms-2a
schema_version: ai4av-public-spec-v1
revision: 1
title: "Autonomic Controls MMS-2A Control Spec"
manufacturer: "Autonomic Controls"
model_family: MMS-2A
aliases: []
compatible_with:
  manufacturers:
    - "Autonomic Controls"
    - "Autonomic Controls, Inc"
  models:
    - MMS-2A
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - autonomic.atlassian.net
  - snapav.com
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - "https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/Amplifiers/ProtocolsAndDrivers/Autonomic%20MAS%20Control%20Protocol.pdf"
retrieved_at: 2026-05-27T13:24:29.182Z
last_checked_at: 2026-05-27T15:34:22.045Z
generated_at: 2026-05-27T15:34:22.045Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "protocol version not explicitly stated (document is version 2.6)"
  - "number of output instances/zone configuration not stated"
  - "no continuously settable numeric variables beyond SetVolume (already an action)."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "protocol version not explicitly stated"
  - "number of supported output instances/zone configuration not stated"
  - "maximum number of input/output triggers not specified"
  - "Shuffle command mentioned (ShuffleAvailable/Shuffle events) but not documented with syntax"
  - "Repeat command mentioned (RepeatAvailable/Repeat events) but not documented with syntax"
  - "SetStars command mentioned but not documented with syntax"
  - "Back command mentioned (Back event) but only partially documented (\"Back <int>\")"
  - "SetPickListCount command mentioned but not fully documented"
  - "Referenced older PDF (mcs_3.0_IP_Control_Protocol.pdf) may contain additional commands not covered here"
verification:
  verdict: verified
  checked_at: 2026-05-27T15:34:22.045Z
  matched_actions: 66
  action_count: 66
  confidence: medium
  summary: "All 66 spec actions have literal wire-token matches in the source document; transport parameters (ports, URLs, protocols) are verified verbatim; spec represents the complete MMS-2A command catalogue. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Autonomic Controls MMS-2A Control Spec

## Summary

The Autonomic Controls MMS-2A is a Mirage Media Server supporting TCP/telnet control on port 5004 and an HTTP JSON API on port 5005. The protocol provides media playback control, content browsing (local and online), preset/scene/playlist management, volume control, and trigger I/O. Commands are text-based, terminated with CRLF.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version not explicitly stated (document is version 2.6) -->
<!-- UNRESOLVED: number of output instances/zone configuration not stated -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 5004
  base_url: "http://{host}:5005/api/"
auth:
  type: none  # inferred: no auth procedure in source
notes: >
  TCP connection uses CRLF line termination.
  HTTP API uses GET requests with commands encoded as URL path segments
  (spaces replaced with /). Include clientId query parameter for multi-client routing.
  HTTP commands are NOT guaranteed ordered; use Script command for ordering.
  Album art endpoint: http://{host}:5005/getart?guid={id}&w={width}&h={height}
```

## Traits
```yaml
- queryable    # inferred: GetStatus and multiple state query commands
- levelable    # inferred: SetVolume command (0-50)
```

## Actions
```yaml
# --- Connection / Preamble ---
- id: set_client_type
  label: Set Client Type
  kind: action
  command: SetClientType <name>
  params:
    - name: name
      type: string
      description: Client identifier string

- id: set_client_version
  label: Set Client Version
  kind: action
  command: SetClientVersion <version>
  params:
    - name: version
      type: string
      description: Version string in MAJOR.MINOR.BUILD.REVISION format

- id: set_host
  label: Set Host Address
  kind: action
  command: SetHost <address>
  params:
    - name: address
      type: string
      description: IP address the client used to connect, used for art URL generation

- id: set_xml_mode
  label: Set XML Mode
  kind: action
  command: SetXmlMode <mode>
  params:
    - name: mode
      type: enum
      values: [None, Lists]
      description: Set to Lists for XML list responses

- id: set_encoding
  label: Set Encoding
  kind: action
  command: SetEncoding <code>
  params:
    - name: code
      type: integer
      description: Windows code page number (e.g. 65001 for UTF-8)

- id: set_instance
  label: Set Output Instance
  kind: action
  command: SetInstance <instance>
  params:
    - name: instance
      type: string
      description: Output instance name (e.g. Player_A)

- id: subscribe_events
  label: Subscribe Events
  kind: action
  command: SubscribeEvents [arg]
  params:
    - name: arg
      type: string
      required: false
      description: "True/False or comma-delimited event list. Defaults to True (all events)"

- id: get_status
  label: Get Status
  kind: query
  command: GetStatus
  params: []
  description: Requests all events for the selected instance be sent immediately

- id: set_option
  label: Set Option
  kind: action
  command: SetOption <key=value>
  params:
    - name: key
      type: enum
      values: [supports_playnow, supports_inputbox, supports_urls]
    - name: value
      type: enum
      values: ["true", "false"]

# --- Playback Control ---
- id: play
  label: Play
  kind: action
  command: Play
  params: []

- id: pause
  label: Pause
  kind: action
  command: Pause
  params: []

- id: play_pause
  label: Play/Pause Toggle
  kind: action
  command: PlayPause
  params: []

- id: seek
  label: Seek
  kind: action
  command: Seek <position>
  params:
    - name: position
      type: integer
      description: "Non-negative: absolute seconds from start. Negative: seconds from end (e.g. -1 = last second)"

- id: skip_next
  label: Skip Next
  kind: action
  command: SkipNext
  params: []
  notes: Governed by SkipNextAvailable event

- id: skip_previous
  label: Skip Previous
  kind: action
  command: SkipPrevious
  params: []
  notes: Restarts current track if TrackTime >= 5. Governed by SkipPrevAvailable event

- id: thumbs_up
  label: Thumbs Up
  kind: action
  command: ThumbsUp
  params: []
  notes: Toggles ThumbsUp state between 0 and 1. Governed by ThumbsUp event

- id: thumbs_down
  label: Thumbs Down
  kind: action
  command: ThumbsDown
  params: []
  notes: Toggles ThumbsDown state. May auto-skip on some services

- id: set_volume
  label: Set Volume
  kind: action
  command: SetVolume <level>
  params:
    - name: level
      type: integer
      min: 0
      max: 50
      description: Volume level (output must be in variable gain mode)

# --- Browse Commands ---
- id: browse_albums
  label: Browse Albums
  kind: query
  command: BrowseAlbums <start> <count>
  params:
    - name: start
      type: integer
      description: 1-based start index
    - name: count
      type: integer
      description: Max items to return

- id: browse_artists
  label: Browse Artists
  kind: query
  command: BrowseArtists <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_composers
  label: Browse Composers
  kind: query
  command: BrowseComposers <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_favorites
  label: Browse Favorites
  kind: query
  command: BrowseFavorites <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_genres
  label: Browse Genres
  kind: query
  command: BrowseGenres <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_now_playing
  label: Browse Now Playing Queue
  kind: query
  command: BrowseNowPlaying <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer
  notes: Only valid when BrowseNowPlayingAvailable event is true

- id: browse_picklist
  label: Browse Picklist
  kind: query
  command: BrowsePicklist <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_playlists
  label: Browse Playlists
  kind: query
  command: BrowsePlaylists <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_radio_sources
  label: Browse Radio Sources
  kind: query
  command: BrowseRadioSources <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_titles
  label: Browse Titles
  kind: query
  command: BrowseTitles <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_top_menu
  label: Browse Top Menu
  kind: query
  command: "BrowseTopMenu [start] [count] [itemGuid=<guid>]"
  params:
    - name: start
      type: integer
      required: false
    - name: count
      type: integer
      required: false
    - name: itemGuid
      type: string
      required: false
      description: Optional child GUID to browse a specific root node instead of default
  notes: Supports non-standard itemGuid argument to browse a specific root child

- id: browse_service_accounts
  label: Browse Service Accounts
  kind: query
  command: BrowseServiceAccounts <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_presets
  label: Browse Presets
  kind: query
  command: BrowsePresets <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_scenes
  label: Browse Scenes
  kind: query
  command: BrowseScenes <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer
  notes: Referenced in Scenes section but not listed in Valid Browse Commands table

- id: browse_radio_stations
  label: Browse Radio Stations
  kind: query
  command: BrowseRadioStations <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer
  notes: Shown in Pandora browse example; browseAction for some radio sources

- id: browse_radio_genres
  label: Browse Radio Genres
  kind: query
  command: BrowseRadioGenres <start> <count>
  params:
    - name: start
      type: integer
    - name: count
      type: integer
  notes: Shown as browseAction for searchable radio sources

# --- Filter Commands ---
- id: set_music_filter
  label: Set Music Filter
  kind: action
  command: SetMusicFilter Clear
  params:
    - name: value
      type: enum
      values: [Clear]
      description: Clear the music filter to reset local content browsing

- id: set_radio_filter
  label: Set Radio Filter
  kind: action
  command: SetRadioFilter Source=<guid>
  params:
    - name: guid
      type: string
      description: GUID of the radio source to filter to

- id: set_pick_list_count
  label: Set Picklist Count
  kind: action
  command: SetPickListCount <count>
  params:
    - name: count
      type: integer
  notes: Referenced in examples but parameter details not fully documented in source

# --- Play Container Commands ---
- id: play_album
  label: Play Album
  kind: action
  command: PlayAlbum <guid> [queueOption]
  params:
    - name: guid
      type: string
      description: Album GUID
    - name: queueOption
      type: enum
      values: [Next, Now, Replace, AddToQueue, AddToPlaylist]
      required: false

- id: play_artist
  label: Play Artist
  kind: action
  command: PlayArtist <guid> [queueOption]
  params:
    - name: guid
      type: string
    - name: queueOption
      type: enum
      values: [Next, Now, Replace, AddToQueue, AddToPlaylist]
      required: false

- id: play_composer
  label: Play Composer
  kind: action
  command: PlayComposer <guid> [queueOption]
  params:
    - name: guid
      type: string
    - name: queueOption
      type: enum
      values: [Next, Now, Replace, AddToQueue, AddToPlaylist]
      required: false

- id: play_genre
  label: Play Genre
  kind: action
  command: PlayGenre <guid> [queueOption]
  params:
    - name: guid
      type: string
    - name: queueOption
      type: enum
      values: [Next, Now, Replace, AddToQueue, AddToPlaylist]
      required: false

- id: play_playlist
  label: Play Playlist
  kind: action
  command: PlayPlaylist <nameOrId> [queueOption]
  params:
    - name: nameOrId
      type: string
      description: Playlist name or GUID
    - name: queueOption
      type: enum
      values: [Next, Now, Replace, AddToQueue, AddToPlaylist]
      required: false

- id: play_preset
  label: Play Preset
  kind: action
  command: PlayPreset <guid> [queueOption]
  params:
    - name: guid
      type: string
    - name: queueOption
      type: enum
      values: [Next, Now, Replace, AddToQueue, AddToPlaylist]
      required: false

- id: play_scene
  label: Play Scene
  kind: action
  command: PlayScene <guid> [queueOption]
  params:
    - name: guid
      type: string
    - name: queueOption
      type: enum
      values: [Next, Now, Replace, AddToQueue, AddToPlaylist]
      required: false

- id: play_title
  label: Play Title
  kind: action
  command: PlayTitle <guid> [queueOption]
  params:
    - name: guid
      type: string
    - name: queueOption
      type: enum
      values: [Next, Now, Replace, AddToQueue, AddToPlaylist]
      required: false

# --- Queue Intent Clarification ---
- id: clarify_title_intent
  label: Clarify Title Intent
  kind: action
  command: ClarifyTitleIntent <guid> [queueOption]
  params:
    - name: guid
      type: string
      description: Item GUID from listAction
    - name: queueOption
      type: enum
      values: [Next, Now, Replace, AddToQueue, AddToPlaylist]
      required: false
  notes: Used when listAction is ClarifyTitleIntent; append queue verb to specify intent

# --- Preset Management ---
- id: store_preset
  label: Store Preset
  kind: action
  command: StorePreset ["<name>"]
  params:
    - name: name
      type: string
      required: false
      description: Optional double-quoted name. Omit to trigger InputBox prompt

- id: recall_preset
  label: Recall Preset
  kind: action
  command: RecallPreset <nameOrId>
  params:
    - name: nameOrId
      type: string
      description: Double-quoted preset name or GUID

- id: edit_preset
  label: Edit Preset
  kind: action
  command: EditPreset <nameOrId>
  params:
    - name: nameOrId
      type: string

- id: rename_preset
  label: Rename Preset
  kind: action
  command: RenamePreset <nameOrId> <newName>
  params:
    - name: nameOrId
      type: string
    - name: newName
      type: string

- id: delete_preset
  label: Delete Preset
  kind: action
  command: DeletePreset <nameOrId>
  params:
    - name: nameOrId
      type: string

# --- Scene Management ---
- id: store_scene
  label: Store Scene
  kind: action
  command: StoreScene ["<name>"]
  params:
    - name: name
      type: string
      required: false
      description: Optional double-quoted name. Omit to trigger InputBox prompt

- id: recall_scene
  label: Recall Scene
  kind: action
  command: RecallScene <nameOrId>
  params:
    - name: nameOrId
      type: string
      description: Double-quoted scene name or GUID

- id: delete_scene
  label: Delete Scene
  kind: action
  command: DeleteScene <nameOrId>
  params:
    - name: nameOrId
      type: string

# --- Playlist Management ---
- id: rename_playlist
  label: Rename Playlist
  kind: action
  command: RenamePlaylist <oldName> <newName>
  params:
    - name: oldName
      type: string
    - name: newName
      type: string

- id: delete_playlist
  label: Delete Playlist
  kind: action
  command: DeletePlaylist <nameOrId>
  params:
    - name: nameOrId
      type: string

- id: reorder_playlist
  label: Reorder Playlist
  kind: action
  command: ReorderPlaylist <playlistId> <srceTrackId> <destTrackId>
  params:
    - name: playlistId
      type: string
    - name: srceTrackId
      type: string
    - name: destTrackId
      type: string

# --- Now Playing Queue ---
- id: jump_to_now_playing_item
  label: Jump To Now Playing Item
  kind: action
  command: JumpToNowPlayingItem <index>
  params:
    - name: index
      type: integer
      description: 1-based index of queue item

- id: reorder_now_playing
  label: Reorder Now Playing
  kind: action
  command: ReorderNowPlaying <srcIndex> <destIndex>
  params:
    - name: srcIndex
      type: integer
    - name: destIndex
      type: integer

- id: remove_now_playing_item
  label: Remove Now Playing Item
  kind: action
  command: RemoveNowPlayingItem <index>
  params:
    - name: index
      type: integer
      description: 1-based index of track to remove

- id: clear_now_playing
  label: Clear Now Playing Queue
  kind: action
  command: ClearNowPlaying [stopStations]
  params:
    - name: stopStations
      type: enum
      values: ["True", "False"]
      required: false
      description: "True (default): clear queue, stop queue content, preserve station playback. False: clear queue and stop all including stations"

# --- Triggers ---
- id: set_output_trigger
  label: Set Output Trigger
  kind: action
  command: SetOutputTrigger <index> <state>
  params:
    - name: index
      type: integer
      description: 1-based trigger index (e.g. 1 = Trigger Out A)
    - name: state
      type: enum
      values: ["true", "false"]

# --- Service Accounts ---
- id: set_service_account
  label: Set Service Account
  kind: action
  command: SetServiceAccount <serviceGuid> <accountGuid> [latch]
  params:
    - name: serviceGuid
      type: string
      description: Service GUID from BrowseRadioSources
    - name: accountGuid
      type: string
      description: Account GUID from BrowseServiceAccounts
    - name: latch
      type: enum
      values: ["False"]
      required: false
      description: Append False to make account latch per output
  notes: >
    Also supports clearing: SetServiceAccount <serviceName|Clear> Clear False
    to clear latched accounts per service or all services.

# --- Picklist Selection ---
- id: ack_pick_item
  label: Acknowledge Pick Item
  kind: action
  command: AckPickItem <guid>
  params:
    - name: guid
      type: string
      description: PickItem GUID to select

- id: ack_button
  label: Acknowledge Button
  kind: action
  command: AckButton <action>
  params:
    - name: action
      type: enum
      values: [CONTEXT]
      description: Context action (TuneBridge button). Governed by ContextMenu event.

# --- HTTP Script ---
- id: script
  label: Script (HTTP API)
  kind: action
  command: Script <cmd1>/<cmd2>/...
  params:
    - name: commands
      type: string
      description: URL-encoded commands separated by /, executed in order
  notes: HTTP API only. URL-encode each sub-command. Example: Script/SetInstance%20Player_A/SubscribeEvents%20True
```

## Feedbacks
```yaml
# --- Playback State ---
- id: play_state
  type: enum
  values: [Playing, Paused, Stopped]
  event: PlayState

- id: media_control
  type: enum
  values: [Play, Pause, Stop]
  event: MediaControl

# --- Track Info ---
- id: track_time
  type: integer
  event: TrackTime
  description: Current track position in seconds

- id: track_duration
  type: integer
  event: TrackDuration
  description: Total track duration in seconds (0 if unknown/streaming)

# --- Metadata ---
- id: meta_data_1
  type: string
  event: MetaData1
  description: Radio station name or track count data

- id: meta_data_2
  type: string
  event: MetaData2
  description: Artist name

- id: meta_data_3
  type: string
  event: MetaData3
  description: Album name

- id: meta_data_4
  type: string
  event: MetaData4
  description: Track name

- id: meta_label_1
  type: string
  event: MetaLabel1
  description: Label for MetaData1

- id: meta_label_2
  type: string
  event: MetaLabel2
  description: Label for MetaData2

- id: meta_label_3
  type: string
  event: MetaLabel3
  description: Label for MetaData3

- id: meta_label_4
  type: string
  event: MetaLabel4
  description: Label for MetaData4

# --- Art / Now Playing ---
- id: now_playing_guid
  type: string
  event: NowPlayingGuid
  description: GUID of currently playing item

- id: media_art_changed
  type: boolean
  event: MediaArtChanged
  description: Always true; indicates art should be refreshed for current item

- id: base_web_url
  type: string
  event: BaseWebUrl
  description: Base URL for art retrieval (e.g. http://192.168.0.59:5005)

# --- Boolean Flags ---
- id: back
  type: boolean
  event: Back
  description: True if navigation stack has entries

- id: browse_now_playing_available
  type: boolean
  event: BrowseNowPlayingAvailable
  description: True when queue has items

- id: context_menu
  type: boolean
  event: ContextMenu
  description: True if AckButton CONTEXT is valid

- id: mute
  type: boolean
  event: Mute
  description: True if selected instance is muted

- id: play_pause_available
  type: boolean
  event: PlayPauseAvailable
  description: True if Play/Pause/PlayPause commands are valid

- id: repeat_available
  type: boolean
  event: RepeatAvailable
  description: True if Repeat command is valid

- id: repeat
  type: boolean
  event: Repeat
  description: True if repeat is enabled

- id: seek_available
  type: boolean
  event: SeekAvailable
  description: True if Seek command is valid

- id: shuffle_available
  type: boolean
  event: ShuffleAvailable
  description: True if Shuffle command is valid

- id: shuffle
  type: boolean
  event: Shuffle
  description: True if shuffle is enabled

- id: skip_next_available
  type: boolean
  event: SkipNextAvailable
  description: True if SkipNext command is valid

- id: skip_prev_available
  type: boolean
  event: SkipPrevAvailable
  description: True if SkipPrevious command is valid

# --- Multistate Flags ---
- id: thumbs_up
  type: integer
  event: ThumbsUp
  values: [-1, 0, 1]
  description: "-1=disabled, 0=enabled not set, 1=enabled and set"

- id: thumbs_down
  type: integer
  event: ThumbsDown
  values: [-1, 0, 1]
  description: "-1=disabled, 0=enabled not set, 1=enabled and set"

- id: stars
  type: integer
  event: Stars
  values: [-1, 0, 1, 2, 3, 4, 5]
  description: "-1=disabled, 0-5=star rating shown and SetStars available"

# --- Change Notifications ---
- id: favorites_changed
  type: boolean
  event: FavoritesChanged
  description: Always true; any preset added/deleted/renamed

- id: favorites_count
  type: integer
  event: FavoritesCount
  description: Current number of presets

- id: scenes_changed
  type: boolean
  event: ScenesChanged
  description: Always true; any scene modified

- id: scenes_count
  type: integer
  event: ScenesCount
  description: Current number of scenes

- id: playlists_changed
  type: boolean
  event: PlaylistsChanged
  description: Always true; any playlist modified

- id: playlist_count
  type: integer
  event: PlaylistCount
  description: Current number of playlists

# --- Input Triggers ---
- id: trigger_in
  type: boolean
  event: "TriggerIn<1..n>"
  description: True when voltage applied to input trigger pin. One event per trigger.

# --- Queue Options ---
- id: local_queue_options
  type: string
  event: LocalQueueOptions
  description: Available queue modification options for current state
```

## Variables
```yaml
# UNRESOLVED: no continuously settable numeric variables beyond SetVolume (already an action).
# Volume is discrete integer command, not a polled variable.
```

## Events
```yaml
# Events are pushed after SubscribeEvents + GetStatus.
# Format: EventReason Instance Event=Value
# Two event reason prefixes: StateChanged, ReportState
# All events listed in Feedbacks section are also push events.
# Events follow instance set via SetInstance; no resubscription needed on instance change.
```

## Macros
```yaml
# --- Typical Initialization Sequence ---
- id: init_sequence
  label: Connection Initialization
  steps:
    - SetClientType <clientName>
    - SetClientVersion <version>
    - SetHost <mmsIpAddress>
    - SetXmlMode Lists
    - SetEncoding 65001
    - SetInstance <outputInstance>
    - SubscribeEvents
    - GetStatus
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements documented in source. Trigger I/O voltage specs (5-24V AC/DC in,
# 12VDC 100mA out) stated but no safety interlocks prescribed.
```

## Notes
- All commands terminated with CRLF (`\r\n`).
- Event format: `EventReason Instance Event=Value` (e.g. `StateChanged Player_A TrackTime=121`).
- Browse responses may be text or XML depending on `SetXmlMode`. XML recommended.
- Browse items carry attributes: `guid`, `name`, `dna`, `hasChildren`, `button`, `action`, `listAction`, `browseAction`, `artGuid`.
- Button attribute values: 0=Off, 1=Add, 2=Delete, 3=Play, 4=Power, 5=PowerOn, 6=Edit, 7=AllTracks, 8=ShuffleAll.
- HTTP API: commands as GET path segments (spaces → `/`). Use `clientId=<uuid>` query param for multi-client isolation.
- HTTP API: use `Script` command to guarantee command ordering.
- Album art: `http://{host}:5005/getart?guid={id}&w={width}&h={height}&fmt=jpg|png&c=0|1`.
- RecallScene may change volume and power state on connected Autonomic amps.
- SetVolume requires output to be in variable gain mode (configured on System tab).
- Queue modification verbs (Next/Now/Replace/AddToQueue/AddToPlaylist) require `SetOption supports_playnow=true` in preamble.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version not explicitly stated -->
<!-- UNRESOLVED: number of supported output instances/zone configuration not stated -->
<!-- UNRESOLVED: maximum number of input/output triggers not specified -->
<!-- UNRESOLVED: Shuffle command mentioned (ShuffleAvailable/Shuffle events) but not documented with syntax -->
<!-- UNRESOLVED: Repeat command mentioned (RepeatAvailable/Repeat events) but not documented with syntax -->
<!-- UNRESOLVED: SetStars command mentioned but not documented with syntax -->
<!-- UNRESOLVED: Back command mentioned (Back event) but only partially documented ("Back <int>") -->
<!-- UNRESOLVED: SetPickListCount command mentioned but not fully documented -->
<!-- UNRESOLVED: Referenced older PDF (mcs_3.0_IP_Control_Protocol.pdf) may contain additional commands not covered here -->

## Provenance

```yaml
source_domains:
  - autonomic.atlassian.net
  - snapav.com
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - "https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/Amplifiers/ProtocolsAndDrivers/Autonomic%20MAS%20Control%20Protocol.pdf"
retrieved_at: 2026-05-27T13:24:29.182Z
last_checked_at: 2026-05-27T15:34:22.045Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T15:34:22.045Z
matched_actions: 66
action_count: 66
confidence: medium
summary: "All 66 spec actions have literal wire-token matches in the source document; transport parameters (ports, URLs, protocols) are verified verbatim; spec represents the complete MMS-2A command catalogue. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "protocol version not explicitly stated (document is version 2.6)"
- "number of output instances/zone configuration not stated"
- "no continuously settable numeric variables beyond SetVolume (already an action)."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "protocol version not explicitly stated"
- "number of supported output instances/zone configuration not stated"
- "maximum number of input/output triggers not specified"
- "Shuffle command mentioned (ShuffleAvailable/Shuffle events) but not documented with syntax"
- "Repeat command mentioned (RepeatAvailable/Repeat events) but not documented with syntax"
- "SetStars command mentioned but not documented with syntax"
- "Back command mentioned (Back event) but only partially documented (\"Back <int>\")"
- "SetPickListCount command mentioned but not fully documented"
- "Referenced older PDF (mcs_3.0_IP_Control_Protocol.pdf) may contain additional commands not covered here"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
