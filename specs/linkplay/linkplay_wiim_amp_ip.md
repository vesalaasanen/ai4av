---
spec_id: admin/linkplay-wiim-amp
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linkplay WiiM Amp Control Spec"
manufacturer: Linkplay
model_family: "WiiM Amp"
aliases: []
compatible_with:
  manufacturers:
    - Linkplay
  models:
    - "WiiM Amp"
  firmware: "\"Linkplay.4.6.425351\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiimhome.com
source_urls:
  - "https://www.wiimhome.com/pdf/HTTP%20API%20for%20WiiM%20Products.pdf"
retrieved_at: 2026-05-21T11:05:56.159Z
last_checked_at: 2026-06-09T12:54:22.745Z
generated_at: 2026-06-09T12:54:22.745Z
firmware_coverage: "\"Linkplay.4.6.425351\""
protocol_coverage: []
known_gaps:
  - "serial control not documented"
  - "no discrete settable parameters outside action commands"
  - "no unsolicited notifications documented - device is request-response only"
  - "no multi-step sequences documented"
  - "no safety warnings in source"
  - "serial/RS-232 control not documented in source"
  - "raw TCP socket control not documented in source"
  - "firmware compatibility range not stated"
  - "fault behavior and error recovery not documented"
verification:
  verdict: verified
  checked_at: 2026-06-09T12:54:22.745Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec action-units are documented in source with matching command names, parameters, and behavior. Source defines 34 distinct HTTP API endpoints in sections 2.1-2.10; spec exhaustively covers each. Transport (HTTP GET to /httpapi.asp with query parameters) is uniform across all commands. No authentication required per source. Parameter types and ranges match (e.g., volume 0-100, alarm indices 0-2, loop modes 0,1,2,-1). No gaps, no fabrications, no drift in semantics. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Linkplay WiiM Amp Control Spec

## Summary
IP-based HTTP API control for WiiM Amp streaming amplifier. Controls playback, volume, EQ, source switching, presets, and alarms via HTTPS GET requests to `/httpapi.asp`. Device supports multiple audio sources including AirPlay, DLNA, Spotify Connect, TIDAL Connect, AUX, Bluetooth, optical, and USB storage.

<!-- UNRESOLVED: serial control not documented -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: https://{device_ip}/httpapi.asp?command=********
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # reboot, shutdown commands present
- queryable       # getStatusEx, getPlayerStatus, getMetaInfo present
- levelable       # volume control (0-100) present
- routable        # source input switching present
```

## Actions
```yaml
- id: play_url
  label: Play Audio URL
  kind: action
  params:
    - name: url
      type: string
      description: Audio stream URL

- id: play_playlist
  label: Play Playlist
  kind: action
  params:
    - name: url
      type: string
      description: Playlist URL (m3u or ASX)
    - name: index
      type: integer
      description: Start index

- id: play_hex_playlist
  label: Play Hex-Encoded Playlist
  kind: action
  params:
    - name: url
      type: string
      description: Hex-encoded playlist URL

- id: pause
  label: Pause
  kind: action
  params: []

- id: resume
  label: Resume
  kind: action
  params: []

- id: toggle_pause
  label: Toggle Pause/Play
  kind: action
  params: []

- id: stop
  label: Stop
  kind: action
  params: []

- id: prev
  label: Previous Track
  kind: action
  params: []

- id: next
  label: Next Track
  kind: action
  params: []

- id: seek
  label: Seek
  kind: action
  params:
    - name: position
      type: integer
      description: Position in seconds (0 to duration)

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 0-100

- id: mute
  label: Mute
  kind: action
  params:
    - name: enable
      type: boolean
      description: "true: mute, false: unmute"

- id: set_loop_mode
  label: Set Loop Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: sequence no loop, 1: single loop, 2: shuffle loop, -1: sequence loop"

- id: eq_on
  label: EQ On
  kind: action
  params: []

- id: eq_off
  label: EQ Off
  kind: action
  params: []

- id: eq_load
  label: Load EQ Preset
  kind: action
  params:
    - name: preset
      type: string
      description: EQ preset name (Flat, Acoustic, Bass Booster, etc.)

- id: reboot
  label: Reboot Device
  kind: action
  params: []

- id: shutdown
  label: Shutdown Device
  kind: action
  params:
    - name: seconds
      type: integer
      description: "0: immediate, -1: cancel timer"

- id: set_alarm
  label: Set Alarm
  kind: action
  params:
    - name: index
      type: integer
      description: Alarm index 0-2
    - name: trigger
      type: integer
      description: "0: cancel, 1: once, 2: daily, 3: weekly, 4: weekly bitmask, 5: monthly"
    - name: operation
      type: integer
      description: "0: shell, 1: playback, 2: stop"
    - name: time
      type: string
      description: HHMMSS UTC
    - name: day
      type: string
      description: Day parameter per trigger type
    - name: url
      type: string
      description: Shell path or playback URL (<256 bytes)

- id: stop_alarm
  label: Stop Alarm
  kind: action
  params: []

- id: switch_source
  label: Switch Source
  kind: action
  params:
    - name: source
      type: string
      description: "line-in, bluetooth, optical, udisk, wifi"

- id: play_preset
  label: Play Preset
  kind: action
  params:
    - name: number
      type: integer
      description: Preset number 1-12

- id: set_audio_output_mode
  label: Set Audio Output Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1: SPDIF, 2: AUX, 3: COAX"
- id: get_device_status
  label: Get Device Status
  kind: query
  params: []

- id: get_network_status
  label: Get Network Connection Status
  kind: query
  params: []

- id: get_player_status
  label: Get Player Status
  kind: query
  params: []

- id: get_eq_status
  label: Get EQ Status
  kind: query
  params: []

- id: get_eq_list
  label: Get EQ Preset List
  kind: query
  params: []

- id: get_shutdown_timer
  label: Get Shutdown Timer
  kind: query
  params: []

- id: get_alarm
  label: Get Alarm
  kind: query
  params:
    - name: index
      type: integer
      description: Alarm index 0-2

- id: get_preset_list
  label: Get Preset List
  kind: query
  params: []

- id: get_track_metadata
  label: Get Track Metadata
  kind: query
  params: []

- id: get_audio_output_mode
  label: Get Audio Output Mode
  kind: query
  params: []

- id: time_sync
  label: Sync Device Time
  kind: action
  params:
    - name: datetime
      type: string
      description: UTC datetime in YYYYMMDDHHMMSS format
```

## Feedbacks
```yaml
- id: device_status
  label: Device Status
  type: object
  fields:
    - ssid, firmware, build, group, uuid, MAC, volume, mute, internet, etc.

- id: playback_status
  label: Playback Status
  type: object
  fields:
    - type: master(0) or slave(1)
    - ch: stereo(0), left(1), right(2)
    - mode: source type (AirPlay=1, DLNA=2, playlist=10-19, Spotify=31, TIDAL=32, etc.)
    - loop: loop mode
    - status: play/stop/loading/pause
    - curpos: position ms
    - totlen: duration ms
    - vol: volume 0-100
    - mute: mute state
    - plicount: playlist track count
    - plicurr: current track index

- id: network_status
  label: Network Status
  type: enum
  values: [PROCESS, PAIRFAIL, FAIL, OK]

- id: eq_status
  label: EQ Status
  type: enum
  values: [On, Off]

- id: eq_list
  label: EQ Preset List
  type: array
  values: [Flat, Acoustic, Bass Booster, Bass Reducer, Classical, Dance, Deep, Electronic, Hip-Hop, Jazz, Latin, Loudness, Lounge, Piano, Pop, R&B, Rock, Small Speakers, Spoken Word, Treble Booster, Treble Reducer, Vocal Booster]

- id: shutdown_timer
  label: Shutdown Timer
  type: integer
  description: Seconds remaining

- id: alarm_info
  label: Alarm Info
  type: object
  fields:
    - enable, trigger, operation, time, day/week_day/date per trigger type, path

- id: preset_list
  label: Preset List
  type: array
  fields: [number, name, url, source, picurl]

- id: track_metadata
  label: Track Metadata
  type: object
  fields:
    - album, title, artist, albumArtURI, sampleRate, bitDepth

- id: audio_output_mode
  label: Audio Output Mode
  type: object
  fields:
    - hardware: output mode (1: SPDIF, 2: AUX, 3: COAX)
    - source: BT output (0: disable, 1: active)
    - audiocast: audio cast output (0: disable, 1: active)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented - device is request-response only
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings in source
```

## Notes
HTTP API uses query parameters appended to `/httpapi.asp?command=`. Responses are JSON except `wlanGetConnectState` which returns plain strings. Volume range is 0-100. Presets are 1-indexed (1-12). Device has no login/auth mechanism described. Time sync and alarm operations use UTC. Shutdown timer accepts 0 (immediate), -1 (cancel).

<!-- UNRESOLVED: serial/RS-232 control not documented in source -->
<!-- UNRESOLVED: raw TCP socket control not documented in source -->
<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: fault behavior and error recovery not documented -->

## Provenance

```yaml
source_domains:
  - wiimhome.com
source_urls:
  - "https://www.wiimhome.com/pdf/HTTP%20API%20for%20WiiM%20Products.pdf"
retrieved_at: 2026-05-21T11:05:56.159Z
last_checked_at: 2026-06-09T12:54:22.745Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T12:54:22.745Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec action-units are documented in source with matching command names, parameters, and behavior. Source defines 34 distinct HTTP API endpoints in sections 2.1-2.10; spec exhaustively covers each. Transport (HTTP GET to /httpapi.asp with query parameters) is uniform across all commands. No authentication required per source. Parameter types and ranges match (e.g., volume 0-100, alarm indices 0-2, loop modes 0,1,2,-1). No gaps, no fabrications, no drift in semantics. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial control not documented"
- "no discrete settable parameters outside action commands"
- "no unsolicited notifications documented - device is request-response only"
- "no multi-step sequences documented"
- "no safety warnings in source"
- "serial/RS-232 control not documented in source"
- "raw TCP socket control not documented in source"
- "firmware compatibility range not stated"
- "fault behavior and error recovery not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
