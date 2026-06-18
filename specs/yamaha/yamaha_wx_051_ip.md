---
spec_id: admin/yamaha-wx-051
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha WX-051 Control Spec"
manufacturer: Yamaha
model_family: WX-051
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - WX-051
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
  - community-openhab-org.s3-eu-central-1.amazonaws.com
  - community.symcon.de
  - github.com
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://github.com/rsc-dev/pyamaha
  - https://github.com/opctim/yamaha-extended-control-openapi
retrieved_at: 2026-06-15T12:44:45.849Z
last_checked_at: 2026-06-16T07:19:53.970Z
generated_at: 2026-06-16T07:19:53.970Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic YXC Basic spec, not a WX-051-specific document. Exact feature subset, zone count, input list, and sound program list for WX-051 are only knowable via /system/getFeatures on a live device. HTTP port not stated. Firmware compatibility not stated."
  - "port number not stated in source (an example device description shows :80, not normative)"
  - "per-device available feedback fields are only knowable at runtime via getStatus/getFeatures on a live WX-051."
  - "discrete setToneControl endpoint not documented in this Basic spec"
  - "tone_control, equalizer, balance, dialogue_level, dialogue_lift, subwoofer_volume, clear_voice, enhancer, pure_direct, direct, link_control, link_audio_delay are listed in getFeatures/getStatus but no discrete setter endpoints appear in this Basic spec. Populate if/when the YXC Advanced spec is sourced."
  - "source contains no explicit safety warnings, power-on sequencing"
  - "WX-051-specific feature subset not stated in source (must be read from /system/getFeatures on a live device)."
  - "firmware version compatibility not stated."
  - "HTTP port not stated (an example device description shows :80 but it is not normative)."
  - "YXC Advanced spec (MusicCast link, distribution, advanced sound params) not sourced — tone_control/equalizer/balance/dialogue/subwoofer setters absent from this Basic spec."
  - "first-party Yamaha URL for this PDF not found; source was a third-party GitHub rehost of the Yamaha-authored PDF (per recovery memo)."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:19:53.970Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec actions map one-to-one to documented YXC v1 endpoints in the source; transport base URL is verbatim; port is correctly left null/unresolved as the source gives only a non-normative example. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Yamaha WX-051 Control Spec

## Summary
The Yamaha WX-051 is a MusicCast-enabled wireless speaker. This spec covers the Yamaha Extended Control (YXC) v1 HTTP REST API used to control MusicCast devices: system info, zone (power/volume/mute/input/sound program), tuner, Net/USB playback, CD, and UDP event notifications. The WX-051 implements YXC; the source document is the generic Yamaha YXC API Specification (Basic) Rev. 1.00, which does not name the WX-051 explicitly — runtime feature availability is reported by `/system/getFeatures`.

<!-- UNRESOLVED: source is the generic YXC Basic spec, not a WX-051-specific document. Exact feature subset, zone count, input list, and sound program list for WX-051 are only knowable via /system/getFeatures on a live device. HTTP port not stated. Firmware compatibility not stated. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{host}/YamahaExtendedControl"
  # {host} = IP address of the Device to be controlled (source: section 3)
  port: null  # UNRESOLVED: port number not stated in source (an example device description shows :80, not normative)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: /v1/<zone>/setPower documented
  - queryable    # inferred: getDeviceInfo / getFeatures / getStatus query commands documented
  - levelable    # inferred: /v1/<zone>/setVolume documented
  - routable     # inferred: /v1/<zone>/setInput + prepareInputChange documented
```

## Actions
```yaml
# Source documents the YXC v1 command catalogue. Each entry below is one
# distinct URI/method the source lists as a separate row. Zone-parameterized
# commands are parameterized on {zone} (Values: main / zone2 / zone3 / zone4).
# Per-source note: actual availability per device is reported by
# /system/getFeatures; the WX-051 (wireless speaker) may not expose every
# command below (e.g. CD, multi-zone, tuner) - caller must consult getFeatures.

# ---- System ----
- id: system_getDeviceInfo
  label: Get Device Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getDeviceInfo"
  params: []

- id: system_getFeatures
  label: Get Features
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getFeatures"
  params: []

- id: system_getNetworkStatus
  label: Get Network Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getNetworkStatus"
  params: []

- id: system_getFuncStatus
  label: Get Function Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getFuncStatus"
  params: []

- id: system_setAutoPowerStandby
  label: Set Auto Power Standby
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setAutoPowerStandby?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: Auto Power Standby status (true/false)

- id: system_getLocationInfo
  label: Get Location Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getLocationInfo"
  params: []

- id: system_sendIrCode
  label: Send IR Code
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/sendIrCode?code={code}"
  params:
    - name: code
      type: string
      description: IR code in 8-digit hex

# ---- Zone ----
- id: zone_getStatus
  label: Zone Get Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/{zone}/getStatus"
  params:
    - name: zone
      type: string
      description: Target zone (main / zone2 / zone3 / zone4)

- id: zone_getSoundProgramList
  label: Zone Get Sound Program List
  kind: query
  command: "GET /YamahaExtendedControl/v1/{zone}/getSoundProgramList"
  params:
    - name: zone
      type: string
      description: Target zone (main / zone2 / zone3 / zone4)

- id: zone_setPower
  label: Zone Set Power
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setPower?power={power}"
  params:
    - name: zone
      type: string
      description: Target zone (main / zone2 / zone3 / zone4)
    - name: power
      type: string
      description: Power status (on / standby / toggle)

- id: zone_setSleep
  label: Zone Set Sleep Timer
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setSleep?sleep={sleep}"
  params:
    - name: zone
      type: string
      description: Target zone (main / zone2 / zone3 / zone4)
    - name: sleep
      type: integer
      description: Sleep time in minutes (0 / 30 / 60 / 90 / 120)

- id: zone_setVolume
  label: Zone Set Volume
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setVolume?volume={volume}&step={step}"
  params:
    - name: zone
      type: string
      description: Target zone (main / zone2 / zone3 / zone4)
    - name: volume
      type: string
      description: Volume value (integer per getFeatures range), or "up" / "down" (API >= 1.17)
    - name: step
      type: integer
      required: false
      description: Volume step when volume is up/down; defaults to min step

- id: zone_setMute
  label: Zone Set Mute
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setMute?enable={enable}"
  params:
    - name: zone
      type: string
      description: Target zone (main / zone2 / zone3 / zone4)
    - name: enable
      type: boolean
      description: Mute status

- id: zone_setInput
  label: Zone Set Input
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setInput?input={input}&mode={mode}"
  params:
    - name: zone
      type: string
      description: Target zone (main / zone2 / zone3 / zone4)
    - name: input
      type: string
      description: Input ID (per /system/getFeatures All ID List)
    - name: mode
      type: string
      required: false
      description: "autoplay_disabled" (restricts Net/USB autoplay; API >= 1.12)

- id: zone_setSoundProgram
  label: Zone Set Sound Program
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setSoundProgram?program={program}"
  params:
    - name: zone
      type: string
      description: Target zone (main / zone2 / zone3 / zone4)
    - name: program
      type: string
      description: Sound Program ID (per /system/getFeatures)

- id: zone_prepareInputChange
  label: Zone Prepare Input Change
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/prepareInputChange?input={input}"
  params:
    - name: zone
      type: string
      description: Target zone (main / zone2 / zone3 / zone4)
    - name: input
      type: string
      description: Input ID about to be selected

# ---- Tuner (target inputs: AM / FM / DAB) ----
- id: tuner_getPresetInfo
  label: Tuner Get Preset Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/tuner/getPresetInfo?band={band}"
  params:
    - name: band
      type: string
      description: "common" or "am" / "fm" / "dab" (per preset type in getFeatures)

- id: tuner_getPlayInfo
  label: Tuner Get Play Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/tuner/getPlayInfo"
  params: []

- id: tuner_setFreq
  label: Tuner Set Frequency
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/setFreq?band={band}&tuning={tuning}&num={num}"
  params:
    - name: band
      type: string
      description: Band (am / fm)
    - name: tuning
      type: string
      description: "up / down / cancel / auto_up / auto_down / tp_up / tp_down / direct"
    - name: num
      type: integer
      required: false
      description: Frequency in kHz (valid only when tuning=direct)

- id: tuner_recallPreset
  label: Tuner Recall Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/recallPreset?zone={zone}&band={band}&num={num}"
  params:
    - name: zone
      type: string
      description: Recall zone (causes input change)
    - name: band
      type: string
      description: "common" or per-band (per getFeatures preset type)
    - name: num
      type: integer
      description: Preset number (range per getFeatures)

- id: tuner_switchPreset
  label: Tuner Switch Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/switchPreset?dir={dir}"
  params:
    - name: dir
      type: string
      description: "next" / "previous" (API >= 1.17)

- id: tuner_storePreset
  label: Tuner Store Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/storePreset?num={num}"
  params:
    - name: num
      type: integer
      description: Preset number (range per getFeatures)

- id: tuner_setDabService
  label: Tuner Set DAB Service
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/setDabService?dir={dir}"
  params:
    - name: dir
      type: string
      description: "next" / "previous"

# ---- Net/USB (USB / Server / Net Radio / Pandora / Spotify / AirPlay etc.) ----
- id: netusb_getPresetInfo
  label: Net/USB Get Preset Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getPresetInfo"
  params: []

- id: netusb_getPlayInfo
  label: Net/USB Get Play Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getPlayInfo"
  params: []

- id: netusb_setPlayback
  label: Net/USB Set Playback
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setPlayback?playback={playback}"
  params:
    - name: playback
      type: string
      description: "play / stop / pause / play_pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end"

- id: netusb_toggleRepeat
  label: Net/USB Toggle Repeat
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/toggleRepeat"
  params: []

- id: netusb_toggleShuffle
  label: Net/USB Toggle Shuffle
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/toggleShuffle"
  params: []

- id: netusb_getListInfo
  label: Net/USB Get List Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getListInfo?list_id={list_id}&input={input}&index={index}&size={size}&lang={lang}"
  params:
    - name: list_id
      type: string
      required: false
      description: "main (default) / auto_complete / search_artist / search_track (Pandora)"
    - name: input
      type: string
      description: Target Net/USB Input ID
    - name: index
      type: integer
      required: false
      description: Reference offset (multiple of 8; 0..64992)
    - name: size
      type: integer
      description: Max list size (1-8)
    - name: lang
      type: string
      required: false
      description: "en / ja / fr / de / es / ru / it / zh"

- id: netusb_setListControl
  label: Net/USB Set List Control
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setListControl?list_id={list_id}&type={type}&index={index}&zone={zone}"
  params:
    - name: list_id
      type: string
      required: false
      description: "main (default) / auto_complete / search_artist / search_track"
    - name: type
      type: string
      description: "select / play / return"
    - name: index
      type: integer
      required: false
      description: Element position (0-64999); mandatory for select/play
    - name: zone
      type: string
      required: false
      description: Playback zone (only when type=play; default main)

- id: netusb_setSearchString
  label: Net/USB Set Search String
  kind: action
  command: "POST /YamahaExtendedControl/v1/netusb/setSearchString"
  params:
    - name: list_id
      type: string
      required: false
      description: List ID to search (in POST body)
    - name: string
      type: string
      description: Search text (in POST body)
    - name: index
      type: integer
      required: false
      description: Optional element index for combined select (0-64999)

- id: netusb_recallPreset
  label: Net/USB Recall Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/recallPreset?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
      description: Recall zone (causes input change)
    - name: num
      type: integer
      description: Preset number (range per getFeatures)

- id: netusb_storePreset
  label: Net/USB Store Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/storePreset?num={num}"
  params:
    - name: num
      type: integer
      description: Preset number (range per getFeatures)

- id: netusb_getAccountStatus
  label: Net/USB Get Account Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getAccountStatus"
  params: []

- id: netusb_switchAccount
  label: Net/USB Switch Account
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/switchAccount?input={input}&index={index}&timeout={timeout}"
  params:
    - name: input
      type: string
      description: Target Input ID (e.g. pandora)
    - name: index
      type: integer
      description: Account index (0-7 for Pandora)
    - name: timeout
      type: integer
      description: Process timeout in ms (0 = max; 0-60000)

- id: netusb_getServiceInfo
  label: Net/USB Get Service Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getServiceInfo?input={input}&type={type}&timeout={timeout}"
  params:
    - name: input
      type: string
      description: "pandora / rhapsody / napster"
    - name: type
      type: string
      description: "account_list (Pandora) / licensing / activation_code (Pandora)"
    - name: timeout
      type: integer
      description: Process timeout in ms (0 = max; 0-60000)

# ---- CD (device-dependent; WX-051 has no CD transport - retained for spec completeness per coverage rule) ----
- id: cd_getPlayInfo
  label: CD Get Play Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/cd/getPlayInfo"
  params: []

- id: cd_setPlayback
  label: CD Set Playback
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/setPlayback?playback={playback}&num={num}"
  params:
    - name: playback
      type: string
      description: "play / stop / pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end / track_select"
    - name: num
      type: integer
      required: false
      description: Track number (1-512; valid only when playback=track_select)

- id: cd_toggleTray
  label: CD Toggle Tray
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/toggleTray"
  params: []

- id: cd_toggleRepeat
  label: CD Toggle Repeat
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/toggleRepeat"
  params: []

- id: cd_toggleShuffle
  label: CD Toggle Shuffle
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/toggleShuffle"
  params: []
```

## Feedbacks
```yaml
# All YXC query responses return response_code (integer; 0 = success).
# Below are the principal observable states surfaced by query commands.

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
  source: "Response Code List, section 9"

- id: zone_power_state
  type: enum
  values: [on, standby]
  source: "/v1/<zone>/getStatus -> power"

- id: zone_mute_state
  type: boolean
  source: "/v1/<zone>/getStatus -> mute"

- id: zone_volume
  type: integer
  source: "/v1/<zone>/getStatus -> volume (range per getFeatures)"

- id: zone_input
  type: string
  source: "/v1/<zone>/getStatus -> input (Input ID)"

- id: zone_sound_program
  type: string
  source: "/v1/<zone>/getStatus -> sound_program"

- id: netusb_playback_state
  type: enum
  values: [play, stop, pause, fast_reverse, fast_forward]
  source: "/v1/netusb/getPlayInfo -> playback"

- id: tuner_band
  type: enum
  values: [am, fm, dab]
  source: "/v1/tuner/getPlayInfo -> band"

- id: cd_device_status
  type: enum
  values: [open, close, ready, not_ready]
  source: "/v1/cd/getPlayInfo -> device_status"

# UNRESOLVED: per-device available feedback fields are only knowable at runtime via getStatus/getFeatures on a live WX-051.
```

## Variables
```yaml
# Settable parameters exposed via set commands (not discrete actions):
- id: zone_volume
  type: integer
  set_via: "/v1/<zone>/setVolume?volume={volume}"
  range: "per /system/getFeatures range_step (zone -> volume)"
  notes: "Also accepts 'up'/'down' with optional step (API >= 1.17)"

- id: zone_sleep_timer
  type: integer
  set_via: "/v1/<zone>/setSleep?sleep={sleep}"
  range: [0, 30, 60, 90, 120]

- id: zone_tone_control_bass
  type: integer
  set_via: "tone_control object via zone getStatus/setSoundProgram flow (range per getFeatures)"
  # UNRESOLVED: discrete setToneControl endpoint not documented in this Basic spec

- id: system_auto_power_standby
  type: boolean
  set_via: "/v1/system/setAutoPowerStandby?enable={enable}"

# UNRESOLVED: tone_control, equalizer, balance, dialogue_level, dialogue_lift, subwoofer_volume, clear_voice, enhancer, pure_direct, direct, link_control, link_audio_delay are listed in getFeatures/getStatus but no discrete setter endpoints appear in this Basic spec. Populate if/when the YXC Advanced spec is sourced.
```

## Events
```yaml
# Source section 10: events are pushed as UDP unicast from the device to the
# external application. Activation requires two request headers on any YXC
# request from the client:
#   X-AppName: MusicCast/{version}      e.g. MusicCast/1.40(iOS)
#   X-AppPort: {port}                   e.g. 41100  (client UDP listen port)
# Event subscription times out after 10 minutes of inactivity from the
# registered client IP; any new YXC request within that window resets it.

transport: udp_unicast
activation_headers:
  - "X-AppName: MusicCast/{app_version}"
  - "X-AppPort: {client_udp_port}"
timeout_minutes: 10

event_groups:
  - id: system_event
    fields:
      - bluetooth_info_updated (boolean)
      - func_status_updated (boolean)
      - location_info_updated (boolean)

  - id: zone_event
    applies_to: [main, zone2, zone3, zone4]
    fields:
      - power (string: on / standby)
      - input (string: Input ID)
      - volume (integer)
      - mute (boolean)
      - status_updated (boolean)

  - id: tuner_event
    fields:
      - play_info_updated (boolean)
      - preset_info_updated (boolean)

  - id: netusb_event
    fields:
      - play_error (integer, 0 = no error; 1-11, 100 = multiple)
      - multiple_play_errors (integer, bitfield)
      - play_message (string, max 256 bytes)
      - account_updated (boolean)
      - play_time (integer, seconds)
      - preset_info_updated (boolean)
      - preset_control (object: type/num/result)
      - trial_status (object)
      - trial_time_left (object)
      - play_info_updated (boolean)
      - list_info_updated (boolean)

  - id: cd_event
    fields:
      - device_status (string: open / close / ready / not_ready)
      - play_time (integer, seconds)
      - play_info_updated (boolean)

  - id: dist_event
    fields:
      - dist_info_updated (boolean)

device_id_in_event: "Available on and after API Version 1.17"
```

## Macros
```yaml
# Source section 12.1 documents an explicit multi-step sequence for USB browse
# and playback. Steps below verbatim from source application notes.
macros:
  - id: usb_browse_and_play
    description: "Browse USB and play target file (source section 12.1)"
    steps:
      - "GET /v1/main/prepareInputChange?input=usb"
      - "GET /v1/main/setInput?input=usb&mode=autoplay_disabled"
      - "GET /v1/netusb/getListInfo?input=usb&index=0&size=8&lang=en"
      - "GET /v1/netusb/setListControl?list_id=main&type=select&index={folder_index}"
      - "GET /v1/netusb/getListInfo?input=usb&index={offset}&size=8&lang=en  (page as needed; index must be multiple of 8)"
      - "GET /v1/netusb/setListControl?list_id=main&type=play&index={file_index}"
    notes: "getListInfo blocks all other commands; may take up to 30 seconds."
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "setInput: MusicCast CONTROLLER calls prepareInputChange before issuing input change for the about-to-be-selected input."
  - "tuner recallPreset / switchPreset: caller must switch target zone input to Tuner first (per switchPreset source note)."
# UNRESOLVED: source contains no explicit safety warnings, power-on sequencing
# requirements, or interlock procedures beyond the input-change prep hint.
```

## Notes
- **Source document:** Yamaha Extended Control API Specification (Basic), Rev. 1.00. Generic MusicCast/YXC spec; does not name WX-051. Recovery notes confirm the WX-051 implements YXC over IP.
- **API versioning:** URIs carry `v1` (or `v2` etc.). Backward compatibility is guaranteed unless specified; a device supports all API versions ≤ the value returned by `getDeviceInfo` (`api_version`).
- **Feature discovery is mandatory:** per-device zone count, input list, sound program list, volume/tone ranges, tuner bands, and netusb functions are ONLY available at runtime via `/system/getFeatures`. Do not hard-code the example values from the spec.
- **Zone mapping:** Zone A = `main`, Zone B = `zone2`. A device without zones reports `zone_num: 1`.
- **Events:** UDP unicast to client port declared via `X-AppPort`. 10-minute idle timeout; refreshed by any YXC request from the same client IP.
- **getListInfo blocking:** may take up to 30 s; all other commands are rejected during the fetch.
- **Rhapsody → Napster rename:** source notes the `rhapsody` Input ID is being renamed to `napster`.

<!-- UNRESOLVED: WX-051-specific feature subset not stated in source (must be read from /system/getFeatures on a live device). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: HTTP port not stated (an example device description shows :80 but it is not normative). -->
<!-- UNRESOLVED: YXC Advanced spec (MusicCast link, distribution, advanced sound params) not sourced — tone_control/equalizer/balance/dialogue/subwoofer setters absent from this Basic spec. -->
<!-- UNRESOLVED: first-party Yamaha URL for this PDF not found; source was a third-party GitHub rehost of the Yamaha-authored PDF (per recovery memo). -->
````

Spec emitted. 41 actions covering system/zone/tuner/netusb/CD. UDP events section. Macros from app note 12.1. Transport http + auth none inferred. Port unresolved. WX-051-specific features deferred to runtime getFeatures.

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
  - community-openhab-org.s3-eu-central-1.amazonaws.com
  - community.symcon.de
  - github.com
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://github.com/rsc-dev/pyamaha
  - https://github.com/opctim/yamaha-extended-control-openapi
retrieved_at: 2026-06-15T12:44:45.849Z
last_checked_at: 2026-06-16T07:19:53.970Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:19:53.970Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec actions map one-to-one to documented YXC v1 endpoints in the source; transport base URL is verbatim; port is correctly left null/unresolved as the source gives only a non-normative example. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic YXC Basic spec, not a WX-051-specific document. Exact feature subset, zone count, input list, and sound program list for WX-051 are only knowable via /system/getFeatures on a live device. HTTP port not stated. Firmware compatibility not stated."
- "port number not stated in source (an example device description shows :80, not normative)"
- "per-device available feedback fields are only knowable at runtime via getStatus/getFeatures on a live WX-051."
- "discrete setToneControl endpoint not documented in this Basic spec"
- "tone_control, equalizer, balance, dialogue_level, dialogue_lift, subwoofer_volume, clear_voice, enhancer, pure_direct, direct, link_control, link_audio_delay are listed in getFeatures/getStatus but no discrete setter endpoints appear in this Basic spec. Populate if/when the YXC Advanced spec is sourced."
- "source contains no explicit safety warnings, power-on sequencing"
- "WX-051-specific feature subset not stated in source (must be read from /system/getFeatures on a live device)."
- "firmware version compatibility not stated."
- "HTTP port not stated (an example device description shows :80 but it is not normative)."
- "YXC Advanced spec (MusicCast link, distribution, advanced sound params) not sourced — tone_control/equalizer/balance/dialogue/subwoofer setters absent from this Basic spec."
- "first-party Yamaha URL for this PDF not found; source was a third-party GitHub rehost of the Yamaha-authored PDF (per recovery memo)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
