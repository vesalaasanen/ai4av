---
spec_id: admin/lg-55uk6550pub-smarttv-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55UK6550PUB SmartTV Series Control Spec"
manufacturer: LG
model_family: 55UK6550PUB
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 55UK6550PUB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:04:57.113Z
generated_at: 2026-04-25T21:04:57.113Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:04:57.113Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "All 27 spec actions matched literally against source, shapes agree, transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 55UK6550PUB SmartTV Series Control Spec

## Summary
LG 55UK6550PUB is a 4K UHD Smart TV supporting both RS-232C serial control and wired/wireless IP control via Telnet. The document covers external control device setup, command protocols, transmission formats, and key code mappings for both control methods.

<!-- UNRESOLVED: 3D-related features depend on specific model variant; not all 55UK6550PUB models may have 3D capability -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9761  # IP Control Telnet port (USA models)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no authentication required for command execution; IP Control setup uses password 828 to enable, not to authenticate
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
        - "00"  # Power Off
        - "01"  # Power On
  protocol: both  # serial: k a; IP: POWER on/off
  description: Control power on/off. With RS232C cable works in any power state. With USB-to-Serial only works when TV is on.

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values:
        - "01"  # Normal screen
        - "02"  # Wide screen (16:9)
        - "04"  # Zoom
        - "05"  # Zoom 2
        - "06"  # Set by Program/Original
        - "07"  # 14:9
        - "09"  # Just Scan
        - "0B"  # Full Wide
        - "0C"  # 21:9
        - "10-1F"  # Cinema Zoom 1-16
  protocol: both  # serial: k c; IP: ASPECT_RATIO

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"  # Screen mute off (Picture on) Video mute off
        - "01"  # Screen mute on (Picture off)
        - "10"  # Video mute on
  protocol: both  # serial: k d; IP: SCREEN_MUTE screenmuteon/videomuteon/allmuteoff

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"  # Volume mute on
        - "01"  # Volume mute off
  protocol: both  # serial: k e; IP: VOLUME_MUTE on/off

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: Volume level (IP Control uses 0-100; RS-232 uses 00-64)
  protocol: both  # serial: k f (00-64); IP: VOLUME_CONTROL (0-100)

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: Contrast level (IP Control uses 0-100; RS-232 uses 00-64)
  protocol: both  # serial: k g (00-64); IP: PICTURE_CONTRAST (0-100)

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: Brightness level (IP Control uses 0-100; RS-232 uses 00-64)
  protocol: both  # serial: k h (00-64); IP: PICTURE_BRIGHTNESS (0-100)

- id: color
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: Color level (IP Control uses 0-100; RS-232 uses 00-64)
  protocol: both  # serial: k i (00-64); IP: PICTURE_COLOUR (0-100)

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: Tint level Red 00 to Green 64 (IP Control uses 0-100)
  protocol: both  # serial: k j (00-64); IP: PICTURE_TINT (0-100)

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: 0-50
      description: Sharpness level (IP Control uses 0-50; RS-232 uses 00-32)
  protocol: both  # serial: k k (00-32); IP: PICTURE_SHARPNESS (0-50)

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"  # OSD off
        - "01"  # OSD on
  protocol: both  # serial: k l; IP: OSD_SELECT on/off

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"  # Lock off
        - "01"  # Lock on
  protocol: both  # serial: k m; IP: REMOTECONTROLER_LOCK on/off
  description: Locks front panel and remote. Released when main power off/on (20-30 sec). In standby with lock on, TV will not turn on by IR or local key.

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: 0-64
  protocol: serial  # k r; IP equivalent not documented separately

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: 0-64
  protocol: serial  # k s; IP equivalent not documented separately

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: Balance level (IP uses 0-100; RS-232 uses 00-64)
  protocol: both  # serial: k t (00-64); IP: AUDIO_BALANCE (0-100)

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: Color temperature (IP uses 0-100; RS-232 uses 00-64)
  protocol: both  # serial: x u (00-64); IP: PICTURE_COLOUR_TEMPERATURE (0-100)

- id: ism_method
  label: ISM Method
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "02"  # Orbiter
        - "08"  # Normal
        - "20"  # Color Wash
  protocol: serial  # j p; plasma TV only
  description: Only Plasma TV

- id: equalizer
  label: Equalizer
  kind: action
  params:
    - name: band
      type: integer
      range: 1-5
    - name: step
      type: integer
      range: 0-20
  protocol: both  # serial: j v; IP: AUDIO_EQUALIZER [1-5] [0-20]
  description: Precondition: Sound mode must be EQ adjustable

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"  # Off
        - "01"  # Minimum
        - "02"  # Medium
        - "03"  # Maximum
        - "04"  # Auto (LCD/LED) / Intelligent sensor (PDP)
        - "05"  # Screen off
  protocol: both  # serial: j q; IP: ENERGY_SAVING off/minimum/medium/maximum/screenoff

- id: tune_command
  label: Tune Command
  kind: action
  params:
    - name: channel_data
      type: object
      properties:
        physical_channel:
          type: integer
          description: Physical channel number (varies by region)
        major_channel:
          type: integer
          description: Major channel number (for digital)
        minor_channel:
          type: integer
          description: Minor/Branch channel number (for digital)
        source:
          type: enum
          values:
            - "00"  # Antenna TV (ATV)
            - "01"  # Cable TV (CATV) - Analog
            - "02"  # Antenna TV (DTV)
            - "06"  # Cable TV (CADTV)
            - "07"  # BS (Japan)
            - "08"  # CS1 (Japan)
            - "09"  # CS2 (Japan)
            - "10"  # Antenna Radio
            - "20"  # Satellite TV
            - "22"  # DTV no physical
            - "26"  # CADTV no physical
            - "40"  # Satellite DTV
            - "46"  # CADTV Major only
            - "50"  # Satellite Radio
            - "66"  # CADTV Major only
            - "80"  # Cable TV (CATV)
  protocol: both  # serial: m a; IP: CHANNEL_SETTING_ATSC_ATV/CHANNEL_SETTING_ATSC_DTV
  description: Complex multi-parameter channel tuning. Format differs significantly between RS-232 and IP control. RS-232 uses hex, IP uses ASCII decimal.

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values:
        - "00"  # Delete/Skip
        - "01"  # Add
  protocol: both  # serial: m b; IP: CHANNEL_ADD_DELETE add/delete

- id: key
  label: Key
  kind: action
  params:
    - name: key_code
      type: string
      description: Key code from the key code table (hex for RS-232, ASCII name for IP)
  protocol: both  # serial: m c; IP: KEY_ACTION
  description: Sends IR remote key code. Full list includes: exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, record, 3d, autoconfig, app, screenbright, number0-9

- id: control_backlight
  label: Control Backlight
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: Backlight level (IP uses 0-100; RS-232 uses 00-64)
  protocol: both  # serial: m g (00-64); IP: PICTURE_BACKLIGHT (0-100)
  description: Precondition for IP: Energy Saving must be off

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "00"  # DTV
        - "01"  # CADTV
        - "02"  # Satellite DTV
        - "03"  # ISDB-CS1 (Japan)
        - "04"  # ISDB-CS2 (Japan)
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
  protocol: both  # serial: x b; IP: INPUT_SELECT dtv/atv/cadtv/catv/avav1/component1/hdmi1/hdmi2/hdmi3
  description: Select main picture input source

- id: picture_3d
  label: 3D
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "off"  # 3D Off
        - "3dto2d"  # 3D to 2D
        - "2dto3d"  # 2D to 3D
    - name: format
      type: enum
      required: false
      values:
        - "topandbottom"
        - "sidebyside"
        - "checkboard"
        - "framesequential"
        - "columninterleaving"
        - "rowinterleaving"
    - name: direction
      type: enum
      required: false
      values:
        - "righttoleft"
        - "lefttoright"
    - name: effect
      type: integer
      required: false
      range: 0-20
  protocol: both  # serial: x t; IP: PICTURE_3D
  description: Only 3D models. Format/direction parameters vary by model and signal.

- id: picture_3d_extension
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: enum
      values:
        - "picturecorrection"
        - "colorcorrection"
        - "sound"
        - "normal"
        - "depth"
        - "viewpoint"
        - "genre"
    - name: value
      type: mixed
      description: Varies by option (0/1 for on/off, 0-20 for depth/viewpoint, 0-5 for genre)
  protocol: both  # serial: x v; IP: PICTURE_3D_EXTENSION
  description: Only 3D models. Preconditions must be met for certain options.

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "01"  # Execute Auto Configure
  protocol: serial  # j u
  description: Adjusts picture position and minimizes image shaking. Only works in RGB (PC) mode.
```

## Feedbacks
```yaml
- id: acknowledgement
  type: enum
  values:
    - OK  # Command accepted
    - NG  # Command rejected or illegal code
  description: All commands return ACK in format [Command2][ ][Set ID][ ][OK/NG][Data][x]

- id: power_state_query
  type: enum
  values:
    - "00"  # Power Off
    - "01"  # Power On
  description: Query power state by sending FF as data. Returns current power state.

- id: volume_mute_query
  type: enum
  values:
    - "00"  # Volume mute on
    - "01"  # Volume mute off

- id: error_code
  type: enum
  values:
    - "00"  # Illegal Code
  description: Returned in NG acknowledgement when data is invalid
```

## Variables
```yaml
# UNRESOLVED: The document describes settable parameters as write-only actions.
# No dedicated query/feedback variables are documented beyond FF read queries.
# All documented parameters (contrast, brightness, volume, etc.) are
# writable actions that support FF to read current value.
```

## Events
```yaml
# UNRESOLVED: No unsolicited event notifications are documented.
# The protocol is strictly command-response; device does not push events.
```

## Macros
```yaml
# No explicit multi-step macros are documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Remote control lock (k m / REMOTECONTROLER_LOCK) interlocks power-on by IR/local key when in standby mode
    source: "When main power is off & on (plug-off and plug-in, after 20-30 seconds), external control lock is released."
  - description: During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and treated as NG
    source: "Note: During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and treated as NG."
```

## Notes

**RS-232 vs IP Control Differences:**
- RS-232 uses hex command format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]`
- IP Control uses ASCII text commands via Telnet: e.g., `VOLUME_MUTE on`
- IP Control port range is 0-100 vs RS-232 00-64 for same parameters (e.g., volume)
- Both protocols support Set ID for multi-device control (RS-232: 1-99, IP via Set ID parameter)

**IP Control Setup:**
- Default setup password: 828
- Enable path: Settings > Network > IP Control Setup > Network IP Control = On
- Requires TV reboot after enabling
- WOL (Wake on LAN) requires "Mobile TV On" to be enabled

**Protocol Notes:**
- Carriage Return (Cr) for RS-232: ASCII code 0x0D
- Space in RS-232 format: ASCII code 0x20
- With USB-to-Serial converter, TV must be powered on to accept commands
- With RS232C cable, power command (ka) works in any power state

<!-- UNRESOLVED: Exact port number 9761 is stated only for USA model; other regions may differ -->
<!-- UNRESOLVED: Detailed energy saving level mapping (j q) for IP control uses different keywords than documented -->
<!-- UNRESOLVED: ISM Method (j p) documented for Plasma TV only; applicability to LCD/LED models unclear -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:04:57.113Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:04:57.113Z
matched_actions: 27
action_count: 27
confidence: high
summary: "All 27 spec actions matched literally against source, shapes agree, transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
