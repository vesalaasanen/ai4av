---
spec_id: admin/lg-55um7300pua-smarttv
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55UM7300PUA SmartTV Control Spec"
manufacturer: LG
model_family: 55UM7300PUA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 55UM7300PUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - openhab.org
  - proaudioinc.com
  - gscs-b2c.lge.com
source_urls:
  - https://www.openhab.org/addons/bindings/lgtvserial/
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - "https://gscs-b2c.lge.com/downloadFile?fileId=KROWM000526118.pdf"
retrieved_at: 2026-06-02T04:20:02.894Z
last_checked_at: 2026-06-02T04:20:02.894Z
generated_at: 2026-06-02T04:20:02.894Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IP control is documented as USA-only; behavior on non-USA firmware is not stated."
  - "firmware version compatibility across model years not stated in source."
  - "WOL magic-packet format not stated in source."
  - "whether non-USA firmwares expose the IP control telnet interface is not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T04:20:02.894Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions matched literally to source commands with correct shapes and parameters; transport fully verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 55UM7300PUA SmartTV Control Spec

## Summary
LG 55UM7300PUA SmartTV external control spec covering both RS-232C serial (DE9/USB-to-serial) and wired/wireless TCP/IP (telnet) interfaces. Source is the LG Owner's Manual "External Control Device Setup" section, which documents the full ASCII command set for power, picture, audio, channel, input, 3D, and IR-key passthrough. IP control is "For USA only" per the source; serial control is universal across the model series.

<!-- UNRESOLVED: IP control is documented as USA-only; behavior on non-USA firmware is not stated. -->

## Transport
```yaml
# Both serial and TCP are documented. IP is documented as USA-only.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  communication_code: ascii
  cable: crossed_reverse  # UNRESOLVED beyond "Use a crossed (reverse) cable"
addressing:
  port: 9761  # TCP port stated for IP control; telnet service
auth:
  type: none  # inferred: no wire-level auth in source (IP menu has default PIN 828, but that gates UI access, not the socket)
```

## Traits
```yaml
# - powerable       (ka / POWER)
# - levelable       (volume, bass, treble, balance, brightness, contrast, color, tint, sharpness, backlight, colour temperature)
# - routable        (xb / INPUT_SELECT, channel ma / CHANNEL_SETTING)
# - queryable       (FF data byte returns current state via ACK)
```

## Actions
```yaml
# Serial framing (RS-232C and USB-to-serial):
#   [Command1][Command2][ ][Set ID][ ][Data][Cr]
#   e.g. "ka 00 01\r"  (Power On, Set ID 0 = all TVs, ASCII 0x0D terminator)
# IP framing (telnet, port 9761):
#   COMMAND_NAME arg1 arg2 ...\n
#   e.g. "POWER on\n"  (terminated by Enter; server replies "OK" or "NG")
# Set ID range 0-99 (0x00-0x63); 0 = broadcast to all connected sets.
# Default Set ID in templates below is 00.

# =========================================================================
# IP CONTROL (TCP, port 9761) - primary action set
# =========================================================================

- id: ip_power
  label: IP Power
  kind: action
  command: "POWER {state}\n"
  params:
    - name: state
      type: string
      description: on | off

- id: ip_power_query
  label: IP Power Query
  kind: query
  command: "POWER ?\n"

- id: ip_aspect_ratio
  label: IP Aspect Ratio
  kind: action
  command: "ASPECT_RATIO {mode}\n"
  params:
    - name: mode
      type: string
      description: 4by3 | 16by9 | setbyoriginal

- id: ip_screen_mute
  label: IP Screen Mute
  kind: action
  command: "SCREEN_MUTE {mode}\n"
  params:
    - name: mode
      type: string
      description: screenmuteon | videomuteon | allmuteoff

- id: ip_volume_mute
  label: IP Volume Mute
  kind: action
  command: "VOLUME_MUTE {state}\n"
  params:
    - name: state
      type: string
      description: on | off

- id: ip_volume_control
  label: IP Volume Control
  kind: action
  command: "VOLUME_CONTROL {level}\n"
  params:
    - name: level
      type: integer
      description: 0-100 (decimal)

- id: ip_picture_contrast
  label: IP Picture Contrast
  kind: action
  command: "PICTURE_CONTRAST {level}\n"
  params:
    - name: level
      type: integer
      description: 0-100 (decimal)

- id: ip_picture_brightness
  label: IP Picture Brightness
  kind: action
  command: "PICTURE_BRIGHTNESS {level}\n"
  params:
    - name: level
      type: integer
      description: 0-100 (decimal)

- id: ip_picture_colour
  label: IP Picture Colour
  kind: action
  command: "PICTURE_COLOUR {level}\n"
  params:
    - name: level
      type: integer
      description: 0-100 (decimal)

- id: ip_picture_tint
  label: IP Picture Tint
  kind: action
  command: "PICTURE_TINT {level}\n"
  params:
    - name: level
      type: integer
      description: 0-100 (decimal)

- id: ip_picture_sharpness
  label: IP Picture Sharpness
  kind: action
  command: "PICTURE_SHARPNESS {level}\n"
  params:
    - name: level
      type: integer
      description: 0-50 (decimal)

- id: ip_osd_select
  label: IP OSD Select
  kind: action
  command: "OSD_SELECT {state}\n"
  params:
    - name: state
      type: string
      description: on | off

- id: ip_remotecontroler_lock
  label: IP Remote Control Lock
  kind: action
  command: "REMOTECONTROLER_LOCK {state}\n"
  params:
    - name: state
      type: string
      description: on | off

- id: ip_audio_balance
  label: IP Audio Balance
  kind: action
  command: "AUDIO_BALANCE {level}\n"
  params:
    - name: level
      type: integer
      description: 0-100 (decimal)

- id: ip_picture_colour_temperature
  label: IP Picture Colour Temperature
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {level}\n"
  params:
    - name: level
      type: integer
      description: 0-100 (decimal)

- id: ip_audio_equalizer
  label: IP Audio Equalizer
  kind: action
  command: "AUDIO_EQUALIZER {band} {step}\n"
  params:
    - name: band
      type: integer
      description: 1-5 (frequency band; precondition: Sound Mode = Equalizer adjustable)
    - name: step
      type: integer
      description: 0-20 (decimal step)

- id: ip_energy_saving
  label: IP Energy Saving
  kind: action
  command: "ENERGY_SAVING {mode}\n"
  params:
    - name: mode
      type: string
      description: screenoff | maximum | medium | minimum | off

- id: ip_channel_setting_atsc_atv
  label: IP Channel Tune (ATSC ATV)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} {source}\n"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: source
      type: string
      description: antenna | cable

- id: ip_channel_setting_atsc_dtv_phy
  label: IP Channel Tune (ATSC DTV, physical)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {channel} cablenotphy\n"
  params:
    - name: channel
      type: integer
      description: Channel number

- id: ip_channel_setting_atsc_dtv_major_minor
  label: IP Channel Tune (ATSC DTV, major/minor)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} {source}notphy\n"
  params:
    - name: major
      type: integer
      description: Major channel number
    - name: minor
      type: integer
      description: Minor channel number
    - name: source
      type: string
      description: antenna | cable

- id: ip_channel_add_delete
  label: IP Channel Add/Delete
  kind: action
  command: "CHANNEL_ADD_DELETE {op}\n"
  params:
    - name: op
      type: string
      description: add | delete

- id: ip_key_action
  label: IP Key Action (IR passthrough)
  kind: action
  command: "KEY_ACTION {key}\n"
  params:
    - name: key
      type: string
      description: exit | channelup | channeldown | volumeup | volumedown | arrowright | arrowleft | volumemute | deviceinput | sleepreserve | livetv | previouschannel | favoritechannel | teletext | teletextoption | returnback | avmode | captionsubtitle | arrowup | arrowdown | myapp | settingmenu | ok | quickmenu | videomode | audiomode | channellist | bluebutton | yellowbutton | greenbutton | redbutton | aspectratio | audiodescription | programmorder | userguide | smarthome | simplelink | fastforward | rewind | programminfo | programguide | play | slowplay | soccerscreen | record | 3d | autoconfig | app | screenbright | number0 | number1 | number2 | number3 | number4 | number5 | number6 | number7 | number8 | number9

- id: ip_picture_backlight
  label: IP Picture Backlight
  kind: action
  command: "PICTURE_BACKLIGHT {level}\n"
  params:
    - name: level
      type: integer
      description: 0-100 (decimal; precondition: Energy Saving = off)

- id: ip_input_select
  label: IP Input Select
  kind: action
  command: "INPUT_SELECT {source}\n"
  params:
    - name: source
      type: string
      description: dtv | atv | cadtv | catv | avav1 | component1 | hdmi1 | hdmi2 | hdmi3

- id: ip_picture_3d
  label: IP Picture 3D
  kind: action
  command: "PICTURE_3D {args}\n"
  params:
    - name: args
      type: string
      description: "Three documented forms: (a) PICTURE_3D {off|3dto2d}; (b) PICTURE_3D 2dto3d {righttoleft|lefttoright} {0-20}; (c) PICTURE_3D on {topandbottom|sidebyside|checkboard|framesequential|columninterleaving|rowinterleaving} {righttoleft|lefttoright} {0-20}. Only 3D models; (Depending on model)."

- id: ip_picture_3d_extension
  label: IP Picture 3D Extension
  kind: action
  command: "PICTURE_3D_EXTENSION {args}\n"
  params:
    - name: args
      type: string
      description: "Five documented forms: (a) PICTURE_3D_EXTENSION picturecorrection {0|1}; (b) PICTURE_3D_EXTENSION {colorcorrection|sound} {0|1}; (c) PICTURE_3D_EXTENSION normal {0|1}; (d) PICTURE_3D_EXTENSION {depth|viewpoint} {0-20}; (e) PICTURE_3D_EXTENSION genre {0-5} (0=Standard,1=Sport,2=Cinema,3=Extreme,4=Manual,5=Auto). Preconditions apply per source. Only 3D models."

# =========================================================================
# SERIAL CONTROL (RS-232C 9600/8N1 + USB-to-serial PL2303)
# =========================================================================

- id: serial_power
  label: Power
  kind: action
  command: "ka {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99 (0=broadcast, 1-99=target Set ID, hex)
    - name: data
      type: string
      description: 00 = Power Off, 01 = Power On

- id: serial_power_query
  label: Power Query
  kind: query
  command: "ka {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: 0-99

- id: serial_aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "kc {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: string
      description: 01=Normal(4:3) 02=Wide(16:9) 04=Zoom 05=Zoom2 06=Set by Program/Original 07=14:9 09=Just Scan 0B=Full Wide 0C=21:9 10-1F=Cinema Zoom 1-16

- id: serial_screen_mute
  label: Screen Mute
  kind: action
  command: "kd {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: string
      description: 00=Screen mute off 01=Screen mute on 10=Video mute on

- id: serial_volume_mute
  label: Volume Mute
  kind: action
  command: "ke {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: string
      description: 00=Mute on 01=Mute off

- id: serial_volume_control
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: integer
      description: 00-64

- id: serial_contrast
  label: Contrast
  kind: action
  command: "kg {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: integer
      description: 00-64

- id: serial_brightness
  label: Brightness
  kind: action
  command: "kh {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: integer
      description: 00-64

- id: serial_colour
  label: Colour
  kind: action
  command: "ki {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: integer
      description: 00-64

- id: serial_tint
  label: Tint
  kind: action
  command: "kj {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: integer
      description: 00-64 (00=Red, 64=Green; "Depending on model")

- id: serial_sharpness
  label: Sharpness
  kind: action
  command: "kk {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: integer
      description: 00-32 ("Depending on model")

- id: serial_osd_select
  label: OSD Select
  kind: action
  command: "kl {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: string
      description: 00=OSD off 01=OSD on

- id: serial_remote_lock
  label: Remote Control Lock
  kind: action
  command: "km {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: string
      description: 00=Lock off 01=Lock on

- id: serial_treble
  label: Treble
  kind: action
  command: "kr {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: integer
      description: 00-64 (serial-only command; no IP equivalent documented)

- id: serial_bass
  label: Bass
  kind: action
  command: "ks {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: integer
      description: 00-64 (serial-only command; no IP equivalent documented)

- id: serial_balance
  label: Balance
  kind: action
  command: "kt {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: integer
      description: 00-64

- id: serial_colour_temperature
  label: Colour Temperature
  kind: action
  command: "xu {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: integer
      description: 00-64

- id: serial_ism_method
  label: ISM Method
  kind: action
  command: "jp {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: string
      description: "02=Orbiter 08=Normal 20=Colour Wash. Plasma TV only."

- id: serial_equalizer
  label: Equalizer
  kind: action
  command: "jv {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: string
      description: "1-byte encoded: bits 7-5 = frequency band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th), bits 4-0 = step (0-20 decimal). E.g. band 1 step 0 = 0x00, band 2 step 1 = 0x21, band 5 step 20 = 0x95. Precondition: Sound Mode = EQ adjustable."

- id: serial_energy_saving
  label: Energy Saving
  kind: action
  command: "jq {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: string
      description: 00=Off 01=Minimum 02=Medium 03=Maximum 04=Auto(Intelligent sensor for PDP) 05=Screen off ("Depending on model")

- id: serial_tune
  label: Tune Channel
  kind: action
  command: "ma {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0 (broadcast only; tune ignores other Set IDs per source)
    - name: data
      type: string
      description: "Region-dependent. EU/ME/CO/Asia (excl. KR/JP): 'ma 00 00 [Hi] [Lo] [Src]' where [Src]=00(ATV)/80(CATV) and channel 00 00-00 C7 (0-199). JP: 5-byte [Data 00-05] with [Data 05]=02(DTV)/07(BS)/08(CS1)/09(CS2). KR/NA/LATAM (excl. CO): 6-byte [Data 00-05] for ATSC physical/major/minor + input source. See source p.9 for full examples; command behavior varies by model and signal."

- id: serial_channel_add_del
  label: Channel Add/Del
  kind: action
  command: "mb {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: string
      description: 00=Del(ATSC/ISDB)/Skip(DVB) 01=Add

- id: serial_key
  label: Key (IR passthrough)
  kind: action
  command: "mc {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: string
      description: "Hex IR key code per source 'KEY CODES' table (e.g. 0x08=Power, 0x44=OK, 0x40=Up, 0x07=Left, 0x10-0x19=Number 0-9, 0xDC=3D, etc.)."

- id: serial_backlight
  label: Control Backlight
  kind: action
  command: "mg {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: integer
      description: 00-64. Same opcode (mg) used for both Control Backlight (LCD/LED) and Control Panel Light (Plasma) per source.

- id: serial_input_select
  label: Input Select (Main)
  kind: action
  command: "xb {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: string
      description: 00=DTV 01=CADTV 02=Satellite DTV 03=ISDB-CS1 04=ISDB-CS2 10=ATV 11=CATV 20=AV/AV1 21=AV2 40=Component1 41=Component2 60=RGB 90=HDMI1 91=HDMI2 92=HDMI3 93=HDMI4 (Japan ISDB-BS uses 30; depends on model and signal)

- id: serial_3d
  label: 3D
  kind: action
  command: "xt {set_id} {d0} {d1} {d2} {d3}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: d0
      type: string
      description: "00=3D On 01=3D Off 02=3D to 2D 03=2D to 3D"
    - name: d1
      type: string
      description: "00=Top/Bottom 01=Side by Side 02=Check Board 03=Frame Sequential 04=Column interleaving 05=Row interleaving"
    - name: d2
      type: string
      description: "00=Right to Left 01=Left to Right (Plasma only; don't care for LCD/LED)"
    - name: d3
      type: string
      description: "3D Effect/Depth: 00-14 (hex). Don't care when d0=01 or 02. Only meaningful in 3D On (d0=00) or 2D-to-3D (d0=03) when 3D Mode = Manual."

- id: serial_extended_3d
  label: Extended 3D
  kind: action
  command: "xv {set_id} {d0} {d1}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: d0
      type: string
      description: "00=Picture Correction 01=Depth 02=Viewpoint 06=Color Correction 07=Sound Zooming 08=Normal Image View 09=Mode (Genre)"
    - name: d1
      type: string
      description: "Range depends on d0: d0=00: 0=Right→Left, 1=Left→Right; d0=01/02: 0-14 hex (transmits hex; viewpoint -10..+10 maps 0..20); d0=06/07: 0=Off, 1=On; d0=08: 0=Revert 3D-to-2D, 1=Force 3D→2D; d0=09: 0=Standard 1=Sport 2=Cinema 3=Extreme 4=Manual 5=Auto. Preconditions per source."

- id: serial_auto_configure
  label: Auto Configure
  kind: action
  command: "ju {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: 0-99
    - name: data
      type: string
      description: "01 = To set Auto Configure. RGB (PC) input only. (Serial-only command; no IP equivalent documented.)"
```

## Feedbacks
```yaml
# All queryable commands return state via the same Ack pattern:
#   [Command2][ ][Set ID][ ][OK][Data][x]   (on success)
#   [Command2][ ][Set ID][ ][NG][Data][x]   (on error; Data 00 = Illegal Code)
# On the IP transport, OK/NG is a single-line text reply.

- id: power_state
  type: enum
  values: [on, off]
- id: volume_mute_state
  type: enum
  values: [on, off]
- id: volume_level
  type: integer
  description: 0-100
- id: input_source
  type: enum
  values: [dtv, cadtv, satellite_dtv, isdb_cs1, isdb_cs2, atv, catv, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]
- id: aspect_ratio
  type: string
  description: One of the data codes listed for the Aspect Ratio action.
- id: osd_state
  type: enum
  values: [on, off]
```

## Variables
```yaml
# No continuous variables. Settable values (volume, bass, treble, balance,
# brightness, contrast, colour, tint, sharpness, backlight, colour temperature)
# are all addressed via discrete commands with explicit data bytes.
```

## Events
```yaml
# Source documents no unsolicited notifications. TCP/IP replies are solicited
# OK/NG only; serial replies are solicited ACK only.
```

## Macros
```yaml
# Source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >
      Remote Control Lock Mode (km 01 / REMOTECONTROLER_LOCK on) disables
      IR and local-key power-on. In standby with key lock on, the TV will
      not turn on via IR or local key. External control lock is released
      on a full power cycle (unplug 20-30s).
# No additional safety warnings, interlocks, or power-on sequencing are
# documented in the source beyond the lock-mode note above.
```

## Notes

- **Set ID**: 0 broadcasts to all connected sets; 1-99 targets a specific TV. Set on the TV via SETTINGS → General/OPTION → SET ID.
- **IP control scope**: documented "(For USA only)". Set ID, port (9761), and the IP command set may not be present on non-US firmware.
- **IP control enable**: must be turned on per-TV via the IP Control Setup menu (default PIN 828, changeable). TV reboots when toggled.
- **Wake-on-LAN**: supported separately via the "Mobile TV On" submenu and a WOL app on iOS/Android. WOL packet format is not in this source.
- **Connection types**: RS-232C supports both DE9 (D-Sub 9) and 3.5mm phone-jack variants; USB-to-serial requires a PL2303-chip cable (VID 0x0557, PID 0x2008). "Cable is not provided."
- **Power-on state (serial)**: with RS-232C cable the `ka` command works in both power-on and power-off states; with USB-to-serial cable it only works when the TV is on. `ka` and `mc` (Power and Key) are the only commands accepted during media playback/recording — all others are treated as NG.
- **Terminators**: serial uses CR (0x0D); IP uses LF (newline) entered by the user. ACK format includes a final `x` (0x78) byte.
- **Equalizer encoding**: serial `jv` data byte packs frequency-band (3 MSBs) and step (5 LSBs) into one byte. Use the table in source p.8 to compute the byte.
- **3D commands**: only meaningful on 3D-capable models and "Depending on model".

<!-- UNRESOLVED: firmware version compatibility across model years not stated in source. -->
<!-- UNRESOLVED: WOL magic-packet format not stated in source. -->
<!-- UNRESOLVED: whether non-USA firmwares expose the IP control telnet interface is not stated. -->

## Provenance

```yaml
source_domains:
  - openhab.org
  - proaudioinc.com
  - gscs-b2c.lge.com
source_urls:
  - https://www.openhab.org/addons/bindings/lgtvserial/
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - "https://gscs-b2c.lge.com/downloadFile?fileId=KROWM000526118.pdf"
retrieved_at: 2026-06-02T04:20:02.894Z
last_checked_at: 2026-06-02T04:20:02.894Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T04:20:02.894Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions matched literally to source commands with correct shapes and parameters; transport fully verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IP control is documented as USA-only; behavior on non-USA firmware is not stated."
- "firmware version compatibility across model years not stated in source."
- "WOL magic-packet format not stated in source."
- "whether non-USA firmwares expose the IP control telnet interface is not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
