---
spec_id: admin/blustream-cmx88ab
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blustream CMX88AB Control Spec"
manufacturer: Blustream
model_family: CMX88AB
aliases: []
compatible_with:
  manufacturers:
    - Blustream
  models:
    - CMX88AB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - blustream.com.au
source_urls:
  - "https://www.blustream.com.au/Attachment/DownloadFile?downloadId=192"
retrieved_at: 2026-04-29T08:34:57.416Z
last_checked_at: 2026-06-02T17:21:45.200Z
generated_at: 2026-06-02T17:21:45.200Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "product line \"Blustream Blustream Power Products\" not in source; model CMX88AB inferred from manual title."
  - "TCP port not stated in source"
  - "source lists default username \"blustream\" / password \"1234\" under \"TCP/IP\" section, likely for web UI, but no auth procedure documented for Telnet control"
  - "STATUS response format not documented in source"
  - "no discrete settable parameters beyond Actions"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no additional safety warnings in source"
  - "STATUS response payload format not documented."
  - "TCP port for Telnet control not stated."
  - "whether default username/password applies to Telnet control or only web UI."
  - "firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:45.200Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec commands match verbatim in the source RS232 command reference table, transport parameters verified, and source has no extra commands beyond the 15 mapped. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Blustream CMX88AB Control Spec

## Summary
RS-232 / Telnet control spec for Blustream CMX88AB matrix. ASCII command set for power, output routing, EDID management, system config.

<!-- UNRESOLVED: product line "Blustream Blustream Power Products" not in source; model CMX88AB inferred from manual title. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  host: 192.168.0.200  # default static; device falls back to this when no DHCP
  # UNRESOLVED: TCP port not stated in source
  port: null
  dhcp: true
auth:
  type: null  # UNRESOLVED: source lists default username "blustream" / password "1234" under "TCP/IP" section, likely for web UI, but no auth procedure documented for Telnet control
```

## Traits
```yaml
- powerable  # inferred from PON / POFF commands
- routable   # inferred from OUTxxFRyy command
- queryable  # inferred from STATUS command
```

## Actions
```yaml
- id: help
  label: Print Help
  kind: action
  command: "?"
  params: []

- id: help_keyword
  label: Print Help (keyword)
  kind: action
  command: "HELP"
  params: []

- id: status
  label: Print System Status
  kind: query
  command: "STATUS"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "PON"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "POFF"
  params: []

- id: ir_control
  label: Set System IR Control
  kind: action
  command: "IRON/OFF"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: ON or OFF

- id: key_control
  label: Set System KEY Control
  kind: action
  command: "KEYON/OFF"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: debug_mode
  label: Set Debug Mode
  kind: action
  command: "DBGON/OFF"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: onboard_beep
  label: Set Onboard Beep
  kind: action
  command: "BEEPON/OFF"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: reset_system
  label: Reset System To Default
  kind: action
  command: "RESET"
  params: []
  notes: Confirm by typing "Yes"; "No" discards.

- id: out_on_off
  label: Set Output On/Off
  kind: action
  command: "OUT{output}ON/OFF"
  params:
    - name: output
      type: integer
      description: Output zone number (01-08)
    - name: state
      type: enum
      values: [ON, OFF]

- id: out_route
  label: Set Output From Input
  kind: action
  command: "OUT{output}FR{input}"
  params:
    - name: output
      type: integer
      description: Output zone number (01-08)
    - name: input
      type: integer
      description: Input source number (01-08)

- id: edid_copy
  label: Copy EDID From Output To Input
  kind: action
  command: "EDID{input}CP{output}"
  params:
    - name: input
      type: integer
      description: Input (00 = ALL, 01-08)
    - name: output
      type: integer
      description: Output (00 = ALL, 01-08)

- id: edid_set_default
  label: Set Input EDID To Default
  kind: action
  command: "EDID{input}DF{edid_index}"
  params:
    - name: input
      type: integer
      description: Input (00 = ALL, 01-04)
    - name: edid_index
      type: integer
      description: EDID index (00-14); see Notes for table

- id: factory_reset
  label: Restore Factory Settings
  kind: action
  command: "RESETDEF"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: STATUS response format not documented in source
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond Actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - id: reset_system
    description: 'RESET requires typing "Yes" to confirm; "No" discards'
interlocks: []
# UNRESOLVED: no additional safety warnings in source
```

## Notes
- Carriage return handling: some programs need <CR>, \r, or 0D appended; commands are sent verbatim (e.g. `OUT01ON`).
- Spaces optional: commands work without spaces unless program requires them (e.g. `OUT{Space}01{Space}ON`).
- IP control: default 192.168.0.200; DHCP on by default, reverts to 192.168.0.200 if no DHCP server.
- EDID index table for `EDIDxxDFzz`:
  - 00: HDMI 1080p@60Hz, 2CH PCM
  - 01: HDMI 1080p@60Hz, 5.1CH PCM/DTS/DOLBY
  - 02: HDMI 1080p@60Hz, 7.1CH PCM/DTS/DOLBY/HD
  - 03: HDMI 1080i@60Hz, 2CH PCM
  - 04: HDMI 1080i@60Hz, 5.1CH PCM/DTS/DOLBY
  - 05: HDMI 1080i@60Hz, 7.1CH PCM/DTS/DOLBY/HD
  - 06: HDMI 1080p@60Hz/3D, 2CH PCM
  - 07: HDMI 1080p@60Hz/3D, 5.1CH PCM/DTS/DOLBY
  - 08: HDMI 1080p@60Hz/3D, 7.1CH PCM/DTS/DOLBY/HD
  - 09: HDMI 4K2K, 2CH PCM
  - 10: HDMI 4K2K, 5.1CH PCM/DTS/DOLBY
  - 11: HDMI 4K2K, 7.1CH PCM/DTS/DOLBY/HD
  - 12: DVI 1280x1024@60Hz, no audio
  - 13: DVI 1920x1080@60Hz, no audio
  - 14: DVI 1920x1200@60Hz, no audio

<!-- UNRESOLVED: STATUS response payload format not documented. -->
<!-- UNRESOLVED: TCP port for Telnet control not stated. -->
<!-- UNRESOLVED: whether default username/password applies to Telnet control or only web UI. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - blustream.com.au
source_urls:
  - "https://www.blustream.com.au/Attachment/DownloadFile?downloadId=192"
retrieved_at: 2026-04-29T08:34:57.416Z
last_checked_at: 2026-06-02T17:21:45.200Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:45.200Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec commands match verbatim in the source RS232 command reference table, transport parameters verified, and source has no extra commands beyond the 15 mapped. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "product line \"Blustream Blustream Power Products\" not in source; model CMX88AB inferred from manual title."
- "TCP port not stated in source"
- "source lists default username \"blustream\" / password \"1234\" under \"TCP/IP\" section, likely for web UI, but no auth procedure documented for Telnet control"
- "STATUS response format not documented in source"
- "no discrete settable parameters beyond Actions"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no additional safety warnings in source"
- "STATUS response payload format not documented."
- "TCP port for Telnet control not stated."
- "whether default username/password applies to Telnet control or only web UI."
- "firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
