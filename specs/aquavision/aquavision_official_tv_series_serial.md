---
spec_id: admin/aquavision-official-tv-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aquavision Official TV Series Control Spec"
manufacturer: Aquavision
model_family: "Official TV Series"
aliases: []
compatible_with:
  manufacturers:
    - Aquavision
  models:
    - "Official TV Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aquavision.tv
source_urls:
  - https://aquavision.tv/wp-content/uploads/2016/08/IR-RS232-Guide.pdf
retrieved_at: 2026-07-21T23:28:38.876Z
last_checked_at: 2026-10-07T12:50:19.314Z
generated_at: 2026-10-07T12:50:19.314Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated; IR codes present in source but excluded from RS-232 spec"
  - "source documents no unsolicited notifications beyond command responses"
  - "source does not document multi-step macro sequences"
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements"
  - "IR section excluded from this RS-232 spec; language/sw-input commands in IR table (P-POSITION, SWAP, MIX, HOLD, P-INPUT, CHANGE SOUND FORMAT, LANGUAGE, TIME) have no corresponding RS-232 row in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:50:19.314Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 action units match source RS232 rows verbatim, transport values (baud, 8N1, no flow control) are supported, and the source catalogue is fully covered. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Aquavision Official TV Series Control Spec

## Summary
RS-232C control spec for Aquavision Official TV Series LCD. Covers power, input select, volume, mute, channel, PIP navigation, teletext, picture/sound modes, and media transport. Baud rate is 115200 (EU) or 38400 (US), 8N1, no flow control.

<!-- UNRESOLVED: firmware version compatibility not stated; IR codes present in source but excluded from RS-232 spec -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # EU; US variant uses 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state an authentication method
```

## Traits
```yaml
- powerable       # inferred from POWR power command
- routable        # inferred from input select commands (IHDM, ISCT, IRGB, IAPC, IAUD, ITVA)
- queryable       # inferred from VOLM??, POWR??, MUTE??, STAT??, MVOL??, IVOL?? queries
- levelable       # inferred from VOLM volume commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "POWR 01"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "PWRX 99"
  params: []

- id: power_state_query
  label: Power State Query
  kind: query
  command: "POWR ??"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "MUTE 01"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE 00"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "MUTE 99"
  params: []

- id: mute_query
  label: Mute Query
  kind: query
  command: "MUTE ??"
  params: []

- id: status_query
  label: Full Status Query (power/mute/volume/input)
  kind: query
  command: "STAT ??"
  params: []

- id: select_input_hdmi2
  label: Select Input HDMI 2
  kind: action
  command: "IHDM 02"
  params: []

- id: select_input_scart2
  label: Select Input SCART 2
  kind: action
  command: "ISCT 02"
  params: []

- id: select_input_rgb
  label: Select Input RGB/Y,Pb,Pr
  kind: action
  command: "IRGB 01"
  params: []

- id: select_input_analog_pc
  label: Select Input Analogue PC
  kind: action
  command: "IAPC 00"
  params: []

- id: select_input_audio
  label: Select Audio Input
  kind: action
  command: "IAUD 04"
  params: []

- id: select_input_tv_analogue
  label: Select Input TV Analogue (with preset)
  kind: action
  command: "ITVA {preset}"
  params:
    - name: preset
      type: integer
      description: Preset number (2-digit, e.g. 01=1, 03=3)

- id: volume_set_25
  label: Volume Set 25
  kind: action
  command: "VOLM 25"
  params: []

- id: volume_set_50
  label: Volume Set 50
  kind: action
  command: "VOLM 50"
  params: []

- id: volume_set_75
  label: Volume Set 75
  kind: action
  command: "VOLM 75"
  params: []

- id: volume_set
  label: Volume Set Variable (01-99)
  kind: action
  command: "VOLM {level}"
  params:
    - name: level
      type: integer
      description: Volume level 01-99

- id: volume_query
  label: Volume State Query
  kind: query
  command: "VOLM ??"
  params: []

- id: initial_volume_set
  label: Set Initial Volume on Power Up
  kind: action
  command: "IVOL {level}"
  params:
    - name: level
      type: integer
      description: Initial volume level

- id: initial_volume_query
  label: Query Initial Volume
  kind: query
  command: "IVOL ??"
  params: []

- id: max_volume_set
  label: Set Maximum Volume
  kind: action
  command: "MVOL {level}"
  params:
    - name: level
      type: integer
      description: Max volume level

- id: max_volume_query
  label: Query Max Volume
  kind: query
  command: "MVOL ??"
  params: []

- id: initial_channel_set
  label: Set Initial Channel
  kind: action
  command: "ICHN {channel}"
  params:
    - name: channel
      type: string
      description: 4-digit preset/channel number

- id: number_0
  label: Number 0
  kind: action
  command: "NMBR 00"
  params: []

- id: number_3
  label: Number 3
  kind: action
  command: "NUMB 00 03"
  params: []

- id: number_4
  label: Number 4
  kind: action
  command: "NUMB 00 04"
  params: []

- id: number_5
  label: Number 5
  kind: action
  command: "NUMB 00 05"
  params: []

- id: number_6
  label: Number 6
  kind: action
  command: "NUMB 00 06"
  params: []

- id: number_7
  label: Number 7
  kind: action
  command: "NMBR 07"
  params: []

- id: enter
  label: Enter
  kind: action
  command: "ENTR"
  params: []

- id: reveal
  label: Reveal
  kind: action
  command: "REVEAL"
  params: []

- id: source_button
  label: Source
  kind: action
  command: "SRCE 00"
  params: []

- id: menu
  label: Menu
  kind: action
  command: "MENU 00"
  params: []

- id: exit
  label: Exit
  kind: action
  command: "EXIT 00"
  params: []

- id: select
  label: Select
  kind: action
  command: "SLCT 00"
  params: []

- id: store
  label: Store
  kind: action
  command: "STOR 00"
  params: []

- id: ch_list
  label: Channel List
  kind: action
  command: "CLST 00"
  params: []

- id: pvr_list
  label: PVR List / USB
  kind: action
  command: "SIZE 00"
  params: []

- id: ssm
  label: SSM (Sound Mode)
  kind: action
  command: "SSMX 00"
  params: []

- id: arc
  label: ARC (Aspect Ratio)
  kind: action
  command: "ARCX 00"
  params: []

- id: aspect_auto_wide
  label: Aspect Auto Wide
  kind: action
  command: "ASPC 07"
  params: []

- id: aspect_14_9
  label: Aspect 14:9
  kind: action
  command: "ASPC 06"
  params: []

- id: ready_state
  label: Ready State
  kind: action
  command: "COND 01"
  params: []

- id: text_on
  label: Teletext On
  kind: action
  command: "TEXT 00"
  params: []

- id: text_mix_off
  label: Teletext / Mix / Off
  kind: action
  command: "TEXT 00"
  params: []

- id: flof_list
  label: FLOF / List
  kind: action
  command: "FLOF 00"
  params: []

- id: cyan
  label: Cyan / Blue (Teletext)
  kind: action
  command: "CYAN 00"
  params: []

- id: red
  label: Red (Teletext)
  kind: action
  command: "REDX 00"
  params: []

- id: channel_up
  label: Channel Up
  kind: action
  command: "UPXX 00"
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  command: "DOWN 00"
  params: []

- id: volume_up
  label: Volume Up / Navigate North
  kind: action
  command: "RGHT 00"
  params: []

- id: volume_down
  label: Volume Down / Navigate South
  kind: action
  command: "LEFT 00"
  params: []

- id: nav_east
  label: Navigate East
  kind: action
  command: "EAST 00"
  params: []

- id: nav_west
  label: Navigate West
  kind: action
  command: "WEST 00"
  params: []

- id: nav_north
  label: Navigate North
  kind: action
  command: "NRTH 00"
  params: []

- id: nav_south
  label: Navigate South
  kind: action
  command: "SUTH 00"
  params: []

- id: pip_pr_minus
  label: PIP Channel Down
  kind: action
  command: "PIPP 00"
  params: []

- id: pip_pr_plus
  label: PIP Channel Up
  kind: action
  command: "PIPP 01"
  params: []

- id: play_pause
  label: Play / Pause
  kind: action
  command: "PLPS 00"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "STOP 00"
  params: []

- id: record
  label: Record / Repeat
  kind: action
  command: "RECX 00"
  params: []

- id: timeshift
  label: Timeshift
  kind: action
  command: "TSFT 00"
  params: []

- id: track_back
  label: Track Back
  kind: action
  command: "TRAK 00"
  params: []

- id: track_forward
  label: Track Forward
  kind: action
  command: "TRAK 01"
  params: []

- id: fast_rewind
  label: Fast Rewind
  kind: action
  command: "FAST 00"
  params: []

- id: fast_forward
  label: Fast Forward
  kind: action
  command: "FAST 01"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  response_pattern: "POWRXX"

- id: mute_state
  type: enum
  values: [on, off]
  response_pattern: "MUTEXX"

- id: volume_state
  type: integer
  range: [0, 99]
  response_pattern: "VOLMXX"

- id: initial_volume
  type: integer
  response_pattern: "IVOLXX"

- id: max_volume
  type: integer
  response_pattern: "MVOLXX"

- id: initial_channel
  type: string
  response_pattern: "ICHNXXXX"

- id: status_full
  type: object
  description: Power, mute, volume, input each followed by carriage return
  response_pattern: "STAT"

- id: command_ack_success
  type: enum
  values: [success, fail]
  response_pattern: "SUCCESS or FAIL"

- id: number_ack
  type: string
  response_pattern: "NMBRXXXX"
```

## Variables
```yaml
- id: initial_volume
  label: Initial Volume on Power Up
  command_set: "IVOL {level}"
  command_query: "IVOL ??"
- id: max_volume
  label: Maximum Volume
  command_set: "MVOL {level}"
  command_query: "MVOL ??"
- id: initial_channel
  label: Initial Channel
  command_set: "ICHN {channel}"
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications beyond command responses
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing requirements
```

## Notes
- DB9 pinout: pin 2 RX, pin 3 TX, pin 5 GND. Other pins unused.
- Baud rate differs by region: EU=115200, US=38400. Confirm region before connecting.
- 8 data bits, no parity, 1 stop bit, no flow control.
- 25ms pause required between commands to allow device to emit SUCCESS/FAIL response.
- Command format generally `{CODE} {PARAM}` with space separator; some commands take two parameters (e.g. `NUMB 00 05`).
- Source contains IR NEC2 codes in parallel to RS-232; out of scope for this serial spec.
- Mixed-case mapping in source: e.g. `NMBR 07` vs `NUMB 00 05` for digits. Both spellings appear to be accepted.
```
<!-- UNRESOLVED: IR section excluded from this RS-232 spec; language/sw-input commands in IR table (P-POSITION, SWAP, MIX, HOLD, P-INPUT, CHANGE SOUND FORMAT, LANGUAGE, TIME) have no corresponding RS-232 row in source -->

## Provenance

```yaml
source_domains:
  - aquavision.tv
source_urls:
  - https://aquavision.tv/wp-content/uploads/2016/08/IR-RS232-Guide.pdf
retrieved_at: 2026-07-21T23:28:38.876Z
last_checked_at: 2026-10-07T12:50:19.314Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:50:19.314Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 action units match source RS232 rows verbatim, transport values (baud, 8N1, no flow control) are supported, and the source catalogue is fully covered. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated; IR codes present in source but excluded from RS-232 spec"
- "source documents no unsolicited notifications beyond command responses"
- "source does not document multi-step macro sequences"
- "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements"
- "IR section excluded from this RS-232 spec; language/sw-input commands in IR table (P-POSITION, SWAP, MIX, HOLD, P-INPUT, CHANGE SOUND FORMAT, LANGUAGE, TIME) have no corresponding RS-232 row in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
