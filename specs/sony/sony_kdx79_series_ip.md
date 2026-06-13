---
spec_id: admin/sony-kdx79-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX79 Series Control Spec"
manufacturer: Sony
model_family: KD-55X79J
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-55X79J
    - KD-65X79J
    - KD-75X79J
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - "https://pro.sony/ue_US/search?q=IP+control"
retrieved_at: 2026-06-12T04:36:03.419Z
last_checked_at: 2026-06-12T19:50:54.074Z
generated_at: 2026-06-12T19:50:54.074Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source document dated 2014; X79J is a 2021 model. Applicability assumed but not confirmed by source."
  - "Protocol version 0.6 stated; unknown if newer firmware uses a revised version."
  - "no settable continuous variables beyond those covered by parameterized actions"
  - "no multi-step sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing in source"
  - "Source protocol version 0.6 dated 2014; X79J models are 2021. Protocol compatibility assumed but unverified."
  - "Volume range not stated (max level unknown)."
  - "Maximum number of concurrent TCP connections not stated."
  - "Whether the High Level Protocol (HTTP JSON-RPC) is also available on X79J is not stated in this source."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:50:54.074Z
  matched_actions: 131
  action_count: 131
  confidence: medium
  summary: "All 131 spec actions (non-IR commands plus all 97 IR IRCC code variants) verified against source Table 4 and Table 5; transport port 20060 confirmed; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KDX79 Series Control Spec

## Summary

Sony BRAVIA KDX79 series displays (KD-55X79J, KD-65X79J, KD-75X79J) support the Simple IP Control protocol over TCP. The protocol uses a 24-byte fixed-size binary message format with a header `*S`, FourCC function codes, and 16-byte parameter fields. Port 20060. No authentication required. 30-second idle timeout.

<!-- UNRESOLVED: Source document dated 2014; X79J is a 2021 model. Applicability assumed but not confirmed by source. -->
<!-- UNRESOLVED: Protocol version 0.6 stated; unknown if newer firmware uses a revised version. -->

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
traits:
  - powerable     # inferred: setPowerStatus / getPowerStatus commands
  - queryable     # inferred: enquiry commands returning state
  - routable      # inferred: setInput / setInputSource commands
  - levelable     # inferred: setAudioVolume command
```

## Actions

```yaml
actions:
  - id: set_power_status_off
    label: Power Standby (Off)
    kind: action
    command: "2A 53 43 50 4F 57 52 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
    params: []

  - id: set_power_status_on
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
    command: "2A 53 43 56 4F 4C 55 {level_pad16} 0A"
    params:
      - name: level
        type: integer
        description: "Volume level as 16-char left-zero-padded decimal string e.g. 0000000000000029"

  - id: get_audio_volume
    label: Get Audio Volume
    kind: query
    command: "2A 53 45 56 4F 4C 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params: []

  - id: set_audio_mute_off
    label: Audio Unmute
    kind: action
    command: "2A 53 43 41 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
    params: []

  - id: set_audio_mute_on
    label: Audio Mute
    kind: action
    command: "2A 53 43 41 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
    params: []

  - id: get_audio_mute
    label: Get Audio Mute Status
    kind: query
    command: "2A 53 45 41 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params: []

  - id: set_channel
    label: Set Channel (Preset Number)
    kind: action
    command: "2A 53 43 43 48 4E 4E {channel_pad16} 0A"
    params:
      - name: channel
        type: string
        description: "Preset number as 16-char padded string with decimal point e.g. 00000050.1000000 for ch 50.1, 00000006.0000000 for ch 6"

  - id: get_channel
    label: Get Current Channel
    kind: query
    command: "2A 53 45 43 48 4E 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params: []

  - id: set_triplet_channel
    label: Set Triplet Channel
    kind: action
    command: "2A 53 43 54 43 48 4E {triplet_pad16} 0A"
    params:
      - name: triplet
        type: string
        description: "Channel triplet in hexadecimal e.g. 7FE07FE00400 means 32736.32736.1024"

  - id: get_triplet_channel
    label: Get Triplet Channel
    kind: query
    command: "2A 53 45 54 43 48 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params: []

  - id: set_input_source
    label: Set Input Source
    kind: action
    command: "2A 53 43 49 53 52 43 {source_pad16} 0A"
    params:
      - name: source
        type: string
        description: "Source name right-padded with # e.g. dvbt############, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt"

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
    command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 31 30 30 30 30 {port_pad4} 0A"
    params:
      - name: port
        type: integer
        description: "HDMI port number (1-9999), 4-char zero-padded"

  - id: set_input_scart
    label: Set Input to SCART
    kind: action
    command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 32 30 30 30 30 {port_pad4} 0A"
    params:
      - name: port
        type: integer
        description: "SCART port number (1-9999), 4-char zero-padded"

  - id: set_input_composite
    label: Set Input to Composite
    kind: action
    command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 33 30 30 30 30 {port_pad4} 0A"
    params:
      - name: port
        type: integer
        description: "Composite port number (1-9999), 4-char zero-padded"

  - id: set_input_component
    label: Set Input to Component
    kind: action
    command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 34 30 30 30 30 {port_pad4} 0A"
    params:
      - name: port
        type: integer
        description: "Component port number (1-9999), 4-char zero-padded"

  - id: set_input_screen_mirroring
    label: Set Input to Screen Mirroring
    kind: action
    command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 35 30 30 30 30 {port_pad4} 0A"
    params:
      - name: port
        type: integer
        description: "Screen Mirroring port number (1-9999), 4-char zero-padded"

  - id: set_input_pc_rgb
    label: Set Input to PC RGB
    kind: action
    command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 36 30 30 30 30 {port_pad4} 0A"
    params:
      - name: port
        type: integer
        description: "PC RGB port number (1-9999), 4-char zero-padded"

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
    params:
      - name: interface
        type: string
        description: "Interface identifier, e.g. eth0 (padded with #)"

  - id: get_mac_address
    label: Get MAC Address
    kind: query
    command: "2A 53 45 4D 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params:
      - name: interface
        type: string
        description: "Interface identifier, e.g. eth0 (padded with #)"

  - id: ircc_power_off
    label: IR Power Off
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
    params: []

  - id: ircc_input
    label: IR Input
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
    params: []

  - id: ircc_gguide
    label: IR GGuide
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 0A"
    params: []

  - id: ircc_epg
    label: IR EPG
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 0A"
    params: []

  - id: ircc_favorites
    label: IR Favorites
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 0A"
    params: []

  - id: ircc_display
    label: IR Display
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 0A"
    params: []

  - id: ircc_home
    label: IR Home
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 0A"
    params: []

  - id: ircc_options
    label: IR Options
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 0A"
    params: []

  - id: ircc_return
    label: IR Return
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 0A"
    params: []

  - id: ircc_up
    label: IR Up
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 0A"
    params: []

  - id: ircc_down
    label: IR Down
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 30 0A"
    params: []

  - id: ircc_right
    label: IR Right
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 31 0A"
    params: []

  - id: ircc_left
    label: IR Left
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 32 0A"
    params: []

  - id: ircc_confirm
    label: IR Confirm
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 33 0A"
    params: []

  - id: ircc_red
    label: IR Red
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 34 0A"
    params: []

  - id: ircc_green
    label: IR Green
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 35 0A"
    params: []

  - id: ircc_yellow
    label: IR Yellow
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 36 0A"
    params: []

  - id: ircc_blue
    label: IR Blue
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 37 0A"
    params: []

  - id: ircc_num1
    label: IR Num1
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 38 0A"
    params: []

  - id: ircc_num2
    label: IR Num2
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 39 0A"
    params: []

  - id: ircc_num3
    label: IR Num3
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 30 0A"
    params: []

  - id: ircc_num4
    label: IR Num4
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 31 0A"
    params: []

  - id: ircc_num5
    label: IR Num5
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 32 0A"
    params: []

  - id: ircc_num6
    label: IR Num6
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 33 0A"
    params: []

  - id: ircc_num7
    label: IR Num7
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 34 0A"
    params: []

  - id: ircc_num8
    label: IR Num8
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 35 0A"
    params: []

  - id: ircc_num9
    label: IR Num9
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 36 0A"
    params: []

  - id: ircc_num0
    label: IR Num0
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 37 0A"
    params: []

  - id: ircc_num11
    label: IR Num11
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 38 0A"
    params: []

  - id: ircc_num12
    label: IR Num12
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 39 0A"
    params: []

  - id: ircc_volume_up
    label: IR Volume Up
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 30 0A"
    params: []

  - id: ircc_volume_down
    label: IR Volume Down
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 31 0A"
    params: []

  - id: ircc_mute
    label: IR Mute
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 32 0A"
    params: []

  - id: ircc_channel_up
    label: IR Channel Up
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 33 0A"
    params: []

  - id: ircc_channel_down
    label: IR Channel Down
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 34 0A"
    params: []

  - id: ircc_subtitle
    label: IR Subtitle
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 35 0A"
    params: []

  - id: ircc_closed_caption
    label: IR Closed Caption
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 36 0A"
    params: []

  - id: ircc_enter
    label: IR Enter
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 37 0A"
    params: []

  - id: ircc_dot
    label: IR DOT
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 38 0A"
    params: []

  - id: ircc_analog
    label: IR Analog
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 39 0A"
    params: []

  - id: ircc_teletext
    label: IR Teletext
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 30 0A"
    params: []

  - id: ircc_exit
    label: IR Exit
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 31 0A"
    params: []

  - id: ircc_analog2
    label: IR Analog2
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 32 0A"
    params: []

  - id: ircc_ad
    label: IR AD
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 33 0A"
    params: []

  - id: ircc_digital
    label: IR Digital
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 34 0A"
    params: []

  - id: ircc_analog_q
    label: IR Analog?
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 35 0A"
    params: []

  - id: ircc_bs
    label: IR BS
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 36 0A"
    params: []

  - id: ircc_cs
    label: IR CS
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 37 0A"
    params: []

  - id: ircc_bscs
    label: IR BS/CS
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 38 0A"
    params: []

  - id: ircc_ddata
    label: IR Ddata
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 34 39 0A"
    params: []

  - id: ircc_pic_off
    label: IR Pic Off
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 30 0A"
    params: []

  - id: ircc_tv_radio
    label: IR Tv/Radio
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 31 0A"
    params: []

  - id: ircc_theater
    label: IR Theater
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 32 0A"
    params: []

  - id: ircc_sen
    label: IR SEN
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 33 0A"
    params: []

  - id: ircc_internet_widgets
    label: IR Internet Widgets
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 34 0A"
    params: []

  - id: ircc_internet_video
    label: IR Internet Video
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 35 0A"
    params: []

  - id: ircc_netflix
    label: IR Netflix
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 36 0A"
    params: []

  - id: ircc_scene_select
    label: IR Scene Select
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 37 0A"
    params: []

  - id: ircc_mode3d
    label: IR Mode3D
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 38 0A"
    params: []

  - id: ircc_imanual
    label: IR iManual
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 39 0A"
    params: []

  - id: ircc_audio
    label: IR Audio
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 30 0A"
    params: []

  - id: ircc_wide
    label: IR Wide
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 31 0A"
    params: []

  - id: ircc_jump
    label: IR Jump
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 32 0A"
    params: []

  - id: ircc_pap
    label: IR PAP
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 33 0A"
    params: []

  - id: ircc_myepg
    label: IR MyEPG
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 34 0A"
    params: []

  - id: ircc_program_description
    label: IR Program Description
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 35 0A"
    params: []

  - id: ircc_write_chapter
    label: IR Write Chapter
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 36 0A"
    params: []

  - id: ircc_trackid
    label: IR TrackID
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 37 0A"
    params: []

  - id: ircc_ten_key
    label: IR Ten Key
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 38 0A"
    params: []

  - id: ircc_applicast
    label: IR AppliCast
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 39 0A"
    params: []

  - id: ircc_actvila
    label: IR acTVila
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 30 0A"
    params: []

  - id: ircc_delete_video
    label: IR Delete Video
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 31 0A"
    params: []

  - id: ircc_photo_frame
    label: IR Photo Frame
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 32 0A"
    params: []

  - id: ircc_tv_pause
    label: IR TV Pause
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 33 0A"
    params: []

  - id: ircc_keypad
    label: IR KeyPad
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 34 0A"
    params: []

  - id: ircc_media
    label: IR Media
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 35 0A"
    params: []

  - id: ircc_sync_menu
    label: IR Sync Menu
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 36 0A"
    params: []

  - id: ircc_forward
    label: IR Forward
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 37 0A"
    params: []

  - id: ircc_play
    label: IR Play
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 38 0A"
    params: []

  - id: ircc_rewind
    label: IR Rewind
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 39 0A"
    params: []

  - id: ircc_prev
    label: IR Prev
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 30 0A"
    params: []

  - id: ircc_stop
    label: IR Stop
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 31 0A"
    params: []

  - id: ircc_next
    label: IR Next
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 32 0A"
    params: []

  - id: ircc_rec
    label: IR Rec
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 33 0A"
    params: []

  - id: ircc_pause
    label: IR Pause
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 34 0A"
    params: []

  - id: ircc_eject
    label: IR Eject
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 35 0A"
    params: []

  - id: ircc_flash_plus
    label: IR Flash Plus
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 36 0A"
    params: []

  - id: ircc_flash_minus
    label: IR Flash Minus
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 37 0A"
    params: []

  - id: ircc_topmenu
    label: IR TopMenu
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 38 0A"
    params: []

  - id: ircc_popupmenu
    label: IR PopupMenu
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 39 0A"
    params: []

  - id: ircc_rakuraku_start
    label: IR Rakuraku Start
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 30 0A"
    params: []

  - id: ircc_one_touch_time_rec
    label: IR One Touch Time Rec
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 31 0A"
    params: []

  - id: ircc_one_touch_view
    label: IR One Touch View
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 32 0A"
    params: []

  - id: ircc_one_touch_rec
    label: IR One Touch Rec
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 33 0A"
    params: []

  - id: ircc_one_touch_stop
    label: IR One Touch Stop
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 34 0A"
    params: []

  - id: ircc_dux
    label: IR DUX
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 35 0A"
    params: []

  - id: ircc_football_mode
    label: IR Football Mode
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 36 0A"
    params: []

  - id: ircc_social
    label: IR Social
    kind: action
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 37 0A"
    params: []
```

## Feedbacks

```yaml
feedbacks:
  - id: power_state
    type: enum
    values: ["off", "on"]
    description: "Answer to getPowerStatus: 0000000000000000 = Standby, 0000000000000001 = Active"

  - id: audio_volume
    type: integer
    description: "Answer to getAudioVolume: 16-char left-zero-padded decimal"

  - id: audio_mute_state
    type: enum
    values: ["off", "on"]
    description: "Answer to getAudioMute: 0000000000000000 = Not Muted, 0000000000000001 = Muted"

  - id: channel_preset
    type: string
    description: "Answer to getChannel: preset number with decimal point e.g. 00000050.1000000"

  - id: triplet_channel
    type: string
    description: "Answer to getTripletChannel: hexadecimal triplet"

  - id: input_source
    type: string
    description: "Answer to getInputSource: source name right-padded with #"

  - id: current_input
    type: string
    description: "Answer to getInput: TV, HDMI(n), SCART(n), Composite(n), Component(n), Screen Mirroring(n), PC RGB Input(n)"

  - id: picture_mute_state
    type: enum
    values: ["off", "on"]
    description: "Answer to getPictureMute: 0000000000000000 = Disabled, 0000000000000001 = Enabled"

  - id: pip_state
    type: enum
    values: ["off", "on"]
    description: "Answer to getPip: 0000000000000000 = Disabled, 0000000000000001 = Enabled"

  - id: broadcast_address
    type: string
    description: "Answer to getBroadcastAddress: IPv4 address right-padded with #"

  - id: mac_address
    type: string
    description: "Answer to getMacAddress: MAC address right-padded with #"

  - id: command_result
    type: enum
    values: ["success", "error"]
    description: "Answer to control commands: all zeros = success, all Fs = error"
```

## Variables

```yaml
# UNRESOLVED: no settable continuous variables beyond those covered by parameterized actions
```

## Events

```yaml
events:
  - id: power_change
    description: "Notify (type N) sent when power state changes. FourCC POWR. Param 0=off, 1=on."
    command: "2A 53 4E 50 4F 57 52 {state:0000000000000000|0000000000000001} 0A"

  - id: channel_change
    description: "Notify sent on channel change. FourCC CHNN. Param = preset channel number."
    command: "2A 53 4E 43 48 4E 4E {channel_pad16} 0A"

  - id: input_change
    description: "Notify sent on input change. FourCC INPT. Param = input type + port."
    command: "2A 53 4E 49 4E 50 54 {input_param} 0A"

  - id: volume_change
    description: "Notify sent on volume change. FourCC VOLU. Param = volume value."
    command: "2A 53 4E 56 4F 4C 55 {level_pad16} 0A"

  - id: mute_change
    description: "Notify sent on mute toggle. FourCC AMUT. Param 0=unmuted, 1=muted."
    command: "2A 53 4E 41 4D 55 54 {state:0000000000000000|0000000000000001} 0A"

  - id: pip_change
    description: "Notify sent on PIP state change. FourCC PIPI. Param 0=disabled, 1=enabled."
    command: "2A 53 4E 50 49 50 49 {state:0000000000000000|0000000000000001} 0A"

  - id: picture_mute_change
    description: "Notify sent on picture mute change. FourCC PMUT. Param 0=disabled, 1=enabled."
    command: "2A 53 4E 50 4D 55 54 {state:0000000000000000|0000000000000001} 0A"
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing in source
```

## Notes

- 24-byte fixed-size binary message format: header `*S` (0x2A 0x53), type byte (C/E/A/N), 4-byte FourCC function, 16-byte parameter, footer LF (0x0A).
- 4 message types: Control (C=0x43) controller→TV, Enquiry (E=0x45) controller→TV, Answer (A=0x41) TV→controller, Notify (N=0x4E) TV→controller.
- TCP connection kept alive between requests; server disconnects after 30 seconds idle.
- Success answer: 16 bytes of `0` (0x30). Error answer: 16 bytes of `F` (0x46).
- Parameters padded: `#` (0x23) for wildcard/query, `0` (0x30) for zeros, `X` for variable digits.
- Volume parameter is 16-char left-zero-padded decimal (e.g. `0000000000000029` for level 29).
- setInputSource uses source name right-padded with `#` to fill 16 bytes.
- IR commands sent via setIrccCode (FourCC `IRCC`), each with a unique 16-byte parameter from Table 5.
- Simple IP Control must be enabled in TV menu: Network > Home Network Setup > IP Control > Simple IP Control (Normal Mode) or Hotel/Pro Mode > IP Control > Simple IP Control.

<!-- UNRESOLVED: Source protocol version 0.6 dated 2014; X79J models are 2021. Protocol compatibility assumed but unverified. -->
<!-- UNRESOLVED: Volume range not stated (max level unknown). -->
<!-- UNRESOLVED: Maximum number of concurrent TCP connections not stated. -->
<!-- UNRESOLVED: Whether the High Level Protocol (HTTP JSON-RPC) is also available on X79J is not stated in this source. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - "https://pro.sony/ue_US/search?q=IP+control"
retrieved_at: 2026-06-12T04:36:03.419Z
last_checked_at: 2026-06-12T19:50:54.074Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:50:54.074Z
matched_actions: 131
action_count: 131
confidence: medium
summary: "All 131 spec actions (non-IR commands plus all 97 IR IRCC code variants) verified against source Table 4 and Table 5; transport port 20060 confirmed; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source document dated 2014; X79J is a 2021 model. Applicability assumed but not confirmed by source."
- "Protocol version 0.6 stated; unknown if newer firmware uses a revised version."
- "no settable continuous variables beyond those covered by parameterized actions"
- "no multi-step sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing in source"
- "Source protocol version 0.6 dated 2014; X79J models are 2021. Protocol compatibility assumed but unverified."
- "Volume range not stated (max level unknown)."
- "Maximum number of concurrent TCP connections not stated."
- "Whether the High Level Protocol (HTTP JSON-RPC) is also available on X79J is not stated in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
