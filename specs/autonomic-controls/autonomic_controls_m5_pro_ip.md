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
  - autonomic-controls.com
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - http://www.autonomic-controls.com/documents/mcs30/mcs_3.0_IP_Control_Protocol.pdf
retrieved_at: 2026-05-27T13:17:08.272Z
last_checked_at: 2026-05-20T04:52:54.520Z
generated_at: 2026-05-20T04:52:54.520Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T04:52:54.520Z
  matched_actions: 60
  action_count: 60
  confidence: high
  summary: "All 60 spec actions verified in source with correct semantics; TCP port 5004 and CRLF termination confirmed; no authentication required as stated; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Autonomic Controls, Inc M5 Pro Control Spec

## Summary
Media server device supporting TCP socket/telnet control on port 5004 and HTTP JSON API. Controls playback, browsing media libraries, presets, scenes, playlists, and triggers. Commands terminated with CRLF. No authentication required.

<!-- UNRESOLVED: power on/off commands not found in source -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 5004  # TCP socket/telnet port stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from GetStatus, Browse commands, event subscription
- levelable  # inferred from SetVolume command (0-50 range stated)
```

## Actions
```yaml
- id: SetClientType
  label: Set Client Type
  kind: action
  params:
    - name: clientName
      type: string
      description: Client identifier string

- id: SetClientVersion
  label: Set Client Version
  kind: action
  params:
    - name: version
      type: string
      description: Version in MAJOR.MINOR.BUILD.REVISION format

- id: SetHost
  label: Set Host Address
  kind: action
  params:
    - name: address
      type: string
      description: Client IP address for cover art URL generation

- id: SetXmlMode
  label: Set XML Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [None, Lists]

- id: SetEncoding
  label: Set Encoding
  kind: action
  params:
    - name: encoding
      type: integer
      description: Encoding code (65001 = UTF-8)

- id: SetInstance
  label: Set Instance
  kind: action
  params:
    - name: instanceName
      type: string
      description: Target instance name (e.g. Player_A)

- id: SubscribeEvents
  label: Subscribe to Events
  kind: action
  params:
    - name: filter
      type: string
      description: "Optional: boolean or comma-delimited event list"

- id: GetStatus
  label: Get Status
  kind: action
  params: []

- id: SetOption
  label: Set Option
  kind: action
  params:
    - name: option
      type: string
    - name: value
      type: string

- id: Play
  label: Play
  kind: action
  params: []

- id: Pause
  label: Pause
  kind: action
  params: []

- id: PlayPause
  label: Play/Pause Toggle
  kind: action
  params: []

- id: Seek
  label: Seek
  kind: action
  params:
    - name: position
      type: integer
      description: "Seconds from start (non-negative) or end (negative)"

- id: SkipNext
  label: Skip Next
  kind: action
  params: []

- id: SkipPrevious
  label: Skip Previous
  kind: action
  params: []

- id: ThumbsUp
  label: Thumbs Up
  kind: action
  params: []

- id: ThumbsDown
  label: Thumbs Down
  kind: action
  params: []

- id: SetVolume
  label: Set Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 0-50

- id: BrowseArtists
  label: Browse Artists
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseAlbums
  label: Browse Albums
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseComposers
  label: Browse Composers
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseGenres
  label: Browse Genres
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseTitles
  label: Browse Titles
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseFavorites
  label: Browse Favorites/Presets
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowsePlaylists
  label: Browse Playlists
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseNowPlaying
  label: Browse Now Playing Queue
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseRadioSources
  label: Browse Radio Sources
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowsePicklist
  label: Browse Picklist
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: BrowseTopMenu
  label: Browse Top Menu
  kind: action
  params:
    - name: itemGuid
      type: string
      description: "Optional: navigate to child item"

- id: BrowseServiceAccounts
  label: Browse Service Accounts
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: AckPickItem
  label: Acknowledge Pick Item
  kind: action
  params:
    - name: guid
      type: string

- id: SetServiceAccount
  label: Set Service Account
  kind: action
  params:
    - name: serviceGuid
      type: string
    - name: accountGuid
      type: string
    - name: latch
      type: boolean
      description: "Optional: False to latch per output"

- id: PlayAlbum
  label: Play Album
  kind: action
  params:
    - name: albumGuid
      type: string
    - name: verb
      type: string
      description: "Optional: Next, Now, Replace, AddToQueue, AddToPlaylist"

- id: PlayArtist
  label: Play Artist
  kind: action
  params:
    - name: artistGuid
      type: string
    - name: verb
      type: string

- id: PlayComposer
  label: Play Composer
  kind: action
  params:
    - name: composerGuid
      type: string
    - name: verb
      type: string

- id: PlayGenre
  label: Play Genre
  kind: action
  params:
    - name: genreGuid
      type: string
    - name: verb
      type: string

- id: PlayPlaylist
  label: Play Playlist
  kind: action
  params:
    - name: nameOrId
      type: string
    - name: verb
      type: string

- id: PlayPreset
  label: Play Preset
  kind: action
  params:
    - name: nameOrId
      type: string
    - name: verb
      type: string

- id: PlayScene
  label: Play Scene
  kind: action
  params:
    - name: nameOrId
      type: string

- id: PlayTitle
  label: Play Title
  kind: action
  params:
    - name: titleGuid
      type: string
    - name: verb
      type: string

- id: ClarifyTitleIntent
  label: Clarify Title Intent
  kind: action
  params:
    - name: guid
      type: string
    - name: verb
      type: string

- id: StorePreset
  label: Store Preset
  kind: action
  params:
    - name: name
      type: string
      description: "Optional: double-quoted preset name"

- id: RecallPreset
  label: Recall Preset
  kind: action
  params:
    - name: nameOrId
      type: string

- id: EditPreset
  label: Edit Preset
  kind: action
  params:
    - name: nameOrId
      type: string

- id: RenamePreset
  label: Rename Preset
  kind: action
  params:
    - name: nameOrId
      type: string
    - name: newName
      type: string

- id: DeletePreset
  label: Delete Preset
  kind: action
  params:
    - name: nameOrId
      type: string

- id: StoreScene
  label: Store Scene
  kind: action
  params:
    - name: name
      type: string
      description: "Optional: double-quoted scene name"

- id: RecallScene
  label: Recall Scene
  kind: action
  params:
    - name: nameOrId
      type: string

- id: DeleteScene
  label: Delete Scene
  kind: action
  params:
    - name: nameOrId
      type: string

- id: RenamePlaylist
  label: Rename Playlist
  kind: action
  params:
    - name: oldName
      type: string
    - name: newName
      type: string

- id: DeletePlaylist
  label: Delete Playlist
  kind: action
  params:
    - name: nameOrId
      type: string

- id: ReorderPlaylist
  label: Reorder Playlist
  kind: action
  params:
    - name: playlistId
      type: string
    - name: srceTrackId
      type: string
    - name: destTrackId
      type: string

- id: JumpToNowPlayingItem
  label: Jump to Now Playing Item
  kind: action
  params:
    - name: index
      type: integer
      description: 1-based index

- id: ReorderNowPlaying
  label: Reorder Now Playing
  kind: action
  params:
    - name: indexToMove
      type: integer
    - name: indexToMoveTo
      type: integer

- id: RemoveNowPlayingItem
  label: Remove Now Playing Item
  kind: action
  params:
    - name: index
      type: integer

- id: ClearNowPlaying
  label: Clear Now Playing
  kind: action
  params:
    - name: stopStations
      type: boolean
      description: "Optional: False to stop station-based content"

- id: SetOutputTrigger
  label: Set Output Trigger
  kind: action
  params:
    - name: triggerIndex
      type: integer
      description: "1-based trigger index"
    - name: enabled
      type: boolean

- id: SetStars
  label: Set Stars Rating
  kind: action
  params:
    - name: rating
      type: integer
      description: "-1 to 5"

- id: Back
  label: Navigate Back
  kind: action
  params:
    - name: pages
      type: integer
      description: Number of pages to go back

# HTTP API-only command
- id: Script
  label: Execute Script
  kind: action
  params:
    - name: commands
      type: string
      description: URL-encoded command chain for ordered execution
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
  description: Current track position in seconds

- id: TrackDuration
  type: integer
  description: Total track duration in seconds (0 for live streams)

- id: MetaData1
  type: string
  description: Radio station name or track count data

- id: MetaData2
  type: string
  description: Artist name

- id: MetaData3
  type: string
  description: Album name

- id: MetaData4
  type: string
  description: Track name

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
  description: Unique ID of now playing item

- id: MediaArtChanged
  type: boolean
  description: Art has changed and should be refreshed

- id: BaseWebUrl
  type: string
  description: Base URL for album art retrieval

- id: Back
  type: boolean
  description: Navigation stack has items

- id: BrowseNowPlayingAvailable
  type: boolean
  description: Queue is available to browse

- id: ContextMenu
  type: boolean
  description: Context menu command is available

- id: Mute
  type: boolean
  description: Instance is muted

- id: PlayPauseAvailable
  type: boolean
  description: Play/Pause commands are available

- id: RepeatAvailable
  type: boolean
  description: Repeat command is available

- id: Repeat
  type: boolean
  description: Repeat is enabled

- id: SeekAvailable
  type: boolean
  description: Seek command is available

- id: ShuffleAvailable
  type: boolean
  description: Shuffle command is available

- id: Shuffle
  type: boolean
  description: Shuffle is enabled

- id: SkipNextAvailable
  type: boolean
  description: SkipNext command is available

- id: SkipPrevAvailable
  type: boolean
  description: SkipPrevious command is available

- id: ThumbsUp
  type: enum
  values: [-1, 0, 1]
  description: "-1=disabled, 0=enabled not set, 1=enabled and set"

- id: ThumbsDown
  type: enum
  values: [-1, 0, 1]
  description: "-1=disabled, 0=enabled not set, 1=enabled and set"

- id: Stars
  type: integer
  description: "-1 to 5 rating (-1=disabled)"

- id: FavoritesChanged
  type: boolean
  description: Presets have changed

- id: FavoritesCount
  type: integer
  description: Number of presets

- id: ScenesChanged
  type: boolean
  description: Scenes have changed

- id: ScenesCount
  type: integer
  description: Number of scenes

- id: PlaylistsChanged
  type: boolean
  description: Playlists have changed

- id: PlaylistCount
  type: integer
  description: Number of playlists

- id: LocalQueueOptions
  type: array
  description: Available queue modification options

- id: TriggerIn1
  type: boolean
  description: Input trigger 1 state

- id: TriggerIn2
  type: boolean
  description: Input trigger 2 state
  # UNRESOLVED: trigger count not stated in source

- id: StateChanged
  type: string
  description: Generic state change event (EventReason Source Event=Value)

- id: ReportState
  type: string
  description: Generic state report event
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found in source
# Volume is controlled via SetVolume action, not a variable
```

## Events
```yaml
# Server pushes events to connected client via TCP socket
# Event format: EventReason Source Event=Value
# Events are subscription-based via SubscribeEvents command

# Playback events
- id: PlayState
  type: enum
  values: [Playing, Paused, Stopped]

- id: MediaControl
  type: enum
  values: [Play, Pause, Stop]

# Metadata events
- id: MetaLabel1
- id: MetaData1
- id: MetaLabel2
- id: MetaData2
- id: MetaLabel3
- id: MetaData3
- id: MetaLabel4
- id: MetaData4

# Album art events
- id: NowPlayingGuid
- id: MediaArtChanged
- id: BaseWebUrl

# Track time events
- id: TrackTime
- id: TrackDuration

# Flag events (boolean)
- id: Back
- id: BrowseNowPlayingAvailable
- id: ContextMenu
- id: Mute
- id: PlayPauseAvailable
- id: RepeatAvailable
- id: Repeat
- id: SeekAvailable
- id: ShuffleAvailable
- id: Shuffle
- id: SkipNextAvailable
- id: SkipPrevAvailable

# Multistate flag events
- id: ThumbsUp
- id: ThumbsDown
- id: Stars

# Preset/scene/playlist change events
- id: FavoritesChanged
- id: FavoritesCount
- id: ScenesChanged
- id: ScenesCount
- id: PlaylistsChanged
- id: PlaylistCount

# Trigger events
- id: TriggerIn1
- id: TriggerIn2
  # UNRESOLVED: additional trigger events not specified in source

# HTTP API events
- id: events
  type: array
  description: "HTTP API: array of {name, value} event objects"
```

## Macros
```yaml
# Initialization sequence from source:
# 1. SetClientType DemoClient
# 2. SetClientVersion 1.0.0.0
# 3. SetHost <client-ip>
# 4. SetXmlMode Lists
# 5. SetEncoding 65001
# 6. SetInstance Player_A
# 7. SubscribeEvents
# 8. GetStatus

# Recommended options for advanced clients:
# SetOption supports_playnow=true
# SetOption supports_inputbox=true
# SetOption supports_urls=true

# Album art URL construction:
# {BaseWebUrl}/getart?guid={NowPlayingGuid}&instance={instance}&fmt=jpg
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
# Note: Trigger I/O specs (5-24V AC/DC input, 12VDC 100mA output max)
# are hardware specifications, not safety protocol procedures
```

## Notes
TCP socket commands terminated with CRLF (`\r\n`). HTTP JSON API endpoint: `http://ipOrNameOfServer/api/` with `clientId` query param required to prevent inter-client cross talk. HTTP commands not guaranteed ordered; use `Script` command for atomic sequences. Browse indexes are 1-based. Now Playing queue supports reorder, remove, and clear operations. Presets formerly called Snapshots. Triggers: Input triggers activated by 5-24V AC/DC; Output triggers supply 12VDC 100mA max.
<!-- UNRESOLVED: firmware compatibility not stated -->
<!-- UNRESOLVED: maximum trigger count not specified -->
<!-- UNRESOLVED: SetVolume requires variable gain mode configured on device config page — not a protocol-level requirement -->

## Provenance

```yaml
source_domains:
  - autonomic.atlassian.net
  - autonomic-controls.com
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - http://www.autonomic-controls.com/documents/mcs30/mcs_3.0_IP_Control_Protocol.pdf
retrieved_at: 2026-05-27T13:17:08.272Z
last_checked_at: 2026-05-20T04:52:54.520Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T04:52:54.520Z
matched_actions: 60
action_count: 60
confidence: high
summary: "All 60 spec actions verified in source with correct semantics; TCP port 5004 and CRLF termination confirmed; no authentication required as stated; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
