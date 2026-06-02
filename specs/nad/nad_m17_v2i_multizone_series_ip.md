---
spec_id: admin/nad-m17-v2i-multizone-series-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD M17 V2i MultiZone Series Control Spec"
manufacturer: NAD
model_family: "NAD M17 V2i MultiZone Series"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "NAD M17 V2i MultiZone Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T22:09:46.883Z
last_checked_at: 2026-06-02T22:09:46.883Z
generated_at: 2026-06-02T22:09:46.883Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 / serial control not documented in this source (BluOS CI API only). Firmware version compatibility ranges not stated. Authentication credentials not mentioned."
  - "The BluOS API uses long polling rather than push notifications."
  - "no multi-step sequences described explicitly in source beyond the two-step"
  - "RS-232/serial control, Telnet control, and any non-HTTP control interface are not covered in the source document. Firmware version compatibility ranges beyond the inputIndex/inputTypeIndex distinction are not stated. Authentication mechanisms are not mentioned (assumed none)."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:09:46.883Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 spec actions traced to source (dip-safe re-verify). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# NAD M17 V2i MultiZone Series Control Spec

## Summary

The NAD M17 V2i MultiZone Series is a BluOS-enabled AV preamplifier/processor that supports network control via the BluOS Custom Integration API (version 1.7). All commands are sent as HTTP GET requests (except soft reboot which is HTTP POST) to the player's IP address on port 11000. The device responds with UTF-8 encoded XML data. The API supports playback control, volume management, play queue management, input selection, player grouping (multizone), content browsing, and device discovery via LSDP.

<!-- UNRESOLVED: RS-232 / serial control not documented in this source (BluOS CI API only). Firmware version compatibility ranges not stated. Authentication credentials not mentioned. -->

## Transport

```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "http://<player_ip>:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- powerable       # inferred from reboot command presence; power on/off not explicitly documented
- queryable       # inferred from query command examples (/Status, /SyncStatus, /Volume, /Playlist, /Presets)
- routable        # inferred from input selection and player grouping commands
- levelable       # inferred from volume control commands (/Volume?level=, /Volume?db=, /Volume?abs_db=)
```

## Actions

```yaml
- id: play
  label: Play
  kind: action
  description: Start playback of the current audio source.
  params: []
  wire:
    method: GET
    path: /Play

- id: play_seek
  label: Play with Seek
  kind: action
  description: Start playback at a specified position in the current track.
  params:
    - name: seek
      type: integer
      description: Position in seconds to seek to in the current track.
  wire:
    method: GET
    path: /Play?seek={seek}

- id: play_url
  label: Play Stream URL
  kind: action
  description: Start playback of a custom streamed audio URL.
  params:
    - name: url
      type: string
      description: URL-encoded stream URL to play.
  wire:
    method: GET
    path: /Play?url={url}

- id: play_input_active
  label: Select Active Input
  kind: action
  description: Select an active input source by its URL from /RadioBrowse?service=Capture.
  params:
    - name: url
      type: string
      description: URL-encoded input URL from /RadioBrowse?service=Capture response.
  wire:
    method: GET
    path: /Play?url={url}

- id: play_input_by_index
  label: Select External Input by Index (firmware < 4.2.0)
  kind: action
  description: Select external input by index number (BluOS firmware newer than v3.8.0 and older than v4.2.0). Index starts at 1; Bluetooth excluded.
  params:
    - name: inputIndex
      type: integer
      description: Index of input from /Settings?id=capture response, excluding Bluetooth (1-based).
  wire:
    method: GET
    path: /Play?inputIndex={inputIndex}

- id: play_input_by_type_index
  label: Select External Input by Type-Index (firmware >= 4.2.0)
  kind: action
  description: Select external input by type and index (BluOS firmware v4.2.0 or newer).
  params:
    - name: inputTypeIndex
      type: string
      description: "Type-index string, e.g. 'spdif-1', 'analog-1', 'bluetooth-1', 'arc-1', 'earc-1', 'phono-1', 'coax-1', 'computer-1', 'aesebu-1', 'balanced-1', 'microphone-1'."
  wire:
    method: GET
    path: /Play?inputTypeIndex={inputTypeIndex}

- id: pause
  label: Pause
  kind: action
  description: Pause the current playing audio.
  params: []
  wire:
    method: GET
    path: /Pause

- id: pause_toggle
  label: Pause Toggle
  kind: action
  description: Toggle the current pause state.
  params: []
  wire:
    method: GET
    path: /Pause?toggle=1

- id: stop
  label: Stop
  kind: action
  description: Stop the current playing audio.
  params: []
  wire:
    method: GET
    path: /Stop

- id: skip
  label: Skip
  kind: action
  description: Skip to the next audio track in the play queue.
  params: []
  wire:
    method: GET
    path: /Skip

- id: back
  label: Back
  kind: action
  description: Go back to the beginning of the track or previous track in the play queue.
  params: []
  wire:
    method: GET
    path: /Back

- id: set_volume
  label: Set Volume
  kind: action
  description: Set the absolute volume level (0–100).
  params:
    - name: level
      type: integer
      description: Volume level from 0 to 100.
    - name: tell_slaves
      type: integer
      description: "Optional. 0 = only this player; 1 = all players in group."
  wire:
    method: GET
    path: /Volume?level={level}

- id: volume_up
  label: Volume Up
  kind: action
  description: Increase volume by a relative dB amount (typical value 2 dB).
  params:
    - name: db
      type: number
      description: Positive dB value to increase volume by (e.g. 2).
  wire:
    method: GET
    path: /Volume?db={db}

- id: volume_down
  label: Volume Down
  kind: action
  description: Decrease volume by a relative dB amount (typical value -2 dB).
  params:
    - name: db
      type: number
      description: Negative dB value to decrease volume by (e.g. -2).
  wire:
    method: GET
    path: /Volume?db={db}

- id: volume_abs_db
  label: Set Volume (dB)
  kind: action
  description: Set the absolute volume level using a dB scale.
  params:
    - name: abs_db
      type: number
      description: Absolute dB volume value.
  wire:
    method: GET
    path: /Volume?abs_db={abs_db}

- id: mute_on
  label: Mute
  kind: action
  description: Mute the player.
  params: []
  wire:
    method: GET
    path: /Volume?mute=1

- id: mute_off
  label: Unmute
  kind: action
  description: Unmute the player.
  params: []
  wire:
    method: GET
    path: /Volume?mute=0

- id: shuffle_on
  label: Shuffle On
  kind: action
  description: Enable shuffle on the current play queue.
  params: []
  wire:
    method: GET
    path: /Shuffle?state=1

- id: shuffle_off
  label: Shuffle Off
  kind: action
  description: Disable shuffle.
  params: []
  wire:
    method: GET
    path: /Shuffle?state=0

- id: repeat_set
  label: Set Repeat
  kind: action
  description: Set the repeat mode (0=repeat queue, 1=repeat track, 2=off).
  params:
    - name: state
      type: integer
      description: "0 = repeat queue, 1 = repeat current track, 2 = repeat off."
  wire:
    method: GET
    path: /Repeat?state={state}

- id: load_preset
  label: Load Preset
  kind: action
  description: Load a preset by preset ID. Use +1 or -1 to navigate to next/previous preset.
  params:
    - name: id
      type: string
      description: "Preset id number, +1 for next, or -1 for previous."
  wire:
    method: GET
    path: /Preset?id={id}

- id: browse
  label: Browse Content
  kind: action
  description: Browse available music sources, inputs, and playlists.
  params:
    - name: key
      type: string
      description: Optional URL-encoded key from a previous browse response. Absent for top-level browse.
  wire:
    method: GET
    path: /Browse?key={key}

- id: search
  label: Search Content
  kind: action
  description: Search within a music service.
  params:
    - name: key
      type: string
      description: Value from a searchKey attribute in a previous browse response.
    - name: q
      type: string
      description: The search string.
  wire:
    method: GET
    path: /Browse?key={key}&q={q}

- id: delete_track
  label: Delete Track from Queue
  kind: action
  description: Remove a track from the current play queue.
  params:
    - name: id
      type: integer
      description: Track id (position) of the track to be deleted.
  wire:
    method: GET
    path: /Delete?id={id}

- id: move_track
  label: Move Track in Queue
  kind: action
  description: Move a track from one position to another within the play queue.
  params:
    - name: old
      type: integer
      description: Current position of the track.
    - name: new
      type: integer
      description: Destination position of the track.
  wire:
    method: GET
    path: /Move?new={new}&old={old}

- id: clear_queue
  label: Clear Queue
  kind: action
  description: Remove all tracks from the current play queue.
  params: []
  wire:
    method: GET
    path: /Clear

- id: save_queue
  label: Save Queue
  kind: action
  description: Save the current play queue as a named BluOS playlist.
  params:
    - name: name
      type: string
      description: Name for the saved playlist.
  wire:
    method: GET
    path: /Save?name={name}

- id: add_slave
  label: Group Player (Add Secondary)
  kind: action
  description: Add a secondary player to this (primary) player's group.
  params:
    - name: slave
      type: string
      description: IP address of the secondary player.
    - name: port
      type: integer
      description: Port of the secondary player (default 11000).
    - name: group
      type: string
      description: Optional group name.
  wire:
    method: GET
    path: /AddSlave?slave={slave}&port={port}

- id: add_slaves
  label: Group Multiple Players
  kind: action
  description: Add two or more secondary players to this (primary) player's group.
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players.
    - name: ports
      type: string
      description: Comma-separated port numbers of secondary players.
  wire:
    method: GET
    path: /AddSlave?slaves={slaves}&ports={ports}

- id: remove_slave
  label: Ungroup Player (Remove Secondary)
  kind: action
  description: Remove a secondary player from the group.
  params:
    - name: slave
      type: string
      description: IP address of the secondary player to remove.
    - name: port
      type: integer
      description: Port of the secondary player.
  wire:
    method: GET
    path: /RemoveSlave?slave={slave}&port={port}

- id: remove_slaves
  label: Ungroup Multiple Players
  kind: action
  description: Remove two or more secondary players from the group.
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players to remove.
    - name: ports
      type: string
      description: Comma-separated port numbers of secondary players.
  wire:
    method: GET
    path: /RemoveSlave?slaves={slaves}&ports={ports}

- id: reboot
  label: Soft Reboot
  kind: action
  description: Soft reboot the player. Sent as HTTP POST.
  params:
    - name: yes
      type: string
      description: Any value (e.g. 1).
  wire:
    method: POST
    path: /reboot

- id: doorbell_chime
  label: Doorbell Chime
  kind: action
  description: Activate doorbell chime.
  params: []
  wire:
    method: GET
    path: /Doorbell?play=1

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  description: Change Bluetooth operating mode.
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled."
  wire:
    method: GET
    path: /audiomodes?bluetoothAutoplay={bluetoothAutoplay}

- id: streaming_action
  label: Streaming Radio Action
  kind: action
  description: Execute a skip, back, love, or ban action on a supported streaming radio station (e.g. Slacker, Radio Paradise, Amazon Music). The specific URL is provided in the /Status response <actions> element.
  params:
    - name: action_url
      type: string
      description: Action URL as provided in the <action> element of the /Status response (e.g. /Action?service=Slacker&skip=...).
  wire:
    method: GET
    path: "{action_url}"
```

## Feedbacks

```yaml
- id: playback_status
  label: Playback Status
  type: object
  description: Full playback and volume state returned by /Status. Includes state (play/pause/stop/stream/connecting), volume (0-100 or -1 for fixed), mute (0/1), artist, album, track title, shuffle (0/1), repeat (0/1/2), position (secs), track length (totlen), service, quality, and more.
  wire:
    method: GET
    path: /Status

- id: sync_status
  label: Player and Group Sync Status
  type: object
  description: Player identity and grouping information returned by /SyncStatus. Includes player name, model, brand, volume, mute, group name, master/slave IPs, zone information, and schemaVersion.
  wire:
    method: GET
    path: /SyncStatus

- id: volume_state
  label: Volume State
  type: object
  description: Current volume returned by /Volume (no parameters). Includes volume (0-100), db (dB level), mute (0/1), muteVolume, muteDb.
  wire:
    method: GET
    path: /Volume

- id: playlist_state
  label: Play Queue State
  type: object
  description: Current play queue status and track listing returned by /Playlist.
  wire:
    method: GET
    path: /Playlist

- id: presets_list
  label: Presets List
  type: object
  description: All configured presets returned by /Presets. Each preset includes id, name, url, and image.
  wire:
    method: GET
    path: /Presets

- id: browse_result
  label: Browse Result
  type: object
  description: Content browse result returned by /Browse. Includes items of various types (audio, link, artist, album, track, playlist, etc.) with browseKey, playURL, and other navigation attributes.
  wire:
    method: GET
    path: /Browse

- id: input_list
  label: Active Input List
  type: object
  description: List of active inputs returned by /RadioBrowse?service=Capture. Includes Bluetooth, Analog, Optical, Spotify, and hub inputs with their URL values for use with /Play?url=.
  wire:
    method: GET
    path: /RadioBrowse?service=Capture

- id: capture_settings
  label: Capture Input Settings
  type: object
  description: All configured capture inputs in order, returned by /Settings?id=capture&schemaVersion=32. Used to determine inputIndex values for external input selection (firmware < 4.2.0).
  wire:
    method: GET
    path: /Settings?id=capture&schemaVersion=32
```

## Variables

```yaml
- id: long_poll_timeout
  label: Long-Poll Timeout
  type: integer
  description: "When using long polling on /Status or /SyncStatus, provide a timeout parameter (seconds). Recommended: 100 seconds for /Status, 180 seconds for /SyncStatus. Never faster than 10 seconds for /Status. When not using long polling, restrict polling to at most once every 30 seconds."

- id: long_poll_etag
  label: Long-Poll ETag
  type: string
  description: The etag attribute from the previous /Status or /SyncStatus response. Passed back in the next long-poll request so the server can detect changes and return early.
```

## Events

```yaml
# UNRESOLVED: The BluOS API uses long polling rather than push notifications.
# The player does not send unsolicited notifications; clients must poll /Status
# or /SyncStatus with long-poll parameters. No separate event/push mechanism
# is documented in the source.
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source beyond the two-step
# input selection procedure (query /RadioBrowse?service=Capture, then /Play?url=...).
```

## Safety

```yaml
confirmation_required_for:
  - reboot
interlocks: []
# NOTE: The /reboot command (POST /reboot?yes=1) soft-reboots the player immediately.
# User confirmation is advisable before issuing this command in an integration.
# No other safety warnings or power interlock sequences are documented in the source.
```

## Notes

- **Port:** All BluOS commands use port 11000. The exception is multi-node devices such as the CI580 (four streamers in one chassis): node 1 uses port 11000, node 2 uses 11010, node 3 uses 11020, node 4 uses 11030. For the M17 V2i, port 11000 is expected, but the actual port should be confirmed via MDNS discovery using services `musc._tcp` and `musp._tcp`.

- **Protocol version:** The source document is BluOS Custom Integration API version 1.7 (dated 2025-04-09). It documents a subset of the full BluOS API.

- **Response format:** All responses are UTF-8 encoded XML. Undocumented XML elements and attributes should be ignored.

- **Long polling:** Two polling mechanisms are supported. Regular polling returns immediately; long polling keeps the connection open until state changes or timeout. For /Status, use `timeout` (recommended ~100 s, minimum 10 s) and `etag` parameters. For /SyncStatus, recommended interval is 180 s. Only /Status or /SyncStatus needs long polling at any one time; the /Status `<syncStat>` element indicates if /SyncStatus has changed.

- **Grouped players:** When players are grouped, secondary players proxy most requests (/Status, Playback Control, Play Queue Management, Browsing) to the primary player. /SyncStatus long polling is required to track volume of individual secondary players.

- **Input selection (firmware version dependency):** The `/Play?inputIndex=` parameter works for BluOS firmware newer than v3.8.0 and older than v4.2.0. The `/Play?inputTypeIndex=` parameter requires BluOS firmware v4.2.0 or newer. For active inputs, `/Play?url=` (with URL from /RadioBrowse?service=Capture) works across firmware versions.

- **Volume range:** Volume is constrained to the player's configured available range (typically -80 to 0 dB). The range can be adjusted in the BluOS Controller app under Settings → Player → Audio.

- **Reboot:** The soft reboot command uses HTTP POST (`curl -d yes=1 <player_ip>/reboot`), not GET. Note this endpoint omits the port in the source example; port 11000 should be assumed.

- **Discovery — LSDP:** The Lenbrook Service Discovery Protocol (LSDP) uses UDP broadcast on port 11430. Class 0x0001 = BluOS Player (`_musc._tcp`). The protocol broadcasts Announce messages approximately every minute at steady state.

- **Streaming radio actions:** Skip, back, love, and ban actions on streaming radio stations (e.g. Slacker, Radio Paradise, Amazon Music Prime) are available only when a `<streamUrl>` element is present in the /Status response and the corresponding `<action>` element is present with a URL.

- **Polling rate guideline:** When not using long polling, clients must restrict to at most one request every 30 seconds. When using long polling, no two consecutive requests for the same resource should be made less than 1 second apart.

<!-- UNRESOLVED: RS-232/serial control, Telnet control, and any non-HTTP control interface are not covered in the source document. Firmware version compatibility ranges beyond the inputIndex/inputTypeIndex distinction are not stated. Authentication mechanisms are not mentioned (assumed none). -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T22:09:46.883Z
last_checked_at: 2026-06-02T22:09:46.883Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:09:46.883Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 spec actions traced to source (dip-safe re-verify). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 / serial control not documented in this source (BluOS CI API only). Firmware version compatibility ranges not stated. Authentication credentials not mentioned."
- "The BluOS API uses long polling rather than push notifications."
- "no multi-step sequences described explicitly in source beyond the two-step"
- "RS-232/serial control, Telnet control, and any non-HTTP control interface are not covered in the source document. Firmware version compatibility ranges beyond the inputIndex/inputTypeIndex distinction are not stated. Authentication mechanisms are not mentioned (assumed none)."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
