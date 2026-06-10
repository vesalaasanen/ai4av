---
spec_id: admin/zidoo-zidoo-media-player
schema_version: ai4av-public-spec-v1
revision: 1
title: "ZIDOO Media Player Control Spec"
manufacturer: ZIDOO
model_family: "ZIDOO Media Player"
aliases: []
compatible_with:
  manufacturers:
    - ZIDOO
  models:
    - "ZIDOO Media Player"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - zidoo.tv
source_urls:
  - https://www.zidoo.tv/Support/developer.html
retrieved_at: 2026-05-22T19:23:55.510Z
last_checked_at: 2026-06-10T03:22:48.188Z
generated_at: 2026-06-10T03:22:48.188Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model variants and firmware compatibility ranges not stated"
  - "no RS-232 serial command syntax documented despite hardware supporting it"
  - "no settable continuous variables (e.g. volume level as integer) documented in source"
  - "no unsolicited notification / push event mechanism documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing documented in source"
  - "RS-232 serial command syntax not documented despite hardware support mentioned in product specs"
  - "video changeStatus parameter values not enumerated — source only shows example status=1"
  - "no error response codes or error handling documented beyond status:200"
  - "no rate limiting or connection limit information stated"
  - "video play mode index values not enumerated"
verification:
  verdict: verified
  checked_at: 2026-06-10T03:22:48.188Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec actions matched their literal HTTP endpoints in the source; transport parameters (HTTP protocol, port 9529, base URLs) verified exactly; coverage is bidirectional — no extra commands in source. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# ZIDOO Media Player Control Spec

## Summary
ZIDOO media players (e.g. Z9X, X9S) are Android-based 4K media players controllable via HTTP GET API over TCP/IP on port 9529. The API exposes remote control key simulation, app management, video playback control, music playback, and file browsing across local and network storage (SMB/NFS).

<!-- UNRESOLVED: specific model variants and firmware compatibility ranges not stated -->
<!-- UNRESOLVED: no RS-232 serial command syntax documented despite hardware supporting it -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://{device_ip}:9529/ZidooControlCenter/
  port: 9529
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # PowerOn, Poweroff, Standby, Reboot remote keys
- queryable      # getModel, getPlayStatus, getApps, getFileList return state
- levelable      # VolumeUp, VolumeDown, Mute remote keys
- media_player   # video and music playback control
```

## Actions
```yaml
# --- System / Model ---
- id: get_model
  label: Get Model Info
  kind: query
  params: []
  endpoint: GET /ZidooControlCenter/getModel

# --- Remote Control ---
- id: remote_key
  label: Send Remote Key
  kind: action
  params:
    - name: key
      type: enum
      values:
        - Key.menu
        - Key.Back
        - Key.Cancel
        - Key.Home
        - Key.Up
        - Key.Down
        - Key.Left
        - Key.Right
        - Key.Ok
        - Key.Select
        - Key.Star
        - Key.Pound
        - Key.Dash
        - Key.MediaPlay
        - Key.MediaStop
        - Key.MediaPause
        - Key.MediaNext
        - Key.MediaPrev
        - Key.Number_0
        - Key.Number_1
        - Key.Number_2
        - Key.Number_3
        - Key.Number_4
        - Key.Number_5
        - Key.Number_6
        - Key.Number_7
        - Key.Number_8
        - Key.Number_9
        - Key.UserDefine_A
        - Key.UserDefine_B
        - Key.UserDefine_C
        - Key.UserDefine_D
        - Key.Mute
        - Key.VolumeUp
        - Key.VolumeDown
        - Key.PowerOn
        - Key.MediaBackward
        - Key.MediaForward
        - Key.Info
        - Key.Record
        - Key.PageUP
        - Key.PageDown
        - Key.Subtitle
        - Key.Audio
        - Key.Repeat
        - Key.Mouse
        - Key.PopMenu
        - Key.movie
        - Key.music
        - Key.photo
        - Key.file
        - Key.light
        - Key.Resolution
        - Key.PowerOn.Reboot
        - Key.PowerOn.Poweroff
        - Key.PowerOn.Standby
        - Key.Pip
        - Key.Screenshot
        - Key.APP.Switch
      description: Remote control key code
  endpoint: "GET /ZidooControlCenter/RemoteControl/sendkey?key={key}"

# --- Power (via remote keys) ---
- id: power_off
  label: Power Off
  kind: action
  params: []
  endpoint: "GET /ZidooControlCenter/RemoteControl/sendkey?key=Key.PowerOn.Poweroff"

- id: reboot
  label: Reboot
  kind: action
  params: []
  endpoint: "GET /ZidooControlCenter/RemoteControl/sendkey?key=Key.PowerOn.Reboot"

- id: standby
  label: Standby
  kind: action
  params: []
  endpoint: "GET /ZidooControlCenter/RemoteControl/sendkey?key=Key.PowerOn.Standby"

# --- Volume (via remote keys) ---
- id: volume_up
  label: Volume Up
  kind: action
  params: []
  endpoint: "GET /ZidooControlCenter/RemoteControl/sendkey?key=Key.VolumeUp"

- id: volume_down
  label: Volume Down
  kind: action
  params: []
  endpoint: "GET /ZidooControlCenter/RemoteControl/sendkey?key=Key.VolumeDown"

- id: mute
  label: Mute Toggle
  kind: action
  params: []
  endpoint: "GET /ZidooControlCenter/RemoteControl/sendkey?key=Key.Mute"

# --- App Management ---
- id: open_app
  label: Open App
  kind: action
  params:
    - name: packageName
      type: string
      description: Android package name (e.g. com.zidoo.audioplayer)
  endpoint: "GET /ZidooControlCenter/Apps/openApp?packageName={packageName}"

- id: uninstall_app
  label: Uninstall App
  kind: action
  params:
    - name: packageName
      type: string
      description: Android package name
  endpoint: "GET /ZidooControlCenter/Apps/uninstallApp?packageName={packageName}"

- id: clear_app_data
  label: Clear App Data
  kind: action
  params:
    - name: packageName
      type: string
      description: Android package name
  endpoint: "GET /ZidooControlCenter/Apps/clearDataApp?packageName={packageName}"

- id: get_apps
  label: Get App List
  kind: query
  params: []
  endpoint: GET /ZidooControlCenter/Apps/getApps

# --- Video Player ---
- id: video_get_subtitle_list
  label: Get Subtitle List
  kind: query
  params: []
  endpoint: GET /ZidooVideoPlay/getSubtitleList

- id: video_get_audio_list
  label: Get Audio Track List
  kind: query
  params: []
  endpoint: GET /ZidooVideoPlay/getAudioList

- id: video_get_play_status
  label: Get Video Play Status
  kind: query
  params: []
  endpoint: GET /ZidooVideoPlay/getPlayStatus

- id: video_change_status
  label: Change Video Play Status
  kind: action
  params:
    - name: status
      type: integer
      description: Play status value
  endpoint: "GET /ZidooVideoPlay/changeStatus?status={status}"

- id: video_get_play_mode_list
  label: Get Video Play Mode List
  kind: query
  params: []
  endpoint: GET /ZidooVideoPlay/getPlayModeList

- id: video_set_subtitle
  label: Set Subtitle
  kind: action
  params:
    - name: index
      type: integer
      description: Subtitle index (1-based)
  endpoint: "GET /ZidooVideoPlay/setSubtitle?index={index}"

- id: video_set_audio_track
  label: Set Audio Track
  kind: action
  params:
    - name: index
      type: integer
      description: Audio track index (1-based)
  endpoint: "GET /ZidooVideoPlay/setAudio?index={index}"

- id: video_set_play_mode
  label: Set Video Play Mode
  kind: action
  params:
    - name: index
      type: integer
      description: Play mode index (1-based)
  endpoint: "GET /ZidooVideoPlay/setPlayMode?index={index}"

- id: video_seek
  label: Video Seek
  kind: action
  params:
    - name: position
      type: integer
      description: Position in milliseconds
  endpoint: "GET /ZidooVideoPlay/seekTo?positon={position}"

# --- File Control ---
- id: file_open
  label: Open File
  kind: action
  params:
    - name: path
      type: string
      description: File path (URL-encoded)
    - name: videoplaymode
      type: integer
      description: "Video play mode (0 or 1)"
  endpoint: "GET /ZidooFileControl/openFile?path={path}&videoplaymode={videoplaymode}"

- id: file_get_list
  label: Get File List
  kind: query
  params:
    - name: path
      type: string
      description: Directory path
    - name: type
      type: integer
      description: "File type filter (0=folder, 1=music, 2=movie, 3=image, 4=txt, 5=apk, 6=pdf, 7=doc, 8=xls, 9=ppt, 10=web, 11=zip)"
  endpoint: "GET /ZidooFileControl/getFileList?path={path}&type={type}"

- id: file_get_network_hosts
  label: Get Network Hosts (SMB/NFS)
  kind: query
  params:
    - name: path
      type: string
      description: "Mount path (e.g. /tmp/ramfs/mnt/)"
    - name: type
      type: integer
      description: "1005 for SMB/NFS discovery"
  endpoint: "GET /ZidooFileControl/getHost?path={path}&type={type}"

- id: file_get_devices
  label: Get Storage Devices
  kind: query
  params: []
  endpoint: GET /ZidooFileControl/getDevices

# --- Music Player ---
- id: music_get_list
  label: Get Music Files
  kind: query
  params:
    - name: folderId
      type: integer
      description: Folder ID
    - name: page
      type: integer
      description: Page number (1-based)
    - name: pagesize
      type: integer
      description: Items per page
  endpoint: "GET /ZidooMusicControl/getMusics?folderId={folderId}&page={page}&pagesize={pagesize}"

- id: music_play
  label: Play Music
  kind: action
  params:
    - name: musicId
      type: integer
      description: Music track ID
    - name: folderId
      type: integer
      description: Folder ID
  endpoint: "GET /ZidooMusicControl/playMusic?musicId={musicId}&folderId={folderId}"

- id: music_play_cue
  label: Play CUE Music
  kind: action
  params:
    - name: musicId
      type: integer
      description: Music track ID
    - name: folderId
      type: integer
      description: Folder ID
    - name: indexBegin
      type: string
      description: "Start time (HH:MM:SS)"
  endpoint: "GET /ZidooMusicControl/playCueMusic?musicId={musicId}&folderId={folderId}&indexBegin={indexBegin}"

- id: music_get_cue_info
  label: Get CUE Music Info
  kind: query
  params:
    - name: musicId
      type: integer
      description: Music track ID
  endpoint: "GET /ZidooMusicControl/getCueInfo?musicId={musicId}"

- id: music_play_next
  label: Play Next Track
  kind: action
  params: []
  endpoint: GET /ZidooMusicControl/playNext

- id: music_play_previous
  label: Play Previous Track
  kind: action
  params: []
  endpoint: GET /ZidooMusicControl/playPrevious

- id: music_start
  label: Start Music Playback
  kind: action
  params: []
  endpoint: GET /ZidooMusicControl/start

- id: music_pause
  label: Pause Music
  kind: action
  params: []
  endpoint: GET /ZidooMusicControl/pause

- id: music_stop
  label: Stop Music
  kind: action
  params: []
  endpoint: GET /ZidooMusicControl/stop

- id: music_seek
  label: Music Seek
  kind: action
  params:
    - name: time
      type: integer
      description: Position in milliseconds
  endpoint: "GET /ZidooMusicControl/seekTo?time={time}"

- id: music_set_loop_mode
  label: Set Music Loop Mode
  kind: action
  params:
    - name: loop
      type: enum
      values:
        - 0  # Playlist sequential
        - 1  # Single cycle
        - 2  # Shuffle
      description: "0=playlist, 1=single cycle, 2=shuffle"
  endpoint: "GET /ZidooMusicControl/setLoopMode?loop={loop}"
- id: power_on
  label: Power On
  kind: action
  params: []
  endpoint: "GET /ZidooControlCenter/RemoteControl/sendkey?key=Key.PowerOn"
```

## Feedbacks
```yaml
- id: model_info
  type: object
  description: Device model, firmware, hardware info
  fields:
    - model
    - net_mac
    - wif_mac
    - firmware
    - ram
    - flash
    - androidversion
    - language
  query: GET /ZidooControlCenter/getModel

- id: app_list
  type: array
  description: Installed applications
  query: GET /ZidooControlCenter/Apps/getApps

- id: video_play_status
  type: object
  description: Current video playback state
  query: GET /ZidooVideoPlay/getPlayStatus

- id: subtitle_list
  type: array
  description: Available subtitle tracks
  query: GET /ZidooVideoPlay/getSubtitleList

- id: audio_track_list
  type: array
  description: Available audio tracks
  query: GET /ZidooVideoPlay/getAudioList

- id: play_mode_list
  type: array
  description: Available play modes
  query: GET /ZidooVideoPlay/getPlayModeList

- id: file_list
  type: array
  description: Files in a directory
  query: GET /ZidooFileControl/getFileList

- id: device_list
  type: array
  description: Mounted storage devices (HDD, USB, NFS, SMB)
  query: GET /ZidooFileControl/getDevices

- id: network_hosts
  type: array
  description: Discovered SMB/NFS hosts
  query: GET /ZidooFileControl/getHost

- id: remote_key_response
  type: enum
  values: ["200"]
  description: All actions return {"status":200} on success
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables (e.g. volume level as integer) documented in source
# Volume control is via relative key presses (VolumeUp/VolumeDown/Mute), not absolute level
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification / push event mechanism documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing documented in source
```

## Notes
- Source documents four API base paths: `/ZidooControlCenter/`, `/ZidooVideoPlay/`, `/ZidooMusicControl/`, `/ZidooFileControl/`.
- The `seekTo` video endpoint has a typo in source (`positon` not `position`) — use exact spelling.
- File paths in API responses are URL-encoded (e.g. `%2F` for `/`).
- Device type codes: 1000=HDD, 1001/1002=USB, 1003=TF, 1004=NFS, 1005=SMB.
- File type codes: 0=folder, 1=music, 2=movie, 3=image, 4=txt, 5=apk, 6=pdf, 7=doc, 8=xls, 9=ppt, 10=web, 11=zip.
- Music loop modes: 0=playlist sequential, 1=single cycle, 2=shuffle.
- Volume is relative (up/down toggle), no absolute volume level API documented.

<!-- UNRESOLVED: RS-232 serial command syntax not documented despite hardware support mentioned in product specs -->
<!-- UNRESOLVED: video changeStatus parameter values not enumerated — source only shows example status=1 -->
<!-- UNRESOLVED: no error response codes or error handling documented beyond status:200 -->
<!-- UNRESOLVED: no rate limiting or connection limit information stated -->
<!-- UNRESOLVED: video play mode index values not enumerated -->

## Provenance

```yaml
source_domains:
  - zidoo.tv
source_urls:
  - https://www.zidoo.tv/Support/developer.html
retrieved_at: 2026-05-22T19:23:55.510Z
last_checked_at: 2026-06-10T03:22:48.188Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T03:22:48.188Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec actions matched their literal HTTP endpoints in the source; transport parameters (HTTP protocol, port 9529, base URLs) verified exactly; coverage is bidirectional — no extra commands in source. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model variants and firmware compatibility ranges not stated"
- "no RS-232 serial command syntax documented despite hardware supporting it"
- "no settable continuous variables (e.g. volume level as integer) documented in source"
- "no unsolicited notification / push event mechanism documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing documented in source"
- "RS-232 serial command syntax not documented despite hardware support mentioned in product specs"
- "video changeStatus parameter values not enumerated — source only shows example status=1"
- "no error response codes or error handling documented beyond status:200"
- "no rate limiting or connection limit information stated"
- "video play mode index values not enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
