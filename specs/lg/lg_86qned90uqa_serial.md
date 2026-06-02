---
spec_id: admin/lg-86qned90uqa
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 86QNED90UQA Control Spec"
manufacturer: LG
model_family: 86QNED90UQA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 86QNED90UQA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
  - justaddpower.happyfox.com
  - files.remotecentral.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
  - https://files.remotecentral.com/library/22-1/lg/television/index.html
retrieved_at: 2026-06-02T22:09:15.961Z
last_checked_at: 2026-06-02T22:09:15.961Z
generated_at: 2026-06-02T22:09:15.961Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IP/Telnet control section is documented as \"For USA only\" in the source; behavior on non-USA firmware not stated."
  - "source documents no unsolicited notifications or asynchronous"
  - "source does not document any multi-step sequences. The Key"
  - "source does not document any high-voltage interlocks or"
  - "firmware version compatibility not stated; behavior of IP control on non-USA firmware not stated; full key-code list is exhaustive but some codes are model-dependent (e.g. 3D, Soccer, REC, AutoConfig)."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:09:15.961Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 86QNED90UQA Control Spec

## Summary
LG 86QNED90UQA 4K MiniLED television with RS-232C serial (DE9 or 3.5mm phone-jack) and IP/Telnet (port 9761) control. This spec covers the ASCII command set, the supplementary key-code IR-emulation table, the communication parameters, and the model-dependent commands documented in the owner manual.

<!-- UNRESOLVED: IP/Telnet control section is documented as "For USA only" in the source; behavior on non-USA firmware not stated. -->

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
  port: 9761  # Telnet port stated in source for IP Control section
auth:
  type: password  # IP control uses 3-digit password (default 828); RS-232C has no auth
  notes: "RS-232C transport: no authentication. IP/Telnet transport: 3-digit numeric password, default 828, configurable via Password Change submenu in IP Control Setup."
```

## Traits
```yaml
- powerable       # inferred from Power (ka) command and POWER off IP command
- routable        # inferred from Input select (xb) and INPUT_SELECT IP commands
- queryable       # inferred from FF status-read transmissions and OK/NG acknowledgement protocol
- levelable       # inferred from volume / bass / treble / brightness / contrast / sharpness / color / tint / backlight commands
```

## Actions

### RS-232C (Serial)

```yaml
- id: power
  label: Power
  kind: action
  command: "ka {data}"   # e.g. "ka 00 00 01" → power on with Set ID 1
  params:
    - name: data
      type: enum
      values: [00, 01]
      description: "00 = Power Off, 01 = Power On"
- id: power_query
  label: Power Status Query
  kind: query
  command: "ka {setid} FF"   # "ka 00 FF" with Set ID 0x00
  params: []
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "kc {data}"
  params:
    - name: data
      type: enum
      values: ["01", "02", "04", "05", "06", "07", "09", "0B", "0C", "10-1F"]
      description: "01=Normal, 02=16:9, 04=Zoom, 05=Zoom2, 06=Set by Program/Original, 07=14:9, 09=Just Scan, 0B=Full Wide (LATAM), 0C=21:9, 10-1F=Cinema Zoom 1-16"
- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01", "10"]
      description: "00=Screen mute off (picture on, video mute off), 01=Screen mute on (picture off), 10=Video mute on"
- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Volume mute on, 01=Volume mute off"
- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {data}"
  params:
    - name: data
      type: integer
      description: "0-100 decimal (transmitted as 00-64 hex)"
- id: contrast
  label: Contrast
  kind: action
  command: "kg {data}"
  params:
    - name: data
      type: integer
      description: "0-100 decimal (00-64 hex)"
- id: brightness
  label: Brightness
  kind: action
  command: "kh {data}"
  params:
    - name: data
      type: integer
      description: "0-100 decimal (00-64 hex)"
- id: color
  label: Color/Colour
  kind: action
  command: "ki {data}"
  params:
    - name: data
      type: integer
      description: "0-100 decimal (00-64 hex)"
- id: tint
  label: Tint
  kind: action
  command: "kj {data}"
  params:
    - name: data
      type: integer
      description: "0=Red, 100=Green (00-64 hex)"
- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {data}"
  params:
    - name: data
      type: integer
      description: "0-50 decimal (00-32 hex)"
- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=OSD off, 01=OSD on"
- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  command: "km {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Lock off, 01=Lock on"
- id: treble
  label: Treble
  kind: action
  command: "kr {data}"
  params:
    - name: data
      type: integer
      description: "0-100 decimal (00-64 hex)"
- id: bass
  label: Bass
  kind: action
  command: "ks {data}"
  params:
    - name: data
      type: integer
      description: "0-100 decimal (00-64 hex)"
- id: balance
  label: Balance
  kind: action
  command: "kt {data}"
  params:
    - name: data
      type: integer
      description: "0-100 decimal (00-64 hex)"
- id: color_temperature
  label: Color Temperature
  kind: action
  command: "xu {data}"
  params:
    - name: data
      type: integer
      description: "0-100 decimal (00-64 hex)"
- id: ism_method
  label: ISM Method
  kind: action
  command: "jp {data}"
  params:
    - name: data
      type: enum
      values: ["02", "08", "20"]
      description: "02=Orbiter, 08=Normal, 20=Color Wash. Plasma TV only - not applicable to QNED."
- id: equalizer
  label: Equalizer
  kind: action
  command: "jv {data}"
  params:
    - name: data
      type: string
      description: "1-byte value: bits 7-5 select frequency band (1st-5th), bits 4-0 select step (0-20). E.g. 5th band, step 20 = 10010101 = 0x95. Adjustable when sound mode is EQ-adjustable."
- id: energy_saving
  label: Energy Saving
  kind: action
  command: "jq {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01", "02", "03", "04", "05"]
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto (LCD/LED), 05=Screen off"
- id: tune_command
  label: Tune Command
  kind: action
  command: "ma {data00} {data01} {data02}"
  params:
    - name: data00
      type: string
      description: "High byte channel data (00-27 hex)"
    - name: data01
      type: string
      description: "Low byte channel data (00-0F hex)"
    - name: data02
      type: string
      description: "Input source: 00=ATV Antenna, 80=CATV, 10=DTV Antenna, 40=SDTV Satellite, 90=CADTV, a0=CA-Radio, 20=Antenna Radio, 50=S-Radio"
- id: tune_command_extended
  label: Tune Command (Major/Minor)
  kind: action
  command: "ma 0 {data00} {data01} {data02} {data03} {data04} {data05}"
  params:
    - name: data00
      type: string
      description: "Physical channel number (don't care for digital)"
    - name: data01
      type: string
      description: "Major channel high byte"
    - name: data02
      type: string
      description: "Major channel low byte"
    - name: data03
      type: string
      description: "Minor channel high byte"
    - name: data04
      type: string
      description: "Minor channel low byte"
    - name: data05
      type: string
      description: "Input source: 00=ATV, 01=CATV, 02=DTV Antenna, 06=CADTV Physical, 22=DTV Antenna (no physical), 26=CADTV (no physical), 46=CADTV Physical/Major only, 66=CADTV Major only, 07=BS, 08=CS1, 09=CS2"
- id: channel_add_del
  label: Channel Add/Del(Skip)
  kind: action
  command: "mb {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Del(ATSC/ISDB)/Skip(DVB), 01=Add"
- id: key
  label: IR Key Code Send
  kind: action
  command: "mc {keycode}"
  params:
    - name: keycode
      type: string
      description: "Two-character hex IR key code from the KEY CODES table (e.g. 08=Power, 09=Mute, 0B=Input, 44=OK, 43=Menu/Settings)"
- id: backlight
  label: Control Backlight / Panel Light
  kind: action
  command: "mg {data}"
  params:
    - name: data
      type: integer
      description: "0-100 decimal (00-64 hex). Controls backlight on LED/LCD, panel light on others."
- id: input_select
  label: Input Select (Main)
  kind: action
  command: "xb {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01", "02", "03", "04", "10", "11", "20", "21", "40", "41", "60", "90", "91", "92", "93"]
      description: "00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1, 04=ISDB-CS2, 10=ATV, 11=CATV, 20=AV/AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4"
- id: auto_configure
  label: Auto Configure
  kind: action
  command: "ju {data}"
  params:
    - name: data
      type: enum
      values: ["01"]
      description: "01=To set Auto Configure. Works only in RGB (PC) mode."
```

### IP / Telnet (Port 9761, USA only)

```yaml
- id: ip_power
  label: IP Power
  kind: action
  command: "POWER off"
  params:
    - name: action
      type: enum
      values: ["on", "off"]
      description: "POWER on | POWER off"
- id: ip_aspect_ratio
  label: IP Aspect Ratio
  kind: action
  command: "ASPECT_RATIO {mode}"
  params:
    - name: mode
      type: enum
      values: ["4by3", "16by9", "setbyoriginal"]
- id: ip_screen_mute
  label: IP Screen Mute
  kind: action
  command: "SCREEN_MUTE {mode}"
  params:
    - name: mode
      type: enum
      values: ["screenmuteon", "videomuteon", "allmuteoff"]
- id: ip_volume_mute
  label: IP Volume Mute
  kind: action
  command: "VOLUME_MUTE {mode}"
  params:
    - name: mode
      type: enum
      values: ["on", "off"]
- id: ip_volume_control
  label: IP Volume Control
  kind: action
  command: "VOLUME_CONTROL {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: ip_contrast
  label: IP Contrast
  kind: action
  command: "PICTURE_CONTRAST {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: ip_brightness
  label: IP Brightness
  kind: action
  command: "PICTURE_BRIGHTNESS {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: ip_color
  label: IP Color/Colour
  kind: action
  command: "PICTURE_COLOUR {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: ip_tint
  label: IP Tint
  kind: action
  command: "PICTURE_TINT {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: ip_sharpness
  label: IP Sharpness
  kind: action
  command: "PICTURE_SHARPNESS {level}"
  params:
    - name: level
      type: integer
      description: "0-50 decimal"
- id: ip_osd_select
  label: IP OSD Select
  kind: action
  command: "OSD_SELECT {mode}"
  params:
    - name: mode
      type: enum
      values: ["on", "off"]
- id: ip_remote_lock
  label: IP Remote Control Lock
  kind: action
  command: "REMOTECONTROLER_LOCK {mode}"
  params:
    - name: mode
      type: enum
      values: ["on", "off"]
- id: ip_balance
  label: IP Balance
  kind: action
  command: "AUDIO_BALANCE {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: ip_color_temperature
  label: IP Color Temperature
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: ip_equalizer
  label: IP Equalizer
  kind: action
  command: "AUDIO_EQUALIZER {band} {step}"
  params:
    - name: band
      type: integer
      description: "1-5 frequency band"
    - name: step
      type: integer
      description: "0-20 step. Precondition: All settings > sound > sound mode settings > Equalizer on"
- id: ip_energy_saving
  label: IP Energy Saving
  kind: action
  command: "ENERGY_SAVING {mode}"
  params:
    - name: mode
      type: enum
      values: ["screenoff", "maximum", "medium", "minimum", "off"]
- id: ip_tune_atsc_atv
  label: IP Tune (ATSC/ATV)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} {source}"
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: source
      type: enum
      values: ["antenna", "cable"]
- id: ip_tune_atsc_dtv_phy
  label: IP Tune (ATSC DTV Physical)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {channel} cablenotphy"
  params:
    - name: channel
      type: integer
      description: "Channel number (cable, not using physical)"
- id: ip_tune_atsc_dtv_majmin
  label: IP Tune (ATSC DTV Major/Minor)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} {source}notphy"
  params:
    - name: major
      type: integer
      description: "Major channel number"
    - name: minor
      type: integer
      description: "Minor channel number"
    - name: source
      type: enum
      values: ["antenna", "cable"]
- id: ip_channel_add_del
  label: IP Channel Add/Del
  kind: action
  command: "CHANNEL_ADD_DELETE {mode}"
  params:
    - name: mode
      type: enum
      values: ["add", "delete"]
- id: ip_key_action
  label: IP Key Action
  kind: action
  command: "KEY_ACTION {key}"
  params:
    - name: key
      type: enum
      values: [exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, record, "3d", autoconfig, app, screenbright, number0, number1, number2, number3, number4, number5, number6, number7, number8, number9]
- id: ip_backlight
  label: IP Backlight
  kind: action
  command: "PICTURE_BACKLIGHT {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal. Precondition: All settings > picture > Energy Saving off"
- id: ip_input_select
  label: IP Input Select
  kind: action
  command: "INPUT_SELECT {input}"
  params:
    - name: input
      type: enum
      values: [dtv, atv, cadtv, catv, avav1, component1, hdmi1, hdmi2, hdmi3]
```

## Feedbacks
```yaml
# RS-232C acknowledgement format:
# [Command2][ ][Set ID][ ][OK][Data][x]   → success, returns data
# [Command2][ ][Set ID][ ][NG][Data][x]   → error
# NG Data 00 = Illegal Code
#
# All set commands can be queried by sending data = 0xFF; the set returns
# the current state in the OK Acknowledgement.

- id: ok_acknowledgement
  type: string
  description: "OK Acknowledgement: [Command2][Space][SetID][Space]OK[Data]x - returned on successful command. Data is the current state when reading (FF was sent)."
- id: ng_acknowledgement
  type: string
  description: "NG Acknowledgement: [Command2][Space][SetID][Space]NG[Data]x - returned on illegal code or communication error. Data 00 = Illegal Code."

# IP/Telnet acknowledgements:
- id: ip_ok
  type: string
  description: "OK - printed when IP command is accepted"
- id: ip_ng
  type: string
  description: "NG - printed when IP command is rejected"
```

## Variables
```yaml
# Queryable state (all returned via the same OK Acknowledgement with the
# corresponding command letter when data 0xFF is sent):
- id: set_id
  type: integer
  description: "Set ID 1-99 (decimal 1-99, hex 0x00-0x63). Set to 0x00 to broadcast to all connected sets."
- id: power_state
  type: integer
  description: "00 = Power Off, 01 = Power On (via ka FF query)"
- id: volume_state
  type: integer
  description: "0-100 (00-64 hex) (via kf FF query)"
- id: input_state
  type: integer
  description: "Input source code (via xb FF query) - same enum as input_select action data"
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications or asynchronous
# event strings. All TV→host traffic is in response to a host query.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences. The Key
# command (mc / KEY_ACTION) can emit any IR remote button, so multi-step
# sequences can be constructed client-side, but the source does not specify
# any canned macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Remote control lock (km 01) disables front-panel and IR control. When main power is cycled (plug-off and plug-in, after 20-30 seconds), the external control lock is released. In standby mode with key lock on, the TV will not turn on via IR or local key power."
# UNRESOLVED: source does not document any high-voltage interlocks or
# power-on sequencing requirements specific to this model.
```

## Notes
- Communication code is ASCII. Transmission terminates with Carriage Return (0x0D). Spaces are 0x20.
- Use a crossed (reverse) RS-232C cable. RS-232C pinout: TV side pin 2 = RXD, pin 3 = TXD, pin 5 = GND (D-Sub 9); phone-jack variant: TV tip = TXD, ring = RXD, sleeve = GND.
- Set ID range 1-99 (decimal), indicated as hex 0x01-0x63 on the wire; 0x00 = broadcast to all sets.
- With RS-232C cable, the `ka` (Power) command works in both power-on and power-off states. With USB-to-Serial converter (PL2303, VID 0x0557, PID 0x2008), the command works only when TV is on.
- During media playback or recording, all commands except Power (ka) and Key (mc) return NG.
- 3D commands (xt, xv) and ISM Method (jp) are model-dependent. The 86QNED90UQA is not a 3D or plasma model; these commands are documented for completeness but will return NG on this model.
- IP/Telnet control (port 9761) is documented as "For USA only" in the source. Default password 828; configurable via Password Change in the IP Control Setup menu (entered by holding Settings 5 s, then 828 + OK on the Live TV screen). WOL (Wake On LAN) power-on requires the "Mobile TV On" submenu enabled and a companion mobile app.
- Key code 0x4C is available on ATSC/ISDB models only.

<!-- UNRESOLVED: firmware version compatibility not stated; behavior of IP control on non-USA firmware not stated; full key-code list is exhaustive but some codes are model-dependent (e.g. 3D, Soccer, REC, AutoConfig). -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - justaddpower.happyfox.com
  - files.remotecentral.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
  - https://files.remotecentral.com/library/22-1/lg/television/index.html
retrieved_at: 2026-06-02T22:09:15.961Z
last_checked_at: 2026-06-02T22:09:15.961Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:09:15.961Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IP/Telnet control section is documented as \"For USA only\" in the source; behavior on non-USA firmware not stated."
- "source documents no unsolicited notifications or asynchronous"
- "source does not document any multi-step sequences. The Key"
- "source does not document any high-voltage interlocks or"
- "firmware version compatibility not stated; behavior of IP control on non-USA firmware not stated; full key-code list is exhaustive but some codes are model-dependent (e.g. 3D, Soccer, REC, AutoConfig)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
