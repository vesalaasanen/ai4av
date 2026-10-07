---
spec_id: admin/sennheiser-sl-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sennheiser SL Series Control Spec"
manufacturer: Sennheiser
model_family: "SL Rack Receiver DW"
aliases: []
compatible_with:
  manufacturers:
    - Sennheiser
  models:
    - "SL Rack Receiver DW"
    - "SL MCR 2 DW"
    - "SL MCR 4 DW"
    - "CHG 2N"
    - "CHG 4N"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.sennheiser.com
source_urls:
  - https://assets.sennheiser.com/download/assets/TI_1094_v4.3_Sennheiser_Sound_Control_Protocol_SL_DW_EN.pdf/b2a3c92ce7bb11f088db768ee8e97aea
  - https://assets.sennheiser.com/download/assets/AN_1260_v1.0_Media_Control_Systems_EN.pdf/d2d66562e7b411f08c892a34179bc91d
  - https://assets.sennheiser.com/download/assets/Sennheiser_SpeechLine_Digital_Wireless.zip/204774aae7c211f0a866ce3d75c40f07
  - https://assets.sennheiser.com/download/assets/Sennheiser_Speechline_Digital_Wireless_-_v2.0.0.qplug/1c4337c2e7c211f0ae307aeaa9c3764a
retrieved_at: 2026-10-07T20:46:28.926Z
last_checked_at: 2026-10-07T20:46:28.926Z
generated_at: 2026-10-07T20:46:28.926Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "single-channel SL Rack Receiver DW and multi-channel SL MCR 2/4 DW command sets overlap significantly but differ in channel count and some exclusive methods. CHG 2N/4N chargers share a reduced method set."
  - "device-initiated (unsolicited) events not documented in source."
  - "explicit multi-step macros not documented in source."
  - "no safety warnings or interlock procedures in source"
  - "UDP port 45 is the stated default; actual port discovered via DNS-SD may differ. No explicit mention of TCP support for SSC (only UDP). Authentication: not stated in source. Binary OSC encoding not covered (JSON SSC only). Command timing/latency not specified."
verification:
  verdict: verified
  checked_at: 2026-10-07T20:46:28.926Z
  matched_actions: 170
  action_count: 170
  confidence: medium
  summary: "All 170 action units (54 actions, 116 queries) have literal TX counterparts in the SSC method lists; UDP port 45 is stated; auth is left UNRESOLVED. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Sennheiser SL Series Control Spec

## Summary
The Sennheiser SL Series comprises wireless microphone receivers (SL Rack Receiver DW, SL Multi-Channel Receiver DW variants) and charging stations (CHG 2N, CHG 4N). All devices implement the Sennheiser Sound Control Protocol (SSC), a JSON-based protocol layered over Open Sound Control (OSC) and transported exclusively via UDP/IP. Devices support both IPv4 and IPv6, with discovery via DNS-SD (Bonjour).

<!-- UNRESOLVED: single-channel SL Rack Receiver DW and multi-channel SL MCR 2/4 DW command sets overlap significantly but differ in channel count and some exclusive methods. CHG 2N/4N chargers share a reduced method set. -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 45  # default port; discovered via DNS-SD _ssc._udp service
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- queryable       # extensive query commands (null-argument method calls)
- routable        # audio input/output routing
- levelable       # gain, volume, AGC control
```

## Actions
```yaml
# Device management (all models)
- id: device_reset
  label: Device Reset
  kind: action
  params: []
  description: "TX: {\"device\":{\"reset\":true}}"

- id: device_factory_reset
  label: Factory Reset
  kind: action
  params: []
  description: "TX: {\"device\":{\"factory_reset\":true}}"

- id: device_name_set
  label: Set Device Name
  kind: action
  params:
    - name: name
      type: string
  description: "TX: {\"device\":{\"name\":\"value\"}}"

- id: device_location_set
  label: Set Device Location
  kind: action
  params:
    - name: location
      type: string
  description: "TX: {\"device\":{\"location\":\"value\"}}"

- id: device_language_set
  label: Set Device Language
  kind: action
  params:
    - name: language
      type: string
  description: "2-3 letter locale code (e.g. \"en_GB\"). TX: {\"device\":{\"language\":\"en_GB\"}}"

- id: device_standby
  label: Standby Mode
  kind: action
  params: []
  description: "TX: {\"device\":{\"standby\":true}}  # wake via WakeOnLAN"

- id: device_restart
  label: Restart Device
  kind: action
  params: []
  description: "TX: {\"device\":{\"restart\":true}}"

- id: device_restore
  label: Restore Defaults
  kind: action
  params:
    - name: mode
      type: enum
      values: [FACTORY_DEFAULTS, AUDIO_DEFAULTS]
  description: "TX: {\"device\":{\"restore\":\"FACTORY_DEFAULTS\"}}"

# Receiver-specific (SL Rack Receiver DW, SL MCR DW)
- id: rx_pair
  label: Pair Mode
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number (1-based)"
    - name: enable
      type: boolean
  description: "TX: {\"rx1\":{\"pair\":true}}"

- id: rx_identify
  label: Identify Receiver
  kind: action
  params:
    - name: channel
      type: integer
    - name: enable
      type: boolean
  description: "TX: {\"rx1\":{\"identify\":true}}"

- id: rx_walktest
  label: Walk Test Mode
  kind: action
  params:
    - name: channel
      type: integer
    - name: enable
      type: boolean
  description: "TX: {\"rx1\":{\"walktest\":true}}"

- id: rx_autolock_set
  label: Set Auto-Lock
  kind: action
  params:
    - name: channel
      type: integer
    - name: enable
      type: boolean
  description: "TX: {\"rx1\":{\"autolock\":true}}"

- id: rx_mute_mode_set
  label: Set Mute Mode
  kind: action
  params:
    - name: channel
      type: integer
    - name: mode
      type: enum
      values: [0, 1, 2, 3, 4]
      description: "0=Deactivated, 1=Active, 2=Push to Talk, 3=Push to Mute, 4=Location Based Mute"
  description: "TX: {\"rx1\":{\"mute_mode\":2}}"

- id: rx_mute_state_set
  label: Set Mute State
  kind: action
  params:
    - name: channel
      type: integer
    - name: muted
      type: boolean
  description: "TX: {\"rx1\":{\"mute_state\":true}}"

- id: rx_update_confirmation
  label: Transmitter Update Confirmation
  kind: action
  params:
    - name: channel
      type: integer
    - name: confirm
      type: boolean
  description: "Approve/reject firmware update. TX: {\"rx1\":{\"update\":{\"confirmation\":true}}}"

# Audio (SL Rack Receiver DW, SL MCR DW)
- id: audio_gain_db_set
  label: Set Output Gain
  kind: action
  params:
    - name: output
      type: string
      description: "out1 or channel identifier"
    - name: value
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6]
      description: "0=-24dB, 1=-18dB, 2=-12dB, 3=-6dB, 4=0dB, 5=6dB, 6=12dB"
  description: "TX: {\"audio\":{\"out1\":{\"gain_db\":5}}}"

- id: audio_equalizer_preset_set
  label: Set Equalizer Preset
  kind: action
  params:
    - name: preset
      type: enum
      values: [0, 1, 2, 3, 4]
      description: "0=Off, 1=Female Speech, 2=Male Speech, 3=Media, 4=Custom"
  description: "TX: {\"audio\":{\"equalizer\":{\"preset\":0}}}"

- id: audio_low_cut_set
  label: Set Low Cut
  kind: action
  params:
    - name: enabled
      type: boolean
  description: "TX: {\"audio\":{\"low_cut\":true}}"

- id: audio_effects_reset
  label: Reset Audio Effects
  kind: action
  params: []
  description: "TX: {\"audio\":{\"effects_reset\":true}}"

# Multi-Channel Receiver DW audio channel actions
- id: audio_rx_gain_set
  label: Set Channel Gain
  kind: action
  params:
    - name: channel
      type: integer
    - name: gain
      type: integer
      description: "Gain in dB, range [-24..12], increment 6"
  description: "TX: {\"audio\":{\"rx1\":{\"gain\":6}}}"

- id: audio_rx_equalizer_preset_set
  label: Set Channel Equalizer Preset
  kind: action
  params:
    - name: channel
      type: integer
    - name: preset
      type: enum
      values: [OFF, FEMALE_SPEECH, MALE_SPEECH, MEDIA, CUSTOM]
  description: "TX: {\"audio\":{\"rx1\":{\"equalizer\":{\"preset\":\"OFF\"}}}}"

- id: audio_rx_low_cut_set
  label: Set Channel Low Cut
  kind: action
  params:
    - name: channel
      type: integer
    - name: enabled
      type: boolean
  description: "TX: {\"audio\":{\"rx1\":{\"low_cut\":false}}}"

- id: audio_rx_restore
  label: Restore Channel Audio Defaults
  kind: action
  params:
    - name: channel
      type: integer
  description: "TX: {\"audio\":{\"rx1\":{\"restore\":true}}}"

# Mates/Transmitter control
- id: mates_power_down
  label: Power Down Transmitter
  kind: action
  params:
    - name: channel
      type: integer
  description: "TX: {\"mates\":{\"tx1\":{\"power_down\":true}}}"

- id: mates_led_active_set
  label: Set Transmitter LED
  kind: action
  params:
    - name: channel
      type: integer
    - name: active
      type: boolean
  description: "TX: {\"mates\":{\"tx1\":{\"led_active\":true}}}"

- id: mates_power_lock_set
  label: Set Power Button Lock
  kind: action
  params:
    - name: channel
      type: integer
    - name: locked
      type: boolean
  description: "TX: {\"mates\":{\"tx1\":{\"power_lock\":true}}}"

- id: mates_pairing_lock_set
  label: Set Pairing Button Lock
  kind: action
  params:
    - name: channel
      type: integer
    - name: locked
      type: boolean
  description: "TX: {\"mates\":{\"tx1\":{\"pairing_lock\":true}}}"

- id: mates_auto_power_off_set
  label: Set Auto Power Off
  kind: action
  params:
    - name: channel
      type: integer
    - name: mode
      type: enum
      values: [OFF, 10MIN, 20MIN, 30MIN]
  description: "TX: {\"mates\":{\"tx1\":{\"auto_power_off\":\"10MIN\"}}}"

- id: mates_agc_set
  label: Set AGC Mode
  kind: action
  params:
    - name: channel
      type: integer
    - name: mode
      type: enum
      values: [AUTOMATIC, LEVEL1_0DB, LEVEL2_6DB, LEVEL3_12DB, LEVEL4_18DB, LEVEL5_24DB, LEVEL6_30DB]
  description: "TX: {\"mates\":{\"tx1\":{\"agc\":\"AUTOMATIC\"}}}"

# Charger (CHG 2N/4N) actions
- id: bays_identify
  label: Identify Bays
  kind: action
  params:
    - name: bay
      type: array
      description: "Boolean array for each bay"
  description: "TX: {\"bays\":{\"identify\":[true,false]}}"

# Display brightness
- id: brightness_set
  label: Set Display Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 percentage"
  description: "TX: {\"brightness\":100}"

# Additional documented SSC actions
- id: osc_xid
  label: Set Transaction Identifier
  kind: action
  params:
    - name: value
      type: UNRESOLVED
      description: "Argument type and range: UNRESOLVED. The supplied parameters are reflected back in the Method Reply."
  description: "SSC method /osc/xid. TX: {\"osc\":{\"xid\":1234567890},\"brightness\":null}"

- id: osc_ping
  label: Ping Server
  kind: action
  params: []
  description: "Used by a SSC client to ensure that the connection to the SSC server is maintained. TX: {\"osc\":{\"ping\":null}}"

- id: osc_state_subscribe
  label: Subscribe To Value Changes
  kind: action
  params:
    - name: subscriptions
      type: array
      description: "SSC Address Trees or address patterns. Optional termination parameters in the # object: cancel true cancels the subscription (default false); count maximum number of notifications to send, default 1000; lifetime maximum lifetime (s) of the subscription, default 10s. Count and lifetime ranges: UNRESOLVED."
  description: "SSC method /osc/state/subscribe. TX: {\"osc\":{\"xid\":1234567890,\"state\":{\"subscribe\":[{\"brightness\":null}]}}}"

- id: osc_state_close
  label: Close Connection
  kind: action
  params: []
  description: "The server closes the connection immediately after sending the reply. TX: {\"osc\":{\"state\":{\"close\":true}}}"

- id: osc_state_prettyprint_set
  label: Set Pretty Print
  kind: action
  params:
    - name: enabled
      type: boolean
      description: "prettyprint = false: compact representation, no whitespace; prettyprint = true: formatted by adding whitespace"
  description: "TX: {\"osc\":{\"state\":{\"prettyprint\":true}}}"

- id: device_group_set
  label: Set Device Group
  kind: action
  params:
    - name: group
      type: string
      description: "A reduced charset is supported: '0'-'9', '-', '_', 'A'-'Z' and 'a'-'z'. A group name SHOULD start only with a letter. A group name MAY end with a letter or a number. A group name SHOULD NOT start or end with a '-' (dash) or '_' (underscore). A group name MAY be up to 8 characters."
  description: "TX: {\"device\":{\"group\":\"room\"}}"

- id: network_ipv4_auto_set
  label: Set Automatic IPv4 Configuration
  kind: action
  params:
    - name: auto
      type: array
      description: "A list of boolean values that indicates whether IPv4 shall be configured automatically by means of DHCP and ZeroConf (Auto-IP). Array length: UNRESOLVED."
  description: "SSC method /device/network/ipv4/auto. A value change takes effect after device reset; false selects the fixed IPv4 configuration during initialization at start-up."

- id: network_mdns_responder_set
  label: Set MDNS Responder
  kind: action
  params:
    - name: enabled
      type: boolean
  description: "SSC method /device/network/mdns_responder. Method to retrieve/modify the setting to enable/disable mDNS."

- id: device_update_confirmation
  label: Confirm Rack Transmitter Update
  kind: action
  params:
    - name: confirm
      type: boolean
  description: "The sRX1 must be in transmitter update confirmation state. TX: {\"device\":{\"update\":{\"confirmation\":true}}}"

- id: rx_mute_switch_active_set
  label: Set Mute Switch Functionality
  kind: action
  params:
    - name: channel
      type: integer
      description: "SL Rack Receiver DW: rx1."
    - name: enabled
      type: boolean
  description: "Enable/disable the mute switch functionality on the transmitter, if a mute switch is available. TX: {\"rx1\":{\"mute_switch_active\":false}}"

- id: device_dante_name_set
  label: Set Dante Device Name
  kind: action
  params:
    - name: name
      type: string
      description: "The Dante name MAY be up to 16 characters long."
  description: "SSC method /device/dante/name. User-settable Dante Network name for identification."

- id: device_identification_visual
  label: Identify Device Visually
  kind: action
  params: []
  description: "The SL MCR DW should not be in UPDATE state. TX: {\"device\":{\"identification\":{\"visual\":true}}}"

- id: device_led_brightness_set
  label: Set LED Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "The parameter value must an integer value in the range [0..5]"
  description: "TX: {\"device\":{\"led\":{\"brightness\":5}}}"

- id: device_update_enable
  label: Start Device Firmware Update
  kind: action
  params: []
  description: "Device not already performing a firmware update and update package already uploaded on the directory. TX: {\"device\":{\"update\":{\"enable\":true}}}"

- id: device_time_set
  label: Set Device Time
  kind: action
  params:
    - name: time
      type: integer
      description: "The value represents the seconds elapsed since January 1, 2000. Range: UNRESOLVED."
  description: "TX: {\"device\":{\"time\":657200038}}"

- id: rx_identification_visual
  label: Identify Channel Visually
  kind: action
  params:
    - name: channel
      type: integer
      description: "rx1 or rx2 for channel 1 or 2 of the 2-channel variant SL MCR 2 DW; rx1, rx2, rx3 or rx4 for channel 1, 2, 3 or 4 of the 4-channel variant SL MCR 4 DW"
  description: "The SLMCRDW should not be in pairing or walk-test mode. TX: {\"rx1\":{\"identification\":{\"visual\":true}}}"

- id: rx_pair_enable
  label: Set Channel Pair Mode
  kind: action
  params:
    - name: channel
      type: integer
      description: "rx1 or rx2 for channel 1 or 2 of the 2-channel variant SL MCR 2 DW; rx1, rx2, rx3 or rx4 for channel 1, 2, 3 or 4 of the 4-channel variant SL MCR 4 DW"
    - name: enable
      type: boolean
  description: "The channel should not be in WALKTEST state nor in identify mode. TX: {\"rx1\":{\"pair\":{\"enable\":true}}}"

- id: mates_pairing_button_lock_set
  label: Set Multi-Channel Transmitter Pairing Button Lock
  kind: action
  params:
    - name: channel
      type: integer
      description: "tx1 or tx2 for the transmitter paired with channel 1 or 2 of the 2-channel variant SL MCR 2 DW; tx1, tx2, tx3 or tx4 for the transmitter paired with channel 1, 2, 3 or 4 of the 4-channel variant SL MCR 4 DW"
    - name: locked
      type: boolean
  description: "SSC method /mates/tx1/pairing_button_lock. Method to disable the pairing button on the transmitter."

- id: audio_out2_network_ipv4_auto_set
  label: Set Automatic Dante IPv4 Configuration
  kind: action
  params:
    - name: auto
      type: array
      description: "Boolean values for the DANTE Ethernet interfaces; false requires manual IP configuration, true reactivates DHCP. Changing the setting for one interface while maintaining the current setting for the other interface is possible with the value 'null'."
  description: "The device is immediately restarted so that after restart the new settings are used. TX: {\"audio\":{\"out2\":{\"network\":{\"ipv4\":{\"auto\":[true, null]}}}}}"

- id: audio_out2_network_ipv4_manual_ipaddr_set
  label: Set Manual Dante IPv4 Addresses
  kind: action
  params:
    - name: ipaddr
      type: array
      description: "Manual IPv4 addresses for the DANTE Ethernet interfaces. Address constraints: UNRESOLVED."
  description: "TX: {\"audio\":{\"out2\":{\"network\":{\"ipv4\":{\"manual_ipaddr\":[\"192.168.2.101\", \"192.168.2.201\"]}}}}}"

- id: audio_out2_network_ipv4_manual_netmask_set
  label: Set Manual Dante IPv4 Netmasks
  kind: action
  params:
    - name: netmask
      type: array
      description: "Manual IPv4 netmasks for the DANTE Ethernet interfaces. Netmask constraints: UNRESOLVED."
  description: "TX: {\"audio\":{\"out2\":{\"network\":{\"ipv4\":{\"manual_netmask\": [\"255.255.0.0\",\"255.255.0.0\"]}}}}}"

- id: audio_out2_network_ipv4_manual_gateway_set
  label: Set Manual Dante IPv4 Gateways
  kind: action
  params:
    - name: gateway
      type: array
      description: "Manual IPv4 gateways for the DANTE Ethernet interfaces. Address constraints: UNRESOLVED."
  description: "TX: {\"audio\":{\"out2\":{\"network\":{\"ipv4\":{\"manual_gateway\": [\"192.168.2.1\",\"192.168.2.2\"]}}}}}"

- id: audio_dante_mixer_gain_set
  label: Set Dante Output Gain
  kind: action
  params:
    - name: gain
      type: integer
      description: "The parameter value must be inside the index range [-24..12] with an incremental value of 6."
  description: "SSC method /audio/dante/mixer/gain. Method to set the gain for the DANTE output in dB."
```

## Feedbacks
```yaml
# Device identity and state
- id: interface_version
  type: string
  description: "SSC interface version. TX: {\"interface\":{\"version\":null}}"
  query_command: '{"interface":{"version":null}}'

- id: osc_version
  type: string
  description: "OSC version. TX: {\"osc\":{\"version\":null}}"
  query_command: '{"osc":{"version":null}}'

- id: device_name
  type: string
  description: "Device name. TX: {\"device\":{\"name\":null}}"
  query_command: '{"device":{"name":null}}'

- id: device_location
  type: string
  description: "Device location. TX: {\"device\":{\"location\":null}}"
  query_command: '{"device":{"location":null}}'

- id: device_language
  type: string
  description: "Device language code. TX: {\"device\":{\"language\":null}}"
  query_command: '{"device":{"language":null}}'

- id: device_group
  type: string
  description: "Device group name. TX: {\"device\":{\"group\":null}}"
  query_command: '{"device":{"group":null}}'

- id: device_state
  type: enum
  values: [NORMAL, UPDATE, UPDATE_FAILED, ERROR]
  description: "For SL MCR DW: NORMAL, UPDATE, UPDATE_FAILED, ERROR. TX: {\"device\":{\"state\":null}}"
  query_command: '{"device":{"state":null}}'

- id: device_state_rack
  type: enum
  values: [0, 1, 2, 3, 4, 5]
  description: "For SL Rack Receiver DW: 0=Normal, 1=Pairing, 2=Receiver Update, 3=Transmitter Update, 4=Transmitter Update Confirmation, 5=Transmitter Update Failed"
  query_command: '{"device":{"state":null}}'

- id: device_warnings
  type: string
  description: "Device warnings. TX: {\"device\":{\"warnings\":null}}"
  query_command: '{"device":{"warnings":null}}'

- id: device_identity_product
  type: string
  description: "Product name. TX: {\"device\":{\"identity\":{\"product\":null}}}"
  query_command: '{"device":{"identity":{"product":null}}}'

- id: device_identity_version
  type: string
  description: "Firmware version. TX: {\"device\":{\"identity\":{\"version\":null}}}"
  query_command: '{"device":{"identity":{"version":null}}}'

- id: device_identity_serial
  type: string
  description: "Serial number. TX: {\"device\":{\"identity\":{\"serial\":null}}}"
  query_command: '{"device":{"identity":{"serial":null}}}'

- id: device_identity_vendor
  type: string
  description: "Vendor name. TX: {\"device\":{\"identity\":{\"vendor\":null}}}"
  query_command: '{"device":{"identity":{"vendor":null}}}'

- id: device_progress
  type: integer
  description: "Update progress 0-100. TX: {\"device\":{\"progress\":null}}"
  query_command: '{"device":{"progress":null}}'

# Network
- id: network_ipv4_interfaces
  type: array
  description: "IPv4 interface indices. TX: {\"device\":{\"network\":{\"ipv4\":{\"interfaces\":null}}}}"
  query_command: '{"device":{"network":{"ipv4":{"interfaces":null}}}}'

- id: network_ipv4_auto
  type: array
  description: "DHCP/auto-IP enabled booleans. TX: {\"device\":{\"network\":{\"ipv4\":{\"auto\":null}}}}"
  query_command: '{"device":{"network":{"ipv4":{"auto":null}}}}'

- id: network_ipv4_ipaddr
  type: array
  description: "IPv4 addresses. TX: {\"device\":{\"network\":{\"ipv4\":{\"ipaddr\":null}}}}"
  query_command: '{"device":{"network":{"ipv4":{"ipaddr":null}}}}'

- id: network_ipv4_netmask
  type: array
  description: "IPv4 netmasks. TX: {\"device\":{\"network\":{\"ipv4\":{\"netmask\":null}}}}"
  query_command: '{"device":{"network":{"ipv4":{"netmask":null}}}}'

- id: network_ipv4_gateway
  type: array
  description: "IPv4 gateways. TX: {\"device\":{\"network\":{\"ipv4\":{\"gateway\":null}}}}"
  query_command: '{"device":{"network":{"ipv4":{"gateway":null}}}}'

- id: network_ipv6_interfaces
  type: array
  description: "IPv6 interface indices. TX: {\"device\":{\"network\":{\"ipv6\":{\"interfaces\":null}}}}"
  query_command: '{"device":{"network":{"ipv6":{"interfaces":null}}}}'

- id: network_ipv6_ipaddr
  type: array
  description: "IPv6 addresses. TX: {\"device\":{\"network\":{\"ipv6\":{\"ipaddr\":null}}}}"
  query_command: '{"device":{"network":{"ipv6":{"ipaddr":null}}}}'

- id: network_ether_interfaces
  type: array
  description: "Ethernet interface names. TX: {\"device\":{\"network\":{\"ether\":{\"interfaces\":null}}}}"
  query_command: '{"device":{"network":{"ether":{"interfaces":null}}}}'

- id: network_ether_macs
  type: array
  description: "MAC addresses. TX: {\"device\":{\"network\":{\"ether\":{\"macs\":null}}}}"
  query_command: '{"device":{"network":{"ether":{"macs":null}}}}'

- id: network_mdns_responder
  type: boolean
  description: "mDNS enabled. TX: {\"device\":{\"network\":{\"mdns_responder\":null}}}"
  query_command: '{"device":{"network":{"mdns_responder":null}}}'

# Receiver feedbacks
- id: rx_rf_quality
  type: integer
  description: "RF quality percentage. TX: {\"rx1\":{\"rf_quality\":null}}"
  query_command: '{"rx1":{"rf_quality":null}}'

- id: rx_sync_info
  type: enum
  values: [NOT_SYNCED, MASTER, FOLLOWER, UNSYNCED_FOLLOWER]
  description: "Master/follower sync info. TX: {\"rx1\":{\"sync_info\":null}}"
  query_command: '{"rx1":{"master_follower":{"sync_info":null}}}'

- id: rx_sync_info_rack
  type: enum
  values: [0, 1, 2, 3]
  description: "For SL Rack Receiver DW: 0=Unknown, 1=Master, 2=Follower, 3=Unsync'd Follower"
  query_command: '{"rx1":{"sync_info":null}}'

- id: rx_rfpi
  type: string
  description: "RFPI identifier. TX: {\"rx1\":{\"rfpi\":null}}"
  query_command: '{"rx1":{"rfpi":null}}'

- id: rx_last_paired_ipei
  type: string
  description: "Last paired IPEI. TX: {\"rx1\":{\"last_paired_ipei\":null}}"
  query_command: '{"rx1":{"last_paired_ipei":null}}'

- id: rx_autolock
  type: boolean
  description: "Auto-lock state. TX: {\"rx1\":{\"autolock\":null}}"
  query_command: '{"rx1":{"autolock":null}}'

- id: rx_warnings
  type: array
  description: "Receiver warnings. TX: {\"rx1\":{\"warnings\":null}}"
  query_command: '{"rx1":{"warnings":null}}'

- id: rx_mute_switch_active
  type: boolean
  description: "Mute switch enabled. TX: {\"rx1\":{\"mute_switch_active\":null}}"
  query_command: '{"rx1":{"mute_switch_active":null}}'

- id: rx_mute_mode
  type: enum
  values: [OFF, ON, PUSH_TO_TALK, PUSH_TO_MUTE, ROOM_MUTE]
  description: "Mute mode. TX: {\"rx1\":{\"mute_mode\":null}}"
  query_command: '{"rx1":{"mute_mode":null}}'

- id: rx_mute_state
  type: boolean
  description: "Mute state. TX: {\"rx1\":{\"mute_state\":null}}"
  query_command: '{"rx1":{"mute_state":null}}'

- id: rx_state
  type: enum
  values: [NOT_CONNECTED, CONNECTED, PAIRING, FWU_OTA, FWU_OTA_CONFIRMATION, TRANSMITTER_UPDATE_FAILED, WALKTEST]
  description: "Channel state. TX: {\"rx1\":{\"state\":null}}"
  query_command: '{"rx1":{"state":null}}'

- id: rx_mates
  type: array
  description: "Active transmitters. TX: {\"rx1\":{\"mates\":null}}"
  query_command: '{"rx1":{"mates":null}}'

- id: rx_name
  type: string
  description: "Channel name. TX: {\"rx1\":{\"name\":null}}"
  query_command: '{"rx1":{"name":null}}'

- id: rx_pair_progress
  type: integer
  description: "Pairing countdown (seconds from 120). TX: {\"rx1\":{\"pair\":{\"progress\":null}}}"
  query_command: '{"rx1":{"pair":{"progress":null}}}'

# Audio feedbacks
- id: audio_out1_label
  type: array
  description: "Output label. TX: {\"audio\":{\"out1\":{\"label\":null}}}"
  query_command: '{"audio":{"out1":{"label":null}}}'

- id: audio_out1_level_db
  type: integer
  description: "Output level in dB, range [-60..0]. TX: {\"audio\":{\"out1\":{\"level_db\":null}}}"
  query_command: '{"audio":{"out1":{"level_db":null}}}'

- id: audio_out1_gain_db
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  description: "Output gain. TX: {\"audio\":{\"out1\":{\"gain_db\":null}}}"
  query_command: '{ "audio": { "out1": { "gain_db": null }}}'

- id: audio_equalizer_preset
  type: enum
  values: [0, 1, 2, 3, 4]
  description: "EQ preset. TX: {\"audio\":{\"equalizer\":{\"preset\":null}}}"
  query_command: '{"audio":{"equalizer":{"preset":null}}}'

- id: audio_low_cut
  type: boolean
  description: "Low cut enabled. TX: {\"audio\":{\"low_cut\":null}}"
  query_command: '{"audio":{"low_cut":null}}'

# Multi-Channel Receiver audio
- id: audio_rx_gain
  type: integer
  description: "Channel gain in dB, range [-24..12]. TX: {\"audio\":{\"rx1\":{\"gain\":null}}}"
  query_command: '{"audio":{"rx1":{"gain":null}}}'

- id: audio_rx_equalizer_preset
  type: enum
  values: [OFF, FEMALE_SPEECH, MALE_SPEECH, MEDIA, CUSTOM]
  description: "Channel EQ preset. TX: {\"audio\":{\"rx1\":{\"equalizer\":{\"preset\":null}}}}"
  query_command: '{"audio":{"rx1":{"equalizer":{"preset":null}}}}'

- id: audio_rx_low_cut
  type: boolean
  description: "Channel low cut. TX: {\"audio\":{\"rx1\":{\"low_cut\":null}}}"
  query_command: '{"audio":{"rx1":{"low_cut":null}}}'

- id: audio_out_desc
  type: string
  description: "Output description. TX: {\"audio\":{\"out1\":{\"desc\":null}}}"
  query_command: '{"audio":{"out1":{"desc":null}}}'

- id: audio_mixer_level
  type: integer
  description: "Mixed audio level, range [-60..0]. TX: {\"m\":{\"mixer\":{\"level\":null}}}"
  query_command: '{"m":{"mixer":{"level":null}}}'

- id: audio_rx_level
  type: integer
  description: "Channel audio level, range [-60..0]. TX: {\"m\":{\"rx1\":{\"level\":null}}}"
  query_command: '{"m":{"rx1":{"level":null}}}'

- id: audio_rx_channel_level
  type: integer
  description: "Post-gain stage level, range [-60..0]. TX: {\"m\":{\"rx1\":{\"channel_level\":null}}}"
  query_command: '{"m":{"rx1":{"channel_level":null}}}'

# Dante audio (SL MCR DW)
- id: audio_dante_mixer_gain
  type: integer
  description: "Dante output gain in dB, range [-24..12], inc 6. TX: {\"audio\":{\"dante\":{\"mixer\":{\"gain\":null}}}}"
  query_command: '{"audio":{"dante":{"mixer":{"gain":null}}}}'

- id: audio_out2_identity_version
  type: string
  description: "Dante output version. TX: {\"audio\":{\"out2\":{\"identity\":{\"version\":null}}}}"
  query_command: '{"audio":{"out2":{"identity":{"version":null}}}}'

- id: audio_out2_network_ether_interfaces
  type: array
  description: "Dante ethernet interfaces. TX: {\"audio\":{\"out2\":{\"network\":{\"ether\":{\"interfaces\":null}}}}}"
  query_command: '{"audio":{"out2":{"network":{"ether":{"interfaces":null}}}}}'

- id: audio_out2_network_ipv4_auto
  type: array
  description: "Dante IPv4 auto config. TX: {\"audio\":{\"out2\":{\"network\":{\"ipv4\":{\"auto\":null}}}}}"
  query_command: '{"audio":{"out2":{"network":{"ipv4":{"auto":null}}}}}'

# Mate/transmitter feedbacks
- id: mates_active
  type: array
  description: "Active transmitters. TX: {\"mates\":{\"active\":null}}"
  query_command: '{"mates":{"active":null}}'

- id: mates_tx1_active
  type: boolean
  description: "TX1 active. TX: {\"mates\":{\"tx1\":{\"active\":null}}}"
  query_command: '{"mates":{"tx1":{"active":null}}}'

- id: mates_tx1_device_type
  type: enum
  values: [HANDHELD, BODYPACK, TABLE-STAND, BOUNDARY]
  description: "Transmitter type. TX: {\"mates\":{\"tx1\":{\"device_type\":null}}}"
  query_command: '{"mates":{"tx1":{"device_type":null}}}'

- id: mates_tx1_device_type_rack
  type: enum
  values: [0, 1, 2, 3]
  description: "For SL Rack Receiver DW: 0=Handheld, 1=Bodypack, 2=Tablestand, 3=Boundary"
  query_command: '{"mates":{"tx1":{"device_type":null}}}'

- id: mates_tx1_bat_type
  type: enum
  values: [BATTERY, RECHARGEABLE]
  description: "Battery type. TX: {\"mates\":{\"tx1\":{\"bat_type\":null}}}"
  query_command: '{"mates":{"tx1":{"bat_type":null}}}'

- id: mates_tx1_bat_state
  type: string
  description: "Battery state (returns bat_gauge or bat_lifetime). TX: {\"mates\":{\"tx1\":{\"bat_state\":null}}}"
  query_command: '{"mates":{"tx1":{"bat_state":null}}}'

- id: mates_tx1_bat_gauge
  type: integer
  description: "Battery capacity percentage. TX: {\"mates\":{\"tx1\":{\"bat_gauge\":null}}}"
  query_command: '{"mates":{"tx1":{"bat_gauge":null}}}'

- id: mates_tx1_bat_lifetime
  type: integer
  description: "Battery lifetime in seconds. TX: {\"mates\":{\"tx1\":{\"bat_lifetime\":null}}}"
  query_command: '{"mates":{"tx1":{"bat_lifetime":null}}}'

- id: mates_tx1_bat_charging
  type: boolean
  description: "Charging status. TX: {\"mates\":{\"tx1\":{\"bat_charging\":null}}}"
  query_command: '{"mates":{"tx1":{"bat_charging":null}}}'

- id: mates_tx1_bat_bars
  type: integer
  description: "Battery bar count. TX: {\"mates\":{\"tx1\":{\"bat_bars\":null}}}"
  query_command: '{"mates":{"tx1":{"bat_bars":null}}}'

- id: mates_tx1_bat_health
  type: integer
  description: "Battery health percentage. TX: {\"mates\":{\"tx1\":{\"bat_health\":null}}}"
  query_command: '{"mates":{"tx1":{"bat_health":null}}}'

- id: mates_tx1_bat_cycles
  type: integer
  description: "Battery cycle count. TX: {\"mates\":{\"tx1\":{\"bat_cycles\":null}}}"
  query_command: '{"mates":{"tx1":{"bat_cycles":null}}}'

- id: mates_tx1_acoustic
  type: string
  description: "Acoustic input type. TX: {\"mates\":{\"tx1\":{\"acoustic\":null}}}"
  query_command: '{"mates":{"tx1":{"acoustic":null}}}'

- id: mates_tx1_warnings
  type: array
  description: "Transmitter warnings. TX: {\"mates\":{\"tx1\":{\"warnings\":null}}}"
  query_command: '{"mates":{"tx1":{"warnings":null}}}'

- id: mates_tx1_gooseneck_state
  type: boolean
  description: "Gooseneck attached. TX: {\"mates\":{\"tx1\":{\"gooseneck_state\":null}}}"
  query_command: '{"mates":{"tx1":{"gooseneck_state":null}}}'

- id: mates_tx1_agc
  type: enum
  values: [AUTOMATIC, LEVEL1_0DB, LEVEL2_6DB, LEVEL3_12DB, LEVEL4_18DB, LEVEL5_24DB, LEVEL6_30DB]
  description: "AGC mode. TX: {\"mates\":{\"tx1\":{\"agc\":null}}}"
  query_command: '{"mates":{"tx1":{"agc":null}}}'

- id: mates_tx1_power_lock
  type: boolean
  description: "Power lock. TX: {\"mates\":{\"tx1\":{\"power_lock\":null}}}"
  query_command: '{"mates":{"tx1":{"power_lock":null}}}'

- id: mates_tx1_power_down
  type: boolean
  description: "Power down status. TX: {\"mates\":{\"tx1\":{\"power_down\":null}}}"
  query_command: '{"mates":{"tx1":{"power_down":null}}}'

- id: mates_tx1_pairing_lock
  type: boolean
  description: "Pairing lock. TX: {\"mates\":{\"tx1\":{\"pairing_lock\":null}}}"
  query_command: '{"mates":{"tx1":{"pairing_lock":null}}}'

- id: mates_tx1_auto_power_off
  type: enum
  values: [OFF, 10MIN, 20MIN, 30MIN]
  description: "Auto power off setting. TX: {\"mates\":{\"tx1\":{\"auto_power_off\":null}}}"
  query_command: '{"mates":{"tx1":{"auto_power_off":null}}}'

- id: mates_tx1_led_active
  type: boolean
  description: "LED active. TX: {\"mates\":{\"tx1\":{\"led_active\":null}}}"
  query_command: '{"mates":{"tx1":{"led_active":null}}}'

- id: mates_tx1_switch1_label
  type: string
  description: "Switch label. TX: {\"mates\":{\"tx1\":{\"switch1\":{\"label\":null}}}}"
  query_command: '{"mates":{"tx1":{"switch1":{"label":null}}}}'

- id: mates_tx1_switch1_state
  type: boolean
  description: "Switch state. TX: {\"mates\":{\"tx1\":{\"switch1\":{\"state\":null}}}}"
  query_command: '{"mates":{"tx1":{"switch1":{"state":null}}}}'

# Charger (CHG 2N/4N) feedbacks
- id: bays_active
  type: array
  description: "Bay active status. TX: {\"bays\":{\"active\":null}}"
  query_command: '{"bays":{"active":null}}'

- id: bays_device_type
  type: array
  description: "Bay device types. TX: {\"bays\":{\"device_type\":null}}"
  query_command: '{"bays":{"device_type":null}}'

- id: bays_serial
  type: array
  description: "Bay device serials. TX: {\"bays\":{\"serial\":null}}"
  query_command: '{"bays":{"serial":null}}'

- id: bays_version
  type: array
  description: "Bay device firmware versions. TX: {\"bays\":{\"version\":null}}"
  query_command: '{"bays":{"version":null}}'

- id: bays_linkdate
  type: array
  description: "Bay link timestamps. TX: {\"bays\":{\"linkdate\":null}}"
  query_command: '{"bays":{"linkdate":null}}'

- id: bays_charging
  type: array
  description: "Bay charging status. TX: {\"bays\":{\"charging\":null}}"
  query_command: '{"bays":{"charging":null}}'

- id: bays_bat_gauge
  type: array
  description: "Bay battery gauges. TX: {\"bays\":{\"bat_gauge\":null}}"
  query_command: '{"bays":{"bat_gauge":null}}'

- id: bays_bat_timetofull
  type: array
  description: "Bay time to full charge. TX: {\"bays\":{\"bat_timetofull\":null}}"
  query_command: '{"bays":{"bat_timetofull":null}}'

- id: bays_bat_bars
  type: array
  description: "Bay battery bars. TX: {\"bays\":{\"bat_bars\":null}}"
  query_command: '{"bays":{"bat_bars":null}}'

- id: bays_bat_health
  type: array
  description: "Bay battery health. TX: {\"bays\":{\"bat_health\":null}}"
  query_command: '{"bays":{"bat_health":null}}'

- id: bays_bat_cycles
  type: array
  description: "Bay battery cycles. TX: {\"bays\":{\"bat_cycles\":null}}"
  query_command: '{"bays":{"bat_cycles":null}}'

- id: bays_state
  type: array
  description: "Bay state arrays [[states],[errors]]. TX: {\"bays\":{\"state\":null}}"
  query_command: '{"bays":{"state":null}}'

- id: device_ptxversion_sl
  type: string
  description: "SpeechLine firmware version. TX: {\"device\":{\"ptxversion_sl\":null}}"
  query_command: '{"device":{"ptxversion_sl":null}}'

- id: device_ptxversion_d1
  type: string
  description: "EWD1 firmware version. TX: {\"device\":{\"ptxversion_d1\":null}}"
  query_command: '{"device":{"ptxversion_d1":null}}'

# Display
- id: brightness
  type: integer
  description: "Display brightness 0-100. TX: {\"brightness\":null}"
  query_command: '{"brightness":null}'

- id: device_led_brightness
  type: integer
  description: "LED brightness 0-5. TX: {\"device\":{\"led\":{\"brightness\":null}}}"
  query_command: '{"device":{"led":{"brightness":null}}}'

# Time
- id: device_date
  type: string
  description: "Device date string. TX: {\"device\":{\"date\":null}}"
  query_command: '{"device":{"date":null}}'

- id: device_time
  type: integer
  description: "Seconds since Jan 1 2000. TX: {\"device\":{\"time\":null}}"
  query_command: '{"device":{"time":null}}'

- id: device_timeprecision
  type: integer
  description: "Time precision in seconds. TX: {\"device\":{\"timeprecision\":null}}"
  query_command: '{"device":{"timeprecision":null}}'

# Additional documented SSC feedbacks
- id: osc_error
  type: array
  description: "SSC method /osc/error. Read-only method normally returned by the server in reply to a faulty SSC Method Call. An explicit query transaction is not documented."

- id: osc_schema
  type: array
  description: "Available address schemes. A null argument queries the root; an array of SSC Address Trees can query selected containers. TX: {\"osc\":{\"schema\":null}}"
  query_command: '{"osc":{"schema":null}}'

- id: osc_limits
  type: array
  description: "Accepted argument values and ranges for the supplied SSC Address Trees. Optional properties: type, min, max, inc, units, desc, option, option_desc. TX: {\"osc\":{\"limits\":[{\"brightness\":null}]}}"
  query_command: '{"osc":{"limits":[{"brightness":null}]}}'

- id: osc_feature_pattern
  type: UNRESOLVED
  description: "Address pattern matching support. The source returns the string *? for SL Rack Receiver DW and CHG 2N/4N, and boolean false for SL MCR DW. TX: {\"osc\":{\"feature\":{\"pattern\":null}}}"
  query_command: '{"osc":{"feature":{"pattern":null}}}'

- id: osc_feature_baseaddr
  type: boolean
  description: "Base address support. TX: {\"osc\":{\"feature\":{\"baseaddr\":null}}}"
  query_command: '{"osc":{"feature":{"baseaddr":null}}}'

- id: osc_feature_subscription
  type: boolean
  description: "SSC subscription support. TX: {\"osc\":{\"feature\":{\"subscription\":null}}}"
  query_command: '{"osc":{"feature":{"subscription":null}}}'

- id: osc_feature_timetag
  type: boolean
  description: "Timed method execution support. TX: {\"osc\":{\"feature\":{\"timetag\":null}}}"
  query_command: '{"osc":{"feature":{"timetag":null}}}'

- id: osc_state_prettyprint
  type: boolean
  description: "Reply formatting: false gives compact representation, true adds whitespace. TX: {\"osc\":{\"state\":{\"prettyprint\":null}}}"
  query_command: '{"osc":{"state":{"prettyprint":null}}}'

- id: device_dante_name
  type: string
  description: "Dante Network name for identification. The Dante name MAY be up to 16 characters long. TX: {\"device\":{\"dante\":{\"name\":null}}}"
  query_command: '{"device":{"dante":{"name":null}}}'

- id: device_position
  type: string
  description: "Device position. TX: {\"device\":{\"position\":null}}"
  query_command: '{"device":{"position":null}}'

- id: device_system
  type: string
  description: "Device system. TX: {\"device\":{\"system\":null}}"
  query_command: '{"device":{"system":null}}'

- id: network_interface_mapping
  type: enum
  values: [CONFIG1, CONFIG2, CONFIG3]
  description: "CONFIG1 Single cable mode (Factory default); CONFIG2 Audio redundancy mode; CONFIG3 Split mode. TX: {\"device\":{\"network\":{\"interface_mapping\":null}}}"
  query_command: '{"device":{"network":{"interface_mapping":null}}}'

- id: network_mdns
  type: boolean
  description: "SL MCR DW /device/network/mdns. The source transaction spells the JSON property with a trailing space. TX: {\"device\":{\"network\":{\"mdns \":null}}}"
  query_command: '{"device":{"network":{"mdns ":null}}}'

- id: device_update_progress
  type: integer
  description: "SL MCR DW device update progress in percent; device must be in UPDATE state. Range: UNRESOLVED. TX: {\"device\":{\"update\":{\"progress\":null}}}"
  query_command: '{"device":{"update":{"progress":null}}}'

- id: rx_update_progress
  type: integer
  description: "Transmitter update progress in percent for the selected SL MCR DW channel; channel must be in FWU_OTA state. Replace rx1 with the desired channel name. Range: UNRESOLVED. TX: {\"rx1\":{\"update\":{\"progress\":null}}}"
  query_command: '{"rx1":{"update":{"progress":null}}}'

- id: mates_tx1_pairing_button_lock
  type: boolean
  description: "SL MCR DW transmitter pairing button lock. Replace tx1 with the desired transmitter channel name. TX: {\"mates\":{\"tx1\":{\"pairing_button_lock\":null}}}"
  query_command: '{"mates":{"tx1":{"pairing_button_lock":null}}}'

- id: audio_out2_network_ipv4_interfaces
  type: array
  description: "Dante IPv4 interface indices. TX: {\"audio\":{\"out2\":{\"network\":{\"ipv4\":{\"interfaces\":null}}}}}"
  query_command: '{"audio":{"out2":{"network":{"ipv4":{"interfaces":null}}}}}'

- id: audio_out2_network_ether_macs
  type: array
  description: "Dante Ethernet MAC addresses. TX: {\"audio\":{\"out2\":{\"network\":{\"ether\":{\"macs\":null}}}}}"
  query_command: '{"audio":{"out2":{"network":{"ether":{"macs":null}}}}}'

- id: audio_out2_network_ipv4_ipaddr
  type: array
  description: "Dante IPv4 addresses. TX: {\"audio\":{\"out2\":{\"network\":{\"ipv4\":{\"ipaddr\":null}}}}}"
  query_command: '{"audio":{"out2":{"network":{"ipv4":{"ipaddr":null}}}}}'

- id: audio_out2_network_ipv4_netmask
  type: array
  description: "Dante IPv4 netmasks. TX: {\"audio\":{\"out2\":{\"network\":{\"ipv4\":{\"netmask\":null}}}}}"
  query_command: '{"audio":{"out2":{"network":{"ipv4":{"netmask":null}}}}}'

- id: audio_out2_network_ipv4_gateway
  type: array
  description: "Dante IPv4 gateways. TX: {\"audio\":{\"out2\":{\"network\":{\"ipv4\":{\"gateway\":null}}}}}"
  query_command: '{"audio":{"out2":{"network":{"ipv4":{"gateway":null}}}}}'
```

## Variables
```yaml
# Network configuration (writable)
- id: network_ipv4_fixed_ipaddr
  type: array
  description: "Fixed IPv4 addresses. TX: {\"device\":{\"network\":{\"ipv4\":{\"fixed_ipaddr\":[\"x.x.x.x\"]}}}}"

- id: network_ipv4_fixed_netmask
  type: array
  description: "Fixed IPv4 netmasks. TX: {\"device\":{\"network\":{\"ipv4\":{\"fixed_netmask\":[\"x.x.x.x\"]}}}}"

- id: network_ipv4_fixed_gateway
  type: array
  description: "Fixed IPv4 gateways. TX: {\"device\":{\"network\":{\"ipv4\":{\"fixed_gateway\":[\"x.x.x.x\"]}}}}"

- id: network_ipv4_manual_ipaddr
  type: array
  description: "Manual IPv4 addresses (SL MCR DW). TX: {\"device\":{\"network\":{\"ipv4\":{\"manual_ipaddr\":[\"x.x.x.x\"]}}}}"

- id: network_ipv4_manual_netmask
  type: array
  description: "Manual IPv4 netmasks (SL MCR DW)."

- id: network_ipv4_manual_gateway
  type: array
  description: "Manual IPv4 gateways (SL MCR DW)."

- id: audio_out_mixer_gain
  type: integer
  description: "Output mixer gain in dB, range [-24..12], inc 6. TX: {\"audio\":{\"out1\":{\"mixer\":{\"gain\":null}}}}"
```

## Events
```yaml
# UNRESOLVED: device-initiated (unsolicited) events not documented in source.
# SSC subscriptions (client-initiated) are documented but these are server-reported
# value changes triggered by subscriptions, not unsolicited device events.
```

## Macros
```yaml
# UNRESOLVED: explicit multi-step macros not documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- **Protocol:** SSC (Sennheiser Sound Control Protocol) — JSON-encoded OSC over UDP/IP. Not raw OSC; SSC wraps OSC method calls in JSON objects.
- **Discovery:** DNS-SD service type `_ssc._udp` (Bonjour). SSC version announced via TXT record (`version` key).
- **Subscription:** Devices support up to 8 simultaneous SSC client subscriptions. Subscription address `/osc/state/subscribe` with lifetime parameter (default 10s, max unspecified). Server sends initial value snapshot then change notifications until lifetime expires or client cancels.
- **Channel naming:** Methods with `rx1`/`tx1` placeholders apply to all channels — replace with `rx1`, `rx2`, `rx3`, `rx4` (4-channel) or `rx1`, `rx2` (2-channel) and `tx1`, `tx2`, `tx3`, `tx4` for paired transmitters.
- **WakeOnLAN:** Device exits standby via standard WakeOnLAN magic packet.
- **Error codes:** HTTP-style (100, 200, 400, 404, 406, 500, etc.). 310 indicates subscription terminated.
- ** Dante audio (SL MCR DW):** Separate Dante audio interface with its own network configuration accessible via `/audio/out2/...`.
- **CHG 2N/4N:** Chargers report bay status as arrays (2 or 4 elements). Device type codes: 0=Handheld, 1=Bodypack, 2=Tablestand, 3=Boundary.
- **Limited method sets:** SL Rack Receiver DW lacks multi-channel audio methods; CHG 2N/4N lack audio routing and receiver channel methods.
<!-- UNRESOLVED: UDP port 45 is the stated default; actual port discovered via DNS-SD may differ. No explicit mention of TCP support for SSC (only UDP). Authentication: not stated in source. Binary OSC encoding not covered (JSON SSC only). Command timing/latency not specified. -->

## Provenance

```yaml
source_domains:
  - assets.sennheiser.com
source_urls:
  - https://assets.sennheiser.com/download/assets/TI_1094_v4.3_Sennheiser_Sound_Control_Protocol_SL_DW_EN.pdf/b2a3c92ce7bb11f088db768ee8e97aea
  - https://assets.sennheiser.com/download/assets/AN_1260_v1.0_Media_Control_Systems_EN.pdf/d2d66562e7b411f08c892a34179bc91d
  - https://assets.sennheiser.com/download/assets/Sennheiser_SpeechLine_Digital_Wireless.zip/204774aae7c211f0a866ce3d75c40f07
  - https://assets.sennheiser.com/download/assets/Sennheiser_Speechline_Digital_Wireless_-_v2.0.0.qplug/1c4337c2e7c211f0ae307aeaa9c3764a
retrieved_at: 2026-10-07T20:46:28.926Z
last_checked_at: 2026-10-07T20:46:28.926Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:46:28.926Z
matched_actions: 170
action_count: 170
confidence: medium
summary: "All 170 action units (54 actions, 116 queries) have literal TX counterparts in the SSC method lists; UDP port 45 is stated; auth is left UNRESOLVED. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "single-channel SL Rack Receiver DW and multi-channel SL MCR 2/4 DW command sets overlap significantly but differ in channel count and some exclusive methods. CHG 2N/4N chargers share a reduced method set."
- "device-initiated (unsolicited) events not documented in source."
- "explicit multi-step macros not documented in source."
- "no safety warnings or interlock procedures in source"
- "UDP port 45 is the stated default; actual port discovered via DNS-SD may differ. No explicit mention of TCP support for SSC (only UDP). Authentication: not stated in source. Binary OSC encoding not covered (JSON SSC only). Command timing/latency not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
