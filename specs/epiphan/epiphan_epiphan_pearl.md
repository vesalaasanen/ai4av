---
spec_id: admin/epiphan-epiphan-pearl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epiphan Pearl Control Spec"
manufacturer: Epiphan
model_family: "Epiphan Pearl"
aliases: []
compatible_with:
  manufacturers:
    - Epiphan
  models:
    - "Epiphan Pearl"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - epiphan.com
  - epiphan-video.github.io
source_urls:
  - https://www.epiphan.com/userguides/pdfs/Epiphan-Pearl-API-Guide.pdf
  - https://epiphan-video.github.io/pearl_api_swagger_ui/
  - https://epiphan-video.github.io/pearl_api_swagger_ui/api/v2.0/openapi.yml
  - https://www.epiphan.com/userguides/pearl-api/Content/Home-Pearl-api.htm
retrieved_at: 2026-04-29T16:56:02.893Z
last_checked_at: 2026-10-07T11:19:57.819Z
generated_at: 2026-10-07T11:19:57.819Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - ac_allowips
  - ac_denyips
  - "New REST API (https://epiphan-video.github.io/pearl_api_swagger_ui/) is not modeled here; vendor recommends it over these legacy APIs."
  - "default port not stated in source (configurable via http_port key)"
  - "default SSL port not stated in source (configurable via http_sport key)"
  - "password not stated in source; firmware 4.14.2+ requires admin password to be set"
  - "source does not document explicit multi-step macros. The SET..."
  - "source does not document explicit safety interlocks. Note:"
  - "- Default HTTP/HTTPS port numbers not stated in source (configurable via http_port / http_sport)."
verification:
  verdict: verified
  checked_at: 2026-10-07T11:19:57.819Z
  matched_actions: 92
  action_count: 92
  confidence: medium
  summary: "All 92 wire-literal actions match the Pearl legacy API guide, transport values are supported, and only two display-only keys (ac_allowips, ac_denyips) are unrepresented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Epiphan Pearl Control Spec

## Summary
This spec covers the Legacy RS-232 and Legacy HTTP/HTTPS control APIs on the Epiphan Pearl family (Pearl-2, Pearl Mini, Pearl Nexus, Pearl Nano) for recording control, streaming control, and configuration parameter GET/SET. The new REST API is recommended by the vendor; this spec documents the legacy surfaces only.

<!-- UNRESOLVED: New REST API (https://epiphan-video.github.io/pearl_api_swagger_ui/) is not modeled here; vendor recommends it over these legacy APIs. -->

## Transport
```yaml
protocols:
  - serial
  - http
serial:
  baud_rate: 19200
  data_bits: UNRESOLVED  # source does not state this (was 8)
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED  # configurable: hardware | software | none; source does not state a default
addressing:
  base_url: "http://<address>/admin"  # HTTP base path; HTTPS also supported per source
  http_port: null  # UNRESOLVED: default port not stated in source (configurable via http_port key)
  https_port: null  # UNRESOLVED: default SSL port not stated in source (configurable via http_sport key)
auth:
  type: basic
  username: admin
  password: null  # UNRESOLVED: password not stated in source; firmware 4.14.2+ requires admin password to be set
```

## Traits
```yaml
- powerable  # inferred from recording on/off commands
- queryable  # inferred from GET/STATUS/RECTIME/FREESPACE queries
- routable  # inferred from stream / broadcast publishing commands
- levelable  # inferred from audio bitrate / volume / touchscreen backlight keys
```

## Actions
```yaml
# RS-232 commands (terminated with LF, ASCII 10). Channel/recorder names follow
# the command separated by a period. "m<recorder>" form targets recorder.
# SET must be followed by SAVECFG to persist.

- id: start_recording_channel
  label: Start Recording (Channel)
  kind: action
  command: "START.{channel}"
  params:
    - name: channel
      type: string
      description: Channel index (e.g. "1") or channel name

- id: start_recording_recorder
  label: Start Recording (Recorder)
  kind: action
  command: "START.m{recorder}"
  params:
    - name: recorder
      type: integer
      description: Recorder index number

- id: start_recording_all
  label: Start Recording (All Channels and Recorders)
  kind: action
  command: "START"
  params: []

- id: stop_recording_channel
  label: Stop Recording (Channel)
  kind: action
  command: "STOP.{channel}"
  params:
    - name: channel
      type: string
      description: Channel index or channel name

- id: stop_recording_recorder
  label: Stop Recording (Recorder)
  kind: action
  command: "STOP.m{recorder}"
  params:
    - name: recorder
      type: integer
      description: Recorder index number

- id: stop_recording_all
  label: Stop Recording (All)
  kind: action
  command: "STOP"
  params: []

- id: get_config_channel
  label: GET Config (Channel)
  kind: query
  command: "GET.{channel}.{key}"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: key
      type: string
      description: Configuration key (see Configuration keys for third party APIs)

- id: get_config_recorder
  label: GET Config (Recorder)
  kind: query
  command: "GET.m{recorder}.{key}"
  params:
    - name: recorder
      type: integer
      description: Recorder index
    - name: key
      type: string
      description: Configuration key

- id: set_config_channel
  label: SET Config (Channel)
  kind: action
  command: "SET.{channel}.{key}={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: key
      type: string
      description: Configuration key
    - name: value
      type: string
      description: New value for the key (enclose in quotes if value contains spaces)

- id: set_config_recorder
  label: SET Config (Recorder)
  kind: action
  command: "SET.m{recorder}.{key}={value}\nSAVECFG"
  params:
    - name: recorder
      type: integer
      description: Recorder index
    - name: key
      type: string
      description: Configuration key
    - name: value
      type: string
      description: New value for the key

- id: save_config
  label: SAVECFG (Persist Most Recent SET)
  kind: action
  command: "SAVECFG"
  params: []

- id: var_get
  label: GET Global Variable
  kind: query
  command: "VAR.GET.{name}"
  params:
    - name: name
      type: string
      description: Variable name (max 32 alphanum chars, [A-Za-z_0-9], must start with letter or underscore)

- id: var_set
  label: SET Global Variable
  kind: action
  command: "VAR.SET.{name}={value}"
  params:
    - name: name
      type: string
      description: Variable name (max 32 chars, [A-Za-z_0-9], must start with letter or underscore)
    - name: value
      type: string
      description: Variable value (max 32 alphanum chars; omit quotes; do NOT quote if value contains spaces)

- id: status_channel
  label: Status (Channel)
  kind: query
  command: "STATUS.{channel}"
  params:
    - name: channel
      type: string
      description: Channel index or name

- id: status_recorder
  label: Status (Recorder)
  kind: query
  command: "STATUS.m{recorder}"
  params:
    - name: recorder
      type: integer
      description: Recorder index

- id: status_all
  label: Status (All)
  kind: query
  command: "STATUS"
  params: []

- id: freespaces
  label: Free Storage Space
  kind: query
  command: "FREESPACE"
  params: []

- id: rectime_channel
  label: Recording Time (Channel)
  kind: query
  command: "RECTIME.{channel}"
  params:
    - name: channel
      type: string
      description: Channel index or name

- id: rectime_recorder
  label: Recording Time (Recorder)
  kind: query
  command: "RECTIME.m{recorder}"
  params:
    - name: recorder
      type: integer
      description: Recorder index

- id: rectime_all
  label: Recording Time (All Channels)
  kind: query
  command: "RECTIME"
  params: []

# HTTP/HTTPS GET/SET endpoints (admin credentials required, --http-user / --http-passwd
# or Basic auth). Examples use IP address and admin password "pass123".

- id: http_get_config_channel
  label: HTTP GET Config (Channel)
  kind: query
  command: "GET http://<address>/admin/channel<N>/get_params.cgi?<key>[&<key>]"
  params:
    - name: address
      type: string
      description: Pearl IP address
    - name: N
      type: integer
      description: Channel number (e.g. 1)
    - name: key
      type: string
      description: Configuration key (may be repeated, separated by &)

- id: http_get_config_recorder
  label: HTTP GET Config (Recorder)
  kind: query
  command: "GET http://<address>/admin/channelm<N>/get_params.cgi?<key>[&<key>]"
  params:
    - name: address
      type: string
      description: Pearl IP address
    - name: N
      type: integer
      description: Recorder number
    - name: key
      type: string
      description: Configuration key

- id: http_set_config_channel
  label: HTTP SET Config (Channel)
  kind: action
  command: "GET http://<address>/admin/channel<N>/set_params.cgi?<key>=<value>[&<key>=<value>]"
  params:
    - name: address
      type: string
      description: Pearl IP address
    - name: N
      type: integer
      description: Channel number
    - name: key
      type: string
      description: Configuration key
    - name: value
      type: string
      description: Value (URL-encode spaces as %20)

- id: http_set_config_recorder
  label: HTTP SET Config (Recorder)
  kind: action
  command: "GET http://<address>/admin/channelm<N>/set_params.cgi?<key>=<value>"
  params:
    - name: address
      type: string
      description: Pearl IP address
    - name: N
      type: integer
      description: Recorder number
    - name: key
      type: string
      description: Configuration key
    - name: value
      type: string
      description: Value

- id: http_set_variables
  label: HTTP Set Global Variables
  kind: action
  command: "GET http://<address>/admin/set_variables.cgi?<name1>=<value1>[&<nameN>=<valueN>]"
  params:
    - name: address
      type: string
      description: Pearl IP address
    - name: name1
      type: string
      description: First variable name (https not supported for this endpoint)
    - name: value1
      type: string
      description: Value (URL-encode spaces as %20)

- id: http_get_variables
  label: HTTP Get Global Variables
  kind: query
  command: "GET http://<address>/admin/get_variables.cgi?[<name1>[&<nameN>]]"
  params:
    - name: address
      type: string
      description: Pearl IP address
    - name: name1
      type: string
      description: Optional variable name; omit to retrieve all

# Configuration keys (subset of GET/SET keys documented in source). Each key
# is addressable via SET.<channel>.<key> or GET.<channel>.<key> on RS-232, or
# via set_params.cgi / get_params.cgi over HTTP.

- id: set_frmcheck_enabled
  label: Set Firmware Update Check
  kind: action
  command: "SET.frmcheck_enabled={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: "on" to enable, "" (empty string) to disable

- id: set_description
  label: Set System Description
  kind: action
  command: "SET.description={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: Description string for Epiphan discovery utility

- id: set_rec_enabled
  label: Set Recording Enabled
  kind: action
  command: "SET.<channel>.rec_enabled={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: "on" to enable, "" to disable

- id: set_rec_format
  label: Set Recording Format
  kind: action
  command: "SET.<channel>.rec_format={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: "avi | mov | mp4 | mp4f | ts"

- id: set_rec_prefix
  label: Set Recording Filename Prefix
  kind: action
  command: "SET.<channel>.rec_prefix={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: Filename prefix string

- id: set_rec_sizelimit
  label: Set Recording File Size Limit
  kind: action
  command: "SET.<channel>.rec_sizelimit={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: File size limit in kilobytes

- id: set_rec_timelimit
  label: Set Recording Time Limit
  kind: action
  command: "SET.<channel>.rec_timelimit={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: hh:mm:ss without quotes (e.g. 3:00:00)

- id: set_http_port
  label: Set HTTP Port
  kind: action
  command: "SET.http_port={value}\nSAVECFG"
  params:
    - name: value
      type: integer
      description: HTTP server port number

- id: set_http_sport
  label: Set HTTPS Port
  kind: action
  command: "SET.http_sport={value}\nSAVECFG"
  params:
    - name: value
      type: integer
      description: HTTPS (SSL) server port number

- id: set_http_usessl
  label: Enable HTTPS
  kind: action
  command: "SET.http_usessl={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: "on" to enable SSL, "" to disable

- id: set_allowips
  label: Set Allowed IPs
  kind: action
  command: "SET.allowips={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: Comma-separated list of IPs/ranges; empty string clears

- id: set_denyips
  label: Set Denied IPs
  kind: action
  command: "SET.denyips={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: Comma-separated list of IPs/ranges; empty string clears

- id: set_share_archive
  label: Enable UPnP Archive Share
  kind: action
  command: "SET.share_archive={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: "on" to enable UPnP recording share, "" to disable

- id: set_share_livestreams
  label: Enable UPnP Live Stream Share
  kind: action
  command: "SET.share_livestreams={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: "on" to enable, "" to disable

- id: set_server_name
  label: Set UPnP Server Name
  kind: action
  command: "SET.server_name={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: UPnP server name; empty string uses system name

- id: set_bcast_disabled
  label: Disable Broadcast
  kind: action
  command: "SET.<channel>.bcast_disabled={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: "on" to disable broadcast, "" to enable

- id: set_rtsp_port
  label: Set RTSP Port
  kind: action
  command: "SET.<channel>.rtsp_port={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "Port in 1000..65535; not 5557 (reserved for discovery)"

- id: set_streamport
  label: Set Stream Port
  kind: action
  command: "SET.<channel>.streamport={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "Port in 1000..65535; not 5557 (reserved for discovery)"

- id: set_ac_override
  label: Override Global Stream Access
  kind: action
  command: "SET.<channel>.ac_override={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: "on" to override, "" to use global

- id: set_ac_viewerpwd
  label: Set Viewer Password
  kind: action
  command: "SET.<channel>.ac_viewerpwd={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: Viewer password string

- id: set_autoframesize
  label: Set Auto-Frame-Size
  kind: action
  command: "SET.<channel>.autoframesize={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: "on" to follow signal resolution, "" to use manual framesize

- id: set_codec
  label: Set Codec
  kind: action
  command: "SET.<channel>.codec={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: "h.264 | mjpeg"

- id: set_fpslimit
  label: Set FPS Limit
  kind: action
  command: "SET.<channel>.fpslimit={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "1..60"

- id: set_framesize
  label: Set Frame Size
  kind: action
  command: "SET.<channel>.framesize={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: "Width x height (e.g. 640x480). Quote value if it contains spaces (e.g. \"640 x 480\")"

- id: set_slicemode
  label: Set H.264 Slicing (RTP)
  kind: action
  command: "SET.<channel>.slicemode={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: "on" to enable, "" to disable

- id: set_vbitrate
  label: Set Video Bitrate
  kind: action
  command: "SET.<channel>.vbitrate={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: Video bitrate in kbps

- id: set_vbufmode
  label: Set Broadcast Compression Level
  kind: action
  command: "SET.<channel>.vbufmode={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "1 (low delay, streaming) | 2 (best quality, recording)"

- id: set_vencpreset
  label: Set Video Encode Preset
  kind: action
  command: "SET.<channel>.vencpreset={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "0 (Software) | 5 (Hardware Accelerated)"

- id: set_vkeyframeinterval
  label: Set Keyframe Interval
  kind: action
  command: "SET.<channel>.vkeyframeinterval={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: Interval in seconds between key frames

- id: set_vprofile
  label: Set H.264 Profile
  kind: action
  command: "SET.<channel>.vprofile={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "66 (Baseline) | 77 (Main) | 100 (High)"

- id: set_qvalue
  label: Set M-JPEG Quality
  kind: action
  command: "SET.<channel>.qvalue={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "0..100"

- id: set_active_layout
  label: Set Active Layout
  kind: action
  command: "SET.<channel>.active_layout={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: Layout identifier (always 1 on Pearl Nano)

- id: set_audio
  label: Set Audio on Channel
  kind: action
  command: "SET.<channel>.audio={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: "on" to enable, "" to disable

- id: set_audiobitrate
  label: Set Audio Bitrate
  kind: action
  command: "SET.<channel>.audiobitrate={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "32 | 64 | 96 | 112 | 128 | 160 | 192 kbps"

- id: set_audiochannels
  label: Set Audio Channel Count
  kind: action
  command: "SET.<channel>.audiochannels={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "1 (mono) | 2 (stereo)"

- id: set_audiopreset
  label: Set Audio Codec Preset
  kind: action
  command: "SET.<channel>.audiopreset={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: "CODEC;RATE, e.g. libfaac;22050"

- id: set_publish_enabled
  label: Set Publish Stream Enabled
  kind: action
  command: "SET.<channel>:<stream>.publish_enabled={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: stream
      type: integer
      description: Logical stream index (0 = first stream, 1 = second)
    - name: value
      type: string
      description: "on" to start publishing, "" to stop

- id: set_publish_type
  label: Set Publish Type
  kind: action
  command: "SET.<channel>.publish_type={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "0 (do not publish) | 2 (RTSP Announce) | 3 (multicast RTP/UDP) | 4 (multicast MPEG-TS over UDP) | 5 (multicast MPEG-TS over RTP/UDP) | 6 (RTMP push)"

- id: set_rtsp_url
  label: Set RTSP URL
  kind: action
  command: "SET.<channel>.rtsp_url={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: RTSP server announce URL

- id: set_rtsp_transport
  label: Set RTSP Transport
  kind: action
  command: "SET.<channel>.rtsp_transport={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: "tcp | udp (or \"\" for udp)"

- id: set_rtsp_username
  label: Set RTSP Username
  kind: action
  command: "SET.<channel>.rtsp_username={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: RTSP server username

- id: set_rtsp_password
  label: Set RTSP Password
  kind: action
  command: "SET.<channel>.rtsp_password={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: RTSP server password

- id: set_unicast_address
  label: Set Unicast/Multicast Address
  kind: action
  command: "SET.<channel>.unicast_address={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: IP address (used for RTP/UDP and MPEG-TS)

- id: set_unicast_aport
  label: Set RTP/UDP Audio Port
  kind: action
  command: "SET.<channel>.unicast_aport={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "Port 1000..65535; not 5557"

- id: set_unicast_vport
  label: Set RTP/UDP Video Port
  kind: action
  command: "SET.<channel>.unicast_vport={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "Port 1000..65535; not 5557"

- id: set_unicast_mport
  label: Set MPEG-TS Port
  kind: action
  command: "SET.<channel>.unicast_mport={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: "Port 1000..65535; not 5557"

- id: set_sap
  label: Set SAP Shares Files
  kind: action
  command: "SET.<channel>.sap={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: "on" to enable, "" to disable

- id: set_sap_channel_no
  label: Set SAP Channel Number
  kind: action
  command: "SET.<channel>.sap_channel_no={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: integer
      description: SAP channel number

- id: set_sap_group
  label: Set SAP Group Name
  kind: action
  command: "SET.<channel>.sap_group={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: SAP group name

- id: set_sap_ip
  label: Set SAP Announcement IP
  kind: action
  command: "SET.<channel>.sap_ip={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: SAP announcement IP

- id: set_rtmp_url
  label: Set RTMP URL
  kind: action
  command: "SET.<channel>.rtmp_url={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: RTMP server URL

- id: set_rtmp_stream
  label: Set RTMP Stream Name
  kind: action
  command: "SET.<channel>.rtmp_stream={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: RTMP stream name (as configured with CDN)

- id: set_rtmp_username
  label: Set RTMP Username
  kind: action
  command: "SET.<channel>.rtmp_username={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: RTMP server username

- id: set_rtmp_password
  label: Set RTMP Password
  kind: action
  command: "SET.<channel>.rtmp_password={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: RTMP server password

- id: set_content_author
  label: Set Content Author
  kind: action
  command: "SET.<channel>.author={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: Author name

- id: set_content_comment
  label: Set Content Comment
  kind: action
  command: "SET.<channel>.comment={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: Comment string

- id: set_content_copyright
  label: Set Content Copyright
  kind: action
  command: "SET.<channel>.copyright={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: Copyright string

- id: set_content_title
  label: Set Content Title
  kind: action
  command: "SET.<channel>.title={value}\nSAVECFG"
  params:
    - name: channel
      type: string
      description: Channel index or name
    - name: value
      type: string
      description: Title string

- id: set_touchscreen_backlight
  label: Set Touchscreen Backlight
  kind: action
  command: "SET.touchscreen_backlight={value}\nSAVECFG"
  params:
    - name: value
      type: integer
      description: "0..255"

- id: set_touchscreen_enabled
  label: Enable Touchscreen
  kind: action
  command: "SET.touchscreen_enabled={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: "on" to enable, "" to disable

- id: set_touchscreen_info
  label: Enable Touchscreen System Info
  kind: action
  command: "SET.touchscreen_info={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: "on" to enable, "" to disable

- id: set_touchscreen_preview
  label: Enable Touchscreen Channel Preview
  kind: action
  command: "SET.touchscreen_preview={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: "on" to enable, "" to disable

- id: set_touchscreen_recordctl
  label: Enable Touchscreen Recording Control
  kind: action
  command: "SET.touchscreen_recordctl={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: "on" to enable, "" to disable

- id: set_touchscreen_settings
  label: Enable Touchscreen Settings Changes
  kind: action
  command: "SET.touchscreen_settings={value}\nSAVECFG"
  params:
    - name: value
      type: string
      description: "on" to enable, "" to disable

- id: set_touchscreen_timeout
  label: Set Touchscreen Timeout
  kind: action
  command: "SET.touchscreen_timeout={value}\nSAVECFG"
  params:
    - name: value
      type: integer
      description: Timeout in seconds; 0 for no timeout

- id: set_custom_layout_variable
  label: Set Custom Layout Variable
  kind: action
  command: "SET.<name>={value}\nSAVECFG"
  params:
    - name: name
      type: string
      description: System-level variable name (max 32 alphanum chars [A-Za-z_0-9], starts with letter or underscore)
    - name: value
      type: string
      description: Variable value
```

## Feedbacks
```yaml
- id: recording_status
  label: Recording Status
  type: enum
  values: [RUNNING, STOPPED, UNINITIALIZED]
  description: Returned by STATUS.{channel}, STATUS.m{recorder}, and STATUS commands. UNINITIALIZED indicates internal error.

- id: free_space_bytes
  label: Free Storage Space
  type: integer
  description: Returned by FREESPACE command (bytes)

- id: rectime_seconds
  label: Recording Elapsed Time
  type: integer
  description: Elapsed recording time in seconds for current file on channel/recorder (returned by RECTIME variants)

- id: firmware_version
  label: Firmware Version
  type: string
  description: Read-only system key. Returns string prefixed with FIRMWARE_VERSION=

- id: mac_address
  label: MAC Address
  type: string
  description: Read-only system key

- id: product_name
  label: Product Name
  type: string
  description: Read-only system key

- id: vendor
  label: Vendor
  type: string
  description: Read-only system key. Always "Epiphan Video"

- id: config_value
  label: Configuration Parameter Value
  type: string
  description: Returned by GET.<channel>.<key> / GET.<recorder>.<key> for any configuration key

- id: global_variable_value
  label: Global Variable Value
  type: string
  description: Returned by VAR.GET.<name> / GET /admin/get_variables.cgi
```

## Variables
```yaml
# Source: "Important considerations" - global system variables are documented as
# stretchy text overlays in custom layouts. They are case-sensitive, max 32
# alphanum chars (must start with letter or underscore), 1024 unique per system,
# volatile (erased on reboot).
- id: global_variable
  label: Global System Variable
  type: string
  constraints:
    pattern: "^[A-Za-z_][A-Za-z0-9_]{0,31}$"
    max_per_system: 1024
    persistence: volatile
  description: Set via VAR.SET.<name>=<value> on RS-232 or /admin/set_variables.cgi on HTTP. Read via VAR.GET.<name> or /admin/get_variables.cgi.
```

## Events
```yaml
- id: status_changed
  label: Recording Status Change
  description: "Pearl Legacy API returns a status change message whenever changes are made. Format: STATUS.<channel> <status> where <status> is one of Running, Stopped, Uninitialized."
```

## Macros
```yaml
# UNRESOLVED: source does not document explicit multi-step macros. The SET...
# SAVECFG pairing is a documented two-step idiom (SET does not persist until
# SAVECFG is sent).
- id: set_and_save
  label: SET + SAVECFG pair
  description: Every SET command must be followed by SAVECFG for the new configuration to take effect. Sequence is documented, not a named macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document explicit safety interlocks. Note:
# - "UNINITIALIZED" status indicates an internal error per source.
# - SA recommendation: assign admin/operator/viewer passwords before updating
#   API scripts in firmware 4.14.2+ (or services will fail to connect).
```

## Notes
- This spec documents the **Legacy** RS-232 and HTTP/HTTPS APIs. The vendor recommends the new REST API at https://epiphan-video.github.io/pearl_api_swagger_ui/ — not covered here.
- All RS-232 commands are LF-terminated (ASCII 10). Configure the terminal for UTF-8.
- Every RS-232 SET must be followed by SAVECFG to persist the new value.
- RS-232 static serial settings: 19200 baud, data bits UNRESOLVED, no parity, 1 stop bit. Flow control is configurable (hardware / software / none) via the admin panel; source does not state a default.
- Pearl Nano is single-channel: channel index always 1, layout identifier always 1. Commands targeting multiple channels, layouts, recorders, touch screen, or Motion JPEG are ignored or applied to only the single channel/layout on Pearl Nano.
- "The publish_enabled on/off command does not work on multiple publish destinations and only starts/stops the first instance." (vendor note)
- Channel/recorder addressing: `<channel>` for channels, `m<recorder>` for recorders (e.g. `m2` for recorder 2).
- HTTP API requires admin credentials (Basic auth / `--http-user` / `--http-passwd`). On firmware 4.14.2+, the admin password must be set or default-installation connections will fail.
- HTTP URL encoding: spaces are `%20`.
- For RS-232 SET, values with spaces must be quoted; for HTTP, spaces must be URL-encoded.
- Channel index numbers in the source include a trailing `<channel>` form (e.g. `PUBLISH.1:0.publish_enabled=on`) — the bracket and angle-bracket notation in the source means a logical stream index `0` following the channel.
- Touchscreen keys are not supported on Pearl Nano (per source).
- New REST API exists at https://epiphan-video.github.io/pearl_api_swagger_ui/ — not covered here.
- Default HTTP/HTTPS port not stated in source; configurable via http_port / http_sport. Port 5557 reserved for network discovery.

<!-- UNRESOLVED:
- Default HTTP/HTTPS port numbers not stated in source (configurable via http_port / http_sport).
- Default admin password not stated (firmware 4.14.2+ requires it to be set).
- Firmware version compatibility ranges beyond 4.12.1 baseline not exhaustively listed.
- New REST API not documented here.
-->

## Provenance

```yaml
source_domains:
  - epiphan.com
  - epiphan-video.github.io
source_urls:
  - https://www.epiphan.com/userguides/pdfs/Epiphan-Pearl-API-Guide.pdf
  - https://epiphan-video.github.io/pearl_api_swagger_ui/
  - https://epiphan-video.github.io/pearl_api_swagger_ui/api/v2.0/openapi.yml
  - https://www.epiphan.com/userguides/pearl-api/Content/Home-Pearl-api.htm
retrieved_at: 2026-04-29T16:56:02.893Z
last_checked_at: 2026-10-07T11:19:57.819Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:19:57.819Z
matched_actions: 92
action_count: 92
confidence: medium
summary: "All 92 wire-literal actions match the Pearl legacy API guide, transport values are supported, and only two display-only keys (ac_allowips, ac_denyips) are unrepresented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- ac_allowips
- ac_denyips
- "New REST API (https://epiphan-video.github.io/pearl_api_swagger_ui/) is not modeled here; vendor recommends it over these legacy APIs."
- "default port not stated in source (configurable via http_port key)"
- "default SSL port not stated in source (configurable via http_sport key)"
- "password not stated in source; firmware 4.14.2+ requires admin password to be set"
- "source does not document explicit multi-step macros. The SET..."
- "source does not document explicit safety interlocks. Note:"
- "- Default HTTP/HTTPS port numbers not stated in source (configurable via http_port / http_sport)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
