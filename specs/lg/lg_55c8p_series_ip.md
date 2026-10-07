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
retrieved_at: 2026-09-26T14:23:15.835Z
last_checked_at: 2026-09-26T14:23:15.835Z
generated_at: 2026-09-26T14:23:15.835Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state Ethernet/IP control port or HTTP/REST surface; this spec covers the serial (RS-232C) protocol only."
  - "no authentication procedure or explicit no-auth statement in source"
  - "A13–A16 use literal x for dd/dg/dh/di/dl/dn/dp requests."
  - "no continuous-state variables (no analog setpoints) are defined"
  - "source does not document unsolicited notifications. All responses"
  - "source does not document any multi-step macro or sequence"
  - "source does not contain explicit safety warnings, interlock"
  - "A13–A16 instead print `[x]` for dd, dg, dh, di, dl, dn and dp requests. Their templates require a terminator selection with no claimed default; the PDF confirms this is not merely an extraction artifact."
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:15.835Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 units and 36 key codes match the generic serial source; model support, authentication and conflicting terminators remain explicitly qualified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 55C8P Series Control Spec

## Summary
Serial command catalog from a generic LG multiple-monitor RS-232C appendix (printed A1–A18). Applicability to the cataloged 55C8P is inferred from manufacturer and display class; the source does not name 55C8P or establish its tiling, lamp, input or ISM capabilities. The catalog contains 26 command families, represented by 27 actions because power set and status are separate, plus the complete A18 key parameter table. Communication uses ASCII at 9600/8/N/1 with Set ID 1–99 or 0 for broadcast. Functions remain conditional on the actual display supporting them.

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
  type: unknown  # UNRESOLVED: no authentication procedure or explicit no-auth statement in source
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
# A3 general format: [Cmd1][Cmd2][ ][SetID][ ][Data][Cr]
# UNRESOLVED: A13–A16 use literal x for dd/dg/dh/di/dl/dn/dp requests.
# Those seven templates require an explicit terminator; no default is claimed.
# - Cr = ASCII 0x0D (carriage return)
# - Set ID: 1-99; "0" broadcasts to all sets (ack unreliable in broadcast)
# - "FF" as Data byte = read/status query
# Read commands are listed with kind: query and use FF as the data payload.
# Data is ASCII hexadecimal, not decimal text: decimal 100 encodes as 64.
# Set ID is documented as 1–99; this older source does not explicitly resolve
# the wire numeral radix/padding. Do not borrow those rules from a newer guide.
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
      type: string
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
      type: string
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
      type: string
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
      type: string
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
      type: string
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
      type: string
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
      type: string
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
    Abnormal State : Used to Read the power off status when Stand-by mode.
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
      values: ["00", "01", "02", "03", "08", "C4", "C5", "09", "98", "0B", "0E", "43", "5B", "6E", "44", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "5A", "BF", "D4", "D5", "D7", "C6", "79", "76", "77", "AF", "99"]
      description: "ASCII hexadecimal key code; complete 36-entry A18 table below."
  notes: "mc transports the A18 remote-key codes over serial; no IR transmitter is required by this command."

- id: tile_mode
  label: Tile Mode
  kind: action
  command: "dd {set_id} {data}{terminator}"
  params:
    - name: terminator
      type: enum
      values: ["\r", "x"]
      description: "UNRESOLVED source conflict: A3 specifies CR (0x0D); this command's A13–A16 row specifies literal x (0x78). No default."
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: enum
      values: ["00", "12", "13", "14", "44"]
      description: "Tile matrix. 00=Off, then column-row hex (e.g. 12=1x2, 44=4x4). Source: 0X or X0 (except 00) not allowed."
  notes: "Source lists example values 00, 12, 13, 14, ..., 44. Only these five values are explicitly listed. Intermediate values remain UNRESOLVED; 0X/X0 are forbidden except 00. The command-specific reply shows Set ID 00, unlike the general echoed-ID format."

- id: tile_h_size
  label: Tile Horizontal Size
  kind: action
  command: "dg {set_id} {data}{terminator}"
  params:
    - name: terminator
      type: enum
      values: ["\r", "x"]
      description: "UNRESOLVED source conflict: A3 specifies CR (0x0D); this command's A13–A16 row specifies literal x (0x78). No default."
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: string
      description: Horizontal tile size (00H-64H hex)

- id: tile_v_size
  label: Tile Vertical Size
  kind: action
  command: "dh {set_id} {data}{terminator}"
  params:
    - name: terminator
      type: enum
      values: ["\r", "x"]
      description: "UNRESOLVED source conflict: A3 specifies CR (0x0D); this command's A13–A16 row specifies literal x (0x78). No default."
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: string
      description: Vertical tile size (00H-64H hex)

- id: tile_id_set
  label: Tile ID Set
  kind: action
  command: "di {set_id} {data}{terminator}"
  params:
    - name: terminator
      type: enum
      values: ["\r", "x"]
      description: "UNRESOLVED source conflict: A3 specifies CR (0x0D); this command's A13–A16 row specifies literal x (0x78). No default."
    - name: set_id
      type: integer
      description: Set ID (1-99)
    - name: data
      type: string
      description: Tile ID (00H-10H hex)

- id: elapsed_time_return
  label: Elapsed Time Return
  kind: query
  command: "dl {set_id} FF{terminator}"
  params:
    - name: terminator
      type: enum
      values: ["\r", "x"]
      description: "UNRESOLVED source conflict: A3 specifies CR (0x0D); this command's A13–A16 row specifies literal x (0x78). No default."
    - name: set_id
      type: integer
      description: Set ID (1-99)
  notes: "Data is always FF. Response data is used hours in hex."

- id: temperature_value
  label: Temperature Value
  kind: query
  command: "dn {set_id} FF{terminator}"
  params:
    - name: terminator
      type: enum
      values: ["\r", "x"]
      description: "UNRESOLVED source conflict: A3 specifies CR (0x0D); this command's A13–A16 row specifies literal x (0x78). No default."
    - name: set_id
      type: integer
      description: Set ID (1-99)
  notes: "Data is always FF. Response data is 1 byte in hex (inside temperature)."

- id: lamp_fault_check
  label: Lamp Fault Check
  kind: query
  command: "dp {set_id} FF{terminator}"
  params:
    - name: terminator
      type: enum
      values: ["\r", "x"]
      description: "UNRESOLVED source conflict: A3 specifies CR (0x0D); this command's A13–A16 row specifies literal x (0x78). No default."
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
- Scope is the generic manufacturer's serial appendix, not confirmed 55C8P support. The catalog identity is retained. No firmware applicability or IP control is established by this source.
- A3 general request format is `[Cmd1][Cmd2]<SP>[SetID]<SP>[Data]<CR>`, with space 0x20 and CR 0x0D. **UNRESOLVED:** A13–A16 instead print `[x]` for dd, dg, dh, di, dl, dn and dp requests. Their templates require a terminator selection with no claimed default; the PDF confirms this is not merely an extraction artifact.
- General OK reply is `[Cmd2]<SP>[SetID]<SP>OK[Data]x`; NG uses the same spacing with `NG`. Reply `x` is literal 0x78. Tile-mode reply specifically prints Set ID `00`; its relationship to the general echoed Set ID is unresolved.
- Data bytes are ASCII hex. For 00H–64H controls, decimal 0–100 is encoded as 00–64. Tint maps those endpoints to red -50 and green +50; balance maps them to L50 and R50. Sharpness in this older guide is 00H–64H; do not substitute the newer guide's 00H–32H limit.
- Broadcast Set ID 0 addresses all sets; the source warns not to inspect acknowledgements when multiple sets reply together. The source states Set ID 1–99 but does not unambiguously specify its ASCII radix/padding.
- Authentication is UNRESOLVED; absence of an authentication section does not establish no authentication.
- ISM, tiling, lamp diagnostics, video-only picture settings and RGB-PC auto configuration are conditional source functions, not claims that 55C8P supports them. Aspect value 08 (Full) is Europe-only and value 09 (1:1) is PC-only.
- Tile mode lists only 00, 12, 13, 14, an ellipsis, and 44. Intermediate values are not enumerated, and 0X/X0 are invalid except 00. They have not been guessed.
- The key action uses the full A18 table below as serial `mc` data. A18's C5 Function column says POWER OFF while its Note column incorrectly repeats “Only Power On”; that internal discrepancy is retained here rather than hidden. Direction glyphs for 00–03 were checked visually in the PDF.

### A18 key parameter inventory

| Hex data | Function |
| --- | --- |
| 00 | Up |
| 01 | Down |
| 02 | VOL right/increase |
| 03 | VOL left/decrease |
| 08 | Power on/off toggle |
| C4 | Power on |
| C5 | Power off (Function column; conflicting Note described above) |
| 09 | Mute |
| 98 | AV remote button |
| 0B | Input |
| 0E | Sleep |
| 43 | Menu |
| 5B | Exit |
| 6E | PSM |
| 44 | Set |
| 10 | Number 0 |
| 11 | Number 1 |
| 12 | Number 2 |
| 13 | Number 3 |
| 14 | Number 4 |
| 15 | Number 5 |
| 16 | Number 6 |
| 17 | Number 7 |
| 18 | Number 8 |
| 19 | Number 9 |
| 5A | AV discrete input |
| BF | Component 1 |
| D4 | Component 2 |
| D5 | RGB PC |
| D7 | RGB DTV |
| C6 | HDMI/DVI |
| 79 | ARC |
| 76 | ARC 4:3 |
| 77 | ARC 16:9 |
| AF | ARC Zoom (Zoom1/Zoom2) |
| 99 | AUTO CONFIC (source spelling; auto configuration) |

## Provenance

```yaml
source_domains:
  - justaddpower.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
retrieved_at: 2026-09-26T14:23:15.835Z
last_checked_at: 2026-09-26T14:23:15.835Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:15.835Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 units and 36 key codes match the generic serial source; model support, authentication and conflicting terminators remain explicitly qualified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state Ethernet/IP control port or HTTP/REST surface; this spec covers the serial (RS-232C) protocol only."
- "no authentication procedure or explicit no-auth statement in source"
- "A13–A16 use literal x for dd/dg/dh/di/dl/dn/dp requests."
- "no continuous-state variables (no analog setpoints) are defined"
- "source does not document unsolicited notifications. All responses"
- "source does not document any multi-step macro or sequence"
- "source does not contain explicit safety warnings, interlock"
- "A13–A16 instead print `[x]` for dd, dg, dh, di, dl, dn and dp requests. Their templates require a terminator selection with no claimed default; the PDF confirms this is not merely an extraction artifact."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
