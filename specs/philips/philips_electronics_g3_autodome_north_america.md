---
spec_id: admin/philips_electronics-g3-autodome
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips Electronics G3 Autodome (North America) OSRD Control Spec"
manufacturer: Philips
model_family: "G3 AutoDome"
aliases: []
compatible_with:
  manufacturers:
    - Philips
    - "Philips Electronics"
  models:
    - "G3 AutoDome"
  firmware: "5.00 or higher"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.catalog.boschbuildingtechnologies.com
source_urls:
  - https://assets.catalog.boschbuildingtechnologies.com/public/documents/OSRD_Protocol_Operation_Manual_enUS_9007201644423051.pdf
retrieved_at: 2026-07-24T20:00:59.084Z
last_checked_at: 2026-08-05T08:37:36.479Z
generated_at: 2026-08-05T08:37:36.479Z
firmware_coverage: "5.00 or higher"
protocol_coverage: []
known_gaps:
  - "Opcode 20 BiCom (explicitly excluded from G3 per source §1.1)"
  - "source gives default RS-232 parameters for receiver/drivers; applicability of those defaults to every G3 installation should be verified against hardware."
  - "trigger conditions and cadence for automatic position replies are not fully stated."
  - "source calls Opcode 3 a \"poor man's preposition\" but defines no named multi-step macro."
  - "source gives no safety warning, interlock procedure, or power-on sequence."
  - "Opcode 18 envelope layout and operation-specific get/set encoding are not shown in the refined source table; auxiliary command templates preserve documented opcode and auxiliary code without inventing missing bytes."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:37:36.479Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec actions map to OSRD opcodes documented in source; Opcode 20 BiCom correctly excluded as VG4-only. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Philips Electronics G3 Autodome (North America) OSRD Control Spec

## Summary
OSRD serial control protocol for Philips Electronics G3 AutoDome PTZ cameras. G3 supports standard opcodes 2–8 and, with firmware 5.00 or higher, extended opcodes 9, 10, 12, 15, 16, 18, and 19 over RS-232 or Bosch Biphase.

<!-- UNRESOLVED: source gives default RS-232 parameters for receiver/drivers; applicability of those defaults to every G3 installation should be verified against hardware. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from position, ping, and information queries
- levelable  # inferred from PTZ, focus, iris, and camera-level controls
```

## Actions
```yaml
- id: opcode_2_start_stop_fixed_speed
  label: Opcode 2 - Start/Stop Fixed-speed PTZ, Focus, Iris
  kind: action
  command: "<0x86><Address MSB><Address LSB><0x02><Data Byte 1><Data Byte 2><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 bits of 14-bit encoded camera number
    - name: Address LSB
      type: integer
      description: Lower 7 bits of 14-bit encoded camera number
    - name: Data Byte 1
      type: integer
      description: Pan Left, Tilt Up, Zoom Out, Focus Near, and Iris Brighter flags
    - name: Data Byte 2
      type: integer
      description: Pan Right, Tilt Down, Zoom In, Focus Far, and Iris Darker flags
    - name: checksum
      type: integer
      description: Lower 7 bits of sum of all preceding bytes

- id: opcode_3_fixed_speed_durational
  label: Opcode 3 - Fixed-speed PTZ for Specified Period
  kind: action
  command: "<0x86><Address MSB><Address LSB><0x03><Data Byte 1><Data Byte 2><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: Data Byte 1
      type: integer
      description: Six-bit half-second duration and Focus Far flag
    - name: Data Byte 2
      type: integer
      description: Focus Near, Zoom In/Out, Tilt Up/Down, and Pan Left/Right flags
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_4_repetitive_fixed_speed_ptz
  label: Opcode 4 - Repetitive Fixed-speed PTZ
  kind: action
  command: "<0x86><Address MSB><Address LSB><0x04><Data Byte 1><Data Byte 2><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: Data Byte 1
      type: integer
      description: Fixed bits and Focus Far flag
    - name: Data Byte 2
      type: integer
      description: Focus Near, Zoom In/Out, Tilt Up/Down, and Pan Left/Right flags
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_5_start_stop_variable_speed_ptz
  label: Opcode 5 - Start/Stop Variable-speed PTZ
  kind: action
  command: "<0x86><Address MSB><Address LSB><0x05><Data Byte 1><Data Byte 2><Data Byte 3><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: Data Byte 1
      type: integer
      description: Zoom speed and tilt speed
    - name: Data Byte 2
      type: integer
      description: Pan speed, iris direction, and Focus Far
    - name: Data Byte 3
      type: integer
      description: Focus Near, Zoom In/Out, Tilt Up/Down, and Pan Left/Right flags
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_6_repetitive_fixed_speed_zoom_focus_iris
  label: Opcode 6 - Repetitive Fixed-speed Zoom, Focus, Iris
  kind: action
  command: "<0x86><Address MSB><Address LSB><0x06><Data Byte 1><Data Byte 2><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: Data Byte 1
      type: integer
      description: Unused data byte
    - name: Data Byte 2
      type: integer
      description: Iris Brighter/Darker, Focus Far/Near, and Zoom In/Out flags
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_7_aux_preposition
  label: Opcode 7 - Auxiliary ON/OFF and Preposition SET/SHOT
  kind: action
  command: "<0x86><Address MSB><Address LSB><0x07><Data Byte 1><Data Byte 2><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: Data Byte 1
      type: integer
      description: Data bits 9-7 and four-bit function code
    - name: Data Byte 2
      type: integer
      description: Data bits 6-0 of auxiliary or pre-position number
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_8_repetitive_variable_speed_ptz
  label: Opcode 8 - Repetitive Variable-speed PTZ, Focus, Iris
  kind: action
  command: "<0x86><Address MSB><Address LSB><0x08><Data Byte 1><Data Byte 2><Data Byte 3><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: Data Byte 1
      type: integer
      description: Zoom speed and tilt speed
    - name: Data Byte 2
      type: integer
      description: Pan speed, iris direction, and Focus Far
    - name: Data Byte 3
      type: integer
      description: Focus Near, Zoom In/Out, Tilt Up/Down, and Pan Left/Right flags
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_9_fine_speed_ptz
  label: Opcode 9 - Fine Speed PTZ
  kind: action
  command: "<0x86><Address MSB><Address LSB><0x09><Data Byte 1><Data Byte 2><Data Byte 3><Data Byte 4><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: Data Byte 1
      type: integer
      description: Pan speed 0-127, representing 1-128 degrees per second
    - name: Data Byte 2
      type: integer
      description: Tilt speed 0-127, representing 1-128 degrees per second
    - name: Data Byte 3
      type: integer
      description: Zoom speed, iris direction, and Focus Far
    - name: Data Byte 4
      type: integer
      description: Focus Near, Zoom In/Out, Tilt Up/Down, and Pan Left/Right flags
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_10_position_report_4byte
  label: Opcode 10 - Position Report Query
  kind: query
  command: "<0x84><Address MSB><Address LSB><0x0A><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_10_position_command_long
  label: Opcode 10 - Position Command
  kind: action
  command: "<0x8A|0x9C|0x90|0x91><Address MSB><Address LSB><0x0A><Pan Position Data Byte 1><Pan Position Data Byte 2><Pan Position Data Byte 3><Tilt Position Data Byte 1><Tilt Position Data Byte 2><Tilt Position Data Byte 3>[Pan Velocity/Acceleration Data Byte][Tilt Velocity/Acceleration Data Byte][Zoom/Focus/Iris Configuration and LSBs][Zoom Position Data Byte][Focus Position Data Byte][Iris Position Data Byte][Camera Setting Data Byte]<checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: pan_position
      type: integer
      description: Absolute pan position 0-127999
    - name: tilt_position
      type: integer
      description: Absolute tilt position 0-31999
    - name: pan_velocity
      type: integer
      description: Optional value 0-7 for packet lengths 12 or greater
    - name: pan_acceleration
      type: integer
      description: Optional value 0-7 for packet lengths 12 or greater
    - name: tilt_velocity
      type: integer
      description: Optional value 0-7 for packet lengths 12 or greater
    - name: tilt_acceleration
      type: integer
      description: Optional value 0-7 for packet lengths 12 or greater
    - name: zoom_position
      type: integer
      description: Optional value 0x04-0xAA or 0xFF to ignore
    - name: focus_position
      type: integer
      description: Optional value 0x08-0xFE or 0xFF to ignore
    - name: iris_position
      type: integer
      description: Optional value 0x31-0xCF or 0xFF to ignore
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_12_ping_no_data
  label: Opcode 12 - Ping Without Data
  kind: query
  command: "<0x86><Address MSB><Address LSB><0x0C><0x00><Data Requested Data Byte><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: Data Requested Data Byte
      type: integer
      description: Requested-data flags
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_12_ping_with_data
  label: Opcode 12 - Ping With Data
  kind: query
  command: "<0x86><Address MSB><Address LSB><0x0C><0x01><Data Requested Data Byte><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: Data Requested Data Byte
      type: integer
      description: Camera settings, lens mode, iris, focus, zoom, tilt, and pan query flags
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_15_info_request
  label: Opcode 15 - Information Request
  kind: query
  command: "<0x87><Address MSB><Address LSB><0x0F><Data Requested Data Byte><AutoDome Data Requested Data Byte><Tracking Components Data Byte><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: Data Requested Data Byte
      type: integer
      description: AutoTrack, AutoDome information, tracking mode, and frequency flags
    - name: AutoDome Data Requested Data Byte
      type: integer
      description: Device type, software version, line lock delay, camera settings, and E-Zoom flags
    - name: Tracking Components Data Byte
      type: integer
      description: Camera, lens, iris, focus, zoom, tilt, and pan query flags
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_16_title_set
  label: Opcode 16 - Title Set
  kind: action
  command: "<0x8X><Address MSB><Address LSB><0x10><TitleNumber><Char1>…<Char16><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: TitleNumber
      type: integer
      description: 1-99 for shots or 100-116 for zones
    - name: Title
      type: string
      description: Maximum 16 ASCII characters; leading spaces included
    - name: checksum
      type: integer
      description: Lower 7 bits of sum; length is 0x85 plus character count

- id: opcode_18_aux_with_data
  label: Opcode 18 - Auxiliary Command With Data
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><Auxiliary Code><Data><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: Auxiliary Code
      type: integer
      description: Auxiliary command code
    - name: Data
      type: integer
      description: Auxiliary-specific pre-encoded or full-range data
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_19_set_position
  label: Opcode 19 - Set Position
  kind: action
  command: "<0x8B><Address MSB><Address LSB><0x13><Ignore Data><Pan Position Data Byte 1><Pan Position Data Byte 2><Tilt Position Data Byte 1><Tilt Position Data Byte 2><Focal Length Data Byte 1><Focal Length Data Byte 2><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: Ignore Data
      type: integer
      description: Ignore Zoom, Ignore Tilt, and Ignore Pan flags
    - name: pan_position
      type: integer
      description: Pan in radians multiplied by 1000
    - name: tilt_position
      type: integer
      description: Tilt in radians multiplied by 1000
    - name: focal_length
      type: integer
      description: Focal length in millimeters multiplied by 10
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_19_get_position
  label: Opcode 19 - Get Position
  kind: query
  command: "<0x84><Address MSB><Address LSB><0x13><checksum>"
  params:
    - name: Address MSB
      type: integer
      description: Upper 7 address bits
    - name: Address LSB
      type: integer
      description: Lower 7 address bits
    - name: checksum
      type: integer
      description: Lower 7 bits of sum

- id: opcode_18_iris_control
  label: Opcode 18 Auxiliary 3 - Iris Control
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><3><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Auto, 1=Manual

- id: opcode_18_focus_control
  label: Opcode 18 Auxiliary 4 - Focus Control
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><4><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Spot, 1=Continuous Auto, 2=Continuous Manual

- id: opcode_18_return_on
  label: Opcode 18 Auxiliary 9 - Return On
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><9><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Off, 1=Preset 1, 2=Previous Aux

- id: opcode_18_autoiris_level
  label: Opcode 18 Auxiliary 11 - AutoIris Level Adjustment
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><11><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Step 1-15

- id: opcode_18_autopan_speed
  label: Opcode 18 Auxiliary 14 - AutoPan Speed
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><14><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 1-60 degrees per second

- id: opcode_18_preposition_tour_period
  label: Opcode 18 Auxiliary 15 - Pre-position Tour Period
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><15><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Zero-based index into 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 120, 180, 240, 300, 600 seconds

- id: opcode_18_autopivot
  label: Opcode 18 Auxiliary 18 - AutoPivot
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><18><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Off, 1=On

- id: opcode_18_backlight_compensation
  label: Opcode 18 Auxiliary 20 - Backlight Compensation
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><20><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Off, 1=On

- id: opcode_18_electronic_shutter
  label: Opcode 18 Auxiliary 23 - Electronic Shutter
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><23><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Shutter index 0-21 as defined separately for NTSC and PAL

- id: opcode_18_electronic_stabilization
  label: Opcode 18 Auxiliary 24 - Electronic Stabilization
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><24><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Off, 1=On; 25X camera only

- id: opcode_18_white_balance
  label: Opcode 18 Auxiliary 30 - White Balance
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><30><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Auto, 1=Indoor, 2=Outdoor, 3=One Push, 4=Extended Auto

- id: opcode_18_line_lock_phase
  label: Opcode 18 Auxiliary 41 - Line Lock Phase Adjust
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><41><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0-359 degrees

- id: opcode_18_sync_mode
  label: Opcode 18 Auxiliary 42 - Sync Mode
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><42><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Line Lock, 1=Crystal

- id: opcode_18_agc
  label: Opcode 18 Auxiliary 43 - AGC Maximum Gain
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><43><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 1=8 dB, 2=12 dB, 3=16 dB, 4=20 dB, 5=24 dB, 6=28 dB

- id: opcode_18_aperture_correction
  label: Opcode 18 Auxiliary 44 - Aperture Correction
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><44><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Step 1-16

- id: opcode_18_night_mode
  label: Opcode 18 Auxiliary 56 - Night Mode
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><56><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Off, 1=On, 2=Auto

- id: opcode_18_ire
  label: Opcode 18 Auxiliary 58 - IRE
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><58><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Source-defined step 1-10

- id: opcode_18_osd
  label: Opcode 18 Auxiliary 60 - On-screen Display
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><60><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Off, 1=On

- id: opcode_18_osd_adjust
  label: Opcode 18 Auxiliary 61 - On-screen Display Adjust
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><61><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Bits 7-0 line number; bits 15-8 brightness

- id: opcode_18_alarm_relay_state
  label: Opcode 18 Auxiliary 65 - Alarm/Relay State
  kind: query
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><65><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Alarm inputs in bits 3-0 and set/get relay output in bit 4

- id: opcode_18_software_version
  label: Opcode 18 Auxiliary 66 - Display Software Version
  kind: query
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><66><Data><checksum>"
  params: []

- id: opcode_18_digital_zoom
  label: Opcode 18 Auxiliary 80 - Digital Zoom
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><80><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Disable, 1=Enable

- id: opcode_18_sector_masking
  label: Opcode 18 Auxiliary 86 - Sector Masking
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><86><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Bits 15-0 represent sectors 1-16

- id: opcode_18_zoom_polarity
  label: Opcode 18 Auxiliary 91 - Zoom Polarity
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><91><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Normal, 1=Reversed

- id: opcode_18_focus_polarity
  label: Opcode 18 Auxiliary 92 - Focus Polarity
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><92><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Normal, 1=Reversed

- id: opcode_18_iris_polarity
  label: Opcode 18 Auxiliary 93 - Iris Polarity
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><93><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Normal, 1=Reversed

- id: opcode_18_ptz_fixed_speed
  label: Opcode 18 Auxiliary 201 - PTZ Fixed-speed Control Speed
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><201><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Step 1-15

- id: opcode_18_focus_speed
  label: Opcode 18 Auxiliary 202 - Focus Speed
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><202><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Step 1-8

- id: opcode_18_iris_speed
  label: Opcode 18 Auxiliary 203 - Iris Speed
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><203><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Step 1-10

- id: opcode_18_inactivity_period
  label: Opcode 18 Auxiliary 204 - Inactivity Period
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><204><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Zero-based index into 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 120, 180, 240, 300, 600 seconds

- id: opcode_18_max_zoom_speed
  label: Opcode 18 Auxiliary 205 - Maximum Zoom Speed
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><205><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: 0=Slowest, 1=Medium, 2=Fastest

- id: opcode_18_unique_identifier
  label: Opcode 18 Auxiliary 206 - Unique Identifier
  kind: query
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><206><Data><checksum>"
  params: []

- id: opcode_18_password
  label: Opcode 18 Auxiliary 207 - Password
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><207><Data><checksum>"
  params:
    - name: Data
      type: string
      description: Password in BCD format; credential value unresolved and must not be inferred

- id: opcode_18_boot_code_revision
  label: Opcode 18 Auxiliary 208 - Boot Code Revision
  kind: query
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><208><Data><checksum>"
  params: []

- id: opcode_18_alarm_setup
  label: Opcode 18 Auxiliary 209 - Alarm Setup Information
  kind: action
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x12><209><Data><checksum>"
  params:
    - name: Data
      type: integer
      description: Alarm type, go-to-shot, OSD, transmit, and tracking bit fields
```

## Feedbacks
```yaml
- id: opcode_10_position_report
  type: object
  description: Opcode 0x0A reply containing pan and tilt positions
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x87><0x0A><Pan Position Data Byte 1><Pan Position Data Byte 2><Pan Position Data Byte 3><Tilt Position Data Byte 1><Tilt Position Data Byte 2><Tilt Position Data Byte 3><checksum>"
  fields:
    - name: pan_position
      type: integer
      range: 0..127999
    - name: tilt_position
      type: integer
      range: 0..31999

- id: opcode_12_ping_reply_no_data
  type: object
  description: Ping type 0 communication reply
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x4C><0x00><0x00><0x00><0x00><checksum>"
  fields:
    - name: ping_type
      type: integer
      value: 0

- id: opcode_12_ping_reply
  type: object
  description: Ping type 1 reply carrying requested fields
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x4C><0x01><Data Requested Data Byte><…Requested Data…><checksum>"
  fields:
    - name: ping_type
      type: integer
      value: 1
    - name: requested_data
      type: bytes
      description: Requested pan, tilt, zoom, focus, iris, lens mode, or camera settings

- id: opcode_15_info_reply
  type: object
  description: Requested AutoDome information reply
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x4F><Data Requested Data Byte><Autodome Data Requested Data Byte><0x00><…Requested Data…><checksum>"
  fields:
    - name: autodome_generation
      type: enum
      values: [0x02, 0x03]
    - name: camera_type
      type: enum
      values: [0x42, 0x43]
    - name: maximum_lens_zoom
      type: integer
    - name: software_version
      type: string
    - name: line_lock_delay
      type: integer
    - name: backlight_compensation
      type: boolean
    - name: agc
      type: boolean
    - name: white_balance
      type: enum
      values: [0x00, 0x01, 0x10, 0x11]
    - name: e_zoom
      type: integer

- id: opcode_15_automatic_position_reply
  type: object
  description: Unsolicited automatic tracking-position reply
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x4F><0x40><0x00><Tracking Components Data Byte><…Requested Data…><checksum>"
  fields:
    - name: pan_position
      type: integer
      range: 0..127999
    - name: tilt_position
      type: integer
      range: 0..31999
    - name: zoom_position
      type: integer
      range: 0x04..0xAA
    - name: focus_position
      type: integer
      range: 0x08..0xFE
    - name: iris_position
      type: integer
      range: 0x31..0xCF
    - name: autofocus
      type: boolean
    - name: autoiris
      type: boolean

- id: opcode_19_get_position_reply
  type: object
  description: G3 12-byte position reply
  command: "<0x8B><Address MSB><Address LSB><0x53><Ignore Data><Pan Position Data Byte 1><Pan Position Data Byte 2><Tilt Position Data Byte 1><Tilt Position Data Byte 2><Focal Length Data Byte 1><Focal Length Data Byte 2><checksum>"
  fields:
    - name: ignore_data
      type: integer
    - name: pan_position_rad_x1000
      type: integer
    - name: tilt_position_rad_x1000
      type: integer
    - name: focal_length_mm_x10
      type: integer

- id: opcode_18_alarm_relay_state_reply
  type: object
  description: Auxiliary 65 alarm-input and relay-output state
  fields:
    - name: alarm_input_state
      type: integer
    - name: relay_output_active
      type: boolean

- id: opcode_18_software_version_reply
  type: object
  description: Auxiliary 66 software version
  fields:
    - name: major
      type: integer
    - name: minor
      type: integer

- id: opcode_18_unique_identifier_reply
  type: string
  description: Auxiliary 206 FastAddress unique identifier burned into program flash

- id: opcode_18_boot_code_revision_reply
  type: object
  description: Auxiliary 208 boot-code revision
  fields:
    - name: major
      type: integer
    - name: minor
      type: integer
```

## Variables
```yaml
- id: pan_position
  type: integer
  range: 0..127999
  description: Pan position; 0 is Home and 127999 represents full 360-degree rotation
- id: tilt_position
  type: integer
  range: 0..31999
  description: Tilt position; 0 is Home and 31999 represents 90-degree tilt
- id: zoom_position
  type: integer
  range: 0x04..0xAA
  description: 0xFF means ignore in Opcode 10 position commands
- id: focus_position
  type: integer
  range: 0x08..0xFE
  description: 0xFF means ignore in Opcode 10 position commands
- id: iris_position
  type: integer
  range: 0x31..0xCF
  description: 0xFF means ignore in Opcode 10 position commands
- id: pan_velocity
  type: integer
  range: 0..7
  description: Evenly spaced speeds from 10 to 130 degrees per second
- id: pan_acceleration
  type: integer
  range: 0..7
  description: Evenly spaced acceleration from 10 to 130 degrees per second squared
- id: tilt_velocity
  type: integer
  range: 0..7
  description: Evenly spaced speeds from 10 to 130 degrees per second
- id: tilt_acceleration
  type: integer
  range: 0..7
  description: Evenly spaced acceleration from 10 to 130 degrees per second squared
- id: zoom_speed
  type: integer
  range: 0..7
  description: 0=slowest, 7=fastest
- id: tilt_speed
  type: integer
  range: 0..15
  description: 0=slowest, 15=fastest
- id: pan_speed
  type: integer
  range: 0..15
  description: 0=slowest, 15=fastest
- id: white_balance
  type: enum
  values: [0x00, 0x01, 0x10, 0x11]
  description: 0x00=Automatic, 0x01=Indoor, 0x10=Outdoor, 0x11=One-push
- id: autofocus
  type: boolean
- id: autoiris
  type: boolean
- id: backlight_compensation
  type: boolean
- id: agc
  type: boolean
- id: focal_length_mm_x10
  type: integer
  description: Focal length multiplied by 10
- id: autopan_speed_degrees_per_second
  type: integer
  range: 1..60
- id: line_lock_phase_degrees
  type: integer
  range: 0..359
- id: aperture_correction
  type: integer
  range: 1..16
- id: ptz_fixed_speed
  type: integer
  range: 1..15
- id: focus_speed
  type: integer
  range: 1..8
- id: iris_speed
  type: integer
  range: 1..10
- id: max_zoom_speed
  type: enum
  values: [0, 1, 2]
  description: 0=Slowest, 1=Medium, 2=Fastest
```

## Events
```yaml
- id: opcode_15_automatic_position
  description: Automatic position reply using opcode 0x4F and data-request byte 0x40
  command: "<length byte w/Bit7 set><Address MSB><Address LSB><0x4F><0x40><0x00><Tracking Components Data Byte><…Requested Data…><checksum>"
# UNRESOLVED: trigger conditions and cadence for automatic position replies are not fully stated.
```

## Macros
```yaml
# UNRESOLVED: source calls Opcode 3 a "poor man's preposition" but defines no named multi-step macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source gives no safety warning, interlock procedure, or power-on sequence.
```

## Notes
- Extended opcodes 9, 10, 12, 15, 16, 18, and 19 require G3 AutoDome firmware 5.00 or higher.
- Packet starts with length byte whose bit 7 is set. Every other OSRD byte has bit 7 cleared.
- Address is 14-bit encoded camera number minus one. Camera range is 1-16384.
- Checksum is sum of all preceding bytes, including length byte, bitwise AND 0x7F.
- Repetitive opcodes 4, 6, and 8 require transmission at no less than 20 Hz.
- If conflicting movement bits are set, result is undefined, but source says device resolves conflict without damage.
- New command aborts old command still being processed.
- G3 does not support Opcode 7 Aux Toggle, Aux On Latch, Aux Off Latch, or Cancel Latch Aux functions.
- Opcode 19 Set returns no reply.
- Opcode 16 overwrites prior titles and accepts at most 16 ASCII characters.
- Source also documents Opcode 20 BiCom tunneling, but support table limits it to VG4; it is not part of this G3 action set.
- Source gives RS-232 defaults as 9600 baud, 8 data bits, no parity, one stop bit, and no handshake.
- Bosch Biphase is an alternate electrical interface, but no separate AI4AV transport enum or complete configuration is stated.

<!-- UNRESOLVED: Opcode 18 envelope layout and operation-specific get/set encoding are not shown in the refined source table; auxiliary command templates preserve documented opcode and auxiliary code without inventing missing bytes. -->

## Provenance

```yaml
source_domains:
  - assets.catalog.boschbuildingtechnologies.com
source_urls:
  - https://assets.catalog.boschbuildingtechnologies.com/public/documents/OSRD_Protocol_Operation_Manual_enUS_9007201644423051.pdf
retrieved_at: 2026-07-24T20:00:59.084Z
last_checked_at: 2026-08-05T08:37:36.479Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:37:36.479Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec actions map to OSRD opcodes documented in source; Opcode 20 BiCom correctly excluded as VG4-only. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Opcode 20 BiCom (explicitly excluded from G3 per source §1.1)"
- "source gives default RS-232 parameters for receiver/drivers; applicability of those defaults to every G3 installation should be verified against hardware."
- "trigger conditions and cadence for automatic position replies are not fully stated."
- "source calls Opcode 3 a \"poor man's preposition\" but defines no named multi-step macro."
- "source gives no safety warning, interlock procedure, or power-on sequence."
- "Opcode 18 envelope layout and operation-specific get/set encoding are not shown in the refined source table; auxiliary command templates preserve documented opcode and auxiliary code without inventing missing bytes."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
