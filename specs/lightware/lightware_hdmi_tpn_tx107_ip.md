---
spec_id: admin/lightware-hdmi-tpn-tx107
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware HDMI-TPN-TX107 Control Spec"
manufacturer: Lightware
model_family: HDMI-TPN-TX107
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - HDMI-TPN-TX107
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.prod.pim.lightware.com
  - go.lightware.com
  - academy.lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/TPN-MMU_UserManual.pdf
  - https://go.lightware.com/tpn-mmu-pum
  - https://academy.lightware.com/
retrieved_at: 2026-08-10T20:48:42.721Z
last_checked_at: 2026-08-19T09:32:48.967Z
generated_at: 2026-08-19T09:32:48.967Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no direct-to-endpoint control interface is documented; every command in this spec is addressed to the MMU."
  - "firmware compatibility range for HDMI-TPN-TX107 not stated."
  - "the endpoint RS-232 port is a pass-through/command-injection port for a connected third-party device, not a control interface for the TX107 itself; it is therefore not listed under Transport.protocols."
  - "several sections of the source are chunked excerpts; chapters 1-5 and parts of 10-13 are summaries or non-protocol content."
  - "no electrical, thermal, or power-sequencing safety requirements are stated for the endpoint beyond PoE PD standard (IEEE802.3af) compliance."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:32:48.967Z
  matched_actions: 154
  action_count: 154
  confidence: medium
  summary: "All 154 spec actions mirror verbatim REST/LW3 commands in the source; transport values all documented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-10
---

# Lightware HDMI-TPN-TX107 Control Spec

## Summary
HDMI-TPN-TX107 is an SDVoE (BlueRiver) networked AV transmitter endpoint in the Lightware TPN matrix system. The source document states that the endpoint is not controlled directly: all documented control is issued to the TPN-MMU-X100 Matrix Management Unit, which addresses each endpoint by its MAC address (or user-set alias). Two control interfaces are documented: the Lightware REST API over HTTP(S) and the LW3 protocol over raw TCP (port 6107) or WS/WSS. Stream IDs use `<MAC>_S0` / `<MAC>_D0`, serial ports use `<MAC>_P1`.

<!-- UNRESOLVED: no direct-to-endpoint control interface is documented; every command in this spec is addressed to the MMU. -->
<!-- UNRESOLVED: firmware compatibility range for HDMI-TPN-TX107 not stated. -->
<!-- UNRESOLVED: the endpoint RS-232 port is a pass-through/command-injection port for a connected third-party device, not a control interface for the TX107 itself; it is therefore not listed under Transport.protocols. -->
<!-- UNRESOLVED: several sections of the source are chunked excerpts; chapters 1-5 and parts of 10-13 are summaries or non-protocol content. -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  base_url: "https://<ip>/api"   # "All properties and methods are available HTTP(S) below /api as an URL."
  port: 443                      # HTTPS server port, stated; HTTPS enabled by factory default
  # Additional stated service ports (Reserved Ports and Security Options / section 9.4.2):
  #   80   TCP  HTTP port (LW3 over WS, REST API) - disabled by factory default
  #   443  TCP  HTTPS port (LW3 over WSS, REST API)
  #   6107 TCP  LW3 protocol (raw connection type)
  #   6970 TCP  BlueRiver TCI API - disabled by factory default
  #   8080 TCP  REST API and websocket
  #   8001, 8002 TCP  Serial over IP (RS-232)
  # LW3 websocket paths (stated): ws://<ip>/lw3 and wss://<ip>/lw3
auth:
  type: basic   # "Basic access authentication ... requires user authentication by using a password (username is fixed)"
  username: admin  # "The username is always 'admin' in the MMU devices and it cannot be changed."
  # password: UNRESOLVED - MMU ships with a random per-unit factory password on a sticker; "No password is set by default" for REST basic auth.
  # HTTP authentication and HTTPS authentication are enabled by factory default (Factory Default Settings table).
  optional: true  # "Both of them are optional and can be used independently of each other."
framing:
  lw3: "Each line terminated with Carriage Return and Line Feed (CrLf); max line length 800 bytes."
  rest: "Arguments and property values given in the HTTP request body as plain text."
limits:
  max_clients: 18  # "It can manage 18 connected clients in total simultaneously for WS (80), WSS (443) and LW3 (6107) ports."
```

## Traits
```yaml
- routable    # inferred from video/audio/USB HID/Icron crosspoint switch and switchAll commands
- queryable   # inferred from GET / GETALL query commands returning state
- resettable  # inferred from documented restart / factoryReset / factoryDefaults commands
# NOT powerable: no power on/off command is documented in the source.
```

## Actions
```yaml
# --- REST API (chapter 8): request-line payloads, verbatim from source ---

- id: rest_set_device_label
  label: Set Device Label (MMU)
  kind: action
  command: "POST http://<ip>/api/V1/MANAGEMENT/LABEL/DeviceLabel"
  body: "<custom_name>"
  params:
    - name: custom_name
      type: string
      description: "Max 49 ASCII characters; longer names are truncated."

- id: rest_restart_device
  label: Restart the MMU
  kind: action
  command: "POST http://<ip>/api/V1/SYS/restart"
  params: []
  notes: "Body has to be empty, content type text/plain. Current connections will be terminated."

- id: rest_factory_defaults
  label: Restore Factory Default Settings (MMU)
  kind: action
  command: "POST http://<ip>/api/V1/SYS/factoryDefaults"
  params: []
  notes: "Body has to be empty, content type text/plain. Device restarts, connections terminated."

- id: rest_query_package_version
  label: Query Firmware Package Version
  kind: query
  command: "GET http://<ip>/api/V1/PackageVersion"
  params: []

- id: rest_query_serial_number
  label: Query Serial Number
  kind: query
  command: "GET http://<ip>/api/V1/SerialNumber"
  params: []

- id: rest_query_current_time
  label: Query System Date and Time
  kind: query
  command: "GET http://<ip>/api/V1/MANAGEMENT/DATETIME/CurrentTime"
  params: []

- id: rest_set_time
  label: Set Date and Time Manually
  kind: action
  command: "POST http://<ip>/api/V1/MANAGEMENT/DATETIME/setTime"
  body: "<date_time>"
  params:
    - name: date_time
      type: string
      description: "ISO 8601 date time format (YYYY-MM-DDTHH:MM:SS). Example: 2034-05-06T14:47:25"

- id: rest_set_ntp_enabled
  label: Enable/Disable NTP
  kind: action
  command: "POST http://<ip>/api/V1/MANAGEMENT/DATETIME/NTP/Enabled"
  body: "<logical_value>"
  params:
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: rest_set_ntp_server
  label: Set NTP Server
  kind: action
  command: "POST http://<ip>/api/V1/MANAGEMENT/DATETIME/NTP/ServerPool"
  body: "<server_address>"
  params:
    - name: server_address
      type: string
      description: "Example: pool.ntp.org"

- id: rest_discover_endpoints
  label: Discover Endpoints on the Network
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/discover"
  params: []

- id: rest_add_endpoint
  label: Add an Endpoint to the Matrix
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/addToMainGroup"
  params:
    - name: MAC_address
      type: string
      description: "MAC address in capital letters and without colons. Example: A8D236F08863"

- id: rest_remove_endpoint
  label: Remove an Endpoint from the Matrix
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/removeFromConfiguration"
  params:
    - name: MAC_address
      type: string

- id: rest_identify_endpoint
  label: Identify an Endpoint
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/identifyMe"
  params:
    - name: MAC_address
      type: string
  notes: "Front panel status LEDs blink for 10 seconds."

- id: rest_set_endpoint_alias
  label: Set Endpoint Alias Name
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/Alias"
  body: "<alias>"
  params:
    - name: MAC_address
      type: string
    - name: alias
      type: string
      description: "Non-empty, only [A-Z, 0-9, '_'], maximum 32 characters."

- id: rest_restart_endpoint
  label: Restart an Endpoint
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/restart"
  params:
    - name: MAC_address
      type: string

- id: rest_factory_reset_endpoint
  label: Restore Factory Defaults on an Endpoint
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/factoryReset"
  params:
    - name: MAC_address
      type: string

- id: rest_video_switch
  label: Switch Video Stream to One Destination
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/VIDEO/XP/switch"
  body: "<source_stream>:<destination_stream>"
  params:
    - name: source_stream
      type: string
      description: "<MAC>_S0 or <alias>_S0. Example: A8D236F08863_S0"
    - name: destination_stream
      type: string
      description: "<MAC>_D0 or <alias>_D0. Example: A8D236F08864_D0"

- id: rest_video_switch_all
  label: Switch Video Stream to All Destinations
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/VIDEO/XP/switchAll"
  body: "<source_stream>"
  params:
    - name: source_stream
      type: string

- id: rest_video_source_enable
  label: Enable/Disable Video Source Stream
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/VIDEO/<source_stream>/Enable"
  body: "<logical_value>"
  params:
    - name: source_stream
      type: string
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: rest_video_query_parameter
  label: Query Video Stream Parameter
  kind: query
  command: "GET http://<ip>/api/V1/MEDIA/VIDEO/<stream_ID>/<parameter>"
  params:
    - name: stream_ID
      type: string
      description: "<MAC>_S0 or <MAC>_D0"
    - name: parameter
      type: enum
      values: [SignalPresent, ActiveResolution, RefreshRate, ColorDepth, ColorSpace, ColorRange, SourceStream, SourceStreamAlias]

- id: rest_video_hdcp_source
  label: Set Allowed HDCP Version (Source Stream)
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/VIDEO/<source_stream>/HDCP/AllowedHdcpVersion"
  body: "<HDCP_encr>"
  params:
    - name: source_stream
      type: string
    - name: HDCP_encr
      type: enum
      values: ["off", "HDCP 1.4", "HDCP 2.2"]

- id: rest_video_hdcp_destination
  label: Set HDCP Output Mode (Destination Stream)
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/VIDEO/<destination_stream>/HDCP/HdcpOutputMode"
  body: "<HDCP_auth>"
  params:
    - name: destination_stream
      type: string
    - name: HDCP_auth
      type: enum
      values: ["FollowSource", "FollowSink (Always Follow)", "FollowSink (Follow Once)"]

- id: rest_query_edid_destination
  label: Query EDID Data of the Destination
  kind: query
  command: "GET http://<ip>/api/V1/MEDIA/VIDEO/<destination_stream>/EDID/Data"
  params:
    - name: destination_stream
      type: string

- id: rest_upload_edid_source
  label: Upload EDID Data for the Source
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/<source_stream>/EDID/setData"
  body: "<EDID_data>"
  params:
    - name: source_stream
      type: string
    - name: EDID_data
      type: string
      description: "Hex EDID payload. Example in source: 00ffffffffffff0010a6000156524c4208160103..."
  notes: "Source shows both '/api/V1/MEDIA/<source_stream>/EDID/setData' (syntax line) and '/api/V1/MEDIA/VIDEO/A8D236F08863_S0/EDID/setData' (worked example); both reproduced verbatim."

- id: rest_set_scaler_mode
  label: Set Scaler Display Mode (staged)
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/VIDEO/<destination_stream>/SCALING/StagedDisplayMode"
  body: "<scaler_mode>"
  params:
    - name: destination_stream
      type: string
    - name: scaler_mode
      type: enum
      values: [Genlock, GenlockScaling, FastSwitch, FastSwitchCrop, FastSwitchStretch, GenlockWall, FastSwitchWall, Multiview]
  notes: "-SR scaling receiver models only. applySettings must be called afterwards."

- id: rest_set_scaler_resolution
  label: Set Scaler Resolution (staged)
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/VIDEO/<destination_stream>/SCALING/StagedFormatName"
  body: "<resolution>"
  params:
    - name: destination_stream
      type: string
    - name: resolution
      type: enum
      values: ["640x480p60", "720x480p60", "720x480p60(16:9)", "720x576p50", "720x576p50(16:9)", "1280x720p24", "1280x720p25", "1280x720p30", "1280x720p50", "1280x720p60", "1920x1080p24", "1920x1080p25", "1920x1080p30", "1920x1080p50", "1920x1080p60", "3840x2160p24", "3840x2160p25", "3840x2160p30", "3840x2160p50", "3840x2160p60", "4096x2160p24", "4096x2160p25", "4096x2160p30", "4096x2160p50", "4096x2160p60"]

- id: rest_scaler_apply_settings
  label: Apply Scaler Settings
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/VIDEO/<destination_stream>/SCALING/applySettings"
  params:
    - name: destination_stream
      type: string
  notes: "Required to apply staged scaler settings."

- id: rest_audio_follow_video
  label: Enable/Disable Audio Follow Video
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/AUDIO/XP/FollowVideo"
  body: "<logical_value>"
  params:
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: rest_audio_switch
  label: Switch Audio Stream to One Destination
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/AUDIO/XP/switch"
  body: "<source_stream>:<destination_stream>"
  params:
    - name: source_stream
      type: string
    - name: destination_stream
      type: string

- id: rest_audio_switch_all
  label: Switch Audio Stream to All Destinations
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/AUDIO/XP/switchAll"
  body: "<source_stream>"
  params:
    - name: source_stream
      type: string

- id: rest_audio_source_enable
  label: Enable/Disable Audio Source Stream
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/AUDIO/<source_stream>/Enable"
  body: "<logical_value>"
  params:
    - name: source_stream
      type: string
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: rest_audio_query_parameter
  label: Query Audio Stream Parameter
  kind: query
  command: "GET http://<ip>/api/V1/MEDIA/AUDIO/<stream_ID>/<parameter>"
  params:
    - name: stream_ID
      type: string
    - name: parameter
      type: enum
      values: [SignalPresent, SignalType, SamplingFreq, NumberOfChannels, SampleSize, SourceStream, SourceStreamAlias]

- id: rest_set_dhcp_enabled
  label: Set DHCP State (Control LAN)
  kind: action
  command: "POST http://<ip>/api/V1/MANAGEMENT/NETWORK/DhcpEnabled"
  body: "<logical_value>"
  params:
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: rest_set_static_ip
  label: Set Static IP Address (Control LAN)
  kind: action
  command: "POST http://<ip>/api/V1/MANAGEMENT/NETWORK/StaticIpAddress"
  body: "<IP_address>"
  params:
    - name: IP_address
      type: string

- id: rest_set_static_netmask
  label: Set Static Subnet Mask (Control LAN)
  kind: action
  command: "POST http://<ip>/api/V1/MANAGEMENT/NETWORK/StaticNetworkMask"
  body: "<netmask>"
  params:
    - name: netmask
      type: string

- id: rest_set_static_gateway
  label: Set Static Gateway Address (Control LAN)
  kind: action
  command: "POST http://<ip>/api/V1/MANAGEMENT/NETWORK/StaticGatewayAddress"
  body: "<gw_address>"
  params:
    - name: gw_address
      type: string

- id: rest_network_apply_settings
  label: Apply Network Settings
  kind: action
  command: "POST http://<ip>/api/V1/MANAGEMENT/NETWORK/applySettings"
  params: []
  notes: "Body has to be empty, content type text/plain. Saves and applies staged network values and reboots the network interface."

- id: rest_set_hostname
  label: Set Hostname
  kind: action
  command: "POST http://<ip>/api/V1/MANAGEMENT/NETWORK/HostName"
  body: "<unique_name>"
  params:
    - name: unique_name
      type: string
      description: "1-64 characters, English alphabet and numbers; hyphen and dot accepted except as last character."

- id: rest_query_service_port
  label: Query Network Service Port Number
  kind: query
  command: "GET http://<ip>/api/V1/MANAGEMENT/NETWORK/SERVICES/<port>/Port"
  params:
    - name: port
      type: enum
      values: [HTTP, HTTPS, LW3, "BLUERIVER/TCI", "BLUERIVER/HTTP"]

- id: rest_set_service_enabled
  label: Enable/Disable Network Service Port
  kind: action
  command: "POST http://<ip>/api/V1/MANAGEMENT/NETWORK/SERVICES/<port>/Enabled"
  body: "<status>"
  params:
    - name: port
      type: enum
      values: [HTTP, HTTPS]
    - name: status
      type: enum
      values: ["true", "false"]
  notes: "Source syntax line shows GET for this row; the worked example uses POST (POST .../SERVICES/HTTP/Enabled --data false). POST reproduced here."

- id: rest_set_authentication_enabled
  label: Enable/Disable Basic Authentication
  kind: action
  command: "POST http://<ip>/api/V1/MANAGEMENT/NETWORK/SERVICES/<port>/AuthenticationEnabled"
  body: "<status>"
  params:
    - name: port
      type: enum
      values: [HTTP, HTTPS]
    - name: status
      type: enum
      values: ["true", "false"]

- id: rest_set_auth_password
  label: Set Authentication Password
  kind: action
  command: "POST <ip>/api/V1/MANAGEMENT/NETWORK/AUTHENTICATION/setPassword"
  body: "<new_password>"
  params:
    - name: new_password
      type: string
      description: "Min 10, max 100 UTF-8 characters (per Update Options / password criteria)."

- id: rest_restart_http_service
  label: Restart HTTP Network Service
  kind: action
  command: "POST <ip>/api/V1/MANAGEMENT/NETWORK/SERVICES/HTTP/restart"
  params: []
  notes: "Step 3 of the authentication enable procedure."

- id: rest_sdvoe_dhcp_state
  label: Set DHCP State for SDVoE Component
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/SDVOE/NETWORK/StagedIpAcquisitionMode"
  body: "<logical_value>"
  params:
    - name: MAC_address
      type: string
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: rest_sdvoe_static_ip
  label: Set Static IP Address for SDVoE Component
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/SDVOE/NETWORK/StagedIpAddress"
  body: "<IP_address>"
  params:
    - name: MAC_address
      type: string
    - name: IP_address
      type: string

- id: rest_sdvoe_static_netmask
  label: Set Static Subnet Mask for SDVoE Component
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/SDVOE/NETWORK/StagedSubnetMask"
  body: "<netmask>"
  params:
    - name: MAC_address
      type: string
    - name: netmask
      type: string

- id: rest_sdvoe_static_gateway
  label: Set Static Gateway Address for SDVoE Component
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/SDVOE/NETWORK/StagedGatewayAddress"
  body: "<gw_address>"
  params:
    - name: MAC_address
      type: string
    - name: gw_address
      type: string

- id: rest_icron_dhcp_state
  label: Set DHCP State for Icron Component
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/NETWORK/StagedIpAcquisitionMode"
  body: "<logical_value>"
  params:
    - name: MAC_address
      type: string
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: rest_icron_static_ip
  label: Set Static IP Address for Icron Component
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/NETWORK/StagedIpAddress"
  body: "<IP_address>"
  params:
    - name: MAC_address
      type: string
    - name: IP_address
      type: string

- id: rest_icron_static_netmask
  label: Set Static Subnet Mask for Icron Component
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/NETWORK/StagedSubnetMask"
  body: "<netmask>"
  params:
    - name: MAC_address
      type: string
    - name: netmask
      type: string

- id: rest_icron_static_gateway
  label: Set Static Gateway Address for Icron Component
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/NETWORK/StagedGatewayAddress"
  body: "<gw_address>"
  params:
    - name: MAC_address
      type: string
    - name: gw_address
      type: string

- id: rest_serial_set_baudrate
  label: Set Serial BAUD Rate
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/SERIAL/<serial_port>/BaudRate"
  body: "<baudrate>"
  params:
    - name: serial_port
      type: string
      description: "<MAC>_P1. Example: A8D236F08863_P1"
    - name: baudrate
      type: enum
      values: [9600, 19200, 38400, 57600, 115200]

- id: rest_serial_set_stopbits
  label: Set Serial Stop Bits
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/SERIAL/<serial_port>/StopBits"
  body: "<stopbits>"
  params:
    - name: serial_port
      type: string
    - name: stopbits
      type: enum
      values: [1, 2]

- id: rest_serial_query_databits
  label: Query Serial Data Bits
  kind: query
  command: "GET http://<ip>/api/V1/MEDIA/SERIAL/<serial_port>/DataBits"
  params:
    - name: serial_port
      type: string

- id: rest_serial_set_parity
  label: Set Serial Parity
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/SERIAL/<serial_port>/Parity"
  body: "<parity>"
  params:
    - name: serial_port
      type: string
    - name: parity
      type: enum
      values: [None, Odd, Even]

- id: rest_serial_query_configuration
  label: Query Serial Port Configuration
  kind: query
  command: "GET http://<ip>/api/V1/MEDIA/SERIAL/<serial_port>/Configuration"
  params:
    - name: serial_port
      type: string
  notes: "Response format example: '115200, 8N1'."

- id: rest_serial_service_enabled
  label: Enable/Disable Serial over IP Port
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/SERIAL/<serial_port>/SERVICE/Enabled"
  body: "<logical_value>"
  params:
    - name: serial_port
      type: string
    - name: logical_value
      type: enum
      values: ["true", "false"]
  notes: "Must be enabled for the RS-232 command injection feature."

- id: rest_serial_command_injection
  label: Command Injection over Serial Port
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/SERIAL/<port_ID>/SERVICE/send"
  body: "<data>"
  params:
    - name: MAC_address
      type: string
    - name: port_ID
      type: enum
      values: [P1, P2]
    - name: data
      type: string
      description: "Control command of the connected source or sink device in ASCII code. Example body from source: 02 50 4F 4E 03"
  notes: "Implemented only in REST API, not in LW3 protocol."

- id: rest_usbhid_follow_video
  label: Enable/Disable USB HID Follow Video
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/USBHID/XP/FollowVideo"
  body: "<logical_value>"
  params:
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: rest_usbhid_switch
  label: Switch USB HID Stream to One Destination
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/USBHID/XP/switch"
  body: "<source_stream>:<destination_stream>"
  params:
    - name: source_stream
      type: string
    - name: destination_stream
      type: string

- id: rest_usbhid_switch_all
  label: Switch USB HID Stream to All Destinations
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/USBHID/XP/switchAll"
  body: "<source_stream>"
  params:
    - name: source_stream
      type: string

- id: rest_usbhid_source_enable
  label: Enable/Disable USB HID Source Stream
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/USBHID/<source_stream>/Enable"
  body: "<logical_value>"
  params:
    - name: source_stream
      type: string
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: rest_usbhid_query_parameter
  label: Query USB HID Signal Parameter
  kind: query
  command: "GET http://<ip>/api/V1/MEDIA/USBHID/<stream_ID>/<parameter>"
  params:
    - name: stream_ID
      type: string
    - name: parameter
      type: enum
      values: [SignalPresent, Role, ConnectedDeviceNumber, HostStatus, SourceStream, SourceStreamAlias]

- id: rest_usbicron_follow_video
  label: Enable/Disable Icron USB Follow Video
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/USBICRON/XP/FollowVideo"
  body: "<logical_value>"
  params:
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: rest_usbicron_switch
  label: Switch Icron USB Stream to One Destination
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/USBICRON/XP/switch"
  body: "<source_stream>:<destination_stream>"
  params:
    - name: source_stream
      type: string
    - name: destination_stream
      type: string

- id: rest_usbicron_switch_all
  label: Switch Icron USB Stream to All Destinations
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/USBICRON/XP/switchAll"
  body: "<source_stream>"
  params:
    - name: source_stream
      type: string

- id: rest_usbicron_query_parameter
  label: Query Icron USB Signal Parameter
  kind: query
  command: "GET http://<ip>/api/V1/MEDIA/USBICRON/<stream_ID>/<parameter>"
  params:
    - name: stream_ID
      type: string
    - name: parameter
      type: enum
      values: [SignalPresent, LinkStatus, DevicePairing, SourceStream, SourceStreamAlias]

- id: rest_icron_query_mac
  label: Query MAC Address of the Icron Module
  kind: query
  command: "GET http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/MacAddress"
  params:
    - name: MAC_address
      type: string

- id: rest_icron_query_mode
  label: Query Operation Mode of the Icron Device
  kind: query
  command: "GET http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/Mode"
  params:
    - name: MAC_address
      type: string
  notes: "Returns LEX (Local Extender) or REX (Remote Extender)."

- id: rest_icron_set_usb_mode
  label: Set USB Mode of the Icron Device
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/UsbMode"
  body: "<USB_mode>"
  params:
    - name: MAC_address
      type: string
    - name: USB_mode
      type: enum
      values: [SUI, MSA]

- id: rest_icron_remove_all_pairings
  label: Remove All Pairings of the Icron Device
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/removeAllPairings"
  params:
    - name: MAC_address
      type: string

- id: rest_icron_recover_with_dhcp
  label: Recover the Icron Module with DHCP
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/recoverWithDhcp"
  params:
    - name: MAC_address
      type: string

- id: rest_icron_recover_with_static_ip
  label: Recover the Icron Module with Static IP Address
  kind: action
  command: "POST http://<ip>/api/V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/recoverWithStaticIp"
  body: "<IP_address>,<subnet_mask>,<gateway_address>"
  params:
    - name: MAC_address
      type: string
    - name: IP_address
      type: string
    - name: subnet_mask
      type: string
    - name: gateway_address
      type: string

- id: rest_set_ocs_sensor_type
  label: Set OCS Sensor Type
  kind: action
  command: "POST http://<ip>/api/V1/MEDIA/OCS/P1/SensorType"
  body: "<value>"
  params:
    - name: value
      type: string
      description: "Example value from source: Active low"
  notes: "Appears only as a terminal-usage worked example (section 8.2.2 POST Command Example 2); no parameter table is given for it."

# --- LW3 protocol (chapter 9): ASCII command lines, CrLf terminated ---

- id: lw3_get
  label: LW3 GET (generic)
  kind: query
  command: "GET /<NODEPATH>.<PropertyName>"
  params:
    - name: NODEPATH
      type: string
    - name: PropertyName
      type: string
  notes: "Also usable without a property to list child nodes of a node."

- id: lw3_getall
  label: LW3 GETALL (generic)
  kind: query
  command: "GETALL /<NODEPATH>"
  params:
    - name: NODEPATH
      type: string

- id: lw3_set
  label: LW3 SET (generic)
  kind: action
  command: "SET /<NODEPATH>.<PropertyName>=<new_value>"
  params:
    - name: NODEPATH
      type: string
    - name: PropertyName
      type: string
    - name: new_value
      type: string

- id: lw3_call
  label: LW3 CALL (generic)
  kind: action
  command: "CALL /<NODEPATH>:<methodName>(<value>)"
  params:
    - name: NODEPATH
      type: string
    - name: methodName
      type: string
    - name: value
      type: string

- id: lw3_man
  label: LW3 MAN (manual for a node, property or method)
  kind: query
  command: "MAN /<NODEPATH>"
  params:
    - name: NODEPATH
      type: string
  notes: "Example from source: MAN /V1/MEDIA/USBHID/XP:switch"

- id: lw3_open_node
  label: LW3 OPEN (subscribe to a node)
  kind: action
  command: "OPEN /<NODEPATH>"
  params:
    - name: NODEPATH
      type: string

- id: lw3_open_wildcard
  label: LW3 OPEN (subscribe to multiple nodes)
  kind: action
  command: "OPEN /<NODEPATH>/*"
  params:
    - name: NODEPATH
      type: string

- id: lw3_open_list
  label: LW3 OPEN (list active subscriptions)
  kind: query
  command: "OPEN"
  params: []

- id: lw3_close_node
  label: LW3 CLOSE (unsubscribe from a node)
  kind: action
  command: "CLOSE /<NODEPATH>"
  params:
    - name: NODEPATH
      type: string

- id: lw3_close_wildcard
  label: LW3 CLOSE (unsubscribe from multiple nodes)
  kind: action
  command: "CLOSE /<NODEPATH>/*"
  params:
    - name: NODEPATH
      type: string

- id: lw3_set_device_label
  label: Set Device Label (LW3)
  kind: action
  command: "SET /V1/MANAGEMENT/LABEL.DeviceLabel=<custom_name>"
  params:
    - name: custom_name
      type: string
      description: "Max 49 ASCII characters."

- id: lw3_restart_device
  label: Restart the MMU (LW3)
  kind: action
  command: "CALL /V1/SYS:restart()"
  params: []

- id: lw3_factory_defaults
  label: Restore Factory Default Settings (LW3)
  kind: action
  command: "CALL /V1/SYS:factoryDefaults()"
  params: []

- id: lw3_query_package_version
  label: Query Firmware Package Version (LW3)
  kind: query
  command: "GET /V1/MANAGEMENT/UID/PACKAGE.Version"
  params: []

- id: lw3_query_package_version_short
  label: Query Firmware Package Version (short path)
  kind: query
  command: "GET /V1.PackageVersion"
  params: []

- id: lw3_query_serial_number
  label: Query Serial Number (LW3)
  kind: query
  command: "GET /V1.SerialNumber"
  params: []

- id: lw3_set_time
  label: Set Date and Time Manually (LW3)
  kind: action
  command: "CALL /V1/MANAGEMENT/DATETIME:setTime(<date_time>)"
  params:
    - name: date_time
      type: string
      description: "ISO 8601 date time format."

- id: lw3_set_ntp_enabled
  label: Enable/Disable NTP (LW3)
  kind: action
  command: "SET /V1/MANAGEMENT/DATETIME/NTP.Enabled=<logical_value>"
  params:
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: lw3_set_ntp_server
  label: Set NTP Server (LW3)
  kind: action
  command: "SET /V1/MANAGEMENT/DATETIME/NTP.ServerPool=<server_address>"
  params:
    - name: server_address
      type: string

- id: lw3_discover_endpoints
  label: Discover Endpoints on the Network (LW3)
  kind: action
  command: "CALL /V1/DEVICES:discover()"
  params: []

- id: lw3_add_endpoint
  label: Add an Endpoint to the Matrix (LW3)
  kind: action
  command: "CALL /V1/DEVICES/<MAC_address>:addToMainGroup()"
  params:
    - name: MAC_address
      type: string

- id: lw3_remove_endpoint
  label: Remove an Endpoint from the Matrix (LW3)
  kind: action
  command: "CALL /V1/DEVICES/<MAC_address>:removeFromConfiguration()"
  params:
    - name: MAC_address
      type: string

- id: lw3_identify_endpoint
  label: Identify an Endpoint (LW3)
  kind: action
  command: "CALL /V1/DEVICES/<MAC_address>:identifyMe()"
  params:
    - name: MAC_address
      type: string

- id: lw3_set_endpoint_alias
  label: Set Endpoint Alias Name (LW3)
  kind: action
  command: "SET /V1/DEVICES/<MAC_address>.Alias=<alias>"
  params:
    - name: MAC_address
      type: string
    - name: alias
      type: string
      description: "Non-empty, only [A-Z, 0-9, '_'], maximum 32 characters."

- id: lw3_restart_endpoint
  label: Restart an Endpoint (LW3)
  kind: action
  command: "CALL /V1/DEVICES/<MAC_address>:restart()"
  params:
    - name: MAC_address
      type: string

- id: lw3_factory_reset_endpoint
  label: Restore Factory Defaults on an Endpoint (LW3)
  kind: action
  command: "CALL /V1/DEVICES/<MAC_address>:factoryReset()"
  params:
    - name: MAC_address
      type: string

- id: lw3_video_switch
  label: Switch Video Stream to One Destination (LW3)
  kind: action
  command: "CALL /V1/MEDIA/VIDEO/XP:switch(<source_stream>:<destination_stream>)"
  params:
    - name: source_stream
      type: string
    - name: destination_stream
      type: string

- id: lw3_video_switch_all
  label: Switch Video Stream to All Destinations (LW3)
  kind: action
  command: "CALL /V1/MEDIA/VIDEO/XP:switchAll(<source_stream>)"
  params:
    - name: source_stream
      type: string

- id: lw3_video_query_all
  label: Query All Video Stream Parameters (LW3)
  kind: query
  command: "GETALL /V1/MEDIA/VIDEO/<stream_ID>"
  params:
    - name: stream_ID
      type: string

- id: lw3_video_source_enable
  label: Enable/Disable Video Source Stream (LW3)
  kind: action
  command: "SET /V1/MEDIA/VIDEO/<source_stream>.Enabled=<logical_value>"
  params:
    - name: source_stream
      type: string
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: lw3_video_hdcp_source
  label: Set Allowed HDCP Version, Source Stream (LW3)
  kind: action
  command: "SET /V1/MEDIA/VIDEO/<source_stream>/HDCP.AllowedHdcpVersion=<HDCP_encr>"
  params:
    - name: source_stream
      type: string
    - name: HDCP_encr
      type: enum
      values: ["off", "HDCP 1.4", "HDCP 2.2"]

- id: lw3_video_hdcp_destination
  label: Set HDCP Output Mode, Destination Stream (LW3)
  kind: action
  command: "SET /V1/MEDIA/VIDEO/<destination_stream>/HDCP.HdcpOutputMode=<HDCP_auth>"
  params:
    - name: destination_stream
      type: string
    - name: HDCP_auth
      type: enum
      values: ["FollowSource", "FollowSink (Always Follow)", "FollowSink (Follow Once)"]

- id: lw3_query_edid_destination
  label: Query EDID Data of the Destination (LW3)
  kind: query
  command: "GET /V1/MEDIA/VIDEO/<destination_stream>/EDID.Data"
  params:
    - name: destination_stream
      type: string

- id: lw3_upload_edid_source
  label: Upload EDID Data for the Source (LW3)
  kind: action
  command: "CALL /V1/MEDIA/VIDEO/<source_stream>/EDID:setData(<EDID_data>)"
  params:
    - name: source_stream
      type: string
    - name: EDID_data
      type: string

- id: lw3_set_scaler_mode
  label: Set Scaler Display Mode, staged (LW3)
  kind: action
  command: "SET /V1/MEDIA/VIDEO/<destination_stream>/SCALING.StagedDisplayMode=<scaler_mode>"
  params:
    - name: destination_stream
      type: string
    - name: scaler_mode
      type: enum
      values: [Genlock, GenlockScaling, FastSwitch, FastSwitchCrop, FastSwitchStretch, GenlockWall, FastSwitchWall, Multiview]

- id: lw3_set_scaler_resolution
  label: Set Scaler Resolution, staged (LW3)
  kind: action
  command: "SET /V1/MEDIA/VIDEO/<destination_stream>/SCALING.StagedFormatName=<resolution>"
  params:
    - name: destination_stream
      type: string
    - name: resolution
      type: string
      description: "Same resolution list as the REST scaler resolution action."

- id: lw3_scaler_apply_settings
  label: Apply Scaler Settings (LW3)
  kind: action
  command: "CALL /V1/MEDIA/VIDEO/<destination_stream>/SCALING:applySettings()"
  params:
    - name: destination_stream
      type: string

- id: lw3_audio_follow_video
  label: Enable/Disable Audio Follow Video (LW3)
  kind: action
  command: "SET /V1/MEDIA/AUDIO/XP.FollowVideo=<logical_value>"
  params:
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: lw3_audio_switch
  label: Switch Audio Stream to One Destination (LW3)
  kind: action
  command: "CALL /V1/MEDIA/AUDIO/XP:switch(<source_stream>:<destination_stream>)"
  params:
    - name: source_stream
      type: string
    - name: destination_stream
      type: string

- id: lw3_audio_switch_all
  label: Switch Audio Stream to All Destinations (LW3)
  kind: action
  command: "CALL /V1/MEDIA/AUDIO/XP:switchAll(<source_stream>)"
  params:
    - name: source_stream
      type: string

- id: lw3_audio_source_enable
  label: Enable/Disable Audio Source Stream (LW3)
  kind: action
  command: "SET /V1/MEDIA/AUDIO/<source_stream>.Enabled=<logical_value>"
  params:
    - name: source_stream
      type: string
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: lw3_audio_query_all
  label: Query All Audio Stream Parameters (LW3)
  kind: query
  command: "GETALL /V1/MEDIA/AUDIO/<stream_ID>"
  params:
    - name: stream_ID
      type: string

- id: lw3_set_dhcp_enabled
  label: Set DHCP State, Control LAN (LW3)
  kind: action
  command: "SET /V1/MANAGEMENT/NETWORK.DhcpEnabled=<dhcp_status>"
  params:
    - name: dhcp_status
      type: enum
      values: ["true", "false"]

- id: lw3_set_static_ip
  label: Set Static IP Address, Control LAN (LW3)
  kind: action
  command: "SET /V1/MANAGEMENT/NETWORK.StaticIpAddress=<IP_address>"
  params:
    - name: IP_address
      type: string

- id: lw3_set_static_netmask
  label: Set Static Subnet Mask, Control LAN (LW3)
  kind: action
  command: "SET /V1/MANAGEMENT/NETWORK.StaticNetworkMask=<netmask>"
  params:
    - name: netmask
      type: string

- id: lw3_set_static_gateway
  label: Set Static Gateway Address, Control LAN (LW3)
  kind: action
  command: "SET /V1/MANAGEMENT/NETWORK.StaticGatewayAddress=<gw_address>"
  params:
    - name: gw_address
      type: string

- id: lw3_set_hostname
  label: Set Hostname (LW3)
  kind: action
  command: "SET /V1/MANAGEMENT/NETWORK.HostName=<unique_name>"
  params:
    - name: unique_name
      type: string
      description: "1-64 characters; hyphen and dot accepted except as last character."

- id: lw3_network_apply_settings
  label: Apply Network Settings (LW3)
  kind: action
  command: "CALL /V1/MANAGEMENT/NETWORK:applySettings()"
  params: []

- id: lw3_query_service_port
  label: Query Service Port Number (LW3)
  kind: query
  command: "GET /V1/MANAGEMENT/NETWORK/SERVICES/<port>.Port"
  params:
    - name: port
      type: enum
      values: [HTTP, HTTPS, LW3, "BLUERIVER/TCI", "BLUERIVER/HTTP"]

- id: lw3_set_service_enabled
  label: Enable/Disable Network Service Port (LW3)
  kind: action
  command: "SET /V1/MANAGEMENT/NETWORK/SERVICES/<port>.Enabled=<status>"
  params:
    - name: port
      type: enum
      values: [HTTP, HTTPS]
    - name: status
      type: enum
      values: ["true", "false"]

- id: lw3_set_authentication_enabled
  label: Enable/Disable Authentication (LW3)
  kind: action
  command: "SET /V1/MANAGEMENT/NETWORK/SERVICES/<port>.AuthenticationEnabled=<status>"
  params:
    - name: port
      type: enum
      values: [HTTP, HTTPS]
    - name: status
      type: enum
      values: ["true", "false"]

- id: lw3_sdvoe_dhcp_state
  label: Set DHCP State for SDVoE Component (LW3)
  kind: action
  command: "SET /V1/DEVICES/<MAC_address>/COMPONENTS/SDVOE/NETWORK/StagedIpAcquisitionMode=<dhcp_status>"
  params:
    - name: MAC_address
      type: string
    - name: dhcp_status
      type: enum
      values: ["true", "false"]

- id: lw3_sdvoe_static_ip
  label: Set Static IP Address for SDVoE Component (LW3)
  kind: action
  command: "SET /V1/DEVICES/<MAC_address>/COMPONENTS/SDVOE/NETWORK/StagedIpAddress=<IP_address>"
  params:
    - name: MAC_address
      type: string
    - name: IP_address
      type: string

- id: lw3_sdvoe_static_netmask
  label: Set Static Subnet Mask for SDVoE Component (LW3)
  kind: action
  command: "SET /V1/DEVICES/<MAC_address>/COMPONENTS/SDVOE/NETWORK/StagedSubnetMask=<netmask>"
  params:
    - name: MAC_address
      type: string
    - name: netmask
      type: string

- id: lw3_sdvoe_static_gateway
  label: Set Static Gateway Address for SDVoE Component (LW3)
  kind: action
  command: "SET /V1/DEVICES/<MAC_address>/COMPONENTS/SDVOE/NETWORK/StagedGatewayAddress=<gw_address>"
  params:
    - name: MAC_address
      type: string
    - name: gw_address
      type: string

- id: lw3_icron_dhcp_state
  label: Set DHCP State for Icron Component (LW3)
  kind: action
  command: "SET /V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/NETWORK/StagedIpAcquisitionMode=<dhcp_status>"
  params:
    - name: MAC_address
      type: string
    - name: dhcp_status
      type: enum
      values: ["true", "false"]

- id: lw3_icron_static_ip
  label: Set Static IP Address for Icron Component (LW3)
  kind: action
  command: "SET /V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/NETWORK/StagedIpAddress=<IP_address>"
  params:
    - name: MAC_address
      type: string
    - name: IP_address
      type: string

- id: lw3_icron_static_netmask
  label: Set Static Subnet Mask for Icron Component (LW3)
  kind: action
  command: "SET /V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/NETWORK/StagedSubnetMask=<netmask>"
  params:
    - name: MAC_address
      type: string
    - name: netmask
      type: string

- id: lw3_icron_static_gateway
  label: Set Static Gateway Address for Icron Component (LW3)
  kind: action
  command: "SET /V1/DEVICES/<MAC_address>/COMPONENTS/ICRON/NETWORK/StagedGatewayAddress=<gw_address>"
  params:
    - name: MAC_address
      type: string
    - name: gw_address
      type: string

- id: lw3_serial_set_baudrate
  label: Set Serial BAUD Rate (LW3)
  kind: action
  command: "SET /V1/MEDIA/SERIAL/<serial_port>.BaudRate=<baudrate>"
  params:
    - name: serial_port
      type: string
      description: "<MAC>_P1"
    - name: baudrate
      type: enum
      values: [9600, 19200, 38400, 57600, 115200]
  notes: "Worked example in source uses the spelling '.Baudrate=19200'; syntax line uses '.BaudRate'."

- id: lw3_serial_set_stopbits
  label: Set Serial Stop Bits (LW3)
  kind: action
  command: "SET /V1/MEDIA/SERIAL/<serial_port>.StopBits=<stopbits>"
  params:
    - name: serial_port
      type: string
    - name: stopbits
      type: enum
      values: [1, 2]

- id: lw3_serial_query_databits
  label: Query Serial Data Bits (LW3)
  kind: query
  command: "GET /V1/MEDIA/SERIAL/<serial_port>.DataBits"
  params:
    - name: serial_port
      type: string

- id: lw3_serial_set_parity
  label: Set Serial Parity (LW3)
  kind: action
  command: "SET /V1/MEDIA/SERIAL/<serial_port>.Parity=<parity>"
  params:
    - name: serial_port
      type: string
    - name: parity
      type: enum
      values: [None, Odd, Even]

- id: lw3_serial_query_configuration
  label: Query Serial Port Configuration (LW3)
  kind: query
  command: "GET /V1/MEDIA/SERIAL/<serial_port>.Configuration"
  params:
    - name: serial_port
      type: string

- id: lw3_serial_service_enabled
  label: Enable/Disable Serial over IP Port (LW3)
  kind: action
  command: "SET /V1/MEDIA/SERIAL/<serial_port>/SERVICE.Enabled=<logical_value>"
  params:
    - name: serial_port
      type: string
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: lw3_usbhid_follow_video
  label: Enable/Disable USB HID Follow Video (LW3)
  kind: action
  command: "SET /V1/MEDIA/USBHID/XP.FollowVideo=<logical_value>"
  params:
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: lw3_usbhid_switch
  label: Switch USB HID Stream to One Destination (LW3)
  kind: action
  command: "CALL /V1/MEDIA/USBHID/XP:switch(<source_stream>:<destination_stream>)"
  params:
    - name: source_stream
      type: string
    - name: destination_stream
      type: string

- id: lw3_usbhid_switch_all
  label: Switch USB HID Stream to All Destinations (LW3)
  kind: action
  command: "CALL /V1/MEDIA/USBHID/XP:switchAll(<source_stream>)"
  params:
    - name: source_stream
      type: string

- id: lw3_usbhid_source_enable
  label: Enable/Disable USB HID Source Stream (LW3)
  kind: action
  command: "SET /V1/MEDIA/USBHID/<source_stream>.Enabled=<logical_value>"
  params:
    - name: source_stream
      type: string
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: lw3_usbhid_query_all
  label: Query All USB HID Signal Parameters (LW3)
  kind: query
  command: "GETALL /V1/MEDIA/USBHID/<stream_ID>"
  params:
    - name: stream_ID
      type: string

- id: lw3_usbicron_follow_video
  label: Enable/Disable Icron USB Follow Video (LW3)
  kind: action
  command: "SET /V1/MEDIA/USBICRON/XP.FollowVideo=<logical_value>"
  params:
    - name: logical_value
      type: enum
      values: ["true", "false"]

- id: lw3_usbicron_switch
  label: Switch Icron USB Stream to One Destination (LW3)
  kind: action
  command: "CALL /V1/MEDIA/USBICRON/XP:switch(<source_stream>:<destination_stream>)"
  params:
    - name: source_stream
      type: string
    - name: destination_stream
      type: string

- id: lw3_usbicron_switch_all
  label: Switch Icron USB Stream to All Destinations (LW3)
  kind: action
  command: "CALL /V1/MEDIA/USBICRON/XP:switchAll(<source_stream>)"
  params:
    - name: source_stream
      type: string

- id: lw3_usbicron_query_all
  label: Query All Icron USB Signal Parameters (LW3)
  kind: query
  command: "GETALL /V1/MEDIA/USBICRON/<stream_ID>"
  params:
    - name: stream_ID
      type: string

- id: lw3_icron_query_mac
  label: Query MAC Address of the Icron Module (LW3)
  kind: query
  command: "GET /V1/DEVICES/<MAC_address>/COMPONENTS/ICRON.MacAddress"
  params:
    - name: MAC_address
      type: string

- id: lw3_icron_query_mode
  label: Query Operation Mode of the Icron Device (LW3)
  kind: query
  command: "GET /V1/DEVICES/<MAC_address>/COMPONENTS/ICRON.Mode"
  params:
    - name: MAC_address
      type: string

- id: lw3_icron_set_usb_mode
  label: Set USB Mode of the Icron Device (LW3)
  kind: action
  command: "SET /V1/DEVICES/<MAC_address>/COMPONENTS/ICRON.UsbMode=<USB_mode>"
  params:
    - name: MAC_address
      type: string
    - name: USB_mode
      type: enum
      values: [SUI, MSA]

- id: lw3_icron_remove_all_pairings
  label: Remove All Pairings of the Icron Device (LW3)
  kind: action
  command: "CALL /V1/DEVICES/<MAC_address>/COMPONENTS/ICRON:removeAllPairings()"
  params:
    - name: MAC_address
      type: string

- id: lw3_icron_recover_with_dhcp
  label: Recover the Icron Module with DHCP (LW3)
  kind: action
  command: "CALL /V1/DEVICES/<MAC_address>/COMPONENTS/ICRON:recoverWithDhcp()"
  params:
    - name: MAC_address
      type: string

- id: lw3_icron_recover_with_static_ip
  label: Recover the Icron Module with Static IP Address (LW3)
  kind: action
  command: "CALL /V1/DEVICES/<MAC_address>/COMPONENTS/ICRON:recoverWithStaticIp(<IP_address>,<subnet_mask>,<gateway_address>)"
  params:
    - name: MAC_address
      type: string
    - name: IP_address
      type: string
    - name: subnet_mask
      type: string
    - name: gateway_address
      type: string
```

## Feedbacks
```yaml
# Video stream parameters (REST GET .../MEDIA/VIDEO/<stream_ID>/<parameter>; LW3 GETALL)
- id: video_signal_present
  type: enum
  values: ["true", "false"]
  source_parameter: SignalPresent

- id: video_active_resolution
  type: string
  source_parameter: ActiveResolution
  example: "3840x2160"

- id: video_refresh_rate
  type: string
  source_parameter: RefreshRate
  example: "60.00"

- id: video_color_depth
  type: enum
  values: ["8 bpc", "10 bpc", "12 bpc"]
  source_parameter: ColorDepth

- id: video_color_space
  type: enum
  values: ["RGB", "YCbCr 4:4:4", "YCbCr 4:2:2", "YCbCr 4:2:0"]
  source_parameter: ColorSpace

- id: video_color_range
  type: enum
  values: [Default, Full, Limited]
  source_parameter: ColorRange

- id: video_source_stream
  type: string
  source_parameter: SourceStream
  example: "A8D236F08863_S0"

- id: video_source_stream_alias
  type: string
  source_parameter: SourceStreamAlias
  example: "MTR_TX_S0"

# Additional video properties observed in the GETALL worked example
- id: video_total_resolution
  type: string
  source_parameter: TotalResolution
  example: "4400x2250"

- id: video_multicast_source_address
  type: string
  source_parameter: MulticastSourceAddress
  example: "224.1.1.3"

- id: video_stream_alias
  type: string
  source_parameter: StreamAlias

- id: video_stream_id
  type: string
  source_parameter: StreamId
  example: "D0"

- id: video_device_alias
  type: string
  source_parameter: DeviceAlias

# Audio stream parameters
- id: audio_signal_present
  type: enum
  values: ["true", "false"]
  source_parameter: SignalPresent

- id: audio_signal_type
  type: enum
  values: [PCM, HBR, Other, "N/A"]
  source_parameter: SignalType

- id: audio_sampling_freq
  type: enum
  values: ["22.05 kHz", "24 kHz", "32 kHz", "44.1 kHz", "48 kHz", "88.2 kHz", "96 kHz", "176.4 kHz", "192 kHz", "768 kHz", "N/A"]
  source_parameter: SamplingFreq

- id: audio_number_of_channels
  type: integer
  source_parameter: NumberOfChannels

- id: audio_sample_size
  type: integer
  source_parameter: SampleSize
  units: bits

# USB HID parameters
- id: usbhid_signal_present
  type: enum
  values: ["true", "false"]
  source_parameter: SignalPresent

- id: usbhid_role
  type: enum
  values: [Disabled, Local, Remote]
  source_parameter: Role

- id: usbhid_connected_device_number
  type: integer
  source_parameter: ConnectedDeviceNumber

- id: usbhid_host_status
  type: enum
  values: [Disconnected, Configuring, Connected]
  source_parameter: HostStatus

# Icron USB parameters
- id: icron_link_status
  type: enum
  values: [NotPaired, Paired, Linked]
  source_parameter: LinkStatus

- id: icron_device_pairing
  type: string
  source_parameter: DevicePairing
  description: "List of MAC addresses of paired devices."

- id: icron_mode
  type: enum
  values: [LEX, REX]
  source_parameter: Mode

- id: icron_usb_mode
  type: enum
  values: [SUI, MSA]
  source_parameter: UsbMode

- id: icron_mac_address
  type: string
  source_parameter: MacAddress
  example: "a8:d2:36:f1:88:63"

# Serial port feedback
- id: serial_configuration
  type: string
  source_parameter: Configuration
  example: "115200, 8N1"

- id: serial_data_bits
  type: enum
  values: [8, 9]
  source_parameter: DataBits

# Protocol-level responses
- id: rest_status_code
  type: enum
  values: ["200 OK", "401 Unauthorized", "404 Not Found", "405 Method Not Allowed", "406 Not Acceptable", "500 Internal Server Error"]
  description: "HTTP status codes defined by the REST API."

- id: lw3_response_prefix
  type: enum
  values: ["n-", "nE", "nm", "pr", "pw", "pE", "pm", "m-", "mO", "mF", "mE", "mm"]
  description: "2-character prefix describing the type of an LW3 response."
```

## Variables
```yaml
- id: device_label
  type: string
  max_length: 49
  path_rest: "/api/V1/MANAGEMENT/LABEL/DeviceLabel"
  path_lw3: "/V1/MANAGEMENT/LABEL.DeviceLabel"

- id: endpoint_alias
  type: string
  max_length: 32
  allowed_characters: "A-Z, 0-9, _"
  path_rest: "/api/V1/DEVICES/<MAC_address>/Alias"
  path_lw3: "/V1/DEVICES/<MAC_address>.Alias"

- id: hostname
  type: string
  min_length: 1
  max_length: 64
  path_rest: "/api/V1/MANAGEMENT/NETWORK/HostName"
  path_lw3: "/V1/MANAGEMENT/NETWORK.HostName"

- id: serial_baud_rate
  type: enum
  values: [9600, 19200, 38400, 57600, 115200]
  factory_default: 9600  # Factory Default Settings, TPN/OPTN series endpoint devices

- id: serial_data_bits
  type: enum
  values: [8, 9]
  factory_default: 8

- id: serial_parity
  type: enum
  values: [None, Odd, Even]
  factory_default: None

- id: serial_stop_bits
  type: enum
  values: [1, 2]
  factory_default: 1

- id: ntp_server_pool
  type: string
  example: "pool.ntp.org"

- id: system_time
  type: string
  format: "ISO 8601 (YYYY-MM-DDTHH:MM:SS)"

- id: hdcp_allowed_version_source
  type: enum
  values: ["off", "HDCP 1.4", "HDCP 2.2"]

- id: hdcp_output_mode_destination
  type: enum
  values: ["FollowSource", "FollowSink (Always Follow)", "FollowSink (Follow Once)"]

- id: scaler_display_mode
  type: enum
  values: [Genlock, GenlockScaling, FastSwitch, FastSwitchCrop, FastSwitchStretch, GenlockWall, FastSwitchWall, Multiview]

- id: icron_usb_mode
  type: enum
  values: [SUI, MSA]
  factory_default: SUI  # only for U2K models

- id: ip_acquisition_mode
  type: enum
  values: ["true", "false"]
  factory_default: "true"  # DHCP is the factory default IP address mode
```

## Events
```yaml
- id: lw3_property_change_notification
  trigger: "A subscribed node's property value changes (after OPEN /<NODEPATH>)."
  message: "CHG /<NODEPATH>.<PropertyName>=<value>"
  example: "CHG /V1/MEDIA/VIDEO/A8D236F48643_S0.Enabled=false"
  notes: "Asynchronous. Subscriptions are per-connection and are deleted when the connection terminates. REST API does not support subscription; polling must be used instead."

- id: lw3_error_message
  trigger: "A command fails."
  message: "mE /<NODEPATH>:<method> %E<code>: <text>"
  example: "mE /V1/MEDIA/USBHID/XP:switch %E004: Invalid value: tpn-mmu-crosspoint: Invalid switch parameters | Switching streams failed!"

# Factory-module driver events named in the source (LARA/LWR factory module):
- id: lw3_get_response_received
  description: "A response has been received for a request."
- id: signal_present_changed
  description: "Signal present property has been changed on one of the input/output ports of an endpoint device."
- id: crosspoint_changed
  description: "A crosspoint setting has been changed."
```

## Macros
```yaml
- id: apply_static_network_settings
  description: "Network property changes are stored but not applied until applySettings is called; one call suffices for several changed parameters."
  steps:
    - "SET/POST the desired network properties (DhcpEnabled, StaticIpAddress, StaticNetworkMask, StaticGatewayAddress, HostName, or the SDVOE/ICRON Staged* properties)"
    - "POST http://<ip>/api/V1/MANAGEMENT/NETWORK/applySettings   # or LW3: CALL /V1/MANAGEMENT/NETWORK:applySettings()"
  notes: "applySettings saves and applies the new values and reboots the network interface."

- id: apply_scaler_settings
  description: "Scaler settings are staged only until applySettings is called."
  steps:
    - "SET/POST SCALING.StagedDisplayMode and/or SCALING.StagedFormatName"
    - "CALL /V1/MEDIA/VIDEO/<destination_stream>/SCALING:applySettings()"

- id: enable_basic_authentication
  description: "Documented three-step procedure for enabling REST basic authentication."
  steps:
    - "POST <ip>/api/V1/MANAGEMENT/NETWORK/AUTHENTICATION/setPassword   body: <new_password>"
    - "POST <ip>/api/V1/MANAGEMENT/NETWORK/SERVICES/HTTP/AuthenticationEnabled   body: true"
    - "POST <ip>/api/V1/MANAGEMENT/NETWORK/SERVICES/HTTP/restart"
  notes: "Set the password before enabling authentication; no password is set by default. Restart of the HTTP(S) services is required."

- id: enable_serial_command_injection
  description: "Serial over IP service must be enabled before command injection can be used."
  steps:
    - "POST http://<ip>/api/V1/MEDIA/SERIAL/<serial_port>/SERVICE/Enabled   body: true"
    - "POST http://<ip>/api/V1/DEVICES/<MAC_address>/SERIAL/<port_ID>/SERVICE/send   body: <data>"
```

## Safety
```yaml
confirmation_required_for:
  - rest_factory_defaults
  - lw3_factory_defaults
  - rest_factory_reset_endpoint
  - lw3_factory_reset_endpoint
  - rest_restart_device
  - lw3_restart_device
  - rest_restart_endpoint
  - lw3_restart_endpoint
  - rest_network_apply_settings
  - lw3_network_apply_settings
  - rest_set_dhcp_enabled
  - lw3_set_dhcp_enabled
  - rest_set_static_ip
  - lw3_set_static_ip
  - rest_icron_remove_all_pairings
interlocks:
  - id: serial_service_required_for_injection
    rule: "The Serial over IP SERVICE.Enabled property must be enabled before RS-232 command injection can be used."
    source: "ATTENTION: The following property is required to be enabled for the RS-232 command injection feature."
  - id: scaler_apply_required
    rule: "Scaler settings are staged only; applySettings() must be called for the setting to take effect in the receiver."
    source: "ATTENTION: Calling of applySettings() method is required for applying the setting in the receiver."
  - id: network_apply_required
    rule: "Network property writes are stored but not applied until applySettings is called; applySettings reboots the network interface."
    source: "ATTENTION: When you change a network property, the new value is stored, but the applySettings method must always be called to apply the new settings."
warnings:
  - "ATTENTION: Always be careful when applying static IP address. Incorrect IP address assignment may create network loop or the devices might be unreachable. Lightware recommends using DHCP (dynamic IP address) setting."
  - "ATTENTION: In case of static IP address, please be sure the given IP address is in the same subnet network with the controller device."
  - "ATTENTION: Known issue: when IP settings are changed to static IP and there is an active RS-232 TCP communication, the changing may break it. Workaround: Disable the related TCP ports before performing network configuration changes."
  - "ATTENTION: All configuration data (including IP addresses) will be overwritten by restoring a configuration (clone file restore)."
  - "ATTENTION: While the firmware is being updated, the normal operation mode is suspended, as the device is switched to bootload mode. Signal processing is not performed. Do not interrupt the firmware update."
  - "ATTENTION: Before mounting the MMU, please keep a record of the default password from the sticker on the device's top. It will be necessary for the first login and this password will be restored after a factory reset."
  - "ATTENTION: Please ensure proper time and date setting in the MMU, because it affects the self-signed certificate (SSL) generation when using WSS or HTTPS. Improper time and date setting may lead to certificate rejection."
  - "Restart and factory reset terminate current connections and interrupt signal transmission."
  - "There is no encryption when the REST API communication happens via HTTP; HTTP should be disabled and HTTPS used instead to avoid password interception."
# UNRESOLVED: no electrical, thermal, or power-sequencing safety requirements are stated for the endpoint beyond PoE PD standard (IEEE802.3af) compliance.
```

## Notes
- **Control topology.** The source documents no direct control protocol for the HDMI-TPN-TX107 itself. Every command is sent to the TPN-MMU-X100 Matrix Management Unit, which targets the endpoint by MAC address (capital letters, no colons), by stream ID (`<MAC>_S0`, `<MAC>_D0`, or `<alias>_S0`), or by serial port ID (`<MAC>_P1`). Aliases may be substituted for MAC addresses in stream IDs.
- **Two equivalent interfaces.** "All methods and properties of the LW3 tree structure appear below /api as a HTTP(s) URL. The separator character is always a slash ('/') instead of point ('.') and colon (':')." REST URLs are case-insensitive; LW3 commands are case-sensitive. Only Command Injection over Serial Port is REST-only.
- **REST limitations.** Node querying (`GET /<NODEPATH>` without a property) returns 404; OPEN/CLOSE subscription is not interpreted. Polling substitutes for subscription.
- **LW3 connection.** Raw TCP to port 6107, or WS on port 80 / WSS on port 443 at path `/lw3`. Lines terminated CrLf, max 800 bytes. Optional four-hex-digit signature may precede any command to group the response lines in `{...}`.
- **Escaping (LW3).**

## Provenance

```yaml
source_domains:
  - assets.prod.pim.lightware.com
  - go.lightware.com
  - academy.lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/TPN-MMU_UserManual.pdf
  - https://go.lightware.com/tpn-mmu-pum
  - https://academy.lightware.com/
retrieved_at: 2026-08-10T20:48:42.721Z
last_checked_at: 2026-08-19T09:32:48.967Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:32:48.967Z
matched_actions: 154
action_count: 154
confidence: medium
summary: "All 154 spec actions mirror verbatim REST/LW3 commands in the source; transport values all documented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no direct-to-endpoint control interface is documented; every command in this spec is addressed to the MMU."
- "firmware compatibility range for HDMI-TPN-TX107 not stated."
- "the endpoint RS-232 port is a pass-through/command-injection port for a connected third-party device, not a control interface for the TX107 itself; it is therefore not listed under Transport.protocols."
- "several sections of the source are chunked excerpts; chapters 1-5 and parts of 10-13 are summaries or non-protocol content."
- "no electrical, thermal, or power-sequencing safety requirements are stated for the endpoint beyond PoE PD standard (IEEE802.3af) compliance."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
