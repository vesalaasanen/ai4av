---
spec_id: admin/sony-kxmx9000-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "Sony KMX9000 Series Control Spec"
manufacturer: Sony
model_family: "KMX9000 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KMX9000 Series"
    - "FW-BZxxx series"
    - "BRAVIA Professional Display"
  firmware: "PKG 6.2512 or later (generation 5.7.0 or later) for appControl/screenshot APIs"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-06-10T19:42:03.725Z
last_checked_at: 2026-06-11T13:46:48.716Z
generated_at: 2026-06-11T13:46:48.716Z
firmware_coverage: "PKG 6.2512 or later (generation 5.7.0 or later) for appControl/screenshot APIs"
protocol_coverage: []
known_gaps:
  - "TCP port not stated in source — port 80 (HTTP default) inferred but not confirmed"
  - "PSK (pre-shared key) header name + format not specified in source beyond \"must be included in the POST header\""
  - "port not stated in source; port 80 assumed (do not assume for non-HTTP variants)"
  - "port number not stated in source"
  - "source mentions \"notifications\" in getSupportedApiInfo response schema but"
  - "PSK header field name not stated in source"
  - "no explicit safety warnings, interlock procedures, or power-on sequencing"
verification:
  verdict: verified
  checked_at: 2026-06-11T13:46:48.716Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions (distinct JSON-RPC method/version pairs across 6 service endpoints) found verbatim in source with matching auth levels, params, and transport paths. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Sony KMX9000 Series Control Spec

## Summary
Sony BRAVIA Professional Display (KMX9000 / FW-BZxxx series) controlled via JSON-RPC over HTTP. Each service endpoint is a URL: `http://<Base URL>/<service>` where service is one of `guide`, `appControl`, `audio`, `avContent`, `encryption`, `system`. Requests are JSON-RPC envelopes `{"method": "...", "id": N, "params": [...], "version": "X.Y"}` posted to the service URL; responses are `{"result": [...], "id": N}`. Authentication is per-endpoint with three levels: `none`, `generic` (PSK header), `private` (local only). The full FW-BZxxx + appControl/screenshot subset requires firmware PKG 6.2512 or later (generation 5.7.0+) and 127.0.0.1 access.

<!-- UNRESOLVED: TCP port not stated in source — port 80 (HTTP default) inferred but not confirmed -->
<!-- UNRESOLVED: PSK (pre-shared key) header name + format not specified in source beyond "must be included in the POST header" -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://<device-ip>/<service>"  # service ∈ guide, appControl, audio, avContent, encryption, system
  # UNRESOLVED: port not stated in source; port 80 assumed (do not assume for non-HTTP variants)
  port: null  # UNRESOLVED: port number not stated in source
auth:
  # Per-endpoint auth level varies: none | generic | private
  # generic = PSK required in HTTP header; private = localhost (127.0.0.1) only
  # No single device-wide auth credential exists in source
  type: none  # inferred: guide/getVolumeInformation/getSchemeList/etc. require no auth; PSK is per-endpoint not device-wide
  notes: |
    Each API declares its own Authentication Level (none | generic | private).
    generic endpoints require a PSK in the HTTP request header.
    private endpoints are restricted to 127.0.0.1 (localhost) callers.
    For APK upload POST to /sony/appupload/{assetId}, PSK is mandatory in header.
    Source does not specify PSK header field name or key format.
```

## Traits
```yaml
- powerable       # getPowerStatus, getPowerSavingMode, setPowerSavingMode present
- routable        # setPlayContent, getCurrentExternalInputsStatus, getSourceList present
- queryable       # getPowerStatus, getVolumeInformation, getSystemInformation, getNetworkSettings present
- levelable       # setAudioVolume, setAudioMute, setSoundSettings, setSpeakerSettings present
- app_controllable # setActiveApp, installApp, terminateApps present (FW-BZxxx, localhost)
```

## Actions
```yaml
# ===== guide service =====
- id: getSupportedApiInfo
  label: Get Supported API Info
  kind: query
  command: '{"method":"getSupportedApiInfo","id":5,"params":[{"services":["system","avContent"]}],"version":"1.0"}'
  params:
    - name: services
      type: string-array
      description: Services to fetch API information. Null/empty = all services.
  transport:
    method: POST
    url: "http://<Base URL>/guide"
  auth_level: none

# ===== appControl service =====
- id: prepareAppUpload
  label: Prepare App Upload
  kind: action
  command: '{"method":"prepareAppUpload","id":104,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/appControl"
  auth_level: generic
  notes: |
    Returns assetId (UUIDv4). Then POST APK to http://{ip}/sony/appupload/{assetId} with PSK in header.
    assetId expires after 5 minutes. FW-BZxxx series, firmware PKG 6.2512+, generation 5.7.0+, localhost only.

- id: uninstallApp
  label: Uninstall App
  kind: action
  command: '{"method":"uninstallApp","id":106,"params":[{"packageName":"com.sony.dtv.b2b.sample"}],"version":"1.0"}'
  params:
    - name: packageName
      type: string
      description: Package name of the app to uninstall.
  transport:
    method: POST
    url: "http://<Base URL>/appControl"
  auth_level: generic
  notes: FW-BZxxx series, firmware PKG 6.2512+, generation 5.7.0+, localhost only.

- id: installApp
  label: Install App
  kind: action
  command: '{"method":"installApp","id":105,"params":[{"assetId":"1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed","afterInstallAction":"startApplication","uri":"android-app://com.sony.dtv.b2b.sample"}],"version":"1.0"}'
  params:
    - name: assetId
      type: string
      description: Asset ID returned from prepareAppUpload.
    - name: afterInstallAction
      type: string
      description: "\"startApplication\" to launch with uri param."
    - name: uri
      type: string
      description: android-app:// URI scheme per Android Intent spec.
  transport:
    method: POST
    url: "http://<Base URL>/appControl"
  auth_level: generic
  notes: FW-BZxxx series, firmware PKG 6.2512+, generation 5.7.0+, localhost only.

- id: setTextForm_v1_1
  label: Set Text Form (v1.1, encrypted)
  kind: action
  command: '{"method":"setTextForm","id":601,"params":[{"encKey":"<RSA-encrypted key>","text":"<UTF-8 or RSA-encrypted text>"}],"version":"1.1"}'
  params:
    - name: encKey
      type: string
      description: RSA-encrypted encryption key. Default "" = not encrypted.
    - name: text
      type: string
      description: UTF-8 text data. If encKey is set, text must be RSA-encrypted.
  transport:
    method: POST
    url: "http://<Base URL>/appControl"
  auth_level: generic
  notes: Error #3 if encKey omitted.

- id: setTextForm_v1_0
  label: Set Text Form (v1.0)
  kind: action
  command: '{"method":"setTextForm","id":601,"params":["hello world!!"],"version":"1.0"}'
  params:
    - name: text
      type: string
      description: UTF-8 text data.
  transport:
    method: POST
    url: "http://<Base URL>/appControl"
  auth_level: generic

- id: terminateApps
  label: Terminate All Apps
  kind: action
  command: '{"method":"terminateApps","id":55,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/appControl"
  auth_level: generic

- id: setActiveApp
  label: Set Active App (Launch App)
  kind: action
  command: '{"method":"setActiveApp","id":601,"params":[{"uri":"localapp://webappruntime?url=http%3A%2F%2Fexample.com%2F"}],"version":"1.0"}'
  params:
    - name: uri
      type: string
      description: |
        App URI. One of:
        "localapp://webappruntime?url=<target_url>"  - launch target_url
        "localapp://webappruntime?manifest=<manifest_url>"  - launch app in manifest_url
        "localapp://webappruntime?auid=<application_unique_id>"  - launch app in auid from USB
  transport:
    method: POST
    url: "http://<Base URL>/appControl"
  auth_level: generic

- id: getApplicationList
  label: Get Application List
  kind: query
  command: '{"method":"getApplicationList","id":60,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/appControl"
  auth_level: private

- id: getWebAppStatus
  label: Get WebApp Status
  kind: query
  command: '{"method":"getWebAppStatus","id":1,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/appControl"
  auth_level: private

- id: getApplicationStatusList
  label: Get Application Status List
  kind: query
  command: '{"method":"getApplicationStatusList","id":55,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/appControl"
  auth_level: none
  notes: Returns status for textInput, cursorDisplay, webBrowse apps.

- id: getTextForm
  label: Get Text Form
  kind: query
  command: '{"method":"getTextForm","id":60,"params":[{"encKey":"<RSA-encrypted key>"}],"version":"1.1"}'
  params:
    - name: encKey
      type: string
      description: RSA-encrypted key. Must be set or error #3 returned.
  transport:
    method: POST
    url: "http://<Base URL>/appControl"
  auth_level: private

# ===== audio service =====
- id: setAudioVolume_v1_0
  label: Set Audio Volume (v1.0)
  kind: action
  command: '{"method":"setAudioVolume","id":601,"params":[{"volume":"18","target":"speaker"}],"version":"1.0"}'
  params:
    - name: volume
      type: string
      description: '"N" = set to N, "+N" = increase by N, "-N" = decrease by N (numeric string).'
    - name: target
      type: string
      description: '"speaker" | "headphone" | "" (all outputs).'
  transport:
    method: POST
    url: "http://<Base URL>/audio"
  auth_level: generic

- id: setAudioVolume_v1_2
  label: Set Audio Volume (v1.2)
  kind: action
  command: '{"method":"setAudioVolume","id":98,"params":[{"volume":"5","ui":"on","target":"speaker"}],"version":"1.2"}'
  params:
    - name: volume
      type: string
      description: '"N" | "+N" | "-N" (numeric string).'
    - name: target
      type: string
      description: '"speaker" | "headphone" | "".'
    - name: ui
      type: string
      description: '"on" = show volume bar, "off" = hide, null = unspecified.'
  transport:
    method: POST
    url: "http://<Base URL>/audio"
  auth_level: generic

- id: getSpeakerSettings
  label: Get Speaker Settings
  kind: query
  command: '{"method":"getSpeakerSettings","id":67,"params":[{"target":"tvPosition"}],"version":"1.0"}'
  params:
    - name: target
      type: string
      description: |
        "" = all targets; or one of:
        "tvPosition" | "subwooferLevel" | "subwooferFreq" | "subwooferPhase" | "subwooferPower"
  transport:
    method: POST
    url: "http://<Base URL>/audio"
  auth_level: none

- id: getVolumeInformation
  label: Get Volume Information
  kind: query
  command: '{"method":"getVolumeInformation","id":33,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/audio"
  auth_level: none

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  command: '{"method":"setAudioMute","id":601,"params":[{"status":true}],"version":"1.0"}'
  params:
    - name: status
      type: boolean
      description: true = mute, false = unmute.
  transport:
    method: POST
    url: "http://<Base URL>/audio"
  auth_level: generic

- id: setSoundSettings
  label: Set Sound Settings
  kind: action
  command: '{"method":"setSoundSettings","id":5,"params":[{"settings":[{"value":"speaker","target":"outputTerminal"}]}],"version":"1.1"}'
  params:
    - name: settings
      type: object-array
      description: Array of {target, value} pairs.
    - name: settings[].target
      type: string
      description: '"outputTerminal" only (per source).'
    - name: settings[].value
      type: string
      description: '"speaker" | "speaker_hdmi" | "hdmi" | "audioSystem".'
  transport:
    method: POST
    url: "http://<Base URL>/audio"
  auth_level: generic

- id: setSpeakerSettings
  label: Set Speaker Settings
  kind: action
  command: '{"method":"setSpeakerSettings","id":62,"params":[{"settings":[{"value":"wallMount","target":"tvPosition"}]}],"version":"1.0"}'
  params:
    - name: settings
      type: object-array
      description: Array of {target, value} pairs.
    - name: settings[].target
      type: string
      description: |
        "tvPosition" | "subwooferLevel" (0-24, step 1, device-specific) |
        "subwooferFreq" (0-30, step 1) | "subwooferPhase" | "subwooferPower"
    - name: settings[].value
      type: string
      description: Target-specific value (e.g. "tableTop"/"wallMount" for tvPosition; "normal"/"reverse" for phase; "on"/"off" for power).
  transport:
    method: POST
    url: "http://<Base URL>/audio"
  auth_level: generic

# ===== avContent service =====
- id: setPlayContent
  label: Set Play Content (route input)
  kind: action
  command: '{"method":"setPlayContent","id":101,"params":[{"uri":"extInput:hdmi?port=2"}],"version":"1.0"}'
  params:
    - name: uri
      type: string
      description: Content URI from getContentList. Example: "extInput:hdmi?port=2".
  transport:
    method: POST
    url: "http://<Base URL>/avContent"
  auth_level: generic
  notes: Does not play USB media files or DLNA media.

- id: getCurrentExternalInputsStatus_v1_1
  label: Get Current External Inputs Status (v1.1, with status field)
  kind: query
  command: '{"method":"getCurrentExternalInputsStatus","id":105,"params":[],"version":"1.1"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/avContent"
  auth_level: none

- id: getCurrentExternalInputsStatus_v1_0
  label: Get Current External Inputs Status (v1.0)
  kind: query
  command: '{"method":"getCurrentExternalInputsStatus","id":105,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/avContent"
  auth_level: none

- id: getPlayingContentInfo
  label: Get Playing Content Info
  kind: query
  command: '{"method":"getPlayingContentInfo","id":103,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/avContent"
  auth_level: private

- id: getContentCount_v1_0
  label: Get Content Count (v1.0)
  kind: query
  command: '{"method":"getContentCount","id":11,"params":[{"source":"extInput:hdmi"}],"version":"1.0"}'
  params:
    - name: source
      type: string
      description: Source URI (e.g. "extInput:hdmi").
    - name: type
      type: string
      description: Content type filter (see getContentList).
  transport:
    method: POST
    url: "http://<Base URL>/avContent"
  auth_level: private

- id: getContentCount_v1_1
  label: Get Content Count (v1.1, with target param)
  kind: query
  command: '{"method":"getContentCount","id":11,"params":[{"source":"extInput:hdmi","type":"","target":""}],"version":"1.1"}'
  params:
    - name: source
      type: string
    - name: type
      type: string
    - name: target
      type: string
  transport:
    method: POST
    url: "http://<Base URL>/avContent"
  auth_level: private

- id: getContentList_v1_5
  label: Get Content List (v1.5)
  kind: query
  command: '{"method":"getContentList","id":88,"params":[{"stIdx":0,"cnt":50,"uri":"extInput:hdmi"}],"version":"1.5"}'
  params:
    - name: uri
      type: string
      description: Content URI or null for all.
    - name: stIdx
      type: integer
      description: Start index (default 0).
    - name: cnt
      type: integer
      description: Max items (max 200, default 50; device-specific upper bound).
  transport:
    method: POST
    url: "http://<Base URL>/avContent"
  auth_level: private

- id: getSchemeList
  label: Get Scheme List
  kind: query
  command: '{"method":"getSchemeList","id":1,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/avContent"
  auth_level: none

- id: getSourceList
  label: Get Source List
  kind: query
  command: '{"method":"getSourceList","id":1,"params":[{"scheme":"extInput"}],"version":"1.0"}'
  params:
    - name: scheme
      type: string
      description: Scheme name from getSchemeList (e.g. "extInput").
  transport:
    method: POST
    url: "http://<Base URL>/avContent"
  auth_level: none

# ===== encryption service =====
- id: getPublicKey
  label: Get RSA Public Key
  kind: query
  command: '{"method":"getPublicKey","id":1,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/encryption"
  auth_level: none

# ===== system service =====
- id: getScreenshot
  label: Get Screenshot
  kind: query
  command: '{"method":"getScreenshot","id":51,"params":[{"plane":"video"}],"version":"1.0"}'
  params:
    - name: plane
      type: string
      description: '"video" (HDMI) | "graphics" (UI) | "mixed" (default).'
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: private
  notes: Returns Base64 320x180 JPEG. Localhost only. FW-BZxxx, PKG 6.2512+, generation 5.7.0+.

- id: setPowerSavingMode
  label: Set Power Saving Mode
  kind: action
  command: '{"method":"setPowerSavingMode","id":52,"params":[{"mode":"pictureOff"}],"version":"1.0"}'
  params:
    - name: mode
      type: string
      description: '"off" | "low" | "high" | "pictureOff".'
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: generic

- id: getCurrentTime_v1_0
  label: Get Current Time (v1.0, ISO8601 string)
  kind: query
  command: '{"method":"getCurrentTime","id":51,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: none

- id: getCurrentTime_v1_1
  label: Get Current Time (v1.1, with TZ + DST)
  kind: query
  command: '{"method":"getCurrentTime","id":51,"params":[],"version":"1.1"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: none

- id: getNetworkSettings
  label: Get Network Settings
  kind: query
  command: '{"method":"getNetworkSettings","id":2,"params":[{"netif":"eth0"}],"version":"1.0"}'
  params:
    - name: netif
      type: string
      description: '"eth0" | "wlan0" | "p2p1" | "" (all interfaces).'
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: generic

- id: getInterfaceInformation
  label: Get Interface Information
  kind: query
  command: '{"method":"getInterfaceInformation","id":33,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: none

- id: getRemoteDeviceSettings
  label: Get Remote Device Settings
  kind: query
  command: '{"method":"getRemoteDeviceSettings","id":44,"params":[{"target":"accessPermission"}],"version":"1.0"}'
  params:
    - name: target
      type: string
      description: '"accessPermission" or "" (all).'
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: none

- id: getLEDIndicatorStatus
  label: Get LED Indicator Status
  kind: query
  command: '{"method":"getLEDIndicatorStatus","id":45,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: generic

- id: getPowerSavingMode
  label: Get Power Saving Mode
  kind: query
  command: '{"method":"getPowerSavingMode","id":51,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: none

- id: getPowerStatus
  label: Get Power Status
  kind: query
  command: '{"method":"getPowerStatus","id":50,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: none
  notes: Some devices may not respond when in power off state.

- id: getRemoteControllerInfo
  label: Get Remote Controller Info (IRCC codes)
  kind: query
  command: '{"method":"getRemoteControllerInfo","id":54,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: none
  notes: Returns list of supported IR remote buttons with their IRCC code values.

- id: getSystemInformation_v1_0
  label: Get System Information (v1.0)
  kind: query
  command: '{"method":"getSystemInformation","id":33,"params":[],"version":"1.0"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: private

- id: getSystemInformation_v1_7
  label: Get System Information (v1.7, with fwVersion/androidOs/webAppRuntimeVersion/mode)
  kind: query
  command: '{"method":"getSystemInformation","id":33,"params":[],"version":"1.7"}'
  params: []
  transport:
    method: POST
    url: "http://<Base URL>/system"
  auth_level: private
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: ["standby", "active"]

- id: power_saving_mode
  label: Power Saving Mode
  type: enum
  values: ["off", "low", "high", "pictureOff"]

- id: volume_info
  label: Volume Information
  type: object
  fields:
    - target: string         # "speaker" | "headphone"
    - volume: integer
    - mute: boolean
    - maxVolume: integer
    - minVolume: integer

- id: external_input_status_v1_1
  label: External Input Status (v1.1)
  type: array
  fields:
    - uri: string            # e.g. "extInput:hdmi?port=2"
    - title: string
    - connection: boolean
    - label: string
    - icon: string           # meta:composite | meta:hdmi | meta:component | ... | meta:wifidisplay
    - status: string         # "true" | "false" | null

- id: external_input_status_v1_0
  label: External Input Status (v1.0)
  type: array
  fields:
    - uri: string
    - title: string
    - connection: boolean
    - label: string
    - icon: string           # no status field in v1.0

- id: led_indicator_status
  label: LED Indicator Status
  type: object
  fields:
    - mode: string           # "Demo" | "AutoBrightnessAdjust" | "Dark" | "SimpleResponse" | "Off"
    - status: string         # "true" | "false" | null

- id: speaker_settings
  label: Speaker Settings
  type: array
  fields:
    - target: string         # "tvPosition" | "subwooferLevel" | "subwooferFreq" | "subwooferPhase" | "subwooferPower"
    - currentValue: string

- id: remote_device_settings
  label: Remote Device Settings
  type: array
  fields:
    - target: string         # "accessPermission"
    - currentValue: string   # "on" | "off"

- id: network_settings
  label: Network Settings
  type: array
  fields:
    - netif: string          # "eth0" | "wlan0" | "p2p1"
    - hwAddr: string
    - ipAddrV4: string
    - ipAddrV6: string
    - netmask: string
    - gateway: string
    - dns: string-array

- id: interface_information
  label: Interface Information
  type: object
  fields:
    - productCategory: string    # "tv" for BRAVIA Pro Display
    - productName: string        # "BRAVIA"
    - modelName: string
    - serverName: string         # "" for BRAVIA Pro Display
    - interfaceVersion: string   # "[X].[Y].[Z]" e.g. "5.0.1"

- id: system_information_v1_0
  label: System Information (v1.0)
  type: object
  fields:
    - product: string
    - language: string           # ISO-639 alpha-3, "" if unknown
    - model: string
    - serial: string
    - macAddr: string            # "xx:xx:xx:xx:xx:xx"
    - name: string
    - generation: string         # "[X].[Y].[Z]" e.g. "5.0.1"

- id: system_information_v1_7
  label: System Information (v1.7)
  type: object
  fields:
    - product: string
    - language: string
    - model: string
    - serial: string
    - macAddr: string
    - name: string
    - generation: string
    - fwVersion: string          # e.g. "PKG0.6.0.81.00.1.00.0951BBA"
    - androidOs: string          # e.g. "12"
    - webAppRuntimeVersion: string  # e.g. "4.0.0+7"
    - mode: string               # "Normal" | "ProSettings" | "Pro"

- id: app_status_list
  label: Application Status List
  type: array
  fields:
    - name: string          # "textInput" | "cursorDisplay" | "webBrowse"
    - status: string        # "off" | "on"

- id: playing_content_info
  label: Playing Content Info
  type: object
  fields:
    - uri: string
    - source: string
    - title: string

- id: content_count
  label: Content Count
  type: object
  fields:
    - count: integer

- id: scheme_list
  label: Scheme List
  type: array
  fields:
    - scheme: string        # e.g. "extInput", "fav"

- id: source_list
  label: Source List
  type: array
  fields:
    - source: string        # e.g. "extInput:hdmi", "extInput:cec", "extInput:widi"

- id: webapp_status
  label: WebApp Status
  type: object
  fields:
    - active: boolean
    - url: string

- id: application_list
  label: Application List
  type: array
  fields:
    - title: string
    - uri: string
    - icon: string          # may be ""

- id: supported_api_info
  label: Supported API Info
  type: array
  fields:
    - service: string
    - protocols: string-array    # e.g. ["xhrpost:jsonizer"]
    - apis: array                # of {name, versions:[{version, protocols?, authLevel, notifications?}]}

- id: text_form
  label: Text Form
  type: object
  fields:
    - text: string          # may be RSA-encrypted if encKey supplied

- id: remote_controller_info
  label: Remote Controller Info (IRCC codes)
  type: object
  fields:
    - bundled: boolean
    - type: string          # e.g. "IR_REMOTE_BUNDLE_TYPE_AEP"
    - codes: array          # of {name, value} pairs where value is base64 IRCC code
  notes: |
    Source documents these IRCC values (base64-encoded):
    PowerOff/Sleep: AAAAAQAAAAEAAAAvAw==
    TvPower: AAAAAQAAAAEAAAAVAw==
    Input: AAAAAQAAAAEAAAAlAw==
    Display: AAAAAQAAAAEAAAA6Aw==
    Home: AAAAAQAAAAEAAABgAw==
    Options: AAAAAgAAAJcAAAA2Aw==
    Return: AAAAAgAAAJcAAAAjAw==
    Up: AAAAAQAAAAEAAAB0Aw==   Down: AAAAAQAAAAEAAAB1Aw==
    Right: AAAAAQAAAAEAAAAzAw==   Left: AAAAAQAAAAEAAAA0Aw==
    Confirm: AAAAAQAAAAEAAABlAw==
    Red/Green/Yellow/Blue: AAAAAgAAAJcAAAAlAw== | mAw== | nAw== | kAw==
    Num0-9: AAAAAQAAAAEAAAAJAw== ... IAw== (Num0=JAw==, Num1=AAAAAAw==, etc.)
    VolumeUp: AAAAAQAAAAEAAAASAw==   VolumeDown: AAAAAQAAAAEAAAATAw==   Mute: AAAAAQAAAAEAAAAUAw==
    ChannelUp: AAAAAQAAAAEAAAAQAw==   ChannelDown: AAAAAQAAAAEAAAARAw==
    Hdmi1-4: AAAAAgAAABoAAABaAw== | bAw== | cAw== | dAw==
    PicOff/PictureOff: AAAAAQAAAAEAAAA+Aw==
```

## Variables
```yaml
# No independent variables. All settable parameters are action params.
# State-like values are returned via query actions (see Feedbacks).
```

## Events
```yaml
# UNRESOLVED: source mentions "notifications" in getSupportedApiInfo response schema but
# does not document any concrete notification APIs.
```

## Macros
```yaml
- id: apk_upload_install
  label: App Upload + Install (FW-BZxxx, localhost)
  description: |
    Three-step procedure from Appendix 1 of source.
  steps:
    - action: prepareAppUpload
      purpose: Obtain assetId (UUIDv4). Server opens APK upload HTTP server.
    - http: POST
      url: "http://<device-ip>/sony/appupload/{assetId}"
      header:
        # UNRESOLVED: PSK header field name not stated in source
        PSK: "<pre-shared key>"
      body: "<APK file binary>"
      timeout: 300s  # assetId expires after 5 minutes
    - action: installApp
      params:
        assetId: "<from step 1>"
        afterInstallAction: "startApplication"  # optional
        uri: "android-app://<package>"           # optional
      purpose: Install the uploaded APK.
  notes: |
    assetId expires 5 min after issue; APK transfer must begin within 5 min; installApp must
    be called within 5 min of transfer completion. Upload HTTP server persists until "Control
    remotely" turned off or system restart.
```

## Safety
```yaml
confirmation_required_for:
  - setPowerSavingMode (pictureOff turns panel off - may appear as device off)
  - installApp (installs and can auto-launch APK)
  - uninstallApp
  - terminateApps (force-closes all running apps; some may not be terminable - error 41403)
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing
# described in source.
```

## Notes
JSON-RPC over HTTP POST. Each service is its own URL path: `/guide`, `/appControl`, `/audio`, `/avContent`, `/encryption`, `/system`. Every request envelope: `{"method": "...", "id": <int>, "params": [...], "version": "X.Y"}`. Every response envelope: `{"result": [...], "id": <int>}`.

Auth model (per-endpoint, not device-wide):
- `none` — no auth header required (e.g. getVolumeInformation, getSchemeList, getSourceList, getPowerStatus, getNetworkSettings, getLEDIndicatorStatus, getRemoteControllerInfo, getApplicationStatusList, getSupportedApiInfo)
- `generic` — PSK required in HTTP request header (e.g. setPlayContent, setAudioVolume, setAudioMute, setSpeakerSettings, setSoundSettings, prepareAppUpload, installApp, uninstallApp, setTextForm, terminateApps, setActiveApp, getNetworkSettings, getLEDIndicatorStatus, setPowerSavingMode)
- `private` — caller must be on 127.0.0.1 (e.g. getApplicationList, getWebAppStatus, getTextForm, getPlayingContentInfo, getContentCount, getContentList, getScreenshot, getSystemInformation, getInterfaceInformation? — actually getInterfaceInformation is "none" per source)

App install/uninstall/terminate + screenshot APIs require FW-BZxxx series, firmware PKG 6.2512+ (generation 5.7.0+) AND localhost (127.0.0.1) caller. assetId from prepareAppUpload expires after 5 minutes.

Encryption: getPublicKey returns RSA public key used to encrypt encKey for setTextForm/getTextForm. encKey must be present or error #3 "Illegal Argument". Encryption error code: 40002.

`setPlayContent` does not support USB media files or DLNA media. `getContentList` cnt max 200; device-specific upper bound.

getRemoteControllerInfo response element 1 is deprecated; element 2 is the array of {name, value} IRCC codes.

Volume / subwoofer ranges: subwooferLevel 0-24 step 1; subwooferFreq 0-30 step 1; both device-specific.

Power on/off direct commands: NOT documented in source. Only getPowerStatus query and getPowerSavingMode / setPowerSavingMode. Power on can be triggered indirectly via IRCC TvPower / PowerOff codes (see Feedbacks: remote_controller_info) or via Sony's IP remote protocol (out of scope of this document).

Interface version mapping (from source Appendix): PKG6.5603.0175 → interfaceVersion "5.0.1".
System info product/name fixed values for BRAVIA Professional Display: product="TV", name="BRAVIA".

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-06-10T19:42:03.725Z
last_checked_at: 2026-06-11T13:46:48.716Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:46:48.716Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions (distinct JSON-RPC method/version pairs across 6 service endpoints) found verbatim in source with matching auth levels, params, and transport paths. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port not stated in source — port 80 (HTTP default) inferred but not confirmed"
- "PSK (pre-shared key) header name + format not specified in source beyond \"must be included in the POST header\""
- "port not stated in source; port 80 assumed (do not assume for non-HTTP variants)"
- "port number not stated in source"
- "source mentions \"notifications\" in getSupportedApiInfo response schema but"
- "PSK header field name not stated in source"
- "no explicit safety warnings, interlock procedures, or power-on sequencing"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
