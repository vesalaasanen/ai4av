---
spec_id: admin/extron-matrix-100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron Matrix 100 Control Spec"
manufacturer: Extron
model_family: "Matrix 100"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "Matrix 100"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
retrieved_at: 2026-04-30T15:48:45.823Z
last_checked_at: 2026-06-02T22:07:02.650Z
generated_at: 2026-06-02T22:07:02.650Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "maximum input/output count not stated in source"
  - "source does not enumerate discrete settable parameters beyond actions."
  - "no safety warnings or interlock procedures in source"
  - "plane map PlnMap1 not used at this time (reserved)"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:02.650Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec actions traced to source (dip-safe re-verify). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Extron Matrix 100 Control Spec

## Summary
Extron Matrix 100 is a video/audio matrix switcher controllable via RS-232. Supports routing of RGB, composite video, and stereo audio signals across multiple planes. Control protocol is proprietary byte-oriented with command codes 20h-7Fh and data bytes 80h-FFh.

<!-- UNRESOLVED: maximum input/output count not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff  # X-on/X-off handshaking stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # CMD2 power on, CMD3 power off
- routable   # CMD5, CMD7 tie connections
- queryable  # CMD0, CMD1, CMD4, CMD8, CMD13, CMD26 queries
- levelable  # CMD25 set RGB delay
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  hex: "32h"

- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: "33h"

- id: request_status
  label: Request Status
  kind: action
  params:
    - name: scmd
      type: integer
      description: Subcommand (80h = send status)
  hex: "30h"

- id: request_system_id
  label: Request System ID
  kind: action
  params:
    - name: scmd
      type: integer
      description: Subcommand (82h = report technology)
  hex: "31h"

- id: request_software_version
  label: Request Software Version
  kind: action
  params: []
  hex: "34h"

- id: set_connection
  label: Set (Tie) Single Connection
  kind: action
  params:
    - name: plnmap0
      type: integer
      description: Plane map for RGBS switcher (bitmask)
    - name: out_num
      type: integer
      description: Output number (1-based, hex)
    - name: inp_num
      type: integer
      description: Input number (1-based, hex)
  hex: "35h"

- id: set_all_connections
  label: Set (Tie) All Connections
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 81h-88h (1-8), or 80h for current without saving
  hex: "37h"

- id: request_status_and_presets
  label: Request Status and Presets
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (80h = current, 81h-88h = preset 1-8)
  hex: "38h"

- id: mute_all_planes
  label: Mute All Planes
  kind: action
  params:
    - name: plnmap0
      type: integer
      description: Plane map (bits 0-6 = planes, 1 = mute)
  hex: "39h"

- id: save_preset
  label: Save Current as Preset #
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 81h-88h (1-8)
  hex: "3Ah"

- id: load_preset
  label: Load Preset #
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 81h-88h (1-8)
  hex: "3Bh"

- id: mute_selected_outputs
  label: Mute Selected Outputs
  kind: action
  params:
    - name: mute_bytes
      type: array
      description: Mute bytes per output (one byte per output)
  hex: "3Ch"

- id: request_mute_map
  label: Request Mute Map
  kind: action
  params: []
  hex: "3Dh"

- id: set_rgb_delay
  label: Set RGB Delay
  kind: action
  params:
    - name: delay_bytes
      type: array
      description: Delay bytes per output (bits 0-6 = delay in 0.1s increments, 80h = zero delay)
  hex: "49h"

- id: request_rgb_delay
  label: Request RGB Delay Information
  kind: action
  params: []
  hex: "4Ah"
```

## Feedbacks
```yaml
- id: error_code
  label: Error Code
  type: enum
  values:
    - "80h - no error"
    - "81h - checksum error"
    - "82h - illegal command"
    - "90h - no I/O boards"
    - "91h - system mismatch"
    - "92h - security code error"
    - "C0h - CMD7 out of memory"
    - "C1h - preset file not found (CMD8)"
    - "C2h - preset file not found (CMD11)"
    - "C3h - out of memory (CMD10)"
    - "D3h - no I/O boards detected (CMD1)"

- id: status_report
  label: Status Report
  type: object
  fields:
    - name: power_status
      type: boolean
      description: 0 = powered on, 1 = powered off
    - name: battery_status
      type: boolean
      description: 0 = battery okay, 1 = battery low
    - name: genlock_signal
      type: boolean
      description: 0 = detected, 1 = not detected
    - name: vertical_interval_switching
      type: boolean
      description: 0 = disabled, 1 = enabled
    - name: slave_status
      type: boolean
      description: 0 = standalone/master, 1 = slave in compound matrix
    - name: sequence_running
      type: boolean
      description: 0 = not running, 1 = running
    - name: program_pending
      type: boolean
      description: 0 = no program event pending, 1 = program event pending
    - name: power_supply
      type: enum
      values: [backup, main]
    - name: hardware_security
      type: boolean
      description: 0 = locked, 1 = unlocked
    - name: software_security
      type: boolean
      description: 0 = locked, 1 = unlocked

- id: controlling_port_report
  label: New Controlling Port Report
  type: enum
  values:
    - "80h - host controller (RS-232/RS-422)"
    - "82h - standard front panel controller port"
    - "83h - secondary front panel controller port"
```

## Variables
```yaml
# UNRESOLVED: source does not enumerate discrete settable parameters beyond actions.
# RGB delay per output is set via CMD25/CMD26 action pair.
```

## Events
```yaml
- id: status_change
  label: Status Change Report
  description: Broadcast when internal status changes (RPRT0)
  params:
    - name: stsB1
      type: integer
    - name: stsB2
      type: integer
    - name: stsB3
      type: integer

- id: new_controlling_port
  label: New Controlling Port Report
  description: Broadcast when connections or mode requested by new port (RPRT1)
  params:
    - name: port_num
      type: integer
```

## Macros
```yaml
# Source describes preset workflow: save with CMD10, load with CMD11.
# Presets 1-8 stored internally.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Response time < 100 msec (RS-232 bus delay + processing)
- X-on/X-off handshaking used (not hardware flow control)
- End of transmission always (80h 80h 04h)
- Plane map bytes: 8Fh = RGBS, 90h = Composite Video, A0h = Audio
- RGB delay allows seamless switching by delaying R/G/B relative to sync
- CMD5/7/9/11/12/25 trigger RPRT1 report to all ports
<!-- UNRESOLVED: maximum input/output count not stated in source -->
<!-- UNRESOLVED: plane map PlnMap1 not used at this time (reserved) -->

## Provenance

```yaml
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
retrieved_at: 2026-04-30T15:48:45.823Z
last_checked_at: 2026-06-02T22:07:02.650Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:02.650Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec actions traced to source (dip-safe re-verify). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "maximum input/output count not stated in source"
- "source does not enumerate discrete settable parameters beyond actions."
- "no safety warnings or interlock procedures in source"
- "plane map PlnMap1 not used at this time (reserved)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
