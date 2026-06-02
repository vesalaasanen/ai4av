---
spec_id: admin/bluesound-nad-siriusxm-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD SiriusXM Control Spec"
manufacturer: Bluesound
model_family: "SiriusXM (as a BluOS streaming source on Bluesound / NAD / DALI BluOS players)"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "SiriusXM (as a BluOS streaming source on Bluesound / NAD / DALI BluOS players)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluesoundprofessional.com
  - content-bluesound-com.s3.amazonaws.com
source_urls:
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://content-bluesound-com.s3.amazonaws.com/uploads/2022/04/Custom-Integration-API-v1.4.pdf
retrieved_at: 2026-06-01T22:01:09.682Z
last_checked_at: 2026-06-02T08:27:28.483Z
generated_at: 2026-06-02T08:27:28.483Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SiriusXM-specific playback endpoints (e.g. station, preset, like/ban actions unique to SiriusXM) are not isolated in the source — they are served by the generic BluOS /Play, /Preset, /Action, /Browse, and /Shuffle endpoints below."
  - "no continuous settable parameters beyond the discrete actions above."
  - "whether the device pushes any unsolicited HTTP/SSE/UDP events"
  - "the source does not describe device-side multi-step macros."
  - "source contains no safety warnings, interlocks, or power-on sequencing"
  - "firmware version compatibility ranges for individual endpoints are not stated per-endpoint; only the input-selection endpoints have explicit firmware cutovers (v3.8.0, v4.2.0)."
  - "voltage, current, power consumption, and physical-layer electrical specs are not in this source."
  - "whether `Authorization`, session, or other auth is required for any endpoint — the source shows none and the inference is `auth.type: none`."
  - "whether the device accepts concurrent /Play from multiple clients and how it arbitrates last-writer-wins."
verification:
  verdict: verified
  checked_at: 2026-06-02T08:27:28.483Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions have verbatim command-level matches in the BluOS Custom Integration API source; transport port 11000 and auth:none are confirmed; source catalogue is fully covered. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Bluesound NAD SiriusXM Control Spec

## Summary
SiriusXM does not expose a vendor-specific IP control protocol. On Bluesound and NAD hardware, SiriusXM is delivered as a streaming source inside the BluOS ecosystem and is driven through the standard BluOS Custom Integration HTTP API. This spec documents that API as it applies to any BluOS player on which SiriusXM is available as a source — transport is HTTP GET over TCP, port 11000, returning UTF-8 XML.

<!-- UNRESOLVED: SiriusXM-specific playback endpoints (e.g. station, preset, like/ban actions unique to SiriusXM) are not isolated in the source — they are served by the generic BluOS /Play, /Preset, /Action, /Browse, and /Shuffle endpoints below. -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "/"
auth:
  type: none  # inferred: no auth procedure in source
```

The source also documents a UDP broadcast discovery protocol called LSDP on UDP port 11430 (registered with IANA for Lenbrook). It is not a control transport and is not enumerated as a protocol here; see the Notes section.

## Traits
```yaml
- powerable       # inferred from /reboot endpoint (soft reboot)
- routable        # inferred from /Play?inputTypeIndex=, /Play?inputIndex=, /Play?url= active-input endpoints
- queryable       # inferred from /Status, /SyncStatus, /Playlist, /Presets, /Settings endpoints
- levelable       # inferred from /Volume endpoints (level / dB / mute)
```

## Actions
```yaml
# Status queries
- id: status_query
  label: Playback Status Query
  kind: query
  command: "GET /Status[?timeout={seconds}&etag={etag}]"
  params: []
  notes: "Returns playback state, track, volume, mute, service, etc. Supports long-polling."

- id: sync_status_query
  label: Player and Group Sync Status Query
  kind: query
  command: "GET /SyncStatus[?timeout={seconds}&etag={etag}]"
  params: []
  notes: "Returns player info (brand, model, name, mac, ip:port) and grouping (master, slaves, volume). Supports long-polling."

# Volume
- id: set_volume_level
  label: Set Volume (Level 0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={0|1}"
  params:
    - name: level
      type: integer
      description: Absolute volume 0-100
    - name: tell_slaves
      type: integer
      description: 0 = this player only; 1 = apply to all grouped players

- id: set_volume_abs_db
  label: Set Volume (Absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={0|1}"
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB (constrained to configured available range, typically -80..0)

- id: set_volume_relative_db
  label: Set Volume (Relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={0|1}"
  params:
    - name: db
      type: number
      description: Positive or negative dB delta

- id: volume_up
  label: Volume Up (relative dB)
  kind: action
  command: "GET /Volume?db={db_value}"
  params:
    - name: db_value
      type: number
      description: dB step (typical value 2)

- id: volume_down
  label: Volume Down (relative dB)
  kind: action
  command: "GET /Volume?db=-{db_value}"
  params:
    - name: db_value
      type: number
      description: dB step magnitude (typical value 2)

- id: mute_on
  label: Mute On
  kind: action
  command: "GET /Volume?mute=1"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "GET /Volume?mute=0"
  params: []

# Playback control
- id: play
  label: Play (resume current track)
  kind: action
  command: "GET /Play"
  params: []

- id: play_seek
  label: Play with seek
  kind: action
  command: "GET /Play?seek={seconds}[&id={trackid}]"
  params:
    - name: seconds
      type: integer
      description: Position in current track
    - name: trackid
      type: integer
      description: Optional track id within the queue

- id: play_url
  label: Play stream URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: URL of streamed custom audio, URL-encoded

- id: pause
  label: Pause
  kind: action
  command: "GET /Pause"
  params: []

- id: pause_toggle
  label: Pause Toggle
  kind: action
  command: "GET /Pause?toggle=1"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "GET /Stop"
  params: []

- id: skip
  label: Skip (next track)
  kind: action
  command: "GET /Skip"
  params: []
  notes: "Only valid when no <streamUrl> is present in /Status (i.e. using play queue)."

- id: back
  label: Back (previous track)
  kind: action
  command: "GET /Back"
  params: []
  notes: "Returns to start of current track if past 4 seconds, otherwise goes to previous track in queue."

- id: shuffle_set
  label: Shuffle On/Off
  kind: action
  command: "GET /Shuffle?state={0|1}"
  params:
    - name: state
      type: integer
      description: 0 = off, 1 = on

- id: repeat_set
  label: Repeat State
  kind: action
  command: "GET /Repeat?state={0|1|2}"
  params:
    - name: state
      type: integer
      description: "0 = repeat queue, 1 = repeat track, 2 = repeat off"

# Streaming radio station actions
- id: radio_skip
  label: Radio Station Skip
  kind: action
  command: "GET /Action?service={service_name}&skip={id}"
  params:
    - name: service_name
      type: string
      description: e.g. Slacker
    - name: id
      type: string
      description: Track id from <action url=...> in /Status

- id: radio_back
  label: Radio Station Back
  kind: action
  command: "GET /Action?service={service_name}&back={id}"
  params:
    - name: service_name
      type: string
    - name: id
      type: string

- id: radio_love
  label: Radio Station Love
  kind: action
  command: "GET /Action?service={service_name}&love={id}"
  params:
    - name: service_name
      type: string
    - name: id
      type: string

- id: radio_ban
  label: Radio Station Ban
  kind: action
  command: "GET /Action?service={service_name}&ban={id}"
  params:
    - name: service_name
      type: string
    - name: id
      type: string

# Play queue management
- id: playlist_list
  label: List Play Queue
  kind: query
  command: "GET /Playlist[?length=1][?start={first}&end={last}]"
  params:
    - name: length
      type: integer
      description: "If 1, return only top-level attributes (queue status)."
    - name: start
      type: integer
      description: First queue index (0-based) for pagination
    - name: end
      type: integer
      description: Last queue index for pagination

- id: playlist_delete
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Position in queue to delete

- id: playlist_move
  label: Move Track in Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: New track position
    - name: origin
      type: integer
      description: Old track position

- id: playlist_clear
  label: Clear Play Queue
  kind: action
  command: "GET /Clear"
  params: []

- id: playlist_save
  label: Save Play Queue as BluOS Playlist
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: Name for the saved playlist (URL-encoded)

# Presets
- id: presets_list
  label: List Presets
  kind: query
  command: "GET /Presets"
  params: []
  notes: "Presets are added/deleted only via the BluOS Controller app."

- id: preset_load
  label: Load Preset by Id
  kind: action
  command: "GET /Preset?id={presetId}"
  params:
    - name: presetId
      type: integer
      description: Numeric preset id from /Presets

- id: preset_next
  label: Load Next Preset
  kind: action
  command: "GET /Preset?id=+1"
  params: []

- id: preset_previous
  label: Load Previous Preset
  kind: action
  command: "GET /Preset?id=-1"
  params: []

# Browsing and searching
- id: browse
  label: Top-Level Browse
  kind: query
  command: "GET /Browse"
  params: []
  notes: "Returns a <browse> root with top-level sources, inputs and playlists."

- id: browse_descend
  label: Browse by Key
  kind: query
  command: "GET /Browse?key={key-value}[&withContextMenuItems=1]"
  params:
    - name: key_value
      type: string
      description: "browseKey / nextKey / parentKey / contextMenuKey / searchKey value (URL-encoded)"
    - name: withContextMenuItems
      type: integer
      description: Set to 1 to inline context menus

- id: browse_search
  label: Search within a Service
  kind: query
  command: "GET /Browse?key={key-value}&q={searchText}"
  params:
    - name: key_value
      type: string
      description: "searchKey value from a prior /Browse response (URL-encoded)"
    - name: searchText
      type: string
      description: "Search term (URL-encoded)"

# Player grouping
- id: add_slave_single
  label: Add One Secondary Player
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}[&group={GroupName}]"
  params:
    - name: secondaryPlayerIP
      type: string
    - name: secondaryPlayerPort
      type: integer
      description: "Default 11000; CI580 uses 11000/11010/11020/11030"
    - name: group
      type: string
      description: Optional group name; BluOS picks a default if omitted

- id: add_slave_multiple
  label: Add Multiple Secondary Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated IP list
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated port list

- id: remove_slave_single
  label: Remove One Secondary Player
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
    - name: secondaryPlayerPort
      type: integer

- id: remove_slave_multiple
  label: Remove Multiple Secondary Players
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated IP list
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated port list

# Reboot
- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot (body: yes=1)"
  params: []
  notes: "POST with form data. Response is a human-readable 'Rebooting. Please close this window.' HTML page; not a structured XML."

# Doorbell chime
- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

# Bluetooth mode
- id: bluetooth_mode_set
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled"

# Direct input selection
- id: input_active
  label: Active Input Selection (URL)
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: "URL attribute from /RadioBrowse?service=Capture response; only works for inputs appearing in that response"
  notes: "Use for active inputs and BluOS HUB inputs."

- id: input_external_legacy
  label: External Input by Index (FW 3.8.0 - 4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: "1-based input index from /Settings?id=capture&shcemaVersion=32 in numerical order (Bluetooth excluded)"
  notes: "Documented for BluOS firmware newer than v3.8.0 and older than v4.2.0."

- id: input_external_typed
  label: External Input by Type-Index (FW 4.2.0+)
  kind: action
  command: "GET /Play?inputTypeIndex={type-index}"
  params:
    - name: type_index
      type: string
      description: "Format {input_type}-{index}; types include spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone; index starts at 1"
  notes: "Documented for BluOS firmware v4.2.0 or newer."

# Capture / radio browse
- id: capture_list
  label: List Capture Inputs
  kind: query
  command: "GET /RadioBrowse?service=Capture"
  params: []
  notes: "Returns active inputs (Bluetooth, Analog, Optical, etc.) used as URL sources for /Play?url=."

- id: capture_settings
  label: Capture Settings (input list with indices)
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"
  params: []
  notes: "Used to map inputIndex values for /Play?inputIndex=. Source notes 'shcemaVersion' typo in original (sic)."

# Context menu / add to queue
- id: add_to_queue
  label: Add Item to Play Queue (from context menu)
  kind: action
  command: "GET /Add?service={service}&albumid={albumid}[&playnow={-1|0|1}][&shuffle={0|1}][&where={nextAlbum|last|next}][&clear={0|1}]"
  params:
    - name: service
      type: string
      description: Music service id
    - name: albumid
      type: string
      description: Album or item id
    - name: playnow
      type: integer
      description: "-1 = don't start now; 0/1 = start now"
    - name: shuffle
      type: integer
      description: 0 or 1
    - name: where
      type: string
      description: nextAlbum | last | next - queue insertion position
    - name: clear
      type: integer
      description: 0 or 1 - clear existing queue first
  notes: "Specific parameter combinations are provided by the <actionURL> or <contextMenu> actionURL attributes in /Browse responses. Treat parameter shape as opaque and replay the URL verbatim."

- id: add_favourite
  label: Add Favourite
  kind: action
  command: "GET /AddFavourite?service={service}&albumid={albumid}"
  params:
    - name: service
      type: string
    - name: albumid
      type: string
  notes: "Specific parameter shape is given by the actionURL in context-menu <item> entries."
```

## Feedbacks
```yaml
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  source: "/Status <state> element"

- id: volume_level
  type: integer
  range: "0-100 (or -1 for fixed volume)"
  source: "/Status and /Volume <volume> element"

- id: volume_db
  type: number
  source: "/Status and /Volume <db> attribute"

- id: mute_state
  type: integer
  range: "0 = unmuted, 1 = muted"
  source: "/Status and /Volume <mute> attribute"

- id: repeat_state
  type: integer
  range: "0 = repeat queue, 1 = repeat track, 2 = repeat off"
  source: "/Status <repeat> element"

- id: shuffle_state
  type: integer
  range: "0 = off, 1 = on"
  source: "/Status <shuffle> element"

- id: service
  type: string
  source: "/Status <service> element (e.g. Deezer, Tidal, Slacker, TuneIn, Spotify, etc.)"

- id: track_title
  type: string
  source: "/Status <title1>, <title2>, <title3> (preferred) or <album>, <artist>, <name>"

- id: position_secs
  type: integer
  source: "/Status <secs> element"

- id: total_length_secs
  type: integer
  source: "/Status <totlen> element"

- id: group_name
  type: string
  source: "/SyncStatus <SyncStatus group=...> attribute"

- id: bluetooth_battery_level
  type: integer
  range: "percent"
  source: "/Status <battery level=...> (only on players with battery)"

- id: etag
  type: string
  source: "Opaque value from /Status or /SyncStatus root attribute; used as long-polling cursor"
```

## Variables
```yaml
# UNRESOLVED: no continuous settable parameters beyond the discrete actions above.
# The /Volume endpoints already expose level, abs_db, db, mute as parameterized actions.
# The Bluetooth-mode endpoint /audiomodes?bluetoothAutoplay= is a discrete enum (see action bluetooth_mode_set).
```

## Events
```yaml
# The source does not document unsolicited event notifications.
# All state changes are surfaced through /Status and /SyncStatus long-polling.
#
# UNRESOLVED: whether the device pushes any unsolicited HTTP/SSE/UDP events
# (not described in the source).
```

## Macros
```yaml
# UNRESOLVED: the source does not describe device-side multi-step macros.
# The /Preset load action is a single-step convenience over the equivalent
# /Play?url= and /Add actions; it is not a multi-step macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing
# requirements. The /reboot endpoint is a soft reboot (no explicit hazard noted in source).
```

## Notes

**About SiriusXM specifically.** SiriusXM is not exposed as a separate control API on Bluesound or NAD hardware. It is one of the streaming services available inside the BluOS ecosystem; selecting and playing SiriusXM stations uses the generic BluOS HTTP endpoints documented above (`/Preset`, `/Browse`, `/Action`, `/Play`). The source does not list a SiriusXM-specific endpoint, opcode, or service id string — discovery of SiriusXM is left to the `/Browse` and `/Presets` queries at runtime.

**Polling etiquette.** The source is explicit: when not using long-polling, limit regular polling to one request every 30 seconds. With long-polling, never make two consecutive identical-resource requests less than one second apart, even if the first returns fast. Recommended `/Status` long-poll timeout is 100 s (never faster than 10 s); recommended `/SyncStatus` long-poll timeout is 180 s.

**Port and multi-node players.** Port 11000 is the standard BluOS port. The NAD CI580 has four streamer nodes in one chassis: node 1 = 11000, node 2 = 11010, node 3 = 11020, node 4 = 11030. The actual port for a given node should be discovered via mDNS (`musc.tcp`, `musp.tcp`) or via LSDP (see below).

**Reboot is a POST.** `/reboot` is documented in the source as `POST /reboot` with form data (`curl -d yes=1 192.168.1.100/reboot`). Every other endpoint is a `GET`. The response to `/reboot` is plain HTML ("Rebooting. Please close this window. Please wait...") rather than the UTF-8 XML used by all other endpoints.

**LSDP discovery (out of band).** The source documents a separate UDP broadcast discovery protocol called LSDP on UDP port 11430 (registered with IANA for Lenbrook as of 27 March 2014). It is not a control protocol — it advertises BluOS players, servers, hubs, and pair-slaves via class IDs 0x0001–0x0008. Startup burst is 7 packets at t = [0, 1, 2, 3, 5, 7, 10] s + 0–250 ms random jitter; steady-state announce is 57 s + 0–6 s random. mDNS service equivalents: `_musc._tcp`, `_muss._tcp`, `_musp._tcp`, `_musz._tcp`, `_mush._tcp`, `_remote-web-ui._tcp`. LSDP is included here for completeness; it is not in the `protocols:` list and not enumerated as an action.

**Input-selection firmware split.** The source explicitly documents two different `Play?inputIndex=` and `Play?inputTypeIndex=` shapes depending on firmware:
- Firmware newer than v3.8.0 and older than v4.2.0: `/Play?inputIndex=N`
- Firmware v4.2.0 or newer: `/Play?inputTypeIndex={type}-{index}`

The spec lists both as separate actions (input_external_legacy, input_external_typed); clients should detect firmware and pick the right one.

**Preset ids are not sequential.** The source notes preset numbers may be 1, 2, 3, 5, 7, 8 with gaps; ids are returned by `/Presets` and used with `/Preset?id=`. Use `/Preset?id=+1` and `/Preset?id=-1` to step.

**Source document.** The source is the BluOS Custom Integration API reference (vendor manual). It documents the protocol generically — not a single product model — and applies to every BluOS-based Bluesound, NAD, and DALI player. The "SiriusXM" tag in the family name reflects SiriusXM being one of the available streaming services on these players, not a SiriusXM-specific control surface.

<!-- UNRESOLVED: firmware version compatibility ranges for individual endpoints are not stated per-endpoint; only the input-selection endpoints have explicit firmware cutovers (v3.8.0, v4.2.0). -->
<!-- UNRESOLVED: voltage, current, power consumption, and physical-layer electrical specs are not in this source. -->
<!-- UNRESOLVED: whether `Authorization`, session, or other auth is required for any endpoint — the source shows none and the inference is `auth.type: none`. -->
<!-- UNRESOLVED: whether the device accepts concurrent /Play from multiple clients and how it arbitrates last-writer-wins. -->

## Provenance

```yaml
source_domains:
  - bluesoundprofessional.com
  - content-bluesound-com.s3.amazonaws.com
source_urls:
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://content-bluesound-com.s3.amazonaws.com/uploads/2022/04/Custom-Integration-API-v1.4.pdf
retrieved_at: 2026-06-01T22:01:09.682Z
last_checked_at: 2026-06-02T08:27:28.483Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:27:28.483Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions have verbatim command-level matches in the BluOS Custom Integration API source; transport port 11000 and auth:none are confirmed; source catalogue is fully covered. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SiriusXM-specific playback endpoints (e.g. station, preset, like/ban actions unique to SiriusXM) are not isolated in the source — they are served by the generic BluOS /Play, /Preset, /Action, /Browse, and /Shuffle endpoints below."
- "no continuous settable parameters beyond the discrete actions above."
- "whether the device pushes any unsolicited HTTP/SSE/UDP events"
- "the source does not describe device-side multi-step macros."
- "source contains no safety warnings, interlocks, or power-on sequencing"
- "firmware version compatibility ranges for individual endpoints are not stated per-endpoint; only the input-selection endpoints have explicit firmware cutovers (v3.8.0, v4.2.0)."
- "voltage, current, power consumption, and physical-layer electrical specs are not in this source."
- "whether `Authorization`, session, or other auth is required for any endpoint — the source shows none and the inference is `auth.type: none`."
- "whether the device accepts concurrent /Play from multiple clients and how it arbitrates last-writer-wins."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
