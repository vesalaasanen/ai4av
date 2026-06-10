---
spec_id: admin/sony-kjx7500-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KJX7500 Series Control Spec"
manufacturer: Sony
model_family: FW-55BZ35F
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - FW-55BZ35F
    - FW-43BZ35J
    - BZ40P
    - BZ35P
    - BZ30P
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
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-06-09T01:40:14.088Z
last_checked_at: 2026-06-09T07:22:56.513Z
generated_at: 2026-06-09T07:22:56.513Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "refined source is the pro-bravia.sony.net REST API Reference. The KJX7500 / X7500F consumer model is not named in source; source explicitly lists FW-55BZ35F, FW-43BZ35J, BZ40P/BZ35P/BZ30P. Application of this spec to KJX7500 Series is unverified."
  - "port not stated in source (no explicit port number anywhere)"
  - "https support not stated in source; all examples use http://"
  - "keep this section empty per source structure."
  - "notification/event API list not present in refined source."
  - "no multi-step sequence macros documented in source."
  - "source contains no safety warnings, interlocks, or power-on sequencing"
  - "port number not stated in source"
  - "HTTPS support not stated in source (all examples plain http://)"
  - "connection-level auth (cookies, headers, PSK) not specified beyond per-method authLevel labels and a single PSK mention in the app-upload appendix"
  - "long-polling notification API list referenced in source but not enumerated"
  - "KJX7500 Series model coverage not stated in source"
  - "firmware range for KJX7500 not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-09T07:22:56.513Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions match verbatim JSON-RPC method names in the source; source has exactly 56 methods with no extras; transport accurately reflects source. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Sony KJX7500 Series Control Spec

## Summary
JSON-RPC-over-HTTP REST API reference for Sony BRAVIA Professional Displays. Each method lives under `http://<Base URL>/<service>` where service is one of `guide`, `appControl`, `audio`, `avContent`, `encryption`, `system`, `video`, `videoScreen`. Requests are JSON objects with `method`, `id`, `params`, `version`; responses carry `result` (or `error`) and the same `id`. Authentication is by per-method authLevel (`none` / `generic` / `private`) rather than connection credentials.

<!-- UNRESOLVED: refined source is the pro-bravia.sony.net REST API Reference. The KJX7500 / X7500F consumer model is not named in source; source explicitly lists FW-55BZ35F, FW-43BZ35J, BZ40P/BZ35P/BZ30P. Application of this spec to KJX7500 Series is unverified. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://<Base URL>/<service>"  # source: every API block; <Base URL> is placeholder
  # UNRESOLVED: port not stated in source (no explicit port number anywhere)
  # UNRESOLVED: https support not stated in source; all examples use http://
auth:
  type: none  # inferred: source shows per-method authLevel labels (none/generic/private), no connection auth or login procedure
```

## Traits
```yaml
- powerable       # inferred from setPowerStatus / getPowerStatus / setPowerSavingMode
- routable        # inferred from setPlayContent / getCurrentExternalInputsStatus / getSourceList
- queryable       # inferred from getPowerStatus / getVolumeInformation / getSystemInformation / etc.
- levelable       # inferred from setAudioVolume / setAudioMute / setPictureQualitySettings
```

## Actions
```yaml
- id: guide_getSupportedApiInfo
  label: Get Supported API Info (v1.0)
  kind: query
  command: '{"method":"getSupportedApiInfo","id":5,"params":[{"services":["system","avContent"]}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/guide", method: POST, content_type: "application/json" }
  params:
    - name: services
      type: string-array
      description: Service names to fetch API info for; null/empty = all

- id: appControl_prepareAppUpload
  label: Prepare App Upload (v1.0) [FW-BZxxx only, localhost]
  kind: action
  command: '{"method":"prepareAppUpload","id":104,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/appControl", method: POST, content_type: "application/json" }
  notes: "FW-BZxxx series, PKG 6.2512+ / gen 5.7.0+; localhost only. Returns assetId (UUIDv4, 5 min TTL)."

- id: appControl_uninstallApp
  label: Uninstall App (v1.0) [FW-BZxxx only, localhost]
  kind: action
  command: '{"method":"uninstallApp","id":106,"params":[{"packageName":"com.sony.dtv.b2b.sample"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/appControl", method: POST, content_type: "application/json" }
  params:
    - name: packageName
      type: string
      required: true

- id: appControl_installApp
  label: Install App (v1.0) [FW-BZxxx only, localhost]
  kind: action
  command: '{"method":"installApp","id":105,"params":[{"assetId":"1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed","afterInstallAction":"startApplication","uri":"android-app://com.sony.dtv.b2b.sample"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/appControl", method: POST, content_type: "application/json" }
  params:
    - name: assetId
      type: string
      required: true
    - name: afterInstallAction
      type: string
      description: "e.g. startApplication"
    - name: uri
      type: string
      description: "android-app:// scheme"

- id: appControl_getTextForm_v1_1
  label: Get Text Form (v1.1, encrypted)
  kind: query
  command: '{"method":"getTextForm","id":60,"params":[{}],"version":"1.1"}'
  transport: { url: "http://<Base URL>/appControl", method: POST, content_type: "application/json" }
  params:
    - name: encKey
      type: string
      description: "RSA-encrypted AES key; default empty"

- id: appControl_setTextForm_v1_1
  label: Set Text Form (v1.1, encrypted)
  kind: action
  command: '{"method":"setTextForm","id":601,"params":[{"encKey":"<RSA-encrypted key>","text":"<ciphertext>"}],"version":"1.1"}'
  transport: { url: "http://<Base URL>/appControl", method: POST, content_type: "application/json" }
  params:
    - name: encKey
      type: string
      required: true
    - name: text
      type: string
      required: true
      description: "UTF-8 text; if encKey set, must be encrypted"

- id: appControl_setTextForm_v1_0
  label: Set Text Form (v1.0, plain)
  kind: action
  command: '{"method":"setTextForm","id":601,"params":["hello world!!"],"version":"1.0"}'
  transport: { url: "http://<Base URL>/appControl", method: POST, content_type: "application/json" }
  params:
    - name: text
      type: string
      required: true
      description: "UTF-8 text"

- id: appControl_terminateApps
  label: Terminate All Apps (v1.0)
  kind: action
  command: '{"method":"terminateApps","id":55,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/appControl", method: POST, content_type: "application/json" }

- id: appControl_setActiveApp
  label: Set Active App (v1.0)
  kind: action
  command: '{"method":"setActiveApp","id":601,"params":[{"uri":"localapp://webappruntime?url=http%3A%2F%2Fexample.com%2F"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/appControl", method: POST, content_type: "application/json" }
  params:
    - name: uri
      type: string
      required: true
      description: "localapp://webappruntime?url=... or ?manifest=... or ?auid=..."

- id: appControl_getApplicationList
  label: Get Application List (v1.0)
  kind: query
  command: '{"method":"getApplicationList","id":60,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/appControl", method: POST, content_type: "application/json" }

- id: appControl_getWebAppStatus
  label: Get WebApp Status (v1.0)
  kind: query
  command: '{"method":"getWebAppStatus","id":1,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/appControl", method: POST, content_type: "application/json" }

- id: appControl_getApplicationStatusList
  label: Get Application Status List (v1.0)
  kind: query
  command: '{"method":"getApplicationStatusList","id":55,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/appControl", method: POST, content_type: "application/json" }

- id: audio_setAudioVolume_v1_0
  label: Set Audio Volume (v1.0)
  kind: action
  command: '{"method":"setAudioVolume","id":601,"params":[{"volume":"18","target":"speaker"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/audio", method: POST, content_type: "application/json" }
  params:
    - name: target
      type: string
      required: true
      description: '""=all, "speaker", "headphone"'
    - name: volume
      type: string
      required: true
      description: '"N" absolute, "+N" / "-N" relative'

- id: audio_getSpeakerSettings
  label: Get Speaker Settings (v1.0) [not BZ40P/BZ35P/BZ30P]
  kind: query
  command: '{"method":"getSpeakerSettings","id":67,"params":[{"target":"tvPosition"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/audio", method: POST, content_type: "application/json" }
  params:
    - name: target
      type: string
      description: '""=all, "tvPosition", "subwooferLevel", "subwooferFreq", "subwooferPhase", "subwooferPower"'

- id: audio_getVolumeInformation
  label: Get Volume Information (v1.0)
  kind: query
  command: '{"method":"getVolumeInformation","id":33,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/audio", method: POST, content_type: "application/json" }

- id: audio_setAudioMute
  label: Set Audio Mute (v1.0)
  kind: action
  command: '{"method":"setAudioMute","id":601,"params":[{"status":true}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/audio", method: POST, content_type: "application/json" }
  params:
    - name: status
      type: boolean
      required: true

- id: audio_setAudioVolume_v1_2
  label: Set Audio Volume (v1.2)
  kind: action
  command: '{"method":"setAudioVolume","id":98,"params":[{"volume":"5","ui":"on","target":"speaker"}],"version":"1.2"}'
  transport: { url: "http://<Base URL>/audio", method: POST, content_type: "application/json" }
  params:
    - name: target
      type: string
      required: true
    - name: volume
      type: string
      required: true
    - name: ui
      type: string
      description: '"on" / "off" / null'

- id: audio_setSoundSettings
  label: Set Sound Settings (v1.1)
  kind: action
  command: '{"method":"setSoundSettings","id":5,"params":[{"settings":[{"value":"speaker","target":"outputTerminal"}]}],"version":"1.1"}'
  transport: { url: "http://<Base URL>/audio", method: POST, content_type: "application/json" }
  params:
    - name: settings
      type: object-array
      required: true
      description: "target/value pairs; e.g. outputTerminal: speaker/speaker_hdmi/hdmi/audioSystem"

- id: audio_setSpeakerSettings
  label: Set Speaker Settings (v1.0) [not BZ40P/BZ35P/BZ30P]
  kind: action
  command: '{"method":"setSpeakerSettings","id":62,"params":[{"settings":[{"value":"wallMount","target":"tvPosition"}]}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/audio", method: POST, content_type: "application/json" }
  params:
    - name: settings
      type: object-array
      required: true

- id: avContent_setPlayContent
  label: Set Play Content (v1.0)
  kind: action
  command: '{"method":"setPlayContent","id":101,"params":[{"uri":"extInput:hdmi?port=2"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/avContent", method: POST, content_type: "application/json" }
  params:
    - name: uri
      type: string
      required: true
      description: "extInput:hdmi?port=N, etc. (URI from getContentList)"

- id: avContent_getCurrentExternalInputsStatus_v1_1
  label: Get Current External Inputs Status (v1.1)
  kind: query
  command: '{"method":"getCurrentExternalInputsStatus","id":105,"params":[],"version":"1.1"}'
  transport: { url: "http://<Base URL>/avContent", method: POST, content_type: "application/json" }

- id: avContent_getCurrentExternalInputsStatus_v1_0
  label: Get Current External Inputs Status (v1.0)
  kind: query
  command: '{"method":"getCurrentExternalInputsStatus","id":105,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/avContent", method: POST, content_type: "application/json" }

- id: avContent_getPlayingContentInfo
  label: Get Playing Content Info (v1.0)
  kind: query
  command: '{"method":"getPlayingContentInfo","id":103,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/avContent", method: POST, content_type: "application/json" }

- id: avContent_getContentCount_v1_0
  label: Get Content Count (v1.0)
  kind: query
  command: '{"method":"getContentCount","id":11,"params":[{"source":"extInput:hdmi"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/avContent", method: POST, content_type: "application/json" }
  params:
    - name: source
      type: string
      required: true
    - name: type
      type: string
      description: "default empty"

- id: avContent_getContentCount_v1_1
  label: Get Content Count (v1.1)
  kind: query
  command: '{"method":"getContentCount","id":11,"params":[{"source":"extInput:hdmi"}],"version":"1.1"}'
  transport: { url: "http://<Base URL>/avContent", method: POST, content_type: "application/json" }
  params:
    - name: source
      type: string
      required: true
    - name: type
      type: string
    - name: target
      type: string

- id: avContent_getContentList_v1_5
  label: Get Content List (v1.5)
  kind: query
  command: '{"method":"getContentList","id":88,"params":[{"stIdx":0,"cnt":50,"uri":"extInput:hdmi"}],"version":"1.5"}'
  transport: { url: "http://<Base URL>/avContent", method: POST, content_type: "application/json" }
  params:
    - name: uri
      type: string
    - name: stIdx
      type: integer
      default: 0
    - name: cnt
      type: integer
      default: 50
      description: "max 200, device-specific"

- id: avContent_getSchemeList
  label: Get Scheme List (v1.0)
  kind: query
  command: '{"method":"getSchemeList","id":1,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/avContent", method: POST, content_type: "application/json" }

- id: avContent_getSourceList
  label: Get Source List (v1.0)
  kind: query
  command: '{"method":"getSourceList","id":1,"params":[{"scheme":"extInput"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/avContent", method: POST, content_type: "application/json" }
  params:
    - name: scheme
      type: string
      required: true

- id: encryption_getPublicKey
  label: Get Public Key (v1.0)
  kind: query
  command: '{"method":"getPublicKey","id":1,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/encryption", method: POST, content_type: "application/json" }
  notes: "Returns RSA public key for data encryption (see Data Encryption doc)."

- id: system_getScreenshot
  label: Get Screenshot (v1.0) [FW-BZxxx gen 5.7.0+, localhost]
  kind: query
  command: '{"method":"getScreenshot","id":51,"params":[{"plane":"video"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }
  params:
    - name: plane
      type: string
      default: mixed
      description: '"video", "graphics", "mixed"'
  notes: "Returns Base64-encoded 320x180 (or 1920x1080) jpeg."

- id: system_setPowerSavingMode
  label: Set Power Saving Mode (v1.0)
  kind: action
  command: '{"method":"setPowerSavingMode","id":52,"params":[{"mode":"pictureOff"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }
  params:
    - name: mode
      type: string
      required: true
      description: '"off", "low", "high", "pictureOff"'

- id: system_getCurrentTime_v1_0
  label: Get Current Time (v1.0)
  kind: query
  command: '{"method":"getCurrentTime","id":51,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }

- id: system_getCurrentTime_v1_1
  label: Get Current Time (v1.1)
  kind: query
  command: '{"method":"getCurrentTime","id":51,"params":[],"version":"1.1"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }
  notes: "Adds timeZoneOffsetMinute + dstOffsetMinute."

- id: system_getNetworkSettings
  label: Get Network Settings (v1.0)
  kind: query
  command: '{"method":"getNetworkSettings","id":2,"params":[{"netif":"eth0"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }
  params:
    - name: netif
      type: string
      default: ""
      description: '""=all, "eth0", "wlan0", "p2p1"'

- id: system_getInterfaceInformation
  label: Get Interface Information (v1.0)
  kind: query
  command: '{"method":"getInterfaceInformation","id":33,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }

- id: system_getRemoteDeviceSettings
  label: Get Remote Device Settings (v1.0)
  kind: query
  command: '{"method":"getRemoteDeviceSettings","id":44,"params":[{"target":"accessPermission"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }
  params:
    - name: target
      type: string
      default: ""
      description: '""=all, "accessPermission"'

- id: system_getLEDIndicatorStatus
  label: Get LED Indicator Status (v1.0)
  kind: query
  command: '{"method":"getLEDIndicatorStatus","id":45,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }

- id: system_getPowerSavingMode
  label: Get Power Saving Mode (v1.0)
  kind: query
  command: '{"method":"getPowerSavingMode","id":51,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }

- id: system_getPowerStatus
  label: Get Power Status (v1.0)
  kind: query
  command: '{"method":"getPowerStatus","id":50,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }
  notes: "Some devices may not respond in power-off state."

- id: system_getRemoteControllerInfo
  label: Get Remote Controller Info (v1.0)
  kind: query
  command: '{"method":"getRemoteControllerInfo","id":54,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }
  notes: "Returns IRCC codes (Base64) for each remote button."

- id: system_getSystemInformation_v1_0
  label: Get System Information (v1.0)
  kind: query
  command: '{"method":"getSystemInformation","id":33,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }

- id: system_getSystemInformation_v1_7
  label: Get System Information (v1.7)
  kind: query
  command: '{"method":"getSystemInformation","id":33,"params":[],"version":"1.7"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }
  notes: "Adds fwVersion, androidOs, webAppRuntimeVersion, mode (Pro/Normal/ProSettings)."

- id: system_getSystemSupportedFunction
  label: Get System Supported Function (v1.0)
  kind: query
  command: '{"method":"getSystemSupportedFunction","id":55,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }
  notes: "e.g. WOL option returning MAC address of active NIC."

- id: system_getWolMode
  label: Get WoL Mode (v1.0)
  kind: query
  command: '{"method":"getWolMode","id":50,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }

- id: system_requestReboot
  label: Request Reboot (v1.0)
  kind: action
  command: '{"method":"requestReboot","id":10,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }

- id: system_setLEDIndicatorStatus
  label: Set LED Indicator Status (v1.1)
  kind: action
  command: '{"method":"setLEDIndicatorStatus","id":53,"params":[{"mode":"Demo","status":"true"}],"version":"1.1"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }
  params:
    - name: mode
      type: string
      required: true
      description: '"Demo", "AutoBrightnessAdjust", "Dark", "SimpleResponse", "Off"'
    - name: status
      type: string
      description: '"true", "false", null'

- id: system_setPowerStatus
  label: Set Power Status (v1.0)
  kind: action
  command: '{"method":"setPowerStatus","id":55,"params":[{"status":false}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }
  params:
    - name: status
      type: boolean
      required: true
  notes: "Power-on only supported from 'Sleep' mode. Requires 'Remote start' (Settings > Network) to be ON."

- id: system_setWolMode
  label: Set WoL Mode (v1.0)
  kind: action
  command: '{"method":"setWolMode","id":55,"params":[{"enabled":false}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/system", method: POST, content_type: "application/json" }
  params:
    - name: enabled
      type: boolean
      required: true

- id: video_getScreenRotation
  label: Get Screen Rotation (v1.0) [FW-BZxxx gen 5.7.0+, localhost]
  kind: query
  command: '{"method":"getScreenRotation","id":52,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/video", method: POST, content_type: "application/json" }

- id: video_setScreenRotation
  label: Set Screen Rotation (v1.0) [FW-BZxxx gen 5.7.0+, localhost]
  kind: action
  command: '{"method":"setScreenRotation","id":53,"params":[{"rotation":0}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/video", method: POST, content_type: "application/json" }
  params:
    - name: rotation
      type: integer
      required: true
      description: "0, 90, 180, 270"

- id: video_getPictureQualitySettings_v1_0
  label: Get Picture Quality Settings (v1.0)
  kind: query
  command: '{"method":"getPictureQualitySettings","id":52,"params":[{"target":"color"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/video", method: POST, content_type: "application/json" }
  params:
    - name: target
      type: string
      default: ""
      description: '""=all, "color", "brightness", "contrast", "sharpness", "pictureMode", "lightSensor", "colorSpace", "colorTemperature", "autoPictureMode", "hdrMode", "autoLocalDimming", "xtendedDynamicRange"'

- id: video_getPictureQualitySettings_v1_1
  label: Get Picture Quality Settings (v1.1)
  kind: query
  command: '{"method":"getPictureQualitySettings","id":52,"params":[{"target":"color"}],"version":"1.1"}'
  transport: { url: "http://<Base URL>/video", method: POST, content_type: "application/json" }
  params:
    - name: target
      type: string
      default: ""

- id: video_setPictureQualitySettings_v1_0
  label: Set Picture Quality Settings (v1.0)
  kind: action
  command: '{"method":"setPictureQualitySettings","id":12,"params":[{"settings":[{"value":"2","target":"color"}]}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/video", method: POST, content_type: "application/json" }
  params:
    - name: settings
      type: object-array
      required: true
      description: "target/value pairs"

- id: video_setPictureQualitySettings_v1_1
  label: Set Picture Quality Settings (v1.1) - multi-target
  kind: action
  command: '{"method":"setPictureQualitySettings","id":12,"params":[{"settings":[{"value":"50","target":"color"},{"value":"standard","target":"pictureMode"}]}],"version":"1.1"}'
  transport: { url: "http://<Base URL>/video", method: POST, content_type: "application/json" }
  params:
    - name: settings
      type: object-array
      required: true
  notes: "HDMI signal format targets: specify only one target per request to avoid failure."

- id: videoScreen_getSceneSetting
  label: Get Scene Setting (v1.0) [not BZ40P/BZ35P/BZ30P]
  kind: query
  command: '{"method":"getSceneSetting","id":79,"params":[],"version":"1.0"}'
  transport: { url: "http://<Base URL>/videoScreen", method: POST, content_type: "application/json" }

- id: videoScreen_setSceneSetting
  label: Set Scene Setting (v1.0) [not BZ40P/BZ35P/BZ30P]
  kind: action
  command: '{"method":"setSceneSetting","id":40,"params":[{"value":"auto"}],"version":"1.0"}'
  transport: { url: "http://<Base URL>/videoScreen", method: POST, content_type: "application/json" }
  params:
    - name: value
      type: string
      required: true
      description: '"auto", "auto24pSync", "general"'
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  source: system/getPowerStatus
  values: [standby, active]

- id: power_saving_mode
  type: enum
  source: system/getPowerSavingMode
  values: [off, low, high, pictureOff]

- id: volume
  type: integer
  source: audio/getVolumeInformation
  notes: "Per target (speaker / headphone); bounds reported in same response (minVolume, maxVolume)."

- id: mute
  type: boolean
  source: audio/getVolumeInformation

- id: input_source
  type: string
  source: avContent/getPlayingContentInfo
  notes: "URI form, e.g. extInput:hdmi?port=2."

- id: input_connection_status
  type: string
  source: avContent/getCurrentExternalInputsStatus
  values: ["true", "false", null]
  notes: "null = unknown; per-input."

- id: device_time
  type: string
  source: system/getCurrentTime
  notes: "ISO8601."

- id: time_zone_offset_minute
  type: integer
  source: system/getCurrentTime (v1.1)
  range: "±(23*60+59)"

- id: dst_offset_minute
  type: integer
  source: system/getCurrentTime (v1.1)
  range: "±(23*60+59)"

- id: led_indicator_mode
  type: enum
  source: system/getLEDIndicatorStatus
  values: [Demo, AutoBrightnessAdjust, Dark, SimpleResponse, Off]

- id: led_indicator_on
  type: string
  source: system/getLEDIndicatorStatus
  values: ["true", "false", null]

- id: wol_mode
  type: boolean
  source: system/getWolMode

- id: wol_supported_mac
  type: string
  source: system/getSystemSupportedFunction
  notes: "value when option=WOL; MAC address of active NIC."

- id: remote_start
  type: enum
  source: system/getRemoteDeviceSettings
  values: [on, off]
  notes: '"accessPermission".'

- id: current_scene
  type: enum
  source: videoScreen/getSceneSetting
  values: [auto, auto24pSync, general]

- id: screen_rotation
  type: integer
  source: video/getScreenRotation
  values: [0, 90, 180, 270]

- id: tv_position
  type: enum
  source: audio/getSpeakerSettings (target=tvPosition)
  values: [tableTop, wallMount]

- id: subwoofer_level
  type: integer
  source: audio/getSpeakerSettings (target=subwooferLevel)
  range: "0..24, step 1"

- id: subwoofer_freq
  type: integer
  source: audio/getSpeakerSettings (target=subwooferFreq)
  range: "0..30, step 1"

- id: subwoofer_phase
  type: enum
  source: audio/getSpeakerSettings (target=subwooferPhase)
  values: [normal, reverse]

- id: subwoofer_power
  type: enum
  source: audio/getSpeakerSettings (target=subwooferPower)
  values: [on, off]

- id: system_generation
  type: string
  source: system/getSystemInformation
  notes: 'X.Y.Z version string; equals interfaceVersion.'

- id: interface_version
  type: string
  source: system/getInterfaceInformation
  notes: 'X.Y.Z version string.'

- id: product_category
  type: string
  source: system/getInterfaceInformation
  notes: "BRAVIA Professional Display returns fixed 'tv'."

- id: product_name
  type: string
  source: system/getInterfaceInformation
  notes: "BRAVIA Professional Display returns fixed 'BRAVIA'."

- id: device_serial
  type: string
  source: system/getSystemInformation
  notes: "Per-device serial, default empty string."

- id: device_mac
  type: string
  source: system/getSystemInformation
  notes: 'xx:xx:xx:xx:xx:xx; only one NIC active.'

- id: device_language
  type: string
  source: system/getSystemInformation
  notes: "ISO-639 alpha-3."

- id: device_model
  type: string
  source: system/getSystemInformation
  notes: "e.g. FW-55BZ35F, FW-43BZ35J."

- id: device_name
  type: string
  source: system/getSystemInformation
  notes: "BRAVIA Professional Display returns fixed 'BRAVIA'."

- id: fw_version
  type: string
  source: system/getSystemInformation (v1.7)
  notes: "BRAVIA software version, e.g. PKG0.6.0.81.00.1.00.0951BBA."

- id: android_os_version
  type: string
  source: system/getSystemInformation (v1.7)

- id: webapp_runtime_version
  type: string
  source: system/getSystemInformation (v1.7)

- id: pro_mode
  type: enum
  source: system/getSystemInformation (v1.7)
  values: [Normal, ProSettings, Pro]

- id: ircc_button_name
  type: string
  source: system/getRemoteControllerInfo
  notes: '2nd result element; name/value pair (value=Base64 IRCC code).'

- id: ircc_button_value
  type: string
  source: system/getRemoteControllerInfo
  notes: "Base64 IRCC code; see IRCC-IP table in Notes."

- id: remote_bundle_type
  type: string
  source: system/getRemoteControllerInfo
  notes: 'e.g. IR_REMOTE_BUNDLE_TYPE_AEP; 1st result element.'

- id: screenshot_jpeg
  type: string
  source: system/getScreenshot
  notes: "Base64-encoded jpeg (320x180 or 1920x1080)."

- id: public_key
  type: string
  source: encryption/getPublicKey
  notes: "RSA public key (PEM-like Base64)."

- id: scheme_list
  type: string-array
  source: avContent/getSchemeList

- id: source_list
  type: string-array
  source: avContent/getSourceList

- id: content_list
  type: object-array
  source: avContent/getContentList
  notes: "uri/title/index entries."

- id: content_count
  type: integer
  source: avContent/getContentCount

- id: application_list
  type: object-array
  source: appControl/getApplicationList
  notes: "title/uri/icon entries."

- id: webapp_status
  type: object
  source: appControl/getWebAppStatus
  fields: [active: boolean, url: string]

- id: application_status_list
  type: object-array
  source: appControl/getApplicationStatusList
  notes: 'name: textInput/cursorDisplay/webBrowse; status: on/off.'

- id: appupload_asset_id
  type: string
  source: appControl/prepareAppUpload
  notes: "UUIDv4; 5-minute TTL."
```

## Variables
```yaml
# No "Variables" section in source - every parameter is delivered as a discrete method call
# (e.g. setAudioVolume for volume, setPowerStatus for power). Marked as N/A.
# UNRESOLVED: keep this section empty per source structure.
```

## Events
```yaml
# Source references "Supported Notification APIs" as a sub-element of the getSupportedApiInfo
# response. Concrete notification/event methods are not enumerated in the refined source.
# UNRESOLVED: notification/event API list not present in refined source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequence macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing
# requirements. The setPowerStatus note ("power-on supported only in Sleep mode;
# requires Remote start ON") is a precondition, not a safety interlock.
```

## Notes
- All API requests are JSON-RPC 2.0-style POSTs to `http://<Base URL>/<service>` with `Content-Type: application/json`. Body shape: `{"method":"...","id":<int>,"params":[...],"version":"<x.y>"}`. Response: `{"result":[...],"id":<int>}` or `{"error":[<code>,"<msg>"],"id":<int>}`.
- `authLevel` is a per-method access tier label, not connection auth. Values: `none`, `generic`, `private`. Source does not document any credentials or pre-shared key negotiation flow on the wire (the `Encryption` service provides RSA public keys for app-level text encryption; PSK is mentioned only in the appControl upload step as "must be included in the POST header").
- The `<Base URL>` placeholder is literal in source — actual port not stated. Source examples use `http://<ip>/sony/appupload/{assetId}` for APK upload (path only, no port).
- Several methods are explicitly restricted to "FW-BZxxx series, firmware PKG 6.2512 or later, generation version 5.7.0 or later, and can be called via localhost (127.0.0.1) only": prepareAppUpload, uninstallApp, installApp, getScreenshot, getScreenRotation, setScreenRotation.
- getSpeakerSettings / setSpeakerSettings / getSceneSetting / setSceneSetting are explicitly NOT supported on BZ40P / BZ35P / BZ30P.
- getScreenshot returns 320x180 by default; with PKG 6.5603.0175+ it may return 1920x1080.
- getTextForm/setTextForm v1.1 require RSA-encrypted `encKey`; otherwise error #3 "Illegal Argument".
- getRemoteControllerInfo returns Base64 IRCC codes. Sample subset (verbatim from source Appendix):
  - PowerOff / Sleep / SleepTimer → `AAAAAQAAAAEAAAAvAw==`
  - Display → `AAAAAQAAAAEAAAA6Aw==`
  - Home → `AAAAAQAAAAEAAABgAw==`
  - Up → `AAAAAQAAAAEAAAB0Aw==`
  - Down → `AAAAAQAAAAEAAAB1Aw==`
  - Left → `AAAAAQAAAAEAAAA0Aw==`
  - Right → `AAAAAQAAAAEAAAAzAw==`
  - Confirm → `AAAAAQAAAAEAAABlAw==`
  - Num0..Num9 → `AAAAAQAAAAEAAAAJAw==`..`AAAAAQAAAAEAAAAIAw==`
  - VolumeUp → `AAAAAQAAAAEAAAASAw==`
  - VolumeDown → `AAAAAQAAAAEAAAATAw==`
  - Mute → `AAAAAQAAAAEAAAAUAw==`
  - Hdmi1..Hdmi4 → `AAAAAgAAABoAAABaAw==`..`AAAAAgAAABoAAABdAw==`
  - PicOff / PictureOff → `AAAAAQAAAAEAAAA+Aw==`
- HTTP status codes used: 200, 401, 403, 404, 413, 414, 501, 503. JSON error codes (subset): 1 Any, 2 Timeout, 3 Illegal Argument, 5 Illegal Request, 7 Illegal State, 12 No Such Method, 14 Unsupported Version, 15 Unsupported Operation, 40000-40006 common, 40200-40201 system, 40600 videoScreen, 40800-40801 audio, 41000-41024 avContent, 41400-41403 appControl, 42400 encryption.
- Compatible model coverage: source names "BRAVIA Professional Display" with concrete examples FW-55BZ35F and FW-43BZ35J, and explicitly excludes BZ40P / BZ35P / BZ30P from a subset of APIs. The KJX7500 / X7500F consumer model is not named anywhere in the refined source; whether this REST API surface applies to it is unverified.

<!-- UNRESOLVED: port number not stated in source -->
<!-- UNRESOLVED: HTTPS support not stated in source (all examples plain http://) -->
<!-- UNRESOLVED: connection-level auth (cookies, headers, PSK) not specified beyond per-method authLevel labels and a single PSK mention in the app-upload appendix -->
<!-- UNRESOLVED: long-polling notification API list referenced in source but not enumerated -->
<!-- UNRESOLVED: KJX7500 Series model coverage not stated in source -->
<!-- UNRESOLVED: firmware range for KJX7500 not stated in source -->
```

---

Self-check:
- No voltage/current/power specs invented ✓
- No port assumed ✓
- No baud assumed ✓
- `status: draft` ✓
- `declared_confidence: low` ✓
- YAML syntax clean (quoted JSON in command fields, colon inside single-quoted description strings) ✓
- `entity_id` populated from user input ✓
- UNRESOLVED markers throughout ✓
- All distinct method rows enumerated as separate actions ✓
- Verbatim payloads copied (JSON example values used as `command` template) ✓
- Per-method authLevel kept as connection-auth note ✓
- Auth marked as inferred (Tier 2) since source shows no connection login ✓

Output spec follows.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-06-09T01:40:14.088Z
last_checked_at: 2026-06-09T07:22:56.513Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:22:56.513Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions match verbatim JSON-RPC method names in the source; source has exactly 56 methods with no extras; transport accurately reflects source. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "refined source is the pro-bravia.sony.net REST API Reference. The KJX7500 / X7500F consumer model is not named in source; source explicitly lists FW-55BZ35F, FW-43BZ35J, BZ40P/BZ35P/BZ30P. Application of this spec to KJX7500 Series is unverified."
- "port not stated in source (no explicit port number anywhere)"
- "https support not stated in source; all examples use http://"
- "keep this section empty per source structure."
- "notification/event API list not present in refined source."
- "no multi-step sequence macros documented in source."
- "source contains no safety warnings, interlocks, or power-on sequencing"
- "port number not stated in source"
- "HTTPS support not stated in source (all examples plain http://)"
- "connection-level auth (cookies, headers, PSK) not specified beyond per-method authLevel labels and a single PSK mention in the app-upload appendix"
- "long-polling notification API list referenced in source but not enumerated"
- "KJX7500 Series model coverage not stated in source"
- "firmware range for KJX7500 not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
