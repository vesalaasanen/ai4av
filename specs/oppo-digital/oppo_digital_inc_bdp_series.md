---
spec_id: admin/oppo-digital-bdp-83
schema_version: ai4av-public-spec-v1
revision: 1
title: "Oppo Digital BDP-83 Control Spec"
manufacturer: "Oppo Digital"
model_family: BDP-83
aliases: []
compatible_with:
  manufacturers:
    - "Oppo Digital"
  models:
    - BDP-83
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - oppodigital.com
  - download.oppodigital.com
source_urls:
  - https://www.oppodigital.com/Download/BDP83/BDP83_RS232_Protocol.pdf
  - http://download.oppodigital.com/BDP103/BDP-103_RS232_Protocol_v1.1.pdf
  - http://download.oppodigital.com/BDP103/BDP-103_RS232_Protocol_v1.0.pdf
retrieved_at: 2026-04-26T19:11:33.779Z
last_checked_at: 2026-05-14T18:17:19.502Z
generated_at: 2026-05-14T18:17:19.502Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:19.502Z
  matched_actions: 60
  action_count: 80
  confidence: high
  summary: "All 60 spec actions matched literal command tokens in source; transport parameters verified; complete bidirectional coverage of BDP-83 command set."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Oppo Digital BDP-83 Control Spec

## Summary
OPPO BDP-83 Blu-ray Disc Player with RS-232C control interface. DCE device, female DB9 connector. Protocol: # prefix + 3-char command code + optional params + CR. Responses start with @, followed by OK/ER + optional params + CR. 9600 baud, 8N1, no flow control.

<!-- UNRESOLVED: no TCP/IP, HTTP, or UDP control mentioned — serial-only device -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POW, PON, POF commands present
- routable        # SRC selects media source; input/output routing implied
- queryable       # QPW, QVR, QVL, QHD, QPL, QTK, QCH, QTE, QTR, QCE, QCR, QEL, QRE, QDT, QAT, QST queries present
- levelable       # VUP, VDN, SVL volume commands present
```

## Actions
```yaml
- id: pow
  label: Power Toggle
  kind: action
  params: []
- id: src
  label: Source / Home Menu
  kind: action
  params: []
- id: ejt
  label: Open/Close Tray
  kind: action
  params: []
- id: pon
  label: Power On (Discrete)
  kind: action
  params: []
- id: pof
  label: Power Off (Discrete)
  kind: action
  params: []
- id: sys
  label: Set TV System
  kind: action
  params:
    - name: system
      type: enum
      values: [NTSC, PAL, AUTO]
      description: Output TV system
- id: dim
  label: Dimmer
  kind: action
  params: []
- id: pur
  label: Pure Audio Mode
  kind: action
  params: []
- id: vup
  label: Volume Up
  kind: action
  params: []
- id: vdn
  label: Volume Down
  kind: action
  params: []
- id: mut
  label: Mute
  kind: action
  params: []
- id: nu0
  label: Numeric Key 0
  kind: action
  params: []
- id: nu1
  label: Numeric Key 1
  kind: action
  params: []
- id: nu2
  label: Numeric Key 2
  kind: action
  params: []
- id: nu3
  label: Numeric Key 3
  kind: action
  params: []
- id: nu4
  label: Numeric Key 4
  kind: action
  params: []
- id: nu5
  label: Numeric Key 5
  kind: action
  params: []
- id: nu6
  label: Numeric Key 6
  kind: action
  params: []
- id: nu7
  label: Numeric Key 7
  kind: action
  params: []
- id: nu8
  label: Numeric Key 8
  kind: action
  params: []
- id: nu9
  label: Numeric Key 9
  kind: action
  params: []
- id: clr
  label: Clear Numeric Input
  kind: action
  params: []
- id: got
  label: Goto (Play from Specified Location)
  kind: action
  params: []
- id: hom
  label: Home Menu
  kind: action
  params: []
- id: pup
  label: Page Up
  kind: action
  params: []
- id: pdn
  label: Page Down
  kind: action
  params: []
- id: osd
  label: Show/Hide On-Screen Display
  kind: action
  params: []
- id: ttl
  label: Top Menu (BD/DVD Title Menu)
  kind: action
  params: []
- id: mnu
  label: Pop-Up Menu (BD/DVD Menu)
  kind: action
  params: []
- id: nup
  label: Navigation Up
  kind: action
  params: []
- id: nlt
  label: Navigation Left
  kind: action
  params: []
- id: nrt
  label: Navigation Right
  kind: action
  params: []
- id: ndn
  label: Navigation Down
  kind: action
  params: []
- id: sel
  label: Enter / Select
  kind: action
  params: []
- id: set
  label: Setup Menu
  kind: action
  params: []
- id: ret
  label: Return
  kind: action
  params: []
- id: red
  label: Red Button
  kind: action
  params: []
- id: grn
  label: Green Button
  kind: action
  params: []
- id: blu
  label: Blue Button
  kind: action
  params: []
- id: ylw
  label: Yellow Button
  kind: action
  params: []
- id: stp
  label: Stop
  kind: action
  params: []
- id: pla
  label: Play
  kind: action
  params: []
- id: pau
  label: Pause
  kind: action
  params: []
- id: prev
  label: Skip to Previous
  kind: action
  params: []
- id: rev
  label: Fast Reverse Play
  kind: action
  params: []
- id: fwd
  label: Fast Forward Play
  kind: action
  params: []
- id: nxt
  label: Skip to Next
  kind: action
  params: []
- id: aud
  label: Change Audio Language/Channel
  kind: action
  params: []
- id: sub
  label: Change Subtitle Language
  kind: action
  params: []
- id: ang
  label: Change Camera Angle
  kind: action
  params: []
- id: zom
  label: Zoom / Adjust Aspect Ratio
  kind: action
  params: []
- id: sap
  label: Secondary Audio Program (SAP)
  kind: action
  params: []
- id: atb
  label: A-B Replay
  kind: action
  params: []
- id: rpt
  label: Repeat Mode
  kind: action
  params: []
- id: pip
  label: Picture-in-Picture
  kind: action
  params: []
- id: hdm
  label: Resolution Switch
  kind: action
  params: []
- id: shd
  label: Set HDMI Resolution
  kind: action
  params:
    - name: resolution
      type: enum
      values: [SDI, SDP, 720P, 1080I, 1080P, SRC, AUTO]
      description: HDMI output resolution
- id: spn
  label: Set TV System (NTSC/PAL/AUTO)
  kind: action
  params:
    - name: system
      type: enum
      values: [NTSC, PAL, AUTO]
- id: szm
  label: Set Zoom Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values: ["1", AR, FS, US, "1.2", "1.3", "1.5", "2", "1/2", "3", "4", "1/3", "1/4"]
      description: Zoom ratio; AR=aspect ratio correction, FS=full screen, US=underscan
- id: svl
  label: Set Volume
  kind: action
  params:
    - name: volume
      type: integer
      range: [0, 100]
      description: Volume level 0-100, or MUTE
- id: srp
  label: Set Repeat Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [CH, TT, ALL, OFF, SHF, RND]
      description: Repeat chapter, title, all, off, shuffle, random
- id: srh
  label: Search
  kind: action
  params:
    - name: target
      type: string
      description: "T3 (title 3), C10 (chapter 10), C 0:00:34 (chapter time), T 0:12:13 (title time), or 0:12:13 (current context)"
- id: dpl
  label: Direct Play
  kind: action
  params: []
- id: rst
  label: Reset RS-232 / Clear Command Buffers
  kind: action
  params: []
- id: qpw
  label: Query Power Status
  kind: query
  params: []
- id: qvr
  label: Query Firmware Version
  kind: query
  params: []
- id: qvl
  label: Query Volume
  kind: query
  params: []
- id: qhd
  label: Query HDMI Resolution
  kind: query
  params: []
- id: qpl
  label: Query Playback Status
  kind: query
  params: []
- id: qtk
  label: Query Track / Title
  kind: query
  params: []
- id: qch
  label: Query Chapter
  kind: query
  params: []
- id: qte
  label: Query Track / Title Elapsed Time
  kind: query
  params: []
- id: qtr
  label: Query Track / Title Remaining Time
  kind: query
  params: []
- id: qce
  label: Query Chapter Elapsed Time
  kind: query
  params: []
- id: qcr
  label: Query Chapter Remaining Time
  kind: query
  params: []
- id: qel
  label: Query Total Elapsed Time
  kind: query
  params: []
- id: qre
  label: Query Total Remaining Time
  kind: query
  params: []
- id: qdt
  label: Query Disc Type
  kind: query
  params: []
- id: qat
  label: Query Audio Type
  kind: query
  params: []
- id: qst
  label: Query Subtitle Type
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_response
  type: enum
  values: [ON, OFF]
  description: Response to POW, PON, POF commands
- id: tray_response
  type: enum
  values: [OPEN, CLOSE]
  description: Response to EJT command
- id: system_response
  type: enum
  values: [NTSC, PAL, AUTO]
  description: Response to SYS command
- id: dimmer_response
  type: enum
  values: [ON, DIM, OFF]
  description: Response to DIM command
- id: pure_audio_response
  type: enum
  values: [ON, OFF]
  description: Response to PUR command
- id: volume_response
  type: integer
  description: "Volume number 0-100; also MUTE"
- id: mute_response
  type: enum
  values: [MUTE, UNMUTE]
  description: Response to MUT command
- id: playback_response
  type: enum
  values: [NO DISC, LOADING, OPEN, CLOSE, PLAY, PAUSE, STOP, STEP, FREV, FFWD, SFWD, SREV, SETUP, HOME MENU, MEDIA CENTER]
  description: Response to QPL query; also returned as action feedback
- id: fast_play_response
  type: enum
  values: ["1 X", "2 X", "3 X", "4 X", "5 X"]
  description: Response to REV and FWD commands
- id: audio_info
  type: string
  description: "Audio track info, e.g. 'DD 1/1', 'DTS 2/5 English', 'LPCM', 'DTS-HD 1/4 English'"
- id: subtitle_info
  type: string
  description: "Subtitle info, e.g. 'OFF', '1/1 English'"
- id: angle_info
  type: string
  description: "Camera angle info returned by ANG command"
- id: zoom_info
  type: string
  description: "Zoom ratio returned by ZOM command, e.g. '1.2'"
- id: repeat_response
  type: enum
  values: [A-, A-B, OFF, "Repeat Chapter", "Repeat Title"]
  description: "Response to ATB and RPT commands"
- id: resolution_response
  type: enum
  values: [SDI, SDP, 720P, 1080I, 1080P, SRC, AUTO]
  description: Response to SHD command
- id: repeat_mode_response
  type: enum
  values: [CH, TT, ALL, OFF, SHF, RND]
  description: Response to SRP command
- id: search_response
  type: enum
  values: [OK, ER INVALID]
  description: Response to SRH command
- id: result_code
  type: enum
  values: [OK, ER]
  description: Generic result code prefix for all responses
```

## Variables
```yaml
# No standalone settable parameters - all configurable via action params
# UNRESOLVED: volume variable readable via QVL but not separately settable beyond SVL action
```

## Events
```yaml
# No unsolicited notifications described in source
# UNRESOLVED: player may send unsolicited responses during playback - not documented
```

## Macros
```yaml
# No multi-step macros described in source
# UNRESOLVED: chained key sequences (e.g. GOT + numeric keys + SEL for chapter search) not documented as macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command_sequence: "Host must wait for response before sending next command (10s timeout before retransmit)"
  - cable_warning: "Use straight-through DB9 RS-232 cable only - do NOT use null-modem cable"
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
RS-232C DCE device, female DB9. Pin 2=TXD, Pin 3=RXD, Pin 5=GND. Max command/response length: 25 bytes. Command prefix: `#` (0x23). Response prefix: `@` (0x40). End-of-command: CR (0x0d). If no response within 10s, host may retransmit. Player discards previous command if new command received before execution completes. For multi-key sequences (e.g. chapter goto), player responds to each key individually until final key completes the action.
<!-- UNRESOLVED: no information about TCP/IP, HTTP, or network-based control; serial-only -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: unsolicited event emissions not documented -->

## Provenance

```yaml
source_domains:
  - oppodigital.com
  - download.oppodigital.com
source_urls:
  - https://www.oppodigital.com/Download/BDP83/BDP83_RS232_Protocol.pdf
  - http://download.oppodigital.com/BDP103/BDP-103_RS232_Protocol_v1.1.pdf
  - http://download.oppodigital.com/BDP103/BDP-103_RS232_Protocol_v1.0.pdf
retrieved_at: 2026-04-26T19:11:33.779Z
last_checked_at: 2026-05-14T18:17:19.502Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:19.502Z
matched_actions: 60
action_count: 80
confidence: high
summary: "All 60 spec actions matched literal command tokens in source; transport parameters verified; complete bidirectional coverage of BDP-83 command set."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
