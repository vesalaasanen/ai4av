---
spec_id: admin/yamaha-r-n1000a
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha R-N1000A Control Spec"
manufacturer: Yamaha
model_family: R-N1000A
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - R-N1000A
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiki.elvis.science
source_urls:
  - https://wiki.elvis.science/images/0/04/Yamaha_MusicCast_HTTP_simplified_API_for_ControlSystems.pdf
retrieved_at: 2026-06-02T00:07:24.258Z
last_checked_at: 2026-06-04T06:34:59.797Z
generated_at: 2026-06-04T06:34:59.797Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic MusicCast API doc dated 2017; R-N1000A-specific quirks (supported zones, sound programs, tuner bands) not enumerated. Use /system/getFeatures and /system/getLocationInfo at runtime to enumerate device-specific capabilities."
  - "response payload schemas not detailed in source."
  - "source does not enumerate discrete settable parameters beyond"
  - "unsolicited notifications not described in source."
  - "source describes no multi-step sequences."
  - "no safety warnings or interlock procedures in source."
  - "response body schemas, error codes, HTTP status semantics, and any firmware-specific behavior not present in the source excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:34:59.797Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 spec actions found verbatim in source with matching paths and parameters. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Yamaha R-N1000A Control Spec

## Summary
The Yamaha R-N1000A is a MusicCast network stereo receiver. This spec covers the Yamaha Extended Control HTTP API (v1, June 2017), which exposes device info, power, input selection, sound programs, volume, mute, AM/FM/DAB tuner, network/USB playback, system presets, and transport control. Communication is HTTP on TCP port 80 with no authentication.

<!-- UNRESOLVED: source is a generic MusicCast API doc dated 2017; R-N1000A-specific quirks (supported zones, sound programs, tuner bands) not enumerated. Use /system/getFeatures and /system/getLocationInfo at runtime to enumerate device-specific capabilities. -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 80
  base_url: /YamahaExtendedControl/v1
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power command examples
- routable        # inferred from input selection commands
- queryable       # inferred from /getXxx command examples
- levelable       # inferred from volume and mute commands
```

## Actions
```yaml
# ---------------- Information ----------------
- id: get_device_info
  label: Get Device Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getDeviceInfo"
  params: []

- id: get_features
  label: Get Available Device Features
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getFeatures"
  params: []

- id: get_network_status
  label: Get Network Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getNetworkStatus"
  params: []

- id: get_func_status
  label: Get Function Status (e.g. Auto Power Standby)
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getFuncStatus"
  params: []

- id: get_location_info
  label: Get Location Info and Zone List
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getLocationInfo"
  params: []

- id: get_zone_status
  label: Get Zone Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/main/getStatus"
  params: []

- id: get_sound_program_list
  label: Get Sound Program List
  kind: query
  command: "GET /YamahaExtendedControl/v1/main/getSoundProgramList"
  params: []

# ---------------- Power ----------------
- id: set_power_on
  label: Power On
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setPower?power=on"
  params: []

- id: set_power_standby
  label: Power Standby
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setPower?power=standby"
  params: []

- id: set_power_toggle
  label: Power Toggle
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setPower?power=toggle"
  params: []

- id: set_auto_power_standby_on
  label: Enable Auto Power Standby
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setAutoPowerStandby?enable=true"
  params: []

- id: set_auto_power_standby_off
  label: Disable Auto Power Standby
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setAutoPowerStandby?enable=false"
  params: []

# ---------------- Sleep ----------------
- id: set_sleep
  label: Set Sleep Timer
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setSleep?sleep={minutes}"
  params:
    - name: minutes
      type: integer
      description: Sleep duration in minutes; 0 cancels timer

- id: cancel_sleep
  label: Cancel Sleep Timer
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setSleep?sleep=0"
  params: []

# ---------------- Input ----------------
- id: select_input_net_radio
  label: Select Input: Net Radio
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setInput?input=net_radio"
  params: []

- id: select_input_napster
  label: Select Input: Napster
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setInput?input=napster"
  params: []

- id: select_input_spotify
  label: Select Input: Spotify
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setInput?input=spotify"
  params: []

- id: select_input_juke
  label: Select Input: Juke
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setInput?input=juke"
  params: []

- id: select_input_qobuz
  label: Select Input: Qobuz
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setInput?input=qobuz"
  params: []

- id: select_input_tidal
  label: Select Input: Tidal
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setInput?input=tidal"
  params: []

- id: select_input_deezer
  label: Select Input: Deezer
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setInput?input=deezer"
  params: []

- id: select_input_server
  label: Select Input: Server
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setInput?input=server"
  params: []

- id: select_input_bluetooth
  label: Select Input: Bluetooth
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setInput?input=bluetooth"
  params: []

- id: select_input_airplay
  label: Select Input: AirPlay
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setInput?input=airplay"
  params: []

- id: select_input_mc_link
  label: Select Input: MusicCast Link
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setInput?input=mc_link"
  params: []

- id: select_input_no_autoplay
  label: Select Input (no autoplay)
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setInput?input={input}&mode=autoplay_disabled"
  params:
    - name: input
      type: string
      description: Input source id (e.g. airplay, spotify)

- id: prepare_input_change
  label: Prepare Input Change
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/prepareInputChange?input={input}"
  params:
    - name: input
      type: string
      description: Input source id to prepare

# ---------------- Sound Program ----------------
- id: set_sound_program
  label: Set Sound Program
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setSoundProgram?program={program}"
  params:
    - name: program
      type: string
      description: Sound program name (e.g. vienna); list via getSoundProgramList

# ---------------- Volume ----------------
- id: set_volume
  label: Set Volume (Direct)
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setVolume?volume={level}"
  params:
    - name: level
      type: integer
      description: Direct volume value; max returned by /system/getFeatures

- id: set_volume_up
  label: Volume Up
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setVolume?volume=up"
  params: []

- id: set_volume_down
  label: Volume Down
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setVolume?volume=down"
  params: []

- id: set_volume_up_step
  label: Volume Up by Step
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setVolume?volume=up&step={step}"
  params:
    - name: step
      type: integer
      description: Step increment; valid range from /system/getFeatures

- id: set_volume_down_step
  label: Volume Down by Step
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setVolume?volume=down&step={step}"
  params:
    - name: step
      type: integer
      description: Step increment; valid range from /system/getFeatures

# ---------------- Mute ----------------
- id: set_mute_on
  label: Mute On
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setMute?enable=true"
  params: []

- id: set_mute_off
  label: Mute Off
  kind: action
  command: "GET /YamahaExtendedControl/v1/main/setMute?enable=false"
  params: []

# ---------------- Tuner Presets ----------------
- id: recall_tuner_preset
  label: Recall Tuner Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/recallPreset?zone={zone}&band={band}&num={num}"
  params:
    - name: zone
      type: string
      description: Zone name (e.g. main)
    - name: band
      type: string
      description: "am | fm | dab"
    - name: num
      type: integer
      description: Preset number

- id: tuner_next_preset
  label: Tuner Next Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/switchPreset?dir=next"
  params: []

- id: tuner_previous_preset
  label: Tuner Previous Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/switchPreset?dir=previous"
  params: []

- id: store_tuner_preset
  label: Store Tuner Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/storePreset?num={num}"
  params:
    - name: num
      type: integer
      description: Preset slot to store

- id: get_tuner_preset_info
  label: Get Tuner Preset Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/tuner/getPresetInfo?band={band}"
  params:
    - name: band
      type: string
      description: "am | fm | dab"

- id: get_tuner_play_info
  label: Get Tuner Play Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/tuner/getPlayInfo"
  params: []

- id: set_tuner_freq
  label: Set Tuner Frequency
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/setFreq?band={band}&tuning=direct&num={num}"
  params:
    - name: band
      type: string
      description: "am | fm | dab"
    - name: num
      type: integer
      description: Frequency in KHz

- id: tuner_next_dab_service
  label: Tuner Next DAB Service
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/setDabService?dir=next"
  params: []

- id: tuner_previous_dab_service
  label: Tuner Previous DAB Service
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/setDabService?dir=previous"
  params: []

# ---------------- NetUSB / Streaming Presets ----------------
- id: get_netusb_preset_info
  label: Get NetUSB Preset Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getPresetInfo"
  params: []

- id: get_netusb_play_info
  label: Get NetUSB Current Playing Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getPlayInfo"
  params: []

- id: get_account_status
  label: Get Streaming Account Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getAccountStatus"
  params: []

- id: recall_netusb_preset
  label: Recall NetUSB Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/recallPreset?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
      description: Zone name (e.g. main)
    - name: num
      type: integer
      description: Preset number

- id: store_netusb_preset
  label: Store NetUSB Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/storePreset?num={num}"
  params:
    - name: num
      type: integer
      description: Preset slot to store

# ---------------- Transport ----------------
- id: playback_stop
  label: Playback Stop
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setPlayback?playback=stop"
  params: []

- id: playback_play
  label: Playback Play
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setPlayback?playback=play"
  params: []

- id: playback_previous
  label: Playback Previous
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setPlayback?playback=previous"
  params: []

- id: playback_next
  label: Playback Next
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setPlayback?playback=next"
  params: []

- id: playback_fast_rewind_start
  label: Fast Rewind Start
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setPlayback?playback=fast_reverse_start"
  params: []

- id: playback_fast_rewind_stop
  label: Fast Rewind Stop
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setPlayback?playback=fast_reverse_end"
  params: []

- id: playback_fast_forward_start
  label: Fast Forward Start
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setPlayback?playback=fast_forward_start"
  params: []

- id: playback_fast_forward_stop
  label: Fast Forward Stop
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setPlayback?playback=fast_forward_end"
  params: []

- id: toggle_repeat
  label: Repeat Toggle
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/toggleRepeat"
  params: []

- id: toggle_shuffle
  label: Shuffle Toggle
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/toggleShuffle"
  params: []

# ---------------- List Info ----------------
- id: get_list_info
  label: Get List Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getListInfo?input={input}&index={index}&size={size}&lang={lang}"
  params:
    - name: input
      type: string
      description: Input ID from /system/getFeatures
    - name: index
      type: integer
      description: List offset from beginning
    - name: size
      type: integer
      description: Maximum list size (1-8)
    - name: lang
      type: string
      description: Language code (e.g. en)

# ---------------- iOS App Jump ----------------
- id: ios_app_jump
  label: iOS App Jump to MusicCast App
  kind: action
  command: "jp.co.yamaha.avkk.musiccastcontroller://"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: response payload schemas not detailed in source.
# Use /system/getFeatures and /main/getStatus at runtime to discover available
# zone-specific response fields (power, input, volume, mute, sleep, sound_program,
# tuner band/freq/preset, netusb playback state, repeat/shuffle).
```

## Variables
```yaml
# UNRESOLVED: source does not enumerate discrete settable parameters beyond
# the per-action query parameters above. Volume max/step, preset counts, and
# input list are returned by /system/getFeatures at runtime.
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications not described in source.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes
- Source is the generic MusicCast Extended Control API spec (V1.1, June 2017), not an R-N1000A-specific document. R-N1000A support for any given endpoint should be confirmed against `/YamahaExtendedControl/v1/system/getFeatures` and `/system/getLocationInfo` on the actual device.
- Zone name `main` is used in all source examples. Other zones (e.g. Zone2/Zone3) are only present on multi-zone MusicCast devices — confirm via `getLocationInfo` before use.
- All endpoints are HTTP GET; the API returns JSON responses (not detailed in the refined excerpt).
- Sound programs, netusb inputs, and streaming service availability depend on device model and region.
- iOS App Jump URL (`jp.co.yamaha.avkk.musiccastcontroller://`) is a deep link and is platform-specific.

<!-- UNRESOLVED: response body schemas, error codes, HTTP status semantics, and any firmware-specific behavior not present in the source excerpt. -->

## Provenance

```yaml
source_domains:
  - wiki.elvis.science
source_urls:
  - https://wiki.elvis.science/images/0/04/Yamaha_MusicCast_HTTP_simplified_API_for_ControlSystems.pdf
retrieved_at: 2026-06-02T00:07:24.258Z
last_checked_at: 2026-06-04T06:34:59.797Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:34:59.797Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 spec actions found verbatim in source with matching paths and parameters. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic MusicCast API doc dated 2017; R-N1000A-specific quirks (supported zones, sound programs, tuner bands) not enumerated. Use /system/getFeatures and /system/getLocationInfo at runtime to enumerate device-specific capabilities."
- "response payload schemas not detailed in source."
- "source does not enumerate discrete settable parameters beyond"
- "unsolicited notifications not described in source."
- "source describes no multi-step sequences."
- "no safety warnings or interlock procedures in source."
- "response body schemas, error codes, HTTP status semantics, and any firmware-specific behavior not present in the source excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
