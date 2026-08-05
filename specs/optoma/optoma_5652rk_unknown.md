---
spec_id: admin/optoma-5652rk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma 5652Rk Control Spec"
manufacturer: Optoma
model_family: 5652Rk
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - 5652Rk
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/2fca8df0-8259-43cb-a8f4-a9a9dd49f36a.pdf
retrieved_at: 2026-07-13T19:38:47.156Z
last_checked_at: 2026-07-22T00:20:41.764Z
generated_at: 2026-07-22T00:20:41.764Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device type only labeled \"IFP\" — full product family/submodel not stated. Voltage/power specs not in source."
  - "no multi-step sequences described in source"
  - "no voltage/current/power ratings stated in source. Over-temperature"
  - "full model variant list beyond 5652Rk not stated. Authentication/credentials for OSD lock password format only shown as \"a\" placeholder — actual password encoding not documented."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:20:41.764Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions matched verbatim in source with correct wire tokens, parameters, and ranges; transport parameters fully verified; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Optoma 5652Rk Control Spec

## Summary
Optoma 5652Rk Interactive Flat Panel (IFP). Supports RS-232 and RJ45 (TCP port 23) control. Command set covers power, picture, audio, source selection, OSD, network/WLAN status queries, and system telemetry (usage hours, firmware version, temperature).

<!-- UNRESOLVED: device type only labeled "IFP" — full product family/submodel not stated. Voltage/power specs not in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (power on/off/restart commands)
# - queryable    (extensive GET query set)
# - levelable    (volume, brightness, contrast, color, backlight, treble, bass, balance)
```

## Actions
```yaml
# Command frame per source: ~{device_id}{cmd_id} {value}\r
# Lead code ~ = 0x7E, device_id default "01" (xx in source CMD column; hex examples
# show 30 30 = "00" placeholder). Space = 0x20. CR = 0x0d. All hex verbatim from source.

# --- SET: Power ---
- id: power_set
  label: Power Set (off/on/restart)
  kind: action
  command: "~{device_id}00 {n}"
  params:
    - name: device_id
      type: string
      description: "Two-digit device ID (default 01; xx in source)"
    - name: n
      type: enum
      description: "0=Power off, 1=Power on, 3=Restart"
  # hex off:    7E 30 30 30 30 20 30 0d
  # hex on:     7E 30 30 30 30 20 31 0d
  # hex restart:7E 30 30 30 30 20 33 0d

- id: power_mode_standby_set
  label: Power Mode (Standby) Set (Eco/Active)
  kind: action
  command: "~{device_id}114 {n}"
  params:
    - name: device_id
      type: string
      description: "Two-digit device ID (default 01)"
    - name: n
      type: enum
      description: "0=Eco, 1=Active"
  # hex eco:    7E 30 30 31 31 34 20 30 0d
  # hex active: 7E 30 30 31 31 34 20 31 0d

# --- SET: Audio levels ---
- id: treble_set
  label: Treble Set
  kind: action
  command: "~{device_id}95 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "0-100"
  # hex: 7E 30 30 39 35 20 30 0d to 7E 30 30 39 35 20 31 30 30 0d

- id: bass_set
  label: Bass Set
  kind: action
  command: "~{device_id}96 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "0-100"
  # hex: 7E 30 30 39 36 20 30 0d to 7E 30 30 39 36 20 31 30 30 0d

- id: balance_set
  label: Balance Set
  kind: action
  command: "~{device_id}99 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "0-100"
  # hex: 7E 30 30 39 39 20 30 0d to 7E 30 30 39 39 20 31 30 30 0d

- id: contrast_set
  label: Contrast Set
  kind: action
  command: "~{device_id}22 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "0-100"
  # hex: 7E 30 30 32 32 20 30 0d to 7E 30 30 32 32 20 31 30 30 0d

- id: brightness_set
  label: Brightness Set
  kind: action
  command: "~{device_id}21 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "0-100"
  # hex: 7E 30 30 32 31 20 30 0d to 7E 30 30 32 31 20 31 30 30 0d

- id: volume_set
  label: Volume Set
  kind: action
  command: "~{device_id}81 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "0-100"
  # hex: 7E 30 30 38 31 20 30 0d to 7E 30 30 38 31 20 31 30 30 0d

- id: color_set
  label: Color Set
  kind: action
  command: "~{device_id}45 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "0-100"
  # hex: 7E 30 30 34 35 20 30 0d to 7E 30 30 34 35 20 31 30 30 0d

- id: backlight_set
  label: Backlight Set
  kind: action
  command: "~{device_id}251 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "0-100"
  # hex: 7E 30 30 32 35 31 20 30 0d to 7E 30 30 32 35 31 20 31 30 30 0d

# --- SET: Audio/Picture enums ---
- id: sound_mode_set
  label: Sound Mode Set
  kind: action
  command: "~{device_id}252 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: "1=Standard, 2=User, 3=Classroom, 4=Meeting, 5=Movie"
  # hex standard:   7E 30 30 32 35 32 20 31 0d
  # hex meeting:    7E 30 30 32 35 32 20 34 0d
  # hex user:       7E 30 30 32 35 32 20 32 0d
  # hex classroom:  7E 30 30 32 35 32 20 33 0d
  # hex movie:      7E 30 30 32 35 32 20 35 0d

- id: video_mute_set
  label: Video Mute Set
  kind: action
  command: "~{device_id}13 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: "0=Off, 1=On"
  # hex off: 7E 30 30 31 33 20 30 0d
  # hex on:  7E 30 30 31 33 20 31 0d

- id: mute_set
  label: Mute Set
  kind: action
  command: "~{device_id}80 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: "0=Off, 1=On"
  # hex off: 7E 30 30 38 30 20 30 0d
  # hex on:  7E 30 30 38 30 20 31 0d

- id: input_source_set
  label: Input Source Set
  kind: action
  command: "~{device_id}12 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: "1=HDMI1, 15=HDMI2, 16=HDMI3, 27=USB Type C, 5=VGA, 25=Slot in PC, 24=Android"
  # hex HDMI1:       7E 30 30 31 32 20 31 0d
  # hex HDMI2:       7E 30 30 31 32 20 31 35 0d
  # hex HDMI3:       7E 30 30 31 32 20 31 36 0d
  # hex USB Type C:  7E 30 30 31 32 20 32 37 0d
  # hex VGA:         7E 30 30 31 32 20 35 0d
  # hex Slot in PC:  7E 30 30 31 32 20 32 35 0d
  # hex Android:     7E 30 30 31 32 20 32 34 0d

- id: aspect_ratio_set
  label: Aspect Ratio Set
  kind: action
  command: "~{device_id}60 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: "1=4:3, 2=16:9, 14=PTP"
  # hex 4:3: 7E 30 30 36 30 20 31 0d
  # hex 16:9:7E 30 30 36 30 20 32 0d
  # hex PTP: 7E 30 30 36 30 20 31 34 0d

- id: language_set
  label: Language Set
  kind: action
  command: "~{device_id}70 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: >-
        1=English, 2=German, 3=Français, 4=Italian, 5=Español, 6=Português,
        7=Polish, 8=Dutch, 9=Swedish, 10=Norge, 11=Finnish, 13=Traditional Chinese,
        14=Simplified Chinese, 17=Russia, 18=Hungarian, 19=Czech, 20=Arabic,
        22=Turkish, 24=Danish, 27=Romanian
  # hex English:           7E 30 30 37 30 20 31 0d
  # hex Français:          7E 30 30 37 30 20 33 0d
  # hex Español:           7E 30 30 37 30 20 35 0d
  # hex Traditional Chinese:7E 30 30 37 30 20 31 33 0d
  # hex Simplified Chinese: 7E 30 30 37 30 20 31 34 0d
  # hex Português:         7E 30 30 37 30 20 36 0d
  # hex German:            7E 30 30 37 30 20 32 0d
  # hex Dutch:             7E 30 30 37 30 20 38 0d
  # hex Polish:            7E 30 30 37 30 20 37 0d
  # hex Russia:            7E 30 30 37 30 20 31 37 0d
  # hex Czech:             7E 30 30 37 30 20 31 39 0d
  # hex Danish:            7E 30 30 37 30 20 32 34 0d
  # hex Swedish:           7E 30 30 37 30 20 39 0d
  # hex Italian:           7E 30 30 37 30 20 34 0d
  # hex Turkish:           7E 30 30 37 30 20 32 32 0d
  # hex Arabic:            7E 30 30 37 30 20 32 30 0d
  # hex Romanian:          7E 30 30 37 30 20 32 37 0d
  # hex Hungarian:         7E 30 30 37 30 20 31 38 0d
  # hex Finnish:           7E 30 30 37 30 20 31 31 0d
  # hex Norge:             7E 30 30 37 30 20 31 30 0d

- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  command: "~{device_id}20 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: "1=Presentation, 2=Bright, 3=Cinema, 5=User, 21=HDR"
  # hex Presentation: 7E 30 30 32 30 20 31 0d
  # hex Bright:       7E 30 30 32 30 20 32 0d
  # hex Cinema:       7E 30 30 32 30 20 33 0d
  # hex User:         7E 30 30 32 30 20 35 0d
  # hex HDR:          7E 30 30 32 30 20 32 31 0d

- id: color_temp_set
  label: Color Temp Set
  kind: action
  command: "~{device_id}36 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: "1=Standard, 2=Cool, 4=Warm"
  # hex Cool:    7E 30 30 33 36 20 32 0d
  # hex Standard:7E 30 30 33 36 20 31 0d
  # hex Warm:    7E 30 30 33 36 20 34 0d

- id: freeze_set
  label: Freeze Set
  kind: action
  command: "~{device_id}04 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: "0=Unfreeze, 1=Freeze"
  # hex unfreeze: 7E 30 30 30 34 20 30 0d
  # hex freeze:   7E 30 30 30 34 20 31 0d

- id: pixel_shift_interval_set
  label: Pixel Shift Interval Set (min)
  kind: action
  command: "~{device_id}250 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: "0=Off, 2=2, 3=3, 5=5, 30=30, 60=60"
  # hex Off: 7E 30 30 32 35 30 20 30 0d
  # hex 2:   7E 30 30 32 35 30 20 32 0d
  # hex 3:   7E 30 30 32 35 30 20 33 0d
  # hex 5:   7E 30 30 32 35 30 20 35 0d
  # hex 30:  7E 30 30 32 35 30 20 33 30 0d
  # hex 60:  7E 30 30 32 35 30 20 36 30 0d

- id: remote_control_command
  label: Remote Control Command
  kind: action
  command: "~{device_id}140 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: "10=UP, 11=LEFT, 12=OK, 13=RIGHT, 14=DOWN, 17=Vol+, 18=Vol-, 20=Menu Key, 47=Input source, 74=Exit"
  # hex Vol +:          7E 30 30 31 34 30 20 31 37 0d
  # hex Vol -:          7E 30 30 31 34 30 20 31 38 0d
  # hex Remote UP:      7E 30 30 31 34 30 20 31 30 0d
  # hex Remote DOWN:    7E 30 30 31 34 30 20 31 34 0d
  # hex Remote LEFT:    7E 30 30 31 34 30 20 31 31 0d
  # hex Remote RIGHT:   7E 30 30 31 34 30 20 31 33 0d
  # hex Remote OK:      7E 30 30 31 34 30 20 31 32 0d
  # hex Remote Menu Key:7E 30 30 31 34 30 20 32 30 0d
  # hex Remote Input:   7E 30 30 31 34 30 20 34 37 0d
  # hex Remote Exit:    7E 30 30 31 34 30 20 37 34 0d

- id: osd_display_message
  label: Display Message on OSD
  kind: action
  command: "~{device_id}210 {nn...n}"
  params:
    - name: device_id
      type: string
    - name: nn
      type: string
      description: "Message text"
  # hex: 7E 30 30 32 31 30 20  nn…n od

- id: reset_to_default
  label: Reset To Default
  kind: action
  command: "~{device_id}112 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1 (reset)"
  # hex: 7E 30 30 31 31 32 20 31 od

- id: osd_lock_set
  label: OSD Lock Set (with password)
  kind: action
  command: "~{device_id}239 {n} {nnnn}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: "1=OSD lock On, 2=OSD lock Off"
    - name: nnnn
      type: string
      description: "Password"
  # hex on:  7E 30 30 32 33 39 20 31 20 a 0d
  # hex off: 7E 30 30 32 33 39 20 32 20 a 0d

# --- GET queries ---
- id: power_query
  label: Power Status Query
  kind: query
  command: "~{device_id}124 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 31 32 34 20 31 0D  -> OK0=off, OK1=on

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "~{device_id}126 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 31 32 36 20 31 0D  -> OK0-100

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "~{device_id}125 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 31 32 35 20 31 0D  -> OK0-100

- id: volume_query
  label: Volume Query
  kind: query
  command: "~{device_id}120 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 31 32 30 20 31 0D  -> OK0-100

- id: video_mute_query
  label: Video Mute Query
  kind: query
  command: "~{device_id}363 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 33 36 33 20 31 0D  -> OK0=Off, OK1=On

- id: mute_query
  label: Mute Query
  kind: query
  command: "~{device_id}356 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 33 35 36 20 31 0D  -> OK0=Off, OK1=On

- id: sound_mode_query
  label: Sound Mode Query
  kind: query
  command: "~{device_id}139 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 31 33 39 20 31 0D  -> OK1..OK5

- id: input_source_query
  label: Input Source Query
  kind: query
  command: "~{device_id}121 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 31 32 31 20 31 0D

- id: aspect_ratio_query
  label: Aspect Ratio Query
  kind: query
  command: "~{device_id}127 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 31 32 37 20 31 0D

- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "~{device_id}123 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 31 32 33 20 31 0D

- id: color_temp_query
  label: Color Temp Query
  kind: query
  command: "~{device_id}128 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 31 32 38 20 31 0D

- id: wlan_status_query
  label: WLAN Status Query
  kind: query
  command: "~{device_id}451 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 34 35 31 20 31 0D  -> OK0=Disconnected, OK1=Connected

- id: wlan_mac_query
  label: WLAN MAC Address Query
  kind: query
  command: "~{device_id}555 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=2"
  # hex: 7E 30 30 35 35 35 20 32 0D  -> nn:nn:nn:nn:nn:nn

- id: wlan_ip_query
  label: WLAN IP Address Query
  kind: query
  command: "~{device_id}451 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=2"
  # hex: 7E 30 30 34 35 31 20 32 0D

- id: lan_status_query
  label: LAN Status Query
  kind: query
  command: "~{device_id}87 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 38 37 20 31 0D  -> OK0=Disconnected, OK1=Connected

- id: lan_mac_query
  label: LAN MAC Address Query
  kind: query
  command: "~{device_id}555 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 35 35 35 20 31 0D

- id: lan_ip_query
  label: LAN IP Address Query
  kind: query
  command: "~{device_id}87 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=3"
  # hex: 7E 30 30 38 37 20 33 0D

- id: fw_version_query
  label: Firmware Version Query
  kind: query
  command: "~{device_id}122 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 31 32 32 20 31 0D  -> ex. 20190926164814

- id: usage_hour_query
  label: Usage Hour Query
  kind: query
  command: "~{device_id}108 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 31 30 38 20 31 0D  -> nnnnn hours

- id: device_type_query
  label: Device Type Query
  kind: query
  command: "~{device_id}149 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 31 34 39 20 31 0D  -> OK2=IFP

- id: information_string_query
  label: Information String Query
  kind: query
  command: "~{device_id}150 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: enum
      description: >-
        1=combined info, 2=device native resolution, 3=input source,
        4=source resolution, 16=power mode (standby), 17=DHCP, 18=system temperature,
        19=source refresh rate
  # hex n=1: 7E 30 30 31 35 30 20 31 0D  -> OKabbbbbccddddee
  # hex n=2: 7E 30 30 31 35 30 20 32 0D
  # hex n=3: 7E 30 30 31 35 30 20 33 0D
  # hex n=4: 7E 30 30 31 35 30 20 34 0D
  # hex n=16:7E 30 30 31 35 30 20 31 36 0D
  # hex n=17:7E 30 30 31 35 30 20 31 37 0D
  # hex n=18:7E 30 30 31 35 30 20 31 38 0D
  # hex n=19:7E 30 30 31 35 30 20 31 39 0D

- id: regulatory_model_name_query
  label: Regulatory Model Name Query
  kind: query
  command: "~{device_id}151 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=3"
  # hex: 7E 30 30 31 35 31 20 33 0d  -> ex. SLUGRK

- id: osd_lock_query
  label: OSD Lock Query
  kind: query
  command: "~{device_id}229 {n}"
  params:
    - name: device_id
      type: string
    - name: n
      type: integer
      description: "n=1"
  # hex: 7E 30 30 32 32 39 20 31 0D  -> OK0=Off, OK1=On
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  source: power_query (OK0/OK1)

- id: video_mute_state
  type: enum
  values: [off, on]
  source: video_mute_query

- id: mute_state
  type: enum
  values: [off, on]
  source: mute_query

- id: osd_lock_state
  type: enum
  values: [off, on]
  source: osd_lock_query

- id: wlan_status
  type: enum
  values: [disconnected, connected]
  source: wlan_status_query

- id: lan_status
  type: enum
  values: [disconnected, connected]
  source: lan_status_query

- id: system_state_event
  type: enum
  values:
    - INFO0  # Standby Mode
    - INFO1  # Warming up
    - INFO2  # Cooling down
    - INFO7  # Over temperature
  description: "Unsolicited system auto-send events"

- id: led_indicator
  type: enum
  values:
    - solid_red        # Standby
    - solid_white      # Power on
    - flash_red_blue   # Backlight off
```

## Variables
```yaml
- id: treble
  type: integer
  range: [0, 100]
- id: bass
  type: integer
  range: [0, 100]
- id: balance
  type: integer
  range: [0, 100]
- id: contrast
  type: integer
  range: [0, 100]
- id: brightness
  type: integer
  range: [0, 100]
- id: color
  type: integer
  range: [0, 100]
- id: backlight
  type: integer
  range: [0, 100]
- id: volume
  type: integer
  range: [0, 100]
- id: usage_hours
  type: integer
  description: "Read-only via usage_hour_query"
- id: system_temperature
  type: integer
  description: "Read-only via information_string_query n=18 (ex. OK48)"
```

## Events
```yaml
- id: system_auto_send
  description: "Device auto-sends status transitions"
  signals:
    INFO0: Standby Mode
    INFO1: Warming up
    INFO2: Cooling down
    INFO7: Over temperature
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >-
      Remote power-on via LAN/OMS only works when Power Mode (Standby) = Active.
      Active Standby keeps mainboard powered to listen for wake commands and
      consumes higher power. Eco Standby disables remote power-on.
# UNRESOLVED: no voltage/current/power ratings stated in source. Over-temperature
# reported via INFO7 event but no shutdown/interlock procedure documented.
```

## Notes
- Device ID `xx` in source CMD column = 2-digit identifier; default `01`. Hex examples in source use `30 30` (= "00") as placeholder — verbatim per row.
- Frame format: `~ {device_id} {cmd_id} SP {value} CR` (0x7E ... 0x20 ... 0x0d).
- Source labels product "IFP" (Interactive Flat Panel); GET device_type returns OK2=IFP.
- SET response: `P` = success, `F` = failed. GET response: `OK{value}` = success, `F` = failed.
- Information string (n=1) packs power + usage + source + FW + display mode: `OKabbbbbccddddee`.

<!-- UNRESOLVED: full model variant list beyond 5652Rk not stated. Authentication/credentials for OSD lock password format only shown as "a" placeholder — actual password encoding not documented. -->
```

Spec built. 45 actions (24 SET + 21 GET), all hex verbatim from source. Both serial+TCP transports, port 23, baud 9600 explicitly stated. Auth inferred none. Events + LED feedback captured. Safety interlock for Active Standby power-on documented; voltage/power left UNRESOLVED per policy.

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/2fca8df0-8259-43cb-a8f4-a9a9dd49f36a.pdf
retrieved_at: 2026-07-13T19:38:47.156Z
last_checked_at: 2026-07-22T00:20:41.764Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:20:41.764Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions matched verbatim in source with correct wire tokens, parameters, and ranges; transport parameters fully verified; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device type only labeled \"IFP\" — full product family/submodel not stated. Voltage/power specs not in source."
- "no multi-step sequences described in source"
- "no voltage/current/power ratings stated in source. Over-temperature"
- "full model variant list beyond 5652Rk not stated. Authentication/credentials for OSD lock password format only shown as \"a\" placeholder — actual password encoding not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
