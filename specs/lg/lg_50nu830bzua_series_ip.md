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
  - proaudioinc.com
  - justaddpower.happyfox.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
retrieved_at: 2026-06-02T17:22:57.649Z
last_checked_at: 2026-06-02T17:22:57.649Z
generated_at: 2026-06-02T17:22:57.649Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware range supported by the IP control menu (828 service code) not stated; \"Network IP Control\" menu requires manual enable via hidden service code."
  - "source does not document unsolicited event/notification messages from the TV"
  - "source does not document multi-step macro sequences"
  - "no explicit safety warnings (electrical, mounting, interlock with mains) found in source"
  - "firmware compatibility range, exact WOL packet format, IP power-on command (if any beyond WOL)."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:57.649Z
  matched_actions: 82
  action_count: 82
  confidence: medium
  summary: "All 82 spec actions matched literally in source; transport parameters (9600 8N1, port 9761) verified; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 50NU830BZUA Series Control Spec

## Summary
RS-232 and IP (telnet port 9761) control protocol for LG commercial TVs in the 50NU830BZUA series. Two parallel command sets are documented: an ASCII serial protocol (9600 8N1) and a human-readable keyword IP protocol accessed over telnet. The IP protocol is documented for USA models.

<!-- UNRESOLVED: exact firmware range supported by the IP control menu (828 service code) not stated; "Network IP Control" menu requires manual enable via hidden service code. -->

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
  flow_control: none  # source: "3-Wire Configurations (Not standard)" / crossed cable
addressing:
  port: 9761  # telnet service port for Network IP Control
auth:
  type: none  # inferred: no auth procedure in source for either interface
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable  # volume, treble, bass, balance, contrast, brightness, color, tint, sharpness, backlight, color temp
```

## Actions
```yaml
# ====== SERIAL (RS-232C) ======
# Transmission format: [Command1][Command2][ ][Set ID][ ][Data][Cr]
# Set ID: 1-99 (decimal) or 0x00-0x63 (hex). 0 = all sets.
# [Cr] = 0x0D, [ ] = 0x20.
# Query: transmit 'FF' as data byte to read current state.

- id: power_set
  label: Power On/Off
  kind: action
  command: "ka {SetID} {00|01}"
  params:
    - name: SetID
      type: integer
      description: 0-99 (00=broadcast)
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Power Off, 01=Power On"

- id: power_query
  label: Power Status Query
  kind: query
  command: "ka {SetID} FF"
  params:
    - name: SetID
      type: integer
      description: 0-99

- id: aspect_ratio_set
  label: Aspect Ratio
  kind: action
  command: "kc {SetID} {data}"
  params:
    - name: SetID
      type: integer
    - name: data
      type: string
      description: "01=Normal, 02=16:9, 04=Zoom, 05=Zoom2, 06=Set by Program, 07=14:9, 09=Just Scan, 0B=Full Wide (LatAm), 0C=21:9, 10-1F=Cinema Zoom 1-16"

- id: screen_mute_set
  label: Screen Mute
  kind: action
  command: "kd {SetID} {data}"
  params:
    - name: data
      type: string
      description: "00=Screen mute off (Picture on, Video mute off), 01=Screen mute on (Picture off), 10=Video mute on"

- id: volume_mute_set
  label: Volume Mute
  kind: action
  command: "ke {SetID} {00|01}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Mute on (Volume off), 01=Mute off (Volume on)"

- id: volume_mute_query
  label: Volume Mute Query
  kind: query
  command: "ke {SetID} FF"

- id: volume_set
  label: Volume Control
  kind: action
  command: "kf {SetID} {level}"
  params:
    - name: level
      type: integer
      description: 0-100 (00-64 hex)

- id: volume_query
  label: Volume Query
  kind: query
  command: "kf {SetID} FF"

- id: contrast_set
  label: Contrast
  kind: action
  command: "kg {SetID} {level}"
  params:
    - name: level
      type: integer
      description: 0-100 (00-64 hex)

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "kg {SetID} FF"

- id: brightness_set
  label: Brightness
  kind: action
  command: "kh {SetID} {level}"
  params:
    - name: level
      type: integer
      description: 0-100 (00-64 hex)

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "kh {SetID} FF"

- id: color_set
  label: Color/Colour
  kind: action
  command: "ki {SetID} {level}"
  params:
    - name: level
      type: integer
      description: 0-100 (00-64 hex)

- id: color_query
  label: Color Query
  kind: query
  command: "ki {SetID} FF"

- id: tint_set
  label: Tint
  kind: action
  command: "kj {SetID} {level}"
  params:
    - name: level
      type: integer
      description: 0=Red to 100=Green (00-64 hex)

- id: tint_query
  label: Tint Query
  kind: query
  command: "kj {SetID} FF"

- id: sharpness_set
  label: Sharpness
  kind: action
  command: "kk {SetID} {level}"
  params:
    - name: level
      type: integer
      description: 0-50 (00-32 hex)

- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "kk {SetID} FF"

- id: osd_select_set
  label: OSD Select
  kind: action
  command: "kl {SetID} {00|01}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=OSD off, 01=OSD on"

- id: osd_select_query
  label: OSD Select Query
  kind: query
  command: "kl {SetID} FF"

- id: remote_lock_set
  label: Remote Control Lock Mode
  kind: action
  command: "km {SetID} {00|01}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Lock off, 01=Lock on"

- id: remote_lock_query
  label: Remote Control Lock Query
  kind: query
  command: "km {SetID} FF"

- id: treble_set
  label: Treble
  kind: action
  command: "kr {SetID} {level}"
  params:
    - name: level
      type: integer
      description: 0-100 (00-64 hex)

- id: treble_query
  label: Treble Query
  kind: query
  command: "kr {SetID} FF"

- id: bass_set
  label: Bass
  kind: action
  command: "ks {SetID} {level}"
  params:
    - name: level
      type: integer
      description: 0-100 (00-64 hex)

- id: bass_query
  label: Bass Query
  kind: query
  command: "ks {SetID} FF"

- id: balance_set
  label: Balance
  kind: action
  command: "kt {SetID} {level}"
  params:
    - name: level
      type: integer
      description: 0-100 (00-64 hex)

- id: balance_query
  label: Balance Query
  kind: query
  command: "kt {SetID} FF"

- id: color_temperature_set
  label: Color Temperature
  kind: action
  command: "xu {SetID} {level}"
  params:
    - name: level
      type: integer
      description: 0-100 (00-64 hex)

- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  command: "xu {SetID} FF"

- id: ism_method_set
  label: ISM Method (Plasma only)
  kind: action
  command: "jp {SetID} {data}"
  params:
    - name: data
      type: string
      description: "02=Orbiter, 08=Normal, 20=Color Wash"

- id: equalizer_set
  label: Equalizer
  kind: action
  command: "jv {SetID} {data}"
  params:
    - name: data
      type: string
      description: "8-bit value: bits 7-5 = frequency band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th), bits 4-0 = step 0-20"

- id: equalizer_query
  label: Equalizer Query
  kind: query
  command: "jv {SetID} FF"

- id: energy_saving_set
  label: Energy Saving
  kind: action
  command: "jq {SetID} {data}"
  params:
    - name: data
      type: string
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto/Intelligent sensor, 05=Screen off"

- id: energy_saving_query
  label: Energy Saving Query
  kind: query
  command: "jq {SetID} FF"

- id: tune_analog_eu
  label: Tune Command (Analog, EU/MidEast/Asia)
  kind: action
  command: "ma {SetID} {HighByte} {LowByte} {Source}"
  params:
    - name: HighByte
      type: string
    - name: LowByte
      type: string
    - name: Source
      type: string
      description: "00=ATV, 80=CATV. Channel range 00 00 - 00 C7 (0-199)."

- id: tune_digital_eu
  label: Tune Command (Digital, EU/MidEast/Asia)
  kind: action
  command: "ma 0 {Data00} {Data01} {Data02} {Data03} {Data04} {Data05}"
  params:
    - name: Data00
      type: string
      description: "Physical channel (xx=don't care for ATSC/DVB)"
    - name: Data01
      type: string
    - name: Data02
      type: string
    - name: Data03
      type: string
    - name: Data04
      type: string
    - name: Data05
      type: string
      description: "00=ATV, 01=CATV, 02=DTV antenna, 06=CADTV, 22=DTV no phys, 26=CADTV no phys, 46=CADTV phys+major, 66=CADTV major only"

- id: tune_digital_jp
  label: Tune Command (Digital, Japan)
  kind: action
  command: "ma 0 {Data00} {Data01} {Data02} {Data03} {Data04} {Data05}"
  params:
    - name: Data05
      type: string
      description: "02=DTV, 07=BS, 08=CS1, 09=CS2"

- id: channel_add_del
  label: Channel Add/Del/Skip
  kind: action
  command: "mb {SetID} {00|01}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Del(ATSC/ISDB)/Skip(DVB), 01=Add"

- id: channel_add_del_query
  label: Channel Add/Del Status Query
  kind: query
  command: "mb {SetID} FF"

- id: ir_key_send
  label: Send IR Key Code
  kind: action
  command: "mc {SetID} {keyCode}"
  params:
    - name: keyCode
      type: string
      description: "Hex key code (see Key Codes table in Feedbacks)"

- id: backlight_set
  label: Control Backlight
  kind: action
  command: "mg {SetID} {level}"
  params:
    - name: level
      type: integer
      description: 0-100 (00-64 hex)

- id: backlight_query
  label: Backlight Query
  kind: query
  command: "mg {SetID} FF"

- id: input_select_set
  label: Input Select (Main)
  kind: action
  command: "xb {SetID} {data}"
  params:
    - name: data
      type: string
      description: "00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1, 04=ISDB-CS2, 10=ATV, 11=CATV, 20=AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4"

- id: input_select_query
  label: Input Select Query
  kind: query
  command: "xb {SetID} FF"

- id: 3d_set
  label: 3D Mode (3D models only)
  kind: action
  command: "xt {SetID} {Data00} {Data01} {Data02} {Data03}"
  params:
    - name: Data00
      type: string
      description: "00=3D On, 01=3D Off, 02=3D to 2D, 03=2D to 3D"
    - name: Data01
      type: string
      description: "00=Top-Bottom, 01=Side-by-Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving"
    - name: Data02
      type: string
      description: "00=Right to Left, 01=Left to Right (Plasma)"
    - name: Data03
      type: string
      description: "3D depth 00-14 (hex), only meaningful when Data00=00 or 03 with manual genre"

- id: 3d_extended_set
  label: Extended 3D (3D models only)
  kind: action
  command: "xv {SetID} {Data00} {Data01}"
  params:
    - name: Data00
      type: string
      description: "00=3D Picture Correction, 01=3D Depth, 02=3D Viewpoint, 06=3D Color Correction, 07=3D Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre)"
    - name: Data01
      type: string
      description: "Per Data00: 00/01 for correction, 00-14 (hex, 0-20 dec) for depth/viewpoint, 00/01 for color/sound, 00/01 for normal, 00-05 for genre"

- id: auto_configure
  label: Auto Configure (RGB/PC mode only)
  kind: action
  command: "ju {SetID} 01"
  params: []

# ====== IP (TELNET :9761) ======
# Each line is sent followed by Enter. Response is "OK" or "NG".
# All ranges decimal.

- id: ip_power_off
  label: Power Off (IP)
  kind: action
  command: "POWER off"
  params: []

- id: ip_aspect_ratio
  label: Aspect Ratio (IP)
  kind: action
  command: "ASPECT_RATIO {4by3|16by9|setbyoriginal}"
  params:
    - name: mode
      type: enum
      values: ["4by3", "16by9", "setbyoriginal"]

- id: ip_screen_mute
  label: Screen Mute (IP)
  kind: action
  command: "SCREEN_MUTE {screenmuteon|videomuteon|allmuteoff}"
  params:
    - name: mode
      type: enum
      values: ["screenmuteon", "videomuteon", "allmuteoff"]

- id: ip_volume_mute
  label: Volume Mute (IP)
  kind: action
  command: "VOLUME_MUTE {on|off}"
  params:
    - name: mode
      type: enum
      values: ["on", "off"]

- id: ip_volume_control
  label: Volume Control (IP)
  kind: action
  command: "VOLUME_CONTROL {0-100}"
  params:
    - name: level
      type: integer
      description: 0-100 decimal

- id: ip_contrast
  label: Contrast (IP)
  kind: action
  command: "PICTURE_CONTRAST {0-100}"
  params:
    - name: level
      type: integer

- id: ip_brightness
  label: Brightness (IP)
  kind: action
  command: "PICTURE_BRIGHTNESS {0-100}"
  params:
    - name: level
      type: integer

- id: ip_color
  label: Color (IP)
  kind: action
  command: "PICTURE_COLOUR {0-100}"
  params:
    - name: level
      type: integer

- id: ip_tint
  label: Tint (IP)
  kind: action
  command: "PICTURE_TINT {0-100}"
  params:
    - name: level
      type: integer

- id: ip_sharpness
  label: Sharpness (IP)
  kind: action
  command: "PICTURE_SHARPNESS {0-50}"
  params:
    - name: level
      type: integer
      description: 0-50 decimal

- id: ip_osd_select
  label: OSD Select (IP)
  kind: action
  command: "OSD_SELECT {on|off}"
  params:
    - name: mode
      type: enum
      values: ["on", "off"]

- id: ip_remote_lock
  label: Remote Control Lock (IP)
  kind: action
  command: "REMOTECONTROLER_LOCK {on|off}"
  params:
    - name: mode
      type: enum
      values: ["on", "off"]

- id: ip_balance
  label: Balance (IP)
  kind: action
  command: "AUDIO_BALANCE {0-100}"
  params:
    - name: level
      type: integer

- id: ip_color_temperature
  label: Color Temperature (IP)
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {0-100}"
  params:
    - name: level
      type: integer

- id: ip_equalizer
  label: Equalizer (IP)
  kind: action
  command: "AUDIO_EQUALIZER {1-5} {0-20}"
  params:
    - name: band
      type: integer
      description: "1-5 (frequency band)"
    - name: step
      type: integer
      description: "0-20 (step decimal). Precondition: All settings > sound > sound mode settings > Equalizer on"

- id: ip_energy_saving
  label: Energy Saving (IP)
  kind: action
  command: "ENERGY_SAVING {screenoff|maximum|medium|minimum|off}"
  params:
    - name: mode
      type: enum
      values: ["screenoff", "maximum", "medium", "minimum", "off"]

- id: ip_tune_atsc_atv_antenna
  label: Tune ATSC/ATV Antenna (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {ChannelNumber} antenna"
  params:
    - name: ChannelNumber
      type: integer

- id: ip_tune_atsc_atv_cable
  label: Tune ATSC/ATV Cable (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {ChannelNumber} cable"
  params:
    - name: ChannelNumber
      type: integer

- id: ip_tune_atsc_dtv_cable
  label: Tune ATSC/DTV Cable no physical (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {ChannelNumber} cablenotphy"
  params:
    - name: ChannelNumber
      type: integer

- id: ip_tune_atsc_dtv_antenna_majmin
  label: Tune ATSC/DTV Antenna Major/Minor (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {MajChannel} {MinChannel} antennanotphy"
  params:
    - name: MajChannel
      type: integer
    - name: MinChannel
      type: integer

- id: ip_tune_atsc_dtv_cable_majmin
  label: Tune ATSC/DTV Cable Major/Minor (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {MajChannel} {MinChannel} cablenotphy"
  params:
    - name: MajChannel
      type: integer
    - name: MinChannel
      type: integer

- id: ip_channel_add_delete
  label: Channel Add/Delete (IP)
  kind: action
  command: "CHANNEL_ADD_DELETE {add|delete}"
  params:
    - name: mode
      type: enum
      values: ["add", "delete"]

- id: ip_key_action
  label: IR Key Action (IP)
  kind: action
  command: "KEY_ACTION {keyName}"
  params:
    - name: keyName
      type: enum
      values: [exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, record, "3d", autoconfig, app, screenbright, number0, number1, number2, number3, number4, number5, number6, number7, number8, number9]

- id: ip_backlight
  label: Backlight (IP)
  kind: action
  command: "PICTURE_BACKLIGHT {0-100}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal. Precondition: All settings > picture > Energy Saving off"

- id: ip_input_select
  label: Input Select (IP)
  kind: action
  command: "INPUT_SELECT {dtv|atv|cadtv|catv|avav1|component1|hdmi1|hdmi2|hdmi3}"
  params:
    - name: input
      type: enum
      values: [dtv, atv, cadtv, catv, avav1, component1, hdmi1, hdmi2, hdmi3]

- id: ip_3d_off_or_3dto2d
  label: 3D Off/3D-to-2D (IP)
  kind: action
  command: "PICTURE_3D {off|3dto2d}"
  params:
    - name: mode
      type: enum
      values: ["off", "3dto2d"]

- id: ip_3d_2dto3d
  label: 2D-to-3D (IP)
  kind: action
  command: "PICTURE_3D 2dto3d {righttoleft|lefttoright} {0-20}"
  params:
    - name: direction
      type: enum
      values: ["righttoleft", "lefttoright"]
    - name: depth
      type: integer
      description: 0-20 decimal

- id: ip_3d_on
  label: 3D On (IP)
  kind: action
  command: "PICTURE_3D on {pattern} {direction} {0-20}"
  params:
    - name: pattern
      type: enum
      values: [topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving]
    - name: direction
      type: enum
      values: ["righttoleft", "lefttoright"]
    - name: depth
      type: integer

- id: ip_3d_ext_picture_correction
  label: 3D Picture Correction (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION picturecorrection {0|1}"
  params:
    - name: value
      type: enum
      values: ["0", "1"]
      description: "0=Right to Left, 1=Left to Right. Precondition: PICTURE_3D on X X X"

- id: ip_3d_ext_color_or_sound
  label: 3D Color/Sound (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION {colorcorrection|sound} {0|1}"
  params:
    - name: option
      type: enum
      values: ["colorcorrection", "sound"]
    - name: value
      type: enum
      values: ["0", "1"]
      description: "0=off, 1=on. Precondition: PICTURE_3D on X X X"

- id: ip_3d_ext_normal
  label: 3D Normal Image View (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION normal {0|1}"
  params:
    - name: value
      type: enum
      values: ["0", "1"]

- id: ip_3d_ext_depth_or_viewpoint
  label: 3D Depth/Viewpoint (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION {depth|viewpoint} {0-20}"
  params:
    - name: option
      type: enum
      values: ["depth", "viewpoint"]
    - name: value
      type: integer
      description: "Precondition: PICTURE_3D 2dto3d X X; depth also requires PICTURE_3D_EXTENSION genre 4"

- id: ip_3d_ext_genre
  label: 3D Genre (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION genre {0-5}"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2", "3", "4", "5"]
      description: "0=Standard, 1=Sport, 2=Cinema, 3=Extreme, 4=Manual, 5=Auto. Precondition: PICTURE_3D 2dto3d X X"

- id: ip_quit
  label: Quit IP Session
  kind: action
  command: "quit"
  params: []
```

## Feedbacks
```yaml
# OK acknowledgement (serial): [Command2][ ][SetID][ ][OK][Data][x]
# Error acknowledgement (serial): [Command2][ ][SetID][ ][NG][Data][x], where Data 00 = Illegal Code
# IP response: "OK" on success, "NG" on failure
- id: serial_ack_ok
  type: string
  description: "OK acknowledgement from TV. Format: [Command2][ ][SetID][ ][OK][Data][x]"
- id: serial_ack_ng
  type: string
  description: "NG acknowledgement. Format: [Command2][ ][SetID][ ][NG][Data][x]. Data 00 = Illegal Code"
- id: ip_ok
  type: string
  description: "Returned by TV on successful IP command"
- id: ip_ng
  type: string
  description: "Returned by TV on failed IP command (also appears if Enter pressed before any command)"

# Key code mapping (used by both serial mc and IP KEY_ACTION)
- id: ir_key_code
  type: mapping
  description: "IR remote key code table (hex) used by serial command mc and (by name) by IP KEY_ACTION"
  values:
    "00": "CH+, PR+"
    "01": "CH-, PR-"
    "02": "Volume +"
    "03": "Volume -"
    "06": "Arrow Right"
    "07": "Arrow Left"
    "08": "Power"
    "09": "Mute"
    "0B": "Input"
    "0E": "SLEEP"
    "0F": "TV, TV/RAD"
    "10-19": "Number 0-9"
    "1A": "Q.View / Flashback"
    "1E": "FAV (Favorite Channel)"
    "20": "Teletext"
    "21": "T.Opt (Teletext Option)"
    "28": "Return (BACK)"
    "30": "AV Mode"
    "39": "Caption/Subtitle"
    "40": "Arrow Up"
    "41": "Arrow Down"
    "42": "My Apps"
    "43": "Menu / Settings"
    "44": "OK / Enter"
    "45": "Q.Menu"
    "4C": "List, - (ATSC only)"
    "4D": "PICTURE"
    "52": "SOUND"
    "53": "List"
    "5B": "Exit"
    "60": "PIP(AD)"
    "61": "Blue"
    "63": "Yellow"
    "71": "Green"
    "72": "Red"
    "79": "Ratio / Aspect Ratio"
    "7A": "User Guide"
    "7C": "Smart / Home"
    "7E": "SIMPLINK"
    "8E": "Forward"
    "8F": "Rewind"
    "91": "AD (Audio Description)"
    "99": "AutoConfig"
    "9B": "TV / PC"
    "9E": "LIVE MENU"
    "9F": "App / *"
    "AA": "Info"
    "AB": "Program Guide"
    "B0": "Play"
    "B1": "Stop / File List"
    "B5": "RECENT"
    "BA": "Freeze / Slow Play / Pause"
    "BB": "Soccer"
    "BD": "REC"
    "DC": "3D"
```

## Variables
```yaml
- id: set_id
  type: integer
  description: "TV Set ID. Range 1-99 (decimal) or 0x00-0x63 (hex). 0 = broadcast to all connected sets. Configured in SETTINGS > General > About this TV / OPTION > SET ID."
- id: power_state
  type: enum
  values: [on, off]
  description: "Current power state, returned by ka query"
- id: volume_level
  type: integer
  description: "0-100 (decimal), 0x00-0x64 (hex). Serial: 0-100 (00-64 hex). IP: 0-100 decimal."
- id: input_source
  type: enum
  values: [dtv, cadtv, satellite_dtv, isdb_cs1, isdb_cs2, atv, catv, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]
  description: "Current main picture input source (xb query)"
- id: aspect_ratio
  type: enum
  values: [normal, 16_9, zoom, zoom2, set_by_program, 14_9, just_scan, full_wide, 21_9, cinema_zoom_1_to_16]
  description: "Main picture aspect ratio (kc query)"
- id: screen_mute_state
  type: enum
  values: [screen_mute_off, screen_mute_on, video_mute_on]
  description: "Screen/video mute state (kd query)"
- id: energy_saving
  type: enum
  values: [off, minimum, medium, maximum, auto, screen_off]
  description: "Energy saving mode (jq query). 04=Auto (LCD/LED) / Intelligent sensor (PDP)"
- id: backlight_level
  type: integer
  description: "0-100 (decimal), 0x00-0x64 (hex)"
- id: color_temperature
  type: integer
  description: "0-100 (decimal)"
- id: equalizer_band
  type: integer
  description: "1-5 (frequency band index)"
- id: equalizer_step
  type: integer
  description: "0-20 (step decimal)"
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event/notification messages from the TV
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  # When main power is off & on (plug-off and plug-in, after 20-30 seconds), external control lock is released.
  # In standby mode (DC off by off timer or 'ka' / 'mc' command), if key lock is on, TV will not turn on by IR or local power key.
  # During media playback/recording, all serial/IP commands except Power (ka) and Key (mc) are rejected as NG.
  - "External control lock auto-releases 20-30 seconds after power cycle"
  - "Key lock blocks IR + local power-on in standby"
  - "Media playback/recording blocks all commands except power and key"
# UNRESOLVED: no explicit safety warnings (electrical, mounting, interlock with mains) found in source
```

## Notes
- Two parallel control paths: serial RS-232C (9600 8N1, ASCII, crossed cable) and IP telnet on TCP 9761. IP control is documented for USA only and requires manual enable via hidden service code 828 from Settings button on Live TV.
- IP control session termination: send `quit` to close the connection cleanly.
- During playing or recording media, all commands except Power (ka/POWER) and Key (mc/KEY_ACTION) return NG.
- With USB-to-Serial converter cable, the ka command works only when TV is on; with RS-232C cable, ka works in both power-on and power-off states.
- The 3D-related commands (xt, xv / PICTURE_3D, PICTURE_3D_EXTENSION) are conditional on 3D model hardware; the spec is a 2D LED unit so these are not applicable to the 50NU830BZUA but are included for completeness from the source.
- WOL (Wake-on-LAN) is mentioned as a power-on method but the WOL magic packet format is not documented in the source.
- Power-on via IP is not directly listed as a keyword; POWER off is the only documented POWER command via IP (power on is handled via WOL, not telnet).
- Set ID hex vs decimal: menu shows decimal (1-99), wire format is hex (0x00-0x63).
- The "Command1" set used in serial: j (screen/extra), k (basic picture/audio), m (channel/key/backlight), x (input/3D/3D ext/temp).

<!-- UNRESOLVED: firmware compatibility range, exact WOL packet format, IP power-on command (if any beyond WOL). -->
```

Spec written. Both serial + IP transport blocks. Full action enum per source. Key code table as feedback mapping. Caveman mode noted. Ready for ingest.

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - justaddpower.happyfox.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
retrieved_at: 2026-06-02T17:22:57.649Z
last_checked_at: 2026-06-02T17:22:57.649Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:57.649Z
matched_actions: 82
action_count: 82
confidence: medium
summary: "All 82 spec actions matched literally in source; transport parameters (9600 8N1, port 9761) verified; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware range supported by the IP control menu (828 service code) not stated; \"Network IP Control\" menu requires manual enable via hidden service code."
- "source does not document unsolicited event/notification messages from the TV"
- "source does not document multi-step macro sequences"
- "no explicit safety warnings (electrical, mounting, interlock with mains) found in source"
- "firmware compatibility range, exact WOL packet format, IP power-on command (if any beyond WOL)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
