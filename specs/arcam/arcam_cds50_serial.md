---
spec_id: admin/arcam-avr-av860
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam AV Receiver Family Control Spec"
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
retrieved_at: 2026-06-01T21:56:18.005Z
last_checked_at: 2026-06-01T22:29:07.614Z
generated_at: 2026-06-01T22:29:07.614Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "this source document covers Arcam AVR/AV processor models (AVR390/550/850, AV860, SR250). The user-provided entity_id and device name refer to the Arcam CDS50 (a CD/SACD player), which is NOT covered by this document. The CDS50 may share a similar RS-232 protocol, but the source contains no evidence of CDS50 behaviour. The spec is therefore issued against the AV receiver family — the entity_id should be re-pointed at the correct family entity when ingested."
  - "the source does not define a separate \"asynchronous status"
  - "no multi-step sequences are described in the source."
  - "- Firmware compatibility: source does not state which protocol version each firmware release supports (the AMX response carries a placeholder x.y.z)."
verification:
  verdict: verified
  checked_at: 2026-06-01T22:29:07.614Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions have verbatim hex command codes confirmed in source; transport values 38400 bps, 8N1, port 50000 all supported; source has exactly 51 commands (50 binary + AMX). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Arcam AV Receiver Family Control Spec

## Summary
RS-232 / IP control protocol for the Arcam AVR390, AVR550, AVR850, AV860 and SR250 AV receivers. All commands share a fixed binary framing `0x21 Zn Cc Dl Data… 0x0D` at 38,400 bps, 8N1, no flow control. TCP/IP control is exposed on port 50000. An additional ASCII AMX Duet "AMX\r" command is supported for Dynamic Device Discovery.

<!-- UNRESOLVED: this source document covers Arcam AVR/AV processor models (AVR390/550/850, AV860, SR250). The user-provided entity_id and device name refer to the Arcam CDS50 (a CD/SACD player), which is NOT covered by this document. The CDS50 may share a similar RS-232 protocol, but the source contains no evidence of CDS50 behaviour. The spec is therefore issued against the AV receiver family — the entity_id should be re-pointed at the correct family entity when ingested. -->

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
  port: 50000  # TCP/IP control port (per source)
auth:
  type: none  # inferred: no login/password procedure described in source
```

Notes on transport: serial cable is a null modem (Tx/Rx crossed, signal ground only). RS-232 control must be enabled per-unit via front panel DIRECT button (4 s hold) or the OSD Control menu — disabled by default for minimum standby power. On the network, port 50000 is the IP control endpoint.

## Traits
```yaml
# - powerable       # zone power on/off via Simulate RC5 16-123 / 16-124 (Power On / Power Off)
# - routable        # input source / video source / HDMI output switching commands present
# - queryable       # many 0xF0 "request" codes return device state
# - levelable       # volume, mute, treble, bass, balance, sub trim, lipsync, room EQ, dolby vol, compression
# - zoned            # commands target Zone 0x01 (master) or Zone 0x02
```

## Actions
```yaml
# Protocol frame (every command below follows this template):
#   0x21 {Zn} {Cc} {Dl} {Data1} [Data2 …] 0x0D
#   St  = 0x21, Et = 0x0D
#   Zn  = 0x01 (master) | 0x02 (zone 2) - zone number 1 is the master zone
#   Cc  = command code (hex)
#   Dl  = number of data bytes that follow (excluding Et)
#   Data = command payload (see per-action description)
# Response frame: 0x21 Zn Cc Ac Dl Data… 0x0D where Ac is the answer code
#   0x00 = Status update / accepted
#   0x82 = Zone Invalid
#   0x83 = Command not recognised
#   0x84 = Parameter not recognised
#   0x85 = Command invalid at this time
#   0x86 = Invalid data length
#
# Note: commands 0xF0 to 0xFF are reserved for test functions and must not be used.

# --- AMX Duet Dynamic Device Discovery (ASCII) --------------------------------
- id: amx_duet_discovery
  label: AMX Duet Discovery
  kind: query
  command: 'AMX\r'  # ASCII text, carriage return terminated
  params: []
  notes: >
    ASCII command, not the binary frame. Each model returns its own AMXB
    descriptor (ASCII, carriage-return terminated). x.y.z = RS-232 protocol
    version number.
    AV860   : "AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=AV860><Device-Revision=x.y.z>\r"
    AVR850  : "AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=AVR850><Device-Revision=x.y.z>\r"
    AVR550  : "AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=AVR550><Device-Revision=x.y.z>\r"
    AVR390  : "AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=AVR390><Device-Revision=x.y.z>\r"
    SR250   : "AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=SR250><Device-Revision=x.y.z>\r"

# --- System commands ---------------------------------------------------------
- id: cmd_0x00_power_query
  label: Power (request standby state)
  kind: query
  command: '0x21 {Zn} 0x00 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number (0x01 master, 0x02 zone 2)
  notes: Response Data1: 0x00 = zone is in standby; 0x01 = zone is powered on.

- id: cmd_0x01_display_brightness
  label: Display Brightness
  kind: action
  command: '0x21 {Zn} 0x01 0x01 {Data1} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: Data1
      type: enum
      values: [0x00, 0x01, 0x02, 0xF0]
      description: 0x00 = Front panel off; 0x01 = Front panel L1; 0x02 = Front panel L2; 0xF0 = Request current brightness
  notes: Source example uses Zn=0x01 with Data1=0xF0 (request); echoed in response.

- id: cmd_0x02_headphones
  label: Headphones Connection Status
  kind: query
  command: '0x21 {Zn} 0x02 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: Response Data1: 0x00 = headphones not connected; 0x01 = headphones connected.

- id: cmd_0x03_fm_genre
  label: FM Programme Type (Genre)
  kind: query
  command: '0x21 {Zn} 0x03 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: >
    Response: Data1..Data<n> = the radio programme type in ASCII characters.
    Returns answer code 0x85 if FM is not selected on the indicated zone.

- id: cmd_0x04_software_version
  label: Software Version
  kind: query
  command: '0x21 {Zn} 0x04 0x01 {component} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: component
      type: enum
      values: [0xF0, 0xF1, 0xF2, 0xF3, 0xF4, 0xF5]
      description: 0xF0 = RS-232 version; 0xF1 = Host; 0xF2 = OSD; 0xF3 = DSP; 0xF4 = NET; 0xF5 = IAP
  notes: Response Dl=0x03, Data1 = echo of component byte, Data2 = major, Data3 = minor version.

- id: cmd_0x05_restore_factory_default
  label: Restore Factory Default Settings
  kind: action
  command: '0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D'
  params: []
  notes: >
    Forces a factory reset. The 0xAA 0xAA confirmation pattern is required to
    avoid an accidental restore. Zn is fixed at 0x01 in the source example.
    Response: 0x21 0x01 0x05 0x00 0x00 0x0D.

- id: cmd_0x06_save_restore_secure_copy
  label: Save/Restore Secure Copy of Settings
  kind: action
  command: '0x21 0x01 0x06 0x07 {op} 0x55 0x55 {pin1} {pin2} {pin3} {pin4} 0x0D'
  params:
    - name: op
      type: enum
      values: [0x00, 0x01]
      description: 0x00 = Save secure backup; 0x01 = Restore secure backup
    - name: pin1
      type: integer
      description: PIN digit 1
    - name: pin2
      type: integer
      description: PIN digit 2
    - name: pin3
      type: integer
      description: PIN digit 3
    - name: pin4
      type: integer
      description: PIN digit 4
  notes: >
    Zn fixed at 0x01. 0x55 0x55 confirmation pattern must follow Data1. Source
    response frame is 0x21 0x01 0x06 0x00 0x00 0x0D (Dl=0x00, no payload).
    Behavioural rules from source: (a) restore returns 0x85 if no secure
    backup exists; (b) if a save is in progress and another save is requested
    the second save fails silently; (c) if command 0x1E is currently being
    processed this command fails with 0x85. Command 0x1E is referenced but
    not defined in this source.

- id: cmd_0x08_simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  command: '0x21 {Zn} 0x08 0x02 {system} {command} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: system
      type: hex
      description: RC5 system code (e.g. 0x10 for AV device, 0x17 for Zone 2 device)
    - name: command
      type: hex
      description: RC5 command code (see Notes for full table)
  notes: >
    An additional status message is sent in most cases as a result of the IR
    command. Response echoes system + command. See "AV RC5 command codes" in
    Notes for the full list of system/command pairs the unit recognises.

- id: cmd_0x09_display_information_type
  label: Display Information Type
  kind: action
  command: '0x21 {Zn} 0x09 0x01 {mode} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: mode
      type: integer
      description: >
        For all sources: 0x00 = Processing mode; 0xE0 = Cycle all displayable
        info; 0xF0 = Request current display type. FM: 0x01 Radio text, 0x02
        Programme type, 0x03 Signal strength. DAB (AVR450/750 only): 0x01
        Radio text, 0x02 Genre, 0x03 Signal quality, 0x04 Bit rate. NET/USB:
        0x01 Track, 0x02 Artist, 0x03 Album, 0x04 audio type, 0x05 rate.
  notes: The response echoes the data sent.

- id: cmd_0x1D_request_current_source
  label: Request Current Source
  kind: query
  command: '0x21 {Zn} 0x1D 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: >
    Response Data1 = current source: 0x00 Follow Z1, 0x01 CD, 0x02 BD, 0x03 AV,
    0x04 SAT, 0x05 PVR, 0x06 VCR, 0x08 AUX, 0x09 DISPLAY, 0x0B TUNER (FM),
    0x0C TUNER (DAB, AVR450/750 only), 0x0E NET, 0x0F USB, 0x10 STB, 0x11 GAME.

- id: cmd_0x1F_headphone_override
  label: Headphone Over-ride (mute relays)
  kind: action
  command: '0x21 {Zn} 0x1F 0x01 {state} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: state
      type: enum
      values: [0x00, 0x01]
      description: 0x00 = Clear (speakers muted if headphones present); 0x01 = Set (speakers unmuted if headphones present)
  notes: Activates/deactivates the mute relays; does not zero the volume.

# --- Input commands ----------------------------------------------------------
- id: cmd_0x0A_video_selection
  label: Video Selection
  kind: action
  command: '0x21 0x01 0x0A 0x01 {source} 0x0D'
  params:
    - name: source
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0xF0]
      description: 0x00 BD, 0x01 SAT, 0x02 AV, 0x03 PVR, 0x04 VCR, 0x05 Game, 0x06 STB, 0xF0 Request current input
  notes: Zn is fixed at 0x01 in the source. Returns 0x85 if OSD is showing the setup screen.

- id: cmd_0x0B_audio_input_type
  label: Select Analogue/Digital/HDMI Audio Input
  kind: action
  command: '0x21 {Zn} 0x0B 0x01 {type} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: type
      type: enum
      values: [0x00, 0x01, 0x02, 0xF0]
      description: 0x00 Analogue, 0x01 Digital, 0x02 HDMI, 0xF0 Request audio type in use
  notes: Returns 0x85 if OSD is showing the setup screen.

# --- Output commands ---------------------------------------------------------
- id: cmd_0x0D_volume
  label: Set/Request Volume
  kind: action
  command: '0x21 {Zn} 0x0D 0x01 {volume} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: volume
      type: integer
      description: '0x00 (0) - 0x63 (99) to set volume; 0xF0 to request current volume. Volume is in dB; e.g. 0x2A = 42 dB.'
  notes: Returns the volume even if the zone is muted (use 0x0E for mute).

- id: cmd_0x0E_mute_status
  label: Request Mute Status
  kind: query
  command: '0x21 {Zn} 0x0E 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: Response Data1: 0x00 = muted; 0x01 = not muted.

- id: cmd_0x0F_direct_mode_status
  label: Request Direct Mode Status (Z1)
  kind: query
  command: '0x21 0x01 0x0F 0x01 0xF0 0x0D'
  params: []
  notes: Response Data1: 0x00 = Direct off; 0x01 = Direct on.

- id: cmd_0x10_decode_mode_2ch
  label: Request Decode Mode Status - 2ch (Z1)
  kind: query
  command: '0x21 0x01 0x10 0x01 0xF0 0x0D'
  params: []
  notes: >
    Response Data1: 0x01 Stereo, 0x04 Dolby Surround, 0x07 Neo:6 Cinema,
    0x08 Neo:6 Music, 0x09 5/7 Ch Stereo, 0x0A DTS Neural:X, 0x0B Reserved,
    0x0C DTS Virtual:X.

- id: cmd_0x11_decode_mode_mch
  label: Request Decode Mode Status - MCH (Z1)
  kind: query
  command: '0x21 0x01 0x11 0x01 0xF0 0x0D'
  params: []
  notes: >
    Response Data1: 0x01 Stereo down-mix, 0x02 Multi-channel, 0x03 DTS-ES /
    Neural:X, 0x06 Dolby Surround, 0x0B Reserved, 0x0C DTS Virtual:X.

- id: cmd_0x12_rds_info
  label: Request RDS Information
  kind: query
  command: '0x21 {Zn} 0x12 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: >
    Response: Data1..Data<n> = the radio programme type in ASCII.
    Returns 0x85 if FM is not selected on the given zone.

- id: cmd_0x13_video_output_resolution
  label: Request Video Output Resolution (Z1)
  kind: query
  command: '0x21 0x01 0x13 0x01 0xF0 0x0D'
  params: []
  notes: >
    Response Data1: 0x02 SD Progressive, 0x03 720p, 0x04 1080i, 0x05 1080p,
    0x06 Preferred, 0x07 Bypass, 0x08 4k.

- id: cmd_0x0C_imax_enhanced
  label: IMAX Enhanced
  kind: action
  command: '0x21 {Zn} 0x0C 0x01 {mode} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: mode
      type: enum
      values: [0xF0, 0xF1, 0xF2, 0xF3]
      description: 0xF0 Request current state; 0xF1 IMAX Auto; 0xF2 IMAX On; 0xF3 IMAX Off
  notes: Response Data1: 0x00 Off, 0x01 On, 0x02 Auto.

# --- Menu commands -----------------------------------------------------------
- id: cmd_0x14_menu_status
  label: Request Menu Status (Z1)
  kind: query
  command: '0x21 0x01 0x14 0x01 0xF0 0x0D'
  params: []
  notes: >
    Response Data1: 0x00 No menu, 0x02 Set-up, 0x03 Trim, 0x04 Bass, 0x05
    Treble, 0x06 Sync, 0x07 Sub, 0x08 Tuner, 0x09 Network, 0x0A USB.

- id: cmd_0x15_tuner_preset
  label: Request/Set Tuner Preset
  kind: action
  command: '0x21 {Zn} 0x15 0x01 {preset} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: preset
      type: integer
      description: '0x01-0x32 (1-50) preset number to select; 0xF0 to request current preset'
  notes: >
    Response Data1: 0xFF = no preset selected; 0x01-0x32 = current preset.
    Returns 0x85 if tuner is not selected on the given zone.

- id: cmd_0x16_tune
  label: Tune (FM step ±0.05 MHz)
  kind: action
  command: '0x21 {Zn} 0x16 0x01 {dir} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: dir
      type: enum
      values: [0x00, 0x01, 0xF0]
      description: 0x00 Decrement 1 step; 0x01 Increment 1 step; 0xF0 Request current frequency
  notes: >
    FM step is 0.05 MHz. Response Data1 = MHz, Data2 = 10's of kHz. Returned
    values may include bytes that are not printable ASCII. Returns 0x85 if
    tuner is not selected on the given zone.

- id: cmd_0x18_dab_station
  label: Request DAB Station
  kind: query
  command: '0x21 {Zn} 0x18 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: >
    Response: 16 ASCII bytes (the service label, space-padded to 16).
    Returns 0x85 if DAB is not selected on the given zone.

- id: cmd_0x19_programme_type
  label: DAB Programme Type/Category
  kind: query
  command: '0x21 {Zn} 0x19 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: >
    Response: 16 ASCII bytes (programme type, space-padded).
    Returns 0x85 if DAB is not selected on the given zone.

- id: cmd_0x1A_dls_pdt
  label: DLS/PDT Info (DAB Radio Text)
  kind: query
  command: '0x21 {Zn} 0x1A 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: >
    Response: Dl=0x80 (128 bytes), Data1..Data128 = 128 ASCII bytes
    (dynamic label / programme-associated data, space-padded to 0x20).
    Returns 0x85 if DAB is not selected on the given zone.

- id: cmd_0x1B_preset_details
  label: Request Preset Details
  kind: query
  command: '0x21 {Zn} 0x1B 0x01 {preset} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: preset
      type: integer
      description: '0x01-0x32 (1-50) the preset number to query'
  notes: >
    Response: Data1 = preset number echoed; Data2 = 0x01 FM frequency, 0x02
    FM RDS name, 0x03 DAB (AVR450/750 only); Data3/Data4 = FM frequency
    (MHz / 10's kHz); remaining = name in ASCII (DAB or FM with RDS).

- id: cmd_0x1C_network_playback_status
  label: Network Playback Status
  kind: query
  command: '0x21 {Zn} 0x1C 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: >
    Response Data1: 0x00 Navigating, 0x01 Playing, 0x02 Paused, 0xFF Busy/
    Not Playing. If navigating, Data2.. = folder name; if playing/paused,
    Data2.. = file name (ASCII). Returns 0x85 if network is not selected on
    the given zone.

# --- Setup adjustment commands ----------------------------------------------
- id: cmd_0x35_treble
  label: Treble Equalisation
  kind: action
  command: '0x21 {Zn} 0x35 0x01 {value} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: value
      type: integer
      description: '0x00-0x0C sets 0 dB to +12 dB; 0x81-0x8C sets -1 dB to -12 dB; 0xF0 Request; 0xF1 Increment 1 dB; 0xF2 Decrement 1 dB'
  notes: Response echoes the current treble value with the same encoding.

- id: cmd_0x36_bass
  label: Bass Equalisation
  kind: action
  command: '0x21 {Zn} 0x36 0x01 {value} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: value
      type: integer
      description: '0x00-0x0C sets 0 dB to +12 dB; 0x81-0x8C sets -1 dB to -12 dB; 0xF0 Request; 0xF1 Increment 1 dB; 0xF2 Decrement 1 dB'
  notes: Response echoes the current bass value with the same encoding.

- id: cmd_0x37_room_eq
  label: Room Equalisation
  kind: action
  command: '0x21 {Zn} 0x37 0x01 {state} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: state
      type: enum
      values: [0xF0, 0xF1, 0xF2]
      description: 0xF0 Request current; 0xF1 Room EQ on; 0xF2 Room EQ off
  notes: >
    Response Data1: 0x00 Off, 0x01 On, 0x02 Not calculated (therefore off).

- id: cmd_0x38_dolby_volume
  label: Dolby Volume
  kind: action
  command: '0x21 {Zn} 0x38 0x01 {state} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: state
      type: enum
      values: [0x00, 0x01, 0xF0]
      description: 0x00 Off; 0x01 On; 0xF0 Request current
  notes: Response Data1: 0x00 Off, 0x01 On.

- id: cmd_0x39_dolby_leveller
  label: Dolby Leveller
  kind: action
  command: '0x21 {Zn} 0x39 0x01 {value} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: value
      type: integer
      description: '0x00-0x0A sets 0-10; 0xF0 Request; 0xF1 Increment; 0xF2 Decrement; 0xFF Off'
  notes: Response Data1: 0x00-0x0A current level, 0xFF Off.

- id: cmd_0x3A_dolby_volume_calibration_offset
  label: Dolby Volume Calibration Offset
  kind: action
  command: '0x21 {Zn} 0x3A 0x01 {value} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: value
      type: integer
      description: '0x00-0x0F sets 0 to +15 dB; 0x80-0x8F sets -1 to -15 dB; 0xF0 Request; 0xF1 Increment 1 dB; 0xF2 Decrement 1 dB'
  notes: Response echoes the current offset.

- id: cmd_0x3B_balance
  label: Balance
  kind: action
  command: '0x21 {Zn} 0x3B 0x01 {value} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: value
      type: integer
      description: '0x00-0x06 sets 0 to +6; 0x81-0x86 sets -1 to -6; 0xF0 Request; 0xF1 Increment 1 dB; 0xF2 Decrement 1 dB'
  notes: Response echoes the current balance with the same encoding.

- id: cmd_0x3F_subwoofer_trim
  label: Subwoofer Trim
  kind: action
  command: '0x21 {Zn} 0x3F 0x01 {value} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: value
      type: integer
      description: '0x00-0x14 positive trim in 0.5 dB steps (e.g. 0x02 = +1.0 dB); 0x81-0x94 negative trim in 0.5 dB steps (e.g. 0x82 = -1.0 dB); 0xF0 Request; 0xF1 Increment 0.5 dB; 0xF2 Decrement 0.5 dB'
  notes: Response echoes the current subwoofer trim with the same encoding.

- id: cmd_0x40_lipsync_delay
  label: Lipsync Delay
  kind: action
  command: '0x21 {Zn} 0x40 0x01 {value} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: value
      type: integer
      description: '0x00-0x32 sets delay in 5 ms steps (e.g. 0x08 = 40 ms); 0xF0 Request; 0xF1 Increment 5 ms; 0xF2 Decrement 5 ms'
  notes: Response echoes the current delay with the same encoding.

- id: cmd_0x41_compression
  label: Compression (Dynamic Range)
  kind: action
  command: '0x21 {Zn} 0x41 0x01 {value} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: value
      type: enum
      values: [0x00, 0x01, 0x02, 0xF0]
      description: 0x00 Off, 0x01 Medium, 0x02 High, 0xF0 Request
  notes: Response Data1: 0x00 Off, 0x01 medium, 0x02 high.

- id: cmd_0x42_incoming_video_parameters
  label: Request Incoming Video Parameters
  kind: query
  command: '0x21 {Zn} 0x42 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: >
    Response Dl=0x07: Data1 Data2 = horizontal resolution MSB/LSB (e.g. 0x05 0x00
    = 1280); Data3 Data4 = vertical resolution MSB/LSB (e.g. 0x02 0xD0 = 720);
    Data5 = refresh rate for full image update (half the field rate for
    interlaced signals; e.g. 0x32 = 50 Hz progressive); Data6 = 0x00
    Progressive / 0x01 Interlaced; Data7 = 0x00 Undefined, 0x01 4:3, 0x02 16:9.

- id: cmd_0x43_incoming_audio_format
  label: Request Incoming Audio Format
  kind: query
  command: '0x21 {Zn} 0x43 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: >
    Response Dl=0x02. Data1 = audio stream format: 0x00 PCM, 0x01 Analogue
    Direct, 0x02 Dolby Digital, 0x03 DD EX, 0x04 DD Surround, 0x05 DD Plus,
    0x06 DD True HD, 0x07 DTS, 0x08 DTS 96/24, 0x09 DTS ES Matrix, 0x0A DTS
    ES Discrete, 0x0B DTS ES Matrix 96/24, 0x0C DTS ES Discrete 96/24, 0x0D
    DTS HD Master, 0x0E DTS HD High Res, 0x0F DTS Low Bit Rate, 0x10 DTS
    Core, 0x13 PCM Zero, 0x14 Unsupported, 0x15 Undetected, 0x16 Dolby
    Atmos, 0x17 DTS:X, 0x18 IMAX ENHANCED. Data2 = audio channel
    configuration: 0x00 Dual Mono, 0x01 Centre only, 0x02 Stereo only,
    0x03 Stereo + mono surround, 0x04 Stereo + Surround L & R, 0x05 Stereo
    + Surround L & R + mono Surround Back, 0x06 Stereo + Surround L & R +
    Surround Back L & R, 0x07 Stereo + Surround L & R containing matrix
    information for surround back L&R, 0x08 Stereo + Centre, 0x09 Stereo +
    Centre + mono surround, 0x0A Stereo + Centre + Surround L & R, 0x0B
    Stereo + Centre + Surround L & R + mono Surround Back, 0x0C Stereo +
    Centre + Surround L & R + Surround Back L & R, 0x0D Stereo + Centre +
    Surround L & R containing matrix information for surround back L&R, 0x0E
    Stereo Downmix Lt Rt, 0x0F Stereo Only (Lo Ro), 0x10 Dual Mono + LFE,
    0x11 Centre + LFE, 0x12 Stereo + LFE, 0x13 Stereo + single surround +
    LFE, 0x14 Stereo + Surround L & R + LFE, 0x15 Stereo + Surround L & R
    + mono Surround Back + LFE, 0x16 Stereo + Surround L & R + Surround
    Back L & R + LFE, 0x17 Stereo + Surround L & R + LFE, 0x18 Stereo +
    Centre + LFE containing matrix information (line truncated in source
    beyond this point). Source stream-format table skips 0x11 and 0x12 (DTS
    Core 0x10 jumps to PCM Zero 0x13) and 0x1A-0xFF are reserved/unused.

- id: cmd_0x44_incoming_audio_sample_rate
  label: Request Incoming Audio Sample Rate
  kind: query
  command: '0x21 {Zn} 0x44 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: >
    Response Data1: 0x00 32 kHz, 0x01 44.1 kHz, 0x02 48 kHz, 0x03 88.2 kHz,
    0x04 96 kHz, 0x05 176.4 kHz, 0x06 192 kHz, 0x07 Unknown, 0x08 Undetected.

- id: cmd_0x45_sub_stereo_trim
  label: Set/Request Sub Stereo Trim
  kind: action
  command: '0x21 {Zn} 0x45 0x01 {value} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: value
      type: integer
      description: '0x00 sets 0 dB; 0x81-0x94 sets -0.5 dB to -10.0 dB in 0.5 dB steps; 0xF0 Request; 0xF1 Increment 0.5 dB; 0xF2 Decrement 0.5 dB'
  notes: Response Data1 = current sub stereo trim with the same encoding.

- id: cmd_0x4E_zone1_osd
  label: Set/Request Zone 1 OSD On/Off
  kind: action
  command: '0x21 0x01 0x4E 0x01 {state} 0x0D'
  params:
    - name: state
      type: enum
      values: [0xF0, 0xF1, 0xF2]
      description: 0xF0 Request; 0xF1 Set OSD On; 0xF2 Set OSD Off
  notes: >
    Zn fixed at 0x01. Response Data1: 0x00 OSD On, 0x01 OSD Off.
    Source's worked example uses command code 0x4A in both the request and
    response frames (with a response Dl=0x00 plus a stray Data1=0x01 byte
    that is inconsistent with the framing) - this contradicts the 0x4E
    spec table, which the rest of the source consistently defines; treated
    here as 0x4E per the table.

- id: cmd_0x4F_video_output_switching
  label: Set/Request HDMI Video Output Switching
  kind: action
  command: '0x21 0x01 0x4F 0x01 {output} 0x0D'
  params:
    - name: output
      type: enum
      values: [0x02, 0x03, 0x04, 0xF0]
      description: 0x02 HDMI Output 1; 0x03 HDMI Output 2; 0x04 HDMI Output 1 & 2; 0xF0 Request
  notes: Zn fixed at 0x01. Response echoes current setting.

- id: cmd_0x20_input_name
  label: Set/Request Input Name
  kind: action
  command: '0x21 {Zn} 0x20 0x{n} [bytes] 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: n
      type: integer
      description: 'Query: Dl=0x01, Data1=0xF0. Set: Dl <= 0x0A (up to 10 ASCII characters).'
    - name: bytes
      type: string
      description: 'Up to 10 ASCII characters of the desired input name (set); omit for query.'
  notes: >
    Zn=0x01 in source example. Response Dl=0x0A when querying (always 10
    bytes); Dl=Data length when setting.

- id: cmd_0x23_fm_scan
  label: FM Scan Up/Down
  kind: action
  command: '0x21 {Zn} 0x23 0x01 {dir} 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
    - name: dir
      type: enum
      values: [0x01, 0x02]
      description: 0x01 Scan up; 0x02 Scan down
  notes: Only valid if FM input is selected. Response Data1: 0xFF = scanning.

- id: cmd_0x24_dab_scan
  label: DAB Scan
  kind: action
  command: '0x21 {Zn} 0x24 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: Only valid if DAB input is selected. Response Data1: 0xFF = scanning.

- id: cmd_0x25_heartbeat
  label: Heartbeat
  kind: action
  command: '0x21 {Zn} 0x25 0x01 0xF0 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: >
    Confirms the unit is still connected and resets the EuP standby timer.
    Response Data1: 0x00.

- id: cmd_0x26_reboot
  label: Reboot
  kind: action
  command: '0x21 {Zn} 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D'
  params:
    - name: Zn
      type: enum
      values: [0x01, 0x02]
      description: Zone number
  notes: >
    The 6-byte data payload is the literal ASCII word "REBOOT" (0x52 0x45
    0x42 0x4F 0x4F 0x54) - a confirmation guard against accidental reboot.
    Response: 0x21 Zn 0x26 0x01 0x00 0x0D.
```

## Feedbacks
```yaml
# Response answer codes (always present in response Ac field):
- id: answer_code
  type: enum
  values: [0x00, 0x82, 0x83, 0x84, 0x85, 0x86]
  description: 0x00 status update / accepted; 0x82 zone invalid; 0x83 command not recognised; 0x84 parameter not recognised; 0x85 command invalid at this time; 0x86 invalid data length.

# State observables from query commands:
- id: power_state
  type: enum
  values: [standby, on]
  description: From 0x00 request; 0x00=standby, 0x01=on.

- id: display_brightness
  type: enum
  values: [off, L1, L2]
  description: From 0x01 request; 0x00=off, 0x01=L1, 0x02=L2.

- id: headphone_state
  type: enum
  values: [disconnected, connected]
  description: From 0x02 request; 0x00=disconnected, 0x01=connected.

- id: mute_state
  type: enum
  values: [muted, unmuted]
  description: From 0x0E request; 0x00=muted, 0x01=not muted.

- id: direct_mode
  type: enum
  values: [off, on]
  description: From 0x0F request; 0x00=off, 0x01=on.

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, ch5_7_stereo, dts_neuralx, reserved, dts_virtualx]
  description: From 0x10; 0x01/0x04/0x07/0x08/0x09/0x0A/0x0B/0x0C.

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multichannel, dts_es_neuralx, dolby_surround, reserved, dts_virtualx]
  description: From 0x11; 0x01/0x02/0x03/0x06/0x0B/0x0C.

- id: video_output_resolution
  type: enum
  values: [sd_progressive, 720p, 1080i, 1080p, preferred, bypass, 4k]
  description: From 0x13; 0x02/0x03/0x04/0x05/0x06/0x07/0x08.

- id: open_menu
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  description: From 0x14; 0x00/0x02/0x03/0x04/0x05/0x06/0x07/0x08/0x09/0x0A.

- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]
  description: From 0x0C; 0x00/0x01/0x02.

- id: room_eq_state
  type: enum
  values: [off, on, not_calculated]
  description: From 0x37; 0x00/0x01/0x02.

- id: dolby_volume_state
  type: enum
  values: [off, on]
  description: From 0x38; 0x00/0x01.

- id: dolby_leveller
  type: integer
  description: From 0x39; 0x00-0x0A, or 0xFF = off.

- id: compression
  type: enum
  values: [off, medium, high]
  description: From 0x41; 0x00/0x01/0x02.

- id: zone1_osd_state
  type: enum
  values: [on, off]
  description: From 0x4E; 0x00=on, 0x01=off.

- id: video_output_switching
  type: enum
  values: [hdmi1, hdmi2, hdmi1_and_2]
  description: From 0x4F; 0x02/0x03/0x04.

- id: current_source
  type: enum
  values: [follow_z1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]
  description: From 0x1D; 0x00/0x01/0x02/0x03/0x04/0x05/0x06/0x08/0x09/0x0B/0x0C/0x0E/0x0F/0x10/0x11. Note 0x0C TUNER(DAB) only on AVR450/750.

- id: current_preset
  type: integer
  description: From 0x15; 0x01-0x32 (1-50), or 0xFF if no preset is selected.

- id: fm_frequency
  type: string
  description: From 0x16; Data1 = MHz byte, Data2 = 10's of kHz byte. Combine as Data1.Data2 * 0.05 MHz (e.g. 0x55 0x05 = 85.05 MHz).

- id: network_playback_state
  type: enum
  values: [navigating, playing, paused, busy]
  description: From 0x1C; 0x00/0x01/0x02/0xFF.

- id: incoming_audio_sample_rate
  type: enum
  values: [32k, 44_1k, 48k, 88_2k, 96k, 176_4k, 192k, unknown, undetected]
  description: From 0x44; 0x00/0x01/0x02/0x03/0x04/0x05/0x06/0x07/0x08.

- id: fm_programme_type
  type: string
  description: From 0x03; ASCII string of the current FM programme type.

- id: dab_station_label
  type: string
  description: From 0x18; 16 ASCII bytes (space-padded) of the DAB service label.

- id: dab_programme_type
  type: string
  description: From 0x19; 16 ASCII bytes (space-padded) of the DAB programme type.

- id: dab_dynamic_label
  type: string
  description: From 0x1A; 128 ASCII bytes (space-padded) of DAB DLS/PDT text.

- id: rds_programme_type
  type: string
  description: From 0x12; ASCII string of the current RDS programme information.

- id: volume_db
  type: integer
  description: From 0x0D; 0x00-0x63 maps to 0-99 (treated as dB in source; e.g. 0x2A = 42).

- id: treble_db
  type: integer
  description: From 0x35; 0x00-0x0C (0 to +12 dB) or 0x81-0x8C (-1 to -12 dB).

- id: bass_db
  type: integer
  description: From 0x36; 0x00-0x0C (0 to +12 dB) or 0x81-0x8C (-1 to -12 dB).

- id: balance
  type: integer
  description: From 0x3B; 0x00-0x06 (0 to +6) or 0x81-0x86 (-1 to -6).

- id: subwoofer_trim
  type: integer
  description: From 0x3F; 0x00-0x14 (0 to +10 dB in 0.5 dB steps) or 0x81-0x94 (negative).

- id: sub_stereo_trim
  type: integer
  description: From 0x45; 0x00 (0 dB) or 0x81-0x94 (-0.5 dB to -10.0 dB in 0.5 dB steps).

- id: lipsync_delay_ms
  type: integer
  description: From 0x40; 0x00-0x32 x 5 ms (e.g. 0x08 = 40 ms).

- id: dolby_volume_calibration_offset
  type: integer
  description: From 0x3A; 0x00-0x0F (0 to +15 dB) or 0x80-0x8F (-1 to -15 dB).

- id: software_version
  type: string
  description: From 0x04; major.minor bytes for component (RS-232, Host, OSD, DSP, NET, IAP).

- id: incoming_video_parameters
  type: object
  description: >
    From 0x42; 7-byte payload: horizontal resolution (MSB/LSB), vertical
    resolution (MSB/LSB), refresh rate (full image update; half field rate
    for interlaced), progressive/interlaced flag, aspect ratio (undefined /
    4:3 / 16:9).

- id: incoming_audio_format
  type: object
  description: >
    From 0x43; stream format (PCM, DD family, DTS family, Atmos, DTS:X, IMAX
    ENHANCED) plus channel configuration byte. Full tables in source;
    stream format 0x11/0x12 and 0x1A+ unused, channel configuration 0x19+
    source-truncated.

- id: amx_duet_descriptor
  type: object
  description: >
    From AMX Duet discovery. Returns a model-specific AMXB descriptor with
    Device-SDKClass=Receiver, Device-Make=ARCAM, Device-Model={AV860|AVR850|
    AVR550|AVR390|SR250}, Device-Revision=x.y.z (RS-232 protocol version).
```

## Variables
```yaml
# Continuous settable values that the host adjusts. Discrete one-shot
# commands (e.g. restore factory default, reboot) are in Actions.
- id: volume
  type: integer
  range: [0, 99]
  description: 'Zone volume, 0x00-0x63. Set/Request via 0x0D.'

- id: treble
  type: integer
  range: [-12, 12]
  description: 'Treble EQ in dB. 0x00-0x0C (0 to +12 dB), 0x81-0x8C (-1 to -12 dB). Set/Request via 0x35.'

- id: bass
  type: integer
  range: [-12, 12]
  description: 'Bass EQ in dB. 0x00-0x0C (0 to +12 dB), 0x81-0x8C (-1 to -12 dB). Set/Request via 0x36.'

- id: balance
  type: integer
  range: [-6, 6]
  description: 'Balance offset. 0x00-0x06 (0 to +6), 0x81-0x86 (-1 to -6). Set/Request via 0x3B.'

- id: subwoofer_trim
  type: integer
  range: [-10, 10]
  description: 'Subwoofer trim in 0.5 dB steps. 0x00-0x14 (0 to +10), 0x81-0x94 (negative). Set/Request via 0x3F.'

- id: sub_stereo_trim
  type: integer
  range: [-10, 0]
  description: 'Sub Stereo trim in 0.5 dB steps. 0x00 (0 dB), 0x81-0x94 (-0.5 dB to -10.0 dB). Set/Request via 0x45.'

- id: lipsync_delay
  type: integer
  range: [0, 250]
  description: 'Lipsync delay in ms, set in 5 ms steps. 0x00-0x32 (0 to 250 ms). Set/Request via 0x40.'

- id: dolby_leveller
  type: integer
  range: [0, 10]
  description: 'Dolby Leveller setting 0-10, or 0xFF = off. Set/Request via 0x39.'

- id: dolby_volume_calibration_offset
  type: integer
  range: [-15, 15]
  description: 'Calibration offset in dB. 0x00-0x0F (0 to +15), 0x80-0x8F (-1 to -15). Set/Request via 0x3A.'

- id: compression
  type: enum
  values: [off, medium, high]
  description: 'Dynamic range compression. Set/Request via 0x41.'

- id: video_output_resolution
  type: enum
  values: [sd_progressive, 720p, 1080i, 1080p, preferred, bypass, 4k]
  description: 'Zone 1 video output resolution. Read-only via 0x13.'

- id: zone1_osd
  type: enum
  values: [on, off]
  description: 'Whether the Zone 1 OSD is shown. Set/Request via 0x4E.'

- id: video_output_switching
  type: enum
  values: [hdmi1, hdmi2, hdmi1_and_2]
  description: 'HDMI output routing. Set/Request via 0x4F.'

- id: imax_enhanced
  type: enum
  values: [off, on, auto]
  description: 'IMAX Enhanced mode. Set/Request via 0x0C.'

- id: room_eq
  type: enum
  values: [off, on]
  description: 'Room EQ on/off. Set/Request via 0x37 (note 0x02 = not calculated is a read-only state).'

- id: dolby_volume
  type: enum
  values: [off, on]
  description: 'Dolby Volume on/off. Set/Request via 0x38.'

- id: direct_mode
  type: enum
  values: [off, on]
  description: 'Direct mode. Set via RC5 16-10 / Simulate RC5. Read via 0x0F.'

- id: input_name
  type: string
  max_length: 10
  description: 'Custom input name (up to 10 ASCII chars). Set/Request via 0x20.'
```

## Events
```yaml
# The source notes (page "State changes as a result of other inputs") that
# the unit relays state changes to the controller using the appropriate
# message type, but the document does not enumerate a distinct unsolicited
# event frame - updates use the same response format as the corresponding
# command, sent unprompted.
# UNRESOLVED: the source does not define a separate "asynchronous status
# message" frame format; only the standard response frame (St Zn Cc Ac Dl
# Data... Et) is documented, and it is unspecified which command codes can
# appear unsolicited vs. only in response to a polled request.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences are described in the source.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_default       # 0x05 - requires 0xAA 0xAA confirmation pattern
  - save_restore_secure_copy      # 0x06 - requires 0x55 0x55 + 4-digit PIN
  - reboot                        # 0x26 - requires literal "REBOOT" (0x52 0x45 0x42 0x4F 0x4F 0x54) data payload
interlocks: []
# No additional safety warnings, interlock procedures, or power-on
# sequencing requirements appear in the source.
```

## Notes
- **Cable:** serial is a null modem (pin 2<->3 crossed, pin 5 ground). Do not connect handshaking lines - flow control is none.
- **Default-off control:** RS-232 / IP control is disabled by default to minimise standby power. It must be enabled per-unit: hold the front panel DIRECT button for 4 s until the VFD shows "RS232 CONTROL ON", or toggle Control in the OSD General Setup menu.
- **IP control port:** 50000 (TCP). The source does not document authentication or session handshakes for either serial or IP.
- **3-second response budget:** the unit responds to each command within three seconds, and the controller may send further commands before a previous response is received.
- **Reserved range:** command codes 0xF0-0xFF are reserved for test functions and must not be sent.
- **RC5 simulation:** the Simulate RC5 IR command (0x08) is the only mechanism to drive many UI actions (standby, power, transport, numeric keys, etc.) that have no native binary command code. RC5 code tables below are reproduced verbatim from the source.

**AV RC5 command codes - Basic Functions (system 0x10 unless noted)**

| Function | RC5 code (decimal) | RC5 code (hex Data1 Data2) |
|---|---|---|
| Standby | 16-12 | 0x10 0x0C |
| 1 | 16-1 | 0x10 0x01 |
| 2 | 16-2 | 0x10 0x02 |
| 3 | 16-3 | 0x10 0x03 |
| 4 | 16-4 | 0x10 0x04 |
| 5 | 16-5 | 0x10 0x05 |
| 6 | 16-6 | 0x10 0x06 |
| 7 | 16-7 | 0x10 0x07 |
| 8 | 16-8 | 0x10 0x08 |
| 9 | 16-9 | 0x10 0x09 |
| 0 | 16-0 | 0x10 0x00 |
| Access Lipsync Delay | 16-50 | 0x10 0x32 |
| Cycle VFD information panels | 16-55 | 0x10 0x37 |
| Rewind | 16-121 | 0x10 0x79 |
| Fast Forward | 16-52 | 0x10 0x34 |
| Skip Back | 16-33 | 0x10 0x21 |
| Skip Forward | 16-11 | 0x10 0x0B |
| Stop | 16-54 | 0x10 0x36 |
| Play | 16-53 | 0x10 0x35 |
| Pause | 16-48 | 0x10 0x30 |
| Disc / Record (Enter Trim Menu) | 16-90 | 0x10 0x5A |
| MENU (Enter system menu) | 16-82 | 0x10 0x52 |
| Navigate Up | 16-86 | 0x10 0x56 |
| Pop Up (Dolby Volume on/off) | 16-70 | 0x10 0x46 |
| Navigate Left | 16-81 | 0x10 0x51 |
| OK | 16-87 | 0x10 0x57 |
| Navigate Right | 16-80 | 0x10 0x50 |
| Audio (Room EQ on/off) | 16-30 | 0x10 0x1E |
| Navigate Down | 16-85 | 0x10 0x55 |
| RTN (Access Subwoofer Trim) | 16-51 | 0x10 0x33 |
| HOME | 16-43 | 0x10 0x2B |
| Mute | 16-13 | 0x10 0x0D |
| Volume + | 16-16 | 0x10 0x10 |
| MODE (cycle decode modes) | 16-32 | 0x10 0x20 |
| DISP (VFD brightness) | 16-59 | 0x10 0x3B |
| Direct mode | 16-10 | 0x10 0x0A |
| Volume - | 16-17 | 0x10 0x11 |
| Red | 16-41 | 0x10 0x29 |
| Green | 16-42 | 0x10 0x2A |
| Yellow | 16-43 | 0x10 0x2B |
| Blue | 16-55 | 0x10 0x37 |
| Radio | 16-91 | 0x10 0x5B |
| Aux | 16-99 | 0x10 0x63 |
| Net | 16-92 | 0x10 0x5C |
| USB | 16-93 | 0x10 0x5D |
| AV | 16-94 | 0x10 0x5E |
| Sat | 16-27 | 0x10 0x1B |
| PVR | 16-96 | 0x10 0x60 |
| Game | 16-97 | 0x10 0x61 |

**AV RC5 command codes - Advanced Functions (system 0x10 unless noted)**

| Function | RC5 code (decimal) | RC5 code (hex) |
|---|---|---|
| BD | 16-98 | 0x10 0x62 |
| CD | 16-118 | 0x10 0x76 |
| STB | 16-100 | 0x10 0x64 |
| VCR | 16-119 | 0x10 0x77 |
| Display | 16-58 | 0x10 0x3A |
| Power On | 16-123 | 0x10 0x7B |
| Power Off | 16-124 | 0x10 0x7C |
| Next zone | 16-95 | 0x10 0x5F |
| Cycle output resolutions | 16-47 | 0x10 0x2F |
| Bass control | 16-39 | 0x10 0x27 |
| Speaker Trim | 16-37 | 0x10 0x25 |
| Treble control | 16-14 | 0x10 0x0E |
| Random | 16-76 | 0x10 0x4C |
| Repeat | 16-49 | 0x10 0x31 |
| Direct mode On | 16-78 | 0x10 0x4E |
| Direct mode Off | 16-79 | 0x10 0x4F |
| Multi Channel | 16-106 | 0x10 0x6A |
| Stereo | 16-107 | 0x10 0x6B |
| Dolby Surround | 16-110 | 0x10 0x6E |
| DTS Neo:6 Cinema | 16-111 | 0x10 0x6F |
| DTS Neo:6 Music | 16-112 | 0x10 0x70 |
| DTS Neural:X | 16-113 | 0x10 0x71 |
| Reserved | 16-114 | 0x10 0x72 |
| DTS Virtual:X | 16-115 | 0x10 0x73 |
| 5/7 Ch Stereo | 16-69 | 0x10 0x45 |
| Dolby D EX | 16-23 | 0x10 0x17 |
| Mute On | 16-26 | 0x10 0x1A |
| Mute Off | 16-120 | 0x10 0x78 |
| FM | 16-28 | 0x10 0x1C |
| DAB | 16-72 | 0x10 0x48 |
| Lip Sync +5 ms | 16-15 | 0x10 0x0F |
| Lip Sync -5 ms | 16-101 | 0x10 0x65 |
| Sub trim +0.5 dB | 16-105 | 0x10 0x69 |
| Sub trim -0.5 dB | 16-108 | 0x10 0x6C |
| Display Off | 16-31 | 0x10 0x1F |
| Display L1 | 16-34 | 0x10 0x22 |
| Display L2 | 16-35 | 0x10 0x23 |
| Balance left | 16-38 | 0x10 0x26 |
| Balance right | 16-40 | 0x10 0x28 |
| Bass +1 | 16-44 | 0x10 0x2C |
| Bass -1 | 16-45 | 0x10 0x2D |
| Treble +1 | 16-46 | 0x10 0x2E |
| Treble -1 | 16-102 | 0x10 0x66 |
| Zone 2 follow Zone 1 | 16-20 | 0x10 0x14 |
| Zone 2 Power On | 23-123 | 0x17 0x7B |
| Zone 2 Power Off | 23-124 | 0x17 0x7C |
| Zone 2 Vol+ | 23-1 | 0x17 0x01 |
| Zone 2 Vol- | 23-2 | 0x17 0x02 |
| Zone 2 Mute | 23-3 | 0x17 0x03 |
| Zone 2 Mute On | 23-4 | 0x17 0x04 |
| Zone 2 Mute Off | 23-5 | 0x17 0x05 |
| Zone 2 CD | 23-6 | 0x17 0x06 |
| Zone 2 BD | 23-7 | 0x17 0x07 |
| Zone 2 STB | 23-8 | 0x17 0x08 |
| Zone 2 AV | 23-9 | 0x17 0x09 |
| Zone 2 Game | 23-11 | 0x17 0x0B |
| Zone 2 Aux | 23-13 | 0x17 0x0D |
| Zone 2 PVR | 23-15 | 0x17 0x0F |
| Zone 2 FM | 23-14 | 0x17 0x0E |
| Zone 2 DAB | 23-16 | 0x17 0x10 |
| Zone 2 USB | 23-18 | 0x17 0x12 |
| Zone 2 NET | 23-19 | 0x17 0x13 |
| Zone 2 SAT | 23-20 | 0x17 0x14 |
| Zone 2 VCR | 23-21 | 0x17 0x15 |
| Select HDMI Out 1 | 16-73 | 0x10 0x49 |
| Select HDMI Out 2 | 16-74 | 0x10 0x4A |
| Select HDMI Out 1 & 2 | 16-75 | 0x10 0x4B |

- **Source/CDS50 mismatch:** the document is for the AV receiver family only. The CDS50 is a CD/SACD player and is not listed in this source. The binary framing and command set may be shared across Arcam's custom-install product line, but this is an inference - the source does not confirm CDS50 behaviour. The spec should be re-pointed at the correct entity if the family entity is known; otherwise the spec is issued here as the closest authoritative description of Arcam's RS-232/NET control protocol.

<!-- UNRESOLVED:
- Firmware compatibility: source does not state which protocol version each firmware release supports (the AMX response carries a placeholder x.y.z).
- Asynchronous / unsolicited event frame: source mentions "additional status message will be sent in most cases" but does not define a distinct unsolicited frame.
- 0x4E OSD command example: source's worked example uses command code 0x4A in both the request and response frames (and shows response Dl=0x00 with a stray Data1=0x01 byte that is inconsistent with the framing), but the command-spec table uses 0x4E. Either 0x4A is a typo in the source, or 0x4E has a different meaning; treated here as 0x4E per the table.
- 0x43 channel-configuration table is truncated mid-line in the source beyond 0x18 ("Stereo + Centre + LFE containing matrix information...").
- 0x43 stream-format table skips 0x11 and 0x12 (DTS Core 0x10 jumps to PCM Zero 0x13); 0x1A+ unused in source.
- Command codes 0x07, 0x17, 0x1E, 0x21, 0x22, 0x27, 0x28-0x34, 0x3C-0x3E, 0x46-0x4D, 0x50+ are not documented in the supplied source and therefore have no actions in this spec. Command 0x1E is referenced (in 0x06's failure conditions) but its purpose is not described. -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-06-01T21:56:18.005Z
last_checked_at: 2026-06-01T22:29:07.614Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T22:29:07.614Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions have verbatim hex command codes confirmed in source; transport values 38400 bps, 8N1, port 50000 all supported; source has exactly 51 commands (50 binary + AMX). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "this source document covers Arcam AVR/AV processor models (AVR390/550/850, AV860, SR250). The user-provided entity_id and device name refer to the Arcam CDS50 (a CD/SACD player), which is NOT covered by this document. The CDS50 may share a similar RS-232 protocol, but the source contains no evidence of CDS50 behaviour. The spec is therefore issued against the AV receiver family — the entity_id should be re-pointed at the correct family entity when ingested."
- "the source does not define a separate \"asynchronous status"
- "no multi-step sequences are described in the source."
- "- Firmware compatibility: source does not state which protocol version each firmware release supports (the AMX response carries a placeholder x.y.z)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
