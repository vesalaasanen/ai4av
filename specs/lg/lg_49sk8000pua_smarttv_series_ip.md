---
schema_version: ai4av-public-spec-v1
device_id: lg/49sk8000pua
entity_id: lg_49sk8000pua_smarttv_series
spec_id: admin/lg-49sk8000pua-smarttv-series
revision: 1
author: admin
title: "LG 49SK8000PUA SmartTV Series Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: 49SK8000PUA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49SK8000PUA
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_49sk8000pua_smarttv_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:59:46.803Z
retrieved_at: 2026-04-25T20:59:46.803Z
last_checked_at: 2026-04-25T20:59:46.803Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:59:46.803Z
  matched_actions: 33
  action_count: 33
  confidence: high
  summary: "All 33 actions matched verbatim in source; transport parameters (port 9761, baud 9600) confirmed; TCP/IP command catalogue complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 49SK8000PUA SmartTV Series Control Spec

## Summary

The LG 49SK8000PUA is a SmartTV supporting external control via RS-232C serial and TCP/IP (telnet). Both interfaces provide power, picture, audio, channel tuning, input selection, and 3D control. The serial protocol uses ASCII format `[Command1][Command2] [SetID] [Data][CR]` at 9600 baud. The TCP/IP interface connects via telnet on port 9761 using plain-text keyword commands with `OK`/`NG` responses. IP Control must first be enabled in the TV's setup menu.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: maximum concurrent connection count for IP control not stated -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9761
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no per-connection login; IP Control Setup menu password (default 828) is a one-time TV configuration step, not transport auth
```

## Traits

```yaml
traits:
  - powerable     # power on/off via POWER / ka commands; WOL support mentioned
  - levelable     # volume, contrast, brightness, color, tint, sharpness, bass, treble, balance, backlight, color temperature
  - queryable     # RS-232: send FF as data to read current status; IP: OK response includes state
  - routable      # input select and channel tune commands
```

## Actions

```yaml
# TCP/IP (telnet port 9761) commands documented below.
# RS-232 equivalent uses format: [cmd1][cmd2] [SetID] [Data][CR]
# RS-232 query: send FF as Data to read current value.
# RS-232 ack OK:  [cmd2] [SetID] OK[Data]x
# RS-232 ack NG:  [cmd2] [SetID] NG[Data]x

# === Power ===
- id: power_off
  label: Power Off
  kind: action
  transport: tcp
  command: "POWER off"
  params: []
  notes: RS-232 equivalent is `ka [SetID] 00`

- id: power_on
  label: Power On
  kind: action
  transport: tcp
  command: "POWER on"
  params: []
  notes: RS-232 equivalent is `ka [SetID] 01`. WOL also supported when Mobile TV On is enabled.

# === Aspect Ratio ===
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  transport: tcp
  command: "ASPECT_RATIO {mode}"
  params:
    - name: mode
      type: enum
      values: [4by3, 16by9, setbyoriginal]
      description: Screen format
  notes: RS-232 equivalent is `kc [SetID] [Data]` (01=Normal, 02=Wide, 04=Zoom, 05=Zoom2, 06=SetByProgram, 09=JustScan, 0B=FullWide, 10-1F=CinemaZoom 1-16)

# === Screen Mute ===
- id: screen_mute
  label: Screen Mute
  kind: action
  transport: tcp
  command: "SCREEN_MUTE {mode}"
  params:
    - name: mode
      type: enum
      values: [screenmuteon, videomuteon, allmuteoff]
      description: Screen/video mute mode
  notes: RS-232 equivalent is `kd [SetID] [Data]` (00=off, 01=screen mute on, 10=video mute on)

# === Volume Mute ===
- id: volume_mute
  label: Volume Mute
  kind: action
  transport: tcp
  command: "VOLUME_MUTE {state}"
  params:
    - name: state
      type: enum
      values: [on, off]
      description: "on = mute on (volume off), off = mute off (volume on)"
  notes: RS-232 equivalent is `ke [SetID] [Data]` (00=mute on, 01=mute off)

# === Volume Control ===
- id: volume_control
  label: Volume Control
  kind: action
  transport: tcp
  command: "VOLUME_CONTROL {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: Volume level (decimal)
  notes: RS-232 equivalent is `kf [SetID] [Data]` (00-64 hex)

# === Contrast ===
- id: contrast
  label: Contrast
  kind: action
  transport: tcp
  command: "PICTURE_CONTRAST {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: Contrast level (decimal)
  notes: RS-232 equivalent is `kg [SetID] [Data]` (00-64 hex)

# === Brightness ===
- id: brightness
  label: Brightness
  kind: action
  transport: tcp
  command: "PICTURE_BRIGHTNESS {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: Brightness level (decimal)
  notes: RS-232 equivalent is `kh [SetID] [Data]` (00-64 hex)

# === Color ===
- id: color
  label: Color
  kind: action
  transport: tcp
  command: "PICTURE_COLOUR {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: Color level (decimal)
  notes: RS-232 equivalent is `ki [SetID] [Data]` (00-64 hex)

# === Tint ===
- id: tint
  label: Tint
  kind: action
  transport: tcp
  command: "PICTURE_TINT {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: Tint level (decimal)
  notes: RS-232 equivalent is `kj [SetID] [Data]` (00-64 hex, 00=Red, 64=Green)

# === Sharpness ===
- id: sharpness
  label: Sharpness
  kind: action
  transport: tcp
  command: "PICTURE_SHARPNESS {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 50
      description: Sharpness level (decimal)
  notes: RS-232 equivalent is `kk [SetID] [Data]` (00-32 hex)

# === OSD Select ===
- id: osd_select
  label: OSD Select
  kind: action
  transport: tcp
  command: "OSD_SELECT {state}"
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Enable or disable on-screen display
  notes: RS-232 equivalent is `kl [SetID] [Data]` (00=off, 01=on)

# === Remote Control Lock ===
- id: remote_lock
  label: Remote Control Lock
  kind: action
  transport: tcp
  command: "REMOTECONTROLER_LOCK {state}"
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Lock or unlock front panel and remote control
  notes: RS-232 equivalent is `km [SetID] [Data]` (00=off, 01=on). Lock is released on main power cycle (plug-off/plug-in after 20-30s).

# === Balance ===
- id: balance
  label: Audio Balance
  kind: action
  transport: tcp
  command: "AUDIO_BALANCE {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: Balance level (decimal)
  notes: RS-232 equivalent is `kt [SetID] [Data]` (00-64 hex)

# === Color Temperature ===
- id: color_temperature
  label: Color Temperature
  kind: action
  transport: tcp
  command: "PICTURE_COLOUR_TEMPERATURE {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: Color temperature level (decimal)
  notes: RS-232 equivalent is `xu [SetID] [Data]` (00-64 hex)

# === Equalizer ===
- id: equalizer
  label: Equalizer
  kind: action
  transport: tcp
  command: "AUDIO_EQUALIZER {band} {step}"
  params:
    - name: band
      type: integer
      min: 1
      max: 5
      description: Frequency band (1-5)
    - name: step
      type: integer
      min: 0
      max: 20
      description: EQ step value (decimal)
  notes: Precondition: sound mode must be set to EQ adjustable. RS-232 equivalent is `jv [SetID] [Data]` with encoded band/step.

# === Energy Saving ===
- id: energy_saving
  label: Energy Saving
  kind: action
  transport: tcp
  command: "ENERGY_SAVING {mode}"
  params:
    - name: mode
      type: enum
      values: [screenoff, maximum, medium, minimum, off]
      description: Energy saving mode
  notes: RS-232 equivalent is `jq [SetID] [Data]` (00=off, 01=minimum, 02=medium, 03=maximum, 04=auto, 05=screen off)

# === Tune Channel (ATSC ATV) ===
- id: tune_atsc_atv
  label: Tune ATSC Analog Channel
  kind: action
  transport: tcp
  command: "CHANNEL_SETTING_ATSC_ATV {channel} {source}"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: source
      type: enum
      values: [antenna, cable]
      description: Input source
  notes: RS-232 equivalent is `ma [SetID] [Data00] [Data01] [Data02]`

# === Tune Channel (ATSC DTV) ===
- id: tune_atsc_dtv
  label: Tune ATSC Digital Channel
  kind: action
  transport: tcp
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} {source}"
  params:
    - name: major
      type: integer
      description: Major channel number
    - name: minor
      type: integer
      description: Minor channel number
    - name: source
      type: enum
      values: [antennanotphy, cablenotphy]
      description: Input source (physical channel not used)
  notes: Also supports `CHANNEL_SETTING_ATSC_DTV [Channel Number] cablenotphy` for cable without physical. RS-232 has extensive tune options including physical/major/minor with source codes.

# === Channel Add/Delete ===
- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  transport: tcp
  command: "CHANNEL_ADD_DELETE {action}"
  params:
    - name: action
      type: enum
      values: [add, delete]
      description: Add or delete/skip current channel
  notes: RS-232 equivalent is `mb [SetID] [Data]` (00=del/skip, 01=add)

# === Key Action ===
- id: key_action
  label: Key Action (IR Remote Simulation)
  kind: action
  transport: tcp
  command: "KEY_ACTION {key}"
  params:
    - name: key
      type: enum
      values:
        - exit
        - channelup
        - channeldown
        - volumeup
        - volumedown
        - arrowright
        - arrowleft
        - volumemute
        - deviceinput
        - sleepreserve
        - livetv
        - previouschannel
        - favoritechannel
        - teletext
        - teletextoption
        - returnback
        - avmode
        - captionsubtitle
        - arrowup
        - arrowdown
        - myapp
        - settingmenu
        - ok
        - quickmenu
        - videomode
        - audiomode
        - channellist
        - bluebutton
        - yellowbutton
        - greenbutton
        - redbutton
        - aspectratio
        - audiodescription
        - programmorder
        - userguide
        - smarthome
        - simplelink
        - fastforward
        - rewind
        - programminfo
        - programguide
        - play
        - slowplay
        - soccerscreen
        - record
        - 3d
        - autoconfig
        - app
        - screenbright
        - number0
        - number1
        - number2
        - number3
        - number4
        - number5
        - number6
        - number7
        - number8
        - number9
      description: Simulated IR remote key code
  notes: RS-232 equivalent is `mc [SetID] [Data]` using hex key codes (see Key Codes table in source).

# === Backlight ===
- id: backlight
  label: Backlight Control
  kind: action
  transport: tcp
  command: "PICTURE_BACKLIGHT {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: Backlight level (decimal)
  notes: Precondition: Energy Saving must be off. RS-232 equivalent is `mg [SetID] [Data]` (00-64 hex).

# === Input Select ===
- id: input_select
  label: Input Select
  kind: action
  transport: tcp
  command: "INPUT_SELECT {source}"
  params:
    - name: source
      type: enum
      values: [dtv, atv, cadtv, catv, avav1, component1, hdmi1, hdmi2, hdmi3]
      description: Input source for main picture
  notes: RS-232 equivalent is `xb [SetID] [Data]` with extended codes (00=DTV, 01=CADTV, 10=ATV, 20=AV, 40=Component1, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4)

# === 3D Mode ===
- id: 3d_off
  label: 3D Off
  kind: action
  transport: tcp
  command: "PICTURE_3D off"
  params: []

- id: 3d_3dto2d
  label: 3D to 2D
  kind: action
  transport: tcp
  command: "PICTURE_3D 3dto2d"
  params: []

- id: 3d_2dto3d
  label: 2D to 3D
  kind: action
  transport: tcp
  command: "PICTURE_3D 2dto3d {direction} {depth}"
  params:
    - name: direction
      type: enum
      values: [righttoleft, lefttoright]
      description: 3D direction
    - name: depth
      type: integer
      min: 0
      max: 20
      description: 3D depth effect

- id: 3d_on
  label: 3D On
  kind: action
  transport: tcp
  command: "PICTURE_3D on {pattern} {direction} {depth}"
  params:
    - name: pattern
      type: enum
      values: [topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving]
      description: 3D pattern type
    - name: direction
      type: enum
      values: [righttoleft, lefttoright]
      description: 3D direction
    - name: depth
      type: integer
      min: 0
      max: 20
      description: 3D depth effect
  notes: Only on 3D-capable models. RS-232 equivalent is `xt [SetID] [Data00] [Data01] [Data02] [Data03]`.

# === Extended 3D ===
- id: 3d_extension
  label: Extended 3D Options
  kind: action
  transport: tcp
  command: "PICTURE_3D_EXTENSION {option} {value}"
  params:
    - name: option
      type: enum
      values: [picturecorrection, colorcorrection, sound, normal, depth, viewpoint, genre]
      description: 3D option to adjust
    - name: value
      type: string
      description: "Varies by option: picturecorrection/colorcorrection/sound/normal [0-1], depth/viewpoint [0-20], genre [0-5=Standard/Sport/Cinema/Extreme/Manual/Auto]"
  notes: Precondition: 3D must be active. RS-232 equivalent is `xv [SetID] [Data00] [Data01]`.

# === RS-232 ONLY commands (no TCP/IP equivalent documented) ===
- id: treble
  label: Treble
  kind: action
  transport: serial
  command: "kr [SetID] [Data]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: Treble level (hex 00-64)
  notes: RS-232 only. No TCP/IP equivalent documented.

- id: bass
  label: Bass
  kind: action
  transport: serial
  command: "ks [SetID] [Data]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: Bass level (hex 00-64)
  notes: RS-232 only. No TCP/IP equivalent documented.

- id: auto_configure
  label: Auto Configure
  kind: action
  transport: serial
  command: "ju [SetID] 01"
  params: []
  notes: RS-232 only. Adjusts picture position in RGB (PC) mode. No TCP/IP equivalent documented.

- id: ism_method
  label: ISM Method
  kind: action
  transport: serial
  command: "jp [SetID] [Data]"
  params:
    - name: data
      type: enum
      values: [02, 08, 20]
      description: "02=Orbiter, 08=Normal, 20=Color Wash"
  notes: RS-232 only, Plasma TV only. No TCP/IP equivalent documented.

- id: panel_light
  label: Control Panel Light
  kind: action
  transport: serial
  command: "mg [SetID] [Data]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: Panel light level (hex 00-64)
  notes: RS-232 only. Shares command code `mg` with backlight. No TCP/IP equivalent documented.
```

## Feedbacks

```yaml
# TCP/IP: each command returns "OK" (success) or "NG" (failure) as plain text.
# RS-232: acknowledgment format varies by command:
#   OK: [cmd2] [SetID] OK[Data]x
#   NG: [cmd2] [SetID] NG[Data]x  (Data 00 = Illegal Code)
# RS-232 query: send FF as Data to read current status.

- id: command_ack
  type: enum
  values: [OK, NG]
  description: Acknowledgement returned after every command

- id: power_state
  type: enum
  values: [on, off]
  transport: serial
  description: Current power state (query via `ka [SetID] FF`)

- id: volume_level
  type: integer
  transport: serial
  description: Current volume level (query via `kf [SetID] FF`)

- id: input_source
  type: enum
  transport: serial
  description: Current input source (query via `xb [SetID] FF`)

- id: mute_state
  type: enum
  values: [on, off]
  transport: serial
  description: Current mute state (query via `ke [SetID] FF`)

# UNRESOLVED: IP control does not document a query/status read mechanism beyond OK/NG ack
```

## Variables

```yaml
# UNRESOLVED: no distinct settable variables beyond the actions above; all parameters are passed inline with commands
```

## Events

```yaml
# UNRESOLVED: no unsolicited notification/event mechanism documented
```

## Macros

```yaml
# UNRESOLVED: no multi-step macros documented in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - "During media playback or recording, all commands except Power (ka/POWER) and Key (mc/KEY_ACTION) are rejected as NG"
  - "RS-232 with USB-to-Serial converter: ka (power) command only works when TV is on; direct RS-232C cable works in both power-on and power-off states"
  - "Remote control lock is released on main power cycle (plug-off/plug-in after 20-30 seconds)"
  - "With key lock on in standby, TV will not turn on via IR or local key power button"
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond operational constraints noted above
```

## Notes

- **Dual protocol support**: TV supports both RS-232C serial and TCP/IP (telnet) control. RS-232 uses `[cmd1][cmd2] [SetID] [Data][CR]` format; TCP/IP uses plain-text keyword commands on port 9761.
- **Set ID** (RS-232): Adjustable 1-99 via TV menu. Set ID 0 broadcasts to all connected sets. Displayed as decimal in menu but transmitted as hex in protocol.
- **IP Control Setup**: Must be enabled on TV first (Settings > hold 5s on Live TV > enter password 828 > Network IP Control > On > reboot). Default password is 828.
- **Wake-on-LAN**: TV can be powered on via WOL when "Mobile TV On" (Settings > Mobile TV On) is enabled.
- **Communication code**: ASCII for RS-232; plain text over telnet for TCP/IP.
- **RS-232 cable**: Crossed (reverse) cable required. Supports DE9 (D-Sub 9pin) and phone jack connectors. USB-to-Serial converter must use PL2303 chip (VID 0x0557, PID 0x2008).
- **Data ranges differ between protocols**: RS-232 uses hexadecimal ranges (e.g., volume 00-64), TCP/IP uses decimal (e.g., volume 0-100).
- **RS-232 power-off control limitation**: USB-to-Serial converter cable only supports power commands when TV is on; direct RS-232C cable works in standby.
- **3D commands**: Only on 3D-capable models. Extended 3D requires active 3D mode as precondition.
- **Equalizer**: Only adjustable when sound mode is set to EQ-adjustable mode.

<!-- UNRESOLVED: maximum concurrent TCP/IP connections not stated -->
<!-- UNRESOLVED: command rate limiting or minimum interval not stated -->
<!-- UNRESOLVED: connection timeout / keepalive behavior not stated -->
<!-- UNRESOLVED: whether IP control query commands exist beyond OK/NG acknowledgement -->
<!-- UNRESOLVED: protocol version number not stated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_49sk8000pua_smarttv_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:59:46.803Z
retrieved_at: 2026-04-25T20:59:46.803Z
last_checked_at: 2026-04-25T20:59:46.803Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:59:46.803Z
matched_actions: 33
action_count: 33
confidence: high
summary: "All 33 actions matched verbatim in source; transport parameters (port 9761, baud 9600) confirmed; TCP/IP command catalogue complete."
```

## Known Gaps

```yaml
[]
```
