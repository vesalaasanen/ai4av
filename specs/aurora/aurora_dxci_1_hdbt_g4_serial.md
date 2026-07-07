---
spec_id: admin/aurora-dxci-1-hdbt-g4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora Dxci 1 Hdbt G4 Control Spec"
manufacturer: Aurora
model_family: "Aurora Dxci 1 Hdbt G4"
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - "Aurora Dxci 1 Hdbt G4"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.avprosupply.com
  - manualslib.com
source_urls:
  - https://files.avprosupply.com/files/attachments/509376/aurora-multimedia-dxm-1616-g4-manual.pdf
  - https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html
retrieved_at: 2026-07-01T05:03:21.214Z
last_checked_at: 2026-07-07T11:00:10.769Z
generated_at: 2026-07-07T11:00:10.769Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "this spec's command set is the matrix-platform (DXM-G4) serial/LAN protocol; card-specific commands vs platform-wide commands not distinguished in source. Card power voltage/current specs not captured. PoC/PoE jumper state undocumented at protocol level."
  - "flow control not stated in source"
  - "source documents no unsolicited notifications / events."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "flow_control not stated. Card-specific power/voltage/current specs not captured (28V DC supply mentioned for HDBT board only). Firmware/software version compatibility ranges not stated (version queries return values but no compat matrix). Response format details for many commands partial in source tables."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:00:10.769Z
  matched_actions: 57
  action_count: 57
  confidence: medium
  summary: "All 57 spec actions matched verbatim to source command table; transport (serial 115200 8N1, TCP port 1001) fully supported. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Aurora Dxci 1 Hdbt G4 Control Spec

## Summary
HDBaseT card (1-port input, analog audio embedding, RS-232 passthrough) for the Aurora DXM-G4 Series Matrix platform. Control via RS-232 (bidirectional, 3-pin Phoenix) and TCP/IP socket server (ASCII command protocol). All commands terminated with `<CR>` (0x0D); `>` denotes command, `#` denotes query, `<` denotes response.

<!-- UNRESOLVED: this spec's command set is the matrix-platform (DXM-G4) serial/LAN protocol; card-specific commands vs platform-wide commands not distinguished in source. Card power voltage/current specs not captured. PoC/PoE jumper state undocumented at protocol level. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200        # default per source; range 9600~115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none       # UNRESOLVED: flow control not stated in source
  connector: "3PIN Phoenix female (PIN1=TX PIN2=GND PIN3=RX)"
addressing:
  port: 1001               # Socket Server port (stated)
auth:
  type: none               # inferred: no auth procedure for control socket in source (WEB management UI has separate credentials)
```

## Traits
```yaml
traits:
  - routable               # inferred: video/audio/UART routing commands present
  - queryable              # inferred: many query commands (#...) present
  - powerable              # inferred: CPOWER card power command present
```

## Actions
```yaml
# All payloads verbatim from source. <CR> = 0x0D terminator.
# `>` = command prefix, `#` = query prefix (per source legend).

- id: switch_video_input_to_output
  label: Switch Video Input to Output(s)
  kind: action
  command: ">C{input}to{outputs}<CR>"
  params:
    - name: input
      type: integer
      description: "input (1 ~ matrix max)"
    - name: outputs
      type: string
      description: "output list (1 ~ matrix max, or ALL), comma separated"

- id: switch_video_correspondence
  label: Switch Video Input/Output Correspondence
  kind: action
  command: ">CR{out_a}:{in_b},{out_c}:{in_d}<CR>"
  params:
    - name: mapping
      type: string
      description: "out:in pairs comma separated (out 1~max, in 1~max)"

- id: select_video_input
  label: Select Video Input (buffer)
  kind: action
  command: ">CSWI:{input}<CR>"
  params:
    - name: input
      type: integer
      description: "input (1 ~ matrix max); used with CSWO"

- id: switch_selected_video_to_output
  label: Switch Selected Video Input to Output(s)
  kind: action
  command: ">CSWO:{outputs}<CR>"
  params:
    - name: outputs
      type: string
      description: "output (1 ~ matrix max), comma separated"

- id: query_video_status
  label: Query Video Routing Status
  kind: query
  command: "#CR<CR>"
  params: []

- id: switch_audio_input_to_output
  label: Switch Audio Input to Output(s)
  kind: action
  command: ">T{input}{ve}to{outputs}<CR>"
  params:
    - name: input
      type: integer
      description: "input (1 ~ matrix max)"
    - name: ve
      type: string
      description: "V=Internal audio, E=External audio"
    - name: outputs
      type: string
      description: "out list (1~max or ALL) + V/E suffix, comma separated"

- id: switch_audio_correspondence
  label: Switch Audio Input/Output Correspondence
  kind: action
  command: ">TR{out_a}{ve}:{in_b}{ve},{out_c}{ve}:{in_d}{ve}<CR>"
  params:
    - name: mapping
      type: string
      description: "out:in pairs with V/E suffixes (V=Internal, E=External)"

- id: select_audio_input
  label: Select Audio Input (buffer)
  kind: action
  command: ">TSWI:{input}{ve}<CR>"
  params:
    - name: input
      type: integer
      description: "input (1 ~ matrix max)"
    - name: ve
      type: string
      description: "V=Internal audio, E=External audio"

- id: switch_selected_audio_to_output
  label: Switch Selected Audio Input to Output(s)
  kind: action
  command: ">TSWO:{outputs}<CR>"
  params:
    - name: outputs
      type: string
      description: "out (1~max) + V/E suffix, comma separated"

- id: query_audio_status
  label: Query Audio Routing Status
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
      description: "scene location (1 ~ 32 max)"

- id: call_scene
  label: Call Scene
  kind: action
  command: ">R{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: "scene location (1 ~ 32 max)"

- id: set_av_sync
  label: Set Audio/Video Synchronization
  kind: action
  command: ">SYNC:{value}<CR>"
  params:
    - name: value
      type: integer
      description: "0=no sync, 1=synchronous"

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
      description: "0:VE->VE 1:VE->EV 2:V->VE(default) 3:E->VE 4:V->V 5:E->E 6:V->E 7:E->V"

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
      description: "scene number (1 ~ 32 max)"
    - name: name
      type: string
      description: "scene name (15 English chars)"

- id: query_scene_name
  label: Query Scene Name
  kind: query
  command: "#SNAME{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: "scene location (1 ~ 32 max)"

- id: set_scene_web_display
  label: Set Scene Web Display
  kind: action
  command: ">SUSE{scene}:{value}<CR>"
  params:
    - name: scene
      type: integer
      description: "scene number (1 ~ 32 max)"
    - name: value
      type: integer
      description: "0=no display, 1=display"

- id: query_scene_web_display
  label: Query Scene Web Display Status
  kind: query
  command: "#SUSE{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: "scene location (1 ~ 32 max)"

- id: uart_switch
  label: UART Switch (RX to TX)
  kind: action
  command: ">CUART{rx}to{txs}<CR>"
  params:
    - name: rx
      type: integer
      description: "RX (1 ~ matrix max)"
    - name: txs
      type: string
      description: "TX (1 ~ matrix max or ALL), comma separated"

- id: query_uart_status
  label: Query All UART Status
  kind: query
  command: "#CRUART<CR>"
  params: []

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: ">IP:{a}.{b}.{c}.{d}<CR>"
  params:
    - name: a
      type: integer
      description: "octet (0~255)"
    - name: b
      type: integer
      description: "octet (0~255)"
    - name: c
      type: integer
      description: "octet (0~255)"
    - name: d
      type: integer
      description: "octet (0~255)"

- id: set_subnet
  label: Set Subnet Mask
  kind: action
  command: ">SUBNET:{a}.{b}.{c}.{d}<CR>"
  params:
    - name: a
      type: integer
      description: "octet (0~255)"
    - name: b
      type: integer
      description: "octet (0~255)"
    - name: c
      type: integer
      description: "octet (0~255)"
    - name: d
      type: integer
      description: "octet (0~255)"

- id: set_gateway
  label: Set Gateway
  kind: action
  command: ">GATEWAY:{a}.{b}.{c}.{d}<CR>"
  params:
    - name: a
      type: integer
      description: "octet (0~255)"
    - name: b
      type: integer
      description: "octet (0~255)"
    - name: c
      type: integer
      description: "octet (0~255)"
    - name: d
      type: integer
      description: "octet (0~255)"

- id: set_socket_port
  label: Set Socket Server Port
  kind: action
  command: ">PORT:{port}<CR>"
  params:
    - name: port
      type: integer
      description: "Server port"

- id: set_dhcp
  label: Set Network DHCP
  kind: action
  command: ">DHCP:{value}<CR>"
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"

- id: query_network
  label: Query Network Information
  kind: query
  command: "#NETWORK<CR>"
  params: []

- id: set_serial_port
  label: Set Serial Port Configuration
  kind: action
  command: ">UART:{baud},{databits},{stopbits},{parity}<CR>"
  params:
    - name: baud
      type: integer
      description: "Baud Rate (115200 38400 19200 9600)"
    - name: databits
      type: integer
      description: "Data bits (8 9)"
    - name: stopbits
      type: number
      description: "Stop bits (1 1.5 2)"
    - name: parity
      type: string
      description: "Parity (None Odd Even)"

- id: query_serial_port
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
      description: "0=disable, 1=enable"

- id: query_command_enable
  label: Query Command Enable Status
  kind: query
  command: "#CMDEN<CR>"
  params: []

- id: set_command_sound
  label: Set Command Send Sound
  kind: action
  command: ">CSOUND:{value}<CR>"
  params:
    - name: value
      type: integer
      description: "0=no sound, 1=sound"

- id: query_command_sound
  label: Query Command Send Sound Status
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
      description: "output (1 ~ matrix max)"
    - name: input
      type: string
      description: "input (1 ~ matrix max or ALL)"

- id: switch_system_edid_to_input
  label: Switch System EDID to Input
  kind: action
  command: ">SYSE{system}to{input}<CR>"
  params:
    - name: system
      type: integer
      description: "system (1 ~ 16)"
    - name: input
      type: string
      description: "input (1 ~ matrix max or ALL)"

- id: save_edid_output_to_system
  label: Save EDID of Output to System
  kind: action
  command: ">SEDID{output}to{system}<CR>"
  params:
    - name: output
      type: integer
      description: "output (1 ~ matrix max)"
    - name: system
      type: integer
      description: "system (1 ~ 16)"

- id: set_output_hdmi_dvi_mode
  label: Set Output HDMI/DVI Format
  kind: action
  command: ">HDMODE:{output},{mode}<CR>"
  params:
    - name: output
      type: integer
      description: "output (1 ~ matrix max)"
    - name: mode
      type: integer
      description: "0=DVI, 1=HDMI"

- id: set_port_hdcp
  label: Set Port HDCP (IN/OUT card)
  kind: action
  command: ">HDCP:{port},{value}<CR>"
  params:
    - name: port
      type: integer
      description: "port (1 ~ matrix max)"
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: set_card_power
  label: Set Card Power
  kind: action
  command: ">CPOWER:{port},{value}<CR>"
  params:
    - name: port
      type: integer
      description: "port (1 ~ matrix max)"
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: query_card_power
  label: Query Card Power Status
  kind: query
  command: "#CPOWER:{port}<CR>"
  params:
    - name: port
      type: integer
      description: "port (1 ~ matrix max)"

- id: set_web_user_pass
  label: Set WEB Username and Password
  kind: action
  command: ">MUNP:{name},{password}<CR>"
  params:
    - name: name
      type: string
      description: "name (15 English chars or Arabic numerals)"
    - name: password
      type: string
      description: "password (15 English chars or Arabic numerals)"

- id: query_web_user_pass
  label: Query WEB Username and Password
  kind: query
  command: "#MUNP<CR>"
  params: []

- id: send_to_control_board
  label: Send Command to Control Board
  kind: action
  command: ">COM{control_command}<CR>"
  params:
    - name: control_command
      type: string
      description: "control card command"

- id: query_control_board_online
  label: Query Control Board Online
  kind: query
  command: "#COM<CR>"
  params: []

- id: send_to_tcp_socket
  label: Send Data to TCP Socket Server
  kind: action
  command: ">SEND-SS:{ip}:{port},{data}<CR>"
  params:
    - name: ip
      type: string
      description: "IP address"
    - name: port
      type: integer
      description: "Server port"
    - name: data
      type: string
      description: "data to send"

- id: query_json_status
  label: Query Status (JSON format)
  kind: query
  command: "#JSON:{category},{mark}<CR>"
  params:
    - name: category
      type: string
      description: '"video","scene","system","weburl","cont"'
    - name: mark
      type: integer
      description: "Status update version; 0 = request all data"

- id: set_system_language
  label: Set System Language
  kind: action
  command: ">LANG:{value}<CR>"
  params:
    - name: value
      type: integer
      description: "0=English, 1=Chinese"

- id: query_system_language
  label: Query System Language
  kind: query
  command: "#LANG<CR>"
  params: []

- id: soft_restart
  label: Restart System
  kind: action
  command: ">SOF-RESTART<CR>"
  params: []

- id: factory_reset
  label: Restore Factory Settings
  kind: action
  command: ">SYS-RESET<CR>"
  params: []

- id: query_daughter_card_types
  label: Query All Daughter Card
  kind: query
  command: "#RCID<CR>"
  params: []

- id: query_main_software_version
  label: Query Main Software Version
  kind: query
  command: "#SVER<CR>"
  params: []

- id: query_hardware_version
  label: Query Hardware Version
  kind: query
  command: "#HVER<CR>"
  params: []

- id: query_backboard_version
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
  command: ">SEND-CU:{baud}:{x}{port}:{data}<CR>"
  params:
    - name: baud
      type: integer
      description: "baud Rate (115200 38400 19200 9600)"
    - name: x
      type: string
      description: "I or O (input or output)"
    - name: port
      type: integer
      description: "card port"
    - name: data
      type: string
      description: "data/command"
```

## Feedbacks
```yaml
- id: video_routing_state
  type: string
  description: "Response to #CR, e.g. <CR1:3,2:4<CR>"

- id: audio_routing_state
  type: string
  description: "Response to #TR, e.g. <TR1V:3V,2V:4B<CR>"

- id: av_sync_state
  type: enum
  values: [0, 1]
  description: "Response to #SYNC, 0=no sync 1=synchronous"

- id: sync_mode_state
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  description: "Response to #SYNC_MODE"

- id: uart_routing_state
  type: string
  description: "Response to #CRUART, e.g. <CRUART1:1,2:1,..."

- id: card_power_state
  type: enum
  values: [0, 1]
  description: "Response to #CPOWER:{port}, 0=OFF 1=ON"

- id: control_board_online
  type: enum
  values: [0, 1]
  description: "Response to #COM, <COM:1<CR> means online"

- id: matrix_type
  type: string
  description: "Response to #M0, e.g. MVP-16C"
```

## Variables
```yaml
# Network/serial config settable via dedicated commands (IP, SUBNET, GATEWAY,
# PORT, DHCP, UART, LANG, CMDEN, CSOUND) are captured as Actions above.
# No additional continuous variables documented in source.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications / events.
```

## Macros
```yaml
# CSWI + CSWO and TSWI + TSWO are two-step select-then-switch sequences
# documented in source, but each step is a standalone command (listed above).
# No multi-command macros documented beyond these.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset        # SYS-RESET restores factory settings
  - soft_restart         # SOF-RESTART restarts system
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. PoC/PoE jumper (J4/J5) handling is a
# physical install procedure, not a protocol-level interlock.
```

## Notes
- Command protocol legend: `>` = command, `#` = query, `<` = response, `<CR>` = 0x0D (13 decimal).
- Default serial: 115200 8N1 None. Default IP: 192.168.88.229. Socket Server port: 1001.
- WEB management defaults: IP 192.168.88.229, port 80, user `user`, password `123456` (settable via MUNP command).
- Audio routing uses V=Internal audio, E=External audio suffixes.
- Bidirectional RS-232 passthrough only supports point-to-point (per source note).
- Serial port configurable via UART command (baud 9600/19200/38400/115200, data 8/9, stop 1/1.5/2, parity None/Odd/Even).
- HDBT modules (PoC) can supply power to connected HDBT modules via jumpers J4/J5 (PoC left / PoE right, PoE prepared but not yet available).

<!-- UNRESOLVED: flow_control not stated. Card-specific power/voltage/current specs not captured (28V DC supply mentioned for HDBT board only). Firmware/software version compatibility ranges not stated (version queries return values but no compat matrix). Response format details for many commands partial in source tables. -->
````

Spec built. 57 actions enumerated (all source rows). Serial+TCP transport, port 1001, baud 115200 — all stated, none assumed. Auth marked inferred-none (web has separate creds). Voltage/power/firmware gaps flagged UNRESOLVED.

## Provenance

```yaml
source_domains:
  - files.avprosupply.com
  - manualslib.com
source_urls:
  - https://files.avprosupply.com/files/attachments/509376/aurora-multimedia-dxm-1616-g4-manual.pdf
  - https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html
retrieved_at: 2026-07-01T05:03:21.214Z
last_checked_at: 2026-07-07T11:00:10.769Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:00:10.769Z
matched_actions: 57
action_count: 57
confidence: medium
summary: "All 57 spec actions matched verbatim to source command table; transport (serial 115200 8N1, TCP port 1001) fully supported. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "this spec's command set is the matrix-platform (DXM-G4) serial/LAN protocol; card-specific commands vs platform-wide commands not distinguished in source. Card power voltage/current specs not captured. PoC/PoE jumper state undocumented at protocol level."
- "flow control not stated in source"
- "source documents no unsolicited notifications / events."
- "source contains no explicit safety warnings, interlock procedures,"
- "flow_control not stated. Card-specific power/voltage/current specs not captured (28V DC supply mentioned for HDBT board only). Firmware/software version compatibility ranges not stated (version queries return values but no compat matrix). Response format details for many commands partial in source tables."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
