---
spec_id: admin/haivision-mantaray-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Haivision Mantaray Series Control Spec"
manufacturer: Haivision
model_family: "Mantaray Series"
aliases: []
compatible_with:
  manufacturers:
    - Haivision
  models:
    - "Mantaray Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doc.haivision.com
  - aca.im
source_urls:
  - "https://doc.haivision.com/__attachments/15171865/Furnace6.6%20API%20Integrator%27s%20Guide.pdf?inst-v=1b9ce571-bddd-4c75-83b6-fccbfd064a21"
  - https://aca.im/driver_docs/Haivision/furnace_api.pdf
  - https://doc.haivision.com/
retrieved_at: 2026-05-05T06:00:56.364Z
last_checked_at: 2026-06-02T22:07:30.283Z
generated_at: 2026-06-02T22:07:30.283Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific Mantaray hardware model identifiers not stated; source covers Furnace API generically"
  - "HTTPS port not stated (assumed standard 443 but not confirmed)"
  - "specific HTTPS port not stated in source"
  - "source does not describe unsolicited push notifications or event subscriptions"
  - "no multi-step macro sequences explicitly defined in source"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing"
  - "specific Mantaray hardware models covered by this API not enumerated"
  - "API rate limits not documented"
  - "maximum concurrent client connections not stated"
  - "firmware version compatibility range not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:30.283Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-05
---

# Haivision Mantaray Series Control Spec

## Summary
Haivision Furnace IP Video System (Mantaray Series) REST API v6.6 for managing IP video distribution, recording, publishing, and client control. Provides HTTP/HTTPS REST interface with XML responses, OAuth two-legged authentication (HMAC-SHA1), and resources for assets, clients, commands, recordings, stations, and volumes.

<!-- UNRESOLVED: specific Mantaray hardware model identifiers not stated; source covers Furnace API generically -->
<!-- UNRESOLVED: HTTPS port not stated (assumed standard 443 but not confirmed) -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "https://{portal-server}/apis/"
  # UNRESOLVED: specific HTTPS port not stated in source
auth:
  type: oauth
  method: hmac-sha1
  description: "Two-legged OAuth 1.0. Consumer key/secret created via VF Admin Credential Manager. HTTPS required."
```

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off command present
  - queryable    # inferred: GET queries return device/client state
  - levelable    # inferred: volume 0-100 control present
```

## Actions
```yaml
actions:
  - id: command_volume
    label: Set Volume
    kind: action
    description: "Set client volume level via command API"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: integer
        description: "Volume level 0-100"

  - id: command_mute
    label: Set Mute
    kind: action
    description: "Toggle client mute on/off"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: enum
        values: [on, off]

  - id: command_power
    label: Set Power
    kind: action
    description: "Toggle client power on/off"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: enum
        values: [on, off]

  - id: command_channel
    label: Set Channel
    kind: action
    description: "Set client channel number"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: integer
        description: "Channel number"

  - id: command_station
    label: Set Station
    kind: action
    description: "Set client station by ID"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: string
        description: "Station ID"

  - id: command_lockinterface
    label: Lock Interface
    kind: action
    description: "Lock or unlock client interface"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: enum
        values: [on, off]

  - id: command_guide
    label: Toggle Guide
    kind: action
    description: "Show or hide guide on client"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: enum
        values: [on, off]

  - id: command_cc
    label: Set Closed Captions
    kind: action
    description: "Set closed caption mode"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: enum
        values: ["0", "2", "4"]
        description: "0=CC1, 2=CC3, 4=off"

  - id: command_ontop
    label: Set On Top
    kind: action
    description: "Toggle always-on-top mode"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: enum
        values: [on, off]

  - id: command_dashboard
    label: Toggle Dashboard
    kind: action
    description: "Toggle dashboard display"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: enum
        values: [on, off]

  - id: command_thumbnail
    label: Toggle Thumbnail
    kind: action
    description: "Toggle thumbnail display"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: enum
        values: [on, off]

  - id: command_minimize
    label: Toggle Minimize
    kind: action
    description: "Minimize or restore client"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: enum
        values: [on, off]

  - id: command_activate
    label: Activate Client
    kind: action
    description: "Activate the client application"
    method: POST
    path: "/apis/commands"
    params: []

  - id: command_show
    label: Show/Hide Client
    kind: action
    description: "Toggle client visibility"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: enum
        values: [on, off]

  - id: command_fullscreen
    label: Toggle Fullscreen
    kind: action
    description: "Toggle fullscreen mode"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: enum
        values: [on, off]

  - id: command_sleeptimer
    label: Set Sleep Timer
    kind: action
    description: "Set sleep timer in minutes"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: integer
        description: "Sleep timer in minutes"

  - id: command_hdtv
    label: Set HDTV Mode
    kind: action
    description: "Set HDTV output resolution"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: enum
        values: [SD, 720p, 1080i, 1080p]

  - id: command_settvmode
    label: Set TV Mode
    kind: action
    description: "Set TV output format"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: string
        description: "TV format string"

  - id: command_delay
    label: Command Delay
    kind: action
    description: "Insert delay between actions in multi-action command"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: integer
        description: "Delay in milliseconds"

  - id: command_url
    label: Launch URL
    kind: action
    description: "Launch a specific VOD asset or URL on client"
    method: POST
    path: "/apis/commands"
    params:
      - name: value
        type: string
        description: "URL (e.g. udp://239.10.10.10:4900) or UUID (uuid:xxxx-xxxx-xxxx-xxxxxxx)"

  - id: command_message_video
    label: Send Video Overlay Message
    kind: action
    description: "Display text overlay on supporting clients"
    method: POST
    path: "/apis/commands"
    params:
      - name: text
        type: string
        description: "Message text to display"
      - name: duration
        type: integer
        description: "Display duration in seconds"
      - name: priority
        type: integer
        description: "Priority 0=lowest, 254=highest"
      - name: font_size
        type: integer
        description: "Font size in pixels"
      - name: brightness
        type: integer
        description: "Brightness 0-255"
      - name: position
        type: integer
        description: "Screen position 0-8 (0=top-left, 7=bottom-center, 8=bottom-right)"
      - name: scroll_speed
        type: number
        description: "Text scroll speed, default 44.0"

  - id: command_message_dialog
    label: Send Dialog Message
    kind: action
    description: "Display dialog popup on supporting clients"
    method: POST
    path: "/apis/commands"
    params:
      - name: text
        type: string
        description: "Dialog message text"
      - name: duration
        type: integer
        description: "Display duration in seconds"
      - name: priority
        type: integer
        description: "Priority 0=lowest, 254=highest"
      - name: title
        type: string
        description: "Dialog box title"

  - id: command_network_config
    label: Configure Network
    kind: action
    description: "Change network configuration on supporting set-top box clients"
    method: POST
    path: "/apis/commands"
    params:
      - name: bootproto
        type: enum
        values: [static, dhcp]
        description: "Boot protocol; if dhcp, other fields optional"
      - name: ipaddress
        type: string
        description: "Static IP address"
      - name: netmask
        type: string
        description: "Subnet mask"
      - name: gateway
        type: string
        description: "Default gateway"
      - name: dns1
        type: string
        description: "Primary DNS"
      - name: dns2
        type: string
        description: "Secondary DNS"

  - id: list_assets
    label: List Assets
    kind: query
    description: "Retrieve paginated list of published assets"
    method: GET
    path: "/apis/assets"
    params:
      - name: page
        type: integer
        description: "Page number, default 1"
      - name: size
        type: integer
        description: "Results per page 1-100, default 100"
      - name: q
        type: string
        description: "Simple search on title, description, tags"

  - id: get_asset
    label: Get Asset
    kind: query
    description: "Retrieve full details for a specific asset"
    method: GET
    path: "/apis/assets/asset-{id}"
    params:
      - name: id
        type: string
        description: "Asset ID"

  - id: list_clients
    label: List Clients
    kind: query
    description: "Retrieve paginated list of connected clients"
    method: GET
    path: "/apis/clients"
    params:
      - name: page
        type: integer
        description: "Page number, default 1"
      - name: size
        type: integer
        description: "Results per page 1-100, default 100"

  - id: get_client
    label: Get Client
    kind: query
    description: "Retrieve details for a specific client"
    method: GET
    path: "/apis/clients/client-{id}"
    params:
      - name: id
        type: string
        description: "Client instance ID"

  - id: list_recorders
    label: List Recorders
    kind: query
    description: "Retrieve list of all registered recorders"
    method: GET
    path: "/apis/recorders"
    params: []

  - id: get_recorder
    label: Get Recorder
    kind: query
    description: "Retrieve recorder entity by ID"
    method: GET
    path: "/apis/recorders/recorder-{id}"
    params:
      - name: id
        type: string
        description: "Recorder ID"

  - id: create_recording
    label: Start Recording
    kind: action
    description: "Start a recording on a recorder"
    method: POST
    path: "/apis/recordings"
    params:
      - name: sourceUrl
        type: string
        description: "Source URL (vftp://, udp://, or uuid: format)"
      - name: maxDuration
        type: integer
        description: "Maximum recording duration in seconds"
      - name: title
        type: string
        description: "Recording title"
      - name: description
        type: string
        description: "Recording description"

  - id: update_recording
    label: Update Recording
    kind: action
    description: "Update recording metadata or pause/resume"
    method: PUT
    path: "/apis/recordings/recording-{id}"
    params:
      - name: id
        type: string
        description: "Recording ID"
      - name: state
        type: enum
        values: [RECORDING, PAUSED]
        description: "Change recording state"

  - id: delete_recording
    label: Delete Recording
    kind: action
    description: "Stop and delete a recording"
    method: DELETE
    path: "/apis/recordings/recording-{id}"
    params:
      - name: id
        type: string
        description: "Recording ID"

  - id: list_recordings
    label: List Recordings
    kind: query
    description: "Retrieve list of all recordings in NVR"
    method: GET
    path: "/apis/recordings"
    params: []

  - id: create_hotmark
    label: Create HotMark
    kind: action
    description: "Create a new HotMark on a recording"
    method: POST
    path: "/apis/recordings/recording-{id}/hotmarks"
    params:
      - name: id
        type: string
        description: "Recording ID"
      - name: title
        type: string
        description: "HotMark title (required)"
      - name: time
        type: integer
        description: "Time in milliseconds (optional, defaults to current)"
      - name: type
        type: enum
        values: [TAG, CHAPTER]
        description: "HotMark type, default TAG"

  - id: publish_recording
    label: Publish Recording
    kind: action
    description: "Begin publishing recording to media server"
    method: POST
    path: "/apis/recordings/recording-{id}/publishes"
    params:
      - name: id
        type: string
        description: "Recording ID"
      - name: volume_id
        type: string
        description: "Target volume ID (optional)"

  - id: cancel_publish
    label: Cancel Publish
    kind: action
    description: "Stop publishing and return recording to RECORDED state"
    method: DELETE
    path: "/apis/recordings/recording-{id}/publishes/publish-{publishId}"
    params:
      - name: id
        type: string
        description: "Recording ID"
      - name: publishId
        type: string
        description: "Publish ID"

  - id: start_review
    label: Start Review
    kind: action
    description: "Begin review of a recording"
    method: POST
    path: "/apis/recordings/recording-{id}/reviews"
    params:
      - name: id
        type: string
        description: "Recording ID"
      - name: outputUrl
        type: string
        description: "Streaming output URL (optional; omit for VoD-style)"

  - id: stop_review
    label: Stop Review
    kind: action
    description: "Stop and remove a review"
    method: DELETE
    path: "/apis/recordings/recording-{id}/reviews/review-{reviewId}"
    params:
      - name: id
        type: string
        description: "Recording ID"
      - name: reviewId
        type: string
        description: "Review ID"

  - id: list_stations
    label: List Stations
    kind: query
    description: "Retrieve list of all stations"
    method: GET
    path: "/apis/stations"
    params: []

  - id: get_station
    label: Get Station
    kind: query
    description: "Retrieve station details including tracks"
    method: GET
    path: "/apis/stations/station-{id}"
    params:
      - name: id
        type: string
        description: "Station ID"

  - id: get_schedule
    label: Get Station Schedule
    kind: query
    description: "Retrieve paginated schedule for a station"
    method: GET
    path: "/apis/stations/station-{id}/schedule"
    params:
      - name: id
        type: string
        description: "Station ID"
      - name: page
        type: integer
        description: "Page number, default 1"
      - name: size
        type: integer
        description: "Results per page 1-100, default 100"
      - name: t0
        type: integer
        description: "Start time (Linux epoch)"
      - name: t1
        type: integer
        description: "End time (Linux epoch)"

  - id: get_program
    label: Get Program
    kind: query
    description: "Retrieve scheduled program details"
    method: GET
    path: "/apis/programs/program-{id}"
    params:
      - name: id
        type: string
        description: "Program ID"

  - id: list_volumes
    label: List Volumes
    kind: query
    description: "Retrieve list of storage volumes"
    method: GET
    path: "/apis/volumes"
    params: []

  - id: get_volume
    label: Get Volume
    kind: query
    description: "Retrieve volume details including free/total space"
    method: GET
    path: "/apis/volumes/volume-{id}"
    params:
      - name: id
        type: string
        description: "Volume ID"
```

## Feedbacks
```yaml
feedbacks:
  - id: recording_state
    type: enum
    values: [RECORDING, PAUSED, FINALIZING, RECORDED, REVIEWING, PUBLISHING]
    description: "Current state of a recording"

  - id: recording_progress
    type: number
    description: "Publish progress 0.00 to 1.00"

  - id: recorder_is_recording
    type: boolean
    description: "Whether recorder has an active recording"

  - id: recorder_is_slave
    type: boolean
    description: "Whether recorder is in use by another recorder"

  - id: client_app
    type: enum
    values: [UNKNOWN, INSTREAM, EDITOR, PILOT, MONITOR, ARCHIVE, COMMANDER, NVR, DECODER]
    description: "Connected client application type"

  - id: client_platform
    type: enum
    values: [UNKNOWN, Windows, "OS X", Linux, Solaris, STB, Makito]
    description: "Client platform"

  - id: publish_progress
    type: number
    description: "Publish progress 0.00 to 1.00"

  - id: volume_free_mb
    type: integer
    description: "Free space on volume in MB"

  - id: volume_total_mb
    type: integer
    description: "Total space on volume in MB"
```

## Variables
```yaml
variables:
  - id: client_channel
    type: integer
    description: "Current channel number on client"

  - id: client_volume
    type: integer
    description: "Current volume level 0-100 on client"

  - id: client_callsign
    type: string
    description: "Client callsign identifier"

  - id: recording_max_duration
    type: integer
    description: "Maximum recording duration in seconds"

  - id: hotmark_time
    type: integer
    description: "HotMark time position in milliseconds"
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited push notifications or event subscriptions
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing
```

## Notes
- All API communication routed through portal server; base URI matches portal root.
- Response format: XML (`application/xml`) with root `<response>` element.
- Commands support `<restrict_to>` block for targeting specific clients by app, session, instance, callsign, channel, IP, MAC, or platform. Operator must be `OR`.
- Multiple actions can be combined in a single command POST inside `<actions>`.
- Recording states: RECORDING → PAUSED → FINALIZING → RECORDED → REVIEWING/PUBLISHING.
- Recording source URLs support `vftp://`, `udp://`, and `uuid:` formats.
- API Version 2.0 required for OAuth; configured via VF Admin module.
- Complex asset search supports equal (`=`), not equal (`=!`), like (`=~`), not like (`=^`) operators.
- One active recording per recorder at a time.
- One publish per recording supported.
- VoD-style reviews must be explicitly deleted via API to end REVIEWING state.
- Error responses include XML `<error>` entity with numeric code and message.
<!-- UNRESOLVED: specific Mantaray hardware models covered by this API not enumerated -->
<!-- UNRESOLVED: API rate limits not documented -->
<!-- UNRESOLVED: maximum concurrent client connections not stated -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->

## Provenance

```yaml
source_domains:
  - doc.haivision.com
  - aca.im
source_urls:
  - "https://doc.haivision.com/__attachments/15171865/Furnace6.6%20API%20Integrator%27s%20Guide.pdf?inst-v=1b9ce571-bddd-4c75-83b6-fccbfd064a21"
  - https://aca.im/driver_docs/Haivision/furnace_api.pdf
  - https://doc.haivision.com/
retrieved_at: 2026-05-05T06:00:56.364Z
last_checked_at: 2026-06-02T22:07:30.283Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:30.283Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific Mantaray hardware model identifiers not stated; source covers Furnace API generically"
- "HTTPS port not stated (assumed standard 443 but not confirmed)"
- "specific HTTPS port not stated in source"
- "source does not describe unsolicited push notifications or event subscriptions"
- "no multi-step macro sequences explicitly defined in source"
- "source contains no safety warnings, interlock procedures, or power-on sequencing"
- "specific Mantaray hardware models covered by this API not enumerated"
- "API rate limits not documented"
- "maximum concurrent client connections not stated"
- "firmware version compatibility range not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
