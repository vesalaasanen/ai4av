---
spec_id: admin/lg-49uk7550pla-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 49UK7550PLA Series Control Spec"
manufacturer: LG
model_family: "49UK7550PLA Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "49UK7550PLA Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T01:17:53.320Z
last_checked_at: 2026-06-02T17:22:55.915Z
generated_at: 2026-06-02T17:22:55.915Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range, exact list of regional model variants in the \"49UK7550PLA Series\" — source only states feature differences depend on model and region."
  - "not stated; \"Use a crossed (reverse) cable\" implies no hardware flow control"
  - "optional per region variant"
  - "source states \"all functions\" support FF-data query - additional per-command query feedbacks are implied but not separately enumerated in source."
  - "source documents no asynchronous/unsolicited notifications from the device."
  - "source documents no multi-step macros."
  - "not stated in source."
  - "per-command query feedback shapes for every command (source documents the FF mechanism generically rather than per-row), exact serial timing (inter-byte and response timeout), behaviour during firmware update / channel scan, complete list of region-specific tune-command variations beyond the examples given."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:55.915Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions matched literally in source; transport parameters (9600 baud, RS-232C/IP) verified; no undocumented commands found. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 49UK7550PLA Series Control Spec

## Summary
LG UHD TV (49UK7550PLA series) external control over RS-232C and, on US models only, telnet over IP (port 9761). RS-232C uses ASCII command frames of the form `[Cmd1][Cmd2] [Set ID] [Data][Cr]` with OK/NG acknowledgement; IP control uses uppercase ASCII command keywords (e.g. `VOLUME_MUTE on`) returning `OK` or `NG`. Spec covers all documented set/get commands from the vendor's External Control Device Setup manual.

<!-- UNRESOLVED: firmware compatibility range, exact list of regional model variants in the "49UK7550PLA Series" — source only states feature differences depend on model and region. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9761  # IP control (USA only); plain telnet
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: not stated; "Use a crossed (reverse) cable" implies no hardware flow control
auth:
  type: none  # inferred: no login/password procedure on the telnet stream itself (the 828 PIN gates the on-TV menu, not the wire protocol)
```

## Traits
```yaml
- powerable      # inferred from `ka` power on/off command
- routable       # inferred from `xb` input select command
- queryable      # inferred from FF-data query mechanism across all commands
- levelable      # inferred from volume / brightness / contrast / etc. level commands
```

## Actions
```yaml
# --- RS-232C command set (Cmd1 Cmd2 + Set ID + Data + CR; Set ID 00 broadcasts to all) ---

- id: power_set
  label: Power On/Off
  kind: action
  command: "ka {set_id} {data}\r"   # Data 00=Off, 01=On
  params:
    - name: set_id
      type: hex
      description: Set ID 00-63 (0=broadcast, 1-99=specific set)
    - name: data
      type: enum
      values: ["00", "01"]
      description: 00=Power Off, 01=Power On

- id: power_query
  label: Power Status Query
  kind: query
  command: "ka {set_id} FF\r"
  params:
    - name: set_id
      type: hex

- id: aspect_ratio_set
  label: Aspect Ratio
  kind: action
  command: "kc {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: enum
      values: ["01", "02", "04", "05", "06", "07", "09", "0B", "0C", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1A", "1B", "1C", "1D", "1E", "1F"]
      description: "01=Normal, 02=16:9, 04=Zoom, 05=Zoom2, 06=SetByProgram, 07=14:9, 09=Just Scan, 0B=Full Wide, 0c=21:9, 10-1F=Cinema Zoom 1-16"

- id: screen_mute_set
  label: Screen Mute
  kind: action
  command: "kd {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: enum
      values: ["00", "01", "10"]
      description: "00=Screen mute off / Video mute off, 01=Screen mute on, 10=Video mute on"

- id: volume_mute_set
  label: Volume Mute
  kind: action
  command: "ke {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: enum
      values: ["00", "01"]
      description: 00=Mute on, 01=Mute off

- id: volume_set
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: Volume 00-64 (0-100 decimal)

- id: contrast_set
  label: Contrast
  kind: action
  command: "kg {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: 00-64

- id: brightness_set
  label: Brightness
  kind: action
  command: "kh {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: 00-64

- id: color_set
  label: Color
  kind: action
  command: "ki {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: 00-64

- id: tint_set
  label: Tint
  kind: action
  command: "kj {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: 00=Red, 64=Green

- id: sharpness_set
  label: Sharpness
  kind: action
  command: "kk {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: 00-32

- id: osd_select_set
  label: OSD Select
  kind: action
  command: "kl {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: enum
      values: ["00", "01"]
      description: 00=OSD off, 01=OSD on

- id: remote_lock_set
  label: Remote Control Lock Mode
  kind: action
  command: "km {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: enum
      values: ["00", "01"]
      description: 00=Lock off, 01=Lock on

- id: treble_set
  label: Treble
  kind: action
  command: "kr {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: 00-64

- id: bass_set
  label: Bass
  kind: action
  command: "ks {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: 00-64

- id: balance_set
  label: Balance
  kind: action
  command: "kt {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: 00-64

- id: color_temperature_set
  label: Color Temperature
  kind: action
  command: "xu {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: 00-64

- id: ism_method_set
  label: ISM Method (Plasma only)
  kind: action
  command: "jp {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: enum
      values: ["02", "08", "20"]
      description: 02=Orbiter, 08=Normal, 20=Color Wash

- id: equalizer_set
  label: Equalizer
  kind: action
  command: "jv {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: Bit-packed byte - high 3 bits = band (000=1st through 100=5th), low 5 bits = step 0-20 (decimal)

- id: energy_saving_set
  label: Energy Saving
  kind: action
  command: "jq {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: enum
      values: ["00", "01", "02", "03", "04", "05"]
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto/Intelligent sensor, 05=Screen off"

- id: tune_command
  label: Tune Command
  kind: action
  command: "ma {set_id} {data00} {data01} {data02}\r"   # short form; long form adds Data03-Data05 (see notes)
  params:
    - name: set_id
      type: hex
    - name: data00
      type: hex
      description: Physical channel high byte, OR Data 00 (per region/channel-type variant)
    - name: data01
      type: hex
      description: Physical channel low byte, OR Major-high byte
    - name: data02
      type: hex
      description: Input source enum (analog 00=ATV, 80=CATV; digital 10=DTV, 40=Sat DTV, etc.) OR Major-low byte
    - name: data03
      type: hex
      description: Minor channel high byte (long form only)  # UNRESOLVED: optional per region variant
    - name: data04
      type: hex
      description: Minor channel low byte (long form only)
    - name: data05
      type: hex
      description: Digital input source (long form). 02=DTV, 06=CADTV, 22=DTV no-physical, 26=CADTV no-physical, 46/66 cable variants, 07=BS, 08=CS1, 09=CS2 (Japan)

- id: channel_add_del_set
  label: Channel/Programme Add or Skip
  kind: action
  command: "mb {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: enum
      values: ["00", "01"]
      description: 00=Del/Skip, 01=Add

- id: key_send
  label: Send IR Remote Key Code
  kind: action
  command: "mc {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: IR Key code (see Key Codes table - Power=08, Mute=09, VolUp=02, VolDn=03, Input=0B, Menu=43, OK=44, etc.)

- id: backlight_set
  label: Backlight / Panel Light Control
  kind: action
  command: "mg {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: hex
      description: 00-64

- id: input_select_set
  label: Input Select (Main Picture)
  kind: action
  command: "xb {set_id} {data}\r"
  params:
    - name: set_id
      type: hex
    - name: data
      type: enum
      values: ["00", "01", "02", "03", "04", "10", "11", "20", "21", "40", "41", "60", "90", "91", "92", "93"]
      description: "00=DTV, 01=CADTV, 02=Sat DTV, 03=ISDB-CS1, 04=ISDB-CS2, 10=ATV, 11=CATV, 20=AV/AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90-93=HDMI1-4"

- id: mode_3d_set
  label: 3D Mode (3D models only)
  kind: action
  command: "xt {set_id} {data00} {data01} {data02} {data03}\r"
  params:
    - name: set_id
      type: hex
    - name: data00
      type: enum
      values: ["00", "01", "02", "03"]
      description: 00=3D On, 01=3D Off, 02=3D-to-2D, 03=2D-to-3D
    - name: data01
      type: enum
      values: ["00", "01", "02", "03", "04", "05"]
      description: Pattern - 00=Top/Bottom, 01=Side-by-Side, 02=CheckBoard, 03=FrameSequential, 04=ColumnInterleave, 05=RowInterleave
    - name: data02
      type: enum
      values: ["00", "01"]
      description: 00=Right-to-Left, 01=Left-to-Right
    - name: data03
      type: hex
      description: 3D depth 00-14 hex (Manual mode only)

- id: extended_3d_set
  label: Extended 3D Options (3D models only)
  kind: action
  command: "xv {set_id} {data00} {data01}\r"
  params:
    - name: set_id
      type: hex
    - name: data00
      type: enum
      values: ["00", "01", "02", "06", "07", "08", "09"]
      description: 00=Picture Correction, 01=Depth, 02=Viewpoint, 06=Color Correction, 07=Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre)
    - name: data01
      type: hex
      description: Range depends on Data00 (see source - 0-1 toggle, 0-14 hex range, or genre enum 00-05)

- id: auto_configure
  label: Auto Configure (RGB/PC mode only)
  kind: action
  command: "ju {set_id} 01\r"
  params:
    - name: set_id
      type: hex

# --- IP control command set (telnet port 9761, USA only) ---

- id: ip_power
  label: Power (IP)
  kind: action
  command: "POWER off\r"   # source only documents POWER off; power-on uses WOL
  params: []

- id: ip_aspect_ratio
  label: Aspect Ratio (IP)
  kind: action
  command: "ASPECT_RATIO {mode}\r"
  params:
    - name: mode
      type: enum
      values: [4by3, 16by9, setbyoriginal]

- id: ip_screen_mute
  label: Screen Mute (IP)
  kind: action
  command: "SCREEN_MUTE {mode}\r"
  params:
    - name: mode
      type: enum
      values: [screenmuteon, videomuteon, allmuteoff]

- id: ip_volume_mute
  label: Volume Mute (IP)
  kind: action
  command: "VOLUME_MUTE {state}\r"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: ip_volume_control
  label: Volume Control (IP)
  kind: action
  command: "VOLUME_CONTROL {level}\r"
  params:
    - name: level
      type: integer
      description: 0 to 100

- id: ip_contrast
  label: Contrast (IP)
  kind: action
  command: "PICTURE_CONTRAST {level}\r"
  params:
    - name: level
      type: integer
      description: 0 to 100

- id: ip_brightness
  label: Brightness (IP)
  kind: action
  command: "PICTURE_BRIGHTNESS {level}\r"
  params:
    - name: level
      type: integer
      description: 0 to 100

- id: ip_color
  label: Color (IP)
  kind: action
  command: "PICTURE_COLOUR {level}\r"
  params:
    - name: level
      type: integer
      description: 0 to 100

- id: ip_tint
  label: Tint (IP)
  kind: action
  command: "PICTURE_TINT {level}\r"
  params:
    - name: level
      type: integer
      description: 0 to 100

- id: ip_sharpness
  label: Sharpness (IP)
  kind: action
  command: "PICTURE_SHARPNESS {level}\r"
  params:
    - name: level
      type: integer
      description: 0 to 50

- id: ip_osd_select
  label: OSD Select (IP)
  kind: action
  command: "OSD_SELECT {state}\r"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: ip_remote_lock
  label: Remote Control Lock Mode (IP)
  kind: action
  command: "REMOTECONTROLER_LOCK {state}\r"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: ip_balance
  label: Balance (IP)
  kind: action
  command: "AUDIO_BALANCE {level}\r"
  params:
    - name: level
      type: integer
      description: 0 to 100

- id: ip_color_temperature
  label: Color Temperature (IP)
  kind: action
  command: "PICTURE_COLOUR_TEMPERATURE {level}\r"
  params:
    - name: level
      type: integer
      description: 0 to 100

- id: ip_equalizer
  label: Equalizer (IP)
  kind: action
  command: "AUDIO_EQUALIZER {band} {step}\r"
  params:
    - name: band
      type: integer
      description: 1 to 5 (frequency band)
    - name: step
      type: integer
      description: 0 to 20 (step decimal)

- id: ip_energy_saving
  label: Energy Saving (IP)
  kind: action
  command: "ENERGY_SAVING {mode}\r"
  params:
    - name: mode
      type: enum
      values: [screenoff, maximum, medium, minimum, off]

- id: ip_tune_command
  label: Tune Command (IP)
  kind: action
  command: "CHANNEL_SETTING_{tuner}_{type} {args}\r"
  params:
    - name: tuner
      type: enum
      values: [ATSC]
    - name: type
      type: enum
      values: [ATV, DTV]
    - name: args
      type: string
      description: |
        ATV form: "{channel} antenna|cable"
        DTV cablenotphy form: "{channel} cablenotphy"
        DTV major/minor form: "{major} {minor} antennanotphy|cablenotphy"

- id: ip_channel_add_delete
  label: Channel Add/Delete (IP)
  kind: action
  command: "CHANNEL_ADD_DELETE {op}\r"
  params:
    - name: op
      type: enum
      values: [add, delete]

- id: ip_key_action
  label: Key Action (IP)
  kind: action
  command: "KEY_ACTION {key}\r"
  params:
    - name: key
      type: enum
      values: [exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, record, "3d", autoconfig, app, screenbright, number0, number1, number2, number3, number4, number5, number6, number7, number8, number9]

- id: ip_backlight
  label: Backlight Control (IP)
  kind: action
  command: "PICTURE_BACKLIGHT {level}\r"
  params:
    - name: level
      type: integer
      description: 0 to 100; precondition - Energy Saving must be off

- id: ip_input_select
  label: Input Select (IP)
  kind: action
  command: "INPUT_SELECT {input}\r"
  params:
    - name: input
      type: enum
      values: [dtv, atv, cadtv, catv, avav1, component1, hdmi1, hdmi2, hdmi3]

- id: ip_picture_3d
  label: 3D Picture Mode (IP, 3D models only)
  kind: action
  command: "PICTURE_3D {mode} {pattern} {direction} {depth}\r"
  params:
    - name: mode
      type: enum
      values: [off, 3dto2d, 2dto3d, on]
    - name: pattern
      type: enum
      values: [topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving]
      description: Required when mode=on
    - name: direction
      type: enum
      values: [righttoleft, lefttoright]
      description: Required when mode=on or mode=2dto3d
    - name: depth
      type: integer
      description: 0-20; required when mode=on or mode=2dto3d

- id: ip_picture_3d_extension
  label: Extended 3D Options (IP, 3D models only)
  kind: action
  command: "PICTURE_3D_EXTENSION {option} {args}\r"
  params:
    - name: option
      type: enum
      values: [picturecorrection, colorcorrection, sound, normal, depth, viewpoint, genre]
    - name: args
      type: string
      description: |
        picturecorrection: 0=R-to-L, 1=L-to-R
        colorcorrection/sound/normal: 0=off, 1=on
        depth/viewpoint: 0-20
        genre: 0=Standard, 1=Sport, 2=Cinema, 3=Extreme, 4=Manual, 5=Auto
```

## Feedbacks
```yaml
- id: ack_ok
  label: OK Acknowledgement
  type: ascii_frame
  format: "{cmd2} {set_id} OK{data}x"   # RS-232 success response
  description: Transmitted on receipt of valid command. Data field reflects current value (for queries) or echoes written value.

- id: ack_ng
  label: Error Acknowledgement
  type: ascii_frame
  format: "{cmd2} {set_id} NG{data}x"
  description: Transmitted on invalid command or non-viable function. Data 00 = Illegal Code.

- id: ip_ack_ok
  label: IP OK Response
  type: enum
  values: [OK]
  description: telnet command accepted

- id: ip_ack_ng
  label: IP NG Response
  type: enum
  values: [NG]
  description: telnet command rejected

# Per-command queries (via FF data) - return current value in OK ack payload
- id: power_state
  type: enum
  values: ["00", "01"]
  description: 00=Off, 01=On (returned by `ka ... FF`)

- id: aspect_ratio_state
  type: hex
  description: Returned by `kc ... FF`

- id: volume_state
  type: hex
  description: 00-64 (returned by `kf ... FF`)

- id: volume_mute_state
  type: enum
  values: ["00", "01"]
  description: 00=muted, 01=unmuted (returned by `ke ... FF`)

- id: input_state
  type: hex
  description: Current input (returned by `xb ... FF`)

# UNRESOLVED: source states "all functions" support FF-data query - additional per-command query feedbacks are implied but not separately enumerated in source.
```

## Variables
```yaml
- id: set_id
  label: Set ID
  type: integer
  range: [1, 99]
  description: Device address on the RS-232 bus (1-99 decimal, 01-63 hex). Set ID 0 (00 hex) broadcasts to all connected sets. Configured via SETTINGS > General > About this TV / OPTION > SET ID on the TV.

- id: ip_control_enabled
  label: Network IP Control
  type: boolean
  description: Must be set to On in the IP Control Setup menu (entered via SETTINGS hold + 828 PIN on Live TV) before telnet port 9761 accepts connections. USA models only.

- id: ip_control_password
  label: IP Control Setup PIN
  type: string
  description: 3-digit PIN that gates the on-TV IP Control Setup menu. Default 828; user-changeable. Not used on the telnet stream itself.

- id: mobile_tv_on
  label: Mobile TV On (Wake-on-LAN)
  type: boolean
  description: Must be On to power the TV on remotely via WOL (no IP `POWER on` command is documented).
```

## Events
```yaml
# UNRESOLVED: source documents no asynchronous/unsolicited notifications from the device.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source documents no safety warnings, interlocks, or power sequencing requirements
# for serial/IP control. UNRESOLVED: not stated in source.
```

## Notes
- RS-232C wiring: source describes a 3-wire crossed (null-modem) configuration — PC TXD (pin 3) ↔ TV RXD (pin 2), PC RXD (pin 2) ↔ TV TXD (pin 3), GND ↔ GND. Some sets use a phone-jack-to-DB9 adapter instead. Other models use the USB port via an LG-supported PL2303 (VID 0x0557 / PID 0x2008) USB-to-serial converter.
- During media playback or recording, only the Power (`ka`) and Key (`mc`) RS-232 commands and the corresponding IP `KEY_ACTION` are honoured; all other commands return NG.
- With an RS-232C cable, `ka` works in both power-on and power-off (standby) states. With the USB-to-serial converter, `ka` only works while the TV is on.
- When Remote Control Lock (`km` / `REMOTECONTROLER_LOCK`) is on and the TV is in standby (via `ka 00`, `mc 08`, or off-timer), the TV will NOT respond to IR or local-key power-on. Removing mains power for 20-30 seconds releases the lock.
- IP control is documented only for "USA only" models, requires Network IP Control to be set to On (via the hidden 828-PIN menu), and uses plain telnet on port 9761. There is no documented IP `POWER on` command — power-on over IP requires Wake-on-LAN with "Mobile TV On" enabled.
- ISM Method (`jp`) is documented as plasma-only; it is unlikely to be functional on this LCD/LED model but is included for completeness because the source's command reference table lists it.
- 3D commands (`xt`, `xv`, IP `PICTURE_3D*`) apply only to 3D-capable models in this series.
- Equalizer command (`jv`) encodes band (high 3 bits) and step (low 5 bits) into a single byte — not a simple decimal value.
- Tune Command (`ma`) has multiple regional variants (Europe/Mid-East/Colombia/Asia vs. South Korea/North America vs. Japan), with different data-byte layouts and input-source enums per region. The action above covers the short (3-data-byte) form; the long (6-data-byte) form for digital channels uses additional Data03-Data05 fields.

<!-- UNRESOLVED: per-command query feedback shapes for every command (source documents the FF mechanism generically rather than per-row), exact serial timing (inter-byte and response timeout), behaviour during firmware update / channel scan, complete list of region-specific tune-command variations beyond the examples given. -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T01:17:53.320Z
last_checked_at: 2026-06-02T17:22:55.915Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:55.915Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions matched literally in source; transport parameters (9600 baud, RS-232C/IP) verified; no undocumented commands found. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range, exact list of regional model variants in the \"49UK7550PLA Series\" — source only states feature differences depend on model and region."
- "not stated; \"Use a crossed (reverse) cable\" implies no hardware flow control"
- "optional per region variant"
- "source states \"all functions\" support FF-data query - additional per-command query feedbacks are implied but not separately enumerated in source."
- "source documents no asynchronous/unsolicited notifications from the device."
- "source documents no multi-step macros."
- "not stated in source."
- "per-command query feedback shapes for every command (source documents the FF mechanism generically rather than per-row), exact serial timing (inter-byte and response timeout), behaviour during firmware update / channel scan, complete list of region-specific tune-command variations beyond the examples given."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
