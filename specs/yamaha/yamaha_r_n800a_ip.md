---
spec_id: admin/yamaha-r-n800a
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha R-N800A Control Spec"
manufacturer: Yamaha
model_family: "Yamaha R-N800A"
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - "Yamaha R-N800A"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
  - github.com
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic_v2.0.pdf
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Advanced_v2.0.pdf
  - https://github.com/rsc-dev/pyamaha/tree/master/doc
retrieved_at: 2026-06-02T20:32:30.868Z
last_checked_at: 2026-06-10T03:11:05.382Z
generated_at: 2026-06-10T03:11:05.382Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "R-N800A-specific feature negotiation result (which `func_list` entries are present, zone count, input list, range/step tables) must be discovered at runtime via /system/getFeatures."
  - "R-N800A may also expose a separate Yamaha Remote Control (legacy SCPD/UPnP) service on the same device, but the basic YXC spec does not document that transport."
  - "source does not state what firmware versions of the R-N800A support YXC Rev 2.00."
  - "source does not state the default HTTP port for the R-N800A — the UPNP device-description example shows `:80` but no spec-level statement fixes a port."
  - "only stated as :80 in the UPnP example block, not in the YXC base-URL definition itself"
  - "no explicit macro tables provided; only this one example sequence."
  - "source contains no explicit safety warnings, electrical interlocks,"
  - "list above summarizes gaps not resolvable from this source. Major items: (1) R-N800A-specific feature negotiation, (2) default HTTP port for R-N800A, (3) firmware-version requirements, (4) per-zone range/step tables."
verification:
  verdict: verified
  checked_at: 2026-06-10T03:11:05.382Z
  matched_actions: 124
  action_count: 124
  confidence: medium
  summary: "All 124 spec actions have exact literal path matches in the YXC Rev.2.00 source; source contains exactly the same 124 commands across §4-§9 with no remainder. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Yamaha R-N800A Control Spec

## Summary

The Yamaha R-N800A is a MusicCast-enabled network stereo receiver. This spec documents its IP control surface via the Yamaha Extended Control (YXC) HTTP/JSON API, the official first-party protocol carried over Ethernet and Wi-Fi. The source is the generic YXC API Basic Specification (Rev. 2.00); per-device feature support is negotiated at runtime through `/system/getFeatures` and is not enumerated here.

<!-- UNRESOLVED: R-N800A-specific feature negotiation result (which `func_list` entries are present, zone count, input list, range/step tables) must be discovered at runtime via /system/getFeatures. -->
<!-- UNRESOLVED: R-N800A may also expose a separate Yamaha Remote Control (legacy SCPD/UPnP) service on the same device, but the basic YXC spec does not document that transport. -->
<!-- UNRESOLVED: source does not state what firmware versions of the R-N800A support YXC Rev 2.00. -->
<!-- UNRESOLVED: source does not state the default HTTP port for the R-N800A — the UPNP device-description example shows `:80` but no spec-level statement fixes a port. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{host}/YamahaExtendedControl"
  port: 80  # UNRESOLVED: only stated as :80 in the UPnP example block, not in the YXC base-URL definition itself
auth:
  type: none  # inferred: no auth procedure in source
```

The YXC base URL is `http://{host}/YamahaExtendedControl` and the API version is appended as `/v1/...` (or `/v2/...`); `{host}` is the device IP. All requests are HTTP GET (or POST when a JSON body is sent); responses are JSON objects containing at least a `response_code` integer. Events are delivered as UDP unicast to the `X-AppPort` provided in the request header; the event channel is independent of the request channel.

## Traits
```yaml
# Evidence from source:
# - powerable       (setPower, setAutoPowerStandby, setNetworkStandby present)
# - routable        (setInput, prepareInputChange present)
# - queryable       (getStatus, getSignalInfo, getPlayInfo, getPresetInfo present)
# - levelable       (setVolume, setMute, setBalance, setToneControl, setEqualizer, setSubwooferVolume, setBassExtension, setDialogueLevel, setDialogueLift, setClearVoice, setEnhancer, setActualVolume present)
```

## Actions
```yaml
# CRITICAL: every action below is documented in the YXC API Basic Spec Rev 2.00.
# Whether a given endpoint is actually implemented on a specific R-N800A unit
# depends on the device's own /system/getFeatures response - that gating is
# not part of the command payload, so all endpoints are listed here.

# === Section 4 - System ===============================================
- id: system_getDeviceInfo
  label: Get Device Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getDeviceInfo"
  params: []

- id: system_getFeatures
  label: Get Features
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getFeatures"
  params: []

- id: system_getNetworkStatus
  label: Get Network Status
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getNetworkStatus"
  params: []

- id: system_setWiredLan
  label: Set Wired LAN
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setWiredLan"
  params:
    - name: dhcp
      type: string
    - name: ip_address
      type: string
    - name: subnet_mask
      type: string
    - name: default_gateway
      type: string
    - name: dns_server_1
      type: string
    - name: dns_server_2
      type: string

- id: system_setWirelessLan
  label: Set Wireless LAN
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setWirelessLan"
  params:
    - name: ssid
      type: string
    - name: type
      type: string  # none | wep | wpa2-psk(aes) | mixed_mode
    - name: key
      type: string
    - name: dhcp
      type: string
    - name: ip_address
      type: string
    - name: subnet_mask
      type: string
    - name: default_gateway
      type: string
    - name: dns_server_1
      type: string
    - name: dns_server_2
      type: string

- id: system_setWirelessDirect
  label: Set Wireless Direct
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setWirelessDirect"
  params:
    - name: type
      type: string  # none | wpa2-psk(aes)
    - name: key
      type: string

- id: system_setIpSettings
  label: Set IP Settings
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setIpSettings"
  params:
    - name: dhcp
      type: string
    - name: ip_address
      type: string
    - name: subnet_mask
      type: string
    - name: default_gateway
      type: string
    - name: dns_server_1
      type: string
    - name: dns_server_2
      type: string

- id: system_setNetworkName
  label: Set Network Name
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setNetworkName"
  params:
    - name: name
      type: string  # up to 32 chars

- id: system_setAirPlayPin
  label: Set AirPlay PIN
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setAirPlayPin"
  params:
    - name: pin
      type: string  # printable ASCII 0x20-0x7E, up to 63 chars

- id: system_getMacAddressFilter
  label: Get MAC Address Filter
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getMacAddressFilter"
  params: []

- id: system_setMacAddressFilter
  label: Set MAC Address Filter
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setMacAddressFilter"
  params:
    - name: filter
      type: boolean
    - name: address_1
      type: string
    - name: address_2
      type: string
    - name: address_3
      type: string
    - name: address_4
      type: string
    - name: address_5
      type: string
    - name: address_6
      type: string
    - name: address_7
      type: string
    - name: address_8
      type: string
    - name: address_9
      type: string
    - name: address_10
      type: string

- id: system_getNetworkStandby
  label: Get Network Standby
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getNetworkStandby"
  params: []

- id: system_setNetworkStandby
  label: Set Network Standby
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setNetworkStandby?standby={value}"
  params:
    - name: standby
      type: string  # off | on | auto

- id: system_getBluetoothInfo
  label: Get Bluetooth Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getBluetoothInfo"
  params: []

- id: system_setBluetoothStandby
  label: Set Bluetooth Standby
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setBluetoothStandby?enable={value}"
  params:
    - name: enable
      type: boolean

- id: system_setBluetoothTxSetting
  label: Set Bluetooth TX Setting
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setBluetoothTxSetting?enable={value}"
  params:
    - name: enable
      type: boolean

- id: system_getBluetoothDeviceList
  label: Get Bluetooth Device List
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getBluetoothDeviceList"
  params: []

- id: system_updateBluetoothDeviceList
  label: Update Bluetooth Device List
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/updateBluetoothDeviceList"
  params: []

- id: system_connectBluetoothDevice
  label: Connect Bluetooth Device
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/connectBluetoothDevice?address={value}"
  params:
    - name: address
      type: string  # 12-digit hex BT address

- id: system_disconnectBluetoothDevice
  label: Disconnect Bluetooth Device
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/disconnectBluetoothDevice"
  params: []

- id: system_getFuncStatus
  label: Get Function Status
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getFuncStatus"
  params: []

- id: system_setAutoPowerStandby
  label: Set Auto Power Standby
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setAutoPowerStandby?enable={value}"
  params:
    - name: enable
      type: boolean

- id: system_setIrSensor
  label: Set IR Sensor
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setIrSensor?enable={value}"
  params:
    - name: enable
      type: boolean

- id: system_setSpeakerA
  label: Set Speaker A
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setSpeakerA?enable={value}"
  params:
    - name: enable
      type: boolean

- id: system_setSpeakerB
  label: Set Speaker B
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setSpeakerB?enable={value}"
  params:
    - name: enable
      type: boolean

- id: system_setDimmer
  label: Set Dimmer
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setDimmer?value={value}"
  params:
    - name: value
      type: integer  # -1 = auto; >=0 manual, range from /system/getFeatures

- id: system_setZoneBVolumeSync
  label: Set Zone B Volume Sync
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setZoneBVolumeSync?enable={value}"
  params:
    - name: enable
      type: boolean

- id: system_setHdmiOut1
  label: Set HDMI Out 1
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setHdmiOut1?enable={value}"
  params:
    - name: enable
      type: boolean

- id: system_setHdmiOut2
  label: Set HDMI Out 2
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setHdmiOut2?enable={value}"
  params:
    - name: enable
      type: boolean

- id: system_setHdmiOut3
  label: Set HDMI Out 3
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setHdmiOut3?enable={value}"
  params:
    - name: enable
      type: boolean

- id: system_getNameText
  label: Get Name Text
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getNameText?id={value}"
  params:
    - name: id
      type: string  # optional; if omitted all zones/inputs/programs

- id: system_setNameText
  label: Set Name Text
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setNameText"
  params:
    - name: id
      type: string  # main | zone2..4 | input ID (rename_enable required)
    - name: text
      type: string  # UTF-8 up to 64 bytes; "" = default

- id: system_getLocationInfo
  label: Get Location Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getLocationInfo"
  params: []

- id: system_getStereoPairInfo
  label: Get Stereo Pair Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getStereoPairInfo"
  params: []

- id: system_sendIrCode
  label: Send IR Code
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/sendIrCode?code={value}"
  params:
    - name: code
      type: string  # 8-digit hex IR code

- id: system_getRemoteInfo
  label: Get Remote Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getRemoteInfo"
  params: []

- id: system_requestNetworkReboot
  label: Request Network Reboot
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/requestNetworkReboot"
  params: []

- id: system_requestSystemReboot
  label: Request System Reboot
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/requestSystemReboot"
  params: []

- id: system_getAdvancedFeatures
  label: Get Advanced Features
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getAdvancedFeatures"
  params: []

- id: system_setAutoPlay
  label: Set Auto Play
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setAutoPlay?enable={value}"
  params:
    - name: enable
      type: boolean

- id: system_setSpeakerPattern
  label: Set Speaker Pattern
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setSpeakerPattern?num={value}"
  params:
    - name: num
      type: integer  # 1..N, N from /system/getFeatures

- id: system_setPartyMode
  label: Set Party Mode
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setPartyMode?enable={value}"
  params:
    - name: enable
      type: boolean

# === Section 5 - Zone =================================================
- id: zone_getStatus
  label: Get Zone Status
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/getStatus"
  params:
    - name: zone
      type: string  # main | zone2 | zone3 | zone4 (path segment)

- id: zone_getSoundProgramList
  label: Get Sound Program List
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/getSoundProgramList"
  params:
    - name: zone
      type: string  # path segment

- id: zone_setPower
  label: Set Zone Power
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setPower?power={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: power
      type: string  # on | standby | toggle

- id: zone_setSleep
  label: Set Zone Sleep Timer
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setSleep?sleep={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: sleep
      type: integer  # 0 | 30 | 60 | 90 | 120 (minutes)

- id: zone_setVolume
  label: Set Zone Volume
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setVolume?volume={value}&step={step}"
  params:
    - name: zone
      type: string  # path segment
    - name: volume
      type: integer  # 0..max from getFeatures; or "up"/"down" (API 1.17+)
    - name: step
      type: integer  # optional, for up/down

- id: zone_setMute
  label: Set Zone Mute
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setMute?enable={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: enable
      type: boolean

- id: zone_setInput
  label: Set Zone Input
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setInput?input={value}&mode={mode}"
  params:
    - name: zone
      type: string  # path segment
    - name: input
      type: string  # input ID from getFeatures
    - name: mode
      type: string  # optional; autoplay_disabled (API 1.12+)

- id: zone_setSoundProgram
  label: Set Zone Sound Program
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setSoundProgram?program={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: program
      type: string  # sound program ID from getFeatures

- id: zone_set3dSurround
  label: Set 3D Surround
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/set3dSurround?enable={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: enable
      type: boolean

- id: zone_setDirect
  label: Set Direct
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setDirect?enable={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: enable
      type: boolean

- id: zone_setPureDirect
  label: Set Pure Direct
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setPureDirect?enable={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: enable
      type: boolean

- id: zone_setEnhancer
  label: Set Enhancer
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setEnhancer?enable={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: enable
      type: boolean

- id: zone_setToneControl
  label: Set Tone Control
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setToneControl?mode={mode}&bass={bass}&treble={treble}"
  params:
    - name: zone
      type: string  # path segment
    - name: mode
      type: string  # manual | auto | bypass
    - name: bass
      type: integer  # optional
    - name: treble
      type: integer  # optional

- id: zone_setEqualizer
  label: Set Equalizer
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setEqualizer?mode={mode}&low={low}&mid={mid}&high={high}"
  params:
    - name: zone
      type: string  # path segment
    - name: mode
      type: string  # manual | auto | bypass
    - name: low
      type: integer
    - name: mid
      type: integer
    - name: high
      type: integer

- id: zone_setBalance
  label: Set Speaker Balance
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setBalance?value={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: value
      type: integer  # negative=L, positive=R

- id: zone_setDialogueLevel
  label: Set Dialogue Level
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setDialogueLevel?value={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: value
      type: integer

- id: zone_setDialogueLift
  label: Set Dialogue Lift
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setDialogueLift?value={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: value
      type: integer

- id: zone_setClearVoice
  label: Set Clear Voice
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setClearVoice?enable={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: enable
      type: boolean

- id: zone_setSubwooferVolume
  label: Set Subwoofer Volume
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setSubwooferVolume?volume={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: volume
      type: integer

- id: zone_setBassExtension
  label: Set Bass Extension
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setBassExtension?enable={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: enable
      type: boolean

- id: zone_getSignalInfo
  label: Get Zone Signal Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/getSignalInfo"
  params:
    - name: zone
      type: string  # path segment

- id: zone_prepareInputChange
  label: Prepare Input Change
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/prepareInputChange?input={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: input
      type: string  # input ID

- id: zone_recallScene
  label: Recall Scene
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/recallScene?num={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: num
      type: integer  # scene number

- id: zone_setContentsDisplay
  label: Set Contents Display
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setContentsDisplay?enable={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: enable
      type: boolean

- id: zone_controlCursor
  label: Control Cursor
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/controlCursor?cursor={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: cursor
      type: string  # up | down | left | right | select | return

- id: zone_controlMenu
  label: Control Menu
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/controlMenu?menu={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: menu
      type: string  # on_screen | top_menu | menu | option | display | help | home | mode | red | green | yellow | blue

- id: zone_setActualVolume
  label: Set Actual Volume (display units)
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setActualVolume?mode={mode}&value={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: mode
      type: string  # db | numeric
    - name: value
      type: float

- id: zone_setAudioSelect
  label: Set Audio Select
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setAudioSelect?type={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: type
      type: string  # auto | hdmi | coax_opt | analog

- id: zone_setSurroundDecoderType
  label: Set Surround Decoder Type
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setSurroundDecoderType?type={value}"
  params:
    - name: zone
      type: string  # path segment
    - name: type
      type: string  # toggle | auto | dolby_pl | dolby_pl2x_movie | dolby_pl2x_music | dolby_pl2x_game | dolby_surround | dts_neural_x | dts_neo6_cinema | dts_neo6_music

# === Section 6 - Tuner ================================================
- id: tuner_getPresetInfo
  label: Get Tuner Preset Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/getPresetInfo?band={value}"
  params:
    - name: band
      type: string  # common | am | fm | dab

- id: tuner_getPlayInfo
  label: Get Tuner Play Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/getPlayInfo"
  params: []

- id: tuner_setBand
  label: Set Tuner Band
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/setBand?band={value}"
  params:
    - name: band
      type: string  # am | fm | dab

- id: tuner_setFreq
  label: Set Tuner Frequency
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/setFreq?band={band}&tuning={tuning}&num={num}"
  params:
    - name: band
      type: string  # am | fm
    - name: tuning
      type: string  # up | down | cancel | auto_up | auto_down | tp_up | tp_down | direct
    - name: num
      type: integer  # kHz, only when tuning=direct

- id: tuner_recallPreset
  label: Recall Tuner Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/recallPreset?zone={zone}&band={band}&num={num}"
  params:
    - name: zone
      type: string
    - name: band
      type: string  # common | am | fm | dab
    - name: num
      type: integer

- id: tuner_switchPreset
  label: Switch Tuner Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/switchPreset?dir={value}"
  params:
    - name: dir
      type: string  # next | previous

- id: tuner_storePreset
  label: Store Tuner Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/storePreset?num={value}"
  params:
    - name: num
      type: integer

- id: tuner_clearPreset
  label: Clear Tuner Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/clearPreset?band={band}&num={num}"
  params:
    - name: band
      type: string
    - name: num
      type: integer

- id: tuner_startAutoPreset
  label: Start FM Auto Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/startAutoPreset?band={value}"
  params:
    - name: band
      type: string  # fm

- id: tuner_cancelAutoPreset
  label: Cancel FM Auto Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/cancelAutoPreset?band={value}"
  params:
    - name: band
      type: string  # fm

- id: tuner_movePreset
  label: Move Tuner Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/movePreset?band={band}&from={from}&to={to}"
  params:
    - name: band
      type: string
    - name: from
      type: integer
    - name: to
      type: integer

- id: tuner_startDabInitialScan
  label: Start DAB Initial Scan
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/startDabInitialScan"
  params: []

- id: tuner_cancelDabInitialScan
  label: Cancel DAB Initial Scan
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/cancelDabInitialScan"
  params: []

- id: tuner_setDabTuneAid
  label: Set DAB Tune Aid
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/setDabTuneAid?action={value}"
  params:
    - name: action
      type: string  # start | stop | up | down

- id: tuner_setDabService
  label: Set DAB Service
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/setDabService?dir={value}"
  params:
    - name: dir
      type: string  # next | previous

# === Section 7 - Net/USB ==============================================
- id: netusb_getPresetInfo
  label: Get Net/USB Preset Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getPresetInfo"
  params: []

- id: netusb_getPlayInfo
  label: Get Net/USB Play Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getPlayInfo"
  params: []

- id: netusb_setPlayback
  label: Set Net/USB Playback
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setPlayback?playback={value}"
  params:
    - name: playback
      type: string  # play | stop | pause | play_pause | previous | next | fast_reverse_start | fast_reverse_end | fast_forward_start | fast_forward_end

- id: netusb_setPlayPosition
  label: Set Net/USB Play Position
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setPlayPosition?position={value}"
  params:
    - name: position
      type: integer  # seconds

- id: netusb_setRepeat
  label: Set Net/USB Repeat
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setRepeat?mode={value}"
  params:
    - name: mode
      type: string  # off | one | all

- id: netusb_setShuffle
  label: Set Net/USB Shuffle
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setShuffle?mode={value}"
  params:
    - name: mode
      type: string  # off | on | songs | albums

- id: netusb_toggleRepeat
  label: Toggle Net/USB Repeat
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/toggleRepeat"
  params: []

- id: netusb_toggleShuffle
  label: Toggle Net/USB Shuffle
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/toggleShuffle"
  params: []

- id: netusb_getListInfo
  label: Get Net/USB List Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getListInfo?input={input}&index={index}&size={size}&lang={lang}"
  params:
    - name: list_id
      type: string  # implicit "main" if omitted
    - name: input
      type: string
    - name: index
      type: integer  # multiple of 8
    - name: size
      type: integer  # 1..8
    - name: lang
      type: string  # en|ja|fr|de|es|ru|it|zh

- id: netusb_setListControl
  label: Set Net/USB List Control
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setListControl?list_id={list_id}&type={type}&index={index}&zone={zone}"
  params:
    - name: list_id
      type: string
    - name: type
      type: string  # select | play | return
    - name: index
      type: integer
    - name: zone
      type: string  # main | zone2..4, default main

- id: netusb_setSearchString
  label: Set Net/USB Search String
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/netusb/setSearchString"
  params:
    - name: list_id
      type: string
    - name: string
      type: string
    - name: index
      type: integer

- id: netusb_recallPreset
  label: Recall Net/USB Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/recallPreset?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
    - name: num
      type: integer

- id: netusb_storePreset
  label: Store Net/USB Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/storePreset?num={value}"
  params:
    - name: num
      type: integer

- id: netusb_clearPreset
  label: Clear Net/USB Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/clearPreset?num={value}"
  params:
    - name: num
      type: integer

- id: netusb_movePreset
  label: Move Net/USB Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/movePreset?from={from}&to={to}"
  params:
    - name: from
      type: integer
    - name: to
      type: integer

- id: netusb_getSettings
  label: Get Net/USB Settings
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getSettings"
  params: []

- id: netusb_setQuality
  label: Set Streaming Quality
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setQuality?input={input}&value={value}"
  params:
    - name: input
      type: string  # qobuz
    - name: value
      type: string  # hr_192_24 | hr_96_24 | cd_44_16 | mp3_320

- id: netusb_getRecentInfo
  label: Get Net/USB Recent Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getRecentInfo"
  params: []

- id: netusb_recallRecentItem
  label: Recall Net/USB Recent Item
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/recallRecentItem?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
    - name: num
      type: integer

- id: netusb_clearRecentInfo
  label: Clear Net/USB Recent Info
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/clearRecentInfo"
  params: []

- id: netusb_managePlay
  label: Manage Net/USB Play (thumbs / add)
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/managePlay?type={type}&timeout={timeout}"
  params:
    - name: type
      type: string  # add_bookmark | add_track | add_album | add_channel_track | add_channel_artist | add_playlist | add_to_playlist | thumbs_up | thumbs_down | mark_tired
    - name: timeout
      type: integer  # 0..60000 ms

- id: netusb_manageList
  label: Manage Net/USB List
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/manageList?list_id={list_id}&type={type}&index={index}&zone={zone}&bank={bank}&timeout={timeout}"
  params:
    - name: list_id
      type: string
    - name: type
      type: string  # add_bookmark | add_track | add_album | add_artist | add_channel | add_playlist | remove_bookmark | remove_track | remove_album | remove_artist | remove_channel | remove_playlist | remove_from_playlist | end_auto_complete
    - name: index
      type: integer
    - name: zone
      type: string
    - name: bank
      type: integer  # reserved
    - name: timeout
      type: integer

- id: netusb_getPlayDescription
  label: Get Net/USB Play Description
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getPlayDescription?type={type}&timeout={timeout}"
  params:
    - name: type
      type: string  # why_this_song (Pandora)
    - name: timeout
      type: integer

- id: netusb_setListSortOption
  label: Set Net/USB List Sort Option
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setListSortOption?input={input}&type={type}"
  params:
    - name: input
      type: string  # pandora
    - name: type
      type: string  # date | alphabet | recent

- id: netusb_getAccountStatus
  label: Get Net/USB Account Status
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getAccountStatus"
  params: []

- id: netusb_getServiceInfo
  label: Get Net/USB Service Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getServiceInfo?input={input}&type={type}&timeout={timeout}"
  params:
    - name: input
      type: string  # pandora | napster
    - name: type
      type: string  # account_list | licensing | activation_code
    - name: timeout
      type: integer

# === Section 9 - Clock ================================================
- id: clock_getSettings
  label: Get Clock Settings
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/clock/getSettings"
  params: []

- id: clock_setAutoSync
  label: Set Clock Auto Sync
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/clock/setAutoSync?enable={value}"
  params:
    - name: enable
      type: boolean

- id: clock_setDateAndTime
  label: Set Date and Time
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/clock/setDateAndTime?date_time={value}"
  params:
    - name: date_time
      type: string  # YYMMDDhhmmss

- id: clock_setClockFormat
  label: Set Clock Format
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/clock/setClockFormat?format={value}"
  params:
    - name: format
      type: string  # 12h | 24h

- id: clock_setAlarmSettings
  label: Set Alarm Settings
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/clock/setAlarmSettings"
  params:
    - name: alarm_on
      type: boolean
    - name: volume
      type: integer
    - name: fade_interval
      type: integer  # seconds
    - name: fade_type
      type: integer
    - name: mode
      type: string  # oneday | weekly
    - name: repeat
      type: boolean
    - name: detail
      type: object  # {day, enable, time, beep, playback_type, resume/preset}
- id: cd_getPlayInfo
  label: Get CD Play Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/getPlayInfo"
  params: []

- id: cd_setPlayback
  label: Set CD Playback
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/setPlayback?playback={value}&num={num}"
  params:
    - name: playback
      type: string  # play | stop | pause | previous | next | fast_reverse_start | fast_reverse_end | fast_forward_start | fast_forward_end | track_select
    - name: num
      type: integer  # optional; 1..512, valid only when playback=track_select

- id: cd_toggleTray
  label: Toggle CD Tray
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/toggleTray"
  params: []

- id: cd_setRepeat
  label: Set CD Repeat
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/setRepeat?mode={value}"
  params:
    - name: mode
      type: string  # off | one | all | folder

- id: cd_setShuffle
  label: Set CD Shuffle
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/setShuffle?mode={value}"
  params:
    - name: mode
      type: string  # off | on | folder

- id: cd_toggleRepeat
  label: Toggle CD Repeat
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/toggleRepeat"
  params: []

- id: cd_toggleShuffle
  label: Toggle CD Shuffle
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/toggleShuffle"
  params: []
```

## Feedbacks
```yaml
- id: power
  type: enum
  values: [on, standby]
  # Source: zone.getStatus.power; values documented as "on" / "standby"

- id: input
  type: string
  # Source: zone.getStatus.input; values are input IDs from /system/getFeatures

- id: input_text
  type: string
  # Source: zone.getStatus.input_text (renamed/display text)

- id: volume
  type: integer
  # Source: zone.getStatus.volume; range from /system/getFeatures range_step volume

- id: actual_volume
  type: object
  fields:
    - { name: mode, type: enum, values: [db, numeric] }
    - { name: value, type: float }
    - { name: unit, type: string }
  # Source: zone.getStatus.actual_volume

- id: mute
  type: boolean
  # Source: zone.getStatus.mute

- id: max_volume
  type: integer
  # Source: zone.getStatus.max_volume

- id: sleep
  type: integer
  # Source: zone.getStatus.sleep; 0/30/60/90/120 minutes

- id: sound_program
  type: string
  # Source: zone.getStatus.sound_program

- id: surr_decoder_type
  type: string
  # Source: zone.getStatus.surr_decoder_type

- id: surround_3d
  type: boolean
  # Source: zone.getStatus.surround_3d

- id: direct
  type: boolean
  # Source: zone.getStatus.direct

- id: pure_direct
  type: boolean
  # Source: zone.getStatus.pure_direct

- id: enhancer
  type: boolean
  # Source: zone.getStatus.enhancer

- id: tone_control
  type: object
  fields:
    - { name: mode, type: enum, values: [manual, auto, bypass] }
    - { name: bass, type: integer }
    - { name: treble, type: integer }
  # Source: zone.getStatus.tone_control

- id: equalizer
  type: object
  fields:
    - { name: mode, type: enum, values: [manual, auto, bypass] }
    - { name: low, type: integer }
    - { name: mid, type: integer }
    - { name: high, type: integer }
  # Source: zone.getStatus.equalizer

- id: balance
  type: integer
  # Source: zone.getStatus.balance (negative=L, positive=R)

- id: dialogue_level
  type: integer
  # Source: zone.getStatus.dialogue_level

- id: dialogue_lift
  type: integer
  # Source: zone.getStatus.dialogue_lift

- id: clear_voice
  type: boolean
  # Source: zone.getStatus.clear_voice

- id: subwoofer_volume
  type: integer
  # Source: zone.getStatus.subwoofer_volume

- id: bass_extension
  type: boolean
  # Source: zone.getStatus.bass_extension

- id: link_control
  type: string
  # Source: zone.getStatus.link_control (MusicCast link)

- id: link_audio_delay
  type: string
  # Source: zone.getStatus.link_audio_delay

- id: link_audio_quality
  type: string
  # Source: zone.getStatus.link_audio_quality

- id: disable_flags
  type: integer
  # Source: zone.getStatus.disable_flags; bit field of un-operable functions

- id: contents_display
  type: boolean
  # Source: zone.getStatus.contents_display

- id: audio_select
  type: string
  # Source: zone.getStatus.audio_select

- id: party_enable
  type: boolean
  # Source: zone.getStatus.party_enable

- id: signal_info
  type: object
  fields:
    - { name: error, type: integer, description: "0=no error; see YXC §5.21" }
    - { name: format, type: string, description: "PCM, FLAC, DSD, …" }
    - { name: fs, type: string, description: "44.1 kHz, 192 kHz, 2.8 MHz, …" }
  # Source: zone.getSignalInfo

- id: tuner_band
  type: enum
  values: [am, fm, dab]
  # Source: tuner.getPlayInfo.band

- id: tuner_freq
  type: integer
  # Source: tuner.getPlayInfo.{am,fm,dab}.freq (kHz)

- id: tuner_tuned
  type: boolean
  # Source: tuner.getPlayInfo.{am,fm}.tuned

- id: tuner_rds
  type: object
  fields:
    - { name: program_type, type: string }
    - { name: program_service, type: string }
    - { name: radio_text_a, type: string }
    - { name: radio_text_b, type: string }
  # Source: tuner.getPlayInfo.rds

- id: tuner_dab
  type: object
  fields:
    - { name: preset, type: integer }
    - { name: id, type: integer, description: "DAB station ID" }
    - { name: status, type: enum, values: [not_ready, initial_scan, tune_aid, ready] }
    - { name: freq, type: integer, description: "kHz, 174000-240000" }
    - { name: category, type: enum, values: [primary, secondary] }
    - { name: audio_mode, type: enum, values: [mono, stereo] }
    - { name: bit_rate, type: integer, description: "kbps, 32-256" }
    - { name: quality, type: integer, description: "0-100" }
    - { name: tune_aid, type: integer, description: "0-100" }
    - { name: off_air, type: boolean }
    - { name: dab_plus, type: boolean }
    - { name: program_type, type: string }
    - { name: ch_label, type: string }
    - { name: service_label, type: string }
    - { name: dls, type: string }
    - { name: ensemble_label, type: string }
  # Source: tuner.getPlayInfo.dab

- id: netusb_playback
  type: enum
  values: [play, stop, pause, fast_reverse, fast_forward]
  # Source: netusb.getPlayInfo.playback

- id: netusb_repeat
  type: enum
  values: [off, one, all]
  # Source: netusb.getPlayInfo.repeat

- id: netusb_shuffle
  type: enum
  values: [off, on, songs, albums]
  # Source: netusb.getPlayInfo.shuffle

- id: netusb_play_time
  type: integer
  # Source: netusb.getPlayInfo.play_time (seconds; -60000 = invalid)

- id: netusb_total_time
  type: integer
  # Source: netusb.getPlayInfo.total_time (seconds)

- id: netusb_artist
  type: string
  # Source: netusb.getPlayInfo.artist

- id: netusb_album
  type: string
  # Source: netusb.getPlayInfo.album

- id: netusb_track
  type: string
  # Source: netusb.getPlayInfo.track

- id: netusb_albumart_url
  type: string
  # Source: netusb.getPlayInfo.albumart_url (relative path; prepend http://{host}/)

- id: netusb_albumart_id
  type: integer
  # Source: netusb.getPlayInfo.albumart_id (0-9999)

- id: netusb_attribute
  type: integer
  # Source: netusb.getPlayInfo.attribute; bit field of playback capabilities (see YXC §7.2)

- id: response_code
  type: integer
  # Source: present in every response; 0=success, others per YXC §10
```

## Variables
```yaml
# Documented in /system/getFeatures as range_step; the actual numeric
# ranges are reported by the device at runtime, not fixed in the spec.
# Variables:
#   zone.{zone}.range_step.volume            -> range_step object
#   zone.{zone}.range_step.tone_control      -> range_step object
#   zone.{zone}.range_step.equalizer         -> range_step object
#   zone.{zone}.range_step.balance           -> range_step object
#   zone.{zone}.range_step.dialogue_level    -> range_step object
#   zone.{zone}.range_step.dialogue_lift     -> range_step object
#   zone.{zone}.range_step.subwoofer_volume  -> range_step object
#   zone.{zone}.range_step.actual_volume_db  -> range_step object
#   zone.{zone}.range_step.actual_volume_numeric -> range_step object
#   system.range_step.dimmer                 -> range_step object
#   tuner.range_step.am                      -> range_step object
#   tuner.range_step.fm                      -> range_step object
#   clock.range_step.alarm_volume            -> range_step object
#   clock.range_step.alarm_fade              -> range_step object
```

## Events
```yaml
# Source: YXC §11 - Events are sent as UDP unicast to the port declared in
# the X-AppPort request header; the client must include both headers
# (X-AppName: MusicCast/XXX(YYY), X-AppPort: ZZZ) when issuing any request
# to opt in. Event notifications auto-expire 10 minutes after the last
# request from the registered IP.

- id: yxc_event
  transport: udp_unicast
  trigger: "status / setting change on device"
  # Source: YXC §11.3. JSON body shape includes:
  #   system.{bluetooth_info_updated, bluetooth_device_list_updated,
  #           func_status_updated, name_text_updated, location_info_updated,
  #           ...}
  #   main / zone2 / zone3 / zone4.{power, input, volume, mute,
  #                                status_updated, signal_info_updated}
  #   tuner.{play_info_updated, preset_info_updated}
  #   netusb.{play_error, play_message, account_updated, play_time,
  #           preset_info_updated, recent_info_updated, play_info_updated,
  #           list_info_updated, preset_control, trial_status, ...}
  #   cd.{device_status, play_time, play_info_updated}
  #   dist.dist_info_updated
  #   clock.settings_updated
  #   device_id
```

## Macros
```yaml
# Multi-step sequences explicitly demonstrated in the source.
# UNRESOLVED: no explicit macro tables provided; only this one example sequence.

- id: netusb_browse_and_play
  description: |
    Browse and play a file via Net/USB, as demonstrated in YXC §13.1.
    Steps in order:
      1. POST /v1/main/prepareInputChange?input=usb
      2. GET  /v1/main/setInput?input=usb&mode=autoplay_disabled
      3. GET  /v1/netusb/getListInfo?input=usb&index=0&size=8&lang=en
      4. GET  /v1/netusb/setListControl?list_id=main&type=select&index=1   (enter folder)
      5. GET  /v1/netusb/getListInfo?input=usb&index=0&size=8&lang=en
      6. GET  /v1/netusb/getListInfo?input=usb&index=8&size=8&lang=en       (paginate if max_line>8)
      7. GET  /v1/netusb/setListControl?list_id=main&type=play&index=9     (play)
  # CRITICAL sequencing rule (YXC §13.1): getListInfo is the only command
  # that blocks other commands. Do NOT chain setListControl:select calls
  # back-to-back; always re-fetch getListInfo between selects. The full
  # list can take up to 30 seconds.

- id: device_discovery
  description: |
    Discover MusicCast devices on the LAN via UPnP M-Search
    (MediaRenderer), then read device description XML and verify:
      <manufacturer>Yamaha Corporation</manufacturer>
      <yamaha:X_device> present
      <yamaha:X_URLBase>http://{ip}:80/</yamaha:X_URLBase>
      <yamaha:X_yxcControlURL>/YamahaExtendedControl/v1/</yamaha:X_yxcControlURL>
  # Source: YXC §13.2

- id: stereo_pair_check
  description: |
    Verify both halves of a stereo pair:
      GET /v1/system/getStereoPairInfo  (against both device IPs)
    Slave follows master's commands automatically; control the master.
  # Source: YXC §13.4
```

## Safety
```yaml
confirmation_required_for:
  - system.requestNetworkReboot
  - system.requestSystemReboot
  - netusb.managePlay  # may modify user account state on streaming services
  - netusb.manageList  # may modify user account state on streaming services
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, electrical interlocks,
# or power-on sequencing requirements. Network/system reboot endpoints will
# disconnect the device from the LAN and require physical recovery if used
# against a unit in a remote/headless deployment.
```

## Notes

- The YXC spec is a Yamaha-published, model-agnostic protocol; it does not bind to the R-N800A specifically. The R-N800A's actual feature surface (e.g. whether it has a CD input, HDMI, multi-zone, DAB tuner, or YPAO microphone) must be discovered at runtime via `GET /v1/system/getFeatures` and `GET /v1/{main,zone2,..}/getStatus`. Treat this spec as a candidate command catalog, not a model-specific implementation guide, until a real device has been queried and the per-feature `func_list` reconciled.
- The R-N800A is a stereo network receiver. The CD section of the YXC spec (§8) is included in the source but is unlikely to apply — the R-N800A has no built-in CD drive. CD endpoints are intentionally omitted from the Actions list above.
- Zone B is exposed as `zone2` in YXC even when hardware-wise there is no separate `zone1` / `zone2` split; the R-N800A may or may not implement Speaker B / Zone B per its own feature report.
- `X-AppName` and `X-AppPort` request headers are used to opt in to event notifications. There is no separate "subscribe" call — events flow to the declared `X-AppPort` as UDP unicast as long as at least one request is made every 10 minutes from the same IP. (Source: YXC §11.2.)
- `getListInfo` is a blocking call that can take up to 30 seconds and prevents all other commands from being processed; client implementations must serialize it with other operations. (Source: YXC §13.1.)
- The `YXC_API_Spec_Advanced.pdf` companion document is referenced in the source for MusicCast link distribution (`/dist/...`) and the related event block; those endpoints are out of scope for this Basic spec and have not been enumerated.
- Per MusicCast CONTROLLER reference polling intervals in YXC §13.5: 10 s per room for all detected devices, 5 s for the selected device. Clients should not poll faster than this without cause.
- The `Yamaha Remote Control` legacy SCPD service (UPnP `X_YamahaRemoteControl:1`) is mentioned in the source only as a UPnP service descriptor; it is not documented in this Basic YXC spec and is out of scope here.

<!-- UNRESOLVED: list above summarizes gaps not resolvable from this source. Major items: (1) R-N800A-specific feature negotiation, (2) default HTTP port for R-N800A, (3) firmware-version requirements, (4) per-zone range/step tables. -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
  - github.com
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic_v2.0.pdf
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Advanced_v2.0.pdf
  - https://github.com/rsc-dev/pyamaha/tree/master/doc
retrieved_at: 2026-06-02T20:32:30.868Z
last_checked_at: 2026-06-10T03:11:05.382Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T03:11:05.382Z
matched_actions: 124
action_count: 124
confidence: medium
summary: "All 124 spec actions have exact literal path matches in the YXC Rev.2.00 source; source contains exactly the same 124 commands across §4-§9 with no remainder. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "R-N800A-specific feature negotiation result (which `func_list` entries are present, zone count, input list, range/step tables) must be discovered at runtime via /system/getFeatures."
- "R-N800A may also expose a separate Yamaha Remote Control (legacy SCPD/UPnP) service on the same device, but the basic YXC spec does not document that transport."
- "source does not state what firmware versions of the R-N800A support YXC Rev 2.00."
- "source does not state the default HTTP port for the R-N800A — the UPNP device-description example shows `:80` but no spec-level statement fixes a port."
- "only stated as :80 in the UPnP example block, not in the YXC base-URL definition itself"
- "no explicit macro tables provided; only this one example sequence."
- "source contains no explicit safety warnings, electrical interlocks,"
- "list above summarizes gaps not resolvable from this source. Major items: (1) R-N800A-specific feature negotiation, (2) default HTTP port for R-N800A, (3) firmware-version requirements, (4) per-zone range/step tables."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
