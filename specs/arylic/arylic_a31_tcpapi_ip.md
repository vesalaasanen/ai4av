---
spec_id: admin/arylic-a31-platform-tcp-api
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arylic A31 Platform TCP API Control Spec"
manufacturer: Arylic
model_family: A31
aliases: []
compatible_with:
  manufacturers:
    - Arylic
  models:
    - A31
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developer.arylic.com
source_urls:
  - https://developer.arylic.com/tcpapi/
retrieved_at: 2026-05-15T00:32:24.701Z
last_checked_at: 2026-06-02T21:39:53.246Z
generated_at: 2026-06-02T21:39:53.246Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "BP10XX platform passthrough commands reference a separate UART API document not included here"
  - "no input source switching command found — only PLM+GET for querying current source"
  - "binary packet checksum algorithm stated but no per-command byte-level encoding table"
  - "no multi-step sequences explicitly described in source"
  - "no safety warnings or power-on sequencing found in source"
  - "BP10XX platform extended passthrough commands reference a separate UART API at https://developer.arylic.com/uartapi not included in this source"
  - "SendKey parameter values not documented"
  - "MaxVolume value range not documented"
  - "Virtual Bass INT/ENH parameter ranges not documented"
  - "firmware version compatibility not stated"
  - "precise checksum calculation for binary packet — source says \"sum of all payload bytes\" but no worked example beyond MCU+VOL+050"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:39:53.246Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "Complete TCP API coverage with volume, playback, preset, EQ, and system commands (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Arylic A31 Platform TCP API Control Spec

## Summary
TCP/IP control API for Arylic devices based on the A31 WiFi module. Covers volume, mute, playback control, input source querying, presets, EQ, and passthrough MCU commands. Commands are sent as binary packets with payloads prefixed `MCU+`; responses are prefixed `AXX+`. All A31-based devices share this API regardless of base-board model.

<!-- UNRESOLVED: BP10XX platform passthrough commands reference a separate UART API document not included here -->
<!-- UNRESOLVED: no input source switching command found — only PLM+GET for querying current source -->
<!-- UNRESOLVED: binary packet checksum algorithm stated but no per-command byte-level encoding table -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 8899
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - levelable    # inferred: volume control (0-100) and EQ bass/treble
  - queryable    # inferred: multiple GET commands return device state
```

## Actions
```yaml
actions:
  - id: set_volume
    label: Set Volume
    kind: action
    command: "MCU+VOL+{value}"
    params:
      - name: value
        type: integer
        description: "Volume level 0-100, zero-padded 3 digits (e.g. 050)"

  - id: get_volume
    label: Get Volume
    kind: query
    command: "MCU+VOL+GET"

  - id: mute
    label: Mute
    kind: action
    command: "MCU+MUT+001"
    params: []

  - id: unmute
    label: Unmute
    kind: action
    command: "MCU+MUT+000"
    params: []

  - id: get_mute
    label: Get Mute State
    kind: query
    command: "MCU+MUT+GET"

  - id: set_device_name
    label: Set Device Name
    kind: action
    command: "MCU+NAM+SET{name}&"
    params:
      - name: name
        type: string
        description: "New device name (payload >11 bytes, ends with &)"

  - id: reboot
    label: Reboot WiFi Module
    kind: action
    command: "MCU+DEV+RST&"
    params: []

  - id: factory_reset
    label: Factory Reset
    kind: action
    command: "MCU+FACTORY"
    params: []

  - id: get_device_info
    label: Get Device Info
    kind: query
    command: "MCU+DEV+GET"

  - id: get_device_info_full
    label: Get Full Device Info
    kind: query
    command: "MCU+INF+GET"

  - id: get_internet_state
    label: Get Internet State
    kind: query
    command: "MCU+WWW+GET"

  - id: get_usb_state
    label: Get USB Disk State
    kind: query
    command: "MCU+USB+GET"

  - id: pause
    label: Pause Playback
    kind: action
    command: "MCU+PLY-PUS"
    params: []

  - id: toggle_play_pause
    label: Toggle Play/Pause
    kind: action
    command: "MCU+PLY+PUS"
    params: []

  - id: resume
    label: Resume Playback
    kind: action
    command: "MCU+PLY-PLA"
    params: []

  - id: stop
    label: Stop Playback
    kind: action
    command: "MCU+PLY-STP"
    params: []

  - id: next_track
    label: Next Track
    kind: action
    command: "MCU+PLY+NXT"
    params: []

  - id: previous_track
    label: Previous Track
    kind: action
    command: "MCU+PLY+PRV"
    params: []

  - id: play_last_playlist
    label: Play Last Playlist
    kind: action
    command: "MCU+PLY+PUQ"
    params: []

  - id: set_playback_mode
    label: Set Playback Mode
    kind: action
    command: "MCU+PLP+{mode}"
    params:
      - name: mode
        type: enum
        values:
          - "000"  # repeat all
          - "001"  # repeat one
          - "002"  # repeat all and shuffle
          - "003"  # shuffle
          - "004"  # sequence
        description: "Playback loop/shuffle mode"

  - id: get_playback_mode
    label: Get Playback Mode
    kind: query
    command: "MCU+PLP+GET"

  - id: play_preset
    label: Play Preset
    kind: action
    command: "MCU+KEY+{number}"
    params:
      - name: number
        type: integer
        description: "Preset number 1-10, zero-padded 3 digits"

  - id: next_preset
    label: Next Preset
    kind: action
    command: "MCU+KEY+NXT"
    params: []

  - id: previous_preset
    label: Previous Preset
    kind: action
    command: "MCU+KEY+PRE"
    params: []

  - id: set_preset_playlist
    label: Set Preset Playlist
    kind: action
    command: "MCU+PRE+{number}"
    params:
      - name: number
        type: integer
        description: "Preset number, zero-padded 3 digits"

  - id: get_input_mode
    label: Get Input Mode
    kind: query
    command: "MCU+PLM+GET"

  - id: get_song_info
    label: Get Song Info (Short)
    kind: query
    command: "MCU+SONGGET"

  - id: get_media_info
    label: Get Media Info
    kind: query
    command: "MCU+MEA+GET"

  - id: get_playback_info_full
    label: Get Full Playback Info
    kind: query
    command: "MCU+PINFGET"

  - id: eq_get
    label: Get EQ Settings
    kind: query
    command: "MCU+PAS+EQGet&"

  - id: eq_set
    label: Set EQ
    kind: action
    command: "MCU+PAS+EQSet:{type}:{value}&"
    params:
      - name: type
        type: enum
        values: [bass, treble]
        description: "EQ band"
      - name: value
        type: integer
        description: "0-10 mapping to -5..+5 on app (-10dB..+10dB)"

  # --- AP8064 platform passthrough (PRO v1/2, AMP v1/2, some A50/S50) ---

  - id: pas_get_board
    label: Get Board ID (AP8064)
    kind: query
    command: "MCU+PAS+Rakoit:GetBoard&"
    platform: AP8064

  - id: pas_get_commit
    label: Get Git Commit (AP8064)
    kind: query
    command: "MCU+PAS+Rakoit:GetCommit&"
    platform: AP8064

  - id: pas_get_prompt
    label: Get Voice Prompt (AP8064)
    kind: query
    command: "MCU+PAS+Rakoit:GetPrompt&"
    platform: AP8064

  - id: pas_set_prompt
    label: Set Voice Prompt (AP8064)
    kind: action
    command: "MCU+PAS+Rakoit:SetPrompt:{pmt}&"
    params:
      - name: pmt
        type: enum
        values: ["0", "1"]
        description: "0=disable, 1=enable voice prompt"
    platform: AP8064

  - id: pas_get_api_ver
    label: Get API Version (AP8064)
    kind: query
    command: "MCU+PAS+Rakoit:GetAPIVer&"
    platform: AP8064

  - id: pas_send_key
    label: Send Key (AP8064)
    kind: action
    command: "MCU+PAS+Rakoit:SendKey:{key}&"
    params:
      - name: key
        type: string
        description: "Key identifier"
    platform: AP8064

  - id: pas_get_max_volume
    label: Get Max Volume (AP8064)
    kind: query
    command: "MCU+PAS+Rakoit:MaxVolume:Get&"
    platform: AP8064

  - id: pas_set_max_volume
    label: Set Max Volume (AP8064)
    kind: action
    command: "MCU+PAS+Rakoit:MaxVolume:{mxv}&"
    params:
      - name: mxv
        type: integer
        description: "Maximum volume level"
    platform: AP8064

  - id: pas_set_vb_intensity
    label: Set Virtual Bass Intensity (AP8064)
    kind: action
    command: "MCU+PAS+Rakoit:VB:INT:{vb_int}&"
    params:
      - name: vb_int
        type: integer
        description: "Virtual bass intensity"
    platform: AP8064

  - id: pas_set_vb_enhance
    label: Set Virtual Bass Enhance (AP8064)
    kind: action
    command: "MCU+PAS+Rakoit:VB:ENH:{vb_enh}&"
    params:
      - name: vb_enh
        type: integer
        description: "Virtual bass enhance"
    platform: AP8064

  - id: pas_toggle_vb
    label: Toggle Virtual Bass (AP8064)
    kind: action
    command: "MCU+PAS+Rakoit:VB:SWI&"
    params: []
    platform: AP8064

  - id: pas_get_vb
    label: Get Virtual Bass State (AP8064)
    kind: query
    command: "MCU+PAS+Rakoit:VB:Get&"
    platform: AP8064

  - id: pas_set_vb
    label: Set Virtual Bass On/Off (AP8064)
    kind: action
    command: "MCU+PAS+Rakoit:VB:{en}&"
    params:
      - name: en
        type: enum
        values: ["0", "1"]
        description: "0=off, 1=on"
    platform: AP8064

  - id: pas_set_led
    label: Set LED On/Off (AP8064)
    kind: action
    command: "MCU+PAS+Rakoit:LED:{en}&"
    params:
      - name: en
        type: enum
        values: ["0", "1"]
        description: "0=off, 1=on"
    platform: AP8064
```

## Feedbacks
```yaml
feedbacks:
  - id: volume
    type: integer
    command: "AXX+VOL+{value}"
    description: "Current volume 0-100"

  - id: mute_state
    type: enum
    values: ["000", "001"]
    command: "AXX+MUT+{state}"
    description: "000=unmuted, 001=muted"

  - id: device_info
    type: string
    command: "AXX+DEV+INF{fields}&"
    description: "Semicolon-separated: name;build;ssid;ap_ssid_hex;rssi;unknown;unknown"

  - id: device_info_full
    type: json
    command: "AXX+INF+INF{json}&"
    description: "Full device status JSON (same as HTTPAPI getStatusEx)"

  - id: internet_state
    type: enum
    values: ["000", "001"]
    command: "AXX+WWW+{state}"
    description: "000=no internet, 001=connected. Sent actively on change."

  - id: usb_state
    type: enum
    values: ["000", "001"]
    command: "AXX+USB+{state}"
    description: "000=no USB disk, 001=USB detected. Sent actively on change."

  - id: playback_status
    type: enum
    values: ["000", "001"]
    command: "AXX+PLY+{status}"
    description: "Current playback status code"

  - id: playback_mode
    type: enum
    values: ["000", "001", "002", "003", "004"]
    command: "AXX+PLP+{mode}"
    description: "000=repeat all, 001=repeat one, 002=repeat all+shuffle, 003=shuffle, 004=sequence"

  - id: input_mode
    type: enum
    values:
      - "000"  # Idle
      - "001"  # AirPlay
      - "002"  # DLNA
      - "010"  # Online playlist
      - "011"  # USB playlist
      - "020"  # HTTP API
      - "031"  # Spotify Connect
      - "032"  # TIDAL Connect (A97 only)
      - "040"  # LINE-IN
      - "041"  # Bluetooth
      - "045"  # Coaxial
      - "047"  # LINE-IN 2
      - "049"  # HDMI
      - "051"  # USB DAC
      - "053"  # External Bluetooth
      - "054"  # Phono
      - "056"  # Optical 2
      - "057"  # Coaxial 2
      - "058"  # ARC
      - "099"  # Slave mode
    command: "AXX+PLM+{mode}"
    description: "Current input source. Sent actively on change (with MEA+RDY)."

  - id: media_ready
    type: string
    command: "AXX+MEA+RDY"
    description: "Media info is ready after input mode change"

  - id: song_info
    type: json
    command: "AXX+SNG+INF{json}&"
    description: "Short playback info: curpos (ms), totlen (ms), status, loop"

  - id: media_info
    type: json
    command: "AXX+MEA+DAT{json}&"
    description: "Media metadata: title, artist, album, vendor (all hex-encoded), skiplimit"

  - id: playback_info_full
    type: json
    command: "AXX+PLY+INF{json}&"
    description: "Complete now-playing: mode, status, curpos, totlen, Title, Artist, Album, vol, mute, plicount, plicurr (text fields hex-encoded)"

  - id: spotify_status
    type: enum
    values: ["000", "001"]
    command: "AXX+SPY+{state}"
    description: "000=Spotify stopped, 001=Spotify started"

  - id: device_name_change
    type: string
    command: "AXX+NAM+SET{name}&"
    description: "Sent actively when device name changes"

  - id: eq_state
    type: string
    command: "MCU+PAS+EQ:{type}:{value}&"
    description: "Current EQ values for bass and treble"

  - id: preset_response
    type: string
    command: "AXX+PRE+{code}"
    description: "Response to preset playlist commands"
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    min: 0
    max: 100
    description: "System volume percentage"

  - id: mute
    type: boolean
    description: "Mute state"

  - id: playback_mode
    type: enum
    values: [repeat_all, repeat_one, repeat_all_shuffle, shuffle, sequence]
    description: "Loop/shuffle mode"

  - id: eq_bass
    type: integer
    min: 0
    max: 10
    description: "Bass EQ (0-10 = -5..+5 on app, -10dB..+10dB)"

  - id: eq_treble
    type: integer
    min: 0
    max: 10
    description: "Treble EQ (0-10 = -5..+5 on app, -10dB..+10dB)"
```

## Events
```yaml
events:
  - id: volume_changed
    description: "Sent when volume changes (via app, remote, or TCP)"
    message: "AXX+VOL+{value}"

  - id: mute_changed
    description: "Sent when mute state changes"
    message: "AXX+MUT+{state}"

  - id: input_mode_changed
    description: "Sent when input source changes, accompanied by MEA+RDY"
    message: "AXX+PLM+{mode}"

  - id: internet_state_changed
    description: "Sent when internet connectivity changes"
    message: "AXX+WWW+{state}"

  - id: usb_state_changed
    description: "Sent when USB disk is inserted or removed"
    message: "AXX+USB+{state}"

  - id: playback_status_changed
    description: "Sent on playback state transitions"
    message: "AXX+PLY+{status}"

  - id: device_name_changed
    description: "Sent when device name is changed (from any source)"
    message: "AXX+NAM+SET{name}&"

  - id: spotify_status_changed
    description: "Sent when Spotify Connect starts or stops"
    message: "AXX+SPY+{state}"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
  - reboot
interlocks: []
# UNRESOLVED: no safety warnings or power-on sequencing found in source
```

## Notes
- All payloads must be wrapped in a binary packet: 4-byte header (`0x18 0x96 0x18 0x20`), 4-byte little-endian payload length, 4-byte little-endian checksum (sum of payload bytes), 8-byte reserved (zeroes), then payload bytes.
- Commands start with `MCU+`; responses start with `AXX+` (except passthrough responses which start with `MCU+PAS+`).
- Payloads are normally fixed 11 bytes. Payloads longer than 11 bytes must end with `&`.
- **Minimum 200ms interval between commands.** One TCP connection per IP at a time.
- Text fields in JSON responses (title, artist, album, vendor, SSID) are hex-encoded ASCII strings.
- Passthrough commands (`PAS`) target the base-board MCU directly and vary by platform (AP8064 vs BP10XX). AP8064 passthrough uses prefix `Rakoit:`; BP10XX uses prefix `RAKOIT:`.
- Reboot (`DEV+RST`) and factory reset (`FACTORY`) drop the TCP connection.
- No input source switching command found in this TCP API — only the query `MCU+PLM+GET` and unsolicited `AXX+PLM+{mode}` events are documented.

<!-- UNRESOLVED: BP10XX platform extended passthrough commands reference a separate UART API at https://developer.arylic.com/uartapi not included in this source -->
<!-- UNRESOLVED: SendKey parameter values not documented -->
<!-- UNRESOLVED: MaxVolume value range not documented -->
<!-- UNRESOLVED: Virtual Bass INT/ENH parameter ranges not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: precise checksum calculation for binary packet — source says "sum of all payload bytes" but no worked example beyond MCU+VOL+050 -->

## Provenance

```yaml
source_domains:
  - developer.arylic.com
source_urls:
  - https://developer.arylic.com/tcpapi/
retrieved_at: 2026-05-15T00:32:24.701Z
last_checked_at: 2026-06-02T21:39:53.246Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:39:53.246Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "Complete TCP API coverage with volume, playback, preset, EQ, and system commands (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "BP10XX platform passthrough commands reference a separate UART API document not included here"
- "no input source switching command found — only PLM+GET for querying current source"
- "binary packet checksum algorithm stated but no per-command byte-level encoding table"
- "no multi-step sequences explicitly described in source"
- "no safety warnings or power-on sequencing found in source"
- "BP10XX platform extended passthrough commands reference a separate UART API at https://developer.arylic.com/uartapi not included in this source"
- "SendKey parameter values not documented"
- "MaxVolume value range not documented"
- "Virtual Bass INT/ENH parameter ranges not documented"
- "firmware version compatibility not stated"
- "precise checksum calculation for binary packet — source says \"sum of all payload bytes\" but no worked example beyond MCU+VOL+050"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
