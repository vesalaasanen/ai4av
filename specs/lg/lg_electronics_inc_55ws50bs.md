---
spec_id: admin/lg_electronics-55ws50bs
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG Electronics 55WS50BS Control Spec"
manufacturer: LG
model_family: 55WS50BS
aliases: []
compatible_with:
  manufacturers:
    - LG
    - "LG Electronics"
  models:
    - 55WS50BS
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
  - gscs-b2c.lge.com
  - lg.com
  - manualslib.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - "https://gscs-b2c.lge.com/open/downloadFile?fileId=RAjvXmy2wiuBn8WmvuC6mw"
  - https://www.lg.com/us/support/product/lg-55WS50BS-B.AUS
  - https://www.manualslib.com/manual/2696274/Lg-55ws50bs.html
retrieved_at: 2026-08-09T08:25:57.039Z
last_checked_at: 2026-08-05T08:31:31.678Z
generated_at: 2026-08-05T08:31:31.678Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source is a generic LG commercial-display owner's manual. Some sections (3D, plasma-only ISM, plasma panel light) may not apply to the 55WS50BS specifically; firmware version, exact hardware revision, and supported input counts per device are not stated."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:31:31.678Z
  matched_actions: 59
  action_count: 59
  confidence: medium
  summary: "All 59 spec action units (27 RS-232C + 21 Network IP Control + 4 Feedbacks + 7 Network variants) match the source command catalog verbatim. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# LG Electronics 55WS50BS Control Spec

## Summary
LG 55WS50BS is a 55-inch commercial LCD signage display. This spec covers the external control protocol over RS-232C (serial, 9600 8N1, ASCII) and over TCP/IP telnet on port 9761 (using the "Network IP Control" feature). The protocol exposes commands for power, input selection, picture/sound parameters, channel tuning, key emulation, and 3D mode (where applicable).

<!-- UNRESOLVED: the source is a generic LG commercial-display owner's manual. Some sections (3D, plasma-only ISM, plasma panel light) may not apply to the 55WS50BS specifically; firmware version, exact hardware revision, and supported input counts per device are not stated. -->

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
  port: 9761
auth:
  type: none  # inferred: no auth procedure in source (telnet service has no login)
```

## Traits
```yaml
- powerable       # inferred from power command examples
- routable        # inferred from input select command examples
- queryable       # inferred from query (FF data read) command examples
- levelable       # inferred from volume / picture-level commands
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  command: "ka {data}"
  params:
    - name: data
      type: hex
      description: "00 = Power Off, 01 = Power On. Use FF to query status."

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "kc {data}"
  params:
    - name: data
      type: hex
      description: "01=Normal 4:3, 02=Wide 16:9, 04=Zoom, 05=Zoom2, 06=Set by Program/Original, 07=14:9, 09=Just Scan, 0B=Full Wide, 0C=21:9, 10-1F=Cinema Zoom 1-16"

- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {data}"
  params:
    - name: data
      type: hex
      description: "00=Screen mute off (Picture on) / Video mute off, 01=Screen mute on (Picture off), 10=Video mute on"

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {data}"
  params:
    - name: data
      type: hex
      description: "00=Volume mute on, 01=Volume mute off"

- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {data}"
  params:
    - name: data
      type: hex
      description: "Hex 00-64 (decimal 0-100)"

- id: contrast
  label: Contrast
  kind: action
  command: "kg {data}"
  params:
    - name: data
      type: hex
      description: "Hex 00-64"

- id: brightness
  label: Brightness
  kind: action
  command: "kh {data}"
  params:
    - name: data
      type: hex
      description: "Hex 00-64"

- id: color
  label: Color/Colour
  kind: action
  command: "ki {data}"
  params:
    - name: data
      type: hex
      description: "Hex 00-64"

- id: tint
  label: Tint
  kind: action
  command: "kj {data}"
  params:
    - name: data
      type: hex
      description: "Hex 00-64 (Red 00 to Green 64)"

- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {data}"
  params:
    - name: data
      type: hex
      description: "Hex 00-32"

- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {data}"
  params:
    - name: data
      type: hex
      description: "00=OSD off, 01=OSD on"

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  command: "km {data}"
  params:
    - name: data
      type: hex
      description: "00=Lock off, 01=Lock on"

- id: treble
  label: Treble
  kind: action
  command: "kr {data}"
  params:
    - name: data
      type: hex
      description: "Hex 00-64"

- id: bass
  label: Bass
  kind: action
  command: "ks {data}"
  params:
    - name: data
      type: hex
      description: "Hex 00-64"

- id: balance
  label: Balance
  kind: action
  command: "kt {data}"
  params:
    - name: data
      type: hex
      description: "Hex 00-64"

- id: color_temperature
  label: Color(Colour) Temperature
  kind: action
  command: "xu {data}"
  params:
    - name: data
      type: hex
      description: "Hex 00-64"

- id: ism_method
  label: ISM Method
  kind: action
  command: "jp {data}"
  params:
    - name: data
      type: hex
      description: "Plasma only: 02=Orbiter, 08=Normal, 20=Color(Colour) Wash"

- id: equalizer
  label: Equalizer
  kind: action
  command: "jv {band} {step}"
  params:
    - name: band
      type: hex
      description: "Frequency band selection bits (3-bit MSB); see source band encoding table"
    - name: step
      type: hex
      description: "Step value 0-20 (5-bit LSB)"

- id: energy_saving
  label: Energy Saving
  kind: action
  command: "jq {data}"
  params:
    - name: data
      type: hex
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto/Intelligent sensor, 05=Screen off"

- id: tune_command
  label: Tune Command
  kind: action
  command: "ma {data00} {data01} {data02} {data03} {data04} {data05}"
  params:
    - name: data00
      type: hex
      description: "High byte channel data / physical / don't-care (region dependent)"
    - name: data01
      type: hex
      description: "Low byte channel data / Major channel high (region dependent)"
    - name: data02
      type: hex
      description: "Analog Input Source OR Major channel low (region dependent)"
    - name: data03
      type: hex
      description: "Minor channel high (region dependent)"
    - name: data04
      type: hex
      description: "Minor channel low (region dependent)"
    - name: data05
      type: hex
      description: "Input Source code: 00=ATV, 01=CATV, 02=DTV, 06=CADTV (phy), 22=DTV (no phy), 26=CADTV (no phy), 40=Satellite DTV, 46=CADTV one-part phy/maj, 66=CADTV one-part maj, 07=DTV(BS)"

- id: channel_add_delete
  label: Channel (Programme) Add/Del(Skip)
  kind: action
  command: "mb {data}"
  params:
    - name: data
      type: hex
      description: "00=Del(ATSC/ISDB)/Skip(DVB), 01=Add"

- id: key
  label: Key (IR Remote Code)
  kind: action
  command: "mc {key_code}"
  params:
    - name: key_code
      type: hex
      description: "IR key code from the Key Codes table (00-FF). Example: 08=Power, 09=Mute, 0B=Input, 44=OK/Enter"

- id: backlight_control
  label: Control Backlight / Panel Light
  kind: action
  command: "mg {data}"
  params:
    - name: data
      type: hex
      description: "Hex 00-64. LCD/LED = backlight; Plasma = panel light"

- id: input_select
  label: Input Select (Main)
  kind: action
  command: "xb {data}"
  params:
    - name: data
      type: hex
      description: "00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1, 04=ISDB-CS2, 10=ATV, 11=CATV, 20=AV/AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4"

- id: 3d_mode
  label: 3D
  kind: action
  command: "xt {data00} {data01} {data02} {data03}"
  params:
    - name: data00
      type: hex
      description: "00=3D On, 01=3D Off, 02=3D to 2D, 03=2D to 3D"
    - name: data01
      type: hex
      description: "00=Top&Bottom, 01=Side by Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving"
    - name: data02
      type: hex
      description: "00=Right to Left, 01=Left to Right"
    - name: data03
      type: hex
      description: "3D Depth hex 00-14"

- id: 3d_extended
  label: Extended 3D
  kind: action
  command: "xv {data00} {data01}"
  params:
    - name: data00
      type: hex
      description: "00=3D Picture Correction, 01=3D Depth, 02=3D Viewpoint, 06=3D Color Correction, 07=3D Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre)"
    - name: data01
      type: hex
      description: "Sub-value per data00 (see source 26. Extended 3D table)"

- id: auto_configure
  label: Auto Configure
  kind: action
  command: "ju {data}"
  params:
    - name: data
      type: hex
      description: "01 = run auto configure (RGB/PC mode only)"

- id: power_network
  label: Power (Network IP Control)
  kind: action
  command: "POWER {on|off}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: aspect_ratio_network
  label: Aspect Ratio (Network IP Control)
  kind: action
  command: "ASPECT_RATIO {mode}"
  params:
    - name: mode
      type: enum
      values: [4by3, 16by9, setbyoriginal]

- id: screen_mute_network
  label: Screen Mute (Network IP Control)
  kind: action
  command: "SCREEN_MUTE {mode}"
  params:
    - name: mode
      type: enum
      values: [screenmuteon, videomuteon, allmuteoff]

- id: volume_mute_network
  label: Volume Mute (Network IP Control)
  kind: action
  command: "VOLUME_MUTE {state}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: volume_control_network
  label: Volume Control (Network IP Control)
  kind: action
  command: "VOLUME_CONTROL {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 (decimal)"

- id: contrast_network
  label: Contrast (Network IP Control)
  kind: action
  command: "PICTURE_CONTRAST {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100 (decimal)"

- id: brightness_network
  label: Brightness (Network IP Control)
  kind: action
  command: "PICTURE_BRIGHTNESS {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100 (decimal)"

- id: color_network
  label: Color/Colour (Network IP Control)
  kind: action
  command: "PICTURE_COLOUR {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100 (decimal)"

- id: tint_network
  label: Tint (Network IP Control)
  kind: action
  command: "PICTURE_TINT {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100 (decimal)"

- id: sharpness_network
  label: Sharpness (Network IP Control)
  kind: action
  command: "PICTURE_SHARPNESS {value}"
  params:
    - name: value
      type: integer
      description: "0 to 50 (decimal)"

- id: osd_select_network
  label: OSD Select (Network IP Control)
  kind: action
  command: "OSD_SELECT {state}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: remote_lock_network
  label: Remote Control Lock (Network IP Control)
  kind: action
  command: "REMOTECONTROLER_LOCK {state}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: balance_network
  label: Balance (Network IP Control)
  kind: action
  command: "AUDIO_BALANCE {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100 (decimal)"

- id: color_temperature_network
  label: Color Temperature (Network IP Control)
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100 (decimal)"

- id: equalizer_network
  label: Equalizer (Network IP Control)
  kind: action
  command: "AUDIO_EQUALIZER {band} {step}"
  params:
    - name: band
      type: integer
      description: "1 to 5 (frequency band). Precondition: All Settings > Sound > Sound Mode Settings > Equalizer on"
    - name: step
      type: integer
      description: "0 to 20 (step decimal)"

- id: energy_saving_network
  label: Energy Saving (Network IP Control)
  kind: action
  command: "ENERGY_SAVING {mode}"
  params:
    - name: mode
      type: enum
      values: [screenoff, maximum, medium, minimum, off]

- id: tune_atsc_atv
  label: Tune ATSC/ATV (Network IP Control)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} {source}"
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: source
      type: enum
      values: [antenna, cable]

- id: tune_atsc_dtv_phy
  label: Tune ATSC/DTV (Physical) (Network IP Control)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {channel} {source}"
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: source
      type: enum
      values: [cablemaj]

- id: tune_atsc_dtv_majmin
  label: Tune ATSC/DTV (Major/Minor) (Network IP Control)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} {source}"
  params:
    - name: major
      type: integer
      description: "Major channel number"
    - name: minor
      type: integer
      description: "Minor channel number"
    - name: source
      type: enum
      values: [antennanotphy, cablenotphy]

- id: channel_add_delete_network
  label: Channel Add/Del (Network IP Control)
  kind: action
  command: "CHANNEL_ADD_DELETE {mode}"
  params:
    - name: mode
      type: enum
      values: [add, delete]

- id: key_action_network
  label: Key Action (Network IP Control)
  kind: action
  command: "KEY_ACTION {action}"
  params:
    - name: action
      type: enum
      values: [exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, record, 3d, autoconfig, app, screenbright, number0, number1, number2, number3, number4, number5, number6, number7, number8, number9]

- id: backlight_network
  label: Backlight (Network IP Control)
  kind: action
  command: "PICTURE_BACKLIGHT {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100 (decimal). Precondition: All Settings > Picture > Energy Saving off"

- id: input_select_network
  label: Input Select (Network IP Control)
  kind: action
  command: "INPUT_SELECT {input}"
  params:
    - name: input
      type: enum
      values: [dtv, atv, cadtv, catv, avav1, component1, hdmi1, hdmi2, hdmi3]

- id: 3d_off_network
  label: 3D Off / 3D-to-2D (Network IP Control)
  kind: action
  command: "PICTURE_3D {mode}"
  params:
    - name: mode
      type: enum
      values: [off, 3dto2d]

- id: 3d_2dto3d_network
  label: 3D 2D-to-3D (Network IP Control)
  kind: action
  command: "PICTURE_3D 2dto3d {direction} {depth}"
  params:
    - name: direction
      type: enum
      values: [righttoleft, lefttoright]
    - name: depth
      type: integer
      description: "0 to 20"

- id: 3d_on_network
  label: 3D On (Network IP Control)
  kind: action
  command: "PICTURE_3D on {pattern} {direction} {depth}"
  params:
    - name: pattern
      type: enum
      values: [topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving]
    - name: direction
      type: enum
      values: [righttoleft, lefttoright]
    - name: depth
      type: integer
      description: "0 to 20"

- id: 3d_ext_picturecorrection_network
  label: 3D Picture Correction (Network IP Control)
  kind: action
  command: "PICTURE_3D_EXTENSION picturecorrection {direction}"
  params:
    - name: direction
      type: enum
      values: ["0", "1"]
  notes: "0=Right to Left, 1=Left to Right. Precondition: PICTURE_3D on X X X."

- id: 3d_ext_color_sound_network
  label: 3D Color Correction / Sound (Network IP Control)
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {state}"
  params:
    - name: option
      type: enum
      values: [colorcorrection, sound]
    - name: state
      type: enum
      values: ["0", "1"]
  notes: "0=off, 1=on. Precondition: PICTURE_3D on X X X."

- id: 3d_ext_normal_network
  label: 3D Normal Image View (Network IP Control)
  kind: action
  command: "PICTURE_3D_EXTENSION normal {state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: 3d_ext_depth_viewpoint_network
  label: 3D Depth / Viewpoint (Network IP Control)
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {value}"
  params:
    - name: option
      type: enum
      values: [depth, viewpoint]
    - name: value
      type: integer
      description: "0 to 20"

- id: 3d_ext_genre_network
  label: 3D Mode Genre (Network IP Control)
  kind: action
  command: "PICTURE_3D_EXTENSION genre {value}"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2", "3", "4", "5"]
  notes: "0=Standard, 1=Sport, 2=Cinema, 3=Extreme, 4=Manual, 5=Auto"

- id: quit_network
  label: Quit Network Session
  kind: action
  command: "quit"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  description: "Returned by ka with FF data read; ack carries present status"

- id: ok_ack
  type: enum
  values: [ok]
  description: "OK Acknowledgement: [Command2][ ][Set ID][ ][OK][Data][x]"

- id: ng_ack
  type: enum
  values: [ng]
  description: "Error Acknowledgement: [Command2][ ][Set ID][ ][NG][Data][x]; Data 00 = Illegal Code"

- id: tune_ack
  type: object
  description: "Tune ack echoes [Data00..Data05]; NG ack returns only [Data00]"
```

## Variables
```yaml
# None beyond the parameterized actions above.
```

## Events
```yaml
# None documented.
```

## Macros
```yaml
# None documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: external_control_lock_release
    description: "When main power is off & on (plug-off and plug-in, after 20-30 seconds), external control lock is released."
  - id: standby_lock_behavior
    description: "In standby mode (DC off by off timer or 'ka'/'mc' command), if key lock is on, TV will not turn on by IR or Local Key power-on."
```

## Notes
- The Set ID range is 1–99 on the menu (hex 0x00–0x63). Set ID `0` broadcasts to all connected sets.
- Transmission framing (RS-232C): `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where `Cr` is `0x0D`.
- `FF` data is the read-status variant for every command that supports it.
- USB-to-Serial converter cable only carries commands when the TV is on; with a direct RS-232C cable the `ka` power command also works when the TV is off.
- Network IP Control must be enabled in the on-screen "IP Control Setup" menu (default password `828`). Default telnet port is **9761**. Mobile TV On + WOL app can power on the TV.
- During playback or recording, all commands except Power (`ka`) and Key (`mc`) are rejected (NG).
- The 3D and ISM commands are model-dependent; the 55WS50BS is an LCD signage display so the plasma-only `jp` ISM Method command likely does not apply.

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - gscs-b2c.lge.com
  - lg.com
  - manualslib.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - "https://gscs-b2c.lge.com/open/downloadFile?fileId=RAjvXmy2wiuBn8WmvuC6mw"
  - https://www.lg.com/us/support/product/lg-55WS50BS-B.AUS
  - https://www.manualslib.com/manual/2696274/Lg-55ws50bs.html
retrieved_at: 2026-08-09T08:25:57.039Z
last_checked_at: 2026-08-05T08:31:31.678Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:31:31.678Z
matched_actions: 59
action_count: 59
confidence: medium
summary: "All 59 spec action units (27 RS-232C + 21 Network IP Control + 4 Feedbacks + 7 Network variants) match the source command catalog verbatim. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source is a generic LG commercial-display owner's manual. Some sections (3D, plasma-only ISM, plasma panel light) may not apply to the 55WS50BS specifically; firmware version, exact hardware revision, and supported input counts per device are not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
