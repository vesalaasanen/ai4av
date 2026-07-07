---
spec_id: admin/aurora-dxm-1616-g4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora DXM 1616 G4 Control Spec"
manufacturer: Aurora
model_family: "DXM 1616 G4"
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - "DXM 1616 G4"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.hdtvsupply.com
  - files.avprosupply.com
  - manualslib.com
source_urls:
  - https://files.hdtvsupply.com/brand/aurora/aurora-multimedia-dxm-88-16164-g4-um.pdf
  - https://files.avprosupply.com/files/attachments/509376/aurora-multimedia-dxm-1616-g4-manual.pdf
  - https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html
retrieved_at: 2026-07-02T21:10:01.529Z
last_checked_at: 2026-07-07T11:02:08.479Z
generated_at: 2026-07-07T11:02:08.479Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "matrix max input/output count (model implies 16×16 but command variables use \"matrix max\" without a stated ceiling); firmware version compatibility not stated"
  - "confirm whether routing changes via WEB UI"
  - "source contains no explicit interlock procedures or power-on"
  - "\"matrix max\" input/output ceiling never stated numerically (model name implies 16×16)"
  - "firmware version compatibility not stated in source"
  - "whether WEB UI routing changes push unsolicited events over the socket"
verification:
  verdict: verified
  checked_at: 2026-07-07T11:02:08.479Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions map to literal source commands with matching syntax; transport parameters verified; bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Aurora DXM 1616 G4 Control Spec

## Summary
The Aurora DXM 1616 G4 is a 16×16 HDMI/HDBaseT matrix switcher with RS-232C and TCP/IP (Telnet/socket server) control. This spec covers the ASCII command protocol (`!` command, `?` query, `~` response, `<CR>` = 0x0D) documented in the vendor Operation Guide, including video/audio routing, scene management, EDID control, HDCP, per-card power, UART routing, network configuration, and HDBT card passthrough. Commands are identical over the RS-232 and TCP/IP transports.

<!-- UNRESOLVED: matrix max input/output count (model implies 16×16 but command variables use "matrix max" without a stated ceiling); firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1001  # socket server port (Telnet-style command channel); source: "Default IP: 192.168.88.229 Port 1001"
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: "Default RS232: 115200 8N1 None"
auth:
  type: none  # inferred: no login procedure documented for the TCP socket server / RS232 command channel
```

## Traits
```yaml
traits:
  - routable  # inferred from video/audio routing commands (!C, !CR, !T, !TR, CSWI/CSWO)
  - queryable  # inferred from query commands (?CR, ?TR, ?NETWORK, ?UART, ?SVER, etc.)
  - powerable  # inferred from per-card power command (!CPOWER)
```

## Actions
```yaml
# Convention from source: ! = command, ? = query, ~ = response. <CR> = 0x0D.
# All command strings copied verbatim from the Operation Guide command table.

- id: switch_video_single
  label: Switch Video Input to Output(s)
  kind: action
  command: "!C{input}to{outputs}<CR>"
  params:
    - name: input
      type: integer
      description: Input channel (1 ~ matrix max)
    - name: outputs
      type: string
      description: Comma-separated output channels (1 ~ matrix max), or "ALL"
  notes: Example !C1to2,3<CR> routes video input 1 to outputs 2 and 3.

- id: switch_video_multi
  label: Switch Video Input-to-Output Correspondence
  kind: action
  command: "!CR{a}:{b},{c}:{d}<CR>"
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
  label: Select Video Input (stage for CSWO)
  kind: action
  command: "!CSWI:{input}<CR>"
  params:
    - name: input
      type: integer
      description: Input channel (1 ~ matrix max)
  notes: Must be combined with !CSWO.

- id: switch_video_output
  label: Switch Selected Video Input to Output(s)
  kind: action
  command: "!CSWO:{outputs}<CR>"
  params:
    - name: outputs
      type: string
      description: Comma-separated output channels (1 ~ matrix max)
  notes: Uses input selected by prior !CSWI.

- id: query_video_routing
  label: Query Video Output Routing
  kind: query
  command: "?CR<CR>"
  params: []

- id: switch_audio_single
  label: Switch Audio Input to Output(s)
  kind: action
  command: "!T{input}{ie}to{outputs}<CR>"
  params:
    - name: input
      type: integer
      description: Input channel (1 ~ matrix max)
    - name: ie
      type: string
      description: "Internal/External audio flag for input: V = internal audio, E = external audio"
    - name: outputs
      type: string
      description: Comma-separated "outN{V|E}" tokens (1 ~ matrix max or ALL)
  notes: Example !T1Vto2V,2E<CR>. V=internal audio, E=external audio.

- id: switch_audio_multi
  label: Switch Audio Input-to-Output Correspondence
  kind: action
  command: "!TR{a}{ae}:{b},{c}:{d}<CR>"
  params:
    - name: a
      type: integer
      description: Input channel (1 ~ matrix max)
    - name: ae
      type: string
      description: V/E audio flag for input a
    - name: b
      type: string
      description: "outN{V|E} output token"
    - name: c
      type: integer
      description: Input channel (1 ~ matrix max)
    - name: d
      type: string
      description: "outN{V|E} output token"
  notes: Example !TR1V:2V,1E:2E<CR>.

- id: select_audio_input
  label: Select Audio Input (stage for TSWO)
  kind: action
  command: "!TSWI:{input}<CR>"
  params:
    - name: input
      type: string
      description: "Input channel + V/E flag, e.g. 2V (1 ~ matrix max)"
  notes: Must be combined with !TSWO. V=internal audio, E=external audio.

- id: switch_audio_output
  label: Switch Selected Audio Input to Output(s)
  kind: action
  command: "!TSWO:{outputs}<CR>"
  params:
    - name: outputs
      type: string
      description: "Comma-separated outN{V|E} tokens (1 ~ matrix max)"
  notes: Uses input selected by prior !TSWI.

- id: query_audio_routing
  label: Query Audio Output Routing
  kind: query
  command: "?TR<CR>"
  params: []

- id: save_scene
  label: Save Scene
  kind: action
  command: "!S{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location (1 ~ 32 max)

- id: call_scene
  label: Call Scene
  kind: action
  command: "!R{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location (1 ~ 32 max)

- id: set_av_sync
  label: Set Audio/Video Synchronization
  kind: action
  command: "!SYNC:{mode}<CR>"
  params:
    - name: mode
      type: integer
      description: "0 = no synchronous, 1 = synchronous"

- id: query_av_sync
  label: Query Audio/Video Synchronization
  kind: query
  command: "?SYNC<CR>"
  params: []

- id: set_av_sync_mode
  label: Set Audio/Video Synchronization Mode
  kind: action
  command: "!SYNC_MODE:{mode}<CR>"
  params:
    - name: mode
      type: integer
      description: "0: VE->VE, 1: VE->EV, 2: V->VE (default), 3: E->VE, 4: V->V, 5: E->E, 6: V->E, 7: E->V"

- id: query_av_sync_mode
  label: Query Audio/Video Synchronization Mode
  kind: query
  command: "?SYNC_MODE<CR>"
  params: []

- id: set_scene_name
  label: Set Scene Name
  kind: action
  command: "!SNAME{scene}:{name}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene number (1 ~ 32 max)
    - name: name
      type: string
      description: Scene name (max 15 English characters)

- id: query_scene_name
  label: Query Scene Name
  kind: query
  command: "?SNAME{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location (1 ~ 32 max)

- id: set_scene_web_display
  label: Set Scene Web Display
  kind: action
  command: "!SUSE{scene}:{display}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene number (1 ~ 32 max)
    - name: display
      type: integer
      description: "0 = no display on WEB, 1 = display"

- id: query_scene_use
  label: Query Scene Status
  kind: query
  command: "?SUSE{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location (1 ~ 32 max)

- id: uart_switch
  label: UART Switch (route RX to TX)
  kind: action
  command: "!CUART{rx}to{txs}<CR>"
  params:
    - name: rx
      type: integer
      description: RX port (1 ~ matrix max)
    - name: txs
      type: string
      description: Comma-separated TX ports (1 ~ matrix max or ALL)
  notes: Example !CUART1to1,2<CR>.

- id: query_uart_status
  label: Query All UART Status
  kind: query
  command: "?CRUART<CR>"
  params: []

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "!IP:{a}.{b}.{c}.{d}<CR>"
  params:
    - name: a
      type: integer
      description: Octet (0 ~ 255)
    - name: b
      type: integer
      description: Octet (0 ~ 255)
    - name: c
      type: integer
      description: Octet (0 ~ 255)
    - name: d
      type: integer
      description: Octet (0 ~ 255)

- id: set_subnet
  label: Set Subnet Mask
  kind: action
  command: "!SUBNET:{a}.{b}.{c}.{d}<CR>"
  params:
    - name: a
      type: integer
      description: Octet (0 ~ 255)
    - name: b
      type: integer
      description: Octet (0 ~ 255)
    - name: c
      type: integer
      description: Octet (0 ~ 255)
    - name: d
      type: integer
      description: Octet (0 ~ 255)

- id: set_gateway
  label: Set Gateway
  kind: action
  command: "!GATEWAY:{a}.{b}.{c}.{d}<CR>"
  params:
    - name: a
      type: integer
      description: Octet (0 ~ 255)
    - name: b
      type: integer
      description: Octet (0 ~ 255)
    - name: c
      type: integer
      description: Octet (0 ~ 255)
    - name: d
      type: integer
      description: Octet (0 ~ 255)

- id: set_socket_port
  label: Set Socket Server Port
  kind: action
  command: "!PORT:{port}<CR>"
  params:
    - name: port
      type: integer
      description: Server port

- id: set_dhcp
  label: Set Network DHCP
  kind: action
  command: "!DHCP:{state}<CR>"
  params:
    - name: state
      type: integer
      description: "0 = off, 1 = on"

- id: query_network
  label: Query Network Information
  kind: query
  command: "?NETWORK<CR>"
  params: []
  notes: Returns IP, subnet, gateway, and port.

- id: set_serial_port
  label: Set Serial Port Parameters
  kind: action
  command: "!UART:{baud},{data},{stop},{parity}<CR>"
  params:
    - name: baud
      type: integer
      description: "Baud rate: 115200, 38400, 19200, or 9600"
    - name: data
      type: integer
      description: "Data bits: 8 or 9"
    - name: stop
      type: number
      description: "Stop bits: 1, 1.5, or 2"
    - name: parity
      type: string
      description: "Parity: None, Odd, or Even"

- id: query_serial_port
  label: Query Serial Port Parameters
  kind: query
  command: "?UART<CR>"
  params: []

- id: set_command_enable
  label: Set Command Enable
  kind: action
  command: "!CMDEN:{state}<CR>"
  params:
    - name: state
      type: integer
      description: "0 = disabled, 1 = enabled"
  notes: When disabled, socket/serial commands are not processed (this command itself still works).

- id: query_command_enable
  label: Query Command Enable
  kind: query
  command: "?CMDEN<CR>"
  params: []

- id: set_command_sound
  label: Set Command-Send Sound
  kind: action
  command: "!CSOUND:{state}<CR>"
  params:
    - name: state
      type: integer
      description: "0 = no sound, 1 = sound on command send"

- id: query_command_sound
  label: Query Command-Send Sound
  kind: query
  command: "?CSOUND<CR>"
  params: []

- id: switch_edid_output
  label: Switch Output EDID to Input Port
  kind: action
  command: "!EDID{output}to{input}<CR>"
  params:
    - name: output
      type: integer
      description: Output channel (1 ~ matrix max)
    - name: input
      type: string
      description: Input channel (1 ~ matrix max or ALL)

- id: switch_edid_system
  label: Switch System EDID to Input Port
  kind: action
  command: "!SYSE{system}to{input}<CR>"
  params:
    - name: system
      type: integer
      description: System EDID slot (1 ~ 16)
    - name: input
      type: string
      description: Input channel (1 ~ matrix max or ALL)

- id: save_edid_to_system
  label: Save Output EDID to System
  kind: action
  command: "!SEDID{output}to{system}<CR>"
  params:
    - name: output
      type: integer
      description: Output channel (1 ~ matrix max)
    - name: system
      type: integer
      description: System EDID slot (1 ~ 16)

- id: set_hdmi_dvi_mode
  label: Set Output HDMI/DVI Format
  kind: action
  command: "!HDMODE:{output},{mode}<CR>"
  params:
    - name: output
      type: integer
      description: Output channel (1 ~ matrix max)
    - name: mode
      type: integer
      description: "0 = DVI, 1 = HDMI"

- id: set_port_hdcp
  label: Set Port HDCP (IN/OUT card)
  kind: action
  command: "!HDCP:{port},{state}<CR>"
  params:
    - name: port
      type: integer
      description: Port (1 ~ matrix max)
    - name: state
      type: integer
      description: "0 = OFF, 1 = ON"

- id: set_card_power
  label: Set Card Power
  kind: action
  command: "!CPOWER:{port},{state}<CR>"
  params:
    - name: port
      type: integer
      description: Port (1 ~ matrix max)
    - name: state
      type: integer
      description: "0 = OFF, 1 = ON"

- id: query_card_power
  label: Query Card Power Status
  kind: query
  command: "?CPOWER:{port}<CR>"
  params:
    - name: port
      type: integer
      description: Port (1 ~ matrix max)

- id: set_management_user
  label: Set Management Username and Password
  kind: action
  command: "!MUNP:{user},{password}<CR>"
  params:
    - name: user
      type: string
      description: Username (max 15 English chars or Arabic numerals)
    - name: password
      type: string
      description: Password (max 15 English chars or Arabic numerals)
  notes: Sets the WEB interface login credentials.

- id: query_management_user
  label: Query Management Username and Password
  kind: query
  command: "?MUNP<CR>"
  params: []

- id: send_control_board_command
  label: Send Command to Control Board
  kind: action
  command: "!COM{cmd}<CR>"
  params:
    - name: cmd
      type: string
      description: Control card command string (e.g. "-TEST")
  notes: "Returns NULL (online) or ERROR (offline)."

- id: query_control_board_online
  label: Query Central Control Board Online
  kind: query
  command: "?COM<CR>"
  params: []
  notes: Responds ~COM:1<CR> when online.

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
      description: Data to send
  notes: Example !SEND-SS:192.168.88.100:1001,TEST<CR>. Response ~SEND-SS:4<CR>.

- id: query_json_status
  label: Query Status (JSON format)
  kind: query
  command: "?JSON:{section},{mark}<CR>"
  params:
    - name: section
      type: string
      description: "One of: video, scene, system, weburl, cont"
    - name: mark
      type: integer
      description: Status update version mark; 0 = request all data
  notes: Returns status in JSON format.

- id: set_system_language
  label: Set System Language
  kind: action
  command: "!LANG:{lang}<CR>"
  params:
    - name: lang
      type: integer
      description: "0 = English, 1 = Chinese"

- id: query_system_language
  label: Query System Language
  kind: query
  command: "?LANG<CR>"
  params: []

- id: soft_restart
  label: Restart System
  kind: action
  command: "!SOF-RESTART<CR>"
  params: []

- id: factory_reset
  label: Restore Factory Settings
  kind: action
  command: "!SYS-RESET<CR>"
  params: []

- id: query_daughter_card_types
  label: Query All Daughter Card Types
  kind: query
  command: "?RCID<CR>"
  params: []
  notes: Example response ~RCID:1:I1,2:N/A..<CR>.

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

- id: query_backboard_version
  label: Query Back Board Firmware Version
  kind: query
  command: "?BVER<CR>"
  params: []

- id: query_matrix_type
  label: Query Matrix Type
  kind: query
  command: "?M0<CR>"
  params: []
  notes: Example response ~DXM-884<CR>.

- id: send_hdbt_command
  label: Send Command to HDBT Card
  kind: action
  command: "!SEND-CU:{baud}:{x}{port}:{data}<CR>"
  params:
    - name: baud
      type: integer
      description: "Baud rate: 115200, 38400, 19200, or 9600"
    - name: x
      type: string
      description: "Card type: I (input) or O (output)"
    - name: port
      type: integer
      description: Card port
    - name: data
      type: string
      description: Data to send
  notes: "To send hex instead of ASCII, prefix data with %H, e.g. %H 01 02 03 04 05 0D 0A. Example !SEND-CU:115200:O1:TEST<CR>."

- id: send_recv_hdbt_command
  label: Send and Receive from HDBT Card
  kind: action
  command: "!SEND-CU-RECV:{baud}:{x}{port}:{data}<CR>"
  params:
    - name: baud
      type: integer
      description: "Baud rate: 115200, 38400, 19200, or 9600"
    - name: x
      type: string
      description: "Card type: I (input) or O (output)"
    - name: port
      type: integer
      description: Card port
    - name: data
      type: string
      description: Data to send
  notes: "Response ~RECV-CU:{port}:{data}<CR> on success, <RECV-CU:{port}:Timeout<CR> on no return. Hex supported via %H prefix. Example !SEND-CU-RECV:115200:O1:TEST<CR>."
```

## Feedbacks
```yaml
- id: command_response
  type: string
  description: >
    Every command/query echoes back a "~" response line mirroring the issued
    command (e.g. !C1to2,3<CR> -> ~C1to2,3<CR>). Carriage return <CR> = 0x0D
    terminates each response.

- id: control_board_online
  type: enum
  values: ["online (~COM:1)", "offline (NULL/ERROR)"]

- id: hdbt_recv
  type: string
  description: "~RECV-CU:{port}:{data}<CR> on success; <RECV-CU:{port}:Timeout<CR> on no response."

- id: json_status
  type: json
  description: JSON status payload returned by ?JSON query (video/scene/system/weburl/cont sections).
```

## Variables
```yaml
# All settable parameters are modeled as Actions above (scene, sync mode, EDID,
# HDCP, card power, network, serial port, language, credentials). No additional
# continuous variables (volume/gain/brightness) are documented in the source.
```

## Events
```yaml
# Source documents no unsolicited notifications; the device only responds ("~")
# to commands/queries. UNRESOLVED: confirm whether routing changes via WEB UI
# generate push events over the socket connection.
```

## Macros
```yaml
# The CSWI/CSWO and TSWI/TSWO pairs are two-step sequences (stage input, then
# switch outputs) described explicitly in source rows 3-4 and 8-9. Treat as
# paired command sequences, not single macros.
```

## Safety
```yaml
confirmation_required_for:
  - "!SYS-RESET"  # factory reset - destructive, restores all defaults
  - "!SOF-RESTART"  # system restart - drops all connections
  - "!IP / !SUBNET / !GATEWAY / !PORT"  # network changes - may sever control connection
  - "!UART"  # serial reconfig - may break active RS-232 session
interlocks: []
# UNRESOLVED: source contains no explicit interlock procedures or power-on
# sequencing requirements beyond the troubleshooting note that command-send
# speed can affect operation (use Hercules over HyperTerminal to send in one shot).
```

## Notes
- Control channel: commands are identical over RS-232 (115200 8N1 None, 3.5mm TRS — tip=TX, ring=RX, sleeve=GND) and the TCP socket server (default port 1001).
- Command grammar: `!` = command, `?` = query, `~` = response. Every line terminated by `<CR>` (0x0D / decimal 13).
- Audio routing uses V/E suffixes: V = internal (embedded) audio, E = external (de-embedded) audio.
- Scene slots: 1–32. System EDID slots: 1–16.
- HDBT card passthrough supports hex payloads via `%H` prefix (e.g. `!SEND-CU-RECV:115200:1:%H 01 02 03 04 05 0D 0A<CR>`).
- Web management UI is a separate interface (factory default IP 192.168.88.229, port 80, default login user `user` / password `123456`) and is NOT part of the documented `!/?/~` command channel; auth for the command channel itself is none.
- Troubleshooting note from source: if RS-232 commands fail, check RX/TX swap, baud rate, and use a terminal (Hercules) that sends the full command in one shot rather than character-by-character.

<!-- UNRESOLVED: "matrix max" input/output ceiling never stated numerically (model name implies 16×16) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: whether WEB UI routing changes push unsolicited events over the socket -->

---

## Provenance

```yaml
source_domains:
  - files.hdtvsupply.com
  - files.avprosupply.com
  - manualslib.com
source_urls:
  - https://files.hdtvsupply.com/brand/aurora/aurora-multimedia-dxm-88-16164-g4-um.pdf
  - https://files.avprosupply.com/files/attachments/509376/aurora-multimedia-dxm-1616-g4-manual.pdf
  - https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html
retrieved_at: 2026-07-02T21:10:01.529Z
last_checked_at: 2026-07-07T11:02:08.479Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:02:08.479Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions map to literal source commands with matching syntax; transport parameters verified; bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "matrix max input/output count (model implies 16×16 but command variables use \"matrix max\" without a stated ceiling); firmware version compatibility not stated"
- "confirm whether routing changes via WEB UI"
- "source contains no explicit interlock procedures or power-on"
- "\"matrix max\" input/output ceiling never stated numerically (model name implies 16×16)"
- "firmware version compatibility not stated in source"
- "whether WEB UI routing changes push unsolicited events over the socket"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
