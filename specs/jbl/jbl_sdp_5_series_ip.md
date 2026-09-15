---
spec_id: admin/jbl-sdp-5-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "JBL SDP-5 Series Control Spec"
manufacturer: JBL
model_family: "SDP-5 Series"
aliases: []
compatible_with:
  manufacturers:
    - JBL
  models:
    - "SDP-5 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - jblsynthesis.com
source_urls:
  - https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw07c644ac/pdfs/RS232_SDR35_38_SDP55_58_SH289E_E_2Jun21.pdf
retrieved_at: 2026-06-25T11:55:18.356Z
last_checked_at: 2026-09-11T22:18:35.793Z
generated_at: 2026-09-11T22:18:35.793Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RC5 IR code table (referenced \"from page 39\") not present in refined source — Simulate RC5 (0x08) system/command codes unknown"
  - "RS232 protocol version only obtainable at runtime via 0x04 query (example shows 1.4)"
  - "RC5 IR code table (system/command codes, \"from page 39\") absent from refined source — simulate_rc5_ir params undocumented"
  - "full byte maps for 0x28 Input config / 0x29 General Setup partially truncated in source extraction"
  - "firmware version compatibility not stated in source"
  - "0x4E Zone 1 OSD example uses Cc 0x4A — source inconsistency, cannot determine which is correct from source alone"
verification:
  verdict: verified
  checked_at: 2026-09-11T22:18:35.793Z
  matched_actions: 63
  action_count: 63
  confidence: medium
  summary: "All 63 spec actions have matching source command codes (0x00-0x64 hex opcodes plus AMX DDDP), transport values verbatim, and no source commands remain unrepresented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# JBL SDP-5 Series Control Spec

## Summary
JBL SDP-5 Series AV surround processor controlled via RS232 or IP (TCP port 50000) using a binary byte-framed protocol. Covers power/display/tuner queries, volume and EQ control, input/zone/HDMI configuration menus, RC5 IR simulation, and AMX Duet DDDP discovery. Source changelog also applies document to SDR-38/SDP-58 and references SDP-55 in examples.

<!-- UNRESOLVED: RC5 IR code table (referenced "from page 39") not present in refined source — Simulate RC5 (0x08) system/command codes unknown -->
<!-- UNRESOLVED: RS232 protocol version only obtainable at runtime via 0x04 query (example shows 1.4) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 50000  # stated: "IP control is via port 50000 of the IP address of the unit"
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
# - powerable       # inferred: power state query 0x00 present; any IR-remote operation (incl. power) reachable via Simulate RC5 0x08 per source intro
# - queryable       # inferred: extensive query commands (0x00, 0x01, 0x02, 0x10, 0x11, 0x42, 0x43, 0x44, ...)
# - levelable       # inferred: volume set 0x0D, treble 0x35, bass 0x36, balance 0x3B, trims 0x3F/0x45
# - routable        # inferred: Zone 2 input select via 0x2F Data1; video input assignment via 0x2D; audio source type via 0x0B
```

## Actions
```yaml
# Framing: command = 0x21 <Zn> <Cc> <Dl> <Data> 0x0D ; response = 0x21 <Zn> <Cc> <Ac> <Dl> <Data> 0x0D
# Zones: 0x01 = Zone 1 (master), 0x02 = Zone 2. Commands 0xF0-0xFF reserved for test - never use.
# Each entry below = one command code (Cc) from source. Sub-values are params of that command.

- id: amx_duet_discovery
  label: AMX Duet DDDP Discovery
  kind: query
  command: "AMX\r"
  params: []
  notes: "ASCII DDDP; response AMXB<Device-SDKClass=Receiver><Device-Make=JBL><Device-Model=modelname><Device-Revision=x.y.z>\r"

- id: power_state_query
  label: Power State Query (0x00)
  kind: query
  command: "0x21 {zone} 0x00 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte: 0x01 (Zone 1 / master) or 0x02 (Zone 2)"
  notes: "Response data 0x00 = standby, 0x01 = powered on"

- id: display_brightness_query
  label: Display Brightness Query (0x01)
  kind: query
  command: "0x21 0x01 0x01 0x01 0xF0 0x0D"
  params: []
  notes: "Response data 0x00 = front panel off, 0x01 = L1, 0x02 = L2"

- id: headphone_status_query
  label: Headphone Connection Query (0x02)
  kind: query
  command: "0x21 0x01 0x02 0x01 0xF0 0x0D"
  params: []
  notes: "Response data 0x00 = not connected, 0x01 = connected"

- id: fm_genre_query
  label: FM Programme Type Query (0x03)
  kind: query
  command: "0x21 {zone} 0x03 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
  notes: "Returns programme type in ASCII; error 0x85 if FM not selected on zone"

- id: software_version_query
  label: Software Version Query (0x04)
  kind: query
  command: "0x21 0x01 0x04 0x01 {component} 0x0D"
  params:
    - name: component
      type: enum
      description: "0xF0 RS232, 0xF1 Host, 0xF2 OSD, 0xF3 DSP, 0xF4 NET, 0xF5 IAP"
  notes: "Response echoes request byte + major + minor version"

- id: restore_factory_defaults
  label: Restore Factory Defaults (0x05)
  kind: action
  command: "0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"
  params: []
  notes: "0xAA 0xAA confirmation pattern to avoid accidental restore"

- id: secure_backup_save_restore
  label: Save/Restore Secure Settings Copy (0x06)
  kind: action
  command: "0x21 0x01 0x06 0x07 {operation} 0x55 0x55 {pin1} {pin2} {pin3} {pin4} 0x0D"
  params:
    - name: operation
      type: enum
      description: "0x00 save secure backup, 0x01 restore secure backup"
    - name: pin1
      type: integer
      description: "Pin digit 1 (hex)"
    - name: pin2
      type: integer
      description: "Pin digit 2 (hex)"
    - name: pin3
      type: integer
      description: "Pin digit 3 (hex)"
    - name: pin4
      type: integer
      description: "Pin digit 4 (hex)"
  notes: "0x55 0x55 confirmation pattern; returns 0x85 if no secure copy or 0x1E in progress; concurrent second save fails silently"

- id: simulate_rc5_ir
  label: Simulate RC5 IR Command (0x08)
  kind: action
  command: "0x21 {zone} 0x08 0x02 {system_code} {command_code} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: system_code
      type: integer
      description: "RC5 system code (e.g. 0x10)"
    - name: command_code
      type: integer
      description: "RC5 command code (e.g. 0x10 volume up, 0x11 volume down)"
  notes: "Any IR-remote operation reachable this way; extra status message usually follows. RC5 code table not in refined source"

- id: set_display_info_type
  label: Set Display Information Type (0x09)
  kind: action
  command: "0x21 {zone} 0x09 0x01 {info_type} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: info_type
      type: enum
      description: "All sources: 0x00 processing, 0xE0 cycle, 0xF0 request current. FM: 0x01 radio text, 0x02 programme type, 0x03 signal strength. DAB: 0x01 radio text, 0x02 genre, 0x03 signal quality, 0x04 bit rate. NET: 0x01 track, 0x02 artist, 0x03 album, 0x04 audio type, 0x05 rate"
  notes: "Response echoes data sent"

- id: select_audio_input_type
  label: Select Analog/Digital Audio Input (0x0B)
  kind: action
  command: "0x21 {zone} 0x0B 0x01 {audio_type} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: audio_type
      type: enum
      description: "0x00 analog, 0x01 digital (if available), 0x02 HDMI (if available), 0xF0 request current"
  notes: "Returns 0x85 if OSD setup screen showing"

- id: imax_enhanced_set
  label: Set IMAX Enhanced Mode (0x0C)
  kind: action
  command: "0x21 {zone} 0x0C 0x01 {mode} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: mode
      type: enum
      description: "0xF1 auto, 0xF2 on, 0xF3 off, 0xF0 request current"
  notes: "Response data 0x00 off, 0x01 on, 0x02 auto"

- id: set_volume
  label: Set/Request Volume (0x0D)
  kind: action
  command: "0x21 {zone} 0x0D 0x01 {level} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: level
      type: integer
      description: "0x00 (0) - 0x63 (99) to set; 0xF0 to request current"
  notes: "Returns volume even if zone muted (e.g. 42dB = 0x2A); use 0x0E for mute state"

- id: mute_status_query
  label: Mute Status Query (0x0E)
  kind: query
  command: "0x21 {zone} 0x0E 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
  notes: "Response data 0x00 = muted, 0x01 = not muted"

- id: direct_mode_status_query
  label: Direct Mode Status Query (0x0F)
  kind: query
  command: "0x21 0x01 0x0F 0x01 0xF0 0x0D"
  params: []
  notes: "Response data 0x00 = off, 0x01 = on"

- id: decode_mode_2ch_query
  label: Decode Mode 2ch Query (0x10)
  kind: query
  command: "0x21 0x01 0x10 0x01 0xF0 0x0D"
  params: []
  notes: "Response data: 0x01 Stereo, 0x04 Dolby Surround, 0x07 Neo:6 Cinema, 0x08 Neo:6 Music, 0x09 5/7 Ch Stereo, 0x0A DTS Neural:X, 0x0C DTS Virtual:X, 0x0D Dolby Virtual Height, 0x0E Auro Native, 0x0F Auro-Matic 3D, 0x10 Auro-2D"

- id: decode_mode_mch_query
  label: Decode Mode MCH Query (0x11)
  kind: query
  command: "0x21 0x01 0x11 0x01 0xF0 0x0D"
  params: []
  notes: "Response data: 0x01 Stereo down-mix, 0x02 Multi-channel, 0x03 DTS Neural:X, 0x06 Dolby Surround, 0x0C DTS Virtual:X, 0x0D Dolby Virtual Height, 0x0E Auro Native, 0x0F Auro-Matic 3D, 0x10 Auro-2D"

- id: rds_info_query
  label: RDS Information Query (0x12)
  kind: query
  command: "0x21 {zone} 0x12 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
  notes: "ASCII radio text; error 0x85 if FM not selected"

- id: video_output_resolution_query
  label: Video Output Resolution Query (0x13)
  kind: query
  command: "0x21 0x01 0x13 0x01 0xF0 0x0D"
  params: []
  notes: "Always 0x07 bypass (legacy support command)"

- id: menu_status_query
  label: Menu Status Query (0x14)
  kind: query
  command: "0x21 0x01 0x14 0x01 0xF0 0x0D"
  params: []
  notes: "Response data: 0x00 none, 0x02 Set-up, 0x03 Trim, 0x04 Bass, 0x05 Treble, 0x06 Sync, 0x07 Sub, 0x08 Tuner, 0x09 Network, 0x0A USB"

- id: tuner_preset_set
  label: Set/Request Tuner Preset (0x15)
  kind: action
  command: "0x21 {zone} 0x15 0x01 {preset} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: preset
      type: integer
      description: "0x01-0x32 (1-50) to select; 0xF0 to request current"
  notes: "Response 0xFF = no preset selected; error 0x85 if tuner not selected"

- id: tune_step
  label: Tuner Tune Step/Request (0x16)
  kind: action
  command: "0x21 {zone} 0x16 0x01 {direction} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: direction
      type: enum
      description: "0x00 decrement 0.05MHz, 0x01 increment 0.05MHz, 0xF0 request current frequency"
  notes: "Response: Data1 = FM MHz, Data2 = 10s kHz; error 0x85 if tuner not selected"

- id: dab_station_query
  label: DAB Station Query (0x18)
  kind: query
  command: "0x21 {zone} 0x18 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
  notes: "16-byte ASCII service label padded with 0x20; error 0x85 if DAB not selected"

- id: dab_genre_query
  label: DAB Programme Type Query (0x19)
  kind: query
  command: "0x21 {zone} 0x19 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
  notes: "16-byte ASCII genre padded with 0x20; error 0x85 if DAB not selected"

- id: dab_dls_info_query
  label: DAB DLS/PDT Info Query (0x1A)
  kind: query
  command: "0x21 {zone} 0x1A 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
  notes: "128-byte ASCII digital radio text padded with 0x20; error 0x85 if DAB not selected"

- id: preset_details_query
  label: Preset Details Query (0x1B)
  kind: query
  command: "0x21 {zone} 0x1B 0x01 {preset} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: preset
      type: integer
      description: "0x01-0x32 (1-50)"
  notes: "Response: preset no, band (0x01 FM freq, 0x02 FM RDS name, 0x03 DAB), then frequency/name ASCII"

- id: network_playback_status_query
  label: Network Playback Status Query (0x1C)
  kind: query
  command: "0x21 {zone} 0x1C 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
  notes: "Response data: 0x00 stopped, 0x01 transitioning, 0x02 playing, 0x03 paused; error 0x85 if NET not selected"

- id: current_source_query
  label: Current Source Query (0x1D)
  kind: query
  command: "0x21 {zone} 0x1D 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
  notes: "Response data: 0x00 Follow Zone 1, 0x01 CD, 0x02 BD, 0x03 AV, 0x04 SAT, 0x05 PVR, 0x06 UHD, 0x08 AUX, 0x09 DISPLAY, 0x0B TUNER FM, 0x0C TUNER DAB, 0x0E NET, 0x10 STB, 0x11 GAME, 0x12 BT"

- id: headphone_override_set
  label: Headphone Override Set (0x1F)
  kind: action
  command: "0x21 {zone} 0x1F 0x01 {state} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: state
      type: enum
      description: "0x00 clear (speakers muted if headphones present), 0x01 set (speakers unmuted if headphones present)"
  notes: "Activates/deactivates mute relays; does not zero volume"

- id: input_name_set
  label: Set/Request Input Name (0x20)
  kind: action
  command: "0x21 0x01 0x20 {len} {name_ascii} 0x0D"
  params:
    - name: len
      type: integer
      description: "Data length: 0x01 with data 0xF0 to query, or n (max 10 characters) when setting"
    - name: name_ascii
      type: string
      description: "Input name in ASCII bytes, max 10 characters (omit when querying)"
  notes: "Example set 'BDP300': 0x21 0x01 0x20 0x06 0x42 0x44 0x50 0x33 0x30 0x30 0x0D"

- id: fm_scan
  label: FM Scan Up/Down (0x23)
  kind: action
  command: "0x21 0x01 0x23 0x01 {direction} 0x0D"
  params:
    - name: direction
      type: enum
      description: "0x01 scan up, 0x02 scan down"
  notes: "Response 0xFF = scanning; only valid on FM input"

- id: dab_scan
  label: DAB Scan (0x24)
  kind: action
  command: "0x21 0x01 0x24 0x01 0xF0 0x0D"
  params: []
  notes: "Response 0xFF = scanning, 0x00 = finished; only valid on DAB input"

- id: heartbeat
  label: Heartbeat (0x25)
  kind: action
  command: "0x21 0x01 0x25 0x01 0xF0 0x0D"
  params: []
  notes: "Checks unit connectivity; resets EuP standby timer"

- id: reboot
  label: Reboot (0x26)
  kind: action
  command: "0x21 0x01 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D"
  params: []
  notes: "Data = ASCII 'REBOOT'; forces unit reboot"

- id: setup_start
  label: Start Remote Setup (0x27)
  kind: action
  command: "0x21 0x01 0x27 0x01 0xF0 0x0D"
  params: []
  notes: "Response 0xnn = setup mode active (nn = menu version), 0xFF = setup from front panel, remote setup not possible"

- id: input_config_set
  label: Set/Request Input Config (0x28)
  kind: action
  command: "0x21 0x01 0x28 0x01 0xF0 0x0D"
  params:
    - name: payload
      type: string
      description: "Set = Data 1-25: input name (10 ASCII), lip sync 0x00-0x32 (5ms steps), mode, MCH mode, bass, treble, room EQ, input trim, Dolby Audio, stereo mode, sub stereo, IMAX mode, Auro-Matic 3D mode, Auro-Matic strength, audio source, CD Direct. Query = single 0xF0 with Dl 0x01"
  notes: "Response Dl 0x19; full byte map in source partially truncated"

- id: general_setup_set
  label: Set/Request General Setup (0x29)
  kind: action
  command: "0x21 0x01 0x29 0x01 0xF0 0x0D"
  params:
    - name: payload
      type: string
      description: "Set = Data 1-32: input name, audio stream format, channel config, sample rate, bitrate, dialnorm, video resolution, interlaced flag, aspect ratio, color space, compression, balance, DTS dialogue control, max volume, max on volume, display on time, control option, power on option, language. Query = single 0xF0 with Dl 0x01"
  notes: "Response Dl 0x20; full byte map in source partially truncated"

- id: speaker_types_set
  label: Set/Request Speaker Types (0x2A)
  kind: action
  command: "0x21 0x01 0x2A 0x01 0xF0 0x0D"
  params:
    - name: payload
      type: string
      description: "Set = Data 1-13: speaker types for L/R, Centre, Surr, Back, Height1, Height2 (0x00 Large ... 0x10 None), subwoofer, front wides (ch13/14), middle heights/CH&TS (ch15/16), filter slope, sub gain. Query = single 0xF0"
  notes: "Response Dl 0x0D"

- id: speaker_distances_set
  label: Set/Request Speaker Distances (0x2B)
  kind: action
  command: "0x21 0x01 0x2B 0x01 0xF0 0x0D"
  params:
    - name: payload
      type: string
      description: "Set = Data 1-33: units (0x00 m, 0x01 ft, 0x02 mS) + 16 speakers x 2 bytes (m:cm / ft:in). Query = single 0xF0"
  notes: "Response Dl 0x21; speaker order FL, C, FR, SR, SBR, SBL, SL, LTF, RTF, LTB, RTB, Sub, Ch13-16"

- id: speaker_levels_set
  label: Set/Request Speaker Levels (0x2C)
  kind: action
  command: "0x21 0x01 0x2C 0x01 0xF0 0x0D"
  params:
    - name: payload
      type: string
      description: "Set = Data 1-18: test tone (0x00 internal, 0x01 external), 16 speaker levels (0x00-0x14 = 0 to +10dB, 0x81-0x94 = -0.5 to -10dB), noise output channel select. Query = single 0xF0"
  notes: "Response Dl 0x12"

- id: video_inputs_set
  label: Set/Request Video Inputs (0x2D)
  kind: action
  command: "0x21 0x01 0x2D 0x01 0xF0 0x0D"
  params:
    - name: payload
      type: string
      description: "Set = Data 1-6: video input assignment for CD, Aux, FM, DAB, NET, BT (0x00 STB, 0x01 GAME, 0x02 AV, 0x03 SAT, 0x04 BD, 0x05 VCR, 0x06 PVR, 0x07 None). Query = single 0xF0"
  notes: "Response Dl 0x06"

- id: hdmi_settings_set
  label: Set/Request HDMI Settings (0x2E)
  kind: action
  command: "0x21 0x01 0x2E 0x01 0xF0 0x0D"
  params:
    - name: payload
      type: string
      description: "Set = Data 1-10: Zone 1 OSD, Zone 1 out (0x00 both, 0x01 out1, 0x02 out2), lip sync (info only), HDMI audio to TV, HDMI bypass & IP, bypass source, CEC control, ARC control, TV audio, power off control. Query = single 0xF0"
  notes: "Response Dl 0x0A"

- id: zone_settings_set
  label: Set/Request Zone Settings (0x2F)
  kind: action
  command: "0x21 0x01 0x2F 0x01 0xF0 0x0D"
  params:
    - name: payload
      type: string
      description: "Set = Data 1-6+: Zone 2 input (0x00 follow Z1, 0x01 CD ... 0x0E Display), Zone 2 status (standby/on), Zone 2 volume 0x14-0x53 (20-83), max volume, fixed volume flag, max on volume. Query = single 0xF0"
  notes: "Response Dl 0x06"

- id: network_settings_set
  label: Set/Request Network Settings (0x30)
  kind: action
  command: "0x21 0x01 0x30 0x01 0xF0 0x0D"
  params:
    - name: payload
      type: string
      description: "Set = Data 1-69: net source (follow Z1/Z2), SSID (20 char), network key (20 char, set only), IP address (4 bytes), MAC address (4 bytes), friendly name (20 char). Query = single 0xF0"
  notes: "Response Dl 0x45"

- id: bluetooth_settings_set
  label: Set/Request Bluetooth Settings (0x32)
  kind: action
  command: "0x21 0x01 0x32 0x01 0xF0 0x0D"
  params:
    - name: payload
      type: string
      description: "Set = Data 1-2 (pair device 0x01, clear paired devices 0x01; 0x00 no effect). Query = single 0xF0"
  notes: "Response includes up to 8 paired device names, 20 ASCII chars each"

- id: engineering_menu_set
  label: Set/Request Engineering Menu (0x33)
  kind: action
  command: "0x21 0x01 0x33 0x01 0xF0 0x0D"
  params:
    - name: payload
      type: string
      description: "Set = reset factory defaults, check for update, restore/store secure backup, restore/store USB backup, pin (4 hex), region, remote code, standby mode, protection sensitivity, display HDMI, display type, DANTE enable, C4 SDDP, send C4 identify. Query = single 0xF0"
  notes: "Response Dl 0x2B incl. shutdown code + version info strings"

- id: room_eq_names_query
  label: Room EQ Names Query (0x34)
  kind: query
  command: "0x21 0x01 0x34 0x01 0xF0 0x0D"
  params: []
  notes: "Returns up to 3 EQ slot names, 20 ASCII chars each (Dl 20/40/60)"

- id: treble_eq_set
  label: Treble Equalisation Set (0x35)
  kind: action
  command: "0x21 {zone} 0x35 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: value
      type: enum
      description: "0x00-0x0C = 0 to +12dB, 0x81-0x8C = -1 to -12dB, 0xF0 request, 0xF1 increment 1dB, 0xF2 decrement 1dB"

- id: bass_eq_set
  label: Bass Equalisation Set (0x36)
  kind: action
  command: "0x21 {zone} 0x36 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: value
      type: enum
      description: "0x00-0x0C = 0 to +12dB, 0x81-0x8C = -1 to -12dB, 0xF0 request, 0xF1 increment 1dB, 0xF2 decrement 1dB"

- id: room_eq_set
  label: Room Equalisation Set (0x37)
  kind: action
  command: "0x21 {zone} 0x37 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: value
      type: enum
      description: "0x00 off, 0x01 EQ1, 0x02 EQ2, 0x03 EQ3, 0xF0 request"
  notes: "Response 0x04 = Room EQ not calculated (therefore off)"

- id: dolby_audio_set
  label: Dolby Audio Mode Set (0x38)
  kind: action
  command: "0x21 {zone} 0x38 0x01 {mode} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: mode
      type: enum
      description: "0x00 off, 0x01 movie, 0x02 music, 0x03 night, 0xF0 request"

- id: balance_set
  label: Balance Set (0x3B)
  kind: action
  command: "0x21 {zone} 0x3B 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: value
      type: enum
      description: "0x00-0x06 = 0 to 6, 0x81-0x86 = -1 to -6, 0xF0 request, 0xF1 increment, 0xF2 decrement"

- id: subwoofer_trim_set
  label: Subwoofer Trim Set (0x3F)
  kind: action
  command: "0x21 {zone} 0x3F 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: value
      type: enum
      description: "0x00-0x14 = positive trim in 0.5dB steps, 0x81-0x94 = negative in 0.5dB steps, 0xF0 request, 0xF1 increment 0.5dB, 0xF2 decrement 0.5dB"

- id: lipsync_delay_set
  label: Lipsync Delay Set (0x40)
  kind: action
  command: "0x21 {zone} 0x40 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: value
      type: enum
      description: "0x00-0x32 = delay in 5ms steps (0x08 = 40ms), 0xF0 request, 0xF1 increment 5ms, 0xF2 decrement 5ms"

- id: compression_set
  label: Dynamic Range Compression Set (0x41)
  kind: action
  command: "0x21 {zone} 0x41 0x01 {mode} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: mode
      type: enum
      description: "0x00 off, 0x01 medium, 0x02 high, 0xF0 request"

- id: incoming_video_params_query
  label: Incoming Video Parameters Query (0x42)
  kind: query
  command: "0x21 {zone} 0x42 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
  notes: "Response 8 bytes: H res MSB/LSB, V res MSB/LSB, refresh rate, interlaced flag, aspect ratio, color space (normal/HDR10/Dolby Vision/HLG/HDR10+)"

- id: incoming_audio_format_query
  label: Incoming Audio Format Query (0x43)
  kind: query
  command: "0x21 {zone} 0x43 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
  notes: "Response: stream format (0x00 PCM ... 0x16 Dolby Atmos, 0x17 DTS:X, 0x18 IMAX ENHANCED, 0x19 Auro 3D) + channel configuration enum"

- id: audio_sample_rate_query
  label: Incoming Audio Sample Rate Query (0x44)
  kind: query
  command: "0x21 0x01 0x44 0x01 0xF0 0x0D"
  params: []
  notes: "Response data: 0x00 32kHz, 0x01 44.1, 0x02 48, 0x03 88.2, 0x04 96, 0x05 176.4, 0x06 192, 0x07 unknown, 0x08 undetected"

- id: sub_stereo_trim_set
  label: Sub Stereo Trim Set (0x45)
  kind: action
  command: "0x21 0x01 0x45 0x01 {value} 0x0D"
  params:
    - name: value
      type: enum
      description: "0x00 = 0dB, 0x81-0x94 = -0.5 to -10dB, 0xF0 request, 0xF1 increment 0.5dB, 0xF2 decrement 0.5dB"

- id: zone1_osd_set
  label: Set/Request Zone 1 OSD (0x4E)
  kind: action
  command: "0x21 0x01 0x4E 0x01 {state} 0x0D"
  params:
    - name: state
      type: enum
      description: "0xF1 on, 0xF2 off, 0xF0 request"
  notes: "Source example shows Cc 0x4A but header/byte table state 0x4E - discrepancy in source"

- id: video_output_switching_set
  label: Set/Request Video Output Switching (0x4F)
  kind: action
  command: "0x21 0x01 0x4F 0x01 {output} 0x0D"
  params:
    - name: output
      type: enum
      description: "0x02 HDMI output 1, 0x03 HDMI output 2, 0x04 both, 0xF0 request"

- id: bluetooth_status_query
  label: Bluetooth Status Query (0x50)
  kind: query
  command: "0x21 0x01 0x50 0x01 0xF0 0x0D"
  params: []
  notes: "Response: 0x00 no connection, 0x01 connected/paused, 0x02 playing SBC, 0x03 AAC, 0x04 aptX, 0x05 aptX-HD; + track name ASCII; only valid on BT input"

- id: now_playing_info_query
  label: Now Playing Information Query (0x64)
  kind: query
  command: "0x21 {zone} 0x64 0x01 {field} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone byte (0x01/0x02)"
    - name: field
      type: enum
      description: "0xF0 track title, 0xF1 artist, 0xF2 album, 0xF3 application (GoogleCast only), 0xF4 sample rate, 0xF5 track encoder"
  notes: "Response limited to 100 characters"
```

## Feedbacks
```yaml
- id: answer_code
  type: enum
  values: [status_update, zone_invalid, command_not_recognised, parameter_not_recognised, command_invalid_at_this_time, invalid_data_length]
  notes: "Ac byte: 0x00 status update, 0x82 zone invalid, 0x83 command not recognised, 0x84 parameter not recognised, 0x85 command invalid at this time (e.g. setup menu open, or zone source mismatch), 0x86 invalid data length"

- id: power_state
  type: enum
  values: [standby, on]
  notes: "From 0x00 response: 0x00 standby, 0x01 on"

- id: volume_level
  type: integer
  values: null  # range 0-99 (0x00-0x63)
  notes: "From 0x0D response"

- id: mute_state
  type: enum
  values: [muted, not_muted]

- id: current_source
  type: enum
  values: [follow_zone_1, cd, bd, av, sat, pvr, uhd, aux, display, tuner_fm, tuner_dab, net, stb, game, bt]
```

## Variables
```yaml
# Settable parameters represented as parameterized actions above (volume 0x0D,
# treble 0x35, bass 0x36, balance 0x3B, sub trim 0x3F, sub stereo trim 0x45,
# lipsync 0x40, room EQ 0x37, Dolby Audio 0x38, compression 0x41, IMAX 0x0C).
# No separate variable model required.
```

## Events
```yaml
- id: unsolicited_status_update
  type: object
  description: "State changes from front panel or IR remote are relayed to controller as messages with answer code 0x00 (status update) using the appropriate command message type (e.g. display message on brightness change, decode mode changes)"
```

## Macros
```yaml
# No multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults  # 0x05 requires 0xAA 0xAA confirmation data pattern
  - secure_backup_save_restore  # 0x06 requires 0x55 0x55 pattern + 4-digit pin
  - reboot  # 0x26 requires literal ASCII 'REBOOT' payload
interlocks:
  - "Commands 0xF0-0xFF reserved for test functions - must never be used"
  - "Control disabled by default for standby power; must be enabled via front panel DIRECT button (hold 4s) or OSD General Setup > Control before protocol will respond"
```

## Notes
- Command frame: `<St 0x21> <Zn> <Cc> <Dl> <Data> <Et 0x0D>`; response frame adds `<Ac>` answer code after Cc. Data length max 255.
- Device responds within three seconds; controller may pipeline commands before prior response arrives.
- Zone numbers: 0x01 = Zone 1 (master; zone-less commands refer to it), 0x02 = Zone 2.
- Control must be enabled first (DIRECT button 4s hold or OSD menu) — disabled by default for minimum standby power.
- Serial cable: null-modem wired (pin 2↔3 Rx/Tx crossed, pin 5↔5 ground), DB9 female.
- AMX Duet DDDP and Control4 SDDP discovery both supported; DDDP via ASCII "AMX\r" with AMXB response including RS232 protocol version.
- Changelog: Issue E.0 added SDR-38/SDP-58; examples reference SDP-55. Commands 0x39/0x3A removed in Issue C.0.
- 0x1E command referenced in 0x06 description (processing conflict) but not documented in this source.

<!-- UNRESOLVED: RC5 IR code table (system/command codes, "from page 39") absent from refined source — simulate_rc5_ir params undocumented -->
<!-- UNRESOLVED: full byte maps for 0x28 Input config / 0x29 General Setup partially truncated in source extraction -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: 0x4E Zone 1 OSD example uses Cc 0x4A — source inconsistency, cannot determine which is correct from source alone -->

## Provenance

```yaml
source_domains:
  - jblsynthesis.com
source_urls:
  - https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw07c644ac/pdfs/RS232_SDR35_38_SDP55_58_SH289E_E_2Jun21.pdf
retrieved_at: 2026-06-25T11:55:18.356Z
last_checked_at: 2026-09-11T22:18:35.793Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-11T22:18:35.793Z
matched_actions: 63
action_count: 63
confidence: medium
summary: "All 63 spec actions have matching source command codes (0x00-0x64 hex opcodes plus AMX DDDP), transport values verbatim, and no source commands remain unrepresented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RC5 IR code table (referenced \"from page 39\") not present in refined source — Simulate RC5 (0x08) system/command codes unknown"
- "RS232 protocol version only obtainable at runtime via 0x04 query (example shows 1.4)"
- "RC5 IR code table (system/command codes, \"from page 39\") absent from refined source — simulate_rc5_ir params undocumented"
- "full byte maps for 0x28 Input config / 0x29 General Setup partially truncated in source extraction"
- "firmware version compatibility not stated in source"
- "0x4E Zone 1 OSD example uses Cc 0x4A — source inconsistency, cannot determine which is correct from source alone"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
