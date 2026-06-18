---
spec_id: admin/yamaha-np-s303
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha NP-S303 Control Spec"
manufacturer: Yamaha
model_family: NP-S303
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - NP-S303
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
  - doc.av-connection.com
  - github.com
source_urls:
  - https://raw.githubusercontent.com/samvdb/php-musiccast-api/master/YXC_API_Spec_Basic.pdf
  - https://raw.githubusercontent.com/samvdb/php-musiccast-api/master/yxc-api-spec-advanced.pdf
  - https://doc.av-connection.com/Products/Yamaha/NP-S303-EN.pdf
  - https://github.com/samvdb/php-musiccast-api
retrieved_at: 2026-06-14T18:48:36.011Z
last_checked_at: 2026-06-14T19:39:46.147Z
generated_at: 2026-06-14T19:39:46.147Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source is the generic YXC API Specification (Rev. 1.00), not an NP-S303-specific document. Exact feature subset (e.g. whether CD/Tuner/DAB apply to this model) is discoverable at runtime via /system/getFeatures. Port number not stated in the API spec section. Firmware version compatibility not stated."
  - "API spec does not state port; device-description example (§12.2) shows :80"
  - "no dedicated setTone endpoint documented in this source; tone control"
  - "no dedicated setTone endpoint documented in this source."
  - "no dedicated setDimmer endpoint documented in this basic spec."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source"
  - "API port not specified in the protocol spec (device-description example shows :80)"
  - "no setTone/setDimmer/setBalance endpoints in the basic spec — status is readable but setters may be in the advanced YXC spec"
  - "NP-S303-specific feature subset not confirmed from this generic document"
verification:
  verdict: verified
  checked_at: 2026-06-14T19:39:46.147Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec actions match verbatim endpoint paths in the YXC source; source documents exactly these 41 GET/POST endpoints with matching params; transport base URL confirmed. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# Yamaha NP-S303 Control Spec

## Summary
The Yamaha NP-S303 is a MusicCast-enabled network audio player controllable via the Yamaha Extended Control (YXC) protocol over HTTP. This spec covers the YXC basic API: system information and control, zone (power/volume/mute/input/sleep/sound program), tuner (AM/FM/DAB frequency and presets), Network/USB (playback, list browsing, presets, accounts, streaming services), and CD playback control. State-change events are pushed via UDP unicast.

<!-- UNRESOLVED: the source is the generic YXC API Specification (Rev. 1.00), not an NP-S303-specific document. Exact feature subset (e.g. whether CD/Tuner/DAB apply to this model) is discoverable at runtime via /system/getFeatures. Port number not stated in the API spec section. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - http
  - udp  # for event notifications (section 10)
addressing:
  base_url: "http://{host}/YamahaExtendedControl"
  port: null  # UNRESOLVED: API spec does not state port; device-description example (§12.2) shows :80
auth:
  type: none  # inferred: no auth procedure in source
events:
  transport: udp
  direction: unicast
  # Client must include "X-AppName:MusicCast/XXX" and "X-AppPort:YYY" headers
  # in requests to receive events. Event subscription times out after 10 minutes
  # if no further request is sent from the registered IP.
```

## Traits
```yaml
traits:
  - powerable    # inferred from setPower command
  - queryable    # inferred from getStatus / getPlayInfo / getFeatures query commands
  - levelable    # inferred from setVolume command
  - routable     # inferred from setInput / prepareInputChange commands
```

## Actions
```yaml
# All endpoints use HTTP GET unless noted otherwise.
# Base URL: http://{host}/YamahaExtendedControl
# The {zone} path parameter selects target zone: "main" / "zone2" / "zone3" / "zone4".
# Feature availability is determined at runtime via /system/getFeatures.

# ── System (§4) ──
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
      description: "Specifies Auto Power Standby status (true/false)"

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
      description: "IR code in 8-digit hex (e.g. 7F016C13). Continuous IR code cannot be used."

# ── Zone (§5) ──
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
      description: "Power status: on / standby / toggle"

- id: zone_setSleep
  label: Set Sleep Timer
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
      type: string
      description: "Volume value (integer, range from getFeatures) or 'up' / 'down'"
    - name: step
      type: integer
      required: false
      description: "Volume step value when volume is 'up'/'down'. Defaults to minimum step if omitted."

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
      description: "Mute status (true/false)"

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
      description: "Input ID from getFeatures (e.g. cd, tuner, usb, server, net_radio, spotify, airplay, bluetooth)"
    - name: mode
      type: string
      required: false
      description: "Select mode: 'autoplay_disabled' (restricts auto-play of Net/USB inputs)"

- id: zone_setSoundProgram
  label: Set Sound Program
  kind: action
  command: "GET /v1/{zone}/setSoundProgram?program={program}"
  params:
    - name: zone
      type: string
      description: "Target zone: main / zone2 / zone3 / zone4"
    - name: program
      type: string
      description: "Sound Program ID from getFeatures (e.g. munich, vienna, chamber, stereo, straight)"

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
      description: "Input ID to prepare for change"

# ── Tuner (§6) ──
- id: tuner_getPresetInfo
  label: Get Tuner Preset Info
  kind: query
  command: "GET /v1/tuner/getPresetInfo?band={band}"
  params:
    - name: band
      type: string
      description: "Band: 'common' (band common) or 'am' / 'fm' / 'dab' (separate)"

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
      required: false
      description: "Frequency in kHz. Valid only when tuning is 'direct'."

- id: tuner_recallPreset
  label: Recall Tuner Preset
  kind: action
  command: "GET /v1/tuner/recallPreset?zone={zone}&band={band}&num={num}"
  params:
    - name: zone
      type: string
      description: "Recalling zone (causes input change): main / zone2 / zone3 / zone4"
    - name: band
      type: string
      description: "'common' (band common) or 'separate' (each band preset)"
    - name: num
      type: integer
      description: "Preset number in range from getFeatures"

- id: tuner_switchPreset
  label: Switch Tuner Preset
  kind: action
  command: "GET /v1/tuner/switchPreset?dir={dir}"
  params:
    - name: dir
      type: string
      description: "Change direction: next / previous"
  notes: "Available on and after API Version 1.17. Call after changing target zone input to Tuner."

- id: tuner_storePreset
  label: Store Tuner Preset
  kind: action
  command: "GET /v1/tuner/storePreset?num={num}"
  params:
    - name: num
      type: integer
      description: "Preset number in range from getFeatures"

- id: tuner_setDabService
  label: Set DAB Service
  kind: action
  command: "GET /v1/tuner/setDabService?dir={dir}"
  params:
    - name: dir
      type: string
      description: "Change direction: next / previous"
  notes: "Available only when DAB is valid."

# ── Network/USB (§7) ──
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
      description: "Playback status: play / stop / pause / play_pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end"

- id: netusb_toggleRepeat
  label: Toggle Net/USB Repeat
  kind: action
  command: "GET /v1/netusb/toggleRepeat"
  params: []
  notes: "No direct/discrete setting command available - toggles only."

- id: netusb_toggleShuffle
  label: Toggle Net/USB Shuffle
  kind: action
  command: "GET /v1/netusb/toggleShuffle"
  params: []
  notes: "No direct/discrete setting command available - toggles only."

- id: netusb_getListInfo
  label: Get Net/USB List Info
  kind: query
  command: "GET /v1/netusb/getListInfo?input={input}&index={index}&size={size}&lang={lang}"
  params:
    - name: input
      type: string
      description: "Target Input ID for Net/USB sources"
    - name: index
      type: integer
      required: false
      description: "Reference index (offset from list start). Must be multiple of 8. Default: previously specified."
    - name: size
      type: integer
      description: "Max list size to retrieve: 1-8"
    - name: lang
      type: string
      required: false
      description: "List language: en / ja / fr / de / es / ru / it / zh. Default: en."
  notes: "Blocks other commands during execution. May take up to 30 seconds."

- id: netusb_setListControl
  label: Set Net/USB List Control
  kind: action
  command: "GET /v1/netusb/setListControl?list_id={list_id}&type={type}&index={index}&zone={zone}"
  params:
    - name: list_id
      type: string
      required: false
      description: "List ID: 'main' (default), 'auto_complete' / 'search_artist' / 'search_track' (Pandora)"
    - name: type
      type: string
      description: "Transition type: select / play / return"
    - name: index
      type: integer
      required: false
      description: "Element position (offset). Required for 'select' or 'play'. Range: 0-64999."
    - name: zone
      type: string
      required: false
      description: "Target zone for playback. Valid only when type is 'play'. Default: main."

- id: netusb_setSearchString
  label: Set Net/USB Search String
  kind: action
  command: "POST /v1/netusb/setSearchString"
  params:
    - name: list_id
      type: string
      required: false
      description: "List ID: 'main' / 'auto_complete' / 'search_artist' / 'search_track'"
    - name: string
      type: string
      description: "Search text"
    - name: index
      type: integer
      required: false
      description: "Element position. Valid only when list_id is 'main'. Range: 0-64999."
  notes: "POST request. Body is JSON: {\"list_id\":\"...\",\"string\":\"...\"}"

- id: netusb_recallPreset
  label: Recall Net/USB Preset
  kind: action
  command: "GET /v1/netusb/recallPreset?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
      description: "Recalling zone (causes input change): main / zone2 / zone3 / zone4"
    - name: num
      type: integer
      description: "Preset number in range from getFeatures"

- id: netusb_storePreset
  label: Store Net/USB Preset
  kind: action
  command: "GET /v1/netusb/storePreset?num={num}"
  params:
    - name: num
      type: integer
      description: "Preset number in range from getFeatures"

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
      description: "Target Input ID (e.g. pandora)"
    - name: index
      type: integer
      description: "Switch account index: 0-7 (Pandora)"
    - name: timeout
      type: integer
      description: "Timeout in ms: 0-60000 (0 = maximum)"

- id: netusb_getServiceInfo
  label: Get Net/USB Service Info
  kind: query
  command: "GET /v1/netusb/getServiceInfo?input={input}&type={type}&timeout={timeout}"
  params:
    - name: input
      type: string
      description: "Target Input ID: pandora / rhapsody / napster"
    - name: type
      type: string
      description: "Info type: account_list (Pandora) / licensing (Rhapsody/Napster/Pandora) / activation_code (Pandora)"
    - name: timeout
      type: integer
      description: "Timeout in ms: 0-60000 (0 = maximum)"

# ── CD (§8) ──
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
      description: "Playback status: play / stop / pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end / track_select"
    - name: num
      type: integer
      required: false
      description: "Target track number. Valid only when playback is 'track_select'. Range: 1-512."

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
  notes: "No direct/discrete setting command available - toggles only."

- id: cd_toggleShuffle
  label: Toggle CD Shuffle
  kind: action
  command: "GET /v1/cd/toggleShuffle"
  params: []
  notes: "No direct/discrete setting command available - toggles only."
```

## Feedbacks
```yaml
# Query responses (returned as JSON objects with response_code + fields).

- id: response_code
  type: enum
  values:
    - "0 (success)"
    - "1 (initializing)"
    - "2 (internal error)"
    - "3 (invalid request)"
    - "4 (invalid parameter)"
    - "5 (guarded)"
    - "6 (time out)"
    - "99 (firmware updating)"
    - "100-112 (streaming service errors)"
  description: "Standard response code returned by every API call. Non-zero means no other data in response."

- id: zone_power_state
  type: enum
  values: [on, standby]
  source: "/v1/{zone}/getStatus → power"

- id: zone_volume
  type: integer
  source: "/v1/{zone}/getStatus → volume"
  description: "Range from min/max/step via /system/getFeatures"

- id: zone_mute
  type: boolean
  source: "/v1/{zone}/getStatus → mute"

- id: zone_input
  type: string
  source: "/v1/{zone}/getStatus → input"
  description: "Selected Input ID"

- id: zone_sleep
  type: integer
  source: "/v1/{zone}/getStatus → sleep"
  values: [0, 30, 60, 90, 120]
  description: "Sleep timer in minutes"

- id: zone_sound_program
  type: string
  source: "/v1/{zone}/getStatus → sound_program"

- id: netusb_playback
  type: enum
  values: [play, stop, pause, fast_reverse, fast_forward]
  source: "/v1/netusb/getPlayInfo → playback"

- id: netusb_repeat
  type: enum
  values: [off, one, all]
  source: "/v1/netusb/getPlayInfo → repeat"

- id: netusb_shuffle
  type: enum
  values: [off, on, songs, albums]
  source: "/v1/netusb/getPlayInfo → shuffle"

- id: tuner_band
  type: enum
  values: [am, fm, dab]
  source: "/v1/tuner/getPlayInfo → band"

- id: cd_device_status
  type: enum
  values: [open, close, ready, not_ready]
  source: "/v1/cd/getPlayInfo → device_status"

- id: cd_playback
  type: enum
  values: [play, stop, pause, fast_reverse, fast_forward]
  source: "/v1/cd/getPlayInfo → playback"

- id: func_status_dimmer
  type: integer
  source: "/v1/system/getFuncStatus → dimmer"
  description: "-1 = Auto Dimmer, 0+ = manual setting number"
```

## Variables
```yaml
- id: zone_volume_level
  type: integer
  settable: true
  description: "Zone volume. Min/max/step from /system/getFeatures range_step (e.g. 0-194, step 1)."
  command: "/v1/{zone}/setVolume?volume={value}"

- id: zone_tone_bass
  type: integer
  settable: true
  description: "Bass tone control. Range from getFeatures (e.g. -12 to 12)."
  # UNRESOLVED: no dedicated setTone endpoint documented in this source; tone control
  #   status is readable via getStatus but no set command appears in the basic spec.

- id: zone_tone_treble
  type: integer
  settable: true
  description: "Treble tone control. Range from getFeatures (e.g. -12 to 12)."
  # UNRESOLVED: no dedicated setTone endpoint documented in this source.

- id: system_dimmer
  type: integer
  settable: true
  description: "Dimmer setting. -1 = Auto, 0+ = manual."
  # UNRESOLVED: no dedicated setDimmer endpoint documented in this basic spec.
```

## Events
```yaml
# Events are UDP unicast notifications of device status/setting changes.
# Subscription: client includes headers in any request:
#   X-AppName: MusicCast/{version}
#   X-AppPort: {port}
# Timeout: 10 minutes; resets on each subsequent request from the registered IP.

notifications:
  - id: system_event
    fields:
      - bluetooth_info_updated (boolean)
      - func_status_updated (boolean)
      - location_info_updated (boolean)
      - speaker_settings_updated (boolean)  # reserved

  - id: zone_event
    fields:
      - power (string: on / standby)
      - input (string: Input ID)
      - volume (integer)
      - mute (boolean)
      - status_updated (boolean)
    zones: [main, zone2, zone3, zone4]  # zone2-4 reserved in basic spec

  - id: tuner_event
    fields:
      - play_info_updated (boolean)
      - preset_info_updated (boolean)

  - id: netusb_event
    fields:
      - play_error (integer: 0=no error, 1-11=various, 100=multiple)
      - multiple_play_errors (integer: bit field)
      - play_message (string, max 256 bytes)
      - account_updated (boolean)
      - play_time (integer)
      - preset_info_updated (boolean)
      - preset_control (object: type, num, result)
      - trial_status (object)
      - trial_time_left (object)
      - play_info_updated (boolean)
      - list_info_updated (boolean)

  - id: cd_event
    fields:
      - device_status (string: open / close / ready / not_ready)
      - play_time (integer)
      - play_info_updated (boolean)

  - id: dist_event
    fields:
      - dist_info_updated (boolean)

  - id: device_id_event
    fields:
      - device_id (string)
```

## Macros
```yaml
# The source (§12.1) documents a multi-step USB browsing + playback workflow:
#   1. prepareInputChange?input=usb
#   2. (optional) setInput?input=usb&mode=autoplay_disabled
#   3. getListInfo?input=usb&index=0&size=8&lang=en  (root layer)
#   4. setListControl?list_id=main&type=select&index={n}  (enter folder)
#   5. getListInfo?input=usb&index={offset}&size=8&lang=en  (page contents)
#   6. setListControl?list_id=main&type=play&index={n}  (play file)
#   7. setListControl?list_id=main&type=return  (go back one layer)
# This is application guidance, not a device-stored macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- The source is the **Yamaha Extended Control (YXC) API Specification (Basic), Rev. 1.00** — a shared protocol document for all MusicCast devices, not NP-S303-specific. Runtime feature availability (which inputs, zones, tuner bands, CD support) is discovered via `GET /v1/system/getFeatures`.
- All commands return a JSON object with `response_code` (0 = success). No other data is returned when response_code is non-zero.
- `getListInfo` is the only command that blocks other commands. It may take up to 30 seconds to retrieve full list information.
- `netusb_setSearchString` is the only POST endpoint; all others use GET.
- Events require `X-AppName` and `X-AppPort` request headers to activate UDP notifications.
- API version is specified in the URI path (e.g. `/v1/`). Backward compatibility is assured; devices support API versions up to the value returned by `getDeviceInfo`.
- Input IDs include: cd, tuner, usb, bluetooth, server, net_radio, rhapsody, napster, pandora, siriusxm, spotify, juke, airplay, radiko, qobuz, mc_link, and others (see §11 All ID List).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: API port not specified in the protocol spec (device-description example shows :80) -->
<!-- UNRESOLVED: no setTone/setDimmer/setBalance endpoints in the basic spec — status is readable but setters may be in the advanced YXC spec -->
<!-- UNRESOLVED: NP-S303-specific feature subset not confirmed from this generic document -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
  - doc.av-connection.com
  - github.com
source_urls:
  - https://raw.githubusercontent.com/samvdb/php-musiccast-api/master/YXC_API_Spec_Basic.pdf
  - https://raw.githubusercontent.com/samvdb/php-musiccast-api/master/yxc-api-spec-advanced.pdf
  - https://doc.av-connection.com/Products/Yamaha/NP-S303-EN.pdf
  - https://github.com/samvdb/php-musiccast-api
retrieved_at: 2026-06-14T18:48:36.011Z
last_checked_at: 2026-06-14T19:39:46.147Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T19:39:46.147Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec actions match verbatim endpoint paths in the YXC source; source documents exactly these 41 GET/POST endpoints with matching params; transport base URL confirmed. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source is the generic YXC API Specification (Rev. 1.00), not an NP-S303-specific document. Exact feature subset (e.g. whether CD/Tuner/DAB apply to this model) is discoverable at runtime via /system/getFeatures. Port number not stated in the API spec section. Firmware version compatibility not stated."
- "API spec does not state port; device-description example (§12.2) shows :80"
- "no dedicated setTone endpoint documented in this source; tone control"
- "no dedicated setTone endpoint documented in this source."
- "no dedicated setDimmer endpoint documented in this basic spec."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source"
- "API port not specified in the protocol spec (device-description example shows :80)"
- "no setTone/setDimmer/setBalance endpoints in the basic spec — status is readable but setters may be in the advanced YXC spec"
- "NP-S303-specific feature subset not confirmed from this generic document"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
