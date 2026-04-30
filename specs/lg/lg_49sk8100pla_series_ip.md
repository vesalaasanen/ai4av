---
schema_version: ai4av-public-spec-v1
device_id: lg/49sk8100pla-series
entity_id: lg_49sk8100pla_series
spec_id: admin/lg-49sk8100pla-series
revision: 1
author: admin
title: "LG 49SK8100PLA Series Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: "49SK8100PLA Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "49SK8100PLA Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_49sk8100pla_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:59:48.823Z
retrieved_at: 2026-04-25T20:59:48.823Z
last_checked_at: 2026-04-25T20:59:48.823Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:59:48.823Z
  matched_actions: 29
  action_count: 29
  confidence: high
  summary: "All 29 spec actions matched verbatim to source commands; all transport parameters verified; complete coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 49SK8100PLA Series Control Spec

## Summary

LG 49SK8100PLA is an LED/LCD television that supports external control via RS-232C serial and TCP/IP (telnet) connections. Both interfaces provide command sets for power, volume, picture adjustments, input selection, channel tuning, and remote key emulation. The serial protocol uses a compact ASCII command format (`[Command1][Command2][ ][Set ID][ ][Data][Cr]`); the IP control protocol uses plain-text commands over telnet on port 9761. This spec covers both command sets.

<!-- UNRESOLVED: IP control feature described as "For USA only" — regional availability for other markets not stated -->
<!-- UNRESOLVED: no explicit power-on command documented for IP control; WOL is mentioned as alternative -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9761  # telnet; IP control must be enabled on TV first (Settings > General > About this TV > IP Control Setup)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; 3-wire config shown
auth:
  type: none  # inferred: no login/password on command connections; IP control setup menu uses default code 828 to enable feature
```

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off commands present (serial ka; IP POWER off)
  - levelable    # inferred: volume, brightness, contrast, backlight, bass, treble, balance, color, tint, sharpness ranges
  - queryable    # inferred: serial FF data read returns current status; IP has no documented query
  - routable     # inferred: input select commands present (serial xb; IP INPUT_SELECT)
```

## Actions
```yaml
# TCP/IP commands: plain text over telnet (port 9761). Responses: "OK" or "NG".
# Serial commands: [CMD1][CMD2][ ][SetID][ ][Data][Cr] where Cr=0x0D. Responses: [CMD2][ ][SetID][ ][OK|NG][Data][x]

- id: power_off
  label: Power Off
  kind: action
  tcp_command: "POWER off"
  serial_command: "ka {set_id} 00"
  params:
    - name: set_id
      type: integer
      min: 0
      max: 99
      description: "Serial only. 0=all sets. Ignored for TCP."

- id: power_on
  label: Power On
  kind: action
  tcp_command: null  # UNRESOLVED: no POWER on command documented for IP control; use WOL
  serial_command: "ka {set_id} 01"
  params:
    - name: set_id
      type: integer
      min: 0
      max: 99
      description: "Serial only. 0=all sets."

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  tcp_command: "ASPECT_RATIO {mode}"
  serial_command: "kc {set_id} {data}"
  params:
    - name: mode
      type: enum
      values: ["4by3", "16by9", "setbyoriginal"]
      description: "TCP/IP mode names. Serial data hex: 01=Normal, 02=Wide(16:9), 04=Zoom, 05=Zoom2, 06=Set by Program, 09=Just Scan, 0B=Full Wide, 10-1F=Cinema Zoom 1-16"

- id: screen_mute
  label: Screen Mute
  kind: action
  tcp_command: "SCREEN_MUTE {mode}"
  serial_command: "kd {set_id} {data}"
  params:
    - name: mode
      type: enum
      values: ["screenmuteon", "videomuteon", "allmuteoff"]
      description: "TCP/IP mode names. Serial data hex: 00=off, 01=screen mute on, 10=video mute on"

- id: volume_mute
  label: Volume Mute
  kind: action
  tcp_command: "VOLUME_MUTE {state}"
  serial_command: "ke {set_id} {data}"
  params:
    - name: state
      type: enum
      values: ["on", "off"]
      description: "TCP/IP: on=mute, off=unmute. Serial data hex: 00=mute on, 01=mute off"

- id: volume_control
  label: Volume Control
  kind: action
  tcp_command: "VOLUME_CONTROL {level}"
  serial_command: "kf {set_id} {data}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "TCP/IP: decimal 0-100. Serial: hex 00-64"

- id: contrast
  label: Contrast
  kind: action
  tcp_command: "PICTURE_CONTRAST {level}"
  serial_command: "kg {set_id} {data}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "TCP/IP: decimal 0-100. Serial: hex 00-64"

- id: brightness
  label: Brightness
  kind: action
  tcp_command: "PICTURE_BRIGHTNESS {level}"
  serial_command: "kh {set_id} {data}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "TCP/IP: decimal 0-100. Serial: hex 00-64"

- id: colour
  label: Colour
  kind: action
  tcp_command: "PICTURE_COLOUR {level}"
  serial_command: "ki {set_id} {data}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "TCP/IP: decimal 0-100. Serial: hex 00-64"

- id: tint
  label: Tint
  kind: action
  tcp_command: "PICTURE_TINT {level}"
  serial_command: "kj {set_id} {data}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "TCP/IP: decimal 0-100. Serial: hex 00(Red)-64(Green)"

- id: sharpness
  label: Sharpness
  kind: action
  tcp_command: "PICTURE_SHARPNESS {level}"
  serial_command: "kk {set_id} {data}"
  params:
    - name: level
      type: integer
      min: 0
      max: 50
      description: "TCP/IP: decimal 0-50. Serial: hex 00-32"

- id: osd_select
  label: OSD Select
  kind: action
  tcp_command: "OSD_SELECT {state}"
  serial_command: "kl {set_id} {data}"
  params:
    - name: state
      type: enum
      values: ["on", "off"]
      description: "TCP/IP: on/off. Serial data hex: 00=off, 01=on"

- id: remote_lock
  label: Remote Control Lock
  kind: action
  tcp_command: "REMOTECONTROLER_LOCK {state}"
  serial_command: "km {set_id} {data}"
  params:
    - name: state
      type: enum
      values: ["on", "off"]
      description: "TCP/IP: on/off. Serial data hex: 00=lock off, 01=lock on"

- id: treble
  label: Treble
  kind: action
  tcp_command: null  # UNRESOLVED: treble not listed in IP command table
  serial_command: "kr {set_id} {data}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Serial only. Hex 00-64."

- id: bass
  label: Bass
  kind: action
  tcp_command: null  # UNRESOLVED: bass not listed in IP command table
  serial_command: "ks {set_id} {data}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Serial only. Hex 00-64."

- id: balance
  label: Balance
  kind: action
  tcp_command: "AUDIO_BALANCE {level}"
  serial_command: "kt {set_id} {data}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "TCP/IP: decimal 0-100. Serial: hex 00-64"

- id: colour_temperature
  label: Colour Temperature
  kind: action
  tcp_command: "PICTURE_COLOUR_TEMPERATURE {level}"
  serial_command: "xu {set_id} {data}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "TCP/IP: decimal 0-100. Serial: hex 00-64"

- id: equalizer
  label: Equalizer
  kind: action
  tcp_command: "AUDIO_EQUALIZER {band} {step}"
  serial_command: "jv {set_id} {data}"
  params:
    - name: band
      type: integer
      min: 1
      max: 5
      description: "Frequency band (1-5)"
    - name: step
      type: integer
      min: 0
      max: 20
      description: "EQ step value (decimal). Serial uses 9-bit encoded data."
  notes: "Precondition: sound mode must be set to EQ adjustable value."

- id: energy_saving
  label: Energy Saving
  kind: action
  tcp_command: "ENERGY_SAVING {mode}"
  serial_command: "jq {set_id} {data}"
  params:
    - name: mode
      type: enum
      values: ["off", "minimum", "medium", "maximum", "screenoff"]
      description: "TCP/IP mode names. Serial data hex: 00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto/Intelligent sensor, 05=Screen off"

- id: tune_channel
  label: Tune Channel
  kind: action
  tcp_command: "CHANNEL_SETTING_ATSC_ATV {channel} {source}"
  serial_command: "ma {set_id} {data00} {data01} {data02}"
  params:
    - name: channel
      type: integer
      description: "Channel number (decimal)"
    - name: source
      type: enum
      values: ["antenna", "cable"]
      description: "TCP/IP: antenna or cable. Serial uses Data05 byte (00=ATV, 80=CATV, etc.)"
  notes: "TCP/IP also supports CHANNEL_SETTING_ATSC_DTV with major/minor channel numbers. Serial has extensive channel tuning with physical/major/minor addressing. See source for regional variants."

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  tcp_command: "CHANNEL_ADD_DELETE {action}"
  serial_command: "mb {set_id} {data}"
  params:
    - name: action
      type: enum
      values: ["add", "delete"]
      description: "TCP/IP: add or delete. Serial data hex: 00=Del/Skip, 01=Add"

- id: key_action
  label: Key (IR Remote Emulation)
  kind: action
  tcp_command: "KEY_ACTION {key}"
  serial_command: "mc {set_id} {data}"
  params:
    - name: key
      type: enum
      values: ["exit", "channelup", "channeldown", "volumeup", "volumedown", "arrowright", "arrowleft", "volumemute", "deviceinput", "sleepreserve", "livetv", "previouschannel", "favoritechannel", "teletext", "teletextoption", "returnback", "avmode", "captionsubtitle", "arrowup", "arrowdown", "myapp", "settingmenu", "ok", "quickmenu", "videomode", "audiomode", "channellist", "bluebutton", "yellowbutton", "greenbutton", "redbutton", "aspectratio", "audiodescription", "programmorder", "userguide", "smarthome", "simplelink", "fastforward", "rewind", "programminfo", "programguide", "play", "slowplay", "soccerscreen", "record", "3d", "autoconfig", "app", "screenbright", "number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9"]
      description: "TCP/IP key names. Serial uses hex key codes (see Key Codes table in source)."

- id: backlight
  label: Backlight Control
  kind: action
  tcp_command: "PICTURE_BACKLIGHT {level}"
  serial_command: "mg {set_id} {data}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "TCP/IP: decimal 0-100. Serial: hex 00-64. Precondition: Energy Saving must be off."

- id: input_select
  label: Input Select
  kind: action
  tcp_command: "INPUT_SELECT {source}"
  serial_command: "xb {set_id} {data}"
  params:
    - name: source
      type: enum
      values: ["dtv", "atv", "cadtv", "catv", "avav1", "component1", "hdmi1", "hdmi2", "hdmi3"]
      description: "TCP/IP source names. Serial data hex: 00=DTV, 01=CADTV, 02=Satellite DTV, 10=ATV, 11=CATV, 20=AV/AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4"

- id: three_d
  label: 3D Control
  kind: action
  tcp_command: "PICTURE_3D {options}"
  serial_command: "xt {set_id} {data00} {data01} {data02} {data03}"
  params:
    - name: mode
      type: enum
      values: ["off", "3dto2d", "2dto3d", "on"]
      description: "3D mode. Additional sub-params vary by mode."
  notes: "Complex multi-parameter command. See source for full 3D pattern, direction, and depth options."

- id: three_d_extension
  label: Extended 3D Control
  kind: action
  tcp_command: "PICTURE_3D_EXTENSION {option} {value}"
  serial_command: "xv {set_id} {data00} {data01}"
  params:
    - name: option
      type: enum
      values: ["picturecorrection", "colorcorrection", "sound", "normal", "depth", "viewpoint", "genre"]
      description: "3D option to control"
    - name: value
      type: string
      description: "Option-dependent value (0/1 for toggles, 0-20 for depth/viewpoint, 0-5 for genre)"
  notes: "Complex command with option-dependent parameter ranges. See source for details."

- id: ism_method
  label: ISM Method
  kind: action
  tcp_command: null  # UNRESOLVED: ISM method not listed in IP command table
  serial_command: "jp {set_id} {data}"
  params:
    - name: method
      type: enum
      values: ["orbiter", "normal", "colour_wash"]
      description: "Serial only (Plasma TV). Data hex: 02=Orbiter, 08=Normal, 20=Colour Wash"

- id: auto_configure
  label: Auto Configure
  kind: action
  tcp_command: null  # UNRESOLVED: auto configure not listed in IP command table
  serial_command: "ju {set_id} 01"
  params: []
  notes: "Adjusts picture position in RGB (PC) mode only. Serial only."

- id: disconnect
  label: Disconnect (IP)
  kind: action
  tcp_command: "quit"
  serial_command: null
  params: []
  notes: "TCP/IP only. Closes the telnet session."
```

## Feedbacks
```yaml
# Serial protocol acknowledgements:
# OK: [CMD2][ ][SetID][ ][OK][Data][x]
# NG: [CMD2][ ][SetID][ ][NG][Data][x]  (Data 00 = Illegal Code)
#
# TCP/IP protocol responses: plain "OK" or "NG" after each command.

- id: power_state
  label: Power State
  type: enum
  values: ["on", "off"]
  description: "Serial query: send ka [SetID] FF. Response data: 00=Off, 01=On."

- id: volume_level
  label: Volume Level
  type: integer
  min: 0
  max: 100
  description: "Serial query: send kf [SetID] FF. Response data: current volume hex."

- id: mute_state
  label: Mute State
  type: enum
  values: ["on", "off"]
  description: "Serial query: send ke [SetID] FF. Response data: 00=mute on, 01=mute off."

- id: input_source
  label: Input Source
  type: enum
  values: ["DTV", "CADTV", "ATV", "CATV", "AV", "Component", "RGB", "HDMI1", "HDMI2", "HDMI3", "HDMI4"]
  description: "Serial query: send xb [SetID] FF."

# UNRESOLVED: TCP/IP protocol does not document explicit query/status commands
# UNRESOLVED: no unsolicited event/notification mechanism documented for either protocol
```

## Variables
```yaml
# All level parameters are set via Actions and queryable via serial FF data.
# The device does not expose a separate variable set mechanism.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification/event mechanism documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements documented in source
```

## Notes

### Serial Protocol Details

**Command format:** `[CMD1][CMD2][ ][Set ID][ ][Data][Cr]`
- CMD1: first command character (j, k, m, or x)
- CMD2: second command character
- Set ID: decimal 1-99 on TV menu, transmitted as hex (0x00-0x63). Set ID 0 = broadcast to all connected sets.
- Data: hexadecimal. Send `FF` to read current status (query mode).
- `[Cr]` = ASCII 0x0D, `[ ]` = ASCII 0x20

**Acknowledgement format:**
- OK: `[CMD2][ ][Set ID][ ][OK][Data][x]`
- NG: `[CMD2][ ][Set ID][ ][NG][Data][x]`
- Data 00 in NG response = Illegal Code

**Communication:** ASCII codes, crossed (reverse) cable. DE9 (D-Sub 9pin) or phone jack connector types depending on model. USB-to-Serial supported via PL2303 chip (VID 0x0557, PID 0x2008).

### TCP/IP Protocol Details

**Connection:** Telnet to TV IP address on port 9761. IP Control must be enabled on the TV first via Settings menu (hold Settings 5s on Live TV screen, enter code 828 to access IP Control Setup, set Network IP Control to On, reboot).

**Command format:** Plain text command followed by Enter. Example: `VOLUME_MUTE on`
**Response:** `OK` (success) or `NG` (failure)
**Disconnect:** `quit`

**Region note:** IP control documentation states "For USA only." Availability in other regions is not documented.

### Serial vs TCP/IP Command Coverage

The serial protocol has broader command coverage. The following serial commands have no documented TCP/IP equivalent: Power On (ka 01 — use WOL for IP), Treble (kr), Bass (ks), ISM Method (jp), Auto Configure (ju). The serial protocol also supports Set ID addressing (multi-display configurations) which the IP protocol does not.

### Operational Notes

- During media playback or recording, only Power (ka) and Key (mc) commands execute; all others return NG.
- RS-232C cable supports `ka` command in both power-on and power-off states. USB-to-Serial only works when TV is on.
- Remote control lock (km) is released after main power off/on cycle (20-30 seconds after plug-off).
- Power On via IP: use Wake On LAN (WOL) — set "Mobile TV On" to On in TV settings, then use a WOL app.

<!-- UNRESOLVED: maximum concurrent connection count for IP control not stated -->
<!-- UNRESOLVED: command rate limits or minimum inter-command delay not stated -->
<!-- UNRESOLVED: exact connector type for this specific model (49SK8100PLA) not stated -->
<!-- UNRESOLVED: whether TCP/IP control is available outside USA not stated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_49sk8100pla_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:59:48.823Z
retrieved_at: 2026-04-25T20:59:48.823Z
last_checked_at: 2026-04-25T20:59:48.823Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:59:48.823Z
matched_actions: 29
action_count: 29
confidence: high
summary: "All 29 spec actions matched verbatim to source commands; all transport parameters verified; complete coverage."
```

## Known Gaps

```yaml
[]
```
