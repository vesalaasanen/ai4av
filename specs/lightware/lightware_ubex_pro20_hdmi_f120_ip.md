---
spec_id: admin/lightware-ubex-pro20-hdmi-f120
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware UBEХ-PRO20-HDMI-F120 Control Spec"
manufacturer: Lightware
model_family: "UBEХ-PRO20-HDMI-F120"
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - "UBEХ-PRO20-HDMI-F120"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.prod.pim.lightware.com
  - avc-group.com
  - lightware.avicon.ru
  - academy.lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/UBEX_Matrix_UserManual.pdf
  - https://www.avc-group.com/assets/products/Lightware/pdf-manuals/lightware-um-ubex_extenders.pdf
  - https://lightware.avicon.ru/files/ubex_extender_usersmanual_v1.6.pdf
  - https://academy.lightware.com/courses/lw3-protocol-tutorial
retrieved_at: 2026-08-11T00:44:50.262Z
last_checked_at: 2026-08-19T09:33:45.611Z
generated_at: 2026-08-19T09:33:45.611Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "§9.21.1 BAUD Rate Setting (MMU): SET/MANAGEMENT/CONTROL/SERIAL/<port>.Baudrate"
  - "§9.21.2 Databits Setting (MMU): SET/MANAGEMENT/CONTROL/SERIAL/<port>.DataBits"
  - "§9.21.3 Stopbits Setting (MMU): SET/MANAGEMENT/CONTROL/SERIAL/<port>.StopBits"
  - "§9.21.4 Parity Setting (MMU): SET/MANAGEMENT/CONTROL/SERIAL/<port>.Parity"
  - "§9.21.5 Enabling the Port (MMU): SET/MANAGEMENT/CONTROL/SERIAL/<port>.Enabled"
  - "§9.26 USB KVM/USB 2.0 settings (F130-only, excluded by F120 scope)"
  - "§9.27 License Handling commands (5 properties)"
  - "§9.28 Centralized Firmware Update commands"
  - "§10 Icron UDP protocol commands (separate protocol, 16 commands)"
  - "firmware version compatibility not stated; many commands require specific firmware packages (e.g. multiviewer needs endpoint v3.5.1 + MMU v2.4.3)"
  - "the source documents the MMU-side LW3 tree; per-endpoint local-only command set when MMU is offline is not described"
  - "precise response payload formats for GETALL-style bulk queries (e.g. /MEDIA/XP/VIDEO/*.*)"
  - "full enumeration of supported scaler resolutions (Appendix §15.9) not included in the"
  - "no named macro primitives documented."
  - "no machine-readable interlock or confirmation primitives are defined by the protocol."
  - "firmware version compatibility ranges not exhaustively tabulated in the refined source chunk."
  - "full factory-EDID list, scaler resolution list, and bandwidth-requirements table referenced by the source were not present in the extracted/refined text."
  - "precise binary layout of GETALL bulk responses (e.g. /MEDIA/XP/VIDEO/*.*) is described only as a bullet list — field ordering/encoding for machine parsing is not fully specified."
  - "response timing, command rate limits, and connection keepalive behavior are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:33:45.611Z
  matched_actions: 265
  action_count: 265
  confidence: medium
  summary: "All 265 spec actions match LW3 source wire-literals verbatim; transport fields supported. Missing source commands (§9.21, §9.26-9.28, §10) are out of F120 scope. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Lightware UBEХ-PRO20-HDMI-F120 Control Spec

## Summary
The UBEХ-PRO20-HDMI-F120 is a 4K60 HDMI 2.0 fiber-optic extender endpoint in Lightware's UBEХ PRO20 family, operable as transmitter (TX), receiver (RX), transceiver (TRX), or multiviewer (RXMV). It is controlled through the Lightware Protocol #3 (LW3), an ASCII tree-structured protocol carried over a TCP/IP connection to the Matrix Management Unit (MMU) on port 6107. Connecting to any endpoint ultimately reaches the MMU, which supervises the whole matrix. The F120 additionally exposes an RS-232 port and IR I/O for third-party device control and USB-A K+M routing, but those serial/IR ports cannot control the UBEХ matrix itself.

<!-- UNRESOLVED: firmware version compatibility not stated; many commands require specific firmware packages (e.g. multiviewer needs endpoint v3.5.1 + MMU v2.4.3) -->
<!-- UNRESOLVED: the source documents the MMU-side LW3 tree; per-endpoint local-only command set when MMU is offline is not described -->

## Transport
```yaml
# F120 is controlled over Ethernet/TCP via the MMU. The on-board RS-232 port
# on the F110/F120 is for controlling third-party devices only - it CANNOT be
# used to control the UBEХ matrix (source: §6.2.2 ATTENTION).
protocols:
  - tcp
addressing:
  # Default MMU IP per source §9.2 step 3
  base_url: "192.168.0.100"  # default MMU IP; endpoints default to .101 (TX/TRX) / .102 (RX/RXMV)
  port: 6107  # LW3 TCP port per §9.2 step 3 and §9.3.2
  connection_type: Raw  # source §9.2 step 4: "Select the Raw connection type"
auth:
  type: none  # inferred: no login procedure in source; LDU2 output states "Login functionality is currently not enabled"
# Framing / protocol rules (§9.3.2, §9.3.3): ASCII, CrLf-terminated, max line 800 bytes,
# case-sensitive, node paths slash-separated, properties addressed with '.', methods with ':'.
# Command verbs: GET, GETALL, SET, CALL, MAN. Optional 4-hex-digit signature may prefix a
# command and group the response lines between {sig ... } brackets (§9.3.7).
# Subscription: OPEN <node> / CLOSE <node> ; async change notifications prefixed "CHG".
```

## Traits
```yaml
# All inferred from documented command examples in §9.
- routable     # inferred: video/audio XP switch commands present (§9.8, §9.13)
- queryable    # inferred: GET queries return state (signal presence, resolution, status, etc.)
- levelable    # inferred: analog audio volume/gain/balance set commands present (§9.15, F120 has analog audio)
- powerable    # inferred: device reset / bootload / factoryDefaults acts on power-cycle-equivalent state
```

## Actions
```yaml
# Each LW3 method/property documented in §9 with a literal payload is enumerated below.
# Payloads are verbatim from the source. `<UBEX_EP>` = UBEX<last_6_MAC_hex>, `<in>` = S<devID><port>,
# `<out>` = D<devID><port>, `<link>` = LINK1/LINK2, `<port>` = control port ID (e.g. P101),
# `<tile>` = T1..T4, `<video_wall_ID>` = VIDEOWALL<number>, `<layout_ID>` = LAYOUT<number>,
# `<zone_ID>` = ZONE<number>.

# ---- 9.5 System Commands - MMU ----
- id: mmu_set_device_label
  label: Set MMU Device Label
  kind: action
  command: "SET /MANAGEMENT/LABEL.DeviceLabel=<custom_name>"
  params:
    - name: custom_name
      type: string
      description: Up to 39 ASCII characters

- id: mmu_query_product_name
  label: Query MMU Product Name
  kind: query
  command: "GET /.ProductName"
  params: []

- id: mmu_query_firmware_version
  label: Query MMU Firmware Package Version
  kind: query
  command: "GET /MANAGEMENT/UID/PACKAGE.Version"
  params: []

- id: mmu_query_datetime
  label: Query MMU Date and Time
  kind: query
  command: "GET /MANAGEMENT/DATETIME.CurrentTime"
  params: []

- id: mmu_set_datetime
  label: Set MMU Date and Time
  kind: action
  command: "CALL /MANAGEMENT/DATETIME:setTime=<date_time>"
  params:
    - name: date_time
      type: string
      description: ISO 8601 format YYYY-MM-DDTHH:MM:SS

- id: mmu_set_ntp_server
  label: Set MMU NTP Server Address
  kind: action
  command: "SET /MANAGEMENT/DATETIME.NtpServerAddress=<server_address>"
  params:
    - name: server_address
      type: string

- id: mmu_enable_ntp
  label: Enable/Disable MMU NTP
  kind: action
  command: "SET /MANAGEMENT/DATETIME.EnableNtp=<logical_value>"
  params:
    - name: logical_value
      type: enum
      description: "true | false"

- id: mmu_set_lcd_brightness
  label: Set MMU LCD Brightness
  kind: action
  command: "SET /SYS/CECU/LCD.Brightness=<parameter>"
  params:
    - name: parameter
      type: integer
      description: 0..10

- id: mmu_soft_reset
  label: Soft Reset MMU
  kind: action
  command: "CALL /SYS:softReset()"
  params: []

- id: mmu_reboot
  label: Reboot MMU
  kind: action
  command: "CALL /SYS:reset()"
  params: []

- id: mmu_factory_defaults
  label: Restore MMU Factory Defaults
  kind: action
  command: "CALL /SYS:factoryDefaults()"
  params: []

# ---- 9.6 System Commands - Endpoints ----
- id: ep_set_device_label
  label: Set Endpoint Device Label
  kind: action
  command: "SET /SYS/ENDPOINTS/<UBEX_EP>.DeviceLabel=<custom_name>"
  params:
    - name: UBEХ_EP
      type: string
    - name: custom_name
      type: string
      description: Up to 64 ASCII characters

- id: ep_query_product_name
  label: Query Endpoint Product Name
  kind: query
  command: "GET /SYS/ENDPOINTS/<UBEX_EP>.ProductName"
  params:
    - name: UBEХ_EP
      type: string

- id: ep_query_operation_mode
  label: Query Endpoint Operation Mode
  kind: query
  command: "GET /SYS/ENDPOINTS/<UBEX_EP>.OperationMode"
  params:
    - name: UBEХ_EP
      type: string

- id: ep_set_operation_mode
  label: Set Endpoint Operation Mode
  kind: action
  command: "SET /SYS/ENDPOINTS/<UBEX_EP>.OperationMode=<operation_mode>"
  params:
    - name: UBEХ_EP
      type: string
    - name: operation_mode
      type: enum
      description: "Transmitter | Receiver | Transceiver | Multiviewer (requires reboot)"

- id: ep_query_mac_address
  label: Query Endpoint MAC Address
  kind: query
  command: "GET /SYS/ENDPOINTS/<UBEX_EP>.MacAddress"
  params:
    - name: UBEХ_EP
      type: string

- id: ep_query_firmware_version
  label: Query Endpoint Firmware Package Version
  kind: query
  command: "GET /SYS/ENDPOINTS/<UBEX_EP>.PackageVersion"
  params:
    - name: UBEХ_EP
      type: string

- id: ep_identify_me
  label: Identify Endpoint (Blink LEDs)
  kind: action
  command: "CALL /SYS/ENDPOINTS/<UBEX_EP>:identifyMe()"
  params:
    - name: UBEХ_EP
      type: string

- id: ep_set_control_lock
  label: Set Endpoint Control Lock (Jog Dial)
  kind: action
  command: "SET /SYS/ENDPOINTS/<UBEX_EP>/SETTINGS/UI.ControlLock=<parameter>"
  params:
    - name: UBEХ_EP
      type: string
    - name: parameter
      type: enum
      description: "0=Unlocked | 1=Locked | 2=ForceLocked"

- id: ep_set_dark_mode
  label: Set Endpoint Dark Mode
  kind: action
  command: "SET /SYS/ENDPOINTS/<UBEX_EP>/SETTINGS/UI/DARKMODE.DarkModeEnable=<logical_value>"
  params:
    - name: UBEХ_EP
      type: string
    - name: logical_value
      type: enum
      description: "true | false"

- id: ep_set_dark_mode_delay
  label: Set Endpoint Dark Mode Delay
  kind: action
  command: "SET /SYS/ENDPOINTS/<UBEX_EP>/SETTINGS/UI/DARKMODE.DarkModeDelay=<second>"
  params:
    - name: UBEХ_EP
      type: string
    - name: second
      type: integer

- id: ep_set_jogdial_rotary_direction
  label: Set Jog Dial Rotary Direction
  kind: action
  command: "SET /SYS/ENDPOINTS/<UBEX_EP>/SETTINGS/UI.RotaryDirection=<parameter>"
  params:
    - name: UBEХ_EP
      type: string
    - name: parameter
      type: enum
      description: "0=CW down | 1=CCW down"

- id: ep_set_lcd_brightness
  label: Set Endpoint LCD Brightness
  kind: action
  command: "SET /SYS/ENDPOINTS/<UBEX_EP>/SETTINGS/UI.DisplayBrightness=<parameter>"
  params:
    - name: UBEХ_EP
      type: string
    - name: parameter
      type: integer
      description: 0..10

- id: ep_bootload
  label: Set Endpoint to Bootload Mode
  kind: action
  command: "CALL /SYS/ENDPOINTS/<UBEX_EP>:bootload()"
  params:
    - name: UBEХ_EP
      type: string

- id: ep_reset
  label: Restart Endpoint
  kind: action
  command: "CALL /SYS/ENDPOINTS/<UBEX_EP>:reset()"
  params:
    - name: UBEХ_EP
      type: string

- id: ep_factory_defaults
  label: Restore Endpoint Factory Defaults
  kind: action
  command: "CALL /SYS/ENDPOINTS/<UBEX_EP>:factoryDefaults()"
  params:
    - name: UBEХ_EP
      type: string

# ---- 9.7 Endpoint Management ----
- id: query_registered_endpoints
  label: Query Number of Registered Endpoints
  kind: query
  command: "GET /SYS/ENDPOINTS.RegisteredEndpoints"
  params: []

- id: query_connected_endpoints
  label: Query Number of Connected Endpoints
  kind: query
  command: "GET /SYS/ENDPOINTS.ConnectedEndpoints"
  params: []

- id: query_registered_tx
  label: Query Number of Registered Transmitters
  kind: query
  command: "GET /SYS/ENDPOINTS.RegisteredTxEndpoints"
  params: []

- id: query_connected_tx
  label: Query Number of Connected Transmitters
  kind: query
  command: "GET /SYS/ENDPOINTS.ConnectedTxEndpoints"
  params: []

- id: query_registered_rx
  label: Query Number of Registered Receivers
  kind: query
  command: "GET /SYS/ENDPOINTS.RegisteredRxEndpoints"
  params: []

- id: query_connected_rx
  label: Query Number of Connected Receivers
  kind: query
  command: "GET /SYS/ENDPOINTS.ConnectedRxEndpoints"
  params: []

- id: query_registered_trx
  label: Query Number of Registered Transceivers
  kind: query
  command: "GET /SYS/ENDPOINTS.RegisteredTrxEndpoints"
  params: []

- id: query_connected_trx
  label: Query Number of Connected Transceivers
  kind: query
  command: "GET /SYS/ENDPOINTS.ConnectedTrxEndpoints"
  params: []

- id: ep_query_connection_status
  label: Query Endpoint Connection Status
  kind: query
  command: "GET /SYS/ENDPOINTS/<UBEX_EP>.ConnectionStatus"
  params:
    - name: UBEХ_EP
      type: string

- id: ep_query_claiming_status
  label: Query Endpoint Claiming Status
  kind: query
  command: "GET /SYS/ENDPOINTS/<UBEX_EP>.ClaimingStatus"
  params:
    - name: UBEХ_EP
      type: string

- id: unclaim_endpoint
  label: Unclaim an Endpoint
  kind: action
  command: "CALL /SYS/ENDPOINTS:unclaimEndpoint(<UBEX_EP>)"
  params:
    - name: UBEХ_EP
      type: string

- id: unclaim_all_endpoints
  label: Unclaim All Endpoints
  kind: action
  command: "CALL /SYS/ENDPOINTS:unclaimAllEndpoint()"
  params: []

- id: query_mapped_endpoint_count
  label: Query Number of Mapped Endpoints
  kind: query
  command: "GET /MEDIA/DEVICEMAP.MappedEndpointCount"
  params: []

- id: query_logical_device_endpoint
  label: Query Endpoint ID of a Logical Device ID
  kind: query
  command: "GET /MEDIA/DEVICEMAP.<logical_device_ID>"
  params:
    - name: logical_device_ID
      type: string
      description: "X1, X2, ..."

- id: assign_endpoint_logical_id
  label: Assign Endpoint to a Logical Device ID
  kind: action
  command: "CALL /MEDIA/DEVICEMAP:assign(logical_device_ID:<UBEX_EP>)"
  params:
    - name: logical_device_ID
      type: string
    - name: UBEХ_EP
      type: string

# ---- 9.8 Video Crosspoint ----
- id: video_xp_switch_one
  label: Switch Video Stream to One Destination
  kind: action
  command: "CALL /MEDIA/XP/VIDEO:switch(<in>:<out>)"
  params:
    - name: in
      type: string
      description: "S<devID><port>"
    - name: out
      type: string
      description: "D<devID><port>"

- id: video_xp_switch_all
  label: Switch Video Stream to All Destinations
  kind: action
  command: "CALL /MEDIA/XP/VIDEO:switchAll(<in>)"
  params:
    - name: in
      type: string

- id: video_xp_disconnect
  label: Disconnect Video Stream from Destination
  kind: action
  command: "CALL /MEDIA/XP/VIDEO:switch(0:<destination>)"
  params:
    - name: destination
      type: string

- id: video_xp_query_all
  label: Query Status of All Video Ports
  kind: query
  command: "GET /MEDIA/XP/VIDEO/*.*"
  params: []

- id: video_xp_query_source_count
  label: Query Number of Video Source Ports
  kind: query
  command: "GET /MEDIA/XP/VIDEO.SourcePortCount"
  params: []

- id: video_xp_query_dest_count
  label: Query Number of Video Destination Ports
  kind: query
  command: "GET /MEDIA/XP/VIDEO.DestinationPortCount"
  params: []

# ---- 9.9 Video Stream Settings - Source Side ----
- id: video_src_query_name
  label: Query Source Stream Name
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in>.SourceName"
  params:
    - name: in
      type: string

- id: video_src_set_name
  label: Set Source Stream Name
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<in>.SourceName=<name>"
  params:
    - name: in
      type: string
    - name: name
      type: string

- id: video_src_query_tags
  label: Query Source Stream Tags
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in>.Tags"
  params:
    - name: in
      type: string

- id: video_src_add_tags
  label: Add Tags to Source Stream
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/<in>:addTags(<tag>)"
  params:
    - name: in
      type: string
    - name: tag
      type: string

- id: video_src_remove_tags
  label: Remove Tags from Source Stream
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/<in>:removeTags(<tag>)"
  params:
    - name: in
      type: string
    - name: tag
      type: string

- id: video_src_remove_all_tags
  label: Remove All Tags from Source Stream
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/<in>:removeAllTags()"
  params:
    - name: in
      type: string

- id: video_src_query_device_tags
  label: Query Source Device Tags
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in>.DeviceTags"
  params:
    - name: in
      type: string

- id: video_src_set_enabled
  label: Enable/Disable Source Stream
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<in>/STREAM.Enabled=<logical_value>"
  params:
    - name: in
      type: string
    - name: logical_value
      type: enum
      description: "true | false"

- id: video_src_identify
  label: Identify Source Stream
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/<in>/STREAM:identify()"
  params:
    - name: in
      type: string

- id: video_src_set_resolution
  label: Set Source Resolution
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<in>/STREAM.ResolutionSetting=<resolution>"
  params:
    - name: in
      type: string
    - name: resolution
      type: string

- id: video_src_set_resolution_mode
  label: Set Source Resolution Mode
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<in>/STREAM.ResolutionMode=<resolution_mode>"
  params:
    - name: in
      type: string
    - name: resolution_mode
      type: enum
      description: "Pass | Forced | EdidBased | Tile"

- id: video_src_set_image_position
  label: Set Source Scaler Image Position
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<in>/STREAM.ImagePosition=<image_position>"
  params:
    - name: in
      type: string
    - name: image_position
      type: enum
      description: "Center | Stretch | Fit"

- id: video_src_set_tile_resolution
  label: Set Source Tile Resolution
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<in>/STREAM.TileResolutionSetting=<resolution>"
  params:
    - name: in
      type: string
    - name: resolution
      type: string

- id: video_src_set_color_space
  label: Set Source Color Space
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<in>/STREAM.ColorSpaceSetting=<color_space>"
  params:
    - name: in
      type: string
    - name: color_space
      type: enum
      description: "Pass | RGB | YCbCr 4:4:4 | YCbCr 4:2:2"

- id: video_src_set_color_range
  label: Set Source Color Range
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<in>/STREAM.ColorRangeSetting=<color_range>"
  params:
    - name: in
      type: string
    - name: color_range
      type: enum
      description: "Pass | Full | Limited"

- id: video_src_set_color_depth
  label: Set Source Color Depth
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<in>/STREAM.ColorDepthSetting=<color_depth>"
  params:
    - name: in
      type: string
    - name: color_depth
      type: enum
      description: "Pass | 8 bpc | 10 bpc | 12 bpc"

- id: video_src_query_timing_mode
  label: Query Source Timing Mode
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in>/STREAM.TimingMode"
  params:
    - name: in
      type: string

- id: video_src_set_hdcp_enable
  label: Set Source HDCP Enable
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<in>/PORT.HdcpEnable=<logical_value>"
  params:
    - name: in
      type: string
    - name: logical_value
      type: enum
      description: "true | false"

# ---- 9.10 Video Stream Settings - Destination Side ----
- id: video_dst_query_name
  label: Query Destination Name
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<out>.DestinationName"
  params:
    - name: out
      type: string

- id: video_dst_set_name
  label: Set Destination Name
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>.DestinationName=<name>"
  params:
    - name: out
      type: string
    - name: name
      type: string

- id: video_dst_query_tags
  label: Query Destination Tags
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<out>.Tags"
  params:
    - name: out
      type: string

- id: video_dst_add_tags
  label: Add Tags to Destination
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/<out>:addTags(<tag>)"
  params:
    - name: out
      type: string
    - name: tag
      type: string

- id: video_dst_remove_tags
  label: Remove Tags from Destination
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/<out>:removeTags(<tag>)"
  params:
    - name: out
      type: string
    - name: tag
      type: string

- id: video_dst_remove_all_tags
  label: Remove All Tags from Destination
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/<out>:removeAllTags()"
  params:
    - name: out
      type: string

- id: video_dst_query_device_tags
  label: Query Destination Device Tags
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<out>.DeviceTags"
  params:
    - name: out
      type: string

- id: video_dst_set_enabled
  label: Enable/Disable Destination Stream
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/STREAM.Enabled=<logical_value>"
  params:
    - name: out
      type: string
    - name: logical_value
      type: enum
      description: "true | false"

- id: video_dst_set_resolution
  label: Set Destination Resolution
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.ResolutionSetting=<resolution>"
  params:
    - name: out
      type: string
    - name: resolution
      type: string

- id: video_dst_set_resolution_mode
  label: Set Destination Resolution Mode
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.ResolutionMode=<resolution_mode>"
  params:
    - name: out
      type: string
    - name: resolution_mode
      type: enum
      description: "Pass | Forced | EdidBased"

- id: video_dst_query_edid_based_resolution
  label: Query Destination EDID Based Resolution
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<out>/PORT.EdidBasedResolution"
  params:
    - name: out
      type: string

- id: video_dst_set_image_position
  label: Set Destination Image Position
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.ImagePosition=<image_position>"
  params:
    - name: out
      type: string
    - name: image_position
      type: enum
      description: "Center | Stretch | Fit"

- id: video_dst_set_color_space
  label: Set Destination Color Space
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.ColorSpaceSetting=<color_space>"
  params:
    - name: out
      type: string
    - name: color_space
      type: enum
      description: "Pass | RGB | YCbCr 4:4:4 | YCbCr 4:2:2"

- id: video_dst_set_color_range
  label: Set Destination Color Range
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.ColorRangeSetting=<color_range>"
  params:
    - name: out
      type: string
    - name: color_range
      type: enum
      description: "Pass | Full | Limited"

- id: video_dst_set_color_depth
  label: Set Destination Color Depth
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.ColorDepthSetting=<color_depth>"
  params:
    - name: out
      type: string
    - name: color_depth
      type: enum
      description: "Pass | 8 bpc | 10 bpc | 12 bpc"

- id: video_dst_query_timing_mode
  label: Query Destination Timing Mode
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<out>/PORT.TimingMode"
  params:
    - name: out
      type: string

- id: video_dst_set_timing_mode
  label: Set Destination Timing Mode
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.TimingModeSetting=<timing_mode>"
  params:
    - name: out
      type: string
    - name: timing_mode
      type: enum
      description: "Freerun | SourceLocked"

- id: video_dst_set_nosync_mode
  label: Set Destination No-Sync/Test-Pattern Mode
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.NoSyncMode=<nosync_mode>"
  params:
    - name: out
      type: string
    - name: nosync_mode
      type: enum
      description: "AlwaysOff | NoSignal | AlwaysOn | Freeze"

- id: video_dst_set_nosync_color
  label: Set Destination No-Sync Screen Color
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.NoSyncColor=<RGB_code>"
  params:
    - name: out
      type: string
    - name: RGB_code
      type: string
      description: "R,G,B (e.g. 128,128,128)"

- id: video_dst_freeze_signal
  label: Freeze Destination Signal
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/<out>/PORT:freezeSignal()"
  params:
    - name: out
      type: string

- id: video_dst_unfreeze_signal
  label: Unfreeze Destination Signal
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/<out>/PORT:unfreezeSignal()"
  params:
    - name: out
      type: string

- id: video_dst_identify_display
  label: Identify Destination Display
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/<out>/PORT:identify()"
  params:
    - name: out
      type: string

- id: video_dst_set_hdcp_mode
  label: Set Destination HDCP Mode
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.HdcpMode=<HDCP_mode>"
  params:
    - name: out
      type: string
    - name: HDCP_mode
      type: enum
      description: "Auto | Always | AlwaysType1"

- id: video_dst_query_sourcemux_options
  label: Query Destination Source MUX Options
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<out>/PORT.SourceMuxOptions"
  params:
    - name: out
      type: string

- id: video_dst_set_sourcemux
  label: Set Destination Source MUX
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.SourceMux=<destination|in|out>"
  params:
    - name: out
      type: string
    - name: source
      type: enum
      description: "D1 | D2 | I1 | I2 | O1 | MV1 | D5"

# ---- 9.11 Video Wall ----
- id: vw_create
  label: Create Grid Video Wall
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS:createGridVideoWall(<video_wall_parameters>)"
  params:
    - name: video_wall_parameters
      type: string
      description: "<ID>;<cols>;<rows>;<h_size>;<v_size>;<top_bezel>;<bottom_bezel>;<left_bezel>;<right_bezel>;<h_gap>;<v_gap>"

- id: vw_delete
  label: Delete Video Wall
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS:deleteGridVideoWall(<video_wall_ID>)"
  params:
    - name: video_wall_ID
      type: string

- id: vw_set_name
  label: Set Video Wall Name
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>.Name=<name>"
  params:
    - name: video_wall_ID
      type: string
    - name: name
      type: string

- id: vw_query_size
  label: Query Video Wall Size
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/<video_wall_ID>.Size"
  params:
    - name: video_wall_ID
      type: string

- id: vw_modify_size
  label: Modify Video Wall Size
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>:modifyVideoWallSize(<column_number>;<row_number>)"
  params:
    - name: video_wall_ID
      type: string
    - name: column_number
      type: integer
    - name: row_number
      type: integer

- id: vw_assign_output
  label: Assign Output to Video Wall Display
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/ASSIGNS:assignOutput(<display_ID>:<out>)"
  params:
    - name: video_wall_ID
      type: string
    - name: display_ID
      type: string
    - name: out
      type: string

- id: vw_unassign_output
  label: Unassign Output from Video Wall
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/ASSIGNS:unassignOutput(<display_ID>)"
  params:
    - name: video_wall_ID
      type: string
    - name: display_ID
      type: string

- id: vw_unassign_all_outputs
  label: Unassign All Outputs from Video Wall
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/ASSIGNS:unassignAllOutput()"
  params:
    - name: video_wall_ID
      type: string

- id: vw_query_assignment
  label: Query Video Wall Output Assignment
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/ASSIGNS/<video_wall_ID>.<display_ID>"
  params:
    - name: video_wall_ID
      type: string
    - name: display_ID
      type: string

- id: vw_set_background_color
  label: Set Video Wall Background Color
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/SETTINGS.BackgroundColor=<RGB_code>"
  params:
    - name: video_wall_ID
      type: string
    - name: RGB_code
      type: string

- id: vw_set_timing_mode
  label: Set Video Wall Timing Mode
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/SETTINGS.TimingMode=<timing_mode>"
  params:
    - name: video_wall_ID
      type: string
    - name: timing_mode
      type: enum
      description: "Freerun | SourceLocked"

- id: vw_set_color_space
  label: Set Video Wall Color Space
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/SETTINGS.ColorSpaceSetting=<color_space>"
  params:
    - name: video_wall_ID
      type: string
    - name: color_space
      type: enum

- id: vw_set_resolution_mode
  label: Set Video Wall Resolution Mode
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/SETTINGS.ResolutionMode=<resolution_mode>"
  params:
    - name: video_wall_ID
      type: string
    - name: resolution_mode
      type: enum
      description: "Pass | Forced | EdidBased"

- id: vw_set_resolution
  label: Set Video Wall Resolution
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/SETTINGS.ResolutionSetting=<resolution>"
  params:
    - name: video_wall_ID
      type: string
    - name: resolution
      type: string

- id: vw_set_force_nosync_screen
  label: Enable/Disable Video Wall Force No-Sync Screen
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/SETTINGS.ForceNoSyncScreen=<logical_value>"
  params:
    - name: video_wall_ID
      type: string
    - name: logical_value
      type: enum

- id: vw_query_display_params
  label: Query Video Wall Display Parameters
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/<video_wall_ID>/DISPLAYS.All"
  params:
    - name: video_wall_ID
      type: string

- id: vw_set_display_width
  label: Set Video Wall Display Width
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/DISPLAYS/ALL.Width=<horizontal_size>"
  params:
    - name: video_wall_ID
      type: string
    - name: horizontal_size
      type: integer
      description: mm

- id: vw_set_display_height
  label: Set Video Wall Display Height
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/DISPLAYS/ALL.Height=<vertical_size>"
  params:
    - name: video_wall_ID
      type: string
    - name: vertical_size
      type: integer
      description: mm

- id: vw_set_display_top_bezel
  label: Set Video Wall Display Top Bezel
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/DISPLAYS/ALL.TopBezelSize=<top_bezel_size>"
  params:
    - name: video_wall_ID
      type: string
    - name: top_bezel_size
      type: integer

- id: vw_set_display_bottom_bezel
  label: Set Video Wall Display Bottom Bezel
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/DISPLAYS/ALL.BottomBezelSize=<bottom_bezel_size>"
  params:
    - name: video_wall_ID
      type: string
    - name: bottom_bezel_size
      type: integer

- id: vw_set_display_left_bezel
  label: Set Video Wall Display Left Bezel
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/DISPLAYS/ALL.LeftBezelSize=<left_bezel_size>"
  params:
    - name: video_wall_ID
      type: string
    - name: left_bezel_size
      type: integer

- id: vw_set_display_right_bezel
  label: Set Video Wall Display Right Bezel
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/DISPLAYS/ALL.RightBezelSize=<right_bezel_size>"
  params:
    - name: video_wall_ID
      type: string
    - name: right_bezel_size
      type: integer

- id: vw_set_display_h_gap
  label: Set Video Wall Horizontal Gap Size
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/DISPLAYS/ALL.HorizontalGapSize=<horizontal_gap_size>"
  params:
    - name: video_wall_ID
      type: string
    - name: horizontal_gap_size
      type: integer

- id: vw_set_display_v_gap
  label: Set Video Wall Vertical Gap Size
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/DISPLAYS/ALL.VerticalGapSize=<vertical_gap_size>"
  params:
    - name: video_wall_ID
      type: string
    - name: vertical_gap_size
      type: integer

- id: vw_query_state
  label: Query Video Wall State
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/<video_wall_ID>.State"
  params:
    - name: video_wall_ID
      type: string

- id: vw_set_state
  label: Set Video Wall State
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>:setState(<state>)"
  params:
    - name: video_wall_ID
      type: string
    - name: state
      type: enum
      description: "Active | Inactive"

- id: vw_identify
  label: Identify Video Wall
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>:identifyVideoWall()"
  params:
    - name: video_wall_ID
      type: string

- id: vw_layout_create
  label: Create Video Wall Layout
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS:createLayout(<layout_ID>;<name>)"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: name
      type: string

- id: vw_layout_delete
  label: Delete Video Wall Layout
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS:deleteLayout(<layout_ID>)"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string

- id: vw_layout_delete_all
  label: Delete All Video Wall Layouts
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS:deleteAllLayout()"
  params:
    - name: video_wall_ID
      type: string

- id: vw_layout_query_active
  label: Query Active Video Wall Layout
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS.activeLayout"
  params:
    - name: video_wall_ID
      type: string

- id: vw_layout_activate
  label: Activate Video Wall Layout
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS.activateLayout(<layout_ID>)"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string

- id: vw_layout_set_name
  label: Set Video Wall Layout Name
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>.Name=<name>"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: name
      type: string

- id: vw_layout_identify
  label: Identify Video Wall Layout
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>:identifyLayout()"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string

- id: vw_zone_create
  label: Create Zone in Layout
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>:createZone(<zone_ID>;<display_ID>)"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string
    - name: display_ID
      type: string

- id: vw_zone_delete
  label: Delete Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>:deleteZone(<zone_ID>)"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string

- id: vw_zone_delete_all
  label: Delete All Zones
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>:deleteAllZone()"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string

- id: vw_zone_set_name
  label: Set Zone Name
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>.Name=<name>"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string
    - name: name
      type: string

- id: vw_zone_query_size
  label: Query Zone Size
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>.ZoneSize"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string

- id: vw_zone_identify
  label: Identify Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>:identifyZone()"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string

- id: vw_zone_assign_display
  label: Assign Display to Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>:assignDisplay(<display_ID>)"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string
    - name: display_ID
      type: string

- id: vw_zone_unassign_display
  label: Unassign Display from Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>:unassignDisplay(<display_ID>)"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string
    - name: display_ID
      type: string

- id: vw_zone_unassign_all_displays
  label: Unassign All Displays from Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>:unassignAllDisplay()"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string

- id: vw_zone_set_background_color
  label: Set Zone Background Color
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>.BackgroundColor=<RGB_code>"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string
    - name: RGB_code
      type: string

- id: vw_zone_query_tags
  label: Query Zone Tags
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>.Tags"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string

- id: vw_zone_add_tags
  label: Add Tags to Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>:addTags(<tag>)"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string
    - name: tag
      type: string

- id: vw_zone_remove_tags
  label: Remove Tags from Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>:removeTags(<tag>)"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string
    - name: tag
      type: string

- id: vw_zone_remove_all_tags
  label: Remove All Tags from Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>:removeAllTags()"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string

- id: vw_zone_query_static_tags
  label: Query Zone Static Tags
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>.StaticTags"
  params:
    - name: video_wall_ID
      type: string
    - name: layout_ID
      type: string
    - name: zone_ID
      type: string

- id: video_xp_switch_to_zone
  label: Switch Video Stream to Video Wall Zone
  kind: action
  command: "CALL /MEDIA/XP/VIDEO:switch(<in>:<zone_ID>)"
  params:
    - name: in
      type: string
    - name: zone_ID
      type: string

# ---- 9.12 Multiviewer ----
- id: mv_set_canvas_resolution
  label: Set Multiviewer Canvas Resolution
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.ResolutionSetting=<resolution>"
  params:
    - name: out
      type: string
    - name: resolution
      type: string

- id: mv_set_tile_enabled
  label: Enable/Disable Multiviewer Tile
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT/<tile>.Enabled=<logical_value>"
  params:
    - name: out
      type: string
    - name: tile
      type: enum
      description: "T1 | T2 | T3 | T4"
    - name: logical_value
      type: enum

- id: mv_set_tile_position
  label: Set Multiviewer Tile Position
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT/<tile>.Position=<horizontal_pixels>,<vertical_pixels>"
  params:
    - name: out
      type: string
    - name: tile
      type: enum
    - name: horizontal_pixels
      type: integer
    - name: vertical_pixels
      type: integer

- id: mv_set_tile_size
  label: Set Multiviewer Tile Size
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT/<tile>.Size=<horizontal_pixels>x<vertical_pixels>"
  params:
    - name: out
      type: string
    - name: tile
      type: enum
    - name: horizontal_pixels
      type: integer
    - name: vertical_pixels
      type: integer

- id: mv_set_layer_order
  label: Set Multiviewer Tile Layer Order
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.LayerOrder=<tile_ID>;<tile_ID>;<tile_ID>;<tile_ID>"
  params:
    - name: out
      type: string
    - name: tile_ID
      type: enum
      description: "1 | 2 | 3 | 4"

- id: mv_set_tile_opacity
  label: Set Multiviewer Tile Opacity
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT/<tile>.Opacity=<percent>"
  params:
    - name: out
      type: string
    - name: tile
      type: enum
    - name: percent
      type: integer
      description: 0..100

- id: mv_set_color_depth
  label: Set Multiviewer Canvas Color Depth
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.ColorDepthSetting=<color_depth>"
  params:
    - name: out
      type: string
    - name: color_depth
      type: enum

- id: mv_query_tile_status
  label: Query Multiviewer Tile Status
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<out>/PORT/<tile>.Status"
  params:
    - name: out
      type: string
    - name: tile
      type: enum

- id: mv_set_nosync_mode
  label: Set Multiviewer No-Sync Mode
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.NoSyncMode=<nosync_mode>"
  params:
    - name: out
      type: string
    - name: nosync_mode
      type: enum

- id: mv_set_nosync_color
  label: Set Multiviewer No-Sync Color
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.NoSyncColor=<RGB_code>"
  params:
    - name: out
      type: string
    - name: RGB_code
      type: string

- id: mv_set_hdcp_mode
  label: Set Multiviewer HDCP Mode
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.HdcpMode=<HDCP_mode>"
  params:
    - name: out
      type: string
    - name: HDCP_mode
      type: enum

- id: mv_identify_display
  label: Identify Multiviewer Display
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/<out>/PORT:identify()"
  params:
    - name: out
      type: string

- id: mv_query_sourcemux_options
  label: Query Multiviewer Source MUX Options
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<out>/PORT.SourceMuxOptions"
  params:
    - name: out
      type: string

- id: mv_set_sourcemux
  label: Set Multiviewer Source MUX
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/<out>/PORT.SourceMux=<in|out>"
  params:
    - name: out
      type: string
    - name: source
      type: enum
      description: "MV1 | D5 | I1 | I2 | O1"

# ---- 9.13 Audio Crosspoint ----
- id: audio_xp_query_all
  label: Query Status of All Audio Ports
  kind: query
  command: "GET /MEDIA/XP/AUDIO/*.*"
  params: []

- id: audio_xp_switch_one
  label: Switch Audio Stream to One Destination
  kind: action
  command: "CALL /MEDIA/XP/AUDIO:switch(<in>:<out>)"
  params:
    - name: in
      type: string
    - name: out
      type: string

- id: audio_xp_switch_all
  label: Switch Audio Stream to All Destinations
  kind: action
  command: "CALL /MEDIA/XP/AUDIO:switchAll(<in>)"
  params:
    - name: in
      type: string

- id: audio_xp_query_source_count
  label: Query Number of Audio Source Ports
  kind: query
  command: "GET /MEDIA/XP/AUDIO.SourcePortCount"
  params: []

- id: audio_xp_query_dest_count
  label: Query Number of Audio Destination Ports
  kind: query
  command: "GET /MEDIA/XP/AUDIO.DestinationPortCount"
  params: []

# ---- 9.14 Audio Stream Settings ----
- id: audio_src_set_enabled
  label: Enable/Disable Audio Source Stream
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/<in>/STREAM.Enabled=<logical_value>"
  params:
    - name: in
      type: string
    - name: logical_value
      type: enum

- id: audio_dst_set_enabled
  label: Enable/Disable Audio Destination Stream
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/<out>/STREAM.Enabled=<logical_value>"
  params:
    - name: out
      type: string
    - name: logical_value
      type: enum

- id: audio_src_query_name
  label: Query Audio Source Name
  kind: query
  command: "GET /MEDIA/STREAMS/AUDIO/<in>.SourceName"
  params:
    - name: in
      type: string

- id: audio_src_set_name
  label: Set Audio Source Name
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/<in>.SourceName=<name>"
  params:
    - name: in
      type: string
    - name: name
      type: string

- id: audio_dst_query_name
  label: Query Audio Destination Name
  kind: query
  command: "GET /MEDIA/STREAMS/AUDIO/<out>.DestinationName"
  params:
    - name: out
      type: string

- id: audio_dst_set_name
  label: Set Audio Destination Name
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/<out>.DestinationName=<name>"
  params:
    - name: out
      type: string
    - name: name
      type: string

- id: audio_query_tags
  label: Query Audio Stream/Destination Tags
  kind: query
  command: "GET /MEDIA/STREAMS/AUDIO/<in|out>.Tags"
  params:
    - name: in_or_out
      type: string

- id: audio_add_tags
  label: Add Tags to Audio Stream/Destination
  kind: action
  command: "CALL /MEDIA/STREAMS/AUDIO/<in|out>:addTags(<tag>)"
  params:
    - name: in_or_out
      type: string
    - name: tag
      type: string

- id: audio_remove_tags
  label: Remove Tags from Audio Stream/Destination
  kind: action
  command: "CALL /MEDIA/STREAMS/AUDIO/<in|out>:removeTags(<tag>)"
  params:
    - name: in_or_out
      type: string
    - name: tag
      type: string

- id: audio_remove_all_tags
  label: Remove All Tags from Audio Stream/Destination
  kind: action
  command: "CALL /MEDIA/STREAMS/AUDIO/<in|out>:removeAllTags()"
  params:
    - name: in_or_out
      type: string

- id: audio_query_device_tags
  label: Query Audio Device Tags
  kind: query
  command: "GET /MEDIA/STREAMS/AUDIO/<in|out>.DeviceTags"
  params:
    - name: in_or_out
      type: string

# ---- 9.15 Analog Audio (F110/F111/F120/F121/F130) ----
- id: analog_set_volume_db
  label: Set Analog Volume (dB)
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/<in|out>/Port.VolumedB=<volume>"
  params:
    - name: in_or_out
      type: string
    - name: volume
      type: number
      description: -95.62..0 dB

- id: analog_set_volume_percent
  label: Set Analog Volume (Percent)
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/<in|out>/PORT.VolumePercent=<percent>"
  params:
    - name: in_or_out
      type: string
    - name: percent
      type: number

- id: analog_set_balance
  label: Set Analog Balance
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/<in|out>/PORT.Balance=<balance>"
  params:
    - name: in_or_out
      type: string
    - name: balance
      type: integer
      description: -100..+100, 0=center

- id: analog_set_gain
  label: Set Analog Input Gain
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/<in>/PORT.Gain=<gain>"
  params:
    - name: in
      type: string
    - name: gain
      type: number
      description: -12..35 dB (input port only)

- id: analog_set_mute
  label: Mute/Unmute Analog Output
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/<out>/PORT.Mute=<logical_value>"
  params:
    - name: out
      type: string
    - name: logical_value
      type: enum

# ---- 9.16 EDID Management ----
- id: edid_query_validity
  label: Query Dynamic EDID Validity
  kind: query
  command: "GET /MEDIA/EDID/D/<dynamic>.Validity"
  params:
    - name: dynamic
      type: string

- id: edid_query_preferred_resolution
  label: Query EDID Preferred Resolution
  kind: query
  command: "GET /MEDIA/EDID/U|F|D|E/<user|factory|dynamic|emulated>.PreferredResolution"
  params:
    - name: edid_memory
      type: string

- id: edid_switch
  label: Emulate EDID on Input Port
  kind: action
  command: "CALL /MEDIA/EDID:switch(<user|factory|dynamic>:<emulated>)"
  params:
    - name: source_memory
      type: string
    - name: emulated
      type: string

- id: edid_switch_all
  label: Emulate EDID on All Input Ports
  kind: action
  command: "CALL /MEDIA/EDID:switchAll(<user|factory|dynamic>)"
  params:
    - name: source_memory
      type: string

- id: edid_copy
  label: Copy EDID to User Memory
  kind: action
  command: "CALL /MEDIA/EDID:copy(<user|factory|dynamic|emulated>:<user>)"
  params:
    - name: source_memory
      type: string
    - name: user
      type: string

- id: edid_delete
  label: Delete EDID from User Memory
  kind: action
  command: "CALL /MEDIA/EDID:delete(<user>)"
  params:
    - name: user
      type: string

- id: edid_reset
  label: Reset All Emulated EDIDs to Factory
  kind: action
  command: "CALL /MEDIA/EDID:reset()"
  params: []

# ---- 9.17 System Monitoring ----
- id: mon_query_signal_present_port
  label: Query Video Signal Presence on Port
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in|out>/PORT.SignalPresent"
  params:
    - name: in_or_out
      type: string

- id: mon_query_connected
  label: Query Connected Device Presence
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in|out>/PORT.Connected"
  params:
    - name: in_or_out
      type: string

- id: mon_query_signal_present_stream
  label: Query Video Signal Presence in Stream
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in|out>/STREAM.SignalPresent"
  params:
    - name: in_or_out
      type: string

- id: mon_query_embedded_audio
  label: Query Embedded Audio Presence
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in|out>/STREAM.EmbeddedAudioPresent"
  params:
    - name: in_or_out
      type: string

- id: mon_query_signal_type
  label: Query Signal Type (DVI/HDMI)
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in|out>/STREAM.SignalType"
  params:
    - name: in_or_out
      type: string

- id: mon_query_src_original_resolution
  label: Query Source Original Resolution
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in>/PORT.Resolution"
  params:
    - name: in
      type: string

- id: mon_query_src_modified_resolution
  label: Query Source Modified Resolution
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in>/STREAM.Resolution"
  params:
    - name: in
      type: string

- id: mon_query_dst_original_resolution
  label: Query Destination Original Resolution
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<out>/STREAM.Resolution"
  params:
    - name: out
      type: string

- id: mon_query_dst_modified_resolution
  label: Query Destination Modified Resolution
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<out>/PORT.Resolution"
  params:
    - name: out
      type: string

- id: mon_query_stream_bandwidth
  label: Query Stream Bandwidth
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in|out>/STREAM.Bandwidth"
  params:
    - name: in_or_out
      type: string

- id: mon_query_control_owner
  label: Query Destination Control Owner
  kind: query
  command: "GET /MEDIA/XP/VIDEO/<out>/.OwnedBy"
  params:
    - name: out
      type: string

- id: mon_query_bandwidth_limit
  label: Query Bandwidth Limit Exceeded
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/<in|out>/STREAM.BandwidthLimitExceeded"
  params:
    - name: in_or_out
      type: string

- id: mon_query_analog_mute_status
  label: Query Analog Audio Output Mute Status
  kind: query
  command: "GET /MEDIA/STREAMS/AUDIO/<out>/Port.MuteStatus"
  params:
    - name: out
      type: string

- id: ep_query_health
  label: Query Endpoint Health Status
  kind: query
  command: "GETALL /SYS/ENDPOINTS/<UBEX_EP>/STATUS/HEALTH"
  params:
    - name: UBEХ_EP
      type: string

- id: ep_query_link_status
  label: Query Endpoint Link Status
  kind: query
  command: "GETALL /SYS/ENDPOINTS/<UBEX_EP>/STATUS/UPLINK/<link>"
  params:
    - name: UBEХ_EP
      type: string
    - name: link
      type: enum
      description: "LINK1 | LINK2"

# ---- 9.18 SFP+ Module Information ----
- id: sfp_query_vendor
  label: Query SFP+ Vendor Name
  kind: query
  command: "GET /SYS/ENDPOINTS/<UBEX_EP>/STATUS/UPLINK/<link>/SFP.VendorName"
  params:
    - name: UBEХ_EP
      type: string
    - name: link
      type: enum

- id: sfp_query_part_number
  label: Query SFP+ Part Number
  kind: query
  command: "GET /SYS/ENDPOINTS/<UBEX_EP>/STATUS/UPLINK/<link>/SFP.PartNumber"
  params:
    - name: UBEХ_EP
      type: string
    - name: link
      type: enum

- id: sfp_query_compliance
  label: Query SFP+ Compliance
  kind: query
  command: "GET /SYS/ENDPOINTS/<UBEX_EP>/STATUS/UPLINK/<link>/SFP.Compliance"
  params:
    - name: UBEХ_EP
      type: string
    - name: link
      type: enum

- id: sfp_query_max_link_length
  label: Query SFP+ Max Cable Length
  kind: query
  command: "GET /SYS/ENDPOINTS/<UBEX_EP>/STATUS/UPLINK/<link>/SFP.MaxLinkLength"
  params:
    - name: UBEХ_EP
      type: string
    - name: link
      type: enum

- id: sfp_query_type
  label: Query SFP+ Module Type
  kind: query
  command: "GET /SYS/ENDPOINTS/<UBEX_EP>/STATUS/UPLINK/<link>/SFP.Type"
  params:
    - name: UBEХ_EP
      type: string
    - name: link
      type: enum

- id: sfp_query_compatible
  label: Query SFP+ Compatibility
  kind: query
  command: "GET /SYS/ENDPOINTS/<UBEX_EP>/STATUS/UPLINK/<link>/SFP.Compatible"
  params:
    - name: UBEХ_EP
      type: string
    - name: link
      type: enum

# ---- 9.19 Network Configuration - MMU ----
- id: mmu_query_dhcp
  label: Query MMU DHCP State
  kind: query
  command: "GET /MANAGEMENT/NETWORK.DhcpEnabled"
  params: []

- id: mmu_set_dhcp
  label: Change MMU DHCP State
  kind: action
  command: "SET /MANAGEMENT/NETWORK.DhcpEnabled=<logical_value>"
  params:
    - name: logical_value
      type: enum

- id: mmu_query_ip
  label: Query MMU IP Address
  kind: query
  command: "GET /MANAGEMENT/NETWORK.IpAddress"
  params: []

- id: mmu_set_static_ip
  label: Set MMU Static IP Address
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticIpAddress=<IP_address>"
  params:
    - name: IP_address
      type: string

- id: mmu_query_netmask
  label: Query MMU Subnet Mask
  kind: query
  command: "GET /MANAGEMENT/NETWORK.NetworkMask"
  params: []

- id: mmu_set_static_netmask
  label: Set MMU Static Subnet Mask
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticNetworkMask=<netmask>"
  params:
    - name: netmask
      type: string

- id: mmu_query_gateway
  label: Query MMU Gateway Address
  kind: query
  command: "GET /MANAGEMENT/NETWORK.GatewayAddress"
  params: []

- id: mmu_set_static_gateway
  label: Set MMU Static Gateway Address
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticGatewayAddress=<gw_address>"
  params:
    - name: gw_address
      type: string

- id: mmu_apply_network_settings
  label: Apply MMU Network Settings
  kind: action
  command: "CALL /MANAGEMENT/NETWORK:ApplySettings()"
  params: []

# ---- 9.20 Ethernet Port Configuration - Endpoint ----
- id: ep_eth_set_enabled
  label: Enable/Disable Endpoint Ethernet Port
  kind: action
  command: "SET /MEDIA/CONTROL/ETHERNET/<port>/PORT.Enabled=<logical_value>"
  params:
    - name: port
      type: string
    - name: logical_value
      type: enum

- id: ep_eth_set_mode
  label: Set Endpoint Ethernet Mode
  kind: action
  command: "SET /MEDIA/CONTROL/ETHERNET/<port>/PORT.Mode=<mode>"
  params:
    - name: port
      type: string
    - name: mode
      type: enum
      description: "0=AutoNeg | 1=10M HD | 2=10M FD | 3=100M HD | 4=100M FD | 5=1000M FD"

- id: ep_eth_set_name
  label: Set Endpoint Ethernet Port Name
  kind: action
  command: "SET /MEDIA/CONTROL/ETHERNET/<port>.Name=<name>"
  params:
    - name: port
      type: string
    - name: name
      type: string

- id: ep_eth_query_tags
  label: Query Endpoint Ethernet Port Tags
  kind: query
  command: "GET /MEDIA/CONTROL/ETHERNET/<port>.Tags"
  params:
    - name: port
      type: string

- id: ep_eth_add_tags
  label: Add Tags to Ethernet Port
  kind: action
  command: "CALL /MEDIA/CONTROL/ETHERNET/<port>:addTags(<tag>)"
  params:
    - name: port
      type: string
    - name: tag
      type: string

- id: ep_eth_remove_tags
  label: Remove Tags from Ethernet Port
  kind: action
  command: "CALL /MEDIA/CONTROL/ETHERNET/<port>:removeTags(<tag>)"
  params:
    - name: port
      type: string
    - name: tag
      type: string

- id: ep_eth_remove_all_tags
  label: Remove All Tags from Ethernet Port
  kind: action
  command: "CALL /MEDIA/CONTROL/ETHERNET/<port>:removeAllTags()"
  params:
    - name: port
      type: string

- id: ep_eth_query_device_tags
  label: Query Ethernet Port Device Tags
  kind: query
  command: "GET /MEDIA/CONTROL/ETHERNET/<port>.DeviceTags"
  params:
    - name: port
      type: string

# ---- 9.22 Serial Port Configuration - Endpoint (F110/F111/F120/F121/F130) ----
- id: ep_uart_set_baudrate
  label: Set Endpoint RS-232 Baud Rate
  kind: action
  command: "SET /MEDIA/CONTROL/UART/<port>/PORT.Baudrate=<number>"
  params:
    - name: port
      type: string
    - name: number
      type: enum
      description: "0=4800 | 1=7200 | 2=9600 | 3=14400 | 4=19200 | 5=38400 | 6=57600 | 7=115200"

- id: ep_uart_set_stopbits
  label: Set Endpoint RS-232 Stop Bits
  kind: action
  command: "SET /MEDIA/CONTROL/UART/<port>/PORT.StopBits=<number>"
  params:
    - name: port
      type: string
    - name: number
      type: enum
      description: "0=1 | 1=1.5 | 2=2"

- id: ep_uart_set_parity
  label: Set Endpoint RS-232 Parity
  kind: action
  command: "SET /MEDIA/CONTROL/UART/<port>/PORT.Parity=<number>"
  params:
    - name: port
      type: string
    - name: number
      type: enum
      description: "0=None | 1=Odd | 2=Even"

- id: ep_uart_set_server_port
  label: Set Endpoint RS-232 Command Injection TCP Port
  kind: action
  command: "SET /MEDIA/CONTROL/UART/<port>.ServerPort=<port>"
  params:
    - name: port
      type: string
    - name: tcp_port
      type: integer

- id: ep_uart_remap_ports
  label: Remap All RS-232 TCP Injection Ports
  kind: action
  command: "CALL /MEDIA/CONTROL/UART:remapPorts(<start_number>)"
  params:
    - name: start_number
      type: integer

- id: ep_uart_query_config
  label: Query RS-232 Current Configuration
  kind: query
  command: "GET /MEDIA/CONTROL/UART/<port>.Rs232Configuration"
  params:
    - name: port
      type: string

- id: ep_uart_set_enabled
  label: Enable/Disable RS-232 Port
  kind: action
  command: "SET /MEDIA/CONTROL/UART/<port>.Enable=<logical_value>"
  params:
    - name: port
      type: string
    - name: logical_value
      type: enum

- id: ep_uart_set_name
  label: Set RS-232 Port Name
  kind: action
  command: "SET /MEDIA/CONTROL/UART/<port>.Name=<name>"
  params:
    - name: port
      type: string
    - name: name
      type: string

- id: ep_uart_query_tags
  label: Query RS-232 Port Tags
  kind: query
  command: "GET /MEDIA/CONTROL/UART/<port>.Tags"
  params:
    - name: port
      type: string

- id: ep_uart_add_tags
  label: Add Tags to RS-232 Port
  kind: action
  command: "CALL /MEDIA/CONTROL/UART/<port>:addTags(<tag>)"
  params:
    - name: port
      type: string
    - name: tag
      type: string

- id: ep_uart_remove_tags
  label: Remove Tags from RS-232 Port
  kind: action
  command: "CALL /MEDIA/CONTROL/UART/<port>:removeTags(<tag>)"
  params:
    - name: port
      type: string
    - name: tag
      type: string

- id: ep_uart_remove_all_tags
  label: Remove All Tags from RS-232 Port
  kind: action
  command: "CALL /MEDIA/CONTROL/UART/<port>:removeAllTags()"
  params:
    - name: port
      type: string

- id: ep_uart_query_device_tags
  label: Query RS-232 Port Device Tags
  kind: query
  command: "GET /MEDIA/CONTROL/UART/<port>.DeviceTags"
  params:
    - name: port
      type: string

# ---- 9.23 IR Port Configuration (F110/F120) ----
- id: ep_ir_set_enabled
  label: Enable/Disable IR Port
  kind: action
  command: "SET /MEDIA/CONTROL/IR/<in|out>.Enabled=<logical_value>"
  params:
    - name: in_or_out
      type: string
    - name: logical_value
      type: enum

- id: ep_ir_set_source_name
  label: Set IR Input Port Source Name
  kind: action
  command: "SET /MEDIA/CONTROL/IR/<in>.SourceName=<name>"
  params:
    - name: in
      type: string
    - name: name
      type: string

- id: ep_ir_set_destination_name
  label: Set IR Output Port Destination Name
  kind: action
  command: "SET /MEDIA/CONTROL/IR/<out>.DestinationName=<name>"
  params:
    - name: out
      type: string
    - name: name
      type: string

- id: ep_ir_set_server_port
  label: Set IR Port Command Injection Port
  kind: action
  command: "SET /MEDIA/CONTROL/IR/<in|out>.ServerPort=<port_no>"
  params:
    - name: in_or_out
      type: string
    - name: port_no
      type: integer

- id: ep_ir_set_modulation
  label: Enable/Disable IR Output Signal Modulation
  kind: action
  command: "SET /MEDIA/CONTROL/IR/<out>/PORT.EnableModulation=<logical_value>"
  params:
    - name: out
      type: string
    - name: logical_value
      type: enum

- id: ep_ir_query_tags
  label: Query IR Port Tags
  kind: query
  command: "GET /MEDIA/CONTROL/IR/<in|out>.Tags"
  params:
    - name: in_or_out
      type: string

- id: ep_ir_add_tags
  label: Add Tags to IR Port
  kind: action
  command: "CALL /MEDIA/CONTROL/IR/<in|out>:addTags(<tag>)"
  params:
    - name: in_or_out
      type: string
    - name: tag
      type: string

- id: ep_ir_remove_tags
  label: Remove Tags from IR Port
  kind: action
  command: "CALL /MEDIA/CONTROL/IR/<in|out>:removeTags(<tag>)"
  params:
    - name: in_or_out
      type: string
    - name: tag
      type: string

- id: ep_ir_remove_all_tags
  label: Remove All Tags from IR Port
  kind: action
  command: "CALL /MEDIA/CONTROL/IR/<in|out>:removeAllTags()"
  params:
    - name: in_or_out
      type: string

- id: ep_ir_query_device_tags
  label: Query IR Port Device Tags
  kind: query
  command: "GET /MEDIA/CONTROL/IR/<in|out>.DeviceTags"
  params:
    - name: in_or_out
      type: string

# ---- 9.24 Message Sending via Serial Port ----
- id: uart_send_text
  label: Send ASCII Text via RS-232
  kind: action
  command: "CALL /MEDIA/CONTROL/UART/<port>/PORT:sendText(<message>)"
  params:
    - name: port
      type: string
    - name: message
      type: string
      description: No control/non-printable characters allowed

- id: uart_send_binary
  label: Send Hex (Binary) Message via RS-232
  kind: action
  command: "CALL /MEDIA/CONTROL/UART/<port>/PORT:sendBinaryMessage(<message>)"
  params:
    - name: port
      type: string
    - name: message
      type: string
      description: Hex format, no escaping required

- id: uart_send_message
  label: Send ASCII Message via RS-232 (with escaping)
  kind: action
  command: "CALL /MEDIA/CONTROL/UART/<port>/PORT:sendMessage(<message>)"
  params:
    - name: port
      type: string
    - name: message
      type: string
      description: ASCII with optional escape sequences

- id: ir_send_pronto_hex_little_endian
  label: Send Pronto Hex (Little-endian) via IR
  kind: action
  command: "CALL /MEDIA/CONTROL/IR/<out>/PORT:sendProntoHex(<hex_code>)"
  params:
    - name: out
      type: string
    - name: hex_code
      type: string
      description: Max 765 hex chars, no spaces

- id: ir_send_pronto_hex_big_endian
  label: Send Pronto Hex (Big-endian) via IR
  kind: action
  command: "CALL /MEDIA/CONTROL/IR/<out>/PORT:sendProntoHexBigEndian(<hex_code>)"
  params:
    - name: out
      type: string
    - name: hex_code
      type: string

# ---- 9.25 USB K+M Settings (F120/F121) ----
- id: usbkm_query_source_count
  label: Query Number of Emulated USB Ports
  kind: query
  command: "GET /MEDIA/XP/KM.SourcePortCount"
  params: []

- id: usbkm_query_dest_count
  label: Query Number of Destination USB Ports
  kind: query
  command: "GET /MEDIA/XP/KM.DestinationPortCount"
  params: []

- id: usbkm_switch_one
  label: Switch USB K+M to One Destination
  kind: action
  command: "CALL /MEDIA/XP/KM:switch(<e>:<r>)"
  params:
    - name: e
      type: string
      description: Emulated (source; USB-A) port, e.g. E101
    - name: r
      type: string
      description: Receiver (destination; USB-B) port, e.g. R201

- id: usbkm_switch_all
  label: Switch USB K+M to All Destinations
  kind: action
  command: "CALL /MEDIA/XP/KM:switchAll(<e>)"
  params:
    - name: e
      type: string

- id: usbkm_switch_local
  label: Switch Local USB K+M to Local Destination
  kind: action
  command: "CALL /MEDIA/XP/KM:switch(<eN>:<rN>)"
  params:
    - name: eN
      type: string
    - name: rN
      type: string
      description: Same source and destination port number for local loopback

- id: usbkm_query_emulated_name
  label: Query Emulated USB Port Name
  kind: query
  command: "GET /MEDIA/STREAMS/KM/<e>.EmulatedName"
  params:
    - name: e
      type: string

- id: usbkm_set_emulated_name
  label: Set Emulated USB Port Name
  kind: action
  command: "SET /MEDIA/STREAMS/KM/<e>.EmulatedName=<name>"
  params:
    - name: e
      type: string
    - name: name
      type: string

- id: usbkm_query_receiver_name
  label: Query Destination USB Port Name
  kind: query
  command: "GET /MEDIA/STREAMS/KM/<r>.ReceiverName"
  params:
    - name: r
      type: string

- id: usbkm_set_receiver_name
  label: Set Destination USB Port Name
  kind: action
  command: "SET /MEDIA/STREAMS/KM/<r>.ReceiverName=<name>"
  params:
    - name: r
      type: string
    - name: name
      type: string

- id: usbkm_query_tags
  label: Query USB Port Tags
  kind: query
  command: "GET /MEDIA/STREAMS/KM/<e|r>.Tags"
  params:
    - name: e_or_r
      type: string

- id: usbkm_add_tags
  label: Add Tags to USB Port
  kind: action
  command: "CALL /MEDIA/STREAMS/KM/<e|r>:addTags(<tag>)"
  params:
    - name: e_or_r
      type: string
    - name: tag
      type: string

- id: usbkm_remove_tags
  label: Remove Tags from USB Port
  kind: action
  command: "CALL /MEDIA/STREAMS/KM/<e|r>:removeTags(<tag>)"
  params:
    - name: e_or_r
      type: string
    - name: tag
      type: string

- id: usbkm_remove_all_tags
  label: Remove All Tags from USB Port
  kind: action
  command: "CALL /MEDIA/STREAMS/KM/<e|r>:removeAllTags()"
  params:
    - name: e_or_r
      type: string

- id: usbkm_query_device_tags
  label: Query USB Port Device Tags
  kind: query
  command: "GET /MEDIA/STREAMS/KM/<e|r>.DeviceTags"
  params:
    - name: e_or_r
      type: string

# ---- 9.3.8 Subscription ----
- id: subscribe_node
  label: Subscribe to Node
  kind: action
  command: "OPEN <node>"
  params:
    - name: node
      type: string
      description: "Node path or wildcard, e.g. /MEDIA/VIDEO/*"

- id: subscribe_node_explicit
  label: Subscribe to Node (explicit root)
  kind: action
  command: "OPEN /<node>"
  params:
    - name: node
      type: string

- id: unsubscribe_node
  label: Unsubscribe from Node
  kind: action
  command: "CLOSE /<node>"
  params:
    - name: node
      type: string
```

## Feedbacks
```yaml
# Query response shapes - what a developer can expect back from GET-style commands.
- id: operation_mode_value
  type: enum
  values: [Transmitter, Receiver, Transceiver, Multiviewer]

- id: connection_status_value
  type: enum
  values: [Offline, Connecting, Online]

- id: claiming_status_value
  type: enum
  values: [Unclaiming, Initializing, Claiming, Reclaiming, Restoring, Claimed]

- id: signal_present_value
  type: enum
  values: ["0", "1"]

- id: connected_value
  type: enum
  values: ["0", "1"]

- id: signal_type_value
  type: enum
  values: ["0", "1"]
  description: "0=DVI | 1=HDMI"

- id: timing_mode_value
  type: enum
  values: [Freerun, SourceLocked]

- id: video_wall_state_value
  type: enum
  values: [Active, Inactive]

- id: analog_mute_status_value
  type: enum
  values: [nosignal, unmuted, muted, "muted (unsupported)", disrupted]

- id: tile_status_value
  type: enum
  values: [Disabled, Active, HdcpError, BandwidthError, NoInput, InvalidLayout, InvalidSize, InvalidColorFormat, Ok]

- id: sfp_compatible_value
  type: enum
  values: ["true", "false"]

# UNRESOLVED: precise response payload formats for GETALL-style bulk queries (e.g. /MEDIA/XP/VIDEO/*.*)
# are stated only as bullet-list descriptions in §9.8.4 - field ordering/encoding not fully specified.
```

## Variables
```yaml
# Settable parameters that are not discrete actions - emitted as Variable entries.
- id: device_label
  type: string
  description: MMU device label (39 chars) or endpoint device label (64 chars)
  access: read-write

- id: stream_name
  type: string
  description: Source or destination stream name (audio/video)
  access: read-write

- id: resolution_setting
  type: string
  description: Forced resolution string (e.g. 3840x2160p60)
  access: read-write

- id: resolution_mode
  type: enum
  values: [Pass, Forced, EdidBased, Tile]
  access: read-write

- id: color_space
  type: enum
  values: [Pass, RGB, "YCbCr 4:4:4", "YCbCr 4:2:2"]
  access: read-write

- id: color_range
  type: enum
  values: [Pass, Full, Limited]
  access: read-write

- id: color_depth
  type: enum
  values: [Pass, "8 bpc", "10 bpc", "12 bpc"]
  access: read-write

- id: image_position
  type: enum
  values: [Center, Stretch, Fit]
  access: read-write

- id: analog_volume_db
  type: number
  range: [-95.62, 0]
  unit: dB
  access: read-write

- id: analog_volume_percent
  type: number
  range: [0, 100]
  unit: percent
  access: read-write

- id: analog_balance
  type: integer
  range: [-100, 100]
  access: read-write

- id: analog_gain
  type: number
  range: [-12, 35]
  unit: dB
  access: read-write

- id: endpoint_baudrate
  type: enum
  values: ["0=4800", "1=7200", "2=9600", "3=14400", "4=19200", "5=38400", "6=57600", "7=115200"]
  access: read-write

- id: ethernet_mode
  type: enum
  values: ["0=AutoNeg", "1=10M_HD", "2=10M_FD", "3=100M_HD", "4=100M_FD", "5=1000M_FD"]
  access: read-write

# UNRESOLVED: full enumeration of supported scaler resolutions (Appendix §15.9) not included in the
# refined source chunk; the source cross-references "Resolutions of the Scaler" but that table was
# not present in the extracted text.
```

## Events
```yaml
# Asynchronous change notifications (§9.3.8-§9.3.9). Format mirrors GET responses but prefixed "CHG".
# Only received while subscribed via OPEN <node>.
- id: property_change_notification
  description: "Async notification; prefix 'CHG /<path>.<Property>=<value>' when a subscribed property changes."
  example: "CHG /MEDIA/XP/VIDEO.SourcePortCount=10"
```

## Macros
```yaml
# No multi-step sequences are described as named macros in the source. Sequences appear only as
# inline examples (e.g. batched CALL /MEDIA/XP/VIDEO:switch(S101:D302;S102:D102)).
# UNRESOLVED: no named macro primitives documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains operational ATTENTION notes but no formal safety interlocks or power-sequencing
# procedures. Relevant operational cautions (informational, not formal interlocks):
#   - Changing operation mode ALWAYS requires rebooting the endpoint (§9.6.4).
#   - Multiviewer mode activation requires a reboot (§6.5.1).
#   - The MMU reboot terminates control connections but does NOT interrupt AV signal transmission (§9.5.10).
#   - In bootload mode the AV signal transmission is terminated (§9.6.13).
#   - Voltage state ERROR: "power off the device immediately" (§8.18.2) - operator advisory, not a
#     programmatic interlock.
#   - The F120 on-board RS-232 port CANNOT be used to control the UBEХ matrix itself; it is for
#     third-party device control only (§6.2.1, §6.2.2).
# UNRESOLVED: no machine-readable interlock or confirmation primitives are defined by the protocol.
```

## Notes
- The F120 endpoint is one node in a UBEХ matrix supervised by an UBEХ-MMU-X200. All LW3 commands are sent to the MMU (directly or via any endpoint, which transparently forwards to the MMU). Endpoints are addressed by their UBEХ endpoint ID (`UBEX<last_6_MAC_hex>`, e.g. `UBEX0039A1`) under `/SYS/ENDPOINTS/`, and by their logical device ID (`X1`, `X2`, …) under `/MEDIA/DEVICEMAP/`. Stream IDs follow `<S|D><logical_dev><port>` (e.g. `S101`, `D202`); see §9.4.3 for the full stream-ID calculation table.
- Commands are ASCII, case-sensitive, slash-separated node paths, terminated by CrLf. Max line length 800 bytes. Method invocation uses `CALL /path:method(args)`; property read/write uses `GET /path.property` / `SET /path.property=value`. Optional 4-hex-digit signature groups multi-line responses between `{sig … }` brackets.
- Error responses use prefix `mE` with `%E###` codes (e.g. `%E004:Invalid value`). Success responses use `mO`. Property responses use `pr` (read-only) or `pw` (read-write).
- The default MMU IP is `192.168.0.100` and the LW3 TCP port is `6107` (Raw socket). Endpoints default to `192.168.0.101` (TX/TRX) and `192.168.0.102` (RX/RXMV). The F120 has 3 Ethernet ports (1000Base-T, PoE not supported).
- The F120 additionally provides: 2× HDMI 2.0 in (up to 4K60 4:4:4), 2× HDMI 2.0 out, 2× SFP+ (up to 10 Gbps), analog audio in/out (5-pole Phoenix), RS-232 (3-pole Phoenix, command-injection mode, default 57600 8N1, TCP 8001), IR in/out (3.5 mm jacks, 38 kHz), and 2× USB-A for K+M extension.
- The F120 RS-232 baud-rate index is an enum (0..7), NOT the literal baud value; `2` ⇒ 9600. Stop-bits index: 0⇒1, 1⇒1.5, 2⇒2. Parity index: 0⇒None, 1⇒Odd, 2⇒Even.
- Lightware strongly recommends running cohesive MMU + endpoint firmware versions. Several features are gated on specific minimum versions: multiviewer MMU support from MMU v2.2.0 / endpoint v3.3.1; fully operational multiviewer GUI from endpoint v3.5.1 / MMU v2.4.3; centralized firmware update from MMU v1.1.0 / endpoint v1.3.1; scaler on both TX HDMI inputs from endpoint v2.4.1; 10 bpc CSC from endpoint v3.3.0.

<!-- UNRESOLVED: firmware version compatibility ranges not exhaustively tabulated in the refined source chunk. -->
<!-- UNRESOLVED: full factory-EDID list, scaler resolution list, and bandwidth-requirements table referenced by the source were not present in the extracted/refined text. -->
<!-- UNRESOLVED: precise binary layout of GETALL bulk responses (e.g. /MEDIA/XP/VIDEO/*.*) is described only as a bullet list — field ordering/encoding for machine parsing is not fully specified. -->
<!-- UNRESOLVED: response timing, command rate limits, and connection keepalive behavior are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - assets.prod.pim.lightware.com
  - avc-group.com
  - lightware.avicon.ru
  - academy.lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/UBEX_Matrix_UserManual.pdf
  - https://www.avc-group.com/assets/products/Lightware/pdf-manuals/lightware-um-ubex_extenders.pdf
  - https://lightware.avicon.ru/files/ubex_extender_usersmanual_v1.6.pdf
  - https://academy.lightware.com/courses/lw3-protocol-tutorial
retrieved_at: 2026-08-11T00:44:50.262Z
last_checked_at: 2026-08-19T09:33:45.611Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:33:45.611Z
matched_actions: 265
action_count: 265
confidence: medium
summary: "All 265 spec actions match LW3 source wire-literals verbatim; transport fields supported. Missing source commands (§9.21, §9.26-9.28, §10) are out of F120 scope. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "§9.21.1 BAUD Rate Setting (MMU): SET/MANAGEMENT/CONTROL/SERIAL/<port>.Baudrate"
- "§9.21.2 Databits Setting (MMU): SET/MANAGEMENT/CONTROL/SERIAL/<port>.DataBits"
- "§9.21.3 Stopbits Setting (MMU): SET/MANAGEMENT/CONTROL/SERIAL/<port>.StopBits"
- "§9.21.4 Parity Setting (MMU): SET/MANAGEMENT/CONTROL/SERIAL/<port>.Parity"
- "§9.21.5 Enabling the Port (MMU): SET/MANAGEMENT/CONTROL/SERIAL/<port>.Enabled"
- "§9.26 USB KVM/USB 2.0 settings (F130-only, excluded by F120 scope)"
- "§9.27 License Handling commands (5 properties)"
- "§9.28 Centralized Firmware Update commands"
- "§10 Icron UDP protocol commands (separate protocol, 16 commands)"
- "firmware version compatibility not stated; many commands require specific firmware packages (e.g. multiviewer needs endpoint v3.5.1 + MMU v2.4.3)"
- "the source documents the MMU-side LW3 tree; per-endpoint local-only command set when MMU is offline is not described"
- "precise response payload formats for GETALL-style bulk queries (e.g. /MEDIA/XP/VIDEO/*.*)"
- "full enumeration of supported scaler resolutions (Appendix §15.9) not included in the"
- "no named macro primitives documented."
- "no machine-readable interlock or confirmation primitives are defined by the protocol."
- "firmware version compatibility ranges not exhaustively tabulated in the refined source chunk."
- "full factory-EDID list, scaler resolution list, and bandwidth-requirements table referenced by the source were not present in the extracted/refined text."
- "precise binary layout of GETALL bulk responses (e.g. /MEDIA/XP/VIDEO/*.*) is described only as a bullet list — field ordering/encoding for machine parsing is not fully specified."
- "response timing, command rate limits, and connection keepalive behavior are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
