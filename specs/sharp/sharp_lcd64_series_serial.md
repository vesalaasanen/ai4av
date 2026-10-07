---
spec_id: admin/sharp-lcd64-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCD64 Series Control Spec"
manufacturer: Sharp
model_family: "LCD64 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LCD64 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.sharpusa.com
source_urls:
  - http://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC32_37D64U.pdf
  - http://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC65D64U.pdf
retrieved_at: 2026-05-26T01:16:21.484Z
last_checked_at: 2026-10-07T13:20:41.295Z
generated_at: 2026-10-07T13:20:41.295Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model variant not specified beyond \"LCD64 Series\""
  - "source marks this parameter with an asterisk but does not state its numeric range; control is a toggle"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "INP1 and INP3 signal-type applicability per input mode not fully documented in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:20:41.295Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 action units match source commands with correct shapes; serial transport supported; the source's 18 commands fully covered. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sharp LCD64 Series Control Spec

## Summary
Sharp LCD64 Series professional display controlled via RS-232C. Commands use an eight-ASCII-character format: a four-character command followed by a four-character parameter, then CR (0x0D). Normal responses are `OK` + CR; problem responses are `ERR` + CR. Baud rate 9600, 8 data bits, no parity, 1 stop bit, no flow control.

<!-- UNRESOLVED: device model variant not specified beyond "LCD64 Series" -->

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
  type: UNRESOLVED
```

## Traits
```yaml
- powerable      # POWR on/off commands present
- routable       # Input selection commands present
- levelable      # VOLM, HPOS, VPOS, CLCK, PHSE adjustment commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "POWR{value}"
  params:
    - name: value
      type: integer
      description: 1 (parameter is left-aligned and padded with spaces to four characters)

- id: power_off
  label: Power Off
  kind: action
  command: "POWR{value}"
  params:
    - name: value
      type: integer
      description: 0 (shifts to standby; parameter is left-aligned and padded with spaces to four characters)

- id: set_power_on_command
  label: Set Power On Command Acceptance
  kind: action
  command: "RSPW{value}"
  params:
    - name: value
      type: integer
      description: 0=reject power-on command, 1=accept power-on command

- id: input_toggle_a
  label: Input Selection A Toggle
  kind: action
  command: "ITGD{value}"
  params:
    - name: value
      type: integer
      description: Any numerical value; acts as the input-change toggle

- id: select_tv
  label: Select TV Input
  kind: action
  command: "ITVD{value}"
  params:
    - name: value
      type: integer
      description: 0 (channel remains at its last memory)

- id: select_input_a
  label: Select Input 1-6 (IAVD)
  kind: action
  command: "IAVD{input}"
  params:
    - name: input
      type: integer
      description: Input terminal number (1-6)

- id: select_input1_type
  label: Select Input 1 Type (INP1)
  kind: action
  command: "INP1{type}"
  params:
    - name: type
      type: integer
      description: 0=AUTO, 1=VIDEO, 2=COMPONENT; an input change is also included

- id: select_input3_type
  label: Select Input 3 Type (INP3)
  kind: action
  command: "INP3{type}"
  params:
    - name: type
      type: integer
      description: 0=AUTO, 1=VIDEO, 2=COMPONENT

- id: set_av_mode
  label: AV Mode Selection
  kind: action
  command: "AVMD{mode}"
  params:
    - name: mode
      type: integer
      description: 0=Toggle, 1=STANDARD, 2=MOVIE, 3=GAME, 4=USER, 5=DYNAMIC(Fixed), 6=DYNAMIC, 7=PC, 8=xvYCC; selection operates as a toggle internally

- id: set_volume
  label: Volume
  kind: action
  command: "VOLM{level}"
  params:
    - name: level
      type: integer
      description: Volume level (0-60)

- id: set_h_position
  label: Horizontal Position (HPOS)
  kind: action
  command: "HPOS{position}"
  params:
    - name: position
      type: integer
      description: Screen position range depends on View Mode or signal type; ranges are shown on the position-setting screen

- id: set_v_position
  label: Vertical Position (VPOS)
  kind: action
  command: "VPOS{position}"
  params:
    - name: position
      type: integer
      description: Screen position range depends on View Mode or signal type; ranges are shown on the position-setting screen

- id: set_clock
  label: Clock (PC mode only)
  kind: action
  command: "CLCK{value}"
  params:
    - name: value
      type: integer
      description: Clock value (0-180); PC mode only

- id: set_phase
  label: Phase (PC mode only)
  kind: action
  command: "PHSE{value}"
  params:
    - name: value
      type: integer
      description: Phase value (0-40); PC mode only

- id: set_viewmode
  label: View Mode / Aspect Ratio
  kind: action
  command: "WIDE{mode}"
  params:
    - name: mode
      type: integer
      description: 0=Toggle, 1=Side Bar [AV], 2=S.Stretch [AV], 3=Zoom [AV], 4=Stretch [AV], 5=Normal [PC], 6=Zoom [PC], 7=Stretch [PC], 8=Dot by Dot [PC/AV], 9=Full Screen [AV]. 0 operates as a toggle internally. 1 is available only with a 4:3 signal; 5 and 6 only with a 4:3 signal; 8 [PC] except with UXGA and 8 [AV] only with 1080i/p; 9 only with 720p

- id: set_mute
  label: Mute
  kind: action
  command: "MUTE{value}"
  params:
    - name: value
      type: integer
      description: 0=Toggle, 1=On, 2=Off

- id: set_surround
  label: Surround
  kind: action
  command: "ACSU{value}"
  params:
    - name: value
      type: integer
      description: 0=Toggle, 1=On, 3=Off

- id: audio_selection_toggle
  label: Audio Selection Toggle (ACHA)
  kind: action
  command: "ACHA{value}"
  params:
    - name: value
      type: integer
      description: Any numerical value; toggles audio selection

- id: sleep_timer_toggle
  label: Sleep Timer Toggle (OFTM)
  kind: action
  command: "OFTM{value}"
  params:
    - name: value
      type: integer
      description: UNRESOLVED: source marks this parameter with an asterisk but does not state its numeric range; control is a toggle
```

## Feedbacks
```yaml
- id: response
  type: enum
  values:
    - OK
    - ERR
  description: Normal response is "OK" followed by CR (0x0D). Problem response for communication error or incorrect command is "ERR" followed by CR.

- id: power_state
  type: enum
  values:
    - standby
    - on
  description: Source documents these power settings; a power-state query or returned state format is UNRESOLVED.

- id: viewmode_state
  type: enum
  values:
    - side_bar
    - s_stretch
    - zoom_av
    - stretch_av
    - normal_pc
    - zoom_pc
    - stretch_pc
    - dot_by_dot_pc
    - full_screen_av
  description: Source documents these view-mode settings; a query or returned state format is UNRESOLVED.

- id: mute_state
  type: enum
  values:
    - on
    - off
  description: Source documents these mute settings; a query or returned state format is UNRESOLVED.
```

## Variables
```yaml
- id: volume_level
  type: integer
  range: [0, 60]
  command: UNRESOLVED
  description: Volume range is documented; a command for reading the current level is UNRESOLVED.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
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
Command format is eight ASCII characters: four command characters followed by four parameter characters, then CR (0x0D). Parameters are left-aligned and padded with spaces to four characters. The source lists `?` as a valid parameter character but does not specify its function or which commands support it. Responses are `OK` or `ERR` followed by CR. Wait for an OK response before sending the next command; do not send multiple commands simultaneously. RSPW controls whether the TV accepts the Power On command (POWR with parameter 1).
<!-- UNRESOLVED: INP1 and INP3 signal-type applicability per input mode not fully documented in source -->

## Provenance

```yaml
source_domains:
  - files.sharpusa.com
source_urls:
  - http://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC32_37D64U.pdf
  - http://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC65D64U.pdf
retrieved_at: 2026-05-26T01:16:21.484Z
last_checked_at: 2026-10-07T13:20:41.295Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:20:41.295Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 action units match source commands with correct shapes; serial transport supported; the source's 18 commands fully covered. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model variant not specified beyond \"LCD64 Series\""
- "source marks this parameter with an asterisk but does not state its numeric range; control is a toggle"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "INP1 and INP3 signal-type applicability per input mode not fully documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
