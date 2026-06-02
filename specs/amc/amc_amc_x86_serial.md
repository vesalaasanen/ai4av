---
spec_id: admin/amc-amc-x86
schema_version: ai4av-public-spec-v1
revision: 1
title: "AMC X86 Control Spec"
manufacturer: AMC
model_family: "AMC X86"
aliases: []
compatible_with:
  manufacturers:
    - AMC
  models:
    - "AMC X86"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - amchome.com
  - manualslib.com
source_urls:
  - "https://amchome.com/files/X-SERIES%20RS232%20MANUAL.pdf"
  - https://www.manualslib.com/manual/3844181/Amc-X86.html
  - https://amchome.com/smart/amc-x86i/
retrieved_at: 2026-05-20T18:25:47.403Z
last_checked_at: 2026-06-02T21:39:38.927Z
generated_at: 2026-06-02T21:39:38.927Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "command/return/error reference tables were embedded images (omitted from refined source); only text descriptions available. Some XOir-specific command variants present but not applicable to X86."
  - "no settable persistent variables beyond action params identified in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "command/return/error reference tables were images omitted from refined source; complete command list may be larger"
  - "firmware version compatibility not stated"
  - "maximum concurrent connection or command queuing behavior not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:39:38.927Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 zone/system control commands found in source with correct ASCII format (prefix *), command syntax (ZNnn), parameters (zone 01-06, source 01-08), and responses. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# AMC X86 Control Spec

## Summary
AMC X86 multi-zone audio distribution amplifier controlled via RS-232C serial. Supports up to 6 zones with 8 source inputs. Commands are ASCII strings prefixed with `*` and terminated with `<CR>` (0x0D). 500ms inter-command delay required.

<!-- UNRESOLVED: command/return/error reference tables were embedded images (omitted from refined source); only text descriptions available. Some XOir-specific command variants present but not applicable to X86. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # power on/off/toggle commands present
  - queryable     # zone status and tone control query commands present
  - levelable     # volume and tone control commands present
  - routable      # source select commands present
```

## Actions
```yaml
actions:
  - id: zone_status
    label: Zone Status
    kind: query
    command: "*ZNnnSTA00\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number (X86 range 01-06)
    response: Standard Status Feedback

  - id: tone_control_settings
    label: Tone Control Settings
    kind: query
    command: "*ZNnnSET00\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number
    response: ZNaa,BASSbb,TREBbb,GRPc

  - id: power_off
    label: Power Off
    kind: action
    command: "*ZNnnPWR00\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number (turns off ALL zones in group mode and leaves group mode)
    response: Standard Status Feedback

  - id: power_on
    label: Power On
    kind: action
    command: "*ZNnnPWR01\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number (restores last source and volume)
    response: Standard Status Feedback

  - id: power_toggle
    label: Power Toggle
    kind: action
    command: "*ZNnnPWR02\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number
    response: Standard Status Feedback

  - id: all_zones_off
    label: All Zones Off
    kind: action
    command: "*ZALLPWR00\r"
    params: []
    response: ZALLOFF

  - id: all_zones_mute_off
    label: Un-mute All Zones
    kind: action
    command: "*ZALLMUT00\r"
    params: []
    response: ZALLMOFF

  - id: all_zones_mute_on
    label: Mute All Zones
    kind: action
    command: "*ZALLMUT01\r"
    params: []
    response: ZALLMON

  - id: source_select
    label: Source Select
    kind: action
    command: "*ZNnnSRCss\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number
      - name: source
        type: integer
        min: 1
        max: 8
        description: Input source (X86 range 01-08)
    response: Standard Status Feedback

  - id: volume_set
    label: Set Volume
    kind: action
    command: "*ZNnnVOLvv\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number
      - name: volume
        type: integer
        min: 0
        max: 62
        description: Volume level (00-62, where 62=mute, in dB attenuation)
    response: Standard Status Feedback

  - id: volume_up
    label: Volume Up 1dB
    kind: action
    command: "*ZNnnVOLUP\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number
    response: Standard Status Feedback

  - id: volume_down
    label: Volume Down 1dB
    kind: action
    command: "*ZNnnVOLDN\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number
    response: Standard Status Feedback

  - id: zone_mute_off
    label: Zone Mute Off
    kind: action
    command: "*ZNnnMUT00\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number (restores last volume)
    response: Standard Status Feedback

  - id: zone_mute_on
    label: Zone Mute On
    kind: action
    command: "*ZNnnMUT01\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number (memorizes current volume)
    response: Standard Status Feedback

  - id: bass_adjust
    label: Adjust Bass
    kind: action
    command: "*ZNnnBASsn\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number
      - name: sign
        type: enum
        values: ["+", "-"]
        description: Adjustment direction
      - name: level
        type: enum
        values: [0, 4, 6, 8]
        description: Bass adjustment level in dB
    response: ZNaa,BASSbb,TREBbb,GRPc

  - id: treble_adjust
    label: Adjust Treble
    kind: action
    command: "*ZNnnTRBsn\r"
    params:
      - name: zone
        type: integer
        min: 1
        max: 6
        description: Zone number
      - name: sign
        type: enum
        values: ["+", "-"]
        description: Adjustment direction
      - name: level
        type: enum
        values: [0, 4, 6, 8]
        description: Treble adjustment level in dB
    response: ZNaa,BASSbb,TREBbb,GRPc

  - id: group_mode_off
    label: Group Mode Off
    kind: action
    command: "*ZALLGRP00\r"
    params: []
    response: GRPOFF

  - id: group_mode_on
    label: Group Mode On
    kind: action
    command: "*ZALLGRPss\r"
    params:
      - name: source
        type: integer
        min: 1
        max: 8
        description: Input source for the group
    response: GRPON,STCss
```

## Feedbacks
```yaml
feedbacks:
  - id: zone_status
    type: string
    format: "ZNaa,SRCbb,GRPc,VOL-dd"
    description: Standard status feedback
    fields:
      - name: zone
        regex_group: aa
        description: Zone number
      - name: source
        regex_group: bb
        description: Source select
      - name: group_mode
        regex_group: c
        values: ["0", "1"]
        description: "0=Group Mode Off, 1=Group Mode On"
      - name: volume
        regex_group: dd
        description: "dB attenuation (00-62, 62=mute)"

  - id: tone_status
    type: string
    format: "ZNaa,BASSbb,TREBbb,GRPc"
    description: Tone control settings feedback
    fields:
      - name: zone
        regex_group: aa
        description: Zone number
      - name: bass
        regex_group: bb
        description: "EQ level +/- 8,6,4,0"
      - name: treble
        regex_group: bb
        description: "EQ level +/- 8,6,4,0"
      - name: group_mode
        regex_group: c
        values: ["0", "1"]
        description: "0=Group Mode Off, 1=Group Mode On"

  - id: all_zones_off
    type: string
    value: "ZALLOFF"
    description: All zones powered off

  - id: all_mute_on
    type: string
    value: "ZALLMON"
    description: All zones muted

  - id: all_mute_off
    type: string
    value: "ZALLMOFF"
    description: All zones un-muted

  - id: group_off
    type: string
    value: "GRPOFF"
    description: Group mode disabled

  - id: group_on
    type: string
    format: "GRPON,STCss"
    description: Group mode activated
    fields:
      - name: source
        regex_group: ss
        description: Input source selected for group

  - id: error
    type: string
    value: "?"
    description: Error or incorrect syntax response
```

## Events
```yaml
events:
  - id: keypad_status_update
    description: >
      Unsolicited status feedback sent on any keypad key press in any zone.
      Uses Standard Status Feedback Format (ZNaa,SRCbb,GRPc,VOL-dd).

  - id: ir_status_update
    description: >
      Unsolicited status feedback sent on any IR command received.
      Uses Standard Status Feedback Format (ZNaa,SRCbb,GRPc,VOL-dd).

  - id: all_zones_off_notification
    description: >
      When power button is held on a keypad to turn off ALL zones, two responses
      are sent: normal status feedback followed by ZALLOFF.
```

## Variables
```yaml
# UNRESOLVED: no settable persistent variables beyond action params identified in source
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
- 500ms delay required between all commands.
- All commands are ASCII, prefixed with `*` and terminated with `<CR>` (0x0D hex).
- Error response is `?<CR>` for invalid syntax or failed commands.
- Zone parameter `nn` uses zero-padded two-digit format (e.g. 01-06 for X86).
- Source parameter `ss` uses zero-padded two-digit format (e.g. 01-08 for X86).
- Volume range 00-62 represents dB of attenuation; 62 = mute.
- Power off in group mode turns off ALL zones in the group and exits group mode.
- Group mode ON requires specifying a source input for the entire group.
- Bass/treble for non-XOir models (including X86) use discrete steps: 0, 4, 6, 8 dB with +/- sign.
<!-- UNRESOLVED: command/return/error reference tables were images omitted from refined source; complete command list may be larger -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: maximum concurrent connection or command queuing behavior not stated -->

## Provenance

```yaml
source_domains:
  - amchome.com
  - manualslib.com
source_urls:
  - "https://amchome.com/files/X-SERIES%20RS232%20MANUAL.pdf"
  - https://www.manualslib.com/manual/3844181/Amc-X86.html
  - https://amchome.com/smart/amc-x86i/
retrieved_at: 2026-05-20T18:25:47.403Z
last_checked_at: 2026-06-02T21:39:38.927Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:39:38.927Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 zone/system control commands found in source with correct ASCII format (prefix *), command syntax (ZNnn), parameters (zone 01-06, source 01-08), and responses. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "command/return/error reference tables were embedded images (omitted from refined source); only text descriptions available. Some XOir-specific command variants present but not applicable to X86."
- "no settable persistent variables beyond action params identified in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "command/return/error reference tables were images omitted from refined source; complete command list may be larger"
- "firmware version compatibility not stated"
- "maximum concurrent connection or command queuing behavior not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
