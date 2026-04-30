---
schema_version: ai4av-public-spec-v1
device_id: lg/49nano81ana
entity_id: lg_49nano81ana
spec_id: admin/lg-49nano81ana
revision: 1
author: admin
title: "LG 49NANO81ANA Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: 49NANO81ANA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49NANO81ANA
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_49nano81ana_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:58:35.260Z
retrieved_at: 2026-04-25T20:58:35.260Z
last_checked_at: 2026-04-25T20:58:35.260Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps:
  - jp
  - xt
  - xv
  - ju
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:58:35.260Z
  matched_actions: 44
  action_count: 44
  confidence: high
  summary: "All 44 spec actions matched literally; extra commands correctly excluded as model-specific (Plasma, 3D only)."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 49NANO81ANA Control Spec

## Summary
The LG 49NANO81ANA is a 49-inch NanoCell TV controllable via RS-232C serial and TCP/IP (Telnet). Both protocols expose the same command set including power, volume, input selection, channel tuning, picture adjustments, and IR key simulation. Serial uses LG's proprietary ASCII protocol with hex-coded parameters; IP control uses a plain-text keyword protocol over Telnet on port 9761 (USA models).

<!-- UNRESOLVED: exact connector type on this model (DE9 vs phone jack vs USB-only) not confirmed -->
<!-- UNRESOLVED: Network IP Control section states "For USA only" — applicability to other regions unknown -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: Set ID default value not stated -->

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
  port: 9761  # Telnet port for Network IP Control (USA models)
auth:
  type: none  # inferred: no auth procedure for serial; IP control requires setup menu enablement but no login/password
```

## Traits
```yaml
# inferred from power on/off commands
- powerable
# inferred from input select and channel tune commands
- routable
# inferred from query support (send FF data to read status)
- queryable
# inferred from volume, contrast, brightness, backlight, treble, bass, balance controls
- levelable
```

## Actions
```yaml
# === SERIAL PROTOCOL ===
# Format: [Command1][Command2][ ][Set ID][ ][Data][Cr]
# Set ID: 00 = all sets, 01-99 = specific set

- id: power_control
  label: Power Control
  kind: action
  description: "Serial: ka — Set power on (01) or off (00). Send FF to query."
  params:
    - name: data
      type: integer
      description: "00=off, 01=on, FF=query"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  description: "Serial: kc — Set screen format."
  params:
    - name: data
      type: integer
      description: "01=Normal, 02=Wide(16:9), 04=Zoom, 05=Zoom2, 06=SetByProgram, 09=JustScan, 0B=FullWide, 10-1F=CinemaZoom1-16"

- id: screen_mute
  label: Screen Mute
  kind: action
  description: "Serial: kd — Control screen/video mute."
  params:
    - name: data
      type: integer
      description: "00=off, 01=screen mute on, 10=video mute on"

- id: volume_mute
  label: Volume Mute
  kind: action
  description: "Serial: ke — Control volume mute."
  params:
    - name: data
      type: integer
      description: "00=mute on, 01=mute off"

- id: volume_control
  label: Volume Control
  kind: action
  description: "Serial: kf — Set volume level."
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"

- id: contrast
  label: Contrast
  kind: action
  description: "Serial: kg — Set contrast."
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"

- id: brightness
  label: Brightness
  kind: action
  description: "Serial: kh — Set brightness."
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"

- id: color
  label: Color
  kind: action
  description: "Serial: ki — Set color level."
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"

- id: tint
  label: Tint
  kind: action
  description: "Serial: kj — Set tint. 00=Red to 64=Green."
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"

- id: sharpness
  label: Sharpness
  kind: action
  description: "Serial: kk — Set sharpness."
  params:
    - name: data
      type: integer
      description: "00-32 (hex)"

- id: osd_select
  label: OSD Select
  kind: action
  description: "Serial: kl — Enable/disable OSD."
  params:
    - name: data
      type: integer
      description: "00=off, 01=on"

- id: remote_lock
  label: Remote Control Lock
  kind: action
  description: "Serial: km — Lock/unlock front panel and remote."
  params:
    - name: data
      type: integer
      description: "00=off, 01=on"

- id: treble
  label: Treble
  kind: action
  description: "Serial: kr — Set treble."
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"

- id: bass
  label: Bass
  kind: action
  description: "Serial: ks — Set bass."
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"

- id: balance
  label: Balance
  kind: action
  description: "Serial: kt — Set balance."
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"

- id: color_temperature
  label: Color Temperature
  kind: action
  description: "Serial: xu — Set color temperature."
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"

- id: energy_saving
  label: Energy Saving
  kind: action
  description: "Serial: jq — Set energy saving mode."
  params:
    - name: data
      type: integer
      description: "00=off, 01=minimum, 02=medium, 03=maximum, 04=auto, 05=screen off"

- id: channel_add_del
  label: Channel Add/Delete
  kind: action
  description: "Serial: mb — Add or delete/skip current channel."
  params:
    - name: data
      type: integer
      description: "00=delete/skip, 01=add"

- id: key_action
  label: Key Action
  kind: action
  description: "Serial: mc — Send IR remote key code."
  params:
    - name: data
      type: integer
      description: "Hex key code (e.g. 08=Power, 02=Vol+, 03=Vol-, 0B=Input)"

- id: backlight
  label: Backlight Control
  kind: action
  description: "Serial: mg — Set backlight level."
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"

- id: input_select
  label: Input Select
  kind: action
  description: "Serial: xb — Select input source."
  params:
    - name: data
      type: integer
      description: "00=DTV,01=CADTV,02=Satellite,10=ATV,11=CATV,20=AV,21=AV2,40=Component1,41=Component2,60=RGB,90=HDMI1,91=HDMI2,92=HDMI3,93=HDMI4"

- id: tune_channel
  label: Tune Channel
  kind: action
  description: "Serial: ma — Tune to channel. Multi-byte data format varies by region and signal type."
  params:
    - name: data
      type: string
      description: "Multi-byte hex channel data (format varies by region/signal — see source p.9-10)"

# === IP CONTROL PROTOCOL (Telnet) ===
# Plain-text keyword commands, one per line

- id: ip_power_off
  label: IP Power Off
  kind: action
  description: "IP: POWER off"
  params: []

- id: ip_aspect_ratio
  label: IP Aspect Ratio
  kind: action
  description: "IP: ASPECT_RATIO"
  params:
    - name: mode
      type: string
      description: "4by3, 16by9, setbyoriginal"

- id: ip_screen_mute
  label: IP Screen Mute
  kind: action
  description: "IP: SCREEN_MUTE"
  params:
    - name: mode
      type: string
      description: "screenmuteon, videomuteon, allmuteoff"

- id: ip_volume_mute
  label: IP Volume Mute
  kind: action
  description: "IP: VOLUME_MUTE"
  params:
    - name: state
      type: string
      description: "on, off"

- id: ip_volume_control
  label: IP Volume Control
  kind: action
  description: "IP: VOLUME_CONTROL"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"

- id: ip_contrast
  label: IP Contrast
  kind: action
  description: "IP: PICTURE_CONTRAST"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"

- id: ip_brightness
  label: IP Brightness
  kind: action
  description: "IP: PICTURE_BRIGHTNESS"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"

- id: ip_color
  label: IP Color
  kind: action
  description: "IP: PICTURE_COLOUR"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"

- id: ip_tint
  label: IP Tint
  kind: action
  description: "IP: PICTURE_TINT"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"

- id: ip_sharpness
  label: IP Sharpness
  kind: action
  description: "IP: PICTURE_SHARPNESS"
  params:
    - name: level
      type: integer
      description: "0-50 (decimal)"

- id: ip_osd_select
  label: IP OSD Select
  kind: action
  description: "IP: OSD_SELECT"
  params:
    - name: state
      type: string
      description: "on, off"

- id: ip_remote_lock
  label: IP Remote Lock
  kind: action
  description: "IP: REMOTECONTROLER_LOCK"
  params:
    - name: state
      type: string
      description: "on, off"

- id: ip_balance
  label: IP Balance
  kind: action
  description: "IP: AUDIO_BALANCE"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"

- id: ip_color_temperature
  label: IP Color Temperature
  kind: action
  description: "IP: PICTURE_COLOUR_TEMPERATURE"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"

- id: ip_equalizer
  label: IP Equalizer
  kind: action
  description: "IP: AUDIO_EQUALIZER [band] [step]"
  params:
    - name: band
      type: integer
      description: "1-5 (frequency band)"
    - name: step
      type: integer
      description: "0-20 (decimal)"

- id: ip_energy_saving
  label: IP Energy Saving
  kind: action
  description: "IP: ENERGY_SAVING"
  params:
    - name: mode
      type: string
      description: "screenoff, maximum, medium, minimum, off"

- id: ip_channel_add_del
  label: IP Channel Add/Delete
  kind: action
  description: "IP: CHANNEL_ADD_DELETE"
  params:
    - name: action
      type: string
      description: "add, delete"

- id: ip_key_action
  label: IP Key Action
  kind: action
  description: "IP: KEY_ACTION"
  params:
    - name: key
      type: string
      description: "exit, channelup, channeldown, volumeup, volumedown, etc."

- id: ip_backlight
  label: IP Backlight
  kind: action
  description: "IP: PICTURE_BACKLIGHT"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"

- id: ip_input_select
  label: IP Input Select
  kind: action
  description: "IP: INPUT_SELECT"
  params:
    - name: source
      type: string
      description: "dtv, atv, cadtv, catv, avav1, component1, hdmi1, hdmi2, hdmi3"

- id: ip_channel_tune
  label: IP Channel Tune
  kind: action
  description: "IP: CHANNEL_SETTING_ATSC_ATV or CHANNEL_SETTING_ATSC_DTV with channel number and source"
  params:
    - name: data
      type: string
      description: "e.g. '11 antenna' or '30 3 antennanotphy'"

- id: ip_quit
  label: IP Quit Session
  kind: action
  description: "IP: quit — Closes the Telnet session."
  params: []
```

## Feedbacks
```yaml
# Serial ACK format: [Command2][ ][Set ID][ ][OK/NG][Data][x]
# Send FF as data to query current state; ACK returns current value.

- id: power_state
  type: enum
  values: [on, off]
  description: "Serial: Send 'ka [SetID] FF' → ACK returns 00=off, 01=on"

- id: volume_level
  type: integer
  description: "Serial: Send 'kf [SetID] FF' → ACK returns current volume 00-64"

- id: mute_state
  type: enum
  values: [on, off]
  description: "Serial: Send 'ke [SetID] FF' → ACK returns 00=mute on, 01=mute off"

- id: input_source
  type: enum
  description: "Serial: Send 'xb [SetID] FF' → ACK returns current input code"
  values: [DTV, CADTV, Satellite, ATV, CATV, AV, AV2, Component1, Component2, RGB, HDMI1, HDMI2, HDMI3, HDMI4]

- id: aspect_ratio_state
  type: enum
  description: "Serial: Send 'kc [SetID] FF' → ACK returns current aspect ratio code"
```

## Variables
```yaml
- id: set_id
  type: integer
  min: 0
  max: 99
  description: "Device address for RS-232 commands. 0=broadcast to all, 1-99=specific set."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: During media playback/recording, only Power (ka) and Key (mc) commands execute; others return NG.
# Remote lock mode is released after main power cycle (plug-off/plug-in after 20-30 seconds).
# With USB-to-Serial converter, ka command only works when TV is on (unlike direct RS-232C).
```

## Notes
- Serial commands use ASCII characters; data values are hexadecimal encoded. The command format is `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where `[Cr]` is `0x0D`.
- Set ID `00` addresses all connected TVs; `01-99` targets a specific set.
- Sending `FF` as data puts the command in read/query mode — the ACK response contains the current value.
- IP control uses a completely different plain-text keyword protocol over Telnet (port 9761), with decimal parameter ranges instead of hex.
- IP control setup requires entering a hidden menu (hold Settings 5s on Live TV screen, then enter 828). The default password for IP Control Setup is 828.
- IP control is documented as "For USA only."
- Volume range differs between protocols: serial 0x00-0x64 (0-100 decimal), IP 0-100 decimal.
- Sharpness range differs: serial 0x00-0x32 (0-50), IP 0-50.
- Equalizer serial uses a bitfield encoding; IP uses band number + step.
<!-- UNRESOLVED: whether this specific model (49NANO81ANA) has DE9, phone jack, or USB-only serial port -->
<!-- UNRESOLVED: Network IP Control availability outside USA -->
<!-- UNRESOLVED: ISM Method (jp) listed as "Only Plasma TV" — not applicable to this NanoCell LCD model -->
<!-- UNRESOLVED: 3D commands (xt, xv) listed as "only 3D models" — applicability to this model unknown -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_49nano81ana_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:58:35.260Z
retrieved_at: 2026-04-25T20:58:35.260Z
last_checked_at: 2026-04-25T20:58:35.260Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:58:35.260Z
matched_actions: 44
action_count: 44
confidence: high
summary: "All 44 spec actions matched literally; extra commands correctly excluded as model-specific (Plasma, 3D only)."
```

## Known Gaps

```yaml
- jp
- xt
- xv
- ju
```
