---
spec_id: admin/aurora-dxm-884-g4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora DXM 884 G4 Control Spec"
manufacturer: Aurora
model_family: "DXM 884 G4"
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - "DXM 884 G4"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.avprosupply.com
  - manualslib.com
source_urls:
  - https://files.avprosupply.com/files/attachments/509377/aurora-multimedia-dxm-884-g4-manual.pdf
  - https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html
retrieved_at: 2026-08-01T04:32:55.311Z
last_checked_at: 2026-08-05T07:20:20.109Z
generated_at: 2026-08-05T07:20:20.109Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware/hardware version ranges not stated in source (only query commands exist). Exact matrix I/O card counts (8x8 / 16x16 / 32x32 variants MVP-8C/16C/32C) not tied to a specific model."
  - "flow control not stated in source"
  - "no unsolicited push notifications documented in source. The JSON"
  - "no multi-step command sequences explicitly documented in source."
  - "no explicit safety warnings, interlock procedures, or power-on"
  - "firmware/hardware version compatibility not stated (only runtime queries). Exact I/O configuration for the \"884\" (8x8) variant not described. Flow control value not stated. Leading direction-byte transmission unconfirmed."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:20:20.109Z
  matched_actions: 57
  action_count: 57
  confidence: medium
  summary: "All 57 spec actions map 1:1 to source rows 1-57; transport (port 1001, baud 115200, IP 192.168.88.229) verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Aurora DXM 884 G4 Control Spec

## Summary
The Aurora DXM 884 G4 is an HDMI/HDBaseT modular matrix switcher (DXM-G4 Series) with hot-swappable input/output daughter cards. It is controllable via a bidirectional RS-232C serial port and TCP/IP over Ethernet (socket server) using an ASCII command protocol. This spec covers the full documented RS232/IP command catalogue: video/audio routing, EDID management, scene save/recall, HDCP, per-card power, network and serial configuration, and system queries including a JSON status endpoint.

<!-- UNRESOLVED: firmware/hardware version ranges not stated in source (only query commands exist). Exact matrix I/O card counts (8x8 / 16x16 / 32x32 variants MVP-8C/16C/32C) not tied to a specific model. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1001  # Socket Server port (TCP control), stated in source
serial:
  baud_rate: 115200  # default; source states configurable range 9600~115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth/login procedure in the RS232/IP command protocol
```

Notes:
- Default IP address: `192.168.88.229` (stated).
- RS-232 connector: 3-pin Phoenix female — PIN 1: TX, PIN 2: GND, PIN 3: RX.
- A separate WEB server (default port 80) provides GUI management with default credentials User `user` / Password `123456`; this is distinct from the ASCII socket/serial control protocol.
- Ethernet protocols supported: ICMP, ARP, IP, TCP, UDP, DHCP, HTTP; LAN 10/100BaseT half/full duplex.

## Traits
```yaml
traits:
  - powerable   # CPOWER card power on/off commands present
  - routable    # video/audio/UART/EDID routing commands present
  - queryable   # many query commands returning state present
```

## Actions
```yaml
# Framing convention (from source legend):
#   >  = Command line prefix
#   #  = Query line prefix
#   <  = Response line prefix
#   <CR> = carriage return, 0x0D (13 decimal), line terminator
# Command/query prefixes appear verbatim in the source ASCII-string column.
# NOTE: whether the leading > / # byte is transmitted on the wire vs. being a
# documentation marker is not unambiguously confirmed - verify against a live
# device. Responses ( < ) are received, not sent.
# Audio suffix convention: V = Internal audio, E = External audio.

actions:
  - id: switch_video_input_to_outputs
    label: Switch Video Input to Outputs
    kind: action
    command: ">C{input}to{outputs}<CR>"
    params:
      - name: input
        type: integer
        description: "Input number (1 to matrix max)"
      - name: outputs
        type: string
        description: "Comma-separated output numbers (1 to matrix max), or ALL"

  - id: switch_video_routing_map
    label: Switch Video Routing (output:input map)
    kind: action
    command: ">CR{mapping}<CR>"
    params:
      - name: mapping
        type: string
        description: "Routing map, e.g. '1:3,2:4' meaning out1<-in1? (source: a,c=output, b,d=input)"

  - id: select_video_input
    label: Select Video Input (CSWI)
    kind: action
    command: ">CSWI:{input}<CR>"
    params:
      - name: input
        type: integer
        description: "Input number (1 to matrix max). Use with CSWO."

  - id: switch_video_output_from_selected
    label: Switch Video Output from Selected Input (CSWO)
    kind: action
    command: ">CSWO:{outputs}<CR>"
    params:
      - name: outputs
        type: string
        description: "Comma-separated output numbers (1 to matrix max)"

  - id: query_video_routing
    label: Query Video Routing
    kind: query
    command: "#CR<CR>"
    params: []

  - id: switch_audio_input_to_outputs
    label: Switch Audio Input to Outputs
    kind: action
    command: ">T{input}to{outputs}<CR>"
    params:
      - name: input
        type: string
        description: "Input number + V/E (V=Internal audio, E=External audio), e.g. 1V"
      - name: outputs
        type: string
        description: "Comma-separated output+V/E, or ALL, e.g. 2V,2E"

  - id: switch_audio_routing_map
    label: Switch Audio Routing (output:input map)
    kind: action
    command: ">TR{mapping}<CR>"
    params:
      - name: mapping
        type: string
        description: "Audio routing map with V/E suffixes, e.g. '1V:2V,1E:2E'"

  - id: select_audio_input
    label: Select Audio Input (TSWI)
    kind: action
    command: ">TSWI:{input}<CR>"
    params:
      - name: input
        type: string
        description: "Input number + V/E (V=Internal, E=External). Use with TSWO."

  - id: switch_audio_output_from_selected
    label: Switch Audio Output from Selected Input (TSWO)
    kind: action
    command: ">TSWO:{outputs}<CR>"
    params:
      - name: outputs
        type: string
        description: "Comma-separated output+V/E, e.g. 3V,3E"

  - id: query_audio_routing
    label: Query Audio Routing
    kind: query
    command: "#TR<CR>"
    params: []

  - id: save_scene
    label: Save Scene
    kind: action
    command: ">S{scene}<CR>"
    params:
      - name: scene
        type: integer
        description: "Scene location (1 to 32 max)"

  - id: recall_scene
    label: Recall Scene
    kind: action
    command: ">R{scene}<CR>"
    params:
      - name: scene
        type: integer
        description: "Scene location (1 to 32 max)"

  - id: set_av_sync
    label: Set Audio/Video Synchronization
    kind: action
    command: ">SYNC:{value}<CR>"
    params:
      - name: value
        type: integer
        description: "0 = no synchronous, 1 = synchronous"

  - id: query_av_sync
    label: Query Audio/Video Synchronization
    kind: query
    command: "#SYNC<CR>"
    params: []

  - id: set_sync_mode
    label: Set Audio/Video Sync Mode
    kind: action
    command: ">SYNC_MODE:{mode}<CR>"
    params:
      - name: mode
        type: integer
        description: "0: VE->VE, 1: VE->EV, 2: V->VE (default), 3: E->VE, 4: V->V, 5: E->E, 6: V->E, 7: E->V"

  - id: query_sync_mode
    label: Query Audio/Video Sync Mode
    kind: query
    command: "#SYNC_MODE<CR>"
    params: []

  - id: set_scene_name
    label: Set Scene Name
    kind: action
    command: ">SNAME{scene}:{name}<CR>"
    params:
      - name: scene
        type: integer
        description: "Scene number (1 to 32 max)"
      - name: name
        type: string
        description: "Scene name (up to 15 English characters)"

  - id: query_scene_name
    label: Query Scene Name
    kind: query
    command: "#SNAME{scene}<CR>"
    params:
      - name: scene
        type: integer
        description: "Scene location (1 to 32 max)"

  - id: set_scene_web_display
    label: Set Scene Web Display
    kind: action
    command: ">SUSE{scene}:{value}<CR>"
    params:
      - name: scene
        type: integer
        description: "Scene number (1 to 32 max)"
      - name: value
        type: integer
        description: "0 = no display on WEB, 1 = display"

  - id: query_scene_web_display
    label: Query Scene Web Display
    kind: query
    command: "#SUSE{scene}<CR>"
    params:
      - name: scene
        type: integer
        description: "Scene location (1 to 32 max)"

  - id: uart_switch
    label: UART Switch (route RX to TX)
    kind: action
    command: ">CUART{rx}to{tx}<CR>"
    params:
      - name: rx
        type: integer
        description: "RX port (1 to matrix max)"
      - name: tx
        type: string
        description: "TX port(s) (1 to matrix max), comma-separated, or ALL"

  - id: query_uart_status
    label: Query All UART Status
    kind: query
    command: "#CRUART<CR>"
    params: []

  - id: set_ip_address
    label: Set IP Address
    kind: action
    command: ">IP:{address}<CR>"
    params:
      - name: address
        type: string
        description: "IPv4 address a.b.c.d (each octet 0-255)"

  - id: set_subnet
    label: Set Subnet Mask
    kind: action
    command: ">SUBNET:{address}<CR>"
    params:
      - name: address
        type: string
        description: "Subnet mask a.b.c.d (each octet 0-255)"

  - id: set_gateway
    label: Set Gateway
    kind: action
    command: ">GATEWAY:{address}<CR>"
    params:
      - name: address
        type: string
        description: "Gateway address a.b.c.d (each octet 0-255)"

  - id: set_socket_port
    label: Set Socket Server Port
    kind: action
    command: ">PORT:{port}<CR>"
    params:
      - name: port
        type: integer
        description: "TCP socket server port"

  - id: set_dhcp
    label: Set Network DHCP
    kind: action
    command: ">DHCP:{value}<CR>"
    params:
      - name: value
        type: integer
        description: "0 = off, 1 = on"

  - id: query_network
    label: Query Network Information
    kind: query
    command: "#NETWORK<CR>"
    params: []

  - id: set_serial_config
    label: Set Serial Port Configuration
    kind: action
    command: ">UART:{baud},{data_bits},{stop_bits},{parity}<CR>"
    params:
      - name: baud
        type: integer
        description: "Baud rate: 115200, 38400, 19200, or 9600"
      - name: data_bits
        type: integer
        description: "Data bits: 8 or 9"
      - name: stop_bits
        type: number
        description: "Stop bits: 1, 1.5, or 2"
      - name: parity
        type: string
        description: "Parity: None, Odd, or Even"

  - id: query_serial_config
    label: Query Serial Port Configuration
    kind: query
    command: "#UART<CR>"
    params: []

  - id: set_command_enable
    label: Set Command Enable
    kind: action
    command: ">CMDEN:{value}<CR>"
    params:
      - name: value
        type: integer
        description: "0 = disable command processing, 1 = enable"

  - id: query_command_enable
    label: Query Command Enable
    kind: query
    command: "#CMDEN<CR>"
    params: []

  - id: set_command_sound
    label: Set Command Sound
    kind: action
    command: ">CSOUND:{value}<CR>"
    params:
      - name: value
        type: integer
        description: "0 = no sound, 1 = sound on command send"

  - id: query_command_sound
    label: Query Command Sound
    kind: query
    command: "#CSOUND<CR>"
    params: []

  - id: switch_edid_output_to_input
    label: Switch EDID of Output to Input
    kind: action
    command: ">EDID{output}to{input}<CR>"
    params:
      - name: output
        type: integer
        description: "Output number (1 to matrix max)"
      - name: input
        type: string
        description: "Input number (1 to matrix max), or ALL"

  - id: switch_edid_system_to_input
    label: Switch System EDID to Input
    kind: action
    command: ">SYSE{system}to{input}<CR>"
    params:
      - name: system
        type: integer
        description: "System EDID slot (1 to 16)"
      - name: input
        type: string
        description: "Input number (1 to matrix max), or ALL"

  - id: save_edid_output_to_system
    label: Save Output EDID to System
    kind: action
    command: ">SEDID{output}to{system}<CR>"
    params:
      - name: output
        type: integer
        description: "Output number (1 to matrix max)"
      - name: system
        type: integer
        description: "System EDID slot (1 to 16)"

  - id: set_hdmi_dvi_mode
    label: Set Output HDMI/DVI Mode
    kind: action
    command: ">HDMODE:{output},{mode}<CR>"
    params:
      - name: output
        type: integer
        description: "Output number (1 to matrix max)"
      - name: mode
        type: integer
        description: "0 = DVI, 1 = HDMI"

  - id: set_hdcp
    label: Set Port HDCP
    kind: action
    command: ">HDCP:{port},{value}<CR>"
    params:
      - name: port
        type: integer
        description: "Port number (1 to matrix max), applies to IN/OUT card"
      - name: value
        type: integer
        description: "0 = OFF, 1 = ON"

  - id: set_card_power
    label: Set Card Power
    kind: action
    command: ">CPOWER:{port},{value}<CR>"
    params:
      - name: port
        type: integer
        description: "Port number (1 to matrix max)"
      - name: value
        type: integer
        description: "0 = OFF, 1 = ON"

  - id: query_card_power
    label: Query Card Power
    kind: query
    command: "#CPOWER:{port}<CR>"
    params:
      - name: port
        type: integer
        description: "Port number (1 to matrix max)"

  - id: set_web_credentials
    label: Set Web Interface Credentials
    kind: action
    command: ">MUNP:{name},{password}<CR>"
    params:
      - name: name
        type: string
        description: "Username (up to 15 English chars or Arabic numerals)"
      - name: password
        type: string
        description: "Password (up to 15 English chars or Arabic numerals)"

  - id: query_web_credentials
    label: Query Web Interface Credentials
    kind: query
    command: "#MUNP<CR>"
    params: []

  - id: send_control_board_command
    label: Send Command to Control Board
    kind: action
    command: ">COM{command}<CR>"
    params:
      - name: command
        type: string
        description: "Control card command string (e.g. -TEST)"

  - id: query_control_board_online
    label: Query Control Board Online
    kind: query
    command: "#COM<CR>"
    params: []

  - id: send_to_socket_server
    label: Send Data to TCP Socket Server
    kind: action
    command: ">SEND-SS:{ip}:{port},{data}<CR>"
    params:
      - name: ip
        type: string
        description: "Destination IP address"
      - name: port
        type: integer
        description: "Destination server port"
      - name: data
        type: string
        description: "Data to send"

  - id: query_status_json
    label: Query Status (JSON format)
    kind: query
    command: "#JSON:{type},{mark}<CR>"
    params:
      - name: type
        type: string
        description: "Status category: video, scene, system, weburl, or cont"
      - name: mark
        type: integer
        description: "Status update version; 0 = request all data"

  - id: set_language
    label: Set System Language
    kind: action
    command: ">LANG:{value}<CR>"
    params:
      - name: value
        type: integer
        description: "0 = English, 1 = Chinese"

  - id: query_language
    label: Query System Language
    kind: query
    command: "#LANG<CR>"
    params: []

  - id: restart_system
    label: Restart System
    kind: action
    command: ">SOF-RESTART<CR>"
    params: []

  - id: factory_reset
    label: Restore Factory Settings
    kind: action
    command: ">SYS-RESET<CR>"
    params: []

  - id: query_card_types
    label: Query Daughter Card Types
    kind: query
    command: "#RCID<CR>"
    params: []

  - id: query_software_version
    label: Query Main Software Version
    kind: query
    command: "#SVER<CR>"
    params: []

  - id: query_hardware_version
    label: Query Hardware Version
    kind: query
    command: "#HVER<CR>"
    params: []

  - id: query_backboard_firmware
    label: Query Back Board Firmware Version
    kind: query
    command: "#BVER<CR>"
    params: []

  - id: query_matrix_type
    label: Query Matrix Type
    kind: query
    command: "#M0<CR>"
    params: []

  - id: send_to_hdbt_card
    label: Send Command to HDBT Card
    kind: action
    command: ">SEND-CU:{baud}:{io}{port}:{data}<CR>"
    params:
      - name: baud
        type: integer
        description: "Baud rate: 115200, 38400, 19200, or 9600"
      - name: io
        type: string
        description: "Card direction: I (input) or O (output)"
      - name: port
        type: integer
        description: "Card port number"
      - name: data
        type: string
        description: "Data to send"
```

## Feedbacks
```yaml
feedbacks:
  - id: video_routing_state
    type: string
    description: "Response to #CR, e.g. <CR1:3,2:4<CR>"

  - id: audio_routing_state
    type: string
    description: "Response to #TR, e.g. <TR1V:3V,2V:4E<CR>"

  - id: av_sync_state
    type: enum
    values: ["0", "1"]
    description: "Response to #SYNC: 0=off, 1=on"

  - id: sync_mode
    type: enum
    values: ["0", "1", "2", "3", "4", "5", "6", "7"]
    description: "Response to #SYNC_MODE"

  - id: command_enabled
    type: enum
    values: ["0", "1"]
    description: "Response to #CMDEN"

  - id: network_info
    type: object
    description: "Response to #NETWORK: IP, SUBNET, GATEWAY, PORT lines"

  - id: serial_config
    type: object
    description: "Response to #UART: baud,data_bits,stop_bits,parity"

  - id: card_power
    type: enum
    values: ["0", "1"]
    description: "Response to #CPOWER:{port}: 0=OFF, 1=ON"

  - id: control_board_online
    type: enum
    values: ["0", "1"]
    description: "Response to #COM, e.g. <COM:1<CR>"

  - id: card_types
    type: string
    description: "Response to #RCID, e.g. <RCID:1:I1,2:N/A...<CR>"

  - id: software_version
    type: string
    description: "Response to #SVER"

  - id: hardware_version
    type: string
    description: "Response to #HVER"

  - id: backboard_firmware
    type: string
    description: "Response to #BVER"

  - id: matrix_type
    type: string
    description: "Response to #M0, e.g. MVP-16C"

  - id: status_json
    type: object
    description: "JSON response to #JSON:{type},{mark} containing system/video/scene/weburl/cont data"
```

## Variables
```yaml
# All settable parameters (IP, subnet, gateway, port, DHCP, serial config, sync,
# sync mode, language, scene name, web display, HDCP, card power, HDMI/DVI mode,
# credentials) are expressed as discrete Actions above. No continuous/level
# variables are documented in the source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited push notifications documented in source. The JSON
# status endpoint supports a `mark` (status update version) for polling, but no
# asynchronous event broadcast is described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements found in the source. Note: SYS-RESET (factory reset)
# and SOF-RESTART (restart) are destructive/system-level - flag for operator
# confirmation at integration time even though source states no interlock.
```

## Notes
- Command framing legend (source line 93): `>` = Command, `#` = Query, `<` = Response, `<CR>` = 0x0D carriage return. Direction prefixes appear in the source ASCII-string column; verify against a live device whether the leading `>`/`#` byte is transmitted.
- Same ASCII command set applies over both RS-232 and the TCP socket server (port 1001).
- Default serial: 115200 8N1; configurable baud 9600–115200, data bits 8/9, stop 1/1.5/2, parity None/Odd/Even via the `UART` command.
- Audio routing uses V (Internal audio) / E (External audio) suffixes on input/output identifiers.
- Bidirectional RS-232 passthrough routing is point-to-point only (CUART command); HDBaseT cards also support RS232 passthrough (SEND-CU command).
- Matrix is modular; daughter-card types and counts vary (query via #RCID, matrix type via #M0 returning MVP-8C / MVP-16C / MVP-32C).
- WEB server (port 80) is a separate GUI management interface with default credentials `user` / `123456`; the documented ASCII control protocol requires no login.

<!-- UNRESOLVED: firmware/hardware version compatibility not stated (only runtime queries). Exact I/O configuration for the "884" (8x8) variant not described. Flow control value not stated. Leading direction-byte transmission unconfirmed. -->
````

## Provenance

```yaml
source_domains:
  - files.avprosupply.com
  - manualslib.com
source_urls:
  - https://files.avprosupply.com/files/attachments/509377/aurora-multimedia-dxm-884-g4-manual.pdf
  - https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html
retrieved_at: 2026-08-01T04:32:55.311Z
last_checked_at: 2026-08-05T07:20:20.109Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:20:20.109Z
matched_actions: 57
action_count: 57
confidence: medium
summary: "All 57 spec actions map 1:1 to source rows 1-57; transport (port 1001, baud 115200, IP 192.168.88.229) verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware/hardware version ranges not stated in source (only query commands exist). Exact matrix I/O card counts (8x8 / 16x16 / 32x32 variants MVP-8C/16C/32C) not tied to a specific model."
- "flow control not stated in source"
- "no unsolicited push notifications documented in source. The JSON"
- "no multi-step command sequences explicitly documented in source."
- "no explicit safety warnings, interlock procedures, or power-on"
- "firmware/hardware version compatibility not stated (only runtime queries). Exact I/O configuration for the \"884\" (8x8) variant not described. Flow control value not stated. Leading direction-byte transmission unconfirmed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
