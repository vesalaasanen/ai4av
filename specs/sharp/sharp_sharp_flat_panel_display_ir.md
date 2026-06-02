---
spec_id: admin/sharp-sharp-flat-panel-display
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Flat Panel Display Control Spec"
manufacturer: Sharp
model_family: "Sharp Flat Panel Display"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "Sharp Flat Panel Display"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-04-29T12:34:58.370Z
last_checked_at: 2026-04-23T08:25:58.852Z
generated_at: 2026-04-23T08:25:58.852Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "product model number not stated in source, only \"Sharp Flat Panel Display\""
  - "firmware version compatibility not stated in source"
  - "TV tuner commands (marked *1) apply to US-only models"
  - "flow control not stated in source"
  - "full VCP table not fully extracted; representative entries shown"
  - "no unsolicited notifications documented; monitor only replies"
  - "no explicit multi-step macros documented beyond Save Current Settings"
  - "no safety warnings or interlock procedures in source"
  - "MAC address format not verified against real device"
  - "VLAN/SNMP settings not documented in source"
  - "precise OSD menu timeout values not stated"
  - "TV tuner-specific commands (*1) apply only to US models; not verified"
  - "some VCP codes listed as N/A in OSD table — not fully documented in source"
verification:
  verdict: verified
  checked_at: 2026-04-23T08:25:58.852Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched with literal command mnemonics in source; all transport parameters (port 7142, baud 9600, serial config) verified. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Sharp Flat Panel Display Control Spec

## Summary
Sharp Flat Panel Display LCD monitor supporting both RS-232C and TCP/IP external control. Protocol uses VCP (Variable Control Procedure) and CTL (Control) command sets with ASCII-encoded binary messages over a header-message-checkcode-delimiter frame structure. Both serial (9600bps 8N1) and Ethernet (port 7142) interfaces are documented. 600ms packet interval required between commands.

<!-- UNRESOLVED: product model number not stated in source, only "Sharp Flat Panel Display" -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TV tuner commands (marked *1) apply to US-only models -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated for LAN control
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Evidence: power control (CTL-01D6, CTL-C203-D6), query commands (VCP get/set),
# routing via input select (VCP-00-60), levelable params (brightness, contrast, backlight, volume)
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
# VCP get parameter (read setting)
- id: vcp_get
  label: VCP Get Parameter
  kind: query
  params:
    - name: page
      type: string
      description: OP code page (hex, e.g. "00", "02")
    - name: code
      type: string
      description: OP code (hex, e.g. "10", "60")

# VCP set parameter (write setting)
- id: vcp_set
  label: VCP Set Parameter
  kind: action
  params:
    - name: page
      type: string
      description: OP code page (hex)
    - name: code
      type: string
      description: OP code (hex)
    - name: value
      type: integer
      description: 16-bit value to set

# CTL-0C / CTL-000C: Save Current Settings
- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []

# CTL-07 / CTL-0007: Get Timing Report
- id: get_timing_report
  label: Get Timing Report
  kind: query
  params: []

# CTL-01D6: Power status read
- id: power_status_read
  label: Power Status Read
  kind: query
  params: []

# CTL-C203-D6: Power control
- id: power_control
  label: Power Control
  kind: action
  params:
    - name: power_mode
      type: integer
      description: 1=ON, 2=Stand-by, 3=Do not set, 4=OFF

# CTL-C216: Serial number read
- id: serial_no_read
  label: Serial Number Read
  kind: query
  params: []

# CTL-C217: Model name read
- id: model_name_read
  label: Model Name Read
  kind: query
  params: []

# CTL-C220: MAC address read
- id: mac_address_read
  label: MAC Address Read
  kind: query
  params:
    - name: device
      type: integer
      description: Device selector (00=fixed)

# CTL-C22C: Direct TV channel read
- id: tv_channel_read
  label: Direct TV Channel Read
  kind: query
  params: []

# CTL-C22D: Direct TV channel write
- id: tv_channel_write
  label: Direct TV Channel Write
  kind: action
  params:
    - name: major_high
      type: integer
    - name: major_low
      type: integer
    - name: minor
      type: integer

# CTL-C210: Remote control data code via RS-232C
- id: remote_control_data
  label: Remote Control Data Code
  kind: action
  params:
    - name: data_code_high
      type: integer
      description: Upper byte of RC data code
    - name: data_code_low
      type: integer
      description: Lower byte of RC data code (e.g. 1D=PICTURE, 08=1, 15=UP, 17=VOL+)
    - name: repeat
      type: integer
      description: Repeat count (H/L)

# CTL-CA02: Firmware version read
- id: firmware_version_read
  label: Firmware Version Read
  kind: query
  params:
    - name: firmware_type
      type: integer
      description: 00=FW Revision

# CTL-CA04-03: Input name of designated terminal read
- id: input_name_read
  label: Input Name Read
  kind: query
  params:
    - name: terminal
      type: integer
      description: Input terminal code (01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP)

# CTL-CA04-04: Input name of designated terminal write
- id: input_name_write
  label: Input Name Write
  kind: action
  params:
    - name: terminal
      type: integer
      description: Input terminal code
    - name: name
      type: string
      description: Input name string (max 14 chars)

# CTL-CA04-05: Input name of designated terminal reset
- id: input_name_reset
  label: Input Name Reset
  kind: action
  params:
    - name: terminal
      type: integer
      description: Input terminal code (00=ALL)

# NULL message (returned on error or when monitor is busy)
- id: null_message
  label: NULL Message
  kind: action
  params: []
```

## Feedbacks
```yaml
# VCP get reply - result code + OP code + type + max value + current value
- id: vcp_get_reply
  type: object
  fields:
    - name: result
      type: string
      values: [00, 01]
      description: 00=No Error, 01=Unsupported
    - name: page
      type: string
    - name: code
      type: string
    - name: type
      type: string
      description: 00=Set parameter, 01=Momentary
    - name: max_value
      type: integer
    - name: current_value
      type: integer

# VCP set reply - echoes back result, OP code, type, max, requested value
- id: vcp_set_reply
  type: object
  fields:
    - name: result
      type: string
      values: [00, 01]
    - name: page
      type: string
    - name: code
      type: string
    - name: type
      type: string
    - name: max_value
      type: integer
    - name: requested_value
      type: integer

# Timing report reply
- id: timing_reply
  type: object
  fields:
    - name: command
      type: string
      description: "4E"
    - name: ss
      type: integer
      description: Timing status byte (bit7=sync out of range, bit6=unstable, bit1=h polarity, bit0=v polarity)
    - name: h_freq
      type: integer
      description: Horizontal frequency in 0.01kHz units
    - name: v_freq
      type: integer
      description: Vertical frequency in 0.01Hz units

# Power status reply (CTL-01D6)
- id: power_status_reply
  type: object
  fields:
    - name: result
      type: string
      values: [00, 01]
    - name: power_mode
      type: integer
      values: [1, 2, 3, 4]
      description: 1=ON, 2=Stand-by, 3=Reserved, 4=OFF

# Serial number reply (CTL-C216)
- id: serial_no_reply
  type: string

# Model name reply (CTL-C217)
- id: model_name_reply
  type: string

# MAC address reply (CTL-C220)
- id: mac_address_reply
  type: string

# TV channel reply (CTL-C22C / CTL-C22D)
- id: tv_channel_reply
  type: object
  fields:
    - name: major_high
      type: integer
    - name: major_low
      type: integer
    - name: minor
      type: integer

# Firmware version reply (CTL-CA02)
- id: firmware_version_reply
  type: object
  fields:
    - name: result
      type: string
    - name: firmware_type
      type: string
    - name: version_string
      type: string
      description: Format R_Major.Minor1Minor2Minor3Branch1Branch2 (e.g. R1.02.003AB)

# Input name reply (CTL-CA04-03)
- id: input_name_reply
  type: object
  fields:
    - name: result
      type: string
    - name: terminal
      type: integer
    - name: name
      type: string

# Input name write reply (CTL-CA04-04)
- id: input_name_write_reply
  type: object
  fields:
    - name: result
      type: string
      values: [00, 01]

# Input name reset reply (CTL-CA04-05)
- id: input_name_reset_reply
  type: object
  fields:
    - name: result
      type: string
      values: [00, 01]

# NULL message reply
- id: null_reply
  type: string
  description: Returns "BE" when monitor is busy, unsupported, or BCC error
```

## Variables
```yaml
# VCP read/write parameters documented in OSD table (section 8)
# UNRESOLVED: full VCP table not fully extracted; representative entries shown
# Backlight (VCP-00-10)
- id: backlight
  type: integer
  min: 0
  max: 100
  description: Backlight brightness

# Contrast (VCP-00-12)
- id: contrast
  type: integer
  min: 0
  max: 100

# Brightness (VCP-00-10 - same as backlight for some models)
- id: brightness
  type: integer
  min: 0
  max: 100

# Volume (VCP-00-93 balance, VCP-10-CB audio delay)
- id: volume_balance
  type: integer
  min: 0
  max: 100
  description: Balance (left-to-right)

# Power mode (read via CTL-01D6, set via CTL-C203-D6)
- id: power_mode
  type: enum
  values: [1, 2, 3, 4]
  description: 1=ON, 2=Stand-by, 3=Reserved, 4=OFF
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented; monitor only replies
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented beyond Save Current Settings
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command packet interval must exceed 600ms. LAN connections auto-disconnect after 15 minutes of inactivity — controller must reconnect. Messages use ASCII-encoded hex (byte value 3Ah → '3'+'A'). Check code (BCC) is XOR of all bytes from D1 to D16. Delimiter is CR (0Dh). For VCP get/set operations, a Save Current Settings command must be sent after changes to persist them.

Monitor ID is set via OSD. Broadcast address is '*' (2Ah) for daisy-chain control. All numeric values in VCP replies are 16-bit, MSB-first encoded as ASCII digit pairs.

Input terminal codes: 01=VGA(RGB), 05=AV, 09=Tuner1(TV), 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP(Media Player).

<!-- UNRESOLVED: MAC address format not verified against real device -->
<!-- UNRESOLVED: VLAN/SNMP settings not documented in source -->
<!-- UNRESOLVED: precise OSD menu timeout values not stated -->
<!-- UNRESOLVED: TV tuner-specific commands (*1) apply only to US models; not verified -->
<!-- UNRESOLVED: some VCP codes listed as N/A in OSD table — not fully documented in source -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-04-29T12:34:58.370Z
last_checked_at: 2026-04-23T08:25:58.852Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:25:58.852Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched with literal command mnemonics in source; all transport parameters (port 7142, baud 9600, serial config) verified. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "product model number not stated in source, only \"Sharp Flat Panel Display\""
- "firmware version compatibility not stated in source"
- "TV tuner commands (marked *1) apply to US-only models"
- "flow control not stated in source"
- "full VCP table not fully extracted; representative entries shown"
- "no unsolicited notifications documented; monitor only replies"
- "no explicit multi-step macros documented beyond Save Current Settings"
- "no safety warnings or interlock procedures in source"
- "MAC address format not verified against real device"
- "VLAN/SNMP settings not documented in source"
- "precise OSD menu timeout values not stated"
- "TV tuner-specific commands (*1) apply only to US models; not verified"
- "some VCP codes listed as N/A in OSD table — not fully documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
