---
spec_id: admin/philips-86bdl3050q
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips 86BDL3050Q Control Spec"
manufacturer: Philips
model_family: 86BDL3050Q
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - 86BDL3050Q
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.westan.com.au
  - documents.philips.com
  - community.xibo.org.uk
  - manua.ls
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.documents.philips.com/assets/20230607/88dbcd5efe9d41208de8b01a01393f81.pdf
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.documents.philips.com/assets/20230602/491ddcc4ff8348579bf1b01500f04353.pdf
  - https://www.manua.ls/philips/signage-solutions-86bdl3050q/manual
retrieved_at: 2026-09-16T16:40:57.447Z
last_checked_at: 2026-09-18T22:16:25.872Z
generated_at: 2026-09-18T22:16:25.872Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source; full SICP command catalogue beyond the commonly-used subset not provided"
  - "source lists command set only; no query/response strings documented"
  - "source lists command set only; no settable parameter values beyond volume range documented"
  - "source lists command set only; no unsolicited notification format documented"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "checksum algorithm not stated in source; full SICP command set beyond commonly-used subset not provided"
verification:
  verdict: verified
  checked_at: 2026-09-18T22:16:25.872Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec hex commands appear verbatim in the refined source; transport (9600 8N1, TCP 5000) is documented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-16
---

# Philips 86BDL3050Q Control Spec

## Summary
Spec covers Philips 86BDL3050Q professional display controlled via Philips SICP (Serial/IP Control Protocol) v1.99. Supports RS-232 serial and TCP/IP (port 5000) transports. Source document is the BDL SICP Commonly Used Protocol command list (v1.89 onwards).

<!-- UNRESOLVED: firmware version compatibility not stated in source; full SICP command catalogue beyond the commonly-used subset not provided -->

## Transport
```yaml
protocols:
  - serial
  - tcp # inferred from SICP-over-IP mention
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 5000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power on/off commands
- routable        # inferred from input select commands
- levelable       # inferred from volume commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "06 00 00 18 02 1C"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "06 00 00 18 01 1F"
  params: []

- id: input_hdmi1
  label: Input HDMI1
  kind: action
  command: "09 00 00 AC 0D 00 01 00 A9"
  params: []

- id: input_hdmi2
  label: Input HDMI2
  kind: action
  command: "09 00 00 AC 06 00 01 00 A2"
  params: []

- id: input_hdmi3
  label: Input HDMI3
  kind: action
  command: "09 00 00 AC 0F 00 01 00 AB"
  params: []

- id: input_hdmi4
  label: Input HDMI4
  kind: action
  command: "09 00 00 AC 19 00 01 00 BD"
  params: []

- id: input_vga
  label: Input VGA
  kind: action
  command: "09 00 00 AC 05 00 01 00 A1"
  params: []

- id: input_dvi_d
  label: Input DVI-D
  kind: action
  command: "09 00 00 AC 0E 00 01 00 AA"
  params: []

- id: input_usb
  label: Input USB
  kind: action
  command: "09 00 00 AC 0C 00 01 00 A8"
  params: []

- id: input_custom
  label: Input Custom
  kind: action
  command: "09 00 00 AC 18 00 01 00 BC"
  params: []

- id: volume_speaker_audio_out_up
  label: Volume (speaker and audio out) Up
  kind: action
  command: "07 00 00 41 01 01 46"
  params: []

- id: volume_speaker_audio_out_down
  label: Volume (speaker and audio out) Down
  kind: action
  command: "07 00 00 41 00 00 46"
  params: []

- id: volume_audio_out_up
  label: Volume (audio out) Up
  kind: action
  command: "07 00 00 41 02 01 45"
  params: []

- id: volume_audio_out_down
  label: Volume (audio out) Down
  kind: action
  command: "07 00 00 41 02 00 44"
  params: []

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "06 00 00 47 01 40"
  params: []

- id: volume_unmute
  label: Volume Unmute
  kind: action
  command: "06 00 00 47 00 41"
  params: []

- id: volume_set
  label: Volume Set
  kind: action
  command: "07 00 00 44 {level} {level} {checksum}"
  params:
    - name: level
      type: integer
      description: Volume level (0-100 in10-step increments per source examples; most models max 60)
    - name: checksum
      type: integer
      description: Checksum byte (computed from preceding payload bytes; exact algorithm not stated in source)

- id: tiling_enable
  label: Enable Tiling
  kind: action
  command: "09 00 00 22 01 02 00 00 1C"
  params: []

- id: tiling_disable
  label: Disable Tiling
  kind: action
  command: "09 00 00 22 00 02 00 00 1D"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source lists command set only; no query/response strings documented
```

## Variables
```yaml
# UNRESOLVED: source lists command set only; no settable parameter values beyond volume range documented
```

## Events
```yaml
# UNRESOLVED: source lists command set only; no unsolicited notification format documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Source is the BDL SICP Commonly Used Protocol extract (v1.89 onwards, command doc v1.99). Covers commonly-used subset only; full SICP catalogue at the SharePoint link in source is not transcribed. Exception noted in source: 75BDL3151T uses baud115200 (not9600) — 86BDL3050Q uses 9600 per default. Volume set payload uses repeating level byte pattern (e.g. `0A 0A` for 10); checksum byte and exact algorithm not documented in this excerpt.

<!-- UNRESOLVED: checksum algorithm not stated in source; full SICP command set beyond commonly-used subset not provided -->

## Provenance

```yaml
source_domains:
  - support.westan.com.au
  - documents.philips.com
  - community.xibo.org.uk
  - manua.ls
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.documents.philips.com/assets/20230607/88dbcd5efe9d41208de8b01a01393f81.pdf
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.documents.philips.com/assets/20230602/491ddcc4ff8348579bf1b01500f04353.pdf
  - https://www.manua.ls/philips/signage-solutions-86bdl3050q/manual
retrieved_at: 2026-09-16T16:40:57.447Z
last_checked_at: 2026-09-18T22:16:25.872Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-18T22:16:25.872Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec hex commands appear verbatim in the refined source; transport (9600 8N1, TCP 5000) is documented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source; full SICP command catalogue beyond the commonly-used subset not provided"
- "source lists command set only; no query/response strings documented"
- "source lists command set only; no settable parameter values beyond volume range documented"
- "source lists command set only; no unsolicited notification format documented"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "checksum algorithm not stated in source; full SICP command set beyond commonly-used subset not provided"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
