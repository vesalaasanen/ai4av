---
spec_id: admin/yamaha-universal-discrete-functions
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha MusicCast (YXC) Control Spec"
manufacturer: Yamaha
model_family: RX-V479
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - RX-V479
    - RX-V679
    - WXC-50
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community-openhab-org.s3-eu-central-1.amazonaws.com
  - raw.githubusercontent.com
  - scribd.com
source_urls:
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
  - https://raw.githubusercontent.com/akentner/yamaha-avr2mqtt/master/docs/YNCA/text/YNCA_Command_List_RX-A3010_B.txt
  - https://raw.githubusercontent.com/akentner/yamaha-avr2mqtt/master/docs/YNCA/text/YNCA_Command_List_RX-A1010_B.txt
  - https://raw.githubusercontent.com/akentner/yamaha-avr2mqtt/master/docs/YNCA/text/YNCA_Command_List_RX-A2010_B.txt
  - https://www.scribd.com/document/742598124/Yamaha-Ynca-Receivers-Protocol
retrieved_at: 2026-08-01T10:08:50.380Z
last_checked_at: 2026-08-05T08:51:37.054Z
generated_at: 2026-08-05T08:51:37.054Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "\"Universal Discrete Functions\" is a Crestron ecosystem naming for this family; the actual source document is the YXC API spec. Firmware version compatibility not stated. Exact TCP port not stated as a spec default (only appears in an SSDP device-description example)."
  - "port not stated as a spec default; \":80\" appears only in the"
  - "device-specific variable min/max/step not statically determinable."
  - "no named macros in source."
  - "\"Universal Discrete Functions\" is a Crestron-side family name; the underlying vendor doc is the Yamaha Extended Control (YXC) API Specification (Basic) Rev. 1.10."
  - "exact default TCP port not specified as a spec rule (only appears as :80 in an SSDP device-description example)."
  - "firmware version compatibility ranges not stated."
  - "device-specific value ranges (volume/tone/EQ/alarm) are dynamic via /system/getFeatures, not statically enumerable."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:51:37.054Z
  matched_actions: 105
  action_count: 105
  confidence: medium
  summary: "All 105 spec endpoints appear verbatim in the refined YXC source as URI templates; transport base_url is verbatim; one-to-one coverage with no drift. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Yamaha MusicCast (YXC) Control Spec

## Summary
Yamaha Extended Control (YXC) is Yamaha's HTTP-based control protocol sent over Ethernet and Wi-Fi to control MusicCast-enabled A/V devices (AVRs, preamps, etc.). This spec covers the "Basic" API (Rev. 1.10): system, zone, tuner, Network/USB, CD, and clock endpoints, plus UDP-unicast event notifications. All requests are HTTP GET/POST against a base URL of `http://{host}/YamahaExtendedControl`; responses are JSON with a `response_code` field.

<!-- UNRESOLVED: "Universal Discrete Functions" is a Crestron ecosystem naming for this family; the actual source document is the YXC API spec. Firmware version compatibility not stated. Exact TCP port not stated as a spec default (only appears in an SSDP device-description example). -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{host}/YamahaExtendedControl"
  # UNRESOLVED: port not stated as a spec default; ":80" appears only in the
  # SSDP device-description XML example (<yamaha:X_URLBase>http://192.168.10.103:80/</yamaha:X_URLBase>).
  port: 80  # from device-description example only
auth:
  type: none  # inferred: no auth procedure in source
# NOTE: Event notifications are pushed as UDP unicast (see Events section).
# Receiving app advertises itself via X-AppName / X-AppPort request headers.
```

## Traits
```yaml
traits:
  - powerable    # inferred from /<zone>/setPower
  - routable     # inferred from /<zone>/setInput
  - queryable    # inferred from /<zone>/getStatus, /netusb/getPlayInfo, etc.
  - levelable    # inferred from /<zone>/setVolume, setToneControl, setBalance
```

## Actions
```yaml
# Each endpoint = ONE action (parameterized; {zone}, {input} etc. are param
# ranges within the single documented method). Verbatim URI paths from source.

# ---- 4. System ----
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
      description: "Specifies DHCP setting"
    - name: ip_address
      type: string
      description: "Specifies IP Address"
    - name: subnet_mask
      type: string
      description: "Specifies Subnet Mask"
    - name: default_gateway
      type: string
      description: "Specifies Default Gateway"
    - name: dns_server_1
      type: string
      description: "Specifies DNS Server 1"
    - name: dns_server_2
      type: string
      description: "Specifies DNS Server 2"

- id: system_setWirelessLan
  label: Set Wireless LAN (Wi-Fi)
  kind: action
  command: "POST /v1/system/setWirelessLan"
  params:
    - name: ssid
      type: string
      description: "Access point SSID (UTF-8 within 32 bytes)"
    - name: type
      type: string
      description: "Encryption type: none / wep / wpa2-psk(aes) / mixed_mode"
    - name: key
      type: string
      description: "Encryption key (printable ASCII 0x20-0x7E within 64 chars)"
    - name: dhcp
      type: string
      description: "Specifies DHCP setting"
    - name: ip_address
      type: string
      description: "Specifies IP Address"
    - name: subnet_mask
      type: string
      description: "Specifies Subnet Mask"
    - name: default_gateway
      type: string
      description: "Specifies Default Gateway"
    - name: dns_server_1
      type: string
      description: "Specifies DNS Server 1"
    - name: dns_server_2
      type: string
      description: "Specifies DNS Server 2"

- id: system_setWirelessDirect
  label: Set Wireless Network (Wireless Direct)
  kind: action
  command: "POST /v1/system/setWirelessDirect"
  params:
    - name: type
      type: string
      description: "Encryption type: none / wpa2-psk(aes)"
    - name: key
      type: string
      description: "Encryption key (printable ASCII 0x20-0x7E within 64 chars)"

- id: system_setIpSettings
  label: Set IP Settings
  kind: action
  command: "POST /v1/system/setIpSettings"
  params:
    - name: dhcp
      type: string
      description: "Specifies DHCP setting"
    - name: ip_address
      type: string
      description: "Specifies IP Address"
    - name: subnet_mask
      type: string
      description: "Specifies Subnet Mask"
    - name: default_gateway
      type: string
      description: "Specifies Default Gateway"
    - name: dns_server_1
      type: string
      description: "Specifies DNS Server 1"
    - name: dns_server_2
      type: string
      description: "Specifies DNS Server 2"

- id: system_setNetworkName
  label: Set Network Name (Friendly Name)
  kind: action
  command: "POST /v1/system/setNetworkName"
  params:
    - name: name
      type: string
      description: "Network Name, up to 32 characters"

- id: system_setAirPlayPin
  label: Set AirPlay PIN
  kind: action
  command: "POST /v1/system/setAirPlayPin"
  params:
    - name: pin
      type: string
      description: "AirPlay PIN (printable ASCII 0x20-0x7E within 63 chars)"

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
      description: "Valid/invalid setup of Filter"
    - name: address_1..address_10
      type: string
      description: "MAC Address slots [1]..[10] (12 digit ASCII)"

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
      type: string
      description: "off / on / auto"

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
      description: "Bluetooth Standby setting"

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
      description: "Bluetooth address"

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
      description: "Dimmer value; -1 for auto, 0+ for manual. Range via /system/getFeatures"

- id: system_setZoneBVolumeSync
  label: Set Zone B Volume Sync
  kind: action
  command: "GET /v1/system/setZoneBVolumeSync?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "Whether Zone B volume syncs Zone A"

- id: system_setHdmiOut1
  label: Set HDMI OUT 1
  kind: action
  command: "GET /v1/system/setHdmiOut1?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "HDMI OUT 1 terminal output status"

- id: system_setHdmiOut2
  label: Set HDMI OUT 2
  kind: action
  command: "GET /v1/system/setHdmiOut2?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: "HDMI OUT 2 terminal output status"

- id: system_getNameText
  label: Get Name Text
  kind: query
  command: "GET /v1/system/getNameText?id={id}"
  params:
    - name: id
      type: string
      description: "Zone/Input/Sound Program ID; omit to retrieve all"

- id: system_setNameText
  label: Set Name Text
  kind: action
  command: "POST /v1/system/setNameText"
  params:
    - name: id
      type: string
      description: "Zone or Input ID"
    - name: text
      type: string
      description: "Text info (UTF-8 within 64 bytes); empty for default"

- id: system_getLocationInfo
  label: Get Location Info
  kind: query
  command: "GET /v1/system/getLocationInfo"
  params: []

- id: system_sendIrCode
  label: Send IR Code
  kind: action
  command: "GET /v1/system/sendIrCode?code={code}"
  params:
    - name: code
      type: string
      description: "IR code in 8-digit hex"

# ---- 5. Zone (per zone main/zone2/zone3/zone4) ----
- id: zone_getStatus
  label: Get Zone Status
  kind: query
  command: "GET /v1/{zone}/getStatus"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"

- id: zone_getSoundProgramList
  label: Get Sound Program List
  kind: query
  command: "GET /v1/{zone}/getSoundProgramList"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"

- id: zone_setPower
  label: Set Zone Power
  kind: action
  command: "GET /v1/{zone}/setPower?power={power}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: power
      type: string
      description: "on / standby / toggle"

- id: zone_setSleep
  label: Set Zone Sleep Timer
  kind: action
  command: "GET /v1/{zone}/setSleep?sleep={sleep}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: sleep
      type: integer
      description: "Sleep minutes: 0 / 30 / 60 / 90 / 120"

- id: zone_setVolume
  label: Set Zone Volume
  kind: action
  command: "GET /v1/{zone}/setVolume?volume={volume}&step={step}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: volume
      type: string
      description: "Volume value, or 'up'/'down' (API v1.17+). Range via /system/getFeatures"
    - name: step
      type: integer
      description: "Volume step for up/down (API v1.17+)"

- id: zone_setMute
  label: Set Zone Mute
  kind: action
  command: "GET /v1/{zone}/setMute?enable={enable}"
  params:
    - name: zone
      type: string
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
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: input
      type: string
      description: "Input ID (see All ID List)"
    - name: mode
      type: string
      description: "autoplay_disabled (API v1.12+); optional"

- id: zone_setSoundProgram
  label: Set Zone Sound Program
  kind: action
  command: "GET /v1/{zone}/setSoundProgram?program={program}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: program
      type: string
      description: "Sound Program ID (see All ID List)"

- id: zone_set3dSurround
  label: Set Zone 3D Surround
  kind: action
  command: "GET /v1/{zone}/set3dSurround?enable={enable}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "3D Surround status"

- id: zone_setDirect
  label: Set Zone Direct
  kind: action
  command: "GET /v1/{zone}/setDirect?enable={enable}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "Direct status"

- id: zone_setPureDirect
  label: Set Zone Pure Direct
  kind: action
  command: "GET /v1/{zone}/setPureDirect?enable={enable}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "Pure Direct status"

- id: zone_setEnhancer
  label: Set Zone Enhancer
  kind: action
  command: "GET /v1/{zone}/setEnhancer?enable={enable}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "Enhancer status"

- id: zone_setToneControl
  label: Set Zone Tone Control
  kind: action
  command: "GET /v1/{zone}/setToneControl?mode={mode}&bass={bass}&treble={treble}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: mode
      type: string
      description: "Mode; values via /system/getFeatures"
    - name: bass
      type: integer
      description: "Bass; range via /system/getFeatures"
    - name: treble
      type: integer
      description: "Treble; range via /system/getFeatures"

- id: zone_setEqualizer
  label: Set Zone Equalizer
  kind: action
  command: "GET /v1/{zone}/setEqualizer?mode={mode}&low={low}&mid={mid}&high={high}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: mode
      type: string
      description: "Mode; values via /system/getFeatures"
    - name: low
      type: integer
      description: "Low; range via /system/getFeatures"
    - name: mid
      type: integer
      description: "Mid; range via /system/getFeatures"
    - name: high
      type: integer
      description: "High; range via /system/getFeatures"

- id: zone_setBalance
  label: Set Zone L/R Balance
  kind: action
  command: "GET /v1/{zone}/setBalance?value={value}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: value
      type: integer
      description: "Balance; negative=left, positive=right. Range via /system/getFeatures"

- id: zone_setDialogueLevel
  label: Set Zone Dialogue Level
  kind: action
  command: "GET /v1/{zone}/setDialogueLevel?value={value}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: value
      type: integer
      description: "Dialogue Level; range via /system/getFeatures"

- id: zone_setDialogueLift
  label: Set Zone Dialogue Lift
  kind: action
  command: "GET /v1/{zone}/setDialogueLift?value={value}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: value
      type: integer
      description: "Dialogue Lift; range via /system/getFeatures"

- id: zone_setClearVoice
  label: Set Zone Clear Voice
  kind: action
  command: "GET /v1/{zone}/setClearVoice?enable={enable}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "Clear Voice setting"

- id: zone_setSubwooferVolume
  label: Set Zone Subwoofer Volume
  kind: action
  command: "GET /v1/{zone}/setSubwooferVolume?volume={volume}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: volume
      type: integer
      description: "Subwoofer volume; range via /system/getFeatures"

- id: zone_setBassExtension
  label: Set Zone Bass Extension
  kind: action
  command: "GET /v1/{zone}/setBassExtension?enable={enable}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: enable
      type: boolean
      description: "Bass Extension setting"

- id: zone_getSignalInfo
  label: Get Zone Signal Info
  kind: query
  command: "GET /v1/{zone}/getSignalInfo"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"

- id: zone_prepareInputChange
  label: Prepare Zone Input Change
  kind: action
  command: "GET /v1/{zone}/prepareInputChange?input={input}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: input
      type: string
      description: "Input ID (see All ID List)"

# ---- 6. Tuner ----
- id: tuner_getPresetInfo
  label: Tuner Get Preset Info
  kind: query
  command: "GET /v1/tuner/getPresetInfo?band={band}"
  params:
    - name: band
      type: string
      description: "common / am / fm / dab"

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
      type: string
      description: "am / fm / dab"

- id: tuner_setFreq
  label: Tuner Set Frequency
  kind: action
  command: "GET /v1/tuner/setFreq?band={band}&tuning={tuning}&num={num}"
  params:
    - name: band
      type: string
      description: "am / fm"
    - name: tuning
      type: string
      description: "up / down / cancel / auto_up / auto_down / tp_up / tp_down / direct"
    - name: num
      type: integer
      description: "Frequency in kHz; valid only when tuning=direct"

- id: tuner_recallPreset
  label: Tuner Recall Preset
  kind: action
  command: "GET /v1/tuner/recallPreset?zone={zone}&band={band}&num={num}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: band
      type: string
      description: "common / am / fm / dab"
    - name: num
      type: integer
      description: "Preset number; range via /system/getFeatures"

- id: tuner_switchPreset
  label: Tuner Switch Preset
  kind: action
  command: "GET /v1/tuner/switchPreset?dir={dir}"
  params:
    - name: dir
      type: string
      description: "next / previous"

- id: tuner_storePreset
  label: Tuner Store Preset
  kind: action
  command: "GET /v1/tuner/storePreset?num={num}"
  params:
    - name: num
      type: integer
      description: "Preset number; range via /system/getFeatures"

- id: tuner_clearPreset
  label: Tuner Clear Preset
  kind: action
  command: "GET /v1/tuner/clearPreset?band={band}&num={num}"
  params:
    - name: band
      type: string
      description: "common / am / fm / dab"
    - name: num
      type: integer
      description: "Preset number; range via /system/getFeatures"

- id: tuner_startAutoPreset
  label: Tuner Start Auto Preset
  kind: action
  command: "GET /v1/tuner/startAutoPreset?band={band}"
  params:
    - name: band
      type: string
      description: "fm"

- id: tuner_cancelAutoPreset
  label: Tuner Cancel Auto Preset
  kind: action
  command: "GET /v1/tuner/cancelAutoPreset?band={band}"
  params:
    - name: band
      type: string
      description: "fm"

- id: tuner_movePreset
  label: Tuner Move Preset
  kind: action
  command: "GET /v1/tuner/movePreset?band={band}&from={from}&to={to}"
  params:
    - name: band
      type: string
      description: "common / am / fm / dab"
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
  label: Tuner Set DAB Tune Aid
  kind: action
  command: "GET /v1/tuner/setDabTuneAid?action={action}"
  params:
    - name: action
      type: string
      description: "start / stop / up / down"

- id: tuner_setDabService
  label: Tuner Set DAB Service
  kind: action
  command: "GET /v1/tuner/setDabService?dir={dir}"
  params:
    - name: dir
      type: string
      description: "next / previous"

# ---- 7. Network/USB ----
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
      type: string
      description: "play / stop / pause / play_pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end"

- id: netusb_setPlayPosition
  label: Net/USB Set Play Position
  kind: action
  command: "GET /v1/netusb/setPlayPosition?position={position}"
  params:
    - name: position
      type: integer
      description: "Play position in seconds"

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
    - name: input
      type: string
      description: "Target Net/USB Input ID"
    - name: index
      type: integer
      description: "Reference index, multiple of 8 (0..64992)"
    - name: size
      type: integer
      description: "Max list size to retrieve (1-8)"
    - name: lang
      type: string
      description: "en / ja / fr / de / es / ru / it / zh"

- id: netusb_setListControl
  label: Net/USB Set List Control
  kind: action
  command: "GET /v1/netusb/setListControl?list_id={list_id}&type={type}&index={index}&zone={zone}"
  params:
    - name: list_id
      type: string
      description: "main / auto_complete / search_artist / search_track"
    - name: type
      type: string
      description: "select / play / return"
    - name: index
      type: integer
      description: "Element position (0-64999); required for select/play"
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4; valid only for type=play"

- id: netusb_setSearchString
  label: Net/USB Set Search String
  kind: action
  command: "POST /v1/netusb/setSearchString"
  params:
    - name: list_id
      type: string
      description: "main / auto_complete / search_artist / search_track"
    - name: string
      type: string
      description: "Search text"
    - name: index
      type: integer
      description: "Element position (0-64999); valid only when list_id=main"

- id: netusb_recallPreset
  label: Net/USB Recall Preset
  kind: action
  command: "GET /v1/netusb/recallPreset?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: num
      type: integer
      description: "Preset number; range via /system/getFeatures"

- id: netusb_storePreset
  label: Net/USB Store Preset
  kind: action
  command: "GET /v1/netusb/storePreset?num={num}"
  params:
    - name: num
      type: integer
      description: "Preset number; range via /system/getFeatures"

- id: netusb_clearPreset
  label: Net/USB Clear Preset
  kind: action
  command: "GET /v1/netusb/clearPreset?num={num}"
  params:
    - name: num
      type: integer
      description: "Preset number; range via /system/getFeatures"

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
  label: Net/USB Set Quality
  kind: action
  command: "GET /v1/netusb/setQuality?input={input}&value={value}"
  params:
    - name: input
      type: string
      description: "Target Input ID (e.g. qobuz)"
    - name: value
      type: string
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
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: num
      type: integer
      description: "Playback history number; range via /system/getFeatures"

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
      type: string
      description: "add_bookmark / add_track / add_album / add_channel_track / add_channel_artist / add_playlist / thumbs_up / thumbs_down / mark_tired"
    - name: timeout
      type: integer
      description: "Process timeout in ms (0-60000); 0 = max"

- id: netusb_manageList
  label: Net/USB Manage List
  kind: action
  command: "GET /v1/netusb/manageList?list_id={list_id}&type={type}&index={index}&zone={zone}&bank={bank}&timeout={timeout}"
  params:
    - name: list_id
      type: string
      description: "main / auto_complete / search_artist / search_track"
    - name: type
      type: string
      description: "add_bookmark / add_track / add_album / add_artist / add_channel / add_playlist / remove_bookmark / remove_track / remove_album / remove_artist / remove_channel / remove_playlist / end_auto_complete"
    - name: index
      type: integer
      description: "Reference index (0-64999)"
    - name: zone
      type: string
      description: "main / zone2 / zone3 / zone4"
    - name: timeout
      type: integer
      description: "Process timeout in ms (0-60000)"

- id: netusb_getPlayDescription
  label: Net/USB Get Play Description
  kind: query
  command: "GET /v1/netusb/getPlayDescription?type={type}&timeout={timeout}"
  params:
    - name: type
      type: string
      description: "why_this_song"
    - name: timeout
      type: integer
      description: "Process timeout in ms (0-60000)"

- id: netusb_setListSortOption
  label: Net/USB Set List Sort Option
  kind: action
  command: "GET /v1/netusb/setListSortOption?input={input}&type={type}"
  params:
    - name: input
      type: string
      description: "Target Input ID (e.g. pandora)"
    - name: type
      type: string
      description: "date / alphabet"

- id: netusb_getAccountStatus
  label: Net/USB Get Account Status
  kind: query
  command: "GET /v1/netusb/getAccountStatus"
  params: []

- id: netusb_switchAccount
  label: Net/USB Switch Account
  kind: action
  command: "GET /v1/netusb/switchAccount?input={input}&index={index}&timeout={timeout}"
  params:
    - name: input
      type: string
      description: "Target Input ID (e.g. pandora)"
    - name: index
      type: integer
      description: "Account index (0-7)"
    - name: timeout
      type: integer
      description: "Process timeout in ms (0-60000)"

- id: netusb_getServiceInfo
  label: Net/USB Get Service Info
  kind: query
  command: "GET /v1/netusb/getServiceInfo?input={input}&type={type}&timeout={timeout}"
  params:
    - name: input
      type: string
      description: "pandora / rhapsody / napster"
    - name: type
      type: string
      description: "account_list / licensing / activation_code"
    - name: timeout
      type: integer
      description: "Process timeout in ms (0-60000)"

# ---- 8. CD ----
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
      type: string
      description: "play / stop / pause / previous / next / fast_reverse_start / fast_reverse_end / fast_forward_start / fast_forward_end / track_select"
    - name: num
      type: integer
      description: "Target track number (1-512); valid only for track_select"

- id: cd_toggleTray
  label: CD Toggle Tray
  kind: action
  command: "GET /v1/cd/toggleTray"
  params: []

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

# ---- 9. Clock ----
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
      description: "Whether clock auto sync is valid"

- id: clock_setDateAndTime
  label: Clock Set Date And Time
  kind: action
  command: "GET /v1/clock/setDateAndTime?date_time={date_time}"
  params:
    - name: date_time
      type: string
      description: "Format YYMMDDhhmmss"

- id: clock_setClockFormat
  label: Clock Set Format
  kind: action
  command: "GET /v1/clock/setClockFormat?format={format}"
  params:
    - name: format
      type: string
      description: "12h / 24h"

- id: clock_setAlarmSettings
  label: Clock Set Alarm Settings
  kind: action
  command: "POST /v1/clock/setAlarmSettings"
  params:
    - name: alarm_on
      type: boolean
      description: "Alarm on/off"
    - name: volume
      type: integer
      description: "Alarm volume; range via /system/getFeatures alarm_volume"
    - name: fade_interval
      type: integer
      description: "Alarm fade interval (sec); range via /system/getFeatures alarm_fade"
    - name: fade_type
      type: integer
      description: "1..fade_type_max via /system/getFeatures"
    - name: mode
      type: string
      description: "oneday / weekly (via /system/getFeatures)"
    - name: repeat
      type: boolean
      description: "Repeat; valid only for oneday"
    - name: detail
      type: object
      description: "Per-day detail (day, enable, time, beep, playback_type, preset/resume)"
```

## Feedbacks
```yaml
# Every response carries response_code. Enumerated state values from source:
- id: response_code
  type: enum
  values:
    - 0   # Successful request
    - 1   # Initializing
    - 2   # Internal Error
    - 3   # Invalid Request
    - 4   # Invalid Parameter
    - 5   # Guarded
    - 6   # Time Out
    - 99  # Firmware Updating
    - 100 # Access Error
    - 101 # Other Errors
    - 102 # Wrong User Name
    - 103 # Wrong Password
    - 104 # Account Expired
    - 105 # Account Disconnected/Gone Off/Shut Down
    - 106 # Account Number Reached Limit
    - 107 # Server Maintenance
    - 108 # Invalid Account
    - 109 # License Error
    - 110 # Read Only Mode
    - 111 # Max Stations
    - 112 # Access Denied

- id: zone_power
  type: enum
  values: [on, standby]

- id: tuner_band
  type: enum
  values: [am, fm, dab]

- id: cd_device_status
  type: enum
  values: [open, close, ready, not_ready]

- id: cd_playback
  type: enum
  values: [play, stop, pause, fast_reverse, fast_forward]
```

## Variables
```yaml
# Volume, tone, balance, EQ, alarm ranges are NOT fixed - discovered dynamically
# via /system/getFeatures (range_step objects). Example values from source:
# main volume: min 0, max 194, step 1
# main tone_control: min -12, max 12, step 1
# zone2 tone_control: min -5, max 5, step 1
# AM freq: 531-1611 kHz step 9; FM freq: 76000-90000 kHz step 100
# These are EXAMPLE ranges; consult /system/getFeatures per device.
# UNRESOLVED: device-specific variable min/max/step not statically determinable.
```

## Events
```yaml
# Unsolicited notifications pushed as UDP unicast to the requesting app.
# App registers by sending request headers:
#   X-AppName:MusicCast/{version}
#   X-AppPort:{port}
# Registration times out in 10 minutes; refreshed by any further request.
# Payload is a JSON object keyed by subsystem; only changed fields appear.
transport: udp_unicast
# note: "Events are spread out as UDP unicast" (source sec. 11.1)
subsystems:
  system:
    - bluetooth_info_updated
    - func_status_updated
    - name_text_updated
    - location_info_updated
  main / zone2 / zone3 / zone4:
    - power          # on / standby
    - input          # Input ID
    - volume
    - mute
    - status_updated
    - signal_info_updated
  tuner:
    - play_info_updated
    - preset_info_updated
  netusb:
    - play_error
    - multiple_play_errors
    - play_message
    - account_updated
    - play_time
    - preset_info_updated
    - recent_info_updated
    - preset_control   # {type: store/clear/recall, num, result}
    - trial_status
    - trial_time_left
    - play_info_updated
    - list_info_updated
  cd:
    - device_status   # open / close / ready / not_ready
    - play_time
    - play_info_updated
  dist:
    - dist_info_updated
  clock:
    - settings_updated
  device_id: string  # API v1.17+
```

## Macros
```yaml
# No explicit multi-step sequences documented as macros.
# Application Note 13.1 documents a browse-and-play workflow
# (prepareInputChange -> getListInfo -> setListControl select -> getListInfo ->
#  setListControl play), but this is an example flow, not a named macro.
# UNRESOLVED: no named macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings, interlock procedures, or power-on sequencing
# requirements are stated in this source document.
```

## Notes
- Base URL is `http://{host}/YamahaExtendedControl`; `{host}` is the device IP. API version appears in the path (`/v1/`). Devices support all API versions ≤ the value returned by `getDeviceInfo.api_version`.
- Most setters are HTTP GET with query parameters despite mutating state. The following are explicitly POST: `setAirPlayPin`, `setMacAddressFilter`, `setNameText`, `setAlarmSettings`, plus the JSON-body setters `setWiredLan`, `setWirelessLan`, `setWirelessDirect`, `setIpSettings`, `setNetworkName`, `setSearchString`.
- `getListInfo` is the only blocking command — may take up to 30 seconds and blocks all other commands while running (source sec. 13.1.6 note).
- Device discovery is via SSDP M-SEARCH for `MediaRenderer`; the device description XML contains `<yamaha:X_yxcControlURL>/YamahaExtendedControl/v1/</yamaha:X_yxcControlURL>` to locate the YXC root.
- "Rhapsody" service/input ID is being renamed to "Napster" per repeated source notes.
- Zone A is handled as `main`; Zone B is handled as `zone2`.
- Event subscription requires the `X-AppName`/`X-AppPort` headers on requests; events are UDP unicast, timeout 10 min.

<!-- UNRESOLVED: "Universal Discrete Functions" is a Crestron-side family name; the underlying vendor doc is the Yamaha Extended Control (YXC) API Specification (Basic) Rev. 1.10. -->
<!-- UNRESOLVED: exact default TCP port not specified as a spec rule (only appears as :80 in an SSDP device-description example). -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated. -->
<!-- UNRESOLVED: device-specific value ranges (volume/tone/EQ/alarm) are dynamic via /system/getFeatures, not statically enumerable. -->

## Provenance

```yaml
source_domains:
  - community-openhab-org.s3-eu-central-1.amazonaws.com
  - raw.githubusercontent.com
  - scribd.com
source_urls:
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
  - https://raw.githubusercontent.com/akentner/yamaha-avr2mqtt/master/docs/YNCA/text/YNCA_Command_List_RX-A3010_B.txt
  - https://raw.githubusercontent.com/akentner/yamaha-avr2mqtt/master/docs/YNCA/text/YNCA_Command_List_RX-A1010_B.txt
  - https://raw.githubusercontent.com/akentner/yamaha-avr2mqtt/master/docs/YNCA/text/YNCA_Command_List_RX-A2010_B.txt
  - https://www.scribd.com/document/742598124/Yamaha-Ynca-Receivers-Protocol
retrieved_at: 2026-08-01T10:08:50.380Z
last_checked_at: 2026-08-05T08:51:37.054Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:51:37.054Z
matched_actions: 105
action_count: 105
confidence: medium
summary: "All 105 spec endpoints appear verbatim in the refined YXC source as URI templates; transport base_url is verbatim; one-to-one coverage with no drift. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "\"Universal Discrete Functions\" is a Crestron ecosystem naming for this family; the actual source document is the YXC API spec. Firmware version compatibility not stated. Exact TCP port not stated as a spec default (only appears in an SSDP device-description example)."
- "port not stated as a spec default; \":80\" appears only in the"
- "device-specific variable min/max/step not statically determinable."
- "no named macros in source."
- "\"Universal Discrete Functions\" is a Crestron-side family name; the underlying vendor doc is the Yamaha Extended Control (YXC) API Specification (Basic) Rev. 1.10."
- "exact default TCP port not specified as a spec rule (only appears as :80 in an SSDP device-description example)."
- "firmware version compatibility ranges not stated."
- "device-specific value ranges (volume/tone/EQ/alarm) are dynamic via /system/getFeatures, not statically enumerable."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
