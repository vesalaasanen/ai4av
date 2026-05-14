---
spec_id: admin/autonomic_controls-mcs_ex_series
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
last_checked_at: 2026-05-14T18:17:14.200Z
generated_at: 2026-05-14T18:17:14.200Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.200Z
  matched_actions: 56
  action_count: 57
  confidence: high
  summary: "All 56 spec actions matched verbatim in source; transport params verified; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Autonomic Controls MCS-EX Series Control Spec

## Summary
The MCS-EX Series is a media server providing multi-zone audio playback via streaming services and local content. Control is via TCP socket/telnet on port 5004 or HTTP JSON API. Commands terminated by carriage return + line feed. No authentication required.

<!-- UNRESOLVED: device power specifications not stated -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 5004
  base_url: http://ipOrNameOfServer/api/  # HTTP API root; port 5005 for album art
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: GetStatus and query commands present
- levelable  # inferred: SetVolume command present (0-50)
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
      description: Version string MAJOR.MINOR.BUILD.REVISION
- id: SetHost
  label: Set Host
  kind: action
  params:
    - name: ipAddress
      type: string
      description: IP address of client
- id: SetXmlMode
  label: Set XML Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "None or Lists"
- id: SetEncoding
  label: Set Encoding
  kind: action
  params:
    - name: encodingCode
      type: integer
      description: "65001 = UTF-8"
- id: SetInstance
  label: Set Instance
  kind: action
  params:
    - name: instanceName
      type: string
      description: Instance name (e.g., Player_A)
- id: SubscribeEvents
  label: Subscribe Events
  kind: action
  params:
    - name: subscribe
      type: boolean
      description: "True to subscribe to all events, or comma-separated list"
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
      description: "Option string (e.g., supports_playnow=true)"
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
    - name: offsetSeconds
      type: integer
      description: Non-negative = from start; negative = from end
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
      description: "Volume level 0-50"
- id: SetMusicFilter
  label: Set Music Filter
  kind: action
  params:
    - name: filter
      type: string
      description: "Filter name or Clear"
- id: SetRadioFilter
  label: Set Radio Filter
  kind: action
  params:
    - name: source
      type: string
      description: "Source=GUID or Clear"
- id: BrowseAlbums
  label: Browse Albums
  kind: action
  params:
    - name: start
      type: integer
      description: One-based start index
    - name: count
      type: integer
      description: Number of items to return
- id: BrowseArtists
  label: Browse Artists
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
- id: BrowseFavorites
  label: Browse Favorites
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
- id: BrowseNowPlaying
  label: Browse Now Playing
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
- id: BrowsePlaylists
  label: Browse Playlists
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
- id: BrowseTitles
  label: Browse Titles
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
    - name: start
      type: integer
    - name: count
      type: integer
- id: BrowseServiceAccounts
  label: Browse Service Accounts
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer
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
      description: "Optional False to latch per output"
- id: AckPickItem
  label: Acknowledge Pick Item
  kind: action
  params:
    - name: guid
      type: string
      description: Item GUID
- id: PlayAlbum
  label: Play Album
  kind: action
  params:
    - name: albumGuid
      type: string
    - name: verb
      type: string
      description: "Optional: Next, Now, Replace, AddToQueue, AddToPlaylist"
- id: PlayPlaylist
  label: Play Playlist
  kind: action
  params:
    - name: nameOrId
      type: string
    - name: verb
      type: string
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
- id: PlayTitle
  label: Play Title
  kind: action
  params:
    - name: titleGuid
      type: string
    - name: verb
      type: string
- id: StorePreset
  label: Store Preset
  kind: action
  params:
    - name: name
      type: string
      description: "Optional double-quoted name"
- id: RecallPreset
  label: Recall Preset
  kind: action
  params:
    - name: nameOrId
      type: string
      description: Preset name or GUID
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
      description: "Optional double-quoted name"
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
    - name: srcTrackId
      type: integer
    - name: destTrackId
      type: integer
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
    - name: indexTarget
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
      description: "False to stop station-based content"
- id: SetOutputTrigger
  label: Set Output Trigger
  kind: action
  params:
    - name: triggerIndex
      type: integer
      description: "1-based trigger index"
    - name: enabled
      type: boolean
- id: Script
  label: Script
  kind: action
  params:
    - name: commands
      type: string
      description: URL-encoded series of commands separated by /
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
  description: Total track length in seconds (0 for streams)
- id: MetaData1
  type: string
  description: Radio station name or track count
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
- id: MetaLabel2
  type: string
- id: MetaLabel3
  type: string
- id: MetaLabel4
  type: string
- id: NowPlayingGuid
  type: string
  description: GUID of now playing item
- id: BaseWebUrl
  type: string
  description: Base URL for album art retrieval
- id: Back
  type: boolean
  description: Whether navigation stack has items
- id: BrowseNowPlayingAvailable
  type: boolean
- id: ContextMenu
  type: boolean
- id: Mute
  type: boolean
- id: PlayPauseAvailable
  type: boolean
- id: RepeatAvailable
  type: boolean
- id: Repeat
  type: boolean
- id: SeekAvailable
  type: boolean
- id: ShuffleAvailable
  type: boolean
- id: Shuffle
  type: boolean
- id: SkipNextAvailable
  type: boolean
- id: SkipPrevAvailable
  type: boolean
- id: ThumbsUp
  type: enum
  values: [-1, 0, 1]
  description: "-1=disabled, 0=enabled not set, 1=enabled and set"
- id: ThumbsDown
  type: enum
  values: [-1, 0, 1]
- id: Stars
  type: enum
  values: [-1, 0, 1, 2, 3, 4, 5]
  description: "-1=disabled, 0-5=enabled"
- id: FavoritesChanged
  type: boolean
- id: FavoritesCount
  type: integer
- id: ScenesChanged
  type: boolean
- id: ScenesCount
  type: integer
- id: PlaylistsChanged
  type: boolean
- id: PlaylistCount
  type: integer
- id: TriggerIn1
  type: boolean
  description: Input trigger state (up to TriggerIn<x>)
- id: LocalQueueOptions
  type: string
  description: Available queue modification options
```

## Events
```yaml
# UNRESOLVED: all event types push to connected client without polling
# Event format: EventReason Source Event=Value
# e.g., StateChanged Player_A TrackTime=121
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
# Initialization sequence example from source:
#   SetClientType DemoClient
#   SetClientVersion 1.0.0.0
#   SetHost 192.168.0.100
#   SetXmlMode Lists
#   SetEncoding 65001
#   SetInstance Player_A
#   SubscribeEvents
#   GetStatus
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
TCP port 5004 for socket/telnet control. HTTP JSON API at port 5005 for art requests, port 5004 for API commands. Commands use CR+LF termination. Browse indexes are 1-based. Album art endpoint: `/getart` with parameters `c`, `guid`, `fmt`, `instance`, `h`, `w`, `rfle`, `rflh`, `rflo`, `rz`. Output triggers: 12VDC 100mA max. Input triggers: 5-24V AC or DC.
<!-- UNRESOLVED: voltage/current/power specs not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - autonomic.atlassian.net
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
retrieved_at: 2026-04-30T04:34:49.227Z
last_checked_at: 2026-05-14T18:17:14.200Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.200Z
matched_actions: 56
action_count: 57
confidence: high
summary: "All 56 spec actions matched verbatim in source; transport params verified; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
