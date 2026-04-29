---
schema_version: ai4av-public-spec-v1
device_id: lg/32sr83u-w
entity_id: lg_32sr83u_w
spec_id: admin/lg-32sr83u-w
revision: 1
author: admin
title: "LG 32SR83U-W Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: 32SR83U-W
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 32SR83U-W
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_32sr83u_w_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:54:52.474Z
retrieved_at: 2026-04-25T20:54:52.474Z
last_checked_at: 2026-04-25T20:54:52.474Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:54:52.474Z
  matched_actions: 42
  action_count: 42
  confidence: high
  summary: "All 42 spec actions matched literally against source commands; transport parameters verified; source command catalogue fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 32SR83U-W Control Spec

## Summary
The LG 32SR83U-W is a commercial display monitor controllable via RS-232 serial (and reportedly TCP/IP). The source document details an ASCII-based serial command protocol with 26 command categories covering power, input selection, picture adjustments, audio, tiling, and diagnostic queries. Commands follow the format `[Command1][Command2][ ][Set ID][ ][Data][Cr]` with hex-encoded data and OK/NG acknowledgement.

<!-- UNRESOLVED: TCP/IP addressing (port, connection mode) not documented in source despite device reportedly supporting IP control -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
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
traits:
  - powerable    # power on/off commands present
  - routable     # input select command present
  - queryable    # query commands (elapsed time, temperature, lamp fault, abnormal state) present
  - levelable    # volume, contrast, brightness, color, tint, sharpness, balance controls present
```

## Actions
```yaml
actions:
  - id: power
    label: Power On/Off
    kind: action
    command: "ka {set_id} {data}"
    params:
      - name: state
        type: enum
        values:
          "00": "Power Off"
          "01": "Power On"
    ack: "a {set_id} OK{data}"

  - id: input_select
    label: Select Input
    kind: action
    command: "kb {set_id} {data}"
    params:
      - name: input
        type: enum
        values:
          "02": "AV"
          "04": "Component 1"
          "05": "Component 2"
          "06": "RGB (DTV)"
          "07": "RGB (PC)"
          "08": "HDMI (DTV)"
          "09": "HDMI (PC)"
    ack: "b {set_id} OK{data}"

  - id: aspect_ratio
    label: Aspect Ratio
    kind: action
    command: "kc {set_id} {data}"
    params:
      - name: ratio
        type: enum
        values:
          "01": "Normal (4:3)"
          "02": "Wide (16:9)"
          "03": "Horizon (Spectacle)"
          "04": "Zoom1"
          "05": "Zoom2"
          "06": "Original"
          "07": "14:9"
          "08": "Full (Europe only)"
          "09": "1:1 (PC)"
    ack: "c {set_id} OK{data}"

  - id: screen_mute
    label: Screen Mute
    kind: action
    command: "kd {set_id} {data}"
    params:
      - name: state
        type: enum
        values:
          "00": "Screen Mute Off (Picture On)"
          "01": "Screen Mute On (Picture Off)"
    ack: "d {set_id} OK{data}"

  - id: volume_mute
    label: Volume Mute
    kind: action
    command: "ke {set_id} {data}"
    params:
      - name: state
        type: enum
        values:
          "00": "Volume Mute On (Volume Off)"
          "01": "Volume Mute Off (Volume On)"
    ack: "e {set_id} OK{data}"

  - id: volume_control
    label: Volume Control
    kind: action
    command: "kf {set_id} {data}"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Volume level (hex 00H-64H, mapped 0-100)"
    ack: "f {set_id} OK{data}"

  - id: contrast
    label: Contrast
    kind: action
    command: "kg {set_id} {data}"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Contrast level (hex 00H-64H, mapped 0-100)"
    ack: "g {set_id} OK{data}"

  - id: brightness
    label: Brightness
    kind: action
    command: "kh {set_id} {data}"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Brightness level (hex 00H-64H, mapped 0-100)"
    ack: "h {set_id} OK{data}"

  - id: color
    label: Color
    kind: action
    command: "ki {set_id} {data}"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Color level, video only (hex 00H-64H, mapped 0-100)"
    ack: "i {set_id} OK{data}"

  - id: tint
    label: Tint
    kind: action
    command: "kj {set_id} {data}"
    params:
      - name: level
        type: integer
        min: -50
        max: 50
        description: "Tint, video only (hex 00H=Red to 64H=Green, mapped -50 to +50)"
    ack: "j {set_id} OK{data}"

  - id: sharpness
    label: Sharpness
    kind: action
    command: "kk {set_id} {data}"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Sharpness level, video only (hex 00H-64H, mapped 0-100)"
    ack: "k {set_id} OK{data}"

  - id: osd_select
    label: OSD On/Off
    kind: action
    command: "kl {set_id} {data}"
    params:
      - name: state
        type: enum
        values:
          "00": "OSD Off"
          "01": "OSD On"
    ack: "l {set_id} OK{data}"

  - id: key_lock
    label: Remote Lock / Key Lock
    kind: action
    command: "km {set_id} {data}"
    params:
      - name: state
        type: enum
        values:
          "00": "Lock Off"
          "01": "Lock On"
    ack: "m {set_id} OK{data}"

  - id: balance
    label: Balance
    kind: action
    command: "kt {set_id} {data}"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Audio balance (hex 00H-64H, mapped L50-R50)"
    ack: "t {set_id} OK{data}"

  - id: color_temperature
    label: Color Temperature
    kind: action
    command: "ku {set_id} {data}"
    params:
      - name: preset
        type: enum
        values:
          "00": "Normal"
          "01": "Cool"
          "02": "Warm"
          "03": "User"
    ack: "u {set_id} OK{data}"

  - id: ism_mode
    label: ISM Mode
    kind: action
    command: "jp {set_id} {data}"
    params:
      - name: mode
        type: enum
        values:
          "01": "Inversion"
          "02": "Orbiter"
          "04": "White Wash"
          "08": "Normal"
    ack: "p {set_id} OK{data}"

  - id: auto_configure
    label: Auto Configure
    kind: action
    command: "ju {set_id} 01"
    params: []
    notes: "Works only in RGB(PC) mode"
    ack: "u {set_id} OK01"

  - id: send_key
    label: Send IR Key Code
    kind: action
    command: "mc {set_id} {data}"
    params:
      - name: key_code
        type: string
        description: "IR remote key code in hex (see IR code table)"
    ack: "c {set_id} OK{data}"

  - id: tile_mode
    label: Tile Mode
    kind: action
    command: "dd {set_id} {data}"
    params:
      - name: mode
        type: enum
        values:
          "00": "Tile Off"
          "12": "1x2"
          "13": "1x3"
          "14": "1x4"
          "21": "2x1"
          "22": "2x2"
          "23": "2x3"
          "24": "2x4"
          "31": "3x1"
          "32": "3x2"
          "33": "3x3"
          "34": "3x4"
          "41": "4x1"
          "42": "4x2"
          "43": "4x3"
          "44": "4x4"
    ack: "d 00 OK/NG{data}"

  - id: tile_h_size
    label: Tile H Size
    kind: action
    command: "dg {set_id} {data}"
    params:
      - name: size
        type: integer
        min: 0
        max: 100
        description: "Horizontal tile size (hex 00H-64H)"
    ack: "g {set_id} OK/NG{data}"

  - id: tile_v_size
    label: Tile V Size
    kind: action
    command: "dh {set_id} {data}"
    params:
      - name: size
        type: integer
        min: 0
        max: 100
        description: "Vertical tile size (hex 00H-64H)"
    ack: "h {set_id} OK/NG{data}"

  - id: tile_id_set
    label: Tile ID Set
    kind: action
    command: "di {set_id} {data}"
    params:
      - name: tile_id
        type: integer
        min: 0
        max: 16
        description: "Tile ID (hex 00H-10H)"
    ack: "i {set_id} OK/NG{data}"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    command: "ka {set_id} FF"
    type: enum
    values:
      "00": "Power Off"
      "01": "Power On"
    ack: "a {set_id} OK{data}"

  - id: input_source
    label: Current Input Source
    command: "kb {set_id} FF"
    type: enum
    values:
      "02": "AV"
      "04": "Component 1"
      "05": "Component 2"
      "06": "RGB (DTV)"
      "07": "RGB (PC)"
      "08": "HDMI (DTV)"
      "09": "HDMI (PC)"
    ack: "b {set_id} OK{data}"

  - id: aspect_ratio
    label: Aspect Ratio
    command: "kc {set_id} FF"
    type: enum
    values:
      "01": "Normal (4:3)"
      "02": "Wide (16:9)"
      "03": "Horizon"
      "04": "Zoom1"
      "05": "Zoom2"
      "06": "Original"
      "07": "14:9"
      "08": "Full"
      "09": "1:1 (PC)"
    ack: "c {set_id} OK{data}"

  - id: screen_mute_state
    label: Screen Mute State
    command: "kd {set_id} FF"
    type: enum
    values:
      "00": "Off"
      "01": "On"
    ack: "d {set_id} OK{data}"

  - id: volume_mute_state
    label: Volume Mute State
    command: "ke {set_id} FF"
    type: enum
    values:
      "00": "Mute On"
      "01": "Mute Off"
    ack: "e {set_id} OK{data}"

  - id: volume_level
    label: Volume Level
    command: "kf {set_id} FF"
    type: integer
    min: 0
    max: 100
    ack: "f {set_id} OK{data}"

  - id: contrast_level
    label: Contrast Level
    command: "kg {set_id} FF"
    type: integer
    min: 0
    max: 100
    ack: "g {set_id} OK{data}"

  - id: brightness_level
    label: Brightness Level
    command: "kh {set_id} FF"
    type: integer
    min: 0
    max: 100
    ack: "h {set_id} OK{data}"

  - id: color_level
    label: Color Level
    command: "ki {set_id} FF"
    type: integer
    min: 0
    max: 100
    ack: "i {set_id} OK{data}"

  - id: tint_level
    label: Tint Level
    command: "kj {set_id} FF"
    type: integer
    min: -50
    max: 50
    ack: "j {set_id} OK{data}"

  - id: sharpness_level
    label: Sharpness Level
    command: "kk {set_id} FF"
    type: integer
    min: 0
    max: 100
    ack: "k {set_id} OK{data}"

  - id: osd_state
    label: OSD State
    command: "kl {set_id} FF"
    type: enum
    values:
      "00": "Off"
      "01": "On"
    ack: "l {set_id} OK{data}"

  - id: key_lock_state
    label: Key Lock State
    command: "km {set_id} FF"
    type: enum
    values:
      "00": "Off"
      "01": "On"
    ack: "m {set_id} OK{data}"

  - id: balance_level
    label: Balance Level
    command: "kt {set_id} FF"
    type: integer
    min: 0
    max: 100
    ack: "t {set_id} OK{data}"

  - id: color_temperature
    label: Color Temperature
    command: "ku {set_id} FF"
    type: enum
    values:
      "00": "Normal"
      "01": "Cool"
      "02": "Warm"
      "03": "User"
    ack: "u {set_id} OK{data}"

  - id: abnormal_state
    label: Abnormal State
    command: "kz {set_id} FF"
    type: enum
    values:
      "00": "Normal (Power On, signal present)"
      "01": "No Signal (Power On)"
      "02": "Off by remote control"
      "03": "Off by sleep timer"
      "04": "Off by RS-232C"
      "06": "AC power loss"
      "08": "Off by off timer"
      "09": "Off by auto off"
    ack: "z {set_id} OK{data}"

  - id: ism_mode
    label: ISM Mode
    command: "jp {set_id} FF"
    type: enum
    values:
      "01": "Inversion"
      "02": "Orbiter"
      "04": "White Wash"
      "08": "Normal"
    ack: "p {set_id} OK{data}"

  - id: elapsed_time
    label: Elapsed Time (Hours)
    command: "dl {set_id} FF"
    type: integer
    unit: hours
    ack: "l {set_id} OK{data}"

  - id: temperature
    label: Internal Temperature
    command: "dn {set_id} FF"
    type: integer
    ack: "n {set_id} OK{data}"
    notes: "1-byte hex value"

  - id: lamp_fault
    label: Lamp Fault Status
    command: "dp {set_id} FF"
    type: enum
    values:
      "00": "Lamp Fault"
      "01": "Lamp OK"
    ack: "p {set_id} OK{data}"
```

## Variables
```yaml
variables:
  - id: set_id
    label: Set ID
    type: integer
    min: 0
    max: 99
    default: 1
    description: "Device address on the bus. 0 broadcasts to all devices."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings or interlock procedures
```

## Notes
- Command format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = 0x0D, space = 0x20
- Data values are hex-encoded ASCII (e.g. "00" through "64" for 0-100 range)
- OK acknowledgement: `[Command2][ ][Set ID][ ][OK][Data][x]`
- Error acknowledgement: `[Command2][ ][Set ID][ ][NG][Data][x]`
- Sending data `FF` to any command queries its current state (read mode)
- Set ID 0 broadcasts to all connected displays; acknowledgements from multiple devices may collide
- Tint uses a signed mapping: 00H = -50 (Red), 64H = +50 (Green)
- Auto Configure (ju) only functions in RGB(PC) input mode
- The source describes serial communication parameters explicitly; TCP/IP support is indicated by the device but addressing details are not present in this source document
- IR remote key codes are documented in the source (hex 00-19 for number keys, discrete power/input codes, etc.) and can be sent via the `mc` command
<!-- UNRESOLVED: TCP/IP port and connection mode not documented in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: command timing constraints or inter-command delays not stated -->
<!-- UNRESOLVED: maximum cable length or daisy-chain topology limits not stated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_32sr83u_w_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:54:52.474Z
retrieved_at: 2026-04-25T20:54:52.474Z
last_checked_at: 2026-04-25T20:54:52.474Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:54:52.474Z
matched_actions: 42
action_count: 42
confidence: high
summary: "All 42 spec actions matched literally against source commands; transport parameters verified; source command catalogue fully represented."
```

## Known Gaps

```yaml
[]
```
