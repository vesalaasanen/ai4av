---
spec_id: admin/telestream-prism-mpi
schema_version: ai4av-public-spec-v1
revision: 1
title: "Telestream PRISM SDI/IP Waveform Monitor Control Spec"
manufacturer: Telestream
model_family: "Telestream PRISM MPI"
aliases: []
compatible_with:
  manufacturers:
    - Telestream
  models:
    - "Telestream PRISM MPI"
    - "Telestream PRISM MPI2-25"
    - "Telestream PRISM MPS"
    - "Telestream PRISM MPD"
    - "Telestream PRISM MPP"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - telestream.net
source_urls:
  - https://www.telestream.net/pdfs/user-guides/PRISM-MPI2-25-MPX2-25-User-Manual-D00010019P.pdf
  - https://www.telestream.net/pdfs/user-guides/PRISM-MPI-MPX_User_Manual-D00010020E.pdf
  - https://www.telestream.net/pdfs/user-guides/PRISM-MPS-MPD-MPP-User-Manual-D00013488P.pdf
retrieved_at: 2026-05-14T10:50:29.756Z
last_checked_at: 2026-06-02T22:15:36.196Z
generated_at: 2026-06-02T22:15:36.196Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power on/off commands not documented in source"
  - "detailed serial RS-232 command set not included in this source"
  - "NMOS API field mappings require device-side help page confirmation"
  - "RS-232 not covered in this source excerpt"
  - "display_list and requested_display_mappings commands - referenced but details require API help page"
  - "no explicit query response formats in source"
  - "no settable parameters documented in this excerpt"
  - "specific alarm IDs and event schemas not in this source excerpt"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source excerpt"
  - "GPIO pin assignments not in source"
  - "NMOS IS-04/IS-05 register paths not in source"
  - "RTSP port usage (UDP 5004-5005) not documented as control interface"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:15:36.196Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions traced to source (dip-safe re-verify). (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-11
---

# Telestream PRISM SDI/IP Waveform Monitor Control Spec

## Summary
PRISM SDI/IP waveform monitor supports remote control via REST API (HTTP GET/POST), SNMP traps (UDP 161-162), TSL UMD/Tally Protocol 5.0 (UDP port 5446), VNC (TCP 5900/6080), SSH (TCP 22), and Syslog (RFC 5424). Supports GPIO preset recall and input switching via API. No login/password auth described in source.

<!-- UNRESOLVED: power on/off commands not documented in source -->
<!-- UNRESOLVED: detailed serial RS-232 command set not included in this source -->
<!-- UNRESOLVED: NMOS API field mappings require device-side help page confirmation -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp

addressing:
  base_url: http://<IpAddress>  # from source: "http://<IpAddress>/api/..."

serial:
  # UNRESOLVED: RS-232 not covered in this source excerpt
  baud_rate: null
  data_bits: null
  parity: null
  stop_bits: null

auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
# inferred from source:
# - routable: activeInput API command for switching primary input
# - queryable: display_list, requested_display_mappings, nmos_* APIs
# - levelable: GPIO_PRESET_RECALL_ON/OFF
traits:
  - routable
  - queryable
```

## Actions
```yaml
- id: gpio_preset_recall_enable_on
  label: GPIO Preset Recall Enable On
  kind: action
  params: []
  description: Enable GPIO preset recall

- id: gpio_preset_recall_enable_off
  label: GPIO Preset Recall Enable Off
  kind: action
  params: []
  description: Disable GPIO preset recall

- id: active_input
  label: Set Active Input
  kind: action
  params:
    - name: input
      type: string
      description: Input identifier per PRISM API

- id: download_screenshot
  label: Download Screenshot
  kind: action
  params: []
  description: Remotely save a screenshot via API
  source: GET http://<IpAddress>/api/downloadScreenshot

- id: nmos_single_device_mode
  label: Set NMOS Single Device Mode
  kind: action
  params:
    - name: enabled
      type: boolean
      description: true = single NMOS device; false = six devices

- id: nmos_target_input
  label: Set NMOS Target Input
  kind: action
  params:
    - name: input
      type: string
      description: Target input for NMOS activations

- id: snmp_trap_enable
  label: Enable SNMP Traps
  kind: action
  params:
    - name: state
      type: string
      enum: [SNMP_TRAP_ENABLE_ON, SNMP_TRAP_ENABLE_OFF]
  source: POST http://<IpAddress>/api/snmp_trap_enable
  body: '{"ints":["SNMP_TRAP_ENABLE_ON"]}'

- id: snmp_trap_destination_address
  label: Set SNMP Trap Destination
  kind: action
  params:
    - name: destination_ip
      type: string
  source: POST http://<IpAddress>/api/snmp_trap_destination_address
  body: '{"string":"<destination_ip>"}'

- id: snmp_trap_community
  label: Set SNMP Community String
  kind: action
  params:
    - name: community
      type: string
  source: POST http://<IpAddress>/api/snmp_trap_community
  body: '{"string":"<community_string>"}'

# UNRESOLVED: display_list and requested_display_mappings commands - referenced but details require API help page
```

## Feedbacks
```yaml
# UNRESOLVED: no explicit query response formats in source
# API help page at http://<IpAddress>/api/help defines responses
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented in this excerpt
```

## Events
```yaml
# PRISM emits unsolicited events via:
# - SNMP traps (UDP): alarm conditions sent to configured trap destination
# - Syslog (UDP): alarm and event messages per RFC 5424
# UNRESOLVED: specific alarm IDs and event schemas not in this source excerpt
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source excerpt
```

## Notes
TSL UMD/Tally Protocol 5.0 uses little-endian byte order (LSB first). Port 5446 UDP. Max UMD text 20 chars. PRISM API help page: http://<IpAddress>/api/help — definitive command response schema. SNMP MIB file `prism_mon.mib` downloadable from PRISM web page. Syslog port configured via Settings > Network > REMOTE ACCESS — port number determined by syslog server software (not stated in source).

<!-- UNRESOLVED: GPIO pin assignments not in source -->
<!-- UNRESOLVED: NMOS IS-04/IS-05 register paths not in source -->
<!-- UNRESOLVED: RTSP port usage (UDP 5004-5005) not documented as control interface -->

## Provenance

```yaml
source_domains:
  - telestream.net
source_urls:
  - https://www.telestream.net/pdfs/user-guides/PRISM-MPI2-25-MPX2-25-User-Manual-D00010019P.pdf
  - https://www.telestream.net/pdfs/user-guides/PRISM-MPI-MPX_User_Manual-D00010020E.pdf
  - https://www.telestream.net/pdfs/user-guides/PRISM-MPS-MPD-MPP-User-Manual-D00013488P.pdf
retrieved_at: 2026-05-14T10:50:29.756Z
last_checked_at: 2026-06-02T22:15:36.196Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:15:36.196Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions traced to source (dip-safe re-verify). (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power on/off commands not documented in source"
- "detailed serial RS-232 command set not included in this source"
- "NMOS API field mappings require device-side help page confirmation"
- "RS-232 not covered in this source excerpt"
- "display_list and requested_display_mappings commands - referenced but details require API help page"
- "no explicit query response formats in source"
- "no settable parameters documented in this excerpt"
- "specific alarm IDs and event schemas not in this source excerpt"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source excerpt"
- "GPIO pin assignments not in source"
- "NMOS IS-04/IS-05 register paths not in source"
- "RTSP port usage (UDP 5004-5005) not documented as control interface"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
