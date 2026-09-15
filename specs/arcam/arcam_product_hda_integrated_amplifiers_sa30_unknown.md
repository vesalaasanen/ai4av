---
spec_id: admin/arcam-sa30
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam SA30 Control Spec"
manufacturer: Arcam
model_family: SA30
aliases: []
compatible_with:
  manufacturers:
    - Arcam
  models:
    - SA30
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-07-26T09:44:42.732Z
last_checked_at: 2026-09-09T22:16:29.827Z
generated_at: 2026-09-09T22:16:29.827Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS232 protocol version returned as x.y.z variable, not fixed in source"
  - "power set values for command 0x00 not documented (source shows only the 0xF0 request); power on/off achievable via RC5 simulation"
  - "firmware version compatibility not stated beyond \"unit code v7.13 and above\" for issue D.0 additions"
  - "RS232 protocol version — returned by device as x.y.z, not fixed in source"
  - "power on/off set values for command 0x00 not documented; only the 0xF0 request is specified"
  - "zone byte required for RC5 zone-2 (system 0x17) simulations not explicitly stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-09T22:16:29.827Z
  matched_actions: 166
  action_count: 166
  confidence: medium
  summary: "All 166 spec actions reproduce documented hex bytes from source; transport port 50000 and 38400 8N1 confirmed; AMX discovery and RC5 codes match source tables verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Arcam SA30 Control Spec

## Summary
Serial (RS-232) and IP (TCP) control protocol for the Arcam SA30 HDA integrated amplifier. Binary framed protocol: each transmission is `<St 0x21> <Zn> <Cc> <Dl> <Data...> <Et 0x0D>`; responses insert an answer code (`Ac`) after `Cc`. Virtual IR (RC5) commands are simulated via command 0x08, giving access to any remote-control function. Note: the source document is shared across the Arcam AVR/HDA range (chunk 1 headers reference AVR390/AVR550/AVR850/AV860/SR250; chunk 2 header references SA30/SA20/SA10); commands flagged "AVR450/750 only" or AVR-only in the source may not apply to the SA30.

<!-- UNRESOLVED: RS232 protocol version returned as x.y.z variable, not fixed in source -->
<!-- UNRESOLVED: power set values for command 0x00 not documented (source shows only the 0xF0 request); power on/off achievable via RC5 simulation -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 50000  # "IP control is via port 50000 of the IP address of the unit (in the Network Settings menu)"
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
# inferred from command evidence in source
- powerable    # RC5 Standby / Power On / Power Off codes; power state query 0x00
- routable     # source selection 0x0A / 0x1D, video output switching 0x4F, RC5 input selects
- queryable    # extensive query commands (0x00-0x44) returning current state
- levelable    # volume 0x0D, bass 0x36, treble 0x35, balance 0x3B, sub trim 0x3F, lipsync 0x40
```

## Actions
```yaml
# Frame: St=0x21, Zn=zone (0x01 zone1 / 0x02 zone2), Cc=command, Dl=data length, Data, Et=0x0D.
# No checksum byte. Response echoes frame with Ac (answer code) inserted after Cc.
# Zone byte shown as {zone} where the source documents per-zone addressing.

# --- System commands ---

- id: power_state_query
  label: Power State Query
  kind: query
  command: "21 {zone} 00 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 (zone 1 / master) or 0x02 (zone 2)"
  notes: Response data 0x00 = stand-by, 0x01 = powered on.

- id: display_brightness_query
  label: Display Brightness Query
  kind: query
  command: "21 01 01 01 F0 0D"
  params: []
  notes: Response data 0x00 = front panel off, 0x01 = L1, 0x02 = L2.

- id: headphone_status_query
  label: Headphone Status Query
  kind: query
  command: "21 01 02 01 F0 0D"
  params: []
  notes: Response data 0x00 = not connected, 0x01 = connected.

- id: fm_genre_query
  label: FM Genre Query
  kind: query
  command: "21 {zone} 03 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
  notes: Returns programme type as ASCII. Error 0x85 if FM not selected on zone.

- id: software_version_query
  label: Software Version Query
  kind: query
  command: "21 01 04 01 {component} 0D"
  params:
    - name: component
      type: integer
      description: "0xF0 RS232 protocol version, 0xF1 Host, 0xF2 OSD, 0xF3 DSP, 0xF4 NET, 0xF5 IAP"
  notes: Response echoes selector byte then major and minor version bytes.

- id: restore_factory_defaults
  label: Restore Factory Default Settings
  kind: action
  command: "21 01 05 02 AA AA 0D"
  params: []
  notes: Double 0xAA confirmation pattern to avoid accidental restore. See Safety.

- id: save_restore_settings
  label: Save/Restore Secure Copy of Settings
  kind: action
  command: "21 01 06 07 {operation} 55 55 {pin1} {pin2} {pin3} {pin4} 0D"
  params:
    - name: operation
      type: integer
      description: "0x00 = save secure backup, 0x01 = restore secure backup"
    - name: pin1
      type: integer
      description: "PIN digit 1"
    - name: pin2
      type: integer
      description: "PIN digit 2"
    - name: pin3
      type: integer
      description: "PIN digit 3"
    - name: pin4
      type: integer
      description: "PIN digit 4"
  notes: Returns 0x85 if no secure copy exists, if a save is already in progress (fails silently), or while command 0x1E is processing.

- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  command: "21 {zone} 08 02 {system} {rc5command} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: system
      type: integer
      description: "RC5 system code (Data1), e.g. 0x10 main zone, 0x17 zone 2"
    - name: rc5command
      type: integer
      description: "RC5 command code (Data2) - see RC5 action entries below and source code tables"
  notes: Any IR remote operation can be invoked this way; an additional status message usually follows.

- id: display_info_type_set
  label: Display Information Type Set
  kind: action
  command: "21 {zone} 09 01 {type} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: type
      type: integer
      description: "0x00 processing mode, 0xE0 cycle all panels, 0xF0 request current; FM: 0x01 radio text, 0x02 programme type, 0x03 signal strength; DAB: 0x01 radio text, 0x02 genre, 0x03 signal quality, 0x04 bit rate; NET/USB: 0x01 track, 0x02 artist, 0x03 album, 0x04 audio type, 0x05 rate"

- id: current_source_query
  label: Request Current Source
  kind: query
  command: "21 {zone} 1D 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
  notes: "Response: 0x00 follow zone 1, 0x01 CD, 0x02 BD, 0x03 AV, 0x04 SAT, 0x05 PVR, 0x06 VCR, 0x08 AUX, 0x09 DISPLAY, 0x0B TUNER(FM), 0x0C TUNER(DAB, AVR450/750 only), 0x0E NET, 0x0F USB, 0x10 STB, 0x11 GAME"

- id: headphone_override_set
  label: Headphone Over-ride Set
  kind: action
  command: "21 {zone} 1F 01 {state} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: state
      type: integer
      description: "0x00 = clear (speakers muted if headphones present), 0x01 = set (speakers unmuted if headphones present)"
  notes: Activates/deactivates mute relays; does not zero the volume.

- id: imax_enhanced_set
  label: IMAX Enhanced Set
  kind: action
  command: "21 {zone} 0C 01 {mode} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: mode
      type: integer
      description: "0xF0 request state, 0xF1 auto, 0xF2 on, 0xF3 off"
  notes: Added in source issue D.0; valid for unit code v7.13 and above.

# --- Input commands ---

- id: video_select
  label: Video Selection
  kind: action
  command: "21 01 0A 01 {source} 0D"
  params:
    - name: source
      type: integer
      description: "0x00 BD, 0x01 SAT, 0x02 AV, 0x03 PVR, 0x04 VCR, 0x05 Game, 0x06 STB, 0xF0 request current"
  notes: Returns 0x85 if OSD setup screen is showing.

- id: audio_input_select
  label: Select Analogue/Digital Audio Input
  kind: action
  command: "21 {zone} 0B 01 {type} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: type
      type: integer
      description: "0x00 analogue, 0x01 digital (if available), 0x02 HDMI (if available), 0xF0 request current"
  notes: Returns 0x85 if OSD setup screen is showing.

- id: input_name_set
  label: Set/Request Input Name
  kind: action
  command: "21 01 20 {len} {ascii-bytes} 0D"
  params:
    - name: ascii-bytes
      type: string
      description: "ASCII characters of the input name, max 10 characters; single byte 0xF0 to query current name"
  notes: "Example set 'BDP300': 21 01 20 06 42 44 50 33 30 30 0D. Response Dl=0x0A when requesting."

# --- Output commands ---

- id: volume_set
  label: Set/Request Volume
  kind: action
  command: "21 {zone} 0D 01 {level} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: level
      type: integer
      description: "0x00 (0) - 0x63 (99) to set; 0xF0 to request current volume"
  notes: Returns volume even when zone is muted; use mute status query to detect mute.

- id: mute_status_query
  label: Request Mute Status
  kind: query
  command: "21 {zone} 0E 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
  notes: Response data 0x00 = muted, 0x01 = not muted.

- id: direct_mode_status_query
  label: Request Direct Mode Status
  kind: query
  command: "21 01 0F 01 F0 0D"
  params: []
  notes: Response data 0x00 = direct mode off, 0x01 = on.

- id: decode_mode_2ch_query
  label: Request Decode Mode Status 2ch
  kind: query
  command: "21 01 10 01 F0 0D"
  params: []
  notes: "Response: 0x01 Stereo, 0x04 Dolby Surround, 0x07 Neo:6 Cinema, 0x08 Neo:6 Music, 0x09 5/7 Ch Stereo, 0x0A DTS Neural:X, 0x0B Reserved, 0x0C DTS Virtual:X"

- id: decode_mode_mch_query
  label: Request Decode Mode Status MCH
  kind: query
  command: "21 01 11 01 F0 0D"
  params: []
  notes: "Response: 0x01 Stereo down-mix, 0x02 Multi-channel, 0x03 DTS-ES / Neural:X, 0x06 Dolby Surround, 0x0B Reserved, 0x0C DTS Virtual:X"

- id: rds_info_query
  label: Request RDS Information
  kind: query
  command: "21 {zone} 12 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
  notes: Returns radio text as ASCII. Error 0x85 if FM not selected on zone.

- id: video_output_resolution_query
  label: Request Video Output Resolution
  kind: query
  command: "21 01 13 01 F0 0D"
  params: []
  notes: "Response: 0x02 SD Progressive, 0x03 720p, 0x04 1080i, 0x05 1080p, 0x06 Preferred, 0x07 Bypass, 0x08 4k"

- id: zone1_osd_set
  label: Set/Request Zone 1 OSD On/Off
  kind: action
  command: "21 01 4E 01 {state} 0D"
  params:
    - name: state
      type: integer
      description: "0xF0 request, 0xF1 OSD on, 0xF2 OSD off"
  notes: "Source example sequence uses Cc 0x4A while the byte table specifies 0x4E - discrepancy present in source. Response: 0x00 = OSD on, 0x01 = OSD off."

- id: video_output_switching_set
  label: Set/Request Video Output Switching
  kind: action
  command: "21 01 4F 01 {output} 0D"
  params:
    - name: output
      type: integer
      description: "0x02 HDMI Output 1, 0x03 HDMI Output 2, 0x04 HDMI Outputs 1 & 2, 0xF0 request current"

# --- Menu commands ---

- id: menu_status_query
  label: Request Menu Status
  kind: query
  command: "21 01 14 01 F0 0D"
  params: []
  notes: "Response: 0x00 none open, 0x02 Set-up, 0x03 Trim, 0x04 Bass, 0x05 Treble, 0x06 Sync, 0x07 Sub, 0x08 Tuner, 0x09 Network, 0x0A USB"

- id: tuner_preset_set
  label: Set/Request Tuner Preset
  kind: action
  command: "21 {zone} 15 01 {preset} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: preset
      type: integer
      description: "0x01-0x32 (1-50) preset number to select; 0xF0 to request current"
  notes: "Response: 0xFF = no preset selected, else 0x01-0x32. Error 0x85 if tuner not selected on zone."

- id: tune
  label: Tune
  kind: action
  command: "21 {zone} 16 01 {direction} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: direction
      type: integer
      description: "0x00 decrement by 1 step, 0x01 increment by 1 step, 0xF0 request current frequency"
  notes: FM steps of 0.05MHz. Response Data1 = MHz, Data2 = 10's kHz. Error 0x85 if tuner not selected.

- id: dab_station_query
  label: Request DAB Station
  kind: query
  command: "21 {zone} 18 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
  notes: Returns 16-byte ASCII service label padded with 0x20. Error 0x85 if DAB not selected.

- id: dab_genre_query
  label: Request DAB Programme Type/Category
  kind: query
  command: "21 {zone} 19 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
  notes: Returns 16-byte ASCII programme type padded with 0x20. Error 0x85 if DAB not selected.

- id: dab_dls_query
  label: Request DLS/PDT Info
  kind: query
  command: "21 {zone} 1A 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
  notes: Returns 128-byte ASCII digital radio text padded with 0x20. Error 0x85 if DAB not selected.

- id: preset_details_query
  label: Request Preset Details
  kind: query
  command: "21 {zone} 1B 01 {preset} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: preset
      type: integer
      description: "0x01-0x32 (1-50) preset number"
  notes: "Response Data2 type: 0x01 FM frequency (Data3 MHz, Data4 10's kHz), 0x02 FM RDS name, 0x03 DAB (AVR450/750 only); followed by ASCII name."

- id: network_playback_status_query
  label: Network Playback Status Query
  kind: query
  command: "21 {zone} 1C 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
  notes: "Response Data1: 0x00 navigating (folder name follows), 0x01 playing, 0x02 paused (file name follows), 0xFF busy/not playing. Error 0x85 if network not selected."

- id: fm_scan
  label: FM Scan Up/Down
  kind: action
  command: "21 {zone} 23 01 {direction} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: direction
      type: integer
      description: "0x01 scan up, 0x02 scan down"
  notes: Response data 0xFF = scanning. Only valid on FM input.

- id: dab_scan
  label: DAB Scan
  kind: action
  command: "21 {zone} 24 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
  notes: Response data 0xFF = scanning. Only valid on DAB input.

- id: heartbeat
  label: Heartbeat
  kind: query
  command: "21 01 25 01 F0 0D"
  params: []
  notes: Checks unit connectivity; also resets the EuP standby timer.

- id: reboot
  label: Reboot
  kind: action
  command: "21 01 26 06 52 45 42 4F 4F 54 0D"
  params: []
  notes: ASCII payload "REBOOT". Forces a reboot of the unit. See Safety.

- id: amx_duet_discovery
  label: AMX Duet DDDP Discovery
  kind: query
  command: "41 4D 58 0D"
  params: []
  notes: ASCII "AMX\r". Response "AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=...><Device-Revision=x.y.z>\r" where x.y.z is the RS232 protocol version. Sent as ASCII, outside the binary frame format.

# --- Setup adjustment commands ---

- id: treble_set
  label: Treble Equalisation Set
  kind: action
  command: "21 {zone} 35 01 {value} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: value
      type: integer
      description: "0x00-0x0C = 0 to +12dB, 0x81-0x8C = -1 to -12dB, 0xF0 request, 0xF1 increment 1dB, 0xF2 decrement 1dB"

- id: bass_set
  label: Bass Equalisation Set
  kind: action
  command: "21 {zone} 36 01 {value} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: value
      type: integer
      description: "0x00-0x0C = 0 to +12dB, 0x81-0x8C = -1 to -12dB, 0xF0 request, 0xF1 increment 1dB, 0xF2 decrement 1dB"

- id: room_eq_set
  label: Room Equalisation Set
  kind: action
  command: "21 {zone} 37 01 {state} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: state
      type: integer
      description: "0xF0 request, 0xF1 on, 0xF2 off"
  notes: "Response: 0x00 off, 0x01 on, 0x02 not calculated (therefore off)"

- id: dolby_volume_set
  label: Dolby Volume Set
  kind: action
  command: "21 {zone} 38 01 {state} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: state
      type: integer
      description: "0x00 off, 0x01 on, 0xF0 request current mode"

- id: dolby_leveller_set
  label: Dolby Leveller Set
  kind: action
  command: "21 {zone} 39 01 {value} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: value
      type: integer
      description: "0x00-0x0A = level 0-10, 0xF0 request, 0xF1 increment, 0xF2 decrement, 0xFF turn off"

- id: dolby_volume_calibration_offset_set
  label: Dolby Volume Calibration Offset Set
  kind: action
  command: "21 {zone} 3A 01 {value} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: value
      type: integer
      description: "0x00-0x0F = 0 to +15dB, 0x80-0x8F = -1 to -15dB, 0xF0 request, 0xF1 increment 1dB, 0xF2 decrement 1dB"

- id: balance_set
  label: Balance Set
  kind: action
  command: "21 {zone} 3B 01 {value} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: value
      type: integer
      description: "0x00-0x06 = 0 to 6, 0x81-0x86 = -1 to -6, 0xF0 request, 0xF1 increment 1dB, 0xF2 decrement 1dB"

- id: subwoofer_trim_set
  label: Subwoofer Trim Set
  kind: action
  command: "21 {zone} 3F 01 {value} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: value
      type: integer
      description: "0x00-0x14 = positive trim in 0.5dB steps (0x02 = +1.0dB), 0x81-0x94 = negative in 0.5dB steps (0x82 = -1.0dB), 0xF0 request, 0xF1 increment 0.5dB, 0xF2 decrement 0.5dB"

- id: lipsync_delay_set
  label: Lipsync Delay Set
  kind: action
  command: "21 {zone} 40 01 {value} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: value
      type: integer
      description: "0x00-0x32 = delay in 5ms steps (0x08 = 40ms), 0xF0 request, 0xF1 increment 5ms, 0xF2 decrement 5ms"

- id: compression_set
  label: Compression Set
  kind: action
  command: "21 {zone} 41 01 {value} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: value
      type: integer
      description: "0x00 off, 0x01 medium, 0x02 high, 0xF0 request current"

- id: sub_stereo_trim_set
  label: Set/Request Sub Stereo Trim
  kind: action
  command: "21 {zone} 45 01 {value} 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
    - name: value
      type: integer
      description: "0x00 = 0dB, 0x81-0x94 = -0.5dB to -10.0dB in 0.5dB steps, 0xF0 request, 0xF1 increment 0.5dB, 0xF2 decrement 0.5dB"

- id: incoming_video_params_query
  label: Request Incoming Video Parameters
  kind: query
  command: "21 {zone} 42 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
  notes: "Response 7 data bytes: H-res MSB/LSB, V-res MSB/LSB, refresh rate (half field rate for interlaced), interlaced flag (0x00 progressive / 0x01 interlaced), aspect (0x00 undefined, 0x01 4:3, 0x02 16:9). Example 720p50 16:9: 05 00 02 D0 32 00 02."

- id: incoming_audio_format_query
  label: Request Incoming Audio Format
  kind: query
  command: "21 {zone} 43 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
  notes: "Response Data1 stream format (0x00 PCM, 0x01 Analogue Direct, 0x02 Dolby Digital, 0x03 DD EX, 0x04 DD Surround, 0x05 DD Plus, 0x06 DD True HD, 0x07 DTS, 0x08 DTS 96/24, 0x09 DTS ES Matrix, 0x0A DTS ES Discrete, 0x0B DTS ES Matrix 96/24, 0x0C DTS ES Discrete 96/24, 0x0D DTS HD Master Audio, 0x0E DTS HD High Res, 0x0F DTS Low Bit Rate, 0x10 DTS Core, 0x13 PCM Zero, 0x14 Unsupported, 0x15 Undetected, 0x16 Dolby Atmos, 0x17 DTS:X, 0x18 IMAX ENHANCED); Data2 channel configuration 0x00-0x1F per source table"

- id: incoming_audio_sample_rate_query
  label: Request Incoming Audio Sample Rate
  kind: query
  command: "21 {zone} 44 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 or 0x02"
  notes: "Response: 0x00 32kHz, 0x01 44.1kHz, 0x02 48kHz, 0x03 88.2kHz, 0x04 96kHz, 0x05 176.4kHz, 0x06 192kHz, 0x07 Unknown, 0x08 Undetected"

# --- RC5 simulated IR functions (all via Simulate RC5 0x08) ---
# Command shows full frame for zone 1: "21 01 08 02 {system} {code} 0D".
# Zone-2 rows (RC5 system 0x17) shown with Zn 0x02 - zone byte choice inferred from zone-2 targeting; source does not state the required Zn explicitly.

- id: rc5_standby
  label: RC5 Standby
  kind: action
  command: "21 01 08 02 10 0C 0D"
  params: []

- id: rc5_digit_1
  label: RC5 Digit 1
  kind: action
  command: "21 01 08 02 10 01 0D"
  params: []

- id: rc5_digit_2
  label: RC5 Digit 2
  kind: action
  command: "21 01 08 02 10 02 0D"
  params: []

- id: rc5_digit_3
  label: RC5 Digit 3
  kind: action
  command: "21 01 08 02 10 03 0D"
  params: []

- id: rc5_digit_4
  label: RC5 Digit 4
  kind: action
  command: "21 01 08 02 10 04 0D"
  params: []

- id: rc5_digit_5
  label: RC5 Digit 5
  kind: action
  command: "21 01 08 02 10 05 0D"
  params: []

- id: rc5_digit_6
  label: RC5 Digit 6
  kind: action
  command: "21 01 08 02 10 06 0D"
  params: []

- id: rc5_digit_7
  label: RC5 Digit 7
  kind: action
  command: "21 01 08 02 10 07 0D"
  params: []

- id: rc5_digit_8
  label: RC5 Digit 8
  kind: action
  command: "21 01 08 02 10 08 0D"
  params: []

- id: rc5_digit_9
  label: RC5 Digit 9
  kind: action
  command: "21 01 08 02 10 09 0D"
  params: []

- id: rc5_digit_0
  label: RC5 Digit 0
  kind: action
  command: "21 01 08 02 10 00 0D"
  params: []

- id: rc5_access_lipsync_delay
  label: RC5 Access Lipsync Delay Control
  kind: action
  command: "21 01 08 02 10 32 0D"
  params: []

- id: rc5_cycle_vfd_info
  label: RC5 Cycle Between VFD Information Panels
  kind: action
  command: "21 01 08 02 10 37 0D"
  params: []

- id: rc5_rewind
  label: RC5 Rewind
  kind: action
  command: "21 01 08 02 10 79 0D"
  params: []

- id: rc5_fast_forward
  label: RC5 Fast Forward
  kind: action
  command: "21 01 08 02 10 34 0D"
  params: []

- id: rc5_skip_back
  label: RC5 Skip Back
  kind: action
  command: "21 01 08 02 10 21 0D"
  params: []

- id: rc5_skip_forward
  label: RC5 Skip Forward
  kind: action
  command: "21 01 08 02 10 0B 0D"
  params: []

- id: rc5_stop
  label: RC5 Stop
  kind: action
  command: "21 01 08 02 10 36 0D"
  params: []

- id: rc5_play
  label: RC5 Play
  kind: action
  command: "21 01 08 02 10 35 0D"
  params: []

- id: rc5_pause
  label: RC5 Pause
  kind: action
  command: "21 01 08 02 10 30 0D"
  params: []

- id: rc5_disc_enter_trim_menu
  label: RC5 Disc (Record) (Enter Trim Menu)
  kind: action
  command: "21 01 08 02 10 5A 0D"
  params: []

- id: rc5_menu
  label: RC5 MENU (Enter System Menu)
  kind: action
  command: "21 01 08 02 10 52 0D"
  params: []

- id: rc5_navigate_up
  label: RC5 Navigate Up
  kind: action
  command: "21 01 08 02 10 56 0D"
  params: []

- id: rc5_popup_dolby_volume
  label: RC5 Pop Up (Dolby Volume on/off)
  kind: action
  command: "21 01 08 02 10 46 0D"
  params: []

- id: rc5_navigate_left
  label: RC5 Navigate Left
  kind: action
  command: "21 01 08 02 10 51 0D"
  params: []

- id: rc5_ok
  label: RC5 OK
  kind: action
  command: "21 01 08 02 10 57 0D"
  params: []

- id: rc5_navigate_right
  label: RC5 Navigate Right
  kind: action
  command: "21 01 08 02 10 50 0D"
  params: []

- id: rc5_audio_room_eq
  label: RC5 Audio (Room EQ on/off)
  kind: action
  command: "21 01 08 02 10 1E 0D"
  params: []

- id: rc5_navigate_down
  label: RC5 Navigate Down
  kind: action
  command: "21 01 08 02 10 55 0D"
  params: []

- id: rc5_rtn_sub_trim
  label: RC5 RTN (Access Subwoofer Trim control)
  kind: action
  command: "21 01 08 02 10 33 0D"
  params: []

- id: rc5_home
  label: RC5 HOME
  kind: action
  command: "21 01 08 02 10 2B 0D"
  params: []

- id: rc5_mute_toggle
  label: RC5 Mute
  kind: action
  command: "21 01 08 02 10 0D 0D"
  params: []

- id: rc5_volume_up
  label: RC5 Increase Volume
  kind: action
  command: "21 01 08 02 10 10 0D"
  params: []

- id: rc5_mode_cycle_decode
  label: RC5 MODE (Cycle Between Decoding Modes)
  kind: action
  command: "21 01 08 02 10 20 0D"
  params: []

- id: rc5_disp_brightness
  label: RC5 DISP (Change VFD Brightness)
  kind: action
  command: "21 01 08 02 10 3B 0D"
  params: []

- id: rc5_direct_mode
  label: RC5 Activate DIRECT Mode
  kind: action
  command: "21 01 08 02 10 0A 0D"
  params: []

- id: rc5_volume_down
  label: RC5 Decrease Volume
  kind: action
  command: "21 01 08 02 10 11 0D"
  params: []

- id: rc5_red
  label: RC5 Red
  kind: action
  command: "21 01 08 02 10 29 0D"
  params: []

- id: rc5_green
  label: RC5 Green
  kind: action
  command: "21 01 08 02 10 2A 0D"
  params: []

- id: rc5_yellow
  label: RC5 Yellow
  kind: action
  command: "21 01 08 02 10 2B 0D"
  params: []

- id: rc5_blue
  label: RC5 Blue
  kind: action
  command: "21 01 08 02 10 37 0D"
  params: []

- id: rc5_radio
  label: RC5 Radio
  kind: action
  command: "21 01 08 02 10 5B 0D"
  params: []

- id: rc5_aux
  label: RC5 Aux
  kind: action
  command: "21 01 08 02 10 63 0D"
  params: []

- id: rc5_net
  label: RC5 Net
  kind: action
  command: "21 01 08 02 10 5C 0D"
  params: []

- id: rc5_usb
  label: RC5 USB
  kind: action
  command: "21 01 08 02 10 5D 0D"
  params: []

- id: rc5_av
  label: RC5 AV
  kind: action
  command: "21 01 08 02 10 5E 0D"
  params: []

- id: rc5_sat
  label: RC5 Sat
  kind: action
  command: "21 01 08 02 10 1B 0D"
  params: []

- id: rc5_pvr
  label: RC5 PVR
  kind: action
  command: "21 01 08 02 10 60 0D"
  params: []

- id: rc5_game
  label: RC5 Game
  kind: action
  command: "21 01 08 02 10 61 0D"
  params: []

- id: rc5_bd
  label: RC5 BD
  kind: action
  command: "21 01 08 02 10 62 0D"
  params: []

- id: rc5_cd
  label: RC5 CD
  kind: action
  command: "21 01 08 02 10 76 0D"
  params: []

- id: rc5_stb
  label: RC5 STB
  kind: action
  command: "21 01 08 02 10 64 0D"
  params: []

- id: rc5_vcr
  label: RC5 VCR
  kind: action
  command: "21 01 08 02 10 77 0D"
  params: []

- id: rc5_display
  label: RC5 Display
  kind: action
  command: "21 01 08 02 10 3A 0D"
  params: []

- id: rc5_power_on
  label: RC5 Power On
  kind: action
  command: "21 01 08 02 10 7B 0D"
  params: []

- id: rc5_power_off
  label: RC5 Power Off
  kind: action
  command: "21 01 08 02 10 7C 0D"
  params: []

- id: rc5_next_zone
  label: RC5 Change Control to Next Zone
  kind: action
  command: "21 01 08 02 10 5F 0D"
  params: []

- id: rc5_cycle_output_resolution
  label: RC5 Cycle Between Output Resolutions
  kind: action
  command: "21 01 08 02 10 2F 0D"
  params: []

- id: rc5_access_bass_control
  label: RC5 Access Bass Control
  kind: action
  command: "21 01 08 02 10 27 0D"
  params: []

- id: rc5_access_speaker_trim
  label: RC5 Access Speaker Trim Controls
  kind: action
  command: "21 01 08 02 10 25 0D"
  params: []

- id: rc5_access_treble_control
  label: RC5 Access Treble Control
  kind: action
  command: "21 01 08 02 10 0E 0D"
  params: []

- id: rc5_random
  label: RC5 Random
  kind: action
  command: "21 01 08 02 10 4C 0D"
  params: []

- id: rc5_repeat
  label: RC5 Repeat
  kind: action
  command: "21 01 08 02 10 31 0D"
  params: []

- id: rc5_direct_mode_on
  label: RC5 Direct Mode On
  kind: action
  command: "21 01 08 02 10 4E 0D"
  params: []

- id: rc5_direct_mode_off
  label: RC5 Direct Mode Off
  kind: action
  command: "21 01 08 02 10 4F 0D"
  params: []

- id: rc5_multi_channel
  label: RC5 Multi Channel
  kind: action
  command: "21 01 08 02 10 6A 0D"
  params: []

- id: rc5_stereo
  label: RC5 Stereo
  kind: action
  command: "21 01 08 02 10 6B 0D"
  params: []

- id: rc5_dolby_surround
  label: RC5 Dolby Surround
  kind: action
  command: "21 01 08 02 10 6E 0D"
  params: []

- id: rc5_dts_neo6_cinema
  label: RC5 DTS Neo:6 Cinema
  kind: action
  command: "21 01 08 02 10 6F 0D"
  params: []

- id: rc5_dts_neo6_music
  label: RC5 DTS Neo:6 Music
  kind: action
  command: "21 01 08 02 10 70 0D"
  params: []

- id: rc5_dts_neural_x
  label: RC5 DTS Neural:X
  kind: action
  command: "21 01 08 02 10 71 0D"
  params: []

- id: rc5_dts_virtual_x
  label: RC5 DTS Virtual:X
  kind: action
  command: "21 01 08 02 10 73 0D"
  params: []

- id: rc5_5_7ch_stereo
  label: RC5 5/7 Ch Stereo
  kind: action
  command: "21 01 08 02 10 45 0D"
  params: []

- id: rc5_dolby_d_ex
  label: RC5 Dolby D EX
  kind: action
  command: "21 01 08 02 10 17 0D"
  params: []

- id: rc5_mute_on
  label: RC5 Mute On
  kind: action
  command: "21 01 08 02 10 1A 0D"
  params: []

- id: rc5_mute_off
  label: RC5 Mute Off
  kind: action
  command: "21 01 08 02 10 78 0D"
  params: []

- id: rc5_fm
  label: RC5 FM
  kind: action
  command: "21 01 08 02 10 1C 0D"
  params: []

- id: rc5_dab
  label: RC5 DAB
  kind: action
  command: "21 01 08 02 10 48 0D"
  params: []

- id: rc5_lipsync_plus_5ms
  label: RC5 Lip Sync +5ms
  kind: action
  command: "21 01 08 02 10 0F 0D"
  params: []

- id: rc5_lipsync_minus_5ms
  label: RC5 Lip Sync -5ms
  kind: action
  command: "21 01 08 02 10 65 0D"
  params: []

- id: rc5_sub_trim_plus
  label: RC5 Sub Trim +0.5dB
  kind: action
  command: "21 01 08 02 10 69 0D"
  params: []

- id: rc5_sub_trim_minus
  label: RC5 Sub Trim -0.5dB
  kind: action
  command: "21 01 08 02 10 6C 0D"
  params: []

- id: rc5_display_off
  label: RC5 Display Off
  kind: action
  command: "21 01 08 02 10 1F 0D"
  params: []

- id: rc5_display_l1
  label: RC5 Display L1
  kind: action
  command: "21 01 08 02 10 22 0D"
  params: []

- id: rc5_display_l2
  label: RC5 Display L2
  kind: action
  command: "21 01 08 02 10 23 0D"
  params: []

- id: rc5_balance_left
  label: RC5 Balance Left
  kind: action
  command: "21 01 08 02 10 26 0D"
  params: []

- id: rc5_balance_right
  label: RC5 Balance Right
  kind: action
  command: "21 01 08 02 10 28 0D"
  params: []

- id: rc5_bass_plus_1
  label: RC5 Bass +1
  kind: action
  command: "21 01 08 02 10 2C 0D"
  params: []

- id: rc5_bass_minus_1
  label: RC5 Bass -1
  kind: action
  command: "21 01 08 02 10 2D 0D"
  params: []

- id: rc5_treble_plus_1
  label: RC5 Treble +1
  kind: action
  command: "21 01 08 02 10 2E 0D"
  params: []

- id: rc5_treble_minus_1
  label: RC5 Treble -1
  kind: action
  command: "21 01 08 02 10 66 0D"
  params: []

- id: rc5_zone2_follow_zone1
  label: RC5 Set Zone 2 to Follow Zone 1
  kind: action
  command: "21 01 08 02 10 14 0D"
  params: []

- id: rc5_zone2_power_on
  label: RC5 Zone 2 Power On
  kind: action
  command: "21 02 08 02 17 7B 0D"
  params: []
  notes: RC5 system 0x17 (23 decimal); Zn 0x02 inferred from zone-2 targeting.

- id: rc5_zone2_power_off
  label: RC5 Zone 2 Power Off
  kind: action
  command: "21 02 08 02 17 7C 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred from zone-2 targeting.

- id: rc5_zone2_volume_up
  label: RC5 Zone 2 Vol+
  kind: action
  command: "21 02 08 02 17 01 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_volume_down
  label: RC5 Zone 2 Vol-
  kind: action
  command: "21 02 08 02 17 02 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_mute_toggle
  label: RC5 Zone 2 Mute
  kind: action
  command: "21 02 08 02 17 03 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_mute_on
  label: RC5 Zone 2 Mute On
  kind: action
  command: "21 02 08 02 17 04 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_mute_off
  label: RC5 Zone 2 Mute Off
  kind: action
  command: "21 02 08 02 17 05 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_cd
  label: RC5 Zone 2 CD
  kind: action
  command: "21 02 08 02 17 06 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_bd
  label: RC5 Zone 2 BD
  kind: action
  command: "21 02 08 02 17 07 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_stb
  label: RC5 Zone 2 STB
  kind: action
  command: "21 02 08 02 17 08 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_av
  label: RC5 Zone 2 AV
  kind: action
  command: "21 02 08 02 17 09 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_game
  label: RC5 Zone 2 Game
  kind: action
  command: "21 02 08 02 17 0B 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_aux
  label: RC5 Zone 2 Aux
  kind: action
  command: "21 02 08 02 17 0D 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_pvr
  label: RC5 Zone 2 PVR
  kind: action
  command: "21 02 08 02 17 0F 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_fm
  label: RC5 Zone 2 FM
  kind: action
  command: "21 02 08 02 17 0E 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_dab
  label: RC5 Zone 2 DAB
  kind: action
  command: "21 02 08 02 17 10 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_usb
  label: RC5 Zone 2 USB
  kind: action
  command: "21 02 08 02 17 12 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_net
  label: RC5 Zone 2 NET
  kind: action
  command: "21 02 08 02 17 13 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_sat
  label: RC5 Zone 2 SAT
  kind: action
  command: "21 02 08 02 17 14 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_zone2_vcr
  label: RC5 Zone 2 VCR
  kind: action
  command: "21 02 08 02 17 15 0D"
  params: []
  notes: RC5 system 0x17; Zn 0x02 inferred.

- id: rc5_hdmi_out_1
  label: RC5 Select HDMI Out 1
  kind: action
  command: "21 01 08 02 10 49 0D"
  params: []

- id: rc5_hdmi_out_2
  label: RC5 Select HDMI Out 2
  kind: action
  command: "21 01 08 02 10 4A 0D"
  params: []

- id: rc5_hdmi_out_1_and_2
  label: RC5 Select HDMI Out 1 & 2
  kind: action
  command: "21 01 08 02 10 4B 0D"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
  notes: Response to 0x00 query; data 0x00 = stand-by, 0x01 = powered on.

- id: display_brightness
  type: enum
  values: [off, l1, l2]
  notes: Response to 0x01 query.

- id: headphone_status
  type: enum
  values: [disconnected, connected]
  notes: Response to 0x02 query.

- id: current_source
  type: enum
  values: [follow_zone1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]
  notes: Response to 0x1D query.

- id: volume
  type: integer
  values: "0-99"
  notes: Response to 0x0D; returned even when zone is muted.

- id: mute_state
  type: enum
  values: [muted, unmuted]
  notes: Response to 0x0E query.

- id: direct_mode_state
  type: enum
  values: [off, on]
  notes: Response to 0x0F query.

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, "5/7ch_stereo", dts_neural_x, reserved, dts_virtual_x]
  notes: Response to 0x10 query.

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multichannel, dts_es_neural_x, dolby_surround, reserved, dts_virtual_x]
  notes: Response to 0x11 query.

- id: video_output_resolution
  type: enum
  values: [sd_progressive, "720p", "1080i", "1080p", preferred, bypass, "4k"]
  notes: Response to 0x13 query.

- id: menu_state
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  notes: Response to 0x14 query.

- id: tuner_preset
  type: integer
  values: "1-50 or none (0xFF)"
  notes: Response to 0x15.

- id: network_playback_state
  type: enum
  values: [navigating, playing, paused, busy_not_playing]
  notes: Response to 0x1C; navigating includes folder name, playing/paused includes file name.

- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]
  notes: Response to 0x0C.

- id: room_eq_state
  type: enum
  values: [off, on, not_calculated]
  notes: Response to 0x37.

- id: incoming_audio_format
  type: enum
  values: [pcm, analogue_direct, dolby_digital, dolby_digital_ex, dolby_digital_surround, dolby_digital_plus, dolby_digital_truehd, dts, dts_96_24, dts_es_matrix, dts_es_discrete, dts_es_matrix_96_24, dts_es_discrete_96_24, dts_hd_master_audio, dts_hd_high_res, dts_low_bit_rate, dts_core, pcm_zero, unsupported, undetected, dolby_atmos, dts_x, imax_enhanced]
  notes: Response Data1 to 0x43; Data2 carries channel configuration 0x00-0x1F.

- id: incoming_audio_sample_rate
  type: enum
  values: ["32kHz", "44.1kHz", "48kHz", "88.2kHz", "96kHz", "176.4kHz", "192kHz", unknown, undetected]
  notes: Response to 0x44.

- id: software_version
  type: string
  values: "major.minor per selected component (RS232/Host/OSD/DSP/NET/IAP)"
  notes: Response to 0x04.
```

## Variables
```yaml
- id: zone_volume
  type: integer
  min: 0
  max: 99
  notes: Per-zone volume via command 0x0D.

- id: treble
  type: integer
  min: -12
  max: 12
  notes: dB via command 0x35; 0xF1/0xF2 step ±1dB.

- id: bass
  type: integer
  min: -12
  max: 12
  notes: dB via command 0x36; 0xF1/0xF2 step ±1dB.

- id: balance
  type: integer
  min: -6
  max: 6
  notes: Via command 0x3B; 0xF1/0xF2 step 1.

- id: subwoofer_trim
  type: number
  min: -10.0
  max: 10.0
  notes: dB in 0.5dB steps via command 0x3F.

- id: sub_stereo_trim
  type: number
  min: -10.0
  max: 0.0
  notes: dB in 0.5dB steps via command 0x45.

- id: lipsync_delay
  type: integer
  min: 0
  max: 250
  notes: ms in 5ms steps via command 0x40.

- id: dolby_leveller
  type: integer
  min: 0
  max: 10
  notes: Via command 0x39; 0xFF turns off.

- id: dolby_volume_calibration_offset
  type: integer
  min: -15
  max: 15
  notes: dB via command 0x3A.

- id: tuner_preset
  type: integer
  min: 1
  max: 50
  notes: Via command 0x15.
```

## Events
```yaml
- id: unsolicited_status_update
  description: >-
    State changes caused by front panel or IR remote input are relayed to the
    controller using the appropriate message type with answer code 0x00
    (status update) - e.g. display brightness changes, decode mode changes.
  trigger: external_user_input

- id: amx_duet_dddp_response
  description: >-
    Response to ASCII "AMX\r": "AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=...><Device-Revision=x.y.z>\r".
  trigger: amx_discovery_request
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults  # command 0x05 requires literal 0xAA 0xAA confirmation pattern "to avoid accidental restore"
  - save_restore_settings     # command 0x06 requires literal 0x55 0x55 confirmation pattern plus 4-digit PIN
  - reboot                    # command 0x26 forces a reboot of the unit
interlocks:
  - "Commands 0xF0 to 0xFF (inclusive) are reserved for test functions and should never be used."
  - "Certain commands cannot be processed when the Setup Menu is displayed (answer code 0x85); tuner commands require tuner input selected; FM/DAB/network queries require the corresponding input selected on the zone."
  - "Control is disabled by default for minimum standby power: enable RS232 control by pressing and holding front panel DIRECT for 4 seconds until 'RS232 CONTROL ON' shows on the VFD, or enable Control (RS232/IP) in the OSD General Setup menu."
```

## Notes
- Frame format has no checksum: `0x21, Zn, Cc, Dl, Data..., 0x0D`; responses add `Ac` after `Cc`. Data length limited to 255 bytes.
- Zones: 0x01 = zone 1 (master; zone-less commands refer to it), 0x02 = zone 2.
- Answer codes: 0x00 status update, 0x82 zone invalid, 0x83 command not recognised, 0x84 parameter not recognised, 0x85 command invalid at this time, 0x86 invalid data length.
- Device responds within three seconds; the controller may pipeline further commands before earlier responses arrive.
- RS-232 cable is null-modem wired: 2→3 (Rx↔Tx), 3→2, 5→5 ground.
- AMX Duet DDDP discovery ("AMX\r") is ASCII and sits outside the binary frame format.
- Source discrepancies preserved verbatim: Zone 1 OSD command titled 0x4E but its worked example uses Cc 0x4A; command 0x1A worked example omits the Dl byte. The FM Scan (0x23) byte table is embedded under the Heartbeat (0x25) heading in the source layout.
- Source changelog: issue D.0 added reserved mode command, DTS Virtual:X (IR and commands 0x10/0x11), IMAX Enhanced (0x43 value and new command 0x0C) — "valid for unit code v7.13 and above".
- RC5 table row "Reserved" (16-114 / 0x10-0x72) excluded as it is not a function. RC5 code 16-43 (0x2B) appears in the source as both HOME and Yellow.
- DAB-specific commands/inputs flagged "AVR450/750 only" in the source; the SA30's DAB support via these commands is not confirmed by the source.
- The source document is shared across the Arcam range (AVR390/AVR550/AVR850/AV860/SR250 per chunk 1; SA30/SA20/SA10 per chunk 2 header); AMX response examples list AVR/SR models only.

<!-- UNRESOLVED: firmware version compatibility not stated beyond "unit code v7.13 and above" for issue D.0 additions -->
<!-- UNRESOLVED: RS232 protocol version — returned by device as x.y.z, not fixed in source -->
<!-- UNRESOLVED: power on/off set values for command 0x00 not documented; only the 0xF0 request is specified -->
<!-- UNRESOLVED: zone byte required for RC5 zone-2 (system 0x17) simulations not explicitly stated in source -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-07-26T09:44:42.732Z
last_checked_at: 2026-09-09T22:16:29.827Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-09T22:16:29.827Z
matched_actions: 166
action_count: 166
confidence: medium
summary: "All 166 spec actions reproduce documented hex bytes from source; transport port 50000 and 38400 8N1 confirmed; AMX discovery and RC5 codes match source tables verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS232 protocol version returned as x.y.z variable, not fixed in source"
- "power set values for command 0x00 not documented (source shows only the 0xF0 request); power on/off achievable via RC5 simulation"
- "firmware version compatibility not stated beyond \"unit code v7.13 and above\" for issue D.0 additions"
- "RS232 protocol version — returned by device as x.y.z, not fixed in source"
- "power on/off set values for command 0x00 not documented; only the 0xF0 request is specified"
- "zone byte required for RC5 zone-2 (system 0x17) simulations not explicitly stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
