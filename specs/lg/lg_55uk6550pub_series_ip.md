---
spec_id: admin/lg-55uk6550pub-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55UK6550PUB Series Control Spec"
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
  - proaudioinc.com
  - justaddpower.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
retrieved_at: 2026-06-02T17:23:06.492Z
last_checked_at: 2026-06-02T17:23:06.492Z
generated_at: 2026-06-02T17:23:06.492Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "3D / ISM / Extended 3D applicability not confirmed for 55UK6550PUB specifically — source marks them \"depending on model\"."
  - "firmware version compatibility not stated. UNRESOLVED: WOL magic packet format not in source. UNRESOLVED: 3D / Extended 3D / ISM applicability to 55UK6550PUB not confirmed."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:06.492Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 RS-232 spec actions matched verbatim in source; transport parameters verified; 27 distinct wire-token commands fully represented. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 55UK6550PUB Series Control Spec

## Summary
LG commercial TV control spec. Two transport modes: RS-232 (DE9 or phone-jack, 9600 8N1 ASCII, crossed cable) and Network IP control (telnet port 9761, USA only, requires password 828 to enable). Same logical commands exposed on both transports; serial uses hex opcodes with Set ID framing, network uses text mnemonics.

<!-- UNRESOLVED: 3D / ISM / Extended 3D applicability not confirmed for 55UK6550PUB specifically — source marks them "depending on model". -->

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
  type: password  # network IP control requires password 828 (default, changeable); serial has no auth
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions

### RS-232 (serial, hex opcodes)
Frame: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Set ID is 0x00–0x63 (0 = all sets). Cr = 0x0D, space = 0x20. Ack: `[Command2][ ][Set ID][ ][OK/NG][Data][x]`.

```yaml
- id: power_set
  label: Power On/Off
  kind: action
  command: "ka {data}"
  params:
    - name: data
      type: hex
      description: "00 = Power Off, 01 = Power On"
- id: power_query
  label: Power Status Query
  kind: query
  command: "ka FF"
  params: []
- id: aspect_ratio_set
  label: Aspect Ratio
  kind: action
  command: "kc {data}"
  params:
    - name: data
      type: hex
      description: "01=Normal, 02=16:9, 04=Zoom, 05=Zoom2, 06=Set by Program, 07=14:9, 09=Just Scan, 0B=Full Wide, 0C=21:9, 10-1F=Cinema Zoom 1-16"
- id: screen_mute_set
  label: Screen Mute
  kind: action
  command: "kd {data}"
  params:
    - name: data
      type: hex
      description: "00=Screen mute off, 01=Screen mute on, 10=Video mute on"
- id: volume_mute_set
  label: Volume Mute
  kind: action
  command: "ke {data}"
  params:
    - name: data
      type: hex
      description: "00=Mute on, 01=Mute off"
- id: volume_control_set
  label: Volume Control
  kind: action
  command: "kf {data}"
  params:
    - name: data
      type: hex
      description: "00-64"
- id: contrast_set
  label: Contrast
  kind: action
  command: "kg {data}"
  params:
    - name: data
      type: hex
      description: "00-64"
- id: brightness_set
  label: Brightness
  kind: action
  command: "kh {data}"
  params:
    - name: data
      type: hex
      description: "00-64"
- id: color_set
  label: Color/Colour
  kind: action
  command: "ki {data}"
  params:
    - name: data
      type: hex
      description: "00-64"
- id: tint_set
  label: Tint
  kind: action
  command: "kj {data}"
  params:
    - name: data
      type: hex
      description: "00=Red, 64=Green"
- id: sharpness_set
  label: Sharpness
  kind: action
  command: "kk {data}"
  params:
    - name: data
      type: hex
      description: "00-32"
- id: osd_select_set
  label: OSD Select
  kind: action
  command: "kl {data}"
  params:
    - name: data
      type: hex
      description: "00=OSD off, 01=OSD on"
- id: remote_control_lock_set
  label: Remote Control Lock Mode
  kind: action
  command: "km {data}"
  params:
    - name: data
      type: hex
      description: "00=Lock off, 01=Lock on"
- id: treble_set
  label: Treble
  kind: action
  command: "kr {data}"
  params:
    - name: data
      type: hex
      description: "00-64"
- id: bass_set
  label: Bass
  kind: action
  command: "ks {data}"
  params:
    - name: data
      type: hex
      description: "00-64"
- id: balance_set
  label: Balance
  kind: action
  command: "kt {data}"
  params:
    - name: data
      type: hex
      description: "00-64"
- id: color_temperature_set
  label: Color Temperature
  kind: action
  command: "xu {data}"
  params:
    - name: data
      type: hex
      description: "00-64"
- id: ism_method_set
  label: ISM Method (Plasma only)
  kind: action
  command: "jp {data}"
  params:
    - name: data
      type: hex
      description: "02=Orbiter, 08=Normal, 20=Color Wash"
- id: equalizer_set
  label: Equalizer
  kind: action
  command: "jv {data}"
  params:
    - name: data
      type: hex
      description: "5-bit band select (000-100 = bands 1-5) + 5-bit step (00-14). E.g. band 1 step 0 = 00, band 4 step 19 = 67, band 5 step 20 = A5."
- id: energy_saving_set
  label: Energy Saving
  kind: action
  command: "jq {data}"
  params:
    - name: data
      type: hex
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto, 05=Screen off"
- id: tune_command_analog
  label: Tune Command (Analog Antenna/Cable)
  kind: action
  command: "ma {set_id} {data00} {data01} {data02}"
  params:
    - name: set_id
      type: hex
      description: "Use 00 for these extended-tune transmissions"
    - name: data00
      type: hex
      description: "High byte channel data"
    - name: data01
      type: hex
      description: "Low byte channel data (00 00 - 00 C7 for analog)"
    - name: data02
      type: hex
      description: "Input source: 00=Antenna TV (ATV), 80=Cable TV (CATV)"
- id: tune_command_extended
  label: Tune Command (Digital/Extended)
  kind: action
  command: "ma 0 {data00} {data01} {data02} {data03} {data04} {data05}"
  params:
    - name: data00
      type: hex
      description: "Physical channel number or don't-care"
    - name: data01
      type: hex
      description: "Major channel high byte"
    - name: data02
      type: hex
      description: "Major channel low byte (00 01 - 27 0F)"
    - name: data03
      type: hex
      description: "Minor channel high byte"
    - name: data04
      type: hex
      description: "Minor channel low byte"
    - name: data05
      type: hex
      description: "Input source (region-specific: 02/22=Antenna DTV, 06/26/46/66=Cable DTV, 07=BS, 08=CS1, 09=CS2 Japan)"
- id: channel_add_del_set
  label: Channel Add/Del(Skip)
  kind: action
  command: "mb {data}"
  params:
    - name: data
      type: hex
      description: "00=Del/Skip, 01=Add"
- id: key_send
  label: Send IR Key Code
  kind: action
  command: "mc {key_code}"
  params:
    - name: key_code
      type: hex
      description: "Two-char hex key code from p.2 (e.g. 08=Power, 09=Mute, 44=OK)"
- id: backlight_set
  label: Control Backlight / Panel Light
  kind: action
  command: "mg {data}"
  params:
    - name: data
      type: hex
      description: "00-64"
- id: input_select_set
  label: Input Select (Main)
  kind: action
  command: "xb {data}"
  params:
    - name: data
      type: hex
      description: "00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1, 04=ISDB-CS2, 10=ATV, 11=CATV, 20=AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4"
- id: d3_set
  label: 3D (3D models only)
  kind: action
  command: "xt {data00} {data01} {data02} {data03}"
  params:
    - name: data00
      type: hex
      description: "00=3D On, 01=3D Off, 02=3D to 2D, 03=2D to 3D"
    - name: data01
      type: hex
      description: "00=Top/Bottom, 01=Side by Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving"
    - name: data02
      type: hex
      description: "00=Right to Left, 01=Left to Right (Plasma only)"
    - name: data03
      type: hex
      description: "3D Depth: 00-14 hex"
- id: d3_extended_set
  label: Extended 3D (3D models only)
  kind: action
  command: "xv {data00} {data01}"
  params:
    - name: data00
      type: hex
      description: "00=Picture Correction, 01=3D Depth, 02=3D Viewpoint, 06=3D Color Correction, 07=3D Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre)"
    - name: data01
      type: hex
      description: "Range depends on data00 (00-14 for depth/viewpoint, 00-01 for on/off, 00-05 for genre)"
- id: auto_configure_set
  label: Auto Configure (RGB/PC mode)
  kind: action
  command: "ju 01"
  params: []
```

### Network IP Control (telnet, text commands)
Connect to `<tv-ip>:9761` (USA only). Enable via Settings menu with code 828. Send text commands + Enter; response is `OK` or `NG`. Exit with `quit`.

```yaml
- id: net_power
  label: Power Off
  kind: action
  command: "POWER off"
  params: []
- id: net_aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "ASPECT_RATIO {value}"
  params:
    - name: value
      type: string
      description: "4by3 | 16by9 | setbyoriginal"
- id: net_screen_mute
  label: Screen Mute
  kind: action
  command: "SCREEN_MUTE {value}"
  params:
    - name: value
      type: string
      description: "screenmuteon | videomuteon | allmuteoff"
- id: net_volume_mute
  label: Volume Mute
  kind: action
  command: "VOLUME_MUTE {value}"
  params:
    - name: value
      type: string
      description: "on | off"
- id: net_volume_control
  label: Volume Control
  kind: action
  command: "VOLUME_CONTROL {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: net_contrast
  label: Contrast
  kind: action
  command: "PICTURE_CONTRAST {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: net_brightness
  label: Brightness
  kind: action
  command: "PICTURE_BRIGHTNESS {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: net_color
  label: Color/Colour
  kind: action
  command: "PICTURE_COLOUR {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: net_tint
  label: Tint
  kind: action
  command: "PICTURE_TINT {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: net_sharpness
  label: Sharpness
  kind: action
  command: "PICTURE_SHARPNESS {level}"
  params:
    - name: level
      type: integer
      description: "0-50 decimal"
- id: net_osd_select
  label: OSD Select
  kind: action
  command: "OSD_SELECT {value}"
  params:
    - name: value
      type: string
      description: "on | off"
- id: net_remote_lock
  label: Remote Control Lock
  kind: action
  command: "REMOTECONTROLER_LOCK {value}"
  params:
    - name: value
      type: string
      description: "on | off"
- id: net_balance
  label: Balance
  kind: action
  command: "AUDIO_BALANCE {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: net_color_temperature
  label: Color Temperature
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"
- id: net_equalizer
  label: Equalizer
  kind: action
  command: "AUDIO_EQUALIZER {band} {step}"
  params:
    - name: band
      type: integer
      description: "1-5 frequency band"
    - name: step
      type: integer
      description: "0-20 step decimal"
- id: net_energy_saving
  label: Energy Saving
  kind: action
  command: "ENERGY_SAVING {value}"
  params:
    - name: value
      type: string
      description: "screenoff | maximum | medium | minimum | off"
- id: net_channel_setting_atsc_atv_antenna
  label: Channel Setting (ATSC/ATV antenna)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} antenna"
  params:
    - name: channel
      type: integer
      description: "Channel number"
- id: net_channel_setting_atsc_atv_cable
  label: Channel Setting (ATSC/ATV cable)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} cable"
  params:
    - name: channel
      type: integer
      description: "Channel number"
- id: net_channel_setting_atsc_dtv_cablenotphy
  label: Channel Setting (ATSC DTV cable, no physical)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {channel} cablenotphy"
  params:
    - name: channel
      type: integer
      description: "Channel number"
- id: net_channel_setting_atsc_dtv_antenna_maj_min
  label: Channel Setting (ATSC DTV antenna major/minor)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} antennanotphy"
  params:
    - name: major
      type: integer
      description: "Major channel number"
    - name: minor
      type: integer
      description: "Minor channel number"
- id: net_channel_setting_atsc_dtv_cable_maj_min
  label: Channel Setting (ATSC DTV cable major/minor)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} cablenotphy"
  params:
    - name: major
      type: integer
      description: "Major channel number"
    - name: minor
      type: integer
      description: "Minor channel number"
- id: net_channel_add_delete
  label: Channel Add/Delete
  kind: action
  command: "CHANNEL_ADD_DELETE {value}"
  params:
    - name: value
      type: string
      description: "add | delete"
- id: net_key_action
  label: Send Key Action
  kind: action
  command: "KEY_ACTION {key_name}"
  params:
    - name: key_name
      type: string
      description: "exit | channelup | channeldown | volumeup | volumedown | arrowright | arrowleft | volumemute | deviceinput | sleepreserve | livetv | previouschannel | favoritechannel | teletext | teletextoption | returnback | avmode | captionsubtitle | arrowup | arrowdown | myapp | settingmenu | ok | quickmenu | videomode | audiomode | channellist | bluebutton | yellowbutton | greenbutton | redbutton | aspectratio | audiodescription | programmorder | userguide | smarthome | simplelink | fastforward | rewind | programminfo | programguide | play | slowplay | soccerscreen | record | 3d | autoconfig | app | screenbright | number0 .. number9"
- id: net_backlight
  label: Control Backlight
  kind: action
  command: "PICTURE_BACKLIGHT {level}"
  params:
    - name: level
      type: integer
      description: "0-100 decimal (precondition: Energy Saving off)"
- id: net_input_select
  label: Input Select
  kind: action
  command: "INPUT_SELECT {value}"
  params:
    - name: value
      type: string
      description: "dtv | atv | cadtv | catv | avav1 | component1 | hdmi1 | hdmi2 | hdmi3"
- id: net_picture_3d_off
  label: 3D Off / 3D-to-2D
  kind: action
  command: "PICTURE_3D {value}"
  params:
    - name: value
      type: string
      description: "off | 3dto2d"
- id: net_picture_3d_2dto3d
  label: 2D to 3D
  kind: action
  command: "PICTURE_3D 2dto3d {direction} {depth}"
  params:
    - name: direction
      type: string
      description: "righttoleft | lefttoright"
    - name: depth
      type: integer
      description: "0-20"
- id: net_picture_3d_on
  label: 3D On
  kind: action
  command: "PICTURE_3D on {pattern} {direction} {depth}"
  params:
    - name: pattern
      type: string
      description: "topandbottom | sidebyside | checkboard | framesequential | columninterleaving | rowinterleaving"
    - name: direction
      type: string
      description: "righttoleft | lefttoright"
    - name: depth
      type: integer
      description: "0-20"
- id: net_picture_3d_extension_picturecorrection
  label: Extended 3D - Picture Correction
  kind: action
  command: "PICTURE_3D_EXTENSION picturecorrection {value}"
  params:
    - name: value
      type: string
      description: "0=Right to Left, 1=Left to Right"
- id: net_picture_3d_extension_color_sound
  label: Extended 3D - Color/Sound Correction
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {value}"
  params:
    - name: option
      type: string
      description: "colorcorrection | sound"
    - name: value
      type: string
      description: "0=off, 1=on"
- id: net_picture_3d_extension_normal
  label: Extended 3D - Normal Image View
  kind: action
  command: "PICTURE_3D_EXTENSION normal {value}"
  params:
    - name: value
      type: string
      description: "0=off, 1=on"
- id: net_picture_3d_extension_depth_viewpoint
  label: Extended 3D - Depth / Viewpoint
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {value}"
  params:
    - name: option
      type: string
      description: "depth | viewpoint"
    - name: value
      type: integer
      description: "0-20"
- id: net_picture_3d_extension_genre
  label: Extended 3D - Genre
  kind: action
  command: "PICTURE_3D_EXTENSION genre {value}"
  params:
    - name: value
      type: string
      description: "0=Standard, 1=Sport, 2=Cinema, 3=Extreme, 4=Manual, 5=Auto"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
- id: volume_mute_state
  type: enum
  values: [on, off]
- id: ack_result
  type: enum
  values: [ok, ng]
```

## Variables
```yaml
# RS-232: ack payload contains current value for the queried command.
# Network: no structured feedback beyond OK/NG; status of stateful values
# not directly readable - use serial ka FF / ke FF / etc. for that.
```

## Events
```yaml
[]
```

## Macros
```yaml
[]
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- Set ID 0x00 broadcasts to all connected sets; range 0x01–0x63 (1–99 decimal).
- During media playback/recording, only Power (ka) and Key (mc) commands execute; others return NG.
- With RS-232C cable, ka power commands work in both standby and on states; with USB-to-Serial converter, only when TV is on.
- Network IP control is USA-only per source. Requires password 828 (default, changeable) to enable; once enabled, no per-command auth needed on the telnet session.
- 3D, Extended 3D, and ISM Method applicability is model-dependent in source — verify against target firmware before relying on these.
- Wake-on-LAN: enable `Settings > Mobile TV On` and use a WOL app; source mentions the mechanism but does not give the WOL magic packet format.

<!-- UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: WOL magic packet format not in source. UNRESOLVED: 3D / Extended 3D / ISM applicability to 55UK6550PUB not confirmed. -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - justaddpower.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
retrieved_at: 2026-06-02T17:23:06.492Z
last_checked_at: 2026-06-02T17:23:06.492Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:06.492Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 RS-232 spec actions matched verbatim in source; transport parameters verified; 27 distinct wire-token commands fully represented. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "3D / ISM / Extended 3D applicability not confirmed for 55UK6550PUB specifically — source marks them \"depending on model\"."
- "firmware version compatibility not stated. UNRESOLVED: WOL magic packet format not in source. UNRESOLVED: 3D / Extended 3D / ISM applicability to 55UK6550PUB not confirmed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
