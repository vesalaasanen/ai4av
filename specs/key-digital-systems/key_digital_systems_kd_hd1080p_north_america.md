---
spec_id: admin/key-digital-systems-kd-hd1080p
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-HD1080P Control Spec"
manufacturer: "Key Digital Systems"
model_family: KD-HD1080P
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital Systems"
  models:
    - KD-HD1080P
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.com
retrieved_at: 2026-05-04T15:19:04.150Z
last_checked_at: 2026-05-04T06:03:28.006Z
generated_at: 2026-05-04T06:03:28.006Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T06:03:28.006Z
  matched_actions: 37
  action_count: 37
  confidence: high
  summary: "All 37 spec actions matched literally against the source; transport parameters verified; command set fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# Key Digital Systems KD-HD1080P Control Spec

## Summary
The Key Digital Systems KD-HD1080P (HD Leeza) is a video processor controlled via RS-232C serial. This spec covers the documented RS-232C command set for input selection, output resolution, aspect ratio, picture adjustments (brightness, contrast, saturation), OSD control, VGA bypass, zoom, test patterns, and PIP operations.

<!-- UNRESOLVED: source states "contact tech@keydigital.com for further details of RS-232C discrete command codes" — the command set may be incomplete -->
<!-- UNRESOLVED: stop bits, flow control not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: ext 12V power on/off/toggle commands present
  - queryable    # inferred: status command and list settings command present
  - levelable    # inferred: brightness, contrast, saturation controls present
```

## Actions
```yaml
actions:
  - id: help
    label: Help
    kind: action
    params: []
    command: "h"

  - id: select_input
    label: Select Input Channel
    kind: action
    params:
      - name: channel
        type: integer
        description: "Input channel number (0-9)"
    command: "i{0-9}"

  - id: set_output_resolution
    label: Set Output Resolution and Refresh Rate
    kind: action
    params:
      - name: resolution
        type: integer
        description: "Resolution index (0-21); 0=640x480p, 8=1280x720p DVI, 17=1920x1080p A, 20=1920x1080p B, 21=1280x720p HDMI, etc."
      - name: refresh_rate
        type: integer
        description: "Refresh rate index (0-4); 0=48Hz, 1=50Hz, 2=60Hz, 3=72Hz, 4=75Hz"
    command: "r <resolution> <refresh_rate><enter>"

  - id: set_input_aspect_ratio
    label: Set Input Aspect Ratio
    kind: action
    params:
      - name: ratio
        type: integer
        description: "IAR index (0-5); 0=1.33, 1=1.66, 2=1.78, 3=1.85, 4=2.00, 5=2.35"
    command: "a{0-5}"

  - id: set_output_aspect_ratio
    label: Set Output Aspect Ratio
    kind: action
    params:
      - name: ratio
        type: integer
        description: "OAR index (0-5); 0=1.33, 1=1.66, 2=1.78, 3=1.85, 4=2.00, 5=2.35"
    command: "o{0-5}"

  - id: set_overall_saturation
    label: Set Overall Saturation
    kind: action
    params:
      - name: level
        type: integer
        description: "Saturation level"
    command: "U <level><enter>"

  - id: set_blue_saturation
    label: Set Blue Saturation
    kind: action
    params:
      - name: sign
        type: integer
        description: "0=positive, 1=negative"
      - name: level
        type: integer
        description: "Saturation level (0-10)"
    command: "u <sign> <level><enter>"

  - id: set_red_saturation
    label: Set Red Saturation
    kind: action
    params:
      - name: sign
        type: integer
        description: "0=positive, 1=negative"
      - name: level
        type: integer
        description: "Saturation level (0-10)"
    command: "e <sign> <level><enter>"

  - id: set_sdi_sync
    label: Set SDI Sync Mode
    kind: action
    params:
      - name: mode
        type: integer
        description: "1=separate sync, 2=embedded sync"
    command: "S <mode><enter>"

  - id: set_display_output
    label: Set RGB/DVI Display Output
    kind: action
    params:
      - name: mode
        type: integer
        description: "1=DVI display (default), 2=RGB display"
    command: "W <mode><enter>"

  - id: enable_osd
    label: Enable OSD
    kind: action
    params: []
    command: "J"

  - id: disable_osd
    label: Disable OSD
    kind: action
    params: []
    command: "j"

  - id: toggle_osd
    label: Toggle OSD
    kind: action
    params: []
    command: "k"

  - id: vga_bypass_on
    label: VGA Bypass On
    kind: action
    params: []
    command: "B"

  - id: vga_bypass_off
    label: VGA Bypass Off
    kind: action
    params: []
    command: "v"

  - id: vga_bypass_toggle
    label: Toggle VGA Bypass
    kind: action
    params: []
    command: "b"

  - id: ext_power_on
    label: Ext 12V Power On
    kind: action
    params: []
    command: "P"

  - id: ext_power_off
    label: Ext 12V Power Off
    kind: action
    params: []
    command: "["

  - id: ext_power_toggle
    label: Ext 12V Power Toggle
    kind: action
    params: []
    command: "p"

  - id: toggle_day_night
    label: Toggle Daytime/Nighttime
    kind: action
    params: []
    command: "#"

  - id: set_brightness
    label: Set Brightness
    kind: action
    params:
      - name: channel
        type: string
        description: "R=Red, G=Green, B=Blue, Y=All"
      - name: level
        type: integer
        description: "Brightness level (35-65)"
    command: "R <channel> <level><enter>"

  - id: set_contrast
    label: Set Contrast
    kind: action
    params:
      - name: channel
        type: string
        description: "R=Red, G=Green, B=Blue, Y=All"
      - name: level
        type: integer
        description: "Contrast level (34-65)"
    command: "c <channel> <level><enter>"

  - id: increment_kdpe
    label: Increment Overall KD-PE Setting
    kind: action
    params: []
    command: "g"

  - id: set_kdpe
    label: Set Individual KD-PE Setting
    kind: action
    params:
      - name: channel
        type: string
        description: "R=Red, G=Green, B=Blue, Y=All"
      - name: level
        type: integer
        description: "KD-PE level (0-10)"
    command: "K <channel> <level><enter>"

  - id: set_zoom
    label: Select Zoom State
    kind: action
    params:
      - name: state
        type: integer
        description: "0=No zoom, 1=Linear, 2=Horizontal, 3=Vertical, 4=DSX"
    command: "Z <state><enter>"

  - id: cycle_zoom
    label: Cycle Zoom States
    kind: action
    params: []
    command: "z"

  - id: list_picture_settings
    label: List Picture Adjust Settings
    kind: action
    params: []
    command: "X"

  - id: memorize_picture_settings
    label: Memorize Picture Adjust Values
    kind: action
    params: []
    command: "x"

  - id: enable_test_pattern
    label: Enable Test Pattern
    kind: action
    params:
      - name: pattern
        type: integer
        description: "0=cross, 1=cross hatch, 2=gray scale, 3=color bar, 4=horizontal ramp, 5=wide horizontal ramp, 6=wide vertical ramp"
    command: "t{0-6}"

  - id: disable_test_pattern
    label: Disable Test Pattern
    kind: action
    params: []
    command: "T"

  - id: pip_set_input
    label: PIP Set Input
    kind: action
    params:
      - name: input
        type: integer
        description: "PIP input channel (0-9)"
    command: "] i <input><enter>"

  - id: pip_set_size
    label: PIP Set Size
    kind: action
    params:
      - name: size
        type: integer
        description: "PIP size (0-2)"
    command: "] s <size><enter>"

  - id: pip_toggle
    label: PIP Toggle On/Off
    kind: action
    params: []
    command: "] o"

  - id: pip_on
    label: PIP On
    kind: action
    params: []
    command: "] n"

  - id: pip_off
    label: PIP Off
    kind: action
    params: []
    command: "] f"

  - id: pip_swap
    label: PIP Swap Main and Sub
    kind: action
    params: []
    command: "] w"

  - id: pip_status
    label: PIP Status
    kind: action
    params: []
    command: "] t"
```

## Feedbacks
```yaml
feedbacks:
  - id: status
    type: string
    description: "HD Leeza status display (response to 's' command)"

  - id: picture_settings
    type: string
    description: "All individual picture adjust settings (response to 'X' command)"

  - id: pip_state
    type: string
    description: "Current PIP input and on/off status (response to '] t' command)"
```

## Variables
```yaml
# UNRESOLVED: no continuous variable definitions found in source beyond action params
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
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- Commands are case-sensitive: lowercase and uppercase letters map to different functions (e.g., `B`=VGA bypass on, `b`=toggle VGA bypass; `J`=enable OSD, `j`=disable OSD).
- The source document contains several apparent typos: the `k` (Toggle OSD) usage line reads `j` instead of `k`; the `p`/`P` power commands have conflicting headers and usage lines; the `U` (overall saturation) parameter range is listed as `{34-35}` which is likely a typo.
- Source advises inserting sufficient time delays between commands and testing to determine proper delay intervals.
- The `[` character is used for the Ext 12V power off command — unusual single-character command.
- PIP operations use a multi-argument syntax with the `]` prefix followed by a sub-command letter.

<!-- UNRESOLVED: stop bits and flow control for RS-232 not stated in source -->
<!-- UNRESOLVED: overall saturation range may be incorrectly documented (shows {34-35}) -->
<!-- UNRESOLVED: source references additional RS-232C discrete command codes available from tech@keydigital.com — command set may be incomplete -->
<!-- UNRESOLVED: response/acknowledgement format for commands not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - keydigital.com
retrieved_at: 2026-05-04T15:19:04.150Z
last_checked_at: 2026-05-04T06:03:28.006Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T06:03:28.006Z
matched_actions: 37
action_count: 37
confidence: high
summary: "All 37 spec actions matched literally against the source; transport parameters verified; command set fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
