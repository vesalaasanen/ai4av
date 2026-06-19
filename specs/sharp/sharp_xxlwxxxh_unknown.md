---
spec_id: admin/sharp-xxlwxxxh
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp xxLWxxxH (PN-LW H series) Control Spec"
manufacturer: Sharp
model_family: PN-LC862
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - PN-LC862
    - PN-LC752
    - PN-LC652
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.aws.sharp.eu
  - business.sharpusa.com
  - assets.sharpnecdisplays.us
  - my.sharp-asia.com
  - sharp-displays.jp.sharp
source_urls:
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/PN-LC862_LC752_LC652_External_Control_N-Format_ver1-0.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-la862-la752-la652_n-format_command_manual_en_rev1.pdf
  - https://assets.sharpnecdisplays.us/documents/usermanuals/external_controls.pdf
  - https://my.sharp-asia.com/wp-content/uploads/2024/01/PN-LC862_LC752_LC652_External_Control_S-Format_ver1-1.pdf
  - https://sharp-displays.jp.sharp/dl/en/dp_manual/index.html
retrieved_at: 2026-06-16T19:41:57.237Z
last_checked_at: 2026-06-19T07:54:38.303Z
generated_at: 2026-06-19T07:54:38.303Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source manual covers PN-LC862/LC752/LC652 (direct predecessor). PN-LW H series (PN-LW861H/LW751H/LW651H/LW551H/LW501H/LW431H) not named in source; N-Format compatibility inferred from shared Sharp display family. No PN-LW H-specific manual located."
  - "flow control not stated in source"
  - "source documents no multi-step macro sequences. Sec 6 shows a typical Get->Set->confirm procedure"
  - "no hardware interlock / power-sequencing warnings beyond communication timing stated in source."
  - "(1) PN-LW H series not explicitly named in source — N-Format compatibility inferred from shared Sharp display family. (2) Flow control line not specified. (3) Firmware version compatibility not stated. (4) Whether all OP codes (esp. internal-PC START UP PC / FORCE QUIT, HDMI3 82h, HOME 87h, USB-C 89h) apply to every PN-LW H model variant unconfirmed. (5) No PN-LW H-specific protocol additions/removals documented."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:54:38.303Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "All 16 spec actions matched verbatim in source; full OP code table and special commands represented; all transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp xxLWxxxH (PN-LW H series) Control Spec

## Summary
Sharp Big Pad touch display (xxLWxxxH / PN-LW H series). External control via Sharp "N-Format" binary protocol over RS-232C (9600 8N1) and LAN (TCP, port 7142 fixed). Source document is the PN-LC862/LC752/LC652 N-Format command manual (Rev.1.0) used as the closest available protocol proxy; the PN-LW H series shares the same N-Format control family.

<!-- UNRESOLVED: source manual covers PN-LC862/LC752/LC652 (direct predecessor). PN-LW H series (PN-LW861H/LW751H/LW651H/LW551H/LW501H/LW431H) not named in source; N-Format compatibility inferred from shared Sharp display family. No PN-LW H-specific manual located. -->

## Transport
```yaml
# Uniform packet framing for ALL commands (applies to every action below):
#   Header: SOH(01h) '0'(30h,reserved) Destination(41h='A' for Monitor ID 1, or 2Ah='*' broadcast) Source(30h='0') MessageType(1 ASCII) MsgLength(2 ASCII hex chars)
#   Message: STX(02h) <body> ETX(03h)
#   Check code: BCC = XOR of all bytes from reserved(30h) through ETX(03h) inclusive, encoded as 2 ASCII hex chars
#   Delimiter: CR(0Dh)
# Monitor ID fixed = 1 on this device (Destination byte = 41h 'A'). Byte values in the message body are ASCII-encoded hex char pairs (e.g. byte 3Ah -> '3''A').
# MessageType codes: 'A'=Command, 'B'=Command reply, 'C'=Get parameter, 'D'=Get parameter reply, 'E'=Set parameter, 'F'=Set parameter reply.
# Timing (sec 3.3): controller MUST wait for reply before next command; after Power On/Off reply wait 15s, after Input Change reply wait 10s.
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # fixed, per sec 3.2 (5)
serial:
  baud_rate: 9600   # sec 3.1 (3)
  data_bits: 8      # sec 3.1 (4)
  parity: none      # sec 3.1 (5)
  stop_bits: 1      # sec 3.1 (6)
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
# - powerable    (power control + power status read present, sec 7)
# - queryable    (Get parameter + power status + serial/model name read present)
# - levelable    (audio speaker volume adjust present, op 00h/62h)
```

## Actions
```yaml
# command: field holds the message BODY (STX ... ETX) verbatim from source.
# Wrap each body with the uniform header/BCC/CR framing documented in Transport.
# Monitor ID = 'A' (ID 1, fixed). MsgLength: Get-param body=6 bytes -> '06'; Set-param body=10 bytes -> '0A'.

# --- Operation Code table (sec 6.2) ---

- id: input_source_get
  label: Input Source Get
  kind: query
  command: "STX '0' '0' '6' '0' ETX"   # OP code page 00h, OP code 60h (Get, type 'C', len 06)
  params: []

- id: input_source_set
  label: Input Source Set
  kind: action
  command: "STX '0' '0' '6' '0' {src} ETX"   # OP page 00h, OP 60h (Set, type 'E', len 0A); {src}=4 ASCII hex chars
  params:
    - name: src
      type: string
      description: "Input source value (16-bit, ASCII hex pairs). 00h=none, 01h=VGA, 05h=Video, 0Dh=OPTION, 0Fh=DisplayPort, 11h=HDMI1, 12h=HDMI2, 82h=HDMI3, 87h=HOME, 89h=USB-C (max 0089h)"

- id: audio_volume_get
  label: Audio Speaker Volume Get
  kind: query
  command: "STX '0' '0' '6' '2' ETX"   # OP page 00h, OP 62h (Get, type 'C', len 06)
  params: []

- id: audio_volume_set
  label: Audio Speaker Volume Set
  kind: action
  command: "STX '0' '0' '6' '2' {vol} ETX"   # OP page 00h, OP 62h (Set, type 'E', len 0A); {vol}=4 ASCII hex chars
  params:
    - name: vol
      type: integer
      description: "Volume 00h-64h (0-100), 4 ASCII hex chars (e.g. 0064 = max)"

- id: tv_audio_mute_set
  label: TV Audio Mute Set
  kind: action
  command: "STX '0' '0' '8' 'D' {mute} ETX"   # OP page 00h, OP 8Dh (Set, type 'E', len 0A); 00h=unmute(set only), 01h=mute, 02h=unmute, >02h=ignore
  params:
    - name: mute
      type: string
      description: "Mute value, 4 ASCII hex chars: 0001=mute, 0002=unmute (0000 set-only unmute also valid)"

- id: monitor_id_get
  label: Monitor ID Get
  kind: query
  command: "STX '0' '2' '3' 'E' ETX"   # OP page 02h, OP 3Eh (read only, value 1 fixed)
  params: []

- id: h_resolution_get
  label: Horizontal Resolution Get
  kind: query
  command: "STX '0' '2' '5' '0' ETX"   # OP page 02h, OP 50h (read only, signal-dependent)
  params: []

- id: v_resolution_get
  label: Vertical Resolution Get
  kind: query
  command: "STX '0' '2' '5' '1' ETX"   # OP page 02h, OP 51h (read only, signal-dependent)
  params: []

- id: aspect_get
  label: Aspect Ratio Get
  kind: query
  command: "STX '0' '2' '7' '0' ETX"   # OP page 02h, OP 70h (Get, type 'C', len 06)
  params: []

- id: aspect_set
  label: Aspect Ratio Set
  kind: action
  command: "STX '0' '2' '7' '0' {asp} ETX"   # OP page 02h, OP 70h (Set, type 'E', len 0A)
  params:
    - name: asp
      type: string
      description: "Aspect value, 4 ASCII hex chars: 0000=none, 0001=4:3, 0002=Wide, 0007=Dot by Dot"

- id: startup_pc_set
  label: Internal PC Power On (START UP PC)
  kind: action
  command: "STX '1' '0' 'C' '2' {val} ETX"   # OP page 10h, OP C2h (Set, type 'E', len 0A); 00h=no-op, 01h=execute
  params:
    - name: val
      type: string
      description: "0000=not operate, 0001=execute (4 ASCII hex chars)"

- id: force_quit_set
  label: Internal PC Force Off (FORCE QUIT)
  kind: action
  command: "STX '1' '0' 'C' '3' {val} ETX"   # OP page 10h, OP C3h (Set, type 'E', len 0A); 00h=no-op, 01h=execute
  params:
    - name: val
      type: string
      description: "0000=not operate, 0001=execute (4 ASCII hex chars)"

# --- Special commands (sec 7, 8) - full packets verbatim from source ---

- id: power_status_get
  label: Power Status Read
  kind: query
  command: "SOH-'0'-MonitorID-'0'-'A'-'0'-'6'-STX-'0'-'1'-'D'-'6'-ETX-BCC-CR"   # sec 7.1; MonitorID='A'(ID1); returns power mode 0001=on/0002=sleep/0004=off
  params: []

- id: power_control_set
  label: Power Control
  kind: action
  command: "SOH-'0'-MonitorID-'0'-'A'-'0'-'C'-STX-'C'-'2'-'0'-'3'-'D'-'6'-{mode}-ETX-BCC-CR"   # sec 7.2; MonitorID='A'; msglen 0C (12)
  params:
    - name: mode
      type: string
      description: "Power mode, 4 ASCII hex chars: 0001=Power on, 0004=Power off (0002/0003 do not set)"

- id: serial_no_read
  label: Serial Number Read
  kind: query
  command: "SOH-'0'-MonitorID-'0'-'A'-'0'-'6'-STX-'C'-'2'-'1'-'6'-ETX-BCC-CR"   # sec 8.1; reply cmd C316, data = ASCII-encoded serial (no null terminator)
  params: []

- id: model_name_read
  label: Model Name Read
  kind: query
  command: "SOH-'0'-MonitorID-'0'-'A'-'0'-'6'-STX-'C'-'2'-'1'-'7'-ETX-BCC-CR"   # sec 8.2; reply cmd C317, data = ASCII-encoded model name (no null terminator)
  params: []
```

## Feedbacks
```yaml
# Query responses are carried in Get/Set parameter reply bodies (sec 5.2, 5.4) and command replies (sec 7, 8).
# Result code (bytes 2-3 of reply body): '00'=No Error, '01'=Unsupported.
# Per sec 5.5, monitor returns a NULL message (SOH-'0'-'0'-'A'-'B'-'0'-'4'-STX-'B'-'E'-ETX-CHK-CR) when not ready or command unsupported.

- id: power_state
  type: enum
  values: [on, sleep, off]   # reply mode 0001=on, 0002=sleep, 0004=off (sec 7.1)

- id: input_source_state
  type: enum
  values: [none, vga, video, option, displayport, hdmi1, hdmi2, hdmi3, home, usb_c]   # op 00h/60h values

- id: mute_state
  type: enum
  values: [unmute, mute]   # op 00h/8Dh

- id: aspect_state
  type: enum
  values: [none, "4:3", wide, dot_by_dot]   # op 02h/70h

- id: volume_level
  type: integer
  values: [0, 100]   # op 00h/62h, 00h-64h

- id: result_code
  type: enum
  values: [no_error, unsupported]   # reply bytes 2-3: 00h/01h

- id: null_message
  type: enum
  values: [not_ready_or_unsupported]   # sec 5.5 NULL message
```

## Variables
```yaml
# All settable parameters are exposed as Actions above (input source, volume, mute, aspect, startup-pc, force-quit, power mode).
# Read-only state (monitor ID, H/V resolution) exposed as query Actions. No additional settable variables documented.
```

## Events
```yaml
# Source documents no unsolicited notifications. Monitor replies only to controller-initiated commands.
# NULL message (sec 5.5) is a solicited reply indicating not-ready / unsupported, not an unsolicited event.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences. Sec 6 shows a typical Get->Set->confirm procedure
# for input source change as an example flow, not a stored macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - timing: "After Power On/Off reply, controller must wait 15 seconds before next command (sec 3.3)."
  - timing: "After Input Change reply, controller must wait 10 seconds before next command (sec 3.3)."
  - monitor_setting: "Power Save Mode must be OFF, Monitor Control via Network ON, Command format = N-format (sec 2.3) for control to function."
# UNRESOLVED: no hardware interlock / power-sequencing warnings beyond communication timing stated in source.
```

## Notes
- Source = Sharp "External Control" N-Format manual Rev.1.0 for PN-LC862/LC752/LC652 (dated 2023-02-27). Used as protocol proxy for xxLWxxxH (PN-LW H Big Pad series); PN-LW H shares the Sharp N-Format control family but no PN-LW H-specific manual was located (see recovery notes).
- Monitor ID is fixed at 1 on PN-LC862/LC752/LC652; device accepts Destination byte 41h ('A', ID 1) or 2Ah ('*' broadcast) only.
- BCC (Block Check Code) = XOR of all packet bytes from the Reserved byte (30h) through ETX (03h) inclusive, rendered as 2 ASCII hex chars. Example in sec 4.3: body STX-'0'-'0'-'1'-'0'-'0'-'0'-'6'-'4'-ETX with header 30 41 30 45 30 41 yields BCC 77h.
- All numeric fields in message bodies are ASCII-encoded hex char pairs (e.g. byte 0Bh transmitted as ASCII '0','B' = 30h,42h). Max single write/read data length = 32 bytes (sec 7.2/8.1 notes).
- Serial-number and model-name reply payloads are double-encoded: ASCII-hex char pairs decode to hex byte values, which themselves are ASCII characters of the final string (sec 8.1/8.2 step examples).
- OP code 00h/8Dh (TV Audio Mute): value 00h is "unmute (Set only)"; 01h mute; 02h unmute; >02h ignored.
- Internal PC commands (10h/C2h START UP PC, 10h/C3h FORCE QUIT) imply an integrated PC option; presence on PN-LW H variants UNRESOLVED.

<!-- UNRESOLVED: (1) PN-LW H series not explicitly named in source — N-Format compatibility inferred from shared Sharp display family. (2) Flow control line not specified. (3) Firmware version compatibility not stated. (4) Whether all OP codes (esp. internal-PC START UP PC / FORCE QUIT, HDMI3 82h, HOME 87h, USB-C 89h) apply to every PN-LW H model variant unconfirmed. (5) No PN-LW H-specific protocol additions/removals documented. -->
````

## Provenance

```yaml
source_domains:
  - docs.aws.sharp.eu
  - business.sharpusa.com
  - assets.sharpnecdisplays.us
  - my.sharp-asia.com
  - sharp-displays.jp.sharp
source_urls:
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/PN-LC862_LC752_LC652_External_Control_N-Format_ver1-0.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-la862-la752-la652_n-format_command_manual_en_rev1.pdf
  - https://assets.sharpnecdisplays.us/documents/usermanuals/external_controls.pdf
  - https://my.sharp-asia.com/wp-content/uploads/2024/01/PN-LC862_LC752_LC652_External_Control_S-Format_ver1-1.pdf
  - https://sharp-displays.jp.sharp/dl/en/dp_manual/index.html
retrieved_at: 2026-06-16T19:41:57.237Z
last_checked_at: 2026-06-19T07:54:38.303Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:54:38.303Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "All 16 spec actions matched verbatim in source; full OP code table and special commands represented; all transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source manual covers PN-LC862/LC752/LC652 (direct predecessor). PN-LW H series (PN-LW861H/LW751H/LW651H/LW551H/LW501H/LW431H) not named in source; N-Format compatibility inferred from shared Sharp display family. No PN-LW H-specific manual located."
- "flow control not stated in source"
- "source documents no multi-step macro sequences. Sec 6 shows a typical Get->Set->confirm procedure"
- "no hardware interlock / power-sequencing warnings beyond communication timing stated in source."
- "(1) PN-LW H series not explicitly named in source — N-Format compatibility inferred from shared Sharp display family. (2) Flow control line not specified. (3) Firmware version compatibility not stated. (4) Whether all OP codes (esp. internal-PC START UP PC / FORCE QUIT, HDMI3 82h, HOME 87h, USB-C 89h) apply to every PN-LW H model variant unconfirmed. (5) No PN-LW H-specific protocol additions/removals documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
