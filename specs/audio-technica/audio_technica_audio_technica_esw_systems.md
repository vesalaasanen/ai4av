---
spec_id: admin/audio-technica-esw-systems
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio-Technica Engineered Sound Wireless Systems Control Spec"
manufacturer: Audio-Technica
model_family: ESW-R4180DAN
aliases: []
compatible_with:
  manufacturers:
    - Audio-Technica
  models:
    - ESW-R4180DAN
    - ESW-CHG4
    - ESW-CHG5
    - ESW-T4101
    - ESW-T4102
    - ESW-T4106
    - ESW-T4107
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/all/ESW_IP_Control_Specification_V1_EN_web_230131.pdf
retrieved_at: 2026-05-03T16:24:43.318Z
last_checked_at: 2026-05-03T16:28:17.924Z
generated_at: 2026-05-03T16:28:17.924Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - rpresetcall
verification:
  verdict: verified
  checked_at: 2026-05-03T16:28:17.924Z
  matched_actions: 134
  action_count: 134
  confidence: high
  summary: "All 134 spec actions matched verbatim in the source command list; only rpresetcall is in source but not spec, below the short threshold."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Audio-Technica Engineered Sound Wireless Systems Control Spec

## Summary
IP control specification for Audio-Technica Engineered Sound Wireless (ESW) systems, covering the ESW-R4180DAN receiver unit (RU), ESW-CHG4/ESW-CHG5 chargers (CHG), and ESW-T4101/4102/4106/4107 transmitters (TX). Uses TCP for control commands (set/get/request) and UDP for status change notifications. ASCII-based command protocol with space-delimited fields and CR termination.

<!-- UNRESOLVED: firmware version compatibility range not stated -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 17200
  # UDP notification port: 17000 (factory default, configurable via snoticeportno)
  # UDP CHG linkage port: 17001 (fixed)
  # UDP synchronous port: 17100 (fixed)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable    # extensive get commands for device state
  - levelable    # volume, gain, RF power control
  - powerable    # reboot commands present
```

## Actions
```yaml
# Command format: <command> <handshake:O|S> <modelId:0000> <unitId:00> <continue:NC> [params]<CR>
# O = One-Way, S = ACK/NAK method
# All commands use TCP unless noted (UDP notifications prefixed with "MD")
# RUD = ESW-R4180DAN, CHG = ESW-CHG4/ESW-CHG5, TX = ESW-T4101/4102/4106/4107

# ── Management ──
- id: gmymodel
  label: Get Model Name
  kind: action
  description: Acquire model name and DECT mode
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: gmyversion
  label: Get Version Information
  kind: action
  description: Acquire file/MCU/FPGA/DECT version strings
  transport: tcp
  target: [RUD]
  params: []

- id: smyname
  label: Set Device Name
  kind: action
  description: Set RU or CHG device name
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: name
      type: string
      description: Device name (ASCII 0x20-0x7E excl 0x22)

- id: gmyname
  label: Get Device Name
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: slocationname
  label: Set Location Name
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: location_name
      type: string
      description: Location name (ASCII 0x20-0x7E excl 0x22)

- id: glocationname
  label: Get Location Name
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: schname
  label: Set Channel Name
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer
      description: Channel number (1-8)
    - name: ch_name
      type: string
      description: Channel name

- id: gchname
  label: Get Channel Name
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer
      description: Channel number (1-8)

- id: smydeviceid
  label: Set Device ID
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: device_id
      type: integer
      description: Device ID (0-255)

- id: gmydeviceid
  label: Get Device ID
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

# ── Communication ──
- id: shdmode
  label: Set RF Mode
  kind: action
  description: Set RF mode. ~10s delay before ACK.
  transport: tcp
  target: [RUD]
  params:
    - name: rf_mode
      type: integer
      description: "1=Standard, 2=HD mode"

- id: ghdmode
  label: Get RF Mode
  kind: action
  transport: tcp
  target: [RUD]
  params: []

- id: srfpower
  label: Set Transmission Output
  kind: action
  description: Set RF transmission power level (value depends on DECT mode)
  transport: tcp
  target: [RUD]
  params:
    - name: rf_power
      type: integer
      description: "0=MAX, 1=HIGH/Max, 2=HIGH/unavailable, 3=MID, 4=LOW, 5=MIN"

- id: grfpower
  label: Get Transmission Output
  kind: action
  transport: tcp
  target: [RUD]
  params: []

# ── Audio ──
- id: schmute
  label: Set Channel Mute
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer
      description: Channel number (1-8)
    - name: mute
      type: integer
      description: "0=Enable (unmute), 1=Mute"

- id: gchmute
  label: Get Channel Mute
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer
      description: Channel number (1-8)

- id: schvolume
  label: Set Channel Volume
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer
      description: Channel number (1-8)
    - name: volume
      type: integer
      description: "0 to 40. 0=-30dB, 30=0dB, 40=+10dB (1dB steps)"

- id: gchvolume
  label: Get Channel Volume
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer

- id: schhpf
  label: Set Channel High Pass Filter
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer
    - name: hpf
      type: integer
      description: "0=OFF, 1=80Hz, 2=120Hz, 3=160Hz"

- id: gchhpf
  label: Get Channel High Pass Filter
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer

- id: schafmetersetting
  label: Set Channel Meter
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer
    - name: meter_setting
      type: integer
      description: "0=PRE, 1=POST"

- id: gchafmetersetting
  label: Get Channel Meter
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer

- id: smixout
  label: Set Ch8 Output
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: mode
      type: integer
      description: "0=Discrete, 1=MIXOUT"

- id: gmixout
  label: Get Ch8 Output
  kind: action
  transport: tcp
  target: [RUD]
  params: []

- id: schmixout
  label: Set Channel Mix Assignment
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer
    - name: mixout
      type: integer
      description: "0=OFF, 1=ON"

- id: gchmixout
  label: Get Channel Mix Assignment
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer

# ── Roaming ──
- id: sroamingmode
  label: Set Roaming Mode
  kind: action
  description: ~15s delay before ACK.
  transport: tcp
  target: [RUD]
  params:
    - name: roaming_mode
      type: integer
      description: "0=Disable, 1=Enable"

- id: groamingmode
  label: Get Roaming Mode
  kind: action
  transport: tcp
  target: [RUD]
  params: []

- id: sroamingthreshold
  label: Set Roaming Threshold
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: threshold
      type: string
      description: "0=OFF, -85 to -50 (dBm, 1dBm steps)"

- id: groamingthreshold
  label: Get Roaming Threshold
  kind: action
  transport: tcp
  target: [RUD]
  params: []

# ── Master Table (Normal) ──
- id: smastermixout
  label: Set Master Table Ch8 Output
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: mode
      type: integer
      description: "0=Discrete, 1=MIXOUT"

- id: gmastermixout
  label: Get Master Table Ch8 Output
  kind: action
  transport: tcp
  target: [RUD]
  params: []

- id: smasterchmixout
  label: Set Master Table Channel Mix Assignment
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer
    - name: mixout
      type: integer
      description: "0=OFF, 1=ON"

- id: gmasterchmixout
  label: Get Master Table Channel Mix Assignment
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer

# ── Preset (Normal) ──
- id: spresetname
  label: Set Preset Name
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: preset_no
      type: integer
      description: Preset number (1-8)
    - name: preset_name
      type: string

- id: gpresetname
  label: Get Preset Name
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: preset_no
      type: integer

- id: spresetmixout
  label: Set Preset Ch8 Output
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: preset_no
      type: integer
    - name: mode
      type: integer
      description: "0=Discrete, 1=MIXOUT"

- id: gpresetmixout
  label: Get Preset Ch8 Output
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: preset_no
      type: integer

- id: spresetchmixout
  label: Set Preset Channel Mix Assignment
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: preset_no
      type: integer
    - name: ch_no
      type: integer
    - name: mixout
      type: integer
      description: "0=OFF, 1=ON"

- id: gpresetchmixout
  label: Get Preset Channel Mix Assignment
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: preset_no
      type: integer
    - name: ch_no
      type: integer

# ── Master Table (Roaming) ──
- id: srmgmastermixout
  label: Set Roaming Master Table Ch8 Output
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: mode
      type: integer
      description: "0=Discrete, 1=MIXOUT"

- id: grmgmastermixout
  label: Get Roaming Master Table Ch8 Output
  kind: action
  transport: tcp
  target: [RUD]
  params: []

- id: srmgmasterchmixout
  label: Set Roaming Master Table Channel Mix Assignment
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer
    - name: mixout
      type: integer
      description: "0=OFF, 1=ON"

- id: grmgmasterchmixout
  label: Get Roaming Master Table Channel Mix Assignment
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer

# ── Preset (Roaming) ──
- id: srmgpresetname
  label: Set Roaming Preset Name
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: preset_no
      type: integer
      description: Roaming preset number (1-8)
    - name: preset_name
      type: string

- id: grmgpresetname
  label: Get Roaming Preset Name
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: preset_no
      type: integer

- id: srmgpresetmixout
  label: Set Roaming Preset Ch8 Output
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: preset_no
      type: integer
    - name: mode
      type: integer
      description: "0=Discrete, 1=MIXOUT"

- id: grmgpresetmixout
  label: Get Roaming Preset Ch8 Output
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: preset_no
      type: integer

- id: srmgpresetchmixout
  label: Set Roaming Preset Channel Mix Assignment
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: preset_no
      type: integer
    - name: ch_no
      type: integer
    - name: mixout
      type: integer
      description: "0=OFF, 1=ON"

- id: grmgpresetchmixout
  label: Get Roaming Preset Channel Mix Assignment
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: preset_no
      type: integer
    - name: ch_no
      type: integer

# ── Level ──
- id: glevelrf
  label: Get RF Level
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer

- id: glevelafrx
  label: Get AF Level
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer
      description: "0=Mixout, 1-8=Ch1-Ch8"

- id: glevelbatttx
  label: Get TX Battery Level
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer

- id: glevelbatt
  label: Get CHG Battery Level
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
      description: Charging port number (1-8)

# ── Status ──
- id: gststx
  label: Get TX Status
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer

# ── Operation ──
- id: rreboot
  label: Reboot Request
  kind: action
  description: Reboots RU or CHG. ACK received before reboot. Connection disconnects.
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: rfactoryreset
  label: Factory Reset Request
  kind: action
  description: Requires reboot after execution to apply factory defaults.
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: rledflash
  label: LED Lighting Request
  kind: action
  description: Identify flash stops ~5s after start.
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: target
      type: integer
      description: "0=System (RU only), 1-8=CHG port number"
    - name: operation
      type: integer
      description: "0=Flash stop, 1=Identify flash start"

- id: rmastercall
  label: Master Table Call Request
  kind: action
  description: ~5s to ACK. Triggers Last Preset Call Notification.
  transport: tcp
  target: [RUD]
  params: []

- id: rlastpreset
  label: Last Preset Call Request
  kind: action
  transport: tcp
  target: [RUD]
  params: []

- id: glastpreset
  label: Get Last Preset Call
  kind: action
  transport: tcp
  target: [RUD]
  params: []

- id: rudpecho
  label: UDP Transmission Request
  kind: action
  description: Triggers UDP Transmission Notification.
  transport: tcp
  target: [RUD, CHG]
  params: []

# ── Network ──
- id: sipnet
  label: Set IP Network Information
  kind: action
  description: Requires reboot to apply.
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: ip_config_mode
      type: integer
      description: "0=Auto, 1=Static"
    - name: ip_address
      type: string
    - name: subnet_mask
      type: string
    - name: gateway
      type: string
    - name: upnp
      type: integer
      description: "0=OFF, 1=ON"

- id: gipnet
  label: Get IP Network Information
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

# ── Notification Settings ──
- id: snoticemode
  label: Set Notification Mode
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: mode
      type: integer
      description: "0=OFF, 1=ON"

- id: gnoticemode
  label: Get Notification Mode
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: snoticelevel
  label: Set Level Notification
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: level_notification
      type: integer
      description: "0=OFF, 1=ON"

- id: gnoticelevel
  label: Get Level Notification
  kind: action
  transport: tcp
  target: [RUD]
  params: []

- id: snoticelevelinterval
  label: Set Level Notification Interval
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: interval
      type: integer
      description: "1-600 (100ms to 60000ms, 100ms/step)"

- id: gnoticelevelinterval
  label: Get Level Notification Interval
  kind: action
  transport: tcp
  target: [RUD]
  params: []

- id: snoticeaddress
  label: Set Multicast Address
  kind: action
  description: Requires reboot to apply.
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: address
      type: string
      description: Multicast address (224.0.0.0 to 239.255.255.255)

- id: gnoticeaddress
  label: Get Multicast Address
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: snoticeportno
  label: Set Multicast Port Number
  kind: action
  description: Requires reboot to apply.
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port
      type: integer
      description: "1-65535"

- id: gnoticeportno
  label: Get Multicast Port Number
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

# ── Log / NTP / DST ──
- id: slogmode
  label: Set System Log Mode
  kind: action
  description: Requires reboot to apply.
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: syslog_mode
      type: integer
      description: "0=OFF, 1=ON"

- id: glogmode
  label: Get System Log Mode
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: sntpmode
  label: Set NTP Mode
  kind: action
  description: Requires reboot to apply.
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: ntp_mode
      type: integer
      description: "0=OFF, 1=ON"

- id: gntpmode
  label: Get NTP Mode
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: sntpserveraddress
  label: Set NTP Server Address
  kind: action
  description: Requires reboot to apply.
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: address
      type: string

- id: gntpserveraddress
  label: Get NTP Server Address
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: sntpserverportno
  label: Set NTP Server Port
  kind: action
  description: Requires reboot to apply.
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port
      type: integer
      description: "1-65535"

- id: gntpserverportno
  label: Get NTP Server Port
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: sntptimezone
  label: Set NTP Time Zone
  kind: action
  description: Requires reboot to apply.
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: timezone
      type: string
      description: "-12:00 to +14:00 (30min steps)"

- id: gntptimezone
  label: Get NTP Time Zone
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: sdstmode
  label: Set Daylight Saving Time Mode
  kind: action
  description: Requires reboot to apply.
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: dst_mode
      type: integer
      description: "0=OFF, 1=ON"

- id: gdstmode
  label: Get Daylight Saving Time Mode
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: sdstdatetime
  label: Set DST Start/End Dates
  kind: action
  description: Requires reboot to apply.
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: start_date
      type: string
      description: "MMDDHHmm (30min steps)"
    - name: end_date
      type: string
      description: "MMDDHHmm (30min steps)"

- id: gdstdatetime
  label: Get DST Start/End Dates
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

# ── Dante ──
- id: gdantenet
  label: Get Dante IP Setting
  kind: action
  transport: tcp
  target: [RUD]
  params: []

- id: gdantedevicename
  label: Get Dante Device Name
  kind: action
  transport: tcp
  target: [RUD]
  params: []

- id: gdantechannellabel
  label: Get Dante Channel Label
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: ch_no
      type: integer

- id: gdantemodelname
  label: Get Dante Model Name
  kind: action
  transport: tcp
  target: [RUD]
  params: []

- id: gdanteversion
  label: Get Dante FW Version
  kind: action
  transport: tcp
  target: [RUD]
  params: []

# ── TX ──
- id: gtxmodel
  label: Get TX Model Name
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
      description: Charging port (1-8)

- id: gtxversion
  label: Get TX Version
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer

- id: stxname
  label: Set TX Device Name
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
    - name: tx_name
      type: string

- id: gtxname
  label: Get TX Device Name
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port_or_ch
      type: integer
      description: "RU: Ch No (1-8), CHG: Charging port (1-8)"

- id: stxlocationname
  label: Set TX Location Name
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
    - name: location_name
      type: string

- id: gtxlocationname
  label: Get TX Location Name
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port_or_ch
      type: integer

- id: stxdeviceid
  label: Set TX Device ID
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
    - name: device_id
      type: integer
      description: "0-255"

- id: gtxdeviceid
  label: Get TX Device ID
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port_or_ch
      type: integer

- id: gtxkind
  label: Get TX Type
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port_or_ch
      type: integer
      description: "Returns: 0=HH, 1=BP, 2=BD, 3=DS"

- id: stxmicgain
  label: Set TX Gain
  kind: action
  description: BP only.
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port_or_ch
      type: integer
    - name: mic_gain
      type: integer
      description: "1=-9dB to 11=+21dB (3dB steps)"

- id: gtxmicgain
  label: Get TX Gain
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port_or_ch
      type: integer

- id: stxintmicgain
  label: Set TX Internal Mic Gain
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port_or_ch
      type: integer
    - name: int_mic_gain
      type: integer
      description: "1=-9dB to 11=+21dB (3dB steps)"

- id: gtxintmicgain
  label: Get TX Internal Mic Gain
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port_or_ch
      type: integer

- id: stxmicpolar
  label: Set TX Directivity
  kind: action
  description: BD only.
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
    - name: polar
      type: integer
      description: "0=Omni, 1=Cardioid"

- id: gtxmicpolar
  label: Get TX Directivity
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port_or_ch
      type: integer

- id: stxmutedisable
  label: Set TX Mute Function
  kind: action
  description: BD only.
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
    - name: mute_function
      type: integer

- id: gtxmutedisable
  label: Get TX Mute Function
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port_or_ch
      type: integer

- id: stxmutemode
  label: Set TX Mute Mode
  kind: action
  description: BD and DS only.
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
    - name: mute_mode
      type: integer
      description: "0=Toggle, 1=Push to Talk, 2=Push to Mute"

- id: gtxmutemode
  label: Get TX Mute Mode
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port_or_ch
      type: integer

- id: stxmutedefault
  label: Set TX Default Mute
  kind: action
  description: BD and DS only. Valid only when mute mode is Toggle.
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
    - name: default_mute
      type: integer
      description: "0=Default Unmute, 1=Default Mute"

- id: gtxmutedefault
  label: Get TX Default Mute
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: port_or_ch
      type: integer

- id: stxmutecolor
  label: Set TX Mute LED Color
  kind: action
  description: BD and DS only.
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
    - name: led_color
      type: integer
      description: "0=OFF, 1=Red, 2=Green, 3=Yellow, 4=Blue, 5=Magenta, 6=Cyan, 7=White"

- id: gtxmutecolor
  label: Get TX Mute LED Color
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer

- id: stxunmutecolor
  label: Set TX Unmute LED Color
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
    - name: led_color
      type: integer

- id: gtxunmutecolor
  label: Get TX Unmute LED Color
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer

- id: stxbattalert
  label: Set TX Battery Level Alert
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
    - name: alert_time
      type: integer
      description: "0=OFF, 1=60min before, 2=90min before, 3=120min before"

- id: gtxbattalert
  label: Get TX Battery Level Alert
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer

- id: rtxledflash
  label: TX LED Lighting Request
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
    - name: flash_pattern
      type: integer
      description: "0=No action, 1=Identify, 2=Pattern 2"

- id: rtxreboot
  label: TX Reboot Request
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer

- id: rtxfactoryreset
  label: TX Factory Reset Request
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer

# ── CHG ──
- id: gchgmodelname
  label: Get CHG Model Name
  kind: action
  transport: tcp
  target: [CHG]
  params: []

- id: gchgversionarray
  label: Get CHG FW Version Array
  kind: action
  transport: tcp
  target: [CHG]
  params: []

- id: gchgvdevicearray
  label: Get CHG Device Linked Info
  kind: action
  transport: tcp
  target: [CHG]
  params: []

- id: schgportch
  label: Set CHG Port Assignment
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: charging_port_no
      type: integer
    - name: assign_ch
      type: integer
      description: "0=Not assigned, 1-8=CH number"

- id: gchgportch
  label: Get CHG Port Assignment
  kind: action
  transport: tcp
  target: [CHG]
  params: []

- id: schglinkbtnlock
  label: Set CHG Link Button Lock
  kind: action
  transport: tcp
  target: [CHG]
  params:
    - name: lock_mode
      type: integer
      description: "0=Always Unlock, 1=Hold 2s to unlock, 2=Always Lock"

- id: gchglinkbtnlock
  label: Get CHG Link Button Lock
  kind: action
  transport: tcp
  target: [CHG]
  params: []

# ── Other ──
- id: sledoff
  label: Set LED
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params:
    - name: led_mode
      type: integer
      description: "0=LED ON, 1=LED OFF"

- id: gledoff
  label: Get LED
  kind: action
  transport: tcp
  target: [RUD, CHG]
  params: []

- id: rwalktest
  label: Walktest Request
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: walktest_mode
      type: integer
      description: "0=Normal operation, 1=Walktest operation"

- id: rsitesurvey
  label: DECT RF Scan Request
  kind: action
  transport: tcp
  target: [RUD]
  params:
    - name: scan_mode
      type: integer
      description: "0=Normal, 1=DECT RF scan"
    - name: threshold
      type: string
      description: "0 or -82 to -62 dBm"
```

## Feedbacks
```yaml
# TCP Answer responses (get command results)
- id: model_name
  type: string
  description: Response to gmymodel - model name and DECT mode

- id: version_info
  type: string
  description: Response to gmyversion - file/MCU/FPGA/DECT versions

- id: device_name
  type: string
  description: Response to gmyname

- id: location_name
  type: string
  description: Response to glocationname

- id: channel_name
  type: string
  description: Response to gchname

- id: device_id
  type: integer
  description: Response to gmydeviceid (1-255)

- id: rf_mode
  type: enum
  values: ["1", "2"]
  description: "1=Standard, 2=HD mode"

- id: rf_power
  type: enum
  values: ["0", "1", "2", "3", "4", "5"]
  description: "0=MAX, 1=HIGH, 2=unavailable, 3=MID, 4=LOW, 5=MIN"

- id: channel_mute
  type: enum
  values: ["0", "1"]
  description: "0=Enable (unmute), 1=Mute"

- id: channel_volume
  type: integer
  description: "0-40. 0=-30dB, 30=0dB, 40=+10dB"

- id: channel_hpf
  type: enum
  values: ["0", "1", "2", "3"]
  description: "0=OFF, 1=80Hz, 2=120Hz, 3=160Hz"

- id: ch8_output
  type: enum
  values: ["0", "1"]
  description: "0=Discrete, 1=MIXOUT"

- id: channel_mix_assignment
  type: enum
  values: ["0", "1"]
  description: "0=OFF, 1=ON"

- id: roaming_mode
  type: enum
  values: ["0", "1"]
  description: "0=Disable, 1=Enable"

- id: roaming_threshold
  type: string
  description: "0=OFF, -85 to -50 dBm"

- id: rf_level
  type: integer
  description: "RSSI: 0=no LINK, 1=-90dBm+, 2=-84dBm+, 3=-78dBm+, 4=-72dBm+, 5=-66dBm+, 6=-60dBm+, 7=-54dBm+"

- id: af_level
  type: integer
  description: "0=no LINK, 1=-50dBFS+, 2=-40dBFS+, 3=-30dBFS+, 4=-20dBFS+, 5=-12dBFS+, 6=-6dBFS+, 7=-1dBFS+"

- id: tx_battery_level
  type: integer
  description: "0-100 percent"

- id: tx_battery_life
  type: string
  description: "HHMM remaining (0000-9959)"

- id: tx_status
  type: string
  description: "LINK status, DECT ID, external mic status"

- id: ip_network_info
  type: string
  description: "IP config mode, address, subnet, gateway, UPnP, MAC"

- id: notification_mode
  type: enum
  values: ["0", "1"]
  description: "0=OFF, 1=ON"

- id: last_preset
  type: string
  description: "0=Master Table, 1-8=Preset number"

- id: tx_type
  type: enum
  values: ["0", "1", "2", "3"]
  description: "0=HH, 1=BP, 2=BD, 3=DS"

- id: tx_gain
  type: integer
  description: "1=-9dB to 11=+21dB (3dB steps)"

- id: chg_battery_level
  type: string
  description: "Port status, battery level (0-100), cycle, health, time to full, temp, error flag"

- id: ack
  type: enum
  values: ["ACK", "NAK"]
  description: "ACK or NAK with error code (01=Syntax, 02=Invalid command, 04=Parameter error, 90=Busy, 99=Other)"

- id: dante_net
  type: string
  description: "Dante IP config, address, subnet, gateway, MAC, VLAN mode"

- id: dante_version
  type: string
  description: "Dante FW and HW version"
```

## Variables
```yaml
# UNRESOLVED: no distinct settable variables beyond what is covered by set commands in Actions
```

## Events
```yaml
# UDP multicast notifications (prefixed with "MD" in protocol)
- id: nmyname
  description: Device name changed notification
  transport: udp

- id: nlocationname
  description: Location name changed notification
  transport: udp

- id: nchname
  description: Channel name changed notification
  transport: udp

- id: nmydeviceid
  description: Device ID changed notification
  transport: udp

- id: nhdmode
  description: RF mode changed notification
  transport: udp

- id: nrfpower
  description: Transmission output changed notification
  transport: udp

- id: nchmute
  description: Channel mute changed notification
  transport: udp

- id: nchvolume
  description: Channel volume changed notification
  transport: udp

- id: nchhpf
  description: Channel HPF changed notification
  transport: udp

- id: nchafmetersetting
  description: Channel meter setting changed notification
  transport: udp

- id: nmixout
  description: Ch8 output changed notification
  transport: udp

- id: nchmixout
  description: Channel mix assignment changed notification
  transport: udp

- id: nroamingmode
  description: Roaming mode changed notification
  transport: udp

- id: nroamingthreshold
  description: Roaming threshold changed notification
  transport: udp

- id: nmastermixout
  description: Master table Ch8 output changed notification
  transport: udp

- id: nmasterchmixout
  description: Master table channel mix assignment changed notification
  transport: udp

- id: npresetname
  description: Preset name changed notification
  transport: udp

- id: npresetmixout
  description: Preset Ch8 output changed notification
  transport: udp

- id: npresetchmixout
  description: Preset channel mix assignment changed notification
  transport: udp

- id: nlevelbatttx
  description: TX battery level changed notification
  transport: udp

- id: nlevelbatt
  description: CHG battery level updated notification
  transport: udp

- id: nlevelall
  description: All levels periodic notification (interval configurable)
  transport: udp

- id: nststx
  description: TX status changed notification
  transport: udp

- id: nreboot
  description: Reboot notification (local/remote, reset type)
  transport: udp

- id: nfactoryreset
  description: Factory reset notification
  transport: udp

- id: nlastpreset
  description: Last preset call notification (after master/preset call)
  transport: udp

- id: nudpecho
  description: UDP transmission notification
  transport: udp

- id: nipnet
  description: IP network info changed notification
  transport: udp

- id: nnoticemode
  description: Notification mode changed notification
  transport: udp

- id: nnoticelevel
  description: Level notification setting changed notification
  transport: udp

- id: nnoticelevelinterval
  description: Level notification interval changed notification
  transport: udp

- id: nnoticeaddress
  description: Multicast address changed notification
  transport: udp

- id: nnoticeportno
  description: Multicast port changed notification
  transport: udp

- id: nlogmode
  description: System log mode changed notification
  transport: udp

- id: nntpmode
  description: NTP mode changed notification
  transport: udp

- id: nntpserveraddress
  description: NTP server address changed notification
  transport: udp

- id: nntpserverportno
  description: NTP server port changed notification
  transport: udp

- id: nntptimezone
  description: NTP time zone changed notification
  transport: udp

- id: ndstmode
  description: DST mode changed notification
  transport: udp

- id: ndstdatetime
  description: DST start/end dates changed notification
  transport: udp

- id: ntxname
  description: TX device name changed notification
  transport: udp

- id: ntxlocationname
  description: TX location name changed notification
  transport: udp

- id: ntxdeviceid
  description: TX device ID changed notification
  transport: udp

- id: ntxmicgain
  description: TX gain changed notification
  transport: udp

- id: ntxintmicgain
  description: TX internal mic gain changed notification
  transport: udp

- id: ntxmicpolar
  description: TX directivity changed notification
  transport: udp

- id: ntxmutedisable
  description: TX mute function changed notification
  transport: udp

- id: ntxmutemode
  description: TX mute mode changed notification
  transport: udp

- id: ntxmutedefault
  description: TX default mute changed notification
  transport: udp

- id: ntxmutecolor
  description: TX mute LED color changed notification
  transport: udp

- id: ntxunmutecolor
  description: TX unmute LED color changed notification
  transport: udp

- id: ntxbattalert
  description: TX battery alert changed notification
  transport: udp

- id: nchgportch
  description: CHG port assignment changed notification
  transport: udp

- id: nchglinkbtnlock
  description: CHG link button lock changed notification
  transport: udp

- id: nledoff
  description: LED setting changed notification
  transport: udp

- id: nwalktest
  description: Walktest periodic RSSI notification (per channel, dBm)
  transport: udp

- id: nsitesurvey
  description: DECT RF scan periodic notification (carriers used, free, used1, used2, busy)
  transport: udp

- id: napplog
  description: Application log notification (UDP, unaffected by notification settings)
  transport: udp

- id: nrmgmastermixout
  description: Roaming master table Ch8 output changed notification
  transport: udp

- id: nrmgmasterchmixout
  description: Roaming master table channel mix assignment changed notification
  transport: udp

- id: nrmgpresetname
  description: Roaming preset name changed notification
  transport: udp

- id: nrmgpresetmixout
  description: Roaming preset Ch8 output changed notification
  transport: udp

- id: nrmgpresetchmixout
  description: Roaming preset channel mix assignment changed notification
  transport: udp
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes: rreboot disconnects TCP and reboots device. rfactoryreset requires
# subsequent reboot to apply factory defaults. shdmode takes ~10s for ACK.
# sroamingmode takes ~15s for ACK. rmastercall takes ~5s for ACK.
# Connection limited to 1 host at a time. Commands are asynchronously processed;
# next command can be sent without waiting for ACK/NAK, but some return NAK 90 (BUSY).
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Command format: `<command><SP><handshake(O|S)><SP>0000<SP>00<SP>NC<SP>[params]<CR(0x0D)>`
- Handshake modes: `O` = One-Way (no response expected), `S` = ACK/NAK method
- ACK format: `<command><SP>0000<SP>00<SP>NC<SP>ACK<CR>`
- NAK format: `<command><SP>0000<SP>00<SP>NC<SP>NAK<SP><error_code><CR>`
- UDP notification format: `MD<SP><command><SP>0000<SP>00<SP>NC<SP>[params]<CR>`
- Divided messages use Continue Select: `CS` (head), `CM` (middle), `CE` (end)
- Max message length: 287 bytes including CR
- TCP port 17200 is fixed and cannot be changed
- UDP notification port 17000 is configurable (factory default 17000)
- Many settings require reboot to take effect (IP network, multicast address/port, syslog, NTP, DST)
- Notification Mode must be ON (1) for most UDP notifications to be sent
- Level notifications additionally require Level Notification Setting ON and are sent at configurable intervals
- TX commands addressed via RU use channel number; via CHG use charging port number

<!-- UNRESOLVED: exact LED color value mapping for TX mute/unmute LED beyond the listed values not fully documented -->
<!-- UNRESOLVED: DECT mode value mapping (returned by gmymodel) ranges not fully specified -->
<!-- UNRESOLVED: maximum number of simultaneous TX links per RU not stated -->

## Provenance

```yaml
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/all/ESW_IP_Control_Specification_V1_EN_web_230131.pdf
retrieved_at: 2026-05-03T16:24:43.318Z
last_checked_at: 2026-05-03T16:28:17.924Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-03T16:28:17.924Z
matched_actions: 134
action_count: 134
confidence: high
summary: "All 134 spec actions matched verbatim in the source command list; only rpresetcall is in source but not spec, below the short threshold."
```

## Known Gaps

```yaml
- rpresetcall
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
