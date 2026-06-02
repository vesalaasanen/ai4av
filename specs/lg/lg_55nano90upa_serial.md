---
spec_id: admin/lg-55nano90upa
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55NANO90UPA Control Spec"
manufacturer: LG
model_family: 55NANO90UPA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 55NANO90UPA
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
retrieved_at: 2026-05-14T18:17:17.601Z
last_checked_at: 2026-05-14T18:17:17.601Z
generated_at: 2026-05-14T18:17:17.601Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ISM Method (j p) applies to plasma models only; this is an LCD model"
  - "variables for picture settings (contrast, brightness, color, tint,"
  - "no unsolicited event/notification mechanism described in source."
  - "no explicit safety warnings or confirmation requirements found in source"
  - "flow control (hardware RTS/CTS or XON/XOFF) not specified in source"
  - "RS-232C connector pinout not fully specified beyond TXD/RXD/GND"
  - "TCP/IP connection timeout or keepalive behavior not documented"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.601Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 31 spec actions matched literal commands in source with correct transport parameters. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 55NANO90UPA Control Spec

## Summary
LG 55-inch NanoCell LCD television supporting RS-232C serial and TCP/IP (Telnet) external control. The TV accepts ASCII command sequences via RS-232C at 9600 baud 8-N-1, or via Telnet on port 9761. Both interfaces expose the same command set including power, volume, picture adjustment, input selection, channel tuning, and 3D mode control.

<!-- UNRESOLVED: ISM Method (j p) applies to plasma models only; this is an LCD model -->

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
  flow_control: none
addressing:
  port: 9761  # TCP Telnet port; stated for IP control
auth:
  type: none  # inferred: no auth procedure in source for RS-232C or Telnet
```

## Traits
```yaml
- powerable
- levelable
- routable
- queryable
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
      description: "00=Off, 01=On"
  protocol: serial
  command: "ka"
  syntax: "[Command1][Command2][ ][Set ID][ ][Data][Cr]"

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
        - "1D"
      description: "01=Normal, 02=Wide, 04=Zoom, 05=Zoom2, 06=Original, 07=14:9, 09=JustScan, 0B=FullWide, 0C=21:9, 10-1F=CinemaZoom1-16"
  protocol: serial
  command: "kc"

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
      description: "00=Off, 01=Screen mute on, 10=Video mute on"
  protocol: serial
  command: "kd"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00=Mute on, 01=Mute off"
  protocol: serial
  command: "ke"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Volume level 0-100 (source uses 00-64; scaled)"
  protocol: serial
  command: "kf"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Contrast 0-100 (source uses 00-64; scaled)"
  protocol: serial
  command: "kg"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Brightness 0-100 (source uses 00-64; scaled)"
  protocol: serial
  command: "kh"

- id: color
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Color 0-100 (source uses 00-64; scaled)"
  protocol: serial
  command: "ki"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Tint 0-100 (Red 00 to Green 64; source uses 00-64; scaled)"
  protocol: serial
  command: "kj"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: 0-50
      description: "Sharpness 0-50 (source uses 00-32; scaled)"
  protocol: serial
  command: "kk"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00=OSD off, 01=OSD on"
  protocol: serial
  command: "kl"

- id: remote_control_lock
  label: Remote Control Lock
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00=Lock off, 01=Lock on"
  protocol: serial
  command: "km"

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Treble 0-100 (source uses 00-64; scaled)"
  protocol: serial
  command: "kr"

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Bass 0-100 (source uses 00-64; scaled)"
  protocol: serial
  command: "ks"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Balance 0-100 (source uses 00-64; scaled)"
  protocol: serial
  command: "kt"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Color temperature 0-100 (source uses 00-64; scaled)"
  protocol: serial
  command: "xu"

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
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto, 05=Screen off"
  protocol: serial
  command: "jq"

- id: tune_command
  label: Tune Command
  kind: action
  params:
    - name: channel_data
      type: string
      description: "Channel tuning; format varies by region and signal type (see source pp.9-10)"
  protocol: serial
  command: "ma"

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values:
        - "00"
        - "01"
      description: "00=Delete/Skip, 01=Add"
  protocol: serial
  command: "mb"

- id: key
  label: Key
  kind: action
  params:
    - name: key_code
      type: string
      description: "IR remote key code (hex); see key code table p.1"
  protocol: serial
  command: "mc"

- id: backlight
  label: Backlight
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Backlight 0-100 (source uses 00-64; scaled)"
  protocol: serial
  command: "mg"

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
      description: "00=DTV, 01=CADTV, 02=Satellite, 03-04=ISDB-CS, 10=ATV, 11=CATV, 20-21=AV, 40-41=Component, 60=RGB, 90-93=HDMI1-4"
  protocol: serial
  command: "xb"

- id: picture_3d
  label: 3D
  kind: action
  params:
    - name: mode
      type: string
      description: "3D mode control; complex multi-parameter (see source p.11)"
  protocol: serial
  command: "xt"

- id: picture_3d_extension
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: string
      description: "Extended 3D options; complex multi-parameter (see source p.12)"
  protocol: serial
  command: "xv"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "01"
      description: "01=Execute auto configure"
  protocol: serial
  command: "ju"
  note: "Works only in RGB (PC) mode"
- id: equalizer
  label: Equalizer
  kind: action
  command: "jv"
  params:
    - name: data
      type: string
      description: "Bit-packed byte: bits 7-5 = frequency band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th); bits 4-0 = step value (0-19 decimal). Model-dependent; only adjustable when sound mode supports EQ."
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "00"
    - "01"
  description: "00=Off, 01=On"
  query: "ka ff"

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values:
    - "00"
    - "01"
  description: "00=Mute on, 01=Mute off"
  query: "ke ff"

- id: volume_level
  label: Volume Level
  type: integer
  range: 0-100
  query: "kf ff"

- id: aspect_ratio_state
  label: Aspect Ratio State
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
    - "1D"
  query: "kc ff"

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
  query: "xb ff"
```

## Variables
```yaml
# UNRESOLVED: variables for picture settings (contrast, brightness, color, tint,
# sharpness, treble, bass, balance, color temperature, backlight) are readable via
# query (FF data) but not documented as independent settable parameters separate
# from their write commands.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source.
# Device does not send spontaneous messages; all communication is request-response.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Remote control lock (km 01): when active, TV cannot be turned on by IR or local key from standby (DC off by off timer or ka/mc command)"
  - description: "External control lock release: main power off/on (plug-out/plug-in) after 20-30 seconds releases lock"
# UNRESOLVED: no explicit safety warnings or confirmation requirements found in source
```

## Notes
- RS-232C protocol uses ASCII encoding with carriage return (0x0D) terminator and space (0x20) separator.
- Set ID range: 1-99 (decimal); transmitted as decimal but displayed as hex 0x00-0x63.
- Set ID 0 broadcasts to all connected TVs.
- During media playback or recording, all commands except Power (ka) and Key (mc) are rejected (NG).
- With USB-to-Serial converter, commands only work when TV is on; with RS-232C cable, Power (ka) works in both on and off states.
- TCP/IP Telnet commands use text strings (e.g., "POWER off", "VOLUME_MUTE on") on port 9761.
- IP Control password default is 828.
- Equalizer (j v) uses bit-packed 9-byte data structure for frequency bands.
- Tune command (m a) supports multiple regional formats; complex multi-byte encoding.
- 3D commands (x t, x v) are model-dependent and only functional on 3D TV models.
- ISM Method (j p) documented for plasma TVs only; this is an LCD model.

<!-- UNRESOLVED: flow control (hardware RTS/CTS or XON/XOFF) not specified in source -->
<!-- UNRESOLVED: RS-232C connector pinout not fully specified beyond TXD/RXD/GND -->
<!-- UNRESOLVED: TCP/IP connection timeout or keepalive behavior not documented -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - justaddpower.happyfox.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
retrieved_at: 2026-05-14T18:17:17.601Z
last_checked_at: 2026-05-14T18:17:17.601Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.601Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 31 spec actions matched literal commands in source with correct transport parameters. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ISM Method (j p) applies to plasma models only; this is an LCD model"
- "variables for picture settings (contrast, brightness, color, tint,"
- "no unsolicited event/notification mechanism described in source."
- "no explicit safety warnings or confirmation requirements found in source"
- "flow control (hardware RTS/CTS or XON/XOFF) not specified in source"
- "RS-232C connector pinout not fully specified beyond TXD/RXD/GND"
- "TCP/IP connection timeout or keepalive behavior not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
