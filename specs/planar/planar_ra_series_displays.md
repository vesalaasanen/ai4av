---
spec_id: admin/planar-ra-series-displays
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar RA-Series Displays Control Spec"
manufacturer: Planar
model_family: RA-Series
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - RA-Series
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/olwcpmt4/ra4980-ra5580-rs232-manual-20150609-watermarked.pdf
  - https://www.planar.com/media/uuoptbfm/ra4980-ra5580-user-manual-20150609-watermarked-rev.pdf
retrieved_at: 2026-05-07T14:30:52.298Z
last_checked_at: 2026-06-03T05:33:26.257Z
generated_at: 2026-06-03T05:33:26.257Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN port 5000 referenced in §2.2 but no LAN command set documented"
  - "source contains no explicit safety warnings or interlock procedures"
  - "LAN protocol/commands not documented; firmware version not stated; source typos in §6.18 (Logo Get example reuses Switch On Delay bytes 0x8B instead of 0x8D) and §7.10 (Model Name Get example reuses 0xC6 instead of 0xC8) preserved per source"
verification:
  verdict: verified
  checked_at: 2026-06-03T05:33:26.257Z
  matched_actions: 126
  action_count: 126
  confidence: medium
  summary: "All 126 spec actions traced to source (dip-safe re-verify). (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Planar RA-Series Displays Control Spec

## Summary
RS-232C control for Planar RA-Series LCD displays. 9600 8N1, null-modem DB9, fixed packet format with XOR checksum, Monitor ID 1–255. Covers OSD picture/sound, tiling, scheduling, power, input, volume, and IR passthrough.

<!-- UNRESOLVED: LAN port 5000 referenced in §2.2 but no LAN command set documented -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from Power State Set 0xA3
- routable        # inferred from Input Source Set 0xA5
- queryable       # inferred from Get/Report commands
- levelable       # inferred from Volume/Backlight/Brightness/Treble/Bass
```

## Actions

### Picture — OSD

```yaml
- id: picture_style_set
  label: Picture Style Set
  kind: action
  command: "A6 01 00 00 00 04 01 01 {style} {cs}"
  params:
    - name: style
      type: integer
      description: "0=Personal, 1=Vivid, 2=Natural, 3=Standard, 4=Movie, 5=Photo, 6=EnergySaving"

- id: picture_style_get
  label: Picture Style Get
  kind: query
  command: "A6 01 00 00 00 03 01 02 A7"

- id: picture_style_restore
  label: Picture Style Restore
  kind: action
  command: "A6 01 00 00 00 03 01 FA 5F"

- id: backlight_set
  label: Backlight Set
  kind: action
  command: "A6 01 00 00 00 04 01 03 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x64 = 0-100"

- id: backlight_get
  label: Backlight Get
  kind: query
  command: "A6 01 00 00 00 03 01 04 A1"

- id: color_set
  label: Color State Set
  kind: action
  command: "A6 01 00 00 00 04 01 05 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x64 = 0-100"

- id: color_get
  label: Color State Get
  kind: query
  command: "A6 01 00 00 00 03 01 06 A3"

- id: sharpness_set
  label: Sharpness Set
  kind: action
  command: "A6 01 00 00 00 04 01 07 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x14 = 0-20"

- id: sharpness_get
  label: Sharpness Get
  kind: query
  command: "A6 01 00 00 00 03 01 08 AD"

- id: noise_reduction_set
  label: Noise Reduction Set
  kind: action
  command: "A6 01 00 00 00 04 01 0A {level} {cs}"
  params:
    - name: level
      type: integer
      description: "0=Off, 1=Minimum, 2=Medium, 3=Maximum"

- id: noise_reduction_get
  label: Noise Reduction Get
  kind: query
  command: "A6 01 00 00 00 03 01 0B AE"

- id: mpeg_artifact_reduction_set
  label: MPEG Artifact Reduction Set
  kind: action
  command: "A6 01 00 00 00 04 01 0C {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: mpeg_artifact_reduction_get
  label: MPEG Artifact Reduction Get
  kind: query
  command: "A6 01 00 00 00 03 01 0D A8"

- id: advanced_sharpness_set
  label: Advanced Sharpness Set
  kind: action
  command: "A6 01 00 00 00 04 01 0E {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: advanced_sharpness_get
  label: Advanced Sharpness Get
  kind: query
  command: "A6 01 00 00 00 03 01 0F AA"

- id: dynamic_contrast_set
  label: Dynamic Contrast Set
  kind: action
  command: "A6 01 00 00 00 04 01 11 {level} {cs}"
  params:
    - name: level
      type: integer
      description: "0=Off, 1=Minimum, 2=Medium, 3=Maximum"

- id: dynamic_contrast_get
  label: Dynamic Contrast Get
  kind: query
  command: "A6 01 00 00 00 03 01 12 B7"

- id: color_enhancement_set
  label: Color Enhancement Set
  kind: action
  command: "A6 01 00 00 00 04 01 13 {level} {cs}"
  params:
    - name: level
      type: integer
      description: "0=Off, 1=Minimum, 2=Medium, 3=Maximum"

- id: color_enhancement_get
  label: Color Enhancement Get
  kind: query
  command: "A6 01 00 00 00 03 01 14 B1"

- id: gamma_set
  label: Gamma Set
  kind: action
  command: "A6 01 00 00 00 04 01 15 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0=1.8, 1=1.9, 2=2.0, 3=2.1, 4=2.2, 5=2.3, 6=2.4, 7=2.5"

- id: gamma_get
  label: Gamma Get
  kind: query
  command: "A6 01 00 00 00 03 01 16 B3"

- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  command: "A6 01 00 00 00 04 01 17 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0=10000K, 1=9300K, 2=6500K, 3=3200K, 4=Custom"

- id: color_temperature_get
  label: Color Temperature Get
  kind: query
  command: "A6 01 00 00 00 03 01 18 BD"

- id: custom_color_temperature_set
  label: Custom Color Temperature Set
  kind: action
  command: "A6 01 00 00 00 0A 01 1A {Rgain} {Ggain} {Bgain} {Roff} {Goff} {Boff} {cs}"
  params:
    - name: Rgain
      type: integer
      description: "0x00-0xFF = 0-255"
    - name: Ggain
      type: integer
      description: "0x00-0xFF = 0-255"
    - name: Bgain
      type: integer
      description: "0x00-0xFF = 0-255"
    - name: Roff
      type: integer
      description: "0x00-0xFF = 0-255"
    - name: Goff
      type: integer
      description: "0x00-0xFF = 0-255"
    - name: Boff
      type: integer
      description: "0x00-0xFF = 0-255"

- id: custom_color_temperature_get
  label: Custom Color Temperature Get
  kind: query
  command: "A6 01 00 00 00 03 01 1B BE"

- id: video_contrast_set
  label: Video Contrast Set
  kind: action
  command: "A6 01 00 00 00 04 01 1C {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x64 = 0-100"

- id: video_contrast_get
  label: Video Contrast Get
  kind: query
  command: "A6 01 00 00 00 03 01 1D B8"

- id: brightness_set
  label: Brightness Set
  kind: action
  command: "A6 01 00 00 00 04 01 1E {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x64 = 0-100"

- id: brightness_get
  label: Brightness Get
  kind: query
  command: "A6 01 00 00 00 03 01 1F BA"

- id: hue_set
  label: Hue Set
  kind: action
  command: "A6 01 00 00 00 04 01 21 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x64 = -50 to 50"

- id: hue_get
  label: Hue Get
  kind: query
  command: "A6 01 00 00 00 03 01 22 87"

- id: color_space_set
  label: Color Space Set
  kind: action
  command: "A6 01 00 00 00 04 01 23 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0=Auto, 1=RGB-Video, 2=RGB-PC, 3=YUV"

- id: color_space_get
  label: Color Space Get
  kind: query
  command: "A6 01 00 00 00 03 01 24 81"

- id: picture_format_set
  label: Picture Format Set
  kind: action
  command: "A6 01 00 00 00 04 01 25 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0=Auto Zoom, 1=16:9, 2=Wide, 3=Unscaled, 4=4:3"

- id: picture_format_get
  label: Picture Format Get
  kind: query
  command: "A6 01 00 00 00 03 01 26 83"

- id: picture_shift_set
  label: Picture Shift Set
  kind: action
  command: "A6 01 00 00 00 04 01 27 {direction} {cs}"
  params:
    - name: direction
      type: integer
      description: "1=Up, 2=Down, 3=Left, 4=Right"

- id: picture_shift_get
  label: Picture Shift Get
  kind: query
  command: "A6 01 00 00 00 03 01 28 8D"

- id: input_resolution_set
  label: Input Resolution Set (VGA only)
  kind: action
  command: "A6 01 00 00 00 04 01 2A {group} {cs}"
  params:
    - name: group
      type: integer
      description: "Group 0x00: 0=1366x768@60, 1=1360x768@60, 2=1280x768@60, 3=1024x768@60. Group 0x01: 0=1680x1050@60, 1=1440x1050@60. DATA[1] high nibble selects group, low nibble selects value - see source §3.16.3."

- id: input_resolution_get
  label: Input Resolution Get
  kind: query
  command: "A6 01 00 00 00 03 01 2B 8E"
```

### Sound — OSD

```yaml
- id: sound_style_set
  label: Sound Style Set
  kind: action
  command: "A6 01 00 00 00 04 01 31 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0=Personal, 1=Original, 2=Movie, 3=Music, 4=Game, 5=News"

- id: sound_style_get
  label: Sound Style Get
  kind: query
  command: "A6 01 00 00 00 03 01 32 97"

- id: sound_style_restore
  label: Sound Style Restore
  kind: action
  command: "A6 01 00 00 00 03 01 FB 5E"

- id: bass_set
  label: Bass Set
  kind: action
  command: "A6 01 00 00 00 04 01 33 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x10 = -8 to 8"

- id: bass_get
  label: Bass Get
  kind: query
  command: "A6 01 00 00 00 03 01 34 91"

- id: treble_set
  label: Treble Set
  kind: action
  command: "A6 01 00 00 00 04 01 35 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x10 = -8 to 8"

- id: treble_get
  label: Treble Get
  kind: query
  command: "A6 01 00 00 00 03 01 36 93"

- id: balance_set
  label: Balance Set
  kind: action
  command: "A6 01 00 00 00 04 01 37 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x10 = -8 to 8"

- id: balance_get
  label: Balance Get
  kind: query
  command: "A6 01 00 00 00 03 01 38 9D"

- id: surround_mode_set
  label: Surround Mode Set
  kind: action
  command: "A6 01 00 00 00 04 01 3A {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: surround_mode_get
  label: Surround Mode Get
  kind: query
  command: "A6 01 00 00 00 03 01 3B 9E"

- id: audio_out_set
  label: Audio Out Set
  kind: action
  command: "A6 01 00 00 00 04 01 3C {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x3C = 0-60"

- id: audio_out_get
  label: Audio Out Get
  kind: query
  command: "A6 01 00 00 00 03 01 3D 98"

- id: auto_volume_leveling_set
  label: Auto Volume Leveling Set
  kind: action
  command: "A6 01 00 00 00 04 01 3E {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: auto_volume_leveling_get
  label: Auto Volume Leveling Get
  kind: query
  command: "A6 01 00 00 00 03 01 3F 9A"

- id: speaker_setting_set
  label: Speaker Setting Set
  kind: action
  command: "A6 01 00 00 00 04 01 41 {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: speaker_setting_get
  label: Speaker Setting Get
  kind: query
  command: "A6 01 00 00 00 03 01 42 E7"

- id: clear_sound_set
  label: Clear Sound Set
  kind: action
  command: "A6 01 00 00 00 04 01 43 {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: clear_sound_get
  label: Clear Sound Get
  kind: query
  command: "A6 01 00 00 00 03 01 44 E1"
```

### Tiling

```yaml
- id: tiling_parameters_set
  label: Tiling Parameters Set
  kind: action
  command: "A6 01 00 00 00 0A 01 51 {enable} {H} {V} {position} {frameComp} {Hlo} {Hhi} {Vlo} {Vhi} {cs}"
  params:
    - name: enable
      type: integer
      description: "0=Off, 1=On"
    - name: H
      type: integer
      description: "Horizontal monitors, 0x01-0x0A = 1-10"
    - name: V
      type: integer
      description: "Vertical monitors, 0x01-0x0A = 1-10"
    - name: position
      type: integer
      description: "0x00-0x64 = 1-100 (position in screen matrix)"
    - name: frameComp
      type: integer
      description: "0=Off, 1=On (frame compensation)"
    - name: Hlo
      type: integer
      description: "Frame Comp. H low byte, 0x00-0xFF"
    - name: Hhi
      type: integer
      description: "Frame Comp. H high byte, 0x00-0xFF (range 0-800)"
    - name: Vlo
      type: integer
      description: "Frame Comp. V low byte, 0x00-0xFF"
    - name: Vhi
      type: integer
      description: "Frame Comp. V high byte, 0x00-0xFF (range 0-800)"

- id: tiling_parameters_get
  label: Tiling Parameters Get
  kind: query
  command: "A6 01 00 00 00 03 01 52 E7"
```

### General Setting

```yaml
- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  command: "A6 01 00 00 00 04 01 65 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0=Normal, 1=Low Power Standby"

- id: eco_mode_get
  label: ECO Mode Get
  kind: query
  command: "A6 01 00 00 00 03 01 66 C3"

- id: auto_search_set
  label: Auto Search Set
  kind: action
  command: "A6 01 00 00 00 04 01 67 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Failover"

- id: auto_search_get
  label: Auto Search Get
  kind: query
  command: "A6 01 00 00 00 03 01 68 CD"

- id: failover_set
  label: Failover Priority Set
  kind: action
  command: "A6 01 00 00 00 0A 01 6A {p1} {p2} {p3} {p4} {p5} {p6} {p7} {cs}"
  params:
    - name: p1
      type: integer
      description: "1st priority: 0=Reserved, 1=HDMI 1, 2=HDMI 2, 3=DisplayPort, 4=OPS, 5=DVI-D, 6=YPbPr, 7=AV, 8=VGA"
    - name: p2
      type: integer
      description: "2nd priority (same enum as p1)"
    - name: p3
      type: integer
      description: "3rd priority (same enum as p1)"
    - name: p4
      type: integer
      description: "4th priority (same enum as p1)"
    - name: p5
      type: integer
      description: "5th priority (same enum as p1)"
    - name: p6
      type: integer
      description: "6th priority (same enum as p1)"
    - name: p7
      type: integer
      description: "7th priority (same enum as p1)"

- id: failover_get
  label: Failover Priority Get
  kind: query
  command: "A6 01 00 00 00 03 01 6B CE"

- id: daylight_saving_set
  label: Daylight Saving Set
  kind: action
  command: "A6 01 00 00 00 04 01 6C {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0=Daylight saving time, 1=Standard time"

- id: daylight_saving_get
  label: Daylight Saving Get
  kind: query
  command: "A6 01 00 00 00 03 01 6D CD"

- id: date_set
  label: Date Set
  kind: action
  command: "A6 01 00 00 00 06 01 6E {year} {month} {day} {cs}"
  params:
    - name: year
      type: integer
      description: "0x0E-0x63 = 2014-2099"
    - name: month
      type: integer
      description: "0x01-0x0C = JAN-DEC"
    - name: day
      type: integer
      description: "1-28/29/30/31 depending on month (see source §6.5.3)"

- id: date_get
  label: Date Get
  kind: query
  command: "A6 01 00 00 00 03 01 6F CA"

- id: time_set
  label: Time Set
  kind: action
  command: "A6 01 00 00 00 05 01 71 {hour} {minute} {cs}"
  params:
    - name: hour
      type: integer
      description: "0x00-0x17 = 0-23"
    - name: minute
      type: integer
      description: "0x00-0x3B = 0-59"

- id: time_get
  label: Time Get
  kind: query
  command: "A6 01 00 00 00 03 01 72 D7"

- id: scheduling_set
  label: Scheduling Parameters Set
  kind: action
  command: "A6 01 00 00 00 0A 01 73 {page} {startH} {startM} {endH} {endM} {source} {days} {cs}"
  params:
    - name: page
      type: integer
      description: "Bit7-4: scheduling page 1-7. Bit3-0: 0=disable, 1=enable page."
    - name: startH
      type: integer
      description: "Start hour 0x00-0x17 (24=NULL)"
    - name: startM
      type: integer
      description: "Start minute 0x00-0x3B (60=NULL)"
    - name: endH
      type: integer
      description: "End hour 0x00-0x17 (24=NULL)"
    - name: endM
      type: integer
      description: "End minute 0x00-0x3B (60=NULL)"
    - name: source
      type: integer
      description: "0=NULL, 1=Reserved, 2=Reserved, 3=HDMI 1, 4=HDMI 2, 5=DisplayPort, 6=OPS, 7=DVI-D, 8=YPbPr, 9=AV, 0x0A=VGA"
    - name: days
      type: integer
      description: "Bit0=every week, Bit1=Mon, Bit2=Tue, Bit3=Wed, Bit4=Thu, Bit5=Fri, Bit6=Sat, Bit7=Sun"

- id: scheduling_get
  label: Scheduling Parameters Get (Page 1)
  kind: query
  command: "A6 01 00 00 00 04 01 74 01 D7"

- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  command: "A6 01 00 00 00 04 01 75 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0xF0 = 0-240 (minutes)"

- id: sleep_timer_get
  label: Sleep Timer Get
  kind: query
  command: "A6 01 00 00 00 03 01 76 D3"

- id: cec_set
  label: CEC Set
  kind: action
  command: "A6 01 00 00 00 04 01 77 {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: cec_get
  label: CEC Get
  kind: query
  command: "A6 01 00 00 00 03 01 78 DD"

- id: local_kb_lock_set
  label: Local KB Lock Set
  kind: action
  command: "A6 01 00 00 00 04 01 7A {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Unlock, 1=Lock All"

- id: local_kb_lock_get
  label: Local KB Lock Get
  kind: query
  command: "A6 01 00 00 00 03 01 7B DE"

- id: rc_lock_set
  label: RC Lock Set
  kind: action
  command: "A6 01 00 00 00 04 01 7C {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Unlock, 1=Lock All"

- id: rc_lock_get
  label: RC Lock Get
  kind: query
  command: "A6 01 00 00 00 03 01 7D D8"

- id: pixel_shift_set
  label: Pixel Shift Set
  kind: action
  command: "A6 01 00 00 00 04 01 7E {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: pixel_shift_get
  label: Pixel Shift Get
  kind: query
  command: "A6 01 00 00 00 03 01 7F DA"

- id: smart_power_set
  label: Smart Power Set
  kind: action
  command: "A6 01 00 00 00 04 01 81 {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: smart_power_get
  label: Smart Power Get
  kind: query
  command: "A6 01 00 00 00 03 01 82 27"

- id: wake_on_lan_set
  label: Wake On LAN Set
  kind: action
  command: "A6 01 00 00 00 04 01 83 {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: wake_on_lan_get
  label: Wake On LAN Get
  kind: query
  command: "A6 01 00 00 00 03 01 84 21"

- id: switch_on_state_set
  label: Switch On State Set
  kind: action
  command: "A6 01 00 00 00 04 01 85 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0=On, 1=Standby, 2=Last Status"

- id: switch_on_state_get
  label: Switch On State Get
  kind: query
  command: "A6 01 00 00 00 03 01 86 23"

- id: led_set
  label: LED Set
  kind: action
  command: "A6 01 00 00 00 04 01 87 {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: led_get
  label: LED Get
  kind: query
  command: "A6 01 00 00 00 03 01 88 2D"

- id: switch_on_delay_set
  label: Switch On Delay Set
  kind: action
  command: "A6 01 00 00 00 04 01 8A {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x3C = 0-60 (seconds)"

- id: switch_on_delay_get
  label: Switch On Delay Get
  kind: query
  command: "A6 01 00 00 00 03 01 8B 2E"

- id: logo_set
  label: Logo Set
  kind: action
  command: "A6 01 00 00 00 04 01 8C {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: logo_get
  label: Logo Get
  kind: query
  command: "A6 01 00 00 00 03 01 8D 28"

- id: apm_set
  label: APM Set
  kind: action
  command: "A6 01 00 00 00 04 01 8E {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x3C = Off to 60 minutes"

- id: apm_get
  label: APM Get
  kind: query
  command: "A6 01 00 00 00 03 01 8F 2A"

- id: information_osd_set
  label: Information OSD Set
  kind: action
  command: "A6 01 00 00 00 04 01 91 {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: information_osd_get
  label: Information OSD Get
  kind: query
  command: "A6 01 00 00 00 03 01 92 37"

- id: display_port_ver_set
  label: Display Port Ver. Set
  kind: action
  command: "A6 01 00 00 00 04 01 93 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0=1.1a, 1=1.2"

- id: display_port_ver_get
  label: Display Port Ver. Get
  kind: query
  command: "A6 01 00 00 00 03 01 94 31"

- id: cooling_fan_set
  label: Cooling Fan Set
  kind: action
  command: "A6 01 00 00 00 04 01 95 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Auto"

- id: cooling_fan_get
  label: Cooling Fan Get
  kind: query
  command: "A6 01 00 00 00 03 01 96 33"

- id: network_control_port_set
  label: Network Control Port Set
  kind: action
  command: "A6 01 00 00 00 04 01 97 {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0=RS232, 1=LAN(RJ-45)"

- id: network_control_port_get
  label: Network Control Port Get
  kind: query
  command: "A6 01 00 00 00 03 01 98 3D"

- id: osd_time_out_set
  label: OSD Time Out Set
  kind: action
  command: "A6 01 00 00 00 04 01 9A {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x3C = 0-60"

- id: osd_time_out_get
  label: OSD Time Out Get
  kind: query
  command: "A6 01 00 00 00 03 01 9B 3E"

- id: auto_adjust
  label: Auto Adjust (VGA)
  kind: action
  command: "A6 01 00 00 00 03 01 FC 59"

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "A6 01 00 00 00 03 01 FD 58"
```

### Power, Input, Video, Audio

```yaml
- id: power_state_set
  label: Power State Set
  kind: action
  command: "A6 01 00 00 00 04 01 A3 {state} {cs}"
  params:
    - name: state
      type: integer
      description: "0x01=Off, 0x02=On"

- id: power_state_get
  label: Power State Get
  kind: query
  command: "A6 01 00 00 00 03 01 A4 01"

- id: input_source_set
  label: Input Source Set
  kind: action
  command: "A6 01 00 00 00 04 01 A5 {source} {cs}"
  params:
    - name: source
      type: integer
      description: "0x01=Reserved, 0x02=Reserved, 0x03=HDMI 1, 0x04=HDMI 2, 0x05=Display Port, 0x06=Card OPS, 0x07=DVI-D, 0x08=YPbPr, 0x09=AV, 0x0A=VGA"

- id: input_source_get
  label: Input Source Get
  kind: query
  command: "A6 01 00 00 00 03 01 A6 03"

- id: video_parameters_set
  label: Video Parameters Set
  kind: action
  command: "A6 01 00 00 00 0A 01 AA {brightness} {color} {contrast} {sharpness} {hue} {blackLevel} {gamma} {cs}"
  params:
    - name: brightness
      type: integer
      description: "0x00-0x64 = 0-100"
    - name: color
      type: integer
      description: "0x00-0x64 = 0-100"
    - name: contrast
      type: integer
      description: "0x00-0x64 = 0-100"
    - name: sharpness
      type: integer
      description: "0x00-0x64 = 0-100"
    - name: hue
      type: integer
      description: "0x00-0x64 = -50 to 50"
    - name: blackLevel
      type: integer
      description: "0x00-0x64 = 0-100"
    - name: gamma
      type: integer
      description: "0=1.8, 1=1.9, 2=2.0, 3=2.1, 4=2.2, 5=2.3, 6=2.4, 7=2.5"

- id: video_parameters_get
  label: Video Parameters Get
  kind: query
  command: "A6 01 00 00 00 03 01 AB 0E"

- id: volume_set
  label: Volume Set
  kind: action
  command: "A6 01 00 00 00 04 01 AC {value} {cs}"
  params:
    - name: value
      type: integer
      description: "0x00-0x3C = 0-60"

- id: volume_get
  label: Volume Get
  kind: query
  command: "A6 01 00 00 00 03 01 AD 08"

- id: audio_parameters_set
  label: Audio Parameters Set
  kind: action
  command: "A6 01 00 00 00 05 01 AE {treble} {bass} {cs}"
  params:
    - name: treble
      type: integer
      description: "0x00-0x10 = -8 to 8"
    - name: bass
      type: integer
      description: "0x00-0x10 = -8 to 8"

- id: audio_parameters_get
  label: Audio Parameters Get
  kind: query
  command: "A6 01 00 00 00 03 01 AF 0A"

- id: volume_increase_decrease
  label: Volume Increase/Decrease
  kind: action
  command: "A6 01 00 00 00 04 01 B1 {direction} {cs}"
  params:
    - name: direction
      type: integer
      description: "0=Decrease by step 1, 1=Increase by step 1"

- id: volume_limits_set
  label: Volume Limits Set
  kind: action
  command: "A6 01 00 00 00 06 01 B3 {min} {max} {switchOn} {cs}"
  params:
    - name: min
      type: integer
      description: "Minimum volume 0x00-0x3C (rule: min ≤ switchOn ≤ max)"
    - name: max
      type: integer
      description: "Maximum volume 0x00-0x3C"
    - name: switchOn
      type: integer
      description: "Switch-on volume 0x00-0x3C"

- id: operating_hours_get
  label: Operating Hours Get
  kind: query
  command: "A6 01 00 00 00 03 01 C2 67"

- id: temperature_get
  label: Temperature Sensor Get
  kind: query
  command: "A6 01 00 00 00 04 01 C6 63"
  # Note: source §7.9.1 Get example shows Length=0x04 with a single DATA byte (DATA[0]=0xC6) then Checksum=0x63

- id: model_name_get
  label: Model Name Get
  kind: query
  command: "A6 01 00 00 00 04 01 C8 01 63"
  # Note: source's Get example reuses temp sensor bytes; report uses 0xC8 with ASCII string payload
```

### IR Remote

```yaml
- id: ir_remote
  label: IR Remote Key
  kind: action
  command: "A6 01 00 00 00 04 01 DB {key} {cs}"
  params:
    - name: key
      type: integer
      description: "0xA0=Power, 0xA1=Menu, 0xA2=Input, 0xA3=Vol_Up, 0xA4=Vol_Down, 0xA5=Mute, 0xA6=Cursor_Up, 0xA7=Cursor_Down, 0xA8=Cursor_Left, 0xA9=Cursor_Right, 0xB1=OK, 0xB2=Return, 0xC1=Red, 0xC2=Green, 0xC3=Yellow, 0xC4=Blue, 0xD1=Format, 0xD2=Info, 0x00=Btn_0..0x09=Btn_9"
```

## Feedbacks
```yaml
# Report packet format (header 0x21, Monitor ID, Category 0x00, Page, Length, Control 0x01, DATA[0]=command code, DATA[1..N]=response, Checksum)
# Standard reply: 0x21 0x01 0x00 0x00 0x04 0x01 <command_code> <Data[0]> <checksum>
# Acknowledgements:
#   ACK:  DATA[0]=0x00 (command well executed)
#   NACK: DATA[0]=0x03 (unknown command code)
#   NAV:  DATA[0]=0x04 (checksum error or unsupported parameter)
# No reply for wrong Monitor ID.
- id: ack
  type: enum
  values: [ack, nack, nav]
- id: power_state
  type: enum
  values: [off, on]  # DATA[1] 0x01=Off, 0x02=On
- id: input_source
  type: enum
  values: [reserved_1, reserved_2, hdmi_1, hdmi_2, display_port, card_ops, dvi_d, ypbpr, av, vga]
- id: picture_style
  type: enum
  values: [personal, vivid, natural, standard, movie, photo, energy_saving]
- id: backlight
  type: range
  min: 0
  max: 100
- id: color
  type: range
  min: 0
  max: 100
- id: sharpness
  type: range
  min: 0
  max: 20
- id: hue
  type: range
  min: -50
  max: 50
- id: bass
  type: range
  min: -8
  max: 8
- id: treble
  type: range
  min: -8
  max: 8
- id: balance
  type: range
  min: -8
  max: 8
- id: volume
  type: range
  min: 0
  max: 60
- id: audio_out
  type: range
  min: 0
  max: 60
- id: gamma
  type: enum
  values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5"]
- id: color_temperature
  type: enum
  values: ["10000K", "9300K", "6500K", "3200K", "Custom"]
- id: color_space
  type: enum
  values: [auto, rgb_video, rgb_pc, yuv]
- id: picture_format
  type: enum
  values: [auto_zoom, "16:9", wide, unscaled, "4:3"]
- id: noise_reduction
  type: enum
  values: [off, minimum, medium, maximum]
- id: dynamic_contrast
  type: enum
  values: [off, minimum, medium, maximum]
- id: color_enhancement
  type: enum
  values: [off, minimum, medium, maximum]
- id: surround_mode
  type: enum
  values: [off, on]
- id: auto_volume_leveling
  type: enum
  values: [off, on]
- id: speaker_setting
  type: enum
  values: [off, on]
- id: clear_sound
  type: enum
  values: [off, on]
- id: eco_mode
  type: enum
  values: [normal, low_power_standby]
- id: auto_search
  type: enum
  values: [off, on, failover]
- id: failover_priority
  type: array
  description: 7 priority slots, each 0x00=Reserved, 0x01=HDMI 1, 0x02=HDMI 2, 0x03=DisplayPort, 0x04=OPS, 0x05=DVI-D, 0x06=YPbPr, 0x07=AV, 0x08=VGA
- id: daylight_saving
  type: enum
  values: [daylight_saving_time, standard_time]
- id: sleep_timer
  type: range
  min: 0
  max: 240
- id: cec
  type: enum
  values: [off, on]
- id: local_kb_lock
  type: enum
  values: [unlock, lock_all]
- id: rc_lock
  type: enum
  values: [unlock, lock_all]
- id: pixel_shift
  type: enum
  values: [off, on]
- id: smart_power
  type: enum
  values: [off, on]
- id: wake_on_lan
  type: enum
  values: [off, on]
- id: switch_on_state
  type: enum
  values: [on, standby, last_status]
- id: led
  type: enum
  values: [off, on]
- id: switch_on_delay
  type: range
  min: 0
  max: 60
- id: logo
  type: enum
  values: [off, on]
- id: apm
  type: range
  min: 0
  max: 60
  description: minutes
- id: information_osd
  type: enum
  values: [off, on]
- id: display_port_version
  type: enum
  values: ["1.1a", "1.2"]
- id: cooling_fan
  type: enum
  values: [off, on, auto]
- id: network_control_port
  type: enum
  values: [rs232, lan]
- id: osd_time_out
  type: range
  min: 0
  max: 60
- id: operating_hours
  type: integer
  description: 16-bit value, MSByte=DATA[1], LSByte=DATA[2]
- id: temperature_sensor_1
  type: integer
  description: 0-100 °C represented in hex (±3°C accuracy)
- id: custom_color_temperature
  type: object
  description: Six 0-255 gain/offset values (R/G/B Gain, R/G/B Offset)
- id: tiling_parameters
  type: object
  description: enable, H monitors (1-10), V monitors (1-10), position (1-100), frameComp on/off, frameComp H (0-800), frameComp V (0-800)
- id: date
  type: object
  description: year (2014-2099), month (JAN-DEC), day
- id: time
  type: object
  description: hour (0-23), minute (0-59)
- id: scheduling_parameters
  type: object
  description: page state, start/end time, video source, working-day bitmask
- id: picture_shift
  type: object
  description: H/V position (Analog 0-100, Digital -16 to 16)
- id: input_resolution
  type: object
  description: Group + sub-resolution (see source §3.16.2)
- id: model_name
  type: string
  description: ASCII model name (DATA[1..N])
- id: serial_number
  type: string
  description: 0xC4 Get exists per source summary; data format not detailed in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset          # 0xFD resets all settings
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures
```

## Notes
- All Set/Get examples in source use Monitor ID 0x01. Range 1–255; commands addressed to wrong ID get no reply.
- Packet: Header 0xA6 | MonitorID | Category 0x00 | Code0 0x00 | Code1 0x00 | Length=N+3 | Data Control 0x01 | DATA[0..N] | Checksum (XOR of all preceding bytes).
- Report packet uses Header 0x21; same body. Data[0] echoes the received command code; Data[1..N] holds response. Data[0] reply code: 0x00=ACK, 0x03=NACK (unknown cmd), 0x04=NAV (bad checksum / unsupported param).
- Wait for ACK before next command; retry allowed if no response within 500ms.
- "Set Volume = 0" mutes the audio output but does not flip the system mute flag.
- LAN control: source §2.2 notes port 5000 for LAN but no LAN command-set is documented in the source. Section 6.23 controls which physical port the display listens on (RS232 vs LAN/RJ-45).

<!-- UNRESOLVED: LAN protocol/commands not documented; firmware version not stated; source typos in §6.18 (Logo Get example reuses Switch On Delay bytes 0x8B instead of 0x8D) and §7.10 (Model Name Get example reuses 0xC6 instead of 0xC8) preserved per source -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/olwcpmt4/ra4980-ra5580-rs232-manual-20150609-watermarked.pdf
  - https://www.planar.com/media/uuoptbfm/ra4980-ra5580-user-manual-20150609-watermarked-rev.pdf
retrieved_at: 2026-05-07T14:30:52.298Z
last_checked_at: 2026-06-03T05:33:26.257Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T05:33:26.257Z
matched_actions: 126
action_count: 126
confidence: medium
summary: "All 126 spec actions traced to source (dip-safe re-verify). (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN port 5000 referenced in §2.2 but no LAN command set documented"
- "source contains no explicit safety warnings or interlock procedures"
- "LAN protocol/commands not documented; firmware version not stated; source typos in §6.18 (Logo Get example reuses Switch On Delay bytes 0x8B instead of 0x8D) and §7.10 (Model Name Get example reuses 0xC6 instead of 0xC8) preserved per source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
