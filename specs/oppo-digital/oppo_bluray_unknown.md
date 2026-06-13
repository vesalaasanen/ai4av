---
spec_id: admin/oppo-udp-203-205
schema_version: ai4av-public-spec-v1
revision: 1
title: "Oppo UDP-203/UDP-205 Control Spec"
manufacturer: "OPPO Digital"
model_family: UDP-203
aliases: []
compatible_with:
  manufacturers:
    - "OPPO Digital"
    - Oppo
  models:
    - UDP-203
    - UDP-205
  firmware: "\"UDP20X-54-1127\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - download.oppodigital.com
  - oppodigital.com
source_urls:
  - http://download.oppodigital.com/UDP203/OPPO_UDP-20X_RS-232_and_IP_Control_Protocol.pdf
  - http://download.oppodigital.com/BDP103/BDP-103_RS232_Protocol_v1.1.pdf
  - https://www.oppodigital.com/support/blu-ray-bdp-83/BDP83_RS232_Protocol_v2.1.pdf
retrieved_at: 2026-06-12T03:05:37.528Z
last_checked_at: 2026-06-12T19:27:41.177Z
generated_at: 2026-06-12T19:27:41.177Z
firmware_coverage: "\"UDP20X-54-1127\""
protocol_coverage: []
known_gaps:
  - "UDP discovery broadcast address 239.255.255.251:7624 is documented but is a discovery helper, not a control channel."
  - "source does not document multi-step macro sequences beyond the documented"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version range compatibility above UDP20X-54-1127 not stated."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:27:41.177Z
  matched_actions: 118
  action_count: 118
  confidence: medium
  summary: "All 118 spec actions matched verbatim in source; transport parameters (port 23, baud 9600) confirmed; complete bidirectional coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Oppo UDP-203/UDP-205 Control Spec

## Summary
RS-232 and TCP/IP control protocol for Oppo UDP-203 and UDP-205 4K Ultra HD Blu-ray players. Commands use a `#XXX` prefix and carriage return terminator; responses use `@XXX` prefix with OK/ER result codes. The protocol is shared across both models (some commands/inputs are UDP-205 only).

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # stated in source: "TCP port 23"
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

<!-- UNRESOLVED: UDP discovery broadcast address 239.255.255.251:7624 is documented but is a discovery helper, not a control channel. -->

## Traits
```yaml
- powerable  # inferred from PON/POF/POW commands
- routable   # inferred from SIS input select + UIS updates
- queryable  # inferred from Q* query commands
- levelable  # inferred from SVL volume + UVL updates
```

## Actions
```yaml
# ===== A. Remote-key mapped commands =====
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "#POW\r"
  params: []

- id: eject_toggle
  label: Open/Close Disc Tray
  kind: action
  command: "#EJT\r"
  params: []

- id: power_on
  label: Power On (discrete)
  kind: action
  command: "#PON\r"
  params: []

- id: power_off
  label: Power Off (discrete)
  kind: action
  command: "#POF\r"
  params: []

- id: dim
  label: Dim Front Panel Display
  kind: action
  command: "#DIM\r"
  params: []

- id: pure_audio
  label: Pure Audio Mode
  kind: action
  command: "#PUR\r"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "#VUP\r"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "#VDN\r"
  params: []

- id: mute
  label: Mute
  kind: action
  command: "#MUT\r"
  params: []

- id: num_1
  label: Numeric Key 1
  kind: action
  command: "#NU1\r"
  params: []

- id: num_2
  label: Numeric Key 2
  kind: action
  command: "#NU2\r"
  params: []

- id: num_3
  label: Numeric Key 3
  kind: action
  command: "#NU3\r"
  params: []

- id: num_4
  label: Numeric Key 4
  kind: action
  command: "#NU4\r"
  params: []

- id: num_5
  label: Numeric Key 5
  kind: action
  command: "#NU5\r"
  params: []

- id: num_6
  label: Numeric Key 6
  kind: action
  command: "#NU6\r"
  params: []

- id: num_7
  label: Numeric Key 7
  kind: action
  command: "#NU7\r"
  params: []

- id: num_8
  label: Numeric Key 8
  kind: action
  command: "#NU8\r"
  params: []

- id: num_9
  label: Numeric Key 9
  kind: action
  command: "#NU9\r"
  params: []

- id: num_0
  label: Numeric Key 0
  kind: action
  command: "#NU0\r"
  params: []

- id: clear
  label: Clear Numeric Input
  kind: action
  command: "#CLR\r"
  params: []

- id: goto
  label: Go To Location
  kind: action
  command: "#GOT\r"
  params: []

- id: home
  label: Home Menu
  kind: action
  command: "#HOM\r"
  params: []

- id: page_up
  label: Page Up
  kind: action
  command: "#PUP\r"
  params: []

- id: page_down
  label: Page Down
  kind: action
  command: "#PDN\r"
  params: []

- id: info_osd
  label: Show/Hide OSD
  kind: action
  command: "#OSD\r"
  params: []

- id: top_menu
  label: Top Menu
  kind: action
  command: "#TTL\r"
  params: []

- id: popup_menu
  label: Pop-up Menu
  kind: action
  command: "#MNU\r"
  params: []

- id: nav_up
  label: Navigation Up
  kind: action
  command: "#NUP\r"
  params: []

- id: nav_left
  label: Navigation Left
  kind: action
  command: "#NLT\r"
  params: []

- id: nav_right
  label: Navigation Right
  kind: action
  command: "#NRT\r"
  params: []

- id: nav_down
  label: Navigation Down
  kind: action
  command: "#NDN\r"
  params: []

- id: nav_enter
  label: Navigation Enter
  kind: action
  command: "#SEL\r"
  params: []

- id: setup
  label: Setup Menu
  kind: action
  command: "#SET\r"
  params: []

- id: return
  label: Return
  kind: action
  command: "#RET\r"
  params: []

- id: red
  label: Red Key
  kind: action
  command: "#RED\r"
  params: []

- id: green
  label: Green Key
  kind: action
  command: "#GRN\r"
  params: []

- id: blue
  label: Blue Key
  kind: action
  command: "#BLU\r"
  params: []

- id: yellow
  label: Yellow Key
  kind: action
  command: "#YLW\r"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "#STP\r"
  params: []

- id: play
  label: Play
  kind: action
  command: "#PLA\r"
  params: []

- id: pause
  label: Pause
  kind: action
  command: "#PAU\r"
  params: []

- id: previous
  label: Previous
  kind: action
  command: "#PRE\r"
  params: []

- id: rev
  label: Fast Reverse
  kind: action
  command: "#REV\r"
  params: []

- id: fwd
  label: Fast Forward
  kind: action
  command: "#FWD\r"
  params: []

- id: next
  label: Next
  kind: action
  command: "#NXT\r"
  params: []

- id: audio
  label: Audio Language/Channel
  kind: action
  command: "#AUD\r"
  params: []

- id: subtitle
  label: Subtitle Language
  kind: action
  command: "#SUB\r"
  params: []

- id: angle
  label: Camera Angle
  kind: action
  command: "#ANG\r"
  params: []

- id: zoom
  label: Zoom
  kind: action
  command: "#ZOM\r"
  params: []

- id: sap
  label: Secondary Audio Program
  kind: action
  command: "#SAP\r"
  params: []

- id: ab_replay
  label: AB Replay
  kind: action
  command: "#ATB\r"
  params: []

- id: repeat
  label: Repeat
  kind: action
  command: "#RPT\r"
  params: []

- id: pip
  label: Picture-in-Picture
  kind: action
  command: "#PIP\r"
  params: []

- id: resolution
  label: Switch Output Resolution
  kind: action
  command: "#HDM\r"
  params: []

- id: subtitle_hold
  label: Subtitle (hold) - Shift
  kind: action
  command: "#SUH\r"
  params: []

- id: option
  label: Option Menu
  kind: action
  command: "#OPT\r"
  params: []

- id: threed
  label: 3D Menu
  kind: action
  command: "#M3D\r"
  params: []

- id: picture_adjust
  label: Picture Adjustment
  kind: action
  command: "#SEH\r"
  params: []

- id: hdr_menu
  label: HDR Selection Menu
  kind: action
  command: "#HDR\r"
  params: []

- id: info_hold
  label: Info (hold)
  kind: action
  command: "#INH\r"
  params: []

- id: resolution_auto
  label: Resolution Auto
  kind: action
  command: "#RLH\r"
  params: []

- id: av_sync
  label: A/V Sync Adjustment
  kind: action
  command: "#AVS\r"
  params: []

- id: gapless_play
  label: Gapless Play
  kind: action
  command: "#GPA\r"
  params: []

- id: nop
  label: No Operation
  kind: action
  command: "#NOP\r"
  params: []

- id: input
  label: Input Menu
  kind: action
  command: "#SRC\r"
  params: []

# ===== B. Query Commands =====
- id: q_verbose_mode
  label: Query Verbose Mode
  kind: query
  command: "#QVM\r"
  params: []

- id: q_power
  label: Query Power Status
  kind: query
  command: "#QPW\r"
  params: []

- id: q_firmware
  label: Query Firmware Version
  kind: query
  command: "#QVR\r"
  params: []

- id: q_volume
  label: Query Volume
  kind: query
  command: "#QVL\r"
  params: []

- id: q_hdmi_resolution
  label: Query HDMI Resolution
  kind: query
  command: "#QHD\r"
  params: []

- id: q_playback
  label: Query Playback Status
  kind: query
  command: "#QPL\r"
  params: []

- id: q_track_title
  label: Query Track/Title
  kind: query
  command: "#QTK\r"
  params: []

- id: q_chapter
  label: Query Chapter
  kind: query
  command: "#QCH\r"
  params: []

- id: q_track_title_elapsed
  label: Query Track/Title Elapsed
  kind: query
  command: "#QTE\r"
  params: []

- id: q_track_title_remaining
  label: Query Track/Title Remaining
  kind: query
  command: "#QTR\r"
  params: []

- id: q_chapter_elapsed
  label: Query Chapter Elapsed
  kind: query
  command: "#QCE\r"
  params: []

- id: q_chapter_remaining
  label: Query Chapter Remaining
  kind: query
  command: "#QCR\r"
  params: []

- id: q_total_elapsed
  label: Query Total Elapsed
  kind: query
  command: "#QEL\r"
  params: []

- id: q_total_remaining
  label: Query Total Remaining
  kind: query
  command: "#QRE\r"
  params: []

- id: q_disc_type
  label: Query Disc Type
  kind: query
  command: "#QDT\r"
  params: []

- id: q_audio_type
  label: Query Audio Type
  kind: query
  command: "#QAT\r"
  params: []

- id: q_subtitle_type
  label: Query Subtitle Type
  kind: query
  command: "#QST\r"
  params: []

- id: q_subtitle_shift
  label: Query Subtitle Shift
  kind: query
  command: "#QSH\r"
  params: []

- id: q_osd_position
  label: Query OSD Position
  kind: query
  command: "#QOP\r"
  params: []

- id: q_repeat_mode
  label: Query Repeat Mode
  kind: query
  command: "#QRP\r"
  params: []

- id: q_zoom_mode
  label: Query Zoom Mode
  kind: query
  command: "#QZM\r"
  params: []

- id: q_hdr_setting
  label: Query HDR Setting
  kind: query
  command: "#QHR\r"
  params: []

- id: q_3d_status
  label: Query 3D Status
  kind: query
  command: "#Q3D\r"
  params: []

- id: q_hdr_status
  label: Query HDR Status
  kind: query
  command: "#QHS\r"
  params: []

- id: q_input_source
  label: Query Input Source
  kind: query
  command: "#QIS\r"
  params: []

- id: q_cddb
  label: Query CDDB Number
  kind: query
  command: "#QCD\r"
  params: []

- id: q_media_format
  label: Query Media File Format
  kind: query
  command: "#QFT\r"
  params: []

- id: q_file_name
  label: Query Media File Name
  kind: query
  command: "#QFN\r"
  params: []

- id: q_track_name
  label: Query Track Name
  kind: query
  command: "#QTN\r"
  params: []

- id: q_track_album
  label: Query Track Album
  kind: query
  command: "#QTA\r"
  params: []

- id: q_track_performer
  label: Query Track Performer
  kind: query
  command: "#QTP\r"
  params: []

- id: q_directory_size
  label: Query Directory Size
  kind: query
  command: "#QDS\r"
  params: []

- id: q_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "#QAR\r"
  params: []

# ===== C. Advanced Commands =====
- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "#SVM {mode}\r"
  params:
    - name: mode
      type: integer
      description: "0=off, 1=unused, 2=major status updates, 3=detailed status updates"

- id: set_hdmi_resolution
  label: Set HDMI Output Resolution
  kind: action
  command: "#SHD {resolution}\r"
  params:
    - name: resolution
      type: string
      description: "AUTO, SRC, UHD_AUTO, UHD24, UHD50, UHD60, 1080P_AUTO, 1080P24, 1080P50, 1080P60, 1080I50, 1080I60, 720P50, 720P60, 576P, 576I, 480P, 480I"

- id: set_zoom
  label: Set Zoom Ratio
  kind: action
  command: "#SZM {ratio}\r"
  params:
    - name: ratio
      type: string
      description: "1, AR, FS, US, 1.2, 1.3, 1.5, 2, 1/2, 3, 4, 1/3, 1/4"

- id: set_volume
  label: Set Volume
  kind: action
  command: "#SVL {level}\r"
  params:
    - name: level
      type: string
      description: "0..100 or MUTE"

- id: set_repeat
  label: Set Repeat Mode
  kind: action
  command: "#SRP {mode}\r"
  params:
    - name: mode
      type: string
      description: "CH, TT, ALL, OFF, SHF, RND"

- id: search
  label: Search To Title/Chapter/Time
  kind: action
  command: "#SRH {target}\r"
  params:
    - name: target
      type: string
      description: "T3, C10, C 0:00:34, T 0:12:13, 0:12:13"

- id: direct_play
  label: Direct Play
  kind: action
  command: "#DPL\r"
  params: []

- id: reset
  label: Reset (Clear Command Buffers)
  kind: action
  command: "#RST\r"
  params: []

- id: set_subtitle_shift
  label: Set Subtitle Shift
  kind: action
  command: "#SSH {shift}\r"
  params:
    - name: shift
      type: integer
      description: "-10..10"

- id: set_osd_position
  label: Set OSD Position
  kind: action
  command: "#SOP {pos}\r"
  params:
    - name: pos
      type: integer
      description: "0..5"

- id: set_time_display
  label: Set Time Information Display
  kind: action
  command: "#STC {type}\r"
  params:
    - name: type
      type: string
      description: "E=Total Elapsed, R=Total Remaining, T=Title Elapsed, X=Title Remaining, C=Chapter Elapsed, K=Chapter Remaining"

- id: set_hdr
  label: Set HDR Setting
  kind: action
  command: "#SHR {mode}\r"
  params:
    - name: mode
      type: string
      description: "Auto, On, Off"

- id: set_input_source
  label: Select Input Source
  kind: action
  command: "#SIS {source}\r"
  params:
    - name: source
      type: integer
      description: "0=BD-PLAYER, 1=HDMI-IN, 2=ARC:HDMI-OUT, 3=OPTICAL-IN, 4=COAXIAL-IN, 5=USB-AUDIO-IN (3-5 UDP-205 only)"

- id: set_screen_saver
  label: Set Screen Saver
  kind: action
  command: "#SSA {mode}\r"
  params:
    - name: mode
      type: string
      description: "ON, OFF, SAVE"

- id: app
  label: Launch Application
  kind: action
  command: "#APP {app}\r"
  params:
    - name: app
      type: string
      description: "DIS, MUS, PHO, MOV, NET, SET"

- id: set_sacd_priority
  label: Set SACD Priority
  kind: action
  command: "#SSD {prio}\r"
  params:
    - name: prio
      type: string
      description: "M=Multi-channel, S=Stereo, C=CD Mode"

- id: set_sacd_output
  label: Set SACD Output Mode
  kind: action
  command: "#SDP {mode}\r"
  params:
    - name: mode
      type: string
      description: "D=Output DSD, P=Output PCM, A=Auto"

- id: set_forward_speed
  label: Set Fast/Slow Forward Speed
  kind: action
  command: "#FWD {speed}\r"
  params:
    - name: speed
      type: string
      description: "1/32, 1/16, 1/8, 1/4, 1/2, 1, 2, 3, 4, 5"

- id: set_reverse_speed
  label: Set Fast/Slow Reverse Speed
  kind: action
  command: "#REV {speed}\r"
  params:
    - name: speed
      type: string
      description: "1/32, 1/16, 1/8, 1/4, 1/2, 1, 2, 3, 4, 5 (slow reverse not for UHD)"

- id: q_directory_item
  label: Query Directory Item
  kind: action
  command: "#QDR {index}\r"
  params:
    - name: index
      type: integer
      description: "1-based index of file/item in current directory listing"
```

## Feedbacks
```yaml
# Response codes per command are listed inline in the Actions section.
# Observed states (also surfaced as status updates when verbose >= 2):
- id: power_state
  type: enum
  values: [on, off]

- id: playback_state
  type: enum
  values: [play, pause, stop, step, frev, ffwd, sfwd, srev, setup, home_menu, media_center, screen_saver, disc_menu, load, open, clos]

- id: disc_type
  type: enum
  values: [uhbd, bdmv, dvdv, dvda, sacd, cdda, data, vcd2, svcd, unkw, no_disc]

- id: volume_level
  type: integer
  range: 0..100

- id: mute_state
  type: enum
  values: [mute, unmute]

- id: input_source
  type: enum
  values: [bd_player, hdmi_in, arc_hdmi_out, optical_in, coaxial_in, usb_audio_in]
```

## Events
```yaml
# Verbose mode 2+ unsolicited status updates.
# Format: @<code> <params>\r
- id: upw
  description: Power Status Update
  format: "@UPW {state}\r"
  values: ["1", "0"]

- id: upl
  description: Playback Status Update
  format: "@UPL {state}\r"
  values: ["DISC", "LOAD", "OPEN", "CLOS", "PLAY", "PAUS", "STOP", "STPF", "STPR", "FFW1..FFW5", "FRV1..FRV5", "SFW1..SFW5", "SRV1..SRV5", "HOME", "MCTR", "SCSV", "MENU"]

- id: uvl
  description: Volume Level Update
  format: "@UVL {level}\r"
  values: ["MUT", "000..100"]

- id: udt
  description: Disc Type Update
  format: "@UDT {type}\r"
  values: ["UHBD", "BDMV", "DVDV", "DVDA", "SACD", "CDDA", "DATA", "VCD2", "SVCD", "UNKW"]

- id: uat
  description: Audio Type Update
  format: "@UAT {type} {nn/nn} {lang} {ch}\r"
  type_codes: ["DD", "DP", "DT", "TS", "TH", "TM", "PC", "MP", "CD", "UN"]

- id: ust
  description: Subtitle Type Update
  format: "@UST {nn/nn} {lang}\r"

- id: uis
  description: Input Source Update
  format: "@UIS {n} {name}\r"

- id: u3d
  description: 3D Status Update
  format: "@U3D {state}\r"
  values: ["3D", "2D"]

- id: uar
  description: Aspect Ratio Status Update
  format: "@UAR {code}\r"
  values: ["16WW", "16AW", "16A4", "21M0", "21M1", "21M2", "21F0", "21F1", "21F2", "21C0", "21C1", "21C2"]

- id: utc
  description: Time Code Update (verbose 3)
  format: "@UTC {ttt} {ccc} {type} {hh:mm:ss}\r"
  type_codes: ["E", "R", "T", "X", "C", "K"]

- id: uvo
  description: Video Resolution Update (verbose 3)
  format: "@UVO {source} {output}\r"
  source_or_output: ["_480I60", "_480P60", "_576I50", "_576P50", "_720P60", "_720P50", "1080I60", "1080I50", "1080P60", "1080P50", "1080P24", "1080P23", "_UHD60_", "_UHD24_", "_UHD50_", "_OTHER_"]
```

## Variables
```yaml
# Settable numeric/string parameters are encoded inline in their action's command template.
# No standalone variables beyond action params.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences beyond the documented
# GOTO workflow (GOT + numerics + SEL).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Protocol text is identical for UDP-203 and UDP-205 except where noted: SIS parameters 3 (OPTICAL-IN), 4 (COAXIAL-IN), and 5 (USB-AUDIO-IN) are UDP-205 only.
- RS-232 is DCE on a female DB-9; use a straight-through cable, NOT null-modem.
- IP control is carried over TCP (port 23), NOT telnet — a telnet client will fragment keystrokes and break the protocol. Use "Packet Sender" for ad-hoc testing.
- Player broadcasts a UDP discovery message every 10s to 239.255.255.251:7624 in the form:
  `Notify: OPPO Player Start\nServer IP: <ip> Server Port: 23 Server Name: <name>`
- Verbose mode controls response format. Mode 0 (default) omits the echoed command code in responses for BDP-8x/9x/10x compatibility. Modes 2 and 3 add unsolicited status update messages.
- Client must wait for a response before issuing the next command. No response after 10s => retransmit.
- Max command length: 25 bytes including `#` start and CR/LF end. Max response length: 25 bytes including `@` start and CR end.
- `#` (0x23) must never appear in parameters. `@` (0x40) must never appear in response parameters.
- GO TO multi-key sequences: send GOT, then numeric keys, then SEL — player responds to each individually, then OK/ER on the final SEL.

<!-- UNRESOLVED: firmware version range compatibility above UDP20X-54-1127 not stated. -->

## Provenance

```yaml
source_domains:
  - download.oppodigital.com
  - oppodigital.com
source_urls:
  - http://download.oppodigital.com/UDP203/OPPO_UDP-20X_RS-232_and_IP_Control_Protocol.pdf
  - http://download.oppodigital.com/BDP103/BDP-103_RS232_Protocol_v1.1.pdf
  - https://www.oppodigital.com/support/blu-ray-bdp-83/BDP83_RS232_Protocol_v2.1.pdf
retrieved_at: 2026-06-12T03:05:37.528Z
last_checked_at: 2026-06-12T19:27:41.177Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:27:41.177Z
matched_actions: 118
action_count: 118
confidence: medium
summary: "All 118 spec actions matched verbatim in source; transport parameters (port 23, baud 9600) confirmed; complete bidirectional coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "UDP discovery broadcast address 239.255.255.251:7624 is documented but is a discovery helper, not a control channel."
- "source does not document multi-step macro sequences beyond the documented"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version range compatibility above UDP20X-54-1127 not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
