---
spec_id: admin/philips-bfl2114-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips BFL2114 Series Control Spec"
manufacturer: Philips
model_family: "BFL2114 Series"
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - "BFL2114 Series"
    - "BDL Series (SICP-compatible models)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.westan.com.au
  - agneovo.com
  - keydigital.org
  - digis.ru
  - community.xibo.org.uk
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.agneovo.com/wp-content/uploads/2021/07/PM-32_RS232_CommandList1.pdf
  - "https://www.keydigital.org/web/content/160298/ModuleManual_Philips%20Professional%20Displays.pdf"
  - https://www.digis.ru/upload/iblock/bb4/SICP_application_note_v1.6.pdf
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
retrieved_at: 2026-05-19T06:48:42.634Z
last_checked_at: 2026-06-02T22:13:03.564Z
generated_at: 2026-06-02T22:13:03.564Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific BFL2114 model variants not enumerated in source"
  - "confirm BFL2114 supports IP control"
  - "no response/feedback strings documented in source"
  - "no query commands for current state found in source"
  - "no unsolicited notification format described in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "model-specific TCP/IP support not confirmed for BFL2114 specifically"
  - "response format for commands not documented"
  - "query commands for current power/input/volume state not found in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:13:03.564Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Philips BFL2114 Series Control Spec

## Summary
Philips professional signage display line supporting SICP (Serial Interface Communication Protocol) over RS-232 and TCP/IP. Controls include power, input routing, volume, and tiling. Serial config: 9600/8/N/1. TCP port 5000 for IP-connected models.

<!-- UNRESOLVED: specific BFL2114 model variants not enumerated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 5000  # SICP over IP default port; UNRESOLVED: confirm BFL2114 supports IP control
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
- powerable       # power on/off commands present
- routable        # input selection commands present
- levelable       # volume commands present (absolute levels 0-100)
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

- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: string
      description: Input source
      values:
        - hdmi
        - hdmi2
        - hdmi3
        - hdmi4
        - vga
        - dvi_d
        - usb
        - custom
  hex_mapping:
    hdmi:  "09 00 00 AC 0D 00 01 00 A9"
    hdmi2: "09 00 00 AC 06 00 01 00 A2"
    hdmi3: "09 00 00 AC 0F 00 01 00 AB"
    hdmi4: "09 00 00 AC 19 00 01 00 BD"
    vga:   "09 00 00 AC 05 00 01 00 A1"
    dvi_d: "09 00 00 AC 0E 00 01 00 AA"
    usb:   "09 00 00 AC 0C 00 01 00 A8"
    custom:"09 00 00 AC 18 00 01 00 BC"

- id: volume_up
  label: Volume Up (Speaker + Audio Out)
  kind: action
  params: []
  hex: "07 00 00 41 01 01 46"

- id: volume_down
  label: Volume Down (Speaker + Audio Out)
  kind: action
  params: []
  hex: "07 00 00 41 00 00 46"

- id: volume_audio_out_up
  label: Volume Up (Audio Out)
  kind: action
  params: []
  hex: "07 00 00 41 02 01 45"

- id: volume_audio_out_down
  label: Volume Down (Audio Out)
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

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0-100
  hex_mapping:
    "0":  "07 00 00 44 00 00 43"
    "10": "07 00 00 44 0A 0A 43"
    "20": "07 00 00 44 14 14 43"
    "30": "07 00 00 44 1E 1E 43"
    "40": "07 00 00 44 28 28 43"
    "50": "07 00 00 44 32 32 43"
    "60": "07 00 00 44 3C 3C 43"
    "70": "07 00 00 44 46 46 43"
    "80": "07 00 00 44 50 50 43"
    "90": "07 00 00 44 5A 5A 43"
    "100":"07 00 00 44 64 64 43"

- id: tiling_enable
  label: Enable Tiling
  kind: action
  params: []
  hex: "09 00 00 22 01 02 00 00 1C"

- id: tiling_disable
  label: Disable Tiling
  kind: action
  params: []
  hex: "09 00 00 22 00 02 00 00 1D"
```

## Feedbacks
```yaml
# UNRESOLVED: no response/feedback strings documented in source
```

## Variables
```yaml
# UNRESOLVED: no query commands for current state found in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification format described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- BFL2114 Series uses SICP protocol v1.89+ (same command structure as BDL series signage)
- Serial is primary control interface; TCP/IP support varies by model (source states "for the models that supports SICP over IP")
- Volume range 0-100; most models only support up to Volume 60 (max hardware limitation)
- 75BDL3151T uses baud rate 115200 instead of standard 9600 — exception noted in source
- No authentication required for either serial or TCP control
<!-- UNRESOLVED: model-specific TCP/IP support not confirmed for BFL2114 specifically -->
<!-- UNRESOLVED: response format for commands not documented -->
<!-- UNRESOLVED: query commands for current power/input/volume state not found in source -->

## Provenance

```yaml
source_domains:
  - support.westan.com.au
  - agneovo.com
  - keydigital.org
  - digis.ru
  - community.xibo.org.uk
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.agneovo.com/wp-content/uploads/2021/07/PM-32_RS232_CommandList1.pdf
  - "https://www.keydigital.org/web/content/160298/ModuleManual_Philips%20Professional%20Displays.pdf"
  - https://www.digis.ru/upload/iblock/bb4/SICP_application_note_v1.6.pdf
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
retrieved_at: 2026-05-19T06:48:42.634Z
last_checked_at: 2026-06-02T22:13:03.564Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:13:03.564Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific BFL2114 model variants not enumerated in source"
- "confirm BFL2114 supports IP control"
- "no response/feedback strings documented in source"
- "no query commands for current state found in source"
- "no unsolicited notification format described in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "model-specific TCP/IP support not confirmed for BFL2114 specifically"
- "response format for commands not documented"
- "query commands for current power/input/volume state not found in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
