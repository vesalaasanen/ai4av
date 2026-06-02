---
spec_id: admin/audio-technica-esw-systems
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio-Technica ESW Systems Control Spec"
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
last_checked_at: 2026-06-02T17:21:31.567Z
generated_at: 2026-06-02T17:21:31.567Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version ranges per model not stated; voltage/current/power spec not stated."
  - "source describes behavior around rmastercall / rpresetcall producing"
  - "source does not document additional safety interlocks (e.g. RF exposure, lockout-tagout) for control commands."
  - "firmware version compatibility ranges per model not stated in source; voltage, current, power, and weight specifications not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:31.567Z
  matched_actions: 197
  action_count: 197
  confidence: medium
  summary: "All 197 spec actions matched literally in source; transport ports 17200/17000/17001/17100 confirmed; coverage exceeds source table of 196 commands. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Audio-Technica ESW Systems Control Spec

## Summary
IP control protocol for Audio-Technica Engineered Sound Wireless (ESW) Systems. Covers the RUD receiver (ESW-R4180DAN), CHG chargers (ESW-CHG4/CHG5) and TX transmitters (ESW-T4101/4102/4106/4107). Control plane uses TCP port 17200 (set/get/request commands, ACK/NAK/Answer); status notifications multicast via UDP port 17000 (configurable). Commands are ASCII, space-delimited, CR-terminated. One host connection at a time.

<!-- UNRESOLVED: firmware version ranges per model not stated; voltage/current/power spec not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 17200           # TCP control, fixed
  udp_ports:
    - 17000             # notification (configurable)
    - 17001             # CHG linkage, fixed
    - 17100             # sync between RUs, fixed
auth:
  type: none  # inferred: no auth procedure in source
# Framing: ASCII, space-delimited (0x20), CR (0x0D) terminated; max 287 bytes
```

## Traits
```yaml
- powerable       # inferred: rreboot, rfactoryreset present
- queryable       # inferred: g* commands return state
- levelable       # inferred: schvolume (Ch volume), schhpf (HPF) present
- routable        # inferred: smixout, schmixout (Ch8 output, mix assignment) present
```

## Actions
```yaml
# ---------- Management ----------
- id: gmymodel
  label: Model Name Acquisition
  kind: query
  command: "gmymodel O 0000 00 NC"
  params: []

- id: gmyversion
  label: Version Information Acquisition
  kind: query
  command: "gmyversion O 0000 00 NC"
  params: []

- id: smyname
  label: Device Name Setting
  kind: action
  command: 'smyname S 0000 00 NC "{name}"'
  params:
    - name: name
      type: string
      description: Device name; ASCII 0x20-0x7E excluding 0x22

- id: gmyname
  label: Device Name Acquisition
  kind: query
  command: "gmyname O 0000 00 NC"
  params: []

- id: nmyname
  label: Device Name Notification
  kind: notify
  command: "MD nmyname 0000 00 NC"
  params: []

- id: slocationname
  label: Location Name Setting
  kind: action
  command: 'slocationname S 0000 00 NC "{location}"'
  params:
    - name: location
      type: string

- id: glocationname
  label: Location Name Acquisition
  kind: query
  command: "glocationname O 0000 00 NC"
  params: []

- id: nlocationname
  label: Location Name Notification
  kind: notify
  command: "MD nlocationname 0000 00 NC"
  params: []

- id: schname
  label: Channel Name Setting
  kind: action
  command: 'schname S 0000 00 NC {ch},"{ch_name}"'
  params:
    - name: ch
      type: integer
    - name: ch_name
      type: string

- id: gchname
  label: Channel Name Acquisition
  kind: query
  command: "gchname O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: nchname
  label: Channel Name Notification
  kind: notify
  command: "MD nchname 0000 00 NC"
  params: []

- id: smydeviceid
  label: Device ID Setting
  kind: action
  command: "smydeviceid S 0000 00 NC {id}"
  params:
    - name: id
      type: integer
      description: 0 to 255

- id: gmydeviceid
  label: Device ID Acquisition
  kind: query
  command: "gmydeviceid O 0000 00 NC"
  params: []

- id: nmydeviceid
  label: Device ID Notification
  kind: notify
  command: "MD nmydeviceid 0000 00 NC"
  params: []

# ---------- Communication ----------
- id: shdmode
  label: RF Mode Setting
  kind: action
  command: "shdmode S 0000 00 NC {mode}"
  params:
    - name: mode
      type: integer
      description: 1=Standard, 2=HD mode (ACK ~10s)

- id: ghdmode
  label: RF Mode Acquisition
  kind: query
  command: "ghdmode O 0000 00 NC"
  params: []

- id: nhdmode
  label: RF Mode Notification
  kind: notify
  command: "MD nhdmode 0000 00 NC"
  params: []

- id: srfpower
  label: Transmission Output Setting
  kind: action
  command: "srfpower S 0000 00 NC {power}"
  params:
    - name: power
      type: integer
      description: 0=MAX, 1=HIGH/Max, 2=HIGH or NAK, 3=MID, 4=LOW, 5=MIN (validity depends on DECT mode)

- id: grfpower
  label: Transmission Output Acquisition
  kind: query
  command: "grfpower O 0000 00 NC"
  params: []

- id: nrfpower
  label: Transmission Output Notification
  kind: notify
  command: "MD nrfpower 0000 00 NC"
  params: []

# ---------- Audio ----------
- id: schmute
  label: Channel Mute Setting
  kind: action
  command: "schmute S 0000 00 NC {ch},{mute}"
  params:
    - name: ch
      type: integer
    - name: mute
      type: integer
      description: 0=Enable, 1=Disable (per source)

- id: gchmute
  label: Channel Mute Acquisition
  kind: query
  command: "gchmute O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: nchmute
  label: Channel Mute Notification
  kind: notify
  command: "MD nchmute 0000 00 NC"
  params: []

- id: schvolume
  label: Channel Volume Setting
  kind: action
  command: "schvolume S 0000 00 NC {ch},{volume}"
  params:
    - name: ch
      type: integer
    - name: volume
      type: integer
      description: 0 (-30 dB) to 30 (0 dB); up to 40 (+10 dB), 1 dB step

- id: gchvolume
  label: Channel Volume Acquisition
  kind: query
  command: "gchvolume O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: nchvolume
  label: Channel Volume Notification
  kind: notify
  command: "MD nchvolume 0000 00 NC"
  params: []

- id: schhpf
  label: Channel High Pass Filter Setting
  kind: action
  command: "schhpf S 0000 00 NC {ch},{hpf}"
  params:
    - name: ch
      type: integer
    - name: hpf
      type: integer
      description: 0=OFF, 1=80Hz, 2=120Hz, 3=160Hz

- id: gchhpf
  label: Channel High Pass Filter Acquisition
  kind: query
  command: "gchhpf O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: nchhpf
  label: Channel High Pass Filter Notification
  kind: notify
  command: "MD nchhpf 0000 00 NC"
  params: []

- id: schafmetersetting
  label: Channel Meter Setting
  kind: action
  command: "schafmetersetting S 0000 00 NC {ch},{setting}"
  params:
    - name: ch
      type: integer
    - name: setting
      type: integer
      description: 0=PRE, 1=POST

- id: gchafmetersetting
  label: Channel Meter Acquisition
  kind: query
  command: "gchafmetersetting O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: nchafmetersetting
  label: Channel Meter Notification
  kind: notify
  command: "MD nchafmetersetting 0000 00 NC"
  params: []

- id: smixout
  label: Ch8 Output Setting
  kind: action
  command: "smixout S 0000 00 NC {setting}"
  params:
    - name: setting
      type: integer
      description: 0=Discrete, 1=Mixout

- id: gmixout
  label: Ch8 Output Acquisition
  kind: query
  command: "gmixout O 0000 00 NC"
  params: []

- id: nmixout
  label: Ch8 Output Notification
  kind: notify
  command: "MD nmixout 0000 00 NC"
  params: []

- id: schmixout
  label: Channel Mix Assignment Setting
  kind: action
  command: "schmixout S 0000 00 NC {ch},{setting}"
  params:
    - name: ch
      type: integer
    - name: setting
      type: integer
      description: 0=OFF, 1=ON

- id: gchmixout
  label: Channel Mix Assignment Acquisition
  kind: query
  command: "gchmixout O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: nchmixout
  label: Channel Mix Assignment Notification
  kind: notify
  command: "MD nchmixout 0000 00 NC"
  params: []

# ---------- Roaming ----------
- id: sroamingmode
  label: Roaming Setting
  kind: action
  command: "sroamingmode S 0000 00 NC {mode}"
  params:
    - name: mode
      type: integer
      description: 0=Disable, 1=Enable (ACK ~15s)

- id: groamingmode
  label: Roaming Acquisition
  kind: query
  command: "groamingmode O 0000 00 NC"
  params: []

- id: nroamingmode
  label: Roaming Notification
  kind: notify
  command: "MD nroamingmode 0000 00 NC"
  params: []

- id: sroamingthreshold
  label: Roaming Threshold Setting
  kind: action
  command: "sroamingthreshold S 0000 00 NC {ch},{threshold}"
  params:
    - name: ch
      type: integer
    - name: threshold
      type: integer
      description: 0=OFF, -85 to -50 (dBm, 1 dB step)

- id: groamingthreshold
  label: Roaming Threshold Acquisition
  kind: query
  command: "groamingthreshold O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: nroamingthreshold
  label: Roaming Threshold Notification
  kind: notify
  command: "MD nroamingthreshold 0000 00 NC"
  params: []

# ---------- Master Table (Normal) ----------
- id: smastermixout
  label: Master Table Ch8 Output Setting
  kind: action
  command: "smastermixout S 0000 00 NC {setting}"
  params:
    - name: setting
      type: integer
      description: 0=Discrete, 1=Mixout

- id: gmastermixout
  label: Master Table Ch8 Output Acquisition
  kind: query
  command: "gmastermixout O 0000 00 NC"
  params: []

- id: nmastermixout
  label: Master Table Ch8 Output Notification
  kind: notify
  command: "MD nmastermixout 0000 00 NC"
  params: []

- id: smasterchmixout
  label: Master Table Channel Mix Assignment Setting
  kind: action
  command: "smasterchmixout S 0000 00 NC {ch},{setting}"
  params:
    - name: ch
      type: integer
    - name: setting
      type: integer
      description: 0=OFF, 1=ON

- id: gmasterchmixout
  label: Master Table Channel Mix Assignment Acquisition
  kind: query
  command: "gmasterchmixout O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: nmasterchmixout
  label: Master Table Channel Mix Assignment Notification
  kind: notify
  command: "MD nmasterchmixout 0000 00 NC"
  params: []

# ---------- Preset (Normal) ----------
- id: spresetname
  label: Preset Name Setting
  kind: action
  command: 'spresetname S 0000 00 NC {preset},"{name}"'
  params:
    - name: preset
      type: integer
      description: 1 to 8
    - name: name
      type: string

- id: gpresetname
  label: Preset Name Acquisition
  kind: query
  command: "gpresetname O 0000 00 NC {preset}"
  params:
    - name: preset
      type: integer

- id: npresetname
  label: Preset Name Notification
  kind: notify
  command: "MD npresetname 0000 00 NC"
  params: []

- id: spresetmixout
  label: Preset Ch8 Output Setting
  kind: action
  command: "spresetmixout S 0000 00 NC {preset},{setting}"
  params:
    - name: preset
      type: integer
    - name: setting
      type: integer
      description: 0=Discrete, 1=Mixout

- id: gpresetmixout
  label: Preset Ch8 Output Acquisition
  kind: query
  command: "gpresetmixout O 0000 00 NC {preset}"
  params:
    - name: preset
      type: integer

- id: npresetmixout
  label: Preset Ch8 Output Notification
  kind: notify
  command: "MD npresetmixout 0000 00 NC"
  params: []

- id: spresetchmixout
  label: Preset Channel Mix Assignment Setting
  kind: action
  command: "spresetchmixout S 0000 00 NC {preset},{ch},{setting}"
  params:
    - name: preset
      type: integer
    - name: ch
      type: integer
    - name: setting
      type: integer
      description: 0=OFF, 1=ON

- id: gpresetchmixout
  label: Preset Channel Mix Assignment Acquisition
  kind: query
  command: "gpresetchmixout O 0000 00 NC {preset},{ch}"
  params:
    - name: preset
      type: integer
    - name: ch
      type: integer

- id: npresetchmixout
  label: Preset Channel Mix Assignment Notification
  kind: notify
  command: "MD npresetchmixout 0000 00 NC"
  params: []

# ---------- Master Table (Roaming) ----------
- id: srmgmastermixout
  label: Roaming Master Table Ch8 Output Setting
  kind: action
  command: "srmgmastermixout S 0000 00 NC {setting}"
  params:
    - name: setting
      type: integer
      description: 0=Discrete, 1=Mixout

- id: grmgmastermixout
  label: Roaming Master Table Ch8 Output Acquisition
  kind: query
  command: "grmgmastermixout O 0000 00 NC"
  params: []

- id: nrmgmastermixout
  label: Roaming Master Table Ch8 Output Notification
  kind: notify
  command: "MD nrmgmastermixout 0000 00 NC"
  params: []

- id: srmgmasterchmixout
  label: Roaming Master Table Channel Mix Assignment Setting
  kind: action
  command: "srmgmasterchmixout S 0000 00 NC {ch},{setting}"
  params:
    - name: ch
      type: integer
    - name: setting
      type: integer
      description: 0=OFF, 1=ON

- id: grmgmasterchmixout
  label: Roaming Master Table Channel Mix Assignment Acquisition
  kind: query
  command: "grmgmasterchmixout O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: nrmgmasterchmixout
  label: Roaming Master Table Channel Mix Assignment Notification
  kind: notify
  command: "MD nrmgmasterchmixout 0000 00 NC"
  params: []

# ---------- Preset (Roaming) ----------
- id: srmgpresetname
  label: Roaming Preset Name Setting
  kind: action
  command: 'srmgpresetname S 0000 00 NC {preset},"{name}"'
  params:
    - name: preset
      type: integer
      description: 1 to 8
    - name: name
      type: string

- id: grmgpresetname
  label: Roaming Preset Name Acquisition
  kind: query
  command: "grmgpresetname O 0000 00 NC {preset}"
  params:
    - name: preset
      type: integer

- id: nrmgpresetname
  label: Roaming Preset Name Notification
  kind: notify
  command: "MD nrmgpresetname 0000 00 NC"
  params: []

- id: srmgpresetmixout
  label: Roaming Preset Ch8 Output Setting
  kind: action
  command: "srmgpresetmixout S 0000 00 NC {preset},{setting}"
  params:
    - name: preset
      type: integer
    - name: setting
      type: integer
      description: 0=Discrete, 1=Mixout

- id: grmgpresetmixout
  label: Roaming Preset Ch8 Output Acquisition
  kind: query
  command: "grmgpresetmixout O 0000 00 NC {preset}"
  params:
    - name: preset
      type: integer

- id: nrmgpresetmixout
  label: Roaming Preset Ch8 Output Notification
  kind: notify
  command: "MD nrmgpresetmixout 0000 00 NC"
  params: []

- id: srmgpresetchmixout
  label: Roaming Preset Channel Mix Assignment Setting
  kind: action
  command: "srmgpresetchmixout S 0000 00 NC {preset},{ch},{setting}"
  params:
    - name: preset
      type: integer
    - name: ch
      type: integer
    - name: setting
      type: integer
      description: 0=OFF, 1=ON

- id: grmgpresetchmixout
  label: Roaming Preset Channel Mix Assignment Acquisition
  kind: query
  command: "grmgpresetchmixout O 0000 00 NC {preset},{ch}"
  params:
    - name: preset
      type: integer
    - name: ch
      type: integer

- id: nrmgpresetchmixout
  label: Roaming Preset Channel Mix Assignment Notification
  kind: notify
  command: "MD nrmgpresetchmixout 0000 00 NC"
  params: []

# ---------- Level ----------
- id: glevelrf
  label: RF Level Acquisition
  kind: query
  command: "glevelrf O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: glevelafrx
  label: AF Level Acquisition
  kind: query
  command: "glevelafrx O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer
      description: 0=Mixout, 1-8=Ch1-Ch8

- id: glevelbatttx
  label: TX Battery Level Acquisition
  kind: query
  command: "glevelbatttx O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: nlevelbatttx
  label: TX Battery Level Notification
  kind: notify
  command: "MD nlevelbatttx 0000 00 NC"
  params: []

- id: nlevelall
  label: All Levels Notification
  kind: notify
  command: "MD nlevelall 0000 00 NC"
  params: []

- id: glevelbatt
  label: Battery Level Acquisition (CHG)
  kind: query
  command: "glevelbatt O 0000 00 NC {port}"
  params:
    - name: port
      type: integer
      description: 1 to 8

- id: nlevelbatt
  label: Battery Level Notification (CHG)
  kind: notify
  command: "MD nlevelbatt 0000 00 NC"
  params: []

# ---------- Status ----------
- id: gststx
  label: TX Status Acquisition
  kind: query
  command: "gststx O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: nststx
  label: TX Status Notification
  kind: notify
  command: "MD nststx 0000 00 NC"
  params: []

# ---------- Operation ----------
- id: rreboot
  label: Reboot Request
  kind: action
  command: "rreboot S 0000 00 NC"
  params: []

- id: nreboot
  label: Reboot Notification
  kind: notify
  command: "MD nreboot 0000 00 NC"
  params: []

- id: rfactoryreset
  label: Factory Reset Request
  kind: action
  command: "rfactoryreset S 0000 00 NC"
  params: []

- id: nfactoryreset
  label: Factory Reset Notification
  kind: notify
  command: "MD nfactoryreset 0000 00 NC"
  params: []

- id: rledflash
  label: LED Lighting Request
  kind: action
  command: "rledflash S 0000 00 NC {target},{operation}"
  params:
    - name: target
      type: integer
      description: 0=System (RU only), 1-8=CHG Port Number
    - name: operation
      type: integer
      description: 0=Stop, 1=Identify (auto-stops ~5s)

- id: rmastercall
  label: Master Table Call Request
  kind: action
  command: "rmastercall S 0000 00 NC"
  params: []

- id: rpresetcall
  label: Preset Call Request
  kind: action
  command: "rpresetcall S 0000 00 NC {preset}"
  params:
    - name: preset
      type: integer
      description: 1 to 8 (ACK ~5s)

- id: glastpreset
  label: Last Preset Call Acquisition
  kind: query
  command: "glastpreset O 0000 00 NC"
  params: []

- id: nlastpreset
  label: Last Preset Call Notification
  kind: notify
  command: "MD nlastpreset 0000 00 NC"
  params: []

- id: rudpecho
  label: UDP Transmission Request
  kind: action
  command: "rudpecho S 0000 00 NC"
  params: []

- id: nudpecho
  label: UDP Transmission Notification
  kind: notify
  command: "MD nudpecho 0000 00 NC"
  params: []

# ---------- Network ----------
- id: sipnet
  label: IP Network Information Setting
  kind: action
  command: 'sipnet S 0000 00 NC {mode},{ip},{mask},{gw},{upnp}'
  params:
    - name: mode
      type: integer
      description: 0=Auto, 1=Static
    - name: ip
      type: string
    - name: mask
      type: string
    - name: gw
      type: string
    - name: upnp
      type: integer
      description: 0=OFF, 1=ON
  notes: Reboot required for changes to take effect.

- id: gipnet
  label: IP Network Information Acquisition
  kind: query
  command: "gipnet O 0000 00 NC"
  params: []

- id: nipnet
  label: IP Network Information Notification
  kind: notify
  command: "MD nipnet 0000 00 NC"
  params: []

# ---------- Notification ----------
- id: snoticemode
  label: Notification Mode Setting
  kind: action
  command: "snoticemode S 0000 00 NC {mode}"
  params:
    - name: mode
      type: integer
      description: 0=OFF, 1=ON

- id: gnoticemode
  label: Notification Mode Acquisition
  kind: query
  command: "gnoticemode O 0000 00 NC"
  params: []

- id: nnoticemode
  label: Notification Mode Notification
  kind: notify
  command: "MD nnoticemode 0000 00 NC"
  params: []

- id: snoticelevel
  label: Level Notification Setting
  kind: action
  command: "snoticelevel S 0000 00 NC {mode}"
  params:
    - name: mode
      type: integer
      description: 0=OFF, 1=ON

- id: gnoticelevel
  label: Level Notification Acquisition
  kind: query
  command: "gnoticelevel O 0000 00 NC"
  params: []

- id: nnoticelevel
  label: Level Notification
  kind: notify
  command: "MD nnoticelevel 0000 00 NC"
  params: []

- id: snoticelevelinterval
  label: Level Notification Intervals Setting
  kind: action
  command: "snoticelevelinterval S 0000 00 NC {interval}"
  params:
    - name: interval
      type: integer
      description: 1 (100ms) to 600 (60000ms), 100ms/step

- id: gnoticelevelinterval
  label: Level Notification Intervals Acquisition
  kind: query
  command: "gnoticelevelinterval O 0000 00 NC"
  params: []

- id: nnoticelevelinterval
  label: Level Notification Intervals Notification
  kind: notify
  command: "MD nnoticelevelinterval 0000 00 NC"
  params: []

- id: snoticeaddress
  label: Multicast Address Setting
  kind: action
  command: "snoticeaddress S 0000 00 NC {addr}"
  params:
    - name: addr
      type: string
      description: 224.0.0.0 to 239.255.255.255
  notes: Reboot required.

- id: gnoticeaddress
  label: Multicast Address Acquisition
  kind: query
  command: "gnoticeaddress O 0000 00 NC"
  params: []

- id: nnoticeaddress
  label: Multicast Address Notification
  kind: notify
  command: "MD nnoticeaddress 0000 00 NC"
  params: []

- id: snoticeportno
  label: Multicast Port Number Setting
  kind: action
  command: "snoticeportno S 0000 00 NC {port}"
  params:
    - name: port
      type: integer
      description: 1 to 65535
  notes: Reboot required.

- id: gnoticeportno
  label: Multicast Port Number Acquisition
  kind: query
  command: "gnoticeportno O 0000 00 NC"
  params: []

- id: nnoticeportno
  label: Multicast Port Number Notification
  kind: notify
  command: "MD nnoticeportno 0000 00 NC"
  params: []

# ---------- Log / NTP / DST ----------
- id: slogmode
  label: System Log Setting (Syslog)
  kind: action
  command: "slogmode S 0000 00 NC {mode}"
  params:
    - name: mode
      type: integer
      description: 0=OFF, 1=ON
  notes: Reboot required.

- id: glogmode
  label: System Log Acquisition
  kind: query
  command: "glogmode O 0000 00 NC"
  params: []

- id: nlogmode
  label: System Log Notification
  kind: notify
  command: "MD nlogmode 0000 00 NC"
  params: []

- id: sntpmode
  label: NTP Setting
  kind: action
  command: "sntpmode S 0000 00 NC {mode}"
  params:
    - name: mode
      type: integer
      description: 0=OFF, 1=ON
  notes: Reboot required.

- id: gntpmode
  label: NTP Acquisition
  kind: query
  command: "gntpmode O 0000 00 NC"
  params: []

- id: nntpmode
  label: NTP Notification
  kind: notify
  command: "MD nntpmode 0000 00 NC"
  params: []

- id: sntpserveraddress
  label: NTP Server Address Setting
  kind: action
  command: "sntpserveraddress S 0000 00 NC {addr}"
  params:
    - name: addr
      type: string
  notes: Reboot required.

- id: gntpserveraddress
  label: NTP Server Address Acquisition
  kind: query
  command: "gntpserveraddress O 0000 00 NC"
  params: []

- id: nntpserveraddress
  label: NTP Server Address Notification
  kind: notify
  command: "MD nntpserveraddress 0000 00 NC"
  params: []

- id: sntpserverportno
  label: NTP Server Port Number Setting
  kind: action
  command: "sntpserverportno S 0000 00 NC {port}"
  params:
    - name: port
      type: integer
      description: 1 to 65535
  notes: Reboot required.

- id: gntpserverportno
  label: NTP Server Port Number Acquisition
  kind: query
  command: "gntpserverportno O 0000 00 NC"
  params: []

- id: nntpserverportno
  label: NTP Server Port Number Notification
  kind: notify
  command: "MD nntpserverportno 0000 00 NC"
  params: []

- id: sntptimezone
  label: NTP Time Zone Setting
  kind: action
  command: 'sntptimezone S 0000 00 NC {tz}'
  params:
    - name: tz
      type: string
      description: -12:00 to +14:00, 30-min steps (e.g. +09:00)
  notes: Reboot required.

- id: gntptimezone
  label: NTP Time Zone Acquisition
  kind: query
  command: "gntptimezone O 0000 00 NC"
  params: []

- id: nntptimezone
  label: NTP Time Zone Notification
  kind: notify
  command: "MD nntptimezone 0000 00 NC"
  params: []

- id: sdstmode
  label: Daylight Saving Time Setting
  kind: action
  command: "sdstmode S 0000 00 NC {mode}"
  params:
    - name: mode
      type: integer
      description: 0=OFF, 1=ON
  notes: Reboot required.

- id: gdstmode
  label: Daylight Saving Time Acquisition
  kind: query
  command: "gdstmode O 0000 00 NC"
  params: []

- id: ndstmode
  label: Daylight Saving Time Notification
  kind: notify
  command: "MD ndstmode 0000 00 NC"
  params: []

- id: sdstdatetime
  label: DST Start/End Dates Setting
  kind: action
  command: "sdstdatetime S 0000 00 NC {start},{end}"
  params:
    - name: start
      type: string
      description: MMDDHHmm, 01010000-12312300, 30-min step
    - name: end
      type: string
  notes: Reboot required.

- id: gdstdatetime
  label: DST Start/End Dates Acquisition
  kind: query
  command: "gdstdatetime O 0000 00 NC"
  params: []

- id: ndstdatetime
  label: DST Start/End Dates Notification
  kind: notify
  command: "MD ndstdatetime 0000 00 NC"
  params: []

# ---------- Dante ----------
- id: gdantenet
  label: Dante IP Setting Acquisition
  kind: query
  command: "gdantenet O 0000 00 NC"
  params: []

- id: gdantedevicename
  label: Dante Device Name Acquisition
  kind: query
  command: "gdantedevicename O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: gdantechannellabel
  label: Dante Channel Label Name Acquisition
  kind: query
  command: "gdantechannellabel O 0000 00 NC {ch}"
  params:
    - name: ch
      type: integer

- id: gdantemodelname
  label: Dante Information Acquisition
  kind: query
  command: "gdantemodelname O 0000 00 NC"
  params: []

- id: gdanteversion
  label: Dante FW Version Acquisition
  kind: query
  command: "gdanteversion O 0000 00 NC"
  params: []

# ---------- TX ----------
- id: gtxmodel
  label: TX Model Name Acquisition
  kind: query
  command: "gtxmodel O 0000 00 NC {port}"
  params:
    - name: port
      type: integer
      description: 1-8 (CHG charging port)

- id: gtxversion
  label: TX Version Acquisition
  kind: query
  command: "gtxversion O 0000 00 NC"
  params: []

- id: stxname
  label: TX Device Name Setting
  kind: action
  command: 'stxname S 0000 00 NC {port},"{name}"'
  params:
    - name: port
      type: integer
    - name: name
      type: string

- id: gtxname
  label: TX Device Name Acquisition
  kind: query
  command: "gtxname O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer
      description: 1-8 (RU Ch or CHG port)

- id: ntxname
  label: TX Device Name Notification
  kind: notify
  command: "MD ntxname 0000 00 NC"
  params: []

- id: stxlocationname
  label: TX Location Name Setting
  kind: action
  command: 'stxlocationname S 0000 00 NC {port},"{location}"'
  params:
    - name: port
      type: integer
    - name: location
      type: string

- id: gtxlocationname
  label: TX Location Name Acquisition
  kind: query
  command: "gtxlocationname O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer

- id: ntxlocationname
  label: TX Location Name Notification
  kind: notify
  command: "MD ntxlocationname 0000 00 NC"
  params: []

- id: stxdeviceid
  label: TX Device ID Setting
  kind: action
  command: "stxdeviceid S 0000 00 NC {port},{id}"
  params:
    - name: port
      type: integer
    - name: id
      type: integer
      description: 0-255

- id: gtxdeviceid
  label: TX Device ID Acquisition
  kind: query
  command: "gtxdeviceid O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer

- id: ntxdeviceid
  label: TX Device ID Notification
  kind: notify
  command: "MD ntxdeviceid 0000 00 NC"
  params: []

- id: gtxkind
  label: TX Type Acquisition
  kind: query
  command: "gtxkind O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer

- id: stxmicgain
  label: TX Gain Setting
  kind: action
  command: "stxmicgain S 0000 00 NC {ch_or_port},{gain}"
  params:
    - name: ch_or_port
      type: integer
    - name: gain
      type: integer
      description: 1 (-9 dB) to 11 (+21 dB), 3 dB step (BP only)

- id: gtxmicgain
  label: TX Gain Acquisition
  kind: query
  command: "gtxmicgain O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer

- id: ntxmicgain
  label: TX Gain Notification
  kind: notify
  command: "MD ntxmicgain 0000 00 NC"
  params: []

- id: stxintmicgain
  label: TX Internal Mic Gain Setting
  kind: action
  command: "stxintmicgain S 0000 00 NC {ch_or_port},{gain}"
  params:
    - name: ch_or_port
      type: integer
    - name: gain
      type: integer
      description: 1-11, 3 dB step

- id: gtxintmicgain
  label: TX Internal Mic Gain Acquisition
  kind: query
  command: "gtxintmicgain O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer

- id: ntxintmicgain
  label: TX Internal Mic Gain Notification
  kind: notify
  command: "MD ntxintmicgain 0000 00 NC"
  params: []

- id: stxmicpolar
  label: TX Directivity Setting
  kind: action
  command: "stxmicpolar S 0000 00 NC {port},{polar}"
  params:
    - name: port
      type: integer
    - name: polar
      type: integer
      description: 0=Omni, 1=Cardioid (BD only)

- id: gtxmicpolar
  label: TX Directivity Acquisition
  kind: query
  command: "gtxmicpolar O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer

- id: ntxmicpolar
  label: TX Directivity Notification
  kind: notify
  command: "MD ntxmicpolar 0000 00 NC"
  params: []

- id: stxmutedisable
  label: TX Mute Function Setting
  kind: action
  command: "stxmutedisable S 0000 00 NC {port},{value}"
  params:
    - name: port
      type: integer
    - name: value
      type: integer
  notes: BD only.

- id: gtxmutedisable
  label: TX Mute Function Acquisition
  kind: query
  command: "gtxmutedisable O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer

- id: ntxmutedisable
  label: TX Mute Function Notification
  kind: notify
  command: "MD ntxmutedisable 0000 00 NC"
  params: []

- id: stxmutemode
  label: TX Mute Mode Setting
  kind: action
  command: "stxmutemode S 0000 00 NC {port},{mode}"
  params:
    - name: port
      type: integer
    - name: mode
      type: integer
      description: 0=Toggle, 1=Push to Talk, 2=Push to Mute (BD and DS)

- id: gtxmutemode
  label: TX Mute Mode Acquisition
  kind: query
  command: "gtxmutemode O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer

- id: ntxmutemode
  label: TX Mute Mode Notification
  kind: notify
  command: "MD ntxmutemode 0000 00 NC"
  params: []

- id: stxmutedefault
  label: TX Default Mute Setting
  kind: action
  command: "stxmutedefault S 0000 00 NC {port},{mode}"
  params:
    - name: port
      type: integer
    - name: mode
      type: integer
      description: 0=Default Unmute, 1=Default Mute (only when mode=0 Toggle)

- id: gtxmutedefault
  label: TX Default Mute Acquisition
  kind: query
  command: "gtxmutedefault O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer

- id: ntxdefaultmute
  label: TX Default Mute Notification
  kind: notify
  command: "MD ntxdefaultmute 0000 00 NC"
  params: []

- id: stxmutecolor
  label: TX Mute LED Color Setting
  kind: action
  command: "stxmutecolor S 0000 00 NC {port},{value}"
  params:
    - name: port
      type: integer
    - name: value
      type: integer
      description: 0=OFF, 1=... (BD and DS)

- id: gtxmutecolor
  label: TX Mute LED Color Acquisition
  kind: query
  command: "gtxmutecolor O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer

- id: ntxmutecolor
  label: TX Mute LED Color Notification
  kind: notify
  command: "MD ntxmutecolor 0000 00 NC"
  params: []

- id: stxunmutecolor
  label: TX Mute Reset LED Color Setting
  kind: action
  command: "stxunmutecolor S 0000 00 NC {port},{value}"
  params:
    - name: port
      type: integer
    - name: value
      type: integer
      description: 0=OFF, 1=...

- id: gtxunmutecolor
  label: TX Mute Reset LED Color Acquisition
  kind: query
  command: "gtxunmutecolor O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer

- id: ntxunmutecolor
  label: TX Mute Reset LED Color Notification
  kind: notify
  command: "MD ntxunmutecolor 0000 00 NC"
  params: []

- id: stxbattalert
  label: TX Battery Level Alert Setting
  kind: action
  command: "stxbattalert S 0000 00 NC {port},{value}"
  params:
    - name: port
      type: integer
    - name: value
      type: integer
      description: 0=OFF, 1=60min, 2=90min, 3=120min

- id: gtxbattalert
  label: TX Battery Level Alert Acquisition
  kind: query
  command: "gtxbattalert O 0000 00 NC {ch_or_port}"
  params:
    - name: ch_or_port
      type: integer

- id: ntxbattalert
  label: TX Battery Level Alert Notification
  kind: notify
  command: "MD ntxbattalert 0000 00 NC"
  params: []

- id: rtxledflash
  label: TX LED Lighting Request
  kind: action
  command: "rtxledflash S 0000 00 NC {port}"
  params:
    - name: port
      type: integer
      description: 1-8
  notes: Source quotes flag 1=Identify, 2=Pattern 2 (BP/HH vs BD/DS differ).

- id: rtxreboot
  label: TX Reboot Request
  kind: action
  command: "rtxreboot S 0000 00 NC {port}"
  params:
    - name: port
      type: integer

- id: rtxfactoryreset
  label: TX Factory Reset Request
  kind: action
  command: "rtxfactoryreset S 0000 00 NC {port}"
  params:
    - name: port
      type: integer

# ---------- CHG ----------
- id: gchgmodelname
  label: CHG Model Name Acquisition
  kind: query
  command: "gchgmodelname O 0000 00 NC"
  params: []

- id: gchgversionarray
  label: CHG FW Version Acquisition
  kind: query
  command: "gchgversionarray O 0000 00 NC"
  params: []

- id: gchgvdevicearray
  label: CHG Device Linked Information Acquisition
  kind: query
  command: "gchgvdevicearray O 0000 00 NC"
  params: []

- id: schgportch
  label: CHG Port Assignment Setting
  kind: action
  command: "schgportch S 0000 00 NC {port},{ch}"
  params:
    - name: port
      type: integer
      description: 1-8
    - name: ch
      type: integer
      description: 0=Not assigned, 1-8=CH number

- id: gchgportch
  label: CHG Port Assignment Acquisition
  kind: query
  command: "gchgportch O 0000 00 NC"
  params: []

- id: nchgportch
  label: CHG Port Assignment Notification
  kind: notify
  command: "MD nchgportch 0000 00 NC"
  params: []

- id: schglinkbtnlock
  label: CHG Link Button Lock Setting
  kind: action
  command: "schglinkbtnlock S 0000 00 NC {mode}"
  params:
    - name: mode
      type: integer
      description: 0=Always Unlock, 1=Hold 2s to unlock, 2=Always Lock

- id: gchglinkbtnlock
  label: CHG Link Button Lock Acquisition
  kind: query
  command: "gchglinkbtnlock O 0000 00 NC"
  params: []

- id: nchglinkbtnlock
  label: CHG Link Button Lock Notification
  kind: notify
  command: "MD nchglinkbtnlock 0000 00 NC"
  params: []

# ---------- Other ----------
- id: sledoff
  label: LED Setting
  kind: action
  command: "sledoff S 0000 00 NC {mode}"
  params:
    - name: mode
      type: integer
      description: 0=LED ON, 1=LED OFF

- id: gledoff
  label: LED Acquisition
  kind: query
  command: "gledoff O 0000 00 NC"
  params: []

- id: nledoff
  label: LED Notification
  kind: notify
  command: "MD nledoff 0000 00 NC"
  params: []

- id: rwalktest
  label: Walktest Request
  kind: action
  command: "rwalktest S 0000 00 NC {mode}"
  params:
    - name: mode
      type: integer
      description: 0=Normal, 1=Walktest

- id: nwalktest
  label: Walktest Notification
  kind: notify
  command: "MD nwalktest 0000 00 NC"
  params: []

- id: rsitesurvey
  label: DECT RF Scan Request
  kind: action
  command: "rsitesurvey S 0000 00 NC {mode} {threshold}"
  params:
    - name: mode
      type: integer
      description: 0=Normal, 1=DECT RF scan
    - name: threshold
      type: string
      description: 0 or -82 to -62 dBm

- id: nsitesurvey
  label: DECT RF Scan Notification
  kind: notify
  command: "MD nsitesurvey 0000 00 NC"
  params: []

# ---------- Application Log ----------
- id: napplog
  label: Application Log Notification
  kind: notify
  command: "MD napplog 0000 00 NC"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  description: Inferred from reboot notification; nreboot reports operation-at-reset + reset type.
- id: ch_mute
  type: enum
  values: [0, 1]
  description: 0=Enable (mute on), 1=Disable - note source labels 0=Enable, 1 unspecified
- id: ch_volume
  type: integer
  range: 0-40
  description: 0 (-30 dB) to 30 (0 dB), up to 40 (+10 dB)
- id: ch_hpf
  type: enum
  values: [0, 1, 2, 3]
  description: 0=OFF, 1=80Hz, 2=120Hz, 3=160Hz
- id: rf_power
  type: enum
  values: [0, 1, 2, 3, 4, 5]
  description: 0=MAX, 1=HIGH/Max, 2=HIGH or NAK, 3=MID, 4=LOW, 5=MIN
- id: tx_battery_level
  type: integer
  range: 0-100
- id: rssi
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  description: 0=No link/<-90 dBm, 1=-90..-84, 2=-84..-78, 3=-78..-72, 4=-72..-66, 5=-66..-60, 6=-60..-54, 7=>=-54
- id: af_level
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  description: 0=<-50 dBFS, 1=-50..-40, 2=-40..-30, 3=-30..-20, 4=-20..-12, 5=-12..-6, 6=-6..-1, 7=>=-1
- id: tx_type
  type: enum
  values: [0, 1, 2, 3]
  description: 0=HH, 1=BP, 2=BD, 3=DS
- id: ch8_output
  type: enum
  values: [0, 1]
  description: 0=Discrete, 1=Mixout
- id: ch_mixout
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: roaming_mode
  type: enum
  values: [0, 1]
  description: 0=Disable, 1=Enable
- id: roaming_threshold
  type: string
  description: 0=OFF, or -85 to -50 dBm
- id: tx_external_mic
  type: enum
  values: [0, 1]
  description: 0=Not connected, 1=Connected (BP only)
- id: chg_link_btn_lock
  type: enum
  values: [0, 1, 2]
  description: 0=Always Unlock, 1=Hold 2s, 2=Always Lock
- id: link_status
  type: enum
  values: [0, 1]
  description: 0=No LINK, 1=During LINK
```

## Variables
```yaml
# Settable scalars not represented as discrete action ids.
- id: notification_mode
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: level_notification
  type: enum
  values: [0, 1]
  description: 0=OFF, 1=ON
- id: level_notification_interval
  type: integer
  range: 1-600
  description: 1=100ms, 600=60000ms
- id: multicast_address
  type: string
  description: 224.0.0.0 to 239.255.255.255
- id: multicast_port
  type: integer
  range: 1-65535
- id: ntp_timezone
  type: string
  description: -12:00 to +14:00, 30-min steps
- id: dst_start
  type: string
  description: MMDDHHmm
- id: dst_end
  type: string
  description: MMDDHHmm
- id: led_setting
  type: enum
  values: [0, 1]
  description: 0=LED ON, 1=LED OFF
- id: mic_gain
  type: integer
  range: 1-11
  description: 1=-9 dB, 11=+21 dB, 3 dB step
- id: mic_polar
  type: enum
  values: [0, 1]
  description: 0=Omni, 1=Cardioid
- id: tx_mute_mode
  type: enum
  values: [0, 1, 2]
  description: 0=Toggle, 1=Push to Talk, 2=Push to Mute
- id: tx_default_mute
  type: enum
  values: [0, 1]
  description: 0=Default Unmute, 1=Default Mute
- id: tx_battery_alert
  type: enum
  values: [0, 1, 2, 3]
  description: 0=OFF, 1=60min, 2=90min, 3=120min
- id: walktest_mode
  type: enum
  values: [0, 1]
- id: site_survey_mode
  type: enum
  values: [0, 1]
- id: site_survey_threshold
  type: string
  description: 0 or -82 to -62 dBm
- id: chg_port_assign_ch
  type: integer
  range: 0-8
  description: 0=Not assigned
```

## Events
```yaml
- id: napplog
  description: Application log notification (UDP, unsolicited). Carries model name, log level, device ID, message text.
- id: nsitesurvey
  description: DECT RF scan notification (UDP, periodic during scan). Carriers-used, free, used1/2, busy.
- id: nwalktest
  description: Walktest notification (UDP, periodic during walktest). Per-Ch RSSI dBm.
- id: nlevelall
  description: All-levels notification (UDP, periodic per level_notification_interval).
- id: nledoff
  description: LED setting changed.
- id: nreboot
  description: Device rebooted; reports operation-at-reset and reset type.
- id: nfactoryreset
  description: Device factory-reset notification.
- id: nreboot_notification
  description: MD␣nreboot␣0000␣00␣NC␣{op_at_reset},{reset_type}
- id: nmyname
  description: Device name change.
- id: nchname
  description: Channel name change.
- id: nlocationname
  description: Location name change.
- id: nmydeviceid
  description: Device ID change.
- id: nnoticemode
  description: Notification mode change.
- id: nnoticelevel
  description: Level notification change.
- id: nnoticelevelinterval
  description: Notification interval change.
- id: nnoticeaddress
  description: Multicast address change.
- id: nnoticeportno
  description: Multicast port change.
- id: nlogmode
  description: Syslog mode change.
- id: nntpmode
  description: NTP enable mode change.
- id: nntpserveraddress
  description: NTP server address change.
- id: nntpserverportno
  description: NTP server port change.
- id: nntptimezone
  description: NTP time zone change.
- id: ndstmode
  description: DST mode change.
- id: ndstdatetime
  description: DST start/end date change.
- id: nchmute
  description: Channel mute state change.
- id: nchvolume
  description: Channel volume change.
- id: nchhpf
  description: Channel HPF change.
- id: nchafmetersetting
  description: Channel meter setting change.
- id: nmixout
  description: Ch8 output change.
- id: nchmixout
  description: Channel mix assignment change.
- id: nroamingmode
  description: Roaming mode change.
- id: nroamingthreshold
  description: Roaming threshold change.
- id: nmastermixout
  description: Master table Ch8 output change.
- id: nmasterchmixout
  description: Master table mix assignment change.
- id: npresetname
  description: Preset name change.
- id: npresetmixout
  description: Preset Ch8 output change.
- id: npresetchmixout
  description: Preset mix assignment change.
- id: nrmgmastermixout
  description: Roaming master Ch8 output change.
- id: nrmgmasterchmixout
  description: Roaming master mix assignment change.
- id: nrmgpresetname
  description: Roaming preset name change.
- id: nrmgpresetmixout
  description: Roaming preset Ch8 output change.
- id: nrmgpresetchmixout
  description: Roaming preset mix assignment change.
- id: nlevelbatttx
  description: TX battery level change.
- id: nlevelbatt
  description: CHG battery level change.
- id: nststx
  description: TX status change.
- id: nlastpreset
  description: Last preset/master-table call notification.
- id: nudpecho
  description: UDP transmission echo.
- id: nipnet
  description: IP network info change.
- id: nhdmode
  description: RF mode change.
- id: nrfpower
  description: RF power change.
- id: ntxname
  description: TX device name change.
- id: ntxlocationname
  description: TX location name change.
- id: ntxdeviceid
  description: TX device ID change.
- id: ntxmicgain
  description: TX mic gain change.
- id: ntxintmicgain
  description: TX internal mic gain change.
- id: ntxmicpolar
  description: TX directivity change.
- id: ntxmutedisable
  description: TX mute function change.
- id: ntxmutemode
  description: TX mute mode change.
- id: ntxdefaultmute
  description: TX default mute change.
- id: ntxmutecolor
  description: TX mute LED color change.
- id: ntxunmutecolor
  description: TX unmute LED color change.
- id: ntxbattalert
  description: TX battery alert setting change.
- id: nchgportch
  description: CHG port assignment change.
- id: nchglinkbtnlock
  description: CHG link button lock change.
```

## Macros
```yaml
# UNRESOLVED: source describes behavior around rmastercall / rpresetcall producing
# an nlastpreset, but does not author the macro as a discrete sequence with
# exact timing. Not reproduced here as fabricated steps.
```

## Safety
```yaml
confirmation_required_for:
  - rfactoryreset   # factory reset wipes settings; source notes device must reboot to apply
  - rtxfactoryreset # TX factory reset; same caveat
interlocks: []
# UNRESOLVED: source does not document additional safety interlocks (e.g. RF exposure, lockout-tagout) for control commands.
```

## Notes
- Command framing: ASCII, space (0x20) delimiter, CR (0x0D) terminator. Max 287 bytes per message (32-byte Ethernet header + 255-byte payload).
- TCP port 17200 is fixed for control; UDP 17000 (notification, configurable), 17001 (CHG linkage, fixed), 17100 (RU sync, fixed).
- Only one host TCP connection is allowed at a time; additional connections are refused.
- Set commands (s* / sx* / sr*) use HandShake select "S" — device responds with ACK/NAK.
- Get commands (g* / gx* / gl*) use HandShake select "O" — device responds with Answer.
- Request commands (r* / rx*) use HandShake select "S" — ACK/NAK; some generate follow-up notifications (e.g. rreboot → nreboot, rfactoryreset → nfactoryreset, rsitesurvey → nsitesurvey, rudpecho → nudpecho).
- Information notifications (n* / nx* / ni*) are prefixed with "MD" and sent via UDP multicast.
- Response time notes from source: shdmode ~10s ACK, sroamingmode ~15s ACK, rmastercall / rpresetcall ~5s ACK, rledflash identify ~5s auto-stop.
- Per-channel mute, volume, HPF, and mix-assignment commands take Ch No. (1-8) and value. Mixout is addressed as Ch 0 for level queries.
- RF power value validity depends on DECT mode; see source tables 4-2-4/5/6.
- Roaming and DECT-related notifications are suppressed when snoticemode=0; some are additionally suppressed when snoticelevel=0 (see source per-event notes).
- Battery alert values: 0=OFF, 1=60 min, 2=90 min, 3=120 min before depletion.
- Battery error flags on CHG include bit fields for warning/error states; see source Table 4-113/114.
- The source uses parameter characters in two forms: quoted ASCII strings (e.g. "MyName") for names, and unquoted integers (e.g. 1, 30) for numerics.
- gchgvdevicearray and gchgversionarray share the same command string in some source examples — likely a source-document typo; both opcode names retained per source.

<!-- UNRESOLVED: firmware version compatibility ranges per model not stated in source; voltage, current, power, and weight specifications not stated. -->

## Provenance

```yaml
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/all/ESW_IP_Control_Specification_V1_EN_web_230131.pdf
retrieved_at: 2026-05-03T16:24:43.318Z
last_checked_at: 2026-06-02T17:21:31.567Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:31.567Z
matched_actions: 197
action_count: 197
confidence: medium
summary: "All 197 spec actions matched literally in source; transport ports 17200/17000/17001/17100 confirmed; coverage exceeds source table of 196 commands. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version ranges per model not stated; voltage/current/power spec not stated."
- "source describes behavior around rmastercall / rpresetcall producing"
- "source does not document additional safety interlocks (e.g. RF exposure, lockout-tagout) for control commands."
- "firmware version compatibility ranges per model not stated in source; voltage, current, power, and weight specifications not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
