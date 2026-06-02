---
spec_id: admin/lg-65b8p-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 65B8P Series Control Spec"
manufacturer: LG
model_family: "65B8P Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "65B8P Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - justaddpower.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
retrieved_at: 2026-06-02T02:54:22.782Z
last_checked_at: 2026-06-02T03:24:48.944Z
generated_at: 2026-06-02T03:24:48.944Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "TCP/IP port or endpoint not stated in source (source is RS-232)"
  - "source does not describe unsolicited notifications from the device."
  - "source does not describe multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures,"
  - "complete IR key code list cross-references page A18 of the vendor manual, not fully present in the refined excerpt; the entries 00 (\"L\") and 01 (\"M\") appear truncated."
verification:
  verdict: verified
  checked_at: 2026-06-02T03:24:48.944Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched literally to source commands with correct shapes; transport parameters verified; spec covers entire command reference. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 65B8P Series Control Spec

## Summary

The LG 65B8P Series is a line of professional display panels. This spec covers the RS-232/serial control protocol described in the vendor's IP-control reference document, including 26 commands for power, input selection, picture/sound adjustment, tiling, and diagnostics.

The user-supplied protocol hint (TCP/IP) does not match the source. The source explicitly defines a UART-based RS-232 link (9600 bps, 8N1, ASCII) and references "RS-232C" repeatedly; the protocol has been populated as `serial` based on direct source evidence.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TCP/IP port or endpoint not stated in source (source is RS-232) -->

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
- powerable       # inferred from k a power command
- routable        # inferred from k b input select command
- queryable       # inferred from FF read / "always FF" status queries
- levelable       # inferred from volume/contrast/brightness/color/tint/sharpness/balance commands
```

## Actions
```yaml
# Command format: [Cmd1][Cmd2][ ][Set ID][ ][Data][Cr]
#   - Fields separated by ASCII space (0x20)
#   - Set ID range: 1-99; "0" broadcasts to all connected displays
#   - [Cr] = Carriage Return (0x0D)
# Templates below show Set ID and Data as {set_id} and {data} placeholders.

- id: power_set
  label: Power On/Off
  kind: action
  command: "ka {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: 00H = Power Off, 01H = Power On

- id: power_query
  label: Power Status Query
  kind: query
  command: "ka {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)

- id: input_select_set
  label: Input Select (Main Picture)
  kind: action
  command: "kb {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: '02H=AV, 04H=Component1, 05H=Component2, 06H=RGB(DTV), 07H=RGB(PC), 08H=HDMI(DTV), 09H=HDMI(PC)'

- id: aspect_ratio_set
  label: Aspect Ratio
  kind: action
  command: "kc {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: '01H=4:3, 02H=16:9, 03H=Horizon, 04H=Zoom1, 05H=Zoom2, 06H=Original, 07H=14:9, 08H=Full (Europe only), 09H=1:1 (PC)'

- id: screen_mute_set
  label: Screen Mute On/Off
  kind: action
  command: "kd {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: 00H = Mute off (Picture on), 01H = Mute on (Picture off)

- id: volume_mute_set
  label: Volume Mute On/Off
  kind: action
  command: "ke {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: 00H = Volume Mute On, 01H = Volume Mute Off

- id: volume_control_set
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: Volume value 00H-64H (0=step0, 64=step100)

- id: contrast_set
  label: Contrast
  kind: action
  command: "kg {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: Contrast value 00H-64H (0=step0, 64=step100)

- id: brightness_set
  label: Brightness
  kind: action
  command: "kh {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: Brightness value 00H-64H (0=step0, 64=step100)

- id: color_set
  label: Color
  kind: action
  command: "ki {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: Color value 00H-64H (0=step0, 64=step100)

- id: tint_set
  label: Tint
  kind: action
  command: "kj {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: Tint value 00H-64H (00H=Red -50, 64H=Green +50)

- id: sharpness_set
  label: Sharpness
  kind: action
  command: "kk {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: Sharpness value 00H-64H (0=step0, 64=step100)

- id: osd_select_set
  label: OSD On/Off
  kind: action
  command: "kl {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: 00H = OSD Off, 01H = OSD On

- id: remote_key_lock_set
  label: Remote Lock / Key Lock
  kind: action
  command: "km {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: 00H = Off, 01H = On (locks remote + local keys while still accepting RS-232)

- id: balance_set
  label: Balance
  kind: action
  command: "kt {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: Balance value 00H-64H (00H=L50, 64H=R50)

- id: color_temperature_set
  label: Color Temperature
  kind: action
  command: "ku {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: '00H=Normal, 01H=Cool, 02H=Warm, 03H=User'

- id: abnormal_state_query
  label: Abnormal State Query
  kind: query
  command: "kz {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)

- id: ism_mode_set
  label: ISM (Image Sticking Minimization) Mode
  kind: action
  command: "jp {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: '01H=Inversion, 02H=Orbiter, 04H=White Wash, 08H=Normal'

- id: auto_configure
  label: Auto Configure
  kind: action
  command: "ju {set_id} 01\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
  notes: "Adjusts picture position and minimizes image shaking; only operates in RGB(PC) mode."

- id: key_send
  label: Send IR Remote Key Code
  kind: action
  command: "mc {set_id} {key_code}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: key_code
      type: string
      description: Hex IR key code from IR Codes table (see Notes)
  notes: "Source cross-references the IR Codes table on page A18 of the vendor manual for the key code list."

- id: tile_mode_set
  label: Tile Mode
  kind: action
  command: "dd {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: '00H=Off, 12H=1x2, 13H=1x3, 14H=1x4, ... 44H=4x4. Format XY (X=cols, Y=rows); 0X or X0 invalid except 00.'

- id: tile_h_size_set
  label: Tile Horizontal Size
  kind: action
  command: "dg {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: Horizontal size value 00H-64H

- id: tile_v_size_set
  label: Tile Vertical Size
  kind: action
  command: "dh {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: Vertical size value 00H-64H

- id: tile_id_set
  label: Tile ID Set
  kind: action
  command: "di {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 = broadcast)
    - name: data
      type: integer
      description: Tile ID value 00H-10H

- id: elapsed_time_query
  label: Elapsed Time Return
  kind: query
  command: "dl {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)

- id: temperature_value_query
  label: Temperature Value
  kind: query
  command: "dn {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)

- id: lamp_fault_query
  label: Lamp Fault Check
  kind: query
  command: "dp {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
```

## Feedbacks
```yaml
# OK Acknowledgement: [Command2][ ][Set ID][ ][OK][Data][x]
# Error Acknowledgement: [Command2][ ][Set ID][ ][NG][Data][x]
# "x" in source denotes the small letter of the command2; preserved as documented.

- id: power_state
  type: enum
  values: [off, on]
  description: Returned by power query (ka); 0=Off, 1=On

- id: input_source
  type: enum
  values: [av, component1, component2, rgb_dtv, rgb_pc, hdmi_dtv, hdmi_pc]
  description: Returned by input select command (kb); codes 2/4/5/6/7/8/9

- id: aspect_ratio_state
  type: enum
  values: ["4:3", "16:9", horizon, zoom1, zoom2, original, "14:9", full_eu, "1:1_pc"]
  description: Returned by aspect ratio command (kc); codes 1-9

- id: screen_mute_state
  type: enum
  values: [off, on]
  description: Returned by screen mute command (kd)

- id: volume_mute_state
  type: enum
  values: [on, off]
  description: Returned by volume mute command (ke)

- id: volume_value
  type: integer
  range: "0-100"
  description: Returned by volume command (kf); 0=step0, 64=step100

- id: contrast_value
  type: integer
  range: "0-100"
  description: Returned by contrast command (kg)

- id: brightness_value
  type: integer
  range: "0-100"
  description: Returned by brightness command (kh)

- id: color_value
  type: integer
  range: "0-100"
  description: Returned by color command (ki); video only

- id: tint_value
  type: integer
  range: "-50-50"
  description: Returned by tint command (kj); 00H=-50 (Red), 64H=+50 (Green); video only

- id: sharpness_value
  type: integer
  range: "0-100"
  description: Returned by sharpness command (kk); video only

- id: osd_state
  type: enum
  values: [off, on]
  description: Returned by OSD command (kl)

- id: remote_key_lock_state
  type: enum
  values: [off, on]
  description: Returned by remote/key lock command (km)

- id: balance_value
  type: integer
  range: "-50-50"
  description: Returned by balance command (kt); 00H=L50, 64H=R50

- id: color_temperature_state
  type: enum
  values: [normal, cool, warm, user]
  description: Returned by color temperature command (ku); codes 0-3

- id: abnormal_state
  type: enum
  values: [normal, no_signal, off_by_remote, off_by_sleep, off_by_rs232, ac_down, off_by_off_time, off_by_auto_off]
  description: Returned by abnormal state query (kz); codes 0/1/2/3/4/6/8/9 (5/7 unused)

- id: ism_mode_state
  type: enum
  values: [inversion, orbiter, white_wash, normal]
  description: Returned by ISM mode command (jp); codes 1/2/4/8

- id: elapsed_hours
  type: integer
  description: Used hours (hex); returned by elapsed time query (dl)

- id: internal_temperature
  type: integer
  description: 1-byte hex temperature value; returned by temperature value query (dn)

- id: lamp_fault_state
  type: enum
  values: [fault, ok]
  description: Returned by lamp fault check (dp); 0=Fault, 1=OK

- id: ack_status
  type: enum
  values: [ok, ng]
  description: Every command returns OK (success or read data) or NG (error) acknowledgement
```

## Variables
```yaml
# No discrete settable variables outside the parameterized Actions above.
# All numeric settings (volume, balance, contrast, brightness, color, tint, sharpness,
# tile H/V size, tile ID) are exposed as parameterized actions with hex data fields.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications from the device.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures,
# or power-on sequencing requirements.
```

## Notes

- **Protocol mismatch:** The user-supplied hint said "TCP/IP" but the source explicitly defines a UART-based RS-232 link (9600 bps, 8N1, ASCII) and references "RS-232C" multiple times (e.g. "Turn the monitor off by RS-232C function" in the abnormal state codes, and "controlling RS-232C" in the remote/key-lock description). Protocol populated as `serial` per source evidence.
- **Set ID broadcast caveat:** When Set ID = 0, the command broadcasts to all connected displays. Do not check ACK messages in broadcast mode — every display responds simultaneously, so individual ACKs are unreadable.
- **General read pattern:** Most commands accept `FF` as the Data byte to read current status. The vendor manual documents this rule once at the top; only a subset of commands (ka, kz, dl, dn, dp) include explicit read examples in the per-command tables.
- **IR key code table** (referenced by the `key_send` action "m c" command; the full table sits on page A18 of the vendor manual, partially excerpted here):
  - 08=Power On/Off, C4=Power On (discrete), C5=Power Off (discrete), 09=Mute
  - 98=AV, 0B=Input, 0E=Sleep, 43=Menu, 5B=Exit, 6E=PSM, 44=Set
  - 10-19 = number keys 0-9
  - 5A=AV (discrete), BF=Component1 (discrete), D4=Component2 (discrete), D5=RGB PC (discrete), D7=RGB DTV (discrete), C6=HDMI/DVI (discrete)
  - 79=ARC, 76=ARC 4:3 (discrete), 77=ARC 16:9 (discrete), AF=ARC Zoom (discrete), 99=Auto Config (discrete)
  - Source rows 00 (Function="L") and 01 (Function="M") appear truncated in the refined excerpt; treat as UNRESOLVED until cross-referenced against page A18.
- **IR frame format (informational, not an RS-232 command):** 37.917 kHz carrier at 455 kHz; duty ratio 1/3; bit "0" = 0.56 ms/0.56 ms; bit "1" = 1.12 ms/2.24 ms; frame interval 108 ms; lead code, two custom-code bytes, two data-code bytes.
- **Tile mode data format:** `XY` where X = columns, Y = rows. Values 0X or X0 (other than 00) are invalid; the only valid off-state is 00.
- **Abnormal-state code gap:** Codes 5 and 7 are reserved/unused in the documented mapping (0/1/2/3/4/6/8/9 only).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TCP/IP port or endpoint not stated in source (source is RS-232) -->
<!-- UNRESOLVED: complete IR key code list cross-references page A18 of the vendor manual, not fully present in the refined excerpt; the entries 00 ("L") and 01 ("M") appear truncated. -->
```

---

Self-check: protocol = serial (source-stated, not user-hint), no port assumed, baud 9600 stated, status=draft, confidence=low, entity_id present, UNRESOLVED markers in Summary, Safety, Events, Macros, Notes. All 26 source commands enumerated as separate actions; queries separated from setters where source documents both.

## Provenance

```yaml
source_domains:
  - justaddpower.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
retrieved_at: 2026-06-02T02:54:22.782Z
last_checked_at: 2026-06-02T03:24:48.944Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T03:24:48.944Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched literally to source commands with correct shapes; transport parameters verified; spec covers entire command reference. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "TCP/IP port or endpoint not stated in source (source is RS-232)"
- "source does not describe unsolicited notifications from the device."
- "source does not describe multi-step macro sequences."
- "source contains no safety warnings, interlock procedures,"
- "complete IR key code list cross-references page A18 of the vendor manual, not fully present in the refined excerpt; the entries 00 (\"L\") and 01 (\"M\") appear truncated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
