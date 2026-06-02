---
spec_id: admin/linkplay-wiim-ultra
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linkplay WiiM Ultra Control Spec"
manufacturer: Linkplay
model_family: "WiiM Ultra"
aliases: []
compatible_with:
  manufacturers:
    - Linkplay
  models:
    - "WiiM Ultra"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiimhome.com
source_urls:
  - "https://www.wiimhome.com/pdf/HTTP%20API%20for%20WiiM%20Products.pdf"
  - https://www.wiimhome.com/support
retrieved_at: 2026-06-01T21:31:18.451Z
last_checked_at: 2026-06-02T08:27:21.389Z
generated_at: 2026-06-02T08:27:21.389Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source examples are for \"WiiM Mini\" but the API surface is documented as common to Linkplay WiiM products. No WiiM Ultra-specific behavior is documented separately."
  - "port not stated in source"
  - "source does not document unsolicited notifications / push events."
  - "source does not document multi-step macro sequences."
  - "source does not document safety warnings, interlocks, or power-on sequencing."
  - "port number not stated in source. UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: events, macros, and safety sections have no source evidence."
verification:
  verdict: verified
  checked_at: 2026-06-02T08:27:21.389Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec commands match verbatim source entries across all API sections; transport base URL confirmed; source has no undocumented commands beyond spec coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Linkplay WiiM Ultra Control Spec

## Summary
The WiiM Ultra is a network music streamer exposing an HTTPS-based HTTP API for device, playback, EQ, alarm, preset, and audio-output control. Requests are HTTPS GETs to `https://{device-ip}/httpapi.asp?command={command}`, with JSON responses for most endpoints.

<!-- UNRESOLVED: source examples are for "WiiM Mini" but the API surface is documented as common to Linkplay WiiM products. No WiiM Ultra-specific behavior is documented separately. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "https://{device-ip}/httpapi.asp?command={command}"  # x.x.x.x is the device IP; no port stated in source
  # UNRESOLVED: port not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: reboot and shutdown commands present
- queryable  # inferred: getStatusEx, getPlayerStatus, getPresetInfo, etc.
- routable  # inferred: setPlayerCmd:switchmode and setAudioOutputHardwareMode
- levelable  # inferred: setPlayerCmd:vol
```

## Actions
```yaml
# All commands below are appended to the base URL path with the device IP
# substituted for {device-ip}, e.g.:
#   https://10.10.10.254/httpapi.asp?command={command_payload}

# ---- 2.1 Device information ----
- id: get_device_info
  label: Get Device Information
  kind: query
  command: "getStatusEx"
  params: []

# ---- 2.2 Network ----
- id: get_wlan_connect_state
  label: Get WLAN Connection State
  kind: query
  command: "wlanGetConnectState"
  params: []
  # Note: response is plain text, not JSON (PROCESS | PAIRFAIL | FAIL | OK)

# ---- 2.3 Playback control ----
- id: get_player_status
  label: Get Player Status
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
      description: Audio stream URL to play

- id: play_playlist
  label: Play Audio Playlist
  kind: action
  command: "setPlayerCmd:playlist:url:{index}"
  params:
    - name: url
      type: string
      description: m3u or ASX playlist URL
    - name: index
      type: integer
      description: Start index in playlist

- id: play_hex_playlist
  label: Play Audio Playlist (hex-encoded URL)
  kind: action
  command: "setPlayerCmd:hex_playlist:url:{index}"
  params:
    - name: url
      type: string
      description: m3u or ASX playlist URL in hex form
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

- id: toggle_pause
  label: Toggle Pause / Play
  kind: action
  command: "setPlayerCmd:onepause"
  params: []

- id: prev_track
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
  label: Seek
  kind: action
  command: "setPlayerCmd:seek:{position}"
  params:
    - name: position
      type: integer
      description: Position in seconds, 0 to duration

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
      description: Volume level, 0 to 100

- id: set_mute
  label: Mute / Unmute
  kind: action
  command: "setPlayerCmd:mute:{n}"
  params:
    - name: n
      type: integer
      description: 1 to mute, 0 to unmute

- id: set_loop_mode
  label: Set Loop Mode
  kind: action
  command: "setPlayerCmd:loopmode:{n}"
  params:
    - name: n
      type: integer
      description: "0 sequence-no-loop, 1 single-loop, 2 shuffle-loop, -1 sequence-loop"

# ---- 2.4 EQ ----
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

- id: eq_get_stat
  label: Get EQ State
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
      description: "EQ preset name (Flat, Acoustic, Bass Booster, Bass Reducer, Classical, Dance, Deep, Electronic, Hip-Hop, Jazz, Latin, Loudness, Lounge, Piano, Pop, R&B, Rock, Small Speakers, Spoken Word, Treble Booster, Treble Reducer, Vocal Booster)"

# ---- 2.5 Device control ----
- id: reboot
  label: Reboot
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
      description: "Seconds until shutdown; 0 for immediate, -1 to cancel a pending shutdown"

- id: get_shutdown
  label: Get Shutdown Timer
  kind: query
  command: "getShutdown"
  params: []

# ---- 2.6 Alarm clock ----
- id: time_sync
  label: Sync Device Time
  kind: action
  command: "timeSync:{YYYYMMDDHHMMSS}"
  params:
    - name: YYYYMMDDHHMMSS
      type: string
      description: "Time in UTC, format YYYYMMDDHHMMSS (year 4-digit, month/day/hour/minute/second 2-digit each)"

- id: set_alarm
  label: Set Alarm
  kind: action
  command: "setAlarmClock:{n}:{trig}:{op}:{time}[:{day}][:{url}]"
  params:
    - name: n
      type: integer
      description: Alarm index, 0-2 (max 3 alarms)
    - name: trig
      type: integer
      description: "0 cancel, 1 once (day=YYYYMMDD), 2 every day, 3 every week (day 2 bytes 00-06 Sun-Sat), 4 every week (day bitmask, 0x01=Sun..0x7F=every day), 5 every month (day 01-31)"
    - name: op
      type: integer
      description: "0 shell execute, 1 playback or ring, 2 stop playback"
    - name: time
      type: string
      description: "HHMMSS in UTC"
    - name: day
      type: string
      description: "Trigger-specific day spec (YYYYMMDD | weekday bytes | day-of-month) - required for trig 1/3/4/5; omit for 0/2"
    - name: url
      type: string
      description: Shell path or playback URL, max 256 bytes

- id: get_alarm
  label: Get Alarm
  kind: query
  command: "getAlarmClock:{n}"
  params:
    - name: n
      type: integer
      description: Alarm index, 0-2

- id: stop_alarm
  label: Stop Current Alarm
  kind: action
  command: "alarmStop"
  params: []

# ---- 2.7 Source input switch ----
- id: switch_source
  label: Switch Source Input
  kind: action
  command: "setPlayerCmd:switchmode:{mode}"
  params:
    - name: mode
      type: string
      description: "Source mode: line-in (aux-in), bluetooth, optical, udisk, wifi"

# ---- 2.8 Presets ----
- id: play_preset
  label: Play Preset
  kind: action
  command: "MCUKeyShortClick:{n}"
  params:
    - name: n
      type: integer
      description: Preset number, 1 to 12

- id: get_preset_info
  label: Get Preset List
  kind: query
  command: "getPresetInfo"
  params: []

# ---- 2.9 Current track metadata ----
- id: get_meta_info
  label: Get Current Track Metadata
  kind: query
  command: "getMetaInfo"
  params: []

# ---- 2.10 Audio output ----
- id: get_audio_output_mode
  label: Get Audio Output Mode
  kind: query
  command: "getNewAudioOutputHardwareMode"
  params: []

- id: set_audio_output_mode
  label: Set Audio Output Mode
  kind: action
  command: "setAudioOutputHardwareMode:{outputmode}"
  params:
    - name: outputmode
      type: integer
      description: "1 SPDIF, 2 AUX, 3 COAX"
```

## Feedbacks
```yaml
# getStatusEx returns a flat JSON object with fields:
#   language, ssid, hideSSID, firmware, build, project, priv_prj, Release,
#   FW_Release_version, group, wmrm_version, expired, internet, uuid, MAC,
#   BT_MAC, AP_MAC, date, time, netstat, essid, apcli0, eth0, ETH_MAC,
#   hardware, VersionUpdate, NewVer, mcu_ver, mcu_ver_new, update_check_count,
#   ra0, temp_uuid, cap1, capability, languages, prompt_status, alexa_ver,
#   alexa_beta_enable, alexa_force_beta_cfg, dsp_ver, streams_all, streams,
#   region, volume_control, external, preset_key, plm_support, lbc_support,
#   WifiChannel, RSSI, BSSID, wlanFreq, wlanDataRate, battery,
#   battery_percent, securemode, ota_interface_ver, upnp_version,
#   upnp_uuid, uart_pass_port, communication_port, web_firmware_update_hide,
#   tidal_version, service_version, EQ_support, HiFiSRC_version, power_mode,
#   security, security_version, security_capabilities, public_https_version,
#   privacy_mode, DeviceName, GroupName

- id: wlan_state
  type: enum
  values: [PROCESS, PAIRFAIL, FAIL, OK]
  source: wlanGetConnectState  # plain-text response, not JSON

- id: player_status
  type: object
  source: getPlayerStatus
  fields:
    type: int  # 0 master/standalone, 1 slave
    ch: int    # 0 stereo, 1 left, 2 right
    mode: int  # 0 none, 1 AirPlay, 2 DLNA, 10-19 Wiimu, 20-30 reserved, 31 Spotify, 32 TIDAL, 40 AUX-In, 41 BT, 42 external storage, 43 Optical-In, 50 Mirror, 60 voice mail, 99 slave
    loop: int  # 0 loop all, 1 single, 2 shuffle-loop, 3 shuffle-no-loop, 4 no shuffle/no loop
    eq: int    # EQ preset number
    status: string  # stop | play | loading | pause
    curpos: int     # ms
    offset_pts: int
    totlen: int     # ms
    alarmflag: int
    plicount: int   # total tracks
    plicurr: int    # current track index
    vol: int        # 0-100
    mute: int       # 0 unmute, 1 mute

- id: eq_state
  type: enum
  values: [On, Off]
  source: EQGetStat

- id: eq_preset_list
  type: array
  source: EQGetList
  items: string
  # Flat, Acoustic, Bass Booster, Bass Reducer, Classical, Dance, Deep,
  # Electronic, Hip-Hop, Jazz, Latin, Loudness, Lounge, Piano, Pop, R&B,
  # Rock, Small Speakers, Spoken Word, Treble Booster, Treble Reducer, Vocal Booster

- id: shutdown_timer_seconds
  type: integer
  source: getShutdown

- id: audio_output_mode
  type: object
  source: getNewAudioOutputHardwareMode
  fields:
    hardware: int  # 1 SPDIF, 2 AUX, 3 COAX
    source: int    # 0 disabled, 1 active (BT source)
    audiocast: int # 0 disabled, 1 active

- id: preset_list
  type: object
  source: getPresetInfo
  fields:
    preset_num: int
    preset_list: array  # of {number, name, url, source, picurl}

- id: track_metadata
  type: object
  source: getMetaInfo
  fields:
    metaData:
      album: string
      title: string
      artist: string
      albumArtURI: string
      sampleRate: int
      bitDepth: int

- id: alarm_entry
  type: object
  source: getAlarmClock
  fields:
    enable: int
    trigger: int
    operation: int
    date: string   # present when not "every day"
    week_day: int  # present when trigger is "every week"
    day: string    # present when "every month"
    time: string
    path: string
```

## Variables
```yaml
# settable parameters that are parameterized actions, listed for reference
- id: volume
  type: integer
  range: [0, 100]
  action: set_volume

- id: mute
  type: integer
  range: [0, 1]
  action: set_mute

- id: loop_mode
  type: integer
  values: [-1, 0, 1, 2]
  action: set_loop_mode

- id: source_input
  type: string
  values: [line-in, bluetooth, optical, udisk, wifi]
  action: switch_source

- id: audio_output_hardware_mode
  type: integer
  values: [1, 2, 3]
  action: set_audio_output_mode
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications / push events.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing.
```

## Notes
- Base URL pattern is `https://{device-ip}/httpapi.asp?command={command}`; substitute the device's LAN IP.
- HTTPS is used (not plain HTTP). The source does not state the TCP port; the default for HTTPS is 443, but treat as UNRESOLVED.
- `wlanGetConnectState` returns plain text (`PROCESS` / `PAIRFAIL` / `FAIL` / `OK`), not JSON.
- The example response objects in the source (e.g. `getStatusEx`) are labelled "WiiM Mini"; the API surface is documented as common to all Linkplay WiiM products.
- `setAlarmClock` with `trig=0` cancels without `op`/`time`/`day`/`url` (e.g. `setAlarmClock:n:0`).
- `communication_port` (8819) appears in `getStatusEx` response — its semantics are not documented in the source.

<!-- UNRESOLVED: port number not stated in source. UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: events, macros, and safety sections have no source evidence. -->

## Provenance

```yaml
source_domains:
  - wiimhome.com
source_urls:
  - "https://www.wiimhome.com/pdf/HTTP%20API%20for%20WiiM%20Products.pdf"
  - https://www.wiimhome.com/support
retrieved_at: 2026-06-01T21:31:18.451Z
last_checked_at: 2026-06-02T08:27:21.389Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:27:21.389Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec commands match verbatim source entries across all API sections; transport base URL confirmed; source has no undocumented commands beyond spec coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source examples are for \"WiiM Mini\" but the API surface is documented as common to Linkplay WiiM products. No WiiM Ultra-specific behavior is documented separately."
- "port not stated in source"
- "source does not document unsolicited notifications / push events."
- "source does not document multi-step macro sequences."
- "source does not document safety warnings, interlocks, or power-on sequencing."
- "port number not stated in source. UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: events, macros, and safety sections have no source evidence."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
