---
spec_id: admin/oppo-bdp-103-105
schema_version: ai4av-public-spec-v1
revision: 1
title: "Oppo BDP-10X Control Spec"
manufacturer: "Oppo Digital, Inc."
model_family: BDP-103
aliases: []
compatible_with:
  manufacturers:
    - "Oppo Digital, Inc."
  models:
    - BDP-103
    - BDP-105
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - download.oppodigital.com
source_urls:
  - http://download.oppodigital.com/BDP103/BDP-103_RS232_Protocol_v1.1.pdf
retrieved_at: 2026-05-13T16:00:00.000Z
last_checked_at: 2026-05-14T18:17:19.480Z
generated_at: 2026-05-14T18:17:19.480Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:19.480Z
  matched_actions: 72
  action_count: 99
  confidence: high
  summary: "Every spec action matched verbatim; transport verified; comprehensive coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Oppo BDP-10X Control Spec

## Summary
Oppo BDP-103 and BDP-105 Blu-ray Disc Players RS-232C control protocol. Control via RS-232C serial at 9600 8N1. Commands prefixed with `#`, responses prefixed with `@`. Supports power, playback, input routing, audio/subtitle selection, zoom, and search. Unsolicited status updates available in verbose modes 2 and 3.

<!-- UNRESOLVED:firmware version compatibility ranges MCU103-05-0914/ MCU105-04-0914 / BDP10X-29-0915 stated in source but not populated -->

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
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: integer
      description: 0=BD-PLAYER, 1=HDMI-FRONT, 2=HDMI-BACK, 3=ARC-HDMI-OUT1, 4=ARC-HDMI-OUT2, 5=OPTICAL, 6=COAXIAL, 7=USB-AUDIO
- id: eject
  label: Open/Close Disc Tray
  kind: action
  params: []
- id: power_on
  label: Discrete Power On
  kind: action
  params: []
- id: power_off
  label: Discrete Power Off
  kind: action
  params: []
- id: set_tv_system
  label: Set Output TV System
  kind: action
  params:
    - name: system
      type: enum
      values: [NTSC, PAL, AUTO]
- id: dimmer
  label: Dim Front Panel Display
  kind: action
  params: []
- id: pure_audio
  label: Pure Audio Mode
  kind: action
  params: []
- id: volume_up
  label: Increase Volume
  kind: action
  params: []
- id: volume_down
  label: Decrease Volume
  kind: action
  params: []
- id: mute
  label: Mute Audio
  kind: action
  params: []
- id: numeric_0
  label: Numeric Key 0
  kind: action
  params: []
- id: numeric_1
  label: Numeric Key 1
  kind: action
  params: []
- id: numeric_2
  label: Numeric Key 2
  kind: action
  params: []
- id: numeric_3
  label: Numeric Key 3
  kind: action
  params: []
- id: numeric_4
  label: Numeric Key 4
  kind: action
  params: []
- id: numeric_5
  label: Numeric Key 5
  kind: action
  params: []
- id: numeric_6
  label: Numeric Key 6
  kind: action
  params: []
- id: numeric_7
  label: Numeric Key 7
  kind: action
  params: []
- id: numeric_8
  label: Numeric Key 8
  kind: action
  params: []
- id: numeric_9
  label: Numeric Key 9
  kind: action
  params: []
- id: clear
  label: Clear Numeric Input
  kind: action
  params: []
- id: goto
  label: Go To Location
  kind: action
  params: []
- id: home_menu
  label: Go to Home Menu
  kind: action
  params: []
- id: page_up
  label: Page Up
  kind: action
  params: []
- id: page_down
  label: Page Down
  kind: action
  params: []
- id: osd_toggle
  label: Show/Hide On-Screen Display
  kind: action
  params: []
- id: top_menu
  label: Show BD Top Menu / DVD Title Menu
  kind: action
  params: []
- id: popup_menu
  label: Show BD Pop-Up Menu / DVD Menu
  kind: action
  params: []
- id: nav_up
  label: Navigation Up
  kind: action
  params: []
- id: nav_left
  label: Navigation Left
  kind: action
  params: []
- id: nav_right
  label: Navigation Right
  kind: action
  params: []
- id: nav_down
  label: Navigation Down
  kind: action
  params: []
- id: nav_select
  label: Navigation Enter
  kind: action
  params: []
- id: setup
  label: Enter Setup Menu
  kind: action
  params: []
- id: return
  label: Return to Previous Menu
  kind: action
  params: []
- id: red
  label: Red Button
  kind: action
  params: []
- id: green
  label: Green Button
  kind: action
  params: []
- id: blue
  label: Blue Button
  kind: action
  params: []
- id: yellow
  label: Yellow Button
  kind: action
  params: []
- id: stop
  label: Stop Playback
  kind: action
  params: []
- id: play
  label: Start Playback
  kind: action
  params: []
- id: pause
  label: Pause Playback
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
- id: next
  label: Skip to Next
  kind: action
  params: []
- id: audio
  label: Change Audio Language/Channel
  kind: action
  params: []
- id: subtitle
  label: Change Subtitle Language
  kind: action
  params: []
- id: angle
  label: Change Camera Angle
  kind: action
  params: []
- id: zoom
  label: Zoom In/Out and Adjust Aspect Ratio
  kind: action
  params: []
- id: sap
  label: Secondary Audio Program On/Off
  kind: action
  params: []
- id: ab_replay
  label: A-B Replay
  kind: action
  params: []
- id: repeat
  label: Repeat Play Mode
  kind: action
  params: []
- id: pip
  label: Picture-in-Picture On/Off
  kind: action
  params: []
- id: resolution
  label: Switch Output Resolution
  kind: action
  params:
    - name: res
      type: enum
      values: [SDI, SDP, 720P, 1080I, 1080P, SRC, AUTO]
- id: subtitle_hold
  label: Subtitle Shift (Hold)
  kind: action
  params: []
- id: netflix
  label: Start Netflix Application
  kind: action
  params: []
- id: vudu
  label: Start VUDU Application
  kind: action
  params: []
- id: option
  label: Show/Hide Option Menu
  kind: action
  params: []
- id: mode_3d
  label: 2D-to-3D Conversion / 3D Adjustment
  kind: action
  params: []
- id: picture_adjust
  label: Picture Adjustment Menu
  kind: action
  params: []
- id: nop
  label: No Operation
  kind: action
  params: []
- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  params:
    - name: level
      type: integer
      description: 0=off, 1=echo commands, 2=unsolicited major status, 3=detailed status with time updates
- id: set_hdmi_resolution
  label: Set HDMI Output Resolution
  kind: action
  params:
    - name: res
      type: enum
      values: [SDI, SDP, 720P, 1080I, 1080P, SRC, AUTO]
- id: set_tv_system_adv
  label: Set Output TV System (Advanced)
  kind: action
  params:
    - name: system
      type: enum
      values: [NTSC, PAL, AUTO]
- id: set_zoom_ratio
  label: Set Zoom Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values: [1, AR, FS, US, 1.2, 1.3, 1.5, 2, 1/2, 1/3, 1/4]
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 or MUTE
- id: set_repeat_mode
  label: Set Repeat Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [CH, TT, ALL, OFF, SHF, RND]
- id: search_title_chapter
  label: Search to Title/Chapter/Time
  kind: action
  params:
    - name: target
      type: string
      description: T3=title 3, C10=chapter 10, C 0:00:34=time in chapter, T 0:12:13=time in title
- id: direct_play
  label: Direct Play
  kind: action
  params: []
- id: reset_rs232
  label: Reset RS-232 Command Buffer
  kind: action
  params: []
- id: set_subtitle_shift
  label: Set Subtitle Shift
  kind: action
  params:
    - name: shift
      type: integer
      description: -5 to 5
- id: set_osd_position
  label: Set OSD Position
  kind: action
  params:
    - name: pos
      type: integer
      description: 0 to 5
- id: set_time_display
  label: Set Time Information Display
  kind: action
  params:
    - name: type
      type: enum
      values: [E, R, T, X, C, K]
- id: select_input_source
  label: Select Input Source (Advanced)
  kind: action
  params:
    - name: source
      type: integer
      description: 0=BD-PLAYER, 1=HDMI/MHL-FRONT, 2=HDMI-BACK, 3=ARC-HDMI-OUT1, 4=ARC-HDMI-OUT2, 5=OPTICAL, 6=COAXIAL, 7=USB-AUDIO
- id: launch_app
  label: Launch Application
  kind: action
  params:
    - name: app
      type: enum
      values: [NFX, YOU, VUD, PAN, FFR, PIC, RHA, CIN]
- id: query_verbose_mode
  label: Query Verbose Mode
  kind: query
  params: []
- id: query_power_status
  label: Query Power Status
  kind: query
  params: []
- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  params: []
- id: query_volume
  label: Query Volume
  kind: query
  params: []
- id: query_hdmi_resolution
  label: Query HDMI Resolution
  kind: query
  params: []
- id: query_playback_status
  label: Query Playback Status
  kind: query
  params: []
- id: query_track_title
  label: Query Track/Title Number
  kind: query
  params: []
- id: query_chapter
  label: Query Chapter Number
  kind: query
  params: []
- id: query_track_elapsed_time
  label: Query Track/Title Elapsed Time
  kind: query
  params: []
- id: query_track_remaining_time
  label: Query Track/Title Remaining Time
  kind: query
  params: []
- id: query_chapter_elapsed_time
  label: Query Chapter Elapsed Time
  kind: query
  params: []
- id: query_chapter_remaining_time
  label: Query Chapter Remaining Time
  kind: query
  params: []
- id: query_total_elapsed_time
  label: Query Total Elapsed Time
  kind: query
  params: []
- id: query_total_remaining_time
  label: Query Total Remaining Time
  kind: query
  params: []
- id: query_disc_type
  label: Query Disc Type
  kind: query
  params: []
- id: query_audio_type
  label: Query Audio Type
  kind: query
  params: []
- id: query_subtitle_type
  label: Query Subtitle Type
  kind: query
  params: []
- id: query_subtitle_shift
  label: Query Subtitle Shift
  kind: query
  params: []
- id: query_osd_position
  label: Query OSD Position
  kind: query
  params: []
- id: query_repeat_mode
  label: Query Repeat Mode
  kind: query
  params: []
- id: query_zoom_mode
  label: Query Zoom Mode
  kind: query
  params: []
- id: query_input_source
  label: Query Input Source
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power Status
  type: enum
  values: [ON, OFF]
- id: playback_status
  label: Playback Status
  type: enum
  values: [NO DISC, LOADING, OPEN, CLOSE, PLAY, PAUSE, STOP, STEP, FREV, FFWD, SFWD, SREV, SETUP, HOME MENU, MEDIA CENTER]
- id: volume_level
  label: Volume Level
  type: enum
  values: [MUTE, "000".."100"]
- id: disc_type
  label: Disc Type
  type: enum
  values: [BD-MV, DVD-VIDEO, DVD-AUDIO, SACD, CDDA, HDCD, DATA-DISC]
- id: audio_type
  label: Audio Type
  type: string
  description: Format "DD 01/05 ENG 5.1" - type code, track/total, language code, channels
- id: subtitle_type
  label: Subtitle Type
  type: string
  description: Format "02/05 ENG" - track/total, language code
- id: zoom_mode
  label: Zoom Mode
  type: enum
  values: [00 Off, 01 Stretch, 02 Full, 03 Underscan, 04 1.2x, 05 1.3x, 06 1.5x, 07 2x, 08 3x, 09 4x, 10 1/2, 11 1/3, 12 1/4]
- id: repeat_mode
  label: Repeat Mode
  type: enum
  values: [00 Off, 01 Repeat One, 02 Repeat Chapter, 03 Repeat All, 04 Repeat Title, 05 Shuffle, 06 Random]
- id: input_source
  label: Input Source
  type: enum
  values: [0 BD-PLAYER, 1 HDMI-FRONT, 2 HDMI-BACK, 3 ARC-HDMI-OUT1, 4 ARC-HDMI-OUT2, 5 OPTICAL, 6 COAXIAL, 7 USB-AUDIO]
- id: verbose_mode
  label: Verbose Mode
  type: integer
  values: [0, 1, 2, 3]
- id: firmware_version
  label: Firmware Version
  type: string
  description: Returns BDP103-xx-xxxx format
- id: hdmi_resolution
  label: HDMI Resolution
  type: enum
  values: [480P, 720P50, 1080P60, AUTO, 480I60, 576I50, 576P50, 720P60, 720P50, 1080I60, 1080I50, 1080P50, 1080P24, 1080P23]
- id: track_title
  label: Track/Title Number
  type: string
  description: Format "02/10"
- id: chapter
  label: Chapter Number
  type: string
  description: Format "03/03"
- id: elapsed_time
  label: Elapsed Time
  type: string
  description: Format HH:MM:SS
- id: remaining_time
  label: Remaining Time
  type: string
  description: Format HH:MM:SS
- id: subtitle_shift
  label: Subtitle Shift
  type: integer
  values: [-5..5]
- id: osd_position
  label: OSD Position
  type: integer
  values: [0..5]
- id: time_display_type
  label: Time Display Type
  type: enum
  values: [E, R, T, X, C, K]
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters not tied to discrete actions detected in source
```

## Events
```yaml
- id: UPW
  label: Power Status Update
  params:
    - name: status
      type: integer
      description: 1=ON, 0=OFF
- id: UPL
  label: Playback Status Update
  params:
    - name: status
      type: enum
      values: [DISC, LOAD, OPEN, CLOS, PLAY, PAUS, STOP, STPF, STPR, FFW1..FFW5, FRV1..FRV5, SFW1..SFW4, SRV1..SRV4, HOME, MCTR]
- id: UVL
  label: Volume Level Update
  params:
    - name: level
      type: enum
      values: [MUT, "000".."100"]
- id: UDT
  label: Disc Type Update
  params:
    - name: type
      type: enum
      values: [BDMV, DVDV, DVDA, SACD, CDDA, HDCD, DATA, VCD2, SVCD]
- id: UAT
  label: Audio Type Update
  params:
    - name: type
      type: string
      description: "Type(2) Number(5) Language(3) Channels(2), e.g. DD 01/05 ENG 5.1"
- id: UST
  label: Subtitle Type Update
  params:
    - name: subtitle
      type: string
      description: "Number(5) Language(3), e.g. 02/05 ENG"
- id: UIS
  label: Input Source Update
  params:
    - name: source
      type: integer
      description: 0-7
- id: UTC
  label: Time Code Update
  params:
    - name: title
      type: string
      description: 3 digits
    - name: chapter
      type: string
      description: 3 digits
    - name: type
      type: enum
      values: [E, R, T, X, C, K]
    - name: time
      type: string
      description: HH:MM:SS
- id: UVO
  label: Video Resolution Update
  params:
    - name: source_res
      type: string
      description: 7-char resolution name
    - name: output_res
      type: string
      description: 7-char resolution name
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source
```

## Notes
Host must wait for response before sending next command. If no response received within 10 seconds, host may retransmit. Command limit: 25 bytes max including start (`#`) and end (CR) bytes. Response limit: 25 bytes max. Verbose modes 2 and 3 enable unsolicited status update messages.
<!-- UNRESOLVED: firmware minimum versions MCU103-05-0914 (BDP-103), MCU105-04-0914 (BDP-105), BDP10X-29-0915 stated in source but not populating firmware field -->
<!-- UNRESOLVED:firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - download.oppodigital.com
source_urls:
  - http://download.oppodigital.com/BDP103/BDP-103_RS232_Protocol_v1.1.pdf
retrieved_at: 2026-05-13T16:00:00.000Z
last_checked_at: 2026-05-14T18:17:19.480Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:19.480Z
matched_actions: 72
action_count: 99
confidence: high
summary: "Every spec action matched verbatim; transport verified; comprehensive coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
