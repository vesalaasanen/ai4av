---
spec_id: admin/lg-49nano81una
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 49NANO81UNA Control Spec"
manufacturer: LG
model_family: 49NANO81UNA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49NANO81UNA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T01:09:06.402Z
last_checked_at: 2026-06-03T05:36:09.952Z
generated_at: 2026-06-03T05:36:09.952Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source; ISM Method (jp) is plasma-only and not applicable to this LED model; 3D commands (xt, xv) are 3D-model-only and not applicable to the 49NANO81UNA"
  - "no unsolicited event/notification stream documented in source."
  - "no per-input signal-presence or picture-mode feedback beyond the parameter read acks."
  - "no other persistent-state variables documented in source."
  - "no multi-step sequences described in source."
  - "no explicit safety warnings, interlocks, or power-on sequencing requirements in source."
  - "firmware version compatibility not stated in source."
  - "which specific xb input codes (e.g. HDMI3/HDMI4, ISDB-BS) the 49NANO81UNA accepts — only stated as \"depends on model and signal\"."
verification:
  verdict: verified
  checked_at: 2026-06-03T05:36:09.952Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions traced to source (multi-fence parser fix re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 49NANO81UNA Control Spec

## Summary
RS-232C and Telnet (IP) external control protocol for the LG 49NANO81UNA NanoCell TV. Source documents 27 ASCII command families over serial (9600 8N1) plus a parallel set of keyword commands over TCP port 9761, covering power, input selection, picture/sound tuning, channel tuning, remote-key emulation, and backlight. 3D and ISM commands are documented but model-dependent (NANO81 is not 3D, not plasma).

<!-- UNRESOLVED: firmware version compatibility not stated in source; ISM Method (jp) is plasma-only and not applicable to this LED model; 3D commands (xt, xv) are 3D-model-only and not applicable to the 49NANO81UNA -->

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
  communication_code: ascii
  cable: crossed_reverse
  port_options:
    - USB_to_serial_PL2303  # Vendor ID 0x0557, Product ID 0x2008
    - DE9_RS232C  # D-Sub 9-pin female-to-female
    - phone_jack_RS232C
addressing:
  port: 9761
auth:
  type: none  # inferred: no login procedure for the telnet/serial session itself
  # Note: the IP Control Setup menu is gated by a 3-digit password (default 828)
  # but that is a local-menu credential, not a transport-layer authentication.
```

## Traits
```yaml
# powerable       - Power (ka) command documented
# routable        - Input select (xb) command documented
# queryable       - Status query via [Data]=FF returns current state, plus all [Cmd2]...[OK/NG] acks
# levelable       - Volume, Contrast, Brightness, Color, Tint, Sharpness, Treble, Bass, Balance, Backlight, Equalizer documented
```

## Actions
```yaml
# Frame: [Cmd1][Cmd2][ ][SetID][ ][Data][Cr]  where SetID is hex 0x00..0x63 (0=broadcast)
# Response: [Cmd2][ ][SetID][ ][OK/NG][Data][x]; 'NG' with Data 00 = Illegal Code
# Read status: transmit Data=FF; current state returned in ack Data.

- id: power
  label: Power
  kind: action
  command: "ka {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]  # 00=Off, 01=On
  notes: |
    Transmit "ka {SetID} FF" to query power state.
    With RS-232C cable: works in both power-on and power-off states.
    With USB-to-Serial converter: works only when TV is on.

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "kc {data}"
  params:
    - name: data
      type: enum
      values:
        - "01"  # Normal 4:3
        - "02"  # Wide 16:9
        - "04"  # Zoom
        - "05"  # Zoom 2 (Europe, Colombia, Mid-East)
        - "06"  # Set by Program / Original
        - "07"  # 14:9 (Europe, Colombia, Mid-East, Asia ex KR/JP)
        - "09"  # Just Scan
        - "0B"  # Full Wide (Latin America ex Colombia)
        - "0C"  # 21:9 (model-dependent)
        - "10..1F"  # Cinema Zoom 1..16

- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {data}"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Screen mute off (Picture on), Video mute off
        - "01"  # Screen mute on (Picture off)
        - "10"  # Video mute on

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]  # 00=Mute on, 01=Mute off

- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {data}"
  params:
    - name: data
      type: integer
      range: "00..64"

- id: contrast
  label: Contrast
  kind: action
  command: "kg {data}"
  params:
    - name: data
      type: integer
      range: "00..64"

- id: brightness
  label: Brightness
  kind: action
  command: "kh {data}"
  params:
    - name: data
      type: integer
      range: "00..64"

- id: color
  label: Color / Colour
  kind: action
  command: "ki {data}"
  params:
    - name: data
      type: integer
      range: "00..64"

- id: tint
  label: Tint
  kind: action
  command: "kj {data}"
  notes: |
    Data range: 00=Red .. 64=Green. Model-dependent.
    Ack identifier is 'r', not 'j'.

- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {data}"
  params:
    - name: data
      type: integer
      range: "00..32"

- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]  # 00=OSD off, 01=OSD on

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  command: "km {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]  # 00=Lock off, 01=Lock on
  notes: |
    Lock released after main power cycle (plug-off/on, 20-30s).
    When in standby and lock is on, IR/local Power key will not turn TV on.

- id: treble
  label: Treble
  kind: action
  command: "kr {data}"
  params:
    - name: data
      type: integer
      range: "00..64"
  notes: Ack identifier is 'u'.

- id: bass
  label: Bass
  kind: action
  command: "ks {data}"
  params:
    - name: data
      type: integer
      range: "00..64"

- id: balance
  label: Balance
  kind: action
  command: "kt {data}"
  params:
    - name: data
      type: integer
      range: "00..64"

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "xu {data}"
  params:
    - name: data
      type: integer
      range: "00..64"
  notes: Ack identifier is 'l'.

- id: ism_method
  label: ISM Method
  kind: action
  command: "jp {data}"
  params:
    - name: data
      type: enum
      values: ["02", "08", "20"]  # 02=Orbiter, 08=Normal, 20=Color Wash
  notes: Plasma TV only. Not applicable to LED/LCD models like 49NANO81UNA.

- id: equalizer
  label: Equalizer
  kind: action
  command: "jv {data}"
  notes: |
    Single-byte Data encoding two fields:
      bits 7-5: frequency band (000=1st .. 100=5th)
      bits 4-0: step value (0..20 decimal)
    Sound mode must be EQ-adjustable.

- id: energy_saving
  label: Energy Saving
  kind: action
  command: "jq {data}"
  params:
    - name: data
      type: enum
      values:
        - "00"  # Off
        - "01"  # Minimum
        - "02"  # Medium
        - "03"  # Maximum
        - "04"  # Auto (LCD/LED) / Intelligent sensor (PDP)
        - "05"  # Screen off

- id: tune_command
  label: Tune Command
  kind: action
  command: "ma {data00} {data01} {data02}"
  notes: |
    Layout varies by region. Europe/Mid-East/Colombia/Asia(ex KR,JP) - 3 data bytes:
      ma [SetID] [Data00 hi] [Data01 lo] [Data02 input]
    SetID must be '0' for major/minor variants.

- id: channel_add_del
  label: Channel Add/Del (Skip)
  kind: action
  command: "mb {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]  # 00=Del(ATSC/ISDB)/Skip(DVB), 01=Add

- id: key
  label: IR Remote Key
  kind: action
  command: "mc {keycode_hex}"
  notes: |
    Data is a hex key code from the IR Key Code table (see Key Codes section).
    Unlike most other commands, this one is executed even during media playback/recording.

- id: control_backlight
  label: Control Backlight
  kind: action
  command: "mg {data}"
  params:
    - name: data
      type: integer
      range: "00..64"

- id: control_panel_light
  label: Control Panel Light
  kind: action
  command: "mg {data}"
  params:
    - name: data
      type: integer
      range: "00..64"
  notes: Same opcode as Control Backlight; semantics differ by model.

- id: input_select
  label: Input Select (Main Picture)
  kind: action
  command: "xb {data}"
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
  notes: ISDB-BS (Japan) - see source for the Japan-specific code.

- id: 3d_mode
  label: 3D Mode
  kind: action
  command: "xt {d00} {d01} {d02} {d03}"
  notes: |
    3D models only. Not applicable to 49NANO81UNA.
    Data00: 00=3D On, 01=3D Off, 02=3D to 2D, 03=2D to 3D.
    Data01: 00=Top/Bottom, 01=Side-by-Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving.
    Data02 (Plasma): 00=Right→Left, 01=Left→Right.
    Data03: 3D Effect 00..14 hex.

- id: 3d_extended
  label: Extended 3D
  kind: action
  command: "xv {d00} {d01}"
  notes: |
    3D models only. Not applicable to 49NANO81UNA.
    Data00 options: 00=Picture Correction, 01=Depth (manual only), 02=Viewpoint,
      06=Color Correction, 07=Sound Zooming, 08=Normal Image View, 09=Mode (Genre).
    See source for the per-option Data01 ranges and preconditions.

- id: auto_configure
  label: Auto Configure
  kind: action
  command: "ju {data}"
  params:
    - name: data
      type: enum
      values: ["01"]  # 01 = run Auto Configure
  notes: |
    RGB (PC) input only. Adjusts picture position and minimizes image shaking.
    Model-dependent.

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "ka FF"
  notes: Returns current power state in ack Data.

- id: volume_mute_status_query
  label: Volume Mute Status Query
  kind: query
  command: "ke FF"

- id: volume_status_query
  label: Volume Status Query
  kind: query
  command: "kf FF"
```

### IR Key Codes (for `mc` command)
```yaml
# All values are hex. Source: p.2 of the LG Owner's Manual External Control section.
# Each entry maps to the corresponding R/C button.
key_codes:
  "00": "CH +, PR +"
  "01": "CH -, PR -"
  "02": "Volume +"
  "03": "Volume -"
  "06": "Arrow Right (>)"
  "07": "Arrow Left (<)"
  "08": "Power"
  "09": "Mute"
  "0B": "Input"
  "0E": "SLEEP"
  "0F": "TV, TV/RAD"
  "10-19": "Number Keys 0-9"
  "1A": "Q.View / Flashback"
  "1E": "FAV (Favorite Channel)"
  "20": "Text (Teletext)"
  "21": "T.Opt (Teletext Option)"
  "28": "Return (BACK)"
  "30": "AV (Audio/Video) Mode"
  "39": "Caption/Subtitle"
  "40": "Arrow Up (Cursor)"
  "41": "Arrow Down (Cursor)"
  "42": "My Apps"
  "43": "Menu / Settings"
  "44": "OK / Enter"
  "45": "Q.Menu"
  "4C": "List, - (ATSC only)"
  "4D": "PICTURE"
  "52": "SOUND"
  "53": "List"
  "5B": "Exit"
  "60": "PIP(AD)"
  "61": "Blue"
  "63": "Yellow"
  "71": "Green"
  "72": "Red"
  "79": "Ratio / Aspect Ratio"
  "7A": "User Guide"
  "7C": "Smart / Home"
  "7E": "SIMPLINK"
  "8E": "Forward (>>)"
  "8F": "Rewind (<<)"
  "91": "AD (Audio Description)"
  "99": "AutoConfig"
  "9B": "TV / PC"
  "9E": "LIVE MENU"
  "9F": "App / *"
  "AA": "Info"
  "AB": "Program Guide"
  "B0": "Play"
  "B1": "Stop / File List"
  "B5": "RECENT"
  "BA": "Freeze / Slow Play / Pause"
  "BB": "Soccer"
  "BD": "REC"
  "DC": "3D"
  notes: |
    Key code 4C is available only on ATSC/ISDB models (South Korea, Japan,
    North America, Latin America except Colombia).
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  source: "ka" command ack with Data 00/01

- id: volume_mute_state
  type: enum
  values: [on, off]
  source: "ke" command ack with Data 00/01

- id: volume_level
  type: integer
  range: "0..100"
  source: "kf" command ack (data range 00..64 hex)

- id: ok_acknowledgement
  type: string
  format: "[Cmd2][ ][SetID][ ][OK][Data][x]"
  description: Returned when command is accepted; Data echoes the value just written, or current state for read-mode.

- id: error_acknowledgement
  type: string
  format: "[Cmd2][ ][SetID][ ][NG][Data][x]"
  description: Returned on illegal code / communication error. Data 00 = Illegal Code.

# UNRESOLVED: no unsolicited event/notification stream documented in source.
# UNRESOLVED: no per-input signal-presence or picture-mode feedback beyond the parameter read acks.
```

## Variables
```yaml
- id: set_id
  type: integer
  range: "1..99 (decimal) / 0x00..0x63 (hex)"
  description: |
    Monitor ID for multi-TV RS-232 buses. 0 broadcasts to all connected sets.
    Configured via Settings > General > About this TV (or OPTION) > SET ID.
# UNRESOLVED: no other persistent-state variables documented in source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification stream documented in source.
# The protocol is strictly request/response; the device only speaks when spoken to.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: |
      Volume mute (ke), screen mute (kd), and input select (xb) take effect immediately
      without a confirm step. Application-layer confirmation is the integrator's responsibility.
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing requirements in source.
```

## Notes
- The source explicitly notes that during media playback/recording, all commands except `ka` (Power) and `mc` (Key) are treated as `NG`. Application logic should pause media before sending picture/sound/tuning commands, or expect `NG` acks.
- RS-232 vs USB-to-Serial asymmetry: with the DE9 RS-232C cable the `ka` power command works in both standby and on states; with the PL2303 USB-to-Serial converter, `ka` works only while the TV is on (standby has the USB host unpowered).
- Real-data mapping: a single hex byte covers steps 0..254 (00..FE); a two-byte pair covers steps 256..9999 (e.g. `27 0F` = 9999). Set ID range 1..99 maps to hex 00..63.
- IP control (USA only) reuses the same logic but with a different command vocabulary over telnet on TCP 9761. The 3-digit password (default `828`) gates the *setup menu* only, not the telnet session.
- Several commands have quirks worth noting at integration time:
  - `Tint` (kj) ack echoes the identifier `r`, not `j`.
  - `Treble` (kr) ack echoes the identifier `u`.
  - `Color Temperature` (xu) ack echoes the identifier `l`.
  - `Control Backlight` and `Control Panel Light` share opcode `mg`; semantics depend on model.
  - `Set ID = 0` broadcasts to every connected TV on the bus.
- The 49NANO81UNA is an LED/LCD NanoCell set, so plasma-only commands (ISM Method `jp`) and 3D-only commands (`xt`, `xv`) are listed for protocol completeness but should not be expected to function on this specific model.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: which specific xb input codes (e.g. HDMI3/HDMI4, ISDB-BS) the 49NANO81UNA accepts — only stated as "depends on model and signal". -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T01:09:06.402Z
last_checked_at: 2026-06-03T05:36:09.952Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T05:36:09.952Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions traced to source (multi-fence parser fix re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source; ISM Method (jp) is plasma-only and not applicable to this LED model; 3D commands (xt, xv) are 3D-model-only and not applicable to the 49NANO81UNA"
- "no unsolicited event/notification stream documented in source."
- "no per-input signal-presence or picture-mode feedback beyond the parameter read acks."
- "no other persistent-state variables documented in source."
- "no multi-step sequences described in source."
- "no explicit safety warnings, interlocks, or power-on sequencing requirements in source."
- "firmware version compatibility not stated in source."
- "which specific xb input codes (e.g. HDMI3/HDMI4, ISDB-BS) the 49NANO81UNA accepts — only stated as \"depends on model and signal\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
