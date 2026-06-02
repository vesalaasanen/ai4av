---
spec_id: admin/magewell-pro-convert-ip-to-usb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Magewell Pro Convert IP to USB Control Spec"
manufacturer: Magewell
model_family: "Pro Convert IP to USB"
aliases: []
compatible_with:
  manufacturers:
    - Magewell
  models:
    - "Pro Convert IP to USB"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - magewell.com
source_urls:
  - https://www.magewell.com/api-docs/pro-convert-ip-to-usb-api/pro-convert-ip-to-usb-api-en_US.pdf
  - https://www.magewell.com/api-docs/pro-convert-ip-to-usb-api/
  - https://www.magewell.com/developer/27/detail
  - https://www.magewell.com/developer
retrieved_at: 2026-05-27T05:56:47.616Z
last_checked_at: 2026-05-27T06:51:37.828Z
generated_at: 2026-05-27T06:51:37.828Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial/RS-232 not mentioned in source"
  - "default HTTP port not stated in source"
  - "source does not document unsolicited push notifications"
  - "source does not describe multi-step command sequences"
  - "safety warnings not found in source"
  - "default HTTP port not stated — port must be discovered or configured"
  - "RS-232/serial not documented in source"
  - "unsolicited event push notifications not documented"
  - "firmware version compatibility ranges not stated"
verification:
  verdict: verified
  checked_at: 2026-05-27T06:51:37.828Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions matched API endpoints in source; transport and SHA256 auth verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Magewell Pro Convert IP to USB Control Spec

## Summary
REST API-based IP control for Magewell Pro Convert IP to USB capture device. Provides device management, source routing, stream monitoring, network configuration, user authentication, firmware upgrade, and logging operations via HTTP JSON API.

<!-- UNRESOLVED: serial/RS-232 not mentioned in source -->
<!-- UNRESOLVED: default HTTP port not stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{ip}/api"
auth:
  type: sha256
  note: "Passwords transmitted as SHA-256 hash; session managed via Cookie sid-{serial}"
```

## Traits
```yaml
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: ping
  label: Ping Test
  kind: query
  params: []

- id: reboot_device
  label: Reboot Device
  kind: action
  params:
    - name: delay
      type: integer
      description: Delay time before rebooting, in seconds
    - name: estimate-sec
      type: integer
      description: Estimated time for a restart, in seconds

- id: check_factory_reset_permission
  label: Check Factory Reset Permission
  kind: query
  params: []

- id: factory_reset
  label: Reset Device to Factory Defaults
  kind: action
  params:
    - name: estimated-duration
      type: integer
      description: Estimated duration

- id: schedule_auto_reboot
  label: Schedule Automatic Reboots
  kind: action
  params:
    - name: enable
      type: boolean
      description: Enable auto-reboot
    - name: hour
      type: integer
      description: Hour for auto-reboot (0-23)
    - name: min
      type: integer
      description: Minute for auto-reboot (0-59)
    - name: week
      type: array
      description: Weekly repeat days, 1=Monday through 7=Sunday

- id: get_device_info
  label: Get Device Info
  kind: query
  params: []

- id: get_basic_info
  label: Get Basic System Info
  kind: query
  params: []

- id: set_device_name
  label: Set Device Name
  kind: action
  params:
    - name: name
      type: string
      description: New device name

- id: set_date_time
  label: Set Date and Time
  kind: action
  params:
    - name: ntp-enable
      type: boolean
      description: Enable NTP
    - name: ntp-server1
      type: string
      description: NTP server 1 address
    - name: ntp-server2
      type: string
      description: NTP server 2 address
    - name: time
      type: string
      description: System time in yyyy-MM-dd HH:mm:ss format (required when ntp-enable=false)

- id: set_timezone
  label: Set Time Zone
  kind: action
  params:
    - name: zonename
      type: string
      description: Time zone name

- id: get_summary
  label: Obtain Summary Information
  kind: query
  params: []

- id: get_usb_mode
  label: Obtain USB Mode
  kind: query
  params: []

- id: set_usb_mode
  label: Set USB Mode
  kind: action
  params:
    - name: mode
      type: string
      enum:
        - "Normal mode"
        - "Content mode"
      description: USB operation mode

- id: export_config
  label: Export Device Configurations
  kind: action
  params:
    - name: filename
      type: string
      description: Output filename

- id: get_video_config
  label: Get Video Settings
  kind: query
  params: []

- id: update_video_config
  label: Update Video Settings
  kind: action
  params:
    - name: h_flip
      type: boolean
      description: Enable horizontal mirror
    - name: v_flip
      type: boolean
      description: Enable vertical flip
    - name: ar_convert_mode
      type: string
      enum:
        - "Windowbox"
        - "Crop"
        - "Stretch"
      description: Aspect ratio conversion mode

- id: get_ndi_config
  label: Get NDI Discovery Settings
  kind: query
  params: []

- id: update_ndi_config
  label: Set NDI Discovery
  kind: action
  params:
    - name: enable
      type: boolean
      description: Enable NDI discovery
    - name: discovery_server
      type: string
      description: Discovery server addresses (comma-separated)
    - name: groups
      type: string
      description: NDI group information

- id: upload_no_signal_image
  label: Upload No-Signal Image
  kind: action
  params:
    - name: id
      type: string
      description: Image ID
    - name: type
      type: string
      description: Reserved
    - name: file
      type: binary
      description: PNG file via multipart/form-data

- id: delete_no_signal_image
  label: Delete No-Signal Image
  kind: action
  params:
    - name: id
      type: string
      description: Image ID
    - name: type
      type: string
      description: Reserved

- id: get_no_signal_images
  label: Get No-Signal Image Info
  kind: query
  params:
    - name: id
      type: string
      description: Image ID
    - name: type
      type: string
      description: Reserved

- id: get_source_list
  label: Get Source List
  kind: query
  params:
    - name: type
      type: string
      enum:
        - "static"
        - "dynamic"
      description: Source type filter
    - name: page
      type: integer
      description: Page number
    - name: page_size
      type: integer
      description: Items per page

- id: add_source
  label: Add Source
  kind: action
  params:
    - name: name
      type: string
      description: Source name
    - name: protocol
      type: string
      enum:
        - "ndi"
        - "rtmp"
        - "ts-srt"
        - "ts-udp"
        - "ts-rtp"
        - "rtsp"
        - "http"
      description: Protocol type
    - name: type
      type: string
      enum:
        - "url"
        - "d_ndi"
        - "ndi"
      description: Source type
    - name: data
      type: object
      description: Source-specific configuration data

- id: update_source
  label: Modify Source
  kind: action
  params:
    - name: id
      type: integer
      description: Source unique ID
    - name: config
      type: object
      description: Updated source configuration

- id: delete_source
  label: Delete Source
  kind: action
  params:
    - name: id
      type: integer or array
      description: Source ID(s) to delete

- id: select_source
  label: Select Source
  kind: action
  params:
    - name: id
      type: integer
      description: Source ID (>0 selects, <=0 deselects all)

- id: get_stream_status
  label: Get Stream Status
  kind: query
  params: []

- id: get_network_info
  label: Get Network Card Info
  kind: query
  params: []

- id: configure_ethernet
  label: Configure Ethernet
  kind: action
  params:
    - name: iface
      type: string
      description: Network interface name (eth0)
    - name: use-dhcp
      type: boolean
      description: Use DHCP for IP address
    - name: ipaddr
      type: string
      description: Static IP address (required when use-dhcp=false)
    - name: netmask
      type: string
      description: Subnet mask
    - name: gateway
      type: string
      description: Gateway address
    - name: dns1
      type: string
      description: Primary DNS
    - name: dns2
      type: string
      description: Secondary DNS

- id: configure_usb_net
  label: Configure USB NET
  kind: action
  params:
    - name: iface
      type: string
      description: Network interface name (usb0)
    - name: ipaddr
      type: string
      description: IP address for USB NET

- id: login
  label: Login
  kind: action
  params:
    - name: username
      type: string
      description: User name
    - name: password
      type: string
      description: SHA-256 hashed password

- id: logout
  label: Logout
  kind: action
  params: []

- id: get_user_list
  label: Get System User List
  kind: query
  params: []

- id: add_user
  label: Add User
  kind: action
  params:
    - name: username
      type: string
      description: New user name
    - name: password
      type: string
      description: SHA-256 hashed password

- id: delete_user
  label: Delete User
  kind: action
  params:
    - name: username
      type: string
      description: User to delete

- id: change_password
  label: Change Login Password
  kind: action
  params:
    - name: password
      type: string
      description: Current password (SHA-256)
    - name: new-password
      type: string
      description: New password (SHA-256)

- id: reset_password
  label: Reset User Password
  kind: action
  params:
    - name: username
      type: string
      description: Target user name
    - name: password
      type: string
      description: New password (SHA-256)

- id: upload_firmware
  label: Upload Firmware
  kind: action
  params:
    - name: file
      type: binary
      description: Firmware file (.mwf) via multipart/form-data
    - name: need-clean-data
      type: boolean
      description: Clear user data during upgrade
    - name: up-to-date
      type: boolean
      description: Check if firmware is latest
    - name: version
      type: string
      description: Firmware version string
    - name: size
      type: integer
      description: Firmware size in bytes

- id: upgrade_firmware
  label: Upgrade Firmware
  kind: action
  params:
    - name: is-online
      type: boolean
      description: Online vs manual upgrade
    - name: mode
      type: integer
      description: Upgrade mode (0=Auto)
    - name: timeout
      type: integer
      description: Timeout in seconds

- id: get_upgrade_state
  label: Get Firmware Upgrade Status
  kind: query
  params: []

- id: clear_upgrade_state
  label: Clear Upgrade Status
  kind: action
  params: []

- id: clear_logs
  label: Clear System Logs
  kind: action
  params: []

- id: filter_logs
  label: Filter Logs
  kind: query
  params:
    - name: types
      type: string
      description: Log types (all, info, warn, error)
    - name: key
      type: string
      description: Filter keyword

- id: export_logs
  label: Export Logs
  kind: action
  params:
    - name: filename
      type: string
      description: Output filename
```

## Feedbacks
```yaml
- id: error_code
  type: integer
  values:
    - 0: MW_STATUS_SUCCESS
    - 1: MW_STATUS_PENDING
    - 2: MW_STATUS_TIMEOUT
    - 3: MW_STATUS_INTERRUPTED
    - 4: MW_STATUS_TRY_AGAIN
    - 5: MW_STATUS_NOT_IMPLEMENTED
    - 6: MW_STATUS_UNKNOWN_ERROR
    - 7: MW_STATUS_INVALID_ARG
    - 8: MW_STATUS_NO_MEMORY
    - 9: MW_STATUS_UNSUPPORTED
    - 10: MW_STATUS_FILE_BUSY
    - 11: MW_STATUS_DEVICE_BUSY
    - 12: MW_STATUS_DEVICE_LOST
    - 13: MW_STATUS_IO_FAILED
    - 14: MW_STATUS_READ_FAILED
    - 15: MW_STATUS_WRITE_FAILED
    - 16: MW_STATUS_NOT_EXIST
    - 17: MW_STATUS_TOO_MANY
    - 18: MW_STATUS_TOO_LARGE
    - 19: MW_STATUS_OVERFLOW
    - 20: MW_STATUS_UNDERFLOW
    - 21: MW_STATUS_FORMAT_ERROR
    - 22: MW_STATUS_FILE_EXISTS
    - 23: MW_STATUS_FILE_TYPE_ERROR
    - 24: MW_STATUS_DEVICE_TYPE_ERROR
    - 25: MW_STATUS_IS_DIRECTORY
    - 26: MW_STATUS_READ_ONLY
    - 27: MW_STATUS_RANGE_ERROR
    - 28: MW_STATUS_BROKEN_PIPE
    - 29: MW_STATUS_NO_SPACE
    - 30: MW_STATUS_NOT_DIRECTORY
    - 31: MW_STATUS_NOT_PERMITTED
    - 32: MW_STATUS_BAD_ADDRESS
    - 33: MW_STATUS_SEEK_ERROR
    - 34: MW_STATUS_CROSS_DEVICE_LINK
    - 35: MW_STATUS_NOT_INITIALIZED
    - 36: MW_STATUS_AUTH_FAILED
    - 37: MW_STATUS_NOT_LOGGED_IN
    - 38: MW_STATUS_WRONG_STATE
    - 39: MW_STATUS_MISMATCH
    - 40: MW_STATUS_VERIFY_FAILED
    - 41: MW_STATUS_CONSTRAINT_VIOLATION
    - 42: MW_STATUS_CANCELED
    - 43: MW_STATUS_IN_PROGRESS
    - 44: MW_STATUS_CONN_REFUSED
    - 45: MW_STATUS_CONN_RESET
    - 46: MW_STATUS_ADDR_IN_USE
    - 47: MW_STATUS_NO_RESPONSE
    - 48: MW_STATUS_INFO_CHANGED
    - 49: MW_STATUS_INVALID_DATA
    - 50: MW_STATUS_NEED_MORE_DATA
    - 51: MW_STATUS_NO_BUFFER
    - 52: MW_STATUS_BUFFER_TOO_SMALL
    - 53: MW_STATUS_BUFFER_IS_EMPTY
    - 54: MW_STATUS_BUFFER_IS_FULL

- id: device_info
  type: struct
  fields:
    - device-name: string
    - product-id: string
    - product-name: string
    - hardware-rev: string
    - serial-number: string
    - firmware-ver: string
    - firmware-name: string
    - build-time: string
    - capability: object

- id: system_info
  type: struct
  fields:
    - device-name: string
    - mdns-url: string
    - uptime: integer
    - cpu: object
    - mem: object
    - datetime: object
    - auto-reboot: object

- id: stream_status
  type: struct
  fields:
    - name: string
    - protocol: string
    - state: integer
    - uptime: integer
    - video: object
    - audio: object
    - extra: object

- id: usb_mode
  type: enum
  values:
    - "Normal mode"
    - "Content mode"

- id: session_id
  type: string
  note: "Returned in Set-Cookie header as sid-{serial number} after login"

- id: user_list
  type: array
  fields:
    - username: string
    - group: string
```

## Variables
```yaml
- id: device_name
  type: string
  settable: true
  description: Configurable device name

- id: ntp_enable
  type: boolean
  settable: true
  description: Enable NTP time synchronization

- id: ntp_server1
  type: string
  settable: true
  description: Primary NTP server

- id: ntp_server2
  type: string
  settable: true
  description: Secondary NTP server

- id: timezone
  type: string
  settable: true
  description: Time zone name

- id: auto_reboot
  type: object
  settable: true
  description: Scheduled automatic reboot settings

- id: video_h_flip
  type: boolean
  settable: true
  description: Horizontal mirror

- id: video_v_flip
  type: boolean
  settable: true
  description: Vertical flip

- id: video_ar_convert_mode
  type: string
  settable: true
  description: Aspect ratio conversion mode

- id: ndi_enable
  type: boolean
  settable: true
  description: NDI discovery enable

- id: ndi_discovery_server
  type: string
  settable: true
  description: NDI discovery server addresses

- id: ndi_groups
  type: string
  settable: true
  description: NDI group information

- id: ethernet_config
  type: object
  settable: true
  description: Ethernet interface configuration (DHCP or static IP)

- id: usb_net_config
  type: object
  settable: true
  description: USB NET interface configuration

- id: selected_source_id
  type: integer
  settable: true
  description: Currently selected source ID
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited push notifications
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step command sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings not found in source
```

## Notes
The API uses JSON request/response with HTTP GET/POST methods. Authentication is session-based via Cookie after login. Passwords are transmitted as SHA-256 hashes. Source management supports multiple protocols (NDI, RTMP, SRT, UDP, RTP, RTSP, HTTP) and types (static URL, auto-discovered NDI, manual NDI). Stream status includes video codec, bitrate, resolution, frame rate, audio codec, sample rate, and tally indicators. Network interfaces include Ethernet, Wi-Fi, USB sharing, USB NET, and cellular (on supported models).
<!-- UNRESOLVED: default HTTP port not stated — port must be discovered or configured -->
<!-- UNRESOLVED: RS-232/serial not documented in source -->
<!-- UNRESOLVED: unsolicited event push notifications not documented -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->

## Provenance

```yaml
source_domains:
  - magewell.com
source_urls:
  - https://www.magewell.com/api-docs/pro-convert-ip-to-usb-api/pro-convert-ip-to-usb-api-en_US.pdf
  - https://www.magewell.com/api-docs/pro-convert-ip-to-usb-api/
  - https://www.magewell.com/developer/27/detail
  - https://www.magewell.com/developer
retrieved_at: 2026-05-27T05:56:47.616Z
last_checked_at: 2026-05-27T06:51:37.828Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T06:51:37.828Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions matched API endpoints in source; transport and SHA256 auth verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial/RS-232 not mentioned in source"
- "default HTTP port not stated in source"
- "source does not document unsolicited push notifications"
- "source does not describe multi-step command sequences"
- "safety warnings not found in source"
- "default HTTP port not stated — port must be discovered or configured"
- "RS-232/serial not documented in source"
- "unsolicited event push notifications not documented"
- "firmware version compatibility ranges not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
