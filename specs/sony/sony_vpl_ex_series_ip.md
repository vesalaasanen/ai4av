---
spec_id: admin/sony-vpl-ex-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony VPL-EX Series Control Spec"
manufacturer: Sony
model_family: VPL-DX125
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - VPL-DX125
    - VPL-DX145
    - VPL-DW125
    - VPL-EX221
    - VPL-EX225
    - VPL-EX241
    - VPL-EX245
    - VPL-EX271
    - VPL-EX275
    - VPL-EW225
    - VPL-EW245
    - VPL-EW275
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sony.com
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://www.sony.com/electronics/support/res/manuals/9932/7009303bfef1bcfe3616e9036d29c71a/99325955M.pdf
retrieved_at: 2026-04-29T12:45:50.593Z
last_checked_at: 2026-06-02T07:06:43.915Z
generated_at: 2026-06-02T07:06:43.915Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "USB TYPE A"
  - "RS-232 serial line parameters (baud, parity, etc.) not stated in source. SDCP set/get command field details for REQUEST payload format partially missing."
  - "source states RS-232C is supported but does not give baud/data_bits/parity/stop_bits values in the refined excerpt"
  - "PJLink password procedure mentioned (\"set a password from the Web setting screen\") but password format/length not specified"
  - "source describes SDAP as projector-broadcast advertisement (no controller-to-projector), but unsolicited event triggers not detailed. Section kept for completeness."
  - "source does not document multi-step command sequences explicitly"
  - "source does not contain explicit safety warnings, interlock procedures, or power-on sequencing requirements"
  - "PJLink command list truncated — source states 14 commands supported, refined excerpt enumerates 9 (POWR, POWR?, INPT, INPT?, AVMT, AVMT?, ERST?, LAMP?, INST?) plus 4 info queries (INF1?, INF2?, INFO?, CLSS?) = 13 visible. Missing 1 command. RS-232 serial parameters, SDCP REQUEST command field structure, SDCP checksum formula, PJLink password format/default, and full input source code map per model all unstated."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:43.915Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched literally to source commands; transport parameters (port, COMMUNITY) verified; one alternate (USB TYPE A for DX/DW) not in EX/EW spec. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony VPL-EX Series Control Spec

## Summary
Sony VPL-EX / VPL-DX / VPL-DW / VPL-EW Series projectors. Controllable over RS-232C and Ethernet. Ethernet exposes Sony's SDCP protocol on TCP port 53484, plus PJLink class 1 and SDAP advertisement.

<!-- UNRESOLVED: RS-232 serial line parameters (baud, parity, etc.) not stated in source. SDCP set/get command field details for REQUEST payload format partially missing. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 53484  # SDCP factory-shipments value, per source
serial:
  # UNRESOLVED: source states RS-232C is supported but does not give baud/data_bits/parity/stop_bits values in the refined excerpt
  baud_rate: null  # UNRESOLVED
  data_bits: null  # UNRESOLVED
  parity: null  # UNRESOLVED
  stop_bits: null  # UNRESOLVED
  flow_control: null  # UNRESOLVED
auth:
  type: community  # SDAP/SDCP use 4-char COMMUNITY field, default "SONY" per source
  # UNRESOLVED: PJLink password procedure mentioned ("set a password from the Web setting screen") but password format/length not specified
```

## Traits
```yaml
- powerable       # inferred: POWR power control command present (PJLink)
- routable        # inferred: INPT input switch command present (PJLink); input terminal items (SDCP)
- queryable       # inferred: POWR?, INPT?, AVMT?, ERST?, LAMP?, INST?, INF1?, INF2?, INFO?, CLSS? present (PJLink); GET method on SDCP
- levelable       # inferred: SDCP SET/GET items include ASPECT, picture mode, etc. (level/scalar parameters present)
```

## Actions
```yaml
# PJLink class 1 commands (per source §4-3-3, 14 commands supported - 9 enumerated in refined excerpt)
- id: pjlink_powr
  label: PJLink Power Control
  kind: action
  command: "POWR {value}"  # 0 = off, 1 = on
  params:
    - name: value
      type: integer
      values: [0, 1]
- id: pjlink_powr_query
  label: PJLink Power Status Inquiry
  kind: query
  command: "POWR ?"
  params: []
- id: pjlink_inpt
  label: PJLink Input Switch
  kind: action
  command: "INPT {source}"  # source code depends on model (e.g. 21 = Video)
  params:
    - name: source
      type: integer
      description: PJLink input source code (model-dependent)
- id: pjlink_inpt_query
  label: PJLink Input Switch Inquiry
  kind: query
  command: "INPT ?"
  params: []
- id: pjlink_avmt
  label: PJLink AV Mute
  kind: action
  command: "AVMT {value}"  # 30 = video mute off, 31 = video mute on
  params:
    - name: value
      type: integer
      values: [30, 31]
- id: pjlink_avmt_query
  label: PJLink AV Mute Status Inquiry
  kind: query
  command: "AVMT ?"
  params: []
- id: pjlink_erst_query
  label: PJLink Error Status Inquiry
  kind: query
  command: "ERST ?"
  params: []
- id: pjlink_lamp_query
  label: PJLink Lamp Count / Lamp Time Inquiry
  kind: query
  command: "LAMP ?"
  params: []
- id: pjlink_inst_query
  label: PJLink Input Switch List Inquiry
  kind: query
  command: "INST ?"
  params: []
- id: pjlink_inf1_query
  label: PJLink Manufacturer Name Inquiry
  kind: query
  command: "INF1 ?"
  params: []
- id: pjlink_inf2_query
  label: PJLink Model Name Inquiry
  kind: query
  command: "INF2 ?"
  params: []
- id: pjlink_info_query
  label: PJLink Other Information Inquiry
  kind: query
  command: "INFO ?"
  params: []
- id: pjlink_clss_query
  label: PJLink Class Information Inquiry
  kind: query
  command: "CLSS ?"
  params: []

# SDCP (Sony Simple Display Control Protocol) - SET/GET on ITEM NUMBER
# Simplified Command packet: A9h | ITEM_NUMBER(2) | SET/GET(1: 00h=SET, 01h=GET) | DATA(2) | CHECK_SUM(1) | 9Ah
# Example from source: set picture mode to dynamic
- id: sdcp_set
  label: SDCP Set Item
  kind: action
  command: "A9h {item_hi} {item_lo} 00h {data_hi} {data_lo} {checksum} 9Ah"
  params:
    - name: item
      type: integer
      description: Item number (e.g. 0x0002 = picture mode)
    - name: data
      type: integer
      description: Item-specific data value
    - name: checksum
      type: integer
      description: Computed checksum byte (formula not in source)
- id: sdcp_get
  label: SDCP Get Item
  kind: query
  command: "A9h {item_hi} {item_lo} 01h 0000h {checksum} 9Ah"
  params:
    - name: item
      type: integer
      description: Item number
    - name: checksum
      type: integer
      description: Computed checksum byte

# SDCP system items
- id: sdcp_get_model
  label: SDCP Get Model Name
  kind: query
  command: "A9h 80 01 01h 00 00 {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
- id: sdcp_get_serial
  label: SDCP Get Serial Number
  kind: query
  command: "A9h 80 02 01h 00 00 {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
- id: sdcp_get_location
  label: SDCP Get Installation Location
  kind: query
  command: "A9h 80 03 01h 00 00 {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
- id: sdcp_set_picture_mode
  label: SDCP Set Picture Mode
  kind: action
  command: "A9h 00 02 00h 00 00 {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
- id: sdcp_set_aspect
  label: SDCP Set Aspect (example from source: ZOOM)
  kind: action
  command: "A9h 00 20 00h 00 03 {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
- id: sdcp_set_input_video
  label: SDCP Set Input - VIDEO (EX/EW series)
  kind: action
  command: "A9h 00 00 00h 00 00 {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
- id: sdcp_set_input_svideo
  label: SDCP Set Input - S VIDEO (EX/EW series)
  kind: action
  command: "A9h 00 00 00h 00 01 {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
- id: sdcp_set_input_a
  label: SDCP Set Input - INPUT A
  kind: action
  command: "A9h 00 00 00h 00 02 {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
- id: sdcp_set_input_b
  label: SDCP Set Input - INPUT B
  kind: action
  command: "A9h 00 00 00h 00 03 {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
- id: sdcp_set_input_c
  label: SDCP Set Input - INPUT C (EX/EW series)
  kind: action
  command: "A9h 00 00 00h 00 04 {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
- id: sdcp_set_input_usb_b
  label: SDCP Set Input - USB (TYPE B)
  kind: action
  command: "A9h 00 00 00h 00 05 {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
- id: sdcp_set_input_network
  label: SDCP Set Input - NETWORK
  kind: action
  command: "A9h 00 00 00h 00 06 {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on, cooling]  # PJLink POWR?: 0=standby/power-save, 1=on, 2=cooling
- id: av_mute_state
  type: enum
  values: [video_mute_off, video_mute_on]  # PJLink AVMT?: 30/31
- id: input_source
  type: integer
  description: PJLink INPT response; e.g. 21 = Video (model-dependent)
- id: lamp_status
  type: string
  description: PJLink LAMP? response (lamp hours / count)
- id: error_status
  type: string
  description: PJLink ERST? - 6-digit fan/lamp/temp/cover/filter/other error code
- id: class_info
  type: integer
  values: [1]
  description: PJLink CLSS? returns "1" for class 1
- id: manufacturer_name
  type: string
  values: [SONY, ERR4]
- id: model_name
  type: string
- id: other_info
  type: string
  values: [" ", ERR4]
- id: status_error1
  type: enum
  values: [no_error, lamp_error, fan_error, cover_error, temp_error, d5v_error, power_error, warning_temp, nvm_data_error]
- id: status_power
  type: enum
  values: [standby, start_up]
- id: sdcp_model_name
  type: string
  description: SDCP item 0x8001, 12 chars
- id: sdcp_serial
  type: string
  description: SDCP item 0x8002, 8-digit number
- id: sdcp_location
  type: string
  description: SDCP item 0x8003, 24 chars
```

## Variables
```yaml
# Per-model variable SET/GET items. Lower bytes shown; upper byte 00h for setup items.
- id: input_terminal
  type: enum
  values: [video, s_video, input_a, input_b, input_c, usb_type_b, network]  # EX/EW series
  # DX/DW series omits S VIDEO and INPUT C; adds USB TYPE A
- id: aspect
  type: integer
  description: SDCP item 0x0020, e.g. 0x0003 = ZOOM
- id: picture_mode
  type: integer
  description: SDCP item 0x0002, 0x0000 = Dynamic (per source example)
```

## Events
```yaml
# UNRESOLVED: source describes SDAP as projector-broadcast advertisement (no controller-to-projector), but unsolicited event triggers not detailed. Section kept for completeness.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step command sequences explicitly
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
PJLink and SDCP are independent stacks — source does not state any exclusive relationship; both can be enabled (PJLink set to OFF by default per source; SDCP also OFF by default). COMMUNITY field for SDCP defaults to "SONY" (4 alphanumeric chars, case sensitive, exactly 4 chars required). SDCP checksum formula not stated in source — implementer must derive. PJLink password is configurable via web UI; default and format not stated. RS-232C packet structure documented for VPL-EX/EW only (DX/DW series excluded per source §3 heading). ERST error digit ordering per source: 6th=Fan, 5th=Lamp, 4th=Temp, 3rd=Cover, 2nd=Filter, 1st=Other.

<!-- UNRESOLVED: PJLink command list truncated — source states 14 commands supported, refined excerpt enumerates 9 (POWR, POWR?, INPT, INPT?, AVMT, AVMT?, ERST?, LAMP?, INST?) plus 4 info queries (INF1?, INF2?, INFO?, CLSS?) = 13 visible. Missing 1 command. RS-232 serial parameters, SDCP REQUEST command field structure, SDCP checksum formula, PJLink password format/default, and full input source code map per model all unstated. -->

## Provenance

```yaml
source_domains:
  - sony.com
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://www.sony.com/electronics/support/res/manuals/9932/7009303bfef1bcfe3616e9036d29c71a/99325955M.pdf
retrieved_at: 2026-04-29T12:45:50.593Z
last_checked_at: 2026-06-02T07:06:43.915Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:43.915Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched literally to source commands; transport parameters (port, COMMUNITY) verified; one alternate (USB TYPE A for DX/DW) not in EX/EW spec. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB TYPE A"
- "RS-232 serial line parameters (baud, parity, etc.) not stated in source. SDCP set/get command field details for REQUEST payload format partially missing."
- "source states RS-232C is supported but does not give baud/data_bits/parity/stop_bits values in the refined excerpt"
- "PJLink password procedure mentioned (\"set a password from the Web setting screen\") but password format/length not specified"
- "source describes SDAP as projector-broadcast advertisement (no controller-to-projector), but unsolicited event triggers not detailed. Section kept for completeness."
- "source does not document multi-step command sequences explicitly"
- "source does not contain explicit safety warnings, interlock procedures, or power-on sequencing requirements"
- "PJLink command list truncated — source states 14 commands supported, refined excerpt enumerates 9 (POWR, POWR?, INPT, INPT?, AVMT, AVMT?, ERST?, LAMP?, INST?) plus 4 info queries (INF1?, INF2?, INFO?, CLSS?) = 13 visible. Missing 1 command. RS-232 serial parameters, SDCP REQUEST command field structure, SDCP checksum formula, PJLink password format/default, and full input source code map per model all unstated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
