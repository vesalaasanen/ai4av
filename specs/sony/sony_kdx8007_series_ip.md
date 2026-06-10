---
spec_id: admin/sony-kdx8007-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8007 Series Control Spec"
manufacturer: Sony
model_family: "KDX8007 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX8007 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-08T16:01:05.178Z
last_checked_at: 2026-06-09T07:19:23.679Z
generated_at: 2026-06-09T07:19:23.679Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "max volume not stated in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "max volume level not stated in source"
  - "no error recovery or fault behavior documented"
verification:
  verdict: verified
  checked_at: 2026-06-09T07:19:23.679Z
  matched_actions: 131
  action_count: 131
  confidence: medium
  summary: "All 131 spec actions map cleanly to source commands; transport parameters verified against protocol specification; complete coverage of source command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony KDX8007 Series Control Spec

## Summary
Sony BRAVIA Simple IP Control Protocol for KDX8007 Series TVs. Low-level TCP protocol using 24-byte fixed-size binary messages. Controls power, volume, mute, channel, input source, PIP, picture mute, and provides IR remote emulation. Connection on TCP port 20060 with 30-second idle timeout.

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: set_power_off
  label: Power Standby (Off)
  kind: action
  command: "2A 53 43 50 4F 57 52 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  params: []

- id: set_power_on
  label: Power Active (On)
  kind: action
  command: "2A 53 43 50 4F 57 52 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  params: []

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 50 4F 57 52 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 56 4F 4C 55 {level:16s} 0A"
  params:
    - name: level
      type: integer
      description: "Volume level as 16-char zero-padded decimal string (e.g. 0000000000000029)"

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 56 4F 4C 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_audio_mute_off
  label: Unmute
  kind: action
  command: "2A 53 43 41 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  params: []

- id: set_audio_mute_on
  label: Mute
  kind: action
  command: "2A 53 43 41 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  params: []

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "2A 53 45 41 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_channel
  label: Set Channel (Preset)
  kind: action
  command: "2A 53 43 43 48 4E 4E {major:8s} 2E {minor:7s} 0A"
  params:
    - name: major
      type: string
      description: "Major channel number as 8-char zero-padded string"
    - name: minor
      type: string
      description: "Minor channel number as 7-char zero-padded string"

- id: get_channel
  label: Get Channel (Preset)
  kind: query
  command: "2A 53 45 43 48 4E 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_triplet_channel
  label: Set Triplet Channel
  kind: action
  command: "2A 53 43 54 43 48 4E {triplet:12s} 23 23 23 23 0A"
  params:
    - name: triplet
      type: string
      description: "Triplet channel in hexadecimal (e.g. 7FE07FE00400 = 32736.32736.1024)"

- id: get_triplet_channel
  label: Get Triplet Channel
  kind: query
  command: "2A 53 45 54 43 48 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_input_source
  label: Set Input Source
  kind: action
  command: "2A 53 43 49 53 52 43 {source:16s} 0A"
  params:
    - name: source
      type: enum
      values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
      description: "Input source name right-padded with #"

- id: get_input_source
  label: Get Input Source
  kind: query
  command: "2A 53 45 49 53 52 43 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_input_tv
  label: Set Input to TV
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  params: []

- id: set_input_hdmi
  label: Set Input to HDMI
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 31 30 30 30 30 {port:4s} 0A"
  params:
    - name: port
      type: integer
      description: "HDMI port number (1-9999) as 4-char zero-padded string"

- id: set_input_scart
  label: Set Input to SCART
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 32 30 30 30 30 {port:4s} 0A"
  params:
    - name: port
      type: integer
      description: "SCART port number (1-9999) as 4-char zero-padded string"

- id: set_input_composite
  label: Set Input to Composite
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 33 30 30 30 30 {port:4s} 0A"
  params:
    - name: port
      type: integer
      description: "Composite port number (1-9999) as 4-char zero-padded string"

- id: set_input_component
  label: Set Input to Component
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 34 30 30 30 30 {port:4s} 0A"
  params:
    - name: port
      type: integer
      description: "Component port number (1-9999) as 4-char zero-padded string"

- id: set_input_screen_mirroring
  label: Set Input to Screen Mirroring
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 35 30 30 30 30 {port:4s} 0A"
  params:
    - name: port
      type: integer
      description: "Screen Mirroring port number (1-9999) as 4-char zero-padded string"

- id: set_input_pc_rgb
  label: Set Input to PC RGB
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 36 30 30 30 30 {port:4s} 0A"
  params:
    - name: port
      type: integer
      description: "PC RGB port number (1-9999) as 4-char zero-padded string"

- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 49 4E 50 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_picture_mute_off
  label: Disable Picture Mute
  kind: action
  command: "2A 53 43 50 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  params: []

- id: set_picture_mute_on
  label: Enable Picture Mute
  kind: action
  command: "2A 53 43 50 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  params: []

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "2A 53 45 50 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 54 50 4D 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_pip_off
  label: Disable PIP
  kind: action
  command: "2A 53 43 50 49 50 49 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  params: []

- id: set_pip_on
  label: Enable PIP
  kind: action
  command: "2A 53 43 50 49 50 49 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  params: []

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "2A 53 45 50 49 50 49 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "2A 53 43 54 50 49 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "2A 53 43 54 50 50 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "2A 53 45 42 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "2A 53 45 4D 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: ircc_power_off
  label: IR Command - Power Off
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  params: []

- id: ircc_input
  label: IR Command - Input
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  params: []

- id: ircc_gguide
  label: IR Command - GGuide
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 0A"
  params: []

- id: ircc_epg
  label: IR Command - EPG
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 0A"
  params: []

- id: ircc_favorites
  label: IR Command - Favorites
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 0A"
  params: []

- id: ircc_display
  label: IR Command - Display
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 0A"
  params: []

- id: ircc_home
  label: IR Command - Home
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 0A"
  params: []

- id: ircc_options
  label: IR Command - Options
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 0A"
  params: []

- id: ircc_return
  label: IR Command - Return
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 0A"
  params: []

- id: ircc_up
  label: IR Command - Up
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 0A"
  params: []

- id: ircc_down
  label: IR Command - Down
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 30 0A"
  params: []

- id: ircc_right
  label: IR Command - Right
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 31 0A"
  params: []

- id: ircc_left
  label: IR Command - Left
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 32 0A"
  params: []

- id: ircc_confirm
  label: IR Command - Confirm
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 33 0A"
  params: []

- id: ircc_red
  label: IR Command - Red
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 34 0A"
  params: []

- id: ircc_green
  label: IR Command - Green
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 35 0A"
  params: []

- id: ircc_yellow
  label: IR Command - Yellow
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 36 0A"
  params: []

- id: ircc_blue
  label: IR Command - Blue
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 37 0A"
  params: []

- id: ircc_num1
  label: IR Command - Num1
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 38 0A"
  params: []

- id: ircc_num2
  label: IR Command - Num2
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 39 0A"
  params: []

- id: ircc_num3
  label: IR Command - Num3
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 30 0A"
  params: []

- id: ircc_num4
  label: IR Command - Num4
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 31 0A"
  params: []

- id: ircc_num5
  label: IR Command - Num5
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 32 0A"
  params: []

- id: ircc_num6
  label: IR Command - Num6
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 33 0A"
  params: []

- id: ircc_num7
  label: IR Command - Num7
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 34 0A"
  params: []

- id: ircc_num8
  label: IR Command - Num8
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 35 0A"
  params: []

- id: ircc_num9
  label: IR Command - Num9
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 36 0A"
  params: []

- id: ircc_num0
  label: IR Command - Num0
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 37 0A"
  params: []

- id: ircc_num11
  label: IR Command - Num11
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 38 0A"
  params: []

- id: ircc_num12
  label: IR Command - Num12
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 39 0A"
  params: []

- id: ircc_volume_up
  label: IR Command - Volume Up
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 30 0A"
  params: []

- id: ircc_volume_down
  label: IR Command - Volume Down
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 31 0A"
  params: []

- id: ircc_mute
  label: IR Command - Mute
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 32 0A"
  params: []

- id: ircc_channel_up
  label: IR Command - Channel Up
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 33 0A"
  params: []

- id: ircc_channel_down
  label: IR Command - Channel Down
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 34 0A"
  params: []

- id: ircc_subtitle
  label: IR Command - Subtitle
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 35 0A"
  params: []

- id: ircc_closed_caption
  label: IR Command - Closed Caption
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 36 0A"
  params: []

- id: ircc_enter
  label: IR Command - Enter
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 37 0A"
  params: []

- id: ircc_dot
  label: IR Command - DOT
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 38 0A"
  params: []

- id: ircc_analog
  label: IR Command - Analog
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 39 0A"
  params: []

- id: ircc_teletext
  label: IR Command - Teletext
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 30 0A"
  params: []

- id: ircc_exit
  label: IR Command - Exit
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 31 0A"
  params: []

- id: ircc_analog2
  label: IR Command - Analog2
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 32 0A"
  params: []

- id: ircc_ad
  label: IR Command - *AD
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 33 0A"
  params: []

- id: ircc_digital
  label: IR Command - Digital
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 34 0A"
  params: []

- id: ircc_analog_question
  label: IR Command - Analog?
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 35 0A"
  params: []

- id: ircc_bs
  label: IR Command - BS
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 36 0A"
  params: []

- id: ircc_cs
  label: IR Command - CS
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 37 0A"
  params: []

- id: ircc_bscs
  label: IR Command - BS/CS
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 38 0A"
  params: []

- id: ircc_ddata
  label: IR Command - Ddata
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 39 0A"
  params: []

- id: ircc_pic_off
  label: IR Command - Pic Off
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 30 0A"
  params: []

- id: ircc_tv_radio
  label: IR Command - Tv/Radio
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 31 0A"
  params: []

- id: ircc_theater
  label: IR Command - Theater
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 32 0A"
  params: []

- id: ircc_sen
  label: IR Command - SEN
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 33 0A"
  params: []

- id: ircc_internet_widgets
  label: IR Command - Internet Widgets
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 34 0A"
  params: []

- id: ircc_internet_video
  label: IR Command - Internet Video
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 35 0A"
  params: []

- id: ircc_netflix
  label: IR Command - Netflix
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 36 0A"
  params: []

- id: ircc_scene_select
  label: IR Command - Scene Select
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 37 0A"
  params: []

- id: ircc_mode3d
  label: IR Command - Mode3D
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 38 0A"
  params: []

- id: ircc_imanual
  label: IR Command - iManual
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 39 0A"
  params: []

- id: ircc_audio
  label: IR Command - Audio
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 30 0A"
  params: []

- id: ircc_wide
  label: IR Command - Wide
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 31 0A"
  params: []

- id: ircc_jump
  label: IR Command - Jump
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 32 0A"
  params: []

- id: ircc_pap
  label: IR Command - PAP
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 33 0A"
  params: []

- id: ircc_myepg
  label: IR Command - MyEPG
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 34 0A"
  params: []

- id: ircc_program_description
  label: IR Command - Program Description
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 35 0A"
  params: []

- id: ircc_write_chapter
  label: IR Command - Write Chapter
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 36 0A"
  params: []

- id: ircc_trackid
  label: IR Command - TrackID
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 37 0A"
  params: []

- id: ircc_ten_key
  label: IR Command - Ten Key
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 38 0A"
  params: []

- id: ircc_applicast
  label: IR Command - AppliCast
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 39 0A"
  params: []

- id: ircc_actvila
  label: IR Command - acTVila
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 30 0A"
  params: []

- id: ircc_delete_video
  label: IR Command - Delete Video
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 31 0A"
  params: []

- id: ircc_photo_frame
  label: IR Command - Photo Frame
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 32 0A"
  params: []

- id: ircc_tv_pause
  label: IR Command - TV Pause
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 33 0A"
  params: []

- id: ircc_keypad
  label: IR Command - KeyPad
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 34 0A"
  params: []

- id: ircc_media
  label: IR Command - Media
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 35 0A"
  params: []

- id: ircc_sync_menu
  label: IR Command - Sync Menu
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 36 0A"
  params: []

- id: ircc_forward
  label: IR Command - Forward
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 37 0A"
  params: []

- id: ircc_play
  label: IR Command - Play
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 38 0A"
  params: []

- id: ircc_rewind
  label: IR Command - Rewind
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 39 0A"
  params: []

- id: ircc_prev
  label: IR Command - Prev
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 30 0A"
  params: []

- id: ircc_stop
  label: IR Command - Stop
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 31 0A"
  params: []

- id: ircc_next
  label: IR Command - Next
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 32 0A"
  params: []

- id: ircc_rec
  label: IR Command - Rec
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 33 0A"
  params: []

- id: ircc_pause
  label: IR Command - Pause
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 34 0A"
  params: []

- id: ircc_eject
  label: IR Command - Eject
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 35 0A"
  params: []

- id: ircc_flash_plus
  label: IR Command - Flash Plus
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 36 0A"
  params: []

- id: ircc_flash_minus
  label: IR Command - Flash Minus
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 37 0A"
  params: []

- id: ircc_topmenu
  label: IR Command - TopMenu
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 38 0A"
  params: []

- id: ircc_popupmenu
  label: IR Command - PopupMenu
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 39 0A"
  params: []

- id: ircc_rakuraku_start
  label: IR Command - Rakuraku Start
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 30 0A"
  params: []

- id: ircc_one_touch_time_rec
  label: IR Command - One Touch Time Rec
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 31 0A"
  params: []

- id: ircc_one_touch_view
  label: IR Command - One Touch View
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 32 0A"
  params: []

- id: ircc_one_touch_rec
  label: IR Command - One Touch Rec
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 33 0A"
  params: []

- id: ircc_one_touch_stop
  label: IR Command - One Touch Stop
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 34 0A"
  params: []

- id: ircc_dux
  label: IR Command - DUX
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 35 0A"
  params: []

- id: ircc_football_mode
  label: IR Command - Football Mode
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 36 0A"
  params: []

- id: ircc_social
  label: IR Command - Social
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 37 0A"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: ["off", "on"]
  description: "Power status returned by getPowerStatus answer (0=standby/off, 1=active/on)"

- id: audio_volume
  type: integer
  description: "Volume level as 16-char zero-padded decimal string"

- id: audio_mute_state
  type: enum
  values: ["off", "on"]
  description: "Mute status returned by getAudioMute answer (0=not muted, 1=muted)"

- id: channel_preset
  type: string
  description: "Current preset channel as major.minor (e.g. 00000050.1000000)"

- id: triplet_channel
  type: string
  description: "Current triplet channel in hexadecimal"

- id: input_source
  type: string
  description: "Current TV input source name (e.g. dvbt, dvbc)"

- id: input_type
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  description: "Current input type returned by getInput answer"

- id: picture_mute_state
  type: enum
  values: ["off", "on"]
  description: "Picture mute status (0=disabled, 1=enabled)"

- id: pip_state
  type: enum
  values: ["off", "on"]
  description: "PIP status (0=disabled, 1=enabled)"

- id: broadcast_address
  type: string
  description: "Broadcast IPv4 address of specified interface"

- id: mac_address
  type: string
  description: "MAC address of specified interface"
```

## Variables
```yaml
- id: volume
  type: integer
  min: 0
  max: null  # UNRESOLVED: max volume not stated in source
  description: "Audio volume level"

- id: channel_major
  type: string
  description: "Major preset channel number"

- id: channel_minor
  type: string
  description: "Minor preset channel number (sub-channel)"

- id: input_port
  type: integer
  min: 1
  max: 9999
  description: "Physical port number for HDMI/SCART/Composite/Component inputs"
```

## Events
```yaml
- id: fire_power_change
  type: notify
  fourcc: POWR
  description: "Sent when power state changes (0=off, 1=on)"

- id: fire_channel_change
  type: notify
  fourcc: CHNN
  description: "Sent when channel changes, includes preset number"

- id: fire_input_change
  type: notify
  fourcc: INPT
  description: "Sent when input changes (TV, HDMI, SCART, Composite, Component, Screen Mirroring, PC RGB)"

- id: fire_volume_change
  type: notify
  fourcc: VOLU
  description: "Sent when volume changes, includes volume value"

- id: fire_mute_change
  type: notify
  fourcc: AMUT
  description: "Sent when mute state changes (0=unmuted, 1=muted)"

- id: fire_pip_change
  type: notify
  fourcc: PIPI
  description: "Sent when PIP state changes (0=disabled, 1=enabled)"

- id: fire_picture_mute_change
  type: notify
  fourcc: PMUT
  description: "Sent when picture mute state changes (0=disabled, 1=enabled)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- 24-byte fixed-size binary message format: header (2 bytes `0x2A 0x53`), type (1 byte), function FourCC (4 bytes), parameter (16 bytes), footer (`0x0A`).
- Server disconnects after 30 seconds of inactivity. Keep-alive or periodic commands required for persistent control.
- Four message types: Control (0x43), Enquiry (0x45), Answer (0x41), Notify (0x4E).
- Answer parameters all `0x30` = success; all `0x46` = error.
- Enquiry parameters use `0x23` (#) as wildcard/padding.
- Input source names right-padded with `#` to fill 16-byte parameter field.
- Volume encoded as 16-character zero-padded decimal ASCII string.
- Channel preset uses decimal dot notation: 8-char major + `.` + 7-char minor.
- Simple IP Control must be enabled via TV menu: Network > Home Network Setup > IP Control > Simple IP Control (Normal Mode) or Hotel/Pro Mode > IP Control > Simple IP Control.
- Protocol version 0.6 per source document.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: max volume level not stated in source -->
<!-- UNRESOLVED: no error recovery or fault behavior documented -->

## Provenance

```yaml
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-08T16:01:05.178Z
last_checked_at: 2026-06-09T07:19:23.679Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:19:23.679Z
matched_actions: 131
action_count: 131
confidence: medium
summary: "All 131 spec actions map cleanly to source commands; transport parameters verified against protocol specification; complete coverage of source command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "max volume not stated in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "max volume level not stated in source"
- "no error recovery or fault behavior documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
