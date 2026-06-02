---
spec_id: admin/lg-50qned86bta-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 50QNED86BTA Series Control Spec"
manufacturer: LG
model_family: 50QNED86BTA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50QNED86BTA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - webostv.developer.lge.com
  - justaddpower.com
  - justaddpower.happyfox.com
source_urls:
  - https://webostv.developer.lge.com/develop/references/luna-service-introduction
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
  - https://webostv.developer.lge.com/assets/netcast/NetCast-UDAP.pdf
retrieved_at: 2026-06-02T17:23:00.941Z
last_checked_at: 2026-06-02T17:23:00.941Z
generated_at: 2026-06-02T17:23:00.941Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control was indicated in the request, but the refined source contains only RS-232C. No IP/port/credential information is documented in the source."
  - "source documents only discrete command ranges; no continuous"
  - "source documents only solicited OK/NG acknowledgements; no"
  - "source does not document multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "TCP/IP control parameters (port, credentials, command mapping) — source contains none. The \"Known protocol\" hint in the request did not match source content."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:00.941Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched source commands verbatim; all transport parameters verified against source; source command set fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 50QNED86BTA Series Control Spec

## Summary
This spec covers the RS-232C control protocol for the LG 50QNED86BTA Series display. Commands use ASCII framing with a leading opcode pair, Set ID, data, and Carriage Return terminator. Status is read back by sending `FF` as the data byte. Acknowledgements are returned as `[Command2] [SetID] OK[Data]x` (success) or `[Command2] [SetID] NG[Data]x` (error).

<!-- UNRESOLVED: TCP/IP control was indicated in the request, but the refined source contains only RS-232C. No IP/port/credential information is documented in the source. -->

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
  terminator: "\r"  # ASCII 0x0D Carriage Return
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from k a Power command
- routable    # inferred from k b Input Select command
- queryable   # inferred from FF read-status usage across commands
- levelable   # inferred from k f/k g/k h/k i/k j/k k/k t level controls
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  command: "ka {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99 (0 broadcasts to all units; suppresses ACK check)
    - name: data
      type: enum
      values: ["00", "01"]
      value_meanings:
        "00": Power Off
        "01": Power On
  notes: |
    Data range from source: 00H-01H.

- id: power_status
  label: Power Status
  kind: query
  command: "ka {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
  response: "a {set_id} OK{data}x"
  notes: |
    Response data: 00 = Power Off, 01 = Power On.

- id: input_select
  label: Input Select (Main Picture)
  kind: action
  command: "kb {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: enum
      values: ["02", "04", "05", "06", "07", "08", "09"]
      value_meanings:
        "02": AV
        "04": Component 1
        "05": Component 2
        "06": RGB (DTV)
        "07": RGB (PC)
        "08": HDMI (DTV)
        "09": HDMI (PC)
  notes: |
    Data range from source: 02H-09H.

- id: aspect_ratio
  label: Aspect Ratio (Main Picture)
  kind: action
  command: "kc {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: enum
      values: ["01", "02", "03", "04", "05", "06", "07", "08", "09"]
      value_meanings:
        "01": Normal Screen (4:3)
        "02": Wide Screen (16:9)
        "03": Horizon (Spectacle)
        "04": Zoom1
        "05": Zoom2
        "06": Original
        "07": 14:9
        "08": Full (Europe version only)
        "09": 1:1 (PC)
  notes: |
    Data range from source: 01H-09H.

- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: enum
      values: ["00", "01"]
      value_meanings:
        "00": Screen mute off (Picture on)
        "01": Screen mute on (Picture off)

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: enum
      values: ["00", "01"]
      value_meanings:
        "00": Volume Mute On (Volume Off)
        "01": Volume Mute Off (Volume On)

- id: volume
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: integer
      description: Hex byte 00H-64H (0-100 step)
  notes: |
    Real data mapping from source: 0=Step 0, A=Step 10, F=Step 15, 10=Step 16, 64=Step 100.

- id: contrast
  label: Contrast
  kind: action
  command: "kg {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: integer
      description: Hex byte 00H-64H (0-100 step)
  notes: |
    Real data mapping from source: 0=Step 0, A=Step 10, F=Step 15, 10=Step 16, 64=Step 100.

- id: brightness
  label: Brightness
  kind: action
  command: "kh {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: integer
      description: Hex byte 00H-64H (0-100 step)
  notes: |
    Real data mapping from source: 0=Step 0, A=Step 10, F=Step 15, 10=Step 16, 64=Step 100.

- id: color
  label: Color
  kind: action
  command: "ki {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: integer
      description: Hex byte 00H-64H (0-100 step); video only
  notes: |
    Real data mapping from source: 0=Step 0, A=Step 10, F=Step 15, 10=Step 16, 64=Step 100.

- id: tint
  label: Tint
  kind: action
  command: "kj {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: integer
      description: Hex byte 00H (Red)-64H (Green); video only
  notes: |
    Real data mapping from source: 0=Step -50, 64=Step 50.

- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: integer
      description: Hex byte 00H-64H (0-100 step); video only
  notes: |
    Real data mapping from source: 0=Step 0, A=Step 10, F=Step 15, 10=Step 16, 64=Step 100.

- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: enum
      values: ["00", "01"]
      value_meanings:
        "00": OSD Off
        "01": OSD On

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  command: "km {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: enum
      values: ["00", "01"]
      value_meanings:
        "00": Off
        "01": On
  notes: |
    When controlling via RS-232C, this locks the remote control and the local keys.

- id: balance
  label: Balance
  kind: action
  command: "kt {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: integer
      description: Hex byte 00H-64H
  notes: |
    Balance real data mapping from source: L50-R50.

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "ku {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: enum
      values: ["00", "01", "02", "03"]
      value_meanings:
        "00": Normal
        "01": Cool
        "02": Warm
        "03": User

- id: abnormal_state
  label: Abnormal State
  kind: query
  command: "kz {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
  response: "z {set_id} OK{data}x"
  notes: |
    Read power-off status in Stand-by mode. Response values: 0=Normal (power on, signal exist), 1=No signal (power on), 2=Off by remote, 3=Off by sleep timer, 4=Off by RS-232C, 6=AC down, 8=Off by off-time function, 9=Off by auto-off.

- id: ism_mode
  label: ISM Mode
  kind: action
  command: "jp {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: enum
      values: ["00", "01", "02", "04", "08"]
      value_meanings:
        "00": (reserved within 00H-08H range)
        "01": Inversion
        "02": Orbiter
        "04": White Wash
        "08": Normal
  notes: |
    Data range from source: 00H-08H.

- id: auto_configure
  label: Auto Configure
  kind: action
  command: "ju {set_id} 01\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
  notes: |
    Auto-adjusts picture position and minimizes image shake. Works only in RGB(PC) mode.

- id: key
  label: IR Remote Key
  kind: action
  command: "mc {set_id} {key_code}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: key_code
      type: string
      description: IR key code; see source page A18 for the full mapping
  notes: |
    Sends an IR remote key code via RS-232C. The complete key code table is referenced in the vendor manual.

- id: tile_mode
  label: Tile Mode
  kind: action
  command: "dd {set_id} {data}x"
  params:
    - name: set_id
      type: integer
      description: Set ID (broadcast example shows 00 in ACK template)
    - name: data
      type: enum
      values: ["00", "12", "13", "14", "21", "22", "23", "24", "31", "32", "33", "34", "41", "42", "43", "44"]
      value_meanings:
        "00": Tile mode off
        "12": 1 x 2 mode (column x row)
        "13": 1 x 3 mode
        "14": 1 x 4 mode
        "21": 2 x 1 mode
        "22": 2 x 2 mode
        "23": 2 x 3 mode
        "24": 2 x 4 mode
        "31": 3 x 1 mode
        "32": 3 x 2 mode
        "33": 3 x 3 mode
        "34": 3 x 4 mode
        "41": 4 x 1 mode
        "42": 4 x 2 mode
        "43": 4 x 3 mode
        "44": 4 x 4 mode
  notes: |
    Source range: 00H-44H. 0X and X0 values (other than 00) are not settable.

- id: tile_h_size
  label: Tile H Size
  kind: action
  command: "dg {set_id} {data}x"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: integer
      description: Hex byte 00H-64H (horizontal tile size)

- id: tile_v_size
  label: Tile V Size
  kind: action
  command: "dh {set_id} {data}x"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: integer
      description: Hex byte 00H-64H (vertical tile size)

- id: tile_id_set
  label: Tile ID Set
  kind: action
  command: "di {set_id} {data}x"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
    - name: data
      type: integer
      description: Hex byte 00H-10H (Tile ID assignment)

- id: elapsed_time
  label: Elapsed Time
  kind: query
  command: "dl {set_id} FFx"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
  response: "l {set_id} OK/NG{data}x"
  notes: |
    Returns used hours in hexadecimal.

- id: temperature_value
  label: Temperature Value
  kind: query
  command: "dn {set_id} FFx"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
  response: "n {set_id} OK/NG{data}x"
  notes: |
    1-byte hexadecimal value of internal temperature.

- id: lamp_fault_check
  label: Lamp Fault Check
  kind: query
  command: "dp {set_id} FFx"
  params:
    - name: set_id
      type: integer
      description: Set ID 0-99
  response: "p {set_id} OK/NG{data}x"
  notes: |
    Response data: 0 = Lamp Fault, 1 = Lamp OK.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  source_action: power_status
  values: [power_off, power_on]
  value_codes:
    "00": power_off
    "01": power_on

- id: abnormal_state_code
  type: enum
  source_action: abnormal_state
  values: [normal, no_signal, off_by_remote, off_by_sleep, off_by_rs232, ac_down, off_by_off_time, off_by_auto_off]
  value_codes:
    "0": normal
    "1": no_signal
    "2": off_by_remote
    "3": off_by_sleep
    "4": off_by_rs232
    "6": ac_down
    "8": off_by_off_time
    "9": off_by_auto_off

- id: lamp_status
  type: enum
  source_action: lamp_fault_check
  values: [lamp_fault, lamp_ok]
  value_codes:
    "0": lamp_fault
    "1": lamp_ok
```

## Variables
```yaml
# UNRESOLVED: source documents only discrete command ranges; no continuous
# settable variable list beyond the per-action data fields above.
```

## Events
```yaml
# UNRESOLVED: source documents only solicited OK/NG acknowledgements; no
# unsolicited notification stream is described.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements.
```

## Notes
- Framing: `[Command1][Command2][space][SetID][space][Data][Cr]`, where `Cr` is ASCII 0x0D. `d`-family commands use `x` (0x78) as the terminator instead of `Cr`.
- OK acknowledgement: `[Command2][space][SetID][space]OK[Data]x`. Error acknowledgement: `[Command2][space][SetID][space]NG[Data]x`.
- Set ID `0` broadcasts to all connected units; the source explicitly warns that ACK checking is unreliable in this mode because all units respond.
- Read status of any command by sending `FF` as the data byte.
- IR codes section at the end of the source documents the wired-remote protocol but is not part of the RS-232C command set.

<!-- UNRESOLVED: TCP/IP control parameters (port, credentials, command mapping) — source contains none. The "Known protocol" hint in the request did not match source content. -->

## Provenance

```yaml
source_domains:
  - webostv.developer.lge.com
  - justaddpower.com
  - justaddpower.happyfox.com
source_urls:
  - https://webostv.developer.lge.com/develop/references/luna-service-introduction
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
  - https://webostv.developer.lge.com/assets/netcast/NetCast-UDAP.pdf
retrieved_at: 2026-06-02T17:23:00.941Z
last_checked_at: 2026-06-02T17:23:00.941Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:00.941Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched source commands verbatim; all transport parameters verified against source; source command set fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control was indicated in the request, but the refined source contains only RS-232C. No IP/port/credential information is documented in the source."
- "source documents only discrete command ranges; no continuous"
- "source documents only solicited OK/NG acknowledgements; no"
- "source does not document multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "TCP/IP control parameters (port, credentials, command mapping) — source contains none. The \"Known protocol\" hint in the request did not match source content."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
