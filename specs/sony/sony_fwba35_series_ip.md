---
spec_id: admin/sony-fwba35-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony FWBA35 Series (BRAVIA Pro) Control Spec"
manufacturer: Sony
model_family: FW-43BA35G
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - FW-43BA35G
    - FW-50BA35G
    - FW-55BA35G
    - FW-65BA35G
    - FW-75BA35G
    - FW-85BA35G
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command
  - https://pro-bravia.sony.net/remote-display-control/serial-control
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
retrieved_at: 2026-06-12T04:25:41.568Z
last_checked_at: 2026-06-12T19:44:57.886Z
generated_at: 2026-06-12T19:44:57.886Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "BA35-specific PKG / generation firmware support is not stated in the source. APIs that are explicit \"BZxxx series only\" or \"BZ40P/BZ35P/BZ30P only\" are marked as such below."
  - "source never states a port; 80 is the HTTP default, mark unresolved"
  - "explicit electrical / mechanical safety warnings (voltage, mounting) are not in this REST API reference."
  - "HTTP port number is not stated in source; defaulting to 80 is an assumption, mark as unresolved."
  - "BA35-specific PKG / generation firmware coverage is not stated; only BZxxx and BZ40P/BZ35P/BZ30P coverage is explicit in source."
  - "No serial (RS-232 / SDCP) commands are in this source. The recovery notes mention RS-232 ports exist on Sony TVs but the SDCP/IRCC reference is a separate document not refined here."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:44:57.886Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions matched exactly to source JSON-RPC method entries with correct versions, params, and transport parameters confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony FWBA35 Series (BRAVIA Pro) Control Spec

## Summary
The Sony FWBA35 series is Sony's professional BRAVIA display line (43"/50"/55"/65"/75"/85") for digital-signage and commercial installations. This spec covers the IP control surface documented at `pro-bravia.sony.net/remote-display-control/rest-api/`, which is shared across the BRAVIA Pro family (BA35, BZ40L/BZ35L/BZ30L, BZ40P/BZ35P/BZ30P, BZ35J, BZ35F, etc.). The control protocol is JSON-RPC 2.0 over HTTP (and WebSocket for some `videoScreen` calls; Bluetooth SPP on `videoScreen.getSceneSetting`), with three authentication levels: `none`, `generic`, and `private`. A pre-shared key (PSK) is required in the HTTP header for `generic` and `private` calls.

<!-- UNRESOLVED: BA35-specific PKG / generation firmware support is not stated in the source. APIs that are explicit "BZxxx series only" or "BZ40P/BZ35P/BZ30P only" are marked as such below. -->

## Transport
```yaml
protocols:
  - http
  # WebSocket and Bluetooth SPP transports are documented only for specific
  # endpoints (videoScreen.getSceneSetting / setSceneSetting list both http,
  # ws and Bluetooth SPP). They are not used for the rest of the API surface.
addressing:
  base_url: "/"          # source uses http://<Base URL>/<service>; host = display IP
  port: 80               # UNRESOLVED: source never states a port; 80 is the HTTP default, mark unresolved
auth:
  type: pre_shared_key   # source: "PSK information must be included in the POST header"
  # per-method authentication level: "none" | "generic" | "private"
  # - none     : open (no header)
  # - generic  : PSK header required
  # - private  : PSK header + session handshake
  notes: "Some endpoints (e.g. getRemoteControllerInfo) require a registered client key first. Per-endpoint auth levels are recorded in the Actions section."
```

## Traits
```yaml
- powerable       # setPowerStatus, getPowerStatus
- queryable       # many getXxx APIs return state
- routable        # setPlayContent, getCurrentExternalInputsStatus, getSourceList
- levelable       # setAudioVolume, setPictureQualitySettings
- app_launchable  # setActiveApp, prepareAppUpload, installApp
- screencastable  # getScreenshot, setScreenRotation
- encryptable     # getPublicKey, encrypted encKey field
```

## Actions
```yaml
# Service: guide
- id: getSupportedApiInfo
  label: Get Supported API Info (guide)
  kind: query
  service: guide
  command: "POST http://<host>{port}/guide  body: {\"method\":\"getSupportedApiInfo\",\"id\":5,\"params\":[{\"services\":[\"system\",\"avContent\"]}],\"version\":\"1.0\"}"
  auth_level: none
  params:
    - name: services
      type: string-array
      description: 'Service names to query. null/empty = all services.'

# Service: appControl
- id: prepareAppUpload
  label: Prepare App Upload (BZxxx only, localhost)
  kind: action
  service: appControl
  command: "POST http://127.0.0.1{port}/appControl  body: {\"method\":\"prepareAppUpload\",\"id\":104,\"params\":[],\"version\":\"1.0\"}"
  auth_level: generic
  notes: "BZxxx series (PKG 6.2512+, generation 5.7.0+), localhost only."

- id: uninstallApp
  label: Uninstall App (BZxxx only, localhost)
  kind: action
  service: appControl
  command: "POST http://127.0.0.1{port}/appControl  body: {\"method\":\"uninstallApp\",\"id\":106,\"params\":[{\"packageName\":\"com.sony.dtv.b2b.sample\"}],\"version\":\"1.0\"}"
  auth_level: generic
  params:
    - name: packageName
      type: string
  notes: "BZxxx series (PKG 6.2512+, generation 5.7.0+), localhost only."

- id: installApp
  label: Install App (BZxxx only, localhost)
  kind: action
  service: appControl
  command: "POST http://127.0.0.1{port}/appControl  body: {\"method\":\"installApp\",\"id\":105,\"params\":[{\"assetId\":\"<assetId>\",\"afterInstallAction\":\"startApplication\",\"uri\":\"android-app://com.sony.dtv.b2b.sample\"}],\"version\":\"1.0\"}"
  auth_level: generic
  params:
    - name: assetId
      type: string
    - name: afterInstallAction
      type: string
      description: '"startApplication" or omitted'
    - name: uri
      type: string
  notes: "BZxxx series (PKG 6.2512+, generation 5.7.0+), localhost only."

- id: getTextForm_v1_1
  label: Get Text Form (software keyboard, v1.1)
  kind: query
  service: appControl
  command: "POST http://<host>{port}/appControl  body: {\"method\":\"getTextForm\",\"id\":60,\"params\":[{}],\"version\":\"1.1\"}"
  auth_level: private
  notes: "BZ40P/BZ35P/BZ30P: Japan only. Other models: Japan and EU."

- id: setTextForm_v1_1
  label: Set Text Form (software keyboard, v1.1, encrypted)
  kind: action
  service: appControl
  command: "POST http://<host>{port}/appControl  body: {\"method\":\"setTextForm\",\"id\":601,\"params\":[{\"encKey\":\"<rsa-encrypted-key>\",\"text\":\"<utf8-or-encrypted>\"}],\"version\":\"1.1\"}"
  auth_level: generic
  notes: "BZ40P/BZ35P/BZ30P: Japan only. Other models: Japan and EU."

- id: setTextForm_v1_0
  label: Set Text Form (software keyboard, v1.0, plaintext)
  kind: action
  service: appControl
  command: "POST http://<host>{port}/appControl  body: {\"method\":\"setTextForm\",\"id\":601,\"params\":[\"hello world!!\"],\"version\":\"1.0\"}"
  auth_level: generic
  notes: "BZ40P/BZ35P/BZ30P: Japan only. Other models: Japan and EU."

- id: terminateApps
  label: Terminate All Apps
  kind: action
  service: appControl
  command: "POST http://<host>{port}/appControl  body: {\"method\":\"terminateApps\",\"id\":55,\"params\":[],\"version\":\"1.0\"}"
  auth_level: generic

- id: setActiveApp
  label: Launch Application
  kind: action
  service: appControl
  command: "POST http://<host>{port}/appControl  body: {\"method\":\"setActiveApp\",\"id\":601,\"params\":[{\"uri\":\"localapp://webappruntime?url=http%3A%2F%2Fexample.com%2F\"}],\"version\":\"1.0\"}"
  auth_level: generic
  params:
    - name: uri
      type: string
      description: 'localapp://webappruntime?url= / ?manifest= / ?auid='

- id: getApplicationList
  label: Get Application List
  kind: query
  service: appControl
  command: "POST http://<host>{port}/appControl  body: {\"method\":\"getApplicationList\",\"id\":60,\"params\":[],\"version\":\"1.0\"}"
  auth_level: private

- id: getWebAppStatus
  label: Get WebApp Status
  kind: query
  service: appControl
  command: "POST http://<host>{port}/appControl  body: {\"method\":\"getWebAppStatus\",\"id\":1,\"params\":[],\"version\":\"1.0\"}"
  auth_level: private

- id: getApplicationStatusList
  label: Get Application Status List
  kind: query
  service: appControl
  command: "POST http://<host>{port}/appControl  body: {\"method\":\"getApplicationStatusList\",\"id\":55,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none

# Service: audio
- id: setAudioVolume_v1_0
  label: Set Audio Volume (v1.0)
  kind: action
  service: audio
  command: "POST http://<host>{port}/audio  body: {\"method\":\"setAudioVolume\",\"id\":601,\"params\":[{\"volume\":\"18\",\"target\":\"speaker\"}],\"version\":\"1.0\"}"
  auth_level: generic
  params:
    - name: target
      type: string
      description: '"" | "speaker" | "headphone"'
    - name: volume
      type: string
      description: '"N" (set), "+N" (increase), "-N" (decrease) as string'

- id: getSpeakerSettings
  label: Get Speaker Settings
  kind: query
  service: audio
  command: "POST http://<host>{port}/audio  body: {\"method\":\"getSpeakerSettings\",\"id\":67,\"params\":[{\"target\":\"tvPosition\"}],\"version\":\"1.0\"}"
  auth_level: none
  notes: "BZ40P/BZ35P/BZ30P: not supported."

- id: getVolumeInformation
  label: Get Volume Information
  kind: query
  service: audio
  command: "POST http://<host>{port}/audio  body: {\"method\":\"getVolumeInformation\",\"id\":33,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  service: audio
  command: "POST http://<host>{port}/audio  body: {\"method\":\"setAudioMute\",\"id\":601,\"params\":[{\"status\":true}],\"version\":\"1.0\"}"
  auth_level: generic
  params:
    - name: status
      type: boolean

- id: setAudioVolume_v1_2
  label: Set Audio Volume (v1.2)
  kind: action
  service: audio
  command: "POST http://<host>{port}/audio  body: {\"method\":\"setAudioVolume\",\"id\":98,\"params\":[{\"volume\":\"5\",\"ui\":\"on\",\"target\":\"speaker\"}],\"version\":\"1.2\"}"
  auth_level: generic
  params:
    - name: target
      type: string
    - name: volume
      type: string
    - name: ui
      type: string
      description: '"on" | "off" | null'

- id: setSoundSettings
  label: Set Sound Settings
  kind: action
  service: audio
  command: "POST http://<host>{port}/audio  body: {\"method\":\"setSoundSettings\",\"id\":5,\"params\":[{\"settings\":[{\"value\":\"speaker\",\"target\":\"outputTerminal\"}]}],\"version\":\"1.1\"}"
  auth_level: generic
  params:
    - name: settings
      type: object-array
      description: 'Array of {target, value}; target: "outputTerminal"; value: "speaker"|"speaker_hdmi"|"hdmi"|"audioSystem"'

- id: setSpeakerSettings
  label: Set Speaker Settings
  kind: action
  service: audio
  command: "POST http://<host>{port}/audio  body: {\"method\":\"setSpeakerSettings\",\"id\":62,\"params\":[{\"settings\":[{\"value\":\"wallMount\",\"target\":\"tvPosition\"}]}],\"version\":\"1.0\"}"
  auth_level: generic
  notes: "BZ40P/BZ35P/BZ30P: not supported."

# Service: avContent
- id: setPlayContent
  label: Set Play Content (switch input)
  kind: action
  service: avContent
  command: "POST http://<host>{port}/avContent  body: {\"method\":\"setPlayContent\",\"id\":101,\"params\":[{\"uri\":\"extInput:hdmi?port=2\"}],\"version\":\"1.0\"}"
  auth_level: generic
  params:
    - name: uri
      type: string
      description: 'e.g. extInput:hdmi?port=2'

- id: getCurrentExternalInputsStatus_v1_1
  label: Get Current External Inputs Status (v1.1)
  kind: query
  service: avContent
  command: "POST http://<host>{port}/avContent  body: {\"method\":\"getCurrentExternalInputsStatus\",\"id\":105,\"params\":[],\"version\":\"1.1\"}"
  auth_level: none

- id: getCurrentExternalInputsStatus_v1_0
  label: Get Current External Inputs Status (v1.0)
  kind: query
  service: avContent
  command: "POST http://<host>{port}/avContent  body: {\"method\":\"getCurrentExternalInputsStatus\",\"id\":105,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none

- id: getPlayingContentInfo
  label: Get Playing Content Info
  kind: query
  service: avContent
  command: "POST http://<host>{port}/avContent  body: {\"method\":\"getPlayingContentInfo\",\"id\":103,\"params\":[],\"version\":\"1.0\"}"
  auth_level: private

- id: getContentCount_v1_0
  label: Get Content Count (v1.0)
  kind: query
  service: avContent
  command: "POST http://<host>{port}/avContent  body: {\"method\":\"getContentCount\",\"id\":11,\"params\":[{\"source\":\"extInput:hdmi\"}],\"version\":\"1.0\"}"
  auth_level: private

- id: getContentCount_v1_1
  label: Get Content Count (v1.1)
  kind: query
  service: avContent
  command: "POST http://<host>{port}/avContent  body: {\"method\":\"getContentCount\",\"id\":11,\"params\":[{\"source\":\"extInput:hdmi\"}],\"version\":\"1.1\"}"
  auth_level: private

- id: getContentList_v1_5
  label: Get Content List (v1.5)
  kind: query
  service: avContent
  command: "POST http://<host>{port}/avContent  body: {\"method\":\"getContentList\",\"id\":88,\"params\":[{\"stIdx\":0,\"cnt\":50,\"uri\":\"extInput:hdmi\"}],\"version\":\"1.5\"}"
  auth_level: private

- id: getSchemeList
  label: Get Scheme List
  kind: query
  service: avContent
  command: "POST http://<host>{port}/avContent  body: {\"method\":\"getSchemeList\",\"id\":1,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none

- id: getSourceList
  label: Get Source List
  kind: query
  service: avContent
  command: "POST http://<host>{port}/avContent  body: {\"method\":\"getSourceList\",\"id\":1,\"params\":[{\"scheme\":\"extInput\"}],\"version\":\"1.0\"}"
  auth_level: none

# Service: encryption
- id: getPublicKey
  label: Get RSA Public Key
  kind: query
  service: encryption
  command: "POST http://<host>{port}/encryption  body: {\"method\":\"getPublicKey\",\"id\":1,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none

# Service: system
- id: getScreenshot
  label: Get Screenshot (BZxxx, localhost)
  kind: query
  service: system
  command: "POST http://127.0.0.1{port}/system  body: {\"method\":\"getScreenshot\",\"id\":51,\"params\":[{\"plane\":\"video\"}],\"version\":\"1.0\"}"
  auth_level: private
  notes: "BZxxx series (PKG 6.2512+, generation 5.7.0+), localhost only."

- id: setPowerSavingMode
  label: Set Power Saving Mode
  kind: action
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"setPowerSavingMode\",\"id\":52,\"params\":[{\"mode\":\"pictureOff\"}],\"version\":\"1.0\"}"
  auth_level: generic
  params:
    - name: mode
      type: string
      description: '"off" | "low" | "high" | "pictureOff"'

- id: getCurrentTime_v1_0
  label: Get Current Time (v1.0)
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getCurrentTime\",\"id\":51,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none

- id: getCurrentTime_v1_1
  label: Get Current Time (v1.1, with TZ/DST)
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getCurrentTime\",\"id\":51,\"params\":[],\"version\":\"1.1\"}"
  auth_level: none

- id: getNetworkSettings
  label: Get Network Settings
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getNetworkSettings\",\"id\":2,\"params\":[{\"netif\":\"eth0\"}],\"version\":\"1.0\"}"
  auth_level: generic

- id: getInterfaceInformation
  label: Get Interface Information
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getInterfaceInformation\",\"id\":33,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none

- id: getRemoteDeviceSettings
  label: Get Remote Device Settings
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getRemoteDeviceSettings\",\"id\":44,\"params\":[{\"target\":\"accessPermission\"}],\"version\":\"1.0\"}"
  auth_level: none

- id: getLEDIndicatorStatus
  label: Get LED Indicator Status
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getLEDIndicatorStatus\",\"id\":45,\"params\":[],\"version\":\"1.0\"}"
  auth_level: generic

- id: getPowerSavingMode
  label: Get Power Saving Mode
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getPowerSavingMode\",\"id\":51,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none

- id: getPowerStatus
  label: Get Power Status
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getPowerStatus\",\"id\":50,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none
  notes: "Some devices may not respond when in power-off state."

- id: getRemoteControllerInfo
  label: Get Remote Controller Info (IRCC codes)
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getRemoteControllerInfo\",\"id\":54,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none
  notes: "Returns IRCC base64 codes for each remote button (Power, Home, VolumeUp, ...)."

- id: getSystemInformation_v1_0
  label: Get System Information (v1.0)
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getSystemInformation\",\"id\":33,\"params\":[],\"version\":\"1.0\"}"
  auth_level: private

- id: getSystemInformation_v1_7
  label: Get System Information (v1.7, with FW/Pro mode)
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getSystemInformation\",\"id\":33,\"params\":[],\"version\":\"1.7\"}"
  auth_level: private

- id: getSystemSupportedFunction
  label: Get System Supported Function (e.g. WOL)
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getSystemSupportedFunction\",\"id\":55,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none

- id: getWolMode
  label: Get Wake-on-LAN Mode
  kind: query
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"getWolMode\",\"id\":50,\"params\":[],\"version\":\"1.0\"}"
  auth_level: generic

- id: requestReboot
  label: Request Reboot
  kind: action
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"requestReboot\",\"id\":10,\"params\":[],\"version\":\"1.0\"}"
  auth_level: generic

- id: setLEDIndicatorStatus
  label: Set LED Indicator Status
  kind: action
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"setLEDIndicatorStatus\",\"id\":53,\"params\":[{\"mode\":\"Demo\",\"status\":\"true\"}],\"version\":\"1.1\"}"
  auth_level: generic

- id: setPowerStatus
  label: Set Power Status
  kind: action
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"setPowerStatus\",\"id\":55,\"params\":[{\"status\":false}],\"version\":\"1.0\"}"
  auth_level: generic
  notes: "Power-on request is supported only in 'Sleep' mode. If Remote Start setting is OFF, power-on returns an error."

- id: setWolMode
  label: Set Wake-on-LAN Mode
  kind: action
  service: system
  command: "POST http://<host>{port}/system  body: {\"method\":\"setWolMode\",\"id\":55,\"params\":[{\"enabled\":false}],\"version\":\"1.0\"}"
  auth_level: generic

# Service: video
- id: getScreenRotation
  label: Get Screen Rotation (BZxxx, localhost)
  kind: query
  service: video
  command: "POST http://127.0.0.1{port}/video  body: {\"method\":\"getScreenRotation\",\"id\":52,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none
  notes: "BZxxx series (PKG 6.2512+, generation 5.7.0+), localhost only."

- id: setScreenRotation
  label: Set Screen Rotation (BZxxx, localhost)
  kind: action
  service: video
  command: "POST http://127.0.0.1{port}/video  body: {\"method\":\"setScreenRotation\",\"id\":53,\"params\":[{\"rotation\":0}],\"version\":\"1.0\"}"
  auth_level: generic
  notes: "BZxxx series (PKG 6.2512+, generation 5.7.0+), localhost only."

- id: getPictureQualitySettings_v1_0
  label: Get Picture Quality Settings (v1.0)
  kind: query
  service: video
  command: "POST http://<host>{port}/video  body: {\"method\":\"getPictureQualitySettings\",\"id\":52,\"params\":[{\"target\":\"color\"}],\"version\":\"1.0\"}"
  auth_level: none

- id: getPictureQualitySettings_v1_1
  label: Get Picture Quality Settings (v1.1)
  kind: query
  service: video
  command: "POST http://<host>{port}/video  body: {\"method\":\"getPictureQualitySettings\",\"id\":52,\"params\":[{\"target\":\"color\"}],\"version\":\"1.1\"}"
  auth_level: none

- id: setPictureQualitySettings_v1_0
  label: Set Picture Quality Settings (v1.0)
  kind: action
  service: video
  command: "POST http://<host>{port}/video  body: {\"method\":\"setPictureQualitySettings\",\"id\":12,\"params\":[{\"settings\":[{\"value\":\"2\",\"target\":\"color\"}]}],\"version\":\"1.0\"}"
  auth_level: generic

- id: setPictureQualitySettings_v1_1
  label: Set Picture Quality Settings (v1.1, multi-target)
  kind: action
  service: video
  command: "POST http://<host>{port}/video  body: {\"method\":\"setPictureQualitySettings\",\"id\":12,\"params\":[{\"settings\":[{\"value\":\"2\",\"target\":\"contentType\"},{\"value\":\"standard\",\"target\":\"pictureMode\"},{\"value\":\"50\",\"target\":\"brightness\"},{\"value\":\"50\",\"target\":\"color\"}]}],\"version\":\"1.1\"}"
  auth_level: generic
  notes: "hdmiSignalFormat / hdmiSignalFormatVrr must be one-target-per-request to avoid failures."

# Service: videoScreen
- id: getSceneSetting
  label: Get Scene Setting
  kind: query
  service: videoScreen
  command: "POST http://<host>{port}/videoScreen  body: {\"method\":\"getSceneSetting\",\"id\":79,\"params\":[],\"version\":\"1.0\"}"
  auth_level: none
  notes: "Also reachable via ws:// and Bluetooth SPP. BZ40P/BZ35P/BZ30P: not supported."

- id: setSceneSetting
  label: Set Scene Setting
  kind: action
  service: videoScreen
  command: "POST http://<host>{port}/videoScreen  body: {\"method\":\"setSceneSetting\",\"id\":40,\"params\":[{\"value\":\"auto\"}],\"version\":\"1.0\"}"
  auth_level: generic
  notes: "BZ40P/BZ35P/BZ30P: not supported."
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [standby, active]
- id: volume
  type: integer
  range: [0, 100]   # maxVolume/minVolume reported by getVolumeInformation
- id: mute
  type: boolean
- id: current_time
  type: string
  description: ISO 8601 (v1.0) or {dateTime, timeZoneOffsetMinute, dstOffsetMinute} (v1.1)
- id: led_indicator_mode
  type: enum
  values: [Demo, AutoBrightnessAdjust, Dark, SimpleResponse, Off]
- id: led_indicator_status
  type: enum
  values: ["true", "false", "null"]
- id: power_saving_mode
  type: enum
  values: [off, low, high, pictureOff]
- id: input_status
  type: object
  description: Array of {uri, title, connection, label, icon, status} from getCurrentExternalInputsStatus v1.1
- id: playing_content
  type: object
  description: {uri, source, title} from getPlayingContentInfo
- id: volume_information
  type: object
  description: Array of {target, volume, mute, maxVolume, minVolume} from getVolumeInformation
- id: speaker_settings
  type: object
  description: Array of {target, currentValue} from getSpeakerSettings (tvPosition/subwooferLevel/subwooferFreq/subwooferPhase/subwooferPower)
- id: picture_quality_settings
  type: object
  description: Array of {target, currentValue, isAvailable, candidate[]} from getPictureQualitySettings
- id: scene_setting
  type: object
  description: {currentValue, candidate[]} from getSceneSetting (auto | auto24pSync | general)
- id: remote_access_permission
  type: enum
  values: [on, off]    # from getRemoteDeviceSettings.accessPermission
- id: wol_mode
  type: boolean
- id: network_settings
  type: object-array
  description: Array of {netif, hwAddr, ipAddrV4, ipAddrV6, netmask, gateway, dns[]} from getNetworkSettings
- id: system_information
  type: object
  description: getSystemInformation result; v1.7 adds fwVersion, androidOs, webAppRuntimeVersion, mode (Normal|ProSettings|Pro)
- id: remote_controller_info
  type: object
  description: {bundled, type} + array of {name, value} where value is the IRCC base64 code
- id: application_list
  type: object-array
  description: [{title, uri, icon}] from getApplicationList
- id: webapp_status
  type: object
  description: {active:bool, url} from getWebAppStatus
- id: application_status_list
  type: object-array
  description: [{name, status}] where name in {textInput, cursorDisplay, webBrowse} and status in {on, off}
- id: screenshot_data
  type: string
  description: Base64-encoded 320x180 / 1920x1080 jpeg from getScreenshot
- id: public_key
  type: string
  description: RSA public key (PEM-like) from getPublicKey
- id: content_list
  type: object-array
  description: Array of {uri, title, index} from getContentList
- id: content_count
  type: integer
- id: scheme_list
  type: string-array
- id: source_list
  type: string-array
- id: supported_api_info
  type: object-array
  description: getSupportedApiInfo result: [{service, protocols, apis:[{name, versions:[{version, protocols?, authLevel?}]}], notifications?}]
- id: screen_rotation
  type: integer
  values: [0, 90, 180, 270]
```

## Variables
```yaml
# Per-endpoint settable enums / ranges. Values are sourced from the parameter
# tables in the source; the display enforces device-specific minimums/maximums.
- id: audio_volume
  type: integer
  range_source: getVolumeInformation.maxVolume / minVolume
  description: 'setAudioVolume accepts "N" | "+N" | "-N" as string'
- id: audio_mute
  type: boolean
- id: output_terminal
  type: enum
  values: [speaker, speaker_hdmi, hdmi, audioSystem]
- id: speaker_setting
  type: enum
  description: |
    Per target:
      tvPosition:     [tableTop, wallMount]
      subwooferLevel:  0..24 (step 1)
      subwooferFreq:   0..30 (step 1)
      subwooferPhase:  [normal, reverse]
      subwooferPower:  [on, off]
- id: picture_quality_target
  type: enum
  values: [color, brightness, contrast, sharpness, pictureMode, lightSensor, colorSpace, colorTemperature, autoPictureMode, hdrMode, autoLocalDimming, xtendedDynamicRange, contentType]
- id: scene_setting_value
  type: enum
  values: [auto, auto24pSync, general]
- id: led_indicator_mode
  type: enum
  values: [Demo, AutoBrightnessAdjust, Dark, SimpleResponse, Off]
- id: power_saving_mode_value
  type: enum
  values: [off, low, high, pictureOff]
- id: screen_rotation_value
  type: enum
  values: [0, 90, 180, 270]
- id: screen_rotation
  type: integer
  values: [0, 90, 180, 270]
- id: external_input_uri
  type: string
  description: 'e.g. extInput:hdmi?port=1, extInput:component?port=1, extInput:cec?type=player&port=1, extInput:widi'
- id: app_uri
  type: string
  description: 'setActiveApp accepts localapp://webappruntime?url= | ?manifest= | ?auid='
- id: wol_mode
  type: boolean
- id: led_status
  type: enum
  values: ["true", "false", "null"]
```

## Events
```yaml
# The source mentions WebSocket / Bluetooth SPP for videoScreen service and
# error responses are synchronous, but the source also describes
# "notifications" inside getSupportedApiInfo. The source does not document
# specific unsolicited event payloads, so event shape is UNRESOLVED.
# No action required: clients poll getXxx endpoints. Source does mention
# "Long Polling timeout" error 40000 implying long-poll is supported but the
# exact event surface is not enumerated.
```

## Macros
```yaml
# Source documents an explicit app upload + install flow in appControl:
- id: app_upload_and_install
  label: Upload and Install APK
  steps:
    - action: prepareAppUpload
      note: get assetId (UUIDv4, expires after 5 minutes)
    - action: http_post
      target: "http://{display_ip}/sony/appupload/{assetId}"
      note: POST the APK file (PSK in header)
    - action: installApp
      params:
        assetId: "<from step 1>"
        afterInstallAction: "startApplication"
        uri: "android-app://<package>"
  notes: "Documented in source 'Appendix 1: The application upload and install process'."
```

## Safety
```yaml
confirmation_required_for:
  - requestReboot          # reboots the display
  - setPowerStatus true    # powers on, requires Sleep mode + Remote Start ON
  - installApp             # installs APK; long-lived system change
  - uninstallApp
interlocks:
  - "setPowerStatus(true) is rejected unless device is in Sleep mode and Remote Start (Settings > Network) is ON."
  - "prepareAppUpload / installApp / uninstallApp / getScreenshot / setScreenRotation / getScreenRotation are BZxxx-only and localhost-only."
  - "setTextForm / getTextForm (appControl) are BZ40P/BZ35P/BZ30P: Japan only; other models: Japan + EU."
  - "getSpeakerSettings / setSpeakerSettings / getSceneSetting / setSceneSetting are not supported on BZ40P/BZ35P/BZ30P."
# UNRESOLVED: explicit electrical / mechanical safety warnings (voltage, mounting) are not in this REST API reference.
```

## Notes
Source document is the Sony Pro BRAVIA REST API reference (`pro-bravia.sony.net/remote-display-control/rest-api/reference`), covering BA35 / BZ40L / BZ35L / BZ30L / BZ35J / BZ35F and the JP-only BZ40P/BZ35P/BZ30P lines. The BA35 series is the EU/Asia BRAVIA Pro line; the protocol is shared with the BZ-series and is JSON-RPC 2.0 over HTTP. Authentication is per-endpoint (`none` / `generic` / `private`) using a PSK in the HTTP header. Some endpoints explicitly require localhost (127.0.0.1) and firmware PKG 6.2512+ / generation 5.7.0+ — these are BZxxx-only and may not apply to BA35; check firmware generation via `getSystemInformation` before invoking them.

IRCC codes for the supplied remote are returned by `getRemoteControllerInfo` (base64-encoded). Use `setPlayContent` with `extInput:hdmi?port=N` to switch inputs.

Error model: HTTP 200 with JSON-RPC error array `[code, "reason phrase"]`. System codes 0-32767; user codes 32768-65535. Per-service ranges enumerated at the bottom of the source (system 40200-40399, videoScreen 40600-40799, audio 40800-40899, avContent 41000-41099, appControl 41400-41499, encryption 42400-42499).

<!-- UNRESOLVED: HTTP port number is not stated in source; defaulting to 80 is an assumption, mark as unresolved. -->
<!-- UNRESOLVED: BA35-specific PKG / generation firmware coverage is not stated; only BZxxx and BZ40P/BZ35P/BZ30P coverage is explicit in source. -->
<!-- UNRESOLVED: No serial (RS-232 / SDCP) commands are in this source. The recovery notes mention RS-232 ports exist on Sony TVs but the SDCP/IRCC reference is a separate document not refined here. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command
  - https://pro-bravia.sony.net/remote-display-control/serial-control
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
retrieved_at: 2026-06-12T04:25:41.568Z
last_checked_at: 2026-06-12T19:44:57.886Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:44:57.886Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions matched exactly to source JSON-RPC method entries with correct versions, params, and transport parameters confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "BA35-specific PKG / generation firmware support is not stated in the source. APIs that are explicit \"BZxxx series only\" or \"BZ40P/BZ35P/BZ30P only\" are marked as such below."
- "source never states a port; 80 is the HTTP default, mark unresolved"
- "explicit electrical / mechanical safety warnings (voltage, mounting) are not in this REST API reference."
- "HTTP port number is not stated in source; defaulting to 80 is an assumption, mark as unresolved."
- "BA35-specific PKG / generation firmware coverage is not stated; only BZxxx and BZ40P/BZ35P/BZ30P coverage is explicit in source."
- "No serial (RS-232 / SDCP) commands are in this source. The recovery notes mention RS-232 ports exist on Sony TVs but the SDCP/IRCC reference is a separate document not refined here."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
