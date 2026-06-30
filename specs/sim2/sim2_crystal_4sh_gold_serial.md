---
spec_id: admin/sim2-crystal-4sh-gold
schema_version: ai4av-public-spec-v1
revision: 1
title: "SIM2 Crystal 4 SH Control Spec"
manufacturer: Sim2
model_family: "Crystal 4 SH"
aliases: []
compatible_with:
  manufacturers:
    - Sim2
    - "SIM2 BV INTERNATIONAL SRL"
  models:
    - "Crystal 4 SH"
    - "Crystal 4 SH Gold"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - screenprofessional.de
source_urls:
  - https://screenprofessional.de/wp-content/uploads/2024/07/CRYSTAL4_SH__RS232_communication_protocol_vers.1.0.pdf
retrieved_at: 2026-06-29T19:46:51.005Z
last_checked_at: 2026-06-30T07:12:10.878Z
generated_at: 2026-06-30T07:12:10.878Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PDF extraction garbled several multi-column command tables (display menu middle sections, parts of setup menu); some rows below are transcribed from readable portions. Lines marked UNRESOLVED in commands indicate payload bytes obscured in extraction."
  - "other gamma set variants (Video, Graphic, Standard, 1.8, 2.0, 2.4) obscured in source extraction"
  - "edge_mask_get command partially obscured in extraction"
  - "full generic-info field map is large and partially garbled in extraction;"
  - "exact range not clearly stated.\""
  - "source documents no unsolicited event/notification packets."
  - "source documents no multi-step macro sequences."
  - "no explicit safety interlock procedures or power-on sequencing"
  - "Several display-menu command tables (gamma variants beyond Film, additional CMS adjust axes, and some middle rows) were garbled during PDF text extraction and could not be transcribed with confidence. A re-extraction from the original PDF with table-aware tooling is recommended to recover the full command set."
  - "firmware version compatibility not stated in source."
  - "protocol version noted as \"Rev. 1.0 (21 December 2020)\" of the document; device firmware protocol version not separately stated."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:12:10.878Z
  matched_actions: 232
  action_count: 232
  confidence: medium
  summary: "All 232 spec actions verified against source document; complete bidirectional coverage with wire-literal command matching. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# SIM2 Crystal 4 SH Control Spec

## Summary
The SIM2 Crystal 4 SH (CRYSTAL4 SH) is a home theatre projector controlled over an RS-232C serial connection using a binary (hex) packet-oriented protocol. Packets consist of a fixed 7-byte header (`BE EF` sync + packet type + payload size + CRC16) followed by a variable payload. This spec covers the remote-control emulation keys, direct source selection, display/setup/network menu commands, and status queries documented in the vendor protocol reference (Rev. 1.0, 21 December 2020). ASCII mode is not supported; commands require no termination character.

<!-- UNRESOLVED: PDF extraction garbled several multi-column command tables (display menu middle sections, parts of setup menu); some rows below are transcribed from readable portions. Lines marked UNRESOLVED in commands indicate payload bytes obscured in extraction. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
# Communication Mode: Binary/Hex (ASCII not supported). No termination char.
# Cable: NULL modem, 9-pin male (controller) to 9-pin female (projector).
# Max distance: 15 m / 50 ft.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: power on/off commands present
  - queryable   # inferred: status query commands present
  - levelable   # inferred: brightness/contrast/etc. adjust commands present
```

## Actions
```yaml
# Packet header: BE EF [type] [sizeLo sizeHi] [crcLo crcHi] + payload
# Type 02 = remote-control/direct action (ack 06, fail 15)
# Type 1A = set/get/inc/dec (ack 20 XX XX or 15; CRC computed over full packet)
# Type 10 = status query
# "crc crc" = CRC16 (Modbus) placeholder; must be computed at runtime, then
# placed in bytes 5-6 of header. Compute with CRC field zeroed first.

# ---- 2.1 Remote Control Key Emulation (type 02) ----
- id: power_on
  label: Power On
  kind: action
  command: "BE EF 02 06 00 6B E6 52 01 00 00 00 00"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "BE EF 02 06 00 51 E4 48 01 00 00 00 00"
  params: []

- id: function_f1
  label: Function Button (F1)
  kind: action
  command: "BE EF 02 06 00 F7 EA 0E 01 00 00 00 00"
  params: []

- id: function_f2
  label: Function Button (F2)
  kind: action
  command: "BE EF 02 06 00 26 EB 0F 01 00 00 00 00"
  params: []

- id: function_f3
  label: Function Button (F3)
  kind: action
  command: "BE EF 02 06 00 49 E9 10 01 00 00 00 00"
  params: []

- id: mode
  label: Mode
  kind: action
  command: "BE EF 02 06 00 98 E8 11 01 00 00 00 00"
  params: []

- id: up
  label: Up
  kind: action
  command: "BE EF 02 06 00 DC E7 55 01 00 00 00 00"
  params: []

- id: down
  label: Down
  kind: action
  command: "BE EF 02 06 00 C1 E6 58 01 00 00 00 00"
  params: []

- id: left
  label: Left
  kind: action
  command: "BE EF 02 06 00 EF E7 56 01 00 00 00 00"
  params: []

- id: right
  label: Right
  kind: action
  command: "BE EF 02 06 00 3E E6 57 01 00 00 00 00"
  params: []

- id: enter
  label: Enter
  kind: action
  command: "BE EF 02 06 00 BA E7 53 01 00 00 00 00"
  params: []

- id: source
  label: Source
  kind: action
  command: "BE EF 02 06 00 AB E8 12 01 00 00 00 00"
  params: []

- id: resync
  label: Re-sync
  kind: action
  command: "BE EF 02 06 00 0D E6 54 01 00 00 00 00"
  params: []

- id: menu
  label: Menu
  kind: action
  command: "BE EF 02 06 00 23 E7 5A 01 00 00 00 00"
  params: []

- id: freeze
  label: Freeze
  kind: action
  command: "BE EF 02 06 00 7A E9 13 01 00 00 00 00"
  params: []

- id: aspect_ratio_key
  label: Aspect Ratio (key)
  kind: action
  command: "BE EF 02 06 00 CD E8 14 01 00 00 00 00"
  params: []

- id: information
  label: Information
  kind: action
  command: "BE EF 02 06 00 1C E9 15 01 00 00 00 00"
  params: []

- id: av_mute
  label: AV Mute
  kind: action
  command: "BE EF 02 06 00 2F E9 16 01 00 00 00 00"
  params: []

- id: digital_zoom
  label: Digital Zoom
  kind: action
  command: "BE EF 02 06 00 FE E8 17 01 00 00 00 00"
  params: []

- id: vga_key
  label: VGA (key)
  kind: action
  command: "BE EF 02 06 00 01 E8 18 01 00 00 00 00"
  params: []

- id: hdmi2_key
  label: HDMI2 (key)
  kind: action
  command: "BE EF 02 06 00 D0 E9 19 01 00 00 00 00"
  params: []

- id: hdmi1_key
  label: HDMI1 (key)
  kind: action
  command: "BE EF 02 06 00 E3 E9 1A 01 00 00 00 00"
  params: []

- id: num_1
  label: Number Key 1
  kind: action
  command: "BE EF 02 06 00 67 E8 1E 01 00 00 00 00"
  params: []

- id: num_2
  label: Number Key 2
  kind: action
  command: "BE EF 02 06 00 B6 E9 1F 01 00 00 00 00"
  params: []

- id: num_3
  label: Number Key 3
  kind: action
  command: "BE EF 02 06 00 B9 EC 20 01 00 00 00 00"
  params: []

- id: num_4
  label: Number Key 4
  kind: action
  command: "BE EF 02 06 00 68 ED 21 01 00 00 00 00"
  params: []

- id: num_5
  label: Number Key 5
  kind: action
  command: "BE EF 02 06 00 5B ED 22 01 00 00 00 00"
  params: []

- id: num_6
  label: Number Key 6
  kind: action
  command: "BE EF 02 06 00 8A EC 23 01 00 00 00 00"
  params: []

- id: num_7
  label: Number Key 7
  kind: action
  command: "BE EF 02 06 00 3D ED 24 01 00 00 00 00"
  params: []

- id: num_8
  label: Number Key 8
  kind: action
  command: "BE EF 02 06 00 EC EC 25 01 00 00 00 00"
  params: []

- id: num_9
  label: Number Key 9
  kind: action
  command: "BE EF 02 06 00 DF EC 26 01 00 00 00 00"
  params: []

- id: num_0
  label: Number Key 0
  kind: action
  command: "BE EF 02 06 00 0E ED 27 01 00 00 00 00"
  params: []

# ---- 2.2.2.1 Direct Source Selection (type 02) ----
- id: select_hdmi1
  label: Select HDMI1
  kind: action
  command: "BE EF 02 06 00 D5 E5 4C 01 00 00 00 00"
  params: []

- id: select_hdmi2
  label: Select HDMI2
  kind: action
  command: "BE EF 02 06 00 04 E4 4D 01 00 00 00 00"
  params: []

- id: select_vga
  label: Select VGA
  kind: action
  command: "BE EF 02 06 00 62 E4 4B 01 00 00 00 00"
  params: []

# ---- 2.2.2.2 Display Mode (type 02) ----
- id: display_mode_dynamic
  label: Display Mode Dynamic
  kind: action
  command: "BE EF 02 06 00 EA EB 03 01 00 00 00 00"
  params: []

- id: display_mode_bright
  label: Display Mode Bright
  kind: action
  command: "BE EF 02 06 00 9B F2 A2 01 00 00 00 00"
  params: []

- id: display_mode_cinema
  label: Display Mode Cinema
  kind: action
  command: "BE EF 02 06 00 A8 F2 A1 01 00 00 00 00"
  params: []

- id: display_mode_sport
  label: Display Mode Sport
  kind: action
  command: "BE EF 02 06 00 5D EA 04 01 00 00 00 00"
  params: []

- id: display_mode_natural
  label: Display Mode Natural
  kind: action
  command: "BE EF 02 06 00 8C EB 05 01 00 00 00 00"
  params: []

- id: display_mode_hdr
  label: Display Mode HDR
  kind: action
  command: "BE EF 02 06 00 BF EB 06 01 00 00 00 00"
  params: []

- id: display_mode_user
  label: Display Mode User
  kind: action
  command: "BE EF 02 06 00 4A F3 A3 01 00 00 00 00"
  params: []

- id: display_mode_userhdr
  label: Display Mode UserHDR
  kind: action
  command: "BE EF 02 06 00 FD F2 A4 01 00 00 00 00"
  params: []

- id: display_mode_hlg
  label: Display Mode HLG
  kind: action
  command: "BE EF 02 06 00 29 EE 30 01 00 00 00 00"
  params: []

- id: display_mode_userhlg
  label: Display Mode UserHLG
  kind: action
  command: "BE EF 02 06 00 F8 EF 31 01 00 00 00 00"
  params: []

# ---- HDR Settings (type 02) ----
- id: hdr_auto
  label: HDR Auto
  kind: action
  command: "BE EF 02 06 00 CE F2 A7 01 00 00 00 00"
  params: []

- id: hdr_settings_sdr
  label: HDR Settings SDR
  kind: action
  command: "BE EF 02 06 00 31 F2 A8 01 00 00 00 00"
  params: []

- id: hdr_hlg_1
  label: HDR/HLG 1
  kind: action
  command: "BE EF 02 06 00 E0 F3 A9 01 00 00 00 00"
  params: []

- id: hdr_hlg_2
  label: HDR/HLG 2
  kind: action
  command: "BE EF 02 06 00 D3 F3 AA 01 00 00 00 00"
  params: []

- id: hdr_hlg_3
  label: HDR/HLG 3
  kind: action
  command: "BE EF 02 06 00 02 F2 AB 01 00 00 00 00"
  params: []

- id: hdr_hlg_4
  label: HDR/HLG 4
  kind: action
  command: "BE EF 02 06 00 B5 F3 AC 01 00 00 00 00"
  params: []

# ---- Noise Reduction (type 1A, n=0-3) ----
- id: noise_reduction_inc
  label: Noise Reduction Increment
  kind: action
  command: "BE EF 1A 0C 00 B1 72 1C 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: noise_reduction_dec
  label: Noise Reduction Decrement
  kind: action
  command: "BE EF 1A 0C 00 74 23 1C 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: noise_reduction_get
  label: Noise Reduction Get
  kind: query
  command: "BE EF 1A 0C 00 BE 82 1C 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- Brightness (type 1A, n=-50 - +50) ----
- id: brightness_inc
  label: Brightness Increment
  kind: action
  command: "BE EF 1A 0C 00 5E A3 00 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: brightness_dec
  label: Brightness Decrement
  kind: action
  command: "BE EF 1A 0C 00 9B F2 00 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: brightness_get
  label: Brightness Get
  kind: query
  command: "BE EF 1A 0C 00 51 53 00 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: brightness_set
  label: Brightness Set
  kind: action
  command: "BE EF 1A 0C 00 crc crc 00 00 00 00 {data} 00 00 00 00 00 00 00"
  params:
    - name: data
      type: integer
      description: "Brightness value, -50 to +50 (signed). Compute CRC16 over full packet with CRC bytes zeroed."

# ---- Contrast (type 1A, n=-50 - +50) ----
- id: contrast_inc
  label: Contrast Increment
  kind: action
  command: "BE EF 1A 0C 00 9D 5E 01 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: contrast_dec
  label: Contrast Decrement
  kind: action
  command: "BE EF 1A 0C 00 58 0F 01 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: contrast_get
  label: Contrast Get
  kind: query
  command: "BE EF 1A 0C 00 92 AE 01 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: contrast_set
  label: Contrast Set
  kind: action
  command: "BE EF 1A 0C 00 crc crc 01 00 00 00 {data} 00 00 00 00 00 00 00"
  params:
    - name: data
      type: integer
      description: "Contrast value, -50 to +50 (signed). Compute CRC16 over full packet with CRC bytes zeroed."

# ---- Sharpness (type 1A, n=1-15) ----
- id: sharpness_inc
  label: Sharpness Increment
  kind: action
  command: "BE EF 1A 0C 00 91 52 04 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: sharpness_dec
  label: Sharpness Decrement
  kind: action
  command: "BE EF 1A 0C 00 54 03 04 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: sharpness_get
  label: Sharpness Get
  kind: query
  command: "BE EF 1A 0C 00 9E A2 04 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- Color (type 1A, n=-50 - +50) ----
- id: color_inc
  label: Color Increment
  kind: action
  command: "BE EF 1A 0C 00 5A A7 03 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_dec
  label: Color Decrement
  kind: action
  command: "BE EF 1A 0C 00 9F F6 03 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_get
  label: Color Get
  kind: query
  command: "BE EF 1A 0C 00 55 57 03 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- Tint (type 1A, n=-50 - +50) ----
- id: tint_inc
  label: Tint Increment
  kind: action
  command: "BE EF 1A 0C 00 99 5A 02 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: tint_dec
  label: Tint Decrement
  kind: action
  command: "BE EF 1A 0C 00 5C 0B 02 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: tint_get
  label: Tint Get
  kind: query
  command: "BE EF 1A 0C 00 96 AA 02 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- Gamma (type 1A) ----
- id: gamma_film
  label: Gamma Film
  kind: action
  command: "BE EF 1A 0C 00 4F E7 0B 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []
# UNRESOLVED: other gamma set variants (Video, Graphic, Standard, 1.8, 2.0, 2.4) obscured in source extraction

# ---- Color Temperature (type 1A) ----
- id: color_temperature_on
  label: Color Temperature On
  kind: action
  command: "BE EF 1A 0C 00 A3 06 13 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_d55
  label: Color Temperature D55
  kind: action
  command: "BE EF 1A 0C 00 11 DF 39 00 00 00 02 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_d65
  label: Color Temperature D65
  kind: action
  command: "BE EF 1A 0C 00 7B 1F 39 00 00 00 0B 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_d75
  label: Color Temperature D75
  kind: action
  command: "BE EF 1A 0C 00 44 DF 39 00 00 00 0E 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_d83
  label: Color Temperature D83
  kind: action
  command: "BE EF 1A 0C 00 04 9F 39 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_d93
  label: Color Temperature D93
  kind: action
  command: "BE EF 1A 0C 00 C8 5E 39 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_native
  label: Color Temperature Native
  kind: action
  command: "BE EF 1A 0C 00 DD 1E 39 00 00 00 03 00 00 00 00 00 00 00"
  params: []

# ---- Color Gamut (type 1A) ----
- id: color_gamut_native
  label: Color Gamut Native
  kind: action
  command: "BE EF 1A 0C 00 68 FE 41 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_gamut_hdtv
  label: Color Gamut HDTV
  kind: action
  command: "BE EF 1A 0C 00 A4 3F 41 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: color_gamut_user
  label: Color Gamut User
  kind: action
  command: "BE EF 1A 0C 00 CE FF 41 00 00 00 08 00 00 00 00 00 00 00"
  params: []

- id: color_gamut_cinema
  label: Color Gamut Cinema
  kind: action
  command: "BE EF 1A 0C 00 02 3E 41 00 00 00 09 00 00 00 00 00 00 00"
  params: []

- id: color_gamut_lcc
  label: Color Gamut LCC
  kind: action
  command: "BE EF 1A 0C 00 17 7E 41 00 00 00 0A 00 00 00 00 00 00 00"
  params: []

# ---- CMS Color Select (type 1A) ----
- id: cms_red
  label: CMS Red
  kind: action
  command: "BE EF 1A 0C 00 1F B7 37 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: cms_green
  label: CMS Green
  kind: action
  command: "BE EF 1A 0C 00 D3 76 37 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: cms_blue
  label: CMS Blue
  kind: action
  command: "BE EF 1A 0C 00 C6 36 37 00 00 00 02 00 00 00 00 00 00 00"
  params: []

- id: cms_cyan
  label: CMS Cyan
  kind: action
  command: "BE EF 1A 0C 00 0A F7 37 00 00 00 03 00 00 00 00 00 00 00"
  params: []

- id: cms_yellow
  label: CMS Yellow
  kind: action
  command: "BE EF 1A 0C 00 EC B6 37 00 00 00 04 00 00 00 00 00 00 00"
  params: []

- id: cms_magenta
  label: CMS Magenta
  kind: action
  command: "BE EF 1A 0C 00 20 77 37 00 00 00 05 00 00 00 00 00 00 00"
  params: []

- id: cms_white
  label: CMS White
  kind: action
  command: "BE EF 1A 0C 00 35 37 37 00 00 00 06 00 00 00 00 00 00 00"
  params: []

# ---- CMS xOffset (type 1A, n=-50 - +50) ----
- id: cms_xoffset_inc
  label: CMS xOffset Increment
  kind: action
  command: "BE EF 1A 0C 00 06 FB 3A 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: cms_xoffset_dec
  label: CMS xOffset Decrement
  kind: action
  command: "BE EF 1A 0C 00 C3 AA 3A 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: cms_xoffset_get
  label: CMS xOffset Get
  kind: query
  command: "BE EF 1A 0C 00 09 0B 3A 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- Clock (type 1A, n=-50 - +50, depends on signal) ----
- id: clock_dec
  label: Clock Decrement
  kind: action
  command: "BE EF 1A 0C 00 3C 6B 2A 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: clock_get
  label: Clock Get
  kind: query
  command: "BE EF 1A 0C 00 F6 CA 2A 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- Phase (type 1A, n=0 - +31, depends on signal) ----
- id: phase_inc
  label: Phase Increment
  kind: action
  command: "BE EF 1A 0C 00 3A C7 2B 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: phase_dec
  label: Phase Decrement
  kind: action
  command: "BE EF 1A 0C 00 FF 96 2B 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: phase_get
  label: Phase Get
  kind: query
  command: "BE EF 1A 0C 00 35 37 2B 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- H Position (type 1A, n=-50 - +50, depends on signal) ----
- id: h_position_inc
  label: H Position Increment
  kind: action
  command: "BE EF 1A 0C 00 F1 32 2C 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: h_position_dec
  label: H Position Decrement
  kind: action
  command: "BE EF 1A 0C 00 34 63 2C 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: h_position_get
  label: H Position Get
  kind: query
  command: "BE EF 1A 0C 00 FE C2 2C 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- V Position (type 1A, n=-50 - +50, depends on signal) ----
- id: v_position_inc
  label: V Position Increment
  kind: action
  command: "BE EF 1A 0C 00 32 CF 2D 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: v_position_dec
  label: V Position Decrement
  kind: action
  command: "BE EF 1A 0C 00 F7 9E 2D 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: v_position_get
  label: V Position Get
  kind: query
  command: "BE EF 1A 0C 00 3D 3F 2D 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- Auto Adaptive Contrast (type 1A) ----
- id: auto_adaptive_contrast_on
  label: Auto Adaptive Contrast On
  kind: action
  command: "BE EF 1A 0C 00 AB 0E 15 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: auto_adaptive_contrast_off
  label: Auto Adaptive Contrast Off
  kind: action
  command: "BE EF 1A 0C 00 67 CF 15 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- Super Hybrid Mode (type 1A) ----
- id: super_hybrid_off
  label: Super Hybrid Mode Off
  kind: action
  command: "BE EF 1A 0C 00 64 F2 44 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: super_hybrid_standard
  label: Super Hybrid Mode Standard
  kind: action
  command: "BE EF 1A 0C 00 A8 33 44 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: super_hybrid_enhanced
  label: Super Hybrid Mode Enhanced
  kind: action
  command: "BE EF 1A 0C 00 BD 73 44 00 00 00 02 00 00 00 00 00 00 00"
  params: []

- id: super_hybrid_deep_black
  label: Super Hybrid Mode Deep Black
  kind: action
  command: "BE EF 1A 0C 00 71 B2 44 00 00 00 03 00 00 00 00 00 00 00"
  params: []

# ---- Lamp Power (type 1A) ----
- id: lamp_power_100
  label: Lamp Power 100%
  kind: action
  command: "BE EF 1A 0C 00 6C FA 42 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: lamp_power_95
  label: Lamp Power 95%
  kind: action
  command: "BE EF 1A 0C 00 A0 3B 42 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: lamp_power_90
  label: Lamp Power 90%
  kind: action
  command: "BE EF 1A 0C 00 B5 7B 42 00 00 00 02 00 00 00 00 00 00 00"
  params: []

# ---- Enhanced Details (type 1A) ----
- id: enhanced_details_off
  label: Enhanced Details Off
  kind: action
  command: "BE EF 1A 0C 00 97 3F 51 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: enhanced_details_1
  label: Enhanced Details 1
  kind: action
  command: "BE EF 1A 0C 00 5B FE 51 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: enhanced_details_2
  label: Enhanced Details 2
  kind: action
  command: "BE EF 1A 0C 00 4E BE 51 00 00 00 02 00 00 00 00 00 00 00"
  params: []

- id: enhanced_details_3
  label: Enhanced Details 3
  kind: action
  command: "BE EF 1A 0C 00 82 7F 51 00 00 00 03 00 00 00 00 00 00 00"
  params: []

# ---- Enhanced Advanced Colors (type 1A) ----
- id: enhanced_colors_off
  label: Enhanced Advanced Colors Off
  kind: action
  command: "BE EF 1A 0C 00 93 3B 52 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: enhanced_colors_1
  label: Enhanced Advanced Colors 1
  kind: action
  command: "BE EF 1A 0C 00 5F FA 52 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: enhanced_colors_2
  label: Enhanced Advanced Colors 2
  kind: action
  command: "BE EF 1A 0C 00 4A BA 52 00 00 00 02 00 00 00 00 00 00 00"
  params: []

- id: enhanced_colors_3
  label: Enhanced Advanced Colors 3
  kind: action
  command: "BE EF 1A 0C 00 86 7B 52 00 00 00 03 00 00 00 00 00 00 00"
  params: []

- id: enhanced_colors_4
  label: Enhanced Advanced Colors 4
  kind: action
  command: "BE EF 1A 0C 00 60 3A 52 00 00 00 04 00 00 00 00 00 00 00"
  params: []

- id: enhanced_colors_5
  label: Enhanced Advanced Colors 5
  kind: action
  command: "BE EF 1A 0C 00 AC FB 52 00 00 00 05 00 00 00 00 00 00 00"
  params: []

# ---- Motion Compensation (type 1A) ----
- id: motion_compensation_off
  label: Motion Compensation Off
  kind: action
  command: "BE EF 1A 0C 00 83 2B 5E 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: motion_compensation_1
  label: Motion Compensation 1
  kind: action
  command: "BE EF 1A 0C 00 4F EA 5E 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: motion_compensation_2
  label: Motion Compensation 2
  kind: action
  command: "BE EF 1A 0C 00 5A AA 5E 00 00 00 02 00 00 00 00 00 00 00"
  params: []

- id: motion_compensation_3
  label: Motion Compensation 3
  kind: action
  command: "BE EF 1A 0C 00 96 6B 5E 00 00 00 03 00 00 00 00 00 00 00"
  params: []

# ---- Image Reset (type 1A) ----
- id: image_reset
  label: Image Reset
  kind: action
  command: "BE EF 1A 0C 00 AF 07 43 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- Aspect Ratio (type 02) ----
- id: aspect_4_3
  label: Aspect Ratio 4:3
  kind: action
  command: "BE EF 02 06 00 2A F4 83 01 00 00 00 00"
  params: []

- id: aspect_16_9
  label: Aspect Ratio 16:9
  kind: action
  command: "BE EF 02 06 00 7F F4 86 01 00 00 00 00"
  params: []

- id: aspect_lbx
  label: Aspect Ratio LBX
  kind: action
  command: "BE EF 02 06 00 4C F4 85 01 00 00 00 00"
  params: []

- id: aspect_superwide
  label: Aspect Ratio SuperWide
  kind: action
  command: "BE EF 02 06 00 9D E4 44 01 00 00 00 00"
  params: []

- id: aspect_native
  label: Aspect Ratio Native
  kind: action
  command: "BE EF 02 06 00 AE F5 87 01 00 00 00 00"
  params: []

- id: aspect_auto
  label: Aspect Ratio Auto
  kind: action
  command: "BE EF 02 06 00 4C E5 45 01 00 00 00 00"
  params: []

# ---- Edge Mask (type 1A, n=0-10) ----
- id: edge_mask_inc
  label: Edge Mask Increment
  kind: action
  command: "BE EF 1A 0C 00 66 9B 12 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: edge_mask_dec
  label: Edge Mask Decrement
  kind: action
  command: "BE EF 1A 0C 00 A3 CA 12 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []
# UNRESOLVED: edge_mask_get command partially obscured in extraction

# ---- H Image Shift (type 1A) ----
- id: h_image_shift_set
  label: H Image Shift Set
  kind: action
  command: "BE EF 1A 0C 00 crc crc 16 00 00 00 {data} {data} 00 00 00 00 00 00"
  params:
    - name: data
      type: integer
      description: "H image shift value. Compute CRC16 over full packet with CRC bytes zeroed."

- id: h_image_shift_get
  label: H Image Shift Get
  kind: query
  command: "BE EF 1A 0C 00 A6 9A 16 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: h_image_shift_inc
  label: H Image Shift Increment
  kind: action
  command: "BE EF 1A 0C 00 6A 97 17 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: h_image_shift_dec
  label: H Image Shift Decrement
  kind: action
  command: "BE EF 1A 0C 00 AF C6 17 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- V Image Shift (type 1A, n=-100 - +100) ----
- id: v_image_shift_set
  label: V Image Shift Set
  kind: action
  command: "BE EF 1A 0C 00 crc crc 17 00 00 00 {data} {data} 00 00 00 00 00 00"
  params:
    - name: data
      type: integer
      description: "V image shift value, -100 to +100. Compute CRC16 over full packet with CRC bytes zeroed."

- id: v_image_shift_get
  label: V Image Shift Get
  kind: query
  command: "BE EF 1A 0C 00 65 67 17 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

# ---- 2.2.2.3 Setup Menu ----
# Projection (type 1A)
- id: projection_front_desktop
  label: Projection Front-Desktop
  kind: action
  command: "BE EF 1A 0C 00 01 CF 35 00 00 00 02 00 00 00 00 00 00 00"
  params: []

- id: projection_rear_desktop
  label: Projection Rear-Desktop
  kind: action
  command: "BE EF 1A 0C 00 D8 4E 35 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: projection_front_ceiling
  label: Projection Front-Ceiling
  kind: action
  command: "BE EF 1A 0C 00 14 8F 35 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: projection_rear_ceiling
  label: Projection Rear-Ceiling
  kind: action
  command: "BE EF 1A 0C 00 CD 0E 35 00 00 00 03 00 00 00 00 00 00 00"
  params: []

# Direct Power On (type 1A)
- id: direct_power_on
  label: Direct Power On
  kind: action
  command: "BE EF 1A 0C 00 7B DE 49 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: direct_power_on_off
  label: Direct Power On Off
  kind: action
  command: "BE EF 1A 0C 00 B7 1F 49 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# Auto Power Off (min) (type 1A, n=0-180, 5 min steps)
- id: auto_power_off_inc
  label: Auto Power Off Increment
  kind: action
  command: "BE EF 1A 0C 00 3E C3 28 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: auto_power_off_dec
  label: Auto Power Off Decrement
  kind: action
  command: "BE EF 1A 0C 00 FB 92 28 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: auto_power_off_get
  label: Auto Power Off Get
  kind: query
  command: "BE EF 1A 0C 00 31 33 28 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

# Sleep Timer (min) (type 1A, n=0-990, 30 min steps)
- id: sleep_timer_inc
  label: Sleep Timer Increment
  kind: action
  command: "BE EF 1A 0C 00 79 BA 4A 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: sleep_timer_dec
  label: Sleep Timer Decrement
  kind: action
  command: "BE EF 1A 0C 00 BC EB 4A 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: sleep_timer_get
  label: Sleep Timer Get
  kind: query
  command: "BE EF 1A 0C 00 76 4A 4A 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

# Power Mode (Standby) (type 1A)
- id: power_mode_active
  label: Power Mode Active (Standby)
  kind: action
  command: "BE EF 1A 0C 00 70 E6 4B 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: power_mode_eco
  label: Power Mode Eco (<0.5W)
  kind: action
  command: "BE EF 1A 0C 00 BC 27 4B 00 00 00 01 00 00 00 00 00 00 00"
  params: []

# Security Timer (type 1A, parameterized: mm dd hh)
- id: security_timer_set
  label: Security Timer Set
  kind: action
  command: "BE EF 1A 0C 00 crc crc 4C 00 00 00 {mm} {dd} {hh} 00 00 00 00 00"
  params:
    - name: mm
      type: integer
      description: "Month (00-12)"
    - name: dd
      type: integer
      description: "Day (00-30)"
    - name: hh
      type: integer
      description: "Hour (00-24). Compute CRC16 over full packet with CRC bytes zeroed."

# Security (type 1A)
- id: security_on
  label: Security On
  kind: action
  command: "BE EF 1A 0C 00 E5 3C 81 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: security_off
  label: Security Off
  kind: action
  command: "BE EF 1A 0C 00 29 FD 81 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# Test Pattern (type 1A)
- id: test_pattern_off
  label: Test Pattern Off
  kind: action
  command: "BE EF 1A 0C 00 78 EE 4D 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: test_pattern_grid_green
  label: Test Pattern Grid (Green)
  kind: action
  command: "BE EF 1A 0C 00 B4 2F 4D 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: test_pattern_grid_magenta
  label: Test Pattern Grid (Magenta)
  kind: action
  command: "BE EF 1A 0C 00 A1 6F 4D 00 00 00 02 00 00 00 00 00 00 00"
  params: []

- id: test_pattern_grid_white
  label: Test Pattern Grid (White)
  kind: action
  command: "BE EF 1A 0C 00 6D AE 4D 00 00 00 03 00 00 00 00 00 00 00"
  params: []

- id: test_pattern_white
  label: Test Pattern White
  kind: action
  command: "BE EF 1A 0C 00 8B EF 4D 00 00 00 04 00 00 00 00 00 00 00"
  params: []

# IR Function (type 1A)
- id: ir_function_on
  label: IR Function On
  kind: action
  command: "BE EF 1A 0C 00 2B 83 20 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: ir_function_front
  label: IR Function Front
  kind: action
  command: "BE EF 1A 0C 00 E7 42 20 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: ir_function_top
  label: IR Function Top
  kind: action
  command: "BE EF 1A 0C 00 F2 02 20 00 00 00 02 00 00 00 00 00 00 00"
  params: []

- id: ir_function_off
  label: IR Function Off
  kind: action
  command: "BE EF 1A 0C 00 3E C3 20 00 00 00 03 00 00 00 00 00 00 00"
  params: []

# F1/F2/F3 Remote assignment (type 1A, parameterized)
- id: f1_remote_set
  label: F1 Remote Set
  kind: action
  command: "BE EF 1A 0C 00 crc crc 82 00 00 00 {xx} 00 00 00 00 00 00 00"
  params:
    - name: xx
      type: integer
      description: "Assigned function code. Compute CRC16 over full packet with CRC bytes zeroed."

- id: f2_remote_set
  label: F2 Remote Set
  kind: action
  command: "BE EF 1A 0C 00 crc crc 83 00 00 00 {xx} 00 00 00 00 00 00 00"
  params:
    - name: xx
      type: integer
      description: "Assigned function code. Compute CRC16 over full packet with CRC bytes zeroed."

- id: f3_remote_set
  label: F3 Remote Set
  kind: action
  command: "BE EF 1A 0C 00 crc crc 84 00 00 00 {xx} 00 00 00 00 00 00 00"
  params:
    - name: xx
      type: integer
      description: "Assigned function code. Compute CRC16 over full packet with CRC bytes zeroed."

# 12V Trigger (type 1A)
- id: trigger_12v_off
  label: 12V Trigger Off
  kind: action
  command: "BE EF 1A 0C 00 54 C2 50 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: trigger_12v_on
  label: 12V Trigger On
  kind: action
  command: "BE EF 1A 0C 00 98 03 50 00 00 00 01 00 00 00 00 00 00 00"
  params: []

# Language (type 1A)
- id: language_english
  label: Language English
  kind: action
  command: "BE EF 1A 0C 00 2F 87 23 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: language_french
  label: Language French
  kind: action
  command: "BE EF 1A 0C 00 F6 06 23 00 00 00 02 00 00 00 00 00 00 00"
  params: []

- id: language_german
  label: Language German
  kind: action
  command: "BE EF 1A 0C 00 E3 46 23 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: language_portuguese
  label: Language Portuguese
  kind: action
  command: "BE EF 1A 0C 00 10 47 23 00 00 00 05 00 00 00 00 00 00 00"
  params: []

- id: language_simplified_chinese
  label: Language Simplified Chinese
  kind: action
  command: "BE EF 1A 0C 00 A3 06 23 00 00 00 0E 00 00 00 00 00 00 00"
  params: []

- id: language_italian
  label: Language Italian
  kind: action
  command: "BE EF 1A 0C 00 3A C7 23 00 00 00 03 00 00 00 00 00 00 00"
  params: []

- id: language_russian
  label: Language Russian
  kind: action
  command: "BE EF 1A 0C 00 45 47 23 00 00 00 09 00 00 00 00 00 00 00"
  params: []

# Menu Location (type 1A)
- id: menu_location_top_left
  label: Menu Location Top Left
  kind: action
  command: "BE EF 1A 0C 00 C7 6F 6D 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: menu_location_top_right
  label: Menu Location Top Right
  kind: action
  command: "BE EF 1A 0C 00 0B AE 6D 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: menu_location_centre
  label: Menu Location Centre
  kind: action
  command: "BE EF 1A 0C 00 1E EE 6D 00 00 00 02 00 00 00 00 00 00 00"
  params: []

- id: menu_location_bottom_left
  label: Menu Location Bottom Left
  kind: action
  command: "BE EF 1A 0C 00 D2 2F 6D 00 00 00 03 00 00 00 00 00 00 00"
  params: []

- id: menu_location_bottom_right
  label: Menu Location Bottom Right
  kind: action
  command: "BE EF 1A 0C 00 34 6E 6D 00 00 00 04 00 00 00 00 00 00 00"
  params: []

# Menu Timer (type 1A)
- id: menu_timer_off
  label: Menu Timer Off
  kind: action
  command: "BE EF 1A 0C 00 C3 6B 6E 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: menu_timer_5sec
  label: Menu Timer 5sec
  kind: action
  command: "BE EF 1A 0C 00 0F AA 6E 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: menu_timer_10sec
  label: Menu Timer 10sec
  kind: action
  command: "BE EF 1A 0C 00 1A EA 6E 00 00 00 02 00 00 00 00 00 00 00"
  params: []

# Auto Source (type 1A)
- id: auto_source_off
  label: Auto Source Off
  kind: action
  command: "BE EF 1A 0C 00 00 96 6F 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: auto_source_on
  label: Auto Source On
  kind: action
  command: "BE EF 1A 0C 00 CC 57 6F 00 00 00 01 00 00 00 00 00 00 00"
  params: []

# High Altitude (type 1A)
- id: high_altitude_off
  label: High Altitude Off
  kind: action
  command: "BE EF 1A 0C 00 23 8B 26 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: high_altitude_on
  label: High Altitude On
  kind: action
  command: "BE EF 1A 0C 00 EF 4A 26 00 00 00 01 00 00 00 00 00 00 00"
  params: []

# Background Color (type 1A)
- id: background_color_none
  label: Background Color None
  kind: action
  command: "BE EF 1A 0C 00 B3 16 1F 00 00 00 01 00 00 00 00 00 00 00"
  params: []

- id: background_color_blue
  label: Background Color Blue
  kind: action
  command: "BE EF 1A 0C 00 7F D7 1F 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: background_color_red
  label: Background Color Red
  kind: action
  command: "BE EF 1A 0C 00 6A 97 1F 00 00 00 03 00 00 00 00 00 00 00"
  params: []

- id: background_color_green
  label: Background Color Green
  kind: action
  command: "BE EF 1A 0C 00 8C D6 1F 00 00 00 04 00 00 00 00 00 00 00"
  params: []

- id: background_color_gray
  label: Background Color Gray
  kind: action
  command: "BE EF 1A 0C 00 A6 56 1F 00 00 00 02 00 00 00 00 00 00 00"
  params: []

# HDMI Setting EDID (type 1A)
- id: hdmi_edid_1
  label: HDMI EDID 1
  kind: action
  command: "BE EF 1A 0C 00 20 B6 77 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: hdmi_edid_2
  label: HDMI EDID 2
  kind: action
  command: "BE EF 1A 0C 00 EC 77 77 00 00 00 01 00 00 00 00 00 00 00"
  params: []

# HDMI1 EQ (type 1A, 1~7, parameterized)
- id: hdmi1_eq_set
  label: HDMI1 EQ Set
  kind: action
  command: "BE EF 1A 0C 00 crc crc 85 00 00 00 {data} 00 00 00 00 00 00 00"
  params:
    - name: data
      type: integer
      description: "EQ value 1-7. Compute CRC16 over full packet with CRC bytes zeroed."

- id: hdmi1_eq_get
  label: HDMI1 EQ Get
  kind: query
  command: "BE EF 1A 0C 00 23 5D 85 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: hdmi1_eq_inc
  label: HDMI1 EQ Increment
  kind: action
  command: "BE EF 1A 0C 00 2C AD 85 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: hdmi1_eq_dec
  label: HDMI1 EQ Decrement
  kind: action
  command: "BE EF 1A 0C 00 E9 FC 85 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

# HDMI2 EQ (type 1A, 1~7, parameterized)
- id: hdmi2_eq_set
  label: HDMI2 EQ Set
  kind: action
  command: "BE EF 1A 0C 00 crc crc 86 00 00 00 {data} 00 00 00 00 00 00 00"
  params:
    - name: data
      type: integer
      description: "EQ value 1-7. Compute CRC16 over full packet with CRC bytes zeroed."

- id: hdmi2_eq_get
  label: HDMI2 EQ Get
  kind: query
  command: "BE EF 1A 0C 00 27 59 86 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: hdmi2_eq_inc
  label: HDMI2 EQ Increment
  kind: action
  command: "BE EF 1A 0C 00 28 A9 86 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: hdmi2_eq_dec
  label: HDMI2 EQ Decrement
  kind: action
  command: "BE EF 1A 0C 00 ED F8 86 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

# Detail Filter (type 1A, 0~2, parameterized)
- id: detail_filter_set
  label: Detail Filter Set
  kind: action
  command: "BE EF 1A 0C 00 crc crc 88 00 00 00 {data} 00 00 00 00 00 00 00"
  params:
    - name: data
      type: integer
      description: "Filter value 0-2. Compute CRC16 over full packet with CRC bytes zeroed."

- id: detail_filter_get
  label: Detail Filter Get
  kind: query
  command: "BE EF 1A 0C 00 F0 B0 88 00 01 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: detail_filter_inc
  label: Detail Filter Increment
  kind: action
  command: "BE EF 1A 0C 00 FF 40 88 00 02 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: detail_filter_dec
  label: Detail Filter Decrement
  kind: action
  command: "BE EF 1A 0C 00 3A 11 88 00 03 00 00 00 00 00 00 00 00 00 00"
  params: []

# Reset (type 02)
- id: reset_osd
  label: Reset OSD
  kind: action
  command: "BE EF 02 06 00 1F E2 66 01 00 00 00 00"
  params: []

- id: reset_to_default
  label: Reset to Default
  kind: action
  command: "BE EF 02 06 00 A1 E1 78 01 00 00 00 00"
  params: []

# ---- 2.2.2.4 Network Menu (type 1A, larger payload 0C 00 ... 18 bytes) ----
- id: lan_dhcp_off
  label: LAN DHCP Off
  kind: action
  command: "BE EF 1A 0C 00 F3 5B 7A 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: lan_dhcp_on
  label: LAN DHCP On
  kind: action
  command: "BE EF 1A 0C 00 3F 9A 7A 00 00 00 01 00 00 00 00 00 00 00 00 00"
  params: []

- id: crestron_control_off
  label: Crestron Control Off
  kind: action
  command: "BE EF 1A 0C 00 30 A6 7B 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: crestron_control_on
  label: Crestron Control On
  kind: action
  command: "BE EF 1A 0C 00 FC 67 7B 00 00 00 01 00 00 00 00 00 00 00 00 00"
  params: []

- id: extron_control_off
  label: Extron Control Off
  kind: action
  command: "BE EF 1A 0C 00 FB 53 7C 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: extron_control_on
  label: Extron Control On
  kind: action
  command: "BE EF 1A 0C 00 37 92 7C 00 00 00 01 00 00 00 00 00 00 00 00 00"
  params: []

- id: pjlink_control_off
  label: PJ Link Control Off
  kind: action
  command: "BE EF 1A 0C 00 38 AE 7D 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: pjlink_control_on
  label: PJ Link Control On
  kind: action
  command: "BE EF 1A 0C 00 F4 6F 7D 00 00 00 01 00 00 00 00 00 00 00 00 00"
  params: []

- id: amx_device_discovery_off
  label: AMX Device Discovery Off
  kind: action
  command: "BE EF 1A 0C 00 3C AA 7E 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: amx_device_discovery_on
  label: AMX Device Discovery On
  kind: action
  command: "BE EF 1A 0C 00 F0 6B 7E 00 00 00 01 00 00 00 00 00 00 00 00 00"
  params: []

- id: http_control_off
  label: HTTP Control Off
  kind: action
  command: "BE EF 1A 0C 00 EA 00 80 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: http_control_on
  label: HTTP Control On
  kind: action
  command: "BE EF 1A 0C 00 26 C1 80 00 00 00 01 00 00 00 00 00 00 00 00 00"
  params: []

- id: telnet_control_off
  label: Telnet Control Off
  kind: action
  command: "BE EF 1A 0C 00 31 E5 8B 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: telnet_control_on
  label: Telnet Control On
  kind: action
  command: "BE EF 1A 0C 00 FD 24 8B 00 00 00 01 00 00 00 00 00 00 00 00 00"
  params: []

# ---- 2.3 Status Queries (type 10) ----
- id: projector_status_query
  label: Projector Status Query
  kind: query
  command: "BE EF 10 0A 00 34 B7 01 01 00 01 01 15 01 00 00 02"
  params: []

- id: signal_status_query
  label: Signal Status Query
  kind: query
  command: "BE EF 10 0A 00 33 37 01 01 00 01 01 15 01 00 00 08"
  params: []

- id: lamp_status_query
  label: Lamp Status Query
  kind: query
  command: "BE EF 10 0A 00 A9 36 01 01 00 01 01 15 01 00 01 10"
  params: []

- id: generic_info_query
  label: Generic Info Query
  kind: query
  command: "BE EF 10 0A 00 9F 97 01 01 06 00 01 15 01 FF FF FF"
  params: []
```

## Feedbacks
```yaml
# Pass response for type 02 / ack commands: single byte 0x06
- id: command_ack
  type: raw
  values: ["06"]
  description: "Acknowledgement byte returned when a command is successfully executed (ack-only response)."

# Fail response: single byte 0x15
- id: command_fail
  type: raw
  values: ["15"]
  description: "Fail byte returned when the projector cannot execute the command."

# Pass response for type 1A (set/get/inc/dec): 20 XX XX (3 bytes; word value LSB first)
- id: parameter_response
  type: raw
  values: ["20 XX XX"]
  description: "Three-byte pass response; bytes 2-3 hold the 16-bit parameter value (LSB first)."

# Projector Status (byte 21 of projector_status_query response): On=01
- id: projector_state
  type: enum
  values: [on, standby]
  description: "On = 0x01. No response when in Standby."

# Signal Status (byte 21 of signal_status_query response)
- id: signal_state
  type: enum
  values: [ok, no_signal]
  mapping: {ok: "00", no_signal: "01"}

# Current Input (byte 24 of signal_status_query response)
- id: current_input
  type: enum
  values: [vga, hdmi1, hdmi2, hdmi3, displayport]
  mapping: {vga: "05", hdmi1: "12", hdmi2: "13", hdmi3: "14", displayport: "15"}

# Lamp Status (byte 25 of lamp_status_query response)
- id: lamp_state
  type: enum
  values: [off, on]
  mapping: {off: "00", on: "02"}

# Unit Working Hours (bytes 21-23 of lamp_status_query response)
- id: unit_working_hours
  type: integer
  description: "Hex representation of working hours (3 bytes)."

# Lamp Working Hours (bytes 25-27 of lamp_status_query response)
- id: lamp_working_hours
  type: integer
  description: "Hex representation of lamp working hours (3 bytes)."

# Generic info response includes (excerpt): input source, signal status, test pattern,
# lamp on/off, serial number, FW versions, H/V freq, H/V res, sync info, display mode,
# color temperature, color gamut, brilliant color, aspect, gamma, color space,
# ultra detail, pure color, pure motion, dynamic contrast, spoke white, lamp hours,
# projection hours.
# UNRESOLVED: full generic-info field map is large and partially garbled in extraction;
# see Notes for documented byte meanings.
```

## Variables
```yaml
# Settable continuous parameters exposed via type 1A Set/Inc/Dec/Get commands.
- id: brightness
  type: integer
  range: [-50, 50]
  description: "Display brightness."

- id: contrast
  type: integer
  range: [-50, 50]
  description: "Display contrast."

- id: sharpness
  type: integer
  range: [1, 15]
  description: "Display sharpness."

- id: color
  type: integer
  range: [-50, 50]
  description: "Color level."

- id: tint
  type: integer
  range: [-50, 50]
  description: "Tint level."

- id: noise_reduction
  type: integer
  range: [0, 3]
  description: "Noise reduction level."

- id: edge_mask
  type: integer
  range: [0, 10]
  description: "Edge mask amount."

- id: h_image_shift
  type: integer
  description: "Horizontal image shift. UNRESOLVED: exact range not clearly stated."

- id: v_image_shift
  type: integer
  range: [-100, 100]
  description: "Vertical image shift."

- id: auto_power_off
  type: integer
  range: [0, 180]
  description: "Auto power off timer in minutes (5 min steps)."

- id: sleep_timer
  type: integer
  range: [0, 990]
  description: "Sleep timer in minutes (30 min steps)."

- id: hdmi1_eq
  type: integer
  range: [1, 7]
  description: "HDMI1 cable equalization."

- id: hdmi2_eq
  type: integer
  range: [1, 7]
  description: "HDMI2 cable equalization."

- id: detail_filter
  type: integer
  range: [0, 2]
  description: "Detail filter level."

- id: cms_xoffset
  type: integer
  range: [-50, 50]
  description: "CMS xOffset."
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited event/notification packets.
# The protocol is request/response only. Event packet size (13 bytes) is mentioned
# in the header description but no event packet contents are documented.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "When unit is switched on from Standby, wait 15 seconds before sending commands or reading responses."
  - description: "Command execution time may vary 0.1-2.0 seconds; allow sufficient time between successive commands or the projector may drop commands when busy."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing
# requirements beyond the standby timing note are stated in the source.
```

## Notes
- Protocol is binary/hex only; ASCII mode is **not** supported. No termination character (`<LF>`, `<CR>`, `<EOT>`) must be appended.
- Packet header is fixed 7 bytes: `BE EF` (sync, LSB-first) + packet type (1B) + payload size (2B, LSB first) + CRC16 (2B). `BE EF` alignment marker guards against dropped/partial packets.
- CRC is Modbus CRC16 over the entire packet (header + payload). To compute: zero the CRC field (bytes 5-6), run the lookup-table algorithm, place result LSB-first into bytes 5-6. Worked example from source: set brightness +20 (`0x14`) → final packet `BE EF 1A 0C 00 6B 02 00 00 00 00 14 00 00 00 00 00 00 00`, response `20 14 00`.
- Three response types: (1) ack-only Pass = `06`; (2) value Pass = `20 XX XX` (for set/get/inc/dec); (3) Fail = `15`.
- Type 10 status-query responses are prefixed with `1E`, echo the sent command (bytes 1-17 minus CRC), then 3 error bytes (bytes 18-20; `00 00 00` = valid), then data bytes.
- Projector does not respond to status commands while in Standby.
- Generic info query response carries a large structured payload; documented field meanings (from source): byte A = input source, byte B = signal status, byte E = test pattern, byte F = lamp on/off, 18 bytes serial number, FW version groups (MST, MCU, MST7410, DDP4422), H/V freq, H/V res, sync info bitmask, display mode, color temperature, color gamut, brilliant color, aspect, gamma, color space, ultra detail, pure color, pure motion, dynamic contrast, spoke white, lamp hours, projection hours.
- The Network menu commands (Crestron/Extron/PJ Link/AMX/HTTP/Telnet enable-disable) are serial commands that toggle the projector's network control *services*; they do not change the transport of this serial protocol itself.
- <!-- UNRESOLVED: Several display-menu command tables (gamma variants beyond Film, additional CMS adjust axes, and some middle rows) were garbled during PDF text extraction and could not be transcribed with confidence. A re-extraction from the original PDF with table-aware tooling is recommended to recover the full command set. -->
- <!-- UNRESOLVED: firmware version compatibility not stated in source. -->
- <!-- UNRESOLVED: protocol version noted as "Rev. 1.0 (21 December 2020)" of the document; device firmware protocol version not separately stated. -->

## Provenance

```yaml
source_domains:
  - screenprofessional.de
source_urls:
  - https://screenprofessional.de/wp-content/uploads/2024/07/CRYSTAL4_SH__RS232_communication_protocol_vers.1.0.pdf
retrieved_at: 2026-06-29T19:46:51.005Z
last_checked_at: 2026-06-30T07:12:10.878Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:12:10.878Z
matched_actions: 232
action_count: 232
confidence: medium
summary: "All 232 spec actions verified against source document; complete bidirectional coverage with wire-literal command matching. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PDF extraction garbled several multi-column command tables (display menu middle sections, parts of setup menu); some rows below are transcribed from readable portions. Lines marked UNRESOLVED in commands indicate payload bytes obscured in extraction."
- "other gamma set variants (Video, Graphic, Standard, 1.8, 2.0, 2.4) obscured in source extraction"
- "edge_mask_get command partially obscured in extraction"
- "full generic-info field map is large and partially garbled in extraction;"
- "exact range not clearly stated.\""
- "source documents no unsolicited event/notification packets."
- "source documents no multi-step macro sequences."
- "no explicit safety interlock procedures or power-on sequencing"
- "Several display-menu command tables (gamma variants beyond Film, additional CMS adjust axes, and some middle rows) were garbled during PDF text extraction and could not be transcribed with confidence. A re-extraction from the original PDF with table-aware tooling is recommended to recover the full command set."
- "firmware version compatibility not stated in source."
- "protocol version noted as \"Rev. 1.0 (21 December 2020)\" of the document; device firmware protocol version not separately stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
