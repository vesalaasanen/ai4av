---
spec_id: admin/classe-cdp-300
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio CDP-300 Control Spec"
manufacturer: "Classé"
model_family: CDP-300
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - CDP-300
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CDP_102_202_300_502_RS232_Protocol.pdf
retrieved_at: 2026-05-27T13:18:06.182Z
last_checked_at: 2026-09-03T22:19:13.879Z
generated_at: 2026-09-03T22:19:13.879Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source covers multiple models (CDP-102, CDP-202, CDP-300, CDP-502, CDT-300); only CDP-300 commands/status documented here"
  - "source documents no discrete settable parameters outside the parameterized commands listed in Actions."
  - "source does not describe multi-step sequences explicitly."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source. Source covers multiple models (CDP-102/202/300/502, CDT-300); only CDP-300 behavior fully documented here."
verification:
  verdict: verified
  checked_at: 2026-09-03T22:19:13.879Z
  matched_actions: 88
  action_count: 88
  confidence: medium
  summary: "All 88 spec actions map1:1 to the 88 command entries (69 control §3.1–§3.69 + 19 status §4.1–§4.19) in the refined source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Classe Audio CDP-300 Control Spec

## Summary
The Classe Audio CDP-300 is a DVD/CD player with an RS-232C automation interface. This spec documents the ASCII command set, status messages, and serial transport parameters (9600-8N1, no flow control) used to control playback, transport, audio, lip-sync, repeat, and power functions.

<!-- UNRESOLVED: source covers multiple models (CDP-102, CDP-202, CDP-300, CDP-502, CDT-300); only CDP-300 commands/status documented here -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: source states automation interface does not support flow control
  connector: DB-9  # inferred: source describes DB-9 DCE connector
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from STBY/OPER power commands
- queryable       # inferred from STAT * status request commands
```

## Actions
```yaml
- id: open_tray
  label: Open Tray
  kind: action
  command: "OPEN<cr><lf>"
  params: []
  notes: "Only valid on Tray Loader units."

- id: close_tray
  label: Close Tray
  kind: action
  command: "CLOSE<cr><lf>"
  params: []
  notes: "Only valid on Tray Loader units."

- id: eject_disc
  label: Eject Disc
  kind: action
  command: "EJCT<cr><lf>"
  params: []
  notes: "Only valid on Slot Loader units."

- id: play
  label: Play
  kind: action
  command: "PLAY<cr><lf>"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "STOP<cr><lf>"
  params: []

- id: pause
  label: Pause
  kind: action
  command: "PAUS<cr><lf>"
  params: []

- id: step_frame
  label: Step Frame
  kind: action
  command: "STEP<cr><lf>"
  params: []
  notes: "Valid only during pause state on DVD-V disc; advances to next video frame."

- id: unpause
  label: Resume Playback
  kind: action
  command: "UNPS<cr><lf>"
  params: []

- id: next_track
  label: Next Track/Chapter
  kind: action
  command: "NEXT<cr><lf>"
  params: []

- id: prev_track
  label: Previous Track/Chapter
  kind: action
  command: "PREV<cr><lf>"
  params: []

- id: next_title
  label: Next Title/Group
  kind: action
  command: "NEXT TITLE<cr><lf>"
  params: []
  notes: "Valid for DVD-V and DVD-A media."

- id: prev_title
  label: Previous Title/Group
  kind: action
  command: "PREV TITLE<cr><lf>"
  params: []
  notes: "Valid for DVD-V and DVD-A media."

- id: fwd
  label: Seek Forward
  kind: action
  command: "FWD [speed]<cr><lf>"
  params:
    - name: speed
      type: string
      description: "Optional speed. Defaults to 2X. CDDA: 2X 4X 8X 16X. DVD-V/DVD-A: 1/8 1/4 1/2 2X 4X 8X 16X 30X 60X. MP3/WMA/AAC: 4X."
  notes: "Only valid if disc is currently playing."

- id: rev
  label: Seek Reverse
  kind: action
  command: "REV [speed]<cr><lf>"
  params:
    - name: speed
      type: string
      description: "Optional speed. Defaults to 2X. Same valid values as FWD."
  notes: "Only valid if disc is currently playing."

- id: sfwd
  label: Slow Forward
  kind: action
  command: "SFWD<cr><lf>"
  params: []
  notes: "Only valid on DVD-V. Increases speed if already in slow mode."

- id: srev
  label: Slow Reverse
  kind: action
  command: "SREV<cr><lf>"
  params: []
  notes: "Only valid on DVD-V. Decreases speed if already in slow mode."

- id: ffwd
  label: Fast Forward
  kind: action
  command: "FFWD<cr><lf>"
  params: []
  notes: "Only valid on DVD-V. Increases speed if already in fast mode."

- id: frev
  label: Fast Reverse
  kind: action
  command: "FREV<cr><lf>"
  params: []
  notes: "Only valid on DVD-V. Decreases speed if already in fast mode."

- id: speed_up
  label: Increase Search Speed
  kind: action
  command: "SPEED+<cr><lf>"
  params: []
  notes: "Only valid if disc is currently in search mode."

- id: speed_down
  label: Decrease Search Speed
  kind: action
  command: "SPEED-<cr><lf>"
  params: []
  notes: "Only valid if disc is currently in search mode."

- id: still_next
  label: Next Still Image
  kind: action
  command: "STILL+<cr><lf>"
  params: []
  notes: "Only valid for DVD-A media."

- id: still_prev
  label: Previous Still Image
  kind: action
  command: "STILL-<cr><lf>"
  params: []
  notes: "Only valid for DVD-A media."

- id: jump_time
  label: Jump to Time
  kind: action
  command: "JUMP TIME [[hh:]mm:]ss<cr><lf>"
  params:
    - name: hh
      type: integer
      description: "Hour (0-99). Optional."
    - name: mm
      type: integer
      description: "Minutes (0-59). Optional."
    - name: ss
      type: integer
      description: "Seconds (0-59)."

- id: jump
  label: Jump to Title/Chapter
  kind: action
  command: "JUMP [tt:]ccc<cr><lf>"
  params:
    - name: tt
      type: integer
      description: "Title on DVD-V (0-99) or group on DVD-A (0-9). Optional."
    - name: ccc
      type: integer
      description: "Chapter on DVD-V (0-225) or track on CDDA/DVD-A (0-99)."

- id: track
  label: Jump to Track/Chapter
  kind: action
  command: "TRACK ccc<cr><lf>"
  params:
    - name: ccc
      type: integer
      description: "Chapter on DVD-V (0-225) or track on CDDA/DVD-A (0-99)."

- id: title
  label: Jump to Title/Group
  kind: action
  command: "TITLE tt<cr><lf>"
  params:
    - name: tt
      type: integer
      description: "Title on DVD-V (0-99) or group on DVD-A (0-9)."

- id: shuffle
  label: Shuffle Play
  kind: action
  command: "OPEN<cr><lf>"
  params: []
  notes: "Only valid for CDDA media. Source documents this command's literal payload as OPEN<cr><lf> in §3.27."

- id: prg_add
  label: Add Track to Program
  kind: action
  command: "PRG+<cr><lf>"
  params: []
  notes: "Only valid for CDDA media."

- id: prg_remove
  label: Remove Track from Program
  kind: action
  command: "PRG-<cr><lf>"
  params: []
  notes: "Only valid for CDDA media."

- id: pclr
  label: Clear Playlist
  kind: action
  command: "PCLR<cr><lf>"
  params: []
  notes: "Only valid for CDDA media."

- id: pempty
  label: Reset Playlist to TOC
  kind: action
  command: "PEMPTY<cr><lf>"
  params: []
  notes: "Only valid for CDDA media."

- id: save
  label: Save Program
  kind: action
  command: "SAVE<cr><lf>"
  params: []
  notes: "Only valid for CDDA media."

- id: direct_jump
  label: Direct Chapter/Track Jump
  kind: action
  command: "ccc<cr><lf>"
  params:
    - name: ccc
      type: integer
      description: "Chapter on DVD-V (0-225) or track on CDDA/DVD-A (0-99)."

- id: rpdc
  label: Repeat Disc
  kind: action
  command: "RPDC<cr><lf>"
  params: []

- id: rptt
  label: Repeat Title/Group
  kind: action
  command: "RPTT<cr><lf>"
  params: []
  notes: "Repeat title on DVD-V, repeat group on DVD-A."

- id: rptk
  label: Repeat Chapter/Track
  kind: action
  command: "RPTK<cr><lf>"
  params: []
  notes: "Repeat chapter on DVD-V, repeat track on other media."

- id: rpab
  label: Repeat A-B
  kind: action
  command: "RPAB<cr><lf>"
  params: []
  notes: "First occurrence sets begin point; second sets end and starts repeat. DVD-V only."

- id: rpof
  label: Repeat Off
  kind: action
  command: "RPOF<cr><lf>"
  params: []

- id: menu_disc
  label: Activate Disc Menu
  kind: action
  command: "MENU DISC<cr><lf>"
  params: []
  notes: "Valid on DVD-V and DVD-A."

- id: menu_title
  label: Activate Title Menu
  kind: action
  command: "MENU TITLE<cr><lf>"
  params: []
  notes: "Valid on DVD-V and DVD-A."

- id: cursor_up
  label: Cursor Up
  kind: action
  command: "UP<cr><lf>"
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  command: "DOWN<cr><lf>"
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  command: "LEFT<cr><lf>"
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  command: "RIGHT<cr><lf>"
  params: []

- id: select
  label: Select Menu Item
  kind: action
  command: "SELECT<cr><lf>"
  params: []

- id: subt
  label: Next Subtitle Track
  kind: action
  command: "SUBT<cr><lf>"
  params: []
  notes: "Valid on DVD-V and DVD-A."

- id: audio
  label: Next Audio Track
  kind: action
  command: "AUDIO<cr><lf>"
  params: []
  notes: "Valid on DVD-V and DVD-A."

- id: surr
  label: Toggle Surround Mode
  kind: action
  command: "SURR<cr><lf>"
  params: []
  notes: "Toggles between stereo and 5.1 modes."

- id: angle
  label: Next Camera Angle
  kind: action
  command: "ANGLE<cr><lf>"
  params: []
  notes: "Valid on DVD-V and DVD-A."

- id: zoom
  label: Next Zoom Ratio
  kind: action
  command: "ZOOM<cr><lf>"
  params: []
  notes: "Valid on DVD-V and DVD-A."

- id: aspect
  label: Next Aspect Ratio
  kind: action
  command: "ASPECT<cr><lf>"
  params: []
  notes: "Cycles 16:9 / 4:3 LB / 4:3 PS."

- id: vol_abs
  label: Set Volume Absolute
  kind: action
  command: "VOLA vvv.v<cr><lf>"
  params:
    - name: vvv_v
      type: number
      description: "Absolute volume 0.0-100.0 in 0.5 dB steps."
  notes: "Only available if volume control is enabled."

- id: vol_up
  label: Volume Up
  kind: action
  command: "MVOL+<cr><lf>"
  params: []
  notes: "Only available if volume control is enabled. For acceleration mode, send within 200ms of system reply."

- id: vol_down
  label: Volume Down
  kind: action
  command: "MVOL-<cr><lf>"
  params: []
  notes: "Only available if volume control is enabled. For acceleration mode, send within 200ms of system reply."

- id: mute
  label: Mute
  kind: action
  command: "MUTE<cr><lf>"
  params: []
  notes: "Only available if volume control is enabled."

- id: unmute
  label: Unmute
  kind: action
  command: "UNMT<cr><lf>"
  params: []
  notes: "Only available if volume control is enabled."

- id: lsy_up
  label: Lip-Sync Delay +1ms
  kind: action
  command: "LSY+<cr><lf>"
  params: []

- id: lsy_down
  label: Lip-Sync Delay -1ms
  kind: action
  command: "LSY-<cr><lf>"
  params: []

- id: lsy_set
  label: Set Lip-Sync Delay
  kind: action
  command: "LSY nnn<cr><lf>"
  params:
    - name: nnn
      type: integer
      description: "Lip-sync delay in milliseconds."

- id: standby
  label: Standby
  kind: action
  command: "STBY<cr><lf>"
  params: []

- id: operate
  label: Operate
  kind: action
  command: "OPER<cr><lf>"
  params: []

- id: lcd0
  label: LCD Off
  kind: action
  command: "LCD0<cr><lf>"
  params: []

- id: lcd1
  label: LCD Low Intensity
  kind: action
  command: "LCD1<cr><lf>"
  params: []

- id: lcd2
  label: LCD Medium Intensity
  kind: action
  command: "LCD2<cr><lf>"
  params: []

- id: lcd3
  label: LCD High Intensity
  kind: action
  command: "LCD3<cr><lf>"
  params: []

- id: dsce
  label: Display Mode - Disc Elapsed Time
  kind: action
  command: "DSCE<cr><lf>"
  params: []

- id: dscr
  label: Display Mode - Disc Remaining Time
  kind: action
  command: "DSCR<cr><lf>"
  params: []
  notes: "Default mode when stopped."

- id: trke
  label: Display Mode - Track Elapsed Time
  kind: action
  command: "TRKE<cr><lf>"
  params: []

- id: trkr
  label: Display Mode - Track Remaining Time
  kind: action
  command: "TRKR<cr><lf>"
  params: []

- id: stat_syst
  label: Query System Status
  kind: query
  command: "STAT SYST<cr><lf>"
  params: []

- id: stat_auto
  label: Enable Autonomous Status
  kind: action
  command: "STAT AUTO<cr><lf>"
  params: []
  notes: "Default state."

- id: stat_off
  label: Disable Autonomous Status
  kind: action
  command: "STAT OFF<cr><lf>"
  params: []

- id: stat_dsct
  label: Query Total Disc Time
  kind: query
  command: "STAT DSCT<cr><lf>"
  params: []

- id: stat_trkt
  label: Query Track Time
  kind: query
  command: "STAT TRKT<cr><lf>"
  params: []
  notes: "If stopped, returns total track time."

- id: stat_dsci
  label: Query Album Title
  kind: query
  command: "STAT DSCI<cr><lf>"
  params: []

- id: stat_trki
  label: Query Track Title
  kind: query
  command: "STAT TRKI<cr><lf>"
  params: []

- id: stat_ttl
  label: Query Title/Group
  kind: query
  command: "STAT TTL<cr><lf>"
  params: []
  notes: "Valid for DVD-V and DVD-A."

- id: stat_trk
  label: Query Chapter/Track
  kind: query
  command: "STAT TRK<cr><lf>"
  params: []

- id: stat_media
  label: Query Media Type
  kind: query
  command: "STAT MEDIA<cr><lf>"
  params: []

- id: stat_main
  label: Query Main Volume
  kind: query
  command: "STAT MAIN<cr><lf>"
  params: []
  notes: "Only available if volume control is enabled."

- id: stat_subt
  label: Query Subtitle Track
  kind: query
  command: "STAT SUBT<cr><lf>"
  params: []
  notes: "Valid for DVD-V and DVD-A."

- id: stat_audio
  label: Query Audio Track
  kind: query
  command: "STAT AUDIO<cr><lf>"
  params: []

- id: stat_video
  label: Query Video Information
  kind: query
  command: "STAT VIDEO<cr><lf>"
  params: []
  notes: "Valid on models with video interface."

- id: stat_lsy
  label: Query Lip-Sync
  kind: query
  command: "STAT LSY<cr><lf>"
  params: []

- id: stat_rpt
  label: Query Repeat Mode
  kind: query
  command: "STAT RPT<cr><lf>"
  params: []

- id: stat_rndm
  label: Query Random Mode
  kind: query
  command: "STAT RNDM<cr><lf>"
  params: []

- id: stat_tmde
  label: Query Display Time Mode
  kind: query
  command: "STAT TMDE<cr><lf>"
  params: []

- id: stat_hdmi
  label: Query HDMI Status
  kind: query
  command: "STAT HDMI<cr><lf>"
  params: []
  notes: "Valid on models with HDMI interface."
```

## Feedbacks
```yaml
- id: sy_status
  type: enum
  description: "Current system state (unsolicited or in response to STAT SYST)."
  values:
    - OPEN
    - TRAY
    - EJCT
    - STBY
    - OPER
    - SPIN
    - VOID
    - PLAY
    - DVDMENU
    - PRESTOP
    - STOP
    - PAUS
    - FWD
    - REV
    - ERR

- id: dt_total
  type: string
  description: "Total disc time. Format: DT tt hh:mm:ss. tt = chapter/track count (0-255)."

- id: tt_current
  type: string
  description: "Current track time. Format: TT ct hh:mm:ss. ct = current chapter/track (0-255)."

- id: di_album_info
  type: string
  description: "Album ASCII info. Format: DI text. Contains album name and artist name when available."

- id: ti_track_info
  type: string
  description: "Track ASCII info. Format: TI text. Contains track name when available."

- id: ttl
  type: string
  description: "Currently selected title/group. Format: TTL tt. tt may be '--' if unknown."

- id: trk
  type: string
  description: "Currently selected chapter/track. Format: TRK ccc. ccc may be '---' if unknown."

- id: sy_media
  type: enum
  description: "Loaded media type."
  values:
    - DONE
    - DVD
    - DVDA
    - CDDA
    - VCD
    - SVCD
    - SACD
    - DATA

- id: sy_vola
  type: string
  description: "Absolute volume. Format: SY VOLA vv [muted]. vv is 0-100 in 0.5 steps. 'muted' suffix present when muted."

- id: sy_volr
  type: string
  description: "Relative volume. Format: SY VOLR svv [muted]. svv is -89.0 to +14.0 in 0.5 steps. 'muted' suffix present when muted."

- id: sy_subt
  type: string
  description: "Current subtitle language. Format: SY SUBT language. Valid for DVD-V and DVD-A."

- id: sy_audio
  type: string
  description: "Audio stream info. Format: SY AUDIO stream samplerate [nCH] [language]."

- id: sy_video
  type: string
  description: "Video info. Format: SY VIDEO aspect scanning. aspect: 4:3PS / 16:9 / 4:3LB / NONE. scanning: PROG / INT / NONE."

- id: sy_lsy
  type: string
  description: "Lip-sync delay. Format: SY LSY svvv. svvv is -100 to 100 in 1ms steps."

- id: sy_rpt
  type: enum
  description: "Repeat mode."
  values:
    - RPDC
    - RPTK
    - RPA
    - RPAB
    - RPTT
    - OFF

- id: sy_rndm
  type: enum
  description: "Random mode."
  values:
    - RNDM
    - SHFL
    - OFF

- id: sy_tmde
  type: enum
  description: "Display time mode."
  values:
    - TRKE
    - TRKR
    - DSCE
    - DSCR
    - OFF

- id: sy_hdmi
  type: string
  description: "HDMI interface info. Format: SY HDMI status [resolution]."

- id: ack_positive
  type: string
  description: "Positive acknowledgement for recognized command."
  values:
    - "!<cr><lf>"

- id: ack_negative
  type: string
  description: "Negative acknowledgement for unrecognized command."
  values:
    - "?<cr><lf>"
```

## Variables
```yaml
# UNRESOLVED: source documents no discrete settable parameters outside the parameterized commands listed in Actions.
```

## Events
```yaml
# Autonomous messages emitted by the CDP-300 when enabled (STAT AUTO). Disable with STAT OFF.
# See Feedbacks section for the full set (SY status, DT, TT, DI, TI, TTL, TRK, SY MEDIA,
# SY VOLA, SY VOLR, SY SUBT, SY AUDIO, SY VIDEO, SY LSY, SY RPT, SY RNDM, SY TMDE, SY HDMI).
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences explicitly.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Address field "P300" may prefix commands with "." delimiter (e.g. "P300.PLAY<cr><lf>"); may be omitted if CDP-300 is the only connected unit.
- Line terminator is <cr><lf> on every command.
- Acknowledgement: "!<cr><lf>" (positive) or "?<cr><lf>" (negative), emitted within 100ms; reissue command if no reply received after 100ms.
- 16-byte FIFO; no minimum delay between bytes.
- MVOL+/MVOL- "acceleration mode" requires the next command to arrive within 200ms of the system's reply.
- Volume commands (VOLA, MVOL+/-, MUTE, UNMT, SY VOLA, SY VOLR, SY LSY) are only available if volume control is enabled.
- Source §3.27 (SHFL) lists the literal command payload as "OPEN<cr><lf>" — likely a documentation error (OPEN is §3.1); reproduced verbatim.
<!-- UNRESOLVED: firmware version compatibility not stated in source. Source covers multiple models (CDP-102/202/300/502, CDT-300); only CDP-300 behavior fully documented here. -->

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CDP_102_202_300_502_RS232_Protocol.pdf
retrieved_at: 2026-05-27T13:18:06.182Z
last_checked_at: 2026-09-03T22:19:13.879Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-03T22:19:13.879Z
matched_actions: 88
action_count: 88
confidence: medium
summary: "All 88 spec actions map1:1 to the 88 command entries (69 control §3.1–§3.69 + 19 status §4.1–§4.19) in the refined source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers multiple models (CDP-102, CDP-202, CDP-300, CDP-502, CDT-300); only CDP-300 commands/status documented here"
- "source documents no discrete settable parameters outside the parameterized commands listed in Actions."
- "source does not describe multi-step sequences explicitly."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility not stated in source. Source covers multiple models (CDP-102/202/300/502, CDT-300); only CDP-300 behavior fully documented here."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
