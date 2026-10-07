---
spec_id: admin/polycom-vs4000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Polycom VS4000 Control Spec"
manufacturer: Polycom
model_family: VS4000
aliases: []
compatible_with:
  manufacturers:
    - Polycom
  models:
    - VS4000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - polycom-ua.com
source_urls:
  - https://www.polycom-ua.com/assets/files/Video/ViewStation/vs_ex_api_guide.pdf
retrieved_at: 2026-09-02T20:28:48.880Z
last_checked_at: 2026-10-07T21:08:37.840Z
generated_at: 2026-10-07T21:08:37.840Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "source document covers ViewStation EX / ViewStation FX / VS4000 jointly; some commands are EX/FX-specific or require optional network interface modules (Quad BRI, PRI, V.35/RS-449/RS-530/RS-366)"
  - "none - settable state is fully covered by command get/set pairs above"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "no error/fault response catalog documented beyond echo/ping failure examples and call cause codes"
  - "CGI POST usage referenced in introduction but no HTTP endpoint syntax documented in this source"
verification:
  verdict: verified
  checked_at: 2026-10-07T21:08:37.840Z
  matched_actions: 264
  action_count: 264
  confidence: medium
  summary: "All 264 action units match source commands with correct shapes, the telnet/serial transport values are stated in the source, and the spec covers the whole command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Polycom VS4000 Control Spec

## Summary
The Polycom VS4000 is a videoconferencing codec system controllable via a CGI/shell-based API ("Remote Control API") over a Telnet session (TCP port 24) or the RS-232 serial port (DB-9, Control mode). This spec covers call control (dial/answer/hangup), near/far camera PTZ and presets, audio (volume, mute, echo canceller), monitors/VGA, address books, network/LAN/H.323/ISDN (BRI/PRI)/V.35 configuration, streaming, diagnostics, and system administration as documented in the vendor "ViewStation EX, ViewStation FX, and VS4000 API Guide" (shared API; VS4000-specific commands noted).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: source document covers ViewStation EX / ViewStation FX / VS4000 jointly; some commands are EX/FX-specific or require optional network interface modules (Quad BRI, PRI, V.35/RS-449/RS-530/RS-366) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 24  # telnet <system IP address> 24; port 24 avoids debug output
serial:
  baud_rate: 9600  # default per source; supported: 1200, 2400, 9600, 14400, 19200, 38400, 57600, 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # default; hardware flow control supported
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no login procedure in source; session opens with welcome banner (e.g. "Hi, My name is: John_System"))
```

## Traits
```yaml
# - powerable inferred from sleep/wake commands
# - queryable inferred from extensive <get> subcommands and status queries
# - routable inferred from camera/video source selection commands (camera near/far n, camerainput, primarycamera)
# - levelable inferred from volume set {0..24} and soundeffectsvolume set {0..10}
traits:
  - powerable
  - queryable
  - routable
  - levelable
```

## Actions
```yaml
# All commands case-sensitive (source note). One entry per command documented in the source.

# === Shell / session ===
- id: history_execute
  label: Execute From History (!)
  kind: action
  command: "!{specifier}"
  params: [{name: specifier, type: string, description: "Last command beginning with str, or Nth entry {1..64}; no space after ! (e.g. !gat, !5)"}]
- id: help
  label: Help
  kind: query
  command: "help {mode}"
  params: [{name: mode, type: enum, values: [all, help, verbose, terse, syntax]}]
- id: history
  label: History
  kind: query
  command: "history"
  params: []
- id: repeat
  label: Repeat History Command
  kind: action
  command: "repeat {n}"
  params: [{name: n, type: integer, description: "History entry number 1..64"}]
- id: exit
  label: End API Session
  kind: action
  command: "exit"
  params: []
- id: run_script
  label: Run Script File
  kind: action
  command: "run \"{scriptfilename}\""
  params: [{name: scriptfilename, type: string, description: "Flash file with one API command per line terminated by <CR><LF>"}]
- id: pause
  label: Pause Interpreter
  kind: action
  command: "pause {seconds}"
  params: [{name: seconds, type: integer, description: "0..65535 seconds"}]
- id: stdout
  label: Redirect Standard Output
  kind: action
  command: "stdout {state}"
  params: [{name: state, type: enum, values: [on, off]}]
- id: textinput
  label: Input Text To Edit Box
  kind: action
  command: "textinput \"{text}\""
  params: [{name: text, type: string, description: "Alphanumeric string inserted into selected UI edit box"}]
- id: showpopup
  label: Show Popup Message
  kind: action
  command: "showpopup \"{text}\""
  params: [{name: text, type: string, description: "Alphanumeric text, must be quoted"}]
- id: get_screen
  label: Get Current Screen Name
  kind: query
  command: "get screen"
  params: []
- id: button
  label: Send Remote Control Button
  kind: action
  command: "button {keys}"
  params: [{name: keys, type: string, description: "One or more of: # * 1 2 3 4 5 6 7 8 9 0 auto callhangup camera delete directory down far home info keyboard left lowbattery menu mute near period pickedup pip preset putdown right select slides snapshot up volume+ volume- zoom+ zoom- ; multiple keys may be combined in one command in any order"}]

# === Call control ===
- id: dial_addressbook
  label: Dial Address Book Entry
  kind: action
  command: "dial addressbook \"{name}\""
  params: [{name: name, type: string, description: "Address Book entry name, max 25 characters"}]
- id: dial_auto
  label: Dial Auto (auto-detect IP/ISDN)
  kind: action
  command: "dial auto {speed} \"{dialstr}\""
  params:
    - {name: speed, type: string, description: "Valid network data rate"}
    - {name: dialstr, type: string, description: "Switched or IP directory number"}
- id: dial_manual
  label: Dial Manual Video Call
  kind: action
  command: "dial manual {speed} \"{dialstr1}\" [\"{dialstr2}\"] [{calltype}]"
  params:
    - {name: speed, type: string, description: "Valid network data rate"}
    - {name: dialstr1, type: string, description: "Switched or IP directory number"}
    - {name: dialstr2, type: string, description: "Optional second directory number"}
    - {name: calltype, type: enum, values: [h323, h320, ip, isdn], description: "ip and isdn deprecated"}
- id: dial_phone
  label: Dial POTS Call
  kind: action
  command: "dial phone \"{dialstring}\""
  params: [{name: dialstring, type: string, description: "Valid POTS directory number"}]
- id: answer
  label: Answer Incoming Call
  kind: action
  command: "answer {type}"
  params: [{name: type, type: enum, values: [phone, video]}]
- id: hangup_phone
  label: Hang Up Phone Call
  kind: action
  command: "hangup phone"
  params: []
- id: hangup_video
  label: Hang Up Video Call
  kind: action
  command: "hangup video {call}"
  params: [{name: call, type: integer, description: "Optional call selector 1..3; omit to hang up current call"}]
- id: gendial
  label: Generate DTMF Tone
  kind: action
  command: "gendial {digit}"
  params: [{name: digit, type: enum, values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "*"]}]
- id: callstate
  label: Call State Register/Unregister
  kind: action
  command: "callstate {op}"
  params: [{name: op, type: enum, values: [register, unregister, get]}]
- id: listen
  label: Listen For Events
  kind: action
  command: "listen {target}"
  params: [{name: target, type: enum, values: [phone, video, sleep]}]
- id: waitfor
  label: Wait For Event
  kind: action
  command: "waitfor {event}"
  params: [{name: event, type: enum, values: [callcomplete, systemready, receivingcall]}]
- id: advnetstats
  label: Advanced Network Statistics
  kind: query
  command: "advnetstats {call}"
  params: [{name: call, type: integer, description: "Optional call selector 0..2 in multipoint call"}]
- id: netstats
  label: Network Statistics
  kind: query
  command: "netstats {call}"
  params: [{name: call, type: integer, description: "Optional call selector 0..2 in multipoint call"}]
- id: mcupassword
  label: Send MCU Password
  kind: action
  command: "mcupassword \"{password}\""
  params: [{name: password, type: string, description: "Alphanumeric (0-9 a-z A-Z - _ @ / ; , . \\); omit to erase"}]
- id: chaircontrol
  label: Chair Control
  kind: action
  command: "chaircontrol {subcommand}"
  params: [{name: subcommand, type: enum, values: [rel_chair, req_chair, req_floor, req_term_name, req_vas, view, view_broadcaster, list, set_password, set_broadcaster, set_term_name, hangup_term, end_conf, register, unregister], description: "MCU chair control ops; req_term_name/view/set_broadcaster/hangup_term take term_no; set_term_name takes term_no + name; set_password takes meeting|unique + string"}]
- id: mpautoanswer
  label: Auto Answer Multipoint
  kind: action
  command: "mpautoanswer {mode}"
  params: [{name: mode, type: enum, values: [yes, no, donotdisturb, get]}]
- id: mpmode
  label: Multipoint Conference Mode
  kind: action
  command: "mpmode {mode}"
  params: [{name: mode, type: enum, values: [auto, discussion, presentation, fullscreen, get]}]
- id: maxtimeincall
  label: Maximum Time In Call
  kind: action
  command: "maxtimeincall set {minutes}"
  params: [{name: minutes, type: integer, description: "0..99999 minutes; omit value to erase (unlimited); maxtimeincall get queries"}]
- id: dialchannels
  label: ISDN Channel Dialing Order
  kind: action
  command: "dialchannels {mode}"
  params: [{name: mode, type: enum, values: [parallel, oneatatime, get]}]

# === Camera / video ===
- id: camera_near_select
  label: Select Near Camera Source
  kind: action
  command: "camera near {source}"
  params: [{name: source, type: integer, description: "Near camera 1..4"}]
- id: camera_far_select
  label: Select Far Camera Source
  kind: action
  command: "camera far {source}"
  params: [{name: source, type: integer, description: "Far camera 1..5"}]
- id: camera_source_query
  label: Query Selected Camera Source
  kind: query
  command: "camera {endpoint} source"
  params: [{name: endpoint, type: enum, values: [near, far]}]
- id: camera_move
  label: Move Camera
  kind: action
  command: "camera {endpoint} move {direction}"
  params:
    - {name: endpoint, type: enum, values: [near, far]}
    - {name: direction, type: enum, values: [zoom+, zoom-, left, right, up, down, stop, continuous, discrete]}
- id: camera_stop
  label: Stop Camera Movement
  kind: action
  command: "camera {endpoint} stop"
  params: [{name: endpoint, type: enum, values: [near, far]}]
- id: camera_setposition
  label: Set Near Camera Position
  kind: action
  command: "camera near setposition {x} {y} {z}"
  params:
    - {name: x, type: integer, description: "Pan, -880..880"}
    - {name: y, type: integer, description: "Tilt, -300..300"}
    - {name: z, type: integer, description: "Zoom, 0..1023"}
- id: camera_getposition
  label: Get Near Camera Position
  kind: query
  command: "camera near getposition"
  params: []
- id: camera_tracking
  label: Camera Tracking Mode
  kind: action
  command: "camera {endpoint} tracking {mode}"
  params:
    - {name: endpoint, type: enum, values: [near, far]}
    - {name: mode, type: enum, values: [on, off, to_presets, get]}
- id: camera_register
  label: Camera Change Feedback Register
  kind: action
  command: "camera {op}"
  params: [{name: op, type: enum, values: [register, unregister], description: "Register/unregister feedback when user changes camera source"}]
- id: preset_near
  label: Near Camera Preset Set/Go
  kind: action
  command: "preset near {op} {number}"
  params:
    - {name: op, type: enum, values: [set, go]}
    - {name: number, type: integer, description: "Preset 0..9"}
- id: preset_far
  label: Far Camera Preset Set/Go
  kind: action
  command: "preset far {op} {number}"
  params:
    - {name: op, type: enum, values: [set, go]}
    - {name: number, type: integer, description: "Preset 0..9"}
- id: preset_register
  label: Preset Feedback Register
  kind: action
  command: "preset register"
  params: []
- id: preset_unregister
  label: Preset Feedback Unregister
  kind: action
  command: "preset unregister"
  params: []
- id: camera1ptz
  label: Camera 1 PTZ Mode (VS4000)
  kind: action
  command: "camera1ptz {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: camera4ptz
  label: Camera 4 PTZ Mode (VS4000)
  kind: action
  command: "camera4ptz {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: cameradirection
  label: Camera Direction
  kind: action
  command: "cameradirection {mode}"
  params: [{name: mode, type: enum, values: [normal, reversed, get]}]
- id: camerainput
  label: Camera Video Input (VS4000)
  kind: action
  command: "camerainput {camera} {mode}"
  params:
    - {name: camera, type: enum, values: ["1", "2", "3", "4"]}
    - {name: mode, type: enum, values: [off, s-video, composite, get], description: "Camera 3 supports off|composite only"}
- id: primarycamera
  label: Primary Camera
  kind: action
  command: "primarycamera {camera}"
  params: [{name: camera, type: enum, values: ["1", "2", "3", "4", get]}]
- id: hires
  label: High Resolution Camera Mode
  kind: action
  command: "hires {camera} {state}"
  params:
    - {name: camera, type: enum, values: ["2", "3"]}
    - {name: state, type: enum, values: [yes, no, get]}
- id: backlightcompensation
  label: Backlight Compensation
  kind: action
  command: "backlightcompensation {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: farcontrolnearcamera
  label: Far Control Of Near Camera
  kind: action
  command: "farcontrolnearcamera {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: snapshot
  label: Send Snapshot
  kind: action
  command: "snapshot {source}"
  params: [{name: source, type: enum, values: ["0", "1", "2", "3", "4", register, unregister], description: "0=far camera, 1..4=near cameras; register/unregister snapshot notifications"}]
- id: snapshotcamera
  label: Default Snapshot Camera
  kind: action
  command: "snapshotcamera {camera}"
  params: [{name: camera, type: enum, values: ["1", "2", "3", "4", get]}]
- id: snapshottimeout
  label: Snapshot Timeout
  kind: action
  command: "snapshottimeout {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: enablesnapshots
  label: Enable Snapshots
  kind: action
  command: "enablesnapshots {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: pip
  label: PIP Mode
  kind: action
  command: "pip {mode}"
  params: [{name: mode, type: enum, values: [on, off, auto, get]}]
- id: numberofmonitors
  label: Number Of Monitors
  kind: action
  command: "numberofmonitors {count}"
  params: [{name: count, type: enum, values: ["1", "2", "3", "4", get], description: "Max 4 for ViewStation FX / VS4000"}]
- id: displaygraphics
  label: Display Graphics In Call
  kind: action
  command: "displaygraphics {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: widescreenvideo
  label: Wide Screen Video
  kind: action
  command: "widescreenvideo {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: graphicsmonitor
  label: Graphics Monitor Select
  kind: action
  command: "graphicsmonitor {target}"
  params: [{name: target, type: enum, values: [tv, fxvga, visualconcert, get]}]
- id: graphicsmonitorfxvga
  label: FX VGA Graphics Monitor
  kind: action
  command: "graphicsmonitorfxvga {state}"
  params: [{name: state, type: enum, values: [on, off, get]}]
- id: graphicsmonitortv
  label: TV Graphics Monitor
  kind: action
  command: "graphicsmonitortv {state}"
  params: [{name: state, type: enum, values: [on, off, get]}]
- id: graphicsmonitorvisualconcert
  label: Visual Concert Graphics Monitor
  kind: action
  command: "graphicsmonitorvisualconcert {state}"
  params: [{name: state, type: enum, values: [on, off, get]}]
- id: vgahorizpos
  label: VGA Horizontal Position
  kind: action
  command: "vgahorizpos {position}"
  params: [{name: position, type: enum, values: [left, right, get]}]
- id: vgaoffmode
  label: VGA Off Mode
  kind: action
  command: "vgaoffmode {mode}"
  params: [{name: mode, type: enum, values: [black, nosignal, get]}]
- id: vgaphase
  label: VGA Phase Calibrate
  kind: action
  command: "vgaphase {direction}"
  params: [{name: direction, type: enum, values: [increase, decrease, get]}]
- id: vgaresolution
  label: VGA Output Resolution
  kind: action
  command: "vgaresolution {resolution}"
  params: [{name: resolution, type: enum, values: [800x600, 1024x768, 1280x1024, get]}]
- id: vgavertpos
  label: VGA Vertical Position
  kind: action
  command: "vgavertpos {direction}"
  params: [{name: direction, type: enum, values: [up, down, get]}]
- id: vcbutton
  label: Visual Concert FX Play/Stop
  kind: action
  command: "vcbutton {op}"
  params: [{name: op, type: enum, values: [play, stop, get, register, unregister]}]
- id: slides
  label: Slide Presentation Control
  kind: action
  command: "slides {op}"
  params: [{name: op, type: enum, values: [thumbnails, next, previous, first, last, resend, list, select, password, start, register, unregister], description: "select takes \"pres\" name; password takes string"}]
- id: screen
  label: Go To Screen
  kind: action
  command: "screen {screen}"
  params: [{name: screen, type: enum, values: [addressbook, farvideo, main, nearvideo, sysinfo, speeddial, disableui, enableui, chaircontrol, sleep, wake]}]
- id: vcrrecordsource
  label: VCR Record Source
  kind: action
  command: "vcrrecordsource {source}"
  params: [{name: source, type: enum, values: [auto, near, far, get]}]
- id: vcraudioout
  label: VCR Audio Out Always On
  kind: action
  command: "vcraudioout {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]

# === Audio ===
- id: volume
  label: Volume Control
  kind: action
  command: "volume {op}"
  params:
    - {name: op, type: enum, values: [set, up, down, get, register, unregister]}
    - {name: level, type: integer, description: "0..24, required when op=set"}
- id: soundeffectsvolume
  label: Sound Effects Volume
  kind: action
  command: "soundeffectsvolume {op}"
  params:
    - {name: op, type: enum, values: [set, get, test]}
    - {name: level, type: integer, description: "0..10, required when op=set"}
- id: mute_near
  label: Mute Near Site
  kind: action
  command: "mute near {mode}"
  params: [{name: mode, type: enum, values: [on, off, toggle, get]}]
- id: mute_far
  label: Mute Far Site Query
  kind: query
  command: "mute far get"
  params: []
- id: mute_register
  label: Mute Change Feedback Register
  kind: action
  command: "mute register"
  params: []
- id: mute_unregister
  label: Mute Change Feedback Unregister
  kind: action
  command: "mute unregister"
  params: []
- id: muteautoanswercalls
  label: Mute Auto Answer Calls
  kind: action
  command: "muteautoanswercalls {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: echocanceller
  label: Echo Canceller
  kind: action
  command: "echocanceller {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: audioquality
  label: Audio Quality Threshold
  kind: action
  command: "audioquality set {speed}"
  params: [{name: speed, type: enum, values: [64, 112, 128, 168, 192, 224, 256, 280, 320, 336, 384, 392, 448, 512], description: "Call speed threshold G.728/G.722; audioquality get queries"}]
- id: audioqualityg7221
  label: Audio Quality G.722.1 Threshold
  kind: action
  command: "audioqualityg7221 set {speed}"
  params: [{name: speed, type: enum, values: [64, 112, 128, 168, 192, 224, 256, 280, 320, 336, 384, 392, 448, 512], description: "Threshold G.722.1/G.722; audioqualityg7221 get queries"}]
- id: generatetone
  label: Generate Test Tone
  kind: action
  command: "generatetone {state}"
  params: [{name: state, type: enum, values: [on, off]}]
- id: keypadaudioconf
  label: Keypad Audio Confirmation
  kind: action
  command: "keypadaudioconf {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]

# === Power / sleep ===
- id: sleep
  label: Sleep Mode
  kind: action
  command: "sleep"
  params: []
- id: wake
  label: Wake From Sleep
  kind: action
  command: "wake"
  params: []

# === Address book ===
- id: abk
  label: Local Address Book Display
  kind: query
  command: "abk {mode}"
  params: [{name: mode, type: enum, values: [batch, all, letter, range], description: "batch takes {0..59} (10 records per batch); letter takes {a..z}; range takes a b"}]
- id: gabk_batch
  label: Global Address Book Batch
  kind: query
  command: "gabk batch {n}"
  params: [{name: n, type: integer, description: "Batch 0..59; batch size set by GAB server"}]
- id: allowabkchanges
  label: Allow Address Book Changes
  kind: action
  command: "allowabkchanges {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: displayglobaladdresses
  label: Display Global Addresses
  kind: action
  command: "displayglobaladdresses {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: registerthissystem
  label: Register System In Global Address Book
  kind: action
  command: "registerthissystem {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: showaddrsingab
  label: Show Addresses In GAB
  kind: action
  command: "showaddrsingab {mode}"
  params: [{name: mode, type: enum, values: [h320, h323, both, get]}]

# === LAN / IP configuration ===
- id: ipaddress
  label: LAN IP Address
  kind: action
  command: "ipaddress set {address}"
  params: [{name: address, type: string, description: "xxx.xxx.xxx.xxx; only when DHCP off; restart prompted; ipaddress get queries"}]
- id: subnetmask
  label: Subnet Mask
  kind: action
  command: "subnetmask set {mask}"
  params: [{name: mask, type: string, description: "xxx.xxx.xxx.xxx; restart prompted; subnetmask get queries"}]
- id: defaultgateway
  label: Default Gateway
  kind: action
  command: "defaultgateway set {address}"
  params: [{name: address, type: string, description: "xxx.xxx.xxx.xxx; only when DHCP off; restart prompted; defaultgateway get queries"}]
- id: dhcp
  label: DHCP Mode
  kind: action
  command: "dhcp {mode}"
  params: [{name: mode, type: enum, values: [off, client, server, get], description: "server option only if enabled during Softupdate; restart prompted"}]
- id: dns
  label: DNS Server
  kind: action
  command: "dns set {server} {address}"
  params:
    - {name: server, type: integer, description: "1..4"}
    - {name: address, type: string, description: "xxx.xxx.xxx.xxx; omit to erase; only when DHCP off; dns get {server} queries"}
- id: hostname
  label: LAN Host Name
  kind: action
  command: "hostname set {name}"
  params: [{name: name, type: string, description: "Max 63 chars, starts/ends letter or digit; restart prompted; hostname get queries"}]
- id: lanport
  label: LAN Port Settings
  kind: action
  command: "lanport {mode}"
  params: [{name: mode, type: enum, values: [auto, "10", 10hdx, 10fdx, "100", 100hdx, 100fdx, get]}]
- id: pcport
  label: PC Port Settings
  kind: action
  command: "pcport {mode}"
  params: [{name: mode, type: enum, values: [auto, "10", 10hdx, 10fdx, "100", 100hdx, 100fdx, get]}]
- id: winsresolution
  label: WINS Resolution
  kind: action
  command: "winsresolution {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: winsserver
  label: WINS Server
  kind: action
  command: "winsserver set {address}"
  params: [{name: address, type: string, description: "xxx.xxx.xxx.xxx; restart prompted; winsserver get queries"}]
- id: ipstat
  label: IP Configuration Status
  kind: query
  command: "ipstat"
  params: []
- id: ping
  label: Ping Device
  kind: action
  command: "ping {ip_addr} {count}"
  params:
    - {name: ip_addr, type: string, description: "Device IP address"}
    - {name: count, type: integer, description: "Optional ping count"}
- id: tcpports
  label: QoS TCP Ports
  kind: action
  command: "tcpports set {port}"
  params: [{name: port, type: integer, description: "1024..49150; omit to erase; tcpports get queries"}]
- id: udpports
  label: QoS UDP Ports
  kind: action
  command: "udpports set {port}"
  params: [{name: port, type: integer, description: "1024..49150; omit to erase; udpports get queries"}]
- id: usefixedports
  label: Use Fixed Ports
  kind: action
  command: "usefixedports {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: autodiscovernat
  label: Auto Discover NAT
  kind: action
  command: "autodiscovernat {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: systembehindnat
  label: System Behind NAT
  kind: action
  command: "systembehindnat {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: wanipaddress
  label: WAN (NAT Outside) IP Address
  kind: action
  command: "wanipaddress set {address}"
  params: [{name: address, type: string, description: "xxx.xxx.xxx.xxx; wanipaddress get queries"}]
- id: usegatekeeper
  label: Gatekeeper Mode
  kind: action
  command: "usegatekeeper {mode}"
  params: [{name: mode, type: enum, values: [off, specify, auto, get], description: "Restart prompted"}]
- id: gatekeeperip
  label: Gatekeeper IP Address
  kind: action
  command: "gatekeeperip set {address}"
  params: [{name: address, type: string, description: "xxx.xxx.xxx.xxx; restart prompted; gatekeeperip get queries"}]
- id: h323name
  label: H.323 Name
  kind: action
  command: "h323name set {name}"
  params: [{name: name, type: string, description: "Character string; h323name get queries"}]
- id: e164ext
  label: E.164 Extension
  kind: action
  command: "e164ext set {extension}"
  params: [{name: extension, type: string, description: "Usually four-digit number; restart prompted; e164ext get queries"}]
- id: autoh323dialing
  label: Auto H.323 Dialing
  kind: action
  command: "autoh323dialing {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: callpreference
  label: Call Preference (H.320/H.323)
  kind: action
  command: "callpreference {mode}"
  params: [{name: mode, type: enum, values: [h320, h323, both, get], description: "Requires system reboot"}]
- id: allowmixedcalls
  label: Allow Mixed H.320/H.323 Calls
  kind: action
  command: "allowmixedcalls {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: allowdialing
  label: Allow Dialing
  kind: action
  command: "allowdialing {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: dynamicbandwidth
  label: Dynamic Bandwidth
  kind: action
  command: "dynamicbandwidth {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: diffserv
  label: DiffServ Priority
  kind: action
  command: "diffserv set {level}"
  params: [{name: level, type: integer, description: "0..63; diffserv get queries"}]
- id: ipprecedence
  label: IP Precedence
  kind: action
  command: "ipprecedence set {level}"
  params: [{name: level, type: integer, description: "0..5; ipprecedence get queries"}]
- id: typeofservice
  label: Type Of Service Select
  kind: action
  command: "typeofservice {mode}"
  params: [{name: mode, type: enum, values: [ipprecedence, diffserv, get]}]
- id: ipdialspeed
  label: IP Dialing Speed Enable
  kind: action
  command: "ipdialspeed set {speed} {state}"
  params:
    - {name: speed, type: string, description: "Valid speed 56..1920 Kbps (see source list)"}
    - {name: state, type: enum, values: [on, off]}
- id: outboundcallroute
  label: Outbound Call Route
  kind: action
  command: "outboundcallroute {route}"
  params: [{name: route, type: enum, values: [gateway, isdn, get]}]
- id: preferredalias
  label: Preferred Alias (E.164)
  kind: action
  command: "preferredalias {alias}"
  params: [{name: alias, type: enum, values: [isdnnumber, fulldidnumber, switchnumber, didextnumber, extension, get]}]
- id: sendonlypreferredalias
  label: Send Only Preferred Alias
  kind: action
  command: "sendonlypreferredalias {state}"
  params: [{name: state, type: enum, values: [yes, no, get], description: "Forces system reboot"}]
- id: primarycallchoice
  label: Primary Call Type Choice
  kind: action
  command: "primarycallchoice {choice}"
  params: [{name: choice, type: enum, values: [isdn, ip, manual, get]}]
- id: secondarycallchoice
  label: Secondary Call Type Choice
  kind: action
  command: "secondarycallchoice {choice}"
  params: [{name: choice, type: enum, values: [isdn, ip, none, get]}]
- id: gatewayareacode
  label: Gateway Area Code
  kind: action
  command: "gatewayareacode set {areacode}"
  params: [{name: areacode, type: string, description: "Numeric string; omit to erase; gatewayareacode get queries"}]
- id: gatewaycountrycode
  label: Gateway Country Code
  kind: action
  command: "gatewaycountrycode set {code}"
  params: [{name: code, type: string, description: "Numeric string; omit to erase; gatewaycountrycode get queries"}]
- id: gatewayext
  label: Gateway Extension
  kind: action
  command: "gatewayext set {extension}"
  params: [{name: extension, type: string, description: "Numeric string; restart needed; gatewayext get queries"}]
- id: gatewaynumber
  label: Gateway Number
  kind: action
  command: "gatewaynumber set {number}"
  params: [{name: number, type: string, description: "Numeric string; omit to erase; gatewaynumber get queries"}]
- id: gatewaynumbertype
  label: Gateway Number Type
  kind: action
  command: "gatewaynumbertype {type}"
  params: [{name: type, type: enum, values: [did, number+extension, get]}]
- id: gatewayprefix
  label: Gateway Prefix Per Speed
  kind: action
  command: "gatewayprefix set {speed} {value}"
  params:
    - {name: speed, type: string, description: "Valid speed 56..1920 Kbps (see source list)"}
    - {name: value, type: string, description: "Prefix code; omit to erase; gatewayprefix get {speed} queries"}
- id: gatewaysuffix
  label: Gateway Suffix Per Speed
  kind: action
  command: "gatewaysuffix set {speed} {value}"
  params:
    - {name: speed, type: string, description: "Valid speed 56..1920 Kbps (see source list)"}
    - {name: value, type: string, description: "Suffix code; omit to erase; gatewaysuffix get {speed} queries"}
- id: gatewaysetup
  label: List Gateway Speeds
  kind: query
  command: "gatewaysetup"
  params: []
- id: usepathnavigator
  label: PathNavigator Mode
  kind: action
  command: "usepathnavigator {mode}"
  params: [{name: mode, type: enum, values: [always, never, required, get]}]

# === GMS (Global Management System) ===
- id: daylightsavings
  label: GMS Daylight Savings
  kind: action
  command: "daylightsavings {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: timediffgmt
  label: Time Difference From GMT
  kind: action
  command: "timediffgmt {offset}"
  params: [{name: offset, type: string, description: "-12:00..+00:00..+12:00; timediffgmt get queries"}]
- id: requireacctnumtodial
  label: Require Account Number To Dial
  kind: action
  command: "requireacctnumtodial {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: validateacctnum
  label: Validate Account Number
  kind: action
  command: "validateacctnum {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: setaccountnumber
  label: Set Account Number
  kind: action
  command: "setaccountnumber \"{number}\""
  params: [{name: number, type: string, description: "Account number for dial-out validation"}]
- id: techsupport
  label: Send Tech Support Phone Number
  kind: action
  command: "techsupport \"{phone num}\""
  params: [{name: phone num, type: string, description: "Contact phone number incl. area code"}]
- id: gmscity
  label: GMS City
  kind: action
  command: "gmscity set {city}"
  params: [{name: city, type: string, description: "Character string; gmscity get queries"}]
- id: gmsstate
  label: GMS State
  kind: action
  command: "gmsstate set {state}"
  params: [{name: state, type: string, description: "Character string; gmsstate get queries"}]
- id: gmscountry
  label: GMS Country
  kind: action
  command: "gmscountry set {country}"
  params: [{name: country, type: string, description: "Character string; gmscountry get queries"}]
- id: gmscontactperson
  label: GMS Contact Person
  kind: action
  command: "gmscontactperson set {person}"
  params: [{name: person, type: string, description: "Character string; gmscontactperson get queries"}]
- id: gmscontactnumber
  label: GMS Contact Number
  kind: action
  command: "gmscontactnumber set {number}"
  params: [{name: number, type: string, description: "Numeric string; gmscontactnumber get queries"}]
- id: gmscontactfax
  label: GMS Contact Fax
  kind: action
  command: "gmscontactfax set {fax}"
  params: [{name: fax, type: string, description: "Character string; gmscontactfax get queries"}]
- id: gmscontactemail
  label: GMS Contact Email
  kind: action
  command: "gmscontactemail set {email}"
  params: [{name: email, type: string, description: "Alphanumeric string; gmscontactemail get queries"}]
- id: gmstechsupport
  label: GMS Tech Support Number
  kind: action
  command: "gmstechsupport set {digits}"
  params: [{name: digits, type: string, description: "Numeric string; gmstechsupport get queries"}]
- id: gmsurl
  label: GMS Server URL
  kind: action
  command: "gmsurl set {server} {address}"
  params:
    - {name: server, type: integer, description: "1..10; 1 is primary"}
    - {name: address, type: string, description: "IP address; /pwx/vs_status.asp appended; gmsurl get {server} queries"}

# === SNMP ===
- id: enablesnmp
  label: Enable SNMP
  kind: action
  command: "enablesnmp {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: snmpadmin
  label: SNMP Administrator Name
  kind: action
  command: "snmpadmin set {name}"
  params: [{name: name, type: string, description: "Contact name; snmpadmin get queries"}]
- id: snmpcommunity
  label: SNMP Community Name
  kind: action
  command: "snmpcommunity set {name}"
  params: [{name: name, type: string, description: "Community string; snmpcommunity get queries"}]
- id: snmpconsoleip
  label: SNMP Console IP
  kind: action
  command: "snmpconsoleip set {address}"
  params: [{name: address, type: string, description: "xxx.xxx.xxx.xxx; snmpconsoleip get queries"}]
- id: snmplocation
  label: SNMP Location Name
  kind: action
  command: "snmplocation set {name}"
  params: [{name: name, type: string, description: "Location string; snmplocation get queries"}]

# === Streaming ===
- id: stream
  label: Streaming Start/Stop
  kind: action
  command: "stream {op}"
  params: [{name: op, type: enum, values: [start, stop]}]
- id: streamenable
  label: Allow Streaming
  kind: action
  command: "streamenable {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: streamannounce
  label: Streaming Announcement
  kind: action
  command: "streamannounce {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: streamspeed
  label: Stream Speed
  kind: action
  command: "streamspeed {speed}"
  params: [{name: speed, type: enum, values: ["192", "256", "384", "512", get]}]
- id: streammulticastip
  label: Stream Multicast IP
  kind: action
  command: "streammulticastip set {address}"
  params: [{name: address, type: string, description: "Multicast IP; default derived from serial number; streammulticastip get queries"}]
- id: streamrouterhops
  label: Stream Router Hops
  kind: action
  command: "streamrouterhops set {hops}"
  params: [{name: hops, type: integer, description: "Number of routers; streamrouterhops get queries"}]
- id: streamaudioport
  label: Stream Audio Port
  kind: action
  command: "streamaudioport set {port}"
  params: [{name: port, type: integer, description: "Audio port number; streamaudioport get queries"}]
- id: streamvideoport
  label: Stream Video Port
  kind: action
  command: "streamvideoport set {port}"
  params: [{name: port, type: integer, description: "Video port number; streamvideoport get queries"}]
- id: streamrestoredefaults
  label: Restore Stream Defaults
  kind: action
  command: "streamrestoredefaults"
  params: []

# === Security / passwords ===
- id: adminpassword
  label: Admin Password
  kind: action
  command: "adminpassword set {password}"
  params: [{name: password, type: string, description: "Max 10 chars, valid: a-z A-Z - _ @ / ; , . \\ 0-9; omit to erase; adminpassword get queries; NOT accessible via RS-232 port"}]
- id: meetingpassword
  label: Meeting Password
  kind: action
  command: "meetingpassword set {password}"
  params: [{name: password, type: string, description: "Alphanumeric (0-9 a-z A-Z - _ @ / ; , . \\); omit to erase; meetingpassword get queries"}]
- id: gabpassword
  label: Global Address Book Password
  kind: action
  command: "gabpassword set {password}"
  params: [{name: password, type: string, description: "Valid: a-z A-Z - _ @ / ; , . \\ 0-9; omit to erase; gabpassword get queries"}]
- id: country
  label: Country Selection
  kind: action
  command: "country set {country}"
  params: [{name: country, type: string, description: "algeria..zimbabwe, quote compound names; country get queries"}]

# === System ===
- id: systemname
  label: System Name
  kind: action
  command: "systemname set {name}"
  params: [{name: name, type: string, description: "Max 34 alphanumeric chars; systemname get queries"}]
- id: displaybolt
  label: Lightning Bolt Threshold
  kind: action
  command: "displaybolt {dd}"
  params: [{name: dd, type: integer, description: "-10000..100; positive=% packets lost, negative=packets lost"}]
- id: displayipext
  label: Display IP Extension Field
  kind: action
  command: "displayipext {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: displayipisdninfo
  label: Display IP And ISDN Info
  kind: action
  command: "displayipisdninfo {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: farnametimedisplay
  label: Far Site Name Display Time
  kind: action
  command: "farnametimedisplay set {time}"
  params: [{name: time, type: integer, description: "0..9999 seconds; omit for until call ends (default 15s); farnametimedisplay get queries"}]
- id: dataconferencetype
  label: Data Conference Type
  kind: action
  command: "dataconferencetype {type}"
  params: [{name: type, type: enum, values: [off, netmeeting, t120, get], description: "Restart prompted on change"}]
- id: netmeetingip
  label: NetMeeting IP Address
  kind: action
  command: "netmeetingip set {address}"
  params: [{name: address, type: string, description: "xxx.xxx.xxx.xxx; restart prompted; netmeetingip get queries"}]
- id: t120nameip
  label: T.120 Name Or IP
  kind: action
  command: "t120nameip set {name_or_ip}"
  params: [{name: name_or_ip, type: string, description: "t120 device name or IP; restart prompted; t120nameip get queries"}]
- id: language
  label: UI Language
  kind: action
  command: "language set {language}"
  params: [{name: language, type: enum, values: [englishus, englishuk, french, german, italian, spanish, japanese, chinese, portuguese, norwegian], description: "language get queries"}]
- id: queuecommands
  label: Queue Commands During Call Progress
  kind: action
  command: "queuecommands {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: allowusersetup
  label: Allow User Setup
  kind: action
  command: "allowusersetup {state}"
  params: [{name: state, type: enum, values: [yes, no, get]}]
- id: allowremotemon
  label: Allow Remote Monitoring Query
  kind: query
  command: "allowremotemon get"
  params: []
- id: roomphonenumber
  label: Room Phone Number
  kind: action
  command: "roomphonenumber set {number}"
  params: [{name: number, type: string, description: "Numeric string; roomphonenumber get queries"}]
- id: teleareacode
  label: Telephone Area Code
  kind: action
  command: "teleareacode set {areacode}"
  params: [{name: areacode, type: string, description: "Area code; teleareacode get queries"}]
- id: telecountrycode
  label: Telephone Country Code
  kind: action
  command: "telecountrycode set {code}"
  params: [{name: code, type: string, description: "Numeric, same as ISDN country code; telecountrycode get queries"}]
- id: telenumber
  label: Telephone Number
  kind: action
  command: "telenumber set {number}"
  params: [{name: number, type: string, description: "System telephone number; telenumber get queries"}]
- id: serialnum
  label: Serial Number Query
  kind: query
  command: "serialnum"
  params: []
- id: version
  label: Version Query
  kind: query
  command: "version"
  params: []
- id: whoami
  label: Banner Info Query
  kind: query
  command: "whoami"
  params: []
- id: display_whoami
  label: Display Banner Info
  kind: query
  command: "display whoami"
  params: []
- id: displayparams
  label: Display All System Settings
  kind: query
  command: "displayparams"
  params: []
- id: display_call
  label: Display Call Status Table
  kind: query
  command: "display call"
  params: []
- id: dir
  label: List Flash Files
  kind: query
  command: "dir {string}"
  params: [{name: string, type: string, description: "Optional partial match, max 252 chars, no wildcards"}]

# === Diagnostics ===
- id: colorbar
  label: Diagnostic Color Bars
  kind: action
  command: "colorbar {state}"
  params: [{name: state, type: enum, values: [on, off]}]
- id: nearloop
  label: Near End Loop
  kind: action
  command: "nearloop {state}"
  params: [{name: state, type: enum, values: [on, off]}]
- id: farloop
  label: Far End Loop
  kind: action
  command: "farloop {state}"
  params: [{name: state, type: enum, values: [on, off]}]
- id: lanstat
  label: LAN Statistics
  kind: query
  command: "lanstat {mode}"
  params: [{name: mode, type: enum, values: [min, misc, reset, sec, tmin, total], description: "min/tmin optionally take {0..60} minutes (default 10)"}]
- id: testlan_arp
  label: ARP Table
  kind: query
  command: "testlan arp"
  params: []
- id: testlan_dcuinfo
  label: DCU Info
  kind: query
  command: "testlan dcuinfo"
  params: []
- id: testlan_dns
  label: DNS Lookup
  kind: action
  command: "testlan dns {name_or_ip}"
  params: [{name: name_or_ip, type: string, description: "Domain name or IP address"}]
- id: testlan_echo
  label: UDP Echo Test
  kind: action
  command: "testlan echo {ip_addr}"
  params: [{name: ip_addr, type: string, description: "Remote UDP echo server; optional length|mps|reps|wait|echoport|localport"}]
- id: testlan_ping
  label: LAN Ping Test
  kind: action
  command: "testlan ping {ip_addr} {count}"
  params:
    - {name: ip_addr, type: string, description: "Device IP address"}
    - {name: count, type: integer, description: "Optional ping count"}

# === ISDN BRI (Quad BRI interface) ===
- id: isdnareacode
  label: ISDN Area Code
  kind: action
  command: "isdnareacode set {areacode}"
  params: [{name: areacode, type: string, description: "Numeric; isdnareacode get queries"}]
- id: isdncountrycode
  label: ISDN Country Code
  kind: action
  command: "isdncountrycode set {code}"
  params: [{name: code, type: string, description: "Numeric; isdncountrycode get queries"}]
- id: isdndialingprefix
  label: ISDN Dialing Prefix
  kind: action
  command: "isdndialingprefix set {prefix}"
  params: [{name: prefix, type: string, description: "Outside-line prefix (PBX); isdndialingprefix get queries"}]
- id: isdndialspeed
  label: ISDN Dialing Speed Enable
  kind: action
  command: "isdndialspeed set {speed} {state}"
  params:
    - {name: speed, type: string, description: "56, 2x56, 112, 168, 224, 280, 336, 392, 64, 8x56, 2x64, 128, 192, 256, 320, 384, 7x64, 512"}
    - {name: state, type: enum, values: [on, off]}
- id: isdnnum
  label: ISDN Video Number
  kind: action
  command: "isdnnum set {channel} {number}"
  params:
    - {name: channel, type: enum, values: [1b1, 1b2, 2b1, 2b2, 3b1, 3b2, 4b1, 4b2]}
    - {name: number, type: string, description: "ISDN video number; isdnnum get {channel} queries"}
- id: spidnum
  label: ISDN SPID Number
  kind: action
  command: "spidnum set {channel} {spid}"
  params:
    - {name: channel, type: enum, values: [1b1, 1b2, 2b1, 2b2, 3b1, 3b2, 4b1, 4b2]}
    - {name: spid, type: string, description: "SPID number; spidnum get {channel} queries"}

# === ISDN PRI (PRI interface) ===
- id: priareacode
  label: PRI Area Code
  kind: action
  command: "priareacode set {areacode}"
  params: [{name: areacode, type: string, description: "Numeric; priareacode get queries"}]
- id: pricallbycall
  label: PRI Call-By-Call Value
  kind: action
  command: "pricallbycall set {value}"
  params: [{name: value, type: integer, description: "0..31 (default 0, use 0 with PBX); pricallbycall get queries"}]
- id: prichannel
  label: PRI Channel Active
  kind: action
  command: "prichannel set {channel} {state}"
  params:
    - {name: channel, type: string, description: "all or 1..23 (T1) / 1..30 (E1)"}
    - {name: state, type: enum, values: [on, off]}
- id: pricsu
  label: PRI CSU Mode
  kind: action
  command: "pricsu {mode}"
  params: [{name: mode, type: enum, values: [internal, external, get]}]
- id: pridialchannels
  label: PRI Dial Channels
  kind: action
  command: "pridialchannels set {n}"
  params: [{name: n, type: integer, description: "1..12 (T1) / 1..15 (E1); default 3; pridialchannels get queries"}]
- id: priintlprefix
  label: PRI International Prefix
  kind: action
  command: "priintlprefix set {prefix}"
  params: [{name: prefix, type: string, description: "Numeric (011 North America default); priintlprefix get queries"}]
- id: prilinebuildout
  label: PRI Line Buildout
  kind: action
  command: "prilinebuildout set {value}"
  params: [{name: value, type: string, description: "dB (internal CSU): 0|-7.5|-15|-22.5; or feet (external CSU): 0-133|134-266|267-399|400-533|534-665"}]
- id: prilinesignal
  label: PRI Line Signaling
  kind: action
  command: "prilinesignal set {mode}"
  params: [{name: mode, type: enum, values: [esf/b8zs, crc4/hdb3, hdb3]}]
- id: prinumber
  label: PRI Video Number
  kind: action
  command: "prinumber set {number}"
  params: [{name: number, type: string, description: "Numeric; prinumber get queries"}]
- id: prinumberingplan
  label: PRI Numbering Plan
  kind: action
  command: "prinumberingplan {mode}"
  params: [{name: mode, type: enum, values: [isdn, unknown, get]}]
- id: prioutsideline
  label: PRI Outside Line Access
  kind: action
  command: "prioutsideline set {number}"
  params: [{name: number, type: string, description: "Numeric (PBX access); prioutsideline get queries"}]
- id: priswitch
  label: PRI Switch Protocol
  kind: action
  command: "priswitch set {protocol}"
  params: [{name: protocol, type: enum, values: [att5ess, att4ess, norteldms, ni2, net5/ctr4]}]

# === V.35/RS-449/RS-530/RS-366 interface ===
- id: cts
  label: CTS Signal Polarity
  kind: action
  command: "cts {mode}"
  params: [{name: mode, type: enum, values: [normal, inverted, get]}]
- id: dcd
  label: DCD Signal Polarity
  kind: action
  command: "dcd {mode}"
  params: [{name: mode, type: enum, values: [normal, inverted, get]}]
- id: dcdfilter
  label: DCD Filter
  kind: action
  command: "dcdfilter {state}"
  params: [{name: state, type: enum, values: [on, off, get], description: "on = dcd drops 60s before call state change"}]
- id: dsr
  label: DSR Signal Polarity
  kind: action
  command: "dsr {mode}"
  params: [{name: mode, type: enum, values: [normal, inverted, get]}]
- id: dsranswer
  label: DSR Ring-In Indicate
  kind: action
  command: "dsranswer {state}"
  params: [{name: state, type: enum, values: [on, off, get]}]
- id: dtr
  label: DTR Signal Mode
  kind: action
  command: "dtr {mode}"
  params: [{name: mode, type: enum, values: [normal, inverted, on, get]}]
- id: h331audiomode
  label: H.331 Broadcast Audio Mode
  kind: action
  command: "h331audiomode {mode}"
  params: [{name: mode, type: enum, values: [g728, g711u, g711a, g722-56, g722-48, off, get]}]
- id: h331framerate
  label: H.331 Broadcast Frame Rate
  kind: action
  command: "h331framerate {rate}"
  params: [{name: rate, type: enum, values: ["30", "15", "10", "7.5", get]}]
- id: h331videoprotocol
  label: H.331 Broadcast Video Protocol
  kind: action
  command: "h331videoprotocol {protocol}"
  params: [{name: protocol, type: enum, values: [h263, h261, get]}]
- id: h331videoformat
  label: H.331 Broadcast Video Format
  kind: action
  command: "h331videoformat {format}"
  params: [{name: format, type: enum, values: [fcif, get]}]
- id: rs366dialing
  label: RS-366 Dialing
  kind: action
  command: "rs366dialing {state}"
  params: [{name: state, type: enum, values: [on, off, get]}]
- id: rt
  label: RT Signal Polarity
  kind: action
  command: "rt {mode}"
  params: [{name: mode, type: enum, values: [normal, inverted, get]}]
- id: rts
  label: RTS Signal Polarity
  kind: action
  command: "rts {mode}"
  params: [{name: mode, type: enum, values: [normal, inverted, get]}]
- id: st
  label: ST Signal Polarity
  kind: action
  command: "st {mode}"
  params: [{name: mode, type: enum, values: [normal, inverted, get]}]
- id: v35broadcastmode
  label: V.35 Broadcast Mode
  kind: action
  command: "v35broadcastmode {state}"
  params: [{name: state, type: enum, values: [on, off, get]}]
- id: v35debug
  label: V.35 Debug Tracing
  kind: action
  command: "v35debug {device} {state}"
  params:
    - {name: device, type: integer, description: "0..3"}
    - {name: state, type: enum, values: [on, off]}
- id: v35dialingprotocol
  label: V.35 Dialing Protocol
  kind: action
  command: "v35dialingprotocol {protocol}"
  params: [{name: protocol, type: enum, values: [rs366, get]}]
- id: v35num
  label: V.35 Video Number
  kind: action
  command: "v35num set {channel} {number}"
  params:
    - {name: channel, type: enum, values: [1b1, 1b2]}
    - {name: number, type: string, description: "Numeric; v35num get {channel} queries"}
- id: v35portsused
  label: V.35 Ports Used
  kind: action
  command: "v35portsused {ports}"
  params: [{name: ports, type: enum, values: ["1", "1+2", get]}]
- id: v35prefix
  label: V.35 Dialing Prefix Per Speed
  kind: action
  command: "v35prefix set {speed} {value}"
  params:
    - {name: speed, type: string, description: "Valid speed 56..1920 or all"}
    - {name: value, type: string, description: "Prefix code; v35prefix get {speed} queries"}
- id: v35profile
  label: V.35 DCE Profile
  kind: action
  command: "v35profile {profile}"
  params: [{name: profile, type: enum, values: [special_1, special_2, adtran, adtran_isu512, ascend, ascend_vsx, ascend_mb+, ascend_max, avaya_mcu, fvc.com, initia, lucent_mcu, madge_teleos, promptus, get, view]}]
- id: v35suffix
  label: V.35 Dialing Suffix Per Speed
  kind: action
  command: "v35suffix set {speed} {value}"
  params:
    - {name: speed, type: string, description: "Valid speed 56..1920 or all"}
    - {name: value, type: string, description: "Suffix code; v35suffix get {speed} queries"}

# === RS-232 port config ===
- id: rs232_mode
  label: RS-232 Mode
  kind: action
  command: "rs232 mode {mode}"
  params: [{name: mode, type: enum, values: [passthru, control, get]}]
- id: rs232_flowcontrol
  label: RS-232 Flow Control
  kind: action
  command: "rs232 flowcontrol {mode}"
  params: [{name: mode, type: enum, values: [none, hardware, get]}]
- id: rs232_baud
  label: RS-232 Baud Rate
  kind: action
  command: "rs232 baud {rate}"
  params: [{name: rate, type: enum, values: ["1200", "2400", "9600", "14400", "19200", "38400", "57600", "115200", get]}]

- id: autoanswer
  label: Auto Answer Point To Point
  kind: action
  command: "autoanswer {mode}"
  params: [{name: mode, type: enum, values: [yes, no, donotdisturb, get]}]
- id: gabserverip
  label: Global Address Book Server IP Address
  kind: action
  command: "gabserverip set {address}"
  params: [{name: address, type: string, description: "xxx.xxx.xxx.xxx; can be a numeric or character string; omit to erase; range UNRESOLVED; gabserverip get queries"}]
- id: numdigitsdid
  label: Number Of Digits In DID Number
  kind: action
  command: "numdigitsdid {digits}"
  params: [{name: digits, type: integer, description: "0..24; numdigitsdid get queries"}]
- id: numdigitsext
  label: Number Of Digits In Extension
  kind: action
  command: "numdigitsext {digits}"
  params: [{name: digits, type: integer, description: "0..24; numdigitsext get queries"}]
- id: maxgabinternationalcallspeed
  label: Maximum Global Address Book International ISDN Call Speed
  kind: action
  command: "maxgabinternationalcallspeed {op}"
  params:
    - {name: op, type: enum, values: [set, get]}
    - {name: speed, type: enum, values: [2x64, 128, 256, 384, 512, 768, 1024, 1472], description: "Kbps; required when op=set; omitted when op=get"}
- id: maxgabinternetcallspeed
  label: Maximum Global Address Book Internet Call Speed
  kind: action
  command: "maxgabinternetcallspeed {op}"
  params:
    - {name: op, type: enum, values: [set, get]}
    - {name: speed, type: enum, values: [128, 256, 384, 512, 768, 1024, 1472], description: "Kbps; required when op=set; omitted when op=get"}
- id: maxgabisdncallspeed
  label: Maximum Global Address Book ISDN Call Speed
  kind: action
  command: "maxgabisdncallspeed {op}"
  params:
    - {name: op, type: enum, values: [set, get]}
    - {name: speed, type: enum, values: [2x64, 128, 256, 384, 512, 768, 1024, 1472], description: "Required when op=set; omitted when op=get"}
```

## Feedbacks
```yaml
# Query responses documented in source
- id: setting_value
  type: string
  description: "get subcommand returns command name + current setting; <empty> when unset (e.g. 'gmscountry france' / 'gmscountry <empty>')"
  query_command: "gmscountry get"
- id: call_status
  type: enum
  values: [RINGING, CONNECTED, BONDING, COMPLETE]
  description: "B channel status via 'cs: call[n] chan[n] dialstr[n] state[...]' when session registered via dial/listen/callstate; equivalents: 25% blue / 50% yellow / 75% orange / 100% green sphere"
- id: call_active
  type: string
  description: "'active: call[n] speed[n]' when call fully connected"
- id: call_cleared
  type: string
  description: "'cleared: call[n] line[n] bchan[n] cause[n]' per cleared B channel"
- id: call_ended
  type: string
  description: "'ended call[n]' or 'ended: call[n]'"
- id: call_table
  type: string
  description: "display call output: Call ID, Status (e.g. CM_CALLINFO_CONNECTED), Speed, Dialed Num"
  query_command: "display call"
- id: mute_state
  type: enum
  values: [on, off]
  description: "mute near/far get"
  query_command: "mute {endpoint} get"
- id: camera_source_number
  type: integer
  description: "camera near|far source returns selected camera number"
  query_command: "camera {endpoint} source"
- id: camera_position
  type: string
  description: "camera near getposition returns x y z"
  query_command: "camera near getposition"
- id: volume_level
  type: integer
  description: "volume get, 0..24"
  query_command: "volume get"
- id: screen_name
  type: string
  description: "get screen returns current screen name (e.g. CGenToneScreen)"
  query_command: "get screen"
- id: system_banner
  type: string
  description: "whoami / display whoami banner: name, serial, brand, software version, model, network interface, MP/H323 enabled, IP address, call times, call count, country/area code"
  query_command: "display whoami"
- id: version_info
  type: string
  description: "version (e.g. 'Release 5.0 FX - 14 Mar 2003')"
  query_command: "version"
- id: serial_number
  type: string
  description: "serialnum (e.g. 00EA79)"
  query_command: "serialnum"
- id: welcome_message
  type: string
  description: "Telnet connect banner (e.g. 'Hi, My name is: John_System')"
```

## Variables
```yaml
# All settable parameters are discrete shell command actions (see Actions).
# No separate continuous variables beyond those actions.
# UNRESOLVED: none - settable state is fully covered by command get/set pairs above
```

## Events
```yaml
# Unsolicited notifications to registered Telnet/RS-232 sessions
- id: listen_audio_ringing
  description: "'listen audio ringing' - incoming POTS call (registered via listen phone)"
- id: listen_video_ringing
  description: "'listen video ringing' - incoming video call (registered via listen video)"
- id: listen_going_to_sleep
  description: "'listen going to sleep' - system entering sleep mode (registered via listen sleep)"
- id: listen_waking_up
  description: "'listen waking up' / 'listen wake up' - system waking (registered via listen sleep)"
- id: callstate_notifications
  description: "cs:/active:/cleared:/ended: call state messages (registered via callstate register, dial, or listen)"
- id: mute_change_notification
  description: "near/far mute state change (registered via mute register)"
- id: camera_source_change
  description: "camera source changed by user (registered via camera register)"
- id: preset_change_notification
  description: "user set/went to presets (registered via preset register)"
- id: volume_change_notification
  description: "volume level change (registered via volume register)"
- id: vcbutton_event
  description: "Visual Concert FX events (registered via vcbutton register)"
- id: slides_event
  description: "slides sent/received (registered via slides register)"
- id: snapshot_event
  description: "snapshots sent/received (registered via snapshot register)"
- id: chaircontrol_event
  description: "all chair control operations (registered via chaircontrol register)"
- id: bong_warning
  description: "warning tone when button command has no function on active screen"
```

## Macros
```yaml
# Source documents script-driven sequences via run/pause/waitfor/repeat
- id: script_call_sequence
  description: "Script file with one command per line executed via run; e.g. dial manual ... ; waitfor callcomplete ; hangup video"
  steps:
    - "dial manual {speed} \"{dialstr}\""
    - "waitfor callcomplete"
    - "hangup video 0"
- id: pause_between_commands
  description: "pause <0..65535> seconds between scripted commands"
  steps:
    - "pause {seconds}"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Vendor recommendation only: do not disable
# echo canceller (echocanceller) - audio quality note, not a safety interlock.
```

## Notes
- API usable via Telnet (port 24 recommended — avoids extensive debug output seen on other ports) or RS-232 in Control mode.
- All commands are case-sensitive (source note).
- A carriage return is required before an RS-232 session can proceed.
- `adminpassword` cannot be accessed through the RS-232 port.
- When not in a call, all `camera near move` commands must be preceded by `button near`.
- `button` commands are not validated before being sent to the UI; a "bong" warning sounds if the key has no function on the current screen. Multiple keys may be combined in one command (e.g. `button near left right callhangup`).
- Many configuration changes prompt for system restart (ipaddress, subnetmask, defaultgateway, dns, dhcp, hostname, winsserver, gatekeeperip, usegatekeeper, callpreference, e164ext, dataconferencetype, netmeetingip, t120nameip, winsresolution, sendonlypreferredalias, gatewayext).
- RS-232 supports Control and Pass-Thru modes; Pass-Thru (proprietary data channel over H.320 calls only) requires both endpoints be ViewStation EX/FX/VS4000 and set to the same data rate. Hardware flow control settings must be consistent across both ends.
- Source syntax heading for `enablesnapshots` misprints the command line as `enablesnmp` (a separate real command); the Enable Snapshot feature command is `enablesnapshots` per the section description and UI path (Cameras: Enable Snapshot).
- VS4000-specific commands: `camera1ptz`, `camera4ptz`, `camerainput` (4 camera inputs; camera 3 has no S-video). ViewStation EX lacks camera 4 and multipoint options without upgrade; EX supports speeds up to 768 Kbps.
- ISDN BRI commands require Quad BRI interface; PRI commands require PRI interface on ViewStation FX/VS4000; V.35 commands require V.35/RS-449/RS-530/RS-366 interface.
- Example `display whoami` output in source shows model VSFX4 and "Release 5.0 FX - 14 Mar 2003" — illustrative output, not a compatibility statement.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no error/fault response catalog documented beyond echo/ping failure examples and call cause codes -->
<!-- UNRESOLVED: CGI POST usage referenced in introduction but no HTTP endpoint syntax documented in this source -->

## Provenance

```yaml
source_domains:
  - polycom-ua.com
source_urls:
  - https://www.polycom-ua.com/assets/files/Video/ViewStation/vs_ex_api_guide.pdf
retrieved_at: 2026-09-02T20:28:48.880Z
last_checked_at: 2026-10-07T21:08:37.840Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T21:08:37.840Z
matched_actions: 264
action_count: 264
confidence: medium
summary: "All 264 action units match source commands with correct shapes, the telnet/serial transport values are stated in the source, and the spec covers the whole command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "source document covers ViewStation EX / ViewStation FX / VS4000 jointly; some commands are EX/FX-specific or require optional network interface modules (Quad BRI, PRI, V.35/RS-449/RS-530/RS-366)"
- "none - settable state is fully covered by command get/set pairs above"
- "source contains no explicit safety warnings, interlock procedures,"
- "no error/fault response catalog documented beyond echo/ping failure examples and call cause codes"
- "CGI POST usage referenced in introduction but no HTTP endpoint syntax documented in this source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
