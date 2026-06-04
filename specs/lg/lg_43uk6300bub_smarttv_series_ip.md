---
spec_id: admin/lg-43uk6300bub-smarttv-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 43UK6300BUB SmartTV Series Control Spec"
manufacturer: LG
model_family: 43UK6300BUB
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 43UK6300BUB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manualslib.com
  - proaudioinc.com
source_urls:
  - https://www.manualslib.com/manual/2662477/Lg-43uk63-Series.html
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-03T07:16:25.910Z
last_checked_at: 2026-06-03T07:16:25.910Z
generated_at: 2026-06-03T07:16:25.910Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232C cable type (DE9 vs phone jack) varies by market — not specified in source"
  - "no standalone settable parameters distinct from actions documented separately"
  - "no unsolicited event notifications documented"
  - "no multi-step command sequences described in source"
  - "ISM Method (jp) is for Plasma TV only — not applicable to LED LCD model 43UK6300BUB"
  - "Equalizer (jv) RS-232 uses complex bit-encoded frequency band data (MSB/LSB format) — needs specialized parser"
  - "3D commands (xt, xv) RS-232 use multi-byte data structures; simplified IP syntax provided"
  - "Japan model satellite source codes (02=ATSC, 07=BS, 08=CS1, 09=CS2) may differ from other regions"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:16:25.910Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "Perfect match: all 25 actions found (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-17
---

# LG 43UK6300BUB SmartTV Series Control Spec

## Summary
LG 43UK6300BUB Smart TV supporting both RS-232C serial control and wired IP control via Telnet. Serial uses 9600 baud 8N1 ASCII protocol; IP control uses TCP port 9761 with text-based command names. Supports power, picture adjustment, audio, input routing, channel tuning, 3D modes, and remote key emulation.

<!-- UNRESOLVED: RS-232C cable type (DE9 vs phone jack) varies by market — not specified in source -->

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
  port: 9761  # IP control port; RS-232 has no configurable port
auth:
  type: none  # inferred: no auth required for IP control session
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
      description: "00=Off, 01=On"
  rs232_command: ["k", "a"]
  ip_command: "POWER"

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
      description: "01=Normal, 02=Wide, 04=Zoom, 05=Zoom2, 06=Original, 07=14:9, 09=JustScan, 0B=FullWide, 0C=21:9, 10-1F=CinemaZoom1-16"
  rs232_command: ["k", "c"]
  ip_command: "ASPECT_RATIO"
  ip_values: ["4by3", "16by9", "setbyoriginal"]

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
      description: "00=Off, 01=PictureOff, 10=VideoOff"
  rs232_command: ["k", "d"]
  ip_command: "SCREEN_MUTE"
  ip_values: ["screenmuteon", "videomuteon", "allmuteoff"]

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00=MuteOn, 01=MuteOff"
  rs232_command: ["k", "e"]
  ip_command: "VOLUME_MUTE"
  ip_values: ["on", "off"]

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      minimum: 0
      maximum: 100
      description: "Volume level 0-100 (decimal)"
  rs232_command: ["k", "f"]
  rs232_range: [0, 64]
  ip_command: "VOLUME_CONTROL"
  ip_range: [0, 100]

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      minimum: 0
      maximum: 100
      description: "Contrast level 0-100 (decimal)"
  rs232_command: ["k", "g"]
  rs232_range: [0, 64]
  ip_command: "PICTURE_CONTRAST"
  ip_range: [0, 100]

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      minimum: 0
      maximum: 100
      description: "Brightness level 0-100 (decimal)"
  rs232_command: ["k", "h"]
  rs232_range: [0, 64]
  ip_command: "PICTURE_BRIGHTNESS"
  ip_range: [0, 100]

- id: color_colour
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      minimum: 0
      maximum: 100
      description: "Color level 0-100 (decimal)"
  rs232_command: ["k", "i"]
  rs232_range: [0, 64]
  ip_command: "PICTURE_COLOUR"
  ip_range: [0, 100]

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      minimum: 0
      maximum: 100
      description: "Tint level 0-100 (Red=0, Green=100)"
  rs232_command: ["k", "j"]
  rs232_range: [0, 64]
  ip_command: "PICTURE_TINT"
  ip_range: [0, 100]

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      minimum: 0
      maximum: 100
      description: "Sharpness level 0-100 (decimal)"
  rs232_command: ["k", "k"]
  rs232_range: [0, 32]
  ip_command: "PICTURE_SHARPNESS"
  ip_range: [0, 50]

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
  rs232_command: ["k", "l"]
  ip_command: "OSD_SELECT"
  ip_values: ["on", "off"]

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
  rs232_command: ["k", "m"]
  ip_command: "REMOTECONTROLER_LOCK"
  ip_values: ["on", "off"]

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      minimum: 0
      maximum: 64
      description: "Treble level 0-64"
  rs232_command: ["k", "r"]

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      minimum: 0
      maximum: 64
      description: "Bass level 0-64"
  rs232_command: ["k", "s"]

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      minimum: 0
      maximum: 100
      description: "Balance level 0-100 (L=0, R=100)"
  rs232_command: ["k", "t"]
  rs232_range: [0, 64]
  ip_command: "AUDIO_BALANCE"
  ip_range: [0, 100]

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      minimum: 0
      maximum: 100
      description: "Color temperature 0-100"
  rs232_command: ["x", "u"]
  rs232_range: [0, 64]
  ip_command: "PICTURE_COLOUR_TEMPERATURE"
  ip_range: [0, 100]

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
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto, 05=ScreenOff"
  rs232_command: ["j", "q"]
  ip_command: "ENERGY_SAVING"
  ip_values: ["off", "minimum", "medium", "maximum", "screenoff"]

- id: tune_command
  label: Tune Command
  kind: action
  params:
    - name: channel_number
      type: integer
      description: "Channel number (varies by region/signal type)"
    - name: source_type
      type: string
      description: "Source type (antenna, cable, etc.)"
  rs232_command: ["m", "a"]
  ip_command: "CHANNEL_SETTING_ATSC_ATV"
  notes: "RS-232 supports complex multi-byte channel data; IP control provides simplified ATSC/ATV/DTV commands"

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
  rs232_command: ["m", "b"]
  ip_command: "CHANNEL_ADD_DELETE"
  ip_values: ["add", "delete"]

- id: key
  label: Key
  kind: action
  params:
    - name: key_code
      type: string
      description: "Key code from remote control code table"
  rs232_command: ["m", "c"]
  ip_command: "KEY_ACTION"
  ip_values: ["exit", "channelup", "channeldown", "volumeup", "volumedown", "arrowright", "arrowleft", "volumemute", "deviceinput", "sleepreserve", "livetv", "previouschannel", "favoritechannel", "teletext", "teletextoption", "returnback", "avmode", "captionsubtitle", "arrowup", "arrowdown", "myapp", "settingmenu", "ok", "quickmenu", "videomode", "audiomode", "channellist", "bluebutton", "yellowbutton", "greenbutton", "redbutton", "aspectratio", "audiodescription", "programmorder", "userguide", "smarthome", "simplelink", "fastforward", "rewind", "programminfo", "programguide", "play", "slowplay", "soccerscreen", "record", "3d", "autoconfig", "app", "screenbright", "number0"-"number9"]

- id: backlight
  label: Backlight Control
  kind: action
  params:
    - name: level
      type: integer
      minimum: 0
      maximum: 100
      description: "Backlight level 0-100"
  rs232_command: ["m", "g"]
  rs232_range: [0, 64]
  ip_command: "PICTURE_BACKLIGHT"
  ip_range: [0, 100]

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
      description: "00=DTV, 01=CADTV, 02=Satellite, 03=ISDB-CS1, 04=ISDB-CS2, 10=ATV, 11=CATV, 20=AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90-93=HDMI1-4"
  rs232_command: ["x", "b"]
  ip_command: "INPUT_SELECT"
  ip_values: ["dtv", "atv", "cadtv", "catv", "avav1", "component1", "hdmi1", "hdmi2", "hdmi3"]

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
      description: "3D mode setting"
  ip_command: "PICTURE_3D"
  notes: "RS-232 uses multi-byte format [Data00-03]; IP uses simplified syntax"

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
      description: "3D extended options"
    - name: value
      type: string
      description: "Option-specific value"
  ip_command: "PICTURE_3D_EXTENSION"
  notes: "RS-232 uses [x][v] command; IP uses PICTURE_3D_EXTENSION"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: enum
      values:
        - "01"
      description: "01=Start auto configure"
  rs232_command: ["j", "u"]
  ip_command: " autoconfig"
  notes: "Works only in RGB (PC) mode"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - "00"
    - "01"
  description: "00=PowerOff, 01=PowerOn"
  query_command: ["k", "a", "FF"]
  ip_query: "POWER"

- id: volume_mute_state
  type: enum
  values:
    - "00"
    - "01"
  description: "00=MuteOn, 01=MuteOff"
  query_command: ["k", "e", "FF"]

- id: volume_level
  type: integer
  range: [0, 64]
  query_command: ["k", "f", "FF"]

- id: contrast_level
  type: integer
  range: [0, 64]
  query_command: ["k", "g", "FF"]

- id: brightness_level
  type: integer
  range: [0, 64]
  query_command: ["k", "h", "FF"]

- id: color_level
  type: integer
  range: [0, 64]
  query_command: ["k", "i", "FF"]

- id: tint_level
  type: integer
  range: [0, 64]
  query_command: ["k", "j", "FF"]

- id: sharpness_level
  type: integer
  range: [0, 32]
  query_command: ["k", "k", "FF"]

- id: osd_state
  type: enum
  values:
    - "00"
    - "01"
  query_command: ["k", "l", "FF"]

- id: remote_lock_state
  type: enum
  values:
    - "00"
    - "01"
  query_command: ["k", "m", "FF"]

- id: treble_level
  type: integer
  range: [0, 64]
  query_command: ["k", "r", "FF"]

- id: bass_level
  type: integer
  range: [0, 64]
  query_command: ["k", "s", "FF"]

- id: balance_level
  type: integer
  range: [0, 64]
  query_command: ["k", "t", "FF"]

- id: color_temperature_level
  type: integer
  range: [0, 64]
  query_command: ["x", "u", "FF"]

- id: energy_saving_mode
  type: enum
  values:
    - "00"
    - "01"
    - "02"
    - "03"
    - "04"
    - "05"
  query_command: ["j", "q", "FF"]

- id: input_source
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
  query_command: ["x", "b", "FF"]

- id: ack_response
  type: enum
  values:
    - "OK"
    - "NG"
  description: "Acknowledgement response format: [Command2][ ][SetID][ ][OK/NG][Data][x]"

- id: error_code
  type: enum
  values:
    - "00"
  description: "Error code 00 = Illegal Code"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters distinct from actions documented separately
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Remote control lock (km command) prevents IR and local key power-on when active in standby mode"
  - description: "External control lock released 20-30 seconds after power recycle (plug-off/plug-in)"
confirmation_required_for:
  - power_off  # source notes video/screen mute behavior differs when powering off
```
<!-- UNRESOLVED: ISM Method (jp) is for Plasma TV only — not applicable to LED LCD model 43UK6300BUB -->

## Notes

**RS-232C Protocol Format:**
- Transmission: `[Command1][Command2][ ][Set ID][ ][Data][Cr]`
- Set ID range: 1-99 (decimal), 0x00-0x63 (hexadecimal). Set ID 0 controls all devices.
- Read mode: send `FF` as data to query current value
- Acknowledgement: `[Command2][ ][Set ID][ ][OK/NG][Data][x]`

**IP Control Protocol Format:**
- Connect via Telnet to port 9761
- Send text commands ending with Enter: e.g., `VOLUME_MUTE on`
- Response: `OK` or `NG`
- Exit: send `quit`

**Protocol Restrictions:**
- During media playback or recording, all commands except `POWER` (ka) and `KEY` (mc) are rejected as NG
- With USB-to-Serial converter, TV must be powered on for commands to work (RS-232 cable allows power commands in any state)

**Key Code Reference (for mc command):** 0x00-0x72 hex values mapped to remote buttons (CH+, VOL+, MUTE, etc.). See source pp.2-3 for full table.

**Channel Tuning Complexity:** Tune command (ma) has different data structures for analog vs digital, antenna vs cable vs satellite, and varies by region (Europe/Middle East, South Korea, North/Latin America, Japan). The IP control simplifies this to `CHANNEL_SETTING_ATSC_ATV`, `CHANNEL_SETTING_ATSC_DTV` commands.

<!-- UNRESOLVED: Equalizer (jv) RS-232 uses complex bit-encoded frequency band data (MSB/LSB format) — needs specialized parser -->

<!-- UNRESOLVED: 3D commands (xt, xv) RS-232 use multi-byte data structures; simplified IP syntax provided -->

<!-- UNRESOLVED: Japan model satellite source codes (02=ATSC, 07=BS, 08=CS1, 09=CS2) may differ from other regions -->

## Provenance

```yaml
source_domains:
  - manualslib.com
  - proaudioinc.com
source_urls:
  - https://www.manualslib.com/manual/2662477/Lg-43uk63-Series.html
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-03T07:16:25.910Z
last_checked_at: 2026-06-03T07:16:25.910Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:16:25.910Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "Perfect match: all 25 actions found (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232C cable type (DE9 vs phone jack) varies by market — not specified in source"
- "no standalone settable parameters distinct from actions documented separately"
- "no unsolicited event notifications documented"
- "no multi-step command sequences described in source"
- "ISM Method (jp) is for Plasma TV only — not applicable to LED LCD model 43UK6300BUB"
- "Equalizer (jv) RS-232 uses complex bit-encoded frequency band data (MSB/LSB format) — needs specialized parser"
- "3D commands (xt, xv) RS-232 use multi-byte data structures; simplified IP syntax provided"
- "Japan model satellite source codes (02=ATSC, 07=BS, 08=CS1, 09=CS2) may differ from other regions"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
