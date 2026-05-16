---
spec_id: admin/arcam-cds50
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam CDS50 Control Spec"
manufacturer: Arcam
model_family: CDS50
aliases: []
compatible_with:
  manufacturers:
    - Arcam
  models:
    - CDS50
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
last_checked_at: 2026-05-16T12:27:25.336Z
generated_at: 2026-05-16T12:27:25.336Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T12:27:25.336Z
  matched_actions: 52
  action_count: 52
  confidence: high
  summary: "All 52 spec command codes (0x00–0x4F) confirmed verbatim in source command sections; transport baud 38400 and TCP port 50000 both explicitly stated in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# Arcam CDS50 Control Spec

## Summary

The Arcam CDS50 (and related AVR/AV/SR series) is controlled via an RS-232C serial interface using a binary framing protocol. Commands are structured as fixed-format byte sequences with a start byte (0x21), zone number, command code, data length, payload bytes, and an end byte (0x0D). The device responds to every command within three seconds and also sends unsolicited state-change messages when the front panel or IR remote alters device state. IP control (TCP) is also available on port 50000, but RS-232 is the primary documented interface.

<!-- UNRESOLVED: The source document heading references AVR390/AVR550/AVR850/AV860/SR250; CDS50-specific command differences (if any) are not documented in the source. -->

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
  type: none  # inferred: no auth procedure in source
```

**Cable wiring (null modem):**
- Pin 2 (Connector 1) ↔ Pin 3 (Connector 2): Rx/Tx
- Pin 3 (Connector 1) ↔ Pin 2 (Connector 2): Tx/Rx
- Pin 5 ↔ Pin 5: RS-232 Ground

**Note:** RS-232 control must be explicitly enabled on the device. By default it is disabled for minimum standby power consumption. Enable via front panel (hold DIRECT button 4 seconds until "RS232 CONTROL ON" displays) or via OSD menu (General Setup → Control → On).

## Traits

```yaml
- powerable       # inferred from power command (0x00) present
- queryable       # inferred from query commands returning state present
- routable        # inferred from video/audio input routing commands present
- levelable       # inferred from volume (0x0D), treble (0x35), bass (0x36), balance (0x3B) commands present
```

## Actions

```yaml
# Frame format for all commands:
# <0x21> <ZoneNum> <CommandCode> <DataLength> <Data...> <0x0D>
# Frame format for all responses:
# <0x21> <ZoneNum> <CommandCode> <AnswerCode> <DataLength> <Data...> <0x0D>
#
# Zone numbers: 0x01 = Zone 1 (master), 0x02 = Zone 2
#
# Answer codes:
#   0x00 = Status update (success)
#   0x82 = Zone invalid
#   0x83 = Command not recognised
#   0x84 = Parameter not recognised
#   0x85 = Command invalid at this time
#   0x86 = Invalid data length

- id: query_power_state
  label: Query Power State
  kind: query
  command_code: "0x00"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 = Zone 1, 0x02 = Zone 2)
  notes: "Data byte 0xF0 = request power state. Response: 0x00 = standby, 0x01 = powered on."

- id: set_power_state
  label: Set Power State (via RC5 simulate)
  kind: action
  command_code: "0x08"
  notes: "Use RC5 simulate (0x08) with code 0x10 0x7B for Power On, 0x10 0x7C for Power Off."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: rc5_system
      type: byte
      description: RC5 system code
    - name: rc5_command
      type: byte
      description: RC5 command code

- id: query_display_brightness
  label: Query Display Brightness
  kind: query
  command_code: "0x01"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
  notes: "Data 0xF0 = request. Response: 0x00 = off, 0x01 = L1, 0x02 = L2."

- id: set_display_brightness
  label: Set Display Brightness
  kind: action
  command_code: "0x01"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
    - name: level
      type: byte
      description: "0x00 = off, 0x01 = L1, 0x02 = L2"

- id: query_headphones
  label: Query Headphone Connection Status
  kind: query
  command_code: "0x02"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
  notes: "Data 0xF0 = request. Response: 0x00 = not connected, 0x01 = connected."

- id: query_fm_genre
  label: Query FM Programme Type
  kind: query
  command_code: "0x03"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Returns ASCII string of programme type. Returns 0x85 if FM not selected."

- id: query_software_version
  label: Query Software Version
  kind: query
  command_code: "0x04"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
    - name: version_type
      type: byte
      description: "0xF0 = RS232, 0xF1 = Host, 0xF2 = OSD, 0xF3 = DSP, 0xF4 = NET, 0xF5 = IAP"
  notes: "Response contains echo byte + major + minor version numbers."

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  command_code: "0x05"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
  notes: "Requires confirmation pattern: Data1=0xAA, Data2=0xAA. Command: 0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"

- id: save_restore_secure_settings
  label: Save/Restore Secure Settings
  kind: action
  command_code: "0x06"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
    - name: operation
      type: byte
      description: "0x00 = save, 0x01 = restore"
    - name: confirmation
      type: bytes
      description: "Two bytes 0x55 0x55 required"
    - name: pin
      type: bytes
      description: "Four PIN digits"
  notes: "Returns 0x85 if no secure copy exists (for restore) or if another save is in progress."

- id: simulate_rc5_ir
  label: Simulate RC5 IR Command
  kind: action
  command_code: "0x08"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: rc5_system
      type: byte
      description: RC5 system code (e.g. 0x10 for Zone 1)
    - name: rc5_command
      type: byte
      description: RC5 command code
  notes: "An additional status message will be sent in most cases as a result of the IR command."

- id: set_display_info_type
  label: Set Display Information Type
  kind: action
  command_code: "0x09"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: mode
      type: byte
      description: "0x00 = Processing mode, 0xE0 = Cycle all, 0xF0 = Request current. FM: 0x01=Radio text, 0x02=Programme type, 0x03=Signal strength. DAB: 0x01=Radio text, 0x02=Genre, 0x03=Signal quality, 0x04=Bit rate. NET/USB: 0x01=Track, 0x02=Artist, 0x03=Album, 0x04=Audio type, 0x05=Rate."

- id: select_video_input
  label: Select Video Input
  kind: action
  command_code: "0x0A"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
    - name: source
      type: byte
      description: "0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=Game, 0x06=STB, 0xF0=Request current"
  notes: "Returns 0x85 if OSD is showing setup screen."

- id: select_audio_input_type
  label: Select Analogue/Digital Audio Input
  kind: action
  command_code: "0x0B"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: type
      type: byte
      description: "0x00=Analogue, 0x01=Digital, 0x02=HDMI, 0xF0=Request current"
  notes: "Returns 0x85 if OSD is showing setup screen."

- id: set_imax_enhanced
  label: Set IMAX Enhanced Mode
  kind: action
  command_code: "0x0C"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: mode
      type: byte
      description: "0xF0=Request, 0xF1=Auto, 0xF2=On, 0xF3=Off"
  notes: "Response: 0x00=Off, 0x01=On, 0x02=Auto."

- id: set_volume
  label: Set/Request Volume
  kind: action
  command_code: "0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: level
      type: byte
      description: "0x00–0x63 (0–99) to set volume; 0xF0 to request current volume"
  notes: "Returns current volume even if zone is muted. Use 0x0E (Mute Status) to check mute state."

- id: query_mute_status
  label: Request Mute Status
  kind: query
  command_code: "0x0E"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Data 0xF0 = request. Response: 0x00 = muted, 0x01 = not muted."

- id: query_direct_mode
  label: Request Direct Mode Status
  kind: query
  command_code: "0x0F"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
  notes: "Data 0xF0 = request. Response: 0x00 = direct mode off, 0x01 = direct mode on."

- id: query_decode_mode_2ch
  label: Request Decode Mode (2ch)
  kind: query
  command_code: "0x10"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
  notes: "Response values: 0x01=Stereo, 0x04=Dolby Surround, 0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7 Ch Stereo, 0x0A=DTS Neural:X, 0x0C=DTS Virtual:X."

- id: query_decode_mode_mch
  label: Request Decode Mode (Multi-Channel)
  kind: query
  command_code: "0x11"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
  notes: "Response values: 0x01=Stereo down-mix, 0x02=Multi-channel, 0x03=DTS-ES/Neural:X, 0x06=Dolby Surround, 0x0C=DTS Virtual:X."

- id: query_rds_info
  label: Request RDS Information
  kind: query
  command_code: "0x12"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Data 0xF0 = request FM RDS. Returns ASCII string. Returns 0x85 if FM not selected."

- id: query_video_output_resolution
  label: Request Video Output Resolution
  kind: query
  command_code: "0x13"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
  notes: "Data 0xF0 = request. Response: 0x02=SD Progressive, 0x03=720p, 0x04=1080i, 0x05=1080p, 0x06=Preferred, 0x07=Bypass, 0x08=4K."

- id: query_menu_status
  label: Request Menu Status
  kind: query
  command_code: "0x14"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
  notes: "Data 0xF0 = request. Response: 0x00=None, 0x02=Setup, 0x03=Trim, 0x04=Bass, 0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB."

- id: set_tuner_preset
  label: Set/Request Tuner Preset
  kind: action
  command_code: "0x15"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: preset
      type: byte
      description: "0x01–0x32 (1–50) to select preset; 0xF0 to request current preset"
  notes: "Response: 0xFF = no preset selected, 0x01–0x32 = current preset. Returns 0x85 if tuner not selected."

- id: tune_frequency
  label: Tune FM Frequency
  kind: action
  command_code: "0x16"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: direction
      type: byte
      description: "0x00=Decrement, 0x01=Increment, 0xF0=Request current frequency"
  notes: "Steps by 0.05 MHz. Response: Data1=MHz, Data2=10's kHz. Returns 0x85 if tuner not selected."

- id: query_dab_station
  label: Request DAB Station
  kind: query
  command_code: "0x18"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Data 0xF0 = request. Returns 16-byte ASCII service label padded with spaces. Returns 0x85 if DAB not selected."

- id: query_dab_programme_type
  label: Request DAB Programme Type
  kind: query
  command_code: "0x19"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Data 0xF0 = request. Returns 16-byte ASCII programme type. Returns 0x85 if DAB not selected."

- id: query_dab_dls
  label: Request DAB DLS/PDT Information
  kind: query
  command_code: "0x1A"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Data 0xF0 = request. Returns 128-byte ASCII digital radio text padded with spaces. Returns 0x85 if DAB not selected."

- id: query_preset_details
  label: Request Preset Details
  kind: query
  command_code: "0x1B"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: preset_number
      type: byte
      description: "0x01–0x32 (1–50)"
  notes: "Response: Data1=preset number, Data2=type (0x01=FM freq, 0x02=FM RDS, 0x03=DAB), Data3-4=FM frequency or DAB ASCII name."

- id: query_network_playback_status
  label: Request Network Playback Status
  kind: query
  command_code: "0x1C"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Data 0xF0 = request. Response: 0x00=Navigating, 0x01=Playing, 0x02=Paused, 0xFF=Busy/Not Playing; followed by folder/file name in ASCII. Returns 0x85 if network not selected."

- id: query_current_source
  label: Request Current Source
  kind: query
  command_code: "0x1D"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Data 0xF0 = request. Response values: 0x00=Follow Zone 1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=VCR, 0x08=AUX, 0x09=DISPLAY, 0x0B=TUNER(FM), 0x0C=TUNER(DAB), 0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=GAME."

- id: set_input_name
  label: Set/Request Input Name
  kind: action
  command_code: "0x20"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
    - name: name
      type: string
      description: "ASCII name string (up to 10 characters) or 0xF0 to query"
  notes: "Query response is padded to 10 bytes (0x0A)."

- id: fm_scan
  label: FM Scan Up/Down
  kind: action
  command_code: "0x23"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
    - name: direction
      type: byte
      description: "0x01=Scan up, 0x02=Scan down"
  notes: "Response Data1=0xFF indicates scanning. Only valid when on FM input."

- id: dab_scan
  label: DAB Scan
  kind: action
  command_code: "0x24"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
  notes: "Data 0xF0 = start scan. Response Data1=0xFF indicates scanning. Only valid when on DAB input."

- id: heartbeat
  label: Heartbeat
  kind: action
  command_code: "0x25"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
  notes: "Data 0xF0 = heartbeat. Also resets the EuP standby timer. Response Data1=0x00."

- id: reboot
  label: Reboot
  kind: action
  command_code: "0x26"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
  notes: "Requires confirmation string 'REBOOT' in ASCII: Data = 0x52 0x45 0x42 0x4F 0x4F 0x54 (Dl=0x06)."

- id: set_headphone_override
  label: Set Headphone Override
  kind: action
  command_code: "0x1F"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: state
      type: byte
      description: "0x00=Clear (speakers muted if headphones present), 0x01=Set (speakers unmuted if headphones present)"
  notes: "Activates/deactivates mute relays; does not zero the volume."

- id: set_treble
  label: Set Treble Equalisation
  kind: action
  command_code: "0x35"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: byte
      description: "0x00–0x0C = 0 to +12dB; 0x81–0x8C = -1 to -12dB; 0xF0=Request; 0xF1=Increment 1dB; 0xF2=Decrement 1dB"

- id: set_bass
  label: Set Bass Equalisation
  kind: action
  command_code: "0x36"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: byte
      description: "0x00–0x0C = 0 to +12dB; 0x81–0x8C = -1 to -12dB; 0xF0=Request; 0xF1=Increment 1dB; 0xF2=Decrement 1dB"

- id: set_room_eq
  label: Set Room Equalisation
  kind: action
  command_code: "0x37"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: mode
      type: byte
      description: "0xF0=Request; 0xF1=On; 0xF2=Off"
  notes: "Response: 0x00=Off, 0x01=On, 0x02=Not calculated (off)."

- id: set_dolby_volume
  label: Set Dolby Volume
  kind: action
  command_code: "0x38"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: mode
      type: byte
      description: "0x00=Off, 0x01=On, 0xF0=Request current"

- id: set_dolby_leveller
  label: Set Dolby Leveller
  kind: action
  command_code: "0x39"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: byte
      description: "0x00–0x0A = 0–10; 0xF0=Request; 0xF1=Increment; 0xF2=Decrement; 0xFF=Off"

- id: set_dolby_volume_calibration
  label: Set Dolby Volume Calibration Offset
  kind: action
  command_code: "0x3A"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: byte
      description: "0x00–0x0F = 0 to +15dB; 0x80–0x8F = -1 to -15dB; 0xF0=Request; 0xF1=Increment 1dB; 0xF2=Decrement 1dB"

- id: set_balance
  label: Set Balance
  kind: action
  command_code: "0x3B"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: byte
      description: "0x00–0x06 = 0 to +6; 0x81–0x86 = -1 to -6; 0xF0=Request; 0xF1=Increment; 0xF2=Decrement"

- id: set_subwoofer_trim
  label: Set Subwoofer Trim
  kind: action
  command_code: "0x3F"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: byte
      description: "0x00–0x14 = +0 to +10dB in 0.5dB steps; 0x81–0x94 = -0.5 to -10dB in 0.5dB steps; 0xF0=Request; 0xF1=Increment 0.5dB; 0xF2=Decrement 0.5dB"

- id: set_lipsync_delay
  label: Set Lipsync Delay
  kind: action
  command_code: "0x40"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: byte
      description: "0x00–0x32 = delay in 5ms steps; 0xF0=Request; 0xF1=Increment 5ms; 0xF2=Decrement 5ms"

- id: set_compression
  label: Set Dynamic Range Compression
  kind: action
  command_code: "0x41"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: level
      type: byte
      description: "0x00=Off, 0x01=Medium, 0x02=High, 0xF0=Request current"

- id: query_incoming_video_params
  label: Request Incoming Video Parameters
  kind: query
  command_code: "0x42"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Data 0xF0 = request. Response: 7 bytes — H-res MSB, H-res LSB, V-res MSB, V-res LSB, refresh rate, interlaced flag (0=progressive/1=interlaced), aspect ratio (0=undefined/1=4:3/2=16:9)."

- id: query_incoming_audio_format
  label: Request Incoming Audio Format
  kind: query
  command_code: "0x43"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Data 0xF0 = request. Response: Data1=audio stream format (PCM, Dolby Digital, DTS, etc.), Data2=channel configuration (see source for full enum)."

- id: query_incoming_audio_sample_rate
  label: Request Incoming Audio Sample Rate
  kind: query
  command_code: "0x44"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
  notes: "Data 0xF0 = request. Response: 0x00=32kHz, 0x01=44.1kHz, 0x02=48kHz, 0x03=88.2kHz, 0x04=96kHz, 0x05=176.4kHz, 0x06=192kHz, 0x07=Unknown, 0x08=Undetected."

- id: set_sub_stereo_trim
  label: Set Sub Stereo Trim
  kind: action
  command_code: "0x45"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
    - name: value
      type: byte
      description: "0x00=0dB; 0x81–0x94=-0.5 to -10dB in 0.5dB steps; 0xF0=Request; 0xF1=Increment 0.5dB; 0xF2=Decrement 0.5dB"

- id: set_zone1_osd
  label: Set/Request Zone 1 OSD On/Off
  kind: action
  command_code: "0x4E"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
    - name: mode
      type: byte
      description: "0xF0=Request, 0xF1=OSD On, 0xF2=OSD Off"
  notes: "Response: 0x00=OSD is On, 0x01=OSD is Off."

- id: set_hdmi_output
  label: Set/Request Video Output Switching
  kind: action
  command_code: "0x4F"
  params:
    - name: zone
      type: integer
      description: Zone number (use 0x01)
    - name: output
      type: byte
      description: "0x02=HDMI Output 1, 0x03=HDMI Output 2, 0x04=HDMI Output 1 & 2, 0xF0=Request current"
```

## Feedbacks

```yaml
- id: power_state
  type: enum
  command_code: "0x00"
  values:
    - value: "0x00"
      label: Standby
    - value: "0x01"
      label: Power On

- id: current_source
  type: enum
  command_code: "0x1D"
  values:
    - value: "0x00"
      label: Follow Zone 1
    - value: "0x01"
      label: CD
    - value: "0x02"
      label: BD
    - value: "0x03"
      label: AV
    - value: "0x04"
      label: SAT
    - value: "0x05"
      label: PVR
    - value: "0x06"
      label: VCR
    - value: "0x08"
      label: AUX
    - value: "0x09"
      label: DISPLAY
    - value: "0x0B"
      label: "TUNER (FM)"
    - value: "0x0C"
      label: "TUNER (DAB)"
    - value: "0x0E"
      label: NET
    - value: "0x0F"
      label: USB
    - value: "0x10"
      label: STB
    - value: "0x11"
      label: GAME

- id: mute_state
  type: enum
  command_code: "0x0E"
  values:
    - value: "0x00"
      label: Muted
    - value: "0x01"
      label: Not Muted

- id: volume_level
  type: integer
  command_code: "0x0D"
  range: "0x00–0x63 (0–99)"

- id: network_playback_status
  type: enum
  command_code: "0x1C"
  values:
    - value: "0x00"
      label: Navigating
    - value: "0x01"
      label: Playing
    - value: "0x02"
      label: Paused
    - value: "0xFF"
      label: "Busy/Not Playing"

- id: incoming_audio_format
  type: enum
  command_code: "0x43"
  notes: "Full enum in source: PCM, Dolby Digital, DTS variants, Dolby Atmos (0x16), DTS:X (0x17), IMAX Enhanced (0x18)."
```

## Variables

```yaml
- id: treble
  label: Treble EQ
  command_code: "0x35"
  type: integer
  range: "-12 to +12 dB (encoded: 0x00-0x0C positive, 0x81-0x8C negative)"

- id: bass
  label: Bass EQ
  command_code: "0x36"
  type: integer
  range: "-12 to +12 dB (encoded: 0x00-0x0C positive, 0x81-0x8C negative)"

- id: balance
  label: Balance
  command_code: "0x3B"
  type: integer
  range: "-6 to +6 (encoded: 0x00-0x06 positive, 0x81-0x86 negative)"

- id: lipsync_delay
  label: Lipsync Delay
  command_code: "0x40"
  type: integer
  range: "0–250ms in 5ms steps (0x00–0x32)"

- id: subwoofer_trim
  label: Subwoofer Trim
  command_code: "0x3F"
  type: float
  range: "-10 to +10 dB in 0.5 dB steps"

- id: dolby_leveller
  label: Dolby Leveller
  command_code: "0x39"
  type: integer
  range: "0–10 (0x00–0x0A) or off (0xFF)"
```

## Events

```yaml
# The device sends unsolicited state-change messages using the same response format
# whenever the front panel or IR remote alters device state.
# These use command codes matching the state that changed (e.g., 0x00 for power,
# 0x0D for volume, 0x1D for source, etc.) with answer code 0x00 (Status update).
- id: state_change_notification
  description: "Unsolicited message sent when device state changes via front panel or IR remote. Format identical to query responses."
```

## Macros

```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety

```yaml
confirmation_required_for:
  - id: restore_factory_defaults
    command_code: "0x05"
    reason: "Requires two bytes 0xAA 0xAA as confirmation to avoid accidental restore."
  - id: save_restore_secure_settings
    command_code: "0x06"
    reason: "Requires two bytes 0x55 0x55 as confirmation plus 4-digit PIN."
  - id: reboot
    command_code: "0x26"
    reason: "Requires ASCII string 'REBOOT' (6 bytes) to prevent accidental reboot."
interlocks:
  - "Commands 0xF0–0xFF are reserved for test functions and must never be used."
  - "Certain commands return 0x85 (Command invalid at this time) when Setup Menu is displayed on OSD."
  - "Tuner commands (FM/DAB) return 0x85 if the corresponding tuner input is not selected."
  - "Network commands return 0x85 if network input is not selected."
```

## Notes

**Command frame structure:**
- Command: `0x21 <Zone> <CmdCode> <DataLen> <Data...> 0x0D`
- Response: `0x21 <Zone> <CmdCode> <AnswerCode> <DataLen> <Data...> 0x0D`
- All numbers prefixed 0x are hexadecimal. Start byte is always 0x21 ('!'). End byte is always 0x0D (CR).

**Zone support:** Zone 1 (0x01) is the master zone. Zone 2 (0x02) is available for multi-zone configurations. RC5 Zone 2 commands use system code 0x17 (decimal 23).

**AMX Duet compatibility:** The device supports AMX Duet Dynamic Device Discovery Protocol (DDDP). Send `"AMX\r"` to receive device identification string.

**RC5 IR simulation (0x08):** All IR remote functions are available via the Simulate RC5 IR Command. Basic remote functions use RC5 system code 0x10 (decimal 16); Zone 2 functions use system code 0x17 (decimal 23). Advanced functions not on the supplied remote (Power On/Off discrete, mode selection, etc.) are listed in the Advanced Functions table in the source.

**EuP standby timer:** The Heartbeat command (0x25) resets this timer in addition to confirming connectivity.

**RS-232 cable:** Null modem wiring required. See Transport section for pin assignments.

<!-- UNRESOLVED: The source document header references AVR390/AVR550/AVR850/AV860/SR250 AV receivers; no CDS50-specific content was found. This spec is filed under entity_id arcam_cds50 but may cover a broader Arcam AVR family protocol. Command compatibility with CDS50 specifically is unverified. -->
<!-- UNRESOLVED: IP control port 50000 is stated in source but TCP-specific framing differences (if any) from serial are not documented. -->
<!-- UNRESOLVED: RS232 protocol version number range not stated (version 1.4 shown as example only). -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:54.633Z
last_checked_at: 2026-05-16T12:27:25.336Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T12:27:25.336Z
matched_actions: 52
action_count: 52
confidence: high
summary: "All 52 spec command codes (0x00–0x4F) confirmed verbatim in source command sections; transport baud 38400 and TCP port 50000 both explicitly stated in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
