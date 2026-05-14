---
spec_id: admin/clevertouch-impact-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Clevertouch Impact Series Control Spec"
manufacturer: Clevertouch
model_family: "Clevertouch Impact Series"
aliases: []
compatible_with:
  manufacturers:
    - Clevertouch
  models:
    - "Clevertouch Impact Series"
    - "Clevertouch Plus"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - old.support.clevertouch.com
source_urls:
  - "https://old.support.clevertouch.com/Support/RS232%20code%20for%20Clevertouch%20Plus.pdf"
retrieved_at: 2026-05-14T15:06:43.923Z
last_checked_at: 2026-05-04T16:13:59.277Z
generated_at: 2026-05-04T16:13:59.277Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T16:13:59.277Z
  matched_actions: 72
  action_count: 72
  confidence: high
  summary: "Every spec action matched verbatim in source code list and status checking section; all transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-04
---

# Clevertouch Impact Series Control Spec

## Summary
Clevertouch Impact Series (also marketed as Clevertouch Plus) LED LCD display with RS-232C serial control. Binary protocol using 10-byte frames with fixed header/footer and per-command checksum. Supports power, input selection, volume, mute, aspect ratio, TV channel, embedded PC power, and remote-control key emulation.

<!-- UNRESOLVED: no response/acknowledgement format documented for action commands (only status queries have reply codes) -->
<!-- UNRESOLVED: flow_control not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # power on/off commands present
  - routable        # input selection commands present
  - queryable       # status check commands with reply codes present
  - levelable       # volume 0-100 control present
```

## Actions
```yaml
# Command frame format (10 bytes):
#   AA BB CC [main_cmd] [sub_cmd] [length] [checksum] DD EE FF
#   length = 0x00 (always)
#   checksum = sum of bytes 4-6 (main_cmd + sub_cmd + length), modulo 256
#   All values hex.
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "AA BB CC 01 00 00 01 DD EE FF"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "AA BB CC 01 01 00 02 DD EE FF"
    params: []

  - id: select_input_tv
    label: Select Input TV
    kind: action
    command: "AA BB CC 02 01 00 03 DD EE FF"
    params: []

  - id: select_input_cvbs
    label: Select Input CVBS
    kind: action
    command: "AA BB CC 02 02 00 04 DD EE FF"
    params: []

  - id: select_input_vga1
    label: Select Input VGA1
    kind: action
    command: "AA BB CC 02 03 00 05 DD EE FF"
    params: []

  - id: select_input_vga2
    label: Select Input VGA2
    kind: action
    command: "AA BB CC 02 04 00 06 DD EE FF"
    params: []

  - id: select_input_hdmi3
    label: Select Input HDMI3
    kind: action
    command: "AA BB CC 02 05 00 07 DD EE FF"
    params: []

  - id: select_input_hdmi1
    label: Select Input HDMI1
    kind: action
    command: "AA BB CC 02 06 00 08 DD EE FF"
    params: []

  - id: select_input_hdmi2
    label: Select Input HDMI2
    kind: action
    command: "AA BB CC 02 07 00 09 DD EE FF"
    params: []

  - id: select_input_pc
    label: Select Input PC
    kind: action
    command: "AA BB CC 02 08 00 0A DD EE FF"
    params: []

  - id: select_input_android
    label: Select Input Android
    kind: action
    command: "AA BB CC 02 0A 00 0C DD EE FF"
    params: []

  - id: select_input_vga3
    label: Select Input VGA3
    kind: action
    command: "AA BB CC 02 0B 00 0D DD EE FF"
    params: []

  - id: select_input_hdmi4k
    label: Select Input HDMI 4K (4Kx2K)
    kind: action
    command: "AA BB CC 02 0D 00 0F DD EE FF"
    params: []

  - id: set_volume
    label: Set Volume
    kind: action
    command: "AA BB CC 03 00 {xx} {checksum} DD EE FF"
    params:
      - name: volume
        type: integer
        min: 0
        max: 100
        description: "Volume level 0-100 decimal. xx = hex value, checksum = (0x03 + 0x00 + xx) & 0xFF"

  - id: mute
    label: Mute
    kind: action
    command: "AA BB CC 03 01 00 04 DD EE FF"
    params: []

  - id: unmute
    label: Unmute
    kind: action
    command: "AA BB CC 03 01 01 05 DD EE FF"
    params: []

  - id: set_aspect_16_9
    label: Set Aspect Ratio 16:9
    kind: action
    command: "AA BB CC 08 00 00 08 DD EE FF"
    params: []

  - id: set_aspect_4_3
    label: Set Aspect Ratio 4:3
    kind: action
    command: "AA BB CC 08 01 00 09 DD EE FF"
    params: []

  - id: set_aspect_point_to_point
    label: Set Aspect Ratio Point to Point
    kind: action
    command: "AA BB CC 08 07 00 0F DD EE FF"
    params: []

  - id: set_tv_channel
    label: Set TV Channel
    kind: action
    command: "AA BB CC 05 00 {XX} {checksum} DD EE FF"
    params:
      - name: channel
        type: integer
        min: 0
        max: 99
        description: "ATV channel 0-99 decimal. XX = hex value, checksum = (0x05 + 0x00 + XX) & 0xFF"

  - id: pc_power_on
    label: PC Power On
    kind: action
    command: "AA BB CC 09 01 00 0A DD EE FF"
    params: []

  - id: pc_power_off
    label: PC Power Off
    kind: action
    command: "AA BB CC 09 00 00 09 DD EE FF"
    params: []

  - id: rc_win
    label: Remote Control Win
    kind: action
    command: "AA BB CC 07 0B 00 12 DD EE FF"
    params: []

  - id: rc_space
    label: Remote Control Space
    kind: action
    command: "AA BB CC 07 46 00 4D DD EE FF"
    params: []

  - id: rc_alt_tab
    label: Remote Control Alt+Tab
    kind: action
    command: "AA BB CC 07 1D 00 24 DD EE FF"
    params: []

  - id: rc_alt_f4
    label: Remote Control Alt+F4
    kind: action
    command: "AA BB CC 07 1F 00 26 DD EE FF"
    params: []

  - id: rc_num_1
    label: Remote Control NUM 1
    kind: action
    command: "AA BB CC 07 00 00 07 DD EE FF"
    params: []

  - id: rc_num_2
    label: Remote Control NUM 2
    kind: action
    command: "AA BB CC 07 10 00 17 DD EE FF"
    params: []

  - id: rc_num_3
    label: Remote Control NUM 3
    kind: action
    command: "AA BB CC 07 11 00 18 DD EE FF"
    params: []

  - id: rc_num_4
    label: Remote Control NUM 4
    kind: action
    command: "AA BB CC 07 13 00 1A DD EE FF"
    params: []

  - id: rc_num_5
    label: Remote Control NUM 5
    kind: action
    command: "AA BB CC 07 14 00 1B DD EE FF"
    params: []

  - id: rc_num_6
    label: Remote Control NUM 6
    kind: action
    command: "AA BB CC 07 15 00 1C DD EE FF"
    params: []

  - id: rc_num_7
    label: Remote Control NUM 7
    kind: action
    command: "AA BB CC 07 17 00 1E DD EE FF"
    params: []

  - id: rc_num_8
    label: Remote Control NUM 8
    kind: action
    command: "AA BB CC 07 18 00 1F DD EE FF"
    params: []

  - id: rc_num_9
    label: Remote Control NUM 9
    kind: action
    command: "AA BB CC 07 19 00 20 DD EE FF"
    params: []

  - id: rc_num_0
    label: Remote Control NUM 0
    kind: action
    command: "AA BB CC 07 1B 00 22 DD EE FF"
    params: []

  - id: rc_display
    label: Remote Control Display
    kind: action
    command: "AA BB CC 07 1C 00 23 DD EE FF"
    params: []

  - id: rc_refresh
    label: Remote Control Refresh
    kind: action
    command: "AA BB CC 07 4C 00 53 DD EE FF"
    params: []

  - id: rc_input
    label: Remote Control Input
    kind: action
    command: "AA BB CC 07 07 00 0E DD EE FF"
    params: []

  - id: rc_home
    label: Remote Control Home
    kind: action
    command: "AA BB CC 07 48 00 4F DD EE FF"
    params: []

  - id: rc_menu
    label: Remote Control Menu
    kind: action
    command: "AA BB CC 07 0D 00 14 DD EE FF"
    params: []

  - id: rc_delete
    label: Remote Control Delete
    kind: action
    command: "AA BB CC 07 40 00 47 DD EE FF"
    params: []

  - id: rc_energy
    label: Remote Control Energy
    kind: action
    command: "AA BB CC 07 4E 00 55 DD EE FF"
    params: []

  - id: rc_up
    label: Remote Control UP
    kind: action
    command: "AA BB CC 07 47 00 4E DD EE FF"
    params: []

  - id: rc_down
    label: Remote Control DOWN
    kind: action
    command: "AA BB CC 07 4D 00 54 DD EE FF"
    params: []

  - id: rc_left
    label: Remote Control LEFT
    kind: action
    command: "AA BB CC 07 49 00 50 DD EE FF"
    params: []

  - id: rc_right
    label: Remote Control RIGHT
    kind: action
    command: "AA BB CC 07 4B 00 52 DD EE FF"
    params: []

  - id: rc_enter
    label: Remote Control ENTER
    kind: action
    command: "AA BB CC 07 4A 00 51 DD EE FF"
    params: []

  - id: rc_point
    label: Remote Control Point
    kind: action
    command: "AA BB CC 07 06 00 0D DD EE FF"
    params: []

  - id: rc_back
    label: Remote Control Back
    kind: action
    command: "AA BB CC 07 0A 00 11 DD EE FF"
    params: []

  - id: rc_ch_up
    label: Remote Control CH+
    kind: action
    command: "AA BB CC 07 02 00 09 DD EE FF"
    params: []

  - id: rc_ch_down
    label: Remote Control CH-
    kind: action
    command: "AA BB CC 07 09 00 10 DD EE FF"
    params: []

  - id: rc_vol_up
    label: Remote Control VOL+
    kind: action
    command: "AA BB CC 07 03 00 0A DD EE FF"
    params: []

  - id: rc_vol_down
    label: Remote Control VOL-
    kind: action
    command: "AA BB CC 07 41 00 48 DD EE FF"
    params: []

  - id: rc_page_up
    label: Remote Control PageUp
    kind: action
    command: "AA BB CC 07 42 00 49 DD EE FF"
    params: []

  - id: rc_page_down
    label: Remote Control PageDown
    kind: action
    command: "AA BB CC 07 0F 00 16 DD EE FF"
    params: []

  - id: rc_f1
    label: Remote Control F1
    kind: action
    command: "AA BB CC 07 45 00 4C DD EE FF"
    params: []

  - id: rc_f2
    label: Remote Control F2
    kind: action
    command: "AA BB CC 07 12 00 19 DD EE FF"
    params: []

  - id: rc_f3
    label: Remote Control F3
    kind: action
    command: "AA BB CC 07 51 00 58 DD EE FF"
    params: []

  - id: rc_f4
    label: Remote Control F4
    kind: action
    command: "AA BB CC 07 5B 00 62 DD EE FF"
    params: []

  - id: rc_f5
    label: Remote Control F5
    kind: action
    command: "AA BB CC 07 44 00 4B DD EE FF"
    params: []

  - id: rc_f6
    label: Remote Control F6
    kind: action
    command: "AA BB CC 07 50 00 57 DD EE FF"
    params: []

  - id: rc_f7
    label: Remote Control F7
    kind: action
    command: "AA BB CC 07 43 00 4A DD EE FF"
    params: []

  - id: rc_f8
    label: Remote Control F8
    kind: action
    command: "AA BB CC 07 1A 00 21 DD EE FF"
    params: []

  - id: rc_f9
    label: Remote Control F9
    kind: action
    command: "AA BB CC 07 04 00 0B DD EE FF"
    params: []

  - id: rc_f10
    label: Remote Control F10
    kind: action
    command: "AA BB CC 07 59 00 60 DD EE FF"
    params: []

  - id: rc_f11
    label: Remote Control F11
    kind: action
    command: "AA BB CC 07 57 00 5E DD EE FF"
    params: []

  - id: rc_f12
    label: Remote Control F12
    kind: action
    command: "AA BB CC 07 08 00 0F DD EE FF"
    params: []

  - id: rc_red
    label: Remote Control RED
    kind: action
    command: "AA BB CC 07 5C 00 63 DD EE FF"
    params: []

  - id: rc_green
    label: Remote Control GREEN
    kind: action
    command: "AA BB CC 07 5D 00 64 DD EE FF"
    params: []

  - id: rc_yellow
    label: Remote Control YELLOW
    kind: action
    command: "AA BB CC 07 5E 00 65 DD EE FF"
    params: []

  - id: rc_blue
    label: Remote Control BLUE
    kind: action
    command: "AA BB CC 07 5F 00 66 DD EE FF"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_status
    label: Power Status
    query: "AA BB CC 01 02 00 03 DD EE FF"
    type: enum
    values:
      - value: on
        reply: "AA BB CC 80 00 00 80 DD EE FF"
      - value: off
        reply: "AA BB CC 80 01 00 81 DD EE FF"

  - id: volume_level
    label: Volume Level
    query: "AA BB CC 03 02 00 05 DD EE FF"
    type: integer
    min: 0
    max: 100
    description: "Reply byte 5 (xx) contains volume as hex (0x00-0x64). Reply format: AA BB CC 82 00 xx {checksum} DD EE FF"

  - id: audio_mute_status
    label: Audio Mute Status
    query: "AA BB CC 03 03 00 06 DD EE FF"
    type: enum
    values:
      - value: muted
        reply: "AA BB CC 82 01 00 83 DD EE FF"
      - value: unmuted
        reply: "AA BB CC 82 01 01 84 DD EE FF"

  - id: input_status
    label: Input Status
    query: "AA BB CC 02 00 00 02 DD EE FF"
    type: enum
    values:
      - value: tv
        reply: "AA BB CC 81 01 00 82 DD EE FF"
      - value: cvbs
        reply: "AA BB CC 81 02 00 83 DD EE FF"
      - value: vga1
        reply: "AA BB CC 81 03 00 84 DD EE FF"
      - value: vga2
        reply: "AA BB CC 81 04 00 85 DD EE FF"
      - value: hdmi3
        reply: "AA BB CC 81 05 00 86 DD EE FF"
      - value: hdmi1
        reply: "AA BB CC 81 06 00 87 DD EE FF"
      - value: hdmi2
        reply: "AA BB CC 81 07 00 88 DD EE FF"
      - value: pc
        reply: "AA BB CC 81 08 00 89 DD EE FF"
      - value: android
        reply: "AA BB CC 81 0A 00 8B DD EE FF"
      - value: hdmi_4k
        reply: "AA BB CC 81 0D 00 8E DD EE FF"
      - value: whdi
        reply: "AA BB CC 81 0C 00 8D DD EE FF"
      - value: vga3
        reply: "AA BB CC 81 0B 00 8C DD EE FF"

  - id: pc_status
    label: PC Status
    query: "AA BB CC 09 02 00 0B DD EE FF"
    type: enum
    values:
      - value: on
        reply: "AA BB CC 83 00 00 83 DD EE FF"
      - value: off
        reply: "AA BB CC 83 01 00 84 DD EE FF"
      - value: sleep
        reply: "AA BB CC 83 02 00 85 DD EE FF"
      - value: hibernate
        reply: "AA BB CC 83 03 00 86 DD EE FF"
```

## Variables
```yaml
# UNRESOLVED: no settable persistent parameters documented beyond action-level volume/channel
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source
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
- Binary protocol: 10-byte fixed-length frames. Header `AA BB CC`, footer `DD EE FF`. Byte 7 is checksum (sum of bytes 4-6, mod 256).
- Connector: DSUB 9-pin male on rear panel near tuner. Pin 2 = TXD (output to TV), Pin 3 = RXD (input from TV), Pin 5 = GND.
- Remote control commands (main command `0x07`) emulate physical remote keys. Useful for navigating on-screen menus.
- WHDI input appears in status query replies but has no corresponding select-input action command in the code list.
- Volume query byte 5 is decimal value encoded as hex (e.g., volume 30 = `0x1E`).
<!-- UNRESOLVED: no acknowledgement/response format documented for action commands -->
<!-- UNRESOLVED: no timing constraints or inter-command delay documented -->
<!-- UNRESOLVED: WHDI input listed in status reply but no select command provided -->

## Provenance

```yaml
source_domains:
  - old.support.clevertouch.com
source_urls:
  - "https://old.support.clevertouch.com/Support/RS232%20code%20for%20Clevertouch%20Plus.pdf"
retrieved_at: 2026-05-14T15:06:43.923Z
last_checked_at: 2026-05-04T16:13:59.277Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T16:13:59.277Z
matched_actions: 72
action_count: 72
confidence: high
summary: "Every spec action matched verbatim in source code list and status checking section; all transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
