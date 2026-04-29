---
schema_version: ai4av-public-spec-v1
device_id: wiim/wiim-mini
entity_id: FILL_IN_FROM_CONVEX
spec_id: admin/wiim-speaker
revision: 1
author: admin
title: "WiiM Speaker Control Spec"
status: published
manufacturer: WiiM
manufacturer_key: wiim
model_family: "WiiM Mini"
aliases: []
compatible_with:
  manufacturers:
    - WiiM
  models:
    - "WiiM Mini"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source; example shows Linkplay.4.6.425351"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: wiim_speaker_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:21.152Z
retrieved_at: 2026-04-27T10:13:21.152Z
last_checked_at: 2026-04-27T10:13:21.152Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source; example shows Linkplay.4.6.425351"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:21.152Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions have literal command matches in source; transport protocol and URL structure verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# WiiM Speaker Control Spec

## Summary
The WiiM Speaker (e.g. WiiM Mini) is a network-connected audio streaming device controlled via an HTTPS-based REST API. Commands are issued as HTTP GET requests to `/httpapi.asp?command=<cmd>` on the device's IP address. Responses are JSON or plain text depending on the command. The API covers playback control, volume, mute, EQ presets, input source switching, alarms, presets, device info queries, and power management (reboot/shutdown).

<!-- UNRESOLVED: no specific port number stated in source (standard HTTPS implied but not confirmed) -->
<!-- UNRESOLVED: no authentication or login procedure described in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "https://{device_ip}/httpapi.asp?command={command}"
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: reboot and shutdown commands present
  - queryable     # inferred: getStatusEx, getPlayerStatus, getMetaInfo queries present
  - levelable     # inferred: volume (0-100) and mute controls present
  - routable      # inferred: switchmode command for input source selection
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

  - id: play_playlist
    label: Play Playlist
    kind: action
    params:
      - name: url
        type: string
        description: URL pointing to an m3u or ASX playlist
      - name: index
        type: integer
        description: Start index in the playlist

  - id: play_hex_playlist
    label: Play Hex-Encoded Playlist
    kind: action
    params:
      - name: url
        type: string
        description: Hex-encoded URL pointing to an m3u or ASX playlist
      - name: index
        type: integer
        description: Start index in the playlist

  - id: pause
    label: Pause
    kind: action
    params: []

  - id: resume
    label: Resume
    kind: action
    params: []

  - id: toggle_pause_play
    label: Toggle Pause/Play
    kind: action
    params: []

  - id: prev_track
    label: Previous Track
    kind: action
    params: []

  - id: next_track
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

  - id: stop
    label: Stop
    kind: action
    params: []

  - id: set_volume
    label: Set Volume
    kind: action
    params:
      - name: value
        type: integer
        description: Volume level from 0 to 100

  - id: mute
    label: Mute
    kind: action
    params:
      - name: mute
        type: integer
        description: "1 to mute, 0 to unmute"

  - id: set_loop_mode
    label: Set Loop Mode
    kind: action
    params:
      - name: mode
        type: integer
        description: "0 = sequence no loop, 1 = single loop, 2 = shuffle loop, -1 = sequence loop"

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
      - name: name
        type: string
        description: "EQ preset name (e.g. Flat, Rock, Pop, Jazz, Classical, etc.)"

  - id: switch_input
    label: Switch Input Source
    kind: action
    params:
      - name: mode
        type: string
        description: "Input source: line-in, bluetooth, optical, udisk, wifi"

  - id: play_preset
    label: Play Preset
    kind: action
    params:
      - name: number
        type: integer
        description: Preset number from 1 to 12

  - id: set_alarm
    label: Set Alarm
    kind: action
    params:
      - name: index
        type: integer
        description: Alarm slot (0-2, max 3 alarms)
      - name: trigger
        type: integer
        description: "0 = cancel, 1 = once, 2 = every day, 3 = weekly (day 00-06), 4 = weekly bitmask, 5 = monthly"
      - name: operation
        type: integer
        description: "0 = shell execute, 1 = playback/ring, 2 = stop playback"
      - name: time
        type: string
        description: "HHMMSS in UTC"
      - name: day
        type: string
        description: "Varies by trigger type (YYYYMMDD, or day bytes, or bitmask)"
      - name: url
        type: string
        description: "Shell path or playback URL (max 256 bytes, optional)"

  - id: stop_alarm
    label: Stop Current Alarm
    kind: action
    params: []

  - id: time_sync
    label: Sync Time
    kind: action
    params:
      - name: datetime
        type: string
        description: "YYYYMMDDHHMMSS in UTC"

  - id: reboot
    label: Reboot Device
    kind: action
    params: []

  - id: shutdown
    label: Shutdown
    kind: action
    params:
      - name: seconds
        type: integer
        description: "0 = immediate shutdown, -1 = cancel previous shutdown timer"

  - id: set_audio_output_mode
    label: Set Audio Output Mode
    kind: action
    params:
      - name: mode
        type: integer
        description: "1 = SPDIF, 2 = AUX, 3 = COAX"
```

## Feedbacks
```yaml
feedbacks:
  - id: device_status
    type: json
    description: Full device status including firmware, network, MAC addresses, UUID, internet connectivity

  - id: network_connect_state
    type: enum
    values: [PROCESS, PAIRFAIL, FAIL, OK]
    description: WiFi connection status (plain text response, not JSON)

  - id: playback_status
    type: json
    description: "Playback state: type, ch, mode, loop, eq, status (stop/play/loading/pause), curpos, totlen, vol, mute, playlist info"

  - id: eq_status
    type: enum
    values: [On, Off]
    description: Current EQ on/off state

  - id: eq_preset_list
    type: list
    description: Available EQ preset names (Flat, Acoustic, Bass Booster, etc.)

  - id: track_metadata
    type: json
    description: "Current track info: album, title, artist, albumArtURI, sampleRate, bitDepth"

  - id: preset_list
    type: json
    description: List of configured presets with number, name, url, source, picurl

  - id: shutdown_timer
    type: integer
    description: Remaining seconds until shutdown

  - id: alarm
    type: json
    description: Alarm configuration for a given slot (0-2)

  - id: audio_output_mode
    type: json
    description: "Audio output hardware mode (1=SPDIF, 2=AUX, 3=COAX), BT source mode, audiocast mode"
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    min: 0
    max: 100
    description: Current volume level (0-100)

  - id: loop_mode
    type: integer
    values: [-1, 0, 1, 2]
    description: "-1=sequence loop, 0=sequence no loop, 1=single loop, 2=shuffle loop"

  - id: audio_output_hardware
    type: integer
    values: [1, 2, 3]
    description: "Hardware output mode: 1=SPDIF, 2=AUX, 3=COAX"
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications or event subscription mechanism
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: reboot and immediate shutdown commands exist but no safety warnings or
# interlock procedures are described in the source document.
```

## Notes
- All commands are sent as HTTP GET requests to `https://{device_ip}/httpapi.asp?command={command}`.
- The `switchmode` input value `line-in` also refers to AUX-in.
- The `hex_playlist` variant expects a hex-encoded URL.
- Alarms support max 3 slots (index 0-2); time values are in UTC.
- Volume range is 0-100. Mute is a separate toggle (1/0).
- EQ presets include: Flat, Acoustic, Bass Booster, Bass Reducer, Classical, Dance, Deep, Electronic, Hip-Hop, Jazz, Latin, Loudness, Lounge, Piano, Pop, R&B, Rock, Small Speakers, Spoken Word, Treble Booster, Treble Reducer, Vocal Booster.
- Preset keys (MCUKeyShortClick) are numbered 1-12.
- The slave mute state is also set when muting during group play.
<!-- UNRESOLVED: no port number explicitly stated — standard HTTPS (443) is assumed but unconfirmed -->
<!-- UNRESOLVED: no authentication or login mechanism described -->
<!-- UNRESOLVED: no firmware version compatibility range stated -->
<!-- UNRESOLVED: no unsolicited event/notification mechanism described -->
<!-- UNRESOLVED: the source references WiiM Mini as an example device; exact model coverage is unclear -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: wiim_speaker_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:21.152Z
retrieved_at: 2026-04-27T10:13:21.152Z
last_checked_at: 2026-04-27T10:13:21.152Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:21.152Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions have literal command matches in source; transport protocol and URL structure verified."
```

## Known Gaps

```yaml
[]
```
