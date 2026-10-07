---
spec_id: admin/nad-t758-with-volume-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD T758 V3 BluOS Subsystem Control Spec"
manufacturer: NAD
model_family: "T758 V3 with the included BluOS upgrade kit installed and configured"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "T758 V3 with the included BluOS upgrade kit installed and configured"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
  - ci.nadelectronics.com
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://ci.nadelectronics.com/wp-content/uploads/2017/03/NAD_T758_Data_Sheet.pdf
retrieved_at: 2026-09-26T14:26:11.462Z
last_checked_at: 2026-09-26T14:26:11.462Z
generated_at: 2026-09-26T14:26:11.462Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-09-26T14:26:11.462Z
  matched_actions: 35
  action_count: 35
  confidence: high
  summary: "All 35 HTTP control/query units match; scope is T758 V3 BluOS kit with runtime capability checks, explicit auth/port conflicts and firmware bounds."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# NAD T758 V3 BluOS Subsystem Control Spec

## Summary
This spec covers the BluOS player subsystem of a NAD T758 V3 with its included BluOS upgrade kit installed and configured. The official March2017 NAD datasheet states “BluOS Enabled” with “upgrade kit included”; the BluOS Custom Integration API v1.7 (April2025) covers BluOS players from NAD and other brands. This is conditional use of a generic same-class API, not proof that every optional BluOS function is present on every T758 revision or firmware. Runtime capability/input/service responses and the documented firmware conditions apply.

The inherited entity/spec IDs are retained for continuity, but compatibility is narrowed to the documented V3 configuration. No unqualified T758,receiver-wide power/Zone2/HDMI switching/AV preset/RS232 API is asserted. “Volume” refers to the documented BluOS player level; its mapping to AVR physical gain is not specified. Authentication,exact T758-specific input list and command timing beyond the documented polling constraints remain unresolved.

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: http://{player_ip}:11000
auth:
  type: UNRESOLVED
  notes: No authentication procedure or explicit no-auth guarantee is provided.
encoding: UTF-8; query names/values URL-encoded
notes: GET except reboot POST. General port11000; reboot source example omits port and remains unresolved for that operation. Discover player service/port; CI580 multi-node exception in generic API is outside T758V3 scope. Most replies XML, reboot text, Bluetooth mode no response.
```

## Traits
```yaml
traits:
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
actions:
  - id: play
    label: Play
    kind: action
    params:
      - name: seek
        type: integer
        description: Optional seconds,0..totlen,only if Status contains totlen and permits seeking. Cannot combine with inputType/index.
        min: 0
        required: false
      - name: id
        type: integer
        description: Optional zero-based queue track position used with seek; source id=4 selects track5.
        min: 0
        required: false
      - name: url
        type: string
        description: Optional percent-encoded custom stream URL; choose URL form instead of seek/id.
        required: false
    command: GET /Play
    notes: Choose one documented request variant; bare Play resumes paused playback, not stopped playback. Optional parameters are omitted entirely when absent. Source canSeek=1 indicates scrubbing is possible.
    request_variants:
      - GET /Play?seek={seek}
      - GET /Play?seek={seek}&id={id}
      - GET /Play?url={url}
  - id: pause
    label: Pause
    kind: action
    params:
      - name: toggle
        type: integer
        description: Optional; only value1 toggles pause state.
        values:
          - 1
        required: false
    command: GET /Pause
    notes: If an alarm is playing and has a timeout, pause cancels that timeout.
    request_variants:
      - GET /Pause?toggle=1
  - id: stop
    label: Stop
    kind: action
    params: []
    command: GET /Stop
    notes: Stops current audio; cancels a playing alarm timeout when one exists.
  - id: skip
    label: Skip (Next Track)
    kind: action
    params: []
    command: GET /Skip
    notes: 'Play-queue operation: use when Status has no streamUrl. Last track wraps to first regardless of repeat. For streaming radio use the advertised action URL instead; some inputs provide no skip action.'
  - id: back
    label: Back (Previous Track)
    kind: action
    params: []
    command: GET /Back
    notes: 'Play-queue operation: use when Status has no streamUrl. After more than4seconds playing, return to current track start; otherwise previous track, wrapping first to last regardless of repeat. Streaming sources require advertised action URL.'
  - id: set_volume
    label: Set Volume
    kind: action
    params:
      - name: level
        type: integer
        description: Absolute0..100 volume; choose only this or one dB request form.
        min: 0
        max: 100
        required: false
      - name: db
        type: number
        description: Signed relative dB change; request precision/increment is UNRESOLVED.
        required: false
      - name: abs_db
        type: number
        description: Absolute dB value; request precision/increment is UNRESOLVED.
        required: false
      - name: tell_slaves
        type: integer
        description: Optional grouped-player scope:0local only,1all group players; omitted default is not specified.
        values:
          - 0
          - 1
        required: false
    command: GET /Volume?level={level}
    notes: Choose exactly one level,abs_db,db variant; append &tell_slaves only when supplied. All variants must result within the configured range, typically-80..0dB; fixed-volume response is -1. Numeric dB domain is not narrowed to integers; fractional input acceptance/precision is not established by fractional response examples.
    request_variants:
      - GET /Volume?abs_db={abs_db}
      - GET /Volume?db={db}
      - GET /Volume?level={level}&tell_slaves={tell_slaves}
      - GET /Volume?abs_db={abs_db}&tell_slaves={tell_slaves}
      - GET /Volume?db={db}&tell_slaves={tell_slaves}
  - id: mute_on
    label: Mute On
    kind: action
    params:
      - name: tell_slaves
        type: integer
        description: Optional0local,1group; omit if absent.
        values:
          - 0
          - 1
        required: false
    command: GET /Volume?mute=1
    notes: Dedicated mute sections3.4/3.5 and worked examples specify this polarity; general3.1 request parameter table reverses it. This source contradiction remains explicit; do not infer reversed behavior from that general table.
    request_variants:
      - GET /Volume?mute=1&tell_slaves={tell_slaves}
  - id: mute_off
    label: Mute Off
    kind: action
    params:
      - name: tell_slaves
        type: integer
        description: Optional0local,1group; omit if absent.
        values:
          - 0
          - 1
        required: false
    command: GET /Volume?mute=0
    notes: Dedicated mute sections3.4/3.5 and worked examples specify this polarity; general3.1 request parameter table reverses it. This source contradiction remains explicit; do not infer reversed behavior from that general table.
    request_variants:
      - GET /Volume?mute=0&tell_slaves={tell_slaves}
  - id: shuffle
    label: Set Shuffle
    kind: action
    params:
      - name: state
        type: integer
        description: 0disable,1enable; enabling an already shuffled queue has no effect.
        values:
          - 0
          - 1
        required: true
    command: GET /Shuffle?state={state}
    notes: Shuffle creates a shuffled queue while retaining original ordering for restore. Not relevant when Status contains streamUrl.
  - id: repeat
    label: Set Repeat
    kind: action
    params:
      - name: state
        type: integer
        description: 0repeat queue,1repeat track,2off; repeats are indefinite.
        values:
          - 0
          - 1
          - 2
        required: true
    command: GET /Repeat?state={state}
    notes: Not relevant when Status contains streamUrl.
  - id: clear_queue
    label: Clear Play Queue
    kind: action
    params: []
    command: GET /Clear
    notes: Removes all tracks from the current play queue.
  - id: delete_track
    label: Delete Track from Queue
    kind: action
    params:
      - name: id
        type: integer
        description: Zero-based position in the current play queue.
        min: 0
        required: true
    command: GET /Delete?id={id}
    notes: Deletes a queue entry. Separate browse context-menu deletion of an object/playlist has a user-confirmation requirement; do not conflate the two operations.
  - id: move_track
    label: Move Track in Queue
    kind: action
    params:
      - name: old
        type: integer
        description: Current zero-based queue position.
        min: 0
        required: true
      - name: new
        type: integer
        description: Destination queue position.
        min: 0
        required: true
    command: GET /Move?new={new}&old={old}
  - id: save_queue
    label: Save Queue as Playlist
    kind: action
    params:
      - name: name
        type: string
        description: Required playlist name encoded as an HTTP query value.
        required: true
    command: GET /Save?name={name}
  - id: load_preset
    label: Load Preset
    kind: action
    params:
      - name: id
        type: string
        description: Existing preset ID from Presets,or literal+1/-1 for next/previous. Query-encode+ as%2B so it is not decoded as a space.
        required: true
    command: GET /Preset?id={id}
    notes: Preset numbers need not be consecutive and stepping wraps. Presets are added/deleted in the BluOS Controller app; this is not the AVR custom A/V preset API. A track-list preset replies with loaded/entries; a radio preset replies state/stream.
  - id: select_input
    label: Select Input (Active)
    kind: action
    params:
      - name: url
        type: string
        description: Opaque URL attribute from RadioBrowse?service=Capture; preserve its existing escapes without double-encoding.
        required: true
    command: GET /Play?url={url}
    notes: Only currently returned active inputs; sources must be connected and not hidden. BluOS HUB inputs are supported only by this URL-based input selection form. Runtime input list does not establish receiver-wide input control.
  - id: select_input_index
    label: Select Input by Index
    kind: action
    params:
      - name: inputIndex
        type: integer
        description: Numerical1-based order of inputs in Settings?id=capture&schemaVersion=32 EXCLUDING Bluetooth.
        min: 1
        required: true
    command: GET /Play?inputIndex={inputIndex}
    notes: Only BluOS firmware strictly newer than3.8.0 and older than4.2.0. Both active/inactive external inputs may be selected. Source request/table says inputIndex,one example says InputId; source spelling conflict is unresolved. Template follows normative request,not the conflicting example. No exact NAD input indices are invented.
  - id: select_input_type_index
    label: Select Input by Type-Index
    kind: action
    params:
      - name: inputTypeIndex
        type: string
        description: type-index with1-based per-type index; source types spdif,analog,coax,bluetooth,arc,earc,phono,computer,aesebu,balanced,microphone. Use only a type/index actually available on this player.
        required: true
    command: GET /Play?inputTypeIndex={inputTypeIndex}
    notes: Requires BluOS4.2.0or newer. Generic source does not establish all listed physical inputs on T758V3.
  - id: add_slave
    label: Group Player
    kind: action
    params:
      - name: slave
        type: string
        description: Secondary player IP.
        required: true
      - name: port
        type: integer
        description: Discovered secondary TCP port; source default11000.
        required: true
      - name: group
        type: string
        description: Optional encoded group name; omitted gives default group name.
        required: false
    command: GET /AddSlave?slave={slave}&port={port}
    request_variants:
      - GET /AddSlave?slave={slave}&port={port}&group={group}
  - id: remove_slave
    label: Ungroup Player
    kind: action
    params:
      - name: slave
        type: string
        description: IP of player to remove.
        required: true
      - name: port
        type: integer
        description: Port of player to remove.
        required: true
    command: GET /RemoveSlave?slave={slave}&port={port}
    notes: Removing a secondary ungroups it. Removing the primary from a group of3or more ungroups that player; remaining secondaries form a new group. Source parameter prose incorrectly says added; request and section define removal.
  - id: reboot
    label: Soft Reboot
    kind: action
    params: []
    command: POST /reboot
    notes: 'Form parameter yes accepts any value; use yes=1. Source explicitly uses POST despite introductory all-GET sentence. Returns text Settings Updated/Rebooting/Please wait,not XML. UNRESOLVED target port: general API says11000 but curl example uses implicit HTTP80; do not assume a port or execute until resolved for the device. No reboot confirmation procedure is documented.'
    body: yes=1
    port: UNRESOLVED
  - id: doorbell
    label: Doorbell Chime
    kind: action
    params: []
    command: GET /Doorbell?play=1
    notes: Requests a configured BluOS doorbell chime; response status attributes enable,volume,chime. Specific T758V3 chime availability/configuration is not established by the model datasheet; use only when supported by the installed BluOS player.
  - id: bluetooth_mode
    label: Set Bluetooth Mode
    kind: action
    params:
      - name: bluetoothAutoplay
        type: integer
        description: 0Manual,1Automatic,2Guest,3Disabled.
        values:
          - 0
          - 1
          - 2
          - 3
        required: true
    command: GET /audiomodes?bluetoothAutoplay={bluetoothAutoplay}
    notes: Source says no response. Conditional on an exposed Bluetooth input; generic API does not establish Bluetooth hardware for this T758V3 kit.
  - id: streaming_action
    label: Streaming Radio Action
    kind: action
    params:
      - name: action
        type: string
        description: Exact advertised URL from a Status actions/action element; absent URL means action unavailable.
        required: true
    command: GET {action}
    notes: 'Use only when Status includes streamUrl and an appropriate action URL. Resolve relative URI against player origin. Do not turn the returned URL into an action= query parameter: endpoint/parameters are supplied by that URL and may differ from /Action. Slacker examples use service plus skip/love/ban; generic action= wording conflicts with these examples. Response or action notification text should be displayed as specified by source.'
  - id: browse
    label: Browse Content
    kind: action
    params:
      - name: key
        type: string
        description: Optional browseKey,nextKey,parentKey,contextMenuKey,or searchKey from a previous response; UTF-8 percent-encode as one query value.
        required: false
      - name: q
        type: string
        description: Optional search string; with key use searchKey,without key top-level search.
        required: false
      - name: withContextMenuItems
        type: integer
        description: Optional1 includes inline context menus.
        values:
          - 1
        required: false
    command: GET /Browse
    notes: 'Optional values and their delimiters are omitted when absent. Source request uses plural withContextMenuItems; singular in one narrative line is a source typo. nextKey paging is opaque: do not parse/manipulate its query values. Browse may return error/message/detail instead of browse.'
    request_variants:
      - GET /Browse?key={key}
      - GET /Browse?key={key}&withContextMenuItems=1
      - GET /Browse?key={key}&q={q}
      - GET /Browse?q={q}
  - id: add_multiple_slaves
    label: Group Multiple Players
    kind: action
    command: GET /AddSlave?slaves={slaves}&ports={ports}
    params:
      - name: slaves
        type: string
        description: Comma-separated secondary player IPs.
        required: true
      - name: ports
        type: string
        description: Corresponding comma-separated secondary player TCP ports.
        required: true
    notes: Two or more players; preserve positional IP/port correspondence.
  - id: remove_multiple_slaves
    label: Ungroup Multiple Players
    kind: action
    command: GET /RemoveSlave?slaves={slaves}&ports={ports}
    params:
      - name: slaves
        type: string
        description: Comma-separated player IPs to remove.
        required: true
      - name: ports
        type: string
        description: Corresponding comma-separated TCP ports.
        required: true
  - id: invoke_browse_uri
    label: Invoke Advertised Browse Action
    kind: action
    command: GET {uri}
    params:
      - name: uri
        type: string
        description: Exact playURL,autoplayURL,or actionURL supplied in a current browse response.
        required: true
    notes: Resolve relative URIs per RFC3986 without altering opaque parameters; HTML/XML-decode attribute values before use. playURL usually clears queue/starts item; autoplayURL adds/plays a track and autofill; actionURL performs its advertised action. If both playURL/autoplayURL exist,default choice is a user preference. Ask user confirmation before context-menu type=delete for an object/playlist. These dynamic operations represent examples /Add,/AddFavourite and other service URIs without inventing endpoint schemas.
```

## Feedbacks
```yaml
feedbacks:
  - id: playback_status
    type: xml
    description: 'Status XML: state,track metadata,totlen,canSeek,streamUrl,actions,volume,etag,syncStat; optional/undocumented fields must not be assumed. State examples are not exhaustive. Progress secs does not itself change etag; increment UI elapsed position while play/stream.'
    query_command: GET /Status
    query_variants:
      - GET /Status?timeout={timeout}&etag={etag}
    params:
      - name: timeout
        type: integer
        description: Optional long-poll duration in seconds.
        required: false
      - name: etag
        type: string
        description: Opaque etag from previous response; query-encode.
        required: false
  - id: sync_status
    type: xml
    description: 'SyncStatus XML: player identity/name/model/volume/grouping,master/slave ports,etag,syncStat,schemaVersion. Needed to track individual secondary volume; only primary has slave entries and only secondary has master.'
    query_command: GET /SyncStatus
    query_variants:
      - GET /SyncStatus?timeout={timeout}&etag={etag}
    params:
      - name: timeout
        type: integer
        description: Optional long-poll duration in seconds.
        required: false
      - name: etag
        type: string
        description: Opaque etag from previous response; query-encode.
        required: false
  - id: volume_state
    type: xml
    description: Volume XML with0..100level or-1fixed,db,mute,offsetDb,etag; mute=1meansmuted. Query supports long polling but its exact optional request example is not provided.
    query_command: GET /Volume
  - id: player_state
    type: string
    description: Examples play,pause,stop,stream,connecting; open-ended state strings,not a closed enum.
  - id: mute_state
    type: enum
    values:
      - '0'
      - '1'
    description: 1=muted, 0=unmuted
  - id: shuffle_state
    type: enum
    values:
      - '0'
      - '1'
    description: 0=off, 1=on
  - id: repeat_state
    type: enum
    values:
      - '0'
      - '1'
      - '2'
    description: 0=repeat queue, 1=repeat track, 2=off
  - id: volume_level
    type: integer
    description: Volume level 0-100, or -1 for fixed volume
  - id: queue_listing
    type: xml
    query_command: GET /Playlist?length=1
    query_variants:
      - GET /Playlist?start={start}&end={end}
    params:
      - name: start
        type: integer
        description: Zero-based first queue entry.
        min: 0
        required: false
      - name: end
        type: integer
        description: Last queue entry.
        min: 0
        required: false
    description: length=1 returns only top-level queue attributes; paginated form returns track details. Avoid unbounded Playlist on long queues. Queue id corresponds to Status pid.
  - id: preset_listing
    type: xml
    query_command: GET /Presets
    description: Presets with id,name,url,image; prid matches Status prid and invalidates cached presets on change.
  - id: active_inputs
    type: xml
    query_command: GET /RadioBrowse?service=Capture
    description: Returned URL values identify active unhidden local/HUB inputs for Play?url. Preserve the provided capture URL and existing escapes.
  - id: external_input_settings
    type: xml
    query_command: GET /Settings?id=capture&schemaVersion=32
    description: Source example uses schemaVersion=32; table misspells shcemaVersion. Exclude Bluetooth when computing old-firmware inputIndex. 32 is described as latest in this dated source,not a future-proof assertion.
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    min: -1
    max: 100
    description: BluOS player percentage0..100; -1 means fixed volume,not a writable level.
  - id: volume_db
    type: number
    description: Volume level in dB
  - id: shuffle
    type: boolean
    description: Shuffle state
  - id: repeat
    type: integer
    description: 'Repeat mode: 0=queue, 1=track, 2=off'
```

## Events
```yaml
[]
```

## Macros
```yaml
[]
```

## Safety
```yaml
confirmation_required_for:
  - invoke_browse_uri when context-menu type is delete
interlocks: []
notes: Source requests confirmation before deleting a browse object,usually a playlist. Queue Delete and reboot have no source confirmation requirement. Respect configured volume limits; no AVR power sequencing or electrical interlocks are established by this API.
```

## Notes
### Request construction and response handling

Commands use METHOD plus a relative path as documentation notation; METHOD and the space are not part of the URL. Substitute only parameters for the selected request variant. Omit absent optional parameters and their separators; never send empty placeholders or combine mutually exclusive Play/Volume forms. Percent-encode UTF-8 query values exactly once, preserve already-encoded URLs supplied by the player, and decode XML entities in returned URI attributes before HTTP invocation. A literal +1 preset increment must retain its plus sign (for example,%2B1) through query encoding. Dynamic source-provided URIs retain their opaque paths/parameters and resolve per RFC3986; they are not fabricated named endpoints.

Most responses are UTF-8 XML. Reboot returns text and Bluetooth mode specifies no response. Ignore undocumented status fields. For three-line now-playing UI use title1/title2/title3; for two-line UI use twoline_title1/twoline_title2 when available. streamUrl means queue song/shuffle/repeat/Skip/Back are not applicable; use advertised streaming actions when present. Fixed volume is represented by-1. Source's general mute parameter table reverses the dedicated mute sections; keep that contradiction visible.

### Polling and grouping

Without long polling, status polling is limited to at most one request every 30 seconds. With long polling,successive requests for the same resource must be at least1second apart,even if the prior request returns sooner. Recommended timeout is100seconds for Status and180seconds for SyncStatus. The Status timeout table also says roughly60seconds and never faster than10seconds; this wording is not a command-rate guarantee. Usually only one long poll is needed: Status syncStat signals SyncStatus changes. Secondary Status is a copy of primary; SyncStatus tracks that secondary's own volume.

Many secondary requests are proxied to primary: Status,Playback Control,Play Queue Management,Content Browsing/Search. The source does not say all requests are proxied. Default grouping only; fixed grouping is explicitly outside API source scope. No maximum group size is documented.

### Scope and source limitations

Optional physical inputs,Bluetooth,chimes and music services require actual player support; generic availability does not establish hardware on this model. The NAD datasheet separately documents5customAVpresets and RS232; neither is implemented using the BluOS Preset endpoint. No power command is defined by this API. Reboot port remains unresolved because the general rule11000 conflicts with a curl example at implicit80. Input-index parameter inputIndex conflicts with InputId in one worked example; Settings schemaVersion conflicts with shcemaVersion in one table. Normative requests/examples are recorded with these discrepancies,not silently generalized.

LSDP discovery is a separate binary UDP broadcast protocol on11430; its Q/R requests,announce/delete records and timing are described in the complete source appendix. This catalog is scoped to HTTP player control,so it does not invent LSDP wire templates. Source lists service discovery through mDNS as well; discover actual player identity/port before use.

Sources:
- https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf (full54numbered API pages,version1.7)
- https://ci.nadelectronics.com/wp-content/uploads/2017/03/NAD_T758_Data_Sheet.pdf (official3-page T758V3 datasheet,March2017)

No hardware testing was performed. All25prior action IDs and8prior feedback IDs remain;3new action IDs model bulk grouping and source-advertised browse invocation,while7query-bearing feedbacks make existing/new source queries explicit. Responses/notification examples do not inflate command counts.

## Provenance

```yaml
source_domains:
  - bluos.io
  - ci.nadelectronics.com
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://ci.nadelectronics.com/wp-content/uploads/2017/03/NAD_T758_Data_Sheet.pdf
retrieved_at: 2026-09-26T14:26:11.462Z
last_checked_at: 2026-09-26T14:26:11.462Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:26:11.462Z
matched_actions: 35
action_count: 35
confidence: high
summary: "All 35 HTTP control/query units match; scope is T758 V3 BluOS kit with runtime capability checks, explicit auth/port conflicts and firmware bounds."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
