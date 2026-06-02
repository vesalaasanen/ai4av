---
spec_id: admin/lg-electronics-m4210c
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG Electronics M4210C Control Spec"
manufacturer: LG
model_family: M4210C
aliases: []
compatible_with:
  manufacturers:
    - LG
    - "LG Electronics"
  models:
    - M4210C
    - M4210C-BA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - gscs-b2c.lge.com
  - lg.com
source_urls:
  - "https://gscs-b2c.lge.com/open/downloadFile?fileId=KROWM000331602.pdf"
  - https://www.lg.com/ca_en/support/product-support/troubleshoot/help-library/cs-CT20098005-20153058982994/
retrieved_at: 2026-05-04T23:49:31.345Z
last_checked_at: 2026-06-02T17:23:11.355Z
generated_at: 2026-06-02T17:23:11.355Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source uses [x] as ACK terminator without defining the token; likely CR (0x0D) per the transmission spec but unconfirmed"
  - "source treats all adjustable values as discrete command parameters,"
  - "source contains no explicit safety warnings, interlock procedures,"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:11.355Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions matched literally in source command reference; transport parameters verified against communications spec. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG Electronics M4210C Control Spec

## Summary
RS-232C serial control spec for the LG M4210C commercial LCD monitor (42" class, North America). Covers power, input select, picture/sound adjustments, OSD/tile/key lock, ISM, tile mode, fault/usage readouts. 26 command rows documented.

<!-- UNRESOLVED: source uses [x] as ACK terminator without defining the token; likely CR (0x0D) per the transmission spec but unconfirmed -->

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

Connector: D-Sub 9 (RS-232C CONTROL & SERVICE port). Source documents both 7-wire (standard) and 3-wire configurations. Use a straight cable.

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input select command present (AV, Component, RGB, HDMI)
- queryable       # query commands returning state present
- levelable       # volume, contrast, brightness, color, tint, sharpness, balance present
```

## Actions
```yaml
- id: power
  label: Power On/Off
  kind: action
  command: "ka {set_id} {data}\r"
  description: |
    Set power state. Use data=FF to read current power state.
    Set 00H = Power Off, 01H = Power On. ACK returns current state.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast (all products). Range 1-99.
    - name: data
      type: hex
      description: 00H (off), 01H (on), or FFH (read status)

- id: input_select
  label: Input Select
  kind: action
  command: "kb {set_id} {data}\r"
  description: Select main picture input source.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: |
        02H = AV, 04H = Component 1, 05H = Component 2,
        06H = RGB (DTV), 07H = RGB (PC), 08H = HDMI (DTV), 09H = HDMI (PC)

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "kc {set_id} {data}\r"
  description: Set screen aspect ratio.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: |
        01H = Normal 4:3, 02H = Wide 16:9, 03H = Horizon (Spectacle),
        04H = Zoom1, 05H = Zoom2, 06H = Original, 07H = 14:9,
        08H = Full (Europe only), 09H = 1:1 (PC)

- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {set_id} {data}\r"
  description: Mute/unmute the screen (picture on/off).
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H = screen mute off (picture on), 01H = screen mute on (picture off)

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {set_id} {data}\r"
  description: Mute/unmute the volume.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H = volume mute on (volume off), 01H = volume mute off (volume on)

- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}\r"
  description: Set volume level.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H-64H (hexadecimal). Real mapping: 0=Step 0, 0xA=Step 10, 0xF=Step 15, 0x10=Step 16, 0x64=Step 100.

- id: contrast
  label: Contrast
  kind: action
  command: "kg {set_id} {data}\r"
  description: Set picture contrast.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H-64H. Real mapping per source page A7.

- id: brightness
  label: Brightness
  kind: action
  command: "kh {set_id} {data}\r"
  description: Set picture brightness.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H-64H. Real mapping per source page A7.

- id: color
  label: Color
  kind: action
  command: "ki {set_id} {data}\r"
  description: Set picture color saturation (video only).
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H-64H. Real mapping per source page A7.

- id: tint
  label: Tint
  kind: action
  command: "kj {set_id} {data}\r"
  description: Set picture tint (video only).
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H (Red -50) to 64H (Green +50). Real mapping: 0=Step -50, 64=Step 50.

- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {set_id} {data}\r"
  description: Set picture sharpness (video only).
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H-64H. Real mapping per source page A7.

- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {set_id} {data}\r"
  description: Show/hide on-screen display.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H = OSD Off, 01H = OSD On

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  command: "km {set_id} {data}\r"
  description: Lock/unlock remote control and local keys. When on, RS-232C still works.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H = Off, 01H = On

- id: balance
  label: Balance
  kind: action
  command: "kt {set_id} {data}\r"
  description: Set sound balance L50..R50.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H (L50) to 64H (R50).

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "ku {set_id} {data}\r"
  description: Set color temperature preset.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H = Normal, 01H = Cool, 02H = Warm, 03H = User

- id: abnormal_state
  label: Abnormal State (Read)
  kind: query
  command: "kz {set_id} FF\r"
  description: Read power-off reason when in standby.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
  response_values:
    "00": Normal (power on, signal present)
    "01": No signal (power on)
    "02": Turned off by remote control
    "03": Turned off by sleep timer
    "04": Turned off by RS-232C
    "06": AC down
    "08": Turned off by off-time function
    "09": Turned off by auto-off function

- id: ism_mode
  label: ISM Mode
  kind: action
  command: "jp {set_id} {data}\r"
  description: Select afterimage-prevention mode.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 01H = Inversion, 02H = Orbiter, 03H = Orb.+Inv., 04H = White Wash, 08H = Normal

- id: auto_configuration
  label: Auto Configure
  kind: action
  command: "ju {set_id} 01\r"
  description: Auto-adjust picture position and minimize image shaking. Works only in RGB (PC) mode.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast

- id: key
  label: Key (IR Remote Code)
  kind: action
  command: "mc {set_id} {key_code}\r"
  description: Send IR remote key code to the set. Key codes listed in IR Codes section of source (page A18).
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: key_code
      type: hex
      description: IR key code (see IR Codes table in source). Examples: 08H=Power, 09H=Mute, 43H=Menu.

- id: tile_mode
  label: Tile Mode
  kind: action
  command: "dd {set_id} {data}\r"
  description: Configure tile (video wall) mode. Two hex digits encode columns x rows; 0X or X0 invalid except 00.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: |
        00H = tile mode off.
        High nibble = columns (1-4), low nibble = rows (1-4).
        Examples: 12H = 1x2, 13H = 1x3, 14H = 1x4, 44H = 4x4.
        Source data range documented as 00H-44H.

- id: tile_h_size
  label: Tile H Size
  kind: action
  command: "dg {set_id} {data}\r"
  description: Set tile horizontal size.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H-64H.

- id: tile_v_size
  label: Tile V Size
  kind: action
  command: "dh {set_id} {data}\r"
  description: Set tile vertical size.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H-64H.

- id: tile_id_set
  label: Tile ID Set
  kind: action
  command: "di {set_id} {data}\r"
  description: Assign tile ID for tiling function.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
    - name: data
      type: hex
      description: 00H-10H (0-16 decimal).

- id: elapsed_time_return
  label: Elapsed Time Return
  kind: query
  command: "dl {set_id} FF\r"
  description: Read total used hours. Response data is hex hours.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast

- id: temperature_value
  label: Temperature Value
  kind: query
  command: "dn {set_id} FF\r"
  description: Read internal temperature. Response is 1-byte hex.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast

- id: lamp_fault_check
  label: Lamp Fault Check
  kind: query
  command: "dp {set_id} FF\r"
  description: Check lamp fault status.
  params:
    - name: set_id
      type: integer
      description: Set ID 1-99; 0 = broadcast
  response_values:
    "00": Lamp Fault
    "01": Lamp OK
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  source: power command ACK (ka)
- id: input_source
  type: enum
  values: [av, component1, component2, rgb_dtv, rgb_pc, hdmi_dtv, hdmi_pc]
  source: input_select command ACK (kb)
- id: abnormal_state_reason
  type: enum
  values: [normal, no_signal, off_by_remote, off_by_sleep, off_by_rs232, ac_down, off_by_off_timer, off_by_auto_off]
  source: abnormal_state query (kz)
- id: lamp_fault
  type: enum
  values: [fault, ok]
  source: lamp_fault_check query (dp)
- id: elapsed_hours
  type: integer
  unit: hours
  source: elapsed_time_return query (dl)
- id: internal_temperature
  type: integer
  unit: hex_byte
  source: temperature_value query (dn)
```

## Variables
```yaml
# UNRESOLVED: source treats all adjustable values as discrete command parameters,
# not as settable variables with separate read/write. No Variables section populated.
```

## Events
```yaml
[]
```

## Macros
```yaml
[]
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. The "Abnormal state" feedback reports past
# power-off causes but is informational only.
```

## Notes
Command framing: `[Command1][Command2][Space][SetID][Space][Data][Cr]`
- Space = 0x20 ASCII
- Cr = 0x0D ASCII carriage return
- Command1 ∈ {j, k, m, d}
- SetID range 1-99; 0 broadcasts to all products. With broadcast (0), ACK messages from all sets collide and must not be parsed.
- Read status: send data = FF.

ACK framing: `[Command2][Space][SetID][Space][OK][Data][x]`
- Normal ACK returns current state on read, or echoed data on write.
- Error ACK: `[Command2][Space][SetID][Space][NG][Data][x]`
- Token `[x]` in ACK terminator is not explicitly defined in the source; likely a typo for `[Cr]` (0x0D). Treat as UNRESOLVED until confirmed against a real device.

Tile mode data encoding: high nibble = columns (1-4), low nibble = rows (1-4). Values of the form 0X or X0 are invalid except 00 (tile off). Source data range documented as 00H-44H.

Source also contains an IR remote code table (NEC-format, carrier ~38kHz at 455kHz, frame interval Tf=108ms) with discrete codes for power on/off (C4/C5), input selection, ARC modes, and number keys. This spec covers the RS-232C interface only; IR codes are out of scope for Actions but may be sent via the `key` action (m c).

Source: refined excerpt from `lg_electronics_inc_m4210c_north_america.refined.md`, originally ManualsLib manual for LG M4210C, pages 52-58 (RS-232C protocol section) plus IR codes section.
```

Spec ready. 26 actions enumerated (all source rows), transport params from source (9600/8N1), no auth inferred from absence, IR codes referenced but out of scope.

## Provenance

```yaml
source_domains:
  - gscs-b2c.lge.com
  - lg.com
source_urls:
  - "https://gscs-b2c.lge.com/open/downloadFile?fileId=KROWM000331602.pdf"
  - https://www.lg.com/ca_en/support/product-support/troubleshoot/help-library/cs-CT20098005-20153058982994/
retrieved_at: 2026-05-04T23:49:31.345Z
last_checked_at: 2026-06-02T17:23:11.355Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:11.355Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions matched literally in source command reference; transport parameters verified against communications spec. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source uses [x] as ACK terminator without defining the token; likely CR (0x0D) per the transmission spec but unconfirmed"
- "source treats all adjustable values as discrete command parameters,"
- "source contains no explicit safety warnings, interlock procedures,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
