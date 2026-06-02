---
spec_id: admin/lg-50up7700pub-smarttv
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 50UP7700PUB Smart TV Control Spec"
manufacturer: LG
model_family: 50UP7700PUB
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50UP7700PUB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T02:48:11.380Z
last_checked_at: 2026-06-02T03:24:44.417Z
generated_at: 2026-06-02T03:24:44.417Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "3D and ISM Method commands target 3D/Plasma variants. The 50UP7700PUB is LCD/LED — these commands may be model-gated and return NG on this set. Source does not state 3D/ISM applicability for this SKU."
  - "source states 9600 8N1 ASCII; flow control not specified"
  - "source does not describe unsolicited notifications. The TV only"
  - "source does not document safety warnings, interlocks, or"
  - "firmware version compatibility not stated in source"
  - "3D / ISM applicability to the 50UP7700PUB SKU not stated in source"
  - "flow control (RTS/CTS, XON/XOFF, none) for RS-232 not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T03:24:44.417Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 60 spec actions matched literally; transport parameters confirmed verbatim in source; full command coverage achieved. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 50UP7700PUB Smart TV Control Spec

## Summary
LG 50UP7700PUB Smart TV. Two control paths: RS-232 (serial, 9600 8N1 ASCII via DE9 / phone jack / PL2303 USB-to-Serial) and TCP/IP (telnet on port 9761 with default 3-digit password 828). Command set covers power, picture, sound, channel, input, 3D, and IR-key emulation.

<!-- UNRESOLVED: 3D and ISM Method commands target 3D/Plasma variants. The 50UP7700PUB is LCD/LED — these commands may be model-gated and return NG on this set. Source does not state 3D/ISM applicability for this SKU. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9761
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states 9600 8N1 ASCII; flow control not specified
auth:
  type: password
  # TCP/IP control: default 3-digit password 828 (changeable via IP Control Setup > Password Change). RS-232 path: no auth.
```

## Traits
```yaml
- powerable       # inferred from power command examples
- routable        # inferred from input select / channel tune command examples
- queryable       # inferred from FF-data read pattern returning present status
- levelable       # inferred from volume / picture / sound level commands
```

## Actions
```yaml
# =========================================================================
# RS-232 path. Frame: [CMD1][CMD2][ ][SetID][ ][Data][Cr] (Cr = 0x0D)
# SetID: 1-99 (0 = broadcast). DATA: hex. Read with FF.
# ACK: [CMD2][ ][SetID][ ][OK][Data][x]   NAK: [CMD2][ ][SetID][ ][NG][Data][x]
# =========================================================================
- id: power_set
  label: Power (Set)
  kind: action
  command: "ka {data}"        # data: 00=Off, 01=On
  params:
    - name: data
      type: integer
      description: 00 = Power Off, 01 = Power On (hex)
- id: power_query
  label: Power Status Query
  kind: query
  command: "ka FF"            # read present power state
  params: []
- id: aspect_ratio_set
  label: Aspect Ratio
  kind: action
  command: "kc {data}"        # data: 01=Normal, 02=16:9, 04=Zoom, 05=Zoom2, 06=Set by Program/Original, 07=14:9 (region), 09=Just Scan, 0B=Full Wide (region), 0C=21:9 (model), 10-1F=Cinema Zoom 1-16
  params:
    - name: data
      type: string
      description: Aspect code (hex); 10-1F = Cinema Zoom 1-16
- id: screen_mute_set
  label: Screen Mute
  kind: action
  command: "kd {data}"        # data: 00=Screen Mute Off (Video Mute Off), 01=Screen Mute On, 10=Video Mute On
  params:
    - name: data
      type: string
      description: 00/01/10 (hex)
- id: volume_mute_set
  label: Volume Mute
  kind: action
  command: "ke {data}"        # data: 00=Volume Mute On, 01=Volume Mute Off
  params:
    - name: data
      type: string
      description: 00 or 01 (hex)
- id: volume_control_set
  label: Volume Control
  kind: action
  command: "kf {data}"        # data: 00-64 (hex) = 0-100 steps
  params:
    - name: data
      type: string
      description: 00-64 (hex); FF to read current
- id: contrast_set
  label: Contrast
  kind: action
  command: "kg {data}"        # data: 00-64 (hex)
  params:
    - name: data
      type: string
      description: 00-64 (hex)
- id: brightness_set
  label: Brightness
  kind: action
  command: "kh {data}"        # data: 00-64 (hex)
  params:
    - name: data
      type: string
      description: 00-64 (hex)
- id: color_set
  label: Color/Colour
  kind: action
  command: "ki {data}"        # data: 00-64 (hex)
  params:
    - name: data
      type: string
      description: 00-64 (hex)
- id: tint_set
  label: Tint
  kind: action
  command: "kj {data}"        # data: 00=Red ... 64=Green (hex)
  params:
    - name: data
      type: string
      description: 00-64 (hex)
- id: sharpness_set
  label: Sharpness
  kind: action
  command: "kk {data}"        # data: 00-32 (hex)
  params:
    - name: data
      type: string
      description: 00-32 (hex)
- id: osd_select_set
  label: OSD Select
  kind: action
  command: "kl {data}"        # data: 00=OSD off, 01=OSD on
  params:
    - name: data
      type: string
      description: 00 or 01 (hex)
- id: remote_control_lock_set
  label: Remote Control Lock
  kind: action
  command: "km {data}"        # data: 00=Lock off, 01=Lock on
  params:
    - name: data
      type: string
      description: 00 or 01 (hex)
- id: treble_set
  label: Treble
  kind: action
  command: "kr {data}"        # data: 00-64 (hex)
  params:
    - name: data
      type: string
      description: 00-64 (hex)
- id: bass_set
  label: Bass
  kind: action
  command: "ks {data}"        # data: 00-64 (hex)
  params:
    - name: data
      type: string
      description: 00-64 (hex)
- id: balance_set
  label: Balance
  kind: action
  command: "kt {data}"        # data: 00-64 (hex)
  params:
    - name: data
      type: string
      description: 00-64 (hex)
- id: color_temperature_set
  label: Color Temperature
  kind: action
  command: "xu {data}"        # data: 00-64 (hex)
  params:
    - name: data
      type: string
      description: 00-64 (hex)
- id: ism_method_set
  label: ISM Method
  kind: action
  command: "jp {data}"        # data: 02=Orbiter, 08=Normal, 20=Color Wash. Plasma TVs only.
  params:
    - name: data
      type: string
      description: 02, 08, or 20 (hex)
- id: equalizer_set
  label: Equalizer
  kind: action
  command: "jv {data}"        # data: 9-bit value; bits 7-5 = frequency band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th), bits 4-0 = step (0-20)
  params:
    - name: data
      type: string
      description: 9-bit hex; band 0-4, step 0-20
- id: energy_saving_set
  label: Energy Saving
  kind: action
  command: "jq {data}"        # data: 00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto/Intelligent Sensor, 05=Screen Off
  params:
    - name: data
      type: string
      description: 00-05 (hex)
- id: tune_command_set
  label: Tune Command
  kind: action
  command: "ma {data00} {data01} {data02}"  # region-dependent; see Notes
  params:
    - name: data00
      type: string
      description: High byte channel data (hex)
    - name: data01
      type: string
      description: Low byte channel data (hex)
    - name: data02
      type: string
      description: Input source (00=ATV, 80=CATV analog, 10=DTV, 40=SDTV satellite, etc.; region-dependent)
- id: channel_add_del_set
  label: Channel Add/Del (Skip)
  kind: action
  command: "mb {data}"        # data: 00=Del/Skip, 01=Add
  params:
    - name: data
      type: string
      description: 00 or 01 (hex)
- id: key_send
  label: IR Key Code Send
  kind: action
  command: "mc {keycode}"     # keycode: see Key Codes table (e.g. 08=Power, 09=Mute, 44=OK, 4D=PICTURE, 52=SOUND, ...)
  params:
    - name: keycode
      type: string
      description: Two-digit hex key code from Key Codes table
- id: backlight_set
  label: Control Backlight / Panel Light
  kind: action
  command: "mg {data}"        # data: 00-64 (hex)
  params:
    - name: data
      type: string
      description: 00-64 (hex)
- id: input_select_set
  label: Input Select (Main)
  kind: action
  command: "xb {data}"        # data: 00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1, 04=ISDB-CS2, 10=ATV, 11=CATV, 20=AV/AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4
  params:
    - name: data
      type: string
      description: Input source code (hex)
- id: threed_set
  label: 3D Mode
  kind: action
  command: "xt {d0} {d1} {d2} {d3}"  # 3D models only; d0=00(3D On)/01(3D Off)/02(3D->2D)/03(2D->3D); d1=3D pattern; d2=LR; d3=depth 0-14
  params:
    - name: d0
      type: string
      description: 3D mode (hex)
    - name: d1
      type: string
      description: 3D pattern 00-05
    - name: d2
      type: string
      description: 00=Right-to-Left, 01=Left-to-Right
    - name: d3
      type: string
      description: 3D depth 00-14 (hex)
- id: extended_3d_set
  label: Extended 3D Option
  kind: action
  command: "xv {d0} {d1}"    # 3D models only; d0=00=Picture Correction, 01=Depth, 02=Viewpoint, 06=Color Correction, 07=Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre); d1 = option-specific range
  params:
    - name: d0
      type: string
      description: 3D option code (hex)
    - name: d1
      type: string
      description: Option value (hex); range depends on d0
- id: auto_configure_set
  label: Auto Configure
  kind: action
  command: "ju 01"            # RGB/PC input only
  params: []

# =========================================================================
# Network IP control (TCP/Telnet, port 9761, default password 828).
# ASCII text command + space-separated args, terminated by CR. OK / NG reply.
# Exit: "quit". WOL supported via Mobile TV On + companion app.
# =========================================================================
- id: power_off_ip
  label: Power Off (IP)
  kind: action
  command: "POWER off"
  params: []
- id: aspect_ratio_ip
  label: Aspect Ratio (IP)
  kind: action
  command: "ASPECT_RATIO {mode}"   # mode: 4by3 / 16by9 / setbyoriginal
  params:
    - name: mode
      type: string
      description: 4by3, 16by9, or setbyoriginal
- id: screen_mute_ip
  label: Screen Mute (IP)
  kind: action
  command: "SCREEN_MUTE {mode}"    # mode: screenmuteon / videomuteon / allmuteoff
  params:
    - name: mode
      type: string
      description: screenmuteon, videomuteon, or allmuteoff
- id: volume_mute_ip
  label: Volume Mute (IP)
  kind: action
  command: "VOLUME_MUTE {state}"   # state: on / off
  params:
    - name: state
      type: string
      description: on or off
- id: volume_control_ip
  label: Volume Control (IP)
  kind: action
  command: "VOLUME_CONTROL {level}"  # level: 0-100 (decimal)
  params:
    - name: level
      type: integer
      description: Volume 0-100 (decimal)
- id: picture_contrast_ip
  label: Picture Contrast (IP)
  kind: action
  command: "PICTURE_CONTRAST {value}"  # value: 0-100 (decimal)
  params:
    - name: value
      type: integer
      description: Contrast 0-100 (decimal)
- id: picture_brightness_ip
  label: Picture Brightness (IP)
  kind: action
  command: "PICTURE_BRIGHTNESS {value}"  # value: 0-100 (decimal)
  params:
    - name: value
      type: integer
      description: Brightness 0-100 (decimal)
- id: picture_colour_ip
  label: Picture Colour (IP)
  kind: action
  command: "PICTURE_COLOUR {value}"     # value: 0-100 (decimal)
  params:
    - name: value
      type: integer
      description: Colour 0-100 (decimal)
- id: picture_tint_ip
  label: Picture Tint (IP)
  kind: action
  command: "PICTURE_TINT {value}"       # value: 0-100 (decimal)
  params:
    - name: value
      type: integer
      description: Tint 0-100 (decimal)
- id: picture_sharpness_ip
  label: Picture Sharpness (IP)
  kind: action
  command: "PICTURE_SHARPNESS {value}"  # value: 0-50 (decimal)
  params:
    - name: value
      type: integer
      description: Sharpness 0-50 (decimal)
- id: osd_select_ip
  label: OSD Select (IP)
  kind: action
  command: "OSD_SELECT {state}"        # state: on / off
  params:
    - name: state
      type: string
      description: on or off
- id: remote_lock_ip
  label: Remote Controller Lock (IP)
  kind: action
  command: "REMOTECONTROLER_LOCK {state}"  # state: on / off
  params:
    - name: state
      type: string
      description: on or off
- id: audio_balance_ip
  label: Audio Balance (IP)
  kind: action
  command: "AUDIO_BALANCE {value}"     # value: 0-100 (decimal)
  params:
    - name: value
      type: integer
      description: Balance 0-100 (decimal)
- id: picture_colour_temperature_ip
  label: Picture Colour Temperature (IP)
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {value}"  # value: 0-100 (decimal)
  params:
    - name: value
      type: integer
      description: Colour temperature 0-100 (decimal)
- id: audio_equalizer_ip
  label: Audio Equalizer (IP)
  kind: action
  command: "AUDIO_EQUALIZER {band} {step}"  # band: 1-5, step: 0-20 (decimal)
  params:
    - name: band
      type: integer
      description: Frequency band 1-5
    - name: step
      type: integer
      description: Step 0-20 (decimal)
- id: energy_saving_ip
  label: Energy Saving (IP)
  kind: action
  command: "ENERGY_SAVING {mode}"      # mode: screenoff / maximum / medium / minimum / off
  params:
    - name: mode
      type: string
      description: screenoff, maximum, medium, minimum, or off
- id: channel_setting_atsc_atv_ip
  label: Channel Setting ATSC/ATV (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} {source}"  # source: antenna / cable
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: source
      type: string
      description: antenna or cable
- id: channel_setting_atsc_dtv_ip
  label: Channel Setting ATSC/DTV (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} {source}"  # source: antennanotphy / cablenotphy
  params:
    - name: major
      type: integer
      description: Major channel number
    - name: minor
      type: integer
      description: Minor channel number
    - name: source
      type: string
      description: antennanotphy or cablenotphy
- id: channel_add_delete_ip
  label: Channel Add/Delete (IP)
  kind: action
  command: "CHANNEL_ADD_DELETE {state}"  # state: add / delete
  params:
    - name: state
      type: string
      description: add or delete
- id: key_action_ip
  label: Key Action (IP)
  kind: action
  command: "KEY_ACTION {key}"   # key: exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, record, 3d, autoconfig, app, screenbright, number0-number9
  params:
    - name: key
      type: string
      description: Key name from the documented KEY_ACTION set
- id: picture_backlight_ip
  label: Picture Backlight (IP)
  kind: action
  command: "PICTURE_BACKLIGHT {value}"  # value: 0-100 (decimal); precondition: Energy Saving off
  params:
    - name: value
      type: integer
      description: Backlight 0-100 (decimal)
- id: input_select_ip
  label: Input Select (IP)
  kind: action
  command: "INPUT_SELECT {input}"   # input: dtv / atv / cadtv / catv / avav1 / component1 / hdmi1 / hdmi2 / hdmi3
  params:
    - name: input
      type: string
      description: dtv, atv, cadtv, catv, avav1, component1, hdmi1, hdmi2, or hdmi3
- id: picture_3d_off_ip
  label: 3D Off (IP)
  kind: action
  command: "PICTURE_3D off"
  params: []
- id: picture_3d_3dto2d_ip
  label: 3D to 2D (IP)
  kind: action
  command: "PICTURE_3D 3dto2d"
  params: []
- id: picture_3d_2dto3d_ip
  label: 2D to 3D (IP)
  kind: action
  command: "PICTURE_3D 2dto3d {direction} {depth}"  # direction: righttoleft / lefttoright; depth: 0-20
  params:
    - name: direction
      type: string
      description: righttoleft or lefttoright
    - name: depth
      type: integer
      description: Depth 0-20
- id: picture_3d_on_ip
  label: 3D On (IP)
  kind: action
  command: "PICTURE_3D on {pattern} {direction} {depth}"  # pattern: topandbottom / sidebyside / checkboard / framesequential / columninterleaving / rowinterleaving; direction: righttoleft / lefttoright; depth: 0-20
  params:
    - name: pattern
      type: string
      description: 3D pattern name
    - name: direction
      type: string
      description: righttoleft or lefttoright
    - name: depth
      type: integer
      description: Depth 0-20
- id: picture_3d_extension_picture_correction_ip
  label: 3D Extension: Picture Correction (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION picturecorrection {value}"  # 0=Right to Left, 1=Left to Right
  params:
    - name: value
      type: string
      description: 0 or 1
- id: picture_3d_extension_color_sound_ip
  label: 3D Extension: Color Correction / Sound (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {value}"  # option: colorcorrection / sound; 0=off, 1=on
  params:
    - name: option
      type: string
      description: colorcorrection or sound
    - name: value
      type: string
      description: 0 or 1
- id: picture_3d_extension_normal_ip
  label: 3D Extension: Normal Image View (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION normal {value}"  # 0=off, 1=on
  params:
    - name: value
      type: string
      description: 0 or 1
- id: picture_3d_extension_depth_viewpoint_ip
  label: 3D Extension: Depth / Viewpoint (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {value}"  # option: depth / viewpoint; value: 0-20
  params:
    - name: option
      type: string
      description: depth or viewpoint
    - name: value
      type: integer
      description: 0-20
- id: picture_3d_extension_genre_ip
  label: 3D Extension: Genre (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION genre {value}"  # 0=Standard, 1=Sport, 2=Cinema, 3=Extreme, 4=Manual, 5=Auto
  params:
    - name: value
      type: string
      description: 0-5
- id: quit_ip
  label: Quit IP Session
  kind: action
  command: "quit"
  params: []
```

## Feedbacks
```yaml
# RS-232 OK ACK: [CMD2][ ][SetID][ ][OK][Data][x]
# RS-232 NG ACK: [CMD2][ ][SetID][ ][NG][Data][x]  (NG data 00 = illegal code)
# IP control reply: "OK" or "NG" (line per command).
- id: rs232_ack
  type: string
  description: "[CMD2][ ][SetID][ ][OK][Data][x] - normal acknowledgement; for FF reads, Data is present state"
- id: rs232_nak
  type: string
  description: "[CMD2][ ][SetID][ ][NG][Data][x] - abnormal / illegal code (Data 00)"
- id: ip_ok
  type: string
  description: "\"OK\" - IP control command accepted"
- id: ip_ng
  type: string
  description: "\"NG\" - IP control command rejected"
- id: power_state
  type: enum
  values: [on, off]
- id: volume_mute_state
  type: enum
  values: [on, off]
- id: screen_mute_state
  type: enum
  values: [screen_mute_off, screen_mute_on, video_mute_on]
- id: input_source
  type: string
  description: Current main input (code from xb table)
- id: energy_saving_state
  type: enum
  values: [off, minimum, medium, maximum, auto, screen_off]
```

## Variables
```yaml
# Settable picture/sound level parameters exposed as commands above.
# Documented as discrete actions because the source lists them as separate rows.
- id: backlight_level
  type: integer
  range: 0-100
  description: Backlight value 0-100; precondition for IP path: Energy Saving off
- id: backlight_hex_level
  type: integer
  range: 0-64
  description: RS-232 mg data 0x00-0x64
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications. The TV only
# responds to polled commands with OK/NG. No event stream documented.
```

## Macros
```yaml
# Enable IP control on TV (operator-driven, not a device command):
# 1. Press and hold Settings 5 s on Live TV; enter 828 + OK to open IP Control Setup.
# 2. Set Network IP Control = On (reboot TV).
# 3. Telnet to <TV_IP> 9761, enter password 828.
# 4. Issue "quit" to close session.
- id: enable_ip_control
  label: Enable Network IP Control
  steps:
    - "Hold Settings on remote 5 s on Live TV screen"
    - "Enter 828, press OK to open IP Control Setup menu"
    - "Set Network IP Control = On; confirm TV reboot"
    - "Set/change 3-digit password via Password Change"
    - "Telnet to TV IP, port 9761; authenticate with password"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or
# power-on sequencing requirements for the 50UP7700PUB. No relevant text found.
```

## Notes
- Connection interface differs by model (DE9 D-Sub 9, phone jack, or USB-to-Serial). LG supports PL2303 chip USB-to-Serial (VID 0x0557, PID 0x2008). Cable not supplied.
- Use crossed (reverse) cable for RS-232. 3-wire configuration (RXD/TXD/GND) noted but described as "Not standard".
- During playback or recording of media, all commands except `ka` (Power) and `mc` (Key) return NG. With RS-232C cable the `ka` command works in both power-on and power-off states; with USB-to-Serial it works only when TV is on.
- Set ID 1-99 (0 = broadcast). On the TV menu, Set ID is shown decimal; on the wire it is encoded as hex (0x00-0x63).
- IP control is documented for USA only. Enable via Settings (held 5 s on Live TV) → 828 → OK → IP Control Setup → Network IP Control = On (triggers reboot). Default 3-digit password is 828. Telnet port 9761.
- IP control session reply: command accepted → `OK`; rejected → `NG`. Newline: send CR (`\r`) to terminate each command. Exit with `quit`.
- WOL power-on supported when "Mobile TV On" = On and companion app is installed (iOS / Google Play).
- Tune Command (ma) is region-dependent. EU/Mid-East/Colombia/Asia (ex KR/JP): ma + SetID + 00 + 2-byte channel + 1-byte source. NA/LatAm (ex Colombia): ma + 0 + 7 data bytes (physical, major hi/lo, minor hi/lo, source). Japan: physical/major/minor with Data 05 source for DTV/BS/CS1/CS2.
- 3D (`xt`/`xv`, `PICTURE_3D*`) and ISM Method (`jp`) are documented for 3D/Plasma models. The 50UP7700PUB is LCD/LED — these may be model-gated and return NG.
- Some RS-232 ACK opcodes differ from the command opcode (documented quirk): Tint ack = `r` (not `j`); Color Temperature ack = `l` (not `u`); Treble ack = `u` (not `r`). Preserve as written.
- Real data mapping (hex → decimal) applies to Set ID and channel numbers; see source p.6.
- <!-- UNRESOLVED: firmware version compatibility not stated in source -->
- <!-- UNRESOLVED: 3D / ISM applicability to the 50UP7700PUB SKU not stated in source -->
- <!-- UNRESOLVED: flow control (RTS/CTS, XON/XOFF, none) for RS-232 not stated in source -->
```

## Provenance

```yaml
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T02:48:11.380Z
last_checked_at: 2026-06-02T03:24:44.417Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T03:24:44.417Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 60 spec actions matched literally; transport parameters confirmed verbatim in source; full command coverage achieved. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "3D and ISM Method commands target 3D/Plasma variants. The 50UP7700PUB is LCD/LED — these commands may be model-gated and return NG on this set. Source does not state 3D/ISM applicability for this SKU."
- "source states 9600 8N1 ASCII; flow control not specified"
- "source does not describe unsolicited notifications. The TV only"
- "source does not document safety warnings, interlocks, or"
- "firmware version compatibility not stated in source"
- "3D / ISM applicability to the 50UP7700PUB SKU not stated in source"
- "flow control (RTS/CTS, XON/XOFF, none) for RS-232 not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
