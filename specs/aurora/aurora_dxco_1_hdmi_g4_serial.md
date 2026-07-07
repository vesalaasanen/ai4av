---
spec_id: admin/aurora-dxco-1-hdmi-g4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora Dxco 1 Hdmi G4 Control Spec"
manufacturer: Aurora
model_family: "Dxco 1 Hdmi G4"
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - "Dxco 1 Hdmi G4"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.hdtvsupply.com
  - manualslib.com
source_urls:
  - https://files.hdtvsupply.com/brand/aurora/aurora-multimedia-dxm-88-16164-g4-um.pdf
  - https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html
  - "https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html?page=45"
retrieved_at: 2026-07-01T05:30:44.807Z
last_checked_at: 2026-07-07T11:02:07.738Z
generated_at: 2026-07-07T11:02:07.738Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact matrix size (input/output count) not stated in source; variables reference \"matrix max\" without a concrete number. Source example response `~M0:DXM-884` suggests an 8x8 variant but model line is broader."
  - "flow control not stated in source"
  - "full JSON schema not enumerated in source"
  - "full response schemas for ?JSON categories (video/scene/system/weburl/cont)"
  - "no continuous-level variables (volume/gain/brightness) documented in source."
  - "device may push async HDCP/link events but source documents none."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "matrix input/output count (\"matrix max\") not numerically stated."
  - "flow_control not stated in source."
  - "firmware version compatibility range not stated (only runtime query ?SVER)."
  - "protocol version not stated."
  - "full JSON schema for ?JSON responses only partially shown."
  - "device model naming — source refers to \"DXM\" main control card; user-supplied model \"Dxco 1 Hdmi G4\" used in front matter. Relationship between Dxco/DXM lines not clarified in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:02:07.738Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions match literal command tokens in source APPENDIX 3; all transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Aurora Dxco 1 Hdmi G4 Control Spec

## Summary
Aurora Dxco 1 Hdmi G4 is an HDMI matrix switcher (DXM-series main control card) supporting video/audio routing, EDID management, HDCP control, scene recall, and serial/UDP pass-through. Control interface is ASCII-based over RS-232C and TCP/IP (Telnet/socket), using `!` for commands, `?` for queries, and `~` for responses, each terminated with `<CR>` (0x0D).

<!-- UNRESOLVED: exact matrix size (input/output count) not stated in source; variables reference "matrix max" without a concrete number. Source example response `~M0:DXM-884` suggests an 8x8 variant but model line is broader. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1001  # default Socket Server port (TCP); web server default port 80
serial:
  baud_rate: 115200  # default; configurable to 38400, 19200, 9600 via !UART
  data_bits: 8  # default; configurable to 9 via !UART
  parity: none  # default; configurable to Odd, Even via !UART
  stop_bits: 1  # default; configurable to 1.5, 2 via !UART
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no login procedure documented for the Telnet/RS-232 command protocol.
              # NOTE: the embedded WEB server uses User 'user' / password '123456', but that
              # credential applies to the web UI, not to the socket/serial command channel.
```

## Traits
```yaml
traits:
  - routable    # inferred: video/audio input→output routing commands (!C, !CR, !T, !TR)
  - queryable   # inferred: extensive query commands (?CR, ?TR, ?SYNC, ?UART, ?NETWORK, etc.)
  - powerable   # inferred: per-card power control (!CPOWER) present
```

## Actions
```yaml
# All 58 numbered command rows from APPENDIX 3 are enumerated below.
# <CR> = 0x0D. Source uses "matrix max" as the upper bound for port numbers; concrete
# matrix size is UNRESOLVED. 'V' = internal audio, 'E' = external audio in audio commands.

# --- Video routing ---
- id: video_switch_single
  label: Switch Video Input to Output(s)
  kind: action
  command: "!C{input}to{outputs}<CR>"
  params:
    - name: input
      type: integer
      description: Input number (1 ~ matrix max)
    - name: outputs
      type: string
      description: Comma-separated output numbers (1 ~ matrix max) or ALL
  notes: Example !C1to2,3<CR> switches video input 1 to outputs 2 and 3. Response ~C1to2,3<CR>.

- id: video_switch_correspondence
  label: Switch Video Input/Output Correspondence
  kind: action
  command: "!CR{in1}:{out1},{in2}:{out2}<CR>"
  params:
    - name: pairs
      type: string
      description: Comma-separated input:output mapping pairs (1 ~ matrix max)
  notes: Example !CR1:3,2:4<CR>. Response ~CR1:3,2:4<CR>.

- id: video_select_input_cswi
  label: Select Video Input (CSWI stage)
  kind: action
  command: "!CSWI:{input}<CR>"
  params:
    - name: input
      type: integer
      description: Input number (1 ~ matrix max)
  notes: Must be combined with !CSWO. Example !CSWI:2<CR>. Response ~CSWI:2<CR>.

- id: video_select_output_cswo
  label: Switch Selected Video Input to Output(s)
  kind: action
  command: "!CSWO:{outputs}<CR>"
  params:
    - name: outputs
      type: string
      description: Comma-separated output numbers (1 ~ matrix max)
  notes: Uses input selected by prior !CSWI. Example !CSWO:2,3<CR>. Response ~CSWO:2,3<CR>.

- id: video_route_query
  label: Query Video Output Route Status
  kind: query
  command: "?CR<CR>"
  params: []
  notes: Response ~CR1:3,2:4<CR> (correspondence listing).

# --- Audio routing ---
- id: audio_switch_single
  label: Switch Audio Input to Output(s)
  kind: action
  command: "!T{input}{vE}to{outputs}<CR>"
  params:
    - name: input
      type: integer
      description: Input number (1 ~ matrix max)
    - name: vE
      type: string
      description: "V=internal audio, E=external audio"
    - name: outputs
      type: string
      description: Comma-separated output{vE} tokens (1 ~ matrix max or ALL) + V/E
  notes: Example !T1Vto2V,2E<CR>. Response ~T1Vto2V,2E<CR>.

- id: audio_switch_correspondence
  label: Switch Audio Input/Output Correspondence
  kind: action
  command: "!TR{in1}{vE1}:{out1}{vEo1},{in2}{vE2}:{out2}{vEo2}<CR>"
  params:
    - name: pairs
      type: string
      description: Comma-separated input{V/E}:output{V/E} pairs (1 ~ matrix max or ALL)
  notes: V=internal audio, E=external audio. Example !TR1V:2V,1E:2E<CR>. Response ~TR1V:2V,1E:2E<CR>.

- id: audio_select_input_tswi
  label: Select Audio Input (TSWI stage)
  kind: action
  command: "!TSWI:{input}{vE}<CR>"
  params:
    - name: input
      type: integer
      description: Input number (1 ~ matrix max)
    - name: vE
      type: string
      description: "V=internal audio, E=external audio"
  notes: Must be combined with !TSWO. Example !TSWI:2V<CR>. Response ~TSWI:2<CR>.

- id: audio_select_output_tswo
  label: Switch Selected Audio Input to Output(s)
  kind: action
  command: "!TSWO:{outputs}<CR>"
  params:
    - name: outputs
      type: string
      description: Comma-separated output{V/E} tokens (1 ~ matrix max)
  notes: Uses input from prior !TSWI. Example !TSWO:3V,3E<CR>. Response ~TSWO:2,3<CR>.

- id: audio_route_query
  label: Query Audio Output Route Status
  kind: query
  command: "?TR<CR>"
  params: []
  notes: Response ~TR1V:3V,2V:4B<CR>.

# --- Scene management ---
- id: scene_save
  label: Save Scene
  kind: action
  command: "!S{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location (1 ~ 32 max)
  notes: Saves current state. Example !S10<CR>. Response ~CR1:3,2:4,...<CR>.

- id: scene_call
  label: Call Scene
  kind: action
  command: "!R{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location (1 ~ 32 max)
  notes: Example !R10<CR>. Response ~CR1:3,2:4,...<CR>.

- id: scene_set_name
  label: Set Scene Name
  kind: action
  command: "!SNAME{scene}:{name}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene number (1 ~ 32 max)
    - name: name
      type: string
      description: Scene name (15 English characters max)
  notes: Example !SNAME10:Meeting<CR>. Response ~SNAME10:Meeting<CR>.

- id: scene_query_name
  label: Query Scene Name
  kind: query
  command: "?SNAME{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location (1 ~ 32 max)
  notes: Example ?SNAME10<CR>. Response ~SNAME10:Meeting<CR>.

- id: scene_set_web_display
  label: Set Scene Web Display Flag
  kind: action
  command: "!SUSE{scene}:{flag}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene number (1 ~ 32 max)
    - name: flag
      type: integer
      description: "0=no display on WEB, 1=display"
  notes: Example !SUSE10:1<CR>. Response ~SUSE10:1<CR>.

- id: scene_query_web_display
  label: Query Scene Web Display Flag
  kind: query
  command: "?SUSE{scene}<CR>"
  params:
    - name: scene
      type: integer
      description: Scene location (1 ~ 32 max)
  notes: Example ?SUSE10<CR>. Response ~SUSE10:1<CR>.

# --- A/V sync ---
- id: sync_set
  label: Set Audio/Video Synchronization
  kind: action
  command: "!SYNC:{mode}<CR>"
  params:
    - name: mode
      type: integer
      description: "0=no synchronous, 1=synchronous"
  notes: Example !SYNC:1<CR>. Response ~SYNC:1<CR>.

- id: sync_query
  label: Query Audio/Video Synchronization Status
  kind: query
  command: "?SYNC<CR>"
  params: []
  notes: Example ?SYNC<CR>. Response ~SYNC:1<CR>.

- id: sync_mode_set
  label: Set Audio/Video Sync Mode
  kind: action
  command: "!SYNC_MODE:{mode}<CR>"
  params:
    - name: mode
      type: integer
      description: >
        0: VE->VE, 1: VE->EV, 2: V->VE (default), 3: E->VE, 4: V->V,
        5: E->E, 6: V->E, 7: E->V. V=internal audio, E=external audio.
  notes: Example !SYNC_MODE:1<CR>. Response ~SYNC_MODE:1<CR>.

- id: sync_mode_query
  label: Query Audio/Video Sync Mode
  kind: query
  command: "?SYNC_MODE<CR>"
  params: []
  notes: Example ?SYNC_MODE:1<CR>. Response ~SYNC_MODE:1<CR>.

# --- UART pass-through ---
- id: uart_switch
  label: UART Switch (RX to TX routing)
  kind: action
  command: "!CUART{rx}to{tx_list}<CR>"
  params:
    - name: rx
      type: integer
      description: RX port (1 ~ matrix max)
    - name: tx_list
      type: string
      description: Comma-separated TX ports (1 ~ matrix max or ALL)
  notes: Routes RX to one or more TX. Example !CUART1to1,2<CR>. Response ~CUART1to1,2<CR>.

- id: uart_query_all
  label: Query All UART Status
  kind: query
  command: "?CRUART<CR>"
  params: []
  notes: Response !CRUART1:1,2:1,...<CR>.

# --- Network configuration ---
- id: network_set_ip
  label: Set IP Address
  kind: action
  command: "!IP:{a}.{b}.{c}.{d}<CR>"
  params:
    - name: a
      type: integer
      description: Octet (0~255)
    - name: b
      type: integer
      description: Octet (0~255)
    - name: c
      type: integer
      description: Octet (0~255)
    - name: d
      type: integer
      description: Octet (0~255)
  notes: Example !IP:192.168.2.229<CR>. Response ~IP:192.168.2.229<CR>.

- id: network_set_subnet
  label: Set Subnet Mask
  kind: action
  command: "!SUBNET:{a}.{b}.{c}.{d}<CR>"
  params:
    - name: a
      type: integer
      description: Octet (0~255)
    - name: b
      type: integer
      description: Octet (0~255)
    - name: c
      type: integer
      description: Octet (0~255)
    - name: d
      type: integer
      description: Octet (0~255)
  notes: Example !SUBNET:255.255.255.0<CR>. Response ~SUBNET:255.255.255.0<CR>.

- id: network_set_gateway
  label: Set Gateway
  kind: action
  command: "!GATEWAY:{a}.{b}.{c}.{d}<CR>"
  params:
    - name: a
      type: integer
      description: Octet (0~255)
    - name: b
      type: integer
      description: Octet (0~255)
    - name: c
      type: integer
      description: Octet (0~255)
    - name: d
      type: integer
      description: Octet (0~255)
  notes: Example !GATEWAY:192.168.2.1<CR>. Response ~GATEWAY:192.168.2.1<CR>.

- id: network_set_port
  label: Set Socket Server Port
  kind: action
  command: "!PORT:{port}<CR>"
  params:
    - name: port
      type: integer
      description: Server port number
  notes: Example !PORT:1001<CR>. Response ~PORT:1001<CR>.

- id: network_set_dhcp
  label: Set Network DHCP
  kind: action
  command: "!DHCP:{state}<CR>"
  params:
    - name: state
      type: integer
      description: "0=DHCP off, 1=DHCP on"
  notes: Example !DHCP:1<CR>. Response ~DHCP:1<CR>.

- id: network_query
  label: Query Network Information
  kind: query
  command: "?NETWORK<CR>"
  params: []
  notes: Multi-line response: ~IP:..., ~SUBNET:..., ~GATEWAY:..., ~PORT:...<CR>.

# --- Serial port configuration ---
- id: serial_set_config
  label: Set Serial Port Configuration
  kind: action
  command: "!UART:{baud},{data},{stop},{parity}<CR>"
  params:
    - name: baud
      type: integer
      description: "Baud rate: 115200, 38400, 19200, 9600"
    - name: data
      type: integer
      description: "Data bits: 8 or 9"
    - name: stop
      type: number
      description: "Stop bits: 1, 1.5, or 2"
    - name: parity
      type: string
      description: "Parity: None, Odd, or Even"
  notes: Example !UART:9600,8,1,None<CR>. Response ~UART:9600,8,1,None<CR>.

- id: serial_query_config
  label: Query Serial Port Configuration
  kind: query
  command: "?UART<CR>"
  params: []
  notes: Response ~UART:9600,8,1,None<CR>.

# --- Command enable / sound ---
- id: command_enable_set
  label: Set Command Enable
  kind: action
  command: "!CMDEN:{state}<CR>"
  params:
    - name: state
      type: integer
      description: "0=commands not processed, 1=commands processed"
  notes: "When disabled, socket/serial commands are ignored (the !CMDEN command itself is still processed). Example !CMDEN:1<CR>. Response ~CMDEN:1<CR>."

- id: command_enable_query
  label: Query Command Enable Status
  kind: query
  command: "?CMDEN<CR>"
  params: []
  notes: Response ~MDEN:1<CR> (sic - as printed in source).

- id: command_sound_set
  label: Set Command-Send Sound
  kind: action
  command: "!CSOUND:{state}<CR>"
  params:
    - name: state
      type: integer
      description: "0=no sound on command send, 1=sound"
  notes: Example !CSOUND:1<CR>. Response ~CSOUND:1<CR>.

- id: command_sound_query
  label: Query Command-Send Sound Status
  kind: query
  command: "?CSOUND<CR>"
  params: []
  notes: Response ~CSOUND:1<CR>.

# --- EDID management ---
- id: edid_switch_output_to_input
  label: Switch Output EDID to Input Port
  kind: action
  command: "!EDID{output}to{input}<CR>"
  params:
    - name: output
      type: integer
      description: Output number (1 ~ matrix max)
    - name: input
      type: integer
      description: Input number (1 ~ matrix max or ALL)
  notes: Example !EDID1to2<CR>. Response ~EDID1to2<CR>.

- id: edid_switch_system_to_input
  label: Switch System EDID to Input Port
  kind: action
  command: "!SYSE{system}to{input}<CR>"
  params:
    - name: system
      type: integer
      description: System EDID slot (1 ~ 16)
    - name: input
      type: integer
      description: Input number (1 ~ matrix max or ALL)
  notes: Example !SYSE1to2<CR>. Response ~SYSE1to2<CR>.

- id: edid_save_output_to_system
  label: Save Output EDID to System Slot
  kind: action
  command: "!SEDID{output}to{system}<CR>"
  params:
    - name: output
      type: integer
      description: Output number (1 ~ matrix max)
    - name: system
      type: integer
      description: System EDID slot (1 ~ 16)
  notes: Example !SEDID1to2<CR>. Response ~SEDID1to2<CR>.

# --- Output format / HDCP / card power ---
- id: output_set_hdmi_dvi
  label: Set Output HDMI/DVI Format
  kind: action
  command: "!HDMODE:{output},{mode}<CR>"
  params:
    - name: output
      type: integer
      description: Output number (1 ~ matrix max)
    - name: mode
      type: integer
      description: "0=DVI, 1=HDMI"
  notes: Example !HDMODE:2,1<CR>. Response ~HDMODE:2,1<CR>.

- id: port_set_hdcp
  label: Set Port HDCP (IN/OUT card)
  kind: action
  command: "!HDCP:{port},{state}<CR>"
  params:
    - name: port
      type: integer
      description: Port number (1 ~ matrix max)
    - name: state
      type: integer
      description: "0=OFF, 1=ON"
  notes: Example !HDCP:2,0<CR>. Response ~HDCP:2,0<CR>.

- id: card_set_power
  label: Set Card Power
  kind: action
  command: "!CPOWER:{port},{state}<CR>"
  params:
    - name: port
      type: integer
      description: Port number (1 ~ matrix max)
    - name: state
      type: integer
      description: "0=OFF, 1=ON"
  notes: Example !CPOWER:2,0<CR>. Response ~CPOWER:2,0<CR>.

- id: card_query_power
  label: Query Card Power Status
  kind: query
  command: "?CPOWER:{port}<CR>"
  params:
    - name: port
      type: integer
      description: Port number (1 ~ matrix max)
  notes: Example ?CPOWER:2<CR>. Response ~CPOWER:2,0<CR>.

# --- User management ---
- id: user_set_credentials
  label: Set Web Username and Password
  kind: action
  command: "!MUNP:{username},{password}<CR>"
  params:
    - name: username
      type: string
      description: Username (15 English chars or Arabic numerals max)
    - name: password
      type: string
      description: Password (15 English chars or Arabic numerals max)
  notes: Sets WEB interface login. Example !MUNP:Main,123456<CR>. Response ~MUNP:Main,123456<CR>.

- id: user_query_credentials
  label: Query Web Username and Password
  kind: query
  command: "?MUNP<CR>"
  params: []
  notes: Example ?MUNP<CR>. Response ~MUNP:Main,123456<CR>.

# --- Control board passthrough ---
- id: controlboard_send
  label: Send Command to Control Board
  kind: action
  command: "!COM{command}<CR>"
  params:
    - name: command
      type: string
      description: Control card command string
  notes: "Returns NULL when control board is offline, otherwise returns the ERROR. Example !COM-TEST<CR>."

- id: controlboard_query_online
  label: Query Central Control Board Online Status
  kind: query
  command: "?COM<CR>"
  params: []
  notes: Response ~COM:1<CR> when online.

# --- Socket server passthrough ---
- id: socket_send_data
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

# --- JSON status query ---
- id: json_status_query
  label: Query Status Information (JSON)
  kind: query
  command: "?JSON:{category},{mark}<CR>"
  params:
    - name: category
      type: string
      description: "One of: video, scene, system, weburl, cont"
    - name: mark
      type: integer
      description: Status update version mark; 0 = request all data
  notes: Returns JSON-formatted status. Example ?JSON:video,0<CR>.

# --- Language / system ---
- id: language_set
  label: Set System Language
  kind: action
  command: "!LANG:{lang}<CR>"
  params:
    - name: lang
      type: integer
      description: "0=English, 1=Chinese"
  notes: Example !LANG:1<CR>. Response ~LANG:1<CR>.

- id: language_query
  label: Query System Language
  kind: query
  command: "?LANG<CR>"
  params: []
  notes: Response ~LANG:1<CR>.

- id: system_restart
  label: Restart System
  kind: action
  command: "!SOF-RESTART<CR>"
  params: []
  notes: Soft restart. Response ~SOF-RESTART<CR>.

- id: system_factory_reset
  label: Restore Factory Settings
  kind: action
  command: "!SYS-RESET<CR>"
  params: []
  notes: Restores factory settings. Response ~SYS-RESET<CR>.

# --- Version / hardware queries ---
- id: query_daughter_card_types
  label: Query All Daughter Card Types
  kind: query
  command: "?RCID<CR>"
  params: []
  notes: Response ~RCID:1:I1,2:N/A,...<CR>.

- id: query_main_software_version
  label: Query Main Software Version
  kind: query
  command: "?SVER<CR>"
  params: []
  notes: Response ~SVER:1.0.0<CR>.

- id: query_hardware_version
  label: Query Hardware Version
  kind: query
  command: "?HVER<CR>"
  params: []
  notes: Response ~HVER:1.0.0<CR>.

- id: query_backboard_firmware_version
  label: Query Back Board Firmware Version
  kind: query
  command: "?BVER<CR>"
  params: []
  notes: Response ~BVER:1.0.0<CR>.

- id: query_matrix_type
  label: Query Matrix Type
  kind: query
  command: "?M0<CR>"
  params: []
  notes: Response ~DXM-884<CR> (example).

# --- HDBT card passthrough ---
- id: hdbt_send_command
  label: Send Command to HDBT Card
  kind: action
  command: "!SEND-CU:{baud}:{x}{port}:{data}<CR>"
  params:
    - name: baud
      type: integer
      description: "Baud rate: 115200, 38400, 19200, 9600"
    - name: x
      type: string
      description: "Card direction: I (input) or O (output)"
    - name: port
      type: integer
      description: Card port number
    - name: data
      type: string
      description: Data to send. Prefix with "%H " to send hex bytes (e.g. %H 01 02 03 04 05 0D 0A).
  notes: Fire-and-forget send. Example !SEND-CU:115200:O1:TEST<CR>.

- id: hdbt_send_recv_command
  label: Send/Receive Command to HDBT Card
  kind: action
  command: "!SEND-CU-RECV:{baud}:{x}{port}:{data}<CR>"
  params:
    - name: baud
      type: integer
      description: "Baud rate: 115200, 38400, 19200, 9600"
    - name: x
      type: string
      description: "Card direction: I (input) or O (output)"
    - name: port
      type: integer
      description: Card port number
    - name: data
      type: string
      description: Data to send. Prefix with "%H " for hex bytes.
  notes: "Returns ~RECV-CU:{port}:<data><CR> on success, or <RECV-CU:{port}:Timeout<CR> on no response. Example !SEND-CU-RECV:115200:O1:TEST<CR>."
```

## Feedbacks
```yaml
# Each query action above carries a documented ~ response string. Representative
# feedback shapes are listed here; see corresponding Actions for full payloads.
- id: video_route_response
  type: string
  values: ["~C{in}to{outs}<CR>", "~CR{in}:{out},...<CR>"]
- id: audio_route_response
  type: string
  values: ["~T{in}{vE}to{outs}<CR>", "~TR{in}{vE}:{out}{vEo},...<CR>"]
- id: uart_status_response
  type: string
  values: ["!CRUART{rx}:{tx},...<CR>"]
- id: network_info_response
  type: string
  values: ["~IP:...<CR>", "~SUBNET:...<CR>", "~GATEWAY:...<CR>", "~PORT:...<CR>"]
- id: serial_config_response
  type: string
  values: ["~UART:{baud},{data},{stop},{parity}<CR>"]
- id: controlboard_online_response
  type: enum
  values: ["~COM:1<CR>"]
- id: json_status_response
  type: json
  values: []  # UNRESOLVED: full JSON schema not enumerated in source
- id: version_responses
  type: string
  values: ["~SVER:{ver}<CR>", "~HVER:{ver}<CR>", "~BVER:{ver}<CR>", "~RCID:...<CR>", "~M0:{type}<CR>"]
# UNRESOLVED: full response schemas for ?JSON categories (video/scene/system/weburl/cont)
# not enumerated in source beyond a partial system JSON example.
```

## Variables
```yaml
# Settable runtime parameters exposed by Actions above. No additional standalone
# settable variables are documented outside the command set.
# UNRESOLVED: no continuous-level variables (volume/gain/brightness) documented in source.
```

## Events
```yaml
# No unsolicited notification commands documented. All responses are replies to
# explicit ! or ? commands.
# UNRESOLVED: device may push async HDCP/link events but source documents none.
```

## Macros
```yaml
# Scene recall (!R{scene}) acts as a stored macro executed on the device.
# No multi-step host-side macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. The following commands are destructive and
# should be treated as confirmation-required by integrators (not inferred here):
#   - !SOF-RESTART (system restart)
#   - !SYS-RESET (factory reset)
#   - !CPOWER:{port},0 (card power off)
#   - !CMDEN:0 (disables command processing)
#   - !MUNP:{user},{pass} (changes web credentials)
# Per population policy, these are NOT populated without explicit source evidence.
```

## Notes
- Command syntax uses three prefix characters: `!` (command), `?` (query), `~` (response). All lines terminate with `<CR>` (0x0D / decimal 13).
- Default communication: `115200 8N1 None` over RS-232; TCP socket server default `192.168.88.229:1001`. Web UI default `192.168.88.229:80` with credentials `user` / `123456` (factory).
- RS-232 connector is 3.5mm TRS: Tip=TX, Ring=RX, Sleeve=GND.
- Audio commands suffix ports with `V` (internal audio) or `E` (external audio). Source examples show mixed routing (e.g. `!T1Vto2V,2E`).
- HDBT card passthrough supports hex payloads via `%H ` prefix (e.g. `!SEND-CU-RECV:115200:1:%H 01 02 03 04 05 0D 0A<CR>`).
- Source notes that command send speed can affect operation; Hercules utility recommended over HyperTerminal for one-shot command transmission.
- Bidirectional RS-232 pass-through (Serial Management / `!CUART`) only works point-to-point.
- Response string `~MDEN:1<CR>` (command 32) and `~SEND-SS:4<CR>` (command 46) appear truncated or typo'd in source — captured verbatim.

<!-- UNRESOLVED: matrix input/output count ("matrix max") not numerically stated. -->
<!-- UNRESOLVED: flow_control not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility range not stated (only runtime query ?SVER). -->
<!-- UNRESOLVED: protocol version not stated. -->
<!-- UNRESOLVED: full JSON schema for ?JSON responses only partially shown. -->
<!-- UNRESOLVED: device model naming — source refers to "DXM" main control card; user-supplied model "Dxco 1 Hdmi G4" used in front matter. Relationship between Dxco/DXM lines not clarified in source. -->

## Provenance

```yaml
source_domains:
  - files.hdtvsupply.com
  - manualslib.com
source_urls:
  - https://files.hdtvsupply.com/brand/aurora/aurora-multimedia-dxm-88-16164-g4-um.pdf
  - https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html
  - "https://www.manualslib.com/manual/1628153/Aurora-Dxm-G4-Series.html?page=45"
retrieved_at: 2026-07-01T05:30:44.807Z
last_checked_at: 2026-07-07T11:02:07.738Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:02:07.738Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions match literal command tokens in source APPENDIX 3; all transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact matrix size (input/output count) not stated in source; variables reference \"matrix max\" without a concrete number. Source example response `~M0:DXM-884` suggests an 8x8 variant but model line is broader."
- "flow control not stated in source"
- "full JSON schema not enumerated in source"
- "full response schemas for ?JSON categories (video/scene/system/weburl/cont)"
- "no continuous-level variables (volume/gain/brightness) documented in source."
- "device may push async HDCP/link events but source documents none."
- "source contains no explicit safety warnings, interlock procedures,"
- "matrix input/output count (\"matrix max\") not numerically stated."
- "flow_control not stated in source."
- "firmware version compatibility range not stated (only runtime query ?SVER)."
- "protocol version not stated."
- "full JSON schema for ?JSON responses only partially shown."
- "device model naming — source refers to \"DXM\" main control card; user-supplied model \"Dxco 1 Hdmi G4\" used in front matter. Relationship between Dxco/DXM lines not clarified in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
