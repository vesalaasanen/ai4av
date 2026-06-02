---
spec_id: admin/linkplay-wiim-ci-mod-a80
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linkplay WiiM CI MOD A80 Control Spec"
manufacturer: Linkplay
model_family: "WiiM CI MOD A80"
aliases: []
compatible_with:
  manufacturers:
    - Linkplay
  models:
    - "WiiM CI MOD A80"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiimhome.com
  - cvdlinden.github.io
source_urls:
  - "https://www.wiimhome.com/pdf/HTTP%20API%20for%20WiiM%20Products.pdf"
  - https://cvdlinden.github.io/wiim-httpapi/
  - https://www.wiimhome.com/support
retrieved_at: 2026-06-01T21:26:15.622Z
last_checked_at: 2026-06-02T08:27:16.178Z
generated_at: 2026-06-02T08:27:16.178Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number not stated in source (HTTPS default 443 implied but not explicit)"
  - "firmware version compatibility not stated"
  - "port number not explicitly stated in source"
  - "settable parameters expressed as commands above; no separate variable model documented"
  - "source documents request/response API only; no unsolicited push events described"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures stated in source"
  - "TCP port for HTTPS not explicitly stated in source (URLs use no explicit port)"
  - "firmware version compatibility range not documented"
  - "TLS certificate handling / cert pinning behavior not documented"
  - "response codes / error format for failed requests beyond {\"status\":\"Failed\"} not enumerated"
  - "rate limits, command queueing, concurrent request behavior not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T08:27:16.178Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions match source commands verbatim; source has exactly 34 commands; transport base_url confirmed; coverage ratio 1.00. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Linkplay WiiM CI MOD A80 Control Spec

## Summary
WiiM CI MOD A80 streaming audio device, controlled over HTTPS via `httpapi.asp` endpoint. Spec covers playback control, EQ, presets, source input switching, alarm clock, audio output routing, and device status queries.

<!-- UNRESOLVED: TCP port number not stated in source (HTTPS default 443 implied but not explicit) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "https://{device_ip}/httpapi.asp"  # request format from source §1.2
  port: null  # UNRESOLVED: port number not explicitly stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from reboot and setShutdown commands
- queryable    # inferred from getStatusEx, getPlayerStatus, getMetaInfo, etc.
- levelable    # inferred from setPlayerCmd:vol volume control
- routable     # inferred from setPlayerCmd:switchmode input source routing
```

## Actions
```yaml
- id: get_device_info
  label: Get Device Information
  kind: query
  command: "getStatusEx"
  params: []

- id: get_wlan_connect_state
  label: Get WLAN Connection State
  kind: query
  command: "wlanGetConnectState"
  params: []

- id: get_player_status
  label: Get Playback Status
  kind: query
  command: "getPlayerStatus"
  params: []

- id: play_url
  label: Play Audio URL
  kind: action
  command: "setPlayerCmd:play:{url}"
  params:
    - name: url
      type: string
      description: Audio stream URL

- id: play_playlist
  label: Play Audio Playlist
  kind: action
  command: "setPlayerCmd:playlist:{url}:{index}"
  params:
    - name: url
      type: string
      description: m3u or ASX playlist URL
    - name: index
      type: integer
      description: Start track index

- id: play_hex_playlist
  label: Play Audio Playlist (Hex-Encoded URL)
  kind: action
  command: "setPlayerCmd:hex_playlist:{url}:{index}"
  params:
    - name: url
      type: string
      description: Hex-encoded m3u or ASX playlist URL
    - name: index
      type: integer
      description: Start track index

- id: pause
  label: Pause Playback
  kind: action
  command: "setPlayerCmd:pause"
  params: []

- id: resume
  label: Resume Playback
  kind: action
  command: "setPlayerCmd:resume"
  params: []

- id: toggle_pause_play
  label: Toggle Pause/Play
  kind: action
  command: "setPlayerCmd:onepause"
  params: []

- id: previous_track
  label: Previous Track
  kind: action
  command: "setPlayerCmd:prev"
  params: []

- id: next_track
  label: Next Track
  kind: action
  command: "setPlayerCmd:next"
  params: []

- id: seek
  label: Seek to Position
  kind: action
  command: "setPlayerCmd:seek:{position}"
  params:
    - name: position
      type: integer
      description: Seek position in seconds (0 to duration)

- id: stop
  label: Stop Playback
  kind: action
  command: "setPlayerCmd:stop"
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  command: "setPlayerCmd:vol:{value}"
  params:
    - name: value
      type: integer
      description: Volume level (0-100)

- id: set_mute
  label: Set Mute
  kind: action
  command: "setPlayerCmd:mute:{n}"
  params:
    - name: n
      type: integer
      description: 1 = mute, 0 = unmute

- id: set_loop_mode
  label: Set Loop Mode
  kind: action
  command: "setPlayerCmd:loopmode:{n}"
  params:
    - name: n
      type: integer
      description: "0=Sequence no loop, 1=Single loop, 2=Shuffle loop, -1=Sequence loop"

- id: eq_on
  label: Turn EQ On
  kind: action
  command: "EQOn"
  params: []

- id: eq_off
  label: Turn EQ Off
  kind: action
  command: "EQOff"
  params: []

- id: eq_get_state
  label: Get EQ Enable State
  kind: query
  command: "EQGetStat"
  params: []

- id: eq_get_list
  label: Get Available EQ Presets
  kind: query
  command: "EQGetList"
  params: []

- id: eq_load
  label: Load EQ Preset
  kind: action
  command: "EQLoad:{name}"
  params:
    - name: name
      type: string
      description: EQ preset name from EQGetList (e.g. Flat, Acoustic, Rock)

- id: reboot
  label: Reboot Device
  kind: action
  command: "reboot"
  params: []

- id: set_shutdown
  label: Schedule Shutdown
  kind: action
  command: "setShutdown:{sec}"
  params:
    - name: sec
      type: integer
      description: "Seconds until shutdown (0=immediate, -1=cancel)"

- id: get_shutdown
  label: Get Shutdown Timer
  kind: query
  command: "getShutdown"
  params: []

- id: time_sync
  label: Sync Network Time
  kind: action
  command: "timeSync:{datetime}"
  params:
    - name: datetime
      type: string
      description: UTC datetime as YYYYMMDDHHMMSS

- id: set_alarm_clock
  label: Set Alarm Clock
  kind: action
  command: "setAlarmClock:{n}:{trig}:{op}:{time}:{day}:{url}"
  params:
    - name: n
      type: integer
      description: Alarm slot (0-2, max 3 alarms)
    - name: trig
      type: integer
      description: "Trigger: 0=cancel, 1=once, 2=daily, 3=weekly day-of-week, 4=weekly bitmask, 5=monthly"
    - name: op
      type: integer
      description: "Operation: 0=shell exec, 1=playback/ring, 2=stop playback"
    - name: time
      type: string
      description: UTC time HHMMSS
    - name: day
      type: string
      description: Day field, format depends on trig (omitted when trig=0 or 2)
    - name: url
      type: string
      description: Shell path or playback URL (<256 bytes)

- id: get_alarm_clock
  label: Get Alarm Clock
  kind: query
  command: "getAlarmClock:{n}"
  params:
    - name: n
      type: integer
      description: Alarm slot (0-2)

- id: alarm_stop
  label: Stop Current Alarm
  kind: action
  command: "alarmStop"
  params: []

- id: switch_source_input
  label: Switch Source Input
  kind: action
  command: "setPlayerCmd:switchmode:{mode}"
  params:
    - name: mode
      type: string
      description: "Source mode: line-in, bluetooth, optical, udisk, wifi"

- id: play_preset
  label: Play Preset
  kind: action
  command: "MCUKeyShortClick:{n}"
  params:
    - name: n
      type: integer
      description: Preset number (1-12)

- id: get_preset_info
  label: Get Preset List
  kind: query
  command: "getPresetInfo"
  params: []

- id: get_meta_info
  label: Get Current Track Metadata
  kind: query
  command: "getMetaInfo"
  params: []

- id: get_audio_output_mode
  label: Get Audio Output Hardware Mode
  kind: query
  command: "getNewAudioOutputHardwareMode"
  params: []

- id: set_audio_output_mode
  label: Set Audio Output Hardware Mode
  kind: action
  command: "setAudioOutputHardwareMode:{mode}"
  params:
    - name: mode
      type: integer
      description: "1=SPDIF, 2=AUX, 3=COAX"
```

## Feedbacks
```yaml
- id: wlan_connect_state
  type: enum
  values: [PROCESS, PAIRFAIL, FAIL, OK]
  description: Return from wlanGetConnectState (plain text, not JSON)

- id: play_status
  type: enum
  values: [stop, play, loading, pause]
  description: status field of getPlayerStatus JSON

- id: channel_mode
  type: enum
  values: [stereo, left, right]
  description: ch field of getPlayerStatus (0=stereo, 1=left, 2=right)

- id: source_mode
  type: integer
  description: "mode field of getPlayerStatus (0=none, 1=AirPlay, 2=DLNA, 10-19=Wiimu playlist, 31=Spotify Connect, 32=TIDAL Connect, 40=AUX-In, 41=BT, 42=external storage, 43=Optical-In, 50=Mirror, 60=Voice mail, 99=Slave)"

- id: loop_mode
  type: integer
  description: "loop field of getPlayerStatus (0=loop all, 1=single, 2=shuffle loop, 3=shuffle no loop, 4=no shuffle no loop)"

- id: current_position
  type: integer
  description: curpos in ms from getPlayerStatus

- id: total_length
  type: integer
  description: totlen duration in ms from getPlayerStatus

- id: current_volume
  type: integer
  description: vol field of getPlayerStatus (0-100)

- id: mute_state
  type: enum
  values: [0, 1]
  description: mute field of getPlayerStatus

- id: playlist_count
  type: integer
  description: plicount total tracks in playlist

- id: playlist_current_index
  type: integer
  description: plicurr current track index

- id: eq_enabled
  type: enum
  values: [On, Off]
  description: EQStat field returned by EQGetStat

- id: eq_preset_list
  type: array
  description: JSON array of EQ preset names from EQGetList

- id: shutdown_timer_remaining
  type: integer
  description: Seconds returned by getShutdown

- id: command_status
  type: enum
  values: [OK, Failed]
  description: Generic status response for EQOn/EQOff/EQLoad/setShutdown

- id: track_metadata
  type: object
  description: "JSON object from getMetaInfo with fields: album, title, artist, albumArtURI, sampleRate, bitDepth"

- id: audio_output_hardware
  type: integer
  description: "hardware field from getNewAudioOutputHardwareMode (1=SPDIF, 2=AUX, 3=COAX)"

- id: audio_output_bt_source
  type: enum
  values: [0, 1]
  description: "source field (0=disable, 1=active BT source)"

- id: audio_output_audiocast
  type: enum
  values: [0, 1]
  description: "audiocast field (0=disable, 1=active)"

- id: preset_list
  type: object
  description: "JSON from getPresetInfo with preset_num and preset_list[] (number, name, url, source, picurl)"

- id: device_info
  type: object
  description: "JSON from getStatusEx including firmware, uuid, MAC, BT_MAC, DeviceName, GroupName, RSSI, ssid, hardware, internet, group, etc."

- id: alarm_clock_info
  type: object
  description: "JSON from getAlarmClock with enable, trigger, operation, date, week_day, day, time, path fields"
```

## Variables
```yaml
# UNRESOLVED: settable parameters expressed as commands above; no separate variable model documented
```

## Events
```yaml
# UNRESOLVED: source documents request/response API only; no unsolicited push events described
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- Request format per source §1.2: `https://<device-ip>/httpapi.asp?command=<command-string>`. Most responses are JSON; `wlanGetConnectState` returns plain text.
- `%d` denotes integer parameter, `%s` denotes string parameter in source command templates.
- Group play semantics: when device is master, mute command propagates to slaves (per §2.3.12).
- WiiM Home App supports up to 12 user-configurable presets; preset slots may be sparse (preset_list only contains configured entries).
- Max 3 alarm slots (n: 0-2).
- `getStatusEx` exposes `group` field (0=master/standalone, 1=slave); useful for multi-room topology discovery.

<!-- UNRESOLVED: TCP port for HTTPS not explicitly stated in source (URLs use no explicit port) -->
<!-- UNRESOLVED: firmware version compatibility range not documented -->
<!-- UNRESOLVED: TLS certificate handling / cert pinning behavior not documented -->
<!-- UNRESOLVED: response codes / error format for failed requests beyond {"status":"Failed"} not enumerated -->
<!-- UNRESOLVED: rate limits, command queueing, concurrent request behavior not stated -->

## Provenance

```yaml
source_domains:
  - wiimhome.com
  - cvdlinden.github.io
source_urls:
  - "https://www.wiimhome.com/pdf/HTTP%20API%20for%20WiiM%20Products.pdf"
  - https://cvdlinden.github.io/wiim-httpapi/
  - https://www.wiimhome.com/support
retrieved_at: 2026-06-01T21:26:15.622Z
last_checked_at: 2026-06-02T08:27:16.178Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:27:16.178Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions match source commands verbatim; source has exactly 34 commands; transport base_url confirmed; coverage ratio 1.00. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number not stated in source (HTTPS default 443 implied but not explicit)"
- "firmware version compatibility not stated"
- "port number not explicitly stated in source"
- "settable parameters expressed as commands above; no separate variable model documented"
- "source documents request/response API only; no unsolicited push events described"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures stated in source"
- "TCP port for HTTPS not explicitly stated in source (URLs use no explicit port)"
- "firmware version compatibility range not documented"
- "TLS certificate handling / cert pinning behavior not documented"
- "response codes / error format for failed requests beyond {\"status\":\"Failed\"} not enumerated"
- "rate limits, command queueing, concurrent request behavior not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
