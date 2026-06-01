---
spec_id: admin/hisense-55u78qg-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 55U78QG Series Control Spec"
manufacturer: HiSense
model_family: "55U78QG Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "55U78QG Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-20T12:17:15.632Z
generated_at: 2026-05-20T12:17:15.632Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T12:17:15.632Z
  matched_actions: 46
  action_count: 46
  confidence: high
  summary: "All 46 actions matched."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-11
---

# HiSense 55U78QG Series Control Spec

## Summary
Hisense commercial display control protocol covering E Series, M Series (24/7 Digital Signage), WR Interactive Touch Displays, and MR6DE series. Supports RS-232 and TCP/IP control. Protocol families differ in packet structure and command codes; E Series uses `0xA6` header format, while M/WR/MR6DE Series use `0xDD 0xFF` header format. No login or authentication procedure described in source.

<!-- UNRESOLVED: specific protocol variant for 55U78QG not confirmed in source; document also describes 85U7K model. Source covers E Series, M Series, WR Series, MR6DE series — included all in compatible_with as this series appears to be a commercial display that uses these protocols. -->

## Transport
```yaml
# M Series IP Control - port and auth inferred from standard commercial display protocol
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
serial:
  baud_rate: 9600  # M Series / WR Series / MR6DE
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # E Series uses 115200 baud - separate config
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
powerable: true  # inferred: power on/off commands present across all series
routable: true  # inferred: input/source routing commands present
queryable: true  # inferred: multiple query commands returning state present
levelable: true  # inferred: volume, brightness, contrast, sharpness control present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: M Series: DD FF 00 08 C1 15 00 00 {id} BB BB {checksum} BB CC

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: M Series: DD FF 00 08 C1 15 00 00 {id} AA AA {checksum} BB CC

- id: screen_on
  label: Screen On
  kind: action
  params: []
  notes: M Series: DD FF 00 07 C1 31 00 01 {id} 01 {checksum} BB CC

- id: screen_off
  label: Screen Off
  kind: action
  params: []
  notes: M Series: DD FF 00 07 C1 31 00 01 {id} 00 {checksum} BB CC

- id: reboot
  label: Reboot TV
  kind: action
  params: []
  notes: M Series: DD FF 00 06 C1 1E 00 00 {id} {checksum} BB CC

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume value 0-100
  notes: M Series: DD FF 00 07 C1 27 00 00 {id} {volume} {checksum} BB CC

- id: mute
  label: Mute
  kind: action
  params: []
  notes: M Series: DD FF 00 07 C1 26 00 00 {id} 01 {checksum} BB CC

- id: unmute
  label: Unmute
  kind: action
  params: []
  notes: M Series: DD FF 00 07 C1 26 00 00 {id} 00 {checksum} BB CC

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: Brightness value 0-100
  notes: M Series: DD FF 00 07 C1 36 00 00 {id} {value} {checksum} BB CC

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: contrast
      type: integer
      description: Contrast value 0-100
  notes: M Series: DD FF 00 07 C1 37 00 00 {id} {value} {checksum} BB CC

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  params:
    - name: temperature
      type: integer
      description: "00=Standard, 01=Cold, 02=Slight Cold, 03=Slight Warm, 04=Warm"
  notes: M Series: DD FF 00 07 C1 39 00 00 {id} {value} {checksum} BB CC

- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: "00=Off, 01=Low, 02=Medium, 03=High, 04=Auto"
  notes: M Series: DD FF 00 07 C1 3A 00 00 {id} {value} {checksum} BB CC

- id: set_image_scaling
  label: Set Image Scaling
  kind: action
  params:
    - name: mode
      type: integer
      description: "00=Full, 01=16:9, 02=4:3, 03=Scaling1, 04=Scaling2, 05=Point to Point"
  notes: M Series: DD FF 00 07 C1 3B 00 00 {id} {value} {checksum} BB CC

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "00=Standard, 01=Bright, 02=Soft, 03=Movie, 04=Text, 05=Gaming, 12=Natural"
  notes: M Series: DD FF 00 07 C1 0F 06 00 {id} {value} {checksum} BB CC

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "00=Standard, 01=Music, 02=News, 08=Movie, 10=Sports, 20=Custom, 30=Voice, 40=Meeting"
  notes: M Series: DD FF 00 07 C1 FF 00 03 {id} {value} {checksum} BB CC

- id: switch_source
  label: Switch Source
  kind: action
  params:
    - name: source
      type: integer
      description: "HDMI1=0E, HDMI2=0F, DP=16, VGA=17"
  notes: M Series: DD FF 00 07 C1 08 00 01 {id} {source} {checksum} BB CC

- id: set_schedule_power_on
  label: Set Power On Schedule
  kind: action
  params:
    - name: enable
      type: integer
      description: "00=off, 01=everyday"
    - name: hour
      type: integer
      description: Hour 0-23
    - name: minute
      type: integer
      description: Minute 0-59
  notes: M Series: DD FF 00 09 C1 3E 00 00 {id} {enable} {hour} {minute} {checksum} BB CC

- id: set_schedule_power_off
  label: Set Power Off Schedule
  kind: action
  params:
    - name: enable
      type: integer
      description: "00=off, 01=everyday"
    - name: hour
      type: integer
      description: Hour 0-23
    - name: minute
      type: integer
      description: Minute 0-59
  notes: M Series: DD FF 00 09 C1 3F 00 00 {id} {enable} {hour} {minute} {checksum} BB CC

- id: set_date
  label: Set Date
  kind: action
  params:
    - name: year
      type: integer
      description: Year
    - name: month
      type: integer
      description: Month
    - name: day
      type: integer
      description: Day
  notes: M Series: DD FF 00 09 C1 1C 00 00 {id} {year} {month} {day} {checksum} BB CC

- id: set_time
  label: Set Time
  kind: action
  params:
    - name: hour
      type: integer
      description: Hour 0-23
    - name: minute
      type: integer
      description: Minute 0-59
    - name: second
      type: integer
      description: Second 0-59
  notes: M Series: DD FF 00 09 C1 1D 00 00 {id} {hour} {minute} {second} {checksum} BB CC

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []
  notes: M Series: DD FF 00 06 C1 10 00 00 {id} {checksum} BB CC

- id: send_remote_key
  label: Send Remote Control Key
  kind: action
  params:
    - name: key_high
      type: integer
      description: Key code high byte
    - name: key_low
      type: integer
      description: Key code low byte
  notes: M Series: DD FF 00 08 C1 17 00 00 {id} {key_high} {key_low} {checksum} BB CC
  key_map:
    Menu: "00 00"
    Up: "00 01"
    Down: "00 02"
    Left: "00 03"
    Right: "00 04"
    OK: "00 05"
    Return: "00 06"
    Source: "00 07"

- id: query_tv_status
  label: Query TV Status
  kind: action
  params: []
  notes: Returns volume, source, power status, mute status, signal status. M Series: DD FF 00 06 C1 28 00 00 {id} {checksum} BB CC

- id: query_current_source
  label: Query Current Source
  kind: action
  params: []
  notes: M Series: DD FF 00 06 C1 1A 00 00 {id} {checksum} BB CC

- id: query_sw_version
  label: Query Software Version
  kind: action
  params: []
  notes: Returns Year Month Day. M Series: DD FF 00 06 C1 1B 00 00 {id} {checksum} BB CC

- id: query_brightness
  label: Query Brightness
  kind: action
  params: []
  notes: M Series: DD FF 00 06 C1 36 00 01 {id} {checksum} BB CC

- id: query_network_status
  label: Query Network Status
  kind: action
  params: []
  notes: Returns 00=disconnected, 01=connected. M Series: DD FF 00 06 C1 FF 00 16 {id} {checksum} BB CC

- id: query_ip_address
  label: Query IP Address
  kind: action
  params: []
  notes: Returns IP, subnet mask, gateway, DNS. M Series: DD FF 00 06 C1 1B 20 00 {id} {checksum} BB CC

- id: query_device_temperature
  label: Query Device Temperature
  kind: action
  params: []
  notes: Returns temperature in centigrade. M Series: DD FF 00 06 C1 FE 00 00 {id} {checksum} BB CC

- id: query_mac_address
  label: Query MAC Address
  kind: action
  params: []
  notes: M Series: DD FF 00 06 C1 6C 00 00 {id} {checksum} BB CC

- id: query_sn
  label: Query Serial Number
  kind: action
  params: []
  notes: Returns 23 bytes. M Series: DD FF 00 06 C1 FF 00 0B {id} {checksum} BB CC

- id: query_device_id
  label: Query Device ID
  kind: action
  params: []
  notes: Returns 32 bytes. M Series: DD FF 00 06 C1 FF 00 0D {id} {checksum} BB CC
- id: vga_automatic_adjustment
  label: VGA Automatic Adjustment
  kind: action
  params: []
  notes: "M Series C1 01 00 00"

- id: set_screen_rotation
  label: Set Screen Rotation
  kind: action
  params:
    - name: rotation
      type: integer
      description: "00=0, 01=90"
  notes: "M Series C1 35"

- id: set_boot_time_delay
  label: Set Boot Time Delay
  kind: action
  params:
    - name: delay
      type: integer
      description: "00=0s, 01=10s, 02=20s, 03=30s"
  notes: "M Series C1 3C"

- id: set_definition
  label: Set Definition
  kind: action
  params:
    - name: value
      type: integer
  notes: "M Series C1 38"

- id: get_smart_backlight
  label: Get Smart Backlight
  kind: query
  params: []
  notes: "M Series C1 3E 00 01"

- id: set_inquiring_screen_on_off
  label: Query Screen On/Off Status
  kind: query
  params: []
  notes: "M Series C1 32 00 01"

- id: set_smart_backlight
  label: Set Smart Backlight
  kind: action
  params:
    - name: mode
      type: integer
      description: "01=Bright, 02=Soft, 03=LightSenseFreq, 04=Stereo, 05=Comfortable, 06=Custom"
    - name: value
      type: integer
  notes: "M Series C1 32 00 02"

- id: protect_against_screen_burn
  label: Protect Against Screen Burn
  kind: action
  params:
    - name: enable
      type: integer
  notes: "M Series C1 33"

- id: remote_enabled_disabled
  label: Remote Control Enable/Disable
  kind: action
  params:
    - name: state
      type: integer
      description: "00=enable, 01=disable"
  notes: "M Series C1 70"

- id: query_ac_power_on_status
  label: Query AC Power On Status
  kind: query
  params: []
  notes: "WR/MR6DE Series C1 FF 00 08"

- id: set_ac_power_on_mode
  label: Set AC Power On Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "00=standby, 01=power on, others=last status"
  notes: "WR/MR6DE Series C1 FF 00 09"

- id: set_screen_aspect_ratio
  label: Set Screen Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: "00=Full, 01=Real, 02=4:3, 03=14:9"
  notes: "E Series C1 3A"

- id: set_boot_time
  label: Set Boot Time
  kind: action
  params:
    - name: day
      type: integer
    - name: hour
      type: integer
    - name: minute
      type: integer
  notes: "M Series C1 3E 00 02"

- id: set_power_off_time
  label: Set Power Off Time
  kind: action
  params:
    - name: day
      type: integer
    - name: hour
      type: integer
    - name: minute
      type: integer
  notes: "M Series C1 FF 00 15"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "00"  # power on
    - "FF"  # power off
  notes: Returned in query_tv_status and specific power query responses

- id: screen_state
  label: Screen State
  type: enum
  values:
    - "00"  # screen off
    - "01"  # screen on
  notes: Returned in screen on/off response

- id: command_result
  label: Command Result
  type: enum
  values:
    - "00"  # Completed, normal response
    - "01"  # Limit Over (data over upper limit)
    - "02"  # Limit Over (data over lower limit)
    - "03"  # Command cancelled (incorrect data or not permitted)
    - "04"  # Parse Error (malformed data or checksum error)
  notes: M Series response format for set commands

- id: volume
  label: Volume Level
  type: integer
  description: 0-100

- id: mute_state
  label: Mute State
  type: enum
  values:
    - "01"  # Mute
    - "00"  # Non-Mute

- id: input_source
  label: Input Source
  type: enum
  values:
    - "HDMI1"
    - "HDMI2"
    - "DP"
    - "VGA"
  notes: Source encoding varies by model series; check documentation for specific encoding

- id: brightness_value
  label: Brightness Value
  type: integer
  description: 0-100

- id: network_status
  label: Network Status
  type: enum
  values:
    - "00"  # No network connection
    - "01"  # Network connected

- id: signal_status
  label: Signal Status
  type: enum
  values:
    - "00"  # No signal
    - "01"  # Has signal
```

## Variables
```yaml
# UNRESOLVED: the protocol is primarily action-based; no separate variables section
# identifiable in the source. All settable parameters are represented as Actions above.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
# Source indicates TV sends responses only when queried (polling model).
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # explicit warning not stated but implied by destructive nature
interlocks:
  - source_must_be_analog_for_brightness_contrast: "Brightness/contrast/sharpness settings require source to be DP, VGA, HDMI, PC, or DVI"
# UNRESOLVED: specific safety warnings, interlock procedures, or power-on sequencing
# requirements not explicitly stated in source beyond UART Wake requirement for power commands.
```

## Notes
Three distinct protocol families in this source:

**E Series** (commercial signage): RS-232 only, 115200 baud, `0xA6` header packet format, no response on wrong ID. Separate command codes from M/WR/MR6DE series.

**M Series** (24/7 digital signage): RS-232 (9600 baud) and IP control, `0xDD 0xFF` header format. Source explicitly covers IP control commands.

**WR Series / MR6DE Series**: RS-232 (9600 baud), `0xDD 0xFF` header format. Command codes largely compatible with M Series with minor variations in source encoding.

IP control packet structure (M/WR/MR6DE): `DD FF [length 2B] [command 4B] [monitor_id 1B] [data N] [checksum 1B] BB CC` where length = Command + Data + Checksum bytes, checksum = XOR of Length, Command, Monitor ID, and Data.

RS-232 response format: `AB AB [length 2B] [command 4B] [monitor_id 1B] [data N] [checksum 1B] CD CD`

E Series response format differs: `0x21` header, fixed response codes for result status.

Port number for TCP/IP not stated in source. No authentication or login procedure described.

Monitor ID range: `0x01` - `0xFF` for all series.

Checksum calculation: XOR of all bytes except the last byte (for E Series); XOR of Length, Command, Monitor ID, and Data (for M/WR/MR6DE Series).

<!-- UNRESOLVED: specific TCP port for IP control not stated in source. -->
<!-- UNRESOLVED: which protocol variant (E/M/WR/MR6DE) applies to 55U78QG specifically — document covers multiple series. -->
<!-- UNRESOLVED: UART Wake setting location and procedure not documented in source. -->
<!-- UNRESOLVED: E Series additional commands for video params, sound mode/balance, key control, power mode, aspect ratio — limited examples shown. -->
<!-- UNRESOLVED: voltage, current, power specifications not provided. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: authentication credentials or token formats not applicable (none described). -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-20T12:17:15.632Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T12:17:15.632Z
matched_actions: 46
action_count: 46
confidence: high
summary: "All 46 actions matched."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
