---
spec_id: admin/lg-49uj-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 49UJ Series Control Spec"
manufacturer: LG
model_family: "LG 49UJ Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "LG 49UJ Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T01:17:34.385Z
last_checked_at: 2026-06-02T01:48:23.776Z
generated_at: 2026-06-02T01:48:23.776Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic LG commercial display RS-232 protocol reference, not a 49UJ-specific document. The 49UJ is presumed to implement this protocol, but no explicit confirmation appears in the source."
verification:
  verdict: verified
  checked_at: 2026-06-02T01:48:23.776Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec actions matched to source commands; transport parameters verified verbatim. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 49UJ Series Control Spec

## Summary
RS-232C control protocol for LG commercial displays in the 49UJ series. Source document is the LG commercial display serial protocol reference; the 49UJ series is one product family that uses this protocol. All commands are ASCII over a UART link using a 9600-8-N-1 frame with no flow control.

<!-- UNRESOLVED: source is a generic LG commercial display RS-232 protocol reference, not a 49UJ-specific document. The 49UJ is presumed to implement this protocol, but no explicit confirmation appears in the source. -->

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
- powerable       # inferred from ka (Power) command
- routable        # inferred from kb (Input Select) command
- queryable       # inferred from FF-data read mode described in source
- levelable       # inferred from kf (Volume), kg (Contrast), kh (Brightness), etc.
```

## Actions
```yaml
- id: power_set
  label: Power
  kind: action
  command: "ka {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (0 = broadcast to all displays, 1-99 for specific unit)
    - name: data
      type: integer
      enum: [0, 1]
      description: "00H = Power Off, 01H = Power On"

- id: power_status
  label: Power Status
  kind: query
  command: "ka {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 not allowed for read)

- id: input_select_set
  label: Input Select
  kind: action
  command: "kb {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      enum: [2, 4, 5, 6, 7, 8, 9]
      description: "02H=AV, 04H=Component1, 05H=Component2, 06H=RGB(DTV), 07H=RGB(PC), 08H=HDMI(DTV), 09H=HDMI(PC)"

- id: input_select_status
  label: Input Select Status
  kind: query
  command: "kb {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: aspect_ratio_set
  label: Aspect Ratio
  kind: action
  command: "kc {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      description: "01H=Normal(4:3), 02H=Wide(16:9), 03H=Horizon, 04H=Zoom1, 05H=Zoom2, 06H=Original, 07H=14:9, 08H=Full(Europe), 09H=1:1(PC)"

- id: aspect_ratio_status
  label: Aspect Ratio Status
  kind: query
  command: "kc {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: screen_mute_set
  label: Screen Mute
  kind: action
  command: "kd {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      enum: [0, 1]
      description: "00H=Screen mute off (picture on), 01H=Screen mute on (picture off)"

- id: screen_mute_status
  label: Screen Mute Status
  kind: query
  command: "kd {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: volume_mute_set
  label: Volume Mute
  kind: action
  command: "ke {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      enum: [0, 1]
      description: "00H=Volume Mute On (Volume Off), 01H=Volume Mute Off (Volume On)"

- id: volume_mute_status
  label: Volume Mute Status
  kind: query
  command: "ke {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: volume_control_set
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      min: 0
      max: 100
      description: "00H-64H. Real data mapping: 0=Step 0, A=Step 10, F=Step 15, 10=Step 16, 64=Step 100"

- id: volume_control_status
  label: Volume Control Status
  kind: query
  command: "kf {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: contrast_set
  label: Contrast
  kind: action
  command: "kg {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      min: 0
      max: 100
      description: "00H-64H. Real data mapping as for Volume Control."

- id: contrast_status
  label: Contrast Status
  kind: query
  command: "kg {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: brightness_set
  label: Brightness
  kind: action
  command: "kh {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      min: 0
      max: 100
      description: "00H-64H. Real data mapping as for Volume Control."

- id: brightness_status
  label: Brightness Status
  kind: query
  command: "kh {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: color_set
  label: Color
  kind: action
  command: "ki {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      min: 0
      max: 100
      description: "00H-64H. Video only. Real data mapping as for Volume Control."

- id: color_status
  label: Color Status
  kind: query
  command: "ki {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: tint_set
  label: Tint
  kind: action
  command: "kj {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      min: 0
      max: 100
      description: "00H=Red, 64H=Green. Video only. Real data mapping: 0=Step -50, 64=Step 50."

- id: tint_status
  label: Tint Status
  kind: query
  command: "kj {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: sharpness_set
  label: Sharpness
  kind: action
  command: "kk {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      min: 0
      max: 100
      description: "00H-64H. Video only. Real data mapping as for Volume Control."

- id: sharpness_status
  label: Sharpness Status
  kind: query
  command: "kk {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: osd_select_set
  label: OSD Select
  kind: action
  command: "kl {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      enum: [0, 1]
      description: "00H=OSD Off, 01H=OSD On"

- id: osd_select_status
  label: OSD Select Status
  kind: query
  command: "kl {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: remote_lock_set
  label: Remote Lock / Key Lock
  kind: action
  command: "km {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      enum: [0, 1]
      description: "00H=Off, 01H=On. When controlled via RS-232C, locks the remote control and the local keys."

- id: remote_lock_status
  label: Remote Lock Status
  kind: query
  command: "km {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: balance_set
  label: Balance
  kind: action
  command: "kt {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      min: 0
      max: 100
      description: "00H-64H. Real mapping L50 to R50."

- id: balance_status
  label: Balance Status
  kind: query
  command: "kt {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: color_temperature_set
  label: Color Temperature
  kind: action
  command: "ku {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      enum: [0, 1, 2, 3]
      description: "00H=Normal, 01H=Cool, 02H=Warm, 03H=User"

- id: color_temperature_status
  label: Color Temperature Status
  kind: query
  command: "ku {set_id} FF\r"
  params:
    - name: set_id
      type: integer

- id: abnormal_state
  label: Abnormal State
  kind: query
  command: "kz {set_id} FF\r"
  params:
    - name: set_id
      type: integer
  description: Read power-off status during Stand-by mode. Response data 00H=Normal, 01H=No signal, 02H=Off by remote, 03H=Off by sleep timer, 04H=Off by RS-232C, 06H=AC down, 08H=Off by off-timer, 09H=Off by auto-off.

- id: ism_mode_set
  label: ISM Mode
  kind: action
  command: "jp {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      enum: [1, 2, 4, 8]
      description: "01H=Inversion, 02H=Orbiter, 04H=White Wash, 08H=Normal. Afterimage-prevention function."

- id: auto_configure
  label: Auto Configure
  kind: action
  command: "ju {set_id} 01\r"
  params:
    - name: set_id
      type: integer
  description: Adjust picture position and minimize image shaking automatically. Operates only in RGB(PC) mode. Data is fixed at 01H.

- id: key
  label: Key (IR Remote Code Send)
  kind: action
  command: "mc {set_id} {key_code}\r"
  params:
    - name: set_id
      type: integer
    - name: key_code
      type: string
      description: IR remote key code. See the IR Codes table; source directs operator to "page A18" of the vendor manual for the full list.

- id: tile_mode_set
  label: Tile Mode
  kind: action
  command: "dd {set_id} {data}x"
  params:
    - name: set_id
      type: integer
    - name: data
      type: string
      description: "00H=Tile off, 12H=1x2, 13H=1x3, 14H=1x4, ... 44H=4x4. The data cannot be set to 0X or X0 except 00. Source uses literal 'x' suffix (not Cr) for the 'd' command family."

- id: tile_h_size_set
  label: Tile Horizontal Size
  kind: action
  command: "dg {set_id} {data}x"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      min: 0
      max: 100
      description: "00H-64H."

- id: tile_v_size_set
  label: Tile Vertical Size
  kind: action
  command: "dh {set_id} {data}x"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      min: 0
      max: 100
      description: "00H-64H."

- id: tile_id_set
  label: Tile ID Set
  kind: action
  command: "di {set_id} {data}x"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      min: 0
      max: 16
      description: "00H-10H. Assigns the Tile ID used for the tiling function."

- id: elapsed_time
  label: Elapsed Time Return
  kind: query
  command: "dl {set_id} FFx"
  params:
    - name: set_id
      type: integer
  description: Read used hours. Data always FF on send; response is one byte of used hours in hexadecimal.

- id: temperature_value
  label: Temperature Value
  kind: query
  command: "dn {set_id} FFx"
  params:
    - name: set_id
      type: integer
  description: Read inside temperature. Data always FF on send; response is one byte in hexadecimal.

- id: lamp_fault_check
  label: Lamp Fault Check
  kind: query
  command: "dp {set_id} FFx"
  params:
    - name: set_id
      type: integer
  description: Check lamp fault. Data always FF on send; response: 00H=Lamp Fault, 01H=Lamp OK.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]

- id: input_state
  type: enum
  values: [av, component_1, component_2, rgb_dtv, rgb_pc, hdmi_dtv, hdmi_pc]

- id: aspect_ratio_state
  type: enum
  values: [normal_4_3, wide_16_9, horizon, zoom1, zoom2, original, ratio_14_9, full_europe, one_to_one_pc]

- id: screen_mute_state
  type: enum
  values: [picture_on, picture_off]

- id: volume_mute_state
  type: enum
  values: [mute_on, mute_off]

- id: volume_level
  type: integer
  range: [0, 100]
  description: 0=Step 0, 100=Step 100 (mapped from 00H-64H)

- id: contrast_level
  type: integer
  range: [0, 100]

- id: brightness_level
  type: integer
  range: [0, 100]

- id: color_level
  type: integer
  range: [0, 100]

- id: tint_level
  type: integer
  range: [-50, 50]
  description: 00H=-50 (red), 64H=+50 (green)

- id: sharpness_level
  type: integer
  range: [0, 100]

- id: osd_state
  type: enum
  values: [off, on]

- id: remote_lock_state
  type: enum
  values: [off, on]

- id: balance_level
  type: integer
  range: [-50, 50]
  description: 00H=L50, 64H=R50

- id: color_temperature_state
  type: enum
  values: [normal, cool, warm, user]

- id: abnormal_state_reason
  type: enum
  values: [normal, no_signal, off_by_remote, off_by_sleep_timer, off_by_rs232, ac_down, off_by_off_timer, off_by_auto_off]

- id: elapsed_hours
  type: integer
  description: Used hours, hexadecimal byte returned by the display

- id: internal_temperature
  type: integer
  description: One-byte hexadecimal temperature reading returned by the display

- id: lamp_fault_state
  type: enum
  values: [fault, ok]
```

## Variables
```yaml
# Source describes all settable parameters as discrete command actions above; no
# standalone variable space is exposed in the protocol.
```

## Events
```yaml
# Source describes no unsolicited notifications.
```

## Macros
```yaml
# Source describes no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. The "Abnormal State" feedback (kz) enumerates
# reasons the display may have powered itself off (AC down, off-by-remote, etc.)
# but does not document a recovery procedure.
```

## Notes
All command/response strings use ASCII. The command terminator is carriage return (0x0D) for the k/j/m command families, and a literal `x` character (no Cr) for the d-family commands. Responses always terminate with a literal `x`. The Set ID byte in position 4 selects the target display; Set ID 0 broadcasts to all displays, in which case ACKs are not checked (every display responds).

Read mode for any set/read opcode is invoked by sending the same command with the data byte replaced by `FF`. Some set/read opcodes document this only implicitly (kb-kc-kd-ke-kf-kg-kh-ki-kj-kk-kl-km-kt-ku); only `ka` documents it as a separate "To show the status" command format.

The `m c` Key action accepts an IR remote key code, but the source directs the operator to a manual page (A18) for the full key-code table. Only a partial set of codes appears in the IR Codes table; the spec above documents the action but does not enumerate the key codes.

The d-family command format uses `[Data][x]` rather than `[Data][Cr]`. This is taken verbatim from the source, which consistently uses `x` (not Cr) for the d-family in both command and ACK format strings. Likely a documentation quirk; the spec preserves it as written.

## Provenance

```yaml
source_domains:
  - proaudioinc.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T01:17:34.385Z
last_checked_at: 2026-06-02T01:48:23.776Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T01:48:23.776Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec actions matched to source commands; transport parameters verified verbatim. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic LG commercial display RS-232 protocol reference, not a 49UJ-specific document. The 49UJ is presumed to implement this protocol, but no explicit confirmation appears in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
