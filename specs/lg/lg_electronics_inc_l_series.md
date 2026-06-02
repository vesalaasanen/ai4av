---
spec_id: admin/lg-electronics-l-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG Electronics L Series TV Control Spec"
manufacturer: LG
model_family: "L Series (model-dependent; see source for supported feature list)"
aliases: []
compatible_with:
  manufacturers:
    - LG
    - "LG Electronics"
  models:
    - "L Series (model-dependent; see source for supported feature list)"
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
retrieved_at: 2026-04-30T12:05:07.146Z
last_checked_at: 2026-06-02T03:24:51.404Z
generated_at: 2026-06-02T03:24:51.404Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific L Series model numbers (L3200/L3700/L4200/etc.) not named in source; doc covers whole L Series with \"(Depending on model)\" flags."
  - "source contains no explicit safety warnings, interlocks, or power-on"
  - "voltage, current, power consumption, and standby power draw not in source. UNRESOLVED: firmware version compatibility ranges. UNRESOLVED: protocol version numbers. UNRESOLVED: full IR key code list has ~50 entries; included as enum in `key` action (RS-232) and `key_action_ip` action (TCP) but consult source lines 7-37 for any subtle regional differences (e.g. 4C ATSC-only). UNRESOLVED: specific L Series submodel numbers (L3200/L3700/L4200) — source does not name these; the control spec applies to the whole L Series with model-dependent feature flags."
verification:
  verdict: verified
  checked_at: 2026-06-02T03:24:51.404Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions matched with source; command tokens, parameter ranges, transport parameters verified; 1:1 bidirectional coverage. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG Electronics L Series TV Control Spec

## Summary
RS-232 and Telnet (TCP/9761) control for LG L Series TVs. Spec covers power, aspect, picture/sound tuning, channel tune, input select, IR-key emulation, 3D modes, energy saving, and remote-lock. Applies to L Series; many features model-dependent.

<!-- UNRESOLVED: specific L Series model numbers (L3200/L3700/L4200/etc.) not named in source; doc covers whole L Series with "(Depending on model)" flags. -->

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
  encoding: ascii
  cable: crossed-reverse
addressing:
  port: 9761  # Telnet service port for Network IP Control
auth:
  type: none  # inferred for serial: no auth procedure in source
  # Network IP control requires 3-digit password (default 828) to enable in Settings menu,
  # but the established telnet session itself uses no per-command auth.
```

## Traits
```yaml
- powerable       # inferred from Power (ka) and POWER commands
- routable        # inferred from Input select (xb) and INPUT_SELECT commands
- queryable       # inferred from "FF" read-data convention across all commands
- levelable       # inferred from Volume/Bass/Treble/Balance/Contrast/Brightness/Color/Tint/Sharpness/Backlight/ColorTemp commands
- lockable        # inferred from Remote Control Lock Mode (km) / REMOTECONTROLER_LOCK
```

## Actions
```yaml
# ============================================================
# RS-232 command set (UART, 9600 8N1, ASCII, terminated by CR 0x0D)
# Frame: [Cmd1][Cmd2][ ][SetID_hex][ ][Data][Cr]
# SetID: 0x00 = broadcast, 0x01-0x63 = 1..99 (decimal)
# Response: [Cmd2][ ][SetID][ ][OK|NG][Data][x]   (x = ASCII 0x78)
# "FF" data byte = read/query current state.
# ============================================================

- id: power
  label: Power
  kind: action
  transport: serial
  command: "ka {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte, description: "Set ID 0x00-0x63 (0x00 = broadcast)"}
    - {name: data, type: enum, values: ["00", "01", "FF"], description: "00=off, 01=on, FF=query"}
  notes: "Query returns 'a [SetID] OK [Data]x'. With RS-232 cable works in standby; USB-to-serial works only when TV on."

- id: aspect_ratio
  label: Aspect Ratio (Main Picture)
  kind: action
  transport: serial
  command: "kc {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte, description: "Set ID 0x00-0x63"}
    - {name: data, type: enum, values: ["01", "02", "04", "05", "06", "07", "09", "0B", "0C", "10-1F", "FF"], description: "01=4:3, 02=16:9, 04=Zoom, 05=Zoom2, 06=Set by Program/Original, 07=14:9, 09=Just Scan, 0B=Full Wide, 0C=21:9, 10-1F=Cinema Zoom 1-16, FF=query"}

- id: screen_mute
  label: Screen Mute
  kind: action
  transport: serial
  command: "kd {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: enum, values: ["00", "01", "10", "FF"], description: "00=off, 01=screen mute on, 10=video mute on, FF=query"}

- id: volume_mute
  label: Volume Mute
  kind: action
  transport: serial
  command: "ke {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: enum, values: ["00", "01", "FF"], description: "00=mute on, 01=mute off, FF=query"}

- id: volume_control
  label: Volume Control
  kind: action
  transport: serial
  command: "kf {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: hex_byte, description: "00-64 (or FF=query)"}

- id: contrast
  label: Contrast
  kind: action
  transport: serial
  command: "kg {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: hex_byte, description: "00-64 or FF=query"}

- id: brightness
  label: Brightness
  kind: action
  transport: serial
  command: "kh {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: hex_byte, description: "00-64 or FF=query"}

- id: color
  label: Color/Colour
  kind: action
  transport: serial
  command: "ki {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: hex_byte, description: "00-64 or FF=query"}

- id: tint
  label: Tint
  kind: action
  transport: serial
  command: "kj {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: hex_byte, description: "00-64 (Red 00 → Green 64) or FF=query"}
  notes: "Ack uses 'r' as command2 char, not 'j'. Source line 304: 'Ack [r][ ][Set ID][ ][OK/NG][Data][x]'."

- id: sharpness
  label: Sharpness
  kind: action
  transport: serial
  command: "kk {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: hex_byte, description: "00-32 or FF=query"}

- id: osd_select
  label: OSD Select
  kind: action
  transport: serial
  command: "kl {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: enum, values: ["00", "01", "FF"], description: "00=off, 01=on, FF=query"}

- id: remote_lock
  label: Remote Control Lock Mode
  kind: action
  transport: serial
  command: "km {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: enum, values: ["00", "01"], description: "00=lock off, 01=lock on"}
  notes: "Releases on main power cycle (20-30 s). In standby with key lock on, TV ignores IR power-on."

- id: treble
  label: Treble
  kind: action
  transport: serial
  command: "kr {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: hex_byte, description: "00-64 or FF=query"}

- id: bass
  label: Bass
  kind: action
  transport: serial
  command: "ks {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: hex_byte, description: "00-64 or FF=query"}

- id: balance
  label: Balance
  kind: action
  transport: serial
  command: "kt {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: hex_byte, description: "00-64 or FF=query"}

- id: color_temperature
  label: Color Temperature
  kind: action
  transport: serial
  command: "xu {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: hex_byte, description: "00-64 or FF=query"}

- id: ism_method
  label: ISM Method (Plasma only)
  kind: action
  transport: serial
  command: "jp {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: enum, values: ["02", "08", "20"], description: "02=Orbiter, 08=Normal, 20=Color Wash"}

- id: equalizer
  label: Equalizer
  kind: action
  transport: serial
  command: "jv {setid} {d0} {d1}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: d0, type: hex_byte, description: "MSB nibble = band select (1-5 in bits 7-5, lower 5 bits 0)"}
    - {name: d1, type: hex_byte, description: "LSB byte = step (00-19 decimal, see source table for band/step bit layout)"}
  notes: "Band/step encoding is non-trivial. Source lines 403-413: bits 7-5 = band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th); lower 5 bits of byte = step (0-20)."

- id: energy_saving
  label: Energy Saving
  kind: action
  transport: serial
  command: "jq {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: enum, values: ["00", "01", "02", "03", "04", "05"], description: "00=Off, 01=Min, 02=Med, 03=Max, 04=Auto/Intelligent sensor, 05=Screen off"}

- id: tune_command
  label: Tune Command
  kind: action
  transport: serial
  command: "ma {setid} {d0} {d1} {d2} {d3} {d4} {d5}\r"
  params:
    - {name: setid, type: hex_byte, description: "Often 00 (broadcast) for tune"}
    - {name: d0, type: hex_byte, description: "Physical channel high byte (or 00 if not used)"}
    - {name: d1, type: hex_byte, description: "Physical/Channel low byte, or Major channel high byte"}
    - {name: d2, type: hex_byte, description: "Major channel low byte OR Input Source analog (00=ATV, 80=CATV)"}
    - {name: d3, type: hex_byte, description: "Minor channel high byte"}
    - {name: d4, type: hex_byte, description: "Minor channel low byte"}
    - {name: d5, type: hex_byte, description: "Input Source (00=ATV, 01=CATV, 02=DTV-Antenna w/Physical, 06=CADTV w/Physical, 22=DTV-Antenna no Physical, 26=CADTV no Physical, 40=Satellite DTV, 46=CADTV one-part w/Physical/Major, 66=CADTV one-part Major only, 07=BS, 10=DVB-T)"}
  notes: "Frame layout varies by region (Korea/Americas vs Europe/Asia vs Japan). Source examples: ma 00 00 0a 00 (analog PAL ch10), ma 00 00 01 10 (DVB-T ch1), ma 00 03 E8 40 (DVB-S ch1000)."

- id: channel_add_del
  label: Channel Add/Del (Skip)
  kind: action
  transport: serial
  command: "mb {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: enum, values: ["00", "01"], description: "00=Del(ATSC/ISDB)/Skip(DVB), 01=Add"}

- id: key
  label: IR Remote Key
  kind: action
  transport: serial
  command: "mc {setid} {keycode}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: keycode, type: hex_byte, description: "IR key code. Source-defined enum: 00=CH+, 01=CH-, 02=Vol+, 03=Vol-, 06=Right, 07=Left, 08=Power, 09=Mute, 0B=Input, 0E=Sleep, 0F=TV, 10-19=Number 0-9, 1A=Q.View/Flashback, 1E=FAV, 20=Teletext, 21=T.Opt, 28=Return(BACK), 30=AV Mode, 39=Caption/Subtitle, 40=Up, 41=Down, 42=My Apps, 43=Menu/Settings, 44=OK, 45=Q.Menu, 4C=List (ATSC only), 4D=PICTURE, 52=SOUND, 53=List, 5B=Exit, 60=PIP(AD), 61=Blue, 63=Yellow, 71=Green, 72=Red, 79=Ratio/Aspect, 91=AD, 9E=Live Menu, 7A=User Guide, 7C=Smart/Home, 7E=SIMPLINK, 8E=Forward, 8F=Rewind, AA=Info, AB=Program Guide, B0=Play, B1=Stop/File List, BA=Freeze/Slow/Pause, BB=Soccer, BD=REC, DC=3D, 99=AutoConfig, 9F=App/*, 9B=TV/PC"}
  notes: "This command works in standby (unlike most others). 'ka' also works in standby with RS-232 cable."

- id: backlight
  label: Backlight / Panel Light
  kind: action
  transport: serial
  command: "mg {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: hex_byte, description: "00-64 or FF=query"}
  notes: "LCD/LED = backlight; Plasma = panel light."

- id: input_select
  label: Input Select (Main Picture)
  kind: action
  transport: serial
  command: "xb {setid} {data}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: data, type: enum, values: ["00", "01", "02", "03", "04", "10", "11", "20", "21", "40", "41", "60", "90", "91", "92", "93"], description: "00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1, 04=ISDB-CS2, 10=ATV, 11=CATV, 20=AV/AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4"}

- id: threed_mode
  label: 3D Mode (3D models only)
  kind: action
  transport: serial
  command: "xt {setid} {d0} {d1} {d2} {d3}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: d0, type: enum, values: ["00", "01", "02", "03"], description: "00=3D On, 01=3D Off, 02=3D→2D, 03=2D→3D"}
    - {name: d1, type: enum, values: ["00", "01", "02", "03", "04", "05"], description: "00=Top-Bottom, 01=Side-by-Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving"}
    - {name: d2, type: enum, values: ["00", "01"], description: "00=Right→Left, 01=Left→Right"}
    - {name: d3, type: hex_byte, description: "3D Effect/Depth: 00-14 hex"}
  notes: "d1/d2/d3 ignored if d0=01 or 02. d1/d2 ignored if d0=03. d3 only meaningful when 3D Mode Genre=Manual."

- id: threed_extended
  label: Extended 3D (3D models only)
  kind: action
  transport: serial
  command: "xv {setid} {d0} {d1}\r"
  params:
    - {name: setid, type: hex_byte}
    - {name: d0, type: enum, values: ["00", "01", "02", "06", "07", "08", "09"], description: "00=3D Picture Correction, 01=3D Depth, 02=3D Viewpoint, 06=3D Color Correction, 07=3D Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre)"}
    - {name: d1, type: hex_byte, description: "Range depends on d0 (see notes)"}
  notes: "d0=00: 00=R→L, 01=L→R. d0=01 or 02: 00-14 hex (auto-maps 0-20 decimal to -10..+10). d0=06 or 07: 00=off, 01=on. d0=08: 00=revert 3D from 3D-to-2D, 01=3D→2D. d0=09: 00=Standard, 01=Sport, 02=Cinema, 03=Extreme, 04=Manual, 05=Auto."

- id: auto_configure
  label: Auto Configure (RGB/PC mode only)
  kind: action
  transport: serial
  command: "ju {setid} 01\r"
  params:
    - {name: setid, type: hex_byte}
  notes: "Adjusts picture position and minimizes image shaking. Only in RGB (PC) input."

# ============================================================
# Network IP Control (TCP/Telnet, port 9761)
# Frame: text command terminated by Enter; response: "OK" or "NG" on success/fail.
# "quit" closes session. 3-digit password (default 828) required to enable in Settings.
# ============================================================

- id: power_ip
  label: Power
  kind: action
  transport: tcp
  command: "POWER {state}"
  params:
    - {name: state, type: enum, values: ["on", "off"]}

- id: aspect_ratio_ip
  label: Aspect Ratio
  kind: action
  transport: tcp
  command: "ASPECT_RATIO {mode}"
  params:
    - {name: mode, type: enum, values: ["4by3", "16by9", "setbyoriginal"]}

- id: screen_mute_ip
  label: Screen Mute
  kind: action
  transport: tcp
  command: "SCREEN_MUTE {mode}"
  params:
    - {name: mode, type: enum, values: ["screenmuteon", "videomuteon", "allmuteoff"]}

- id: volume_mute_ip
  label: Volume Mute
  kind: action
  transport: tcp
  command: "VOLUME_MUTE {state}"
  params:
    - {name: state, type: enum, values: ["on", "off"]}

- id: volume_control_ip
  label: Volume Control
  kind: action
  transport: tcp
  command: "VOLUME_CONTROL {level}"
  params:
    - {name: level, type: integer, description: "0-100 decimal"}

- id: contrast_ip
  label: Contrast
  kind: action
  transport: tcp
  command: "PICTURE_CONTRAST {value}"
  params:
    - {name: value, type: integer, description: "0-100 decimal"}

- id: brightness_ip
  label: Brightness
  kind: action
  transport: tcp
  command: "PICTURE_BRIGHTNESS {value}"
  params:
    - {name: value, type: integer, description: "0-100 decimal"}

- id: color_ip
  label: Color
  kind: action
  transport: tcp
  command: "PICTURE_COLOUR {value}"
  params:
    - {name: value, type: integer, description: "0-100 decimal"}

- id: tint_ip
  label: Tint
  kind: action
  transport: tcp
  command: "PICTURE_TINT {value}"
  params:
    - {name: value, type: integer, description: "0-100 decimal"}

- id: sharpness_ip
  label: Sharpness
  kind: action
  transport: tcp
  command: "PICTURE_SHARPNESS {value}"
  params:
    - {name: value, type: integer, description: "0-50 decimal"}

- id: osd_select_ip
  label: OSD Select
  kind: action
  transport: tcp
  command: "OSD_SELECT {state}"
  params:
    - {name: state, type: enum, values: ["on", "off"]}

- id: remote_lock_ip
  label: Remote Control Lock
  kind: action
  transport: tcp
  command: "REMOTECONTROLER_LOCK {state}"
  params:
    - {name: state, type: enum, values: ["on", "off"]}

- id: balance_ip
  label: Balance
  kind: action
  transport: tcp
  command: "AUDIO_BALANCE {value}"
  params:
    - {name: value, type: integer, description: "0-100 decimal"}

- id: color_temperature_ip
  label: Color Temperature
  kind: action
  transport: tcp
  command: "PICTURE_COLOUR_TEMPERATURE {value}"
  params:
    - {name: value, type: integer, description: "0-100 decimal"}

- id: equalizer_ip
  label: Equalizer
  kind: action
  transport: tcp
  command: "AUDIO_EQUALIZER {band} {step}"
  params:
    - {name: band, type: integer, description: "1-5 (frequency band)"}
    - {name: step, type: integer, description: "0-20 decimal"}
  notes: "Precondition: Settings > Sound > Sound Mode > Equalizer on."

- id: energy_saving_ip
  label: Energy Saving
  kind: action
  transport: tcp
  command: "ENERGY_SAVING {mode}"
  params:
    - {name: mode, type: enum, values: ["screenoff", "maximum", "medium", "minimum", "off"]}

- id: tune_atsc_atv
  label: Tune (ATSC/ATV)
  kind: action
  transport: tcp
  command: "CHANNEL_SETTING_ATSC_ATV {channel} {source}"
  params:
    - {name: channel, type: integer}
    - {name: source, type: enum, values: ["antenna", "cable"]}

- id: tune_atsc_dtv
  label: Tune (ATSC/DTV)
  kind: action
  transport: tcp
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} {source}"
  params:
    - {name: major, type: integer, description: "Major channel number"}
    - {name: minor, type: integer, description: "Minor channel number"}
    - {name: source, type: enum, values: ["antennanotphy", "cablenotphy", "cablemaj"]}

- id: channel_add_del_ip
  label: Channel Add/Delete
  kind: action
  transport: tcp
  command: "CHANNEL_ADD_DELETE {action}"
  params:
    - {name: action, type: enum, values: ["add", "delete"]}

- id: key_action_ip
  label: IR Remote Key
  kind: action
  transport: tcp
  command: "KEY_ACTION {key}"
  params:
    - {name: key, type: enum, values: ["exit", "channelup", "channeldown", "volumeup", "volumedown", "arrowright", "arrowleft", "volumemute", "deviceinput", "sleepreserve", "livetv", "previouschannel", "favoritechannel", "teletext", "teletextoption", "returnback", "avmode", "captionsubtitle", "arrowup", "arrowdown", "myapp", "settingmenu", "ok", "quickmenu", "videomode", "audiomode", "channellist", "bluebutton", "yellowbutton", "greenbutton", "redbutton", "aspectratio", "audiodescription", "programmorder", "userguide", "smarthome", "simplelink", "fastforward", "rewind", "programminfo", "programguide", "play", "slowplay", "soccerscreen", "record", "3d", "autoconfig", "app", "screenbright", "number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9"]}

- id: backlight_ip
  label: Backlight
  kind: action
  transport: tcp
  command: "PICTURE_BACKLIGHT {value}"
  params:
    - {name: value, type: integer, description: "0-100 decimal"}
  notes: "Precondition: Settings > Picture > Energy Saving off."

- id: input_select_ip
  label: Input Select
  kind: action
  transport: tcp
  command: "INPUT_SELECT {input}"
  params:
    - {name: input, type: enum, values: ["dtv", "atv", "cadtv", "catv", "avav1", "component1", "hdmi1", "hdmi2", "hdmi3"]}

- id: threed_off_ip
  label: 3D Off / 3D→2D
  kind: action
  transport: tcp
  command: "PICTURE_3D {mode}"
  params:
    - {name: mode, type: enum, values: ["off", "3dto2d"]}

- id: threed_2dto3d_ip
  label: 3D 2D→3D
  kind: action
  transport: tcp
  command: "PICTURE_3D 2dto3d {direction} {depth}"
  params:
    - {name: direction, type: enum, values: ["righttoleft", "lefttoright"]}
    - {name: depth, type: integer, description: "0-20 decimal"}

- id: threed_on_ip
  label: 3D On
  kind: action
  transport: tcp
  command: "PICTURE_3D on {pattern} {direction} {depth}"
  params:
    - {name: pattern, type: enum, values: ["topandbottom", "sidebyside", "checkboard", "framesequential", "columninterleaving", "rowinterleaving"]}
    - {name: direction, type: enum, values: ["righttoleft", "lefttoright"]}
    - {name: depth, type: integer, description: "0-20 decimal"}

- id: threed_ext_picturecorrection_ip
  label: 3D Extended: Picture Correction
  kind: action
  transport: tcp
  command: "PICTURE_3D_EXTENSION picturecorrection {value}"
  params:
    - {name: value, type: enum, values: ["0", "1"], description: "0=Right→Left, 1=Left→Right"}
  notes: "Precondition: PICTURE_3D on X X X"

- id: threed_ext_color_sound_ip
  label: 3D Extended: Color Correction / Sound Zooming
  kind: action
  transport: tcp
  command: "PICTURE_3D_EXTENSION {option} {value}"
  params:
    - {name: option, type: enum, values: ["colorcorrection", "sound"]}
    - {name: value, type: enum, values: ["0", "1"], description: "0=off, 1=on"}
  notes: "Precondition: PICTURE_3D on X X X"

- id: threed_ext_normal_ip
  label: 3D Extended: Normal Image View
  kind: action
  transport: tcp
  command: "PICTURE_3D_EXTENSION normal {value}"
  params:
    - {name: value, type: enum, values: ["0", "1"], description: "0=off, 1=on"}
  notes: "Precondition: PICTURE_3D on X X X"

- id: threed_ext_depth_viewpoint_ip
  label: 3D Extended: Depth / Viewpoint
  kind: action
  transport: tcp
  command: "PICTURE_3D_EXTENSION {option} {value}"
  params:
    - {name: option, type: enum, values: ["depth", "viewpoint"]}
    - {name: value, type: integer, description: "0-20 decimal (viewpoint range)"}
  notes: "Depth precondition: PICTURE_3D 2dto3d X X AND PICTURE_3D_EXTENSION genre 4 (Manual). Viewpoint precondition: PICTURE_3D 2dto3d X X."

- id: threed_ext_genre_ip
  label: 3D Extended: Genre
  kind: action
  transport: tcp
  command: "PICTURE_3D_EXTENSION genre {value}"
  params:
    - {name: value, type: enum, values: ["0", "1", "2", "3", "4", "5"], description: "0=Standard, 1=Sport, 2=Cinema, 3=Extreme, 4=Manual, 5=Auto"}
  notes: "Precondition: PICTURE_3D 2dto3d X X"

- id: session_quit
  label: Close Telnet Session
  kind: action
  transport: tcp
  command: "quit"
  params: []
  notes: "Source line 800-801: 'quit\\nConnection closed by foreign host'."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  source: 'Ack: a [SetID] OK [Data]x - Data 00=off, 01=on'
- id: rs232_ack
  type: enum
  values: [OK, NG]
  source: 'Every RS-232 command returns "[Cmd2] [SetID] OK[Data]x" or "NG[Data]x". NG Data 00 = Illegal Code.'
- id: ip_ack
  type: enum
  values: [OK, NG]
  source: 'Telnet text response: "OK" on success, "NG" on error. "NG" also appears on initial Enter when no command sent (line 786).'
- id: read_value
  type: hex_byte
  source: 'Transmit FF data to read current state of any RS-232 command; response carries status in Data field.'
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on
# sequencing requirements beyond the implicit "key lock on in standby blocks IR power-on"
# note in command km (lines 344-346).
```

## Notes
Set ID = 0x00 broadcasts to all connected sets; 0x01-0x63 = monitor 1-99 (decimal menu / hex wire). RS-232 cable lets `ka` (Power) and `mc` (Key) work in standby; USB-to-serial converter does NOT work in standby. During media playback/recording, only `ka` and `mc` are processed — all others return NG. Network IP control requires the user to enable it via Settings (default 3-digit password 828), then connect via telnet to port 9761; sending `quit` closes the session. WOL (Wake-on-LAN) requires the "Mobile TV On" setting + companion mobile app — not directly controllable from a raw IP command in this spec. Many commands marked "(Depending on model)" — feature surface varies across L Series submodels; the docs do not enumerate which submodels support which commands.

<!-- UNRESOLVED: voltage, current, power consumption, and standby power draw not in source. UNRESOLVED: firmware version compatibility ranges. UNRESOLVED: protocol version numbers. UNRESOLVED: full IR key code list has ~50 entries; included as enum in `key` action (RS-232) and `key_action_ip` action (TCP) but consult source lines 7-37 for any subtle regional differences (e.g. 4C ATSC-only). UNRESOLVED: specific L Series submodel numbers (L3200/L3700/L4200) — source does not name these; the control spec applies to the whole L Series with model-dependent feature flags. -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - justaddpower.happyfox.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
retrieved_at: 2026-04-30T12:05:07.146Z
last_checked_at: 2026-06-02T03:24:51.404Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T03:24:51.404Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions matched with source; command tokens, parameter ranges, transport parameters verified; 1:1 bidirectional coverage. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific L Series model numbers (L3200/L3700/L4200/etc.) not named in source; doc covers whole L Series with \"(Depending on model)\" flags."
- "source contains no explicit safety warnings, interlocks, or power-on"
- "voltage, current, power consumption, and standby power draw not in source. UNRESOLVED: firmware version compatibility ranges. UNRESOLVED: protocol version numbers. UNRESOLVED: full IR key code list has ~50 entries; included as enum in `key` action (RS-232) and `key_action_ip` action (TCP) but consult source lines 7-37 for any subtle regional differences (e.g. 4C ATSC-only). UNRESOLVED: specific L Series submodel numbers (L3200/L3700/L4200) — source does not name these; the control spec applies to the whole L Series with model-dependent feature flags."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
