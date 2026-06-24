---
spec_id: admin/classe-audio-cdp102202300502-series-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio CDP-102/202/300/502 Series Control Spec"
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
retrieved_at: 2026-05-31T18:16:55.847Z
last_checked_at: 2026-06-23T10:38:22.138Z
generated_at: 2026-06-23T10:38:22.138Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no explicit variable/parameter store section in source beyond commands above"
  - "no multi-step macros described in source"
verification:
  verdict: verified
  checked_at: 2026-06-23T10:38:22.138Z
  matched_actions: 88
  action_count: 88
  confidence: medium
  summary: "All 88 spec actions matched verbatim against source; transport 9600/8/N/1 verified; full coverage. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Classe Audio CDP-102/202/300/502 Series Control Spec

## Summary

The Classe Audio CDP-102, CDP-202, CDP-300, CDP-502, and CDT-300 are DVD/CD players controllable via RS-232C serial interface. This spec covers the ASCII command set for transport control, disc navigation, audio/video settings, and status queries as described in the Automation Interface Protocol Definition revision 1.4 (May 2007).

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
# Command structure: address prefix "P300." is optional; terminate all commands with <cr><lf>
# Positive ACK: !<cr><lf>  |  Negative ACK: ?<cr><lf>
# Feedback is sent within 100ms of command termination character.

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
  notes: Start playback of the disc.
  params: []

- id: stop
  label: Stop
  kind: action
  command: "STOP<cr><lf>"
  notes: Stop playback of the disc.
  params: []

- id: pause
  label: Pause
  kind: action
  command: "PAUS<cr><lf>"
  notes: Pause playback of the currently selected track.
  params: []

- id: step_frame
  label: Step Frame
  kind: action
  command: "STEP<cr><lf>"
  notes: Valid only during pause state on DVD-V disc. Advances to next video frame.
  params: []

- id: unpause
  label: Unpause / Resume
  kind: action
  command: "UNPS<cr><lf>"
  notes: Resume playback after pause.
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
  command: "FWD {speed}<cr><lf>"
  notes: >
    Seek forward at specified speed. Only valid while disc is playing.
    Speed parameter is optional; defaults to 2X.
    CDDA: 2X 4X 8X 16X. DVD-V/DVD-A: 1/8 1/4 1/2 2X 4X 8X 16X 30X 60X. MP3/WMA/AAC: 4X.
  params:
    - name: speed
      type: string
      description: "Optional speed value. Examples: 2X, 4X, 8X, 16X, 30X, 60X, 1/8, 1/4, 1/2"

- id: seek_reverse
  label: Seek Reverse
  kind: action
  command: "REV {speed}<cr><lf>"
  notes: >
    Seek reverse at specified speed. Only valid while disc is playing.
    Speed parameter is optional; defaults to 2X.
    CDDA: 2X 4X 8X 16X. DVD-V/DVD-A: 1/8 1/4 1/2 2X 4X 8X 16X 30X 60X. MP3/WMA/AAC: 4X.
  params:
    - name: speed
      type: string
      description: "Optional speed value. Examples: 2X, 4X, 8X, 16X, 30X, 60X, 1/8, 1/4, 1/2"

- id: slow_forward
  label: Slow Forward
  kind: action
  command: "SFWD<cr><lf>"
  notes: Slow forward at half speed. Only valid if a DVD-V disc is currently playing. Repeated commands increase speed.
  params: []

- id: slow_reverse
  label: Slow Reverse
  kind: action
  command: "SREV<cr><lf>"
  notes: Slow reverse at half speed. Only valid if a DVD-V disc is currently playing. Repeated commands decrease speed.
  params: []

- id: fast_forward
  label: Fast Forward
  kind: action
  command: "FFWD<cr><lf>"
  notes: Fast forward at double speed (quad speed for MP3/WMA/AAC). Only valid if a DVD-V disc is currently playing. Repeated commands increase speed.
  params: []

- id: fast_reverse
  label: Fast Reverse
  kind: action
  command: "FREV<cr><lf>"
  notes: Fast reverse at double speed (quad speed for MP3/WMA/AAC). Only valid if a DVD-V disc is currently playing. Repeated commands decrease speed.
  params: []

- id: speed_increase
  label: Increase Search Speed
  kind: action
  command: "SPEED+<cr><lf>"
  notes: Increases the search speed. Only valid while disc is in search mode.
  params: []

- id: speed_decrease
  label: Decrease Search Speed
  kind: action
  command: "SPEED-<cr><lf>"
  notes: Decreases the search speed. Only valid while disc is in search mode.
  params: []

- id: still_next
  label: Next Still Image
  kind: action
  command: "STILL+<cr><lf>"
  notes: Go to the next still image. Only valid for DVD-A media.
  params: []

- id: still_prev
  label: Previous Still Image
  kind: action
  command: "STILL-<cr><lf>"
  notes: Go to the previous still image. Only valid for DVD-A media.
  params: []

- id: jump_time
  label: Jump to Time
  kind: action
  command: "JUMP TIME {time}<cr><lf>"
  notes: >
    Jump to a specific time on the disc.
    Format: [[hh:]mm:]ss — hh (0–99), mm (0–59), ss (0–59).
  params:
    - name: time
      type: string
      description: "Time in format [[hh:]mm:]ss, e.g. 1:23:45 or 23:45 or 45"

- id: jump_title_chapter
  label: Jump to Title/Chapter
  kind: action
  command: "JUMP {tt}:{ccc}<cr><lf>"
  notes: >
    Jump to a specific title/chapter or group/track on the disc.
    tt = title (DVD-V, 0–99) or group (DVD-A, 0–9); optional.
    ccc = chapter (DVD-V, 0–225) or track (CDDA/DVD-A, 0–99).
    If tt omitted, format is just ccc.
  params:
    - name: tt
      type: integer
      description: "Optional title (DVD-V 0–99) or group (DVD-A 0–9)"
    - name: ccc
      type: integer
      description: "Chapter (DVD-V 0–225) or track (CDDA/DVD-A 0–99)"

- id: track_jump
  label: Jump to Chapter/Track
  kind: action
  command: "TRACK {ccc}<cr><lf>"
  notes: Jump to a specific chapter or track on the disc. ccc = chapter (DVD-V, 0–225) or track (CDDA/DVD-A, 0–99).
  params:
    - name: ccc
      type: integer
      description: "Chapter (DVD-V 0–225) or track (CDDA/DVD-A 0–99)"

- id: title_jump
  label: Jump to Title/Group
  kind: action
  command: "TITLE {tt}<cr><lf>"
  notes: Jump to a specific title or group on the disc. tt = title (DVD-V, 0–99) or group (DVD-A, 0–9).
  params:
    - name: tt
      type: integer
      description: "Title (DVD-V 0–99) or group (DVD-A 0–9)"

- id: shuffle
  label: Shuffle Play
  kind: action
  command: "SHFL<cr><lf>"
  notes: Begins shuffle play of disc. Only valid for CDDA media.
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

- id: playlist_clear
  label: Clear Playlist
  kind: action
  command: "PCLR<cr><lf>"
  notes: Clears (empties) the current playlist. Only valid for CDDA media.
  params: []

- id: playlist_reset
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

- id: jump_by_number
  label: Jump to Chapter/Track by Number
  kind: action
  command: "{ccc}<cr><lf>"
  notes: Jump to a specific chapter or track by entering its number directly. ccc = chapter (DVD-V, 0–225) or track (CDDA/DVD-A, 0–99).
  params:
    - name: ccc
      type: integer
      description: "Chapter (DVD-V 0–225) or track (CDDA/DVD-A 0–99)"

- id: repeat_disc
  label: Repeat Disc
  kind: action
  command: "RPDC<cr><lf>"
  notes: Engage repeat disc function.
  params: []

- id: repeat_title
  label: Repeat Title/Group
  kind: action
  command: "RPTT<cr><lf>"
  notes: Engage repeat title function on DVD-V and repeat group function on DVD-A.
  params: []

- id: repeat_track
  label: Repeat Track/Chapter
  kind: action
  command: "RPTK<cr><lf>"
  notes: Engage repeat chapter function on DVD-V and repeat track function on other media types.
  params: []

- id: repeat_ab
  label: Repeat A/B
  kind: action
  command: "RPAB<cr><lf>"
  notes: Engage repeat A/B function. First occurrence sets begin point; second marks end and starts repeat. Only supported on DVD-V media.
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
  notes: Activate the Disc Menu. Only valid on DVD-V and DVD-A media.
  params: []

- id: menu_title
  label: Activate Title Menu
  kind: action
  command: "MENU TITLE<cr><lf>"
  notes: Activate the Title Menu. Only valid on DVD-V and DVD-A media.
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
  notes: Select the highlighted item of the menu.
  params: []

- id: subtitle_next
  label: Next Subtitle Track
  kind: action
  command: "SUBT<cr><lf>"
  notes: Select the next available subtitle track. Only available on DVD-V and DVD-A media.
  params: []

- id: audio_next
  label: Next Audio Track
  kind: action
  command: "AUDIO<cr><lf>"
  notes: Select the next available audio track. Only available on DVD-V and DVD-A media.
  params: []

- id: surround_toggle
  label: Toggle Stereo/5.1
  kind: action
  command: "SURR<cr><lf>"
  notes: Toggles between stereo and 5.1 modes.
  params: []

- id: angle_next
  label: Next Camera Angle
  kind: action
  command: "ANGLE<cr><lf>"
  notes: Select the next available camera angle. Only available on DVD-V and DVD-A media.
  params: []

- id: zoom_next
  label: Next Zoom Ratio
  kind: action
  command: "ZOOM<cr><lf>"
  notes: Select the next available zoom ratio. Only available on DVD-V and DVD-A media.
  params: []

- id: aspect_next
  label: Next Aspect Ratio
  kind: action
  command: "ASPECT<cr><lf>"
  notes: Select the next available aspect ratio (16:9 / 4:3 LB / 4:3 PS).
  params: []

- id: volume_set_absolute
  label: Set Volume (Absolute)
  kind: action
  command: "VOLA {vvv.v}<cr><lf>"
  notes: Sets volume to absolute value vvv.v or nearest possible. Range 0.0–100.0 in 0.5 dB steps. Only available if volume control is enabled.
  params:
    - name: vvv.v
      type: number
      description: "Volume level 0.0–100.0 in 0.5 steps"

- id: volume_up
  label: Volume Up
  kind: action
  command: "MVOL+<cr><lf>"
  notes: Increment the volume. Only available if volume control is enabled. For system acceleration mode, subsequent MVOL+/- commands must be received within 200ms of the system's reply.
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "MVOL-<cr><lf>"
  notes: Decrement the volume. Only available if volume control is enabled. For system acceleration mode, subsequent MVOL+/- commands must be received within 200ms of the system's reply.
  params: []

- id: mute
  label: Mute
  kind: action
  command: "MUTE<cr><lf>"
  notes: Mute the unit. Only available if volume control is enabled.
  params: []

- id: unmute
  label: Unmute
  kind: action
  command: "UNMT<cr><lf>"
  notes: Un-mute the unit. Only available if volume control is enabled.
  params: []

- id: lipsync_increase
  label: Lip-Sync Delay Increase
  kind: action
  command: "LSY+<cr><lf>"
  notes: Add 1 millisecond to the lip-sync delay.
  params: []

- id: lipsync_decrease
  label: Lip-Sync Delay Decrease
  kind: action
  command: "LSY-<cr><lf>"
  notes: Remove 1 millisecond from the lip-sync delay.
  params: []

- id: lipsync_set
  label: Set Lip-Sync Delay
  kind: action
  command: "LSY {nnn}<cr><lf>"
  notes: Set the lip-sync delay to a specific value in milliseconds.
  params:
    - name: nnn
      type: integer
      description: "Lip-sync delay in milliseconds"

- id: standby
  label: Standby
  kind: action
  command: "STBY<cr><lf>"
  notes: Puts CDP-300 into standby mode.
  params: []

- id: operate
  label: Operate
  kind: action
  command: "OPER<cr><lf>"
  notes: Puts CDP-300 into operate mode.
  params: []

- id: lcd_off
  label: LCD Off
  kind: action
  command: "LCD0<cr><lf>"
  notes: Sets the front panel LCD off.
  params: []

- id: lcd_low
  label: LCD Low Intensity
  kind: action
  command: "LCD1<cr><lf>"
  notes: Sets the front panel LCD to low intensity.
  params: []

- id: lcd_medium
  label: LCD Medium Intensity
  kind: action
  command: "LCD2<cr><lf>"
  notes: Sets the front panel LCD to medium intensity.
  params: []

- id: lcd_high
  label: LCD High Intensity
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
  notes: Sets the display mode to elapsed time on track.
  params: []

- id: display_track_remaining
  label: Display Track Remaining Time
  kind: action
  command: "TRKR<cr><lf>"
  notes: Sets the display mode to remaining time on track.
  params: []

- id: stat_system
  label: Query System Status
  kind: query
  command: "STAT SYST<cr><lf>"
  notes: Status request for current system state. Returns SY status message.
  params: []

- id: stat_auto_enable
  label: Enable Autonomous Status Messages
  kind: action
  command: "STAT AUTO<cr><lf>"
  notes: Enable the autonomous status messages. This is the default state of the unit.
  params: []

- id: stat_auto_disable
  label: Disable Autonomous Status Messages
  kind: action
  command: "STAT OFF<cr><lf>"
  notes: Disable the autonomous status messages.
  params: []

- id: stat_disc_time
  label: Query Total Disc Time
  kind: query
  command: "STAT DSCT<cr><lf>"
  notes: Status request for total disc time. Returns DT status message.
  params: []

- id: stat_track_time
  label: Query Track Time
  kind: query
  command: "STAT TRKT<cr><lf>"
  notes: Status request for track current time. If stopped, returns total track time. Returns TT status message.
  params: []

- id: stat_disc_info
  label: Query Disc Info (Album Title)
  kind: query
  command: "STAT DSCI<cr><lf>"
  notes: Status request for ASCII album title. Returns SY DSCI status message.
  params: []

- id: stat_track_info
  label: Query Track Info (Track Title)
  kind: query
  command: "STAT TRKI<cr><lf>"
  notes: Status request for ASCII track title. Returns SY TRKI status message.
  params: []

- id: stat_title
  label: Query Current Title/Group
  kind: query
  command: "STAT TTL<cr><lf>"
  notes: Status request for current selected title or group. Only valid for DVD-V and DVD-A media. Returns SY TTL status message.
  params: []

- id: stat_track
  label: Query Current Chapter/Track
  kind: query
  command: "STAT TRK<cr><lf>"
  notes: Status request for current selected chapter or track. Returns SY TRK status message.
  params: []

- id: stat_media
  label: Query Media Type
  kind: query
  command: "STAT MEDIA<cr><lf>"
  notes: Status request for current loaded media type. Returns SY MEDIA status message.
  params: []

- id: stat_volume
  label: Query Volume
  kind: query
  command: "STAT MAIN<cr><lf>"
  notes: Status request for current main volume. Only available if volume control is enabled. Returns SY VOLA and SY VOLR status messages.
  params: []

- id: stat_subtitle
  label: Query Subtitle Track
  kind: query
  command: "STAT SUBT<cr><lf>"
  notes: Status request for current subtitle track information. Only valid for DVD-V and DVD-A media. Returns SY SUBT status message.
  params: []

- id: stat_audio
  label: Query Audio Track
  kind: query
  command: "STAT AUDIO<cr><lf>"
  notes: Status request for current audio track information. Valid for all media. Returns SY AUDIO status message.
  params: []

- id: stat_video
  label: Query Video Info
  kind: query
  command: "STAT VIDEO<cr><lf>"
  notes: Status request for current video information. Only valid for models equipped with a video interface. Returns SY VIDEO status message.
  params: []

- id: stat_lipsync
  label: Query Lip-Sync Delay
  kind: query
  command: "STAT LSY<cr><lf>"
  notes: Status request for current lip-sync information. Returns SY LSY status message.
  params: []

- id: stat_repeat
  label: Query Repeat Mode
  kind: query
  command: "STAT RPT<cr><lf>"
  notes: Status request for current repeat mode information. Returns SY RPT status message.
  params: []

- id: stat_random
  label: Query Random Mode
  kind: query
  command: "STAT RNDM<cr><lf>"
  notes: Status request for current random mode information. Returns SY RNDM status message.
  params: []

- id: stat_time_mode
  label: Query Display Time Mode
  kind: query
  command: "STAT TMDE<cr><lf>"
  notes: Status request for current display time mode information. Returns SY TMDE status message.
  params: []

- id: stat_hdmi
  label: Query HDMI Info
  kind: query
  command: "STAT HDMI<cr><lf>"
  notes: Status request for current HDMI interface information. Only valid on models equipped with an HDMI interface. Returns SY HDMI status message.
  params: []
```

## Feedbacks

```yaml
- id: system_status
  label: System Status
  type: enum
  format: "SY {status}<cr><lf>"
  values:
    - OPEN       # Tray is open (tray loader units only)
    - TRAY       # Tray is moving (tray loader units only)
    - EJCT       # Media is being ejected (slot loader units only)
    - STBY       # Unit is in standby state
    - OPER       # Unit is in operating state
    - SPIN       # Disc being detected, TOC being read
    - VOID       # No disc in the loader
    - PLAY       # Disc is playing
    - DVDMENU    # DVD-V or DVD-A is executing the DVD Menu
    - PRESTOP    # Player is in pre-stop state
    - STOP       # Player is in stop state
    - PAUS       # Player is in pause state
    - FWD        # Player is searching forward (followed by speed value)
    - REV        # Player is searching reverse (followed by speed value)
    - ERR        # Player is in error state
  notes: Triggered by STAT SYST or autonomously on state change.

- id: disc_time
  label: Total Disc Time
  type: string
  format: "DT {tt} {hh:mm:ss}<cr><lf>"
  notes: >
    tt = number of chapters/tracks (0–255). hh:mm:ss = total disc time.
    Triggered by STAT DSCT, on disc insertion, or on entering stop state when autonomous messages enabled.

- id: track_time
  label: Track Current/Total Time
  type: string
  format: "TT {ct} {hh:mm:ss}<cr><lf>"
  notes: >
    ct = current chapter/track number (0–255). hh:mm:ss = current track time (or total if stopped).
    Triggered by STAT TRKT, on media insertion when autonomous messages enabled.

- id: disc_info
  label: Album Title
  type: string
  format: "DI {text}<cr><lf>"
  notes: Album name and artist name when available. Triggered by STAT DSCI, on track selection, or while playing when autonomous messages enabled.

- id: track_info
  label: Track Title
  type: string
  format: "TI {text}<cr><lf>"
  notes: Track name when available. Triggered by STAT TRKI, on track selection, or while playing when autonomous messages enabled.

- id: title_number
  label: Current Title/Group
  type: string
  format: "TTL {tt}<cr><lf>"
  notes: tt = title or group number, or "- -" if unknown. Triggered by STAT TTL or on title/group selection when autonomous messages enabled.

- id: track_number
  label: Current Chapter/Track
  type: string
  format: "TRK {ccc}<cr><lf>"
  notes: ccc = chapter or track number, or "- - -" if unknown. Triggered by STAT TRK or on chapter/track selection when autonomous messages enabled.

- id: media_type
  label: Media Type
  type: enum
  format: "SY MEDIA {mediatype}<cr><lf>"
  values:
    - DONE   # Loader is empty
    - DVD    # DVD VIDEO disc
    - DVDA   # DVD AUDIO disc
    - CDDA   # CD-DA disc
    - VCD    # VCD disc
    - SVCD   # SVCD disc
    - SACD   # SACD disc
    - DATA   # Data disc (MP3, WMA, AAC)
  notes: Triggered by STAT MEDIA or on disc insertion when autonomous messages enabled.

- id: volume_absolute
  label: Volume (Absolute)
  type: number
  format: "SY VOLA {vv} [muted]<cr><lf>"
  notes: >
    vv = 0–100 in 0.5 steps. "muted" parameter appended only if unit is muted.
    Only available if volume is enabled. Triggered by STAT MAIN or on volume change.

- id: volume_relative
  label: Volume (Relative)
  type: number
  format: "SY VOLR {svv} [muted]<cr><lf>"
  notes: >
    svv = -89.0 to +14.0 in 0.5 steps. "muted" parameter appended only if unit is muted.
    Only available if volume is enabled. Triggered by STAT MAIN or on volume change.

- id: subtitle_language
  label: Subtitle Language
  type: string
  format: "SY SUBT {language}<cr><lf>"
  notes: Current subtitle language name. Only valid for DVD-V and DVD-A media. Triggered by STAT SUBT or on subtitle language change.

- id: audio_stream
  label: Audio Stream Info
  type: string
  format: "SY AUDIO {stream} {samplerate} [{nCH}] [{language}]<cr><lf>"
  notes: >
    stream values: DOLBY, WMA, MP3, CDDA, DTS, LPCM, DSDSTEREO, DSDMULTI, DSDDOWNMIX,
    MUSICAM, SDDS, PCM, DMC, MLP, MPEG1, MPEG2, AAC, HDCD, PNG, NONE.
    samplerate values: 8kHz, 11.025kHz, 12kHz, 16kHz, 22.05kHz, 24kHz, 32kHz, 44.1kHz,
    48kHz, 64kHz, 88.2kHz, 96kHz, 128kHz, 176.4kHz, 192kHz, SPDIF, NONE.
    nCH = 1..8 channels (DVD and DVD-A only). language = current language (DVD and DVD-A only).
    Triggered by STAT AUDIO or on audio parameter change.

- id: video_info
  label: Video Stream Info
  type: string
  format: "SY VIDEO {aspect} {scanning}<cr><lf>"
  notes: >
    aspect values: 4:3PS (pan-scan), 16:9, 4:3LB (letterbox), NONE.
    scanning values: PROG (progressive), INT (interlaced), NONE.
    Triggered by STAT VIDEO or on video parameter change.

- id: lipsync_value
  label: Lip-Sync Delay Value
  type: integer
  format: "SY LSY {svvv}<cr><lf>"
  notes: svvv = -100 to +100 in 1ms steps. Triggered by STAT LSY or on lip-sync delay change.

- id: repeat_mode
  label: Repeat Mode
  type: enum
  format: "SY RPT {repeat}<cr><lf>"
  values:
    - RPDC   # Repeat disc
    - RPTK   # Repeat track or chapter
    - RPA    # Repeat A-B (start point only set)
    - RPAB   # Repeat A-B (full)
    - RPTT   # Repeat title or group (DVD-V and DVD-A only)
    - OFF    # Repeat off
  notes: Triggered by STAT RPT or on repeat mode change.

- id: random_mode
  label: Random Mode
  type: enum
  format: "SY RNDM {random}<cr><lf>"
  values:
    - RNDM   # Random play
    - SHFL   # Shuffle play
    - OFF    # Random mode off
  notes: Triggered by STAT RNDM or on random mode change.

- id: time_display_mode
  label: Display Time Mode
  type: enum
  format: "SY TMDE {timemode}<cr><lf>"
  values:
    - TRKE   # Track elapsed time
    - TRKR   # Track remaining time
    - DSCE   # Disc elapsed time
    - DSCR   # Disc remaining time
    - OFF    # Time display off
  notes: Triggered by STAT TMDE or on display time mode change.

- id: hdmi_info
  label: HDMI Interface Info
  type: string
  format: "SY HDMI {status} [{resolution}]<cr><lf>"
  notes: >
    status values: INACTIVE (interface currently inactive). Further values noted as "to be completed" in source.
    resolution values: UNKNOWN. Further values noted as "to be completed" in source.
    Only valid on models equipped with HDMI interface. Triggered by STAT HDMI or on HDMI status/resolution change.

- id: ack_positive
  label: Positive Acknowledgement
  type: string
  format: "!<cr><lf>"
  notes: Sent within 100ms of last command termination character when command is recognized.

- id: ack_negative
  label: Negative Acknowledgement
  type: string
  format: "?<cr><lf>"
  notes: Sent when command is not recognized by the unit.
```

## Variables

```yaml
# UNRESOLVED: no explicit variable/parameter store section in source beyond commands above
```

## Events

```yaml
# All autonomous status messages are also events when STAT AUTO is active (default):
# - SY {status}       — system state change
# - DT tt hh:mm:ss    — disc insertion or entering stop state
# - TT ct hh:mm:ss    — media insertion
# - DI text           — track selection or during playback
# - TI text           — track selection or during playback
# - TTL tt            — title/group selection
# - TRK ccc           — chapter/track selection
# - SY MEDIA          — disc insertion
# - SY VOLA / SY VOLR — volume change
# - SY SUBT           — subtitle language change
# - SY AUDIO          — audio parameter change
# - SY VIDEO          — video parameter change
# - SY LSY            — lip-sync delay change
# - SY RPT            — repeat mode change
# - SY RNDM           — random mode change
# - SY TMDE           — display time mode change
# - SY HDMI           — HDMI status or resolution change
# Autonomous messages can be disabled with STAT OFF command.
```

## Macros

```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings or interlock procedures described in source.
```

## Notes

- The RS-232 connector is a standard DB-9 configured as DCE. A regular serial cable connects to a computer.
- The address prefix "P300." is optional when the controller uniquely connects to the CDP-300. Commands may be sent as either `P300.PLAY<cr><lf>` or `PLAY<cr><lf>`.
- The UART has a 16-byte FIFO; no minimum inter-byte delay is required, but the PC/controller must also accept status data without delay.
- All command and status data are ASCII bytes.
- Autonomous status messages are enabled by default (STAT AUTO state). Disable with `STAT OFF<cr><lf>`.
- Volume commands (VOLA, MVOL+, MVOL-, MUTE, UNMT) are only available when the volume control feature is enabled on the unit.
- For system acceleration mode during volume adjustment, successive MVOL+/- commands must be received within 200ms of the system's reply.
- Source document (revision 1.4) notes the HDMI status/resolution tables are incomplete ("This table is to be completed").
- Source document shows TRKE and TRKR command sections (3.68, 3.69) appear to list `DSCE` as the command wire; the correct commands are `TRKE<cr><lf>` and `TRKR<cr><lf>` respectively, matching the STAT TMDE feedback values defined in section 5.17.

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CDP_102_202_300_502_RS232_Protocol.pdf
retrieved_at: 2026-05-31T18:16:55.847Z
last_checked_at: 2026-06-23T10:38:22.138Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T10:38:22.138Z
matched_actions: 88
action_count: 88
confidence: medium
summary: "All 88 spec actions matched verbatim against source; transport 9600/8/N/1 verified; full coverage. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no explicit variable/parameter store section in source beyond commands above"
- "no multi-step macros described in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
