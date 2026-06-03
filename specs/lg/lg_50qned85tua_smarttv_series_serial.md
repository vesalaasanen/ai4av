---
spec_id: admin/lg-50qned85tua-smarttv-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 50QNED85TUA SmartTV Series Control Spec"
manufacturer: LG
model_family: 50QNED85TUA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50QNED85TUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - justaddpower.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
retrieved_at: 2026-06-02T02:42:33.169Z
last_checked_at: 2026-06-02T17:23:00.107Z
generated_at: 2026-06-02T17:23:00.107Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Source is the generic LG Smart TV owner manual covering many model series. The 50QNED85TUA is a 2024 4K QNED LED TV; commands tagged \"(only 3D models)\" and \"(Only Plasma TV)\" in the source are documented for completeness but will return NG on this device."
  - "flow control not stated in source (3-wire config shown in cable diagram)"
  - "source says \"Use a crossed (reverse) cable\" - capture as note"
  - "source contains no explicit electrical-safety, voltage, or installer warnings beyond the cable/connector notes. The 3-wire config diagram is a wiring note, not a safety interlock."
  - "- Firmware version compatibility ranges not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:00.107Z
  matched_actions: 63
  action_count: 63
  confidence: medium
  summary: "All 63 spec actions matched literally in source; all transport parameters verified; RS-232 and IP command sets fully represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 50QNED85TUA SmartTV Series Control Spec

## Summary

This spec covers the LG QNED85TUA-series Smart TV (model 50QNED85TUA), a 4K QNED Mini LED television, using its built-in RS-232C service interface and the network IP control (telnet) interface. The source manual documents two parallel command sets: an ASCII serial protocol on the TV's RS-232C/USB-to-Serial port, and a text-based command set on TCP/9761 (IP control is documented for USA models only and must first be enabled in the TV's IP Control Setup menu). Audio/video, power, input, channel, picture and remote-key commands are all available on both transports; 3D and ISM commands exist in the catalogue but are not applicable to this 3D-less LED model.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Source is the generic LG Smart TV owner manual covering many model series. The 50QNED85TUA is a 2024 4K QNED LED TV; commands tagged "(only 3D models)" and "(Only Plasma TV)" in the source are documented for completeness but will return NG on this device. -->

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
  flow_control: null  # UNRESOLVED: flow control not stated in source (3-wire config shown in cable diagram)
  cable: crossed  # UNRESOLVED: source says "Use a crossed (reverse) cable" - capture as note
addressing:
  port: 9761
auth:
  type: none  # inferred: no protocol-level auth described; the 3-digit code 828 is a TV-menu password to enable IP Control, not a telnet login
```

**Notes on transport**
- Serial: 9600 bps UART, 8-N-1, ASCII. DE9 (D-Sub 9) or phone-jack or USB-to-Serial (PL2303, VID 0x0557 / PID 0x2008). 3-wire config (RXD/TXD/GND) shown in source. Cable not provided.
- Set ID is part of every RS-232C command (hex `00`–`63`, decimal 1–99; `00` = broadcast to all sets). Set ID is **not** used on the IP control transport.
- IP control: connect with telnet to the TV's IP address on TCP port 9761. Connection greeting shows the IP; send commands as `COMMAND_NAME arg1 arg2 ...` lines followed by Enter; responses are `OK` or `NG`. Send `quit` to disconnect.

## Traits

```yaml
- powerable       # inferred from ka / POWER commands
- queryable       # inferred from FF-data status read pattern on most commands
- routable        # inferred from xb / INPUT_SELECT commands
- levelable       # inferred from volume/contrast/brightness/color/tint/treble/bass/balance/backlight commands
```

## Actions

```yaml
# Two transports are documented in the source: RS-232C (serial) and Network IP Control (TCP).
# RS-232C actions are prefixed `rs232_`; IP actions are prefixed `ip_`.
# RS-232C command format: [Cmd1][Cmd2][ ][Set ID][ ][Data][Cr]
#   where [Cr] = carriage return (0x0D) and [ ] = space (0x20).
#   Set ID is hex 00..63 (00 = broadcast). Data is hex.
#   To query current state of a settable command, send Data = FF.
# IP control command format: COMMAND_NAME arg1 arg2 ... (newline-terminated).

# ---------- RS-232C: Power ----------
- id: rs232_power
  label: Power (set/query)
  kind: action
  command: "ka {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex (00=broadcast, 01-63)
    - name: data
      type: string
      description: "00 = Power Off, 01 = Power On, FF = status query"
  notes: "Ack: [a][ ][Set ID][ ][OK/NG][Data][x]. With USB-to-Serial cable, ka only works when TV is on; with RS-232C cable it works in power-on or power-off state."

# ---------- RS-232C: Aspect Ratio ----------
- id: rs232_aspect_ratio
  label: Aspect Ratio (Main Picture Size)
  kind: action
  command: "kc {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "01=Normal, 02=Wide(16:9), 04=Zoom, 05=Zoom2, 06=Set by Program/Original, 07=14:9, 09=Just Scan, 0B=Full Wide, 0C=21:9, 10-1F=Cinema Zoom 1-16, FF=query"
  notes: "Full Wide (0B) Latin America except Colombia only. Just Scan in DTV/HDMI/Component. 21:9 depending on model."

# ---------- RS-232C: Screen Mute ----------
- id: rs232_screen_mute
  label: Screen Mute
  kind: action
  command: "kd {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00=Screen mute off (Picture on, Video mute off), 01=Screen mute on (Picture off), 10=Video mute on, FF=query"

# ---------- RS-232C: Volume Mute ----------
- id: rs232_volume_mute
  label: Volume Mute
  kind: action
  command: "ke {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00=Mute on (volume off), 01=Mute off (volume on), FF=query"

# ---------- RS-232C: Volume Control ----------
- id: rs232_volume_control
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00-64 (hex) volume level, FF=query"

# ---------- RS-232C: Contrast ----------
- id: rs232_contrast
  label: Contrast
  kind: action
  command: "kg {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00-64 contrast, FF=query"

# ---------- RS-232C: Brightness ----------
- id: rs232_brightness
  label: Brightness
  kind: action
  command: "kh {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00-64 brightness, FF=query"

# ---------- RS-232C: Color/Colour ----------
- id: rs232_color
  label: Color/Colour
  kind: action
  command: "ki {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00-64 color, FF=query"

# ---------- RS-232C: Tint ----------
- id: rs232_tint
  label: Tint
  kind: action
  command: "kj {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00=Red .. 64=Green, FF=query"
  notes: "Source ack prefix documented as [r]; appears to be a typo for [j]."

# ---------- RS-232C: Sharpness ----------
- id: rs232_sharpness
  label: Sharpness
  kind: action
  command: "kk {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00-32 sharpness, FF=query. Depending on model."

# ---------- RS-232C: OSD Select ----------
- id: rs232_osd_select
  label: OSD Select
  kind: action
  command: "kl {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00=OSD off, 01=OSD on, FF=query"

# ---------- RS-232C: Remote Control Lock ----------
- id: rs232_remote_lock
  label: Remote Control Lock Mode
  kind: action
  command: "km {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00=Lock off, 01=Lock on, FF=query"
  notes: "Locks front panel + remote. Released by main power cycle (plug-off/plug-in, 20-30s). In standby with key lock on, TV will not turn on via IR/local power key."

# ---------- RS-232C: Treble ----------
- id: rs232_treble
  label: Treble
  kind: action
  command: "kr {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00-64 treble, FF=query"
  notes: "Source ack prefix documented as [u]; appears to be a typo for [r]."

# ---------- RS-232C: Bass ----------
- id: rs232_bass
  label: Bass
  kind: action
  command: "ks {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00-64 bass, FF=query"

# ---------- RS-232C: Balance ----------
- id: rs232_balance
  label: Balance
  kind: action
  command: "kt {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00-64 balance, FF=query"

# ---------- RS-232C: Color Temperature ----------
- id: rs232_color_temperature
  label: Color Temperature
  kind: action
  command: "xu {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00-64 color temperature, FF=query"

# ---------- RS-232C: ISM Method ----------
- id: rs232_ism_method
  label: ISM Method
  kind: action
  command: "jp {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "02=Orbiter, 08=Normal, 20=Color Wash, FF=query"
  notes: "Plasma TV only. Will return NG on QNED LED models."

# ---------- RS-232C: Equalizer ----------
- id: rs232_equalizer
  label: Equalizer
  kind: action
  command: "jv {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "9-bit value: bits 7-5 = frequency band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th); bits 4-0 = step 0-19 (decimal), hex. FF=query. Requires sound mode = EQ adjustable."
  notes: "MSB-LSB byte layout: 0bFFFFFSSS where FFF=frequency band index, SSSSS=step value."

# ---------- RS-232C: Energy Saving ----------
- id: rs232_energy_saving
  label: Energy Saving
  kind: action
  command: "jq {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto (LCD/LED) / Intelligent sensor (PDP), 05=Screen off, FF=query"

# ---------- RS-232C: Tune Command (Europe/Mid-East/Colombia/Asia ex KR/JP) ----------
- id: rs232_tune_eu_analog
  label: Tune Command - Analog Antenna/Cable (EU/Mid-East/Asia)
  kind: action
  command: "ma {set_id} {data00} {data01} {data02}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data00
      type: string
      description: High byte channel data (hex)
    - name: data01
      type: string
      description: Low byte channel data (hex)
    - name: data02
      type: string
      description: "Input source: 00=Antenna TV (ATV), 80=Cable TV (CATV)"
  notes: "Range 00 00 to 00 C7 (decimal 0-199). Example: ma 00 00 0a 00 = Analog antenna channel 10."

- id: rs232_tune_eu_digital
  label: Tune Command - Digital Antenna/Cable/Satellite (EU/Mid-East/Asia)
  kind: action
  command: "ma 0 {data00} {data01} {data02} {data03} {data04} {data05}\r"
  params:
    - name: data00
      type: string
      description: High Channel data (hex) - xx (don't care) for digital
    - name: data01
      type: string
      description: Low Channel data (hex) / Major High byte
    - name: data02
      type: string
      description: Low Channel data (hex) / Major Low byte
    - name: data03
      type: string
      description: Minor High byte (don't care in Satellite)
    - name: data04
      type: string
      description: Minor Low byte (don't care in Satellite)
    - name: data05
      type: string
      description: "Input source: 00=ATV, 01=CATV, 02=Antenna DTV (use physical), 06=Cable DTV (use physical), 22=Antenna DTV (no physical), 26=Cable DTV (no physical), 40=Satellite DTV, 46=Cable DTV (one-part), 50=Satellite Radio, 66=Cable DTV (one-part major-only), 90=Cable CADTV, A0=Cable CA-Radio"
  notes: "Two bytes per major/minor; usually low byte alone. Range 00 00 to 27 0F (decimal 0-9999). Example: ma 00 03 E8 40 = Satellite channel 1000."

- id: rs232_tune_jp
  label: Tune Command - Digital (Japan)
  kind: action
  command: "ma 0 {data00} {data01} {data02} {data03} {data04} {data05}\r"
  params:
    - name: data00
      type: string
      description: Don't care
    - name: data01
      type: string
      description: Major High byte
    - name: data02
      type: string
      description: Major Low byte
    - name: data03
      type: string
      description: Minor High byte
    - name: data04
      type: string
      description: Minor Low byte
    - name: data05
      type: string
      description: "Input source (Japan): 02=Antenna DTV, 07=BS, 08=CS1, 09=CS2"
  notes: "Example: ma 00 00 00 11 00 01 02 = digital antenna (ISDB-T) channel 17-1. Example: ma 00 00 00 1E 00 00 07 = BS channel 30."

- id: rs232_tune_na
  label: Tune Command - Analog Cable (KR/NA/LatAm ex Colombia)
  kind: action
  command: "ma 0 {data00} {data01} {data02} {data03} {data04} {data05}\r"
  params:
    - name: data00
      type: string
      description: Channel data (hex)
    - name: data01
      type: string
      description: Major High byte (00 if no major)
    - name: data02
      type: string
      description: Major Low byte (00 if no major)
    - name: data03
      type: string
      description: Minor High byte (00 if no minor)
    - name: data04
      type: string
      description: Minor Low byte (00 if no minor)
    - name: data05
      type: string
      description: "Input source: 01=Analog Cable TV (CATV)"
  notes: "Example: ma 00 23 00 00 00 00 01 = analog cable channel 35. Antenna ATV range 02-45 (decimal 2-69)."

# ---------- RS-232C: Channel Add/Del ----------
- id: rs232_channel_add_del
  label: Channel Add/Del (Skip)
  kind: action
  command: "mb {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00=Del (ATSC/ISDB) / Skip (DVB), 01=Add, FF=query"

# ---------- RS-232C: Key ----------
- id: rs232_key
  label: IR Remote Key
  kind: action
  command: "mc {set_id} {key_code}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: key_code
      type: string
      description: "Hex key code (2 digits). Valid: 00=CH+, 01=CH-, 02=Vol+, 03=Vol-, 06=Right, 07=Left, 08=Power, 09=Mute, 0B=Input, 0E=Sleep, 0F=TV, 10-19=Number 0-9, 1A=Q.View, 1E=FAV, 20=Text, 21=T.Opt, 28=Return, 30=AV Mode, 39=Caption, 40=Up, 41=Down, 42=My Apps, 43=Menu, 44=OK, 45=Q.Menu, 4C=List (ATSC/ISDB only), 4D=Picture, 52=Sound, 53=List, 5B=Exit, 60=PIP, 61=Blue, 63=Yellow, 71=Green, 72=Red, 79=Ratio, 91=AD, 9E=Live Menu, 7A=User Guide, 7C=Smart/Home, 7E=Simplink, 8E=Fwd, 8F=Rewind, AA=Info, AB=Program Guide, B0=Play, B1=Stop, B5=Recent, BA=Pause, BB=Soccer, BD=REC, DC=3D, 99=AutoConfig, 9F=App, 9B=TV/PC"

# ---------- RS-232C: Control Backlight / Panel Light ----------
- id: rs232_backlight
  label: Control Backlight / Control Panel Light
  kind: action
  command: "mg {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00-64 backlight/panel light level, FF=query"

# ---------- RS-232C: Input Select (Main Picture) ----------
- id: rs232_input_select
  label: Input Select (Main Picture)
  kind: action
  command: "xb {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1 (JP), 04=ISDB-CS2 (JP), 10=ATV, 11=CATV, 20=AV/AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4, FF=query"
  notes: "ISDB-BS (Japan) not enumerated; depending on model and signal."

# ---------- RS-232C: 3D ----------
- id: rs232_3d
  label: 3D Mode
  kind: action
  command: "xt {set_id} {d0} {d1} {d2} {d3}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: d0
      type: string
      description: "00=3D On, 01=3D Off, 02=3D-to-2D, 03=2D-to-3D"
    - name: d1
      type: string
      description: "Pattern: 00=Top-Bottom, 01=Side-by-Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving"
    - name: d2
      type: string
      description: "Plasma only: 00=Right-to-Left, 01=Left-to-Right. QNED/LED: don't care."
    - name: d3
      type: string
      description: "3D Depth 00-14 (hex, 0-20 decimal). Don't care when d0=00 or d0=01 or d0=02."
  notes: "3D models only. Will return NG on this 4K QNED LED TV."

# ---------- RS-232C: Extended 3D ----------
- id: rs232_extended_3d
  label: Extended 3D
  kind: action
  command: "xv {set_id} {d0} {d1}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: d0
      type: string
      description: "Option: 00=Picture Correction, 01=Depth (Manual only), 02=Viewpoint, 06=Color Correction, 07=Sound Zooming, 08=Normal Image View, 09=Mode (Genre)"
    - name: d1
      type: string
      description: "Value depends on d0: 00/01, 0-14 (0-20 decimal), etc. See source for per-d0 ranges."
  notes: "3D models only. Will return NG on this 4K QNED LED TV."

# ---------- RS-232C: Auto Configure ----------
- id: rs232_auto_configure
  label: Auto Configure
  kind: action
  command: "ju {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID as 2-digit hex
    - name: data
      type: string
      description: "01=Run auto configure. RGB (PC) mode only."

# ---------- IP Control: Power ----------
- id: ip_power
  label: Power
  kind: action
  command: "POWER {state}"
  params:
    - name: state
      type: string
      description: "off (only documented value)"
  notes: "Source lists only POWER off. POWER on not explicitly documented in IP section - may be implicit. FF=query pattern does not apply on IP transport."

# ---------- IP Control: Aspect Ratio ----------
- id: ip_aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "ASPECT_RATIO {mode}"
  params:
    - name: mode
      type: string
      description: "4by3 | 16by9 | setbyoriginal"

# ---------- IP Control: Screen Mute ----------
- id: ip_screen_mute
  label: Screen Mute
  kind: action
  command: "SCREEN_MUTE {mode}"
  params:
    - name: mode
      type: string
      description: "screenmuteon | videomuteon | allmuteoff"

# ---------- IP Control: Volume Mute ----------
- id: ip_volume_mute
  label: Volume Mute
  kind: action
  command: "VOLUME_MUTE {state}"
  params:
    - name: state
      type: string
      description: "on | off"

# ---------- IP Control: Volume Control ----------
- id: ip_volume_control
  label: Volume Control
  kind: action
  command: "VOLUME_CONTROL {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 (decimal)"

# ---------- IP Control: Contrast ----------
- id: ip_contrast
  label: Contrast
  kind: action
  command: "PICTURE_CONTRAST {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 (decimal)"

# ---------- IP Control: Brightness ----------
- id: ip_brightness
  label: Brightness
  kind: action
  command: "PICTURE_BRIGHTNESS {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 (decimal)"

# ---------- IP Control: Color/Colour ----------
- id: ip_color
  label: Color/Colour
  kind: action
  command: "PICTURE_COLOUR {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 (decimal)"

# ---------- IP Control: Tint ----------
- id: ip_tint
  label: Tint
  kind: action
  command: "PICTURE_TINT {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 (decimal)"

# ---------- IP Control: Sharpness ----------
- id: ip_sharpness
  label: Sharpness
  kind: action
  command: "PICTURE_SHARPNESS {level}"
  params:
    - name: level
      type: integer
      description: "0 to 50 (decimal)"

# ---------- IP Control: OSD Select ----------
- id: ip_osd_select
  label: OSD Select
  kind: action
  command: "OSD_SELECT {state}"
  params:
    - name: state
      type: string
      description: "on | off"

# ---------- IP Control: Remote Control Lock ----------
- id: ip_remote_lock
  label: Remote Control Lock
  kind: action
  command: "REMOTECONTROLER_LOCK {state}"
  params:
    - name: state
      type: string
      description: "on | off"

# ---------- IP Control: Balance ----------
- id: ip_balance
  label: Audio Balance
  kind: action
  command: "AUDIO_BALANCE {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 (decimal)"

# ---------- IP Control: Color Temperature ----------
- id: ip_color_temperature
  label: Color Temperature
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 (decimal)"

# ---------- IP Control: Equalizer ----------
- id: ip_equalizer
  label: Equalizer
  kind: action
  command: "AUDIO_EQUALIZER {band} {step}"
  params:
    - name: band
      type: integer
      description: "1 to 5 (frequency band)"
    - name: step
      type: integer
      description: "0 to 20 (step decimal)"
  notes: "Precondition: All settings > sound > sound mode settings > Equalizer on."

# ---------- IP Control: Energy Saving ----------
- id: ip_energy_saving
  label: Energy Saving
  kind: action
  command: "ENERGY_SAVING {mode}"
  params:
    - name: mode
      type: string
      description: "screenoff | maximum | medium | minimum | off"

# ---------- IP Control: Tune Command variants ----------
- id: ip_tune_atsc_atv_antenna
  label: Tune Channel - ATSC/ATV Antenna
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} antenna"
  params:
    - name: channel
      type: string
      description: Channel number

- id: ip_tune_atsc_atv_cable
  label: Tune Channel - ATSC/ATV Cable
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} cable"
  params:
    - name: channel
      type: string
      description: Channel number

- id: ip_tune_atsc_dtv_cable_no_phy
  label: Tune Channel - ATSC/DTV Cable (no physical)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {channel} cablenotphy"
  params:
    - name: channel
      type: string
      description: Channel number

- id: ip_tune_atsc_dtv_antenna_major_minor
  label: Tune Channel - ATSC/DTV Antenna (Major/Minor, no physical)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} antennanotphy"
  params:
    - name: major
      type: string
      description: Major channel number
    - name: minor
      type: string
      description: Minor channel number

- id: ip_tune_atsc_dtv_cable_major_minor
  label: Tune Channel - ATSC/DTV Cable (Major/Minor, no physical)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} cablenotphy"
  params:
    - name: major
      type: string
      description: Major channel number
    - name: minor
      type: string
      description: Minor channel number

# ---------- IP Control: Channel Add/Del ----------
- id: ip_channel_add_delete
  label: Channel Add/Delete
  kind: action
  command: "CHANNEL_ADD_DELETE {state}"
  params:
    - name: state
      type: string
      description: "add | delete"

# ---------- IP Control: Key ----------
- id: ip_key_action
  label: IR Remote Key Action
  kind: action
  command: "KEY_ACTION {key}"
  params:
    - name: key
      type: string
      description: "exit | channelup | channeldown | volumeup | volumedown | arrowright | arrowleft | volumemute | deviceinput | sleepreserve | livetv | previouschannel | favoritechannel | teletext | teletextoption | returnback | avmode | captionsubtitle | arrowup | arrowdown | myapp | settingmenu | ok | quickmenu | videomode | audiomode | channellist | bluebutton | yellowbutton | greenbutton | redbutton | aspectratio | audiodescription | programmorder | userguide | smarthome | simplelink | fastforward | rewind | programminfo | programguide | play | slowplay | soccerscreen | record | 3d | autoconfig | app | screenbright | number0..number9"

# ---------- IP Control: Backlight ----------
- id: ip_backlight
  label: Picture Backlight
  kind: action
  command: "PICTURE_BACKLIGHT {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 (decimal)"
  notes: "Precondition: All settings > picture > Energy Saving off."

# ---------- IP Control: Input Select ----------
- id: ip_input_select
  label: Input Select
  kind: action
  command: "INPUT_SELECT {source}"
  params:
    - name: source
      type: string
      description: "dtv | atv | cadtv | catv | avav1 | component1 | hdmi1 | hdmi2 | hdmi3"

# ---------- IP Control: 3D ----------
- id: ip_picture_3d_off_3dto2d
  label: Picture 3D - Off / 3D-to-2D
  kind: action
  command: "PICTURE_3D {mode}"
  params:
    - name: mode
      type: string
      description: "off | 3dto2d"
  notes: "3D models only."

- id: ip_picture_3d_2dto3d
  label: Picture 3D - 2D-to-3D
  kind: action
  command: "PICTURE_3D 2dto3d {direction} {depth}"
  params:
    - name: direction
      type: string
      description: "righttoleft | lefttoright"
    - name: depth
      type: integer
      description: "0 to 20"
  notes: "3D models only."

- id: ip_picture_3d_on
  label: Picture 3D - On
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
      description: "0 to 20"
  notes: "3D models only."

# ---------- IP Control: Extended 3D ----------
- id: ip_picture_3d_extension_picture_correction
  label: Picture 3D Extension - Picture Correction
  kind: action
  command: "PICTURE_3D_EXTENSION picturecorrection {value}"
  params:
    - name: value
      type: integer
      description: "0 (Right to Left) | 1 (Left to Right)"
  notes: "3D models only. Precondition: PICTURE_3D on X X X."

- id: ip_picture_3d_extension_color_sound
  label: Picture 3D Extension - Color Correction / Sound
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {value}"
  params:
    - name: option
      type: string
      description: "colorcorrection | sound"
    - name: value
      type: integer
      description: "0 (off) | 1 (on)"
  notes: "3D models only. Precondition: PICTURE_3D on X X X."

- id: ip_picture_3d_extension_normal
  label: Picture 3D Extension - Normal Image View
  kind: action
  command: "PICTURE_3D_EXTENSION normal {value}"
  params:
    - name: value
      type: integer
      description: "0 (off) | 1 (on)"
  notes: "3D models only."

- id: ip_picture_3d_extension_depth_viewpoint
  label: Picture 3D Extension - Depth / Viewpoint
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {value}"
  params:
    - name: option
      type: string
      description: "depth | viewpoint"
    - name: value
      type: integer
      description: "0 to 20 (viewpoint range)"
  notes: "3D models only. Preconditions: PICTURE_3D 2dto3d X X; depth also requires PICTURE_3D_EXTENSION genre 4."

- id: ip_picture_3d_extension_genre
  label: Picture 3D Extension - Mode (Genre)
  kind: action
  command: "PICTURE_3D_EXTENSION genre {value}"
  params:
    - name: value
      type: integer
      description: "0=Standard | 1=Sport | 2=Cinema | 3=Extreme | 4=Manual | 5=Auto"
  notes: "3D models only. Precondition: PICTURE_3D 2dto3d X X."
```

## Feedbacks

```yaml
- id: power_state
  type: enum
  values: [on, off]
  source: "ka FF\r (RS-232) - data 00=off, 01=on"
- id: volume_mute_state
  type: enum
  values: [mute_on, mute_off]
  source: "ke FF\r (RS-232) - data 00=on, 01=off"
- id: volume_level
  type: integer
  range: "0-100 (decimal) on IP, 0-64 (hex) on RS-232"
  source: "kf FF\r (RS-232) / VOLUME_CONTROL (IP)"
- id: input_source
  type: enum
  values: [dtv, cadtv, satellite_dtv, isdb_cs1, isdb_cs2, atv, catv, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]
  source: "xb FF\r (RS-232)"
- id: aspect_ratio
  type: enum
  values: [normal, wide_16_9, zoom, zoom2, set_by_program, ratio_14_9, just_scan, full_wide, ratio_21_9, cinema_zoom_1_to_16]
  source: "kc FF\r (RS-232)"
- id: screen_mute_state
  type: enum
  values: [screen_mute_off, screen_mute_on, video_mute_on]
  source: "kd FF\r (RS-232)"
- id: osd_state
  type: enum
  values: [osd_off, osd_on]
  source: "kl FF\r (RS-232)"
- id: remote_lock_state
  type: enum
  values: [lock_off, lock_on]
  source: "km FF\r (RS-232)"
- id: energy_saving_state
  type: enum
  values: [off, minimum, medium, maximum, auto, screen_off]
  source: "jq FF\r (RS-232)"
- id: channel_skip_state
  type: enum
  values: [del_skip, add]
  source: "mb FF\r (RS-232)"
- id: backlight_level
  type: integer
  range: "0-64 (hex) on RS-232, 0-100 (decimal) on IP"
  source: "mg FF\r (RS-232) / PICTURE_BACKLIGHT (IP)"
- id: ip_control_connection
  type: enum
  values: [ok, ng]
  source: "OK/NG response to any IP command"
```

## Variables

```yaml
# Set ID: identifies which TV on a multi-drop RS-232C bus. Range 1-99 (hex 01-63).
# 00 = broadcast to all connected sets. Configured via TV menu (Settings > General >
# About this TV / OPTION > SET ID), not via serial command.
- id: set_id
  type: integer
  range: "1-99"
  config_via: TV menu (SETTINGS > General > About this TV / OPTION > SET ID)
  notes: "Indicated as decimal on menu, as hexadecimal (0x00-0x63) on transmission/receiving protocol."

# IP Control Setup: must be enabled in TV menu before telnet 9761 accepts commands.
# Source documents a 3-digit code 828 (default, changeable) to enter the IP Control
# Setup menu on the TV. This is a TV-menu password, not a telnet protocol auth.
- id: ip_control_enabled
  type: enum
  values: [on, off]
  config_via: TV menu (hold Settings 5s on Live TV, enter 828, OK, then enable)
  notes: "Reboot required after toggling. Default 3-digit menu code: 828 (changeable). USA only per source."
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - id: remote_control_lock
    description: "Lock front panel + remote via km 01 (RS-232) or REMOTECONTROLER_LOCK on (IP). Use to prevent unintended input when remote is lost or in public spaces."
    source: "RS-232C km command section"
  - id: lock_release_on_power_cycle
    description: "External control lock (km) is automatically released when main power is cycled (plug-off, wait 20-30 seconds, plug-in)."
    source: "RS-232C km command section"
  - id: lock_interaction_with_standby
    description: "In standby mode (DC off by off-timer or ka/mc command), with key lock on, TV will not turn on via IR or local power key."
    source: "RS-232C km command section"
# UNRESOLVED: source contains no explicit electrical-safety, voltage, or installer warnings beyond the cable/connector notes. The 3-wire config diagram is a wiring note, not a safety interlock.
```

## Notes

**Source coverage:** This spec is generated from the LG Smart TV Owner's Manual "External Control Device Setup" section, which is a generic LG document covering many TV model series. The 50QNED85TUA is a 2024 4K QNED Mini LED TV. Commands in the source tagged "(only 3D models)" (xt, xv) and "(Only Plasma TV)" (jp) will return `NG` on this device.

**Set ID range mismatch:** Source lists Set ID adjustment range as 1-99, but the `Real data mapping` table also lists `00` as Step 0 and `63` as Step 99 with `FE`/`FF` as 254/255, plus two-byte values up to `27 0F` (9999) for channel numbers. Set ID `00` is the broadcast value per the transmission protocol section.

**Ack format anomalies in source:** Two RS-232 commands have an ack prefix in the source that does not match the command's letter:
- `Tint (kj)` — source lists ack prefix `[r]`. Treated as a typo for `[j]`.
- `Treble (kr)` — source lists ack prefix `[u]`. Treated as a typo for `[r]`.

**Transport divergence:**
- IP control is documented "For USA only" in the source. Out-of-USA firmware may or may not expose the IP control menu and TCP/9761 listener.
- Data ranges differ between transports: RS-232 uses 00-64 hex for most levels; IP uses 0-100 decimal. Sharpness: 00-32 hex (RS-232) vs 0-50 decimal (IP).
- IP control commands do not include a Set ID field and do not document an FF-style status read.
- IP control responses are textual `OK` / `NG`; RS-232C responses follow the structured `[cmd2][ ][set_id][ ][OK/NG][data][x]` format with terminating `x` (0x78).
- USB-to-Serial converter cable: `ka` (power) command works **only when the TV is on**. RS-232C (DE9/phone-jack) cable: `ka` works in both power-on and power-off states.
- During media playback or recording, all commands except Power (ka / POWER) and Key (mc / KEY_ACTION) are not executed and treated as `NG` on both transports.
- IP control Setup menu password: 3-digit code, default `828`, changeable. This unlocks the TV menu, not the telnet session.

**WOL (Wake-on-LAN):** The source mentions powering the TV on via WOL after enabling `Mobile TV On` (Settings > Mobile TV On) and installing a WOL mobile app. No WOL command packet format is documented in the source — only the high-level procedure. Not modeled as an action.

**Cable/connector notes (informational, not control):**
- DE9 (D-Sub 9-pin) female-to-female null-modem cable, or phone-jack to RS-232 cable, depending on TV port.
- USB-to-Serial converters must use the PL2303 chip (VID 0x0557, PID 0x2008). LG does not supply the cable.
- 3-wire configuration: RXD, TXD, GND only.

**Equalizer bit layout (RS-232 jv command):** 9-bit data word — bits 7-5 select frequency band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th), bits 4-0 = step value 0-19. Encoded as a single hex byte in the data field. The source acknowledges the same 9-bit value back.

<!-- UNRESOLVED:
- Firmware version compatibility ranges not stated in source.
- Voltage/current/power specifications not stated (no electrical spec table in source).
- USB-to-Serial chip support beyond PL2303 (VID 0x0557 / PID 0x2008) not stated.
- Whether IP control (TCP/9761) is exposed on non-USA regional firmware variants.
- WOL magic packet format not documented in source.
- Whether POWER on (vs POWER off) is accepted on the IP control transport — source only documents `POWER off`.
- Default IP address / DHCP behavior not stated; the example IP 10.186.119.107 in the source is illustrative only.
- Whether the IP control transport supports unsolicited state change notifications (events).
-->

## Provenance

```yaml
source_domains:
  - justaddpower.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
retrieved_at: 2026-06-02T02:42:33.169Z
last_checked_at: 2026-06-02T17:23:00.107Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:00.107Z
matched_actions: 63
action_count: 63
confidence: medium
summary: "All 63 spec actions matched literally in source; all transport parameters verified; RS-232 and IP command sets fully represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Source is the generic LG Smart TV owner manual covering many model series. The 50QNED85TUA is a 2024 4K QNED LED TV; commands tagged \"(only 3D models)\" and \"(Only Plasma TV)\" in the source are documented for completeness but will return NG on this device."
- "flow control not stated in source (3-wire config shown in cable diagram)"
- "source says \"Use a crossed (reverse) cable\" - capture as note"
- "source contains no explicit electrical-safety, voltage, or installer warnings beyond the cable/connector notes. The 3-wire config diagram is a wiring note, not a safety interlock."
- "- Firmware version compatibility ranges not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
