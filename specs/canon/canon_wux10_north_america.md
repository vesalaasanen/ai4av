---
spec_id: admin/canon-wux10
schema_version: ai4av-public-spec-v1
revision: 1
title: "Canon WUX10 Control Spec"
manufacturer: Canon
model_family: "WUX10 (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Canon
  models:
    - "WUX10 (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - downloads.canon.com
source_urls:
  - https://downloads.canon.com/cpr/software/projectors/REALiS_WUX10_User-Manual.pdf
retrieved_at: 2026-09-26T14:23:19.942Z
last_checked_at: 2026-09-26T14:23:19.942Z
generated_at: 2026-09-26T14:23:19.942Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "response format for GET commands not documented in source"
  - "valid value ranges for brightness, sharpness, contrast not stated in source"
  - "inter-command spacing and retry timing not documented in source"
  - "valid range not stated in source"
  - "response format not documented in source"
  - "value range and response format not documented in source"
  - "no settable continuous parameters with documented ranges found in source"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "response/acknowledgement format for all commands not documented"
  - "minimum delay between commands not documented"
  - "error response format not documented"
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:19.942Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "Exact original WUX10 full-manual scope verified:11 parameterized serial actions plus9 explicit GET units cover all p136 families and selector values;ASCII/hex/CR,19200 8N2,pinout,cooling and restart guidance match;no MarkII commands or undocumented HTTP wire API imported;auth,numeric bounds and literal replies remain unresolved. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Canon WUX10 Control Spec

## Summary

Canon WUX10 is a WUXGA resolution projector with RS-232-C serial control via a D-Sub 9-pin service port. This spec covers power, input selection, image mode, brightness, sharpness, contrast, aspect ratio, lamp mode, and blank commands over asynchronous half-duplex serial communication at 19,200 bps.

This specification covers the serial command table on p.136 of the original WUX10 User Manual. The full manual also documents browser-based network control on pp.103–114, but does not supply its HTTP wire API. No WUX10 MarkII compatibility or MarkII command expansion is asserted.
<!-- UNRESOLVED: response format for GET commands not documented in source -->
<!-- UNRESOLVED: valid value ranges for brightness, sharpness, contrast not stated in source -->
<!-- UNRESOLVED: inter-command spacing and retry timing not documented in source -->

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
  type: UNRESOLVED  # serial authentication requirements are not stated
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
        values: ["AUTO", "FULL", "16:9", "4:3", "ZOOM", "TRUE"]
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
    values: ["AUTO", "FULL", "16:9", "4:3", "ZOOM", "TRUE"]  # UNRESOLVED: response format not documented in source

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
# Source pp.42,62: cannot turn on while cooling fan operates; wait at least five minutes after turning off before turning on.
# Lamp handling is documented in the full manual; these are physical restrictions, not an invented serial handshake.
```

## Notes

- All commands are ASCII text terminated with `<CR>` (0x0D).
- The serial port uses a D-Sub 9-pin connector with only pins 2 (RxD), 3 (TxD), and 5 (GND) active.
- Communication is half-duplex — commands are sent one at a time.
- The source provides hex byte representations alongside ASCII commands, confirming the command encoding.

<!-- UNRESOLVED: response/acknowledgement format for all commands not documented -->
<!-- UNRESOLVED: minimum delay between commands not documented -->
The full manual p.42 describes an approximately 20-second projection countdown. Serial command acceptance during that period is UNRESOLVED.
The full manual pp.42 and 62 says to wait at least five minutes before turning on after turning off, and that power-on is unavailable while the cooling fan operates. No exact cooling-fan duration is specified.
<!-- UNRESOLVED: error response format not documented -->

Primary source: https://downloads.canon.com/cpr/software/projectors/REALiS_WUX10_User-Manual.pdf (original WUX10, 144 pages). Full control-command table reviewed on p.136. The ASCII BLANK=OFF row has a stray printed 42h after <CR>; the separate complete hex row confirms BLANK=OFF followed by one CR. The six input values, four image presets, six aspects and two lamp modes are parameter domains of their respective mnemonic families. Returned values listed in Feedbacks are logical state domains only; actual reply bytes and encodings remain UNRESOLVED. Hardware untested.

## Provenance

```yaml
source_domains:
  - downloads.canon.com
source_urls:
  - https://downloads.canon.com/cpr/software/projectors/REALiS_WUX10_User-Manual.pdf
retrieved_at: 2026-09-26T14:23:19.942Z
last_checked_at: 2026-09-26T14:23:19.942Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:19.942Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "Exact original WUX10 full-manual scope verified:11 parameterized serial actions plus9 explicit GET units cover all p136 families and selector values;ASCII/hex/CR,19200 8N2,pinout,cooling and restart guidance match;no MarkII commands or undocumented HTTP wire API imported;auth,numeric bounds and literal replies remain unresolved. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "response format for GET commands not documented in source"
- "valid value ranges for brightness, sharpness, contrast not stated in source"
- "inter-command spacing and retry timing not documented in source"
- "valid range not stated in source"
- "response format not documented in source"
- "value range and response format not documented in source"
- "no settable continuous parameters with documented ranges found in source"
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "response/acknowledgement format for all commands not documented"
- "minimum delay between commands not documented"
- "error response format not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
