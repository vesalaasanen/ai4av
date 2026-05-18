---
spec_id: admin/dbox-digital_satellite
schema_version: ai4av-public-spec-v1
revision: 1
title: "Dbox Digital Satellite Control Spec"
manufacturer: D-BOX
model_family: "Digital Satellite"
aliases: []
compatible_with:
  manufacturers:
    - D-BOX
    - Dbox
  models:
    - "Digital Satellite"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.d-box.com
source_urls:
  - "https://support.d-box.com/hubfs/198-914-0016-EN6%20Motion%20Engine_Remote%20Protocol%20(RS-232_TCP_UDP).pdf"
retrieved_at: 2026-05-13T16:00:00.000Z
last_checked_at: 2026-05-14T18:17:15.214Z
generated_at: 2026-05-14T18:17:15.214Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.214Z
  matched_actions: 9
  action_count: 9
  confidence: high
  summary: "All 20 spec actions match source commands with correct parameters; transport values verified against protocol documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Dbox Digital Satellite Control Spec

## Summary
Motion engine remote control protocol for HEMC, HaptiSync Hub and Motion Engine. Supports RS-232 serial, UDP, and TCP/IP control via Ethernet or Wi-Fi. Commands use STX/ETX block framing with ASCII mnemonics. WRITE (W prefix) and READ (R prefix) command types.

<!-- UNRESOLVED: full command set coverage — only documented commands populated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 61555  # TCP port
udp_port: 61556
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- levelable       # WMOTL/WVIBL set intensity/vibration levels
- queryable       # RMOTL/RVIBL/RMUTE and other READ commands present
```

## Actions
```yaml
- id: wmotl
  label: Set Motion Intensity
  kind: action
  params:
    - name: intensity
      type: number
      description: Intensity in dB (-20 minimum, 0 maximum)

- id: wvibl
  label: Set Vibration Level
  kind: action
  params:
    - name: level
      type: number
      description: Vibration level in dB (-20 minimum, 0 maximum)

- id: wmute
  label: Set Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: "0: unmute, 1: mute"

- id: wname
  label: Set Unit Name
  kind: action
  params:
    - name: name
      type: string
      description: Unit name

- id: wdlay
  label: Set Motion Delay
  kind: action
  params:
    - name: delay
      type: integer
      description: Motion delay in ms

- id: wtolr
  label: Set Recognition Tolerance
  kind: action
  params:
    - name: tolerance
      type: number
      description: Tolerance in seconds

- id: wstop
  label: Shutdown Unit
  kind: action
  params: []

- id: wcapd
  label: Set Capture Device
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: Manual, 1: OS Default, 2: USB Preferred"
    - name: device_id
      type: string
      description: Device identification (for manual mode)

- id: wexpm
  label: Set Experience Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: D-BOX Coded Video, 1: D-BOX Coded Gaming, 2: Adaptive Audio, 3: Adaptive Gaming"
```

## Feedbacks
```yaml
- id: rpcnt
  label: Platform Count
  type: integer
  description: Number of motion platforms connected

- id: rfilm
  label: Media Status
  type: object
  description: Returns source status, motion code status, title, timecode, duration

- id: rmotl
  label: Motion Intensity
  type: number
  description: Current motion intensity in dB

- id: rvibl
  label: Vibration Level
  type: number
  description: Current vibration level in dB

- id: rmute
  label: Mute State
  type: integer
  values: [0, 1]
  description: "0: muted, 1: unmuted"

- id: rflnb
  label: Film Count
  type: integer
  description: Number of titles in database matching filter

- id: rname
  label: Unit Name
  type: string

- id: rdlay
  label: Motion Delay
  type: integer
  description: Current motion delay in ms

- id: rtolr
  label: Recognition Tolerance
  type: number
  description: Current tolerance in seconds

- id: rcapd
  label: Capture Devices
  type: object
  description: List of available capture devices with status

- id: rexpm
  label: Experience Mode
  type: object
  description: Current experience mode, state, and status code
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command block uses STX (02h) start, ETX (03h) end, RS (1Eh) separator. Target number follows STX (0 = unit, 1-N = motion platform). ENQ (05h) optional for echoing request in response. NAK (15h) returned for unrecognized commands.
<!-- UNRESOLVED: full device model name not confirmed in source -->
<!-- UNRESOLVED: Wake-on-LAN MAC address format not machine-readable -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - support.d-box.com
source_urls:
  - "https://support.d-box.com/hubfs/198-914-0016-EN6%20Motion%20Engine_Remote%20Protocol%20(RS-232_TCP_UDP).pdf"
retrieved_at: 2026-05-13T16:00:00.000Z
last_checked_at: 2026-05-14T18:17:15.214Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.214Z
matched_actions: 9
action_count: 9
confidence: high
summary: "All 20 spec actions match source commands with correct parameters; transport values verified against protocol documentation."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
