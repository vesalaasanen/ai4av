---
spec_id: admin/wiim-amp
schema_version: ai4av-public-spec-v1
revision: 1
title: "WiiM Amp Control Spec"
manufacturer: WiiM
model_family: "WiiM Amp"
aliases: []
compatible_with:
  manufacturers:
    - WiiM
  models:
    - "WiiM Amp"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiimhome.com
  - github.com
  - developer.arylic.com
source_urls:
  - "https://www.wiimhome.com/pdf/HTTP%20API%20for%20WiiM%20Products.pdf"
  - https://github.com/cvdlinden/wiim-httpapi/blob/main/openapi.md
  - https://developer.arylic.com/httpapi/
  - https://github.com/cvdlinden/wiim-httpapi
retrieved_at: 2026-04-29T15:03:42.082Z
last_checked_at: 2026-10-07T20:33:23.358Z
generated_at: 2026-10-07T20:33:23.358Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "port number not stated in source; standard HTTPS implied but not confirmed"
  - "presence and format depend on trigger (omit for trigger 0 or 2; YYYYMMDD for trigger 1; 2-byte day-of-week for trigger 3; 2-byte weekday bitmask for trigger 4; 2-byte day-of-month for trigger 5)\""
  - "shell path or playback URL, should be less than 256 bytes\""
  - "source does not describe unsolicited notifications or event subscription mechanism"
  - "source does not describe multi-step macro sequences"
  - "the source does not state an authentication procedure."
  - "port number not stated — standard HTTPS (443) is implied but not confirmed"
  - "authentication procedure not stated in source"
  - "no event/notification subscription mechanism described"
  - "firmware version compatibility not stated"
  - "maximum concurrent connection limit not stated"
  - "command rate limits not stated"
  - "error response codes beyond OK/Failed not documented"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:33:23.358Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 action units (34 actions plus 10 query feedbacks) match source commands with correct shapes. Transport base URL is supported and the unresolved fields are honest gaps. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# WiiM Amp Control Spec

## Summary
The WiiM Amp is a network-connected streaming amplifier controlled via an HTTPS-based HTTP API. Commands are issued as GET requests to `https://<ip>/httpapi.asp?command=<cmd>` with responses in JSON or plain text. This spec covers playback control, volume/mute, EQ, source input switching, alarms, device management, and track metadata queries.

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "https://{ip}/httpapi.asp?command={command}"
  port: null  # UNRESOLVED: port number not stated in source; standard HTTPS implied but not confirmed
auth:
  type: UNRESOLVED  # source does not state an authentication procedure
```

## Traits
```yaml
traits:
  - powerable      # inferred from shutdown/reboot commands
  - queryable      # inferred from getPlayerStatus, getStatusEx, getMetaInfo, etc.
  - levelable      # inferred from volume control (0-100)
  - routable       # inferred from source input switching (line-in, bluetooth, optical, udisk, wifi)
```

## Actions
```yaml
actions:
  - id: play_url
    label: Play Audio URL
    kind: action
    params:
      - name: url
        type: string
        description: URL pointing to an audio stream
    command: setPlayerCmd:play:{url}
    response: OK

  - id: play_playlist
    label: Play Playlist
    kind: action
    params:
      - name: url
        type: string
        description: URL to m3u or ASX playlist
      - name: index
        type: integer
        description: Start index in the playlist
    command: setPlayerCmd:playlist:{url}:{index}
    response: OK

  - id: pause
    label: Pause
    kind: action
    params: []
    command: setPlayerCmd:pause

  - id: resume
    label: Resume
    kind: action
    params: []
    command: setPlayerCmd:resume

  - id: toggle_pause_play
    label: Toggle Pause/Play
    kind: action
    params: []
    command: setPlayerCmd:onepause
    description: If paused, resume; otherwise pause.

  - id: previous_track
    label: Previous Track
    kind: action
    params: []
    command: setPlayerCmd:prev

  - id: next_track
    label: Next Track
    kind: action
    params: []
    command: setPlayerCmd:next

  - id: seek
    label: Seek
    kind: action
    params:
      - name: position
        type: integer
        description: Position in seconds (0 to duration)
    command: setPlayerCmd:seek:{position}

  - id: stop
    label: Stop
    kind: action
    params: []
    command: setPlayerCmd:stop

  - id: set_volume
    label: Set Volume
    kind: action
    params:
      - name: value
        type: integer
        description: Volume level (0-100)
    command: setPlayerCmd:vol:{value}

  - id: mute
    label: Mute
    kind: action
    params:
      - name: mute
        type: integer
        description: "1 to mute, 0 to unmute"
    command: setPlayerCmd:mute:{mute}

  - id: set_loop_mode
    label: Set Loop Mode
    kind: action
    params:
      - name: mode
        type: integer
        description: "0 = sequence no loop, 1 = single loop, 2 = shuffle loop, -1 = sequence loop"
    command: setPlayerCmd:loopmode:{mode}

  - id: eq_on
    label: EQ On
    kind: action
    params: []
    command: EQOn
    response: '{"status":"OK"} or {"status":"Failed"}'

  - id: eq_off
    label: EQ Off
    kind: action
    params: []
    command: EQOff
    response: '{"status":"OK"} or {"status":"Failed"}'

  - id: eq_load
    label: Load EQ Preset
    kind: action
    params:
      - name: name
        type: string
        description: "One of: Flat, Acoustic, Bass Booster, Bass Reducer, Classical, Dance, Deep, Electronic, Hip-Hop, Jazz, Latin, Loudness, Lounge, Piano, Pop, R&B, Rock, Small Speakers, Spoken Word, Treble Booster, Treble Reducer, Vocal Booster"
    command: EQLoad:{name}
    response: '{"status":"OK"} or {"status":"Failed"}'

  - id: switch_source
    label: Switch Source Input
    kind: action
    params:
      - name: mode
        type: string
        description: "One of: line-in, bluetooth, optical, udisk, wifi"
    command: setPlayerCmd:switchmode:{mode}

  - id: play_preset
    label: Play Preset
    kind: action
    params:
      - name: number
        type: integer
        description: Preset number (1-12)
    command: MCUKeyShortClick:{number}

  - id: set_alarm
    label: Set Alarm
    kind: action
    params:
      - name: n
        type: integer
        description: "Alarm index (0-2, max 3 alarms)"
      - name: trigger
        type: integer
        description: "0=cancel, 1=once, 2=every day, 3=every week (by day), 4=every week (by bitmask), 5=every month"
      - name: operation
        type: integer
        description: "0=shell execute, 1=playback or ring, 2=stop playback"
      - name: time
        type: string
        description: "HHMMSS in UTC"
      - name: day
        type: string
        description: "UNRESOLVED: presence and format depend on trigger (omit for trigger 0 or 2; YYYYMMDD for trigger 1; 2-byte day-of-week for trigger 3; 2-byte weekday bitmask for trigger 4; 2-byte day-of-month for trigger 5)"
      - name: url
        type: string
        description: "UNRESOLVED: shell path or playback URL, should be less than 256 bytes"
    command: setAlarmClock:{n}:{trigger}:{operation}:{time}[:{day}][:{url}]

  - id: stop_alarm
    label: Stop Current Alarm
    kind: action
    params: []
    command: alarmStop

  - id: reboot
    label: Reboot
    kind: action
    params: []
    command: reboot
    response: '{"status":"OK"}'

  - id: shutdown
    label: Shutdown
    kind: action
    params:
      - name: sec
        type: integer
        description: "Seconds until shutdown; 0=immediate, -1=cancel previous timer"
    command: setShutdown:{sec}
    response: '{"status":"OK"} or {"status":"Failed"}'

  - id: time_sync
    label: Sync Time
    kind: action
    params:
      - name: datetime
        type: string
        description: "YYYYMMDDHHMMSS in UTC"
    command: timeSync:{datetime}

  - id: set_audio_output_mode
    label: Set Audio Output Mode
    kind: action
    params:
      - name: mode
        type: integer
        description: "1=SPDIF, 2=AUX, 3=COAX"
    command: setAudioOutputHardwareMode:{mode}
    response: OK

  - id: play_hex_playlist
    label: Play Hex Playlist
    kind: action
    params:
      - name: url
        type: string
        description: URL to m3u or ASX playlist; URL should be hexed
      - name: index
        type: integer
        description: Start index in the playlist
    command: setPlayerCmd:hex_playlist:{url}:{index}

  - id: get_device_status
    label: Get Device Status
    kind: action
    params: []
    command: getStatusEx

  - id: get_network_connection_state
    label: Get Network Connection State
    kind: action
    params: []
    command: wlanGetConnectState

  - id: get_player_status
    label: Get Player Status
    kind: action
    params: []
    command: getPlayerStatus

  - id: get_eq_status
    label: Get EQ Status
    kind: action
    params: []
    command: EQGetStat

  - id: get_eq_list
    label: Get EQ List
    kind: action
    params: []
    command: EQGetList

  - id: get_shutdown_timer
    label: Get Shutdown Timer
    kind: action
    params: []
    command: getShutdown

  - id: get_alarm
    label: Get Alarm
    kind: action
    params:
      - name: n
        type: integer
        description: "0~2，currently support max 3 alarm"
    command: getAlarmClock:{n}

  - id: get_preset_list
    label: Get Preset List
    kind: action
    params: []
    command: getPresetInfo

  - id: get_current_track_metadata
    label: Get Current Track Metadata
    kind: action
    params: []
    command: getMetaInfo

  - id: get_audio_output_mode
    label: Get Audio Output Mode
    kind: action
    params: []
    command: getNewAudioOutputHardwareMode
```

## Feedbacks
```yaml
feedbacks:
  - id: device_status
    label: Device Status
    type: json
    command: getStatusEx
    query_command: getStatusEx
    description: Returns full device info including firmware, network, UUID, MAC, IP, capabilities, etc.

  - id: network_connection_state
    label: Network Connection State
    type: enum
    values: [PROCESS, PAIRFAIL, FAIL, OK]
    command: wlanGetConnectState
    query_command: wlanGetConnectState
    description: Returns plain text status string (not JSON).

  - id: player_status
    label: Player Status
    type: json
    command: getPlayerStatus
    query_command: getPlayerStatus
    fields:
      - name: type
        description: "0=master/standalone, 1=slave"
      - name: ch
        description: "0=stereo, 1=left, 2=right"
      - name: mode
        description: "0=None, 1=AirPlay, 2=DLNA, 10-19=Wiimu playlist, 31=Spotify, 32=TIDAL, 40=AUX-In, 41=BT, 42=external storage, 43=Optical-In, 50=Mirror, 60=Voice mail, 99=Slave"
      - name: loop
        description: "0=all, 1=single, 2=shuffle loop, 3=shuffle no loop, 4=no shuffle no loop"
      - name: status
        description: "stop, play, loading, pause"
      - name: curpos
        description: Current position in ms
      - name: totlen
        description: Total duration in ms
      - name: vol
        description: Current volume
      - name: mute
        description: "0=unmuted, 1=muted"

  - id: eq_status
    label: EQ Status
    type: enum
    values: [On, Off]
    command: EQGetStat
    query_command: EQGetStat
    response: '{"EQStat":"On"} or {"EQStat":"Off"}'

  - id: eq_list
    label: EQ Preset List
    type: json_array
    command: EQGetList
    query_command: EQGetList
    values: [Flat, Acoustic, "Bass Booster", "Bass Reducer", Classical, Dance, Deep, Electronic, "Hip-Hop", Jazz, Latin, Loudness, Lounge, Piano, Pop, "R&B", Rock, "Small Speakers", "Spoken Word", "Treble Booster", "Treble Reducer", "Vocal Booster"]

  - id: shutdown_timer
    label: Shutdown Timer
    type: integer
    command: getShutdown
    query_command: getShutdown
    description: Returns remaining seconds until shutdown.

  - id: alarm_info
    label: Alarm Info
    type: json
    command: getAlarmClock:{n}
    query_command: getAlarmClock:{n}
    params:
      - name: n
        type: integer
        description: "Alarm index (0-2)"

  - id: preset_list
    label: Preset List
    type: json
    command: getPresetInfo
    query_command: getPresetInfo
    description: Returns list of configured presets with name, URL, source, and cover art URL.

  - id: track_metadata
    label: Current Track Metadata
    type: json
    command: getMetaInfo
    query_command: getMetaInfo
    fields:
      - name: album
        description: Album name
      - name: title
        description: Track title
      - name: artist
        description: Artist name
      - name: albumArtURI
        description: Album art URL
      - name: sampleRate
        description: Sample rate in Hz
      - name: bitDepth
        description: Bit depth

  - id: audio_output_mode
    label: Audio Output Mode
    type: json
    command: getNewAudioOutputHardwareMode
    query_command: getNewAudioOutputHardwareMode
    fields:
      - name: hardware
        description: "1=SPDIF, 2=AUX, 3=COAX"
      - name: source
        description: "BT source output: 0=disabled, 1=active"
      - name: audiocast
        description: "Audio cast output: 0=disabled, 1=active"
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume
    type: integer
    min: 0
    max: 100
    command: setPlayerCmd:vol:{value}

  - id: mute_state
    label: Mute State
    type: integer
    values: [0, 1]
    command: setPlayerCmd:mute:{value}

  - id: loop_mode
    label: Loop Mode
    type: integer
    values: [-1, 0, 1, 2]
    command: setPlayerCmd:loopmode:{value}

  - id: audio_output_hardware
    label: Audio Output Hardware Mode
    type: integer
    values: [1, 2, 3]
    command: setAudioOutputHardwareMode:{value}
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications or event subscription mechanism
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for:
  - reboot
  - shutdown
interlocks: []
```

## Notes
- All commands use HTTPS GET requests to `https://<ip>/httpapi.asp?command=<cmd>`.
- Responses are JSON unless otherwise noted (e.g., `wlanGetConnectState` returns plain text).
- Volume range is 0–100. Mute uses 1 (muted) / 0 (unmuted).
- Source input modes: `line-in` (also covers AUX-in), `bluetooth`, `optical`, `udisk`, `wifi`.
- EQ presets must match the names returned by `EQGetList` exactly.
- Alarm clock supports up to 3 alarms (indices 0–2). Times are in UTC.
- Preset numbers range from 1 to 12.
- The `setPlayerCmd:hex_playlist` variant accepts a hex-encoded URL.
- Authentication is UNRESOLVED: the source does not state an authentication procedure.
- `setAlarmClock` arguments are conditional on the trigger value; `day` and `url` are optional depending on trigger type, and `url` is limited to less than 256 bytes.

<!-- UNRESOLVED: port number not stated — standard HTTPS (443) is implied but not confirmed -->
<!-- UNRESOLVED: authentication procedure not stated in source -->
<!-- UNRESOLVED: no event/notification subscription mechanism described -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: maximum concurrent connection limit not stated -->
<!-- UNRESOLVED: command rate limits not stated -->
<!-- UNRESOLVED: error response codes beyond OK/Failed not documented -->

## Provenance

```yaml
source_domains:
  - wiimhome.com
  - github.com
  - developer.arylic.com
source_urls:
  - "https://www.wiimhome.com/pdf/HTTP%20API%20for%20WiiM%20Products.pdf"
  - https://github.com/cvdlinden/wiim-httpapi/blob/main/openapi.md
  - https://developer.arylic.com/httpapi/
  - https://github.com/cvdlinden/wiim-httpapi
retrieved_at: 2026-04-29T15:03:42.082Z
last_checked_at: 2026-10-07T20:33:23.358Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:33:23.358Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 action units (34 actions plus 10 query feedbacks) match source commands with correct shapes. Transport base URL is supported and the unresolved fields are honest gaps. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "port number not stated in source; standard HTTPS implied but not confirmed"
- "presence and format depend on trigger (omit for trigger 0 or 2; YYYYMMDD for trigger 1; 2-byte day-of-week for trigger 3; 2-byte weekday bitmask for trigger 4; 2-byte day-of-month for trigger 5)\""
- "shell path or playback URL, should be less than 256 bytes\""
- "source does not describe unsolicited notifications or event subscription mechanism"
- "source does not describe multi-step macro sequences"
- "the source does not state an authentication procedure."
- "port number not stated — standard HTTPS (443) is implied but not confirmed"
- "authentication procedure not stated in source"
- "no event/notification subscription mechanism described"
- "firmware version compatibility not stated"
- "maximum concurrent connection limit not stated"
- "command rate limits not stated"
- "error response codes beyond OK/Failed not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
