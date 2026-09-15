---
spec_id: admin/eiki-lc-xg210-lc-xg110-lc-xg200-lc-xg100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki LC-XG210 / LC-XG110 / LC-XG200 / LC-XG100 (\"G Series\") Control Spec"
manufacturer: Eiki
model_family: LC-XG210
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - LC-XG210
    - LC-XG110
    - LC-XG200
    - LC-XG100
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/lc-xg100-rs-232-basic-serial-commands/?wpdmdl=4568&ind=68b9e2bf9bd6e&refresh=bbe8e800&filename=LC-XG100-RS-232-basic-serial-commands.pdf"
  - https://www.eiki.com/download/lc-xg100-rs-232-basic-serial-commands/
  - https://www.eiki.com/download/lc-x986-rs-232-basic-serial-commands/
  - https://www.eiki.com/download/lc-xga980ue-rs-232-basic-serial-commands/
retrieved_at: 2026-09-02T20:11:23.282Z
last_checked_at: 2026-09-04T22:17:59.425Z
generated_at: 2026-09-04T22:17:59.425Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document covers LC-XG210/LC-XG110/LC-XG200/LC-XG100, not the requested \"EIP UHS XHS 100\". Spec authored against documented models."
  - "source does not document settable numerical variables"
  - "source does not document unsolicited event notifications"
  - "source does not document multi-step macro sequences"
  - "source does not document explicit safety warnings, interlocks,"
verification:
  verdict: verified
  checked_at: 2026-09-04T22:17:59.425Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions match source RS-232 command/status tokens verbatim; transport parameters 19200/8N1/CR/DB9/DIN all appear in source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Eiki LC-XG210 / LC-XG110 / LC-XG200 / LC-XG100 ("G Series") Control Spec

## Summary
RS-232 control for Eiki "G Series" projectors (LC-XG210, LC-XG110, LC-XG200, LC-XG100). ASCII command set over DB9↔8-pin DIN at 19,200 baud, 8N1, CR-delimited.

<!-- UNRESOLVED: source document covers LC-XG210/LC-XG110/LC-XG200/LC-XG100, not the requested "EIP UHS XHS 100". Spec authored against documented models. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  delimiter: CR  # carriage return after each command
  cable: "P/N 645 039 7219 (supplied with projector)"
  connector:
    computer: DB9
    projector: 8-pin DIN control port
  pinout:
    tx:
      computer_pin: 3
      projector_pin: 6
    rx:
      computer_pin: 2
      projector_pin: 1
    ground:
      computer_pin: 5
      projector_pin: 4
auth:
  type: none  # inferred: no auth procedure in source
timing:
  min_interval_command: 1s
  min_interval_status_read: 2s
  min_interval_input_or_mode_change: 5s
```

## Traits
```yaml
- powerable  # inferred from power command examples (C00, C01, C02)
- routable   # inferred from input/source selection commands
- levelable  # inferred from volume +/- commands
- queryable  # inferred from status read commands (CR0-CR6)
```

## Actions
```yaml
- id: power_on
  label: Power ON
  kind: action
  command: "C00"

- id: power_off
  label: Power OFF
  kind: action
  command: "C02"

- id: power_off_compulsory
  label: Compulsory Power OFF
  kind: action
  command: "C01"

- id: select_input_1
  label: Input 1
  kind: action
  command: "CF_INPUT_1"

- id: select_input_2
  label: Input 2
  kind: action
  command: "CF_INPUT_2"

- id: select_input_3
  label: Input 3
  kind: action
  command: "CF_INPUT_3"

- id: volume_up
  label: Volume +
  kind: action
  command: "C09"

- id: volume_down
  label: Volume -
  kind: action
  command: "C0A"

- id: audio_mute_on
  label: Audio mute ON
  kind: action
  command: "C0B"

- id: audio_mute_off
  label: Audio mute OFF
  kind: action
  command: "C0C"

- id: no_show_on
  label: No Show ON
  kind: action
  command: "C0D"

- id: no_show_off
  label: No Show OFF
  kind: action
  command: "C0E"

- id: aspect_regular_4_3
  label: Regular video image (4:3)
  kind: action
  command: "C0F"

- id: aspect_wide_16_9
  label: Wide video image (16:9)
  kind: action
  command: "C10"

- id: menu_on
  label: Menu ON
  kind: action
  command: "C1C"

- id: menu_off
  label: Menu OFF
  kind: action
  command: "C1D"

- id: display_clear
  label: Display clear
  kind: action
  command: "C1E"

- id: image_toggle
  label: Image (toggle)
  kind: action
  command: "C27"

- id: digital_zoom_in
  label: Digital Zoom +
  kind: action
  command: "C30"

- id: digital_zoom_out
  label: Digital Zoom -
  kind: action
  command: "C31"

- id: pointer_right
  label: Pointer right
  kind: action
  command: "C3A"

- id: pointer_left
  label: Pointer left
  kind: action
  command: "C3B"

- id: pointer_up
  label: Pointer up
  kind: action
  command: "C3C"

- id: pointer_down
  label: Pointer down
  kind: action
  command: "C3D"

- id: pointer_select
  label: Select
  kind: action
  command: "C3F"

- id: freeze_on
  label: Freeze ON
  kind: action
  command: "C43"

- id: freeze_off
  label: Freeze OFF
  kind: action
  command: "C44"

- id: zoom_down
  label: Zoom down
  kind: action
  command: "C46"

- id: zoom_up
  label: Zoom up
  kind: action
  command: "C47"

- id: focus_down
  label: Focus down
  kind: action
  command: "C4A"

- id: focus_up
  label: Focus up
  kind: action
  command: "C4B"

- id: lens_shift_up
  label: Lens shift up
  kind: action
  command: "C5D"

- id: lens_shift_down
  label: Lens shift down
  kind: action
  command: "C5E"

- id: auto_pc_adjust
  label: Auto PC Adj.
  kind: action
  command: "C89"

- id: presentation_timer_toggle
  label: Presentation timer (on/off)
  kind: action
  command: "C8A"

- id: digital_keystone_up
  label: Digital Keystone +
  kind: action
  command: "C8E"

- id: digital_keystone_down
  label: Digital Keystone -
  kind: action
  command: "C8F"

- id: digital_keystone_left
  label: Digital Keystone Left
  kind: action
  command: "CF_KEYSTONE_LEFT"

- id: digital_keystone_right
  label: Digital Keystone Right
  kind: action
  command: "CF_KEYSTONE_RIGHT"

- id: source_digital
  label: Source - Digital
  kind: action
  command: "CF_SOURCE_DIGITAL"

- id: source_analog
  label: Source - Analog
  kind: action
  command: "CF_SOURCE_ANALOG"

- id: source_wireless
  label: Source - Wireless
  kind: action
  command: "CF_SOURCE_WI"

- id: source_mci
  label: Source - MCI
  kind: action
  command: "CF_SOURCE_MCI"

- id: source_auto
  label: Source - Auto
  kind: action
  command: "CF_SOURCE_AUTO"

- id: source_video
  label: Source - Video
  kind: action
  command: "CF_SOURCE_VIDEO"

- id: source_svideo
  label: Source - S-Video
  kind: action
  command: "CF_SOURCE_S-VIDEO"

- id: source_component
  label: Source - Component
  kind: action
  command: "CF_SOURCE_YPBPR"

- id: lamp_mode_full
  label: LampMode - Full
  kind: action
  command: "CF_LAMPMODE_FUL"

- id: lamp_mode_eco
  label: LampMode - Eco
  kind: action
  command: "CF_LAMPMODE_ECO"

- id: query_power_status
  label: Power Status Read
  kind: query
  command: "CR0"

- id: query_input_mode
  label: Input mode Read
  kind: query
  command: "CR1"

- id: query_lamp_time
  label: Lamp time Read
  kind: query
  command: "CR3"

- id: query_setting
  label: Setting Read
  kind: query
  command: "CR4"

- id: query_temperature
  label: Temp. Read
  kind: query
  command: "CR6"
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status (CR0 reply)
  type: enum
  values:
    - { code: "00", state: power_on }
    - { code: "80", state: standby }
    - { code: "40", state: count_down }
    - { code: "20", state: cooling_down }
    - { code: "10", state: power_abnormality }
    - { code: "28", state: temperature_abnormality }
    - { code: "08", state: temperature_abnormality }
    - { code: "88", state: temperature_abnormality }
    - { code: "02", state: key_input_prohibition }
    - { code: "24", state: power_management_cooling }
    - { code: "04", state: power_management }

- id: input_mode
  label: Input Mode (CR1 reply)
  type: enum
  values:
    - { code: "1", state: computer_input_1 }
    - { code: "3", state: computer_input_2 }
    - { code: "2", state: video_input_3 }

- id: lamp_time
  label: Lamp Time (CR3 reply)
  type: string
  format: "4-digit hours"

- id: setting
  label: Setting (CR4 reply)
  type: enum
  values:
    - { code: "11", state: normal }
    - { code: "10", state: top_bottom_reversal }
    - { code: "01", state: left_right_reversal }
    - { code: "00", state: top_bottom_and_left_right_reversal }

- id: temperature
  label: Temperature (CR6 reply)
  type: string
  format: "three sensor readings in °C, separated by underscores (e.g. _##.#_##.#_##.#)"
```

## Variables
```yaml
# UNRESOLVED: source does not document settable numerical variables
# beyond the discrete command set enumerated in Actions
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event notifications
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document explicit safety warnings, interlocks,
# or power-on sequencing requirements
```

## Notes
Source covers Eiki "G Series" (LC-XG210, LC-XG110, LC-XG200, LC-XG100). Requested target "EIP UHS XHS 100" not present in source document. Spec authored against documented models.

IR command codes provided in source (HEX column) are emitted by the controller, not part of the RS-232 command set; not included as Actions.

Source notes "Other Commands and Status Checks are available if required, from EIKI Today" — additional commands may exist outside this document.

Respect minimum intervals: 1s between commands, 2s between status reads, 5s between input/mode changes. Each RS-232 command must be terminated with CR (0x0D).

## Provenance

```yaml
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/lc-xg100-rs-232-basic-serial-commands/?wpdmdl=4568&ind=68b9e2bf9bd6e&refresh=bbe8e800&filename=LC-XG100-RS-232-basic-serial-commands.pdf"
  - https://www.eiki.com/download/lc-xg100-rs-232-basic-serial-commands/
  - https://www.eiki.com/download/lc-x986-rs-232-basic-serial-commands/
  - https://www.eiki.com/download/lc-xga980ue-rs-232-basic-serial-commands/
retrieved_at: 2026-09-02T20:11:23.282Z
last_checked_at: 2026-09-04T22:17:59.425Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-04T22:17:59.425Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions match source RS-232 command/status tokens verbatim; transport parameters 19200/8N1/CR/DB9/DIN all appear in source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document covers LC-XG210/LC-XG110/LC-XG200/LC-XG100, not the requested \"EIP UHS XHS 100\". Spec authored against documented models."
- "source does not document settable numerical variables"
- "source does not document unsolicited event notifications"
- "source does not document multi-step macro sequences"
- "source does not document explicit safety warnings, interlocks,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
