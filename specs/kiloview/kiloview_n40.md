---
spec_id: admin/kiloview-n40
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kiloview N40 Control Spec"
manufacturer: Kiloview
model_family: "Kiloview N40"
aliases: []
compatible_with:
  manufacturers:
    - Kiloview
  models:
    - "Kiloview N40"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - enstatic.kiloview.com
source_urls:
  - https://enstatic.kiloview.com/wp-content/uploads/2026/03/N60N50-API-EN.pdf
retrieved_at: 2026-04-30T04:41:23.663Z
last_checked_at: 2026-06-02T22:08:36.467Z
generated_at: 2026-06-02T22:08:36.467Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is labeled \"Kiloview N60\" — N40 API parity not explicitly confirmed"
  - "firmware version compatibility not stated in source"
  - "the source does not describe unsolicited push events or WebSocket subscriptions."
  - "no multi-step macro sequences described in source"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility ranges not stated"
  - "maximum concurrent API connections not stated"
  - "error code catalog not provided beyond result=\"error\" with msg field"
  - "whether unsolicited event/WebSocket push exists is not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:08:36.467Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Kiloview N40 Control Spec

## Summary
The Kiloview N40 is a bi-directional NDI converter supporting both NDI High Bandwidth (HB) and NDI|HX encoding/decoding. This spec covers its HTTP REST API for device management, video encoding/decoding control, PTZ pass-through, network configuration, voice intercom, and recording. The API source document is titled for the N60 model; the N40 is assumed to share the same API surface within the product family.

<!-- UNRESOLVED: source document is labeled "Kiloview N60" — N40 API parity not explicitly confirmed -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{device_ip}/api"
  port: 80  # default HTTP port; HTTPS port 443 also available
auth:
  type: token
  description: >
    Login via POST /api/systemctrl/users/login with username/password.
    Returns a token and alias. Construct a cookie with user, alias, and token
    values, then validate via POST /api/systemctrl/users/session.
    Subsequent requests must include the cookie in the request header.
```

## Traits
```yaml
- powerable    # inferred from reboot and factory reset commands
- queryable    # inferred from extensive get/status query endpoints
- recordable   # inferred from recording start/stop and file management endpoints
```

## Actions
```yaml
- id: user_login
  label: User Login
  kind: action
  params:
    - name: username
      type: string
      description: Username (default "admin")
    - name: password
      type: string
      description: Password
  endpoint: POST /api/systemctrl/users/login

- id: user_session_verify
  label: Verify Login Session
  kind: action
  params:
    - name: cookie
      type: string
      description: "Cookie string: language={}; user={}; alias={}; token={}"
  endpoint: POST /api/systemctrl/users/session

- id: set_working_mode
  label: Set Working Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "encode or decode"
  endpoint: "POST /api/codec/mode/set?mode={mode}"
  notes: Device restarts after switching; takes ~1 minute.

- id: reboot_device
  label: Reboot Device
  kind: action
  params: []
  endpoint: POST /api/systemctrl/system/reboot

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []
  endpoint: POST /api/systemctrl/system/reFactory

- id: restore_codec
  label: Restart Codec Service
  kind: action
  params: []
  endpoint: POST /api/systemctrl/system/restore

- id: set_hostname
  label: Set Device Name
  kind: action
  params:
    - name: name
      type: string
      description: Device hostname
  endpoint: POST /api/systemctrl/system/setHostname

- id: set_http_protocol
  label: Set HTTP/HTTPS Ports
  kind: action
  params:
    - name: http
      type: boolean
      description: Enable HTTP
    - name: https
      type: boolean
      description: Enable HTTPS
    - name: httpPort
      type: integer
      description: HTTP port number
    - name: httpsPort
      type: integer
      description: HTTPS port number
  endpoint: POST /api/systemctrl/system/setProtocol
  notes: HTTP and HTTPS cannot both be disabled simultaneously.

- id: choose_encode_stream
  label: Select Encoding Streams
  kind: action
  params:
    - name: main
      type: integer
      description: "NDI|HX stream - 0: off, 1: on"
    - name: main_full
      type: integer
      description: "NDI|HB stream - 0: off, 1: on"
    - name: srt
      type: integer
      description: "SRT stream - 0: off, 1: on"
  endpoint: POST /api/codec/encoders/choose_encode

- id: set_encoder_main
  label: Set NDI|HX Encoding Parameters
  kind: action
  params:
    - name: key
      type: string
      description: "Must be \"main\""
    - name: target_bitrate
      type: integer
      description: "Bitrate quality - 55: Very Low, 75: Low, 100: Default, 150: High, 200: Very High"
    - name: mode_version
      type: integer
      description: "1: x-h264, 2: x-h265"
    - name: hx_version
      type: integer
      description: "2: NDI|HX2, 3: NDI|HX3"
  endpoint: POST /api/codec/encoder/main/set

- id: set_encoder_main_full
  label: Set NDI|HB Encoding Parameters
  kind: action
  params:
    - name: key
      type: string
      description: "Must be \"main_full\""
    - name: target_bitrate
      type: integer
      description: "Bitrate quality - 55: Very Low, 75: Low, 100: Default, 150: High, 200: Very High"
  endpoint: POST /api/codec/encoder/main_full/set

- id: set_stream_config
  label: Set Stream Configuration
  kind: action
  params:
    - name: stream_name
      type: string
      description: "Path param - main, main_full, or multi_protocol"
    - name: stream_key
      type: string
      description: "Path param - ndi-hx, ndi-full, or srt"
    - name: group
      type: string
      description: NDI group name
    - name: channel_name
      type: string
      description: NDI channel name
    - name: connection
      type: string
      description: "Connection method - disable_rudp, rudp, udp, multicast"
  endpoint: "POST /api/codec/streams/{stream_name}/{stream_key}/set"

- id: reset_stream
  label: Re-stream
  kind: action
  params:
    - name: stream_name
      type: string
      description: "main, main_full, or multi_protocol"
  endpoint: "POST /api/codec/streams/{stream_name}/reset"

- id: decode_select_stream
  label: Select Decoding Stream
  kind: action
  params:
    - name: name
      type: string
      description: NDI source name
    - name: url
      type: string
      description: "NDI source URL (IP:port format)"
    - name: group
      type: string
      description: NDI group
  endpoint: POST /api/codec/decode/addSpec

- id: decode_select_preset
  label: Select Decoding Preset
  kind: action
  params:
    - name: id
      type: integer
      description: "Preset ID 0-9 (0 = blank output)"
  endpoint: POST /api/codec/decode/add

- id: decode_output_set
  label: Set Decoding Output Parameters
  kind: action
  params:
    - name: output_resolution
      type: string
      description: "auto / 1280x720 / 1920x1080 / 3840x2160"
    - name: hdmi_channels
      type: integer
      description: "HDMI audio channel count - 2, 4, 6, or 8"
    - name: line_out_channels
      type: integer
      description: Line-out audio channel count
    - name: hdcp
      type: integer
      description: "0: disabled, 1: enabled"
    - name: out_colorspace
      type: integer
      description: "0: RGB444, 1: YUV422, 2: YUV444"
  endpoint: POST /api/codec/decode/output_set

- id: set_decode_connection_mode
  label: Set NDI Connection Mode
  kind: action
  params:
    - name: ndi_connection
      type: string
      description: "tcp, rudp, unicast, or multicast"
  endpoint: POST /api/codec/decode/setConnection

- id: set_discovery_server
  label: Set Discovery Server
  kind: action
  params:
    - name: enable
      type: boolean
      description: Enable discovery server
    - name: address
      type: string
      description: Discovery server address
  endpoint: POST /api/codec/discovery/setDiscoveryServer

- id: add_manual_ndi_source
  label: Add Manual NDI Source
  kind: action
  params:
    - name: groups
      type: array
      description: NDI group names
    - name: manuals
      type: array
      description: List of IP addresses
  endpoint: POST /api/codec/discovery/addManualIpsGroups

- id: preset_add
  label: Add Preset
  kind: action
  params:
    - name: position
      type: integer
      description: "Preset slot 1-9"
    - name: name
      type: string
      description: NDI source name
    - name: url
      type: string
      description: NDI source URL
    - name: group
      type: string
      description: NDI group
  endpoint: POST /api/codec/preset/add

- id: preset_remove
  label: Remove Preset
  kind: action
  params:
    - name: id
      type: integer
      description: "Preset ID 1-9"
  endpoint: POST /api/codec/preset/remove

- id: preset_set_blank_color
  label: Set Blank Screen Color
  kind: action
  params:
    - name: BlankColor
      type: string
      description: Hex color code (e.g. "#ffffff")
  endpoint: POST /api/codec/preset/set_blank_color

- id: ptz_decode_control
  label: PTZ Decode Control
  kind: action
  params:
    - name: action
      type: string
      description: "Direction or command - up, left, down, right, and others"
    - name: speed
      type: integer
      description: "Speed 0-100, default 50"
    - name: id
      type: integer
      description: "Position for preset commands, 1-16"
  endpoint: POST /api/codec/ptz_decode/ptzControl

- id: ptz_encode_control
  label: PTZ Encode Control
  kind: action
  params:
    - name: action
      type: string
      description: "Direction or command - up, left, down, right, and others"
    - name: speed
      type: integer
      description: "Speed 0-100, default 50"
    - name: id
      type: integer
      description: "Position for preset commands, 1-16"
  endpoint: POST /api/codec/ptz/ptzControl

- id: ptz_modify
  label: Configure PTZ Connection
  kind: action
  params:
    - name: enable
      type: integer
      description: "0: off, 1: on"
    - name: typ
      type: string
      description: "network or serial"
    - name: ptz_protocol
      type: string
      description: "Sony Visca, Pelco-d, or Pelco-p"
    - name: protocol
      type: string
      description: "Network protocol - TCP or UDP (for network type)"
    - name: addr
      type: string
      description: PTZ camera IP address (for network type)
    - name: port
      type: integer
      description: PTZ camera port (for network type)
    - name: baudrate
      type: integer
      description: Baud rate (for serial type)
  endpoint: POST /api/codec/ptz/modify

- id: set_network_ethernet
  label: Set Network Card Configuration
  kind: action
  params:
    - name: ifname
      type: string
      description: "Network card - eth0 or eth1"
    - name: address
      type: string
      description: IP address
    - name: netmask
      type: string
      description: Subnet mask
    - name: gw
      type: string
      description: Gateway
    - name: method
      type: string
      description: "dhcp or static"
    - name: dns
      type: string
      description: "DNS servers, semicolon-separated"
  endpoint: POST /api/networkmanager/network/SetEthernets

- id: set_network_switch
  label: Enable/Disable Network Card
  kind: action
  params:
    - name: ifname
      type: string
      description: "Network card - eth0 or eth1"
    - name: enable
      type: boolean
      description: Enable or disable
  endpoint: POST /api/networkmanager/network/SetSwitch

- id: set_timezone
  label: Set Timezone
  kind: action
  params:
    - name: timezone
      type: string
      description: "Standard timezone string (e.g. Asia/Shanghai)"
    - name: offset
      type: integer
      description: "GMT offset -14 to 12, fallback if timezone not found"
  endpoint: POST /api/systemctrl/systime/setLocation

- id: set_system_time
  label: Set System Time
  kind: action
  params:
    - name: timetype
      type: string
      description: "pc, manual, or ntp"
    - name: time
      type: string
      description: "Time string Y-m-d H:M:S (for pc or manual)"
    - name: ntp
      type: string
      description: "NTP server addresses, space-separated (for ntp)"
  endpoint: POST /api/systemctrl/systime/setTime

- id: recording_start_stop
  label: Start/Stop Recording
  kind: action
  params:
    - name: start
      type: boolean
      description: "true: start, false: stop"
  endpoint: POST /api/record/ndi_hx/recording

- id: set_recording_settings
  label: Set Recording Configuration
  kind: action
  params:
    - name: disk_choose
      type: object
      description: "Selected NAS and USB disk IDs"
    - name: format
      type: string
      description: "Video file format (e.g. mov)"
    - name: limit_type
      type: string
      description: "None, size-loop, time-loop, size, or time"
    - name: limit_size
      type: integer
      description: Size limit in MB
    - name: limit_time
      type: integer
      description: Time limit in seconds
    - name: disk_policy
      type: string
      description: "overwrite or noSpace"
  endpoint: POST /api/record/record/settings

- id: upload_firmware
  label: Upload Firmware
  kind: action
  params:
    - name: file
      type: binary
      description: Firmware .bin file (multipart/form-data)
  endpoint: POST /api/systemctrl/system/upload
```

## Feedbacks
```yaml
- id: working_mode
  type: enum
  values: [encode, decode]
  description: Current encoding or decoding mode
  endpoint: GET /api/codec/mode/get

- id: hostname
  type: string
  description: Device name
  endpoint: GET /api/systemctrl/system/getHostname

- id: system_info
  type: object
  description: >
    Firmware version, CPU usage, memory usage, disk usage, uptime.
    Query params: version, cpu, memory, disk, persisTime (all boolean).
  endpoint: GET /api/systemctrl/system/getSystemInfo

- id: http_protocol_status
  type: object
  description: "HTTP/HTTPS enabled state and port numbers"
  endpoint: GET /api/systemctrl/system/getProtocol

- id: decode_info
  type: object
  description: >
    Current decoding source name, IP, resolution, codec, bitrate, frame rate,
    audio info, output resolution, HDCP status, channel mappings.
  endpoint: GET /api/codec/decode/get

- id: ndi_source_list
  type: array
  description: >
    Discovered NDI sources with name, group, URL, IP, port, device_name,
    channel_name.
  endpoint: GET /api/codec/discovery/scan

- id: discovery_server
  type: object
  description: "Discovery server enable state and address"
  endpoint: GET /api/codec/discovery/getDiscoveryServer

- id: manual_ndi_sources
  type: object
  description: "Manually added NDI source groups and addresses"
  endpoint: GET /api/codec/discovery/getManualIpsGroups

- id: preset_list
  type: array
  description: "All 9 preset slots with NDI source info and online status"
  endpoint: GET /api/codec/preset/get

- id: encoder_params
  type: object
  description: >
    Encoding parameters for the specified stream (bitrate, codec, profile,
    rate control, etc.).
  endpoint: "GET /api/codec/encoder/{encoder_stream}/get"

- id: encoder_capture
  type: object
  description: >
    Video source parameters - resolution, frame rate, signal status,
    source type (sdi/hdmi).
  endpoint: "GET /api/codec/encoder/{encoder_stream}/get_capture"

- id: stream_info
  type: object
  description: >
    Stream configuration - group, channel name, connection method,
    discovery server, enable state.
  endpoint: "GET /api/codec/streams/{stream_name}/{stream_key}/get"

- id: stream_dynamic_state
  type: object
  description: "Real-time bitrate and connection count for a stream"
  endpoint: "GET /api/codec/streams/{stream_name}/{stream_key}/get_dynamic_state"

- id: network_info
  type: array
  description: "Network settings for both NICs (eth0, eth1)"
  endpoint: GET /api/networkmanager/network/GetLinkinfo

- id: network_card_info
  type: object
  description: "Single NIC settings"
  endpoint: "GET /api/networkmanager/network/GetEthernets?ifname={ifname}"

- id: network_speed
  type: object
  description: "NIC receive/transmit speed and link speed"
  endpoint: "GET /api/systemctrl/system/getNetworkSpeed?ifname={ifname}"

- id: ptz_info
  type: object
  description: "PTZ connection config - type (network/serial), protocol, address, port"
  endpoint: GET /api/codec/ptz/getPtzInfo

- id: ptz_protocols
  type: array
  values: ["Sony Visca", "Pelco-d", "Pelco-p"]
  description: Supported PTZ protocols
  endpoint: GET /api/codec/ptz/getPtzProtocol

- id: recording_info
  type: object
  description: "Recording settings - format, limit type/size/time, disk policy"
  endpoint: GET /api/record/record/get_record_info

- id: disk_list
  type: object
  description: "Mounted USB and NAS disks with capacity info"
  endpoint: GET /api/record/storage/disk_list

- id: recorded_files
  type: array
  description: "List of recorded files with path, size, timestamps"
  endpoint: "GET /api/record/storage/get_disk_files?device={device}"
```

## Variables
```yaml
- id: target_bitrate_hx
  type: integer
  description: "NDI|HX encoding bitrate quality - 55: Very Low, 75: Low, 100: Default, 150: High, 200: Very High"
  set_endpoint: POST /api/codec/encoder/main/set

- id: target_bitrate_hb
  type: integer
  description: "NDI|HB encoding bitrate quality - same scale as HX"
  set_endpoint: POST /api/codec/encoder/main_full/set

- id: ndi_group
  type: string
  description: NDI group name for the encoding stream
  set_endpoint: "POST /api/codec/streams/{stream_name}/{stream_key}/set"

- id: ndi_channel_name
  type: string
  description: NDI channel name for the encoding stream
  set_endpoint: "POST /api/codec/streams/{stream_name}/{stream_key}/set"

- id: ndi_connection_mode
  type: enum
  values: [disable_rudp, rudp, udp, multicast]
  description: NDI connection method for encoding stream
  set_endpoint: "POST /api/codec/streams/{stream_name}/{stream_key}/set"

- id: decode_output_resolution
  type: enum
  values: [auto, "1280x720", "1920x1080", "3840x2160"]
  description: Decoding output resolution
  set_endpoint: POST /api/codec/decode/output_set

- id: hdcp_enable
  type: boolean
  description: HDCP enable/disable on decode output
  set_endpoint: POST /api/codec/decode/output_set
```

## Events
```yaml
# UNRESOLVED: the source does not describe unsolicited push events or WebSocket subscriptions.
# All data retrieval is via polling GET endpoints.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Note that set_working_mode triggers a device
# restart (~1 minute) and some encoder parameter changes cause brief black screen.
```

## Notes
- The API uses cookie-based session auth: login returns a token, which must be assembled into a cookie header for subsequent requests.
- The source document is titled "Kiloview N60" — the N40 shares this API within the N-series product family.
- Default HTTP port is 80, HTTPS port is 443. Both can be changed via `/api/systemctrl/system/setProtocol`.
- Switching encode/decode mode triggers a full device restart (~1 minute downtime).
- Changing certain encoder parameters (e.g., mode_version) causes the encoder to restart, resulting in a brief black screen.
- Device has two NICs (eth0, eth1) and supports link aggregation (bond0).
- PTZ control supports both network (TCP/UDP) and serial connections, with Sony Visca, Pelco-d, and Pelco-p protocols.
- Recording is currently limited to NDI|HX streams.
- Many endpoints use `{"result": "ok"}` as the standard success response.
- The `App` request header with `{"language":"en"}` is recommended for correct error messages.

<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: maximum concurrent API connections not stated -->
<!-- UNRESOLVED: error code catalog not provided beyond result="error" with msg field -->
<!-- UNRESOLVED: whether unsolicited event/WebSocket push exists is not documented -->

## Provenance

```yaml
source_domains:
  - enstatic.kiloview.com
source_urls:
  - https://enstatic.kiloview.com/wp-content/uploads/2026/03/N60N50-API-EN.pdf
retrieved_at: 2026-04-30T04:41:23.663Z
last_checked_at: 2026-06-02T22:08:36.467Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:08:36.467Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is labeled \"Kiloview N60\" — N40 API parity not explicitly confirmed"
- "firmware version compatibility not stated in source"
- "the source does not describe unsolicited push events or WebSocket subscriptions."
- "no multi-step macro sequences described in source"
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility ranges not stated"
- "maximum concurrent API connections not stated"
- "error code catalog not provided beyond result=\"error\" with msg field"
- "whether unsolicited event/WebSocket push exists is not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
