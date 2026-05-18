---
spec_id: admin/bluos-c-700-volume-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS C 700 Volume Control Control Spec"
manufacturer: BluOS
model_family: "C 700"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "C 700"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-03T07:12:55.041Z
last_checked_at: 2026-05-16T19:11:51.402Z
generated_at: 2026-05-16T19:11:51.402Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - /Action
  - /RadioBrowse
verification:
  verdict: verified
  checked_at: 2026-05-16T19:11:51.402Z
  matched_actions: 34
  action_count: 34
  confidence: high
  summary: "All 34 spec actions match verbatim HTTP paths in the BluOS CI API source; only /Action and /RadioBrowse not represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# BluOS C 700 Volume Control Control Spec

## Summary

The BluOS C 700 is a network-connected audio player running the BluOS operating system. This spec covers the BluOS Custom Integration API (version 1.7), which exposes HTTP GET/POST endpoints for volume control, playback control, play queue management, content browsing, player grouping, and direct input selection. All commands are sent to `http://<player_ip>:<port>/<request>`; port 11000 is used for all BluOS players except the CI580. Responses are UTF-8 encoded XML.

<!-- UNRESOLVED: the source document is the generic BluOS Custom Integration API and covers many product models (Bluesound, NAD, DALI, etc.); it is not specific to the C 700. C 700-specific input types, hardware capabilities, and firmware compatibility range are not stated. -->

## Transport

```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "http://<player_ip>:11000"
  # Note: CI580 uses ports 11000/11010/11020/11030 for its four nodes.
  # Port should be confirmed via MDNS (services musc.tcp / musp.tcp) or LSDP discovery.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- levelable       # inferred from volume set/up/down/mute commands in section 3
- queryable       # inferred from /Status, /SyncStatus, /Volume query endpoints
- powerable       # inferred from /reboot command in section 9 (soft reboot only; power on/off not documented)
- routable        # inferred from direct input selection commands in section 11
```

## Actions

```yaml
# --- Volume Control (section 3) ---

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Absolute volume level 0–100
    - name: tell_slaves
      type: integer
      description: "0 = only this player; 1 = all players in group"
      required: false
  http:
    method: GET
    path: /Volume
    query_params: "level={level}&tell_slaves={tell_slaves}"

- id: set_volume_db
  label: Set Volume (dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB (within configured range, typically -80..0)
    - name: tell_slaves
      type: integer
      description: "0 = only this player; 1 = all players in group"
      required: false
  http:
    method: GET
    path: /Volume
    query_params: "abs_db={abs_db}&tell_slaves={tell_slaves}"

- id: adjust_volume_db
  label: Adjust Volume (relative dB)
  kind: action
  params:
    - name: db
      type: number
      description: Relative dB change; positive = up, negative = down (typical ±2 dB)
    - name: tell_slaves
      type: integer
      description: "0 = only this player; 1 = all players in group"
      required: false
  http:
    method: GET
    path: /Volume
    query_params: "db={db}&tell_slaves={tell_slaves}"

- id: mute_on
  label: Mute
  kind: action
  params: []
  http:
    method: GET
    path: /Volume
    query_params: "mute=1"

- id: mute_off
  label: Unmute
  kind: action
  params: []
  http:
    method: GET
    path: /Volume
    query_params: "mute=0"

# --- Playback Control (section 4) ---

- id: play
  label: Play
  kind: action
  params: []
  http:
    method: GET
    path: /Play

- id: play_seek
  label: Play with Seek
  kind: action
  params:
    - name: seek
      type: integer
      description: Position in seconds within the current track (only valid when /Status includes <totlen>)
    - name: id
      type: integer
      description: Track id in the queue (optional)
      required: false
  http:
    method: GET
    path: /Play
    query_params: "seek={seek}&id={id}"

- id: play_url
  label: Play Stream URL
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded stream URL to play
  http:
    method: GET
    path: /Play
    query_params: "url={url}"

- id: pause
  label: Pause
  kind: action
  params: []
  http:
    method: GET
    path: /Pause

- id: pause_toggle
  label: Pause Toggle
  kind: action
  params: []
  http:
    method: GET
    path: /Pause
    query_params: "toggle=1"

- id: stop
  label: Stop
  kind: action
  params: []
  http:
    method: GET
    path: /Stop

- id: skip
  label: Skip to Next Track
  kind: action
  params: []
  http:
    method: GET
    path: /Skip

- id: back
  label: Back (Previous Track / Restart)
  kind: action
  params: []
  http:
    method: GET
    path: /Back

- id: set_shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = shuffle off; 1 = shuffle on"
  http:
    method: GET
    path: /Shuffle
    query_params: "state={state}"

- id: set_repeat
  label: Set Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = repeat queue; 1 = repeat track; 2 = repeat off"
  http:
    method: GET
    path: /Repeat
    query_params: "state={state}"

# --- Play Queue Management (section 5) ---

- id: get_playlist
  label: List Play Queue
  kind: action
  params:
    - name: start
      type: integer
      description: First track index (0-based) to include
      required: false
    - name: end
      type: integer
      description: Last track index to include
      required: false
  http:
    method: GET
    path: /Playlist

- id: delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: Track position id to delete
  http:
    method: GET
    path: /Delete
    query_params: "id={id}"

- id: move_track
  label: Move Track in Queue
  kind: action
  params:
    - name: old
      type: integer
      description: Current position of the track
    - name: new
      type: integer
      description: Destination position
  http:
    method: GET
    path: /Move
    query_params: "new={new}&old={old}"

- id: clear_queue
  label: Clear Play Queue
  kind: action
  params: []
  http:
    method: GET
    path: /Clear

- id: save_queue
  label: Save Play Queue
  kind: action
  params:
    - name: name
      type: string
      description: Name for the saved playlist (URL-encoded)
  http:
    method: GET
    path: /Save
    query_params: "name={name}"

# --- Presets (section 6) ---

- id: list_presets
  label: List Presets
  kind: action
  params: []
  http:
    method: GET
    path: /Presets

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset id number, +1 for next preset, or -1 for previous preset"
  http:
    method: GET
    path: /Preset
    query_params: "id={id}"

# --- Content Browsing (section 7) ---

- id: browse
  label: Browse Music Content
  kind: action
  params:
    - name: key
      type: string
      description: Browse key (URL-encoded). Omit for top-level browse.
      required: false
    - name: withContextMenuItems
      type: integer
      description: Set to 1 to include inline context menus
      required: false
  http:
    method: GET
    path: /Browse

- id: search
  label: Search Music Content
  kind: action
  params:
    - name: key
      type: string
      description: Search key from a prior /Browse searchKey attribute (URL-encoded)
    - name: q
      type: string
      description: Search text
  http:
    method: GET
    path: /Browse
    query_params: "key={key}&q={q}"

# --- Player Grouping (section 8) ---

- id: add_slave
  label: Group Player (Add Secondary)
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the secondary player
    - name: port
      type: integer
      description: Port of the secondary player (default 11000)
    - name: group
      type: string
      description: Optional group name
      required: false
  http:
    method: GET
    path: /AddSlave
    query_params: "slave={slave}&port={port}&group={group}"

- id: add_slaves
  label: Group Multiple Players
  kind: action
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players
    - name: ports
      type: string
      description: Comma-separated port numbers of secondary players
  http:
    method: GET
    path: /AddSlave
    query_params: "slaves={slaves}&ports={ports}"

- id: remove_slave
  label: Ungroup Player (Remove Secondary)
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the secondary player to remove
    - name: port
      type: integer
      description: Port of the secondary player
  http:
    method: GET
    path: /RemoveSlave
    query_params: "slave={slave}&port={port}"

- id: remove_slaves
  label: Ungroup Multiple Players
  kind: action
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses of secondary players to remove
    - name: ports
      type: string
      description: Comma-separated port numbers
  http:
    method: GET
    path: /RemoveSlave
    query_params: "slaves={slaves}&ports={ports}"

# --- Reboot (section 9) ---

- id: reboot
  label: Soft Reboot Player
  kind: action
  params: []
  http:
    method: POST
    path: /reboot
    body: "yes=1"

# --- Doorbell Chime (section 10) ---

- id: doorbell_chime
  label: Play Doorbell Chime
  kind: action
  params: []
  http:
    method: GET
    path: /Doorbell
    query_params: "play=1"

# --- Direct Input Selection (section 11) ---

- id: play_input_active
  label: Select Active Input (via URL)
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded input URL from /RadioBrowse?service=Capture response
  http:
    method: GET
    path: /Play
    query_params: "url={url}"

- id: play_input_index
  label: Select External Input by Index (firmware < v4.2.0)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: 1-based index of inputs from /Settings?id=capture response (Bluetooth excluded)
  http:
    method: GET
    path: /Play
    query_params: "inputIndex={inputIndex}"
  notes: "Only valid for BluOS firmware newer than v3.8.0 and older than v4.2.0"

- id: play_input_type_index
  label: Select External Input by Type and Index (firmware >= v4.2.0)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Format: {type}-{index}. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Index starts at 1."
  http:
    method: GET
    path: /Play
    query_params: "inputTypeIndex={inputTypeIndex}"
  notes: "Only valid for BluOS firmware v4.2.0 or newer"

# --- Bluetooth Mode (section 12) ---

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled"
  http:
    method: GET
    path: /audiomodes
    query_params: "bluetoothAutoplay={bluetoothAutoplay}"
```

## Feedbacks

```yaml
# /Status (section 2.1) — long-pollable

- id: playback_status
  label: Playback Status
  type: object
  endpoint: GET /Status
  long_poll_params:
    timeout: integer  # seconds; recommended 100s, never faster than 10s
    etag: string      # from previous response root attribute
  key_fields:
    - name: state
      type: enum
      values: [play, pause, stop, stream, connecting]
    - name: volume
      type: integer
      description: Player volume 0–100; -1 means fixed volume
    - name: db
      type: number
      description: Volume level in dB
    - name: mute
      type: integer
      values: [0, 1]
    - name: muteVolume
      type: integer
      description: Unmuted volume 0–100 when muted
    - name: muteDb
      type: number
      description: Unmuted volume in dB when muted
    - name: shuffle
      type: integer
      values: [0, 1]
    - name: repeat
      type: integer
      values: [0, 1, 2]
      description: "0 = repeat queue, 1 = repeat track, 2 = off"
    - name: title1
      type: string
    - name: title2
      type: string
    - name: title3
      type: string
    - name: artist
      type: string
    - name: album
      type: string
    - name: name
      type: string
    - name: secs
      type: integer
      description: Seconds played; not included in etag (must be incremented by client)
    - name: totlen
      type: integer
      description: Total track length in seconds
    - name: syncStat
      type: string
      description: Changes when /SyncStatus changes; use to detect need for /SyncStatus poll
    - name: pid
      type: integer
      description: Unique play queue id
    - name: prid
      type: integer
      description: Unique preset id

# /SyncStatus (section 2.2) — long-pollable

- id: sync_status
  label: Player and Group Sync Status
  type: object
  endpoint: GET /SyncStatus
  long_poll_params:
    timeout: integer  # recommended 180s
    etag: string
  key_fields:
    - name: volume
      type: integer
      description: Volume 0–100; -1 = fixed
    - name: db
      type: number
    - name: mute
      type: integer
      values: [0, 1]
    - name: muteVolume
      type: integer
    - name: muteDb
      type: number
    - name: name
      type: string
      description: Player name
    - name: modelName
      type: string
    - name: model
      type: string
    - name: brand
      type: string
    - name: group
      type: string
    - name: id
      type: string
      description: Player IP and port
    - name: mac
      type: string
    - name: initialized
      type: boolean

# /Volume (section 3.1) — also returns current state on query

- id: volume_state
  label: Volume State
  type: object
  endpoint: GET /Volume
  key_fields:
    - name: volume
      type: integer
      description: Current volume 0–100; -1 = fixed
    - name: db
      type: number
    - name: mute
      type: integer
      values: [0, 1]
    - name: muteDb
      type: number
    - name: muteVolume
      type: integer
```

## Variables

```yaml
# Volume range is configurable via the BluOS Controller app (Settings -> Player -> Audio).
# The available volume range is typically -80..0 dB but is not directly settable via the API.
# UNRESOLVED: no API endpoint for reading or setting the configured volume range bounds.
```

## Events

```yaml
# BluOS supports long-polling on /Status and /SyncStatus as a push-like mechanism.
# The device does not send unsolicited events; all state changes are discovered via long-polling.
# etag values in responses change only when content changes, minimizing unnecessary processing.
# UNRESOLVED: no unsolicited event/webhook mechanism documented in the source.
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences explicitly described in the source.
# Note: external input selection requires a two-step sequence:
#   1. GET /RadioBrowse?service=Capture  (discover input URLs)
#   2. GET /Play?url={url}               (activate selected input)
# Or for firmware v4.2.0+: GET /Play?inputTypeIndex={type}-{index} (single step)
```

## Safety

```yaml
confirmation_required_for:
  - reboot  # POST /reboot causes a soft reboot; no confirmation prompt in the API itself
interlocks: []
# UNRESOLVED: no power-on sequencing requirements, electrical interlocks, or
# explicit safety warnings found in the source beyond standard network cautions.
```

## Notes

- **Base URL:** All requests use `http://<player_ip>:11000/<endpoint>`. The document uses `http://192.168.1.100:11000` as a reference example.
- **Port discovery:** Use mDNS (services `musc.tcp` / `musp.tcp`) or the LSDP protocol (UDP broadcast on port 11430) to discover the correct port. Do not hardcode 11000 without confirming via discovery, especially for multi-node devices like the CI580.
- **XML responses:** All responses are UTF-8 encoded XML. Attributes and elements not listed in this spec may be present and should be ignored per the source documentation.
- **Long polling:** Clients should not poll /Status or /SyncStatus faster than once every 30 seconds without long polling. With long polling, do not make two consecutive requests for the same resource less than 1 second apart. Recommended /Status timeout is 100 s; /SyncStatus is 180 s.
- **Grouped players:** Secondary players proxy most requests to the primary player. Use /SyncStatus with long polling to track per-player volume in a group.
- **`secs` field:** The `secs` element in /Status is excluded from the etag calculation and will not trigger a long-poll return. Clients must increment the displayed playback position themselves.
- **`streamUrl` flag:** Presence of `<streamUrl>` in /Status indicates queue-based controls (shuffle, repeat, skip, back) are not relevant.
- **Firmware-specific input selection:** The `/Play?inputIndex=` form applies only to firmware v3.8.0–v4.2.0; the `/Play?inputTypeIndex=` form applies to v4.2.0+. Verify firmware version before using these commands.
- **Reboot:** Uses HTTP POST (`curl -d yes=1 <ip>/reboot`), not GET.
- **Doorbell chime:** Response includes chime volume and audio file path; chime assets are stored on the device.
- **Image redirects:** Image URLs starting with `/Artwork` may redirect. Adding `followRedirects=1` as a query parameter avoids the redirect.
- **API version covered:** BluOS Custom Integration API v1.7 (2025-04-09).

<!-- UNRESOLVED: C 700-specific hardware capabilities (supported inputs, output configuration, amplifier class, etc.) are not stated in the source API document. The API is generic across all BluOS players. -->
<!-- UNRESOLVED: authentication and HTTPS/TLS support not addressed in source. -->
<!-- UNRESOLVED: error response format for HTTP-level errors (4xx/5xx) not documented in source; only XML <error> root element is described for browse errors. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-03T07:12:55.041Z
last_checked_at: 2026-05-16T19:11:51.402Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T19:11:51.402Z
matched_actions: 34
action_count: 34
confidence: high
summary: "All 34 spec actions match verbatim HTTP paths in the BluOS CI API source; only /Action and /RadioBrowse not represented."
```

## Known Gaps

```yaml
- /Action
- /RadioBrowse
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
