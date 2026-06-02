---
spec_id: admin/lg-50un6955zuf
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 50UN6955ZUF Control Spec"
manufacturer: LG
model_family: 50UN6955ZUF
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50UN6955ZUF
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - gscs-b2c.lge.com
  - proaudioinc.com
  - manualslib.com
source_urls:
  - "https://gscs-b2c.lge.com/downloadFile?fileId=OTCe0KNJErB1WmzD05OQ"
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.manualslib.com/manual/2267581/Lg-43lj550m.html
retrieved_at: 2026-04-25T21:03:52.558Z
last_checked_at: 2026-04-25T21:03:52.558Z
generated_at: 2026-04-25T21:03:52.558Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IP control section marked \"For USA only\" in source; non-USA model support UNRESOLVED."
  - "source contains no explicit safety warnings, interlocks, or"
  - "detailed electrical specs (voltage, current, power) not stated in source."
verification:
  verdict: verified
  checked_at: 2026-04-25T21:03:52.558Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched source commands verbatim; transport parameters verified; complete bidirectional coverage. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 50UN6955ZUF Control Spec

## Summary
RS-232C control spec for LG 50UN6955ZUF commercial display. ASCII framed commands over serial (9600 8N1) or telnet (TCP port 9761, USA only). 27 documented commands cover power, picture, audio, channel tuning, input select, key IR, 3D.

<!-- UNRESOLVED: IP control section marked "For USA only" in source; non-USA model support UNRESOLVED. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from Network IP Control / Telnet mention
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  usb_converter:
    chip: PL2303
    vendor_id: "0x0557"
    product_id: "0x2008"
addressing:
  port: 9761  # Network IP Control; serial uses no port
auth:
  type: password  # Network IP Control requires 3-digit password (default 828)
  default_password: "828"  # Network IP Control default; serial has no auth
```

## Traits
```yaml
- powerable       # inferred from power command examples
- routable        # inferred from input select command examples
- queryable       # inferred from query command examples (transmit FF to read)
- levelable       # inferred from volume/contrast/brightness/colour/tint/sharpness commands
```

## Actions
```yaml
# Generic transmission frame (serial):
# [Command1][Command2][ ][SetID][ ][Data][Cr]
# Cr = 0x0D
# Ack: [Command2][ ][SetID][ ][OK/NG][Data][x]
# SetID: 1-99 (0x00 = broadcast all)
#
# Generic transmission frame (Network IP Control / telnet):
# Command names below are case-sensitive ASCII; newline-terminated.
# Ack: "OK" or "NG"

- id: power_set
  label: Power (set/query)
  kind: action
  command: "ka {SetID} {data}"
  params:
    - name: data
      type: integer
      description: 00 = Power Off, 01 = Power On
    - name: SetID
      type: integer
      description: 1-99, 0 = broadcast
- id: power_query
  label: Power status query
  kind: query
  command: "ka {SetID} FF"
  params:
    - name: SetID
      type: integer
- id: aspect_ratio_set
  label: Aspect Ratio
  kind: action
  command: "kc {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "01=Normal, 02=Wide(16:9), 04=Zoom, 05=Zoom2, 06=Set by Program/Original, 07=14:9, 09=Just Scan, 0B=Full Wide, 0C=21:9, 10-1F=Cinema Zoom 1-16"
- id: screen_mute_set
  label: Screen Mute
  kind: action
  command: "kd {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00=Screen mute off (picture on, video mute off), 01=Screen mute on (picture off), 10=Video mute on"
- id: volume_mute_set
  label: Volume Mute
  kind: action
  command: "ke {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00=Volume mute on, 01=Volume mute off"
- id: volume_control_set
  label: Volume Control
  kind: action
  command: "kf {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00-64 (hex); 00=Min, 64=Max"
- id: contrast_set
  label: Contrast
  kind: action
  command: "kg {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00-64 (hex); 00=Min, 64=Max"
- id: brightness_set
  label: Brightness
  kind: action
  command: "kh {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00-64 (hex); 00=Min, 64=Max"
- id: colour_set
  label: Color/Colour
  kind: action
  command: "ki {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00-64 (hex); 00=Min, 64=Max"
- id: tint_set
  label: Tint
  kind: action
  command: "kj {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00=Red, 64=Green"
- id: sharpness_set
  label: Sharpness
  kind: action
  command: "kk {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00-32 (hex); 00=Min, 32=Max"
- id: osd_select_set
  label: OSD Select
  kind: action
  command: "kl {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00=OSD off, 01=OSD on"
- id: remote_control_lock_set
  label: Remote Control Lock Mode
  kind: action
  command: "km {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00=Lock off, 01=Lock on"
- id: treble_set
  label: Treble
  kind: action
  command: "kr {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"
- id: bass_set
  label: Bass
  kind: action
  command: "ks {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"
- id: balance_set
  label: Balance
  kind: action
  command: "kt {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"
- id: colour_temperature_set
  label: Color(Colour) Temperature
  kind: action
  command: "xu {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"
- id: ism_method_set
  label: ISM Method (Plasma only)
  kind: action
  command: "jp {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "02=Orbiter, 08=Normal, 20=Color(Colour) Wash. Plasma TV only."
- id: equalizer_set
  label: Equalizer
  kind: action
  command: "jv {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "8-bit: bits 7-5 = frequency band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th); bits 4-0 = step 0-20"
- id: energy_saving_set
  label: Energy Saving
  kind: action
  command: "jq {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto/Intelligent sensor, 05=Screen off"
- id: auto_configure_set
  label: Auto Configure (RGB/PC only)
  kind: action
  command: "ju {SetID} 01"
  params: []
- id: tune_command_analog_eu
  label: Tune Command (Analog, EU/Mid-East/Colombia/Asia)
  kind: action
  command: "ma {SetID} 00 {Data00} {Data01} {Data02}"
  params:
    - name: Data00
      type: integer
      description: High byte channel data
    - name: Data01
      type: integer
      description: Low byte channel data (00 00 to 00 C7 = 0-199)
    - name: Data02
      type: integer
      description: "Input Source (Analog): 00=Antenna TV (ATV), 80=Cable TV (CATV)"
- id: tune_command_digital_eu
  label: Tune Command (Digital, EU/Mid-East/Colombia/Asia)
  kind: action
  command: "ma 0 {Data00} {Data01} {Data02} {Data03} {Data04} {Data05}"
  params:
    - name: Data00
      type: integer
      description: "Don't care"
    - name: Data01
      type: integer
      description: "High byte channel data"
    - name: Data02
      type: integer
      description: "Low byte channel data (00 00 to 27 0F = 0-9999)"
    - name: Data03
      type: integer
      description: "Don't care"
    - name: Data04
      type: integer
      description: "Don't care"
    - name: Data05
      type: integer
      description: "Input Source (Digital): 00=ATV, 01=CATV, 02=Antenna DTV (Use Physical), 06=Cable DTV (Use Physical), 22=Antenna DTV (Don't Use Physical), 26=Cable DTV (Don't Use Physical), 46=Cable DTV (Physical/Major), 66=Cable DTV (Major only)"
- id: tune_command_na
  label: Tune Command (South Korea / N. America / L. America)
  kind: action
  command: "ma 0 {Data00} {Data01} {Data02} {Data03} {Data04} {Data05}"
  params:
    - name: Data00
      type: integer
      description: "Physical Channel Number (ATSC) or Don't care"
    - name: Data01
      type: integer
      description: "High byte Major channel"
    - name: Data02
      type: integer
      description: "Low byte Major channel (00 01 to 27 0F = 1-9999)"
    - name: Data03
      type: integer
      description: "High byte Minor channel"
    - name: Data04
      type: integer
      description: "Low byte Minor channel"
    - name: Data05
      type: integer
      description: "Input Source: 01=Analog Cable TV, 22=DTV Antenna (No Physical), 02=DTV Antenna (Physical), 06=DTV Cable (Physical), 26=DTV Cable (No Physical), 46=DTV Cable (Physical/Major), 66=DTV Cable (Major only), 10=DTV, 20=Antenna Radio, 40=Satellite DTV, 50=Satellite Radio, 90=Cable DTV, A0=Cable Radio"
- id: tune_command_jp
  label: Tune Command (Japan)
  kind: action
  command: "ma 0 {Data00} {Data01} {Data02} {Data03} {Data04} {Data05}"
  params:
    - name: Data00
      type: integer
      description: "Don't care"
    - name: Data01
      type: integer
      description: "High byte Major channel"
    - name: Data02
      type: integer
      description: "Low byte Major channel (00 01 to 27 0F = 1-9999)"
    - name: Data03
      type: integer
      description: "High byte Minor/Branch channel"
    - name: Data04
      type: integer
      description: "Low byte Minor/Branch channel"
    - name: Data05
      type: integer
      description: "Input Source (Japan): 02=Antenna DTV, 07=BS Satellite, 08=CS1, 09=CS2"
- id: channel_add_del
  label: Channel Add/Del (Skip)
  kind: action
  command: "mb {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00=Del (ATSC/ISDB) / Skip (DVB), 01=Add"
- id: key_ir_send
  label: IR Key Send
  kind: action
  command: "mc {SetID} {key_code}"
  params:
    - name: key_code
      type: integer
      description: "IR key code (see Feedbacks key_codes table)"
- id: control_backlight
  label: Control Backlight / Control Panel Light
  kind: action
  command: "mg {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00-64 (hex)"
- id: input_select_main
  label: Input Select (Main Picture)
  kind: action
  command: "xb {SetID} {data}"
  params:
    - name: data
      type: integer
      description: "00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1 (JP), 04=ISDB-CS2 (JP), 10=ATV, 11=CATV, 20=AV/AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4"
- id: picture_3d_set
  label: 3D Mode (3D models only)
  kind: action
  command: "xt {SetID} {Data00} {Data01} {Data02} {Data03}"
  params:
    - name: Data00
      type: integer
      description: "00=3D On, 01=3D Off, 02=3D to 2D, 03=2D to 3D"
    - name: Data01
      type: integer
      description: "00=Top/Bottom, 01=Side by Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving"
    - name: Data02
      type: integer
      description: "Plasma only: 00=Right to Left, 01=Left to Right"
    - name: Data03
      type: integer
      description: "3D Effect/Depth: 00-14 (hex); no effect when Data00=00"
- id: picture_3d_extension
  label: Extended 3D Option (3D models only)
  kind: action
  command: "xv {SetID} {Data00} {Data01}"
  params:
    - name: Data00
      type: integer
      description: "3D option: 00=Picture Correction, 01=Depth (manual), 02=Viewpoint, 06=Color Correction, 07=Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre)"
    - name: Data01
      type: integer
      description: "Sub-value per Data00 (00/01=0-14, 06/07/08=0-1, 09=0-5)"
- id: net_power
  label: Network IP Control - Power
  kind: action
  command: "POWER {state}"
  params:
    - name: state
      type: string
      description: "e.g. 'off'"
- id: net_aspect_ratio
  label: Network IP Control - Aspect Ratio
  kind: action
  command: "ASPECT_RATIO {mode}"
  params:
    - name: mode
      type: string
      description: "4by3 / 16by9 / setbyoriginal"
- id: net_screen_mute
  label: Network IP Control - Screen Mute
  kind: action
  command: "SCREEN_MUTE {mode}"
  params:
    - name: mode
      type: string
      description: "screenmuteon / videomuteon / allmuteoff"
- id: net_volume_mute
  label: Network IP Control - Volume Mute
  kind: action
  command: "VOLUME_MUTE {state}"
  params:
    - name: state
      type: string
      description: "on / off"
- id: net_volume_control
  label: Network IP Control - Volume Control
  kind: action
  command: "VOLUME_CONTROL {level}"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"
- id: net_contrast
  label: Network IP Control - Contrast
  kind: action
  command: "PICTURE_CONTRAST {level}"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"
- id: net_brightness
  label: Network IP Control - Brightness
  kind: action
  command: "PICTURE_BRIGHTNESS {level}"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"
- id: net_colour
  label: Network IP Control - Color/Colour
  kind: action
  command: "PICTURE_COLOUR {level}"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"
- id: net_tint
  label: Network IP Control - Tint
  kind: action
  command: "PICTURE_TINT {level}"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"
- id: net_sharpness
  label: Network IP Control - Sharpness
  kind: action
  command: "PICTURE_SHARPNESS {level}"
  params:
    - name: level
      type: integer
      description: "0-50 (decimal)"
- id: net_osd_select
  label: Network IP Control - OSD Select
  kind: action
  command: "OSD_SELECT {state}"
  params:
    - name: state
      type: string
      description: "on / off"
- id: net_remote_lock
  label: Network IP Control - Remote Control Lock
  kind: action
  command: "REMOTECONTROLER_LOCK {state}"
  params:
    - name: state
      type: string
      description: "on / off"
- id: net_balance
  label: Network IP Control - Balance
  kind: action
  command: "AUDIO_BALANCE {level}"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"
- id: net_colour_temperature
  label: Network IP Control - Color Temperature
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {level}"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal)"
- id: net_equalizer
  label: Network IP Control - Equalizer
  kind: action
  command: "AUDIO_EQUALIZER {band} {step}"
  params:
    - name: band
      type: integer
      description: "1-5 (frequency band)"
    - name: step
      type: integer
      description: "0-20 (step decimal); precondition: sound mode = Equalizer adjustable"
- id: net_energy_saving
  label: Network IP Control - Energy Saving
  kind: action
  command: "ENERGY_SAVING {mode}"
  params:
    - name: mode
      type: string
      description: "screenoff / maximum / medium / minimum / off"
- id: net_tune_atsc_atv
  label: Network IP Control - Tune (ATSC/ATV)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} {source}"
  params:
    - name: channel
      type: integer
    - name: source
      type: string
      description: "antenna / cable"
- id: net_tune_atsc_dtv
  label: Network IP Control - Tune (ATSC/DTV)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {channel} cablenotphy"
  params:
    - name: channel
      type: integer
- id: net_tune_atsc_dtv_major_minor
  label: Network IP Control - Tune (ATSC/DTV Major/Minor)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} {source}notphy"
  params:
    - name: major
      type: integer
    - name: minor
      type: integer
    - name: source
      type: string
      description: "antenna / cable"
- id: net_channel_add_delete
  label: Network IP Control - Channel Add/Del
  kind: action
  command: "CHANNEL_ADD_DELETE {action}"
  params:
    - name: action
      type: string
      description: "add / delete"
- id: net_key_action
  label: Network IP Control - IR Key
  kind: action
  command: "KEY_ACTION {key}"
  params:
    - name: key
      type: string
      description: "ok / channelup / volumeup / etc. (see source for full list)"
- id: net_picture_backlight
  label: Network IP Control - Backlight
  kind: action
  command: "PICTURE_BACKLIGHT {level}"
  params:
    - name: level
      type: integer
      description: "0-100 (decimal); precondition: Energy Saving = off"
- id: net_input_select
  label: Network IP Control - Input Select
  kind: action
  command: "INPUT_SELECT {input}"
  params:
    - name: input
      type: string
      description: "dtv / atv / cadtv / catv / avav1 / component1 / hdmi1 / hdmi2 / hdmi3"
- id: net_picture_3d
  label: Network IP Control - 3D (3D models only)
  kind: action
  command: "PICTURE_3D {args}"
  params:
    - name: args
      type: string
      description: "Sub-commands: 'off', '3dto2d', '2dto3d <dir> <0-20>', 'on <pattern> <dir> <0-20>'"
- id: net_picture_3d_extension
  label: Network IP Control - Extended 3D
  kind: action
  command: "PICTURE_3D_EXTENSION {args}"
  params:
    - name: args
      type: string
      description: "Sub-commands: 'picturecorrection 0/1', 'colorcorrection 0/1', 'sound 0/1', 'normal 0/1', 'depth 0-20', 'viewpoint 0-20', 'genre 0-5'"
```

## Feedbacks
```yaml
- id: ack_ok
  label: OK Acknowledgement
  type: object
  description: "[Command2][ ][SetID][ ][OK][Data][x] (serial) or 'OK' (network)"
- id: ack_ng
  label: Error Acknowledgement
  type: object
  description: "[Command2][ ][SetID][ ][NG][Data][x] (serial) or 'NG' (network). Data 00 = Illegal Code"
- id: power_state
  type: enum
  values: [on, off]
- id: aspect_ratio_state
  type: enum
  values: [normal, wide, zoom, zoom2, setbyprogram, "14by9", justscan, fullwide, "21by9", cinemazoom1, cinemazoom2, cinemazoom3, cinemazoom4, cinemazoom5, cinemazoom6, cinemazoom7, cinemazoom8, cinemazoom9, cinemazoom10, cinemazoom11, cinemazoom12, cinemazoom13, cinemazoom14, cinemazoom15, cinemazoom16]
- id: screen_mute_state
  type: enum
  values: [off, screenmuteon, videomuteon]
- id: volume_mute_state
  type: enum
  values: [on, off]
- id: volume_level
  type: integer
  description: "0-100 decimal (network) or 0x00-0x64 (serial)"
- id: input_source
  type: enum
  values: [dtv, cadtv, satellite_dtv, isdb_cs1, isdb_cs2, atv, catv, av, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]
- id: key_codes
  type: object
  description: "IR key code table (hex -> function). 00=CH+, 01=CH-, 02=Vol+, 03=Vol-, 06=Right, 07=Left, 08=Power, 09=Mute, 0B=Input, 0E=Sleep, 0F=TV, 10-19=Number 0-9, 1A=Q.View, 1E=FAV, 20=Text, 21=T.Opt, 28=Return, 30=AV, 39=Caption, 40=Up, 41=Down, 42=My Apps, 43=Menu, 44=OK, 45=Q.Menu, 4C=List(ATSC), 4D=PICTURE, 52=SOUND, 53=List, 5B=Exit, 60=PIP, 61=Blue, 63=Yellow, 71=Green, 72=Red, 79=Ratio, 91=AD, 9E=Live Menu, 7A=User Guide, 7C=Smart/Home, 7E=SIMPLINK, 8E=Forward, 8F=Rewind, AA=Info, AB=Program Guide, B0=Play, B1=Stop, B5=Recent, BA=Pause/Freeze, BB=Soccer, BD=Record, DC=3D, 99=AutoConfig, 9F=App, 9B=TV/PC"
- id: energy_saving_state
  type: enum
  values: [off, minimum, medium, maximum, auto, screenoff]
- id: ism_method_state
  type: enum
  values: [orbiter, normal, colour_wash]
- id: picture_3d_mode
  type: enum
  values: [3d_on, 3d_off, 3d_to_2d, 2d_to_3d]
- id: backlight_level
  type: integer
  description: "0x00-0x64 (serial) or 0-100 decimal (network)"
```

## Variables
```yaml
- id: set_id
  type: integer
  description: "Monitor ID 1-99 (decimal). '0' or '0x00' = broadcast to all connected sets. Menu shows decimal, protocol uses hex."
  range: "0x00-0x63"
- id: equalizer_band
  type: integer
  description: "1-5 (1st-5th band)"
  range: "1-5"
- id: equalizer_step
  type: integer
  description: "0-20 step per band"
  range: "0-20"
- id: picture_3d_depth
  type: integer
  description: "3D depth/effect; 0x00-0x14 (hex)"
  range: "0x00-0x14"
- id: picture_3d_viewpoint
  type: integer
  description: "3D viewpoint; 0-20 decimal (-10 to +10 auto-scaled)"
  range: "0-20"
- id: ip_control_password
  type: string
  description: "3-digit password to enter 'IP Control Setup' menu (default 828). 5-second hold of Settings button on Live TV + enter code."
  default: "828"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or
# power-on sequencing requirements.
```

## Notes
- Network IP Control section marked "For USA only" in source. Non-USA model support UNRESOLVED.
- RS-232C `ka` command works in power-on or power-off state; USB-to-Serial variant works only when TV is on.
- During playback/recording, only `ka` (power) and `mc` (key) are accepted; all other commands return NG.
- Use crossed (reverse) RS-232 cable. 3-wire config (RXD/TXD/GND only) supported but not standard.
- Set ID 0 broadcasts to all connected sets. Range 1-99 (decimal) or 0x00-0x63 (hex).
- Real data mapping for [data] hex: 00-63 = Set ID 0-99, C7 = 199, FE = 254, FF = 255, 0100 = 256, 270F = 9999.
- 3-wire RS-232C config: PC RXD pin 2 to TV TXD pin 2, PC TXD pin 3 to TV RXD pin 1 (DE9) / pin 3 (phone), GND pin 5 to pin 3 (phone) or pin 5 (DE9).
- 3D commands only functional on 3D-capable models; model support varies.
- ISM Method (`jp`) only applies to Plasma TV.
- Energy Saving value 04 = Auto (LCD/LED) or Intelligent sensor (PDP).
- WOL (Wake On LAN) for network power-on requires 'Mobile TV On' submenu enabled + companion mobile app.
- Network IP Control session ends with `quit` command.

<!-- UNRESOLVED: detailed electrical specs (voltage, current, power) not stated in source. -->

## Provenance

```yaml
source_domains:
  - gscs-b2c.lge.com
  - proaudioinc.com
  - manualslib.com
source_urls:
  - "https://gscs-b2c.lge.com/downloadFile?fileId=OTCe0KNJErB1WmzD05OQ"
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.manualslib.com/manual/2267581/Lg-43lj550m.html
retrieved_at: 2026-04-25T21:03:52.558Z
last_checked_at: 2026-04-25T21:03:52.558Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:03:52.558Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched source commands verbatim; transport parameters verified; complete bidirectional coverage. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IP control section marked \"For USA only\" in source; non-USA model support UNRESOLVED."
- "source contains no explicit safety warnings, interlocks, or"
- "detailed electrical specs (voltage, current, power) not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
