---
spec_id: admin/sony-kdl-42w708b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDL-42W708B BRAVIA IP Control Spec"
manufacturer: Sony
model_family: KDL-42W708B
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KDL-42W708B
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - raw.githubusercontent.com
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://raw.githubusercontent.com/xiaolaba/bravia_console_sony/master/Sony_Simple_IP_Control_Protocol_for_BRAVIA.pdf
retrieved_at: 2026-06-08T14:44:08.743Z
last_checked_at: 2026-06-09T07:17:42.401Z
generated_at: 2026-06-09T07:17:42.401Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "protocol doc version 0.6, but device-specific firmware constraints not stated."
  - "source describes no multi-step sequences"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:17:42.401Z
  matched_actions: 132
  action_count: 132
  confidence: medium
  summary: "All 132 spec actions—34 command families plus 98 IR codes—have literal FourCC and parameter matches in source Table 4 and Table 5; transport parameters confirmed. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony KDL-42W708B BRAVIA IP Control Spec

## Summary
Sony BRAVIA 2014-series professional TV control via two IP protocols on TCP port 20060. Low-level: 24-byte fixed frame with Four-CC command set (POWR, VOLU, AMUT, CHNN, TCHN, ISRC, INPT, PMUT, PIPI, BADR, MACA, IRCC). High-level: HTTP/JSON-RPC wrapping the same commands. Source: "Sony Simple IP Control Protocol for BRAVIA" v0.6.

<!-- UNRESOLVED: protocol doc version 0.6, but device-specific firmware constraints not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - http  # inferred: high-level WebAPI layer documented as HTTP+JSON-RPC
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from setPowerStatus / getPowerStatus
- levelable       # inferred from setAudioVolume / getAudioVolume
- queryable       # inferred from get* command family
- routable        # inferred from setInput / setInputSource / setChannel
```

## Actions
```yaml
# Frame layout (24 bytes, ASCII hex):
#   [0..1]   0x2A 0x53  header
#   [2]      type: 0x43 Control | 0x45 Enquiry | 0x41 Answer | 0x4E Notify
#   [3..6]   FourCC (ASCII) function code
#   [7..22]  16-byte parameter block (each byte ASCII '0'..'9','A'..'F','#','.' etc.)
#   [23]     0x0A footer
# All commands below shown as 24-byte frames. Variable params use {} placeholders.

- id: set_ircc_code
  label: Send IR-like code
  kind: action
  command: "2A 53 43 49 52 43 43 {code#16} 0A"
  params:
    - name: code
      type: string
      description: 16-byte ASCII parameter (see IR table 5; pad with '0' on the left)

- id: set_power_status_standby
  label: Power Standby (Off)
  kind: action
  command: "2A 53 43 50 4F 57 52 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"

- id: set_power_status_active
  label: Power Active (On)
  kind: action
  command: "2A 53 43 50 4F 57 52 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"

- id: get_power_status
  label: Power Status Query
  kind: query
  command: "2A 53 45 50 4F 57 52 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 56 4F 4C 55 {volume#16} 0A"
  params:
    - name: volume
      type: integer
      description: Volume value, decimal digits, left-padded with '0' to 16 bytes (e.g. 41 = "0000000000000029")

- id: get_audio_volume
  label: Audio Volume Query
  kind: query
  command: "2A 53 45 56 4F 4C 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"

- id: set_audio_mute_unmute
  label: Audio Mute Off
  kind: action
  command: "2A 53 43 41 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"

- id: set_audio_mute_mute
  label: Audio Mute On
  kind: action
  command: "2A 53 43 41 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"

- id: get_audio_mute
  label: Audio Mute Status Query
  kind: query
  command: "2A 53 45 41 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"

- id: set_channel
  label: Set Channel (preset)
  kind: action
  command: "2A 53 43 43 48 4E 4E {major#8}.{minor#7} 0A"
  params:
    - name: major
      type: integer
      description: Major channel number, 8 bytes
    - name: minor
      type: integer
      description: Minor channel number, 7 bytes

- id: get_channel
  label: Channel Query
  kind: query
  command: "2A 53 45 43 48 4E 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"

- id: set_triplet_channel
  label: Set Channel (triplet hex)
  kind: action
  command: "2A 53 43 54 43 48 4E {hex#16} 0A"
  params:
    - name: hex
      type: string
      description: 16-byte ASCII hex triplet (e.g. "7FE07FE00400" -> 32736.32736.1024)

- id: get_triplet_channel
  label: Triplet Channel Query
  kind: query
  command: "2A 53 45 54 43 48 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"

- id: set_input_source
  label: Set TV Input Source
  kind: action
  command: "2A 53 43 49 53 52 43 {source#16} 0A"
  params:
    - name: source
      type: string
      description: Source name left-justified, right-padded with '#' (dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt)

- id: get_input_source
  label: Input Source Query
  kind: query
  command: "2A 53 45 49 53 52 43 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"

- id: set_input_tv
  label: Set Input TV
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"

- id: set_input_hdmi
  label: Set Input HDMI
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 31 30 30 30 30 {num#4} 0A"
  params:
    - name: num
      type: integer
      description: HDMI port number, 4 ASCII digits (1-9999)

- id: set_input_scart
  label: Set Input SCART
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 32 30 30 30 30 {num#4} 0A"
  params:
    - name: num
      type: integer
      description: SCART port number, 4 ASCII digits (1-9999)

- id: set_input_composite
  label: Set Input Composite
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 33 30 30 30 30 {num#4} 0A"
  params:
    - name: num
      type: integer
      description: Composite port number, 4 ASCII digits (1-9999)

- id: set_input_component
  label: Set Input Component
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 34 30 30 30 30 {num#4} 0A"
  params:
    - name: num
      type: integer
      description: Component port number, 4 ASCII digits (1-9999)

- id: set_input_screen_mirroring
  label: Set Input Screen Mirroring
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 35 30 30 30 30 {num#4} 0A"
  params:
    - name: num
      type: integer
      description: Screen Mirroring index, 4 ASCII digits (1-9999)

- id: set_input_pc_rgb
  label: Set Input PC RGB
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 36 30 30 30 30 {num#4} 0A"
  params:
    - name: num
      type: integer
      description: PC RGB input index, 4 ASCII digits (1-9999)

- id: get_input
  label: Current Input Query
  kind: query
  command: "2A 53 45 49 4E 50 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"

- id: set_picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "2A 53 43 50 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"

- id: set_picture_mute_on
  label: Picture Mute On (screen black)
  kind: action
  command: "2A 53 43 50 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"

- id: get_picture_mute
  label: Picture Mute Status Query
  kind: query
  command: "2A 53 45 50 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 54 50 4D 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"

- id: set_pip_off
  label: PIP Off
  kind: action
  command: "2A 53 43 50 49 50 49 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"

- id: set_pip_on
  label: PIP On
  kind: action
  command: "2A 53 43 50 49 50 49 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"

- id: get_pip
  label: PIP Status Query
  kind: query
  command: "2A 53 45 50 49 50 49 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "2A 53 43 54 50 49 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"

- id: toggle_pip_position
  label: Cycle PIP Position
  kind: action
  command: "2A 53 43 54 50 50 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"

- id: get_broadcast_address
  label: Broadcast IPv4 Address Query
  kind: query
  command: "2A 53 45 42 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Source example response is "192.168.0.14" right-padded with '#' to 16 bytes.

- id: get_mac_address
  label: MAC Address Query
  kind: query
  command: "2A 53 45 4D 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 0A"

# IR-like codes via setIrccCode - each row in source Table 5.
- id: ir_power_off
  label: IR Power Off
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
- id: ir_input
  label: IR Input
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
- id: ir_gguide
  label: IR GGuide
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 0A"
- id: ir_epg
  label: IR EPG
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 0A"
- id: ir_favorites
  label: IR Favorites
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 0A"
- id: ir_display
  label: IR Display
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 0A"
- id: ir_home
  label: IR Home
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 0A"
- id: ir_options
  label: IR Options
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 0A"
- id: ir_return
  label: IR Return
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 0A"
- id: ir_up
  label: IR Up
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 0A"
- id: ir_down
  label: IR Down
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 30 0A"
- id: ir_right
  label: IR Right
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 31 0A"
- id: ir_left
  label: IR Left
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 32 0A"
- id: ir_confirm
  label: IR Confirm
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 33 0A"
- id: ir_red
  label: IR Red
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 34 0A"
- id: ir_green
  label: IR Green
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 35 0A"
- id: ir_yellow
  label: IR Yellow
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 36 0A"
- id: ir_blue
  label: IR Blue
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 37 0A"
- id: ir_num1
  label: IR Num1
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 38 0A"
- id: ir_num2
  label: IR Num2
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 39 0A"
- id: ir_num3
  label: IR Num3
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 30 0A"
- id: ir_num4
  label: IR Num4
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 31 0A"
- id: ir_num5
  label: IR Num5
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 32 0A"
- id: ir_num6
  label: IR Num6
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 33 0A"
- id: ir_num7
  label: IR Num7
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 34 0A"
- id: ir_num8
  label: IR Num8
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 35 0A"
- id: ir_num9
  label: IR Num9
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 36 0A"
- id: ir_num0
  label: IR Num0
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 37 0A"
- id: ir_num11
  label: IR Num11
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 38 0A"
- id: ir_num12
  label: IR Num12
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 39 0A"
- id: ir_volume_up
  label: IR Volume Up
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 30 0A"
- id: ir_volume_down
  label: IR Volume Down
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 31 0A"
- id: ir_mute
  label: IR Mute
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 32 0A"
- id: ir_channel_up
  label: IR Channel Up
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 33 0A"
- id: ir_channel_down
  label: IR Channel Down
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 34 0A"
- id: ir_subtitle
  label: IR Subtitle
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 35 0A"
- id: ir_closed_caption
  label: IR Closed Caption
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 36 0A"
- id: ir_enter
  label: IR Enter
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 37 0A"
- id: ir_dot
  label: IR DOT
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 38 0A"
- id: ir_analog
  label: IR Analog
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 39 0A"
- id: ir_teletext
  label: IR Teletext
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 30 0A"
- id: ir_exit
  label: IR Exit
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 31 0A"
- id: ir_analog2
  label: IR Analog2
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 32 0A"
- id: ir_ad
  label: IR *AD
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 33 0A"
- id: ir_digital
  label: IR Digital
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 34 0A"
- id: ir_analog_q
  label: IR Analog?
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 35 0A"
- id: ir_bs
  label: IR BS
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 36 0A"
- id: ir_cs
  label: IR CS
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 37 0A"
- id: ir_bs_cs
  label: IR BS/CS
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 38 0A"
- id: ir_ddata
  label: IR Ddata
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 39 0A"
- id: ir_pic_off
  label: IR Pic Off
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 30 0A"
- id: ir_tv_radio
  label: IR Tv_Radio
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 31 0A"
- id: ir_theater
  label: IR Theater
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 32 0A"
- id: ir_sen
  label: IR SEN
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 33 0A"
- id: ir_internet_widgets
  label: IR Internet Widgets
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 34 0A"
- id: ir_internet_video
  label: IR Internet Video
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 35 0A"
- id: ir_netflix
  label: IR Netflix
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 36 0A"
- id: ir_scene_select
  label: IR Scene Select
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 37 0A"
- id: ir_mode3d
  label: IR Mode3D
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 38 0A"
- id: ir_imanual
  label: IR iManual
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 39 0A"
- id: ir_audio
  label: IR Audio
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 30 0A"
- id: ir_wide
  label: IR Wide
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 31 0A"
- id: ir_jump
  label: IR Jump
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 32 0A"
- id: ir_pap
  label: IR PAP
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 33 0A"
- id: ir_myepg
  label: IR MyEPG
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 34 0A"
- id: ir_program_description
  label: IR Program Description
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 35 0A"
- id: ir_write_chapter
  label: IR Write Chapter
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 36 0A"
- id: ir_trackid
  label: IR TrackID
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 37 0A"
- id: ir_ten_key
  label: IR Ten Key
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 38 0A"
- id: ir_applicast
  label: IR AppliCast
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 39 0A"
- id: ir_actvila
  label: IR acTVila
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 30 0A"
- id: ir_delete_video
  label: IR Delete Video
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 31 0A"
- id: ir_photo_frame
  label: IR Photo Frame
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 32 0A"
- id: ir_tv_pause
  label: IR TV Pause
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 33 0A"
- id: ir_keypad
  label: IR KeyPad
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 34 0A"
- id: ir_media
  label: IR Media
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 35 0A"
- id: ir_sync_menu
  label: IR Sync Menu
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 36 0A"
- id: ir_forward
  label: IR Forward
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 37 0A"
- id: ir_play
  label: IR Play
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 38 0A"
- id: ir_rewind
  label: IR Rewind
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 39 0A"
- id: ir_prev
  label: IR Prev
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 30 0A"
- id: ir_stop
  label: IR Stop
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 31 0A"
- id: ir_next
  label: IR Next
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 32 0A"
- id: ir_rec
  label: IR Rec
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 33 0A"
- id: ir_pause
  label: IR Pause
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 34 0A"
- id: ir_eject
  label: IR Eject
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 35 0A"
- id: ir_flash_plus
  label: IR Flash Plus
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 36 0A"
- id: ir_flash_minus
  label: IR Flash Minus
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 37 0A"
- id: ir_topmenu
  label: IR TopMenu
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 38 0A"
- id: ir_popupmenu
  label: IR PopupMenu
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 39 0A"
- id: ir_rakuraku_start
  label: IR Rakuraku Start
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 30 0A"
- id: ir_one_touch_time_rec
  label: IR One Touch Time Rec
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 31 0A"
- id: ir_one_touch_view
  label: IR One Touch View
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 32 0A"
- id: ir_one_touch_rec
  label: IR One Touch Rec
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 33 0A"
- id: ir_one_touch_stop
  label: IR One Touch Stop
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 34 0A"
- id: ir_dux
  label: IR DUX
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 35 0A"
- id: ir_football_mode
  label: IR Football Mode
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 36 0A"
- id: ir_social
  label: IR Social
  kind: action
  command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 37 0A"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
- id: pip_state
  type: enum
  values: [disabled, enabled]
- id: answer_success
  type: enum
  values: [success, error]
  notes: "16 '0' bytes = success, 16 'F' bytes = error"
```

## Variables
```yaml
# Channel and volume values returned by enquiry/notify.
- id: volume
  type: integer
  description: Audio volume level (0..255 implied, exact range not stated in source)
- id: channel_major
  type: integer
  description: Major preset channel number
- id: channel_minor
  type: integer
  description: Minor preset channel number
- id: triplet_channel
  type: string
  description: Hex triplet string, e.g. "7FE07FE00400"
- id: input_source
  type: enum
  values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
- id: input_kind
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
- id: broadcast_address
  type: string
  description: IPv4 address returned by getBroadcastAddress
- id: mac_address
  type: string
  description: MAC address returned by getMacAddress
```

## Events
```yaml
# Type 0x4E (Notify) frames. Server pushes when state changes.
- id: power_change
  type: enum
  values: [standby, active]
  fourcc: POWR
  notes: Sent on power-off / power-on transition.
- id: channel_change
  type: string
  fourcc: CHNN
  notes: Sent on channel change; payload = preset channel.
- id: input_change
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  fourcc: INPT
  notes: Sent on input change.
- id: volume_change
  type: integer
  fourcc: VOLU
  notes: Sent on volume change.
- id: mute_change
  type: enum
  values: [unmuted, muted]
  fourcc: AMUT
- id: pip_change
  type: enum
  values: [disabled, enabled]
  fourcc: PIPI
- id: picture_mute_change
  type: enum
  values: [disabled, enabled]
  fourcc: PMUT
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
<!-- UNRESOLVED fields and protocol quirks: -->
<!-- - Doc version 0.6; device firmware constraints not stated. -->
<!-- - 30s server-side idle disconnect; clients must keep-alive. -->
<!-- - 16-byte parameter block is filled with ASCII '0'..'9','A'..'F','#','.' — not raw binary. -->
<!-- - High-level HTTP/JSON-RPC layer documented at conceptual level only; no method paths given in source. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - raw.githubusercontent.com
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://raw.githubusercontent.com/xiaolaba/bravia_console_sony/master/Sony_Simple_IP_Control_Protocol_for_BRAVIA.pdf
retrieved_at: 2026-06-08T14:44:08.743Z
last_checked_at: 2026-06-09T07:17:42.401Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:17:42.401Z
matched_actions: 132
action_count: 132
confidence: medium
summary: "All 132 spec actions—34 command families plus 98 IR codes—have literal FourCC and parameter matches in source Table 4 and Table 5; transport parameters confirmed. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "protocol doc version 0.6, but device-specific firmware constraints not stated."
- "source describes no multi-step sequences"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
