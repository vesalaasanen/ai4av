---
schema_version: ai4av-public-spec-v1
device_id: canon/wux10-north-america
entity_id: canon_wux10_north_america
spec_id: admin/canon-wux10
revision: 1
author: admin
title: "Canon WUX10 Control Spec"
status: published
manufacturer: Canon
manufacturer_key: canon
model_family: "WUX10 (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Canon
  models:
    - "WUX10 (North America)"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: canon_wux10_north_america.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:28:50.519Z
retrieved_at: 2026-04-23T15:28:50.519Z
last_checked_at: 2026-04-23T15:28:50.519Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:28:50.519Z
  matched_actions: 20
  action_count: 20
  confidence: high
  summary: "All 20 spec actions matched literally in source; transport parameters verified; complete command coverage with no fabricated or drifted commands."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Canon WUX10 Control Spec

## Summary

Canon WUX10 is a WUXGA resolution projector with RS-232-C serial control via a D-Sub 9-pin service port. This spec covers power, input selection, image mode, brightness, sharpness, contrast, aspect ratio, lamp mode, and blank commands over asynchronous half-duplex serial communication at 19,200 bps.

<!-- UNRESOLVED: no TCP/IP or network control protocol documented in source -->
<!-- UNRESOLVED: response format for GET commands not documented in source -->
<!-- UNRESOLVED: valid value ranges for brightness, sharpness, contrast not stated in source -->
<!-- UNRESOLVED: command timing, delays, or retry behavior not documented in source -->

## Transport

```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 2
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
traits:
  - powerable    # inferred from POWER ON/OFF commands
  - routable     # inferred from INPUT= commands
  - queryable    # inferred from GET commands
  - levelable    # inferred from BRI, SHARP, CONT setting commands
```

## Actions

```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "POWER ON\r"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "POWER OFF\r"
    params: []

  - id: select_input
    label: Select Input
    kind: action
    command: "INPUT={input}\r"
    params:
      - name: input
        type: enum
        values: [D-RGB, HDMI, A-RGB1, A-RGB2, COMP, VIDEO]
        description: "Input source selection"

  - id: set_image_mode
    label: Set Image Mode
    kind: action
    command: "IMAGE={mode}\r"
    params:
      - name: mode
        type: enum
        values: [STANDARD, PRESENTATION, SRGB, MOVIE]
        description: "Image preset mode"

  - id: set_brightness
    label: Set Brightness
    kind: action
    command: "BRI={value}\r"
    params:
      - name: value
        type: integer
        description: "Brightness value"  # UNRESOLVED: valid range not stated in source

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: "SHARP={value}\r"
    params:
      - name: value
        type: integer
        description: "Sharpness value"  # UNRESOLVED: valid range not stated in source

  - id: set_contrast
    label: Set Contrast
    kind: action
    command: "CONT={value}\r"
    params:
      - name: value
        type: integer
        description: "Contrast value"  # UNRESOLVED: valid range not stated in source

  - id: set_aspect
    label: Set Aspect Ratio
    kind: action
    command: "ASPECT={ratio}\r"
    params:
      - name: ratio
        type: enum
        values: [AUTO, FULL, "16:9", "4:3", ZOOM, TRUE]
        description: "Aspect ratio mode"

  - id: set_lamp_mode
    label: Set Lamp Mode
    kind: action
    command: "LAMP={mode}\r"
    params:
      - name: mode
        type: enum
        values: [NORMAL, SILENT]
        description: "Lamp brightness mode"

  - id: blank_on
    label: Blank On
    kind: action
    command: "BLANK=ON\r"
    params: []

  - id: blank_off
    label: Blank Off
    kind: action
    command: "BLANK=OFF\r"
    params: []
```

## Feedbacks

```yaml
feedbacks:
  - id: power_state
    label: Power State
    query_command: "GET POWER\r"
    type: enum
    values: [ON, OFF]  # UNRESOLVED: response format not documented in source

  - id: input_state
    label: Current Input
    query_command: "GET INPUT\r"
    type: enum
    values: [D-RGB, HDMI, A-RGB1, A-RGB2, COMP, VIDEO]  # UNRESOLVED: response format not documented in source

  - id: image_mode
    label: Image Mode
    query_command: "GET IMAGE\r"
    type: enum
    values: [STANDARD, PRESENTATION, SRGB, MOVIE]  # UNRESOLVED: response format not documented in source

  - id: brightness
    label: Brightness
    query_command: "GET BRI\r"
    type: integer  # UNRESOLVED: value range and response format not documented in source

  - id: sharpness
    label: Sharpness
    query_command: "GET SHARP\r"
    type: integer  # UNRESOLVED: value range and response format not documented in source

  - id: contrast
    label: Contrast
    query_command: "GET CONT\r"
    type: integer  # UNRESOLVED: value range and response format not documented in source

  - id: aspect_ratio
    label: Aspect Ratio
    query_command: "GET ASPECT\r"
    type: enum
    values: [AUTO, FULL, "16:9", "4:3", ZOOM, TRUE]  # UNRESOLVED: response format not documented in source

  - id: lamp_mode
    label: Lamp Mode
    query_command: "GET LAMP\r"
    type: enum
    values: [NORMAL, SILENT]  # UNRESOLVED: response format not documented in source

  - id: blank_state
    label: Blank State
    query_command: "GET BLANK\r"
    type: enum
    values: [ON, OFF]  # UNRESOLVED: response format not documented in source
```

## Variables

```yaml
# UNRESOLVED: no settable continuous parameters with documented ranges found in source
# Brightness, sharpness, and contrast accept integer values but valid ranges are not stated
```

## Events

```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document power-on sequencing requirements, warm-up/cool-down
# delays, or interlock procedures. Projector lamp safety handling not specified.
```

## Notes

- All commands are ASCII text terminated with `<CR>` (0x0D).
- The serial port uses a D-Sub 9-pin connector with only pins 2 (RxD), 3 (TxD), and 5 (GND) active.
- Communication is half-duplex — commands are sent one at a time.
- The source provides hex byte representations alongside ASCII commands, confirming the command encoding.

<!-- UNRESOLVED: response/acknowledgement format for all commands not documented -->
<!-- UNRESOLVED: minimum delay between commands not documented -->
<!-- UNRESOLVED: warm-up time after power on not documented -->
<!-- UNRESOLVED: cool-down time after power off not documented -->
<!-- UNRESOLVED: error response format not documented -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: canon_wux10_north_america.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:28:50.519Z
retrieved_at: 2026-04-23T15:28:50.519Z
last_checked_at: 2026-04-23T15:28:50.519Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:28:50.519Z
matched_actions: 20
action_count: 20
confidence: high
summary: "All 20 spec actions matched literally in source; transport parameters verified; complete command coverage with no fabricated or drifted commands."
```

## Known Gaps

```yaml
[]
```
