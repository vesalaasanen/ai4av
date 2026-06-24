---
spec_id: admin/classe-audio-cdp-102-202-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio CDP-102/202 Serial Control Spec"
manufacturer: "Classé"
model_family: CDP-102
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - CDP-102
    - CDP-202
    - CDP-300
    - CDP-502
    - CDT-300
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CDP_102_202_300_502_RS232_Protocol.pdf
retrieved_at: 2026-05-20T19:38:32.915Z
last_checked_at: 2026-06-23T10:38:23.936Z
generated_at: 2026-06-23T10:38:23.936Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no separately documented settable variables beyond commands above"
  - "no multi-step sequences explicitly described in source"
verification:
  verdict: verified
  checked_at: 2026-06-23T10:38:23.936Z
  matched_actions: 88
  action_count: 88
  confidence: medium
  summary: "All 88 spec actions matched verbatim against source; transport 9600/8/N/1 verified; full coverage. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Classe Audio CDP-102/202 Serial Control Spec

## Summary

The Classe Audio CDP-102, CDP-202, CDP-300, CDP-502, and CDT-300 are disc players (CD/DVD/DVD-A) with an RS-232C automation interface. This spec covers the full ASCII command set and status message protocol documented in Classe's Automation Interface Protocol Definition (Revision 1.4, May 2007). Commands use a 4-byte address prefix (e.g. `P300.`) which may be omitted when uniquely connected.

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
- powerable       # inferred from STBY/OPER commands
- queryable       # inferred from STAT query commands returning state
- levelable       # inferred from VOLA/MVOL+/MVOL- volume commands
```

## Actions

```yaml
# Command structure: all commands terminate with <cr><lf>.
# Address prefix "P300." may be prepended (e.g. "P300.PLAY<cr><lf>") but is optional.
# Positive ACK: "!<cr><lf>"; Negative ACK: "?<cr><lf>"

- id: open_tray
  label: Open Tray
  kind: action
  command: "OPEN<cr><lf>"
  notes: Only valid on tray loader units.
  params: []

- id: close_tray
  label: Close Tray
  kind: action
  command: "CLOSE<cr><lf>"
  notes: Only valid on tray loader units.
  params: []

- id: eject_disc
  label: Eject Disc
  kind: action
  command: "EJCT<cr><lf>"
  notes: Only valid on slot loader units.
  params: []

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
  notes: Valid only during pause state on DVD-V disc. Advances to next video frame.
  params: []

- id: unpause
  label: Unpause (Resume)
  kind: action
  command: "UNPS<cr><lf>"
  params: []

- id: next_track
  label: Next Track/Chapter
  kind: action
  command: "NEXT<cr><lf>"
  notes: Skips to next track/chapter on disc or in program.
  params: []

- id: prev_track
  label: Previous Track/Chapter
  kind: action
  command: "PREV<cr><lf>"
  notes: Skips back to previous track/chapter on disc or in program.
  params: []

- id: next_title
  label: Next Title/Group
  kind: action
  command: "NEXT TITLE<cr><lf>"
  notes: Skips to next title or group on DVD-V or DVD-A media.
  params: []

- id: prev_title
  label: Previous Title/Group
  kind: action
  command: "PREV TITLE<cr><lf>"
  notes: Skips to previous title or group on DVD-V or DVD-A media.
  params: []

- id: seek_forward
  label: Seek Forward
  kind: action
  command: "FWD [speed]<cr><lf>"
  notes: >
    Seek forward at specified speed. Only valid if disc is currently playing.
    Speed parameter optional; defaults to 2X.
    CDDA valid speeds: 2X 4X 8X 16X.
    DVD-V/DVD-A valid speeds: 1/8 1/4 1/2 2X 4X 8X 16X 30X 60X.
    MP3/WMA/AAC valid speeds: 4X.
  params:
    - name: speed
      type: string
      description: Playback speed multiplier (optional, defaults to 2X)

- id: seek_reverse
  label: Seek Reverse
  kind: action
  command: "REV [speed]<cr><lf>"
  notes: >
    Seek reverse at specified speed. Only valid if disc is currently playing.
    Speed parameter optional; defaults to 2X.
    CDDA valid speeds: 2X 4X 8X 16X.
    DVD-V/DVD-A valid speeds: 1/8 1/4 1/2 2X 4X 8X 16X 30X 60X.
    MP3/WMA/AAC valid speeds: 4X.
  params:
    - name: speed
      type: string
      description: Playback speed multiplier (optional, defaults to 2X)

- id: slow_forward
  label: Slow Forward
  kind: action
  command: "SFWD<cr><lf>"
  notes: Slow forward at half speed. Only valid if DVD-V disc is currently playing. Repeated commands increase speed.
  params: []

- id: slow_reverse
  label: Slow Reverse
  kind: action
  command: "SREV<cr><lf>"
  notes: Slow reverse at half speed. Only valid if DVD-V disc is currently playing. Repeated commands decrease speed.
  params: []

- id: fast_forward
  label: Fast Forward
  kind: action
  command: "FFWD<cr><lf>"
  notes: Fast forward at double speed (quad speed for MP3/WMA/AAC). Only valid if DVD-V disc is playing. Repeated commands increase speed.
  params: []

- id: fast_reverse
  label: Fast Reverse
  kind: action
  command: "FREV<cr><lf>"
  notes: Fast reverse at double speed (quad speed for MP3/WMA/AAC). Only valid if DVD-V disc is playing. Repeated commands decrease speed.
  params: []

- id: speed_increase
  label: Increase Search Speed
  kind: action
  command: "SPEED+<cr><lf>"
  notes: Increases search speed. Only valid if disc is currently in search mode.
  params: []

- id: speed_decrease
  label: Decrease Search Speed
  kind: action
  command: "SPEED-<cr><lf>"
  notes: Decreases search speed. Only valid if disc is currently in search mode.
  params: []

- id: still_next
  label: Next Still Image
  kind: action
  command: "STILL+<cr><lf>"
  notes: Go to next still image. Only valid for DVD-A media.
  params: []

- id: still_prev
  label: Previous Still Image
  kind: action
  command: "STILL-<cr><lf>"
  notes: Go to previous still image. Only valid for DVD-A media.
  params: []

- id: jump_time
  label: Jump to Time
  kind: action
  command: "JUMP TIME [[hh:]mm:]ss<cr><lf>"
  notes: >
    Jump to a specific time on the disc.
    hh: hours (0-99, optional); mm: minutes (0-59, optional if hh omitted); ss: seconds (0-59).
  params:
    - name: time
      type: string
      description: "Time in [[hh:]mm:]ss format"

- id: jump_title_chapter
  label: Jump to Title/Chapter
  kind: action
  command: "JUMP [tt:]ccc<cr><lf>"
  notes: >
    Jump to a specific title/chapter or group/track.
    tt: title (DVD-V 0-99) or group (DVD-A 0-9), optional.
    ccc: chapter (DVD-V 0-225) or track (CDDA/DVD-A 0-99).
  params:
    - name: title
      type: integer
      description: Title (DVD-V 0-99) or group (DVD-A 0-9); optional
    - name: chapter_track
      type: integer
      description: Chapter (DVD-V 0-225) or track (CDDA/DVD-A 0-99)

- id: track_jump
  label: Jump to Track/Chapter
  kind: action
  command: "TRACK ccc<cr><lf>"
  notes: >
    Jump to a specific chapter or track.
    ccc: chapter (DVD-V 0-225) or track (CDDA/DVD-A 0-99).
  params:
    - name: chapter_track
      type: integer
      description: Chapter (DVD-V 0-225) or track (CDDA/DVD-A 0-99)

- id: title_jump
  label: Jump to Title/Group
  kind: action
  command: "TITLE tt<cr><lf>"
  notes: >
    Jump to a specific title or group.
    tt: title (DVD-V 0-99) or group (DVD-A 0-9).
  params:
    - name: title
      type: integer
      description: Title (DVD-V 0-99) or group (DVD-A 0-9)

- id: shuffle
  label: Shuffle Play
  kind: action
  command: "SHFL<cr><lf>"
  notes: Begins shuffle play of disc. Only valid for CDDA media. (Note: source section 3.27 incorrectly shows OPEN as the command; SHFL is the mnemonic heading.)
  params: []

- id: program_add
  label: Add Track to Program
  kind: action
  command: "PRG+<cr><lf>"
  notes: Adds current selected track to program. Only valid for CDDA media.
  params: []

- id: program_remove
  label: Remove Track from Program
  kind: action
  command: "PRG-<cr><lf>"
  notes: Removes current selected track from program. Only valid for CDDA media.
  params: []

- id: program_clear
  label: Clear Playlist
  kind: action
  command: "PCLR<cr><lf>"
  notes: Clears (empties) the current playlist. Only valid for CDDA media.
  params: []

- id: program_empty
  label: Reset Playlist to TOC
  kind: action
  command: "PEMPTY<cr><lf>"
  notes: Resets the playlist to disc's table of contents. Only valid for CDDA media.
  params: []

- id: save_program
  label: Save Program
  kind: action
  command: "SAVE<cr><lf>"
  notes: Saves the currently constructed program. Only valid for CDDA media.
  params: []

- id: jump_direct_number
  label: Jump by Direct Number (0-255)
  kind: action
  command: "ccc<cr><lf>"
  notes: >
    Jump to a specific chapter or track by entering the number directly.
    ccc: chapter (DVD-V 0-225) or track (CDDA/DVD-A 0-99).
  params:
    - name: number
      type: integer
      description: Chapter (DVD-V 0-225) or track (CDDA/DVD-A 0-99)

- id: repeat_disc
  label: Repeat Disc
  kind: action
  command: "RPDC<cr><lf>"
  notes: Engages repeat disc function.
  params: []

- id: repeat_title
  label: Repeat Title/Group
  kind: action
  command: "RPTT<cr><lf>"
  notes: Engages repeat title function on DVD-V and repeat group function on DVD-A.
  params: []

- id: repeat_track
  label: Repeat Track/Chapter
  kind: action
  command: "RPTK<cr><lf>"
  notes: Engages repeat chapter function on DVD-V and repeat track function on other media.
  params: []

- id: repeat_ab
  label: Repeat A/B
  kind: action
  command: "RPAB<cr><lf>"
  notes: >
    Engages repeat A/B function. First occurrence sets begin point, second occurrence marks end and starts repeat.
    Only supported on DVD-V media.
  params: []

- id: repeat_off
  label: Repeat Off
  kind: action
  command: "RPOF<cr><lf>"
  notes: Turns off all repeat modes.
  params: []

- id: menu_disc
  label: Activate Disc Menu
  kind: action
  command: "MENU DISC<cr><lf>"
  notes: Activates the Disc Menu. Only valid on DVD-V and DVD-A media.
  params: []

- id: menu_title
  label: Activate Title Menu
  kind: action
  command: "MENU TITLE<cr><lf>"
  notes: Activates the Title Menu. Only valid on DVD-V and DVD-A media.
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  command: "UP<cr><lf>"
  notes: Move cursor up.
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  command: "DOWN<cr><lf>"
  notes: Move cursor down.
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  command: "LEFT<cr><lf>"
  notes: Move cursor left.
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  command: "RIGHT<cr><lf>"
  notes: Move cursor right.
  params: []

- id: select
  label: Select
  kind: action
  command: "SELECT<cr><lf>"
  notes: Selects the highlighted item of the menu.
  params: []

- id: subtitle_next
  label: Next Subtitle Track
  kind: action
  command: "SUBT<cr><lf>"
  notes: Selects next available subtitle track. Only available on DVD-V and DVD-A media.
  params: []

- id: audio_next
  label: Next Audio Track
  kind: action
  command: "AUDIO<cr><lf>"
  notes: Selects next available audio track. Only available on DVD-V and DVD-A media.
  params: []

- id: surround_toggle
  label: Toggle Stereo/Surround
  kind: action
  command: "SURR<cr><lf>"
  notes: Toggles between stereo and 5.1 modes.
  params: []

- id: angle_next
  label: Next Camera Angle
  kind: action
  command: "ANGLE<cr><lf>"
  notes: Selects next available camera angle. Only available on DVD-V and DVD-A media.
  params: []

- id: zoom_next
  label: Next Zoom Ratio
  kind: action
  command: "ZOOM<cr><lf>"
  notes: Selects next available zoom ratio. Only available on DVD-V and DVD-A media.
  params: []

- id: aspect_next
  label: Next Aspect Ratio
  kind: action
  command: "ASPECT<cr><lf>"
  notes: Selects next available aspect ratio (16:9 / 4:3 LB / 4:3 PS).
  params: []

- id: volume_set_absolute
  label: Set Volume (Absolute)
  kind: action
  command: "VOLA vvv.v<cr><lf>"
  notes: >
    Sets volume to absolute vvv.v, or nearest possible value.
    Range: 0.0 to 100.0 in 0.5 dB steps.
    Only available if volume control is enabled.
  params:
    - name: level
      type: number
      description: Volume level 0.0–100.0 in 0.5 steps

- id: volume_up
  label: Volume Up
  kind: action
  command: "MVOL+<cr><lf>"
  notes: >
    Increments the volume. Only available if volume control is enabled.
    For system acceleration mode, MVOL+/- commands must be received within 200ms of the unit's reply.
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "MVOL-<cr><lf>"
  notes: >
    Decrements the volume. Only available if volume control is enabled.
    For system acceleration mode, MVOL+/- commands must be received within 200ms of the unit's reply.
  params: []

- id: mute
  label: Mute
  kind: action
  command: "MUTE<cr><lf>"
  notes: Mutes the unit. Only available if volume control is enabled.
  params: []

- id: unmute
  label: Unmute
  kind: action
  command: "UNMT<cr><lf>"
  notes: Un-mutes the unit. Only available if volume control is enabled.
  params: []

- id: lipsync_increase
  label: Lip-Sync Delay Increase
  kind: action
  command: "LSY+<cr><lf>"
  notes: Adds 1 millisecond to the lip-sync delay.
  params: []

- id: lipsync_decrease
  label: Lip-Sync Delay Decrease
  kind: action
  command: "LSY-<cr><lf>"
  notes: Removes 1 millisecond from the lip-sync delay.
  params: []

- id: lipsync_set
  label: Set Lip-Sync Delay
  kind: action
  command: "LSY nnn<cr><lf>"
  notes: Sets the lip-sync delay to the specified value in milliseconds.
  params:
    - name: delay_ms
      type: integer
      description: Lip-sync delay in milliseconds

- id: standby
  label: Standby
  kind: action
  command: "STBY<cr><lf>"
  notes: Puts player into standby mode.
  params: []

- id: operate
  label: Operate (Power On)
  kind: action
  command: "OPER<cr><lf>"
  notes: Puts player into operate mode.
  params: []

- id: lcd_off
  label: LCD Display Off
  kind: action
  command: "LCD0<cr><lf>"
  notes: Sets the front panel LCD off.
  params: []

- id: lcd_low
  label: LCD Display Low Intensity
  kind: action
  command: "LCD1<cr><lf>"
  notes: Sets the front panel LCD to low intensity.
  params: []

- id: lcd_medium
  label: LCD Display Medium Intensity
  kind: action
  command: "LCD2<cr><lf>"
  notes: Sets the front panel LCD to medium intensity.
  params: []

- id: lcd_high
  label: LCD Display High Intensity
  kind: action
  command: "LCD3<cr><lf>"
  notes: Sets the front panel LCD to high intensity.
  params: []

- id: display_disc_elapsed
  label: Display Disc Elapsed Time
  kind: action
  command: "DSCE<cr><lf>"
  notes: Sets the display mode to elapsed time on disc.
  params: []

- id: display_disc_remaining
  label: Display Disc Remaining Time
  kind: action
  command: "DSCR<cr><lf>"
  notes: Sets the display mode to remaining time on disc (default mode when stopped).
  params: []

- id: display_track_elapsed
  label: Display Track Elapsed Time
  kind: action
  command: "TRKE<cr><lf>"
  notes: >
    Sets the display mode to elapsed time on track.
    Note: source section 3.68 shows "DSCE<cr><lf>" as payload but mnemonic heading is TRKE; command is TRKE per section heading.
  params: []

- id: display_track_remaining
  label: Display Track Remaining Time
  kind: action
  command: "TRKR<cr><lf>"
  notes: >
    Sets the display mode to remaining time on track.
    Note: source section 3.69 shows "DSCE<cr><lf>" as payload but mnemonic heading is TRKR; command is TRKR per section heading.
  params: []

- id: stat_system
  label: Query System State
  kind: query
  command: "STAT SYST<cr><lf>"
  notes: Status request for current system state. Response is "SY <status><cr><lf>".
  params: []

- id: stat_auto_enable
  label: Enable Autonomous Status Messages
  kind: action
  command: "STAT AUTO<cr><lf>"
  notes: Enables autonomous status messages. This is the default state.
  params: []

- id: stat_off
  label: Disable Autonomous Status Messages
  kind: action
  command: "STAT OFF<cr><lf>"
  notes: Disables autonomous status messages.
  params: []

- id: stat_disc_time
  label: Query Total Disc Time
  kind: query
  command: "STAT DSCT<cr><lf>"
  notes: Status request for total disc time. Response is "DT tt hh:mm:ss<cr><lf>".
  params: []

- id: stat_track_time
  label: Query Track Time
  kind: query
  command: "STAT TRKT<cr><lf>"
  notes: Status request for track current time. If stopped, returns total track time. Response is "TT ct hh:mm:ss<cr><lf>".
  params: []

- id: stat_disc_info
  label: Query Disc (Album) Info
  kind: query
  command: "STAT DSCI<cr><lf>"
  notes: Status request for ASCII album title. Response is "DI text<cr><lf>".
  params: []

- id: stat_track_info
  label: Query Track Info
  kind: query
  command: "STAT TRKI<cr><lf>"
  notes: Status request for ASCII track title. Response is "TI text<cr><lf>".
  params: []

- id: stat_title
  label: Query Current Title/Group
  kind: query
  command: "STAT TTL<cr><lf>"
  notes: Status request for current selected title or group. Only valid for DVD-V and DVD-A media. Response is "TTL tt<cr><lf>".
  params: []

- id: stat_track
  label: Query Current Track/Chapter
  kind: query
  command: "STAT TRK<cr><lf>"
  notes: Status request for current selected chapter or track. Response is "TRK ccc<cr><lf>".
  params: []

- id: stat_media
  label: Query Media Type
  kind: query
  command: "STAT MEDIA<cr><lf>"
  notes: Status request for current loaded media type. Response is "SY MEDIA mediatype<cr><lf>".
  params: []

- id: stat_main_volume
  label: Query Main Volume
  kind: query
  command: "STAT MAIN<cr><lf>"
  notes: Status request for current main volume. Only available if volume control is enabled. Response is "SY VOLA vv [muted]<cr><lf>" and "SY VOLR svv [muted]<cr><lf>".
  params: []

- id: stat_subtitle
  label: Query Subtitle Track
  kind: query
  command: "STAT SUBT<cr><lf>"
  notes: Status request for current subtitle track information. Only valid for DVD-V and DVD-A media. Response is "SY SUBT language<cr><lf>".
  params: []

- id: stat_audio
  label: Query Audio Track
  kind: query
  command: "STAT AUDIO<cr><lf>"
  notes: Status request for current audio track information. Valid for all media. Response is "SY AUDIO stream samplerate [nCH] [language]<cr><lf>".
  params: []

- id: stat_video
  label: Query Video Info
  kind: query
  command: "STAT VIDEO<cr><lf>"
  notes: Status request for current video information. Only valid on models with a video interface. Response is "SY VIDEO aspect scanning<cr><lf>".
  params: []

- id: stat_lipsync
  label: Query Lip-Sync Delay
  kind: query
  command: "STAT LSY<cr><lf>"
  notes: Status request for current lip-sync information. Response is "SY LSY svvv<cr><lf>".
  params: []

- id: stat_repeat
  label: Query Repeat Mode
  kind: query
  command: "STAT RPT<cr><lf>"
  notes: Status request for current repeat mode. Response is "SY RPT repeat<cr><lf>".
  params: []

- id: stat_random
  label: Query Random Mode
  kind: query
  command: "STAT RNDM<cr><lf>"
  notes: Status request for current random mode. Response is "SY RNDM random<cr><lf>".
  params: []

- id: stat_timemode
  label: Query Display Time Mode
  kind: query
  command: "STAT TMDE<cr><lf>"
  notes: Status request for current display time mode. Response is "SY TMDE timemode<cr><lf>".
  params: []

- id: stat_hdmi
  label: Query HDMI Status
  kind: query
  command: "STAT HDMI<cr><lf>"
  notes: Status request for current HDMI interface information. Only valid on models with an HDMI interface. Response is "SY HDMI status [resolution]<cr><lf>".
  params: []
```

## Feedbacks

```yaml
- id: system_state
  label: System State
  type: enum
  message_format: "SY {status}<cr><lf>"
  values:
    - OPEN       # tray is open (tray loader only)
    - TRAY       # tray is moving (tray loader only)
    - EJCT       # media being ejected (slot loader only)
    - STBY       # player in standby
    - OPER       # player in operating state
    - SPIN       # disc being detected / TOC being read
    - VOID       # no disc in loader
    - PLAY       # disc is playing
    - DVDMENU    # DVD menu is active
    - PRESTOP    # player in pre-stop state
    - STOP       # player in stop state
    - PAUS       # player in pause state
    - "FWD speed" # searching forward at speed
    - "REV speed" # searching reverse at speed
    - ERR        # player in error state
  notes: Triggered by STAT SYST or autonomously on state change.

- id: disc_time
  label: Total Disc Time
  type: string
  message_format: "DT tt hh:mm:ss<cr><lf>"
  notes: >
    tt = number of chapters or tracks (0-255); hh:mm:ss = total disc time.
    Triggered by STAT DSCT, disc insertion, or entering stop state (autonomous).

- id: track_time
  label: Track Current Time
  type: string
  message_format: "TT ct hh:mm:ss<cr><lf>"
  notes: >
    ct = current chapter or track number (0-255); hh:mm:ss = current track time (or total track time if stopped).
    Triggered by STAT TRKT or autonomously on media insertion.

- id: disc_info
  label: Album ASCII Information
  type: string
  message_format: "DI text<cr><lf>"
  notes: Album name and artist name when available. Triggered by STAT DSCI, track selection, or while playing (autonomous).

- id: track_info
  label: Track ASCII Information
  type: string
  message_format: "TI text<cr><lf>"
  notes: Track name when available. Triggered by STAT TRKI, track selection, or while playing (autonomous).

- id: title_status
  label: Current Title/Group
  type: string
  message_format: "TTL tt<cr><lf>"
  notes: tt = title or group number, or "- -" if unknown. Triggered by STAT TTL or on title/group selection (autonomous).

- id: track_status
  label: Current Track/Chapter
  type: string
  message_format: "TRK ccc<cr><lf>"
  notes: ccc = chapter or track number, or "- - -" if unknown. Triggered by STAT TRK or on selection (autonomous).

- id: media_type
  label: Media Type
  type: enum
  message_format: "SY MEDIA mediatype<cr><lf>"
  values:
    - DONE   # loader is empty
    - DVD    # DVD VIDEO disc
    - DVDA   # DVD AUDIO disc
    - CDDA   # CD-DA disc
    - VCD    # VCD disc
    - SVCD   # SVCD disc
    - SACD   # SACD disc
    - DATA   # Data disc (MP3, WMA, AAC)
  notes: Triggered by STAT MEDIA or on disc insertion (autonomous).

- id: volume_absolute
  label: Volume (Absolute)
  type: number
  message_format: "SY VOLA vv [muted]<cr><lf>"
  notes: vv = 0.0–100.0 in 0.5 steps; "muted" appended if unit is muted. Triggered by STAT MAIN or on volume change (autonomous).

- id: volume_relative
  label: Volume (Relative)
  type: number
  message_format: "SY VOLR svv [muted]<cr><lf>"
  notes: svv = -89.0 to +14.0 in 0.5 steps; "muted" appended if unit is muted. Triggered by STAT MAIN or on volume change (autonomous).

- id: subtitle_language
  label: Subtitle Language
  type: string
  message_format: "SY SUBT language<cr><lf>"
  notes: language = current subtitle language name. Only valid for DVD-V and DVD-A. Triggered by STAT SUBT or on subtitle change (autonomous).

- id: audio_stream
  label: Audio Stream Info
  type: string
  message_format: "SY AUDIO stream samplerate [nCH] [language]<cr><lf>"
  notes: >
    stream: DOLBY, WMA, MP3, CDDA, DTS, LPCM, DSDSTEREO, DSDMULTI, DSDDOWNMIX, MUSICAM, SDDS, PCM, DMC, MLP, MPEG1, MPEG2, AAC, HDCD, PNG, NONE.
    samplerate: 8kHz, 11.025kHz, 12kHz, 16kHz, 22.05kHz, 24kHz, 32kHz, 44.1kHz, 48kHz, 64kHz, 88.2kHz, 96kHz, 128kHz, 176.4kHz, 192kHz, SPDIF, NONE.
    nCH: 1-8 (DVD/DVD-A only). language: current language (DVD/DVD-A only).
    Triggered by STAT AUDIO or on audio parameter change (autonomous).

- id: video_info
  label: Video Stream Info
  type: string
  message_format: "SY VIDEO aspect scanning<cr><lf>"
  notes: >
    aspect: 4:3PS, 16:9, 4:3LB, NONE.
    scanning: PROG (progressive), INT (interlaced), NONE.
    Triggered by STAT VIDEO or on video parameter change (autonomous). Only valid on models with video interface.

- id: lipsync_delay
  label: Lip-Sync Delay
  type: integer
  message_format: "SY LSY svvv<cr><lf>"
  notes: svvv = -100 to 100 in 1 ms steps. Triggered by STAT LSY or on lip-sync change (autonomous).

- id: repeat_mode
  label: Repeat Mode
  type: enum
  message_format: "SY RPT repeat<cr><lf>"
  values:
    - RPDC   # repeat disc
    - RPTK   # repeat track or chapter
    - RPA    # repeat A-B (start point only selected)
    - RPAB   # repeat A-B
    - RPTT   # repeat title or group (DVD-V/DVD-A only)
    - OFF    # repeat off
  notes: Triggered by STAT RPT or on repeat mode change (autonomous).

- id: random_mode
  label: Random Mode
  type: enum
  message_format: "SY RNDM random<cr><lf>"
  values:
    - RNDM   # random play
    - SHFL   # shuffle play
    - OFF    # random off
  notes: Triggered by STAT RNDM or on random mode change (autonomous).

- id: time_display_mode
  label: Display Time Mode
  type: enum
  message_format: "SY TMDE timemode<cr><lf>"
  values:
    - TRKE   # track elapsed time
    - TRKR   # track remaining time
    - DSCE   # disc elapsed time
    - DSCR   # disc remaining time
    - OFF    # display off
  notes: Triggered by STAT TMDE or on display time mode change (autonomous).

- id: hdmi_status
  label: HDMI Interface Status
  type: string
  message_format: "SY HDMI status [resolution]<cr><lf>"
  notes: >
    status: INACTIVE (interface inactive); table described as "to be completed" in source.
    resolution: UNKNOWN; table described as "to be completed" in source.
    Triggered by STAT HDMI or on HDMI status/resolution change. Only valid on models with HDMI interface.

- id: ack_positive
  label: Positive Acknowledgement
  type: enum
  message_format: "!<cr><lf>"
  notes: Sent within 100ms of last command termination character. Indicates command was recognized.

- id: ack_negative
  label: Negative Acknowledgement
  type: enum
  message_format: "?<cr><lf>"
  notes: Sent within 100ms of last command termination character. Indicates command was not recognized.
```

## Variables

```yaml
# UNRESOLVED: no separately documented settable variables beyond commands above
```

## Events

```yaml
# Autonomous status messages are unsolicited notifications sent by the player when state changes.
# They can be disabled via "STAT OFF<cr><lf>" and re-enabled via "STAT AUTO<cr><lf>".
# All feedback entries above marked "autonomous" are emitted as events.
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: OPEN and CLOSE commands are only valid on tray loader units; EJCT is only valid on slot loader units.
  - description: STEP is only valid during pause state on DVD-V disc.
  - description: FWD, REV commands are only valid if the disc is currently playing.
  - description: SFWD, SREV, FFWD, FREV commands are only valid if a DVD-V disc is currently playing.
  - description: SPEED+/SPEED- commands are only valid if a disc is currently in search mode.
  - description: STILL+/STILL- commands are only valid for DVD-A media.
  - description: NEXT TITLE, PREV TITLE, MENU DISC, MENU TITLE, SUBT, AUDIO, ANGLE, ZOOM commands are only valid for DVD-V and DVD-A media.
  - description: VOLA, MVOL+, MVOL-, MUTE, UNMT commands are only available if volume control is enabled.
  - description: RPTT repeat mode only applicable to DVD-V and DVD-A media.
  - description: SHFL, PRG+, PRG-, PCLR, PEMPTY, SAVE commands are only valid for CDDA media.
  - description: STAT VIDEO and STAT HDMI queries only valid on models equipped with the respective interface.
```

## Notes

- **Address prefix:** The 4-byte address field (e.g. `P300.`) plus period delimiter may be omitted when the controller connects uniquely to the player. Both `P300.PLAY<cr><lf>` and `PLAY<cr><lf>` are valid.
- **Command acknowledgement timing:** The CDP-300 generates a 3-character reply within 100ms of the last command termination character (line feed). If no reply is received after 100ms, the command should be reissued.
- **FIFO buffer:** No minimum time between bytes is required; the player maintains a 16-byte FIFO.
- **Volume acceleration mode:** For `MVOL+`/`MVOL-` to use system acceleration mode, successive commands must be received within 200ms of the unit's reply.
- **Source document note (TRKE/TRKR commands):** Source sections 3.68 (TRKE) and 3.69 (TRKR) both show `DSCE<cr><lf>` as the command payload — this appears to be a copy-paste error in the source. Commands are authoured per their mnemonic headings (TRKE/TRKR).
- **Source document note (SHFL command):** Source section 3.27 (SHFL) shows `OPEN<cr><lf>` as the command payload — this appears to be a copy-paste error. Command is authoured as SHFL per the section heading.
- **Compatible models:** This document covers CDP-102, CDP-202, CDP-300, CDP-502, and CDT-300. The protocol document uses CDP-300 as the primary reference model; the address field for other models may differ (source does not explicitly state alternative address prefixes for the CDP-102/202/502/CDT-300).
- **DB-9 connector:** The RS-232 port uses a standard DB-9 connector configured as DCE; a regular serial cable can be used to connect to a computer.

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CDP_102_202_300_502_RS232_Protocol.pdf
retrieved_at: 2026-05-20T19:38:32.915Z
last_checked_at: 2026-06-23T10:38:23.936Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T10:38:23.936Z
matched_actions: 88
action_count: 88
confidence: medium
summary: "All 88 spec actions matched verbatim against source; transport 9600/8/N/1 verified; full coverage. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no separately documented settable variables beyond commands above"
- "no multi-step sequences explicitly described in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
