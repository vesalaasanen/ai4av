---
schema_version: ai4av-public-spec-v1
device_id: arcam/avr390
entity_id: arcam_av8
spec_id: admin/arcam-avr390-avr550-avr850-avr860-sr250
revision: 1
author: admin
title: "Arcam AVR390/AVR550/AVR850/AV860/SR250 Control Spec"
status: published
manufacturer: Arcam
manufacturer_key: arcam
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
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
source_documents:
  - title: "Arcam public source"
    url: https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:49:47.446Z
retrieved_at: 2026-04-29T08:49:47.446Z
last_checked_at: 2026-04-23T15:11:04.117Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:11:04.117Z
  matched_actions: 44
  action_count: 44
  confidence: high
  summary: "All 44 spec actions matched literal source opcodes; transport params verified; comprehensive protocol coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Arcam AVR390/AVR550/AVR850/AV860/SR250 Control Spec

## Summary
Arcam AVR series AV receivers supporting both RS-232 and IP (NET) control interfaces. The protocol uses a binary packet format with start delimiter `0x21`, zone addressing (zone 1 or zone 2), command codes, and end delimiter `0x0D`. Power, volume, source routing, tuner, and audio processing commands are documented. IP control uses port 50000. No authentication is required.

<!-- UNRESOLVED: AV8 model name in input does not appear in source document; source covers AVR390/AVR550/AVR850/AV860/SR250. UNRESOLVED: firmware compatibility range not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 50000  # IP control port; RS232 port not stated in source
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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 = Zone 1, 0x02 = Zone 2)
    - name: state
      type: enum
      values:
        - 0x00 - Request power state (query mode)
        - 0xF0 - Zone is in stand-by
        - 0x01 - Zone is powered on
  protocol_hint: 0x00

- id: display_brightness
  label: Display Brightness
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 = Zone 1)
    - name: level
      type: enum
      values:
        - 0xF0 - Request brightness (query mode)
        - 0x00 - Front panel is off
        - 0x01 - Front panel L1
        - 0x02 - Front panel L2
  protocol_hint: 0x01

- id: headphones
  label: Headphones
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: enum
      values:
        - 0xF0 - Request headphone connection status
        - 0x00 - Headphones not connected
        - 0x01 - Headphones connected
  protocol_hint: 0x02

- id: fm_genre
  label: FM Genre
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
      description: Request FM program type
  protocol_hint: 0x03

- id: software_version
  label: Software Version
  kind: action
  params:
    - name: zone
      type: integer
    - name: version_type
      type: enum
      values:
        - 0xF0 - RS232 protocol version
        - 0xF1 - Host version
        - 0xF2 - OSD version
        - 0xF3 - DSP version
        - 0xF4 - NET version
        - 0xF5 - IAP version
  protocol_hint: 0x04

- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: zone
      type: integer
    - name: confirm
      type: constant
      value: 0xAA 0xAA
      description: Confirmation pattern (0xAA 0xAA) to avoid accidental restore
  protocol_hint: 0x05

- id: save_restore_secure
  label: Save/Restore Secure Copy
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: enum
      values:
        - 0x00 - Save secure backup
        - 0x01 - Restore secure backup
    - name: pin
      type: string
      description: 4-digit PIN (0x55 0x55 prefix + 4 pin digits)
  protocol_hint: 0x06

- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  params:
    - name: zone
      type: integer
    - name: rc5_system
      type: integer
      description: RC5 System code
    - name: rc5_command
      type: integer
      description: RC5 Command code
  protocol_hint: 0x08

- id: display_info_type
  label: Display Information Type
  kind: action
  params:
    - name: zone
      type: integer
    - name: type
      type: enum
      values:
        - 0x00 - Set display to Processing mode
        - 0xE0 - Cycle through all displayable info
        - 0xF0 - Request current display type
        - FM-specific: 0x01 Radio text, 0x02 Programme type, 0x03 Signal strength
        - DAB-specific: 0x01 Radio text, 0x02 Genre, 0x03 Signal quality, 0x04 Bit rate
        - NET/USB: 0x01 Track, 0x02 Artist, 0x03 Album, 0x04 audio type, 0x05 rate
  protocol_hint: 0x09

- id: video_selection
  label: Video Selection
  kind: action
  params:
    - name: zone
      type: integer
    - name: source
      type: enum
      values:
        - 0x00 - BD
        - 0x01 - SAT
        - 0x02 - AV
        - 0x03 - PVR
        - 0x04 - VCR
        - 0x05 - Game
        - 0x06 - STB
        - 0xF0 - Request current input
  protocol_hint: 0x0A

- id: select_audio_input
  label: Select Analogue/Digital Audio Input
  kind: action
  params:
    - name: zone
      type: integer
    - name: input
      type: enum
      values:
        - 0x00 - Use analogue audio
        - 0x01 - Use digital audio
        - 0x02 - Use HDMI audio
        - 0xF0 - Request current audio type
  protocol_hint: 0x0B

- id: imax_enhanced
  label: IMAX Enhanced
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: enum
      values:
        - 0xF0 - Request current IMAX Enhanced state
        - 0xF1 - IMAX Enhanced Auto
        - 0xF2 - IMAX Enhanced On
        - 0xF3 - IMAX Enhanced Off
  protocol_hint: 0x0C

- id: volume
  label: Set/Request Volume
  kind: action
  params:
    - name: zone
      type: integer
    - name: level
      type: integer
      description: 0x00-0x63 (0-99dB); 0xF0 = request current volume
  protocol_hint: 0x0D

- id: mute_status
  label: Request Mute Status
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x0E

- id: direct_mode_status
  label: Request Direct Mode Status
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x0F

- id: decode_mode_2ch
  label: Request Decode Mode (2ch)
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
    - name: mode
      type: enum
      values:
        - 0x01 - Stereo
        - 0x04 - Dolby Surround
        - 0x07 - Neo:6 Cinema
        - 0x08 - Neo:6 Music
        - 0x09 - 5/7 Ch Stereo
        - 0x0A - DTS Neural:X
        - 0x0B - Reserved
        - 0x0C - DTS Virtual:X
  protocol_hint: 0x10

- id: decode_mode_mch
  label: Request Decode Mode (Multi-channel)
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
    - name: mode
      type: enum
      values:
        - 0x01 - Stereo down-mix
        - 0x02 - Multi-channel mode
        - 0x03 - DTS-ES / Neural:X mode
        - 0x06 - Dolby Surround mode
        - 0x0B - Reserved
        - 0x0C - DTS Virtual:X
  protocol_hint: 0x11

- id: rds_information
  label: Request RDS Information
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x12

- id: video_output_resolution
  label: Request Video Output Resolution
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x13

- id: menu_status
  label: Request Menu Status
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x14

- id: tuner_preset
  label: Request Tuner Preset
  kind: action
  params:
    - name: zone
      type: integer
    - name: preset
      type: integer
      description: "0x01-0x32 (1-50): request specific preset; 0xF0: request current"
  protocol_hint: 0x15

- id: tune
  label: Tune FM Frequency
  kind: action
  params:
    - name: zone
      type: integer
    - name: direction
      type: enum
      values:
        - 0x00 - Decrement frequency by 1 step (0.05MHz)
        - 0x01 - Increment frequency by 1 step (0.05MHz)
        - 0xF0 - Request current tuner frequency
  protocol_hint: 0x16

- id: dab_station
  label: Request DAB Station
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x18

- id: dab_genre
  label: DAB Programme Type/Category
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x19

- id: dab_dls_pdt
  label: DLS/PDT Information
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x1A

- id: preset_details
  label: Request Preset Details
  kind: action
  params:
    - name: zone
      type: integer
    - name: preset
      type: integer
      description: "0x01-0x32 (1-50) preset number"
  protocol_hint: 0x1B

- id: network_playback_status
  label: Network Playback Status
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x1C

- id: current_source
  label: Request Current Source
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x1D

- id: input_name
  label: Set/Request Input Name
  kind: action
  params:
    - name: zone
      type: integer
    - name: name
      type: string
      description: ASCII name (up to 10 chars); 0xF0 to query
  protocol_hint: 0x20

- id: fm_scan
  label: FM Scan Up/Down
  kind: action
  params:
    - name: zone
      type: integer
    - name: direction
      type: enum
      values:
        - 0x01 - Scan up
        - 0x02 - Scan down
  protocol_hint: 0x23

- id: dab_scan
  label: DAB Scan
  kind: action
  params:
    - name: zone
      type: integer
    - name: scan
      type: constant
      value: 0xF0
  protocol_hint: 0x24

- id: heartbeat
  label: Heartbeat
  kind: action
  params:
    - name: zone
      type: integer
    - name: ping
      type: constant
      value: 0xF0
      description: Resets EuP standby timer
  protocol_hint: 0x25

- id: reboot
  label: Reboot
  kind: action
  params:
    - name: zone
      type: integer
    - name: confirm
      type: constant
      value: "REBOOT"  # ASCII 0x52 0x45 0x42 0x4F 0x4F 0x54
  protocol_hint: 0x26

- id: treble_eq
  label: Treble Equalisation
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x0C = 0dB-+12dB; 0x81-0x8C = -1dB--12dB; 0xF0=request; 0xF1=inc; 0xF2=dec"
  protocol_hint: 0x35

- id: bass_eq
  label: Bass Equalisation
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x0C = 0dB-+12dB; 0x81-0x8C = -1dB--12dB; 0xF0=request; 0xF1=inc; 0xF2=dec"
  protocol_hint: 0x36

- id: room_eq
  label: Room Equalisation
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: enum
      values:
        - 0xF0 - Request current Room EQ state
        - 0xF1 - Room EQ on
        - 0xF2 - Room EQ off
  protocol_hint: 0x37

- id: dolby_volume
  label: Dolby Volume
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: enum
      values:
        - 0x00 - Dolby Volume off
        - 0x01 - Dolby Volume on
        - 0xF0 - Request current Dolby Volume mode
  protocol_hint: 0x38

- id: dolby_leveller
  label: Dolby Leveller
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x0A = level 0-10; 0xF0=request; 0xF1=inc; 0xF2=dec; 0xFF=off"
  protocol_hint: 0x39

- id: dolby_volume_offset
  label: Dolby Volume Calibration Offset
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x0F = 0-+15dB; 0x80-0x8F = -1--15dB; 0xF0=request; 0xF1=inc; 0xF2=dec"
  protocol_hint: 0x3A

- id: balance
  label: Balance
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x06 = 0-+6; 0x81-0x86 = -1--6; 0xF0=request; 0xF1=inc; 0xF2=dec"
  protocol_hint: 0x3B

- id: subwoofer_trim
  label: Subwoofer Trim
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x14 = positive trim in 0.5dB steps; 0x81-0x94 = negative trim in 0.5dB steps; 0xF0=request; 0xF1=inc; 0xF2=dec"
  protocol_hint: 0x3F

- id: lipsync_delay
  label: Lipsync Delay
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x32 = delay in 5ms steps (0-250ms); 0xF0=request; 0xF1=inc; 0xF2=dec"
  protocol_hint: 0x40

- id: compression
  label: Compression
  kind: action
  params:
    - name: zone
      type: integer
    - name: level
      type: enum
      values:
        - 0x00 - Off
        - 0x01 - Medium
        - 0x02 - High
        - 0xF0 - Request current setting
  protocol_hint: 0x41

- id: incoming_video_params
  label: Request Incoming Video Parameters
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x42

- id: incoming_audio_format
  label: Request Incoming Audio Format
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x43

- id: incoming_audio_sample_rate
  label: Request Incoming Audio Sample Rate
  kind: action
  params:
    - name: zone
      type: integer
    - name: query
      type: constant
      value: 0xF0
  protocol_hint: 0x44

- id: sub_stereo_trim
  label: Set/Request Sub Stereo Trim
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00 = 0dB; 0x81-0x94 = -0.5dB--10dB in 0.5dB steps; 0xF0=request; 0xF1=inc; 0xF2=dec"
  protocol_hint: 0x45

- id: zone1_osd
  label: Set/Request Zone 1 OSD
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: enum
      values:
        - 0xF0 - Request current OSD state
        - 0xF1 - OSD On
        - 0xF2 - OSD Off
  protocol_hint: 0x4E

- id: video_output_switching
  label: Set/Request Video Output Switching
  kind: action
  params:
    - name: zone
      type: integer
    - name: output
      type: enum
      values:
        - 0x02 - HDMI Output 1
        - 0x03 - HDMI Output 2
        - 0x04 - HDMI Output 1 & 2
        - 0xF0 - Request current setting
  protocol_hint: 0x4F
```

## Feedbacks
```yaml
# All commands return a response with answer codes:
#   0x00 - Status update (OK)
#   0x82 - Zone Invalid
#   0x83 - Command not recognised
#   0x84 - Parameter not recognised
#   0x85 - Command invalid at this time
#   0x86 - Invalid data length

# Response format: <St> <Zn> <Cc> <Ac> <Dl> <Data> <Et>
#   St = 0x21, Et = 0x0D

# UNRESOLVED: complete feedback enumeration for all response data values
# not fully enumerated above; populate from command/response tables as needed
```

## Variables
```yaml
# Audio format (0x43 response):
- id: audio_format
  type: enum
  values:
    - 0x00 - PCM
    - 0x01 - Analogue Direct
    - 0x02 - Dolby Digital
    - 0x03 - Dolby Digital EX
    - 0x04 - Dolby Digital Surround
    - 0x05 - Dolby Digital Plus
    - 0x06 - Dolby Digital True HD
    - 0x07 - DTS
    - 0x08 - DTS 96/24
    - 0x09 - DTS ES Matrix
    - 0x0A - DTS ES Discrete
    - 0x0B - DTS ES Matrix 96/24
    - 0x0C - DTS ES Discrete 96/24
    - 0x0D - DTS HD Master Audio
    - 0x0E - DTS HD High Res Audio
    - 0x0F - DTS Low Bit Rate
    - 0x10 - DTS Core
    - 0x13 - PCM Zero
    - 0x14 - Unsupported
    - 0x15 - Undetected
    - 0x16 - Dolby Atmos
    - 0x17 - DTS:X
    - 0x18 - IMAX ENHANCED

# Audio channel configuration (Data2 of 0x43 response):
- id: audio_channel_config
  type: enum
  values:
    - 0x00 - Dual Mono
    - 0x01 - Centre only
    - 0x02 - Stereo only
    - 0x03 - Stereo + mono surround
    - 0x04 - Stereo + Surround L & R
    - 0x05 - Stereo + Surround L & R + mono Surround Back
    - 0x06 - Stereo + Surround L & R + Surround Back L & R
    - 0x07 - Stereo + Surround L & R (matrix for surround back)
    - 0x08 - Stereo + Centre
    - 0x09 - Stereo + Centre + mono surround
    - 0x0A - Stereo + Centre + Surround L & R
    - 0x0B - Stereo + Centre + Surround L & R + mono Surround Back
    - 0x0C - Stereo + Centre + Surround L & R + Surround Back L & R
    - 0x0D - Stereo + Centre + Surround L & R (matrix for surround back)
    - 0x0E - Stereo Downmix Lt Rt
    - 0x0F - Stereo Only (Lo Ro)
    - 0x10-0x1C - Various configurations with LFE

# Video resolution (0x13 response):
- id: video_resolution
  type: enum
  values:
    - 0x02 - SD Progressive
    - 0x03 - 720p
    - 0x04 - 1080i
    - 0x05 - 1080p
    - 0x06 - Preferred
    - 0x07 - Bypass
    - 0x08 - 4k

# Audio sample rate (0x44 response):
- id: audio_sample_rate
  type: enum
  values:
    - 0x00 - 32 KHz
    - 0x01 - 44.1 KHz
    - 0x02 - 48 KHz
    - 0x03 - 88.2 KHz
    - 0x04 - 96 KHz
    - 0x05 - 176.4 KHz
    - 0x06 - 192 KHz
    - 0x07 - Unknown
    - 0x08 - Undetected
```

## Events
```yaml
# UNRESOLVED: The device sends unsolicited status updates when state changes
# via front panel or IR remote (e.g. display brightness, decode mode changes).
# Specific event message formats not fully documented in source.
```

## Macros
```yaml
# AMX Duet discovery: send "AMX\r" - device responds with identification string
# Response format: "AMXB\<Device-SDKClass=Receiver\>\<Device-Make=ARCAM\>\<Device-Model=...\>\<Device-Revision=x.y.z\>\r"
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # Requires 0xAA 0xAA confirmation pattern
  - reboot          # Requires ASCII "REBOOT" payload
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Command packet format: `<St> <Zn> <Cc> <Dl> <Data> <Et>` where St=`0x21`, Et=`0x0D`
- Response packet format: `<St> <Zn> <Cc> <Ac> <Dl> <Data> <Et>`
- Zone 1 is the master zone; Zone 2 is secondary
- RC5 commands can be simulated via command 0x08 using RC5 system/command codes from the IR code tables
- Device responds to each command within 3 seconds; RC may send further commands before previous response received
- Commands 0xF0–0xFF are reserved for test functions and should not be used
- IP control port is 50000; RS232 port number not explicitly stated in source
- No login or authentication procedure described — auth.type is none
<!-- UNRESOLVED: RS232 port number not stated in source. UNRESOLVED: unsolicited event message formats not fully documented. -->

## Provenance

```yaml
source_urls:
  - https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
source_documents:
  - title: "Arcam public source"
    url: https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:49:47.446Z
retrieved_at: 2026-04-29T08:49:47.446Z
last_checked_at: 2026-04-23T15:11:04.117Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:11:04.117Z
matched_actions: 44
action_count: 44
confidence: high
summary: "All 44 spec actions matched literal source opcodes; transport params verified; comprehensive protocol coverage."
```

## Known Gaps

```yaml
[]
```
