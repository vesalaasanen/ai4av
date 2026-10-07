---
spec_id: admin/yamaha-yms-4080
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha YMS-4080 Control Spec"
manufacturer: Yamaha
model_family: YMS-4080
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - YMS-4080
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiki.elvis.science
  - community-openhab-org.s3-eu-central-1.amazonaws.com
  - community.symcon.de
source_urls:
  - https://wiki.elvis.science/images/0/04/Yamaha_MusicCast_HTTP_simplified_API_for_ControlSystems.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
retrieved_at: 2026-05-22T19:19:51.379Z
last_checked_at: 2026-10-07T13:09:04.297Z
generated_at: 2026-10-07T13:09:04.297Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "YMS-4080 specific model name not verified in source — generic MusicCast API doc used"
  - "no unsolicited notifications described in source"
  - "no explicit multi-step sequences described in source"
  - "actual input list per YMS-4080 may differ from generic MusicCast inputs listed"
  - "sleep timer zone parameter — source states zone name from getLocationInfo but does not enumerate valid zone names for YMS-4080"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:09:04.297Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 action units match the generic MusicCast HTTP API doc and transport is supported; the YMS-4080 model is never named in the source (generic caveat). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Yamaha YMS-4080 Control Spec

## Summary
MusicCast multi-zone audio controller with HTTP REST API on port 80. Controls power, input selection, volume, tuner, playback, and presets via `/YamahaExtendedControl/v1/` endpoint path pattern. No authentication procedure described.

<!-- UNRESOLVED: YMS-4080 specific model name not verified in source — generic MusicCast API doc used -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: /YamahaExtendedControl/v1/
  port: 80  # stated: default web browser port
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable  # inferred: power on/standby/toggle commands present
- routable   # inferred: input selection commands present
- queryable  # inferred: getStatus, getDeviceInfo, getFeatures commands present
- levelable  # inferred: volume control commands present
```

## Actions
```yaml
- id: setPower
  label: Set Power
  kind: action
  params:
    - name: power
      type: enum
      values: [on, standby, toggle]
      description: Power state

- id: setAutoPowerStandby
  label: Set Auto Power Standby
  kind: action
  params:
    - name: enable
      type: boolean
      description: Enable or disable auto standby

- id: setSleep
  label: Set Sleep Timer
  kind: action
  params:
    - name: sleep
      type: integer
      description: Minutes until sleep (0 = cancel)

- id: setInput
  label: Set Input
  kind: action
  params:
    - name: input
      type: string
      description: Input ID (net_radio, napster, spotify, juke, qobuz, tidal, deezer, server, bluetooth, airplay, mc_link, usb)
    - name: mode
      type: string
      description: Optional mode (autoplay_disabled)

- id: setVolume
  label: Set Volume
  kind: action
  params:
    - name: volume
      type: variant
      description: Direct volume level (0-100) or up/down for incremental
    - name: step
      type: integer
      description: Optional step size for incremental volume

- id: setMute
  label: Set Mute
  kind: action
  params:
    - name: enable
      type: boolean
      description: Mute state

- id: prepareInputChange
  label: Prepare Input Change
  kind: action
  params:
    - name: input
      type: string
      description: Input to prepare for

- id: setSoundProgram
  label: Set Sound Program
  kind: action
  params:
    - name: program
      type: string
      description: Sound program name

- id: tuner_recallPreset
  label: Recall Tuner Preset
  kind: action
  params:
    - name: zone
      type: string
    - name: band
      type: enum
      values: [fm, am, dab]
    - name: num
      type: integer
      description: Preset number

- id: tuner_switchPreset
  label: Switch Tuner Preset
  kind: action
  params:
    - name: dir
      type: enum
      values: [next, previous]

- id: tuner_storePreset
  label: Store Tuner Preset
  kind: action
  params:
    - name: num
      type: integer
      description: Preset number

- id: tuner_setFreq
  label: Set Tuner Frequency
  kind: action
  params:
    - name: band
      type: enum
      values: [fm, am, dab]
    - name: tuning
      type: enum
      values: [direct]
    - name: num
      type: integer
      description: Frequency in KHz

- id: tuner_setDabService
  label: Set DAB Service
  kind: action
  params:
    - name: dir
      type: enum
      values: [next, previous]

- id: netusb_recallPreset
  label: Recall Network/USB Preset
  kind: action
  params:
    - name: zone
      type: string
    - name: num
      type: integer
      description: Preset number

- id: netusb_storePreset
  label: Store Network/USB Preset
  kind: action
  params:
    - name: num
      type: integer
      description: Preset number

- id: netusb_setPlayback
  label: Set Playback
  kind: action
  params:
    - name: playback
      type: enum
      values: [stop, play, previous, next, fast_reverse_start, fast_reverse_end, fast_forward_start, fast_forward_end]

- id: netusb_toggleRepeat
  label: Toggle Repeat
  kind: action

- id: netusb_toggleShuffle
  label: Toggle Shuffle
  kind: action

- id: ios_app_jump
  label: iOS App Jump
  kind: action
  command: jp.co.yamaha.avkk.musiccastcontroller://
```

## Feedbacks
```yaml
- id: system_getDeviceInfo
  label: Get Device Info
  type: object
  query_command: /YamahaExtendedControl/v1/system/getDeviceInfo
- id: system_getFeatures
  label: Get Available Features
  type: object
  query_command: /YamahaExtendedControl/v1/system/getFeatures
- id: system_getNetworkStatus
  label: Get Network Status
  type: object
  query_command: /YamahaExtendedControl/v1/system/getNetworkStatus
- id: system_getFuncStatus
  label: Get Function Status
  type: object
  query_command: /YamahaExtendedControl/v1/system/getFuncStatus
- id: system_getLocationInfo
  label: Get Location Info
  type: object
  query_command: /YamahaExtendedControl/v1/system/getLocationInfo
- id: main_getStatus
  label: Get Zone Status
  type: object
  query_command: /YamahaExtendedControl/v1/main/getStatus
- id: main_getSoundProgramList
  label: Get Sound Program List
  type: object
  query_command: /YamahaExtendedControl/v1/main/getSoundProgramList
- id: tuner_getPlayInfo
  label: Get Tuner Play Info
  type: object
  query_command: /YamahaExtendedControl/v1/tuner/getPlayInfo
- id: tuner_getPresetInfo
  label: Get Tuner Preset Info
  type: object
  query_command: /YamahaExtendedControl/v1/tuner/getPresetInfo
- id: netusb_getPresetInfo
  label: Get Network/USB Preset Info
  type: object
  query_command: /YamahaExtendedControl/v1/netusb/getPresetInfo
- id: netusb_getPlayInfo
  label: Get Network/USB Play Info
  type: object
  query_command: /YamahaExtendedControl/v1/netusb/getPlayInfo
- id: netusb_getAccountStatus
  label: Get Account Status
  type: object
  query_command: /YamahaExtendedControl/v1/netusb/getAccountStatus
- id: netusb_getListInfo
  label: Get List Info
  type: object
  query_command: /YamahaExtendedControl/v1/netusb/getListInfo
- id: power_state
  label: Power State
  type: enum
  values: [on, standby]
- id: volume_level
  label: Volume Level
  type: integer
- id: mute_state
  label: Mute State
  type: boolean
- id: current_input
  label: Current Input
  type: string
```

## Variables
```yaml
# No distinct settable parameters outside action params - all routed through actions above
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Zone name required for multi-zone operations — obtain via `getLocationInfo`. Source doc covers MusicCast API broadly; YMS-4080-specific confirmation not verified.
<!-- UNRESOLVED: actual input list per YMS-4080 may differ from generic MusicCast inputs listed -->
<!-- UNRESOLVED: sleep timer zone parameter — source states zone name from getLocationInfo but does not enumerate valid zone names for YMS-4080 -->

## Provenance

```yaml
source_domains:
  - wiki.elvis.science
  - community-openhab-org.s3-eu-central-1.amazonaws.com
  - community.symcon.de
source_urls:
  - https://wiki.elvis.science/images/0/04/Yamaha_MusicCast_HTTP_simplified_API_for_ControlSystems.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
retrieved_at: 2026-05-22T19:19:51.379Z
last_checked_at: 2026-10-07T13:09:04.297Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:09:04.297Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 action units match the generic MusicCast HTTP API doc and transport is supported; the YMS-4080 model is never named in the source (generic caveat). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "YMS-4080 specific model name not verified in source — generic MusicCast API doc used"
- "no unsolicited notifications described in source"
- "no explicit multi-step sequences described in source"
- "actual input list per YMS-4080 may differ from generic MusicCast inputs listed"
- "sleep timer zone parameter — source states zone name from getLocationInfo but does not enumerate valid zone names for YMS-4080"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
