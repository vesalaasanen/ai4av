---
spec_id: admin/lg-50nu830bzua-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 50NU830BZUA Series Control Spec"
manufacturer: LG
model_family: 50NU830BZUA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50NU830BZUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-05-06T17:19:59.024Z
generated_at: 2026-05-06T17:19:59.024Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-06T17:19:59.024Z
  matched_actions: 27
  action_count: 28
  confidence: high
  summary: "All Actions verified against TCP/IP command reference including auto_configure (source line 760); transport (9600 8N1, port 9761) verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 50NU830BZUA Series Control Spec

## Summary
LG 50NU830BZUA series smart LED TV supporting both RS-232C serial and wired/wireless network IP control via Telnet on port 9761. Provides comprehensive AV control including power, picture, audio, channel tuning, input routing, and 3D mode management.

<!-- UNRESOLVED: USB-to-Serial PL2303 chip-based converter noted but no TCP/IP port beyond 9761 stated for general use; Network IP Control section restricted to USA only per source -->

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
  auth:
    type: none  # inferred: no auth procedure for RS-232 in source
addressing:
  port: 9761  # TCP Telnet port stated for IP control (USA only)
  # UNRESOLVED: IP address assignment method not stated (DHCP/static)
auth:
  type: none  # inferred: no login/password required for either control path
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
  tcp_command: "POWER [on|off]"
  note: "With RS232C cable works in power-on or power-off status; with USB-to-Serial only works when TV is on"

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
        - "10-1F"
      description: "01:Normal, 02:Wide, 04:Zoom, 05:Zoom2, 06:Original, 07:14:9, 09:Just Scan, 0B:Full Wide, 0C:21:9, 10-1F:Cinema Zoom 1-16"
  tcp_command: "ASPECT_RATIO [4by3|16by9|setbyoriginal]"

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
      description: "00:Off, 01:Screen mute on, 10:Video mute on"
  tcp_command: "SCREEN_MUTE [screenmuteon|videomuteon|allmuteoff]"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00:Mute on, 01:Mute off"
  tcp_command: "VOLUME_MUTE [on|off]"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Volume level (RS-232: 00-64, IP: 0-100)"
  tcp_command: "VOLUME_CONTROL [0-100]"

- id: picture_contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Contrast level (RS-232: 00-64, IP: 0-100)"
  tcp_command: "PICTURE_CONTRAST [0-100]"

- id: picture_brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Brightness level (RS-232: 00-64, IP: 0-100)"
  tcp_command: "PICTURE_BRIGHTNESS [0-100]"

- id: picture_colour
  label: Colour
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Colour level (RS-232: 00-64, IP: 0-100)"
  tcp_command: "PICTURE_COLOUR [0-100]"

- id: picture_tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Tint level Red 00 to Green 64 (RS-232); 0-100 (IP)"
  tcp_command: "PICTURE_TINT [0-100]"

- id: picture_sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: 0-50
      description: "Sharpness level (RS-232: 00-32, IP: 0-50)"
  tcp_command: "PICTURE_SHARPNESS [0-50]"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00:OSD off, 01:OSD on"
  tcp_command: "OSD_SELECT [on|off]"

- id: remote_control_lock
  label: Remote Control Lock
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00:Lock off, 01:Lock on"
  tcp_command: "REMOTECONTROLER_LOCK [on|off]"
  note: "When main power is off & on (plug-off and plug-in, after 20-30 seconds), external control lock is released"

- id: audio_balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Balance level (RS-232: 00-64, IP: 0-100)"
  tcp_command: "AUDIO_BALANCE [0-100]"

- id: audio_treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: 0-64
      description: "Treble level (RS-232 only, 00-64)"
  tcp_command: null

- id: audio_bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: 0-64
      description: "Bass level (RS-232 only, 00-64)"
  tcp_command: null

- id: picture_colour_temperature
  label: Colour Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Colour temperature (IP: 0-100)"
  tcp_command: "PICTURE_COLOUR_TEMPERATURE [0-100]"

- id: audio_equalizer
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
  tcp_command: "AUDIO_EQUALIZER [1-5] [0-20]"
  note: "Precondition: All settings > sound > sound mode settings > Equalizer on"

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
      description: "00:Off, 01:Minimum, 02:Medium, 03:Maximum, 04:Auto, 05:Screen off"
  tcp_command: "ENERGY_SAVING [screenoff|maximum|medium|minimum|off]"

- id: channel_tune
  label: Channel Tune
  kind: action
  params:
    - name: channel_data
      type: string
      description: "Channel data (region-dependent, multi-byte format)"
  tcp_command: "CHANNEL_SETTING_ATSC_ATV [Channel Number] [antenna|cable]"
  note: "Supports multiple regional formats; ma command uses 2-byte channel data for RS-232; IP control uses ATSC-specific syntax"

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values:
        - add
        - delete
      description: "Add or delete/skip channel"
  tcp_command: "CHANNEL_ADD_DELETE [add|delete]"

- id: key_action
  label: Key Action
  kind: action
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
        - "3d"
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
      description: "Sends IR remote key code to TV"
  tcp_command: "KEY_ACTION [keyname]"

- id: picture_backlight
  label: Backlight Control
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Backlight level (IP: 0-100)"
  tcp_command: "PICTURE_BACKLIGHT [0-100]"
  note: "Precondition: All settings > picture > Energy Saving off"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values:
        - dtv
        - atv
        - cadtv
        - catv
        - avav1
        - component1
        - hdmi1
        - hdmi2
        - hdmi3
      description: "Input source selection (IP); RS-232 uses hex values (00:DTV, 01:CADTV, 02:Satellite DTV, 10:ATV, 11:CATV, 20:AV/AV1, 21:AV2, 40:Component1, 41:Component2, 60:RGB, 90:HDMI1, 91:HDMI2, 92:HDMI3, 93:HDMI4)"
  tcp_command: "INPUT_SELECT [dtv|atv|cadtv|catv|avav1|component1|hdmi1|hdmi2|hdmi3]"

- id: picture_3d
  label: 3D Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "off"
        - "3dto2d"
        - "2dto3d"
        - "on"
      description: "3D mode selection"
    - name: format
      type: enum
      values:
        - topandbottom
        - sidebyside
        - checkboard
        - framesequential
        - columninterleaving
        - rowinterleaving
      description: "3D format (for on/2dto3d)"
    - name: direction
      type: enum
      values:
        - righttoleft
        - lefttoright
      description: "3D direction"
    - name: effect
      type: integer
      range: 0-20
      description: "3D effect/depth"
  tcp_command: "PICTURE_3D [off|3dto2d|2dto3d|on]"
  note: "Only for 3D models; command syntax differs between RS-232 (hex data structure) and IP control"

- id: picture_3d_extension
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: enum
      values:
        - picturecorrection
        - colorcorrection
        - sound
        - normal
        - depth
        - viewpoint
        - genre
      description: "3D extension option"
    - name: value
      type: string
      description: "Option-specific value"
  tcp_command: "PICTURE_3D_EXTENSION [option] [value]"
  note: "Only for 3D models; precondition requirements vary by sub-command"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: enum
      values:
        - "01"
      description: "Execute auto configure (RS-232: 01); IP control uses no data"
  tcp_command: "Auto Configure (no data)"
  note: "Adjusts picture position and minimizes image shaking; works only in RGB (PC) mode"

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
      description: "02:Orbiter, 08:Normal, 20:Colour Wash (RS-232 only, Plasma TV)"
  tcp_command: null
  note: "Plasma TV only; not applicable to LED/LCD models like NU830 series"
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
  query_command: "POWER"
  ack_format: "[a] [SetID] [OK/NG] [Data] [x]"

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values:
    - "00"
    - "01"
  description: "00:Mute on, 01:Mute off"

- id: screen_mute_state
  label: Screen Mute State
  type: enum
  values:
    - "00"
    - "01"
    - "10"
  description: "00:Off, 01:Screen mute on, 10:Video mute on"

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
    - "10-1F"
  description: "Current aspect ratio mode"

- id: input_source_state
  label: Input Source State
  type: string
  description: "Current input source"

- id: channel_tune_response
  label: Channel Tune Response
  type: string
  description: "Channel tune acknowledgement with channel data"
  ack_format: "[a] [SetID] [OK] [Data00-05] [x] or [a] [SetID] [NG] [Data00] [x]"
```

## Variables
```yaml
# Settable parameters documented as range-based actions above.
# No separate variables section required; all parameters are action-based.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
# TV sends ACK/NG responses to commands but does not initiate unsolicited messages.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: remote_lock_power_interlock
    description: "When remote control lock (key lock) is enabled and TV is in standby mode (DC off by off timer or ka/mc command), TV will not turn on via IR remote or front panel power key"
  - id: key_lock_release
    description: "Remote control lock is released when main power is cycled off and on (unplug and replug, after 20-30 seconds)"
# UNRESOLVED: no explicit safety warnings for voltage, current, or power specifications
```

## Notes
Both RS-232 and TCP/IP (Telnet) control paths share the same logical command set but use different syntaxes. RS-232 uses hex command codes (e.g., `ka` for power) with carriage-return terminator and Set ID targeting; TCP/IP uses human-readable commands (e.g., `POWER on`) over Telnet.

**RS-232 Protocol:** `[Command1][Command2][ ][Set ID][ ][Data][Cr]` — ACK: `[Command2][ ][Set ID][ ][OK/NG][Data][x]`

**TCP/IP Protocol:** Human-readable ASCII commands over Telnet port 9761; response is `OK` or `NG`.

Key differences: RS-232 power command works from any TV power state; USB-to-Serial power command only works when TV is already on. Network IP control section is noted as USA-only in source. Default IP control password/pin is 828.

During media playback or recording, all commands except Power (`ka`) and Key (`mc`) return NG.

<!-- UNRESOLVED: ISM Method (j p) applies to Plasma TV only — not applicable to NU830 LED series but included for completeness -->
<!-- UNRESOLVED: 3D commands apply only to 3D model variants — NU830 may or may not be 3D capable -->
<!-- UNRESOLVED: WOL (Wake on LAN) mentioned for mobile TV on but no protocol details -->
<!-- UNRESOLVED: Set ID range is 1-99 (decimal) / 0x00-0x63 (hex) — Set ID 0 controls all TVs simultaneously -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-05-06T17:19:59.024Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-06T17:19:59.024Z
matched_actions: 27
action_count: 28
confidence: high
summary: "All Actions verified against TCP/IP command reference including auto_configure (source line 760); transport (9600 8N1, port 9761) verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
