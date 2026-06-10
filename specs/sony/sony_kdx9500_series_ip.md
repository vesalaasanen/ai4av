---
spec_id: admin/sony-kdx9500-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX9500 Series Control Spec"
manufacturer: Sony
model_family: "KDX9500 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX9500 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-26T10:06:26.601Z
last_checked_at: 2026-06-10T01:27:30.920Z
generated_at: 2026-06-10T01:27:30.920Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "port number not stated in source — default HTTP port 80 assumed but not confirmed"
  - "no authentication flow described in source; per-API auth levels observed (none/generic/private)"
  - "no unsolicited event notifications described in source"
  - "no multi-step macros described in source"
  - "no safety warnings or interlock procedures in source"
  - "TCP port number not stated in source"
  - "specific firmware version for KDX9500 not confirmed against source"
  - "authentication mechanism (PSK/setup) not described in source"
verification:
  verdict: verified
  checked_at: 2026-06-10T01:27:30.920Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec action-unit ids are exact JSON-RPC method names present in the source, shapes and param ranges match, and the source contains exactly 47 distinct method names — full bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDX9500 Series Control Spec

## Summary
Sony BRAVIA Professional Display controlled via REST API over HTTP/TCP. Supports power management, audio control, video/screen settings, input routing, and app management. JSON-RPC protocol with authentication levels per endpoint. Port number not stated in source.

<!-- UNRESOLVED: port number not stated in source — default HTTP port 80 assumed but not confirmed -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://{ip_address}/sony  # inferred from REST API endpoint pattern
auth:
  type: null  # UNRESOLVED: no authentication flow described in source; per-API auth levels observed (none/generic/private)
```

## Traits
```yaml
- powerable       # setPowerStatus, getPowerStatus present
- queryable       # getPowerStatus, getVolumeInformation, getPlayingContentInfo, etc.
- routable        # setPlayContent, getCurrentExternalInputsStatus, input selection
- levelable       # setAudioVolume, setPictureQualitySettings, setSpeakerSettings
```

## Actions
```yaml
- id: setPowerStatus
  label: Set Power Status
  kind: action
  params:
    - name: status
      type: boolean
      description: true = power on, false = power off

- id: setPowerSavingMode
  label: Set Power Saving Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "off" | "low" | "high" | "pictureOff"

- id: setAudioVolume
  label: Set Audio Volume
  kind: action
  params:
    - name: target
      type: string
      description: "speaker" | "headphone" | "" (all outputs)
    - name: volume
      type: string
      description: "N" (set to level N), "+N" (increase), "-N" (decrease)

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  params:
    - name: status
      type: boolean
      description: true = mute, false = unmute

- id: setSoundSettings
  label: Set Sound Settings
  kind: action
  params:
    - name: settings
      type: array
      description: Array of target/value pairs (e.g., outputTerminal: speaker)

- id: setSpeakerSettings
  label: Set Speaker Settings
  kind: action
  params:
    - name: settings
      type: array
      description: Array of target/value pairs (tvPosition, subwooferLevel, etc.)

- id: setPlayContent
  label: Play Content
  kind: action
  params:
    - name: uri
      type: string
      description: URI from getContentList (e.g., extInput:hdmi?port=2)

- id: setPictureQualitySettings
  label: Set Picture Quality Settings
  kind: action
  params:
    - name: target
      type: string
      description: "color" | "brightness" | "contrast" | "sharpness" | "pictureMode" | etc.
    - name: value
      type: string
      description: Value to set for target

- id: setSceneSetting
  label: Set Scene Setting
  kind: action
  params:
    - name: value
      type: string
      description: "auto" | "auto24pSync" | "general"

- id: setScreenRotation
  label: Set Screen Rotation
  kind: action
  params:
    - name: rotation
      type: integer
      description: 0 | 90 | 180 | 270

- id: setActiveApp
  label: Launch Application
  kind: action
  params:
    - name: uri
      type: string
      description: Application URI

- id: terminateApps
  label: Terminate All Applications
  kind: action
  params: []

- id: setTextForm
  label: Input Text
  kind: action
  params:
    - name: text
      type: string
      description: Text data encoded by UTF8
    - name: encKey
      type: string
      description: Encryption key (optional, v1.1)

- id: prepareAppUpload
  label: Prepare App Upload
  kind: action
  params: []

- id: installApp
  label: Install Application
  kind: action
  params:
    - name: assetId
      type: string
    - name: afterInstallAction
      type: string
    - name: uri
      type: string

- id: uninstallApp
  label: Uninstall Application
  kind: action
  params:
    - name: packageName
      type: string

- id: setLEDIndicatorStatus
  label: Set LED Indicator Status
  kind: action
  params:
    - name: mode
      type: string
      description: "Demo" | "AutoBrightnessAdjust" | "Dark" | "SimpleResponse" | "Off"
    - name: status
      type: string
      description: "true" | "false" | null

- id: setWolMode
  label: Set Wake-on-LAN Mode
  kind: action
  params:
    - name: enabled
      type: boolean

- id: requestReboot
  label: Reboot Device
  kind: action
  params: []
- id: getSupportedApiInfo
  label: Get Supported API Info
  kind: query
  params:
    - name: services
      type: array
      description: Services to fetch API information; null or empty means all services

- id: getApplicationList
  label: Get Application List
  kind: query
  params: []

- id: getWebAppStatus
  label: Get Web App Status
  kind: query
  params: []

- id: getApplicationStatusList
  label: Get Application Status List
  kind: query
  params: []

- id: getTextForm
  label: Get Text Form
  kind: query
  params:
    - name: encKey
      type: string
      description: Encryption key encrypted by public key; empty string means not encrypted

- id: getSpeakerSettings
  label: Get Speaker Settings
  kind: query
  params:
    - name: target
      type: string
      description: tvPosition | subwooferLevel | subwooferFreq | subwooferPhase | subwooferPower | (empty = all)

- id: getVolumeInformation
  label: Get Volume Information
  kind: query
  params: []

- id: getCurrentExternalInputsStatus
  label: Get Current External Inputs Status
  kind: query
  params: []

- id: getPlayingContentInfo
  label: Get Playing Content Info
  kind: query
  params: []

- id: getContentCount
  label: Get Content Count
  kind: query
  params:
    - name: source
      type: string
      description: Source URI (e.g., extInput:hdmi)
    - name: type
      type: string
      description: Optional content type filter

- id: getContentList
  label: Get Content List
  kind: query
  params:
    - name: uri
      type: string
      description: URI to identify content; null means all contents
    - name: stIdx
      type: integer
      description: Start index (default 0)
    - name: cnt
      type: integer
      description: Max items to return (default 50, max 200)

- id: getSchemeList
  label: Get Scheme List
  kind: query
  params: []

- id: getSourceList
  label: Get Source List
  kind: query
  params:
    - name: scheme
      type: string
      description: Scheme name (e.g., extInput)

- id: getPublicKey
  label: Get Public Key
  kind: query
  params: []

- id: getScreenshot
  label: Get Screenshot
  kind: query
  params:
    - name: plane
      type: string
      description: video | graphics | mixed (default mixed)

- id: getCurrentTime
  label: Get Current Time
  kind: query
  params: []

- id: getNetworkSettings
  label: Get Network Settings
  kind: query
  params:
    - name: netif
      type: string
      description: Network interface (eth0, wlan0, p2p1, or empty string for all)

- id: getInterfaceInformation
  label: Get Interface Information
  kind: query
  params: []

- id: getRemoteDeviceSettings
  label: Get Remote Device Settings
  kind: query
  params:
    - name: target
      type: string
      description: accessPermission | (empty = all settings)

- id: getLEDIndicatorStatus
  label: Get LED Indicator Status
  kind: query
  params: []

- id: getPowerSavingMode
  label: Get Power Saving Mode
  kind: query
  params: []

- id: getPowerStatus
  label: Get Power Status
  kind: query
  params: []

- id: getRemoteControllerInfo
  label: Get Remote Controller Info
  kind: query
  params: []

- id: getSystemInformation
  label: Get System Information
  kind: query
  params: []

- id: getSystemSupportedFunction
  label: Get System Supported Function
  kind: query
  params: []

- id: getWolMode
  label: Get WoL Mode
  kind: query
  params: []

- id: getScreenRotation
  label: Get Screen Rotation
  kind: query
  params: []

- id: getPictureQualitySettings
  label: Get Picture Quality Settings
  kind: query
  params:
    - name: target
      type: string
      description: color | brightness | contrast | sharpness | pictureMode | lightSensor | colorSpace | colorTemperature | autoPictureMode | hdrMode | autoLocalDimming | xtendedDynamicRange | (empty = all)
```

## Feedbacks
```yaml
- id: powerState
  type: enum
  values: [standby, active]

- id: powerSavingMode
  type: enum
  values: [off, low, high, pictureOff]

- id: volumeInformation
  type: object
  properties:
    - target: string
    - volume: integer
    - mute: boolean
    - maxVolume: integer
    - minVolume: integer

- id: playingContentInfo
  type: object
  properties:
    - uri: string
    - source: string
    - title: string

- id: externalInputsStatus
  type: array
  description: Array of {uri, title, connection, label, icon, status}

- id: systemInformation
  type: object
  properties:
    - product: string
    - language: string
    - model: string
    - serial: string
    - macAddr: string
    - name: string
    - generation: string
    - fwVersion: string  # v1.7+
    - androidOs: string  # v1.7+
    - webAppRuntimeVersion: string  # v1.7+
    - mode: string  # v1.7+

- id: networkSettings
  type: array
  description: Array of {netif, hwAddr, ipAddrV4, ipAddrV6, netmask, gateway, dns}

- id: screenshot
  type: string
  description: Base64 encoded 320x180 JPEG data

- id: publicKey
  type: string
  description: RSA public key for encryption

- id: applicationList
  type: array
  description: Array of {title, uri, icon}

- id: webAppStatus
  type: object
  properties:
    - active: boolean
    - url: string

- id: textInputContent
  type: string
  description: Current software keyboard text input

- id: contentList
  type: array
  description: Array of {uri, title, index} for given source

- id: contentCount
  type: integer
  description: Count of contents in a source

- id: speakerSettings
  type: array
  description: Array of {target, currentValue} for speaker configuration

- id: pictureQualitySettings
  type: array
  description: Array of {target, currentValue, isAvailable, candidate} for picture quality

- id: screenRotation
  type: integer
  description: 0 | 90 | 180 | 270

- id: ledIndicatorStatus
  type: object
  properties:
    - mode: string
    - status: string

- id: wolMode
  type: object
  properties:
    - enabled: boolean

- id: remoteControllerInfo
  type: array
  description: Array of {name, value} IRCC codes

- id: systemSupportedFunction
  type: array
  description: Array of {option, value} (e.g., WOL with MAC address)

- id: currentTime
  type: string
  description: ISO8601 format datetime

- id: wolMode_info
  type: object
  properties:
    - enabled: boolean
```

## Variables
```yaml
# Audio
- id: audioVolume
  type: integer
  description: Current volume level (0-100)

- id: audioMute
  type: boolean
  description: Current mute state

# Picture
- id: colorSetting
  type: integer
  description: Color saturation (0-100)
- id: brightnessSetting
  type: integer
  description: Luminance level
- id: contrastSetting
  type: integer
  description: Picture white level
- id: sharpnessSetting
  type: integer
  description: Picture detail level

# Speaker position
- id: tvPositionSetting
  type: string
  description: "tableTop" | "wallMount"
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
REST API uses JSON-RPC over HTTP. Base URL pattern: `http://{ip}/sony/{service}` where service is guide, appControl, audio, avContent, encryption, system, video, or videoScreen. Authentication levels vary by API: none, generic, private. Some APIs (appControl, video, system screenshot) restricted to localhost (127.0.0.1) only per firmware requirements. Power-on only from Sleep mode. Remote start must be enabled in network settings.
<!-- UNRESOLVED: TCP port number not stated in source -->
<!-- UNRESOLVED: specific firmware version for KDX9500 not confirmed against source -->
<!-- UNRESOLVED: authentication mechanism (PSK/setup) not described in source -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-26T10:06:26.601Z
last_checked_at: 2026-06-10T01:27:30.920Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T01:27:30.920Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec action-unit ids are exact JSON-RPC method names present in the source, shapes and param ranges match, and the source contains exactly 47 distinct method names — full bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "port number not stated in source — default HTTP port 80 assumed but not confirmed"
- "no authentication flow described in source; per-API auth levels observed (none/generic/private)"
- "no unsolicited event notifications described in source"
- "no multi-step macros described in source"
- "no safety warnings or interlock procedures in source"
- "TCP port number not stated in source"
- "specific firmware version for KDX9500 not confirmed against source"
- "authentication mechanism (PSK/setup) not described in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
