---
spec_id: admin/roland-p-20hd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Roland P-20HD Control Spec"
manufacturer: Roland
model_family: P-20HD
aliases: []
compatible_with:
  manufacturers:
    - Roland
  models:
    - P-20HD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - static.roland.com
source_urls:
  - https://static.roland.com/assets/media/pdf/P-20HD_reference_v20_eng02_W.pdf
retrieved_at: 2026-06-12T02:50:58.564Z
last_checked_at: 2026-06-12T19:35:17.831Z
generated_at: 2026-06-12T19:35:17.831Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "FTP credentials character format/size limits not documented; V-80HD switcher synchronization protocol details not fully specified"
  - "no safety warnings or interlock procedures stated in source"
  - "V-80HD switcher sync protocol message details not specified; user ID/password character format/size limits not stated"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:35:17.831Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions confirmed in source with exact command codes and parameter shapes; transport parameters verified in LAN/RS-232 sections. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Roland P-20HD Control Spec

## Summary
The Roland P-20HD is a video deck supporting both LAN (TCP/IP) and RS-232 remote control. Control uses ASCII command strings prefixed with STX (02H) and terminated by semicolon. LAN control requires user ID/password authentication on TCP port 8023; RS-232 supports 9,600 or 38,400 bps with XON/XOFF flow control.

<!-- UNRESOLVED: FTP credentials character format/size limits not documented; V-80HD switcher synchronization protocol details not fully specified -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 8023  # TCP control port (LAN CONTROL)
serial:
  baud_rate: 9600  # default; 38400 also supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff  # RS-232 only
auth:
  type: user_pass  # LAN: user ID + password required (USR/PSS); RS-232: no auth
```

## Traits
```yaml
- powerable  # inferred: EXT (shutdown) command present
- queryable  # inferred: extensive inquiry commands present (QPJ, QMD, QRC, QPL, ...)
- routable   # inferred: SLI (switch input), SLO (switch output) present
- levelable  # inferred: VOL (audio level) command present
```

## Actions
```yaml
- id: auth_user_id
  label: Input User ID (Authentication)
  kind: action
  command: "USR{user_id}"
  params:
    - name: user_id
      type: string
      description: User ID set on the device
- id: auth_password
  label: Input Password (Authentication)
  kind: action
  command: "PSS{password}"
  params:
    - name: password
      type: string
      description: Password set on the device
- id: end_communication
  label: End Communication
  kind: action
  command: "QIT"
  params: []

# --- Operation ---
- id: recording_start
  label: Recording Start
  kind: action
  command: "REC"
  params: []
- id: recording_stop
  label: Recording Stop
  kind: action
  command: "RES"
  params: []
- id: playback_start
  label: Playback Start
  kind: action
  command: "PLY"
  params: []
- id: pause
  label: Pause
  kind: action
  command: "PUS"
  params: []
- id: jog
  label: Jog
  kind: action
  command: "JOG{direction}"
  params:
    - name: direction
      type: integer
      description: 1 (forward), -1 (reverse)
- id: shuttle
  label: Shuttle
  kind: action
  command: "SHT{speed}"
  params:
    - name: speed
      type: integer
      description: "-8 (x-128), -7 (x-64), -6 (x-32), -5 (x-16), -4 (x-8), -3 (x-4), -2 (x-2), -1 (x-1), 0 (x0), 1 (x1), 2 (x2), 3 (x4), 4 (x8), 5 (x16), 6 (x32), 7 (x64), 8 (x128)"
- id: set_playback_speed
  label: Change Playback Speed
  kind: action
  command: "SPC{speed}"
  params:
    - name: speed
      type: integer
      description: 0-100
- id: switch_playback_speed_range
  label: Switch Playback Speed Range
  kind: action
  command: "SPR{range}"
  params:
    - name: range
      type: integer
      description: 0 (SPEED RANGE button unlit), 1 (SPEED RANGE button lit)
- id: set_in_point
  label: IN Point Settings
  kind: action
  command: "MIN{source}"
  params:
    - name: source
      type: integer
      description: 0 (replay video), 1 (live in video)
- id: set_out_point
  label: OUT Point Settings
  kind: action
  command: "MOT{source}"
  params:
    - name: source
      type: integer
      description: 0 (replay video), 1 (live in video)
- id: clips_create
  label: Clips Create
  kind: action
  command: "MCL{source}"
  params:
    - name: source
      type: integer
      description: 0 (replay video), 1 (live in video)
- id: clips_select
  label: Clips Select
  kind: action
  command: "CLS{index}"
  params:
    - name: index
      type: integer
      description: 1-512 (clip list), 1-64 (palette)
- id: clips_playback_start
  label: Clips Playback Start
  kind: action
  command: "APC"
  params: []
- id: clips_cue_up
  label: Clips Cue Up
  kind: action
  command: "CLQ{index}"
  params:
    - name: index
      type: integer
      description: 1-512 (clip list), 1-64 (palette)
- id: clips_delete
  label: Clips Deleting
  kind: action
  command: "CLD{index}"
  params:
    - name: index
      type: integer
      description: 1-512 (clip list), 1-64 (palette)
- id: bookmark_set
  label: Bookmark Setting
  kind: action
  command: "BMK{source}"
  params:
    - name: source
      type: integer
      description: 0 (replay video), 1 (live in video)
- id: bookmark_delete
  label: Bookmark Deleting
  kind: action
  command: "DMK"
  params: []
- id: switch_input
  label: Switch Input
  kind: action
  command: "SLI{input}"
  params:
    - name: input
      type: integer
      description: 1 (LIVE IN 1), 2 (LIVE IN 2), 3 (PinP), 4 (SPLIT)
- id: switch_output
  label: Switch Output
  kind: action
  command: "SLO{output}"
  params:
    - name: output
      type: integer
      description: 0 (replay video), 1 (live in video)
- id: jump_next_bookmark
  label: Jump to Next Bookmark
  kind: action
  command: "JNB"
  params: []
- id: jump_prev_bookmark
  label: Jump to Previous Bookmark
  kind: action
  command: "JPB"
  params: []
- id: jump_timeline_beginning
  label: Timeline Jump to Beginning
  kind: action
  command: "JTP"
  params: []
- id: jump_timeline_end
  label: Timeline Jump to End
  kind: action
  command: "JED"
  params: []
- id: playlist_select
  label: Playlist Select
  kind: action
  command: "PLS{playlist}"
  params:
    - name: playlist
      type: integer
      description: 0 (clip list), 1-8 (palettes 1-8)
- id: playlist_playback_start
  label: Playlist Playback Start
  kind: action
  command: "APL{index}"
  params:
    - name: index
      type: integer
      description: 1-512 (clip list), 1-64 (palette)
- id: playlist_auto_play_stop
  label: Playlist Auto-play Stop
  kind: action
  command: "SAP"
  params: []
- id: palette_add_current_clip
  label: Palette Add Current Clip
  kind: action
  command: "ATP{palette}"
  params:
    - name: palette
      type: integer
      description: 1-8 (palettes 1-8)
- id: still_image_playback
  label: Still Image Clips Playback
  kind: action
  command: "STP{index}"
  params:
    - name: index
      type: integer
      description: 1-16 (still image clips 1-16)
- id: still_image_stop
  label: Still Image Clips Stopping
  kind: action
  command: "STS"
  params: []
- id: audio_clip_playback
  label: Audio Clips Playback
  kind: action
  command: "AUP{index}"
  params:
    - name: index
      type: integer
      description: 1-16 (audio clips 1-16)
- id: audio_clip_stop
  label: Audio Clips Stopping
  kind: action
  command: "AUS"
  params: []
- id: set_audio_level
  label: Set Audio Level
  kind: action
  command: "VOL{level}"
  params:
    - name: level
      type: integer
      description: -801 (-INF dB), -800 (-80.0 dB)-0 (0.0 dB)-100 (10.0 dB)

# --- System ---
- id: active_sense
  label: Request Active Sensing
  kind: action
  command: "ACS"
  params: []
- id: request_version
  label: Request Version Information
  kind: action
  command: "VER"
  params: []
- id: shutdown
  label: Shut Down This Unit
  kind: action
  command: "EXT"
  params: []

# --- Inquiry (queries) ---
- id: query_open_project
  label: Check for Open Project
  kind: query
  command: "QPJ"
  params: []
- id: query_project_mode
  label: Get Project Recording/Playback Mode
  kind: query
  command: "QMD"
  params: []
- id: query_recording_status
  label: Get Recording Status
  kind: query
  command: "QRC"
  params: []
- id: query_playback_status
  label: Get Playback Status
  kind: query
  command: "QPL"
  params: []
- id: query_playback_speed
  label: Get Playback Speed
  kind: query
  command: "QSP"
  params: []
- id: query_playback_range
  label: Get Playback Range
  kind: query
  command: "QSR"
  params: []
- id: query_in_point_status
  label: Get IN Point Setting Status
  kind: query
  command: "QMI"
  params: []
- id: query_input_selection
  label: Get Input Selection Status
  kind: query
  command: "QIS"
  params: []
- id: query_output_selection
  label: Get Output Selection Status
  kind: query
  command: "QOS"
  params: []
- id: query_audio_level
  label: Get Audio Level
  kind: query
  command: "QAL"
  params: []
- id: query_current_playlist
  label: Get Playlist Containing Currently Selected Clip
  kind: query
  command: "QPS"
  params: []
- id: query_current_clip_number
  label: Get Number of Currently Selected Clip
  kind: query
  command: "QCS"
  params: []
- id: query_cued_playlist
  label: Get Playlist Containing Cued-Up Clip
  kind: query
  command: "QPQ"
  params: []
- id: query_cued_clip_number
  label: Get Number of Cued-Up Clip
  kind: query
  command: "QCQ"
  params: []
- id: query_clip_available
  label: Check Whether Clip Is Available in Specified Position
  kind: query
  command: "QCX{playlist},{position}"
  params:
    - name: playlist
      type: integer
      description: 0 (clip list), 1-8 (palettes)
    - name: position
      type: integer
      description: 1-512 (when playlist=0), 1-64 (when playlist=1-8)
- id: query_audio_clip_available
  label: Check Whether Audio Clip Is Available in Specified Position
  kind: query
  command: "QAX{position}"
  params:
    - name: position
      type: integer
      description: Audio clip position to check
- id: query_still_image_clip_available
  label: Check Whether Still Image Clip Is Available in Specified Position
  kind: query
  command: "QSX{position}"
  params:
    - name: position
      type: integer
      description: Still image clip position to check
- id: query_playlist_clip_count
  label: Get Number of Clips in Specified Playlist
  kind: query
  command: "QCC{playlist}"
  params:
    - name: playlist
      type: integer
      description: 0 (clip list), 1-8 (palettes)
```

## Feedbacks
```yaml
- id: ack_response
  label: ACK Response
  type: enum
  values:
    - ACK  # 06H - command accepted
    - NAK  # 15H - command rejected (auth fail, syntax, invalid, out of range)
- id: auth_result
  label: Authentication Result
  type: enum
  values:
    - ACK  # User ID / password accepted
    - NAK  # Authentication failed
- id: version_info
  label: Version Information
  type: string
  description: ASCII version string returned by VER
- id: open_project_status
  label: Open Project Status
  type: enum
  values:
    - 0  # no project open
    - 1  # project open
- id: project_mode
  label: Project Recording/Playback Mode
  type: enum
  values:
    - 0  # Resolution
    - 1  # Frame Rate
- id: recording_status
  label: Recording Status
  type: enum
  values:
    - 0  # recording stopped
    - 1  # recording
- id: playback_status
  label: Playback Status
  type: enum
  values:
    - 0  # playback paused
    - 1  # playing back
    - 2  # playing back clip
    - 3  # playing back playlist
- id: playback_speed
  label: Playback Speed
  type: integer
  range: -100-100
- id: playback_range
  label: Playback Speed Range
  type: enum
  values:
    - 0  # SPEED RANGE button unlit
    - 1  # SPEED RANGE button lit
- id: in_point_status
  label: IN Point Status
  type: enum
  values:
    - 0  # not set
    - 1  # set
- id: input_selection_status
  label: Input Selection Status
  type: enum
  values:
    - 1  # LIVE IN 1
    - 2  # LIVE IN 2
    - 3  # PinP
    - 4  # SPLIT
- id: output_selection_status
  label: Output Selection Status
  type: enum
  values:
    - 0  # replay video
    - 1  # live in video
- id: audio_level
  label: Audio Level
  type: integer
  description: -801 (-INF dB), -800 (-80.0 dB)-0 (0.0 dB)-100 (10.0 dB)
- id: current_playlist
  label: Current Playlist
  type: integer
  description: 0 (clip list), 1-8 (palettes 1-8)
- id: current_clip_number
  label: Current Clip Number
  type: integer
  description: 1-512 (clip list), 1-64 (palette)
- id: cued_playlist
  label: Cued Playlist
  type: integer
  description: 0 (clip list), 1-8 (palettes 1-8)
- id: cued_clip_number
  label: Cued Clip Number
  type: integer
  description: 1-512 (clip list), 1-64 (palette)
- id: clip_available
  label: Clip Available Check
  type: enum
  values:
    - 0  # not available
    - 1  # available
- id: audio_clip_available
  label: Audio Clip Available Check
  type: enum
  values:
    - 0  # not available
    - 1  # available
- id: still_image_clip_available
  label: Still Image Clip Available Check
  type: enum
  values:
    - 0  # not available
    - 1  # available
- id: playlist_clip_count
  label: Playlist Clip Count
  type: integer
  description: 0-512 (clip list), 0-64 (palettes)
```

## Variables
```yaml
# All settable parameters are exposed as discrete actions; no separate Variables section applies.
```

## Events
```yaml
- id: error_detected
  label: Error Detected
  description: Spontaneously sent when an error is detected
  params:
    - name: error_code
      type: integer
      description: 0 (syntax error), 4 (invalid / controlled by another setting), 5 (out of range)
```

## Macros
```yaml
# No explicit multi-step macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- Command frame: `STX(02H)` + 3-char command code + `:` + params (comma-separated) + `;` (3BH)
- Control codes: STX (02H), ACK (06H), NAK (15H), XON (11H), XOFF (13H)
- RS-232: 9,600 or 38,400 bps, 8N1, XON/XOFF flow control only
- LAN: TCP 8023 for control; FTP on TCP 21 uses same user ID/password (disable anonymous auth)
- LAN connection severs after 5 minutes of inactivity; maintain with periodic ACS commands
- RS-232 connector pinout: pin 2 RXD, 3 TXD, 4 DTR, 5 GND, 6 DSR, 7 RTS, 8 CTS; crossover cable required
- For V-80HD switcher sync: RS-232 must be set to 38,400 bps, Remote Control = "Switcher", Target Model = V-80HD
<!-- UNRESOLVED: V-80HD switcher sync protocol message details not specified; user ID/password character format/size limits not stated -->

## Provenance

```yaml
source_domains:
  - static.roland.com
source_urls:
  - https://static.roland.com/assets/media/pdf/P-20HD_reference_v20_eng02_W.pdf
retrieved_at: 2026-06-12T02:50:58.564Z
last_checked_at: 2026-06-12T19:35:17.831Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:35:17.831Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions confirmed in source with exact command codes and parameter shapes; transport parameters verified in LAN/RS-232 sections. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "FTP credentials character format/size limits not documented; V-80HD switcher synchronization protocol details not fully specified"
- "no safety warnings or interlock procedures stated in source"
- "V-80HD switcher sync protocol message details not specified; user ID/password character format/size limits not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
