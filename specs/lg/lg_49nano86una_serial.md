---
schema_version: ai4av-public-spec-v1
device_id: lg/49nano86una
entity_id: lg_49nano86una
spec_id: admin/lg-49nano86una
revision: 1
author: admin
title: "LG 49NANO86UNA Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: 49NANO86UNA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49NANO86UNA
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_49nano86una_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:58:37.209Z
retrieved_at: 2026-04-25T20:58:37.209Z
last_checked_at: 2026-04-25T20:58:37.209Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:58:37.209Z
  matched_actions: 45
  action_count: 45
  confidence: high
  summary: "All 45 spec actions matched verbatim in source; all transport parameters verified; full bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 49NANO86UNA Control Spec

## Summary
The LG 49NANO86UNA is a NanoCell TV that supports external control via RS-232C serial and IP (Telnet) connections. This spec covers both the RS-232C command protocol (ASCII-based, two-character command codes with hexadecimal data) and the Network IP Control protocol (plain-text Telnet commands on port 9761). Controls include power, volume, input selection, channel tuning, picture adjustments, and more.

<!-- UNRESOLVED: exact connector type (DE9 vs phone jack) for this specific model not stated -->
<!-- UNRESOLVED: Network IP Control section marked "For USA only" — applicability to other regions unclear -->

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
  port: 9761
auth:
  type: none  # inferred: RS-232C has no auth procedure in source
```

<!-- UNRESOLVED: Network IP Control requires enabling via TV menu with password 828; not traditional auth but a setup prerequisite -->

## Traits
```yaml
- powerable    # power on/off commands present (ka, POWER)
- routable     # input selection commands present (xb, INPUT_SELECT)
- queryable    # FF data read mode returns current status
- levelable    # volume, contrast, brightness, color, tint, sharpness, backlight, bass, treble, balance controls present
```

## Actions
```yaml
# === RS-232C Commands ===

- id: power_control
  label: Power Control (RS-232)
  kind: action
  command: "ka"
  description: "Control power on/off. Transmission: [k][a][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Power Off
        - "01"  # Power On
      description: "00=Off, 01=On. Send FF to query status."

- id: aspect_ratio
  label: Aspect Ratio (RS-232)
  kind: action
  command: "kc"
  description: "Adjust screen format. Transmission: [k][c][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "01"  # Normal screen
        - "02"  # Wide screen (16:9)
        - "04"  # Zoom
        - "05"  # Zoom 2
        - "06"  # Set by Program/Original
        - "07"  # 14:9 (4:3)
        - "09"  # Just Scan
        - "0B"  # Full Wide
        - "0C"  # 21:9
        - "10"-"1F"  # Cinema Zoom 1-16
      description: "Screen format selection"

- id: screen_mute
  label: Screen Mute (RS-232)
  kind: action
  command: "kd"
  description: "Select screen mute on/off. Transmission: [k][d][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Screen mute off (Picture on), Video mute off
        - "01"  # Screen mute on (Picture off)
        - "10"  # Video mute on
      description: "Screen/video mute control"

- id: volume_mute
  label: Volume Mute (RS-232)
  kind: action
  command: "ke"
  description: "Control volume mute on/off. Transmission: [k][e][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Volume mute on (Volume off)
        - "01"  # Volume mute off (Volume on)
      description: "00=Mute on, 01=Mute off. Send FF to query."

- id: volume_control
  label: Volume Control (RS-232)
  kind: action
  command: "kf"
  description: "Adjust volume. Transmission: [k][f][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: integer
      min: "00"
      max: "64"
      description: "Volume level 00-64 (hex)"

- id: contrast
  label: Contrast (RS-232)
  kind: action
  command: "kg"
  description: "Adjust screen contrast. Transmission: [k][g][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: integer
      min: "00"
      max: "64"
      description: "Contrast level 00-64 (hex)"

- id: brightness
  label: Brightness (RS-232)
  kind: action
  command: "kh"
  description: "Adjust screen brightness. Transmission: [k][h][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: integer
      min: "00"
      max: "64"
      description: "Brightness level 00-64 (hex)"

- id: color
  label: Color (RS-232)
  kind: action
  command: "ki"
  description: "Adjust screen color. Transmission: [k][i][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: integer
      min: "00"
      max: "64"
      description: "Color level 00-64 (hex)"

- id: tint
  label: Tint (RS-232)
  kind: action
  command: "kj"
  description: "Adjust screen tint. Transmission: [k][j][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: integer
      min: "00"
      max: "64"
      description: "Tint: Red=00 to Green=64 (hex)"

- id: sharpness
  label: Sharpness (RS-232)
  kind: action
  command: "kk"
  description: "Adjust screen sharpness. Transmission: [k][k][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: integer
      min: "00"
      max: "32"
      description: "Sharpness level 00-32 (hex)"

- id: osd_select
  label: OSD Select (RS-232)
  kind: action
  command: "kl"
  description: "Select OSD on/off. Transmission: [k][l][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # OSD off
        - "01"  # OSD on
      description: "OSD display toggle"

- id: remote_control_lock
  label: Remote Control Lock Mode (RS-232)
  kind: action
  command: "km"
  description: "Lock front panel and remote controls. Transmission: [k][m][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Lock off
        - "01"  # Lock on
      description: "00=Lock off, 01=Lock on. Released on main power cycle."

- id: treble
  label: Treble (RS-232)
  kind: action
  command: "kr"
  description: "Adjust treble. Transmission: [k][r][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: integer
      min: "00"
      max: "64"
      description: "Treble level 00-64 (hex)"

- id: bass
  label: Bass (RS-232)
  kind: action
  command: "ks"
  description: "Adjust bass. Transmission: [k][s][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: integer
      min: "00"
      max: "64"
      description: "Bass level 00-64 (hex)"

- id: balance
  label: Balance (RS-232)
  kind: action
  command: "kt"
  description: "Adjust balance. Transmission: [k][t][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: integer
      min: "00"
      max: "64"
      description: "Balance level 00-64 (hex)"

- id: color_temperature
  label: Color Temperature (RS-232)
  kind: action
  command: "xu"
  description: "Adjust colour temperature. Transmission: [x][u][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: integer
      min: "00"
      max: "64"
      description: "Color temperature level 00-64 (hex)"

- id: energy_saving
  label: Energy Saving (RS-232)
  kind: action
  command: "jq"
  description: "Control energy saving mode. Transmission: [j][q][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Off
        - "01"  # Minimum
        - "02"  # Medium
        - "03"  # Maximum
        - "04"  # Auto / Intelligent sensor
        - "05"  # Screen off
      description: "Energy saving level"

- id: tune_command
  label: Tune Command (RS-232)
  kind: action
  command: "ma"
  description: "Tune to channel. Format varies by region and signal type (analog/digital/satellite). Transmission: [m][a][ ][Set ID][ ][Data...][Cr]"
  params:
    - name: data
      type: string
      description: "Multi-byte: channel data + input source. See source for regional variants."

- id: channel_add_del
  label: Channel Add/Delete (RS-232)
  kind: action
  command: "mb"
  description: "Add or delete/skip current channel. Transmission: [m][b][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Delete/Skip
        - "01"  # Add
      description: "Channel add or delete/skip"

- id: key_action
  label: Key Action (RS-232)
  kind: action
  command: "mc"
  description: "Send IR remote key code. Transmission: [m][c][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: string
      description: "Hex key code from key code table (e.g. 08=Power, 02=Vol+, 03=Vol-)"

- id: backlight_control
  label: Backlight Control (RS-232)
  kind: action
  command: "mg"
  description: "Control backlight level. Transmission: [m][g][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: integer
      min: "00"
      max: "64"
      description: "Backlight level 00-64 (hex)"

- id: input_select
  label: Input Select (RS-232)
  kind: action
  command: "xb"
  description: "Select input source for main picture. Transmission: [x][b][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
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
      description: "Input source selection"

# === Network IP Control Commands (Telnet) ===

- id: ip_power
  label: Power Control (IP)
  kind: action
  command: "POWER"
  description: "Control power via Telnet."
  params:
    - name: state
      type: enum
      values: ["off"]
      description: "POWER off. UNRESOLVED: power on command not documented for IP control"

- id: ip_aspect_ratio
  label: Aspect Ratio (IP)
  kind: action
  command: "ASPECT_RATIO"
  description: "Set aspect ratio via Telnet."
  params:
    - name: mode
      type: enum
      values: ["4by3", "16by9", "setbyoriginal"]

- id: ip_screen_mute
  label: Screen Mute (IP)
  kind: action
  command: "SCREEN_MUTE"
  description: "Control screen mute via Telnet."
  params:
    - name: mode
      type: enum
      values: ["screenmuteon", "videomuteon", "allmuteoff"]

- id: ip_volume_mute
  label: Volume Mute (IP)
  kind: action
  command: "VOLUME_MUTE"
  description: "Control volume mute via Telnet."
  params:
    - name: state
      type: enum
      values: ["on", "off"]

- id: ip_volume_control
  label: Volume Control (IP)
  kind: action
  command: "VOLUME_CONTROL"
  description: "Set volume level via Telnet."
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Volume level 0-100 (decimal)"

- id: ip_contrast
  label: Contrast (IP)
  kind: action
  command: "PICTURE_CONTRAST"
  description: "Set contrast via Telnet."
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Contrast 0-100 (decimal)"

- id: ip_brightness
  label: Brightness (IP)
  kind: action
  command: "PICTURE_BRIGHTNESS"
  description: "Set brightness via Telnet."
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Brightness 0-100 (decimal)"

- id: ip_color
  label: Color (IP)
  kind: action
  command: "PICTURE_COLOUR"
  description: "Set color via Telnet."
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Color 0-100 (decimal)"

- id: ip_tint
  label: Tint (IP)
  kind: action
  command: "PICTURE_TINT"
  description: "Set tint via Telnet."
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Tint 0-100 (decimal)"

- id: ip_sharpness
  label: Sharpness (IP)
  kind: action
  command: "PICTURE_SHARPNESS"
  description: "Set sharpness via Telnet."
  params:
    - name: level
      type: integer
      min: 0
      max: 50
      description: "Sharpness 0-50 (decimal)"

- id: ip_osd_select
  label: OSD Select (IP)
  kind: action
  command: "OSD_SELECT"
  description: "Toggle OSD via Telnet."
  params:
    - name: state
      type: enum
      values: ["on", "off"]

- id: ip_remote_lock
  label: Remote Control Lock (IP)
  kind: action
  command: "REMOTECONTROLER_LOCK"
  description: "Lock remote control via Telnet."
  params:
    - name: state
      type: enum
      values: ["on", "off"]

- id: ip_balance
  label: Balance (IP)
  kind: action
  command: "AUDIO_BALANCE"
  description: "Set audio balance via Telnet."
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Balance 0-100 (decimal)"

- id: ip_color_temperature
  label: Color Temperature (IP)
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE"
  description: "Set color temperature via Telnet."
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Color temperature 0-100 (decimal)"

- id: ip_equalizer
  label: Equalizer (IP)
  kind: action
  command: "AUDIO_EQUALIZER"
  description: "Set equalizer band level via Telnet. Requires sound mode EQ enabled."
  params:
    - name: band
      type: integer
      min: 1
      max: 5
      description: "Frequency band (1-5)"
    - name: step
      type: integer
      min: 0
      max: 20
      description: "Step value (decimal)"

- id: ip_energy_saving
  label: Energy Saving (IP)
  kind: action
  command: "ENERGY_SAVING"
  description: "Set energy saving mode via Telnet."
  params:
    - name: mode
      type: enum
      values: ["screenoff", "maximum", "medium", "minimum", "off"]

- id: ip_tune
  label: Tune Command (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV / CHANNEL_SETTING_ATSC_DTV"
  description: "Tune channel via Telnet. Format varies by signal type."
  params:
    - name: channel
      type: string
      description: "Channel number and source (antenna/cable/cablenotphy)"

- id: ip_channel_add_del
  label: Channel Add/Delete (IP)
  kind: action
  command: "CHANNEL_ADD_DELETE"
  description: "Add or delete channel via Telnet."
  params:
    - name: action
      type: enum
      values: ["add", "delete"]

- id: ip_key_action
  label: Key Action (IP)
  kind: action
  command: "KEY_ACTION"
  description: "Send remote key via Telnet."
  params:
    - name: key
      type: enum
      values: ["exit", "channelup", "channeldown", "volumeup", "volumedown", "arrowright", "arrowleft", "volumemute", "deviceinput", "sleepreserve", "livetv", "previouschannel", "favoritechannel", "teletext", "teletextoption", "returnback", "avmode", "captionsubtitle", "arrowup", "arrowdown", "myapp", "settingmenu", "ok", "quickmenu", "videomode", "audiomode", "channellist", "bluebutton", "yellowbutton", "greenbutton", "redbutton", "aspectratio", "audiodescription", "programmorder", "userguide", "smarthome", "simplelink", "fastforward", "rewind", "programminfo", "programguide", "play", "slowplay", "soccerscreen", "record", "3d", "autoconfig", "app", "screenbright", "number0"-"number9"]

- id: ip_backlight
  label: Backlight Control (IP)
  kind: action
  command: "PICTURE_BACKLIGHT"
  description: "Set backlight via Telnet. Requires Energy Saving off."
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Backlight 0-100 (decimal)"

- id: ip_input_select
  label: Input Select (IP)
  kind: action
  command: "INPUT_SELECT"
  description: "Select input source via Telnet."
  params:
    - name: source
      type: enum
      values: ["dtv", "atv", "cadtv", "catv", "avav1", "component1", "hdmi1", "hdmi2", "hdmi3"]

- id: ip_3d
  label: 3D Control (IP)
  kind: action
  command: "PICTURE_3D"
  description: "Control 3D mode via Telnet (3D models only)."
  params:
    - name: mode
      type: string
      description: "off, 3dto2d, or 2dto3d with direction and depth params"

- id: ip_3d_extension
  label: Extended 3D Control (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION"
  description: "Extended 3D options via Telnet (3D models only)."
  params:
    - name: option
      type: string
      description: "picturecorrection, colorcorrection, sound, normal, depth, viewpoint, genre with sub-params"
```

## Feedbacks
```yaml
# RS-232C acknowledgement format: [Command2][ ][Set ID][ ][OK/NG][Data][x]
# OK Ack: normal data received; returns current status for read (FF) mode
# Error Ack: NG with Data 00 = Illegal Code

- id: power_state
  label: Power State
  type: enum
  command: "ka"
  values: ["00", "01"]
  description: "Query with data FF. Returns 00=Off, 01=On"

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  command: "ke"
  values: ["00", "01"]
  description: "Query with data FF. Returns 00=Mute on, 01=Mute off"

- id: volume_level
  label: Volume Level
  type: integer
  command: "kf"
  description: "Query with data FF. Returns current volume 00-64 (hex)"

- id: contrast_level
  label: Contrast Level
  type: integer
  command: "kg"
  description: "Query with data FF. Returns current contrast 00-64 (hex)"

- id: brightness_level
  label: Brightness Level
  type: integer
  command: "kh"
  description: "Query with data FF. Returns current brightness 00-64 (hex)"

- id: input_source
  label: Input Source
  type: enum
  command: "xb"
  description: "Query with data FF. Returns current input source code"

# UNRESOLVED: IP control feedback/query format not documented in source
```

## Variables
```yaml
# All level-type parameters are represented as Actions with numeric params above.
# No additional Variables distinct from Actions identified in source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "During media playback or recording, all commands except Power (ka) and Key (mc) are not executed and treated as NG"
  - "With USB-to-Serial converter, ka command works only when TV is on; RS-232C cable allows ka in power-off state"
  - "Remote control lock is released when main power is cycled (plug-off, wait 20-30 seconds, plug-in)"
  - "With key lock on, TV will not turn on by IR or local key power in standby mode"
# UNRESOLVED: no power-on sequencing requirements stated
```

## Notes
- RS-232C communication uses ASCII codes with Carriage Return (0x0D) terminators and Space (0x20) separators.
- Command format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Command1 is j, k, m, or x.
- Set ID range: 1-99 (decimal in menu, hexadecimal 0x00-0x63 in protocol). Set ID 0 = broadcast to all connected sets.
- Data `FF` in any command queries the current status (read mode).
- LG supports PL2303-based USB-to-serial converters (VID 0x0557, PID 0x2008) for models without native RS-232C ports.
- 3-wire RS-232C configuration: RXD, TXD, GND (not standard). Use a crossed (reverse) cable.
- IP Control is enabled via TV menu: Settings > hold 5s on Live TV screen > enter 828 > IP Control Setup > On. Requires reboot. Default password is 828.
- IP Control uses Telnet on port 9761. Response is OK or NG per command.
- IP Control tune command uses different syntax for ATSC vs DVB regions.
- Equalizer requires sound mode set to EQ adjustable mode.
- Backlight control via IP requires Energy Saving set to off.

<!-- UNRESOLVED: Network IP Control marked "For USA only" — applicability to other regions unclear -->
<!-- UNRESOLVED: exact connector type for RS-232C on this specific model (DE9 vs phone jack vs USB-only) -->
<!-- UNRESOLVED: IP power-on command not documented; only "POWER off" shown -->
<!-- UNRESOLVED: WOL (Wake On LAN) power-on mentioned but no protocol details provided -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_49nano86una_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:58:37.209Z
retrieved_at: 2026-04-25T20:58:37.209Z
last_checked_at: 2026-04-25T20:58:37.209Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:58:37.209Z
matched_actions: 45
action_count: 45
confidence: high
summary: "All 45 spec actions matched verbatim in source; all transport parameters verified; full bidirectional coverage."
```

## Known Gaps

```yaml
[]
```
