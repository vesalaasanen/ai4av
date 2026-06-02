---
spec_id: admin/autonomic-controls-inc-m5-pro
schema_version: ai4av-public-spec-v1
revision: 1
title: "Autonomic Controls, Inc M5 Pro Control Spec"
manufacturer: "Autonomic Controls"
model_family: "M5 Pro"
aliases: []
compatible_with:
  manufacturers:
    - "Autonomic Controls"
    - "Autonomic Controls, Inc"
  models:
    - "M5 Pro"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - autonomic.atlassian.net
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1596620801/Control+Protocols
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1694990337/Control+System+Integration+Features
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1696792577/Crestron
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1696137217/Control4
retrieved_at: 2026-05-19T21:41:08.007Z
last_checked_at: 2026-06-02T17:21:32.302Z
generated_at: 2026-06-02T17:21:32.302Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power on/off commands not found in source"
  - "Shuffle, Repeat, Mute commands referenced by flag events but no literal payload shown in source beyond command name"
  - "no software safety warnings or interlock procedures in source"
  - "Shuffle, Repeat, Mute command syntax — referenced as valid commands by their flag events but no standalone payload shown in source beyond the command name"
  - "firmware version compatibility not stated in source"
  - "total trigger count not specified in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:32.302Z
  matched_actions: 71
  action_count: 71
  confidence: medium
  summary: "All 71 spec actions have literal counterparts in the source and transport parameters are confirmed verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Autonomic Controls, Inc M5 Pro Control Spec

## Summary
Media server (MMS) supporting TCP socket/telnet control on port 5004 and an HTTP JSON API at `http://ipOrNameOfServer/api/`. Commands terminated with CRLF. Controls playback, browsing of local and online media libraries, presets, scenes, playlists, triggers, and service account selection. No authentication required.

<!-- UNRESOLVED: power on/off commands not found in source -->
<!-- UNRESOLVED: Shuffle, Repeat, Mute commands referenced by flag events but no literal payload shown in source beyond command name -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 5004          # TCP socket/telnet port stated in source
  base_url: "http://ipOrNameOfServer/api/"  # HTTP JSON API base URL stated in source
auth:
  type: none          # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable    # inferred from GetStatus, Browse commands, event subscription
- levelable    # inferred from SetVolume command (0-50 range stated)
```

## Actions
```yaml
# --- Connection preamble ---

- id: SetClientType
  label: Set Client Type
  kind: action
  command: "SetClientType {clientName}"
  params:
    - name: clientName
      type: string
      description: Client identifier string (e.g. DemoClient)

- id: SetClientVersion
  label: Set Client Version
  kind: action
  command: "SetClientVersion {version}"
  params:
    - name: version
      type: string
      description: Version in MAJOR.MINOR.BUILD.REVISION format (e.g. 1.0.0.0)

- id: SetHost
  label: Set Host Address
  kind: action
  command: "SetHost {address}"
  params:
    - name: address
      type: string
      description: Client IP address used to connect to MMS (e.g. 192.168.0.100)

- id: SetXmlMode
  label: Set XML Mode
  kind: action
  command: "SetXmlMode {mode}"
  params:
    - name: mode
      type: string
      enum: [None, Lists]

- id: SetEncoding
  label: Set Encoding
  kind: action
  command: "SetEncoding {encoding}"
  params:
    - name: encoding
      type: integer
      description: Encoding code (65001 = UTF-8)

- id: SetInstance
  label: Set Instance
  kind: action
  command: "SetInstance {instanceName}"
  params:
    - name: instanceName
      type: string
      description: Target instance name (e.g. Player_A)

- id: SubscribeEvents
  label: Subscribe to Events
  kind: action
  command: "SubscribeEvents {filter}"
  params:
    - name: filter
      type: string
      description: "Optional: boolean true/false or comma-delimited event list; omit for all events"

- id: GetStatus
  label: Get Status
  kind: query
  command: "GetStatus"
  params: []

- id: SetOption
  label: Set Option
  kind: action
  command: "SetOption {option}={value}"
  params:
    - name: option
      type: string
      description: "Option name (e.g. supports_playnow, supports_inputbox, supports_urls)"
    - name: value
      type: string
      description: "Option value (e.g. true)"

# --- Playback control ---

- id: Play
  label: Play
  kind: action
  command: "Play"
  params: []

- id: Pause
  label: Pause
  kind: action
  command: "Pause"
  params: []

- id: PlayPause
  label: Play/Pause Toggle
  kind: action
  command: "PlayPause"
  params: []

- id: Seek
  label: Seek
  kind: action
  command: "Seek {position}"
  params:
    - name: position
      type: integer
      description: "Seconds from start (0 to TrackDuration) or from end (negative: -1 to -1*TrackDuration)"

- id: SkipNext
  label: Skip Next
  kind: action
  command: "SkipNext"
  params: []

- id: SkipPrevious
  label: Skip Previous
  kind: action
  command: "SkipPrevious"
  params: []

- id: ThumbsUp
  label: Thumbs Up Toggle
  kind: action
  command: "ThumbsUp"
  params: []

- id: ThumbsDown
  label: Thumbs Down Toggle
  kind: action
  command: "ThumbsDown"
  params: []

- id: SetVolume
  label: Set Volume
  kind: action
  command: "SetVolume {volume}"
  params:
    - name: volume
      type: integer
      description: Volume level 0-50; output must be in variable gain mode

- id: SetStars
  label: Set Stars Rating
  kind: action
  command: "SetStars {rating}"
  params:
    - name: rating
      type: integer
      description: "-1 (disabled) or 0-5"

# --- Navigation ---

- id: Back
  label: Navigate Back
  kind: action
  command: "Back {pages}"
  params:
    - name: pages
      type: integer
      description: Number of pages to go back; navigation stack begins with 0 (current page)

- id: AckButtonContext
  label: Acknowledge Context Button (TuneBridge)
  kind: action
  command: "AckButton CONTEXT"
  params: []

# --- Browse commands ---

- id: BrowseArtists
  label: Browse Artists
  kind: query
  command: "BrowseArtists {start} {count}"
  params:
    - name: start
      type: integer
      description: 1-based start index
    - name: count
      type: integer
      description: Max items to return

- id: BrowseAlbums
  label: Browse Albums
  kind: query
  command: "BrowseAlbums {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseComposers
  label: Browse Composers
  kind: query
  command: "BrowseComposers {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseGenres
  label: Browse Genres
  kind: query
  command: "BrowseGenres {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseTitles
  label: Browse Titles
  kind: query
  command: "BrowseTitles {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseFavorites
  label: Browse Favorites/Presets
  kind: query
  command: "BrowseFavorites {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowsePresets
  label: Browse Presets (alias for BrowseFavorites)
  kind: query
  command: "BrowsePresets {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowsePlaylists
  label: Browse Playlists
  kind: query
  command: "BrowsePlaylists {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseNowPlaying
  label: Browse Now Playing Queue
  kind: query
  command: "BrowseNowPlaying {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseRadioSources
  label: Browse Radio Sources
  kind: query
  command: "BrowseRadioSources {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowsePicklist
  label: Browse Picklist
  kind: query
  command: "BrowsePicklist {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseTopMenu
  label: Browse Top Menu
  kind: query
  command: "BrowseTopMenu"
  params: []

- id: BrowseTopMenuChild
  label: Browse Top Menu Child Node
  kind: query
  command: "BrowseTopMenu itemGuid={itemGuid}"
  params:
    - name: itemGuid
      type: string
      description: GUID of child node to use as root

- id: BrowseServiceAccounts
  label: Browse Service Accounts
  kind: query
  command: "BrowseServiceAccounts"
  params: []

- id: AckPickItem
  label: Acknowledge Pick Item
  kind: action
  command: "AckPickItem {guid}"
  params:
    - name: guid
      type: string
      description: GUID of the picklist item to select

# --- Service account selection ---

- id: SetServiceAccount
  label: Set Service Account
  kind: action
  command: "SetServiceAccount {serviceGuid} {accountGuid}"
  params:
    - name: serviceGuid
      type: string
      description: GUID of the streaming service (from BrowseRadioSources)
    - name: accountGuid
      type: string
      description: GUID of the account (from BrowseServiceAccounts)

- id: SetServiceAccountLatched
  label: Set Service Account (Latched Per Output)
  kind: action
  command: "SetServiceAccount {serviceGuid} {accountGuid} False"
  params:
    - name: serviceGuid
      type: string
    - name: accountGuid
      type: string

- id: SetServiceAccountClearService
  label: Clear Latched Service Account for a Service
  kind: action
  command: "SetServiceAccount {service} Clear False"
  params:
    - name: service
      type: string
      description: Name or GUID of the streaming service

- id: SetServiceAccountClearAll
  label: Clear All Latched Service Accounts
  kind: action
  command: "SetServiceAccount Clear Clear False"
  params: []

# --- Initiating playback ---

- id: PlayAlbum
  label: Play Album
  kind: action
  command: "PlayAlbum {albumGuid} {verb}"
  params:
    - name: albumGuid
      type: string
    - name: verb
      type: string
      description: "Optional: Next, Now, Replace, AddToQueue, AddToPlaylist"

- id: PlayArtist
  label: Play Artist
  kind: action
  command: "PlayArtist {artistGuid} {verb}"
  params:
    - name: artistGuid
      type: string
    - name: verb
      type: string
      description: "Optional: Next, Now, Replace, AddToQueue, AddToPlaylist"

- id: PlayComposer
  label: Play Composer
  kind: action
  command: "PlayComposer {composerGuid} {verb}"
  params:
    - name: composerGuid
      type: string
    - name: verb
      type: string
      description: "Optional: Next, Now, Replace, AddToQueue, AddToPlaylist"

- id: PlayGenre
  label: Play Genre
  kind: action
  command: "PlayGenre {genreGuid} {verb}"
  params:
    - name: genreGuid
      type: string
    - name: verb
      type: string
      description: "Optional: Next, Now, Replace, AddToQueue, AddToPlaylist"

- id: PlayPlaylist
  label: Play Playlist
  kind: action
  command: "PlayPlaylist {nameOrId} {verb}"
  params:
    - name: nameOrId
      type: string
      description: Name or GUID of the playlist
    - name: verb
      type: string
      description: "Optional: Next, Now, Replace, AddToQueue, AddToPlaylist"

- id: PlayPreset
  label: Play Preset
  kind: action
  command: "PlayPreset {nameOrId} {verb}"
  params:
    - name: nameOrId
      type: string
    - name: verb
      type: string
      description: "Optional: Next, Now, Replace, AddToQueue, AddToPlaylist"

- id: PlayScene
  label: Play Scene
  kind: action
  command: "PlayScene {nameOrId}"
  params:
    - name: nameOrId
      type: string

- id: PlayTitle
  label: Play Title
  kind: action
  command: "PlayTitle {titleGuid} {verb}"
  params:
    - name: titleGuid
      type: string
    - name: verb
      type: string
      description: "Optional: Next, Now, Replace, AddToQueue, AddToPlaylist"

- id: ClarifyTitleIntent
  label: Clarify Title Intent
  kind: action
  command: "ClarifyTitleIntent {guid} {verb}"
  params:
    - name: guid
      type: string
      description: GUID from listAction=ClarifyTitleIntent item
    - name: verb
      type: string
      description: "Optional: Next, Now, Replace, AddToQueue, AddToPlaylist"

# --- Presets ---

- id: StorePreset
  label: Store Preset (prompt for name)
  kind: action
  command: "StorePreset"
  params: []

- id: StorePresetNamed
  label: Store Named Preset
  kind: action
  command: "StorePreset \"{name}\""
  params:
    - name: name
      type: string
      description: Double-quoted preset name (e.g. "Party Time")

- id: RecallPreset
  label: Recall Preset
  kind: action
  command: "RecallPreset {nameOrId}"
  params:
    - name: nameOrId
      type: string
      description: Double-quoted preset name or unique ID GUID

- id: EditPreset
  label: Edit Preset
  kind: action
  command: "EditPreset {nameOrId}"
  params:
    - name: nameOrId
      type: string

- id: RenamePreset
  label: Rename Preset
  kind: action
  command: "RenamePreset {nameOrId} {newName}"
  params:
    - name: nameOrId
      type: string
    - name: newName
      type: string

- id: DeletePreset
  label: Delete Preset
  kind: action
  command: "DeletePreset {nameOrId}"
  params:
    - name: nameOrId
      type: string

# --- Scenes ---

- id: StoreScene
  label: Store Scene (prompt for name)
  kind: action
  command: "StoreScene"
  params: []

- id: StoreSceneNamed
  label: Store Named Scene
  kind: action
  command: "StoreScene \"{name}\""
  params:
    - name: name
      type: string
      description: Double-quoted scene name (e.g. "Party Time")

- id: RecallScene
  label: Recall Scene
  kind: action
  command: "RecallScene {nameOrId}"
  params:
    - name: nameOrId
      type: string
      description: Double-quoted scene name or unique ID GUID

- id: DeleteScene
  label: Delete Scene
  kind: action
  command: "DeleteScene {nameOrId}"
  params:
    - name: nameOrId
      type: string

# --- Playlists ---

- id: RenamePlaylist
  label: Rename Playlist
  kind: action
  command: "RenamePlaylist {oldName} {newName}"
  params:
    - name: oldName
      type: string
    - name: newName
      type: string

- id: DeletePlaylist
  label: Delete Playlist
  kind: action
  command: "DeletePlaylist {nameOrId}"
  params:
    - name: nameOrId
      type: string

- id: ReorderPlaylist
  label: Reorder Playlist Track
  kind: action
  command: "ReorderPlaylist {playlistId} {srceTrackId} {destTrackId}"
  params:
    - name: playlistId
      type: string
    - name: srceTrackId
      type: string
    - name: destTrackId
      type: string

# --- Now Playing queue ---

- id: JumpToNowPlayingItem
  label: Jump to Now Playing Item
  kind: action
  command: "JumpToNowPlayingitem {index}"
  params:
    - name: index
      type: integer
      description: 1-based index of item to jump to

- id: ReorderNowPlaying
  label: Reorder Now Playing
  kind: action
  command: "ReorderNowPlaying {indexToMove} {indexToMoveTo}"
  params:
    - name: indexToMove
      type: integer
      description: 1-based index of track to move
    - name: indexToMoveTo
      type: integer
      description: 1-based destination index

- id: RemoveNowPlayingItem
  label: Remove Now Playing Item
  kind: action
  command: "RemoveNowPlayingItem {index}"
  params:
    - name: index
      type: integer
      description: 1-based index of track to remove

- id: ClearNowPlaying
  label: Clear Now Playing (preserve stations)
  kind: action
  command: "ClearNowPlaying"
  params: []

- id: ClearNowPlayingStopStations
  label: Clear Now Playing (stop station content)
  kind: action
  command: "ClearNowPlaying False"
  params: []

# --- Triggers ---

- id: SetOutputTrigger
  label: Set Output Trigger
  kind: action
  command: "SetOutputTrigger {triggerIndex} {enabled}"
  params:
    - name: triggerIndex
      type: integer
      description: "1-based trigger index in trigger order (e.g. Trigger Out A = 1)"
    - name: enabled
      type: boolean
      description: "true to turn on, false to turn off"

# --- HTTP API filter helpers (seen in HTTP examples) ---

- id: SetMusicFilter
  label: Set Music Filter
  kind: action
  command: "SetMusicFilter {value}"
  params:
    - name: value
      type: string
      description: Filter value (e.g. Clear)

- id: SetRadioFilter
  label: Set Radio Filter
  kind: action
  command: "SetRadioFilter {value}"
  params:
    - name: value
      type: string
      description: Filter value (e.g. Clear)

# --- HTTP-only script command ---

- id: Script
  label: Execute Ordered Script (HTTP API only)
  kind: action
  command: "http://ipOrNameOfServer/api/Script/{urlEncodedCmd1}/{urlEncodedCmd2}/..."
  params:
    - name: commands
      type: string
      description: URL-encoded command chain; each sub-command URL-encoded as a path segment
```

## Feedbacks
```yaml
- id: PlayState
  type: enum
  values: [Playing, Paused, Stopped]

- id: MediaControl
  type: enum
  values: [Play, Pause, Stop]

- id: TrackTime
  type: integer
  description: Current track position in seconds (non-negative)

- id: TrackDuration
  type: integer
  description: Total track duration in seconds (0 for live streams with no time info)

- id: MetaData1
  type: string
  description: Generally reserved for radio station name or track count data

- id: MetaData2
  type: string
  description: Generally reserved for artist name

- id: MetaData3
  type: string
  description: Generally reserved for album name

- id: MetaData4
  type: string
  description: Generally reserved for track name

- id: MetaLabel1
  type: string
  description: Label for MetaData1

- id: MetaLabel2
  type: string
  description: Label for MetaData2

- id: MetaLabel3
  type: string
  description: Label for MetaData3

- id: MetaLabel4
  type: string
  description: Label for MetaData4

- id: NowPlayingGuid
  type: string
  description: "Unique ID of now playing item (e.g. {20dd901a-b092-3386-dc16-6b56f38a811e})"

- id: MediaArtChanged
  type: boolean
  description: "Art changed for current item (always true when sent); triggers art refresh"

- id: BaseWebUrl
  type: string
  description: "Protocol, address, and port for art retrieval (e.g. http://192.168.0.59:5005)"

- id: Back
  type: boolean
  description: "Navigation stack has items; if true, use Back <int> to jump back"

- id: BrowseNowPlayingAvailable
  type: boolean
  description: Queue has items available to browse

- id: ContextMenu
  type: boolean
  description: "AckButton CONTEXT is valid; TuneBridge button should be shown"

- id: Mute
  type: boolean
  description: Selected instance is muted

- id: PlayPauseAvailable
  type: boolean
  description: Play, Pause, and PlayPause commands are valid

- id: RepeatAvailable
  type: boolean
  description: Repeat command is valid; Repeat button should be shown

- id: Repeat
  type: boolean
  description: Repeat is enabled

- id: SeekAvailable
  type: boolean
  description: Seek command is valid; scrubbing thumb should be shown

- id: ShuffleAvailable
  type: boolean
  description: Shuffle command is valid; Shuffle button should be shown

- id: Shuffle
  type: boolean
  description: Shuffle is enabled

- id: SkipNextAvailable
  type: boolean
  description: SkipNext command is valid; Skip Next button should be shown

- id: SkipPrevAvailable
  type: boolean
  description: SkipPrevious command is valid; Skip Previous button should be shown

- id: ThumbsUp
  type: enum
  values: [-1, 0, 1]
  description: "-1=disabled/unavailable, 0=enabled not set, 1=enabled and set"

- id: ThumbsDown
  type: enum
  values: [-1, 0, 1]
  description: "-1=disabled/unavailable, 0=enabled not set, 1=enabled and set"

- id: Stars
  type: integer
  description: "-1=disabled; 0-5=enabled with star count shown; governs SetStars availability"

- id: FavoritesChanged
  type: boolean
  description: "A preset changed (always true when sent); rebrowse presets"

- id: FavoritesCount
  type: integer
  description: "Number of presets; sent only when count changes (add/delete)"

- id: ScenesChanged
  type: boolean
  description: "A scene changed (always true when sent); rebrowse scenes"

- id: ScenesCount
  type: integer
  description: Number of scenes; sent only when count changes

- id: PlaylistsChanged
  type: boolean
  description: "A playlist changed (always true when sent); rebrowse playlists"

- id: PlaylistCount
  type: integer
  description: "Number of playlists; sent only when count changes (add/delete)"

- id: LocalQueueOptions
  type: array
  description: Available queue modification options communicated to the client

- id: TriggerIn1
  type: boolean
  description: Input trigger 1 state; true when voltage applied to input pin

# TriggerIn2 through TriggerIn<x> follow the same pattern per source ("TriggerIn1 through TriggerIn<x>")
```

## Events
```yaml
# Server pushes events to connected TCP client.
# Format: EventReason Source Event=Value
# Examples:
#   StateChanged Player_A TrackTime=121
#   ReportState Player_A MetaData2=Stevie Ray Vaughan
#
# EventReason values: StateChanged, ReportState
# Source: instance name (e.g. Player_A)
# Events are the same names as Feedbacks above.
# Subscription via SubscribeEvents; GetStatus triggers immediate push of all current state.
```

## Macros
```yaml
# Initialization sequence from source:
# 1. SetClientType DemoClient
# 2. SetClientVersion 1.0.0.0
# 3. SetHost 192.168.0.100
# 4. SetXmlMode Lists
# 5. SetEncoding 65001
# 6. SetInstance Player_A
# 7. SubscribeEvents
# 8. GetStatus
#
# Optional options (SetOption during preamble):
#   SetOption supports_playnow=true    (advanced queue modification)
#   SetOption supports_inputbox=true   (Input and Message Box UI events)
#   SetOption supports_urls=true       (Page type Navigate URL events)
#
# Album art URL construction:
#   {BaseWebUrl}/getart?guid={NowPlayingGuid}&instance={instance}&fmt=jpg
#   Port may be omitted; requests on port 80 are processed the same as port 5005.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: Input triggers accept 5-24V AC/DC; Output triggers supply 12VDC 100mA max.
# These are hardware specifications, not protocol safety requirements.
# UNRESOLVED: no software safety warnings or interlock procedures in source
```

## Notes
TCP socket commands terminated with CRLF (`\r\n`). HTTP JSON API endpoint: `http://ipOrNameOfServer/api/` — send commands as `GET` requests with spaces replaced by `/` (e.g. `GET /api/SubscribeEvents/True`). Include `clientId=<UUID>` query string on all HTTP requests to prevent inter-client cross talk. HTTP commands are not guaranteed to be processed in order (different sockets); use the `Script` command to force ordered execution. Browse indexes are 1-based. `BrowseTopMenu` can take `itemGuid=<guid>` to navigate to a child node. Picklist items without a `listAction` are selected with `AckPickItem <guid>`. `AckButton CONTEXT` is available when the `ContextMenu` event is `true`. `JumpToNowPlayingitem` uses a lowercase `i` in `item` as shown in source. `SetVolume` requires the output to be in variable gain mode (configured on device System tab). Presets were formerly called Snapshots. Trigger indexing is order-based independent of label (Trigger Out A = index 1).
<!-- UNRESOLVED: Shuffle, Repeat, Mute command syntax — referenced as valid commands by their flag events but no standalone payload shown in source beyond the command name -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: total trigger count not specified in source -->

## Provenance

```yaml
source_domains:
  - autonomic.atlassian.net
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1596620801/Control+Protocols
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1694990337/Control+System+Integration+Features
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1696792577/Crestron
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1696137217/Control4
retrieved_at: 2026-05-19T21:41:08.007Z
last_checked_at: 2026-06-02T17:21:32.302Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:32.302Z
matched_actions: 71
action_count: 71
confidence: medium
summary: "All 71 spec actions have literal counterparts in the source and transport parameters are confirmed verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power on/off commands not found in source"
- "Shuffle, Repeat, Mute commands referenced by flag events but no literal payload shown in source beyond command name"
- "no software safety warnings or interlock procedures in source"
- "Shuffle, Repeat, Mute command syntax — referenced as valid commands by their flag events but no standalone payload shown in source beyond the command name"
- "firmware version compatibility not stated in source"
- "total trigger count not specified in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
