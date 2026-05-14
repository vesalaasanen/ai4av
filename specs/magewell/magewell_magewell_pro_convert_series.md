---
spec_id: admin/magewell-pro-convert-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Magewell Pro Convert Series Control Spec"
manufacturer: Magewell
model_family: "Pro Convert HDMI 4K Plus"
aliases: []
compatible_with:
  manufacturers:
    - Magewell
  models:
    - "Pro Convert HDMI 4K Plus"
    - "Pro Convert HDMI Plus"
    - "Pro Convert HDMI TX"
    - "Pro Convert 12G SDI 4K Plus"
    - "Pro Convert SDI 4K Plus"
    - "Pro Convert SDI Plus"
    - "Pro Convert SDI TX"
    - "Pro Convert HDMI 4K Plus Module"
    - "Pro Convert HDMI Plus Module"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - magewell.com
source_urls:
  - https://www.magewell.com/api-docs/pro-convert-encoder-api/pro-convert-encoder-api-en_US.pdf
retrieved_at: 2026-04-30T04:36:41.443Z
last_checked_at: 2026-04-30T14:47:51.509Z
generated_at: 2026-04-30T14:47:51.509Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T14:47:51.509Z
  matched_actions: 54
  action_count: 54
  confidence: high
  summary: "All 54 spec actions matched to source methods using semantic-id convention; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Magewell Pro Convert Series Control Spec

## Summary
Magewell Pro Convert series are video converters (HDMI/SDI to NDI) with an HTTP-based control API. The API uses GET for queries and configuration changes, POST for file uploads, and returns JSON responses. Authentication is session-based via cookies carrying a session ID obtained at login.

<!-- UNRESOLVED: no firmware version compatibility range stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{device_ip}/mwapi"
  # UNRESOLVED: HTTP port not explicitly stated; examples use default port 80
auth:
  type: session
  description: "Login via GET with MD5-encrypted password; session ID returned in cookie (sid=xxxxxxxxx). Subsequent requests carry cookie for authentication."
```

## Traits
```yaml
traits:
  - powerable       # reboot command present
  - queryable       # extensive query commands (get-caps, get-summary-info, get-signal-info, etc.)
  - levelable       # brightness, contrast, hue, saturation controls
  - configurable    # extensive configuration APIs (video, EDID, NDI, network, PTZ)
```

## Actions
```yaml
actions:
  - id: ping
    label: Ping
    kind: action
    method: GET
    params: []
    description: "Detect whether device is accessible without login"

  - id: login
    label: Login
    kind: action
    method: GET
    params:
      - name: id
        type: string
        description: "User ID"
      - name: pass
        type: string
        description: "MD5 encrypted password"
    description: "Log in; session ID set in cookie"

  - id: logout
    label: Logout
    kind: action
    method: GET
    params: []
    description: "Log out and invalidate session"

  - id: sync_time
    label: Sync Time
    kind: action
    method: GET
    params:
      - name: date
        type: string
        description: "UTC date format dd/MM/yyyy"
      - name: time
        type: string
        description: "UTC time format HH:mm:ss"
    description: "Synchronize device clock with UTC"

  - id: reboot
    label: Reboot
    kind: action
    method: GET
    params: []
    description: "Reboot the device; use ping to confirm restart complete"

  - id: set_auto_reboot
    label: Set Auto Reboot
    kind: action
    method: GET
    params:
      - name: enable
        type: boolean
        description: "Enable/disable auto reboot"
      - name: week-flags
        type: integer
        description: "Bitmask sum for days (Mon=1..Sat=32, Sun=0)"
      - name: hour
        type: integer
        description: "Hour 0-23 in UTC"
      - name: min
        type: integer
        description: "Minute 0-59"
    description: "Configure scheduled auto reboot"

  - id: reset_all_settings
    label: Reset All Settings
    kind: action
    method: GET
    params: []
    description: "Factory reset all settings; device restarts. Only via USB RNDIS."

  - id: set_video_config
    label: Set Video Config
    kind: action
    method: GET
    params:
      - name: brightness
        type: integer
        description: "Brightness -100 to +100"
      - name: contrast
        type: integer
        description: "Contrast 50 to 200"
      - name: hue
        type: integer
        description: "Hue -90 to 90"
      - name: saturation
        type: integer
        description: "Saturation 0 to 200"
      - name: in-auto-color-fmt
        type: boolean
        description: "Auto-detect input color space"
      - name: in-color-fmt
        type: string
        description: "Input color space: rgb, bt.601, bt.709, bt.2020"
      - name: in-auto-quant-range
        type: boolean
        description: "Auto-detect input quantization range"
      - name: in-quant-range
        type: string
        description: "Input quantization range: full, limited"
      - name: deinterlace
        type: string
        description: "Deinterlace mode: none, top-field, bottom-field"
      - name: ar-convertion
        type: string
        description: "Aspect ratio conversion: ignore, cropping, padding"
      - name: out-flip
        type: boolean
        description: "Vertically flip output"
      - name: out-mirror
        type: boolean
        description: "Horizontally flip output"
      - name: out-cx
        type: integer
        description: "Output width (multiple of 4)"
      - name: out-cy
        type: integer
        description: "Output height (multiple of 2)"
      - name: out-raw-resolution
        type: boolean
        description: "Output resolution follows input"
      - name: out-fr-convertion
        type: string
        description: "Output frame rate: raw, half, one-third, quarter"
      - name: out-auto-color-fmt
        type: boolean
        description: "Auto-detect output color space"
      - name: out-color-fmt
        type: string
        description: "Output color space: bt.601, bt.709, bt.2020"
      - name: out-auto-sat-range
        type: boolean
        description: "Auto-detect output saturation range"
      - name: out-sat-range
        type: string
        description: "Output saturation range: full, limited, extended"
      - name: out-auto-quant-range
        type: boolean
        description: "Auto-detect output quantization range"
      - name: out-quant-range
        type: string
        description: "Output quantization range: full, limited"
      - name: bit-rate-ratio
        type: integer
        description: "Bitrate ratio 50-200, default 100"
      - name: low-res-full-fr
        type: boolean
        description: "Enable full frame rate for low bandwidth"
    description: "Modify video processing settings"

  - id: reset_video_config
    label: Reset Video Config
    kind: action
    method: GET
    params: []
    description: "Reset all video settings to defaults"

  - id: set_edid_config
    label: Set EDID Config
    kind: action
    method: GET
    params:
      - name: smart-edid
        type: boolean
        description: "Enable SmartEDID"
      - name: keep-last
        type: boolean
        description: "Use latest loopthrough EDID"
      - name: add-audio
        type: boolean
        description: "Force source to output audio"
      - name: limit-pixel-clock
        type: boolean
        description: "Limit pixel resolution for loop-through compatibility"
    description: "Configure input port EDID settings"

  - id: set_default_edid
    label: Set Default EDID
    kind: action
    method: GET
    params: []
    description: "Reset EDID to default values"

  - id: upload_edid
    label: Upload EDID
    kind: action
    method: POST
    params:
      - name: file
        type: binary
        description: "EDID .bin file"
    description: "Upload EDID .bin file to input port"

  - id: export_edid
    label: Export EDID
    kind: action
    method: GET
    params:
      - name: port
        type: string
        description: "Port type: in, out"
      - name: file-name
        type: string
        description: "Output .bin filename"
    description: "Export EDID configuration as .bin file"

  - id: set_ndi_config
    label: Set NDI Config
    kind: action
    method: GET
    params:
      - name: enable
        type: boolean
        description: "Enable/disable NDI"
      - name: source-name
        type: string
        description: "NDI source name (supports %board-id%, %serial-no%)"
      - name: group-name
        type: string
        description: "NDI group name, comma-separated"
      - name: enable-web-control
        type: boolean
        description: "Allow Web UI access from NDI Studio Monitor"
      - name: enable-ptz-control
        type: boolean
        description: "Allow PTZ control via NDI Studio Monitor"
      - name: enable-fail-over
        type: boolean
        description: "Enable failover"
      - name: fail-over-ndi-name
        type: string
        description: "Backup NDI channel name"
      - name: fail-over-ip-addr
        type: string
        description: "Backup NDI channel IP address"
      - name: enable-mcast
        type: boolean
        description: "Enable UDP multicast"
      - name: mcast-addr
        type: string
        description: "Multicast address"
      - name: mcast-mask
        type: string
        description: "Multicast subnet mask"
      - name: mcast-ttl
        type: integer
        description: "Multicast TTL (1-255)"
      - name: enable-udp
        type: boolean
        description: "Enable UDP unicast"
      - name: enable-tcp
        type: boolean
        description: "Enable TCP multi-connection"
      - name: enable-rudp
        type: boolean
        description: "Enable RUDP unicast"
      - name: enable-discovery
        type: boolean
        description: "Enable discovery server"
      - name: discovery-server
        type: string
        description: "Discovery server IP(s), comma-separated"
      - name: reference-level
        type: integer
        description: "Audio reference level: SMPTE 20, EBU 14"
      - name: vendor-name
        type: string
        description: "NDI vendor name (1-63 chars)"
      - name: vendor-id
        type: string
        description: "NDI vendor ID (1-31 chars)"
    description: "Configure NDI streaming settings. Only one of mcast/rudp/tcp/udp can be true; all false means TCP uniconnection."

  - id: set_tally
    label: Set Tally
    kind: action
    method: GET
    params:
      - name: ext-tally
        type: boolean
        description: "Enable user customized tally lights"
    description: "Enable/disable custom tally"

  - id: set_ptz_config
    label: Set PTZ Config
    kind: action
    method: GET
    params:
      - name: proto
        type: string
        description: "PTZ protocol: none, visca, visca-udp, visca-udp2rs232, pelco-d, pelco-p"
      - name: index
        type: integer
        description: "Camera ID (1-7)"
      - name: baudrate
        type: integer
        description: "Baud rate: 2400, 4800, 9600, 19200, 38400"
      - name: invert-pan
        type: boolean
        description: "Reverse pan direction"
      - name: invert-tilt
        type: boolean
        description: "Reverse tilt direction"
      - name: ip-addr
        type: string
        description: "PTZ camera IP address (for visca-udp)"
      - name: port
        type: integer
        description: "Port (1-65535)"
      - name: visca-msg-hdr
        type: boolean
        description: "Use VISCA UDP message header"
      - name: focus-near-limit
        type: integer
        description: "Focus near limit (0-65535)"
      - name: focus-far-limit
        type: integer
        description: "Focus far limit (0-65535)"
      - name: pan-left-limit
        type: integer
        description: "Pan left limit (-32768 to 32767)"
      - name: pan-center
        type: integer
        description: "Pan center (-32768 to 32767)"
      - name: pan-right-limit
        type: integer
        description: "Pan right limit (-32768 to 32767)"
      - name: tilt-top-limit
        type: integer
        description: "Tilt top limit (-32768 to 32767)"
      - name: tilt-center
        type: integer
        description: "Tilt center (-32768 to 32767)"
      - name: tilt-bottom-limit
        type: integer
        description: "Tilt bottom limit (-32768 to 32767)"
      - name: zoom-out-limit
        type: integer
        description: "Zoom out limit (0-32767)"
    description: "Configure PTZ camera connection"

  - id: arrange_ptz_cameras
    label: Apply PTZ Settings
    kind: action
    method: GET
    params: []
    description: "Apply pending PTZ configuration changes"

  - id: set_eth_config
    label: Set Ethernet Config
    kind: action
    method: GET
    params:
      - name: name
        type: string
        description: "Device name"
      - name: dhcp
        type: boolean
        description: "Use DHCP"
      - name: addr
        type: string
        description: "Static IP address"
      - name: mask
        type: string
        description: "Subnet mask"
      - name: gw-addr
        type: string
        description: "Gateway address"
      - name: dns-addr
        type: string
        description: "DNS server address"
    description: "Configure Ethernet settings; may require reconnect"

  - id: set_rndis_config
    label: Set RNDIS Config
    kind: action
    method: GET
    params:
      - name: addr
        type: string
        description: "USB RNDIS IP address (192.168.xxx.1)"
      - name: name
        type: string
        description: "Device name"
    description: "Configure USB RNDIS settings"

  - id: set_net_access
    label: Set Network Access
    kind: action
    method: GET
    params:
      - name: use-ssdp
        type: boolean
        description: "Enable/disable SSDP service"
    description: "Configure network discovery services"

  - id: set_ntp_server
    label: Set NTP Server
    kind: action
    method: GET
    params:
      - name: ntp-server
        type: string
        description: "NTP server address"
    description: "Configure NTP time server"

  - id: upload_update_file
    label: Upload Firmware
    kind: action
    method: POST
    params:
      - name: file
        type: binary
        description: "Firmware .mwf file"
    description: "Upload firmware file for update"

  - id: update
    label: Start Firmware Update
    kind: action
    method: GET
    params:
      - name: mode
        type: string
        description: "Update mode (e.g. manual)"
    description: "Begin firmware update process"

  - id: add_user
    label: Add User
    kind: action
    method: GET
    params:
      - name: id
        type: string
        description: "Username"
      - name: pass
        type: string
        description: "MD5 encrypted password"
    description: "Add a new user (admin only)"

  - id: del_user
    label: Delete User
    kind: action
    method: GET
    params:
      - name: id
        type: string
        description: "Username to delete"
    description: "Delete a user (admin only)"

  - id: ch_password
    label: Change Password
    kind: action
    method: GET
    params:
      - name: pass
        type: string
        description: "MD5 encrypted old password"
      - name: new-pass
        type: string
        description: "MD5 encrypted new password"
    description: "Change own password"

  - id: set_password
    label: Set User Password
    kind: action
    method: GET
    params:
      - name: id
        type: string
        description: "Username"
      - name: pass
        type: string
        description: "MD5 encrypted new password"
    description: "Reset user password (admin only)"

  - id: export_report
    label: Export Report
    kind: action
    method: GET
    params:
      - name: file-name
        type: string
        description: "Output HTML filename"
    description: "Export device status report as HTML file"

  - id: export_logs
    label: Export Logs
    kind: action
    method: GET
    params:
      - name: file-name
        type: string
        description: "Output HTML filename"
    description: "Export device logs as HTML file"

  - id: clear_logs
    label: Clear Logs
    kind: action
    method: GET
    params: []
    description: "Clear all stored logs (admin only)"

  - id: cloud_reg_ex
    label: Cloud Register
    kind: action
    method: GET
    params:
      - name: id
        type: integer
        description: "Cloud ID (0 or 1)"
      - name: cloud-code
        type: string
        description: "4-digit invitation code"
      - name: cloud-ip-addr
        type: string
        description: "Cloud server IP/domain"
      - name: cloud-http-port
        type: integer
        description: "Cloud HTTP port"
      - name: cloud-enable-https
        type: integer
        description: "0=disable HTTPS, 1=enable HTTPS"
      - name: cloud-https-port
        type: integer
        description: "Cloud HTTPS port"
    description: "Register device with Magewell Cloud platform"

  - id: cloud_unreg_ex
    label: Cloud Unregister
    kind: action
    method: GET
    params:
      - name: id
        type: integer
        description: "Cloud ID (0 or 1)"
    description: "Unregister device from Magewell Cloud"

  - id: get_def_video_config
    label: Get Default Video Config
    kind: query
    method: GET
    params: []
    description: "Get default video configuration values"
  - id: get_caps
    label: Get Capabilities
    kind: query
    method: GET
    params: []
  - id: get_summary_info
    label: Get Summary Info
    kind: query
    method: GET
    params: []
  - id: get_signal_info
    label: Get Signal Info
    kind: query
    method: GET
    params: []
  - id: get_video_config
    label: Get Video Config
    kind: query
    method: GET
    params: []
  - id: get_edid_config
    label: Get EDID Config
    kind: query
    method: GET
    params: []
  - id: get_output_edid
    label: Get Output EDID
    kind: query
    method: GET
    params: []
  - id: get_ndi_config
    label: Get NDI Config
    kind: query
    method: GET
    params: []
  - id: get_ndi_sources
    label: Get NDI Sources
    kind: query
    method: GET
    params: []
  - id: get_tally
    label: Get Tally
    kind: query
    method: GET
    params: []
  - id: get_ptz_config
    label: Get PTZ Config
    kind: query
    method: GET
    params: []
  - id: get_users
    label: Get Users
    kind: query
    method: GET
    params: []
  - id: get_eth_status
    label: Get Ethernet Status
    kind: query
    method: GET
    params: []
  - id: get_rndis_status
    label: Get RNDIS Status
    kind: query
    method: GET
    params: []
  - id: get_net_access
    label: Get Network Access
    kind: query
    method: GET
    params: []
  - id: get_ntp_server
    label: Get NTP Server
    kind: query
    method: GET
    params: []
  - id: get_update_state
    label: Get Update State
    kind: query
    method: GET
    params: []
  - id: get_auto_reboot
    label: Get Auto Reboot
    kind: query
    method: GET
    params: []
  - id: get_reset_all_permission
    label: Get Reset All Permission
    kind: query
    method: GET
    params: []
  - id: get_report
    label: Get Report
    kind: query
    method: GET
    params: []
  - id: cloud_status
    label: Cloud Status
    kind: query
    method: GET
    params:
      - name: version
        type: integer
  - id: get_logs
    label: Get Logs
    kind: query
    method: GET
    params:
      - name: types
        type: string
```

## Feedbacks
```yaml
feedbacks:
  - id: caps
    type: object
    description: "Device capabilities: max resolutions, hardware features (input, output, loop-through, fan, SD card, PTZ, EDID support)"

  - id: summary_info
    type: object
    description: "Full device status: device info, ethernet, USB RNDIS, NDI status"

  - id: device_info
    type: object
    fields:
      - name: name
        type: string
        description: "Device name"
      - name: model
        type: string
        description: "Model name"
      - name: serial-no
        type: string
        description: "Serial number"
      - name: hw-revision
        type: string
        description: "Hardware revision (A-Z)"
      - name: fw-version
        type: string
        description: "Firmware version"
      - name: up-to-date
        type: boolean
        description: "Firmware is current"
      - name: input-state
        type: string
        description: "Input signal state: no-signal, locking, unsupported, or resolution string"
      - name: output-state
        type: string
        description: "Loop-through state: unconnected, unsupported, active"
      - name: ptz-proto
        type: string
        description: "PTZ protocol: none, visca"
      - name: ptz-state
        type: string
        description: "PTZ state: unknown, connected, disconnected"
      - name: cpu-usage
        type: number
        description: "CPU usage percentage"
      - name: memory-usage
        type: number
        description: "Memory usage percentage"
      - name: core-temp
        type: number
        description: "Processor temperature in Celsius"
      - name: board-id
        type: integer
        description: "Rotary switch number (0-F)"
      - name: up-time
        type: integer
        description: "Seconds since last boot"
      - name: sd-size
        type: integer
        description: "SD card size in MB"
      - name: fan-rpm
        type: integer
        description: "Fan speed in RPM"

  - id: ethernet_status
    type: object
    fields:
      - name: state
        type: string
        description: "Connection state: down, disconnected, 10m, 100m, 1000m, 2500m, 5000m, 10000m"
      - name: mac-addr
        type: string
        description: "MAC address"
      - name: ip-addr
        type: string
        description: "IP address"
      - name: ip-mask
        type: string
        description: "Subnet mask"
      - name: gw-addr
        type: string
        description: "Gateway address"
      - name: dns-addr
        type: string
        description: "DNS server address"
      - name: tx-speed-kbps
        type: integer
        description: "Transmit speed Kbps"
      - name: rx-speed-kbps
        type: integer
        description: "Receive speed Kbps"

  - id: ndi_status
    type: object
    fields:
      - name: name
        type: string
        description: "NDI source name"
      - name: enabled
        type: boolean
        description: "NDI enabled"
      - name: num-clients
        type: integer
        description: "Connected NDI clients"
      - name: tally-preview
        type: boolean
        description: "Selected in Preview bus"
      - name: tally-program
        type: boolean
        description: "Selected in Program bus"
      - name: video-width
        type: integer
        description: "Video width pixels"
      - name: video-height
        type: integer
        description: "Video height pixels"
      - name: video-scan
        type: string
        description: "Scan format: progressive, interlaced, psf"
      - name: video-field-rate
        type: number
        description: "Frame rate"
      - name: audio-num-channels
        type: integer
        description: "Audio channel count"
      - name: audio-sample-rate
        type: integer
        description: "Audio sample rate"
      - name: audio-drop-frames
        type: integer
        description: "Dropped audio frames (previous second)"
      - name: video-drop-frames
        type: integer
        description: "Dropped video frames (previous second)"
      - name: video-bit-rate
        type: integer
        description: "Video bitrate Kbps"
      - name: audio-bit-rate
        type: integer
        description: "Audio bitrate Kbps"

  - id: signal_info
    type: object
    description: "Input signal details: video info, audio info, HDMI info, SDI info, InfoFrames"

  - id: video_config
    type: object
    description: "Current video processing settings (brightness, contrast, color space, resolution, etc.)"

  - id: edid_config
    type: object
    fields:
      - name: smart-edid
        type: boolean
      - name: keep-last
        type: boolean
      - name: add-audio
        type: boolean
      - name: limit-pixel-clock
        type: boolean
      - name: data
        type: string
        description: "EDID data in base64"

  - id: ndi_config
    type: object
    description: "Current NDI configuration (source name, group, failover, multicast, discovery server, etc.)"

  - id: ndi_sources
    type: array
    description: "Available backup NDI channels for failover"

  - id: tally
    type: boolean
    description: "Whether custom tally lights are enabled"

  - id: ptz_config
    type: object
    description: "PTZ configuration (protocol, camera ID, baud rate, limits, etc.)"

  - id: users
    type: array
    description: "User list with id and group (Admin/User)"

  - id: eth_status
    type: object
    description: "Ethernet configuration and status including DHCP, IP, gateway, DNS"

  - id: rndis_status
    type: object
    description: "USB RNDIS status: state, IP, speeds, device name"

  - id: net_access
    type: object
    fields:
      - name: use-ssdp
        type: boolean
        description: "SSDP service enabled"

  - id: ntp_server
    type: object
    fields:
      - name: ntp-server
        type: string
        description: "NTP server address"

  - id: update_state
    type: object
    fields:
      - name: state
        type: string
        description: "Update state: idle, updating, completed, failed"
      - name: cur-ver
        type: string
        description: "Current firmware version"
      - name: update-to-ver
        type: string
        description: "Target firmware version (when updating)"
      - name: step-percent
        type: integer
        description: "Update progress percentage (when updating)"
      - name: error-status
        type: integer
        description: "Error code (when failed)"

  - id: auto_reboot
    type: object
    fields:
      - name: enable
        type: boolean
      - name: hour
        type: integer
        description: "Hour 0-23 UTC"
      - name: min
        type: integer
        description: "Minute 0-59"
      - name: week-flags
        type: integer
        description: "Day bitmask sum"

  - id: reset_all_permission
    type: boolean
    description: "Whether factory reset function is available"

  - id: logs
    type: array
    description: "Device logs with type (info/warn/error), timestamp, and message"

  - id: cloud_status
    type: object
    description: "Cloud platform registration status for up to 2 platforms"

  - id: report
    type: string
    description: "HTML device status report"
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    range: [-100, 100]
    unit: ""
    description: "Input signal brightness"

  - id: contrast
    type: integer
    range: [50, 200]
    unit: ""
    description: "Input signal contrast"

  - id: hue
    type: integer
    range: [-90, 90]
    unit: ""
    description: "Input signal hue"

  - id: saturation
    type: integer
    range: [0, 200]
    unit: ""
    description: "Input signal saturation"

  - id: bit_rate_ratio
    type: integer
    range: [50, 200]
    unit: "percent"
    description: "Bitrate ratio, default 100"

  - id: output_resolution
    type: string
    description: "Output resolution (out-cx x out-cy)"

  - id: ndi_source_name
    type: string
    description: "NDI source name (supports %board-id%, %serial-no% variables)"

  - id: audio_reference_level
    type: integer
    values: [14, 20]
    description: "Audio reference level: EBU 14, SMPTE 20"
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event/notification mechanisms
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for:
  - reboot
  - reset_all_settings
  - update
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings or interlock procedures
# Note: reboot and firmware update cause device downtime; reset-all-settings is destructive
```

## Notes
- All API methods use the `method` query parameter on `/mwapi` endpoint, e.g. `GET http://IP/mwapi?method=ping`.
- GET is used for both queries and configuration commits; POST is used only for file uploads (`upload-edid`, `upload-update-file`).
- Passwords are MD5-hashed before transmission.
- Session management uses cookies (`sid=xxxxxxxxx`); admin rights required for most write operations.
- PTZ supports protocols: VISCA (serial), VISCA over UDP, VISCA UDP-to-RS232, PELCO-D, PELCO-P.
- NDI transition mode: only one of mcast/rudp/tcp/udp can be true; all false means TCP uniconnection.
- Cloud APIs use a separate port (8070) and path (`/cloud-api`).
- Device can host to 2 cloud platforms simultaneously.

<!-- UNRESOLVED: HTTP port not explicitly stated; examples use default port 80 -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: no description of unsolicited event/push notification mechanism -->
<!-- UNRESOLVED: no explicit safety interlock procedures documented -->
<!-- UNRESOLVED: maximum concurrent session count not stated -->
<!-- UNRESOLVED: API rate limits not stated -->

## Provenance

```yaml
source_domains:
  - magewell.com
source_urls:
  - https://www.magewell.com/api-docs/pro-convert-encoder-api/pro-convert-encoder-api-en_US.pdf
retrieved_at: 2026-04-30T04:36:41.443Z
last_checked_at: 2026-04-30T14:47:51.509Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T14:47:51.509Z
matched_actions: 54
action_count: 54
confidence: high
summary: "All 54 spec actions matched to source methods using semantic-id convention; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
