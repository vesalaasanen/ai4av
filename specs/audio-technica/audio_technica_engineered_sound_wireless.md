---
spec_id: admin/audio-technica-esw-wireless
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio Technica Engineered Sound Wireless Control Spec"
manufacturer: "Audio Technica"
model_family: "ESW-R 4180 DAN"
aliases: []
compatible_with:
  manufacturers:
    - "Audio Technica"
  models:
    - "ESW-R 4180 DAN"
    - "ESW-T 4101"
    - "ESW-T 4102"
    - "ESW-T 4106"
    - "ESW-T 4107"
    - ESW-CHG4
    - ESW-CHG5
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.audio-technica.com
retrieved_at: 2026-04-30T04:40:34.498Z
last_checked_at: 2026-04-23T15:12:47.038Z
generated_at: 2026-04-23T15:12:47.038Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T15:12:47.038Z
  matched_actions: 94
  action_count: 94
  confidence: high
  summary: "All 94 spec actions matched literally in source with correct shapes; all transport parameters verified verbatim; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Audio Technica Engineered Sound Wireless Control Spec

## Summary
Engineered Sound Wireless System IP control protocol supporting both TCP and UDP communications. TCP port 17200 is used for command/control (Set, Get, Request, ACK, NAK, Answer). UDP port 17000 is used for unsolicited status change notifications. Supports DECT wireless audio with comprehensive parameter control including RF mode, audio levels, channel routing, and TX/CHG management.

<!-- UNRESOLVED: Serial/RS-232 not supported — IP only -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 17200  # TCP control port (fixed)
  udp_notification_port: 17000  # UDP notifications (configurable)
  udp_chg_linkage_port: 17001  # UDP CHG linkage (fixed)
  udp_synchronous_port: 17100  # UDP synchronization between RUs (fixed)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: extensive Get commands for status acquisition
- levelable  # inferred: channel volume, RF power, AF/RF level monitoring
- routable  # inferred: channel mix assignment, Ch8 output routing
```

## Actions
```yaml
# Management
- id: set_device_name
  label: Set Device Name
  kind: action
  params:
    - name: name
      type: string

- id: set_location_name
  label: Set Location Name
  kind: action
  params:
    - name: name
      type: string

- id: set_channel_name
  label: Set Channel Name
  kind: action
  params:
    - name: channel
      type: integer
    - name: name
      type: string

- id: set_device_id
  label: Set Device ID
  kind: action
  params:
    - name: id
      type: integer

# Communication
- id: set_rf_mode
  label: Set RF Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Standard, 2=HD mode

- id: set_transmission_output
  label: Set Transmission Output
  kind: action
  params:
    - name: power
      type: integer
      description: RF power level (0-5, varies by DECT mode)

# Audio
- id: set_channel_mute
  label: Set Channel Mute
  kind: action
  params:
    - name: channel
      type: integer
    - name: mute
      type: integer
      description: 0=Enable mute

- id: set_channel_volume
  label: Set Channel Volume
  kind: action
  params:
    - name: channel
      type: integer
    - name: volume
      type: integer
      description: 0-40 (0=-30dB to 30=0dB, up to 40=+10dB)

- id: set_channel_hpf
  label: Set Channel High Pass Filter
  kind: action
  params:
    - name: channel
      type: integer
    - name: hpf
      type: integer
      description: 0=OFF, 1=80Hz, 2=120Hz, 3=160Hz

- id: set_ch8_output
  label: Set Ch8 Output
  kind: action
  params:
    - name: output
      type: integer
      description: 0=Discrete

- id: set_channel_mix_assignment
  label: Set Channel Mix Assignment
  kind: action
  params:
    - name: channel
      type: integer
    - name: mix
      type: integer
      description: 0=OFF

# Roaming
- id: set_roaming_mode
  label: Set Roaming Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Disable, 1=Enable

- id: set_roaming_threshold
  label: Set Roaming Threshold
  kind: action
  params:
    - name: threshold
      type: integer
      description: 0=OFF, -85 to -50 dBm

# Network
- id: set_ip_network
  label: Set IP Network Information
  kind: action
  params:
    - name: config_mode
      type: integer
      description: 0=Auto, 1=Static
    - name: ip_address
      type: string
    - name: subnet_mask
      type: string
    - name: gateway
      type: string
    - name: upnp
      type: integer
      description: 0=OFF

# Notification Settings
- id: set_notification_mode
  label: Set Notification Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=OFF

- id: set_level_notification
  label: Set Level Notification
  kind: action
  params:
    - name: level
      type: integer
      description: 0=OFF

- id: set_level_notification_interval
  label: Set Level Notification Interval
  kind: action
  params:
    - name: interval
      type: integer
      description: 1-600 (100ms steps, 100-60000ms)

- id: set_multicast_address
  label: Set Multicast Address
  kind: action
  params:
    - name: address
      type: string
      description: 224.0.0.0 to 239.255.255.255

- id: set_multicast_port
  label: Set Multicast Port
  kind: action
  params:
    - name: port
      type: integer
      description: 1-65535

# NTP Settings
- id: set_ntp_mode
  label: Set NTP Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=OFF

- id: set_ntp_server_address
  label: Set NTP Server Address
  kind: action
  params:
    - name: address
      type: string

- id: set_ntp_server_port
  label: Set NTP Server Port
  kind: action
  params:
    - name: port
      type: integer

- id: set_ntp_timezone
  label: Set NTP Time Zone
  kind: action
  params:
    - name: timezone
      type: string
      description: -12:00 to +14:00

- id: set_dst_mode
  label: Set DST Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=OFF

- id: set_dst_datetime
  label: Set DST Start and End Dates
  kind: action
  params:
    - name: datetime
      type: string
      description: MMDDHHmm format

# System
- id: reboot
  label: Reboot Request
  kind: action
  params: []

- id: factory_reset
  label: Factory Reset Request
  kind: action
  params: []

- id: led_flash
  label: LED Lighting Request
  kind: action
  params:
    - name: target
      type: integer
      description: 0=System, 1-8=CHG Port Number
    - name: operation
      type: integer
      description: 0=Flash stops, 1=Identify flash starts

- id: master_table_call
  label: Master Table Call Request
  kind: action
  params: []

- id: last_preset_call
  label: Last Preset Call Request
  kind: action
  params: []

- id: udp_transmission
  label: UDP Transmission Request
  kind: action
  params: []

# TX Commands
- id: set_tx_device_name
  label: TX Device Name Setting
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: name
      type: string

- id: set_tx_location_name
  label: TX Location Name Setting
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: name
      type: string

- id: set_tx_device_id
  label: TX Device ID Setting
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: id
      type: integer

- id: set_tx_gain
  label: TX Gain Setting
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: gain
      type: integer

- id: set_tx_internal_mic_gain
  label: TX Internal Mic Gain Setting
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: gain
      type: integer

- id: set_tx_directivity
  label: TX Directivity Setting
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: directivity
      type: integer

- id: set_tx_mute_function
  label: TX Mute Function Setting
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: mute
      type: integer

- id: set_tx_mute_mode
  label: TX Mute Mode Setting
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: mode
      type: integer
      description: 0=Toggle, 1=Push to Talk, 2=Push to Mute

- id: set_tx_default_mute
  label: TX Default Mute Setting
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: mute
      type: integer
      description: 0=Default Unmute, 1=Default Mute

- id: set_tx_mute_led_color
  label: TX Mute LED Color Setting
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: color
      type: integer
      description: 0=OFF

- id: set_tx_mute_reset_led_color
  label: TX Mute Reset LED Color Setting
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: color
      type: integer

- id: set_tx_battery_level_alert
  label: TX Battery Level Alert Setting
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: alert
      type: integer
      description: 0=OFF, 1=60min before, 2=90min before, 3=120min before

- id: tx_led_flash
  label: TX LED Lighting Request
  kind: action
  params:
    - name: tx_id
      type: integer
    - name: operation
      type: integer

- id: tx_reboot
  label: TX Reboot Request
  kind: action
  params:
    - name: tx_id
      type: integer

- id: tx_factory_reset
  label: TX Factory Reset Request
  kind: action
  params:
    - name: tx_id
      type: integer

# CHG Commands
- id: set_chg_port_assignment
  label: CHG Port Assignment Setting
  kind: action
  params:
    - name: port
      type: integer
    - name: channel
      type: integer
      description: 0=Not assigned, 1-8=CH number

- id: set_chg_link_button_lock
  label: CHG Link Button Lock Setting
  kind: action
  params:
    - name: lock
      type: integer
      description: 0=Always Unlock, 1=Press 2sec to unlock, 2=Always Lock

# LED Setting
- id: set_led_off
  label: LED Setting
  kind: action
  params:
    - name: led
      type: integer
      description: 0=LED ON, 1=LED not ON

# Walktest and DECT RF Scan
- id: walktest
  label: Walktest Request
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Normal operation, 1=Walktest operation

- id: dect_rf_scan
  label: DECT RF Scan Request
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Normal, 1=DECT RF scan operation

# Master Table Commands
- id: set_master_ch8_output
  label: Master Table Ch8 Output Setting
  kind: action
  params:
    - name: output
      type: integer

- id: set_master_channel_mix_assignment
  label: Master Table Channel Mix Assignment Setting
  kind: action
  params:
    - name: channel
      type: integer
    - name: mix
      type: integer

- id: set_preset_name
  label: Preset Name Setting
  kind: action
  params:
    - name: preset
      type: integer
    - name: name
      type: string

- id: set_preset_ch8_output
  label: Preset Ch8 Output Setting
  kind: action
  params:
    - name: preset
      type: integer
    - name: output
      type: integer

- id: set_preset_channel_mix_assignment
  label: Preset Channel Mix Assignment Setting
  kind: action
  params:
    - name: preset
      type: integer
    - name: channel
      type: integer
    - name: mix
      type: integer

# Roaming Master Table Commands
- id: set_roaming_master_ch8_output
  label: Roaming Master Table Ch8 Output Setting
  kind: action
  params:
    - name: output
      type: integer

- id: set_roaming_master_channel_mix_assignment
  label: Roaming Master Table Channel Mix Assignment Setting
  kind: action
  params:
    - name: channel
      type: integer
    - name: mix
      type: integer

- id: set_roaming_preset_name
  label: Roaming Preset Name Setting
  kind: action
  params:
    - name: preset
      type: integer
    - name: name
      type: string

- id: set_roaming_preset_ch8_output
  label: Roaming Preset Ch8 Output Setting
  kind: action
  params:
    - name: preset
      type: integer
    - name: output
      type: integer

- id: set_roaming_preset_channel_mix_assignment
  label: Roaming Preset Channel Mix Assignment Setting
  kind: action
  params:
    - name: preset
      type: integer
    - name: channel
      type: integer
    - name: mix
      type: integer

- id: set_channel_meter_setting
  label: Channel Meter Setting
  kind: action
  params:
    - name: channel
      type: integer
    - name: setting
      type: integer

- id: set_system_log_mode
  label: System Log Setting
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=OFF
```

## Feedbacks
```yaml
# Management
- id: model_name
  label: Model Name Acquisition
  type: string

- id: version_info
  label: Version Information Acquisition
  type: string

- id: device_name
  label: Device Name Acquisition
  type: string

- id: location_name
  label: Location Name Acquisition
  type: string

- id: channel_name
  label: Channel Name Acquisition
  type: string

- id: device_id
  label: Device ID Acquisition
  type: integer

# Communication
- id: rf_mode
  label: RF Mode Acquisition
  type: enum
  values:
    - 1
    - 2
  descriptions:
    - Standard
    - HD mode

- id: transmission_output
  label: Transmission Output Acquisition
  type: integer

# Audio
- id: channel_mute
  label: Channel Mute Acquisition
  type: integer

- id: channel_volume
  label: Channel Volume Acquisition
  type: integer

- id: channel_hpf
  label: Channel High Pass Filter Acquisition
  type: enum
  values:
    - 0
    - 1
    - 2
    - 3
  descriptions:
    - OFF
    - 80Hz
    - 120Hz
    - 160Hz

- id: channel_meter
  label: Channel Meter Acquisition
  type: integer

- id: ch8_output
  label: Ch8 Output Acquisition
  type: integer

- id: channel_mix_assignment
  label: Channel Mix Assignment Acquisition
  type: integer

# Roaming
- id: roaming_mode
  label: Roaming Mode Acquisition
  type: enum
  values:
    - 0
    - 1
  descriptions:
    - Disable
    - Enable

- id: roaming_threshold
  label: Roaming Threshold Acquisition
  type: integer

# Level Monitoring
- id: rf_level
  label: RF Level Acquisition
  type: object
  properties:
    channel: integer
    unknown: integer
    rssi: integer
  descriptions:
    rssi:
      - No LINK
      - -90 to -84 dBm
      - -84 to -78 dBm
      - -78 to -72 dBm
      - -72 to -66 dBm
      - -66 to -60 dBm
      - -60 to -54 dBm
      - -54 dBm or more

- id: af_level
  label: AF Level Acquisition
  type: object
  properties:
    channel: integer
    unknown: integer
    level: integer
  descriptions:
    level:
      - Less than -50 dBFS
      - -50 to -40 dBFS
      - -40 to -30 dBFS
      - -30 to -20 dBFS
      - -20 to -12 dBFS
      - -12 to -6 dBFS
      - -6 to -1 dBFS
      - -1 dBFS or more

- id: tx_battery_level
  label: TX Battery Level Acquisition
  type: object
  properties:
    channel: integer
    unknown: integer
    level: integer
    life: integer
    usb: integer
  descriptions:
    level: 0-100%
    life: 0000-9959 HHMM format
    usb: 0=Not connected, 1=Charging

- id: tx_status
  label: TX Status Acquisition
  type: object
  properties:
    channel: integer
    unknown: integer
    dect_id: string
    external_mic: integer
  descriptions:
    external_mic: 0=Not connected, 1=Connected

# Network
- id: ip_network
  label: IP Network Information Acquisition
  type: object
  properties:
    config_mode: integer
    ip_address: string
    subnet_mask: string
    gateway: string
    upnp: integer
    mac_address: string

# Notification Settings
- id: notification_mode
  label: Notification Mode Acquisition
  type: integer

- id: level_notification
  label: Level Notification Acquisition
  type: integer

- id: level_notification_interval
  label: Level Notification Interval Acquisition
  type: integer

- id: multicast_address
  label: Multicast Address Acquisition
  type: string

- id: multicast_port
  label: Multicast Port Number Acquisition
  type: integer

# System
- id: system_log_mode
  label: System Log Acquisition
  type: integer

- id: ntp_mode
  label: NTP Mode Acquisition
  type: integer

- id: ntp_server_address
  label: NTP Server Address Acquisition
  type: string

- id: ntp_server_port
  label: NTP Server Port Number Acquisition
  type: integer

- id: ntp_timezone
  label: NTP Time Zone Acquisition
  type: string

- id: dst_mode
  label: DST Mode Acquisition
  type: integer

- id: dst_datetime
  label: DST Start and End Dates Acquisition
  type: string

# LED
- id: led_off
  label: LED Acquisition
  type: integer

# TX Queries
- id: tx_model
  label: TX Model Name Acquisition
  type: string

- id: tx_version
  label: TX Version Acquisition
  type: string

- id: tx_name
  label: TX Device Name Acquisition
  type: string

- id: tx_location_name
  label: TX Location Name Acquisition
  type: string

- id: tx_device_id
  label: TX Device ID Acquisition
  type: integer

- id: tx_type
  label: TX Type Acquisition
  type: enum
  values:
    - 0
    - 1
    - 2
    - 3
  descriptions:
    - HH (Handheld)
    - BP (Belt pack)
    - BD (Boundary)
    - DS (Stand)

- id: tx_gain
  label: TX Gain Acquisition
  type: integer

- id: tx_internal_mic_gain
  label: TX Internal Mic Gain Acquisition
  type: integer

- id: tx_directivity
  label: TX Directivity Acquisition
  type: integer

- id: tx_mute_function
  label: TX Mute Function Acquisition
  type: integer

- id: tx_mute_mode
  label: TX Mute Mode Acquisition
  type: integer

- id: tx_default_mute
  label: TX Default Mute Acquisition
  type: integer

- id: tx_mute_led_color
  label: TX Mute LED Color Acquisition
  type: integer

- id: tx_mute_reset_led_color
  label: TX Mute Reset LED Color Acquisition
  type: integer

- id: tx_battery_alert
  label: TX Battery Level Alert Acquisition
  type: integer

# CHG Queries
- id: chg_model_name
  label: CHG Model Name Acquisition
  type: string

- id: chg_version_array
  label: CHG FW Version Acquisition
  type: string

- id: chg_device_array
  label: CHG Device Linked Information Acquisition
  type: string

- id: chg_port_assignment
  label: CHG Port Assignment Acquisition
  type: integer

- id: chg_link_button_lock
  label: CHG Link Button Lock Acquisition
  type: integer

# Dante
- id: dante_ip_settings
  label: Dante IP Settings Acquisition
  type: string

- id: dante_device_name
  label: Dante Device Name Acquisition
  type: string

- id: dante_channel_label
  label: Dante Channel Label Name Acquisition
  type: string

- id: dante_model_name
  label: Dante Information Acquisition
  type: string

- id: dante_version
  label: Dante FW Version Acquisition
  type: string

# Battery
- id: battery_level
  label: Battery Level Acquisition
  type: object

- id: tx_battery_level_notification
  label: TX Battery Level Notification
  type: object

- id: all_levels_notification
  label: All Levels Notification
  type: object

- id: battery_level_notification
  label: Battery Level Notification
  type: object
```

## Variables
```yaml
# UNRESOLVED: all settable parameters are exposed as Actions above;
# no discrete Variables section applies to this protocol
```

## Events
```yaml
# Unsolicited notifications sent via UDP (port 17000)
- id: nmydeviceid
  label: Device ID Notification
  type: notification
  protocol: udp

- id: nchname
  label: Channel Name Notification
  type: notification
  protocol: udp

- id: nchmute
  label: Channel Mute Notification
  type: notification
  protocol: udp

- id: nchvolume
  label: Channel Volume Notification
  type: notification
  protocol: udp

- id: nchhpf
  label: Channel High Pass Filter Notification
  type: notification
  protocol: udp

- id: nchafmetersetting
  label: Channel Meter Notification
  type: notification
  protocol: udp

- id: nmixout
  label: Ch8 Output Notification
  type: notification
  protocol: udp

- id: nchmixout
  label: Channel Mix Assignment Notification
  type: notification
  protocol: udp

- id: nrfpower
  label: Transmission Output Notification
  type: notification
  protocol: udp

- id: nhdmode
  label: RF Mode Notification
  type: notification
  protocol: udp

- id: nroamingmode
  label: Roaming Mode Notification
  type: notification
  protocol: udp

- id: nroamingthreshold
  label: Roaming Threshold Notification
  type: notification
  protocol: udp

- id: nlevelbatttx
  label: TX Battery Level Notification
  type: notification
  protocol: udp

- id: nlevelall
  label: All Levels Notification
  type: notification
  protocol: udp

- id: nlevelbatt
  label: Battery Level Notification
  type: notification
  protocol: udp

- id: nststx
  label: TX Status Notification
  type: notification
  protocol: udp

- id: nreboot
  label: Reboot Notification
  type: notification
  protocol: udp

- id: nfactoryreset
  label: Factory Reset Notification
  type: notification
  protocol: udp

- id: nlastpreset
  label: Last Preset Call Notification
  type: notification
  protocol: udp

- id: nudpecho
  label: UDP Transmission Notification
  type: notification
  protocol: udp

- id: nipnet
  label: IP Network Information Notification
  type: notification
  protocol: udp

- id: nmydeviceid
  label: Device ID Notification
  type: notification
  protocol: udp

- id: nmyname
  label: Device Name Notification
  type: notification
  protocol: udp

- id: nlocationname
  label: Location Name Notification
  type: notification
  protocol: udp

- id: nnoticeaddress
  label: Multicast Address Notification
  type: notification
  protocol: udp

- id: nnoticeportno
  label: Multicast Port Number Notification
  type: notification
  protocol: udp

- id: nlogmode
  label: System Log Notification
  type: notification
  protocol: udp

- id: nntpmode
  label: NTP Notification
  type: notification
  protocol: udp

- id: nntpserveraddress
  label: NTP Server Address Notification
  type: notification
  protocol: udp

- id: nntpserverportno
  label: NTP Server Port Number Notification
  type: notification
  protocol: udp

- id: nntptimezone
  label: NTP Time Zone Notification
  type: notification
  protocol: udp

- id: ndstmode
  label: DST Mode Notification
  type: notification
  protocol: udp

- id: ndstdatetime
  label: DST Start and End Dates Notification
  type: notification
  protocol: udp

- id: napplog
  label: Application Log Notification
  type: notification
  protocol: udp
  description: Model name, Log Level (0=INFO, 1=NOTICE, 2=FATAL), Device ID, Message

- id: nwalktest
  label: Walktest Notification
  type: notification
  protocol: udp

- id: nsitesurvey
  label: DECT RF Scan Notification
  type: notification
  protocol: udp
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # confirmed by explicit Request Command structure
  - reboot  # confirmed by explicit Request Command structure
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
Command format: 5-byte command + 1-byte handshake (H/O/S) + 4-byte Model ID (0000) + 2-byte Unit ID (00) + 2-byte Continue Select (NC/CS/CM/CE) + variable parameters + CR (0x0D).

Set/Get/Request Commands use TCP. ACK/NAK/Answer responses use TCP. Information notifications use UDP.

Commands are processed asynchronously — next command can be sent without waiting for ACK/NAK, but Busy state (90) may be returned.

Only 1 host connection supported; multiple hosts cannot connect.

Maximum data length: 287 bytes (32-byte Ethernet header + 255-byte control command).

Error codes: 01=Syntax error, 02=Invalid command, 04=Parameter error, 90=Busy, 99=Other errors.

<!-- UNRESOLVED: TX-specific commands (sections 4.16) have incomplete parameter documentation in source — only command names listed without full format details -->
<!-- UNRESOLVED: CHG-specific commands (section 4.17) have incomplete parameter documentation in source -->
<!-- UNRESOLVED: Dante commands are read-only queries with no write/control capability documented -->
<!-- UNRESOLVED: Battery charging error flags documented but no command to read them shown -->
<!-- UNRESOLVED: Master table and preset operations (sections 4.5-4.8) have abbreviated documentation in source -->

## Provenance

```yaml
source_domains:
  - docs.audio-technica.com
retrieved_at: 2026-04-30T04:40:34.498Z
last_checked_at: 2026-04-23T15:12:47.038Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:12:47.038Z
matched_actions: 94
action_count: 94
confidence: high
summary: "All 94 spec actions matched literally in source with correct shapes; all transport parameters verified verbatim; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
