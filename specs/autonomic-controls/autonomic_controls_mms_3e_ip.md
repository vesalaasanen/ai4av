---
spec_id: admin/autonomic-controls-inc-mms-3e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Autonomic Controls Mirage Media Server (MMS-3e) Control Spec"
manufacturer: "Autonomic Controls"
model_family: MMS-3e
aliases: []
compatible_with:
  manufacturers:
    - "Autonomic Controls"
    - "Autonomic Controls, Inc"
  models:
    - MMS-3e
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
retrieved_at: 2026-06-16T01:47:44.926Z
last_checked_at: 2026-10-07T13:51:19.279Z
generated_at: 2026-10-07T13:51:19.279Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - BrowseRadioGenres
  - BrowseRadioStations
  - "The source references an HTTP JSON API (\"see the end of this document\") and Album Art / Presets / Playlists / Now Playing sections that are not present in the provided refined excerpt; those command sets are not represented here."
  - "SetStars argument syntax not documented in source; Stars event ranges -1..5"
  - "argument syntax referenced but not documented in source body"
  - "command named in changelog v1.9 (\"Add argument details to ClearNowPlaying\"); argument syntax not present in provided excerpt"
  - "command named in changelog v1.5 (\"Add PlayPlaylist command\"); argument syntax not present in provided excerpt"
  - "SetVolume (0-50) is settable, but no Volume state-reporting event is"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "The provided refined excerpt ends at the Browse section. The source's introductory text references Presets, Playlists, Now Playing, Album Art, and an HTTP JSON API (\"see the end of this document\") whose command catalogues are not present and are therefore not represented. Several commands (SetStars, SetPickListCount, ClearNowPlaying, PlayPlaylist) are only referenced by name or in the version history; their argument syntax could not be populated without fabricating. Firmware version compatibility and the older mcs_3.0 IP Control Protocol PDF commands are out of scope of this excerpt."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:51:19.279Z
  matched_actions: 72
  action_count: 72
  confidence: medium
  summary: "All 72 action units match source commands/events and transport (tcp 5004) supported; only two minor browseAction tokens unrepresented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Autonomic Controls Mirage Media Server (MMS-3e) Control Spec

## Summary
The MMS-3e is an Autonomic Controls Mirage Media Server, a multi-source networked audio player. This spec covers the TCP socket / telnet control protocol used to connect, browse local and online content, control playback, and subscribe to state events on the selected output instance.

<!-- UNRESOLVED: The source references an HTTP JSON API ("see the end of this document") and Album Art / Presets / Playlists / Now Playing sections that are not present in the provided refined excerpt; those command sets are not represented here. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 5004
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

Connection is a socket or telnet connection to port 5004 on the device's IP address. Commands and responses are terminated with a carriage return + line feed (CRLF). No login or password procedure is described anywhere in the source.

## Traits
```yaml
# - queryable  (inferred from GetStatus and browse/status query commands)
# - levelable  (inferred from SetVolume 0-50)
traits:
  - queryable
  - levelable
```

## Actions
```yaml
# Connection / preamble
- id: set_client_type
  label: Set Client Type
  kind: action
  command: "SetClientType {client_type}"
  params:
    - name: client_type
      type: string
      description: Identifies the control client to the MMS

- id: set_client_version
  label: Set Client Version
  kind: action
  command: "SetClientVersion {version}"
  params:
    - name: version
      type: string
      description: "Version string in MAJOR.MINOR.BUILD.REVISION format"

- id: set_host
  label: Set Host
  kind: action
  command: "SetHost {address}"
  params:
    - name: address
      type: string
      description: Address the client used to connect to the MMS (used for generated art URLs)

- id: set_xml_mode
  label: Set XML Mode
  kind: action
  command: "SetXmlMode {mode}"
  params:
    - name: mode
      type: string
      description: "None or Lists (Lists = send lists as XML)"

- id: set_encoding
  label: Set Encoding
  kind: action
  command: "SetEncoding {codepage}"
  params:
    - name: codepage
      type: integer
      description: "Windows codepage; 65001 = UTF-8"

- id: set_instance
  label: Set Instance
  kind: action
  command: "SetInstance {instance}"
  params:
    - name: instance
      type: string
      description: "Output name subsequent browse/control commands target (e.g. Player_A)"

- id: subscribe_events
  label: Subscribe Events
  kind: action
  command: "SubscribeEvents {filter}"
  params:
    - name: filter
      type: string
      description: "Optional boolean (true/false) or comma-delimited list of events to limit subscription; if missing, subscribes to all events"

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
      description: "supports_playnow | supports_inputbox | supports_urls"
    - name: value
      type: boolean
      description: "true/false"

# Transport control
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
      description: "Non-negative (0..TrackDuration = relative to start) or negative (-1..-TrackDuration = relative to end)"

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
  label: Thumbs Up Toggle
  kind: action
  command: "ThumbsUp"
  params: []

- id: thumbs_down
  label: Thumbs Down Toggle
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
      description: "0-50; output must be in variable gain mode"

- id: repeat
  label: Repeat Toggle
  kind: action
  command: "Repeat"
  params: []

- id: shuffle
  label: Shuffle Toggle
  kind: action
  command: "Shuffle"
  params: []

- id: set_stars
  label: Set Stars
  kind: action
  command: "SetStars"
  params: []  # UNRESOLVED: SetStars argument syntax not documented in source; Stars event ranges -1..5

- id: back
  label: Back
  kind: action
  command: "Back {count}"
  params:
    - name: count
      type: integer
      description: Number of pages to jump back in the navigation stack (0 = current page)

# Browse
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
  label: Browse Now Playing (Queue)
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
  command: "BrowseTopMenu {itemGuid}"
  params:
    - name: itemGuid
      type: string
      description: "Optional; form 'itemGuid=<childGuid>' requests content within a child node"

- id: browse_service_accounts
  label: Browse Service Accounts
  kind: query
  command: "BrowseServiceAccounts {start} {count}"
  params:
    - name: start
      type: integer
    - name: count
      type: integer

- id: ack_pick_item
  label: Acknowledge Pick Item
  kind: action
  command: "AckPickItem {guid}"
  params:
    - name: guid
      type: string
      description: GUID of the picklist item to select (used when no listAction attribute present)

# Filters / accounts
- id: set_music_filter
  label: Set Music Filter
  kind: action
  command: "SetMusicFilter {filter}"
  params:
    - name: filter
      type: string
      description: "Clear is documented in source (clears the local content filter)"

- id: set_radio_filter
  label: Set Radio Filter
  kind: action
  command: "SetRadioFilter Source={guid}"
  params:
    - name: guid
      type: string
      description: GUID of the online radio source (from BrowseRadioSources)

- id: set_service_account
  label: Set Service Account
  kind: action
  command: "SetServiceAccount {serviceGuid} {accountGuid} {latching}"
  params:
    - name: serviceGuid
      type: string
      description: "Service GUID (or service name/'Clear' for clear forms)"
    - name: accountGuid
      type: string
      description: "Account GUID (or 'Clear' for clear forms)"
    - name: latching
      type: boolean
      description: "Optional trailing False = apply per-output (latching). Clear forms: 'SetServiceAccount Service Clear False' (one service) or 'SetServiceAccount Clear Clear False' (all services)"

- id: ack_button
  label: Acknowledge Button
  kind: action
  command: "AckButton {button}"
  params:
    - name: button
      type: string
      description: "CONTEXT is documented (TuneBridge button); other button names not enumerated in source"

- id: set_picklist_count
  label: Set Picklist Count
  kind: action
  command: "SetPicklistCount"
  params: []  # UNRESOLVED: argument syntax referenced but not documented in source body

# Commands named in version history only (payload not documented)
- id: clear_now_playing
  label: Clear Now Playing
  kind: action
  command: "ClearNowPlaying"
  params: []  # UNRESOLVED: command named in changelog v1.9 ("Add argument details to ClearNowPlaying"); argument syntax not present in provided excerpt

- id: play_playlist
  label: Play Playlist
  kind: action
  command: "PlayPlaylist"
  params: []  # UNRESOLVED: command named in changelog v1.5 ("Add PlayPlaylist command"); argument syntax not present in provided excerpt
```

## Feedbacks
```yaml
# Observable state values delivered via ReportState/StateChanged events (see Events).
- id: play_state
  type: enum
  values: [Playing, Paused, Stopped]
  query_command: "GetStatus"

- id: media_control
  type: enum
  values: [Play, Pause, Stop]
  query_command: "GetStatus"

- id: track_time
  type: integer
  description: Current track position in seconds (non-negative)
  query_command: "GetStatus"

- id: track_duration
  type: integer
  description: Total track length in seconds; 0 when unknown (e.g. broadcast radio)
  query_command: "GetStatus"

- id: metadata1
  type: string
  description: Generally radio station name or track count data
  query_command: "GetStatus"
- id: metadata2
  type: string
  description: Generally artist name
  query_command: "GetStatus"
- id: metadata3
  type: string
  description: Generally album name
  query_command: "GetStatus"
- id: metadata4
  type: string
  description: Generally track name
  query_command: "GetStatus"
- id: metalabel1
  type: string
  description: Label for MetaData1
  query_command: "GetStatus"
- id: metalabel2
  type: string
  description: Label for MetaData2
  query_command: "GetStatus"
- id: metalabel3
  type: string
  description: Label for MetaData3
  query_command: "GetStatus"
- id: metalabel4
  type: string
  description: Label for MetaData4
  query_command: "GetStatus"

- id: now_playing_guid
  type: string
  description: GUID of the now playing item
  query_command: "GetStatus"

- id: media_art_changed
  type: boolean
  description: Always true; signals art for current item changed and should be refreshed
  query_command: "GetStatus"

- id: base_web_url
  type: string
  description: "Protocol/address/port portion of the art URL (e.g. http://192.168.0.59:5005)"
  query_command: "GetStatus"

# Boolean availability / state flags
- id: back_available
  type: boolean
  description: True if anything is in the navigation stack
  query_command: "GetStatus"
- id: browse_now_playing_available
  type: boolean
  description: True if a queue is available to browse (>0 items)
  query_command: "GetStatus"
- id: context_menu
  type: boolean
  description: True if AckButton CONTEXT is valid / TuneBridge button should show
  query_command: "GetStatus"
- id: mute
  type: boolean
  description: True if the selected instance is muted
  query_command: "GetStatus"
- id: play_pause_available
  type: boolean
  query_command: "GetStatus"
- id: repeat_available
  type: boolean
  query_command: "GetStatus"
- id: repeat_enabled
  type: boolean
  query_command: "GetStatus"
- id: seek_available
  type: boolean
  query_command: "GetStatus"
- id: shuffle_available
  type: boolean
  query_command: "GetStatus"
- id: shuffle_enabled
  type: boolean
  query_command: "GetStatus"
- id: skip_next_available
  type: boolean
  query_command: "GetStatus"
- id: skip_prev_available
  type: boolean
  query_command: "GetStatus"

# Multistate values
- id: thumbs_up
  type: integer
  description: "-1 disabled/not available, 0 enabled+unset, 1 enabled+set"
  query_command: "GetStatus"
- id: thumbs_down
  type: integer
  description: "-1 disabled/not available, 0 enabled+unset, 1 enabled+set"
  query_command: "GetStatus"
- id: stars
  type: integer
  description: "-1 disabled, 0-5 enabled showing that many stars (SetStars availability)"
  query_command: "GetStatus"
```

## Variables
```yaml
# UNRESOLVED: SetVolume (0-50) is settable, but no Volume state-reporting event is
# documented in the provided excerpt, so a reportable volume variable cannot be populated.
```

## Events
```yaml
# Unsolicited notifications pushed to clients after SubscribeEvents / GetStatus.
# Format: "EventReason Source Event=Value"
#   e.g. "StateChanged Player_A TrackTime=121"
#        "ReportState Player_A MetaData2=Stevie Ray Vaughan"
#
# EventReason values observed: StateChanged, ReportState
# Source is the instance name (e.g. Player_A)
#
# Subscribed event names (the Event key) include:
#   TrackTime, TrackDuration, PlayState, MediaControl,
#   MetaData1..4, MetaLabel1..4, NowPlayingGuid, MediaArtChanged, BaseWebUrl,
#   Back, BrowseNowPlayingAvailable, ContextMenu, Mute, PlayPauseAvailable,
#   RepeatAvailable, Repeat, SeekAvailable, ShuffleAvailable, Shuffle,
#   SkipNextAvailable, SkipPrevAvailable, ThumbsUp, ThumbsDown, Stars
#
# Events follow the selected instance; switching via SetInstance moves the
# subscription to that instance without resubscription.
```

## Macros
```yaml
# The source documents a recommended connection preamble (a multi-command init
# sequence), not a device-side macro. Send in order on connect:
#   SetClientType <name>
#   SetClientVersion <MAJOR.MINOR.BUILD.REVISION>
#   SetHost <address>
#   SetXmlMode Lists
#   SetEncoding 65001
#   SetInstance <instance>
#   SubscribeEvents
#   GetStatus
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements are stated in the provided source excerpt.
```

## Notes
- Commands and responses are terminated with carriage return + line feed (CRLF).
- Connection is a raw socket or telnet session to TCP port 5004.
- `SetHost` should reflect the address the client used to reach the MMS; setting it to an unreachable address degrades performance.
- Browse responses are XML when `SetXmlMode Lists` is set, otherwise text mode. XML is recommended.
- List-item `button` attribute integer values: 0 Off, 1 Add, 2 Delete, 3 Play, 4 Power, 5 PowerOn, 6 Edit, 7 AllTracks, 8 ShuffleAll.
- Album art is fetched over HTTP on port 5005 (BaseWebUrl); this is a side channel, not the control protocol.
- `SetServiceAccount` preferred-account selection is per-connection lifetime and must be resent on reconnect.

<!-- UNRESOLVED: The provided refined excerpt ends at the Browse section. The source's introductory text references Presets, Playlists, Now Playing, Album Art, and an HTTP JSON API ("see the end of this document") whose command catalogues are not present and are therefore not represented. Several commands (SetStars, SetPickListCount, ClearNowPlaying, PlayPlaylist) are only referenced by name or in the version history; their argument syntax could not be populated without fabricating. Firmware version compatibility and the older mcs_3.0 IP Control Protocol PDF commands are out of scope of this excerpt. -->
````

## Provenance

```yaml
source_domains:
  - autonomic.atlassian.net
  - snapav.com
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - "https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/Amplifiers/ProtocolsAndDrivers/Autonomic%20MAS%20Control%20Protocol.pdf"
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/overview
retrieved_at: 2026-06-16T01:47:44.926Z
last_checked_at: 2026-10-07T13:51:19.279Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:51:19.279Z
matched_actions: 72
action_count: 72
confidence: medium
summary: "All 72 action units match source commands/events and transport (tcp 5004) supported; only two minor browseAction tokens unrepresented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- BrowseRadioGenres
- BrowseRadioStations
- "The source references an HTTP JSON API (\"see the end of this document\") and Album Art / Presets / Playlists / Now Playing sections that are not present in the provided refined excerpt; those command sets are not represented here."
- "SetStars argument syntax not documented in source; Stars event ranges -1..5"
- "argument syntax referenced but not documented in source body"
- "command named in changelog v1.9 (\"Add argument details to ClearNowPlaying\"); argument syntax not present in provided excerpt"
- "command named in changelog v1.5 (\"Add PlayPlaylist command\"); argument syntax not present in provided excerpt"
- "SetVolume (0-50) is settable, but no Volume state-reporting event is"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "The provided refined excerpt ends at the Browse section. The source's introductory text references Presets, Playlists, Now Playing, Album Art, and an HTTP JSON API (\"see the end of this document\") whose command catalogues are not present and are therefore not represented. Several commands (SetStars, SetPickListCount, ClearNowPlaying, PlayPlaylist) are only referenced by name or in the version history; their argument syntax could not be populated without fabricating. Firmware version compatibility and the older mcs_3.0 IP Control Protocol PDF commands are out of scope of this excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
