---
spec_id: admin/bluos-pulse-series-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS Pulse Series Control Spec"
manufacturer: BluOS
model_family: PULSE
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - PULSE
    - "Bluesound PULSE"
    - "NAD CI580"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-16T22:00:59.334Z
last_checked_at: 2026-06-02T21:56:23.784Z
generated_at: 2026-06-02T21:56:23.784Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "No authentication procedure found in source — auth appears to be absent."
  - "Firmware version compatibility ranges not fully stated; some input selection commands vary by firmware version (v3.8.0, v4.2.0)."
  - "no unsolicited event/push mechanism documented in source beyond long-poll responses."
  - "no other multi-step macros explicitly described in source."
  - "no additional safety warnings or interlock procedures found in source."
  - "No authentication mechanism described; assumed open HTTP with no credentials."
  - "Firmware version compatibility ranges not comprehensively stated (only specific version thresholds noted for input selection)."
  - "Error response format not fully documented; source notes errors are enclosed in <error> root element with <message> and optional <detail> text nodes (mentioned only for /Browse)."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:56:23.784Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions traced to source. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS Pulse Series Control Spec

## Summary

The BluOS Pulse Series (and compatible BluOS players from Bluesound, NAD Electronics, DALI Loudspeakers, and others) are networked music streaming devices controlled via HTTP GET requests over TCP/IP. This spec covers the Custom Integration API v1.7, which provides commands for playback control, volume, play queue management, presets, content browsing, player grouping, and input selection. Responses are UTF-8 encoded XML. Player discovery is available via mDNS (services `musc.tcp` / `musp.tcp`) or the proprietary LSDP UDP broadcast protocol on port 11430.

<!-- UNRESOLVED: No authentication procedure found in source — auth appears to be absent. -->
<!-- UNRESOLVED: Firmware version compatibility ranges not fully stated; some input selection commands vary by firmware version (v3.8.0, v4.2.0). -->

## Transport

```yaml
protocols:
  - http
addressing:
  port: 11000  # stated: "Port 11000 is used for all BluOS players"; CI580 nodes use 11000/11010/11020/11030
  base_url: http://<player_ip>:11000
auth:
  type: none  # inferred: no auth procedure described in source
```

## Traits

```yaml
- queryable    # inferred from query command examples (/Status, /SyncStatus, /Volume, /Playlist, /Presets)
- levelable    # inferred from volume control commands (/Volume?level=, /Volume?db=, /Volume?mute=)
- routable     # inferred from input selection commands (/Play?url=, /Play?inputTypeIndex=) and player grouping (/AddSlave, /RemoveSlave)
- powerable    # inferred from /reboot command (POST /reboot); no explicit power on/off found beyond reboot
```

## Actions

```yaml
# --- Playback Control ---

- id: play
  label: Play
  kind: action
  description: Start playback of the current audio source.
  endpoint: GET /Play
  params: []

- id: play_seek
  label: Play with Seek
  kind: action
  description: Start playback at a specified position in the current track.
  endpoint: GET /Play
  params:
    - name: seek
      type: integer
      description: Position in seconds to jump to within the current track. Only valid if /Status response includes <totlen>.
    - name: id
      type: integer
      description: Optional track id (position in queue, 0-based). Use with seek.

- id: play_url
  label: Play URL
  kind: action
  description: Start playback of a custom stream URL.
  endpoint: GET /Play
  params:
    - name: url
      type: string
      description: URL-encoded stream URL to play.

- id: pause
  label: Pause
  kind: action
  description: Pause the currently playing audio.
  endpoint: GET /Pause
  params: []

- id: pause_toggle
  label: Pause Toggle
  kind: action
  description: Toggle the current pause state.
  endpoint: GET /Pause
  params:
    - name: toggle
      type: integer
      description: Set to 1 to toggle pause state.

- id: stop
  label: Stop
  kind: action
  description: Stop the currently playing audio.
  endpoint: GET /Stop
  params: []

- id: skip
  label: Skip (Next Track)
  kind: action
  description: Skip to the next audio track in the play queue.
  endpoint: GET /Skip
  params: []

- id: back
  label: Back (Previous Track)
  kind: action
  description: Go back to the beginning of the current track or to the previous track.
  endpoint: GET /Back
  params: []

- id: shuffle
  label: Shuffle
  kind: action
  description: Enable or disable shuffle on the current play queue.
  endpoint: GET /Shuffle
  params:
    - name: state
      type: integer
      description: "0 to disable shuffle; 1 to enable shuffle."

- id: repeat
  label: Repeat
  kind: action
  description: Set the repeat mode.
  endpoint: GET /Repeat
  params:
    - name: state
      type: integer
      description: "0 = repeat queue; 1 = repeat current track; 2 = repeat off."

- id: streaming_action
  label: Streaming Radio Action
  kind: action
  description: Execute a skip/back/love/ban action on a streaming radio station. Action URL is taken from the <action> element in /Status response.
  endpoint: GET /Action
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker).
    - name: skip
      type: string
      description: Track id to skip to (from action URL).
    - name: ban
      type: string
      description: Track id to ban (from action URL).
    - name: love
      type: string
      description: Track id to love (from action URL).

# --- Volume Control ---

- id: set_volume_level
  label: Set Volume Level
  kind: action
  description: Set the player volume as an absolute level (0-100).
  endpoint: GET /Volume
  params:
    - name: level
      type: integer
      description: Absolute volume level, integer from 0 to 100.
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player; 1 = all players in group."

- id: set_volume_db
  label: Set Volume (Absolute dB)
  kind: action
  description: Set the player volume using an absolute dB value.
  endpoint: GET /Volume
  params:
    - name: abs_db
      type: number
      description: Absolute volume level in dB.
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player; 1 = all players in group."

- id: adjust_volume_db
  label: Adjust Volume (Relative dB)
  kind: action
  description: Increase or decrease volume by a relative dB amount (e.g., +2 or -2).
  endpoint: GET /Volume
  params:
    - name: db
      type: number
      description: Relative volume change in dB. Positive to increase, negative to decrease.
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player; 1 = all players in group."

- id: mute_on
  label: Mute On
  kind: action
  description: Mute the player.
  endpoint: GET /Volume
  params:
    - name: mute
      type: integer
      description: Set to 1 to mute.

- id: mute_off
  label: Mute Off
  kind: action
  description: Unmute the player.
  endpoint: GET /Volume
  params:
    - name: mute
      type: integer
      description: Set to 0 to unmute.

# --- Play Queue Management ---

- id: list_queue
  label: List Play Queue
  kind: action
  description: Return tracks in the play queue, optionally paginated.
  endpoint: GET /Playlist
  params:
    - name: length
      type: integer
      description: "Optional. Set to 1 to return only queue status (no track details)."
    - name: start
      type: integer
      description: "Optional. First track index (0-based) to include."
    - name: end
      type: integer
      description: "Optional. Last track index to include."

- id: delete_track
  label: Delete Track from Queue
  kind: action
  description: Remove a track from the current play queue.
  endpoint: GET /Delete
  params:
    - name: id
      type: integer
      description: Track position (id) to delete from the queue.

- id: move_track
  label: Move Track in Queue
  kind: action
  description: Move a track within the current play queue.
  endpoint: GET /Move
  params:
    - name: new
      type: integer
      description: New position for the track.
    - name: old
      type: integer
      description: Current position of the track.

- id: clear_queue
  label: Clear Queue
  kind: action
  description: Remove all tracks from the current play queue.
  endpoint: GET /Clear
  params: []

- id: save_queue
  label: Save Queue
  kind: action
  description: Save the current play queue as a named BluOS playlist.
  endpoint: GET /Save
  params:
    - name: name
      type: string
      description: Name for the saved playlist (URL-encoded).

# --- Presets ---

- id: list_presets
  label: List Presets
  kind: action
  description: List all presets stored on the BluOS player.
  endpoint: GET /Presets
  params: []

- id: load_preset
  label: Load Preset
  kind: action
  description: Start playing a preset by id, or load the next/previous preset.
  endpoint: GET /Preset
  params:
    - name: id
      type: string
      description: "Preset id to load. Use +1 for next preset, -1 for previous preset."

# --- Content Browsing and Searching ---

- id: browse
  label: Browse Content
  kind: action
  description: Navigate through available music sources, inputs, and playlists. Omit key for top-level browse.
  endpoint: GET /Browse
  params:
    - name: key
      type: string
      description: "Optional. URL-encoded browse key from a previous /Browse response (browseKey, nextKey, parentKey, contextMenuKey)."
    - name: withContextMenuItems
      type: integer
      description: "Optional. Set to 1 to include inline context menus in the response."
    - name: q
      type: string
      description: "Optional. Search string. Used with key (searchKey) to search within a service."

# --- Player Grouping ---

- id: add_slave
  label: Group Player (Add Secondary)
  kind: action
  description: Add one secondary player to this primary player's group.
  endpoint: GET /AddSlave
  params:
    - name: slave
      type: string
      description: IP address of the secondary player.
    - name: port
      type: integer
      description: Port number of the secondary player (default 11000).
    - name: group
      type: string
      description: "Optional. Group name. BluOS assigns a default if not provided."

- id: add_slaves
  label: Group Multiple Players (Add Multiple Secondaries)
  kind: action
  description: Add two or more secondary players to this primary player's group.
  endpoint: GET /AddSlave
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players.
    - name: ports
      type: string
      description: Comma-separated port numbers corresponding to each secondary player.

- id: remove_slave
  label: Ungroup Player (Remove Secondary)
  kind: action
  description: Remove one player from a group.
  endpoint: GET /RemoveSlave
  params:
    - name: slave
      type: string
      description: IP address of the player to remove.
    - name: port
      type: integer
      description: Port number of the player to remove.

- id: remove_slaves
  label: Ungroup Multiple Players (Remove Multiple Secondaries)
  kind: action
  description: Remove two or more players from a group.
  endpoint: GET /RemoveSlave
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of players to remove.
    - name: ports
      type: string
      description: Comma-separated port numbers of players to remove.

# --- Reboot ---

- id: reboot
  label: Reboot Player
  kind: action
  description: Soft reboot the player. Sent as HTTP POST.
  endpoint: POST /reboot
  params:
    - name: yes
      type: string
      description: Any value (e.g., "1").

# --- Doorbell Chime ---

- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  description: Activate the doorbell chime on the player.
  endpoint: GET /Doorbell
  params:
    - name: play
      type: integer
      description: Set to 1 to play the doorbell chime.

# --- Direct Input Selection ---

- id: play_input_active
  label: Select Active Input (URL)
  kind: action
  description: Select an active input source using the URL from /RadioBrowse?service=Capture.
  endpoint: GET /Play
  params:
    - name: url
      type: string
      description: URL-encoded input URL from /RadioBrowse?service=Capture response.

- id: play_input_index
  label: Select External Input by Index (firmware <4.2.0)
  kind: action
  description: Select an external input by index (firmware v3.8.0 to <v4.2.0). Bluetooth excluded from index.
  endpoint: GET /Play
  params:
    - name: inputIndex
      type: integer
      description: 1-based index of input from /Settings?id=capture&schemaVersion=32, excluding Bluetooth.

- id: play_input_type_index
  label: Select External Input by Type+Index (firmware >=4.2.0)
  kind: action
  description: "Select an external input by type-index string (firmware v4.2.0+). Format: <type>-<index>."
  endpoint: GET /Play
  params:
    - name: inputTypeIndex
      type: string
      description: "Type-index string. Type values: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Index starts at 1. Example: spdif-2 for Optical Input 2."

# --- Bluetooth Mode ---

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  description: Change the Bluetooth mode of the player.
  endpoint: GET /audiomodes
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual; 1 = Automatic; 2 = Guest; 3 = Disabled."
```

## Feedbacks

```yaml
- id: playback_status
  label: Playback Status
  endpoint: GET /Status
  description: Returns volume, playback state, current track metadata, and player configuration. Supports long polling via timeout and etag parameters.
  type: xml
  key_attributes:
    - name: state
      type: enum
      values: [play, pause, stop, stream, connecting]
      description: Current player state.
    - name: volume
      type: integer
      description: Volume level 0-100; -1 if fixed volume.
    - name: mute
      type: integer
      description: "1 if muted, 0 if not."
    - name: title1
      type: string
      description: First line of now-playing metadata (use this, not name/artist/album directly).
    - name: title2
      type: string
      description: Second line of now-playing metadata.
    - name: title3
      type: string
      description: Third line of now-playing metadata.
    - name: shuffle
      type: integer
      description: "0 = shuffle off; 1 = shuffle on."
    - name: repeat
      type: integer
      description: "0 = repeat queue; 1 = repeat track; 2 = repeat off."
    - name: secs
      type: integer
      description: Seconds the current track has been playing. Not included in etag calculation.
    - name: totlen
      type: integer
      description: Total length of current track in seconds.
    - name: syncStat
      type: string
      description: Unique id that changes whenever /SyncStatus changes.
    - name: pid
      type: integer
      description: Current play queue id.
    - name: prid
      type: integer
      description: Current preset id.
    - name: etag
      type: string
      description: Opaque value for long-polling change detection.

- id: sync_status
  label: Player and Group Sync Status
  endpoint: GET /SyncStatus
  description: Returns player information and grouping info. Supports long polling via timeout and etag.
  type: xml
  key_attributes:
    - name: volume
      type: integer
      description: Volume level 0-100; -1 if fixed.
    - name: name
      type: string
      description: Player name.
    - name: modelName
      type: string
      description: Player model name (e.g., PULSE).
    - name: model
      type: string
      description: Player model id.
    - name: brand
      type: string
      description: Player brand.
    - name: group
      type: string
      description: Group name if player is in a group.
    - name: mute
      type: integer
      description: "1 if muted."
    - name: initialized
      type: boolean
      description: "true if player is set up; false if setup needed via BluOS Controller app."
    - name: syncStat
      type: string
      description: Unique id matching <syncStat> in /Status response.

- id: volume_status
  label: Volume Status
  endpoint: GET /Volume
  description: Returns current volume level, mute state, and dB values. Supports long polling.
  type: xml
  key_attributes:
    - name: volume
      type: integer
      description: Current volume 0-100; -1 for fixed.
    - name: db
      type: number
      description: Volume level in dB.
    - name: mute
      type: integer
      description: "1 if muted, 0 if unmuted."
    - name: muteVolume
      type: integer
      description: Pre-mute volume level (0-100), present only when muted.
    - name: muteDb
      type: number
      description: Pre-mute volume in dB, present only when muted.

- id: doorbell_status
  label: Doorbell Chime Status
  endpoint: GET /Doorbell
  type: xml
  key_attributes:
    - name: enable
      type: integer
      description: Indicates chime enable state.
    - name: volume
      type: integer
      description: Chime volume.
    - name: chime
      type: string
      description: Chime audio file URL.
```

## Variables

```yaml
- id: long_poll_timeout
  label: Long Poll Timeout (seconds)
  description: Recommended polling interval is 100s for /Status (not faster than 10s); 180s for /SyncStatus. Without long-polling, restrict polling to at most once every 30 seconds.
  type: integer

- id: volume_level
  label: Volume Level
  description: Integer 0-100. Constrained to the player's configured available volume range (typically -80..0 dB).
  type: integer
  range: [0, 100]
```

## Events

```yaml
# BluOS uses long-polling (etag + timeout parameters) to signal state changes on /Status and /SyncStatus.
# There are no unsolicited push notifications described in the source; clients must poll.
# UNRESOLVED: no unsolicited event/push mechanism documented in source beyond long-poll responses.
```

## Macros

```yaml
# --- Input Selection (two-step) ---
# Active input selection requires first calling GET /RadioBrowse?service=Capture to retrieve
# the URL attribute, then calling GET /Play?url=<URL> to activate the input.
# This two-step sequence is documented explicitly in section 11.1.

# UNRESOLVED: no other multi-step macros explicitly described in source.
```

## Safety

```yaml
confirmation_required_for:
  - reboot  # POST /reboot causes immediate soft reboot; user confirmation recommended
interlocks: []
# UNRESOLVED: no additional safety warnings or interlock procedures found in source.
```

## Notes

**Polling policy:** When long-polling is not used, clients must restrict polling to at most one request every 30 seconds. When long-polling is active, a client must not make two consecutive requests for the same resource less than one second apart.

**Long-polling pattern:** Pass `timeout` (seconds) and `etag` (from previous response root element) to /Status or /SyncStatus. Response is held until state changes or timeout expires. It is only necessary to long-poll one of /Status or /SyncStatus at a time; /Status includes a `<syncStat>` element to detect /SyncStatus changes.

**Player grouping — secondary players:** Requests directed to a secondary player for /Status, playback control, queue management, and content browsing are internally proxied to the primary player. Use /SyncStatus long-polling to track per-secondary-player volume.

**Port — multi-node devices:** The NAD CI580 has four streamer nodes in one chassis. Node 1 uses port 11000, node 2 uses 11010, node 3 uses 11020, node 4 uses 11030. Actual port should be discovered via mDNS services `musc.tcp` and `musp.tcp`, or via LSDP (UDP port 11430).

**Discovery — LSDP:** The Lenbrook Service Discovery Protocol (LSDP) uses UDP broadcast on port 11430 (IANA registered). BluOS players (class 0x0001) broadcast Announce messages approximately every minute; clients issue Query messages to discover players. LSDP is an alternative to mDNS/SSDP and is documented in Appendix 13.1.

**Input selection — firmware variants:** External input selection behavior differs by firmware version. For firmware v3.8.0 to <v4.2.0, use `/Play?inputIndex=<n>`. For firmware v4.2.0 or newer, use `/Play?inputTypeIndex=<type>-<index>`. Active inputs can always be selected via `/Play?url=<URL>` from /RadioBrowse?service=Capture.

**Streaming radio actions:** Skip/back/love/ban actions for streaming radio stations (e.g., Slacker, Radio Paradise, Amazon Music Prime Stations) are available via `/Action`. The specific URL is provided in the `<action>` element of the /Status response; clients should not construct these URLs independently.

**Reboot is HTTP POST:** `/reboot` requires an HTTP POST with body parameter `yes=<any-value>`, not a GET request.

**`secs` field and etag:** The `secs` field in /Status (elapsed playback seconds) is not included in the etag calculation. Progress does not trigger a long-poll return; clients must increment playback position locally based on elapsed time when state is `play` or `stream`.

**API version:** This spec is based on BluOS Custom Integration API Version 1.7.

<!-- UNRESOLVED: No authentication mechanism described; assumed open HTTP with no credentials. -->
<!-- UNRESOLVED: Firmware version compatibility ranges not comprehensively stated (only specific version thresholds noted for input selection). -->
<!-- UNRESOLVED: Error response format not fully documented; source notes errors are enclosed in <error> root element with <message> and optional <detail> text nodes (mentioned only for /Browse). -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-16T22:00:59.334Z
last_checked_at: 2026-06-02T21:56:23.784Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:56:23.784Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions traced to source. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "No authentication procedure found in source — auth appears to be absent."
- "Firmware version compatibility ranges not fully stated; some input selection commands vary by firmware version (v3.8.0, v4.2.0)."
- "no unsolicited event/push mechanism documented in source beyond long-poll responses."
- "no other multi-step macros explicitly described in source."
- "no additional safety warnings or interlock procedures found in source."
- "No authentication mechanism described; assumed open HTTP with no credentials."
- "Firmware version compatibility ranges not comprehensively stated (only specific version thresholds noted for input selection)."
- "Error response format not fully documented; source notes errors are enclosed in <error> root element with <message> and optional <detail> text nodes (mentioned only for /Browse)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
