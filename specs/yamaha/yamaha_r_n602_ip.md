---
spec_id: admin/yamaha-r-n602
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha R-N602 Control Spec"
manufacturer: Yamaha
model_family: R-N602
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - R-N602
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
  - github.com
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic_v1.1.pdf
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Advanced.pdf
  - https://github.com/mvdwetering/ynca/blob/master/docs/PROTOCOL.md
retrieved_at: 2026-07-22T00:49:56.964Z
last_checked_at: 2026-07-22T08:08:43.691Z
generated_at: 2026-07-22T08:08:43.691Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "R-N602-specific input list, zone count, and feature set not enumerated in this generic YXC spec — run /system/getFeatures on a real R-N602 to confirm"
  - "endpoints from the Advanced YXC spec (distribution / link control, getDistributionInfo, etc.) are not represented in this Basic v1 spec — pull from the Advanced v2.0 mirror if those features are needed for R-N602"
  - "full feedback enumeration should be generated from /main/getStatus response example on a real R-N602"
  - "per-zone min/max/step values are device-specific — populate from /system/getFeatures on a real R-N602"
  - "getListInfo blocks other commands for up to 30 s while fetching the list"
  - "no safety warnings, interlocks, or power-on sequencing"
  - "R-N602-specific input list, zone_num, and feature flags not enumerated in the generic YXC spec. UNRESOLVED: HTTP TCP port not stated in this source — first-party Yamaha deployments commonly use 80 but that is not asserted here. UNRESOLVED: Advanced YXC endpoints (distribution / link control) not represented — pull from YXC_API_Spec_Advanced_v2.0.pdf mirror if needed."
verification:
  verdict: verified
  checked_at: 2026-07-22T08:08:43.691Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec actions map 1:1 to the source's 41 documented YXC v1 endpoints (System/Zone/Tuner/NetUSB/CD) with matching query params and verbatim base URL. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Yamaha R-N602 Control Spec

## Summary
Network Hi-Fi receiver controllable over Ethernet/Wi-Fi via the Yamaha Extended Control (YXC) HTTP/JSON API. This spec covers the v1 YXC endpoints documented in the Yamaha Extended Control API Specification (Basic, Rev. 1.00) as exposed by MusicCast-enabled devices including the R-N602, plus the YXC event notification channel over UDP.

<!-- UNRESOLVED: R-N602-specific input list, zone count, and feature set not enumerated in this generic YXC spec — run /system/getFeatures on a real R-N602 to confirm -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: http://{host}/YamahaExtendedControl
auth:
  type: none  # inferred: no auth procedure in source
```

Notes on transport (from source):
- HTTP requests are GET unless documented otherwise; one endpoint (`setSearchString`) is documented as POST with a JSON body.
- Events are sent as UDP unicast to the port given in the `X-AppPort` request header, triggered when requests carry `X-AppName: MusicCast/<app-version>` and `X-AppPort: <port>`. Event timeout is 10 minutes and resets on each new request.
- The TCP port for the HTTP API is not stated in the source (standard first-party Yamaha deployments use port 80 but is not asserted by this document).

## Traits
```yaml
- powerable       # inferred: setPower endpoint
- routable        # inferred: setInput / setSoundProgram endpoints
- queryable       # inferred: getDeviceInfo, getStatus, getPlayInfo, etc.
- levelable       # inferred: setVolume, setMute, tone_control / equalizer fields
```

## Actions
```yaml
- id: system_get_device_info
  label: Get Device Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getDeviceInfo"
  params: []

- id: system_get_features
  label: Get Features
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getFeatures"
  params: []

- id: system_get_network_status
  label: Get Network Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getNetworkStatus"
  params: []

- id: system_get_func_status
  label: Get Func Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getFuncStatus"
  params: []

- id: system_set_auto_power_standby
  label: Set Auto Power Standby
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setAutoPowerStandby?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: system_get_location_info
  label: Get Location Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getLocationInfo"
  params: []

- id: system_send_ir_code
  label: Send IR Code
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/sendIrCode?code={code}"
  params:
    - name: code
      type: string
      description: "8-digit hex IR code from device IR list"

- id: zone_get_status
  label: Get Zone Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/{zone}/getStatus"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"

- id: zone_get_sound_program_list
  label: Get Sound Program List
  kind: query
  command: "GET /YamahaExtendedControl/v1/{zone}/getSoundProgramList"
  params:
    - name: zone
      type: string

- id: zone_set_power
  label: Set Zone Power
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setPower?power={power}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: power
      type: string
      description: "on / standby / toggle"

- id: zone_set_sleep
  label: Set Sleep Timer
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setSleep?sleep={sleep}"
  params:
    - name: zone
      type: string
    - name: sleep
      type: integer
      description: "0 / 30 / 60 / 90 / 120 minutes"

- id: zone_set_volume
  label: Set Zone Volume
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setVolume?volume={volume}&step={step}"
  params:
    - name: zone
      type: string
    - name: volume
      type: string
      description: "integer value, or up / down (API 1.17+)"
    - name: step
      type: integer
      description: "Optional step value when volume is up/down (API 1.17+)"

- id: zone_set_mute
  label: Set Zone Mute
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setMute?enable={enable}"
  params:
    - name: zone
      type: string
    - name: enable
      type: boolean

- id: zone_set_input
  label: Set Zone Input
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setInput?input={input}&mode={mode}"
  params:
    - name: zone
      type: string
    - name: input
      type: string
      description: "Input ID from getFeatures input_list"
    - name: mode
      type: string
      description: "Optional: autoplay_disabled (API 1.12+)"

- id: zone_set_sound_program
  label: Set Sound Program
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setSoundProgram?program={program}"
  params:
    - name: zone
      type: string
    - name: program
      type: string
      description: "Sound Program ID from getFeatures sound_program_list"

- id: zone_prepare_input_change
  label: Prepare Input Change
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/prepareInputChange?input={input}"
  params:
    - name: zone
      type: string
    - name: input
      type: string

- id: tuner_get_preset_info
  label: Get Tuner Preset Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/tuner/getPresetInfo?band={band}"
  params:
    - name: band
      type: string
      description: "common / am / fm / dab (per getFeatures preset.type)"

- id: tuner_get_play_info
  label: Get Tuner Play Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/tuner/getPlayInfo"
  params: []

- id: tuner_set_freq
  label: Set Tuner Frequency
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/setFreq?band={band}&tuning={tuning}&num={num}"
  params:
    - name: band
      type: string
      description: "am / fm"
    - name: tuning
      type: string
      description: "up / down / cancel / auto_up / auto_down / tp_up / tp_down / direct"
    - name: num
      type: integer
      description: "Frequency in kHz (required only when tuning=direct)"

- id: tuner_recall_preset
  label: Recall Tuner Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/recallPreset?zone={zone}&band={band}&num={num}"
  params:
    - name: zone
      type: string
    - name: band
      type: string
      description: "common / am / fm / dab"
    - name: num
      type: integer

- id: tuner_switch_preset
  label: Switch Tuner Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/switchPreset?dir={dir}"
  params:
    - name: dir
      type: string
      description: "next / previous"

- id: tuner_store_preset
  label: Store Tuner Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/storePreset?num={num}"
  params:
    - name: num
      type: integer

- id: tuner_set_dab_service
  label: Set DAB Service
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/setDabService?dir={dir}"
  params:
    - name: dir
      type: string
      description: "next / previous"

- id: netusb_get_preset_info
  label: Get NetUSB Preset Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getPresetInfo"
  params: []

- id: netusb_get_play_info
  label: Get NetUSB Play Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getPlayInfo"
  params: []

- id: netusb_set_playback
  label: Set NetUSB Playback
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setPlayback?playback={playback}"
  params:
    - name: playback
      type: string
      description: "play / stop / pause / play_pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end"

- id: netusb_toggle_repeat
  label: Toggle NetUSB Repeat
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/toggleRepeat"
  params: []

- id: netusb_toggle_shuffle
  label: Toggle NetUSB Shuffle
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/toggleShuffle"
  params: []

- id: netusb_get_list_info
  label: Get NetUSB List Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getListInfo?input={input}&index={index}&size={size}&lang={lang}"
  params:
    - name: list_id
      type: string
      description: "Optional: main / auto_complete / search_artist / search_track"
    - name: input
      type: string
      description: "NetUSB Input ID"
    - name: index
      type: integer
      description: "Multiple of 8, 0..64992"
    - name: size
      type: integer
      description: "1..8"
    - name: lang
      type: string
      description: "en / ja / fr / de / es / ru / it / zh"

- id: netusb_set_list_control
  label: NetUSB List Control
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setListControl?list_id={list_id}&type={type}&index={index}&zone={zone}"
  params:
    - name: list_id
      type: string
    - name: type
      type: string
      description: "select / play / return"
    - name: index
      type: integer
      description: "Required for select/play; 0..64999"
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4 (used with type=play)"

- id: netusb_set_search_string
  label: Set NetUSB Search String
  kind: action
  command: "POST /YamahaExtendedControl/v1/netusb/setSearchString"
  params:
    - name: body
      type: json
      description: 'JSON body e.g. {"list_id":"auto_complete","string":"michael"}'

- id: netusb_recall_preset
  label: Recall NetUSB Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/recallPreset?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
    - name: num
      type: integer

- id: netusb_store_preset
  label: Store NetUSB Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/storePreset?num={num}"
  params:
    - name: num
      type: integer

- id: netusb_get_account_status
  label: Get NetUSB Account Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getAccountStatus"
  params: []

- id: netusb_switch_account
  label: Switch NetUSB Account
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/switchAccount?input={input}&index={index}&timeout={timeout}"
  params:
    - name: input
      type: string
      description: "pandora"
    - name: index
      type: integer
      description: "0..7"
    - name: timeout
      type: integer
      description: "0..60000 ms"

- id: netusb_get_service_info
  label: Get NetUSB Service Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getServiceInfo?input={input}&type={type}&timeout={timeout}"
  params:
    - name: input
      type: string
      description: "pandora / rhapsody / napster"
    - name: type
      type: string
      description: "account_list / licensing / activation_code"
    - name: timeout
      type: integer

- id: cd_get_play_info
  label: Get CD Play Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/cd/getPlayInfo"
  params: []

- id: cd_set_playback
  label: Set CD Playback
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/setPlayback?playback={playback}&num={num}"
  params:
    - name: playback
      type: string
      description: "play / stop / pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end / track_select"
    - name: num
      type: integer
      description: "Track number 1..512 (only when playback=track_select)"

- id: cd_toggle_tray
  label: Toggle CD Tray
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/toggleTray"
  params: []

- id: cd_toggle_repeat
  label: Toggle CD Repeat
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/toggleRepeat"
  params: []

- id: cd_toggle_shuffle
  label: Toggle CD Shuffle
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/toggleShuffle"
  params: []
```

<!-- UNRESOLVED: endpoints from the Advanced YXC spec (distribution / link control, getDistributionInfo, etc.) are not represented in this Basic v1 spec — pull from the Advanced v2.0 mirror if those features are needed for R-N602 -->

## Feedbacks
```yaml
# Observable response shapes returned by query endpoints.
# - id: power_state
#   type: enum
#   values: [on, standby]
# - id: zone_volume
#   type: integer
#   description: Range from /system/getFeatures range_step volume
# - id: zone_mute
#   type: boolean
# - id: zone_input
#   type: string
#   description: Input ID from /system/getFeatures input_list
# - id: response_code
#   type: integer
#   description: "0 success / 1 initializing / 2 internal error / 3 invalid request / 4 invalid parameter / 5 guarded / 6 timeout / 99 firmware updating / 100s streaming service errors (see Response Code List)"
# - id: auto_power_standby
#   type: boolean
# - id: ir_sensor
#   type: boolean
# - id: speaker_a
#   type: boolean
# - id: speaker_b
#   type: boolean
# - id: headphone
#   type: boolean
# - id: dimmer
#   type: integer
#   description: "-1 = auto dimmer, 0+ = manual"
# - id: network_connection
#   type: string
#   description: "wired_lan / wireless_lan / wireless_direct / extend_1 / extend_2 / extend_3 / unknown"
# - id: ip_address
#   type: string
# - id: mac_address_wired_lan
#   type: string
# - id: mac_address_wireless_lan
#   type: string
# - id: mac_address_wireless_direct
#   type: string
# - id: musiccast_network_device_type
#   type: string
#   description: "root / node / leaf / standard / unknown"
# - id: model_name
#   type: string
# - id: api_version
#   type: float
# - id: system_version
#   type: float
# - id: netusb_playback
#   type: string
#   description: "play / stop / pause / fast_reverse / fast_forward"
# - id: netusb_repeat
#   type: string
#   description: "off / one / all"
# - id: netusb_shuffle
#   type: string
#   description: "off / on / songs / albums"
# - id: netusb_artist
#   type: string
# - id: netusb_album
#   type: string
# - id: netusb_track
#   type: string
# - id: netusb_play_time
#   type: integer
# - id: netusb_total_time
#   type: integer
# - id: cd_device_status
#   type: string
#   description: "open / close / ready / not_ready"
# - id: cd_track_number
#   type: integer
# - id: cd_total_tracks
#   type: integer
# - id: tuner_band
#   type: string
#   description: "am / fm / dab"
# - id: tuner_freq
#   type: integer
#   description: "kHz (AM/FM) or station ID (DAB)"
# - id: tuner_tuned
#   type: boolean
# - id: tuner_preset
#   type: integer
```

<!-- UNRESOLVED: full feedback enumeration should be generated from /main/getStatus response example on a real R-N602 -->

## Variables
```yaml
# Settable parameters exposed as range_step objects under getFeatures.
# - id: volume
#   type: integer
#   description: "min/max/step from getFeatures range_step per zone"
# - id: tone_control
#   type: integer
# - id: equalizer
#   type: integer
# - id: balance
#   type: integer
# - id: dialogue_level
#   type: integer
# - id: dialogue_lift
#   type: integer
# - id: subwoofer_volume
#   type: integer
# - id: am_tuning
#   type: integer
#   description: "kHz; min/max/step from getFeatures tuner range_step"
# - id: fm_tuning
#   type: integer
# - id: dimmer
#   type: integer
```

<!-- UNRESOLVED: per-zone min/max/step values are device-specific — populate from /system/getFeatures on a real R-N602 -->

## Events
```yaml
# Events are UDP unicast sent when the client request carries
# X-AppName: MusicCast/<version> and X-AppPort: <port> headers.
# Event timeout 10 minutes; reset by each new request.
#
# - id: system_event
#   description: |
#     Top-level system changes. Notify-flags include
#     bluetooth_info_updated, func_status_updated, speaker_settings_updated,
#     name_text_updated, tag_updated, location_info_updated,
#     stereo_pair_info_updated.
# - id: zone_event
#   description: |
#     Per-zone status change. Notify fields: power, input, volume, mute,
#     status_updated, signal_info_updated (main only).
# - id: tuner_event
#   description: "play_info_updated, preset_info_updated"
# - id: netusb_event
#   description: |
#     play_error (code 0..100), multiple_play_errors (bitfield), play_message,
#     account_updated, play_time, preset_info_updated, recent_info_updated,
#     preset_control {type, num, result}, trial_status, trial_time_left,
#     play_info_updated, list_info_updated.
# - id: cd_event
#   description: "device_status, play_time, play_info_updated"
# - id: dist_event
#   description: "dist_info_updated (Link distribution change)"
# - id: device_id_event
#   description: "Device ID (API 1.17+)"
```

## Macros
```yaml
# - id: change_input_browse_play
#   label: Change input, browse USB, then play a track
#   description: |
#     Documented end-to-end example in section 12.1 of the YXC Basic spec.
#     Steps:
#       1. prepare_input_change on zone main, input=usb
#       2. set_input on zone main, input=usb, mode=autoplay_disabled
#       3. netusb get_list_info (input=usb, index=0, size=8, lang=en) to root
#       4. netusb set_list_control (list_id=main, type=select, index=<folder>)
#       5. netusb get_list_info with index stepped by 8 to page through list
#       6. netusb set_list_control (list_id=main, type=play, index=<file>)
#       7. netusb set_list_control (list_id=main, type=return) to go back a layer
#   steps: []
```

<!-- UNRESOLVED: getListInfo blocks other commands for up to 30 s while fetching the list -->

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing
# requirements appear in this YXC spec. R-N602 hardware-specific
# cautions live in the Owner's Manual, not in this document.
```

## Notes
- Source is the generic Yamaha Extended Control API Specification (Basic, Rev. 1.00), which covers MusicCast-enabled devices including the R-N602 but is not R-N602-specific.
- All endpoints use HTTP GET with URL-encoded parameters except `/netusb/setSearchString`, which is HTTP POST with a JSON body.
- Range/step values for volume, tone_control, equalizer, balance, dialogue_level, dialogue_lift, subwoofer_volume, AM/FM tuning, and dimmer are device-specific — read them from `/system/getFeatures` at runtime.
- Input IDs and Sound Program IDs are enumerated in section 11 of the source (`All ID List`); not all apply to the R-N602 — filter via `/system/getFeatures` for the actual device.
- `setSearchString` uses HTTP POST; remaining endpoints in this spec are HTTP GET.
- Events require the `X-AppName` and `X-AppPort` request headers to be set; otherwise the device does not emit events.
- `getListInfo` is blocking and may take up to 30 s; other commands are rejected while it runs.
- API version is reported in `/system/getDeviceInfo` as `api_version`; capabilities documented as "API Version 1.17+" are gated on the device's reported version.
- The R-N602 Owner's Manual (yamaha.com) was identified as a complementary first-party source but was not parsed here; verify R-N602-specific input list, zone count, and any feature gating against it.

<!-- UNRESOLVED: R-N602-specific input list, zone_num, and feature flags not enumerated in the generic YXC spec. UNRESOLVED: HTTP TCP port not stated in this source — first-party Yamaha deployments commonly use 80 but that is not asserted here. UNRESOLVED: Advanced YXC endpoints (distribution / link control) not represented — pull from YXC_API_Spec_Advanced_v2.0.pdf mirror if needed. -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
  - github.com
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic_v1.1.pdf
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Advanced.pdf
  - https://github.com/mvdwetering/ynca/blob/master/docs/PROTOCOL.md
retrieved_at: 2026-07-22T00:49:56.964Z
last_checked_at: 2026-07-22T08:08:43.691Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T08:08:43.691Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec actions map 1:1 to the source's 41 documented YXC v1 endpoints (System/Zone/Tuner/NetUSB/CD) with matching query params and verbatim base URL. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "R-N602-specific input list, zone count, and feature set not enumerated in this generic YXC spec — run /system/getFeatures on a real R-N602 to confirm"
- "endpoints from the Advanced YXC spec (distribution / link control, getDistributionInfo, etc.) are not represented in this Basic v1 spec — pull from the Advanced v2.0 mirror if those features are needed for R-N602"
- "full feedback enumeration should be generated from /main/getStatus response example on a real R-N602"
- "per-zone min/max/step values are device-specific — populate from /system/getFeatures on a real R-N602"
- "getListInfo blocks other commands for up to 30 s while fetching the list"
- "no safety warnings, interlocks, or power-on sequencing"
- "R-N602-specific input list, zone_num, and feature flags not enumerated in the generic YXC spec. UNRESOLVED: HTTP TCP port not stated in this source — first-party Yamaha deployments commonly use 80 but that is not asserted here. UNRESOLVED: Advanced YXC endpoints (distribution / link control) not represented — pull from YXC_API_Spec_Advanced_v2.0.pdf mirror if needed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
