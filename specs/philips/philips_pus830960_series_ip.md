---
spec_id: admin/philips-pus830960-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips PUS830960 Series Control Spec"
manufacturer: Philips
model_family: "PUS830960 Series"
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - "PUS830960 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.westan.com.au
  - digis.ru
  - keydigital.org
  - applicationmarket.crestron.com
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.digis.ru/upload/iblock/bb4/SICP_application_note_v1.6.pdf
  - "https://www.keydigital.org/web/content/160298/ModuleManual_Philips%20Professional%20Displays.pdf"
  - "https://applicationmarket.crestron.com/content/Help/Phillips/Phillips%20SICP%20Display%20RS232%20v1.0%20Help.pdf"
retrieved_at: 2026-05-25T01:04:47.860Z
last_checked_at: 2026-10-01T10:43:36.087Z
generated_at: 2026-10-01T10:43:36.087Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device class (consumer TV vs commercial display) not confirmed in source"
  - "no response/acknowledgement strings documented in source"
  - "no query commands returning state documented in source"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "whether PUS830960 Series supports SICP over IP — source is generic BDL protocol doc, not model-specific"
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-10-01T10:43:36.087Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions match source hex sequences verbatim; transport values (TCP 5000, 9600/8N1, flow none) all confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-25
---

# Philips PUS830960 Series Control Spec

## Summary
Philips commercial display series supporting SICP (Serial/IP Control) protocol over TCP/IP and RS-232. Controls power, input selection, volume, and display tiling. Default TCP port 5000.

<!-- UNRESOLVED: device class (consumer TV vs commercial display) not confirmed in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5000  # stated: default TCP port for SICP over IP
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # stated: Flow Control None
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input selection commands present (HDMI1-4, VGA, DVI-D, USB, Custom)
- levelable       # volume control with up/down/mute/set commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: HEX 06 00 00 18 02 1C

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: HEX 06 00 00 18 01 1F

- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: string
      enum: [hdmi1, hdmi2, hdmi3, hdmi4, vga, dvi-d, usb, custom]
      description: Input source to select

- id: volume_up
  label: Volume Up (Speaker + Audio Out)
  kind: action
  params: []
  notes: HEX 07 00 00 41 01 01 46

- id: volume_down
  label: Volume Down (Speaker + Audio Out)
  kind: action
  params: []
  notes: HEX 07 00 00 41 00 00 46

- id: volume_audio_up
  label: Volume Up (Audio Out Only)
  kind: action
  params: []
  notes: HEX 07 00 00 41 02 01 45

- id: volume_audio_down
  label: Volume Down (Audio Out Only)
  kind: action
  params: []
  notes: HEX 07 00 00 41 02 00 44

- id: volume_mute
  label: Volume Mute
  kind: action
  params: []
  notes: HEX 06 00 00 47 01 40

- id: volume_unmute
  label: Volume Unmute
  kind: action
  params: []
  notes: HEX 06 00 00 47 00 41

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: Volume level 0-100. Most models cap at 60.

- id: tiling_enable
  label: Enable Tiling
  kind: action
  params: []
  notes: HEX 09 00 00 22 01 02 00 00 1C

- id: tiling_disable
  label: Disable Tiling
  kind: action
  params: []
  notes: HEX 09 00 00 22 00 02 00 00 1D
```

## Feedbacks
```yaml
# UNRESOLVED: no response/acknowledgement strings documented in source
```

## Variables
```yaml
# UNRESOLVED: no query commands returning state documented in source
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
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Source document titled "BDL SICP Commonly Used Protocol (V 1.89 onwards)" — BDL series is Philips commercial display line. SICP over IP default port TCP 5000. Serial config: 9600/8N1 except BDL3151T which uses 115200 baud. Volume range 0-100, most models max at 60.
<!-- UNRESOLVED: whether PUS830960 Series supports SICP over IP — source is generic BDL protocol doc, not model-specific -->

## Provenance

```yaml
source_domains:
  - support.westan.com.au
  - digis.ru
  - keydigital.org
  - applicationmarket.crestron.com
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.digis.ru/upload/iblock/bb4/SICP_application_note_v1.6.pdf
  - "https://www.keydigital.org/web/content/160298/ModuleManual_Philips%20Professional%20Displays.pdf"
  - "https://applicationmarket.crestron.com/content/Help/Phillips/Phillips%20SICP%20Display%20RS232%20v1.0%20Help.pdf"
retrieved_at: 2026-05-25T01:04:47.860Z
last_checked_at: 2026-10-01T10:43:36.087Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T10:43:36.087Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions match source hex sequences verbatim; transport values (TCP 5000, 9600/8N1, flow none) all confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device class (consumer TV vs commercial display) not confirmed in source"
- "no response/acknowledgement strings documented in source"
- "no query commands returning state documented in source"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "whether PUS830960 Series supports SICP over IP — source is generic BDL protocol doc, not model-specific"
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
