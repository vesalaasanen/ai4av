---
spec_id: admin/arcam-avr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam AVR Series Control Spec"
manufacturer: Arcam
model_family: "Arcam AVR390"
aliases: []
compatible_with:
  manufacturers:
    - Arcam
  models:
    - "Arcam AVR390"
    - "Arcam AVR550"
    - "Arcam AVR850"
    - "Arcam AV860"
    - "Arcam SR250"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:52.364Z
last_checked_at: 2026-06-02T21:39:49.328Z
generated_at: 2026-06-02T21:39:49.328Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "RS-232 connector type/pinout on chassis not specified beyond null-modem wiring"
  - "TCP authentication method (if any) not stated in source; described as port 50000 only"
  - "zone 2 commands beyond IR simulation not enumerated as separate 0xNN opcodes; zone 2 source select via 0x1D only"
  - "maximum concurrent control connections, keepalive, reconnection behavior not specified"
  - "source describes no explicit multi-step macro sequences beyond individual"
  - "no explicit electrical safety, interlock, or power-sequencing"
  - "complete set of answer-code error conditions per command not enumerated"
  - "maximum IP control connection count and behavior on concurrent access not stated"
  - "IAP version (0xF5 in 0x04) and 0x1E save-in-progress guard not described in detail"
  - "DAB support claim is \"AVR450/750 only\" in source, but spec is for AVR390/550/850/860/SR250 — applicability unverified"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:39:49.328Z
  matched_actions: 167
  action_count: 167
  confidence: medium
  summary: "All 167 spec actions match verbatim source command opcodes and RC5 table entries; transport parameters confirmed. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Arcam AVR Series Control Spec

## Summary
The Arcam AVR Series (AVR390, AVR550, AVR850, AV860, SR250) is a line of high-end AV receivers controllable over RS-232 and TCP/IP (port 50000). Communication uses a framed binary protocol with start (0x21), zone, command code, data length, data, end (0x0D) bytes. A `Simulate RC5 IR Command` (0x08) provides access to all front-panel/IR remote functions, allowing any operation reachable via the IR remote to be invoked over the control link.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: RS-232 connector type/pinout on chassis not specified beyond null-modem wiring -->
<!-- UNRESOLVED: TCP authentication method (if any) not stated in source; described as port 50000 only -->
<!-- UNRESOLVED: zone 2 commands beyond IR simulation not enumerated as separate 0xNN opcodes; zone 2 source select via 0x1D only -->
<!-- UNRESOLVED: maximum concurrent control connections, keepalive, reconnection behavior not specified -->

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
  cable: null_modem
  pinout:
    connector_a_pin_2: "Rx → Tx"
    connector_a_pin_3: "Tx → Rx"
    connector_a_pin_5: "RS232 Ground"
addressing:
  port: 50000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power on/off commands (RC5 16-123 / 16-124, 0x00 power state)
- routable   # inferred from input source selection commands (0x0A, 0x1D, RC5 source keys)
- queryable  # inferred from query commands returning state (0x00, 0x0D, 0x0E, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x42, 0x43, 0x44)
- levelable  # inferred from volume (0x0D), bass/treble (0x35, 0x36), sub trim (0x3F, 0x45), balance (0x3B), Dolby volume/leveller/calibration (0x38, 0x39, 0x3A)
```

## Actions
```yaml
# FRAME FORMAT
#   REQUEST : 0x21 [Zn] [Cc] [Dl] [Data...] 0x0D
#   RESPONSE: 0x21 [Zn] [Cc] [Ac] [Dl] [Data...] 0x0D
#   Zn (Zone): 0x01 = Zone 1 (master), 0x02 = Zone 2
#   Cc (Command code): see per-action
#   Dl (Data length): number of data bytes following
#   Ac (Answer code): 0x00 status update, 0x82 zone invalid, 0x83 cmd not recognised,
#                     0x84 param not recognised, 0x85 invalid at this time, 0x86 invalid data length
#   St (Start) = 0x21; Et (End) = 0x0D
# Device responds within 3 seconds; RC may send further commands before response received.
# Commands 0xF0-0xFF are RESERVED for test functions - must never be used.

# ─────────── System Commands (0x00-0x09) ───────────

- id: power_request
  label: Request Power State
  kind: query
  command: "0x21 0x{zone} 0x00 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (1 or 2)
  notes: "Response data: 0x00 = standby, 0x01 = powered on"

- id: display_brightness_request
  label: Request Display Brightness
  kind: query
  command: "0x21 0x01 0x01 0x01 0xF0 0x0D"
  notes: "Response data: 0x00 = off, 0x01 = L1, 0x02 = L2"

- id: headphone_connection_request
  label: Request Headphone Connection
  kind: query
  command: "0x21 0x01 0x02 0x01 0xF0 0x0D"
  notes: "Response data: 0x00 = not connected, 0x01 = connected"

- id: fm_program_type_request
  label: Request FM Program Type
  kind: query
  command: "0x21 0x{zone} 0x03 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Returns error 0x85 if FM not selected. Response data = programme type in ASCII"

- id: software_version_request
  label: Request Software Version
  kind: query
  command: "0x21 0x01 0x04 0x01 0x{subsystem} 0x0D"
  params:
    - name: subsystem
      type: integer
      description: Subsystem to query
      enum:
        - 0xF0  # RS232 protocol version
        - 0xF1  # Host version
        - 0xF2  # OSD version
        - 0xF3  # DSP version
        - 0xF4  # NET version
        - 0xF5  # IAP version
  notes: "Response echoes subsystem byte, then major and minor version bytes"

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  command: "0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"
  notes: "Confirmation data pattern 0xAA 0xAA required to avoid accidental restore"

- id: save_restore_secure_backup
  label: Save/Restore Secure Backup
  kind: action
  command: "0x21 0x01 0x06 0x07 0x{op} 0x55 0x55 0x{p1} 0x{p2} 0x{p3} 0x{p4} 0x0D"
  params:
    - name: op
      type: integer
      description: "0x00 = save secure backup, 0x01 = restore secure backup"
    - name: p1
      type: integer
      description: PIN digit 1 (0-9)
    - name: p2
      type: integer
      description: PIN digit 2 (0-9)
    - name: p3
      type: integer
      description: PIN digit 3 (0-9)
    - name: p4
      type: integer
      description: PIN digit 4 (0-9)
  notes: "Confirmation pattern 0x55 0x55. Returns 0x85 if no secure copy or while command 0x1E is processing"

- id: simulate_rc5_ir
  label: Simulate RC5 IR Command
  kind: action
  command: "0x21 0x{zone} 0x08 0x02 0x{system} 0x{command} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: system
      type: integer
      description: RC5 system code (typically 0x10 for AV, 0x17 for Zone 2)
    - name: command
      type: integer
      description: RC5 command code
  notes: "Triggers any IR-remote function. An additional status message is sent in most cases as a result of the IR command."

- id: display_information_type
  label: Set/Request VFD Display Information Type
  kind: action
  command: "0x21 0x{zone} 0x09 0x01 0x{type} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: type
      type: integer
      description: "Display type selector; meaning depends on current source"
  notes: "All sources: 0x00=Processing, 0xE0=cycle, 0xF0=request. FM: 0x01=Radio text, 0x02=Programme type, 0x03=Signal strength. DAB: 0x01=Radio text, 0x02=Genre, 0x03=Signal quality, 0x04=Bit rate. NET/USB: 0x01=Track, 0x02=Artist, 0x03=Album, 0x04=Audio type, 0x05=Rate."

# ─────────── Input Commands (0x0A-0x0B) ───────────

- id: video_selection
  label: Set/Request Video Input
  kind: action
  command: "0x21 0x01 0x0A 0x01 0x{input} 0x0D"
  params:
    - name: input
      type: integer
      description: Video source
      enum:
        - 0x00  # BD
        - 0x01  # SAT
        - 0x02  # AV
        - 0x03  # PVR
        - 0x04  # VCR
        - 0x05  # Game
        - 0x06  # STB
        - 0xF0  # Request current input
  notes: "Returns invalid 0x85 if OSD setup screen is showing"

- id: audio_input_select
  label: Set/Request Audio Input Type
  kind: action
  command: "0x21 0x{zone} 0x0B 0x01 0x{type} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: type
      type: integer
      description: "0x00 = analogue, 0x01 = digital, 0x02 = HDMI, 0xF0 = request current"
  notes: "Returns invalid 0x85 if OSD setup screen is showing"

# ─────────── Output Commands (0x0C-0x13) ───────────

- id: imax_enhanced
  label: Set/Request IMAX Enhanced
  kind: action
  command: "0x21 0x{zone} 0x0C 0x01 0x{action} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: action
      type: integer
      description: "0xF0 = request state, 0xF1 = Auto, 0xF2 = On, 0xF3 = Off"
  notes: "Response: 0x00=Off, 0x01=On, 0x02=Auto"

- id: volume_set
  label: Set Volume
  kind: action
  command: "0x21 0x{zone} 0x0D 0x01 0x{volume} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: volume
      type: integer
      description: "Volume 0-99 (0x00-0x63)"
      range: [0, 99]
  notes: "Returns volume even if zone is in mute. Use 0x0E to discover mute state."

- id: volume_request
  label: Request Volume
  kind: query
  command: "0x21 0x{zone} 0x0D 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number

- id: mute_status_request
  label: Request Mute Status
  kind: query
  command: "0x21 0x{zone} 0x0E 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Response: 0x00 = muted, 0x01 = not muted"

- id: direct_mode_request
  label: Request Direct Mode Status
  kind: query
  command: "0x21 0x01 0x0F 0x01 0xF0 0x0D"
  notes: "Response: 0x00 = Direct off, 0x01 = Direct on"

- id: decode_mode_2ch_request
  label: Request Decode Mode (2-channel)
  kind: query
  command: "0x21 0x01 0x10 0x01 0xF0 0x0D"
  notes: "Response: 0x01=Stereo, 0x04=Dolby Surround, 0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7Ch Stereo, 0x0A=DTS Neural:X, 0x0B=Reserved, 0x0C=DTS Virtual:X"

- id: decode_mode_mch_request
  label: Request Decode Mode (Multi-channel)
  kind: query
  command: "0x21 0x01 0x11 0x01 0xF0 0x0D"
  notes: "Response: 0x01=Stereo down-mix, 0x02=Multi-channel, 0x03=DTS-ES/Neural:X, 0x06=Dolby Surround, 0x0B=Reserved, 0x0C=DTS Virtual:X"

- id: rds_info_request
  label: Request RDS Information (FM)
  kind: query
  command: "0x21 0x{zone} 0x12 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Returns error 0x85 if FM not selected. Response = RDS text in ASCII"

- id: video_output_resolution_request
  label: Request Video Output Resolution
  kind: query
  command: "0x21 0x01 0x13 0x01 0xF0 0x0D"
  notes: "Response: 0x02=SD Progressive, 0x03=720p, 0x04=1080i, 0x05=1080p, 0x06=Preferred, 0x07=Bypass, 0x08=4k"

# ─────────── Menu Commands (0x14-0x1C) ───────────

- id: menu_status_request
  label: Request Open Menu Status
  kind: query
  command: "0x21 0x01 0x14 0x01 0xF0 0x0D"
  notes: "Response: 0x00=none, 0x02=Set-up, 0x03=Trim, 0x04=Bass, 0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB"

- id: tuner_preset
  label: Select/Request Tuner Preset
  kind: action
  command: "0x21 0x{zone} 0x15 0x01 0x{preset} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: preset
      type: integer
      description: "Preset number 1-50 (0x01-0x32) or 0xF0 to request current"
      range: [1, 50]
  notes: "Returns error 0x85 if tuner not selected. Response: 0xFF=no preset, 0x01-0x32=preset number"

- id: tune
  label: Increment/Decrement/Request Tuner Frequency
  kind: action
  command: "0x21 0x{zone} 0x16 0x01 0x{direction} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: direction
      type: integer
      description: "0x00=Decrement, 0x01=Increment, 0xF0=Request"
  notes: "0.05 MHz FM steps. Returns error 0x85 if tuner not selected"

- id: dab_station_request
  label: Request DAB Station
  kind: query
  command: "0x21 0x{zone} 0x18 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Returns 16-byte ASCII service label padded with 0x20. Returns 0x85 if DAB not selected."

- id: dab_program_type_request
  label: Request DAB Program Type
  kind: query
  command: "0x21 0x{zone} 0x19 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Returns 16-byte ASCII programme type padded with 0x20. Returns 0x85 if DAB not selected."

- id: dab_dls_request
  label: Request DAB DLS/PDT Information
  kind: query
  command: "0x21 0x{zone} 0x1A 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Returns 128-byte ASCII DLS text padded with 0x20. Returns 0x85 if DAB not selected."

- id: preset_details_request
  label: Request Tuner Preset Details
  kind: query
  command: "0x21 0x{zone} 0x1B 0x01 0x{preset} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: preset
      type: integer
      description: "Preset number 1-50"
      range: [1, 50]
  notes: "Response includes type (0x01=FM freq, 0x02=FM RDS name, 0x03=DAB) and name"

- id: network_playback_status_request
  label: Request Network Playback Status
  kind: query
  command: "0x21 0x{zone} 0x1C 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Returns 0x85 if network not selected. Response: 0x00=Navigating, 0x01=Playing, 0x02=Paused, 0xFF=Busy/Not Playing; followed by ASCII folder/file name."

# ─────────── Source / Routing (0x1D, 0x1F) ───────────

- id: current_source_request
  label: Request Current Source
  kind: query
  command: "0x21 0x{zone} 0x1D 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Response: 0x00=Follow Z1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=VCR, 0x08=AUX, 0x09=Display, 0x0B=TUNER FM, 0x0C=TUNER DAB (AVR450/750 only), 0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=GAME"

- id: headphone_override
  label: Set/Request Headphone Over-ride (Mute Relays)
  kind: action
  command: "0x21 0x{zone} 0x1F 0x01 0x{state} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: state
      type: integer
      description: "0x00 = Clear (speakers muted if headphones present), 0x01 = Set (speakers unmuted if headphones present)"
  notes: "Does not zero the volume"

# ─────────── Input Name / Scans (0x20, 0x23-0x26) ───────────

- id: input_name
  label: Set/Request Input Name
  kind: action
  command: "0x21 0x{zone} 0x20 0x{n} 0x{name_bytes} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: n
      type: integer
      description: "Query: 0x01 (1 byte). Set: ASCII byte length, max 10 characters"
    - name: name_bytes
      type: string
      description: "ASCII name bytes; 0xF0 for query"
  notes: "Set Dl must match the byte count of name_bytes. Query response Dl = 0x0A."

- id: fm_scan
  label: FM Scan Up/Down
  kind: action
  command: "0x21 0x01 0x23 0x01 0x{direction} 0x0D"
  params:
    - name: direction
      type: integer
      description: "0x01 = Scan up, 0x02 = Scan down"
  notes: "Only valid if FM input is active. Response: 0xFF = scanning."

- id: dab_scan
  label: DAB Scan Start
  kind: action
  command: "0x21 0x01 0x24 0x01 0xF0 0x0D"
  notes: "Only valid if DAB input is active. Response: 0xFF = scanning."

- id: heartbeat
  label: Heartbeat (Reset EuP Standby Timer)
  kind: action
  command: "0x21 0x01 0x25 0x01 0xF0 0x0D"
  notes: "Confirms unit is still connected"

- id: reboot
  label: Force Reboot
  kind: action
  command: "0x21 0x01 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D"
  notes: "Confirmation pattern 'REBOOT' (0x52 0x45 0x42 0x4F 0x4F 0x54) required"

# ─────────── Setup Adjustments (0x35-0x4F) ───────────

- id: treble_equalisation
  label: Set/Request Treble Equalisation
  kind: action
  command: "0x21 0x{zone} 0x35 0x01 0x{value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: "0x00-0x0C = 0..+12 dB; 0x81-0x8C = -1..-12 dB; 0xF0=request, 0xF1=+1dB, 0xF2=-1dB"
  notes: "Response echoes current value"

- id: bass_equalisation
  label: Set/Request Bass Equalisation
  kind: action
  command: "0x21 0x{zone} 0x36 0x01 0x{value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: "0x00-0x0C = 0..+12 dB; 0x81-0x8C = -1..-12 dB; 0xF0=request, 0xF1=+1dB, 0xF2=-1dB"

- id: room_equalisation
  label: Set/Request Room Equalisation
  kind: action
  command: "0x21 0x{zone} 0x37 0x01 0x{value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: "0xF0=request, 0xF1=On, 0xF2=Off"
  notes: "Response: 0x00=Off, 0x01=On, 0x02=Not calculated (off)"

- id: dolby_volume
  label: Set/Request Dolby Volume
  kind: action
  command: "0x21 0x{zone} 0x38 0x01 0x{value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: "0x00=Off, 0x01=On, 0xF0=request"

- id: dolby_leveller
  label: Set/Request Dolby Leveller
  kind: action
  command: "0x21 0x{zone} 0x39 0x01 0x{value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: "0x00-0x0A=set 0-10; 0xF0=request, 0xF1=increment, 0xF2=decrement, 0xFF=turn off"

- id: dolby_volume_calibration_offset
  label: Set/Request Dolby Volume Calibration Offset
  kind: action
  command: "0x21 0x{zone} 0x3A 0x01 0x{value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: "0x00-0x0F=0..+15dB; 0x80-0x8F=-1..-15dB; 0xF0=request, 0xF1=+1dB, 0xF2=-1dB"

- id: balance
  label: Set/Request Balance
  kind: action
  command: "0x21 0x{zone} 0x3B 0x01 0x{value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: "0x00-0x06=0..+6; 0x81-0x86=-1..-6; 0xF0=request, 0xF1=+1, 0xF2=-1"

- id: subwoofer_trim
  label: Set/Request Subwoofer Trim
  kind: action
  command: "0x21 0x{zone} 0x3F 0x01 0x{value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: "0x00-0x14=+0..+10dB in 0.5dB steps (e.g. 0x02=+1.0dB); 0x81-0x94=-0.5..-10dB; 0xF0=request, 0xF1=+0.5dB, 0xF2=-0.5dB"

- id: lipsync_delay
  label: Set/Request Lipsync Delay
  kind: action
  command: "0x21 0x{zone} 0x40 0x01 0x{value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: "0x00-0x32=set in 5ms steps (e.g. 0x08=40ms); 0xF0=request, 0xF1=+5ms, 0xF2=-5ms"

- id: compression
  label: Set/Request Dynamic Range Compression
  kind: action
  command: "0x21 0x{zone} 0x41 0x01 0x{value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: "0x00=Off, 0x01=Medium, 0x02=High, 0xF0=request"

- id: incoming_video_parameters_request
  label: Request Incoming Video Parameters
  kind: query
  command: "0x21 0x{zone} 0x42 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Response: 7 bytes - H-res MSB, H-res LSB, V-res MSB, V-res LSB, refresh (Hz), interlaced flag (0x00=Prog, 0x01=Int), aspect (0x00=undef, 0x01=4:3, 0x02=16:9)"

- id: incoming_audio_format_request
  label: Request Incoming Audio Format
  kind: query
  command: "0x21 0x{zone} 0x43 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number
  notes: "Response: 2 bytes - stream format (e.g. 0x02=Dolby Digital, 0x16=Dolby Atmos, 0x17=DTS:X, 0x18=IMAX ENHANCED) + channel config (0x1A = 5.1)"

- id: incoming_audio_sample_rate_request
  label: Request Incoming Audio Sample Rate
  kind: query
  command: "0x21 0x01 0x44 0x01 0xF0 0x0D"
  notes: "Response: 0x00=32k, 0x01=44.1k, 0x02=48k, 0x03=88.2k, 0x04=96k, 0x05=176.4k, 0x06=192k, 0x07=Unknown, 0x08=Undetected"

- id: sub_stereo_trim
  label: Set/Request Sub Stereo Trim
  kind: action
  command: "0x21 0x01 0x45 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00=0dB; 0x81-0x94=-0.5..-10dB; 0xF0=request, 0xF1=+0.5dB, 0xF2=-0.5dB"
  notes: "Subwoofer trim in stereo mode"

- id: zone1_osd
  label: Set/Request Zone 1 OSD On/Off
  kind: action
  command: "0x21 0x01 0x4E 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: "0xF0=request, 0xF1=On, 0xF2=Off"
  notes: "Response: 0x00=On, 0x01=Off (note inverted vs. command)"

- id: hdmi_output_switch
  label: Set/Request HDMI Video Output Switching
  kind: action
  command: "0x21 0x01 0x4F 0x01 0x{output} 0x0D"
  params:
    - name: output
      type: integer
      description: "0x02 = HDMI Out 1, 0x03 = HDMI Out 2, 0x04 = HDMI Out 1 & 2, 0xF0 = request"

# ─────────── AMX Duet Discovery ───────────

- id: amx_duet_discovery
  label: AMX Duet Dynamic Device Discovery
  kind: action
  command: "\"AMX\\r\""
  notes: "ASCII command on RS-232. Response identifies Device-SDKClass=Receiver, Make=ARCAM, Model, and RS-232 protocol revision."

# ─────────── RC5 IR Commands (sent via simulate_rc5_ir 0x08) ───────────
# All RC5 commands use: 0x21 0x{zone} 0x08 0x02 0x{system} 0x{command} 0x0D
# Zone 1 uses RC5 system 0x10, Zone 2 uses RC5 system 0x17.

- id: rc5_standby
  label: Standby (Zone 1)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0C 0x0D"
  notes: "RC5 16-12. Toggles standby for Zone 1."

- id: rc5_power_on_zone1
  label: Power On (Zone 1)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x7B 0x0D"
  notes: "RC5 16-123"

- id: rc5_power_off_zone1
  label: Power Off (Zone 1)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x7C 0x0D"
  notes: "RC5 16-124"

- id: rc5_volume_up
  label: Volume Up
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x10 0x0D"
  notes: "RC5 16-16"

- id: rc5_volume_down
  label: Volume Down
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x11 0x0D"
  notes: "RC5 16-17"

- id: rc5_mute
  label: Mute Toggle
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0D 0x0D"
  notes: "RC5 16-13"

- id: rc5_mute_on
  label: Mute On
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x1A 0x0D"
  notes: "RC5 16-26"

- id: rc5_mute_off
  label: Mute Off
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x78 0x0D"
  notes: "RC5 16-120"

- id: rc5_direct_mode
  label: Activate Direct Mode Toggle
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0A 0x0D"
  notes: "RC5 16-10"

- id: rc5_direct_mode_on
  label: Direct Mode On
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4E 0x0D"
  notes: "RC5 16-78"

- id: rc5_direct_mode_off
  label: Direct Mode Off
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4F 0x0D"
  notes: "RC5 16-79"

- id: rc5_mode_cycle
  label: Cycle Decode Mode
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x20 0x0D"
  notes: "RC5 16-32"

- id: rc5_stereo
  label: Decode Mode: Stereo
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6B 0x0D"
  notes: "RC5 16-107"

- id: rc5_multi_channel
  label: Decode Mode: Multi-Channel
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6A 0x0D"
  notes: "RC5 16-106"

- id: rc5_dolby_surround
  label: Decode Mode: Dolby Surround
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6E 0x0D"
  notes: "RC5 16-110"

- id: rc5_dts_neo6_cinema
  label: Decode Mode: DTS Neo:6 Cinema
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6F 0x0D"
  notes: "RC5 16-111"

- id: rc5_dts_neo6_music
  label: Decode Mode: DTS Neo:6 Music
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x70 0x0D"
  notes: "RC5 16-112"

- id: rc5_dts_neural_x
  label: Decode Mode: DTS Neural:X
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x71 0x0D"
  notes: "RC5 16-113"

- id: rc5_dts_virtual_x
  label: Decode Mode: DTS Virtual:X
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x73 0x0D"
  notes: "RC5 16-115"

- id: rc5_5_7ch_stereo
  label: Decode Mode: 5/7 Channel Stereo
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x45 0x0D"
  notes: "RC5 16-69"

- id: rc5_dolby_d_ex
  label: Decode Mode: Dolby D EX
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x17 0x0D"
  notes: "RC5 16-23"

# Source select (Zone 1)
- id: rc5_source_cd
  label: Source: CD
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x76 0x0D"
  notes: "RC5 16-118"

- id: rc5_source_bd
  label: Source: BD
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x62 0x0D"
  notes: "RC5 16-98"

- id: rc5_source_stb
  label: Source: STB
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x64 0x0D"
  notes: "RC5 16-100"

- id: rc5_source_av
  label: Source: AV
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x5E 0x0D"
  notes: "RC5 16-94"

- id: rc5_source_sat
  label: Source: SAT
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x1B 0x0D"
  notes: "RC5 16-27"

- id: rc5_source_pvr
  label: Source: PVR
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x60 0x0D"
  notes: "RC5 16-96"

- id: rc5_source_game
  label: Source: Game
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x61 0x0D"
  notes: "RC5 16-97"

- id: rc5_source_vcr
  label: Source: VCR
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x77 0x0D"
  notes: "RC5 16-119"

- id: rc5_source_aux
  label: Source: AUX
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x63 0x0D"
  notes: "RC5 16-99"

- id: rc5_source_net
  label: Source: NET
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x5C 0x0D"
  notes: "RC5 16-92"

- id: rc5_source_usb
  label: Source: USB
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x5D 0x0D"
  notes: "RC5 16-93"

- id: rc5_source_fm
  label: Source: FM
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x1C 0x0D"
  notes: "RC5 16-28"

- id: rc5_source_dab
  label: Source: DAB
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x48 0x0D"
  notes: "RC5 16-72"

- id: rc5_source_radio
  label: Source: Radio
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x5B 0x0D"
  notes: "RC5 16-91"

- id: rc5_source_display
  label: Source: Display
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x3A 0x0D"
  notes: "RC5 16-58"

# HDMI output select
- id: rc5_hdmi_out_1
  label: Select HDMI Out 1
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x49 0x0D"
  notes: "RC5 16-73"

- id: rc5_hdmi_out_2
  label: Select HDMI Out 2
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4A 0x0D"
  notes: "RC5 16-74"

- id: rc5_hdmi_out_1_2
  label: Select HDMI Out 1 & 2
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4B 0x0D"
  notes: "RC5 16-75"

- id: rc5_cycle_resolution
  label: Cycle Output Resolutions
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2F 0x0D"
  notes: "RC5 16-47"

# Transport / playback
- id: rc5_play
  label: Play
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x35 0x0D"
  notes: "RC5 16-53"

- id: rc5_pause
  label: Pause
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x30 0x0D"
  notes: "RC5 16-48"

- id: rc5_stop
  label: Stop
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x36 0x0D"
  notes: "RC5 16-54"

- id: rc5_rewind
  label: Rewind
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x79 0x0D"
  notes: "RC5 16-121"

- id: rc5_fast_forward
  label: Fast Forward
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x34 0x0D"
  notes: "RC5 16-52"

- id: rc5_skip_back
  label: Skip Back
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x21 0x0D"
  notes: "RC5 16-33"

- id: rc5_skip_forward
  label: Skip Forward
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0B 0x0D"
  notes: "RC5 16-11"

- id: rc5_random
  label: Random
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4C 0x0D"
  notes: "RC5 16-76"

- id: rc5_repeat
  label: Repeat
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x31 0x0D"
  notes: "RC5 16-49"

# Navigation / menu
- id: rc5_menu
  label: Menu (Enter System Menu)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x52 0x0D"
  notes: "RC5 16-82"

- id: rc5_home
  label: Home
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2B 0x0D"
  notes: "RC5 16-43 (note: same as Yellow in source table)"

- id: rc5_disc
  label: Disc / Enter Trim Menu
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x5A 0x0D"
  notes: "RC5 16-90"

- id: rc5_rtn
  label: Return (Access Subwoofer Trim)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x33 0x0D"
  notes: "RC5 16-51"

- id: rc5_nav_up
  label: Navigate Up
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x56 0x0D"
  notes: "RC5 16-86"

- id: rc5_nav_down
  label: Navigate Down
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x55 0x0D"
  notes: "RC5 16-85"

- id: rc5_nav_left
  label: Navigate Left
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x51 0x0D"
  notes: "RC5 16-81"

- id: rc5_nav_right
  label: Navigate Right
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x50 0x0D"
  notes: "RC5 16-80"

- id: rc5_ok
  label: OK
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x57 0x0D"
  notes: "RC5 16-87"

- id: rc5_red
  label: Red
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x29 0x0D"
  notes: "RC5 16-41"

- id: rc5_green
  label: Green
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2A 0x0D"
  notes: "RC5 16-42"

- id: rc5_yellow
  label: Yellow
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2B 0x0D"
  notes: "RC5 16-43 (same code as Home - source has the same RC5 code for both)"

- id: rc5_blue
  label: Blue
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x37 0x0D"
  notes: "RC5 16-55 (same as Cycle VFD in source table)"

- id: rc5_popup
  label: Pop Up / Dolby Volume On/Off
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x46 0x0D"
  notes: "RC5 16-70"

- id: rc5_audio
  label: Audio / Room EQ On/Off
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x1E 0x0D"
  notes: "RC5 16-30"

# Display
- id: rc5_disp_brightness
  label: Change VFD Brightness
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x3B 0x0D"
  notes: "RC5 16-59. Cycles Front panel off / L1 / L2."

- id: rc5_display_off
  label: Display Off
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x1F 0x0D"
  notes: "RC5 16-31"

- id: rc5_display_l1
  label: Display L1
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x22 0x0D"
  notes: "RC5 16-34"

- id: rc5_display_l2
  label: Display L2
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x23 0x0D"
  notes: "RC5 16-35"

- id: rc5_cycle_vfd
  label: Cycle VFD Information Panels
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x37 0x0D"
  notes: "RC5 16-55 (same code as Blue)"

# Setup adjustments via RC5
- id: rc5_lipsync_plus5
  label: Lipsync +5 ms
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0F 0x0D"
  notes: "RC5 16-15"

- id: rc5_lipsync_minus5
  label: Lipsync −5 ms
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x65 0x0D"
  notes: "RC5 16-101"

- id: rc5_sub_trim_plus
  label: Sub Trim +0.5 dB
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x69 0x0D"
  notes: "RC5 16-105"

- id: rc5_sub_trim_minus
  label: Sub Trim −0.5 dB
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6C 0x0D"
  notes: "RC5 16-108"

- id: rc5_bass_plus
  label: Bass +1
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2C 0x0D"
  notes: "RC5 16-44"

- id: rc5_bass_minus
  label: Bass −1
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2D 0x0D"
  notes: "RC5 16-45"

- id: rc5_treble_plus
  label: Treble +1
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2E 0x0D"
  notes: "RC5 16-46"

- id: rc5_treble_minus
  label: Treble −1
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x66 0x0D"
  notes: "RC5 16-102"

- id: rc5_balance_left
  label: Balance Left
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x26 0x0D"
  notes: "RC5 16-38"

- id: rc5_balance_right
  label: Balance Right
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x28 0x0D"
  notes: "RC5 16-40"

- id: rc5_access_bass
  label: Access Bass Control
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x27 0x0D"
  notes: "RC5 16-39"

- id: rc5_access_treble
  label: Access Treble Control
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0E 0x0D"
  notes: "RC5 16-14"

- id: rc5_access_speaker_trim
  label: Access Speaker Trim
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x25 0x0D"
  notes: "RC5 16-37"

- id: rc5_access_lipsync
  label: Access Lipsync Delay Control
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x32 0x0D"
  notes: "RC5 16-50"

# Number pad
- id: rc5_num_0
  label: Numeric 0
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x00 0x0D"
  notes: "RC5 16-0"

- id: rc5_num_1
  label: Numeric 1
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x01 0x0D"
  notes: "RC5 16-1"

- id: rc5_num_2
  label: Numeric 2
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x02 0x0D"
  notes: "RC5 16-2"

- id: rc5_num_3
  label: Numeric 3
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x03 0x0D"
  notes: "RC5 16-3"

- id: rc5_num_4
  label: Numeric 4
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x04 0x0D"
  notes: "RC5 16-4"

- id: rc5_num_5
  label: Numeric 5
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x05 0x0D"
  notes: "RC5 16-5"

- id: rc5_num_6
  label: Numeric 6
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x06 0x0D"
  notes: "RC5 16-6"

- id: rc5_num_7
  label: Numeric 7
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x07 0x0D"
  notes: "RC5 16-7"

- id: rc5_num_8
  label: Numeric 8
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x08 0x0D"
  notes: "RC5 16-8"

- id: rc5_num_9
  label: Numeric 9
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x09 0x0D"
  notes: "RC5 16-9"

- id: rc5_next_zone
  label: Change Control to Next Zone
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x5F 0x0D"
  notes: "RC5 16-95"

# ─────────── Zone 2 (RC5 system 0x17) ───────────

- id: rc5_z2_set_follow_z1
  label: Set Zone 2 to Follow Zone 1
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x14 0x0D"
  notes: "RC5 16-20. Sent on Zone 1 (system 0x10); effect is on Zone 2."

- id: rc5_z2_power_on
  label: Zone 2 Power On
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x7B 0x0D"
  notes: "RC5 23-123 (system 0x17)"

- id: rc5_z2_power_off
  label: Zone 2 Power Off
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x7C 0x0D"
  notes: "RC5 23-124"

- id: rc5_z2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x01 0x0D"
  notes: "RC5 23-1"

- id: rc5_z2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x02 0x0D"
  notes: "RC5 23-2"

- id: rc5_z2_mute
  label: Zone 2 Mute Toggle
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x03 0x0D"
  notes: "RC5 23-3"

- id: rc5_z2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x04 0x0D"
  notes: "RC5 23-4"

- id: rc5_z2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x05 0x0D"
  notes: "RC5 23-5"

- id: rc5_z2_source_cd
  label: Zone 2 Source: CD
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x06 0x0D"
  notes: "RC5 23-6"

- id: rc5_z2_source_bd
  label: Zone 2 Source: BD
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x07 0x0D"
  notes: "RC5 23-7"

- id: rc5_z2_source_stb
  label: Zone 2 Source: STB
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x08 0x0D"
  notes: "RC5 23-8"

- id: rc5_z2_source_av
  label: Zone 2 Source: AV
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x09 0x0D"
  notes: "RC5 23-9"

- id: rc5_z2_source_game
  label: Zone 2 Source: Game
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0B 0x0D"
  notes: "RC5 23-11"

- id: rc5_z2_source_aux
  label: Zone 2 Source: AUX
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0D 0x0D"
  notes: "RC5 23-13"

- id: rc5_z2_source_pvr
  label: Zone 2 Source: PVR
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0F 0x0D"
  notes: "RC5 23-15"

- id: rc5_z2_source_fm
  label: Zone 2 Source: FM
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0E 0x0D"
  notes: "RC5 23-14"

- id: rc5_z2_source_dab
  label: Zone 2 Source: DAB
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x10 0x0D"
  notes: "RC5 23-16"

- id: rc5_z2_source_usb
  label: Zone 2 Source: USB
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x12 0x0D"
  notes: "RC5 23-18"

- id: rc5_z2_source_net
  label: Zone 2 Source: NET
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x13 0x0D"
  notes: "RC5 23-19"

- id: rc5_z2_source_sat
  label: Zone 2 Source: SAT
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x14 0x0D"
  notes: "RC5 23-20"

- id: rc5_z2_source_vcr
  label: Zone 2 Source: VCR
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x15 0x0D"
  notes: "RC5 23-21"
```

## Feedbacks
```yaml
# Answer codes returned in Ac (answer) byte of every response
- id: answer_code
  type: enum
  values:
    - 0x00  # Status update / OK
    - 0x82  # Zone invalid
    - 0x83  # Command not recognised
    - 0x84  # Parameter not recognised
    - 0x85  # Command invalid at this time (e.g. tuner query when tuner not selected)
    - 0x86  # Invalid data length

- id: power_state
  type: enum
  values: [standby, on]  # 0x00 / 0x01

- id: display_brightness
  type: enum
  values: [off, L1, L2]  # 0x00 / 0x01 / 0x02

- id: headphone_connection
  type: enum
  values: [disconnected, connected]  # 0x00 / 0x01

- id: mute_state
  type: enum
  values: [muted, unmuted]  # 0x00 / 0x01

- id: direct_mode_state
  type: enum
  values: [off, on]  # 0x00 / 0x01

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, "5_7ch_stereo", dts_neural_x, reserved, dts_virtual_x]
  # 0x01 / 0x04 / 0x07 / 0x08 / 0x09 / 0x0A / 0x0B / 0x0C

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multichannel, dts_es_neural_x, dolby_surround, reserved, dts_virtual_x]
  # 0x01 / 0x02 / 0x03 / 0x06 / 0x0B / 0x0C

- id: video_output_resolution
  type: enum
  values: [sd_progressive, "720p", "1080i", "1080p", preferred, bypass, "4k"]
  # 0x02 / 0x03 / 0x04 / 0x05 / 0x06 / 0x07 / 0x08

- id: open_menu
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  # 0x00 / 0x02 / 0x03 / 0x04 / 0x05 / 0x06 / 0x07 / 0x08 / 0x09 / 0x0A

- id: source
  type: enum
  values: [follow_z1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]
  # 0x00 / 0x01 / 0x02 / 0x03 / 0x04 / 0x05 / 0x06 / 0x08 / 0x09 / 0x0B / 0x0C (AVR450/750 only) / 0x0E / 0x0F / 0x10 / 0x11

- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]  # 0x00 / 0x01 / 0x02

- id: room_eq_state
  type: enum
  values: [off, on, not_calculated]  # 0x00 / 0x01 / 0x02

- id: dolby_volume_state
  type: enum
  values: [off, on]  # 0x00 / 0x01

- id: network_playback_state
  type: enum
  values: [navigating, playing, paused, busy]  # 0x00 / 0x01 / 0x02 / 0xFF

- id: zone1_osd_state
  type: enum
  values: [on, off]  # 0x00 / 0x01 (note: inverted vs. command)

- id: hdmi_output
  type: enum
  values: [out_1, out_2, "out_1_and_2"]  # 0x02 / 0x03 / 0x04
```

## Variables
```yaml
# Tunable numeric parameters exposed via dedicated 0xNN commands
# Volume is set in 0x0D action. Other continuous levels use 0xNN set command + 0xF0 query.

- id: volume
  type: integer
  range: [0, 99]
  unit: "0-99 (no dB scale stated)"
  command: "0x21 0x{zone} 0x0D 0x01 0x{value} 0x0D"

- id: treble_db
  type: integer
  range: [-12, 12]
  unit: dB
  command: "0x21 0x{zone} 0x35 0x01 0x{encoded} 0x0D"
  notes: "0..+12dB encoded 0x00-0x0C; -1..-12dB encoded 0x81-0x8C"

- id: bass_db
  type: integer
  range: [-12, 12]
  unit: dB
  command: "0x21 0x{zone} 0x36 0x01 0x{encoded} 0x0D"
  notes: "Same encoding as treble"

- id: balance
  type: integer
  range: [-6, 6]
  command: "0x21 0x{zone} 0x3B 0x01 0x{encoded} 0x0D"
  notes: "0..+6 encoded 0x00-0x06; -1..-6 encoded 0x81-0x86"

- id: subwoofer_trim_db
  type: number
  range: [-10.0, 10.0]
  step: 0.5
  unit: dB
  command: "0x21 0x{zone} 0x3F 0x01 0x{encoded} 0x0D"
  notes: "+0..+10dB encoded 0x00-0x14 (0.5dB steps); -0.5..-10dB encoded 0x81-0x94"

- id: sub_stereo_trim_db
  type: number
  range: [-10.0, 0.0]
  step: 0.5
  unit: dB
  command: "0x21 0x01 0x45 0x01 0x{encoded} 0x0D"
  notes: "0dB encoded 0x00; -0.5..-10dB encoded 0x81-0x94"

- id: lipsync_delay_ms
  type: integer
  range: [0, 250]
  step: 5
  unit: ms
  command: "0x21 0x{zone} 0x40 0x01 0x{value} 0x0D"
  notes: "0x00-0x32 (0-250ms) in 5ms steps"

- id: compression
  type: enum
  values: [off, medium, high]  # 0x00 / 0x01 / 0x02
  command: "0x21 0x{zone} 0x41 0x01 0x{value} 0x0D"

- id: dolby_leveller
  type: integer
  range: [0, 10]
  command: "0x21 0x{zone} 0x39 0x01 0x{value} 0x0D"
  notes: "0x00-0x0A, or 0xFF to turn off"

- id: dolby_volume_calibration_offset_db
  type: integer
  range: [-15, 15]
  unit: dB
  command: "0x21 0x{zone} 0x3A 0x01 0x{encoded} 0x0D"
  notes: "0..+15dB encoded 0x00-0x0F; -1..-15dB encoded 0x80-0x8F"

- id: audio_input_type
  type: enum
  values: [analogue, digital, hdmi]  # 0x00 / 0x01 / 0x02
  command: "0x21 0x{zone} 0x0B 0x01 0x{value} 0x0D"

- id: video_input
  type: enum
  values: [bd, sat, av, pvr, vcr, game, stb]  # 0x00-0x06
  command: "0x21 0x01 0x0A 0x01 0x{value} 0x0D"

- id: hdmi_output
  type: enum
  values: [out_1, out_2, out_1_and_2]  # 0x02 / 0x03 / 0x04
  command: "0x21 0x01 0x4F 0x01 0x{value} 0x0D"

- id: zone1_osd
  type: enum
  values: [on, off]  # 0xF1 / 0xF2
  command: "0x21 0x01 0x4E 0x01 0x{value} 0x0D"

- id: vfd_display_type
  type: integer
  description: "Context-dependent on current source (see display_information_type action notes)"
  command: "0x21 0x{zone} 0x09 0x01 0x{type} 0x0D"

- id: input_name
  type: string
  max_length: 10
  command: "0x21 0x{zone} 0x20 0x{n} 0x{name_bytes} 0x0D"

- id: tuner_preset
  type: integer
  range: [1, 50]
  command: "0x21 0x{zone} 0x15 0x01 0x{value} 0x0D"

- id: fm_tune_step
  type: number
  step: 0.05
  unit: MHz
  command: "0x21 0x{zone} 0x16 0x01 0x{direction} 0x0D"
  notes: "direction: 0x00 decrement, 0x01 increment"
```

## Events
```yaml
# Unsolicited state-change notifications sent by the AV to the RC when state changes
# happen via front panel or IR remote (e.g. display brightness change, decode mode change).
# Same framing as a normal response; see specific 0xNN responses for payload format.
- id: state_change_notification
  description: "When the AV state changes due to front-panel or IR input, the appropriate 0xNN response frame is sent to the RC. Documented examples: display brightness change (0x01), decode mode change (0x10/0x11), source change (0x1D)."
```

## Macros
```yaml
# UNRESOLVED: source describes no explicit multi-step macro sequences beyond individual
# commands and IR simulation. Power-on sequencing, mode-to-input chains, etc. are not
# described as atomic macros in the source.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults  # 0x05 requires 0xAA 0xAA
  - save_restore_secure_backup  # 0x06 requires 0x55 0x55 + 4-digit PIN
  - reboot  # 0x26 requires ASCII pattern "REBOOT"
interlocks: []
# UNRESOLVED: no explicit electrical safety, interlock, or power-sequencing
# warnings documented in the source. The confirmations above are the only
# destructive-action guards stated.
```

## Notes
RS-232 and IP are separately enabled via OSD `Control` setting; disabled by default for minimum standby power. RS-232 can be enabled from the front panel by holding DIRECT for 4 seconds. IP control listens on TCP port 50000.

Cable is null-modem (pins 2-3 crossed, pin 5 ground). Frame format uses 38,400 bps, 8N1, no flow control. The device always responds to a command within 3 seconds; the controller may send further commands before a previous response is received. Commands 0xF0-0xFF are reserved for test and must not be used.

The `Simulate RC5 IR Command` (0x08) makes any IR-remote-reachable function available over the control link. Power On/Off, source selection, volume, transport, decode modes, navigation, and OSD setup are all primarily accessed this way. Most RC5 commands trigger an additional unsolicited status-update frame reflecting the new state.

Source table contains internal inconsistencies flagged in the notes field:
- RC5 16-43 is listed for both "HOME" and "Yellow"
- RC5 16-55 is listed for both "Cycle between VFD information panels" and "Blue"

AMX Duet Dynamic Device Discovery is supported by sending ASCII `AMX\r`; the unit replies with model identifier and RS232 protocol revision. Models covered: AVR390, AVR550, AVR850, AV860, SR250.

DAB-specific commands (0x0C source, 0x18, 0x19, 0x1A) apply to AVR450/AVR750 — this document applies to AVR390/AVR550/AVR850/AV860/SR250; DAB is not stated as supported on these models in the source.

Some commands fail with answer 0x85 when the OSD setup menu is open, or when a source-specific query is issued against an inactive source (e.g. FM query while on BD input).

<!-- UNRESOLVED: complete set of answer-code error conditions per command not enumerated -->
<!-- UNRESOLVED: maximum IP control connection count and behavior on concurrent access not stated -->
<!-- UNRESOLVED: IAP version (0xF5 in 0x04) and 0x1E save-in-progress guard not described in detail -->
<!-- UNRESOLVED: DAB support claim is "AVR450/750 only" in source, but spec is for AVR390/550/850/860/SR250 — applicability unverified -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:52.364Z
last_checked_at: 2026-06-02T21:39:49.328Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:39:49.328Z
matched_actions: 167
action_count: 167
confidence: medium
summary: "All 167 spec actions match verbatim source command opcodes and RC5 table entries; transport parameters confirmed. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "RS-232 connector type/pinout on chassis not specified beyond null-modem wiring"
- "TCP authentication method (if any) not stated in source; described as port 50000 only"
- "zone 2 commands beyond IR simulation not enumerated as separate 0xNN opcodes; zone 2 source select via 0x1D only"
- "maximum concurrent control connections, keepalive, reconnection behavior not specified"
- "source describes no explicit multi-step macro sequences beyond individual"
- "no explicit electrical safety, interlock, or power-sequencing"
- "complete set of answer-code error conditions per command not enumerated"
- "maximum IP control connection count and behavior on concurrent access not stated"
- "IAP version (0xF5 in 0x04) and 0x1E save-in-progress guard not described in detail"
- "DAB support claim is \"AVR450/750 only\" in source, but spec is for AVR390/550/850/860/SR250 — applicability unverified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
