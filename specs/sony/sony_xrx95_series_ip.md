---
spec_id: admin/sony-xrx95-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XRX95 Series Control Spec"
manufacturer: Sony
model_family: "Sony XRX95 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony XRX95 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/rest-api
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure
  - https://pro-bravia.sony.net/remote-display-control/rest-api/guide
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
retrieved_at: 2026-06-10T01:54:49.652Z
last_checked_at: 2026-06-10T07:40:06.695Z
generated_at: 2026-06-10T07:40:06.695Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port, exact firmware model coverage, and any RS-232 / serial parameters — source only documents the REST/JSON-RPC surface"
  - "port number not stated in source"
  - "PSK provisioning procedure / key exchange details beyond \"must be in POST header\""
  - "source documents notification APIs referenced in getSupportedApiInfo"
  - "source does not document high-voltage, fault-recovery, or hardware interlock procedures."
  - "TCP port for HTTP service; PSK provisioning procedure; full X.509/JSON-RPC encryption handshake details for private APIs; firmware version compatibility list per endpoint; event/notification catalog"
verification:
  verdict: verified
  checked_at: 2026-06-10T07:40:06.695Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions map one-to-one to documented JSON-RPC methods in the source with matching method names, params, and version strings; source contains exactly the same 56 versioned endpoints. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Sony XRX95 Series Control Spec

## Summary
JSON-RPC-over-HTTP REST API for Sony Professional BRAVIA Displays (XRX95 Series and related FW-BZxxx models). All commands are POSTed as JSON-RPC to service-specific endpoints (`/guide`, `/appControl`, `/audio`, `/avContent`, `/encryption`, `/system`, `/video`, `/videoScreen`) under a `<Base URL>`. Authentication tiers ("none", "generic", "private") vary per API; `generic` calls require a Pre-Shared Key (PSK) registered on the device and `private` calls use RSA encryption whose public key is fetched via `getPublicKey`.

<!-- UNRESOLVED: TCP port, exact firmware model coverage, and any RS-232 / serial parameters — source only documents the REST/JSON-RPC surface -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://<Base URL>/{service}"  # service in: guide, appControl, audio, avContent, encryption, system, video, videoScreen
  # UNRESOLVED: port number not stated in source
auth:
  type: psk  # inferred: source specifies per-API authLevel (none/generic/private); generic requires PSK, private requires RSA encryption
  # UNRESOLVED: PSK provisioning procedure / key exchange details beyond "must be in POST header"
```

## Traits
```yaml
- powerable  # inferred from setPowerStatus examples
- routable  # inferred from setPlayContent / avContent input-switching examples
- queryable  # inferred from get* query examples (volume, power, input, system, network, time, LED, picture quality, scene, etc.)
- levelable  # inferred from setAudioVolume / setPictureQualitySettings level-setting examples
```

## Actions
```yaml
# guide service
- id: get_supported_api_info
  label: Get Supported API Info
  kind: query
  command: |
    POST http://<Base URL>/guide
    Content-Type: application/json
    {"method":"getSupportedApiInfo","id":5,"params":[{"services":["system","avContent"]}],"version":"1.0"}
  params: []

# appControl service
- id: prepare_app_upload
  label: Prepare App Upload (FW-BZxxx PKG 6.2512+ / gen 5.7.0+, localhost only)
  kind: action
  command: |
    POST http://<Base URL>/appControl
    {"method":"prepareAppUpload","id":104,"params":[],"version":"1.0"}
  params: []

- id: uninstall_app
  label: Uninstall App (FW-BZxxx PKG 6.2512+ / gen 5.7.0+, localhost only)
  kind: action
  command: |
    POST http://<Base URL>/appControl
    {"method":"uninstallApp","id":106,"params":[{"packageName":"com.sony.dtv.b2b.sample"}],"version":"1.0"}
  params:
    - name: packageName
      type: string

- id: install_app
  label: Install App (FW-BZxxx PKG 6.2512+ / gen 5.7.0+, localhost only)
  kind: action
  command: |
    POST http://<Base URL>/appControl
    {"method":"installApp","id":105,"params":[{"assetId":"{assetId}","afterInstallAction":"startApplication","uri":"android-app://com.sony.dtv.b2b.sample"}],"version":"1.0"}
  params:
    - name: assetId
      type: string
    - name: afterInstallAction
      type: string
    - name: uri
      type: string

- id: get_text_form_v1_1
  label: Get Text Form (v1.1, encrypted)
  kind: query
  command: |
    POST http://<Base URL>/appControl
    {"method":"getTextForm","id":60,"params":[{"encKey":"{rsaEncryptedKey}"}],"version":"1.1"}
  params:
    - name: encKey
      type: string

- id: set_text_form_v1_1
  label: Set Text Form (v1.1, encrypted)
  kind: action
  command: |
    POST http://<Base URL>/appControl
    {"method":"setTextForm","id":601,"params":[{"encKey":"{rsaEncryptedKey}","text":"{ciphertext}"}],"version":"1.1"}
  params:
    - name: encKey
      type: string
    - name: text
      type: string

- id: set_text_form_v1_0
  label: Set Text Form (v1.0, plain UTF-8)
  kind: action
  command: |
    POST http://<Base URL>/appControl
    {"method":"setTextForm","id":601,"params":["hello world!!"],"version":"1.0"}
  params:
    - name: text
      type: string

- id: terminate_apps
  label: Terminate All Applications
  kind: action
  command: |
    POST http://<Base URL>/appControl
    {"method":"terminateApps","id":55,"params":[],"version":"1.0"}
  params: []

- id: set_active_app
  label: Launch Application
  kind: action
  command: |
    POST http://<Base URL>/appControl
    {"method":"setActiveApp","id":601,"params":[{"uri":"localapp://webappruntime?url=http%3A%2F%2Fexample.com%2F"}],"version":"1.0"}
  params:
    - name: uri
      type: string
      description: 'localapp://webappruntime?url=... | ?manifest=... | ?auid=...'

- id: get_application_list
  label: Get Application List (private)
  kind: query
  command: |
    POST http://<Base URL>/appControl
    {"method":"getApplicationList","id":60,"params":[],"version":"1.0"}
  params: []

- id: get_web_app_status
  label: Get Web App Status (private)
  kind: query
  command: |
    POST http://<Base URL>/appControl
    {"method":"getWebAppStatus","id":1,"params":[],"version":"1.0"}
  params: []

- id: get_application_status_list
  label: Get Application Status List
  kind: query
  command: |
    POST http://<Base URL>/appControl
    {"method":"getApplicationStatusList","id":55,"params":[],"version":"1.0"}
  params: []

# audio service
- id: set_audio_volume_v1_0
  label: Set Audio Volume (v1.0)
  kind: action
  command: |
    POST http://<Base URL>/audio
    {"method":"setAudioVolume","id":601,"params":[{"volume":"18","target":"speaker"}],"version":"1.0"}
  params:
    - name: volume
      type: string
      description: '"N" absolute, "+N" increment, "-N" decrement'
    - name: target
      type: string
      description: '"" (all) | "speaker" | "headphone"'

- id: set_audio_volume_v1_2
  label: Set Audio Volume (v1.2, with UI flag)
  kind: action
  command: |
    POST http://<Base URL>/audio
    {"method":"setAudioVolume","id":98,"params":[{"volume":"5","ui":"on","target":"speaker"}],"version":"1.2"}
  params:
    - name: volume
      type: string
    - name: target
      type: string
    - name: ui
      type: string
      description: '"on" | "off" | null'

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: |
    POST http://<Base URL>/audio
    {"method":"setAudioMute","id":601,"params":[{"status":true}],"version":"1.0"}
  params:
    - name: status
      type: boolean

- id: get_volume_information
  label: Get Volume Information
  kind: query
  command: |
    POST http://<Base URL>/audio
    {"method":"getVolumeInformation","id":33,"params":[],"version":"1.0"}
  params: []

- id: get_speaker_settings
  label: Get Speaker Settings (BZ40P/BZ35P/BZ30P: not supported)
  kind: query
  command: |
    POST http://<Base URL>/audio
    {"method":"getSpeakerSettings","id":67,"params":[{"target":"tvPosition"}],"version":"1.0"}
  params:
    - name: target
      type: string
      description: '"" | "tvPosition" | "subwooferLevel" | "subwooferFreq" | "subwooferPhase" | "subwooferPower"'

- id: set_speaker_settings
  label: Set Speaker Settings (BZ40P/BZ35P/BZ30P: not supported)
  kind: action
  command: |
    POST http://<Base URL>/audio
    {"method":"setSpeakerSettings","id":62,"params":[{"settings":[{"value":"wallMount","target":"tvPosition"}]}],"version":"1.0"}
  params:
    - name: settings
      type: array
      description: 'array of {target,value}; target in tvPosition|subwooferLevel|subwooferFreq|subwooferPhase|subwooferPower'

- id: set_sound_settings_v1_1
  label: Set Sound Settings (v1.1, output terminal)
  kind: action
  command: |
    POST http://<Base URL>/audio
    {"method":"setSoundSettings","id":5,"params":[{"settings":[{"value":"speaker","target":"outputTerminal"}]}],"version":"1.1"}
  params:
    - name: settings
      type: array
      description: 'array of {target:"outputTerminal", value:"speaker"|"speaker_hdmi"|"hdmi"|"audioSystem"}'

# avContent service
- id: set_play_content
  label: Set Play Content
  kind: action
  command: |
    POST http://<Base URL>/avContent
    {"method":"setPlayContent","id":101,"params":[{"uri":"extInput:hdmi?port=2"}],"version":"1.0"}
  params:
    - name: uri
      type: string
      description: 'e.g. extInput:hdmi?port=2'

- id: get_current_external_inputs_status_v1_1
  label: Get Current External Inputs Status (v1.1, with signal status)
  kind: query
  command: |
    POST http://<Base URL>/avContent
    {"method":"getCurrentExternalInputsStatus","id":105,"params":[],"version":"1.1"}
  params: []

- id: get_current_external_inputs_status_v1_0
  label: Get Current External Inputs Status (v1.0, no signal status)
  kind: query
  command: |
    POST http://<Base URL>/avContent
    {"method":"getCurrentExternalInputsStatus","id":105,"params":[],"version":"1.0"}
  params: []

- id: get_playing_content_info
  label: Get Playing Content Info (private)
  kind: query
  command: |
    POST http://<Base URL>/avContent
    {"method":"getPlayingContentInfo","id":103,"params":[],"version":"1.0"}
  params: []

- id: get_content_count_v1_0
  label: Get Content Count (v1.0)
  kind: query
  command: |
    POST http://<Base URL>/avContent
    {"method":"getContentCount","id":11,"params":[{"source":"extInput:hdmi"}],"version":"1.0"}
  params:
    - name: source
      type: string
    - name: type
      type: string

- id: get_content_count_v1_1
  label: Get Content Count (v1.1, with target)
  kind: query
  command: |
    POST http://<Base URL>/avContent
    {"method":"getContentCount","id":11,"params":[{"source":"extInput:hdmi"}],"version":"1.1"}
  params:
    - name: source
      type: string
    - name: type
      type: string
    - name: target
      type: string

- id: get_content_list_v1_5
  label: Get Content List (v1.5, paged)
  kind: query
  command: |
    POST http://<Base URL>/avContent
    {"method":"getContentList","id":88,"params":[{"stIdx":0,"cnt":50,"uri":"extInput:hdmi"}],"version":"1.5"}
  params:
    - name: uri
      type: string
    - name: stIdx
      type: integer
    - name: cnt
      type: integer
      description: 'max 200'

- id: get_scheme_list
  label: Get Scheme List
  kind: query
  command: |
    POST http://<Base URL>/avContent
    {"method":"getSchemeList","id":1,"params":[],"version":"1.0"}
  params: []

- id: get_source_list
  label: Get Source List
  kind: query
  command: |
    POST http://<Base URL>/avContent
    {"method":"getSourceList","id":1,"params":[{"scheme":"extInput"}],"version":"1.0"}
  params:
    - name: scheme
      type: string

# encryption service
- id: get_public_key
  label: Get RSA Public Key
  kind: query
  command: |
    POST http://<Base URL>/encryption
    {"method":"getPublicKey","id":1,"params":[],"version":"1.0"}
  params: []

# system service
- id: get_screenshot
  label: Get Screenshot (BZ40P/BZ35P/BZ30P: not supported; FW-BZxxx PKG 6.2512+ / gen 5.7.0+, localhost only)
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getScreenshot","id":51,"params":[{"plane":"video"}],"version":"1.0"}
  params:
    - name: plane
      type: string
      description: '"video" | "graphics" | "mixed"'

- id: set_power_saving_mode
  label: Set Power Saving Mode
  kind: action
  command: |
    POST http://<Base URL>/system
    {"method":"setPowerSavingMode","id":52,"params":[{"mode":"pictureOff"}],"version":"1.0"}
  params:
    - name: mode
      type: string
      description: '"off" | "low" | "high" | "pictureOff"'

- id: get_power_saving_mode
  label: Get Power Saving Mode
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getPowerSavingMode","id":51,"params":[],"version":"1.0"}
  params: []

- id: get_current_time_v1_0
  label: Get Current Time (v1.0, ISO8601)
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getCurrentTime","id":51,"params":[],"version":"1.0"}
  params: []

- id: get_current_time_v1_1
  label: Get Current Time (v1.1, with TZ/DST)
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getCurrentTime","id":51,"params":[],"version":"1.1"}
  params: []

- id: get_network_settings
  label: Get Network Settings
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getNetworkSettings","id":2,"params":[{"netif":"eth0"}],"version":"1.0"}
  params:
    - name: netif
      type: string
      description: '"eth0" | "wlan0" | "p2p1" | ""'

- id: get_interface_information
  label: Get Interface Information
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getInterfaceInformation","id":33,"params":[],"version":"1.0"}
  params: []

- id: get_remote_device_settings
  label: Get Remote Device Settings
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getRemoteDeviceSettings","id":44,"params":[{"target":"accessPermission"}],"version":"1.0"}
  params:
    - name: target
      type: string
      description: '"" | "accessPermission"'

- id: get_led_indicator_status
  label: Get LED Indicator Status
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getLEDIndicatorStatus","id":45,"params":[],"version":"1.0"}
  params: []

- id: set_led_indicator_status_v1_1
  label: Set LED Indicator Status (v1.1)
  kind: action
  command: |
    POST http://<Base URL>/system
    {"method":"setLEDIndicatorStatus","id":53,"params":[{"mode":"Demo","status":"true"}],"version":"1.1"}
  params:
    - name: mode
      type: string
      description: '"Demo" | "AutoBrightnessAdjust" | "Dark" | "SimpleResponse" | "Off"'
    - name: status
      type: string
      description: '"true" | "false" | null'

- id: get_power_status
  label: Get Power Status
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getPowerStatus","id":50,"params":[],"version":"1.0"}
  params: []

- id: set_power_status
  label: Set Power Status (power-on supported only in Sleep mode; requires Remote start = ON)
  kind: action
  command: |
    POST http://<Base URL>/system
    {"method":"setPowerStatus","id":55,"params":[{"status":false}],"version":"1.0"}
  params:
    - name: status
      type: boolean
      description: 'true = power on, false = power off'

- id: get_remote_controller_info
  label: Get Remote Controller Info
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getRemoteControllerInfo","id":54,"params":[],"version":"1.0"}
  params: []

- id: get_system_information_v1_0
  label: Get System Information (v1.0)
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getSystemInformation","id":33,"params":[],"version":"1.0"}
  params: []

- id: get_system_information_v1_7
  label: Get System Information (v1.7, with fwVersion/androidOs/webAppRuntimeVersion/mode)
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getSystemInformation","id":33,"params":[],"version":"1.7"}
  params: []

- id: get_system_supported_function
  label: Get System Supported Function
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getSystemSupportedFunction","id":55,"params":[],"version":"1.0"}
  params: []

- id: get_wol_mode
  label: Get Wake-on-LAN Mode
  kind: query
  command: |
    POST http://<Base URL>/system
    {"method":"getWolMode","id":50,"params":[],"version":"1.0"}
  params: []

- id: set_wol_mode
  label: Set Wake-on-LAN Mode
  kind: action
  command: |
    POST http://<Base URL>/system
    {"method":"setWolMode","id":55,"params":[{"enabled":false}],"version":"1.0"}
  params:
    - name: enabled
      type: boolean

- id: request_reboot
  label: Request Reboot
  kind: action
  command: |
    POST http://<Base URL>/system
    {"method":"requestReboot","id":10,"params":[],"version":"1.0"}
  params: []

# video service
- id: get_screen_rotation
  label: Get Screen Rotation (FW-BZxxx PKG 6.2512+ / gen 5.7.0+, localhost only)
  kind: query
  command: |
    POST http://<Base URL>/video
    {"method":"getScreenRotation","id":52,"params":[],"version":"1.0"}
  params: []

- id: set_screen_rotation
  label: Set Screen Rotation (FW-BZxxx PKG 6.2512+ / gen 5.7.0+, localhost only)
  kind: action
  command: |
    POST http://<Base URL>/video
    {"method":"setScreenRotation","id":53,"params":[{"rotation":0}],"version":"1.0"}
  params:
    - name: rotation
      type: integer
      description: '0 | 90 | 180 | 270'

- id: get_picture_quality_settings_v1_0
  label: Get Picture Quality Settings (v1.0)
  kind: query
  command: |
    POST http://<Base URL>/video
    {"method":"getPictureQualitySettings","id":52,"params":[{"target":"color"}],"version":"1.0"}
  params:
    - name: target
      type: string
      description: '"" | "color" | "brightness" | "contrast" | "sharpness" | "pictureMode" | "lightSensor" | "colorSpace" | "colorTemperature" | "autoPictureMode" | "hdrMode" | "autoLocalDimming" | "xtendedDynamicRange"'

- id: get_picture_quality_settings_v1_1
  label: Get Picture Quality Settings (v1.1)
  kind: query
  command: |
    POST http://<Base URL>/video
    {"method":"getPictureQualitySettings","id":52,"params":[{"target":"color"}],"version":"1.1"}
  params:
    - name: target
      type: string

- id: set_picture_quality_settings_v1_0
  label: Set Picture Quality Settings (v1.0)
  kind: action
  command: |
    POST http://<Base URL>/video
    {"method":"setPictureQualitySettings","id":12,"params":[{"settings":[{"value":"2","target":"color"}]}],"version":"1.0"}
  params:
    - name: settings
      type: array
      description: 'array of {target, value}; one target per http request recommended'

- id: set_picture_quality_settings_v1_1
  label: Set Picture Quality Settings (v1.1, multi-target)
  kind: action
  command: |
    POST http://<Base URL>/video
    {"method":"setPictureQualitySettings","id":12,"params":[{"settings":[{"value":"2","target":"contentType"},{"value":"standard","target":"pictureMode"},{"value":"50","target":"brightness"},{"value":"50","target":"color"}]}],"version":"1.1"}
  params:
    - name: settings
      type: array
      description: 'array of {target, value}'

# videoScreen service
- id: get_scene_setting
  label: Get Scene Setting (BZ40P/BZ35P/BZ30P: not supported)
  kind: query
  command: |
    POST http://<Base URL>/videoScreen
    {"method":"getSceneSetting","id":79,"params":[],"version":"1.0"}
  params: []

- id: set_scene_setting
  label: Set Scene Setting (BZ40P/BZ35P/BZ30P: not supported)
  kind: action
  command: |
    POST http://<Base URL>/videoScreen
    {"method":"setSceneSetting","id":40,"params":[{"value":"auto"}],"version":"1.0"}
  params:
    - name: value
      type: string
      description: '"auto" | "auto24pSync" | "general"'
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [standby, active]
- id: power_saving_mode
  type: enum
  values: [off, low, high, pictureOff]
- id: volume_information
  type: object
  description: 'target (speaker|headphone), volume, mute, minVolume, maxVolume'
- id: audio_mute
  type: boolean
- id: led_indicator_mode
  type: enum
  values: [Demo, AutoBrightnessAdjust, Dark, SimpleResponse, Off]
- id: led_indicator_status
  type: string
  description: '"true" | "false" | null'
- id: external_input_status
  type: object
  description: 'uri, title, connection, label, icon (meta:...), status (true|false|null) per v1.1'
- id: scheme_list
  type: array
  description: 'string scheme names e.g. extInput, fav'
- id: source_list
  type: array
  description: 'URI-style source names per scheme'
- id: content_list
  type: object
  description: 'uri, title, index for each extInput entry'
- id: playing_content_info
  type: object
  description: 'uri, source, title for current content'
- id: system_information
  type: object
  description: 'product, name, model, serial, language, macAddr, generation (+ fwVersion, androidOs, webAppRuntimeVersion, mode in v1.7)'
- id: interface_information
  type: object
  description: 'productCategory, productName, modelName, serverName, interfaceVersion'
- id: network_settings
  type: object
  description: 'netif, hwAddr, ipAddrV4, ipAddrV6, netmask, gateway, dns'
- id: current_time
  type: string
  description: 'ISO8601 (v1.0) or {dateTime, timeZoneOffsetMinute, dstOffsetMinute} (v1.1)'
- id: wol_mode
  type: boolean
- id: remote_device_access_permission
  type: enum
  values: [on, off]
- id: system_supported_function
  type: array
  description: 'array of {option, value} e.g. WOL -> MAC address'
- id: remote_controller_info
  type: object
  description: '1st: bundled/type; 2nd: array of {name, value} IRCC codes'
- id: picture_quality_settings
  type: object
  description: 'target, currentValue, isAvailable, candidate[{value, max, min, step}]'
- id: scene_setting
  type: object
  description: 'currentValue, candidate[{value}]'
- id: screen_rotation
  type: integer
  description: '0, 90, 180, 270'
- id: application_list
  type: array
  description: 'title, uri, icon (URL)'
- id: web_app_status
  type: object
  description: 'active (bool), url (string)'
- id: application_status_list
  type: array
  description: '{name: textInput|cursorDisplay|webBrowse, status: on|off}'
- id: speaker_settings
  type: object
  description: 'target (tvPosition|subwooferLevel|subwooferFreq|subwooferPhase|subwooferPower), currentValue'
- id: sound_settings
  type: object
  description: 'target=outputTerminal, currentValue=speaker|speaker_hdmi|hdmi|audioSystem'
- id: public_key
  type: string
  description: 'RSA public key for private-tier encrypted APIs'
- id: text_form
  type: string
  description: 'current text on software keyboard (plain or RSA-encrypted)'
- id: screenshot
  type: string
  description: 'Base64-encoded 320x180 or 1920x1080 JPEG'
- id: content_count
  type: integer
```

## Variables
```yaml
# Discrete enum/level settings already encoded as action params; this section covers
# device-wide read/write settings that the source treats as key-value pairs.
- id: power_saving_mode
  type: enum
  values: [off, low, high, pictureOff]
  read: getPowerSavingMode
  write: setPowerSavingMode
- id: wol_mode
  type: boolean
  read: getWolMode
  write: setWolMode
- id: led_indicator
  type: object
  description: 'mode in {Demo, AutoBrightnessAdjust, Dark, SimpleResponse, Off}; status in {true, false, null}'
  read: getLEDIndicatorStatus
  write: setLEDIndicatorStatus
- id: remote_access_permission
  type: enum
  values: [on, off]
  read: getRemoteDeviceSettings
- id: audio_volume
  type: object
  description: 'target {"" | speaker | headphone}, volume string ("N"|"+N"|"-N")'
  write: setAudioVolume
  read: getVolumeInformation
- id: audio_mute
  type: boolean
  write: setAudioMute
- id: picture_quality
  type: object
  description: 'target in color|brightness|contrast|sharpness|pictureMode|lightSensor|colorSpace|colorTemperature|autoPictureMode|hdrMode|autoLocalDimming|xtendedDynamicRange'
  read: getPictureQualitySettings
  write: setPictureQualitySettings
- id: scene_setting
  type: enum
  values: [auto, auto24pSync, general]
  read: getSceneSetting
  write: setSceneSetting
- id: screen_rotation
  type: integer
  values: [0, 90, 180, 270]
  read: getScreenRotation
  write: setScreenRotation
- id: output_terminal
  type: enum
  values: [speaker, speaker_hdmi, hdmi, audioSystem]
  write: setSoundSettings
```

## Events
```yaml
# UNRESOLVED: source documents notification APIs referenced in getSupportedApiInfo
# response (`notifications: {name, versions, authLevel}`), but does not enumerate
# the event payloads. No concrete event catalog available from this source.
```

## Macros
```yaml
- id: app_upload_and_install
  description: 'Three-step process per Appendix 1: prepareAppUpload -> POST APK to http://{ip}/sony/appupload/{assetId} (5 min timeout, PSK header required) -> installApp with assetId (5 min timeout).'
  steps:
    - action: prepare_app_upload
    - action: POST_APK_to_appupload_url
    - action: install_app
```

## Safety
```yaml
confirmation_required_for:
  - set_power_status
  - request_reboot
interlocks:
  - description: 'setPowerStatus(true) is only honored while device is in "Sleep" mode; error returned otherwise. Requires "Remote start" (Settings - Network) to be ON.'
    field: power_on
  - description: 'setLEDIndicatorStatus changes persist after the controlling application exits - caller must restore original state on shutdown.'
    field: led_indicator
# UNRESOLVED: source does not document high-voltage, fault-recovery, or hardware interlock procedures.
```

## Notes
- All endpoints accept JSON-RPC 2.0-style requests. Base URL is the device IP, exact port never stated in source.
- AuthLevel "none" APIs are open. "generic" APIs require a Pre-Shared Key (PSK) configured on the device; PSK must be present in POST header. "private" APIs additionally require RSA encryption of payloads using the public key returned by `getPublicKey` (encryption service).
- `appControl.prepareAppUpload` / `uninstallApp` / `installApp` / `system.getScreenshot` / `video.getScreenRotation` / `video.setScreenRotation` are restricted to localhost (127.0.0.1) on FW-BZxxx series (firmware PKG 6.2512+ / generation 5.7.0+).
- `getTextForm` / `setTextForm` (v1.1) are restricted to Japan for BZ40P/BZ35P/BZ30P; other models in Japan and EU. v1.0 setTextForm also Japan+EU except for BZ40P/BZ35P/BZ30P (Japan only).
- `getSpeakerSettings` / `setSpeakerSettings` / `getSceneSetting` / `setSceneSetting` are NOT supported on BZ40P/BZ35P/BZ30P.
- `appControl.getApplicationList`, `appControl.getWebAppStatus`, `appControl.getTextForm` (v1.1), and `system.getSystemInformation` are "private" auth-level.
- `avContent.getContentList` max `cnt` is 200; max list size per request is device-specific.
- `video.setPictureQualitySettings` with multiple targets in a single request may fail under certain HDMI signal conditions; specify one target per HTTP request when `hdmiSignalFormat` / `hdmiSignalFormatVrr` is in use.
- IRCC codes returned by `getRemoteControllerInfo` are Base64-encoded; see Appendix table for standard button mappings (PowerOff, VolumeUp/Down, Num0-9, Hdmi1-4, etc.).
- Error code ranges: 0-32767 REST API system; 32768-65535 user area. Service-specific user ranges documented in source (40000-40199 common, 40800-40999 audio, 41000-41199 avContent, 41400-41599 appControl, 42400-42599 encryption).
- HTTP 200 with non-zero result still possible per common-error section — check the JSON `error` field rather than relying solely on HTTP status.

<!-- UNRESOLVED: TCP port for HTTP service; PSK provisioning procedure; full X.509/JSON-RPC encryption handshake details for private APIs; firmware version compatibility list per endpoint; event/notification catalog -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/rest-api
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure
  - https://pro-bravia.sony.net/remote-display-control/rest-api/guide
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
retrieved_at: 2026-06-10T01:54:49.652Z
last_checked_at: 2026-06-10T07:40:06.695Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:40:06.695Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions map one-to-one to documented JSON-RPC methods in the source with matching method names, params, and version strings; source contains exactly the same 56 versioned endpoints. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port, exact firmware model coverage, and any RS-232 / serial parameters — source only documents the REST/JSON-RPC surface"
- "port number not stated in source"
- "PSK provisioning procedure / key exchange details beyond \"must be in POST header\""
- "source documents notification APIs referenced in getSupportedApiInfo"
- "source does not document high-voltage, fault-recovery, or hardware interlock procedures."
- "TCP port for HTTP service; PSK provisioning procedure; full X.509/JSON-RPC encryption handshake details for private APIs; firmware version compatibility list per endpoint; event/notification catalog"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
