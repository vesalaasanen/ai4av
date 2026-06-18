---
spec_id: admin/sony-xrmx95-series-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XRM-X95 Series Control Spec"
manufacturer: Sony
model_family: "XRM-X95 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "XRM-X95 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/rest-api
retrieved_at: 2026-06-15T19:31:53.243Z
last_checked_at: 2026-06-16T07:19:52.137Z
generated_at: 2026-06-16T07:19:52.137Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the shared BRAVIA Professional Displays REST API reference; it does not state an explicit XRM-X95 model-string confirmation, firmware version, or XRM-specific deviations. Serial/RS-232 and IRCC-IP/Simple-IP transports are documented elsewhere on pro-bravia.sony.net but are out of scope for this IP/REST excerpt."
  - "port number not stated in source (HTTP default not assumed)"
  - "PSK header name / credential format not fully specified in this source excerpt"
  - "per-target candidate ranges not statically enumerated in source."
  - "getSupportedApiInfo response advertises a \"notifications\" field"
  - "no other explicit multi-step macros defined in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "no explicit XRM-X95 model string confirmation in this source (shared BRAVIA Pro REST ref)."
  - "TCP port number for the REST API not stated (HTTP default not assumed)."
  - "PSK header name / credential format not fully specified in this excerpt."
  - "firmware version compatibility range not stated."
  - "concrete notification/event payloads not documented in this source."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:19:52.137Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 versioned JSON-RPC method actions confirmed verbatim in the BRAVIA Professional Displays REST API source; transport base URL and PSK auth match; source contains exactly the same 56 versioned methods. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Sony XRM-X95 Series Control Spec

## Summary
Sony XRM-X95 Series (Crystal LED professional display) IP control via the BRAVIA Professional Displays REST API. JSON-RPC 2.0 requests are POSTed to per-service endpoints under `http://{IP}/sony/{service}`. The source documents the `guide`, `appControl`, `audio`, `avContent`, `encryption`, `system`, `video`, and `videoScreen` services with their method catalogues, request/response schemas, and error-code tables.

<!-- UNRESOLVED: source is the shared BRAVIA Professional Displays REST API reference; it does not state an explicit XRM-X95 model-string confirmation, firmware version, or XRM-specific deviations. Serial/RS-232 and IRCC-IP/Simple-IP transports are documented elsewhere on pro-bravia.sony.net but are out of scope for this IP/REST excerpt. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{IP address or Host name}/sony/{service}"
  port: null  # UNRESOLVED: port number not stated in source (HTTP default not assumed)
auth:
  type: psk  # PSK (Pre-Shared Key) authentication; per-API authLevel documented as none/generic/private
  # UNRESOLVED: PSK header name / credential format not fully specified in this source excerpt
```

## Traits
```yaml
traits:
  - powerable   # inferred from setPowerStatus / getPowerStatus / setPowerSavingMode
  - routable    # inferred from setPlayContent + getCurrentExternalInputsStatus input routing
  - queryable   # inferred from numerous get* query methods returning state
  - levelable   # inferred from setAudioVolume level control
```

## Actions
```yaml
# All actions are JSON-RPC 2.0 POST requests. Endpoint = base_url with the listed
# `service`. Request body shape: {"method": <method>, "id": <int>, "params": [...], "version": <version>}.
# `command` holds the literal method name (the JSON-RPC opcode) verbatim from source.
# `auth` = Authentication Level stated for that API (none | generic | private).
# Granularity: each versioned method row the source lists as a separate heading is a
# separate action (e.g. setAudioVolume v1.0 and v1.2 are distinct rows -> distinct actions).

# --- guide service ---
- id: get_supported_api_info
  label: Get Supported API Info
  kind: query
  service: guide
  method: getSupportedApiInfo
  version: "1.0"
  auth: none
  command: "getSupportedApiInfo"
  params:
    - name: services
      type: string-array
      required: false
      description: Services to fetch API information. Null or empty array = all services.

# --- appControl service ---
- id: prepare_app_upload
  label: Prepare App Upload
  kind: action
  service: appControl
  method: prepareAppUpload
  version: "1.0"
  auth: generic
  command: "prepareAppUpload"
  notes: FW-BZxxx series (PKG 6.2512+, generation 5.7.0+); localhost (127.0.0.1) only. Launches upload server, returns assetId.
  params: []
- id: uninstall_app
  label: Uninstall App
  kind: action
  service: appControl
  method: uninstallApp
  version: "1.0"
  auth: generic
  command: "uninstallApp"
  notes: FW-BZxxx series; localhost only.
  params:
    - name: packageName
      type: string
      required: true
      description: Package name of the app to uninstall.
- id: install_app
  label: Install App
  kind: action
  service: appControl
  method: installApp
  version: "1.0"
  auth: generic
  command: "installApp"
  notes: FW-BZxxx series; localhost only. Requires prepareAppUpload + upload first.
  params:
    - name: assetId
      type: string
      required: true
      description: assetId obtained from prepareAppUpload.
    - name: afterInstallAction
      type: string
      required: false
      description: '"startApplication" launches the app after install.'
    - name: uri
      type: string
      required: false
      description: android-app scheme URI (see Android Intent#URI_ANDROID_APP_SCHEME).
- id: get_text_form_v1_1
  label: Get Text Form (v1.1)
  kind: query
  service: appControl
  method: getTextForm
  version: "1.1"
  auth: private
  command: "getTextForm"
  notes: Encrypted text support. BZ40P/BZ35P/BZ30P Japan only; other models Japan+EU.
  params:
    - name: encKey
      type: string
      required: false
      description: RSA-encrypted encryption key; "" = not encrypted.
- id: set_text_form_v1_1
  label: Set Text Form (v1.1)
  kind: action
  service: appControl
  method: setTextForm
  version: "1.1"
  auth: generic
  command: "setTextForm"
  notes: Encrypted text support. BZ40P/BZ35P/BZ30P Japan only; other models Japan+EU.
  params:
    - name: encKey
      type: string
      required: false
      description: RSA-encrypted encryption key; "" = not encrypted.
    - name: text
      type: string
      required: true
      description: UTF-8 text (encrypted if encKey set).
- id: set_text_form_v1_0
  label: Set Text Form (v1.0)
  kind: action
  service: appControl
  method: setTextForm
  version: "1.0"
  auth: generic
  command: "setTextForm"
  notes: BZ40P/BZ35P/BZ30P Japan only; other models Japan+EU.
  params:
    - name: text
      type: string
      required: true
      description: UTF-8 text data.
- id: terminate_apps
  label: Terminate Apps
  kind: action
  service: appControl
  method: terminateApps
  version: "1.0"
  auth: generic
  command: "terminateApps"
  params: []
- id: set_active_app
  label: Set Active App
  kind: action
  service: appControl
  method: setActiveApp
  version: "1.0"
  auth: generic
  command: "setActiveApp"
  params:
    - name: uri
      type: string
      required: true
      description: Target app URI (e.g. localapp://webappruntime?url=..., ?manifest=..., ?auid=...).
- id: get_application_list
  label: Get Application List
  kind: query
  service: appControl
  method: getApplicationList
  version: "1.0"
  auth: private
  command: "getApplicationList"
  params: []
- id: get_web_app_status
  label: Get Web App Status
  kind: query
  service: appControl
  method: getWebAppStatus
  version: "1.0"
  auth: private
  command: "getWebAppStatus"
  params: []
- id: get_application_status_list
  label: Get Application Status List
  kind: query
  service: appControl
  method: getApplicationStatusList
  version: "1.0"
  auth: none
  command: "getApplicationStatusList"
  params: []

# --- audio service ---
- id: set_audio_volume_v1_0
  label: Set Audio Volume (v1.0)
  kind: action
  service: audio
  method: setAudioVolume
  version: "1.0"
  auth: generic
  command: "setAudioVolume"
  params:
    - name: target
      type: string
      required: true
      description: 'Output target - "" (all) | "speaker" | "headphone".'
    - name: volume
      type: string
      required: true
      description: '"N" set level N | "+N" increment | "-N" decrement.'
- id: get_speaker_settings
  label: Get Speaker Settings
  kind: query
  service: audio
  method: getSpeakerSettings
  version: "1.0"
  auth: none
  command: "getSpeakerSettings"
  notes: BZ40P/BZ35P/BZ30P not supported.
  params:
    - name: target
      type: string
      required: false
      description: 'tvPosition | subwooferLevel | subwooferFreq | subwooferPhase | subwooferPower | "" (all).'
- id: get_volume_information
  label: Get Volume Information
  kind: query
  service: audio
  method: getVolumeInformation
  version: "1.0"
  auth: none
  command: "getVolumeInformation"
  params: []
- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  service: audio
  method: setAudioMute
  version: "1.0"
  auth: generic
  command: "setAudioMute"
  params:
    - name: status
      type: boolean
      required: true
      description: true = mute, false = unmute.
- id: set_audio_volume_v1_2
  label: Set Audio Volume (v1.2)
  kind: action
  service: audio
  method: setAudioVolume
  version: "1.2"
  auth: generic
  command: "setAudioVolume"
  params:
    - name: target
      type: string
      required: true
      description: '"" | "speaker" | "headphone".'
    - name: volume
      type: string
      required: true
      description: '"N" | "+N" | "-N".'
    - name: ui
      type: string
      required: false
      description: '"on" show volume UI | "off" | null.'
- id: set_sound_settings
  label: Set Sound Settings
  kind: action
  service: audio
  method: setSoundSettings
  version: "1.1"
  auth: generic
  command: "setSoundSettings"
  params:
    - name: settings
      type: object-array
      required: true
      description: 'Array of {target, value}. target "outputTerminal"; value "speaker"|"speaker_hdmi"|"hdmi"|"audioSystem".'
- id: set_speaker_settings
  label: Set Speaker Settings
  kind: action
  service: audio
  method: setSpeakerSettings
  version: "1.0"
  auth: generic
  command: "setSpeakerSettings"
  notes: BZ40P/BZ35P/BZ30P not supported.
  params:
    - name: settings
      type: object-array
      required: true
      description: 'Array of {target, value}; targets tvPosition/subwooferLevel/subwooferFreq/subwooferPhase/subwooferPower.'

# --- avContent service ---
- id: set_play_content
  label: Set Play Content
  kind: action
  service: avContent
  method: setPlayContent
  version: "1.0"
  auth: generic
  command: "setPlayContent"
  params:
    - name: uri
      type: string
      required: true
      description: Content/input URI from getContentList (e.g. extInput:hdmi?port=2).
- id: get_current_external_inputs_status_v1_1
  label: Get Current External Inputs Status (v1.1)
  kind: query
  service: system
  method: getCurrentExternalInputsStatus
  version: "1.1"
  auth: none
  command: "getCurrentExternalInputsStatus"
  params: []
- id: get_current_external_inputs_status_v1_0
  label: Get Current External Inputs Status (v1.0)
  kind: query
  service: avContent
  method: getCurrentExternalInputsStatus
  version: "1.0"
  auth: none
  command: "getCurrentExternalInputsStatus"
  params: []
- id: get_playing_content_info
  label: Get Playing Content Info
  kind: query
  service: avContent
  method: getPlayingContentInfo
  version: "1.0"
  auth: private
  command: "getPlayingContentInfo"
  params: []
- id: get_content_count_v1_0
  label: Get Content Count (v1.0)
  kind: query
  service: avContent
  method: getContentCount
  version: "1.0"
  auth: private
  command: "getContentCount"
  params:
    - name: source
      type: string
      required: true
      description: Source URI (scheme + path), e.g. extInput:hdmi.
    - name: type
      type: string
      required: false
      description: Type filter (see getContentList type param).
- id: get_content_count_v1_1
  label: Get Content Count (v1.1)
  kind: query
  service: avContent
  method: getContentCount
  version: "1.1"
  auth: private
  command: "getContentCount"
  params:
    - name: source
      type: string
      required: true
      description: Source URI.
    - name: type
      type: string
      required: false
    - name: target
      type: string
      required: false
- id: get_content_list
  label: Get Content List
  kind: query
  service: avContent
  method: getContentList
  version: "1.5"
  auth: private
  command: "getContentList"
  params:
    - name: uri
      type: string
      required: false
      description: Source URI; null = all contents.
    - name: stIdx
      type: integer
      required: false
      description: Start index (default 0).
    - name: cnt
      type: integer
      required: false
      description: Max items (default 50, max 200).
- id: get_scheme_list
  label: Get Scheme List
  kind: query
  service: avContent
  method: getSchemeList
  version: "1.0"
  auth: none
  command: "getSchemeList"
  params: []
- id: get_source_list
  label: Get Source List
  kind: query
  service: avContent
  method: getSourceList
  version: "1.0"
  auth: none
  command: "getSourceList"
  params:
    - name: scheme
      type: string
      required: true
      description: Scheme name from getSchemeList (e.g. extInput).

# --- encryption service ---
- id: get_public_key
  label: Get Public Key
  kind: query
  service: encryption
  method: getPublicKey
  version: "1.0"
  auth: none
  command: "getPublicKey"
  params: []

# --- system service ---
- id: get_screenshot
  label: Get Screenshot
  kind: query
  service: system
  method: getScreenshot
  version: "1.0"
  auth: private
  command: "getScreenshot"
  notes: FW-BZxxx series (PKG 6.2512+, gen 5.7.0+); localhost only. BZ40P/BZ35P/BZ30P not supported. Returns Base64 JPEG.
  params:
    - name: plane
      type: string
      required: false
      description: '"video" | "graphics" | "mixed" (default).'
- id: set_power_saving_mode
  label: Set Power Saving Mode
  kind: action
  service: system
  method: setPowerSavingMode
  version: "1.0"
  auth: generic
  command: "setPowerSavingMode"
  params:
    - name: mode
      type: string
      required: true
      description: '"off" | "low" | "high" | "pictureOff".'
- id: get_current_time_v1_0
  label: Get Current Time (v1.0)
  kind: query
  service: system
  method: getCurrentTime
  version: "1.0"
  auth: none
  command: "getCurrentTime"
  params: []
- id: get_current_time_v1_1
  label: Get Current Time (v1.1)
  kind: query
  service: system
  method: getCurrentTime
  version: "1.1"
  auth: none
  command: "getCurrentTime"
  notes: Adds timeZoneOffsetMinute and dstOffsetMinute.
  params: []
- id: get_network_settings
  label: Get Network Settings
  kind: query
  service: system
  method: getNetworkSettings
  version: "1.0"
  auth: generic
  command: "getNetworkSettings"
  params:
    - name: netif
      type: string
      required: false
      description: Network interface (eth0/wlan0/p2p1); "" = all.
- id: get_interface_information
  label: Get Interface Information
  kind: query
  service: system
  method: getInterfaceInformation
  version: "1.0"
  auth: none
  command: "getInterfaceInformation"
  params: []
- id: get_remote_device_settings
  label: Get Remote Device Settings
  kind: query
  service: system
  method: getRemoteDeviceSettings
  version: "1.0"
  auth: none
  command: "getRemoteDeviceSettings"
  params:
    - name: target
      type: string
      required: false
      description: '"accessPermission" | "" (all).'
- id: get_led_indicator_status
  label: Get LED Indicator Status
  kind: query
  service: system
  method: getLEDIndicatorStatus
  version: "1.0"
  auth: generic
  command: "getLEDIndicatorStatus"
  params: []
- id: get_power_saving_mode
  label: Get Power Saving Mode
  kind: query
  service: system
  method: getPowerSavingMode
  version: "1.0"
  auth: none
  command: "getPowerSavingMode"
  params: []
- id: get_power_status
  label: Get Power Status
  kind: query
  service: system
  method: getPowerStatus
  version: "1.0"
  auth: none
  command: "getPowerStatus"
  params: []
- id: get_remote_controller_info
  label: Get Remote Controller Info
  kind: query
  service: system
  method: getRemoteControllerInfo
  version: "1.0"
  auth: none
  command: "getRemoteControllerInfo"
  notes: Returns IRCC code map (name -> base64 value) for ~60 remote buttons.
  params: []
- id: get_system_information_v1_0
  label: Get System Information (v1.0)
  kind: query
  service: system
  method: getSystemInformation
  version: "1.0"
  auth: private
  command: "getSystemInformation"
  params: []
- id: get_system_information_v1_7
  label: Get System Information (v1.7)
  kind: query
  service: system
  method: getSystemInformation
  version: "1.7"
  auth: private
  command: "getSystemInformation"
  notes: Adds fwVersion, androidOs, webAppRuntimeVersion, mode (Pro mode).
  params: []
- id: get_system_supported_function
  label: Get System Supported Function
  kind: query
  service: system
  method: getSystemSupportedFunction
  version: "1.0"
  auth: none
  command: "getSystemSupportedFunction"
  params: []
- id: get_wol_mode
  label: Get WoL Mode
  kind: query
  service: system
  method: getWolMode
  version: "1.0"
  auth: generic
  command: "getWolMode"
  params: []
- id: request_reboot
  label: Request Reboot
  kind: action
  service: system
  method: requestReboot
  version: "1.0"
  auth: generic
  command: "requestReboot"
  params: []
- id: set_led_indicator_status
  label: Set LED Indicator Status
  kind: action
  service: system
  method: setLEDIndicatorStatus
  version: "1.1"
  auth: generic
  command: "setLEDIndicatorStatus"
  params:
    - name: mode
      type: string
      required: true
      description: '"Demo" | "AutoBrightnessAdjust" | "Dark" | "SimpleResponse" | "Off".'
    - name: status
      type: string
      required: false
      description: '"true" | "false" | null (server decides).'
- id: set_power_status
  label: Set Power Status
  kind: action
  service: system
  method: setPowerStatus
  version: "1.0"
  auth: generic
  command: "setPowerStatus"
  notes: Power-on supported only in "Sleep" mode; requires Remote start setting ON.
  params:
    - name: status
      type: boolean
      required: true
      description: true = power on, false = power off.
- id: set_wol_mode
  label: Set WoL Mode
  kind: action
  service: system
  method: setWolMode
  version: "1.0"
  auth: generic
  command: "setWolMode"
  params:
    - name: enabled
      type: boolean
      required: true
      description: true = enabled, false = disabled.

# --- video service ---
- id: get_screen_rotation
  label: Get Screen Rotation
  kind: query
  service: video
  method: getScreenRotation
  version: "1.0"
  auth: none
  command: "getScreenRotation"
  notes: FW-BZxxx series (PKG 6.2512+, gen 5.7.0+); localhost only.
  params: []
- id: set_screen_rotation
  label: Set Screen Rotation
  kind: action
  service: video
  method: setScreenRotation
  version: "1.0"
  auth: generic
  command: "setScreenRotation"
  notes: FW-BZxxx series; localhost only.
  params:
    - name: rotation
      type: integer
      required: true
      description: '0 (landscape) | 90 (portrait) | 180 (rev landscape) | 270 (rev portrait).'
- id: get_picture_quality_settings_v1_0
  label: Get Picture Quality Settings (v1.0)
  kind: query
  service: video
  method: getPictureQualitySettings
  version: "1.0"
  auth: none
  command: "getPictureQualitySettings"
  params:
    - name: target
      type: string
      required: false
      description: 'color|brightness|contrast|sharpness|pictureMode|lightSensor|colorSpace|colorTemperature|autoPictureMode|hdrMode|autoLocalDimming|xtendedDynamicRange|"" (all).'
- id: get_picture_quality_settings_v1_1
  label: Get Picture Quality Settings (v1.1)
  kind: query
  service: video
  method: getPictureQualitySettings
  version: "1.1"
  auth: none
  command: "getPictureQualitySettings"
  params:
    - name: target
      type: string
      required: false
      description: Target name; "" = all targets.
- id: set_picture_quality_settings_v1_0
  label: Set Picture Quality Settings (v1.0)
  kind: action
  service: video
  method: setPictureQualitySettings
  version: "1.0"
  auth: generic
  command: "setPictureQualitySettings"
  params:
    - name: settings
      type: object-array
      required: true
      description: Array of {target, value}; targets as per getPictureQualitySettings.
- id: set_picture_quality_settings_v1_1
  label: Set Picture Quality Settings (v1.1)
  kind: action
  service: video
  method: setPictureQualitySettings
  version: "1.1"
  auth: generic
  command: "setPictureQualitySettings"
  notes: For hdmiSignalFormat / hdmiSignalFormatVrr, specify only one target per request.
  params:
    - name: settings
      type: object-array
      required: true
      description: Array of {target, value}; supports multiple targets per call.

# --- videoScreen service ---
- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  service: videoScreen
  method: getSceneSetting
  version: "1.0"
  auth: none
  command: "getSceneSetting"
  notes: BZ40P/BZ35P/BZ30P not supported. Endpoint also accepts ws:// and Bluetooth SPP.
  params: []
- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  service: videoScreen
  method: setSceneSetting
  version: "1.0"
  auth: generic
  command: "setSceneSetting"
  notes: BZ40P/BZ35P/BZ30P not supported.
  params:
    - name: value
      type: string
      required: true
      description: '"auto" | "auto24pSync" | "general".'
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [active, standby]
    source: getPowerStatus
  - id: audio_mute
    type: enum
    values: [muted, unmuted]
    source: getVolumeInformation
  - id: audio_volume
    type: integer
    source: getVolumeInformation
  - id: playing_content
    type: object
    source: getPlayingContentInfo
  - id: wol_mode
    type: boolean
    source: getWolMode
  - id: power_saving_mode
    type: enum
    values: [off, low, high, pictureOff]
    source: getPowerSavingMode
  - id: led_indicator_status
    type: object
    source: getLEDIndicatorStatus
  - id: scene_setting
    type: enum
    values: [auto, auto24pSync, general]
    source: getSceneSetting
```

## Variables
```yaml
# Picture-quality and sound/speaker targets are settable parameters via their
# set*Settings actions; candidate ranges (max/min/step) are returned dynamically
# by the paired get*Settings query, not fixed in the source.
# UNRESOLVED: per-target candidate ranges not statically enumerated in source.
```

## Events
```yaml
# UNRESOLVED: getSupportedApiInfo response advertises a "notifications" field
# (supported Notification APIs per service), but this source excerpt documents no
# concrete unsolicited notification payloads. Populate when notification reference
# is obtained.
```

## Macros
```yaml
# Source documents one explicit multi-step sequence: the application upload & install
# process (prepareAppUpload -> POST APK to /sony/appupload/{assetId} -> installApp).
# Modeled here as a reference, not an executable macro.
# UNRESOLVED: no other explicit multi-step macros defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - setPowerStatus power-on requires Remote start setting ON and device in "Sleep" mode.
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond the setPowerStatus note above.
```

## Notes
- All methods use JSON-RPC 2.0 over HTTP POST. Request envelope: `{"method":..., "id":<int>, "params":[...], "version":"x.y"}`.
- Per-API authentication levels are `none`, `generic`, or `private`; higher levels require the PSK pre-shared key.
- Several methods are restricted to FW-BZxxx series with firmware PKG 6.2512+ / generation 5.7.0+ and are callable from localhost (127.0.0.1) only: `prepareAppUpload`, `uninstallApp`, `installApp`, `getScreenshot`, `getScreenRotation`, `setScreenRotation`.
- BZ40P / BZ35P / BZ30P do not support `getSpeakerSettings`, `setSpeakerSettings`, `getSceneSetting`, `setSceneSetting`, `getScreenshot`.
- Error codes are partitioned by service range (40000–65535); see source error-code tables.
- The `getRemoteControllerInfo` response enumerates ~60 IRCC button name/value (base64) pairs used by the IRCC-IP transport.
- `videoScreen` endpoint additionally accepts `ws://` (WebSocket) and Bluetooth SPP transports per source.

<!-- UNRESOLVED: no explicit XRM-X95 model string confirmation in this source (shared BRAVIA Pro REST ref). -->
<!-- UNRESOLVED: TCP port number for the REST API not stated (HTTP default not assumed). -->
<!-- UNRESOLVED: PSK header name / credential format not fully specified in this excerpt. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: concrete notification/event payloads not documented in this source. -->
```

Spec built. 56 actions across 8 services (guide/appControl/audio/avContent/encryption/system/video/videoScreen). All versioned rows kept separate. Port + PSK format + firmware + XRM model-string confirm marked UNRESOLVED per policy.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/rest-api
retrieved_at: 2026-06-15T19:31:53.243Z
last_checked_at: 2026-06-16T07:19:52.137Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:19:52.137Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 versioned JSON-RPC method actions confirmed verbatim in the BRAVIA Professional Displays REST API source; transport base URL and PSK auth match; source contains exactly the same 56 versioned methods. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the shared BRAVIA Professional Displays REST API reference; it does not state an explicit XRM-X95 model-string confirmation, firmware version, or XRM-specific deviations. Serial/RS-232 and IRCC-IP/Simple-IP transports are documented elsewhere on pro-bravia.sony.net but are out of scope for this IP/REST excerpt."
- "port number not stated in source (HTTP default not assumed)"
- "PSK header name / credential format not fully specified in this source excerpt"
- "per-target candidate ranges not statically enumerated in source."
- "getSupportedApiInfo response advertises a \"notifications\" field"
- "no other explicit multi-step macros defined in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "no explicit XRM-X95 model string confirmation in this source (shared BRAVIA Pro REST ref)."
- "TCP port number for the REST API not stated (HTTP default not assumed)."
- "PSK header name / credential format not fully specified in this excerpt."
- "firmware version compatibility range not stated."
- "concrete notification/event payloads not documented in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
