---
spec_id: admin/yamaha-yas-408
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha YAS-408 (MusicCast BAR 400) Control Spec"
manufacturer: Yamaha
model_family: YAS-408
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - YAS-408
    - "MusicCast BAR 400"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
  - usa.yamaha.com
  - community-openhab-org.s3-eu-central-1.amazonaws.com
source_urls:
  - https://community.symcon.de/uploads/short-url/7r8QTdkYFNfJVJmKbtqvdleuzKt.pdf
  - https://usa.yamaha.com/products/contents/audio_visual/musiccast/musiccast-compatiblity.html
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
retrieved_at: 2026-06-02T20:55:51.710Z
last_checked_at: 2026-06-04T06:37:49.008Z
generated_at: 2026-06-04T06:37:49.008Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "YAS-408-specific firmware version that introduced YXC support is not stated in the source."
  - "source does not document any client-side or device-side macro"
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version requirement (Rev. 2.00) for the YAS-408"
  - "default TCP/UDP ports — source does not state a port; HTTP"
  - "authentication — no auth procedure is described anywhere in"
verification:
  verdict: verified
  checked_at: 2026-06-04T06:37:49.008Z
  matched_actions: 124
  action_count: 124
  confidence: medium
  summary: "All 124 spec action commands match verbatim source URI entries across all six namespaces; transport base URL confirmed; source and spec are 1-to-1. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Yamaha YAS-408 (MusicCast BAR 400) Control Spec

## Summary

Yamaha YAS-408 is a MusicCast-enabled soundbar (also sold as MusicCast BAR 400). It implements Yamaha's Extended Control (YXC) HTTP/JSON API over the local network, and pushes unsolicited status events as UDP unicast to a registered X-AppPort. This spec catalogs every YXC endpoint documented in the YXC Basic specification (Rev. 2.00) — the YAS-408 responds to a subset of these endpoints based on the capability list returned by `/v1/system/getFeatures`.

<!-- UNRESOLVED: YAS-408-specific firmware version that introduced YXC support is not stated in the source. -->

## Transport
```yaml
# YXC is HTTP/JSON for control + UDP unicast for events. No port number is
# stated in the source; HTTP defaults to 80, UDP event port is chosen by the
# client (X-AppPort request header).
protocols:
  - http
  - udp
addressing:
  base_url: "http://{host}/YamahaExtendedControl"  # stated verbatim in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Traits supported by evidence from the YXC Basic spec (per-Trait application
# depends on the YAS-408's getFeatures response):
- powerable
- routable        # inferred: setInput command present
- queryable       # inferred: getStatus, getDeviceInfo, getFeatures, etc. present
- levelable       # inferred: setVolume, setMute, setToneControl, setEqualizer, setBalance, setSubwooferVolume present
```

## Actions
```yaml
# Coverage note: YXC Basic (Rev. 2.00) defines 124 distinct endpoints across
# System, Zone, Tuner, Net/USB, CD, and Clock namespaces. The YAS-408 is a
# soundbar (category_code = 2) with one main zone and no built-in tuner or CD,
# so it will respond to a subset; the protocol surface documented here is the
# full set the device may implement. Each `command` field carries the literal
# URL/path documented in the YXC source.

# ───── System (4.1 - 4.42) ─────
- id: get_device_info
  label: Get Device Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getDeviceInfo"
  params: []

- id: get_features
  label: Get Features
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getFeatures"
  params: []

- id: get_network_status
  label: Get Network Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getNetworkStatus"
  params: []

- id: set_wired_lan
  label: Set Wired LAN
  kind: action
  command: "POST /YamahaExtendedControl/v1/system/setWiredLan"
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

- id: set_wireless_lan
  label: Set Wireless LAN
  kind: action
  command: "POST /YamahaExtendedControl/v1/system/setWirelessLan"
  params:
    - name: ssid
      type: string
    - name: type
      type: string
      description: "none | wep | wpa2-psk(aes) | mixed_mode"
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

- id: set_wireless_direct
  label: Set Wireless Direct
  kind: action
  command: "POST /YamahaExtendedControl/v1/system/setWirelessDirect"
  params:
    - name: type
      type: string
      description: "none | wpa2-psk(aes)"
    - name: key
      type: string

- id: set_ip_settings
  label: Set IP Settings
  kind: action
  command: "POST /YamahaExtendedControl/v1/system/setIpSettings"
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

- id: set_network_name
  label: Set Network Name
  kind: action
  command: "POST /YamahaExtendedControl/v1/system/setNetworkName"
  params:
    - name: name
      type: string
      description: "Friendly name, UTF-8 within 32 characters"

- id: set_airplay_pin
  label: Set AirPlay PIN
  kind: action
  command: "POST /YamahaExtendedControl/v1/system/setAirPlayPin"
  params:
    - name: pin
      type: string
      description: "Printable ASCII (0x20-0x7E) within 63 characters"

- id: get_mac_address_filter
  label: Get MAC Address Filter
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getMacAddressFilter"
  params: []

- id: set_mac_address_filter
  label: Set MAC Address Filter
  kind: action
  command: "POST /YamahaExtendedControl/v1/system/setMacAddressFilter"
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

- id: get_network_standby
  label: Get Network Standby
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getNetworkStandby"
  params: []

- id: set_network_standby
  label: Set Network Standby
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setNetworkStandby?standby={standby}"
  params:
    - name: standby
      type: string
      description: "off | on | auto"

- id: get_bluetooth_info
  label: Get Bluetooth Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getBluetoothInfo"
  params: []

- id: set_bluetooth_standby
  label: Set Bluetooth Standby
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setBluetoothStandby?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: set_bluetooth_tx_setting
  label: Set Bluetooth TX Setting
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setBluetoothTxSetting?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: get_bluetooth_device_list
  label: Get Bluetooth Device List
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getBluetoothDeviceList"
  params: []

- id: update_bluetooth_device_list
  label: Update Bluetooth Device List
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/updateBluetoothDeviceList"
  params: []

- id: connect_bluetooth_device
  label: Connect Bluetooth Device
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/connectBluetoothDevice?address={address}"
  params:
    - name: address
      type: string
      description: "BT address (12-digit hex)"

- id: disconnect_bluetooth_device
  label: Disconnect Bluetooth Device
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/disconnectBluetoothDevice"
  params: []

- id: get_func_status
  label: Get Func Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getFuncStatus"
  params: []

- id: set_auto_power_standby
  label: Set Auto Power Standby
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setAutoPowerStandby?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: set_ir_sensor
  label: Set IR Sensor
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setIrSensor?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: set_speaker_a
  label: Set Speaker A
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setSpeakerA?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: set_speaker_b
  label: Set Speaker B
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setSpeakerB?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: set_dimmer
  label: Set Dimmer
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setDimmer?value={value}"
  params:
    - name: value
      type: integer
      description: "-1 = auto; >=0 = manual"

- id: set_zone_b_volume_sync
  label: Set Zone B Volume Sync
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setZoneBVolumeSync?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: set_hdmi_out_1
  label: Set HDMI Out 1
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setHdmiOut1?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: set_hdmi_out_2
  label: Set HDMI Out 2
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setHdmiOut2?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: set_hdmi_out_3
  label: Set HDMI Out 3
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setHdmiOut3?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: get_name_text
  label: Get Name Text
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getNameText?id={id}"
  params:
    - name: id
      type: string
      description: "Optional Zone/Input/Sound Program ID; omit to retrieve all"

- id: set_name_text
  label: Set Name Text
  kind: action
  command: "POST /YamahaExtendedControl/v1/system/setNameText"
  params:
    - name: id
      type: string
    - name: text
      type: string
      description: "UTF-8 within 64 bytes; empty string resets to default"

- id: get_location_info
  label: Get Location Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getLocationInfo"
  params: []

- id: get_stereo_pair_info
  label: Get Stereo Pair Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getStereoPairInfo"
  params: []

- id: send_ir_code
  label: Send IR Code
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/sendIrCode?code={code}"
  params:
    - name: code
      type: string
      description: "IR code, 8-digit hex"

- id: get_remote_info
  label: Get Remote Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getRemoteInfo"
  params: []

- id: request_network_reboot
  label: Request Network Reboot
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/requestNetworkReboot"
  params: []

- id: request_system_reboot
  label: Request System Reboot
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/requestSystemReboot"
  params: []

- id: get_advanced_features
  label: Get Advanced Features
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getAdvancedFeatures"
  params: []

- id: set_auto_play
  label: Set Auto Play
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setAutoPlay?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: set_speaker_pattern
  label: Set Speaker Pattern
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setSpeakerPattern?num={num}"
  params:
    - name: num
      type: integer
      description: "1..speaker_pattern_num (from getFeatures)"

- id: set_party_mode
  label: Set Party Mode
  kind: action
  command: "GET /YamahaExtendedControl/v1/system/setPartyMode?enable={enable}"
  params:
    - name: enable
      type: boolean

# ───── Zone (5.1 - 5.29) - {zone} is one of main|zone2|zone3|zone4 ─────
- id: get_status
  label: Get Zone Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/{zone}/getStatus"
  params:
    - name: zone
      type: string
      description: "main | zone2 | zone3 | zone4"

- id: get_sound_program_list
  label: Get Sound Program List
  kind: query
  command: "GET /YamahaExtendedControl/v1/{zone}/getSoundProgramList"
  params:
    - name: zone
      type: string

- id: set_power
  label: Set Power
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setPower?power={power}"
  params:
    - name: zone
      type: string
    - name: power
      type: string
      description: "on | standby | toggle"

- id: set_sleep
  label: Set Sleep Timer
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setSleep?sleep={sleep}"
  params:
    - name: zone
      type: string
    - name: sleep
      type: integer
      description: "0 | 30 | 60 | 90 | 120 minutes"

- id: set_volume
  label: Set Volume
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setVolume?volume={volume}&step={step}"
  params:
    - name: zone
      type: string
    - name: volume
      type: integer
      description: "Numeric volume, or 'up'/'down' (API v1.17+)"
    - name: step
      type: integer
      description: "Step value when volume is up/down (optional)"

- id: set_mute
  label: Set Mute
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setMute?enable={enable}"
  params:
    - name: zone
      type: string
    - name: enable
      type: boolean

- id: set_input
  label: Set Input
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setInput?input={input}&mode={mode}"
  params:
    - name: zone
      type: string
    - name: input
      type: string
      description: "Input ID from getFeatures"
    - name: mode
      type: string
      description: "autoplay_disabled (optional, API v1.12+)"

- id: set_sound_program
  label: Set Sound Program
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setSoundProgram?program={program}"
  params:
    - name: zone
      type: string
    - name: program
      type: string
      description: "Sound Program ID from getFeatures"

- id: set_3d_surround
  label: Set 3D Surround
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/set3dSurround?enable={enable}"
  params:
    - name: zone
      type: string
    - name: enable
      type: boolean

- id: set_direct
  label: Set Direct
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setDirect?enable={enable}"
  params:
    - name: zone
      type: string
    - name: enable
      type: boolean

- id: set_pure_direct
  label: Set Pure Direct
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setPureDirect?enable={enable}"
  params:
    - name: zone
      type: string
    - name: enable
      type: boolean

- id: set_enhancer
  label: Set Enhancer
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setEnhancer?enable={enable}"
  params:
    - name: zone
      type: string
    - name: enable
      type: boolean

- id: set_tone_control
  label: Set Tone Control
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setToneControl?mode={mode}&bass={bass}&treble={treble}"
  params:
    - name: zone
      type: string
    - name: mode
      type: string
      description: "manual | auto | bypass (optional)"
    - name: bass
      type: integer
    - name: treble
      type: integer

- id: set_equalizer
  label: Set Equalizer
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setEqualizer?mode={mode}&low={low}&mid={mid}&high={high}"
  params:
    - name: zone
      type: string
    - name: mode
      type: string
    - name: low
      type: integer
    - name: mid
      type: integer
    - name: high
      type: integer

- id: set_balance
  label: Set Balance
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setBalance?value={value}"
  params:
    - name: zone
      type: string
    - name: value
      type: integer
      description: "Negative = left, positive = right"

- id: set_dialogue_level
  label: Set Dialogue Level
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setDialogueLevel?value={value}"
  params:
    - name: zone
      type: string
    - name: value
      type: integer

- id: set_dialogue_lift
  label: Set Dialogue Lift
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setDialogueLift?value={value}"
  params:
    - name: zone
      type: string
    - name: value
      type: integer

- id: set_clear_voice
  label: Set Clear Voice
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setClearVoice?enable={enable}"
  params:
    - name: zone
      type: string
    - name: enable
      type: boolean

- id: set_subwoofer_volume
  label: Set Subwoofer Volume
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setSubwooferVolume?volume={volume}"
  params:
    - name: zone
      type: string
    - name: volume
      type: integer

- id: set_bass_extension
  label: Set Bass Extension
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setBassExtension?enable={enable}"
  params:
    - name: zone
      type: string
    - name: enable
      type: boolean

- id: get_signal_info
  label: Get Signal Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/{zone}/getSignalInfo"
  params:
    - name: zone
      type: string

- id: prepare_input_change
  label: Prepare Input Change
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/prepareInputChange?input={input}"
  params:
    - name: zone
      type: string
    - name: input
      type: string

- id: recall_scene
  label: Recall Scene
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/recallScene?num={num}"
  params:
    - name: zone
      type: string
    - name: num
      type: integer
      description: "Scene number from getFeatures"

- id: set_contents_display
  label: Set Contents Display
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setContentsDisplay?enable={enable}"
  params:
    - name: zone
      type: string
    - name: enable
      type: boolean

- id: control_cursor
  label: Control Cursor
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/controlCursor?cursor={cursor}"
  params:
    - name: zone
      type: string
    - name: cursor
      type: string
      description: "up | down | left | right | select | return"

- id: control_menu
  label: Control Menu
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/controlMenu?menu={menu}"
  params:
    - name: zone
      type: string
    - name: menu
      type: string
      description: "on_screen | top_menu | menu | option | display | help | home | mode | red | green | yellow | blue"

- id: set_actual_volume
  label: Set Actual Volume
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setActualVolume?mode={mode}&value={value}"
  params:
    - name: zone
      type: string
    - name: mode
      type: string
      description: "db | numeric"
    - name: value
      type: number

- id: set_audio_select
  label: Set Audio Select
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setAudioSelect?type={type}"
  params:
    - name: zone
      type: string
    - name: type
      type: string
      description: "auto | hdmi | coax_opt | analog | unavailable"

- id: set_surround_decoder_type
  label: Set Surround Decoder Type
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setSurroundDecoderType?type={type}"
  params:
    - name: zone
      type: string
    - name: type
      type: string
      description: "toggle | auto | dolby_pl | dolby_pl2x_movie | dolby_pl2x_music | dolby_pl2x_game | dolby_surround | dts_neural_x | dts_neo6_cinema | dts_neo6_music"

# ───── Tuner (6.1 - 6.15) - present on receivers, not on YAS-408 ─────
- id: tuner_get_preset_info
  label: Tuner Get Preset Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/tuner/getPresetInfo?band={band}"
  params:
    - name: band
      type: string
      description: "common | am | fm | dab"

- id: tuner_get_play_info
  label: Tuner Get Play Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/tuner/getPlayInfo"
  params: []

- id: tuner_set_band
  label: Tuner Set Band
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/setBand?band={band}"
  params:
    - name: band
      type: string
      description: "am | fm | dab"

- id: tuner_set_freq
  label: Tuner Set Freq
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/setFreq?band={band}&tuning={tuning}&num={num}"
  params:
    - name: band
      type: string
      description: "am | fm"
    - name: tuning
      type: string
      description: "up | down | cancel | auto_up | auto_down | tp_up | tp_down | direct"
    - name: num
      type: integer
      description: "Frequency (kHz) when tuning=direct"

- id: tuner_recall_preset
  label: Tuner Recall Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/recallPreset?zone={zone}&band={band}&num={num}"
  params:
    - name: zone
      type: string
    - name: band
      type: string
    - name: num
      type: integer

- id: tuner_switch_preset
  label: Tuner Switch Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/switchPreset?dir={dir}"
  params:
    - name: dir
      type: string
      description: "next | previous"

- id: tuner_store_preset
  label: Tuner Store Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/storePreset?num={num}"
  params:
    - name: num
      type: integer

- id: tuner_clear_preset
  label: Tuner Clear Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/clearPreset?band={band}&num={num}"
  params:
    - name: band
      type: string
    - name: num
      type: integer

- id: tuner_start_auto_preset
  label: Tuner Start Auto Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/startAutoPreset?band={band}"
  params:
    - name: band
      type: string
      description: "fm"

- id: tuner_cancel_auto_preset
  label: Tuner Cancel Auto Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/cancelAutoPreset?band={band}"
  params:
    - name: band
      type: string
      description: "fm"

- id: tuner_move_preset
  label: Tuner Move Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/movePreset?band={band}&from={from}&to={to}"
  params:
    - name: band
      type: string
    - name: from
      type: integer
    - name: to
      type: integer

- id: tuner_start_dab_initial_scan
  label: Tuner Start DAB Initial Scan
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/startDabInitialScan"
  params: []

- id: tuner_cancel_dab_initial_scan
  label: Tuner Cancel DAB Initial Scan
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/cancelDabInitialScan"
  params: []

- id: tuner_set_dab_tune_aid
  label: Tuner Set DAB Tune Aid
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/setDabTuneAid?action={action}"
  params:
    - name: action
      type: string
      description: "start | stop | up | down"

- id: tuner_set_dab_service
  label: Tuner Set DAB Service
  kind: action
  command: "GET /YamahaExtendedControl/v1/tuner/setDabService?dir={dir}"
  params:
    - name: dir
      type: string
      description: "next | previous"

# ───── Net/USB (7.1 - 7.26) ─────
- id: netusb_get_preset_info
  label: NetUSB Get Preset Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getPresetInfo"
  params: []

- id: netusb_get_play_info
  label: NetUSB Get Play Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getPlayInfo"
  params: []

- id: netusb_set_playback
  label: NetUSB Set Playback
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setPlayback?playback={playback}"
  params:
    - name: playback
      type: string
      description: "play | stop | pause | play_pause | previous | next | fast_reverse_start | fast_reverse_end | fast_forward_start | fast_forward_end"

- id: netusb_set_play_position
  label: NetUSB Set Play Position
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setPlayPosition?position={position}"
  params:
    - name: position
      type: integer
      description: "Seconds; valid for Server input"

- id: netusb_set_repeat
  label: NetUSB Set Repeat
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setRepeat?mode={mode}"
  params:
    - name: mode
      type: string
      description: "off | one | all"

- id: netusb_set_shuffle
  label: NetUSB Set Shuffle
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setShuffle?mode={mode}"
  params:
    - name: mode
      type: string
      description: "off | on | songs | albums"

- id: netusb_toggle_repeat
  label: NetUSB Toggle Repeat
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/toggleRepeat"
  params: []

- id: netusb_toggle_shuffle
  label: NetUSB Toggle Shuffle
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/toggleShuffle"
  params: []

- id: netusb_get_list_info
  label: NetUSB Get List Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getListInfo?input={input}&index={index}&size={size}&lang={lang}&list_id={list_id}"
  params:
    - name: list_id
      type: string
      description: "main | auto_complete | search_artist | search_track"
    - name: input
      type: string
    - name: index
      type: integer
      description: "Multiple of 8, 0..64992"
    - name: size
      type: integer
      description: "1..8"
    - name: lang
      type: string
      description: "en | ja | fr | de | es | ru | it | zh"

- id: netusb_set_list_control
  label: NetUSB Set List Control
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setListControl?list_id={list_id}&type={type}&index={index}&zone={zone}"
  params:
    - name: list_id
      type: string
    - name: type
      type: string
      description: "select | play | return"
    - name: index
      type: integer
    - name: zone
      type: string

- id: netusb_set_search_string
  label: NetUSB Set Search String
  kind: action
  command: "POST /YamahaExtendedControl/v1/netusb/setSearchString"
  params:
    - name: list_id
      type: string
    - name: string
      type: string
    - name: index
      type: integer

- id: netusb_recall_preset
  label: NetUSB Recall Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/recallPreset?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
    - name: num
      type: integer

- id: netusb_store_preset
  label: NetUSB Store Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/storePreset?num={num}"
  params:
    - name: num
      type: integer

- id: netusb_clear_preset
  label: NetUSB Clear Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/clearPreset?num={num}"
  params:
    - name: num
      type: integer

- id: netusb_move_preset
  label: NetUSB Move Preset
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/movePreset?from={from}&to={to}"
  params:
    - name: from
      type: integer
    - name: to
      type: integer

- id: netusb_get_settings
  label: NetUSB Get Settings
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getSettings"
  params: []

- id: netusb_set_quality
  label: NetUSB Set Quality
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setQuality?input={input}&value={value}"
  params:
    - name: input
      type: string
      description: "qobuz"
    - name: value
      type: string
      description: "hr_192_24 | hr_96_24 | cd_44_16 | mp3_320"

- id: netusb_get_recent_info
  label: NetUSB Get Recent Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getRecentInfo"
  params: []

- id: netusb_recall_recent_item
  label: NetUSB Recall Recent Item
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/recallRecentItem?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
    - name: num
      type: integer

- id: netusb_clear_recent_info
  label: NetUSB Clear Recent Info
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/clearRecentInfo"
  params: []

- id: netusb_manage_play
  label: NetUSB Manage Play
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/managePlay?type={type}&timeout={timeout}"
  params:
    - name: type
      type: string
      description: "add_bookmark | add_track | add_album | add_channel_track | add_channel_artist | add_playlist | add_to_playlist | thumbs_up | thumbs_down | mark_tired"
    - name: timeout
      type: integer
      description: "0..60000 ms"

- id: netusb_manage_list
  label: NetUSB Manage List
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/manageList?list_id={list_id}&type={type}&index={index}&zone={zone}&timeout={timeout}"
  params:
    - name: list_id
      type: string
    - name: type
      type: string
      description: "add_bookmark | add_track | add_album | add_artist | add_channel | add_playlist | remove_bookmark | remove_track | remove_album | remove_artist | remove_channel | remove_playlist | remove_from_playlist | end_auto_complete"
    - name: index
      type: integer
    - name: zone
      type: string
    - name: timeout
      type: integer

- id: netusb_get_play_description
  label: NetUSB Get Play Description
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/getPlayDescription?type={type}&timeout={timeout}"
  params:
    - name: type
      type: string
      description: "why_this_song (Pandora)"
    - name: timeout
      type: integer

- id: netusb_set_list_sort_option
  label: NetUSB Set List Sort Option
  kind: action
  command: "GET /YamahaExtendedControl/v1/netusb/setListSortOption?input={input}&type={type}"
  params:
    - name: input
      type: string
      description: "pandora"
    - name: type
      type: string
      description: "date | alphabet | recent"

- id: netusb_get_account_status
  label: NetUSB Get Account Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getAccountStatus"
  params: []

- id: netusb_get_service_info
  label: NetUSB Get Service Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/netusb/getServiceInfo?input={input}&type={type}&timeout={timeout}"
  params:
    - name: input
      type: string
      description: "pandora | napster"
    - name: type
      type: string
      description: "account_list | licensing | activation_code"
    - name: timeout
      type: integer

# ───── CD (8.1 - 8.7) - receivers/mini-systems, not YAS-408 ─────
- id: cd_get_play_info
  label: CD Get Play Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/cd/getPlayInfo"
  params: []

- id: cd_set_playback
  label: CD Set Playback
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/setPlayback?playback={playback}&num={num}"
  params:
    - name: playback
      type: string
      description: "play | stop | pause | previous | next | fast_reverse_start | fast_reverse_end | fast_forward_start | fast_forward_end | track_select"
    - name: num
      type: integer
      description: "Track number 1..512 (only with track_select)"

- id: cd_toggle_tray
  label: CD Toggle Tray
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/toggleTray"
  params: []

- id: cd_set_repeat
  label: CD Set Repeat
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/setRepeat?mode={mode}"
  params:
    - name: mode
      type: string
      description: "off | one | all | folder"

- id: cd_set_shuffle
  label: CD Set Shuffle
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/setShuffle?mode={mode}"
  params:
    - name: mode
      type: string
      description: "off | on | folder"

- id: cd_toggle_repeat
  label: CD Toggle Repeat
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/toggleRepeat"
  params: []

- id: cd_toggle_shuffle
  label: CD Toggle Shuffle
  kind: action
  command: "GET /YamahaExtendedControl/v1/cd/toggleShuffle"
  params: []

# ───── Clock (9.1 - 9.5) - receivers with clock, not YAS-408 ─────
- id: clock_get_settings
  label: Clock Get Settings
  kind: query
  command: "GET /YamahaExtendedControl/v1/clock/getSettings"
  params: []

- id: clock_set_auto_sync
  label: Clock Set Auto Sync
  kind: action
  command: "GET /YamahaExtendedControl/v1/clock/setAutoSync?enable={enable}"
  params:
    - name: enable
      type: boolean

- id: clock_set_date_and_time
  label: Clock Set Date And Time
  kind: action
  command: "GET /YamahaExtendedControl/v1/clock/setDateAndTime?date_time={date_time}"
  params:
    - name: date_time
      type: string
      description: 'Format "YYMMDDhhmmss"'

- id: clock_set_clock_format
  label: Clock Set Clock Format
  kind: action
  command: "GET /YamahaExtendedControl/v1/clock/setClockFormat?format={format}"
  params:
    - name: format
      type: string
      description: "12h | 24h"

- id: clock_set_alarm_settings
  label: Clock Set Alarm Settings
  kind: action
  command: "POST /YamahaExtendedControl/v1/clock/setAlarmSettings"
  params:
    - name: alarm_on
      type: boolean
    - name: volume
      type: integer
    - name: fade_interval
      type: integer
    - name: fade_type
      type: integer
    - name: mode
      type: string
    - name: repeat
      type: boolean
    - name: detail
      type: object
```

## Feedbacks
```yaml
# YXC is request/response - every action returns a JSON body containing at
# least a `response_code`. Subscribed clients also receive event UDP packets.
- id: response_code
  type: integer
  description: >
    Returned in every HTTP response body. 0 = success, non-zero = error
    (see YXC Response Code List, §10). When non-zero, no other fields are
    returned.

- id: power
  type: enum
  values: [on, standby]

- id: mute
  type: boolean

- id: input
  type: string
  description: >
    Current input ID. Valid values come from `system.input_list` in
    getFeatures (e.g. hdmi1, hdmi2, bluetooth, net_radio, spotify, airplay,
    usb, …).

- id: volume
  type: integer
  description: >
    Current numeric volume. Range and step are device-specific - retrieve
    via system.range_step in getFeatures.

- id: sleep
  type: integer
  description: "Sleep timer minutes: 0 | 30 | 60 | 90 | 120"

- id: playback
  type: enum
  values: [play, stop, pause, fast_reverse, fast_forward]

- id: repeat
  type: enum
  values: [off, one, all]

- id: shuffle
  type: enum
  values: [off, on, songs, albums]

- id: input_list
  type: array
  description: "List of selectable Input IDs (with distribution/rename/account flags)"

- id: func_list
  type: array
  description: "List of supported capability strings per system/zone/tuner/netusb scope"

- id: api_version
  type: number
  description: "YXC API version (e.g. 1.00, 2.00)"

- id: model_name
  type: string
  description: "Device model name, e.g. \"RX-V479\" or soundbar-specific identifier"

- id: netusb_play_error
  type: integer
  description: "Last playback error code from netusb event"

- id: party_enable
  type: boolean
  description: "Whether this zone is in party mode"
```

## Variables
```yaml
# The YXC API treats most settings as endpoints whose current value is
# returned by the corresponding `get*` query; the source doesn't expose a
# stable "subscribe to variable" surface. Settable-but-not-discrete knobs:
- name: dimmer
  type: integer
  description: "Dimmer level: -1 = auto, 0..N = manual (range from getFeatures)"

- name: network_standby
  type: enum
  values: [off, on, auto]
  description: "'auto' available only when 'network_standby_auto' in func_list"

- name: mac_filter_addresses
  type: array
  description: "Up to 10 MAC addresses (12-digit ASCII) for the MAC filter"

- name: actual_volume_mode
  type: enum
  values: [db, numeric]

- name: actual_volume_value
  type: number
  description: "Display volume in the selected mode; range per getFeatures"

- name: alarm_volume
  type: integer
  description: "Range from getFeatures 'alarm_volume'"

- name: alarm_fade_interval
  type: integer
  description: "Range from getFeatures 'alarm_fade'"

- name: alarm_fade_type
  type: integer
  description: "1..alarm_fade_type_num (from getFeatures)"

- name: alarm_mode
  type: enum
  values: [oneday, weekly]
```

## Events
```yaml
# Events are pushed as UDP unicast JSON to the port advertised by the client
# in the `X-AppPort` request header on any control call. The client must also
# include `X-AppName: <AppName>/<version>(<OS>)`. Subscription auto-expires
# after 10 minutes of inactivity and is reset by any subsequent request.
- id: system_bluetooth_info_updated
  description: "bluetooth_info_updated flag in event.system - re-fetch /system/getBluetoothInfo"
  transport: udp_unicast

- id: system_bluetooth_device_list_updated
  description: "bluetooth_device_list_updated flag - re-fetch /system/getBluetoothDeviceList"
  transport: udp_unicast

- id: system_func_status_updated
  description: "func_status_updated flag - re-fetch /system/getFuncStatus"
  transport: udp_unicast

- id: system_name_text_updated
  description: "name_text_updated flag - re-fetch /system/getNameText"
  transport: udp_unicast

- id: system_location_info_updated
  description: "location_info_updated flag - re-fetch /system/getLocationInfo"
  transport: udp_unicast

- id: zone_main_power
  description: "main.power updated (on/standby)"
  transport: udp_unicast

- id: zone_main_input
  description: "main.input updated"
  transport: udp_unicast

- id: zone_main_volume
  description: "main.volume updated"
  transport: udp_unicast

- id: zone_main_mute
  description: "main.mute updated"
  transport: udp_unicast

- id: zone_main_status_updated
  description: "main.status_updated - re-fetch /main/getStatus for full snapshot"
  transport: udp_unicast

- id: zone_main_signal_info_updated
  description: "main.signal_info_updated - re-fetch /main/getSignalInfo"
  transport: udp_unicast

- id: tuner_play_info_updated
  description: "tuner.play_info_updated - re-fetch /tuner/getPlayInfo"
  transport: udp_unicast

- id: tuner_preset_info_updated
  description: "tuner.preset_info_updated - re-fetch /tuner/getPresetInfo"
  transport: udp_unicast

- id: netusb_play_error
  description: "netusb.play_error - playback error code (see §10)"
  transport: udp_unicast

- id: netusb_multiple_play_errors
  description: "netusb.multiple_play_errors - bit field of accumulated errors"
  transport: udp_unicast

- id: netusb_account_updated
  description: "netusb.account_updated - re-fetch /netusb/getAccountStatus"
  transport: udp_unicast

- id: netusb_preset_info_updated
  description: "netusb.preset_info_updated - re-fetch /netusb/getPresetInfo"
  transport: udp_unicast

- id: netusb_recent_info_updated
  description: "netusb.recent_info_updated - re-fetch /netusb/getRecentInfo"
  transport: udp_unicast

- id: netusb_preset_control
  description: "netusb.preset_control.type: store | clear | recall"
  transport: udp_unicast
```

## Macros
```yaml
# UNRESOLVED: source does not document any client-side or device-side macro
# sequences. The YXC API exposes `recallScene` (1..scene_num from getFeatures)
# as the closest analogue; on the YAS-408 scene_num will likely be 0.
```

## Safety
```yaml
confirmation_required_for:
  - requestSystemReboot
  - requestNetworkReboot
  - setPartyMode
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Listed confirmations are inferred from
# the destructive nature of the operations (full system reboot) and are not
# stated in the source.
```

## Notes

- The YAS-408 is a single-zone ("main" only) MusicCast soundbar; it does not
  expose `zone2..zone4` endpoints even though the spec lists them. Calling
  those against a YAS-408 returns `response_code: 3` (Invalid Request).
- The YAS-408 has no AM/FM/DAB tuner and no CD drive; the entire `/v1/tuner`
  and `/v1/cd` namespaces return `response_code: 3` on this device.
- Capability-gated endpoints (e.g. `setSpeakerA`, `set3dSurround`,
  `setSurroundDecoderType`, `setClearVoice`, `setSubwooferVolume`,
  `setBassExtension`, `setDialogueLevel`, `setDialogueLift`,
  `setAutoPlay`, `setSpeakerPattern`, `setPartyMode`, `setSpeakerB`) require
  the corresponding string to appear in `func_list` returned by
  `/v1/system/getFeatures` (or the relevant zone's `func_list`).
- Many endpoints use `GET` with query parameters even when they mutate state;
  the YXC spec consistently uses `GET` for the simple setters. Endpoints that
  accept rich JSON bodies (setWiredLan, setWirelessLan, setWirelessDirect,
  setIpSettings, setNetworkName, setAirPlayPin, setMacAddressFilter,
  setNameText, setSearchString, setAlarmSettings) use `POST` with a JSON body.
- Event subscription requires the client to include
  `X-AppName: <name>/<version>(<os>)` and `X-AppPort: <port>` headers on any
  control request. The device then begins pushing event UDP unicast packets
  to that port. Subscription times out after 10 minutes of inactivity.
- The YXC Basic spec (Rev. 2.00) explicitly defers MusicCast link distribution
  functions to the "Advanced" specification, which is NDA-only and not
  included in this source.

<!-- UNRESOLVED: firmware version requirement (Rev. 2.00) for the YAS-408
     is not stated in the source. -->
<!-- UNRESOLVED: default TCP/UDP ports — source does not state a port; HTTP
     defaults to 80, UDP event port is client-chosen. -->
<!-- UNRESOLVED: authentication — no auth procedure is described anywhere in
     the source; treated as none per Tier-2 inference. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
  - usa.yamaha.com
  - community-openhab-org.s3-eu-central-1.amazonaws.com
source_urls:
  - https://community.symcon.de/uploads/short-url/7r8QTdkYFNfJVJmKbtqvdleuzKt.pdf
  - https://usa.yamaha.com/products/contents/audio_visual/musiccast/musiccast-compatiblity.html
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
retrieved_at: 2026-06-02T20:55:51.710Z
last_checked_at: 2026-06-04T06:37:49.008Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:37:49.008Z
matched_actions: 124
action_count: 124
confidence: medium
summary: "All 124 spec action commands match verbatim source URI entries across all six namespaces; transport base URL confirmed; source and spec are 1-to-1. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "YAS-408-specific firmware version that introduced YXC support is not stated in the source."
- "source does not document any client-side or device-side macro"
- "source contains no safety warnings, interlock procedures, or"
- "firmware version requirement (Rev. 2.00) for the YAS-408"
- "default TCP/UDP ports — source does not state a port; HTTP"
- "authentication — no auth procedure is described anywhere in"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
