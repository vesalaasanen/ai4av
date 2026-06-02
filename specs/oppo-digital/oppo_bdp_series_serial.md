---
spec_id: admin/oppo-bdp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "OPPO BDP Series Control Spec"
manufacturer: "OPPO Digital"
model_family: BDP-83
aliases: []
compatible_with:
  manufacturers:
    - "OPPO Digital"
  models:
    - BDP-83
    - BDP-93
    - BDP-95
    - BDP-103
    - BDP-105
  firmware: "MCU103-05-0914 (BDP-103) / MCU105-04-0914 (BDP-105) / Main BDP10X-29-0915 or newer; backwards compatible to BDP-83 and BDP-93/95"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - download.oppodigital.com
source_urls:
  - http://download.oppodigital.com/BDP103/BDP-103_RS232_Protocol_v1.1.pdf
retrieved_at: 2026-05-04T15:18:13.223Z
last_checked_at: 2026-06-02T17:23:37.432Z
generated_at: 2026-06-02T17:23:37.432Z
firmware_coverage: "MCU103-05-0914 (BDP-103) / MCU105-04-0914 (BDP-105) / Main BDP10X-29-0915 or newer; backwards compatible to BDP-83 and BDP-93/95"
protocol_coverage: []
known_gaps:
  - "source contains illustrative example sequences (power on -> eject -> play"
  - "source contains no safety warnings, interlocks, or power-on sequencing"
  - "exact behaviour of FREV/FFWD/SFWD/SREV speed-level mapping in playback status query (QPL) is not stated beyond the verbose-mode FFWn/FRVn/SFWn/SRVn definitions."
  - "full enumeration of QHD response values not stated — source lists only \"480P\", \"720P50\", \"1080P60\", \"AUTO\" as examples."
  - "response format for #SRC (INPUT button) not stated beyond \"OK\"."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:37.432Z
  matched_actions: 99
  action_count: 99
  confidence: medium
  summary: "All 99 spec actions matched verbatim in source; all transport parameters verified; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# OPPO BDP Series Control Spec

## Summary
OPPO BDP-103/105 Blu-ray Disc Player RS-232 control protocol (Version 1.1, October 22, 2012). Extension of the original BDP-83 protocol; backwards compatible with BDP-83 and BDP-93/95 controllers. ASCII command set with `#`-prefixed 3-letter command codes terminated by CR, returning short or verbose `@`-prefixed responses, plus optional unsolicited status update messages. Uses a DCE-configured female 9-pin D-Sub connector with a straight-through DB9 cable (do NOT use a null-modem cable).

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
  connector: DB9 female (DCE)  # source: "female 9-pin D-Sub type connector"
  pinout:
    pin_2: TXD
    pin_3: RXD
    pin_5: GND
  cable: straight-through DB9  # source: "Do NOT use a Null-Modem type cable"
auth:
  type: none  # inferred: no auth procedure in source
framing:
  command_start: "#"          # ASCII 0x23
  command_end: "\r"           # ASCII 0x0d (CR)
  response_start: "@"         # ASCII 0x40
  response_end: "\r"          # ASCII 0x0d (CR)
  field_separator: " "        # ASCII 0x20 (space)
  max_command_bytes: 25
  max_response_bytes: 25
  response_timeout_seconds: 10  # host may consider command lost after 10s
  result_codes: [OK, ER]
  verbose_modes:
    - 0  # short response (default)
    - 1  # commands echoed in response
    - 2  # unsolicited major status updates
    - 3  # unsolicited detailed status updates incl. per-second time code
```

## Traits
```yaml
- powerable    # inferred from PON/POF/POW power command examples
- queryable    # inferred from QPW/QVR/QVL/... query command examples
- levelable    # inferred from SVL volume set command
- routable     # inferred from SIS input-source routing command
```

## Actions
```yaml
# --- Section A: Remote-button-mapped commands (no parameters) ---

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "#POW\r"
  params: []
  notes: Toggle power between STANDBY and ON. Response example "OK ON" or "OK OFF".

- id: select_input_source_button
  label: Select Input Source (INPUT button)
  kind: action
  command: "#SRC\r"
  params: []

- id: tray_open_close
  label: Open/Close Disc Tray
  kind: action
  command: "#EJT\r"
  params: []
  notes: Response example "OK OPEN" or "OK CLOSE".

- id: power_on_discrete
  label: Power On (Discrete)
  kind: action
  command: "#PON\r"
  params: []
  notes: Discrete on. Response "OK ON".

- id: power_off_discrete
  label: Power Off (Discrete)
  kind: action
  command: "#POF\r"
  params: []
  notes: Discrete off. Response "OK OFF".

- id: tv_system_cycle
  label: Switch Output TV System (P/N)
  kind: action
  command: "#SYS\r"
  params: []
  notes: Cycles NTSC / PAL / MULTI(AUTO). Response "OK NTSC" / "OK PAL" / "OK AUTO".

- id: dimmer
  label: Front Panel Dimmer
  kind: action
  command: "#DIM\r"
  params: []
  notes: Response "OK ON" / "OK DIM" / "OK OFF".

- id: pure_audio
  label: Pure Audio Mode
  kind: action
  command: "#PUR\r"
  params: []
  notes: Response "OK ON" / "OK OFF".

- id: volume_up
  label: Volume Up
  kind: action
  command: "#VUP\r"
  params: []
  notes: Response "OK n" where n = 0-100.

- id: volume_down
  label: Volume Down
  kind: action
  command: "#VDN\r"
  params: []
  notes: Response "OK n" where n = 0-100.

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "#MUT\r"
  params: []
  notes: Response "OK MUTE" / "OK UNMUTE".

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

- id: goto
  label: GOTO (Play From Specified Location)
  kind: action
  command: "#GOT\r"
  params: []

- id: home_menu
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

- id: osd_toggle
  label: Show/Hide On-Screen Display
  kind: action
  command: "#OSD\r"
  params: []

- id: top_menu
  label: Top Menu / DVD Title Menu
  kind: action
  command: "#TTL\r"
  params: []

- id: popup_menu
  label: Pop-Up Menu / DVD Menu
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

- id: setup_menu
  label: Setup Menu
  kind: action
  command: "#SET\r"
  params: []

- id: return_menu
  label: Return To Previous Menu
  kind: action
  command: "#RET\r"
  params: []

- id: color_red
  label: Red Function Key
  kind: action
  command: "#RED\r"
  params: []

- id: color_green
  label: Green Function Key
  kind: action
  command: "#GRN\r"
  params: []

- id: color_blue
  label: Blue Function Key
  kind: action
  command: "#BLU\r"
  params: []

- id: color_yellow
  label: Yellow Function Key
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

- id: previous_chapter
  label: Skip To Previous
  kind: action
  command: "#PRE\r"
  params: []

- id: fast_reverse
  label: Fast Reverse Play
  kind: action
  command: "#REV\r"
  params: []
  notes: Response "OK 1X" (and other speed levels).

- id: fast_forward
  label: Fast Forward Play
  kind: action
  command: "#FWD\r"
  params: []
  notes: Response "OK 1X" (and other speed levels).

- id: next_chapter
  label: Skip To Next
  kind: action
  command: "#NXT\r"
  params: []

- id: audio_language
  label: Change Audio Language/Channel
  kind: action
  command: "#AUD\r"
  params: []

- id: subtitle_language
  label: Change Subtitle Language
  kind: action
  command: "#SUB\r"
  params: []

- id: angle
  label: Change Camera Angle
  kind: action
  command: "#ANG\r"
  params: []
  notes: Response "OK a/b" where a = current angle, b = total available angles.

- id: zoom_button
  label: Zoom In/Out (button)
  kind: action
  command: "#ZOM\r"
  params: []
  notes: Response "OK (zoom ratio text)".

- id: sap_toggle
  label: Secondary Audio Program Toggle
  kind: action
  command: "#SAP\r"
  params: []
  notes: Response "OK (audio track info)" or "OK Off".

- id: ab_repeat
  label: AB Repeat
  kind: action
  command: "#ATB\r"
  params: []
  notes: Response cycles "OK A-" / "OK A-B" / "OK OFF".

- id: repeat_button
  label: Repeat Play (button)
  kind: action
  command: "#RPT\r"
  params: []
  notes: Response "OK Repeat Chapter" / "OK Repeat Title" / "OK OFF".

- id: pip_toggle
  label: Show/Hide Picture-in-Picture
  kind: action
  command: "#PIP\r"
  params: []
  notes: Response "OK (PIP program info)" / "OK Off".

- id: resolution_button
  label: Switch Output Resolution (button)
  kind: action
  command: "#HDM\r"
  params: []

- id: subtitle_hold
  label: Subtitle Shift Activate (SUBTITLE hold)
  kind: action
  command: "#SUH\r"
  params: []

- id: launch_netflix_button
  label: Launch Netflix (button)
  kind: action
  command: "#NFX\r"
  params: []

- id: launch_vudu_button
  label: Launch VUDU (button)
  kind: action
  command: "#VDU\r"
  params: []

- id: option_menu
  label: Show/Hide Option Menu
  kind: action
  command: "#OPT\r"
  params: []

- id: menu_3d
  label: 3D Conversion / Adjustment Menu
  kind: action
  command: "#M3D\r"
  params: []

- id: picture_adjustment_menu
  label: Display Picture Adjustment Menu
  kind: action
  command: "#SEH\r"
  params: []

- id: no_operation
  label: No Operation
  kind: action
  command: "#NOP\r"
  params: []

# --- Section C: Advanced commands (parameterized) ---

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "#SVM {mode}\r"
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]
      description: 0 = off (short response), 1 = echo command code in response, 2 = enable major status updates, 3 = enable detailed status updates incl. per-second time code.

- id: set_hdmi_resolution
  label: Set HDMI Output Resolution
  kind: action
  command: "#SHD {resolution}\r"
  params:
    - name: resolution
      type: enum
      values: [SDI, SDP, 720P, 1080I, 1080P, SRC, AUTO]
      description: SDI = SD interlaced (480i/576i), SDP = SD progressive (480p/576p), SRC = Source Direct, AUTO = auto.

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
      values: [1, AR, FS, US, "1.2", "1.3", "1.5", 2, 3, 4, "1/2", "1/3", "1/4"]
      description: HDMI Output supports 1/AR/FS/US/1.2/1.3/1.5/2/1/2; Component Output supports 1/2/3/4/1/2/1/3/1/4. AR = Aspect Ratio correction, FS = Full Screen, US = Underscan.

- id: set_volume
  label: Set Volume
  kind: action
  command: "#SVL {level}\r"
  params:
    - name: level
      type: string
      description: Integer 0-100 or literal "MUTE".

- id: set_repeat_mode
  label: Set Repeat Mode
  kind: action
  command: "#SRP {mode}\r"
  params:
    - name: mode
      type: enum
      values: [CH, TT, ALL, OFF, SHF, RND]
      description: CH = Chapter, TT = Title/CD track, ALL = All, OFF = Off, SHF = Shuffle, RND = Random.

- id: search_to_position
  label: Search To Position
  kind: action
  command: "#SRH {target}\r"
  params:
    - name: target
      type: string
      description: 'Examples - "T3" search to Title 3; "C10" search to Chapter 10; "C 0:00:34" search inside current chapter/track; "T 0:12:13" or "0:12:13" search inside current title/disc.'

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
  notes: Clears all command buffers; does not wait for pending/executing commands. Start over again.

- id: set_subtitle_shift
  label: Set Subtitle Shift
  kind: action
  command: "#SSH {shift}\r"
  params:
    - name: shift
      type: integer
      description: Range -5 to 5 inclusive.

- id: set_osd_position
  label: Set OSD Position
  kind: action
  command: "#SOP {position}\r"
  params:
    - name: position
      type: integer
      description: Range 0 to 5 inclusive.

- id: set_time_display
  label: Set Time Information Display
  kind: action
  command: "#STC {code}\r"
  params:
    - name: code
      type: enum
      values: [E, R, T, X, C, K]
      description: E = Total Elapsed, R = Total Remaining, T = Title Elapsed, X = Title Remaining, C = Chapter/track Elapsed, K = Chapter/track Remaining.

- id: set_input_source
  label: Set Input Source
  kind: action
  command: "#SIS {source}\r"
  params:
    - name: source
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7]
      description: 0 = BD-PLAYER, 1 = HDMI/MHL IN-FRONT, 2 = HDMI IN-BACK, 3 = ARC on HDMI OUT1, 4 = ARC on HDMI OUT2, 5 = OPTICAL IN, 6 = COAXIAL IN, 7 = USB AUDIO IN. Note - values 5/6/7 are invalid on BDP-103.

- id: launch_application
  label: Launch Application
  kind: action
  command: "#APP {app}\r"
  params:
    - name: app
      type: enum
      values: [NFX, YOU, VUD, PAN, FFR, PIC, RHA, CIN]
      description: NFX = Netflix, YOU = YouTube, VUD = VUDU, PAN = Pandora, FFR = FilmFresh, PIC = Picasa, RHA = Rhapsody, CIN = CinemaNow.

# --- Section B: Query commands (kind: query) ---

- id: query_verbose_mode
  label: Query Verbose Mode
  kind: query
  command: "#QVM\r"
  params: []
  notes: Response "OK 0|1|2|3".

- id: query_power
  label: Query Power Status
  kind: query
  command: "#QPW\r"
  params: []
  notes: Response "OK ON" or "OK OFF".

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "#QVR\r"
  params: []
  notes: Response example "OK BDP103-xx-xxxx".

- id: query_volume
  label: Query Volume
  kind: query
  command: "#QVL\r"
  params: []
  notes: Response "OK n" (0-100) or "OK MUTE".

- id: query_hdmi_resolution
  label: Query HDMI Resolution
  kind: query
  command: "#QHD\r"
  params: []
  notes: Response examples "OK 480P", "OK 720P50", "OK 1080P60", "OK AUTO".

- id: query_playback_status
  label: Query Playback Status
  kind: query
  command: "#QPL\r"
  params: []
  notes: 'Response one of: NO DISC, LOADING, OPEN, CLOSE, PLAY, PAUSE, STOP, STEP, FREV, FFWD, SFWD, SREV, SETUP, HOME MENU, MEDIA CENTER.'

- id: query_track_title
  label: Query Track/Title
  kind: query
  command: "#QTK\r"
  params: []
  notes: Response example "OK 02/10" (current/total).

- id: query_chapter
  label: Query Chapter
  kind: query
  command: "#QCH\r"
  params: []
  notes: Response example "OK 03/03" (current/total).

- id: query_track_elapsed
  label: Query Track/Title Elapsed Time
  kind: query
  command: "#QTE\r"
  params: []
  notes: Response HH:MM:SS, example "OK 00:01:34".

- id: query_track_remaining
  label: Query Track/Title Remaining Time
  kind: query
  command: "#QTR\r"
  params: []
  notes: Response HH:MM:SS, example "OK 01:20:23".

- id: query_chapter_elapsed
  label: Query Chapter Elapsed Time
  kind: query
  command: "#QCE\r"
  params: []
  notes: Response HH:MM:SS.

- id: query_chapter_remaining
  label: Query Chapter Remaining Time
  kind: query
  command: "#QCR\r"
  params: []
  notes: Response HH:MM:SS.

- id: query_total_elapsed
  label: Query Total Elapsed Time
  kind: query
  command: "#QEL\r"
  params: []
  notes: Response HH:MM:SS.

- id: query_total_remaining
  label: Query Total Remaining Time
  kind: query
  command: "#QRE\r"
  params: []
  notes: Response HH:MM:SS.

- id: query_disc_type
  label: Query Disc Type
  kind: query
  command: "#QDT\r"
  params: []
  notes: 'Response one of: BD-MV, DVD-VIDEO, DVD-AUDIO, SACD, CDDA, HDCD, DATA-DISC.'

- id: query_audio_type
  label: Query Audio Type
  kind: query
  command: "#QAT\r"
  params: []
  notes: Response examples "OK DD 1/1", "OK DD 1/5 English", "OK DTS 2/5 English", "OK LPCM", "OK DTS-HD 1/4 English".

- id: query_subtitle_type
  label: Query Subtitle Type
  kind: query
  command: "#QST\r"
  params: []
  notes: Response examples "OK OFF" or "OK 1/1 English".

- id: query_subtitle_shift
  label: Query Subtitle Shift
  kind: query
  command: "#QSH\r"
  params: []
  notes: Returns -5 .. 0 .. 5.

- id: query_osd_position
  label: Query OSD Position
  kind: query
  command: "#QOP\r"
  params: []
  notes: Returns 0 .. 5.

- id: query_repeat_mode
  label: Query Repeat Mode
  kind: query
  command: "#QRP\r"
  params: []
  notes: 'Response "OK <code> <text>" - 00 Off, 01 Repeat One, 02 Repeat Chapter, 03 Repeat All, 04 Repeat Title, 05 Shuffle, 06 Random.'

- id: query_zoom_mode
  label: Query Zoom Mode
  kind: query
  command: "#QZM\r"
  params: []
  notes: 'Response "OK <code>" - 00 Off, 01 Stretch, 02 Full, 03 Underscan, 04 1.2x, 05 1.3x, 06 1.5x, 07 2x, 08 3x, 09 4x, 10 1/2, 11 1/3, 12 1/4.'

- id: query_input_source
  label: Query Input Source
  kind: query
  command: "#QIS\r"
  params: []
  notes: 'Response "OK <n> <name>" - 0 BD-PLAYER, 1 HDMI-FRONT, 2 HDMI-BACK, 3 ARC-HDMI-OUT1, 4 ARC-HDMI-OUT2, 5 OPTICAL, 6 COAXIAL, 7 USB-AUDIO.'
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, OFF]
  source_command: "#QPW\r"

- id: verbose_mode_state
  type: enum
  values: [0, 1, 2, 3]
  source_command: "#QVM\r"

- id: firmware_version
  type: string
  description: Firmware version string, e.g. "BDP103-xx-xxxx".
  source_command: "#QVR\r"

- id: volume_level
  type: string
  description: Integer 0-100 or literal "MUTE".
  source_command: "#QVL\r"

- id: hdmi_output_resolution
  type: enum
  values: [480P, 720P50, 1080P60, AUTO]  # examples from source
  source_command: "#QHD\r"
  notes: Other resolutions may be returned; source lists these as examples.

- id: playback_status
  type: enum
  values:
    - NO DISC
    - LOADING
    - OPEN
    - CLOSE
    - PLAY
    - PAUSE
    - STOP
    - STEP
    - FREV
    - FFWD
    - SFWD
    - SREV
    - SETUP
    - HOME MENU
    - MEDIA CENTER
  source_command: "#QPL\r"

- id: track_title_position
  type: string
  description: "Current/total in NN/NN form, e.g. 02/10."
  source_command: "#QTK\r"

- id: chapter_position
  type: string
  description: "Current/total in NN/NN form, e.g. 03/03."
  source_command: "#QCH\r"

- id: track_elapsed_time
  type: string
  description: HH:MM:SS.
  source_command: "#QTE\r"

- id: track_remaining_time
  type: string
  description: HH:MM:SS.
  source_command: "#QTR\r"

- id: chapter_elapsed_time
  type: string
  description: HH:MM:SS.
  source_command: "#QCE\r"

- id: chapter_remaining_time
  type: string
  description: HH:MM:SS.
  source_command: "#QCR\r"

- id: total_elapsed_time
  type: string
  description: HH:MM:SS.
  source_command: "#QEL\r"

- id: total_remaining_time
  type: string
  description: HH:MM:SS.
  source_command: "#QRE\r"

- id: disc_type
  type: enum
  values: [BD-MV, DVD-VIDEO, DVD-AUDIO, SACD, CDDA, HDCD, DATA-DISC]
  source_command: "#QDT\r"

- id: audio_type
  type: string
  description: 'Format: "<type> <n/total> [language] [channels]". Types include DD, DP, DT, TS, TH, TM, PC, MP, CD, UN.'
  source_command: "#QAT\r"

- id: subtitle_type
  type: string
  description: '"OFF" or "<n/total> <language>".'
  source_command: "#QST\r"

- id: subtitle_shift
  type: integer
  range: [-5, 5]
  source_command: "#QSH\r"

- id: osd_position
  type: integer
  range: [0, 5]
  source_command: "#QOP\r"

- id: repeat_mode
  type: enum
  values:
    - "00 Off"
    - "01 Repeat One"
    - "02 Repeat Chapter"
    - "03 Repeat All"
    - "04 Repeat Title"
    - "05 Shuffle"
    - "06 Random"
  source_command: "#QRP\r"

- id: zoom_mode
  type: enum
  values:
    - "00 Off"
    - "01 Stretch"
    - "02 Full"
    - "03 Underscan"
    - "04 1.2x"
    - "05 1.3x"
    - "06 1.5x"
    - "07 2x"
    - "08 3x"
    - "09 4x"
    - "10 1/2"
    - "11 1/3"
    - "12 1/4"
  source_command: "#QZM\r"

- id: input_source
  type: enum
  values:
    - "0 BD-PLAYER"
    - "1 HDMI-FRONT"
    - "2 HDMI-BACK"
    - "3 ARC-HDMI-OUT1"
    - "4 ARC-HDMI-OUT2"
    - "5 OPTICAL"
    - "6 COAXIAL"
    - "7 USB-AUDIO"
  source_command: "#QIS\r"
```

## Variables
```yaml
- id: volume
  type: integer
  range: [0, 100]
  set_command: "#SVL\r"
  query_command: "#QVL\r"
  notes: Also accepts literal MUTE via SVL.

- id: hdmi_output_resolution
  type: enum
  values: [SDI, SDP, 720P, 1080I, 1080P, SRC, AUTO]
  set_command: "#SHD\r"
  query_command: "#QHD\r"

- id: tv_system
  type: enum
  values: [NTSC, PAL, AUTO]
  set_command: "#SPN\r"

- id: zoom_ratio
  type: enum
  values: [1, AR, FS, US, "1.2", "1.3", "1.5", 2, 3, 4, "1/2", "1/3", "1/4"]
  set_command: "#SZM\r"
  query_command: "#QZM\r"

- id: repeat_mode
  type: enum
  values: [CH, TT, ALL, OFF, SHF, RND]
  set_command: "#SRP\r"
  query_command: "#QRP\r"

- id: subtitle_shift
  type: integer
  range: [-5, 5]
  set_command: "#SSH\r"
  query_command: "#QSH\r"

- id: osd_position
  type: integer
  range: [0, 5]
  set_command: "#SOP\r"
  query_command: "#QOP\r"

- id: time_display_type
  type: enum
  values: [E, R, T, X, C, K]
  set_command: "#STC\r"
  notes: Controls which time format is displayed on the front panel and reported by UTC updates.

- id: input_source
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  set_command: "#SIS\r"
  query_command: "#QIS\r"
  notes: Values 5/6/7 are not supported on BDP-103 and return ER INVALID.

- id: verbose_mode
  type: enum
  values: [0, 1, 2, 3]
  set_command: "#SVM\r"
  query_command: "#QVM\r"
```

## Events
```yaml
# Unsolicited status updates sent automatically when verbose mode is 2 or 3.
# All event frames are "@<code> <params>\r".

- id: power_status_update
  code: UPW
  frame: "@UPW {state}\r"
  verbose_mode: 2
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: 1 = player turned on; 0 = player going off.

- id: playback_status_update
  code: UPL
  frame: "@UPL {state}\r"
  verbose_mode: 2
  params:
    - name: state
      type: enum
      values: [DISC, LOAD, OPEN, CLOS, PLAY, PAUS, STOP, STPF, STPR, FFW1, FFW2, FFW3, FFW4, FFW5, FRV1, FRV2, FRV3, FRV4, FRV5, SFW1, SFW2, SFW3, SFW4, SRV1, SRV2, SRV3, SRV4, HOME, MCTR]
      description: 4-char state code. FFWn/FRVn n=1..5 = fast forward/reverse speed; SFWn/SRVn n=1..4 = slow speeds (1=½, 2=¼, 3=1/8, 4=1/16).

- id: volume_level_update
  code: UVL
  frame: "@UVL {value}\r"
  verbose_mode: 2
  params:
    - name: value
      type: string
      description: 'Either "MUT" (mute engaged) or "000".."100" (volume level).'

- id: disc_type_update
  code: UDT
  frame: "@UDT {type}\r"
  verbose_mode: 2
  params:
    - name: type
      type: enum
      values: [BDMV, DVDV, DVDA, SACD, CDDA, HDCD, DATA, VCD2, SVCD]

- id: audio_type_update
  code: UAT
  frame: "@UAT {type} {number} {language} {channels}\r"
  verbose_mode: 2
  params:
    - name: type
      type: enum
      values: [DD, DP, DT, TS, TH, TM, PC, MP, CD, UN]
      description: DD=Dolby Digital, DP=DD+, DT=TrueHD, TS=DTS, TH=DTS-HD HR, TM=DTS-HD MA, PC=LPCM, MP=MPEG, CD=CD Audio, UN=Unknown.
    - name: number
      type: string
      description: '"NN/NN" current/total tracks.'
    - name: language
      type: string
      description: ISO-3166 3-letter code (ENG, FRA, ...) or UNK.
    - name: channels
      type: string
      description: e.g. "1.0", "2.0", "5.1", "7.1", "0.0" for unknown.

- id: subtitle_type_update
  code: UST
  frame: "@UST {number} {language}\r"
  verbose_mode: 2
  params:
    - name: number
      type: string
      description: '"NN/NN" current/total subtitle tracks; "00/xx" if subtitle off.'
    - name: language
      type: string
      description: ISO-3166 3-letter code or UNK.

- id: input_source_update
  code: UIS
  frame: "@UIS {number} {name}\r"
  verbose_mode: 2
  params:
    - name: number
      type: integer
      range: [0, 7]
    - name: name
      type: enum
      values: [BD-PLAYER, HDMI-FRONT, HDMI-BACK, ARC-HDMI-OUT1, ARC-HDMI-OUT2, OPTICAL, COAXIAL, USB-AUDIO]

- id: time_code_update
  code: UTC
  frame: "@UTC {title} {chapter} {type} {time}\r"
  verbose_mode: 3
  params:
    - name: title
      type: string
      description: 3-digit title number; "001" for discs without title numbers (e.g. CD).
    - name: chapter
      type: string
      description: 3-digit chapter or track number.
    - name: type
      type: enum
      values: [E, R, T, X, C, K]
      description: Same set as STC.
    - name: time
      type: string
      description: HH:MM:SS.
  notes: Sent once per second when playback time advances.

- id: video_resolution_update
  code: UVO
  frame: "@UVO {source_resolution} {output_resolution}\r"
  verbose_mode: 3
  params:
    - name: source_resolution
      type: enum
      values: ["_480I60", "_480P60", "_576I50", "_576P50", "_720P60", "_720P50", 1080I60, 1080I50, 1080P60, 1080P50, 1080P24, 1080P23]
    - name: output_resolution
      type: enum
      values: ["_480I60", "_480P60", "_576I50", "_576P50", "_720P60", "_720P50", 1080I60, 1080I50, 1080P60, 1080P50, 1080P24, 1080P23]
      description: Source resolutions below 720p use a leading underscore per source spec.
```

## Macros
```yaml
# UNRESOLVED: source contains illustrative example sequences (power on -> eject -> play
# -> stop -> eject -> power off) but does not declare formal named macros. No macros populated.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing
# requirements beyond the cabling note ("Do NOT use a Null-Modem type cable for PC connection"),
# which is a wiring instruction, not a runtime safety interlock.
```

## Notes
- Protocol revision: Version 1.1, October 22, 2012. Backwards compatible with the BDP-83 and BDP-93/95 protocol; existing controllers do not require reprogramming.
- The host should wait for a response before issuing the next command. If a new command arrives before the previous one finishes, the player MAY discard the previous command.
- If no response arrives within 10 seconds, the host may consider the command lost and retransmit.
- The `#` (0x23) character must never appear inside command parameters; the `@` (0x40) character must never appear inside response parameters.
- Each command and each response is capped at 25 bytes including the start-of-frame and CR terminator.
- Verbose mode 1 echoes the command code in the response (e.g. `@PON OK ON` instead of `@OK ON`). Verbose modes 2 and 3 additionally emit unsolicited `@U***` status updates from front-panel buttons, IR remote, RS-232 commands, and playback progress.
- The `SIS` command rejects values 5/6/7 on the BDP-103 with `ER INVALID`; these audio inputs are BDP-105-only.
- DCE pin assignment: pin 2 = TXD, pin 3 = RXD, pin 5 = GND. Use a straight-through cable, NOT a null-modem cable, when connecting to a PC.
<!-- UNRESOLVED: exact behaviour of FREV/FFWD/SFWD/SREV speed-level mapping in playback status query (QPL) is not stated beyond the verbose-mode FFWn/FRVn/SFWn/SRVn definitions. -->
<!-- UNRESOLVED: full enumeration of QHD response values not stated — source lists only "480P", "720P50", "1080P60", "AUTO" as examples. -->
<!-- UNRESOLVED: response format for #SRC (INPUT button) not stated beyond "OK". -->

## Provenance

```yaml
source_domains:
  - download.oppodigital.com
source_urls:
  - http://download.oppodigital.com/BDP103/BDP-103_RS232_Protocol_v1.1.pdf
retrieved_at: 2026-05-04T15:18:13.223Z
last_checked_at: 2026-06-02T17:23:37.432Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:37.432Z
matched_actions: 99
action_count: 99
confidence: medium
summary: "All 99 spec actions matched verbatim in source; all transport parameters verified; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source contains illustrative example sequences (power on -> eject -> play"
- "source contains no safety warnings, interlocks, or power-on sequencing"
- "exact behaviour of FREV/FFWD/SFWD/SREV speed-level mapping in playback status query (QPL) is not stated beyond the verbose-mode FFWn/FRVn/SFWn/SRVn definitions."
- "full enumeration of QHD response values not stated — source lists only \"480P\", \"720P50\", \"1080P60\", \"AUTO\" as examples."
- "response format for #SRC (INPUT button) not stated beyond \"OK\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
