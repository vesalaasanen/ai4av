---
schema_version: ai4av-public-spec-v1
device_id: televic/plixus-central-unit-mme
entity_id: televic_plixus_mme
spec_id: admin/televic-plixus_web_server
revision: 1
author: admin
title: "Televic Plixus Web Server Control Spec"
status: published
manufacturer: Televic
manufacturer_key: televic
model_family: "Plixus Central Unit (MME)"
aliases: []
compatible_with:
  manufacturers:
    - Televic
  models:
    - "Plixus Central Unit (MME)"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: televic_plixus_mme_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:16.685Z
retrieved_at: 2026-04-27T10:13:16.685Z
last_checked_at: 2026-04-27T10:13:16.685Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:16.685Z
  matched_actions: 11
  action_count: 11
  confidence: high
  summary: "All 11 spec actions matched their source commands verbatim; transport parameters verified; camera protocol catalogue fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Televic Plixus Web Server Control Spec

## Summary
Plixus is a conference central unit supporting TCP, HTTP/REST, WebSocket, and UDP control. REST API defaults to TCP port 8890. Camera protocol (TLVCAM1/TLVCAM2) tracks active microphones and drives camera presets. Default IP: 192.168.0.100, subnet 255.255.255.0.

<!-- UNRESOLVED: device firmware version, full CoCon API action list, routing commands not in this doc -->

## Transport
```yaml
protocols:
  - tcp
  - http
  - udp
addressing:
  port: 8890  # REST API default TCP port
  base_url: http://{ip}/  # UNRESOLVED: exact API base path not stated in source
serial:
  # UNRESOLVED: serial config not covered in this source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from camera protocol commands:
# - routable  # camera tracks active mics (not I/O routing per se)
# - queryable  # UNRESOLVED: no query commands in this source
powerable: false  # no power commands in source
routable: false   # no I/O routing in source
levelable: false  # no level/gain commands in source
```

## Actions
```yaml
# TLVCAM1 commands (prefix '%', CRC-16, terminator ETX 0x0D):
# UNRESOLVED: only camera-related commands present; full device action set not in this doc
- id: tlvcam1_activate_president_mic
  label: Activate President Microphone (TLVCAM1)
  kind: action
  params:
    - name: microphone_number
      type: string
      description: 4-digit microphone number (e.g., "0001")

- id: tlvcam1_deactivate_president_mic
  label: Deactivate President Microphone (TLVCAM1)
  kind: action
  params:
    - name: microphone_number
      type: string
      description: 4-digit microphone number

- id: tlvcam1_activate_delegate_mic
  label: Activate Delegate Microphone (TLVCAM1)
  kind: action
  params:
    - name: microphone_number
      type: string
      description: 4-digit microphone number

- id: tlvcam1_deactivate_delegate_mic
  label: Deactivate Delegate Microphone (TLVCAM1)
  kind: action
  params:
    - name: microphone_number
      type: string
      description: 4-digit microphone number

- id: tlvcam1_reset_camera
  label: Reset Camera to Neutral Position (TLVCAM1)
  kind: action
  params: []

- id: tlvcam1_sync
  label: Synchronize Active Microphones (TLVCAM1)
  kind: action
  params:
    - name: microphone_numbers
      type: array
      items:
        type: string
      description: One or more 4-digit microphone numbers (0 = no active mics)

- id: tlvcam1_deactivate_all
  label: Deactivate All Microphones (TLVCAM1)
  kind: action
  params: []

# TLVCAM2 commands (prefix '$' or '&', terminator CR 0x0D LF 0x0A):
- id: tlvcam2_activate_delegate_mic
  label: Activate Delegate Microphone (TLVCAM2)
  kind: action
  params:
    - name: microphone_number
      type: string
      description: 4-digit microphone number

- id: tlvcam2_deactivate_delegate_mic
  label: Deactivate Delegate Microphone (TLVCAM2)
  kind: action
  params:
    - name: microphone_number
      type: string
      description: 4-digit microphone number

- id: tlvcam2_reset_camera
  label: Reset Camera to Neutral Position (TLVCAM2)
  kind: action
  params: []

- id: tlvcam2_deactivate_all
  label: Deactivate All Microphones (TLVCAM2)
  kind: action
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: no response/ack format documented for TLVCAM1/TLVCAM2 inbound commands
# TLVCAM1 ack: 1 byte 0x06 (ack) or retransmit up to 3x if no ack (UDP mode)
# Camera control sends mic activate/deactivate commands when mics are toggled
```

## Variables
```yaml
# UNRESOLVED: no device state variables in this source
```

## Events
```yaml
# Events emitted by Plixus to camera control when mic state changes:
# TLVCAM1:
#   - President mic activated: STX 'P' + mic_number(4) + CRC(4) + ETX
#   - President mic deactivated: STX 'p' + mic_number(4) + CRC(4) + ETX
#   - Delegate mic activated: STX 'M' + mic_number(4) + CRC(4) + ETX
#   - Delegate mic deactivated: STX 'm' + mic_number(4) + CRC(4) + ETX
#   - Camera reset: STX 'R' + CRC(4) + ETX
#   - Sync (5s interval): STX 'S' + mic_number(4)1+ + CRC(4) + ETX
#   - Deactivate all: STX 'V' + '0000' + CRC(4) + ETX
# TLVCAM2:
#   - Delegate mic activated: $1 + mic_number(4) + CR + LF
#   - Delegate mic deactivated: $2 + mic_number(4) + CR + LF
#   - Reset/deactivate all: &30000 + CR + LF
# UNRESOLVED: full event list from CoCon API not in this source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros in this source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Default IP 192.168.0.100, subnet 255.255.255.0. IP change requires restart.
- REST API disabled by default; enable in Plixus config.
- TCP ports 5011, 5012, 5111, 6011, 6012, 6101, 6111, 6212, 6312, 8890 reserved — do not use for camera control.
- TLVCAM1 uses STX '%' ... ETX with CRC-16 checksum of ASCII chars between STX and CRC.
- TLVCAM2 uses prefix '$' or '&' with CR/LF terminator.
- Camera protocol port configurable (TCP or UDP); for UDP, must specify destination IP.
- Source: Plixus Web Server Configuration Guide (refined companion doc).
<!-- UNRESOLVED: full CoCon API action/feedback list not in this source; only camera protocol covered -->
<!-- UNRESOLVED: device power, input/output routing, level control not in this source -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: televic_plixus_mme_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:16.685Z
retrieved_at: 2026-04-27T10:13:16.685Z
last_checked_at: 2026-04-27T10:13:16.685Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:16.685Z
matched_actions: 11
action_count: 11
confidence: high
summary: "All 11 spec actions matched their source commands verbatim; transport parameters verified; camera protocol catalogue fully represented."
```

## Known Gaps

```yaml
[]
```
