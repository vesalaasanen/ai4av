---
spec_id: admin/yamaha-truex_90a
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha TrueX-90A Control Spec"
manufacturer: Yamaha
model_family: TrueX-90A
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - TrueX-90A
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
  - github.com
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
  - https://github.com/opctim/yamaha-extended-control-openapi
retrieved_at: 2026-05-19T04:51:05.122Z
last_checked_at: 2026-05-19T17:13:35.078Z
generated_at: 2026-05-19T17:13:35.078Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - switchAccount
  - "TrueX-90A model not explicitly named in source; inferred from Convex entity bootstrap"
  - "no explicit safety warnings or interlock procedures in source"
  - "no explicit HTTP port stated in source. URLBase example uses port 80 but not explicitly documented as default."
  - "firmware compatibility range not stated"
  - "exact voltage/power specs not in source"
  - "port number not explicitly stated, only demonstrated in URLBase example"
verification:
  verdict: verified
  checked_at: 2026-05-19T17:13:35.078Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions map one-to-one to named YXC API endpoints in the source; transport base URL matches verbatim; only switchAccount is in source but absent from spec. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Yamaha TrueX-90A Control Spec

## Summary
MusicCast device controlled via Yamaha Extended Control API (YXC) over Ethernet/WiFi. REST/HTTP transport with JSON payloads. Supports multi-zone power, volume, input routing, sound program selection, tuner, Net/USB playback, and CD. No authentication required. Events delivered via UDP unicast.

<!-- UNRESOLVED: TrueX-90A model not explicitly named in source; inferred from Convex entity bootstrap -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://{host}/YamahaExtendedControl  # {host} = device IP address
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: setPower
  label: Set Power
  kind: action
  params:
    - name: zone
      type: string
      description: Target zone (main / zone2 / zone3 / zone4)
    - name: power
      type: string
      description: Power state (on / standby / toggle)

- id: setVolume
  label: Set Volume
  kind: action
  params:
    - name: zone
      type: string
      description: Target zone (main / zone2 / zone3 / zone4)
    - name: volume
      type: integer
      description: Volume value (range from getFeatures)
    - name: step
      type: integer
      required: false
      description: Step value if volume is "up" or "down"

- id: setMute
  label: Set Mute
  kind: action
  params:
    - name: zone
      type: string
      description: Target zone
    - name: enable
      type: boolean
      description: Mute state

- id: setInput
  label: Select Input
  kind: action
  params:
    - name: zone
      type: string
      description: Target zone
    - name: input
      type: string
      description: Input ID (hdmi1 / hdmi2 / usb / server / net_radio / pandora / spotify / airplay / cd / tuner / etc.)
    - name: mode
      type: string
      required: false
      description: Select mode (autoplay_disabled)

- id: setSoundProgram
  label: Set Sound Program
  kind: action
  params:
    - name: zone
      type: string
      description: Target zone
    - name: program
      type: string
      description: Sound program ID (munich / vienna / chamber / straight / etc.)

- id: setSleep
  label: Set Sleep Timer
  kind: action
  params:
    - name: zone
      type: string
      description: Target zone
    - name: sleep
      type: integer
      description: Sleep time in minutes (0 / 30 / 60 / 90 / 120)

- id: prepareInputChange
  label: Prepare Input Change
  kind: action
  params:
    - name: zone
      type: string
      description: Target zone
    - name: input
      type: string
      description: Input ID

- id: setAutoPowerStandby
  label: Set Auto Power Standby
  kind: action
  params:
    - name: enable
      type: boolean
      description: Enable/disable auto power standby

- id: sendIrCode
  label: Send IR Code
  kind: action
  params:
    - name: code
      type: string
      description: IR code in 8-digit hex

- id: setFreq
  label: Set Tuner Frequency
  kind: action
  params:
    - name: band
      type: string
      description: Band (am / fm)
    - name: tuning
      type: string
      description: Tuning method (up / down / cancel / auto_up / auto_down / tp_up / tp_down / direct)
    - name: num
      type: integer
      required: false
      description: Frequency in kHz (valid only when tuning=direct)

- id: recallPreset
  label: Recall Tuner Preset
  kind: action
  params:
    - name: zone
      type: string
      description: Target zone
    - name: band
      type: string
      description: Preset band type (common / am / fm / dab)
    - name: num
      type: integer
      description: Preset number

- id: storePreset
  label: Store Tuner Preset
  kind: action
  params:
    - name: num
      type: integer
      description: Preset number

- id: switchPreset
  label: Switch Tuner Preset
  kind: action
  params:
    - name: dir
      type: string
      description: Direction (next / previous)

- id: setDabService
  label: Set DAB Service
  kind: action
  params:
    - name: dir
      type: string
      description: Direction (next / previous)

- id: netusb_setPlayback
  label: Set Net/USB Playback
  kind: action
  params:
    - name: playback
      type: string
      description: Playback command (play / stop / pause / play_pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end)

- id: netusb_toggleRepeat
  label: Toggle Net/USB Repeat
  kind: action

- id: netusb_toggleShuffle
  label: Toggle Net/USB Shuffle
  kind: action

- id: netusb_recallPreset
  label: Recall Net/USB Preset
  kind: action
  params:
    - name: zone
      type: string
      description: Target zone
    - name: num
      type: integer
      description: Preset number

- id: netusb_storePreset
  label: Store Net/USB Preset
  kind: action
  params:
    - name: num
      type: integer
      description: Preset number

- id: setListControl
  label: Set List Control
  kind: action
  params:
    - name: list_id
      type: string
      required: false
      description: List ID (main / auto_complete / search_artist / search_track)
    - name: type
      type: string
      description: Control type (select / play / return)
    - name: index
      type: integer
      required: false
      description: Element position in list
    - name: zone
      type: string
      required: false
      description: Target zone for playback

- id: setSearchString
  label: Set Search String
  kind: action
  params:
    - name: list_id
      type: string
      required: false
      description: List ID
    - name: string
      type: string
      description: Search text
    - name: index
      type: integer
      required: false
      description: Element index

- id: cd_setPlayback
  label: Set CD Playback
  kind: action
  params:
    - name: playback
      type: string
      description: Playback command (play / stop / pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end / track_select)
    - name: num
      type: integer
      required: false
      description: Track number (valid only when playback=track_select)

- id: cd_toggleTray
  label: Toggle CD Tray
  kind: action

- id: cd_toggleRepeat
  label: Toggle CD Repeat
  kind: action

- id: cd_toggleShuffle
  label: Toggle CD Shuffle
  kind: action
```

## Feedbacks
```yaml
- id: getDeviceInfo
  type: object
  description: Retrieve basic device info (model name, API version, network module version, etc.)

- id: getFeatures
  type: object
  description: Retrieve feature info (func_list, zone info, input list, range_step values, sound programs, tuner/netusb capabilities)

- id: getNetworkStatus
  type: object
  description: Retrieve network setup/information (connection type, DHCP, IP address, MAC address, MusicCast network status)

- id: getFuncStatus
  type: object
  description: Retrieve overall system function status (auto power standby, IR sensor, speakers, headphone, dimmer)

- id: getLocationInfo
  type: object
  description: Retrieve Location info (ID, name, zone list, stereo pair status)

- id: zone_getStatus
  type: object
  description: Retrieve zone status (power, sleep, volume, mute, input, sound_program, tone_control, equalizer, balance, subwoofer_volume, etc.)
  params:
    - name: zone
      type: string
      description: Target zone (main / zone2 / zone3 / zone4)

- id: getSoundProgramList
  type: array
  description: Retrieve list of available sound programs for a zone

- id: tuner_getPresetInfo
  type: object
  description: Retrieve tuner preset info
  params:
    - name: band
      type: string
      description: Band (common / am / fm / dab)

- id: tuner_getPlayInfo
  type: object
  description: Retrieve tuner playback info (band, frequency, RDS, DAB info)

- id: netusb_getPresetInfo
  type: object
  description: Retrieve Net/USB preset info

- id: netusb_getPlayInfo
  type: object
  description: Retrieve Net/USB playback info (input, playback state, repeat, shuffle, play_time, artist, album, track, albumart_url)

- id: netusb_getListInfo
  type: object
  description: Retrieve Net/USB list info (menu_layer, max_line, list_info with text, thumbnail, attribute)
  params:
    - name: input
      type: string
      description: Target input
    - name: index
      type: integer
      description: Reference index (must be multiple of 8)
    - name: size
      type: integer
      description: Max list size (1-8)
    - name: lang
      type: string
      required: false
      description: Language (en / ja / fr / de / es / ru / it / zh)

- id: netusb_getAccountStatus
  type: object
  description: Retrieve streaming service account info (registered status, login status, trial time left)

- id: netusb_getServiceInfo
  type: object
  description: Retrieve streaming service info (account_list / licensing / activation_code)

- id: cd_getPlayInfo
  type: object
  description: Retrieve CD playback info (device_status, playback, repeat, shuffle, play_time, track_number, total_tracks, artist, album, track)

- id: response_code
  type: integer
  values: [0, 1, 2, 3, 4, 5, 6, 99, 100-112]
  description: |
    Standard response codes:
    0 = success, 1 = initializing, 2 = internal error, 3 = invalid request,
    4 = invalid parameter, 5 = guarded, 6 = timeout, 99 = firmware updating,
    100s = streaming service errors (100=access error, 103=wrong password, 104=account expired, etc.)
```

## Variables
```yaml
# All settable parameters via GET/POST are documented in Actions and Feedbacks.
# Tunable variables (from zone getStatus responses):
- id: volume
  type: integer
  description: Zone volume (range from getFeatures, e.g. 0-194)

- id: tone_control
  type: object
  description: Tone control settings (bass, treble)

- id: equalizer
  type: object
  description: Equalizer settings (mode, low, mid, high)

- id: balance
  type: integer
  description: Speaker L/R balance (negative=left, positive=right)

- id: dialogue_level
  type: integer
  description: Dialogue level setting

- id: dialogue_lift
  type: integer
  description: Dialogue lift setting

- id: subwoofer_volume
  type: integer
  description: Subwoofer volume

- id: bass_extension
  type: boolean
  description: Bass extension status

- id: link_control
  type: string
  description: Link control setting (standard / stability / speed)

- id: link_audio_delay
  type: string
  description: Link audio delay setting (lip_sync / audio_sync / audio_sync_on / audio_sync_off)

- id: dimmer
  type: integer
  description: Dimmer setting (-1=auto, 0+=manual)

- id: sleep
  type: integer
  description: Sleep timer in minutes (0/30/60/90/120)

- id: auto_power_standby
  type: boolean
  description: Auto power standby enabled/disabled

- id: sound_program
  type: string
  description: Selected sound program

- id: repeat
  type: string
  description: Repeat setting (off / one / all / folder / program)

- id: shuffle
  type: string
  description: Shuffle setting (off / on / songs / albums / folder)
```

## Events
```yaml
# UDP unicast events (X-AppName + X-AppPort header required, port 41100 default for MusicCast Controller)
# Event notifications timed out after 10 minutes of inactivity.

- id: system_event
  type: object
  description: System events
  fields:
    - bluetooth_info_updated: boolean
    - func_status_updated: boolean
    - location_info_updated: boolean
    - name_text_updated: boolean

- id: main_zone_event
  type: object
  description: Main zone events
  fields:
    - power: string (on/standby)
    - input: string
    - volume: integer
    - mute: boolean
    - status_updated: boolean

- id: tuner_event
  type: object
  description: Tuner events
  fields:
    - play_info_updated: boolean
    - preset_info_updated: boolean

- id: netusb_event
  type: object
  description: Net/USB events
  fields:
    - play_error: integer
    - play_message: string
    - account_updated: boolean
    - play_time: integer
    - preset_info_updated: boolean
    - play_info_updated: boolean
    - list_info_updated: boolean
    - preset_control: object (type, num, result)

- id: cd_event
  type: object
  description: CD events
  fields:
    - device_status: string (open/close/ready/not_ready)
    - play_time: integer
    - play_info_updated: boolean

- id: dist_event
  type: object
  description: Link distribution events
  fields:
    - dist_info_updated: boolean

- id: device_id_event
  type: string
  description: Device ID (available on API v1.17+)
```

## Macros
```yaml
# Multi-step sequences from source (Section 12):

- id: browse_and_play_usb
  label: Browse USB and Play File
  description: |
    1. send prepareInputChange (input=usb)
    2. optionally send setInput (input=usb, mode=autoplay_disabled)
    3. send getListInfo (input=usb, index=0, size=8) to get root list
    4. send setListControl (list_id=main, type=select, index=N) to navigate into folder
    5. repeat getListInfo with index=0/8/16... to get all pages
    6. send setListControl (list_id=main, type=play, index=N) to play target file
  note: getListInfo blocks all other commands for up to 30 seconds while fetching full list

- id: search_and_play_pandora
  label: Search and Play Pandora
  description: |
    1. send setSearchString (list_id=search_artist or search_track, string="query")
    2. send setListControl (list_id=search_artist/search_track, type=select, index=N) to select result
    3. send setListControl (list_id=main, type=play, index=N) to start playback
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Zone B (physical) maps to zone2 in YXC protocol
  - description: Input change to USB requires prepareInputChange before browsing
  - description: getListInfo command blocks all other commands for up to 30 seconds
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
Base URL pattern: `http://{host}/YamahaExtendedControl/v1/`

Event transport: UDP unicast. App must send `X-AppName: MusicCast/XXX` and `X-AppPort: YYY` in request header to receive events. Default event port: 41100. Events timeout after 10 minutes inactivity.

API versioning: `v1` in URI. Backward compatibility assured for <= current API version (read via getDeviceInfo). API version 1.17 required for device_id field and switchPreset.

Device discovery: via UPnP M-Search, identify manufacturer="Yamaha Corporation", check for yamaha:X_device tag, confirm yamaha:X_yxcControlURL = /YamahaExtendedControl/v1/

Response codes: 0=success, 1=initializing, 2=internal error, 3=invalid request, 4=invalid parameter, 5=guarded, 6=timeout, 99=firmware updating. 100s = streaming errors.

Port number: UNRESOLVED: no explicit HTTP port stated in source. URLBase example uses port 80 but not explicitly documented as default.
<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: exact voltage/power specs not in source -->
<!-- UNRESOLVED: port number not explicitly stated, only demonstrated in URLBase example -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
  - github.com
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
  - https://github.com/opctim/yamaha-extended-control-openapi
retrieved_at: 2026-05-19T04:51:05.122Z
last_checked_at: 2026-05-19T17:13:35.078Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-19T17:13:35.078Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions map one-to-one to named YXC API endpoints in the source; transport base URL matches verbatim; only switchAccount is in source but absent from spec. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- switchAccount
- "TrueX-90A model not explicitly named in source; inferred from Convex entity bootstrap"
- "no explicit safety warnings or interlock procedures in source"
- "no explicit HTTP port stated in source. URLBase example uses port 80 but not explicitly documented as default."
- "firmware compatibility range not stated"
- "exact voltage/power specs not in source"
- "port number not explicitly stated, only demonstrated in URLBase example"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
