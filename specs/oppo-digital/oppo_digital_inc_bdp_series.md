---
spec_id: admin/oppo-digital-bdp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Oppo Digital BDP Series Control Spec"
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
last_checked_at: 2026-06-02T17:23:38.255Z
generated_at: 2026-06-02T17:23:38.255Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents commands (e.g. SVL, SZM, SRP) but does not enumerate"
  - "source describes a synchronous command/response model; no unsolicited events documented."
  - "source provides an example command sequence (PON → QPW → EJT → PLA → ...)"
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "firmware compatibility range; other BDP-series model coverage (BDP-93/95/103/105 etc.); error code catalogue beyond generic OK/ER."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:38.255Z
  matched_actions: 80
  action_count: 80
  confidence: medium
  summary: "All 80 spec actions matched exactly with source command definitions; all transport parameters verified verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Oppo Digital BDP Series Control Spec

## Summary
OPPO BDP-83 Blu-ray Disc Player with optional RS-232 wired remote-control port (DCE, female DB9). Commands are ASCII frames bracketed by `#` (0x23) start byte and CR (0x0d) terminator; responses use `@` (0x40) start byte with `OK` or `ER` result codes. This spec covers the documented serial command catalogue: IR-mapped buttons, status queries, and advanced single-step actions.

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
- powerable    # inferred from PON/POF/POW discrete power commands
- queryable    # inferred from QPW/QVR/QPL/... query commands
- levelable    # inferred from SVL/VUP/VDN volume commands
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "#POW\r"
  params: []
  notes: Toggle power STANDBY and ON; response OK ON or OK OFF.

- id: source_menu
  label: Source / Home Menu
  kind: action
  command: "#SRC\r"
  params: []

- id: eject_toggle
  label: Open/Close Tray
  kind: action
  command: "#EJT\r"
  params: []
  notes: Response OK OPEN or OK CLOSE.

- id: power_on
  label: Power On (Discrete)
  kind: action
  command: "#PON\r"
  params: []

- id: power_off
  label: Power Off (Discrete)
  kind: action
  command: "#POF\r"
  params: []

- id: tv_system_toggle
  label: Switch Output TV System
  kind: action
  command: "#SYS\r"
  params: []
  notes: Cycles NTSC / PAL / MULTI(AUTO); response OK NTSC, OK PAL, OK AUTO.

- id: dimmer_cycle
  label: Dim Front Panel Display
  kind: action
  command: "#DIM\r"
  params: []
  notes: Response OK ON, OK DIM, OK OFF.

- id: pure_audio_toggle
  label: Pure Audio Mode Toggle
  kind: action
  command: "#PUR\r"
  params: []
  notes: Response OK ON or OK OFF.

- id: volume_up
  label: Volume Up
  kind: action
  command: "#VUP\r"
  params: []
  notes: Response OK n (0-100).

- id: volume_down
  label: Volume Down
  kind: action
  command: "#VDN\r"
  params: []
  notes: Response OK n (0-100).

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "#MUT\r"
  params: []
  notes: Response OK MUTE or OK UNMUTE.

- id: numeric_1
  label: Numeric Key 1
  kind: action
  command: "#NU1\r"
  params: []

- id: numeric_2
  label: Numeric Key 2
  kind: action
  command: "#NU2\r"
  params: []

- id: numeric_3
  label: Numeric Key 3
  kind: action
  command: "#NU3\r"
  params: []

- id: numeric_4
  label: Numeric Key 4
  kind: action
  command: "#NU4\r"
  params: []

- id: numeric_5
  label: Numeric Key 5
  kind: action
  command: "#NU5\r"
  params: []

- id: numeric_6
  label: Numeric Key 6
  kind: action
  command: "#NU6\r"
  params: []

- id: numeric_7
  label: Numeric Key 7
  kind: action
  command: "#NU7\r"
  params: []

- id: numeric_8
  label: Numeric Key 8
  kind: action
  command: "#NU8\r"
  params: []

- id: numeric_9
  label: Numeric Key 9
  kind: action
  command: "#NU9\r"
  params: []

- id: numeric_0
  label: Numeric Key 0
  kind: action
  command: "#NU0\r"
  params: []

- id: clear_numeric
  label: Clear Numeric Input
  kind: action
  command: "#CLR\r"
  params: []

- id: goto_location
  label: Go To Specified Location
  kind: action
  command: "#GOT\r"
  params: []
  notes: Initiates GOTO sequence; follow with numeric key commands and SEL.

- id: home_menu
  label: Go to Home Menu
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

- id: osd_toggle
  label: Show/Hide On-Screen Display
  kind: action
  command: "#OSD\r"
  params: []

- id: top_menu
  label: BD Top Menu / DVD Title Menu
  kind: action
  command: "#TTL\r"
  params: []

- id: popup_menu
  label: BD Pop-up Menu / DVD Menu
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

- id: enter_select
  label: Enter / Select
  kind: action
  command: "#SEL\r"
  params: []

- id: setup_menu
  label: Enter Setup Menu
  kind: action
  command: "#SET\r"
  params: []

- id: return_back
  label: Return To Previous Menu
  kind: action
  command: "#RET\r"
  params: []

- id: color_red
  label: Red Color Key
  kind: action
  command: "#RED\r"
  params: []

- id: color_green
  label: Green Color Key
  kind: action
  command: "#GRN\r"
  params: []

- id: color_blue
  label: Blue Color Key
  kind: action
  command: "#BLU\r"
  params: []

- id: color_yellow
  label: Yellow Color Key
  kind: action
  command: "#YLW\r"
  params: []

- id: stop
  label: Stop Playback
  kind: action
  command: "#STP\r"
  params: []

- id: play
  label: Start Playback
  kind: action
  command: "#PLA\r"
  params: []

- id: pause
  label: Pause Playback
  kind: action
  command: "#PAU\r"
  params: []

- id: previous_track
  label: Skip Previous
  kind: action
  command: "#PREV\r"
  params: []

- id: fast_reverse
  label: Fast Reverse Play
  kind: action
  command: "#REV\r"
  params: []
  notes: Response OK 1 X .. OK 5 X.

- id: fast_forward
  label: Fast Forward Play
  kind: action
  command: "#FWD\r"
  params: []
  notes: Response OK 1 X .. OK 5 X.

- id: next_track
  label: Skip Next
  kind: action
  command: "#NXT\r"
  params: []

- id: audio_language
  label: Change Audio Language/Channel
  kind: action
  command: "#AUD\r"
  params: []
  notes: Response OK followed by audio track info.

- id: subtitle_language
  label: Change Subtitle Language
  kind: action
  command: "#SUB\r"
  params: []
  notes: Response OK followed by subtitle info.

- id: camera_angle
  label: Change Camera Angle
  kind: action
  command: "#ANG\r"
  params: []
  notes: Response OK followed by angle info.

- id: zoom_cycle
  label: Zoom In/Out / Aspect Ratio
  kind: action
  command: "#ZOM\r"
  params: []
  notes: Response OK followed by zoom ratio.

- id: secondary_audio_toggle
  label: Toggle Secondary Audio Program (SAP)
  kind: action
  command: "#SAP\r"
  params: []

- id: ab_repeat
  label: A-B Section Repeat
  kind: action
  command: "#ATB\r"
  params: []
  notes: Response OK A-, OK A-B, OK OFF.

- id: repeat_cycle
  label: Repeat Cycle
  kind: action
  command: "#RPT\r"
  params: []
  notes: Response OK Repeat Chapter / OK Repeat Title / OK OFF.

- id: picture_in_picture
  label: Toggle Picture-in-Picture
  kind: action
  command: "#PIP\r"
  params: []

- id: resolution_cycle
  label: Switch Output Resolution
  kind: action
  command: "#HDM\r"
  params: []

- id: query_power_status
  label: Query Power Status
  kind: query
  command: "#QPW\r"
  params: []
  notes: Response OK ON or OK OFF.

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "#QVR\r"
  params: []
  notes: Response example OK BDP83-14-0306.

- id: query_volume
  label: Query Volume
  kind: query
  command: "#QVL\r"
  params: []
  notes: Response OK 100 or OK MUTE.

- id: query_hdmi_resolution
  label: Query HDMI Resolution
  kind: query
  command: "#QHD\r"
  params: []
  notes: Response OK 480P, OK 720P50, OK 1080P60, etc.

- id: query_playback_status
  label: Query Playback Status
  kind: query
  command: "#QPL\r"
  params: []
  notes: Possible responses include NO DISC, LOADING, OPEN, CLOSE, PLAY, PAUSE, STOP, STEP, FREV, FFWD, SFWD, SREV, SETUP, HOME MENU, MEDIA CENTER.

- id: query_track_title
  label: Query Track/Title Index
  kind: query
  command: "#QTK\r"
  params: []
  notes: Response example OK 2/10.

- id: query_chapter
  label: Query Chapter Index
  kind: query
  command: "#QCH\r"
  params: []
  notes: Response example OK 3/3.

- id: query_track_elapsed
  label: Query Track/Title Elapsed Time
  kind: query
  command: "#QTE\r"
  params: []
  notes: Response example OK 0:1:34.

- id: query_track_remaining
  label: Query Track/Title Remaining Time
  kind: query
  command: "#QTR\r"
  params: []
  notes: Response example OK 1:20:23.

- id: query_chapter_elapsed
  label: Query Chapter Elapsed Time
  kind: query
  command: "#QCE\r"
  params: []
  notes: Response example OK 0:1:34.

- id: query_chapter_remaining
  label: Query Chapter Remaining Time
  kind: query
  command: "#QCR\r"
  params: []
  notes: Response example OK 0:12:22.

- id: query_total_elapsed
  label: Query Total Elapsed Time
  kind: query
  command: "#QEL\r"
  params: []
  notes: Response example OK 0:5:12.

- id: query_total_remaining
  label: Query Total Remaining Time
  kind: query
  command: "#QRE\r"
  params: []
  notes: Response example OK 1:34:44.

- id: query_disc_type
  label: Query Disc Type
  kind: query
  command: "#QDT\r"
  params: []
  notes: Responses BD-MV, DVD-VIDEO, DVD-AUDIO, SACD, CDDA, HDCD, DATA-DISC.

- id: query_audio_type
  label: Query Audio Type
  kind: query
  command: "#QAT\r"
  params: []
  notes: Response example OK DD 1/5 English, OK DTS-HD 1/4 English, OK LPCM, etc.

- id: query_subtitle_type
  label: Query Subtitle Type
  kind: query
  command: "#QST\r"
  params: []
  notes: Response example OK OFF or OK 1/1 English.

- id: set_hdmi_resolution
  label: Set HDMI Output Resolution
  kind: action
  command: "#SHD {resolution}\r"
  params:
    - name: resolution
      type: enum
      values: [SDI, SDP, 720P, 1080I, 1080P, SRC, AUTO]
      description: "SDI=SD interlaced (480i/576i); SDP=SD progressive (480p/576p); SRC=Source Direct."

- id: set_tv_system
  label: Set Output TV System
  kind: action
  command: "#SPN {system}\r"
  params:
    - name: system
      type: enum
      values: [NTSC, PAL, AUTO]

- id: set_zoom_ratio
  label: Set Zoom Ratio
  kind: action
  command: "#SZM {ratio}\r"
  params:
    - name: ratio
      type: enum
      values: ["1", "AR", "FS", "US", "1.2", "1.3", "1.5", "2", "1/2", "3", "4", "1/3", "1/4"]
      description: "HDMI Output: 1, AR, FS, US, 1.2, 1.3, 1.5, 2, 1/2. Component Output: 1, 2, 3, 4, 1/2, 1/3, 1/4. AR=Aspect ratio correction; FS=Full Screen; US=Underscan."

- id: set_volume
  label: Set Volume
  kind: action
  command: "#SVL {value}\r"
  params:
    - name: value
      type: string
      description: "Integer 0-100, or the string MUTE."

- id: set_repeat_mode
  label: Set Repeat Mode
  kind: action
  command: "#SRP {mode}\r"
  params:
    - name: mode
      type: enum
      values: [CH, TT, ALL, OFF, SHF, RND]
      description: "CH=Repeat chapter; TT=Repeat title; ALL=Repeat all; OFF=Repeat off; SHF=Shuffle; RND=Random."

- id: search_to
  label: Search To Location
  kind: action
  command: "#SRH {target}\r"
  params:
    - name: target
      type: string
      description: "Formats per source: T<n> (title), C<n> (chapter), C h:mm:ss (offset within current chapter/track), T h:mm:ss (offset within current title), or h:mm:ss (offset within current title/disc)."

- id: direct_play
  label: Direct Play
  kind: action
  command: "#DPL\r"
  params: []

- id: reset_rs232
  label: Reset RS-232 Command Buffer
  kind: action
  command: "#RST\r"
  params: []
  notes: Clears all command buffers; does not wait for pending commands.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, OFF]
  source_query: query_power_status

- id: volume_level
  type: string
  description: "Integer 0-100 or the literal MUTE."
  source_query: query_volume

- id: hdmi_resolution
  type: string
  description: "Resolution token returned by player (e.g. 480P, 720P50, 1080P60)."
  source_query: query_hdmi_resolution

- id: playback_status
  type: enum
  values: [NO DISC, LOADING, OPEN, CLOSE, PLAY, PAUSE, STOP, STEP, FREV, FFWD, SFWD, SREV, SETUP, HOME MENU, MEDIA CENTER]
  source_query: query_playback_status

- id: track_title_index
  type: string
  description: "Format current/total, e.g. 2/10."
  source_query: query_track_title

- id: chapter_index
  type: string
  description: "Format current/total, e.g. 3/3."
  source_query: query_chapter

- id: track_elapsed_time
  type: string
  description: "h:m:s elapsed in current track/title."
  source_query: query_track_elapsed

- id: track_remaining_time
  type: string
  description: "h:m:s remaining in current track/title."
  source_query: query_track_remaining

- id: chapter_elapsed_time
  type: string
  source_query: query_chapter_elapsed

- id: chapter_remaining_time
  type: string
  source_query: query_chapter_remaining

- id: total_elapsed_time
  type: string
  source_query: query_total_elapsed

- id: total_remaining_time
  type: string
  source_query: query_total_remaining

- id: disc_type
  type: enum
  values: [BD-MV, DVD-VIDEO, DVD-AUDIO, SACD, CDDA, HDCD, DATA-DISC]
  source_query: query_disc_type

- id: audio_type
  type: string
  description: "Free-form audio descriptor (codec, channel layout, language)."
  source_query: query_audio_type

- id: subtitle_type
  type: string
  description: "OFF or 1/1 English etc."
  source_query: query_subtitle_type

- id: firmware_version
  type: string
  description: "Example: BDP83-14-0306."
  source_query: query_firmware_version

- id: command_result
  type: enum
  values: [OK, ER]
  description: "Result code returned in every response frame following the '@' start byte."
```

## Variables
```yaml
# UNRESOLVED: source documents commands (e.g. SVL, SZM, SRP) but does not enumerate
# persistent settable parameters distinct from the action set above.
```

## Events
```yaml
# UNRESOLVED: source describes a synchronous command/response model; no unsolicited events documented.
```

## Macros
```yaml
# UNRESOLVED: source provides an example command sequence (PON → QPW → EJT → PLA → ...)
# but does not declare named macros. The GOTO sequence (GOT + numeric keys + SEL) is a
# multi-step pattern documented in prose only; not formalized here.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Frame format: `#<3-char code>[<sp><params>]<CR>` (start byte `#` = 0x23, terminator CR = 0x0d). Max 25 bytes per frame including start and end bytes.
- Response format: `@<OK|ER>[<sp><message>]<CR>` (start byte `@` = 0x40). The character `#` must never appear in command parameters; the character `@` must never appear in response parameters.
- Host should wait for the player's response before sending the next command. If a new command arrives before the previous completes, the previous may be discarded.
- Host timeout: 10 seconds. If no response by then, retransmission is allowed.
- `RST` clears all command buffers without waiting for pending operations.
- Wiring: female DB9 DCE, straight-through cable (NOT null-modem). Pins: 2=TXD, 3=RXD, 5=GND.
- Source documents only the BDP-83 explicitly; "BDP Series" applicability to other Oppo models is not asserted by this source.
<!-- UNRESOLVED: firmware compatibility range; other BDP-series model coverage (BDP-93/95/103/105 etc.); error code catalogue beyond generic OK/ER. -->

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
last_checked_at: 2026-06-02T17:23:38.255Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:38.255Z
matched_actions: 80
action_count: 80
confidence: medium
summary: "All 80 spec actions matched exactly with source command definitions; all transport parameters verified verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents commands (e.g. SVL, SZM, SRP) but does not enumerate"
- "source describes a synchronous command/response model; no unsolicited events documented."
- "source provides an example command sequence (PON → QPW → EJT → PLA → ...)"
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "firmware compatibility range; other BDP-series model coverage (BDP-93/95/103/105 etc.); error code catalogue beyond generic OK/ER."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
