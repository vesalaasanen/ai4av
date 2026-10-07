---
spec_id: admin/sharp-lce77-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "Sharp LCE77 Series Control Spec"
manufacturer: Sharp
model_family: LC-60E77UN
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - LC-60E77UN
    - LC-65E77UM
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.sharpusa.com
source_urls:
  - https://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC60E77UN_65E77UM.pdf
retrieved_at: 2026-09-26T14:23:18.471Z
last_checked_at: 2026-09-26T14:23:18.471Z
generated_at: 2026-09-26T14:23:18.471Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range not stated in source"
  - "source does not establish authentication requirements"
  - "source enumerates parameter ranges inline in Actions; no separate variable definitions."
  - "source documents no unsolicited notifications."
  - "source documents no multi-step sequences."
  - "The RS-232C section documents no command interlocks or power-on sequencing requirements."
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:18.471Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 commands match the exact LC-60E77UN/LC-65E77UM source; serial settings and CR framing match, and auth is unresolved. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Sharp LCE77 Series Control Spec

## Summary
RS-232C control spec for Sharp LC-60E77UN and LC-65E77UM LCD TVs (LCE77 series). PC connects to TV via cross-type RS-232C cable; TV accepts 8-ASCII command frames terminated by CR (0x0D) and replies with OK or ERR.

<!-- UNRESOLVED: firmware compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: unknown  # UNRESOLVED: source does not establish authentication requirements
```

## Traits
```yaml
- powerable       # POWER ON COMMAND SETTING, POWER SETTING present
- routable        # INPUT SELECTION A/B present
- levelable       # VOLUME control present
```

## Actions
```yaml
- id: power_on_command_setting_on
  label: Power On Command Setting (Accept)
  kind: action
  command: "RSPW1___"
  params: []
  notes: "POWER ON COMMAND SETTING parameter 1 = On. Source rows: RSPW1___ (On, accepted)."

- id: power_on_command_setting_off
  label: Power On Command Setting (Reject)
  kind: action
  command: "RSPW0___"
  params: []
  notes: "POWER ON COMMAND SETTING parameter 0 = Off. Source rows: RSPW0___ (Off, rejected)."

- id: power_off
  label: Power Off
  kind: action
  command: "POWR0___"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "POWR1___"
  params: []

- id: input_toggle
  label: Input Toggle
  kind: action
  command: "ITGDx___"
  params:
    - name: x
      type: integer
      description: "Placeholder; any numerical value. Source: 'Any numerical value can replace the x on the table.'"
  notes: "Toggle input switch. Same as input-change key."

- id: input_select_tv
  label: Input Select TV
  kind: action
  command: "ITVD0___"
  params: []
  notes: "Switches to TV; channel stays at last memory."

- id: input_select_terminal
  label: Input Select Terminal (INPUT1-8)
  kind: action
  command: "IAVD*___"
  params:
    - name: input
      type: integer
      description: "Input terminal number (1-8)"

- id: input1_mode
  label: INPUT 1 Mode
  kind: action
  command: "INP1*___"
  params:
    - name: mode
      type: integer
      description: "0: Auto, 1: VIDEO, 2: COMPONENT"

- id: input2_mode
  label: INPUT 2 Mode
  kind: action
  command: "INP2*___"
  params:
    - name: mode
      type: integer
      description: "0: Auto, 2: COMPONENT, 3: S-TERMINAL"

- id: av_mode_selection
  label: AV Mode Selection
  kind: action
  command: "AVMD****"
  params:
    - name: mode
      type: integer
      description: "0: Toggle, 1: STANDARD, 2: MOVIE, 3: GAME, 4: USER, 5: DYNAMIC (Fixed), 6: DYNAMIC, 7: PC, 100: AUTO"
  notes: "Printed page 41 names opcode AVMD. Its table depicts a one-character value, but explicitly includes 100 (AUTO); use the general four-character left-aligned, space-padded parameter rule to encode it. Internally this selection uses toggle operation, as the source notes."

- id: volume
  label: Volume
  kind: action
  command: "VOLM**__"
  params:
    - name: level
      type: integer
      description: "Volume (0-60)"

- id: h_position
  label: H-Position
  kind: action
  command: "HPOS***_"
  params:
    - name: value
      type: integer
      description: "H-position; range depends on View Mode / signal type"

- id: v_position
  label: V-Position
  kind: action
  command: "VPOS***_"
  params:
    - name: value
      type: integer
      description: "V-position; range depends on View Mode / signal type"

- id: clock
  label: Clock
  kind: action
  command: "CLCK***_"
  params:
    - name: value
      type: integer
      description: "PC mode only (0-180)"

- id: phase
  label: Phase
  kind: action
  command: "PHSE***_"
  params:
    - name: value
      type: integer
      description: "PC mode only (0-40)"

- id: view_mode
  label: View Mode
  kind: action
  command: "WIDE*___"
  params:
    - name: mode
      type: integer
      description: "0: Toggle [AV], 1: Side Bar [AV], 2: S.Stretch [AV], 3: Zoom [AV], 4: Stretch [AV], 5: Normal [PC], 6: Zoom [PC], 7: Stretch [PC], 8: Dot by Dot [PC][AV], 9: Full Screen [AV]"
  notes: "Availability of each value depends on input signal (see source table notes)."

- id: mute
  label: Mute
  kind: action
  command: "MUTE*___"
  params:
    - name: mode
      type: integer
      description: "0: Toggle, 1: On, 2: Off"

- id: surround
  label: Surround
  kind: action
  command: "ACSU*___"
  params:
    - name: mode
      type: integer
      description: "0: Toggle, 1: On, 2: Off"

- id: audio_selection
  label: Audio Selection Toggle
  kind: action
  command: "ACHAx___"
  params:
    - name: x
      type: integer
      description: "Placeholder; any numerical value"
  notes: "Toggle audio selection."

- id: sleep_timer
  label: Sleep Timer
  kind: action
  command: "OFTM*___"
  params:
    - name: value
      type: integer
      description: "0: Off, 1: 30 MIN, 2: 60 MIN, 3: 90 MIN, 4: 120 MIN"

- id: channel_direct_analog
  label: Direct Analog Channel
  kind: action
  command: "DCCH***_"
  params:
    - name: channel
      type: integer
      description: "Analog TV channel number (1-135). Air 2-69 effective, Cable 1-135 effective."

- id: channel_direct_digital_air
  label: Direct Digital Air Channel
  kind: action
  command: "DA2P****"
  params:
    - name: number
      type: integer
      description: "Digital Air two-part channel (0100-9999)"

- id: channel_digital_cable_major
  label: Digital Cable Channel Major
  kind: action
  command: "DC2U***_"
  params:
    - name: major
      type: integer
      description: "Digital Cable two-part major channel (1-999)"

- id: channel_digital_cable_minor
  label: Digital Cable Channel Minor
  kind: action
  command: "DC2L***_"
  params:
    - name: minor
      type: integer
      description: "Digital Cable two-part minor channel (0-999)"

- id: channel_digital_cable_one_part_lt_10000
  label: Digital Cable One-Part Channel (<10000)
  kind: action
  command: "DC10****"
  params:
    - name: number
      type: integer
      description: "Digital Cable one-part channel (0-9999)"

- id: channel_digital_cable_one_part_ge_10000
  label: Digital Cable One-Part Channel (>=10000)
  kind: action
  command: "DC11****"
  params:
    - name: number
      type: integer
      description: "Digital Cable one-part channel (0-6383)"

- id: channel_up
  label: Channel Up
  kind: action
  command: "CHUPx___"
  params:
    - name: x
      type: integer
      description: "Placeholder; any numerical value"
  notes: "Channel +1. If not on TV, switches input to TV."

- id: channel_down
  label: Channel Down
  kind: action
  command: "CHDWx___"
  params:
    - name: x
      type: integer
      description: "Placeholder; any numerical value"
  notes: "Channel -1. If not on TV, switches input to TV."

- id: closed_caption_toggle
  label: Closed Caption Toggle
  kind: action
  command: "CLCPx___"
  params:
    - name: x
      type: integer
      description: "Placeholder; any numerical value"
  notes: "Toggle closed caption."


```

## Feedbacks
```yaml
- id: ack_ok
  type: enum
  values: [ok]
  notes: "Normal response: 'OK' + CR (0DH)"

- id: ack_err
  type: enum
  values: [err]
  notes: "Problem response (communication error or incorrect command): 'ERR' + CR (0DH). Also returned when parameter out of adjustable range."
```

## Variables
```yaml
# UNRESOLVED: source enumerates parameter ranges inline in Actions; no separate variable definitions.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: The RS-232C section documents no command interlocks or power-on sequencing requirements.
```

## Notes
- Frame format: `C1 C2 C3 C4 P1 P2 P3 P4` = 8 ASCII codes + CR (0x0D). Parameter is 4 chars left-aligned, padded with spaces (underscores in the table are notation for ASCII spaces, never literal transmitted underscores).
- Send commands one at a time; wait for OK response before next command.
- Out-of-range parameter returns ERR.
- The manual illustrates generic query parameters `?   ` and `????`, but says only that some commands accept them. It does not identify which opcodes support querying. No per-opcode query actions are asserted; query applicability and response formats remain UNRESOLVED.
- Underscore `_` in parameter column = enter a space. Asterisk `*` = enter value in range indicated in CONTROL CONTENTS.
- Commands not in table not guaranteed to operate.

- Evidence: Sharp LC-60E77UN / LC-65E77UM Operation Manual, printed page 41 (PDF page 43), RS-232C Port Specifications. Official source: https://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC60E77UN_65E77UM.pdf
- Command strings above use the manufacturer's table notation: replace `*`/`x` with the documented numeric parameter, left-align within the four-character field, pad the remainder with ASCII spaces, then append CR. The opcode is always four ASCII characters; the full transmitted frame is nine bytes including CR. Do not transmit the table placeholders literally.
- No hardware validation has been performed. Compatibility is limited to the two model names printed in this manual.

## Provenance

```yaml
source_domains:
  - files.sharpusa.com
source_urls:
  - https://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC60E77UN_65E77UM.pdf
retrieved_at: 2026-09-26T14:23:18.471Z
last_checked_at: 2026-09-26T14:23:18.471Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:18.471Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 commands match the exact LC-60E77UN/LC-65E77UM source; serial settings and CR framing match, and auth is unresolved. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range not stated in source"
- "source does not establish authentication requirements"
- "source enumerates parameter ranges inline in Actions; no separate variable definitions."
- "source documents no unsolicited notifications."
- "source documents no multi-step sequences."
- "The RS-232C section documents no command interlocks or power-on sequencing requirements."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
