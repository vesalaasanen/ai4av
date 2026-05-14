---
spec_id: admin/adnotam-cs-101
schema_version: ai4av-public-spec-v1
revision: 1
title: "Adnotam CS-101 RS232 Control Spec"
manufacturer: Adnotam
model_family: CS-101
aliases: []
compatible_with:
  manufacturers:
    - Adnotam
  models:
    - CS-101
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ad-notam.com
source_urls:
  - https://www.ad-notam.com/download/RS232/ad_notam_RS232_protocol_DFU.pdf
  - https://www.ad-notam.com/attachment/741/download/td_dfu_rs232-protocol_v4-1_ascii-format_20150901.pdf
retrieved_at: 2026-05-04T15:17:36.583Z
last_checked_at: 2026-05-14T18:17:13.878Z
generated_at: 2026-05-14T18:17:13.878Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:13.878Z
  matched_actions: 51
  action_count: 57
  confidence: high
  summary: "All 51 spec actions found in source command table with matching mnemonics; transport parameters (baud, parity, flow control) fully verified in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Adnotam CS-101 RS232 Control Spec

## Summary

Ad Notam Display Frame Unit (CS-101) controlled via RS232 ASCII protocol. Host sends 9-byte commands starting with `&`, device responds with acknowledgements starting with `%`. Error responses start with `!`. Serial config: 9600/19200/38400 baud, 8N1, no flow control. Default baud: 38400.

<!-- UNRESOLVED: IR remote control described but not covered by this spec -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400  # default; 9600/19200 also supported per OSD config
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: power on/off/toggle commands present
- levelable  # inferred: volume, brightness, contrast, etc. have +/- commands
- routable   # inferred: input selection commands present
- queryable  # inferred: `?` query commands present
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

- id: signal_loss
  label: Set Signal Loss Timeout
  kind: action
  params:
    - name: duration
      type: enum
      values: ["05s", "10s", "30s", "01m", "02m", "OFF"]

- id: sleep_timer
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: enum
      values: ["015", "030", "045", "060", "090", "120", "OFF"]

- id: digit
  label: Enter Digit
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

- id: play
  label: Play
  kind: action
  params: []

- id: pause
  label: Pause
  kind: action
  params: []

- id: stop
  label: Stop
  kind: action
  params: []

- id: skip_forward
  label: Skip Forward
  kind: action
  params: []

- id: skip_backward
  label: Skip Backward
  kind: action
  params: []

- id: fast_forward
  label: Fast Forward
  kind: action
  params: []

- id: fast_backward
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

- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: enum
      values: ["HD1", "HD2", "HD3", "RGB", "USB"]

- id: aspect
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: ["169", "043", "ZM1", "ZM2"]

- id: picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: ["STD", "USR", "DYN", "MLD"]

- id: picture_temp
  label: Set Picture Temperature
  kind: action
  params:
    - name: temp
      type: enum
      values: ["COL", "MED", "WRM"]

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
      type: enum
      values: ["STD", "USR", "MUS", "MOV", "SPR"]

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

- id: boot_set_on
  label: Boot Set To On
  kind: action
  params: []

- id: boot_set_standby
  label: Boot Set To Standby
  kind: action
  params: []

- id: boot_set_last
  label: Boot Set To Last
  kind: action
  params: []

- id: echo_on
  label: Echo On
  kind: action
  params: []

- id: echo_off
  label: Echo Off
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: ["ON*", "OFF"]

- id: boot_state
  type: enum
  values: ["ON*", "SBY", "LST"]

- id: signal_loss_state
  type: enum
  values: ["05s", "10s", "30s", "01m", "02m", "OFF"]

- id: sleep_timer_state
  type: enum
  values: ["015", "030", "045", "060", "090", "120", "OFF"]

- id: volume_level
  type: integer
  range: [0, 100]

- id: mute_state
  type: enum
  values: ["ON*", "OFF"]

- id: osd_access_state
  type: enum
  values: ["ON*", "OFF"]

- id: osd_state
  type: enum
  values: ["ON*", "OFF"]

- id: input_state
  type: enum
  values: ["HD1", "HD2", "HD3", "RGB", "USB"]

- id: aspect_state
  type: enum
  values: ["169", "043", "ZM1", "ZM2"]

- id: brightness_level
  type: integer
  range: [0, 100]

- id: contrast_level
  type: integer
  range: [0, 100]

- id: saturation_level
  type: integer
  range: [0, 100]

- id: sharpness_level
  type: integer
  range: [0, 100]

- id: backlight_level
  type: integer
  range: [0, 100]

- id: bass_level
  type: integer
  range: [0, 100]

- id: treble_level
  type: integer
  range: [0, 100]

- id: balance_level
  type: integer
  range: [-50, 50]

- id: boot_volume_level
  type: integer
  range: [0, 100]

- id: error_response
  type: enum
  values: ["!ERR:001", "!ERR:002", "!ERR:003", "!ERR:004"]
  # 001=Access denied, 002=Not available, 003=Not implemented, 004=Value out of range
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond what Actions cover
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Wait 10 seconds after power on before sending commands
  - Wait for response before sending next command
  - Minimum 500ms delay between commands
  - Minimum 5 seconds delay after every 20 commands
  # inferred: 2 second minimum before resend if no response
```

## Notes

Command structure: 9 bytes total — header `&` + 3-byte identifier + separator `:` or `?` + 3-byte value (padded with `*`) + CR (0x0D). Acknowledgements: same structure but header is `%` instead of `&`. Error responses: header `!` followed by error code.

Examples:
- Power on: `&PWR:ON*<CR>` → ACK: `%PWR:ON*<CR>`
- Get volume: `&VOL?***<CR>` → ACK: `%VOL:063<CR>` (value padded with `*`)

Value ranges (numeric levels): volume/brightness/contrast/saturation/sharpness/backlight/bass/treble/boot volume = 000-100. Balance = -50 to +50.

<!-- UNRESOLVED: IR remote protocol details not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - ad-notam.com
source_urls:
  - https://www.ad-notam.com/download/RS232/ad_notam_RS232_protocol_DFU.pdf
  - https://www.ad-notam.com/attachment/741/download/td_dfu_rs232-protocol_v4-1_ascii-format_20150901.pdf
retrieved_at: 2026-05-04T15:17:36.583Z
last_checked_at: 2026-05-14T18:17:13.878Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:13.878Z
matched_actions: 51
action_count: 57
confidence: high
summary: "All 51 spec actions found in source command table with matching mnemonics; transport parameters (baud, parity, flow control) fully verified in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
