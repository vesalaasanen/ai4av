---
spec_id: admin/lexicon-mc-10
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lexicon MC-10 Control Spec"
manufacturer: Lexicon
model_family: MC-10
aliases: []
compatible_with:
  manufacturers:
    - Lexicon
  models:
    - MC-10
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lexicondsp.pl
  - manualslib.com
source_urls:
  - https://www.lexicondsp.pl/upload/mc10/RS232_Protocol_Documentation.pdf
  - https://www.manualslib.com/manual/1934747/Harman-Lexicon-Mc-10.html
retrieved_at: 2026-04-29T13:38:14.712Z
last_checked_at: 2026-06-01T20:45:22.079Z
generated_at: 2026-06-01T20:45:22.079Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range, IP addressing (DHCP/static behavior), AMX DDDP exposed as `AMX\\r` text command — included as one action but framing differs from binary protocol (ASCII over the same TCP port per source)."
  - "settable parameters all expressed as parameterized actions above (volume, treble, bass, balance, sub trim, lipsync, leveller, cal offset, sub stereo trim, tuner preset, input name)."
  - "no multi-step macros documented in source."
  - "no explicit power-sequencing or interlock warnings stated. The protocol notes 0x85 (\"Command invalid at this time\") returned when Setup Menu open or tuner-context commands sent without tuner selected - handled by the device, no operator interlock required."
  - "firmware version compatibility ranges; whether port 50000 is configurable; behavior when control is disabled (presumably no response); maximum frame Data length (source says n limited to 255 for response, no command-side cap stated)."
verification:
  verdict: verified
  checked_at: 2026-06-01T20:45:22.079Z
  matched_actions: 227
  action_count: 227
  confidence: medium
  summary: "All 227 spec actions matched verbatim in source; transport port 50000 and baud 38400 confirmed; RC5 codes, binary commands, and AMX DDDP all verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Lexicon MC-10 Control Spec

## Summary
Lexicon MC-10 surround processor (AVR class). Binary framed protocol over RS-232 (38400 8N1, null-modem) and TCP on port 50000. Every command/response frame: `21 <Zn> <Cc> <Dl> <Data...> 0D`. Master zone = `0x01`, Zone 2 = `0x02`. Spec covers system commands `0x00`–`0x4F` and the full RC5 IR code table dispatched via `Simulate RC5 IR Command (0x08)`.

<!-- UNRESOLVED: firmware compatibility range, IP addressing (DHCP/static behavior), AMX DDDP exposed as `AMX\r` text command — included as one action but framing differs from binary protocol (ASCII over the same TCP port per source). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 50000
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred from RC5 Power On / Power Off and power-state query (Cc 0x00)
- queryable      # inferred: numerous query commands (mute, volume, source, decode mode, etc.)
- routable       # inferred: source-selection commands (Cc 0x0A video selection, Cc 0x0B audio select)
- levelable      # inferred: volume (Cc 0x0D), bass/treble/balance/sub-trim/lipsync/leveller
```

## Actions
```yaml
# Framing: 21 <Zn> <Cc> <Dl> <Data...> 0D. Zn default 01 (master) unless action targets Zone 2.
# Bytes shown space-separated as in source. RC5 actions all dispatch via Cc 0x08 (Simulate RC5).

# ─── System: Power / Status (Cc 0x00) ───
- id: power_state_query
  label: Power State Query
  kind: query
  command: "21 01 00 01 F0 0D"
  params: []

# ─── System: Display Brightness (Cc 0x01) ───
- id: display_brightness_query
  label: Display Brightness Query
  kind: query
  command: "21 01 01 01 F0 0D"
  params: []

# ─── System: Headphones (Cc 0x02) ───
- id: headphone_status_query
  label: Headphone Connection Status Query
  kind: query
  command: "21 01 02 01 F0 0D"
  params: []

# ─── System: FM Genre (Cc 0x03) ───
- id: fm_genre_query
  label: FM Programme Type Query
  kind: query
  command: "21 {zone} 03 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
      description: Zone (01 master, 02 zone 2)

# ─── System: Software Version (Cc 0x04) - 6 source rows ───
- id: software_version_rs232_query
  label: RS-232 Protocol Version Query
  kind: query
  command: "21 01 04 01 F0 0D"
  params: []
- id: software_version_host_query
  label: Host Version Query
  kind: query
  command: "21 01 04 01 F1 0D"
  params: []
- id: software_version_osd_query
  label: OSD Version Query
  kind: query
  command: "21 01 04 01 F2 0D"
  params: []
- id: software_version_dsp_query
  label: DSP Version Query
  kind: query
  command: "21 01 04 01 F3 0D"
  params: []
- id: software_version_net_query
  label: NET Version Query
  kind: query
  command: "21 01 04 01 F4 0D"
  params: []
- id: software_version_iap_query
  label: IAP Version Query
  kind: query
  command: "21 01 04 01 F5 0D"
  params: []

# ─── System: Factory Default (Cc 0x05) ───
- id: factory_default_restore
  label: Restore Factory Defaults
  kind: action
  command: "21 01 05 02 AA AA 0D"
  params: []

# ─── System: Secure Backup (Cc 0x06) - 2 source rows ───
- id: secure_backup_save
  label: Save Secure Backup
  kind: action
  command: "21 01 06 07 00 55 55 {pin1} {pin2} {pin3} {pin4} 0D"
  params:
    - name: pin1
      type: hex_byte
    - name: pin2
      type: hex_byte
    - name: pin3
      type: hex_byte
    - name: pin4
      type: hex_byte
- id: secure_backup_restore
  label: Restore Secure Backup
  kind: action
  command: "21 01 06 07 01 55 55 {pin1} {pin2} {pin3} {pin4} 0D"
  params:
    - name: pin1
      type: hex_byte
    - name: pin2
      type: hex_byte
    - name: pin3
      type: hex_byte
    - name: pin4
      type: hex_byte

# ─── System: Simulate RC5 (Cc 0x08) - generic parameterized form ───
- id: simulate_rc5
  label: Simulate RC5 IR Command (generic)
  kind: action
  command: "21 {zone} 08 02 {sys} {code} 0D"
  params:
    - name: zone
      type: hex_byte
      description: 01 master, 02 zone 2
    - name: sys
      type: hex_byte
      description: RC5 system code (e.g. 10 master, 17 zone 2)
    - name: code
      type: hex_byte
      description: RC5 command code

# ─── System: Display Info Type (Cc 0x09) ───
- id: display_info_query
  label: Display Info Type Query
  kind: query
  command: "21 {zone} 09 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: display_info_set_processing
  label: Set Display to Processing Mode
  kind: action
  command: "21 {zone} 09 01 00 0D"
  params:
    - name: zone
      type: hex_byte
- id: display_info_cycle
  label: Cycle Display Info Types
  kind: action
  command: "21 {zone} 09 01 E0 0D"
  params:
    - name: zone
      type: hex_byte
- id: display_info_set
  label: Set Display Info Type (per-source value)
  kind: action
  command: "21 {zone} 09 01 {value} 0D"
  params:
    - name: zone
      type: hex_byte
    - name: value
      type: hex_byte
      description: 01-05 per current source (FM/DAB/NET - see source table)

# ─── Input: Video Selection (Cc 0x0A) ───
- id: video_selection_set
  label: Set Video Source
  kind: action
  command: "21 01 0A 01 {source} 0D"
  params:
    - name: source
      type: hex_byte
      description: "00 BD, 01 SAT, 02 AV, 03 PVR, 04 VCR, 05 Game, 06 STB"
- id: video_selection_query
  label: Video Source Query
  kind: query
  command: "21 01 0A 01 F0 0D"
  params: []

# ─── Input: Analogue/Digital (Cc 0x0B) - 4 source rows ───
- id: audio_input_set_analogue
  label: Use Analogue Audio
  kind: action
  command: "21 {zone} 0B 01 00 0D"
  params:
    - name: zone
      type: hex_byte
- id: audio_input_set_digital
  label: Use Digital Audio
  kind: action
  command: "21 {zone} 0B 01 01 0D"
  params:
    - name: zone
      type: hex_byte
- id: audio_input_set_hdmi
  label: Use HDMI Audio
  kind: action
  command: "21 {zone} 0B 01 02 0D"
  params:
    - name: zone
      type: hex_byte
- id: audio_input_query
  label: Audio Input Type Query
  kind: query
  command: "21 {zone} 0B 01 F0 0D"
  params:
    - name: zone
      type: hex_byte

# ─── IMAX Enhanced (Cc 0x0C) - 4 source rows ───
- id: imax_enhanced_query
  label: IMAX Enhanced State Query
  kind: query
  command: "21 {zone} 0C 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: imax_enhanced_auto
  label: IMAX Enhanced Auto
  kind: action
  command: "21 {zone} 0C 01 F1 0D"
  params:
    - name: zone
      type: hex_byte
- id: imax_enhanced_on
  label: IMAX Enhanced On
  kind: action
  command: "21 {zone} 0C 01 F2 0D"
  params:
    - name: zone
      type: hex_byte
- id: imax_enhanced_off
  label: IMAX Enhanced Off
  kind: action
  command: "21 {zone} 0C 01 F3 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Output: Volume (Cc 0x0D) - 2 source rows ───
- id: volume_set
  label: Set Volume
  kind: action
  command: "21 {zone} 0D 01 {level} 0D"
  params:
    - name: zone
      type: hex_byte
    - name: level
      type: hex_byte
      description: 0x00 (0) - 0x63 (99) in dB
- id: volume_query
  label: Volume Query
  kind: query
  command: "21 {zone} 0D 01 F0 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Output: Mute Query (Cc 0x0E) ───
- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "21 {zone} 0E 01 F0 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Direct Mode Query (Cc 0x0F) ───
- id: direct_mode_query
  label: Direct Mode Status Query
  kind: query
  command: "21 01 0F 01 F0 0D"
  params: []

# ─── Decode Mode 2ch / MCH (0x10, 0x11) ───
- id: decode_mode_2ch_query
  label: Decode Mode (2-channel) Query
  kind: query
  command: "21 01 10 01 F0 0D"
  params: []
- id: decode_mode_mch_query
  label: Decode Mode (multi-channel) Query
  kind: query
  command: "21 01 11 01 F0 0D"
  params: []

# ─── RDS / Video / Menu Queries (0x12, 0x13, 0x14) ───
- id: rds_info_query
  label: FM RDS Info Query
  kind: query
  command: "21 {zone} 12 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: video_output_resolution_query
  label: Video Output Resolution Query
  kind: query
  command: "21 01 13 01 F0 0D"
  params: []
- id: menu_status_query
  label: Open Menu Status Query
  kind: query
  command: "21 01 14 01 F0 0D"
  params: []

# ─── Tuner Preset (Cc 0x15) - 2 source rows ───
- id: tuner_preset_set
  label: Set Tuner Preset
  kind: action
  command: "21 {zone} 15 01 {preset} 0D"
  params:
    - name: zone
      type: hex_byte
    - name: preset
      type: hex_byte
      description: 0x01-0x32 (1-50)
- id: tuner_preset_query
  label: Current Tuner Preset Query
  kind: query
  command: "21 {zone} 15 01 F0 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Tune (Cc 0x16) - 3 source rows ───
- id: tune_decrement
  label: Tuner Frequency Decrement
  kind: action
  command: "21 {zone} 16 01 00 0D"
  params:
    - name: zone
      type: hex_byte
- id: tune_increment
  label: Tuner Frequency Increment
  kind: action
  command: "21 {zone} 16 01 01 0D"
  params:
    - name: zone
      type: hex_byte
- id: tune_query
  label: Tuner Frequency Query
  kind: query
  command: "21 {zone} 16 01 F0 0D"
  params:
    - name: zone
      type: hex_byte

# ─── DAB / Network Queries (0x18, 0x19, 0x1A, 0x1B, 0x1C) ───
- id: dab_station_query
  label: DAB Station Query
  kind: query
  command: "21 {zone} 18 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: dab_prog_type_query
  label: DAB Programme Type Query
  kind: query
  command: "21 {zone} 19 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: dab_dls_pdt_query
  label: DAB DLS/PDT Info Query
  kind: query
  command: "21 {zone} 1A 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: preset_details_query
  label: Preset Details Query
  kind: query
  command: "21 {zone} 1B 01 {preset} 0D"
  params:
    - name: zone
      type: hex_byte
    - name: preset
      type: hex_byte
      description: 0x01-0x32 (1-50)
- id: network_playback_query
  label: Network Playback Status Query
  kind: query
  command: "21 {zone} 1C 01 F0 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Current Source Query (Cc 0x1D) ───
- id: current_source_query
  label: Current Source Query
  kind: query
  command: "21 {zone} 1D 01 F0 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Headphone Over-ride (Cc 0x1F) - 2 source rows ───
- id: headphone_override_clear
  label: Headphone Over-ride Clear (mute speakers if HP)
  kind: action
  command: "21 {zone} 1F 01 00 0D"
  params:
    - name: zone
      type: hex_byte
- id: headphone_override_set
  label: Headphone Over-ride Set (unmute speakers if HP)
  kind: action
  command: "21 {zone} 1F 01 01 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Input Name (Cc 0x20) - 2 source rows ───
- id: input_name_set
  label: Set Input Name
  kind: action
  command: "21 01 20 {len} {name_bytes} 0D"
  params:
    - name: len
      type: hex_byte
      description: Data length (≤10)
    - name: name_bytes
      type: ascii_hex
      description: ASCII characters of the name (up to 10)
- id: input_name_query
  label: Input Name Query
  kind: query
  command: "21 01 20 01 F0 0D"
  params: []

# ─── FM Scan (Cc 0x23) - 2 source rows ───
- id: fm_scan_up
  label: FM Scan Up
  kind: action
  command: "21 01 23 01 01 0D"
  params: []
- id: fm_scan_down
  label: FM Scan Down
  kind: action
  command: "21 01 23 01 02 0D"
  params: []

# ─── DAB Scan (Cc 0x24) ───
- id: dab_scan
  label: DAB Scan
  kind: action
  command: "21 01 24 01 F0 0D"
  params: []

# ─── Heartbeat (Cc 0x25) ───
- id: heartbeat
  label: Heartbeat
  kind: action
  command: "21 01 25 01 F0 0D"
  params: []

# ─── Reboot (Cc 0x26) ───
- id: reboot
  label: Reboot Unit
  kind: action
  command: "21 01 26 06 52 45 42 4F 4F 54 0D"
  params: []

# ─── Treble EQ (Cc 0x35) - 4 source rows ───
- id: treble_set
  label: Set Treble EQ
  kind: action
  command: "21 {zone} 35 01 {value} 0D"
  params:
    - name: zone
      type: hex_byte
    - name: value
      type: hex_byte
      description: "0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB"
- id: treble_query
  label: Treble EQ Query
  kind: query
  command: "21 {zone} 35 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: treble_increment
  label: Treble +1dB
  kind: action
  command: "21 {zone} 35 01 F1 0D"
  params:
    - name: zone
      type: hex_byte
- id: treble_decrement
  label: Treble -1dB
  kind: action
  command: "21 {zone} 35 01 F2 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Bass EQ (Cc 0x36) - 4 source rows ───
- id: bass_set
  label: Set Bass EQ
  kind: action
  command: "21 {zone} 36 01 {value} 0D"
  params:
    - name: zone
      type: hex_byte
    - name: value
      type: hex_byte
      description: "0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB"
- id: bass_query
  label: Bass EQ Query
  kind: query
  command: "21 {zone} 36 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: bass_increment
  label: Bass +1dB
  kind: action
  command: "21 {zone} 36 01 F1 0D"
  params:
    - name: zone
      type: hex_byte
- id: bass_decrement
  label: Bass -1dB
  kind: action
  command: "21 {zone} 36 01 F2 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Room EQ (Cc 0x37) - 3 source rows ───
- id: room_eq_query
  label: Room EQ State Query
  kind: query
  command: "21 {zone} 37 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: room_eq_on
  label: Room EQ On
  kind: action
  command: "21 {zone} 37 01 F1 0D"
  params:
    - name: zone
      type: hex_byte
- id: room_eq_off
  label: Room EQ Off
  kind: action
  command: "21 {zone} 37 01 F2 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Dolby Volume (Cc 0x38) - 3 source rows ───
- id: dolby_volume_off
  label: Dolby Volume Off
  kind: action
  command: "21 {zone} 38 01 00 0D"
  params:
    - name: zone
      type: hex_byte
- id: dolby_volume_on
  label: Dolby Volume On
  kind: action
  command: "21 {zone} 38 01 01 0D"
  params:
    - name: zone
      type: hex_byte
- id: dolby_volume_query
  label: Dolby Volume Mode Query
  kind: query
  command: "21 {zone} 38 01 F0 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Dolby Leveller (Cc 0x39) - 5 source rows ───
- id: dolby_leveller_set
  label: Set Dolby Leveller
  kind: action
  command: "21 {zone} 39 01 {value} 0D"
  params:
    - name: zone
      type: hex_byte
    - name: value
      type: hex_byte
      description: 0x00-0x0A (0-10)
- id: dolby_leveller_query
  label: Dolby Leveller Query
  kind: query
  command: "21 {zone} 39 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: dolby_leveller_increment
  label: Dolby Leveller +1
  kind: action
  command: "21 {zone} 39 01 F1 0D"
  params:
    - name: zone
      type: hex_byte
- id: dolby_leveller_decrement
  label: Dolby Leveller -1
  kind: action
  command: "21 {zone} 39 01 F2 0D"
  params:
    - name: zone
      type: hex_byte
- id: dolby_leveller_off
  label: Dolby Leveller Off
  kind: action
  command: "21 {zone} 39 01 FF 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Dolby Volume Calibration Offset (Cc 0x3A) - 4 source rows ───
- id: dolby_cal_offset_set
  label: Set Dolby Calibration Offset
  kind: action
  command: "21 {zone} 3A 01 {value} 0D"
  params:
    - name: zone
      type: hex_byte
    - name: value
      type: hex_byte
      description: "0x00-0x0F = 0-15dB; 0x80-0x8F = -1 to -15dB"
- id: dolby_cal_offset_query
  label: Dolby Calibration Offset Query
  kind: query
  command: "21 {zone} 3A 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: dolby_cal_offset_increment
  label: Dolby Cal Offset +1dB
  kind: action
  command: "21 {zone} 3A 01 F1 0D"
  params:
    - name: zone
      type: hex_byte
- id: dolby_cal_offset_decrement
  label: Dolby Cal Offset -1dB
  kind: action
  command: "21 {zone} 3A 01 F2 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Balance (Cc 0x3B) - 4 source rows ───
- id: balance_set
  label: Set Balance
  kind: action
  command: "21 {zone} 3B 01 {value} 0D"
  params:
    - name: zone
      type: hex_byte
    - name: value
      type: hex_byte
      description: "0x00-0x06 = 0-6; 0x81-0x86 = -1 to -6"
- id: balance_query
  label: Balance Query
  kind: query
  command: "21 {zone} 3B 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: balance_increment
  label: Balance +1
  kind: action
  command: "21 {zone} 3B 01 F1 0D"
  params:
    - name: zone
      type: hex_byte
- id: balance_decrement
  label: Balance -1
  kind: action
  command: "21 {zone} 3B 01 F2 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Subwoofer Trim (Cc 0x3F) - 4 source rows ───
- id: sub_trim_set
  label: Set Subwoofer Trim
  kind: action
  command: "21 {zone} 3F 01 {value} 0D"
  params:
    - name: zone
      type: hex_byte
    - name: value
      type: hex_byte
      description: "0x00-0x14 positive (0.5dB steps); 0x81-0x94 negative (0.5dB steps)"
- id: sub_trim_query
  label: Subwoofer Trim Query
  kind: query
  command: "21 {zone} 3F 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: sub_trim_increment
  label: Subwoofer Trim +0.5dB
  kind: action
  command: "21 {zone} 3F 01 F1 0D"
  params:
    - name: zone
      type: hex_byte
- id: sub_trim_decrement
  label: Subwoofer Trim -0.5dB
  kind: action
  command: "21 {zone} 3F 01 F2 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Lipsync Delay (Cc 0x40) - 4 source rows ───
- id: lipsync_set
  label: Set Lipsync Delay
  kind: action
  command: "21 {zone} 40 01 {value} 0D"
  params:
    - name: zone
      type: hex_byte
    - name: value
      type: hex_byte
      description: 0x00-0x32 in 5ms steps
- id: lipsync_query
  label: Lipsync Delay Query
  kind: query
  command: "21 {zone} 40 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: lipsync_increment
  label: Lipsync +5ms
  kind: action
  command: "21 {zone} 40 01 F1 0D"
  params:
    - name: zone
      type: hex_byte
- id: lipsync_decrement
  label: Lipsync -5ms
  kind: action
  command: "21 {zone} 40 01 F2 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Compression (Cc 0x41) - 4 source rows ───
- id: compression_off
  label: Compression Off
  kind: action
  command: "21 {zone} 41 01 00 0D"
  params:
    - name: zone
      type: hex_byte
- id: compression_medium
  label: Compression Medium
  kind: action
  command: "21 {zone} 41 01 01 0D"
  params:
    - name: zone
      type: hex_byte
- id: compression_high
  label: Compression High
  kind: action
  command: "21 {zone} 41 01 02 0D"
  params:
    - name: zone
      type: hex_byte
- id: compression_query
  label: Compression Setting Query
  kind: query
  command: "21 {zone} 41 01 F0 0D"
  params:
    - name: zone
      type: hex_byte

# ─── Incoming Video / Audio Queries (0x42, 0x43, 0x44) ───
- id: incoming_video_params_query
  label: Incoming Video Parameters Query
  kind: query
  command: "21 {zone} 42 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: incoming_audio_format_query
  label: Incoming Audio Format Query
  kind: query
  command: "21 {zone} 43 01 F0 0D"
  params:
    - name: zone
      type: hex_byte
- id: incoming_audio_sample_rate_query
  label: Incoming Audio Sample Rate Query
  kind: query
  command: "21 01 44 01 F0 0D"
  params: []

# ─── Sub Stereo Trim (Cc 0x45) - 4 source rows ───
- id: sub_stereo_trim_set
  label: Set Sub Stereo Trim
  kind: action
  command: "21 01 45 01 {value} 0D"
  params:
    - name: value
      type: hex_byte
      description: "0x00 = 0dB; 0x81-0x94 = -0.5 to -10dB (0.5dB steps)"
- id: sub_stereo_trim_query
  label: Sub Stereo Trim Query
  kind: query
  command: "21 01 45 01 F0 0D"
  params: []
- id: sub_stereo_trim_increment
  label: Sub Stereo Trim +0.5dB
  kind: action
  command: "21 01 45 01 F1 0D"
  params: []
- id: sub_stereo_trim_decrement
  label: Sub Stereo Trim -0.5dB
  kind: action
  command: "21 01 45 01 F2 0D"
  params: []

# ─── Zone 1 OSD (Cc 0x4E) - 3 source rows ───
- id: zone1_osd_query
  label: Zone 1 OSD State Query
  kind: query
  command: "21 01 4E 01 F0 0D"
  params: []
- id: zone1_osd_on
  label: Zone 1 OSD On
  kind: action
  command: "21 01 4E 01 F1 0D"
  params: []
- id: zone1_osd_off
  label: Zone 1 OSD Off
  kind: action
  command: "21 01 4E 01 F2 0D"
  params: []

# ─── Video Output Switching (Cc 0x4F) - 4 source rows ───
- id: video_output_hdmi1
  label: HDMI Output 1
  kind: action
  command: "21 01 4F 01 02 0D"
  params: []
- id: video_output_hdmi2
  label: HDMI Output 2
  kind: action
  command: "21 01 4F 01 03 0D"
  params: []
- id: video_output_hdmi_both
  label: HDMI Output 1 & 2
  kind: action
  command: "21 01 4F 01 04 0D"
  params: []
- id: video_output_switching_query
  label: Video Output Switching Query
  kind: query
  command: "21 01 4F 01 F0 0D"
  params: []

# ─── AMX DDDP discovery (ASCII over same TCP port) ───
- id: amx_dddp_discovery
  label: AMX Duet DDDP Discovery
  kind: query
  command: "AMX\r"
  params: []
  # Response: "AMXB<Device-SDKClass=Receiver><Device-Make=Lexicon><Device-Model=MC-10><Device-Revision=x.y.z>\r"

# ─── RC5 IR codes via Cc 0x08 - Basic Functions (master, sys=0x10) ───
- id: rc5_standby
  label: Standby
  kind: action
  command: "21 01 08 02 10 0C 0D"
  params: []
- id: rc5_digit_1
  label: Digit 1
  kind: action
  command: "21 01 08 02 10 01 0D"
  params: []
- id: rc5_digit_2
  label: Digit 2
  kind: action
  command: "21 01 08 02 10 02 0D"
  params: []
- id: rc5_digit_3
  label: Digit 3
  kind: action
  command: "21 01 08 02 10 03 0D"
  params: []
- id: rc5_digit_4
  label: Digit 4
  kind: action
  command: "21 01 08 02 10 04 0D"
  params: []
- id: rc5_digit_5
  label: Digit 5
  kind: action
  command: "21 01 08 02 10 05 0D"
  params: []
- id: rc5_digit_6
  label: Digit 6
  kind: action
  command: "21 01 08 02 10 06 0D"
  params: []
- id: rc5_digit_7
  label: Digit 7
  kind: action
  command: "21 01 08 02 10 07 0D"
  params: []
- id: rc5_digit_8
  label: Digit 8
  kind: action
  command: "21 01 08 02 10 08 0D"
  params: []
- id: rc5_digit_9
  label: Digit 9
  kind: action
  command: "21 01 08 02 10 09 0D"
  params: []
- id: rc5_digit_0
  label: Digit 0
  kind: action
  command: "21 01 08 02 10 00 0D"
  params: []
- id: rc5_access_lipsync
  label: Access Lipsync Delay Control
  kind: action
  command: "21 01 08 02 10 32 0D"
  params: []
- id: rc5_cycle_vfd_info
  label: Cycle VFD Information Panels
  kind: action
  command: "21 01 08 02 10 37 0D"
  params: []
- id: rc5_rewind
  label: Rewind
  kind: action
  command: "21 01 08 02 10 79 0D"
  params: []
- id: rc5_fast_forward
  label: Fast Forward
  kind: action
  command: "21 01 08 02 10 34 0D"
  params: []
- id: rc5_skip_back
  label: Skip Back
  kind: action
  command: "21 01 08 02 10 21 0D"
  params: []
- id: rc5_skip_forward
  label: Skip Forward
  kind: action
  command: "21 01 08 02 10 0B 0D"
  params: []
- id: rc5_stop
  label: Stop
  kind: action
  command: "21 01 08 02 10 36 0D"
  params: []
- id: rc5_play
  label: Play
  kind: action
  command: "21 01 08 02 10 35 0D"
  params: []
- id: rc5_pause
  label: Pause
  kind: action
  command: "21 01 08 02 10 30 0D"
  params: []
- id: rc5_disc_record_trim
  label: Disc / Record (Enter Trim Menu)
  kind: action
  command: "21 01 08 02 10 5A 0D"
  params: []
- id: rc5_menu
  label: MENU (System Menu)
  kind: action
  command: "21 01 08 02 10 52 0D"
  params: []
- id: rc5_navigate_up
  label: Navigate Up
  kind: action
  command: "21 01 08 02 10 56 0D"
  params: []
- id: rc5_pop_up_dolby_vol
  label: Pop Up (Dolby Volume on/off)
  kind: action
  command: "21 01 08 02 10 46 0D"
  params: []
- id: rc5_navigate_left
  label: Navigate Left
  kind: action
  command: "21 01 08 02 10 51 0D"
  params: []
- id: rc5_ok
  label: OK
  kind: action
  command: "21 01 08 02 10 57 0D"
  params: []
- id: rc5_navigate_right
  label: Navigate Right
  kind: action
  command: "21 01 08 02 10 50 0D"
  params: []
- id: rc5_audio_room_eq
  label: Audio (Room EQ on/off)
  kind: action
  command: "21 01 08 02 10 1E 0D"
  params: []
- id: rc5_navigate_down
  label: Navigate Down
  kind: action
  command: "21 01 08 02 10 55 0D"
  params: []
- id: rc5_rtn_sub_trim
  label: RTN (Access Sub Trim)
  kind: action
  command: "21 01 08 02 10 33 0D"
  params: []
- id: rc5_home
  label: HOME
  kind: action
  command: "21 01 08 02 10 2B 0D"
  params: []
- id: rc5_mute
  label: Mute (toggle)
  kind: action
  command: "21 01 08 02 10 0D 0D"
  params: []
- id: rc5_volume_up
  label: Volume +
  kind: action
  command: "21 01 08 02 10 10 0D"
  params: []
- id: rc5_mode_cycle_decoding
  label: MODE (Cycle Decoding Modes)
  kind: action
  command: "21 01 08 02 10 20 0D"
  params: []
- id: rc5_disp_brightness
  label: DISP (Cycle VFD Brightness)
  kind: action
  command: "21 01 08 02 10 3B 0D"
  params: []
- id: rc5_direct_activate
  label: Activate DIRECT Mode
  kind: action
  command: "21 01 08 02 10 0A 0D"
  params: []
- id: rc5_volume_down
  label: Volume -
  kind: action
  command: "21 01 08 02 10 11 0D"
  params: []
- id: rc5_red
  label: Red
  kind: action
  command: "21 01 08 02 10 29 0D"
  params: []
- id: rc5_green
  label: Green
  kind: action
  command: "21 01 08 02 10 2A 0D"
  params: []
- id: rc5_yellow
  label: Yellow
  kind: action
  command: "21 01 08 02 10 2B 0D"
  params: []
- id: rc5_blue
  label: Blue
  kind: action
  command: "21 01 08 02 10 37 0D"
  params: []
- id: rc5_radio
  label: Radio
  kind: action
  command: "21 01 08 02 10 5B 0D"
  params: []
- id: rc5_aux
  label: Aux
  kind: action
  command: "21 01 08 02 10 63 0D"
  params: []
- id: rc5_net
  label: Net
  kind: action
  command: "21 01 08 02 10 5C 0D"
  params: []
- id: rc5_usb
  label: USB
  kind: action
  command: "21 01 08 02 10 5D 0D"
  params: []
- id: rc5_av
  label: AV
  kind: action
  command: "21 01 08 02 10 5E 0D"
  params: []
- id: rc5_sat
  label: Sat
  kind: action
  command: "21 01 08 02 10 1B 0D"
  params: []
- id: rc5_pvr
  label: PVR
  kind: action
  command: "21 01 08 02 10 60 0D"
  params: []
- id: rc5_game
  label: Game
  kind: action
  command: "21 01 08 02 10 61 0D"
  params: []
- id: rc5_bd
  label: BD
  kind: action
  command: "21 01 08 02 10 62 0D"
  params: []
- id: rc5_cd
  label: CD
  kind: action
  command: "21 01 08 02 10 76 0D"
  params: []
- id: rc5_stb
  label: STB
  kind: action
  command: "21 01 08 02 10 64 0D"
  params: []
- id: rc5_vcr
  label: VCR
  kind: action
  command: "21 01 08 02 10 77 0D"
  params: []
- id: rc5_display
  label: Display
  kind: action
  command: "21 01 08 02 10 3A 0D"
  params: []
- id: rc5_power_on
  label: Power On
  kind: action
  command: "21 01 08 02 10 7B 0D"
  params: []
- id: rc5_power_off
  label: Power Off
  kind: action
  command: "21 01 08 02 10 7C 0D"
  params: []
- id: rc5_change_zone
  label: Change Control to Next Zone
  kind: action
  command: "21 01 08 02 10 5F 0D"
  params: []
- id: rc5_cycle_output_resolutions
  label: Cycle Output Resolutions
  kind: action
  command: "21 01 08 02 10 2F 0D"
  params: []
- id: rc5_access_bass
  label: Access Bass Control
  kind: action
  command: "21 01 08 02 10 27 0D"
  params: []
- id: rc5_access_speaker_trim
  label: Access Speaker Trim
  kind: action
  command: "21 01 08 02 10 25 0D"
  params: []
- id: rc5_access_treble
  label: Access Treble Control
  kind: action
  command: "21 01 08 02 10 0E 0D"
  params: []
- id: rc5_random
  label: Random
  kind: action
  command: "21 01 08 02 10 4C 0D"
  params: []
- id: rc5_repeat
  label: Repeat
  kind: action
  command: "21 01 08 02 10 31 0D"
  params: []
- id: rc5_direct_on
  label: Direct Mode On
  kind: action
  command: "21 01 08 02 10 4E 0D"
  params: []
- id: rc5_direct_off
  label: Direct Mode Off
  kind: action
  command: "21 01 08 02 10 4F 0D"
  params: []
- id: rc5_multichannel
  label: Multi Channel
  kind: action
  command: "21 01 08 02 10 6A 0D"
  params: []
- id: rc5_stereo
  label: Stereo
  kind: action
  command: "21 01 08 02 10 6B 0D"
  params: []
- id: rc5_dolby_surround
  label: Dolby Surround
  kind: action
  command: "21 01 08 02 10 6E 0D"
  params: []
- id: rc5_dts_neo6_cinema
  label: DTS Neo:6 Cinema
  kind: action
  command: "21 01 08 02 10 6F 0D"
  params: []
- id: rc5_dts_neo6_music
  label: DTS Neo:6 Music
  kind: action
  command: "21 01 08 02 10 70 0D"
  params: []
- id: rc5_dts_neuralx
  label: DTS Neural:X
  kind: action
  command: "21 01 08 02 10 71 0D"
  params: []
- id: rc5_logic7_immersion
  label: Logic7 Immersion
  kind: action
  command: "21 01 08 02 10 72 0D"
  params: []
- id: rc5_dts_virtualx
  label: DTS Virtual:X
  kind: action
  command: "21 01 08 02 10 73 0D"
  params: []
- id: rc5_5_7_ch_stereo
  label: 5/7 Ch Stereo
  kind: action
  command: "21 01 08 02 10 45 0D"
  params: []
- id: rc5_dolby_d_ex
  label: Dolby D EX
  kind: action
  command: "21 01 08 02 10 17 0D"
  params: []
- id: rc5_mute_on
  label: Mute On
  kind: action
  command: "21 01 08 02 10 1A 0D"
  params: []
- id: rc5_mute_off
  label: Mute Off
  kind: action
  command: "21 01 08 02 10 78 0D"
  params: []
- id: rc5_fm
  label: FM
  kind: action
  command: "21 01 08 02 10 1C 0D"
  params: []
- id: rc5_dab
  label: DAB
  kind: action
  command: "21 01 08 02 10 48 0D"
  params: []
- id: rc5_lipsync_plus5
  label: Lip Sync +5ms
  kind: action
  command: "21 01 08 02 10 0F 0D"
  params: []
- id: rc5_lipsync_minus5
  label: Lip Sync -5ms
  kind: action
  command: "21 01 08 02 10 65 0D"
  params: []
- id: rc5_subtrim_plus
  label: Sub Trim +0.5dB
  kind: action
  command: "21 01 08 02 10 69 0D"
  params: []
- id: rc5_subtrim_minus
  label: Sub Trim -0.5dB
  kind: action
  command: "21 01 08 02 10 6C 0D"
  params: []
- id: rc5_display_off
  label: Display Off
  kind: action
  command: "21 01 08 02 10 1F 0D"
  params: []
- id: rc5_display_l1
  label: Display L1
  kind: action
  command: "21 01 08 02 10 22 0D"
  params: []
- id: rc5_display_l2
  label: Display L2
  kind: action
  command: "21 01 08 02 10 23 0D"
  params: []
- id: rc5_balance_left
  label: Balance Left
  kind: action
  command: "21 01 08 02 10 26 0D"
  params: []
- id: rc5_balance_right
  label: Balance Right
  kind: action
  command: "21 01 08 02 10 28 0D"
  params: []
- id: rc5_bass_plus1
  label: Bass +1
  kind: action
  command: "21 01 08 02 10 2C 0D"
  params: []
- id: rc5_bass_minus1
  label: Bass -1
  kind: action
  command: "21 01 08 02 10 2D 0D"
  params: []
- id: rc5_treble_plus1
  label: Treble +1
  kind: action
  command: "21 01 08 02 10 2E 0D"
  params: []
- id: rc5_treble_minus1
  label: Treble -1
  kind: action
  command: "21 01 08 02 10 66 0D"
  params: []
- id: rc5_zone2_follow_zone1
  label: Set Zone 2 to Follow Zone 1
  kind: action
  command: "21 01 08 02 10 14 0D"
  params: []
- id: rc5_select_hdmi_out1
  label: Select HDMI Out 1
  kind: action
  command: "21 01 08 02 10 49 0D"
  params: []
- id: rc5_select_hdmi_out2
  label: Select HDMI Out 2
  kind: action
  command: "21 01 08 02 10 4A 0D"
  params: []
- id: rc5_select_hdmi_out_both
  label: Select HDMI Out 1 & 2
  kind: action
  command: "21 01 08 02 10 4B 0D"
  params: []

# ─── RC5 IR codes - Zone 2 Functions (sys=0x17) ───
- id: rc5_zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "21 02 08 02 17 7B 0D"
  params: []
- id: rc5_zone2_power_off
  label: Zone 2 Power Off
  kind: action
  command: "21 02 08 02 17 7C 0D"
  params: []
- id: rc5_zone2_vol_up
  label: Zone 2 Volume +
  kind: action
  command: "21 02 08 02 17 01 0D"
  params: []
- id: rc5_zone2_vol_down
  label: Zone 2 Volume -
  kind: action
  command: "21 02 08 02 17 02 0D"
  params: []
- id: rc5_zone2_mute
  label: Zone 2 Mute (toggle)
  kind: action
  command: "21 02 08 02 17 03 0D"
  params: []
- id: rc5_zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: "21 02 08 02 17 04 0D"
  params: []
- id: rc5_zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: "21 02 08 02 17 05 0D"
  params: []
- id: rc5_zone2_cd
  label: Zone 2 CD
  kind: action
  command: "21 02 08 02 17 06 0D"
  params: []
- id: rc5_zone2_bd
  label: Zone 2 BD
  kind: action
  command: "21 02 08 02 17 07 0D"
  params: []
- id: rc5_zone2_stb
  label: Zone 2 STB
  kind: action
  command: "21 02 08 02 17 08 0D"
  params: []
- id: rc5_zone2_av
  label: Zone 2 AV
  kind: action
  command: "21 02 08 02 17 09 0D"
  params: []
- id: rc5_zone2_game
  label: Zone 2 Game
  kind: action
  command: "21 02 08 02 17 0B 0D"
  params: []
- id: rc5_zone2_aux
  label: Zone 2 Aux
  kind: action
  command: "21 02 08 02 17 0D 0D"
  params: []
- id: rc5_zone2_pvr
  label: Zone 2 PVR
  kind: action
  command: "21 02 08 02 17 0F 0D"
  params: []
- id: rc5_zone2_fm
  label: Zone 2 FM
  kind: action
  command: "21 02 08 02 17 0E 0D"
  params: []
- id: rc5_zone2_dab
  label: Zone 2 DAB
  kind: action
  command: "21 02 08 02 17 10 0D"
  params: []
- id: rc5_zone2_usb
  label: Zone 2 USB
  kind: action
  command: "21 02 08 02 17 12 0D"
  params: []
- id: rc5_zone2_net
  label: Zone 2 NET
  kind: action
  command: "21 02 08 02 17 13 0D"
  params: []
- id: rc5_zone2_sat
  label: Zone 2 SAT
  kind: action
  command: "21 02 08 02 17 14 0D"
  params: []
- id: rc5_zone2_vcr
  label: Zone 2 VCR
  kind: action
  command: "21 02 08 02 17 15 0D"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
  source: Cc 0x00 response data byte (0x00 standby, 0x01 on)
- id: display_brightness
  type: enum
  values: [off, l1, l2]
  source: Cc 0x01 response (0x00/0x01/0x02)
- id: headphones_connected
  type: enum
  values: [disconnected, connected]
  source: Cc 0x02 response (0x00/0x01)
- id: fm_programme_type
  type: string
  source: Cc 0x03 ASCII response
- id: software_version
  type: bytes
  source: Cc 0x04 response (echo + major + minor)
- id: volume
  type: integer
  range: [0, 99]
  source: Cc 0x0D response, value in dB
- id: mute_state
  type: enum
  values: [muted, unmuted]
  source: Cc 0x0E response (0x00 muted, 0x01 unmuted)
- id: direct_mode
  type: enum
  values: [off, on]
  source: Cc 0x0F response
- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, 5_7_ch_stereo, dts_neuralx, logic7_immersion, dts_virtualx]
  source: Cc 0x10 response (0x01/0x04/0x07/0x08/0x09/0x0A/0x0B/0x0C)
- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multichannel, dts_es_neuralx, dolby_surround, logic7_immersion, dts_virtualx]
  source: Cc 0x11 response (0x01/0x02/0x03/0x06/0x0B/0x0C)
- id: rds_text
  type: string
  source: Cc 0x12 ASCII response
- id: video_output_resolution
  type: enum
  values: [sd_progressive, "720p", "1080i", "1080p", preferred, bypass, "4k"]
  source: Cc 0x13 response (0x02/0x03/0x04/0x05/0x06/0x07/0x08)
- id: menu_open
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  source: Cc 0x14 response (0x00/0x02-0x0A)
- id: tuner_preset_number
  type: integer
  range: [1, 50]
  source: Cc 0x15 response (0xFF = no preset)
- id: tuner_frequency
  type: bytes
  source: Cc 0x16 response (MHz, 10s kHz)
- id: dab_station_name
  type: string
  source: Cc 0x18 ASCII response (16 bytes padded with 0x20)
- id: dab_programme_type
  type: string
  source: Cc 0x19 ASCII response (16 bytes padded with 0x20)
- id: dab_dls_text
  type: string
  source: Cc 0x1A ASCII response (128 bytes padded with 0x20)
- id: network_playback_state
  type: enum
  values: [navigating, playing, paused, busy]
  source: Cc 0x1C response (0x00/0x01/0x02/0xFF)
- id: current_source
  type: enum
  values: [follow_zone1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]
  source: Cc 0x1D response (0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x08,0x09,0x0B,0x0C,0x0E,0x0F,0x10,0x11)
- id: headphone_override_state
  type: enum
  values: [clear, set]
  source: Cc 0x1F response
- id: input_name
  type: string
  source: Cc 0x20 ASCII response
- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]
  source: Cc 0x0C response (0x00/0x01/0x02)
- id: treble_value
  type: integer
  range: [-12, 12]
  source: Cc 0x35 response (0x00-0x0C positive, 0x81-0x8C negative)
- id: bass_value
  type: integer
  range: [-12, 12]
  source: Cc 0x36 response
- id: room_eq_state
  type: enum
  values: [off, on, not_calculated]
  source: Cc 0x37 response (0x00/0x01/0x02)
- id: dolby_volume_state
  type: enum
  values: [off, on]
  source: Cc 0x38 response
- id: dolby_leveller_value
  type: integer
  range: [0, 10]
  source: Cc 0x39 response (0xFF = off)
- id: dolby_cal_offset
  type: integer
  range: [-15, 15]
  source: Cc 0x3A response
- id: balance_value
  type: integer
  range: [-6, 6]
  source: Cc 0x3B response
- id: sub_trim_value
  type: number
  unit: dB
  source: Cc 0x3F response (0.5dB steps)
- id: lipsync_delay_ms
  type: integer
  unit: ms
  source: Cc 0x40 response (5ms steps, 0-250ms)
- id: compression_setting
  type: enum
  values: [off, medium, high]
  source: Cc 0x41 response
- id: incoming_video_params
  type: bytes
  source: Cc 0x42 response (h-res MSB/LSB, v-res MSB/LSB, refresh, interlace, aspect)
- id: incoming_audio_format
  type: enum
  values: [pcm, analogue_direct, dolby_digital, dolby_digital_ex, dolby_digital_surround, dolby_digital_plus, dolby_truehd, dts, dts_96_24, dts_es_matrix, dts_es_discrete, dts_es_matrix_96_24, dts_es_discrete_96_24, dts_hd_master_audio, dts_hd_high_res, dts_low_bit_rate, dts_core, pcm_zero, unsupported, undetected, dolby_atmos, dtsx, imax_enhanced]
  source: Cc 0x43 response Data1 (0x00-0x18)
- id: incoming_audio_channels
  type: bytes
  source: Cc 0x43 response Data2 (channel configuration 0x00-0x18)
- id: incoming_audio_sample_rate
  type: enum
  values: ["32khz", "44_1khz", "48khz", "88_2khz", "96khz", "176_4khz", "192khz", unknown, undetected]
  source: Cc 0x44 response (0x00-0x08)
- id: sub_stereo_trim
  type: number
  unit: dB
  source: Cc 0x45 response (0.5dB steps; 0x00 to -10dB)
- id: zone1_osd_state
  type: enum
  values: [on, off]
  source: Cc 0x4E response (0x00 on, 0x01 off)
- id: video_output_routing
  type: enum
  values: [hdmi1, hdmi2, hdmi1_and_2]
  source: Cc 0x4F response (0x02/0x03/0x04)
- id: amx_dddp_id
  type: string
  source: AMX\r response (AMXB<Device-SDKClass=Receiver><Device-Make=Lexicon><Device-Model=MC-10><Device-Revision=x.y.z>\r)
```

## Variables
```yaml
# UNRESOLVED: settable parameters all expressed as parameterized actions above (volume, treble, bass, balance, sub trim, lipsync, leveller, cal offset, sub stereo trim, tuner preset, input name).
```

## Events
```yaml
# Unsolicited messages: per source "any change resulting from front-panel / IR inputs is relayed to the RC using the appropriate message type" - uses the same response frame format as the corresponding command.
- id: state_change_relay
  description: When state changes via front panel or IR, the unit emits the matching command's response frame unsolicited.
  format: "21 <Zn> <Cc> <Ac> <Dl> <Data...> 0D"
  source: "State changes as a result of other inputs" section
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_default_restore        # 0x05 requires 0xAA 0xAA confirmation pattern per source
  - secure_backup_save             # 0x06 requires 0x55 0x55 pattern + 4-digit PIN
  - secure_backup_restore          # 0x06 requires 0x55 0x55 pattern + 4-digit PIN
  - reboot                         # 0x26 requires literal "REBOOT" ASCII payload
interlocks: []
# UNRESOLVED: no explicit power-sequencing or interlock warnings stated. The protocol notes 0x85 ("Command invalid at this time") returned when Setup Menu open or tuner-context commands sent without tuner selected - handled by the device, no operator interlock required.
```

## Notes
- RS-232 wiring is null-modem (Connector1 pin 2↔Connector2 pin 3 / pin 3↔pin 2 / pin 5↔pin 5).
- Control must be enabled before use: front-panel DIRECT button held 4s ("RS232 CONTROL ON" on VFD), or OSD → General Setup → Control → On. Default state is off for low standby power.
- Commands `0xF0`–`0xFF` are reserved for test functions — must not be used.
- Response within 3 seconds; RC may send further commands before previous response received.
- Same binary protocol over RS-232 (38400 8N1) and TCP (port 50000). AMX DDDP discovery uses ASCII `AMX\r` on the same TCP port.
- RC5 system code `0x10` = master AV, `0x17` = Zone 2.
- Spec covers the MC-10; the same protocol document describes RV-9 and RV-6 (different AMX DDDP model strings only) — out of scope for this spec.

<!-- UNRESOLVED: firmware version compatibility ranges; whether port 50000 is configurable; behavior when control is disabled (presumably no response); maximum frame Data length (source says n limited to 255 for response, no command-side cap stated). -->

## Provenance

```yaml
source_domains:
  - lexicondsp.pl
  - manualslib.com
source_urls:
  - https://www.lexicondsp.pl/upload/mc10/RS232_Protocol_Documentation.pdf
  - https://www.manualslib.com/manual/1934747/Harman-Lexicon-Mc-10.html
retrieved_at: 2026-04-29T13:38:14.712Z
last_checked_at: 2026-06-01T20:45:22.079Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T20:45:22.079Z
matched_actions: 227
action_count: 227
confidence: medium
summary: "All 227 spec actions matched verbatim in source; transport port 50000 and baud 38400 confirmed; RC5 codes, binary commands, and AMX DDDP all verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range, IP addressing (DHCP/static behavior), AMX DDDP exposed as `AMX\\r` text command — included as one action but framing differs from binary protocol (ASCII over the same TCP port per source)."
- "settable parameters all expressed as parameterized actions above (volume, treble, bass, balance, sub trim, lipsync, leveller, cal offset, sub stereo trim, tuner preset, input name)."
- "no multi-step macros documented in source."
- "no explicit power-sequencing or interlock warnings stated. The protocol notes 0x85 (\"Command invalid at this time\") returned when Setup Menu open or tuner-context commands sent without tuner selected - handled by the device, no operator interlock required."
- "firmware version compatibility ranges; whether port 50000 is configurable; behavior when control is disabled (presumably no response); maximum frame Data length (source says n limited to 255 for response, no command-side cap stated)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
