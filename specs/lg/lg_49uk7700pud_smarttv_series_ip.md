---
spec_id: admin/lg-49uk7700pud-smarttv-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 49UK7700PUD SmartTV Series Control Spec"
manufacturer: LG
model_family: 49UK7700PUD
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49UK7700PUD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
  - justaddpower.com
  - gscs-b2c.lge.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - "https://gscs-b2c.lge.com/downloadFile?fileId=KROWM000526118.pdf"
retrieved_at: 2026-06-02T17:22:56.861Z
last_checked_at: 2026-06-02T17:22:56.861Z
generated_at: 2026-06-02T17:22:56.861Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Set ID 0x4C (0x4C ATSC/ISDB major/minor) and several commands marked \"Depending on model\" are model-conditional. 3D support, Treble, ISM Method, and Treble/Bass noted as model-dependent."
  - "source does not describe unsolicited event/notification frames."
  - "source does not define named multi-step sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:56.861Z
  matched_actions: 62
  action_count: 62
  confidence: medium
  summary: "All 62 spec actions match verbatim commands in source; transport parameters (9600 8N1 serial, port 9761 TCP) confirmed; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 49UK7700PUD SmartTV Series Control Spec

## Summary
Smart TV with two control transports: RS-232C serial (9600 8N1, ASCII, Cr-terminated) and TCP/IP telnet on port 9761. Spec covers 27 RS-232 commands and 25 IP-control commands, including power, picture/sound tuning, input select, channel tune, energy saving, IR key emulation, and 3D (model-dependent).

<!-- UNRESOLVED: Set ID 0x4C (0x4C ATSC/ISDB major/minor) and several commands marked "Depending on model" are model-conditional. 3D support, Treble, ISM Method, and Treble/Bass noted as model-dependent. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9761
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no per-command auth in source; IP control setup menu itself uses a 3-digit password (default 828) but that is menu-gating, not protocol auth
```

## Traits
```yaml
- powerable       # ka / POWER
- routable        # xb / INPUT_SELECT
- queryable       # FF-data read mode for status
- levelable       # kf kg kh ki kj kk ks kr kt xu / VOLUME_CONTROL PICTURE_*
```

## Actions
```yaml
# RS-232 protocol commands. Frame: [Cmd1][Cmd2][ ][SetID][ ][Data][Cr]
# SetID range 1-99 (decimal), 0=ALL. Cr=0x0D, Space=0x20. Hex data in DATA.

- id: power
  label: Power
  kind: action
  command: "ka {SetID} {00|01}"
  params:
    - name: data
      type: hex
      description: "00=Power Off, 01=Power On"
- id: power_status
  label: Power Status Query
  kind: query
  command: "ka {SetID} FF"
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "kc {SetID} {data}"
  params:
    - name: data
      type: hex
      description: "01=Normal 02=16:9 04=Zoom 05=Zoom2 06=Set by Program/Original 07=14:9 09=Just Scan 0B=Full Wide 0C=21:9 10-1F=Cinema Zoom 1-16"
- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {SetID} {data}"
  params:
    - name: data
      type: hex
      description: "00=Screen mute off 01=Screen mute on 10=Video mute on"
- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {SetID} {00|01}"
  params:
    - name: data
      type: hex
      description: "00=Mute on 01=Mute off"
- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {SetID} {00-64}"
  params:
    - name: data
      type: hex
      description: "Volume 00-64 (hex)"
- id: contrast
  label: Contrast
  kind: action
  command: "kg {SetID} {00-64}"
  params:
    - name: data
      type: hex
      description: "Contrast 00-64 (hex)"
- id: brightness
  label: Brightness
  kind: action
  command: "kh {SetID} {00-64}"
  params:
    - name: data
      type: hex
      description: "Brightness 00-64 (hex)"
- id: color
  label: Color/Colour
  kind: action
  command: "ki {SetID} {00-64}"
  params:
    - name: data
      type: hex
      description: "Color 00-64 (hex)"
- id: tint
  label: Tint
  kind: action
  command: "kj {SetID} {00-64}"
  params:
    - name: data
      type: hex
      description: "Tint 00=Red 64=Green"
- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {SetID} {00-32}"
  params:
    - name: data
      type: hex
      description: "Sharpness 00-32 (hex)"
- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {SetID} {00|01}"
  params:
    - name: data
      type: hex
      description: "00=OSD off 01=OSD on"
- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  command: "km {SetID} {00|01}"
  params:
    - name: data
      type: hex
      description: "00=Lock off 01=Lock on"
- id: treble
  label: Treble
  kind: action
  command: "kr {SetID} {00-64}"
  params:
    - name: data
      type: hex
      description: "Treble 00-64 (hex); model-dependent"
- id: bass
  label: Bass
  kind: action
  command: "ks {SetID} {00-64}"
  params:
    - name: data
      type: hex
      description: "Bass 00-64 (hex)"
- id: balance
  label: Balance
  kind: action
  command: "kt {SetID} {00-64}"
  params:
    - name: data
      type: hex
      description: "Balance 00-64 (hex)"
- id: color_temperature
  label: Color(Colour) Temperature
  kind: action
  command: "xu {SetID} {00-64}"
  params:
    - name: data
      type: hex
      description: "Color temperature 00-64 (hex)"
- id: ism_method
  label: ISM Method
  kind: action
  command: "jp {SetID} {data}"
  params:
    - name: data
      type: hex
      description: "02=Orbiter 08=Normal 20=Color Wash; Plasma TV only"
- id: equalizer
  label: Equalizer
  kind: action
  command: "jv {SetID} {band}{step}"
  params:
    - name: data
      type: hex
      description: "MSB bits 7-5 = band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th); LSB bits 4-0 = step 0-20 (decimal). Precondition: Sound Mode = EQ adjustable."
- id: energy_saving
  label: Energy Saving
  kind: action
  command: "jq {SetID} {00-05}"
  params:
    - name: data
      type: hex
      description: "00=Off 01=Minimum 02=Medium 03=Maximum 04=Auto/Intelligent sensor 05=Screen off"
- id: tune_command
  label: Tune Command
  kind: action
  command: "ma {SetID} {D00} {D01} {D02} [{D03} {D04} {D05}]"
  params:
    - name: data
      type: hex
      description: "Frame varies by region. EU/Asia/JP analog: ma {SetID} 00 {D00} {D01} {D02}. ATSC/DVB: ma 00 {D00} {D01} {D02} {D03} {D04} {D05}. Input source byte selects ATV/CATV/DTV/CADTV/Satellite/BS/CS1/CS2."
- id: channel_add_del
  label: Channel Add/Del(Skip)
  kind: action
  command: "mb {SetID} {00|01}"
  params:
    - name: data
      type: hex
      description: "00=Del(ATSC/ISDB)/Skip(DVB) 01=Add"
- id: key
  label: IR Key Code Send
  kind: action
  command: "mc {SetID} {keycode}"
  params:
    - name: data
      type: hex
      description: "IR key code from KEY CODES table (e.g. 08=Power, 09=Mute, 00=CH+)"
- id: control_backlight
  label: Control Backlight / Control Panel Light
  kind: action
  command: "mg {SetID} {00-64}"
  params:
    - name: data
      type: hex
      description: "Backlight or panel light 00-64 (hex). Precondition for backlight: Energy Saving off."
- id: input_select
  label: Input Select (Main)
  kind: action
  command: "xb {SetID} {data}"
  params:
    - name: data
      type: hex
      description: "00=DTV 01=CADTV 02=Satellite DTV 03=ISDB-CS1 04=ISDB-CS2 10=ATV 11=CATV 20=AV1 21=AV2 40=Component1 41=Component2 60=RGB 90=HDMI1 91=HDMI2 92=HDMI3 93=HDMI4"
- id: picture_3d
  label: 3D Mode
  kind: action
  command: "xt {SetID} {D00} {D01} {D02} {D03}"
  params:
    - name: data
      type: hex
      description: "D00: 00=3D On 01=3D Off 02=3D to 2D 03=2D to 3D. D01: 00=Top/Bottom 01=Side/Side 02=Check Board 03=Frame Seq 04=Column 05=Row. D02 (Plasma): 00=R-to-L 01=L-to-R. D03: 3D Effect 00-14 hex. 3D models only."
- id: extended_3d
  label: Extended 3D Option
  kind: action
  command: "xv {SetID} {D00} {D01}"
  params:
    - name: data
      type: hex
      description: "D00: 00=Picture Correction 01=Depth 02=Viewpoint 06=Color Correction 07=Sound Zooming 08=Normal Image View 09=3D Mode (Genre). D01 range depends on D00. 3D models only."
- id: auto_configure
  label: Auto Configure
  kind: action
  command: "ju {SetID} 01"
  params:
    - name: data
      type: hex
      description: "01 = run auto-configure. RGB(PC) mode only."

# ---- IP control (telnet 9761) commands. Each line terminated by Cr. ----

- id: ip_power
  label: Power (IP)
  kind: action
  command: "POWER {on|off}"
  params:
    - name: state
      type: string
      description: "on or off"
- id: ip_aspect_ratio
  label: Aspect Ratio (IP)
  kind: action
  command: "ASPECT_RATIO {4by3|16by9|setbyoriginal}"
  params:
    - name: mode
      type: string
      description: "4by3, 16by9, or setbyoriginal"
- id: ip_screen_mute
  label: Screen Mute (IP)
  kind: action
  command: "SCREEN_MUTE {screenmuteon|videomuteon|allmuteoff}"
  params:
    - name: mode
      type: string
      description: "screenmuteon, videomuteon, or allmuteoff"
- id: ip_volume_mute
  label: Volume Mute (IP)
  kind: action
  command: "VOLUME_MUTE {on|off}"
- id: ip_volume_control
  label: Volume Control (IP)
  kind: action
  command: "VOLUME_CONTROL {0-100}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: ip_contrast
  label: Contrast (IP)
  kind: action
  command: "PICTURE_CONTRAST {0-100}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: ip_brightness
  label: Brightness (IP)
  kind: action
  command: "PICTURE_BRIGHTNESS {0-100}"
- id: ip_color
  label: Color/Colour (IP)
  kind: action
  command: "PICTURE_COLOUR {0-100}"
- id: ip_tint
  label: Tint (IP)
  kind: action
  command: "PICTURE_TINT {0-100}"
- id: ip_sharpness
  label: Sharpness (IP)
  kind: action
  command: "PICTURE_SHARPNESS {0-50}"
- id: ip_osd_select
  label: OSD Select (IP)
  kind: action
  command: "OSD_SELECT {on|off}"
- id: ip_remote_lock
  label: Remote Control Lock (IP)
  kind: action
  command: "REMOTECONTROLER_LOCK {on|off}"
- id: ip_balance
  label: Balance (IP)
  kind: action
  command: "AUDIO_BALANCE {0-100}"
- id: ip_color_temperature
  label: Color Temperature (IP)
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {0-100}"
- id: ip_equalizer
  label: Equalizer (IP)
  kind: action
  command: "AUDIO_EQUALIZER {1-5} {0-20}"
  params:
    - name: band
      type: integer
      description: "1-5 frequency band"
    - name: step
      type: integer
      description: "0-20 step. Precondition: sound mode = Equalizer on."
- id: ip_energy_saving
  label: Energy Saving (IP)
  kind: action
  command: "ENERGY_SAVING {screenoff|maximum|medium|minimum|off}"
- id: ip_channel_atsc_atv_antenna
  label: Tune ATSC/ATV Antenna (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} antenna"
- id: ip_channel_atsc_atv_cable
  label: Tune ATSC/ATV Cable (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} cable"
- id: ip_channel_atsc_dtv_cablenotphy
  label: Tune ATSC DTV Cable No-Physical (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {channel} cablenotphy"
- id: ip_channel_atsc_dtv_antenna_majmin
  label: Tune ATSC DTV Antenna Major/Minor (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} antennanotphy"
- id: ip_channel_atsc_dtv_cable_majmin
  label: Tune ATSC DTV Cable Major/Minor (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} cablenotphy"
- id: ip_channel_add_delete
  label: Channel Add/Delete (IP)
  kind: action
  command: "CHANNEL_ADD_DELETE {add|delete}"
- id: ip_key_action
  label: IR Key Action (IP)
  kind: action
  command: "KEY_ACTION {key}"
  params:
    - name: key
      type: string
      description: "One of: exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, record, 3d, autoconfig, app, screenbright, number0-9"
- id: ip_backlight
  label: Picture Backlight (IP)
  kind: action
  command: "PICTURE_BACKLIGHT {0-100}"
  params:
    - name: level
      type: integer
      description: "0-100. Precondition: Energy Saving off."
- id: ip_input_select
  label: Input Select (IP)
  kind: action
  command: "INPUT_SELECT {dtv|atv|cadtv|catv|avav1|component1|hdmi1|hdmi2|hdmi3}"
- id: ip_picture_3d_off
  label: 3D Off / 3D to 2D (IP)
  kind: action
  command: "PICTURE_3D {off|3dto2d}"
- id: ip_picture_3d_2dto3d
  label: 3D 2D-to-3D (IP)
  kind: action
  command: "PICTURE_3D 2dto3d {righttoleft|lefttoright} {0-20}"
- id: ip_picture_3d_on
  label: 3D On (IP)
  kind: action
  command: "PICTURE_3D on {topandbottom|sidebyside|checkboard|framesequential|columninterleaving|rowinterleaving} {righttoleft|lefttoright} {0-20}"
- id: ip_picture_3d_extension_picturecorrection
  label: 3D Picture Correction (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION picturecorrection {0|1}"
- id: ip_picture_3d_extension_color_sound
  label: 3D Color Correction / Sound Zooming (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION {colorcorrection|sound} {0|1}"
- id: ip_picture_3d_extension_normal
  label: 3D Normal Image View (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION normal {0|1}"
- id: ip_picture_3d_extension_depth_viewpoint
  label: 3D Depth / Viewpoint (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION {depth|viewpoint} {0-20}"
- id: ip_picture_3d_extension_genre
  label: 3D Genre (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION genre {0-5}"
  params:
    - name: genre
      type: integer
      description: "0=Standard 1=Sport 2=Cinema 3=Extreme 4=Manual 5=Auto"
- id: ip_quit
  label: Quit IP Session
  kind: action
  command: "quit"
```

## Feedbacks
```yaml
- id: ack
  type: string
  description: "RS-232 acknowledgement: [Cmd2][ ][SetID][ ][OK/NG][Data][x]. OK=normal, NG=error (Data 00 = Illegal Code). IP control: literal 'OK' or 'NG' on a new line."
- id: power_state
  type: enum
  values: [on, off]
  description: "Returned in [a][ ][SetID][ ][OK][Data][x] when reading power status. Data 00=Off, 01=On."
- id: screen_mute_state
  type: enum
  values: [screen_mute_off, screen_mute_on, video_mute_on]
  description: "Returned from kd read."
- id: volume_mute_state
  type: enum
  values: [mute_on, mute_off]
  description: "Returned from ke read."
```

## Variables
```yaml
# None - every settable parameter is exposed as a discrete command above.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event/notification frames.
# ACK is the only response documented.
```

## Macros
```yaml
# UNRESOLVED: source does not define named multi-step sequences.
# The KEY_ACTION command (mc / KEY_ACTION) is the closest analogue - it can
# dispatch a single IR key code per invocation but does not chain steps.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Note: remote-control lock (km 01) and
# main-power-cycle (20-30s) are operational behaviours, not safety interlocks.
```

## Notes
- SetID: 1-99 decimal, 0=ALL. Hex form 0x00-0x63 on wire.
- During media playback/recording, only Power (ka) and Key (mc) commands execute; all others return NG.
- RS-232C with cable: TV can receive `ka` in both power-on and power-off states; with USB-to-serial converter, `ka` only works when TV is on.
- IP control setup: hold Settings 5s on Live TV, enter 828 (default), enable Network IP Control, reboot. Password 828 is the menu access code, not protocol auth.
- IP control on port 9761 (telnet). End session with `quit`.
- WOL (Wake On Lan) requires Mobile TV On enabled and a third-party WOL app on iOS/Android.
- 3D commands and 0x4C key code are model-dependent; spec marks them as such.
- Source covers USA/EU/Korea/JP/ATSC/ISDB/DVB region variants; tune command frame structure differs by region.

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - justaddpower.com
  - gscs-b2c.lge.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - "https://gscs-b2c.lge.com/downloadFile?fileId=KROWM000526118.pdf"
retrieved_at: 2026-06-02T17:22:56.861Z
last_checked_at: 2026-06-02T17:22:56.861Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:56.861Z
matched_actions: 62
action_count: 62
confidence: medium
summary: "All 62 spec actions match verbatim commands in source; transport parameters (9600 8N1 serial, port 9761 TCP) confirmed; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Set ID 0x4C (0x4C ATSC/ISDB major/minor) and several commands marked \"Depending on model\" are model-conditional. 3D support, Treble, ISM Method, and Treble/Bass noted as model-dependent."
- "source does not describe unsolicited event/notification frames."
- "source does not define named multi-step sequences."
- "source contains no explicit safety warnings, interlock procedures,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
