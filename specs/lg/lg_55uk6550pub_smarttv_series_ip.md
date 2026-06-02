---
spec_id: admin/lg-55uk6550pub-smarttv-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55UK6550PUB SmartTV Series Control Spec"
manufacturer: LG
model_family: "55UK6550PUB SmartTV Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "55UK6550PUB SmartTV Series"
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
retrieved_at: 2026-06-02T17:23:07.239Z
last_checked_at: 2026-06-02T17:23:07.239Z
generated_at: 2026-06-02T17:23:07.239Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range, supported model variants beyond \"SmartTV series\" not stated; exact behavior differences between models flagged \"(Depending on model)\" not enumerated."
  - "source documents that every k/x family command supports a Data=FF query"
  - "source documents only request/response framing; no unsolicited"
  - "no explicit multi-step macro sequences are documented in the source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "which entries above are typographical errors in the source vs intentional; some ACK mnemonic mismatches (kj→[r], kr→[u], xu→[l]) cannot be reconciled without device testing."
  - "exact line-termination expected by the IP control parser (LF vs CRLF). Source says \"press Enter\" but does not specify the byte sequence."
  - "behaviour of `POWER on` over IP — source documents `POWER off` example only; whether the telnet daemon accepts `POWER on` after Mobile TV On / WoL handshake is not stated."
  - "response framing for IP query-style operations — source documents only OK/NG outcomes for sent commands and does not describe a query verb for reading current state over IP."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:07.239Z
  matched_actions: 57
  action_count: 57
  confidence: medium
  summary: "All 57 spec actions matched verbatim in source; transport parameters verified; no shape or coverage gaps. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 55UK6550PUB SmartTV Series Control Spec

## Summary
LG SmartTV series with two documented external control surfaces: an RS-232C serial interface (DE9 or phone-jack, optionally over a USB-to-Serial converter using PL2303) carrying ASCII command pairs of the form `[Cmd1][Cmd2][ ][Set ID][ ][Data][Cr]`, and a Network IP Control telnet interface on TCP port 9761 (USA only, must be enabled via the hidden `IP Control Setup` menu) carrying plaintext command lines. Both surfaces expose power, picture, audio, channel tuning, input routing, key-injection, and 3D control. Power-on over IP requires WoL because the telnet service is not available while the TV is off.

<!-- UNRESOLVED: firmware version range, supported model variants beyond "SmartTV series" not stated; exact behavior differences between models flagged "(Depending on model)" not enumerated. -->

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
  flow_control: none  # inferred: source documents 3-wire RXD/TXD/GND only, no RTS/CTS lines
auth:
  type: none  # inferred: source describes telnet session opened directly with `telnet <ip> 9761` and no login prompt; the 828 password gates the on-TV setup menu, not the telnet session
```

## Traits
```yaml
- powerable        # inferred from power on/off command (ka / POWER)
- routable         # inferred from input-select commands (xb / INPUT_SELECT)
- queryable        # inferred from "Transmit 'FF' data to read status of command" on every k/x family command
- levelable        # inferred from volume / contrast / brightness / backlight level commands
```

## Actions
```yaml
# ============================================================
# RS-232C command set (Section "Command reference list", rows 01-27)
# Wire format: [Command1][Command2][ ][Set ID][ ][Data][Cr]
#   - Set ID: 00-63 hex (decimal 0-99); 00 = broadcast to all sets
#   - Data:   command-specific hex; FF = query current status
#   - Cr:     ASCII 0x0D
# ============================================================

- id: rs232_power
  label: Power (RS-232)
  kind: action
  command: "[k][a][ ][Set ID][ ][Data][Cr]"
  params:
    - name: set_id
      type: hex
      description: 00-63 (00 = all sets)
    - name: data
      type: enum
      values:
        - "00"  # Power Off
        - "01"  # Power On
        - "FF"  # Query status
  notes: |
    Ack: [a][ ][Set ID][ ][OK/NG][Data][x].
    With native RS-232C cable, ka works in both power-on and power-off states.
    With USB-to-Serial converter, ka only works when TV is on.

- id: rs232_aspect_ratio
  label: Aspect Ratio (RS-232)
  kind: action
  command: "[k][c][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "01"  # Normal
        - "02"  # Wide 16:9
        - "04"  # Zoom
        - "05"  # Zoom 2 (Europe/Colombia/Mid-East except Colombia)
        - "06"  # Set by Program/Original
        - "07"  # 14:9 (4:3)
        - "09"  # Just Scan
        - "0B"  # Full Wide (Latin America except Colombia)
        - "0C"  # 21:9
        - "10-1F"  # Cinema Zoom 1 to 16
  notes: "Ack: [c][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_screen_mute
  label: Screen Mute (RS-232)
  kind: action
  command: "[k][d][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Screen mute off (Picture on) / Video mute off
        - "01"  # Screen mute on (Picture off)
        - "10"  # Video mute on

- id: rs232_volume_mute
  label: Volume Mute (RS-232)
  kind: action
  command: "[k][e][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Volume mute on
        - "01"  # Volume mute off
  notes: "Ack: [e][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_volume_control
  label: Volume Control (RS-232)
  kind: action
  command: "[k][f][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: 00-64 (decimal 0-100)
  notes: "Ack: [f][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_contrast
  label: Contrast (RS-232)
  kind: action
  command: "[k][g][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: 00-64
  notes: "Ack: [g][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_brightness
  label: Brightness (RS-232)
  kind: action
  command: "[k][h][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: 00-64
  notes: "Ack: [h][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_color
  label: Color/Colour (RS-232)
  kind: action
  command: "[k][i][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: 00-64
  notes: "Ack: [i][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_tint
  label: Tint (RS-232)
  kind: action
  command: "[k][j][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: 00 (Red) to 64 (Green)
  notes: "Ack: [r][ ][Set ID][ ][OK/NG][Data][x] (per source)."

- id: rs232_sharpness
  label: Sharpness (RS-232)
  kind: action
  command: "[k][k][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: 00-32
  notes: "Ack: [k][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_osd_select
  label: OSD Select (RS-232)
  kind: action
  command: "[k][l][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # OSD off
        - "01"  # OSD on
  notes: "Ack: [l][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_remote_lock
  label: Remote Control Lock Mode (RS-232)
  kind: action
  command: "[k][m][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Lock off
        - "01"  # Lock on
  notes: |
    Ack: [m][ ][Set ID][ ][OK/NG][Data][x].
    Lock released by main-power off/on cycle (plug-out 20-30s then plug-in).

- id: rs232_treble
  label: Treble (RS-232)
  kind: action
  command: "[k][r][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: 00-64
  notes: "Ack: [u][ ][Set ID][ ][OK/NG][Data][x] (per source)."

- id: rs232_bass
  label: Bass (RS-232)
  kind: action
  command: "[k][s][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: 00-64
  notes: "Ack: [s][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_balance
  label: Balance (RS-232)
  kind: action
  command: "[k][t][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: 00-64
  notes: "Ack: [t][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_color_temperature
  label: Color(Colour) Temperature (RS-232)
  kind: action
  command: "[x][u][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: 00-64
  notes: "Ack: [l][ ][Set ID][ ][OK/NG][Data][x] (per source)."

- id: rs232_ism_method
  label: ISM Method (RS-232, Plasma only)
  kind: action
  command: "[j][p][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "02"  # Orbiter
        - "08"  # Normal
        - "20"  # Color(Colour) Wash
  notes: "Ack: [p][ ][Set ID][ ][OK/NG][Data][x]. Plasma TV only."

- id: rs232_equalizer
  label: Equalizer (RS-232)
  kind: action
  command: "[j][v][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: |
        Bit-packed byte: bits 7-5 select frequency band (000=1st .. 100=5th),
        bits 4-0 select step 0-19 (decimal). Source provides bit table.
  notes: "Ack: [v][ ][Set ID][ ][OK/NG][Data][x]. Requires sound mode EQ-adjustable."

- id: rs232_energy_saving
  label: Energy Saving (RS-232)
  kind: action
  command: "[j][q][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Off
        - "01"  # Minimum
        - "02"  # Medium
        - "03"  # Maximum
        - "04"  # Auto / Intelligent sensor
        - "05"  # Screen off
  notes: "Ack: [q][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_tune_command
  label: Tune Command (RS-232)
  kind: action
  command: "[m][a][ ][Set ID][ ][Data 00][ ][Data 01][ ][Data 02][Cr]"
  params:
    - name: data
      type: bytes
      description: |
        Region-dependent layout. Europe/Mid-East/Colombia/Asia (excl. SK, JP):
          3 bytes - [Hi][Lo][Source] with Source 00=ATV, 80=CATV, 10=DTV,
          20=Radio, 40=SDTV, 50=S-Radio, 90=CADTV, A0=CA-Radio.
        South Korea / N./L. America (excl. Colombia) and Japan:
          6 bytes - [Phys][MajHi][MajLo][MinHi][MinLo][Source].
        Channel data range 00 00 - 27 0F (0-9999 decimal).
        Source includes worked examples (ma 00 00 0a 00, ma 00 00 01 10, etc.).
  notes: |
    Ack (3-byte form): [a][ ][Set ID][ ][OK][Data 00][Data 01][Data 02][x] /
                       [a][ ][Set ID][ ][NG][Data 00][x].
    Ack (6-byte form): [a][ ][Set ID][ ][OK][Data 00..05][x] / NG form.

- id: rs232_channel_add_del
  label: Channel(Programme) Add/Del/Skip (RS-232)
  kind: action
  command: "[m][b][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Del (ATSC/ISDB) / Skip (DVB)
        - "01"  # Add
  notes: "Ack: [b][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_key
  label: Key (RS-232 IR remote injection)
  kind: action
  command: "[m][c][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: |
        Key code from the "KEY CODES" table - e.g. 00=CH+, 02=Vol+, 08=Power,
        09=Mute, 0B=Input, 44=OK/Enter, 7C=Smart/Home, BD=REC, DC=3D, etc.
        Full 50+ entry table in source pp.1-2.
  notes: "Ack: [c][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_control_backlight
  label: Control Backlight / Panel Light (RS-232)
  kind: action
  command: "[m][g][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: hex
      description: 00-64
  notes: "Ack: [g][ ][Set ID][ ][OK/NG][Data][x]. Same mnemonic governs backlight and panel light."

- id: rs232_input_select
  label: Input Select (RS-232)
  kind: action
  command: "[x][b][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "00"  # DTV
        - "01"  # CADTV
        - "02"  # Satellite DTV
        - "03"  # ISDB-CS1 (Japan)
        - "04"  # ISDB-CS2 (Japan)
        - "10"  # ATV
        - "11"  # CATV
        - "20"  # AV / AV1
        - "21"  # AV2
        - "40"  # Component1
        - "41"  # Component2
        - "60"  # RGB
        - "90"  # HDMI1
        - "91"  # HDMI2
        - "92"  # HDMI3
        - "93"  # HDMI4
  notes: "Ack: [b][ ][Set ID][ ][OK/NG][Data][x]."

- id: rs232_3d
  label: 3D Mode (RS-232, 3D models only)
  kind: action
  command: "[x][t][ ][Set ID][ ][Data 00][ ][Data 01][ ][Data 02][ ][Data 03][Cr]"
  params:
    - name: data_00
      type: enum
      values: ["00", "01", "02", "03"]  # 3D On / 3D Off / 3D->2D / 2D->3D
    - name: data_01
      type: enum
      values: ["00", "01", "02", "03", "04", "05"]  # TopBottom/SideBySide/CheckBoard/FrameSeq/ColInterl/RowInterl
    - name: data_02
      type: enum
      values: ["00", "01"]  # Right-to-Left / Left-to-Right
    - name: data_03
      type: hex
      description: 3D depth 00-14 (Manual mode only)
  notes: "Ack: [t][ ][Set ID][ ][OK][Data00][Data01][Data02][Data03][x] / NG form."

- id: rs232_extended_3d
  label: Extended 3D (RS-232, 3D models only)
  kind: action
  command: "[x][v][ ][Set ID][ ][Data 00][ ][Data 01][Cr]"
  params:
    - name: data_00
      type: enum
      values:
        - "00"  # 3D Picture Correction
        - "01"  # 3D Depth (Manual only)
        - "02"  # 3D Viewpoint
        - "06"  # 3D Color Correction
        - "07"  # 3D Sound Zooming
        - "08"  # Normal Image View
        - "09"  # 3D Mode (Genre)
    - name: data_01
      type: hex
      description: Range varies per data_00 (00-01 for correction/genre toggles, 00-14 for depth/viewpoint, 00-05 for genre)
  notes: "Ack: [v][ ][Set ID][ ][OK][Data00][Data01][x] / NG form."

- id: rs232_auto_configure
  label: Auto Configure (RS-232)
  kind: action
  command: "[j][u][ ][Set ID][ ][Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        - "01"  # Run auto-configure
  notes: "Ack: [u][ ][Set ID][ ][OK/NG][Data][x]. RGB (PC) input only."

# ============================================================
# Network IP Control (telnet on TCP 9761, USA only)
# Wire format: ASCII command line terminated by Enter (LF/CRLF).
# Responses: 'OK' on success, 'NG' on error.
# ============================================================

- id: ip_power_off
  label: Power Off (IP)
  kind: action
  command: "POWER off"
  params: []
  notes: |
    Only 'off' is documented for the IP transport because the telnet server
    is unavailable while the TV is off. Power-on is performed via Wake-on-LAN
    after enabling the 'Mobile TV On' setting.

- id: ip_aspect_ratio
  label: Aspect Ratio (IP)
  kind: action
  command: "ASPECT_RATIO {mode}"
  params:
    - name: mode
      type: enum
      values: [4by3, 16by9, setbyoriginal]

- id: ip_screen_mute
  label: Screen Mute (IP)
  kind: action
  command: "SCREEN_MUTE {mode}"
  params:
    - name: mode
      type: enum
      values: [screenmuteon, videomuteon, allmuteoff]

- id: ip_volume_mute
  label: Volume Mute (IP)
  kind: action
  command: "VOLUME_MUTE {state}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: ip_volume_control
  label: Volume Control (IP)
  kind: action
  command: "VOLUME_CONTROL {level}"
  params:
    - name: level
      type: integer
      description: 0-100 decimal

- id: ip_picture_contrast
  label: Picture Contrast (IP)
  kind: action
  command: "PICTURE_CONTRAST {level}"
  params:
    - name: level
      type: integer
      description: 0-100

- id: ip_picture_brightness
  label: Picture Brightness (IP)
  kind: action
  command: "PICTURE_BRIGHTNESS {level}"
  params:
    - name: level
      type: integer
      description: 0-100

- id: ip_picture_colour
  label: Picture Colour (IP)
  kind: action
  command: "PICTURE_COLOUR {level}"
  params:
    - name: level
      type: integer
      description: 0-100

- id: ip_picture_tint
  label: Picture Tint (IP)
  kind: action
  command: "PICTURE_TINT {level}"
  params:
    - name: level
      type: integer
      description: 0-100

- id: ip_picture_sharpness
  label: Picture Sharpness (IP)
  kind: action
  command: "PICTURE_SHARPNESS {level}"
  params:
    - name: level
      type: integer
      description: 0-50

- id: ip_osd_select
  label: OSD Select (IP)
  kind: action
  command: "OSD_SELECT {state}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: ip_remote_lock
  label: Remote Control Lock (IP)
  kind: action
  command: "REMOTECONTROLER_LOCK {state}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: ip_audio_balance
  label: Audio Balance (IP)
  kind: action
  command: "AUDIO_BALANCE {level}"
  params:
    - name: level
      type: integer
      description: 0-100

- id: ip_picture_colour_temperature
  label: Picture Colour Temperature (IP)
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {level}"
  params:
    - name: level
      type: integer
      description: 0-100

- id: ip_audio_equalizer
  label: Audio Equalizer (IP)
  kind: action
  command: "AUDIO_EQUALIZER {band} {step}"
  params:
    - name: band
      type: integer
      description: 1-5 (frequency band)
    - name: step
      type: integer
      description: 0-20 (decimal step)
  notes: "Precondition: Sound > Sound Mode Settings > Equalizer = on."

- id: ip_energy_saving
  label: Energy Saving (IP)
  kind: action
  command: "ENERGY_SAVING {mode}"
  params:
    - name: mode
      type: enum
      values: [screenoff, maximum, medium, minimum, off]

- id: ip_channel_setting_atsc_atv
  label: Channel Setting (ATSC ATV) (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} {source}"
  params:
    - name: channel
      type: integer
      description: Physical analog channel number
    - name: source
      type: enum
      values: [antenna, cable]

- id: ip_channel_setting_atsc_dtv
  label: Channel Setting (ATSC DTV) (IP)
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {args}"
  params:
    - name: form
      type: enum
      values:
        - "[channel] cablenotphy"                       # single-channel cable digital
        - "[major] [minor] antennanotphy"               # major/minor digital antenna
        - "[major] [minor] cablenotphy"                 # major/minor digital cable
    - name: channel
      type: integer
    - name: major
      type: integer
    - name: minor
      type: integer
  notes: "Three documented invocation forms within the CHANNEL_SETTING_ATSC_DTV method."

- id: ip_channel_add_delete
  label: Channel Add/Delete (IP)
  kind: action
  command: "CHANNEL_ADD_DELETE {op}"
  params:
    - name: op
      type: enum
      values: [add, delete]

- id: ip_key_action
  label: Key Action (IP IR injection)
  kind: action
  command: "KEY_ACTION {key}"
  params:
    - name: key
      type: enum
      values:
        - exit
        - channelup
        - channeldown
        - volumeup
        - volumedown
        - arrowright
        - arrowleft
        - volumemute
        - deviceinput
        - sleepreserve
        - livetv
        - previouschannel
        - favoritechannel
        - teletext
        - teletextoption
        - returnback
        - avmode
        - captionsubtitle
        - arrowup
        - arrowdown
        - myapp
        - settingmenu
        - ok
        - quickmenu
        - videomode
        - audiomode
        - channellist
        - bluebutton
        - yellowbutton
        - greenbutton
        - redbutton
        - aspectratio
        - audiodescription
        - programmorder
        - userguide
        - smarthome
        - simplelink
        - fastforward
        - rewind
        - programminfo
        - programguide
        - play
        - slowplay
        - soccerscreen
        - record
        - 3d
        - autoconfig
        - app
        - screenbright
        - number0
        - number1
        - number2
        - number3
        - number4
        - number5
        - number6
        - number7
        - number8
        - number9

- id: ip_picture_backlight
  label: Picture Backlight (IP)
  kind: action
  command: "PICTURE_BACKLIGHT {level}"
  params:
    - name: level
      type: integer
      description: 0-100
  notes: "Precondition: Picture > Energy Saving = off."

- id: ip_input_select
  label: Input Select (IP)
  kind: action
  command: "INPUT_SELECT {source}"
  params:
    - name: source
      type: enum
      values: [dtv, atv, cadtv, catv, avav1, component1, hdmi1, hdmi2, hdmi3]

- id: ip_picture_3d_off
  label: 3D Off / 3D-to-2D (IP)
  kind: action
  command: "PICTURE_3D {mode}"
  params:
    - name: mode
      type: enum
      values: [off, 3dto2d]
  notes: "3D models only."

- id: ip_picture_3d_2dto3d
  label: 3D 2D-to-3D (IP)
  kind: action
  command: "PICTURE_3D 2dto3d {orientation} {depth}"
  params:
    - name: orientation
      type: enum
      values: [righttoleft, lefttoright]
    - name: depth
      type: integer
      description: 0-20
  notes: "3D models only."

- id: ip_picture_3d_on
  label: 3D On (IP)
  kind: action
  command: "PICTURE_3D on {pattern} {orientation} {depth}"
  params:
    - name: pattern
      type: enum
      values: [topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving]
    - name: orientation
      type: enum
      values: [righttoleft, lefttoright]
    - name: depth
      type: integer
      description: 0-20
  notes: "3D models only."

- id: ip_picture_3d_extension_picturecorrection
  label: 3D Picture Correction (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION picturecorrection {direction}"
  params:
    - name: direction
      type: enum
      values: ["0", "1"]  # 0=Right-to-Left, 1=Left-to-Right
  notes: "Precondition: PICTURE_3D on X X X."

- id: ip_picture_3d_extension_colorcorrection_sound
  label: 3D Color Correction / Sound Zooming (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {state}"
  params:
    - name: option
      type: enum
      values: [colorcorrection, sound]
    - name: state
      type: enum
      values: ["0", "1"]  # 0=off, 1=on
  notes: "Precondition: PICTURE_3D on X X X."

- id: ip_picture_3d_extension_normal
  label: 3D Normal Image View (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION normal {state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]  # 0=off, 1=on
  notes: "Precondition: PICTURE_3D on X X X."

- id: ip_picture_3d_extension_depth_viewpoint
  label: 3D Depth / Viewpoint (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {value}"
  params:
    - name: option
      type: enum
      values: [depth, viewpoint]
    - name: value
      type: integer
      description: 0-20 (viewpoint range)
  notes: |
    Depth precondition: PICTURE_3D 2dto3d X X AND PICTURE_3D_EXTENSION genre 4.
    Viewpoint precondition: PICTURE_3D 2dto3d X X.

- id: ip_picture_3d_extension_genre
  label: 3D Mode Genre (IP)
  kind: action
  command: "PICTURE_3D_EXTENSION genre {genre}"
  params:
    - name: genre
      type: enum
      values: ["0", "1", "2", "3", "4", "5"]
  notes: |
    0=Standard / 1=Sport / 2=Cinema / 3=Extreme / 4=Manual / 5=Auto.
    Precondition: PICTURE_3D 2dto3d X X.
```

## Feedbacks
```yaml
# RS-232 query: send the same opcode with Data=FF; ACK frame returns current value.
# Wire format: [Command2][ ][Set ID][ ][OK][Data][x] (success) or [Command2][ ][Set ID][ ][NG][Data][x].
# Each Feedback below mirrors the corresponding Action's queryable status.

- id: rs232_ack_ok
  label: OK Acknowledgement (RS-232)
  type: string
  format: "[Command2][ ][Set ID][ ][OK][Data][x]"
  notes: "Returned for any successfully processed command. Data echoes set value or returns queried status when request used Data=FF."

- id: rs232_ack_ng
  label: Error Acknowledgement (RS-232)
  type: string
  format: "[Command2][ ][Set ID][ ][NG][Data][x]"
  notes: "Data=00 means Illegal Code per source."

- id: ip_ack_ok
  label: OK Response (IP)
  type: string
  format: "OK"
  notes: "Returned when an IP command line is accepted."

- id: ip_ack_ng
  label: NG Response (IP)
  type: string
  format: "NG"
  notes: "Returned when an IP command line is rejected."

- id: power_state_query
  label: Power Status Query (RS-232)
  type: enum
  values: [on, off]
  query_command: "[k][a][ ][Set ID][ ][FF][Cr]"
  notes: "Ack data byte: 00=off, 01=on."

# UNRESOLVED: source documents that every k/x family command supports a Data=FF query
# returning current status, but does not enumerate per-command response value ranges
# beyond what is implicit in the set-command parameter table. Only the explicit
# 'show power state' query example is itemized above; per-command queries are
# implementable by sending Data=FF on each opcode and parsing the ACK Data field.
```

## Variables
```yaml
- id: set_id
  label: Set ID
  type: integer
  range: [1, 99]
  default: 1
  notes: |
    Selects which TV responds on a daisy-chained RS-232 bus.
    Transmitted as hex 0x00-0x63. 0x00 broadcasts to all sets.
    Configured on TV via Settings > General > About this TV / OPTION > SET ID.

- id: ip_control_enable
  label: Network IP Control Enable
  type: enum
  values: [on, off]
  notes: |
    Set via hidden 'IP Control Setup' menu (long-press Settings 5s on Live TV,
    enter password 828, select Network IP Control = On). Requires TV reboot.

- id: ip_control_password
  label: IP Control Setup Password
  type: string
  default: "828"
  notes: "3-digit numeric password gating access to the IP Control Setup menu (not the telnet session)."

- id: mobile_tv_on
  label: Mobile TV On (Wake-on-LAN enable)
  type: enum
  values: [on, off]
  notes: "Settings > Mobile TV On = On is required for power-on via WoL packet from a paired mobile app."
```

## Events
```yaml
# UNRESOLVED: source documents only request/response framing; no unsolicited
# event push notifications are described for either RS-232 or telnet transport.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences are documented in the source.
# (3D extension preconditions describe required state-before-call ordering, but
# those are precondition notes on individual actions, not standalone macros.)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-sequencing requirements beyond operational notes (e.g. ka not executed
# during media playback/recording).
```

## Notes
- **Dual transport on different population scopes.** The RS-232C command set is the global LG external-control protocol documented for this TV series; the Network IP Control telnet interface on TCP 9761 is explicitly scoped "For USA only" in the source. Drivers targeting non-USA units should fall back to RS-232.
- **Power-on asymmetry on IP.** The telnet daemon is only reachable while the TV is powered on, so `POWER off` is the only documented IP power verb. Power-on is performed via a Wake-on-LAN magic packet after enabling `Mobile TV On`. Native RS-232C cable can drive `ka 01` (power on) in standby; USB-to-Serial converters cannot.
- **Media playback blocks most commands.** During playback or recording of media, all commands except `ka` (Power) and `mc` (Key) on RS-232 — and Power + Key on IP — return NG.
- **Query mechanism.** Every `k*` and `x*` RS-232 opcode accepts `Data=FF` to read current status; the ACK byte carries the current value. This is what `traits: queryable` reflects.
- **Set ID 0 is broadcast.** Sending Set ID `0x00` addresses every chained set simultaneously.
- **Lock release path.** Remote Control Lock (`km 01`) is cleared only by a main-power cycle (20-30s unplug); a power-on key press will not wake a locked TV while in standby.
- **3D commands are gated by model.** All `xt`/`xv` / `PICTURE_3D*` entries are flagged "(only 3D models)" in source.
- **USB-to-Serial chip identity.** LG documents PL2303 (Vendor 0x0557 / Product 0x2008) as the supported converter; cable is not provided.
- **OK acknowledgement quirks.** The source's per-command ACK templates occasionally show a different second-character than the request mnemonic (e.g. Tint request `kj` ACK shown as `[r]`; Treble request `kr` ACK shown as `[u]`; Colour Temperature `xu` ACK shown as `[l]`). These appear to be source-document typographic errors; field implementers should match on the actual second character returned rather than the printed example.
<!-- UNRESOLVED: which entries above are typographical errors in the source vs intentional; some ACK mnemonic mismatches (kj→[r], kr→[u], xu→[l]) cannot be reconciled without device testing. -->
<!-- UNRESOLVED: exact line-termination expected by the IP control parser (LF vs CRLF). Source says "press Enter" but does not specify the byte sequence. -->
<!-- UNRESOLVED: behaviour of `POWER on` over IP — source documents `POWER off` example only; whether the telnet daemon accepts `POWER on` after Mobile TV On / WoL handshake is not stated. -->
<!-- UNRESOLVED: response framing for IP query-style operations — source documents only OK/NG outcomes for sent commands and does not describe a query verb for reading current state over IP. -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - justaddpower.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
retrieved_at: 2026-06-02T17:23:07.239Z
last_checked_at: 2026-06-02T17:23:07.239Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:07.239Z
matched_actions: 57
action_count: 57
confidence: medium
summary: "All 57 spec actions matched verbatim in source; transport parameters verified; no shape or coverage gaps. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range, supported model variants beyond \"SmartTV series\" not stated; exact behavior differences between models flagged \"(Depending on model)\" not enumerated."
- "source documents that every k/x family command supports a Data=FF query"
- "source documents only request/response framing; no unsolicited"
- "no explicit multi-step macro sequences are documented in the source."
- "source contains no explicit safety warnings, interlock procedures,"
- "which entries above are typographical errors in the source vs intentional; some ACK mnemonic mismatches (kj→[r], kr→[u], xu→[l]) cannot be reconciled without device testing."
- "exact line-termination expected by the IP control parser (LF vs CRLF). Source says \"press Enter\" but does not specify the byte sequence."
- "behaviour of `POWER on` over IP — source documents `POWER off` example only; whether the telnet daemon accepts `POWER on` after Mobile TV On / WoL handshake is not stated."
- "response framing for IP query-style operations — source documents only OK/NG outcomes for sent commands and does not describe a query verb for reading current state over IP."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
