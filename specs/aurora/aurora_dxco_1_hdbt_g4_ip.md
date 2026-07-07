---
spec_id: admin/aurora-dxco-1-hdbt-g4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora Dxco 1 Hdbt G4 Control Spec"
manufacturer: Aurora
model_family: "Aurora Dxco 1 Hdbt G4"
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - "Aurora Dxco 1 Hdbt G4"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.hdtvsupply.com
  - manualslib.com
source_urls:
  - https://files.hdtvsupply.com/brand/aurora/aurora-multimedia-dxm-88-16164-g4-um.pdf
  - "https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html?page=45"
retrieved_at: 2026-07-01T04:26:38.962Z
last_checked_at: 2026-07-07T11:02:06.956Z
generated_at: 2026-07-07T11:02:06.956Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source is a refined excerpt of a broader DXM matrix manual; device name \"Dxco 1 Hdbt G4\" vs. internal references \"DXM\"/\"DXM-884\" — model identity not fully reconciled. Firmware version not stated. Whether the TCP socket command port (1001) requires the web login credentials is not documented."
  - "# the command set documents no login sequence."
  - "exact JSON schema for ?JSON responses not fully documented in source (only fragment shown)."
  - "source documents no unsolicited notification events. All responses are"
  - "source documents no explicit multi-step macro sequences beyond the"
  - "no power-on sequencing or safety interlock requirements stated in source."
  - "device model identity — source is a DXM matrix manual excerpt but the target device is \"Axco 1 Hdbt G4\"; \"matrix max\" values depend on actual matrix size and are not fixed in source. Firmware version compatibility not stated. Whether TCP socket port 1001 requires web login credentials is not documented. JSON status response schema only partially documented."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:02:06.956Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions match source commands verbatim; transport (TCP port 1001, RS232 115200 8N1) confirmed in source. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Aurora Dxco 1 Hdbt G4 Control Spec

## Summary
Aurora Dxco 1 Hdbt G4 is an HDBaseT matrix/control device controllable via TCP/IP socket (default port 1001), RS-232 (default 115200 8N1 None), and a web management interface. This spec covers the Telnet/RS-232 ASCII command set documented in Appendix 3 of the source, including video/audio routing, EDID management, scene save/recall, HDCP/HDMI mode control, serial/UART routing, network configuration, and JSON status queries. Commands use ASCII mnemonics prefixed with `!` (command), `?` (query), or `~` (response), terminated by `<CR>` (0x0D).

<!-- UNRESOLVED: the source is a refined excerpt of a broader DXM matrix manual; device name "Dxco 1 Hdbt G4" vs. internal references "DXM"/"DXM-884" — model identity not fully reconciled. Firmware version not stated. Whether the TCP socket command port (1001) requires the web login credentials is not documented. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1001  # default socket server port, stated in source
serial:
  baud_rate: 115200  # default, stated in source (also configurable 38400/19200/9600)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # stated as "None" in default config
auth:
  type: credentials  # web interface credentials documented: user 'user', password '123456'
  # NOTE: credentials apply to the WEB management interface per source.
  # Whether the TCP socket command server (port 1001) and RS-232 require auth is UNRESOLVED:
  # the command set documents no login sequence.
```

## Traits
```yaml
traits:
  - routable    # inferred: video (!C/!CR) and audio (!T/!TR) routing + UART routing present
  - queryable   # inferred: many query commands (PW?/CR?/TR?/UART?/NETWORK?/SVER? etc.)
  - powerable   # inferred: card power command !CPOWER present
```

## Actions
```yaml
actions:
  # --- Video routing ---
  - id: switch_video_single
    label: Switch Single-Channel Video Input to Output(s)
    kind: action
    command: "!Catob,c<CR>"
    params:
      - name: a
        type: integer
        description: Input channel (1 ~ matrix max)
      - name: b
        type: integer
        description: Output channel (1 ~ matrix max or ALL)
      - name: c
        type: integer
        description: Additional output channel (1 ~ matrix max or ALL)

  - id: switch_video_correspondence
    label: Switch Video Input to Output Correspondence
    kind: action
    command: "!CRa:b,c:d<CR>"
    params:
      - name: a
        type: integer
        description: Input channel (1 ~ matrix max)
      - name: b
        type: integer
        description: Output channel (1 ~ matrix max)
      - name: c
        type: integer
        description: Input channel (1 ~ matrix max)
      - name: d
        type: integer
        description: Output channel (1 ~ matrix max)

  - id: select_video_input
    label: Select Video Input (combine with switch_video_out)
    kind: action
    command: "!CSWI:a<CR>"
    params:
      - name: a
        type: integer
        description: Input channel (1 ~ matrix max)

  - id: switch_video_out
    label: Switch Selected Video Input to Output(s)
    kind: action
    command: "!CSWO:a<CR>"
    params:
      - name: a
        type: integer
        description: Output channel (1 ~ matrix max)

  - id: query_video_output
    label: Query Video Output Status
    kind: query
    command: "?CR<CR>"
    params: []

  # --- Audio routing (V=Internal audio, E=External audio) ---
  - id: switch_audio_single
    label: Switch Single-Channel Audio Input to Output(s)
    kind: action
    command: "!Tatob,c<CR>"
    params:
      - name: a
        type: string
        description: "Input channel + V/E (1 ~ matrix max) + V/E. V=Internal audio, E=External audio"
      - name: b
        type: string
        description: "Output channel + V/E (1 ~ matrix max or ALL) + V/E"
      - name: c
        type: string
        description: "Additional output channel + V/E (1 ~ matrix max or ALL) + V/E"

  - id: switch_audio_correspondence
    label: Switch Audio Input to Output Correspondence
    kind: action
    command: "!TRa:b,c:d<CR>"
    params:
      - name: a
        type: string
        description: "Input channel + V/E (1 ~ matrix max) + V/E"
      - name: b
        type: string
        description: "Output channel + V/E (1 ~ matrix max or ALL) + V/E"
      - name: c
        type: string
        description: "Input channel + V/E (1 ~ matrix max or ALL) + V/E"
      - name: d
        type: string
        description: "Output channel + V/E (1 ~ matrix max or ALL) + V/E"

  - id: select_audio_input
    label: Select Audio Input (combine with switch_audio_out)
    kind: action
    command: "!TSWI:a<CR>"
    params:
      - name: a
        type: string
        description: "Input channel + V/E (1 ~ matrix max) + V/E"

  - id: switch_audio_out
    label: Switch Selected Audio Input to Output(s)
    kind: action
    command: "!TSWO:a<CR>"
    params:
      - name: a
        type: string
        description: "Output channel + V/E (1 ~ matrix max) + V/E"

  - id: query_audio_output
    label: Query Audio Output Status
    kind: query
    command: "?TR<CR>"
    params: []

  # --- Scenes ---
  - id: save_scene
    label: Save Current State to Scene
    kind: action
    command: "!Sa<CR>"
    params:
      - name: a
        type: integer
        description: Scene location (1 ~ 32 max)

  - id: call_scene
    label: Call (Recall) Scene
    kind: action
    command: "!Ra<CR>"
    params:
      - name: a
        type: integer
        description: Scene location (1 ~ 32 max)

  - id: set_scene_name
    label: Set Scene Name
    kind: action
    command: "!SNAMEa:b<CR>"
    params:
      - name: a
        type: integer
        description: Scene number (1 ~ 32 max)
      - name: b
        type: string
        description: Scene name (15 English chars max)

  - id: query_scene_name
    label: Query Scene Name
    kind: query
    command: "?SNAMEa<CR>"
    params:
      - name: a
        type: integer
        description: Scene location (1 ~ 32 max)

  - id: set_scene_web_display
    label: Set Scene Web Display
    kind: action
    command: "!SUSEa:b<CR>"
    params:
      - name: a
        type: integer
        description: Scene number (1 ~ 32 max)
      - name: b
        type: integer
        description: "0 = no display on WEB, 1 = display"

  - id: query_scene_status
    label: Query Scene Use Status
    kind: query
    command: "?SUSEa<CR>"
    params:
      - name: a
        type: integer
        description: Scene location (1 ~ 32 max)

  # --- Audio/Video synchronization ---
  - id: set_sync
    label: Set Audio/Video Synchronization
    kind: action
    command: "!SYNC:a<CR>"
    params:
      - name: a
        type: integer
        description: "0 = no synchronous, 1 = synchronous"

  - id: query_sync
    label: Query Audio/Video Synchronization Status
    kind: query
    command: "?SYNC<CR>"
    params: []

  - id: set_sync_mode
    label: Set Audio/Video Synchronization Mode
    kind: action
    command: "!SYNC_MODE:a<CR>"
    params:
      - name: a
        type: integer
        description: "Mode: 0=VE->VE, 1=VE->EV, 2=V->VE (default), 3=E->VE, 4=V->V, 5=E->E, 6=V->E, 7=E->V. V=Internal audio, E=External audio"

  - id: query_sync_mode
    label: Query Audio/Video Synchronization Mode
    kind: query
    command: "?SYNC_MODE<CR>"
    params: []

  # --- UART / Serial routing ---
  - id: uart_switch
    label: UART Switch
    kind: action
    command: "!CUARTatob,c<CR>"
    params:
      - name: a
        type: integer
        description: RX channel (1 ~ matrix max)
      - name: b
        type: integer
        description: TX channel (1 ~ matrix max or ALL)
      - name: c
        type: integer
        description: Additional TX channel (1 ~ matrix max or ALL)

  - id: query_uart_status
    label: Query Status of All UART
    kind: query
    command: "?CRUART<CR>"
    params: []

  # --- Network configuration ---
  - id: set_ip_address
    label: Set IP Address
    kind: action
    command: "!IP:a.b.c.d<CR>"
    params:
      - name: a
        type: integer
        description: Address octet (0 ~ 255)
      - name: b
        type: integer
        description: Address octet (0 ~ 255)
      - name: c
        type: integer
        description: Address octet (0 ~ 255)
      - name: d
        type: integer
        description: Address octet (0 ~ 255)

  - id: set_subnet
    label: Set Subnet Mask
    kind: action
    command: "!SUBNET:a.b.c.d<CR>"
    params:
      - name: a
        type: integer
        description: Address octet (0 ~ 255)
      - name: b
        type: integer
        description: Address octet (0 ~ 255)
      - name: c
        type: integer
        description: Address octet (0 ~ 255)
      - name: d
        type: integer
        description: Address octet (0 ~ 255)

  - id: set_gateway
    label: Set Gateway
    kind: action
    command: "!GATEWAY:a.b.c.d<CR>"
    params:
      - name: a
        type: integer
        description: Address octet (0 ~ 255)
      - name: b
        type: integer
        description: Address octet (0 ~ 255)
      - name: c
        type: integer
        description: Address octet (0 ~ 255)
      - name: d
        type: integer
        description: Address octet (0 ~ 255)

  - id: set_socket_server_port
    label: Set Socket Server Port
    kind: action
    command: "!PORT:a<CR>"
    params:
      - name: a
        type: integer
        description: Server port number

  - id: set_dhcp
    label: Set Network DHCP
    kind: action
    command: "!DHCP:a<CR>"
    params:
      - name: a
        type: integer
        description: "0 = DHCP off, 1 = DHCP on"

  - id: query_network
    label: Query Network Information
    kind: query
    command: "?NETWORK<CR>"
    params: []

  # --- Serial port config ---
  - id: set_serial_port
    label: Set Serial Port Parameters
    kind: action
    command: "!UART:a,b,c,d<CR>"
    params:
      - name: a
        type: integer
        description: "Baud rate (115200 / 38400 / 19200 / 9600)"
      - name: b
        type: integer
        description: "Data bits (8 / 9)"
      - name: c
        type: number
        description: "Stop bits (1 / 1.5 / 2)"
      - name: d
        type: string
        description: "Parity bits (None / Odd / Even)"

  - id: query_serial_port
    label: Query Serial Port Parameters
    kind: query
    command: "?UART<CR>"
    params: []

  # --- Command processing control ---
  - id: set_command_enable
    label: Set Command Enable
    kind: action
    command: "!CMDEN:a<CR>"
    params:
      - name: a
        type: integer
        description: "0 = commands not processed, 1 = commands processed"
    notes: When closed, commands received by socket and serial port are not processed (the !CMDEN command itself is still accepted).

  - id: query_command_enable
    label: Query Command Enable Status
    kind: query
    command: "?CMDEN<CR>"
    params: []

  - id: set_command_sound
    label: Set Command-Sent Sound
    kind: action
    command: "!CSOUND:a<CR>"
    params:
      - name: a
        type: integer
        description: "0 = no sound, 1 = sound when command is sent"

  - id: query_command_sound
    label: Query Command-Sent Sound Status
    kind: query
    command: "?CSOUND<CR>"
    params: []

  # --- EDID management ---
  - id: switch_edid_output_to_input
    label: Switch EDID of Output to Input Port
    kind: action
    command: "!EDIDatob<CR>"
    params:
      - name: a
        type: integer
        description: Output port (1 ~ matrix max)
      - name: b
        type: integer
        description: Input port (1 ~ matrix max or ALL)

  - id: switch_edid_system_to_input
    label: Switch EDID of System to Input Port
    kind: action
    command: "!SYSEatob<CR>"
    params:
      - name: a
        type: integer
        description: System EDID slot (1 ~ 16)
      - name: b
        type: integer
        description: Input port (1 ~ matrix max or ALL)

  - id: save_edid_output_to_system
    label: Save EDID of Output to System
    kind: action
    command: "!SEDIDatob<CR>"
    params:
      - name: a
        type: integer
        description: Output port (1 ~ matrix max)
      - name: b
        type: integer
        description: System EDID slot (1 ~ 16)

  - id: set_hdmi_dvi_mode
    label: Select Output Port HDMI/DVI Format
    kind: action
    command: "!HDMODE:a,b<CR>"
    params:
      - name: a
        type: integer
        description: Output port (1 ~ matrix max)
      - name: b
        type: integer
        description: "0 = DVI, 1 = HDMI"

  - id: set_hdcp
    label: Open/Close Port HDCP
    kind: action
    command: "!HDCP:a,b<CR>"
    params:
      - name: a
        type: integer
        description: Port (1 ~ matrix max, applies to IN/OUT card)
      - name: b
        type: integer
        description: "0 = OFF, 1 = ON"

  # --- Power ---
  - id: set_card_power
    label: Turn On/Off Card Power
    kind: action
    command: "!CPOWER:a,b<CR>"
    params:
      - name: a
        type: integer
        description: Port (1 ~ matrix max)
      - name: b
        type: integer
        description: "0 = OFF, 1 = ON"

  - id: query_card_power
    label: Query Card Power Status
    kind: query
    command: "?CPOWER:a<CR>"
    params:
      - name: a
        type: integer
        description: Port (1 ~ matrix max)

  # --- Management credentials ---
  - id: set_web_credentials
    label: Set Web Interface Username and Password
    kind: action
    command: "!MUNP:a,b<CR>"
    params:
      - name: a
        type: string
        description: Username (15 English chars or Arabic numerals)
      - name: b
        type: string
        description: Password (15 English chars or Arabic numerals)

  - id: query_web_credentials
    label: Query Management Username and Password
    kind: query
    command: "?MUNP<CR>"
    params: []

  # --- Control board ---
  - id: send_control_board_command
    label: Send Command to Control Board
    kind: action
    command: "!COMa<CR>"
    params:
      - name: a
        type: string
        description: Control card command

  - id: query_control_board_online
    label: Check Whether Central Control Board Is Online
    kind: query
    command: "?COM<CR>"
    params: []

  # --- TCP socket send ---
  - id: send_tcp_socket_data
    label: Send Data to TCP Socket Server
    kind: action
    command: "!SEND-SS:a:b,c<CR>"
    params:
      - name: a
        type: string
        description: Destination IP address
      - name: b
        type: integer
        description: Destination server port
      - name: c
        type: string
        description: Data to send

  - id: query_json_status
    label: Query Status Information (JSON)
    kind: query
    command: "?JSON:a,b<CR>"
    params:
      - name: a
        type: string
        description: 'Category ("video", "scene", "system", "weburl", "cont")'
      - name: b
        type: integer
        description: "Mark (status update version; 0 = request all data)"

  # --- System ---
  - id: set_system_language
    label: Set System Language
    kind: action
    command: "!LANG:a<CR>"
    params:
      - name: a
        type: integer
        description: "0 = English, 1 = Chinese"

  - id: query_system_language
    label: Query System Language
    kind: query
    command: "?LANG<CR>"
    params: []

  - id: soft_restart
    label: Restart the System
    kind: action
    command: "!SOF-RESTART<CR>"
    params: []

  - id: factory_reset
    label: Restore Factory Settings
    kind: action
    command: "!SYS-RESET<CR>"
    params: []

  - id: query_card_types
    label: Query All Daughter Card Types
    kind: query
    command: "?RCID<CR>"
    params: []

  - id: query_main_software_version
    label: Query Main Software Version
    kind: query
    command: "?SVER<CR>"
    params: []

  - id: query_hardware_version
    label: Query Hardware Version
    kind: query
    command: "?HVER<CR>"
    params: []

  - id: query_backboard_firmware_version
    label: Query Back Board Firmware Version
    kind: query
    command: "?BVER<CR>"
    params: []

  - id: query_matrix_type
    label: Query Matrix Type
    kind: query
    command: "?M0<CR>"
    params: []

  # --- HDBT card passthrough ---
  - id: send_hdbt_command
    label: Send Command to HDBT Card
    kind: action
    command: "!SEND-CU:a:xb:c<CR>"
    params:
      - name: a
        type: integer
        description: "Baud rate (115200 / 38400 / 19200 / 9600)"
      - name: x
        type: string
        description: 'Card side - "I" (input) or "O" (output)'
      - name: b
        type: integer
        description: Card port
      - name: c
        type: string
        description: "Data (prefix with '%H ' to send hex bytes instead of ASCII, e.g. '%H 01 02 03 04 05 0D 0A')"

  - id: send_recv_hdbt_command
    label: Send and Receive Command from HDBT Card
    kind: action
    command: "!SEND-CU-RECV:a:xb:c<CR>"
    params:
      - name: a
        type: integer
        description: "Baud rate (115200 / 38400 / 19200 / 9600)"
      - name: x
        type: string
        description: 'Card side - "I" (input) or "O" (output)'
      - name: b
        type: integer
        description: Card port
      - name: c
        type: string
        description: "Data (prefix with '%H ' to send hex bytes instead of ASCII)"
```

## Feedbacks
```yaml
feedbacks:
  - id: video_routing_state
    type: string
    description: "Response to ?CR - current video input/output correspondence, e.g. ~CR1:3,2:4<CR>"
  - id: audio_routing_state
    type: string
    description: "Response to ?TR - current audio input/output correspondence, e.g. ~TR1V:3V,2V:4V<CR>"
  - id: uart_routing_state
    type: string
    description: "Response to ?CRUART - all UART routing, e.g. ~CRUART1:1,2:1,...<CR>"
  - id: network_info
    type: string
    description: "Response to ?NETWORK - IP/subnet/gateway/port, multiline"
  - id: serial_config
    type: string
    description: "Response to ?UART - e.g. ~UART:9600,8,1,None<CR>"
  - id: command_enable_state
    type: enum
    values: [on, off]
    description: "Response to ?CMDEN (1/0)"
  - id: sound_state
    type: enum
    values: [on, off]
    description: "Response to ?CSOUND (1/0)"
  - id: card_power_state
    type: enum
    values: [on, off]
    description: "Response to ?CPOWER:a (1/0)"
  - id: sync_state
    type: enum
    values: [synchronous, asynchronous]
    description: "Response to ?SYNC (1/0)"
  - id: sync_mode
    type: integer
    description: "Response to ?SYNC_MODE - mode 0..7"
  - id: scene_name
    type: string
    description: "Response to ?SNAMEa"
  - id: scene_use_state
    type: enum
    values: [display, no_display]
    description: "Response to ?SUSEa (1/0)"
  - id: control_board_online
    type: enum
    values: [online, offline]
    description: "Response to ?COM - ~COM:1<CR> when online"
  - id: web_credentials
    type: string
    description: "Response to ?MUNP - current username,password"
  - id: system_language
    type: enum
    values: [english, chinese]
    description: "Response to ?LANG (0/1)"
  - id: card_types
    type: string
    description: "Response to ?RCID - daughter card type list"
  - id: main_software_version
    type: string
    description: "Response to ?SVER"
  - id: hardware_version
    type: string
    description: "Response to ?HVER"
  - id: backboard_firmware_version
    type: string
    description: "Response to ?BVER"
  - id: matrix_type
    type: string
    description: "Response to ?M0 - e.g. ~DXM-884<CR>"
  - id: json_status
    type: object
    description: "Response to ?JSON:a,b - JSON document (video/scene/system/weburl/cont)"
  # UNRESOLVED: exact JSON schema for ?JSON responses not fully documented in source (only fragment shown).
```

## Variables
```yaml
variables:
  - id: ip_address
    type: string
    description: Device IP address (set via !IP, default 192.168.88.229)
  - id: subnet_mask
    type: string
    description: Subnet mask (set via !SUBNET)
  - id: gateway
    type: string
    description: Gateway (set via !GATEWAY)
  - id: socket_server_port
    type: integer
    description: TCP socket server port (set via !PORT, default 1001)
  - id: dhcp_enabled
    type: boolean
    description: DHCP state (set via !DHCP)
  - id: serial_baud_rate
    type: integer
    description: RS-232 baud rate (set via !UART; 115200/38400/19200/9600)
  - id: system_language
    type: enum
    values: [english, chinese]
    description: System language (set via !LANG)
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notification events. All responses are
# solicited (prefixed ~) to a command/query. No async push events described.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences beyond the
# CSWI/CSWO (video) and TSWI/TSWO (audio) two-step select-then-switch pairs,
# which are represented as individual actions above.
```

## Safety
```yaml
confirmation_required_for:
  - soft_restart          # !SOF-RESTART restarts the system
  - factory_reset         # !SYS-RESET restores factory settings (destructive)
interlocks: []
# NOTE: source documents no explicit interlock procedures. The commands above are
# flagged as destructive based on their described effect (system restart / factory reset),
# not from an explicit source safety warning.
# UNRESOLVED: no power-on sequencing or safety interlock requirements stated in source.
```

## Notes
- Command prefixes: `!` = command, `?` = query, `~` = response. All terminated with `<CR>` (0x0D).
- Default communication settings: 115200 8N1 None. Default IP 192.168.88.229, socket server port 1001. Web server default port 80, credentials `user` / `123456`.
- Audio routing uses V/E suffix convention: V = Internal audio, E = External audio (e.g. `1V` = input 1 internal audio, `2E` = output 2 external audio).
- SYNC_MODE default is mode 2 (V -> VE).
- Scene locations are 1–32.
- HDBT card passthrough commands (`!SEND-CU` / `!SEND-CU-RECV`) support hex byte payloads via the `%H ` prefix (e.g. `%H 01 02 03 04 05 0D 0A`).
- RS-232 connector is 3.5mm TRS: Tip = TX, Ring = RX, Sleeve = GND.
- Troubleshooting note from source: when testing via terminal, commands may need to be sent in one shot (try Hercules over HyperTerminal); sending speed can affect operation. Check RX/TX swap and baud rate if commands fail.

<!-- UNRESOLVED: device model identity — source is a DXM matrix manual excerpt but the target device is "Axco 1 Hdbt G4"; "matrix max" values depend on actual matrix size and are not fixed in source. Firmware version compatibility not stated. Whether TCP socket port 1001 requires web login credentials is not documented. JSON status response schema only partially documented. -->
````

## Provenance

```yaml
source_domains:
  - files.hdtvsupply.com
  - manualslib.com
source_urls:
  - https://files.hdtvsupply.com/brand/aurora/aurora-multimedia-dxm-88-16164-g4-um.pdf
  - "https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html?page=45"
retrieved_at: 2026-07-01T04:26:38.962Z
last_checked_at: 2026-07-07T11:02:06.956Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:02:06.956Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions match source commands verbatim; transport (TCP port 1001, RS232 115200 8N1) confirmed in source. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source is a refined excerpt of a broader DXM matrix manual; device name \"Dxco 1 Hdbt G4\" vs. internal references \"DXM\"/\"DXM-884\" — model identity not fully reconciled. Firmware version not stated. Whether the TCP socket command port (1001) requires the web login credentials is not documented."
- "# the command set documents no login sequence."
- "exact JSON schema for ?JSON responses not fully documented in source (only fragment shown)."
- "source documents no unsolicited notification events. All responses are"
- "source documents no explicit multi-step macro sequences beyond the"
- "no power-on sequencing or safety interlock requirements stated in source."
- "device model identity — source is a DXM matrix manual excerpt but the target device is \"Axco 1 Hdbt G4\"; \"matrix max\" values depend on actual matrix size and are not fixed in source. Firmware version compatibility not stated. Whether TCP socket port 1001 requires web login credentials is not documented. JSON status response schema only partially documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
