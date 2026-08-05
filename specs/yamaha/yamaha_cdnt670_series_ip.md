---
spec_id: admin/yamaha-cdnt670-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha CD-NT670 Series Control Spec"
manufacturer: Yamaha
model_family: CD-NT670
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - CD-NT670
    - CD-NT670D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7r8QTdkYFNfJVJmKbtqvdleuzKt.pdf
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
retrieved_at: 2026-07-25T00:52:11.277Z
last_checked_at: 2026-08-05T08:51:24.307Z
generated_at: 2026-08-05T08:51:24.307Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source is a generic MusicCast API spec, not a CD-NT670-specific command document. The device-specific function subset (zone count, available inputs, valid sound programs, tuner bands, alarm capability) is reported by /system/getFeatures at runtime and is not enumerated for the CD-NT670 in the source."
  - "First-party Yamaha URL for the YXC PDF was not located; source artifact is the refined vendor YXC API Spec (Basic) Rev.2.00 document."
  - "Network port number not stated in source (base URL uses default http port)."
  - "Firmware version compatibility range not stated."
  - "port number not stated in source (base URL uses host without explicit port)"
  - "device-specific feedback ranges (volume min/max/step, dimmer range) are not fixed in source;"
  - "precise min/max/step for each variable not stated in source (runtime-discoverable)."
  - "no other explicit multi-step sequences in source."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "first-party Yamaha URL for the YXC API PDF was not located; several prior discovery attempts timed out. Source artifact is the locally refined vendor document."
  - "CD-NT670 firmware version that ships YXC API v2 support not stated in source."
  - "HTTP port number not stated in source."
  - "device-specific volume/dimmer/tone ranges not fixed in source (runtime-discoverable via /system/getFeatures)."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:51:24.307Z
  matched_actions: 124
  action_count: 124
  confidence: medium
  summary: "All 124 spec actions are documented in the refined YXC API source; transport base URL matches; spec covers full source command catalogue. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Yamaha CD-NT670 Series Control Spec

## Summary
Yamaha CD-NT670 / CD-NT670D is a MusicCast-enabled CD receiver / desktop audio system with integrated CD player, FM/DAB tuner, and Network/USB streaming. This spec covers the Yamaha Extended Control (YXC) REST API over HTTP, used to control power, input selection, CD playback, tuner, Net/USB sources, and clock/alarm. The source document is the generic YXC API Specification (Basic) Rev. 2.00, which applies to all MusicCast devices of API version >= 2.00; the exact subset valid on CD-NT670 is reported at runtime via `/system/getFeatures`.

<!-- UNRESOLVED: The source is a generic MusicCast API spec, not a CD-NT670-specific command document. The device-specific function subset (zone count, available inputs, valid sound programs, tuner bands, alarm capability) is reported by /system/getFeatures at runtime and is not enumerated for the CD-NT670 in the source. -->
<!-- UNRESOLVED: First-party Yamaha URL for the YXC PDF was not located; source artifact is the refined vendor YXC API Spec (Basic) Rev.2.00 document. -->
<!-- UNRESOLVED: Network port number not stated in source (base URL uses default http port). -->
<!-- UNRESOLVED: Firmware version compatibility range not stated. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{host}/YamahaExtendedControl"
  port: null  # UNRESOLVED: port number not stated in source (base URL uses host without explicit port)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from /<zone>/setPower examples
  - levelable       # inferred from /<zone>/setVolume and /<zone>/setSubwooferVolume
  - queryable       # inferred from numerous get* query commands returning state
  - routable        # inferred from /<zone>/setInput routing commands
```

## Actions
```yaml
# Base URL for all commands: http://{host}/YamahaExtendedControl
# {zone} is a path segment: "main" / "zone2" / "zone3" / "zone4" (CD-NT670 typically exposes "main" only;
# the valid subset is returned by /system/getFeatures -> system.zone_num).
# Source documents GET unless a JSON body example is shown (then POST). Method noted per action where source states it.

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
      description: DHCP setting
    - name: ip_address
      type: string
      description: IP Address
    - name: subnet_mask
      type: string
      description: Subnet Mask
    - name: default_gateway
      type: string
      description: Default Gateway
    - name: dns_server_1
      type: string
      description: DNS Server 1
    - name: dns_server_2
      type: string
      description: DNS Server 2

- id: system_setWirelessLan
  label: Set Wireless LAN
  kind: action
  command: "POST /v1/system/setWirelessLan"
  params:
    - name: ssid
      type: string
      description: Access point SSID (UTF-8 within 32 bytes)
    - name: type
      type: string
      description: 'Encryption type ("none"/"wep"/"wpa2-psk(aes)"/"mixed_mode")'
    - name: key
      type: string
      description: Encryption key (printable ASCII within 64 chars)
    - name: dhcp
      type: string
      description: DHCP setting
    - name: ip_address
      type: string
      description: IP Address
    - name: subnet_mask
      type: string
      description: Subnet Mask
    - name: default_gateway
      type: string
      description: Default Gateway
    - name: dns_server_1
      type: string
      description: DNS Server 1
    - name: dns_server_2
      type: string
      description: DNS Server 2

- id: system_setWirelessDirect
  label: Set Wireless Direct
  kind: action
  command: "POST /v1/system/setWirelessDirect"
  params:
    - name: type
      type: string
      description: 'Encryption type ("none"/"wpa2-psk(aes)")'
    - name: key
      type: string
      description: Encryption key (printable ASCII within 64 chars)

- id: system_setIpSettings
  label: Set IP Settings
  kind: action
  command: "POST /v1/system/setIpSettings"
  params:
    - name: dhcp
      type: string
      description: DHCP setting
    - name: ip_address
      type: string
      description: IP Address
    - name: subnet_mask
      type: string
      description: Subnet Mask
    - name: default_gateway
      type: string
      description: Default Gateway
    - name: dns_server_1
      type: string
      description: DNS Server 1
    - name: dns_server_2
      type: string
      description: DNS Server 2

- id: system_setNetworkName
  label: Set Network Name
  kind: action
  command: "POST /v1/system/setNetworkName"
  params:
    - name: name
      type: string
      description: Network Name (up to 32 chars)

- id: system_setAirPlayPin
  label: Set AirPlay PIN
  kind: action
  command: "POST /v1/system/setAirPlayPin"
  params:
    - name: pin
      type: string
      description: AirPlay PIN (printable ASCII within 63 chars)

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
      description: Filter valid/invalid
    - name: address_1
      type: string
      description: MAC Address [1] (12 digit ASCII)
    - name: address_10
      type: string
      description: MAC Address [10] (12 digit ASCII)

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
      description: 'Standby mode ("off"/"on"/"auto")'

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
      description: Bluetooth Standby setting

- id: system_setBluetoothTxSetting
  label: Set Bluetooth TX Setting
  kind: action
  command: "GET /v1/system/setBluetoothTxSetting?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: Bluetooth transmission setting

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
      description: Bluetooth address (12-digit hex)

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
      description: Auto Power Standby status

- id: system_setIrSensor
  label: Set IR Sensor
  kind: action
  command: "GET /v1/system/setIrSensor?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: IR sensor setting

- id: system_setSpeakerA
  label: Set Speaker A
  kind: action
  command: "GET /v1/system/setSpeakerA?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: Speaker A status

- id: system_setSpeakerB
  label: Set Speaker B
  kind: action
  command: "GET /v1/system/setSpeakerB?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: Speaker B status

- id: system_setDimmer
  label: Set Dimmer
  kind: action
  command: "GET /v1/system/setDimmer?value={value}"
  params:
    - name: value
      type: integer
      description: Dimmer value (-1 = auto, or >= 0 per range from /system/getFeatures)

- id: system_setZoneBVolumeSync
  label: Set Zone B Volume Sync
  kind: action
  command: "GET /v1/system/setZoneBVolumeSync?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: Zone B volume sync setting

- id: system_setHdmiOut1
  label: Set HDMI OUT 1
  kind: action
  command: "GET /v1/system/setHdmiOut1?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: HDMI OUT 1 terminal output status

- id: system_setHdmiOut2
  label: Set HDMI OUT 2
  kind: action
  command: "GET /v1/system/setHdmiOut2?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: HDMI OUT 2 terminal output status

- id: system_setHdmiOut3
  label: Set HDMI OUT 3
  kind: action
  command: "GET /v1/system/setHdmiOut3?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: HDMI OUT 3 terminal output status

- id: system_getNameText
  label: Get Name Text
  kind: query
  command: "GET /v1/system/getNameText?id={id}"
  params:
    - name: id
      type: string
      description: Optional ID (Zone/Input/Sound Program). Omit to retrieve all.

- id: system_setNameText
  label: Set Name Text
  kind: action
  command: "POST /v1/system/setNameText"
  params:
    - name: id
      type: string
      description: Zone or Input ID
    - name: text
      type: string
      description: Text info (UTF-8 within 64 bytes; "" restores default)

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
      description: IR code in 8-digit hex

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
      description: Auto Play setting

- id: system_setSpeakerPattern
  label: Set Speaker Pattern
  kind: action
  command: "GET /v1/system/setSpeakerPattern?num={num}"
  params:
    - name: num
      type: integer
      description: Speaker pattern number (1 .. max from /system/getFeatures)

- id: system_setPartyMode
  label: Set Party Mode
  kind: action
  command: "GET /v1/system/setPartyMode?enable={enable}"
  params:
    - name: enable
      type: boolean
      description: Party Mode setting

# ---- 5. Zone (substitute {zone} = main/zone2/zone3/zone4) ----
- id: zone_getStatus
  label: Zone Get Status
  kind: query
  command: "GET /v1/{zone}/getStatus"
  params:
    - name: zone
      type: string
      description: 'Target zone ("main"/"zone2"/"zone3"/"zone4")'

- id: zone_getSoundProgramList
  label: Zone Get Sound Program List
  kind: query
  command: "GET /v1/{zone}/getSoundProgramList"
  params:
    - name: zone
      type: string
      description: 'Target zone ("main"/"zone2"/"zone3"/"zone4")'

- id: zone_setPower
  label: Zone Set Power
  kind: action
  command: "GET /v1/{zone}/setPower?power={power}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: power
      type: string
      description: 'Power status ("on"/"standby"/"toggle")'

- id: zone_setSleep
  label: Zone Set Sleep Timer
  kind: action
  command: "GET /v1/{zone}/setSleep?sleep={sleep}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: sleep
      type: integer
      description: 'Sleep time in minutes (0/30/60/90/120)'

- id: zone_setVolume
  label: Zone Set Volume
  kind: action
  command: "GET /v1/{zone}/setVolume?volume={volume}&step={step}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: volume
      type: string
      description: 'Volume value (integer per /system/getFeatures, or "up"/"down")'
    - name: step
      type: integer
      description: Optional volume step for up/down

- id: zone_setMute
  label: Zone Set Mute
  kind: action
  command: "GET /v1/{zone}/setMute?enable={enable}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: enable
      type: boolean
      description: Mute status

- id: zone_setInput
  label: Zone Set Input
  kind: action
  command: "GET /v1/{zone}/setInput?input={input}&mode={mode}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: input
      type: string
      description: Input ID (per /system/getFeatures)
    - name: mode
      type: string
      description: 'Optional select mode ("autoplay_disabled")'

- id: zone_setSoundProgram
  label: Zone Set Sound Program
  kind: action
  command: "GET /v1/{zone}/setSoundProgram?program={program}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: program
      type: string
      description: Sound Program ID

- id: zone_set3dSurround
  label: Zone Set 3D Surround
  kind: action
  command: "GET /v1/{zone}/set3dSurround?enable={enable}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: enable
      type: boolean
      description: 3D Surround status

- id: zone_setDirect
  label: Zone Set Direct
  kind: action
  command: "GET /v1/{zone}/setDirect?enable={enable}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: enable
      type: boolean
      description: Direct status

- id: zone_setPureDirect
  label: Zone Set Pure Direct
  kind: action
  command: "GET /v1/{zone}/setPureDirect?enable={enable}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: enable
      type: boolean
      description: Pure Direct status

- id: zone_setEnhancer
  label: Zone Set Enhancer
  kind: action
  command: "GET /v1/{zone}/setEnhancer?enable={enable}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: enable
      type: boolean
      description: Enhancer status

- id: zone_setToneControl
  label: Zone Set Tone Control
  kind: action
  command: "GET /v1/{zone}/setToneControl?mode={mode}&bass={bass}&treble={treble}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: mode
      type: string
      description: Mode setting (per /system/getFeatures)
    - name: bass
      type: integer
      description: Bass value
    - name: treble
      type: integer
      description: Treble value

- id: zone_setEqualizer
  label: Zone Set Equalizer
  kind: action
  command: "GET /v1/{zone}/setEqualizer?mode={mode}&low={low}&mid={mid}&high={high}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: mode
      type: string
      description: Mode setting
    - name: low
      type: integer
      description: Low value
    - name: mid
      type: integer
      description: Mid value
    - name: high
      type: integer
      description: High value

- id: zone_setBalance
  label: Zone Set Balance
  kind: action
  command: "GET /v1/{zone}/setBalance?value={value}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: value
      type: integer
      description: L/R balance (negative = left, positive = right)

- id: zone_setDialogueLevel
  label: Zone Set Dialogue Level
  kind: action
  command: "GET /v1/{zone}/setDialogueLevel?value={value}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: value
      type: integer
      description: Dialogue Level value

- id: zone_setDialogueLift
  label: Zone Set Dialogue Lift
  kind: action
  command: "GET /v1/{zone}/setDialogueLift?value={value}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: value
      type: integer
      description: Dialogue Lift value

- id: zone_setClearVoice
  label: Zone Set Clear Voice
  kind: action
  command: "GET /v1/{zone}/setClearVoice?enable={enable}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: enable
      type: boolean
      description: Clear Voice setting

- id: zone_setSubwooferVolume
  label: Zone Set Subwoofer Volume
  kind: action
  command: "GET /v1/{zone}/setSubwooferVolume?volume={volume}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: volume
      type: integer
      description: Subwoofer volume value

- id: zone_setBassExtension
  label: Zone Set Bass Extension
  kind: action
  command: "GET /v1/{zone}/setBassExtension?enable={enable}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: enable
      type: boolean
      description: Bass Extension setting

- id: zone_getSignalInfo
  label: Zone Get Signal Info
  kind: query
  command: "GET /v1/{zone}/getSignalInfo"
  params:
    - name: zone
      type: string
      description: 'Target zone'

- id: zone_prepareInputChange
  label: Zone Prepare Input Change
  kind: action
  command: "GET /v1/{zone}/prepareInputChange?input={input}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: input
      type: string
      description: Input ID

- id: zone_recallScene
  label: Zone Recall Scene
  kind: action
  command: "GET /v1/{zone}/recallScene?num={num}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: num
      type: integer
      description: Scene number

- id: zone_setContentsDisplay
  label: Zone Set Contents Display
  kind: action
  command: "GET /v1/{zone}/setContentsDisplay?enable={enable}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: enable
      type: boolean
      description: Display status of screen

- id: zone_controlCursor
  label: Zone Control Cursor
  kind: action
  command: "GET /v1/{zone}/controlCursor?cursor={cursor}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: cursor
      type: string
      description: 'Cursor key ("up"/"down"/"left"/"right"/"select"/"return")'

- id: zone_controlMenu
  label: Zone Control Menu
  kind: action
  command: "GET /v1/{zone}/controlMenu?menu={menu}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: menu
      type: string
      description: Menu key (per /system/getFeatures menu_list)

- id: zone_setActualVolume
  label: Zone Set Actual Volume
  kind: action
  command: "GET /v1/{zone}/setActualVolume?mode={mode}&value={value}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: mode
      type: string
      description: 'Actual volume mode ("db"/"numeric")'
    - name: value
      type: number
      description: Display volume value

- id: zone_setAudioSelect
  label: Zone Set Audio Select
  kind: action
  command: "GET /v1/{zone}/setAudioSelect?type={type}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: type
      type: string
      description: Audio Select value

- id: zone_setSurroundDecoderType
  label: Zone Set Surround Decoder Type
  kind: action
  command: "GET /v1/{zone}/setSurroundDecoderType?type={type}"
  params:
    - name: zone
      type: string
      description: 'Target zone'
    - name: type
      type: string
      description: Surround Decoder Type

# ---- 6. Tuner ----
- id: tuner_getPresetInfo
  label: Tuner Get Preset Info
  kind: query
  command: "GET /v1/tuner/getPresetInfo?band={band}"
  params:
    - name: band
      type: string
      description: 'Band ("common"/"am"/"fm"/"dab")'

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
      description: 'Band ("am"/"fm"/"dab")'

- id: tuner_setFreq
  label: Tuner Set Frequency
  kind: action
  command: "GET /v1/tuner/setFreq?band={band}&tuning={tuning}&num={num}"
  params:
    - name: band
      type: string
      description: 'Band ("am"/"fm")'
    - name: tuning
      type: string
      description: 'Tuning method ("up"/"down"/"cancel"/"auto_up"/"auto_down"/"tp_up"/"tp_down"/"direct")'
    - name: num
      type: integer
      description: Frequency in kHz (only when tuning=direct)

- id: tuner_recallPreset
  label: Tuner Recall Preset
  kind: action
  command: "GET /v1/tuner/recallPreset?zone={zone}&band={band}&num={num}"
  params:
    - name: zone
      type: string
      description: Recalling zone
    - name: band
      type: string
      description: 'Band ("common"/"am"/"fm"/"dab")'
    - name: num
      type: integer
      description: Preset number

- id: tuner_switchPreset
  label: Tuner Switch Preset
  kind: action
  command: "GET /v1/tuner/switchPreset?dir={dir}"
  params:
    - name: dir
      type: string
      description: 'Direction ("next"/"previous")'

- id: tuner_storePreset
  label: Tuner Store Preset
  kind: action
  command: "GET /v1/tuner/storePreset?num={num}"
  params:
    - name: num
      type: integer
      description: Preset number

- id: tuner_clearPreset
  label: Tuner Clear Preset
  kind: action
  command: "GET /v1/tuner/clearPreset?band={band}&num={num}"
  params:
    - name: band
      type: string
      description: Band
    - name: num
      type: integer
      description: Preset number

- id: tuner_startAutoPreset
  label: Tuner Start Auto Preset
  kind: action
  command: "GET /v1/tuner/startAutoPreset?band={band}"
  params:
    - name: band
      type: string
      description: 'Band ("fm")'

- id: tuner_cancelAutoPreset
  label: Tuner Cancel Auto Preset
  kind: action
  command: "GET /v1/tuner/cancelAutoPreset?band={band}"
  params:
    - name: band
      type: string
      description: 'Band ("fm")'

- id: tuner_movePreset
  label: Tuner Move Preset
  kind: action
  command: "GET /v1/tuner/movePreset?band={band}&from={from}&to={to}"
  params:
    - name: band
      type: string
      description: Band
    - name: from
      type: integer
      description: Source preset number
    - name: to
      type: integer
      description: Destination preset number

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
      description: 'Action ("start"/"stop"/"up"/"down")'

- id: tuner_setDabService
  label: Tuner Set DAB Service
  kind: action
  command: "GET /v1/tuner/setDabService?dir={dir}"
  params:
    - name: dir
      type: string
      description: 'Direction ("next"/"previous")'

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
      description: 'Playback status ("play"/"stop"/"pause"/"play_pause"/"previous"/"next"/"fast_reverse_start"/"fast_reverse_end"/"fast_forward_start"/"fast_forward_end")'

- id: netusb_setPlayPosition
  label: Net/USB Set Play Position
  kind: action
  command: "GET /v1/netusb/setPlayPosition?position={position}"
  params:
    - name: position
      type: integer
      description: Play position in seconds

- id: netusb_setRepeat
  label: Net/USB Set Repeat
  kind: action
  command: "GET /v1/netusb/setRepeat?mode={mode}"
  params:
    - name: mode
      type: string
      description: 'Repeat mode ("off"/"one"/"all")'

- id: netusb_setShuffle
  label: Net/USB Set Shuffle
  kind: action
  command: "GET /v1/netusb/setShuffle?mode={mode}"
  params:
    - name: mode
      type: string
      description: 'Shuffle mode ("off"/"on"/"songs"/"albums")'

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
      description: Target Input ID
    - name: index
      type: integer
      description: Reference index (multiple of 8)
    - name: size
      type: integer
      description: Max list size 1-8
    - name: lang
      type: string
      description: 'Language code ("en"/"ja"/"fr"/"de"/"es"/"ru"/"it"/"zh")'

- id: netusb_setListControl
  label: Net/USB Set List Control
  kind: action
  command: "GET /v1/netusb/setListControl?list_id={list_id}&type={type}&index={index}&zone={zone}"
  params:
    - name: list_id
      type: string
      description: 'List ID ("main"/"auto_complete"/"search_artist"/"search_track")'
    - name: type
      type: string
      description: 'Transition type ("select"/"play"/"return")'
    - name: index
      type: integer
      description: Element position (0-64999)
    - name: zone
      type: string
      description: Target zone for playback

- id: netusb_setSearchString
  label: Net/USB Set Search String
  kind: action
  command: "POST /v1/netusb/setSearchString"
  params:
    - name: list_id
      type: string
      description: List ID
    - name: string
      type: string
      description: Search text
    - name: index
      type: integer
      description: Element position (only when list_id=main)

- id: netusb_recallPreset
  label: Net/USB Recall Preset
  kind: action
  command: "GET /v1/netusb/recallPreset?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
      description: Recalling zone
    - name: num
      type: integer
      description: Preset number

- id: netusb_storePreset
  label: Net/USB Store Preset
  kind: action
  command: "GET /v1/netusb/storePreset?num={num}"
  params:
    - name: num
      type: integer
      description: Preset number

- id: netusb_clearPreset
  label: Net/USB Clear Preset
  kind: action
  command: "GET /v1/netusb/clearPreset?num={num}"
  params:
    - name: num
      type: integer
      description: Preset number

- id: netusb_movePreset
  label: Net/USB Move Preset
  kind: action
  command: "GET /v1/netusb/movePreset?from={from}&to={to}"
  params:
    - name: from
      type: integer
      description: Source preset number
    - name: to
      type: integer
      description: Destination preset number

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
      type: string
      description: 'Target Input ID ("qobuz")'
    - name: value
      type: string
      description: 'Quality ("hr_192_24"/"hr_96_24"/"cd_44_16"/"mp3_320")'

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
      description: Recalling zone
    - name: num
      type: integer
      description: History item number

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
      description: 'Special processing type (e.g. "add_bookmark"/"add_track"/"add_album"/"add_channel_track"/"add_channel_artist"/"add_playlist"/"add_to_playlist"/"thumbs_up"/"thumbs_down"/"mark_tired")'
    - name: timeout
      type: integer
      description: Timeout duration in ms (0-60000)

- id: netusb_manageList
  label: Net/USB Manage List
  kind: action
  command: "GET /v1/netusb/manageList?list_id={list_id}&type={type}&index={index}&zone={zone}&bank={bank}&timeout={timeout}"
  params:
    - name: list_id
      type: string
      description: List ID
    - name: type
      type: string
      description: 'Special processing type (add_*/remove_*/"end_auto_complete")'
    - name: index
      type: integer
      description: Reference index (0-64999)
    - name: zone
      type: string
      description: Recalling zone (specific cases only)
    - name: bank
      type: integer
      description: Reserved
    - name: timeout
      type: integer
      description: Timeout duration in ms (0-60000)

- id: netusb_getPlayDescription
  label: Net/USB Get Play Description
  kind: query
  command: "GET /v1/netusb/getPlayDescription?type={type}&timeout={timeout}"
  params:
    - name: type
      type: string
      description: 'Type ("why_this_song")'
    - name: timeout
      type: integer
      description: Timeout duration in ms (0-60000)

- id: netusb_setListSortOption
  label: Net/USB Set List Sort Option
  kind: action
  command: "GET /v1/netusb/setListSortOption?input={input}&type={type}"
  params:
    - name: input
      type: string
      description: 'Target Input ID ("pandora")'
    - name: type
      type: string
      description: Sorting method

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
      type: string
      description: 'Target Input ID ("pandora"/"napster")'
    - name: type
      type: string
      description: 'Info type ("account_list"/"licensing"/"activation_code")'
    - name: timeout
      type: integer
      description: Timeout duration in ms (0-60000)

# ---- 8. CD (core for CD-NT670) ----
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
      description: 'Playback status ("play"/"stop"/"pause"/"previous"/"next"/"fast_reverse_start"/"fast_reverse_end"/"fast_forward_start"/"fast_forward_end"/"track_select")'
    - name: num
      type: integer
      description: Target track number (1-512, only when playback=track_select)

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
      type: string
      description: 'Repeat mode ("off"/"one"/"all"/"folder")'

- id: cd_setShuffle
  label: CD Set Shuffle
  kind: action
  command: "GET /v1/cd/setShuffle?mode={mode}"
  params:
    - name: mode
      type: string
      description: 'Shuffle mode ("off"/"on"/"folder")'

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
      description: Clock auto sync valid

- id: clock_setDateAndTime
  label: Clock Set Date And Time
  kind: action
  command: "GET /v1/clock/setDateAndTime?date_time={date_time}"
  params:
    - name: date_time
      type: string
      description: 'Date/time in format "YYMMDDhhmmss"'

- id: clock_setClockFormat
  label: Clock Set Format
  kind: action
  command: "GET /v1/clock/setClockFormat?format={format}"
  params:
    - name: format
      type: string
      description: 'Time display format ("12h"/"24h")'

- id: clock_setAlarmSettings
  label: Clock Set Alarm Settings
  kind: action
  command: "POST /v1/clock/setAlarmSettings"
  params:
    - name: alarm_on
      type: boolean
      description: Alarm on/off
    - name: volume
      type: integer
      description: Alarm volume
    - name: fade_interval
      type: integer
      description: Alarm fade interval (seconds)
    - name: fade_type
      type: integer
      description: Alarm fade type
    - name: mode
      type: string
      description: 'Alarm mode ("oneday"/"weekly")'
    - name: repeat
      type: boolean
      description: Repeat setting (only when mode=oneday)
    - name: detail
      type: object
      description: Per-day alarm detail (day/enable/time/beep/playback_type/resume/preset/snooze)
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: ["on", "standby"]
    source: "/{zone}/getStatus.power"
  - id: input
    type: enum
    values: []  # values come from /system/getFeatures input_list at runtime
    source: "/{zone}/getStatus.input"
  - id: volume
    type: integer
    source: "/{zone}/getStatus.volume"
  - id: mute
    type: boolean
    source: "/{zone}/getStatus.mute"
  - id: sleep_timer
    type: integer
    values: [0, 30, 60, 90, 120]
    source: "/{zone}/getStatus.sleep"
  - id: cd_device_status
    type: enum
    values: ["open", "close", "ready", "not_ready"]
    source: "/cd/getPlayInfo.device_status"
  - id: cd_playback
    type: enum
    values: ["play", "stop", "pause", "fast_reverse", "fast_forward"]
    source: "/cd/getPlayInfo.playback"
  - id: cd_repeat
    type: enum
    values: ["off", "one", "all", "folder", "a-b"]
    source: "/cd/getPlayInfo.repeat"
  - id: cd_shuffle
    type: enum
    values: ["off", "on", "folder", "program"]
    source: "/cd/getPlayInfo.shuffle"
  - id: cd_track_number
    type: integer
    source: "/cd/getPlayInfo.track_number"
  - id: netusb_playback
    type: enum
    values: ["play", "stop", "pause", "fast_reverse", "fast_forward"]
    source: "/netusb/getPlayInfo.playback"
  - id: netusb_repeat
    type: enum
    values: ["off", "one", "all"]
    source: "/netusb/getPlayInfo.repeat"
  - id: netusb_shuffle
    type: enum
    values: ["off", "on", "songs", "albums"]
    source: "/netusb/getPlayInfo.shuffle"
  - id: tuner_band
    type: enum
    values: ["am", "fm", "dab"]
    source: "/tuner/getPlayInfo.band"
  - id: network_standby
    type: enum
    values: ["off", "on", "auto"]
    source: "/system/getNetworkStandby.network_standby"
  - id: device_info
    type: object
    source: "/system/getDeviceInfo"
# UNRESOLVED: device-specific feedback ranges (volume min/max/step, dimmer range) are not fixed in source;
# they are returned at runtime via /system/getFeatures.
```

## Variables
```yaml
variables:
  - id: zone_volume
    type: integer
    description: Per-zone volume; range from /system/getFeatures range_step(volume)
    settable: true
  - id: zone_mute
    type: boolean
    description: Per-zone mute
    settable: true
  - id: dimmer
    type: integer
    description: FL/LED dimmer; -1 = auto, else per /system/getFeatures range
    settable: true
  - id: network_name
    type: string
    description: Friendly network name (max 32 chars)
    settable: true
  - id: clock_format
    type: enum
    values: ["12h", "24h"]
    settable: true
  - id: alarm_volume
    type: integer
    description: Alarm volume; range from /system/getFeatures
    settable: true
# UNRESOLVED: precise min/max/step for each variable not stated in source (runtime-discoverable).
```

## Events
```yaml
# Source §11: events are pushed as UDP unicast to the port declared by the client via the
# X-AppName: MusicCast/XXX(YYY) and X-AppPort:ZZZ request headers. Event subscription
# times out after 10 minutes of inactivity from the registered client IP.
transport: udp_unicast
events:
  - id: zone_power
    fields: [zone, power]
  - id: zone_input
    fields: [zone, input]
  - id: zone_volume
    fields: [zone, volume]
  - id: zone_mute
    fields: [zone, mute]
  - id: zone_status_updated
    fields: [zone]
    description: Other zone info changed; refetch via /{zone}/getStatus
  - id: signal_info_updated
    fields: [zone]
  - id: cd_play_info_updated
    fields: []
    description: CD playback info changed; refetch via /cd/getPlayInfo
  - id: tuner_play_info_updated
    fields: []
  - id: tuner_preset_info_updated
    fields: []
  - id: netusb_play_info_updated
    fields: []
  - id: netusb_play_error
    fields: [play_error, multiple_play_errors, play_message]
  - id: netusb_preset_info_updated
    fields: []
  - id: netusb_recent_info_updated
    fields: []
  - id: netusb_account_updated
    fields: []
  - id: netusb_list_info_updated
    fields: []
  - id: clock_settings_updated
    fields: []
  - id: system_name_text_updated
    fields: []
  - id: system_func_status_updated
    fields: []
  - id: system_location_info_updated
    fields: []
  - id: system_bluetooth_info_updated
    fields: []
  - id: device_id
    fields: [device_id]
    description: Always included for API Version >= 1.17
```

## Macros
```yaml
# Source §13.1 documents a multi-step USB browse + playback sequence
# (prepareInputChange -> setInput -> getListInfo -> setListControl:select -> ... -> setListControl:play).
macros:
  - id: usb_browse_and_play
    description: >
      Prepare input change to USB, switch input, page through list info (size 8,
      index multiples of 8), descend folders via setListControl:select, then play
      a target element via setListControl:play. getListInfo blocks other commands
      (up to 30 s) and must precede each select.
    steps:
      - "GET /v1/{zone}/prepareInputChange?input=usb"
      - 'GET /v1/{zone}/setInput?input=usb&mode=autoplay_disabled'
      - "GET /v1/netusb/getListInfo?input=usb&index=0&size=8&lang=en"
      - 'GET /v1/netusb/setListControl?list_id=main&type=select&index={folder_index}'
      - "GET /v1/netusb/getListInfo?input=usb&index={page}&size=8&lang=en"
      - 'GET /v1/netusb/setListControl?list_id=main&type=play&index={file_index}'
# UNRESOLVED: no other explicit multi-step sequences in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements for the CD-NT670. Network/network-module reboot
# endpoints (requestNetworkReboot, requestSystemReboot) are documented but carry no
# mandated confirmation step in the source.
```

## Notes
- This spec is built from the generic Yamaha Extended Control (YXC) API Specification (Basic) Rev. 2.00. That document applies to all MusicCast devices with API version >= 2.00; the CD-NT670-specific function subset is NOT enumerated in the source and must be read at runtime via `/system/getFeatures` (zone count, input list, sound programs, tuner bands, alarm presence, dimmer range, volume range/step).
- The CD chapter (§8) is the most directly relevant for the CD-NT670 (CD player); Net/USB (§7), Tuner (§6, FM/DAB), and Clock (§9) also apply. Many System/Zone AVR-oriented endpoints (HDMI out, multi-zone, surround decoder) likely do not apply to the single-zone CD-NT670 desktop audio product but are listed because the source documents them generically.
- Base URL is `http://{host}/YamahaExtendedControl`; API version path segment is `/v1/`. Backward compatibility is guaranteed for API versions <= the value returned by `getDeviceInfo.api_version`.
- `getListInfo` is the only blocking command — it may hold off all other commands for up to 30 seconds while fetching list data.
- Events require the client to send `X-AppName: MusicCast/XXX(YYY)` and `X-AppPort:ZZZ` request headers; subscription auto-expires after 10 minutes without further requests from the registered IP.
- Response codes are defined in source §10 (0 = success; 1 initializing; 2 internal error; 3 invalid request; 4 invalid parameter; 5 guarded; 6 timeout; 99 firmware updating; 100s streaming-service errors; 200s distribution errors).

<!-- UNRESOLVED: first-party Yamaha URL for the YXC API PDF was not located; several prior discovery attempts timed out. Source artifact is the locally refined vendor document. -->
<!-- UNRESOLVED: CD-NT670 firmware version that ships YXC API v2 support not stated in source. -->
<!-- UNRESOLVED: HTTP port number not stated in source. -->
<!-- UNRESOLVED: device-specific volume/dimmer/tone ranges not fixed in source (runtime-discoverable via /system/getFeatures). -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7r8QTdkYFNfJVJmKbtqvdleuzKt.pdf
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
retrieved_at: 2026-07-25T00:52:11.277Z
last_checked_at: 2026-08-05T08:51:24.307Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:51:24.307Z
matched_actions: 124
action_count: 124
confidence: medium
summary: "All 124 spec actions are documented in the refined YXC API source; transport base URL matches; spec covers full source command catalogue. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source is a generic MusicCast API spec, not a CD-NT670-specific command document. The device-specific function subset (zone count, available inputs, valid sound programs, tuner bands, alarm capability) is reported by /system/getFeatures at runtime and is not enumerated for the CD-NT670 in the source."
- "First-party Yamaha URL for the YXC PDF was not located; source artifact is the refined vendor YXC API Spec (Basic) Rev.2.00 document."
- "Network port number not stated in source (base URL uses default http port)."
- "Firmware version compatibility range not stated."
- "port number not stated in source (base URL uses host without explicit port)"
- "device-specific feedback ranges (volume min/max/step, dimmer range) are not fixed in source;"
- "precise min/max/step for each variable not stated in source (runtime-discoverable)."
- "no other explicit multi-step sequences in source."
- "source contains no explicit safety warnings, interlock procedures, or"
- "first-party Yamaha URL for the YXC API PDF was not located; several prior discovery attempts timed out. Source artifact is the locally refined vendor document."
- "CD-NT670 firmware version that ships YXC API v2 support not stated in source."
- "HTTP port number not stated in source."
- "device-specific volume/dimmer/tone ranges not fixed in source (runtime-discoverable via /system/getFeatures)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
