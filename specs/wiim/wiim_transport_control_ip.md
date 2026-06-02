---
spec_id: admin/wiim-transport-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "WiiM Transport Control Control Spec"
manufacturer: WiiM
model_family: "WiiM Transport Control"
aliases: []
compatible_with:
  manufacturers:
    - WiiM
  models:
    - "WiiM Transport Control"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiimhome.com
source_urls:
  - "https://www.wiimhome.com/pdf/HTTP%20API%20for%20WiiM%20Products.pdf"
retrieved_at: 2026-05-04T17:29:58.830Z
last_checked_at: 2026-05-14T18:17:21.515Z
generated_at: 2026-05-14T18:17:21.515Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - setPlayerCmd:hex_playlist
  - "exact product models covered (doc is titled \"HTTP API for WiiM PRODUCTS\" suggesting it may apply to multiple WiiM devices)"
  - "no explicit port number stated; HTTPS implies 443 but not confirmed"
  - "firmware version compatibility not stated"
  - "port number not explicitly stated in source (HTTPS default 443 assumed by client)"
  - "no settable continuous parameters beyond discrete actions above"
  - "no unsolicited notification/event mechanism described in source"
  - "no multi-step sequences explicitly described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing in source"
  - "exact WiiM product models this API applies to (doc header says \"WiiM PRODUCTS\" generically)"
  - "meaning and usage of the communication_port (8819) field"
  - "whether HTTP (non-TLS) is also supported"
  - "UPnP/DPAP control interface mentioned in getStatusEx but not documented"
  - "maximum concurrent connection limit"
  - "command rate limits or throttling"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.515Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 33 spec actions matched literally to source commands with correct syntax; hex_playlist variant is a minor extra form not critical to core coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# WiiM Transport Control Control Spec

## Summary

The WiiM Transport Control is a networked audio streaming device controlled via an HTTPS-based HTTP API. Commands are issued as GET requests to the device's `/httpapi.asp` endpoint with the command string passed as a query parameter. Responses are typically JSON. This spec covers playback control, EQ management, source switching, presets, alarm clocks, and device management.

<!-- UNRESOLVED: exact product models covered (doc is titled "HTTP API for WiiM PRODUCTS" suggesting it may apply to multiple WiiM devices) -->
<!-- UNRESOLVED: no explicit port number stated; HTTPS implies 443 but not confirmed -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "https://{device_ip}/httpapi.asp"
  # UNRESOLVED: port number not explicitly stated in source (HTTPS default 443 assumed by client)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: shutdown and reboot commands present
  - queryable      # inferred: getStatusEx, getPlayerStatus, getMetaInfo queries present
  - levelable      # inferred: volume control and mute commands present
  - routable       # inferred: source input switching (switchmode) present
```

## Actions
```yaml
actions:
  - id: play_url
    label: Play Audio URL
    kind: action
    command: "setPlayerCmd:play:{url}"
    params:
      - name: url
        type: string
        description: URL pointing to an audio stream address

  - id: play_playlist
    label: Play Playlist
    kind: action
    command: "setPlayerCmd:playlist:{url}:{index}"
    params:
      - name: url
        type: string
        description: URL to m3u or ASX playlist
      - name: index
        type: integer
        description: Start index in playlist

  - id: pause
    label: Pause
    kind: action
    command: "setPlayerCmd:pause"
    params: []

  - id: resume
    label: Resume
    kind: action
    command: "setPlayerCmd:resume"
    params: []

  - id: toggle_pause_play
    label: Toggle Pause/Play
    kind: action
    command: "setPlayerCmd:onepause"
    params: []

  - id: previous
    label: Previous Track
    kind: action
    command: "setPlayerCmd:prev"
    params: []

  - id: next
    label: Next Track
    kind: action
    command: "setPlayerCmd:next"
    params: []

  - id: seek
    label: Seek
    kind: action
    command: "setPlayerCmd:seek:{position}"
    params:
      - name: position
        type: integer
        description: Position in seconds (0 to track duration)

  - id: stop
    label: Stop
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

  - id: mute
    label: Mute/Unmute
    kind: action
    command: "setPlayerCmd:mute:{n}"
    params:
      - name: n
        type: integer
        description: "1 to mute, 0 to unmute"

  - id: set_loop_mode
    label: Set Loop Mode
    kind: action
    command: "setPlayerCmd:loopmode:{n}"
    params:
      - name: n
        type: integer
        description: "0=sequence no loop, 1=single loop, 2=shuffle loop, -1=sequence loop"

  - id: eq_on
    label: Enable EQ
    kind: action
    command: "EQOn"
    params: []

  - id: eq_off
    label: Disable EQ
    kind: action
    command: "EQOff"
    params: []

  - id: eq_load
    label: Load EQ Preset
    kind: action
    command: "EQLoad:{name}"
    params:
      - name: name
        type: string
        description: "EQ preset name (e.g. Flat, Rock, Pop - see EQGetList)"

  - id: switch_input
    label: Switch Source Input
    kind: action
    command: "setPlayerCmd:switchmode:{mode}"
    params:
      - name: mode
        type: string
        description: "line-in, bluetooth, optical, udisk, or wifi"

  - id: play_preset
    label: Play Preset
    kind: action
    command: "MCUKeyShortClick:{n}"
    params:
      - name: n
        type: integer
        description: Preset number (1-12)

  - id: reboot
    label: Reboot Device
    kind: action
    command: "reboot"
    params: []

  - id: shutdown
    label: Shutdown
    kind: action
    command: "setShutdown:{sec}"
    params:
      - name: sec
        type: integer
        description: "Seconds until shutdown (0=immediate, -1=cancel timer)"

  - id: time_sync
    label: Sync Time
    kind: action
    command: "timeSync:{YYYYMMDDHHMMSS}"
    params:
      - name: YYYYMMDDHHMMSS
        type: string
        description: Date and time string in UTC

  - id: set_alarm
    label: Set Alarm
    kind: action
    command: "setAlarmClock:{n}:{trig}:{op}:{time}:{day}:{url}"
    params:
      - name: n
        type: integer
        description: "Alarm index (0-2)"
      - name: trig
        type: integer
        description: "0=cancel, 1=once, 2=daily, 3=weekly, 4=weekly bitmask, 5=monthly"
      - name: op
        type: integer
        description: "0=shell execute, 1=playback, 2=stop playback"
      - name: time
        type: string
        description: "HHMMSS in UTC"
      - name: day
        type: string
        description: "Varies by trigger type (date string or bitmask)"
      - name: url
        type: string
        description: "Playback URL or shell path (max 256 bytes)"

  - id: stop_alarm
    label: Stop Current Alarm
    kind: action
    command: "alarmStop"
    params: []

  - id: set_audio_output_mode
    label: Set Audio Output Mode
    kind: action
    command: "setAudioOutputHardwareMode:{mode}"
    params:
      - name: mode
        type: integer
        description: "1=SPDIF, 2=AUX, 3=Coax"
```

## Feedbacks
```yaml
feedbacks:
  - id: device_status
    type: json
    command: "getStatusEx"
    description: "Full device status including firmware, network, UUID, capabilities"

  - id: player_status
    type: json
    command: "getPlayerStatus"
    description: "Playback status including type, mode, loop, status (play/pause/stop/loading), position, volume, mute"

  - id: eq_status
    type: enum
    command: "EQGetStat"
    values: [On, Off]

  - id: eq_list
    type: json_array
    command: "EQGetList"
    description: "Available EQ preset names"

  - id: shutdown_timer
    type: integer
    command: "getShutdown"
    description: "Remaining seconds until shutdown"

  - id: alarm
    type: json
    command: "getAlarmClock:{n}"
    description: "Alarm configuration for index n (0-2)"

  - id: preset_list
    type: json
    command: "getPresetInfo"
    description: "List of configured presets with name, URL, source, and artwork"

  - id: track_metadata
    type: json
    command: "getMetaInfo"
    description: "Current track metadata (album, title, artist, albumArtURI, sampleRate, bitDepth)"

  - id: network_status
    type: string
    command: "wlanGetConnectState"
    values: [PROCESS, PAIRFAIL, FAIL, OK]
    description: "WiFi connection status"

  - id: audio_output_mode
    type: json
    command: "getNewAudioOutputHardwareMode"
    description: "Current audio output hardware mode, BT source, and audiocast status"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters beyond discrete actions above
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification/event mechanism described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing in source
```

## Notes
- All commands are issued as HTTPS GET requests to `/httpapi.asp?command=<command>`.
- Responses are typically JSON; `wlanGetConnectState` is a plain string exception.
- Commands use colon-delimited parameters (e.g., `setPlayerCmd:vol:50`).
- URL parameters may need hex encoding per the `hex_playlist` variant.
- Alarms use UTC time, not local time.
- Up to 3 alarms supported (indices 0-2).
- Up to 12 presets supported (indices 1-12).
- The `communication_port` field in `getStatusEx` response (e.g., 8819) may indicate an additional control port, but its purpose is not documented in this source.

<!-- UNRESOLVED: exact WiiM product models this API applies to (doc header says "WiiM PRODUCTS" generically) -->
<!-- UNRESOLVED: meaning and usage of the communication_port (8819) field -->
<!-- UNRESOLVED: whether HTTP (non-TLS) is also supported -->
<!-- UNRESOLVED: UPnP/DPAP control interface mentioned in getStatusEx but not documented -->
<!-- UNRESOLVED: maximum concurrent connection limit -->
<!-- UNRESOLVED: command rate limits or throttling -->

## Provenance

```yaml
source_domains:
  - wiimhome.com
source_urls:
  - "https://www.wiimhome.com/pdf/HTTP%20API%20for%20WiiM%20Products.pdf"
retrieved_at: 2026-05-04T17:29:58.830Z
last_checked_at: 2026-05-14T18:17:21.515Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.515Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 33 spec actions matched literally to source commands with correct syntax; hex_playlist variant is a minor extra form not critical to core coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- setPlayerCmd:hex_playlist
- "exact product models covered (doc is titled \"HTTP API for WiiM PRODUCTS\" suggesting it may apply to multiple WiiM devices)"
- "no explicit port number stated; HTTPS implies 443 but not confirmed"
- "firmware version compatibility not stated"
- "port number not explicitly stated in source (HTTPS default 443 assumed by client)"
- "no settable continuous parameters beyond discrete actions above"
- "no unsolicited notification/event mechanism described in source"
- "no multi-step sequences explicitly described in source"
- "no safety warnings, interlock procedures, or power-on sequencing in source"
- "exact WiiM product models this API applies to (doc header says \"WiiM PRODUCTS\" generically)"
- "meaning and usage of the communication_port (8819) field"
- "whether HTTP (non-TLS) is also supported"
- "UPnP/DPAP control interface mentioned in getStatusEx but not documented"
- "maximum concurrent connection limit"
- "command rate limits or throttling"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
