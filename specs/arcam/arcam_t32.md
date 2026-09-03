---
spec_id: admin/arcam-t32-control-spec
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam T32 Control Spec"
manufacturer: Arcam
model_family: T32
aliases: []
compatible_with:
  manufacturers:
    - Arcam
  models:
    - T32
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-06-25T21:41:27.911Z
last_checked_at: 2026-09-02T22:16:46.782Z
generated_at: 2026-09-02T22:16:46.782Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is titled for AVR390/AVR550/AVR850/AVR860/SR250; the Arcam T32 is not mentioned. Treat this spec as provisional and verify against a T32-specific datasheet or the actual device before relying on it."
  - "no multi-step sequences described explicitly in source."
  - "no power-on sequencing or interlock procedure stated in source."
verification:
  verdict: verified
  checked_at: 2026-09-02T22:16:46.782Z
  matched_actions: 156
  action_count: 156
  confidence: medium
  summary: "All 156 spec actions match source command tables (49 direct opcodes + AMX Duet + ~96 RC5 codes); transport params verbatim; shapes agree. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Arcam T32 Control Spec

## Summary
This spec covers control of the Arcam T32 audio tuner via the RS232/serial interface described in Arcam's Custom Installation Notes for the AVR390/AVR550/AVR850/AV860/SR250 family. The T32 is not explicitly named anywhere in the source document — compatibility is assumed from the manufacturer's shared RS232 protocol family. Transport is serial at 38400 bps, 8N1, no flow control.

<!-- UNRESOLVED: source document is titled for AVR390/AVR550/AVR850/AVR860/SR250; the Arcam T32 is not mentioned. Treat this spec as provisional and verify against a T32-specific datasheet or the actual device before relying on it. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

The cable is a null-modem with Rx/Tx crossed and pin 5 ground only (no other hardware handshake lines used).

Frame format on the wire: `<St> <Zn> <Cc> <Dl> [<Data...>] <Et>` where:
- `St` = `0x21` (`!`)
- `Zn` = zone (`0x01` = Zone 1 / master; `0x02` = Zone 2)
- `Cc` = command code
- `Dl` = data length (excludes Et)
- `Et` = `0x0D`

Responses echo `St Zn Cc Ac Dl [Data...] Et` where `Ac` is an answer code:
- `0x00` = status update / accepted
- `0x82` = zone invalid
- `0x83` = command not recognised
- `0x84` = parameter not recognised
- `0x85` = command invalid at this time (e.g. setup menu open, wrong source selected)
- `0x86` = invalid data length

Commands `0xF0`–`0xFF` are reserved for test and must not be used.

The AV responds within three seconds. The IP control port is `50000` (per the Set-up section), but no full IP framing is documented in this source — treat IP transport as not covered here.

## Traits
```yaml
- powerable       # inferred from power (0x00) commands
- routable        # inferred from video selection (0x0A) and source routing commands
- queryable       # inferred from request-status commands throughout
- levelable       # inferred from volume (0x0D), treble/bass, balance, sub trim commands
```

## Actions
```yaml
# Protocol framing: each "command:" below is the data portion AFTER the framing
# has been assembled. The literal byte sequence the controller sends is:
#   0x21 <Zn> <Cc> <Dl> <Data...> 0x0D
# Use Zn = 0x01 for Zone 1 unless otherwise stated. Examples show the full
# on-wire sequence in comments where useful.

- id: request_power_state
  label: Request Power State (0x00)
  kind: query
  command: "0x21 <Zn> 0x00 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 = Zone 1, 0x02 = Zone 2)
  notes: "Response Data byte: 0x00 = standby, 0x01 = powered on."

- id: power_on
  label: Power On (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x7B 0x0D"
  notes: "Simulates RC5 16-123 (Power On)."

- id: power_off
  label: Power Off (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x7C 0x0D"
  notes: "Simulates RC5 16-124 (Power Off)."

- id: standby
  label: Standby (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x0C 0x0D"
  notes: "Simulates RC5 16-12 (Standby)."

- id: request_display_brightness
  label: Request Display Brightness (0x01)
  kind: query
  command: "0x21 0x01 0x01 0x01 0xF0 0x0D"
  notes: "Response: 0x00 = off, 0x01 = L1, 0x02 = L2."

- id: cycle_display_brightness
  label: Cycle Display Brightness (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x3B 0x0D"
  notes: "Simulates RC5 16-59 (DISP / change VFD brightness)."

- id: display_off
  label: Display Off (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x1F 0x0D"

- id: display_l1
  label: Display L1 (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x22 0x0D"

- id: display_l2
  label: Display L2 (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x23 0x0D"

- id: request_headphone_status
  label: Request Headphone Status (0x02)
  kind: query
  command: "0x21 0x01 0x02 0x01 0xF0 0x0D"
  notes: "Response: 0x00 = not connected, 0x01 = connected."

- id: request_fm_programme_type
  label: Request FM Programme Type (0x03)
  kind: query
  command: "0x21 <Zn> 0x03 0x01 0xF0 0x0D"
  notes: "Returns error 0x85 if FM not selected. Response is ASCII string (e.g. 'POP MUSIC')."

- id: request_software_version
  label: Request Software Version (0x04)
  kind: query
  command: "0x21 0x01 0x04 0x01 0xF{0..5} 0x0D"
  params:
    - name: component
      type: integer
      description: "0xF0 = RS232 protocol, 0xF1 = Host, 0xF2 = OSD, 0xF3 = DSP, 0xF4 = NET, 0xF5 = IAP"
  notes: "Response: Dl=0x03, then echo, major, minor."

- id: restore_factory_defaults
  label: Restore Factory Defaults (0x05)
  kind: action
  command: "0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"
  notes: "Confirmation pattern 0xAA 0xAA prevents accidental restore."

- id: save_secure_backup
  label: Save Secure Backup (0x06)
  kind: action
  command: "0x21 0x01 0x06 0x07 0x00 0x55 0x55 <pin1> <pin2> <pin3> <pin4> 0x0D"
  params:
    - name: pin
      type: string
      description: Four-digit PIN bytes.
  notes: "Data1=0x00 for save; confirmation 0x55 0x55; followed by 4 PIN bytes."

- id: restore_secure_backup
  label: Restore Secure Backup (0x06)
  kind: action
  command: "0x21 0x01 0x06 0x07 0x01 0x55 0x55 <pin1> <pin2> <pin3> <pin4> 0x0D"
  notes: "Data1=0x01 for restore. Returns 0x85 if no secure copy exists or if 0x1E in progress."

- id: simulate_rc5
  label: Simulate RC5 IR Command (0x08)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 <system> <command> 0x0D"
  params:
    - name: system
      type: integer
      description: RC5 system code (e.g. 0x10 for AV, 0x17 for Zone 2)
    - name: command
      type: integer
      description: RC5 command code
  notes: "An additional unsolicited status message is typically sent as a side-effect."

- id: set_display_information_type
  label: Set/Request Display Information Type (0x09)
  kind: action
  command: "0x21 <Zn> 0x09 0x01 <mode> 0x0D"
  params:
    - name: mode
      type: integer
      description: "0x00=Processing, 0xE0=cycle, 0xF0=request. FM: 0x01=RadioText, 0x02=PTY, 0x03=Signal. DAB: 0x01=RT, 0x02=Genre, 0x03=Signal Quality, 0x04=Bit rate. NET/USB: 0x01=Track, 0x02=Artist, 0x03=Album, 0x04=audio type, 0x05=rate."
  notes: "Response echoes the currently-selected display type."

- id: request_current_source
  label: Request Current Source (0x1D)
  kind: query
  command: "0x21 <Zn> 0x1D 0x01 0xF0 0x0D"
  notes: "Response: 0x00=Follow Z1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=VCR, 0x08=AUX, 0x09=DISPLAY, 0x0B=TUNER(FM), 0x0C=TUNER(DAB), 0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=GAME."

- id: select_source_cd
  label: Select CD Source (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x76 0x0D"

- id: select_source_bd
  label: Select BD Source (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x62 0x0D"

- id: select_source_stb
  label: Select STB Source (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x64 0x0D"

- id: select_source_av
  label: Select AV Source (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x5E 0x0D"

- id: select_source_sat
  label: Select SAT Source (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x1B 0x0D"

- id: select_source_pvr
  label: Select PVR Source (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x60 0x0D"

- id: select_source_game
  label: Select Game Source (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x61 0x0D"

- id: select_source_vcr
  label: Select VCR Source (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x77 0x0D"

- id: select_source_aux
  label: Select AUX Source (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x63 0x0D"

- id: select_source_fm
  label: Select FM Tuner (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x1C 0x0D"

- id: select_source_dab
  label: Select DAB Tuner (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x48 0x0D"

- id: select_source_net
  label: Select NET Source (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x5C 0x0D"

- id: select_source_usb
  label: Select USB Source (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x5D 0x0D"

- id: select_source_radio
  label: Select Radio (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x5B 0x0D"

- id: select_video_input
  label: Video Selection (0x0A)
  kind: action
  command: "0x21 0x01 0x0A 0x01 <source> 0x0D"
  params:
    - name: source
      type: integer
      description: "0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=Game, 0x06=STB, 0xF0=request"
  notes: "Returns 0x85 if OSD is showing setup screen."

- id: select_audio_input
  label: Select Analogue/Digital Audio (0x0B)
  kind: action
  command: "0x21 <Zn> 0x0B 0x01 <mode> 0x0D"
  params:
    - name: mode
      type: integer
      description: "0x00=analogue, 0x01=digital, 0x02=HDMI, 0xF0=request"
  notes: "Returns 0x85 if OSD is showing setup screen."

- id: set_volume
  label: Set/Request Volume (0x0D)
  kind: action
  command: "0x21 <Zn> 0x0D 0x01 <level> 0x0D"
  params:
    - name: level
      type: integer
      description: "Volume in dB, 0x00 (0) to 0x63 (99). 0xF0 to request current."
  notes: "Returns volume even when muted. Pair with mute-status query."

- id: volume_up
  label: Volume Up (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x10 0x0D"

- id: volume_down
  label: Volume Down (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x11 0x0D"

- id: request_mute_status
  label: Request Mute Status (0x0E)
  kind: query
  command: "0x21 <Zn> 0x0E 0x01 0xF0 0x0D"
  notes: "Response: 0x00 = muted, 0x01 = not muted."

- id: mute
  label: Mute Toggle (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x0D 0x0D"

- id: mute_on
  label: Mute On (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x1A 0x0D"

- id: mute_off
  label: Mute Off (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x78 0x0D"

- id: request_direct_mode_status
  label: Request Direct Mode Status (0x0F)
  kind: query
  command: "0x21 0x01 0x0F 0x01 0xF0 0x0D"
  notes: "Response: 0x00 = off, 0x01 = on."

- id: direct_mode_on
  label: Direct Mode On (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4E 0x0D"

- id: direct_mode_off
  label: Direct Mode Off (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4F 0x0D"

- id: activate_direct_mode
  label: Activate Direct Mode (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0A 0x0D"

- id: request_decode_mode_2ch
  label: Request 2ch Decode Mode (0x10)
  kind: query
  command: "0x21 0x01 0x10 0x01 0xF0 0x0D"
  notes: "Response: 0x01=Stereo, 0x04=Dolby Surround, 0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7 Ch Stereo, 0x0A=DTS Neural:X, 0x0B=Reserved, 0x0C=DTS Virtual:X."

- id: request_decode_mode_mch
  label: Request MCH Decode Mode (0x11)
  kind: query
  command: "0x21 0x01 0x11 0x01 0xF0 0x0D"
  notes: "Response: 0x01=Stereo down-mix, 0x02=Multi-channel, 0x03=DTS-ES/Neural:X, 0x06=Dolby Surround, 0x0B=Reserved, 0x0C=DTS Virtual:X."

- id: request_rds_information
  label: Request RDS Information (0x12)
  kind: query
  command: "0x21 <Zn> 0x12 0x01 0xF0 0x0D"
  notes: "Returns 0x85 if FM not selected. Response is ASCII string."

- id: request_video_output_resolution
  label: Request Video Output Resolution (0x13)
  kind: query
  command: "0x21 0x01 0x13 0x01 0xF0 0x0D"
  notes: "Response: 0x02=SD Progressive, 0x03=720p, 0x04=1080i, 0x05=1080p, 0x06=Preferred, 0x07=Bypass, 0x08=4k."

- id: cycle_video_output_resolution
  label: Cycle Output Resolution (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2F 0x0D"

- id: request_menu_status
  label: Request Menu Status (0x14)
  kind: query
  command: "0x21 0x01 0x14 0x01 0xF0 0x0D"
  notes: "Response: 0x00=None, 0x02=Setup, 0x03=Trim, 0x04=Bass, 0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB."

- id: request_tuner_preset
  label: Request Tuner Preset (0x15)
  kind: action
  command: "0x21 <Zn> 0x15 0x01 <preset|0xF0> 0x0D"
  params:
    - name: preset
      type: integer
      description: "Preset number 1..50 (0x01..0x32), or 0xF0 to request current."
  notes: "Returns 0x85 if tuner not selected on zone. Response: 0xFF = none selected, else preset number."

- id: tune_step
  label: Tune Increment/Decrement (0x16)
  kind: action
  command: "0x21 <Zn> 0x16 0x01 <direction|0xF0> 0x0D"
  params:
    - name: direction
      type: integer
      description: "0x00=decrement, 0x01=increment, 0xF0=request current"
  notes: "FM step is 0.05 MHz. Response Dl=2: MHz byte, 10's-of-kHz byte."

- id: request_dab_station
  label: Request DAB Station (0x18)
  kind: query
  command: "0x21 <Zn> 0x18 0x01 0xF0 0x0D"
  notes: "Returns 0x85 if DAB not selected. Response: 16-byte service label, padded with 0x20."

- id: request_dab_programme_type
  label: Request DAB Programme Type (0x19)
  kind: query
  command: "0x21 <Zn> 0x19 0x01 0xF0 0x0D"
  notes: "Returns 0x85 if DAB not selected. Response: 16-byte ASCII label, padded with 0x20."

- id: request_dls_pdt
  label: Request DLS/PDT Information (0x1A)
  kind: query
  command: "0x21 <Zn> 0x1A 0x01 0xF0 0x0D"
  notes: "Returns 0x85 if DAB not selected. Response: 128-byte ASCII text, padded with 0x20."

- id: request_preset_details
  label: Request Preset Details (0x1B)
  kind: query
  command: "0x21 <Zn> 0x1B 0x01 <preset> 0x0D"
  params:
    - name: preset
      type: integer
      description: Preset number 1..50.
  notes: "Response: preset#, type (0x01=FM freq, 0x02=FM RDS name, 0x03=DAB), then type-specific data + name."

- id: request_network_playback_status
  label: Request Network Playback Status (0x1C)
  kind: query
  command: "0x21 <Zn> 0x1C 0x01 0xF0 0x0D"
  notes: "Returns 0x85 if network not selected. Response status byte: 0x00=Navigating, 0x01=Playing, 0x02=Paused, 0xFF=Busy."

- id: set_imax_enhanced
  label: IMAX Enhanced (0x0C)
  kind: action
  command: "0x21 <Zn> 0x0C 0x01 <mode> 0x0D"
  params:
    - name: mode
      type: integer
      description: "0xF0=request, 0xF1=Auto, 0xF2=On, 0xF3=Off"
  notes: "Valid for unit code v7.13+. Response: 0x00=Off, 0x01=On, 0x02=Auto."

- id: set_treble
  label: Treble Equalisation (0x35)
  kind: action
  command: "0x21 <Zn> 0x35 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00..0x0C = 0..+12 dB; 0x81..0x8C = -1..-12 dB; 0xF0=request; 0xF1=+1 dB; 0xF2=-1 dB."

- id: set_bass
  label: Bass Equalisation (0x36)
  kind: action
  command: "0x21 <Zn> 0x36 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00..0x0C = 0..+12 dB; 0x81..0x8C = -1..-12 dB; 0xF0=request; 0xF1=+1 dB; 0xF2=-1 dB."

- id: set_room_equalisation
  label: Room Equalisation (0x37)
  kind: action
  command: "0x21 <Zn> 0x37 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0xF0=request, 0xF1=on, 0xF2=off"
  notes: "Response: 0x00=off, 0x01=on, 0x02=not calculated."

- id: set_dolby_volume
  label: Dolby Volume (0x38)
  kind: action
  command: "0x21 <Zn> 0x38 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00=off, 0x01=on, 0xF0=request"

- id: set_dolby_leveller
  label: Dolby Leveller (0x39)
  kind: action
  command: "0x21 <Zn> 0x39 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00..0x0A = 0..10; 0xF0=request; 0xF1=inc; 0xF2=dec; 0xFF=off"

- id: set_dolby_volume_calibration_offset
  label: Dolby Volume Calibration Offset (0x3A)
  kind: action
  command: "0x21 <Zn> 0x3A 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00..0x0F = 0..+15 dB; 0x80..0x8F = -1..-15 dB; 0xF0=request; 0xF1=inc; 0xF2=dec"

- id: set_balance
  label: Balance (0x3B)
  kind: action
  command: "0x21 <Zn> 0x3B 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00..0x06 = 0..6 right; 0x81..0x86 = -1..-6 left; 0xF0=request; 0xF1=inc; 0xF2=dec"

- id: balance_left
  label: Balance Left (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x26 0x0D"

- id: balance_right
  label: Balance Right (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x28 0x0D"

- id: set_subwoofer_trim
  label: Subwoofer Trim (0x3F)
  kind: action
  command: "0x21 <Zn> 0x3F 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00..0x14 = 0..+10 dB in 0.5 dB steps; 0x81..0x94 = -0.5..-10 dB; 0xF0=request; 0xF1=+0.5 dB; 0xF2=-0.5 dB"

- id: set_lipsync_delay
  label: Lipsync Delay (0x40)
  kind: action
  command: "0x21 <Zn> 0x40 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00..0x32 in 5 ms steps (e.g. 0x08 = 40 ms); 0xF0=request; 0xF1=+5 ms; 0xF2=-5 ms"

- id: lipsync_increase
  label: Lipsync +5 ms (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x0F 0x0D"

- id: lipsync_decrease
  label: Lipsync -5 ms (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x65 0x0D"

- id: set_compression
  label: Compression (0x41)
  kind: action
  command: "0x21 <Zn> 0x41 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00=off, 0x01=medium, 0x02=high, 0xF0=request"

- id: request_incoming_video_parameters
  label: Request Incoming Video Parameters (0x42)
  kind: query
  command: "0x21 0x01 0x42 0x01 0xF0 0x0D"
  notes: "Response Dl=7: H-res MSB, H-res LSB, V-res MSB, V-res LSB, refresh rate, interlaced flag, aspect ratio."

- id: request_incoming_audio_format
  label: Request Incoming Audio Format (0x43)
  kind: query
  command: "0x21 <Zn> 0x43 0x01 0xF0 0x0D"
  notes: "Response Dl=2: stream format (0x00=PCM, 0x02=Dolby Digital, 0x05=DD+, 0x06=DD TrueHD, 0x07=DTS, 0x0D=DTS HD MA, 0x16=Dolby Atmos, 0x17=DTS:X, 0x18=IMAX ENHANCED, ...) + channel config."

- id: request_incoming_audio_sample_rate
  label: Request Incoming Audio Sample Rate (0x44)
  kind: query
  command: "0x21 0x01 0x44 0x01 0xF0 0x0D"
  notes: "Response: 0x00=32k, 0x01=44.1k, 0x02=48k, 0x03=88.2k, 0x04=96k, 0x05=176.4k, 0x06=192k, 0x07=Unknown, 0x08=Undetected."

- id: set_sub_stereo_trim
  label: Set/Request Sub Stereo Trim (0x45)
  kind: action
  command: "0x21 0x01 0x45 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00 = 0 dB; 0x81..0x94 = -0.5..-10 dB; 0xF0=request; 0xF1=+0.5 dB; 0xF2=-0.5 dB"

- id: set_zone1_osd
  label: Set/Request Zone 1 OSD On/Off (0x4E)
  kind: action
  command: "0x21 0x01 0x4E 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0xF0=request, 0xF1=on, 0xF2=off"
  notes: "Response: 0x00=on, 0x01=off."

- id: set_video_output_switching
  label: Set/Request Video Output Switching (0x4F)
  kind: action
  command: "0x21 0x01 0x4F 0x01 <value> 0x0D"
  params:
    - name: value
      type: integer
      description: "0x02=HDMI Out 1, 0x03=HDMI Out 2, 0x04=HDMI Out 1+2, 0xF0=request"

- id: select_hdmi_out1
  label: Select HDMI Out 1 (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x49 0x0D"

- id: select_hdmi_out2
  label: Select HDMI Out 2 (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4A 0x0D"

- id: select_hdmi_out_both
  label: Select HDMI Out 1 & 2 (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4B 0x0D"

- id: set_input_name
  label: Set/Request Input Name (0x20)
  kind: action
  command: "0x21 <Zn> 0x20 <n> <ASCII bytes...> 0x0D"
  params:
    - name: name
      type: string
      description: Up to 10 ASCII characters.
  notes: "For query, use Dl=0x01 with Data=0xF0. Response Dl=0x0A on query."

- id: fm_scan_up
  label: FM Scan Up (0x23)
  kind: action
  command: "0x21 0x01 0x23 0x01 0x01 0x0D"
  notes: "Only valid on FM input. Response Data=0xFF while scanning."

- id: fm_scan_down
  label: FM Scan Down (0x23)
  kind: action
  command: "0x21 0x01 0x23 0x01 0x02 0x0D"
  notes: "Only valid on FM input. Response Data=0xFF while scanning."

- id: dab_scan
  label: DAB Scan (0x24)
  kind: action
  command: "0x21 0x01 0x24 0x01 0xF0 0x0D"
  notes: "Only valid on DAB input. Response Data=0xFF while scanning."

- id: heartbeat
  label: Heartbeat (0x25)
  kind: action
  command: "0x21 0x01 0x25 0x01 0xF0 0x0D"
  notes: "Resets the EuP standby timer."

- id: reboot
  label: Reboot (0x26)
  kind: action
  command: "0x21 0x01 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D"
  notes: "ASCII payload 'REBOOT'."

- id: headphone_override_set
  label: Headphone Override Set (0x1F)
  kind: action
  command: "0x21 <Zn> 0x1F 0x01 0x01 0x0D"
  notes: "Activates the mute relays without zeroing the volume."

- id: headphone_override_clear
  label: Headphone Override Clear (0x1F)
  kind: action
  command: "0x21 <Zn> 0x1F 0x01 0x00 0x0D"

- id: zone2_power_on
  label: Zone 2 Power On (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x7B 0x0D"

- id: zone2_power_off
  label: Zone 2 Power Off (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x7C 0x0D"

- id: zone2_volume_up
  label: Zone 2 Volume Up (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x01 0x0D"

- id: zone2_volume_down
  label: Zone 2 Volume Down (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x02 0x0D"

- id: zone2_mute
  label: Zone 2 Mute Toggle (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x03 0x0D"

- id: zone2_mute_on
  label: Zone 2 Mute On (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x04 0x0D"

- id: zone2_mute_off
  label: Zone 2 Mute Off (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x05 0x0D"

- id: zone2_select_cd
  label: Zone 2 Select CD (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x06 0x0D"

- id: zone2_select_bd
  label: Zone 2 Select BD (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x07 0x0D"

- id: zone2_select_stb
  label: Zone 2 Select STB (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x08 0x0D"

- id: zone2_select_av
  label: Zone 2 Select AV (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x09 0x0D"

- id: zone2_select_game
  label: Zone 2 Select Game (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0B 0x0D"

- id: zone2_select_aux
  label: Zone 2 Select AUX (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0D 0x0D"

- id: zone2_select_pvr
  label: Zone 2 Select PVR (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0F 0x0D"

- id: zone2_select_fm
  label: Zone 2 Select FM (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0E 0x0D"

- id: zone2_select_dab
  label: Zone 2 Select DAB (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x10 0x0D"

- id: zone2_select_usb
  label: Zone 2 Select USB (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x12 0x0D"

- id: zone2_select_net
  label: Zone 2 Select NET (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x13 0x0D"

- id: zone2_select_sat
  label: Zone 2 Select SAT (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x14 0x0D"

- id: zone2_select_vcr
  label: Zone 2 Select VCR (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x15 0x0D"

- id: zone2_follow_zone1
  label: Zone 2 Follow Zone 1 (RC5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x10 0x14 0x0D"
  notes: "RC5 system 16 (Zone 1) command 20."

- id: zone_change_next
  label: Change Control to Next Zone (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x5F 0x0D"

- id: cycle_decode_modes
  label: Cycle Between Decoding Modes (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x20 0x0D"

- id: decode_mode_stereo
  label: Decode Mode: Stereo (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6B 0x0D"

- id: decode_mode_multichannel
  label: Decode Mode: Multi-Channel (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6A 0x0D"

- id: decode_mode_dolby_surround
  label: Decode Mode: Dolby Surround (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6E 0x0D"

- id: decode_mode_neo6_cinema
  label: Decode Mode: DTS Neo:6 Cinema (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6F 0x0D"

- id: decode_mode_neo6_music
  label: Decode Mode: DTS Neo:6 Music (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x70 0x0D"

- id: decode_mode_neural_x
  label: Decode Mode: DTS Neural:X (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x71 0x0D"

- id: decode_mode_dts_virtual_x
  label: Decode Mode: DTS Virtual:X (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x73 0x0D"

- id: decode_mode_5_7ch_stereo
  label: Decode Mode: 5/7 Ch Stereo (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x45 0x0D"

- id: decode_mode_dolby_d_ex
  label: Decode Mode: Dolby D EX (RC5)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x17 0x0D"

- id: treble_up
  label: Treble +1 dB (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x2E 0x0D"

- id: treble_down
  label: Treble -1 dB (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x66 0x0D"

- id: bass_up
  label: Bass +1 dB (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x2C 0x0D"

- id: bass_down
  label: Bass -1 dB (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x2D 0x0D"

- id: sub_trim_up
  label: Sub Trim +0.5 dB (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x69 0x0D"

- id: sub_trim_down
  label: Sub Trim -0.5 dB (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x6C 0x0D"

- id: menu_navigate_up
  label: Menu Navigate Up (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x56 0x0D"

- id: menu_navigate_down
  label: Menu Navigate Down (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x55 0x0D"

- id: menu_navigate_left
  label: Menu Navigate Left (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x51 0x0D"

- id: menu_navigate_right
  label: Menu Navigate Right (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x50 0x0D"

- id: menu_ok
  label: Menu OK (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x57 0x0D"

- id: menu_home
  label: Menu Home (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x2B 0x0D"

- id: menu_open_system
  label: Enter System Menu (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x52 0x0D"

- id: menu_open_trim
  label: Enter Trim Menu (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x5A 0x0D"

- id: transport_play
  label: Transport Play (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x35 0x0D"

- id: transport_pause
  label: Transport Pause (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x30 0x0D"

- id: transport_stop
  label: Transport Stop (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x36 0x0D"

- id: transport_fast_forward
  label: Transport Fast Forward (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x34 0x0D"

- id: transport_rewind
  label: Transport Rewind (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x79 0x0D"

- id: transport_skip_forward
  label: Transport Skip Forward (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x0B 0x0D"

- id: transport_skip_back
  label: Transport Skip Back (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x21 0x0D"

- id: transport_random
  label: Transport Random (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x4C 0x0D"

- id: transport_repeat
  label: Transport Repeat (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x31 0x0D"

- id: numeric_1
  label: Numeric 1 (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x01 0x0D"

- id: numeric_2
  label: Numeric 2 (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x02 0x0D"

- id: numeric_3
  label: Numeric 3 (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x03 0x0D"

- id: numeric_4
  label: Numeric 4 (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x04 0x0D"

- id: numeric_5
  label: Numeric 5 (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x05 0x0D"

- id: numeric_6
  label: Numeric 6 (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x06 0x0D"

- id: numeric_7
  label: Numeric 7 (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x07 0x0D"

- id: numeric_8
  label: Numeric 8 (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x08 0x0D"

- id: numeric_9
  label: Numeric 9 (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x09 0x0D"

- id: numeric_0
  label: Numeric 0 (RC5)
  kind: action
  command: "0x21 <Zn> 0x08 0x02 0x10 0x00 0x0D"

- id: amx_duet_discovery
  label: AMX Duet Discovery
  kind: query
  command: "\"AMX\\r\""
  notes: "ASCII, sent as a bare line ending in 0x0D. Response identifies model and RS232 protocol version."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]

- id: display_brightness
  type: enum
  values: [off, l1, l2]

- id: headphone_connected
  type: enum
  values: [disconnected, connected]

- id: fm_programme_type
  type: string
  description: "ASCII string, e.g. 'POP MUSIC'. Returned by 0x03."

- id: dab_programme_type
  type: string
  description: "16-byte ASCII label padded with 0x20. Returned by 0x19."

- id: dab_station
  type: string
  description: "16-byte service label padded with 0x20. Returned by 0x18."

- id: dab_dls
  type: string
  description: "128-byte ASCII text padded with 0x20. Returned by 0x1A."

- id: rds_information
  type: string
  description: "ASCII RDS radio text. Returned by 0x12."

- id: software_version
  type: object
  description: "{ echo: 0xF0..0xF5, major, minor }. Returned by 0x04."

- id: rs232_protocol_version
  type: string
  description: "Reported in AMX Duet discovery response as x.y.z."

- id: video_input
  type: enum
  values: [bd, sat, av, pvr, vcr, game, stb]
  description: "From 0x0A."

- id: audio_input
  type: enum
  values: [analogue, digital, hdmi]
  description: "From 0x0B."

- id: current_source
  type: enum
  values: [follow_zone_1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]
  description: "From 0x1D."

- id: volume
  type: integer
  description: "0..99 dB. From 0x0D."

- id: mute_state
  type: enum
  values: [muted, unmuted]

- id: direct_mode
  type: enum
  values: [off, on]

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, five_seven_ch_stereo, dts_neural_x, reserved, dts_virtual_x]
  description: "From 0x10."

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multichannel, dts_es_neural_x, dolby_surround, reserved, dts_virtual_x]
  description: "From 0x11."

- id: video_output_resolution
  type: enum
  values: [sd_progressive, 720p, 1080i, 1080p, preferred, bypass, "4k"]

- id: menu_open
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  description: "From 0x14."

- id: tuner_preset
  type: integer
  description: "1..50, or 0xFF meaning none selected. From 0x15."

- id: fm_frequency
  type: object
  description: "{ mhz, tens_of_khz } in 0.05 MHz steps. From 0x16."

- id: preset_details
  type: object
  description: "{ preset, type: 0x01=FM freq | 0x02=FM RDS | 0x03=DAB, data, name }."

- id: network_playback_status
  type: object
  description: "{ state: navigating|playing|paused|busy, label }."

- id: incoming_video_parameters
  type: object
  description: "{ h_res, v_res, refresh_hz, interlaced, aspect_ratio }."

- id: incoming_audio_format
  type: object
  description: "{ stream_format, channel_config }."

- id: incoming_audio_sample_rate
  type: enum
  values: ["32k", "44.1k", "48k", "88.2k", "96k", "176.4k", "192k", unknown, undetected]

- id: zone1_osd
  type: enum
  values: [on, off]

- id: video_output_switching
  type: enum
  values: [hdmi_out_1, hdmi_out_2, hdmi_out_1_and_2]

- id: input_name
  type: string
  description: "Up to 10 ASCII characters. From 0x20."

- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]

- id: room_eq_state
  type: enum
  values: [off, on, not_calculated]

- id: dolby_volume_state
  type: enum
  values: [off, on]

- id: dolby_leveller_value
  type: integer
  description: "0..10, or 0xFF=off."

- id: dolby_volume_calibration_offset
  type: integer
  description: "-15..+15 dB."

- id: balance
  type: integer
  description: "-6..+6."

- id: subwoofer_trim
  type: number
  description: "-10..+10 dB in 0.5 dB steps."

- id: lipsync_delay_ms
  type: integer
  description: "0..250 ms in 5 ms steps."

- id: compression
  type: enum
  values: [off, medium, high]

- id: treble_eq_db
  type: integer
  description: "-12..+12 dB."

- id: bass_eq_db
  type: integer
  description: "-12..+12 dB."

- id: sub_stereo_trim_db
  type: number
  description: "-10..0 dB in 0.5 dB steps."
```

## Variables
```yaml
# Settable numeric/enum parameters covered as actions above (0x0D, 0x35, 0x36,
# 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3F, 0x40, 0x41, 0x45). No additional standalone
# settable variables beyond these discrete command-bearing actions.
```

## Events
```yaml
# The device emits unsolicited status messages when state changes (e.g. front
# panel DISPLAY pressed, decode mode change). These are reported on the same
# wire format as responses, with the originating command code and answer
# code 0x00. Their full enumeration is not given in this source document; a
# controller should treat any response with answer code 0x00 received outside
# a command/response pair as an event reflecting the change.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults     # requires 0xAA 0xAA confirmation pattern
  - reboot                       # requires ASCII payload 'REBOOT'
  - save_secure_backup           # requires 0x55 0x55 + 4-digit PIN
  - restore_secure_backup        # requires 0x55 0x55 + 4-digit PIN
interlocks: []
# UNRESOLVED: no power-on sequencing or interlock procedure stated in source.
```

## Notes
- Source document is titled for AVR390/AVR550/AVR850/AVR860/SR250; the Arcam T32 is **not** explicitly named anywhere. Compatibility is inferred from the shared Arcam RS232 protocol family. Verify before relying on this spec for a T32.
- IP control uses TCP port 50000 according to the Set-up section, but no IP message framing is given in this source — only the port number is stated.
- AMX Duet discovery is ASCII, terminating with `0x0D` (`\r`), and replies with a model-specific banner; the `<Device-Revision>` field is the RS232 protocol version `x.y.z`.
- Commands `0xF0`–`0xFF` are reserved for test functions and must not be transmitted.
- Many commands return `0x85` ("Command invalid at this time") when the Setup Menu is on screen, when the wrong source is selected for a tuner/network command, or while a `0x1E` (save) command is in progress.
- Volume commands report dB directly: `Data = dB` (e.g. `0x2D` = 45 dB).
- Subwoofer trim and sub stereo trim encode 0.5 dB steps: `0x00..0x14` = 0..+10 dB, `0x81..0x94` = -0.5..-10 dB.
- Lipsync delay is in 5 ms steps: `0x00..0x32` = 0..250 ms.
- Treble/bass EQ, balance, and Dolby Volume calibration offset use two's-complement-style split ranges (`0x00..0x0C` for 0..+12 / 0..+15, `0x81..0x8C` / `0x80..0x8F` for negative values).
- Many RC5 IR commands in the source's IR table are reproduced as RS232 actions via the Simulate RC5 (0x08) command — that is the canonical way to invoke them over serial.

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-06-25T21:41:27.911Z
last_checked_at: 2026-09-02T22:16:46.782Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-02T22:16:46.782Z
matched_actions: 156
action_count: 156
confidence: medium
summary: "All 156 spec actions match source command tables (49 direct opcodes + AMX Duet + ~96 RC5 codes); transport params verbatim; shapes agree. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is titled for AVR390/AVR550/AVR850/AVR860/SR250; the Arcam T32 is not mentioned. Treat this spec as provisional and verify against a T32-specific datasheet or the actual device before relying on it."
- "no multi-step sequences described explicitly in source."
- "no power-on sequencing or interlock procedure stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
