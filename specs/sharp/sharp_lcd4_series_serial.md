---
spec_id: admin/sharp-lcd4-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCD4 Series Control Spec"
manufacturer: Sharp
model_family: "LCD4 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LCD4 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
  - manualslib.com
source_urls:
  - https://web.archive.org/web/20171124130944if_/http://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC26_32_37D4U.pdf
  - https://www.manualslib.com/manual/1052237/SHARP-LC-26D4U.html
retrieved_at: 2026-05-27T18:10:32.985Z
last_checked_at: 2026-06-12T19:38:26.779Z
generated_at: 2026-06-12T19:38:26.779Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no unsolicited event notifications documented"
  - "no discrete settable parameters outside action/feedback commands"
  - "no unsolicited notifications documented"
  - "no multi-step sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "no firmware version stated"
  - "no unsolicited event notifications"
  - "no power-on sequencing documented"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:38:26.779Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched literally against source command table; transport parameters verified; source fully represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sharp LCD4 Series Control Spec

## Summary
Sharp LCD4 Series commercial LCD display controlled via RS-232C serial. Eight-byte ASCII command format: 4-char command + 4-char parameter + CR. Responses: OK (success) or ERR (error). No authentication required.

<!-- UNRESOLVED: no unsolicited event notifications documented -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # POWR command present
- routable    # input selection commands present
- queryable   # "?" parameter returns current setting
- levelable   # VOLM, HPOS, VPOS present
```

## Actions
```yaml
- id: power_set
  label: Power Set / Standby
  kind: action
  command: "POWR 0   "  # CR (0DH) appended; "0" + 3 spaces = standby
  params:
    - name: value
      type: integer
      description: 0 = standby (only documented value)

- id: input_selection_toggle
  label: Input Selection Toggle
  kind: action
  command: "ITGD x   "  # x = any value; 3 trailing spaces
  params:
    - name: value
      type: integer
      description: 0 = toggle (x = any value, parameter ignored on toggle)

- id: input_tv
  label: Input TV
  kind: action
  command: "ITVD x   "  # x = any value
  params:
    - name: value
      type: integer
      description: 0 = TV (x = any value)

- id: input_av
  label: Input AV (1-4)
  kind: action
  command: "IAVD{terminal}  "  # terminal = 1-4
  params:
    - name: terminal
      type: integer
      description: Terminal number 1-4
    - name: value
      type: integer
      description: 0=AUTO, 1=VIDEO, 2=COMPONENT (appended after terminal; source shows IAVD*__ with * = terminal)

- id: av_mode
  label: AV Mode Selection
  kind: action
  command: "AVMD{mode}  "
  params:
    - name: mode
      type: integer
      description: 0=toggle, 1=STANDARD, 2=MOVIE, 3=GAME, 4=USER, 5=DYNAMIC(fixed), 6=DYNAMIC

- id: volume
  label: Volume
  kind: action
  command: "VOLM{level:2}  "  # level 0-60, zero-padded to 2 digits, 2 trailing spaces
  params:
    - name: level
      type: integer
      description: Volume level 0-60

- id: h_position
  label: Horizontal Position
  kind: action
  command: "HPOS{offset:3} "  # ±10, signed 3-digit, 1 trailing space
  params:
    - name: offset
      type: integer
      description: AV mode, range ±10

- id: v_position
  label: Vertical Position
  kind: action
  command: "VPOS{offset:3} "  # ±20, signed 3-digit, 1 trailing space
  params:
    - name: offset
      type: integer
      description: AV mode, range ±20

- id: viewmode
  label: Viewmode / Aspect Ratio
  kind: action
  command: "WIDE{mode}  "
  params:
    - name: mode
      type: integer
      description: 0=toggle, 1=Side Bar[AV], 2=S.Stretch[AV], 3=Zoom[AV], 4=Stretch[AV]

- id: mute
  label: Mute
  kind: action
  command: "MUTE{value}  "
  params:
    - name: value
      type: integer
      description: 0=toggle, 1=on, 2=off

- id: surround
  label: Surround
  kind: action
  command: "ACSU{value}  "
  params:
    - name: value
      type: integer
      description: 0=toggle, 1=on, 2=off

- id: audio_selection
  label: Audio Selection Toggle
  kind: action
  command: "ACHA x   "  # x = any value
  params:
    - name: value
      type: integer
      description: toggle (x = any value)

- id: sleep_timer
  label: Sleep Timer
  kind: action
  command: "OFTM{minutes}  "
  params:
    - name: minutes
      type: integer
      description: 0=OFF, 1=30min, 2=60min, 3=90min, 4=120min

- id: channel_direct_analog
  label: Channel Direct (Analog)
  kind: action
  command: "DCCH{channel:3} "  # 1-125, 3-digit, 1 trailing space
  params:
    - name: channel
      type: integer
      description: Channel 1-125

- id: channel_direct_digital
  label: Channel Direct (Digital)
  kind: action
  command: "DA2P{channel:4}"  # 0101-9999, 4-digit, 0 trailing spaces
  params:
    - name: channel
      type: integer
      description: Two-part number, 0101-9999

- id: channel_digital_major
  label: Digital Cable Major Channel
  kind: action
  command: "DC2U{channel:3} "  # 0-999, 3-digit, 1 trailing space
  params:
    - name: channel
      type: integer
      description: 0-999

- id: channel_digital_minor
  label: Digital Cable Sub Channel
  kind: action
  command: "DC2L{channel:3} "  # 0-999, 3-digit, 1 trailing space
  params:
    - name: channel
      type: integer
      description: 0-999
```

## Feedbacks
```yaml
- id: response_ok
  label: Normal Response
  type: string
  values:
    - OK

- id: response_err
  label: Error Response
  type: string
  values:
    - ERR

- id: power_state
  label: Power Status Query
  type: query
  command: "POWR ?   "
  params: []

- id: av_mode_status
  label: AV Mode Query
  type: query
  command: "AVMD ?   "
  params: []

- id: volume_status
  label: Volume Query
  type: query
  command: "VOLM ?   "
  params: []

- id: input_status
  label: Input Selection Query
  type: query
  command: "ITGD ?   "
  params: []

- id: mute_status
  label: Mute Status Query
  type: query
  command: "MUTE ?   "
  params: []

- id: surround_status
  label: Surround Status Query
  type: query
  command: "ACSU ?   "
  params: []

- id: channel_status
  label: Channel Query
  type: query
  command: "DCCH ?   "
  params: []
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside action/feedback commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: 8 ASCII characters (4 command + 4 parameter) + CR (0DH). Parameters aligned left, padded with spaces. "?" returns current setting value. Wait for OK response before sending next command.

Each `command:` field above shows the literal 4-char mnemonic followed by the 4-char parameter field (padded with spaces per source examples: `POWR 0___`, `VOLM**__`, `HPOS***_`, `DA2P****`). The mnemonic and parameter concatenation IS the 8-byte command string; append CR (0DH) on the wire.

`x` in source = "any value", typically `0` is used as documented literal. Underbar `_` in source = space character.

<!-- UNRESOLVED: no firmware version stated -->
<!-- UNRESOLVED: no unsolicited event notifications -->
<!-- UNRESOLVED: no power-on sequencing documented -->

## Provenance

```yaml
source_domains:
  - web.archive.org
  - manualslib.com
source_urls:
  - https://web.archive.org/web/20171124130944if_/http://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC26_32_37D4U.pdf
  - https://www.manualslib.com/manual/1052237/SHARP-LC-26D4U.html
retrieved_at: 2026-05-27T18:10:32.985Z
last_checked_at: 2026-06-12T19:38:26.779Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:38:26.779Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched literally against source command table; transport parameters verified; source fully represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no unsolicited event notifications documented"
- "no discrete settable parameters outside action/feedback commands"
- "no unsolicited notifications documented"
- "no multi-step sequences documented"
- "no safety warnings or interlock procedures in source"
- "no firmware version stated"
- "no unsolicited event notifications"
- "no power-on sequencing documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
