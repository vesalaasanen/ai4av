---
spec_id: admin/autonomic-controls-msb20e
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
  - snapav.com
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - "https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/Amplifiers/ProtocolsAndDrivers/Autonomic%20MAS%20Control%20Protocol.pdf"
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/overview
retrieved_at: 2026-05-19T22:02:55.877Z
last_checked_at: 2026-06-02T17:21:34.550Z
generated_at: 2026-06-02T17:21:34.550Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 serial configuration not stated in source (this spec covers the IP protocol only)."
  - "authentication credentials / token format not stated in source."
  - "fault behavior and error recovery sequences not stated in source."
  - "no safety warnings, interlocks, or power-on sequencing requirements"
  - "RS-232 / serial configuration not stated in source (IP only)."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:34.550Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 60 spec actions matched verbatim wire-level mnemonics in source; transport parameters (port 5004, http://{ipOrNameOfServer}/api/) verified; source command inventory fully represented by spec. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Autonomic Controls MSB20e Control Spec

## Summary
The Autonomic MSB20e is a multi-source media server controllable over TCP (telnet-compatible socket) on port 5004 using a line-based command protocol terminated with CRLF, and additionally over an HTTP JSON API at `http://<ip>/api/`. Commands cover connection preamble, event subscription, transport control, browsing, direct playback, presets, scenes, playlists, now-playing queue, output triggers, and album art.

<!-- UNRESOLVED: RS-232 serial configuration not stated in source (this spec covers the IP protocol only). -->
<!-- UNRESOLVED: authentication credentials / token format not stated in source. -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 5004
  base_url: "http://{ipOrNameOfServer}/api/"
auth:
  type: none  # inferred: no auth procedure in source
```

**Notes on framing:** Commands and responses are terminated with `\r\n` (carriage return + line feed).

## Traits
```yaml
# powerable:      no explicit power on/off command in source
- queryable       # inferred: GetStatus command and ReportState/StateChanged events
# routable:       no input/output routing commands in source
- levelable       # inferred from SetVolume command
```

## Actions
```yaml
# ----- Connection preamble -----
- id: set_client_type
  label: Set Client Type
  kind: action
  command: "SetClientType {type}"
  params:
    - name: type
      type: string
      description: Free-form string identifying the control client

- id: set_client_version
  label: Set Client Version
  kind: action
  command: "SetClientVersion {version}"
  params:
    - name: version
      type: string
      description: MAJOR.MINOR.BUILD.REVISION version string

- id: set_host
  label: Set Host
  kind: action
  command: "SetHost {ip}"
  params:
    - name: ip
      type: string
      description: IP address the client used to connect to the MMS

- id: set_xml_mode
  label: Set XML Mode
  kind: action
  command: "SetXmlMode {mode}"
  params:
    - name: mode
      type: string
      description: Either `None` or `Lists`

- id: set_encoding
  label: Set Encoding
  kind: action
  command: "SetEncoding {encoding}"
  params:
    - name: encoding
      type: integer
      description: Code page identifier; 65001 (UTF-8) recommended

- id: set_instance
  label: Set Instance
  kind: action
  command: "SetInstance {instance}"
  params:
    - name: instance
      type: string
      description: Target output instance name (e.g. `Player_A`)

- id: subscribe_events
  label: Subscribe Events
  kind: action
  command: "SubscribeEvents {filter}"
  params:
    - name: filter
      type: string
      description: Optional boolean or comma-delimited event list; omit/true for all

- id: get_status
  label: Get Status
  kind: query
  command: "GetStatus"

- id: set_option
  label: Set Option
  kind: action
  command: "SetOption {name}={value}"
  params:
    - name: name
      type: string
      description: Option name (e.g. `supports_playnow`, `supports_inputbox`, `supports_urls`)
    - name: value
      type: string
      description: Option value (`true`/`false`)

# ----- Transport control -----
- id: play
  label: Play
  kind: action
  command: "Play"

- id: pause
  label: Pause
  kind: action
  command: "Pause"

- id: play_pause
  label: Play/Pause Toggle
  kind: action
  command: "PlayPause"

- id: seek
  label: Seek
  kind: action
  command: "Seek {position}"
  params:
    - name: position
      type: integer
      description: Non-negative seconds from start of track, or negative seconds from end (e.g. -1 to -TrackDuration)

- id: skip_next
  label: Skip Next
  kind: action
  command: "SkipNext"

- id: skip_previous
  label: Skip Previous
  kind: action
  command: "SkipPrevious"

- id: thumbs_up
  label: Thumbs Up Toggle
  kind: action
  command: "ThumbsUp"

- id: thumbs_down
  label: Thumbs Down Toggle
  kind: action
  command: "ThumbsDown"

- id: set_volume
  label: Set Volume
  kind: action
  command: "SetVolume {level}"
  params:
    - name: level
      type: integer
      description: Integer 0-50; selected output must be in variable gain mode

# ----- Browse commands (each container is a separate row in source) -----
- id: browse_albums
  label: Browse Albums
  kind: query
  command: "BrowseAlbums {start} {count}"
  params:
    - name: start
      type: integer
      description: One-based start index
    - name: count
      type: integer
      description: Maximum number of items to return

- id: browse_artists
  label: Browse Artists
  kind: query
  command: "BrowseArtists {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_composers
  label: Browse Composers
  kind: query
  command: "BrowseComposers {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_favorites
  label: Browse Favorites
  kind: query
  command: "BrowseFavorites {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_genres
  label: Browse Genres
  kind: query
  command: "BrowseGenres {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_now_playing
  label: Browse Now Playing
  kind: query
  command: "BrowseNowPlaying {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_picklist
  label: Browse Picklist
  kind: query
  command: "BrowsePicklist {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_playlists
  label: Browse Playlists
  kind: query
  command: "BrowsePlaylists {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_radio_sources
  label: Browse Radio Sources
  kind: query
  command: "BrowseRadioSources {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_titles
  label: Browse Titles
  kind: query
  command: "BrowseTitles {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_top_menu
  label: Browse Top Menu
  kind: query
  command: "BrowseTopMenu [itemGuid={childGuid}]"
  params:
    - name: childGuid
      type: string
      description: Optional GUID to specify a different root menu node

- id: browse_service_accounts
  label: Browse Service Accounts
  kind: query
  command: "BrowseServiceAccounts"

- id: browse_presets
  label: Browse Presets
  kind: query
  command: "BrowsePresets {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: ack_pick_item
  label: Acknowledge Picklist Item
  kind: action
  command: "AckPickItem {guid}"
  params:
    - name: guid
      type: string
      description: GUID of the picklist item to select

- id: back
  label: Back (Navigation)
  kind: action
  command: "Back {pages}"
  params:
    - name: pages
      type: integer
      description: Number of pages to jump back in the navigation stack

- id: set_service_account
  label: Set Service Account
  kind: action
  command: "SetServiceAccount {serviceGuid} {accountGuid} [{latch}]"
  params:
    - name: serviceGuid
      type: string
      description: Streaming service GUID (from BrowseRadioSources)
    - name: accountGuid
      type: string
      description: Account GUID (from BrowseServiceAccounts)
    - name: latch
      type: string
      description: Optional `False` to latch per output; use `Service` or `Clear` placeholders to clear

- id: clarify_title_intent
  label: Clarify Title Intent
  kind: action
  command: "ClarifyTitleIntent {guid} [{verb}]"
  params:
    - name: guid
      type: string
    - name: verb
      type: string
      description: Optional queue verb (`Next`/`Now`/`Replace`/`AddToQueue`/`AddToPlaylist`)

# ----- Direct playback (each container is a separate row in source) -----
- id: play_album
  label: Play Album
  kind: action
  command: "PlayAlbum {containerGUID} [{verb}]"
  params:
    - name: containerGUID
      type: string
    - name: verb
      type: string
      description: Optional queue verb (`Next`/`Now`/`Replace`/`AddToQueue`/`AddToPlaylist`)

- id: play_artist
  label: Play Artist
  kind: action
  command: "PlayArtist {containerGUID} [{verb}]"
  params:
    - name: containerGUID
      type: string
    - name: verb
      type: string

- id: play_composer
  label: Play Composer
  kind: action
  command: "PlayComposer {containerGUID} [{verb}]"
  params:
    - name: containerGUID
      type: string
    - name: verb
      type: string

- id: play_genre
  label: Play Genre
  kind: action
  command: "PlayGenre {containerGUID} [{verb}]"
  params:
    - name: containerGUID
      type: string
    - name: verb
      type: string

- id: play_playlist
  label: Play Playlist
  kind: action
  command: "PlayPlaylist {containerGUID} [{verb}]"
  params:
    - name: containerGUID
      type: string
    - name: verb
      type: string

- id: play_preset
  label: Play Preset
  kind: action
  command: "PlayPreset {containerGUID} [{verb}]"
  params:
    - name: containerGUID
      type: string
    - name: verb
      type: string

- id: play_scene
  label: Play Scene
  kind: action
  command: "PlayScene {containerGUID} [{verb}]"
  params:
    - name: containerGUID
      type: string
    - name: verb
      type: string

- id: play_title
  label: Play Title
  kind: action
  command: "PlayTitle {containerGUID} [{verb}]"
  params:
    - name: containerGUID
      type: string
    - name: verb
      type: string

# ----- Presets -----
- id: store_preset
  label: Store Preset
  kind: action
  command: "StorePreset [{name}]"
  params:
    - name: name
      type: string
      description: Optional double-quoted preset name; omit to be prompted via InputBox

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
  params:
    - name: nameOrId
      type: string

- id: rename_preset
  label: Rename Preset
  kind: action
  command: "RenamePreset {nameOrId} {newName}"
  params:
    - name: nameOrId
      type: string
    - name: newName
      type: string

- id: delete_preset
  label: Delete Preset
  kind: action
  command: "DeletePreset {nameOrId}"
  params:
    - name: nameOrId
      type: string

# ----- Scenes -----
- id: store_scene
  label: Store Scene
  kind: action
  command: "StoreScene [{name}]"
  params:
    - name: name
      type: string
      description: Optional double-quoted scene name; omit to be prompted via InputBox

- id: recall_scene
  label: Recall Scene
  kind: action
  command: "RecallScene {nameOrId}"
  params:
    - name: nameOrId
      type: string
      description: Double-quoted scene name or unique ID

- id: delete_scene
  label: Delete Scene
  kind: action
  command: "DeleteScene {nameOrId}"
  params:
    - name: nameOrId
      type: string

# ----- Playlists -----
- id: rename_playlist
  label: Rename Playlist
  kind: action
  command: "RenamePlaylist {oldName} {newName}"
  params:
    - name: oldName
      type: string
    - name: newName
      type: string

- id: delete_playlist
  label: Delete Playlist
  kind: action
  command: "DeletePlaylist {nameOrId}"
  params:
    - name: nameOrId
      type: string

- id: reorder_playlist
  label: Reorder Playlist
  kind: action
  command: "ReorderPlaylist {playlistId} {sourceTrackId} {destTrackId}"
  params:
    - name: playlistId
      type: string
    - name: sourceTrackId
      type: string
    - name: destTrackId
      type: string

# ----- Now Playing queue -----
- id: jump_to_now_playing_item
  label: Jump To Now Playing Item
  kind: action
  command: "JumpToNowPlayingitem {indexOfItem}"
  params:
    - name: indexOfItem
      type: integer
      description: One-based index of the queue item

- id: reorder_now_playing
  label: Reorder Now Playing
  kind: action
  command: "ReorderNowPlaying {indexOfTrackToMove} {indexToMoveTo}"
  params:
    - name: indexOfTrackToMove
      type: integer
    - name: indexToMoveTo
      type: integer

- id: remove_now_playing_item
  label: Remove Now Playing Item
  kind: action
  command: "RemoveNowPlayingItem {indexOfTrackToRemove}"
  params:
    - name: indexOfTrackToRemove
      type: integer

- id: clear_now_playing
  label: Clear Now Playing
  kind: action
  command: "ClearNowPlaying [{stopStations}]"
  params:
    - name: stopStations
      type: string
      description: `True` or omit to clear queue without disrupting station playback; `False` to also stop station content

# ----- Triggers -----
- id: set_output_trigger
  label: Set Output Trigger
  kind: action
  command: "SetOutputTrigger {indexOfTrigger} {state}"
  params:
    - name: indexOfTrigger
      type: integer
      description: 1-based trigger index (independent of trigger label)
    - name: state
      type: boolean
      description: true to energize, false to de-energize

# ----- HTTP API composite -----
- id: script
  label: Script (HTTP composite)
  kind: action
  command: "GET /api/Script/{urlEncodedSubCommand1}/{urlEncodedSubCommand2}/..."
  params:
    - name: urlEncodedSubCommand
      type: string
      description: One or more URL-encoded sub-commands to execute in order
```

## Feedbacks
```yaml
# Metadata events
- id: meta_label
  type: string
  values: null
  description: "MetaLabel1..4 - label for the corresponding MetaData field"
- id: meta_data
  type: string
  values: null
  description: "MetaData1..4 - MetaData1 reserved for radio/track count; MetaData2=Artist; MetaData3=Album; MetaData4=Track"
- id: now_playing_guid
  type: string
  values: null
  description: "GUID of the now playing item, e.g. {20dd901a-b092-3386-dc16-6b56f38a811e}"
- id: media_art_changed
  type: boolean
  values: [true, false]
  description: "True whenever the art for the current NowPlayingGuid has changed and should be reloaded"
- id: base_web_url
  type: string
  values: null
  description: "Protocol+address+port prefix for retrieving art, e.g. http://192.168.0.59:5005"

# Track time
- id: track_time
  type: integer
  values: null
  description: "Current track position in seconds (non-negative)"
- id: track_duration
  type: integer
  values: null
  description: "Total track length in seconds (0 if unknown)"

# Playback state
- id: play_state
  type: enum
  values: [Playing, Paused, Stopped]
- id: media_control
  type: enum
  values: [Play, Pause, Stop]

# Boolean flags
- id: back
  type: boolean
  values: [true, false]
  description: "True when the navigation stack has items to pop"
- id: browse_now_playing_available
  type: boolean
  values: [true, false]
- id: context_menu
  type: boolean
  values: [true, false]
  description: "True when AckButton CONTEXT is a valid command"
- id: mute
  type: boolean
  values: [true, false]
- id: play_pause_available
  type: boolean
  values: [true, false]
- id: repeat_available
  type: boolean
  values: [true, false]
- id: repeat
  type: boolean
  values: [true, false]
- id: seek_available
  type: boolean
  values: [true, false]
- id: shuffle_available
  type: boolean
  values: [true, false]
- id: shuffle
  type: boolean
  values: [true, false]
- id: skip_next_available
  type: boolean
  values: [true, false]
- id: skip_prev_available
  type: boolean
  values: [true, false]

# Multistate flags
- id: thumbs_up
  type: integer
  values: [-1, 0, 1]
  description: "-1 disabled, 0 enabled but not set, 1 enabled and set"
- id: thumbs_down
  type: integer
  values: [-1, 0, 1]
- id: stars
  type: integer
  values: [-1, 0, 1, 2, 3, 4, 5]
  description: "-1 disabled, 0-5 enabled with the indicated star count"

# Collection change notifications
- id: favorites_changed
  type: boolean
  values: [true, false]
  description: "Sent whenever any change is made to any preset"
- id: favorites_count
  type: integer
  values: null
  description: "Number of favorites"
- id: scenes_changed
  type: boolean
  values: [true, false]
- id: scenes_count
  type: integer
  values: null
- id: playlists_changed
  type: boolean
  values: [true, false]
- id: playlist_count
  type: integer
  values: null

# Trigger events
- id: trigger_in
  type: boolean
  values: [true, false]
  description: "TriggerIn1..TriggerIn<x> - true when voltage is applied to the input pin"
```

## Variables
```yaml
- id: volume
  type: integer
  range: [0, 50]
  description: Output volume; settable via SetVolume when the output is in variable gain mode
```

## Events
```yaml
# All unsolicited notifications from the MMS follow the format:
#   EventReason Source Event=Value
# e.g. StateChanged Player_A TrackTime=121
# Listed below are the named events documented in the source.
- name: StateChanged
  description: "Source pushes current state for a value"
- name: ReportState
  description: "Source reports current state for a value"
- name: MetaLabel1
  description: "Label for MetaData1"
- name: MetaLabel2
  description: "Label for MetaData2"
- name: MetaLabel3
  description: "Label for MetaData3"
- name: MetaLabel4
  description: "Label for MetaData4"
- name: MetaData1
  description: "Radio station name or track count"
- name: MetaData2
  description: "Artist"
- name: MetaData3
  description: "Album"
- name: MetaData4
  description: "Track"
- name: NowPlayingGuid
  description: "GUID of the now playing item"
- name: MediaArtChanged
  description: "Art has changed for the current item"
- name: BaseWebUrl
  description: "Base URL prefix for art retrieval"
- name: TrackTime
  description: "Track position in seconds"
- name: TrackDuration
  description: "Track length in seconds"
- name: PlayState
  description: "Playing | Paused | Stopped"
- name: MediaControl
  description: "Play | Pause | Stop"
- name: Back
  description: "Navigation stack availability flag"
- name: BrowseNowPlayingAvailable
  description: "Queue is available to browse"
- name: ContextMenu
  description: "Context menu availability flag"
- name: Mute
  description: "Mute state flag"
- name: PlayPauseAvailable
  description: "Play/Pause availability flag"
- name: RepeatAvailable
  description: "Repeat availability flag"
- name: Repeat
  description: "Repeat state flag"
- name: SeekAvailable
  description: "Seek availability flag"
- name: ShuffleAvailable
  description: "Shuffle availability flag"
- name: Shuffle
  description: "Shuffle state flag"
- name: SkipNextAvailable
  description: "Skip next availability flag"
- name: SkipPrevAvailable
  description: "Skip previous availability flag"
- name: ThumbsUp
  description: "Thumbs up state (-1/0/1)"
- name: ThumbsDown
  description: "Thumbs down state (-1/0/1)"
- name: Stars
  description: "Stars state (-1..5)"
- name: FavoritesChanged
  description: "Any change to any preset"
- name: FavoritesCount
  description: "Number of presets changed"
- name: ScenesChanged
  description: "Any change to any scene"
- name: ScenesCount
  description: "Number of scenes changed"
- name: PlaylistsChanged
  description: "Any change to any playlist"
- name: PlaylistCount
  description: "Number of playlists changed"
- name: TriggerIn1..TriggerInN
  description: "Input trigger state per physical input"
```

## Macros
```yaml
- id: connection_preamble
  label: Connection Preamble
  description: |
    Recommended sequence on connect, taken verbatim from the source:
    SetClientType DemoClient
    SetClientVersion 1.0.0.0
    SetHost 192.168.0.100
    SetXmlMode Lists
    SetEncoding 65001
    SetInstance Player_A
    SubscribeEvents
    GetStatus
  steps:
    - command: "SetClientType {type}"
    - command: "SetClientVersion {version}"
    - command: "SetHost {ip}"
    - command: "SetXmlMode Lists"
    - command: "SetEncoding 65001"
    - command: "SetInstance {instance}"
    - command: "SubscribeEvents"
    - command: "GetStatus"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements
# were documented in the source. The 12VDC/100mA output trigger is a documented
# electrical limit, not an interlock.
```

## Notes
- The protocol is line-based; both commands and responses terminate with `\r\n`.
- The HTTP JSON API is **not** guaranteed to process commands in send order — use the `Script` command to enforce ordering.
- HTTP clients must include `clientId=<UUID>` in the query string on both command requests and the bare `/api` poll to avoid inter-client cross-talk. Without it, the server cannot route responses to the correct client.
- Album art retrieval URL pattern: `{BaseWebUrl}/getart?...` with query params `c`, `guid`, `fmt` (`png`|`jpg`), `instance`, `h`, `w`, `rfle`, `rflh`, `rflo`, `rz`. Port may be omitted; port 80 is equivalent to 5005 for this handler.
- `SetServiceAccount` has three forms documented in the source: set specific account, clear all latched accounts for a service (`SetServiceAccount Service Clear False`), and clear all latched accounts for all services (`SetServiceAccount Clear Clear False`). The placeholder tokens `Service` and `Clear` are literal as written.
- `ClearNowPlaying` with no argument or `True` preserves station-based playback; `False` stops it too.
- `ThumbsDown=1` may also skip to the next track on some services — source notes this is service-dependent.
- `Browse<Container>` is documented as one template per container; each container is enumerated as a separate command in the source.
- `Play<Container>` accepts an optional trailing queue verb: `Next`, `Now`, `Replace`, `AddToQueue`, `AddToPlaylist`.
- HTTP API command encoding: replace spaces in a command with `/` and URL-encode parameters; e.g. `SubscribeEvents True` → `GET /api/SubscribeEvents/True`.

<!-- UNRESOLVED: RS-232 / serial configuration not stated in source (IP only). -->
<!-- UNRESOLVED: authentication credentials / token format not stated in source. -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - autonomic.atlassian.net
  - snapav.com
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - "https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/Amplifiers/ProtocolsAndDrivers/Autonomic%20MAS%20Control%20Protocol.pdf"
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/overview
retrieved_at: 2026-05-19T22:02:55.877Z
last_checked_at: 2026-06-02T17:21:34.550Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:34.550Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 60 spec actions matched verbatim wire-level mnemonics in source; transport parameters (port 5004, http://{ipOrNameOfServer}/api/) verified; source command inventory fully represented by spec. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 serial configuration not stated in source (this spec covers the IP protocol only)."
- "authentication credentials / token format not stated in source."
- "fault behavior and error recovery sequences not stated in source."
- "no safety warnings, interlocks, or power-on sequencing requirements"
- "RS-232 / serial configuration not stated in source (IP only)."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
