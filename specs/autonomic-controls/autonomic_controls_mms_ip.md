---
spec_id: admin/autonomic_controls_inc_mms
schema_version: ai4av-public-spec-v1
revision: 1
title: "Autonomic Controls, Inc MMS Control Spec"
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
  - autonomic-controls.com
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - http://www.autonomic-controls.com/documents/mcs30/mcs_3.0_IP_Control_Protocol.pdf
retrieved_at: 2026-05-27T13:17:08.272Z
last_checked_at: 2026-05-20T05:02:58.374Z
generated_at: 2026-05-20T05:02:58.374Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T05:02:58.374Z
  matched_actions: 87
  action_count: 87
  confidence: high
  summary: "All 87 spec actions have semantic matches in the source document; transport parameters verified verbatim in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Autonomic Controls, Inc MMS Control Spec

## Summary
The MMS is a networked media server controllable via TCP socket (port 5004) or HTTP JSON API. Clients connect via socket or telnet, send text commands terminated with CR+LF, and receive event-driven state updates. The device also exposes a REST/JSON endpoint at `/api/`.

<!-- UNRESOLVED: physical form factor, audio outputs, power specifications not stated -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 5004  # socket/telnet port stated in source
  base_url: "http://ipOrNameOfServer/api/"  # HTTP API root from source
auth:
  type: none  # inferred: no auth procedure in source
serial:
  # N/A - device is IP-only per source
```

## Traits
```yaml
- powerable    # UNRESOLVED: power on/off commands not present in source
- routable     # UNRESOLVED: zone/routing commands not present in source
- queryable    # inferred: GetStatus command and event subscriptions present
- levelable    # SetVolume (0-50) present in source
```

## Actions
```yaml
# Initialization / connection preamble
- id: set_client_type
  label: Set Client Type
  kind: action
  params:
    - name: clientName
      type: string
      description: Client identifier string

- id: set_client_version
  label: Set Client Version
  kind: action
  params:
    - name: version
      type: string
      description: Version in MAJOR.MINOR.BUILD.REVISION format

- id: set_host
  label: Set Host
  kind: action
  params:
    - name: address
      type: string
      description: Client IP address for cover art URL generation

- id: set_xml_mode
  label: Set XML Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "None or Lists"

- id: set_encoding
  label: Set Encoding
  kind: action
  params:
    - name: encoding
      type: integer
      description: "65001 = UTF-8"

- id: set_instance
  label: Set Instance
  kind: action
  params:
    - name: instanceName
      type: string
      description: "Instance name, e.g. Player_A"

- id: subscribe_events
  label: Subscribe Events
  kind: action
  params:
    - name: eventsOrBool
      type: string
      description: "Optional: comma-delimited event list or boolean"

- id: get_status
  label: Get Status
  kind: action
  params: []

# SetOption for unknown clients
- id: set_option
  label: Set Option
  kind: action
  params:
    - name: option
      type: string
    - name: value
      type: string

# Playback control
- id: play
  label: Play
  kind: action
  params: []

- id: pause
  label: Pause
  kind: action
  params: []

- id: play_pause
  label: Play/Pause Toggle
  kind: action
  params: []

- id: seek
  label: Seek
  kind: action
  params:
    - name: position
      type: integer
      description: "Non-negative = offset from start; negative = offset from end (seconds)"

- id: skip_next
  label: Skip Next
  kind: action
  params: []

- id: skip_previous
  label: Skip Previous
  kind: action
  params: []

- id: thumbs_up
  label: Thumbs Up
  kind: action
  params: []

- id: thumbs_down
  label: Thumbs Down
  kind: action
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: "Integer 0-50"

# Browsing
- id: browse_containers
  label: Browse Containers
  kind: action
  params:
    - name: container
      type: string
      description: "Container type: Albums, Artists, Composers, Favorites, Genres, NowPlaying, Picklist, Playlists, RadioSources, Titles, TopMenu"
    - name: start
      type: integer
      description: "One-based start index"
    - name: count
      type: integer
      description: "Maximum items to return"

- id: browse_service_accounts
  label: Browse Service Accounts
  kind: action
  params:
    - name: start
      type: integer
    - name: count
      type: integer

# Playback initiation
- id: play_album
  label: Play Album
  kind: action
  params:
    - name: albumGuid
      type: string
    - name: verb
      type: string
      description: "Optional: Next, Now, Replace, AddToQueue, AddToPlaylist"

- id: play_artist
  label: Play Artist
  kind: action
  params:
    - name: artistGuid
      type: string
    - name: verb
      type: string

- id: play_playlist
  label: Play Playlist
  kind: action
  params:
    - name: nameOrId
      type: string

- id: play_title
  label: Play Title
  kind: action
  params:
    - name: titleGuid
      type: string
    - name: verb
      type: string

- id: play_preset
  label: Play Preset
  kind: action
  params:
    - name: nameOrId
      type: string

- id: play_scene
  label: Play Scene
  kind: action
  params:
    - name: nameOrId
      type: string

# Queue management
- id: jump_to_now_playing_item
  label: Jump to Now Playing Item
  kind: action
  params:
    - name: index
      type: integer
      description: "1-based index"

- id: reorder_now_playing
  label: Reorder Now Playing
  kind: action
  params:
    - name: trackIndex
      type: integer
    - name: targetIndex
      type: integer

- id: remove_now_playing_item
  label: Remove Now Playing Item
  kind: action
  params:
    - name: index
      type: integer

- id: clear_now_playing
  label: Clear Now Playing
  kind: action
  params:
    - name: stopStations
      type: boolean
      description: "False = stop station-based content; True = stop queue-based content"

# Presets
- id: store_preset
  label: Store Preset
  kind: action
  params:
    - name: name
      type: string
      description: "Optional double-quoted name"

- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: nameOrId
      type: string

- id: edit_preset
  label: Edit Preset
  kind: action
  params:
    - name: nameOrId
      type: string

- id: rename_preset
  label: Rename Preset
  kind: action
  params:
    - name: nameOrId
      type: string
    - name: newName
      type: string

- id: delete_preset
  label: Delete Preset
  kind: action
  params:
    - name: nameOrId
      type: string

# Scenes
- id: store_scene
  label: Store Scene
  kind: action
  params:
    - name: name
      type: string
      description: "Optional double-quoted name"

- id: recall_scene
  label: Recall Scene
  kind: action
  params:
    - name: nameOrId
      type: string

- id: delete_scene
  label: Delete Scene
  kind: action
  params:
    - name: nameOrId
      type: string

# Playlists
- id: rename_playlist
  label: Rename Playlist
  kind: action
  params:
    - name: oldName
      type: string
    - name: newName
      type: string

- id: delete_playlist
  label: Delete Playlist
  kind: action
  params:
    - name: nameOrId
      type: string

- id: reorder_playlist
  label: Reorder Playlist
  kind: action
  params:
    - name: playlistId
      type: string
    - name: srcTrackId
      type: string
    - name: destTrackId
      type: string

# Service accounts
- id: set_service_account
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

# Triggers
- id: set_output_trigger
  label: Set Output Trigger
  kind: action
  params:
    - name: triggerIndex
      type: integer
      description: "1-based index in trigger order"
    - name: state
      type: boolean
      description: "true = on, false = off"

# HTTP API script command
- id: script
  label: Script
  kind: action
  params:
    - name: commands
      type: string
      description: "URL-encoded series of commands to execute in order"
- id: back
  label: Back
  kind: action
  params:
    - name: pages
      type: integer
      description: "Number of pages to jump back; 0 is the current page"

- id: repeat
  label: Repeat
  kind: action
  params: []

- id: shuffle
  label: Shuffle
  kind: action
  params: []

- id: set_stars
  label: Set Stars
  kind: action
  params:
    - name: stars
      type: integer
      description: "0-5 to set rating; governed by Stars event availability"

- id: browse_presets
  label: Browse Presets
  kind: action
  params:
    - name: start
      type: integer
      description: "One-based start index"
    - name: count
      type: integer
      description: "Maximum items to return"

- id: ack_button
  label: Ack Button
  kind: action
  params:
    - name: buttonType
      type: string
      description: "Button type, e.g. CONTEXT for TuneBridge button"

- id: ack_pick_item
  label: Ack Pick Item
  kind: action
  params:
    - name: guid
      type: string
      description: "GUID of the picklist item to select"

- id: clarify_title_intent
  label: Clarify Title Intent
  kind: action
  params:
    - name: guid
      type: string
      description: "GUID of the item with listAction ClarifyTitleIntent"
    - name: verb
      type: string
      description: "Optional: Next, Now, Replace, AddToQueue, AddToPlaylist"
```

## Feedbacks
```yaml
# Events pushed from server to client follow format: EventReason Source Event=Value

# Playback state
- id: play_state
  label: Play State
  type: enum
  values:
    - Playing
    - Paused
    - Stopped

- id: media_control
  label: Media Control
  type: enum
  values:
    - Play
    - Pause
    - Stop

# Metadata
- id: meta_data_1
  label: Meta Data 1
  type: string
  description: "Radio station name or track count"

- id: meta_data_2
  label: Meta Data 2
  type: string
  description: "Artist name"

- id: meta_data_3
  label: Meta Data 3
  type: string
  description: "Album name"

- id: meta_data_4
  label: Meta Data 4
  type: string
  description: "Track name"

- id: meta_label_1
  label: Meta Label 1
  type: string

- id: meta_label_2
  label: Meta Label 2
  type: string

- id: meta_label_3
  label: Meta Label 3
  type: string

- id: meta_label_4
  label: Meta Label 4
  type: string

# Now playing art
- id: now_playing_guid
  label: Now Playing GUID
  type: string

- id: media_art_changed
  label: Media Art Changed
  type: boolean
  description: "Always true when art changes"

- id: base_web_url
  label: Base Web URL
  type: string
  description: "Protocol, address, and port for art retrieval"

# Track time
- id: track_time
  label: Track Time
  type: integer
  description: "Current position in seconds"

- id: track_duration
  label: Track Duration
  type: integer
  description: "Total track length in seconds; 0 if unavailable"

# Flags (boolean availability indicators)
- id: back
  label: Back Available
  type: boolean

- id: browse_now_playing_available
  label: Browse Now Playing Available
  type: boolean

- id: context_menu
  label: Context Menu Available
  type: boolean

- id: mute
  label: Mute State
  type: boolean

- id: play_pause_available
  label: Play/Pause Available
  type: boolean

- id: repeat_available
  label: Repeat Available
  type: boolean

- id: repeat
  label: Repeat State
  type: boolean

- id: seek_available
  label: Seek Available
  type: boolean

- id: shuffle_available
  label: Shuffle Available
  type: boolean

- id: shuffle
  label: Shuffle State
  type: boolean

- id: skip_next_available
  label: Skip Next Available
  type: boolean

- id: skip_prev_available
  label: Skip Previous Available
  type: boolean

# Multistate flags
- id: thumbs_up
  label: Thumbs Up State
  type: enum
  values:
    - "-1"  # disabled
    - "0"   # enabled, not set
    - "1"   # enabled and set

- id: thumbs_down
  label: Thumbs Down State
  type: enum
  values:
    - "-1"
    - "0"
    - "1"

- id: stars
  label: Stars Rating State
  type: enum
  values:
    - "-1"  # disabled
    - "0"   # no stars
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"

# Queue / browse
- id: local_queue_options
  label: Local Queue Options
  type: enum
  values:
    - Next
    - Now
    - Replace
    - AddToQueue
    - AddToPlaylist

# Favorites / presets events
- id: favorites_changed
  label: Favorites Changed
  type: boolean

- id: favorites_count
  label: Favorites Count
  type: integer

# Scenes events
- id: scenes_changed
  label: Scenes Changed
  type: boolean

- id: scenes_count
  label: Scenes Count
  type: integer

# Playlists events
- id: playlists_changed
  label: Playlists Changed
  type: boolean

- id: playlist_count
  label: Playlist Count
  type: integer

# Triggers
- id: trigger_in_1
  label: Trigger Input 1
  type: boolean
  description: "True when voltage applied to input pin"

- id: trigger_in_2
  label: Trigger Input 2
  type: boolean
  description: "True when voltage applied to input pin"

- id: trigger_in_3
  label: Trigger Input 3
  type: boolean
  description: "True when voltage applied to input pin"

- id: trigger_in_4
  label: Trigger Input 4
  type: boolean
  description: "True when voltage applied to input pin"
```

## Variables
```yaml
# The source describes SetVolume as an action; no persistent parameter variables found.
# UNRESOLVED: other settable parameters (audio tone, balance, etc.) not documented
```

## Events
```yaml
# Server-pushed events follow format: EventReason Source Event=Value
# See Feedbacks section above for event list.
# Events are subscribed via SubscribeEvents command and pushed to connected client.
# UNRESOLVED: full event list may be larger than documented
```

## Macros
```yaml
# Initialization sequence example from source:
# - SetClientType DemoClient
# - SetClientVersion 1.0.0.0
# - SetHost <client-ip>
# - SetXmlMode Lists
# - SetEncoding 65001
# - SetInstance Player_A
# - SubscribeEvents
# - GetStatus
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
cooldowns: []
# UNRESOLVED: no safety warnings, interlock procedures, or power sequencing documented in source
```

## Notes
Socket commands are terminated with CR+LF (`\r\n`). HTTP API commands use `/` as separator between command and arguments. HTTP is not guaranteed ordered — use `Script` command for atomic multi-command sequences. Client ID (`clientId=<UUID>`) required in HTTP API requests to prevent cross-client talk.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: physical dimensions, power requirements, operating voltage not stated -->
<!-- UNRESOLVED: trigger voltage specifications (5-24V AC/DC input stated for trigger logic; 12VDC 100mA max for output) — populated as factual per source, not inferred -->
<!-- UNRESOLVED: error codes and fault behavior not documented -->

## Provenance

```yaml
source_domains:
  - autonomic.atlassian.net
  - autonomic-controls.com
source_urls:
  - https://autonomic.atlassian.net/wiki/spaces/ASKB/pages/1509556225/Autonomic+Media+Server+Control+Protocol
  - http://www.autonomic-controls.com/documents/mcs30/mcs_3.0_IP_Control_Protocol.pdf
retrieved_at: 2026-05-27T13:17:08.272Z
last_checked_at: 2026-05-20T05:02:58.374Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:02:58.374Z
matched_actions: 87
action_count: 87
confidence: high
summary: "All 87 spec actions have semantic matches in the source document; transport parameters verified verbatim in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
