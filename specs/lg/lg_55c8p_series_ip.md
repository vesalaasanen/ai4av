---
spec_id: admin/lg-55c8p-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55C8P Series Control Spec"
manufacturer: LG
model_family: 55C8P
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 55C8P
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - justaddpower.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
retrieved_at: 2026-06-02T02:38:36.427Z
last_checked_at: 2026-06-02T17:23:04.046Z
generated_at: 2026-06-02T17:23:04.046Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state Ethernet/IP control port or HTTP/REST surface; this spec covers the serial (RS-232C) protocol only."
  - "full key code table referenced as 'page A18' is not included in the refined source.\""
  - "no continuous-state variables (no analog setpoints) are defined"
  - "source does not document unsolicited notifications. All responses"
  - "source does not document any multi-step macro or sequence"
  - "source does not contain explicit safety warnings, interlock"
  - "firmware version compatibility range across 55C8P SKU revisions; tile-mode intermediate hex values; full IR key code table (page A18)."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:04.046Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions match source commands with correct opcodes and parameters; transport parameters verified against source; serial protocol fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 55C8P Series Control Spec

## Summary
RS-232/serial control protocol for the LG 55C8P commercial display series. Uses an ASCII command/response format over UART at 9600 bps with a Set-ID addressing scheme (1–99, or 0 for broadcast). All 26 documented commands are catalogued below, covering power, input selection, picture/sound adjustments, tiling, and diagnostic readback.

<!-- UNRESOLVED: source does not state Ethernet/IP control port or HTTP/REST surface; this spec covers the serial (RS-232C) protocol only. -->

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
- powerable      # inferred from k a power on/off commands
- routable       # inferred from k b input select commands
- queryable      # inferred from status/read commands (ka FF, d l FF, d n FF, d p FF, k z FF)
- levelable      # inferred from volume, contrast, brightness, color, tint, sharpness, balance commands
```

## Actions
```yaml
# All commands share format: [Cmd1][Cmd2][ ][SetID][ ][Data][Cr]
# - Cr = ASCII 0x0D (carriage return)
# - Set ID: 1-99; "0" broadcasts to all sets (ack unreliable in broadcast)
# - "FF" as Data byte = read/status query
# Read commands are listed with kind: query and use FF as the data payload.
# Variable parts are shown as {set_id} and {data} in command templates.

- id: power
  label: Power On/Off
  kind: action
  command: "ka {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00 = Power Off, 01 = Power On"
  notes: |
    Real data: 0 = Power Off, 1 = Power On.

- id: power_status
  label: Power Status
  kind: query
  command: "ka {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)

- id: input_select
  label: Input Select (Main Picture)
  kind: action
  command: "kb {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: enum
      values: ["02", "04", "05", "06", "07", "08", "09"]
      description: "02=AV, 04=Component1, 05=Component2, 06=RGB(DTV), 07=RGB(PC), 08=HDMI(DTV), 09=HDMI(PC)"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "kc {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: enum
      values: ["01", "02", "03", "04", "05", "06", "07", "08", "09"]
      description: "1=4:3, 2=16:9, 3=Horizon, 4=Zoom1, 5=Zoom2, 6=Original, 7=14:9, 8=Full (Europe), 9=1:1 (PC)"

- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: enum
      values: ["00", "01"]
      description: "0 = Screen mute off (picture on), 1 = Screen mute on (picture off)"

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: enum
      values: ["00", "01"]
      description: "0 = Mute On (volume off), 1 = Mute Off (volume on)"

- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: integer
      description: Volume level (00H-64H hex; 0=Step 0, 64=Step 100)
  notes: |
    Real data mapping: 0 = Step 0, A = Step 10, F = Step 15, 10 = Step 16, 64 = Step 100.

- id: contrast
  label: Contrast
  kind: action
  command: "kg {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: integer
      description: Contrast (00H-64H hex; 0=Step 0, 64=Step 100)

- id: brightness
  label: Brightness
  kind: action
  command: "kh {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: integer
      description: Brightness (00H-64H hex; 0=Step 0, 64=Step 100)

- id: color
  label: Color
  kind: action
  command: "ki {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: integer
      description: Color saturation (00H-64H hex; 0=Step 0, 64=Step 100)
  notes: "Video only."

- id: tint
  label: Tint
  kind: action
  command: "kj {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: integer
      description: "Tint (00H=Red -50, 64H=Green +50)"
  notes: "Video only. Real data mapping: 0 = Step -50, 64 = Step 50."

- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: integer
      description: Sharpness (00H-64H hex; 0=Step 0, 64=Step 100)
  notes: "Video only."

- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: enum
      values: ["00", "01"]
      description: "0 = OSD Off, 1 = OSD On"

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  command: "km {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: enum
      values: ["00", "01"]
      description: "0 = Off, 1 = On (locks remote control and local keys while under RS-232C control)"

- id: balance
  label: Balance
  kind: action
  command: "kt {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: integer
      description: "Balance (00H=L50, 64H=R50)"

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "ku {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: enum
      values: ["00", "01", "02", "03"]
      description: "0=Normal, 1=Cool, 2=Warm, 3=User"

- id: abnormal_state
  label: Abnormal State (Read)
  kind: query
  command: "kz {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
  notes: |
    Response codes:
    0 = Normal (power on and signal exist)
    1 = No signal (power on)
    2 = Turned off by remote control
    3 = Turned off by sleep time
    4 = Turned off by RS-232C
    6 = AC down
    8 = Turned off by off time
    9 = Turned off by auto off

- id: ism_mode
  label: ISM Mode
  kind: action
  command: "jp {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: enum
      values: ["01", "02", "04", "08"]
      description: "1=Inversion, 2=Orbiter, 4=White Wash, 8=Normal"

- id: auto_configure
  label: Auto Configure
  kind: action
  command: "ju {set_id} 01\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
  notes: "Adjusts picture position and minimizes image shaking. Works only in RGB(PC) mode."

- id: key
  label: IR Remote Key
  kind: action
  command: "mc {set_id} {key_code}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: key_code
      type: string
      description: "IR remote key code (hex). Source refers to 'page A18' for full code table; not reproduced here."
  notes: "UNRESOLVED: full key code table referenced as 'page A18' is not included in the refined source."

- id: tile_mode
  label: Tile Mode
  kind: action
  command: "dd {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      type: integer
      description: Set ID (1-99)
    - name: data
      type: enum
      values: ["00", "12", "13", "14", "21", "22", "23", "24", "31", "32", "33", "34", "41", "42", "43", "44"]
      description: "Tile matrix. 00=Off, then column-row hex (e.g. 12=1x2, 44=4x4). Source: 0X or X0 (except 00) not allowed."
  notes: "Source lists example values 00, 12, 13, 14, ..., 44. Full range not exhaustively enumerated; treat as TBD."

- id: tile_h_size
  label: Tile Horizontal Size
  kind: action
  command: "dg {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: integer
      description: Horizontal tile size (00H-64H hex)

- id: tile_v_size
  label: Tile Vertical Size
  kind: action
  command: "dh {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: integer
      description: Vertical tile size (00H-64H hex)

- id: tile_id_set
  label: Tile ID Set
  kind: action
  command: "di {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: integer
      description: Tile ID (00H-10H hex)

- id: elapsed_time_return
  label: Elapsed Time Return
  kind: query
  command: "dl {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
  notes: "Data is always FF. Response data is used hours in hex."

- id: temperature_value
  label: Temperature Value
  kind: query
  command: "dn {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
  notes: "Data is always FF. Response data is 1 byte in hex (inside temperature)."

- id: lamp_fault_check
  label: Lamp Fault Check
  kind: query
  command: "dp {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
  notes: "Data is always FF. Response: 0 = Lamp Fault, 1 = Lamp OK."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  source_command: power_status
  notes: "Return data: 0 = Off, 1 = On."

- id: volume_mute_state
  type: enum
  values: [on, off]
  source_command: volume_mute
  notes: "Return data: 0 = Mute On, 1 = Mute Off."

- id: screen_mute_state
  type: enum
  values: [on, off]
  source_command: screen_mute

- id: input_state
  type: enum
  values: [av, component1, component2, rgb_dtv, rgb_pc, hdmi_dtv, hdmi_pc]
  source_command: input_select
  notes: "Return data codes: 2=AV, 4=Component1, 5=Component2, 6=RGB(DTV), 7=RGB(PC), 8=HDMI(DTV), 9=HDMI(PC)."

- id: aspect_ratio_state
  type: enum
  values: [normal_4_3, wide_16_9, horizon, zoom1, zoom2, original, ratio_14_9, full, pc_1_1]
  source_command: aspect_ratio

- id: osd_state
  type: enum
  values: [off, on]
  source_command: osd_select

- id: remote_lock_state
  type: enum
  values: [off, on]
  source_command: remote_lock

- id: balance_state
  type: integer
  range: [0, 100]
  source_command: balance
  notes: "00H = L50, 64H = R50."

- id: color_temperature_state
  type: enum
  values: [normal, cool, warm, user]
  source_command: color_temperature

- id: abnormal_state
  type: enum
  values: [normal, no_signal, off_by_remote, off_by_sleep, off_by_rs232, ac_down, off_by_off_time, off_by_auto_off]
  source_command: abnormal_state
  notes: "Response codes 0,1,2,3,4,6,8,9. Codes 5 and 7 are unused."

- id: ism_mode_state
  type: enum
  values: [inversion, orbiter, white_wash, normal]
  source_command: ism_mode

- id: elapsed_hours
  type: integer
  source_command: elapsed_time_return
  notes: "Hexadecimal used hours."

- id: temperature_reading
  type: integer
  source_command: temperature_value
  notes: "1-byte hex; units not specified in source."

- id: lamp_fault_state
  type: enum
  values: [fault, ok]
  source_command: lamp_fault_check
```

## Variables
```yaml
# Discrete-action commands cover all documented settable parameters; no
# continuous variables beyond those encoded as command payloads.
# UNRESOLVED: no continuous-state variables (no analog setpoints) are defined
# outside the action commands above.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications. All responses
# are acknowledgements to issued commands.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro or sequence
# commands. The m c "Key" command is the only mechanism for chaining IR
# remote key presses serially, but no predefined macro sequences are listed.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings, interlock
# procedures, or power-on sequencing requirements. The "abnormal state"
# readback (kz) covers power-off cause diagnostics but is informational only.
```

## Notes
- Source is RS-232C/serial (UART 9600 8N1) only; the file naming hint (`..._ip.refined.md`) and the operator-supplied "Known protocol: TCP/IP" appear to be artifacts. The refined source documents the serial protocol exclusively. IP/Ethernet control of the 55C8P family may exist via a separate LG SuperSign/TV-style LAN interface, but is **not** in scope of this document.
- Command format is fixed ASCII: `[Cmd1][Cmd2]<SP>[SetID]<SP>[Data]<CR>`, with `<SP>` = 0x20 and `<CR>` = 0x0D.
- OK acknowledgement: `[Cmd2]<SP>[SetID]<SP>OK[Data][x]` (trailing `x` is literal in source).
- Error acknowledgement: `[Cmd2]<SP>[SetID]<SP>NG[Data][x]`.
- Broadcasting with Set ID `0` is permitted, but acknowledgements from all sets will collide — the source explicitly warns not to check acks in that case.
- The "Key" command (`m c`) forwards arbitrary IR remote key codes; the full code table is referenced as "page A18" of the original vendor document and was not included in the refined source excerpt.
- The 26-command roster in the source's reference table is reproduced 1:1 above. Tile mode intermediate values (e.g. 21, 22, 31, 32, 33, 41, 42, 43) are not exhaustively enumerated in the source; the `…` row in the source table indicates they exist but are not listed.
- IR codes section is documented in the source for hardware reference but is not part of the serial control surface and therefore not encoded as actions.

<!-- UNRESOLVED: firmware version compatibility range across 55C8P SKU revisions; tile-mode intermediate hex values; full IR key code table (page A18). -->

## Provenance

```yaml
source_domains:
  - justaddpower.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
retrieved_at: 2026-06-02T02:38:36.427Z
last_checked_at: 2026-06-02T17:23:04.046Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:04.046Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions match source commands with correct opcodes and parameters; transport parameters verified against source; serial protocol fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state Ethernet/IP control port or HTTP/REST surface; this spec covers the serial (RS-232C) protocol only."
- "full key code table referenced as 'page A18' is not included in the refined source.\""
- "no continuous-state variables (no analog setpoints) are defined"
- "source does not document unsolicited notifications. All responses"
- "source does not document any multi-step macro or sequence"
- "source does not contain explicit safety warnings, interlock"
- "firmware version compatibility range across 55C8P SKU revisions; tile-mode intermediate hex values; full IR key code table (page A18)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
