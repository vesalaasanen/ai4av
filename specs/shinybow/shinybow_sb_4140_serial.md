---
spec_id: admin/shinybow-sb-4140
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-4140 Control Spec"
manufacturer: Shinybow
model_family: SB-4140
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-4140
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
  - manualslib.com
  - files.avprosupply.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V2.0.pdf
  - "https://www.manualslib.com/manual/936897/Shinybow-Usa-Sb-4140.html?page=8"
  - https://files.avprosupply.com/files/attachments/172/shinybow-sb-4140-manual.pdf
retrieved_at: 2026-05-21T22:00:17.701Z
last_checked_at: 2026-06-10T00:49:53.052Z
generated_at: 2026-06-10T00:49:53.052Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "number of inputs/outputs not explicitly stated; based on 16-memory-address system suggests 8x8"
  - "no unsolicited event documentation found in source"
  - "no explicit multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "input/output port count not explicitly stated"
  - "device model number in responses (SB5688) may indicate a different series ID"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:49:53.052Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions matched source commands; no drift, fabrication, or missing transport details. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Shinybow SB-4140 Control Spec

## Summary
Matrix/routing switcher with RS-232C control. Supports power, lock, input/output routing, memory save/recall, EDID management, volume, balance, and mute. Serial only, 9600 baud, 8N1. Not case sensitive.

<!-- UNRESOLVED: number of inputs/outputs not explicitly stated; based on 16-memory-address system suggests 8x8 -->

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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_status
  label: Check Power Status
  kind: query
  params: []

- id: lock
  label: Lock Panel
  kind: action
  params: []

- id: unlock
  label: Unlock Panel
  kind: action
  params: []

- id: lock_status
  label: Check Lock Status
  kind: query
  params: []

- id: set_output
  label: Set Output Routing
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel number (1-based)
    - name: input
      type: integer
      description: Input channel number (1-based); 0 = OFF

- id: output_status
  label: Check Output Status
  kind: query
  params:
    - name: output
      type: integer
      description: Output channel number

- id: output_all
  label: Set All Outputs to Source
  kind: action
  params:
    - name: source
      type: integer
      description: Source channel number (1-based)

- id: output_all_off
  label: Turn Off All Outputs
  kind: action
  params: []

- id: output_all_status
  label: Check All Outputs Status
  kind: query
  params: []

- id: active_source
  label: Check Active Sources
  kind: query
  params: []

- id: save_memory
  label: Save Configuration to Memory
  kind: action
  params:
    - name: address
      type: integer
      description: Memory address (0-15, mapped to 1-16)

- id: recall_memory
  label: Recall Configuration from Memory
  kind: action
  params:
    - name: address
      type: integer
      description: Memory address (0-15, mapped to 1-16)

- id: recall_memory_status
  label: Check Memory Contents
  kind: query
  params:
    - name: address
      type: integer
      description: Memory address (0-15, mapped to 1-16)

- id: set_edid
  label: Set EDID
  kind: action
  params:
    - name: edid
      type: integer
      description: EDID mode (0-7)
      values:
        - 0: FSS
        - 1: H24-3D
        - 2: H24M-3D
        - 3: H36-3D
        - 4: H36-3D-M
        - 5: DVI-D 1280x1024
        - 6: DVI-D 1920x1200
        - 7: Auto

- id: edid_status
  label: Check EDID Status
  kind: query
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel number
    - name: value
      type: integer
      description: Volume value (0-100)

- id: volume_status
  kind: query
  params:
    - name: output
      type: integer
      description: Output channel number

- id: mute_on
  label: Mute On
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel number

- id: mute_off
  label: Mute Off
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel number

- id: mute_status
  label: Check Mute Status
  kind: query
  params:
    - name: output
      type: integer
      description: Output channel number
- id: set_balance
  label: Set Balance
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel number
    - name: value
      type: integer
      description: Balance value (0-99; 0=100% left, 99=100% right, default 50)

- id: balance_status
  label: Check Balance Status
  kind: query
  params:
    - name: output
      type: integer
      description: Output channel number

- id: volume_increment
  label: Volume Increment
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel number
    - name: value
      type: integer
      description: Number of volume units to add

- id: volume_decrement
  label: Volume Decrement
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel number
    - name: value
      type: integer
      description: Number of volume units to reduce
```

## Feedbacks
```yaml
- id: power_response
  type: string
  values:
    - SB5688 00;
    - SB5688 01;

- id: lock_response
  type: string
  values:
    - Lock 00;
    - Lock 01;

- id: volume_response
  type: string
  pattern: "VOLUME## ###OK;|VOLUME## ###ER;"

- id: mute_response
  type: string
  pattern: "MUTE## ###OK;|MUTE## ###ER;"

- id: balance_response
  type: string
  pattern: "BALANCE## ###OK;|BALANCE## ###ER;"
```

## Variables
```yaml
- id: volume
  type: integer
  range: [0, 100]
  description: Output volume level

- id: balance
  type: integer
  range: [0, 99]
  description: Balance value (0=100% left, 99=100% right, default 50)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event documentation found in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

Command format: `[COMMAND] [DATA];` — space separated, must end with `;`.

EDID changes trigger a soft-reboot; minimum 5 second delay before issuing next command after EDID set.

Response `SB5688 01;` indicates UNKNOWN Command.

ActiveSource returns 16-character bitstring (01=active, 00=inactive) — does not validate signal format.

Memory addresses 0x00-0x0F map to locations 1-16.
<!-- UNRESOLVED: input/output port count not explicitly stated -->
<!-- UNRESOLVED: device model number in responses (SB5688) may indicate a different series ID -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
  - manualslib.com
  - files.avprosupply.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V2.0.pdf
  - "https://www.manualslib.com/manual/936897/Shinybow-Usa-Sb-4140.html?page=8"
  - https://files.avprosupply.com/files/attachments/172/shinybow-sb-4140-manual.pdf
retrieved_at: 2026-05-21T22:00:17.701Z
last_checked_at: 2026-06-10T00:49:53.052Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:49:53.052Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions matched source commands; no drift, fabrication, or missing transport details. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "number of inputs/outputs not explicitly stated; based on 16-memory-address system suggests 8x8"
- "no unsolicited event documentation found in source"
- "no explicit multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "input/output port count not explicitly stated"
- "device model number in responses (SB5688) may indicate a different series ID"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
