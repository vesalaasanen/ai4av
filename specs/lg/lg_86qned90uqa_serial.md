---
spec_id: admin/lg-86qned90uqa
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 86QNED90UQA Control Spec"
manufacturer: LG
model_family: 86QNED90UQA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 86QNED90UQA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-26T19:40:52.030Z
generated_at: 2026-04-26T19:40:52.030Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T19:40:52.030Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "All 27 spec actions matched source commands; transport verified; three_d and extended_3d added and confirmed in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 86QNED90UQA Control Spec

## Summary
LG 86QNED90UQA 4K QNED TV supporting RS-232C serial and TCP/IP (Telnet) control interfaces. Serial uses 9600 bps 8N1 ASCII protocol with crossed cable. IP control connects via Telnet on port 9761. Supports power, picture, audio, channel, input routing, and 3D commands.

<!-- UNRESOLVED: ISM Method (j p) is documented but applies only to Plasma TV models; this QNED model may not support it -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9761  # inferred: TCP port stated for Telnet IP control
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source for RS-232C; IP control uses setup password (828) to enable feature but no per-command auth
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
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00: Power Off, 01: Power On"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values:
        - "01"
        - "02"
        - "04"
        - "05"
        - "06"
        - "07"
        - "09"
        - "0B"
        - "0C"
        - "10"
        - "11"
        - "12"
        - "13"
        - "14"
        - "15"
        - "16"
        - "17"
        - "18"
        - "19"
        - "1A"
        - "1B"
        - "1C"
        - "1D"
        - "1E"
        - "1F"
      description: "01: Normal, 02: Wide, 04: Zoom, 05: Zoom 2, 06: Original, 07: 14:9, 09: Just Scan, 0B: Full Wide, 0C: 21:9, 10-1F: Cinema Zoom 1-16"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"
        - "01"
        - "10"
      description: "00: Off, 01: Screen mute on, 10: Video mute on"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00: Mute on, 01: Mute off"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Volume level 0-100 (decimal). Note: RS-232C uses 0-64 hex range."

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Contrast level 0-100 (decimal). Note: RS-232C uses 0-64 hex range."

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Brightness level 0-100 (decimal). Note: RS-232C uses 0-64 hex range."

- id: color
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Color level 0-100 (decimal). Note: RS-232C uses 0-64 hex range."

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Tint level 0-100 (Red 0 to Green 100 decimal). Note: RS-232C uses 0-64 hex range."

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 50
      description: "Sharpness level 0-50 (decimal). Note: RS-232C uses 0-32 hex range."

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00: OSD off, 01: OSD on"

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00: Lock off, 01: Lock on"

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Treble level 0-100 (decimal). Note: RS-232C uses 0-64 hex range."

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Bass level 0-100 (decimal). Note: RS-232C uses 0-64 hex range."

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Balance level 0-100 (decimal). Note: RS-232C uses 0-64 hex range."

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Color temperature 0-100 (decimal). Note: RS-232C uses 0-64 hex range."

- id: ism_method
  label: ISM Method
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "02"
        - "08"
        - "20"
      description: "02: Orbiter, 08: Normal, 20: Color Wash"
  note: "Only Plasma TV models; QNED models may not support this command"

- id: equalizer
  label: Equalizer
  kind: action
  params:
    - name: band
      type: integer
      min: 1
      max: 5
      description: "Frequency band 1-5"
    - name: step
      type: integer
      min: 0
      max: 20
      description: "Step value 0-20 decimal"

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: level
      type: enum
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "05"
      description: "00: Off, 01: Minimum, 02: Medium, 03: Maximum, 04: Auto, 05: Screen off"

- id: tune_command
  label: Tune Command
  kind: action
  params:
    - name: channel_data
      type: object
      description: "Channel tuning data (varies by region and signal type)"
    - name: input_source
      type: enum
      values:
        - "00"
        - "01"
        - "02"
        - "06"
        - "10"
        - "20"
        - "22"
        - "26"
        - "40"
        - "46"
        - "66"
        - "80"
      description: "Channel input source type"

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: action
      type: enum
      values:
        - "00"
        - "01"
      description: "00: Delete/Skip, 01: Add"

- id: key
  label: Key
  kind: action
  params:
    - name: code
      type: string
      description: "IR remote key code (hexadecimal). See key code table."

- id: backlight_control
  label: Backlight Control
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Backlight level 0-100 (decimal). Note: RS-232C uses 0-64 hex range."

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "10"
        - "11"
        - "20"
        - "21"
        - "40"
        - "41"
        - "60"
        - "90"
        - "91"
        - "92"
        - "93"
      description: "00: DTV, 01: CADTV, 02: Satellite DTV, 03: ISDB-CS1, 04: ISDB-CS2, 10: ATV, 11: CATV, 20: AV/AV1, 21: AV2, 40: Component1, 41: Component2, 60: RGB, 90-93: HDMI1-4"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "01"
      description: "01: Execute auto configure"
  note: "Works only in RGB (PC) mode"
- id: three_d
  label: 3D
  kind: action
  params:
    - name: mode
      type: enum
      values: ["00","01","02","03"]
      description: "00=3D On, 01=3D Off, 02=3D to 2D, 03=2D to 3D"
    - name: pattern
      type: enum
      values: ["00","01","02","03","04","05"]
      description: "00=Top and Bottom, 01=Side by Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving"
    - name: eye_sequence
      type: enum
      values: ["00","01"]
      description: "00=Right to Left, 01=Left to Right"
    - name: depth
      type: integer
      min: 0
      max: 20
      description: "3D Depth: 0-20 decimal (hex 00-14). Only when 3D Mode is Manual."
  note: "Only 3D models."

- id: extended_3d
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: enum
      values: ["00","01","02","06","07","08","09"]
      description: "00=3D Picture Correction, 01=3D Depth, 02=3D Viewpoint, 06=3D Color Correction, 07=3D Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre)"
    - name: value
      type: string
      description: "Value range depends on option. See source for per-option semantics."
  note: "Only 3D models."
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "00"
    - "01"
  description: "00: Off, 01: On"

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values:
    - "00"
    - "01"
  description: "00: Mute on, 01: Mute off"

- id: volume_level
  label: Volume Level
  type: integer
  min: 0
  max: 100

- id: contrast_level
  label: Contrast Level
  type: integer
  min: 0
  max: 100

- id: brightness_level
  label: Brightness Level
  type: integer
  min: 0
  max: 100

- id: color_level
  label: Color Level
  type: integer
  min: 0
  max: 100

- id: tint_level
  label: Tint Level
  type: integer
  min: 0
  max: 100

- id: sharpness_level
  label: Sharpness Level
  type: integer
  min: 0
  max: 50

- id: osd_state
  label: OSD State
  type: enum
  values:
    - "00"
    - "01"

- id: remote_lock_state
  label: Remote Control Lock State
  type: enum
  values:
    - "00"
    - "01"

- id: treble_level
  label: Treble Level
  type: integer
  min: 0
  max: 100

- id: bass_level
  label: Bass Level
  type: integer
  min: 0
  max: 100

- id: balance_level
  label: Balance Level
  type: integer
  min: 0
  max: 100

- id: color_temperature_level
  label: Color Temperature Level
  type: integer
  min: 0
  max: 100

- id: energy_saving_level
  label: Energy Saving Level
  type: enum
  values:
    - "00"
    - "01"
    - "02"
    - "03"
    - "04"
    - "05"

- id: backlight_level
  label: Backlight Level
  type: integer
  min: 0
  max: 100

- id: input_source_state
  label: Input Source State
  type: enum
  values:
    - "00"
    - "01"
    - "02"
    - "03"
    - "04"
    - "10"
    - "11"
    - "20"
    - "21"
    - "40"
    - "41"
    - "60"
    - "90"
    - "91"
    - "92"
    - "93"

- id: tune_response
  label: Tune Response
  type: object
  description: "Channel tune acknowledgement with data bytes"

- id: ack_response
  label: ACK/NG Response
  type: enum
  values:
    - OK
    - NG
  description: "OK acknowledgement or NG with error code"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters separate from actions identified in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# No explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "When main power is off and on (plug-off and plug-in, after 20-30 seconds), external control lock is released"
  - description: "In standby mode (DC off by off timer or 'ka', 'mc' command), if key lock is on, TV will not turn on by power on key of IR and Local Key"
  - description: "During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and treated as NG"
```

## Notes
- RS-232C protocol uses ASCII codes with carriage return (0x0D) terminator and space (0x20) separator
- Set ID range: 1-99 (decimal), transmitted as 0x00-0x63 (hexadecimal). Set ID 0 controls all connected sets
- For read queries (feedback), transmit data as FF
- RS-232C uses 0-64 range for most parameters; IP control uses 0-100 range
- With RS-232C cable, TV can communicate "ka command" in power-on or power-off status. With USB-to-Serial converter cable, the command works only if TV is on
- IP control requires enabling via TV menu (Settings > IP Control Setup) with password 828
- IP control uses Telnet on port 9761
- 3D commands (x t, x v) are model-dependent; this QNED model documentation suggests 3D support may be included
<!-- UNRESOLVED: ISM Method command (j p) is documented but is for Plasma TV only; presence in this document may indicate copy from generic template or actual Plasma support -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact Set ID configuration mechanism for IP control not detailed -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-26T19:40:52.030Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T19:40:52.030Z
matched_actions: 27
action_count: 27
confidence: high
summary: "All 27 spec actions matched source commands; transport verified; three_d and extended_3d added and confirmed in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
