---
spec_id: admin/yamaha-tt-n503
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha TT-N503 (MusicCast) Control Spec"
manufacturer: Yamaha
model_family: TT-N503
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - TT-N503
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic_v2.0.pdf
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Advanced_v2.0.pdf
retrieved_at: 2026-06-02T20:39:21.299Z
last_checked_at: 2026-06-04T06:37:46.997Z
generated_at: 2026-06-04T06:37:46.997Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TT-N503-specific capability surface (which of these APIs are exposed on a turntable) is not stated in the source. Many endpoints are conditional on the device's `func_list` returned by /system/getFeatures."
  - "port not stated in source (HTTP default 80 implied by example URIs, not asserted)"
  - "device-specific (TT-N503) tuning behavior, phono input handling,"
  - "source contains no safety warnings, interlock procedures, or"
  - "port number for HTTP endpoint not stated in source (URIs use http://{host} without explicit port; HTTP default 80 implied by example but not asserted)."
  - "firmware version range for API v2.00 compatibility not stated."
  - "whether the TT-N503 exposes the full YXC surface or only a turntable-specific subset — not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:37:46.997Z
  matched_actions: 124
  action_count: 124
  confidence: medium
  summary: "All 124 spec actions map one-to-one to the 124 YXC Basic API Rev.2.00 endpoints documented in the source; base URL and all transport values confirmed verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Yamaha TT-N503 (MusicCast) Control Spec

## Summary
The Yamaha TT-N503 is a MusicCast-enabled turntable that exposes Yamaha Extended Control (YXC) over Ethernet/Wi-Fi. The protocol is an HTTP/JSON REST API served by the device at `http://{host}/YamahaExtendedControl` and emits unsolicited state-change events as UDP unicast. This spec covers the YXC Basic API (Rev. 2.00) as documented in the source.

<!-- UNRESOLVED: TT-N503-specific capability surface (which of these APIs are exposed on a turntable) is not stated in the source. Many endpoints are conditional on the device's `func_list` returned by /system/getFeatures. -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  base_url: "http://{host}/YamahaExtendedControl"  # base URL stated verbatim in source section 3
  # UNRESOLVED: port not stated in source (HTTP default 80 implied by example URIs, not asserted)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# powerable, queryable, routable, levelable - all inferred from command examples in source
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
# All endpoints from Yamaha Extended Control API Specification (Basic) Rev. 2.00,
# sections 4-9. Each HTTP endpoint is one action. Many are conditional on /system/getFeatures.

# --- Section 4: System ---
- id: get_device_info
  label: Get Device Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getDeviceInfo"
  params: []

- id: get_features
  label: Get Features
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getFeatures"
  params: []

- id: get_network_status
  label: Get Network Status
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getNetworkStatus"
  params: []

- id: set_wired_lan
  label: Set Wired LAN
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setWiredLan"
  params:
    - name: body
      type: object
      description: '{"dhcp":"<bool>","ip_address":"<ip>","subnet_mask":"<mask>","default_gateway":"<gw>","dns_server_1":"<ip>","dns_server_2":"<ip>"}'

- id: set_wireless_lan
  label: Set Wireless LAN
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setWirelessLan"
  params:
    - name: body
      type: object
      description: '{"ssid":"<ssid>","type":"none|wep|wpa2-psk(aes)|mixed_mode","key":"<key>","dhcp":"<bool>","ip_address":"<ip>","subnet_mask":"<mask>","default_gateway":"<gw>","dns_server_1":"<ip>","dns_server_2":"<ip>"}'

- id: set_wireless_direct
  label: Set Wireless Direct
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setWirelessDirect"
  params:
    - name: body
      type: object
      description: '{"type":"none|wpa2-psk(aes)","key":"<key>"}'

- id: set_ip_settings
  label: Set IP Settings
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setIpSettings"
  params:
    - name: body
      type: object
      description: '{"dhcp":"<bool>","ip_address":"<ip>","subnet_mask":"<mask>","default_gateway":"<gw>","dns_server_1":"<ip>","dns_server_2":"<ip>"}'

- id: set_network_name
  label: Set Network Name
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setNetworkName"
  params:
    - name: name
      type: string
      description: Network friendly name (UTF-8 up to 32 chars)

- id: set_airplay_pin
  label: Set AirPlay PIN
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setAirPlayPin"
  params:
    - name: pin
      type: string
      description: AirPlay PIN (printable ASCII 0x20-0x7E, up to 63 chars)

- id: get_mac_address_filter
  label: Get MAC Address Filter
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getMacAddressFilter"
  params: []

- id: set_mac_address_filter
  label: Set MAC Address Filter
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setMacAddressFilter"
  params:
    - name: body
      type: object
      description: '{"filter":"<bool>","address_1":"<mac>",...,"address_10":"<mac>"}'

- id: get_network_standby
  label: Get Network Standby
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getNetworkStandby"
  params: []

- id: set_network_standby
  label: Set Network Standby
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setNetworkStandby?standby={value}"
  params:
    - name: value
      type: string
      description: 'off | on | auto'

- id: get_bluetooth_info
  label: Get Bluetooth Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getBluetoothInfo"
  params: []

- id: set_bluetooth_standby
  label: Set Bluetooth Standby
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setBluetoothStandby?enable={value}"
  params:
    - name: value
      type: boolean
      description: Bluetooth standby enable

- id: set_bluetooth_tx_setting
  label: Set Bluetooth TX Setting
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setBluetoothTxSetting?enable={value}"
  params:
    - name: value
      type: boolean
      description: Bluetooth transmission enable

- id: get_bluetooth_device_list
  label: Get Bluetooth Device List
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getBluetoothDeviceList"
  params: []

- id: update_bluetooth_device_list
  label: Update Bluetooth Device List
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/updateBluetoothDeviceList"
  params: []

- id: connect_bluetooth_device
  label: Connect Bluetooth Device
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/connectBluetoothDevice?address={value}"
  params:
    - name: value
      type: string
      description: 12-digit hex Bluetooth address

- id: disconnect_bluetooth_device
  label: Disconnect Bluetooth Device
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/disconnectBluetoothDevice"
  params: []

- id: get_func_status
  label: Get Function Status
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getFuncStatus"
  params: []

- id: set_auto_power_standby
  label: Set Auto Power Standby
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setAutoPowerStandby?enable={value}"
  params:
    - name: value
      type: boolean
      description: Auto power standby enable

- id: set_ir_sensor
  label: Set IR Sensor
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setIrSensor?enable={value}"
  params:
    - name: value
      type: boolean
      description: IR sensor enable

- id: set_speaker_a
  label: Set Speaker A
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setSpeakerA?enable={value}"
  params:
    - name: value
      type: boolean
      description: Speaker A enable

- id: set_speaker_b
  label: Set Speaker B
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setSpeakerB?enable={value}"
  params:
    - name: value
      type: boolean
      description: Speaker B enable

- id: set_dimmer
  label: Set Dimmer
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setDimmer?value={value}"
  params:
    - name: value
      type: integer
      description: 'Dimmer value; -1 for auto, 0+ for manual (range from /system/getFeatures)'

- id: set_zone_b_volume_sync
  label: Set Zone B Volume Sync
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setZoneBVolumeSync?enable={value}"
  params:
    - name: value
      type: boolean
      description: Zone B volume sync enable

- id: set_hdmi_out_1
  label: Set HDMI Out 1
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setHdmiOut1?enable={value}"
  params:
    - name: value
      type: boolean
      description: HDMI OUT 1 enable

- id: set_hdmi_out_2
  label: Set HDMI Out 2
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setHdmiOut2?enable={value}"
  params:
    - name: value
      type: boolean
      description: HDMI OUT 2 enable

- id: set_hdmi_out_3
  label: Set HDMI Out 3
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setHdmiOut3?enable={value}"
  params:
    - name: value
      type: boolean
      description: HDMI OUT 3 enable

- id: get_name_text
  label: Get Name Text
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getNameText?id={value}"
  params:
    - name: value
      type: string
      description: 'Optional ID (main, zone2, hdmi1, etc.)'

- id: set_name_text
  label: Set Name Text
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/system/setNameText"
  params:
    - name: body
      type: object
      description: '{"id":"<id>","text":"<text>"} - text UTF-8 up to 64 bytes; "" restores default'

- id: get_location_info
  label: Get Location Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getLocationInfo"
  params: []

- id: get_stereo_pair_info
  label: Get Stereo Pair Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getStereoPairInfo"
  params: []

- id: send_ir_code
  label: Send IR Code
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/sendIrCode?code={value}"
  params:
    - name: value
      type: string
      description: IR code in 8-digit hex

- id: get_remote_info
  label: Get Remote Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getRemoteInfo"
  params: []

- id: request_network_reboot
  label: Request Network Reboot
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/requestNetworkReboot"
  params: []

- id: request_system_reboot
  label: Request System Reboot
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/requestSystemReboot"
  params: []

- id: get_advanced_features
  label: Get Advanced Features
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/system/getAdvancedFeatures"
  params: []

- id: set_auto_play
  label: Set Auto Play
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setAutoPlay?enable={value}"
  params:
    - name: value
      type: boolean
      description: Auto play enable

- id: set_speaker_pattern
  label: Set Speaker Pattern
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setSpeakerPattern?num={value}"
  params:
    - name: value
      type: integer
      description: Speaker pattern number (1..N from /system/getFeatures)

- id: set_party_mode
  label: Set Party Mode
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/system/setPartyMode?enable={value}"
  params:
    - name: value
      type: boolean
      description: Party mode enable

# --- Section 5: Zone ---
- id: get_zone_status
  label: Get Zone Status
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/getStatus"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'

- id: get_sound_program_list
  label: Get Sound Program List
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/getSoundProgramList"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'

- id: set_power
  label: Set Power
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setPower?power={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: string
      description: 'on | standby | toggle'

- id: set_sleep
  label: Set Sleep Timer
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setSleep?sleep={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: integer
      description: 'Sleep minutes: 0 | 30 | 60 | 90 | 120'

- id: set_volume
  label: Set Volume
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setVolume?volume={value}&step={step}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: integer
      description: 'Volume value, or "up"/"down" (API v1.17+)'
    - name: step
      type: integer
      description: 'Optional step when volume is up/down'

- id: set_mute
  label: Set Mute
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setMute?enable={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: boolean
      description: Mute enable

- id: set_input
  label: Set Input
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setInput?input={input}&mode={mode}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: input
      type: string
      description: Input ID from /system/getFeatures
    - name: mode
      type: string
      description: 'Optional; "autoplay_disabled" (API v1.12+)'

- id: set_sound_program
  label: Set Sound Program
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setSoundProgram?program={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: string
      description: Sound Program ID

- id: set_3d_surround
  label: Set 3D Surround
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/set3dSurround?enable={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: boolean
      description: 3D surround enable

- id: set_direct
  label: Set Direct
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setDirect?enable={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: boolean
      description: Direct enable

- id: set_pure_direct
  label: Set Pure Direct
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setPureDirect?enable={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: boolean
      description: Pure Direct enable

- id: set_enhancer
  label: Set Enhancer
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setEnhancer?enable={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: boolean
      description: Enhancer enable

- id: set_tone_control
  label: Set Tone Control
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setToneControl?mode={mode}&bass={bass}&treble={treble}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: mode
      type: string
      description: 'manual | auto | bypass (from /system/getFeatures)'
    - name: bass
      type: integer
      description: Bass value
    - name: treble
      type: integer
      description: Treble value

- id: set_equalizer
  label: Set Equalizer
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setEqualizer?mode={mode}&low={low}&mid={mid}&high={high}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: mode
      type: string
      description: 'manual | auto | bypass'
    - name: low
      type: integer
      description: Low EQ value
    - name: mid
      type: integer
      description: Mid EQ value
    - name: high
      type: integer
      description: High EQ value

- id: set_balance
  label: Set Balance
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setBalance?value={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: integer
      description: 'L/R balance; negative = left, positive = right'

- id: set_dialogue_level
  label: Set Dialogue Level
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setDialogueLevel?value={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: integer
      description: Dialogue level value

- id: set_dialogue_lift
  label: Set Dialogue Lift
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setDialogueLift?value={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: integer
      description: Dialogue lift value

- id: set_clear_voice
  label: Set Clear Voice
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setClearVoice?enable={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: boolean
      description: Clear voice enable

- id: set_subwoofer_volume
  label: Set Subwoofer Volume
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setSubwooferVolume?volume={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: integer
      description: Subwoofer volume value

- id: set_bass_extension
  label: Set Bass Extension
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setBassExtension?enable={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: boolean
      description: Bass extension enable

- id: get_signal_info
  label: Get Signal Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/getSignalInfo"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'

- id: prepare_input_change
  label: Prepare Input Change
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/prepareInputChange?input={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: string
      description: Input ID

- id: recall_scene
  label: Recall Scene
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/recallScene?num={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: integer
      description: Scene number

- id: set_contents_display
  label: Set Contents Display
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setContentsDisplay?enable={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: boolean
      description: Display enable

- id: control_cursor
  label: Control Cursor
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/controlCursor?cursor={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: string
      description: 'up | down | left | right | select | return'

- id: control_menu
  label: Control Menu
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/controlMenu?menu={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: string
      description: 'on_screen | top_menu | menu | option | display | help | home | mode | red | green | yellow | blue'

- id: set_actual_volume
  label: Set Actual Volume
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setActualVolume?mode={mode}&value={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: mode
      type: string
      description: 'db | numeric'
    - name: value
      type: number
      description: Displayed volume value

- id: set_audio_select
  label: Set Audio Select
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setAudioSelect?type={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: string
      description: 'auto | hdmi | coax_opt | analog | unavailable'

- id: set_surround_decoder_type
  label: Set Surround Decoder Type
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setSurroundDecoderType?type={value}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: value
      type: string
      description: 'toggle | auto | dolby_pl | dolby_pl2x_movie | dolby_pl2x_music | dolby_pl2x_game | dolby_surround | dts_neural_x | dts_neo6_cinema | dts_neo6_music'

# --- Section 6: Tuner ---
- id: get_tuner_preset_info
  label: Get Tuner Preset Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/getPresetInfo?band={value}"
  params:
    - name: value
      type: string
      description: 'common | am | fm | dab'

- id: get_tuner_play_info
  label: Get Tuner Play Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/getPlayInfo"
  params: []

- id: set_tuner_band
  label: Set Tuner Band
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/setBand?band={value}"
  params:
    - name: value
      type: string
      description: 'am | fm | dab'

- id: set_tuner_freq
  label: Set Tuner Frequency
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/setFreq?band={band}&tuning={tuning}&num={num}"
  params:
    - name: band
      type: string
      description: 'am | fm'
    - name: tuning
      type: string
      description: 'up | down | cancel | auto_up | auto_down | tp_up | tp_down | direct'
    - name: num
      type: integer
      description: Frequency in kHz (required when tuning=direct)

- id: recall_tuner_preset
  label: Recall Tuner Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/recallPreset?zone={zone}&band={band}&num={num}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: band
      type: string
      description: 'common | am | fm | dab'
    - name: num
      type: integer
      description: Preset number

- id: switch_tuner_preset
  label: Switch Tuner Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/switchPreset?dir={value}"
  params:
    - name: value
      type: string
      description: 'next | previous'

- id: store_tuner_preset
  label: Store Tuner Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/storePreset?num={value}"
  params:
    - name: value
      type: integer
      description: Preset number

- id: clear_tuner_preset
  label: Clear Tuner Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/clearPreset?band={band}&num={num}"
  params:
    - name: band
      type: string
      description: 'common | am | fm | dab'
    - name: num
      type: integer
      description: Preset number

- id: start_tuner_auto_preset
  label: Start Auto Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/startAutoPreset?band={value}"
  params:
    - name: value
      type: string
      description: 'fm'

- id: cancel_tuner_auto_preset
  label: Cancel Auto Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/cancelAutoPreset?band={value}"
  params:
    - name: value
      type: string
      description: 'fm'

- id: move_tuner_preset
  label: Move Tuner Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/movePreset?band={band}&from={from}&to={to}"
  params:
    - name: band
      type: string
      description: 'common | am | fm | dab'
    - name: from
      type: integer
      description: Source preset number
    - name: to
      type: integer
      description: Destination preset number

- id: start_dab_initial_scan
  label: Start DAB Initial Scan
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/startDabInitialScan"
  params: []

- id: cancel_dab_initial_scan
  label: Cancel DAB Initial Scan
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/cancelDabInitialScan"
  params: []

- id: set_dab_tune_aid
  label: Set DAB Tune Aid
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/setDabTuneAid?action={value}"
  params:
    - name: value
      type: string
      description: 'start | stop | up | down'

- id: set_dab_service
  label: Set DAB Service
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/tuner/setDabService?dir={value}"
  params:
    - name: value
      type: string
      description: 'next | previous'

# --- Section 7: Network/USB ---
- id: get_netusb_preset_info
  label: Get NetUSB Preset Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getPresetInfo"
  params: []

- id: get_netusb_play_info
  label: Get NetUSB Play Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getPlayInfo"
  params: []

- id: set_netusb_playback
  label: Set NetUSB Playback
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setPlayback?playback={value}"
  params:
    - name: value
      type: string
      description: 'play | stop | pause | play_pause | previous | next | fast_reverse_start | fast_reverse_end | fast_forward_start | fast_forward_end'

- id: set_netusb_play_position
  label: Set NetUSB Play Position
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setPlayPosition?position={value}"
  params:
    - name: value
      type: integer
      description: Play position in seconds

- id: set_netusb_repeat
  label: Set NetUSB Repeat
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setRepeat?mode={value}"
  params:
    - name: value
      type: string
      description: 'off | one | all'

- id: set_netusb_shuffle
  label: Set NetUSB Shuffle
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setShuffle?mode={value}"
  params:
    - name: value
      type: string
      description: 'off | on | songs | albums'

- id: toggle_netusb_repeat
  label: Toggle NetUSB Repeat
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/toggleRepeat"
  params: []

- id: toggle_netusb_shuffle
  label: Toggle NetUSB Shuffle
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/toggleShuffle"
  params: []

- id: get_netusb_list_info
  label: Get NetUSB List Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getListInfo?input={input}&index={index}&size={size}&lang={lang}"
  params:
    - name: input
      type: string
      description: Net/USB input ID
    - name: index
      type: integer
      description: 'Reference index (multiple of 8, 0..64992)'
    - name: size
      type: integer
      description: 'Max list size 1-8'
    - name: lang
      type: string
      description: 'en | ja | fr | de | es | ru | it | zh'

- id: set_netusb_list_control
  label: Set NetUSB List Control
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setListControl?list_id={list_id}&type={type}&index={index}&zone={zone}"
  params:
    - name: list_id
      type: string
      description: 'main | auto_complete | search_artist | search_track'
    - name: type
      type: string
      description: 'select | play | return'
    - name: index
      type: integer
      description: 'Element index 0-64999 (required for select/play)'
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4 (playback target)'

- id: set_netusb_search_string
  label: Set NetUSB Search String
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/netusb/setSearchString"
  params:
    - name: body
      type: object
      description: '{"list_id":"<id>","string":"<text>","index":<int>}'

- id: recall_netusb_preset
  label: Recall NetUSB Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/recallPreset?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: num
      type: integer
      description: Preset number

- id: store_netusb_preset
  label: Store NetUSB Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/storePreset?num={value}"
  params:
    - name: value
      type: integer
      description: Preset number

- id: clear_netusb_preset
  label: Clear NetUSB Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/clearPreset?num={value}"
  params:
    - name: value
      type: integer
      description: Preset number

- id: move_netusb_preset
  label: Move NetUSB Preset
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/movePreset?from={from}&to={to}"
  params:
    - name: from
      type: integer
      description: Source preset number
    - name: to
      type: integer
      description: Destination preset number

- id: get_netusb_settings
  label: Get NetUSB Settings
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getSettings"
  params: []

- id: set_netusb_quality
  label: Set NetUSB Quality
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setQuality?input={input}&value={value}"
  params:
    - name: input
      type: string
      description: 'qobuz'
    - name: value
      type: string
      description: 'hr_192_24 | hr_96_24 | cd_44_16 | mp3_320'

- id: get_netusb_recent_info
  label: Get NetUSB Recent Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getRecentInfo"
  params: []

- id: recall_netusb_recent_item
  label: Recall NetUSB Recent Item
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/recallRecentItem?zone={zone}&num={num}"
  params:
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4'
    - name: num
      type: integer
      description: Recent history slot number

- id: clear_netusb_recent_info
  label: Clear NetUSB Recent Info
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/clearRecentInfo"
  params: []

- id: manage_netusb_play
  label: Manage NetUSB Play
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/managePlay?type={type}&timeout={timeout}"
  params:
    - name: type
      type: string
      description: 'add_bookmark | add_track | add_album | add_channel_track | add_channel_artist | add_playlist | add_to_playlist | thumbs_up | thumbs_down | mark_tired'
    - name: timeout
      type: integer
      description: 'Timeout ms (0-60000; 0 = max)'

- id: manage_netusb_list
  label: Manage NetUSB List
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/manageList?list_id={list_id}&type={type}&index={index}&zone={zone}&timeout={timeout}"
  params:
    - name: list_id
      type: string
      description: 'main | auto_complete | search_artist | search_track'
    - name: type
      type: string
      description: 'add_bookmark | add_track | add_album | add_artist | add_channel | add_playlist | remove_bookmark | remove_track | remove_album | remove_artist | remove_channel | remove_playlist | remove_from_playlist | end_auto_complete'
    - name: index
      type: integer
      description: 'Reference index 0-64999'
    - name: zone
      type: string
      description: 'main | zone2 | zone3 | zone4 (for add_channel)'
    - name: timeout
      type: integer
      description: 'Timeout ms (0-60000; 0 = max)'

- id: get_netusb_play_description
  label: Get NetUSB Play Description
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getPlayDescription?type={type}&timeout={timeout}"
  params:
    - name: type
      type: string
      description: 'why_this_song'
    - name: timeout
      type: integer
      description: 'Timeout ms (0-60000; 0 = max)'

- id: set_netusb_list_sort_option
  label: Set NetUSB List Sort Option
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/setListSortOption?input={input}&type={type}"
  params:
    - name: input
      type: string
      description: 'pandora'
    - name: type
      type: string
      description: 'date | alphabet | recent (per /system/getFeatures sort_option_list)'

- id: get_netusb_account_status
  label: Get NetUSB Account Status
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getAccountStatus"
  params: []

- id: get_netusb_service_info
  label: Get NetUSB Service Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/netusb/getServiceInfo?input={input}&type={type}&timeout={timeout}"
  params:
    - name: input
      type: string
      description: 'pandora | napster'
    - name: type
      type: string
      description: 'account_list | licensing | activation_code'
    - name: timeout
      type: integer
      description: 'Timeout ms (0-60000; 0 = max)'

# --- Section 8: CD ---
- id: get_cd_play_info
  label: Get CD Play Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/getPlayInfo"
  params: []

- id: set_cd_playback
  label: Set CD Playback
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/setPlayback?playback={playback}&num={num}"
  params:
    - name: playback
      type: string
      description: 'play | stop | pause | previous | next | fast_reverse_start | fast_reverse_end | fast_forward_start | fast_forward_end | track_select'
    - name: num
      type: integer
      description: 'Track number 1-512 (when playback=track_select)'

- id: toggle_cd_tray
  label: Toggle CD Tray
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/toggleTray"
  params: []

- id: set_cd_repeat
  label: Set CD Repeat
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/setRepeat?mode={value}"
  params:
    - name: value
      type: string
      description: 'off | one | all | folder'

- id: set_cd_shuffle
  label: Set CD Shuffle
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/setShuffle?mode={value}"
  params:
    - name: value
      type: string
      description: 'off | on | folder'

- id: toggle_cd_repeat
  label: Toggle CD Repeat
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/toggleRepeat"
  params: []

- id: toggle_cd_shuffle
  label: Toggle CD Shuffle
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/cd/toggleShuffle"
  params: []

# --- Section 9: Clock ---
- id: get_clock_settings
  label: Get Clock Settings
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/clock/getSettings"
  params: []

- id: set_clock_auto_sync
  label: Set Clock Auto Sync
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/clock/setAutoSync?enable={value}"
  params:
    - name: value
      type: boolean
      description: Clock auto sync enable

- id: set_date_and_time
  label: Set Date and Time
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/clock/setDateAndTime?date_time={value}"
  params:
    - name: value
      type: string
      description: '"YYMMDDhhmmss" (YY 00-99, MM 01-12, DD 01-31, hh 00-23, mm 00-59, ss 00-59)'

- id: set_clock_format
  label: Set Clock Format
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/clock/setClockFormat?format={value}"
  params:
    - name: value
      type: string
      description: '12h | 24h'

- id: set_alarm_settings
  label: Set Alarm Settings
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/clock/setAlarmSettings"
  params:
    - name: body
      type: object
      description: '{"alarm_on":"<bool>","volume":"<int>","fade_interval":"<int>","fade_type":"<int>","mode":"oneday|weekly","repeat":"<bool>","detail":{...}}'
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  source: /v1/{zone}/getStatus - power
- id: mute_state
  type: boolean
  source: /v1/{zone}/getStatus - mute
- id: input_selected
  type: string
  source: /v1/{zone}/getStatus - input
- id: volume_value
  type: integer
  source: /v1/{zone}/getStatus - volume
- id: sleep_timer
  type: integer
  source: /v1/{zone}/getStatus - sleep (minutes; 0/30/60/90/120)
- id: playback_status
  type: enum
  values: [play, stop, pause, fast_reverse, fast_forward]
  source: /v1/netusb/getPlayInfo, /v1/tuner/getPlayInfo, /v1/cd/getPlayInfo
- id: signal_format
  type: string
  source: /v1/{zone}/getSignalInfo - audio.format
- id: signal_fs
  type: string
  source: /v1/{zone}/getSignalInfo - audio.fs
- id: network_standby_state
  type: enum
  values: [off, on, auto]
  source: /v1/system/getNetworkStandby
- id: bluetooth_connected
  type: boolean
  source: /v1/system/getBluetoothInfo - bluetooth_device.connected
- id: ip_address
  type: string
  source: /v1/system/getNetworkStatus - ip_address
- id: response_code
  type: integer
  source: every response
  description: "0 = success. See source section 10 for full Response Code List."
```

## Variables
```yaml
# Settable numeric parameters where source documents min/max/step via /system/getFeatures:
- id: volume
  type: integer
  range_source: /v1/system/getFeatures - zone[].range_step[].id="volume"
- id: tone_control_bass
  type: integer
  range_source: /v1/system/getFeatures - zone[].range_step[].id="tone_control"
- id: tone_control_treble
  type: integer
  range_source: /v1/system/getFeatures - zone[].range_step[].id="tone_control"
- id: equalizer_low
  type: integer
  range_source: /v1/system/getFeatures - zone[].range_step[].id="equalizer"
- id: equalizer_mid
  type: integer
  range_source: /v1/system/getFeatures - zone[].range_step[].id="equalizer"
- id: equalizer_high
  type: integer
  range_source: /v1/system/getFeatures - zone[].range_step[].id="equalizer"
- id: balance
  type: integer
  range_source: /v1/system/getFeatures - zone[].range_step[].id="balance"
- id: dialogue_level
  type: integer
  range_source: /v1/system/getFeatures - zone[].range_step[].id="dialogue_level"
- id: dialogue_lift
  type: integer
  range_source: /v1/system/getFeatures - zone[].range_step[].id="dialogue_lift"
- id: subwoofer_volume
  type: integer
  range_source: /v1/system/getFeatures - zone[].range_step[].id="subwoofer_volume"
- id: dimmer
  type: integer
  range_source: /v1/system/getFeatures - system.range_step[].id="dimmer"
- id: alarm_volume
  type: integer
  range_source: /v1/system/getFeatures - clock.range_step[].id="alarm_volume"
- id: alarm_fade
  type: integer
  range_source: /v1/system/getFeatures - clock.range_step[].id="alarm_fade"
- id: am_freq_khz
  type: integer
  range_source: /v1/system/getFeatures - tuner.range_step[].id="am" (531-1611 kHz, step 9)
- id: fm_freq_khz
  type: integer
  range_source: /v1/system/getFeatures - tuner.range_step[].id="fm" (76000-90000 kHz, step 100)
```

## Events
```yaml
# Source section 11: events sent as UDP unicast to the port specified in
# X-AppPort request header. Client must send request header fields:
#   X-AppName: MusicCast/XXX(YYY)
#   X-AppPort: ZZZ
# Timeout: 10 minutes, refreshed on each request.
# UDP packet loss is expected; client should poll for authoritative state.
- id: system_event
  description: System-level state changes (Bluetooth info, name text, location, function status).
  source: /v1/system/get* (see source section 11.3 for flag meanings)
- id: zone_event
  description: Per-zone power, input, volume, mute, signal_info updates (main/zone2/zone3/zone4).
  source: /v1/{zone}/getStatus, /v1/{zone}/getSignalInfo
- id: tuner_event
  description: Tuner play info and preset info updates.
  source: /v1/tuner/getPlayInfo, /v1/tuner/getPresetInfo
- id: netusb_event
  description: Net/USB play errors, account updates, play time, preset control results, list info updates, recent info updates, trial status.
  source: /v1/netusb/getPlayInfo, /v1/netusb/getListInfo, /v1/netusb/getAccountStatus, /v1/netusb/getRecentInfo
- id: cd_event
  description: CD device status and play info updates.
  source: /v1/cd/getPlayInfo
- id: clock_event
  description: Clock settings updates.
  source: /v1/clock/getSettings
```

## Macros
```yaml
# Multi-step sequences described in source section 13.1 (browse-and-play):
# 1. /v1/{zone}/prepareInputChange?input=<id>   (section 5.22)
# 2. /v1/{zone}/setInput?input=<id>             (section 5.7, optional)
# 3. /v1/netusb/getListInfo?input=<id>&index=0&size=8&lang=en  (section 7.9)
# 4. /v1/netusb/setListControl?list_id=main&type=select&index=<n>  (descend into folder)
# 5. /v1/netusb/setListControl?list_id=main&type=play&index=<n>    (start playback)
# Per source 13.1 note: getListInfo is the only blocking command; it may take
# up to 30 seconds and blocks all other commands while running. Do not chain
# setListControl:select twice without an intervening getListInfo.
# UNRESOLVED: device-specific (TT-N503) tuning behavior, phono input handling,
# and turntable-specific play/stop sequencing are not described in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements for the TT-N503.
```

## Notes
- Source: Yamaha Extended Control API Specification (Basic) Rev. 2.00, applicable to MusicCast devices on API v2.00+. Device-specific API subset is reported by `/v1/system/getFeatures` and `/v1/system/getFuncStatus` — many endpoints are conditional and will return response_code 3 (Invalid Request) or 5 (Guarded) if the corresponding function is not present on the device.
- API uses HTTP GET with query parameters for setter commands (per source examples) and POST with JSON body for some setters (setWiredLan, setWirelessLan, setWirelessDirect, setIpSettings, setNameText, setSearchString, setAlarmSettings). Source sometimes inconsistently labels these as GET vs POST — implementers should follow the source's "Method" column where present.
- Source describes GET for setListControl, setSleep, setPower, setVolume, setMute, setInput, setSoundProgram, set3dSurround, setDirect, setPureDirect, setEnhancer, setToneControl, setEqualizer, setBalance, setDialogueLevel, setDialogueLift, setClearVoice, setSubwooferVolume, setBassExtension, prepareInputChange, recallScene, setContentsDisplay, controlCursor, controlMenu, setActualVolume, setAudioSelect, setSurroundDecoderType, and all system-level setters.
- The CD and most advanced audio post-processing endpoints are unlikely to be relevant on a turntable but are included for protocol completeness.
- The TT-N503 is a turntable; phono and turntable-specific controls (tonearm, cartridge, speed selection) are NOT described in this source — UNRESOLVED.
- Response code 0 = success; full list in source section 10 (codes 0-6, 99, 100-115, 200-201).

<!-- UNRESOLVED: port number for HTTP endpoint not stated in source (URIs use http://{host} without explicit port; HTTP default 80 implied by example but not asserted). -->
<!-- UNRESOLVED: firmware version range for API v2.00 compatibility not stated. -->
<!-- UNRESOLVED: whether the TT-N503 exposes the full YXC surface or only a turntable-specific subset — not stated in source. -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic_v2.0.pdf
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Advanced_v2.0.pdf
retrieved_at: 2026-06-02T20:39:21.299Z
last_checked_at: 2026-06-04T06:37:46.997Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:37:46.997Z
matched_actions: 124
action_count: 124
confidence: medium
summary: "All 124 spec actions map one-to-one to the 124 YXC Basic API Rev.2.00 endpoints documented in the source; base URL and all transport values confirmed verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TT-N503-specific capability surface (which of these APIs are exposed on a turntable) is not stated in the source. Many endpoints are conditional on the device's `func_list` returned by /system/getFeatures."
- "port not stated in source (HTTP default 80 implied by example URIs, not asserted)"
- "device-specific (TT-N503) tuning behavior, phono input handling,"
- "source contains no safety warnings, interlock procedures, or"
- "port number for HTTP endpoint not stated in source (URIs use http://{host} without explicit port; HTTP default 80 implied by example but not asserted)."
- "firmware version range for API v2.00 compatibility not stated."
- "whether the TT-N503 exposes the full YXC surface or only a turntable-specific subset — not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
