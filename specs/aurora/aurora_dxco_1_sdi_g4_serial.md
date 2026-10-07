---
spec_id: admin/aurora-dxco-1-sdi-g4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora Aurora Dxco 1 Sdi G4 Control Spec"
manufacturer: Aurora
model_family: "Aurora Dxco 1 Sdi G4"
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - "Aurora Dxco 1 Sdi G4"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.hdtvsupply.com
  - auroramultimedia.com
  - manualslib.com
source_urls:
  - https://files.hdtvsupply.com/brand/aurora/aurora-multimedia-dxm-88-16164-g4-um.pdf
  - https://auroramultimedia.com/products/dxco-1-sdi-g4
  - https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html
  - "https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html?page=45"
retrieved_at: 2026-08-07T23:07:06.144Z
last_checked_at: 2026-10-01T06:36:45.795Z
generated_at: 2026-10-01T06:36:45.795Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "unsolicited notification behavior not explicitly documented in source"
  - "no explicit multi-step macros documented in source"
  - "no explicit safety warnings or interlock procedures documented in source"
  - "RS-232 default settings are documented; exact model-specific UART configuration availability not separately stated."
verification:
  verdict: verified
  checked_at: 2026-10-01T06:36:45.795Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 numbered source commands map one-to-one to the 58 spec action units with matching literals and shapes; transport values appear in source. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Aurora Aurora Dxco 1 Sdi G4 Control Spec

## Summary
Aurora DXM control card supports bidirectional RS-232 control and TCP/IP control. This spec covers ASCII command and query protocol, routing, scene, serial-management, network, EDID, card, system, and HDBT functions.

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 1001
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password
  username: user
  password: "123456"
```

## Traits
```yaml
- powerable  # inferred from CPOWER commands
- routable   # inferred from video/audio/UART routing commands
- queryable  # inferred from query commands returning values
```

## Actions
```yaml
- id: switch_video_input
  label: Switch Video Input
  kind: action
  command: "!C{input}to{outputs}<CR>"
  params:
    - name: input
      type: integer
      description: Input number, 1 through matrix maximum
    - name: outputs
      type: string
      description: Output number(s), 1 through matrix maximum or ALL

- id: route_video
  label: Route Video Inputs
  kind: action
  command: "!CR{input_output_pairs}<CR>"
  params:
    - name: input_output_pairs
      type: string
      description: Comma-separated input-to-output pairs

- id: select_video_input
  label: Select Video Input
  kind: action
  command: "!CSWI:{input}<CR>"
  params:
    - name: input
      type: integer
      description: Input number, 1 through matrix maximum

- id: select_video_output
  label: Select Video Output
  kind: action
  command: "!CSWO:{output}<CR>"
  params:
    - name: output
      type: integer
      description: Output number, 1 through matrix maximum

- id: switch_audio_input
  label: Switch Audio Input
  kind: action
  command: "!T{input}{source}to{outputs}<CR>"
  params:
    - name: input
      type: integer
      description: Input number, 1 through matrix maximum
    - name: source
      type: string
      description: V for internal audio or E for external audio
    - name: outputs
      type: string
      description: Output number(s), 1 through matrix maximum or ALL

- id: route_audio
  label: Route Audio Inputs
  kind: action
  command: "!TR{source_input}:{source_output_pairs}<CR>"
  params:
    - name: source_input
      type: string
      description: Input number plus V or E
    - name: source_output_pairs
      type: string
      description: Comma-separated output number and V/E pairs

- id: select_audio_input
  label: Select Audio Input
  kind: action
  command: "!TSWI:{input}{source}<CR>"
  params:
    - name: input
      type: integer
      description: Input number, 1 through matrix maximum
    - name: source
      type: string
      description: V for internal audio or E for external audio

- id: select_audio_output
  label: Select Audio Output
  kind: action
  command: "!TSWO:{outputs}<CR>"
  params:
    - name: outputs
      type: string
      description: Output number and V/E pairs

- id: save_scene
  label: Save Scene
  kind: action
  command: "!S{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location, 1 through 32

- id: call_scene
  label: Call Scene
  kind: action
  command: "!R{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location, 1 through 32

- id: set_av_sync
  label: Set Audio Video Synchronization
  kind: action
  command: "!SYNC:{enabled}<CR>"
  params:
    - name: enabled
      type: integer
      description: 0 disables synchronization; 1 enables synchronization

- id: set_sync_mode
  label: Set Audio Video Synchronization Mode
  kind: action
  command: "!SYNC_MODE:{mode}<CR>"
  params:
    - name: mode
      type: integer
      description: 0 VE to VE; 1 VE to EV; 2 V to VE; 3 E to VE; 4 V to V; 5 E to E; 6 V to E; 7 E to V

- id: set_scene_name
  label: Set Scene Name
  kind: action
  command: "!SNAME{scene}:{name}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene number, 1 through 32
    - name: name
      type: string
      description: Scene name, maximum 15 English characters

- id: set_scene_web_display
  label: Set Scene Web Display
  kind: action
  command: "!SUSE{scene}:{display}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location, 1 through 32
    - name: display
      type: integer
      description: 0 no display; 1 display

- id: switch_uart
  label: Switch UART
  kind: action
  command: "!CUART{rx}to{tx}<CR>"
  params:
    - name: rx
      type: integer
      description: RX interface, 1 through matrix maximum
    - name: tx
      type: string
      description: TX interface number(s), 1 through matrix maximum or ALL

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "!IP:{address}<CR>"
  params:
    - name: address
      type: string
      description: IPv4 address

- id: set_subnet
  label: Set Subnet
  kind: action
  command: "!SUBNET:{address}<CR>"
  params:
    - name: address
      type: string
      description: IPv4 subnet address

- id: set_gateway
  label: Set Gateway
  kind: action
  command: "!GATEWAY:{address}<CR>"
  params:
    - name: address
      type: string
      description: IPv4 gateway address

- id: set_socket_server_port
  label: Set Socket Server Port
  kind: action
  command: "!PORT:{port}<CR>"
  params:
    - name: port
      type: integer
      description: TCP socket server port

- id: set_dhcp
  label: Set Network DHCP
  kind: action
  command: "!DHCP:{enabled}<CR>"
  params:
    - name: enabled
      type: integer
      description: 0 disabled; 1 enabled

- id: set_serial_port
  label: Set Serial Port
  kind: action
  command: "!UART:{baud_rate},{data_bits},{stop_bits},{parity}<CR>"
  params:
    - name: baud_rate
      type: integer
      description: 115200, 38400, 19200, or 9600
    - name: data_bits
      type: integer
      description: 8 or 9
    - name: stop_bits
      type: number
      description: 1, 1.5, or 2
    - name: parity
      type: string
      description: None, Odd, or Even

- id: set_command_enable
  label: Set Command Enable
  kind: action
  command: "!CMDEN:{enabled}<CR>"
  params:
    - name: enabled
      type: integer
      description: 0 disabled; 1 enabled

- id: set_command_sound
  label: Set Command Sound
  kind: action
  command: "!CSOUND:{enabled}<CR>"
  params:
    - name: enabled
      type: integer
      description: 0 no sound; 1 sound

- id: set_edid_output_input
  label: Switch Output EDID to Input
  kind: action
  command: "!EDID{output}to{input}<CR>"
  params:
    - name: output
      type: integer
      description: Output number, 1 through matrix maximum
    - name: input
      type: string
      description: Input number, 1 through matrix maximum or ALL

- id: set_system_edid_input
  label: Switch System EDID to Input
  kind: action
  command: "!SYSE{system}to{input}<CR>"
  params:
    - name: system
      type: integer
      description: System number, 1 through 16
    - name: input
      type: string
      description: Input number, 1 through matrix maximum or ALL

- id: save_output_edid
  label: Save Output EDID to System
  kind: action
  command: "!SEDID{output}to{system}<CR>"
  params:
    - name: output
      type: integer
      description: Output number, 1 through matrix maximum
    - name: system
      type: integer
      description: System number, 1 through 16

- id: set_output_format
  label: Set Output HDMI or DVI Format
  kind: action
  command: "!HDMODE:{output},{mode}<CR>"
  params:
    - name: output
      type: integer
      description: Output number, 1 through matrix maximum
    - name: mode
      type: integer
      description: 0 DVI; 1 HDMI

- id: set_hdcp
  label: Set Port HDCP
  kind: action
  command: "!HDCP:{port},{enabled}<CR>"
  params:
    - name: port
      type: integer
      description: Port number, 1 through matrix maximum
    - name: enabled
      type: integer
      description: 0 off; 1 on

- id: set_card_power
  label: Set Card Power
  kind: action
  command: "!CPOWER:{port},{enabled}<CR>"
  params:
    - name: port
      type: integer
      description: Port number, 1 through matrix maximum
    - name: enabled
      type: integer
      description: 0 off; 1 on

- id: set_web_credentials
  label: Set Web Username and Password
  kind: action
  command: "!MUNP:{username},{password}<CR>"
  params:
    - name: username
      type: string
      description: Maximum 15 English characters or Arabic numerals
    - name: password
      type: string
      description: Maximum 15 English characters or Arabic numerals

- id: send_board_command
  label: Send Control Board Command
  kind: action
  command: "!COM{command}<CR>"
  params:
    - name: command
      type: string
      description: Control card command

- id: send_tcp_socket_data
  label: Send Data to TCP Socket Server
  kind: action
  command: "!SEND-SS:{ip}:{port},{data}<CR>"
  params:
    - name: ip
      type: string
      description: Destination IP address
    - name: port
      type: integer
      description: Destination server port
    - name: data
      type: string
      description: Data payload

- id: set_language
  label: Set System Language
  kind: action
  command: "!LANG:{language}<CR>"
  params:
    - name: language
      type: integer
      description: 0 English; 1 Chinese

- id: restart_system
  label: Restart System
  kind: action
  command: "!SOF-RESTART<CR>"
  params: []

- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  command: "!SYS-RESET<CR>"
  params: []

- id: send_hdbt_command
  label: Send Command to HDBT Card
  kind: action
  command: "!SEND-CU:{baud_rate}:{direction}{port}:{data}<CR>"
  params:
    - name: baud_rate
      type: integer
      description: 115200, 38400, 19200, or 9600
    - name: direction
      type: string
      description: I or O
    - name: port
      type: integer
      description: HDBT card port
    - name: data
      type: string
      description: Data payload

- id: send_receive_hdbt_command
  label: Send and Receive HDBT Command
  kind: action
  command: "!SEND-CU-RECV:{baud_rate}:{direction}{port}:{data}<CR>"
  params:
    - name: baud_rate
      type: integer
      description: 115200, 38400, 19200, or 9600
    - name: direction
      type: string
      description: I or O
    - name: port
      type: integer
      description: HDBT card port
    - name: data
      type: string
      description: Data payload
- id: query_video_routing
  label: Query Video Routing Status
  kind: query
  command: "?CR<CR>"
  params: []

- id: query_audio_routing
  label: Query Audio Routing Status
  kind: query
  command: "?TR<CR>"
  params: []

- id: query_av_sync
  label: Query Audio Video Synchronization Status
  kind: query
  command: "?SYNC<CR>"
  params: []

- id: query_sync_mode
  label: Query Audio Video Synchronization Mode
  kind: query
  command: "?SYNC_MODE<CR>"
  params: []

- id: query_scene_name
  label: Query Scene Name
  kind: query
  command: "?SNAME{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location, 1 through 32

- id: query_scene_web_display
  label: Query Scene Web Display Status
  kind: query
  command: "?SUSE{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location, 1 through 32

- id: query_uart_status
  label: Query Status of All UART Routing
  kind: query
  command: "?CRUART<CR>"
  params: []

- id: query_network_information
  label: Query Network Information
  kind: query
  command: "?NETWORK<CR>"
  params: []

- id: query_serial_port
  label: Query Serial Port Settings
  kind: query
  command: "?UART<CR>"
  params: []

- id: query_command_enable
  label: Query Command Enable Status
  kind: query
  command: "?CMDEN<CR>"
  params: []

- id: query_command_sound
  label: Query Command Sound Status
  kind: query
  command: "?CSOUND<CR>"
  params: []

- id: query_card_power
  label: Query Card Power Status
  kind: query
  command: "?CPOWER:{port}<CR>"
  params:
    - name: port
      type: integer
      description: Port number, 1 through matrix maximum

- id: query_web_credentials
  label: Query Management Username and Password
  kind: query
  command: "?MUNP<CR>"
  params: []

- id: query_control_board_online
  label: Query Central Control Board Online
  kind: query
  command: "?COM<CR>"
  params: []

- id: query_json_status
  label: Query Status Information in JSON
  kind: query
  command: "?JSON:{category},{mark}<CR>"
  params:
    - name: category
      type: string
      description: video, scene, system, weburl, or cont
    - name: mark
      type: integer
      description: Status update version; 0 requests all data

- id: query_language
  label: Query System Language
  kind: query
  command: "?LANG<CR>"
  params: []

- id: query_daughter_card_types
  label: Query Daughter Card Types
  kind: query
  command: "?RCID<CR>"
  params: []

- id: query_software_version
  label: Query Main Software Version
  kind: query
  command: "?SVER<CR>"
  params: []

- id: query_hardware_version
  label: Query Hardware Version
  kind: query
  command: "?HVER<CR>"
  params: []

- id: query_back_board_version
  label: Query Back Board Firmware Version
  kind: query
  command: "?BVER<CR>"
  params: []

- id: query_matrix_type
  label: Query Matrix Type
  kind: query
  command: "?M0<CR>"
  params: []
```

## Feedbacks
```yaml
- id: video_routing_status
  type: string
  response: "~CR{input_output_pairs}<CR>"

- id: audio_routing_status
  type: string
  response: "~TR{routing}<CR>"

- id: av_sync_status
  type: enum
  values: [disabled, enabled]

- id: av_sync_mode
  type: integer
  range: 0-7

- id: scene_name
  type: string

- id: scene_web_display
  type: enum
  values: [hidden, displayed]

- id: uart_status
  type: string

- id: network_information
  type: string
  response: "~IP:{ip}<CR>~SUBNET:{subnet}<CR>~GATEWAY:{gateway}<CR>~PORT:{port}<CR>"

- id: serial_port_settings
  type: string
  response: "~UART:{baud_rate},{data_bits},{stop_bits},{parity}<CR>"

- id: command_enable_status
  type: enum
  values: [disabled, enabled]

- id: command_sound_status
  type: enum
  values: [disabled, enabled]

- id: card_power_status
  type: enum
  values: [off, on]

- id: web_credentials
  type: string

- id: central_control_board_status
  type: string
  response: "~COM:1<CR>"

- id: json_status
  type: json

- id: system_language
  type: enum
  values: [english, chinese]

- id: daughter_card_types
  type: string

- id: main_software_version
  type: string

- id: hardware_version
  type: string

- id: back_board_firmware_version
  type: string

- id: matrix_type
  type: string

- id: hdbt_received_data
  type: string
```

## Variables
```yaml
- id: video_routing
  type: string

- id: audio_routing
  type: string

- id: scene
  type: integer
  range: 1-32

- id: ip_address
  type: string

- id: subnet
  type: string

- id: gateway
  type: string

- id: socket_server_port
  type: integer

- id: serial_baud_rate
  type: integer
  values: [115200, 38400, 19200, 9600]

- id: serial_data_bits
  type: integer
  values: [8, 9]

- id: serial_stop_bits
  type: number
  values: [1, 1.5, 2]

- id: serial_parity
  type: enum
  values: [none, odd, even]
```

## Events
```yaml
# UNRESOLVED: unsolicited notification behavior not explicitly documented in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_settings
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures documented in source
```

## Notes
Command terminator is `<CR>`, documented as `0x0D` hexadecimal or 13 decimal. Command prefix `!`, query prefix `?`, response prefix `~`. RS-232 connector: tip TX, ring RX, sleeve ground. Bidirectional serial transmission only possible point-to-point. Command sending speed can affect operation.

<!-- UNRESOLVED: RS-232 default settings are documented; exact model-specific UART configuration availability not separately stated. -->

## Provenance

```yaml
source_domains:
  - files.hdtvsupply.com
  - auroramultimedia.com
  - manualslib.com
source_urls:
  - https://files.hdtvsupply.com/brand/aurora/aurora-multimedia-dxm-88-16164-g4-um.pdf
  - https://auroramultimedia.com/products/dxco-1-sdi-g4
  - https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html
  - "https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html?page=45"
retrieved_at: 2026-08-07T23:07:06.144Z
last_checked_at: 2026-10-01T06:36:45.795Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T06:36:45.795Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 numbered source commands map one-to-one to the 58 spec action units with matching literals and shapes; transport values appear in source. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "unsolicited notification behavior not explicitly documented in source"
- "no explicit multi-step macros documented in source"
- "no explicit safety warnings or interlock procedures documented in source"
- "RS-232 default settings are documented; exact model-specific UART configuration availability not separately stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
