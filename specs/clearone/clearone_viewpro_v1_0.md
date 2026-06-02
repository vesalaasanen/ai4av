---
spec_id: admin/clearone-viewpro-v1-0
schema_version: ai4av-public-spec-v1
revision: 1
title: "ClearOne ViewPro v1.0 Control Spec"
manufacturer: ClearOne
model_family: "ViewPro v1.0"
aliases: []
compatible_with:
  manufacturers:
    - ClearOne
  models:
    - "ViewPro v1.0"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
source_urls:
  - "https://web.archive.org/web/20240626112103/https://www.clearone.com/sites/default/files/2019-07/StreamNet%20Integration%20and%20Programmers%20Guide.pdf"
  - "https://web.archive.org/web/20240627004859/https://www.clearone.com/sites/default/files/2019-07/VIEW%20VIRTUAL%20MATRIX%20Control%20and%20Installation%20Guide.pdf"
  - "https://web.archive.org/web/20240626092836/https://www.clearone.com/sites/default/files/2019-07/Using%201-Way%20RS232%20to%20Control%20Sources.pdf"
  - "https://web.archive.org/web/20240626060739/https://www.clearone.com/sites/default/files/2019-07/VIEW%20Pro%20Decoder%20Install%20%26%20User%20Manual.pdf"
  - https://web.archive.org/web/20240627011557/https://www.clearone.com/sites/default/files/2020-01/VIEW_Pro_Encoder_Installation_Manual.pdf
retrieved_at: 2026-06-02T22:05:25.224Z
last_checked_at: 2026-06-02T22:05:25.224Z
generated_at: 2026-06-02T22:05:25.224Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ViewPro v1.0 is not explicitly named in the source document; the document is a general StreamNet protocol guide. Specific ViewPro features beyond StreamNet standard commands are unknown."
  - "#MACRO command mentioned but no macro definitions or syntax documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing found in source"
  - "ViewPro v1.0 model not explicitly mentioned in source; document is general StreamNet protocol guide"
  - "No firmware version compatibility stated"
  - "#SET command mentioned but not documented"
  - "#MACRO command mentioned but no syntax or definitions provided"
  - "GPIO/LUA driver details mentioned but not documented"
  - "No error response format documented"
  - "Multicast address is configurable, not fixed"
  - "UDP subscription configuration requires StreamNet Dealer Setup Program"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:05:25.224Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions traced to source (dip-safe re-verify). (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# ClearOne ViewPro v1.0 Control Spec

## Summary

The ClearOne ViewPro v1.0 is controlled via the StreamNet ASCII protocol over TCP or UDP. The protocol uses a structured text message format with addressing, keywords, and XML-like report payloads. The source document (StreamNet Integration & Programmer's Guide, Part No. 800-000-017, Rev. 1.0) covers the general StreamNet protocol applicable to multiple ClearOne devices including the ViewPro.

<!-- UNRESOLVED: ViewPro v1.0 is not explicitly named in the source document; the document is a general StreamNet protocol guide. Specific ViewPro features beyond StreamNet standard commands are unknown. -->

## Transport

```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 15000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
traits:
  - powerable    # inferred: AMP ON/OFF, ACTIVE ON/OFF commands
  - levelable    # inferred: VOL, BASS, TREB, BALANCE, BAND_x level controls
  - routable     # inferred: SRC_SEL, TEMPSRC source routing commands
  - queryable    # inferred: QUERY RENDERER, QUERY CURRENT_SOURCE, QUERY SOURCE commands
```

## Actions

```yaml
actions:
  - id: active_on
    label: Activate Renderer
    kind: action
    command: "#ACTIVE ON"
    params: []
    description: Sets the Active Audio Renderer Service to ON

  - id: active_off
    label: Deactivate Renderer
    kind: action
    command: "#ACTIVE OFF"
    params: []
    description: Sets the Active Audio Renderer Service to OFF; stops audio output

  - id: amp_on
    label: Amplifier On
    kind: action
    command: "#AMP ON"
    params: []
    description: Turns the amplifier ON

  - id: amp_off
    label: Amplifier Off
    kind: action
    command: "#AMP OFF"
    params: []
    description: Turns the amplifier OFF; renderer remains active

  - id: mute_on
    label: Mute On
    kind: action
    command: "#MUTE ON"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "#MUTE OFF"
    params: []

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: "#MUTE TOGGLE"
    params: []

  - id: level_set_vol
    label: Set Volume
    kind: action
    command: "#LEVEL_SET VOL, {x}"
    params:
      - name: x
        type: integer
        min: 0
        max: 100
        description: Volume level (0=min, 100=max)

  - id: level_up_vol
    label: Volume Up
    kind: action
    command: "#LEVEL_UP VOL"
    params: []

  - id: level_dn_vol
    label: Volume Down
    kind: action
    command: "#LEVEL_DN VOL"
    params: []

  - id: level_set_bass
    label: Set Bass
    kind: action
    command: "#LEVEL_SET BASS, {x}"
    params:
      - name: x
        type: integer
        min: 0
        max: 100
        description: Bass level (50=nominal)

  - id: level_up_bass
    label: Bass Up
    kind: action
    command: "#LEVEL_UP BASS"
    params: []

  - id: level_dn_bass
    label: Bass Down
    kind: action
    command: "#LEVEL_DN BASS"
    params: []

  - id: level_set_treb
    label: Set Treble
    kind: action
    command: "#LEVEL_SET TREB, {x}"
    params:
      - name: x
        type: integer
        min: 0
        max: 100
        description: Treble level (50=nominal)

  - id: level_up_treb
    label: Treble Up
    kind: action
    command: "#LEVEL_UP TREB"
    params: []

  - id: level_dn_treb
    label: Treble Down
    kind: action
    command: "#LEVEL_DN TREB"
    params: []

  - id: level_set_balance
    label: Set Balance
    kind: action
    command: "#LEVEL_SET BALANCE, {x}"
    params:
      - name: x
        type: integer
        min: 0
        max: 100
        description: "Balance (0=full left, 50=center, 100=full right)"

  - id: level_up_balance
    label: Balance Right
    kind: action
    command: "#LEVEL_UP BALANCE"
    params: []

  - id: level_dn_balance
    label: Balance Left
    kind: action
    command: "#LEVEL_DN BALANCE"
    params: []

  - id: level_set_band
    label: Set EQ Band
    kind: action
    command: "#LEVEL_SET BAND_{x}, {y}"
    params:
      - name: x
        type: integer
        min: 1
        max: 5
        description: Band number (1-5)
      - name: y
        type: integer
        min: 0
        max: 100
        description: Band level (50=nominal)

  - id: level_up_band
    label: EQ Band Up
    kind: action
    command: "#LEVEL_UP BAND_{x}"
    params:
      - name: x
        type: integer
        min: 1
        max: 5
        description: Band number (1-5)

  - id: level_dn_band
    label: EQ Band Down
    kind: action
    command: "#LEVEL_DN BAND_{x}"
    params:
      - name: x
        type: integer
        min: 1
        max: 5
        description: Band number (1-5)

  - id: src_sel
    label: Select Source
    kind: action
    command: "#SRC_SEL {{{source_id}}}"
    params:
      - name: source_id
        type: string
        description: Source service name (case-sensitive, wrapped in double braces if contains spaces)

  - id: src_sel_next
    label: Select Next Source
    kind: action
    command: "#SRC_SEL NEXT"
    params: []

  - id: src_desel
    label: Deselect Source
    kind: action
    command: "#SRC_SEL \" \""
    params: []
    description: Deselects current audio source; no source rendered

  - id: tempsrc
    label: Temporary Source Select
    kind: action
    command: "#TEMPSRC {{{source_name}}}, {timeout}"
    params:
      - name: source_name
        type: string
        description: Source name to temporarily play
      - name: timeout
        type: integer
        required: false
        description: Timeout in seconds after which renderer returns to original source

  - id: tempsrc_off
    label: Cancel Temporary Source
    kind: action
    command: "#TEMPSRC OFF"
    params: []
    description: Unconditionally cancels any active TEMPSRC

  - id: tempsrc_cancel
    label: Cancel Named Temporary Source
    kind: action
    command: "#TEMPSRC {{{source_name}}}, OFF"
    params:
      - name: source_name
        type: string
        description: Name of the temp source to cancel; no effect if name does not match

  - id: multiaudio_join
    label: Join Multi-Zone Session
    kind: action
    command: "#MULTIAUDIO JOIN {{{session_name}}}"
    params:
      - name: session_name
        type: string
        description: Multi-zone session name (must not be an existing group name)

  - id: multiaudio_leave
    label: Leave Multi-Zone Session
    kind: action
    command: "#MULTIAUDIO LEAVE"
    params: []

  - id: menu_list
    label: List Menu Items
    kind: action
    command: "#MENU_LIST {m}, {n}, {{{path}}}"
    params:
      - name: m
        type: integer
        description: Starting item number
      - name: n
        type: integer
        description: Ending item number
      - name: path
        type: string
        description: Menu navigation path (e.g. "sources" or "media>Artists")

  - id: menu_sel
    label: Select Menu Item
    kind: action
    command: "#MENU_SEL {{{path}}}"
    params:
      - name: path
        type: string
        description: Navigation path formed by concatenating idpath and itemId with ">"

  - id: query_renderer
    label: Query Renderer State
    kind: action
    command: "#QUERY RENDERER"
    params: []

  - id: query_current_source
    label: Query Current Source
    kind: action
    command: "#QUERY CURRENT_SOURCE"
    params: []

  - id: query_source
    label: Query Source Details
    kind: action
    command: "#QUERY SOURCE"
    params: []

  - id: register
    label: Register for Status
    kind: action
    command: "#REGISTER {{{service_name}}}"
    params:
      - name: service_name
        type: string
        description: Service to register for status updates; must be renewed every 30 seconds
    description: TCP only; registers to receive unsolicited #REPORT messages for a service

  - id: heartbeat
    label: Heartbeat / Keepalive
    kind: action
    command: "#HEARTBEAT"
    params: []
    description: Dummy command to keep TCP connection alive; send every 30 seconds

  - id: sleep
    label: Sleep
    kind: action
    command: "#SLEEP"
    params: []
    description: Sets the renderer service to sleep state

  - id: intercom_create
    label: Create Intercom Session
    kind: action
    command: "#INTERCOM CREATE, {{{id}}}, {{{audience}}}"
    params:
      - name: id
        type: string
        description: Session name
      - name: audience
        type: string
        description: Service, room, or group to participate

  - id: intercom_ptt
    label: Intercom Push-to-Talk
    kind: action
    command: "#INTERCOM PTT"
    params: []
    description: Turns on microphone for 300ms; must repeat every 100ms to keep on

  - id: intercom_ptt_off
    label: Intercom PTT Off
    kind: action
    command: "#INTERCOM PTT OFF"
    params: []

  - id: intercom_leave
    label: Leave Intercom Session
    kind: action
    command: "#INTERCOM LEAVE, {tag_number}"
    params:
      - name: tag_number
        type: integer
        required: false
        description: Unique session ID; if omitted all sessions are dropped

  - id: intercom_monitor
    label: Start Room Monitor
    kind: action
    command: "#INTERCOM MONITOR, {{{room_name}}}, {{{audience}}}"
    params:
      - name: room_name
        type: string
        description: Room to monitor
      - name: audience
        type: string
        description: Service, room, or group that will monitor
  - id: intercom_leave_monitor
    label: Leave Intercom Monitor Session
    kind: action
    command: "#INTERCOM LEAVE, MONITOR"
    params: []
    description: Terminates any active room monitoring intercom session in the addressed room

  - id: intercom_leave_entry
    label: Leave Intercom Entry Session
    kind: action
    command: "#INTERCOM LEAVE, ENTRY"
    params: []
    description: Forces an intercom room out of a Door/Entry session
```

## Feedbacks

```yaml
feedbacks:
  - id: renderer_state
    type: report
    trigger: "#QUERY RENDERER response or unsolicited"
    payload:
      vol: integer
      balance: integer
      bass: integer
      treb: integer
      loud: integer
      mute: integer
      audioSession: string
      audioSessionActive: integer
      ampOn: integer

  - id: current_source
    type: report
    trigger: "#QUERY CURRENT_SOURCE response or unsolicited"
    payload:
      currentSource: string
      currentSourceIP: string
      permId: string

  - id: source_detail
    type: report
    trigger: "#QUERY SOURCE response or unsolicited"
    payload:
      song: string
      album: string
      artist: string
      genre: string
      time: string
      percent: string
      active: string
      controlState: string
      shuffle: string

  - id: intercom_state
    type: report
    trigger: unsolicited
    payload:
      sessions: integer
      active: integer
      recentSessionID: string
      recentSessionTag: string
      icVol: integer
      privacy: integer
      DND: integer
      kind: string
      monitor: integer
      entry: integer
      initiator: string

  - id: menu_response
    type: report
    trigger: "#MENU_LIST response"
    payload:
      id: string
      display: string
      children: integer
      itemnum: integer
      idpath: string
      disppath: string
    description: One #MENU_RESP per item; itemnum negative means end of list
```

## Variables

```yaml
variables:
  - id: volume
    type: integer
    min: 0
    max: 100
    unit: percent
    set_command: "#LEVEL_SET VOL, {value}"

  - id: bass
    type: integer
    min: 0
    max: 100
    unit: percent
    set_command: "#LEVEL_SET BASS, {value}"

  - id: treble
    type: integer
    min: 0
    max: 100
    unit: percent
    set_command: "#LEVEL_SET TREB, {value}"

  - id: balance
    type: integer
    min: 0
    max: 100
    unit: percent
    set_command: "#LEVEL_SET BALANCE, {value}"

  - id: eq_band
    type: integer
    min: 0
    max: 100
    unit: percent
    set_command: "#LEVEL_SET BAND_{band}, {value}"
    params:
      - name: band
        type: integer
        min: 1
        max: 5
```

## Events

```yaml
events:
  - id: unsolicited_report
    description: >
      Unsolicited #REPORT messages sent on state change or periodically via UDP multicast,
      TCP registration, or UDP subscription. Payload is XML-like label/value pairs wrapped
      in double braces {{<report ... />}}.
```

## Macros

```yaml
# UNRESOLVED: #MACRO command mentioned but no macro definitions or syntax documented in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing found in source
```

## Notes

- **Message syntax:** `#@toAddress:fromAddress%modifier#keyword arg1, arg2, ... argN /0` — all messages begin with `#` and terminate with a `0x00` null byte. Max length 1000 characters.
- **Addressing:** Messages are addressed by service name, not IP address. The StreamNet system routes messages to the correct device. Special subnodes: `~CURSRC`, `~IRMOD`, `~SERIAL_X`, `~KEYPAD`, `~ROOT`, `~STATUS`, `~SUBSCRIBER`.
- **TCP keepalive:** TCP connections close after 60 seconds of inactivity. Send `#HEARTBEAT` or `#REGISTER` every 30 seconds to maintain the connection.
- **TCP connection limit:** Maximum 4 TCP clients per StreamNet device.
- **TCP routing:** When sending via TCP, omit the `:fromAddress`; the system adds it automatically as `rootServiceName~TCPn.n.n.n_pppp`.
- **UDP responses:** For UDP, include a `:fromAddress` with subnode `~UDP<ip>_<port>` so the system knows where to send responses.
- **Registration:** `#REGISTER` expires after 30 seconds; must be repeated to continue receiving status.
- **Report parsing:** `#REPORT` payloads look like XML but are flat (no nested tags). Attribute order may vary; attributes may be added or omitted. Parse by attribute name, not position. Data may be split across multiple `#REPORT` messages.
- **Escape sequences:** Special characters in reports use HTML-style `&#nnnn;` format.
- **Source selection:** Source names are case-sensitive and must be wrapped in `{{double braces}}` if they contain spaces or special characters.
- **Discovery port:** 8000 (separate from control port 15000). Time sync port: 5001.

<!-- UNRESOLVED: ViewPro v1.0 model not explicitly mentioned in source; document is general StreamNet protocol guide -->
<!-- UNRESOLVED: No firmware version compatibility stated -->
<!-- UNRESOLVED: #SET command mentioned but not documented -->
<!-- UNRESOLVED: #MACRO command mentioned but no syntax or definitions provided -->
<!-- UNRESOLVED: GPIO/LUA driver details mentioned but not documented -->
<!-- UNRESOLVED: No error response format documented -->
<!-- UNRESOLVED: Multicast address is configurable, not fixed -->
<!-- UNRESOLVED: UDP subscription configuration requires StreamNet Dealer Setup Program -->

## Provenance

```yaml
source_domains:
  - web.archive.org
source_urls:
  - "https://web.archive.org/web/20240626112103/https://www.clearone.com/sites/default/files/2019-07/StreamNet%20Integration%20and%20Programmers%20Guide.pdf"
  - "https://web.archive.org/web/20240627004859/https://www.clearone.com/sites/default/files/2019-07/VIEW%20VIRTUAL%20MATRIX%20Control%20and%20Installation%20Guide.pdf"
  - "https://web.archive.org/web/20240626092836/https://www.clearone.com/sites/default/files/2019-07/Using%201-Way%20RS232%20to%20Control%20Sources.pdf"
  - "https://web.archive.org/web/20240626060739/https://www.clearone.com/sites/default/files/2019-07/VIEW%20Pro%20Decoder%20Install%20%26%20User%20Manual.pdf"
  - https://web.archive.org/web/20240627011557/https://www.clearone.com/sites/default/files/2020-01/VIEW_Pro_Encoder_Installation_Manual.pdf
retrieved_at: 2026-06-02T22:05:25.224Z
last_checked_at: 2026-06-02T22:05:25.224Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:05:25.224Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions traced to source (dip-safe re-verify). (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ViewPro v1.0 is not explicitly named in the source document; the document is a general StreamNet protocol guide. Specific ViewPro features beyond StreamNet standard commands are unknown."
- "#MACRO command mentioned but no macro definitions or syntax documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing found in source"
- "ViewPro v1.0 model not explicitly mentioned in source; document is general StreamNet protocol guide"
- "No firmware version compatibility stated"
- "#SET command mentioned but not documented"
- "#MACRO command mentioned but no syntax or definitions provided"
- "GPIO/LUA driver details mentioned but not documented"
- "No error response format documented"
- "Multicast address is configurable, not fixed"
- "UDP subscription configuration requires StreamNet Dealer Setup Program"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
