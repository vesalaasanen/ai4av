---
spec_id: admin/lightware-ubex-pro20-hdmi-f121
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware UBEX-PRO20-HDMI-F121 Control Spec"
manufacturer: Lightware
model_family: UBEX-PRO20-HDMI-F121
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - UBEX-PRO20-HDMI-F121
    - UBEX-PRO20-HDMI-F110
    - UBEX-PRO20-HDMI-F111
    - UBEX-PRO20-HDMI-F120
    - UBEX-PRO20-HDMI-F130
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.prod.pim.lightware.com
  - academy.lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/UBEX_Matrix_UserManual.pdf
  - https://academy.lightware.com/
retrieved_at: 2026-08-11T06:35:13.542Z
last_checked_at: 2026-08-19T09:35:30.737Z
generated_at: 2026-08-19T09:35:30.737Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>.BackgroundColor"
  - "Full list of major gaps below: video-wall createGridVideoWall parameter ordering is described but full per-parameter types not fully enumerated; event/subscription specifics (CHG payload schema, CLOSE/OPEN behavior) are described but not enumerated as discrete Events; many sub-commands (PER-PORT tags, PER-DISPLAY settings) follow repeating patterns and are summarized rather than each enumerated."
  - "no source-defined macros beyond the LW3 protocol-level"
  - "firmware version compatibility matrices; full enumeration of all PER-DISPLAY and PER-PORT tag-management variants (they follow repeating patterns); full SwitchableUSB protocol message table is partially documented and was not promoted into discrete actions."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:35:30.737Z
  matched_actions: 269
  action_count: 269
  confidence: medium
  summary: "All 269 wire-literal LW3 actions map1:1 to source; transport port 6107 confirmed; ~1:1 command coverage with source. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Lightware UBEX-PRO20-HDMI-F121 Control Spec

## Summary
Lightware UBEX-PRO20-HDMI-F121 is an endpoint extender for the Lightware UBEX matrix switching / extension system, controlled over TCP using the ASCII Lightware 3 (LW3) protocol. Commands cover video and audio crosspoint switching, scaler/EDID/HDCP settings, video-wall configuration, multiviewer tile layout, endpoint management, network configuration, and RS-232/IR pass-through. The spec documents the LW3 command tree that targets the Matrix Management Unit (MMU), which in turn proxies commands to registered endpoint devices.

<!-- UNRESOLVED: Full list of major gaps below: video-wall createGridVideoWall parameter ordering is described but full per-parameter types not fully enumerated; event/subscription specifics (CHG payload schema, CLOSE/OPEN behavior) are described but not enumerated as discrete Events; many sub-commands (PER-PORT tags, PER-DISPLAY settings) follow repeating patterns and are summarized rather than each enumerated. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 6107
auth:
  type: none  # inferred: no auth procedure in source
# Default MMU IP per source: 192.168.0.100 (see 9.19.3).
# Additional TCP ports for RS-232 command injection and IR are configurable via
# SET /MEDIA/CONTROL/UART/<port>.ServerPort (default 8001) and
# SET /MEDIA/CONTROL/IR/<in|out>.ServerPort (default not stated).
```

The LW3 protocol is ASCII-based; all command/response lines are terminated with CRLF (`\r\n`). Maximum line length is 800 bytes. Names and parameters are case-sensitive; the `OPEN` / `CLOSE` commands subscribe/unsubscribe to nodes for asynchronous change notifications.

## Traits
```yaml
- powerable       # inferred: reset/softReset/reboot commands present
- routable        # inferred: video/audio crosspoint switch commands present
- queryable       # inferred: extensive GET commands returning state present
- levelable       # inferred: analog audio volume/gain/balance commands present
```

## Actions
```yaml
# ---- System (MMU) ----
- id: set_device_label_mmu
  label: Set MMU Device Label
  kind: action
  command: "SET /MANAGEMENT/LABEL.DeviceLabel={label}"
  params:
    - name: label
      type: string
      description: "Custom label, max 39 ASCII characters (longer truncated)."

- id: get_product_name_mmu
  label: Query MMU Product Name
  kind: query
  command: "GET /.ProductName"

- id: get_firmware_version_mmu
  label: Query MMU Firmware Package Version
  kind: query
  command: "GET /MANAGEMENT/UID/PACKAGE.Version"

- id: get_datetime_mmu
  label: Query MMU Date/Time
  kind: query
  command: "GET /MANAGEMENT/DATETIME.CurrentTime"

- id: set_datetime_mmu
  label: Set MMU Date/Time Manually
  kind: action
  command: "CALL /MANAGEMENT/DATETIME:setTime={iso8601}"
  params:
    - name: iso8601
      type: string
      description: "ISO 8601 date-time, e.g. 2025-12-24T20:00:15"

- id: set_ntp_server_mmu
  label: Set NTP Server Address (MMU)
  kind: action
  command: "SET /MANAGEMENT/DATETIME.NtpServerAddress={server_address}"

- id: set_ntp_enable_mmu
  label: Enable/Disable NTP (MMU)
  kind: action
  command: "SET /MANAGEMENT/DATETIME.EnableNtp={bool}"

- id: set_lcd_brightness_mmu
  label: Set MMU LCD Brightness
  kind: action
  command: "SET /SYS/CECU/LCD.Brightness={0..10}"

- id: restart_mmu
  label: Reboot the MMU
  kind: action
  command: "CALL /SYS:reset()"

- id: soft_reset_mmu
  label: Software Reset the MMU
  kind: action
  command: "CALL /SYS:softReset()"

- id: factory_defaults_mmu
  label: Restore Factory Default Settings (MMU)
  kind: action
  command: "CALL /SYS:factoryDefaults()"

# ---- Endpoint management ----
- id: set_endpoint_label
  label: Set Endpoint Device Label
  kind: action
  command: "SET /SYS/ENDPOINTS/{UBEX_EP}.DeviceLabel={label}"
  params:
    - name: UBEX_EP
      type: string
      description: "Endpoint ID, e.g. UBEX0039A1 (last 6 of MAC)."
    - name: label
      type: string
      description: "Custom label, max 64 ASCII characters."

- id: get_endpoint_product_name
  label: Query Endpoint Product Name
  kind: query
  command: "GET /SYS/ENDPOINTS/{UBEX_EP}.ProductName"

- id: get_endpoint_operation_mode
  label: Query Endpoint Operation Mode
  kind: query
  command: "GET /SYS/ENDPOINTS/{UBEX_EP}.OperationMode"

- id: set_endpoint_operation_mode
  label: Set Endpoint Operation Mode
  kind: action
  command: "SET /SYS/ENDPOINTS/{UBEX_EP}.OperationMode={Transmitter|Receiver|Transceiver|Multiviewer}"

- id: get_endpoint_mac
  label: Query Endpoint MAC Address
  kind: query
  command: "GET /SYS/ENDPOINTS/{UBEX_EP}.MacAddress"

- id: get_endpoint_firmware_version
  label: Query Endpoint Firmware Package Version
  kind: query
  command: "GET /SYS/ENDPOINTS/{UBEX_EP}.PackageVersion"

- id: identify_endpoint
  label: Identify the Endpoint
  kind: action
  command: "CALL /SYS/ENDPOINTS/{UBEX_EP}:identifyMe()"

- id: set_endpoint_control_lock
  label: Set Endpoint Control Lock (jog dial)
  kind: action
  command: "SET /SYS/ENDPOINTS/{UBEX_EP}/SETTINGS/UI.ControlLock={0|1|2}"

- id: set_endpoint_dark_mode
  label: Enable/Disable Endpoint Dark Mode
  kind: action
  command: "SET /SYS/ENDPOINTS/{UBEX_EP}/SETTINGS/UI/DARKMODE.DarkModeEnable={bool}"

- id: set_endpoint_dark_mode_delay
  label: Set Endpoint Dark Mode Delay (seconds)
  kind: action
  command: "SET /SYS/ENDPOINTS/{UBEX_EP}/SETTINGS/UI/DARKMODE.DarkModeDelay={seconds}"

- id: set_endpoint_rotary_direction
  label: Set Endpoint Rotary Direction
  kind: action
  command: "SET /SYS/ENDPOINTS/{UBEX_EP}/SETTINGS/UI.RotaryDirection={0|1}"

- id: set_endpoint_display_brightness
  label: Set Endpoint LCD Brightness
  kind: action
  command: "SET /SYS/ENDPOINTS/{UBEX_EP}/SETTINGS/UI.DisplayBrightness={0..10}"

- id: bootload_endpoint
  label: Set Endpoint to Bootload Mode
  kind: action
  command: "CALL /SYS/ENDPOINTS/{UBEX_EP}:bootload()"

- id: restart_endpoint
  label: Restart Endpoint
  kind: action
  command: "CALL /SYS/ENDPOINTS/{UBEX_EP}:reset()"

- id: factory_defaults_endpoint
  label: Restore Factory Defaults (Endpoint)
  kind: action
  command: "CALL /SYS/ENDPOINTS/{UBEX_EP}:factoryDefaults()"

- id: get_registered_endpoints
  label: Query Number of Registered Endpoints
  kind: query
  command: "GET /SYS/ENDPOINTS.RegisteredEndpoints"

- id: get_connected_endpoints
  label: Query Number of Connected Endpoints
  kind: query
  command: "GET /SYS/ENDPOINTS.ConnectedEndpoints"

- id: get_registered_tx_endpoints
  label: Query Number of Registered Transmitters
  kind: query
  command: "GET /SYS/ENDPOINTS.RegisteredTxEndpoints"

- id: get_connected_tx_endpoints
  label: Query Number of Connected Transmitters
  kind: query
  command: "GET /SYS/ENDPOINTS.ConnectedTxEndpoints"

- id: get_registered_rx_endpoints
  label: Query Number of Registered Receivers
  kind: query
  command: "GET /SYS/ENDPOINTS.RegisteredRxEndpoints"

- id: get_connected_rx_endpoints
  label: Query Number of Connected Receivers
  kind: query
  command: "GET /SYS/ENDPOINTS.ConnectedRxEndpoints"

- id: get_registered_trx_endpoints
  label: Query Number of Registered Transceivers
  kind: query
  command: "GET /SYS/ENDPOINTS.RegisteredTrxEndpoints"

- id: get_connected_trx_endpoints
  label: Query Number of Connected Transceivers
  kind: query
  command: "GET /SYS/ENDPOINTS.ConnectedTrxEndpoints"

- id: get_endpoint_connection_status
  label: Query Endpoint Connection Status
  kind: query
  command: "GET /SYS/ENDPOINTS/{UBEX_EP}.ConnectionStatus"

- id: get_endpoint_claiming_status
  label: Query Endpoint Claiming Status
  kind: query
  command: "GET /SYS/ENDPOINTS/{UBEX_EP}.ClaimingStatus"

- id: unclaim_endpoint
  label: Unclaim an Endpoint
  kind: action
  command: "CALL /SYS/ENDPOINTS:unclaimEndpoint({UBEX_EP})"

- id: unclaim_all_endpoints
  label: Unclaim All Endpoints
  kind: action
  command: "CALL /SYS/ENDPOINTS:unclaimAllEndpoint()"

- id: get_mapped_endpoint_count
  label: Query Number of Mapped Endpoints
  kind: query
  command: "GET /MEDIA/DEVICEMAP.MappedEndpointCount"

- id: get_endpoint_by_logical_id
  label: Query Endpoint ID of a Logical Device ID
  kind: query
  command: "GET /MEDIA/DEVICEMAP.{X<n>}"

- id: assign_endpoint_logical_id
  label: Assign Endpoint to Logical Device ID
  kind: action
  command: "CALL /MEDIA/DEVICEMAP:assign(X{n}:UBEX{ep};...)"

# ---- Video crosspoint ----
- id: switch_video_to_one_dest
  label: Switch Video Stream to One Destination
  kind: action
  command: "CALL /MEDIA/XP/VIDEO:switch({in}:{out})"
  params:
    - name: in
      type: string
      description: "Source stream ID, e.g. S101 (S<logical_dev_ID><stream_nr>)."
    - name: out
      type: string
      description: "Destination port ID, e.g. D101 (D<logical_device_ID><out_port_nr>)."

- id: switch_video_to_all_dest
  label: Switch Video Stream to All Destinations
  kind: action
  command: "CALL /MEDIA/XP/VIDEO:switchAll({in})"

- id: disconnect_video_dest
  label: Disconnect Stream (Set destination to 0)
  kind: action
  command: "CALL /MEDIA/XP/VIDEO:switch(0:{dest})"

- id: query_all_video_ports_status
  label: Query Status of All Video Ports
  kind: query
  command: "GET /MEDIA/XP/VIDEO/*.*"

- id: query_video_source_port_count
  label: Query Number of Source Ports (Video)
  kind: query
  command: "GET /MEDIA/XP/VIDEO.SourcePortCount"

- id: query_video_destination_port_count
  label: Query Number of Destination Ports (Video)
  kind: query
  command: "GET /MEDIA/XP/VIDEO.DestinationPortCount"

# ---- Video stream (source / input) ----
- id: query_video_source_name
  label: Query Name of Stream (Input)
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in}.SourceName"

- id: set_video_source_name
  label: Set Name of Stream (Input)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{in}.SourceName={name}"

- id: query_video_stream_tags
  label: Query Tags of Stream (Input)
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in}.Tags"

- id: add_video_stream_tags
  label: Add Tags to Stream (Input)
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/{in}:addTags({tag};...)"

- id: remove_video_stream_tags
  label: Delete Tags from Stream (Input)
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/{in}:removeTags({tag};...)"

- id: remove_all_video_stream_tags
  label: Delete All Tags from Stream (Input)
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/{in}:removeAllTags()"

- id: query_video_stream_device_tags
  label: Query All Tags of Device (Input stream)
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in}.DeviceTags"

- id: identify_video_stream
  label: Identify Stream (test colors 10s)
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/{in}/STREAM:identify()"

- id: set_video_stream_enabled
  label: Enable/Disable Stream (Input)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{in}/STREAM.Enabled={bool}"

- id: set_video_stream_resolution
  label: Resolution Setting (Input Stream)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{in}/STREAM.ResolutionSetting={resolution}"

- id: set_video_stream_resolution_mode
  label: Resolution Mode Setting (Input Stream)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{in}/STREAM.ResolutionMode={Pass|Forced|EdidBased|Tile}"

- id: set_video_stream_image_position
  label: Scaler Image Position Setting (Input Stream)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{in}/STREAM.ImagePosition={Center|Stretch|Fit}"

- id: set_video_stream_tile_resolution
  label: Tile Resolution Setting (Input)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{in}/STREAM.TileResolutionSetting={resolution}"

- id: set_video_stream_color_space
  label: Color Space Converter Setting (Input Stream)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{in}/STREAM.ColorSpaceSetting={Pass|RGB|YCbCr 4:4:4|YCbCr 4:2:2}"

- id: set_video_stream_color_range
  label: Color Range Setting (Input Stream)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{in}/STREAM.ColorRangeSetting={Pass|Full|Limited}"

- id: set_video_stream_color_depth
  label: Color Depth Setting (Input Stream)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{in}/STREAM.ColorDepthSetting={Pass|8 bpc|10 bpc|12 bpc}"

- id: query_video_stream_timing_mode
  label: Query Timing Mode (Input Stream)
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in}/STREAM.TimingMode"

- id: set_video_hdcp_input
  label: HDCP Enable/Disable (Input Port)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{in}/PORT.HdcpEnable={bool}"

# ---- Video stream (destination / output) ----
- id: query_video_dest_name
  label: Query Name of Destination
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{out}.DestinationName"

- id: set_video_dest_name
  label: Set Name of Destination
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}.DestinationName={name}"

- id: query_video_dest_tags
  label: Query Tags of Destination
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{out}.Tags"

- id: add_video_dest_tags
  label: Add Tags to Destination
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/{out}:addTags({tag};...)"

- id: remove_video_dest_tags
  label: Delete Tags of Destination
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/{out}:removeTags({tag};...)"

- id: remove_all_video_dest_tags
  label: Delete All Tags of Destination
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/{out}:removeAllTags()"

- id: query_video_dest_device_tags
  label: Query All Tags of Device (Destination)
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{out}.DeviceTags"

- id: set_video_dest_enabled
  label: Enable/Disable Stream (Destination)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/STREAM.Enabled={bool}"

- id: set_video_dest_resolution
  label: Resolution Setting (Output)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.ResolutionSetting={resolution}"

- id: set_video_dest_resolution_mode
  label: Resolution Mode Setting (Output)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.ResolutionMode={Pass|Forced|EdidBased}"

- id: query_video_dest_edid_based_resolution
  label: Query EDID-Based Resolution (Output)
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{out}/PORT.EdidBasedResolution"

- id: set_video_dest_image_position
  label: Scaler Image Position Setting (Output)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.ImagePosition={Center|Stretch|Fit}"

- id: set_video_dest_color_space
  label: Color Space Setting (Output)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.ColorSpaceSetting={Pass|RGB|YCbCr 4:4:4|YCbCr 4:2:2}"

- id: set_video_dest_color_range
  label: Color Range Setting (Output)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.ColorRangeSetting={Pass|Full|Limited}"

- id: set_video_dest_color_depth
  label: Color Depth Setting (Output)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.ColorDepthSetting={Pass|8 bpc|10 bpc|12 bpc}"

- id: query_video_dest_timing_mode
  label: Query Timing Mode (Output)
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{out}/PORT.TimingMode"

- id: set_video_dest_timing_mode
  label: Timing Mode Setting (Output)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.TimingModeSetting={Freerun|SourceLocked}"

- id: set_video_dest_no_sync_mode
  label: No Sync Screen Mode (Test Pattern, Output)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.NoSyncMode={AlwaysOff|NoSignal|AlwaysOn|Freeze}"

- id: set_video_dest_no_sync_color
  label: No Sync Screen Color (Output)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.NoSyncColor={R},{G},{B}"

- id: freeze_video_dest_signal
  label: Enable Signal Freeze (Output)
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/{out}/PORT:freezeSignal()"

- id: unfreeze_video_dest_signal
  label: Disable Signal Freeze (Output)
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/{out}/PORT:unfreezeSignal()"

- id: identify_video_display
  label: Identify Display (Output)
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/{out}/PORT:identify()"

- id: set_video_dest_hdcp_mode
  label: HDCP Mode Setting (Output)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.HdcpMode={Auto|Always|AlwaysType1}"

- id: query_video_source_mux_options
  label: Query Source MUX Options (Output)
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{out}/PORT.SourceMuxOptions"

- id: set_video_dest_source_mux
  label: Source MUX Setting (Output)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.SourceMux={D1|D2|I1|I2|O1}"

# ---- Video Wall ----
- id: create_grid_video_wall
  label: Create Video Wall (Grid)
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS:createGridVideoWall({id};{cols};{rows};{h_mm};{v_mm};{top_bezel};{bottom_bezel};{left_bezel};{right_bezel};{h_gap};{v_gap})"

- id: delete_grid_video_wall
  label: Delete Video Wall
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS:deleteGridVideoWall({VIDEOWALL<n>})"

- id: modify_video_wall_size
  label: Modify Video Wall Size
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}:modifyVideoWallSize({cols};{rows})"

- id: set_video_wall_name
  label: Set Video Wall Name
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}.Name={name}"

- id: query_video_wall_size
  label: Query Video Wall Size
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}.Size"

- id: assign_video_wall_output
  label: Assign Outputs to Video Wall
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/ASSIGNS:assignOutput({display_id}:{out};...)"

- id: unassign_video_wall_output
  label: Unassign Video Wall Output
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/ASSIGNS:unassignOutput({display_id};...)"

- id: unassign_all_video_wall_outputs
  label: Unassign All Video Wall Outputs
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/ASSIGNS:unassignAllOutput()"

- id: query_video_wall_assignment
  label: Query Video Wall Output Assignment
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/ASSIGNS/{VIDEOWALL_ID}.{display_id}"

- id: set_video_wall_background_color
  label: Set Video Wall Background Color
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/SETTINGS.BackgroundColor={R};{G};{B}"

- id: set_video_wall_timing_mode
  label: Set Video Wall Timing Mode
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/SETTINGS.TimingMode={Freerun|SourceLocked}"

- id: set_video_wall_color_space
  label: Video Wall Color Space Setting
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/SETTINGS.ColorSpaceSetting={Pass|RGB|YCbCr 4:4:4|YCbCr 4:2:2}"

- id: set_video_wall_resolution
  label: Video Wall Resolution Setting
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/SETTINGS.ResolutionSetting={resolution}"

- id: set_video_wall_resolution_mode
  label: Video Wall Resolution Mode Setting
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/SETTINGS.ResolutionMode={Pass|Forced|EdidBased}"

- id: set_video_wall_force_no_sync_screen
  label: Video Wall No Sync Screen Setting
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/SETTINGS.ForceNoSyncScreen={bool}"

- id: query_video_wall_display_params
  label: Query Display Parameters of Video Wall
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/DISPLAYS.All"

- id: set_video_wall_display_width
  label: Change Display Width (mm)
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/DISPLAYS/ALL.Width={horizontal_size}"

- id: set_video_wall_display_height
  label: Change Display Height (mm)
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/DISPLAYS/ALL.Height={vertical_size}"

- id: set_video_wall_top_bezel
  label: Change Top Bezel Size
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/DISPLAYS/ALL.TopBezelSize={mm}"

- id: set_video_wall_bottom_bezel
  label: Change Bottom Bezel Size
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/DISPLAYS/ALL.BottomBezelSize={mm}"

- id: set_video_wall_left_bezel
  label: Change Left Bezel Size
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/DISPLAYS/ALL.LeftBezelSize={mm}"

- id: set_video_wall_right_bezel
  label: Change Right Bezel Size
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/DISPLAYS/ALL.RightBezelSize={mm}"

- id: set_video_wall_horizontal_gap
  label: Change Horizontal Gap Size
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/DISPLAYS/ALL.HorizontalGapSize={mm}"

- id: set_video_wall_vertical_gap
  label: Change Vertical Gap Size
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/DISPLAYS/ALL.VerticalGapSize={mm}"

- id: query_video_wall_state
  label: Query Video Wall State
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}.State"

- id: set_video_wall_state
  label: Set Video Wall State
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}:setState({Active|Inactive})"

- id: identify_video_wall
  label: Identify the Video Wall
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}:identifyVideoWall()"

- id: create_layout
  label: Create Layout
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS:createLayout({LAYOUT<n>};{name})"

- id: delete_layout
  label: Delete Layout
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS:deleteLayout({LAYOUT<n>})"

- id: delete_all_layouts
  label: Delete All Layouts
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS:deleteAllLayout()"

- id: query_active_layout
  label: Query Active Layout
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS.activeLayout"

- id: activate_layout
  label: Activate Layout
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS.activateLayout({LAYOUT_ID})"

- id: identify_layout
  label: Identify Layout
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}:identifyLayout()"

- id: set_layout_name
  label: Set Layout Name
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}.Name={name}"

- id: create_zone
  label: Create Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}:createZone({ZONE<n>};{display_id};...)"

- id: delete_zone
  label: Delete Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}:deleteZone({ZONE_ID})"

- id: delete_all_zones
  label: Delete All Zones
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}:deleteAllZone()"

- id: set_zone_name
  label: Set Zone Name
  kind: action
  command: "SET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}/{ZONE_ID}.Name={name}"

- id: query_zone_size
  label: Query Zone Size
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}/{ZONE_ID}.ZoneSize"

- id: identify_zone
  label: Identify Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}/{ZONE_ID}:identifyZone()"

- id: assign_display_to_zone
  label: Assign Display to Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}/{ZONE_ID}:assignDisplay({display_id};...)"

- id: unassign_display_from_zone
  label: Unassign Display from Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}/{ZONE_ID}:unassignDisplay({display_id};...)"

- id: unassign_all_displays_from_zone
  label: Unassign All Displays from Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}/{ZONE_ID}:unassignAllDisplay()"

- id: query_zone_tags
  label: Query Tags of Zone
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}/{ZONE_ID}.Tags"

- id: add_zone_tags
  label: Add Tags to Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}/{ZONE_ID}:addTags({tag};...)"

- id: remove_zone_tags
  label: Delete Tags of Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}/{ZONE_ID}:removeTags({tag};...)"

- id: remove_all_zone_tags
  label: Delete All Tags of Zone
  kind: action
  command: "CALL /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}/{ZONE_ID}:removeAllTags()"

- id: query_zone_static_tags
  label: Query Static Tags of Zone
  kind: query
  command: "GET /MEDIA/VIDEOWALLS/{VIDEOWALL_ID}/LAYOUTS/{LAYOUT_ID}/{ZONE_ID}.StaticTags"

- id: switch_video_to_zone
  label: Switch Video Stream to Video Wall Zone
  kind: action
  command: "CALL /MEDIA/XP/VIDEO:switch({in}:{ZONE_ID};...)"

# ---- Multiviewer (F130 / RXMV) ----
- id: set_mv_canvas_resolution
  label: Set Resolution of the Canvas
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.ResolutionSetting={resolution}"

- id: set_mv_tile_enabled
  label: Enable/Disable Tile (T1..T4)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT/{T1|T2|T3|T4}.Enabled={bool}"

- id: set_mv_tile_position
  label: Set Tile Position
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT/{T1|T2|T3|T4}.Position={h_pixels},{v_pixels}"

- id: set_mv_tile_size
  label: Set Tile Size
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT/{T1|T2|T3|T4}.Size={h_pixels}x{v_pixels}"

- id: set_mv_layer_order
  label: Set Multiviewer Layer Order
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.LayerOrder={tile_id};{tile_id};{tile_id};{tile_id}"

- id: set_mv_tile_opacity
  label: Set Tile Opacity (percent)
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT/{T1|T2|T3|T4}.Opacity={percent}"

- id: set_mv_color_depth
  label: Multiviewer Color Depth Setting
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.ColorDepthSetting={Pass|8 bpc|10 bpc|12 bpc}"

- id: query_mv_tile_status
  label: Query Status of Tile
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{out}/PORT/{T1|T2|T3|T4}.Status"

- id: set_mv_no_sync_mode
  label: Multiviewer No Sync Screen Mode
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.NoSyncMode={AlwaysOff|NoSignal|AlwaysOn|Freeze}"

- id: set_mv_no_sync_color
  label: Multiviewer No Sync Screen Color
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.NoSyncColor={R},{G},{B}"

- id: identify_mv_display
  label: Multiviewer Identify Display
  kind: action
  command: "CALL /MEDIA/STREAMS/VIDEO/{out}/PORT:identify()"

- id: set_mv_hdcp_mode
  label: Multiviewer HDCP Mode
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.HdcpMode={Auto|Always|AlwaysType1}"

- id: query_mv_source_mux_options
  label: Multiviewer Query Source MUX Options
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{out}/PORT.SourceMuxOptions"

- id: set_mv_source_mux
  label: Multiviewer Source MUX Setting
  kind: action
  command: "SET /MEDIA/STREAMS/VIDEO/{out}/PORT.SourceMux={MV1|D5|I1|I2|O1}"

# ---- Audio crosspoint ----
- id: query_all_audio_ports_status
  label: Query Status of All Audio Ports
  kind: query
  command: "GET /MEDIA/XP/AUDIO/*.*"

- id: switch_audio_to_one_dest
  label: Switch Audio Stream to One Destination
  kind: action
  command: "CALL /MEDIA/XP/AUDIO:switch({in}:{out})"

- id: switch_audio_to_all_dest
  label: Switch Audio Stream to All Destinations
  kind: action
  command: "CALL /MEDIA/XP/AUDIO:switchAll({in})"

- id: query_audio_source_port_count
  label: Query Number of Source Ports (Audio)
  kind: query
  command: "GET /MEDIA/XP/AUDIO.SourcePortCount"

- id: query_audio_destination_port_count
  label: Query Number of Destination Ports (Audio)
  kind: query
  command: "GET /MEDIA/XP/AUDIO.DestinationPortCount"

# ---- Audio stream ----
- id: set_audio_source_enabled
  label: Enable/Disable Audio Stream Source
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/{in}/STREAM.Enabled={bool}"

- id: set_audio_dest_enabled
  label: Enable/Disable Audio Stream Destination
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/{out}/STREAM.Enabled={bool}"

- id: query_audio_source_name
  label: Query Audio Stream Name
  kind: query
  command: "GET /MEDIA/STREAMS/AUDIO/{in}.SourceName"

- id: set_audio_source_name
  label: Set Audio Stream Name
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/{in}.SourceName={name}"

- id: query_audio_dest_name
  label: Query Audio Destination Name
  kind: query
  command: "GET /MEDIA/STREAMS/AUDIO/{out}.DestinationName"

- id: set_audio_dest_name
  label: Set Audio Destination Name
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/{out}.DestinationName={name}"

- id: query_audio_stream_tags
  label: Query Tags of Audio Stream/Destination
  kind: query
  command: "GET /MEDIA/STREAMS/AUDIO/{in|out}.Tags"

- id: add_audio_stream_tags
  label: Add Tags to Audio Stream/Destination
  kind: action
  command: "CALL /MEDIA/STREAMS/AUDIO/{in|out}:addTags({tag};...)"

- id: remove_audio_stream_tags
  label: Delete Tags of Audio Stream/Destination
  kind: action
  command: "CALL /MEDIA/STREAMS/AUDIO/{in|out}:removeTags({tag};...)"

- id: remove_all_audio_stream_tags
  label: Delete All Tags of Audio Stream/Destination
  kind: action
  command: "CALL /MEDIA/STREAMS/AUDIO/{in|out}:removeAllTags()"

- id: query_audio_device_tags
  label: Query All Tags of Device (Audio Stream)
  kind: query
  command: "GET /MEDIA/STREAMS/AUDIO/{in|out}.DeviceTags"

# ---- Analog audio (F110/F111/F120/F121/F130 only) ----
- id: set_audio_volume_db
  label: Set Analog Audio Volume (dB)
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/{in|out}/PORT.VolumedB={-95.62..0}"

- id: set_audio_volume_percent
  label: Set Analog Audio Volume (Percent)
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/{in|out}/PORT.VolumePercent={0..100}"

- id: set_audio_balance
  label: Set Analog Audio Balance
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/{in|out}/PORT.Balance={-100..100}"

- id: set_audio_gain_input
  label: Set Analog Audio Gain (Input)
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/{in}/PORT.Gain={-12..35}"

- id: set_audio_mute_output
  label: Mute/Unmute Analog Audio Output Port
  kind: action
  command: "SET /MEDIA/STREAMS/AUDIO/{out}/PORT.Mute={bool}"

- id: query_audio_mute_status
  label: Query Analog Audio Output Mute Status
  kind: query
  command: "GET /MEDIA/STREAMS/AUDIO/{out}/PORT.MuteStatus"

# ---- EDID ----
- id: query_edid_dynamic_validity
  label: Query Validity of Dynamic EDID
  kind: query
  command: "GET /MEDIA/EDID/D/{D<n>}.Validity"

- id: query_edid_preferred_resolution
  label: Query Preferred Resolution of an EDID
  kind: query
  command: "GET /MEDIA/EDID/{U|F|D|E}/{memory}.PreferredResolution"

- id: emulate_edid_input
  label: Emulate EDID on Input Port
  kind: action
  command: "CALL /MEDIA/EDID:switch({user|factory|dynamic}:{emulated};...)"

- id: emulate_edid_all_inputs
  label: Emulate EDID on All Input Ports
  kind: action
  command: "CALL /MEDIA/EDID:switchAll({user|factory|dynamic})"

- id: copy_edid_to_user
  label: Copy EDID to User Memory
  kind: action
  command: "CALL /MEDIA/EDID:copy({src}:{user};...)"

- id: delete_edid_user_memory
  label: Delete EDID from User Memory
  kind: action
  command: "CALL /MEDIA/EDID:delete({user})"

- id: reset_emulated_edids
  label: Reset Emulated EDIDs (Factory Defaults)
  kind: action
  command: "CALL /MEDIA/EDID:reset()"

# ---- System Monitoring ----
- id: query_port_connected
  label: Query Connected Device Presence on Port
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in|out}/PORT.Connected"

- id: query_port_signal_present
  label: Query Video Signal Presence on Port
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in|out}/PORT.SignalPresent"

- id: query_stream_signal_present
  label: Query Video Signal Presence in Stream
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in|out}/STREAM.SignalPresent"

- id: query_stream_embedded_audio
  label: Query Embedded Audio Presence
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in|out}/STREAM.EmbeddedAudioPresent"

- id: query_stream_signal_type
  label: Query Signal Type
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in|out}/STREAM.SignalType"

- id: query_source_original_resolution
  label: Query Original Resolution of Stream Source
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in}/PORT.Resolution"

- id: query_source_modified_resolution
  label: Query Modified Resolution of Stream Source
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in}/STREAM.Resolution"

- id: query_dest_original_resolution
  label: Query Original Resolution of Stream Destination
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{out}/STREAM.Resolution"

- id: query_dest_modified_resolution
  label: Query Modified Resolution of Stream Destination
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{out}/PORT.Resolution"

- id: query_stream_bandwidth
  label: Query Bandwidth of the Stream (Gbps)
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in|out}/STREAM.Bandwidth"

- id: query_dest_control_module
  label: Query Control Module of Stream Destination
  kind: query
  command: "GET /MEDIA/XP/VIDEO/{out}/.OwnedBy"

- id: query_bandwidth_limit_exceeded
  label: Query Bandwidth Limit Exceeded Indicator
  kind: query
  command: "GET /MEDIA/STREAMS/VIDEO/{in|out}/STREAM.BandwidthLimitExceeded"

# ---- Endpoint status (SFP+, link, health) ----
- id: query_endpoint_health
  label: Query Health Status of Selected Endpoint
  kind: query
  command: "GETALL /SYS/ENDPOINTS/{UBEX_EP}/STATUS/HEALTH"

- id: query_endpoint_link_status
  label: Query Link Status of Selected Endpoint
  kind: query
  command: "GETALL /SYS/ENDPOINTS/{UBEX_EP}/STATUS/UPLINK/{LINK<n>}"

- id: query_sfp_vendor
  label: Query SFP+ Module Vendor
  kind: query
  command: "GET /SYS/ENDPOINTS/{UBEX_EP}/STATUS/UPLINK/{LINK<n>}/SFP.VendorName"

- id: query_sfp_part_number
  label: Query SFP+ Module Part Number
  kind: query
  command: "GET /SYS/ENDPOINTS/{UBEX_EP}/STATUS/UPLINK/{LINK<n>}/SFP.PartNumber"

- id: query_sfp_compliance
  label: Query SFP+ Module Compliance
  kind: query
  command: "GET /SYS/ENDPOINTS/{UBEX_EP}/STATUS/UPLINK/{LINK<n>}/SFP.Compliance"

- id: query_sfp_max_link_length
  label: Query SFP+ Module Max Cable Length (m)
  kind: query
  command: "GET /SYS/ENDPOINTS/{UBEX_EP}/STATUS/UPLINK/{LINK<n>}/SFP.MaxLinkLength"

- id: query_sfp_type
  label: Query SFP+ Module Type
  kind: query
  command: "GET /SYS/ENDPOINTS/{UBEX_EP}/STATUS/UPLINK/{LINK<n>}/SFP.Type"

- id: query_sfp_compatible
  label: Query SFP+ Module Compatibility
  kind: query
  command: "GET /SYS/ENDPOINTS/{UBEX_EP}/STATUS/UPLINK/{LINK<n>}/SFP.Compatible"

# ---- Network Configuration (MMU) ----
- id: query_dhcp_state
  label: Query DHCP State (MMU)
  kind: query
  command: "GET /MANAGEMENT/NETWORK.DhcpEnabled"

- id: set_dhcp_state
  label: Change DHCP State (MMU)
  kind: action
  command: "SET /MANAGEMENT/NETWORK.DhcpEnabled={bool}"

- id: query_mmu_ip_address
  label: Query MMU IP Address
  kind: query
  command: "GET /MANAGEMENT/NETWORK.IpAddress"

- id: set_mmu_static_ip
  label: Change MMU Static IP Address
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticIpAddress={ip}"

- id: query_mmu_subnet_mask
  label: Query MMU Subnet Mask
  kind: query
  command: "GET /MANAGEMENT/NETWORK.NetworkMask"

- id: set_mmu_static_subnet
  label: Change MMU Static Subnet Mask
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticNetworkMask={netmask}"

- id: query_mmu_gateway
  label: Query MMU Gateway Address
  kind: query
  command: "GET /MANAGEMENT/NETWORK.GatewayAddress"

- id: set_mmu_static_gateway
  label: Change MMU Static Gateway Address
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticGatewayAddress={gateway}"

- id: apply_network_settings
  label: Apply Network Settings (MMU)
  kind: action
  command: "CALL /MANAGEMENT/NETWORK:ApplySettings()"

# ---- Ethernet Port (Endpoint) ----
- id: enable_ethernet_port
  label: Enable Ethernet Port (Endpoint)
  kind: action
  command: "SET /MEDIA/CONTROL/ETHERNET/{port}/PORT.Enabled={bool}"

- id: set_ethernet_port_mode
  label: Set Ethernet Port Mode (Endpoint)
  kind: action
  command: "SET /MEDIA/CONTROL/ETHERNET/{port}/PORT.Mode={0|1|2|3|4|5}"

- id: set_ethernet_port_name
  label: Set Ethernet Port Name (Endpoint)
  kind: action
  command: "SET /MEDIA/CONTROL/ETHERNET/{port}.Name={name}"

- id: query_ethernet_port_tags
  label: Query Ethernet Port Tags (Endpoint)
  kind: query
  command: "GET /MEDIA/CONTROL/ETHERNET/{port}.Tags"

- id: add_ethernet_port_tags
  label: Add Ethernet Port Tags (Endpoint)
  kind: action
  command: "CALL /MEDIA/CONTROL/ETHERNET/{port}:addTags({tag};...)"

- id: remove_ethernet_port_tags
  label: Delete Ethernet Port Tags (Endpoint)
  kind: action
  command: "CALL /MEDIA/CONTROL/ETHERNET/{port}:removeTags({tag};...)"

- id: remove_all_ethernet_port_tags
  label: Delete All Ethernet Port Tags (Endpoint)
  kind: action
  command: "CALL /MEDIA/CONTROL/ETHERNET/{port}:removeAllTags()"

- id: query_ethernet_device_tags
  label: Query All Ethernet Device Tags (Endpoint)
  kind: query
  command: "GET /MEDIA/CONTROL/ETHERNET/{port}.DeviceTags"

# ---- Serial Port (MMU) ----
- id: set_mmu_serial_baud
  label: Set MMU Serial Baud Rate
  kind: action
  command: "SET /MANAGEMENT/CONTROL/SERIAL/{port}.Baudrate={0|200|300|600|1200|1800|2400|4800|9600|19200|38400|57600|115200}"

- id: set_mmu_serial_databits
  label: Set MMU Serial Data Bits
  kind: action
  command: "SET /MANAGEMENT/CONTROL/SERIAL/{port}.DataBits={7|8}"

- id: set_mmu_serial_stopbits
  label: Set MMU Serial Stop Bits
  kind: action
  command: "SET /MANAGEMENT/CONTROL/SERIAL/{port}.StopBits={1|2}"

- id: set_mmu_serial_parity
  label: Set MMU Serial Parity
  kind: action
  command: "SET /MANAGEMENT/CONTROL/SERIAL/{port}.Parity={None|Odd|Even|Mark|Space}"

- id: enable_mmu_serial_port
  label: Enable MMU Serial Port
  kind: action
  command: "SET /MANAGEMENT/CONTROL/SERIAL/{port}.Enabled={bool}"

# ---- Serial / RS-232 Port (Endpoint, F110/F111/F120/F121/F130 only) ----
- id: set_endpoint_serial_baud
  label: Set Endpoint RS-232 Baud Rate
  kind: action
  command: "SET /MEDIA/CONTROL/UART/{port}/PORT.Baudrate={0..7}"
  # 0=4800, 1=7200, 2=9600, 3=14400, 4=19200, 5=38400, 6=57600, 7=115200

- id: set_endpoint_serial_stopbits
  label: Set Endpoint RS-232 Stop Bits
  kind: action
  command: "SET /MEDIA/CONTROL/UART/{port}/PORT.StopBits={0|1|2}"
  # 0=1, 1=1.5, 2=2

- id: set_endpoint_serial_parity
  label: Set Endpoint RS-232 Parity
  kind: action
  command: "SET /MEDIA/CONTROL/UART/{port}/PORT.Parity={0|1|2}"
  # 0=None, 1=Odd, 2=Even

- id: remap_endpoint_uart_tcp_ports
  label: Remap Command Injection TCP Ports (Endpoint RS-232)
  kind: action
  command: "CALL /MEDIA/CONTROL/UART:remapPorts({start_number})"
  # Default command injection TCP port is 8001; remap uses ascending integers.

- id: query_endpoint_uart_config
  label: Query Endpoint RS-232 Configuration
  kind: query
  command: "GET /MEDIA/CONTROL/UART/{port}.Rs232Configuration"

- id: set_endpoint_uart_server_port
  label: Set Endpoint RS-232 Command Injection TCP Port
  kind: action
  command: "SET /MEDIA/CONTROL/UART/{port}.ServerPort={port}"

- id: enable_endpoint_uart
  label: Enable Endpoint RS-232 Port
  kind: action
  command: "SET /MEDIA/CONTROL/UART/{port}.Enable={bool}"

- id: set_endpoint_uart_name
  label: Set Endpoint RS-232 Port Name
  kind: action
  command: "SET /MEDIA/CONTROL/UART/{port}.Name={name}"

- id: query_endpoint_uart_tags
  label: Query Endpoint RS-232 Port Tags
  kind: query
  command: "GET /MEDIA/CONTROL/UART/{port}.Tags"

- id: add_endpoint_uart_tags
  label: Add Endpoint RS-232 Port Tags
  kind: action
  command: "CALL /MEDIA/CONTROL/UART/{port}:addTags({tag};...)"

- id: remove_endpoint_uart_tags
  label: Delete Endpoint RS-232 Port Tags
  kind: action
  command: "CALL /MEDIA/CONTROL/UART/{port}:removeTags({tag};...)"

- id: remove_all_endpoint_uart_tags
  label: Delete All Endpoint RS-232 Port Tags
  kind: action
  command: "CALL /MEDIA/CONTROL/UART/{port}:removeAllTags()"

- id: query_endpoint_uart_device_tags
  label: Query All Endpoint RS-232 Device Tags
  kind: query
  command: "GET /MEDIA/CONTROL/UART/{port}.DeviceTags"

- id: send_uart_text_ascii
  label: Send ASCII Text via RS-232 (no control chars)
  kind: action
  command: "CALL /MEDIA/CONTROL/UART/{port}/PORT:sendText({message})"

- id: send_uart_binary_hex
  label: Send Binary Message (Hex) via RS-232
  kind: action
  command: "CALL /MEDIA/CONTROL/UART/{port}/PORT:sendBinaryMessage({hex})"

- id: send_uart_message_escaped
  label: Send Message (ASCII, escaped) via RS-232
  kind: action
  command: "CALL /MEDIA/CONTROL/UART/{port}/PORT:sendMessage({message})"
  # Use \x0d\x0a for CRLF escapes.

# ---- IR Port (Endpoint, F110/F120 only) ----
- id: enable_endpoint_ir_port
  label: Enable/Disable IR Port (Endpoint)
  kind: action
  command: "SET /MEDIA/CONTROL/IR/{in|out}.Enabled={bool}"

- id: set_endpoint_ir_source_name
  label: Set IR Input Port Source Name
  kind: action
  command: "SET /MEDIA/CONTROL/IR/{in}.SourceName={name}"

- id: set_endpoint_ir_dest_name
  label: Set IR Output Port Destination Name
  kind: action
  command: "SET /MEDIA/CONTROL/IR/{out}.DestinationName={name}"

- id: set_endpoint_ir_command_injection_port
  label: Set IR Command Injection Port
  kind: action
  command: "SET /MEDIA/CONTROL/IR/{in|out}.ServerPort={port_no}"
  # Note: source uses property "CommandInjectionPort" in example with value 9001; canonical property is ServerPort.

- id: set_endpoint_ir_modulation
  label: Enable/Disable IR Output Signal Modulation
  kind: action
  command: "SET /MEDIA/CONTROL/IR/{out}/PORT.EnableModulation={bool}"

- id: query_endpoint_ir_tags
  label: Query IR Port Tags
  kind: query
  command: "GET /MEDIA/CONTROL/IR/{in|out}.Tags"

- id: add_endpoint_ir_tags
  label: Add IR Port Tags
  kind: action
  command: "CALL /MEDIA/CONTROL/IR/{in|out}:addTags({tag};...)"

- id: remove_endpoint_ir_tags
  label: Delete IR Port Tags
  kind: action
  command: "CALL /MEDIA/CONTROL/IR/{in|out}:removeTags({tag};...)"

- id: remove_all_endpoint_ir_tags
  label: Delete All IR Port Tags
  kind: action
  command: "CALL /MEDIA/CONTROL/IR/{in|out}:removeAllTags()"

- id: query_endpoint_ir_device_tags
  label: Query All IR Device Tags
  kind: query
  command: "GET /MEDIA/CONTROL/IR/{in|out}.DeviceTags"

- id: send_ir_pronto_hex_little_endian
  label: Send Pronto Hex (Little-endian) via IR
  kind: action
  command: "CALL /MEDIA/CONTROL/IR/{out}/PORT:sendProntoHex({hex_code})"

- id: send_ir_pronto_hex_big_endian
  label: Send Pronto Hex (Big-endian) via IR
  kind: action
  command: "CALL /MEDIA/CONTROL/IR/{out}/PORT:sendProntoHexBigEndian({hex_code})"

# ---- USB K+M (F120/F121) ----
- id: query_kvm_source_port_count
  label: Query Number of Emulated USB K+M Ports
  kind: query
  command: "GET /MEDIA/XP/KM.SourcePortCount"

- id: query_kvm_dest_port_count
  label: Query Number of Destination USB K+M Ports
  kind: query
  command: "GET /MEDIA/XP/KM.DestinationPortCount"

- id: switch_kvm_one_dest
  label: Switch Emulated K+M Port to One Destination
  kind: action
  command: "CALL /MEDIA/XP/KM:switch({E<n>}:{R<n>})"

- id: switch_kvm_all_dest
  label: Switch Emulated K+M Port to All Destinations
  kind: action
  command: "CALL /MEDIA/XP/KM:switchAll({E<n>})"

- id: switch_kvm_local
  label: Switch Local Emulated K+M to Local Destination
  kind: action
  command: "CALL /MEDIA/XP/KM:switch({E<n>}:{R<n>})"

- id: query_kvm_emulated_name
  label: Query Name of Emulated USB Port
  kind: query
  command: "GET /MEDIA/STREAMS/KM/{E<n>}.EmulatedName"

- id: set_kvm_emulated_name
  label: Set Name of Emulated USB Port
  kind: action
  command: "SET /MEDIA/STREAMS/KM/{E<n>}.EmulatedName={name}"

- id: query_kvm_receiver_name
  label: Query Name of Destination USB Port
  kind: query
  command: "GET /MEDIA/STREAMS/KM/{R<n>}.ReceiverName"

- id: set_kvm_receiver_name
  label: Set Name of Destination USB Port
  kind: action
  command: "SET /MEDIA/STREAMS/KM/{R<n>}.ReceiverName={name}"

- id: query_kvm_tags
  label: Query K+M USB Port Tags
  kind: query
  command: "GET /MEDIA/STREAMS/KM/{E<n>|R<n>}.Tags"

- id: add_kvm_tags
  label: Add K+M USB Port Tags
  kind: action
  command: "CALL /MEDIA/STREAMS/KM/{E<n>|R<n>}:addTags({tag};...)"

- id: remove_kvm_tags
  label: Delete K+M USB Port Tags
  kind: action
  command: "CALL /MEDIA/STREAMS/KM/{E<n>|R<n>}:removeTags({tag};...)"

- id: remove_all_kvm_tags
  label: Delete All K+M USB Port Tags
  kind: action
  command: "CALL /MEDIA/STREAMS/KM/{E<n>|R<n>}:removeAllTags()"

- id: query_kvm_device_tags
  label: Query All K+M USB Device Tags
  kind: query
  command: "GET /MEDIA/STREAMS/KM/{E<n>|R<n>}.DeviceTags"

# ---- USB KVM / USB 2.0 (F130 only) ----
- id: set_icron_operation_mode
  label: Set Icron USB 2.0 Module Operation Mode (F130)
  kind: action
  command: "SET /MEDIA/DEVICEMAP/{X<n>}/SETTINGS/ICRON.OperationMode={Local|Remote|Disabled}"

- id: set_icron_traffic_direction
  label: Set Icron Traffic Direction (F130)
  kind: action
  command: "SET /MEDIA/DEVICEMAP/{X<n>}/SETTINGS/ICRON.TrafficDirection={UserEthernet|UbexLink|Both}"

- id: query_icron_mac_address
  label: Query Icron Module MAC Address (F130)
  kind: query
  command: "GET /MEDIA/DEVICEMAP/{X<n>}/SETTINGS/ICRON.MacAddress"
```

## Feedbacks
```yaml
- id: mmu_datetime
  type: string
  description: "Current MMU date/time in ISO 8601 format (YYYY-MM-DDTHH:MM:SS)."
  example: "2024-09-30T06:23:37"

- id: mmu_serial_number
  type: string
  description: "Read-only MMU serial number property (e.g. 87654321)."

- id: mmu_dhcp_enabled
  type: enum
  values: [true, false]

- id: mmu_ip_address
  type: string
  description: "MMU IP address (e.g. 192.168.0.100)."

- id: endpoint_connection_status
  type: enum
  values: [Offline, Connecting, Online]

- id: endpoint_claiming_status
  type: enum
  values: [Unclaiming, Initializing, Claiming, Reclaiming, Restoring, Claimed]

- id: endpoint_operation_mode
  type: enum
  values: [Transmitter, Receiver, Transceiver, Multiviewer]

- id: endpoint_mac_address
  type: string
  example: "A8:D2:36:00:39:DA"

- id: endpoint_package_version
  type: string
  example: "v3.4.0b7"

- id: endpoint_control_lock
  type: enum
  values: [0, 1, 2]
  description: "0=unlocked, 1=locked, 2=ForceLocked."

- id: endpoint_dark_mode
  type: enum
  values: [true, false]

- id: endpoint_rotary_direction
  type: enum
  values: [0, 1]
  description: "0=CW, 1=CCW."

- id: video_signal_type
  type: enum
  values: [0, 1]
  description: "0=DVI, 1=HDMI."

- id: video_signal_present
  type: enum
  values: [0, 1]

- id: video_connected
  type: enum
  values: [0, 1]

- id: video_embedded_audio_present
  type: enum
  values: [0, 1]

- id: video_resolution
  type: string
  description: "Reported resolution, e.g. 3840x2160p60, 1600x1200p60, 4096x2160p60.00Hz."

- id: video_timing_mode
  type: enum
  values: [Freerun, SourceLocked]

- id: video_resolution_mode
  type: enum
  values: [Pass, Forced, EdidBased, Tile]

- id: video_color_space
  type: enum
  values: [Pass, RGB, "YCbCr 4:4:4", "YCbCr 4:2:2"]

- id: video_color_range
  type: enum
  values: [Pass, Full, Limited]

- id: video_color_depth
  type: enum
  values: [Pass, "8 bpc", "10 bpc", "12 bpc"]

- id: video_image_position
  type: enum
  values: [Center, Stretch, Fit]

- id: hdcp_mode
  type: enum
  values: [Auto, Always, AlwaysType1]

- id: hdcp_enable
  type: enum
  values: [true, false]

- id: no_sync_mode
  type: enum
  values: [AlwaysOff, NoSignal, AlwaysOn, Freeze]

- id: video_wall_state
  type: enum
  values: [Active, Inactive]

- id: video_wall_size
  type: string
  example: "5x3"

- id: zone_size
  type: string
  example: "1x3"

- id: video_bandwidth_gbps
  type: number
  example: 13.15
  description: "Required Ethernet bandwidth in Gigabit/sec."

- id: bandwidth_limit_exceeded
  type: enum
  values: [true, false]

- id: endpoint_owned_by
  type: enum
  values: [Crosspoint, Videowall<n>]
  description: "Which control module owns the destination output port."

- id: multiviewer_tile_status
  type: enum
  values: [Disabled, HdcpError, BandwidthError, NoInput, InvalidLayout, InvalidSize, InvalidColorFormat, Ok]

- id: source_mux_options
  type: string
  description: "Semicolon-separated source options, e.g. D2;I2;O1 or I2;O1."

- id: analog_audio_mute_status
  type: enum
  values: [nosignal, unmuted, muted, "muted (unsupported)", disrupted]

- id: health_overall_state
  type: string
  example: "OK"

- id: link_state
  type: enum
  values: [Up, Down]
```

## Variables
```yaml
- id: analog_volume_db
  type: number
  range: [-95.62, 0]
  description: "Analog audio volume (attenuation) in dB."

- id: analog_volume_percent
  type: number
  range: [0, 100]

- id: analog_balance
  type: integer
  range: [-100, 100]
  step: 1

- id: analog_input_gain_db
  type: number
  range: [-12, 35]
```

## Events
```yaml
- id: property_change_notification
  type: notification
  description: >
    When a node is OPEN-subscribed and any of its properties change, the device
    emits an unsolicited CHG message of the form:
    "CHG /<path>.<property>=<value>".
    Subscriptions are connection-scoped and are torn down when the connection
    closes. Subscriptions are opened with `OPEN /<path>` and closed with
    `CLOSE /<path>` (or `OPEN`/`CLOSE` alone to subscribe/unsubscribe the root).
```

## Macros
```yaml
# The source describes named, repeated command sequences only at the firmware
# update level. No multi-step user-defined macros are documented.
# UNRESOLVED: no source-defined macros beyond the LW3 protocol-level
# subscription / property-change flow.
```

## Safety
```yaml
confirmation_required_for:
  - factory_defaults  # /SYS:factoryDefaults() and /SYS/ENDPOINTS/<UBEX_EP>:factoryDefaults() terminate connections and restart devices
  - factory_defaults_endpoint  # per-endpoint factory defaults
  - bootload           # /SYS/ENDPOINTS/<UBEX_EP>:bootload() terminates AV transmission
  - reset_endpoint     # /SYS/ENDPOINTS/<UBEX_EP>:reset() terminates connection and signal
  - remap_uart_ports   # /MEDIA/CONTROL/UART:remapPorts() reassigns all RS-232 command-injection TCP ports
  - icron_reset        # Icron /Using DHCP /Using Static IP may reset network interface
interlocks:
  - "VIDEO/XP/VIDEO:switch - I1/I2 or O1 source MUX settings can be overridden by an incoming stream with higher priority; disable the unused destination to enforce (per 9.10.25)."
  - "Bootload mode (per endpoint): AV signal transmission is terminated until normal mode is restored."
  - "Multiviewer mode requires MMU firmware v2.2.0+ and endpoint firmware v3.3.1+ (per 9.12)."
  - "Scaler functions on TRX HDMI-in-2 / TX HDMI-in ports require specific minimum firmware versions (v2.1.0 / v2.4.1) - see 9.9.12 and 9.10.12."
  - "USB KVM / USB 2.0 transmission reserves 2 Gbps even in LEX/REX modes - disables mode frees the bandwidth (per 9.26.1)."
```

## Notes
- The Lightware 3 (LW3) protocol is ASCII, CRLF-terminated, case-sensitive. Every command line is `cmd /path[:method](params)` terminated by CrLf; max 800 bytes per line. Subscriptions (OPEN / CLOSE) deliver unsolicited CHG messages when subscribed properties change.
- LW3 commands target the Matrix Management Unit (MMU); endpoints (transmitters, receivers, transceivers, multiviewers) are reachable only via the MMU's LW3 tree under `/SYS/ENDPOINTS/<UBEX_EP>`.
- Endpoint addressing: `<UBEX_EP>` is `UBEX` + last 6 hex chars of MAC, e.g. `UBEX0039A1`. Stream IDs follow `<Port_type><Logical_device_ID><Port_number>` (e.g. `S101`, `D202`).
- Endpoint firmware package version reported in examples: `v2.3.0b12` (MMU) / `v3.4.0b7` (endpoint). Firmware version compatibility is model-dependent and not fully enumerated in the source.
- `compatible_with.models` lists the related F1xx series endpoints that share the same protocol tree (differences called out in the source are tagged "DIFFERENCE"). Models F100/F110/F111/F120/F121/F130 share substantial portions of the LW3 tree; F121 specifically adds USB K+M (per 9.25).
- Per-port analog audio (volume dB, volume %, balance, gain, mute) is available only on endpoint models `UBEX-PRO20-HDMI-F110, -F111, -F120, -F121 and -F130` (per 9.15).
- Per-endpoint RS-232 / IR control ports exist only on `UBEX-PRO20-HDMI-F110, -F111, -F120, -F121 and -F130` (RS-232) and `UBEX-PRO20-HDMI-F110, -F120` (IR) (per 9.22/9.23).
- Multiviewer mode requires MMU firmware ≥ v2.2.0 with endpoint firmware ≥ v3.3.1 (per 9.12).
- Default TCP port for LW3 is 6107. The default command-injection TCP port for RS-232 is 8001 and can be remapped with `remapPorts(start_number)`. IR command-injection port is settable via `ServerPort`.
- The SwitchableUSB Device Configuration Network Protocol (Icron, F130) uses UDP port 6137 with magic number `0x2F03F4A2`; details are out of scope for LW3 actions but referenced for the F130 endpoint.
<!-- UNRESOLVED: firmware version compatibility matrices; full enumeration of all PER-DISPLAY and PER-PORT tag-management variants (they follow repeating patterns); full SwitchableUSB protocol message table is partially documented and was not promoted into discrete actions. -->

## Provenance

```yaml
source_domains:
  - assets.prod.pim.lightware.com
  - academy.lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/UBEX_Matrix_UserManual.pdf
  - https://academy.lightware.com/
retrieved_at: 2026-08-11T06:35:13.542Z
last_checked_at: 2026-08-19T09:35:30.737Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:35:30.737Z
matched_actions: 269
action_count: 269
confidence: medium
summary: "All 269 wire-literal LW3 actions map1:1 to source; transport port 6107 confirmed; ~1:1 command coverage with source. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "MEDIA/VIDEOWALLS/<video_wall_ID>/LAYOUTS/<layout_ID>/<zone_ID>.BackgroundColor"
- "Full list of major gaps below: video-wall createGridVideoWall parameter ordering is described but full per-parameter types not fully enumerated; event/subscription specifics (CHG payload schema, CLOSE/OPEN behavior) are described but not enumerated as discrete Events; many sub-commands (PER-PORT tags, PER-DISPLAY settings) follow repeating patterns and are summarized rather than each enumerated."
- "no source-defined macros beyond the LW3 protocol-level"
- "firmware version compatibility matrices; full enumeration of all PER-DISPLAY and PER-PORT tag-management variants (they follow repeating patterns); full SwitchableUSB protocol message table is partially documented and was not promoted into discrete actions."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
