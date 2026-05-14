---
spec_id: admin/arcam-avr390
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam AVR390/AVR550/AVR850/AV860/SR250 Control Spec"
manufacturer: Arcam
model_family: AVR390
aliases: []
compatible_with:
  manufacturers:
    - Arcam
  models:
    - AVR390
    - AVR550
    - AVR850
    - AV860
    - SR250
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:54.633Z
last_checked_at: 2026-04-22T19:42:10.647Z
generated_at: 2026-04-22T19:42:10.647Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-22T19:42:10.647Z
  matched_actions: 50
  action_count: 50
  confidence: high
  summary: "All 50 spec actions match literal command codes in source; transport parameters verified in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Arcam AVR390/AVR550/AVR850/AV860/SR250 Control Spec

## Summary
Arcam AV receiver family supporting RS-232 and IP control. The protocol uses a binary message format with start byte `0x21`, zone number, command code, data length, and end byte `0x0D`. All commands are acknowledged with an answer code. Device is controlled via Simulate RC5 IR command (0x08) or native commands. Supports two zones.

<!-- UNRESOLVED: device name given as "DT91" but source document covers AVR390/AVR550/AVR850/AV860/SR250 — verify correct model -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 50000
auth:
  type: none
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_state
  label: Get/Set Power State
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number (1 or 2)
    - name: mode
      type: enum
      values: [set_on, set_standby, query]
      description: "0xF0 = query; data=0x00 standby, 0x01 on"

- id: display_brightness
  label: Get/Set Display Brightness
  kind: action
  params:
    - name: zone
      type: integer
    - name: level
      type: integer
      description: "0x00=off, 0x01=L1, 0x02=L2, 0xF0=query"

- id: headphone_override
  label: Set Headphone/Mute Relay Override
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: "0x00=clear (mute speakers), 0x01=set (unmute speakers)"

- id: video_selection
  label: Set Video Input Source
  kind: action
  params:
    - name: zone
      type: integer
    - name: source
      type: integer
      description: "0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=Game, 0x06=STB, 0xF0=query"

- id: select_analogue_digital
  label: Select Audio Input Type
  kind: action
  params:
    - name: zone
      type: integer
    - name: type
      type: integer
      description: "0x00=analogue, 0x01=digital, 0x02=HDMI, 0xF0=query"

- id: imax_enhanced
  label: Set IMAX Enhanced
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query, 0xF1=Auto, 0xF2=On, 0xF3=Off"

- id: set_volume
  label: Set Zone Volume
  kind: action
  params:
    - name: zone
      type: integer
    - name: volume
      type: integer
      description: "0x00-0x63 (0-99dB), 0xF0=query"

- id: mute_status
  label: Get Mute Status
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query"

- id: direct_mode_status
  label: Get Direct Mode Status
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query"

- id: decode_mode_2ch
  label: Get 2-Channel Decode Mode
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query; 0x01=Stereo, 0x04=Dolby Surround, 0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7ch Stereo, 0x0A=DTS Neural:X, 0x0C=DTS Virtual:X"

- id: decode_mode_mch
  label: Get Multi-Channel Decode Mode
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query; 0x01=Stereo downmix, 0x02=Multi-channel, 0x03=DTS-ES/Neural:X, 0x06=Dolby Surround, 0x0C=DTS Virtual:X"

- id: video_output_resolution
  label: Get Video Output Resolution
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query; 0x02=SD Progressive, 0x03=720p, 0x04=1080i, 0x05=1080p, 0x06=Preferred, 0x07=Bypass, 0x08=4k"

- id: menu_status
  label: Get Menu Status
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query; 0x00=none, 0x02=Setup, 0x03=Trim, 0x04=Bass, 0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB"

- id: current_source
  label: Get Current Source
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query; 0x00=Follow Z1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=VCR, 0x08=AUX, 0x09=Display, 0x0B=FM, 0x0C=DAB, 0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=Game"

- id: tuner_preset
  label: Get/Set Tuner Preset
  kind: action
  params:
    - name: zone
      type: integer
    - name: preset
      type: integer
      description: "0x01-0x32 preset number, 0xF0=query, 0xFF=no preset"

- id: tune
  label: Increment/Decrement Tuner Frequency
  kind: action
  params:
    - name: zone
      type: integer
    - name: direction
      type: integer
      description: "0x00=decrement, 0x01=increment, 0xF0=query"

- id: dab_station
  label: Get DAB Station
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query"

- id: fm_genre
  label: Get FM Programme Type
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query"

- id: dab_program_type
  label: Get DAB Programme Type
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query"

- id: dls_pdt
  label: Get DLS/PDT Info
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query"

- id: preset_details
  label: Get Preset Details
  kind: action
  params:
    - name: zone
      type: integer
    - name: preset
      type: integer
      description: "0x01-0x32 preset number"

- id: network_playback_status
  label: Get Network Playback Status
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query; 0x00=Navigating, 0x01=Playing, 0x02=Paused, 0xFF=Busy"

- id: rds_information
  label: Get RDS Information
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query"

- id: fm_scan
  label: FM Scan Up/Down
  kind: action
  params:
    - name: zone
      type: integer
    - name: direction
      type: integer
      description: "0x01=up, 0x02=down"

- id: dab_scan
  label: DAB Scan
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=start scan"

- id: heartbeat
  label: Heartbeat
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=heartbeat; resets EuP standby timer"

- id: reboot
  label: Reboot Unit
  kind: action
  params:
    - name: zone
      type: integer
    - name: confirmation
      type: string
      description: "Must send 'REBOOT' as ASCII bytes (0x52 0x45 0x42 0x4F 0x4F 0x54)"

- id: factory_restore
  label: Restore Factory Defaults
  kind: action
  params:
    - name: zone
      type: integer
    - name: confirmation
      type: integer
      description: "Must send 0xAA 0xAA as confirmation pattern"

- id: secure_backup_restore
  label: Save/Restore Secure Settings Backup
  kind: action
  params:
    - name: zone
      type: integer
    - name: action
      type: integer
      description: "0x00=save, 0x01=restore"
    - name: confirmation
      type: string
      description: "Confirmation pattern 0x55 followed by 4-digit PIN"

- id: treble_eq
  label: Set Treble Equalisation
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB; 0xF0=query, 0xF1=increment, 0xF2=decrement"

- id: bass_eq
  label: Set Bass Equalisation
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB; 0xF0=query, 0xF1=increment, 0xF2=decrement"

- id: room_eq
  label: Set Room Equalisation
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: "0xF0=query, 0xF1=on, 0xF2=off"

- id: dolby_volume
  label: Set Dolby Volume
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: "0x00=off, 0x01=on, 0xF0=query"

- id: dolby_leveller
  label: Set Dolby Leveller
  kind: action
  params:
    - name: zone
      type: integer
    - name: level
      type: integer
      description: "0x00-0x0A = level 0-10, 0xFF=off, 0xF0=query, 0xF1=increment, 0xF2=decrement"

- id: dolby_volume_offset
  label: Set Dolby Volume Calibration Offset
  kind: action
  params:
    - name: zone
      type: integer
    - name: offset
      type: integer
      description: "0x00-0x0F = 0 to +15dB; 0x80-0x8F = -1 to -15dB; 0xF0=query, 0xF1=increment, 0xF2=decrement"

- id: balance
  label: Set Balance
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x06 = 0 to +6; 0x81-0x86 = -1 to -6; 0xF0=query, 0xF1=increment, 0xF2=decrement"

- id: subwoofer_trim
  label: Set Subwoofer Trim
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x14 = positive trim in 0.5dB steps; 0x81-0x94 = negative trim; 0xF0=query, 0xF1=increment, 0xF2=decrement"

- id: sub_stereo_trim
  label: Set Subwoofer Stereo Trim
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00=0dB; 0x81-0x94 = -0.5dB to -10dB in 0.5dB steps; 0xF0=query, 0xF1=increment, 0xF2=decrement"

- id: lipsync_delay
  label: Set Lipsync Delay
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x32 = 0 to 50ms in 5ms steps; 0xF0=query, 0xF1=increment, 0xF2=decrement"

- id: compression
  label: Set Dynamic Range Compression
  kind: action
  params:
    - name: zone
      type: integer
    - name: level
      type: integer
      description: "0x00=off, 0x01=medium, 0x02=high, 0xF0=query"

- id: video_parameters
  label: Get Incoming Video Parameters
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query; returns H-res MSB/LSB, V-res MSB/LSB, refresh, interlace flag, aspect ratio"

- id: audio_format
  label: Get Incoming Audio Format
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query; returns format (PCM, Dolby Digital, DTS, etc.) and channel config"

- id: audio_sample_rate
  label: Get Incoming Audio Sample Rate
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query; 0x00=32kHz, 0x01=44.1kHz, 0x02=48kHz, 0x03=88.2kHz, 0x04=96kHz, 0x05=176.4kHz, 0x06=192kHz, 0x07=Unknown, 0x08=Undetected"

- id: zone1_osd
  label: Set/Request Zone 1 OSD
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: "0xF0=query, 0xF1=on, 0xF2=off"

- id: video_output_switching
  label: Set HDMI Video Output
  kind: action
  params:
    - name: zone
      type: integer
    - name: output
      type: integer
      description: "0x02=HDMI Out 1, 0x03=HDMI Out 2, 0x04=Both, 0xF0=query"

- id: set_input_name
  label: Set Input Name
  kind: action
  params:
    - name: zone
      type: integer
    - name: name
      type: string
      description: ASCII string up to 10 characters; 0xF0=query

- id: display_info_type
  label: Set/Request VFD Display Info Type
  kind: action
  params:
    - name: zone
      type: integer
    - name: type
      type: integer
      description: "0x00=Processing, 0xE0=cycle all, 0xF0=query; FM-specific: 0x01=Radio text, 0x02=Programme type, 0x03=Signal strength; DAB-specific: 0x01-0x04; NET/USB: 0x01-0x05"

- id: software_version
  label: Get Software Version
  kind: action
  params:
    - name: zone
      type: integer
    - name: type
      type: integer
      description: "0xF0=RS232 version, 0xF1=Host, 0xF2=OSD, 0xF3=DSP, 0xF4=NET, 0xF5=IAP"

- id: headphones_status
  label: Get Headphone Connection Status
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=query; 0x00=disconnected, 0x01=connected"

- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  params:
    - name: zone
      type: integer
    - name: system_code
      type: integer
      description: RC5 system code (Data1)
    - name: command
      type: integer
      description: RC5 command code (Data2)
```

## Feedbacks
```yaml
- id: answer_code
  type: enum
  description: Every response includes an answer code indicating command status.
  values:
    - "0x00: Status update / OK"
    - "0x82: Zone Invalid"
    - "0x83: Command not recognised"
    - "0x84: Parameter not recognised"
    - "0x85: Command invalid at this time (e.g. tuner cmd when tuner not selected, or OSD showing)"
    - "0x86: Invalid data length"
```

## Variables
```yaml
# All settable parameters are modelled as Actions with get/set semantics via 0xF0 query prefix.
# See Actions section for full parameter list including treble, bass, balance, volume, lipsync, etc.
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited state changes when user interacts via front panel or IR remote.
# The document states: "Any change resulting from these inputs is relayed to the RC using the appropriate message type."
# Specific event message formats are not fully documented in the source.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_restore: requires 0xAA 0xAA confirmation pattern
  - reboot: requires ASCII string "REBOOT" as confirmation
  - secure_backup_restore: requires PIN code
interlocks: []
```

## Notes
Command format: `<St><Zn><Cc><Dl>[<Data>]<Et>` — start=0x21, end=0x0D. Response adds `<Ac>` after `<Cc>`. Zone 1 is master; Zone 2 is secondary. Commands 0xF0–0xFF are reserved for test functions.

RC5 IR simulation (command 0x08) provides access to all IR remote functions including power, source selection, volume, and navigation. RC5 code tables are extensive (pages 26 onward) — see `simulate_rc5` action for base command structure.

IP control uses port 50000 per the Network Settings menu. AMX DDDP discovery protocol supported.

<!-- UNRESOLVED: specific unsolicited event message formats not documented in source -->
<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: RS-232 protocol version returned in AMX response but not useful without device query -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:54.633Z
last_checked_at: 2026-04-22T19:42:10.647Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-22T19:42:10.647Z
matched_actions: 50
action_count: 50
confidence: high
summary: "All 50 spec actions match literal command codes in source; transport parameters verified in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
