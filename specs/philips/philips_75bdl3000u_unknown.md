---
spec_id: admin/philips-75bdl3000u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips 75BDL3000U Control Spec"
manufacturer: Philips
model_family: 75BDL3000U
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - 75BDL3000U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.westan.com.au
  - documents.philips.com
  - usermanual.wiki
  - manua.ls
  - manualmachine.com
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.documents.philips.com/assets/20230531/1d31b1c986c749819d4db0130063e3ea.pdf
  - https://usermanual.wiki/Philips/75BDL3000U00.368710959.pdf
  - https://www.manua.ls/philips/signage-solutions-75bdl3000u/manual
  - https://manualmachine.com/philips/75bdl3000u00/8076874-user-manual/
retrieved_at: 2026-05-18T22:27:39.315Z
last_checked_at: 2026-06-09T23:59:13.408Z
generated_at: 2026-06-09T23:59:13.408Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model firmware version not stated. UNRESOLVED: which specific models support SICP over IP (source only says \"for the models that supports\")."
  - "applies only to IP-capable models"
  - "source contains no query/response strings or acknowledgement patterns"
  - "response format for volume queries not documented"
  - "source contains no unsolicited event/notification patterns"
  - "source contains no explicit multi-step macro sequences"
  - "source contains no safety warnings or interlock procedures"
  - "full command table for SICP v1.99 beyond listed subset. UNRESOLVED: SICP over IP models list. UNRESOLVED: response format for queries."
verification:
  verdict: verified
  checked_at: 2026-06-09T23:59:13.408Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec actions match source commands; transport verified; full coverage of source command catalogue. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Philips 75BDL3000U Control Spec

## Summary
Professional signage display supporting RS-232 (SICP) and TCP/IP (SICP over IP) control. Serial config: 9600/8/N/1. IP port: 5000. Commands for power, input routing, volume, and tiling.

<!-- UNRESOLVED: model firmware version not stated. UNRESOLVED: which specific models support SICP over IP (source only says "for the models that supports"). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 5000  # SICP over IP default port; UNRESOLVED: applies only to IP-capable models
serial:
  baud_rate: 9600
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
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  hex: "06 00 00 18 02 1C"

- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: "06 00 00 18 01 1F"

- id: input_hdmi
  label: Select HDMI
  kind: action
  params: []
  hex: "09 00 00 AC 0D 00 01 00 A9"

- id: input_hdmi2
  label: Select HDMI2
  kind: action
  params: []
  hex: "09 00 00 AC 06 00 01 00 A2"

- id: input_hdmi3
  label: Select HDMI3
  kind: action
  params: []
  hex: "09 00 00 AC 0F 00 01 00 AB"

- id: input_hdmi4
  label: Select HDMI4
  kind: action
  params: []
  hex: "09 00 00 AC 19 00 01 00 BD"

- id: input_vga
  label: Select VGA
  kind: action
  params: []
  hex: "09 00 00 AC 05 00 01 00 A1"

- id: input_dvi_d
  label: Select DVI-D
  kind: action
  params: []
  hex: "09 00 00 AC 0E 00 01 00 AA"

- id: input_usb
  label: Select USB
  kind: action
  params: []
  hex: "09 00 00 AC 0C 00 01 00 A8"

- id: input_custom
  label: Select Custom
  kind: action
  params: []
  hex: "09 00 00 AC 18 00 01 00 BC"

- id: volume_up
  label: Volume Up (speaker + audio out)
  kind: action
  params: []
  hex: "07 00 00 41 01 01 46"

- id: volume_down
  label: Volume Down (speaker + audio out)
  kind: action
  params: []
  hex: "07 00 00 41 00 00 46"

- id: volume_audio_up
  label: Volume Up (audio out only)
  kind: action
  params: []
  hex: "07 00 00 41 02 01 45"

- id: volume_audio_down
  label: Volume Down (audio out only)
  kind: action
  params: []
  hex: "07 00 00 41 02 00 44"

- id: volume_mute
  label: Volume Mute
  kind: action
  params: []
  hex: "06 00 00 47 01 40"

- id: volume_unmute
  label: Volume Unmute
  kind: action
  params: []
  hex: "06 00 00 47 00 41"

- id: enable_tiling
  label: Enable Tiling
  kind: action
  params: []
  hex: "09 00 00 22 01 02 00 00 1C"

- id: disable_tiling
  label: Disable Tiling
  kind: action
  params: []
  hex: "09 00 00 22 00 02 00 00 1D"
- id: volume_set
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: enum
      values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  hex: UNRESOLVED
```

## Feedbacks
```yaml
# UNRESOLVED: source contains no query/response strings or acknowledgement patterns
```

## Variables
```yaml
# Direct volume level commands (0-100):
# Level value encoded in byte 4 (e.g., 0x0A = 10, 0x64 = 100)
# Max volume 60 on most models; 75BDL3151T uses 115200 baud (exception)
# UNRESOLVED: response format for volume queries not documented
```

## Events
```yaml
# UNRESOLVED: source contains no unsolicited event/notification patterns
```

## Macros
```yaml
# UNRESOLVED: source contains no explicit multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures
```

## Notes
Baud rate exception: 75BDL3151T uses 115200 instead of 9600. Most models cap volume at 60. SICP over IP port 5000 applies only to IP-capable models (unspecified which).
<!-- UNRESOLVED: full command table for SICP v1.99 beyond listed subset. UNRESOLVED: SICP over IP models list. UNRESOLVED: response format for queries. -->

## Provenance

```yaml
source_domains:
  - support.westan.com.au
  - documents.philips.com
  - usermanual.wiki
  - manua.ls
  - manualmachine.com
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.documents.philips.com/assets/20230531/1d31b1c986c749819d4db0130063e3ea.pdf
  - https://usermanual.wiki/Philips/75BDL3000U00.368710959.pdf
  - https://www.manua.ls/philips/signage-solutions-75bdl3000u/manual
  - https://manualmachine.com/philips/75bdl3000u00/8076874-user-manual/
retrieved_at: 2026-05-18T22:27:39.315Z
last_checked_at: 2026-06-09T23:59:13.408Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T23:59:13.408Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec actions match source commands; transport verified; full coverage of source command catalogue. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model firmware version not stated. UNRESOLVED: which specific models support SICP over IP (source only says \"for the models that supports\")."
- "applies only to IP-capable models"
- "source contains no query/response strings or acknowledgement patterns"
- "response format for volume queries not documented"
- "source contains no unsolicited event/notification patterns"
- "source contains no explicit multi-step macro sequences"
- "source contains no safety warnings or interlock procedures"
- "full command table for SICP v1.99 beyond listed subset. UNRESOLVED: SICP over IP models list. UNRESOLVED: response format for queries."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
