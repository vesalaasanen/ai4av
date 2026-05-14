---
spec_id: admin/runco-cx-46hd-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Runco CX-46HD Control Spec"
manufacturer: Runco
model_family: CX-46HD
aliases: []
compatible_with:
  manufacturers:
    - Runco
  models:
    - CX-46HD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hdtvsolutions.com
  - manualslib.com
  - applicationmarket.crestron.com
source_urls:
  - https://www.hdtvsolutions.com/pdf/CX-40HD_CX-46HDmanual_1-1.pdf
  - "https://www.manualslib.com/manual/315434/Runco-Crystal-Series-Cx-40hd.html#product-CX-46HD"
  - https://applicationmarket.crestron.com/runco-cx-46hd-north-america/
  - https://applicationmarket.crestron.com/content/Help/Runco/runco_cx-46hd_v1_0_help.pdf
retrieved_at: 2026-04-29T21:59:40.595Z
last_checked_at: 2026-04-30T09:48:23.226Z
generated_at: 2026-04-30T09:48:23.226Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:48:23.226Z
  matched_actions: 21
  action_count: 21
  confidence: high
  summary: "All 21 spec actions match source commands with correct parameter ranges; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Runco CX-46HD Control Spec

## Summary
Runco CX-46HD North America variant. RS-232 serial control at 115200 baud (default), 8N1, no flow control. ASCII command syntax with `]` acknowledgement prefix. Supports power, input routing, audio, PIP, and aspect ratio control.

<!-- UNRESOLVED: TCP/IP support not mentioned in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; alternatives: 19200, 9600, 2400 (set via ISF Calibration menu)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command set:
# - powerable       ([SAB] power on/off)
# - routable        ([S4A] main input, [+4A] next input, [S4G] PIP input)
# - levelable       ([S3A] volume, [+3A]/[-3A] volume up/down)
# - queryable       (device returns ]XXXX ack; state query commands not explicitly listed)
```

## Actions
```yaml
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 000-100

- id: audio_volume_up
  label: Audio Volume Up
  kind: action
  params: []

- id: audio_volume_down
  label: Audio Volume Down
  kind: action
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: "0 = not muted, 1 = muted"

- id: set_main_input
  label: Set Main Input
  kind: action
  params:
    - name: input
      type: integer
      description: "0=TV, 1=Input1, 2=Input2, 3=Input3, 4=Input4, 6=RGB, 8=HDMI1, 9=HDMI2"

- id: next_main_input
  label: Next Main AV Input
  kind: action
  params: []

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: "0=4:3, 1=VirtualWide, 2=Letterbox, 3=16:9"

- id: set_pip_input
  label: Set PIP Input
  kind: action
  params:
    - name: input
      type: integer
      description: "0=TV, 1=Input1, 2=Input2, 3=Input3, 4=Input4, 6=RGB, 8=HDMI1, 9=HDMI2"

- id: next_pip_input
  label: Next PIP AV Input
  kind: action
  params: []

- id: set_power
  label: Set Power
  kind: action
  params:
    - name: power
      type: integer
      description: "0 = standby, 1 = on"

- id: set_caption
  label: Set Caption On/Off
  kind: action
  params:
    - name: caption
      type: integer
      description: "0 = off, 1 = on"

- id: set_major_channel_air
  label: Set Major Channel (AIR)
  kind: action
  params:
    - name: channel
      type: integer
      description: "## = 01-99 for AIR"

- id: set_major_channel_cable
  label: Set Major Channel (CABLE)
  kind: action
  params:
    - name: channel
      type: integer
      description: "### = 001-125 for CABLE"

- id: set_minor_channel
  label: Set Minor Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: "#### = 0000-9999. Send major channel command first."

- id: set_pip_mode
  label: Set PIP Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=OFF, 1=PIP, 2=PBP"

- id: channel_up
  label: TV Channel Up
  kind: action
  params: []

- id: channel_down
  label: TV Channel Down
  kind: action
  params: []

- id: set_pip_size
  label: Set PIP Size
  kind: action
  params:
    - name: size
      type: integer
      description: "0=small, 1=medium, 2=large"

- id: set_pip_aspect
  label: Set PIP Aspect Ratio
  kind: action
  params:
    - name: aspect
      type: integer
      description: "0=4:3, 1=16:9"

- id: set_pip_position
  label: Set PIP Window Position
  kind: action
  params:
    - name: position
      type: integer
      description: "0=Top/Left, 1=Top/Right, 2=Bottom/Left, 3=Bottom/Right"

- id: remote_key
  label: Remote Control Button
  kind: action
  params:
    - name: keycode
      type: integer
      description: "4-digit keycode from remote emulation table"
```

## Feedbacks
```yaml
# Acknowledgement format: ]XXXX after valid command
# Error responses: >MAX (value too high), <MIN (value too low), -N/A (unrecognized command)
# UNRESOLVED: no explicit query commands returning device state found
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond actions; no variable readback documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Commands are ASCII, not case-sensitive. No carriage return required. Valid commands return `]XXXX` where XXXX is the four-digit command code. Invalid parameter range returns `>MAX` or `<MIN`. Unrecognized command returns `-N/A`.

Baud rate configurable via ISF Calibration menu: 115200 (default), 19200, 9600, 2400.

Pin assignments: Pin 2 = RX, Pin 3 = TX, Pin 5 = Ground. Pins 1,4,6,7,8,9 = NC.

<!-- UNRESOLVED: TCP/IP or network control not mentioned in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: no query commands for current device state documented -->

## Provenance

```yaml
source_domains:
  - hdtvsolutions.com
  - manualslib.com
  - applicationmarket.crestron.com
source_urls:
  - https://www.hdtvsolutions.com/pdf/CX-40HD_CX-46HDmanual_1-1.pdf
  - "https://www.manualslib.com/manual/315434/Runco-Crystal-Series-Cx-40hd.html#product-CX-46HD"
  - https://applicationmarket.crestron.com/runco-cx-46hd-north-america/
  - https://applicationmarket.crestron.com/content/Help/Runco/runco_cx-46hd_v1_0_help.pdf
retrieved_at: 2026-04-29T21:59:40.595Z
last_checked_at: 2026-04-30T09:48:23.226Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:48:23.226Z
matched_actions: 21
action_count: 21
confidence: high
summary: "All 21 spec actions match source commands with correct parameter ranges; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
