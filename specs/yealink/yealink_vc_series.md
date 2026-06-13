---
spec_id: admin/yealink-vc-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yealink VC Series Control Spec"
manufacturer: Yealink
model_family: VC110
aliases: []
compatible_with:
  manufacturers:
    - Yealink
  models:
    - VC110
    - VC120
    - VC400
    - VC500
    - VC800
    - VC880
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support-cdn.yealink.com
  - applicationmarket.crestron.com
  - voipinfo.net
  - support.yealink.com
source_urls:
  - https://support-cdn.yealink.com/attachment/upload/attachment/2019-12-19/5/ea3f2d1b-51d1-43db-86f8-ba1b1f133d04/API_Commands_Introduction_for_Yealink_Video_Conferencing_System_V1.08.pdf
  - "https://applicationmarket.crestron.com/content/Help/Yealink/Yealink%20VC%20Series%20RS232%20v1.0%20Help.pdf"
  - https://www.voipinfo.net/docs/yealink/API_Commands_Introduction_for_Yealink_Video_Conferencing_System_V1.06.pdf
  - https://support.yealink.com
retrieved_at: 2026-06-12T06:13:52.597Z
last_checked_at: 2026-06-12T20:02:36.962Z
generated_at: 2026-06-12T20:02:36.962Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source uses examples with firmware 30.20.254.12 and 50.20.251.31 across different VC models; the compatible firmware range is not stated."
  - "flow control not stated in source"
  - "source does not document safety warnings, interlock procedures,"
  - "firmware version compatibility, hardware revision compatibility, exact flow control setting for the serial transport, and authentication requirements (the source describes no login flow at all, so `none` is inferred)."
verification:
  verdict: verified
  checked_at: 2026-06-12T20:02:36.962Z
  matched_actions: 66
  action_count: 66
  confidence: medium
  summary: "All 66 spec actions confirmed verbatim in source; transport (TCP 6024, baud 115200, 8N1) matches source exactly; feedbacks cover incoming/sysstatus/donotdisturb/mute/storage/version which are all documented in source. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Yealink VC Series Control Spec

## Summary
External ASCII API for Yealink video conferencing systems (VC110/VC120/VC400/VC500/VC800/VC880) over TCP port 6024 or RS-232 serial. Each command is a single line terminated with `\r\n`; commands are case sensitive and use half-width input. The API exposes call control, contact/history query, camera PTZ and presets, input source selection, layout, mute, volume, DND, system status, version, and a `button` namespace that emulates remote control key presses. Several commands also produce unsolicited feedback on state change.

<!-- UNRESOLVED: source uses examples with firmware 30.20.254.12 and 50.20.251.31 across different VC models; the compatible firmware range is not stated. -->

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
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from button power command
- routable        # inferred from inputsource and layout command set
- queryable       # inferred from callinfo/history/sysstatus/version query commands
- levelable       # inferred from volume get/up/down/set commands
```

## Actions
```yaml
- id: answer
  label: Answer or Refuse Call
  kind: action
  command: 'answer <yes|no>'
  params:
    - name: response
      type: enum
      values: [yes, no]
      description: yes = answer incoming call, no = refuse incoming call

- id: addrbook_all
  label: Get All Contacts
  kind: query
  command: 'addrbook all'
  params: []

- id: addrbook_get_all
  label: Get All Contacts Of Type
  kind: query
  command: 'addrbook <local|conf> get all'
  params:
    - name: type
      type: enum
      values: [local, conf]
      description: Contact type: local or conference

- id: addrbook_get_n
  label: Get First N Contacts Of Type
  kind: query
  command: 'addrbook <local|conf> get {1..n}'
  params:
    - name: type
      type: enum
      values: [local, conf]
    - name: count
      type: integer
      description: Positive integer, number of contacts to retrieve

- id: addrbook_search
  label: Search Contacts
  kind: query
  command: 'addrbook search "searchstring"'
  params:
    - name: searchstring
      type: string

- id: button_power
  label: Power Button (Remote Emulation)
  kind: action
  command: 'button power'
  params: []

- id: button_f1
  label: F1 Button (Red / Record)
  kind: action
  command: 'button F1'
  params: []
  notes: VC110/VC120/VC400: red button. VC500/VC800/VC880: recording button.

- id: button_f2
  label: F2 Button (Yellow / Layout)
  kind: action
  command: 'button F2'
  params: []
  notes: VC110/VC120/VC400: yellow button. VC500/VC800/VC880: layout button.

- id: button_f3
  label: F3 Button (Blue / Custom)
  kind: action
  command: 'button F3'
  params: []
  notes: VC110/VC120/VC400: blue button. VC500/VC800/VC880: custom (Presentation/Input/Screenshot/Mute Speaker).

- id: button_volume_up
  label: Volume Up Button
  kind: action
  command: 'button volume+'
  params: []

- id: button_volume_down
  label: Volume Down Button
  kind: action
  command: 'button volume-'
  params: []

- id: button_zoom_in
  label: Camera Zoom In Button
  kind: action
  command: 'button zoom+'
  params: []

- id: button_zoom_out
  label: Camera Zoom Out Button
  kind: action
  command: 'button zoom-'
  params: []

- id: button_arrow_up
  label: Arrow Up Button
  kind: action
  command: 'button up'
  params: []

- id: button_arrow_down
  label: Arrow Down Button
  kind: action
  command: 'button down'
  params: []

- id: button_arrow_right
  label: Arrow Right Button
  kind: action
  command: 'button right'
  params: []

- id: button_arrow_left
  label: Arrow Left Button
  kind: action
  command: 'button left'
  params: []

- id: button_select
  label: OK / Select Button
  kind: action
  command: 'button select'
  params: []

- id: button_mute
  label: Mute Button
  kind: action
  command: 'button mute'
  params: []

- id: button_home
  label: Home Button
  kind: action
  command: 'button home'
  params: []

- id: button_show
  label: Video Source Button (VC110/VC120/VC400 only)
  kind: action
  command: 'button show'
  params: []

- id: button_back
  label: Back Button (VC500/VC800/VC880 only)
  kind: action
  command: 'button back'
  params: []

- id: button_call
  label: Off-Hook Button
  kind: action
  command: 'button call'
  params: []

- id: button_delete
  label: Delete Button
  kind: action
  command: 'button delete'
  params: []

- id: button_hangup
  label: On-Hook Button
  kind: action
  command: 'button hangup'
  params: []

- id: button_digit
  label: Numeric / * / # Button
  kind: action
  command: 'button <1|2|3|4|5|6|7|8|9|0|*|#>'
  params:
    - name: digit
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "#"]
  notes: VC110/VC120/VC400: * starts recording, # captures screenshot. VC500/VC800/VC880: no special behaviour.

- id: button_recordstart
  label: Start Recording Button
  kind: action
  command: 'button recordstart'
  params: []

- id: button_recordstop
  label: Stop Recording Button
  kind: action
  command: 'button recordstop'
  params: []

- id: button_screenshot
  label: Screenshot Button
  kind: action
  command: 'button screenshot'
  params: []

- id: camera_near_move
  label: Near Camera Continuous Move
  kind: action
  command: 'camera near move <left|right|up|down|zoom+|zoom-|stop>'
  params:
    - name: direction
      type: enum
      values: [left, right, up, down, "zoom+", "zoom-", stop]

- id: camera_near_getposition
  label: Near Camera Get PTZ Position
  kind: query
  command: 'camera near getposition'
  params: []
  notes: Returns pan(x:0-1920) tilt(y:0-1080) zoom(z:0-100) of currently selected PTZ camera.

- id: camera_near_setposition
  label: Near Camera Set PTZ Position
  kind: action
  command: 'camera near setposition "x" "y" "z"'
  params:
    - name: x
      type: integer
      description: pan 0-1920
    - name: y
      type: integer
      description: tilt 0-1080
    - name: z
      type: integer
      description: zoom 0-100

- id: camera_near_get_id_list
  label: Get Connected Camera List
  kind: query
  command: 'camera near get_id_list'
  params: []
  notes: Returns up to 9 camera ids.

- id: camera_near_get_id_detail
  label: Get Camera Detail
  kind: query
  command: 'camera near get_id_detial "id:int"'
  params:
    - name: id
      type: integer
  notes: Returns id, status, name, default, ip, mac.

- id: camera_near_set_active_status
  label: Activate Camera
  kind: action
  command: 'camera near set_active_status "id:int"'
  params:
    - name: id
      type: integer

- id: camera_near_move_id
  label: Move Camera By Id
  kind: action
  command: 'camera near move_id "id:int" "direct:int"|stop'
  params:
    - name: id
      type: integer
    - name: direction
      type: integer
      description: '2=down, 4=up, 6=right, 8=left, or stop'
  notes: Use `stop` to halt movement.

- id: camera_near_zoom_id
  label: Zoom Camera By Id
  kind: action
  command: 'camera near zoom_id "id:int" "direct:int"|stop'
  params:
    - name: id
      type: integer
    - name: direction
      type: integer
      description: '0=zoom out, 1=zoom in, or stop'

- id: callinfo_all
  label: Get All Call Statistics
  kind: query
  command: 'callinfo all'
  params: []
  notes: Returns audio and video callinfo rows with codec/resolution/bitrate/jitter/packet loss fields.

- id: callinfo_callid
  label: Get Call Statistics By Callid
  kind: query
  command: 'callinfo callid "callid"'
  params:
    - name: callid
      type: string

- id: dial_auto
  label: Dial With Default Type/Protocol
  kind: action
  command: 'dial auto "dialstring"'
  params:
    - name: dialstring
      type: string
  notes: May pass multiple dialstrings for conference contact dialing.

- id: dial_manual
  label: Manual Dial With Type/Protocol/Bandwidth
  kind: action
  command: 'dial manual <video|audio|auto> <auto|sip|h323> "speed" "dialstring"'
  params:
    - name: calltype
      type: enum
      values: [video, audio, auto]
    - name: protocol
      type: enum
      values: [auto, sip, h323]
    - name: speed
      type: string
      description: Bandwidth string, e.g. "auto" or "1024"
    - name: dialstring
      type: string

- id: donotdisturb_global
  label: DND Global Get/On/Off
  kind: action
  command: 'donotdisturb global <get|on|off>'
  params:
    - name: mode
      type: enum
      values: [get, "on", "off"]

- id: donotdisturb_talk
  label: DND During Call Get/On/Off
  kind: action
  command: 'donotdisturb talk <get|on|off>'
  params:
    - name: mode
      type: enum
      values: [get, "on", "off"]

- id: gendial
  label: Generate DTMF Tone
  kind: action
  command: 'gendial <0|1|2|3|4|5|6|7|8|9|#|*>'
  params:
    - name: digit
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "*"]

- id: getcallid
  label: Get Call IDs For Active Connections
  kind: query
  command: 'getcallid'
  params: []

- id: history_all
  label: Get All Call History
  kind: query
  command: 'history all'
  params: []

- id: history_get_all
  label: Get All Call History Of Type
  kind: query
  command: 'history <placed|received|misscalled> get all'
  params:
    - name: type
      type: enum
      values: [placed, received, misscalled]

- id: history_get_n
  label: Get First N Call History Of Type
  kind: query
  command: 'history <placed|received|misscalled> get {1..n}'
  params:
    - name: type
      type: enum
      values: [placed, received, misscalled]
    - name: count
      type: integer

- id: inputsource_camera
  label: Set Camera As Video Source
  kind: action
  command: 'inputsource camera'
  params: []

- id: inputsource_pc
  label: Set PC As Video Source
  kind: action
  command: 'inputsource pc'
  params: []

- id: inputsource_share
  label: Set PC + Camera As Video Source
  kind: action
  command: 'inputsource share'
  params: []
  notes: PC+camera may be selected only during a call.

- id: layout_near_get
  label: Get Local Video Layout
  kind: query
  command: 'layout near get'
  params: []
  notes: Not applicable to VC110/VC120/VC400.

- id: layout_near_get_list
  label: Get Supported Local Layout Modes
  kind: query
  command: 'layout near get list'
  params: []
  notes: Not applicable to VC110/VC120/VC400.

- id: layout_near_set
  label: Set Local Video Layout
  kind: action
  command: 'layout near set <layoutmode> <idlist>'
  params:
    - name: layoutmode
      type: enum
      values: [equal, surround, fullscreen, share, pip, empspk]
    - name: idlist
      type: string
      description: callid, or pc | share | camera
  notes: Not applicable to VC110/VC120/VC400.

- id: layout_near_camera_layout_get
  label: Get Multi-Camera Layout
  kind: query
  command: 'layout near camera_layout_get'
  params: []
  notes: Not applicable to VC110/VC120/VC400.

- id: layout_near_camera_layout_set
  label: Set Multi-Camera Layout
  kind: action
  command: 'layout near camera_layout_set <layoutmode> <idlist>'
  params:
    - name: layoutmode
      type: enum
      values: [equal, surround, fullscreen]
    - name: idlist
      type: string
      description: camera id list (per camera near get_id_list)
  notes: Not applicable to VC110/VC120/VC400.

- id: mute_near
  label: Local Mute Get/On/Off/Toggle
  kind: action
  command: 'mute near <get|on|off|toggle>'
  params:
    - name: mode
      type: enum
      values: [get, "on", "off", toggle]

- id: preset_near_go
  label: Recall Camera Preset
  kind: action
  command: 'preset near go <0|1|2|3|4|5|6|7|8|9>'
  params:
    - name: preset
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

- id: preset_near_set
  label: Save Camera Preset
  kind: action
  command: 'preset near set <0|1|2|3|4|5|6|7|8|9>'
  params:
    - name: preset
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

- id: storage_get
  label: Get USB Storage Status
  kind: query
  command: 'storage get'
  params: []

- id: sysstatus_get
  label: Get System Status
  kind: query
  command: 'sysstatus get'
  params: []
  notes: Returns sleeping/idle/outgoing/ringing/talking/finished/talking max.

- id: volume_get
  label: Get Audio Volume
  kind: query
  command: 'volume get'
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: 'volume up'
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: 'volume down'
  params: []

- id: volume_set
  label: Set Audio Volume
  kind: action
  command: 'volume set {0..10}'
  params:
    - name: level
      type: integer
      description: '0..10'

- id: version
  label: Query Device Version
  kind: query
  command: 'version'
  params: []
  notes: Returns model, firmware, hardware, productId, cc_version.
```

## Feedbacks
```yaml
- id: incoming_call
  type: string
  description: Active feedback when an incoming call arrives.
  pattern: 'incoming "num:string" "name:string"'
- id: sysstatus
  type: enum
  values: [sleeping, idle, outgoing, ringing, talking, finished, "talking max"]
  description: Active feedback of system state; emitted on state change and as reply to sysstatus get.
- id: donotdisturb_global_status
  type: enum
  values: ["on", "off"]
  description: Active feedback when global DND state changes.
  pattern: 'donotdisturb global get <on|off>'
- id: donotdisturb_talk_status
  type: enum
  values: ["on", "off"]
  description: Active feedback when in-call DND state changes.
  pattern: 'donotdisturb talk get <on|off>'
- id: mute_near_status
  type: enum
  values: ["on", "off"]
  description: Active feedback when local mute state changes.
  pattern: 'mute near get <on|off>'
- id: storage_status
  type: enum
  values: [available, unavailable]
  description: Active feedback when USB storage availability changes.
  pattern: 'storage get <available|unavailable>'
- id: version_info
  type: string
  description: Active feedback sent on first LAN/serial connection establishment.
  pattern: 'version "model:..." "firmware:..." "hardware:..." "productId:..." "cc_version:..."'
```

## Events
```yaml
# Unsolicited notifications are documented inline under Feedbacks. The following
# commands produce active feedback independent of a query: incoming,
# donotdisturb global/talk status changes, mute near status changes, storage
# status changes, sysstatus state transitions, version (on connect).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlock procedures,
# or power-on sequencing requirements.
```

## Notes
- All commands are case sensitive, half-width, and end with `\r\n`.
- Some commands have model-specific behaviour: layout commands are not applicable to VC110/VC120/VC400; `button show` is VC110/VC120/VC400 only; `button back` is VC500/VC800/VC880 only; on VC110/VC120/VC400 the `*` digit starts recording and `#` captures screenshot, while on VC500/VC800/VC880 these digits have no special behaviour.
- Multiple `sysstatus` states may be reported in a single response (e.g. ongoing call plus incoming call); the system does not continuously emit status, only at state transitions and on H.323 audio↔video switch.
- `callinfo` rows include many per-stream fields (TotalBw, VRes, VCodec, VFr, VJr, Vtpl/Vtplp, A* audio equivalents, S* content-share fields). See source for the full field list.
- On the first LAN or serial configuration the device emits a one-shot `version` line.
- Error responses: `error: command has illegal parameters\r\n` and `error: command not found\r\n`.
- Document scope: this spec covers the VC110/VC120/VC400/VC500/VC800/VC880 line. Newer MVC/ZVC room-system kits (MVC S40/S50/S80/S90/S98, ZVC S90) are not explicitly documented in the refined source.

<!-- UNRESOLVED: firmware version compatibility, hardware revision compatibility, exact flow control setting for the serial transport, and authentication requirements (the source describes no login flow at all, so `none` is inferred). -->

## Provenance

```yaml
source_domains:
  - support-cdn.yealink.com
  - applicationmarket.crestron.com
  - voipinfo.net
  - support.yealink.com
source_urls:
  - https://support-cdn.yealink.com/attachment/upload/attachment/2019-12-19/5/ea3f2d1b-51d1-43db-86f8-ba1b1f133d04/API_Commands_Introduction_for_Yealink_Video_Conferencing_System_V1.08.pdf
  - "https://applicationmarket.crestron.com/content/Help/Yealink/Yealink%20VC%20Series%20RS232%20v1.0%20Help.pdf"
  - https://www.voipinfo.net/docs/yealink/API_Commands_Introduction_for_Yealink_Video_Conferencing_System_V1.06.pdf
  - https://support.yealink.com
retrieved_at: 2026-06-12T06:13:52.597Z
last_checked_at: 2026-06-12T20:02:36.962Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T20:02:36.962Z
matched_actions: 66
action_count: 66
confidence: medium
summary: "All 66 spec actions confirmed verbatim in source; transport (TCP 6024, baud 115200, 8N1) matches source exactly; feedbacks cover incoming/sysstatus/donotdisturb/mute/storage/version which are all documented in source. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source uses examples with firmware 30.20.254.12 and 50.20.251.31 across different VC models; the compatible firmware range is not stated."
- "flow control not stated in source"
- "source does not document safety warnings, interlock procedures,"
- "firmware version compatibility, hardware revision compatibility, exact flow control setting for the serial transport, and authentication requirements (the source describes no login flow at all, so `none` is inferred)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
