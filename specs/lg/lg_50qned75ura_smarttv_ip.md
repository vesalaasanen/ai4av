---
spec_id: admin/lg-50qned75ura-smarttv
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 50QNED75URA SmartTV Control Spec"
manufacturer: LG
model_family: 50QNED75URA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50QNED75URA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - webostv.developer.lge.com
  - justaddpower.com
  - justaddpower.happyfox.com
  - gscs-b2c.lge.com
source_urls:
  - https://webostv.developer.lge.com/develop/references/luna-service-introduction
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
  - "https://gscs-b2c.lge.com/downloadFile?fileId=KROWM000526118.pdf"
  - https://webostv.developer.lge.com/assets/netcast/NetCast-UDAP.pdf
retrieved_at: 2026-06-02T17:22:59.371Z
last_checked_at: 2026-06-02T17:22:59.371Z
generated_at: 2026-06-02T17:22:59.371Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control is hinted at the request level but not documented in this source. IR codes are included only as reference; they are not a wired control protocol."
  - "source describes no unsolicited push notifications from the device."
  - "source describes no multi-step sequences."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements."
  - "TCP/IP control (suggested by caller) not documented in this source — only RS-232C. IR code table refers to \"page A18\" not included in the source excerpt. Lamp/panel power and fault-recovery behaviors not described."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:59.371Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions match source commands with correct opcodes, data ranges, and parameters; transport layer fully verified against baud/bits/parity/encoding. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 50QNED75URA SmartTV Control Spec

## Summary
RS-232C serial control spec for LG 50QNED75URA SmartTV. Covers power, input select, picture/sound parameters, OSD, key lock, tile-mode configuration, and diagnostic queries via an ASCII framed protocol at 9600 baud.

<!-- UNRESOLVED: TCP/IP control is hinted at the request level but not documented in this source. IR codes are included only as reference; they are not a wired control protocol. -->

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
  encoding: ascii
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (ka command present)
# - routable        (kb input select present)
# - levelable       (kf volume, kg contrast, kh brightness, ki color, kj tint, kk sharpness, kt balance present)
# - queryable       (FF data byte = read; status acks for ka/kb/.../kz return present state)
- powerable
- routable
- levelable
- queryable
```

## Actions
```yaml
# Command frame:  [C1][C2][ ][SetID][ ][Data]\r
#   [ ] = ASCII space 0x20
#   \r  = ASCII carriage return 0x0D
#   SetID: ASCII 1-99 (1-based); "0" = broadcast (no ack check)
#   Data: 1-2 hex byte(s) ASCII, or "FF" to read status.
# Acknowledgement (read or accepted write): [C2][ ][SetID][ ][OK][Data][x]
# Negative acknowledgement:                  [C2][ ][SetID][ ][NG][Data][x]
# SetID token below = {SetID}; data token below = {Data} (hex).

- id: power_set
  label: Power
  kind: action
  command: "ka {SetID} {Data}\r"  # Data: 00=Off, 01=On
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99, or 0 for broadcast
    - name: Data
      type: integer
      description: '00H = Power Off, 01H = Power On'

- id: power_query
  label: Power Status Query
  kind: query
  command: "ka {SetID} FF\r"  # Response: ka {SetID} OK {Data} - 00=Off, 01=On
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99

- id: input_select_set
  label: Input Select (Main Picture)
  kind: action
  command: "kb {SetID} {Data}\r"  # Data: 02=AV, 04=Component1, 05=Component2, 06=RGB(DTV), 07=RGB(PC), 08=HDMI(DTV), 09=HDMI(PC)
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Input source code (02H-09H)

- id: input_select_query
  label: Input Select Query
  kind: query
  command: "kb {SetID} FF\r"  # Response: kb {SetID} OK {Data}
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99

- id: aspect_ratio_set
  label: Aspect Ratio
  kind: action
  command: "kc {SetID} {Data}\r"  # Data: 01=4:3, 02=16:9, 03=Horizon, 04=Zoom1, 05=Zoom2, 06=Original, 07=14:9, 08=Full (EU), 09=1:1 (PC)
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Aspect ratio code (01H-09H)

- id: screen_mute_set
  label: Screen Mute
  kind: action
  command: "kd {SetID} {Data}\r"  # Data: 00=mute off, 01=mute on
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: '00H = Picture On, 01H = Picture Off'

- id: volume_mute_set
  label: Volume Mute
  kind: action
  command: "ke {SetID} {Data}\r"  # Data: 00=mute on, 01=mute off
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: '00H = Mute On (Volume Off), 01H = Mute Off (Volume On)'

- id: volume_set
  label: Volume Control
  kind: action
  command: "kf {SetID} {Data}\r"  # Data: 00H-64H (0-100 steps)
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Volume 00H-64H (0-100)

- id: contrast_set
  label: Contrast
  kind: action
  command: "kg {SetID} {Data}\r"  # Data: 00H-64H
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Contrast 00H-64H

- id: brightness_set
  label: Brightness
  kind: action
  command: "kh {SetID} {Data}\r"  # Data: 00H-64H
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Brightness 00H-64H

- id: color_set
  label: Color (Video only)
  kind: action
  command: "ki {SetID} {Data}\r"  # Data: 00H-64H
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Color 00H-64H

- id: tint_set
  label: Tint (Video only)
  kind: action
  command: "kj {SetID} {Data}\r"  # Data: 00H-64H (00=-50 Red, 64=+50 Green)
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Tint 00H (red) - 64H (green)

- id: sharpness_set
  label: Sharpness (Video only)
  kind: action
  command: "kk {SetID} {Data}\r"  # Data: 00H-64H
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Sharpness 00H-64H

- id: osd_select_set
  label: OSD Select
  kind: action
  command: "kl {SetID} {Data}\r"  # Data: 00=OSD Off, 01=OSD On
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: '00H = OSD Off, 01H = OSD On'

- id: remote_lock_set
  label: Remote Lock / Key Lock
  kind: action
  command: "km {SetID} {Data}\r"  # Data: 00=Off, 01=On. Locks both remote and local keys.
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: '00H = Off, 01H = On'

- id: balance_set
  label: Balance
  kind: action
  command: "kt {SetID} {Data}\r"  # Data: 00H-64H (L50 - R50)
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Balance 00H (L50) - 64H (R50)

- id: color_temperature_set
  label: Color Temperature
  kind: action
  command: "ku {SetID} {Data}\r"  # Data: 00=Normal, 01=Cool, 02=Warm, 03=User
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: '00H=Normal, 01H=Cool, 02H=Warm, 03H=User'

- id: abnormal_state_query
  label: Abnormal State (Standby power-off reason)
  kind: query
  command: "kz {SetID} FF\r"  # Response: kz {SetID} OK {Data}
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99

- id: ism_mode_set
  label: ISM Mode (afterimage prevention)
  kind: action
  command: "jp {SetID} {Data}\r"  # Data: 01=Inversion, 02=Orbiter, 04=White Wash, 08=Normal
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: '01H=Inversion, 02H=Orbiter, 04H=White Wash, 08H=Normal'

- id: auto_configure
  label: Auto Configure (RGB PC only)
  kind: action
  command: "ju {SetID} 01\r"  # Data fixed to 01H: trigger auto position/shake adjust
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99

- id: ir_key_send
  label: Send IR Remote Key Code
  kind: action
  command: "mc {SetID} {Data}\r"  # Data: IR key code (see IR codes table in source; e.g. 08=Power, 09=Mute, 0B=Input, 43=Menu)
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: IR key code (Hex). Source refers to "page A18" for full table; only partial keys enumerated inline.

- id: tile_mode_set
  label: Tile Mode
  kind: action
  command: "dd {SetID} {Data}\r"  # Data: 00=Off, otherwise 2-digit tile config (col x row) e.g. 12=1x2, 13=1x3, 14=1x4, ..., 44=4x4. Data cannot be 0X or X0 except 00.
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Tile mode 00H-44H (col x row, 0X/X0 invalid except 00)

- id: tile_h_size_set
  label: Tile Horizontal Size
  kind: action
  command: "dg {SetID} {Data}\r"  # Data: 00H-64H
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Horizontal tile size 00H-64H

- id: tile_v_size_set
  label: Tile Vertical Size
  kind: action
  command: "dh {SetID} {Data}\r"  # Data: 00H-64H
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Vertical tile size 00H-64H

- id: tile_id_set
  label: Tile ID Set
  kind: action
  command: "di {SetID} {Data}\r"  # Data: 00H-10H
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
    - name: Data
      type: integer
      description: Tile ID 00H-10H

- id: elapsed_time_query
  label: Elapsed Time (used hours)
  kind: query
  command: "dl {SetID} FF\r"  # Response: dl {SetID} OK {Data} (Data = used hours, hex)
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99

- id: temperature_value_query
  label: Internal Temperature Value
  kind: query
  command: "dn {SetID} FF\r"  # Response: dn {SetID} OK {Data} (Data = 1 byte hex temperature)
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99

- id: lamp_fault_check
  label: Lamp Fault Check
  kind: query
  command: "dp {SetID} FF\r"  # Response: dp {SetID} OK {Data} - 00=Lamp Fault, 01=Lamp OK
  params:
    - name: SetID
      type: integer
      description: Set ID 1-99
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  source: "ka ack data 00/01"

- id: input_source
  type: enum
  values: [av, component1, component2, rgb_dtv, rgb_pc, hdmi_dtv, hdmi_pc]
  source: "kb ack data 02/04/05/06/07/08/09"

- id: volume_mute_state
  type: enum
  values: [mute_on, mute_off]
  source: "ke ack data 00/01"

- id: screen_mute_state
  type: enum
  values: [picture_on, picture_off]
  source: "kd ack data 00/01"

- id: osd_state
  type: enum
  values: [osd_off, osd_on]
  source: "kl ack data 00/01"

- id: remote_lock_state
  type: enum
  values: [off, on]
  source: "km ack data 00/01"

- id: color_temperature
  type: enum
  values: [normal, cool, warm, user]
  source: "ku ack data 00/01/02/03"

- id: abnormal_state
  type: enum
  values: [normal, no_signal, off_by_remote, off_by_sleep, off_by_rs232, ac_down, off_by_offtime, off_by_autoff]
  source: "kz ack data 00/01/02/03/04/06/08/09"

- id: lamp_fault
  type: enum
  values: [fault, ok]
  source: "dp ack data 00/01"
```

## Variables
```yaml
# Numeric level parameters share the same 00H-64H step encoding.
- id: volume_level
  type: integer
  range: "00H-64H"
  command: kf

- id: contrast_level
  type: integer
  range: "00H-64H"
  command: kg

- id: brightness_level
  type: integer
  range: "00H-64H"
  command: kh

- id: color_level
  type: integer
  range: "00H-64H"
  command: ki

- id: tint_level
  type: integer
  range: "00H-64H"
  notes: "00H = -50 (red), 64H = +50 (green)"
  command: kj

- id: sharpness_level
  type: integer
  range: "00H-64H"
  command: kk

- id: balance_level
  type: integer
  range: "00H-64H"
  notes: "00H = L50, 64H = R50"
  command: kt

- id: aspect_ratio
  type: integer
  range: "01H-09H"
  command: kc
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited push notifications from the device.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences.
```

## Safety
```yaml
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing requirements.
confirmation_required_for: []
interlocks: []
```

## Notes
- Frame terminator is `0x0D` (CR); field separator is `0x20` (space). String terminator in ack is literal `x`.
- `{SetID}` field is ASCII numeric 1-99. `0` = broadcast — source warns that ack messages from multiple sets will collide and should not be checked.
- For write commands, appending `FF` as the data byte (`ka {SetID} FF\r`) reads present state and the device replies with the OK ack carrying the current value.
- Source mentions an IR key code "page A18" that is not included in this excerpt; only the partial table inline in this document is represented.
- "ip" in the source filename is misleading — the document body is purely RS-232C serial. No TCP/IP framing, port, or HTTP path is described.

<!-- UNRESOLVED: TCP/IP control (suggested by caller) not documented in this source — only RS-232C. IR code table refers to "page A18" not included in the source excerpt. Lamp/panel power and fault-recovery behaviors not described. -->

## Provenance

```yaml
source_domains:
  - webostv.developer.lge.com
  - justaddpower.com
  - justaddpower.happyfox.com
  - gscs-b2c.lge.com
source_urls:
  - https://webostv.developer.lge.com/develop/references/luna-service-introduction
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
  - "https://gscs-b2c.lge.com/downloadFile?fileId=KROWM000526118.pdf"
  - https://webostv.developer.lge.com/assets/netcast/NetCast-UDAP.pdf
retrieved_at: 2026-06-02T17:22:59.371Z
last_checked_at: 2026-06-02T17:22:59.371Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:59.371Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions match source commands with correct opcodes, data ranges, and parameters; transport layer fully verified against baud/bits/parity/encoding. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control is hinted at the request level but not documented in this source. IR codes are included only as reference; they are not a wired control protocol."
- "source describes no unsolicited push notifications from the device."
- "source describes no multi-step sequences."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements."
- "TCP/IP control (suggested by caller) not documented in this source — only RS-232C. IR code table refers to \"page A18\" not included in the source excerpt. Lamp/panel power and fault-recovery behaviors not described."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
