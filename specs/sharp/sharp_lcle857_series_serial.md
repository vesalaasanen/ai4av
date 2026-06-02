---
spec_id: admin/sharp-lcle857-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCLE857 Series Control Spec"
manufacturer: Sharp
model_family: "LCLE857 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LCLE857 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-26T01:33:31.512Z
last_checked_at: 2026-05-31T21:11:57.359Z
generated_at: 2026-05-31T21:11:57.359Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "This doc also describes LAN control but TCP port only — no auth scheme stated for either transport."
  - "RS-232C port not stated, only baud given"
  - "chapter 8 OSD table not included in source excerpt"
  - "No unsolicited event descriptions found in source"
  - "no safety warnings, interlock procedures, or power sequencing stated"
  - "chapter 8 OSD menu and contrast table for each command not included in source excerpt. UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: RS-232C port number not stated (only baud rate). UNRESOLVED: whether auth is required for LAN — no procedure described but port 7142 is exposed."
verification:
  verdict: verified
  checked_at: 2026-05-31T21:11:57.359Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "All 16 spec action units map directly to source CTL commands and VCP get/set operations; transport values (9600bps 8N1, port 7142) confirmed verbatim; source command catalogue is essentially fully represented by spec. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sharp LCLE857 Series Control Spec

## Summary
Sharp LCLE857 Series LCD monitor controlled via RS-232C (9600bps, 8-N-1 ASCII) and TCP/IP (port 7142). Protocol supports VCP-style get/set operations and CTL commands for power, timing, and configuration. Two transport layers documented.

<!-- UNRESOLVED: This doc also describes LAN control but TCP port only — no auth scheme stated for either transport. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: 9-pin D-Sub
  cable: cross/null-modem
addressing:
  port: 7142  # LAN port - UNRESOLVED: RS-232C port not stated, only baud given
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # CTL-C203-D6 power on/off; CTL-01D6 power status read
- queryable   # Get parameter (VCP), CTL-01D6, CTL-C216, CTL-C217
- levelable   # Backlight example (OP code 10h page 0), volume, contrast
- routable    # Input selection commands referenced in OSD menu table
```

## Actions
```yaml
- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []
  description: Store current adjusted values to non-volatile memory
  source: CTL-0C (30h 43h)

- id: power_control
  label: Power Control
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Power Off, 1=Power On
  source: CTL-C203-D6

- id: get_power_status
  label: Get Power Status
  kind: query
  params: []
  source: CTL-01D6

- id: get_timing_report
  label: Get Timing Report
  kind: query
  params: []
  description: Returns horizontal/vertical sync frequency and polarity
  source: CTL-07

- id: get_serial_number
  label: Get Serial Number
  kind: query
  params: []
  source: CTL-C216

- id: get_model_name
  label: Get Model Name
  kind: query
  params: []
  source: CTL-C217

- id: get_mac_address
  label: Get MAC Address
  kind: query
  params: []
  source: CTL-C220

- id: get_firmware_version
  label: Get Firmware Version
  kind: query
  params: []
  source: CTL-CA02

- id: get_input_name
  label: Get Input Name
  kind: query
  params:
    - name: terminal
      type: integer
      description: Terminal number
  source: CTL-CA04-03

- id: set_input_name
  label: Set Input Name
  kind: action
  params:
    - name: terminal
      type: integer
      description: Terminal number
    - name: name
      type: string
      description: Input name string
  source: CTL-CA04-04

- id: reset_input_name
  label: Reset Input Name
  kind: action
  params:
    - name: terminal
      type: integer
      description: Terminal number
  source: CTL-CA04-05

- id: send_remote_control_code
  label: Send Remote Control Data Code
  kind: action
  params:
    - name: code
      type: string
      description: IR code data
  source: CTL-C210

- id: read_tv_channel
  label: Read TV Channel
  kind: query
  params: []
  source: CTL-C22C

- id: write_tv_channel
  label: Write TV Channel
  kind: action
  params:
    - name: channel
      type: integer
  source: CTL-C22D

- id: set_parameter
  label: Set VCP Parameter
  kind: action
  params:
    - name: op_page
      type: integer
      description: Operation code page (hex)
    - name: op_code
      type: integer
      description: Operation code (hex)
    - name: value
      type: integer
      description: 16-bit value to set
  description: Generic VCP set - OP codes defined in chapter 8 OSD menu table

- id: get_parameter
  label: Get VCP Parameter
  kind: query
  params:
    - name: op_page
      type: integer
      description: Operation code page (hex)
    - name: op_code
      type: integer
      description: Operation code (hex)
  description: Generic VCP get - OP codes defined in chapter 8 OSD menu table
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [off, on]
  description: Power state from CTL-01D6 reply

- id: timing_report
  type: object
  properties:
    - name: h_freq
      type: integer
      description: Horizontal frequency in 0.01kHz units
    - name: v_freq
      type: integer
      description: Vertical frequency in 0.01Hz units
    - name: h_polarity
      type: boolean
      description: true=positive, false=negative
    - name: v_polarity
      type: boolean
      description: true=positive, false=negative
    - name: status
      type: object
      description: Bitfield - sync out of range, unstable count

- id: temperature_sensor
  type: object
  properties:
    - name: sensor
      type: integer
      description: Sensor number (1-based)
    - name: celsius
      type: number
      description: Temperature in Celsius (2's complement readout)
  description: From OP code 78h/79h page 2 - max 3 sensors

- id: result_code
  type: enum
  values: [no_error, unsupported_operation]
  description: VCP/CTL reply result - 00h=no error, 01h=unsupported

- id: null_message
  type: string
  description: Monitor returns NULL (BEh) on timeout, BCC error, or when busy executing power-on/off, auto setup, input change
```

## Variables
```yaml
# VCP variables - populated from backlight example (OP code 10h page 0)
# Full table in chapter 8 OSD menu - not reproduced here
# UNRESOLVED: chapter 8 OSD table not included in source excerpt
```

## Events
```yaml
# UNRESOLVED: No unsolicited event descriptions found in source
# Monitor sends NULL (BE) when busy or on error - could be treated as event
```

## Macros
```yaml
# No explicit multi-step macros in source
# Sequence in 6.1 shows: Get Param → Set Param → Set Param Reply → Save Settings
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait >600ms between packets"
    source: "sections 3.1.1 and 3.2.1"
# UNRESOLVED: no safety warnings, interlock procedures, or power sequencing stated
```

## Notes
Command packet: SOH(1) + Reserved(1) + Dest(1) + Source(1) + MsgType(1) + MsgLen(2) + STX + Message + ETX + BCC + CR(0Dh). BCC = XOR from D1 to D16. Controller sends '0' as source ID; monitor echoes its Monitor ID as source in replies. Monitor disconnects TCP after 15min idle.

Backlight example: OP code page=00h, code=10h, range 0–100 (0064h), stored value 50 (0032h).

<!-- UNRESOLVED: chapter 8 OSD menu and contrast table for each command not included in source excerpt. UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: RS-232C port number not stated (only baud rate). UNRESOLVED: whether auth is required for LAN — no procedure described but port 7142 is exposed. -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-26T01:33:31.512Z
last_checked_at: 2026-05-31T21:11:57.359Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:11:57.359Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "All 16 spec action units map directly to source CTL commands and VCP get/set operations; transport values (9600bps 8N1, port 7142) confirmed verbatim; source command catalogue is essentially fully represented by spec. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "This doc also describes LAN control but TCP port only — no auth scheme stated for either transport."
- "RS-232C port not stated, only baud given"
- "chapter 8 OSD table not included in source excerpt"
- "No unsolicited event descriptions found in source"
- "no safety warnings, interlock procedures, or power sequencing stated"
- "chapter 8 OSD menu and contrast table for each command not included in source excerpt. UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: RS-232C port number not stated (only baud rate). UNRESOLVED: whether auth is required for LAN — no procedure described but port 7142 is exposed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
