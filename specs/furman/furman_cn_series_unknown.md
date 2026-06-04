---
spec_id: admin/furman-cn-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Furman CN-1800S / CN-2400S Control Spec"
manufacturer: Furman
model_family: CN-1800S
aliases: []
compatible_with:
  manufacturers:
    - Furman
  models:
    - CN-1800S
    - CN-2400S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.shopify.com
  - s3-us-west-1.amazonaws.com
  - furmanpower.com
  - manua.ls
source_urls:
  - "https://cdn.shopify.com/s/files/1/0884/1006/3168/files/pdf_CN-1800S-2400S_com-prot.pdf?v=1725473819"
  - https://s3-us-west-1.amazonaws.com/corebrands-resources/products/CN-1800S/pdf_CN-1800S-2400S_com-prot.pdf
  - https://furmanpower.com/pages/product-manuals
  - https://www.manua.ls/furman/smartsequencer-cn-1800s/manual
  - "https://cdn.shopify.com/s/files/1/0884/1006/3168/files/pdf_CN-1800S_manual.pdf?v=1723587519"
retrieved_at: 2026-05-19T04:33:34.064Z
last_checked_at: 2026-06-03T07:03:22.566Z
generated_at: 2026-06-03T07:03:22.566Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "explicit event list not fully enumerated in source."
  - "no safety warnings or interlock procedures in source."
  - "TCP/IP or HTTP interface not documented — only RS-232 described"
  - "firmware version range not stated"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:03:22.566Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All actions and transport parameters verified (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Furman CN-1800S / CN-2400S Control Spec

## Summary
Furman Contractor Series SmartSequencer with RS-232 control. Controls DELAY outlets (3 banks per unit) via sequenced or individual on/off commands. Supports daisy-chaining multiple units. Serial protocol at 19,200 baud, 8N1, no flow control. No authentication required.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # SEQ_ON / SEQ_OFF sequence outlet banks
- routable        # BANK_ON / BANK_OFF control individual banks
- queryable       # ?VOLTAGE, ?CURRENT, ?POWER, ?STATUS, etc.
```

## Actions
```yaml
- id: seq_on
  label: Sequence On
  kind: action
  params:
    - name: sequencer
      type: integer
      description: Sequencer number (0 = Primary, omit for all units)
  command: "!SEQ_ON <sequencer><CR>"

- id: seq_off
  label: Sequence Off
  kind: action
  params:
    - name: sequencer
      type: integer
      description: Sequencer number (0 = Primary, omit for all units)
  command: "!SEQ_OFF <sequencer><CR>"

- id: enumerate
  label: Enumerate
  kind: action
  params: []
  command: "!ENUMERATE<CR>"

- id: bank_on
  label: Bank On
  kind: action
  params:
    - name: sequencer
      type: integer
      description: Sequencer number
    - name: outlet
      type: integer
      description: "Outlet number (1-3)"
  command: "!BANK_ON <sequencer> <outlet><CR>"

- id: bank_off
  label: Bank Off
  kind: action
  params:
    - name: sequencer
      type: integer
      description: Sequencer number
    - name: outlet
      type: integer
      description: "Outlet number (1-3)"
  command: "!BANK_OFF <sequencer> <outlet><CR>"

- id: all_off
  label: All Off
  kind: action
  params:
    - name: sequencer
      type: integer
      description: Sequencer number (omit for Primary only)
  command: "!ALL_OFF <sequencer><CR>"

- id: events_enable
  label: Events Enable
  kind: action
  params:
    - name: sequencer
      type: integer
      description: Sequencer number
  command: "!EVENTS_ENABLE <sequencer><CR>"

- id: events_disable
  label: Events Disable
  kind: action
  params:
    - name: sequencer
      type: integer
      description: Sequencer number
  command: "!EVENTS_DISABLE <sequencer><CR>"

- id: reset
  label: Reset
  kind: action
  params:
    - name: sequencer
      type: integer
      description: Sequencer number
  command: "!RESET <sequencer><CR>"

- id: clear_per
  label: Clear Percent
  kind: action
  params:
    - name: sequencer
      type: integer
      description: Sequencer number
  command: "!CLEAR_PER <sequencer><CR>"
```

## Feedbacks
```yaml
- id: seq_on_done
  label: Sequence On Done
  type: event
  response: "$SEQ_ON_DONE<CR>"

- id: seq_off_done
  label: Sequence Off Done
  type: event
  response: "$SEQ_OFF_DONE<CR>"

- id: ack_response
  label: Acknowledgement
  type: event
  response: "$ACK <sequencer>,<command><CR>"

- id: seq_change
  label: Sequence Change
  type: event
  description: Issued during reset when Secondary temporarily unreachable
  response: "$ACK <sequencer>,SEQ_CHANGE"
```

## Variables
```yaml
- id: voltage
  label: Voltage
  type: number
  unit: V
  query: "?VOLTAGE <sequencer><CR>"
  response: "$ACK <sequencer> VOLTAGE=<value><EOT>"

- id: current
  label: Current
  type: number
  unit: A
  query: "?CURRENT <sequencer><CR>"
  response: "$ACK <sequencer> CURRENT=<value><EOT>"

- id: power
  label: Power
  type: number
  unit: W
  query: "?POWER <sequencer><CR>"
  response: "$ACK <sequencer> WATTS=<value><EOT>"

- id: power_va
  label: Power VA
  type: number
  unit: VA
  query: "?POWER_VA <sequencer><CR>"
  response: "$ACK <sequencer> VA=<value><EOT>"

- id: power_factor
  label: Power Factor
  type: number
  query: "?PF <sequencer><CR>"
  response: "$ACK <sequencer> PF=<value><EOT>"

- id: device_id
  label: Device ID
  type: string
  query: "?ID <sequencer><CR>"
  response: "$ACK <sequencer> ID FURMAN -> Brand <brand> CN-<model> -> Model <serial> -> Serial number <firmware> -> Firmware revision <EOT>"

- id: settings
  label: Settings
  type: object
  query: "?SETTINGS <sequencer><CR>"
  response: "$ACK <sequencer> SETTINGS POT ADJ=<value> -> POT Setting DIP MAX DELAY=<value> -> DIP 1-3 setting TOTAL DELAY=<value> -> Total delay setting DIP MODE=<value> -> DIP 7 Position DIP SEQ=<value> -> DIP 8 Position DIP ALARM=<value> -> State of Force Off pins DIP EVS=<value> -> DIP 9 Position KEY=<value> -> Key Switch position <EOT>"

- id: status
  label: Status
  type: object
  query: "?STATUS <sequencer><CR>"
  response: "$ACK <sequencer> STATUS SEQ=<value>,<value> -> Sequencer position PROTECT=<value> -> State of protection EVS=<value> -> State of EVS SMP RLY=<value> -> State of SMP relay ALARM=<value> -> State of Force Off input BANK1=<value> -> State of DELAY 1 Output BANK2=<value> -> State of DELAY 2 Output BANK3=<value> -> State of DELAY 3 Output REMOTE=<value> -> State of Legacy remote input PUSHBUTTON=<value> -> State of START SEQUENCE button SECLINK=<value> -> Connection state of Secondary Smartlink UART0 PER=<value> -> % of Primary missed messages UART1 PER=<value> -> % of Secondary missed messages <EOT>"

- id: bank_status
  label: Bank Status
  type: object
  query: "?BANK_STAT <sequencer><CR>"
  response: "$ACK <sequencer> BANK_STAT BANK1=<value> -> State of DELAY 1 output BANK2=<value> -> State of DELAY 2 output BANK3=<value> -> State of DELAY 3 output <EOT>"

- id: rollcall
  label: Rollcall
  type: array
  query: "?ROLLCALL<CR>"
  response: "$ACK <n>,<model> -> unit <n> $ACK <n>,CN-<model>,LAST -> last unit <EOT>"
```

## Events
```yaml
# Events are emitted when EVENTS_ENABLE has been sent.
# Event strings start with asterisk (*) per section 1.3.4.
# UNRESOLVED: explicit event list not fully enumerated in source.
# Only SEQ_CHANGE referenced explicitly (section 3.8).
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes
- Message format: ASCII strings terminated with <CR> (0x0D). Incoming also accepts NUL or <LF>.
- Receiver buffer limit: 32 characters. Message timeout: 500ms.
- Primary Sequencer requires DIP switch #8 ON and key switch in REMOTE position for serial communication.
- Multiple sequencers can be daisy-chained via SmartLink.
- All units in a chain respond to SEQ_ON/SEQ_OFF without a sequencer argument.
- ?ID response format includes Brand, Model, Serial number, and Firmware revision as key-value pairs.
<!-- UNRESOLVED: TCP/IP or HTTP interface not documented — only RS-232 described -->
<!-- UNRESOLVED: firmware version range not stated -->

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
  - s3-us-west-1.amazonaws.com
  - furmanpower.com
  - manua.ls
source_urls:
  - "https://cdn.shopify.com/s/files/1/0884/1006/3168/files/pdf_CN-1800S-2400S_com-prot.pdf?v=1725473819"
  - https://s3-us-west-1.amazonaws.com/corebrands-resources/products/CN-1800S/pdf_CN-1800S-2400S_com-prot.pdf
  - https://furmanpower.com/pages/product-manuals
  - https://www.manua.ls/furman/smartsequencer-cn-1800s/manual
  - "https://cdn.shopify.com/s/files/1/0884/1006/3168/files/pdf_CN-1800S_manual.pdf?v=1723587519"
retrieved_at: 2026-05-19T04:33:34.064Z
last_checked_at: 2026-06-03T07:03:22.566Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:03:22.566Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All actions and transport parameters verified (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "explicit event list not fully enumerated in source."
- "no safety warnings or interlock procedures in source."
- "TCP/IP or HTTP interface not documented — only RS-232 described"
- "firmware version range not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
