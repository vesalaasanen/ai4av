---
spec_id: admin/lg-electronics-50px2dc-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG Electronics 50PX2DC Control Spec"
manufacturer: LG
model_family: 50PX2DC
aliases: []
compatible_with:
  manufacturers:
    - LG
    - "LG Electronics"
  models:
    - 50PX2DC
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
  - scribd.com
  - justaddpower.happyfox.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.scribd.com/document/649294226/RS232-forLGTV
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-codes
retrieved_at: 2026-05-12T20:12:47.191Z
last_checked_at: 2026-06-02T03:24:50.662Z
generated_at: 2026-06-02T03:24:50.662Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware/model variant compatibility, fault recovery behaviour, electrical specs not stated in source"
  - "flow_control not stated in source"
  - "source doesn't enumerate explicit numeric ranges of returned status data for all level-style queries; assume same data range as the set form."
  - "spec uses parameterized actions instead of separate Variables."
  - "source does not document unsolicited / asynchronous notifications. All responses in source are synchronous ACKs to a preceding command."
  - "source does not describe multi-step macros. Network IP Control documents preconditions for some 3D extension commands (a chain of commands that must precede), but they are documented as preconditions, not pre-defined macros."
  - "source contains no explicit safety warnings, interlocks, or power-sequencing hazards. The only operational caveats stated are:"
  - "firmware version compatibility; exact response formatting of FF queries for level-style commands; whether Network IP Control session accepts multiple commands per connection or is one-shot (source example sends VOLUME_MUTE then quits, leaving multi-command session behaviour implicit)."
verification:
  verdict: verified
  checked_at: 2026-06-02T03:24:50.662Z
  matched_actions: 83
  action_count: 83
  confidence: medium
  summary: "All 83 spec actions matched literally in source; transport values verified; comprehensive bidirectional coverage of RS-232C and Network IP Control command sets. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG Electronics 50PX2DC Control Spec

## Summary
LG 50PX2DC plasma TV (North America) external control spec. Supports two control transports documented in the owner's manual: RS-232C serial (via DE9 or phone-jack to RS-232 cable, or via PL2303-based USB-to-Serial converter) and Network IP Control over Telnet (USA only). The RS-232C interface uses ASCII command frames with a Set ID and OK/NG acknowledgement; the Network IP Control interface uses plain-text command strings over TCP port 9761.

<!-- UNRESOLVED: firmware/model variant compatibility, fault recovery behaviour, electrical specs not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9761  # Telnet, Network IP Control (USA only)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  # flow_control not stated in source; source says "Use a crossed (reverse) cable" which describes wiring, not handshake
  # UNRESOLVED: flow_control not stated in source
auth:
  type: none  # inferred: Network IP Control requires a one-time on-device enable (default 3-digit code 828) but telnet session itself has no login per source example
```

## Traits
```yaml
- powerable    # inferred from "01. Power (Command: k a)" with Data 00/01
- queryable    # inferred from "transmit 'FF' data to read status of command"
- routable     # inferred from "24. Input select (Command: x b)" / INPUT_SELECT
- levelable    # inferred from Volume/Contrast/Brightness/Backlight 00-64 controls
```

## Actions
```yaml
# --- RS-232C transmission frame ---
# All RS-232C commands use the frame: [Command1][Command2][ ][Set ID][ ][Data][Cr]
# - Set ID hex 00-63 (00 = broadcast to all sets, 01-63 = sets 1-99)
# - [Cr] = 0x0D
# - Data 'FF' = read status (query)
# - ACK on success: [Command2][ ][Set ID][ ][OK][Data][x]   (x = 0x78)
# - ACK on error:   [Command2][ ][Set ID][ ][NG][Data][x]

# 01. Power (k a)
- id: set_power
  label: Power On/Off
  kind: action
  command: "ka {set_id} {data}"
  params:
    - name: set_id
      type: string
      description: Two-hex-digit Set ID (00-63). 00 = broadcast.
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00 = Power Off, 01 = Power On"
  notes: With RS-232C cable, ka works in both power-on and power-off states. With USB-to-Serial converter, ka only works while TV is on.

- id: power_query
  label: Power State Query
  kind: query
  command: "ka {set_id} FF"
  params:
    - name: set_id
      type: string

# 02. Aspect Ratio (k c)
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "kc {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: enum
      values: ["01", "02", "04", "05", "06", "07", "09", "0B", "0C", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1A", "1B", "1C", "1D", "1E", "1F"]
      description: "01=4:3 Normal, 02=16:9 Wide, 04=Zoom, 05=Zoom 2, 06=Set by Program/Original, 07=14:9, 09=Just Scan, 0B=Full Wide, 0C=21:9, 10-1F=Cinema Zoom 1-16"

- id: aspect_ratio_query
  label: Aspect Ratio Query
  kind: query
  command: "kc {set_id} FF"
  params:
    - name: set_id
      type: string

# 03. Screen Mute (k d)
- id: set_screen_mute
  label: Set Screen / Video Mute
  kind: action
  command: "kd {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: enum
      values: ["00", "01", "10"]
      description: "00 = Screen mute off (Picture on, Video mute off); 01 = Screen mute on (Picture off); 10 = Video mute on"

- id: screen_mute_query
  label: Screen Mute Query
  kind: query
  command: "kd {set_id} FF"
  params:
    - name: set_id
      type: string

# 04. Volume Mute (k e)
- id: set_volume_mute
  label: Set Volume Mute
  kind: action
  command: "ke {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00 = Volume mute on (Volume off); 01 = Volume mute off (Volume on)"

- id: volume_mute_query
  label: Volume Mute Query
  kind: query
  command: "ke {set_id} FF"
  params:
    - name: set_id
      type: string

# 05. Volume Control (k f)
- id: set_volume
  label: Set Volume
  kind: action
  command: "kf {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: string
      description: "Hex 00 (min) to 64 (max), i.e. 0-100 decimal"

- id: volume_query
  label: Volume Query
  kind: query
  command: "kf {set_id} FF"
  params:
    - name: set_id
      type: string

# 06. Contrast (k g)
- id: set_contrast
  label: Set Contrast
  kind: action
  command: "kg {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: string
      description: "Hex 00 (min) to 64 (max)"

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "kg {set_id} FF"
  params:
    - name: set_id
      type: string

# 07. Brightness (k h)
- id: set_brightness
  label: Set Brightness
  kind: action
  command: "kh {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: string
      description: "Hex 00 (min) to 64 (max)"

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "kh {set_id} FF"
  params:
    - name: set_id
      type: string

# 08. Color (k i)
- id: set_color
  label: Set Color
  kind: action
  command: "ki {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: string
      description: "Hex 00 (min) to 64 (max)"

- id: color_query
  label: Color Query
  kind: query
  command: "ki {set_id} FF"
  params:
    - name: set_id
      type: string

# 09. Tint (k j)
- id: set_tint
  label: Set Tint
  kind: action
  command: "kj {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: string
      description: "Hex 00 (Red) to 64 (Green)"

- id: tint_query
  label: Tint Query
  kind: query
  command: "kj {set_id} FF"
  params:
    - name: set_id
      type: string

# 10. Sharpness (k k)
- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "kk {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: string
      description: "Hex 00 (min) to 32 (max)"

- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "kk {set_id} FF"
  params:
    - name: set_id
      type: string

# 11. OSD Select (k l)
- id: set_osd
  label: Set OSD (On Screen Display) On/Off
  kind: action
  command: "kl {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00 = OSD off, 01 = OSD on"

- id: osd_query
  label: OSD Select Query
  kind: query
  command: "kl {set_id} FF"
  params:
    - name: set_id
      type: string

# 12. Remote Control Lock Mode (k m)
- id: set_rc_lock
  label: Set Remote Control Lock Mode
  kind: action
  command: "km {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00 = Lock off, 01 = Lock on"
  notes: External control lock is released after main power off/on plug cycle (20-30 s). In standby (DC off by off timer or ka/mc command) with key lock on, TV will not turn on by power key (IR or local).

- id: rc_lock_query
  label: Remote Control Lock Query
  kind: query
  command: "km {set_id} FF"
  params:
    - name: set_id
      type: string

# 13. Treble (k r)
- id: set_treble
  label: Set Treble
  kind: action
  command: "kr {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: string
      description: "Hex 00 (min) to 64 (max)"

- id: treble_query
  label: Treble Query
  kind: query
  command: "kr {set_id} FF"
  params:
    - name: set_id
      type: string

# 14. Bass (k s)
- id: set_bass
  label: Set Bass
  kind: action
  command: "ks {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: string
      description: "Hex 00 (min) to 64 (max)"

- id: bass_query
  label: Bass Query
  kind: query
  command: "ks {set_id} FF"
  params:
    - name: set_id
      type: string

# 15. Balance (k t)
- id: set_balance
  label: Set Balance
  kind: action
  command: "kt {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: string
      description: "Hex 00 to 64"

- id: balance_query
  label: Balance Query
  kind: query
  command: "kt {set_id} FF"
  params:
    - name: set_id
      type: string

# 16. Color Temperature (x u)
- id: set_color_temperature
  label: Set Color (Colour) Temperature
  kind: action
  command: "xu {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: string
      description: "Hex 00 to 64"

- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  command: "xu {set_id} FF"
  params:
    - name: set_id
      type: string

# 17. ISM Method (j p) - plasma only
- id: set_ism_method
  label: Set ISM Method (Plasma anti-burn)
  kind: action
  command: "jp {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: enum
      values: ["02", "08", "20"]
      description: "02 = Orbiter, 08 = Normal, 20 = Color Wash"
  notes: Plasma-TV-only feature; 50PX2DC is plasma.

- id: ism_method_query
  label: ISM Method Query
  kind: query
  command: "jp {set_id} FF"
  params:
    - name: set_id
      type: string

# 18. Equalizer (j v)
- id: set_equalizer
  label: Set Equalizer Band Step
  kind: action
  command: "jv {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: string
      description: "8-bit value: bits 7-5 select frequency band (000=1st through 100=5th), bits 4-0 = step (0-20 decimal). Source p.8 packed bitfield."
  notes: Works only when sound mode is an EQ-adjustable value.

- id: equalizer_query
  label: Equalizer Query
  kind: query
  command: "jv {set_id} FF"
  params:
    - name: set_id
      type: string

# 19. Energy Saving (j q)
- id: set_energy_saving
  label: Set Energy Saving Mode
  kind: action
  command: "jq {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: enum
      values: ["00", "01", "02", "03", "04", "05"]
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto (LCD/LED) / Intelligent sensor (PDP), 05=Screen off"

- id: energy_saving_query
  label: Energy Saving Query
  kind: query
  command: "jq {set_id} FF"
  params:
    - name: set_id
      type: string

# 20. Tune Command (m a) - short form (analog antenna/cable, N./Latin America)
- id: tune_analog_short
  label: Tune Channel (analog antenna/cable, short form)
  kind: action
  command: "ma {set_id} {data00} {data01} {data02}"
  params:
    - name: set_id
      type: string
    - name: data00
      type: string
      description: "High byte channel number (hex)"
    - name: data01
      type: string
      description: "Low byte channel number (hex). 00 00-00 C7 = channels 0-199 analog antenna; cable 01, 0E-7D = 1, 14-125."
    - name: data02
      type: enum
      values: ["00", "80"]
      description: "00 = Antenna TV (ATV), 80 = Cable TV (CATV)"
  notes: This form documented for South Korea, North/Latin America (except Colombia).

# 20b. Tune Command (m a) - long form (physical/major/minor)
- id: tune_digital_long
  label: Tune Channel (digital physical/major/minor)
  kind: action
  command: "ma 0 {data00} {data01} {data02} {data03} {data04} {data05}"
  params:
    - name: data00
      type: string
      description: "Physical channel number (or 00 = don't know physical for digital)"
    - name: data01
      type: string
      description: "Major channel high byte"
    - name: data02
      type: string
      description: "Major channel low byte (00 01-27 0F = 1-9999)"
    - name: data03
      type: string
      description: "Minor channel high byte (don't care for satellite)"
    - name: data04
      type: string
      description: "Minor channel low byte"
    - name: data05
      type: enum
      values: ["00", "01", "02", "06", "07", "10", "22", "26", "40", "46", "66"]
      description: "Input source: 00=ATV, 01=CATV (analog cable), 02=DTV use physical, 06=CADTV use physical, 07=BS (Japan), 10=Digital Antenna (DVB-T example), 22=DTV no physical, 26=CADTV no physical, 40=Digital Satellite, 46=CADTV major-only (one part), 66=CADTV major-only no physical."
  notes: |
    Examples from source:
      ma 00 00 0a 00       (analog antenna PAL ch 10)
      ma 00 00 01 10       (DVB-T ch 1)
      ma 00 03 E8 40       (DVB-S ch 1000)
      ma 00 23 00 00 00 00 01  (NTSC analog cable ch 35)
      ma 00 00 00 1E 00 03 22  (ATSC digital antenna 30-3)
      ma 00 00 00 11 00 01 02  (ISDB-T 17-1)
      ma 00 00 00 1E 00 00 07  (BS ch 30)

# 21. Channel Add/Del (Skip) (m b)
- id: set_channel_add_skip
  label: Channel Add or Delete/Skip
  kind: action
  command: "mb {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00 = Del (ATSC/ISDB) / Skip (DVB), 01 = Add"

- id: channel_add_skip_query
  label: Channel Add/Skip Query
  kind: query
  command: "mb {set_id} FF"
  params:
    - name: set_id
      type: string

# 22. Key (m c)
- id: send_key
  label: Send IR Remote Key Code
  kind: action
  command: "mc {set_id} {key_code}"
  params:
    - name: set_id
      type: string
    - name: key_code
      type: enum
      values: ["00","01","02","03","06","07","08","09","0B","0E","0F","10","11","12","13","14","15","16","17","18","19","1A","1E","20","21","28","30","39","40","41","42","43","44","45","4C","4D","52","53","5B","60","61","63","71","72","79","7A","7C","7E","8E","8F","91","99","9B","9E","9F","AA","AB","B0","B1","BA","BB","BD","DC"]
      description: |
        00=CH+, 01=CH-, 02=Vol+, 03=Vol-, 06=Right, 07=Left, 08=Power, 09=Mute, 0B=Input,
        0E=Sleep, 0F=TV/TV-RAD, 10-19=Number 0-9, 1A=Q.View/Flashback, 1E=Favorite,
        20=Text(Teletext), 21=Teletext Option, 28=Return/Back, 30=AV Mode, 39=Caption/Subtitle,
        40=Up, 41=Down, 42=My Apps, 43=Menu/Settings, 44=OK/Enter, 45=Q.Menu,
        4C=List/-(ATSC only), 4D=Picture, 52=Sound, 53=List, 5B=Exit, 60=PIP(AD),
        61=Blue, 63=Yellow, 71=Green, 72=Red, 79=Aspect Ratio, 7A=User Guide, 7C=Smart/Home,
        7E=SimpLink, 8E=Forward, 8F=Rewind, 91=Audio Description, 99=AutoConfig, 9B=TV/PC,
        9E=Live Menu, 9F=App/*, AA=Info, AB=Program Guide, B0=Play, B1=Stop/File List,
        BA=Freeze/Slow Play/Pause, BB=Soccer, BD=REC, DC=3D
  notes: Key code 4C is available on ATSC/ISDB models with major/minor channels (South Korea, Japan, North America, Latin America except Colombia).

# 23. Control Backlight / Panel Light (m g)
- id: set_backlight
  label: Set Backlight / Panel Light
  kind: action
  command: "mg {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: string
      description: "Hex 00 (min) to 64 (max). On plasma TVs controls panel light."

- id: backlight_query
  label: Backlight Query
  kind: query
  command: "mg {set_id} FF"
  params:
    - name: set_id
      type: string

# 24. Input Select (x b)
- id: set_input
  label: Select Main Picture Input
  kind: action
  command: "xb {set_id} {data}"
  params:
    - name: set_id
      type: string
    - name: data
      type: enum
      values: ["00", "01", "02", "03", "04", "10", "11", "20", "21", "40", "41", "60", "90", "91", "92", "93"]
      description: "00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1 (Japan), 04=ISDB-CS2 (Japan), 10=ATV, 11=CATV, 20=AV (AV1), 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4"

- id: input_query
  label: Input Query
  kind: query
  command: "xb {set_id} FF"
  params:
    - name: set_id
      type: string

# 25. 3D (x t) - only 3D models, depending on model
- id: set_3d
  label: Set 3D Mode
  kind: action
  command: "xt {set_id} {data00} {data01} {data02} {data03}"
  params:
    - name: set_id
      type: string
    - name: data00
      type: enum
      values: ["00", "01", "02", "03"]
      description: "00=3D On, 01=3D Off, 02=3D to 2D, 03=2D to 3D"
    - name: data01
      type: enum
      values: ["00", "01", "02", "03", "04", "05"]
      description: "00=Top and Bottom, 01=Side by Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving"
    - name: data02
      type: enum
      values: ["00", "01"]
      description: "00=Right to Left, 01=Left to Right"
    - name: data03
      type: string
      description: "3D Effect/Depth, hex 00-14 (0-20 decimal)"
  notes: Source applicability matrix - data00=00 (3D On): all data01/02/03 used; data00=01 (3D Off) or 02 (3D to 2D): data01/02/03 ignored; data00=03 (2D to 3D): data02 and data03 used.

- id: query_3d
  label: 3D Mode Query
  kind: query
  command: "xt {set_id} FF"
  params:
    - name: set_id
      type: string

# 26. Extended 3D (x v) - only 3D models
- id: set_3d_extended
  label: Set Extended 3D Option
  kind: action
  command: "xv {set_id} {data00} {data01}"
  params:
    - name: set_id
      type: string
    - name: data00
      type: enum
      values: ["00", "01", "02", "06", "07", "08", "09"]
      description: "00=3D Picture Correction, 01=3D Depth (3D Mode Manual only), 02=3D Viewpoint, 06=3D Color Correction, 07=3D Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre)"
    - name: data01
      type: string
      description: |
        Range depends on data00:
          data00=00: 00=Right to Left, 01=Left to Right
          data00=01,02: hex 00-14 (0-20 decimal), maps to viewpoint -10..+10
          data00=06,07: 00=Off, 01=On
          data00=08: 00=Revert to 3D from converted 2D, 01=Convert 3D to 2D
          data00=09: 00=Standard, 01=Sport, 02=Cinema, 03=Extreme, 04=Manual, 05=Auto

- id: query_3d_extended
  label: Extended 3D Query
  kind: query
  command: "xv {set_id} FF"
  params:
    - name: set_id
      type: string

# 27. Auto Configure (j u) - RGB(PC) input only
- id: auto_configure
  label: Auto Configure Picture (RGB/PC)
  kind: action
  command: "ju {set_id} 01"
  params:
    - name: set_id
      type: string
  notes: Works only in RGB (PC) mode.

# ===================================================================
# NETWORK IP CONTROL - Telnet on TCP port 9761 (USA only)
# Each command is a plain ASCII string terminated by CR.
# Successful command returns "OK"; failure returns "NG".
# "quit" + Enter closes the session.
# ===================================================================

# IP-01. Power (off only; power-on uses Wake-on-LAN, not this protocol)
- id: ip_power_off
  label: IP Power Off
  kind: action
  command: "POWER off"
  params: []
  notes: IP control only documents POWER off. Power-on is via Wake-on-LAN with "Mobile TV On" enabled.

# IP-02. Aspect Ratio
- id: ip_set_aspect_ratio
  label: IP Set Aspect Ratio
  kind: action
  command: "ASPECT_RATIO {value}"
  params:
    - name: value
      type: enum
      values: ["4by3", "16by9", "setbyoriginal"]

# IP-03. Screen Mute
- id: ip_set_screen_mute
  label: IP Set Screen Mute
  kind: action
  command: "SCREEN_MUTE {value}"
  params:
    - name: value
      type: enum
      values: ["screenmuteon", "videomuteon", "allmuteoff"]

# IP-04. Volume Mute
- id: ip_set_volume_mute
  label: IP Set Volume Mute
  kind: action
  command: "VOLUME_MUTE {state}"
  params:
    - name: state
      type: enum
      values: ["on", "off"]

# IP-05. Volume Control
- id: ip_set_volume
  label: IP Set Volume
  kind: action
  command: "VOLUME_CONTROL {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 decimal"

# IP-06. Contrast
- id: ip_set_contrast
  label: IP Set Contrast
  kind: action
  command: "PICTURE_CONTRAST {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 decimal"

# IP-07. Brightness
- id: ip_set_brightness
  label: IP Set Brightness
  kind: action
  command: "PICTURE_BRIGHTNESS {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 decimal"

# IP-08. Color (Colour)
- id: ip_set_color
  label: IP Set Colour
  kind: action
  command: "PICTURE_COLOUR {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 decimal"

# IP-09. Tint
- id: ip_set_tint
  label: IP Set Tint
  kind: action
  command: "PICTURE_TINT {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 decimal"

# IP-10. Sharpness
- id: ip_set_sharpness
  label: IP Set Sharpness
  kind: action
  command: "PICTURE_SHARPNESS {level}"
  params:
    - name: level
      type: integer
      description: "0 to 50 decimal"

# IP-11. OSD Select
- id: ip_set_osd
  label: IP Set OSD On/Off
  kind: action
  command: "OSD_SELECT {state}"
  params:
    - name: state
      type: enum
      values: ["on", "off"]

# IP-12. Remote Controler Lock Mode (sic - vendor spelling)
- id: ip_set_rc_lock
  label: IP Set Remote Controler Lock
  kind: action
  command: "REMOTECONTROLER_LOCK {state}"
  params:
    - name: state
      type: enum
      values: ["on", "off"]

# IP-13. Balance
- id: ip_set_balance
  label: IP Set Audio Balance
  kind: action
  command: "AUDIO_BALANCE {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 decimal"

# IP-14. Color Temperature
- id: ip_set_color_temperature
  label: IP Set Colour Temperature
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 decimal"

# IP-15. Equalizer
- id: ip_set_equalizer
  label: IP Set Audio Equalizer
  kind: action
  command: "AUDIO_EQUALIZER {band} {step}"
  params:
    - name: band
      type: integer
      description: "1 to 5 (frequency band)"
    - name: step
      type: integer
      description: "0 to 20 (step, decimal)"
  notes: Precondition - All settings > Sound > Sound Mode Settings > Equalizer = On.

# IP-16. Energy Saving
- id: ip_set_energy_saving
  label: IP Set Energy Saving
  kind: action
  command: "ENERGY_SAVING {mode}"
  params:
    - name: mode
      type: enum
      values: ["screenoff", "maximum", "medium", "minimum", "off"]

# IP-17a. Channel Setting - ATSC ATV
- id: ip_channel_setting_atsc_atv
  label: IP Tune ATSC Analog Channel
  kind: action
  command: "CHANNEL_SETTING_ATSC_ATV {channel} {source}"
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: source
      type: enum
      values: ["antenna", "cable"]

# IP-17b. Channel Setting - ATSC DTV (with major/minor)
- id: ip_channel_setting_atsc_dtv
  label: IP Tune ATSC Digital Channel
  kind: action
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} {source}"
  params:
    - name: major
      type: integer
      description: "Major channel number (or single channel for cablemaj form)"
    - name: minor
      type: integer
      description: "Minor channel number (omit for cablemaj single-arg form)"
    - name: source
      type: enum
      values: ["cablemaj", "antennanotphy", "cablenotphy"]
  notes: Source shows variants - `CHANNEL_SETTING_ATSC_DTV [Channel Number] cablemaj` (single number) and `CHANNEL_SETTING_ATSC_DTV [Maj] [Min] antennanotphy|cablenotphy`.

# IP-18. Channel Add/Delete
- id: ip_channel_add_delete
  label: IP Channel Add / Delete
  kind: action
  command: "CHANNEL_ADD_DELETE {action}"
  params:
    - name: action
      type: enum
      values: ["add", "delete"]

# IP-19. Key Action
- id: ip_send_key
  label: IP Send Key
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

# IP-20. Control Backlight
- id: ip_set_backlight
  label: IP Set Backlight
  kind: action
  command: "PICTURE_BACKLIGHT {level}"
  params:
    - name: level
      type: integer
      description: "0 to 100 decimal"
  notes: Precondition - All settings > Picture > Energy Saving = Off.

# IP-21. Input Select
- id: ip_set_input
  label: IP Select Input
  kind: action
  command: "INPUT_SELECT {value}"
  params:
    - name: value
      type: enum
      values: ["dtv", "atv", "cadtv", "catv", "avav1", "component1", "hdmi1", "hdmi2", "hdmi3"]

# IP-22a. 3D - off / 3dto2d
- id: ip_set_3d_simple
  label: IP Set 3D (off / 3D-to-2D)
  kind: action
  command: "PICTURE_3D {mode}"
  params:
    - name: mode
      type: enum
      values: ["off", "3dto2d"]

# IP-22b. 3D - 2dto3d with viewpoint and depth
- id: ip_set_3d_2dto3d
  label: IP Set 3D (2D-to-3D)
  kind: action
  command: "PICTURE_3D 2dto3d {viewpoint} {depth}"
  params:
    - name: viewpoint
      type: enum
      values: ["righttoleft", "lefttoright"]
    - name: depth
      type: integer
      description: "0 to 20"

# IP-22c. 3D - on with pattern, direction, depth
- id: ip_set_3d_on
  label: IP Set 3D On
  kind: action
  command: "PICTURE_3D on {pattern} {direction} {depth}"
  params:
    - name: pattern
      type: enum
      values: ["topandbottom", "sidebyside", "checkboard", "framesequential", "columninterleaving", "rowinterleaving"]
    - name: direction
      type: enum
      values: ["righttoleft", "lefttoright"]
    - name: depth
      type: integer
      description: "0 to 20"

# IP-23a. Extended 3D - picture correction
- id: ip_3d_extension_picturecorrection
  label: IP 3D Extension - Picture Correction
  kind: action
  command: "PICTURE_3D_EXTENSION picturecorrection {value}"
  params:
    - name: value
      type: enum
      values: ["0", "1"]
      description: "0 = Right to Left, 1 = Left to Right"
  notes: Precondition - PICTURE_3D on X X X.

# IP-23b. Extended 3D - color correction / sound on/off
- id: ip_3d_extension_toggle
  label: IP 3D Extension - Color Correction / Sound
  kind: action
  command: "PICTURE_3D_EXTENSION {feature} {state}"
  params:
    - name: feature
      type: enum
      values: ["colorcorrection", "sound"]
    - name: state
      type: enum
      values: ["0", "1"]
      description: "0 = off, 1 = on"
  notes: Precondition - PICTURE_3D on X X X.

# IP-23c. Extended 3D - normal image view
- id: ip_3d_extension_normal
  label: IP 3D Extension - Normal Image View
  kind: action
  command: "PICTURE_3D_EXTENSION normal {state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "0 = off, 1 = on"
  notes: Precondition - PICTURE_3D on X X X.

# IP-23d. Extended 3D - depth / viewpoint
- id: ip_3d_extension_depth_viewpoint
  label: IP 3D Extension - Depth / Viewpoint
  kind: action
  command: "PICTURE_3D_EXTENSION {feature} {value}"
  params:
    - name: feature
      type: enum
      values: ["depth", "viewpoint"]
    - name: value
      type: integer
      description: "0 to 20"
  notes: |
    Depth precondition: PICTURE_3D 2dto3d X X then PICTURE_3D_EXTENSION genre 4.
    Viewpoint precondition: PICTURE_3D 2dto3d X X.

# IP-23e. Extended 3D - genre
- id: ip_3d_extension_genre
  label: IP 3D Extension - Genre
  kind: action
  command: "PICTURE_3D_EXTENSION genre {genre}"
  params:
    - name: genre
      type: enum
      values: ["0", "1", "2", "3", "4", "5"]
      description: "0=Standard, 1=Sport, 2=Cinema, 3=Extreme, 4=Manual, 5=Auto"
  notes: Precondition - PICTURE_3D 2dto3d X X.

# Telnet session control
- id: ip_quit
  label: IP Quit / Close Telnet Session
  kind: action
  command: "quit"
  params: []
  notes: Closes the telnet session; remote responds with "Connection closed by foreign host".
```

## Feedbacks
```yaml
# RS-232C ACK format:
#   OK: [Command2][ ][Set ID][ ][OK][Data][x]    (x = 0x78)
#   NG: [Command2][ ][Set ID][ ][NG][Data][x]
#   Error data 00 = Illegal Code.
# Network IP Control responses: literal "OK" or "NG".

- id: rs232_ack_ok
  label: RS-232C OK Acknowledgement
  type: string
  pattern: "{cmd2} {set_id} OK{data}x"
  description: Returned when the set receives valid data. In data-read (FF) mode this carries the current status; in data-write mode it echoes the data the PC sent.

- id: rs232_ack_ng
  label: RS-232C NG Acknowledgement
  type: string
  pattern: "{cmd2} {set_id} NG{data}x"
  description: Returned on non-viable functions or communication errors. data=00 = Illegal Code.

- id: ip_ack_ok
  label: Network IP Control OK
  type: string
  values: ["OK"]
  description: Returned on successful command entry.

- id: ip_ack_ng
  label: Network IP Control NG
  type: string
  values: ["NG"]
  description: Returned on bad command, or when pressing Enter at idle to confirm session is established.

- id: power_state
  type: enum
  values: ["00", "01"]
  description: Reported via Power query (ka FF) - 00 = Off, 01 = On.

- id: volume_mute_state
  type: enum
  values: ["00", "01"]
  description: Via ke FF - 00 = muted, 01 = not muted.

- id: current_volume
  type: integer
  description: 0-100 (hex 00-64). Via kf FF.

- id: current_input
  type: enum
  values: ["00","01","02","03","04","10","11","20","21","40","41","60","90","91","92","93"]
  description: Via xb FF - same mapping as set_input.

- id: aspect_ratio_state
  type: enum
  values: ["01","02","04","05","06","07","09","0B","0C","10","11","12","13","14","15","16","17","18","19","1A","1B","1C","1D","1E","1F"]
  description: Via kc FF.

- id: screen_mute_state
  type: enum
  values: ["00", "01", "10"]
  description: Via kd FF.

# UNRESOLVED: source doesn't enumerate explicit numeric ranges of returned status data for all level-style queries; assume same data range as the set form.
```

## Variables
```yaml
# Most settable values are captured as parameterized Actions above (volume, contrast, brightness, color, tint, sharpness, treble, bass, balance, color temp, backlight, 3D depth/viewpoint). No source-only Variables.
# UNRESOLVED: spec uses parameterized actions instead of separate Variables.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited / asynchronous notifications. All responses in source are synchronous ACKs to a preceding command.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macros. Network IP Control documents preconditions for some 3D extension commands (a chain of commands that must precede), but they are documented as preconditions, not pre-defined macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-sequencing hazards. The only operational caveats stated are:
#  - During playing or recording media, all RS-232C commands except Power (ka) and Key (mc) are NG.
#  - Network IP Control: during playing or recording media, all commands except Power and Key are NG.
#  - With USB-to-Serial converter, ka only works while TV is on (RS-232C cable works both ways).
#  - External control lock (km 01) is released by a main power off/on plug cycle of 20-30 seconds.
#  - In standby with key lock on, TV will not turn on by power key (IR or local).
# These are NOT injected into interlocks because they are state caveats, not safety interlocks per source wording.
```

## Notes

- Model identification: 50PX2DC has the LG "50P…" plasma family prefix; the spec assumes this is a plasma TV and includes the plasma-only ISM Method (jp) command and the plasma branch of Control Backlight (mg = panel light). The 3D commands (xt, xv) and Extended 3D IP commands are gated on "only 3D models" per the source; this spec includes them but the source itself notes "depending on model" — operators verifying against a specific 50PX2DC unit should confirm 3D feature presence.
- Two physical RS-232C connectors are documented per the model series: DE9 D-Sub female-to-female crossed cable, or a phone-jack-to-RS-232 cable. USB-to-Serial converters must be PL2303 chip-based (VID 0x0557, PID 0x2008).
- RS-232C wiring: 3-wire crossed (null-modem). Two equivalent pinouts documented: PC RXD/TXD/GND on pins 2/3/5 connecting to TV RXD/TXD/GND on pins 2/1/3 (D-Sub) or 1/2/3 (phone jack), with TX/RX crossed.
- Set ID: 1-99 decimal (0x01-0x63 hex). Set ID 00 = broadcast to all sets on the bus.
- Network IP Control is documented "For USA only" and requires on-device enablement via the hidden Settings + "828" code menu. The 3-digit enable code can be changed by the operator. Once enabled the TV listens on TCP 9761; the telnet session itself has no login.
- Power-on over IP: not supported by the protocol. Use Wake-on-LAN with "Mobile TV On" enabled.
- During media playback or recording, all RS-232C commands except ka (Power) and mc (Key) return NG. Same restriction applies to the Network IP Control protocol (POWER and KEY_ACTION only).

<!-- UNRESOLVED: firmware version compatibility; exact response formatting of FF queries for level-style commands; whether Network IP Control session accepts multiple commands per connection or is one-shot (source example sends VOLUME_MUTE then quits, leaving multi-command session behaviour implicit). -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - scribd.com
  - justaddpower.happyfox.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.scribd.com/document/649294226/RS232-forLGTV
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-codes
retrieved_at: 2026-05-12T20:12:47.191Z
last_checked_at: 2026-06-02T03:24:50.662Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T03:24:50.662Z
matched_actions: 83
action_count: 83
confidence: medium
summary: "All 83 spec actions matched literally in source; transport values verified; comprehensive bidirectional coverage of RS-232C and Network IP Control command sets. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware/model variant compatibility, fault recovery behaviour, electrical specs not stated in source"
- "flow_control not stated in source"
- "source doesn't enumerate explicit numeric ranges of returned status data for all level-style queries; assume same data range as the set form."
- "spec uses parameterized actions instead of separate Variables."
- "source does not document unsolicited / asynchronous notifications. All responses in source are synchronous ACKs to a preceding command."
- "source does not describe multi-step macros. Network IP Control documents preconditions for some 3D extension commands (a chain of commands that must precede), but they are documented as preconditions, not pre-defined macros."
- "source contains no explicit safety warnings, interlocks, or power-sequencing hazards. The only operational caveats stated are:"
- "firmware version compatibility; exact response formatting of FF queries for level-style commands; whether Network IP Control session accepts multiple commands per connection or is one-shot (source example sends VOLUME_MUTE then quits, leaving multi-command session behaviour implicit)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
