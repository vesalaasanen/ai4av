---
spec_id: admin/lg-49sk8000pua-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 49SK8000PUA Series Control Spec"
manufacturer: LG
model_family: "49SK8000PUA Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "49SK8000PUA Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-26T14:25:43.948Z
generated_at: 2026-04-26T14:25:43.948Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T14:25:43.948Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 28 spec actions matched literal commands in source with correct opcodes and parameter ranges; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 49SK8000PUA Series Control Spec

## Summary
LG Super UHD TV with RS-232C serial and TCP/IP (telnet) external control. Serial uses ASCII command protocol with `[Command1][Command2] [SetID] [Data][Cr]` framing. TCP control connects via telnet on port 9761 with plain-text English commands. Controls include power, volume, input selection, picture adjustments, channel tuning, and IR key emulation.

<!-- UNRESOLVED: exact firmware versions compatible not stated -->
<!-- UNRESOLVED: TCP/IP control listed as "For USA only" — availability in other regions unclear -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; cable spec says "crossed (reverse)"
addressing:
  port: 9761
auth:
  type: none  # inferred: serial has no auth procedure in source; TCP telnet session has no login step
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off command (ka 00/01)
  - levelable    # inferred from volume, contrast, brightness, backlight, etc.
  - queryable    # inferred from FF data read mode returning current status
  - routable     # inferred from input select command (xb)
```

## Actions
```yaml
actions:
  - id: power_control
    label: Power Control
    kind: action
    command: "k a"
    params:
      - name: state
        type: enum
        values:
          - "00"  # Power Off
          - "01"  # Power On
    description: "Control power on/off. Transmission: ka [SetID] [Data][Cr]"

  - id: power_query
    label: Power Query
    kind: query
    command: "k a [SetID] FF"
    params: []
    description: "Query current power state. Send FF as data."

  - id: aspect_ratio
    label: Aspect Ratio
    kind: action
    command: "k c"
    params:
      - name: ratio
        type: enum
        values:
          - "01"  # Normal screen (4:3)
          - "02"  # Wide screen (16:9)
          - "04"  # Zoom
          - "05"  # Zoom 2
          - "06"  # Set by Program/Original
          - "07"  # 14:9 (4:3)
          - "09"  # Just Scan
          - "0B"  # Full Wide
          - "0C"  # 21:9
    description: "Adjust screen format. Values 10-1F = Cinema Zoom 1-16."

  - id: screen_mute
    label: Screen Mute
    kind: action
    command: "k d"
    params:
      - name: mode
        type: enum
        values:
          - "00"  # Screen mute off (picture on), video mute off
          - "01"  # Screen mute on (picture off)
          - "10"  # Video mute on
    description: "Select screen mute on/off."

  - id: volume_mute
    label: Volume Mute
    kind: action
    command: "k e"
    params:
      - name: state
        type: enum
        values:
          - "00"  # Volume mute on (mute)
          - "01"  # Volume mute off (unmute)
    description: "Control volume mute on/off."

  - id: volume_control
    label: Volume Control
    kind: action
    command: "k f"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    description: "Adjust volume level (hex 00-64)."

  - id: contrast
    label: Contrast
    kind: action
    command: "k g"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    description: "Adjust screen contrast (hex 00-64)."

  - id: brightness
    label: Brightness
    kind: action
    command: "k h"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    description: "Adjust screen brightness (hex 00-64)."

  - id: color
    label: Color
    kind: action
    command: "k i"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    description: "Adjust screen color (hex 00-64)."

  - id: tint
    label: Tint
    kind: action
    command: "k j"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    description: "Adjust screen tint. Red=00, Green=64."

  - id: sharpness
    label: Sharpness
    kind: action
    command: "k k"
    params:
      - name: level
        type: integer
        min: 0
        max: 50
    description: "Adjust screen sharpness (hex 00-32)."

  - id: osd_select
    label: OSD Select
    kind: action
    command: "k l"
    params:
      - name: state
        type: enum
        values:
          - "00"  # OSD off
          - "01"  # OSD on
    description: "Select OSD on/off for remote control."

  - id: remote_lock
    label: Remote Control Lock Mode
    kind: action
    command: "k m"
    params:
      - name: state
        type: enum
        values:
          - "00"  # Lock off
          - "01"  # Lock on
    description: "Lock front panel controls and remote control. Released on main power off/on after 20-30 seconds."

  - id: treble
    label: Treble
    kind: action
    command: "k r"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    description: "Adjust treble (hex 00-64)."

  - id: bass
    label: Bass
    kind: action
    command: "k s"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    description: "Adjust bass (hex 00-64)."

  - id: balance
    label: Balance
    kind: action
    command: "k t"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    description: "Adjust balance (hex 00-64)."

  - id: color_temperature
    label: Color Temperature
    kind: action
    command: "x u"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    description: "Adjust colour temperature (hex 00-64)."

  - id: energy_saving
    label: Energy Saving
    kind: action
    command: "j q"
    params:
      - name: mode
        type: enum
        values:
          - "00"  # Off
          - "01"  # Minimum
          - "02"  # Medium
          - "03"  # Maximum
          - "04"  # Auto / Intelligent sensor
          - "05"  # Screen off
    description: "Control energy saving mode."

  - id: tune_channel
    label: Tune Channel
    kind: action
    command: "m a"
    params:
      - name: data_00
        type: string
        description: "Physical channel number high byte (hex)"
      - name: data_01
        type: string
        description: "Physical channel number low byte (hex)"
      - name: data_02
        type: string
        description: "Input source (00=ATV, 80=CATV, etc.)"
    description: "Tune to channel. Format varies by region (Europe/ATSC/ISDB). Supports analog and digital channels with major/minor numbering."

  - id: channel_add_del
    label: Channel Add/Delete
    kind: action
    command: "m b"
    params:
      - name: action
        type: enum
        values:
          - "00"  # Delete/Skip
          - "01"  # Add
    description: "Skip or add current channel."

  - id: key_action
    label: Key Action
    kind: action
    command: "m c"
    params:
      - name: key_code
        type: string
        description: "IR remote key code in hex (see key code table)"
    description: "Send IR remote key code emulation."

  - id: backlight
    label: Backlight Control
    kind: action
    command: "m g"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    description: "Control backlight level (hex 00-64)."

  - id: input_select
    label: Input Select
    kind: action
    command: "x b"
    params:
      - name: input
        type: enum
        values:
          - "00"  # DTV
          - "01"  # CADTV
          - "02"  # Satellite DTV
          - "10"  # ATV
          - "11"  # CATV
          - "20"  # AV or AV1
          - "21"  # AV2
          - "40"  # Component1
          - "41"  # Component2
          - "60"  # RGB
          - "90"  # HDMI1
          - "91"  # HDMI2
          - "92"  # HDMI3
          - "93"  # HDMI4
    description: "Select input source for main picture."

  - id: auto_configure
    label: Auto Configure
    kind: action
    command: "j u"
    params:
      - name: trigger
        type: enum
        values:
          - "01"
    description: "Auto-adjust picture position. RGB (PC) mode only."
  - id: ism_method
    label: ISM Method
    kind: action
    command: "j p"
    params:
      - name: mode
        type: enum
        values:
          - "02"
          - "08"
          - "20"
    description: "Control ISM method (image retention). Documented as Plasma TV only in source."

  - id: equalizer
    label: Equalizer
    kind: action
    command: "j v"
    params:
      - name: data
        type: string
        description: "Single byte: bits 7-5 = frequency band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th); bits 4-0 = step (0-20 decimal)."

  - id: picture_3d
    label: 3D Mode
    kind: action
    command: "x t"
    params:
      - name: data_00
        type: enum
        values:
          - "00"
          - "01"
          - "02"
          - "03"
      - name: data_01
        type: enum
        values:
          - "00"
          - "01"
          - "02"
          - "03"
          - "04"
          - "05"
      - name: data_02
        type: enum
        values:
          - "00"
          - "01"
      - name: data_03
        type: integer
        description: "3D Effect depth (hex 00-14). Only when 3D Mode is Manual."
    description: "Change 3D mode. Only 3D models."

  - id: extended_3d
    label: Extended 3D
    kind: action
    command: "x v"
    params:
      - name: data_00
        type: enum
        values:
          - "00"
          - "01"
          - "02"
          - "06"
          - "07"
          - "08"
          - "09"
      - name: data_01
        type: string
        description: "Value range depends on Data 00. See source for semantics."
    description: "Change 3D option for TV. Only 3D models."
```

## Feedbacks
```yaml
feedbacks:
  - id: ack_ok
    type: string
    format: "[Command2] [SetID] OK [Data] x"
    description: "OK acknowledgement returned for valid commands. If data read mode (FF), returns current status."

  - id: ack_ng
    type: string
    format: "[Command2] [SetID] NG [Data] x"
    description: "Error acknowledgement for invalid data or non-viable functions. Data 00 = Illegal Code."

  - id: power_state
    type: enum
    values: [on, off]
    description: "Queried by sending ka [SetID] FF. Response data: 00=off, 01=on."

  - id: volume_level
    type: integer
    min: 0
    max: 100
    description: "Queried by sending kf [SetID] FF."

  - id: input_source
    type: enum
    description: "Queried by sending xb [SetID] FF. Returns current input selection code."
```

## Variables
```yaml
variables:
  - id: set_id
    type: integer
    min: 0
    max: 99
    description: "Device Set ID for multi-display addressing. 0=broadcast to all. Configured in TV menu: Settings > General > About this TV > SET ID."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "During media playback or recording, all commands except Power (ka) and Key (mc) are rejected as NG."
  - "With USB-to-Serial converter, ka command only works when TV is powered on. With direct RS-232C cable, ka works in both power-on and power-off states."
  - "Remote control lock mode is released when main power is cycled (plug-off and plug-in, after 20-30 seconds)."
# UNRESOLVED: no explicit power-on sequencing or safety interlock procedures beyond above
```

## Notes
- RS-232C connection uses a crossed (reverse/null-modem) cable, not a straight-through cable.
- USB-to-Serial converter must use PL2303 chip (Vendor ID: 0x0557, Product ID: 0x2008).
- DE9 (D-Sub 9pin) and Phone jack connector types supported depending on model.
- Set ID 0 (0x00) broadcasts to all connected TVs in a multi-display setup.
- All serial data values are hexadecimal unless otherwise noted.
- Communication code is ASCII. Commands terminate with CR (0x0D). Spaces are ASCII 0x20.
- TCP/IP control is documented as "For USA only." Default IP Control Setup password is 828, changed via TV menu.
- TCP commands use plain English names (e.g., `VOLUME_CONTROL 15`) instead of the two-character serial codes.
- TCP response is `OK` or `NG` on a single line.
- Volume control range differs between serial (0-100 hex) and TCP (0-100 decimal).
<!-- UNRESOLVED: TCP/IP control availability outside USA not confirmed -->
<!-- UNRESOLVED: maximum concurrent TCP connection count not stated -->
<!-- UNRESOLVED: flow control method for serial not stated -->
<!-- UNRESOLVED: ISM Method (jp) is documented as Plasma TV only — applicability to this LED model unclear -->
<!-- UNRESOLVED: 3D commands (xt, xv) applicability to this specific model not confirmed -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-26T14:25:43.948Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T14:25:43.948Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 28 spec actions matched literal commands in source with correct opcodes and parameter ranges; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
