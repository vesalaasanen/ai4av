---
spec_id: admin/lg-55nu850bpsa
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55NU850BPSA Series Control Spec"
manufacturer: LG
model_family: 55NU850BPSA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 55NU850BPSA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T02:42:36.404Z
last_checked_at: 2026-06-02T03:24:46.638Z
generated_at: 2026-06-02T03:24:46.638Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Network IP Control section in the source is annotated \"(For USA only)\"; applicability to the 55NU850BPSA region SKU is not stated."
  - "ISM Method (j p) is documented as \"Only Plasma TV\" — the 55NU850BPSA is an LED/LCD SKU and the command may be unsupported. Included as documented."
  - "3D commands (x t, x v) and PICTURE_3D / PICTURE_3D_EXTENSION are documented as \"only 3D models\"; 55NU850BPSA is not a 3D SKU. Included as documented."
  - "source does not expose a separate \"Variable\" concept distinct"
  - "source does not document any unsolicited asynchronous"
  - "source does not document any device-side macro language or"
  - "voltage / current / power-consumption specs are not stated in"
  - "firmware version compatibility not stated in source."
  - "protocol version (LG EXTERNAL CONTROL DEVICE SETUP revision) not stated in source."
  - "maximum polling rate, minimum inter-command delay, and timeout/retry behaviour for both RS-232 and IP surfaces are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T03:24:46.638Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 RS-232 action commands matched verbatim in source with correct shapes; transport parameters verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 55NU850BPSA Series Control Spec

## Summary
Control spec for the LG 55NU850BPSA Series TV, covering both RS-232 (DE9 / phone-jack / USB-to-serial) and TCP/IP (telnet on port 9761) control surfaces documented in the vendor Owner's Manual. The serial protocol uses a "Command1 Command2 SetID Data CR" frame with carriage-return delimited ASCII fields; the IP control surface uses word-style commands over telnet.

<!-- UNRESOLVED: Network IP Control section in the source is annotated "(For USA only)"; applicability to the 55NU850BPSA region SKU is not stated. -->
<!-- UNRESOLVED: ISM Method (j p) is documented as "Only Plasma TV" — the 55NU850BPSA is an LED/LCD SKU and the command may be unsupported. Included as documented. -->
<!-- UNRESOLVED: 3D commands (x t, x v) and PICTURE_3D / PICTURE_3D_EXTENSION are documented as "only 3D models"; 55NU850BPSA is not a 3D SKU. Included as documented. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9761  # IP control telnet port, stated in source
serial:
  baud_rate: 9600  # stated: "9600 bps (UART)"
  data_bits: 8     # stated: "Data length : 8 bits"
  parity: none     # stated: "Parity : None"
  stop_bits: 1     # stated: "Stop bit : 1 bit"
  flow_control: none
  cable: crossed_reverse  # stated: "Use a crossed (reverse) cable"
  encoding: ASCII
auth:
  type: none  # inferred: no wire-level auth shown in the telnet session example
# Note: the IP Control Setup menu is gated by a 3-digit PIN (default 828)
# entered via remote; this is a one-time device-side menu unlock, not a
# per-session wire credential.
```

## Traits
```yaml
- powerable       # inferred from ka (RS-232) and POWER (IP) commands
- routable        # inferred from x b / INPUT_SELECT commands
- queryable       # inferred from "FF" read status on RS-232 commands
- levelable       # inferred from volume / brightness / contrast / etc. commands
```

## Actions

### RS-232 (serial, 9600 8N1, ASCII)

Frame: `{cmd1}{cmd2} {set_id} {data}\r` where set_id is hex (`00`=broadcast, `01`-`0x63`=1-99) and data is hex. `data=FF` reads current state for most commands. Acknowledgement: `{cmd2} {set_id} OK|NG {data} x`.

```yaml
- id: rs232_power
  label: RS-232 Power
  kind: action
  command: "ka {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
      description: Set ID (00 broadcast, 01-0x63 for 1-99)
    - name: data
      type: hex
      enum: ["00", "01"]
      description: 00 = Power Off, 01 = Power On

- id: rs232_power_status
  label: RS-232 Power Status Query
  kind: query
  command: "ka {set_id} FF\r"
  params:
    - name: set_id
      type: hex

- id: rs232_aspect_ratio
  label: RS-232 Aspect Ratio
  kind: action
  command: "kc {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      enum: ["01", "02", "04", "05", "06", "07", "09", "0B", "0C", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1A", "1B", "1C", "1D", "1E", "1F"]
      description: "01=Normal 4:3, 02=Wide 16:9, 04=Zoom, 05=Zoom 2, 06=Set by Program/Original, 07=14:9, 09=Just Scan, 0B=Full Wide, 0C=21:9, 10-1F=Cinema Zoom 1-16"

- id: rs232_screen_mute
  label: RS-232 Screen Mute
  kind: action
  command: "kd {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      enum: ["00", "01", "10"]
      description: "00=Screen mute off (Picture on) & Video mute off, 01=Screen mute on (Picture off), 10=Video mute on"

- id: rs232_volume_mute
  label: RS-232 Volume Mute
  kind: action
  command: "ke {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      enum: ["00", "01"]
      description: "00=Volume mute on (Volume off), 01=Volume mute off (Volume on)"

- id: rs232_volume_control
  label: RS-232 Volume Control
  kind: action
  command: "kf {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: "Volume 00-64 (hex). Use FF to read."

- id: rs232_contrast
  label: RS-232 Contrast
  kind: action
  command: "kg {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: "Contrast 00-64"

- id: rs232_brightness
  label: RS-232 Brightness
  kind: action
  command: "kh {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: "Brightness 00-64"

- id: rs232_color
  label: RS-232 Color
  kind: action
  command: "ki {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: "Color 00-64"

- id: rs232_tint
  label: RS-232 Tint
  kind: action
  command: "kj {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: "Tint 00 (Red) to 64 (Green)"

- id: rs232_sharpness
  label: RS-232 Sharpness
  kind: action
  command: "kk {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: "Sharpness 00-32"

- id: rs232_osd_select
  label: RS-232 OSD Select
  kind: action
  command: "kl {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      enum: ["00", "01"]
      description: "00=OSD off, 01=OSD on"

- id: rs232_remote_control_lock
  label: RS-232 Remote Control Lock Mode
  kind: action
  command: "km {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      enum: ["00", "01"]
      description: "00=Lock off, 01=Lock on (front panel + remote)"

- id: rs232_treble
  label: RS-232 Treble
  kind: action
  command: "kr {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: "Treble 00-64"
  notes: "Source Ack frame for this command is documented as `[u] [Set ID] ...`; this is a source typo. Treat the echo letter as `r` (matching the command)."

- id: rs232_bass
  label: RS-232 Bass
  kind: action
  command: "ks {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: "Bass 00-64"

- id: rs232_balance
  label: RS-232 Balance
  kind: action
  command: "kt {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: "Balance 00-64"

- id: rs232_color_temperature
  label: RS-232 Color Temperature
  kind: action
  command: "xu {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: "Color temperature 00-64"
  notes: "Source Ack frame for this command is documented as `[l] [Set ID] ...`; treat as source typo. Ack letter should be `u`."

- id: rs232_ism_method
  label: RS-232 ISM Method (Plasma only)
  kind: action
  command: "jp {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      enum: ["02", "08", "20"]
      description: "02=Orbiter, 08=Normal, 20=Color Wash. Plasma only - may be unsupported on LED SKU 55NU850BPSA."

- id: rs232_equalizer
  label: RS-232 Equalizer
  kind: action
  command: "jv {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: |
        Single hex byte, MSB-first:
        bits 7-5 = frequency band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th)
        bits 4-0 = step (0-20 decimal)
        Source example: band 4 step 19 -> 011 10011b -> 0x73; band 5 step 20 -> 100 10101b -> 0x95.
        Precondition: Sound Mode = EQ-adjustable.

- id: rs232_energy_saving
  label: RS-232 Energy Saving
  kind: action
  command: "jq {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      enum: ["00", "01", "02", "03", "04", "05"]
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto (LCD/LED) / Intelligent sensor (PDP), 05=Screen off"

- id: rs232_tune_command_eu
  label: RS-232 Tune Command (Europe / Mid-East / Colombia / Asia except KR/JP)
  kind: action
  command: "ma {set_id} {data00} {data01} {data02}\r"
  params:
    - name: set_id
      type: hex
    - name: data00
      type: hex
      description: Channel data high byte
    - name: data01
      type: hex
      description: Channel data low byte
    - name: data02
      type: hex
      description: "Input source: 00=Antenna TV (ATV), 80=Cable TV (CATV) - analog; 10=Antenna DTV; 40=Satellite SDTV; 20=Antenna Radio; 50=Satellite Radio; 90=Cable CADTV; A0=Cable CA-Radio"
  notes: "Channel range 0x0000-0xC7 (0-199 decimal) for analog; 0x0000-0x270F (0-9999) for digital."

- id: rs232_tune_command_us_jp
  label: RS-232 Tune Command (US ATSC / Japan ISDB)
  kind: action
  command: "ma 00 {data00} {data01} {data02} {data03} {data04} {data05}\r"
  params:
    - name: data00
      type: hex
      description: Physical channel number (or 00 if unknown)
    - name: data01
      type: hex
      description: Major channel high
    - name: data02
      type: hex
      description: Major channel low
    - name: data03
      type: hex
      description: Minor channel high
    - name: data04
      type: hex
      description: Minor channel low
    - name: data05
      type: hex
      description: "US: 22=Antenna DTV (don't use physical), 26=Cable CADTV (don't use physical), 46=Cable CADTV (physical/major one-part), 66=Cable CADTV (major one-part). JP: 02=Antenna DTV, 07=BS, 08=CS1, 09=CS2."

- id: rs232_channel_add_del
  label: RS-232 Channel Add/Del (Skip)
  kind: action
  command: "mb {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      enum: ["00", "01"]
      description: "00=Del (ATSC/ISDB) / Skip (DVB), 01=Add"

- id: rs232_key
  label: RS-232 IR Key Code Send
  kind: action
  command: "mc {set_id} {keycode}\r"
  params:
    - name: set_id
      type: hex
    - name: keycode
      type: hex
      description: "IR key code per source table: 00=CH+, 01=CH-, 02=Vol+, 03=Vol-, 06=Right, 07=Left, 08=Power, 09=Mute, 0B=Input, 0E=Sleep, 0F=TV, 10-19=Number 0-9, 1A=Q.View/Flashback, 1E=FAV, 20=Teletext, 21=T.Opt, 28=Return, 30=AV, 39=Caption/Subtitle, 40=Up, 41=Down, 42=MyApps, 43=Menu, 44=OK, 45=Q.Menu, 4C=List (ATSC/ISDB only), 4D=Picture, 52=Sound, 53=List, 5B=Exit, 60=PIP(AD), 61=Blue, 63=Yellow, 71=Green, 72=Red, 79=Ratio, 7A=User Guide, 7C=Smart/Home, 7E=Simplink, 8E=FF, 8F=REW, 91=AD, 9B=TV/PC, 9E=Live Menu, 9F=App/*, 99=AutoConfig, AA=Info, AB=Program Guide, B0=Play, B1=Stop, B5=Recent, BA=Freeze/Pause, BB=Soccer, BD=REC, DC=3D"

- id: rs232_backlight
  label: RS-232 Control Backlight
  kind: action
  command: "mg {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: "Backlight 00-64. Precondition: Energy Saving = Off."

- id: rs232_panel_light
  label: RS-232 Control Panel Light
  kind: action
  command: "mg {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: "Panel light 00-64. Same opcode as backlight; applicability is model-dependent."

- id: rs232_input_select
  label: RS-232 Input Select (Main)
  kind: action
  command: "xb {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      enum: ["00", "01", "02", "03", "04", "10", "11", "20", "21", "40", "41", "60", "90", "91", "92", "93"]
      description: "00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1, 04=ISDB-CS2, 10=ATV, 11=CATV, 20=AV/AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4. Note: HDMI4 (93) marked ISDB-BS (Japan) in source - model-dependent."

- id: rs232_3d
  label: RS-232 3D (3D models only)
  kind: action
  command: "xt {set_id} {data00} {data01} {data02} {data03}\r"
  params:
    - name: set_id
      type: hex
    - name: data00
      type: hex
      enum: ["00", "01", "02", "03"]
      description: "00=3D On, 01=3D Off, 02=3D to 2D, 03=2D to 3D"
    - name: data01
      type: hex
      enum: ["00", "01", "02", "03", "04", "05"]
      description: "3D pattern: 00=Top-Bottom, 01=Side-by-Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving"
    - name: data02
      type: hex
      enum: ["00", "01"]
      description: "L/R order (Plasma): 00=Right-to-Left, 01=Left-to-Right"
    - name: data03
      type: hex
      description: "3D depth 00-14 (hex). Only meaningful when Data00=00 or 03, and 3D Genre=Manual."
  notes: "3D models only. 55NU850BPSA is not a 3D SKU - command may be unsupported."

- id: rs232_extended_3d
  label: RS-232 Extended 3D (3D models only)
  kind: action
  command: "xv {set_id} {data00} {data01}\r"
  params:
    - name: set_id
      type: hex
    - name: data00
      type: hex
      enum: ["00", "01", "02", "06", "07", "08", "09"]
      description: "00=3D Picture Correction, 01=3D Depth (Manual only), 02=3D Viewpoint, 06=3D Color Correction, 07=3D Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre)"
    - name: data01
      type: hex
      description: "Sub-value: when Data00=00, 0=R-to-L, 1=L-to-R. When Data00=01 or 02, 0-14 (0-20 step = -10..+10 viewpoint). When Data00=06/07/08, 0=Off, 1=On. When Data00=09, 0=Standard, 1=Sport, 2=Cinema, 3=Extreme, 4=Manual, 5=Auto."
  notes: "3D models only. 55NU850BPSA is not a 3D SKU."

- id: rs232_auto_configure
  label: RS-232 Auto Configure (RGB/PC)
  kind: action
  command: "ju {set_id} 01\r"
  params:
    - name: set_id
      type: hex
  notes: "Works only in RGB (PC) input. Model-dependent."
```

### Network IP Control (TCP telnet, port 9761)

```yaml
- id: ip_power
  label: IP Power
  kind: action
  command: "POWER {state}\r"
  params:
    - name: state
      type: enum
      enum: ["on", "off"]
      description: "Source example shows only `POWER off`. `on` is the implicit opposite."

- id: ip_aspect_ratio
  label: IP Aspect Ratio
  kind: action
  command: "ASPECT_RATIO {mode}\r"
  params:
    - name: mode
      type: enum
      enum: ["4by3", "16by9", "setbyoriginal"]

- id: ip_screen_mute
  label: IP Screen Mute
  kind: action
  command: "SCREEN_MUTE {mode}\r"
  params:
    - name: mode
      type: enum
      enum: ["screenmuteon", "videomuteon", "allmuteoff"]

- id: ip_volume_mute
  label: IP Volume Mute
  kind: action
  command: "VOLUME_MUTE {state}\r"
  params:
    - name: state
      type: enum
      enum: ["on", "off"]

- id: ip_volume_control
  label: IP Volume Control
  kind: action
  command: "VOLUME_CONTROL {level}\r"
  params:
    - name: level
      type: integer
      description: "0-100 decimal"

- id: ip_picture_contrast
  label: IP Picture Contrast
  kind: action
  command: "PICTURE_CONTRAST {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100 decimal"

- id: ip_picture_brightness
  label: IP Picture Brightness
  kind: action
  command: "PICTURE_BRIGHTNESS {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100 decimal"

- id: ip_picture_colour
  label: IP Picture Color
  kind: action
  command: "PICTURE_COLOUR {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100 decimal"

- id: ip_picture_tint
  label: IP Picture Tint
  kind: action
  command: "PICTURE_TINT {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100 decimal"

- id: ip_picture_sharpness
  label: IP Picture Sharpness
  kind: action
  command: "PICTURE_SHARPNESS {value}\r"
  params:
    - name: value
      type: integer
      description: "0-50 decimal"

- id: ip_osd_select
  label: IP OSD Select
  kind: action
  command: "OSD_SELECT {state}\r"
  params:
    - name: state
      type: enum
      enum: ["on", "off"]

- id: ip_remote_lock
  label: IP Remote Control Lock
  kind: action
  command: "REMOTECONTROLER_LOCK {state}\r"
  params:
    - name: state
      type: enum
      enum: ["on", "off"]

- id: ip_audio_balance
  label: IP Audio Balance
  kind: action
  command: "AUDIO_BALANCE {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100 decimal"

- id: ip_picture_colour_temperature
  label: IP Picture Color Temperature
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100 decimal"

- id: ip_audio_equalizer
  label: IP Audio Equalizer
  kind: action
  command: "AUDIO_EQUALIZER {band} {step}\r"
  params:
    - name: band
      type: integer
      description: "1-5 (frequency band)"
    - name: step
      type: integer
      description: "0-20 decimal"
  notes: "Precondition: All settings > Sound > Sound Mode > Equalizer = On."

- id: ip_energy_saving
  label: IP Energy Saving
  kind: action
  command: "ENERGY_SAVING {mode}\r"
  params:
    - name: mode
      type: enum
      enum: ["screenoff", "maximum", "medium", "minimum", "off"]

- id: ip_tune_atsc_atv_antenna
  label: IP Tune ATSC/ATV Antenna
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} antenna\r"
  params:
    - name: channel
      type: integer

- id: ip_tune_atsc_atv_cable
  label: IP Tune ATSC/ATV Cable
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} cable\r"
  params:
    - name: channel
      type: integer

- id: ip_tune_atsc_dtv_cable_notphy
  label: IP Tune ATSC DTV Cable (no physical)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {channel} cablenotphy\r"
  params:
    - name: channel
      type: integer

- id: ip_tune_atsc_dtv_antenna_notphy
  label: IP Tune ATSC DTV Antenna (no physical, major/minor)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} antennanotphy\r"
  params:
    - name: major
      type: integer
    - name: minor
      type: integer

- id: ip_tune_atsc_dtv_cable_major_minor
  label: IP Tune ATSC DTV Cable (no physical, major/minor)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} cablenotphy\r"
  params:
    - name: major
      type: integer
    - name: minor
      type: integer

- id: ip_channel_add_delete
  label: IP Channel Add/Delete
  kind: action
  command: "CHANNEL_ADD_DELETE {mode}\r"
  params:
    - name: mode
      type: enum
      enum: ["add", "delete"]

- id: ip_key_action
  label: IP Key Action (IR code)
  kind: action
  command: "KEY_ACTION {key}\r"
  params:
    - name: key
      type: enum
      enum: ["exit", "channelup", "channeldown", "volumeup", "volumedown", "arrowright", "arrowleft", "volumemute", "deviceinput", "sleepreserve", "livetv", "previouschannel", "favoritechannel", "teletext", "teletextoption", "returnback", "avmode", "captionsubtitle", "arrowup", "arrowdown", "myapp", "settingmenu", "ok", "quickmenu", "videomode", "audiomode", "channellist", "bluebutton", "yellowbutton", "greenbutton", "redbutton", "aspectratio", "audiodescription", "programmorder", "userguide", "smarthome", "simplelink", "fastforward", "rewind", "programminfo", "programguide", "play", "slowplay", "soccerscreen", "record", "3d", "autoconfig", "app", "screenbright", "number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9"]

- id: ip_picture_backlight
  label: IP Picture Backlight
  kind: action
  command: "PICTURE_BACKLIGHT {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100 decimal"
  notes: "Precondition: All settings > Picture > Energy Saving = Off."

- id: ip_input_select
  label: IP Input Select
  kind: action
  command: "INPUT_SELECT {input}\r"
  params:
    - name: input
      type: enum
      enum: ["dtv", "atv", "cadtv", "catv", "avav1", "component1", "hdmi1", "hdmi2", "hdmi3"]
      description: "Source enumerates dtv/atv/cadtv/catv/avav1/component1/hdmi1-3. Other inputs listed for RS-232 (AV2, Component2, RGB, HDMI4, ISDB variants) not enumerated in IP table."

- id: ip_picture_3d_off
  label: IP Picture 3D Off / 3D-to-2D
  kind: action
  command: "PICTURE_3D {mode}\r"
  params:
    - name: mode
      type: enum
      enum: ["off", "3dto2d"]
  notes: "3D models only."

- id: ip_picture_3d_2dto3d
  label: IP Picture 3D 2D-to-3D
  kind: action
  command: "PICTURE_3D 2dto3d {lrorder} {depth}\r"
  params:
    - name: lrorder
      type: enum
      enum: ["righttoleft", "lefttoright"]
    - name: depth
      type: integer
      description: "0-20 decimal"
  notes: "3D models only."

- id: ip_picture_3d_on
  label: IP Picture 3D On
  kind: action
  command: "PICTURE_3D on {pattern} {lrorder} {depth}\r"
  params:
    - name: pattern
      type: enum
      enum: ["topandbottom", "sidebyside", "checkboard", "framesequential", "columninterleaving", "rowinterleaving"]
    - name: lrorder
      type: enum
      enum: ["righttoleft", "lefttoright"]
    - name: depth
      type: integer
      description: "0-20 decimal; effective only when 3D Genre = Manual."
  notes: "3D models only."

- id: ip_picture_3d_extension_picturecorrection
  label: IP 3D Extension Picture Correction
  kind: action
  command: "PICTURE_3D_EXTENSION picturecorrection {lr}\r"
  params:
    - name: lr
      type: enum
      enum: ["0", "1"]
      description: "0=Right-to-Left, 1=Left-to-Right"
  notes: "Precondition: PICTURE_3D on X X X. 3D models only."

- id: ip_picture_3d_extension_color_or_sound
  label: IP 3D Extension Color Correction / Sound
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {state}\r"
  params:
    - name: option
      type: enum
      enum: ["colorcorrection", "sound"]
    - name: state
      type: enum
      enum: ["0", "1"]
      description: "0=Off, 1=On"
  notes: "Precondition: PICTURE_3D on X X X. 3D models only."

- id: ip_picture_3d_extension_normal
  label: IP 3D Extension Normal Image View
  kind: action
  command: "PICTURE_3D_EXTENSION normal {state}\r"
  params:
    - name: state
      type: enum
      enum: ["0", "1"]
      description: "0=Off, 1=On"
  notes: "Precondition: PICTURE_3D on X X X. 3D models only."

- id: ip_picture_3d_extension_depth_viewpoint
  label: IP 3D Extension Depth / Viewpoint
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {value}\r"
  params:
    - name: option
      type: enum
      enum: ["depth", "viewpoint"]
    - name: value
      type: integer
      description: "0-20 (decimal). 0=-10, 20=+10 on viewpoint scale."
  notes: "Precondition: PICTURE_3D 2dto3d X X. Depth additionally requires PICTURE_3D_EXTENSION genre 4 (Manual). 3D models only."

- id: ip_picture_3d_extension_genre
  label: IP 3D Extension Genre
  kind: action
  command: "PICTURE_3D_EXTENSION genre {value}\r"
  params:
    - name: value
      type: enum
      enum: ["0", "1", "2", "3", "4", "5"]
      description: "0=Standard, 1=Sport, 2=Cinema, 3=Extreme, 4=Manual, 5=Auto"
  notes: "Precondition: PICTURE_3D 2dto3d X X. 3D models only."
```

## Feedbacks
```yaml
- id: rs232_ack
  type: string
  description: |
    RS-232 acknowledgement frame: `{cmd2} {set_id} OK|NG {data} x`.
    `OK` = normal; `NG Data 00` = Illegal Code / non-viable function / comm error.
    For data-read mode (`data=FF`) the OK frame echoes the current state.

- id: ip_ack
  type: enum
  values: [ok, ng]
  description: |
    IP control sends `OK` on success and `NG` on failure. The session
    greeting is blank or `NG` on a stray Enter - both indicate the link
    is established.

- id: power_state
  type: enum
  values: [on, off]
  description: Power state returned by `ka` query (`data=FF`) on RS-232.

- id: input_source
  type: enum
  values: [dtv, cadtv, satellite_dtv, isdb_cs1, isdb_cs2, isdb_bs, atv, catv, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]
  description: Current main input source, returned by `xb` query.

- id: volume_state
  type: integer
  description: Current volume 00-64 (hex) returned by `kf` query.
```

## Variables
```yaml
# UNRESOLVED: source does not expose a separate "Variable" concept distinct
# from data fields of the Actions above. All settable parameters (volume,
# contrast, etc.) are encoded as the data byte(s) of the corresponding
# command and are listed inline under Actions.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited asynchronous
# notifications from the device. The RS-232 and IP surfaces are request/ACK
# only; nothing pushes without an inbound command.
```

## Macros
```yaml
# UNRESOLVED: source does not document any device-side macro language or
# multi-step sequencing. Multi-step behaviour is achieved by the controller
# sending discrete actions in sequence.
```

## Safety
```yaml
confirmation_required_for:
  - id: rs232_screen_mute
    reason: "Screen mute ON / video mute ON will cut the picture; may surprise a viewer."
  - id: rs232_remote_control_lock
    reason: "Lock ON disables both the front-panel controls and the IR remote. The user must perform a plug-cycle (20-30 s) to recover if they lose the control link."
interlocks:
  - id: media_playback_block
    description: "During media playback or recording, all RS-232 and IP commands except Power (ka/POWER) and Key (mc/KEY_ACTION) are rejected with NG. Also true for IP surface per source note."
  - id: key_lock_blocks_power_on
    description: "If key lock is ON and the TV is in standby (DC off via off-timer, `ka` Power Off, or `mc` Power Key), the TV will not turn on via IR or local key. Recovery requires a main-power cycle."
  - id: rs232_power_link_behavior
    description: "With RS-232C cable the `ka` command works in both power-on and power-off states. With USB-to-serial converter cable, `ka` works only while the TV is on."
  - id: usb_serial_chip_requirement
    description: "USB-to-serial path requires a PL2303-based adapter (Vendor ID 0x0557, Product ID 0x2008). Other chipsets are not supported."
# UNRESOLVED: voltage / current / power-consumption specs are not stated in
# this control-protocol excerpt and must not be inferred.
```

## Notes
- The source contains two distinct control surfaces: a request/ACK RS-232 protocol (380-byte `ka`/`ma`/etc. with `0x0D` terminator) and a word-style IP control protocol over telnet on TCP/9761. Both are listed separately under Actions; do not assume parity between the two sets of mnemonics.
- RS-232 frame layout: `[Command1][Command2][space][SetID][space][Data][Cr]`. Command1 is one of `j`, `k`, `m`, `x`. SetID is hex `00`-`0x63` (`00` = broadcast to all connected sets). Data is hex; `FF` requests a read of the current state. Spaces are literal ASCII `0x20`; Cr is literal ASCII `0x0D`.
- Several RS-232 Acknowledgement frames in the source are documented with an echo letter that does not match Command2 (`kr` -> `[u]`, `kj` -> `[r]`, `xu` -> `[l]`). These appear to be source typos; implementers should treat the echo letter as the same as Command2.
- IP control setup requires entering `IP Control Setup` (hold Settings on the remote for 5 s on Live TV, enter 828, OK) and toggling `Network IP Control` to On, after which the TV reboots. Default PIN is `828`; can be changed via `Password Change`. The 828 PIN is a device-side menu unlock, not a per-session wire credential — the telnet session itself does not show authentication.
- WOL (Wake-on-LAN) is documented as a separate, opt-in feature: requires `Mobile TV On = On` in settings and a third-party WOL app on a phone. Not part of the in-band telnet/RS-232 protocol.
- "During playing or recording media, all commands except Power and Key are not executed and treated as NG" applies to both RS-232 and IP surfaces per the source.
- Many commands carry a `(Depending on model)` annotation in the source. 55NU850BPSA is an LED/LCD SKU, so plasma-only `jp` (ISM Method) and 3D-only `xt`/`xv` and `PICTURE_3D*` commands may be no-ops or rejected with NG on this specific set. The spec includes them so that an implementer can probe and fall back gracefully.
- The 55NU850BPSA series is the primary target model. Other SKUs in the same Owner's Manual may share this protocol but with feature-set differences noted above.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: protocol version (LG EXTERNAL CONTROL DEVICE SETUP revision) not stated in source. -->
<!-- UNRESOLVED: maximum polling rate, minimum inter-command delay, and timeout/retry behaviour for both RS-232 and IP surfaces are not stated in source. -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T02:42:36.404Z
last_checked_at: 2026-06-02T03:24:46.638Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T03:24:46.638Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 RS-232 action commands matched verbatim in source with correct shapes; transport parameters verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Network IP Control section in the source is annotated \"(For USA only)\"; applicability to the 55NU850BPSA region SKU is not stated."
- "ISM Method (j p) is documented as \"Only Plasma TV\" — the 55NU850BPSA is an LED/LCD SKU and the command may be unsupported. Included as documented."
- "3D commands (x t, x v) and PICTURE_3D / PICTURE_3D_EXTENSION are documented as \"only 3D models\"; 55NU850BPSA is not a 3D SKU. Included as documented."
- "source does not expose a separate \"Variable\" concept distinct"
- "source does not document any unsolicited asynchronous"
- "source does not document any device-side macro language or"
- "voltage / current / power-consumption specs are not stated in"
- "firmware version compatibility not stated in source."
- "protocol version (LG EXTERNAL CONTROL DEVICE SETUP revision) not stated in source."
- "maximum polling rate, minimum inter-command delay, and timeout/retry behaviour for both RS-232 and IP surfaces are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
