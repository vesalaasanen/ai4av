---
spec_id: admin/autonomic-controls-mms
schema_version: ai4av-public-spec-v1
revision: 1
title: "Autonomic Controls MMS Control Spec"
manufacturer: "Autonomic Controls"
model_family: MMS
aliases: []
compatible_with:
  manufacturers:
    - "Autonomic Controls"
    - "Autonomic Controls, Inc"
  models:
    - MMS
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
  - https://autonomic.atlassian.net/wiki
retrieved_at: 2026-05-19T22:32:35.415Z
last_checked_at: 2026-06-02T17:21:33.828Z
generated_at: 2026-06-02T17:21:33.828Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "which specific MMS hardware revisions / SKUs (MMS-1, MMS-2, MMS-5, etc.) the protocol covers — source is a generic \"MMS\" doc"
  - "no other multi-step sequences defined in source."
  - "no interlock, lockout, or power-on sequencing procedures described in source."
  - "firmware version compatibility, specific MMS hardware SKUs, default admin credentials (none documented — auth assumed none), full enumeration of all possible event reasons beyond StateChanged/ReportState, behavior when MMS rejects a command"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:33.828Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec actions matched exactly to source command definitions; transport parameters verified; Feedbacks section covers all source events. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Autonomic Controls MMS Control Spec

## Summary
Spec covers Autonomic MMS (Media Media Server) line. Device exposes a TCP socket control protocol on port 5004 (CRLF-terminated text commands) plus an HTTP JSON API rooted at `/api/`. All control — playback, browsing, presets, scenes, playlists, queue, triggers — goes through one of these two transports.

<!-- UNRESOLVED: which specific MMS hardware revisions / SKUs (MMS-1, MMS-2, MMS-5, etc.) the protocol covers — source is a generic "MMS" doc -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 5004
  base_url: "http://{deviceIp}/api/"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from SetOutputTrigger
- routable        # inferred from Play<Container> / BrowseTopMenu routing
- queryable       # inferred from GetStatus / SubscribeEvents
- levelable       # inferred from SetVolume 0-50
```

## Actions
```yaml
# Connection preamble
- id: set_client_type
  label: Set Client Type
  kind: action
  command: "SetClientType {name}"
  params:
    - name: name
      type: string
      description: Free-form client identifier

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
      description: IP the client used to reach MMS

- id: set_xml_mode
  label: Set XML Mode
  kind: action
  command: "SetXmlMode {mode}"
  params:
    - name: mode
      type: string
      description: "None | Lists"

- id: set_encoding
  label: Set Encoding
  kind: action
  command: "SetEncoding {codepage}"
  params:
    - name: codepage
      type: string
      description: "65001 for UTF-8"

- id: set_instance
  label: Set Instance
  kind: action
  command: "SetInstance {instance}"
  params:
    - name: instance
      type: string
      description: Target output instance name (e.g. Player_A)

- id: subscribe_events
  label: Subscribe Events
  kind: action
  command: "SubscribeEvents {filter}"
  params:
    - name: filter
      type: string
      description: "Optional boolean or comma-delimited event list. Omit for all."

- id: get_status
  label: Get Status
  kind: query
  command: "GetStatus"

- id: set_option
  label: Set Option
  kind: action
  command: "SetOption {key}={value}"
  params:
    - name: key
      type: string
      description: "supports_playnow | supports_inputbox | supports_urls"
    - name: value
      type: string
      description: "true | false"

# Playback control
- id: play
  label: Play
  kind: action
  command: "Play"

- id: pause
  label: Pause
  kind: action
  command: "Pause"

- id: play_pause
  label: Play / Pause Toggle
  kind: action
  command: "PlayPause"

- id: seek
  label: Seek
  kind: action
  command: "Seek {position}"
  params:
    - name: position
      type: integer
      description: "Non-negative int (0..TrackDuration) for position from start; negative int (-1..-TrackDuration) for position from end"

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
      description: "0-50. Output must be in variable gain mode."

- id: set_stars
  label: Set Stars
  kind: action
  command: "SetStars {value}"
  params:
    - name: value
      type: integer
      description: "0-5"

# Navigation
- id: back
  label: Back
  kind: action
  command: "Back {steps}"
  params:
    - name: steps
      type: integer
      description: Number of pages to jump back in nav stack. 0 = current page.

- id: repeat
  label: Repeat Toggle
  kind: action
  command: "Repeat"

- id: shuffle
  label: Shuffle Toggle
  kind: action
  command: "Shuffle"

# Browse
- id: browse_albums
  label: Browse Albums
  kind: query
  command: "BrowseAlbums {start} {count}"
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
  label: Browse Favorites (Presets)
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
  command: "BrowseTopMenu {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_top_menu_item
  label: Browse Top Menu (Item)
  kind: query
  command: "BrowseTopMenu itemGuid={childGuid}"
  params:
    - name: childGuid
      type: string
      description: Child node guid to enter

- id: browse_service_accounts
  label: Browse Service Accounts
  kind: query
  command: "BrowseServiceAccounts {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_presets
  label: Browse Presets
  kind: query
  command: "BrowsePresets {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: browse_scenes
  label: Browse Scenes
  kind: query
  command: "BrowseScenes {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

# Browse-item selection
- id: ack_pick_item
  label: Acknowledge Pick Item
  kind: action
  command: "AckPickItem {guid}"
  params:
    - name: guid
      type: string
      description: Item guid from picklist response

- id: clarify_title_intent
  label: Clarify Title Intent
  kind: action
  command: "ClarifyTitleIntent {guid} {verb}"
  params:
    - name: guid
      type: string
    - name: verb
      type: string
      description: "Next | Now | Replace | AddToQueue | AddToPlaylist"

- id: ack_button_context
  label: Acknowledge Context Button
  kind: action
  command: "AckButton CONTEXT"

# Service account
- id: set_service_account
  label: Set Service Account
  kind: action
  command: "SetServiceAccount {serviceGuid} {accountGuid} {latch}"
  params:
    - name: serviceGuid
      type: string
    - name: accountGuid
      type: string
    - name: latch
      type: string
      description: "True (session) | False (latched to output)"

- id: set_service_account_clear_service
  label: Set Service Account (Clear Service)
  kind: action
  command: "SetServiceAccount {service} Clear {latch}"
  params:
    - name: service
      type: string
      description: Service name or guid
    - name: latch
      type: string
      description: "False"

- id: set_service_account_clear_all
  label: Set Service Account (Clear All)
  kind: action
  command: "SetServiceAccount Clear Clear {latch}"
  params:
    - name: latch
      type: string
      description: "False"

# Direct playback
- id: play_album
  label: Play Album
  kind: action
  command: "PlayAlbum {albumGuid} {verb}"
  params:
    - name: albumGuid
      type: string
    - name: verb
      type: string
      description: "Optional: Next | Now | Replace | AddToQueue | AddToPlaylist"

- id: play_artist
  label: Play Artist
  kind: action
  command: "PlayArtist {artistGuid} {verb}"
  params:
    - name: artistGuid
      type: string
    - name: verb
      type: string

- id: play_composer
  label: Play Composer
  kind: action
  command: "PlayComposer {composerGuid} {verb}"
  params:
    - name: composerGuid
      type: string
    - name: verb
      type: string

- id: play_genre
  label: Play Genre
  kind: action
  command: "PlayGenre {genreGuid} {verb}"
  params:
    - name: genreGuid
      type: string
    - name: verb
      type: string

- id: play_playlist
  label: Play Playlist
  kind: action
  command: "PlayPlaylist {playlistGuid} {verb}"
  params:
    - name: playlistGuid
      type: string
    - name: verb
      type: string

- id: play_preset
  label: Play Preset
  kind: action
  command: "PlayPreset {presetGuid} {verb}"
  params:
    - name: presetGuid
      type: string
    - name: verb
      type: string

- id: play_scene
  label: Play Scene
  kind: action
  command: "PlayScene {sceneGuid} {verb}"
  params:
    - name: sceneGuid
      type: string
    - name: verb
      type: string

- id: play_title
  label: Play Title
  kind: action
  command: "PlayTitle {titleGuid} {verb}"
  params:
    - name: titleGuid
      type: string
    - name: verb
      type: string

# Presets
- id: store_preset
  label: Store Preset
  kind: action
  command: "StorePreset {name}"
  params:
    - name: name
      type: string
      description: Optional double-quoted name. Omit to trigger InputBox.

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "RecallPreset {nameOrId}"
  params:
    - name: nameOrId
      type: string
      description: Quoted name OR unique guid

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

# Scenes
- id: store_scene
  label: Store Scene
  kind: action
  command: "StoreScene {name}"
  params:
    - name: name
      type: string
      description: Optional double-quoted name. Omit to trigger InputBox.

- id: recall_scene
  label: Recall Scene
  kind: action
  command: "RecallScene {nameOrId}"
  params:
    - name: nameOrId
      type: string
      description: Quoted name OR unique guid

- id: delete_scene
  label: Delete Scene
  kind: action
  command: "DeleteScene {nameOrId}"
  params:
    - name: nameOrId
      type: string

# Playlists
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
  label: Reorder Playlist Tracks
  kind: action
  command: "ReorderPlaylist {playlistId} {sourceTrackId} {destTrackId}"
  params:
    - name: playlistId
      type: string
    - name: sourceTrackId
      type: string
    - name: destTrackId
      type: string

# Now Playing queue
- id: jump_to_now_playing_item
  label: Jump To Now Playing Item
  kind: action
  command: "JumpToNowPlayingItem {index}"
  params:
    - name: index
      type: integer
      description: 1-based index in queue

- id: reorder_now_playing
  label: Reorder Now Playing
  kind: action
  command: "ReorderNowPlaying {indexToMove} {destIndex}"
  params:
    - name: indexToMove
      type: integer
    - name: destIndex
      type: integer

- id: remove_now_playing_item
  label: Remove Now Playing Item
  kind: action
  command: "RemoveNowPlayingItem {index}"
  params:
    - name: index
      type: integer
      description: 1-based index of track to remove

- id: clear_now_playing
  label: Clear Now Playing
  kind: action
  command: "ClearNowPlaying {stopStations}"
  params:
    - name: stopStations
      type: string
      description: "True (default; stations keep playing) | False (clear and stop station playback)"

# Triggers
- id: set_output_trigger
  label: Set Output Trigger
  kind: action
  command: "SetOutputTrigger {index} {state}"
  params:
    - name: index
      type: integer
      description: "Trigger index (1-based, in trigger order independent of label)"
    - name: state
      type: string
      description: "true | false"

# HTTP-only
- id: script
  label: Script (HTTP batch)
  kind: action
  command: "Script {urlEncodedCommands}"
  params:
    - name: urlEncodedCommands
      type: string
      description: One or more CRLF-joined subcommands, each URL-encoded. Subcommands separated by `/` in HTTP URL.
  notes: "HTTP API only. Forces ordered execution across separate socket requests."
```

## Feedbacks
```yaml
# Push events from MMS. SubscribeEvents to receive; GetStatus to replay current state.
- id: meta_label
  type: string
  values: []
  description: "MetaLabel1..MetaLabel4. Label for corresponding MetaData field."

- id: meta_data
  type: string
  values: []
  description: "MetaData1..MetaData4. MetaData1=station/track count, 2=artist, 3=album, 4=track."

- id: now_playing_guid
  type: string
  values: []
  description: "NowPlayingGuid. ID of now playing item, e.g. {20dd901a-...}."

- id: media_art_changed
  type: boolean
  values: [true, false]
  description: "MediaArtChanged. Always true; reload art when received or when NowPlayingGuid changes."

- id: base_web_url
  type: string
  values: []
  description: "BaseWebUrl. Protocol/address/port for art retrieval, e.g. http://192.168.0.59:5005"

- id: track_time
  type: integer
  values: []
  description: "TrackTime. Current position in seconds (non-negative int). 0 if unknown."

- id: track_duration
  type: integer
  values: []
  description: "TrackDuration. Total track length in seconds (non-negative int). 0 if unknown."

- id: play_state
  type: enum
  values: [Playing, Paused, Stopped]
  description: "PlayState event."

- id: media_control
  type: enum
  values: [Play, Pause, Stop]
  description: "MediaControl event. Same meaning as PlayState."

- id: back
  type: boolean
  values: [true, false]
  description: "Back. True if nav stack has entries. Use `Back <int>` to jump back."

- id: browse_now_playing_available
  type: boolean
  values: [true, false]
  description: "BrowseNowPlayingAvailable. True if queue has more than 0 items."

- id: context_menu
  type: boolean
  values: [true, false]
  description: "ContextMenu. True if AckButton CONTEXT is valid."

- id: mute
  type: boolean
  values: [true, false]
  description: "Mute. Current mute state of selected instance."

- id: play_pause_available
  type: boolean
  values: [true, false]
  description: "PlayPauseAvailable. True if Play/Pause/PlayPause valid."

- id: repeat_available
  type: boolean
  values: [true, false]
  description: "RepeatAvailable. True if Repeat command is valid."

- id: repeat
  type: boolean
  values: [true, false]
  description: "Repeat. Current repeat state."

- id: seek_available
  type: boolean
  values: [true, false]
  description: "SeekAvailable. True if Seek command is valid."

- id: shuffle_available
  type: boolean
  values: [true, false]
  description: "ShuffleAvailable. True if Shuffle command is valid."

- id: shuffle
  type: boolean
  values: [true, false]
  description: "Shuffle. Current shuffle state."

- id: skip_next_available
  type: boolean
  values: [true, false]
  description: "SkipNextAvailable. True if SkipNext is valid."

- id: skip_prev_available
  type: boolean
  values: [true, false]
  description: "SkipPrevAvailable. True if SkipPrevious is valid."

- id: thumbs_up
  type: integer
  values: [-1, 0, 1]
  description: "ThumbsUp. -1=disabled, 0=enabled+unset, 1=enabled+set."

- id: thumbs_down
  type: integer
  values: [-1, 0, 1]
  description: "ThumbsDown. Same semantics as ThumbsUp."

- id: stars
  type: integer
  values: [-1, 0, 1, 2, 3, 4, 5]
  description: "Stars. -1=disabled, 0-5=stars set."

- id: favorites_changed
  type: boolean
  values: [true, false]
  description: "FavoritesChanged. Always true; rebrowse presets on receipt."

- id: favorites_count
  type: integer
  values: []
  description: "FavoritesCount. Number of presets (sent on add/delete only)."

- id: scenes_changed
  type: boolean
  values: [true, false]
  description: "ScenesChanged. Always true; rebrowse scenes on receipt."

- id: scenes_count
  type: integer
  values: []
  description: "ScenesCount. Number of scenes."

- id: playlists_changed
  type: boolean
  values: [true, false]
  description: "PlaylistsChanged. Always true; rebrowse playlists on receipt."

- id: playlist_count
  type: integer
  values: []
  description: "PlaylistCount. Number of playlists (add/delete only)."

- id: trigger_in
  type: boolean
  values: [true, false]
  description: "TriggerIn1..TriggerInN. True when voltage applied to input pin."

- id: local_queue_options
  type: string
  values: [Next, Now, Replace, AddToQueue, AddToPlaylist]
  description: "LocalQueueOptions. Queue modification verbs available for current state."
```

## Variables
```yaml
# Filters used in HTTP Script example - included as Variables since they look like persistent state.
- id: music_filter
  label: Music Filter
  command: "SetMusicFilter {value}"
  description: "Filter for music browse. Set to Clear to reset."

- id: radio_filter
  label: Radio Filter
  command: "SetRadioFilter {value}"
  description: "Filter for radio browse. Set to Clear to reset."
```

## Events
```yaml
# Events section is subsumed by Feedbacks (above) plus the source-described envelope:
#
# Format: "EventReason Source Event=Value"
# Examples:
#   StateChanged Player_A TrackTime=121
#   ReportState Player_A MetaData1=Pandora: Stevie Ray Vaughan Radio
#
# Reasons observed in source: StateChanged, ReportState.
# Source = currently selected instance (e.g. Player_A).
```

## Macros
```yaml
# Recommended connection preamble (verbatim from source):
preamble:
  steps:
    - "SetClientType DemoClient"
    - "SetClientVersion 1.0.0.0"
    - "SetHost 192.168.0.100"
    - "SetXmlMode Lists"
    - "SetEncoding 65001"
    - "SetInstance Player_A"
    - "SubscribeEvents"
    - "GetStatus"

# Recommended HTTP batch for setting instance + subscribing (from source):
http_preamble:
  url_template: "http://{ip}/api/Script/SetInstance%20{instance}/SubscribeEvents%20True"

# Recommended HTTP browse example (from source):
http_browse_example:
  url_template: "http://{ip}/api/BrowsePresets/1/10"
  scripted_template: "http://{ip}/api/Script/SetMusicFilter%20Clear/SetRadioFilter%20Clear/BrowsePresets%201%2010/"

# UNRESOLVED: no other multi-step sequences defined in source.
```

## Safety
```yaml
# Trigger pin electrical limits (verbatim from source):
trigger_input_voltage: "5-24V AC or DC"  # verbatim
trigger_output: "12VDC 100mA max"  # verbatim
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no interlock, lockout, or power-on sequencing procedures described in source.
# No safety warnings other than trigger pin electrical specs.
```

## Notes
- All TCP commands + responses are CRLF-terminated.
- HTTP API commands map by replacing spaces with `/`. E.g. `SubscribeEvents True` → `GET /api/SubscribeEvents/True`. URL-encode parameters.
- HTTP responses arrive on next poll to bare `http://{ip}/api/`. Include `?clientId=<UUID>` on every command + poll request to prevent inter-client cross talk.
- HTTP requests are NOT ordered across sockets. Use `Script` to batch for ordered execution.
- Album art URL: `http://{ip}:5005/getart?...` (or `:80`). Fields: c, guid, fmt (png|jpg), instance, h, w, rfle, rflh, rflo, rz. Port may be omitted.
- SetVolume 0-50 only works on outputs configured for variable gain (System tab of device config page).
- `SetClientVersion` strongly recommended; server may adapt behavior to client version.
- `SetHost` is for cover-art URL generation in non-flat networks. Wrong value → perf/behavior degradation.
- `SubscribeEvents` follows the client across `SetInstance` switches — no re-subscribe needed.
- ThumbsDown=1 may auto-skip to next track on some services.
- SkipPrevious restarts current track if TrackTime >= 5 (where supported).
- ClearNowPlaying `False` → clears queue AND stops station playback; `True` (default) → clears queue but stations keep playing.
- `SetServiceAccount` accepts an optional `False` latching flag to pin account to a specific output. Omit (or `True`) for session-only.
- Browse button field values (0=Off, 1=Add, 2=Delete, 3=Play, 4=Power, 5=PowerOn, 6=Edit, 7=AllTracks, 8=ShuffleAll).

<!-- UNRESOLVED: firmware version compatibility, specific MMS hardware SKUs, default admin credentials (none documented — auth assumed none), full enumeration of all possible event reasons beyond StateChanged/ReportState, behavior when MMS rejects a command -->

## Provenance

```yaml
source_domains:
  - autonomic.atlassian.net
  - snapav.com
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - "https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/Amplifiers/ProtocolsAndDrivers/Autonomic%20MAS%20Control%20Protocol.pdf"
  - https://autonomic.atlassian.net/wiki
retrieved_at: 2026-05-19T22:32:35.415Z
last_checked_at: 2026-06-02T17:21:33.828Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:33.828Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec actions matched exactly to source command definitions; transport parameters verified; Feedbacks section covers all source events. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "which specific MMS hardware revisions / SKUs (MMS-1, MMS-2, MMS-5, etc.) the protocol covers — source is a generic \"MMS\" doc"
- "no other multi-step sequences defined in source."
- "no interlock, lockout, or power-on sequencing procedures described in source."
- "firmware version compatibility, specific MMS hardware SKUs, default admin credentials (none documented — auth assumed none), full enumeration of all possible event reasons beyond StateChanged/ReportState, behavior when MMS rejects a command"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
