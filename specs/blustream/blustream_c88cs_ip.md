---
schema_version: ai4av-public-spec-v1
device_id: blustream/c88cs
entity_id: blustream_c88cs
spec_id: admin/blustream-c88cs
revision: 1
author: admin
title: "Blustream C88CS Control Spec"
status: published
manufacturer: Blustream
manufacturer_key: blustream
model_family: C88CS
aliases: []
compatible_with:
  manufacturers:
    - Blustream
  models:
    - C88CS
    - CMX88AB
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
source_documents:
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:54.054Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:56.355Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:57.092Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:57.416Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:59.348Z
retrieved_at: 2026-04-29T08:34:59.348Z
last_checked_at: 2026-04-23T15:24:34.952Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:24:34.952Z
  matched_actions: 20
  action_count: 20
  confidence: high
  summary: "All 20 spec actions match source command reference verbatim; transport parameters verified; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Blustream C88CS Control Spec

## Summary

The Blustream C88CS (CMX88AB) is an 8×8 HDMI matrix switcher controllable via TCP/IP (Telnet) and RS-232 serial. Commands are ASCII strings terminated with a carriage return. This spec covers power control, input/output routing, EDID management, and system configuration commands documented in the vendor control protocol reference.

<!-- UNRESOLVED: exact TCP port number not stated in source (Telnet heading implies port 23 but not confirmed) -->
<!-- UNRESOLVED: source document title references CMX88AB — relationship to C88CS marketing name not clarified -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: port number not stated in source
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: basic  # inferred: source states default username "blustream" and password "1234"
  default_username: blustream
  default_password: "1234"
```

## Traits
```yaml
traits:
  - powerable   # PON / POFF commands
  - routable    # OUTxxFRyy routing commands
  - queryable   # STATUS query command
```

## Actions
```yaml
actions:
  - id: help
    label: Print Help
    kind: action
    command: "?"
    params: []

  - id: help_alt
    label: Print Help
    kind: action
    command: "HELP"
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: PON
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: POFF
    params: []

  - id: output_on
    label: Output On
    kind: action
    command: OUTxxON
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08)"

  - id: output_off
    label: Output Off
    kind: action
    command: OUTxxOFF
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08)"

  - id: route_output
    label: Route Output from Input
    kind: action
    command: OUTxxFRyy
    params:
      - name: output
        type: integer
        description: "Output zone number (01-08)"
      - name: input
        type: integer
        description: "Input source number (01-08)"

  - id: ir_on
    label: IR Control On
    kind: action
    command: IRON
    params: []

  - id: ir_off
    label: IR Control Off
    kind: action
    command: IROFF
    params: []

  - id: key_lock_on
    label: Key Lock On
    kind: action
    command: KEYON
    params: []

  - id: key_lock_off
    label: Key Lock Off
    kind: action
    command: KEYOFF
    params: []

  - id: debug_on
    label: Debug Mode On
    kind: action
    command: DBGON
    params: []

  - id: debug_off
    label: Debug Mode Off
    kind: action
    command: DBGOFF
    params: []

  - id: beep_on
    label: Beep On
    kind: action
    command: BEEPON
    params: []

  - id: beep_off
    label: Beep Off
    kind: action
    command: BEEPOFF
    params: []

  - id: reset
    label: Reset to Defaults
    kind: action
    command: RESET
    params: []
    confirmation_required: true
    notes: Requires "Yes" to confirm, "No" to discard

  - id: factory_reset
    label: Restore Factory Settings
    kind: action
    command: RESETDEF
    params: []

  - id: edid_copy
    label: Copy EDID
    kind: action
    command: EDIDxxCPyy
    params:
      - name: input
        type: string
        description: "Input port (01-08, or 00 for all)"
      - name: output
        type: string
        description: "Output port (01-08, or 00 for all)"

  - id: edid_set_default
    label: Set EDID Default
    kind: action
    command: EDIDxxDFzz
    params:
      - name: input
        type: string
        description: "Input port (01-04, or 00 for all)"
      - name: edid_preset
        type: integer
        description: "EDID preset number (00-14)"
```

## Feedbacks
```yaml
feedbacks:
  - id: status
    label: System Status
    command: STATUS
    type: string
    description: Returns system status including zone on/off state and connection type
```

## Variables
```yaml
variables:
  - id: edid_preset
    label: EDID Default Preset
    type: enum
    values:
      - id: "00"
        label: HDMI 1080p@60Hz, Audio 2CH PCM
      - id: "01"
        label: HDMI 1080p@60Hz, Audio 5.1CH PCM/DTS/DOLBY
      - id: "02"
        label: HDMI 1080p@60Hz, Audio 7.1CH PCM/DTS/DOLBY/HD
      - id: "03"
        label: HDMI 1080i@60Hz, Audio 2CH PCM
      - id: "04"
        label: HDMI 1080i@60Hz, Audio 5.1CH PCM/DTS/DOLBY
      - id: "05"
        label: HDMI 1080i@60Hz, Audio 7.1CH PCM/DTS/DOLBY/HD
      - id: "06"
        label: HDMI 1080p@60Hz/3D, Audio 2CH PCM
      - id: "07"
        label: HDMI 1080p@60Hz/3D, Audio 5.1CH PCM/DTS/DOLBY
      - id: "08"
        label: HDMI 1080p@60Hz/3D, Audio 7.1CH PCM/DTS/DOLBY/HD
      - id: "09"
        label: HDMI 4K2K, Audio 2CH PCM
      - id: "10"
        label: HDMI 4K2K, Audio 5.1CH PCM/DTS/DOLBY
      - id: "11"
        label: HDMI 4K2K, Audio 7.1CH PCM/DTS/DOLBY/HD
      - id: "12"
        label: DVI 1280x1024@60Hz, Audio None
      - id: "13"
        label: DVI 1920x1080@60Hz, Audio None
      - id: "14"
        label: DVI 1920x1200@60Hz, Audio None
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - reset
interlocks: []
# Note: RESET command requires "Yes" confirmation per source. No other safety
# interlocks or power-on sequencing requirements documented.
```

## Notes
- Commands do not require spaces unless the control system mandates them. Example: `OUT01ON` not `OUT 01 ON`.
- A carriage return (`\r`, `0x0D`) is required after each command string. Some terminal programs use `<CR>` token.
- Default IP address (when no DHCP server): 192.168.0.200.
- IR hardware uses 5V (Blustream standard).
- RS-232 may require a straight or null-modem cable depending on the control device pin configuration.
- The matrix also has a built-in web browser interface for control and configuration.
<!-- UNRESOLVED: exact format of STATUS response not documented -->
<!-- UNRESOLVED: number of inputs/outputs ranges — source shows xx=01-08 for outputs but only 01-04 for EDID inputs; unclear if matrix is 8x8 or 4x8 -->
<!-- UNRESOLVED: whether commands work identically over TCP and RS-232 or have protocol-specific variations -->

## Provenance

```yaml
source_urls:
  - "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
source_documents:
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:54.054Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:56.355Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:57.092Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:57.416Z
  - title: "Blustream public source"
    url: "https://blustream.com.au/Attachment/DownloadFile?downloadId=192"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:34:59.348Z
retrieved_at: 2026-04-29T08:34:59.348Z
last_checked_at: 2026-04-23T15:24:34.952Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:24:34.952Z
matched_actions: 20
action_count: 20
confidence: high
summary: "All 20 spec actions match source command reference verbatim; transport parameters verified; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```
