---
schema_version: ai4av-public-spec-v1
device_id: audio-technica/system-20-pro
entity_id: audio_technica_system_20_pro
spec_id: admin/audio-technica-system-20-pro
revision: 1
author: admin
title: "Audio Technica System 20 PRO Control Spec"
status: published
manufacturer: "Audio Technica"
manufacturer_key: audio-technica
model_family: "System 20 PRO"
aliases: []
compatible_with:
  manufacturers:
    - "Audio Technica"
  models:
    - "System 20 PRO"
    - "ATW-R1440 (receiver)"
    - "ATW-RU14 (receiver unit)"
    - "ATW-RC14 (receiver chassis)"
    - "ATW-T1401 (body pack transmitter)"
    - "ATW-T1402 (handheld microphone transmitter)"
    - "ATW-T1406 (boundary microphone transmitter)"
    - "ATW-T1407 (desk stand transmitter)"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: audio_technica_system_20_pro_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:15:10.686Z
retrieved_at: 2026-04-23T15:15:10.686Z
last_checked_at: 2026-04-23T15:15:10.686Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:15:10.686Z
  matched_actions: 152
  action_count: 152
  confidence: high
  summary: "All 152 spec actions match command mnemonics in source; transport ports verified verbatim; complete coverage of documented command set."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Audio Technica System 20 PRO Control Spec

## Summary
The System 20 PRO is a 2.4 GHz wireless audio system controllable via TCP (commands) and UDP (notifications). The receiver ATW-R1440 exposes a rich command protocol for managing device settings, network configuration, TX pairing, audio processing (EQ, COMP), and status monitoring. No authentication is required.

<!-- UNRESOLVED: power on/off commands not found in source — system may require manual power-on; UNRESOLVED: maximum concurrent TCP connections stated as 1, but connection establishment details not fully documented -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 17200  # TCP control port (fixed)
  udp_port: 17000  # UDP notification port (default, configurable)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable      # inferred: extensive Get commands for all settings
- routable       # inferred: TX pairing and multipairing commands
- levelable      # inferred: volume, gain, EQ, COMP controls present
```

## Actions
```yaml
# Device Management
- id: get_model_name
  label: Model Name Acquisition
  kind: action
  params: []
- id: get_version_info
  label: Version Information Acquisition
  kind: action
  params: []
- id: get_device_name
  label: Device Name Acquisition
  kind: action
  params: []
- id: set_device_name
  label: Device Name Setting
  kind: action
  params:
    - name: name
      type: string
      description: Device name (max 8 ASCII chars, enclose in quotes)
- id: get_device_id
  label: Device ID Acquisition
  kind: action
  params: []
- id: set_device_id
  label: Device ID Setting
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID (0-999)
- id: get_system20_id
  label: System20 ID Acquisition
  kind: action
  params: []

# Control Settings
- id: get_autolock
  label: Auto Lock ON/OFF Acquisition
  kind: action
  params: []
- id: set_autolock
  label: Auto Lock ON/OFF Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_af_meter
  label: AF Meter Setting Acquisition
  kind: action
  params: []
- id: set_af_meter
  label: AF Meter Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Pre, 1=Post
- id: get_jog_dial
  label: Jog Dial Direction Acquisition
  kind: action
  params: []
- id: set_jog_dial
  label: Jog Dial Direction Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Default, 1=Invert

# Network Settings
- id: get_network_info
  label: Network Information Acquisition
  kind: action
  params: []
- id: set_network_info
  label: Network Information Setting
  kind: action
  params:
    - name: ip_mode
      type: integer
      description: 0=Auto, 1=Static
    - name: ip_address
      type: string
      description: Static IP address
    - name: subnet_mask
      type: string
    - name: default_gateway
      type: string
    - name: upnp
      type: integer
      description: 0=OFF, 1=ON
- id: get_notification_mode
  label: Notification Mode Acquisition
  kind: action
  params: []
- id: set_notification_mode
  label: Notification Mode Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_notification_level
  label: Level Notification ON/OFF Acquisition
  kind: action
  params: []
- id: set_notification_level
  label: Level Notification ON/OFF Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_notification_level_interval
  label: Level Notification Intervals Acquisition
  kind: action
  params: []
- id: set_notification_level_interval
  label: Level Notification Intervals Setting
  kind: action
  params:
    - name: interval
      type: integer
      description: 1-600 (1=100ms, 600=60000ms)
- id: get_multicast_address
  label: Multicast Address Acquisition
  kind: action
  params: []
- id: set_multicast_address
  label: Multicast Address Setting
  kind: action
  params:
    - name: address
      type: string
      description: 224.0.0.0 to 239.255.255.255
- id: get_multicast_port
  label: Multicast Port Acquisition
  kind: action
  params: []
- id: set_multicast_port
  label: Multicast Port Setting
  kind: action
  params:
    - name: port
      type: integer
      description: 1-65535
- id: get_syslog_mode
  label: Syslog Setting Acquisition
  kind: action
  params: []
- id: set_syslog_mode
  label: Syslog Setting Change
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_ntp_mode
  label: NTP ON/OFF Acquisition
  kind: action
  params: []
- id: set_ntp_mode
  label: NTP ON/OFF Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_ntp_server_address
  label: NTP Server Address Acquisition
  kind: action
  params: []
- id: set_ntp_server_address
  label: NTP Server Address Setting
  kind: action
  params:
    - name: address
      type: string
      description: NTP server IP address
- id: get_ntp_server_port
  label: NTP Server Port Acquisition
  kind: action
  params: []
- id: set_ntp_server_port
  label: NTP Server Port Setting
  kind: action
  params:
    - name: port
      type: integer
      description: 1-65535
- id: get_ntp_timezone
  label: NTP Time Zone Acquisition
  kind: action
  params: []
- id: set_ntp_timezone
  label: NTP Time Zone Setting
  kind: action
  params:
    - name: timezone
      type: string
      description: "-12:00 to +14:00 (30-minute increments)"
- id: get_dst_mode
  label: DST ON/OFF Acquisition
  kind: action
  params: []
- id: set_dst_mode
  label: DST ON/OFF Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_dst_datetime
  label: DST Date and Time Acquisition
  kind: action
  params: []
- id: set_dst_datetime
  label: DST Date and Time Setting
  kind: action
  params:
    - name: start
      type: string
      description: Start date/time MMDDHHmm
    - name: end
      type: string
      description: End date/time MMDDHHmm

# Communication / Pairing
- id: get_rf_mode
  label: RF Mode Acquisition
  kind: action
  params: []
- id: set_rf_mode
  label: RF Mode Setting
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Standard, 2=HD Mode
- id: get_multitx
  label: MultiTx ON/OFF Acquisition
  kind: action
  params: []
- id: set_multitx
  label: MultiTx ON/OFF Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: request_pairing
  label: Pairing Request
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: tx_id
      type: string
      description: Two-character TX ID (A-Z, 0-9)
- id: request_pairing_cancel
  label: Pairing Cancel Request
  kind: action
  params: []
- id: get_multipairing_id
  label: Multipairing ID Acquisition
  kind: action
  params: []
- id: request_delete_multipairing_id
  label: Multipairing ID Deletion Request
  kind: action
  params: []

# Audio Settings (per channel)
- id: get_mixout
  label: Mixout ON/OFF Acquisition
  kind: action
  params: []
- id: set_mixout
  label: Mixout ON/OFF Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_ch_output_type
  label: Output Type Acquisition for Each Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_ch_output_type
  label: Output Type Setting for Each Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: output_type
      type: integer
      description: 0=Line, 1=Mic
- id: get_ch_volume
  label: Volume Acquisition for Each Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_ch_volume
  label: Volume Setting for Each Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: level
      type: integer
      description: "0=-20dB to 40=+20dB"
- id: get_ch_hpf
  label: HPF Setting Acquisition for Each Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_ch_hpf
  label: HPF Setting for Each Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_ch_mixout
  label: Mixout ON/OFF Acquisition for Each Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_ch_mixout
  label: Mixout ON/OFF Setting for Each Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_mixout_volume
  label: Mixout Volume Acquisition for Each Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_mixout_volume
  label: Mixout Volume Setting for Each Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: level
      type: integer
      description: "0=-30dB to 40=+10dB"
- id: get_mix_output_type
  label: Mixout Output Type Acquisition
  kind: action
  params: []
- id: set_mix_output_type
  label: Mixout Output Type Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Line, 1=Mic
- id: get_limiter
  label: Limiter Setting Acquisition
  kind: action
  params: []
- id: set_limiter
  label: Limiter Setting
  kind: action
  params:
    - name: value
      type: integer
      description: "0=-60dB to 60=0dB"
- id: get_ch_mute
  label: Mute Setting Acquisition for Each Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_ch_mute
  label: Mute Setting for Each Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: 0=Unmute, 1=Mute

# TX Management
- id: get_tx_connection_status
  label: TX Connection Status Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: get_tx_model
  label: TX Model Name Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: request_tx_identify
  label: TX Identify Request
  kind: action
  params:
    - name: value
      type: integer
      description: 0 or 1 (identify start)
- id: get_tx_id
  label: TX ID Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_tx_id
  label: TX ID Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: tx_id
      type: string
      description: Two-character TX ID
- id: get_tx_gain
  label: TX Gain Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_tx_gain
  label: TX Gain Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: gain
      type: integer
      description: "0=-10dB to 15=+20dB (2dB step)"
- id: get_tx_input
  label: TX MIC/INST Setting Acquisition (BP only)
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_tx_input
  label: TX MIC/INST Setting (BP only)
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: 0=Mic, 1=Inst
- id: get_tx_mute_mode
  label: TX Mute Mode Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_tx_mute_mode
  label: TX Mute Mode Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: mode
      type: integer
      description: "BP/HH: 0=Enable, 1=Disable | BD/DS: 0=Toggle(mute), 1=Toggle(unmute), 2=Touch to talk, 3=Touch to mute, 4=Disable"
- id: get_tx_led
  label: TX LED Mode Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_tx_led
  label: TX LED Mode Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: mode
      type: integer
      description: "BP/HH: 0=OFF, 1=ON | BD/DS: 0=Standard, 1=Conference"
- id: get_tx_battery_type
  label: TX Battery Type Acquisition (HH, BP only)
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_tx_battery_type
  label: TX Battery Type Setting (HH, BP only)
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: type
      type: integer
      description: 0=Alkaline, 1=NiMh, 2=Lithium
- id: get_tx_pairing_timeout
  label: TX Pairing Timeout Time Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_tx_pairing_timeout
  label: TX Pairing Timeout Time Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: timeout
      type: integer
      description: 0=OFF, 1=1min, 2=10min, 3=60min
- id: get_tx_system20_id
  label: TX System20 ID Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: get_tx_version
  label: TX Version Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: request_tx_factory_reset
  label: TX Factory Reset Request
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: request_tx_reboot
  label: TX Reboot Request
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: get_tx_external_mute
  label: TX External Mute Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_tx_external_mute
  label: TX External Mute Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: 0=OFF, 1=Unmute, 2=Mute
- id: get_tx_external_mute_led
  label: TX External Mute LED Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_tx_external_mute_led
  label: TX External Mute LED Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: 0=OFF, 1=Unmute, 2=Mute
- id: get_tx_mute_status
  label: TX Mute Status Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: get_tx_battery_level
  label: TX Battery Level Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)

# EQ
- id: get_eq_enable
  label: EQ ON/OFF Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_eq_enable
  label: EQ ON/OFF Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_eq_band
  label: EQ Band ON/OFF Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: band
      type: integer
      description: Band number (1-4)
- id: set_eq_band
  label: EQ Band ON/OFF Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: band
      type: integer
      description: Band number (1-4)
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_eq_band_gain
  label: EQ Band Gain Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: band
      type: integer
      description: Band number (1-4)
- id: set_eq_band_gain
  label: EQ Band Gain Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: band
      type: integer
      description: Band number (1-4)
    - name: value
      type: integer
      description: EQ gain index
- id: get_eq_band_freq
  label: EQ Band Frequency Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: band
      type: integer
      description: Band number (1-4)
- id: set_eq_band_freq
  label: EQ Band Frequency Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: band
      type: integer
      description: Band number (1-4)
    - name: value
      type: integer
      description: Frequency index (0-480, see EQ frequency table)
- id: get_eq_band_q
  label: EQ Band Q Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: band
      type: integer
      description: Band number (1-4)
- id: set_eq_band_q
  label: EQ Band Q Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: band
      type: integer
      description: Band number (1-4)
    - name: value
      type: integer
      description: Q index (0-31, see EQ quality table)
- id: get_eq_band_type
  label: EQ Band Filter Type Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: band
      type: integer
      description: Band number (1-4)
- id: set_eq_band_type
  label: EQ Band Filter Type Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: band
      type: integer
      description: Band number (1-4)
    - name: value
      type: integer
      description: "Band 1: 0=HPF, 1=LSH, 2=PEAK | Band 4: 0=LPF, 1=HSH, 2=PEAK | Bands 2-3: fixed 2=PEAK"
- id: get_eq_last_preset
  label: EQ Last Recalled Preset Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_eq_last_preset
  label: EQ Last Recalled Preset Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-7)
- id: request_eq_recall_preset
  label: EQ Preset Recall Request
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-7)
- id: get_eq_preset_enable
  label: EQ Preset ON/OFF Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_eq_preset_enable
  label: EQ Preset ON/OFF Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_eq_preset_band
  label: EQ Preset Band ON/OFF Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-7)
- id: set_eq_preset_band
  label: EQ Preset Band ON/OFF Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-7)
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_eq_preset_band_gain
  label: EQ Preset Band Gain Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-7)
- id: set_eq_preset_band_gain
  label: EQ Preset Band Gain Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-7)
    - name: value
      type: integer
      description: EQ gain index
- id: get_eq_preset_band_freq
  label: EQ Preset Band Frequency Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-7)
- id: set_eq_preset_band_freq
  label: EQ Preset Band Frequency Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-7)
    - name: value
      type: integer
      description: Frequency index (0-480)
- id: get_eq_preset_band_q
  label: EQ Preset Band Q Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-7)
- id: set_eq_preset_band_q
  label: EQ Preset Band Q Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-7)
    - name: value
      type: integer
      description: Q index (0-31)
- id: get_eq_preset_band_type
  label: EQ Preset Band Filter Type Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-7)
- id: set_eq_preset_band_type
  label: EQ Preset Band Filter Type Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-7)
    - name: value
      type: integer
      description: Filter type index
- id: get_eq_preset_name
  label: EQ Preset Name Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_eq_preset_name
  label: EQ Preset Name Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: name
      type: string
      description: Preset name (max 12 ASCII chars)
- id: get_eq_preset_type
  label: EQ Preset Type Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_eq_preset_type
  label: EQ Preset Type Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: type
      type: integer
      description: 0=FactoryPreset, 1=UserPreset

# COMP
- id: get_comp_enable
  label: COMP ON/OFF Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_enable
  label: COMP ON/OFF Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_comp_ratio
  label: COMP Ratio Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_ratio
  label: COMP Ratio Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: "0=1:1.4, 1=1:2, 2=1:4, 3=1:6, 4=1:10, 5=1:inf"
- id: get_comp_threshold
  label: COMP Threshold Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_threshold
  label: COMP Threshold Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: Threshold index
- id: get_comp_attack
  label: COMP Attack Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_attack
  label: COMP Attack Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: "0=0msec, 1=0.25msec, 2=0.5msec, 3=1msec, 4=2msec, 5=4msec, 6=8msec, 7=16msec, 8=32msec, 9=100msec"
- id: get_comp_release
  label: COMP Release Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_release
  label: COMP Release Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: "0=50msec, 1=100msec, 2=200msec, 3=400msec, 4=800msec, 5=1000msec, 6=2000msec"
- id: get_comp_gain
  label: COMP Gain Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_gain
  label: COMP Gain Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: Gain index
- id: get_comp_last_preset
  label: COMP Last Preset Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_last_preset
  label: COMP Last Preset Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-6)
- id: request_comp_recall_preset
  label: COMP Preset Recall Request
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: preset
      type: integer
      description: Preset number (1-6)
- id: get_comp_preset_enable
  label: COMP Preset ON/OFF Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_preset_enable
  label: COMP Preset ON/OFF Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: get_comp_preset_ratio
  label: COMP Preset Ratio Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_preset_ratio
  label: COMP Preset Ratio Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: Ratio index
- id: get_comp_preset_threshold
  label: COMP Preset Threshold Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_preset_threshold
  label: COMP Preset Threshold Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: Threshold index
- id: get_comp_preset_attack
  label: COMP Preset Attack Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_preset_attack
  label: COMP Preset Attack Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: Attack index
- id: get_comp_preset_release
  label: COMP Preset Release Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_preset_release
  label: COMP Preset Release Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: Release index
- id: get_comp_preset_gain
  label: COMP Preset Gain Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_preset_gain
  label: COMP Preset Gain Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: value
      type: integer
      description: Gain index
- id: get_comp_preset_name
  label: COMP Preset Name Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_preset_name
  label: COMP Preset Name Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: name
      type: string
      description: Preset name (max 12 ASCII chars)
- id: get_comp_preset_type
  label: COMP Preset Type Acquisition
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
- id: set_comp_preset_type
  label: COMP Preset Type Setting
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-4)
    - name: type
      type: integer
      description: 0=FactoryPreset, 1=UserPreset

# Status
- id: get_rxlink_info
  label: RxLink Status Acquisition
  kind: action
  params: []
- id: get_ru_connection_status
  label: RU Connection Status Acquisition
  kind: action
  params: []
- id: get_lock_status
  label: Lock Status Acquisition
  kind: action
  params: []
- id: get_busy_status
  label: Busy Status Acquisition
  kind: action
  params: []
- id: get_alert_values
  label: RSSI and Battery Alert Parameter Acquisition
  kind: action
  params: []
- id: set_alert_values
  label: RSSI and Battery Alert Parameter Setting
  kind: action
  params:
    - name: rssi_threshold
      type: integer
      description: RSSI threshold (-90 to -60 dBm)
    - name: battery_threshold
      type: integer
      description: Battery threshold (1-3)

# Other Functions
- id: request_rf_scan
  label: 2.4 GHz RF Scan Start/End
  kind: action
  params:
    - name: value
      type: integer
      description: 0=End, 1=Start
- id: request_rx_identify
  label: RX Identify Request
  kind: action
  params:
    - name: value
      type: integer
      description: 0 or 1 (identify start)
- id: request_recall_preset
  label: Preset Recall Request
  kind: action
  params: []
- id: request_factory_reset
  label: Factory Reset Request
  kind: action
  params: []
- id: request_reboot
  label: Reboot Request
  kind: action
  params: []
```

## Feedbacks
```yaml
# Responses from Get commands (TCP Answer)
- id: model_name_response
  type: string
  description: Model name (e.g. "ATW-R1440") and DECT mode
- id: version_info_response
  type: string
  description: Integrated file version, MCU F/W version, RC FPGA version, RU FPGA version, RU MOD version
- id: device_name_response
  type: string
  description: Device name (8 chars)
- id: device_id_response
  type: integer
  description: Device ID (0-999)
- id: system20_id_response
  type: string
  description: 8-character hexadecimal System20 ID
- id: autolock_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: af_meter_response
  type: enum
  values: [0, 1]
  description: 0=Pre, 1=Post
- id: dial_response
  type: enum
  values: [0, 1]
  description: 0=Default, 1=Invert
- id: network_info_response
  type: object
  properties:
    - ip_mode: integer (0=Auto, 1=Static)
    - ip_address: string
    - subnet_mask: string
    - default_gateway: string
    - upnp: integer (0=OFF, 1=ON)
    - mac_address: string
- id: notification_mode_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: notification_level_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: notification_level_interval_response
  type: integer
  description: 1-600 (interval in 100ms units)
- id: multicast_address_response
  type: string
  description: Multicast address
- id: multicast_port_response
  type: integer
  description: Port number (1-65535)
- id: syslog_mode_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: ntp_mode_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: ntp_server_address_response
  type: string
  description: NTP server IP address
- id: ntp_server_port_response
  type: integer
  description: Port number (1-65535)
- id: ntp_timezone_response
  type: string
  description: Timezone offset string (e.g. "+09:00")
- id: dst_mode_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: dst_datetime_response
  type: object
  properties:
    - start: string (MMDDHHmm)
    - end: string (MMDDHHmm)
- id: rf_mode_response
  type: enum
  values: [1, 2]
  description: 1=Standard, 2=HD Mode
- id: multitx_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: multipairing_id_response
  type: object
  description: Multipairing IDs for up to 4 channels
- id: mixout_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: ch_output_type_response
  type: enum
  values: [0, 1]
  description: 0=Line, 1=Mic
- id: ch_volume_response
  type: integer
  description: "0=-20dB to 40=+20dB"
- id: ch_hpf_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: ch_mixout_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: mixout_volume_response
  type: integer
  description: "0=-30dB to 40=+10dB"
- id: mix_output_type_response
  type: enum
  values: [0, 1]
  description: 0=Line, 1=Mic
- id: limiter_response
  type: integer
  description: "0=-60dB to 60=0dB"
- id: ch_mute_response
  type: enum
  values: [0, 1]
  description: 0=Unmute, 1=Mute
- id: tx_connection_status_response
  type: object
  description: TX connection status and System20 ID
- id: tx_model_response
  type: string
  description: TX model name (16 chars)
- id: tx_id_response
  type: string
  description: Two-character TX ID
- id: tx_gain_response
  type: integer
  description: "0=-10dB to 15=+20dB"
- id: tx_input_response
  type: enum
  values: [0, 1]
  description: 0=Mic, 1=Inst
- id: tx_mute_mode_response
  type: integer
  description: Mute mode index
- id: tx_led_response
  type: integer
  description: LED mode index
- id: tx_battery_type_response
  type: enum
  values: [0, 1, 2]
  description: 0=Alkaline, 1=NiMh, 2=Lithium
- id: tx_pairing_timeout_response
  type: enum
  values: [0, 1, 2, 3]
  description: 0=OFF, 1=1min, 2=10min, 3=60min
- id: tx_system20_id_response
  type: string
  description: 8-character hexadecimal TX System20 ID
- id: tx_version_response
  type: object
  description: ZIP, MCU, and communication module versions
- id: tx_external_mute_response
  type: enum
  values: [0, 1, 2]
  description: 0=OFF, 1=Unmute, 2=Mute
- id: tx_external_mute_led_response
  type: enum
  values: [0, 1, 2]
  description: 0=OFF, 1=Unmute, 2=Mute
- id: tx_mute_status_response
  type: enum
  values: [0, 1]
  description: 0=Unmute, 1=Mute
- id: tx_battery_level_response
  type: object
  description: TX connection status, battery level, battery life, USB charging status
- id: eq_enable_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: eq_band_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: eq_band_gain_response
  type: integer
  description: EQ band gain index
- id: eq_band_freq_response
  type: integer
  description: EQ band frequency index (0-480)
- id: eq_band_q_response
  type: integer
  description: EQ band Q index (0-31)
- id: eq_band_type_response
  type: integer
  description: EQ band filter type index
- id: eq_last_preset_response
  type: integer
  description: Preset number (0-7, 0=not recalled)
- id: eq_preset_enable_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: eq_preset_band_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: eq_preset_band_gain_response
  type: integer
  description: EQ preset band gain index
- id: eq_preset_band_freq_response
  type: integer
  description: EQ preset band frequency index
- id: eq_preset_band_q_response
  type: integer
  description: EQ preset band Q index
- id: eq_preset_band_type_response
  type: integer
  description: EQ preset band filter type
- id: eq_preset_name_response
  type: string
  description: Preset name (12 chars)
- id: eq_preset_type_response
  type: enum
  values: [0, 1]
  description: 0=FactoryPreset, 1=UserPreset
- id: comp_enable_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: comp_ratio_response
  type: integer
  description: COMP ratio index
- id: comp_threshold_response
  type: integer
  description: COMP threshold index
- id: comp_attack_response
  type: integer
  description: COMP attack index
- id: comp_release_response
  type: integer
  description: COMP release index
- id: comp_gain_response
  type: integer
  description: COMP gain index
- id: comp_last_preset_response
  type: integer
  description: Preset number (0-6)
- id: comp_preset_enable_response
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: comp_preset_ratio_response
  type: integer
  description: COMP preset ratio index
- id: comp_preset_threshold_response
  type: integer
  description: COMP preset threshold index
- id: comp_preset_attack_response
  type: integer
  description: COMP preset attack index
- id: comp_preset_release_response
  type: integer
  description: COMP preset release index
- id: comp_preset_gain_response
  type: integer
  description: COMP preset gain index
- id: comp_preset_name_response
  type: string
  description: Preset name (12 chars)
- id: comp_preset_type_response
  type: enum
  values: [0, 1]
  description: 0=FactoryPreset, 1=UserPreset
- id: rxlink_info_response
  type: object
  description: RxLink information including MAC addresses
- id: ru_connection_status_response
  type: object
  description: RU connection status and FW version inconsistency flag
- id: lock_status_response
  type: enum
  values: [0, 1]
  description: 0=Not locked, 1=Locked
- id: busy_status_response
  type: enum
  values: [0, 1]
  description: 0=Not busy, 1=Busy
- id: alert_values_response
  type: object
  description: RSSI and battery alert thresholds
- id: ack_response
  type: string
  description: ACK (positive acknowledgement)
- id: nak_response
  type: object
  description: NAK with error code (01=Syntax, 02=Invalid command, 04=Parameter, 90=Busy, 99=Other)
```

## Variables
```yaml
# UNRESOLVED: no discrete Variables section found — all settable parameters are expressed as Actions
# The command set is entirely action-based with Get/Set pairs
```

## Events
```yaml
# UDP notifications sent by the device when status changes
- id: n_myname
  description: Device name change notification
  params:
    - name: name
      type: string
- id: n_mydeviceid
  description: Device ID change notification
  params:
    - name: device_id
      type: integer
- id: n_autolock
  description: Auto lock change notification
  params:
    - name: value
      type: integer
- id: n_afmeter
  description: AF meter change notification
  params:
    - name: value
      type: integer
- id: n_dial
  description: Jog dial change notification
  params:
    - name: value
      type: integer
- id: n_ipnet
  description: Network info change notification
  params:
    - name: ip_mode
      type: integer
    - name: ip_address
      type: string
    - name: subnet_mask
      type: string
    - name: default_gateway
      type: string
    - name: upnp
      type: integer
    - name: mac_address
      type: string
- id: n_noticemode
  description: Notification mode change notification
- id: n_noticelevel
  description: Level notification change notification
- id: n_noticelevelinterval
  description: Level notification interval change notification
- id: n_noticeaddress
  description: Multicast address change notification
- id: n_noticeportno
  description: Multicast port change notification
- id: n_logmode
  description: Syslog mode change notification
- id: n_ntpmode
  description: NTP mode change notification
- id: n_ntpserveraddress
  description: NTP server address change notification
- id: n_ntpserverportno
  description: NTP server port change notification
- id: n_ntptimezone
  description: NTP timezone change notification
- id: n_dstmode
  description: DST mode change notification
- id: n_stddatetime
  description: DST date/time change notification
- id: n_hdmode
  description: RF mode change notification
- id: n_multitx
  description: MultiTx change notification
- id: n_pairing
  description: Pairing status change notification
  params:
    - name: channel
      type: integer
    - name: pairing_result
      type: integer
    - name: tx_system20_id
      type: string
    - name: channel_id
      type: string
- id: n_multipairid
  description: Multipairing ID change notification
- id: n_mixout
  description: Mixout change notification
- id: n_choutputtype
  description: Channel output type change notification
- id: n_chvolume
  description: Channel volume change notification
- id: n_chhpf
  description: Channel HPF change notification
- id: n_chmixout
  description: Channel mixout change notification
- id: n_mixoutvolume
  description: Mixout volume change notification
- id: n_mixoutputtype
  description: Mix output type change notification
- id: n_limiter
  description: Limiter change notification
- id: n_chmute
  description: Channel mute change notification
- id: n_tsttx
  description: TX connection status notification
- id: n_txdeviceid
  description: TX device ID change notification
- id: n_txmicgain
  description: TX gain change notification
- id: n_txinput
  description: TX input change notification
- id: n_txmutemode
  description: TX mute mode change notification
- id: n_txled
  description: TX LED change notification
- id: n_txbattery
  description: TX battery type change notification
- id: n_txtimeout
  description: TX pairing timeout change notification
- id: n_txforcedmute
  description: TX external mute change notification
- id: n_txforcedmuteled
  description: TX external mute LED change notification
- id: n_txmute
  description: TX mute status change notification
- id: n_levelbatttx
  description: TX battery level change notification
- id: n_eqenable
  description: EQ enable change notification
- id: n_eqband
  description: EQ band change notification
- id: n_eqbandgain
  description: EQ band gain change notification
- id: n_eqbandfreq
  description: EQ band frequency change notification
- id: n_eqbandq
  description: EQ band Q change notification
- id: n_eqbandtype
  description: EQ band type change notification
- id: n_eqlastpreset
  description: EQ last preset change notification
- id: n_eqpresetenable
  description: EQ preset enable change notification
- id: n_eqpresetband
  description: EQ preset band change notification
- id: n_eqpresetbandgain
  description: EQ preset band gain change notification
- id: n_eqpresetbandfreq
  description: EQ preset band frequency change notification
- id: n_eqpresetbandq
  description: EQ preset band Q change notification
- id: n_eqpresetbandtype
  description: EQ preset band type change notification
- id: n_eqpresetname
  description: EQ preset name change notification
- id: n_compenable
  description: COMP enable change notification
- id: n_compratio
  description: COMP ratio change notification
- id: n_compthreshold
  description: COMP threshold change notification
- id: n_compattack
  description: COMP attack change notification
- id: n_comprelease
  description: COMP release change notification
- id: n_compgain
  description: COMP gain change notification
- id: n_complastpreset
  description: COMP last preset change notification
- id: n_comppresetenable
  description: COMP preset enable change notification
- id: n_comppresetratio
  description: COMP preset ratio change notification
- id: n_comppresetthreshold
  description: COMP preset threshold change notification
- id: n_comppresetattack
  description: COMP preset attack change notification
- id: n_comppresetrelease
  description: COMP preset release change notification
- id: n_comppresetgain
  description: COMP preset gain change notification
- id: n_comppresetname
  description: COMP preset name change notification
- id: n_rxlinkinfo
  description: RxLink status change notification
- id: n_rusts
  description: RU connection status change notification
- id: n_lock
  description: Lock status change notification
- id: n_busy
  description: Busy status change notification
- id: n_sys20levelall
  description: Level notification (all channels)
  params:
    - name: mixout_af_level
      type: integer
    - name: total_channels
      type: integer
    - name: channels
      type: array
      description: Per-channel: number, tx_connection, rf_level, af_level, rssi, comm_quality, audio_quality, comp_input, comp_gain_reduction, comp_output
- id: n_applog
  description: Applog notification
  params:
    - name: model_name
      type: string
    - name: log_level
      type: integer
    - name: device_id
      type: integer
    - name: log_text
      type: string
- id: n_alertval
  description: Alert values change notification
- id: n_sys20rfscan
  description: RF scan result notification
  params:
    - name: start_freq
      type: integer
    - name: end_freq
      type: integer
    - name: data_count
      type: integer
    - name: final_flag
      type: integer
    - name: rssi
      type: array
- id: n_reboot
  description: Reboot completion notification
  params:
    - name: operation_type
      type: integer
    - name: reset_type
      type: integer
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros found in source — the preset system (EQ and COMP)
# operates as a built-in multi-parameter recall mechanism but is not documented as a macro
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings or interlock procedures not found in source document
```

## Notes
- Command format: ASCII strings separated by single-byte spaces (0x20), parameters comma-delimited, CR (0x0D) terminator
- TCP is used for Set/Get/Request commands; UDP is used only for unsolicited Information notifications
- Maximum data length: 287 bytes (32-byte Ethernet header + 255-byte control command)
- Only one TCP connection allowed at a time; concurrent connections are rejected
- Commands are processed asynchronously — next command can be sent without waiting for ACK/NAK, but NAK (90: Busy) may be returned if device is still processing
- RxLink ID: Primary=0001, Extensions=0002-0005
- Unit ID is always 00 (fixed)
- <!-- UNRESOLVED: command timeout values not stated in source -->
- <!-- UNRESOLVED: TCP keepalive or heartbeat interval not stated in source -->
- <!-- UNRESOLVED: multicast group registration details not fully documented -->
- <!-- UNRESOLVED: firmware update procedure not covered in IP control spec -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: audio_technica_system_20_pro_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:15:10.686Z
retrieved_at: 2026-04-23T15:15:10.686Z
last_checked_at: 2026-04-23T15:15:10.686Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:15:10.686Z
matched_actions: 152
action_count: 152
confidence: high
summary: "All 152 spec actions match command mnemonics in source; transport ports verified verbatim; complete coverage of documented command set."
```

## Known Gaps

```yaml
[]
```
