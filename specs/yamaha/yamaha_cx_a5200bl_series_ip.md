---
spec_id: admin/yamaha-cx-a5200bl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha CX-A5200BL Control Spec"
manufacturer: Yamaha
model_family: CX-A5200BL
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - CX-A5200BL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
  - forum.smartapfel.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7r8QTdkYFNfJVJmKbtqvdleuzKt.pdf
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://forum.smartapfel.de/attachment/4372-yxc-api-spec-basic-pdf/
retrieved_at: 2026-08-30T16:32:59.783Z
last_checked_at: 2026-08-31T22:16:13.770Z
generated_at: 2026-08-31T22:16:13.770Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is Yamaha's generic YXC (MusicCast) API specification — CX-A5200BL is not named inside it (examples cite RX-V479/RX-V679/WXC-50). Applicability to this model is asserted by the spec family/context, not by model name in the document. Verify against device via /system/getDeviceInfo (model_name, api_version)."
  - "HTTP port not stated for the YXC base URL (a UPnP X_URLBase example shows :80, but that is one device example, not a stated API port)."
  - "device also has an RS-232C terminal per its Owner's Manual, but no serial command syntax exists in this source."
  - "firmware version compatibility range not stated in source."
  - "port number not stated in source (UPnP X_URLBase example shows 80, not normative)"
  - "static range not stated for CX-A5200BL"
  - "source contains no safety warnings, interlock procedures, or power-on"
  - "HTTP port for YXC base URL not stated (UPnP X_URLBase example shows 80)."
  - "per-zone volume/tone/balance/dimmer ranges are runtime-discovered via getFeatures; static values not in source."
  - "device RS-232C terminal exists (per Owner's Manual) but serial command syntax not present in this source."
verification:
  verdict: verified
  checked_at: 2026-08-31T22:16:13.770Z
  matched_actions: 124
  action_count: 124
  confidence: medium
  summary: "All 124 spec actions match HTTP endpoints in source sections 4-9 verbatim with method/path/enum alignment; transport base URL is documented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-30
---

# Yamaha CX-A5200BL Control Spec

## Summary
Yamaha CX-A5200BL Series (MusicCast-enabled AVENTAGE AV preamplifier) controlled over the network via the Yamaha Extended Control (YXC) HTTP REST API (Basic specification, Rev. 2.00), served at `http://{host}/YamahaExtendedControl/v1/...`. Covers system, zone, tuner, Network/USB, CD, and clock endpoints, plus unsolicited status events pushed as UDP unicast to a client-declared port.

<!-- UNRESOLVED: source is Yamaha's generic YXC (MusicCast) API specification — CX-A5200BL is not named inside it (examples cite RX-V479/RX-V679/WXC-50). Applicability to this model is asserted by the spec family/context, not by model name in the document. Verify against device via /system/getDeviceInfo (model_name, api_version). -->
<!-- UNRESOLVED: HTTP port not stated for the YXC base URL (a UPnP X_URLBase example shows :80, but that is one device example, not a stated API port). -->
<!-- UNRESOLVED: device also has an RS-232C terminal per its Owner's Manual, but no serial command syntax exists in this source. -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->

## Transport
```yaml
protocols:
  - http
  - udp   # inferred from source: event notifications are sent as UDP unicast; all control/request traffic is HTTP
addressing:
  base_url: "http://{host}/YamahaExtendedControl"
  port: null  # UNRESOLVED: port number not stated in source (UPnP X_URLBase example shows 80, not normative)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from setPower (on/standby/toggle) per zone
  - routable     # inferred from setInput, prepareInputChange, input_list per zone
  - queryable    # inferred from getDeviceInfo, getFeatures, getStatus, getPlayInfo, etc.
  - levelable    # inferred from setVolume, setToneControl, setEqualizer, setBalance, setSubwooferVolume
```

## Actions
```yaml
# Method note: source states Method POST/GET only on some endpoints. Where unstated, method is
# inferred from the documented parameter style (query-string URI = GET, JSON body = POST).
# Zone endpoints are documented by the source as one row each with a zone path parameter.
# Availability of many endpoints on a given device is gated by func_list via /system/getFeatures.
- id: system_getDeviceInfo
  label: Get Device Info
  kind: query
  command: "GET /v1/system/getDeviceInfo"
  params: []

- id: system_getFeatures
  label: Get Features
  kind: query
  command: "GET /v1/system/getFeatures"
  params: []

- id: system_getNetworkStatus
  label: Get Network Status
  kind: query
  command: "GET /v1/system/getNetworkStatus"
  params: []

- id: system_setWiredLan
  label: Set Wired LAN
  kind: action
  command: "POST /v1/system/setWiredLan"
  params:
    - name: dhcp
      type: string
      description: "DHCP setting (optional)"
    - name: ip_address
      type: string
      description: "IP address (optional)"
    - name: subnet_mask
      type: string
      description: "Subnet mask (optional)"
    - name: default_gateway
      type: string
      description: "Default gateway (optional)"
    - name: dns_server_1
      type: string
      description: "DNS server 1 (optional)"
    - name: dns_server_2
      type: string
      description: "DNS server 2 (optional)"

- id: system_setWirelessLan
  label: Set Wireless LAN (Wi-Fi)
  kind: action
  command: "POST /v1/system/setWirelessLan"
  params:
    - name: ssid
      type: string
      description: "Access point SSID, UTF-8 within 32 bytes (optional)"
    - name: type
      type: enum
      description: "Encryption: none / wep / wpa2-psk(aes) / mixed_mode (optional)"
    - name: key
      type: string
      description: "Encryption key, printable ASCII 0x20-0x7E within 64 chars; invalid when type none (optional)"
    - name: dhcp
      type: string
      description: "DHCP setting (optional)"
    - name: ip_address
      type: string
      description: "IP address (optional)"
    - name: subnet_mask
      type: string
      description: "Subnet mask (optional)"
    - name: default_gateway
      type: string
      description: "Default gateway (optional)"
    - name: dns_server_1
      type: string
      description: "DNS server 1 (optional)"
    - name: dns_server_2
      type: string
      description: "DNS server 2 (optional)"

- id: system_setWirelessDirect
  label: Set Wireless Direct
  kind: action
  command: "POST /v1/system/setWirelessDirect"
  params:
    - name: type
      type: enum
      description: "Encryption: none / wpa2-psk(aes) (optional)"
    - name: key
      type: string
      description: "Encryption key, printable ASCII within 64 chars; invalid when type none (optional)"

- id: system_setIpSettings
  label: Set IP Settings
  kind: action
  command: "POST /v1/system/setIpSettings"
  params:
    - name: dhcp
      type: string
      description: "DHCP setting (optional)"
    - name: ip_address
      type: string
      description: "IP address (optional)"
    - name: subnet_mask
      type: string
      description: "Subnet mask (optional)"
    - name: default_gateway
      type: string
      description: "Default gateway (optional)"
    - name: dns_server_1
      type: string
      description: "DNS server 1 (optional)"
    - name: dns_server_2
      type: string
      description: "DNS server 2 (optional)"

- id: system_setNetworkName
  label: Set Network Name
  kind: action
  command: "POST /v1/system/setNetworkName"
  params:
    - name: name
      type: string
      description: "Network name (friendly name), up to 32 characters"

- id: system_setAirPlayPin
  label: Set AirPlay PIN
  kind: action
  command: "POST /v1/system/setAirPlayPin"
  params:
    - name: pin
      type: string
      description: "AirPlay PIN, printable ASCII within 63 characters"

- id: system_getMacAddressFilter
  label: Get MAC Address Filter
  kind: query
  command: "GET /v1/system/getMacAddressFilter"
  params: []

- id: system_setMacAddressFilter
  label: Set MAC Address Filter
  kind: action
  command: "POST /v1/system/setMacAddressFilter"
  params:
    - name: filter
      type: boolean
      description: "Enable/disable filter (optional)"
    - name: address_1..address_10
      type: string
      description: "MAC addresses 1-10, 12 digit ASCII (optional)"

- id: system_getNetworkStandby
  label: Get Network Standby
  kind: query
  command: "GET /v1/system/getNetworkStandby"
  params: []

- id: system_setNetworkStandby
  label: Set Network Standby
  kind: action
  command: "GET /v1/system/setNetworkStandby?standby={standby}"
  params:
    - name: standby
      type: enum
      description: "off / on / auto (auto only when network_standby_auto in func_list)"

- id: system_getBluetoothInfo
  label: Get Bluetooth Info
  kind: query
  command: "GET /v1/system/getBluetoothInfo"
  params: []

- id: system_setBluetoothStandby
  label: Set Bluetooth Standby
  kind: action
  command: "GET /v1/system/setBluetoothStandby?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "Bluetooth standby setting"

- id: system_setBluetoothTxSetting
  label: Set Bluetooth Transmission
  kind: action
  command: "GET /v1/system/setBluetoothTxSetting?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "Bluetooth transmission setting"

- id: system_getBluetoothDeviceList
  label: Get Bluetooth Device List
  kind: query
  command: "GET /v1/system/getBluetoothDeviceList"
  params: []

- id: system_updateBluetoothDeviceList
  label: Update Bluetooth Device List
  kind: action
  command: "GET /v1/system/updateBluetoothDeviceList"
  params: []

- id: system_connectBluetoothDevice
  label: Connect Bluetooth Device
  kind: action
  command: "GET /v1/system/connectBluetoothDevice?address={address}"
  params:
    - name: address
      type: string
      description: "Bluetooth address (12-digit hex)"

- id: system_disconnectBluetoothDevice
  label: Disconnect Bluetooth Device
  kind: action
  command: "GET /v1/system/disconnectBluetoothDevice"
  params: []

- id: system_getFuncStatus
  label: Get Function Status
  kind: query
  command: "GET /v1/system/getFuncStatus"
  params: []

- id: system_setAutoPowerStandby
  label: Set Auto Power Standby
  kind: action
  command: "GET /v1/system/setAutoPowerStandby?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "Auto Power Standby status"

- id: system_setIrSensor
  label: Set IR Sensor
  kind: action
  command: "GET /v1/system/setIrSensor?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "IR sensor setting"

- id: system_setSpeakerA
  label: Set Speaker A
  kind: action
  command: "GET /v1/system/setSpeakerA?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "Speaker A status"

- id: system_setSpeakerB
  label: Set Speaker B
  kind: action
  command: "GET /v1/system/setSpeakerB?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "Speaker B status"

- id: system_setDimmer
  label: Set FL/LED Dimmer
  kind: action
  command: "GET /v1/system/setDimmer?value={value}"
  params:
    - name: value
      type: integer
      description: "-1 for auto; 0+ manual. Range via /system/getFeatures"

- id: system_setZoneBVolumeSync
  label: Set Zone B Volume Sync
  kind: action
  command: "GET /v1/system/setZoneBVolumeSync?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "Zone B syncs to Zone A volume"

- id: system_setHdmiOut1
  label: Set HDMI Out 1
  kind: action
  command: "GET /v1/system/setHdmiOut1?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "HDMI OUT 1 output status"

- id: system_setHdmiOut2
  label: Set HDMI Out 2
  kind: action
  command: "GET /v1/system/setHdmiOut2?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "HDMI OUT 2 output status"

- id: system_setHdmiOut3
  label: Set HDMI Out 3
  kind: action
  command: "GET /v1/system/setHdmiOut3?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "HDMI OUT 3 output status"

- id: system_getNameText
  label: Get Name Text
  kind: query
  command: "GET /v1/system/getNameText?id={id}"
  params:
    - name: id
      type: string
      description: "Zone/Input/Sound Program ID; omit to retrieve all (optional)"

- id: system_setNameText
  label: Set Name Text
  kind: action
  command: "POST /v1/system/setNameText"
  params:
    - name: id
      type: string
      description: "Zone or Input ID (Input only when rename_enable true; Sound Program not settable). 'main' overwrites Network Name"
    - name: text
      type: string
      description: "UTF-8 within 64 bytes; empty string restores default"

- id: system_getLocationInfo
  label: Get Location Info
  kind: query
  command: "GET /v1/system/getLocationInfo"
  params: []

- id: system_getStereoPairInfo
  label: Get Stereo Pair Info
  kind: query
  command: "GET /v1/system/getStereoPairInfo"
  params: []

- id: system_sendIrCode
  label: Send IR Code
  kind: action
  command: "GET /v1/system/sendIrCode?code={code}"
  params:
    - name: code
      type: string
      description: "IR code, 8-digit hex (see device IR code list; continuous codes not supported)"

- id: system_getRemoteInfo
  label: Get Remote Info
  kind: query
  command: "GET /v1/system/getRemoteInfo"
  params: []

- id: system_requestNetworkReboot
  label: Request Network Reboot
  kind: action
  command: "GET /v1/system/requestNetworkReboot"
  params: []

- id: system_requestSystemReboot
  label: Request System Reboot
  kind: action
  command: "GET /v1/system/requestSystemReboot"
  params: []

- id: system_getAdvancedFeatures
  label: Get Advanced Features
  kind: query
  command: "GET /v1/system/getAdvancedFeatures"
  params: []

- id: system_setAutoPlay
  label: Set Auto Play
  kind: action
  command: "GET /v1/system/setAutoPlay?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "Auto Play setting"

- id: system_setSpeakerPattern
  label: Set Speaker Pattern
  kind: action
  command: "GET /v1/system/setSpeakerPattern?num={num}"
  params:
    - name: num
      type: integer
      description: "Speaker pattern number, 1 to speaker_pattern_num via /system/getFeatures"

- id: system_setPartyMode
  label: Set Party Mode
  kind: action
  command: "GET /v1/system/setPartyMode?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "Party Mode setting"

- id: zone_getStatus
  label: Get Zone Status
  kind: query
  command: "GET /v1/{zone}/getStatus"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"

- id: zone_getSoundProgramList
  label: Get Sound Program List
  kind: query
  command: "GET /v1/{zone}/getSoundProgramList"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"

- id: zone_setPower
  label: Set Zone Power
  kind: action
  command: "GET /v1/{zone}/setPower?power={power}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: power
      type: enum
      description: "on / standby / toggle"

- id: zone_setSleep
  label: Set Zone Sleep Timer
  kind: action
  command: "GET /v1/{zone}/setSleep?sleep={sleep}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: sleep
      type: enum
      description: "0 / 30 / 60 / 90 / 120 (minutes)"

- id: zone_setVolume
  label: Set Zone Volume
  kind: action
  command: "GET /v1/{zone}/setVolume?volume={volume}&step={step}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: volume
      type: string
      description: "Integer value per getFeatures range, or up / down (API 1.17+)"
    - name: step
      type: integer
      description: "Step for up/down; defaults to minimum step (optional, API 1.17+)"

- id: zone_setMute
  label: Set Zone Mute
  kind: action
  command: "GET /v1/{zone}/setMute?enable={enable}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "Mute status"

- id: zone_setInput
  label: Set Zone Input
  kind: action
  command: "GET /v1/{zone}/setInput?input={input}&mode={mode}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: input
      type: string
      description: "Input ID from /system/getFeatures (see All ID List in Notes)"
    - name: mode
      type: enum
      description: "autoplay_disabled restricts Auto Play of Net/USB inputs (optional, API 1.12+)"

- id: zone_setSoundProgram
  label: Set Sound Program
  kind: action
  command: "GET /v1/{zone}/setSoundProgram?program={program}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: program
      type: string
      description: "Sound Program ID via /system/getFeatures (see All ID List in Notes)"

- id: zone_set3dSurround
  label: Set 3D Surround
  kind: action
  command: "GET /v1/{zone}/set3dSurround?enable={enable}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "3D Surround status"

- id: zone_setDirect
  label: Set Direct
  kind: action
  command: "GET /v1/{zone}/setDirect?enable={enable}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "Direct status"

- id: zone_setPureDirect
  label: Set Pure Direct
  kind: action
  command: "GET /v1/{zone}/setPureDirect?enable={enable}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "Pure Direct status"

- id: zone_setEnhancer
  label: Set Enhancer
  kind: action
  command: "GET /v1/{zone}/setEnhancer?enable={enable}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "Enhancer status"

- id: zone_setToneControl
  label: Set Tone Control
  kind: action
  command: "GET /v1/{zone}/setToneControl?mode={mode}&bass={bass}&treble={treble}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: mode
      type: enum
      description: "manual / auto / bypass per getFeatures (optional; bass/treble valid only in manual)"
    - name: bass
      type: integer
      description: "Bass value per getFeatures range (optional)"
    - name: treble
      type: integer
      description: "Treble value per getFeatures range (optional)"

- id: zone_setEqualizer
  label: Set Equalizer
  kind: action
  command: "GET /v1/{zone}/setEqualizer?mode={mode}&low={low}&mid={mid}&high={high}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: mode
      type: enum
      description: "manual / auto / bypass per getFeatures (optional)"
    - name: low
      type: integer
      description: "Low value per getFeatures range (optional)"
    - name: mid
      type: integer
      description: "Mid value per getFeatures range (optional)"
    - name: high
      type: integer
      description: "High value per getFeatures range (optional)"

- id: zone_setBalance
  label: Set L/R Balance
  kind: action
  command: "GET /v1/{zone}/setBalance?value={value}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: value
      type: integer
      description: "Negative = left, positive = right; range per getFeatures"

- id: zone_setDialogueLevel
  label: Set Dialogue Level
  kind: action
  command: "GET /v1/{zone}/setDialogueLevel?value={value}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: value
      type: integer
      description: "Range per getFeatures"

- id: zone_setDialogueLift
  label: Set Dialogue Lift
  kind: action
  command: "GET /v1/{zone}/setDialogueLift?value={value}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: value
      type: integer
      description: "Range per getFeatures"

- id: zone_setClearVoice
  label: Set Clear Voice
  kind: action
  command: "GET /v1/{zone}/setClearVoice?enable={enable}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "Clear Voice setting"

- id: zone_setSubwooferVolume
  label: Set Subwoofer Volume
  kind: action
  command: "GET /v1/{zone}/setSubwooferVolume?volume={volume}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: volume
      type: integer
      description: "Range per getFeatures"

- id: zone_setBassExtension
  label: Set Bass Extension
  kind: action
  command: "GET /v1/{zone}/setBassExtension?enable={enable}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "Bass Extension setting"

- id: zone_getSignalInfo
  label: Get Signal Info
  kind: query
  command: "GET /v1/{zone}/getSignalInfo"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"

- id: zone_prepareInputChange
  label: Prepare Input Change
  kind: action
  command: "GET /v1/{zone}/prepareInputChange?input={input}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: input
      type: string
      description: "Input ID to prepare"

- id: zone_recallScene
  label: Recall Scene
  kind: action
  command: "GET /v1/{zone}/recallScene?num={num}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: num
      type: integer
      description: "Scene number per getFeatures (example shows scene_num 8)"

- id: zone_setContentsDisplay
  label: Set Contents Display
  kind: action
  command: "GET /v1/{zone}/setContentsDisplay?enable={enable}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "Screen display status"

- id: zone_controlCursor
  label: Control Cursor
  kind: action
  command: "GET /v1/{zone}/controlCursor?cursor={cursor}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: cursor
      type: enum
      description: "up / down / left / right / select / return (per cursor_list)"

- id: zone_controlMenu
  label: Control Menu
  kind: action
  command: "GET /v1/{zone}/controlMenu?menu={menu}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: menu
      type: enum
      description: "on_screen / top_menu / menu / option / display / help / home / mode / red / green / yellow / blue (per menu_list)"

- id: zone_setActualVolume
  label: Set Actual (Display) Volume
  kind: action
  command: "GET /v1/{zone}/setActualVolume?mode={mode}&value={value}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: mode
      type: enum
      description: "db / numeric per actual_volume_mode_list"
    - name: value
      type: float
      description: "Display volume; range per getFeatures (optional)"

- id: zone_setAudioSelect
  label: Set Audio Select
  kind: action
  command: "GET /v1/{zone}/setAudioSelect?type={type}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: type
      type: enum
      description: "auto / hdmi / coax_opt / analog (not unavailable)"

- id: zone_setSurroundDecoderType
  label: Set Surround Decoder Type
  kind: action
  command: "GET /v1/{zone}/setSurroundDecoderType?type={type}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4"
    - name: type
      type: enum
      description: "toggle / auto / dolby_pl / dolby_pl2x_movie / dolby_pl2x_music / dolby_pl2x_game / dolby_surround / dts_neural_x / dts_neo6_cinema / dts_neo6_music"

- id: tuner_getPresetInfo
  label: Tuner Get Preset Info
  kind: query
  command: "GET /v1/tuner/getPresetInfo?band={band}"
  params:
    - name: band
      type: enum
      description: "common (band-common preset type) or am / fm / dab (separate type)"

- id: tuner_getPlayInfo
  label: Tuner Get Play Info
  kind: query
  command: "GET /v1/tuner/getPlayInfo"
  params: []

- id: tuner_setBand
  label: Tuner Set Band
  kind: action
  command: "GET /v1/tuner/setBand?band={band}"
  params:
    - name: band
      type: enum
      description: "am / fm / dab"

- id: tuner_setFreq
  label: Tuner Set Frequency
  kind: action
  command: "GET /v1/tuner/setFreq?band={band}&tuning={tuning}&num={num}"
  params:
    - name: band
      type: enum
      description: "am / fm"
    - name: tuning
      type: enum
      description: "up / down / cancel / auto_up / auto_down / tp_up / tp_down / direct (tp_* only when Band is RDS)"
    - name: num
      type: integer
      description: "Frequency in kHz; valid only when tuning=direct (optional)"

- id: tuner_recallPreset
  label: Tuner Recall Preset
  kind: action
  command: "GET /v1/tuner/recallPreset?zone={zone}&band={band}&num={num}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4 (input changes in this zone)"
    - name: band
      type: enum
      description: "common or am / fm / dab per preset type"
    - name: num
      type: integer
      description: "Preset number per getFeatures"

- id: tuner_switchPreset
  label: Tuner Switch Preset
  kind: action
  command: "GET /v1/tuner/switchPreset?dir={dir}"
  params:
    - name: dir
      type: enum
      description: "next / previous (API 1.17+; call after switching zone input to Tuner)"

- id: tuner_storePreset
  label: Tuner Store Preset
  kind: action
  command: "GET /v1/tuner/storePreset?num={num}"
  params:
    - name: num
      type: integer
      description: "Preset number per getFeatures"

- id: tuner_clearPreset
  label: Tuner Clear Preset
  kind: action
  command: "GET /v1/tuner/clearPreset?band={band}&num={num}"
  params:
    - name: band
      type: enum
      description: "common or am / fm / dab per preset type"
    - name: num
      type: integer
      description: "Preset number per getFeatures"

- id: tuner_startAutoPreset
  label: Tuner Start Auto Preset (FM)
  kind: action
  command: "GET /v1/tuner/startAutoPreset?band={band}"
  params:
    - name: band
      type: enum
      description: "fm"

- id: tuner_cancelAutoPreset
  label: Tuner Cancel Auto Preset (FM)
  kind: action
  command: "GET /v1/tuner/cancelAutoPreset?band={band}"
  params:
    - name: band
      type: enum
      description: "fm"

- id: tuner_movePreset
  label: Tuner Move Preset
  kind: action
  command: "GET /v1/tuner/movePreset?band={band}&from={from}&to={to}"
  params:
    - name: band
      type: enum
      description: "common or am / fm / dab per preset type"
    - name: from
      type: integer
      description: "Source preset number"
    - name: to
      type: integer
      description: "Destination preset number"

- id: tuner_startDabInitialScan
  label: Tuner Start DAB Initial Scan
  kind: action
  command: "GET /v1/tuner/startDabInitialScan"
  params: []

- id: tuner_cancelDabInitialScan
  label: Tuner Cancel DAB Initial Scan
  kind: action
  command: "GET /v1/tuner/cancelDabInitialScan"
  params: []

- id: tuner_setDabTuneAid
  label: Tuner DAB Tune Aid
  kind: action
  command: "GET /v1/tuner/setDabTuneAid?action={action}"
  params:
    - name: action
      type: enum
      description: "start / stop / up / down"

- id: tuner_setDabService
  label: Tuner Select DAB Service
  kind: action
  command: "GET /v1/tuner/setDabService?dir={dir}"
  params:
    - name: dir
      type: enum
      description: "next / previous"

- id: netusb_getPresetInfo
  label: Net/USB Get Preset Info
  kind: query
  command: "GET /v1/netusb/getPresetInfo"
  params: []

- id: netusb_getPlayInfo
  label: Net/USB Get Play Info
  kind: query
  command: "GET /v1/netusb/getPlayInfo"
  params: []

- id: netusb_setPlayback
  label: Net/USB Set Playback
  kind: action
  command: "GET /v1/netusb/setPlayback?playback={playback}"
  params:
    - name: playback
      type: enum
      description: "play / stop / pause / play_pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end"

- id: netusb_setPlayPosition
  label: Net/USB Set Play Position
  kind: action
  command: "GET /v1/netusb/setPlayPosition?position={position}"
  params:
    - name: position
      type: integer
      description: "Play position in seconds (Server input only)"

- id: netusb_setRepeat
  label: Net/USB Set Repeat
  kind: action
  command: "GET /v1/netusb/setRepeat?mode={mode}"
  params:
    - name: mode
      type: enum
      description: "off / one / all (API 1.19+)"

- id: netusb_setShuffle
  label: Net/USB Set Shuffle
  kind: action
  command: "GET /v1/netusb/setShuffle?mode={mode}"
  params:
    - name: mode
      type: enum
      description: "off / on / songs / albums (API 1.19+)"

- id: netusb_toggleRepeat
  label: Net/USB Toggle Repeat
  kind: action
  command: "GET /v1/netusb/toggleRepeat"
  params: []

- id: netusb_toggleShuffle
  label: Net/USB Toggle Shuffle
  kind: action
  command: "GET /v1/netusb/toggleShuffle"
  params: []

- id: netusb_getListInfo
  label: Net/USB Get List Info
  kind: query
  command: "GET /v1/netusb/getListInfo?input={input}&index={index}&size={size}&lang={lang}"
  params:
    - name: list_id
      type: enum
      description: "main / auto_complete / search_artist / search_track (optional, defaults main)"
    - name: input
      type: string
      description: "Net/USB Input ID"
    - name: index
      type: integer
      description: "Reference index, multiple of 8, 0..64992 (optional)"
    - name: size
      type: integer
      description: "Max rows per retrieval, 1-8"
    - name: lang
      type: enum
      description: "en / ja / fr / de / es / ru / it / zh (optional, defaults en)"

- id: netusb_setListControl
  label: Net/USB List Control
  kind: action
  command: "GET /v1/netusb/setListControl?list_id={list_id}&type={type}&index={index}&zone={zone}"
  params:
    - name: list_id
      type: enum
      description: "main / auto_complete / search_artist / search_track (optional, defaults main)"
    - name: type
      type: enum
      description: "select / play / return (select and play require index)"
    - name: index
      type: integer
      description: "Element position 0-64999 (optional)"
    - name: zone
      type: enum
      description: "Playback zone; valid with type=play (optional, defaults main)"

- id: netusb_setSearchString
  label: Net/USB Set Search String
  kind: action
  command: "POST /v1/netusb/setSearchString"
  params:
    - name: list_id
      type: enum
      description: "main / auto_complete / search_artist / search_track (optional, defaults main)"
    - name: string
      type: string
      description: "Search text"
    - name: index
      type: integer
      description: "Element to select, 0-64999; valid only when list_id=main (optional)"

- id: netusb_recallPreset
  label: Net/USB Recall Preset
  kind: action
  command: "GET /v1/netusb/recallPreset?zone={zone}&num={num}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4 (input changes in this zone)"
    - name: num
      type: integer
      description: "Preset number per getFeatures"

- id: netusb_storePreset
  label: Net/USB Store Preset
  kind: action
  command: "GET /v1/netusb/storePreset?num={num}"
  params:
    - name: num
      type: integer
      description: "Preset number per getFeatures"

- id: netusb_clearPreset
  label: Net/USB Clear Preset
  kind: action
  command: "GET /v1/netusb/clearPreset?num={num}"
  params:
    - name: num
      type: integer
      description: "Preset number per getFeatures"

- id: netusb_movePreset
  label: Net/USB Move Preset
  kind: action
  command: "GET /v1/netusb/movePreset?from={from}&to={to}"
  params:
    - name: from
      type: integer
      description: "Source preset number"
    - name: to
      type: integer
      description: "Destination preset number"

- id: netusb_getSettings
  label: Net/USB Get Settings
  kind: query
  command: "GET /v1/netusb/getSettings"
  params: []

- id: netusb_setQuality
  label: Net/USB Set Streaming Quality
  kind: action
  command: "GET /v1/netusb/setQuality?input={input}&value={value}"
  params:
    - name: input
      type: enum
      description: "qobuz"
    - name: value
      type: enum
      description: "hr_192_24 / hr_96_24 / cd_44_16 / mp3_320"

- id: netusb_getRecentInfo
  label: Net/USB Get Recent Info
  kind: query
  command: "GET /v1/netusb/getRecentInfo"
  params: []

- id: netusb_recallRecentItem
  label: Net/USB Recall Recent Item
  kind: action
  command: "GET /v1/netusb/recallRecentItem?zone={zone}&num={num}"
  params:
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4 (input changes in this zone)"
    - name: num
      type: integer
      description: "History entry number per getFeatures"

- id: netusb_clearRecentInfo
  label: Net/USB Clear Recent Info
  kind: action
  command: "GET /v1/netusb/clearRecentInfo"
  params: []

- id: netusb_managePlay
  label: Net/USB Manage Play
  kind: action
  command: "GET /v1/netusb/managePlay?type={type}&timeout={timeout}"
  params:
    - name: type
      type: enum
      description: "add_bookmark / add_track / add_album / add_channel_track / add_channel_artist / add_playlist / add_to_playlist / thumbs_up / thumbs_down / mark_tired"
    - name: bank
      type: integer
      description: "Reserved (optional)"
    - name: timeout
      type: integer
      description: "Process timeout ms, 0-60000; 0 = maximum"

- id: netusb_manageList
  label: Net/USB Manage List
  kind: action
  command: "GET /v1/netusb/manageList?list_id={list_id}&type={type}&index={index}&zone={zone}&bank={bank}&timeout={timeout}"
  params:
    - name: list_id
      type: enum
      description: "main / auto_complete / search_artist / search_track (optional, defaults main)"
    - name: type
      type: enum
      description: "add_bookmark / add_track / add_album / add_artist / add_channel / add_playlist / remove_bookmark / remove_track / remove_album / remove_artist / remove_channel / remove_playlist / remove_from_playlist / end_auto_complete"
    - name: index
      type: integer
      description: "Reference index 0-64999 (optional; unset for end_auto_complete)"
    - name: zone
      type: enum
      description: "main / zone2 / zone3 / zone4; only for add_channel with Pandora list_ids (optional)"
    - name: bank
      type: integer
      description: "Reserved (optional)"
    - name: timeout
      type: integer
      description: "Process timeout ms, 0-60000; 0 = maximum"

- id: netusb_getPlayDescription
  label: Net/USB Get Play Description
  kind: query
  command: "GET /v1/netusb/getPlayDescription?type={type}&timeout={timeout}"
  params:
    - name: type
      type: enum
      description: "why_this_song (Pandora)"
    - name: timeout
      type: integer
      description: "Process timeout ms, 0-60000; 0 = maximum"

- id: netusb_setListSortOption
  label: Net/USB Set List Sort Option
  kind: action
  command: "GET /v1/netusb/setListSortOption?input={input}&type={type}"
  params:
    - name: input
      type: enum
      description: "pandora"
    - name: type
      type: enum
      description: "Sort method per sort_option_list (date / alphabet / recent)"

- id: netusb_getAccountStatus
  label: Net/USB Get Account Status
  kind: query
  command: "GET /v1/netusb/getAccountStatus"
  params: []

- id: netusb_getServiceInfo
  label: Net/USB Get Service Info
  kind: query
  command: "GET /v1/netusb/getServiceInfo?input={input}&type={type}&timeout={timeout}"
  params:
    - name: input
      type: enum
      description: "pandora / napster"
    - name: type
      type: enum
      description: "account_list (Pandora) / licensing (Napster, Pandora) / activation_code (Pandora)"
    - name: timeout
      type: integer
      description: "Process timeout ms, 0-60000; 0 = maximum"

- id: cd_getPlayInfo
  label: CD Get Play Info
  kind: query
  command: "GET /v1/cd/getPlayInfo"
  params: []

- id: cd_setPlayback
  label: CD Set Playback
  kind: action
  command: "GET /v1/cd/setPlayback?playback={playback}&num={num}"
  params:
    - name: playback
      type: enum
      description: "play / stop / pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end / track_select"
    - name: num
      type: integer
      description: "Track number 1-512; valid only with track_select (optional)"

- id: cd_toggleTray
  label: CD Toggle Tray
  kind: action
  command: "GET /v1/cd/toggleTray"
  params: []

- id: cd_setRepeat
  label: CD Set Repeat
  kind: action
  command: "GET /v1/cd/setRepeat?mode={mode}"
  params:
    - name: mode
      type: enum
      description: "off / one / all / folder (API 1.19+)"

- id: cd_setShuffle
  label: CD Set Shuffle
  kind: action
  command: "GET /v1/cd/setShuffle?mode={mode}"
  params:
    - name: mode
      type: enum
      description: "off / on / folder (API 1.19+)"

- id: cd_toggleRepeat
  label: CD Toggle Repeat
  kind: action
  command: "GET /v1/cd/toggleRepeat"
  params: []

- id: cd_toggleShuffle
  label: CD Toggle Shuffle
  kind: action
  command: "GET /v1/cd/toggleShuffle"
  params: []

- id: clock_getSettings
  label: Clock Get Settings
  kind: query
  command: "GET /v1/clock/getSettings"
  params: []

- id: clock_setAutoSync
  label: Clock Set Auto Sync
  kind: action
  command: "GET /v1/clock/setAutoSync?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "Clock time auto sync validity"

- id: clock_setDateAndTime
  label: Clock Set Date And Time
  kind: action
  command: "GET /v1/clock/setDateAndTime?date_time={date_time}"
  params:
    - name: date_time
      type: string
      description: "Format YYMMDDhhmmss; YY 00-99, MM 01-12, DD 01-31, hh 00-23, mm 00-59, ss 00-59"

- id: clock_setClockFormat
  label: Clock Set Format
  kind: action
  command: "GET /v1/clock/setClockFormat?format={format}"
  params:
    - name: format
      type: enum
      description: "12h / 24h"

- id: clock_setAlarmSettings
  label: Clock Set Alarm Settings
  kind: action
  command: "POST /v1/clock/setAlarmSettings"
  params:
    - name: alarm_on
      type: boolean
      description: "Alarm on/off (optional)"
    - name: volume
      type: integer
      description: "Alarm volume per getFeatures alarm_volume (optional)"
    - name: fade_interval
      type: integer
      description: "Fade interval seconds per getFeatures alarm_fade (optional)"
    - name: fade_type
      type: integer
      description: "1 to fade_type_max per getFeatures (optional)"
    - name: mode
      type: enum
      description: "oneday / weekly per getFeatures (optional)"
    - name: repeat
      type: boolean
      description: "Repeat; valid only with mode oneday (optional)"
    - name: detail
      type: object
      description: "Per-day detail: day (oneday/sunday..saturday), enable, time (hhmm), beep, playback_type (resume/preset), resume.input, preset.type/num, snooze (optional)"
```

## Feedbacks
```yaml
- id: response_code
  type: integer
  values: [0, 1, 2, 3, 4, 5, 6, 99, 100]
  description: "0 successful; 1 initializing; 2 internal error; 3 invalid request; 4 invalid parameter; 5 guarded; 6 time out; 99 firmware updating; 100s streaming-service errors; 200s distribution errors. Always returned; no other data when nonzero"

- id: zone_power
  type: enum
  values: [on, standby]
  description: "Per zone, from /v1/{zone}/getStatus power and events"

- id: zone_input
  type: string
  description: "Selected Input ID per zone (IDs via /system/getFeatures; see All ID List in Notes)"

- id: zone_volume
  type: integer
  description: "Per zone; range dynamic via /system/getFeatures range_step (example shows 0-194 step 1)"

- id: zone_mute
  type: boolean
  description: "Per zone, from /v1/{zone}/getStatus mute and events"

- id: zone_sleep
  type: enum
  values: [0, 30, 60, 90, 120]
  description: "Sleep timer minutes per zone"

- id: zone_sound_program
  type: string
  description: "Selected Sound Program ID per zone (see All ID List in Notes)"

- id: netusb_playback
  type: enum
  values: [play, stop, pause, fast_reverse, fast_forward]
  description: "From /v1/netusb/getPlayInfo playback"

- id: cd_playback
  type: enum
  values: [play, stop, pause, fast_reverse, fast_forward]
  description: "From /v1/cd/getPlayInfo playback"

- id: cd_device_status
  type: enum
  values: [open, close, ready, not_ready]
  description: "CD tray/device status"

- id: signal_info
  type: object
  description: "Per zone from /v1/{zone}/getSignalInfo: audio.error (0-5), audio.format (Analog/Digital/PCM/MPCM/WAV/FLAC/MP3/WMA/AAC/ALAC/AIFF/DSD/Vorbis/SBC), audio.fs (8 kHz - 11.2 MHz enumerated list)"

- id: network_status
  type: object
  description: "From /v1/system/getNetworkStatus: connection, dhcp, ip_address, subnet_mask, default_gateway, dns_server_1/2, wireless_lan (ssid/type/ch/strength), mac_address"

- id: bluetooth_device
  type: object
  description: "From /v1/system/getBluetoothInfo: connected, name, type (loudspeaker/headphone/handsfree_device/unknown), address"

- id: tuner_play_info
  type: object
  description: "From /v1/tuner/getPlayInfo: band (am/fm/dab), per-band preset/freq/tuned, fm audio_mode (mono/stereo), rds fields, dab fields (status, freq 174000-240000 kHz, quality 0-100, etc.)"
```

## Variables
```yaml
# Ranges are device- and zone-dependent; source states they are discovered at runtime
# via /system/getFeatures range_step. Static min/max/step therefore UNRESOLVED here.
- id: zone_volume_level
  type: integer
  description: "Volume per zone; range via getFeatures range_step (example: 0-194 step 1)"
  # UNRESOLVED: static range not stated for CX-A5200BL

- id: zone_actual_volume
  type: float
  description: "Display volume; db (example -80.5..16.5 step 0.5) or numeric (example 0.0..97.0 step 0.5); ranges via getFeatures"
  # UNRESOLVED: static range not stated for CX-A5200BL

- id: zone_tone_control
  type: object
  description: "bass/treble; main example -12..12 step 1, zone2 example -5..5; via getFeatures"

- id: zone_balance
  type: integer
  description: "L/R balance; negative = left, positive = right; range via getFeatures"

- id: dimmer
  type: integer
  description: "FL/LED dimmer; -1 = auto, 0+ manual; range via getFeatures"

- id: alarm_volume
  type: integer
  description: "Alarm volume; range via getFeatures alarm_volume"
```

## Events
```yaml
- id: yxc_status_event
  transport: "UDP unicast JSON to the client port declared in request header X-AppPort"
  subscription: "Include 'X-AppName: MusicCast/<ver>(<os>)' and 'X-AppPort: <port>' headers on YXC HTTP requests; event subscription times out after 10 minutes without a further request from that IP; a different X-AppPort from the same client overwrites the port"
  payload: "JSON object containing only changed/valid subsystems: system, main, zone2, zone3, zone4, tuner, netusb, cd, dist, clock, device_id (device_id on API 1.17+)"
  key_fields:
    - "system: bluetooth_info_updated, bluetooth_device_list_updated, func_status_updated, name_text_updated, location_info_updated"
    - "main/zone2/zone3/zone4: power (on/standby), input, volume, mute, status_updated, signal_info_updated"
    - "tuner: play_info_updated, preset_info_updated"
    - "netusb: play_error (0-11,100), multiple_play_errors bitfield, play_message (256 bytes max), account_updated, play_time, preset_info_updated, recent_info_updated, preset_control (store/clear/recall result), trial_status, play_info_updated, list_info_updated"
    - "cd: device_status, play_time, play_info_updated"
    - "dist: dist_info_updated"
    - "clock: settings_updated"
  note: "UDP is lossy; source requires polling (getStatus, getPlayInfo) to recover missed events"
```

## Macros
```yaml
- id: browse_and_play_netusb
  description: "Source section 13.1 - browse and play a Net/USB list item"
  steps:
    - "GET /v1/{zone}/prepareInputChange?input={input} (pre-change processing)"
    - "GET /v1/{zone}/setInput?input={input}&mode=autoplay_disabled (if explicit input change needed)"
    - "GET /v1/netusb/getListInfo?input={input}&index={index}&size=8&lang=en (page through with index in multiples of 8)"
    - "GET /v1/netusb/setListControl?list_id=main&type=select&index={index} (descend layer; always follow with getListInfo before another select)"
    - "GET /v1/netusb/setListControl?list_id=main&type=play&index={index}&zone={zone} (play item; verify attribute Capable of Play)"
    - "GET /v1/netusb/setListControl?list_id=main&type=return (ascend one layer)"

- id: device_discovery
  description: "Source section 13.2 - find MusicCast devices on the network"
  steps:
    - "UPnP SSDP M-SEARCH for MediaRenderer"
    - "GET the device description URL from the Location header"
    - "Verify <manufacturer>Yamaha Corporation</manufacturer>, <yamaha:X_device> tag, <yamaha:X_yxcControlURL>/YamahaExtendedControl/v1/</yamaha:X_yxcControlURL>"

- id: stereo_pair_control
  description: "Source section 13.4 - confirm pair then control master only"
  steps:
    - "GET /v1/system/getStereoPairInfo on DeviceA and DeviceB to confirm master/slave status"
    - "Send control requests (e.g. GET /v1/main/setPower?power=standby) to the master device only; slave follows"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on
# sequencing requirements. Never inferred.
```

## Notes
- Source is the Yamaha Extended Control API Specification (Basic) Rev. 2.00 — generic for MusicCast devices. CX-A5200BL is not named inside it; confirm model coverage at runtime via `/system/getDeviceInfo` (model_name, api_version, category_code — 1 = AV Receiver class).
- Spec Rev 2.00 applies only to devices upgraded to firmware supporting API version 2.00 or later. Backward compatibility is assured: all APIs with version ≤ the device's api_version (read via getDeviceInfo) are supported. Firmware compatibility range otherwise UNRESOLVED.
- `getListInfo` is the only command that blocks other commands — up to 30 seconds for full list retrieval. Never chain `setListControl:select` twice without a `getListInfo` between them (source: select → getListInfo → select → getListInfo).
- Event delivery is UDP unicast and lossy; poll `getStatus`/`getPlayInfo` to recover. MusicCast CONTROLLER reference polling: every 10 s all rooms, every 5 s selected device.
- Zone A is handled as "main"; Zone B is handled as "zone2" (a Zone-B device reports zone_num 2).
- Source typos (use example-request spellings): 5.26 URI table prints "controlMemu" but example uses `controlMenu`; 5.29 URI table prints "setAudioSelect" but example uses `setSurroundDecoderType`.
- Response code list: 0 success, 1 initializing, 2 internal error, 3 invalid request, 4 invalid parameter, 5 guarded, 6 time out, 99 firmware updating; 100-115 streaming-service errors (100 access error, 102/103 wrong username/password, 106 account limit, 109 license, 110 read-only, 111 max stations, 112 access denied...); 200/201 linking/unlinking in progress.
- All ID List — Zone: main / zone2 / zone3 / zone4. Input: cd, tuner, multi_ch, phono, hdmi1-hdmi8, hdmi, av1-av7, v_aux, aux1, aux2, aux, audio1-audio5, audio_cd, audio, optical1, optical2, optical, coaxial1, coaxial2, coaxial, digital1, digital2, digital, line1, line2, line3, line_cd, analog, tv, bd_dvd, usb_dac, usb, bluetooth, server, net_radio, napster, pandora, siriusxm, spotify, juke, airplay, radiko, qobuz, tidal, deezer, mc_link, main_sync, none. Sound Program: munich_a, munich_b, munich, frankfurt, stuttgart, vienna, amsterdam, usa_a, usa_b, tokyo, freiburg, royaumont, chamber, concert, village_gate, village_vanguard, warehouse_loft, cellar_club, jazz_club, roxy_theatre, bottom_line, arena, sports, action_game, roleplaying_game, game, music_video, music, recital_opera, pavilion, disco, standard, spectacle, sci-fi, adventure, drama, talk_show, tv_program, mono_movie, movie, enhanced, 2ch_stereo, 5ch_stereo, 7ch_stereo, 9ch_stereo, 11ch_stereo, stereo, surr_decoder, my_surround, target, bass_booster, straight, off.
- Album art may be jpg/png/bmp or ymf (Yamaha-proprietary encrypted format). albumart_url is relative to the device host.
- MusicCast Link distribution and other advanced functions are in the separate YXC Specification (Advanced) document — not covered by this source (e.g. `/dist/getDistributionInfo` referenced but not defined here).
<!-- UNRESOLVED: HTTP port for YXC base URL not stated (UPnP X_URLBase example shows 80). -->
<!-- UNRESOLVED: per-zone volume/tone/balance/dimmer ranges are runtime-discovered via getFeatures; static values not in source. -->
<!-- UNRESOLVED: device RS-232C terminal exists (per Owner's Manual) but serial command syntax not present in this source. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
  - forum.smartapfel.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7r8QTdkYFNfJVJmKbtqvdleuzKt.pdf
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://forum.smartapfel.de/attachment/4372-yxc-api-spec-basic-pdf/
retrieved_at: 2026-08-30T16:32:59.783Z
last_checked_at: 2026-08-31T22:16:13.770Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-31T22:16:13.770Z
matched_actions: 124
action_count: 124
confidence: medium
summary: "All 124 spec actions match HTTP endpoints in source sections 4-9 verbatim with method/path/enum alignment; transport base URL is documented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is Yamaha's generic YXC (MusicCast) API specification — CX-A5200BL is not named inside it (examples cite RX-V479/RX-V679/WXC-50). Applicability to this model is asserted by the spec family/context, not by model name in the document. Verify against device via /system/getDeviceInfo (model_name, api_version)."
- "HTTP port not stated for the YXC base URL (a UPnP X_URLBase example shows :80, but that is one device example, not a stated API port)."
- "device also has an RS-232C terminal per its Owner's Manual, but no serial command syntax exists in this source."
- "firmware version compatibility range not stated in source."
- "port number not stated in source (UPnP X_URLBase example shows 80, not normative)"
- "static range not stated for CX-A5200BL"
- "source contains no safety warnings, interlock procedures, or power-on"
- "HTTP port for YXC base URL not stated (UPnP X_URLBase example shows 80)."
- "per-zone volume/tone/balance/dimmer ranges are runtime-discovered via getFeatures; static values not in source."
- "device RS-232C terminal exists (per Owner's Manual) but serial command syntax not present in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
