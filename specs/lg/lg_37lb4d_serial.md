---
spec_id: admin/lg-37lb4d
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 37LB4D Control Spec"
manufacturer: LG
model_family: 37LB4D
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 37LB4D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
  - manualslib.com
  - scribd.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.manualslib.com/manual/12664790/Lg-Rs-232c.html
  - https://www.scribd.com/document/649294226/LG-TV-RS-232C-Control-Manual
retrieved_at: 2026-06-03T07:16:22.570Z
last_checked_at: 2026-06-03T07:16:22.570Z
generated_at: 2026-06-03T07:16:22.570Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ISM Method (j p) is documented but only applies to Plasma TV models; this model is LCD"
  - "flow control not stated in source"
  - "no discrete settable parameters documented separately from actions;"
  - "no unsolicited event notifications documented"
  - "no multi-step macros documented"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:16:22.570Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 declared actions present in source (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-17
---

# LG 37LB4D Control Spec

## Summary
LG 37LB4D LCD television supporting both RS-232C serial control and wired TCP/IP (Telnet) control. The TV ships with no password for IP control but requires initial setup via the TV menu. Serial communication uses 9600 baud 8N1 ASCII protocol. During media playback or recording, all commands except Power and Key are rejected.

<!-- UNRESOLVED: ISM Method (j p) is documented but only applies to Plasma TV models; this model is LCD -->

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
  port: 9761  # TCP/IP Telnet port; stated for IP control section
auth:
  type: none  # inferred: no authentication required for IP control; TV menu password (828) is only for setup, not command session
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
# RS-232C Commands (ASCII, format: [Command1][Command2][ ][Set ID][ ][Data][Cr])
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: 00=off, 01=on
  command: "ka"
  notes: With RS232C cable, works in power-on or power-off status. With USB-to-Serial, only works when TV is on.

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: >-
        01=Normal, 02=Wide, 04=Zoom, 05=Zoom2, 06=Original,
        07=14:9, 09=Just Scan, 0B=Full Wide, 0C=21:9,
        10-1F=Cinema Zoom 1-16
  command: "kc"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: integer
      description: 00=off, 01=screen mute on, 10=video mute on
  command: "kd"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 00=mute on, 01=mute off
  command: "ke"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 (transmitted as 00-64 hex)
  command: "kf"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 (transmitted as 00-64 hex)
  command: "kg"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 (transmitted as 00-64 hex)
  command: "kh"

- id: color
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 (transmitted as 00-64 hex)
  command: "ki"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 Red-to-Green (transmitted as 00-64 hex)
  command: "kj"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 (transmitted as 00-32 hex)
  command: "kk"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: integer
      description: 00=OSD off, 01=OSD on
  command: "kl"

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  params:
    - name: state
      type: integer
      description: 00=lock off, 01=lock on
  command: "km"
  notes: When main power is off/on (plug-off/plug-in, after 20-30 seconds), external control lock is released. In standby mode with key lock on, TV will not turn on by IR or local key power.

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 (transmitted as 00-64 hex)
  command: "kr"

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 (transmitted as 00-64 hex)
  command: "ks"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 (transmitted as 00-64 hex)
  command: "kt"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 (transmitted as 00-64 hex)
  command: "xu"

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: integer
      description: >-
        00=Off, 01=Minimum, 02=Medium, 03=Maximum,
        04=Auto (LCD/LED) / Intelligent sensor (PDP), 05=Screen off
  command: "jq"

- id: tune_command
  label: Tune Command
  kind: action
  params:
    - name: channel_data
      type: object
      description: >-
        Analog: [Data00][Data01]=channel (0-199), Data02=source
        (00=Antenna ATV, 80=Cable CATV).
        Digital: [Data00-04]=major/minor, Data05=source
        (02=DTV, 06=CADTV, 22=DTV notphy, 26=CADTV notphy,
        46/66=CADTV one-part).
        Two-byte channel data uses high byte + low byte.
  command: "ma"

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: action
      type: integer
      description: 00=Delete/Skip (ATSC/ISDB/DVB), 01=Add
  command: "mb"

- id: key
  label: Key (IR Remote Code)
  kind: action
  params:
    - name: keycode
      type: string
      description: Hex keycode from Remote Key Code table (e.g. 08=Power, 0B=Input, 10-19=Number 0-9)
  command: "mc"
  notes: Key codes are documented in the Key Codes table. This command sends IR remote key codes to the TV.

- id: backlight_control
  label: Backlight Control / Panel Light
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 (transmitted as 00-64 hex)
  command: "mg"

- id: input_select
  label: Input Select (Main Picture)
  kind: action
  params:
    - name: source
      type: integer
      description: >-
        00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1, 04=ISDB-CS2,
        10=ATV, 11=CATV, 20=AV/AV1, 21=AV2, 40=Component1, 41=Component2,
        60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4
  command: "xb"

- id: picture_3d
  label: 3D Mode (3D models only)
  kind: action
  params:
    - name: mode
      type: integer
      description: >-
        Data00: 00=3D On, 01=3D Off, 02=3D to 2D, 03=2D to 3D
        Data01 (3D pattern): 00=Top/Bottom, 01=Side by Side, 02=Check Board,
        03=Frame Sequential, 04=Column interleaving, 05=Row interleaving
        Data02 (direction): 00=Right to Left, 01=Left to Right
        Data03 (depth): 00-14
  command: "xt"
  notes: All 3D pattern options may not be available depending on broadcasting/video signal. Data02/Data03 depend on model and signal.

- id: extended_3d
  label: Extended 3D Options (3D models only)
  kind: action
  params:
    - name: option
      type: integer
      description: >-
        Data00 options: 00=Picture Correction, 01=Depth, 02=Viewpoint,
        06=Color Correction, 07=Sound Zooming, 08=Normal Image View, 09=Genre
        Data01 range depends on Data00 option
  command: "xv"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: integer
      description: 01=Execute auto configure
  command: "ju"
  notes: Adjusts picture position and minimizes image shaking. Works only in RGB (PC) mode.

# TCP/IP (Telnet) Commands — human-readable text format, newline-terminated
- id: telnet_power
  label: Power (TCP/IP)
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
  command: "POWER"

- id: telnet_aspect_ratio
  label: Aspect Ratio (TCP/IP)
  kind: action
  params:
    - name: mode
      type: string
      description: "4by3", "16by9", or "setbyoriginal"
  command: "ASPECT_RATIO"

- id: telnet_screen_mute
  label: Screen Mute (TCP/IP)
  kind: action
  params:
    - name: mode
      type: string
      description: "screenmuteon", "videomuteon", or "allmuteoff"
  command: "SCREEN_MUTE"

- id: telnet_volume_mute
  label: Volume Mute (TCP/IP)
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
  command: "VOLUME_MUTE"

- id: telnet_volume_control
  label: Volume Control (TCP/IP)
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 decimal
  command: "VOLUME_CONTROL"

- id: telnet_picture_contrast
  label: Picture Contrast (TCP/IP)
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 decimal
  command: "PICTURE_CONTRAST"

- id: telnet_picture_brightness
  label: Picture Brightness (TCP/IP)
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 decimal
  command: "PICTURE_BRIGHTNESS"

- id: telnet_picture_colour
  label: Picture Color (TCP/IP)
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 decimal
  command: "PICTURE_COLOUR"

- id: telnet_picture_tint
  label: Picture Tint (TCP/IP)
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 decimal
  command: "PICTURE_TINT"

- id: telnet_picture_sharpness
  label: Picture Sharpness (TCP/IP)
  kind: action
  params:
    - name: level
      type: integer
      description: 0-50 decimal
  command: "PICTURE_SHARPNESS"

- id: telnet_osd_select
  label: OSD Select (TCP/IP)
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
  command: "OSD_SELECT"

- id: telnet_remote_lock
  label: Remote Control Lock (TCP/IP)
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
  command: "REMOTECONTROLER_LOCK"

- id: telnet_audio_balance
  label: Audio Balance (TCP/IP)
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 decimal
  command: "AUDIO_BALANCE"

- id: telnet_colour_temperature
  label: Color Temperature (TCP/IP)
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 decimal
  command: "PICTURE_COLOUR_TEMPERATURE"

- id: telnet_equalizer
  label: Equalizer (TCP/IP)
  kind: action
  params:
    - name: band
      type: integer
      description: 1-5 (frequency band)
    - name: step
      type: integer
      description: 0-20 (step decimal)
  command: "AUDIO_EQUALIZER"

- id: telnet_energy_saving
  label: Energy Saving (TCP/IP)
  kind: action
  params:
    - name: mode
      type: string
      description: "screenoff", "maximum", "medium", "minimum", or "off"
  command: "ENERGY_SAVING"

- id: telnet_tune_atsc_atv
  label: Tune ATSC/ATV (TCP/IP)
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: source
      type: string
      description: "antenna" or "cable"
  command: "CHANNEL_SETTING_ATSC_ATV"

- id: telnet_tune_atsc_dtv
  label: Tune ATSC DTV (TCP/IP)
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (or major minor for notphy variants)
    - name: source
      type: string
      description: "antenna", "cablenotphy", "antennanotphy"
  command: "CHANNEL_SETTING_ATSC_DTV"

- id: telnet_channel_add_delete
  label: Channel Add/Delete (TCP/IP)
  kind: action
  params:
    - name: action
      type: string
      description: "add" or "delete"
  command: "CHANNEL_ADD_DELETE"

- id: telnet_key_action
  label: Key Action (TCP/IP)
  kind: action
  params:
    - name: key
      type: string
      description: >-
        Key name from set: exit, channelup, channeldown, volumeup, volumedown,
        arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv,
        previouschannel, favoritechannel, teletext, teletextoption, returnback,
        avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok,
        quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton,
        greenbutton, redbutton, aspectratio, audiodescription, programmorder,
        userguide, smarthome, simplelink, fastforward, rewind, programminfo,
        programguide, play, slowplay, soccerscreen, record, 3d, autoconfig,
        app, screenbright, number0-number9
  command: "KEY_ACTION"

- id: telnet_backlight
  label: Backlight (TCP/IP)
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 decimal
  command: "PICTURE_BACKLIGHT"

- id: telnet_input_select
  label: Input Select (TCP/IP)
  kind: action
  params:
    - name: source
      type: string
      description: "dtv", "atv", "cadtv", "catv", "avav1", "component1", "hdmi1", "hdmi2", "hdmi3"
  command: "INPUT_SELECT"

- id: telnet_3d
  label: 3D Mode (TCP/IP)
  kind: action
  params:
    - name: mode
      type: string
      description: >-
        "off", "3dto2d", "2dto3d [righttoleft/lefttoright] [0-20]",
        "on [topandbottom/sidebyside/checkboard/framesequential/columninterleaving/rowinterleaving] [righttoleft/lefttoright] [0-20]"
  command: "PICTURE_3D"

- id: telnet_3d_extension
  label: 3D Extension (TCP/IP)
  kind: action
  params:
    - name: option
      type: string
      description: >-
        "picturecorrection [0/1]", "colorcorrection [0/1]", "sound [0/1]",
        "normal [0/1]", "depth [0-20]", "viewpoint [0-20]", "genre [0-5]"
  command: "PICTURE_3D_EXTENSION"
```

## Feedbacks
```yaml
# RS-232C Acknowledgement Format: [Command2][ ][Set ID][ ][OK/NG][Data][x]
# OK: [a][ ][Set ID][ ][OK][Data][x]
# NG: [a][ ][Set ID][ ][NG][Data][x] — Data 00 = Illegal Code

- id: ack
  label: Acknowledgement
  type: enum
  values:
    - OK
    - NG
  notes: All RS-232C commands return ACK in this format. NG data 00 indicates illegal code.

# TCP/IP responses are plain text "OK" or "NG" printed to Telnet session

# Query by sending FF as data value returns current state
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented separately from actions;
# all parameters are passed via command data fields
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: During media playback or recording, all commands except Power (ka) and Key (mc) are not executed and treated as NG.
  - description: Remote control lock (km 01) prevents IR and local key power-on while in standby mode.
  - description: IP control must be set to Off when not in use (from IP Control Setup menu).
```

## Notes
- **Set ID**: Adjustable range 1-99; Set ID 0 broadcasts to all TVs. Set ID shown as decimal in TV menu, hexadecimal (0x00-0x63) in protocol.
- **Real data mapping**: Hexadecimal values 00-63 map directly to decimal 0-99; extended range uses two-byte encoding (e.g., 01 00 = 256).
- **Serial cable**: Use crossed (reverse) cable for 3-wire RS-232C connection.
- **USB-to-Serial**: PL2303 chip-based converter supported (VID 0x0557, PID 0x2008); note Power command only works via USB-to-Serial when TV is already on.
- **IP Control**: Requires initial TV menu setup (hold SETTINGS 5 sec, enter 828, enable Network IP Control, reboot). Default port 9761. Use "quit" to exit Telnet session.
- **TCP/IP vs RS-232C parameter ranges differ**: RS-232C uses 0-100 transmitted as 00-64 hex; TCP/IP uses 0-100 decimal directly.
- **Wake-on-LAN**: Mobile TV On must be enabled in TV settings to use WOL power-on.
```
Spec generated. Two protocols documented (RS-232C ASCII + TCP/IP Telnet), 48 actions, full command tables.

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - manualslib.com
  - scribd.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.manualslib.com/manual/12664790/Lg-Rs-232c.html
  - https://www.scribd.com/document/649294226/LG-TV-RS-232C-Control-Manual
retrieved_at: 2026-06-03T07:16:22.570Z
last_checked_at: 2026-06-03T07:16:22.570Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:16:22.570Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 declared actions present in source (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ISM Method (j p) is documented but only applies to Plasma TV models; this model is LCD"
- "flow control not stated in source"
- "no discrete settable parameters documented separately from actions;"
- "no unsolicited event notifications documented"
- "no multi-step macros documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
