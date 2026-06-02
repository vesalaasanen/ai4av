---
spec_id: admin/lg-49nano80una
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 49NANO80UNA Control Spec"
manufacturer: LG
model_family: 49NANO80UNA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49NANO80UNA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T01:11:18.020Z
last_checked_at: 2026-06-02T01:48:20.704Z
generated_at: 2026-06-02T01:48:20.704Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ISM (jp) is Plasma-only; 3D (xt) and Extended 3D (xv) are 3D-models-only. 49NANO80UNA is LED/NanoCell, non-3D. These actions are included for protocol completeness, not because the device supports them."
  - "49NANO80UNA is LED; ISM not supported. Included for protocol completeness."
  - "ma format varies by region (Korea/Japan/N.America/Europe) and signal type (analog/digital/cable/satellite). See source pp.9-10 for full encoding table."
  - "backlight and panel light share opcode mg; documented as two distinct functions in source."
  - "49NANO80UNA is not 3D. Included for protocol completeness."
  - "most commands (kd, kg, kh, ki, kj, kk, kl, km, kr, ks, kt, kc, xb, xu, jq, xt, xv, mb, mg) accept FF as query data and return current state in the same ACK format; not enumerated as individual Feedbacks."
  - "settable scalar parameters (volume/contrast/brightness/color/tint/sharpness/treble/bass/balance/color_temperature/energy_saving) are exposed as Actions rather than discrete Variables."
  - "source does not document unsolicited device-to-host events."
  - "source does not document multi-step sequences."
  - "source does not contain safety warnings or interlock procedures."
  - "Network IP control (Telnet 9761) uses a different command syntax — `KEYWORD value` form (e.g. `VOLUME_MUTE on`, `PICTURE_CONTRAST 50`) — documented in source pp.13-15. Only RS-232C protocol is enumerated in detail above."
  - "Power command works in both standby and on-state with RS-232C cable, but only when TV is on with USB-to-Serial converter. Source explicitly notes this asymmetry."
verification:
  verdict: verified
  checked_at: 2026-06-02T01:48:20.704Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched literal RS-232C command mnemonics in source; all transport parameters verified verbatim. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 49NANO80UNA Control Spec

## Summary
LG 49NANO80UNA NanoCell TV. RS-232C serial and Telnet network (port 9761) external control. ASCII protocol with carriage-return termination and Set ID addressing 1-99. Source covers a family of LG TVs (Plasma/LED/LCD); not all commands apply to this model.

<!-- UNRESOLVED: ISM (jp) is Plasma-only; 3D (xt) and Extended 3D (xv) are 3D-models-only. 49NANO80UNA is LED/NanoCell, non-3D. These actions are included for protocol completeness, not because the device supports them. -->

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
  port: 9761  # IP control Telnet port; RS-232C is the primary control port
auth:
  type: none  # inferred: no login procedure for RS-232C; IP control has 3-digit menu password (default 828) only for setup menu, not the telnet session
```

## Traits
```yaml
# powerable    # inferred from power (ka) command
# queryable    # inferred from FF-data query pattern (transmit FF to read status)
# routable     # inferred from input_select (xb) command
# levelable    # inferred from volume/contrast/brightness/treble/bass/balance commands
```

## Actions
```yaml
# 01. Power (Command: ka)
- id: power
  label: Power
  kind: action
  command: "ka {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte (00=broadcast, 01-63=specific TV)"
    - name: data
      type: string
      description: "00=Power Off, 01=Power On, FF=Query status"

# 02. Aspect Ratio (Command: kc)
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "kc {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "01=Normal, 02=16:9, 04=Zoom, 05=Zoom2, 06=Set by Program/Original, 07=14:9, 09=Just Scan, 0B=Full Wide, 0C=21:9, 10-1F=Cinema Zoom 1-16"

# 03. Screen Mute (Command: kd)
- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "00=Screen mute off (Picture on, Video mute off), 01=Screen mute on (Picture off), 10=Video mute on"

# 04. Volume Mute (Command: ke)
- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "00=Mute on (Volume off), 01=Mute off (Volume on), FF=Query"

# 05. Volume Control (Command: kf)
- id: volume
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Volume 00-64 hex (00-100 decimal)"

# 06. Contrast (Command: kg)
- id: contrast
  label: Contrast
  kind: action
  command: "kg {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Contrast 00-64 hex"

# 07. Brightness (Command: kh)
- id: brightness
  label: Brightness
  kind: action
  command: "kh {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Brightness 00-64 hex"

# 08. Color/Colour (Command: ki)
- id: color
  label: Color/Colour
  kind: action
  command: "ki {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Color 00-64 hex"

# 09. Tint (Command: kj)
- id: tint
  label: Tint
  kind: action
  command: "kj {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Tint 00 (Red) to 64 (Green) hex"

# 10. Sharpness (Command: kk)
- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Sharpness 00-32 hex"

# 11. OSD Select (Command: kl)
- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "00=OSD off, 01=OSD on"

# 12. Remote Control Lock Mode (Command: km)
- id: remote_lock
  label: Remote Control Lock Mode
  kind: action
  command: "km {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "00=Lock off, 01=Lock on"

# 13. Treble (Command: kr)
- id: treble
  label: Treble
  kind: action
  command: "kr {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Treble 00-64 hex"

# 14. Bass (Command: ks)
- id: bass
  label: Bass
  kind: action
  command: "ks {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Bass 00-64 hex"

# 15. Balance (Command: kt)
- id: balance
  label: Balance
  kind: action
  command: "kt {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Balance 00-64 hex"

# 16. Color Temperature (Command: xu)
- id: color_temperature
  label: Color Temperature
  kind: action
  command: "xu {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Color temperature 00-64 hex"

# 17. ISM Method (Command: jp) - Plasma TV only
- id: ism_method
  label: ISM Method (Plasma only)
  kind: action
  command: "jp {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "02=Orbiter, 08=Normal, 20=Color Wash"
  # UNRESOLVED: 49NANO80UNA is LED; ISM not supported. Included for protocol completeness.

# 18. Equalizer (Command: jv)
- id: equalizer
  label: Equalizer
  kind: action
  command: "jv {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Single hex byte: bits 7-5 = frequency band (000=1st, 001=2nd, 010=3rd, 011=4th, 100=5th), bits 4-0 = step value 0-20"

# 19. Energy Saving (Command: jq)
- id: energy_saving
  label: Energy Saving
  kind: action
  command: "jq {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto (LCD/LED) / Intelligent sensor (PDP), 05=Screen off"

# 20. Tune Command (Command: ma)
- id: tune_channel
  label: Tune Channel
  kind: action
  command: "ma {set_id} {d0} {d1} {d2} {d3} {d4} {d5}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte (or 0 for variant form)"
    - name: d0
      type: string
      description: "High byte channel data (or 00=don't care for digital)"
    - name: d1
      type: string
      description: "Low byte channel data / High byte Major channel"
    - name: d2
      type: string
      description: "Input Source (analog: 00=ATV, 80=CATV) / Low byte Major channel"
    - name: d3
      type: string
      description: "High byte Minor channel (or 00)"
    - name: d4
      type: string
      description: "Low byte Minor channel (or 00)"
    - name: d5
      type: string
      description: "Input Source (digital): 00=ATV, 01=CATV, 02=DTV-Antenna, 06=CADTV, 22=DTV-Antenna(no phy), 26=CADTV(no phy), 40=SDTV, 46/66=CADTV one-part, 90=CADTV"
  # UNRESOLVED: ma format varies by region (Korea/Japan/N.America/Europe) and signal type (analog/digital/cable/satellite). See source pp.9-10 for full encoding table.

# 21. Channel Add/Del (Command: mb)
- id: channel_add_del
  label: Channel Add/Del (Skip)
  kind: action
  command: "mb {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "00=Del (ATSC/ISDB) / Skip (DVB), 01=Add"

# 22. Key (Command: mc)
- id: key_action
  label: IR Key Code
  kind: action
  command: "mc {set_id} {key_code}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: key_code
      type: string
      description: "Hex key code from source: 00=CH+, 01=CH-, 02=Vol+, 03=Vol-, 06=Right, 07=Left, 08=Power, 09=Mute, 0B=Input, 0E=Sleep, 0F=TV, 10-19=Number 0-9, 1A=Q.View, 1E=FAV, 20=Text, 21=T.Opt, 28=Return, 30=AV, 39=Caption, 40=Up, 41=Down, 42=MyApps, 43=Menu, 44=OK, 45=Q.Menu, 4C=List, 4D=Picture, 52=Sound, 53=List, 5B=Exit, 60=PIP/AD, 61=Blue, 63=Yellow, 71=Green, 72=Red, 79=Ratio, 7A=UserGuide, 7C=Smart/Home, 7E=SIMPLINK, 8E=Fwd, 8F=Rew, 91=AD, 99=AutoConfig, 9B=TV/PC, 9E=LiveMenu, 9F=App, AA=Info, AB=ProgramGuide, B0=Play, B1=Stop, B5=Recent, BA=Pause, BB=Soccer, BD=Rec, DC=3D"

# 23. Control Backlight (Command: mg)
- id: backlight
  label: Control Backlight
  kind: action
  command: "mg {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Backlight 00-64 hex"

# 23. Control Panel Light (Command: mg)
- id: panel_light
  label: Control Panel Light
  kind: action
  command: "mg {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "Panel light 00-64 hex"
  # UNRESOLVED: backlight and panel light share opcode mg; documented as two distinct functions in source.

# 24. Input Select (Command: xb)
- id: input_select
  label: Input Select (Main)
  kind: action
  command: "xb {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1, 04=ISDB-CS2, 10=ATV, 11=CATV, 20=AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4"

# 25. 3D (Command: xt) - 3D models only
- id: picture_3d
  label: 3D Mode
  kind: action
  command: "xt {set_id} {d0} {d1} {d2} {d3}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: d0
      type: string
      description: "00=3D On, 01=3D Off, 02=3D to 2D, 03=2D to 3D"
    - name: d1
      type: string
      description: "00=Top/Bottom, 01=Side by Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving"
    - name: d2
      type: string
      description: "00=Right to Left, 01=Left to Right (Plasma only)"
    - name: d3
      type: string
      description: "3D depth 00-14 hex"
  # UNRESOLVED: 49NANO80UNA is not 3D. Included for protocol completeness.

# 26. Extended 3D (Command: xv) - 3D models only
- id: picture_3d_extension
  label: Extended 3D
  kind: action
  command: "xv {set_id} {d0} {d1}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: d0
      type: string
      description: "00=3D Picture Correction, 01=3D Depth, 02=3D Viewpoint, 06=3D Color Correction, 07=3D Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre)"
    - name: d1
      type: string
      description: "Per-option: d0=00 -> 00/01; d0=01/02 -> 0-14 (depth) or 0-20 (viewpoint); d0=06/07 -> 00/01; d0=08 -> 00/01; d0=09 -> 00-05 (Standard/Sport/Cinema/Extreme/Manual/Auto)"
  # UNRESOLVED: 49NANO80UNA is not 3D. Included for protocol completeness.

# 27. Auto Configure (Command: ju) - RGB/PC mode only
- id: auto_configure
  label: Auto Configure
  kind: action
  command: "ju {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: "Set ID hex byte"
    - name: data
      type: string
      description: "01=Run auto configure (RGB/PC mode only)"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  source: "Response to ka {set_id} FF - data 00=Off, 01=On"
- id: volume_mute_state
  type: enum
  values: [on, off]
  source: "Response to ke {set_id} FF - data 00=Mute on, 01=Mute off"
# UNRESOLVED: most commands (kd, kg, kh, ki, kj, kk, kl, km, kr, ks, kt, kc, xb, xu, jq, xt, xv, mb, mg) accept FF as query data and return current state in the same ACK format; not enumerated as individual Feedbacks.
```

## Variables
```yaml
# UNRESOLVED: settable scalar parameters (volume/contrast/brightness/color/tint/sharpness/treble/bass/balance/color_temperature/energy_saving) are exposed as Actions rather than discrete Variables.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited device-to-host events.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings or interlock procedures.
# Note: Remote control lock (km 01) disables IR + local keys. External control lock is released by AC power cycle (unplug 20-30s). Standby + key lock prevents IR/local power-on; not safety-critical.
```

## Notes
- Transport: ASCII over RS-232C, 9600 8N1, carriage-return (0x0D) terminated, space (0x20) delimited
- Cable: crossed (null-modem) RS-232C cable required
- USB-to-Serial alternative: PL2303 chip (VID 0x0557, PID 0x2008); works only when TV is powered on
- Set ID: 1-99 decimal in TV menu, 0x00-0x63 hex in protocol; 0x00 = broadcast to all
- ACK format (TV -> host): `[Cmd2][ ][SetID][ ][OK/NG][Data][x]` where `x` is the literal ASCII 'x' (0x78), NOT a CR. Note this is the response terminator; transmissions use CR.
- IP control: Telnet to port 9761. 3-digit setup password (default 828) gates the IP Control Setup menu on the TV itself; the telnet session itself has no login
- WOL power-on: requires `Mobile TV On` submenu enabled and a WOL mobile app (iOS / Google Play)
- Media playback/recording restriction: only Power (ka) and Key (mc) commands are accepted; all others return NG
- Model-specific commands: ISM (jp) is Plasma-only; 3D/Extended 3D (xt, xv) are 3D-models-only; Auto Configure (ju) requires RGB/PC input
- The protocol is shared across a wide LG TV family; 49NANO80UNA is an LED/NanoCell, non-3D model, so the Plasma/3D actions in this spec will not work on this device but are retained for protocol completeness

<!-- UNRESOLVED: Network IP control (Telnet 9761) uses a different command syntax — `KEYWORD value` form (e.g. `VOLUME_MUTE on`, `PICTURE_CONTRAST 50`) — documented in source pp.13-15. Only RS-232C protocol is enumerated in detail above. -->

<!-- UNRESOLVED: Power command works in both standby and on-state with RS-232C cable, but only when TV is on with USB-to-Serial converter. Source explicitly notes this asymmetry. -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T01:11:18.020Z
last_checked_at: 2026-06-02T01:48:20.704Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T01:48:20.704Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched literal RS-232C command mnemonics in source; all transport parameters verified verbatim. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ISM (jp) is Plasma-only; 3D (xt) and Extended 3D (xv) are 3D-models-only. 49NANO80UNA is LED/NanoCell, non-3D. These actions are included for protocol completeness, not because the device supports them."
- "49NANO80UNA is LED; ISM not supported. Included for protocol completeness."
- "ma format varies by region (Korea/Japan/N.America/Europe) and signal type (analog/digital/cable/satellite). See source pp.9-10 for full encoding table."
- "backlight and panel light share opcode mg; documented as two distinct functions in source."
- "49NANO80UNA is not 3D. Included for protocol completeness."
- "most commands (kd, kg, kh, ki, kj, kk, kl, km, kr, ks, kt, kc, xb, xu, jq, xt, xv, mb, mg) accept FF as query data and return current state in the same ACK format; not enumerated as individual Feedbacks."
- "settable scalar parameters (volume/contrast/brightness/color/tint/sharpness/treble/bass/balance/color_temperature/energy_saving) are exposed as Actions rather than discrete Variables."
- "source does not document unsolicited device-to-host events."
- "source does not document multi-step sequences."
- "source does not contain safety warnings or interlock procedures."
- "Network IP control (Telnet 9761) uses a different command syntax — `KEYWORD value` form (e.g. `VOLUME_MUTE on`, `PICTURE_CONTRAST 50`) — documented in source pp.13-15. Only RS-232C protocol is enumerated in detail above."
- "Power command works in both standby and on-state with RS-232C cable, but only when TV is on with USB-to-Serial converter. Source explicitly notes this asymmetry."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
