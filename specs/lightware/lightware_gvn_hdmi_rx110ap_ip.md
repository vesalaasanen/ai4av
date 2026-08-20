---
spec_id: admin/lightware-gvn-hdmi-rx110ap
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware GVN-HDMI-RX110AP Control Spec"
manufacturer: Lightware
model_family: GVN-HDMI-RX110AP
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - GVN-HDMI-RX110AP
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.prod.pim.lightware.com
  - go.lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/GVN_series_UserManual.pdf
  - "https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/Application-Note/Lightware's_Open_API_Environment.pdf"
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/Application-Note/Installation_and_Network_Setup_Guide_for_GVN_Extenders.pdf
  - https://go.lightware.com/open-api-environment
retrieved_at: 2026-08-10T21:13:54.622Z
last_checked_at: 2026-08-19T09:30:10.851Z
generated_at: 2026-08-19T09:30:10.851Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the GVN series user manual and covers the whole family (MMU + TX + RX endpoints); RX110AP-specific command subset, port counts, and electrical specs are not isolated. Voltage/power specs not stated."
  - "full enumeration of every device-specific property change notification not exhaustively tabulated in source"
  - "full list of notifiable properties per endpoint not exhaustively tabulated in source."
  - "none defined."
  - "no power-on sequencing or electrical interlock procedures stated in source."
  - "RX110AP-specific port count (number of HDMI outputs, USB-A ports, analog audio ports) not isolated from family-level description."
  - "electrical specs (power consumption, voltage, current) not stated in source."
  - "firmware version compatibility for RX110AP not stated; doc references features by various FW thresholds (v1.0, v1.1.0, v1.5.0, v1.7.0, v1.8.0b9)."
  - "HW variant differences (e.g. GVN-HC-TX220AP-DNT Dante products) called out in source do not clearly map to RX110AP capabilities."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:30:10.851Z
  matched_actions: 84
  action_count: 84
  confidence: medium
  summary: "All 84 spec actions match LW3 command tokens in the refined source; transport ports 6107/6752/80/443/8080 and admin auth are documented. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Lightware GVN-HDMI-RX110AP Control Spec

## Summary
The Lightware GVN-HDMI-RX110AP is an HDMI receiver (RX) endpoint in the Lightware Gemini Video Network (GVN) series of HDMI/USB-C AV-over-IP extenders. It is controlled through the Lightware Protocol #3 (LW3), an ASCII, CrLf-terminated, tree-structured command set carried over TCP (port 6107), WebSocket (WS/WSS over HTTP 80/HTTPS 443), or serial-over-IP (TCP 6752). The RX110AP is managed by the GVN-MMU-X100 matrix management unit; most LW3 commands are addressed to the MMU and target endpoints by device-map ID.

<!-- UNRESOLVED: source is the GVN series user manual and covers the whole family (MMU + TX + RX endpoints); RX110AP-specific command subset, port counts, and electrical specs are not isolated. Voltage/power specs not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 6107  # LW3 protocol over TCP (raw connection type)
  # Additional documented TCP service ports (not the primary control channel):
  #   6752  Serial over IP (RS-232 command injection)
  #   80    HTTP (LW3 over WebSocket; firmware update; log download; built-in web GUI)
  #   443   HTTPS (LW3 over WSS; secure built-in web GUI)
  #   8080  Built-in web snapshot/substream JPEG/MJPEG endpoints
auth:
  type: none  # inferred: no password is set by default; optional HTTP Basic Auth (username "admin", password >=10 chars) is configurable via LDC or LW3 (/MANAGEMENT/SERVICES/{HTTP,HTTPS}.AuthenticationEnabled)
```

## Traits
```yaml
traits:
  - routable    # inferred: video/audio/USB crosspoint switch + switchAll + disconnect commands
  - queryable   # inferred: extensive GET queries (signal presence, resolution, refresh rate, connection, EDID validity, etc.)
  - levelable   # inferred: analog audio VolumePercent (0-100) and stepVolumePercent commands
```

## Actions
```yaml
# LW3 commands are ASCII, terminated with CrLf. Max line length 800 bytes.
# Paths/params are case-sensitive. Escape control chars (\ { } # % ( ) \r \n \t) with backslash.
# <endpoint> / <device_map_id> = endpoint order ID (e.g. X1, X4). RX devices are destinations for video/audio/USB.

# --- System Commands - MMU ---
- id: mmu_get_product_name
  label: Get MMU Product Name
  kind: query
  command: "GET /.ProductName"
  params: []

- id: mmu_set_device_label
  label: Set MMU Device Label
  kind: action
  command: "SET /MANAGEMENT/DEVICE.DeviceLabel={label}"
  params:
    - name: label
      type: string
      description: "ASCII device label, max 63 chars. Default format LW_<product>_<serial>"

- id: mmu_get_serial_number
  label: Get MMU Serial Number
  kind: query
  command: "GET /.SerialNumber"
  params: []

- id: mmu_get_package_version
  label: Get MMU Package Version
  kind: query
  command: "GET /.PackageVersion"
  params: []

- id: mmu_get_current_time
  label: Get MMU Current Date/Time
  kind: query
  command: "GET /MANAGEMENT/DATETIME.CurrentTime"
  params: []

- id: mmu_set_time
  label: Set MMU Date/Time
  kind: action
  command: "CALL /MANAGEMENT/DATETIME:setTime={datetime}"
  params:
    - name: datetime
      type: string
      description: "ISO 8601, YYYY-MM-DDTHH:MM:SS"

- id: mmu_reboot
  label: Reboot MMU
  kind: action
  command: "CALL /SYS:reboot()"
  params: []

- id: mmu_factory_defaults
  label: Restore MMU Factory Defaults
  kind: action
  command: "CALL /SYS:factoryDefaults()"
  params: []

- id: mmu_get_device_count
  label: Get Discovered Device Count
  kind: query
  command: "GET /ENDPOINTS/DISCOVERY/ALL.DeviceCount"
  params: []

# --- System Commands - Endpoints ---
- id: ep_get_product_name
  label: Get Endpoint Product Name
  kind: query
  command: "GET /ENDPOINTS/DEVICEMAP/{endpoint}.ProductName"
  params:
    - name: endpoint
      type: string
      description: Device map ID, e.g. X1

- id: ep_set_device_label
  label: Set Endpoint Device Label
  kind: action
  command: "SET /ENDPOINTS/DEVICEMAP/{endpoint}/MANAGEMENT.DeviceLabel={label}"
  params:
    - name: endpoint
      type: string
      description: Device map ID, e.g. X1
    - name: label
      type: string
      description: "ASCII label (avoid accents/spaces in FW v1.0)"

- id: ep_get_serial_number
  label: Get Endpoint Serial Number
  kind: query
  command: "GET /ENDPOINTS/DEVICEMAP/{endpoint}.SerialNumber"
  params:
    - name: endpoint
      type: string
      description: Device map ID

- id: ep_get_mac_address
  label: Get Endpoint MAC Address
  kind: query
  command: "GET /ENDPOINTS/DEVICEMAP/{endpoint}.MacAddress"
  params:
    - name: endpoint
      type: string
      description: Device map ID

- id: ep_get_package_version
  label: Get Endpoint Package Version
  kind: query
  command: "GET /ENDPOINTS/DEVICEMAP/{endpoint}.PackageVersion"
  params:
    - name: endpoint
      type: string
      description: Device map ID

- id: ep_get_discovery_id
  label: Get Endpoint Discovery ID
  kind: query
  command: "GET /ENDPOINTS/DEVICEMAP/{device_map_id}.DiscoveryId"
  params:
    - name: device_map_id
      type: string
      description: Device map ID, e.g. X1. Returns <TX|RX>-<MAC>

- id: ep_get_device_map_id
  label: Get Device Map ID by Discovery ID
  kind: query
  command: "GET /ENDPOINTS/DISCOVERY/ALL/{discovery_id}.DeviceMapId"
  params:
    - name: discovery_id
      type: string
      description: "<TX|RX>-<MAC>, e.g. RX-A8D2360298B1"

- id: ep_add_to_device_map
  label: Add Device to Device Map
  kind: action
  command: "CALL /ENDPOINTS/DISCOVERY/ALL/{discovery_id}:addToDeviceMap()"
  params:
    - name: discovery_id
      type: string
      description: "<TX|RX>-<MAC>"

- id: ep_remove_from_device_map
  label: Remove Device from Device Map
  kind: action
  command: "CALL /ENDPOINTS/DEVICEMAP/{device_map_id}:removeFromDeviceMap()"
  params:
    - name: device_map_id
      type: string
      description: Device map ID, e.g. X1

- id: ep_reboot
  label: Reboot Endpoint
  kind: action
  command: "CALL /ENDPOINTS/DEVICEMAP/{device_map_id}/SYS:reboot()"
  params:
    - name: device_map_id
      type: string
      description: Device map ID

- id: ep_factory_defaults
  label: Restore Endpoint Factory Defaults
  kind: action
  command: "CALL /ENDPOINTS/DEVICEMAP/{device_map_id}/SYS:factoryDefaults()"
  params:
    - name: device_map_id
      type: string
      description: Device map ID

# --- Video Crosspoint ---
- id: video_switch
  label: Switch Video Stream to Destination
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:switch({source}:{destination})"
  params:
    - name: source
      type: string
      description: "<dev_map_id>_NATIVE_OUT (e.g. X6_NATIVE_OUT)"
    - name: destination
      type: string
      description: "<dev_map_id>_NATIVE_IN (e.g. X4_NATIVE_IN). Multiple pairs separated by ;"

- id: video_switch_all
  label: Switch Video Stream to All Destinations
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:switchAll({source})"
  params:
    - name: source
      type: string
      description: "<dev_map_id>_NATIVE_OUT. Use 0 to disconnect all destinations"

- id: video_disconnect
  label: Disconnect Video Stream from Destination
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:switch(0:{destination})"
  params:
    - name: destination
      type: string
      description: "<dev_map_id>_NATIVE_IN"

- id: video_set_autoselect_policy
  label: Set Video Auto-Select Policy (TX)
  kind: action
  command: "SET /MEDIA/VIDEO/{destination}/AUTOSELECT.Policy={policy}"
  params:
    - name: destination
      type: string
      description: "<dev_map_id>_NATIVE_OUT"
    - name: policy
      type: enum
      description: "[Off, Last detect, Priority]"

- id: video_set_autoselect_priority
  label: Set Video Auto-Select Priority (TX)
  kind: action
  command: "SET /MEDIA/VIDEO/{destination}/AUTOSELECT.Priority={input1}:{input2}"
  params:
    - name: destination
      type: string
      description: "<dev_map_id>_NATIVE_OUT"
    - name: input1
      type: enum
      description: "[HDMI_IN, USBC_MAIN_IN] (priority input)"
    - name: input2
      type: enum
      description: "[HDMI_IN, USBC_MAIN_IN] (secondary input)"

- id: video_manual_input_select
  label: Manual Video Input Selection (TX)
  kind: action
  command: "SET /MEDIA/VIDEO/{destination}.ConnectedSourceByName={source}"
  params:
    - name: destination
      type: string
      description: "<dev_map_id>_NATIVE_OUT"
    - name: source
      type: enum
      description: "[HDMI_IN, USBC_MAIN_IN]"

# --- Video Stream Queries ---
- id: video_get_signal_present
  label: Query Video Signal Presence
  kind: query
  command: "GET /MEDIA/VIDEO/{stream_name}.SignalPresent"
  params:
    - name: stream_name
      type: string
      description: "Source or destination stream ID"

- id: video_get_active_resolution
  label: Query Active Resolution
  kind: query
  command: "GET /MEDIA/VIDEO/{stream_name}.ActiveResolution"
  params:
    - name: stream_name
      type: string
      description: Stream ID. Returns <pixels>x<lines>

- id: video_get_total_resolution
  label: Query Total Resolution (with blanking)
  kind: query
  command: "GET /MEDIA/VIDEO/{stream_name}.TotalResolution"
  params:
    - name: stream_name
      type: string
      description: Stream ID. Returns <pixels>x<lines>

- id: video_get_refresh_rate
  label: Query Refresh Rate
  kind: query
  command: "GET /MEDIA/VIDEO/{stream_name}.RefreshRate"
  params:
    - name: stream_name
      type: string
      description: Stream ID. Returns Hz value

- id: video_get_signal_type
  label: Query Signal Type
  kind: query
  command: "GET /MEDIA/VIDEO/{stream_name}.SignalType"
  params:
    - name: stream_name
      type: string
      description: "Stream ID. Returns [N/A, DVI, HDMI, DP]"

- id: video_get_connected
  label: Query Connection Status
  kind: query
  command: "GET /MEDIA/VIDEO/{stream_name}.Connected"
  params:
    - name: stream_name
      type: string
      description: "Stream ID (not available on NATIVE ports). Returns [true, false]"

# --- No Signal Screen (RX only) ---
- id: video_set_signal_loss_handling
  label: Set No-Signal Screen Handling (RX)
  kind: action
  command: "SET /MEDIA/VIDEO/{destination}/SCREEN.SignalLossHandling={option}"
  params:
    - name: destination
      type: string
      description: RX destination stream ID
    - name: option
      type: enum
      description: "[DefaultLogo, BlackScreen, DisableHDMIOut]"

- id: video_set_osd
  label: Enable/Disable On-Screen Display (RX)
  kind: action
  command: "SET /MEDIA/VIDEO/{destination}/SCREEN.ShowOSD={status}"
  params:
    - name: destination
      type: string
      description: RX destination stream ID
    - name: status
      type: enum
      description: "[true, false]"

- id: video_set_signal_loss_timeout
  label: Set Signal-Loss Screen Timeout (RX)
  kind: action
  command: "SET /MEDIA/VIDEO/{destination}/SCREEN.SignalLossTimeout={value}"
  params:
    - name: destination
      type: string
      description: RX destination stream ID
    - name: value
      type: integer
      description: "100-60000 ms"

# --- Audio Crosspoint ---
- id: audio_set_follow_policy
  label: Set Audio Follow-Video Policy
  kind: action
  command: "SET /MEDIA/AUDIO/XP.DefaultFollowPolicy={follow_policy}"
  params:
    - name: follow_policy
      type: enum
      description: "[Off, Forced follow video]"

- id: audio_switch
  label: Switch Audio Stream to Destination
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:switch({source}:{destination})"
  params:
    - name: source
      type: string
      description: "<dev_map_id>_NATIVE_OUT"
    - name: destination
      type: string
      description: "<dev_map_id>_NATIVE_IN. Multiple pairs separated by ;"

- id: audio_switch_all
  label: Switch Audio Stream to All Destinations
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:switchAll({source})"
  params:
    - name: source
      type: string
      description: "<dev_map_id>_NATIVE_OUT. Use 0 to disconnect all"

- id: audio_disconnect
  label: Disconnect Audio Stream from Destination
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:switch(0:{destination})"
  params:
    - name: destination
      type: string
      description: "<dev_map_id>_NATIVE_IN"

- id: audio_set_connected_source
  label: Set Audio Input Source (single endpoint)
  kind: action
  command: "SET /MEDIA/AUDIO/{output}.ConnectedSourceByName={source}"
  params:
    - name: output
      type: string
      description: "<dev_map_id>_[NATIVE_OUT|DANTE_OUT|ANALOG_OUT|UAC_OUT]"
    - name: source
      type: enum
      description: "[UAC_IN, ANALOG_IN, ACTIVE_EMBEDDED_IN, DANTE_IN]"

# --- Analog Audio Port ---
- id: audio_set_volume_percent
  label: Set Analog Volume (percent)
  kind: action
  command: "SET /MEDIA/AUDIO/{audio_out}/VOLUME.VolumePercent={volume}"
  params:
    - name: audio_out
      type: string
      description: "<dev_map_id>_ANALOG_OUT"
    - name: volume
      type: integer
      description: "0-100"

- id: audio_step_volume_percent
  label: Step Analog Volume (percent)
  kind: action
  command: "CALL /MEDIA/AUDIO/{audio_out}/VOLUME:stepVolumePercent({step_value})"
  params:
    - name: audio_out
      type: string
      description: "<dev_map_id>_ANALOG_OUT"
    - name: step_value
      type: integer
      description: "-100 to 100"

- id: audio_set_mute
  label: Mute/Unmute Analog Output
  kind: action
  command: "SET /MEDIA/AUDIO/{audio_out}/VOLUME.Mute={state}"
  params:
    - name: audio_out
      type: string
      description: "<dev_map_id>_ANALOG_OUT"
    - name: state
      type: enum
      description: "[true, false]"

- id: audio_set_port_direction
  label: Set Analog Port Direction (TX)
  kind: action
  command: "SET /MEDIA/AUDIO/{audio_port}.Enabled={status}"
  params:
    - name: audio_port
      type: string
      description: "<dev_map_id>_ANALOG_OUT or <dev_map_id>_ANALOG_IN (input/output toggle)"
    - name: status
      type: enum
      description: "[true, false]"

# --- USB Crosspoint ---
- id: usb_set_follow_policy
  label: Set USB Follow-Video Policy
  kind: action
  command: "SET /MEDIA/USB/XP.DefaultFollowPolicy={follow_policy}"
  params:
    - name: follow_policy
      type: enum
      description: "[Off, Forced follow video]"

- id: usb_switch
  label: Switch USB Device (RX) to USB Host (TX)
  kind: action
  command: "CALL /MEDIA/USB/XP:switch({usb_host}:{usb_dev})"
  params:
    - name: usb_host
      type: string
      description: "<dev_map_id>_NATIVE_DOWNSTR (TX host). Only one RX per TX."
    - name: usb_dev
      type: string
      description: "<dev_map_id>_NATIVE_UPSTR (RX device side)"

- id: usb_switch_all
  label: Switch All USB Devices (RX) to USB Host (TX)
  kind: action
  command: "CALL /MEDIA/USB/XP:switchAll({usb_host})"
  params:
    - name: usb_host
      type: string
      description: "<dev_map_id>_NATIVE_DOWNSTR"

- id: usb_disconnect
  label: Disconnect USB Device (RX) from Host
  kind: action
  command: "CALL /MEDIA/USB/XP:switch(0:{usb_dev})"
  params:
    - name: usb_dev
      type: string
      description: "<dev_map_id>_NATIVE_UPSTR"

- id: usb_set_uac_source
  label: Connect USB-C Port to UAC
  kind: action
  command: "SET /MEDIA/USB/{uac}.ConnectedSourceByName={input}"
  params:
    - name: uac
      type: string
      description: "<dev_map_id>_UAC_SOUNDCARD"
    - name: input
      type: enum
      description: "[USBC_MAIN_HOST, USB_DATA_ONLY_HOST]"

# --- USB Port Settings (RX) ---
- id: usb_set_port_data_enabled
  label: Enable/Disable USB-A Port (RX)
  kind: action
  command: "SET /MEDIA/USB/{hub}/{usb_port}.DataEnabled={status}"
  params:
    - name: hub
      type: string
      description: "<dev_map_id>_VIRTUAL_HUB"
    - name: usb_port
      type: enum
      description: "[USB_DOWNSTR_1, USB_DOWNSTR_2 (USB 1.1), USB_DOWNSTR_3, USB_DOWNSTR_4 (USB 2.0)] (switched in pairs)"
    - name: status
      type: enum
      description: "[true, false]"

- id: usb_set_uac_enabled
  label: Enable/Disable USB Audio Converter (UAC, TX)
  kind: action
  command: "SET /MEDIA/USB/{hub}.Enabled={status}"
  params:
    - name: hub
      type: string
      description: "<dev_map_id>_UAC_SOUNDCARD"
    - name: status
      type: enum
      description: "[true, false] (default false)"

- id: usb_set_uec_enabled
  label: Enable/Disable USB Ethernet Converter (UEC, TX)
  kind: action
  command: "SET /MEDIA/USB/{hub}.Enabled={status}"
  params:
    - name: hub
      type: string
      description: "<dev_map_id>_ETHERNET_ADAPTER"
    - name: status
      type: enum
      description: "[true, false] (default false)"

# --- Network Configuration ---
- id: net_get_ip_address
  label: Query IP Address
  kind: query
  command: "GET /MANAGEMENT/NETWORKINTERFACES/{netw_int}/IPV4/{IP_mode}.IpAddress"
  params:
    - name: netw_int
      type: enum
      description: "[CONTROLLAN, GVNNETWORK]"
    - name: IP_mode
      type: enum
      description: "[STATIC, DHCP]"

- id: net_set_static_enabled
  label: Enable/Disable Static IP
  kind: action
  command: "SET /MANAGEMENT/NETWORKINTERFACES/{netw_int}/IPV4/STATIC.Enabled={status}"
  params:
    - name: netw_int
      type: enum
      description: "[CONTROLLAN, GVNNETWORK]"
    - name: status
      type: enum
      description: "[true, false]"

- id: net_set_static_ip
  label: Set Static IP Address
  kind: action
  command: "SET /MANAGEMENT/NETWORKINTERFACES/{netw_int}/IPV4/STATIC.ConfiguredIpAddress={ip_add}/{mask}"
  params:
    - name: netw_int
      type: enum
      description: "[CONTROLLAN, GVNNETWORK]"
    - name: ip_add
      type: string
      description: IPv4 address
    - name: mask
      type: integer
      description: "Subnet mask prefix 1-29"

- id: net_get_gateway
  label: Query Gateway Address
  kind: query
  command: "GET /MANAGEMENT/NETWORKINTERFACES/{netw_int}/IPV4/{IP_mode}.GatewayAddress"
  params:
    - name: netw_int
      type: enum
      description: "[CONTROLLAN, GVNNETWORK]"
    - name: IP_mode
      type: enum
      description: "[STATIC, DHCP]"

- id: net_set_gateway
  label: Set Static Gateway Address
  kind: action
  command: "SET /MANAGEMENT/NETWORKINTERFACES/{netw_int}/IPV4/STATIC.ConfiguredGatewayAddress={gw_add}"
  params:
    - name: netw_int
      type: enum
      description: "[CONTROLLAN, GVNNETWORK]"
    - name: gw_add
      type: string
      description: Gateway IPv4 address (static mode only)

- id: net_set_hostname
  label: Set Hostname
  kind: action
  command: "SET /MANAGEMENT/DEVICE.HostName={hostname}"
  params:
    - name: hostname
      type: string
      description: "[A-Za-z0-9-] only"

# --- Network Security ---
- id: sec_set_http_enabled
  label: Enable/Disable HTTP Port (80)
  kind: action
  command: "SET /MANAGEMENT/SERVICES/HTTP.Enabled={state}"
  params:
    - name: state
      type: enum
      description: "[true, false]"

- id: sec_set_http_auth
  label: Enable/Disable HTTP Auth
  kind: action
  command: "SET /MANAGEMENT/SERVICES/HTTP.AuthenticationEnabled={authentication}"
  params:
    - name: authentication
      type: enum
      description: "[true, false] (requires password set first)"

- id: sec_set_https_enabled
  label: Enable/Disable HTTPS Port (443)
  kind: action
  command: "SET /MANAGEMENT/SERVICES/HTTPS.Enabled={state}"
  params:
    - name: state
      type: enum
      description: "[true, false]"

- id: sec_set_https_auth
  label: Enable/Disable HTTPS Auth
  kind: action
  command: "SET /MANAGEMENT/SERVICES/HTTPS.AuthenticationEnabled={authentication}"
  params:
    - name: authentication
      type: enum
      description: "[true, false] (requires password set first)"

- id: sec_set_lw3_enabled
  label: Enable/Disable LW3 Port (6107)
  kind: action
  command: "SET /MANAGEMENT/SERVICES/LW3.Enabled={state}"
  params:
    - name: state
      type: enum
      description: "[true, false]"

# --- Serial Port Settings ---
- id: serial_set_baudrate
  label: Set RS-232 Baud Rate
  kind: action
  command: "SET /MEDIA/SERIAL/{port}.Baudrate={baudrate}"
  params:
    - name: port
      type: string
      description: "e.g. X7_RS232"
    - name: baudrate
      type: enum
      description: "[9600, 19200, 38400, 57600, 115200]"

- id: serial_set_data_bits
  label: Set RS-232 Data Bits
  kind: action
  command: "SET /MEDIA/SERIAL/{port}.DataBits={data_bits}"
  params:
    - name: port
      type: string
      description: "e.g. X7_RS232"
    - name: data_bits
      type: enum
      description: "[8]"

- id: serial_set_stop_bits
  label: Set RS-232 Stop Bits
  kind: action
  command: "SET /MEDIA/SERIAL/{port}.StopBits={stop_bits}"
  params:
    - name: port
      type: string
      description: "e.g. X7_RS232"
    - name: stop_bits
      type: enum
      description: "[1, 2]"

- id: serial_set_parity
  label: Set RS-232 Parity
  kind: action
  command: "SET /MEDIA/SERIAL/{port}.Parity={parity}"
  params:
    - name: port
      type: string
      description: "e.g. X7_RS232"
    - name: parity
      type: enum
      description: "[None, Odd, Even]"

- id: serial_set_operation_mode
  label: Set RS-232 Operation Mode
  kind: action
  command: "SET /MEDIA/SERIAL/{port}.OperationMode={operation_mode}"
  params:
    - name: port
      type: string
      description: "e.g. X7_RS232"
    - name: operation_mode
      type: enum
      description: "[Transparent, AvNetworkInjection, None]"

- id: serial_set_transparent_enabled
  label: Enable/Disable Transparent RS-232 Mode
  kind: action
  command: "SET /MEDIA/SERIAL/{port}/TRANSPARENT.Enabled={status}"
  params:
    - name: port
      type: string
      description: "e.g. X7_RS232"
    - name: status
      type: enum
      description: "[true, false]"

- id: serial_set_avnetworkinjection_enabled
  label: Enable/Disable Serial-over-IP (command injection)
  kind: action
  command: "SET /MEDIA/SERIAL/{port_id}/AVNETWORKINJECTION.Enabled={status}"
  params:
    - name: port_id
      type: string
      description: "P<map_id>01, e.g. P201"
    - name: status
      type: enum
      description: "[true, false]. Connect to TCP 6752 for injection."

# --- EDID Management ---
- id: edid_get_validity
  label: Query EDID Validity
  kind: query
  command: "GET /EDID/{edid_category}/{edid_type}.Validity"
  params:
    - name: edid_category
      type: enum
      description: "[E (Emulated), D (Dynamic), U (User), F (Factory)]"
    - name: edid_type
      type: string
      description: "e.g. D1001, E1, U1, F1"

- id: edid_get_preferred_resolution
  label: Query EDID Preferred Resolution
  kind: query
  command: "GET /EDID/{edid_category}/{edid_type}.PreferredResolution"
  params:
    - name: edid_category
      type: enum
      description: "[E, D, U, F]"
    - name: edid_type
      type: string
      description: e.g. F5

- id: edid_switch
  label: Emulate EDID to Input Port
  kind: action
  command: "CALL /EDID:switch({source}:{destination})"
  params:
    - name: source
      type: string
      description: "F1-F148, U1-U100, or D<map_id>01"
    - name: destination
      type: string
      description: "E<map_id>01 (Emulated)"

- id: edid_switch_all
  label: Emulate EDID to All Input Ports
  kind: action
  command: "CALL /EDID:switchAll({source})"
  params:
    - name: source
      type: string
      description: "F1-F148, U1-U100, or D<map_id>01"

- id: edid_copy
  label: Copy EDID to User Memory
  kind: action
  command: "CALL /EDID:copy({source}:{destination})"
  params:
    - name: source
      type: string
      description: "F1-F148, U1-U100, or D<map_id>01"
    - name: destination
      type: string
      description: "U1-U100"

- id: edid_delete
  label: Delete EDID from User Memory
  kind: action
  command: "CALL /EDID:delete({user_edid})"
  params:
    - name: user_edid
      type: string
      description: "U1-U100"

- id: edid_reset
  label: Reset All Emulated EDIDs to Factory Default
  kind: action
  command: "CALL /EDID:reset()"
  params: []

# --- LW3 Subscription primitives ---
- id: lw3_subscribe_node
  label: Subscribe to Node
  kind: action
  command: "OPEN {node_path}"
  params:
    - name: node_path
      type: string
      description: "e.g. /MEDIA/VIDEO"

- id: lw3_subscribe_multi
  label: Subscribe to Multiple Nodes (wildcard)
  kind: action
  command: "OPEN {node_path}/*"
  params:
    - name: node_path
      type: string
      description: "e.g. /MEDIA/VIDEO"

- id: lw3_unsubscribe_node
  label: Unsubscribe from Node
  kind: action
  command: "CLOSE {node_path}"
  params:
    - name: node_path
      type: string
      description: Node path

- id: lw3_unsubscribe_multi
  label: Unsubscribe from Multiple Nodes
  kind: action
  command: "CLOSE {node_path}/*"
  params:
    - name: node_path
      type: string
      description: Node path

- id: lw3_get_subscriptions
  label: Get Active Subscriptions
  kind: query
  command: "OPEN"
  params: []

# --- Built-in Web HTTP endpoints (snapshot/substream) ---
- id: web_snapshot
  label: Get Stream Snapshot (HTTP)
  kind: query
  command: "GET http://{endpoint_ip}:8080/?action=snapshot&w={width}&h={height}&q={quality}&as={aspect_ratio}"
  params:
    - name: endpoint_ip
      type: string
      description: Endpoint IP address
    - name: width
      type: integer
      description: "Pixels, max 1280 (default 1024)"
    - name: height
      type: integer
      description: "Pixels, max 720 (default 576)"
    - name: quality
      type: integer
      description: "10-100 in steps of 10 (default 60)"
    - name: aspect_ratio
      type: enum
      description: "[0 (stretch), 1 (keep ratio, center)]"

- id: web_substream
  label: Get Stream Substream Video (HTTP)
  kind: query
  command: "GET http://{endpoint_ip}:8080/stream&w={width}&h={height}&fps={frame_rate}&bw={bandwidth}&as={aspect_ratio}&mq={min_quality}"
  params:
    - name: endpoint_ip
      type: string
      description: Endpoint IP address
    - name: width
      type: integer
      description: "Pixels, max 1280 (default 960)"
    - name: height
      type: integer
      description: "Pixels, max 720 (default 540)"
    - name: frame_rate
      type: integer
      description: "Frames per second (default 15)"
    - name: bandwidth
      type: integer
      description: "Max bandwidth kb/s (default 8000)"
    - name: aspect_ratio
      type: enum
      description: "[0 (stretch), 1 (keep ratio)]"
    - name: min_quality
      type: integer
      description: "10-100 in steps of 10 (default 10)"
```

## Feedbacks
```yaml
# LW3 responses use 2-char prefixes:
#   pr = read-only property value, pw = read-write property value,
#   mO = method success, mF = method failure, mE = method error,
#   nE / pE = node/property error. CHG = async change notification (when subscribed).
- id: product_name_response
  type: string
  values: []  # e.g. "GVN-MMU-X100" (MMU), "GVN-HDMI-TX210AP" (endpoint)
- id: serial_number_response
  type: string
  values: []
- id: package_version_response
  type: string
  values: []  # e.g. "v1.1.0"
- id: mac_address_response
  type: string
  values: []  # colon-separated MAC
- id: signal_present
  type: enum
  values: ["true", "false"]
- id: active_resolution
  type: string
  values: []  # <pixels>x<lines>
- id: total_resolution
  type: string
  values: []  # <pixels>x<lines> including blanking
- id: refresh_rate
  type: string
  values: []  # Hz, e.g. "60.00"
- id: signal_type
  type: enum
  values: ["N/A", "DVI", "HDMI", "DP"]
- id: connected_status
  type: enum
  values: ["true", "false"]
- id: edid_validity
  type: enum
  values: ["true", "false"]
- id: edid_preferred_resolution
  type: string
  values: []  # e.g. "1280x768p50.00Hz"
- id: device_count
  type: integer
  values: []
- id: ip_address
  type: string
  values: []  # CIDR, e.g. "192.168.0.135/24"
- id: gateway_address
  type: string
  values: []
- id: discovery_id
  type: string
  values: []  # <TX|RX>-<MAC>
- id: device_map_id
  type: string
  values: []  # e.g. "X1"
- id: async_change_notification
  type: string
  values: []  # CHG /<path>.<prop>=<value>, emitted to subscribed connections on property change
# UNRESOLVED: full enumeration of every device-specific property change notification not exhaustively tabulated in source
```

## Variables
```yaml
- id: device_label
  type: string
  description: "MMU (/MANAGEMENT/DEVICE.DeviceLabel) or endpoint (/ENDPOINTS/DEVICEMAP/<id>/MANAGEMENT.DeviceLabel). ASCII, max 63 chars."
- id: hostname
  type: string
  description: "/MANAGEMENT/DEVICE.HostName. [A-Za-z0-9-] only."
- id: audio_volume_percent
  type: integer
  description: "/MEDIA/AUDIO/<audio_out>/VOLUME.VolumePercent, 0-100."
- id: audio_mute
  type: enum
  description: "/MEDIA/AUDIO/<audio_out>/VOLUME.Mute [true, false]."
- id: signal_loss_timeout
  type: integer
  description: "/MEDIA/VIDEO/<destination>/SCREEN.SignalLossTimeout, 100-60000 ms."
- id: show_osd
  type: enum
  description: "/MEDIA/VIDEO/<destination>/SCREEN.ShowOSD [true, false]."
- id: signal_loss_handling
  type: enum
  description: "/MEDIA/VIDEO/<destination>/SCREEN.SignalLossHandling [DefaultLogo, BlackScreen, DisableHDMIOut]."
- id: autoselect_policy
  type: enum
  description: "/MEDIA/VIDEO/<destination>/AUTOSELECT.Policy [Off, Last detect, Priority]."
- id: serial_baudrate
  type: enum
  description: "/MEDIA/SERIAL/<port>.Baudrate [9600, 19200, 38400, 57600, 115200]."
- id: serial_parity
  type: enum
  description: "/MEDIA/SERIAL/<port>.Parity [None, Odd, Even]."
- id: serial_stop_bits
  type: enum
  description: "/MEDIA/SERIAL/<port>.StopBits [1, 2]."
- id: serial_operation_mode
  type: enum
  description: "/MEDIA/SERIAL/<port>.OperationMode [Transparent, AvNetworkInjection, None]."
```

## Events
```yaml
# LW3 asynchronous "change" notifications: when a subscribed node's property changes,
# the device emits an unsolicited message on the subscribing connection:
#   CHG /<node_path>.<Property>=<value>
# Example: CHG /EDID.EdidStatus=F48:E201
# Subscriptions are per-connection and cleared when the connection closes.
# UNRESOLVED: full list of notifiable properties per endpoint not exhaustively tabulated in source.
```

## Macros
```yaml
# No explicit multi-step command sequences documented as named macros in source.
# UNRESOLVED: none defined.
```

## Safety
```yaml
confirmation_required_for:
  - mmu_factory_defaults        # restores factory defaults for MMU AND all connected endpoints; terminates connections
  - ep_factory_defaults         # per-endpoint factory reset; terminates connections
  - mmu_reboot                  # terminates all current connections (RS-232, USB, TCP)
  - ep_reboot                   # terminates endpoint connections
  - sec_set_http_enabled        # disabling all service ports (HTTP+HTTPS+LW3) can lock out remote access
  - sec_set_https_enabled
  - sec_set_lw3_enabled
interlocks:
  - "Disabling both HTTP (80) and HTTPS (443) makes backup download, time/date setting, and support package download unavailable."
  - "If all service ports (HTTP, HTTPS, LW3) are disabled, connection can only be restored by calling factory defaults physically."
  - "Authentication (HTTP/HTTPS) cannot be enabled until a password is set (>= 10 chars, <= 100 chars, UTF-8)."
  - "Basic auth password is NOT encrypted when used over plain HTTP; use HTTPS/WSS for confidentiality."
  - "Changing USB-A port DataEnabled requires re-switching the crosspoint, otherwise USB devices may not appear on the network."
  - "Audio Follow Video and USB Follow Video, when re-enabled, realign audio/USB crosspoints to match video."
# UNRESOLVED: no power-on sequencing or electrical interlock procedures stated in source.
```

## Notes
- The RX110AP is a GVN series **receiver (RX)** endpoint; it is normally controlled via the GVN-MMU-X100 matrix management unit. Most LW3 commands are sent to the MMU and target endpoints by device-map ID (`X1`, `X2`, ...). Source/destination stream tokens use the form `<dev_map_id>_<port_type>` (e.g. `X4_NATIVE_IN`, `X6_NATIVE_OUT`).
- LW3 is ASCII, case-sensitive, CrLf-terminated; max line length 800 bytes; max 10 concurrent LW3 clients (includes the LDC GUI); max 512 subscriptions; max 128 crosspoint updates per `switchAll`.
- An optional 4-hex-digit **signature** may prefix a command (`<sig>#<cmd>`) to group a multi-line response between `{<sig> ... }` braces.
- Escape characters `\ { } # % ( ) \r \n \t` with a backslash when used inside property values or method parameters.
- Default IP address of an endpoint: `192.168.0.100`. Default LW3 port: `6107`, raw TCP connection.
- No-signal-screen, OSD, and signal-loss-timeout settings are RX-specific and require an endpoint reboot to take effect.
- Snapshot/substream HTTP endpoints revert to defaults on reboot (configuration via built-in web is not persisted).
- Stream-name default format (FW v1.8.0b9+): `<MAC_address>.<endpoint_type> <dev_map_ID>` (e.g. `A8:D2:36:02:9E:5D.S1-X3`); endpoint type `S1` = transmitter, `D1` = receiver.

<!-- UNRESOLVED: RX110AP-specific port count (number of HDMI outputs, USB-A ports, analog audio ports) not isolated from family-level description. -->
<!-- UNRESOLVED: electrical specs (power consumption, voltage, current) not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility for RX110AP not stated; doc references features by various FW thresholds (v1.0, v1.1.0, v1.5.0, v1.7.0, v1.8.0b9). -->
<!-- UNRESOLVED: HW variant differences (e.g. GVN-HC-TX220AP-DNT Dante products) called out in source do not clearly map to RX110AP capabilities. -->

## Provenance

```yaml
source_domains:
  - assets.prod.pim.lightware.com
  - go.lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/GVN_series_UserManual.pdf
  - "https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/Application-Note/Lightware's_Open_API_Environment.pdf"
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/Application-Note/Installation_and_Network_Setup_Guide_for_GVN_Extenders.pdf
  - https://go.lightware.com/open-api-environment
retrieved_at: 2026-08-10T21:13:54.622Z
last_checked_at: 2026-08-19T09:30:10.851Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:30:10.851Z
matched_actions: 84
action_count: 84
confidence: medium
summary: "All 84 spec actions match LW3 command tokens in the refined source; transport ports 6107/6752/80/443/8080 and admin auth are documented. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the GVN series user manual and covers the whole family (MMU + TX + RX endpoints); RX110AP-specific command subset, port counts, and electrical specs are not isolated. Voltage/power specs not stated."
- "full enumeration of every device-specific property change notification not exhaustively tabulated in source"
- "full list of notifiable properties per endpoint not exhaustively tabulated in source."
- "none defined."
- "no power-on sequencing or electrical interlock procedures stated in source."
- "RX110AP-specific port count (number of HDMI outputs, USB-A ports, analog audio ports) not isolated from family-level description."
- "electrical specs (power consumption, voltage, current) not stated in source."
- "firmware version compatibility for RX110AP not stated; doc references features by various FW thresholds (v1.0, v1.1.0, v1.5.0, v1.7.0, v1.8.0b9)."
- "HW variant differences (e.g. GVN-HC-TX220AP-DNT Dante products) called out in source do not clearly map to RX110AP capabilities."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
