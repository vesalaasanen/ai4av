---
spec_id: admin/autonomic-favorites
schema_version: ai4av-public-spec-v1
revision: 1
title: "Autonomic Favorites Control Spec"
manufacturer: "Autonomic Controls"
model_family: "Mirage Media Server (MMS)"
aliases: []
compatible_with:
  manufacturers:
    - "Autonomic Controls"
    - Autonomic
  models:
    - "Mirage Media Server (MMS)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - autonomic.atlassian.net
  - cpllc.net
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/25821397/Programmatically+using+Presets
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/25821281/Programmatically+Using+Favorites+with+Crestron+Smart+Graphics
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/25788736/Control+System+Connections
  - https://cpllc.net/wp-content/uploads/CPLLC/CPLLC.Autonomic.Favorites.pdf
retrieved_at: 2026-06-20T18:39:28.658Z
last_checked_at: 2026-06-23T09:50:15.723Z
generated_at: 2026-06-23T09:50:15.723Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document notes that sections on Directly Addressable Content, Modifying the Queue, Presets, Scenes, Playlists, Now Playing, Triggers, Album Art, and JSON HTTP API were truncated in the crawled source. Those sections are not represented in this spec."
  - "SetPickListCount is referenced in the source example but not formally defined as a command; no formal variable table in the captured source"
  - "Sections on Directly Addressable Content, Modifying the Queue, Presets, Scenes, Playlists, Now Playing, Triggers, Album Art, and JSON HTTP API were explicitly noted as truncated in the source. Commands from those sections are absent from this spec."
  - "SetPickListCount command syntax not formally defined in captured source."
  - "Back <int> command — governed by Back event but full syntax not documented in captured content."
  - "Repeat toggle command — referenced indirectly via RepeatAvailable flag but syntax not captured."
  - "Shuffle toggle command — referenced indirectly via ShuffleAvailable flag but syntax not captured."
  - "SetStars command — referenced indirectly via Stars event but syntax not captured."
  - "AckButton CONTEXT — referenced indirectly via ContextMenu flag but syntax not captured."
verification:
  verdict: verified
  checked_at: 2026-06-23T09:50:15.723Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions matched literally in source; transport TCP port 5004 verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Autonomic Favorites Control Spec

## Summary
The Autonomic Mirage Media Server (MMS) exposes a TCP socket/Telnet control protocol on port 5004. This spec covers the connection preamble commands, playback control, browsing, presets, playlists, now-playing queries, and the event model as documented in the Autonomic Media Server Control Protocol v2.6. Commands and responses are terminated with CR+LF. An HTTP JSON API is also referenced in the source but its endpoints were not captured in the crawled content.

<!-- UNRESOLVED: The source document notes that sections on Directly Addressable Content, Modifying the Queue, Presets, Scenes, Playlists, Now Playing, Triggers, Album Art, and JSON HTTP API were truncated in the crawled source. Those sections are not represented in this spec. -->

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
- queryable   # inferred from GetStatus and browse query commands
- levelable   # inferred from SetVolume command
```

## Actions
```yaml
# --- Connection Preamble ---

- id: set_client_type
  label: Set Client Type
  kind: action
  command: "SetClientType {clientType}"
  params:
    - name: clientType
      type: string
      description: Identifier string for the control client (e.g. DemoClient)

- id: set_client_version
  label: Set Client Version
  kind: action
  command: "SetClientVersion {version}"
  params:
    - name: version
      type: string
      description: Version string in MAJOR.MINOR.BUILD.REVISION format (e.g. 1.0.0.0)

- id: set_host
  label: Set Host
  kind: action
  command: "SetHost {ipAddress}"
  params:
    - name: ipAddress
      type: string
      description: IP address the client used to connect to the MMS; used for cover-art URL generation

- id: set_xml_mode
  label: Set XML Mode
  kind: action
  command: "SetXmlMode {mode}"
  params:
    - name: mode
      type: enum
      values: [None, Lists]
      description: "None = text mode; Lists = XML mode for list responses (recommended)"

- id: set_encoding
  label: Set Encoding
  kind: action
  command: "SetEncoding {codePage}"
  params:
    - name: codePage
      type: integer
      description: "Windows code page number; 65001 = UTF-8"

- id: set_instance
  label: Set Instance
  kind: action
  command: "SetInstance {instanceName}"
  params:
    - name: instanceName
      type: string
      description: Output instance name (e.g. Player_A); subsequent browse and control commands target this instance

- id: subscribe_events
  label: Subscribe Events
  kind: action
  command: "SubscribeEvents {filter}"
  params:
    - name: filter
      type: string
      description: "Optional: true (all events), false, or comma-delimited list of event names to subscribe to. Omit for all events."

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
      type: enum
      values: [supports_playnow, supports_inputbox, supports_urls]
      description: Option key to configure
    - name: value
      type: enum
      values: [true, false]
      description: Option value

# --- Playback Control ---

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
  label: Play/Pause Toggle
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
      description: "Non-negative: seek from start of track (0 to TrackDuration). Negative: seek from end of track (-1 to -TrackDuration)."

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
      description: Volume level 0–50; output must be configured in variable gain mode

# --- Browsing ---

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
      description: One-based start index
    - name: count
      type: integer
      description: Maximum number of items to return

- id: browse_composers
  label: Browse Composers
  kind: query
  command: "BrowseComposers {start} {count}"
  params:
    - name: start
      type: integer
      description: One-based start index
    - name: count
      type: integer
      description: Maximum number of items to return

- id: browse_favorites
  label: Browse Favorites
  kind: query
  command: "BrowseFavorites {start} {count}"
  params:
    - name: start
      type: integer
      description: One-based start index
    - name: count
      type: integer
      description: Maximum number of items to return

- id: browse_genres
  label: Browse Genres
  kind: query
  command: "BrowseGenres {start} {count}"
  params:
    - name: start
      type: integer
      description: One-based start index
    - name: count
      type: integer
      description: Maximum number of items to return

- id: browse_now_playing
  label: Browse Now Playing
  kind: query
  command: "BrowseNowPlaying {start} {count}"
  params:
    - name: start
      type: integer
      description: One-based start index
    - name: count
      type: integer
      description: Maximum number of items to return

- id: browse_picklist
  label: Browse Picklist
  kind: query
  command: "BrowsePicklist {start} {count}"
  params:
    - name: start
      type: integer
      description: One-based start index
    - name: count
      type: integer
      description: Maximum number of items to return

- id: browse_playlists
  label: Browse Playlists
  kind: query
  command: "BrowsePlaylists {start} {count}"
  params:
    - name: start
      type: integer
      description: One-based start index
    - name: count
      type: integer
      description: Maximum number of items to return

- id: browse_radio_sources
  label: Browse Radio Sources
  kind: query
  command: "BrowseRadioSources {start} {count}"
  params:
    - name: start
      type: integer
      description: One-based start index
    - name: count
      type: integer
      description: Maximum number of items to return

- id: browse_titles
  label: Browse Titles
  kind: query
  command: "BrowseTitles {start} {count}"
  params:
    - name: start
      type: integer
      description: One-based start index
    - name: count
      type: integer
      description: Maximum number of items to return

- id: browse_top_menu
  label: Browse Top Menu
  kind: query
  command: "BrowseTopMenu"
  params: []

- id: browse_top_menu_item
  label: Browse Top Menu (specific child node)
  kind: query
  command: "BrowseTopMenu itemGuid={childGuid}"
  params:
    - name: childGuid
      type: string
      description: GUID of the child node to browse

- id: browse_service_accounts
  label: Browse Service Accounts
  kind: query
  command: "BrowseServiceAccounts"
  params: []

- id: set_music_filter_clear
  label: Clear Music Filter
  kind: action
  command: "SetMusicFilter Clear"
  params: []

- id: set_radio_filter_source
  label: Set Radio Filter Source
  kind: action
  command: "SetRadioFilter Source={serviceGuid}"
  params:
    - name: serviceGuid
      type: string
      description: GUID of the streaming service obtained via BrowseRadioSources

- id: ack_pick_item
  label: Acknowledge Pick Item
  kind: action
  command: "AckPickItem {guid}"
  params:
    - name: guid
      type: string
      description: GUID of the picklist item to select (used when no listAction attribute is present)

- id: set_service_account
  label: Set Service Account (session)
  kind: action
  command: "SetServiceAccount {serviceGuid} {accountGuid}"
  params:
    - name: serviceGuid
      type: string
      description: GUID of the streaming service (from BrowseRadioSources)
    - name: accountGuid
      type: string
      description: GUID of the account (from BrowseServiceAccounts)

- id: set_service_account_latched
  label: Set Service Account (latched/persistent per output)
  kind: action
  command: "SetServiceAccount {serviceGuid} {accountGuid} False"
  params:
    - name: serviceGuid
      type: string
      description: GUID of the streaming service
    - name: accountGuid
      type: string
      description: GUID of the account
  notes: Appending False makes the account selection persistent for the output

- id: set_service_account_clear_service
  label: Clear Latched Service Account for One Service
  kind: action
  command: "SetServiceAccount {service} Clear False"
  params:
    - name: service
      type: string
      description: Name or GUID of the streaming service whose latched account should be cleared

- id: set_service_account_clear_all
  label: Clear All Latched Service Accounts
  kind: action
  command: "SetServiceAccount Clear Clear False"
  params: []
```

## Feedbacks
```yaml
# --- Metadata Events ---
- id: meta_data_1
  type: string
  event: "MetaData1"
  description: Generally reserved for radio station name or track count data

- id: meta_data_2
  type: string
  event: "MetaData2"
  description: Generally reserved for artist name

- id: meta_data_3
  type: string
  event: "MetaData3"
  description: Generally reserved for album name

- id: meta_data_4
  type: string
  event: "MetaData4"
  description: Generally reserved for track name

- id: meta_label_1
  type: string
  event: "MetaLabel1"
  description: Label for MetaData1 field

- id: meta_label_2
  type: string
  event: "MetaLabel2"
  description: Label for MetaData2 field

- id: meta_label_3
  type: string
  event: "MetaLabel3"
  description: Label for MetaData3 field

- id: meta_label_4
  type: string
  event: "MetaLabel4"
  description: Label for MetaData4 field

- id: now_playing_guid
  type: string
  event: "NowPlayingGuid"
  description: ID of the now-playing item (e.g. {20dd901a-b092-3386-dc16-6b56f38a811e})

- id: media_art_changed
  type: boolean
  event: "MediaArtChanged"
  values: [true]
  description: Indicates art has changed for the current item without NowPlayingGuid changing; always true; triggers art refresh

- id: base_web_url
  type: string
  event: "BaseWebUrl"
  description: Protocol, address, and port portion of the URL to retrieve album art (e.g. http://192.168.0.59:5005)

# --- Track Time Events ---
- id: track_time
  type: integer
  event: "TrackTime"
  description: Current playback position in seconds (non-negative integer)

- id: track_duration
  type: integer
  event: "TrackDuration"
  description: Total track length in seconds; 0 if not available (e.g. broadcast radio)

# --- Playback State Events ---
- id: play_state
  type: enum
  event: "PlayState"
  values: [Playing, Paused, Stopped]
  description: Current play state of the output

- id: media_control
  type: enum
  event: "MediaControl"
  values: [Play, Pause, Stop]
  description: Current play state of the output (alternate form)

# --- Boolean Flag Events ---
- id: flag_back
  type: boolean
  event: "Back"
  values: [true, false]
  description: Whether there is history in the navigation stack; use Back <int> to navigate back

- id: flag_browse_now_playing_available
  type: boolean
  event: "BrowseNowPlayingAvailable"
  values: [true, false]
  description: Whether a queue is available to browse (queue has >0 items)

- id: flag_context_menu
  type: boolean
  event: "ContextMenu"
  values: [true, false]
  description: Whether AckButton CONTEXT is a valid command

- id: flag_mute
  type: boolean
  event: "Mute"
  values: [true, false]
  description: Whether the selected instance is muted

- id: flag_play_pause_available
  type: boolean
  event: "PlayPauseAvailable"
  values: [true, false]
  description: Whether Play, Pause, and PlayPause commands are valid

- id: flag_repeat_available
  type: boolean
  event: "RepeatAvailable"
  values: [true, false]
  description: Whether Repeat command is valid

- id: flag_repeat
  type: boolean
  event: "Repeat"
  values: [true, false]
  description: Whether Repeat is currently enabled

- id: flag_seek_available
  type: boolean
  event: "SeekAvailable"
  values: [true, false]
  description: Whether Seek command is valid

- id: flag_shuffle_available
  type: boolean
  event: "ShuffleAvailable"
  values: [true, false]
  description: Whether Shuffle command is valid

- id: flag_shuffle
  type: boolean
  event: "Shuffle"
  values: [true, false]
  description: Whether Shuffle is currently enabled

- id: flag_skip_next_available
  type: boolean
  event: "SkipNextAvailable"
  values: [true, false]
  description: Whether SkipNext command is valid

- id: flag_skip_prev_available
  type: boolean
  event: "SkipPrevAvailable"
  values: [true, false]
  description: Whether SkipPrevious command is valid

# --- Multistate Flag Events ---
- id: flag_thumbs_up
  type: integer
  event: "ThumbsUp"
  values: [-1, 0, 1]
  description: "-1=disabled/unavailable; 0=enabled, not set; 1=enabled and set"

- id: flag_thumbs_down
  type: integer
  event: "ThumbsDown"
  values: [-1, 0, 1]
  description: "-1=disabled/unavailable; 0=enabled, not set; 1=enabled and set; on some services, setting to 1 also skips to next track"

- id: flag_stars
  type: integer
  event: "Stars"
  values: [-1, 0, 1, 2, 3, 4, 5]
  description: "-1=disabled/unavailable; 0-5=star rating currently set; SetStars command available when ≥0"
```

## Variables
```yaml
# UNRESOLVED: SetPickListCount is referenced in the source example but not formally defined as a command; no formal variable table in the captured source
```

## Events
```yaml
# Events are pushed from the server in the format:
#   EventReason Instance Event=Value
# EventReason is typically StateChanged or ReportState
# All feedback fields listed in the Feedbacks section are delivered as events.
# Example: StateChanged Player_A TrackTime=121
# Example: ReportState Player_A MetaData2=Stevie Ray Vaughan
```

## Macros
```yaml
# Connection preamble sequence as documented in source:
- id: standard_connection_preamble
  label: Standard Connection Preamble
  steps:
    - command: "SetClientType DemoClient"
    - command: "SetClientVersion 1.0.0.0"
    - command: "SetHost {mmsIpAddress}"
    - command: "SetXmlMode Lists"
    - command: "SetEncoding 65001"
    - command: "SetInstance Player_A"
    - command: "SubscribeEvents"
    - command: "GetStatus"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings or interlock procedures were documented in the captured source.
```

## Notes
- Commands and responses are terminated with CR+LF (carriage return + line feed).
- The `SetInstance` command must be sent before browse/control commands to direct them to the correct output. The subscription (SubscribeEvents) follows the client from instance to instance — no resubscription is needed after SetInstance.
- The `SetHost` command is only strictly necessary in non-flat network configurations but is not harmful to send in simpler setups. Setting it to an unreachable address causes performance degradation.
- `BrowseTopMenu` can accept an `itemGuid=<guid>` argument to browse a specific child node, bypassing the standard top-level picklist response.
- `SetServiceAccount` with a trailing `False` argument makes the account selection latched (persistent) for the output; without `False` it is session-scoped.
- The source references `SetPickListCount` in an example without formally defining it as a command in the captured text.
- The source references an `AckButton CONTEXT` command (governed by the ContextMenu flag) but does not provide further definition in the captured content.
- The source references a `Back <int>` command (governed by the Back flag) but its full definition was not in the captured content.
- The source references `Repeat`, `Shuffle`, `SetStars`, and `SetMusicFilter` commands by name in flag descriptions but their full command syntax was not explicitly documented in the captured content.
- The HTTP JSON API is referenced but the endpoints were not captured in the crawled source.
<!-- UNRESOLVED: Sections on Directly Addressable Content, Modifying the Queue, Presets, Scenes, Playlists, Now Playing, Triggers, Album Art, and JSON HTTP API were explicitly noted as truncated in the source. Commands from those sections are absent from this spec. -->
<!-- UNRESOLVED: SetPickListCount command syntax not formally defined in captured source. -->
<!-- UNRESOLVED: Back <int> command — governed by Back event but full syntax not documented in captured content. -->
<!-- UNRESOLVED: Repeat toggle command — referenced indirectly via RepeatAvailable flag but syntax not captured. -->
<!-- UNRESOLVED: Shuffle toggle command — referenced indirectly via ShuffleAvailable flag but syntax not captured. -->
<!-- UNRESOLVED: SetStars command — referenced indirectly via Stars event but syntax not captured. -->
<!-- UNRESOLVED: AckButton CONTEXT — referenced indirectly via ContextMenu flag but syntax not captured. -->

## Provenance

```yaml
source_domains:
  - autonomic.atlassian.net
  - cpllc.net
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/25821397/Programmatically+using+Presets
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/25821281/Programmatically+Using+Favorites+with+Crestron+Smart+Graphics
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/25788736/Control+System+Connections
  - https://cpllc.net/wp-content/uploads/CPLLC/CPLLC.Autonomic.Favorites.pdf
retrieved_at: 2026-06-20T18:39:28.658Z
last_checked_at: 2026-06-23T09:50:15.723Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T09:50:15.723Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions matched literally in source; transport TCP port 5004 verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document notes that sections on Directly Addressable Content, Modifying the Queue, Presets, Scenes, Playlists, Now Playing, Triggers, Album Art, and JSON HTTP API were truncated in the crawled source. Those sections are not represented in this spec."
- "SetPickListCount is referenced in the source example but not formally defined as a command; no formal variable table in the captured source"
- "Sections on Directly Addressable Content, Modifying the Queue, Presets, Scenes, Playlists, Now Playing, Triggers, Album Art, and JSON HTTP API were explicitly noted as truncated in the source. Commands from those sections are absent from this spec."
- "SetPickListCount command syntax not formally defined in captured source."
- "Back <int> command — governed by Back event but full syntax not documented in captured content."
- "Repeat toggle command — referenced indirectly via RepeatAvailable flag but syntax not captured."
- "Shuffle toggle command — referenced indirectly via ShuffleAvailable flag but syntax not captured."
- "SetStars command — referenced indirectly via Stars event but syntax not captured."
- "AckButton CONTEXT — referenced indirectly via ContextMenu flag but syntax not captured."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
