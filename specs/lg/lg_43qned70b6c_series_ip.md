---
spec_id: admin/lg-43qned70b6c-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 43QNED70B6C Series Control Spec"
manufacturer: LG
model_family: 43QNED70B6C
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 43QNED70B6C
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - justaddpower.com
  - lg.com
source_urls:
  - https://justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://www.lg.com/us/business/commercial-displays/professional-tvs
retrieved_at: 2026-06-02T22:08:52.985Z
last_checked_at: 2026-06-02T22:08:52.985Z
generated_at: 2026-06-02T22:08:52.985Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control protocol not documented in source; this spec covers RS-232C only"
  - "TCP/IP control protocol not covered in source document"
  - "exact port number for IP control not stated (source only covers RS-232C)"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:08:52.985Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions traced to source (dip-safe re-verify). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 43QNED70B6C Series Control Spec

## Summary
LG consumer LED LCD TV supporting RS-232C ASCII protocol for external control. Commands transmitted as ASCII strings over serial UART at 9600 baud. Supports power, input selection, picture adjustment, audio control, tiling modes, and queryable status feedback.

<!-- UNRESOLVED: TCP/IP control protocol not documented in source; this spec covers RS-232C only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off commands documented
- routable        # input selection commands documented
- queryable       # read queries documented (FF data)
- levelable       # volume, contrast, brightness, etc. documented
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Power Off, 1 = Power On"
  command: "ka {set_id} {state}"
  feedback: "a {set_id} OK {data}"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: integer
      description: "2=AV, 4=Component1, 5=Component2, 6=RGB-DTV, 7=RGB-PC, 8=HDMI-DTV, 9=HDMI-PC"
  command: "kb {set_id} {input}"
  feedback: "b {set_id} OK {data}"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=4:3, 2=16:9, 3=Horizon, 4=Zoom1, 5=Zoom2, 6=Original, 7=14:9, 8=Full, 9=1:1(PC)"
  command: "kc {set_id} {mode}"
  feedback: "c {set_id} OK {data}"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off (Picture on), 1 = On (Picture off)"
  command: "kd {set_id} {state}"
  feedback: "d {set_id} OK {data}"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Mute On, 1 = Mute Off (Volume On)"
  command: "ke {set_id} {state}"
  feedback: "e {set_id} OK {data}"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00-64 (0-100). Real data: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"
  command: "kf {set_id} {level}"
  feedback: "f {set_id} OK {data}"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00-64. Real data mapping same as volume."
  command: "kg {set_id} {level}"
  feedback: "g {set_id} OK {data}"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00-64. Real data mapping same as volume."
  command: "kh {set_id} {level}"
  feedback: "h {set_id} OK {data}"

- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00-64 (Video only). Real data mapping same as volume."
  command: "ki {set_id} {level}"
  feedback: "i {set_id} OK {data}"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00-64 (Video only). 0=Red-50, 64=Green+50."
  command: "kj {set_id} {level}"
  feedback: "j {set_id} OK {data}"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00-64 (Video only). Real data mapping same as volume."
  command: "kk {set_id} {level}"
  feedback: "k {set_id} OK {data}"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = OSD Off, 1 = OSD On"
  command: "kl {set_id} {state}"
  feedback: "l {set_id} OK {data}"

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On. Locks remote and local keys when using RS-232C."
  command: "km {set_id} {state}"
  feedback: "m {set_id} OK {data}"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00-64 (L50 ~ R50). 00=Left50, 32=Center, 64=Right50."
  command: "kt {set_id} {level}"
  feedback: "t {set_id} OK {data}"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=Cool, 2=Warm, 3=User"
  command: "ku {set_id} {mode}"
  feedback: "u {set_id} OK {data}"

- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=Inversion, 2=Orbiter, 4=White Wash, 8=Normal"
  command: "jp {set_id} {mode}"
  feedback: "p {set_id} OK {data}"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: integer
      description: "1 = Execute. Works only in RGB(PC) mode."
  command: "ju {set_id} {action}"
  feedback: "u {set_id} OK {data}"

- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 12=1x2, 13=1x3, 14=1x4, ... 44=4x4. Cannot be 0X or X0 except 00."
  command: "dd {set_id} {mode}"
  feedback: "d {set_id} OK {data}"

- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      description: "Horizontal size, range 00-64"
  command: "dg {set_id} {size}"
  feedback: "g {set_id} OK {data}"

- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      description: "Vertical size, range 00-64"
  command: "dh {set_id} {size}"
  feedback: "h {set_id} OK {data}"

- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: integer
      description: "Tile ID, range 00-10 (Hex)"
  command: "di {set_id} {id}"
  feedback: "i {set_id} OK {data}"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - 0  # Power Off
    - 1  # Power On
  query: "ka {set_id} FF"

- id: input_state
  label: Input State
  type: enum
  values:
    - 2   # AV
    - 4   # Component 1
    - 5   # Component 2
    - 6   # RGB (DTV)
    - 7   # RGB (PC)
    - 8   # HDMI (DTV)
    - 9   # HDMI (PC)
  query: "kb {set_id} FF"

- id: abnormal_state
  label: Abnormal State
  type: enum
  values:
    - 0  # Normal (Power on and signal exist)
    - 1  # No signal (Power on)
    - 2  # Turn the monitor off by remote control
    - 3  # Turn the monitor off by sleep time function
    - 4  # Turn the monitor off by RS-232C function
    - 6  # AC down
    - 8  # Turn the monitor off by off time function
    - 9  # Turn the monitor off by auto off function
  query: "kz {set_id} FF"

- id: elapsed_time
  label: Elapsed Time
  type: integer
  description: "Used hours (Hexadecimal, 1 byte)"
  query: "dl {set_id} FF"

- id: temperature_value
  label: Temperature Value
  type: integer
  description: "Inside temperature in Hexadecimal"
  query: "dn {set_id} FF"

- id: lamp_fault
  label: Lamp Fault
  type: enum
  values:
    - 0  # Lamp Fault
    - 1  # Lamp OK
  query: "dp {set_id} FF"

- id: ack_ok
  label: Acknowledgement OK
  description: "Returned as [Command2][ ][Set ID][ ][OK][Data][x]"

- id: ack_ng
  label: Acknowledgement Error
  description: "Returned as [Command2][ ][Set ID][ ][NG][Data][x]"
```

## Variables
```yaml
# No discrete settable parameters separate from actions documented.
```

## Events
```yaml
# No unsolicited event notifications documented; all communication is command-response.
```

## Macros
```yaml
# No explicit multi-step macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "When controlling with Set ID 0 (broadcast), all sets send ACK — checking individual ACK is impossible."
  - description: "Remote Lock/Key Lock (km) locks both remote control and local keys when using RS-232C control."
```

## Notes

**Command Format:** `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = ASCII 0x0D carriage return.

**Set ID Range:** 1-99. Set ID 0 = broadcast to all devices (no ACK check possible).

**Read Mode:** Transmit `FF` as data to read current status.

**Data Mapping:** Hex values 00-64 map to decimal steps. Volume, Contrast, Brightness, Color, Sharpness: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100. Tint: 0=Step-50, 64=Step+50.

**Tiling Restrictions:** Tile mode data cannot be 0X or X0 except 00 (tile off).

<!-- UNRESOLVED: TCP/IP control protocol not covered in source document -->
<!-- UNRESOLVED: exact port number for IP control not stated (source only covers RS-232C) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - justaddpower.com
  - lg.com
source_urls:
  - https://justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://www.lg.com/us/business/commercial-displays/professional-tvs
retrieved_at: 2026-06-02T22:08:52.985Z
last_checked_at: 2026-06-02T22:08:52.985Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:08:52.985Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions traced to source (dip-safe re-verify). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control protocol not documented in source; this spec covers RS-232C only"
- "TCP/IP control protocol not covered in source document"
- "exact port number for IP control not stated (source only covers RS-232C)"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
