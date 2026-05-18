---
spec_id: admin/lg_electronics-l_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG Electronics L Series Control Spec"
manufacturer: LG
model_family: "L Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
    - "LG Electronics"
  models:
    - "L Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
  - justaddpower.happyfox.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
retrieved_at: 2026-04-30T12:05:07.146Z
last_checked_at: 2026-04-30T15:20:37.926Z
generated_at: 2026-04-30T15:20:37.926Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:20:37.926Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "All 27 spec actions matched to source command reference; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# LG Electronics L Series Control Spec

## Summary
LG L Series commercial/displays support RS-232C (3-wire) and TCP/IP (Telnet on port 9761) control. Both protocols share the same command set (ASCII, carriage-return terminated). Supports power, picture, audio, channel tuning, input selection, 3D modes, and backlight control.

<!-- UNRESOLVED: specific model numbers (L3200/L3700/L4200) not listed in source — "L Series" only -->

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
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 9761  # TCP port for Telnet IP control; serial has no configurable port
auth:
  type: none  # inferred: no auth procedure in source (IP control uses 3-digit password 828 entered via remote, not a text credential)
```

## Traits
```yaml
- powerable
- queryable
- routable
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
    - name: mode
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
      description: "01:4:3, 02:16:9, 04:Zoom, 05:Zoom2, 06:Original, 07:14:9, 09:JustScan, 0B:FullWide, 0C:21:9, 10-1F:CinemaZoom1-16"

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
      description: "00:Off, 01:PictureOff, 10:VideoMuteOn"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00:MuteOn, 01:MuteOff"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "RS-232: 0-64 (hex); IP: 0-100 (decimal)"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "RS-232: 0-64 (hex); IP: 0-100 (decimal)"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "RS-232: 0-64 (hex); IP: 0-100 (decimal)"

- id: colour
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "RS-232: 0-64 (hex); IP: 0-100 (decimal)"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "RS-232: 0-64 hex Red-Green; IP: 0-100 (decimal)"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "RS-232: 0-32 (hex); IP: 0-50 (decimal)"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00:OSD Off, 01:OSD On"

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00:Lock Off, 01:Lock On"

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "RS-232: 0-64 (hex); IP: 0-100 (decimal)"

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "RS-232: 0-64 (hex); IP: 0-100 (decimal)"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "RS-232: 0-64 (hex); IP: 0-100 (decimal)"

- id: colour_temperature
  label: Color/Colour Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "RS-232: 0-64 (hex); IP: 0-100 (decimal)"

- id: ism_method
  label: ISM Method (Plasma only)
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "02"
        - "08"
        - "20"
      description: "02:Orbiter, 08:Normal, 20:ColorWash"

- id: equalizer
  label: Equalizer
  kind: action
  params:
    - name: band
      type: integer
      range: 1-5
      description: "Frequency band"
    - name: step
      type: integer
      range: 0-20
      description: "Step value"

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "05"
      description: "00:Off, 01:Minimum, 02:Medium, 03:Maximum, 04:Auto, 05:ScreenOff"

- id: tune_command
  label: Tune Command
  kind: action
  params:
    - name: data
      type: string
      description: "Channel data - varies by region and signal type. Complex multi-byte format. See source for full specification."

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: action
      type: enum
      values:
        - "00"
        - "01"
      description: "00:Delete/Skip, 01:Add"

- id: key
  label: Key
  kind: action
  params:
    - name: code
      type: string
      description: "Hex key code from key codes table"

- id: backlight
  label: Control Backlight / Panel Light
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "RS-232: 0-64 (hex); IP: 0-100 (decimal)"

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
      description: "00:DTV, 01:CADTV, 02:SatelliteDTV, 03:ISDB-CS1, 04:ISDB-CS2, 10:ATV, 11:CATV, 20:AV/AV1, 21:AV2, 40:Component1, 41:Component2, 60:RGB, 90:HDMI1, 91:HDMI2, 92:HDMI3, 93:HDMI4"

- id: picture_3d
  label: 3D (3D models only)
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"
        - "01"
        - "02"
        - "03"
      description: "00:3D On, 01:3D Off, 02:3D to 2D, 03:2D to 3D"
    - name: format
      type: enum
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "05"
      description: "00:TopBottom, 01:SideBySide, 02:CheckBoard, 03:FrameSeq, 04:ColumnInt, 05:RowInt"
    - name: order
      type: enum
      values:
        - "00"
        - "01"
      description: "00:RightToLeft, 01:LeftToRight"
    - name: effect
      type: integer
      range: 0-20
      description: "3D Effect / Depth (hex)"

- id: picture_3d_extension
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: enum
      values:
        - "picturecorrection"
        - "depth"
        - "viewpoint"
        - "colorcorrection"
        - "sound"
        - "normal"
        - "genre"
      description: "3D option name (IP control text format)"
    - name: value
      type: string
      description: "Option-specific value"

- id: auto_configure
  label: Auto Configure (RGB/PC mode only)
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "01"
      description: "01:Run Auto Configure"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "00"
    - "01"
  description: "00:Off, 01:On"

- id: ok_ack
  label: OK Acknowledgement
  type: object
  fields:
    - name: command2
      type: string
    - name: set_id
      type: string
    - name: data
      type: string

- id: ng_ack
  label: NG Acknowledgement
  type: object
  fields:
    - name: command2
      type: string
    - name: set_id
      type: string
    - name: data
      type: string
      description: "00:Illegal Code"
```

## Variables
```yaml
# All read/write parameters are settable via the Actions above.
# Query mode: send FF as data value to read current state.
# No separate Variables section needed - Actions serve this role with FF query.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source - device does not initiate notifications
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Remote control lock (ka 01) prevents IR/local key power-on. When locked and in standby (DC off by off timer or ka/mc), TV will not respond to power key."
  - description: "Power ON through WOL requires Mobile TV On set to On in menu."
```

## Notes
- RS-232C uses 3-wire crossed (reverse) cable. TX/RX pins are crossed (not standard straight-through).
- IP control runs on TCP port 9761 via Telnet. Default password 828 entered via remote to enable; not a text credential in the protocol.
- IP control command names are text strings (e.g., `POWER off`, `VOLUME_MUTE on`) vs RS-232C which uses two-letter command codes (`ka`, `ke`).
- Range scaling differs between protocols: RS-232C uses 0x00–0x64 (hex) for most level commands while IP control uses 0–100 (decimal). Sharps and tints differ too (sharpness 0–32 vs 0–50).
- During media playback or recording, all commands except Power (ka) and Key (mc) return NG.
- With USB-to-Serial converter, power command (ka) only works when TV is already on. With RS-232C cable, ka works in both on and off states.
- Set ID range: 1–99 (decimal), transmitted as 0x00–0x63 (hex). Set ID 0 broadcasts to all sets.
- Key code 4C (0x4C) only available on ATSC/ISDB models (South Korea, Japan, North America, Latin America except Colombia).
- Real data mapping uses two-byte values for channel numbers above 255 and 9999.
<!-- UNRESOLVED: specific L Series model numbers (L3200, L3700, L4200) not confirmed — "L Series" generic label only -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: flow control (RTS/CTS/XON/XOFF) not stated in source -->
<!-- UNRESOLVED: USB-to-Serial PL2303 chip details are connectivity notes, not protocol parameters -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - justaddpower.happyfox.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
retrieved_at: 2026-04-30T12:05:07.146Z
last_checked_at: 2026-04-30T15:20:37.926Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:20:37.926Z
matched_actions: 27
action_count: 27
confidence: high
summary: "All 27 spec actions matched to source command reference; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
