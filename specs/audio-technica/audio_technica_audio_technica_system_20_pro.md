---
spec_id: admin/audio-technica-system-20-pro
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio-Technica System 20 PRO Control Spec"
manufacturer: Audio-Technica
model_family: ATW-R1440
aliases: []
compatible_with:
  manufacturers:
    - Audio-Technica
  models:
    - ATW-R1440
    - ATW-RU14
    - ATW-RC14
    - ATW-T1401
    - ATW-T1402
    - ATW-T1406
    - ATW-T1407
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/all/System20PRO_IP_Control_Protocol_Specifications_V0.0.5_EN_web_240703.pdf
retrieved_at: 2026-04-29T13:02:30.787Z
last_checked_at: 2026-05-03T16:17:34.638Z
generated_at: 2026-05-03T16:17:34.638Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-03T16:17:34.638Z
  matched_actions: 163
  action_count: 163
  confidence: high
  summary: "All 163 spec actions verified against literal command strings in source; all transport parameters confirmed; full source command set is represented in spec actions and feedbacks."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Audio-Technica System 20 PRO Control Spec

## Summary
Audio-Technica System 20 PRO is a 2.4 GHz wireless microphone system comprising the ATW-R1440 receiver, ATW-RU14 receiver unit, ATW-RC14 receiver chassis, and ATW-T1401/T1402/T1406/T1407 transmitters. IP control uses TCP for set/get/request commands (port 17200) and UDP for unsolicited status-change notifications (port 17000). This spec covers the full command set: device settings, network config, audio routing, EQ (4-band parametric with presets), compressor, TX management, and status/level monitoring.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 17200
  # UDP notification port: 17000 (factory default, configurable via snoticeportno)
udp:
  notification_port: 17000
  multicast_address: 239.0.0.100
  # default multicast address; configurable via snoticeaddress (224.0.0.0-239.255.255.255)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable    # extensive get commands for all settings
  - levelable    # volume, gain, limiter, EQ, compressor controls
```

## Actions
```yaml
actions:
  # --- Device Settings ---
  - id: get_model_name
    label: Get Model Name
    kind: action
    command: gmymodel
    params: []
    description: Returns receiver model name (e.g. "ATW-R1440")

  - id: get_version
    label: Get Version Info
    kind: action
    command: gsys20version
    params: []
    description: Returns integrated file, MCU FW, RC FPGA, RU FPGA, RU MOD versions

  - id: get_device_name
    label: Get Device Name
    kind: action
    command: gmyname
    params: []
    description: Returns 8-character device name

  - id: set_device_name
    label: Set Device Name
    kind: action
    command: smyname
    params:
      - name: name
        type: string
        description: 8-char name (A-Z, _+-.#&, 0-9, space) in quotes
    description: Sets receiver device name

  - id: get_device_id
    label: Get Device ID
    kind: action
    command: gmydeviceid
    params: []
    description: Returns device ID (0-999)

  - id: set_device_id
    label: Set Device ID
    kind: action
    command: smydeviceid
    params:
      - name: id
        type: integer
        description: Device ID (0-999)

  - id: get_system20_id
    label: Get System20 ID
    kind: action
    command: gmyid
    params: []
    description: Returns 8-char hex System20 ID

  - id: get_auto_lock
    label: Get Auto Lock
    kind: action
    command: gautolock
    params: []
    description: Returns auto lock setting (0=OFF, 1=ON)

  - id: set_auto_lock
    label: Set Auto Lock
    kind: action
    command: sautolock
    params:
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_af_meter
    label: Get AF Meter Setting
    kind: action
    command: gafmeter
    params: []
    description: Returns AF meter mode (0=Pre, 1=Post)

  - id: set_af_meter
    label: Set AF Meter Setting
    kind: action
    command: safmeter
    params:
      - name: mode
        type: integer
        description: "0: Pre, 1: Post"

  - id: get_jog_dial
    label: Get Jog Dial Direction
    kind: action
    command: gdial
    params: []
    description: Returns dial direction (0=Default, 1=Invert)

  - id: set_jog_dial
    label: Set Jog Dial Direction
    kind: action
    command: sdial
    params:
      - name: direction
        type: integer
        description: "0: Default, 1: Invert"

  # --- Network ---
  - id: get_network
    label: Get Network Info
    kind: action
    command: gipnet
    params: []
    description: Returns IP mode, IP address, subnet mask, gateway, UPnP, MAC

  - id: set_network
    label: Set Network Info
    kind: action
    command: sipnet
    params:
      - name: ip_mode
        type: integer
        description: "0: Auto, 1: Static"
      - name: ip_address
        type: string
        description: IP address
      - name: subnet_mask
        type: string
        description: Subnet mask
      - name: gateway
        type: string
        description: Default gateway
      - name: upnp
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_notification_mode
    label: Get Notification Mode
    kind: action
    command: gnoticemode
    params: []
    description: "Returns notification mode (0: OFF, 1: ON)"

  - id: set_notification_mode
    label: Set Notification Mode
    kind: action
    command: snoticemode
    params:
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_level_notification
    label: Get Level Notification
    kind: action
    command: gnoticelevel
    params: []
    description: "Returns level notification (0: OFF, 1: ON)"

  - id: set_level_notification
    label: Set Level Notification
    kind: action
    command: snoticelevel
    params:
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_level_interval
    label: Get Level Notification Interval
    kind: action
    command: gnoticelevelinterval
    params: []
    description: "Returns interval (1-600; 1=100ms, 600=60000ms)"

  - id: set_level_interval
    label: Set Level Notification Interval
    kind: action
    command: snoticelevelinterval
    params:
      - name: interval
        type: integer
        description: "1-600 (1=100ms, 600=60000ms)"

  - id: get_multicast_address
    label: Get Multicast Address
    kind: action
    command: gnoticeaddress
    params: []
    description: Returns multicast address (224.0.0.0-239.255.255.255)

  - id: set_multicast_address
    label: Set Multicast Address
    kind: action
    command: snoticeaddress
    params:
      - name: address
        type: string
        description: Multicast address (224.0.0.0-239.255.255.255)

  - id: get_multicast_port
    label: Get Multicast Port
    kind: action
    command: gnoticeportno
    params: []
    description: Returns multicast port (1-65535)

  - id: set_multicast_port
    label: Set Multicast Port
    kind: action
    command: snoticeportno
    params:
      - name: port
        type: integer
        description: Port number (1-65535)

  - id: get_syslog
    label: Get Syslog Setting
    kind: action
    command: glogmode
    params: []
    description: "Returns syslog (0: OFF, 1: ON)"

  - id: set_syslog
    label: Set Syslog
    kind: action
    command: slogmode
    params:
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_ntp_mode
    label: Get NTP Setting
    kind: action
    command: gntpmode
    params: []
    description: "Returns NTP (0: OFF, 1: ON)"

  - id: set_ntp_mode
    label: Set NTP
    kind: action
    command: sntpmode
    params:
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_ntp_server
    label: Get NTP Server Address
    kind: action
    command: gntpserveraddress
    params: []
    description: Returns NTP server address

  - id: set_ntp_server
    label: Set NTP Server Address
    kind: action
    command: sntpserveraddress
    params:
      - name: address
        type: string
        description: NTP server address

  - id: get_ntp_port
    label: Get NTP Server Port
    kind: action
    command: gntpserverportno
    params: []
    description: Returns NTP server port (1-65535)

  - id: set_ntp_port
    label: Set NTP Server Port
    kind: action
    command: sntpserverportno
    params:
      - name: port
        type: integer
        description: Port number (1-65535)

  - id: get_timezone
    label: Get Timezone
    kind: action
    command: gntptimezone
    params: []
    description: Returns GMT offset (-12:00 to +14:00 in 30-min steps)

  - id: set_timezone
    label: Set Timezone
    kind: action
    command: sntptimezone
    params:
      - name: offset
        type: string
        description: "±HH:MM in 30-min steps (-12:00 to +14:00)"

  - id: get_dst_mode
    label: Get DST Setting
    kind: action
    command: gdstmode
    params: []
    description: "Returns DST (0: OFF, 1: ON)"

  - id: set_dst_mode
    label: Set DST
    kind: action
    command: sdstmode
    params:
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_dst_datetime
    label: Get DST Date/Time
    kind: action
    command: gdstdatetime
    params: []
    description: Returns DST start and end (MMDDHHmm format)

  - id: set_dst_datetime
    label: Set DST Date/Time
    kind: action
    command: sdstdatetime
    params:
      - name: start
        type: string
        description: Start date/time MMDDHHmm
      - name: end
        type: string
        description: End date/time MMDDHHmm

  # --- Communication ---
  - id: get_rf_mode
    label: Get RF Mode
    kind: action
    command: ghdmode
    params: []
    description: "Returns RF mode (1: Standard, 2: HD Mode)"

  - id: set_rf_mode
    label: Set RF Mode
    kind: action
    command: shdmode
    params:
      - name: mode
        type: integer
        description: "1: Standard, 2: HD Mode"

  - id: get_multitx
    label: Get MultiTx
    kind: action
    command: gmultitx
    params: []
    description: "Returns MultiTx (0: OFF, 1: ON)"

  - id: set_multitx
    label: Set MultiTx
    kind: action
    command: smultitx
    params:
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: request_pairing
    label: Request Pairing
    kind: action
    command: rpairing
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: tx_id
        type: string
        description: 2-char TX ID in quotes (A-Z, 0-9)

  - id: cancel_pairing
    label: Cancel Pairing
    kind: action
    command: rclpairing
    params: []

  - id: get_multipair_id
    label: Get Multipairing IDs
    kind: action
    command: gmultipairid
    params: []
    description: Returns up to 4 paired TX IDs per channel

  - id: delete_multipair_id
    label: Delete Multipairing IDs
    kind: action
    command: rdelmultipairid
    params: []

  # --- Audio ---
  - id: get_mixout
    label: Get Mixout
    kind: action
    command: gmixout
    params: []
    description: "Returns mixout (0: OFF, 1: ON)"

  - id: set_mixout
    label: Set Mixout
    kind: action
    command: smixout
    params:
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_ch_output_type
    label: Get Channel Output Type
    kind: action
    command: gchoutputtype
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "Returns output type (0: Line, 1: Mic)"

  - id: set_ch_output_type
    label: Set Channel Output Type
    kind: action
    command: schoutputtype
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: output_type
        type: integer
        description: "0: Line, 1: Mic"

  - id: get_ch_volume
    label: Get Channel Volume
    kind: action
    command: gchvolume
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "Returns output level (0=-20dB to 40=+20dB)"

  - id: set_ch_volume
    label: Set Channel Volume
    kind: action
    command: schvolume
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: level
        type: integer
        description: "0-40 (0=-20dB, 40=+20dB)"

  - id: get_ch_hpf
    label: Get Channel HPF
    kind: action
    command: gchhpf
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "Returns HPF (0: OFF, 1: ON)"

  - id: set_ch_hpf
    label: Set Channel HPF
    kind: action
    command: schhpf
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_ch_mixout
    label: Get Channel Mixout
    kind: action
    command: gchmixout
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "Returns channel mixout (0: OFF, 1: ON)"

  - id: set_ch_mixout
    label: Set Channel Mixout
    kind: action
    command: schmixout
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_mixout_volume
    label: Get Mixout Volume
    kind: action
    command: gmixoutvolume
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "Returns mixout volume (0=-30dB to 40=+10dB)"

  - id: set_mixout_volume
    label: Set Mixout Volume
    kind: action
    command: smixoutvolume
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: level
        type: integer
        description: "0-40 (0=-30dB, 40=+10dB)"

  - id: get_mix_output_type
    label: Get Mixout Output Type
    kind: action
    command: gmixoutputtype
    params: []
    description: "Returns mix output type (0: Line, 1: Mic)"

  - id: set_mix_output_type
    label: Set Mixout Output Type
    kind: action
    command: smixoutputtype
    params:
      - name: output_type
        type: integer
        description: "0: Line, 1: Mic"

  - id: get_limiter
    label: Get Limiter
    kind: action
    command: glimiter
    params: []
    description: "Returns limiter (0=-60dB to 60=0dB)"

  - id: set_limiter
    label: Set Limiter
    kind: action
    command: slimiter
    params:
      - name: level
        type: integer
        description: "0-60 (0=-60dB, 60=0dB)"

  - id: get_ch_mute
    label: Get Channel Mute
    kind: action
    command: gchmute
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "Returns mute (0: Unmute, 1: Mute)"

  - id: set_ch_mute
    label: Set Channel Mute
    kind: action
    command: schmute
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: mute
        type: integer
        description: "0: Unmute, 1: Mute"

  # --- TX ---
  - id: get_tx_status
    label: Get TX Connection Status
    kind: action
    command: gststx
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: Returns connected TX System20 ID

  - id: get_tx_model
    label: Get TX Model Name
    kind: action
    command: gtxmodel
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: identify_tx
    label: Identify TX
    kind: action
    command: rtxledflash
    params:
      - name: channel
        type: integer
        description: Channel number

  - id: get_tx_device_id
    label: Get TX Device ID
    kind: action
    command: gtxdeviceid
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: set_tx_device_id
    label: Set TX Device ID
    kind: action
    command: stxdeviceid
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: tx_id
        type: string
        description: 2-char ID in quotes (A-Z, 0-9)

  - id: get_tx_gain
    label: Get TX Gain
    kind: action
    command: gtxmicgain
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "Returns gain (0=-10dB to 15=+20dB, 2dB steps)"

  - id: set_tx_gain
    label: Set TX Gain
    kind: action
    command: stxmicgain
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: gain
        type: integer
        description: "0-15 (0=-10dB, 15=+20dB, 2dB steps)"

  - id: get_tx_input
    label: Get TX Input (BP only)
    kind: action
    command: gtxinput
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "Returns input (0: Mic, 1: Inst). Body-pack only."

  - id: set_tx_input
    label: Set TX Input (BP only)
    kind: action
    command: stxinput
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: input
        type: integer
        description: "0: Mic, 1: Inst"

  - id: get_tx_mute_mode
    label: Get TX Mute Mode
    kind: action
    command: gtxmutemode
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "BP/HH: 0=Enable, 1=Disable. BD/DS: 0=Toggle(mute), 1=Toggle(unmute), 2=Touch-to-talk, 3=Touch-to-mute, 4=Disable"

  - id: set_tx_mute_mode
    label: Set TX Mute Mode
    kind: action
    command: stxmutemode
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: mode
        type: integer
        description: See get_tx_mute_mode for values

  - id: get_tx_led
    label: Get TX LED Mode
    kind: action
    command: gtxled
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "BP/HH: 0=OFF, 1=ON. BD/DS: 0=Standard, 1=Conference"

  - id: set_tx_led
    label: Set TX LED Mode
    kind: action
    command: stxled
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: mode
        type: integer
        description: See get_tx_led for values

  - id: get_tx_battery_type
    label: Get TX Battery Type (HH/BP only)
    kind: action
    command: gtxbattery
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "0: Alkaline, 1: NiMH, 2: Lithium"

  - id: set_tx_battery_type
    label: Set TX Battery Type (HH/BP only)
    kind: action
    command: stxbattery
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: type
        type: integer
        description: "0: Alkaline, 1: NiMH, 2: Lithium"

  - id: get_tx_timeout
    label: Get TX Pairing Timeout
    kind: action
    command: gtxtimeout
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "0: OFF, 1: 1min, 2: 10min, 3: 60min"

  - id: set_tx_timeout
    label: Set TX Pairing Timeout
    kind: action
    command: stxtimeout
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: timeout
        type: integer
        description: "0: OFF, 1: 1min, 2: 10min, 3: 60min"

  - id: get_tx_id
    label: Get TX System20 ID
    kind: action
    command: gtxid
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: get_tx_version
    label: Get TX Version
    kind: action
    command: gtxsys20version
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: tx_factory_reset
    label: TX Factory Reset
    kind: action
    command: rtxfactoryreset
    params:
      - name: channel
        type: integer
        description: Channel number

  - id: tx_reboot
    label: TX Reboot
    kind: action
    command: rtxreboot
    params:
      - name: channel
        type: integer
        description: Channel number

  - id: get_tx_forced_mute
    label: Get TX External Mute
    kind: action
    command: gtxforcedmute
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "0: OFF, 1: Unmute, 2: Mute"

  - id: set_tx_forced_mute
    label: Set TX External Mute
    kind: action
    command: stxforcedmute
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: mute
        type: integer
        description: "0: OFF, 1: Unmute, 2: Mute"

  - id: get_tx_forced_mute_led
    label: Get TX External Mute LED
    kind: action
    command: gtxforcedmuteled
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "0: OFF, 1: Unmute, 2: Mute"

  - id: set_tx_forced_mute_led
    label: Set TX External Mute LED
    kind: action
    command: stxforcedmuteled
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: led
        type: integer
        description: "0: OFF, 1: Unmute, 2: Mute"

  - id: get_tx_mute_status
    label: Get TX Mute Status
    kind: action
    command: gtxmute
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "0: Unmute, 1: Mute"

  - id: get_tx_battery_level
    label: Get TX Battery Level
    kind: action
    command: glevelbatttx
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: Returns connection status, battery level (0-4), USB charging status

  # --- EQ ---
  - id: get_eq_enable
    label: Get EQ ON/OFF
    kind: action
    command: geqenable
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: set_eq_enable
    label: Set EQ ON/OFF
    kind: action
    command: seqenable
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_eq_band
    label: Get EQ Band ON/OFF
    kind: action
    command: geqband
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)

  - id: set_eq_band
    label: Set EQ Band ON/OFF
    kind: action
    command: seqband
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_eq_band_gain
    label: Get EQ Band Gain
    kind: action
    command: geqbandgain
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)

  - id: set_eq_band_gain
    label: Set EQ Band Gain
    kind: action
    command: seqbandgain
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
      - name: gain
        type: integer
        description: Gain value

  - id: get_eq_band_freq
    label: Get EQ Band Frequency
    kind: action
    command: geqbandfreq
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
    description: Frequency index 0-480 (see EQ Frequency Table in appendix)

  - id: set_eq_band_freq
    label: Set EQ Band Frequency
    kind: action
    command: seqbandfreq
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
      - name: freq_index
        type: integer
        description: Frequency index 0-480

  - id: get_eq_band_q
    label: Get EQ Band Q
    kind: action
    command: geqbandq
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
    description: Q index 0-31 (see EQ Quality Table in appendix)

  - id: set_eq_band_q
    label: Set EQ Band Q
    kind: action
    command: seqbandq
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
      - name: q_index
        type: integer
        description: Q index 0-31

  - id: get_eq_band_type
    label: Get EQ Band Filter Type
    kind: action
    command: geqbandtype
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
    description: "Band1: 0=HPF/1=LSH/2=PEAK. Band4: 0=LPF/1=HSH/2=PEAK. Bands 2-3: PEAK only."

  - id: set_eq_band_type
    label: Set EQ Band Filter Type
    kind: action
    command: seqbandtype
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
      - name: filter_type
        type: integer
        description: "Band1: 0=HPF/1=LSH/2=PEAK. Band4: 0=LPF/1=HSH/2=PEAK."

  - id: get_eq_last_preset
    label: Get Last EQ Preset
    kind: action
    command: geqlastpreset
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "0: Not recalled, 1-7: Preset number"

  - id: set_eq_last_preset
    label: Set Last EQ Preset
    kind: action
    command: seqlastpreset
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: preset
        type: integer
        description: Preset number (1-7)

  - id: recall_eq_preset
    label: Recall EQ Preset
    kind: action
    command: reqrecallpreset
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: preset
        type: integer
        description: Preset number (1-7)

  - id: get_eq_preset_enable
    label: Get EQ Preset ON/OFF
    kind: action
    command: geqpresetenable
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: set_eq_preset_enable
    label: Set EQ Preset ON/OFF
    kind: action
    command: seqpresetenable
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_eq_preset_band
    label: Get EQ Preset Band ON/OFF
    kind: action
    command: geqpresetband
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)

  - id: set_eq_preset_band
    label: Set EQ Preset Band ON/OFF
    kind: action
    command: seqpresetband
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_eq_preset_band_gain
    label: Get EQ Preset Band Gain
    kind: action
    command: geqpresetbandgain
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)

  - id: set_eq_preset_band_gain
    label: Set EQ Preset Band Gain
    kind: action
    command: seqpresetbandgain
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
      - name: gain
        type: integer
        description: Gain value

  - id: get_eq_preset_band_freq
    label: Get EQ Preset Band Frequency
    kind: action
    command: geqpresetbandfreq
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
    description: Frequency index 0-480

  - id: set_eq_preset_band_freq
    label: Set EQ Preset Band Frequency
    kind: action
    command: seqpresetbandfreq
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
      - name: freq_index
        type: integer
        description: Frequency index 0-480

  - id: get_eq_preset_band_q
    label: Get EQ Preset Band Q
    kind: action
    command: geqpresetbandq
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)

  - id: set_eq_preset_band_q
    label: Set EQ Preset Band Q
    kind: action
    command: seqpresetbandq
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
      - name: q_index
        type: integer
        description: Q index 0-31

  - id: get_eq_preset_band_type
    label: Get EQ Preset Band Filter Type
    kind: action
    command: geqpresetbandtype
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)

  - id: set_eq_preset_band_type
    label: Set EQ Preset Band Filter Type
    kind: action
    command: seqpresetbandtype
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: band
        type: integer
        description: Band number (1-4)
      - name: filter_type
        type: integer
        description: See get_eq_band_type for values

  - id: get_eq_preset_name
    label: Get EQ Preset Name
    kind: action
    command: geqpresetname
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: Returns 12-char preset name

  - id: set_eq_preset_name
    label: Set EQ Preset Name
    kind: action
    command: seqpresetname
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: name
        type: string
        description: 12-char name in quotes (A-Z, 0-9, _+-.#&, space)

  - id: get_eq_preset_type
    label: Get EQ Preset Type
    kind: action
    command: geqpresettype
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "0: Factory Preset, 1: User Preset"

  # --- COMP ---
  - id: get_comp_enable
    label: Get COMP ON/OFF
    kind: action
    command: gcompenable
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: set_comp_enable
    label: Set COMP ON/OFF
    kind: action
    command: scompenable
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_comp_ratio
    label: Get COMP Ratio
    kind: action
    command: gcompratio
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "0=1:1.4, 1=1:2, 2=1:4, 3=1:6, 4=1:10, 5=1:inf"

  - id: set_comp_ratio
    label: Set COMP Ratio
    kind: action
    command: scompratio
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: ratio
        type: integer
        description: "0-5"

  - id: get_comp_threshold
    label: Get COMP Threshold
    kind: action
    command: gcompthreshold
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: set_comp_threshold
    label: Set COMP Threshold
    kind: action
    command: scompthreshold
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: threshold
        type: integer
        description: Threshold value

  - id: get_comp_attack
    label: Get COMP Attack
    kind: action
    command: gcompattack
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "0=0ms, 1=0.25ms, 2=0.5ms, 3=1ms, 4=2ms, 5=4ms, 6=8ms, 7=16ms, 8=32ms, 9=100ms"

  - id: set_comp_attack
    label: Set COMP Attack
    kind: action
    command: scompattack
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: attack
        type: integer
        description: "0-9"

  - id: get_comp_release
    label: Get COMP Release
    kind: action
    command: gcomprelease
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "0=50ms, 1=100ms, 2=200ms, 3=400ms, 4=800ms, 5=1000ms, 6=2000ms"

  - id: set_comp_release
    label: Set COMP Release
    kind: action
    command: scomprelease
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: release
        type: integer
        description: "0-6"

  - id: get_comp_gain
    label: Get COMP Gain
    kind: action
    command: gcompgain
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: set_comp_gain
    label: Set COMP Gain
    kind: action
    command: scompgain
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: gain
        type: integer
        description: Gain value

  - id: get_comp_last_preset
    label: Get Last COMP Preset
    kind: action
    command: gcomplastpreset
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "0: Not recalled, 1-6: Preset number"

  - id: set_comp_last_preset
    label: Set Last COMP Preset
    kind: action
    command: scomplastpreset
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: preset
        type: integer
        description: Preset number (1-6)

  - id: recall_comp_preset
    label: Recall COMP Preset
    kind: action
    command: rcomprecallpreset
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: preset
        type: integer
        description: Preset number (1-6)

  - id: get_comp_preset_enable
    label: Get COMP Preset ON/OFF
    kind: action
    command: gcomppresetenable
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: set_comp_preset_enable
    label: Set COMP Preset ON/OFF
    kind: action
    command: scomppresetenable
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: enabled
        type: integer
        description: "0: OFF, 1: ON"

  - id: get_comp_preset_ratio
    label: Get COMP Preset Ratio
    kind: action
    command: gcomppresetratio
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: set_comp_preset_ratio
    label: Set COMP Preset Ratio
    kind: action
    command: scomppresetratio
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: ratio
        type: integer
        description: "0-5"

  - id: get_comp_preset_threshold
    label: Get COMP Preset Threshold
    kind: action
    command: gcomppresetthreshold
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: set_comp_preset_threshold
    label: Set COMP Preset Threshold
    kind: action
    command: scomppresetthreshold
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: threshold
        type: integer

  - id: get_comp_preset_attack
    label: Get COMP Preset Attack
    kind: action
    command: gcomppresetattack
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: set_comp_preset_attack
    label: Set COMP Preset Attack
    kind: action
    command: scomppresetattack
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: attack
        type: integer
        description: "0-9"

  - id: get_comp_preset_release
    label: Get COMP Preset Release
    kind: action
    command: gcomppresetrelease
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: set_comp_preset_release
    label: Set COMP Preset Release
    kind: action
    command: scomppresetrelease
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: release
        type: integer
        description: "0-6"

  - id: get_comp_preset_gain
    label: Get COMP Preset Gain
    kind: action
    command: gcomppresetgain
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)

  - id: set_comp_preset_gain
    label: Set COMP Preset Gain
    kind: action
    command: scomppresetgain
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: gain
        type: integer

  - id: get_comp_preset_name
    label: Get COMP Preset Name
    kind: action
    command: gcomppresetname
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: Returns 12-char preset name

  - id: set_comp_preset_name
    label: Set COMP Preset Name
    kind: action
    command: scomppresetname
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
      - name: name
        type: string
        description: 12-char name in quotes

  - id: get_comp_preset_type
    label: Get COMP Preset Type
    kind: action
    command: gcomppresettype
    params:
      - name: channel
        type: integer
        description: Channel number (1-4)
    description: "0: Factory Preset, 1: User Preset"

  # --- Status ---
  - id: get_rxlink_info
    label: Get RxLink Info
    kind: action
    command: grxlinkinfo
    params: []
    description: Returns daisy-chained receiver link info (up to 5 units)

  - id: get_ru_status
    label: Get RU Connection Status
    kind: action
    command: grusts
    params: []
    description: "Returns RU connection status and FW version consistency"

  - id: get_lock_status
    label: Get Lock Status
    kind: action
    command: glock
    params: []
    description: "0: Not locked, 1: Locked"

  - id: get_busy_status
    label: Get Busy Status
    kind: action
    command: gbusy
    params: []
    description: "0: Not busy, 1: Busy"

  - id: get_alert_params
    label: Get RSSI/Battery Alert Params
    kind: action
    command: galertval
    params: []
    description: Returns RSSI alert threshold (-90 to -60) and battery alert threshold (1-3)

  - id: set_alert_params
    label: Set RSSI/Battery Alert Params
    kind: action
    command: salertval
    params:
      - name: rssi_threshold
        type: integer
        description: RSSI alert threshold (-90 to -60)
      - name: battery_threshold
        type: integer
        description: Battery alert threshold (1-3)

  # --- Other ---
  - id: start_rf_scan
    label: Start/Stop RF Scan
    kind: action
    command: rsys20rfscan
    params:
      - name: action
        type: integer
        description: "0: End, 1: Start"

  - id: identify_rx
    label: Identify RX
    kind: action
    command: rdflp
    params:
      - name: start
        type: integer
        description: "0 or 1: Start identify"

  - id: recall_preset
    label: Recall Preset
    kind: action
    command: rrecallpreset
    params: []
    description: Recall RX preset

  - id: factory_reset
    label: Factory Reset
    kind: action
    command: rfactoryreset
    params: []

  - id: reboot
    label: Reboot
    kind: action
    command: rreboot
    params: []
```

## Feedbacks
```yaml
feedbacks:
  # --- Device change notifications (UDP via MD prefix) ---
  - id: device_name_changed
    type: string
    command: nmyname
    description: Device name changed notification

  - id: device_id_changed
    type: integer
    command: nmydeviceid
    description: Device ID changed notification (0-999)

  - id: auto_lock_changed
    type: enum
    values: [off, on]
    command: nautolock

  - id: af_meter_changed
    type: enum
    values: [pre, post]
    command: nafmeter

  - id: dial_changed
    type: enum
    values: [default, invert]
    command: ndial

  - id: network_changed
    type: object
    command: nipnet
    description: Network info changed (IP mode, address, mask, gateway, UPnP, MAC)

  - id: notification_mode_changed
    type: enum
    values: [off, on]
    command: nnoticemode

  - id: level_notification_changed
    type: enum
    values: [off, on]
    command: nnoticelevel

  - id: level_interval_changed
    type: integer
    command: nnoticelevelinterval

  - id: multicast_address_changed
    type: string
    command: nnoticeaddress

  - id: multicast_port_changed
    type: integer
    command: nnoticeportno

  - id: syslog_changed
    type: enum
    values: [off, on]
    command: nlogmode

  - id: ntp_mode_changed
    type: enum
    values: [off, on]
    command: nntpmode

  - id: ntp_server_changed
    type: string
    command: nntpserveraddress

  - id: ntp_port_changed
    type: integer
    command: nntpserverportno

  - id: timezone_changed
    type: string
    command: nntptimezone

  - id: dst_mode_changed
    type: enum
    values: [off, on]
    command: ndstmode

  - id: dst_datetime_changed
    type: string
    command: ndstdatetime

  - id: rf_mode_changed
    type: enum
    values: [standard, hd_mode]
    command: nhdmode

  - id: multitx_changed
    type: enum
    values: [off, on]
    command: nmultitx

  - id: pairing_status
    type: object
    command: npairing
    description: Pairing result per channel (result code, TX ID)

  - id: multipair_id_changed
    type: object
    command: nmultipairid
    description: Multipairing ID change notification

  - id: mixout_changed
    type: enum
    values: [off, on]
    command: nmixout

  - id: ch_output_type_changed
    type: enum
    values: [line, mic]
    command: nchoutputtype

  - id: ch_volume_changed
    type: integer
    command: nchvolume
    description: Channel volume changed (0-40)

  - id: ch_hpf_changed
    type: enum
    values: [off, on]
    command: nchhpf

  - id: ch_mixout_changed
    type: enum
    values: [off, on]
    command: nchmixout

  - id: mixout_volume_changed
    type: integer
    command: nmixoutvolume

  - id: mix_output_type_changed
    type: enum
    values: [line, mic]
    command: nmixoutputtype

  - id: limiter_changed
    type: integer
    command: nlimiter
    description: Limiter setting changed (0-60)

  - id: ch_mute_changed
    type: enum
    values: [unmute, mute]
    command: nchmute

  - id: tx_status_changed
    type: object
    command: nststx
    description: TX connection status changed

  - id: tx_device_id_changed
    type: string
    command: ntxdeviceid

  - id: tx_gain_changed
    type: integer
    command: ntxmicgain

  - id: tx_input_changed
    type: enum
    values: [mic, inst]
    command: ntxinput

  - id: tx_mute_mode_changed
    type: integer
    command: ntxmutemode

  - id: tx_led_changed
    type: integer
    command: ntxled

  - id: tx_battery_type_changed
    type: enum
    values: [alkaline, nimh, lithium]
    command: ntxbattery

  - id: tx_timeout_changed
    type: integer
    command: ntxtimeout

  - id: tx_forced_mute_changed
    type: integer
    command: ntxforcedmute

  - id: tx_forced_mute_led_changed
    type: integer
    command: nforcedmuteled

  - id: tx_mute_status_changed
    type: enum
    values: [unmute, mute]
    command: ntxmute

  - id: tx_battery_level_changed
    type: object
    command: nlevelbatttx
    description: TX battery level change (connection status, battery level, USB charging status)

  - id: eq_enable_changed
    type: integer
    command: neqenable

  - id: eq_band_changed
    type: integer
    command: neqband

  - id: eq_band_gain_changed
    type: integer
    command: neqbandgain

  - id: eq_band_freq_changed
    type: integer
    command: neqbandfreq

  - id: eq_band_q_changed
    type: integer
    command: neqbandq

  - id: eq_band_type_changed
    type: integer
    command: neqbandtype

  - id: eq_last_preset_changed
    type: integer
    command: neqlastpreset

  - id: eq_preset_enable_changed
    type: integer
    command: neqpresetenable

  - id: eq_preset_band_changed
    type: integer
    command: neqpresetband

  - id: eq_preset_band_gain_changed
    type: integer
    command: neqpresetbandgain

  - id: eq_preset_band_freq_changed
    type: integer
    command: neqpresetbandfreq

  - id: eq_preset_band_q_changed
    type: integer
    command: neqpresetbandq

  - id: eq_preset_band_type_changed
    type: integer
    command: neqpresetbandtype

  - id: eq_preset_name_changed
    type: string
    command: neqpresetname

  - id: comp_enable_changed
    type: enum
    values: [off, on]
    command: ncompenable

  - id: comp_ratio_changed
    type: integer
    command: ncompratio

  - id: comp_threshold_changed
    type: integer
    command: ncompthreshold

  - id: comp_attack_changed
    type: integer
    command: ncompattack

  - id: comp_release_changed
    type: integer
    command: ncomprelease

  - id: comp_gain_changed
    type: integer
    command: ncompgain

  - id: comp_last_preset_changed
    type: integer
    command: ncomplastpreset

  - id: comp_preset_enable_changed
    type: enum
    values: [off, on]
    command: ncomppresetenable

  - id: comp_preset_ratio_changed
    type: integer
    command: ncomppresetratio

  - id: comp_preset_threshold_changed
    type: integer
    command: ncomppresetthreshold

  - id: comp_preset_attack_changed
    type: integer
    command: ncomppresetattack

  - id: comp_preset_release_changed
    type: integer
    command: ncomppresetrelease

  - id: comp_preset_gain_changed
    type: integer
    command: ncomppresetgain

  - id: comp_preset_name_changed
    type: string
    command: ncomppresetname

  - id: rxlink_info_changed
    type: object
    command: nrxlinkinfo

  - id: ru_status_changed
    type: object
    command: nrusts

  - id: lock_status_changed
    type: enum
    values: [unlocked, locked]
    command: nlock

  - id: busy_status_changed
    type: enum
    values: [not_busy, busy]
    command: nbusy

  - id: level_all
    type: object
    command: nsys20levelall
    transport: udp
    description: Periodic level notification (AF, RF, RSSI, COMP levels per channel)

  - id: applog
    type: object
    command: napplog
    description: Application log notification

  - id: alert_params_changed
    type: object
    command: nalertval

  - id: rf_scan_result
    type: object
    command: nsys20rfscan
    transport: udp
    description: RF scan result (frequency range, RSSI data)

  - id: reboot_completed
    type: object
    command: nreboot
    description: Reboot completion with operation type and reset type
```

## Variables
```yaml
variables:
  - id: ch_volume
    label: Channel Volume
    type: integer
    min: 0
    max: 40
    unit: dB
    scale: "-20 to +20"
    description: Per-channel output level

  - id: mixout_volume
    label: Mixout Volume
    type: integer
    min: 0
    max: 40
    unit: dB
    scale: "-30 to +10"

  - id: limiter
    label: Limiter Threshold
    type: integer
    min: 0
    max: 60
    unit: dB
    scale: "-60 to 0"

  - id: tx_gain
    label: TX Gain
    type: integer
    min: 0
    max: 15
    unit: dB
    scale: "-10 to +20 (2dB steps)"

  - id: eq_band_gain
    label: EQ Band Gain
    type: integer
    description: Per-channel, per-band EQ gain

  - id: comp_threshold
    label: COMP Threshold
    type: integer
    description: Per-channel compressor threshold

  - id: comp_gain
    label: COMP Gain
    type: integer
    description: Per-channel compressor gain

  - id: level_interval
    label: Level Notification Interval
    type: integer
    min: 1
    max: 600
    unit: ms
    scale: "100-60000"
```

## Events
```yaml
events:
  - id: status_change_notification
    description: >
      UDP multicast notifications prefixed with "MD" sent when any device setting changes.
      Covers all n-prefixed commands. Requires multicast group registration on host.
      Transport is UDP to the configured multicast address/port.

  - id: level_notification
    description: >
      Periodic UDP level data (nsys20levelall) sent at configurable intervals.
      Contains AF/RF levels, RSSI, communication quality, audio quality, and COMP metrics per channel.

  - id: rf_scan_notification
    description: >
      UDP RF scan results (nsys20rfscan) sent every 10 seconds during active scan.
      Data may span multiple divided messages (CS/CM/CE continue-select markers).
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety interlocks or power-on sequencing.
# Commands rfactoryreset, rtxfactoryreset, rreboot, rtxreboot are destructive
# but no confirmation/interlock procedure documented.
```

## Notes
- TCP connection limited to one concurrent session. New connections rejected if one is active.
- Commands are case-sensitive. Space (0x20) is the field delimiter; comma (0x2C) separates parameters within a field. All commands terminated with CR (0x0D).
- Handshake Select field: O=One-Way, S=ACK/NAK (ACK/NAK preferred for reliable control).
- Commands are processed asynchronously; next command can be sent without waiting for ACK/NAK/Answer, though BUSY (error code 90) may be returned.
- Divided messages use Continue Select markers: NC=none, CS=head, CM=middle, CE=end.
- Error codes: 01=Syntax error, 02=Invalid command, 04=Parameter error, 90=Busy, 99=Other.
- UDP notifications use "MD" prefix format: `MD <command> <RxLinkID> <UnitID> <ContinueSelect> <params> CR`.
- RF scan results sent via UDP every 10 seconds, may require divided message reassembly.
- EQ frequency and Q values use lookup tables (0–480 for frequency mapping 20Hz–20kHz; 0–31 for Q mapping 0.30–60).
- EQ filter types per band: Band1 supports HPF/LSH/PEAK; Band4 supports LPF/HSH/PEAK; Bands 2–3 fixed at PEAK.
- Some TX commands apply only to specific transmitter types (BP=body-pack, HH=handheld, BD=boundary, DS=desk stand).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: maximum command throughput / rate limiting not specified -->
<!-- UNRESOLVED: COMP threshold numeric range mapping to dB not explicitly stated -->
<!-- UNRESOLVED: COMP gain numeric range mapping to dB not explicitly stated -->
<!-- UNRESOLVED: EQ band gain numeric range not explicitly stated -->

## Provenance

```yaml
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/all/System20PRO_IP_Control_Protocol_Specifications_V0.0.5_EN_web_240703.pdf
retrieved_at: 2026-04-29T13:02:30.787Z
last_checked_at: 2026-05-03T16:17:34.638Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-03T16:17:34.638Z
matched_actions: 163
action_count: 163
confidence: high
summary: "All 163 spec actions verified against literal command strings in source; all transport parameters confirmed; full source command set is represented in spec actions and feedbacks."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
