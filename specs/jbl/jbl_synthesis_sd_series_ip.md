---
schema_version: ai4av-public-spec-v1
device_id: jbl/sdr-35
entity_id: jbl_synthesis_sd_series
spec_id: admin/jbl-synthesis-sd-series
revision: 1
author: admin
title: "JBL Synthesis SD Series Control Spec"
status: published
manufacturer: JBL
manufacturer_key: jbl
model_family: SDR-35
aliases: []
compatible_with:
  manufacturers:
    - JBL
  models:
    - SDR-35
    - SDR-38
    - SDP-55
    - SDP-58
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: jbl_synthesis_sd_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:52:00.851Z
retrieved_at: 2026-04-25T20:52:00.851Z
last_checked_at: 2026-04-25T20:52:00.851Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:52:00.851Z
  matched_actions: 64
  action_count: 64
  confidence: high
  summary: "All 64 spec actions matched literally to source command codes; transport parameters verified verbatim; command catalogue fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-17
---

# JBL Synthesis SD Series Control Spec

## Summary
JBL Synthesis SD Series AV receivers (SDR-35, SDR-38, SDP-55, SDP-58) support both RS-232 and IP control via the same binary protocol. The protocol uses a proprietary packet format with zone addressing, command codes, and answer codes. Control is enabled via front panel or OSD menu. IP control uses port 50000.

<!-- UNRESOLVED: power on/off commands not directly documented in system commands — only via RC5 Simulate IR command (0x08) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 50000  # IP control port
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
- powerable       # inferred: power state query (0x00) present; power on/off via RC5
- queryable       # inferred: many status query commands present
- levelable       # inferred: volume, bass, treble, balance, sub trim commands present
- routable        # inferred: source selection (0x1D), input config, HDMI output switching present
```

## Actions
```yaml
- id: get_power_state
  label: Get Power State
  kind: query
  params: []
  command_code: 0x00
  description: Request standby state of a zone. Data 0xF0 to query.

- id: set_power
  label: Set Power
  kind: action
  params:
    - name: power
      type: integer
      description: 0x00=standby, 0x01=power on
  command_code: 0x00

- id: get_display_brightness
  label: Get Display Brightness
  kind: query
  params: []
  command_code: 0x01

- id: get_headphone_status
  label: Get Headphone Status
  kind: query
  params: []
  command_code: 0x02

- id: get_fm_genre
  label: Get FM Genre
  kind: query
  params: []
  command_code: 0x03

- id: get_software_version
  label: Get Software Version
  kind: query
  params:
    - name: version_type
      type: integer
      description: 0xF0=RS232, 0xF1=Host, 0xF2=OSD, 0xF3=DSP, 0xF4=NET, 0xF5=IAP
  command_code: 0x04

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  params:
    - name: confirm
      type: integer
      description: Confirmation pattern 0xAA 0xAA
  command_code: 0x05

- id: secure_backup
  label: Secure Backup Save/Restore
  kind: action
  params:
    - name: operation
      type: integer
      description: 0x00=Save, 0x01=Restore
    - name: confirm
      type: integer
      description: Confirmation pattern 0x55
    - name: pin
      type: integer
      description: 4-digit PIN
  command_code: 0x06

- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  params:
    - name: system_code
      type: integer
      description: RC5 system code (e.g., 0x10 for main zone)
    - name: command
      type: integer
      description: RC5 command code
  command_code: 0x08

- id: set_display_info
  label: Set Display Info Type
  kind: action
  params:
    - name: info_type
      type: integer
      description: Display type code
  command_code: 0x09

- id: select_audio_input
  label: Select Audio Input Type
  kind: action
  params:
    - name: input_type
      type: integer
      description: 0x00=analog, 0x01=digital, 0x02=HDMI
  command_code: 0x0B

- id: set_imax_enhanced
  label: Set IMAX Enhanced
  kind: action
  params:
    - name: mode
      type: integer
      description: 0xF0=request, 0xF1=Auto, 0xF2=On, 0xF3=Off
  command_code: 0x0C

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: 0x00-0x63 (0-99)
  command_code: 0x0D

- id: get_volume
  label: Get Volume
  kind: query
  params: []
  command_code: 0x0D

- id: get_mute_status
  label: Get Mute Status
  kind: query
  params: []
  command_code: 0x0E

- id: get_direct_mode
  label: Get Direct Mode Status
  kind: query
  params: []
  command_code: 0x0F

- id: get_decode_mode_2ch
  label: Get 2-Channel Decode Mode
  kind: query
  params: []
  command_code: 0x10

- id: get_decode_mode_mch
  label: Get Multi-Channel Decode Mode
  kind: query
  params: []
  command_code: 0x11

- id: get_rds_info
  label: Get RDS Information
  kind: query
  params: []
  command_code: 0x12

- id: get_video_output_resolution
  label: Get Video Output Resolution
  kind: query
  params: []
  command_code: 0x13

- id: get_menu_status
  label: Get Menu Status
  kind: query
  params: []
  command_code: 0x14

- id: get_tuner_preset
  label: Get Tuner Preset
  kind: query
  params: []
  command_code: 0x15

- id: tune
  label: Tune
  kind: action
  params:
    - name: direction
      type: integer
      description: 0x00=decrement, 0x01=increment, 0xF0=request frequency
  command_code: 0x16

- id: get_dab_station
  label: Get DAB Station
  kind: query
  params: []
  command_code: 0x18

- id: get_dab_genre
  label: Get DAB Programme Type
  kind: query
  params: []
  command_code: 0x19

- id: get_dls_info
  label: Get DLS/PDT Information
  kind: query
  params: []
  command_code: 0x1A

- id: get_preset_details
  label: Get Preset Details
  kind: query
  params:
    - name: preset
      type: integer
      description: 0x01-0x32 (1-50)
  command_code: 0x1B

- id: get_network_playback_status
  label: Get Network Playback Status
  kind: query
  params: []
  command_code: 0x1C

- id: get_current_source
  label: Get Current Source
  kind: query
  params: []
  command_code: 0x1D

- id: set_headphone_override
  label: Set Headphone Override
  kind: action
  params:
    - name: state
      type: integer
      description: 0x00=clear mute relays, 0x01=set mute relays
  command_code: 0x1F

- id: set_input_name
  label: Set Input Name
  kind: action
  params:
    - name: name
      type: string
      description: ASCII name up to 10 characters
  command_code: 0x20

- id: fm_scan
  label: FM Scan
  kind: action
  params:
    - name: direction
      type: integer
      description: 0x01=scan up, 0x02=scan down
  command_code: 0x23

- id: dab_scan
  label: DAB Scan
  kind: action
  params:
    - name: action
      type: integer
      description: 0xF0=start scan
  command_code: 0x24

- id: heartbeat
  label: Heartbeat
  kind: action
  params: []
  command_code: 0x25

- id: reboot
  label: Reboot
  kind: action
  params:
    - name: confirm
      type: string
      description: Must be "REBOOT" (0x52 0x45 0x42 0x4F 0x4F 0x54)
  command_code: 0x26

- id: get_setup
  label: Get Setup Status
  kind: query
  params: []
  command_code: 0x27

- id: get_input_config
  label: Get Input Configuration
  kind: query
  params: []
  command_code: 0x28

- id: get_general_setup
  label: Get General Setup
  kind: query
  params: []
  command_code: 0x29

- id: get_speaker_types
  label: Get Speaker Types
  kind: query
  params: []
  command_code: 0x2A

- id: get_speaker_distances
  label: Get Speaker Distances
  kind: query
  params: []
  command_code: 0x2B

- id: get_speaker_levels
  label: Get Speaker Levels
  kind: query
  params: []
  command_code: 0x2C

- id: get_video_inputs
  label: Get Video Input Configuration
  kind: query
  params: []
  command_code: 0x2D

- id: get_hdmi_settings
  label: Get HDMI Settings
  kind: query
  params: []
  command_code: 0x2E

- id: get_zone_settings
  label: Get Zone Settings
  kind: query
  params: []
  command_code: 0x2F

- id: get_network_settings
  label: Get Network Settings
  kind: query
  params: []
  command_code: 0x30

- id: get_bluetooth_settings
  label: Get Bluetooth Settings
  kind: query
  params: []
  command_code: 0x32

- id: get_room_eq_names
  label: Get Room EQ Names
  kind: query
  params: []
  command_code: 0x34

- id: set_treble
  label: Set Treble EQ
  kind: action
  params:
    - name: value
      type: integer
      description: 0x00-0x0C = 0 to +12dB, 0x81-0x8C = -1 to -12dB, 0xF1=increment, 0xF2=decrement
  command_code: 0x35

- id: set_bass
  label: Set Bass EQ
  kind: action
  params:
    - name: value
      type: integer
      description: 0x00-0x0C = 0 to +12dB, 0x81-0x8C = -1 to -12dB, 0xF1=increment, 0xF2=decrement
  command_code: 0x36

- id: set_room_eq
  label: Set Room EQ
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=off, 0x01=EQ1, 0x02=EQ2, 0x03=EQ3, 0xF0=request
  command_code: 0x37

- id: set_dolby_audio
  label: Set Dolby Audio Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=off, 0x01=movie, 0x02=music, 0x03=night, 0xF0=request
  command_code: 0x38

- id: set_balance
  label: Set Balance
  kind: action
  params:
    - name: value
      type: integer
      description: 0x00-0x06=0 to +6, 0x81-0x86=-1 to -6, 0xF1=increment, 0xF2=decrement
  command_code: 0x3B

- id: set_subwoofer_trim
  label: Set Subwoofer Trim
  kind: action
  params:
    - name: value
      type: integer
      description: 0x00-0x14=+0 to +10dB in 0.5dB steps, 0x81-0x94=-0.5 to -10dB, 0xF1=increment, 0xF2=decrement
  command_code: 0x3F

- id: set_lipsync_delay
  label: Set Lipsync Delay
  kind: action
  params:
    - name: delay
      type: integer
      description: 0x00-0x32 in 5ms steps, 0xF1=increment, 0xF2=decrement
  command_code: 0x40

- id: set_compression
  label: Set Compression
  kind: action
  params:
    - name: level
      type: integer
      description: 0x00=off, 0x01=medium, 0x02=high, 0xF0=request
  command_code: 0x41

- id: get_incoming_video_params
  label: Get Incoming Video Parameters
  kind: query
  params: []
  command_code: 0x42

- id: get_incoming_audio_format
  label: Get Incoming Audio Format
  kind: query
  params: []
  command_code: 0x43

- id: get_incoming_audio_sample_rate
  label: Get Incoming Audio Sample Rate
  kind: query
  params: []
  command_code: 0x44

- id: set_sub_stereo_trim
  label: Set Sub Stereo Trim
  kind: action
  params:
    - name: value
      type: integer
      description: 0x00=0dB, 0x81-0x94=-0.5 to -10dB in 0.5dB steps, 0xF1=increment, 0xF2=decrement
  command_code: 0x45

- id: set_zone1_osd
  label: Set Zone 1 OSD
  kind: action
  params:
    - name: state
      type: integer
      description: 0xF1=on, 0xF2=off, 0xF0=request
  command_code: 0x4E

- id: set_video_output
  label: Set Video Output Switching
  kind: action
  params:
    - name: output
      type: integer
      description: 0x02=HDMI1, 0x03=HDMI2, 0x04=HDMI1&2, 0xF0=request
  command_code: 0x4F

- id: get_bluetooth_status
  label: Get Bluetooth Status
  kind: query
  params: []
  command_code: 0x50

- id: get_now_playing
  label: Get Now Playing Information
  kind: query
  params:
    - name: info_type
      type: integer
      description: 0xF0=track, 0xF1=artist, 0xF2=album, 0xF3=application, 0xF4=sample rate, 0xF5=encoder
  command_code: 0x64

- id: get_engineering_menu
  label: Get Engineering Menu
  kind: query
  params: []
  command_code: 0x33
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - 0x00: standby
    - 0x01: on
  command_code: 0x00

- id: display_brightness
  label: Display Brightness
  type: enum
  values:
    - 0x00: off
    - 0x01: L1
    - 0x02: L2
  command_code: 0x01

- id: headphone_status
  label: Headphone Status
  type: enum
  values:
    - 0x00: not connected
    - 0x01: connected
  command_code: 0x02

- id: audio_input_type
  label: Audio Input Type
  type: enum
  values:
    - 0x00: analog
    - 0x01: digital
    - 0x02: HDMI
  command_code: 0x0B

- id: volume
  label: Volume
  type: integer
  range: [0, 99]
  command_code: 0x0D

- id: mute_status
  label: Mute Status
  type: enum
  values:
    - 0x00: muted
    - 0x01: not muted
  command_code: 0x0E

- id: direct_mode
  label: Direct Mode
  type: boolean
  command_code: 0x0F

- id: decode_mode_2ch
  label: 2-Channel Decode Mode
  type: enum
  values:
    - 0x01: Stereo
    - 0x04: Dolby Surround
    - 0x07: Neo:6 Cinema
    - 0x08: Neo:6 Music
    - 0x09: 5/7 Ch Stereo
    - 0x0A: DTS Neural:X
    - 0x0C: DTS Virtual:X
    - 0x0D: Dolby Virtual Height
    - 0x0E: Auro Native
    - 0x0F: Auro-Matic 3D
    - 0x10: Auro-2D
  command_code: 0x10

- id: decode_mode_mch
  label: Multi-Channel Decode Mode
  type: enum
  values:
    - 0x01: Stereo down-mix
    - 0x02: Multi-channel
    - 0x03: DTS Neural:X
    - 0x06: Dolby Surround
    - 0x0C: DTS Virtual:X
    - 0x0D: Dolby Virtual Height
    - 0x0E: Auro Native
    - 0x0F: Auro-Matic 3D
    - 0x10: Auro-2D
  command_code: 0x11

- id: imax_enhanced
  label: IMAX Enhanced
  type: enum
  values:
    - 0x00: Off
    - 0x01: On
    - 0x02: Auto
  command_code: 0x0C

- id: current_source
  label: Current Source
  type: enum
  values:
    - 0x00: Follow Zone 1
    - 0x01: CD
    - 0x02: BD
    - 0x03: AV
    - 0x04: SAT
    - 0x05: PVR
    - 0x06: UHD
    - 0x08: AUX
    - 0x09: DISPLAY
    - 0x0B: TUNER FM
    - 0x0C: TUNER DAB
    - 0x0E: NET
    - 0x10: STB
    - 0x11: GAME
    - 0x12: BT
  command_code: 0x1D

- id: network_playback_status
  label: Network Playback Status
  type: enum
  values:
    - 0x00: Stopped
    - 0x01: Transitioning
    - 0x02: Playing
    - 0x03: Paused
  command_code: 0x1C

- id: bluetooth_status
  label: Bluetooth Status
  type: enum
  values:
    - 0x00: No connection
    - 0x01: Connected, audio paused
    - 0x02: Connected, playing SBC
    - 0x03: Connected, playing AAC
    - 0x04: Connected, playing aptX
    - 0x05: Connected, playing aptX-HD
  command_code: 0x50

- id: video_output_resolution
  label: Video Output Resolution
  type: enum
  values:
    - 0x07: Bypass
  command_code: 0x13

- id: incoming_audio_format
  label: Incoming Audio Format
  type: enum
  values:
    - 0x00: PCM
    - 0x01: Analog Direct
    - 0x02: Dolby Digital
    - 0x03: Dolby Digital EX
    - 0x04: Dolby Digital Surround
    - 0x05: Dolby Digital Plus
    - 0x06: Dolby Digital True HD
    - 0x07: DTS
    - 0x08: DTS 96/24
    - 0x09: DTS ES Matrix
    - 0x0A: DTS ES Discrete
    - 0x0B: DTS ES Matrix 96/24
    - 0x0C: DTS ES Discrete 96/24
    - 0x0D: DTS HD Master Audio
    - 0x0E: DTS HD High Res Audio
    - 0x0F: DTS Low Bit Rate
    - 0x10: DTS Core
    - 0x13: PCM Zero
    - 0x14: Unsupported
    - 0x15: Undetected
    - 0x16: Dolby Atmos
    - 0x17: DTS:X
    - 0x18: IMAX ENHANCED
    - 0x19: Auro 3D
  command_code: 0x43

- id: incoming_audio_sample_rate
  label: Incoming Audio Sample Rate
  type: enum
  values:
    - 0x00: 32 KHz
    - 0x01: 44.1 KHz
    - 0x02: 48 KHz
    - 0x03: 88.2 KHz
    - 0x04: 96 KHz
    - 0x05: 176.4 KHz
    - 0x06: 192 KHz
    - 0x07: Unknown
    - 0x08: Undetected
  command_code: 0x44

- id: treble_eq
  label: Treble EQ
  type: integer
  range: [-12, 12]
  description: 0x00-0x0C = 0 to +12dB, 0x81-0x8C = -1 to -12dB
  command_code: 0x35

- id: bass_eq
  label: Bass EQ
  type: integer
  range: [-12, 12]
  description: 0x00-0x0C = 0 to +12dB, 0x81-0x8C = -1 to -12dB
  command_code: 0x36

- id: balance
  label: Balance
  type: integer
  range: [-6, 6]
  description: 0x00-0x06 = 0 to +6, 0x81-0x86 = -1 to -6
  command_code: 0x3B

- id: subwoofer_trim
  label: Subwoofer Trim
  type: number
  range: [-10, 10]
  unit: dB
  description: 0.5dB steps
  command_code: 0x3F

- id: room_eq
  label: Room EQ
  type: enum
  values:
    - 0x00: Off
    - 0x01: EQ1
    - 0x02: EQ2
    - 0x03: EQ3
    - 0x04: Not calculated
  command_code: 0x37

- id: dolby_audio_mode
  label: Dolby Audio Mode
  type: enum
  values:
    - 0x00: Off
    - 0x01: Movie
    - 0x02: Music
    - 0x03: Night
  command_code: 0x38

- id: lipsync_delay
  label: Lipsync Delay
  type: integer
  range: [0, 160]
  unit: ms
  description: 5ms steps
  command_code: 0x40

- id: compression
  label: Compression
  type: enum
  values:
    - 0x00: Off
    - 0x01: Medium
    - 0x02: High
  command_code: 0x41

- id: menu_status
  label: Menu Status
  type: enum
  values:
    - 0x00: No menu open
    - 0x02: Setup Menu
    - 0x03: Trim Menu
    - 0x04: Bass Menu
    - 0x05: Treble Menu
    - 0x06: Sync Menu
    - 0x07: Sub Menu
    - 0x08: Tuner Menu
    - 0x09: Network menu
    - 0x0A: USB Menu
  command_code: 0x14

- id: zone1_osd
  label: Zone 1 OSD State
  type: enum
  values:
    - 0x00: On
    - 0x01: Off
  command_code: 0x4E

- id: hdmi_output
  label: HDMI Output Selection
  type: enum
  values:
    - 0x02: HDMI Output 1
    - 0x03: HDMI Output 2
    - 0x04: HDMI Output 1 & 2
  command_code: 0x4F
```

## Variables
```yaml
# UNRESOLVED: most parameters are settable via commands but reported back through same command codes.
# Variables exposed via command 0x29 (General Setup) and 0x28 (Input Config) are numerous
# and include: audio format, sample rate, bitrate, video resolution, aspect ratio, color space,
# balance, bass, treble, room EQ, Dolby Audio mode, IMAX Enhanced, subwoofer trim,
# lipsync delay, compression, maximum volume, power on option, language, and more.
# Full variable enumeration requires parsing the multi-byte responses documented in the source.
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited status updates when state changes via front panel or IR.
# The document states "Any change resulting from these inputs is relayed to the RC using the
# appropriate message type" but no explicit event message format or subscription mechanism is documented.
# Events follow the same response format as command responses with appropriate answer codes.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for:
  - command: restore_factory_defaults
    reason: Requires confirmation pattern 0xAA 0xAA to prevent accidental restore
  - command: secure_backup_restore
    reason: Requires 4-digit PIN to restore secure backup
  - command: reboot
    reason: Requires "REBOOT" string confirmation
interlocks:
  - Certain commands (e.g., tuner control 0x16) return error 0x85 when the relevant input is not selected
  - Commands cannot be processed while Setup Menu is displayed (error 0x85)
# UNRESOLVED: no explicit safety warnings or interlock procedures for power sequencing
```

## Notes
**Protocol packet format:** All commands and responses use binary format: `<St=0x21> <Zn> <Cc> <Dl> <Data> <Et=0x0D>`. Responses include an Answer Code (Ac) field.

**Zone numbering:** Zone 0x01 = Zone 1 (master), Zone 0x02 = Zone 2.

**Answer codes:** 0x00=OK, 0x82=Zone Invalid, 0x83=Cmd Not Recognised, 0x84=Param Not Recognised, 0x85=Cmd Invalid At This Time, 0x86=Invalid Data Length.

**IP control:** Port 50000 stated in source for IP control. AMX DDDP and Control4 SDDP discovery protocols supported.

**Serial config:** 38,400 bps, 8N1, null-modem cable required.

**RC5 simulation:** The Simulate RC5 IR Command (0x08) allows emulating any IR remote command over the control link, enabling control of functions not explicitly defined as system commands (including power on/off).

**Response timing:** AV responds to commands within 3 seconds.
<!-- UNRESOLVED: complete list of RC5 advanced function codes not fully enumerated as system commands -->
<!-- UNRESOLVED: Dante configuration details not documented in this protocol spec -->
<!-- UNRESOLVED: specific error recovery behavior for fault conditions not documented -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: jbl_synthesis_sd_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:52:00.851Z
retrieved_at: 2026-04-25T20:52:00.851Z
last_checked_at: 2026-04-25T20:52:00.851Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:52:00.851Z
matched_actions: 64
action_count: 64
confidence: high
summary: "All 64 spec actions matched literally to source command codes; transport parameters verified verbatim; command catalogue fully represented."
```

## Known Gaps

```yaml
[]
```
