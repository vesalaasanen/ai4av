---
spec_id: admin/sharp-lcc6500-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCC6500 Series Control Spec"
manufacturer: Sharp
model_family: "LCC6500 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LCC6500 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.sharpnecdisplays.us
  - sharp-displays.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://assets.sharpnecdisplays.us/documents/usermanuals/4tb-series-operation-manual.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN_B501_B401_Operation_Manual.pdf
retrieved_at: 2026-04-30T10:43:39.739Z
last_checked_at: 2026-05-31T21:05:29.255Z
generated_at: 2026-05-31T21:05:29.255Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T21:05:29.255Z
  matched_actions: 16
  action_count: 16
  confidence: high
  summary: "All 16 spec actions map one-to-one to documented CTL and VCP message-type operations in the source; transport values confirmed verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sharp LCC6500 Series Control Spec

## Summary
Sharp LCC6500 Series LCD monitor controlled via RS-232C and TCP/IP. Protocol uses a binary-encoded ASCII message format with Header, Message, Check Code (BCC), and Delimiter structure. Supports VCP-style get/set operations and CTL command messages.

<!-- UNRESOLVED: LAN port stated as 7142; RS-232C port not stated (uses standard D-Sub 9-pin) -->

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
  flow_control: null
addressing:
  port: 7142
auth:
  type: none
```

## Traits
```yaml
- powerable
- queryable
- levelable
- routable
```

## Actions
```yaml
- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []

- id: get_timing_report
  label: Get Timing Report
  kind: action
  params: []

- id: power_status_read
  label: Power Status Read
  kind: action
  params: []

- id: power_control
  label: Power Control
  kind: action
  params:
    - name: state
      type: integer
      description: Power state (on/off)

- id: serial_no_read
  label: Serial Number Read
  kind: action
  params: []

- id: model_name_read
  label: Model Name Read
  kind: action
  params: []

- id: mac_address_read
  label: MAC Address Read
  kind: action
  params: []

- id: tv_channel_read
  label: Direct TV Channel Read
  kind: action
  params: []

- id: tv_channel_write
  label: Direct TV Channel Write
  kind: action
  params:
    - name: channel
      type: integer

- id: remote_control_data
  label: Remote Control Data Code
  kind: action
  params:
    - name: data_code
      type: integer

- id: firmware_version_read
  label: Firmware Version Read
  kind: action
  params: []

- id: input_name_read
  label: Input Name Read
  kind: action
  params:
    - name: terminal
      type: integer

- id: input_name_write
  label: Input Name Write
  kind: action
  params:
    - name: terminal
      type: integer
    - name: name
      type: string

- id: input_name_reset
  label: Input Name Reset
  kind: action
  params:
    - name: terminal
      type: integer

- id: get_parameter
  label: Get Parameter (VCP)
  kind: query
  params:
    - name: op_code_page
      type: integer
    - name: op_code
      type: integer

- id: set_parameter
  label: Set Parameter (VCP)
  kind: action
  params:
    - name: op_code_page
      type: integer
    - name: op_code
      type: integer
    - name: value
      type: integer
```

## Feedbacks
```yaml
- id: get_parameter_reply
  type: object
  properties:
    result: enum[no_error, unsupported]
    op_code_page: integer
    op_code: integer
    type: enum[set_parameter, momentary]
    max_value: integer
    current_value: integer

- id: set_parameter_reply
  type: object
  properties:
    result: enum[no_error, unsupported]
    op_code_page: integer
    op_code: integer
    type: enum[set_parameter, momentary]
    max_value: integer
    requested_value: integer

- id: command_reply
  type: object
  properties:
    result: enum[no_error, unsupported]
    data: string
```

## Variables
```yaml
- id: backlight
  label: Backlight
  type: integer
  range: [0, 100]
  access: read_write

- id: temperature_sensor
  label: Temperature Sensor
  type: integer
  access: read
```

## Events
```yaml
- id: null_message
  label: NULL Message
  description: Returned on timeout error, unsupported message, BCC error, or when monitor is busy
```

## Macros
```yaml
# No explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Communication packet interval must exceed 600msec. Monitor disconnects TCP connection after 15 minutes of inactivity. Command format: SOH + Reserved + Destination + Source + MessageType + MessageLength + STX + Data + ETX + BCC + CR. Destination address mapping uses Monitor ID table (1=A, 2=B, ..., 26=Z, then hex). Group broadcast uses '*' (2Ah).

<!-- UNRESOLVED: specific VCP opcode table not included in source (referenced as chapter 8) -->
<!-- UNRESOLVED: detailed CTL command parameter structures not fully specified in excerpt -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/current/power specifications not stated -->
<!-- UNRESOLVED: error recovery sequences not documented -->

## Provenance

```yaml
source_domains:
  - assets.sharpnecdisplays.us
  - sharp-displays.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://assets.sharpnecdisplays.us/documents/usermanuals/4tb-series-operation-manual.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN_B501_B401_Operation_Manual.pdf
retrieved_at: 2026-04-30T10:43:39.739Z
last_checked_at: 2026-05-31T21:05:29.255Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:05:29.255Z
matched_actions: 16
action_count: 16
confidence: high
summary: "All 16 spec actions map one-to-one to documented CTL and VCP message-type operations in the source; transport values confirmed verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
