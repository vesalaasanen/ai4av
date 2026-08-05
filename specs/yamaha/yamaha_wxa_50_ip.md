---
spec_id: admin/yamaha-wxa-50
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha WXA-50 Control Spec"
manufacturer: Yamaha
model_family: WXA-50
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - WXA-50
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
  - github.com
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
  - https://raw.githubusercontent.com/opctim/yamaha-extended-control-openapi/main/yamaha-extended-control.yaml
  - https://github.com/opctim/yamaha-extended-control-openapi
retrieved_at: 2026-08-01T04:05:47.744Z
last_checked_at: 2026-08-05T08:52:11.759Z
generated_at: 2026-08-05T08:52:11.759Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic YXC Basic spec, not WXA-50-specific. Per-device feature availability (zone count, tuner bands, inputs, sound programs, volume range) must be discovered at runtime via /system/getFeatures. The Advanced manual (MusicCast Link, distribution, zones beyond main) is not covered by this source."
  - "TCP port not stated in source (discovered via UPnP/SSDP; see Device Search section)"
  - "no explicit multi-step sequences documented as named macros."
  - "source contains no safety warnings, interlock procedures, or"
  - "TCP/HTTP port not stated in source — discovered via UPnP (X_URLBase typically shows :80)."
  - "WXA-50-specific firmware version range not stated."
  - "Source is generic YXC Basic spec (Rev. 1.00), not the WXA-50 Advanced Owner's Manual. Advanced features (MusicCast Link, distribution server role, multi-zone beyond main) live in a separate Advanced spec not provided."
  - "No authentication mechanism documented; assumed none. If a WXA-50 firmware adds pairing/PIN, this spec would need revisiting."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:52:11.759Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec actions match YXC Basic Rev 1.00 URIs literally; base URL confirmed; transport param-free beyond base path. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Yamaha WXA-50 Control Spec

## Summary
The Yamaha WXA-50 is a MusicCast-enabled streaming amplifier controlled via the Yamaha Extended Control (YXC) HTTP/REST API over Ethernet/Wi-Fi. This spec covers the basic YXC API surface (system, zone, tuner, net/usb, cd) documented in the vendor's "Yamaha Extended Control API Specification (Basic) Rev. 1.00", which applies to all MusicCast devices including the WXA-50.

<!-- UNRESOLVED: source is the generic YXC Basic spec, not WXA-50-specific. Per-device feature availability (zone count, tuner bands, inputs, sound programs, volume range) must be discovered at runtime via /system/getFeatures. The Advanced manual (MusicCast Link, distribution, zones beyond main) is not covered by this source. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{host}/YamahaExtendedControl"
  port: null  # UNRESOLVED: TCP port not stated in source (discovered via UPnP/SSDP; see Device Search section)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred from /<zone>/setPower
  - routable      # inferred from /<zone>/setInput
  - queryable     # inferred from getStatus/getPlayInfo/getFeatures
  - levelable     # inferred from /<zone>/setVolume
```

## Actions
```yaml
# Base URL for all commands: http://{host}/YamahaExtendedControl
# YXC paths below are relative to the base URL.
# HTTP method is GET for all endpoints except netusb/setSearchString (POST).
# Every response returns at least: { "response_code": <integer> } (0 = success).

# --- System ---

- id: system_getDeviceInfo
  label: Get Device Info
  kind: query
  command: "GET /v1/system/getDeviceInfo"
  params: []
  notes: "Returns model_name, destination, device_id, system_version, api_version, netmodule_version, netmodule_checksum."

- id: system_getFeatures
  label: Get Features
  kind: query
  command: "GET /v1/system/getFeatures"
  params: []
  notes: "Returns func_list, zone_num, input_list, sound_program_list, range_step (volume/tone min/max/step), tuner ranges, netusb preset count. Use to discover per-device capabilities."

- id: system_getNetworkStatus
  label: Get Network Status
  kind: query
  command: "GET /v1/system/getNetworkStatus"
  params: []
  notes: "Returns network_name, connection, dhcp, ip_address, subnet_mask, gateway, dns, wireless info, musiccast_network status, mac_address."

- id: system_getFuncStatus
  label: Get Function Status
  kind: query
  command: "GET /v1/system/getFuncStatus"
  params: []
  notes: "Returns auto_power_standby, ir_sensor, speaker_a/b, headphone, dimmer, zone_b_volume_sync."

- id: system_setAutoPowerStandby
  label: Set Auto Power Standby
  kind: action
  command: "GET /v1/system/setAutoPowerStandby?enable={enable}"
  params:
    - name: enable
      type: boolean
      required: true
      description: Auto Power Standby enable/disable.

- id: system_getLocationInfo
  label: Get Location Info
  kind: query
  command: "GET /v1/system/getLocationInfo"
  params: []
  notes: "Returns MusicCast Location ID, name, and per-zone location validity."

- id: system_sendIrCode
  label: Send IR Code
  kind: action
  command: "GET /v1/system/sendIrCode?code={code}"
  params:
    - name: code
      type: string
      required: true
      description: IR code in 8-digit hex (e.g. 7F016C13). Continuous IR codes not supported. Refer to device IR code list.

# --- Zone (path param {zone}: main / zone2 / zone3 / zone4) ---

- id: zone_getStatus
  label: Get Zone Status
  kind: query
  command: "GET /v1/{zone}/getStatus"
  params:
    - name: zone
      type: string
      required: true
      description: Target zone. Values "main" / "zone2" / "zone3" / "zone4" (Zone B reported as zone2).
  notes: "Returns power, sleep, volume, mute, max_volume, input, sound_program, tone_control, equalizer, balance, link_control, disable_flags."

- id: zone_getSoundProgramList
  label: Get Sound Program List
  kind: query
  command: "GET /v1/{zone}/getSoundProgramList"
  params:
    - name: zone
      type: string
      required: true
      description: Target zone.

- id: zone_setPower
  label: Set Zone Power
  kind: action
  command: "GET /v1/{zone}/setPower?power={power}"
  params:
    - name: zone
      type: string
      required: true
      description: Target zone.
    - name: power
      type: string
      required: true
      description: 'Power state. Values "on" / "standby" / "toggle".'

- id: zone_setSleep
  label: Set Sleep Timer
  kind: action
  command: "GET /v1/{zone}/setSleep?sleep={sleep}"
  params:
    - name: zone
      type: string
      required: true
      description: Target zone.
    - name: sleep
      type: integer
      required: true
      description: Sleep time in minutes. Values 0 / 30 / 60 / 90 / 120.

- id: zone_setVolume
  label: Set Zone Volume
  kind: action
  command: "GET /v1/{zone}/setVolume?volume={volume}&step={step}"
  params:
    - name: zone
      type: string
      required: true
      description: Target zone.
    - name: volume
      type: string
      required: true
      description: 'Volume value (min/max/step from getFeatures) or "up" / "down" (API v1.17+).'
    - name: step
      type: integer
      required: false
      description: Volume step when volume is up/down. Min step used if omitted (API v1.17+).

- id: zone_setMute
  label: Set Zone Mute
  kind: action
  command: "GET /v1/{zone}/setMute?enable={enable}"
  params:
    - name: zone
      type: string
      required: true
      description: Target zone.
    - name: enable
      type: boolean
      required: true
      description: Mute enable/disable.

- id: zone_setInput
  label: Set Zone Input
  kind: action
  command: "GET /v1/{zone}/setInput?input={input}&mode={mode}"
  params:
    - name: zone
      type: string
      required: true
      description: Target zone.
    - name: input
      type: string
      required: true
      description: Input ID (see All ID List; per-device list via getFeatures).
    - name: mode
      type: string
      required: false
      description: '"autoplay_disabled" restricts Net/USB autoplay (API v1.12+).'

- id: zone_setSoundProgram
  label: Set Sound Program
  kind: action
  command: "GET /v1/{zone}/setSoundProgram?program={program}"
  params:
    - name: zone
      type: string
      required: true
      description: Target zone.
    - name: program
      type: string
      required: true
      description: Sound Program ID (per-device list via getFeatures).

- id: zone_prepareInputChange
  label: Prepare Input Change
  kind: action
  command: "GET /v1/{zone}/prepareInputChange?input={input}"
  params:
    - name: zone
      type: string
      required: true
      description: Target zone.
    - name: input
      type: string
      required: true
      description: Input ID about to be selected.
  notes: "Valid only when prepare_input_change in zone func_list. Run before setInput when browsing Net/USB list info."

# --- Tuner (inputs: am / fm / dab) ---

- id: tuner_getPresetInfo
  label: Get Tuner Preset Info
  kind: query
  command: "GET /v1/tuner/getPresetInfo?band={band}"
  params:
    - name: band
      type: string
      required: true
      description: 'Band. "common" (common preset) or "am"/"fm"/"dab" (separate).'

- id: tuner_getPlayInfo
  label: Get Tuner Play Info
  kind: query
  command: "GET /v1/tuner/getPlayInfo"
  params: []
  notes: "Returns band, auto_scan, auto_preset, am/fm/dab freq+preset+tuned, rds, hd_radio (reserved)."

- id: tuner_setFreq
  label: Set Tuner Frequency
  kind: action
  command: "GET /v1/tuner/setFreq?band={band}&tuning={tuning}&num={num}"
  params:
    - name: band
      type: string
      required: true
      description: 'Band "am" / "fm".'
    - name: tuning
      type: string
      required: true
      description: 'Tuning method "up"/"down"/"cancel"/"auto_up"/"auto_down"/"tp_up"/"tp_down"/"direct" (tp_* RDS only).'
    - name: num
      type: integer
      required: false
      description: Frequency in kHz. Valid only when tuning=direct.

- id: tuner_recallPreset
  label: Recall Tuner Preset
  kind: action
  command: "GET /v1/tuner/recallPreset?zone={zone}&band={band}&num={num}"
  params:
    - name: zone
      type: string
      required: true
      description: Recalling zone (causes input change).
    - name: band
      type: string
      required: true
      description: '"common" or "separate" per preset type from getFeatures.'
    - name: num
      type: integer
      required: true
      description: Preset number (range from getFeatures).

- id: tuner_switchPreset
  label: Switch Tuner Preset
  kind: action
  command: "GET /v1/tuner/switchPreset?dir={dir}"
  params:
    - name: dir
      type: string
      required: true
      description: '"next" / "previous".'
  notes: "API v1.17+. Change Band before calling if preset type is separate."

- id: tuner_storePreset
  label: Store Tuner Preset
  kind: action
  command: "GET /v1/tuner/storePreset?num={num}"
  params:
    - name: num
      type: integer
      required: true
      description: Preset number (range from getFeatures).

- id: tuner_setDabService
  label: Set DAB Service
  kind: action
  command: "GET /v1/tuner/setDabService?dir={dir}"
  params:
    - name: dir
      type: string
      required: true
      description: '"next" / "previous".'
  notes: "DAB only."

# --- Net/USB (inputs: usb / server / net_radio / pandora / spotify / siriusxm / airplay / qobuz / etc.) ---

- id: netusb_getPresetInfo
  label: Get Net/USB Preset Info
  kind: query
  command: "GET /v1/netusb/getPresetInfo"
  params: []
  notes: "Presets shared across all Net/USB inputs. Count via getFeatures."

- id: netusb_getPlayInfo
  label: Get Net/USB Play Info
  kind: query
  command: "GET /v1/netusb/getPlayInfo"
  params: []
  notes: "Returns input, playback, repeat, shuffle, play_time, total_time, artist, album, track, albumart_url/id, usb_devicetype, auto_stopped, attribute (bitfield)."

- id: netusb_setPlayback
  label: Set Net/USB Playback
  kind: action
  command: "GET /v1/netusb/setPlayback?playback={playback}"
  params:
    - name: playback
      type: string
      required: true
      description: '"play"/"stop"/"pause"/"play_pause"/"previous"/"next"/"fast_reverse_start"/"fast_reverse_end"/"fast_forward_start"/"fast_forward_end".'

- id: netusb_toggleRepeat
  label: Toggle Repeat
  kind: action
  command: "GET /v1/netusb/toggleRepeat"
  params: []
  notes: "Cycles repeat; no discrete set."

- id: netusb_toggleShuffle
  label: Toggle Shuffle
  kind: action
  command: "GET /v1/netusb/toggleShuffle"
  params: []
  notes: "Cycles shuffle; no discrete set."

- id: netusb_getListInfo
  label: Get List Info
  kind: query
  command: "GET /v1/netusb/getListInfo?input={input}&index={index}&size={size}&lang={lang}"
  params:
    - name: input
      type: string
      required: true
      description: Net/USB Input ID.
    - name: index
      type: integer
      required: false
      description: Reference offset, must be multiple of 8. Reuses last index if omitted.
    - name: size
      type: integer
      required: true
      description: Max list size, range 1-8.
    - name: lang
      type: string
      required: false
      description: '"en"/"ja"/"fr"/"de"/"es"/"ru"/"it"/"zh". Defaults to "en".'
  notes: "Blocking call - may take up to 30s; no other commands accepted during."

- id: netusb_setListControl
  label: Set List Control
  kind: action
  command: "GET /v1/netusb/setListControl?list_id={list_id}&type={type}&index={index}&zone={zone}"
  params:
    - name: list_id
      type: string
      required: false
      description: '"main" (default) / "auto_complete" / "search_artist" / "search_track" (Pandora).'
    - name: type
      type: string
      required: true
      description: '"select" (enter) / "play" / "return". select/play require index.'
    - name: index
      type: integer
      required: false
      description: Element position 0-64999. Required for select/play.
    - name: zone
      type: string
      required: false
      description: Playback zone (type=play only). Defaults to "main".

- id: netusb_setSearchString
  label: Set Search String
  kind: action
  command: "POST /v1/netusb/setSearchString"
  params:
    - name: list_id
      type: string
      required: false
      description: '"main"/"auto_complete"/"search_artist"/"search_track".'
    - name: string
      type: string
      required: true
      description: Search text.
    - name: index
      type: integer
      required: false
      description: Element index 0-64999 (valid only list_id=main).
  notes: "POST with JSON body. Body example: {\"list_id\":\"auto_complete\",\"string\":\"michael\"}."

- id: netusb_recallPreset
  label: Recall Net/USB Preset
  kind: action
  command: "GET /v1/netusb/recallPreset?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
      required: true
      description: Recalling zone.
    - name: num
      type: integer
      required: true
      description: Preset number (range from getFeatures).

- id: netusb_storePreset
  label: Store Net/USB Preset
  kind: action
  command: "GET /v1/netusb/storePreset?num={num}"
  params:
    - name: num
      type: integer
      required: true
      description: Preset number (range from getFeatures).

- id: netusb_getAccountStatus
  label: Get Account Status
  kind: query
  command: "GET /v1/netusb/getAccountStatus"
  params: []
  notes: "Returns service_list with per-service registered/login_status/type/trial_time_left."

- id: netusb_switchAccount
  label: Switch Account
  kind: action
  command: "GET /v1/netusb/switchAccount?input={input}&index={index}&timeout={timeout}"
  params:
    - name: input
      type: string
      required: true
      description: '"pandora" (multi-account services).'
    - name: index
      type: integer
      required: true
      description: Account index 0-7 (Pandora).
    - name: timeout
      type: integer
      required: true
      description: Process timeout ms, 0-60000. 0 = max.

- id: netusb_getServiceInfo
  label: Get Service Info
  kind: query
  command: "GET /v1/netusb/getServiceInfo?input={input}&type={type}&timeout={timeout}"
  params:
    - name: input
      type: string
      required: true
      description: '"pandora" / "rhapsody" / "napster".'
    - name: type
      type: string
      required: true
      description: '"account_list" (Pandora) / "licensing" / "activation_code" (Pandora).'
    - name: timeout
      type: integer
      required: true
      description: Process timeout ms, 0-60000.

# --- CD ---

- id: cd_getPlayInfo
  label: Get CD Play Info
  kind: query
  command: "GET /v1/cd/getPlayInfo"
  params: []
  notes: "Returns device_status, playback, repeat, shuffle, play_time, total_time, disc_time, track_number, total_tracks, artist, album, track."

- id: cd_setPlayback
  label: Set CD Playback
  kind: action
  command: "GET /v1/cd/setPlayback?playback={playback}&num={num}"
  params:
    - name: playback
      type: string
      required: true
      description: '"play"/"stop"/"pause"/"previous"/"next"/"fast_reverse_start"/"fast_reverse_end"/"fast_forward_start"/"fast_forward_end"/"track_select".'
    - name: num
      type: integer
      required: false
      description: Track number 1-512 (valid only playback=track_select).

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
# Query responses return JSON with response_code + fields. Representative
# feedback shapes derived from documented response parameters:

- id: power_state
  type: enum
  values: ["on", "standby"]
  source: "<zone>/getStatus.power, /<zone>/setPower"

- id: zone_status
  type: object
  fields: [power, sleep, volume, mute, max_volume, input, sound_program, direct, pure_direct, enhancer, tone_control, equalizer, balance, link_control, disable_flags]
  source: "/<zone>/getStatus"

- id: network_status
  type: object
  fields: [network_name, connection, dhcp, ip_address, subnet_mask, default_gateway, dns_server_1, dns_server_2, wireless_lan, wireless_direct, musiccast_network, mac_address]
  source: "/system/getNetworkStatus"

- id: device_info
  type: object
  fields: [model_name, destination, device_id, system_version, api_version, netmodule_version, netmodule_checksum]
  source: "/system/getDeviceInfo"

- id: netusb_play_info
  type: object
  fields: [input, playback, repeat, shuffle, play_time, total_time, artist, album, track, albumart_url, albumart_id, usb_devicetype, attribute]
  source: "/netusb/getPlayInfo"

- id: tuner_play_info
  type: object
  fields: [band, auto_scan, am, fm, rds, dab]
  source: "/tuner/getPlayInfo"

- id: cd_play_info
  type: object
  fields: [device_status, playback, repeat, shuffle, play_time, total_time, disc_time, track_number, total_tracks]
  source: "/cd/getPlayInfo"
```

## Variables
```yaml
# Net/USB playback attribute bitfield (from /netusb/getPlayInfo.attribute):
- id: netusb_attribute_bits
  description: |
    OR of bit field: b0 Playable, b1 Stop-capable, b2 Pause-capable, b3 Prev-skip,
    b4 Next-skip, b5 Fast-reverse-capable, b6 Fast-forward-capable, b7 Repeat-capable,
    b8 Shuffle-capable, b9 Feedback-available (Pandora), b10 Thumbs-up (Pandora),
    b11 Thumbs-down (Pandora), b12 Video (USB), b13 Bookmark-capable (Net Radio),
    b14 DMR playback (Server), b15 Station playback (Rhapsody/Napster),
    b16 AD playback (Pandora), b17 Shared station (Pandora),
    b18 Add-track-capable, b19 Add-album-capable, b20 Shuffle station (Pandora),
    b21 Add-channel-capable (Pandora), b22 Sample playback (JUKE),
    b23 MusicPlay playback (Server), b24 Link-distribution-capable,
    b25 Add-playlist-capable (Qobuz).

# Zone disable_flags bitfield (from /<zone>/getStatus.disable_flags):
- id: zone_disable_flags_bits
  description: |
    OR of bit field: b0 Volume, b1 Mute, b2 Link Audio Delay. Functions with no
    flag set AND listed in zone func_list (getFeatures) are valid/operable.
```

## Events
```yaml
delivery: udp_unicast
subscription:
  description: |
    Events issued only when request headers include:
      X-AppName:MusicCast/<version>
      X-AppPort:<port>
    Event subscription times out after 10 minutes of no further request from
    the registered IP. Any request within 10 min resets the timer. X-AppPort
    overwrites the registered receiving port.
notifications:
  - id: system_event
    fields: [bluetooth_info_updated, func_status_updated, location_info_updated]
  - id: main_zone_event
    fields: [power, input, volume, mute, status_updated]
  - id: tuner_event
    fields: [play_info_updated, preset_info_updated]
  - id: netusb_event
    fields: [play_error, multiple_play_errors, play_message, account_updated, play_time, preset_info_updated, play_info_updated, list_info_updated, preset_control]
  - id: cd_event
    fields: [device_status, play_time, play_info_updated]
  - id: dist_event
    fields: [dist_info_updated]
  - id: device_id_event
    fields: [device_id]
play_error_codes:
  0: "No Error"
  1: "Access Error (all Net/USB)"
  2: "Playback Unavailable (all Net/USB)"
  3: "Skip Limit Reached (Rhapsody/Napster/Pandora)"
  4: "Invalid Session (Rhapsody/Napster/SiriusXM)"
  5: "High-Res File Not Playable at MusicCast Leaf (Server)"
  6: "User Uncredentialed (Qobuz)"
  7: "Track Restricted by Right Holders (Qobuz)"
  8: "Sample Restricted by Right Holders (Qobuz)"
  9: "Genre Restricted by Streaming Credentials (Qobuz)"
  10: "Application Restricted by Streaming Credentials (Qobuz)"
  11: "Intent Restricted by Streaming Credentials (Qobuz)"
  100: "Multiple Errors (see multiple_play_errors bitfield)"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented as named macros.
# The Application Notes (section 12.1) describe a browse+play workflow but as
# a procedural example, not a stored macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Only API-level notes (e.g. getListInfo is
# blocking for up to 30s, tuner input change required before switchPreset).
```

## Notes
- **Base URL:** `http://{host}/YamahaExtendedControl` — `{host}` is the device IP discovered via UPnP/SSDP (see "Device Search" section 12.2: M-SEARCH for MediaRenderer, then read device description XML and confirm `<manufacturer>Yamaha Corporation</manufacturer>` plus `<yamaha:X_yxcControlURL>`).
- **Device discovery tag:** `<yamaha:X_yxcControlURL>/YamahaExtendedControl/v1/</yamaha:X_yxcControlURL>`, plus `<yamaha:X_yxcVersion>` (e.g. `0801`) indicating the device's YXC revision.
- **API versioning:** URI contains `v1` etc.; a device supports all APIs with version ≤ the `api_version` returned by `getDeviceInfo`. Backward compatibility is guaranteed unless noted.
- **Capabilities are per-device:** zone count, input list, sound programs, volume/tone ranges, tuner bands, DAB availability must be discovered at runtime via `/system/getFeatures`. Do not assume WXA-50 supports all documented inputs/sound programs.
- **Blocking call:** `netusb/getListInfo` blocks all other commands for up to 30 seconds while the list is retrieved.
- **`prepareInputChange`:** call before `setInput` when the app intends to browse the incoming Net/USB input's list info; only valid when `prepare_input_change` is in the zone's `func_list`.
- **Parameter ranges** for volume, tone_control, equalizer, balance, etc. are returned by `getFeatures` as `range_step` objects — never hardcode device max/min.
- **Response codes:** 0 = success; 1 = initializing; 2 = internal error; 3 = invalid request; 4 = invalid parameter; 5 = guarded; 6 = timeout; 99 = firmware updating; 100s = streaming-service errors (see source section 9). Non-zero responses contain no other data.

<!-- UNRESOLVED: TCP/HTTP port not stated in source — discovered via UPnP (X_URLBase typically shows :80). -->
<!-- UNRESOLVED: WXA-50-specific firmware version range not stated. -->
<!-- UNRESOLVED: Source is generic YXC Basic spec (Rev. 1.00), not the WXA-50 Advanced Owner's Manual. Advanced features (MusicCast Link, distribution server role, multi-zone beyond main) live in a separate Advanced spec not provided. -->
<!-- UNRESOLVED: No authentication mechanism documented; assumed none. If a WXA-50 firmware adds pairing/PIN, this spec would need revisiting. -->
````

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
  - github.com
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
  - https://raw.githubusercontent.com/opctim/yamaha-extended-control-openapi/main/yamaha-extended-control.yaml
  - https://github.com/opctim/yamaha-extended-control-openapi
retrieved_at: 2026-08-01T04:05:47.744Z
last_checked_at: 2026-08-05T08:52:11.759Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:52:11.759Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec actions match YXC Basic Rev 1.00 URIs literally; base URL confirmed; transport param-free beyond base path. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic YXC Basic spec, not WXA-50-specific. Per-device feature availability (zone count, tuner bands, inputs, sound programs, volume range) must be discovered at runtime via /system/getFeatures. The Advanced manual (MusicCast Link, distribution, zones beyond main) is not covered by this source."
- "TCP port not stated in source (discovered via UPnP/SSDP; see Device Search section)"
- "no explicit multi-step sequences documented as named macros."
- "source contains no safety warnings, interlock procedures, or"
- "TCP/HTTP port not stated in source — discovered via UPnP (X_URLBase typically shows :80)."
- "WXA-50-specific firmware version range not stated."
- "Source is generic YXC Basic spec (Rev. 1.00), not the WXA-50 Advanced Owner's Manual. Advanced features (MusicCast Link, distribution server role, multi-zone beyond main) live in a separate Advanced spec not provided."
- "No authentication mechanism documented; assumed none. If a WXA-50 firmware adds pairing/PIN, this spec would need revisiting."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
