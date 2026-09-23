---
spec_id: admin/lg-electronics-ru-42px1-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG Electronics RU-42PX1 Series Control Spec"
manufacturer: LG
model_family: RU-42PX10
aliases: []
compatible_with:
  manufacturers:
    - LG
    - "LG Electronics"
  models:
    - RU-42PX10
    - RU-42PX11
    - RU-42PX20
    - RU-50PX10
    - RU-50PX11
    - RU-50PX20
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
  - manualslib.com
source_urls:
  - http://web.archive.org/web/20040729171412/http://www.lgcommercial.com/product_manuals/RU-42PX10C.pdf
  - https://www.manualslib.com/manual/93370/Lg-Ru-42px10c.html
retrieved_at: 2026-09-16T21:37:21.456Z
last_checked_at: 2026-09-17T22:16:52.816Z
generated_at: 2026-09-17T22:16:52.816Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full input list completeness for every regional model variant not stated; firmware version not stated in source."
  - "no explicit settable parameters documented beyond discrete actions above"
  - "source does not describe unsolicited notifications from the device"
  - "source does not describe multi-step sequences"
  - "source does not contain safety warnings or interlock procedures."
  - "full list of regional model variants not confirmed; firmware version compatibility not stated in source. The IR Code Table key codes referenced by the `mc` Key command are listed in the source but were not transcribed as individual actions (they are sent via the `mc` action)."
verification:
  verdict: verified
  checked_at: 2026-09-17T22:16:52.816Z
  matched_actions: 65
  action_count: 65
  confidence: medium
  summary: "All 65 spec actions map to source commands 01–34 with matching wire tokens (ka..kz, jp..ju, ma..mc) and all transport values are stated verbatim in the source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-16
---

# LG Electronics RU-42PX1 Series Control Spec

## Summary
RS-232C external control protocol for LG Plasma TV models RU-42PX10/11/20 and RU-50PX10/11/20. ASCII command set over a D-Sub 9-pin male RS-232C connector at 9600 bps, supporting power, input select, aspect ratio, picture/sound adjustments, PIP/DW, tuner control, and key/IR passthrough.

<!-- UNRESOLVED: full input list completeness for every regional model variant not stated; firmware version not stated in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: source specifies 3-wire "Not standard" option; standard 7-wire RS-232C used; no explicit flow-control bytes documented
auth:
  type: none  # inferred: no auth procedure in source
```

**Connector:** D-Sub 9-Pin Male. Pin 2 RXD (Receive), Pin 3 TXD (Transmit), Pin 5 GND. Crossed (reverse) cable required for PC-to-PDP connection. (Source: "RS-232C Configurations" section.)

## Traits
```yaml
- powerable  # inferred from power command examples
- routable  # inferred from input select command examples
- queryable  # inferred from query command examples (Transmit 'FF' data to read status)
- levelable  # inferred from volume/contrast/brightness/color/tint/sharpness commands
```

## Actions
```yaml
- id: power
  label: Power On/Off
  kind: action
  command: "ka {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast). Hex per "Real data mapping 1" (0x00..0x63).
    - name: Data
      type: string
      description: "0 = Power Off, 1 = Power On"

- id: power_query
  label: Power Status Query
  kind: query
  command: "ka {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: input_select
  label: Input Select (Main Picture)
  kind: action
  command: "kb {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=TV, 1=Video1, 2=Video2, 3=Component1, 4=Component2, 5=RGB, 6=DVI"

- id: input_select_query
  label: Input Select Query
  kind: query
  command: "kb {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: aspect_ratio
  label: Aspect Ratio (Main Picture)
  kind: action
  command: "kc {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=Normal (4:3), 1=Wide (16:9), 2=Horizon, 3=Zoom"

- id: aspect_ratio_query
  label: Aspect Ratio Query
  kind: query
  command: "kc {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=Screen mute off (Picture on), 1=Screen mute on (Picture off)"

- id: screen_mute_query
  label: Screen Mute Query
  kind: query
  command: "kd {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=Volume mute on, 1=Volume mute off"

- id: volume_mute_query
  label: Volume Mute Query
  kind: query
  command: "ke {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Volume 0-64 (per Real data mapping 1)

- id: volume_control_query
  label: Volume Control Query
  kind: query
  command: "kf {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: contrast
  label: Contrast
  kind: action
  command: "kg {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Contrast 0-64 (per Real data mapping 1)

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "kg {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: brightness
  label: Brightness
  kind: action
  command: "kh {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Brightness 0-64 (per Real data mapping 1)

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "kh {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: color
  label: Color
  kind: action
  command: "ki {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Color 0-64 (per Real data mapping 1)

- id: color_query
  label: Color Query
  kind: query
  command: "ki {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: tint
  label: Tint
  kind: action
  command: "kj {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "Tint 0-64 (Red 0 ~ Green 64, per Real data mapping 1)"

- id: tint_query
  label: Tint Query
  kind: query
  command: "kj {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Sharpness 0-64 (per Real data mapping 1)

- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "kk {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=OSD off, 1=OSD on"

- id: osd_select_query
  label: OSD Select Query
  kind: query
  command: "kl {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  command: "km {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=Lock off, 1=Lock on"

- id: remote_control_lock_query
  label: Remote Control Lock Mode Query
  kind: query
  command: "km {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: pip_dw
  label: PIP / DW
  kind: action
  command: "kn {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=PIP/DW off, 1=PIP, 2=DW1, 3=DW2"

- id: pip_dw_query
  label: PIP / DW Query
  kind: query
  command: "kn {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: split_zoom
  label: Split Zoom
  kind: action
  command: "kp {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=Reset split zoom, 21-24=Selection 1-4 of 2 split zoom, 41-45=Selection 1-5 of 4 split zoom, 91-99=Selection 1-9 of 9 split zoom (per Real data mapping 2)"

- id: split_zoom_query
  label: Split Zoom Query
  kind: query
  command: "kp {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: pip_position
  label: PIP Position
  kind: action
  command: "kq {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=Right down on screen, 1=Left down on screen, 2=Left up on screen, 3=Right up on screen"

- id: pip_position_query
  label: PIP Position Query
  kind: query
  command: "kq {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: treble
  label: Treble
  kind: action
  command: "kr {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Treble 0-64 (per Real data mapping 1)

- id: treble_query
  label: Treble Query
  kind: query
  command: "kr {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: bass
  label: Bass
  kind: action
  command: "ks {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Bass 0-64 (per Real data mapping 1)

- id: bass_query
  label: Bass Query
  kind: query
  command: "ks {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: balance
  label: Balance
  kind: action
  command: "kt {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Balance 0-64 (per Real data mapping 1)

- id: balance_query
  label: Balance Query
  kind: query
  command: "kt {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "ku {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=Cool, 1=Normal, 2=Warm, 3=Off"

- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  command: "ku {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: red_adjustment
  label: Red Adjustment
  kind: action
  command: "kv {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Red 0-3C (per Real data mapping 3)

- id: red_adjustment_query
  label: Red Adjustment Query
  kind: query
  command: "kv {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: green_adjustment
  label: Green Adjustment
  kind: action
  command: "kw {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Green 0-3C (per Real data mapping 3)

- id: green_adjustment_query
  label: Green Adjustment Query
  kind: query
  command: "kw {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: blue_adjustment
  label: Blue Adjustment
  kind: action
  command: "k$ {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Blue 0-3C (per Real data mapping 3)

- id: blue_adjustment_query
  label: Blue Adjustment Query
  kind: query
  command: "k$ {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: pip_input_select
  label: PIP Input Select
  kind: action
  command: "ky {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=TV, 1=Video1, 2=Video2, 3=Component1, 4=Component2, 5=RGB, 6=DVI"

- id: pip_input_select_query
  label: PIP Input Select Query
  kind: query
  command: "ky {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: abnormal_state
  label: Abnormal State
  kind: query
  command: "kz {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: ism_method
  label: ISM Method
  kind: action
  command: "jp {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=Normal, 1=White wash, 2=Orbiter, 3=Inversion"

- id: ism_method_query
  label: ISM Method Query
  kind: query
  command: "jp {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: low_power
  label: Low Power
  kind: action
  command: "jq {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=Low power off, 1=Low power on"

- id: low_power_query
  label: Low Power Query
  kind: query
  command: "jq {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: orbiter_time
  label: Orbiter Time Setting
  kind: action
  command: "jr {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Orbiter time 1-FE

- id: orbiter_time_query
  label: Orbiter Time Setting Query
  kind: query
  command: "jr {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: orbiter_pixel
  label: Orbiter Pixel Setting
  kind: action
  command: "js {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Orbiter pixel 1-9

- id: orbiter_pixel_query
  label: Orbiter Pixel Setting Query
  kind: query
  command: "js {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: picture_size_dw
  label: Picture Size for Double Window
  kind: action
  command: "jt {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: Main window size 0-14 (per Real data mapping 1)

- id: picture_size_dw_query
  label: Picture Size for Double Window Query
  kind: query
  command: "jt {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: auto_configure
  label: Auto Configure
  kind: action
  command: "ju {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "1=To set (RGB/PC mode only)"

- id: auto_configure_query
  label: Auto Configure Query
  kind: query
  command: "ju {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: tune_command
  label: Tune Command
  kind: action
  command: "ma {SetID} {Data0} {Data1} {Data2} {Data3}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data0
      type: string
      description: "Channel number (Air: 02-45, Cable: 01, 0E-7D)"
    - name: Data1
      type: string
      description: "Main/Sub: 0"
    - name: Data2
      type: string
      description: "0"
    - name: Data3
      type: string
      description: "High: Main Channel 0 / Sub Channel 1; Low: Air 0 / CATV 1"

- id: channel_add_del
  label: Channel Add/Del
  kind: action
  command: "mb {SetID} {Data}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: Data
      type: string
      description: "0=Channel Memory, 1=Channel Erase"

- id: channel_add_del_query
  label: Channel Add/Del Query
  kind: query
  command: "mb {SetID} FF"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)

- id: key
  label: IR Key Code Send
  kind: action
  command: "mc {SetID} {KeyCode}"
  params:
    - name: SetID
      type: string
      description: Monitor ID (1-99, or '00' to broadcast)
    - name: KeyCode
      type: string
      description: "IR key code (refer to IR Code Table in source page 40)"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  description: Echoed in acknowledgement for `ka` query

- id: input_state
  type: enum
  values: [tv, video1, video2, component1, component2, rgb, dvi]
  description: Echoed in acknowledgement for `kb` query

- id: aspect_state
  type: enum
  values: [normal_4_3, wide_16_9, horizon, zoom]
  description: Echoed in acknowledgement for `kc` query

- id: screen_mute_state
  type: enum
  values: [off, on]
  description: Echoed in acknowledgement for `kd` query

- id: volume_mute_state
  type: enum
  values: [on, off]
  description: Echoed in acknowledgement for `ke` query

- id: volume_state
  type: integer
  range: 0-64
  description: Echoed in acknowledgement for `kf` query (per Real data mapping 1)

- id: abnormal_state
  type: enum
  values: "0=Normal (Power on and signal exist), 1=No signal (Power on), 2=Off via remote, 3=Off via Sleep Time, 4=Off via RS-232C, 5=5V down, 6=AC down, 7=Off via Fan Alarm, 8=Off via Off Time, 9=Off via Auto Off, a=Off via On Time"
  description: Echoed in acknowledgement for `kz` query
```

## Variables
```yaml
# UNRESOLVED: no explicit settable parameters documented beyond discrete actions above
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications from the device
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings or interlock procedures.
```

## Notes

**Command frame format:**
- All ASCII commands use the structure: `[Command1][Command2][ ][SetID][ ][Data][Cr]`
- `[Command1]` is `j`, `k`, or `m`
- `[Command2]` is a single ASCII character (`a`-`z`, `$`)
- `SetID` is two ASCII hex digits (e.g. `01` for Set ID 1). `00` broadcasts to all connected monitors. Adjustment range 1-99 in user menu, transmitted as hex (0x00-0x63).
- `Data` is two ASCII hex digits
- Space separator is ASCII `0x20`
- `[Cr]` is carriage return `0x0D`

**Querying status:**
- Transmit `FF` data byte to read status of any command (e.g. `ka 01 FF` for power state)

**Acknowledgement format:**
- Normal: `[Command2][ ][SetID][ ][OK][Data][x]`
- Error: `[Command2][ ][SetID][ ][NG][Data][x]` where Data is `1=Illegal Code`, `2=Not supported function`, `3=Wait more time`

**Real data mapping 1** (used by most commands, including Set ID display):
- 0..9 = hex digits representing decimal 0..9
- A = decimal 10
- F = decimal 15
- 10 = decimal 16
- 63 = decimal 99
- 64 = decimal 100

**Real data mapping 2** (Split Zoom):
- 0 = Reset, 21/24 = Selection 1/4 of 2 split, 41/42/43/44/45 = Selection 1-5 of 4 split, 91-99 = Selection 1-9 of 9 split

**Real data mapping 3** (Color temperature adjustments - red/green/blue, range 0x00-0x3C):
- 0..0x1D = -30..-1
- 0x1E = 0
- 0x3A = +28
- 0x3B = +29
- 0x3C = +30

**IR Code Table:** Source provides IR hex codes for remote control (page 40). Codes include Power (08 / C4 Power On / C5 Power Off), Mute (09), number keys (10-19), input discrete codes (D6=TV, 5A=Video1, D0=Video2, BF=Component1, D4=Component2, C6=DVI, D5=RGB), arc discrete codes (1E=4:3, 1A=16:9, 54=Zoom), and others. The `mc` (Key) command sends these IR codes to the monitor.

**Remote control lock note:** When main power is cycled on/off, remote control lock is released automatically.

**Auto-off behavior:** If no button is pressed within 2 hours after the TV turns on with the On Timer function, the TV automatically reverts to standby mode.

**Source:** "External Control Device Setup" section from the LG Plasma TV RU-42PX10/11/20, RU-50PX10/11/20 service manual.

<!-- UNRESOLVED: full list of regional model variants not confirmed; firmware version compatibility not stated in source. The IR Code Table key codes referenced by the `mc` Key command are listed in the source but were not transcribed as individual actions (they are sent via the `mc` action). -->

## Provenance

```yaml
source_domains:
  - web.archive.org
  - manualslib.com
source_urls:
  - http://web.archive.org/web/20040729171412/http://www.lgcommercial.com/product_manuals/RU-42PX10C.pdf
  - https://www.manualslib.com/manual/93370/Lg-Ru-42px10c.html
retrieved_at: 2026-09-16T21:37:21.456Z
last_checked_at: 2026-09-17T22:16:52.816Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-17T22:16:52.816Z
matched_actions: 65
action_count: 65
confidence: medium
summary: "All 65 spec actions map to source commands 01–34 with matching wire tokens (ka..kz, jp..ju, ma..mc) and all transport values are stated verbatim in the source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full input list completeness for every regional model variant not stated; firmware version not stated in source."
- "no explicit settable parameters documented beyond discrete actions above"
- "source does not describe unsolicited notifications from the device"
- "source does not describe multi-step sequences"
- "source does not contain safety warnings or interlock procedures."
- "full list of regional model variants not confirmed; firmware version compatibility not stated in source. The IR Code Table key codes referenced by the `mc` Key command are listed in the source but were not transcribed as individual actions (they are sent via the `mc` action)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
