---
spec_id: admin/casio-xj_s_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Casio XJ-S Series Control Spec"
manufacturer: Casio
model_family: "XJ-S Series"
aliases: []
compatible_with:
  manufacturers:
    - Casio
  models:
    - "XJ-S Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.casio.com
  - manualmachine.com
source_urls:
  - https://support.casio.com/pdf/007/YK-5_RS-232C_Control_E.pdf
  - https://manualmachine.com/casio/rs232c/1402409-user-manual/
retrieved_at: 2026-04-30T11:49:52.748Z
last_checked_at: 2026-04-30T15:19:09.033Z
generated_at: 2026-04-30T15:19:09.033Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "which specific XJ-S models support USB/HDMI/wireless inputs not confirmed for all units"
  - "no continuous variable parameters found in source"
  - "no unsolicited event notifications documented"
  - "no multi-step macro sequences documented"
  - "specific XJ-S model variants and their supported inputs/features"
  - "firmware version compatibility not stated"
  - "detailed pinout of YK-5 cable not in this excerpt"
verification:
  verdict: verified
  checked_at: 2026-04-30T15:19:09.033Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions matched verbatim against source command table. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Casio XJ-S Series Control Spec

## Summary
Casio XJ-S Series data projector. RS-232C serial control via YK-5 cable. ASCII command protocol at 19200bps 8N1. Read/write commands for power, input, volume, display settings; read-only lamp time.

<!-- UNRESOLVED: which specific XJ-S models support USB/HDMI/wireless inputs not confirmed for all units -->

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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power
  label: Power On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off, 1 = On
- id: src
  label: Input Switching
  kind: action
  params:
    - name: source
      type: integer
      description: 0=RGB, 1=Component, 2=Video, 5=USB, 6=Auto, 7=HDMI, 8=Wireless
- id: blk
  label: Blank Screen
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off, 1 = On
- id: vol
  label: Volume
  kind: action
  params:
    - name: level
      type: integer
      description: 0 to 50 (range model-dependent)
- id: pst
  label: Color Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Presentation, 1=Graphics, 2=Theater, 3=Standard, 4=Blackboard, 5=Game
- id: arz
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: 0=Normal(RGB/HDMI), 1=16:9, 2=Normal(Video), 3=LetterBox, 4=Full, 5=True, 6=4:3
- id: ozm
  label: Optical Zoom Shift
  kind: action
  params:
    - name: dir
      type: integer
      description: 0=No change, 1=Wide, 2=Tele
- id: ofc
  label: Optical Focus Shift
  kind: action
  params:
    - name: dir
      type: integer
      description: 0=No change, 1=Near, 2=Far
- id: lmp
  label: Get Lamp Time
  kind: query
  params: []
- id: lrt
  label: Lamp Time Reset
  kind: action
  params:
    - name: reset
      type: integer
      description: 0=No reset, 1=Reset (only when lamp time > 2100 hours and power off)
```

## Feedbacks
```yaml
- id: error_response
  label: Error Response
  description: Device returns "?" for unrecognized commands
- id: read_response
  label: Read Response Format
  description: Returns (setting_range,current_value) e.g. (0-50,35)
```

## Variables
```yaml
# UNRESOLVED: no continuous variable parameters found in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Wait for lamp cool-down after power off before powering on again
  - Wait at least 1 minute after power on before turning power off
  - Lamp time reset only when lamp hours exceed 2100 and projector is powered off
```

## Notes
Device returns "?" for unrecognized commands. Commands outside valid range (e.g. VOL beyond max) set parameter to its maximum value. A valid input signal must be present to execute blank screen or aspect ratio commands. Some models lack Lamp Time Reset. Read/write disabled for most functions while projector is off.
<!-- UNRESOLVED: specific XJ-S model variants and their supported inputs/features -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: detailed pinout of YK-5 cable not in this excerpt -->

## Provenance

```yaml
source_domains:
  - support.casio.com
  - manualmachine.com
source_urls:
  - https://support.casio.com/pdf/007/YK-5_RS-232C_Control_E.pdf
  - https://manualmachine.com/casio/rs232c/1402409-user-manual/
retrieved_at: 2026-04-30T11:49:52.748Z
last_checked_at: 2026-04-30T15:19:09.033Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:19:09.033Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions matched verbatim against source command table. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "which specific XJ-S models support USB/HDMI/wireless inputs not confirmed for all units"
- "no continuous variable parameters found in source"
- "no unsolicited event notifications documented"
- "no multi-step macro sequences documented"
- "specific XJ-S model variants and their supported inputs/features"
- "firmware version compatibility not stated"
- "detailed pinout of YK-5 cable not in this excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
