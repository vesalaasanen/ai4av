---
spec_id: admin/camstreamer-camstreamer-camera
schema_version: ai4av-public-spec-v1
revision: 1
title: "CamStreamer App 4.x Control Spec"
manufacturer: CamStreamer
model_family: "CamStreamer App 4.x"
aliases: []
compatible_with:
  manufacturers:
    - CamStreamer
  models:
    - "CamStreamer App 4.x"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.camstreamer.com
source_urls:
  - https://support.camstreamer.com/hc/en-us/articles/15735021586076-CamStreamer-App-4-x-API-documentation
retrieved_at: 2026-04-30T04:40:58.722Z
last_checked_at: 2026-06-03T06:28:07.179Z
generated_at: 2026-06-03T06:28:07.179Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "video encoding specs (codec, bitrate ranges) not explicitly stated in source"
  - "port number not stated in source (IPADDR[:PORT] used as placeholder)"
  - "serial/RS-232 not mentioned in source"
  - "TCP socket control not mentioned; HTTP REST only"
verification:
  verdict: verified
  checked_at: 2026-06-03T06:28:07.179Z
  matched_actions: 8
  action_count: 8
  confidence: medium
  summary: "All 8 spec actions verified (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# CamStreamer App 4.x Control Spec

## Summary
CamStreamer App turns Axis network cameras into live streaming encoders. Control via local HTTP REST API on the camera, plus WebSocket for real-time stream events. No authentication required for local API endpoints; external services require license key.

<!-- UNRESOLVED: video encoding specs (codec, bitrate ranges) not explicitly stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://IPADDR[:PORT]/local/camstreamer/"  # pattern stated; port omitted in source
auth:
  type: none  # inferred: no auth required for local cgi endpoints; external APIs use license key
```

## Traits
```yaml
- queryable       # param/get.cgi, stream/get.cgi, get_streamstat.cgi return values
- routable        # stream input source selection (inputType: CRS/CSw/RTSP_URL)
```

## Actions
```yaml
- id: set_param
  label: Set Global Parameter
  kind: action
  params:
    - name: PARAMNAME
      type: string
      description: Parameter name (e.g. LiveLED, signature)
    - name: PARAMVALUE
      type: string
      description: URL-encoded parameter value

- id: get_param
  label: Get Global Parameters
  kind: action
  params:
    - name: list
      type: string
      description: Comma-separated list of parameter names

- id: list_streams
  label: List All Streams
  kind: action
  params: []

- id: set_all_streams
  label: Set All Streams JSON Configuration
  kind: action
  params:
    - name: StreamList
      type: string
      description: JSON array of stream configurations

- id: set_stream
  label: Add or Update Stream
  kind: action
  params:
    - name: stream_id
      type: string
      description: Stream identifier; created if does not exist
    - name: PARAMNAME
      type: string
      description: Stream parameter name (e.g. enabled, mediaServerUrl, audioSource)
    - name: PARAMVALUE
      type: string
      description: URL-encoded parameter value

- id: get_stream
  label: Get Stream Parameters
  kind: action
  params:
    - name: stream_id
      type: string
      description: Stream identifier

- id: remove_stream
  label: Remove Stream
  kind: action
  params:
    - name: stream_id
      type: string
      description: Stream identifier

- id: get_stream_status
  label: Get Stream Status
  kind: action
  params:
    - name: stream_id
      type: string
      description: Stream ID
```

## Feedbacks
```yaml
- id: stream_status
  label: Stream Status Response
  type: object
  fields:
    - name: status
      type: integer
      description: HTTP status code (200 = OK)
    - name: message
      type: string
      description: Response message
    - name: data
      type: object
      description: Stream statistics (net_stats, stream_bytes, is_streaming, start_count)

- id: youtube_broadcast_id
  label: YouTube Broadcast ID
  type: object
  fields:
    - name: broadcast_id
      type: string
      description: YouTube broadcast identifier

- id: youtube_status
  label: YouTube Stream Status
  type: enum
  values:
    - 200  # Stream ok
    - 400  # Stream not checked yet / interrupted
    - 404  # Stream not found or bad token

- id: param_get_response
  label: Parameter Get Response
  type: object
  description: Returns parameter values as key-value pairs

- id: stream_list_response
  label: Stream List Response
  type: object
  description: JSON object mapping stream IDs to their configurations
```

## Variables
```yaml
# Global parameters (set via param/set.cgi?PARAMNAME=PARAMVALUE)

- id: LiveLED
  label: Live LED
  type: enum
  values: [0, 1]
  description: Enable LED light indication on camera (available till version 3.8.2)
  note: "light ON if stream established, OFF if CamStreamer cannot broadcast"

- id: signature
  label: HLS Signature
  type: string
  description: Signature for HLS playlist access
```

## Stream Parameters (Variables)
```yaml
# Per-stream parameters set via stream/set.cgi?stream_id=ID&PARAMNAME=VALUE

- id: enabled
  label: Stream Enabled
  type: enum
  values: [0, 1]
  description: Stop or start the stream

- id: mediaServerUrl
  label: Media Server URL
  type: string
  description: |
    RTMP: rtmp://[user:pass@]server:port[/app][/stream_name]
    MPEG-TS TCP: tcp://server:port
    MPEG-TS UDP: udp://server:port[?pkt_size=XXX&ttl=XXX]
    HLS PULL: hls:// (available at /local/camstreamer/SIGNATURE/live.m3u8)
    HLS PUSH: ftp://your_ftp_server/live.m3u8
    SRT Caller: srt://:port
    SRT Listener: srt://server:port

- id: inputType
  label: Input Type
  type: enum
  values: [CRS, CSw, RTSP_URL]
  description: "CRS=RTSP camera, CSw=CamSwitcher App, RTSP_URL=external RTSP stream"

- id: inputUrl
  label: External RTSP URL
  type: string
  description: Used when inputType is RTSP_URL

- id: userVapixParameters
  label: Vapix Parameters Override
  type: string
  description: Overwrite default video parameters (resolution, camera, overlaypos)

- id: audioSource
  label: Audio Source
  type: string
  description: |
    none = disabled
    default = camera mic/line or CamSwitcher App or external URL
    file:FILEPATH = audio file on camera filesystem
    url:URL = external network audio source (AAC/MP3)

- id: avSyncMsec
  label: Audio/Video Sync Offset
  type: integer
  description: Offset in milliseconds

- id: active
  label: Stream Active
  type: enum
  values: [0, 1]
  description: Pause stream (won't run but processes active); for API server calls

- id: trigger
  label: Automation Trigger
  type: enum
  values: [none, inputX, time, recurrent]
  description: |
    none = automation off
    inputX = stream on when camera input X active
    time = stream on based on startTime/stopTime
    recurrent = stream on based on schedule

- id: schedule
  label: Recurrent Schedule
  type: string
  description: JSON array of day/time intervals (day 0-6, format HH:MM:SS)

- id: prepareAhead
  label: Prepare Ahead Seconds
  type: integer
  description: Seconds before startTime to prepare stream (trigger=time only)

- id: startTime
  label: Start Unix Timestamp
  type: integer
  description: Stream beginning (trigger=time only)

- id: stopTime
  label: Stop Unix Timestamp
  type: integer
  description: Stream end (trigger=time only)

- id: statusLed
  label: Status LED
  type: enum
  values: [0, 1]
  description: Camera LED blinking during broadcast prep/streaming

- id: statusPort
  label: Status Port
  type: integer
  description: Camera output port number for status LED

- id: forceStereo
  label: Force Stereo
  type: enum
  values: [0, 1]

- id: streamDelay
  label: Stream Delay
  type: string

- id: callApi
  label: Call API Mode
  type: enum
  values: [0, 1]
  description: Application calls server APIs (YouTube creation/ending)
```

## Events
```yaml
# WebSocket events on wss://IPADDR[:PORT]/local/camstreamer/events

- id: StreamState
  label: Stream State Change
  type: event
  fields:
    - name: streamID
      type: string
    - name: enabled
      type: integer
    - name: active
      type: integer
    - name: automationState
      type: integer
    - name: isStreaming
      type: integer

- id: CS_API_SUCCESS
  label: API Call Success
  type: event
  fields:
    - name: streamID
      type: string
    - name: apiCall
      type: string
      description: Command name (e.g. startBroadcast)
    - name: message
      type: string

- id: PortChanged
  label: Port Changed
  type: event
  fields:
    - name: port
      type: integer
    - name: value
      type: integer
```

## Macros
```yaml
# Creation of nonstop RTMP stream:
# 1. POST /local/camstreamer/stream/set.cgi?stream_id=api_01&enabled=1&audioSource=default&mediaServerUrl=rtmp://...
# Requires: enabled=1, active=1, trigger=none

# Stop RTMP stream:
# POST /local/camstreamer/stream/set.cgi?stream_id=X&enabled=0

# Button-triggered stream (input0):
# POST with trigger=input0

# Timed stream:
# POST with trigger=time, startTime, stopTime (Unix timestamps)
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "App/stream restart occurs on any parameter change"
  - "Time gap between planned YouTube events must be at least 15 minutes"
  - "Audio sample rate 44.1KHz and bitrate 128Kbps required for external audio"
  - "HLS playlist requires resolution and videomaxbitrate parameters"
```

## Notes
Local HTTP API base: `http://IPADDR[:PORT]/local/camstreamer/`

WebSocket authorization token valid 30 seconds or until first connection; token obtained from `http://USER:PASS@IPADDR[:PORT]/local/camstreamer/api/ws_authorization.cgi`

External GraphQL API (stream list) at `https://camstreamer.com/api/Stream/graphql` requires `cameraLicenseKey` in Authorization header.

YouTube integration requires initial UI authorization; SECTOKEN changes when switching YouTube channels.

CamStreamer App license required; see https://support.camstreamer.com/hc/en-us/articles/4411897837201-License-API

<!-- UNRESOLVED: port number not stated in source (IPADDR[:PORT] used as placeholder) -->
<!-- UNRESOLVED: serial/RS-232 not mentioned in source -->
<!-- UNRESOLVED: TCP socket control not mentioned; HTTP REST only -->

## Provenance

```yaml
source_domains:
  - support.camstreamer.com
source_urls:
  - https://support.camstreamer.com/hc/en-us/articles/15735021586076-CamStreamer-App-4-x-API-documentation
retrieved_at: 2026-04-30T04:40:58.722Z
last_checked_at: 2026-06-03T06:28:07.179Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T06:28:07.179Z
matched_actions: 8
action_count: 8
confidence: medium
summary: "All 8 spec actions verified (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "video encoding specs (codec, bitrate ranges) not explicitly stated in source"
- "port number not stated in source (IPADDR[:PORT] used as placeholder)"
- "serial/RS-232 not mentioned in source"
- "TCP socket control not mentioned; HTTP REST only"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
