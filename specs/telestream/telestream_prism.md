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
last_checked_at: 2026-09-28T14:16:29.880Z
generated_at: 2026-09-28T14:16:29.880Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power on/off commands not documented in source"
  - "detailed serial RS-232 command set not included in this source"
  - "NMOS API field mappings require device-side help page confirmation"
  - "RS-232 not covered in this source excerpt"
  - "authentication requirements are not specified"
  - "request method is not specified for this endpoint in the source.\""
  - "complete packet layout and INDEX selection mapping; no constructed wire packet is asserted.\""
  - "method, parameters and response schema require device API help.\""
  - "HTTP method and request body require device API help.\""
  - "no explicit query response formats in source"
  - "specific alarm IDs and event schemas not in this source excerpt"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source excerpt"
  - "this generic PRISM reference does not establish compatibility with every model listed in frontmatter or any firmware version."
  - "GPIO pin assignments not in source"
  - "NMOS IS-04/IS-05 register paths not in source"
  - "RTSP port usage (UDP 5004-5005) not documented as control interface"
  - "GPIO, activeInput and NMOS methods/request bodies are not specified in this excerpt."
  - "TSL tally INDEX and CONTROL descriptions overlap; the source does not supply a complete packet template. No inferred packet encodings are provided."
verification:
  verdict: verified
  checked_at: 2026-09-28T14:16:29.880Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 13 REST operations and one semantic TSL update match; missing request encodings and exact-model applicability remain explicit gaps. (19 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-11
---

# Telestream PRISM SDI/IP Waveform Monitor Control Spec

## Summary
PRISM SDI/IP waveform monitor supports remote control via REST API (HTTP GET/POST), SNMP traps (UDP 161-162), TSL UMD/Tally Protocol 5.0 (UDP port 5446), VNC (TCP 5900/6080), SSH (TCP 22), and Syslog (RFC 5424). Supports GPIO preset recall and input switching via API. Authentication requirements are unknown; the source does not specify them.

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
  type: unknown  # UNRESOLVED: authentication requirements are not specified
```

## Traits
```yaml
# inferred from source:
# - routable: activeInput API command for switching primary input
# - queryable: display_list, requested_display_mappings, nmos_* APIs
# - GPIO recall enablement is not level control
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
  command: GPIO_PRESET_RECALL_ENABLE_ON

- id: gpio_preset_recall_enable_off
  label: GPIO Preset Recall Enable Off
  kind: action
  params: []
  description: Disable GPIO preset recall
  command: GPIO_PRESET_RECALL_ENABLE_OFF

- id: active_input
  command: activeInput
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
  path: http://<IpAddress>/api/downloadScreenshot
  notes: "UNRESOLVED: request method is not specified for this endpoint in the source."

- id: nmos_single_device_mode
  command: nmos_single_device_mode
  label: Set NMOS Single Device Mode
  kind: action
  params:
    - name: enabled
      type: boolean
      description: Enable single device mode or disable it to advertise six devices; wire encoding is UNRESOLVED.

- id: nmos_target_input
  command: nmos_target_input
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
      enum: [SNMP_TRAP_ENABLE_ON]
      description: Only enabling traps is documented; a disable token is UNRESOLVED.
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

- id: tsl_tally_umd_update
  label: Update TSL Tally and UMD Text
  kind: action
  params:
    - name: index
      type: integer
      description: 16-bit INDEX field; complete tile/subtile and fourth-tally mapping is UNRESOLVED due overlapping source descriptions.
    - name: control
      type: integer
      description: 16-bit CONTROL field; bits 0-1 red, 2-3 amber, 4-5 green. Tally value meanings and other bits are UNRESOLVED.
    - name: text
      type: string
      description: ASCII UMD label, maximum 20 characters; 0x00 is interpreted as a space (0x20).
  notes: "TSL UMD/Tally 5.0 over UDP port 5446 uses little-endian fields. The 16-bit LENGTH is the text byte count; zero turns off UMD for that tile. UNRESOLVED: complete packet layout and INDEX selection mapping; no constructed wire packet is asserted."

- id: display_list
  label: Display List API
  kind: action
  command: display_list
  params: []
  notes: "Referenced for extended display configuration; UNRESOLVED: method, parameters and response schema require device API help."

- id: requested_display_mappings
  label: Requested Display Mappings API
  kind: action
  command: requested_display_mappings
  params: []
  notes: "Referenced for extended display configuration; UNRESOLVED: method, parameters and response schema require device API help."

- id: nmos_audio_receivers_count
  label: Set NMOS Audio Receiver Count
  kind: action
  command: nmos_audio_receivers_count
  params:
    - name: count
      type: integer
      description: Number of audio receivers each device advertises; allowed range and wire encoding are UNRESOLVED.
  notes: "UNRESOLVED: HTTP method and request body require device API help."

- id: nmos_anc_receivers_count
  label: Set NMOS Ancillary Data Receiver Count
  kind: action
  command: nmos_anc_receivers_count
  params:
    - name: count
      type: integer
      description: Number of ancillary data receivers each device advertises; allowed range and wire encoding are UNRESOLVED.
  notes: "UNRESOLVED: HTTP method and request body require device API help."
```

## Feedbacks
```yaml
# UNRESOLVED: no explicit query response formats in source
# API help page at http://<IpAddress>/api/help defines responses
```

## Variables
```yaml
# Receiver counts, active input and SNMP settings are represented under Actions; exact request shapes remain unresolved where omitted by the source.
```

## Events
```yaml
# PRISM emits unsolicited events via:
# - SNMP traps (UDP): alarm conditions sent to configured trap destination
# - Syslog: alarm and event messages per RFC 5424; transport is UNRESOLVED
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

<!-- UNRESOLVED: this generic PRISM reference does not establish compatibility with every model listed in frontmatter or any firmware version. -->
<!-- UNRESOLVED: GPIO pin assignments not in source -->
<!-- UNRESOLVED: NMOS IS-04/IS-05 register paths not in source -->
<!-- UNRESOLVED: RTSP port usage (UDP 5004-5005) not documented as control interface -->
<!-- UNRESOLVED: GPIO, activeInput and NMOS methods/request bodies are not specified in this excerpt. -->
<!-- UNRESOLVED: TSL tally INDEX and CONTROL descriptions overlap; the source does not supply a complete packet template. No inferred packet encodings are provided. -->

## Provenance

```yaml
source_domains:
  - telestream.net
source_urls:
  - https://www.telestream.net/pdfs/user-guides/PRISM-MPI2-25-MPX2-25-User-Manual-D00010019P.pdf
  - https://www.telestream.net/pdfs/user-guides/PRISM-MPI-MPX_User_Manual-D00010020E.pdf
  - https://www.telestream.net/pdfs/user-guides/PRISM-MPS-MPD-MPP-User-Manual-D00013488P.pdf
retrieved_at: 2026-05-14T10:50:29.756Z
last_checked_at: 2026-09-28T14:16:29.880Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-28T14:16:29.880Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 13 REST operations and one semantic TSL update match; missing request encodings and exact-model applicability remain explicit gaps. (19 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power on/off commands not documented in source"
- "detailed serial RS-232 command set not included in this source"
- "NMOS API field mappings require device-side help page confirmation"
- "RS-232 not covered in this source excerpt"
- "authentication requirements are not specified"
- "request method is not specified for this endpoint in the source.\""
- "complete packet layout and INDEX selection mapping; no constructed wire packet is asserted.\""
- "method, parameters and response schema require device API help.\""
- "HTTP method and request body require device API help.\""
- "no explicit query response formats in source"
- "specific alarm IDs and event schemas not in this source excerpt"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source excerpt"
- "this generic PRISM reference does not establish compatibility with every model listed in frontmatter or any firmware version."
- "GPIO pin assignments not in source"
- "NMOS IS-04/IS-05 register paths not in source"
- "RTSP port usage (UDP 5004-5005) not documented as control interface"
- "GPIO, activeInput and NMOS methods/request bodies are not specified in this excerpt."
- "TSL tally INDEX and CONTROL descriptions overlap; the source does not supply a complete packet template. No inferred packet encodings are provided."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
