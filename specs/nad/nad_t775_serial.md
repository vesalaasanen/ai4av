---
spec_id: admin/nad-t775
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD T775 Control Spec"
manufacturer: NAD
model_family: T775
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - T775
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-06-12T02:44:55.124Z
last_checked_at: 2026-10-01T11:41:48.043Z
generated_at: 2026-10-01T11:41:48.043Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes BluOS API shared across many NAD/Bluesound/DALI products; no T775-specific commands or T775-exclusive behavior found"
  - "known protocol was stated as RS-232C but source contains no RS-232 content"
  - "source documents BluOS API for streaming/zone players; no AV receiver-specific traits (powerable via discrete command, routable, levelable volume) are explicitly demonstrated"
  - "source documents XML response structures for /Status and /SyncStatus but does not enumerate a discrete enum/feedback set suitable for a control system; consumers typically poll and parse the full XML"
  - "source exposes volume, mute, shuffle, repeat as query response attributes; no settable variable distinct from the /Volume, /Shuffle, /Repeat actions is documented"
  - "source describes long-polling behavior (etag + syncStat) but does not document a discrete unsolicited event channel"
  - "no multi-step sequences described in source"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "RS-232C content not present in source despite input hint; if T775 has a separate RS-232 protocol, a different source document is required"
  - "T775 hardware-specific commands (input switching to HDMI, amp zone control, tone, surround modes) not present in this BluOS document"
verification:
  verdict: verified
  checked_at: 2026-10-01T11:41:48.043Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec actions match documented BluOS endpoints; transport port 11000 verified; auth explicitly UNRESOLVED. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# NAD T775 Control Spec

## Summary
This spec covers the BluOS HTTP control API and LSDP discovery protocol used by the NAD T775. Commands are HTTP GET requests sent to port 11000 on the player, returning UTF-8 encoded XML responses. Discovery is via UDP broadcast on port 11430 (LSDP) or mDNS.

<!-- UNRESOLVED: source describes BluOS API shared across many NAD/Bluesound/DALI products; no T775-specific commands or T775-exclusive behavior found -->
<!-- UNRESOLVED: known protocol was stated as RS-232C but source contains no RS-232 content -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 11000
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
# UNRESOLVED: source documents BluOS API for streaming/zone players; no AV receiver-specific traits (powerable via discrete command, routable, levelable volume) are explicitly demonstrated
```

## Actions
```yaml
- id: status_query
  label: Playback Status
  kind: query
  command: "GET /Status?timeout={seconds}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Optional long-polling timeout in seconds
    - name: etag
      type: string
      description: Optional etag from previous /Status response

- id: sync_status_query
  label: Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus?timeout={seconds}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Optional long-polling timeout in seconds
    - name: etag
      type: string
      description: Optional etag from previous /SyncStatus response

- id: set_volume
  label: Set Volume (level 0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={on_off}"
  params:
    - name: level
      type: integer
      description: Absolute volume 0-100

- id: set_volume_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={on_off}"
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB

- id: set_volume_relative
  label: Set Volume (relative dB)
  kind: action
  command: "GET /Volume?db={delta-db}&tell_slaves={on_off}"
  params:
    - name: db
      type: number
      description: Positive or negative dB delta

- id: volume_up
  label: Volume Up
  kind: action
  command: "GET /Volume?db=2"

- id: volume_down
  label: Volume Down
  kind: action
  command: "GET /Volume?db=-2"

- id: mute_on
  label: Mute On
  kind: action
  command: "GET /Volume?mute=1"

- id: mute_off
  label: Mute Off
  kind: action
  command: "GET /Volume?mute=0"

- id: play
  label: Play
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seek
      type: integer
      description: Optional position in seconds
    - name: id
      type: integer
      description: Optional track id

- id: play_url
  label: Play Stream URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: url
      type: string
      description: URL-encoded stream URL

- id: pause
  label: Pause
  kind: action
  command: "GET /Pause?toggle={toggle}"
  params:
    - name: toggle
      type: integer
      description: Optional, set 1 to toggle pause state

- id: stop
  label: Stop
  kind: action
  command: "GET /Stop"

- id: skip
  label: Skip
  kind: action
  command: "GET /Skip"

- id: back
  label: Back
  kind: action
  command: "GET /Back"

- id: shuffle
  label: Shuffle
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 to disable, 1 to enable shuffle

- id: repeat
  label: Repeat
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0=repeat queue, 1=repeat track, 2=repeat off

- id: action_streaming_radio
  label: Streaming Radio Action (skip/love/ban)
  kind: action
  command: "GET /Action?service={service-name}&{action-URL}"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker)
    - name: action
      type: string
      description: Action name and value as provided in <action> element

- id: playlist_query
  label: List Tracks / Queue Status
  kind: query
  command: "GET /Playlist?length={length}&start={first}&end={last}"

- id: delete_track
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: id
      type: integer
      description: Track position in queue

- id: move_track
  label: Move Track in Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: new
      type: integer
      description: New position
    - name: old
      type: integer
      description: Old position

- id: clear_queue
  label: Clear Queue
  kind: action
  command: "GET /Clear"

- id: save_queue
  label: Save Queue as Playlist
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: name
      type: string
      description: Playlist name

- id: list_presets
  label: List Presets
  kind: query
  command: "GET /Presets"

- id: load_preset
  label: Load Preset
  kind: action
  command: "GET /Preset?id={presetId}"
  params:
    - name: id
      type: string
      description: Preset id, +1 for next, -1 for previous

- id: browse
  label: Browse Music Content
  kind: query
  command: "GET /Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key
      type: string
      description: URL-encoded key from prior response
    - name: withContextMenuItems
      type: integer
      description: Set to 1 for inline context menu

- id: search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key-value}&q={searchText}"
  params:
    - name: key
      type: string
      description: searchKey from prior response
    - name: q
      type: string
      description: Search string

- id: add_slave
  label: Group Two Players
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: slave
      type: string
      description: Secondary player IP
    - name: port
      type: integer
      description: Secondary player port
    - name: group
      type: string
      description: Optional group name

- id: add_slaves
  label: Group Multiple Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated secondary player IPs
    - name: ports
      type: string
      description: Comma-separated secondary player ports

- id: remove_slave
  label: Remove One Player From Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: slave
      type: string
      description: Secondary player IP
    - name: port
      type: integer
      description: Secondary player port

- id: remove_slaves
  label: Remove Multiple Players From Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated secondary player IPs
    - name: ports
      type: string
      description: Comma-separated secondary player ports

- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot with yes={value}"
  params:
    - name: yes
      type: string
      description: Any value, e.g. 1

- id: doorbell
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"

- id: play_capture_input
  label: Play Active Input (Capture)
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: url
      type: string
      description: URL from /RadioBrowse?service=Capture response

- id: play_input_index
  label: Play Input by Index (firmware 3.8.0 - 4.2.0)
  kind: action
  command: "GET /Play?InputId={IndexId}"
  params:
    - name: inputIndex
      type: integer
      description: 1-based index, Bluetooth excluded

- id: play_input_type_index
  label: Play Input by Type-Index (firmware 4.2.0+)
  kind: action
  command: "GET /Play?inputTypeIndex={type-index}"
  params:
    - name: inputTypeIndex
      type: string
      description: e.g. spdif-2, analog-1, bluetooth-1, arc-1

- id: bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: bluetoothAutoplay
      type: integer
      description: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled
```

## Feedbacks
```yaml
# UNRESOLVED: source documents XML response structures for /Status and /SyncStatus but does not enumerate a discrete enum/feedback set suitable for a control system; consumers typically poll and parse the full XML
```

## Variables
```yaml
# UNRESOLVED: source exposes volume, mute, shuffle, repeat as query response attributes; no settable variable distinct from the /Volume, /Shuffle, /Repeat actions is documented
```

## Events
```yaml
# UNRESOLVED: source describes long-polling behavior (etag + syncStat) but does not document a discrete unsolicited event channel
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
- Default BluOS HTTP control port is 11000; for the CI580 use 11000/11010/11020/11030 per node.
- Long-polling recommended interval: 100s for /Status, 180s for /SyncStatus. Without long-polling, restrict to 1 req / 30s.
- LSDP discovery uses UDP broadcast on port 11430; magic word "LSDP", protocol version 1.
- Bluetooth mode values differ from /Play input selection; /Play uses inputTypeIndex for firmware v4.2.0+.
- Document describes BluOS shared API (Bluesound, NAD, DALI); no T775-specific commands identified.
- LSDP class IDs: 0x0001 BluOS Player, 0x0002 BluOS Server, 0x0003 BluOS Player (multi-zone secondary), 0x0008 BluOS Hub.

<!-- UNRESOLVED: RS-232C content not present in source despite input hint; if T775 has a separate RS-232 protocol, a different source document is required -->
<!-- UNRESOLVED: T775 hardware-specific commands (input switching to HDMI, amp zone control, tone, surround modes) not present in this BluOS document -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-06-12T02:44:55.124Z
last_checked_at: 2026-10-01T11:41:48.043Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T11:41:48.043Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec actions match documented BluOS endpoints; transport port 11000 verified; auth explicitly UNRESOLVED. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes BluOS API shared across many NAD/Bluesound/DALI products; no T775-specific commands or T775-exclusive behavior found"
- "known protocol was stated as RS-232C but source contains no RS-232 content"
- "source documents BluOS API for streaming/zone players; no AV receiver-specific traits (powerable via discrete command, routable, levelable volume) are explicitly demonstrated"
- "source documents XML response structures for /Status and /SyncStatus but does not enumerate a discrete enum/feedback set suitable for a control system; consumers typically poll and parse the full XML"
- "source exposes volume, mute, shuffle, repeat as query response attributes; no settable variable distinct from the /Volume, /Shuffle, /Repeat actions is documented"
- "source describes long-polling behavior (etag + syncStat) but does not document a discrete unsolicited event channel"
- "no multi-step sequences described in source"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "RS-232C content not present in source despite input hint; if T775 has a separate RS-232 protocol, a different source document is required"
- "T775 hardware-specific commands (input switching to HDMI, amp zone control, tone, surround modes) not present in this BluOS document"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
