---
spec_id: admin/classe-audio-cdp-102
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio CDP-102 Control Spec"
manufacturer: "Classé"
model_family: CDP-102
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - CDP-102
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CDP_102_202_300_502_RS232_Protocol.pdf
retrieved_at: 2026-05-31T18:18:54.369Z
last_checked_at: 2026-06-12T19:14:38.532Z
generated_at: 2026-06-12T19:14:38.532Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HDMI interface status not confirmed for CDP-102 specifically; source covers CDP-300 primarily"
  - "no safety warnings or interlock procedures stated in source"
  - "voltage/current/power specs not stated"
  - "firmware version compatibility not stated"
  - "error recovery sequences not documented"
  - "port number not stated (serial only device, no TCP)"
  - "HDMI availability on CDP-102 not confirmed"
  - "volume control enable/disable mechanism not documented"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:14:38.532Z
  matched_actions: 88
  action_count: 88
  confidence: medium
  summary: "All 88 spec actions matched to source commands; transport parameters verified; complete coverage of source command set. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-31
---

# Classe Audio CDP-102 Control Spec

## Summary
CDP-102 is a CD/DVD transport player with RS-232C automation interface. Supports disc playback, transport control, menu navigation, audio/subtitle track selection, repeat modes, and volume control. Serial interface at 9600 8N1.

<!-- UNRESOLVED:HDMI interface status not confirmed for CDP-102 specifically; source covers CDP-300 primarily -->

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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: open_tray
  label: Open Tray
  kind: action
  params: []
  description: Open the tray. Valid on tray loader units.

- id: close_tray
  label: Close Tray
  kind: action
  params: []
  description: Close the tray. Valid on tray loader units.

- id: eject
  label: Eject Disc
  kind: action
  params: []
  description: Eject disc from slot loader.

- id: play
  label: Play
  kind: action
  params: []
  description: Start disc playback.

- id: stop
  label: Stop
  kind: action
  params: []
  description: Stop playback.

- id: pause
  label: Pause
  kind: action
  params: []
  description: Pause playback of current track.

- id: step
  label: Step
  kind: action
  params: []
  description: Advance one video frame. Valid only during pause on DVD-V.

- id: unpause
  label: Unpause
  kind: action
  params: []
  description: Resume playback after pause.

- id: next
  label: Next Track/Chapter
  kind: action
  params: []
  description: Skip to next track/chapter.

- id: prev
  label: Previous Track/Chapter
  kind: action
  params: []
  description: Skip to previous track/chapter.

- id: next_title
  label: Next Title/Group
  kind: action
  params: []
  description: Skip to next title (DVD-V) or group (DVD-A).

- id: prev_title
  label: Previous Title/Group
  kind: action
  params: []
  description: Skip to previous title (DVD-V) or group (DVD-A).

- id: fwd
  label: Seek Forward
  kind: action
  params:
    - name: speed
      type: string
      required: false
      description: |
        Seek speed. Default 2X.
        CDDA: 2X 4X 8X 16X
        DVD-V/DVD-A: 1/8 ¼ ½ 2X 4X 8X 16X 30X 60X
        MP3/WMA/AAC: 4X
  description: Seek forward at specified speed.

- id: rev
  label: Seek Reverse
  kind: action
  params:
    - name: speed
      type: string
      required: false
      description: |
        Seek speed. Default 2X.
        CDDA: 2X 4X 8X 16X
        DVD-V/DVD-A: 1/8 ¼ ½ 2X 4X 8X 16X 30X 60X
        MP3/WMA/AAC: 4X
  description: Seek reverse at specified speed.

- id: slow_fwd
  label: Slow Forward
  kind: action
  params: []
  description: Slow forward at half speed. DVD-V only. Increases speed if already in slow mode.

- id: slow_rev
  label: Slow Reverse
  kind: action
  params: []
  description: Slow reverse at half speed. DVD-V only. Decreases speed if already in slow mode.

- id: fast_fwd
  label: Fast Forward
  kind: action
  params: []
  description: Fast forward at double speed (quad speed for MP3/WMA/AAC). DVD-V only. Increases speed if already in fast mode.

- id: fast_rev
  label: Fast Reverse
  kind: action
  params: []
  description: Fast reverse at double speed (quad speed for MP3/WMA/AAC). DVD-V only. Decreases speed if already in fast mode.

- id: speed_up
  label: Speed Up
  kind: action
  params: []
  description: Increase search speed. Valid only during search mode.

- id: speed_down
  label: Speed Down
  kind: action
  params: []
  description: Decrease search speed. Valid only during search mode.

- id: still_next
  label: Next Still Image
  kind: action
  params: []
  description: Go to next still image. DVD-A only.

- id: still_prev
  label: Previous Still Image
  kind: action
  params: []
  description: Go to previous still image. DVD-A only.

- id: jump_time
  label: Jump to Time
  kind: action
  params:
    - name: time
      type: string
      description: Time position [[hh:]mm:]ss format
  description: Jump to specific time on disc.

- id: jump_title_chapter
  label: Jump to Title/Chapter
  kind: action
  params:
    - name: title
      type: integer
      required: false
      description: Title (0-99 DVD-V) or group (0-9 DVD-A)
    - name: chapter
      type: integer
      description: Chapter (0-225 DVD-V) or track (0-99 CDDA/DVD-A)
  description: Jump to specific title/chapter or group/track.

- id: track
  label: Jump to Track/Chapter
  kind: action
  params:
    - name: number
      type: integer
      description: Chapter (0-225 DVD-V) or track (0-99 CDDA/DVD-A)
  description: Jump to specific chapter or track.

- id: title
  label: Jump to Title/Group
  kind: action
  params:
    - name: number
      type: integer
      description: Title (0-99 DVD-V) or group (0-9 DVD-A)
  description: Jump to specific title or group.

- id: shuffle
  label: Shuffle Play
  kind: action
  params: []
  description: Begin shuffle play. CDDA only.

- id: program_add
  label: Program Add Track
  kind: action
  params: []
  description: Add current track to program. CDDA only.

- id: program_remove
  label: Program Remove Track
  kind: action
  params: []
  description: Remove current track from program. CDDA only.

- id: program_clear
  label: Program Clear
  kind: action
  params: []
  description: Clear the playlist. CDDA only.

- id: program_empty
  label: Program Reset to TOC
  kind: action
  params: []
  description: Reset playlist to disc table of contents. CDDA only.

- id: program_save
  label: Program Save
  kind: action
  params: []
  description: Save currently constructed program. CDDA only.

- id: direct_chapter_track
  label: Direct Chapter/Track Jump
  kind: action
  params:
    - name: number
      type: integer
      description: Chapter (0-225 DVD-V) or track (0-99 CDDA/DVD-A)
  description: Jump directly to chapter or track without prefix.

- id: repeat_disc
  label: Repeat Disc
  kind: action
  params: []
  description: Engage repeat disc function.

- id: repeat_title
  label: Repeat Title/Group
  kind: action
  params: []
  description: Engage repeat title (DVD-V) or repeat group (DVD-A).

- id: repeat_track
  label: Repeat Track/Chapter
  kind: action
  params: []
  description: Engage repeat track/chapter.

- id: repeat_ab
  label: Repeat A-B
  kind: action
  params: []
  description: Set repeat A-B. First press sets begin point, second press marks end and starts repeat. DVD-V only.

- id: repeat_off
  label: Repeat Off
  kind: action
  params: []
  description: Turn off all repeat modes.

- id: menu_disc
  label: Disc Menu
  kind: action
  params: []
  description: Activate disc menu. DVD-V and DVD-A only.

- id: menu_title
  label: Title Menu
  kind: action
  params: []
  description: Activate title menu. DVD-V and DVD-A only.

- id: cursor_up
  label: Cursor Up
  kind: action
  params: []
  description: Move cursor up.

- id: cursor_down
  label: Cursor Down
  kind: action
  params: []
  description: Move cursor down.

- id: cursor_left
  label: Cursor Left
  kind: action
  params: []
  description: Move cursor left.

- id: cursor_right
  label: Cursor Right
  kind: action
  params: []
  description: Move cursor right.

- id: select
  label: Select
  kind: action
  params: []
  description: Select highlighted menu item.

- id: next_subtitle
  label: Next Subtitle
  kind: action
  params: []
  description: Select next available subtitle track. DVD-V and DVD-A only.

- id: next_audio
  label: Next Audio Track
  kind: action
  params: []
  description: Select next available audio track. DVD-V and DVD-A only.

- id: surround_mode
  label: Toggle Surround Mode
  kind: action
  params: []
  description: Toggle between stereo and 5.1 modes.

- id: next_angle
  label: Next Camera Angle
  kind: action
  params: []
  description: Select next available camera angle. DVD-V and DVD-A only.

- id: next_zoom
  label: Next Zoom Ratio
  kind: action
  params: []
  description: Select next available zoom ratio. DVD-V and DVD-A only.

- id: next_aspect
  label: Next Aspect Ratio
  kind: action
  params: []
  description: Cycle aspect ratio (16:9 / 4:3 LB / 4:3 PS).

- id: volume_absolute
  label: Volume Absolute
  kind: action
  params:
    - name: level
      type: number
      description: Volume 0.0 to 100.0 in 0.5 dB steps
  description: Set volume to absolute value. Volume control must be enabled.

- id: volume_up
  label: Volume Up
  kind: action
  params: []
  description: Increment volume. MVOL +/- commands must be received within 200ms for acceleration mode.

- id: volume_down
  label: Volume Down
  kind: action
  params: []
  description: Decrement volume. MVOL +/- commands must be received within 200ms for acceleration mode.

- id: mute
  label: Mute
  kind: action
  params: []
  description: Mute unit. Volume control must be enabled.

- id: unmute
  label: Unmute
  kind: action
  params: []
  description: Unmute unit. Volume control must be enabled.

- id: lipsync_up
  label: Lip Sync Delay Up
  kind: action
  params: []
  description: Add 1ms to lip-sync delay.

- id: lipsync_down
  label: Lip Sync Delay Down
  kind: action
  params: []
  description: Remove 1ms from lip-sync delay.

- id: lipsync_set
  label: Lip Sync Delay Set
  kind: action
  params:
    - name: delay
      type: integer
      description: Delay in milliseconds (-100 to 100)
  description: Set lip-sync delay to specified value.

- id: standby
  label: Standby
  kind: action
  params: []
  description: Put unit into standby.

- id: operate
  label: Operate
  kind: action
  params: []
  description: Put unit into operate mode.

- id: lcd_off
  label: LCD Off
  kind: action
  params: []
  description: Turn front panel LCD off.

- id: lcd_low
  label: LCD Low Intensity
  kind: action
  params: []
  description: Set front panel LCD to low intensity.

- id: lcd_medium
  label: LCD Medium Intensity
  kind: action
  params: []
  description: Set front panel LCD to medium intensity.

- id: lcd_high
  label: LCD High Intensity
  kind: action
  params: []
  description: Set front panel LCD to high intensity.

- id: display_elapsed_disc
  label: Display Elapsed Disc Time
  kind: action
  params: []
  description: Set display mode to elapsed time on disc.

- id: display_remaining_disc
  label: Display Remaining Disc Time
  kind: action
  params: []
  description: Set display mode to remaining time on disc. Default mode when stopped.

- id: display_elapsed_track
  label: Display Elapsed Track Time
  kind: action
  params: []
  description: Set display mode to elapsed time on track.

- id: display_remaining_track
  label: Display Remaining Track Time
  kind: action
  params: []
  description: Set display mode to remaining time on track.

- id: stat_syst
  label: System Status Query
  kind: query
  params: []
  description: Request current system state.

- id: stat_auto
  label: Enable Autonomous Status
  kind: action
  params: []
  description: Enable autonomous status messages. Default state.

- id: stat_off
  label: Disable Autonomous Status
  kind: action
  params: []
  description: Disable autonomous status messages.

- id: stat_dsct
  label: Disc Time Query
  kind: query
  params: []
  description: Request total disc time.

- id: stat_trkt
  label: Track Time Query
  kind: query
  params: []
  description: Request track current time. Returns total track time if stopped.

- id: stat_disc_info
  label: Disc Album Info Query
  kind: query
  params: []
  description: Request ASCII album title.

- id: stat_track_info
  label: Track Info Query
  kind: query
  params: []
  description: Request ASCII track title.

- id: stat_title
  label: Title Query
  kind: query
  params: []
  description: Request current selected title or group. DVD-V and DVD-A only.

- id: stat_chapter
  label: Chapter/Track Query
  kind: query
  params: []
  description: Request current selected chapter or track.

- id: stat_media
  label: Media Type Query
  kind: query
  params: []
  description: Request current loaded media type.

- id: stat_volume
  label: Volume Query
  kind: query
  params: []
  description: Request current main volume. Volume control must be enabled.

- id: stat_subtitle
  label: Subtitle Query
  kind: query
  params: []
  description: Request current subtitle track. DVD-V and DVD-A only.

- id: stat_audio
  label: Audio Query
  kind: query
  params: []
  description: Request current audio track information.

- id: stat_video
  label: Video Query
  kind: query
  params: []
  description: Request current video information. Video interface required.

- id: stat_lipsync
  label: Lip Sync Query
  kind: query
  params: []
  description: Request current lip-sync information.

- id: stat_repeat
  label: Repeat Mode Query
  kind: query
  params: []
  description: Request current repeat mode information.

- id: stat_random
  label: Random Mode Query
  kind: query
  params: []
  description: Request current random mode information.

- id: stat_timemode
  label: Time Mode Query
  kind: query
  params: []
  description: Request current display time mode.

- id: stat_hdmi
  label: HDMI Query
  kind: query
  params: []
  description: Request current HDMI interface information. HDMI interface required.
```

## Feedbacks
```yaml
- id: ack
  label: Acknowledgement
  type: enum
  values:
    - "!<cr><lf>  # positive acknowledgement"
    - "?<cr><lf>  # negative acknowledgement"
  description: Positive ack on recognized command, negative on unrecognized. Generated within 100ms of command termination.

- id: system_status
  label: System Status
  type: string
  description: |
    Current system state. Format: SY <status><cr><lf>
    Values: OPEN TRAY EJCT STBY OPER SPIN VOID PLAY DVDMENU PRESTOP STOP PAUS FWD <speed> REV <speed> ERR

- id: disc_time
  label: Disc Time
  type: string
  description: |
    Total disc time. Format: DT <tt> <hh:mm:ss><cr><lf>
    tt = chapters/tracks (0-255)

- id: track_time
  label: Track Time
  type: string
  description: |
    Track current time. Format: TT <ct> <hh:mm:ss><cr><lf>
    ct = current chapter/track (0-255)

- id: disc_info
  label: Disc Album Info
  type: string
  description: Album name and artist when available. Format: DI <text><cr><lf>

- id: track_info
  label: Track Info
  type: string
  description: Track name when available. Format: TI <text><cr><lf>

- id: title_info
  label: Title/Group Info
  type: string
  description: |
    Currently selected title/group. Format: TTL <tt><cr><lf>
    tt = title/group number or "--" if unknown

- id: chapter_track_info
  label: Chapter/Track Info
  type: string
  description: |
    Currently selected chapter/track. Format: TRK <ccc><cr><lf>
    ccc = chapter/track number or "---" if unknown

- id: media_type
  label: Media Type
  type: enum
  values:
    - DONE
    - DVD
    - DVDA
    - CDDA
    - VCD
    - SVCD
    - SACD
    - DATA

- id: volume_absolute
  label: Volume Absolute
  type: string
  description: |
    Format: SY VOLA <vv> [muted]<cr><lf>
    vv = 0-100 in 0.5 steps. muted shown only when muted. Volume must be enabled.

- id: volume_relative
  label: Volume Relative
  type: string
  description: |
    Format: SY VOLR <svv> [muted]<cr><lf>
    svv = -89.0 to +14.0 in 0.5 steps. muted shown only when muted. Volume must be enabled.

- id: subtitle_status
  label: Subtitle Status
  type: string
  description: Current subtitle language. DVD-V and DVD-A only.

- id: audio_status
  label: Audio Status
  type: string
  description: |
    Format: SY AUDIO <stream> <samplerate> [nCH] [language]<cr><lf>
    stream values: DOLBY WMA MP3 CDDA DTS LPCM DSDSTEREO DSDMULTI DSDDOWNMIX MUSICAM SDDS PCM DMC MLP MPEG1 MPEG2 AAC HDCD PNG NONE
    samplerate values: 8kHz 11.025kHz 12kHz 16kHz 22.05kHz 24kHz 32kHz 44.1kHz 48kHz 64kHz 88.2kHz 96kHz 128kHz 176.4kHz 192kHz SPDIF NONE
    nCH: 1-8 channel count (DVD/DVD-A only)

- id: video_status
  label: Video Status
  type: string
  description: |
    Format: SY VIDEO <aspect> <scanning><cr><lf>
    aspect: 4:3PS 16:9 4:3LB NONE
    scanning: PROG INT NONE

- id: lipsync_status
  label: Lip Sync Status
  type: string
  description: |
    Format: SY LSY <svvv><cr><lf>
    svvv = -100 to 100 in 1ms steps. Volume must be enabled.

- id: repeat_status
  label: Repeat Status
  type: enum
  values:
    - RPDC
    - RPTK
    - RPA
    - RPAB
    - RPTT
    - OFF

- id: random_status
  label: Random Status
  type: enum
  values:
    - RNDM
    - SHFL
    - OFF

- id: timemode_status
  label: Time Mode Status
  type: enum
  values:
    - TRKE
    - TRKR
    - DSCE
    - DSCR
    - OFF

- id: hdmi_status
  label: HDMI Status
  type: string
  description: |
    Format: SY HDMI <status> [resolution]<cr><lf>
    status: INACTIVE
    resolution: UNKNOWN (HDMI interface required)
```

## Variables
```yaml
# No standalone settable parameters distinct from actions. All parameters expressed as action params.
```

## Events
```yaml
# Autonomous status messages generated on state changes when STAT AUTO is enabled.
# State changes that trigger events:
# - Tray open/close/moving
# - Disc insertion/ejection
# - Playback state changes (play/pause/stop/search)
# - Title/group selection
# - Chapter/track selection
# - Volume changes
# - Subtitle/audio changes
# - Lip-sync changes
# - Repeat mode changes
# - Random mode changes
# - Display time mode changes
# - HDMI status/resolution changes
```

## Macros
```yaml
# No explicit multi-step macros defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
DB-9 connector configured as DCE. Address field "P300" used for CDP-300; commands without address field are interpreted for local operation. Command feedback is 3-character reply (!<cr><lf> or ?<cr><lf>) within 100ms. Autonomous status messages can be disabled via STAT OFF. 16-byte FIFO allows no minimum time between bytes.
<!-- UNRESOLVED: voltage/current/power specs not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: error recovery sequences not documented -->
<!-- UNRESOLVED: port number not stated (serial only device, no TCP) -->
<!-- UNRESOLVED: HDMI availability on CDP-102 not confirmed -->
<!-- UNRESOLVED: volume control enable/disable mechanism not documented -->

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CDP_102_202_300_502_RS232_Protocol.pdf
retrieved_at: 2026-05-31T18:18:54.369Z
last_checked_at: 2026-06-12T19:14:38.532Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:14:38.532Z
matched_actions: 88
action_count: 88
confidence: medium
summary: "All 88 spec actions matched to source commands; transport parameters verified; complete coverage of source command set. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HDMI interface status not confirmed for CDP-102 specifically; source covers CDP-300 primarily"
- "no safety warnings or interlock procedures stated in source"
- "voltage/current/power specs not stated"
- "firmware version compatibility not stated"
- "error recovery sequences not documented"
- "port number not stated (serial only device, no TCP)"
- "HDMI availability on CDP-102 not confirmed"
- "volume control enable/disable mechanism not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
