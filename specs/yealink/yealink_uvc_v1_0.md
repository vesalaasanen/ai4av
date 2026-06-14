---
spec_id: admin/yealink-uvc-v1-0
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yealink UVC v1.0 Control Spec"
manufacturer: Yealink
model_family: "Yealink UVC v1.0"
aliases: []
compatible_with:
  manufacturers:
    - Yealink
  models:
    - "Yealink UVC v1.0"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support-cdn.yealink.com
  - voipinfo.net
  - applicationmarket.crestron.com
source_urls:
  - https://support-cdn.yealink.com/attachment/upload/attachment/2019-12-19/5/ea3f2d1b-51d1-43db-86f8-ba1b1f133d04/API_Commands_Introduction_for_Yealink_Video_Conferencing_System_V1.08.pdf
  - https://www.voipinfo.net/docs/yealink/API_Commands_Introduction_for_Yealink_Video_Conferencing_System_V1.06.pdf
  - https://applicationmarket.crestron.com/yealink-uvc-v1-0/
retrieved_at: 2026-06-13T06:24:48.940Z
last_checked_at: 2026-06-14T16:16:37.750Z
generated_at: 2026-06-14T16:16:37.750Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact UVC v1.0 hardware models covered (e.g. UVC86/UVC85/UVC40/UVC34/UVC30) are not enumerated in the source PDF. Source describes command syntax generically across the VC family (VC110/VC120/VC400/VC500/VC800/VC880) and notes model differences inline."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "UVC v1.0 hardware models covered (UVC86/UVC85/UVC40/UVC34/UVC30) are not enumerated in the source. The source's per-command model notes reference the older VC family (VC110/VC120/VC400/VC500/VC800/VC880) and the UVC family is implied to use the same surface."
verification:
  verdict: verified
  checked_at: 2026-06-14T16:16:37.750Z
  matched_actions: 66
  action_count: 66
  confidence: medium
  summary: "All 66 spec actions match verbatim source commands with correct shapes; transport parameters confirmed; source catalogue fully represented. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-13
---

# Yealink UVC v1.0 Control Spec

## Summary
ASCII control protocol for Yealink video conferencing systems (UVC family and related VC-series endpoints). Commands are sent as line-terminated ASCII strings over LAN TCP port 6024 or over RS-232 serial (115200 8N1). The spec covers call, camera, layout, mute, volume, DND, address book, history, input source, storage, system status and version commands. UVC v1.0 itself is referenced as a Crestron Application Market driver name; the underlying control surface is the same Yealink API.

<!-- UNRESOLVED: exact UVC v1.0 hardware models covered (e.g. UVC86/UVC85/UVC40/UVC34/UVC30) are not enumerated in the source PDF. Source describes command syntax generically across the VC family (VC110/VC120/VC400/VC500/VC800/VC880) and notes model differences inline. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 6024
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from button power command
- routable        # inferred from inputsource camera|pc|share commands
- queryable       # inferred from sysstatus get / volume get / mute near get / donotdisturb global get / storage get / version / getcallid / history / addrbook / layout / camera near getposition
- levelable       # inferred from volume up/down/set commands
```

## Actions
```yaml
- id: answer
  label: Answer or Refuse Call
  kind: action
  command: "answer <yes|no>\r\n"
  params:
    - name: action
      type: enum
      values: [yes, no]
      description: "yes = answer call; no = refuse call"

- id: addrbook_all
  label: Address Book - All Contacts
  kind: query
  command: "addrbook all\r\n"

- id: addrbook_get_all
  label: Address Book - Get All by Type
  kind: query
  command: "addrbook <local|conf> get all\r\n"
  params:
    - name: type
      type: enum
      values: [local, conf]

- id: addrbook_get_n
  label: Address Book - Get N by Type
  kind: query
  command: "addrbook <local|conf> get {n}\r\n"
  params:
    - name: type
      type: enum
      values: [local, conf]
    - name: n
      type: integer
      description: Number of contacts to return (positive integer)

- id: addrbook_search
  label: Address Book - Search
  kind: query
  command: "addrbook search \"<searchstring>\"\r\n"
  params:
    - name: searchstring
      type: string

- id: button_power
  label: Button - Power
  kind: action
  command: "button power\r\n"

- id: button_f1
  label: Button - F1
  kind: action
  command: "button F1\r\n"

- id: button_f2
  label: Button - F2
  kind: action
  command: "button F2\r\n"

- id: button_f3
  label: Button - F3
  kind: action
  command: "button F3\r\n"

- id: button_volume_up
  label: Button - Volume Up
  kind: action
  command: "button volume+\r\n"

- id: button_volume_down
  label: Button - Volume Down
  kind: action
  command: "button volume-\r\n"

- id: button_zoom_in
  label: Button - Zoom In
  kind: action
  command: "button zoom+\r\n"

- id: button_zoom_out
  label: Button - Zoom Out
  kind: action
  command: "button zoom-\r\n"

- id: button_up
  label: Button - Up Arrow
  kind: action
  command: "button up\r\n"

- id: button_down
  label: Button - Down Arrow
  kind: action
  command: "button down\r\n"

- id: button_right
  label: Button - Right Arrow
  kind: action
  command: "button right\r\n"

- id: button_left
  label: Button - Left Arrow
  kind: action
  command: "button left\r\n"

- id: button_select
  label: Button - Select (OK)
  kind: action
  command: "button select\r\n"

- id: button_mute
  label: Button - Mute
  kind: action
  command: "button mute\r\n"

- id: button_home
  label: Button - Home
  kind: action
  command: "button home\r\n"

- id: button_show
  label: Button - Show Video Source (VC110/VC120/VC400)
  kind: action
  command: "button show\r\n"

- id: button_back
  label: Button - Back (VC500/VC800/VC880)
  kind: action
  command: "button back\r\n"

- id: button_call
  label: Button - Call (Off-hook)
  kind: action
  command: "button call\r\n"

- id: button_delete
  label: Button - Delete
  kind: action
  command: "button delete\r\n"

- id: button_hangup
  label: Button - Hangup (On-hook)
  kind: action
  command: "button hangup\r\n"

- id: button_digit
  label: Button - Digit / * / #
  kind: action
  command: "button <0|1|2|3|4|5|6|7|8|9|*|#>\r\n"
  params:
    - name: key
      type: enum
      values: ["0","1","2","3","4","5","6","7","8","9","*","#"]

- id: button_record_start
  label: Button - Recording Start
  kind: action
  command: "button recordstart\r\n"

- id: button_record_stop
  label: Button - Recording Stop
  kind: action
  command: "button recordstop\r\n"

- id: button_screenshot
  label: Button - Screenshot
  kind: action
  command: "button screenshot\r\n"

- id: camera_near_move
  label: Camera Near - Move
  kind: action
  command: "camera near move <left|right|up|down|zoom+|zoom-|stop>\r\n"
  params:
    - name: direction
      type: enum
      values: [left, right, up, down, "zoom+", "zoom-", stop]

- id: camera_near_getposition
  label: Camera Near - Get Position
  kind: query
  command: "camera near getposition\r\n"

- id: camera_near_setposition
  label: Camera Near - Set Position
  kind: action
  command: "camera near setposition \"<x>\" \"<y>\" \"<z>\"\r\n"
  params:
    - name: x
      type: integer
      description: Pan 0..1920
    - name: y
      type: integer
      description: Tilt 0..1080
    - name: z
      type: integer
      description: Zoom 0..100

- id: camera_near_get_id_list
  label: Camera Near - Get ID List
  kind: query
  command: "camera near get_id_list\r\n"

- id: camera_near_get_id_detial
  label: Camera Near - Get ID Detail
  kind: query
  command: "camera near get_id_detial \"<id:int>\"\r\n"
  params:
    - name: id
      type: integer
      description: Camera id (0..n, up to 9)

- id: camera_near_set_active_status
  label: Camera Near - Set Active Status
  kind: action
  command: "camera near set_active_status \"<id:int>\"\r\n"
  params:
    - name: id
      type: integer

- id: camera_near_move_id
  label: Camera Near - Move by ID
  kind: action
  command: "camera near move_id \"<id:int>\" <\"direct:2\"|\"direct:4\"|\"direct:6\"|\"direct:8\"|stop>\r\n"
  params:
    - name: id
      type: integer
    - name: direction
      type: enum
      values: ["direct:2", "direct:4", "direct:6", "direct:8", stop]
      description: "2=down 4=up 6=right 8=left"

- id: camera_near_zoom_id
  label: Camera Near - Zoom by ID
  kind: action
  command: "camera near zoom_id \"<id:int>\" <\"direct:0\"|\"direct:1\"|stop>\r\n"
  params:
    - name: id
      type: integer
    - name: direction
      type: enum
      values: ["direct:0", "direct:1", stop]
      description: "0=zoom out 1=zoom in"

- id: callinfo_all
  label: Call Info - All
  kind: query
  command: "callinfo all\r\n"

- id: callinfo_callid
  label: Call Info - By Call ID
  kind: query
  command: "callinfo callid \"<callid>\"\r\n"
  params:
    - name: callid
      type: string

- id: dial_auto
  label: Dial - Auto
  kind: action
  command: "dial auto \"<dialstring>\"\r\n"
  params:
    - name: dialstring
      type: string
      description: One or more phone numbers (multi for conference)

- id: dial_manual
  label: Dial - Manual
  kind: action
  command: "dial manual <video|audio|auto> <auto|sip|h323> \"<speed>\" \"<dialstring>\"\r\n"
  params:
    - name: calltype
      type: enum
      values: [video, audio, auto]
    - name: protocol
      type: enum
      values: [auto, sip, h323]
    - name: speed
      type: string
      description: Bandwidth (e.g. "auto", "1024")
    - name: dialstring
      type: string

- id: donotdisturb_global
  label: DND - Global
  kind: action
  command: "donotdisturb global <get|on|off>\r\n"
  params:
    - name: mode
      type: enum
      values: [get, "on", off]

- id: donotdisturb_talk
  label: DND - In Call
  kind: action
  command: "donotdisturb talk <get|on|off>\r\n"
  params:
    - name: mode
      type: enum
      values: [get, "on", off]

- id: gendial
  label: Generate DTMF Tone
  kind: action
  command: "gendial <0|1|2|3|4|5|6|7|8|9|*|#>\r\n"
  params:
    - name: digit
      type: enum
      values: ["0","1","2","3","4","5","6","7","8","9","*","#"]

- id: getcallid
  label: Get Call IDs
  kind: query
  command: "getcallid\r\n"

- id: history_all
  label: Call History - All
  kind: query
  command: "history all\r\n"

- id: history_get_all
  label: Call History - Get All by Type
  kind: query
  command: "history <placed|received|misscalled> get all\r\n"
  params:
    - name: type
      type: enum
      values: [placed, received, misscalled]

- id: history_get_n
  label: Call History - Get N by Type
  kind: query
  command: "history <placed|received|misscalled> get {n}\r\n"
  params:
    - name: type
      type: enum
      values: [placed, received, misscalled]
    - name: n
      type: integer
      description: Number of records

- id: inputsource_camera
  label: Input Source - Camera
  kind: action
  command: "inputsource camera\r\n"

- id: inputsource_pc
  label: Input Source - PC
  kind: action
  command: "inputsource pc\r\n"

- id: inputsource_share
  label: Input Source - PC + Camera (in call only)
  kind: action
  command: "inputsource share\r\n"

- id: layout_near_get
  label: Layout Near - Get (VC500/VC800/VC880)
  kind: query
  command: "layout near get\r\n"

- id: layout_near_get_list
  label: Layout Near - Get List (VC500/VC800/VC880)
  kind: query
  command: "layout near get list\r\n"

- id: layout_near_set
  label: Layout Near - Set
  kind: action
  command: "layout near set <layoutmode> <idlist>\r\n"
  params:
    - name: layoutmode
      type: enum
      values: [equal, surround, fullscreen, share, pip, empspk]
    - name: idlist
      type: string
      description: Call id, or pc|share|camera

- id: layout_near_camera_layout_get
  label: Layout Near - Get Multi-camera Layout
  kind: query
  command: "layout near camera_layout_get\r\n"

- id: layout_near_camera_layout_set
  label: Layout Near - Set Multi-camera Layout
  kind: action
  command: "layout near camera_layout_set <layoutmode> <idlist>\r\n"
  params:
    - name: layoutmode
      type: enum
      values: [equal, surround, fullscreen]
    - name: idlist
      type: string
      description: Camera ids from camera near get_id_list

- id: mute_near
  label: Mute Near (Local Mute)
  kind: action
  command: "mute near <get|on|off|toggle>\r\n"
  params:
    - name: mode
      type: enum
      values: [get, "on", off, toggle]

- id: preset_near_go
  label: Camera Preset - Go
  kind: action
  command: "preset near go <0|1|2|3|4|5|6|7|8|9>\r\n"
  params:
    - name: preset
      type: integer
      description: Preset number 0..9

- id: preset_near_set
  label: Camera Preset - Set
  kind: action
  command: "preset near set <0|1|2|3|4|5|6|7|8|9>\r\n"
  params:
    - name: preset
      type: integer
      description: Preset number 0..9

- id: storage_get
  label: Storage (USB) - Get
  kind: query
  command: "storage get\r\n"

- id: sysstatus_get
  label: System Status - Get
  kind: query
  command: "sysstatus get\r\n"

- id: volume_get
  label: Volume - Get
  kind: query
  command: "volume get\r\n"

- id: volume_up
  label: Volume - Up
  kind: action
  command: "volume up\r\n"

- id: volume_down
  label: Volume - Down
  kind: action
  command: "volume down\r\n"

- id: volume_set
  label: Volume - Set
  kind: action
  command: "volume set <0..10>\r\n"
  params:
    - name: level
      type: integer
      description: Volume level 0..10

- id: version
  label: Version
  kind: query
  command: "version\r\n"
```

## Feedbacks
```yaml
- id: dnd_global_state
  type: enum
  values: [on, off]
  command: "donotdisturb global get <on|off>\r\n"

- id: dnd_talk_state
  type: enum
  values: [on, off]
  command: "donotdisturb talk get <on|off>\r\n"

- id: mute_state
  type: enum
  values: [on, off]
  command: "mute near get <on|off>\r\n"

- id: storage_state
  type: enum
  values: [available, unavailable]
  command: "storage get <available|unavailable>\r\n"

- id: sysstatus
  type: enum
  values: [sleeping, idle, outgoing, ringing, talking, finished, "talking max"]
  command: "sysstatus get <state> [\"dialstr:...\" \"callid:...\" \"calltype:...\" \"protocol:...\" \"direction:...\"]\r\n"

- id: version_info
  type: object
  fields:
    - model
    - firmware
    - hardware
    - productId
    - cc_version
  command: "version \"model:...\" \"firmware:...\" \"hardware:...\" \"productId:...\" \"cc_version:...\"\r\n"

- id: incoming_call
  type: object
  fields:
    - num
    - name
  command: "incoming \"num:<string>\" \"name:<string>\"\r\n"

- id: callinfo_audio
  type: object
  fields: [callid, RemoteStr, direction, protocol, devInfo, TotalBwRecv, TotalBwSend, AcodecRecv, AcodecSend, ABwRecv, ABwSend, ASrRecv, ASrSend, AJrRecv, AJrSend, AtplRecv, AtplSend, AtplpRecv, AtplpSend]
  command: "callinfo audio \"callid:...\" \"RemoteStr:...\" \"direction:...\" \"protocol:...\" \"devInfo:...\" \"TotalBwRecv:...\" ...\r\n"

- id: callinfo_video
  type: object
  fields: [callid, RemoteStr, direction, protocol, devInfo, TotalBwRecv, TotalBwSend, VResRecv, VResSend, VCodecRecv, VCodecSend, VBwRecv, VBwSend, VFrRecv, VFrSend, VJrRecv, VJrSend, VtplRecv, VtplSend, VtplpRecv, VtplpSend, AcodecRecv, AcodecSend, ABwRecv, ABwSend, ASrRecv, ASrSend, AJrRecv, AJrSend, AtplRecv, AtplSend, AtplpRecv, AtplpSend, SResRecv, SResSend, SCodecRecv, SCodecSend, SBwRecv, SBwSend, SFrRecv, SFrSend]
  command: "callinfo video \"callid:...\" ...\r\n"

- id: camera_near_position
  type: object
  fields: [pan, tilt, zoom]
  command: "camera near getposition\r\n"
```

## Variables
```yaml
- id: volume_level
  label: Audio Volume
  type: integer
  range: [0, 10]
  set_command: "volume set {level}\r\n"
  get_command: "volume get\r\n"
```

## Events
```yaml
- id: incoming_call
  trigger: device_to_host
  command: "incoming \"num:<string>\" \"name:<string>\"\r\n"
  description: Sent by device when receiving an incoming call

- id: version_announce
  trigger: device_to_host
  command: "version \"model:...\" \"firmware:...\" \"hardware:...\" \"productId:...\" \"cc_version:...\"\r\n"
  description: Sent by device on first connect over LAN or serial

- id: dnd_global_change
  trigger: device_to_host
  command: "donotdisturb global get <on|off>\r\n"
  description: Sent by device whenever global DND state changes

- id: dnd_talk_change
  trigger: device_to_host
  command: "donotdisturb talk get <on|off>\r\n"
  description: Sent by device whenever in-call DND state changes

- id: mute_change
  trigger: device_to_host
  command: "mute near get <on|off>\r\n"
  description: Sent by device whenever local mute state changes

- id: storage_change
  trigger: device_to_host
  command: "storage get <available|unavailable>\r\n"
  description: Sent by device whenever USB storage availability changes

- id: sysstatus_change
  trigger: device_to_host
  command: "sysstatus get <state> [...]\r\n"
  description: Sent by device on call state changes (outgoing/ringing/talking/finished/etc.)
```

## Macros
```yaml
# No multi-step sequences documented in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Every command and response must end with `\r\n`. Commands are case sensitive; use half-width input.
- TCP control port is 6024; serial link is 115200 baud, 8 data bits, no parity, 1 stop bit.
- Layout commands (`layout near ...`) are documented as "not applicable to VC110/VC120/VC400" — apply only to VC500/VC800/VC880.
- `button F1/F2/F3` semantics differ by VC family: on VC110/VC120/VC400 they are red/yellow/blue; on VC500/VC800/VC880 they are recording/layout/custom.
- `button show` is only applicable to VC110/VC120/VC400; `button back` is only applicable to VC500/VC800/VC880.
- Numeric keypad `*` and `#` have model-specific behaviors (record/screenshot) only on VC110/VC120/VC400.
- `sysstatus get finished` is real-time and is only delivered as feedback; it cannot be queried on demand.
- `incoming`, `version`, `donotdisturb`, `mute`, `storage` and `sysstatus` are unsolicited feedback channels — the device sends them on state changes without a query.

<!-- UNRESOLVED: UVC v1.0 hardware models covered (UVC86/UVC85/UVC40/UVC34/UVC30) are not enumerated in the source. The source's per-command model notes reference the older VC family (VC110/VC120/VC400/VC500/VC800/VC880) and the UVC family is implied to use the same surface. -->

## Provenance

```yaml
source_domains:
  - support-cdn.yealink.com
  - voipinfo.net
  - applicationmarket.crestron.com
source_urls:
  - https://support-cdn.yealink.com/attachment/upload/attachment/2019-12-19/5/ea3f2d1b-51d1-43db-86f8-ba1b1f133d04/API_Commands_Introduction_for_Yealink_Video_Conferencing_System_V1.08.pdf
  - https://www.voipinfo.net/docs/yealink/API_Commands_Introduction_for_Yealink_Video_Conferencing_System_V1.06.pdf
  - https://applicationmarket.crestron.com/yealink-uvc-v1-0/
retrieved_at: 2026-06-13T06:24:48.940Z
last_checked_at: 2026-06-14T16:16:37.750Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T16:16:37.750Z
matched_actions: 66
action_count: 66
confidence: medium
summary: "All 66 spec actions match verbatim source commands with correct shapes; transport parameters confirmed; source catalogue fully represented. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact UVC v1.0 hardware models covered (e.g. UVC86/UVC85/UVC40/UVC34/UVC30) are not enumerated in the source PDF. Source describes command syntax generically across the VC family (VC110/VC120/VC400/VC500/VC800/VC880) and notes model differences inline."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "UVC v1.0 hardware models covered (UVC86/UVC85/UVC40/UVC34/UVC30) are not enumerated in the source. The source's per-command model notes reference the older VC family (VC110/VC120/VC400/VC500/VC800/VC880) and the UVC family is implied to use the same surface."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
