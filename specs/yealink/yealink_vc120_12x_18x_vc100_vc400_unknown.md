---
spec_id: admin/yealink-vc120-12x-18x-vc100-vc400
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yealink VC120 / 12X / 18X / VC100 / VC400 Video Conferencing System Control Spec"
manufacturer: Yealink
model_family: VC120
aliases: []
compatible_with:
  manufacturers:
    - Yealink
  models:
    - VC120
    - VC120-12X
    - VC120-18X
    - VC100
    - VC400
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support-cdn.yealink.com
  - support.yealink.com
  - applicationmarket.crestron.com
source_urls:
  - https://support-cdn.yealink.com/attachment/upload/attachment/2019-12-19/5/ea3f2d1b-51d1-43db-86f8-ba1b1f133d04/API_Commands_Introduction_for_Yealink_Video_Conferencing_System_V1.08.pdf
  - https://support.yealink.com/document-detail/70abd1c7ae414a3b8097c1c3cfde39d2
  - https://support.yealink.com/document-detail/bacdb8a5fcee443791c74338649e796e
  - "https://applicationmarket.crestron.com/content/Help/Yealink/Yealink%20VC%20Series%20RS232%20v1.0%20Help.pdf"
  - https://support.yealink.com
retrieved_at: 2026-09-02T18:11:16.822Z
last_checked_at: 2026-09-22T11:50:59.518Z
generated_at: 2026-09-22T11:50:59.518Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility ranges per model not stated; some commands are flagged \"not applicable to VC110/VC120/VC400\" or differ between VC110/VC120/VC400 and VC500/VC800/VC880 in the source, but no version thresholds are given."
  - "flow control not stated in source"
  - "source does not define explicit multi-step macros. All sequences must be composed by the controller from the actions above."
  - "source contains no safety, interlock, or power-on sequencing requirements."
  - "firmware version compatibility range per model (only one firmware string \"30.20.254.12\" on a VC400 example, no range or threshold given). UNRESOLVED: serial flow control. UNRESOLVED: any safety warnings or interlocks — none stated."
verification:
  verdict: verified
  checked_at: 2026-09-22T11:50:59.518Z
  matched_actions: 75
  action_count: 75
  confidence: medium
  summary: "All 75 spec action units match literal command tokens in the source; transport (TCP 6024, 115200 8-N-1) confirmed; bidirectional coverage is 1:1. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Yealink VC120 / 12X / 18X / VC100 / VC400 Video Conferencing System Control Spec

## Summary
This spec covers the ASCII command-line control API for the Yealink VC-series video conferencing endpoints (VC120, VC120-12X, VC120-18X, VC100, VC400). The same command set is exposed over two transports: a LAN TCP socket on port **6024** and a serial (RS-232) link at **115200 baud / 8-N-1**. Every command and response ends with `\r\n` and is case-sensitive half-width ASCII. The command catalogue includes call control (dial, answer, hangup, mute, DND), camera control (PTZ, presets, multi-camera selection), content/input source selection, layout, address book/history, call-info queries, system status, and version queries.

<!-- UNRESOLVED: firmware compatibility ranges per model not stated; some commands are flagged "not applicable to VC110/VC120/VC400" or differ between VC110/VC120/VC400 and VC500/VC800/VC880 in the source, but no version thresholds are given. -->

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
# powerable: button power present
# queryable: many "get"/"?"-style queries (addrbook, history, callinfo, sysstatus, volume, version, etc.) present in source
# routable: inputsource camera / pc / share + sip/h323 dial paths present
# levelable: volume get/up/down/set 0..10 + camera near zoom_id + camera near setposition z present
powerable: true
queryable: true
routable: true
levelable: true
```

## Actions
```yaml
# Every distinct command documented in the source is enumerated below.

# --- answer ---
- id: answer_call
  label: Answer / Refuse Call
  kind: action
  command: "answer {yes|no}\r\n"
  params:
    - name: yes_no
      type: enum
      values: [yes, no]
      description: yes answers the call; no refuses it.

# --- addrbook ---
- id: addrbook_get_all
  label: Address Book - Get All Contacts
  kind: query
  command: "addrbook all\r\n"
  params: []
- id: addrbook_get_local_or_conf_all
  label: Address Book - Get All Local or Conference Contacts
  kind: query
  command: "addrbook {local|conf} get all\r\n"
  params:
    - name: scope
      type: enum
      values: [local, conf]
      description: local for local contacts; conf for conference contacts.
- id: addrbook_get_local_or_conf_count
  label: Address Book - Get N Local or Conference Contacts
  kind: query
  command: "addrbook {local|conf} get {n}\r\n"
  params:
    - name: scope
      type: enum
      values: [local, conf]
    - name: n
      type: integer
      description: Positive integer; number of contacts to return.
- id: addrbook_search
  label: Address Book - Search Contacts
  kind: query
  command: "addrbook search \"{searchstring}\"\r\n"
  params:
    - name: searchstring
      type: string
      description: Name fragment to search for, enclosed in quotes.

# --- button ---
- id: button_power
  label: Button - Power
  kind: action
  command: "button power\r\n"
  params: []
- id: button_f1
  label: Button - F1 (VC110/VC120/VC400: red; VC500/VC800/VC880: recording)
  kind: action
  command: "button F1\r\n"
  params: []
- id: button_f2
  label: Button - F2 (VC110/VC120/VC400: yellow; VC500/VC800/VC880: layout)
  kind: action
  command: "button F2\r\n"
  params: []
- id: button_f3
  label: Button - F3 (VC110/VC120/VC400: blue; VC500/VC800/VC880: custom)
  kind: action
  command: "button F3\r\n"
  params: []
- id: button_volume_up
  label: Button - Volume Up
  kind: action
  command: "button volume+\r\n"
  params: []
- id: button_volume_down
  label: Button - Volume Down
  kind: action
  command: "button volume-\r\n"
  params: []
- id: button_zoom_in
  label: Button - Zoom In
  kind: action
  command: "button zoom+\r\n"
  params: []
- id: button_zoom_out
  label: Button - Zoom Out
  kind: action
  command: "button zoom-\r\n"
  params: []
- id: button_arrow_up
  label: Button - Up Arrow
  kind: action
  command: "button up\r\n"
  params: []
- id: button_arrow_down
  label: Button - Down Arrow
  kind: action
  command: "button down\r\n"
  params: []
- id: button_arrow_right
  label: Button - Right Arrow
  kind: action
  command: "button right\r\n"
  params: []
- id: button_arrow_left
  label: Button - Left Arrow
  kind: action
  command: "button left\r\n"
  params: []
- id: button_select
  label: Button - OK / Select
  kind: action
  command: "button select\r\n"
  params: []
- id: button_mute
  label: Button - Mute
  kind: action
  command: "button mute\r\n"
  params: []
- id: button_home
  label: Button - Home
  kind: action
  command: "button home\r\n"
  params: []
- id: button_show
  label: Button - Show (video source; VC110/VC120/VC400 only)
  kind: action
  command: "button show\r\n"
  params: []
- id: button_back
  label: Button - Back (VC500/VC800/VC880 only)
  kind: action
  command: "button back\r\n"
  params: []
- id: button_call
  label: Button - Call (off-hook)
  kind: action
  command: "button call\r\n"
  params: []
- id: button_delete
  label: Button - Delete
  kind: action
  command: "button delete\r\n"
  params: []
- id: button_hangup
  label: Button - Hang Up (on-hook)
  kind: action
  command: "button hangup\r\n"
  params: []
- id: button_digit
  label: Button - Numeric / * / #
  kind: action
  command: "button {key}\r\n"
  params:
    - name: key
      type: enum
      values: ["0","1","2","3","4","5","6","7","8","9","*","#"]
      description: On VC110/VC120/VC400: * records video, # captures screenshot. On VC500/VC800/VC880: no special behavior.
- id: button_recordstart
  label: Button - Start Recording
  kind: action
  command: "button recordstart\r\n"
  params: []
- id: button_recordstop
  label: Button - Stop Recording
  kind: action
  command: "button recordstop\r\n"
  params: []
- id: button_screenshot
  label: Button - Screenshot
  kind: action
  command: "button screenshot\r\n"
  params: []

# --- camera ---
- id: camera_near_move
  label: Camera (near) - Continuous Move
  kind: action
  command: "camera near move {direction}\r\n"
  params:
    - name: direction
      type: enum
      values: [left, right, up, down, "zoom+", "zoom-", stop]
      description: Direction to start moving; stop halts motion.
- id: camera_near_getposition
  label: Camera (near) - Get PTZ Position
  kind: query
  command: "camera near getposition\r\n"
  params: []
- id: camera_near_setposition
  label: Camera (near) - Set PTZ Position
  kind: action
  command: "camera near setposition \"{x}\" \"{y}\" \"{z}\"\r\n"
  params:
    - name: x
      type: integer
      description: Pan, 0..1920.
    - name: y
      type: integer
      description: Tilt, 0..1080.
    - name: z
      type: integer
      description: Zoom, 0..100.
- id: camera_near_get_id_list
  label: Camera (near) - List Camera Ids
  kind: query
  command: "camera near get_id_list\r\n"
  params: []
- id: camera_near_get_id_detail
  label: Camera (near) - Get Camera Detail
  kind: query
  command: "camera near get_id_detial \"id:{id}\"\r\n"
  params:
    - name: id
      type: integer
      description: Camera id, 0..8.
- id: camera_near_set_active_status
  label: Camera (near) - Activate Camera
  kind: action
  command: "camera near set_active_status \"id:{id}\"\r\n"
  params:
    - name: id
      type: integer
      description: Camera id to activate, 0..8.
- id: camera_near_move_id
  label: Camera (near) - Continuous Move by Camera Id
  kind: action
  command: "camera near move_id \"id:{id}\" \"direct:{direct}\"\r\n"
  params:
    - name: id
      type: integer
    - name: direct
      type: enum
      values: [2, 4, 6, 8]
      description: 2=down, 4=up, 6=right, 8=left. Use `camera near move_id "id:{id}" stop` to stop.
- id: camera_near_move_id_stop
  label: Camera (near) - Stop Move by Camera Id
  kind: action
  command: "camera near move_id \"id:{id}\" stop\r\n"
  params:
    - name: id
      type: integer
- id: camera_near_zoom_id
  label: Camera (near) - Zoom by Camera Id
  kind: action
  command: "camera near zoom_id \"id:{id}\" \"direct:{direct}\"\r\n"
  params:
    - name: id
      type: integer
    - name: direct
      type: enum
      values: [0, 1]
      description: 0=zoom out, 1=zoom in. Use `camera near zoom_id "id:{id}" stop` to stop.
- id: camera_near_zoom_id_stop
  label: Camera (near) - Stop Zoom by Camera Id
  kind: action
  command: "camera near zoom_id \"id:{id}\" stop\r\n"
  params:
    - name: id
      type: integer

# --- callinfo ---
- id: callinfo_all
  label: Call Info - All Connections
  kind: query
  command: "callinfo all\r\n"
  params: []
- id: callinfo_by_callid
  label: Call Info - By Call ID
  kind: query
  command: "callinfo callid \"{callid}\"\r\n"
  params:
    - name: callid
      type: string
      description: Call ID string, enclosed in quotes.

# --- dial ---
- id: dial_auto
  label: Dial - Auto (single or multi-party)
  kind: action
  command: "dial auto \"{dialstring}\"\r\n"
  params:
    - name: dialstring
      type: string
      description: Phone number, or multiple space-separated quoted numbers for conference contact dialing.
- id: dial_manual
  label: Dial - Manual (type / protocol / speed / number)
  kind: action
  command: "dial manual {calltype} {protocol} \"{speed}\" \"{dialstring}\"\r\n"
  params:
    - name: calltype
      type: enum
      values: [video, audio, auto]
    - name: protocol
      type: enum
      values: [auto, sip, h323]
    - name: speed
      type: string
      description: Bandwidth in kb/s, or "Auto" (default).
    - name: dialstring
      type: string

# --- donotdisturb ---
- id: donotdisturb_global_get
  label: DND - Global Get
  kind: query
  command: "donotdisturb global get\r\n"
  params: []
- id: donotdisturb_global_on
  label: DND - Global On
  kind: action
  command: "donotdisturb global on\r\n"
  params: []
- id: donotdisturb_global_off
  label: DND - Global Off
  kind: action
  command: "donotdisturb global off\r\n"
  params: []
- id: donotdisturb_talk_get
  label: DND - In-Call Get
  kind: query
  command: "donotdisturb talk get\r\n"
  params: []
- id: donotdisturb_talk_on
  label: DND - In-Call On
  kind: action
  command: "donotdisturb talk on\r\n"
  params: []
- id: donotdisturb_talk_off
  label: DND - In-Call Off
  kind: action
  command: "donotdisturb talk off\r\n"
  params: []

# --- gendial ---
- id: gendial_dtmf
  label: Generate DTMF Tone
  kind: action
  command: "gendial {key}\r\n"
  params:
    - name: key
      type: enum
      values: ["0","1","2","3","4","5","6","7","8","9","#","*"]

# --- getcallid ---
- id: getcallid
  label: Get Call IDs
  kind: query
  command: "getcallid\r\n"
  params: []

# --- history ---
- id: history_all
  label: Call History - All
  kind: query
  command: "history all\r\n"
  params: []
- id: history_get_all
  label: Call History - Get All by Type
  kind: query
  command: "history {type} get all\r\n"
  params:
    - name: type
      type: enum
      values: [placed, received, misscalled]
- id: history_get_n
  label: Call History - Get N by Type
  kind: query
  command: "history {type} get {n}\r\n"
  params:
    - name: type
      type: enum
      values: [placed, received, misscalled]
    - name: n
      type: integer

# --- inputsource ---
- id: inputsource_camera
  label: Input Source - Camera
  kind: action
  command: "inputsource camera\r\n"
  params: []
- id: inputsource_pc
  label: Input Source - PC
  kind: action
  command: "inputsource pc\r\n"
  params: []
- id: inputsource_share
  label: Input Source - PC + Camera (in-call only)
  kind: action
  command: "inputsource share\r\n"
  params: []

# --- layout (queries/controls of local layout; source notes "not applicable to VC110/VC120/VC400") ---
- id: layout_near_get
  label: Layout - Get Local
  kind: query
  command: "layout near get\r\n"
  params: []
- id: layout_near_get_list
  label: Layout - Get Local List
  kind: query
  command: "layout near get list\r\n"
  params: []
- id: layout_near_set
  label: Layout - Set Local
  kind: action
  command: "layout near set {layoutmode} {idlist}\r\n"
  params:
    - name: layoutmode
      type: enum
      values: [equal, surround, fullscreen, share, pip, empspk]
      description: pip only valid on VC500/VC800/VC880.
    - name: idlist
      type: string
      description: Space-separated call IDs and/or pc / share / camera tokens.
- id: layout_near_camera_layout_get
  label: Layout - Get Multi-camera
  kind: query
  command: "layout near camera_layout_get\r\n"
  params: []
- id: layout_near_camera_layout_set
  label: Layout - Set Multi-camera
  kind: action
  command: "layout near camera_layout_set {layoutmode} {idlist}\r\n"
  params:
    - name: layoutmode
      type: enum
      values: [equal, surround, fullscreen]
    - name: idlist
      type: string
      description: Camera IDs from `camera near get_id_list`.

# --- mute ---
- id: mute_near_get
  label: Mute (near) - Get
  kind: query
  command: "mute near get\r\n"
  params: []
- id: mute_near_on
  label: Mute (near) - On
  kind: action
  command: "mute near on\r\n"
  params: []
- id: mute_near_off
  label: Mute (near) - Off
  kind: action
  command: "mute near off\r\n"
  params: []
- id: mute_near_toggle
  label: Mute (near) - Toggle
  kind: action
  command: "mute near toggle\r\n"
  params: []

# --- preset ---
- id: preset_near_go
  label: Camera Preset - Recall (Go)
  kind: action
  command: "preset near go {number}\r\n"
  params:
    - name: number
      type: enum
      values: ["0","1","2","3","4","5","6","7","8","9"]
- id: preset_near_set
  label: Camera Preset - Save (Set)
  kind: action
  command: "preset near set {number}\r\n"
  params:
    - name: number
      type: enum
      values: ["0","1","2","3","4","5","6","7","8","9"]

# --- storage ---
- id: storage_get
  label: Storage (USB) - Get
  kind: query
  command: "storage get\r\n"
  params: []

# --- sysstatus ---
- id: sysstatus_get
  label: System Status - Get
  kind: query
  command: "sysstatus get\r\n"
  params: []

# --- volume ---
- id: volume_get
  label: Volume - Get
  kind: query
  command: "volume get\r\n"
  params: []
- id: volume_up
  label: Volume - Up
  kind: action
  command: "volume up\r\n"
  params: []
- id: volume_down
  label: Volume - Down
  kind: action
  command: "volume down\r\n"
  params: []
- id: volume_set
  label: Volume - Set (0..10)
  kind: action
  command: "volume set {level}\r\n"
  params:
    - name: level
      type: integer
      description: 0..10 inclusive.

# --- version ---
- id: version_get
  label: Version - Get
  kind: query
  command: "version\r\n"
  params: []
```

## Feedbacks
```yaml
# Source documents unsolicited/feedback-style responses for several commands; the most useful are
# captured here. Per-command response formats (e.g. addrbook numid ..., history numid ..., volume get N,
# storage get available|unavailable, version "model:..." "firmware:..." ...) follow the action's natural
# return value and are not separately enumerated.
- id: donotdisturb_global_state
  description: DND global state (active feedback when status changes).
  trigger: donotdisturb
  payload_template: "donotdisturb global get {on|off}\r\n"
- id: donotdisturb_talk_state
  description: DND in-call state (active feedback when status changes).
  trigger: donotdisturb
  payload_template: "donotdisturb talk get {on|off}\r\n"
- id: mute_near_state
  description: Near-site mute state (active feedback when status changes).
  trigger: mute
  payload_template: "mute near get {on|off}\r\n"
- id: storage_state
  description: USB storage availability (active feedback when status changes).
  trigger: storage
  payload_template: "storage get {available|unavailable}\r\n"
- id: incoming_call
  description: Incoming call notification (pushed from device).
  trigger: incoming
  payload_template: "incoming \"num:{number}\" \"name:{name}\"\r\n"
- id: sysstatus_sleeping
  description: System status - sleeping.
  trigger: sysstatus
  payload_template: "sysstatus get sleeping\r\n"
- id: sysstatus_idle
  description: System status - idle.
  trigger: sysstatus
  payload_template: "sysstatus get idle\r\n"
- id: sysstatus_outgoing
  description: System status - placing a call.
  trigger: sysstatus
  payload_template: "sysstatus get outgoing \"diastr:{str}\" \"callid:{id}\" \"calltype:{type}\"\r\n"
- id: sysstatus_ringing
  description: System status - incoming call ringing.
  trigger: sysstatus
  payload_template: "sysstatus get ringing \"dialstr:{str}\" \"callid:{id}\" \"calltype:{type}\"\r\n"
- id: sysstatus_talking
  description: System status - established call.
  trigger: sysstatus
  payload_template: "sysstatus get talking \"dialstr:{str}\" \"callid:{id}\" \"calltype:{type}\" \"protocol:{proto}\" \"direction:{dir}\"\r\n"
- id: sysstatus_finished
  description: System status - call finished. Real-time (query returns nothing; only feedback).
  trigger: sysstatus
  payload_template: "sysstatus get finished \"dialstr:{str}\" \"callid:{id}\"\r\n"
- id: sysstatus_talking_max
  description: System status - max sessions reached.
  trigger: sysstatus
  payload_template: "sysstatus get talking max\r\n"
- id: version_info
  description: Version pushed on connect (first LAN+serial configuration) or after `version` query.
  trigger: version
  payload_template: "version \"model:{model}\" \"firmware:{fw}\" \"hardware:{hw}\" \"productId:{pid}\" \"cc_version:{cc}\"\r\n"
```

## Variables
```yaml
# Volume level is a continuous-set integer 0..10 echoed on queries.
- id: volume_level
  type: integer
  range: [0, 10]
  command_get: "volume get\r\n"
  response_token: "volume get {N}\r\n"
```

## Events
```yaml
# All unsolicited/feedback commands are listed in Feedbacks; no additional event channel documented.
```

## Macros
```yaml
# UNRESOLVED: source does not define explicit multi-step macros. All sequences must be composed by the controller from the actions above.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety, interlock, or power-on sequencing requirements.
```

## Notes
- **Line discipline:** every API command and every response terminates with `\r\n` (CRLF). Commands are case-sensitive and must use half-width characters.
- **Transports:** the source explicitly defines two transports — LAN TCP port **6024** and serial **115200 8-N-1**. No flow control is documented for the serial link.
- **Multi-transport broadcast:** for `storage`, `donotdisturb`, `mute`, `sysstatus` (status-change) and `version` (on first connect), the source notes that if both LAN and serial are configured, both receive the unsolicited feedback.
- **Model scope / divergences in source:**
  - The `button F1 / F2 / F3` mapping differs between VC110/VC120/VC400 and VC500/VC800/VC880.
  - `button F1` is "red / recording", `button F2` is "yellow / layout", `button F3` is "blue / custom".
  - `button show` is documented as **VC110/VC120/VC400 only**; `button back` is **VC500/VC800/VC880 only**.
  - On VC110/VC120/VC400, `button *` records video and `button #` captures screenshot; on VC500/VC800/VC880 neither key has a special behavior.
  - All `layout near` commands are documented as **"not applicable to VC110/VC120/VC400"**. The pip layout mode is **VC500/VC800/VC880 only**.
- **`camera near get_id_detial`** is spelled `detial` (sic) in the source, both in the sending format and the example — preserved verbatim here so a literal implementation matches the device.
- **`version` on connect:** sent automatically when a connection is established if it is the first time LAN/serial modes are configured; thereafter `version\r\n` returns current values.
- **`sysstatus get finished`** is only delivered as feedback — querying it via `sysstatus get\r\n` will not return it because the `finished` state is instantaneous.
- **Self-test:** H.323 calls also push a fresh `sysstatus get` when audio is switched to video mid-call.
- **Cross-checks:** `video` callinfo payloads may use either `RemoteStr` (observed in source examples) or `remotestr` (also in source examples). Either casing may be accepted; control systems should match both.

<!-- UNRESOLVED: firmware version compatibility range per model (only one firmware string "30.20.254.12" on a VC400 example, no range or threshold given). UNRESOLVED: serial flow control. UNRESOLVED: any safety warnings or interlocks — none stated. -->

## Provenance

```yaml
source_domains:
  - support-cdn.yealink.com
  - support.yealink.com
  - applicationmarket.crestron.com
source_urls:
  - https://support-cdn.yealink.com/attachment/upload/attachment/2019-12-19/5/ea3f2d1b-51d1-43db-86f8-ba1b1f133d04/API_Commands_Introduction_for_Yealink_Video_Conferencing_System_V1.08.pdf
  - https://support.yealink.com/document-detail/70abd1c7ae414a3b8097c1c3cfde39d2
  - https://support.yealink.com/document-detail/bacdb8a5fcee443791c74338649e796e
  - "https://applicationmarket.crestron.com/content/Help/Yealink/Yealink%20VC%20Series%20RS232%20v1.0%20Help.pdf"
  - https://support.yealink.com
retrieved_at: 2026-09-02T18:11:16.822Z
last_checked_at: 2026-09-22T11:50:59.518Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-22T11:50:59.518Z
matched_actions: 75
action_count: 75
confidence: medium
summary: "All 75 spec action units match literal command tokens in the source; transport (TCP 6024, 115200 8-N-1) confirmed; bidirectional coverage is 1:1. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility ranges per model not stated; some commands are flagged \"not applicable to VC110/VC120/VC400\" or differ between VC110/VC120/VC400 and VC500/VC800/VC880 in the source, but no version thresholds are given."
- "flow control not stated in source"
- "source does not define explicit multi-step macros. All sequences must be composed by the controller from the actions above."
- "source contains no safety, interlock, or power-on sequencing requirements."
- "firmware version compatibility range per model (only one firmware string \"30.20.254.12\" on a VC400 example, no range or threshold given). UNRESOLVED: serial flow control. UNRESOLVED: any safety warnings or interlocks — none stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
