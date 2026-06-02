---
spec_id: admin/sharp-lce67-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCE67 Series Control Spec"
manufacturer: Sharp
model_family: "LCE67 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LCE67 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-26T01:13:02.113Z
last_checked_at: 2026-05-31T21:08:19.382Z
generated_at: 2026-05-31T21:08:19.382Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - VCP-02-1A
  - VCP-02-70
  - VCP-02-E3
  - VCP-11-4E
  - VCP-00-0C
  - VCP-00-16
  - VCP-00-18
  - VCP-00-1A
  - VCP-02-20
  - VCP-00-12
  - VCP-00-92
  - VCP-00-87
  - "full VCP code table not included in source excerpt; actions list incomplete"
  - "full VCP code table not provided; many opcodes not documented in excerpt"
  - "source defines VCP codes but full variable table not included in excerpt"
  - "no unsolicited event messages described in source"
  - "no multi-step macros explicitly described in source"
  - "no safety warnings or interlock procedures explicitly stated in source"
  - "full VCP code table (chapter 8) not included in source excerpt"
  - "firmware compatibility range not stated"
  - "voltage/power specs not in source"
  - "error recovery sequences not documented"
verification:
  verdict: verified
  checked_at: 2026-05-31T21:08:19.382Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions (10 VCP page 00/02 + 8 CTL) map exactly to source commands; transport baud 9600, port 7142 confirmed verbatim; source contains ~80+ additional VCP codes not represented in the spec. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sharp LCE67 Series Control Spec

## Summary
Sharp LCE67 Series LCD monitor controlled via RS-232C and LAN. Protocol uses VCP (Variable Content Protocol) and CTL (Control) commands with a 4-part packet structure: Header, Message, Check Code (BCC), Delimiter. Serial: 9600bps 8N1. LAN: TCP port 7142.

<!-- UNRESOLVED: full VCP code table not included in source excerpt; actions list incomplete -->

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
addressing:
  port: 7142  # LAN port; serial has no port field
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred: power status read + power control commands present
- queryable   # inferred: get parameter commands present
- levelable   # inferred: backlight, volume, temperature etc. settable via VCP
- routable    # inferred: input selection commands present
```

## Actions
```yaml
- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []
  description: Stores current adjusted values to non-volatile memory
  protocol: ctl
  opcode: "0C"
  format: STX-"0"-"C"-ETX

- id: get_timing_report
  label: Get Timing Report
  kind: action
  params: []
  description: Requests display of horizontal/vertical sync timing info
  protocol: ctl
  opcode: "07"

- id: get_power_status
  label: Get Power Status
  kind: action
  params: []
  protocol: ctl
  opcode: "01D6"

- id: power_control
  label: Power Control
  kind: action
  params:
    - name: state
      type: integer
      description: 0=off, 1=on
  protocol: ctl
  opcode: "C203-D6"

- id: get_serial_number
  label: Get Serial Number
  kind: action
  params: []
  protocol: ctl
  opcode: "C216"

- id: get_model_name
  label: Get Model Name
  kind: action
  params: []
  protocol: ctl
  opcode: "C217"

- id: get_mac_address
  label: Get MAC Address
  kind: action
  params: []
  protocol: ctl
  opcode: "C220"

- id: get_firmware_version
  label: Get Firmware Version
  kind: action
  params: []
  protocol: ctl
  opcode: "CA02"

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
  protocol: vcp
  page: "00"
  opcode: "10"

- id: get_backlight
  label: Get Backlight
  kind: action
  params: []
  protocol: vcp
  page: "00"
  opcode: "10"

- id: select_temperature_sensor
  label: Select Temperature Sensor
  kind: action
  params:
    - name: sensor
      type: integer
      description: Sensor number (1-based)
  protocol: vcp
  page: "02"
  opcode: "78"

- id: read_temperature
  label: Read Temperature
  kind: action
  params:
    - name: sensor
      type: integer
      description: Sensor number (1-based)
  protocol: vcp
  page: "02"
  opcode: "79"

- id: direct_tv_channel_read
  label: Direct TV Channel Read
  kind: action
  params: []
  protocol: ctl
  opcode: "C22C"

- id: direct_tv_channel_write
  label: Direct TV Channel Write
  kind: action
  params:
    - name: channel
      type: integer
  protocol: ctl
  opcode: "C22D"

- id: send_remote_control_code
  label: Send Remote Control Data Code
  kind: action
  params:
    - name: code
      type: string
      description: IR code hex string
  protocol: ctl
  opcode: "C210"

- id: read_input_name
  label: Read Input Name of Designated Terminal
  kind: action
  params:
    - name: terminal
      type: integer
  protocol: ctl
  opcode: "CA04-03"

- id: write_input_name
  label: Write Input Name of Designated Terminal
  kind: action
  params:
    - name: terminal
      type: integer
    - name: name
      type: string
  protocol: ctl
  opcode: "CA04-04"

- id: reset_input_name
  label: Reset Input Name of Designated Terminal
  kind: action
  params:
    - name: terminal
      type: integer
  protocol: ctl
  opcode: "CA04-05"

# UNRESOLVED: full VCP code table not provided; many opcodes not documented in excerpt
```

## Feedbacks
```yaml
- id: power_status_reply
  label: Power Status Reply
  kind: feedback
  params:
    - name: state
      type: enum
      values: [on, off, standby]

- id: serial_number_reply
  label: Serial Number Reply
  type: string

- id: model_name_reply
  label: Model Name Reply
  type: string

- id: mac_address_reply
  label: MAC Address Reply
  type: string

- id: firmware_version_reply
  label: Firmware Version Reply
  type: string

- id: timing_report_reply
  label: Timing Report Reply
  kind: feedback
  params:
    - name: status
      type: integer
      description: Bitfield - bit7=sync out of range, bit6=unstable, bit1=h polarity, bit0=v polarity
    - name: h_freq
      type: integer
      description: Horizontal frequency in 0.01kHz units
    - name: v_freq
      type: integer
      description: Vertical frequency in 0.01Hz units

- id: temperature_reply
  label: Temperature Reply
  kind: feedback
  params:
    - name: value
      type: integer
      description: 2's complement; 0032h = +25°C

- id: parameter_reply
  label: VCP Parameter Reply
  kind: feedback
  params:
    - name: result
      type: enum
      values: [no_error, unsupported]
    - name: opcode_page
      type: string
    - name: opcode
      type: string
    - name: type
      type: enum
      values: [set_parameter, momentary]
    - name: max_value
      type: integer
    - name: current_value
      type: integer

- id: set_parameter_reply
  label: Set Parameter Reply
  kind: feedback
  params:
    - name: result
      type: enum
      values: [no_error, unsupported]
    - name: opcode_page
      type: string
    - name: opcode
      type: string
    - name: type
      type: enum
      values: [set_parameter, momentary]
    - name: max_value
      type: integer
    - name: requested_value
      type: integer

- id: null_message
  label: NULL Message
  kind: feedback
  description: Returned on timeout, unsupported message, BCC error, or when monitor is busy
```

## Variables
```yaml
# UNRESOLVED: source defines VCP codes but full variable table not included in excerpt
# Backlight (page=00, code=10): 0-100
# Temperature sensors (page=02, codes 78/79): read/write sensor selection + reading
```

## Events
```yaml
# UNRESOLVED: no unsolicited event messages described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power ON/OFF, Auto Setup, Input, PIP Input, Factory reset - monitor returns NULL message during execution; wait before sending next command"
    note: "600msec minimum packet interval required between commands"
  - description: "Monitor disconnects LAN connection after 15 minutes of inactivity; controller must reconnect"
# UNRESOLVED: no safety warnings or interlock procedures explicitly stated in source
```

## Notes

**Packet structure:** Header (SOH + Dest + Src + Type + Length) + Message (STX + data + ETX) + BCC + CR delimiter.

**BCC calculation:** XOR bytes D1 through D16 (from byte after SOH through ETX).

**Message types:** A=Command, B=Command reply, C=Get parameter, D=Get parameter reply, E=Set parameter, F=Set parameter reply.

**Monitor ID addressing:** ID 1-100 maps to ASCII 'A'-'A4', group ID '1'-'9' maps to '1'-'9', broadcast '*' = 2Ah.

**Timing:** 600msec minimum packet interval. 10 second command timeout. 15 minute LAN connection timeout.

**Response codes:** 00h = No Error, 01h = Unsupported operation.

<!-- UNRESOLVED: full VCP code table (chapter 8) not included in source excerpt -->
<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: voltage/power specs not in source -->
<!-- UNRESOLVED: error recovery sequences not documented -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-26T01:13:02.113Z
last_checked_at: 2026-05-31T21:08:19.382Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:08:19.382Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions (10 VCP page 00/02 + 8 CTL) map exactly to source commands; transport baud 9600, port 7142 confirmed verbatim; source contains ~80+ additional VCP codes not represented in the spec. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- VCP-02-1A
- VCP-02-70
- VCP-02-E3
- VCP-11-4E
- VCP-00-0C
- VCP-00-16
- VCP-00-18
- VCP-00-1A
- VCP-02-20
- VCP-00-12
- VCP-00-92
- VCP-00-87
- "full VCP code table not included in source excerpt; actions list incomplete"
- "full VCP code table not provided; many opcodes not documented in excerpt"
- "source defines VCP codes but full variable table not included in excerpt"
- "no unsolicited event messages described in source"
- "no multi-step macros explicitly described in source"
- "no safety warnings or interlock procedures explicitly stated in source"
- "full VCP code table (chapter 8) not included in source excerpt"
- "firmware compatibility range not stated"
- "voltage/power specs not in source"
- "error recovery sequences not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
