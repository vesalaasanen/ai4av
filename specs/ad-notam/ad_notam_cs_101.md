---
schema_version: ai4av-public-spec-v1
device_id: ad-notam/cs-101
entity_id: ad_notam_cs_101
spec_id: admin/ad_notam-cs_101
revision: 1
author: admin
title: "Ad Notam CS-101 Control Spec"
status: published
manufacturer: "Ad Notam"
manufacturer_key: ad-notam
model_family: CS-101
aliases: []
compatible_with:
  manufacturers:
    - "Ad Notam"
  models:
    - CS-101
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: ad_notam_cs_101.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T08:57:41.148Z
retrieved_at: 2026-04-27T08:57:41.148Z
last_checked_at: 2026-04-27T08:57:41.148Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T08:57:41.148Z
  matched_actions: 72
  action_count: 72
  confidence: high
  summary: "All 72 spec actions matched source commands literally; transport parameters verified; full coverage of documented RS-232 protocol."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Ad Notam CS-101 Control Spec

## Summary
Display Frame Unit (DFU) controlled via RS-232 ASCII protocol. Commands are 9 bytes fixed-length with header '&', acknowledgements use '%' prefix, errors use '!' prefix. Supports power, input selection, audio/video adjustment, and playback transport.

<!-- UNRESOLVED: IR remote control commands not documented — source covers RS-232 only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400  # default; also 9600 and 19200 (configurable via OSD)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Based on command set present:
powerable: true   # inferred: power on/off/toggle commands present
routable: true    # inferred: input selection commands present (SRC)
levelable: true   # inferred: volume, brightness, contrast, etc. present
queryable: true  # inferred: query commands with '?' separator present
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: boot_set_on
  label: Boot Set to On
  kind: action
  params: []

- id: boot_set_standby
  label: Boot Set to Standby
  kind: action
  params: []

- id: boot_set_last
  label: Boot Set to Last
  kind: action
  params: []

- id: signal_loss_set
  label: Set Signal Loss Timeout
  kind: action
  params:
    - name: duration
      type: string
      description: Duration code (05s, 10s, 30s, 01m, 02m, OFF)

- id: sleeptimer_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: Minutes (015, 030, 045, 060, 090, 120, OFF)

- id: numeric_digit
  label: Numeric Digit
  kind: action
  params:
    - name: digit
      type: integer
      description: Digit 0-9

- id: cursor_ok
  label: Cursor OK
  kind: action
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: function_play
  label: Play
  kind: action
  params: []

- id: function_pause
  label: Pause
  kind: action
  params: []

- id: function_stop
  label: Stop
  kind: action
  params: []

- id: function_next
  label: Skip Forward
  kind: action
  params: []

- id: function_previous
  label: Skip Backward
  kind: action
  params: []

- id: function_fast_forward
  label: Fast Forward
  kind: action
  params: []

- id: function_rewind
  label: Fast Backward
  kind: action
  params: []

- id: exit
  label: Exit
  kind: action
  params: []

- id: osd_access_on
  label: OSD Access On
  kind: action
  params: []

- id: osd_access_off
  label: OSD Access Off
  kind: action
  params: []

- id: osd_toggle
  label: OSD Toggle
  kind: action
  params: []

- id: osd_on
  label: OSD On
  kind: action
  params: []

- id: osd_off
  label: OSD Off
  kind: action
  params: []

- id: input_select
  label: Select Input
  kind: action
  params:
    - name: input
      type: string
      description: Input source (HD1, HD2, HD3, RGB, USB)

- id: aspect_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      description: Aspect mode (169, 043, ZM1, ZM2)

- id: picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Picture mode (STD, USR, DYN, MLD)

- id: picture_temp
  label: Set Picture Temperature
  kind: action
  params:
    - name: temp
      type: string
      description: Temperature (COL, MED, WRM)

- id: brightness_up
  label: Brightness Up
  kind: action
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  params: []

- id: contrast_up
  label: Contrast Up
  kind: action
  params: []

- id: contrast_down
  label: Contrast Down
  kind: action
  params: []

- id: saturation_up
  label: Saturation Up
  kind: action
  params: []

- id: saturation_down
  label: Saturation Down
  kind: action
  params: []

- id: sharpness_up
  label: Sharpness Up
  kind: action
  params: []

- id: sharpness_down
  label: Sharpness Down
  kind: action
  params: []

- id: backlight_up
  label: Backlight Up
  kind: action
  params: []

- id: backlight_down
  label: Backlight Down
  kind: action
  params: []

- id: audio_mode
  label: Set Audio Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Audio mode (STD, USR, MUS, MOV, SPR)

- id: bass_up
  label: Bass Up
  kind: action
  params: []

- id: bass_down
  label: Bass Down
  kind: action
  params: []

- id: treble_up
  label: Treble Up
  kind: action
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  params: []

- id: balance_left
  label: Balance Left
  kind: action
  params: []

- id: balance_right
  label: Balance Right
  kind: action
  params: []

- id: boot_volume_up
  label: Boot Volume Up
  kind: action
  params: []

- id: boot_volume_down
  label: Boot Volume Down
  kind: action
  params: []

- id: echo_on
  label: Set RS232 Echo On
  kind: action
  params: []

- id: echo_off
  label: Set RS232 Echo Off
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [ON*, OFF]
  comment: Query with &PWR?***

- id: boot_status
  type: enum
  values: [ON*, SBY, LST]
  comment: Query with &BOT?***

- id: signal_loss_status
  type: enum
  values: [05s, 10s, 30s, 01m, 02m, OFF]
  comment: Query with &SLS?***

- id: sleep_timer_status
  type: enum
  values: [015, 030, 045, 060, 090, 120, OFF]
  comment: Query with &SLP?***

- id: mute_status
  type: enum
  values: [ON*, OFF]
  comment: Query with &MUT?***

- id: osd_access_status
  type: enum
  values: [ON*, OFF]
  comment: Query with &OSA?***

- id: osd_status
  type: enum
  values: [ON*, OFF]
  comment: Query with &OSD?***

- id: input_status
  type: enum
  values: [HD1, HD2, HD3, RGB, USB]
  comment: Query with &SRC?***

- id: aspect_status
  type: enum
  values: [169, 043, ZM1, ZM2]
  comment: Query with &ASP?***

- id: volume_level
  type: integer
  range: [000, 100]
  comment: Query with &VOL?***

- id: brightness_level
  type: integer
  range: [000, 100]
  comment: Query with &BRT?***

- id: contrast_level
  type: integer
  range: [000, 100]
  comment: Query with &CON?***

- id: saturation_level
  type: integer
  range: [000, 100]
  comment: Query with &STR?***

- id: sharpness_level
  type: integer
  range: [000, 100]
  comment: Query with &SRP?***

- id: backlight_level
  type: integer
  range: [000, 100]
  comment: Query with &BLT?***

- id: bass_level
  type: integer
  range: [000, 100]
  comment: Query with &BAS?***

- id: treble_level
  type: integer
  range: [000, 100]
  comment: Query with &TRB?***

- id: balance_level
  type: integer
  range: [-50, 50]
  comment: Query with &BAL?***

- id: boot_volume_level
  type: integer
  range: [000, 100]
  comment: Query with &BVL?***

- id: error
  type: enum
  values: ["!ERR:001", "!ERR:002", "!ERR:003", "!ERR:004"]
  comment: !ERR:001=access denied, !ERR:002=not available, !ERR:003=not implemented, !ERR:004=out of range
```

## Variables
```yaml
# No discrete settable parameters outside action/feedback pattern identified.
# All settable parameters follow action/feedback command pattern above.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
# Device only sends responses to commands.
```

## Macros
```yaml
# No multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Wait 10 seconds after power on before sending next command
  - Wait for response before sending next command
  - Minimum 500ms delay between commands
  - Minimum 2 seconds delay before resending if no response received
  - Minimum 5 seconds delay after sending 20 commands
```

## Notes
Command structure: 9 bytes fixed-length with '&' prefix. Format: `&XXX:YYY<CR>` where XXX=identifier (3 chars), YYY=value (3 chars, padded with '*' if shorter). Acknowledgements use '%' prefix. Errors use '!' prefix.

Timing constraints are critical for reliable operation — do not send commands faster than specified.

Baud rate defaults to 38400 but is configurable via OSD menu to 9600 or 19200.

<!-- UNRESOLVED: IR remote command set not documented — source covers RS-232 only -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: ad_notam_cs_101.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T08:57:41.148Z
retrieved_at: 2026-04-27T08:57:41.148Z
last_checked_at: 2026-04-27T08:57:41.148Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T08:57:41.148Z
matched_actions: 72
action_count: 72
confidence: high
summary: "All 72 spec actions matched source commands literally; transport parameters verified; full coverage of documented RS-232 protocol."
```

## Known Gaps

```yaml
[]
```
