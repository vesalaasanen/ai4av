---
spec_id: admin/sony-kdx9300-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX9300 Series Control Spec"
manufacturer: Sony
model_family: "KDX9300 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX9300 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-31T22:40:37.732Z
generated_at: 2026-05-31T22:40:37.732Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:40:37.732Z
  matched_actions: 47
  action_count: 47
  confidence: high
  summary: "All 47 spec actions match verbatim JSON-RPC method names in the source with correct shapes and parameters; transport base_url and PSK auth confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sony KDX9300 Series Control Spec

## Summary
Sony BRAVIA Professional Display (KDX9300 Series) controlled via JSON-RPC over HTTP REST API. Services: guide, appControl, audio, avContent, encryption, system, video, videoScreen. Authentication uses Pre-Shared Key (PSK) at three levels: none, generic, private.

<!-- UNRESOLVED: port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{ip}/sony"
  # port: null  # UNRESOLVED: port number not stated in source
auth:
  type: psk
  description: "Pre-Shared Key sent in HTTP POST header. Three auth levels per API: none, generic, private."
```

## Traits
```yaml
traits:
  - powerable    # setPowerStatus, getPowerStatus present
  - queryable    # numerous get* query methods present
  - routable     # setPlayContent, getCurrentExternalInputsStatus, getContentList present
  - levelable    # setAudioVolume, setPictureQualitySettings present
```

## Actions
```yaml
actions:
  # ── guide service ──
  - id: getSupportedApiInfo
    label: Get Supported API Info
    kind: query
    service: guide
    description: "Returns supported services and API information for initialization."
    params:
      - name: services
        type: string-array
        required: false
        description: "Services to fetch API info for. Null/empty = all services."
    versions: ["1.0"]
    auth_level: none

  # ── appControl service ──
  - id: prepareAppUpload
    label: Prepare App Upload
    kind: action
    service: appControl
    description: "Launch upload server and return assetId for APK upload. Localhost only."
    params: []
    versions: ["1.0"]
    auth_level: generic

  - id: uninstallApp
    label: Uninstall App
    kind: action
    service: appControl
    description: "Uninstall application by package name. Localhost only."
    params:
      - name: packageName
        type: string
        required: true
        description: "Package name to uninstall."
    versions: ["1.0"]
    auth_level: generic

  - id: installApp
    label: Install App
    kind: action
    service: appControl
    description: "Install application from uploaded APK. Localhost only."
    params:
      - name: assetId
        type: string
        required: true
        description: "Asset ID from prepareAppUpload."
      - name: afterInstallAction
        type: string
        required: false
        description: "Action after install, e.g. 'startApplication'."
      - name: uri
        type: string
        required: false
        description: "Android-app scheme URI for post-install launch."
    versions: ["1.0"]
    auth_level: generic

  - id: setTextForm
    label: Set Text Form
    kind: action
    service: appControl
    description: "Input text on software keyboard field. v1.1 supports encrypted text via encKey."
    params:
      - name: text
        type: string
        required: true
        description: "Text data (UTF8). Encrypted if encKey set."
      - name: encKey
        type: string
        required: false
        description: "Encryption key encrypted by public key. v1.1 only."
    versions: ["1.0", "1.1"]
    auth_level: generic

  - id: terminateApps
    label: Terminate Apps
    kind: action
    service: appControl
    description: "Terminate all running applications."
    params: []
    versions: ["1.0"]
    auth_level: generic

  - id: setActiveApp
    label: Set Active App
    kind: action
    service: appControl
    description: "Launch application by URI."
    params:
      - name: uri
        type: string
        required: true
        description: "App URI, e.g. 'localapp://webappruntime?url=...'."
    versions: ["1.0"]
    auth_level: generic

  - id: getApplicationList
    label: Get Application List
    kind: query
    service: appControl
    description: "List applications launchable by setActiveApp."
    params: []
    versions: ["1.0"]
    auth_level: private

  - id: getWebAppStatus
    label: Get Web App Status
    kind: query
    service: appControl
    description: "Retrieve WebAppRuntime status and current URL."
    params: []
    versions: ["1.0"]
    auth_level: private

  - id: getApplicationStatusList
    label: Get Application Status List
    kind: query
    service: appControl
    description: "Status of textInput, cursorDisplay, webBrowse applications."
    params: []
    versions: ["1.0"]
    auth_level: none

  - id: getTextForm
    label: Get Text Form
    kind: query
    service: appControl
    description: "Get current text input on software keyboard. v1.1 supports encryption."
    params:
      - name: encKey
        type: string
        required: false
        description: "Encryption key. v1.1 only."
    versions: ["1.1"]
    auth_level: private

  # ── audio service ──
  - id: setAudioVolume
    label: Set Audio Volume
    kind: action
    service: audio
    description: "Set audio volume level. Supports absolute (N), relative (+N, -N). v1.2 adds ui param."
    params:
      - name: target
        type: string
        required: true
        description: "Output target: '', 'speaker', 'headphone'."
      - name: volume
        type: string
        required: true
        description: "Volume: 'N' absolute, '+N' increase, '-N' decrease."
      - name: ui
        type: string
        required: false
        description: "Show volume UI: 'on', 'off'. v1.2 only."
    versions: ["1.0", "1.2"]
    auth_level: generic

  - id: getSpeakerSettings
    label: Get Speaker Settings
    kind: query
    service: audio
    description: "Current and supported speaker configuration settings."
    params:
      - name: target
        type: string
        required: false
        description: "Target: '', 'tvPosition', 'subwooferLevel', 'subwooferFreq', 'subwooferPhase', 'subwooferPower'."
    versions: ["1.0"]
    auth_level: none

  - id: getVolumeInformation
    label: Get Volume Information
    kind: query
    service: audio
    description: "Volume level and mute status per output target."
    params: []
    versions: ["1.0"]
    auth_level: none

  - id: setAudioMute
    label: Set Audio Mute
    kind: action
    service: audio
    description: "Set mute status."
    params:
      - name: status
        type: boolean
        required: true
        description: "true=mute, false=unmute."
    versions: ["1.0"]
    auth_level: generic

  - id: setSoundSettings
    label: Set Sound Settings
    kind: action
    service: audio
    description: "Change sound settings like output terminal."
    params:
      - name: settings
        type: object-array
        required: true
        description: "Array of target/value pairs. target 'outputTerminal': 'speaker', 'speaker_hdmi', 'hdmi', 'audioSystem'."
    versions: ["1.1"]
    auth_level: generic

  - id: setSpeakerSettings
    label: Set Speaker Settings
    kind: action
    service: audio
    description: "Change speaker settings (tvPosition, subwooferLevel, subwooferFreq, subwooferPhase, subwooferPower)."
    params:
      - name: settings
        type: object-array
        required: true
        description: "Array of target/value pairs for speaker configuration."
    versions: ["1.0"]
    auth_level: generic

  # ── avContent service ──
  - id: setPlayContent
    label: Set Play Content
    kind: action
    service: avContent
    description: "Play content specified by URI (e.g. switch to HDMI input)."
    params:
      - name: uri
        type: string
        required: true
        description: "Content URI, e.g. 'extInput:hdmi?port=2'."
    versions: ["1.0"]
    auth_level: generic

  - id: getCurrentExternalInputsStatus
    label: Get Current External Inputs Status
    kind: query
    service: avContent
    description: "Status of all external input sources (connection, label, icon, signal). v1.1 adds 'status' field."
    params: []
    versions: ["1.0", "1.1"]
    auth_level: none

  - id: getPlayingContentInfo
    label: Get Playing Content Info
    kind: query
    service: avContent
    description: "Currently playing content or selected input info."
    params: []
    versions: ["1.0"]
    auth_level: private

  - id: getContentCount
    label: Get Content Count
    kind: query
    service: avContent
    description: "Count of contents in a source. v1.1 adds 'target' param."
    params:
      - name: source
        type: string
        required: true
        description: "Source URI, e.g. 'extInput:hdmi'."
      - name: type
        type: string
        required: false
        description: "Content type filter."
      - name: target
        type: string
        required: false
        description: "Target filter. v1.1 only."
    versions: ["1.0", "1.1"]
    auth_level: private

  - id: getContentList
    label: Get Content List
    kind: query
    service: avContent
    description: "List contents under URI. Supports pagination via stIdx/cnt."
    params:
      - name: uri
        type: string
        required: false
        description: "Content URI. Null=all supported."
      - name: stIdx
        type: integer
        required: false
        description: "Start index for pagination. Default 0."
      - name: cnt
        type: integer
        required: false
        description: "Max items to return. Default 50, max 200."
    versions: ["1.5"]
    auth_level: private

  - id: getSchemeList
    label: Get Scheme List
    kind: query
    service: avContent
    description: "List URI schemes the device can handle."
    params: []
    versions: ["1.0"]
    auth_level: none

  - id: getSourceList
    label: Get Source List
    kind: query
    service: avContent
    description: "List sources within a scheme."
    params:
      - name: scheme
        type: string
        required: true
        description: "Scheme name, e.g. 'extInput'."
    versions: ["1.0"]
    auth_level: none

  # ── encryption service ──
  - id: getPublicKey
    label: Get Public Key
    kind: query
    service: encryption
    description: "Request RSA public key for encrypted text transmission."
    params: []
    versions: ["1.0"]
    auth_level: none

  # ── system service ──
  - id: getScreenshot
    label: Get Screenshot
    kind: query
    service: system
    description: "Capture screenshot, returns 320x180 Base64 JPEG. Localhost only."
    params:
      - name: plane
        type: string
        required: false
        description: "Target plane: 'video', 'graphics', 'mixed'. Default 'mixed'."
    versions: ["1.0"]
    auth_level: private

  - id: setPowerSavingMode
    label: Set Power Saving Mode
    kind: action
    service: system
    description: "Change power saving mode."
    params:
      - name: mode
        type: string
        required: true
        description: "Mode: 'off', 'low', 'high', 'pictureOff'."
    versions: ["1.0"]
    auth_level: generic

  - id: getCurrentTime
    label: Get Current Time
    kind: query
    service: system
    description: "Device current time (ISO8601). v1.1 adds timezone and DST offset."
    params: []
    versions: ["1.0", "1.1"]
    auth_level: none

  - id: getNetworkSettings
    label: Get Network Settings
    kind: query
    service: system
    description: "Network interface settings (IP, MAC, gateway, DNS)."
    params:
      - name: netif
        type: string
        required: false
        description: "Interface: 'eth0', 'wlan0', 'p2p1', ''. Default ''=all."
    versions: ["1.0"]
    auth_level: generic

  - id: getInterfaceInformation
    label: Get Interface Information
    kind: query
    service: system
    description: "REST API interface info: productCategory, modelName, interfaceVersion."
    params: []
    versions: ["1.0"]
    auth_level: none

  - id: getRemoteDeviceSettings
    label: Get Remote Device Settings
    kind: query
    service: system
    description: "Remote device access settings (accessPermission)."
    params:
      - name: target
        type: string
        required: false
        description: "Target: 'accessPermission', ''=all. Default ''."
    versions: ["1.0"]
    auth_level: none

  - id: getLEDIndicatorStatus
    label: Get LED Indicator Status
    kind: query
    service: system
    description: "Get current LED indicator mode and status."
    params: []
    versions: ["1.0"]
    auth_level: generic

  - id: getPowerSavingMode
    label: Get Power Saving Mode
    kind: query
    service: system
    description: "Current power saving mode setting."
    params: []
    versions: ["1.0"]
    auth_level: none

  - id: getPowerStatus
    label: Get Power Status
    kind: query
    service: system
    description: "Current power status: 'standby' or 'active'."
    params: []
    versions: ["1.0"]
    auth_level: none

  - id: getRemoteControllerInfo
    label: Get Remote Controller Info
    kind: query
    service: system
    description: "IRCC remote control button codes supported by device."
    params: []
    versions: ["1.0"]
    auth_level: none

  - id: getSystemInformation
    label: Get System Information
    kind: query
    service: system
    description: "Device info (model, serial, MAC, generation, firmware). v1.7 adds fwVersion, androidOs, webAppRuntimeVersion, mode."
    params: []
    versions: ["1.0", "1.7"]
    auth_level: private

  - id: getSystemSupportedFunction
    label: Get System Supported Function
    kind: query
    service: system
    description: "Device capabilities (e.g. WOL MAC address)."
    params: []
    versions: ["1.0"]
    auth_level: none

  - id: getWolMode
    label: Get WoL Mode
    kind: query
    service: system
    description: "Wake-on-LAN mode enabled/disabled status."
    params: []
    versions: ["1.0"]
    auth_level: generic

  - id: requestReboot
    label: Request Reboot
    kind: action
    service: system
    description: "Reboot the device."
    params: []
    versions: ["1.0"]
    auth_level: generic

  - id: setLEDIndicatorStatus
    label: Set LED Indicator Status
    kind: action
    service: system
    description: "Set LED indicator mode and on/off status."
    params:
      - name: mode
        type: string
        required: true
        description: "Mode: 'Demo', 'AutoBrightnessAdjust', 'Dark', 'SimpleResponse', 'Off'."
      - name: status
        type: string
        required: false
        description: "'true'=on, 'false'=off, null=server decides."
    versions: ["1.1"]
    auth_level: generic

  - id: setPowerStatus
    label: Set Power Status
    kind: action
    service: system
    description: "Power on/off. Power-on only works in Sleep mode with Remote start enabled."
    params:
      - name: status
        type: boolean
        required: true
        description: "true=power on, false=power off."
    versions: ["1.0"]
    auth_level: generic

  - id: setWolMode
    label: Set WoL Mode
    kind: action
    service: system
    description: "Enable/disable Wake-on-LAN."
    params:
      - name: enabled
        type: boolean
        required: true
        description: "true=enabled, false=disabled."
    versions: ["1.0"]
    auth_level: generic

  # ── video service ──
  - id: getScreenRotation
    label: Get Screen Rotation
    kind: query
    service: video
    description: "Get current screen rotation (0, 90, 180, 270). Localhost only."
    params: []
    versions: ["1.0"]
    auth_level: none

  - id: setScreenRotation
    label: Set Screen Rotation
    kind: action
    service: video
    description: "Set screen rotation (0, 90, 180, 270). Localhost only."
    params:
      - name: rotation
        type: integer
        required: true
        description: "Rotation: 0, 90, 180, 270."
    versions: ["1.0"]
    auth_level: generic

  - id: getPictureQualitySettings
    label: Get Picture Quality Settings
    kind: query
    service: video
    description: "Current and supported picture quality settings (color, brightness, contrast, sharpness, pictureMode, etc.)."
    params:
      - name: target
        type: string
        required: false
        description: "Target: 'color', 'brightness', 'contrast', 'sharpness', 'pictureMode', 'lightSensor', 'colorSpace', 'colorTemperature', 'autoPictureMode', 'hdrMode', 'autoLocalDimming', 'xtendedDynamicRange', ''=all."
    versions: ["1.0"]
    auth_level: none

  - id: setPictureQualitySettings
    label: Set Picture Quality Settings
    kind: action
    service: video
    description: "Change picture quality settings."
    params:
      - name: settings
        type: object-array
        required: true
        description: "Array of target/value pairs for picture quality."
    versions: ["1.0"]
    auth_level: generic

  # ── videoScreen service ──
  - id: setSceneSetting
    label: Set Scene Setting
    kind: action
    service: videoScreen
    description: "Change scene setting for input source."
    params:
      - name: value
        type: string
        required: true
        description: "Scene: 'auto', 'auto24pSync', 'general'."
    versions: ["1.0"]
    auth_level: generic
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: ["active", "standby"]
    description: "Power status from getPowerStatus."

  - id: volume_info
    type: object
    description: "Volume, mute, minVolume, maxVolume per target from getVolumeInformation."
    fields:
      - name: target
        type: string
        description: "'speaker' or 'headphone'."
      - name: volume
        type: integer
      - name: mute
        type: boolean
      - name: minVolume
        type: integer
      - name: maxVolume
        type: integer

  - id: playing_content
    type: object
    description: "Currently playing content from getPlayingContentInfo."
    fields:
      - name: uri
        type: string
      - name: source
        type: string
      - name: title
        type: string

  - id: external_inputs_status
    type: array
    description: "External input status from getCurrentExternalInputsStatus."
    item_fields:
      - name: uri
        type: string
      - name: title
        type: string
      - name: connection
        type: boolean
      - name: label
        type: string
      - name: icon
        type: string
      - name: status
        type: string

  - id: application_status
    type: array
    description: "Application status from getApplicationStatusList."
    item_fields:
      - name: name
        type: string
        description: "'textInput', 'cursorDisplay', 'webBrowse'."
      - name: status
        type: string
        description: "'on' or 'off'."

  - id: power_saving_mode
    type: enum
    values: ["off", "low", "high", "pictureOff"]
    description: "Current power saving mode from getPowerSavingMode."

  - id: led_indicator_status
    type: object
    description: "LED mode and status from getLEDIndicatorStatus."
    fields:
      - name: mode
        type: string
        description: "'Demo', 'AutoBrightnessAdjust', 'Dark', 'SimpleResponse', 'Off'."
      - name: status
        type: string
        description: "'true', 'false', null."

  - id: wol_mode
    type: boolean
    description: "WoL enabled/disabled from getWolMode."

  - id: network_settings
    type: array
    description: "Network interface info from getNetworkSettings."

  - id: system_information
    type: object
    description: "Device info from getSystemInformation."

  - id: current_time
    type: object
    description: "Device time from getCurrentTime."

  - id: web_app_status
    type: object
    description: "WebAppRuntime active status and URL from getWebAppStatus."

  - id: picture_quality_settings
    type: array
    description: "Picture quality settings from getPictureQualitySettings."

  - id: speaker_settings
    type: array
    description: "Speaker configuration from getSpeakerSettings."

  - id: screen_rotation
    type: integer
    description: "Screen rotation value (0, 90, 180, 270) from getScreenRotation."
```

## Variables
```yaml
variables:
  - id: audio_volume
    type: integer
    min: 0
    max: 100
    description: "Audio volume level. Set via setAudioVolume."

  - id: audio_mute
    type: boolean
    description: "Mute state. Set via setAudioMute."

  - id: power_status
    type: boolean
    description: "Power state. true=on, false=off. Set via setPowerStatus."

  - id: power_saving_mode
    type: enum
    values: ["off", "low", "high", "pictureOff"]
    description: "Power saving mode. Set via setPowerSavingMode."

  - id: scene_setting
    type: enum
    values: ["auto", "auto24pSync", "general"]
    description: "Scene setting. Set via setSceneSetting."

  - id: led_mode
    type: enum
    values: ["Demo", "AutoBrightnessAdjust", "Dark", "SimpleResponse", "Off"]
    description: "LED indicator mode. Set via setLEDIndicatorStatus."

  - id: wol_enabled
    type: boolean
    description: "Wake-on-LAN enabled. Set via setWolMode."

  - id: screen_rotation
    type: integer
    values: [0, 90, 180, 270]
    description: "Screen rotation. Set via setScreenRotation."

  - id: picture_quality
    type: object
    description: "Picture quality targets (color, brightness, contrast, etc.). Set via setPictureQualitySettings."

  - id: sound_settings
    type: object
    description: "Sound settings (outputTerminal). Set via setSoundSettings."

  - id: speaker_settings
    type: object
    description: "Speaker settings (tvPosition, subwooferLevel, etc.). Set via setSpeakerSettings."
```

## Events
```yaml
# UNRESOLVED: source documents notification APIs in getSupportedApiInfo response structure
# but does not enumerate specific notification events or their schemas.
```

## Macros
```yaml
# App upload and install sequence from source:
# 1. prepareAppUpload → get assetId
# 2. POST APK to http://{ip}/sony/appupload/{assetId} with PSK in header
# 3. installApp with assetId
# Timeout: assetId expires after 5 minutes of inactivity.
```

## Safety
```yaml
confirmation_required_for:
  - requestReboot
  - setPowerStatus
interlocks:
  - "setPowerStatus(power on) only works in Sleep mode with Remote start enabled."
  - "getScreenshot requires device in power-on state; returns error if display off or screen saver active."
# UNRESOLVED: no explicit safety warnings or interlock procedures found in source
```

## Notes
- All API calls use JSON-RPC over HTTP POST to `http://{ip}/sony/{service}` endpoint.
- Request format: `{"method": "...", "id": N, "params": [...], "version": "X.Y"}`.
- Three authentication levels per API: `none` (no PSK), `generic` (PSK required), `private` (PSK required).
- Some APIs (prepareAppUpload, installApp, uninstallApp, getScreenshot, getScreenRotation, setScreenRotation) are localhost-only (127.0.0.1).
- getRemoteControllerInfo returns IRCC base64 codes for remote control button emulation via separate IRCC endpoint (not documented in this source).
- Volume range is 0-100 based on response examples (minVolume=0, maxVolume=100).
- Content URI scheme: `extInput:hdmi?port=N`, `extInput:component?port=N`, `extInputs:cec?type=...&port=N`.

<!-- UNRESOLVED: port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: IRCC endpoint for sending remote control codes referenced but not documented -->
<!-- UNRESOLVED: notification/websocket event subscription mechanism not documented -->
<!-- UNRESOLVED: maximum concurrent connection limit not specified -->

## Provenance

```yaml
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-31T22:40:37.732Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:40:37.732Z
matched_actions: 47
action_count: 47
confidence: high
summary: "All 47 spec actions match verbatim JSON-RPC method names in the source with correct shapes and parameters; transport base_url and PSK auth confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
