---
spec_id: admin/qsc-dpm
schema_version: ai4av-public-spec-v1
revision: 1
title: "QSC DPM Control Interface Spec"
manufacturer: QSC
model_family: "DPM 100"
aliases: []
compatible_with:
  manufacturers:
    - QSC
  models:
    - "DPM 100"
    - "DPM 100H"
    - "DPM 300"
    - "DPM 300H"
    - "DCM 100"
    - "DCM 300"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - help.qsys.com
source_urls:
  - https://help.qsys.com/Content/External_Control_APIs/QRC/QRC_Overview.htm
  - https://help.qsys.com/Content/External_Control_APIs/QRC/QRC_Commands.htm
  - https://help.qsys.com/Content/External_Control_APIs/ECP/ECP_Overview.htm
retrieved_at: 2026-04-30T03:11:42.670Z
last_checked_at: 2026-04-27T09:45:16.689Z
generated_at: 2026-04-27T09:45:16.689Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T09:45:16.689Z
  matched_actions: 11
  action_count: 11
  confidence: high
  summary: "All 11 spec actions match source commands one-to-one; transport parameters verified; dpm100 command set fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# QSC DPM Control Interface Spec

## Summary
QSC DPM (Digital Preset Manager) cinema audio processor platform. Supports RS-232, Ethernet (TCP/UDP), SNMP, and contact closure (GPI) control. TCP port 4446, UDP port 4448. Serial default 115200 baud. DCM models support only serial and Ethernet (no GPI).

<!-- UNRESOLVED: GPI configuration parameters not fully detailed in source — only described functionally, no pin assignments or voltage specs given -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 115200  # default; selectable: 57600, 38400, 19200, 9600, 1200, 300
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 4446  # TCP
  udp_port: 4448  # UDP
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # dpm100ampson / dpm100ampsoff
- routable  # preset selection commands
- queryable  # status query commands (version, serial, preset name, mute state, fader level)
- levelable  # dpm100fader with incremental and absolute modes
```

## Actions
```yaml
- id: preset_change
  label: Preset Change
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-32 (1-16 audio, 17-32 control)

- id: preset_name_query
  label: Preset Name Query
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-32

- id: mute
  label: Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 1 = mute on, 0 = mute off

- id: fader_set
  label: Set Master Fader
  kind: action
  params:
    - name: value
      type: number
      description: Volume in dB (-90.0 to 10.0, .1dB increments)

- id: fader_inc
  label: Increment Fader
  kind: action
  params:
    - name: amount
      type: number
      description: Increment amount in dB (use ++ prefix for positive, -- prefix for negative)
    - name: direction
      type: string
      description: "+" or "-" for fixed .5dB step

- id: amps_on
  label: Amps On
  kind: action
  description: Powers on all amplifiers connected via DataPort cables

- id: amps_off
  label: Amps Off
  kind: action
  description: Puts all amplifiers in standby

- id: version_query
  label: Firmware Version Query
  kind: action

- id: serial_number_query
  label: Serial Number Query
  kind: action

- id: device_name_query
  label: Device Name Query
  kind: action

- id: help
  label: Command Help
  kind: action
```

## Feedbacks
```yaml
- id: preset_response
  type: string
  description: Returns "Audio Preset = X" on query, error on invalid

- id: preset_name_response
  type: string
  description: Returns "Preset Name = X"

- id: mute_response
  type: integer
  values: [0, 1]
  description: Returns Mute state

- id: fader_response
  type: number
  description: Returns "Master Fader = X" in dB

- id: version_response
  type: string
  description: Returns firmware version as "major.minor.build"

- id: serial_response
  type: string
  description: Returns device serial number

- id: device_name_response
  type: string
  description: Returns device name

- id: error_response
  type: string
  description: Returns "'command' is an invalid command" on bad input
```

## Variables
```yaml
# UNRESOLVED: SNMP variables not enumerated in source - MIB file exported from DPM Manager
```

## Events
```yaml
# UNRESOLVED: device does not send unsolicited notifications per source - all queries are explicit
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Fire Alarm Mute must be cleared (automation input inactive) before normal operation resumes
  - Priority preset recall cannot be overridden until trigger level inactive
# UNRESOLVED: no voltage/current/power specs in source
```

## Notes
DPM 100/100H/300/300H include GPI inputs (6 contact closure inputs). DCM 100/300 do not support GPI or preset/volume/mute control. TCP connections closed by device after each command — must reopen before each command. Minimum 400ms between Ethernet commands for optimal performance. Serial commands terminated by newline (\n or \r\n). DCP300 backward-compatible command set supported (same syntax, query-only responses).
<!-- UNRESOLVED: SNMP MIB not included in source, must be exported from DPM Manager -->
<!-- UNRESOLVED: GPI pinout details not in source, referenced to DPM User's Manual -->

## Provenance

```yaml
source_domains:
  - help.qsys.com
source_urls:
  - https://help.qsys.com/Content/External_Control_APIs/QRC/QRC_Overview.htm
  - https://help.qsys.com/Content/External_Control_APIs/QRC/QRC_Commands.htm
  - https://help.qsys.com/Content/External_Control_APIs/ECP/ECP_Overview.htm
retrieved_at: 2026-04-30T03:11:42.670Z
last_checked_at: 2026-04-27T09:45:16.689Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:45:16.689Z
matched_actions: 11
action_count: 11
confidence: high
summary: "All 11 spec actions match source commands one-to-one; transport parameters verified; dpm100 command set fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
