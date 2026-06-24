---
spec_id: admin/marantz-is201
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz IS201 Control Spec"
manufacturer: Marantz
model_family: IS201
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - IS201
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
  - retronik.fr
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://www.retronik.fr/DOCUMENTS/Audiovideo/Marantz/Marantz-IS-201-RS-232C-Control-Specification.pdf
retrieved_at: 2026-06-23T06:58:52.848Z
last_checked_at: 2026-06-23T07:02:26.048Z
generated_at: 2026-06-23T07:02:26.048Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Voltage/power specs and iPod-side protocol not in scope of this document."
  - "no explicit multi-step sequences defined in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source."
  - "Layer 3 and Layer 4 status items referenced but not enumerated in this document (\"will be defined other specific document\")."
  - "full status-list / command-list appendices referenced in §4 but not included in this 11-page excerpt."
  - "voltage / power / current specs not in scope of this protocol document."
verification:
  verdict: verified
  checked_at: 2026-06-23T07:02:26.048Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions verified against source table; transport parameters (9600 baud, 8N1, D-SUB 9pin, no handshaking) confirmed verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Marantz IS201 Control Spec

## Summary
The Marantz IS201 is an iPod dock accessory that a host controller can drive as an RS-232C slave over a D-SUB 9-pin serial cable. This spec covers the `@`-prefixed ASCII command/status-request protocol (document version 1.0, dated 2006/08/30): power, mute, transport, menu navigation, play-mode, sort/contents queries, and configurable auto-status feedback layers.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Voltage/power specs and iPod-side protocol not in scope of this document. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: "Handshaking : None"
  connector: "D-SUB 9pin male (product side); use straight RS232C cable with D-SUB 9pin female"
  pinout:
    2: TxD (output)
    3: RxD (input)
    5: GND
    1: N.C.
    4: N.C.
    6: N.C.
    7: N.C.
    8: N.C.
    9: N.C.
auth:
  type: none  # inferred: no auth procedure in source
framing:
  start_character: "@"
  end_character: "0x0D (CR)"
  command_format: "@\"xxx:\"+\"...\"<CR>"
  status_request_format: "@\"xxx:?\"+\"...\"<CR>"
  ack: "@ 0x06 <CR>"
  nak: "@ 0x15 <CR>"
  status_answer_format: "@\"xxx:\"+\"...\"<CR>"
  reply_timeout_ms: 500  # source: answer must finish within 500ms
  line_feed_note: "0x0A may be appended to replies; treat following bytes as same object"
```

## Traits
```yaml
traits:
  - powerable   # inferred: PWR on/off/toggle commands present
  - queryable   # inferred: status request commands (xxx?) return values
```

## Actions
```yaml
# All command strings are sent verbatim as shown, terminated by CR (0x0D).
# Per source §3-2: commands use form "@xxx:<value><CR>"; status requests use
# "@xxx?<CR>" (note: source table shows request forms without colon, e.g.
# "@PWR?"); toggle forms shown as "@xxx2" without colon (e.g. "@PWR2").

# --- POWER (Layer 1) ---
- id: power_set
  label: Power Set (On/Off)
  kind: action
  command: "@PWR:{value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0 = OFF, 1 = ON"
  notes: "Discrete on/off (source mandates discrete, not toggle-only). Reply: @PWR:1 or @PWR:2."

- id: power_toggle
  label: Power Toggle (same as RC)
  kind: action
  command: "@PWR2"
  params: []
  notes: "Toggle per remote controller. Note: no colon in payload."

- id: power_status_request
  label: Power Status Request
  kind: query
  command: "@PWR?"
  params: []
  notes: "Reply: @PWR:1 (ON) or @PWR:2 (OFF)."

# --- AUDIO MUTE (Layer 1) ---
- id: audio_mute_set
  label: Audio Mute Set (On/Off)
  kind: action
  command: "@AMT:{value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0 = OFF, 1 = ON"
  notes: "Reply: @AMT:1 or @AMT:2."

- id: audio_mute_toggle
  label: Audio Mute Toggle (same as RC)
  kind: action
  command: "@AMT2"
  params: []

- id: audio_mute_status_request
  label: Audio Mute Status Request
  kind: query
  command: "@AMT?"
  params: []
  notes: "Reply: @AMT:1 or @AMT:2."

# --- PLAY MODE (Layer 1) ---
- id: play_mode_set
  label: Play Mode Set (Stop/Pause/Play)
  kind: action
  command: "@PMD:{value}"
  params:
    - name: value
      type: integer
      enum: [1, 2, 3]
      description: "1 = STOP, 2 = PAUSE, 3 = PLAY"
  notes: "Reply: @PMD:<value> or NAK if invalid state."

- id: play_mode_status_request
  label: Play Mode Status Request
  kind: query
  command: "@PMD:?"
  params: []
  notes: "Reply: @PMD:1 or @PMD:2 or @PMD:3. OSD mode only."

# --- GO TO TRACK ---
- id: goto_track
  label: Go To Track (Next/Prev)
  kind: action
  command: "@GOT:{value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0 = NEXT, 1 = PREV"
  notes: "Reply: @ACK."

# --- MENU ---
- id: menu
  label: Menu / Return
  kind: action
  command: "@MNU:0"
  params: []
  notes: "Reply: @ACK."

# --- CURSOR ---
- id: cursor
  label: Cursor (Up/Down)
  kind: action
  command: "@CUR:{value}"
  params:
    - name: value
      type: integer
      enum: [1, 2]
      description: "1 = UP, 2 = DOWN (max 18 digits text)"
  notes: "Reply: @CUR:<text data on cursor>."

# --- ENTER ---
- id: enter
  label: Enter / OK
  kind: action
  command: "@ENT:0"
  params: []
  notes: "Reply: @ACK."

# --- RANDOM / SHUFFLE MODE (Layer 1) ---
- id: random_mode_set
  label: Random (Shuffle) Mode Set
  kind: action
  command: "@RDM:{value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 4]
      description: "0 = Shuffle OFF, 1 = select shuffle play mode (RC toggle), 2 = Shuffle SONG, 4 = Shuffle ALBUM"
  notes: "Reply: @RDM:1..@RDM:4. Values 1/2/4 = 'Not available' in LCD mode."

- id: random_mode_status_request
  label: Random Mode Status Request
  kind: query
  command: "@RDM:?"
  params: []
  notes: "Reply: @RDM:1..@RDM:4. OSD mode only."

# --- REPEAT MODE (Layer 1) ---
- id: repeat_mode_set
  label: Repeat Mode Set
  kind: action
  command: "@REP:{value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 4]
      description: "0 = Repeat OFF, 1 = select repeat play mode (RC toggle), 2 = Repeat TRACK, 4 = Repeat ALL"
  notes: "Reply: @REP:1..@REP:4."

- id: repeat_mode_status_request
  label: Repeat Mode Status Request
  kind: query
  command: "@REP:?"
  params: []
  notes: "Reply: @REP:1..@REP:4. OSD mode only."

# --- DISPLAY MODE ---
- id: display_mode_set
  label: Display Mode Set
  kind: action
  command: "@MOD:{value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]
      description: "0 = TOGGLE (same as RC), 1 = OSD mode, 2 = LCD mode"
  notes: "Reply: @MOD:1 or @MOD:2."

- id: display_mode_status_request
  label: Display Mode Status Request
  kind: query
  command: "@MOD:?"
  params: []
  notes: "Reply: @MOD:1 or @MOD:2."

# --- PLAY LIST (LCD mode only) ---
- id: playlist_navigate
  label: Play List Navigate (Up/Down)
  kind: action
  command: "@PLL:{value}"
  params:
    - name: value
      type: integer
      enum: [1, 2]
      description: "1 = UP, 2 = DOWN"
  notes: "LCD mode only. Reply: @ACK. Not available in OSD mode."

# --- ALBUM LIST (LCD mode only) ---
- id: albumlist_navigate
  label: Album List Navigate (Up/Down)
  kind: action
  command: "@ABL:{value}"
  params:
    - name: value
      type: integer
      enum: [1, 2]
      description: "1 = UP, 2 = DOWN"
  notes: "LCD mode only. Reply: @ACK. Not available in OSD mode."

# --- SORT ORDER (OSD mode only) ---
- id: sort_order_set
  label: Sort Order Set
  kind: action
  command: "@SOS:{value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 5, 7, 8]
      description: "0 = Main menu, 1 = Sort PLAY LIST, 2 = Sort ARTIST, 3 = Sort ALBUM, 5 = Sort SONG (Track), 7 = Sort AudioBook, 8 = Sort PODCAST"
  notes: "OSD mode only. Reply: @SOS:<value>."

- id: sort_order_status_request
  label: Sort Order Status Request
  kind: query
  command: "@SOS:?"
  params: []
  notes: "Reply: @SOS:0..@SOS:8. OSD mode only."

# --- TRACK # (Layer 2) ---
- id: track_number_request
  label: Track Number Request
  kind: query
  command: "@IND:?"
  params: []
  notes: "Reply: @IND:<xxxxxxxxxx> (number of playing track, max 10 digits). OSD mode only."

# --- DATABASE # (Layer 2) ---
- id: database_number_request
  label: Database Number Request
  kind: query
  command: "@NDB:?"
  params: []
  notes: "Reply: @NDB:<xxxxxxxxx> (number of database, max 10 digits). OSD mode only."

# --- SONG TITLE (Layer 2) ---
- id: song_title_request
  label: Song Title Request
  kind: query
  command: "@SON:?"
  params: []
  notes: "Reply: @SON:<text> (max 18 digits; differs from OSD digit limit). OSD mode only."

# --- ARTIST NAME (Layer 2) ---
- id: artist_name_request
  label: Artist Name Request
  kind: query
  command: "@ARN:?"
  params: []
  notes: "Reply: @ARN:<text> (max 18 digits). OSD mode only."

# --- ALBUM NAME (Layer 2) ---
- id: album_name_request
  label: Album Name Request
  kind: query
  command: "@ALN:?"
  params: []
  notes: "Reply: @ALN:<text> (max 18 digits). OSD mode only."

# --- CONTENTS DATA (Layer 2) ---
- id: contents_menu_title_request
  label: Contents Data - Menu Title Request
  kind: query
  command: "@CD1:"
  params: []
  notes: "Reply: @CD1:<text> (max 18 digits). Text of selected menu title. OSD mode only."

- id: contents_list_title_request
  label: Contents Data - List Title Request
  kind: query
  command: "@CD2:"
  params: []
  notes: "Reply: @CD2:<text> (max 18 digits). Text of selected list title. OSD mode only."

- id: contents_selected_count_request
  label: Contents Data - Selected Contents Count Request
  kind: query
  command: "@CD3:"
  params: []
  notes: "Reply: @CD3:<text> (max 10 digits). Number of selected contents. OSD mode only."

- id: contents_database_count_request
  label: Contents Data - Database Contents Count Request
  kind: query
  command: "@CD4:"
  params: []
  notes: "Reply: @CD4:<text> (max 10 digits). Number of database contents. OSD mode only."

- id: contents_all_request
  label: Contents Data - All Request
  kind: query
  command: "@CDR?"
  params: []
  notes: "Reply: @CD1:<text> @CD2:<text> @CD3:<text> @CD4:<text> (sends CD1/CD2/CD3/CD4 together). OSD mode only."

# --- AST: Auto Status Feedback Control ---
- id: auto_status_feedback_set
  label: Auto Status Feedback Layer Set
  kind: action
  command: "@AST:{value}"
  params:
    - name: value
      type: string
      enum: ["0", "1", "2", "3", "F"]
      description: "0 = disable all status feedback (default), 1 = enable Layer 1 only, 2 = enable Layer 2 only, 3 = enable Layer 1 & 2, F = enable all layers"
  notes: "Reply: @AST:<value>. Default '0' = all disabled. Controls unsolicited feedback (see Events)."
```

## Feedbacks
```yaml
# Reply messages sent by IS201 (Slave -> Host). All terminated by CR (0x0D);
# 0x0A may be appended (treat following bytes as same object).
- id: ack
  type: enum
  values: ["@<0x06>"]
  description: "ACK reply (@ 06h CR). Sent when command accepted and no related status to return."

- id: nak
  type: enum
  values: ["@<0x15>"]
  description: "NAK reply (@ 15h CR). Sent on incorrect command, status request, or other data."

- id: power_status_answer
  type: enum
  values: ["@PWR:1", "@PWR:2"]
  description: "Reply to @PWR? / @PWR commands. :1=ON, :2=OFF."

- id: audio_mute_status_answer
  type: enum
  values: ["@AMT:1", "@AMT:2"]
  description: "Reply to @AMT? / @AMT commands. :1=ON, :2=OFF."

- id: play_mode_status_answer
  type: enum
  values: ["@PMD:1", "@PMD:2", "@PMD:3"]
  description: "Reply to @PMD? / @PMD commands. :1=STOP, :2=PAUSE, :3=PLAY."

- id: random_mode_status_answer
  type: enum
  values: ["@RDM:1", "@RDM:2", "@RDM:4"]
  description: "Reply to @RDM? / @RDM commands. Range 1..4."

- id: repeat_mode_status_answer
  type: enum
  values: ["@REP:1", "@REP:2", "@REP:4"]
  description: "Reply to @REP? / @REP commands. Range 1..4."

- id: display_mode_status_answer
  type: enum
  values: ["@MOD:1", "@MOD:2"]
  description: "Reply to @MOD? / @MOD commands. :1=OSD, :2=LCD."

- id: sort_order_status_answer
  type: enum
  values: ["@SOS:0", "@SOS:1", "@SOS:2", "@SOS:3", "@SOS:5", "@SOS:7", "@SOS:8"]
  description: "Reply to @SOS? / @SOS commands. Range 0..8."

- id: track_number_answer
  type: string
  max_digits: 10
  description: "Reply to @IND?. @IND:<xxxxxxxxxx> number of playing track."

- id: database_number_answer
  type: string
  max_digits: 10
  description: "Reply to @NDB?. @NDB:<xxxxxxxxx> number of database."

- id: song_title_answer
  type: string
  max_digits: 18
  description: "Reply to @SON?. @SON:<text> song title."

- id: artist_name_answer
  type: string
  max_digits: 18
  description: "Reply to @ARN?. @ARN:<text> artist name."

- id: album_name_answer
  type: string
  max_digits: 18
  description: "Reply to @ALN?. @ALN:<text> album name."

- id: contents_cd1_answer
  type: string
  max_digits: 18
  description: "Reply to @CD1:. Text of selected menu title."

- id: contents_cd2_answer
  type: string
  max_digits: 18
  description: "Reply to @CD2:. Text of selected list title."

- id: contents_cd3_answer
  type: string
  max_digits: 10
  description: "Reply to @CD3:. Number of selected contents."

- id: contents_cd4_answer
  type: string
  max_digits: 10
  description: "Reply to @CD4:. Number of database contents."

- id: ast_status_answer
  type: enum
  values: ["@AST:0", "@AST:1", "@AST:2", "@AST:3", "@AST:F"]
  description: "Reply to @AST commands. Echoes current layer-enable setting."
```

## Variables
```yaml
# Discrete settable state exposed by actions; no continuous variables beyond
# those parameterized actions. Display mode (OSD vs LCD) gates command
# availability (see Notes).
- id: auto_status_feedback_layer
  type: enum
  values: ["0", "1", "2", "3", "F"]
  default: "0"
  description: "Auto-status-feedback enable mask (0=none,1=L1,2=L2,3=L1+2,F=all)."
```

## Events
```yaml
# Unsolicited messages the IS201 pushes to Host when status changes
# (only when AST layer for that status is enabled). All framed "@xxx:<value><CR>".
- id: auto_status_feedback
  description: "Auto status feedback. Sent on status change if the relevant Layer (1/2/3/4) is enabled via @AST. Layers: 1 = most useful (power/mute/play/random/repeat), 2 = track/db/title/artist/album/contents, 3 = less-needed, 4 = rarely-wished. All disabled by default."
  payload_format: "@xxx:<value><CR>"

- id: ipod_handshake_underway
  description: "@UHS: sent by IS201 only - under 1st handshaking with iPod."
  payload: "@UHS:"

- id: ipod_handshake_finished
  description: "@FHS: sent by IS201 only - finished 1st handshaking with iPod."
  payload: "@FHS:"

- id: ipot_not_connected
  description: "@NIP: sent by IS201 only - no iPod connected."
  payload: "@NIP:"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Population policy forbids inference here.
```

## Notes
- **Connector:** Product side is D-SUB 9-pin male. RS-232C cable must be straight-through with D-SUB 9-pin female on the product end (TxD↔RxD, RxD↔TxD, GND↔GND).
- **Serial config fixed:** 9600 bps, 8 data bits, no parity, 1 stop bit, no handshaking.
- **Timing:** Slave must return its answer (ACK / NAK / status answer) within 500ms of receiving a command or status request. Auto-status-feedback transaction must also complete under 500ms. Host must not send another command/request until it receives the prior answer or the wait period elapses.
- **Framing quirk:** Command form uses colon (`@PWR:0`, `@AMT:1`, `@PMD:3`), but RC-toggle and some status-request forms drop the colon (`@PWR2`, `@AMT2`, `@PWR?`, `@AMT?`). Payloads copied verbatim per source table.
- **Line feed:** 0x0A may be appended to replies; the recipient must treat subsequent bytes as part of the same object.
- **Display modes gate availability:** LCD mode exposes POWER, MUTE, PLAY MODE, GO TO TRACK, MENU, CURSOR, ENTER, RANDOM toggle (RDM:0), REPEAT toggle (REP:0), DISPLAY MODE, PLAY LIST, ALBUM LIST, and iPod-handshake events. OSD mode additionally exposes status requests (`?` forms), RDM/REP shuffle/repeat selection, SORT ORDER, TRACK #, DATABASE #, SONG/ARTIST/ALBUM titles, and CONTENTS DATA (CD1–CD4/CDR).
- **Discrete-only mandate:** Source §4 [MANDATORY] requires discrete ON/OFF commands mirroring the IR remote — toggle-only is not permitted. Do not rely on `*2` toggle forms where a discrete `:0`/`:1` exists.
- **AST default off:** Auto-status-feedback is disabled by default (`@AST:0`); Host must explicitly enable a layer to receive unsolicited status pushes.
- **Document revision:** Source is "RS-232C Control Specification Rev 00", document version 1.0, dated 2006/08/30, 11 pages, authored by Marantz America, Inc.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Layer 3 and Layer 4 status items referenced but not enumerated in this document ("will be defined other specific document"). -->
<!-- UNRESOLVED: full status-list / command-list appendices referenced in §4 but not included in this 11-page excerpt. -->
<!-- UNRESOLVED: voltage / power / current specs not in scope of this protocol document. -->
````

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
  - retronik.fr
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://www.retronik.fr/DOCUMENTS/Audiovideo/Marantz/Marantz-IS-201-RS-232C-Control-Specification.pdf
retrieved_at: 2026-06-23T06:58:52.848Z
last_checked_at: 2026-06-23T07:02:26.048Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T07:02:26.048Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions verified against source table; transport parameters (9600 baud, 8N1, D-SUB 9pin, no handshaking) confirmed verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Voltage/power specs and iPod-side protocol not in scope of this document."
- "no explicit multi-step sequences defined in source."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source."
- "Layer 3 and Layer 4 status items referenced but not enumerated in this document (\"will be defined other specific document\")."
- "full status-list / command-list appendices referenced in §4 but not included in this 11-page excerpt."
- "voltage / power / current specs not in scope of this protocol document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
