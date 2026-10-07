---
spec_id: admin/bose-soundtouch
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bose SoundTouch Control Spec"
manufacturer: Bose
model_family: SoundTouch
aliases: []
compatible_with:
  manufacturers:
    - Bose
  models:
    - SoundTouch
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.bosecreative.com
  - raw.githubusercontent.com
source_urls:
  - https://assets.bosecreative.com/m/496577402d128874/original/SoundTouch-Web-API.pdf
  - https://raw.githubusercontent.com/captivus/bose-soundtouch/master/docs/soundtouch-web-api.md
retrieved_at: 2026-05-16T00:42:17.003Z
last_checked_at: 2026-10-07T13:22:33.060Z
generated_at: 2026-10-07T13:22:33.060Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific SoundTouch model variants not enumerated in source"
  - "firmware version compatibility not stated"
  - "no distinct settable parameters beyond those covered by actions"
  - "no multi-step sequences explicitly described in source"
  - "no safety warnings or interlock procedures in source"
  - "error codes and their meanings only partially documented"
  - "KEY_SENDER field purpose not fully explained; examples use sender=\"Gabbo\""
  - "exact bass/treble/level min/max default values not stated (device-dependent, returned by capabilities)"
  - "/recents API mentioned in notifications but not documented as a queryable endpoint"
  - "specific SoundTouch model variants and their capability differences"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:22:33.060Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 action units (11 POST actions, 13 GET queries) match source endpoints with correct shapes; port 8090 and base URL supported; coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# Bose SoundTouch Control Spec

## Summary

Bose SoundTouch wireless speaker system controlled via HTTP/XML Web API on port 8090 and WebSocket notifications on port 8080. Supports playback control, volume/bass/treble adjustment, source selection, multi-room zoning, and preset management.

<!-- UNRESOLVED: specific SoundTouch model variants not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://<device-ip>:8090
  port: 8090
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # POWER key in KEY_VALUE enum
- queryable       # GET endpoints return device state
- levelable       # volume (0-100), bass, treble controls
- routable        # source selection via /select
```

## Actions
```yaml
- id: key_press
  label: Send Key Press
  kind: action
  command: 'POST /key  <key state="{state}" sender="Gabbo">{key}</key>'
  params:
    - name: key
      type: string
      description: "Key value (PLAY, PAUSE, STOP, PREV_TRACK, NEXT_TRACK, THUMBS_UP, THUMBS_DOWN, BOOKMARK, POWER, MUTE, VOLUME_UP, VOLUME_DOWN, PRESET_1 through PRESET_6, AUX_INPUT, SHUFFLE_OFF, SHUFFLE_ON, REPEAT_OFF, REPEAT_ONE, REPEAT_ALL, PLAY_PAUSE, ADD_FAVORITE, REMOVE_FAVORITE, INVALID_KEY)"
    - name: state
      type: string
      description: "press or release"

- id: select_source
  label: Select Source
  kind: action
  command: 'POST /select  <ContentItem source="{source}" sourceAccount="{sourceAccount}"></ContentItem>'
  params:
    - name: source
      type: string
      description: "Source identifier (AUX, BLUETOOTH, PRODUCT, etc.)"
    - name: sourceAccount
      type: string
      description: "Source account (e.g. AUX, TV)"

- id: set_zone
  label: Set Zone
  kind: action
  command: 'POST /setZone  <zone master="{master}" senderIPAddress="{senderIPAddress}"><member ipaddress="{memberIp}">{memberMac}</member>...</zone>'
  params:
    - name: master
      type: string
      description: MAC address of zone master
    - name: senderIPAddress
      type: string
      description: IP address of the sending/client device
    - name: members
      type: array
      description: List of member IP/MAC address pairs

- id: add_zone_slave
  label: Add Zone Slave
  kind: action
  command: 'POST /addZoneSlave  <zone master="{master}"><member ipaddress="{memberIp}">{memberMac}</member>...</zone>'
  params:
    - name: master
      type: string
      description: MAC address of zone master
    - name: members
      type: array
      description: Member IP/MAC address pairs to add

- id: remove_zone_slave
  label: Remove Zone Slave
  kind: action
  command: 'POST /removeZoneSlave  <zone master="{master}"><member ipaddress="{memberIp}">{memberMac}</member>...</zone>'
  params:
    - name: master
      type: string
      description: MAC address of zone master
    - name: members
      type: array
      description: Member IP/MAC address pairs to remove

- id: set_volume
  label: Set Volume
  kind: action
  command: 'POST /volume  <volume>{volume}<muteenabled>{mute}</muteenabled></volume>'
  params:
    - name: volume
      type: integer
      description: "Target volume (0-100 inclusive)"
    - name: mute
      type: boolean
      description: Enable or disable mute

- id: set_bass
  label: Set Bass
  kind: action
  command: 'POST /bass  <bass>{bass}</bass>'
  params:
    - name: bass
      type: integer
      description: Bass level value

- id: set_name
  label: Set Device Name
  kind: action
  command: 'POST /name  <name>{name}</name>'
  params:
    - name: name
      type: string
      description: New device name

- id: set_audio_dsp
  label: Set Audio DSP Controls
  kind: action
  command: 'POST /audiodspcontrols  <audiodspcontrols audiomode="{audiomode}" videosyncaudiodelay="{videosyncaudiodelay}"/>'
  params:
    - name: audiomode
      type: string
      description: "Audio mode (AUDIO_MODE_DIRECT, AUDIO_MODE_NORMAL, AUDIO_MODE_DIALOG, AUDIO_MODE_NIGHT)"
    - name: videosyncaudiodelay
      type: integer
      description: Audio delay for video sync

- id: set_tone_controls
  label: Set Tone Controls
  kind: action
  command: 'POST /audioproducttonecontrols  <audioproducttonecontrols><bass value="{bass}"/><treble value="{treble}"/></audioproducttonecontrols>'
  params:
    - name: bass
      type: integer
      description: Bass value within min/max range from capabilities
    - name: treble
      type: integer
      description: Treble value within min/max range from capabilities

- id: set_level_controls
  label: Set Speaker Level Controls
  kind: action
  command: 'POST /audioproductlevelcontrols  <audioproductlevelcontrols><frontCenterSpeakerLevel value="{frontCenterSpeakerLevel}"/><rearSurroundSpeakersLevel value="{rearSurroundSpeakersLevel}"/></audioproductlevelcontrols>'
  params:
    - name: frontCenterSpeakerLevel
      type: integer
      description: Front center speaker level
    - name: rearSurroundSpeakersLevel
      type: integer
      description: Rear surround speakers level
```

## Feedbacks
```yaml
- id: volume
  type: object
  description: Current volume and mute status (GET /volume)
  query_command: 'GET /volume'

- id: now_playing
  type: object
  description: Currently playing media info (track, artist, album, station, play status, art) (GET /nowPlaying)
  query_command: 'GET /nowPlaying'

- id: track_info
  type: object
  description: Track information (GET /trackInfo)
  query_command: 'GET /trackInfo'

- id: sources
  type: array
  description: List of available content sources with status (GET /sources)
  query_command: 'GET /sources'

- id: presets
  type: array
  description: List of current presets (ID, content item, name) (GET /presets)
  query_command: 'GET /presets'

- id: info
  type: object
  description: Device information (name, type, software version, network info, components) (GET /info)
  query_command: 'GET /info'

- id: zone
  type: object
  description: Current multi-room zone state (master, members) (GET /getZone)
  query_command: 'GET /getZone'

- id: bass
  type: object
  description: Current bass setting (target and actual) (GET /bass)
  query_command: 'GET /bass'

- id: bass_capabilities
  type: object
  description: Bass customization support and range (GET /bassCapabilities)
  query_command: 'GET /bassCapabilities'

- id: capabilities
  type: array
  description: System capabilities with names and URLs (GET /capabilities)
  query_command: 'GET /capabilities'

- id: audio_dsp_controls
  type: object
  description: Current DSP settings (audio mode, video sync delay, supported modes) (GET /audiodspcontrols)
  query_command: 'GET /audiodspcontrols'

- id: tone_controls
  type: object
  description: Bass and treble with value ranges (GET /audioproducttonecontrols)
  query_command: 'GET /audioproducttonecontrols'

- id: level_controls
  type: object
  description: Front center and rear surround speaker levels with ranges (GET /audioproductlevelcontrols)
  query_command: 'GET /audioproductlevelcontrols'
```

## Variables
```yaml
# UNRESOLVED: no distinct settable parameters beyond those covered by actions
```

## Events
```yaml
- id: volume_change
  description: Volume updated notification via WebSocket (volumeUpdated)

- id: now_playing_change
  description: Currently playing media changed via WebSocket (nowPlayingUpdated)

- id: bass_change
  description: Bass setting changed via WebSocket (bassUpdated)

- id: presets_changed
  description: Presets added, cleared, or modified via WebSocket (presetsUpdated)

- id: zone_change
  description: Zone membership changed via WebSocket (zoneUpdated)

- id: sources_change
  description: Available sources changed via WebSocket (sourcesUpdated)

- id: info_change
  description: Device info changed (e.g. name) via WebSocket (infoUpdated)

- id: recents_updated
  description: Recents list changed via WebSocket (recentsUpdated)

- id: now_selection_change
  description: Current selection changed via WebSocket (nowSelectionUpdated)

- id: network_connection_status
  description: Network connection state changed via WebSocket (connectionStateUpdated)

- id: sw_update_status
  description: Software update status changed via WebSocket (swUpdateStatusUpdated)

- id: site_survey_results
  description: Site survey results updated via WebSocket (siteSurveyResultsUpdated)

- id: account_mode_change
  description: Cloud account association changed via WebSocket (acctModeUpdated)

- id: error_notification
  description: Error notification from device via WebSocket (ErrorNotification)
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- HTTP API base path is `http://<device-ip>:8090/`. All endpoints are HTTP GET (for queries) or HTTP POST (for commands with XML payloads). Any get* command is a GET; any set* command is a POST and requires a payload.
- Default success response for no-payload calls is `<status>$STRING</status>`. Error responses use `<errors deviceID="..."><error value="$INT" name="$STRING" severity="$STRING">...</error></errors>`. Malformed requests return an XML parse error (e.g. value 1019 CLIENT_XML_ERROR).
- WebSocket endpoint is `ws://<device-ip>:8080` with protocol `"gabbo"` (must be specified at connection). Notifications are server-initiated and may not include the changed value — re-query the relevant GET endpoint.
- Key presses should be sent as two discrete POST calls: first `state="press"`, then `state="release"`.
- Volume range is 0-100 inclusive. `muteenabled` is applied first if present; system unmutes if the new volume exceeds the current setting.
- Optional endpoints (`/audiodspcontrols`, `/audioproducttonecontrols`, `/audioproductlevelcontrols`) only exist if listed in `GET /capabilities`; POSTs may omit fields to leave them unchanged.
- Discovery via SSDP (UDP multicast port 1900, M-SEARCH for `urn:schemas-upnp-org:device:MediaRenderer:1` / `MediaServer:1`) or mDNS (`_soundtouch._tcp.local`, `_raop._tcp.local`).

<!-- UNRESOLVED: error codes and their meanings only partially documented -->
<!-- UNRESOLVED: KEY_SENDER field purpose not fully explained; examples use sender="Gabbo" -->
<!-- UNRESOLVED: exact bass/treble/level min/max default values not stated (device-dependent, returned by capabilities) -->
<!-- UNRESOLVED: /recents API mentioned in notifications but not documented as a queryable endpoint -->
<!-- UNRESOLVED: specific SoundTouch model variants and their capability differences -->
````

## Provenance

```yaml
source_domains:
  - assets.bosecreative.com
  - raw.githubusercontent.com
source_urls:
  - https://assets.bosecreative.com/m/496577402d128874/original/SoundTouch-Web-API.pdf
  - https://raw.githubusercontent.com/captivus/bose-soundtouch/master/docs/soundtouch-web-api.md
retrieved_at: 2026-05-16T00:42:17.003Z
last_checked_at: 2026-10-07T13:22:33.060Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:22:33.060Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 action units (11 POST actions, 13 GET queries) match source endpoints with correct shapes; port 8090 and base URL supported; coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific SoundTouch model variants not enumerated in source"
- "firmware version compatibility not stated"
- "no distinct settable parameters beyond those covered by actions"
- "no multi-step sequences explicitly described in source"
- "no safety warnings or interlock procedures in source"
- "error codes and their meanings only partially documented"
- "KEY_SENDER field purpose not fully explained; examples use sender=\"Gabbo\""
- "exact bass/treble/level min/max default values not stated (device-dependent, returned by capabilities)"
- "/recents API mentioned in notifications but not documented as a queryable endpoint"
- "specific SoundTouch model variants and their capability differences"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
