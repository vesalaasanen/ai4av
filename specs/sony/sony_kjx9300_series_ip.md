---
spec_id: admin/sony-kjx9300-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KJX9300 Series Control Spec"
manufacturer: Sony
model_family: "KJX9300 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KJX9300 Series"
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
last_checked_at: 2026-05-31T22:42:28.687Z
generated_at: 2026-05-31T22:42:28.687Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:42:28.687Z
  matched_actions: 47
  action_count: 47
  confidence: high
  summary: "All 47 spec actions match verbatim JSON-RPC method names in the source; shapes, param ranges, and auth levels are accurate; transport PSK pattern confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KJX9300 Series Control Spec

## Summary
Sony BRAVIA Professional Display (KJX9300 Series) REST API control spec. Uses JSON-RPC over HTTP POST to endpoints under `http://<Base URL>/<service>`. Services include appControl, audio, avContent, encryption, system, video, and videoScreen. Authentication uses PSK (Pre-Shared Key) at three levels: none, generic, and private.

<!-- UNRESOLVED: specific port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: maximum concurrent connection limit not specified -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://<Base URL>/<service>"
  # UNRESOLVED: port number not stated in source
auth:
  type: psk
  # Source defines three auth levels: none, generic (PSK required), private (PSK required)
```

## Traits
```yaml
traits:
  - powerable     # setPowerStatus on/off, getPowerStatus
  - queryable     # extensive query APIs (getPowerStatus, getVolumeInformation, etc.)
  - routable      # setPlayContent for input routing, getCurrentExternalInputsStatus
  - levelable     # setAudioVolume, getVolumeInformation, picture quality settings
```

## Actions
```yaml
actions:
  # --- appControl service ---
  - id: getSupportedApiInfo
    label: Get Supported API Info
    kind: query
    service: appControl
    auth_level: none
    description: Fetch supported services and their API information for initialization
    params:
      - name: services
        type: string_array
        required: false
        description: "Services to fetch API info. Null or empty = all services."

  - id: prepareAppUpload
    label: Prepare App Upload
    kind: action
    service: appControl
    auth_level: generic
    description: "Launch upload server, returns assetId. Localhost only (FW-BZxxx series)."
    params: []

  - id: uninstallApp
    label: Uninstall App
    kind: action
    service: appControl
    auth_level: generic
    description: "Uninstall an application. Localhost only (FW-BZxxx series)."
    params:
      - name: packageName
        type: string
        required: true
        description: Package name of the application to uninstall

  - id: installApp
    label: Install App
    kind: action
    service: appControl
    auth_level: generic
    description: "Install an application from uploaded APK. Localhost only (FW-BZxxx series)."
    params:
      - name: assetId
        type: string
        required: true
        description: Asset ID obtained from prepareAppUpload
      - name: afterInstallAction
        type: string
        required: false
        description: "Action after install. 'startApplication' launches the app."
      - name: uri
        type: string
        required: false
        description: "URI compliant with android-app scheme for post-install launch."

  - id: setTextForm
    label: Set Text Form
    kind: action
    service: appControl
    auth_level: generic
    description: "Input text on software keyboard field. v1.1 supports encrypted text via encKey."
    params:
      - name: text
        type: string
        required: true
        description: Text data encoded by UTF8 (encrypted if encKey set)
      - name: encKey
        type: string
        required: false
        description: "Encryption key encrypted by public key (v1.1). Default empty = not encrypted."

  - id: terminateApps
    label: Terminate Apps
    kind: action
    service: appControl
    auth_level: generic
    description: Terminate all running applications
    params: []

  - id: setActiveApp
    label: Set Active App
    kind: action
    service: appControl
    auth_level: generic
    description: Launch an application by URI
    params:
      - name: uri
        type: string
        required: true
        description: "URI of target app. Supports localapp://webappruntime schemes."

  - id: getApplicationList
    label: Get Application List
    kind: query
    service: appControl
    auth_level: private
    description: List applications launchable by setActiveApp
    params: []

  - id: getWebAppStatus
    label: Get Web App Status
    kind: query
    service: appControl
    auth_level: private
    description: Retrieve WebAppRuntime status and current webpage URL
    params: []

  - id: getApplicationStatusList
    label: Get Application Status List
    kind: query
    service: appControl
    auth_level: none
    description: "Status of textInput, cursorDisplay, webBrowse applications (on/off)"
    params: []

  - id: getTextForm
    label: Get Text Form
    kind: query
    service: appControl
    auth_level: private
    description: "Get current text input on software keyboard. v1.1 supports encryption."
    params:
      - name: encKey
        type: string
        required: false
        description: "Encryption key encrypted by public key (v1.1). Default empty = not encrypted."

  # --- audio service ---
  - id: setAudioVolume
    label: Set Audio Volume
    kind: action
    service: audio
    auth_level: generic
    description: "Change audio volume level. v1.2 adds ui param for volume bar display."
    params:
      - name: target
        type: string
        required: true
        description: "Output target: '' (all), 'speaker', 'headphone'"
      - name: volume
        type: string
        required: true
        description: "Volume level: 'N' (absolute), '+N' (increase), '-N' (decrease)"
      - name: ui
        type: string
        required: false
        description: "Display volume bar UI: 'on', 'off', or null (v1.2 only)"

  - id: getSpeakerSettings
    label: Get Speaker Settings
    kind: query
    service: audio
    auth_level: none
    description: Get current and supported speaker configuration settings
    params:
      - name: target
        type: string
        required: false
        description: "Target: '' (all), 'tvPosition', 'subwooferLevel', 'subwooferFreq', 'subwooferPhase', 'subwooferPower'"

  - id: getVolumeInformation
    label: Get Volume Information
    kind: query
    service: audio
    auth_level: none
    description: Get current volume level, mute status, min/max volume per output target
    params: []

  - id: setAudioMute
    label: Set Audio Mute
    kind: action
    service: audio
    auth_level: generic
    description: Change audio mute status
    params:
      - name: status
        type: boolean
        required: true
        description: "true = mute, false = unmute"

  - id: setSoundSettings
    label: Set Sound Settings
    kind: action
    service: audio
    auth_level: generic
    description: Change sound output terminal settings
    params:
      - name: settings
        type: object_array
        required: true
        description: "Array of target/value pairs. Target 'outputTerminal': 'speaker', 'speaker_hdmi', 'hdmi', 'audioSystem'."

  - id: setSpeakerSettings
    label: Set Speaker Settings
    kind: action
    service: audio
    auth_level: generic
    description: Change speaker configuration settings
    params:
      - name: settings
        type: object_array
        required: true
        description: "Array of target/value pairs. Targets: tvPosition, subwooferLevel, subwooferFreq, subwooferPhase, subwooferPower."

  # --- avContent service ---
  - id: setPlayContent
    label: Set Play Content
    kind: action
    service: avContent
    auth_level: generic
    description: Play content specified by URI (e.g. switch to HDMI input)
    params:
      - name: uri
        type: string
        required: true
        description: "Content URI, e.g. 'extInput:hdmi?port=2'"

  - id: getCurrentExternalInputsStatus
    label: Get Current External Inputs Status
    kind: query
    service: avContent
    auth_level: none
    description: "Status of all external inputs (connection, signal, label, icon). v1.1 adds signal status field."
    params: []

  - id: getPlayingContentInfo
    label: Get Playing Content Info
    kind: query
    service: avContent
    auth_level: private
    description: Information about currently playing content or selected input
    params: []

  - id: getContentCount
    label: Get Content Count
    kind: query
    service: avContent
    auth_level: private
    description: Count of contents in a source (e.g. number of HDMI inputs)
    params:
      - name: source
        type: string
        required: true
        description: "Source URI with scheme and path, e.g. 'extInput:hdmi'"
      - name: type
        type: string
        required: false
        description: Content type filter
      - name: target
        type: string
        required: false
        description: Target filter (v1.1 only)

  - id: getContentList
    label: Get Content List
    kind: query
    service: avContent
    auth_level: private
    description: List contents under a URI with pagination support (stIdx, cnt)
    params:
      - name: uri
        type: string
        required: false
        description: "Content URI. Null = all supported contents."
      - name: stIdx
        type: integer
        required: false
        description: Start index for pagination (default 0)
      - name: cnt
        type: integer
        required: false
        description: Max items to return (default 50, max 200)

  - id: getSchemeList
    label: Get Scheme List
    kind: query
    service: avContent
    auth_level: none
    description: List of URI schemes the device can handle (e.g. extInput, fav)
    params: []

  - id: getSourceList
    label: Get Source List
    kind: query
    service: avContent
    auth_level: none
    description: List of sources within a scheme (e.g. extInput:hdmi, extInput:component)
    params:
      - name: scheme
        type: string
        required: true
        description: "Scheme name from getSchemeList, e.g. 'extInput'"

  # --- encryption service ---
  - id: getPublicKey
    label: Get Public Key
    kind: query
    service: encryption
    auth_level: none
    description: Request RSA public key for text encryption
    params: []

  # --- system service ---
  - id: getScreenshot
    label: Get Screenshot
    kind: query
    service: system
    auth_level: private
    description: "Capture screenshot as Base64 JPEG (320x180). Localhost only (FW-BZxxx series)."
    params:
      - name: plane
        type: string
        required: false
        description: "Target plane: 'video' (HDMI), 'graphics' (UI), 'mixed' (default)"

  - id: setPowerSavingMode
    label: Set Power Saving Mode
    kind: action
    service: system
    auth_level: generic
    description: Change power saving mode setting
    params:
      - name: mode
        type: string
        required: true
        description: "Power saving mode: 'off', 'low', 'high', 'pictureOff'"

  - id: getCurrentTime
    label: Get Current Time
    kind: query
    service: system
    auth_level: none
    description: "Get device clock time in ISO8601 format. v1.1 adds timezone and DST offset."
    params: []

  - id: getNetworkSettings
    label: Get Network Settings
    kind: query
    service: system
    auth_level: generic
    description: Get network interface settings (IP, MAC, gateway, DNS)
    params:
      - name: netif
        type: string
        required: false
        description: "Network interface: 'eth0', 'wlan0', 'p2p1', '' (all)"

  - id: getInterfaceInformation
    label: Get Interface Information
    kind: query
    service: system
    auth_level: none
    description: Get REST API interface info (product category, model name, interface version)
    params: []

  - id: getRemoteDeviceSettings
    label: Get Remote Device Settings
    kind: query
    service: system
    auth_level: none
    description: Get remote device access permission setting
    params:
      - name: target
        type: string
        required: false
        description: "Target: '' (all), 'accessPermission'"

  - id: getLEDIndicatorStatus
    label: Get LED Indicator Status
    kind: query
    service: system
    auth_level: generic
    description: Get current LED indicator mode and status
    params: []

  - id: getPowerSavingMode
    label: Get Power Saving Mode
    kind: query
    service: system
    auth_level: none
    description: Get current power saving mode setting
    params: []

  - id: getPowerStatus
    label: Get Power Status
    kind: query
    service: system
    auth_level: none
    description: "Get current power status: 'standby' or 'active'"
    params: []

  - id: getRemoteControllerInfo
    label: Get Remote Controller Info
    kind: query
    service: system
    auth_level: none
    description: Get list of remote control button names and their IRCC code values
    params: []

  - id: getSystemInformation
    label: Get System Information
    kind: query
    service: system
    auth_level: private
    description: "Get device info (product, model, serial, MAC, generation, firmware). v1.7 adds fwVersion, androidOs, webAppRuntimeVersion, mode."
    params: []

  - id: getSystemSupportedFunction
    label: Get System Supported Function
    kind: query
    service: system
    auth_level: none
    description: Get list of device capabilities (e.g. WOL support with MAC address)
    params: []

  - id: getWolMode
    label: Get WoL Mode
    kind: query
    service: system
    auth_level: generic
    description: Get Wake-on-LAN mode enabled/disabled status
    params: []

  - id: requestReboot
    label: Request Reboot
    kind: action
    service: system
    auth_level: generic
    description: Reboot the device
    params: []

  - id: setLEDIndicatorStatus
    label: Set LED Indicator Status
    kind: action
    service: system
    auth_level: generic
    description: Set LED indicator mode and on/off status
    params:
      - name: mode
        type: string
        required: true
        description: "LED mode: 'Demo', 'AutoBrightnessAdjust', 'Dark', 'SimpleResponse', 'Off'"
      - name: status
        type: string
        required: false
        description: "LED state: 'true' (on), 'false' (off), null (server decides)"

  - id: setPowerStatus
    label: Set Power Status
    kind: action
    service: system
    auth_level: generic
    description: "Power on (true) or power off (false). Power-on only works in Sleep mode with Remote start ON."
    params:
      - name: status
        type: boolean
        required: true
        description: "true = power on, false = power off"

  - id: setWolMode
    label: Set WoL Mode
    kind: action
    service: system
    auth_level: generic
    description: Enable or disable Wake-on-LAN mode
    params:
      - name: enabled
        type: boolean
        required: true
        description: "true = enable WoL, false = disable WoL"

  # --- video service ---
  - id: getScreenRotation
    label: Get Screen Rotation
    kind: query
    service: video
    auth_level: none
    description: "Get screen rotation value. Localhost only (FW-BZxxx series)."
    params: []

  - id: setScreenRotation
    label: Set Screen Rotation
    kind: action
    service: video
    auth_level: generic
    description: "Set screen rotation. Localhost only (FW-BZxxx series)."
    params:
      - name: rotation
        type: integer
        required: true
        description: "Rotation in degrees: 0 (landscape), 90 (portrait), 180 (reversed landscape), 270 (reversed portrait)"

  - id: getPictureQualitySettings
    label: Get Picture Quality Settings
    kind: query
    service: video
    auth_level: none
    description: "Get current and supported picture quality settings with candidate values and ranges."
    params:
      - name: target
        type: string
        required: false
        description: "Target: '' (all), 'color', 'brightness', 'contrast', 'sharpness', 'pictureMode', 'lightSensor', 'colorSpace', 'colorTemperature', 'autoPictureMode', 'hdrMode', 'autoLocalDimming', 'xtendedDynamicRange'"

  - id: setPictureQualitySettings
    label: Set Picture Quality Settings
    kind: action
    service: video
    auth_level: generic
    description: Change picture quality setting values
    params:
      - name: settings
        type: object_array
        required: true
        description: "Array of target/value pairs. Targets match getPictureQualitySettings."

  # --- videoScreen service ---
  - id: setSceneSetting
    label: Set Scene Setting
    kind: action
    service: videoScreen
    auth_level: generic
    description: Change the scene setting for the current input source
    params:
      - name: value
        type: string
        required: true
        description: "Scene mode: 'auto', 'auto24pSync', 'general'"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [active, standby]
    description: "Current power status from getPowerStatus"

  - id: volume_info
    type: object
    description: "Volume level, mute status, min/max per target from getVolumeInformation"

  - id: external_inputs_status
    type: object_array
    description: "External input connection/signal status from getCurrentExternalInputsStatus"

  - id: playing_content
    type: object
    description: "Currently playing content URI, source, title from getPlayingContentInfo"

  - id: application_status
    type: object_array
    description: "textInput, cursorDisplay, webBrowse on/off status from getApplicationStatusList"

  - id: webapp_status
    type: object
    description: "WebAppRuntime active state and URL from getWebAppStatus"

  - id: led_indicator_status
    type: object
    description: "LED mode and on/off status from getLEDIndicatorStatus"

  - id: power_saving_mode
    type: enum
    values: [off, low, high, pictureOff]
    description: "Current power saving mode from getPowerSavingMode"

  - id: system_information
    type: object
    description: "Device info (product, model, serial, generation, firmware) from getSystemInformation"

  - id: network_settings
    type: object_array
    description: "Network interface info (IP, MAC, gateway, DNS) from getNetworkSettings"

  - id: picture_quality_settings
    type: object_array
    description: "Picture quality settings with candidate values from getPictureQualitySettings"

  - id: speaker_settings
    type: object_array
    description: "Speaker configuration settings from getSpeakerSettings"

  - id: remote_device_settings
    type: object_array
    description: "Remote device access permission from getRemoteDeviceSettings"

  - id: current_time
    type: object
    description: "Device clock time, timezone offset, DST offset from getCurrentTime"

  - id: content_list
    type: object_array
    description: "Content items under a URI from getContentList"

  - id: scheme_list
    type: object_array
    description: "Available URI schemes from getSchemeList"

  - id: source_list
    type: object_array
    description: "Sources within a scheme from getSourceList"

  - id: system_supported_function
    type: object_array
    description: "Device capabilities (e.g. WOL) from getSystemSupportedFunction"

  - id: wol_mode
    type: boolean
    description: "Wake-on-LAN enabled/disabled from getWolMode"

  - id: interface_information
    type: object
    description: "REST API interface info (product category, model, version) from getInterfaceInformation"

  - id: remote_controller_info
    type: object_array
    description: "Remote control button names and IRCC codes from getRemoteControllerInfo"

  - id: content_count
    type: integer
    description: "Number of contents in a source from getContentCount"

  - id: public_key
    type: string
    description: "RSA public key from getPublicKey"

  - id: screenshot
    type: string
    description: "Base64 encoded 320x180 JPEG from getScreenshot"

  - id: screen_rotation
    type: integer
    description: "Screen rotation degrees (0, 90, 180, 270) from getScreenRotation"

  - id: application_list
    type: object_array
    description: "List of launchable applications from getApplicationList"

  - id: supported_api_info
    type: object_array
    description: "Supported services and API versions from getSupportedApiInfo"
```

## Variables
```yaml
variables:
  - id: audio_volume
    type: integer
    min: 0
    max: 100
    description: "Audio volume level (absolute). Controlled via setAudioVolume."

  - id: audio_mute
    type: boolean
    description: "Audio mute state. Controlled via setAudioMute."

  - id: power_status
    type: boolean
    description: "Power state. true=active, false=standby. Controlled via setPowerStatus."

  - id: power_saving_mode
    type: enum
    values: [off, low, high, pictureOff]
    description: "Power saving mode. Controlled via setPowerSavingMode."

  - id: wol_mode
    type: boolean
    description: "Wake-on-LAN enabled state. Controlled via setWolMode."

  - id: led_indicator_mode
    type: enum
    values: [Demo, AutoBrightnessAdjust, Dark, SimpleResponse, Off]
    description: "LED indicator mode. Controlled via setLEDIndicatorStatus."

  - id: led_indicator_status
    type: boolean
    description: "LED indicator on/off. Controlled via setLEDIndicatorStatus."

  - id: output_terminal
    type: enum
    values: [speaker, speaker_hdmi, hdmi, audioSystem]
    description: "Audio output terminal. Controlled via setSoundSettings."

  - id: tv_position
    type: enum
    values: [tableTop, wallMount]
    description: "TV position sound optimization. Controlled via setSpeakerSettings."

  - id: subwoofer_level
    type: integer
    min: 0
    max: 24
    description: "Subwoofer level. Controlled via setSpeakerSettings."

  - id: subwoofer_freq
    type: integer
    min: 0
    max: 30
    description: "Subwoofer cutoff frequency. Controlled via setSpeakerSettings."

  - id: subwoofer_phase
    type: enum
    values: [normal, reverse]
    description: "Subwoofer phase polarity. Controlled via setSpeakerSettings."

  - id: subwoofer_power
    type: enum
    values: ["on", "off"]
    description: "Subwoofer power control. Controlled via setSpeakerSettings."

  - id: scene_setting
    type: enum
    values: [auto, auto24pSync, general]
    description: "Scene setting for current input. Controlled via setSceneSetting."

  - id: screen_rotation
    type: integer
    values: [0, 90, 180, 270]
    description: "Screen rotation degrees. Controlled via setScreenRotation."

  - id: access_permission
    type: enum
    values: ["on", "off"]
    description: "Remote device access permission. Controlled via setRemoteDeviceSettings."
```

## Events
```yaml
# UNRESOLVED: source describes notification APIs referenced in getSupportedApiInfo response
# structure but does not document specific unsolicited notification types or event schemas.
```

## Macros
```yaml
# Source describes application upload and install process as a multi-step sequence:
# 1. Call prepareAppUpload to get assetId
# 2. POST APK file to http://{ip}/sony/appupload/{assetId} (PSK auth in header)
# 3. Call installApp with assetId
# Both steps 2 and 3 have a 5-minute timeout before assetId expires.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: setPowerStatus power-on only works in Sleep mode.
# Some devices may not respond when in power off state.
# requestReboot reboots the device with no confirmation interlock described.
# UNRESOLVED: source does not describe safety interlocks or power-on sequencing.
```

## Notes
- All API calls use JSON-RPC over HTTP POST with method, id, params, and version fields.
- Base URL paths per service: `/guide`, `/appControl`, `/audio`, `/avContent`, `/encryption`, `/system`, `/video`, `/videoScreen`.
- Three authentication levels: `none` (no auth), `generic` (PSK required), `private` (PSK required, more restricted).
- Some APIs (prepareAppUpload, uninstallApp, installApp, getScreenshot, getScreenRotation, setScreenRotation) are localhost-only and require FW-BZxxx series with specific firmware versions.
- Remote control button IRCC codes are provided for virtual remote commander functionality via getRemoteControllerInfo.
- API versions coexist (e.g. getCurrentTime v1.0/v1.1, getSystemInformation v1.0/v1.7) — client selects version via the `version` field.
- The protocols field in getSupportedApiInfo responses shows `xhrpost:jsonizer` as the transport.

<!-- UNRESOLVED: specific HTTP port number not stated in source -->
<!-- UNRESOLVED: maximum concurrent client connections not specified -->
<!-- UNRESOLVED: notification/event subscription mechanism not documented in source -->
<!-- UNRESOLVED: PSK configuration method not described (how to set/change the pre-shared key) -->

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
last_checked_at: 2026-05-31T22:42:28.687Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:42:28.687Z
matched_actions: 47
action_count: 47
confidence: high
summary: "All 47 spec actions match verbatim JSON-RPC method names in the source; shapes, param ranges, and auth levels are accurate; transport PSK pattern confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
