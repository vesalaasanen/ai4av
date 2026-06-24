---
spec_id: admin/christie-lhd-lwu-ds
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie LHD / LWU / DS Series Control Spec"
manufacturer: Christie
model_family: LWU755-DS
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - LWU755-DS
    - LWU900-DS
    - LHD878-DS
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - res.cloudinary.com
  - pierrehenrypauly.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-001583-01-christie-lit-man-usr-ds-series-tech.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-001587-01-christie-lit-man-usr-ds-series.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Christie_LWU900-DS_Network_Guide.pdf"
  - https://www.christiedigital.com/globalassets/resources/public/020-000786-02_lit-man-usr-d-series.pdf
  - https://www.pierrehenrypauly.com/database/documents/christie/lhd878-ds/service-manual.pdf
retrieved_at: 2026-05-15T01:39:34.265Z
last_checked_at: 2026-06-23T11:55:50.749Z
generated_at: 2026-06-23T11:55:50.749Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PJLink POWR/INPT/AVMT/ERST/LAMP (23 separate-protocol cmds, acknowledged in Notes)"
verification:
  verdict: verified
  checked_at: 2026-06-23T11:55:50.749Z
  matched_actions: 975
  action_count: 975
  confidence: high
  summary: "All 975 spec binary-protocol actions verified against source with exact hex matches; coverage 975/998 (only 23 PJLink cmds unrepresented, acknowledged in Notes)."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Christie LHD / LWU / DS Series Control Spec

## Summary
The Christie LWU755-DS, LWU900-DS, and LHD878-DS are professional installation projectors controlled via RS-232C (19200 8N1) through the CONTROL port, or via TCP/IP on port 23 or 9715 over LAN/HDBaseT. Commands use a 13-byte binary frame with header, CRC flag, action code, type, and setting code. PJLink is also supported. This spec covers the full RS-232C/Network binary command set and PJLink commands.

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # TCP #23 (also TCP #9715 with extended framing)
auth:
  type: md5_challenge  # optional; MD5 challenge-response when authentication enabled on TCP ports; disabled by default on port 23
```

## Traits
```yaml
- powerable       # power on/off commands present
- queryable       # GET commands returning state present
- levelable       # brightness, contrast, volume, focus, zoom, lens shift commands present
- routable        # input source selection commands present
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  hex: "BE EF 03 06 00 2A D3 01 00 00 60 00 00"
  params: []

- id: power_on
  label: Power On
  kind: action
  hex: "BE EF 03 06 00 BA D2 01 00 00 60 01 00"
  params: []

- id: power_get
  label: Power Status Get
  kind: query
  hex: "BE EF 03 06 00 19 D3 02 00 00 60 00 00"
  params: []

- id: input_source_set_computer_in
  label: Input Source Set - COMPUTER IN
  kind: action
  hex: "BE EF 03 06 00 FE D2 01 00 00 20 00 00"
  params: []

- id: input_source_set_lan
  label: Input Source Set - LAN
  kind: action
  hex: "BE EF 03 06 00 CE D5 01 00 00 20 0B 00"
  params: []

- id: input_source_set_hdmi1
  label: Input Source Set - HDMI 1
  kind: action
  hex: "BE EF 03 06 00 0E D2 01 00 00 20 03 00"
  params: []

- id: input_source_set_hdmi2
  label: Input Source Set - HDMI 2
  kind: action
  hex: "BE EF 03 06 00 6E D6 01 00 00 20 0D 00"
  params: []

- id: input_source_set_hdbaset
  label: Input Source Set - HDBaseT
  kind: action
  hex: "BE EF 03 06 00 AE DE 01 00 00 20 11 00"
  params: []

- id: input_source_set_video
  label: Input Source Set - VIDEO
  kind: action
  hex: "BE EF 03 06 00 6E D3 01 00 00 20 01 00"
  params: []

- id: input_source_set_3gsdi
  label: Input Source Set - 3G-SDI (LWU900-DS/LHD878-DS only)
  kind: action
  hex: "BE EF 03 06 00 5E DE 01 00 00 20 12 00"
  params: []

- id: input_source_set_displayport
  label: Input Source Set - DisplayPort
  kind: action
  hex: "BE EF 03 06 00 CE DF 01 00 00 20 13 00"
  params: []

- id: input_source_get
  label: Input Source Get
  kind: query
  hex: "BE EF 03 06 00 CD D2 02 00 00 20 00 00"
  params: []

- id: error_status_get
  label: Error Status Get
  kind: query
  hex: "BE EF 03 06 00 D9 D8 02 00 20 60 00 00"
  params: []

- id: focus_increment
  label: Focus Increment
  kind: action
  hex: "BE EF 03 06 00 6A 93 04 00 00 24 00 00"
  params: []

- id: focus_decrement
  label: Focus Decrement
  kind: action
  hex: "BE EF 03 06 00 BB 92 05 00 00 24 00 00"
  params: []

- id: focus_get
  label: Focus Get
  kind: query
  hex: "BE EF 03 06 00 0C 93 02 00 00 24 00 00"
  params: []

- id: zoom_increment
  label: Zoom Increment
  kind: action
  hex: "BE EF 03 06 00 96 92 04 00 01 24 00 00"
  params: []

- id: zoom_decrement
  label: Zoom Decrement
  kind: action
  hex: "BE EF 03 06 00 47 93 05 00 01 24 00 00"
  params: []

- id: zoom_get
  label: Zoom Get
  kind: query
  hex: "BE EF 03 06 00 F0 92 02 00 01 24 00 00"
  params: []

- id: lens_shift_v_increment
  label: Lens Shift V Increment
  kind: action
  hex: "BE EF 03 06 00 D2 92 04 00 02 24 00 00"
  params: []

- id: lens_shift_v_decrement
  label: Lens Shift V Decrement
  kind: action
  hex: "BE EF 03 06 00 03 93 05 00 02 24 00 00"
  params: []

- id: lens_shift_v_get
  label: Lens Shift V Get
  kind: query
  hex: "BE EF 03 06 00 B4 92 02 00 02 24 00 00"
  params: []

- id: lens_shift_h_increment
  label: Lens Shift H Increment
  kind: action
  hex: "BE EF 03 06 00 2E 93 04 00 03 24 00 00"
  params: []

- id: lens_shift_h_decrement
  label: Lens Shift H Decrement
  kind: action
  hex: "BE EF 03 06 00 FF 92 05 00 03 24 00 00"
  params: []

- id: lens_shift_h_get
  label: Lens Shift H Get
  kind: query
  hex: "BE EF 03 06 00 48 93 02 00 03 24 00 00"
  params: []

- id: lens_shift_centering
  label: Lens Shift Centering Execute
  kind: action
  hex: "BE EF 03 06 00 B8 93 06 00 04 24 00 00"
  params: []

- id: lens_memory_index_set_1
  label: Lens Memory Index Set - 1
  kind: action
  hex: "BE EF 03 06 00 4B 92 01 00 07 24 00 00"
  params: []

- id: lens_memory_index_set_2
  label: Lens Memory Index Set - 2
  kind: action
  hex: "BE EF 03 06 00 DB 93 01 00 07 24 01 00"
  params: []

- id: lens_memory_index_set_3
  label: Lens Memory Index Set - 3
  kind: action
  hex: "BE EF 03 06 00 2B 93 01 00 07 24 02 00"
  params: []

- id: lens_memory_index_get
  label: Lens Memory Index Get
  kind: query
  hex: "BE EF 03 06 00 78 92 02 00 07 24 00 00"
  params: []

- id: lens_memory_load
  label: Lens Memory Load Execute
  kind: action
  hex: "BE EF 03 06 00 E8 90 06 00 08 24 00 00"
  params: []

- id: lens_memory_save
  label: Lens Memory Save Execute
  kind: action
  hex: "BE EF 03 06 00 14 91 06 00 09 24 00 00"
  params: []

- id: lens_memory_clear
  label: Lens Memory Clear Execute
  kind: action
  hex: "BE EF 03 06 00 50 91 06 00 0A 24 00 00"
  params: []

- id: lens_memory_lens_shift_v_get
  label: Lens Memory Lens Shift V Get
  kind: query
  hex: "BE EF 03 06 00 A0 91 02 00 0D 24 00 00"
  params: []

- id: lens_memory_lens_shift_h_get
  label: Lens Memory Lens Shift H Get
  kind: query
  hex: "BE EF 03 06 00 E4 91 02 00 0E 24 00 00"
  params: []

- id: lens_memory_lens_type_get
  label: Lens Memory Lens Type Get
  kind: query
  hex: "BE EF 03 06 00 18 90 02 00 0F 24 00 00"
  params: []

- id: magnify_get
  label: Magnify Get
  kind: query
  hex: "BE EF 03 06 00 7C D2 02 00 07 30 00 00"
  params: []

- id: magnify_increment
  label: Magnify Increment
  kind: action
  hex: "BE EF 03 06 00 1A D2 04 00 07 30 00 00"
  params: []

- id: magnify_decrement
  label: Magnify Decrement
  kind: action
  hex: "BE EF 03 06 00 CB D3 05 00 07 30 00 00"
  params: []

- id: magnify_position_h_get
  label: Magnify Position H Get
  kind: query
  hex: "BE EF 03 06 00 C8 D7 02 00 10 30 00 00"
  params: []

- id: magnify_position_h_increment
  label: Magnify Position H Increment
  kind: action
  hex: "BE EF 03 06 00 AE D7 04 00 10 30 00 00"
  params: []

- id: magnify_position_h_decrement
  label: Magnify Position H Decrement
  kind: action
  hex: "BE EF 03 06 00 7F D6 05 00 10 30 00 00"
  params: []

- id: magnify_position_v_get
  label: Magnify Position V Get
  kind: query
  hex: "BE EF 03 06 00 34 D6 02 00 11 30 00 00"
  params: []

- id: magnify_position_v_increment
  label: Magnify Position V Increment
  kind: action
  hex: "BE EF 03 06 00 52 D6 04 00 11 30 00 00"
  params: []

- id: magnify_position_v_decrement
  label: Magnify Position V Decrement
  kind: action
  hex: "BE EF 03 06 00 83 D7 05 00 11 30 00 00"
  params: []

- id: freeze_set_normal
  label: Freeze Set - NORMAL
  kind: action
  hex: "BE EF 03 06 00 83 D2 01 00 02 30 00 00"
  params: []

- id: freeze_set_freeze
  label: Freeze Set - FREEZE
  kind: action
  hex: "BE EF 03 06 00 13 D3 01 00 02 30 01 00"
  params: []

- id: freeze_get
  label: Freeze Get
  kind: query
  hex: "BE EF 03 06 00 B0 D2 02 00 02 30 00 00"
  params: []

- id: shutter_set_off
  label: Shutter Set - OFF
  kind: action
  hex: "BE EF 03 06 00 F3 93 01 00 05 24 00 00"
  params: []

- id: shutter_set_on
  label: Shutter Set - ON
  kind: action
  hex: "BE EF 03 06 00 63 92 01 00 05 24 01 00"
  params: []

- id: shutter_get
  label: Shutter Get
  kind: query
  hex: "BE EF 03 06 00 C0 93 02 00 05 24 00 00"
  params: []

- id: pbyp_pip_set_off
  label: PbyP/PIP Set - OFF
  kind: action
  hex: "BE EF 03 06 00 3E 26 01 00 10 23 00 00"
  params: []

- id: pbyp_pip_set_pbyp
  label: PbyP/PIP Set - PbyP
  kind: action
  hex: "BE EF 03 06 00 AE 27 01 00 10 23 01 00"
  params: []

- id: pbyp_pip_set_pip
  label: PbyP/PIP Set - PIP
  kind: action
  hex: "BE EF 03 06 00 5E 27 01 00 10 23 02 00"
  params: []

- id: pbyp_pip_get
  label: PbyP/PIP Get
  kind: query
  hex: "BE EF 03 06 00 0D 26 02 00 10 23 00 00"
  params: []

- id: pbyp_main_size_set_small
  label: PbyP Main Size Set - SMALL
  kind: action
  hex: "BE EF 03 06 00 F2 07 01 00 11 23 7F 00"
  params: []

- id: pbyp_main_size_set_middle
  label: PbyP Main Size Set - MIDDLE
  kind: action
  hex: "BE EF 03 06 00 02 46 01 00 11 23 80 00"
  params: []

- id: pbyp_main_size_set_large
  label: PbyP Main Size Set - LARGE
  kind: action
  hex: "BE EF 03 06 00 92 47 01 00 11 23 81 00"
  params: []

- id: pbyp_main_size_get
  label: PbyP Main Size Get
  kind: query
  hex: "BE EF 03 06 00 F1 27 02 00 11 23 00 00"
  params: []

- id: pbyp_right_source_set_computer_in
  label: PbyP Right Source Set - COMPUTER IN
  kind: action
  hex: "BE EF 03 06 00 86 27 01 00 12 23 00 00"
  params: []

- id: pbyp_right_source_set_hdmi1
  label: PbyP Right Source Set - HDMI 1
  kind: action
  hex: "BE EF 03 06 00 76 27 01 00 12 23 03 00"
  params: []

- id: pbyp_right_source_set_hdmi2
  label: PbyP Right Source Set - HDMI 2
  kind: action
  hex: "BE EF 03 06 00 16 23 01 00 12 23 0D 00"
  params: []

- id: pbyp_right_source_set_hdbaset
  label: PbyP Right Source Set - HDBaseT
  kind: action
  hex: "BE EF 03 06 00 D6 2B 01 00 12 23 11 00"
  params: []

- id: pbyp_right_source_set_video
  label: PbyP Right Source Set - VIDEO
  kind: action
  hex: "BE EF 03 06 00 16 26 01 00 12 23 01 00"
  params: []

- id: pbyp_right_source_set_3gsdi
  label: PbyP Right Source Set - 3G-SDI
  kind: action
  hex: "BE EF 03 06 00 26 2B 01 00 12 23 12 00"
  params: []

- id: pbyp_right_source_set_displayport
  label: PbyP Right Source Set - DisplayPort
  kind: action
  hex: "BE EF 03 06 00 B6 2A 01 00 12 23 13 00"
  params: []

- id: pbyp_right_source_get
  label: PbyP Right Source Get
  kind: query
  hex: "BE EF 03 06 00 B5 27 02 00 12 23 00 00"
  params: []

- id: pbyp_main_area_set_left
  label: PbyP Main Area Set - LEFT
  kind: action
  hex: "BE EF 03 06 00 7A 26 01 00 13 23 00 00"
  params: []

- id: pbyp_main_area_set_right
  label: PbyP Main Area Set - RIGHT
  kind: action
  hex: "BE EF 03 06 00 EA 27 01 00 13 23 01 00"
  params: []

- id: pbyp_main_area_get
  label: PbyP Main Area Get
  kind: query
  hex: "BE EF 03 06 00 49 26 02 00 13 23 00 00"
  params: []

- id: pbyp_left_source_set_computer_in
  label: PbyP Left Source Set - COMPUTER IN
  kind: action
  hex: "BE EF 03 06 00 F2 26 01 00 15 23 00 00"
  params: []

- id: pbyp_left_source_set_hdmi1
  label: PbyP Left Source Set - HDMI 1
  kind: action
  hex: "BE EF 03 06 00 02 26 01 00 15 23 03 00"
  params: []

- id: pbyp_left_source_set_hdmi2
  label: PbyP Left Source Set - HDMI 2
  kind: action
  hex: "BE EF 03 06 00 62 22 01 00 15 23 0D 00"
  params: []

- id: pbyp_left_source_set_hdbaset
  label: PbyP Left Source Set - HDBaseT
  kind: action
  hex: "BE EF 03 06 00 A2 2A 01 00 15 23 11 00"
  params: []

- id: pbyp_left_source_set_video
  label: PbyP Left Source Set - VIDEO
  kind: action
  hex: "BE EF 03 06 00 62 27 01 00 15 23 01 00"
  params: []

- id: pbyp_left_source_set_3gsdi
  label: PbyP Left Source Set - 3G-SDI
  kind: action
  hex: "BE EF 03 06 00 52 2A 01 00 15 23 12 00"
  params: []

- id: pbyp_left_source_set_displayport
  label: PbyP Left Source Set - DisplayPort
  kind: action
  hex: "BE EF 03 06 00 C2 2B 01 00 15 23 13 00"
  params: []

- id: pbyp_left_source_get
  label: PbyP Left Source Get
  kind: query
  hex: "BE EF 03 06 00 C1 26 02 00 15 23 00 00"
  params: []

- id: pip_position_set_top_left
  label: PIP Position Set - TOP LEFT
  kind: action
  hex: "BE EF 03 06 00 02 23 01 00 01 23 00 00"
  params: []

- id: pip_position_set_top_right
  label: PIP Position Set - TOP RIGHT
  kind: action
  hex: "BE EF 03 06 00 92 22 01 00 01 23 01 00"
  params: []

- id: pip_position_set_bottom_left
  label: PIP Position Set - BOTTOM LEFT
  kind: action
  hex: "BE EF 03 06 00 62 22 01 00 01 23 02 00"
  params: []

- id: pip_position_set_bottom_right
  label: PIP Position Set - BOTTOM RIGHT
  kind: action
  hex: "BE EF 03 06 00 F2 23 01 00 01 23 03 00"
  params: []

- id: pip_position_get
  label: PIP Position Get
  kind: query
  hex: "BE EF 03 06 00 31 23 02 00 01 23 00 00"
  params: []

- id: pip_main_area_set_primary
  label: PIP Main Area Set - PRIMARY
  kind: action
  hex: "BE EF 03 06 00 32 22 01 00 05 23 00 00"
  params: []

- id: pip_main_area_set_secondary
  label: PIP Main Area Set - SECONDARY
  kind: action
  hex: "BE EF 03 06 00 A2 23 01 00 05 23 01 00"
  params: []

- id: pip_main_area_get
  label: PIP Main Area Get
  kind: query
  hex: "BE EF 03 06 00 01 22 02 00 05 23 00 00"
  params: []

- id: pip_primary_source_set_computer_in
  label: PIP Primary Source Set - COMPUTER IN
  kind: action
  hex: "BE EF 03 06 00 CE 23 01 00 04 23 00 00"
  params: []

- id: pip_primary_source_set_hdmi1
  label: PIP Primary Source Set - HDMI 1
  kind: action
  hex: "BE EF 03 06 00 3E 23 01 00 04 23 03 00"
  params: []

- id: pip_primary_source_set_hdmi2
  label: PIP Primary Source Set - HDMI 2
  kind: action
  hex: "BE EF 03 06 00 5E 27 01 00 04 23 0D 00"
  params: []

- id: pip_primary_source_set_hdbaset
  label: PIP Primary Source Set - HDBaseT
  kind: action
  hex: "BE EF 03 06 00 9E 2F 01 00 04 23 11 00"
  params: []

- id: pip_primary_source_set_video
  label: PIP Primary Source Set - VIDEO
  kind: action
  hex: "BE EF 03 06 00 5E 22 01 00 04 23 01 00"
  params: []

- id: pip_primary_source_set_3gsdi
  label: PIP Primary Source Set - 3G-SDI
  kind: action
  hex: "BE EF 03 06 00 6E 2F 01 00 04 23 12 00"
  params: []

- id: pip_primary_source_set_displayport
  label: PIP Primary Source Set - DisplayPort
  kind: action
  hex: "BE EF 03 06 00 FE 2E 01 00 04 23 13 00"
  params: []

- id: pip_primary_source_get
  label: PIP Primary Source Get
  kind: query
  hex: "BE EF 03 06 00 FD 23 02 00 04 23 00 00"
  params: []

- id: pip_secondary_source_set_computer_in
  label: PIP Secondary Source Set - COMPUTER IN
  kind: action
  hex: "BE EF 03 06 00 46 23 01 00 02 23 00 00"
  params: []

- id: pip_secondary_source_set_hdmi1
  label: PIP Secondary Source Set - HDMI 1
  kind: action
  hex: "BE EF 03 06 00 B6 23 01 00 02 23 03 00"
  params: []

- id: pip_secondary_source_set_hdmi2
  label: PIP Secondary Source Set - HDMI 2
  kind: action
  hex: "BE EF 03 06 00 D6 27 01 00 02 23 0D 00"
  params: []

- id: pip_secondary_source_set_hdbaset
  label: PIP Secondary Source Set - HDBaseT
  kind: action
  hex: "BE EF 03 06 00 16 2F 01 00 02 23 11 00"
  params: []

- id: pip_secondary_source_set_video
  label: PIP Secondary Source Set - VIDEO
  kind: action
  hex: "BE EF 03 06 00 D6 22 01 00 02 23 01 00"
  params: []

- id: pip_secondary_source_set_3gsdi
  label: PIP Secondary Source Set - 3G-SDI
  kind: action
  hex: "BE EF 03 06 00 E6 2F 01 00 02 23 12 00"
  params: []

- id: pip_secondary_source_set_displayport
  label: PIP Secondary Source Set - DisplayPort
  kind: action
  hex: "BE EF 03 06 00 76 2E 01 00 02 23 13 00"
  params: []

- id: pip_secondary_source_get
  label: PIP Secondary Source Get
  kind: query
  hex: "BE EF 03 06 00 75 23 02 00 02 23 00 00"
  params: []

- id: pbyp_pip_swap
  label: PbyP/PIP Swap Execute
  kind: action
  hex: "BE EF 03 06 00 01 27 06 00 16 23 00 00"
  params: []

- id: pbyp_pip_frame_lock_set_left_primary
  label: PbyP/PIP Frame Lock Set - LEFT/PRIMARY
  kind: action
  hex: "BE EF 03 06 00 4A 27 01 00 17 23 00 00"
  params: []

- id: pbyp_pip_frame_lock_set_right_secondary
  label: PbyP/PIP Frame Lock Set - RIGHT/SECONDARY
  kind: action
  hex: "BE EF 03 06 00 DA 26 01 00 17 23 01 00"
  params: []

- id: pbyp_pip_frame_lock_get
  label: PbyP/PIP Frame Lock Get
  kind: query
  hex: "BE EF 03 06 00 79 27 02 00 17 23 00 00"
  params: []

- id: picture_mode_set_standard
  label: Picture Mode Set - STANDARD
  kind: action
  hex: "BE EF 03 06 00 83 F5 01 00 BA 30 06 00"
  params: []

- id: picture_mode_set_natural
  label: Picture Mode Set - NATURAL
  kind: action
  hex: "BE EF 03 06 00 23 F6 01 00 BA 30 00 00"
  params: []

- id: picture_mode_set_cinema
  label: Picture Mode Set - CINEMA
  kind: action
  hex: "BE EF 03 06 00 B3 F7 01 00 BA 30 01 00"
  params: []

- id: picture_mode_set_dynamic
  label: Picture Mode Set - DYNAMIC
  kind: action
  hex: "BE EF 03 06 00 E3 F4 01 00 BA 30 04 00"
  params: []

- id: picture_mode_set_whiteboard
  label: Picture Mode Set - WHITEBOARD
  kind: action
  hex: "BE EF 03 06 00 83 EE 01 00 BA 30 22 00"
  params: []

- id: picture_mode_set_dicom_sim
  label: Picture Mode Set - DICOM SIM.
  kind: action
  hex: "BE EF 03 06 00 73 C6 01 00 BA 30 41 00"
  params: []

- id: picture_mode_set_hdr_cinema
  label: Picture Mode Set - HDR-CINEMA
  kind: action
  hex: "BE EF 03 06 00 23 DE 01 00 BA 30 60 00"
  params: []

- id: picture_mode_set_hdr_broadcast
  label: Picture Mode Set - HDR-BROADCAST
  kind: action
  hex: "BE EF 03 06 00 B3 DF 01 00 BA 30 61 00"
  params: []

- id: picture_mode_set_user1
  label: Picture Mode Set - USER-1
  kind: action
  hex: "BE EF 03 06 00 E3 FB 01 00 BA 30 10 00"
  params: []

- id: picture_mode_set_user2
  label: Picture Mode Set - USER-2
  kind: action
  hex: "BE EF 03 06 00 73 FA 01 00 BA 30 11 00"
  params: []

- id: picture_mode_set_user3
  label: Picture Mode Set - USER-3
  kind: action
  hex: "BE EF 03 06 00 83 FA 01 00 BA 30 12 00"
  params: []

- id: picture_mode_get
  label: Picture Mode Get
  kind: query
  hex: "BE EF 03 06 00 10 F6 02 00 BA 30 00 00"
  params: []

- id: brightness_get
  label: Brightness Get
  kind: query
  hex: "BE EF 03 06 00 89 D2 02 00 03 20 00 00"
  params: []

- id: brightness_increment
  label: Brightness Increment
  kind: action
  hex: "BE EF 03 06 00 EF D2 04 00 03 20 00 00"
  params: []

- id: brightness_decrement
  label: Brightness Decrement
  kind: action
  hex: "BE EF 03 06 00 3E D3 05 00 03 20 00 00"
  params: []

- id: brightness_reset
  label: Brightness Reset Execute
  kind: action
  hex: "BE EF 03 06 00 58 D3 06 00 00 70 00 00"
  params: []

- id: contrast_get
  label: Contrast Get
  kind: query
  hex: "BE EF 03 06 00 FD D3 02 00 04 20 00 00"
  params: []

- id: contrast_increment
  label: Contrast Increment
  kind: action
  hex: "BE EF 03 06 00 9B D3 04 00 04 20 00 00"
  params: []

- id: contrast_decrement
  label: Contrast Decrement
  kind: action
  hex: "BE EF 03 06 00 4A D2 05 00 04 20 00 00"
  params: []

- id: contrast_reset
  label: Contrast Reset Execute
  kind: action
  hex: "BE EF 03 06 00 A4 D2 06 00 01 70 00 00"
  params: []

- id: gamma_set_1_default
  label: Gamma Set - 1 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 07 E9 01 00 A1 30 20 00"
  params: []

- id: gamma_set_1_custom
  label: Gamma Set - 1 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 07 FD 01 00 A1 30 10 00"
  params: []

- id: gamma_set_2_default
  label: Gamma Set - 2 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 97 E8 01 00 A1 30 21 00"
  params: []

- id: gamma_set_2_custom
  label: Gamma Set - 2 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 97 FC 01 00 A1 30 11 00"
  params: []

- id: gamma_set_3_default
  label: Gamma Set - 3 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 67 E8 01 00 A1 30 22 00"
  params: []

- id: gamma_set_3_custom
  label: Gamma Set - 3 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 67 FC 01 00 A1 30 12 00"
  params: []

- id: gamma_set_4_default
  label: Gamma Set - 4 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 F7 E9 01 00 A1 30 23 00"
  params: []

- id: gamma_set_4_custom
  label: Gamma Set - 4 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 F7 FD 01 00 A1 30 13 00"
  params: []

- id: gamma_set_5_default
  label: Gamma Set - 5 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 C7 EB 01 00 A1 30 24 00"
  params: []

- id: gamma_set_5_custom
  label: Gamma Set - 5 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 C7 FF 01 00 A1 30 14 00"
  params: []

- id: gamma_set_6_default
  label: Gamma Set - 6 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 57 EA 01 00 A1 30 25 00"
  params: []

- id: gamma_set_6_custom
  label: Gamma Set - 6 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 57 FE 01 00 A1 30 15 00"
  params: []

- id: gamma_set_7_default
  label: Gamma Set - 7 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 A7 EA 01 00 A1 30 26 00"
  params: []

- id: gamma_set_7_custom
  label: Gamma Set - 7 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 A7 FE 01 00 A1 30 16 00"
  params: []

- id: gamma_set_8_default
  label: Gamma Set - 8 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 37 EB 01 00 A1 30 27 00"
  params: []

- id: gamma_set_8_custom
  label: Gamma Set - 8 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 37 FF 01 00 A1 30 17 00"
  params: []

- id: gamma_get
  label: Gamma Get
  kind: query
  hex: "BE EF 03 06 00 F4 F0 02 00 A1 30 00 00"
  params: []

- id: user_gamma_point1_get
  label: User Gamma Point 1 Get
  kind: query
  hex: "BE EF 03 06 00 08 FE 02 00 90 30 00 00"
  params: []

- id: user_gamma_point1_increment
  label: User Gamma Point 1 Increment
  kind: action
  hex: "BE EF 03 06 00 6E FE 04 00 90 30 00 00"
  params: []

- id: user_gamma_point1_decrement
  label: User Gamma Point 1 Decrement
  kind: action
  hex: "BE EF 03 06 00 BF FF 05 00 90 30 00 00"
  params: []

- id: user_gamma_point1_reset
  label: User Gamma Point 1 Reset Execute
  kind: action
  hex: "BE EF 03 06 00 58 C2 06 00 50 70 00 00"
  params: []

- id: user_gamma_point2_get
  label: User Gamma Point 2 Get
  kind: query
  hex: "BE EF 03 06 00 F4 FF 02 00 91 30 00 00"
  params: []

- id: user_gamma_point2_increment
  label: User Gamma Point 2 Increment
  kind: action
  hex: "BE EF 03 06 00 92 FF 04 00 91 30 00 00"
  params: []

- id: user_gamma_point2_decrement
  label: User Gamma Point 2 Decrement
  kind: action
  hex: "BE EF 03 06 00 43 FE 05 00 91 30 00 00"
  params: []

- id: user_gamma_point2_reset
  label: User Gamma Point 2 Reset Execute
  kind: action
  hex: "BE EF 03 06 00 A4 C3 06 00 51 70 00 00"
  params: []

- id: user_gamma_point3_get
  label: User Gamma Point 3 Get
  kind: query
  hex: "BE EF 03 06 00 B0 FF 02 00 92 30 00 00"
  params: []

- id: user_gamma_point3_increment
  label: User Gamma Point 3 Increment
  kind: action
  hex: "BE EF 03 06 00 D6 FF 04 00 92 30 00 00"
  params: []

- id: user_gamma_point3_decrement
  label: User Gamma Point 3 Decrement
  kind: action
  hex: "BE EF 03 06 00 07 FE 05 00 92 30 00 00"
  params: []

- id: user_gamma_point3_reset
  label: User Gamma Point 3 Reset Execute
  kind: action
  hex: "BE EF 03 06 00 E0 C3 06 00 52 70 00 00"
  params: []

- id: user_gamma_point4_get
  label: User Gamma Point 4 Get
  kind: query
  hex: "BE EF 03 06 00 4C FE 02 00 93 30 00 00"
  params: []

- id: user_gamma_point4_increment
  label: User Gamma Point 4 Increment
  kind: action
  hex: "BE EF 03 06 00 2A FE 04 00 93 30 00 00"
  params: []

- id: user_gamma_point4_decrement
  label: User Gamma Point 4 Decrement
  kind: action
  hex: "BE EF 03 06 00 FB FF 05 00 93 30 00 00"
  params: []

- id: user_gamma_point4_reset
  label: User Gamma Point 4 Reset Execute
  kind: action
  hex: "BE EF 03 06 00 1C C2 06 00 53 70 00 00"
  params: []

- id: user_gamma_point5_get
  label: User Gamma Point 5 Get
  kind: query
  hex: "BE EF 03 06 00 38 FF 02 00 94 30 00 00"
  params: []

- id: user_gamma_point5_increment
  label: User Gamma Point 5 Increment
  kind: action
  hex: "BE EF 03 06 00 5E FF 04 00 94 30 00 00"
  params: []

- id: user_gamma_point5_decrement
  label: User Gamma Point 5 Decrement
  kind: action
  hex: "BE EF 03 06 00 8F FE 05 00 94 30 00 00"
  params: []

- id: user_gamma_point5_reset
  label: User Gamma Point 5 Reset Execute
  kind: action
  hex: "BE EF 03 06 00 68 C3 06 00 54 70 00 00"
  params: []

- id: user_gamma_point6_get
  label: User Gamma Point 6 Get
  kind: query
  hex: "BE EF 03 06 00 C4 FE 02 00 95 30 00 00"
  params: []

- id: user_gamma_point6_increment
  label: User Gamma Point 6 Increment
  kind: action
  hex: "BE EF 03 06 00 A2 FE 04 00 95 30 00 00"
  params: []

- id: user_gamma_point6_decrement
  label: User Gamma Point 6 Decrement
  kind: action
  hex: "BE EF 03 06 00 73 FF 05 00 95 30 00 00"
  params: []

- id: user_gamma_point6_reset
  label: User Gamma Point 6 Reset Execute
  kind: action
  hex: "BE EF 03 06 00 94 C2 06 00 55 70 00 00"
  params: []

- id: user_gamma_point7_get
  label: User Gamma Point 7 Get
  kind: query
  hex: "BE EF 03 06 00 80 FE 02 00 96 30 00 00"
  params: []

- id: user_gamma_point7_increment
  label: User Gamma Point 7 Increment
  kind: action
  hex: "BE EF 03 06 00 E6 FE 04 00 96 30 00 00"
  params: []

- id: user_gamma_point7_decrement
  label: User Gamma Point 7 Decrement
  kind: action
  hex: "BE EF 03 06 00 37 FF 05 00 96 30 00 00"
  params: []

- id: user_gamma_point7_reset
  label: User Gamma Point 7 Reset Execute
  kind: action
  hex: "BE EF 03 06 00 D0 C2 06 00 56 70 00 00"
  params: []

- id: user_gamma_point8_get
  label: User Gamma Point 8 Get
  kind: query
  hex: "BE EF 03 06 00 7C FF 02 00 97 30 00 00"
  params: []

- id: user_gamma_point8_increment
  label: User Gamma Point 8 Increment
  kind: action
  hex: "BE EF 03 06 00 1A FF 04 00 97 30 00 00"
  params: []

- id: user_gamma_point8_decrement
  label: User Gamma Point 8 Decrement
  kind: action
  hex: "BE EF 03 06 00 CB FE 05 00 97 30 00 00"
  params: []

- id: user_gamma_point8_reset
  label: User Gamma Point 8 Reset Execute
  kind: action
  hex: "BE EF 03 06 00 2C C3 06 00 57 70 00 00"
  params: []

- id: color_temp_set_1_high
  label: Color Temp Set - 1 HIGH
  kind: action
  hex: "BE EF 03 06 00 0B F5 01 00 B0 30 03 00"
  params: []

- id: color_temp_set_1_custom
  label: Color Temp Set - 1 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 CB F8 01 00 B0 30 13 00"
  params: []

- id: color_temp_set_2_mid1
  label: Color Temp Set - 2 MID-1
  kind: action
  hex: "BE EF 03 06 00 9B F4 01 00 B0 30 02 00"
  params: []

- id: color_temp_set_2_custom
  label: Color Temp Set - 2 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 5B F9 01 00 B0 30 12 00"
  params: []

- id: color_temp_set_3_mid2
  label: Color Temp Set - 3 MID-2
  kind: action
  hex: "BE EF 03 06 00 3B F7 01 00 B0 30 04 00"
  params: []

- id: color_temp_set_3_custom
  label: Color Temp Set - 3 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 FB FA 01 00 B0 30 14 00"
  params: []

- id: color_temp_set_4_low
  label: Color Temp Set - 4 LOW
  kind: action
  hex: "BE EF 03 06 00 6B F4 01 00 B0 30 01 00"
  params: []

- id: color_temp_set_4_custom
  label: Color Temp Set - 4 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 AB F9 01 00 B0 30 11 00"
  params: []

- id: color_temp_set_5_hibright1
  label: Color Temp Set - 5 Hi-BRIGHT-1
  kind: action
  hex: "BE EF 03 06 00 3B F2 01 00 B0 30 08 00"
  params: []

- id: color_temp_set_5_custom
  label: Color Temp Set - 5 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 FB FF 01 00 B0 30 18 00"
  params: []

- id: color_temp_set_6_hibright2
  label: Color Temp Set - 6 Hi-BRIGHT-2
  kind: action
  hex: "BE EF 03 06 00 AB F3 01 00 B0 30 09 00"
  params: []

- id: color_temp_set_6_custom
  label: Color Temp Set - 6 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 6B FE 01 00 B0 30 19 00"
  params: []

- id: color_temp_set_7_hibright3
  label: Color Temp Set - 7 Hi-BRIGHT-3
  kind: action
  hex: "BE EF 03 06 00 5B F3 01 00 B0 30 0A 00"
  params: []

- id: color_temp_set_7_custom
  label: Color Temp Set - 7 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 9B FE 01 00 B0 30 1A 00"
  params: []

- id: color_temp_get
  label: Color Temp Get
  kind: query
  hex: "BE EF 03 06 00 C8 F5 02 00 B0 30 00 00"
  params: []

- id: color_temp_gain_r_get
  label: Color Temp Gain R Get
  kind: query
  hex: "BE EF 03 06 00 34 F4 02 00 B1 30 00 00"
  params: []

- id: color_temp_gain_r_increment
  label: Color Temp Gain R Increment
  kind: action
  hex: "BE EF 03 06 00 52 F4 04 00 B1 30 00 00"
  params: []

- id: color_temp_gain_r_decrement
  label: Color Temp Gain R Decrement
  kind: action
  hex: "BE EF 03 06 00 83 F5 05 00 B1 30 00 00"
  params: []

- id: color_temp_gain_r_reset
  label: Color Temp Gain R Reset Execute
  kind: action
  hex: "BE EF 03 06 00 10 C6 06 00 46 70 00 00"
  params: []

- id: color_temp_gain_g_get
  label: Color Temp Gain G Get
  kind: query
  hex: "BE EF 03 06 00 70 F4 02 00 B2 30 00 00"
  params: []

- id: color_temp_gain_g_increment
  label: Color Temp Gain G Increment
  kind: action
  hex: "BE EF 03 06 00 16 F4 04 00 B2 30 00 00"
  params: []

- id: color_temp_gain_g_decrement
  label: Color Temp Gain G Decrement
  kind: action
  hex: "BE EF 03 06 00 C7 F5 05 00 B2 30 00 00"
  params: []

- id: color_temp_gain_g_reset
  label: Color Temp Gain G Reset Execute
  kind: action
  hex: "BE EF 03 06 00 EC C7 06 00 47 70 00 00"
  params: []

- id: color_temp_gain_b_get
  label: Color Temp Gain B Get
  kind: query
  hex: "BE EF 03 06 00 8C F5 02 00 B3 30 00 00"
  params: []

- id: color_temp_gain_b_increment
  label: Color Temp Gain B Increment
  kind: action
  hex: "BE EF 03 06 00 EA F5 04 00 B3 30 00 00"
  params: []

- id: color_temp_gain_b_decrement
  label: Color Temp Gain B Decrement
  kind: action
  hex: "BE EF 03 06 00 3B F4 05 00 B3 30 00 00"
  params: []

- id: color_temp_gain_b_reset
  label: Color Temp Gain B Reset Execute
  kind: action
  hex: "BE EF 03 06 00 F8 C4 06 00 48 70 00 00"
  params: []

- id: color_temp_offset_r_get
  label: Color Temp Offset R Get
  kind: query
  hex: "BE EF 03 06 00 04 F5 02 00 B5 30 00 00"
  params: []

- id: color_temp_offset_r_increment
  label: Color Temp Offset R Increment
  kind: action
  hex: "BE EF 03 06 00 62 F5 04 00 B5 30 00 00"
  params: []

- id: color_temp_offset_r_decrement
  label: Color Temp Offset R Decrement
  kind: action
  hex: "BE EF 03 06 00 B3 F4 05 00 B5 30 00 00"
  params: []

- id: color_temp_offset_r_reset
  label: Color Temp Offset R Reset Execute
  kind: action
  hex: "BE EF 03 06 00 40 C5 06 00 4A 70 00 00"
  params: []

- id: color_temp_offset_g_get
  label: Color Temp Offset G Get
  kind: query
  hex: "BE EF 03 06 00 40 F5 02 00 B6 30 00 00"
  params: []

- id: color_temp_offset_g_increment
  label: Color Temp Offset G Increment
  kind: action
  hex: "BE EF 03 06 00 26 F5 04 00 B6 30 00 00"
  params: []

- id: color_temp_offset_g_decrement
  label: Color Temp Offset G Decrement
  kind: action
  hex: "BE EF 03 06 00 F7 F4 05 00 B6 30 00 00"
  params: []

- id: color_temp_offset_g_reset
  label: Color Temp Offset G Reset Execute
  kind: action
  hex: "BE EF 03 06 00 BC C4 06 00 4B 70 00 00"
  params: []

- id: color_temp_offset_b_get
  label: Color Temp Offset B Get
  kind: query
  hex: "BE EF 03 06 00 BC F4 02 00 B7 30 00 00"
  params: []

- id: color_temp_offset_b_increment
  label: Color Temp Offset B Increment
  kind: action
  hex: "BE EF 03 06 00 DA F4 04 00 B7 30 00 00"
  params: []

- id: color_temp_offset_b_decrement
  label: Color Temp Offset B Decrement
  kind: action
  hex: "BE EF 03 06 00 0B F5 05 00 B7 30 00 00"
  params: []

- id: color_temp_offset_b_reset
  label: Color Temp Offset B Reset Execute
  kind: action
  hex: "BE EF 03 06 00 C8 C5 06 00 4C 70 00 00"
  params: []

- id: color_get
  label: Color Get
  kind: query
  hex: "BE EF 03 06 00 B5 72 02 00 02 22 00 00"
  params: []

- id: color_increment
  label: Color Increment
  kind: action
  hex: "BE EF 03 06 00 D3 72 04 00 02 22 00 00"
  params: []

- id: color_decrement
  label: Color Decrement
  kind: action
  hex: "BE EF 03 06 00 02 73 05 00 02 22 00 00"
  params: []

- id: color_reset
  label: Color Reset Execute
  kind: action
  hex: "BE EF 03 06 00 80 D0 06 00 0A 70 00 00"
  params: []

- id: tint_get
  label: Tint Get
  kind: query
  hex: "BE EF 03 06 00 49 73 02 00 03 22 00 00"
  params: []

- id: tint_increment
  label: Tint Increment
  kind: action
  hex: "BE EF 03 06 00 2F 73 04 00 03 22 00 00"
  params: []

- id: tint_decrement
  label: Tint Decrement
  kind: action
  hex: "BE EF 03 06 00 FE 72 05 00 03 22 00 00"
  params: []

- id: tint_reset
  label: Tint Reset Execute
  kind: action
  hex: "BE EF 03 06 00 7C D1 06 00 0B 70 00 00"
  params: []

- id: sharpness_get
  label: Sharpness Get
  kind: query
  hex: "BE EF 03 06 00 F1 72 02 00 01 22 00 00"
  params: []

- id: sharpness_increment
  label: Sharpness Increment
  kind: action
  hex: "BE EF 03 06 00 97 72 04 00 01 22 00 00"
  params: []

- id: sharpness_decrement
  label: Sharpness Decrement
  kind: action
  hex: "BE EF 03 06 00 46 73 05 00 01 22 00 00"
  params: []

- id: sharpness_reset
  label: Sharpness Reset Execute
  kind: action
  hex: "BE EF 03 06 00 C4 D0 06 00 09 70 00 00"
  params: []

- id: dynamic_black_set_off
  label: Dynamic Black Set - OFF
  kind: action
  hex: "BE EF 03 06 00 FE 5A 01 00 80 22 00 00"
  params: []

- id: dynamic_black_set_on
  label: Dynamic Black Set - ON
  kind: action
  hex: "BE EF 03 06 00 6E 5B 01 00 80 22 01 00"
  params: []

- id: dynamic_black_get
  label: Dynamic Black Get
  kind: query
  hex: "BE EF 03 06 00 CD 5A 02 00 80 22 00 00"
  params: []

- id: eclarity_get
  label: eClarity Get
  kind: query
  hex: "BE EF 03 06 00 5D 70 02 00 0C 22 00 00"
  params: []

- id: eclarity_increment
  label: eClarity Increment
  kind: action
  hex: "BE EF 03 06 00 3B 70 04 00 0C 22 00 00"
  params: []

- id: eclarity_decrement
  label: eClarity Decrement
  kind: action
  hex: "BE EF 03 06 00 EA 71 05 00 0C 22 00 00"
  params: []

- id: eclarity_reset
  label: eClarity Reset Execute
  kind: action
  hex: "BE EF 03 06 00 C8 DB 06 00 2C 70 00 00"
  params: []

- id: hdcr_get
  label: HDCR Get
  kind: query
  hex: "BE EF 03 06 00 A1 71 02 00 0D 22 00 00"
  params: []

- id: hdcr_increment
  label: HDCR Increment
  kind: action
  hex: "BE EF 03 06 00 C7 71 04 00 0D 22 00 00"
  params: []

- id: hdcr_decrement
  label: HDCR Decrement
  kind: action
  hex: "BE EF 03 06 00 16 70 05 00 0D 22 00 00"
  params: []

- id: hdcr_reset
  label: HDCR Reset Execute
  kind: action
  hex: "BE EF 03 06 00 34 DA 06 00 2D 70 00 00"
  params: []

- id: my_memory_load_1
  label: My Memory Load 1
  kind: action
  hex: "BE EF 03 06 00 0E D7 01 00 14 20 00 00"
  params: []

- id: my_memory_load_2
  label: My Memory Load 2
  kind: action
  hex: "BE EF 03 06 00 9E D6 01 00 14 20 01 00"
  params: []

- id: my_memory_load_3
  label: My Memory Load 3
  kind: action
  hex: "BE EF 03 06 00 6E D6 01 00 14 20 02 00"
  params: []

- id: my_memory_load_4
  label: My Memory Load 4
  kind: action
  hex: "BE EF 03 06 00 FE D7 01 00 14 20 03 00"
  params: []

- id: my_memory_save_1
  label: My Memory Save 1
  kind: action
  hex: "BE EF 03 06 00 F2 D6 01 00 15 20 00 00"
  params: []

- id: my_memory_save_2
  label: My Memory Save 2
  kind: action
  hex: "BE EF 03 06 00 62 D7 01 00 15 20 01 00"
  params: []

- id: my_memory_save_3
  label: My Memory Save 3
  kind: action
  hex: "BE EF 03 06 00 92 D7 01 00 15 20 02 00"
  params: []

- id: my_memory_save_4
  label: My Memory Save 4
  kind: action
  hex: "BE EF 03 06 00 02 D6 01 00 15 20 03 00"
  params: []

- id: adv_color_hue_r_get
  label: Advanced Color Adjustment Hue R Get
  kind: query
  hex: "BE EF 03 06 00 0C 63 02 00 00 27 00 00"
  params: []

- id: adv_color_hue_r_increment
  label: Advanced Color Adjustment Hue R Increment
  kind: action
  hex: "BE EF 03 06 00 6A 63 04 00 00 27 00 00"
  params: []

- id: adv_color_hue_r_decrement
  label: Advanced Color Adjustment Hue R Decrement
  kind: action
  hex: "BE EF 03 06 00 BB 62 05 00 00 27 00 00"
  params: []

- id: adv_color_hue_r_reset
  label: Advanced Color Adjustment Hue R Reset Execute
  kind: action
  hex: "BE EF 03 06 00 98 EB 06 00 D0 70 00 00"
  params: []

- id: adv_color_hue_y_get
  label: Advanced Color Adjustment Hue Y Get
  kind: query
  hex: "BE EF 03 06 00 F0 62 02 00 01 27 00 00"
  params: []

- id: adv_color_hue_y_increment
  label: Advanced Color Adjustment Hue Y Increment
  kind: action
  hex: "BE EF 03 06 00 96 62 04 00 01 27 00 00"
  params: []

- id: adv_color_hue_y_decrement
  label: Advanced Color Adjustment Hue Y Decrement
  kind: action
  hex: "BE EF 03 06 00 47 63 05 00 01 27 00 00"
  params: []

- id: adv_color_hue_y_reset
  label: Advanced Color Adjustment Hue Y Reset Execute
  kind: action
  hex: "BE EF 03 06 00 64 EA 06 00 D1 70 00 00"
  params: []

- id: adv_color_hue_g_get
  label: Advanced Color Adjustment Hue G Get
  kind: query
  hex: "BE EF 03 06 00 B4 62 02 00 02 27 00 00"
  params: []

- id: adv_color_hue_g_increment
  label: Advanced Color Adjustment Hue G Increment
  kind: action
  hex: "BE EF 03 06 00 D2 62 04 00 02 27 00 00"
  params: []

- id: adv_color_hue_g_decrement
  label: Advanced Color Adjustment Hue G Decrement
  kind: action
  hex: "BE EF 03 06 00 03 63 05 00 02 27 00 00"
  params: []

- id: adv_color_hue_g_reset
  label: Advanced Color Adjustment Hue G Reset Execute
  kind: action
  hex: "BE EF 03 06 00 20 EA 06 00 D2 70 00 00"
  params: []

- id: adv_color_hue_c_get
  label: Advanced Color Adjustment Hue C Get
  kind: query
  hex: "BE EF 03 06 00 48 63 02 00 03 27 00 00"
  params: []

- id: adv_color_hue_c_increment
  label: Advanced Color Adjustment Hue C Increment
  kind: action
  hex: "BE EF 03 06 00 2E 63 04 00 03 27 00 00"
  params: []

- id: adv_color_hue_c_decrement
  label: Advanced Color Adjustment Hue C Decrement
  kind: action
  hex: "BE EF 03 06 00 FF 62 05 00 03 27 00 00"
  params: []

- id: adv_color_hue_c_reset
  label: Advanced Color Adjustment Hue C Reset Execute
  kind: action
  hex: "BE EF 03 06 00 DC EB 06 00 D3 70 00 00"
  params: []

- id: adv_color_hue_b_get
  label: Advanced Color Adjustment Hue B Get
  kind: query
  hex: "BE EF 03 06 00 3C 62 02 00 04 27 00 00"
  params: []

- id: adv_color_hue_b_increment
  label: Advanced Color Adjustment Hue B Increment
  kind: action
  hex: "BE EF 03 06 00 5A 62 04 00 04 27 00 00"
  params: []

- id: adv_color_hue_b_decrement
  label: Advanced Color Adjustment Hue B Decrement
  kind: action
  hex: "BE EF 03 06 00 8B 63 05 00 04 27 00 00"
  params: []

- id: adv_color_hue_b_reset
  label: Advanced Color Adjustment Hue B Reset Execute
  kind: action
  hex: "BE EF 03 06 00 A8 EA 06 00 D4 70 00 00"
  params: []

- id: adv_color_hue_m_get
  label: Advanced Color Adjustment Hue M Get
  kind: query
  hex: "BE EF 03 06 00 C0 63 02 00 05 27 00 00"
  params: []

- id: adv_color_hue_m_increment
  label: Advanced Color Adjustment Hue M Increment
  kind: action
  hex: "BE EF 03 06 00 A6 63 04 00 05 27 00 00"
  params: []

- id: adv_color_hue_m_decrement
  label: Advanced Color Adjustment Hue M Decrement
  kind: action
  hex: "BE EF 03 06 00 77 62 05 00 05 27 00 00"
  params: []

- id: adv_color_hue_m_reset
  label: Advanced Color Adjustment Hue M Reset Execute
  kind: action
  hex: "BE EF 03 06 00 54 EB 06 00 D5 70 00 00"
  params: []

- id: adv_color_sat_r_get
  label: Advanced Color Adjustment Saturation R Get
  kind: query
  hex: "BE EF 03 06 00 CC 67 02 00 10 27 00 00"
  params: []

- id: adv_color_sat_r_increment
  label: Advanced Color Adjustment Saturation R Increment
  kind: action
  hex: "BE EF 03 06 00 AA 67 04 00 10 27 00 00"
  params: []

- id: adv_color_sat_r_decrement
  label: Advanced Color Adjustment Saturation R Decrement
  kind: action
  hex: "BE EF 03 06 00 7B 66 05 00 10 27 00 00"
  params: []

- id: adv_color_sat_r_reset
  label: Advanced Color Adjustment Saturation R Reset Execute
  kind: action
  hex: "BE EF 03 06 00 F8 E9 06 00 D8 70 00 00"
  params: []

- id: adv_color_sat_y_get
  label: Advanced Color Adjustment Saturation Y Get
  kind: query
  hex: "BE EF 03 06 00 30 66 02 00 11 27 00 00"
  params: []

- id: adv_color_sat_y_increment
  label: Advanced Color Adjustment Saturation Y Increment
  kind: action
  hex: "BE EF 03 06 00 56 66 04 00 11 27 00 00"
  params: []

- id: adv_color_sat_y_decrement
  label: Advanced Color Adjustment Saturation Y Decrement
  kind: action
  hex: "BE EF 03 06 00 87 67 05 00 11 27 00 00"
  params: []

- id: adv_color_sat_y_reset
  label: Advanced Color Adjustment Saturation Y Reset Execute
  kind: action
  hex: "BE EF 03 06 00 04 E8 06 00 D9 70 00 00"
  params: []

- id: adv_color_sat_g_get
  label: Advanced Color Adjustment Saturation G Get
  kind: query
  hex: "BE EF 03 06 00 74 66 02 00 12 27 00 00"
  params: []

- id: adv_color_sat_g_increment
  label: Advanced Color Adjustment Saturation G Increment
  kind: action
  hex: "BE EF 03 06 00 12 66 04 00 12 27 00 00"
  params: []

- id: adv_color_sat_g_decrement
  label: Advanced Color Adjustment Saturation G Decrement
  kind: action
  hex: "BE EF 03 06 00 C3 67 05 00 12 27 00 00"
  params: []

- id: adv_color_sat_g_reset
  label: Advanced Color Adjustment Saturation G Reset Execute
  kind: action
  hex: "BE EF 03 06 00 40 E8 06 00 DA 70 00 00"
  params: []

- id: adv_color_sat_c_get
  label: Advanced Color Adjustment Saturation C Get
  kind: query
  hex: "BE EF 03 06 00 88 67 02 00 13 27 00 00"
  params: []

- id: adv_color_sat_c_increment
  label: Advanced Color Adjustment Saturation C Increment
  kind: action
  hex: "BE EF 03 06 00 EE 67 04 00 13 27 00 00"
  params: []

- id: adv_color_sat_c_decrement
  label: Advanced Color Adjustment Saturation C Decrement
  kind: action
  hex: "BE EF 03 06 00 3F 66 05 00 13 27 00 00"
  params: []

- id: adv_color_sat_c_reset
  label: Advanced Color Adjustment Saturation C Reset Execute
  kind: action
  hex: "BE EF 03 06 00 BC E9 06 00 DB 70 00 00"
  params: []

- id: adv_color_sat_b_get
  label: Advanced Color Adjustment Saturation B Get
  kind: query
  hex: "BE EF 03 06 00 FC 66 02 00 14 27 00 00"
  params: []

- id: adv_color_sat_b_increment
  label: Advanced Color Adjustment Saturation B Increment
  kind: action
  hex: "BE EF 03 06 00 9A 66 04 00 14 27 00 00"
  params: []

- id: adv_color_sat_b_decrement
  label: Advanced Color Adjustment Saturation B Decrement
  kind: action
  hex: "BE EF 03 06 00 4B 67 05 00 14 27 00 00"
  params: []

- id: adv_color_sat_b_reset
  label: Advanced Color Adjustment Saturation B Reset Execute
  kind: action
  hex: "BE EF 03 06 00 C8 E8 06 00 DC 70 00 00"
  params: []

- id: adv_color_sat_m_get
  label: Advanced Color Adjustment Saturation M Get
  kind: query
  hex: "BE EF 03 06 00 00 67 02 00 15 27 00 00"
  params: []

- id: adv_color_sat_m_increment
  label: Advanced Color Adjustment Saturation M Increment
  kind: action
  hex: "BE EF 03 06 00 66 67 04 00 15 27 00 00"
  params: []

- id: adv_color_sat_m_decrement
  label: Advanced Color Adjustment Saturation M Decrement
  kind: action
  hex: "BE EF 03 06 00 B7 66 05 00 15 27 00 00"
  params: []

- id: adv_color_sat_m_reset
  label: Advanced Color Adjustment Saturation M Reset Execute
  kind: action
  hex: "BE EF 03 06 00 34 E9 06 00 DD 70 00 00"
  params: []

- id: adv_color_lum_r_get
  label: Advanced Color Adjustment Luminance R Get
  kind: query
  hex: "BE EF 03 06 00 CC 68 02 00 20 27 00 00"
  params: []

- id: adv_color_lum_r_increment
  label: Advanced Color Adjustment Luminance R Increment
  kind: action
  hex: "BE EF 03 06 00 AA 68 04 00 20 27 00 00"
  params: []

- id: adv_color_lum_r_decrement
  label: Advanced Color Adjustment Luminance R Decrement
  kind: action
  hex: "BE EF 03 06 00 7B 69 05 00 20 27 00 00"
  params: []

- id: adv_color_lum_r_reset
  label: Advanced Color Adjustment Luminance R Reset Execute
  kind: action
  hex: "BE EF 03 06 00 98 E4 06 00 E0 70 00 00"
  params: []

- id: adv_color_lum_y_get
  label: Advanced Color Adjustment Luminance Y Get
  kind: query
  hex: "BE EF 03 06 00 30 69 02 00 21 27 00 00"
  params: []

- id: adv_color_lum_y_increment
  label: Advanced Color Adjustment Luminance Y Increment
  kind: action
  hex: "BE EF 03 06 00 56 69 04 00 21 27 00 00"
  params: []

- id: adv_color_lum_y_decrement
  label: Advanced Color Adjustment Luminance Y Decrement
  kind: action
  hex: "BE EF 03 06 00 87 68 05 00 21 27 00 00"
  params: []

- id: adv_color_lum_y_reset
  label: Advanced Color Adjustment Luminance Y Reset Execute
  kind: action
  hex: "BE EF 03 06 00 64 E5 06 00 E1 70 00 00"
  params: []

- id: adv_color_lum_g_get
  label: Advanced Color Adjustment Luminance G Get
  kind: query
  hex: "BE EF 03 06 00 74 69 02 00 22 27 00 00"
  params: []

- id: adv_color_lum_g_increment
  label: Advanced Color Adjustment Luminance G Increment
  kind: action
  hex: "BE EF 03 06 00 12 69 04 00 22 27 00 00"
  params: []

- id: adv_color_lum_g_decrement
  label: Advanced Color Adjustment Luminance G Decrement
  kind: action
  hex: "BE EF 03 06 00 C3 68 05 00 22 27 00 00"
  params: []

- id: adv_color_lum_g_reset
  label: Advanced Color Adjustment Luminance G Reset Execute
  kind: action
  hex: "BE EF 03 06 00 20 E5 06 00 E2 70 00 00"
  params: []

- id: adv_color_lum_c_get
  label: Advanced Color Adjustment Luminance C Get
  kind: query
  hex: "BE EF 03 06 00 88 68 02 00 23 27 00 00"
  params: []

- id: adv_color_lum_c_increment
  label: Advanced Color Adjustment Luminance C Increment
  kind: action
  hex: "BE EF 03 06 00 EE 68 04 00 23 27 00 00"
  params: []

- id: adv_color_lum_c_decrement
  label: Advanced Color Adjustment Luminance C Decrement
  kind: action
  hex: "BE EF 03 06 00 3F 69 05 00 23 27 00 00"
  params: []

- id: adv_color_lum_c_reset
  label: Advanced Color Adjustment Luminance C Reset Execute
  kind: action
  hex: "BE EF 03 06 00 DC E4 06 00 E3 70 00 00"
  params: []

- id: adv_color_lum_b_get
  label: Advanced Color Adjustment Luminance B Get
  kind: query
  hex: "BE EF 03 06 00 FC 69 02 00 24 27 00 00"
  params: []

- id: adv_color_lum_b_increment
  label: Advanced Color Adjustment Luminance B Increment
  kind: action
  hex: "BE EF 03 06 00 9A 69 04 00 24 27 00 00"
  params: []

- id: adv_color_lum_b_decrement
  label: Advanced Color Adjustment Luminance B Decrement
  kind: action
  hex: "BE EF 03 06 00 4B 68 05 00 24 27 00 00"
  params: []

- id: adv_color_lum_b_reset
  label: Advanced Color Adjustment Luminance B Reset Execute
  kind: action
  hex: "BE EF 03 06 00 A8 E5 06 00 E4 70 00 00"
  params: []

- id: adv_color_lum_m_get
  label: Advanced Color Adjustment Luminance M Get
  kind: query
  hex: "BE EF 03 06 00 00 68 02 00 25 27 00 00"
  params: []

- id: adv_color_lum_m_increment
  label: Advanced Color Adjustment Luminance M Increment
  kind: action
  hex: "BE EF 03 06 00 66 68 04 00 25 27 00 00"
  params: []

- id: adv_color_lum_m_decrement
  label: Advanced Color Adjustment Luminance M Decrement
  kind: action
  hex: "BE EF 03 06 00 B7 69 05 00 25 27 00 00"
  params: []

- id: adv_color_lum_m_reset
  label: Advanced Color Adjustment Luminance M Reset Execute
  kind: action
  hex: "BE EF 03 06 00 54 E4 06 00 E5 70 00 00"
  params: []

- id: aspect_set_normal
  label: Aspect Set - NORMAL
  kind: action
  hex: "BE EF 03 06 00 5E DD 01 00 08 20 10 00"
  params: []

- id: aspect_set_4_3
  label: Aspect Set - 4:3
  kind: action
  hex: "BE EF 03 06 00 9E D0 01 00 08 20 00 00"
  params: []

- id: aspect_set_16_9
  label: Aspect Set - 16:9
  kind: action
  hex: "BE EF 03 06 00 0E D1 01 00 08 20 01 00"
  params: []

- id: aspect_set_16_10
  label: Aspect Set - 16:10
  kind: action
  hex: "BE EF 03 06 00 3E D6 01 00 08 20 0A 00"
  params: []

- id: aspect_set_14_9
  label: Aspect Set - 14:9
  kind: action
  hex: "BE EF 03 06 00 CE D6 01 00 08 20 09 00"
  params: []

- id: aspect_set_native
  label: Aspect Set - NATIVE
  kind: action
  hex: "BE EF 03 06 00 5E D7 01 00 08 20 08 00"
  params: []

- id: aspect_set_zoom
  label: Aspect Set - ZOOM
  kind: action
  hex: "BE EF 03 06 00 9E C4 01 00 08 20 30 00"
  params: []

- id: aspect_get
  label: Aspect Get
  kind: query
  hex: "BE EF 03 06 00 AD D0 02 00 08 20 00 00"
  params: []

- id: over_scan_get
  label: Over Scan Get
  kind: query
  hex: "BE EF 03 06 00 91 70 02 00 09 22 00 00"
  params: []

- id: over_scan_increment
  label: Over Scan Increment
  kind: action
  hex: "BE EF 03 06 00 F7 70 04 00 09 22 00 00"
  params: []

- id: over_scan_decrement
  label: Over Scan Decrement
  kind: action
  hex: "BE EF 03 06 00 26 71 05 00 09 22 00 00"
  params: []

- id: over_scan_reset
  label: Over Scan Reset Execute
  kind: action
  hex: "BE EF 03 06 00 EC D9 06 00 27 70 00 00"
  params: []

- id: v_position_get
  label: V Position Get
  kind: query
  hex: "BE EF 03 06 00 0D 83 02 00 00 21 00 00"
  params: []

- id: v_position_increment
  label: V Position Increment
  kind: action
  hex: "BE EF 03 06 00 6B 83 04 00 00 21 00 00"
  params: []

- id: v_position_decrement
  label: V Position Decrement
  kind: action
  hex: "BE EF 03 06 00 BA 82 05 00 00 21 00 00"
  params: []

- id: v_position_reset
  label: V Position Reset Execute
  kind: action
  hex: "BE EF 03 06 00 E0 D2 06 00 02 70 00 00"
  params: []

- id: h_position_get
  label: H Position Get
  kind: query
  hex: "BE EF 03 06 00 F1 82 02 00 01 21 00 00"
  params: []

- id: h_position_increment
  label: H Position Increment
  kind: action
  hex: "BE EF 03 06 00 97 82 04 00 01 21 00 00"
  params: []

- id: h_position_decrement
  label: H Position Decrement
  kind: action
  hex: "BE EF 03 06 00 46 83 05 00 01 21 00 00"
  params: []

- id: h_position_reset
  label: H Position Reset Execute
  kind: action
  hex: "BE EF 03 06 00 1C D3 06 00 03 70 00 00"
  params: []

- id: h_phase_get
  label: H Phase Get
  kind: query
  hex: "BE EF 03 06 00 49 83 02 00 03 21 00 00"
  params: []

- id: h_phase_increment
  label: H Phase Increment
  kind: action
  hex: "BE EF 03 06 00 2F 83 04 00 03 21 00 00"
  params: []

- id: h_phase_decrement
  label: H Phase Decrement
  kind: action
  hex: "BE EF 03 06 00 FE 82 05 00 03 21 00 00"
  params: []

- id: h_size_get
  label: H Size Get
  kind: query
  hex: "BE EF 03 06 00 B5 82 02 00 02 21 00 00"
  params: []

- id: h_size_increment
  label: H Size Increment
  kind: action
  hex: "BE EF 03 06 00 D3 82 04 00 02 21 00 00"
  params: []

- id: h_size_decrement
  label: H Size Decrement
  kind: action
  hex: "BE EF 03 06 00 02 83 05 00 02 21 00 00"
  params: []

- id: h_size_reset
  label: H Size Reset Execute
  kind: action
  hex: "BE EF 03 06 00 68 D2 06 00 04 70 00 00"
  params: []

- id: auto_image
  label: Auto Image Execute
  kind: action
  hex: "BE EF 03 06 00 91 D0 06 00 0A 20 00 00"
  params: []

- id: progressive_set_off
  label: Progressive Set - OFF
  kind: action
  hex: "BE EF 03 06 00 4A 72 01 00 07 22 00 00"
  params: []

- id: progressive_set_tv
  label: Progressive Set - TV
  kind: action
  hex: "BE EF 03 06 00 DA 73 01 00 07 22 01 00"
  params: []

- id: progressive_set_film
  label: Progressive Set - FILM
  kind: action
  hex: "BE EF 03 06 00 2A 73 01 00 07 22 02 00"
  params: []

- id: progressive_get
  label: Progressive Get
  kind: query
  hex: "BE EF 03 06 00 79 72 02 00 07 22 00 00"
  params: []

- id: video_nr_set_low
  label: Video NR Set - LOW
  kind: action
  hex: "BE EF 03 06 00 26 72 01 00 06 22 01 00"
  params: []

- id: video_nr_set_mid
  label: Video NR Set - MID
  kind: action
  hex: "BE EF 03 06 00 D6 72 01 00 06 22 02 00"
  params: []

- id: video_nr_set_high
  label: Video NR Set - HIGH
  kind: action
  hex: "BE EF 03 06 00 46 73 01 00 06 22 03 00"
  params: []

- id: video_nr_get
  label: Video NR Get
  kind: query
  hex: "BE EF 03 06 00 85 73 02 00 06 22 00 00"
  params: []

- id: color_space_set_auto
  label: Color Space Set - AUTO
  kind: action
  hex: "BE EF 03 06 00 0E 72 01 00 04 22 00 00"
  params: []

- id: color_space_set_rgb
  label: Color Space Set - RGB
  kind: action
  hex: "BE EF 03 06 00 9E 73 01 00 04 22 01 00"
  params: []

- id: color_space_set_smpte240
  label: Color Space Set - SMPTE240
  kind: action
  hex: "BE EF 03 06 00 6E 73 01 00 04 22 02 00"
  params: []

- id: color_space_set_rec2020
  label: Color Space Set - REC2020
  kind: action
  hex: "BE EF 03 06 00 5E 71 01 00 04 22 05 00"
  params: []

- id: color_space_set_rec709
  label: Color Space Set - REC709
  kind: action
  hex: "BE EF 03 06 00 FE 72 01 00 04 22 03 00"
  params: []

- id: color_space_set_rec601
  label: Color Space Set - REC601
  kind: action
  hex: "BE EF 03 06 00 CE 70 01 00 04 22 04 00"
  params: []

- id: color_space_get
  label: Color Space Get
  kind: query
  hex: "BE EF 03 06 00 3D 72 02 00 04 22 00 00"
  params: []

- id: c_video_format_set_auto
  label: C-Video Format Set - AUTO
  kind: action
  hex: "BE EF 03 06 00 A2 70 01 00 11 22 0A 00"
  params: []

- id: c_video_format_set_ntsc
  label: C-Video Format Set - NTSC
  kind: action
  hex: "BE EF 03 06 00 C2 74 01 00 11 22 04 00"
  params: []

- id: c_video_format_set_pal
  label: C-Video Format Set - PAL
  kind: action
  hex: "BE EF 03 06 00 52 75 01 00 11 22 05 00"
  params: []

- id: c_video_format_set_secam
  label: C-Video Format Set - SECAM
  kind: action
  hex: "BE EF 03 06 00 52 70 01 00 11 22 09 00"
  params: []

- id: c_video_format_set_ntsc443
  label: C-Video Format Set - NTSC4.43
  kind: action
  hex: "BE EF 03 06 00 62 77 01 00 11 22 02 00"
  params: []

- id: c_video_format_set_mpal
  label: C-Video Format Set - M-PAL
  kind: action
  hex: "BE EF 03 06 00 C2 71 01 00 11 22 08 00"
  params: []

- id: c_video_format_set_npal
  label: C-Video Format Set - N-PAL
  kind: action
  hex: "BE EF 03 06 00 32 74 01 00 11 22 07 00"
  params: []

- id: c_video_format_get
  label: C-Video Format Get
  kind: query
  hex: "BE EF 03 06 00 31 76 02 00 11 22 00 00"
  params: []

- id: digital_signal_hdmi1_set_2k
  label: Digital Signal Format HDMI 1 Set - 2K COMPATIBLE
  kind: action
  hex: "BE EF 03 06 00 02 3D 01 00 61 23 00 00"
  params: []

- id: digital_signal_hdmi1_set_4k_std
  label: Digital Signal Format HDMI 1 Set - 4K STANDARD
  kind: action
  hex: "BE EF 03 06 00 92 3C 01 00 61 23 01 00"
  params: []

- id: digital_signal_hdmi1_set_4k_enh
  label: Digital Signal Format HDMI 1 Set - 4K ENHANCED
  kind: action
  hex: "BE EF 03 06 00 62 3C 01 00 61 23 02 00"
  params: []

- id: digital_signal_hdmi1_get
  label: Digital Signal Format HDMI 1 Get
  kind: query
  hex: "BE EF 03 06 00 31 3D 02 00 61 23 00 00"
  params: []

- id: digital_signal_dp_set_2k
  label: Digital Signal Format DisplayPort Set - 2K COMPATIBLE
  kind: action
  hex: "BE EF 03 06 00 9E 3E 01 00 68 23 00 00"
  params: []

- id: digital_signal_dp_set_4k_std
  label: Digital Signal Format DisplayPort Set - 4K STANDARD
  kind: action
  hex: "BE EF 03 06 00 0E 3F 01 00 68 23 01 00"
  params: []

- id: digital_signal_dp_get
  label: Digital Signal Format DisplayPort Get
  kind: query
  hex: "BE EF 03 06 00 AD 3E 02 00 68 23 00 00"
  params: []

- id: digital_signal_hdbaset_set_2k
  label: Digital Signal Format HDBaseT Set - 2K COMPATIBLE
  kind: action
  hex: "BE EF 03 06 00 76 3C 01 00 66 23 00 00"
  params: []

- id: digital_signal_hdbaset_set_4k_std
  label: Digital Signal Format HDBaseT Set - 4K STANDARD
  kind: action
  hex: "BE EF 03 06 00 E6 3D 01 00 66 23 01 00"
  params: []

- id: digital_signal_hdbaset_get
  label: Digital Signal Format HDBaseT Get
  kind: query
  hex: "BE EF 03 06 00 45 3C 02 00 66 23 00 00"
  params: []

- id: hdmi1_range_set_auto
  label: HDMI 1 Range Set - AUTO
  kind: action
  hex: "BE EF 03 06 00 86 D8 01 00 22 20 00 00"
  params: []

- id: hdmi1_range_set_normal
  label: HDMI 1 Range Set - NORMAL
  kind: action
  hex: "BE EF 03 06 00 16 D9 01 00 22 20 01 00"
  params: []

- id: hdmi1_range_set_enhanced
  label: HDMI 1 Range Set - ENHANCED
  kind: action
  hex: "BE EF 03 06 00 E6 D9 01 00 22 20 02 00"
  params: []

- id: hdmi1_range_get
  label: HDMI 1 Range Get
  kind: query
  hex: "BE EF 03 06 00 B5 D8 02 00 22 20 00 00"
  params: []

- id: hdmi2_range_set_auto
  label: HDMI 2 Range Set - AUTO
  kind: action
  hex: "BE EF 03 06 00 7A D9 01 00 23 20 00 00"
  params: []

- id: hdmi2_range_set_normal
  label: HDMI 2 Range Set - NORMAL
  kind: action
  hex: "BE EF 03 06 00 EA D8 01 00 23 20 01 00"
  params: []

- id: hdmi2_range_set_enhanced
  label: HDMI 2 Range Set - ENHANCED
  kind: action
  hex: "BE EF 03 06 00 1A D8 01 00 23 20 02 00"
  params: []

- id: hdmi2_range_get
  label: HDMI 2 Range Get
  kind: query
  hex: "BE EF 03 06 00 49 D9 02 00 23 20 00 00"
  params: []

- id: hdbaset_range_set_auto
  label: HDBaseT Range Set - AUTO
  kind: action
  hex: "BE EF 03 06 00 86 EB 01 00 D2 20 00 00"
  params: []

- id: hdbaset_range_set_normal
  label: HDBaseT Range Set - NORMAL
  kind: action
  hex: "BE EF 03 06 00 16 EA 01 00 D2 20 01 00"
  params: []

- id: hdbaset_range_set_enhanced
  label: HDBaseT Range Set - ENHANCED
  kind: action
  hex: "BE EF 03 06 00 E6 EA 01 00 D2 20 02 00"
  params: []

- id: hdbaset_range_get
  label: HDBaseT Range Get
  kind: query
  hex: "BE EF 03 06 00 B5 EB 02 00 D2 20 00 00"
  params: []

- id: sdi_range_set_normal
  label: 3G-SDI Range Set - NORMAL (LWU900-DS/LHD878-DS only)
  kind: action
  hex: "BE EF 03 06 00 16 E5 01 00 E2 20 01 00"
  params: []

- id: sdi_range_set_enhanced
  label: 3G-SDI Range Set - ENHANCED (LWU900-DS/LHD878-DS only)
  kind: action
  hex: "BE EF 03 06 00 E6 E5 01 00 E2 20 02 00"
  params: []

- id: sdi_range_get
  label: 3G-SDI Range Get (LWU900-DS/LHD878-DS only)
  kind: query
  hex: "BE EF 03 06 00 B5 E4 02 00 E2 20 00 00"
  params: []

- id: dp_range_set_auto
  label: DisplayPort Range Set - AUTO
  kind: action
  hex: "BE EF 03 06 00 46 E0 01 00 F2 20 00 00"
  params: []

- id: dp_range_set_normal
  label: DisplayPort Range Set - NORMAL
  kind: action
  hex: "BE EF 03 06 00 D6 E1 01 00 F2 20 01 00"
  params: []

- id: dp_range_set_enhanced
  label: DisplayPort Range Set - ENHANCED
  kind: action
  hex: "BE EF 03 06 00 26 E1 01 00 F2 20 02 00"
  params: []

- id: dp_range_get
  label: DisplayPort Range Get
  kind: query
  hex: "BE EF 03 06 00 75 E0 02 00 F2 20 00 00"
  params: []

- id: computer_in_set_auto
  label: Computer In Set - AUTO
  kind: action
  hex: "BE EF 03 06 00 CE D6 01 00 10 20 03 00"
  params: []

- id: computer_in_set_sync_on_g_off
  label: Computer In Set - SYNC ON G OFF
  kind: action
  hex: "BE EF 03 06 00 5E D7 01 00 10 20 02 00"
  params: []

- id: computer_in_get
  label: Computer In Get
  kind: query
  hex: "BE EF 03 06 00 0D D6 02 00 10 20 00 00"
  params: []

- id: frame_lock_computer_in_set_off
  label: Frame Lock Computer In Set - OFF
  kind: action
  hex: "BE EF 03 06 00 3B C2 01 00 50 30 00 00"
  params: []

- id: frame_lock_computer_in_set_on
  label: Frame Lock Computer In Set - ON
  kind: action
  hex: "BE EF 03 06 00 AB C3 01 00 50 30 01 00"
  params: []

- id: frame_lock_computer_in_get
  label: Frame Lock Computer In Get
  kind: query
  hex: "BE EF 03 06 00 08 C2 02 00 50 30 00 00"
  params: []

- id: frame_lock_hdmi1_set_off
  label: Frame Lock HDMI 1 Set - OFF
  kind: action
  hex: "BE EF 03 06 00 7F C2 01 00 53 30 00 00"
  params: []

- id: frame_lock_hdmi1_set_on
  label: Frame Lock HDMI 1 Set - ON
  kind: action
  hex: "BE EF 03 06 00 EF C3 01 00 53 30 01 00"
  params: []

- id: frame_lock_hdmi1_get
  label: Frame Lock HDMI 1 Get
  kind: query
  hex: "BE EF 03 06 00 4C C2 02 00 53 30 00 00"
  params: []

- id: frame_lock_hdmi2_set_off
  label: Frame Lock HDMI 2 Set - OFF
  kind: action
  hex: "BE EF 03 06 00 97 C0 01 00 5D 30 00 00"
  params: []

- id: frame_lock_hdmi2_set_on
  label: Frame Lock HDMI 2 Set - ON
  kind: action
  hex: "BE EF 03 06 00 07 C1 01 00 5D 30 01 00"
  params: []

- id: frame_lock_hdmi2_get
  label: Frame Lock HDMI 2 Get
  kind: query
  hex: "BE EF 03 06 00 A4 C0 02 00 5D 30 00 00"
  params: []

- id: frame_lock_hdbaset_set_off
  label: Frame Lock HDBaseT Set - OFF
  kind: action
  hex: "BE EF 03 06 00 C2 EB 01 00 D1 20 00 00"
  params: []

- id: frame_lock_hdbaset_set_on
  label: Frame Lock HDBaseT Set - ON
  kind: action
  hex: "BE EF 03 06 00 52 EA 01 00 D1 20 01 00"
  params: []

- id: frame_lock_hdbaset_get
  label: Frame Lock HDBaseT Get
  kind: query
  hex: "BE EF 03 06 00 F1 EB 02 00 D1 20 00 00"
  params: []

- id: frame_lock_3gsdi_set_off
  label: Frame Lock 3G-SDI Set - OFF (LWU900-DS/LHD878-DS only)
  kind: action
  hex: "BE EF 03 06 00 C2 E4 01 00 E1 20 00 00"
  params: []

- id: frame_lock_3gsdi_set_on
  label: Frame Lock 3G-SDI Set - ON (LWU900-DS/LHD878-DS only)
  kind: action
  hex: "BE EF 03 06 00 52 E5 01 00 E1 20 01 00"
  params: []

- id: frame_lock_3gsdi_get
  label: Frame Lock 3G-SDI Get (LWU900-DS/LHD878-DS only)
  kind: query
  hex: "BE EF 03 06 00 F1 E4 02 00 E1 20 00 00"
  params: []

- id: frame_lock_dp_set_off
  label: Frame Lock DisplayPort Set - OFF
  kind: action
  hex: "BE EF 03 06 00 02 E0 01 00 F1 20 00 00"
  params: []

- id: frame_lock_dp_set_on
  label: Frame Lock DisplayPort Set - ON
  kind: action
  hex: "BE EF 03 06 00 92 E1 01 00 F1 20 01 00"
  params: []

- id: frame_lock_dp_get
  label: Frame Lock DisplayPort Get
  kind: query
  hex: "BE EF 03 06 00 31 E0 02 00 F1 20 00 00"
  params: []

- id: picture_position_v_set_top
  label: Picture Position V Set - TOP
  kind: action
  hex: "BE EF 03 06 00 02 D0 01 00 09 20 02 00"
  params: []

- id: picture_position_v_set_middle
  label: Picture Position V Set - MIDDLE
  kind: action
  hex: "BE EF 03 06 00 62 D1 01 00 09 20 00 00"
  params: []

- id: picture_position_v_set_bottom
  label: Picture Position V Set - BOTTOM
  kind: action
  hex: "BE EF 03 06 00 F2 D0 01 00 09 20 01 00"
  params: []

- id: picture_position_v_get
  label: Picture Position V Get
  kind: query
  hex: "BE EF 03 06 00 51 D1 02 00 09 20 00 00"
  params: []

- id: picture_position_h_set_right
  label: Picture Position H Set - RIGHT
  kind: action
  hex: "BE EF 03 06 00 46 D5 01 00 1E 20 01 00"
  params: []

- id: picture_position_h_set_middle
  label: Picture Position H Set - MIDDLE
  kind: action
  hex: "BE EF 03 06 00 D6 D4 01 00 1E 20 00 00"
  params: []

- id: picture_position_h_set_left
  label: Picture Position H Set - LEFT
  kind: action
  hex: "BE EF 03 06 00 B6 D5 01 00 1E 20 02 00"
  params: []

- id: picture_position_h_get
  label: Picture Position H Get
  kind: query
  hex: "BE EF 03 06 00 E5 D4 02 00 1E 20 00 00"
  params: []

- id: geometric_mode_set_keystone
  label: Geometric Mode Set - KEYSTONE
  kind: action
  hex: "BE EF 03 06 00 6B 8C 01 00 30 31 01 00"
  params: []

- id: geometric_mode_set_3d_keystone
  label: Geometric Mode Set - 3D KEYSTONE
  kind: action
  hex: "BE EF 03 06 00 9B 8C 01 00 30 31 02 00"
  params: []

- id: geometric_mode_set_warping
  label: Geometric Mode Set - WARPING
  kind: action
  hex: "BE EF 03 06 00 3B 8F 01 00 30 31 04 00"
  params: []

- id: geometric_mode_get
  label: Geometric Mode Get
  kind: query
  hex: "BE EF 03 06 00 C8 8D 02 00 30 31 00 00"
  params: []

- id: keystone_v_get
  label: Keystone V Get
  kind: query
  hex: "BE EF 03 06 00 B9 D3 02 00 07 20 00 00"
  params: []

- id: keystone_v_increment
  label: Keystone V Increment
  kind: action
  hex: "BE EF 03 06 00 DF D3 04 00 07 20 00 00"
  params: []

- id: keystone_v_decrement
  label: Keystone V Decrement
  kind: action
  hex: "BE EF 03 06 00 0E D2 05 00 07 20 00 00"
  params: []

- id: keystone_v_reset
  label: Keystone V Reset Execute
  kind: action
  hex: "BE EF 03 06 00 08 D0 06 00 0C 70 00 00"
  params: []

- id: keystone_h_get
  label: Keystone H Get
  kind: query
  hex: "BE EF 03 06 00 E9 D0 02 00 0B 20 00 00"
  params: []

- id: keystone_h_increment
  label: Keystone H Increment
  kind: action
  hex: "BE EF 03 06 00 8F D0 04 00 0B 20 00 00"
  params: []

- id: keystone_h_decrement
  label: Keystone H Decrement
  kind: action
  hex: "BE EF 03 06 00 5E D1 05 00 0B 20 00 00"
  params: []

- id: keystone_h_reset
  label: Keystone H Reset Execute
  kind: action
  hex: "BE EF 03 06 00 98 D8 06 00 20 70 00 00"
  params: []

- id: kd3_left_top_h_get
  label: 3D Keystone Left Top H Get
  kind: query
  hex: "BE EF 03 06 00 31 89 02 00 21 21 00 00"
  params: []

- id: kd3_left_top_h_increment
  label: 3D Keystone Left Top H Increment
  kind: action
  hex: "BE EF 03 06 00 57 89 04 00 21 21 00 00"
  params: []

- id: kd3_left_top_h_decrement
  label: 3D Keystone Left Top H Decrement
  kind: action
  hex: "BE EF 03 06 00 86 88 05 00 21 21 00 00"
  params: []

- id: kd3_left_top_v_get
  label: 3D Keystone Left Top V Get
  kind: query
  hex: "BE EF 03 06 00 75 89 02 00 22 21 00 00"
  params: []

- id: kd3_left_top_v_increment
  label: 3D Keystone Left Top V Increment
  kind: action
  hex: "BE EF 03 06 00 13 89 04 00 22 21 00 00"
  params: []

- id: kd3_left_top_v_decrement
  label: 3D Keystone Left Top V Decrement
  kind: action
  hex: "BE EF 03 06 00 C2 88 05 00 22 21 00 00"
  params: []

- id: kd3_right_top_h_get
  label: 3D Keystone Right Top H Get
  kind: query
  hex: "BE EF 03 06 00 89 88 02 00 23 21 00 00"
  params: []

- id: kd3_right_top_h_increment
  label: 3D Keystone Right Top H Increment
  kind: action
  hex: "BE EF 03 06 00 EF 88 04 00 23 21 00 00"
  params: []

- id: kd3_right_top_h_decrement
  label: 3D Keystone Right Top H Decrement
  kind: action
  hex: "BE EF 03 06 00 3E 89 05 00 23 21 00 00"
  params: []

- id: kd3_right_top_v_get
  label: 3D Keystone Right Top V Get
  kind: query
  hex: "BE EF 03 06 00 FD 89 02 00 24 21 00 00"
  params: []

- id: kd3_right_top_v_increment
  label: 3D Keystone Right Top V Increment
  kind: action
  hex: "BE EF 03 06 00 9B 89 04 00 24 21 00 00"
  params: []

- id: kd3_right_top_v_decrement
  label: 3D Keystone Right Top V Decrement
  kind: action
  hex: "BE EF 03 06 00 4A 88 05 00 24 21 00 00"
  params: []

- id: kd3_left_bottom_h_get
  label: 3D Keystone Left Bottom H Get
  kind: query
  hex: "BE EF 03 06 00 01 88 02 00 25 21 00 00"
  params: []

- id: kd3_left_bottom_h_increment
  label: 3D Keystone Left Bottom H Increment
  kind: action
  hex: "BE EF 03 06 00 67 88 04 00 25 21 00 00"
  params: []

- id: kd3_left_bottom_h_decrement
  label: 3D Keystone Left Bottom H Decrement
  kind: action
  hex: "BE EF 03 06 00 B6 89 05 00 25 21 00 00"
  params: []

- id: kd3_left_bottom_v_get
  label: 3D Keystone Left Bottom V Get
  kind: query
  hex: "BE EF 03 06 00 45 88 02 00 26 21 00 00"
  params: []

- id: kd3_left_bottom_v_increment
  label: 3D Keystone Left Bottom V Increment
  kind: action
  hex: "BE EF 03 06 00 23 88 04 00 26 21 00 00"
  params: []

- id: kd3_left_bottom_v_decrement
  label: 3D Keystone Left Bottom V Decrement
  kind: action
  hex: "BE EF 03 06 00 F2 89 05 00 26 21 00 00"
  params: []

- id: kd3_right_bottom_h_get
  label: 3D Keystone Right Bottom H Get
  kind: query
  hex: "BE EF 03 06 00 B9 89 02 00 27 21 00 00"
  params: []

- id: kd3_right_bottom_h_increment
  label: 3D Keystone Right Bottom H Increment
  kind: action
  hex: "BE EF 03 06 00 DF 89 04 00 27 21 00 00"
  params: []

- id: kd3_right_bottom_h_decrement
  label: 3D Keystone Right Bottom H Decrement
  kind: action
  hex: "BE EF 03 06 00 0E 88 05 00 27 21 00 00"
  params: []

- id: kd3_right_bottom_v_get
  label: 3D Keystone Right Bottom V Get
  kind: query
  hex: "BE EF 03 06 00 AD 8A 02 00 28 21 00 00"
  params: []

- id: kd3_right_bottom_v_increment
  label: 3D Keystone Right Bottom V Increment
  kind: action
  hex: "BE EF 03 06 00 CB 8A 04 00 28 21 00 00"
  params: []

- id: kd3_right_bottom_v_decrement
  label: 3D Keystone Right Bottom V Decrement
  kind: action
  hex: "BE EF 03 06 00 1A 8B 05 00 28 21 00 00"
  params: []

- id: kd3_all_corners_reset
  label: 3D Keystone All Corners Reset Execute
  kind: action
  hex: "BE EF 03 06 00 D5 8A 06 00 29 21 00 00"
  params: []

- id: kd3_left_side_distortion_get
  label: 3D Keystone Left Side Distortion Get
  kind: query
  hex: "BE EF 03 06 00 31 97 02 00 41 21 00 00"
  params: []

- id: kd3_left_side_distortion_increment
  label: 3D Keystone Left Side Distortion Increment
  kind: action
  hex: "BE EF 03 06 00 57 97 04 00 41 21 00 00"
  params: []

- id: kd3_left_side_distortion_decrement
  label: 3D Keystone Left Side Distortion Decrement
  kind: action
  hex: "BE EF 03 06 00 86 96 05 00 41 21 00 00"
  params: []

- id: kd3_right_side_distortion_get
  label: 3D Keystone Right Side Distortion Get
  kind: query
  hex: "BE EF 03 06 00 75 97 02 00 42 21 00 00"
  params: []

- id: kd3_right_side_distortion_increment
  label: 3D Keystone Right Side Distortion Increment
  kind: action
  hex: "BE EF 03 06 00 13 97 04 00 42 21 00 00"
  params: []

- id: kd3_right_side_distortion_decrement
  label: 3D Keystone Right Side Distortion Decrement
  kind: action
  hex: "BE EF 03 06 00 C2 96 05 00 42 21 00 00"
  params: []

- id: kd3_top_side_distortion_get
  label: 3D Keystone Top Side Distortion Get
  kind: query
  hex: "BE EF 03 06 00 FD 97 02 00 44 21 00 00"
  params: []

- id: kd3_top_side_distortion_increment
  label: 3D Keystone Top Side Distortion Increment
  kind: action
  hex: "BE EF 03 06 00 9B 97 04 00 44 21 00 00"
  params: []

- id: kd3_top_side_distortion_decrement
  label: 3D Keystone Top Side Distortion Decrement
  kind: action
  hex: "BE EF 03 06 00 4A 96 05 00 44 21 00 00"
  params: []

- id: kd3_bottom_side_distortion_get
  label: 3D Keystone Bottom Side Distortion Get
  kind: query
  hex: "BE EF 03 06 00 01 96 02 00 45 21 00 00"
  params: []

- id: kd3_bottom_side_distortion_increment
  label: 3D Keystone Bottom Side Distortion Increment
  kind: action
  hex: "BE EF 03 06 00 67 96 04 00 45 21 00 00"
  params: []

- id: kd3_bottom_side_distortion_decrement
  label: 3D Keystone Bottom Side Distortion Decrement
  kind: action
  hex: "BE EF 03 06 00 B6 97 05 00 45 21 00 00"
  params: []

- id: kd3_all_sides_reset
  label: 3D Keystone All Sides Reset Execute
  kind: action
  hex: "BE EF 03 06 00 3D 96 06 00 47 21 00 00"
  params: []

- id: kd3_memory_save_1
  label: 3D Keystone Memory Save 1 Execute
  kind: action
  hex: "BE EF 03 06 00 29 95 06 00 48 21 00 00"
  params: []

- id: kd3_memory_save_2
  label: 3D Keystone Memory Save 2 Execute
  kind: action
  hex: "BE EF 03 06 00 D5 94 06 00 49 21 00 00"
  params: []

- id: kd3_memory_save_3
  label: 3D Keystone Memory Save 3 Execute
  kind: action
  hex: "BE EF 03 06 00 91 94 06 00 4A 21 00 00"
  params: []

- id: kd3_memory_load_1
  label: 3D Keystone Memory Load 1 Execute
  kind: action
  hex: "BE EF 03 06 00 6D 95 06 00 4B 21 00 00"
  params: []

- id: kd3_memory_load_2
  label: 3D Keystone Memory Load 2 Execute
  kind: action
  hex: "BE EF 03 06 00 19 94 06 00 4C 21 00 00"
  params: []

- id: kd3_memory_load_3
  label: 3D Keystone Memory Load 3 Execute
  kind: action
  hex: "BE EF 03 06 00 E5 95 06 00 4D 21 00 00"
  params: []

- id: edge_blending_mode_set_off
  label: Edge Blending Mode Set - OFF
  kind: action
  hex: "BE EF 03 06 00 6B 94 01 00 4C 31 00 00"
  params: []

- id: edge_blending_mode_set_manual
  label: Edge Blending Mode Set - MANUAL
  kind: action
  hex: "BE EF 03 06 00 FB 95 01 00 4C 31 01 00"
  params: []

- id: edge_blending_mode_set_camera
  label: Edge Blending Mode Set - CAMERA
  kind: action
  hex: "BE EF 03 06 00 0B 95 01 00 4C 31 02 00"
  params: []

- id: edge_blending_mode_get
  label: Edge Blending Mode Get
  kind: query
  hex: "BE EF 03 06 00 58 94 02 00 4C 31 00 00"
  params: []

- id: edge_blending_region_reset
  label: Edge Blending Region Reset Execute
  kind: action
  hex: "BE EF 03 06 00 8C 96 06 00 40 31 00 00"
  params: []

- id: edge_blending_level_get
  label: Edge Blending Level Get
  kind: query
  hex: "BE EF 03 06 00 F4 96 02 00 41 31 00 00"
  params: []

- id: edge_blending_level_increment
  label: Edge Blending Level Increment
  kind: action
  hex: "BE EF 03 06 00 92 96 04 00 41 31 00 00"
  params: []

- id: edge_blending_level_decrement
  label: Edge Blending Level Decrement
  kind: action
  hex: "BE EF 03 06 00 43 97 05 00 41 31 00 00"
  params: []

- id: edge_blending_left_get
  label: Edge Blending Left Get
  kind: query
  hex: "BE EF 03 06 00 68 95 02 00 48 31 00 00"
  params: []

- id: edge_blending_left_increment
  label: Edge Blending Left Increment
  kind: action
  hex: "BE EF 03 06 00 0E 95 04 00 48 31 00 00"
  params: []

- id: edge_blending_left_decrement
  label: Edge Blending Left Decrement
  kind: action
  hex: "BE EF 03 06 00 DF 94 05 00 48 31 00 00"
  params: []

- id: edge_blending_right_get
  label: Edge Blending Right Get
  kind: query
  hex: "BE EF 03 06 00 94 94 02 00 49 31 00 00"
  params: []

- id: edge_blending_right_increment
  label: Edge Blending Right Increment
  kind: action
  hex: "BE EF 03 06 00 F2 94 04 00 49 31 00 00"
  params: []

- id: edge_blending_right_decrement
  label: Edge Blending Right Decrement
  kind: action
  hex: "BE EF 03 06 00 23 95 05 00 49 31 00 00"
  params: []

- id: edge_blending_top_get
  label: Edge Blending Top Get
  kind: query
  hex: "BE EF 03 06 00 D0 94 02 00 4A 31 00 00"
  params: []

- id: edge_blending_top_increment
  label: Edge Blending Top Increment
  kind: action
  hex: "BE EF 03 06 00 B6 94 04 00 4A 31 00 00"
  params: []

- id: edge_blending_top_decrement
  label: Edge Blending Top Decrement
  kind: action
  hex: "BE EF 03 06 00 67 95 05 00 4A 31 00 00"
  params: []

- id: edge_blending_bottom_get
  label: Edge Blending Bottom Get
  kind: query
  hex: "BE EF 03 06 00 2C 95 02 00 4B 31 00 00"
  params: []

- id: edge_blending_bottom_increment
  label: Edge Blending Bottom Increment
  kind: action
  hex: "BE EF 03 06 00 4A 95 04 00 4B 31 00 00"
  params: []

- id: edge_blending_bottom_decrement
  label: Edge Blending Bottom Decrement
  kind: action
  hex: "BE EF 03 06 00 9B 94 05 00 4B 31 00 00"
  params: []

- id: cropping_mode_set_off
  label: Cropping Mode Set - OFF
  kind: action
  hex: "BE EF 03 06 00 FB 93 01 00 50 31 00 00"
  params: []

- id: cropping_mode_set_on
  label: Cropping Mode Set - ON
  kind: action
  hex: "BE EF 03 06 00 6B 92 01 00 50 31 01 00"
  params: []

- id: cropping_mode_get
  label: Cropping Mode Get
  kind: query
  hex: "BE EF 03 06 00 C8 93 02 00 50 31 00 00"
  params: []

- id: cropping_x_get
  label: Cropping Setup X Get
  kind: query
  hex: "BE EF 03 06 00 A8 91 02 00 58 31 00 00"
  params: []

- id: cropping_x_increment
  label: Cropping Setup X Increment
  kind: action
  hex: "BE EF 03 06 00 CE 91 04 00 58 31 00 00"
  params: []

- id: cropping_x_decrement
  label: Cropping Setup X Decrement
  kind: action
  hex: "BE EF 03 06 00 1F 90 05 00 58 31 00 00"
  params: []

- id: cropping_y_get
  label: Cropping Setup Y Get
  kind: query
  hex: "BE EF 03 06 00 54 90 02 00 59 31 00 00"
  params: []

- id: cropping_y_increment
  label: Cropping Setup Y Increment
  kind: action
  hex: "BE EF 03 06 00 32 90 04 00 59 31 00 00"
  params: []

- id: cropping_y_decrement
  label: Cropping Setup Y Decrement
  kind: action
  hex: "BE EF 03 06 00 E3 91 05 00 59 31 00 00"
  params: []

- id: cropping_w_get
  label: Cropping Setup W Get
  kind: query
  hex: "BE EF 03 06 00 10 90 02 00 5A 31 00 00"
  params: []

- id: cropping_w_increment
  label: Cropping Setup W Increment
  kind: action
  hex: "BE EF 03 06 00 76 90 04 00 5A 31 00 00"
  params: []

- id: cropping_w_decrement
  label: Cropping Setup W Decrement
  kind: action
  hex: "BE EF 03 06 00 A7 91 05 00 5A 31 00 00"
  params: []

- id: cropping_h_get
  label: Cropping Setup H Get
  kind: query
  hex: "BE EF 03 06 00 EC 91 02 00 5B 31 00 00"
  params: []

- id: cropping_h_increment
  label: Cropping Setup H Increment
  kind: action
  hex: "BE EF 03 06 00 8A 91 04 00 5B 31 00 00"
  params: []

- id: cropping_h_decrement
  label: Cropping Setup H Decrement
  kind: action
  hex: "BE EF 03 06 00 5B 90 05 00 5B 31 00 00"
  params: []

- id: cropping_apply
  label: Cropping Apply Execute
  kind: action
  hex: "BE EF 03 06 00 B0 93 06 00 51 31 00 00"
  params: []

- id: cropping_reset
  label: Cropping Reset Execute
  kind: action
  hex: "BE EF 03 06 00 F4 93 06 00 52 31 00 00"
  params: []

- id: warping_mode_set_off
  label: Warping Mode Set - OFF
  kind: action
  hex: "BE EF 03 06 00 FB 9C 01 00 60 31 00 00"
  params: []

- id: warping_mode_set_mode1
  label: Warping Mode Set - MODE-1
  kind: action
  hex: "BE EF 03 06 00 6B 9D 01 00 60 31 01 00"
  params: []

- id: warping_mode_set_mode2
  label: Warping Mode Set - MODE-2
  kind: action
  hex: "BE EF 03 06 00 9B 9D 01 00 60 31 02 00"
  params: []

- id: warping_mode_set_mode3
  label: Warping Mode Set - MODE-3
  kind: action
  hex: "BE EF 03 06 00 0B 9C 01 00 60 31 03 00"
  params: []

- id: warping_mode_get
  label: Warping Mode Get
  kind: query
  hex: "BE EF 03 06 00 C8 9C 02 00 60 31 00 00"
  params: []

- id: wb_offset_r_get
  label: White Balance Offset R Get
  kind: query
  hex: "BE EF 03 06 00 0C 72 02 00 50 27 00 00"
  params: []

- id: wb_offset_r_increment
  label: White Balance Offset R Increment
  kind: action
  hex: "BE EF 03 06 00 6A 72 04 00 50 27 00 00"
  params: []

- id: wb_offset_r_decrement
  label: White Balance Offset R Decrement
  kind: action
  hex: "BE EF 03 06 00 BB 73 05 00 50 27 00 00"
  params: []

- id: wb_offset_r_reset
  label: White Balance Offset R Reset Execute
  kind: action
  hex: "BE EF 03 06 00 38 E2 06 00 F8 70 00 00"
  params: []

- id: wb_offset_g_get
  label: White Balance Offset G Get
  kind: query
  hex: "BE EF 03 06 00 F0 73 02 00 51 27 00 00"
  params: []

- id: wb_offset_g_increment
  label: White Balance Offset G Increment
  kind: action
  hex: "BE EF 03 06 00 96 73 04 00 51 27 00 00"
  params: []

- id: wb_offset_g_decrement
  label: White Balance Offset G Decrement
  kind: action
  hex: "BE EF 03 06 00 47 72 05 00 51 27 00 00"
  params: []

- id: wb_offset_g_reset
  label: White Balance Offset G Reset Execute
  kind: action
  hex: "BE EF 03 06 00 C4 E3 06 00 F9 70 00 00"
  params: []

- id: wb_offset_b_get
  label: White Balance Offset B Get
  kind: query
  hex: "BE EF 03 06 00 B4 73 02 00 52 27 00 00"
  params: []

- id: wb_offset_b_increment
  label: White Balance Offset B Increment
  kind: action
  hex: "BE EF 03 06 00 D2 73 04 00 52 27 00 00"
  params: []

- id: wb_offset_b_decrement
  label: White Balance Offset B Decrement
  kind: action
  hex: "BE EF 03 06 00 03 72 05 00 52 27 00 00"
  params: []

- id: wb_offset_b_reset
  label: White Balance Offset B Reset Execute
  kind: action
  hex: "BE EF 03 06 00 80 E3 06 00 FA 70 00 00"
  params: []

- id: wb_gain_r_get
  label: White Balance Gain R Get
  kind: query
  hex: "BE EF 03 06 00 3C 73 02 00 54 27 00 00"
  params: []

- id: wb_gain_r_increment
  label: White Balance Gain R Increment
  kind: action
  hex: "BE EF 03 06 00 5A 73 04 00 54 27 00 00"
  params: []

- id: wb_gain_r_decrement
  label: White Balance Gain R Decrement
  kind: action
  hex: "BE EF 03 06 00 8B 72 05 00 54 27 00 00"
  params: []

- id: wb_gain_r_reset
  label: White Balance Gain R Reset Execute
  kind: action
  hex: "BE EF 03 06 00 08 E3 06 00 FC 70 00 00"
  params: []

- id: wb_gain_g_get
  label: White Balance Gain G Get
  kind: query
  hex: "BE EF 03 06 00 C0 72 02 00 55 27 00 00"
  params: []

- id: wb_gain_g_increment
  label: White Balance Gain G Increment
  kind: action
  hex: "BE EF 03 06 00 A6 72 04 00 55 27 00 00"
  params: []

- id: wb_gain_g_decrement
  label: White Balance Gain G Decrement
  kind: action
  hex: "BE EF 03 06 00 77 73 05 00 55 27 00 00"
  params: []

- id: wb_gain_g_reset
  label: White Balance Gain G Reset Execute
  kind: action
  hex: "BE EF 03 06 00 F4 E2 06 00 FD 70 00 00"
  params: []

- id: wb_gain_b_get
  label: White Balance Gain B Get
  kind: query
  hex: "BE EF 03 06 00 84 72 02 00 56 27 00 00"
  params: []

- id: wb_gain_b_increment
  label: White Balance Gain B Increment
  kind: action
  hex: "BE EF 03 06 00 E2 72 04 00 56 27 00 00"
  params: []

- id: wb_gain_b_decrement
  label: White Balance Gain B Decrement
  kind: action
  hex: "BE EF 03 06 00 33 73 05 00 56 27 00 00"
  params: []

- id: wb_gain_b_reset
  label: White Balance Gain B Reset Execute
  kind: action
  hex: "BE EF 03 06 00 B0 E2 06 00 FE 70 00 00"
  params: []

- id: black_level_r_get
  label: Black Level R Get
  kind: query
  hex: "BE EF 03 06 00 CC 76 02 00 40 27 00 00"
  params: []

- id: black_level_r_increment
  label: Black Level R Increment
  kind: action
  hex: "BE EF 03 06 00 AA 76 04 00 40 27 00 00"
  params: []

- id: black_level_r_decrement
  label: Black Level R Decrement
  kind: action
  hex: "BE EF 03 06 00 7B 77 05 00 40 27 00 00"
  params: []

- id: black_level_r_reset
  label: Black Level R Reset Execute
  kind: action
  hex: "BE EF 03 06 00 68 E1 06 00 F4 70 00 00"
  params: []

- id: black_level_g_get
  label: Black Level G Get
  kind: query
  hex: "BE EF 03 06 00 30 77 02 00 41 27 00 00"
  params: []

- id: black_level_g_increment
  label: Black Level G Increment
  kind: action
  hex: "BE EF 03 06 00 56 77 04 00 41 27 00 00"
  params: []

- id: black_level_g_decrement
  label: Black Level G Decrement
  kind: action
  hex: "BE EF 03 06 00 87 76 05 00 41 27 00 00"
  params: []

- id: black_level_g_reset
  label: Black Level G Reset Execute
  kind: action
  hex: "BE EF 03 06 00 94 E0 06 00 F5 70 00 00"
  params: []

- id: black_level_b_get
  label: Black Level B Get
  kind: query
  hex: "BE EF 03 06 00 74 77 02 00 42 27 00 00"
  params: []

- id: black_level_b_increment
  label: Black Level B Increment
  kind: action
  hex: "BE EF 03 06 00 12 77 04 00 42 27 00 00"
  params: []

- id: black_level_b_decrement
  label: Black Level B Decrement
  kind: action
  hex: "BE EF 03 06 00 C3 76 05 00 42 27 00 00"
  params: []

- id: black_level_b_reset
  label: Black Level B Reset Execute
  kind: action
  hex: "BE EF 03 06 00 D0 E0 06 00 F6 70 00 00"
  params: []

- id: black_level_w_get
  label: Black Level W Get
  kind: query
  hex: "BE EF 03 06 00 88 76 02 00 43 27 00 00"
  params: []

- id: black_level_w_increment
  label: Black Level W Increment
  kind: action
  hex: "BE EF 03 06 00 EE 76 04 00 43 27 00 00"
  params: []

- id: black_level_w_decrement
  label: Black Level W Decrement
  kind: action
  hex: "BE EF 03 06 00 3F 77 05 00 43 27 00 00"
  params: []

- id: black_level_w_reset
  label: Black Level W Reset Execute
  kind: action
  hex: "BE EF 03 06 00 2C E1 06 00 F7 70 00 00"
  params: []

- id: light_output_set_normal
  label: Light Output Set - NORMAL
  kind: action
  hex: "BE EF 03 06 00 3B 37 01 00 00 33 30 00"
  params: []

- id: light_output_set_quiet_mode
  label: Light Output Set - QUIET MODE
  kind: action
  hex: "BE EF 03 06 00 AB 22 01 00 00 33 01 00"
  params: []

- id: light_output_set_75pct
  label: Light Output Set - LIGHT 75%
  kind: action
  hex: "BE EF 03 06 00 6B 20 01 00 00 33 05 00"
  params: []

- id: light_output_set_50pct
  label: Light Output Set - LIGHT 50%
  kind: action
  hex: "BE EF 03 06 00 9B 20 01 00 00 33 06 00"
  params: []

- id: light_output_get
  label: Light Output Get
  kind: query
  hex: "BE EF 03 06 00 08 23 02 00 00 33 00 00"
  params: []

- id: light_output_normal_power_get
  label: Light Output Normal Power Get
  kind: query
  hex: "BE EF 03 06 00 C4 23 02 00 05 33 00 00"
  params: []

- id: light_output_normal_power_increment
  label: Light Output Normal Power Increment
  kind: action
  hex: "BE EF 03 06 00 A2 23 04 00 05 33 00 00"
  params: []

- id: light_output_normal_power_decrement
  label: Light Output Normal Power Decrement
  kind: action
  hex: "BE EF 03 06 00 73 22 05 00 05 33 00 00"
  params: []

- id: installation_set_front_desktop
  label: Installation Set - FRONT/DESKTOP
  kind: action
  hex: "BE EF 03 06 00 C7 D2 01 00 01 30 00 00"
  params: []

- id: installation_set_rear_desktop
  label: Installation Set - REAR/DESKTOP
  kind: action
  hex: "BE EF 03 06 00 57 D3 01 00 01 30 01 00"
  params: []

- id: installation_set_rear_ceiling
  label: Installation Set - REAR/CEILING
  kind: action
  hex: "BE EF 03 06 00 A7 D3 01 00 01 30 02 00"
  params: []

- id: installation_set_front_ceiling
  label: Installation Set - FRONT/CEILING
  kind: action
  hex: "BE EF 03 06 00 37 D2 01 00 01 30 03 00"
  params: []

- id: installation_get
  label: Installation Get
  kind: query
  hex: "BE EF 03 06 00 F4 D2 02 00 01 30 00 00"
  params: []

- id: standby_mode_set_quick_start
  label: Standby Mode Set - QUICK START
  kind: action
  hex: "BE EF 03 06 00 16 DF 01 00 01 60 10 00"
  params: []

- id: standby_mode_set_normal
  label: Standby Mode Set - NORMAL
  kind: action
  hex: "BE EF 03 06 00 D6 D2 01 00 01 60 00 00"
  params: []

- id: standby_mode_set_network_wol
  label: Standby Mode Set - NETWORK-WOL
  kind: action
  hex: "BE EF 03 06 00 B6 D3 01 00 01 60 02 00"
  params: []

- id: standby_mode_set_power_save
  label: Standby Mode Set - POWER SAVE
  kind: action
  hex: "BE EF 03 06 00 46 D3 01 00 01 60 01 00"
  params: []

- id: standby_mode_get
  label: Standby Mode Get
  kind: query
  hex: "BE EF 03 06 00 E5 D2 02 00 01 60 00 00"
  params: []

- id: color_uniformity_level_set_1
  label: Color Uniformity Level Set - 1
  kind: action
  hex: "BE EF 03 06 00 AF 6D 01 00 30 27 01 00"
  params: []

- id: color_uniformity_level_set_2
  label: Color Uniformity Level Set - 2
  kind: action
  hex: "BE EF 03 06 00 5F 6D 01 00 30 27 02 00"
  params: []

- id: color_uniformity_level_set_3
  label: Color Uniformity Level Set - 3
  kind: action
  hex: "BE EF 03 06 00 CF 6C 01 00 30 27 03 00"
  params: []

- id: color_uniformity_level_set_4
  label: Color Uniformity Level Set - 4
  kind: action
  hex: "BE EF 03 06 00 FF 6E 01 00 30 27 04 00"
  params: []

- id: color_uniformity_level_get
  label: Color Uniformity Level Get
  kind: query
  hex: "BE EF 03 06 00 0C 6C 02 00 30 27 00 00"
  params: []

- id: color_uniformity_r_get
  label: Color Uniformity R Get
  kind: query
  hex: "BE EF 03 06 00 B4 6D 02 00 32 27 00 00"
  params: []

- id: color_uniformity_r_increment
  label: Color Uniformity R Increment
  kind: action
  hex: "BE EF 03 06 00 D2 6D 04 00 32 27 00 00"
  params: []

- id: color_uniformity_r_decrement
  label: Color Uniformity R Decrement
  kind: action
  hex: "BE EF 03 06 00 03 6C 05 00 32 27 00 00"
  params: []

- id: color_uniformity_r_reset
  label: Color Uniformity R Reset Execute
  kind: action
  hex: "BE EF 03 06 00 58 E0 06 00 F0 70 00 00"
  params: []

- id: color_uniformity_g_get
  label: Color Uniformity G Get
  kind: query
  hex: "BE EF 03 06 00 48 6C 02 00 33 27 00 00"
  params: []

- id: color_uniformity_g_increment
  label: Color Uniformity G Increment
  kind: action
  hex: "BE EF 03 06 00 2E 6C 04 00 33 27 00 00"
  params: []

- id: color_uniformity_g_decrement
  label: Color Uniformity G Decrement
  kind: action
  hex: "BE EF 03 06 00 FF 6D 05 00 33 27 00 00"
  params: []

- id: color_uniformity_g_reset
  label: Color Uniformity G Reset Execute
  kind: action
  hex: "BE EF 03 06 00 A4 E1 06 00 F1 70 00 00"
  params: []

- id: color_uniformity_b_get
  label: Color Uniformity B Get
  kind: query
  hex: "BE EF 03 06 00 3C 6D 02 00 34 27 00 00"
  params: []

- id: color_uniformity_b_increment
  label: Color Uniformity B Increment
  kind: action
  hex: "BE EF 03 06 00 5A 6D 04 00 34 27 00 00"
  params: []

- id: color_uniformity_b_decrement
  label: Color Uniformity B Decrement
  kind: action
  hex: "BE EF 03 06 00 8B 6C 05 00 34 27 00 00"
  params: []

- id: color_uniformity_b_reset
  label: Color Uniformity B Reset Execute
  kind: action
  hex: "BE EF 03 06 00 E0 E1 06 00 F2 70 00 00"
  params: []

- id: color_uniformity_all_reset
  label: Color Uniformity All Reset Execute
  kind: action
  hex: "BE EF 03 06 00 1C E0 06 00 F3 70 00 00"
  params: []

- id: color_uniformity_pattern_set_off
  label: Color Uniformity Pattern Set - OFF
  kind: action
  hex: "BE EF 03 06 00 B7 6C 01 00 36 27 00 00"
  params: []

- id: color_uniformity_pattern_set_on
  label: Color Uniformity Pattern Set - ON
  kind: action
  hex: "BE EF 03 06 00 27 6D 01 00 36 27 01 00"
  params: []

- id: color_uniformity_pattern_get
  label: Color Uniformity Pattern Get
  kind: query
  hex: "BE EF 03 06 00 84 6C 02 00 36 27 00 00"
  params: []

- id: volume_computer_in_get
  label: Volume Computer In Get
  kind: query
  hex: "BE EF 03 06 00 CD CC 02 00 60 20 00 00"
  params: []

- id: volume_computer_in_increment
  label: Volume Computer In Increment
  kind: action
  hex: "BE EF 03 06 00 AB CC 04 00 60 20 00 00"
  params: []

- id: volume_computer_in_decrement
  label: Volume Computer In Decrement
  kind: action
  hex: "BE EF 03 06 00 7A CD 05 00 60 20 00 00"
  params: []

- id: volume_lan_get
  label: Volume LAN Get
  kind: query
  hex: "BE EF 03 06 00 E9 CE 02 00 6B 20 00 00"
  params: []

- id: volume_lan_increment
  label: Volume LAN Increment
  kind: action
  hex: "BE EF 03 06 00 8F CE 04 00 6B 20 00 00"
  params: []

- id: volume_lan_decrement
  label: Volume LAN Decrement
  kind: action
  hex: "BE EF 03 06 00 5E CF 05 00 6B 20 00 00"
  params: []

- id: volume_hdmi1_get
  label: Volume HDMI 1 Get
  kind: query
  hex: "BE EF 03 06 00 89 CC 02 00 63 20 00 00"
  params: []

- id: volume_hdmi1_increment
  label: Volume HDMI 1 Increment
  kind: action
  hex: "BE EF 03 06 00 EF CC 04 00 63 20 00 00"
  params: []

- id: volume_hdmi1_decrement
  label: Volume HDMI 1 Decrement
  kind: action
  hex: "BE EF 03 06 00 3E CD 05 00 63 20 00 00"
  params: []

- id: volume_hdmi2_get
  label: Volume HDMI 2 Get
  kind: query
  hex: "BE EF 03 06 00 61 CE 02 00 6D 20 00 00"
  params: []

- id: volume_hdmi2_increment
  label: Volume HDMI 2 Increment
  kind: action
  hex: "BE EF 03 06 00 07 CE 04 00 6D 20 00 00"
  params: []

- id: volume_hdmi2_decrement
  label: Volume HDMI 2 Decrement
  kind: action
  hex: "BE EF 03 06 00 D6 CF 05 00 6D 20 00 00"
  params: []

- id: volume_hdbaset_get
  label: Volume HDBaseT Get
  kind: query
  hex: "BE EF 03 06 00 C1 EA 02 00 D5 20 00 00"
  params: []

- id: volume_hdbaset_increment
  label: Volume HDBaseT Increment
  kind: action
  hex: "BE EF 03 06 00 A7 EA 04 00 D5 20 00 00"
  params: []

- id: volume_hdbaset_decrement
  label: Volume HDBaseT Decrement
  kind: action
  hex: "BE EF 03 06 00 76 EB 05 00 D5 20 00 00"
  params: []

- id: volume_video_get
  label: Volume VIDEO Get
  kind: query
  hex: "BE EF 03 06 00 31 CD 02 00 61 20 00 00"
  params: []

- id: volume_video_increment
  label: Volume VIDEO Increment
  kind: action
  hex: "BE EF 03 06 00 57 CD 04 00 61 20 00 00"
  params: []

- id: volume_video_decrement
  label: Volume VIDEO Decrement
  kind: action
  hex: "BE EF 03 06 00 86 CC 05 00 61 20 00 00"
  params: []

- id: volume_3gsdi_get
  label: Volume 3G-SDI Get (LWU900-DS/LHD878-DS only)
  kind: query
  hex: "BE EF 03 06 00 C1 E5 02 00 E5 20 00 00"
  params: []

- id: volume_3gsdi_increment
  label: Volume 3G-SDI Increment (LWU900-DS/LHD878-DS only)
  kind: action
  hex: "BE EF 03 06 00 A7 E5 04 00 E5 20 00 00"
  params: []

- id: volume_3gsdi_decrement
  label: Volume 3G-SDI Decrement (LWU900-DS/LHD878-DS only)
  kind: action
  hex: "BE EF 03 06 00 76 E4 05 00 E5 20 00 00"
  params: []

- id: volume_dp_get
  label: Volume DisplayPort Get
  kind: query
  hex: "BE EF 03 06 00 01 E1 02 00 F5 20 00 00"
  params: []

- id: volume_dp_increment
  label: Volume DisplayPort Increment
  kind: action
  hex: "BE EF 03 06 00 67 E1 04 00 F5 20 00 00"
  params: []

- id: volume_dp_decrement
  label: Volume DisplayPort Decrement
  kind: action
  hex: "BE EF 03 06 00 B6 E0 05 00 F5 20 00 00"
  params: []

- id: volume_standby_get
  label: Volume Standby Get
  kind: query
  hex: "BE EF 03 06 00 D9 CF 02 00 6F 20 00 00"
  params: []

- id: volume_standby_increment
  label: Volume Standby Increment
  kind: action
  hex: "BE EF 03 06 00 BF CF 04 00 6F 20 00 00"
  params: []

- id: volume_standby_decrement
  label: Volume Standby Decrement
  kind: action
  hex: "BE EF 03 06 00 6E CE 05 00 6F 20 00 00"
  params: []

- id: volume_all_get
  label: Volume All Get
  kind: query
  hex: "BE EF 03 06 00 CD C3 02 00 50 20 00 00"
  params: []

- id: volume_all_increment
  label: Volume All Increment
  kind: action
  hex: "BE EF 03 06 00 AB C3 04 00 50 20 00 00"
  params: []

- id: volume_all_decrement
  label: Volume All Decrement
  kind: action
  hex: "BE EF 03 06 00 7A C2 05 00 50 20 00 00"
  params: []

- id: mute_set_off
  label: Mute Set - OFF
  kind: action
  hex: "BE EF 03 06 00 46 D3 01 00 02 20 00 00"
  params: []

- id: mute_set_on
  label: Mute Set - ON
  kind: action
  hex: "BE EF 03 06 00 D6 D2 01 00 02 20 01 00"
  params: []

- id: mute_get
  label: Mute Get
  kind: query
  hex: "BE EF 03 06 00 75 D3 02 00 02 20 00 00"
  params: []

- id: av_mute_set_off
  label: AV Mute Set - OFF
  kind: action
  hex: "BE EF 03 06 00 FE F0 01 00 A0 20 00 00"
  params: []

- id: av_mute_set_on
  label: AV Mute Set - ON
  kind: action
  hex: "BE EF 03 06 00 6E F1 01 00 A0 20 01 00"
  params: []

- id: av_mute_get
  label: AV Mute Get
  kind: query
  hex: "BE EF 03 06 00 CD F0 02 00 A0 20 00 00"
  params: []

- id: audio_src_computer_in_set_audio_in1
  label: Audio Source Computer In Set - AUDIO IN1
  kind: action
  hex: "BE EF 03 06 00 6E DC 01 00 30 20 01 00"
  params: []

- id: audio_src_computer_in_set_audio_in2
  label: Audio Source Computer In Set - AUDIO IN2
  kind: action
  hex: "BE EF 03 06 00 9E DC 01 00 30 20 02 00"
  params: []

- id: audio_src_computer_in_set_off
  label: Audio Source Computer In Set - OFF
  kind: action
  hex: "BE EF 03 06 00 FE DD 01 00 30 20 00 00"
  params: []

- id: audio_src_computer_in_get
  label: Audio Source Computer In Get
  kind: query
  hex: "BE EF 03 06 00 CD DD 02 00 30 20 00 00"
  params: []

- id: audio_src_hdmi1_set_audio_in1
  label: Audio Source HDMI 1 Set - AUDIO IN1
  kind: action
  hex: "BE EF 03 06 00 2A DC 01 00 33 20 01 00"
  params: []

- id: audio_src_hdmi1_set_audio_in2
  label: Audio Source HDMI 1 Set - AUDIO IN2
  kind: action
  hex: "BE EF 03 06 00 DA DC 01 00 33 20 02 00"
  params: []

- id: audio_src_hdmi1_set_audio_hdmi1
  label: Audio Source HDMI 1 Set - AUDIO HDMI 1
  kind: action
  hex: "BE EF 03 06 00 7A C4 01 00 33 20 20 00"
  params: []

- id: audio_src_hdmi1_set_off
  label: Audio Source HDMI 1 Set - OFF
  kind: action
  hex: "BE EF 03 06 00 BA DD 01 00 33 20 00 00"
  params: []

- id: audio_src_hdmi1_get
  label: Audio Source HDMI 1 Get
  kind: query
  hex: "BE EF 03 06 00 89 DD 02 00 33 20 00 00"
  params: []

- id: audio_src_hdmi2_set_audio_in1
  label: Audio Source HDMI 2 Set - AUDIO IN1
  kind: action
  hex: "BE EF 03 06 00 C2 DE 01 00 3D 20 01 00"
  params: []

- id: audio_src_hdmi2_set_audio_in2
  label: Audio Source HDMI 2 Set - AUDIO IN2
  kind: action
  hex: "BE EF 03 06 00 32 DE 01 00 3D 20 02 00"
  params: []

- id: audio_src_hdmi2_set_audio_hdmi2
  label: Audio Source HDMI 2 Set - AUDIO HDMI 2
  kind: action
  hex: "BE EF 03 06 00 02 C7 01 00 3D 20 21 00"
  params: []

- id: audio_src_hdmi2_set_off
  label: Audio Source HDMI 2 Set - OFF
  kind: action
  hex: "BE EF 03 06 00 52 DF 01 00 3D 20 00 00"
  params: []

- id: audio_src_hdmi2_get
  label: Audio Source HDMI 2 Get
  kind: query
  hex: "BE EF 03 06 00 61 DF 02 00 3D 20 00 00"
  params: []

- id: audio_src_hdbaset_set_audio_in1
  label: Audio Source HDBaseT Set - AUDIO IN1
  kind: action
  hex: "BE EF 03 06 00 9E EA 01 00 D4 20 01 00"
  params: []

- id: audio_src_hdbaset_set_audio_in2
  label: Audio Source HDBaseT Set - AUDIO IN2
  kind: action
  hex: "BE EF 03 06 00 6E EA 01 00 D4 20 02 00"
  params: []

- id: audio_src_hdbaset_set_audio_hdbaset
  label: Audio Source HDBaseT Set - AUDIO HDBaseT
  kind: action
  hex: "BE EF 03 06 00 0E F0 01 00 D4 20 24 00"
  params: []

- id: audio_src_hdbaset_set_off
  label: Audio Source HDBaseT Set - OFF
  kind: action
  hex: "BE EF 03 06 00 0E EB 01 00 D4 20 00 00"
  params: []

- id: audio_src_hdbaset_get
  label: Audio Source HDBaseT Get
  kind: query
  hex: "BE EF 03 06 00 3D EB 02 00 D4 20 00 00"
  params: []

- id: audio_src_video_set_audio_in1
  label: Audio Source VIDEO Set - AUDIO IN1
  kind: action
  hex: "BE EF 03 06 00 92 DD 01 00 31 20 01 00"
  params: []

- id: audio_src_video_set_audio_in2
  label: Audio Source VIDEO Set - AUDIO IN2
  kind: action
  hex: "BE EF 03 06 00 62 DD 01 00 31 20 02 00"
  params: []

- id: audio_src_video_set_off
  label: Audio Source VIDEO Set - OFF
  kind: action
  hex: "BE EF 03 06 00 02 DC 01 00 31 20 00 00"
  params: []

- id: audio_src_video_get
  label: Audio Source VIDEO Get
  kind: query
  hex: "BE EF 03 06 00 31 DC 02 00 31 20 00 00"
  params: []

- id: lan_sound_enable_set_disable
  label: LAN Sound Enable Set - Disable
  kind: action
  hex: "BE EF 03 06 00 BA F0 01 00 A3 20 00 00"
  params: []

- id: lan_sound_enable_set_enable
  label: LAN Sound Enable Set - Enable
  kind: action
  hex: "BE EF 03 06 00 2A F1 01 00 A3 20 01 00"
  params: []

- id: lan_sound_enable_get
  label: LAN Sound Enable Get
  kind: query
  hex: "BE EF 03 06 00 89 F0 02 00 A3 20 00 00"
  params: []

- id: blank_set_myscreen
  label: Blank Set - MyScreen
  kind: action
  hex: "BE EF 03 06 00 FB CA 01 00 00 30 20 00"
  params: []

- id: blank_set_original
  label: Blank Set - ORIGINAL
  kind: action
  hex: "BE EF 03 06 00 FB E2 01 00 00 30 40 00"
  params: []

- id: blank_set_blue
  label: Blank Set - BLUE
  kind: action
  hex: "BE EF 03 06 00 CB D3 01 00 00 30 03 00"
  params: []

- id: blank_set_white
  label: Blank Set - WHITE
  kind: action
  hex: "BE EF 03 06 00 6B D0 01 00 00 30 05 00"
  params: []

- id: blank_set_black
  label: Blank Set - BLACK
  kind: action
  hex: "BE EF 03 06 00 9B D0 01 00 00 30 06 00"
  params: []

- id: blank_get
  label: Blank Get
  kind: query
  hex: "BE EF 03 06 00 08 D3 02 00 00 30 00 00"
  params: []

- id: blank_onoff_set_off
  label: Blank On/Off Set - OFF
  kind: action
  hex: "BE EF 03 06 00 FB D8 01 00 20 30 00 00"
  params: []

- id: blank_onoff_set_on
  label: Blank On/Off Set - ON
  kind: action
  hex: "BE EF 03 06 00 6B D9 01 00 20 30 01 00"
  params: []

- id: blank_onoff_get
  label: Blank On/Off Get
  kind: query
  hex: "BE EF 03 06 00 C8 D8 02 00 20 30 00 00"
  params: []

- id: auto_blank_set_blue
  label: Auto Blank Set - BLUE
  kind: action
  hex: "BE EF 03 06 00 67 D1 01 00 0D 30 03 00"
  params: []

- id: auto_blank_set_white
  label: Auto Blank Set - WHITE
  kind: action
  hex: "BE EF 03 06 00 C7 D2 01 00 0D 30 05 00"
  params: []

- id: auto_blank_set_black
  label: Auto Blank Set - BLACK
  kind: action
  hex: "BE EF 03 06 00 37 D2 01 00 0D 30 06 00"
  params: []

- id: auto_blank_get
  label: Auto Blank Get
  kind: query
  hex: "BE EF 03 06 00 A4 D1 02 00 0D 30 00 00"
  params: []

- id: template_set_test_pattern
  label: Template Set - TEST PATTERN
  kind: action
  hex: "BE EF 03 06 00 43 D9 01 00 22 30 00 00"
  params: []

- id: template_set_dot_line1
  label: Template Set - DOT-LINE 1
  kind: action
  hex: "BE EF 03 06 00 D3 D8 01 00 22 30 01 00"
  params: []

- id: template_set_dot_line2
  label: Template Set - DOT-LINE 2
  kind: action
  hex: "BE EF 03 06 00 23 D8 01 00 22 30 02 00"
  params: []

- id: template_set_dot_line3
  label: Template Set - DOT-LINE 3
  kind: action
  hex: "BE EF 03 06 00 B3 D9 01 00 22 30 03 00"
  params: []

- id: template_set_dot_line4
  label: Template Set - DOT-LINE 4
  kind: action
  hex: "BE EF 03 06 00 83 DB 01 00 22 30 04 00"
  params: []

- id: template_set_stack
  label: Template Set - STACK
  kind: action
  hex: "BE EF 03 06 00 83 C0 01 00 22 30 20 00"
  params: []

- id: template_get
  label: Template Get
  kind: query
  hex: "BE EF 03 06 00 70 D9 02 00 22 30 00 00"
  params: []

- id: template_onoff_set_off
  label: Template On/Off Set - OFF
  kind: action
  hex: "BE EF 03 06 00 BF D8 01 00 23 30 00 00"
  params: []

- id: template_onoff_set_on
  label: Template On/Off Set - ON
  kind: action
  hex: "BE EF 03 06 00 2F D9 01 00 23 30 01 00"
  params: []

- id: template_onoff_get
  label: Template On/Off Get
  kind: query
  hex: "BE EF 03 06 00 8C D8 02 00 23 30 00 00"
  params: []

- id: direct_power_on_set_off
  label: Direct Power On Set - OFF
  kind: action
  hex: "BE EF 03 06 00 3B 89 01 00 20 31 00 00"
  params: []

- id: direct_power_on_set_on
  label: Direct Power On Set - ON
  kind: action
  hex: "BE EF 03 06 00 AB 88 01 00 20 31 01 00"
  params: []

- id: direct_power_on_get
  label: Direct Power On Get
  kind: query
  hex: "BE EF 03 06 00 08 89 02 00 20 31 00 00"
  params: []

- id: auto_power_off_get
  label: Auto Power Off Get
  kind: query
  hex: "BE EF 03 06 00 08 86 02 00 10 31 00 00"
  params: []

- id: auto_power_off_increment
  label: Auto Power Off Increment
  kind: action
  hex: "BE EF 03 06 00 6E 86 04 00 10 31 00 00"
  params: []

- id: auto_power_off_decrement
  label: Auto Power Off Decrement
  kind: action
  hex: "BE EF 03 06 00 BF 87 05 00 10 31 00 00"
  params: []

- id: shutter_timer_set_1h
  label: Shutter Timer Set - 1h
  kind: action
  hex: "BE EF 03 06 00 27 92 01 00 06 24 01 00"
  params: []

- id: shutter_timer_set_3h
  label: Shutter Timer Set - 3h
  kind: action
  hex: "BE EF 03 06 00 47 93 01 00 06 24 03 00"
  params: []

- id: shutter_timer_set_6h
  label: Shutter Timer Set - 6h
  kind: action
  hex: "BE EF 03 06 00 17 90 01 00 06 24 06 00"
  params: []

- id: shutter_timer_get
  label: Shutter Timer Get
  kind: query
  hex: "BE EF 03 06 00 84 93 02 00 06 24 00 00"
  params: []

- id: light_source_hours_lower_get
  label: Light Source Hours Lower Bytes Get
  kind: query
  hex: "BE EF 03 06 00 C2 FF 02 00 90 10 00 00"
  params: []

- id: light_source_hours_higher_get
  label: Light Source Hours Higher Bytes Get
  kind: query
  hex: "BE EF 03 06 00 2A FD 02 00 9E 10 00 00"
  params: []

- id: light_source_hours_reset
  label: Light Source Hours Reset Execute
  kind: action
  hex: "BE EF 03 06 00 58 DC 06 00 30 70 00 00"
  params: []

- id: filter_hours_lower_get
  label: Filter Hours Lower Bytes Get
  kind: query
  hex: "BE EF 03 06 00 C2 F0 02 00 A0 10 00 00"
  params: []

- id: filter_hours_higher_get
  label: Filter Hours Higher Bytes Get
  kind: query
  hex: "BE EF 03 06 00 D6 FC 02 00 9F 10 00 00"
  params: []

- id: filter_hours_reset
  label: Filter Hours Reset Execute
  kind: action
  hex: "BE EF 03 06 00 98 C6 06 00 40 70 00 00"
  params: []

- id: remote_recv_front_set_off
  label: Remote Receiver Front Set - Off
  kind: action
  hex: "BE EF 03 06 00 FF 32 01 00 00 26 00 00"
  params: []

- id: remote_recv_front_set_on
  label: Remote Receiver Front Set - On
  kind: action
  hex: "BE EF 03 06 00 6F 33 01 00 00 26 01 00"
  params: []

- id: remote_recv_front_get
  label: Remote Receiver Front Get
  kind: query
  hex: "BE EF 03 06 00 CC 32 02 00 00 26 00 00"
  params: []

- id: remote_recv_rear_set_off
  label: Remote Receiver Rear Set - Off
  kind: action
  hex: "BE EF 03 06 00 03 33 01 00 01 26 00 00"
  params: []

- id: remote_recv_rear_set_on
  label: Remote Receiver Rear Set - On
  kind: action
  hex: "BE EF 03 06 00 93 32 01 00 01 26 01 00"
  params: []

- id: remote_recv_rear_get
  label: Remote Receiver Rear Get
  kind: query
  hex: "BE EF 03 06 00 30 33 02 00 01 26 00 00"
  params: []

- id: remote_recv_hdbaset_set_off
  label: Remote Receiver HDBaseT Set - Off
  kind: action
  hex: "BE EF 03 06 00 BB 32 01 00 03 26 00 00"
  params: []

- id: remote_recv_hdbaset_set_on
  label: Remote Receiver HDBaseT Set - On
  kind: action
  hex: "BE EF 03 06 00 2B 33 01 00 03 26 01 00"
  params: []

- id: remote_recv_hdbaset_get
  label: Remote Receiver HDBaseT Get
  kind: query
  hex: "BE EF 03 06 00 88 32 02 00 03 26 00 00"
  params: []

- id: my_image_set_off
  label: My Image Set - OFF
  kind: action
  hex: "BE EF 03 06 00 3A C3 01 00 00 35 00 00"
  params: []

- id: my_image_set_image1
  label: My Image Set - IMAGE-1
  kind: action
  hex: "BE EF 03 06 00 AA C2 01 00 00 35 01 00"
  params: []

- id: my_image_set_image2
  label: My Image Set - IMAGE-2
  kind: action
  hex: "BE EF 03 06 00 5A C2 01 00 00 35 02 00"
  params: []

- id: my_image_set_image3
  label: My Image Set - IMAGE-3
  kind: action
  hex: "BE EF 03 06 00 CA C3 01 00 00 35 03 00"
  params: []

- id: my_image_set_image4
  label: My Image Set - IMAGE-4
  kind: action
  hex: "BE EF 03 06 00 FA C1 01 00 00 35 04 00"
  params: []

- id: my_image_get
  label: My Image Get
  kind: query
  hex: "BE EF 03 06 00 09 C3 02 00 00 35 00 00"
  params: []

- id: my_image_image1_delete
  label: My Image IMAGE-1 Delete Execute
  kind: action
  hex: "BE EF 03 06 00 71 C3 06 00 01 35 00 00"
  params: []

- id: my_image_image2_delete
  label: My Image IMAGE-2 Delete Execute
  kind: action
  hex: "BE EF 03 06 00 35 C3 06 00 02 35 00 00"
  params: []

- id: my_image_image3_delete
  label: My Image IMAGE-3 Delete Execute
  kind: action
  hex: "BE EF 03 06 00 C9 C2 06 00 03 35 00 00"
  params: []

- id: my_image_image4_delete
  label: My Image IMAGE-4 Delete Execute
  kind: action
  hex: "BE EF 03 06 00 BD C3 06 00 04 35 00 00"
  params: []

- id: hdmi_out_resolution_set_external
  label: HDMI Out Resolution Set - EXTERNAL DEVICE
  kind: action
  hex: "BE EF 03 06 00 46 EF 01 00 C2 20 00 00"
  params: []

- id: hdmi_out_resolution_set_projector
  label: HDMI Out Resolution Set - PROJECTOR
  kind: action
  hex: "BE EF 03 06 00 D6 EE 01 00 C2 20 01 00"
  params: []

- id: hdmi_out_resolution_get
  label: HDMI Out Resolution Get
  kind: query
  hex: "BE EF 03 06 00 75 EF 02 00 C2 20 00 00"
  params: []

- id: hdmi_output_enable_set_off
  label: HDMI Output Enable Set - OFF
  kind: action
  hex: "BE EF 03 06 00 02 2C 01 00 31 23 00 00"
  params: []

- id: hdmi_output_enable_set_on
  label: HDMI Output Enable Set - ON
  kind: action
  hex: "BE EF 03 06 00 92 2D 01 00 31 23 01 00"
  params: []

- id: hdmi_output_enable_get
  label: HDMI Output Enable Get
  kind: query
  hex: "BE EF 03 06 00 31 2C 02 00 31 23 00 00"
  params: []
- id: color_uniformity_area_set_topleft
  label: "COLOR UNIFORMITY AREA Set TopLeft"
  kind: action
  hex: "BE EF 03 06 00 C3 6D 01 00 31 27 00 00"
  params: []

- id: color_uniformity_area_set_top
  label: "COLOR UNIFORMITY AREA Set Top"
  kind: action
  hex: "BE EF 03 06 00 53 6C 01 00 31 27 01 00"
  params: []

- id: color_uniformity_area_set_topright
  label: "COLOR UNIFORMITY AREA Set TopRight"
  kind: action
  hex: "BE EF 03 06 00 A3 6C 01 00 31 27 02 00"
  params: []

- id: color_uniformity_area_set_left
  label: "COLOR UNIFORMITY AREA Set Left"
  kind: action
  hex: "BE EF 03 06 00 03 AC 01 00 31 27 00 01"
  params: []

- id: color_uniformity_area_set_all
  label: "COLOR UNIFORMITY AREA Set All"
  kind: action
  hex: "BE EF 03 06 00 93 AD 01 00 31 27 01 01"
  params: []

- id: color_uniformity_area_set_right
  label: "COLOR UNIFORMITY AREA Set Right"
  kind: action
  hex: "BE EF 03 06 00 63 AD 01 00 31 27 02 01"
  params: []

- id: color_uniformity_area_set_bottom_left
  label: "COLOR UNIFORMITY AREA Set Bottom Left"
  kind: action
  hex: "BE EF 03 06 00 02 EC 01 00 31 27 00 02"
  params: []

- id: color_uniformity_area_set_bottom
  label: "COLOR UNIFORMITY AREA Set Bottom"
  kind: action
  hex: "BE EF 03 06 00 92 ED 01 00 31 27 01 02"
  params: []

- id: color_uniformity_area_set_bottom_right
  label: "COLOR UNIFORMITY AREA Set Bottom Right"
  kind: action
  hex: "BE EF 03 06 00 62 ED 01 00 31 27 02 02"
  params: []

- id: color_uniformity_area_set_get
  label: "COLOR UNIFORMITY AREA Set Get"
  kind: action
  hex: "BE EF 03 06 00 F0 6D 02 00 31 27 00 00"
  params: []

- id: audio_source_lan_set_audio_in1
  label: "AUDIO SOURCE - LAN Set AUDIO IN1"
  kind: action
  hex: "BE EF 03 06 00 4A DE 01 00 3B 20 01 00"
  params: []

- id: audio_source_lan_set_audio_in2
  label: "AUDIO SOURCE - LAN Set AUDIO IN2"
  kind: action
  hex: "BE EF 03 06 00 BA DE 01 00 3B 20 02 00"
  params: []

- id: audio_source_lan_set_audio_lan
  label: "AUDIO SOURCE - LAN Set AUDIO LAN"
  kind: action
  hex: "BE EF 03 06 00 8A D3 01 00 3B 20 11 00"
  params: []

- id: audio_source_lan_set_off
  label: "AUDIO SOURCE - LAN Set OFF"
  kind: action
  hex: "BE EF 03 06 00 DA DF 01 00 3B 20 00 00"
  params: []

- id: audio_source_lan_set_get
  label: "AUDIO SOURCE - LAN Set Get"
  kind: action
  hex: "BE EF 03 06 00 E9 DF 02 00 3B 20 00 00"
  params: []

- id: audio_source_3g_sdi_set_audio_in1
  label: "AUDIO SOURCE - 3G-SDI* Set AUDIO IN1"
  kind: action
  hex: "BE EF 03 06 00 9E E5 01 00 E4 20 01 00"
  params: []

- id: audio_source_3g_sdi_set_audio_in2
  label: "AUDIO SOURCE - 3G-SDI* Set AUDIO IN2"
  kind: action
  hex: "BE EF 03 06 00 6E E5 01 00 E4 20 02 00"
  params: []

- id: audio_source_3g_sdi_set_off
  label: "AUDIO SOURCE - 3G-SDI* Set OFF"
  kind: action
  hex: "BE EF 03 06 00 0E E4 01 00 E4 20 00 00"
  params: []

- id: audio_source_3g_sdi_set_get
  label: "AUDIO SOURCE - 3G-SDI* Set Get"
  kind: action
  hex: "BE EF 03 06 00 3D E4 02 00 E4 20 00 00"
  params: []

- id: audio_source_displayport_set_audio_in1
  label: "AUDIO SOURCE - DisplayPort Set AUDIO IN1"
  kind: action
  hex: "BE EF 03 06 00 5E E1 01 00 F4 20 01 00"
  params: []

- id: audio_source_displayport_set_audio_in2
  label: "AUDIO SOURCE - DisplayPort Set AUDIO IN2"
  kind: action
  hex: "BE EF 03 06 00 AE E1 01 00 F4 20 02 00"
  params: []

- id: audio_source_displayport_set_audio_displayport
  label: "AUDIO SOURCE - DisplayPort Set AUDIO DisplayPort"
  kind: action
  hex: "BE EF 03 06 00 AE FA 01 00 F4 20 26 00"
  params: []

- id: audio_source_displayport_set_off
  label: "AUDIO SOURCE - DisplayPort Set OFF"
  kind: action
  hex: "BE EF 03 06 00 CE E0 01 00 F4 20 00 00"
  params: []

- id: audio_source_displayport_set_get
  label: "AUDIO SOURCE - DisplayPort Set Get"
  kind: action
  hex: "BE EF 03 06 00 FD E0 02 00 F4 20 00 00"
  params: []

- id: language_set_english
  label: "LANGUAGE Set ENGLISH"
  kind: action
  hex: "BE EF 03 06 00 F7 D3 01 00 05 30 00 00"
  params: []

- id: language_set_fran_ais
  label: "LANGUAGE Set FRANÇAIS"
  kind: action
  hex: "BE EF 03 06 00 67 D2 01 00 05 30 01 00"
  params: []

- id: language_set_deutsch
  label: "LANGUAGE Set DEUTSCH"
  kind: action
  hex: "BE EF 03 06 00 97 D2 01 00 05 30 02 00"
  params: []

- id: language_set_espa_ol
  label: "LANGUAGE Set ESPAÑOL"
  kind: action
  hex: "BE EF 03 06 00 07 D3 01 00 05 30 03 00"
  params: []

- id: language_set_italiano
  label: "LANGUAGE Set ITALIANO"
  kind: action
  hex: "BE EF 03 06 00 37 D1 01 00 05 30 04 00"
  params: []

- id: language_set_norsk
  label: "LANGUAGE Set NORSK"
  kind: action
  hex: "BE EF 03 06 00 A7 D0 01 00 05 30 05 00"
  params: []

- id: language_set_nederlands
  label: "LANGUAGE Set NEDERLANDS"
  kind: action
  hex: "BE EF 03 06 00 57 D0 01 00 05 30 06 00"
  params: []

- id: language_set_portugu_s
  label: "LANGUAGE Set PORTUGUÊS"
  kind: action
  hex: "BE EF 03 06 00 C7 D1 01 00 05 30 07 00"
  params: []

- id: language_set
  label: "LANGUAGE Set 日本語"
  kind: action
  hex: "BE EF 03 06 00 37 D4 01 00 05 30 08 00"
  params: []

- id: language_set_2
  label: "LANGUAGE Set 簡体中文"
  kind: action
  hex: "BE EF 03 06 00 A7 D5 01 00 05 30 09 00"
  params: []

- id: language_set_3
  label: "LANGUAGE Set 繁体中文"
  kind: action
  hex: "BE EF 03 06 00 37 DE 01 00 05 30 10 00"
  params: []

- id: language_set_4
  label: "LANGUAGE Set 한국어"
  kind: action
  hex: "BE EF 03 06 00 57 D5 01 00 05 30 0A 00"
  params: []

- id: language_set_svenska
  label: "LANGUAGE Set SVENSKA"
  kind: action
  hex: "BE EF 03 06 00 C7 D4 01 00 05 30 0B 00"
  params: []

- id: language_set_p_cck
  label: "LANGUAGE Set PУCCKИЙ"
  kind: action
  hex: "BE EF 03 06 00 F7 D6 01 00 05 30 0C 00"
  params: []

- id: language_set_suomi
  label: "LANGUAGE Set SUOMI"
  kind: action
  hex: "BE EF 03 06 00 67 D7 01 00 05 30 0D 00"
  params: []

- id: language_set_polski
  label: "LANGUAGE Set POLSKI"
  kind: action
  hex: "BE EF 03 06 00 97 D7 01 00 05 30 0E 00"
  params: []

- id: language_set_t_rk_e
  label: "LANGUAGE Set TÜRKÇE"
  kind: action
  hex: "BE EF 03 06 00 07 D6 01 00 05 30 0F 00"
  params: []

- id: language_set_get
  label: "LANGUAGE Set Get"
  kind: action
  hex: "BE EF 03 06 00 C4 D3 02 00 05 30 00 00"
  params: []

- id: menu_position_v_set_get
  label: "MENU POSITION V Set Get"
  kind: action
  hex: "BE EF 03 06 00 40 D7 02 00 16 30 00 00"
  params: []

- id: menu_position_v_set_increment
  label: "MENU POSITION V Set Increment"
  kind: action
  hex: "BE EF 03 06 00 26 D7 04 00 16 30 00 00"
  params: []

- id: menu_position_v_set_decrement
  label: "MENU POSITION V Set Decrement"
  kind: action
  hex: "BE EF 03 06 00 F7 D6 05 00 16 30 00 00"
  params: []

- id: menu_position_v_reset_set_execute
  label: "MENU POSITION V Reset Set Execute"
  kind: action
  hex: "BE EF 03 06 00 A8 C7 06 00 44 70 00 00"
  params: []

- id: menu_position_h_set_get
  label: "MENU POSITION H Set Get"
  kind: action
  hex: "BE EF 03 06 00 04 D7 02 00 15 30 00 00"
  params: []

- id: menu_position_h_set_increment
  label: "MENU POSITION H Set Increment"
  kind: action
  hex: "BE EF 03 06 00 62 D7 04 00 15 30 00 00"
  params: []

- id: menu_position_h_set_decrement
  label: "MENU POSITION H Set Decrement"
  kind: action
  hex: "BE EF 03 06 00 B3 D6 05 00 15 30 00 00"
  params: []

- id: menu_position_h_reset_set_execute
  label: "MENU POSITION H Reset Set Execute"
  kind: action
  hex: "BE EF 03 06 00 DC C6 06 00 43 70 00 00"
  params: []

- id: start_up_set_myscreen
  label: "START UP Set MyScreen"
  kind: action
  hex: "BE EF 03 06 00 CB CB 01 00 04 30 20 00"
  params: []

- id: start_up_set_original
  label: "START UP Set ORIGINAL"
  kind: action
  hex: "BE EF 03 06 00 0B D2 01 00 04 30 00 00"
  params: []

- id: start_up_set_off
  label: "START UP Set OFF"
  kind: action
  hex: "BE EF 03 06 00 9B D3 01 00 04 30 01 00"
  params: []

- id: start_up_set_get
  label: "START UP Set Get"
  kind: action
  hex: "BE EF 03 06 00 38 D2 02 00 04 30 00 00"
  params: []

- id: my_screen_lock_set_off
  label: "My Screen Lock Set OFF"
  kind: action
  hex: "BE EF 03 06 00 3B EF 01 00 C0 30 00 00"
  params: []

- id: my_screen_lock_set_on
  label: "My Screen Lock Set ON"
  kind: action
  hex: "BE EF 03 06 00 AB EE 01 00 C0 30 01 00"
  params: []

- id: my_screen_lock_set_get
  label: "My Screen Lock Set Get"
  kind: action
  hex: "BE EF 03 06 00 08 EF 02 00 C0 30 00 00"
  params: []

- id: osd_message_set_off
  label: "OSD MESSAGE Set OFF"
  kind: action
  hex: "BE EF 03 06 00 8F D6 01 00 17 30 00 00"
  params: []

- id: osd_message_set_on
  label: "OSD MESSAGE Set ON"
  kind: action
  hex: "BE EF 03 06 00 1F D7 01 00 17 30 01 00"
  params: []

- id: osd_message_set_hide
  label: "OSD MESSAGE Set HIDE"
  kind: action
  hex: "BE EF 03 06 00 EF D7 01 00 17 30 02 00"
  params: []

- id: osd_message_set_get
  label: "OSD MESSAGE Set Get"
  kind: action
  hex: "BE EF 03 06 00 BC D6 02 00 17 30 00 00"
  params: []

- id: closed_caption_c_c_display_set_off
  label: "Closed Caption C. C. - DISPLAY Set OFF"
  kind: action
  hex: "BE EF 03 06 00 FA 62 01 00 00 37 00 00"
  params: []

- id: closed_caption_c_c_display_set_on
  label: "Closed Caption C. C. - DISPLAY Set ON"
  kind: action
  hex: "BE EF 03 06 00 6A 63 01 00 00 37 01 00"
  params: []

- id: closed_caption_c_c_display_set_auto
  label: "Closed Caption C. C. - DISPLAY Set AUTO"
  kind: action
  hex: "BE EF 03 06 00 9A 63 01 00 00 37 02 00"
  params: []

- id: closed_caption_c_c_display_set_get
  label: "Closed Caption C. C. - DISPLAY Set Get"
  kind: action
  hex: "BE EF 03 06 00 C9 62 02 00 00 37 00 00"
  params: []

- id: closed_caption_c_c_mode_set_captions
  label: "Closed Caption C. C. - MODE Set CAPTIONS"
  kind: action
  hex: "BE EF 03 06 00 06 63 01 00 01 37 00 00"
  params: []

- id: closed_caption_c_c_mode_set_text
  label: "Closed Caption C. C. - MODE Set TEXT"
  kind: action
  hex: "BE EF 03 06 00 96 62 01 00 01 37 01 00"
  params: []

- id: closed_caption_c_c_mode_set_get
  label: "Closed Caption C. C. - MODE Set Get"
  kind: action
  hex: "BE EF 03 06 00 35 63 02 00 01 37 00 00"
  params: []

- id: closed_caption_c_c_channel_set_1
  label: "Closed Caption C. C. - CHANNEL Set 1"
  kind: action
  hex: "BE EF 03 06 00 D2 62 01 00 02 37 01 00"
  params: []

- id: closed_caption_c_c_channel_set_2
  label: "Closed Caption C. C. - CHANNEL Set 2"
  kind: action
  hex: "BE EF 03 06 00 22 62 01 00 02 37 02 00"
  params: []

- id: closed_caption_c_c_channel_set_3
  label: "Closed Caption C. C. - CHANNEL Set 3"
  kind: action
  hex: "BE EF 03 06 00 B2 63 01 00 02 37 03 00"
  params: []

- id: closed_caption_c_c_channel_set_4
  label: "Closed Caption C. C. - CHANNEL Set 4"
  kind: action
  hex: "BE EF 03 06 00 82 61 01 00 02 37 04 00"
  params: []

- id: closed_caption_c_c_channel_set_get
  label: "Closed Caption C. C. - CHANNEL Set Get"
  kind: action
  hex: "BE EF 03 06 00 71 63 02 00 02 37 00 00"
  params: []

- id: search_skip_computer_in_set_normal
  label: "SEARCH SKIP - COMPUTER IN Set NORMAL"
  kind: action
  hex: "BE EF 03 06 00 FE 78 01 00 20 22 00 00"
  params: []

- id: search_skip_computer_in_set_skip
  label: "SEARCH SKIP - COMPUTER IN Set SKIP"
  kind: action
  hex: "BE EF 03 06 00 6E 79 01 00 20 22 01 00"
  params: []

- id: search_skip_computer_in_set_get
  label: "SEARCH SKIP - COMPUTER IN Set Get"
  kind: action
  hex: "BE EF 03 06 00 CD 78 02 00 20 22 00 00"
  params: []

- id: search_skip_lan_set_normal
  label: "SEARCH SKIP - LAN Set NORMAL"
  kind: action
  hex: "BE EF 03 06 00 DA 7A 01 00 2B 22 00 00"
  params: []

- id: search_skip_lan_set_skip
  label: "SEARCH SKIP - LAN Set SKIP"
  kind: action
  hex: "BE EF 03 06 00 4A 7B 01 00 2B 22 01 00"
  params: []

- id: search_skip_lan_set_get
  label: "SEARCH SKIP - LAN Set Get"
  kind: action
  hex: "BE EF 03 06 00 E9 7A 02 00 2B 22 00 00"
  params: []

- id: search_skip_hdmi_1_set_normal
  label: "SEARCH SKIP - HDMI 1 Set NORMAL"
  kind: action
  hex: "BE EF 03 06 00 BA 78 01 00 23 22 00 00"
  params: []

- id: search_skip_hdmi_1_set_skip
  label: "SEARCH SKIP - HDMI 1 Set SKIP"
  kind: action
  hex: "BE EF 03 06 00 2A 79 01 00 23 22 01 00"
  params: []

- id: search_skip_hdmi_1_set_get
  label: "SEARCH SKIP - HDMI 1 Set Get"
  kind: action
  hex: "BE EF 03 06 00 89 78 02 00 23 22 00 00"
  params: []

- id: search_skip_hdmi_2_set_normal
  label: "SEARCH SKIP - HDMI 2 Set NORMAL"
  kind: action
  hex: "BE EF 03 06 00 52 7A 01 00 2D 22 00 00"
  params: []

- id: search_skip_hdmi_2_set_skip
  label: "SEARCH SKIP - HDMI 2 Set SKIP"
  kind: action
  hex: "BE EF 03 06 00 C2 7B 01 00 2D 22 01 00"
  params: []

- id: search_skip_hdmi_2_set_get
  label: "SEARCH SKIP - HDMI 2 Set Get"
  kind: action
  hex: "BE EF 03 06 00 61 7A 02 00 2D 22 00 00"
  params: []

- id: search_skip_hdbaset_set_normal
  label: "SEARCH SKIP - HDBaseT Set NORMAL"
  kind: action
  hex: "BE EF 03 06 00 B6 EA 01 00 D6 20 00 00"
  params: []

- id: search_skip_hdbaset_set_skip
  label: "SEARCH SKIP - HDBaseT Set SKIP"
  kind: action
  hex: "BE EF 03 06 00 26 EB 01 00 D6 20 01 00"
  params: []

- id: search_skip_hdbaset_set_get
  label: "SEARCH SKIP - HDBaseT Set Get"
  kind: action
  hex: "BE EF 03 06 00 85 EA 02 00 D6 20 00 00"
  params: []

- id: search_skip_video_set_normal
  label: "SEARCH SKIP - VIDEO Set NORMAL"
  kind: action
  hex: "BE EF 03 06 00 02 79 01 00 21 22 00 00"
  params: []

- id: search_skip_video_set_skip
  label: "SEARCH SKIP - VIDEO Set SKIP"
  kind: action
  hex: "BE EF 03 06 00 92 78 01 00 21 22 01 00"
  params: []

- id: search_skip_video_set_get
  label: "SEARCH SKIP - VIDEO Set Get"
  kind: action
  hex: "BE EF 03 06 00 31 79 02 00 21 22 00 00"
  params: []

- id: search_skip_3g_sdi_set_normal
  label: "SEARCH SKIP 3G-SDI* Set NORMAL"
  kind: action
  hex: "BE EF 03 06 00 B6 E5 01 00 E6 20 00 00"
  params: []

- id: search_skip_3g_sdi_set_skip
  label: "SEARCH SKIP 3G-SDI* Set SKIP"
  kind: action
  hex: "BE EF 03 06 00 26 E4 01 00 E6 20 01 00"
  params: []

- id: search_skip_3g_sdi_set_get
  label: "SEARCH SKIP 3G-SDI* Set Get"
  kind: action
  hex: "BE EF 03 06 00 85 E5 02 00 E6 20 00 00"
  params: []

- id: search_skip_displayport_set_normal
  label: "SEARCH SKIP DisplayPort Set NORMAL"
  kind: action
  hex: "BE EF 03 06 00 76 E1 01 00 F6 20 00 00"
  params: []

- id: search_skip_displayport_set_skip
  label: "SEARCH SKIP DisplayPort Set SKIP"
  kind: action
  hex: "BE EF 03 06 00 E6 E0 01 00 F6 20 01 00"
  params: []

- id: search_skip_displayport_set_get
  label: "SEARCH SKIP DisplayPort Set Get"
  kind: action
  hex: "BE EF 03 06 00 45 E1 02 00 F6 20 00 00"
  params: []

- id: auto_search_set_off
  label: "AUTO SEARCH Set OFF"
  kind: action
  hex: "BE EF 03 06 00 B6 D6 01 00 16 20 00 00"
  params: []

- id: auto_search_set_on
  label: "AUTO SEARCH Set ON"
  kind: action
  hex: "BE EF 03 06 00 26 D7 01 00 16 20 01 00"
  params: []

- id: auto_search_set_get
  label: "AUTO SEARCH Set Get"
  kind: action
  hex: "BE EF 03 06 00 85 D6 02 00 16 20 00 00"
  params: []

- id: auto_power_on_computer_in_set_get
  label: "AUTO POWER ON - COMPUTER IN Set Get"
  kind: action
  hex: "BE EF 03 06 00 08 A4 02 00 B0 31 00 00"
  params: []

- id: auto_power_on_video_set_get
  label: "AUTO POWER ON - VIDEO Set Get"
  kind: action
  hex: "BE EF 03 06 00 F4 A5 02 00 B1 31 00 00"
  params: []

- id: auto_power_on_hdmi_2_set_get
  label: "AUTO POWER ON - HDMI 2 Set Get"
  kind: action
  hex: "BE EF 03 06 00 A4 A6 02 00 BD 31 00 00"
  params: []

- id: my_button_1_set_my_image
  label: "MY BUTTON 1 Set MY IMAGE"
  kind: action
  hex: "BE EF 03 06 00 5A 3D 01 00 00 36 16 00"
  params: []

- id: my_button_1_set_messenger
  label: "MY BUTTON 1 Set MESSENGER"
  kind: action
  hex: "BE EF 03 06 00 AA 29 01 00 00 36 25 00"
  params: []

- id: my_button_1_set_shutter
  label: "MY BUTTON 1 Set SHUTTER"
  kind: action
  hex: "BE EF 03 06 00 5A 26 01 00 00 36 32 00"
  params: []

- id: my_button_1_set_information
  label: "MY BUTTON 1 Set INFORMATION"
  kind: action
  hex: "BE EF 03 06 00 FA 3E 01 00 00 36 10 00"
  params: []

- id: my_button_1_set_my_memory
  label: "MY BUTTON 1 Set MY MEMORY"
  kind: action
  hex: "BE EF 03 06 00 9A 3F 01 00 00 36 12 00"
  params: []

- id: my_button_1_set_picture_mode
  label: "MY BUTTON 1 Set PICTURE MODE"
  kind: action
  hex: "BE EF 03 06 00 0A 3E 01 00 00 36 13 00"
  params: []

- id: my_button_1_set_filter_reset
  label: "MY BUTTON 1 Set FILTER RESET"
  kind: action
  hex: "BE EF 03 06 00 3A 3C 01 00 00 36 14 00"
  params: []

- id: my_button_1_set_template
  label: "MY BUTTON 1 Set TEMPLATE"
  kind: action
  hex: "BE EF 03 06 00 CA 39 01 00 00 36 1B 00"
  params: []

- id: my_button_1_set_mute
  label: "MY BUTTON 1 Set MUTE"
  kind: action
  hex: "BE EF 03 06 00 FA 20 01 00 00 36 38 00"
  params: []

- id: my_button_1_set_pbyp_pip_swap
  label: "MY BUTTON 1 Set PbyP/PIP SWAP"
  kind: action
  hex: "BE EF 03 06 00 5A 38 01 00 00 36 1A 00"
  params: []

- id: my_button_1_set_pip_position
  label: "MY BUTTON 1 Set PIP POSITION"
  kind: action
  hex: "BE EF 03 06 00 3A 22 01 00 00 36 3C 00"
  params: []

- id: my_button_1_set_blank
  label: "MY BUTTON 1 Set BLANK"
  kind: action
  hex: "BE EF 03 06 00 FA 02 01 00 00 36 40 00"
  params: []

- id: my_button_1_set_resolution
  label: "MY BUTTON 1 Set RESOLUTION"
  kind: action
  hex: "BE EF 03 06 00 9A 3A 01 00 00 36 1E 00"
  params: []

- id: my_button_1_set_light_output
  label: "MY BUTTON 1 Set LIGHT OUTPUT"
  kind: action
  hex: "BE EF 03 06 00 0A 25 01 00 00 36 37 00"
  params: []

- id: my_button_1_set_eclarity
  label: "MY BUTTON 1 Set eClarity"
  kind: action
  hex: "BE EF 03 06 00 9A 21 01 00 00 36 3A 00"
  params: []

- id: my_button_1_set_hdcr
  label: "MY BUTTON 1 Set HDCR"
  kind: action
  hex: "BE EF 03 06 00 5A 23 01 00 00 36 3E 00"
  params: []

- id: my_button_1_set_my_button
  label: "MY BUTTON 1 Set MY BUTTON"
  kind: action
  hex: "BE EF 03 06 00 CA 72 01 00 00 36 FF 00"
  params: []

- id: my_button_1_set_get
  label: "MY BUTTON 1 Set Get"
  kind: action
  hex: "BE EF 03 06 00 09 33 02 00 00 36 00 00"
  params: []

- id: my_button_2_set_my_image
  label: "MY BUTTON 2 Set MY IMAGE"
  kind: action
  hex: "BE EF 03 06 00 A6 3C 01 00 01 36 16 00"
  params: []

- id: my_button_2_set_messenger
  label: "MY BUTTON 2 Set MESSENGER"
  kind: action
  hex: "BE EF 03 06 00 56 28 01 00 01 36 25 00"
  params: []

- id: my_button_2_set_shutter
  label: "MY BUTTON 2 Set SHUTTER"
  kind: action
  hex: "BE EF 03 06 00 A6 27 01 00 01 36 32 00"
  params: []

- id: my_button_2_set_information
  label: "MY BUTTON 2 Set INFORMATION"
  kind: action
  hex: "BE EF 03 06 00 06 3F 01 00 01 36 10 00"
  params: []

- id: my_button_2_set_my_memory
  label: "MY BUTTON 2 Set MY MEMORY"
  kind: action
  hex: "BE EF 03 06 00 66 3E 01 00 01 36 12 00"
  params: []

- id: my_button_2_set_picture_mode
  label: "MY BUTTON 2 Set PICTURE MODE"
  kind: action
  hex: "BE EF 03 06 00 F6 3F 01 00 01 36 13 00"
  params: []

- id: my_button_2_set_filter_reset
  label: "MY BUTTON 2 Set FILTER RESET"
  kind: action
  hex: "BE EF 03 06 00 C6 3D 01 00 01 36 14 00"
  params: []

- id: my_button_2_set_template
  label: "MY BUTTON 2 Set TEMPLATE"
  kind: action
  hex: "BE EF 03 06 00 36 38 01 00 01 36 1B 00"
  params: []

- id: my_button_2_set_mute
  label: "MY BUTTON 2 Set MUTE"
  kind: action
  hex: "BE EF 03 06 00 06 21 01 00 01 36 38 00"
  params: []

- id: my_button_2_set_pbyp_pip_swap
  label: "MY BUTTON 2 Set PbyP/PIP SWAP"
  kind: action
  hex: "BE EF 03 06 00 A6 39 01 00 01 36 1A 00"
  params: []

- id: my_button_2_set_pip_position
  label: "MY BUTTON 2 Set PIP POSITION"
  kind: action
  hex: "BE EF 03 06 00 C6 23 01 00 01 36 3C 00"
  params: []

- id: my_button_2_set_blank
  label: "MY BUTTON 2 Set BLANK"
  kind: action
  hex: "BE EF 03 06 00 06 03 01 00 01 36 40 00"
  params: []

- id: my_button_2_set_resolution
  label: "MY BUTTON 2 Set RESOLUTION"
  kind: action
  hex: "BE EF 03 06 00 66 3B 01 00 01 36 1E 00"
  params: []

- id: my_button_2_set_light_output
  label: "MY BUTTON 2 Set LIGHT OUTPUT"
  kind: action
  hex: "BE EF 03 06 00 F6 24 01 00 01 36 37 00"
  params: []

- id: my_button_2_set_eclarity
  label: "MY BUTTON 2 Set eClarity"
  kind: action
  hex: "BE EF 03 06 00 66 20 01 00 01 36 3A 00"
  params: []

- id: my_button_2_set_hdcr
  label: "MY BUTTON 2 Set HDCR"
  kind: action
  hex: "BE EF 03 06 00 A6 22 01 00 01 36 3E 00"
  params: []

- id: my_button_2_set_my_button
  label: "MY BUTTON 2 Set MY BUTTON"
  kind: action
  hex: "BE EF 03 06 00 36 73 01 00 01 36 FF 00"
  params: []

- id: my_button_2_set_get
  label: "MY BUTTON 2 Set Get"
  kind: action
  hex: "BE EF 03 06 00 F5 32 02 00 01 36 00 00"
  params: []

- id: my_button_3_set_my_image
  label: "MY BUTTON 3 Set MY IMAGE"
  kind: action
  hex: "BE EF 03 06 00 E2 3C 01 00 02 36 16 00"
  params: []

- id: my_button_3_set_messenger
  label: "MY BUTTON 3 Set MESSENGER"
  kind: action
  hex: "BE EF 03 06 00 12 28 01 00 02 36 25 00"
  params: []

- id: my_button_3_set_shutter
  label: "MY BUTTON 3 Set SHUTTER"
  kind: action
  hex: "BE EF 03 06 00 E2 27 01 00 02 36 32 00"
  params: []

- id: my_button_3_set_information
  label: "MY BUTTON 3 Set INFORMATION"
  kind: action
  hex: "BE EF 03 06 00 42 3F 01 00 02 36 10 00"
  params: []

- id: my_button_3_set_my_memory
  label: "MY BUTTON 3 Set MY MEMORY"
  kind: action
  hex: "BE EF 03 06 00 22 3E 01 00 02 36 12 00"
  params: []

- id: my_button_3_set_picture_mode
  label: "MY BUTTON 3 Set PICTURE MODE"
  kind: action
  hex: "BE EF 03 06 00 B2 3F 01 00 02 36 13 00"
  params: []

- id: my_button_3_set_filter_reset
  label: "MY BUTTON 3 Set FILTER RESET"
  kind: action
  hex: "BE EF 03 06 00 82 3D 01 00 02 36 14 00"
  params: []

- id: my_button_3_set_template
  label: "MY BUTTON 3 Set TEMPLATE"
  kind: action
  hex: "BE EF 03 06 00 72 38 01 00 02 36 1B 00"
  params: []

- id: my_button_3_set_mute
  label: "MY BUTTON 3 Set MUTE"
  kind: action
  hex: "BE EF 03 06 00 42 21 01 00 02 36 38 00"
  params: []

- id: my_button_3_set_pbyp_pip_swap
  label: "MY BUTTON 3 Set PbyP/PIP SWAP"
  kind: action
  hex: "BE EF 03 06 00 E2 39 01 00 02 36 1A 00"
  params: []

- id: my_button_3_set_pip_position
  label: "MY BUTTON 3 Set PIP POSITION"
  kind: action
  hex: "BE EF 03 06 00 82 23 01 00 02 36 3C 00"
  params: []

- id: my_button_3_set_blank
  label: "MY BUTTON 3 Set BLANK"
  kind: action
  hex: "BE EF 03 06 00 42 03 01 00 02 36 40 00"
  params: []

- id: my_button_3_set_resolution
  label: "MY BUTTON 3 Set RESOLUTION"
  kind: action
  hex: "BE EF 03 06 00 22 3B 01 00 02 36 1E 00"
  params: []

- id: my_button_3_set_light_output
  label: "MY BUTTON 3 Set LIGHT OUTPUT"
  kind: action
  hex: "BE EF 03 06 00 B2 24 01 00 02 36 37 00"
  params: []

- id: my_button_3_set_eclarity
  label: "MY BUTTON 3 Set eClarity"
  kind: action
  hex: "BE EF 03 06 00 22 20 01 00 02 36 3A 00"
  params: []

- id: my_button_3_set_hdcr
  label: "MY BUTTON 3 Set HDCR"
  kind: action
  hex: "BE EF 03 06 00 E2 22 01 00 02 36 3E 00"
  params: []

- id: my_button_3_set_my_button
  label: "MY BUTTON 3 Set MY BUTTON"
  kind: action
  hex: "BE EF 03 06 00 72 73 01 00 02 36 FF 00"
  params: []

- id: my_button_3_set_get
  label: "MY BUTTON 3 Set Get"
  kind: action
  hex: "BE EF 03 06 00 B1 32 02 00 02 36 00 00"
  params: []

- id: my_button_4_set_my_image
  label: "MY BUTTON 4 Set MY IMAGE"
  kind: action
  hex: "BE EF 03 06 00 1E 3D 01 00 03 36 16 00"
  params: []

- id: my_button_4_set_messenger
  label: "MY BUTTON 4 Set MESSENGER"
  kind: action
  hex: "BE EF 03 06 00 EE 29 01 00 03 36 25 00"
  params: []

- id: my_button_4_set_shutter
  label: "MY BUTTON 4 Set SHUTTER"
  kind: action
  hex: "BE EF 03 06 00 1E 26 01 00 03 36 32 00"
  params: []

- id: my_button_4_set_information
  label: "MY BUTTON 4 Set INFORMATION"
  kind: action
  hex: "BE EF 03 06 00 BE 3E 01 00 03 36 10 00"
  params: []

- id: my_button_4_set_my_memory
  label: "MY BUTTON 4 Set MY MEMORY"
  kind: action
  hex: "BE EF 03 06 00 DE 3F 01 00 03 36 12 00"
  params: []

- id: my_button_4_set_picture_mode
  label: "MY BUTTON 4 Set PICTURE MODE"
  kind: action
  hex: "BE EF 03 06 00 4E 3E 01 00 03 36 13 00"
  params: []

- id: my_button_4_set_filter_reset
  label: "MY BUTTON 4 Set FILTER RESET"
  kind: action
  hex: "BE EF 03 06 00 7E 3C 01 00 03 36 14 00"
  params: []

- id: my_button_4_set_template
  label: "MY BUTTON 4 Set TEMPLATE"
  kind: action
  hex: "BE EF 03 06 00 8E 39 01 00 03 36 1B 00"
  params: []

- id: my_button_4_set_mute
  label: "MY BUTTON 4 Set MUTE"
  kind: action
  hex: "BE EF 03 06 00 BE 20 01 00 03 36 38 00"
  params: []

- id: my_button_4_set_pbyp_pip_swap
  label: "MY BUTTON 4 Set PbyP/PIP SWAP"
  kind: action
  hex: "BE EF 03 06 00 1E 38 01 00 03 36 1A 00"
  params: []

- id: my_button_4_set_pip_position
  label: "MY BUTTON 4 Set PIP POSITION"
  kind: action
  hex: "BE EF 03 06 00 7E 22 01 00 03 36 3C 00"
  params: []

- id: my_button_4_set_blank
  label: "MY BUTTON 4 Set BLANK"
  kind: action
  hex: "BE EF 03 06 00 BE 02 01 00 03 36 40 00"
  params: []

- id: my_button_4_set_resolution
  label: "MY BUTTON 4 Set RESOLUTION"
  kind: action
  hex: "BE EF 03 06 00 DE 3A 01 00 03 36 1E 00"
  params: []

- id: my_button_4_set_light_output
  label: "MY BUTTON 4 Set LIGHT OUTPUT"
  kind: action
  hex: "BE EF 03 06 00 4E 25 01 00 03 36 37 00"
  params: []

- id: my_button_4_set_eclarity
  label: "MY BUTTON 4 Set eClarity"
  kind: action
  hex: "BE EF 03 06 00 DE 21 01 00 03 36 3A 00"
  params: []

- id: my_button_4_set_hdcr
  label: "MY BUTTON 4 Set HDCR"
  kind: action
  hex: "BE EF 03 06 00 1E 23 01 00 03 36 3E 00"
  params: []

- id: my_button_4_set_my_button
  label: "MY BUTTON 4 Set MY BUTTON"
  kind: action
  hex: "BE EF 03 06 00 8E 72 01 00 03 36 FF 00"
  params: []

- id: my_button_4_set_get
  label: "MY BUTTON 4 Set Get"
  kind: action
  hex: "BE EF 03 06 00 4D 33 02 00 03 36 00 00"
  params: []

- id: remote_freq_normal_set_off
  label: "REMOTE FREQ. NORMAL Set OFF"
  kind: action
  hex: "BE EF 03 06 00 FF 3D 01 00 30 26 00 00"
  params: []

- id: remote_freq_normal_set_on
  label: "REMOTE FREQ. NORMAL Set ON"
  kind: action
  hex: "BE EF 03 06 00 6F 3C 01 00 30 26 01 00"
  params: []

- id: remote_freq_normal_set_get
  label: "REMOTE FREQ. NORMAL Set Get"
  kind: action
  hex: "BE EF 03 06 00 CC 3D 02 00 30 26 00 00"
  params: []

- id: remote_freq_high_set_off
  label: "REMOTE FREQ. HIGH Set OFF"
  kind: action
  hex: "BE EF 03 06 00 03 3C 01 00 31 26 00 00"
  params: []

- id: remote_freq_high_set_on
  label: "REMOTE FREQ. HIGH Set ON"
  kind: action
  hex: "BE EF 03 06 00 93 3D 01 00 31 26 01 00"
  params: []

- id: remote_freq_high_set_get
  label: "REMOTE FREQ. HIGH Set Get"
  kind: action
  hex: "BE EF 03 06 00 30 3C 02 00 31 26 00 00"
  params: []

- id: remote_id_set_all
  label: "REMOTE ID Set ALL"
  kind: action
  hex: "BE EF 03 06 00 9F 30 01 00 08 26 00 00"
  params: []

- id: remote_id_set_1
  label: "REMOTE ID Set 1"
  kind: action
  hex: "BE EF 03 06 00 0F 31 01 00 08 26 01 00"
  params: []

- id: remote_id_set_2
  label: "REMOTE ID Set 2"
  kind: action
  hex: "BE EF 03 06 00 FF 31 01 00 08 26 02 00"
  params: []

- id: remote_id_set_3
  label: "REMOTE ID Set 3"
  kind: action
  hex: "BE EF 03 06 00 6F 30 01 00 08 26 03 00"
  params: []

- id: remote_id_set_4
  label: "REMOTE ID Set 4"
  kind: action
  hex: "BE EF 03 06 00 5F 32 01 00 08 26 04 00"
  params: []

- id: remote_id_set_get
  label: "REMOTE ID Set Get"
  kind: action
  hex: "BE EF 03 06 00 AC 30 02 00 08 26 00 00"
  params: []

- id: remote_out_remote_control_set_off
  label: "REMOTE OUT - REMOTE CONTROL Set OFF"
  kind: action
  hex: "BE EF 03 06 00 47 3C 01 00 32 26 00 00"
  params: []

- id: remote_out_remote_control_set_on
  label: "REMOTE OUT - REMOTE CONTROL Set ON"
  kind: action
  hex: "BE EF 03 06 00 D7 3D 01 00 32 26 01 00"
  params: []

- id: remote_out_remote_control_set_get
  label: "REMOTE OUT - REMOTE CONTROL Set Get"
  kind: action
  hex: "BE EF 03 06 00 74 3C 02 00 32 26 00 00"
  params: []

- id: remote_out_hdbaset_set_off
  label: "REMOTE OUT - HDBaseT Set OFF"
  kind: action
  hex: "BE EF 03 06 00 BB 3D 01 00 33 26 00 00"
  params: []

- id: remote_out_hdbaset_set_on
  label: "REMOTE OUT - HDBaseT Set ON"
  kind: action
  hex: "BE EF 03 06 00 2B 3C 01 00 33 26 01 00"
  params: []

- id: remote_out_hdbaset_set_get
  label: "REMOTE OUT - HDBaseT Set Get"
  kind: action
  hex: "BE EF 03 06 00 88 3D 02 00 33 26 00 00"
  params: []

- id: amx_for_lan_set_off
  label: "AMX for LAN Set Off"
  kind: action
  hex: "BE EF 03 06 00 33 AC 01 00 30 1B 00 00"
  params: []

- id: amx_for_lan_set_on
  label: "AMX for LAN Set On"
  kind: action
  hex: "BE EF 03 06 00 A3 AD 01 00 30 1B 01 00"
  params: []

- id: amx_for_lan_set_get
  label: "AMX for LAN Set Get"
  kind: action
  hex: "BE EF 03 06 00 00 AC 02 00 30 1B 00 00"
  params: []

- id: crestron_set_off
  label: "CRESTRON Set Off"
  kind: action
  hex: "BE EF 03 06 00 33 B2 01 00 50 1B 00 00"
  params: []

- id: crestron_set_on
  label: "CRESTRON Set On"
  kind: action
  hex: "BE EF 03 06 00 A3 B3 01 00 50 1B 01 00"
  params: []

- id: crestron_set_get
  label: "CRESTRON Set Get"
  kind: action
  hex: "BE EF 03 06 00 00 B2 02 00 50 1B 00 00"
  params: []

- id: extron_for_hdbaset_set_off
  label: "EXTRON for HDBaseT Set Off"
  kind: action
  hex: "BE EF 03 06 00 33 BD 01 00 60 1B 00 00"
  params: []

- id: extron_for_hdbaset_set_on
  label: "EXTRON for HDBaseT Set On"
  kind: action
  hex: "BE EF 03 06 00 A3 BC 01 00 60 1B 01 00"
  params: []

- id: extron_for_hdbaset_set_get
  label: "EXTRON for HDBaseT Set Get"
  kind: action
  hex: "BE EF 03 06 00 00 BD 02 00 60 1B 00 00"
  params: []

- id: standby_output_audio_out_set_off
  label: "STANDBY OUTPUT - AUDIO OUT Set OFF"
  kind: action
  hex: "BE EF 03 06 00 EA DE 01 00 3F 20 00 00"
  params: []

- id: standby_output_audio_out_set_audio_in1
  label: "STANDBY OUTPUT - AUDIO OUT Set AUDIO IN1"
  kind: action
  hex: "BE EF 03 06 00 7A DF 01 00 3F 20 01 00"
  params: []

- id: standby_output_audio_out_set_audio_in2
  label: "STANDBY OUTPUT - AUDIO OUT Set AUDIO IN2"
  kind: action
  hex: "BE EF 03 06 00 8A DF 01 00 3F 20 02 00"
  params: []

- id: standby_output_audio_out_set_hdmi_1
  label: "STANDBY OUTPUT - AUDIO OUT Set HDMI 1"
  kind: action
  hex: "BE EF 03 06 00 2A C7 01 00 3F 20 20 00"
  params: []

- id: standby_output_audio_out_set_hdmi_2
  label: "STANDBY OUTPUT - AUDIO OUT Set HDMI 2"
  kind: action
  hex: "BE EF 03 06 00 BA C6 01 00 3F 20 21 00"
  params: []

- id: standby_output_audio_out_set_hdbaset
  label: "STANDBY OUTPUT - AUDIO OUT Set HDBaseT"
  kind: action
  hex: "BE EF 03 06 00 EA C5 01 00 3F 20 24 00"
  params: []

- id: standby_output_audio_out_set_displayport
  label: "STANDBY OUTPUT - AUDIO OUT Set DisplayPort"
  kind: action
  hex: "BE EF 03 06 00 8A C4 01 00 3F 20 26 00"
  params: []

- id: standby_output_audio_out_set_get
  label: "STANDBY OUTPUT - AUDIO OUT Set Get"
  kind: action
  hex: "BE EF 03 06 00 D9 DE 02 00 3F 20 00 00"
  params: []

- id: standby_output_monitor_out_set_computer_in
  label: "STANDBY OUTPUT - MONITOR OUT Set COMPUTER IN"
  kind: action
  hex: "BE EF 03 06 00 2A F7 01 00 BF 20 00 00"
  params: []

- id: standby_output_monitor_out_set_off
  label: "STANDBY OUTPUT - MONITOR OUT Set OFF"
  kind: action
  hex: "BE EF 03 06 00 DA B6 01 00 BF 20 FF 00"
  params: []

- id: standby_output_monitor_out_set_get
  label: "STANDBY OUTPUT - MONITOR OUT Set Get"
  kind: action
  hex: "BE EF 03 06 00 19 F7 02 00 BF 20 00 00"
  params: []

- id: standby_output_hdmi_out_set_hdmi_1
  label: "STANDBY OUTPUT - HDMI OUT Set HDMI 1"
  kind: action
  hex: "BE EF 03 06 00 F2 EF 01 00 C1 20 03 00"
  params: []

- id: standby_output_hdmi_out_set_hdbaset
  label: "STANDBY OUTPUT - HDMI OUT Set HDBaseT"
  kind: action
  hex: "BE EF 03 06 00 52 E3 01 00 C1 20 11 00"
  params: []

- id: standby_output_hdmi_out_set_off
  label: "STANDBY OUTPUT - HDMI OUT Set OFF"
  kind: action
  hex: "BE EF 03 06 00 F2 AE 01 00 C1 20 FF 00"
  params: []

- id: standby_output_hdmi_out_set_get
  label: "STANDBY OUTPUT - HDMI OUT Set Get"
  kind: action
  hex: "BE EF 03 06 00 31 EF 02 00 C1 20 00 00"
  params: []

- id: hdmi_output_computer_in_set_hdmi_1
  label: "HDMI OUTPUT - COMPUTER IN Set HDMI 1"
  kind: action
  hex: "BE EF 03 06 00 CE 37 01 00 40 23 03 00"
  params: []

- id: hdmi_output_computer_in_set_hdbaset
  label: "HDMI OUTPUT - COMPUTER IN Set HDBaseT"
  kind: action
  hex: "BE EF 03 06 00 6E 3B 01 00 40 23 11 00"
  params: []

- id: hdmi_output_computer_in_set_get
  label: "HDMI OUTPUT - COMPUTER IN Set Get"
  kind: action
  hex: "BE EF 03 06 00 0D 37 02 00 40 23 00 00"
  params: []

- id: hdmi_output_video_set_hdmi
  label: "HDMI OUTPUT - VIDEO Set HDMI"
  kind: action
  hex: "BE EF 03 06 00 32 36 01 00 41 23 03 00"
  params: []

- id: hdmi_output_video_set_hdbaset
  label: "HDMI OUTPUT - VIDEO Set HDBaseT"
  kind: action
  hex: "BE EF 03 06 00 92 3A 01 00 41 23 11 00"
  params: []

- id: hdmi_output_video_set_get
  label: "HDMI OUTPUT - VIDEO Set Get"
  kind: action
  hex: "BE EF 03 06 00 F1 36 02 00 41 23 00 00"
  params: []

- id: hdmi_output_hdmi_1_set_get
  label: "HDMI OUTPUT - HDMI 1 Set Get"
  kind: action
  hex: "BE EF 03 06 00 49 37 02 00 43 23 00 00"
  params: []

- id: hdmi_output_lan_set_hdmi_1
  label: "HDMI OUTPUT - LAN Set HDMI 1"
  kind: action
  hex: "BE EF 03 06 00 EA 35 01 00 4B 23 03 00"
  params: []

- id: hdmi_output_lan_set_hdbaset
  label: "HDMI OUTPUT - LAN Set HDBaseT"
  kind: action
  hex: "BE EF 03 06 00 4A 39 01 00 4B 23 11 00"
  params: []

- id: hdmi_output_lan_set_get
  label: "HDMI OUTPUT - LAN Set Get"
  kind: action
  hex: "BE EF 03 06 00 29 35 02 00 4B 23 00 00"
  params: []

- id: hdmi_output_hdmi_2_set_hdmi_1
  label: "HDMI OUTPUT - HDMI 2 Set HDMI 1"
  kind: action
  hex: "BE EF 03 06 00 62 35 01 00 4D 23 03 00"
  params: []

- id: hdmi_output_hdmi_2_set_hdbaset
  label: "HDMI OUTPUT - HDMI 2 Set HDBaseT"
  kind: action
  hex: "BE EF 03 06 00 C2 39 01 00 4D 23 11 00"
  params: []

- id: hdmi_output_hdmi_2_set_get
  label: "HDMI OUTPUT - HDMI 2 Set Get"
  kind: action
  hex: "BE EF 03 06 00 A1 35 02 00 4D 23 00 00"
  params: []

- id: hdmi_output_hdbaset_set_get
  label: "HDMI OUTPUT - HDBaseT Set Get"
  kind: action
  hex: "BE EF 03 06 00 31 32 02 00 51 23 00 00"
  params: []

- id: hdmi_output_3g_sdi_set_hdmi_1
  label: "HDMI OUTPUT - 3G-SDI * Set HDMI 1"
  kind: action
  hex: "BE EF 03 06 00 B6 32 01 00 52 23 03 00"
  params: []

- id: hdmi_output_3g_sdi_set_hdbaset
  label: "HDMI OUTPUT - 3G-SDI * Set HDBaseT"
  kind: action
  hex: "BE EF 03 06 00 16 3E 01 00 52 23 11 00"
  params: []

- id: hdmi_output_3g_sdi_set_get
  label: "HDMI OUTPUT - 3G-SDI * Set Get"
  kind: action
  hex: "BE EF 03 06 00 75 32 02 00 52 23 00 00"
  params: []
```

## Feedbacks
```yaml
- id: fb_power_status
  query_command: power_get
  label: Power Status

- id: fb_input_source
  query_command: input_source_get
  label: Input Source

- id: fb_error_status
  query_command: error_status_get
  label: Error Status

- id: fb_freeze
  query_command: freeze_get
  label: Freeze Status

- id: fb_shutter
  query_command: shutter_get
  label: Shutter Status

- id: fb_brightness
  query_command: brightness_get
  label: Brightness Level

- id: fb_contrast
  query_command: contrast_get
  label: Contrast Level

- id: fb_volume_all
  query_command: volume_all_get
  label: Volume (All)

- id: fb_mute
  query_command: mute_get
  label: Mute Status

- id: fb_av_mute
  query_command: av_mute_get
  label: AV Mute Status

- id: fb_light_source_hours_lower
  query_command: light_source_hours_lower_get
  label: Light Source Hours (Lower)

- id: fb_filter_hours_lower
  query_command: filter_hours_lower_get
  label: Filter Hours (Lower)
```

## Variables
[]

## Events
[]

## Macros
[]

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Christie LHD/LWU/DS projectors use identical 13-byte binary frames for both RS-232C and TCP/IP control; port 9715 adds a 16-byte wrapper with checksum and connection ID. Commands annotated with * (3G-SDI) apply only to the LWU900-DS and LHD878-DS models. PJLink is supported on the same network interface and uses the standard PJLink protocol with the Web Control password.

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - res.cloudinary.com
  - pierrehenrypauly.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-001583-01-christie-lit-man-usr-ds-series-tech.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-001587-01-christie-lit-man-usr-ds-series.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Christie_LWU900-DS_Network_Guide.pdf"
  - https://www.christiedigital.com/globalassets/resources/public/020-000786-02_lit-man-usr-d-series.pdf
  - https://www.pierrehenrypauly.com/database/documents/christie/lhd878-ds/service-manual.pdf
retrieved_at: 2026-05-15T01:39:34.265Z
last_checked_at: 2026-06-23T11:55:50.749Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T11:55:50.749Z
matched_actions: 975
action_count: 975
confidence: high
summary: "All 975 spec binary-protocol actions verified against source with exact hex matches; coverage 975/998 (only 23 PJLink cmds unrepresented, acknowledged in Notes)."
```

## Known Gaps

```yaml
- "PJLink POWR/INPT/AVMT/ERST/LAMP (23 separate-protocol cmds, acknowledged in Notes)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
