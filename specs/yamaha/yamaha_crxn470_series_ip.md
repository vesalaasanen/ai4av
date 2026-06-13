---
spec_id: admin/yamaha-crxn470-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha CRX-N470 Series Control Spec"
manufacturer: Yamaha
model_family: CRX-N470
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - CRX-N470
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
  - github.com
  - home-assistant.io
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
  - https://github.com/rsc-dev/pyamaha
  - https://www.home-assistant.io/integrations/yamaha_musiccast/
retrieved_at: 2026-06-12T02:38:34.272Z
last_checked_at: 2026-06-12T20:01:02.483Z
generated_at: 2026-06-12T20:01:02.483Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific CRX-N470 input list, zone count, and feature set not stated — must be queried at runtime via /system/getFeatures"
  - "firmware version compatibility range not stated in source"
  - "port not explicitly stated in API overview; UPnP example shows :80 for a WXC-50 but may differ per device"
  - "determined at runtime via getFeatures"
  - "no safety warnings or interlock procedures found in source"
  - "TCP/HTTP port not explicitly stated in the API overview section"
  - "firmware version compatibility range not stated"
  - "exact zone count and input list for CRX-N470 not stated — query getFeatures at runtime"
  - "volume min/max/step values not stated — query getFeatures at runtime"
  - "no safety or interlock procedures documented in source"
verification:
  verdict: verified
  checked_at: 2026-06-12T20:01:02.483Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec actions have exact path matches in the source and the source documents exactly these 41 endpoints; transport base URL confirmed verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Yamaha CRX-N470 Series Control Spec

## Summary
Yamaha CRX-N470 is a MusicCast-enabled CD receiver controllable via Yamaha Extended Control (YXC) REST API over HTTP. The API provides zone management (power, volume, mute, input selection), tuner control (AM/FM/DAB), Network/USB playback and browsing, CD playback, and system configuration. Events are pushed via UDP unicast.

<!-- UNRESOLVED: specific CRX-N470 input list, zone count, and feature set not stated — must be queried at runtime via /system/getFeatures -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{host}/YamahaExtendedControl"
  # UNRESOLVED: port not explicitly stated in API overview; UPnP example shows :80 for a WXC-50 but may differ per device
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from zone setPower command
  - queryable    # inferred from getStatus, getDeviceInfo, getPlayInfo queries
  - routable     # inferred from zone setInput command
  - levelable    # inferred from zone setVolume, tone control commands
```

## Actions
```yaml
actions:
  # ── System ──
  - id: system_getDeviceInfo
    label: Get Device Info
    kind: query
    command: "GET /v1/system/getDeviceInfo"
    params: []

  - id: system_getFeatures
    label: Get Features
    kind: query
    command: "GET /v1/system/getFeatures"
    params: []

  - id: system_getNetworkStatus
    label: Get Network Status
    kind: query
    command: "GET /v1/system/getNetworkStatus"
    params: []

  - id: system_getFuncStatus
    label: Get Function Status
    kind: query
    command: "GET /v1/system/getFuncStatus"
    params: []

  - id: system_setAutoPowerStandby
    label: Set Auto Power Standby
    kind: action
    command: "GET /v1/system/setAutoPowerStandby?enable={enable}"
    params:
      - name: enable
        type: boolean
        description: "true to enable, false to disable"

  - id: system_getLocationInfo
    label: Get Location Info
    kind: query
    command: "GET /v1/system/getLocationInfo"
    params: []

  - id: system_sendIrCode
    label: Send IR Code
    kind: action
    command: "GET /v1/system/sendIrCode?code={code}"
    params:
      - name: code
        type: string
        description: "IR code in 8-digit hex"

  # ── Zone ──
  - id: zone_getStatus
    label: Get Zone Status
    kind: query
    command: "GET /v1/{zone}/getStatus"
    params:
      - name: zone
        type: string
        description: "Target zone: main / zone2 / zone3 / zone4"

  - id: zone_getSoundProgramList
    label: Get Sound Program List
    kind: query
    command: "GET /v1/{zone}/getSoundProgramList"
    params:
      - name: zone
        type: string
        description: "Target zone: main / zone2 / zone3 / zone4"

  - id: zone_setPower
    label: Set Zone Power
    kind: action
    command: "GET /v1/{zone}/setPower?power={power}"
    params:
      - name: zone
        type: string
        description: "Target zone: main / zone2 / zone3 / zone4"
      - name: power
        type: string
        description: "Power state: on / standby / toggle"

  - id: zone_setSleep
    label: Set Zone Sleep Timer
    kind: action
    command: "GET /v1/{zone}/setSleep?sleep={sleep}"
    params:
      - name: zone
        type: string
        description: "Target zone: main / zone2 / zone3 / zone4"
      - name: sleep
        type: integer
        description: "Sleep time in minutes: 0 / 30 / 60 / 90 / 120"

  - id: zone_setVolume
    label: Set Zone Volume
    kind: action
    command: "GET /v1/{zone}/setVolume?volume={volume}&step={step}"
    params:
      - name: zone
        type: string
        description: "Target zone: main / zone2 / zone3 / zone4"
      - name: volume
        type: integer
        description: "Volume value per getFeatures range, or 'up'/'down'"
      - name: step
        type: integer
        description: "Step value when volume is up/down (optional)"

  - id: zone_setMute
    label: Set Zone Mute
    kind: action
    command: "GET /v1/{zone}/setMute?enable={enable}"
    params:
      - name: zone
        type: string
        description: "Target zone: main / zone2 / zone3 / zone4"
      - name: enable
        type: boolean
        description: "true to mute, false to unmute"

  - id: zone_setInput
    label: Set Zone Input
    kind: action
    command: "GET /v1/{zone}/setInput?input={input}&mode={mode}"
    params:
      - name: zone
        type: string
        description: "Target zone: main / zone2 / zone3 / zone4"
      - name: input
        type: string
        description: "Input ID from getFeatures"
      - name: mode
        type: string
        description: "Select mode, e.g. autoplay_disabled (optional)"

  - id: zone_setSoundProgram
    label: Set Zone Sound Program
    kind: action
    command: "GET /v1/{zone}/setSoundProgram?program={program}"
    params:
      - name: zone
        type: string
        description: "Target zone: main / zone2 / zone3 / zone4"
      - name: program
        type: string
        description: "Sound Program ID from getFeatures"

  - id: zone_prepareInputChange
    label: Prepare Input Change
    kind: action
    command: "GET /v1/{zone}/prepareInputChange?input={input}"
    params:
      - name: zone
        type: string
        description: "Target zone: main / zone2 / zone3 / zone4"
      - name: input
        type: string
        description: "Input ID to prepare"

  # ── Tuner ──
  - id: tuner_getPresetInfo
    label: Get Tuner Preset Info
    kind: query
    command: "GET /v1/tuner/getPresetInfo?band={band}"
    params:
      - name: band
        type: string
        description: "Band: common / am / fm / dab (per getFeatures preset type)"

  - id: tuner_getPlayInfo
    label: Get Tuner Play Info
    kind: query
    command: "GET /v1/tuner/getPlayInfo"
    params: []

  - id: tuner_setFreq
    label: Set Tuner Frequency
    kind: action
    command: "GET /v1/tuner/setFreq?band={band}&tuning={tuning}&num={num}"
    params:
      - name: band
        type: string
        description: "Band: am / fm"
      - name: tuning
        type: string
        description: "Tuning method: up / down / cancel / auto_up / auto_down / tp_up / tp_down / direct"
      - name: num
        type: integer
        description: "Frequency in kHz (only when tuning=direct)"

  - id: tuner_recallPreset
    label: Recall Tuner Preset
    kind: action
    command: "GET /v1/tuner/recallPreset?zone={zone}&band={band}&num={num}"
    params:
      - name: zone
        type: string
        description: "Target zone: main / zone2 / zone3 / zone4"
      - name: band
        type: string
        description: "common / am / fm / dab per preset type"
      - name: num
        type: integer
        description: "Preset number per getFeatures range"

  - id: tuner_switchPreset
    label: Switch Tuner Preset
    kind: action
    command: "GET /v1/tuner/switchPreset?dir={dir}"
    params:
      - name: dir
        type: string
        description: "next / previous"

  - id: tuner_storePreset
    label: Store Tuner Preset
    kind: action
    command: "GET /v1/tuner/storePreset?num={num}"
    params:
      - name: num
        type: integer
        description: "Preset number per getFeatures range"

  - id: tuner_setDabService
    label: Set DAB Service
    kind: action
    command: "GET /v1/tuner/setDabService?dir={dir}"
    params:
      - name: dir
        type: string
        description: "next / previous"

  # ── Network/USB ──
  - id: netusb_getPresetInfo
    label: Get Net/USB Preset Info
    kind: query
    command: "GET /v1/netusb/getPresetInfo"
    params: []

  - id: netusb_getPlayInfo
    label: Get Net/USB Play Info
    kind: query
    command: "GET /v1/netusb/getPlayInfo"
    params: []

  - id: netusb_setPlayback
    label: Set Net/USB Playback
    kind: action
    command: "GET /v1/netusb/setPlayback?playback={playback}"
    params:
      - name: playback
        type: string
        description: "play / stop / pause / play_pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end"

  - id: netusb_toggleRepeat
    label: Toggle Net/USB Repeat
    kind: action
    command: "GET /v1/netusb/toggleRepeat"
    params: []

  - id: netusb_toggleShuffle
    label: Toggle Net/USB Shuffle
    kind: action
    command: "GET /v1/netusb/toggleShuffle"
    params: []

  - id: netusb_getListInfo
    label: Get Net/USB List Info
    kind: query
    command: "GET /v1/netusb/getListInfo?input={input}&index={index}&size={size}&lang={lang}"
    params:
      - name: input
        type: string
        description: "Net/USB input ID"
      - name: index
        type: integer
        description: "Reference index (multiple of 8), e.g. 0, 8, 16..."
      - name: size
        type: integer
        description: "Max list elements to retrieve (1-8)"
      - name: lang
        type: string
        description: "en / ja / fr / de / es / ru / it / zh (optional)"

  - id: netusb_setListControl
    label: Set Net/USB List Control
    kind: action
    command: "GET /v1/netusb/setListControl?list_id={list_id}&type={type}&index={index}&zone={zone}"
    params:
      - name: list_id
        type: string
        description: "main / auto_complete / search_artist / search_track (optional)"
      - name: type
        type: string
        description: "select / play / return"
      - name: index
        type: integer
        description: "Element position 0-64999 (required for select/play)"
      - name: zone
        type: string
        description: "Target zone for playback (optional, default main)"

  - id: netusb_setSearchString
    label: Set Net/USB Search String
    kind: action
    command: "POST /v1/netusb/setSearchString"
    params:
      - name: list_id
        type: string
        description: "main / auto_complete / search_artist / search_track (optional)"
      - name: string
        type: string
        description: "Search text"
      - name: index
        type: integer
        description: "Element index for select+search (optional, 0-64999)"

  - id: netusb_recallPreset
    label: Recall Net/USB Preset
    kind: action
    command: "GET /v1/netusb/recallPreset?zone={zone}&num={num}"
    params:
      - name: zone
        type: string
        description: "Target zone: main / zone2 / zone3 / zone4"
      - name: num
        type: integer
        description: "Preset number per getFeatures range"

  - id: netusb_storePreset
    label: Store Net/USB Preset
    kind: action
    command: "GET /v1/netusb/storePreset?num={num}"
    params:
      - name: num
        type: integer
        description: "Preset number per getFeatures range"

  - id: netusb_getAccountStatus
    label: Get Net/USB Account Status
    kind: query
    command: "GET /v1/netusb/getAccountStatus"
    params: []

  - id: netusb_switchAccount
    label: Switch Net/USB Account
    kind: action
    command: "GET /v1/netusb/switchAccount?input={input}&index={index}&timeout={timeout}"
    params:
      - name: input
        type: string
        description: "Target input ID, e.g. pandora"
      - name: index
        type: integer
        description: "Account index 0-7"
      - name: timeout
        type: integer
        description: "Timeout in ms (0 = max, range 0-60000)"

  - id: netusb_getServiceInfo
    label: Get Net/USB Service Info
    kind: query
    command: "GET /v1/netusb/getServiceInfo?input={input}&type={type}&timeout={timeout}"
    params:
      - name: input
        type: string
        description: "pandora / rhapsody / napster"
      - name: type
        type: string
        description: "account_list / licensing / activation_code"
      - name: timeout
        type: integer
        description: "Timeout in ms (0 = max, range 0-60000)"

  # ── CD ──
  - id: cd_getPlayInfo
    label: Get CD Play Info
    kind: query
    command: "GET /v1/cd/getPlayInfo"
    params: []

  - id: cd_setPlayback
    label: Set CD Playback
    kind: action
    command: "GET /v1/cd/setPlayback?playback={playback}&num={num}"
    params:
      - name: playback
        type: string
        description: "play / stop / pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end / track_select"
      - name: num
        type: integer
        description: "Track number 1-512 (only for track_select)"

  - id: cd_toggleTray
    label: Toggle CD Tray
    kind: action
    command: "GET /v1/cd/toggleTray"
    params: []

  - id: cd_toggleRepeat
    label: Toggle CD Repeat
    kind: action
    command: "GET /v1/cd/toggleRepeat"
    params: []

  - id: cd_toggleShuffle
    label: Toggle CD Shuffle
    kind: action
    command: "GET /v1/cd/toggleShuffle"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: zone_power_state
    type: enum
    values: [on, standby]
    description: "Zone power status from getStatus"

  - id: zone_volume
    type: integer
    description: "Zone volume value, range per getFeatures"

  - id: zone_mute
    type: boolean
    description: "Zone mute status"

  - id: zone_input
    type: string
    description: "Current zone input ID"

  - id: zone_sleep_timer
    type: integer
    description: "Sleep timer in minutes: 0 / 30 / 60 / 90 / 120"

  - id: zone_sound_program
    type: string
    description: "Current sound program ID"

  - id: netusb_playback_status
    type: enum
    values: [play, stop, pause, fast_reverse, fast_forward]
    description: "Net/USB playback status"

  - id: netusb_repeat
    type: enum
    values: [off, one, all]
    description: "Net/USB repeat setting"

  - id: netusb_shuffle
    type: enum
    values: [off, on, songs, albums]
    description: "Net/USB shuffle setting"

  - id: cd_device_status
    type: enum
    values: [open, close, ready, not_ready]
    description: "CD device status"

  - id: cd_playback_status
    type: enum
    values: [play, stop, pause, fast_reverse, fast_forward]
    description: "CD playback status"

  - id: cd_repeat
    type: enum
    values: [off, one, all, folder, a-b]
    description: "CD repeat setting"

  - id: cd_shuffle
    type: enum
    values: [off, on, folder, program]
    description: "CD shuffle setting"

  - id: response_code
    type: integer
    description: "API response code: 0 = success, see Response Code List for errors"
```

## Variables
```yaml
variables:
  - id: zone_volume
    type: integer
    description: "Zone volume level, min/max/step from getFeatures"
    min: null  # UNRESOLVED: determined at runtime via getFeatures
    max: null
    step: null

  - id: zone_max_volume
    type: integer
    description: "Max volume setting per zone"

  - id: tone_control_bass
    type: integer
    description: "Tone control bass level"

  - id: tone_control_treble
    type: integer
    description: "Tone control treble level"

  - id: dimmer
    type: integer
    description: "Dimmer setting, -1 for auto, 0+ for manual"

  - id: balance
    type: integer
    description: "Speaker L/R balance, negative=left, positive=right"
```

## Events
```yaml
events:
  - id: zone_power_event
    description: "Zone power changed (on/standby)"
    fields:
      - name: power
        type: string
        values: [on, standby]

  - id: zone_input_event
    description: "Zone input changed"
    fields:
      - name: input
        type: string

  - id: zone_volume_event
    description: "Zone volume changed"
    fields:
      - name: volume
        type: integer

  - id: zone_mute_event
    description: "Zone mute changed"
    fields:
      - name: mute
        type: boolean

  - id: zone_status_event
    description: "Other zone info changed; retrieve via getStatus"
    fields:
      - name: status_updated
        type: boolean

  - id: system_func_status_event
    description: "System function status changed; retrieve via getFuncStatus"
    fields:
      - name: func_status_updated
        type: boolean

  - id: system_location_event
    description: "Location info changed; retrieve via getLocationInfo"
    fields:
      - name: location_info_updated
        type: boolean

  - id: tuner_play_info_event
    description: "Tuner playback info changed; retrieve via tuner/getPlayInfo"
    fields:
      - name: play_info_updated
        type: boolean

  - id: tuner_preset_event
    description: "Tuner preset info changed; retrieve via tuner/getPresetInfo"
    fields:
      - name: preset_info_updated
        type: boolean

  - id: netusb_play_info_event
    description: "Net/USB playback info changed; retrieve via netusb/getPlayInfo"
    fields:
      - name: play_info_updated
        type: boolean

  - id: netusb_play_error_event
    description: "Net/USB playback error"
    fields:
      - name: play_error
        type: integer

  - id: netusb_account_event
    description: "Net/USB account info changed; retrieve via getAccountStatus"
    fields:
      - name: account_updated
        type: boolean

  - id: netusb_preset_event
    description: "Net/USB preset info changed; retrieve via netusb/getPresetInfo"
    fields:
      - name: preset_info_updated
        type: boolean

  - id: netusb_list_info_event
    description: "Net/USB list info changed; retrieve via getListInfo"
    fields:
      - name: list_info_updated
        type: boolean

  - id: netusb_play_time_event
    description: "Net/USB playback time update"
    fields:
      - name: play_time
        type: integer

  - id: cd_device_status_event
    description: "CD device status changed (open/close/ready/not_ready)"
    fields:
      - name: device_status
        type: string

  - id: cd_play_info_event
    description: "CD playback info changed; retrieve via cd/getPlayInfo"
    fields:
      - name: play_info_updated
        type: boolean

  - id: cd_play_time_event
    description: "CD playback time update"
    fields:
      - name: play_time
        type: integer

notes: |
  Events require HTTP request headers X-AppName and X-AppPort to subscribe.
  Event subscription times out after 10 minutes if no further request is sent.
  getListInfo is blocking and may take up to 30 seconds; all other commands are rejected during that time.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
YXC (Yamaha Extended Control) is a REST API over HTTP for MusicCast-enabled devices. The CRX-N470 supports this API but its exact feature set (zone count, input list, sound programs, volume range) must be discovered at runtime via `/v1/system/getFeatures`. Events are delivered as UDP unicast to the port specified in the `X-AppPort` header. API version is v1; backward compatibility is assured unless otherwise specified. Device discovery uses UPnP M-Search for MediaRenderer devices with Yamaha-specific tags.

The `setSearchString` endpoint uses POST with a JSON body; all other endpoints use GET with query parameters.

Input IDs include: cd, tuner, phono, hdmi1-hdmi8, av1-av7, aux1-aux2, optical1-optical2, coaxial1-coaxial2, bluetooth, server, net_radio, pandora, spotify, siriusxm, airplay, qobuz, mc_link, and others — actual availability is device-specific.

<!-- UNRESOLVED: TCP/HTTP port not explicitly stated in the API overview section -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: exact zone count and input list for CRX-N470 not stated — query getFeatures at runtime -->
<!-- UNRESOLVED: volume min/max/step values not stated — query getFeatures at runtime -->
<!-- UNRESOLVED: no safety or interlock procedures documented in source -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
  - github.com
  - home-assistant.io
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
  - https://github.com/rsc-dev/pyamaha
  - https://www.home-assistant.io/integrations/yamaha_musiccast/
retrieved_at: 2026-06-12T02:38:34.272Z
last_checked_at: 2026-06-12T20:01:02.483Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T20:01:02.483Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec actions have exact path matches in the source and the source documents exactly these 41 endpoints; transport base URL confirmed verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific CRX-N470 input list, zone count, and feature set not stated — must be queried at runtime via /system/getFeatures"
- "firmware version compatibility range not stated in source"
- "port not explicitly stated in API overview; UPnP example shows :80 for a WXC-50 but may differ per device"
- "determined at runtime via getFeatures"
- "no safety warnings or interlock procedures found in source"
- "TCP/HTTP port not explicitly stated in the API overview section"
- "firmware version compatibility range not stated"
- "exact zone count and input list for CRX-N470 not stated — query getFeatures at runtime"
- "volume min/max/step values not stated — query getFeatures at runtime"
- "no safety or interlock procedures documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
