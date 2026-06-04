---
spec_id: admin/lg-49nano81ana
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 49NANO81ANA Control Spec"
manufacturer: LG
model_family: 49NANO81ANA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49NANO81ANA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T01:04:39.990Z
last_checked_at: 2026-06-03T07:19:32.540Z
generated_at: 2026-06-03T07:19:32.540Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "3D commands (xt/xv, PICTURE_3D*) are documented as 3D-model only and may not apply to NANO81ANA; ISM Method (jp) is Plasma-only and does not apply."
  - "the source documents every adjustment as a command-level set;"
  - "the source documents no unsolicited device-pushed events"
  - "the source does not define device-side multi-step sequences"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:19:32.540Z
  matched_actions: 59
  action_count: 59
  confidence: medium
  summary: "Complete match: all 59 actions cross-referenced (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 49NANO81ANA Control Spec

## Summary
LG 49NANO81ANA (NANO81 series) 4K TV. Source documents two control transports: RS-232C serial (9600/8N1 ASCII) and Network IP Control (Telnet, TCP/9761, "For USA only"). The same functional command set is exposed over both transports with different framing — serial uses a 27-command ASCII opcode catalog (`ka`, `kc`, `kd`…), while IP uses a name-based command vocabulary (`POWER off`, `VOLUME_MUTE on`…).

<!-- UNRESOLVED: 3D commands (xt/xv, PICTURE_3D*) are documented as 3D-model only and may not apply to NANO81ANA; ISM Method (jp) is Plasma-only and does not apply. -->

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
  type: none  # inferred: no auth procedure on the wire for either transport. Note: a 3-digit menu password (default 828) gates the IP Control Setup toggle, not the telnet session itself.
```

**Set ID.** A 1–99 decimal identifier is assigned per TV in `SETTINGS → General → About this TV / OPTION → SET ID`. Serial framing: `[Cmd1][Cmd2][ ][SetID][ ][Data][Cr]` where SetID is sent as 2-digit hex (0x00 = broadcast, 0x01–0x63 = 1–99). Space = 0x20, Cr = 0x0D. IP commands in the source do not include Set ID (commands are routed by the TCP connection's target TV).

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions

### RS-232C (serial) — one entry per opcode

```yaml
- id: rs232_power
  label: Power (Set / Query)
  kind: action
  command: "ka {SetID} {Data}\r"   # Data 00=Off, 01=On. Send FF to query.
  params:
    - name: SetID
      type: hex_string
      length: 2
      description: "Set ID (0x00 = broadcast, 0x01-0x63 = 1-99)"
    - name: Data
      type: hex_string
      length: 2
      description: "00=Power Off, 01=Power On, FF=Query status"
  notes: "With USB-to-Serial converter cable, the command works only if TV is on. RS232C cable works in both power states."

- id: rs232_aspect_ratio
  label: Aspect Ratio (Set / Query)
  kind: action
  command: "kc {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "01=Normal(4:3), 02=Wide(16:9), 04=Zoom, 05=Zoom2 (EU/CO/ME), 06=Set by Program/Original, 07=14:9 (EU/CO/ME/Asia ex KR/JP), 09=Just Scan, 0B=Full Wide (LatAm ex CO), 0C=21:9 (depending on model), 10-1F=Cinema Zoom 1-16. FF=Query."

- id: rs232_screen_mute
  label: Screen Mute (Set / Query)
  kind: action
  command: "kd {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00=Screen mute off (Picture on / Video mute off), 01=Screen mute on (Picture off), 10=Video mute on. FF=Query."

- id: rs232_volume_mute
  label: Volume Mute (Set / Query)
  kind: action
  command: "ke {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00=Mute on (Volume off), 01=Mute off (Volume on). FF=Query."

- id: rs232_volume
  label: Volume Control (Set / Query)
  kind: action
  command: "kf {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00-64 (hex) volume step. FF=Query."

- id: rs232_contrast
  label: Contrast (Set / Query)
  kind: action
  command: "kg {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00 (min) - 64 (max). FF=Query."

- id: rs232_brightness
  label: Brightness (Set / Query)
  kind: action
  command: "kh {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00 (min) - 64 (max). FF=Query."

- id: rs232_color
  label: Color/Colour (Set / Query)
  kind: action
  command: "ki {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00 (min) - 64 (max). FF=Query."

- id: rs232_tint
  label: Tint (Set / Query)
  kind: action
  command: "kj {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00 (Red) - 64 (Green). FF=Query. (Depending on model.)"
  notes: "Ack command-2 byte is 'r' not 'j' as printed in source."

- id: rs232_sharpness
  label: Sharpness (Set / Query)
  kind: action
  command: "kk {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00 (min) - 32 (max). FF=Query. (Depending on model.)"

- id: rs232_osd_select
  label: OSD Select (Set / Query)
  kind: action
  command: "kl {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00=OSD off, 01=OSD on. FF=Query."

- id: rs232_remote_lock
  label: Remote Control Lock Mode (Set / Query)
  kind: action
  command: "km {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00=Lock off, 01=Lock on. FF=Query."

- id: rs232_treble
  label: Treble (Set / Query)
  kind: action
  command: "kr {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00-64. FF=Query."
  notes: "Ack command-2 byte is 'u' not 'r' as printed in source."

- id: rs232_bass
  label: Bass (Set / Query)
  kind: action
  command: "ks {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00-64. FF=Query."

- id: rs232_balance
  label: Balance (Set / Query)
  kind: action
  command: "kt {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00-64. FF=Query."

- id: rs232_color_temperature
  label: Color Temperature (Set / Query)
  kind: action
  command: "xu {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00-64. FF=Query."
  notes: "Ack command-2 byte is 'l' not 'u' as printed in source."

- id: rs232_ism_method
  label: ISM Method (Plasma only - not applicable to NANO81ANA)
  kind: action
  command: "jp {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "02=Orbiter, 08=Normal, 20=Color Wash. FF=Query."
  notes: "Plasma TV only. Source marks as not applicable to LED/LCD NANO81ANA."

- id: rs232_equalizer
  label: Equalizer (Set / Query)
  kind: action
  command: "jv {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 1
      description: "8-bit value: bits 7-5 select band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th), bits 4-0 encode step 0-20 (use 10011 binary = 19 for example). FF not used as query sentinel - see docs."
  notes: "Adjustable only when sound mode is EQ adjustable value. Precondition: All settings > sound > sound mode settings > Equalizer on."

- id: rs232_energy_saving
  label: Energy Saving (Set / Query)
  kind: action
  command: "jq {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto (LCD/LED) / Intelligent sensor (PDP), 05=Screen off. FF=Query. (Depending on model.)"

- id: rs232_tune_command
  label: Tune Command (Set channel)
  kind: action
  command: "ma {SetID} {D0} {D1} {D2}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: D0
      type: hex_string
      length: 2
      description: "High byte channel data, or 0x00 if not used"
    - name: D1
      type: hex_string
      length: 2
      description: "Low byte channel data, or Major high byte"
    - name: D2
      type: hex_string
      length: 2
      description: "Input source: 00=Antenna TV (ATV), 80=Cable TV (CATV) - analog; 10=Antenna TV (DTV), 20=Antenna Radio, 40=Satellite TV (SDTV), 50=Satellite Radio, 90=Cable TV (CADTV), A0=Cable Radio - digital"
  notes: "For full physical/major/minor tuning (6 data bytes), see source section 20; payload template: ma {SetID} 00 {D1} {D2} {D3} {D4} {D5}\\r where D5 is the input source per the variant table. Behavior varies by region and signal."

- id: rs232_channel_add_del
  label: Channel Add/Del (Skip) (Set / Query)
  kind: action
  command: "mb {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00=Del (ATSC/ISDB) / Skip (DVB), 01=Add. FF=Query."

- id: rs232_key
  label: IR Key Code
  kind: action
  command: "mc {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "IR key code (hex). Common codes: 00=CH+, 01=CH-, 02=Vol+, 03=Vol-, 06=Right, 07=Left, 08=Power, 09=Mute, 0B=Input, 0E=Sleep, 0F=TV, 10-19=Number 0-9, 28=Return, 40=Up, 41=Down, 43=Menu/Settings, 44=OK, 53=List, 79=Aspect Ratio. See source p.2 for full list of ~50 codes."
  notes: "Works in standby when serial cable (not USB converter) is used."

- id: rs232_backlight
  label: Control Backlight / Control Panel Light (Set / Query)
  kind: action
  command: "mg {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00-64. FF=Query."
  notes: "On LCD/LED TVs (NANO81ANA) this controls backlight; on Plasma TVs it controls panel light. Same opcode."

- id: rs232_input_select
  label: Input Select (Main Picture) (Set / Query)
  kind: action
  command: "xb {SetID} {Data}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: Data
      type: hex_string
      length: 2
      description: "00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1 (JP), 04=ISDB-CS2 (JP), 10=ATV, 11=CATV, 20=AV/AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4, ISDB-BS (JP). FF=Query. Availability depends on model and signal."

- id: rs232_3d
  label: 3D Mode (3D models only)
  kind: action
  command: "xt {SetID} {D0} {D1} {D2} {D3}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: D0
      type: hex_string
      length: 2
      description: "00=3D On, 01=3D Off, 02=3D to 2D, 03=2D to 3D"
    - name: D1
      type: hex_string
      length: 2
      description: "00=Top/Bottom, 01=Side by Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving"
    - name: D2
      type: hex_string
      length: 2
      description: "00=Right to Left, 01=Left to Right (Plasma only)"
    - name: D3
      type: hex_string
      length: 2
      description: "3D Depth: 00-14 (hex). D3 ignored when D0=00; D1/D2/D3 ignored when D0=01 or 02; D1/D2 ignored when D0=03"
  notes: "3D models only - applicability to NANO81ANA is model-dependent."

- id: rs232_extended_3d
  label: Extended 3D Options (3D models only)
  kind: action
  command: "xv {SetID} {D0} {D1}\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
    - name: D0
      type: hex_string
      length: 2
      description: "00=3D Picture Correction, 01=3D Depth, 02=3D Viewpoint, 06=3D Color Correction, 07=3D Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre)"
    - name: D1
      type: hex_string
      length: 2
      description: "Range depends on D0: D0=00 → 00/01; D0=01,02 → 00-14 (0-20 maps to viewpoint -10 to +10); D0=06,07 → 00/01 (off/on); D0=08 → 00/01; D0=09 → 00=Standard, 01=Sport, 02=Cinema, 03=Extreme, 04=Manual, 05=Auto"
  notes: "3D models only. Preconditions apply per option - see source section 26."

- id: rs232_auto_configure
  label: Auto Configure (RGB/PC mode only)
  kind: action
  command: "ju {SetID} 01\r"
  params:
    - name: SetID
      type: hex_string
      length: 2
  notes: "Data fixed at 01 (To set Auto Configure). Adjusts picture position and minimizes image shaking automatically. RGB(PC) mode only."
```

### Network IP Control (Telnet, TCP/9761) — "For USA only"

```yaml
- id: ip_power
  label: Power (off only as documented)
  kind: action
  command: "POWER off\r\n"
  notes: "Source documents only POWER off. POWER on is not shown - UNRESOLVED for IP. Use WOL via the Mobile TV On app, or power on over RS-232 (ka 01 01\\r), to turn the TV on."

- id: ip_aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "ASPECT_RATIO {Value}\r\n"
  params:
    - name: Value
      type: enum
      values: [4by3, 16by9, setbyoriginal]

- id: ip_screen_mute
  label: Screen Mute
  kind: action
  command: "SCREEN_MUTE {Value}\r\n"
  params:
    - name: Value
      type: enum
      values: [screenmuteon, videomuteon, allmuteoff]

- id: ip_volume_mute
  label: Volume Mute
  kind: action
  command: "VOLUME_MUTE {Value}\r\n"
  params:
    - name: Value
      type: enum
      values: [on, off]

- id: ip_volume_control
  label: Volume Control
  kind: action
  command: "VOLUME_CONTROL {Value}\r\n"
  params:
    - name: Value
      type: integer
      range: "0-100"
      description: "Decimal"

- id: ip_contrast
  label: Picture Contrast
  kind: action
  command: "PICTURE_CONTRAST {Value}\r\n"
  params:
    - name: Value
      type: integer
      range: "0-100"

- id: ip_brightness
  label: Picture Brightness
  kind: action
  command: "PICTURE_BRIGHTNESS {Value}\r\n"
  params:
    - name: Value
      type: integer
      range: "0-100"

- id: ip_color
  label: Picture Colour
  kind: action
  command: "PICTURE_COLOUR {Value}\r\n"
  params:
    - name: Value
      type: integer
      range: "0-100"

- id: ip_tint
  label: Picture Tint
  kind: action
  command: "PICTURE_TINT {Value}\r\n"
  params:
    - name: Value
      type: integer
      range: "0-100"

- id: ip_sharpness
  label: Picture Sharpness
  kind: action
  command: "PICTURE_SHARPNESS {Value}\r\n"
  params:
    - name: Value
      type: integer
      range: "0-50"

- id: ip_osd_select
  label: OSD Select
  kind: action
  command: "OSD_SELECT {Value}\r\n"
  params:
    - name: Value
      type: enum
      values: [on, off]

- id: ip_remote_lock
  label: Remote Control Lock
  kind: action
  command: "REMOTECONTROLER_LOCK {Value}\r\n"
  params:
    - name: Value
      type: enum
      values: [on, off]

- id: ip_balance
  label: Audio Balance
  kind: action
  command: "AUDIO_BALANCE {Value}\r\n"
  params:
    - name: Value
      type: integer
      range: "0-100"

- id: ip_color_temperature
  label: Picture Colour Temperature
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {Value}\r\n"
  params:
    - name: Value
      type: integer
      range: "0-100"

- id: ip_equalizer
  label: Audio Equalizer
  kind: action
  command: "AUDIO_EQUALIZER {Band} {Step}\r\n"
  params:
    - name: Band
      type: integer
      range: "1-5"
      description: "Frequency band"
    - name: Step
      type: integer
      range: "0-20"
      description: "Step (decimal)"
  notes: "Precondition: All settings > sound > sound mode settings > Equalizer on."

- id: ip_energy_saving
  label: Energy Saving
  kind: action
  command: "ENERGY_SAVING {Value}\r\n"
  params:
    - name: Value
      type: enum
      values: [screenoff, maximum, medium, minimum, off]

- id: ip_channel_setting_atsc_atv
  label: Channel Setting (ATSC/ATV, physical)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {Channel} {Source}\r\n"
  params:
    - name: Channel
      type: integer
      description: "Physical channel number"
    - name: Source
      type: enum
      values: [antenna, cable]
  notes: "Source row 1 of CHANNEL_SETTING in source list."

- id: ip_channel_setting_atsc_dtv_phys
  label: Channel Setting (ATSC/DTV, physical)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {Channel} {Source}\r\n"
  params:
    - name: Channel
      type: integer
      description: "Channel number (uses physical)"
    - name: Source
      type: enum
      values: [cablenotphy]
  notes: "Source row 2 of CHANNEL_SETTING. ('cablenotphy' in source = uses physical channel number for cable.)"

- id: ip_channel_setting_atsc_dtv_major_minor
  label: Channel Setting (ATSC/DTV, major/minor, antenna)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {Major} {Minor} {Source}\r\n"
  params:
    - name: Major
      type: integer
      description: "Major channel number"
    - name: Minor
      type: integer
      description: "Minor channel number"
    - name: Source
      type: enum
      values: [antennanotphy]
  notes: "Source row 3 of CHANNEL_SETTING."

- id: ip_channel_setting_atsc_dtv_cable_major_minor
  label: Channel Setting (ATSC/DTV, major/minor, cable)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {Major} {Minor} {Source}\r\n"
  params:
    - name: Major
      type: integer
    - name: Minor
      type: integer
    - name: Source
      type: enum
      values: [cablenotphy]
  notes: "Source row 4 of CHANNEL_SETTING. Functionally similar to row 3 but with cable source."

- id: ip_channel_add_delete
  label: Channel Add/Delete
  kind: action
  command: "CHANNEL_ADD_DELETE {Value}\r\n"
  params:
    - name: Value
      type: enum
      values: [add, delete]

- id: ip_key_action
  label: IR Key Action
  kind: action
  command: "KEY_ACTION {KeyName}\r\n"
  params:
    - name: KeyName
      type: enum
      values: [exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, record, 3d, autoconfig, app, screenbright, number0, number1, number2, number3, number4, number5, number6, number7, number8, number9]
      description: "Full key set listed verbatim in source section 19."

- id: ip_backlight
  label: Picture Backlight
  kind: action
  command: "PICTURE_BACKLIGHT {Value}\r\n"
  params:
    - name: Value
      type: integer
      range: "0-100"
  notes: "Precondition: All settings > picture > Energy Saving off."

- id: ip_input_select
  label: Input Select
  kind: action
  command: "INPUT_SELECT {Source}\r\n"
  params:
    - name: Source
      type: enum
      values: [dtv, atv, cadtv, catv, avav1, component1, hdmi1, hdmi2, hdmi3]
      description: "Source documents only this subset of inputs (no AV2, Component2, HDMI4, RGB, Satellite, ISDB)."

- id: ip_picture_3d_off
  label: Picture 3D (off / 3D-to-2D)
  kind: action
  command: "PICTURE_3D {Mode}\r\n"
  params:
    - name: Mode
      type: enum
      values: [off, 3dto2d]
  notes: "3D models only. Source row 1 of PICTURE_3D."

- id: ip_picture_3d_2dto3d
  label: Picture 3D (2D-to-3D)
  kind: action
  command: "PICTURE_3D 2dto3d {Direction} {Depth}\r\n"
  params:
    - name: Direction
      type: enum
      values: [righttoleft, lefttoright]
    - name: Depth
      type: integer
      range: "0-20"
  notes: "3D models only. Source row 2 of PICTURE_3D."

- id: ip_picture_3d_on
  label: Picture 3D (3D On, with format / direction / depth)
  kind: action
  command: "PICTURE_3D on {Format} {Direction} {Depth}\r\n"
  params:
    - name: Format
      type: enum
      values: [topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving]
    - name: Direction
      type: enum
      values: [righttoleft, lefttoright]
    - name: Depth
      type: integer
      range: "0-20"
  notes: "3D models only. Source row 3 of PICTURE_3D. Depth works only when 3D Mode (Genre) is manual."

- id: ip_picture_3d_extension_picture_correction
  label: 3D Extension - Picture Correction
  kind: action
  command: "PICTURE_3D_EXTENSION picturecorrection {Value}\r\n"
  params:
    - name: Value
      type: enum
      values: ["0", "1"]
      description: "0=Right to Left, 1=Left to Right"
  notes: "Precondition: PICTURE_3D on X X X. 3D models only."

- id: ip_picture_3d_extension_color_or_sound
  label: 3D Extension - Color Correction / Sound Zooming
  kind: action
  command: "PICTURE_3D_EXTENSION {Option} {Value}\r\n"
  params:
    - name: Option
      type: enum
      values: [colorcorrection, sound]
    - name: Value
      type: enum
      values: ["0", "1"]
      description: "0=off, 1=on"
  notes: "Precondition: PICTURE_3D on X X X. 3D models only."

- id: ip_picture_3d_extension_normal
  label: 3D Extension - Normal Image View
  kind: action
  command: "PICTURE_3D_EXTENSION normal {Value}\r\n"
  params:
    - name: Value
      type: enum
      values: ["0", "1"]
      description: "0=off, 1=on"
  notes: "Precondition: PICTURE_3D on X X X. 3D models only."

- id: ip_picture_3d_extension_depth_or_viewpoint
  label: 3D Extension - Depth / Viewpoint
  kind: action
  command: "PICTURE_3D_EXTENSION {Option} {Value}\r\n"
  params:
    - name: Option
      type: enum
      values: [depth, viewpoint]
    - name: Value
      type: integer
      range: "0-20"
      description: "Viewpoint range"
  notes: "Depth precondition: PICTURE_3D 2dto3d X X AND PICTURE_3D_EXTENSION genre 4. Viewpoint precondition: PICTURE_3D 2dto3d X X. 3D models only."

- id: ip_picture_3d_extension_genre
  label: 3D Extension - 3D Mode (Genre)
  kind: action
  command: "PICTURE_3D_EXTENSION genre {Value}\r\n"
  params:
    - name: Value
      type: integer
      range: "0-5"
      description: "0=Standard, 1=Sport, 2=Cinema, 3=Extreme, 4=Manual, 5=Auto"
  notes: "Precondition: PICTURE_3D 2dto3d X X. 3D models only."
```

## Feedbacks
```yaml
# RS-232C ack format (applies to all set/query commands):
#   [Command2][ ][SetID][ ][OK][Data][x]   on success
#   [Command2][ ][SetID][ ][NG][Data][x]   on error
#   Data 00 = Illegal Code
# IP control ack: literal text "OK" or "NG" followed by newline.
# All command-2 ack bytes documented below come from the source verbatim,
# including the source's known errata (Tint ack 'r', Treble ack 'u', Color Temp ack 'l').

- id: power_state
  type: enum
  values: [on, off]
  source: "rs232_power (ka) ack"

- id: volume_mute_state
  type: enum
  values: [on, off]
  source: "rs232_volume_mute (ke) ack"

- id: volume_level
  type: integer
  range: "0-100 (hex 00-64)"
  source: "rs232_volume (kf) ack"

- id: input_source
  type: integer
  description: "Input code (00 DTV, 10 ATV, 20 AV1, 90 HDMI1, 91 HDMI2, 92 HDMI3, 93 HDMI4, 40/41 Component1/2, 60 RGB, etc.)"
  source: "rs232_input_select (xb) ack"

- id: balance_level
  type: integer
  range: "0-100 (hex 00-64)"
  source: "rs232_balance (kt) ack"

- id: color_temperature_level
  type: integer
  range: "0-100 (hex 00-64)"
  source: "rs232_color_temperature (xu) ack; ack command-2 byte is 'l'"

- id: energy_saving_mode
  type: integer
  range: "0-5"
  description: "00=Off, 01=Min, 02=Med, 03=Max, 04=Auto, 05=Screen off"
  source: "rs232_energy_saving (jq) ack"

- id: backlight_level
  type: integer
  range: "0-100 (hex 00-64)"
  source: "rs232_backlight (mg) ack"
```

## Variables
```yaml
# Persistent per-TV settings that are not discrete actions but a settable
# numeric/enum state. Read/write through the matching command's FF data
# (RS-232) or via re-issuing the IP command.
# UNRESOLVED: the source documents every adjustment as a command-level set;
# the device does not expose a separately named "variable" API. Section
# kept for completeness - remove if downstream consumers do not need it.
- id: set_id
  label: Set ID
  type: integer
  range: "0-99 (decimal); sent as hex 0x00-0x63"
  description: "Configured in TV menu; not assignable via control protocol"
  source: "Set ID section, p.1"
```

## Events
```yaml
# UNRESOLVED: the source documents no unsolicited device-pushed events
# over either transport. RS-232C is request/response; IP control returns
# "OK" / "NG" only in response to commands. No async event stream documented.
```

## Macros
```yaml
# UNRESOLVED: the source does not define device-side multi-step sequences
# the operator can invoke as a single command. Multi-step flows (e.g.
# "enable 3D manual depth") are caller-orchestrated.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Remote Control Lock (km / REMOTECONTROLER_LOCK): locks front panel + IR. Source warns: when main power is off & on (plug-off and plug-in, after 20-30 seconds), external control lock is released. In standby mode (DC off via off timer or 'ka'/'mc' command) with key lock on, the TV will not turn on via IR power key or local key."
  - "During media playback or recording, all commands except Power (ka) and Key (mc) are not executed and are treated as NG (RS-232C)."
  - "USB-to-Serial converter cable (PL2303) only works while TV is on; the 'ka' command does NOT power-on a TV in standby over USB-serial - use RS-232C cable or WOL for power-on."
```

## Notes
- All 27 RS-232C opcodes and ~25 IP commands from the source are enumerated above. Some commands are model-conditional: ISM Method (`jp`) is Plasma-only (not applicable to NANO81ANA LED); 3D commands (`xt`, `xv`, `PICTURE_3D*`, `PICTURE_3D_EXTENSION*`) are 3D-model-only and applicability to NANO81ANA is not explicitly confirmed in the source.
- Source has known ack-byte errata that are preserved verbatim: Tint (`kj`) ack command-2 is `r`; Treble (`kr`) ack command-2 is `u`; Color Temperature (`xu`) ack command-2 is `l`. Implementers should not "fix" these.
- IP control section is documented as "(For USA only)". Power-on via IP is not shown — `POWER on` is UNRESOLVED for IP; use WOL (`Mobile TV On` setting + WOL app) or RS-232 `ka` instead.
- The IP telnet session has no on-the-wire auth. The 3-digit code 828 is a menu unlock code, not a session password — used only to enter `IP Control Setup` and toggle the feature on/off.
- `KEY_ACTION` IP command and `mc` RS-232 command share the same key set; see source p.2 for ~50 IR codes (full set in `ip_key_action` enum above).
- Energy Saving must be off for `PICTURE_BACKLIGHT` (IP) to take effect.

## Provenance

```yaml
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T01:04:39.990Z
last_checked_at: 2026-06-03T07:19:32.540Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:19:32.540Z
matched_actions: 59
action_count: 59
confidence: medium
summary: "Complete match: all 59 actions cross-referenced (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "3D commands (xt/xv, PICTURE_3D*) are documented as 3D-model only and may not apply to NANO81ANA; ISM Method (jp) is Plasma-only and does not apply."
- "the source documents every adjustment as a command-level set;"
- "the source documents no unsolicited device-pushed events"
- "the source does not define device-side multi-step sequences"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
