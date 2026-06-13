---
spec_id: admin/rotel-rdd-1580
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RDD-1580 Control Spec"
manufacturer: Rotel
model_family: RDD-1580
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RDD-1580
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RDD1580%20Protocol.pdf"
retrieved_at: 2026-05-22T14:20:41.264Z
last_checked_at: 2026-06-12T19:35:21.495Z
generated_at: 2026-06-12T19:35:21.495Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no standalone settable parameters apart from discrete actions"
  - "no unsolicited event notifications described in source"
  - "no multi-step macros described in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware compatibility range not stated"
  - "binary command encoding not used — ASCII only"
  - "transport port not applicable (serial-only device)"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:35:21.495Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched verbatim in source control command list; transport parameters verified in connection settings table. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Rotel RDD-1580 Control Spec

## Summary
RDD-1580 network player. ASCII RS-232 protocol. No hardware flow control. Commands terminated by `!`. Responses terminated by `!` or variable-length byte count. All commands uppercase, no spaces.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: N
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # power_on/off/toggle present
- routable   # source selection commands present
- queryable  # feedback request commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  command: power_on!
  response: power=on!

- id: power_off
  label: Power Off
  kind: action
  params: []
  command: power_off!
  response: power=standby!

- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
  command: power_toggle!
  response: power=on/standby!

- id: select_coax1
  label: Source Coax 1
  kind: action
  params: []
  command: coax1!
  response: source=coax1!

- id: select_coax2
  label: Source Coax 2
  kind: action
  params: []
  command: coax2!
  response: source=coax2!

- id: select_opt1
  label: Source Optical 1
  kind: action
  params: []
  command: opt1!
  response: source=opt1!

- id: select_opt2
  label: Source Optical 2
  kind: action
  params: []
  command: opt2!
  response: source=opt2!

- id: select_usb
  label: Source Front USB
  kind: action
  params: []
  command: usb!
  response: source=usb!

- id: select_pc_usb
  label: Source PC-USB
  kind: action
  params: []
  command: pc_usb!
  response: source=pc_usb!

- id: play
  label: Play
  kind: action
  params: []
  command: play!
  response: play_status=play!

- id: pause
  label: Pause
  kind: action
  params: []
  command: pause!
  response: n/a

- id: track_fwd
  label: Track Forward / Tune Up
  kind: action
  params: []
  command: track_fwd!
  response: n/a

- id: track_back
  label: Track Backward / Tune Down
  kind: action
  params: []
  command: track_back!
  response: n/a

- id: random_toggle
  label: Random Play Mode Toggle
  kind: action
  params: []
  command: random!
  response: n/a

- id: repeat_toggle
  label: Repeat Play Mode Toggle
  kind: action
  params: []
  command: repeat!
  response: n/a

- id: pcusb_class_1
  label: Set PC-USB Audio Class 1.0
  kind: action
  params: []
  command: pcusb_class_1!
  response: pcusb_class=1!

- id: pcusb_class_2
  label: Set PC-USB Audio Class 2.0
  kind: action
  params: []
  command: pcusb_class_2!
  response: pcusb_class=2!
```

## Feedbacks
```yaml
- id: product_type
  label: Product Type
  type: string
  command: get_product_type!
  response_pattern: "product_type=##,text"
  example: "product_type=08,RDD-1580"

- id: product_version
  label: Main CPU Software Version
  type: string
  command: get_product_version!
  response_pattern: "product_version=##,text"
  example: "product_version=06,V1.1.4"

- id: tc_version
  label: Front USB Software Version
  type: string
  command: get_tc_version!
  response_pattern: "tc_version=##,text"
  example: "product_version=06,V500BT"  # note: source document has typo, says product_version instead of tc_version

- id: current_power
  label: Power Status
  type: enum
  values: [on, standby]
  command: get_current_power!
  response_pattern: "power=on!/power=standby!"

- id: current_source
  label: Current Source
  type: enum
  values: [coax1, coax2, opt1, opt2, usb, pc_usb]
  command: get_current_source!
  response_pattern: "source=coax1!/source=coax2!/source=opt1!/source=opt2!/source=usb!/source=pc_usb!"

- id: pcusb_class
  label: PC-USB Audio Class
  type: enum
  values: [1, 2]
  command: get_pcusb_class!
  response_pattern: "pcusb_class=1!/pcusb_class=2!"

- id: current_freq
  label: Digital Input Frequency
  type: enum
  values: [off, 32, 44.1, 48, 88.2, 96, 176.4, 192]
  unit: kHz
  command: get_current_freq!
  response_pattern: "freq=off!/freq=32!/freq=44.1!/freq=48!/freq=88.2!/freq=96!/freq=176.4!/freq=192!"

- id: play_status
  label: Play Status (Front USB only)
  type: enum
  values: [play, stop, pause]
  command: get_play_status!
  response_pattern: "play_status=play!/play_status=stop!/play_status=pause!"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters apart from discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Commands must not include spaces or trailing CR/LF — only `!` terminator
- Variable-length responses use byte-count prefix (2-digit length + `,` + text); may contain `!` character — parsing must handle this
- RS-232 hardware does not support flow control; packet loss possible under high traffic
- Source doc v1.00 dated December 26, 2013
<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: binary command encoding not used — ASCII only -->
<!-- UNRESOLVED: transport port not applicable (serial-only device) -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RDD1580%20Protocol.pdf"
retrieved_at: 2026-05-22T14:20:41.264Z
last_checked_at: 2026-06-12T19:35:21.495Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:35:21.495Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched verbatim in source control command list; transport parameters verified in connection settings table. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no standalone settable parameters apart from discrete actions"
- "no unsolicited event notifications described in source"
- "no multi-step macros described in source"
- "no safety warnings or interlock procedures in source"
- "firmware compatibility range not stated"
- "binary command encoding not used — ASCII only"
- "transport port not applicable (serial-only device)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
