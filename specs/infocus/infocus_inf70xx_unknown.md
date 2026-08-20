---
spec_id: admin/infocus-inl3148hd
schema_version: ai4av-public-spec-v1
revision: 1
title: "InFocus INL3148HD Control Spec"
manufacturer: InFocus
model_family: IN134ST
aliases: []
compatible_with:
  manufacturers:
    - InFocus
  models:
    - IN134ST
    - IN136ST
    - IN138HDST
    - IN2134
    - IN2136
    - IN2138HD
    - INL3148HD
    - INL3149WU
    - INL4128
    - INL4129
    - IN1048SL
    - IN1049SL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-05-14T23:45:29.050Z
last_checked_at: 2026-08-19T09:25:15.044Z
generated_at: 2026-08-19T09:25:15.044Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input device name was \"InFocus INF70xx\" but no INF70xx model appears in source — INL3148HD used as representative. The provided \"Known protocol\" was blank; populated serial from explicit RS-232 setting row in source."
  - "source documents no unsolicited notification events."
  - "source documents no multi-step macro sequences."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "firmware version compatibility, port number (if serial over USB-to-RS-232 adapter), and whether the commands require CR/LF framing not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:25:15.044Z
  matched_actions: 121
  action_count: 121
  confidence: medium
  summary: "All 121 spec actions (queries, sets, !-return variants) match source command table verbatim; transport row matches. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-12
---

# InFocus INL3148HD Control Spec

## Summary
RS-232 control spec for InFocus IN13xST / IN213x / INL314x / INL412x projector families. Covers power, blank, source select, aspect ratio, ECO mode, volume, mute, lamp hour queries, ceiling orientation, brightness, contrast, preset modes, freeze, and keypad navigation. Connection is serial only; the source documents no network control.

<!-- UNRESOLVED: input device name was "InFocus INF70xx" but no INF70xx model appears in source — INL3148HD used as representative. The provided "Known protocol" was blank; populated serial from explicit RS-232 setting row in source. -->

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
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from PWR power command examples
- routable        # inferred from SRC source-select command examples
- queryable       # inferred from PWR?/SRC?/VOL?/etc. query command examples
- levelable       # inferred from VOL, BRT, CON level commands
```

## Actions
```yaml
- id: power_query
  label: Power Status Query
  kind: query
  command: "(PWR?)"
  params: []
- id: power_on
  label: Power On
  kind: action
  command: "(PWR1)"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "(PWR0)"
  params: []
- id: power_on_return
  label: Power On & Return Status
  kind: action
  command: "(PWR1!)"
  params: []
- id: power_off_return
  label: Power Off & Return Status
  kind: action
  command: "(PWR0!)"
  params: []

- id: blank_query
  label: Blank Status Query
  kind: query
  command: "(BLK?)"
  params: []
- id: blank_on
  label: Blank On
  kind: action
  command: "(BLK1)"
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  command: "(BLK0)"
  params: []
- id: blank_on_return
  label: Blank On & Return Status
  kind: action
  command: "(BLK1!)"
  params: []
- id: blank_off_return
  label: Blank Off & Return Status
  kind: action
  command: "(BLK0!)"
  params: []

- id: source_query
  label: Source Status Query
  kind: query
  command: "(SRC?)"
  params: []
- id: source_computer1
  label: Select Computer1
  kind: action
  command: "(SRC0)"
  params: []
- id: source_computer2
  label: Select Computer2
  kind: action
  command: "(SRC1)"
  params: []
- id: source_video
  label: Select VIDEO
  kind: action
  command: "(SRC11)"
  params: []
- id: source_svideo
  label: Select S-VIDEO
  kind: action
  command: "(SRC12)"
  params: []
- id: source_hdmi1
  label: Select HDMI1
  kind: action
  command: "(SRC4)"
  params: []
- id: source_hdmi2
  label: Select HDMI2
  kind: action
  command: "(SRC5)"
  params: []
- id: source_hdmi3
  label: Select HDMI3
  kind: action
  command: "(SRC6)"
  params: []
- id: source_hdbaset
  label: Select HDBaseT
  kind: action
  command: "(SRC17)"
  params: []
- id: source_computer1_return
  label: Select Computer1 & Return
  kind: action
  command: "(SRC0!)"
  params: []
- id: source_computer2_return
  label: Select Computer2 & Return
  kind: action
  command: "(SRC1!)"
  params: []
- id: source_video_return
  label: Select VIDEO & Return
  kind: action
  command: "(SRC11!)"
  params: []
- id: source_svideo_return
  label: Select S-VIDEO & Return
  kind: action
  command: "(SRC12!)"
  params: []
- id: source_hdmi1_return
  label: Select HDMI1 & Return
  kind: action
  command: "(SRC4!)"
  params: []
- id: source_hdmi2_return
  label: Select HDMI2 & Return
  kind: action
  command: "(SRC5!)"
  params: []
- id: source_hdmi3_return
  label: Select HDMI3 & Return
  kind: action
  command: "(SRC6!)"
  params: []
- id: source_hdbaset_return
  label: Select HDBaseT & Return
  kind: action
  command: "(SRC17!)"
  params: []

- id: aspect_query
  label: Aspect Status Query
  kind: query
  command: "(ARZ?)"
  params: []
- id: aspect_auto
  label: Aspect Auto
  kind: action
  command: "(ARZ0)"
  params: []
- id: aspect_native
  label: Aspect Native
  kind: action
  command: "(ARZ1)"
  params: []
- id: aspect_4x3
  label: Aspect 4x3
  kind: action
  command: "(ARZ2)"
  params: []
- id: aspect_16x9
  label: Aspect 16x9
  kind: action
  command: "(ARZ3)"
  params: []
- id: aspect_letterbox
  label: Aspect Letterbox
  kind: action
  command: "(ARZ4)"
  params: []
- id: aspect_16x10
  label: Aspect 16x10
  kind: action
  command: "(ARZ6)"
  params: []
- id: aspect_auto_return
  label: Aspect Auto & Return
  kind: action
  command: "(ARZ0!)"
  params: []
- id: aspect_native_return
  label: Aspect Native & Return
  kind: action
  command: "(ARZ1!)"
  params: []
- id: aspect_4x3_return
  label: Aspect 4x3 & Return
  kind: action
  command: "(ARZ2!)"
  params: []
- id: aspect_16x9_return
  label: Aspect 16x9 & Return
  kind: action
  command: "(ARZ3!)"
  params: []
- id: aspect_letterbox_return
  label: Aspect Letterbox & Return
  kind: action
  command: "(ARZ4!)"
  params: []
- id: aspect_16x10_return
  label: Aspect 16x10 & Return
  kind: action
  command: "(ARZ6!)"
  params: []

- id: eco_query
  label: Lamp Low Power (ECO) Status Query
  kind: query
  command: "(IPM?)"
  params: []
- id: eco_on
  label: ECO Mode On
  kind: action
  command: "(IPM1)"
  params: []
- id: eco_off
  label: ECO Mode Off
  kind: action
  command: "(IPM0)"
  params: []
- id: eco_on_return
  label: ECO Mode On & Return
  kind: action
  command: "(IPM1!)"
  params: []
- id: eco_off_return
  label: ECO Mode Off & Return
  kind: action
  command: "(IPM0!)"
  params: []

- id: volume_query
  label: Volume Status Query
  kind: query
  command: "(VOL?)"
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  command: "(VOL+)"
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  command: "(VOL-)"
  params: []
- id: volume_set
  label: Set Volume
  kind: action
  command: "(VOL{level})"
  params:
    - name: level
      type: integer
      description: Volume level 0-10
- id: volume_up_return
  label: Volume Up & Return
  kind: action
  command: "(VOL+!)"
  params: []
- id: volume_down_return
  label: Volume Down & Return
  kind: action
  command: "(VOL-!)"
  params: []
- id: volume_set_return
  label: Set Volume & Return
  kind: action
  command: "(VOL{level}!)"
  params:
    - name: level
      type: integer
      description: Volume level 0-10

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "(MTE?)"
  params: []
- id: mute_on
  label: Mute On
  kind: action
  command: "(MTE1)"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "(MTE0)"
  params: []
- id: mute_on_return
  label: Mute On & Return
  kind: action
  command: "(MTE1!)"
  params: []
- id: mute_off_return
  label: Mute Off & Return
  kind: action
  command: "(MTE0!)"
  params: []

- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  command: "(FVS?)"
  params: []
- id: lamp_eco_hours_query
  label: Lamp ECO Hours Query
  kind: query
  command: "(LME?)"
  params: []
- id: lamp_normal_hours_query
  label: Lamp Normal Hours Query
  kind: query
  command: "(LMO?)"
  params: []
- id: lamp_dynamic_hours_query
  label: Lamp Dynamic Hours Query
  kind: query
  command: "(LML?)"
  params: []
- id: lamp_hours_query
  label: Lamp Hours Query
  kind: query
  command: "(LMP?)"
  params: []
- id: total_eco_hours_query
  label: Total ECO Hours Query
  kind: query
  command: "(LTE?)"
  params: []
- id: total_normal_hours_query
  label: Total Normal Hours Query
  kind: query
  command: "(LTO?)"
  params: []
- id: total_dynamic_hours_query
  label: Total Dynamic Hours Query
  kind: query
  command: "(LTL?)"
  params: []
- id: total_hours_query
  label: Total Hours Query
  kind: query
  command: "(LMT?)"
  params: []
- id: lamp_reset_count_query
  label: Lamp Reset Count Query
  kind: query
  command: "(LMR?)"
  params: []
- id: lamp_hours_reset
  label: Lamp Hours Reset
  kind: action
  command: "(LRT1)"
  params: []

- id: ceiling_query
  label: Ceiling/Projection Orientation Query
  kind: query
  command: "(CEL?)"
  params: []
- id: ceiling_front_table
  label: Front Table
  kind: action
  command: "(CEL0)"
  params: []
- id: ceiling_front_ceiling
  label: Front Ceiling
  kind: action
  command: "(CEL1)"
  params: []
- id: ceiling_rear_table
  label: Rear Table
  kind: action
  command: "(CEL2)"
  params: []
- id: ceiling_rear_ceiling
  label: Rear Ceiling
  kind: action
  command: "(CEL3)"
  params: []
- id: ceiling_front_table_return
  label: Front Table & Return
  kind: action
  command: "(CEL0!)"
  params: []
- id: ceiling_front_ceiling_return
  label: Front Ceiling & Return
  kind: action
  command: "(CEL1!)"
  params: []
- id: ceiling_rear_table_return
  label: Rear Table & Return
  kind: action
  command: "(CEL2!)"
  params: []
- id: ceiling_rear_ceiling_return
  label: Rear Ceiling & Return
  kind: action
  command: "(CEL3!)"
  params: []

- id: brightness_query
  label: Brightness Status Query
  kind: query
  command: "(BRT?)"
  params: []
- id: brightness_up
  label: Brightness Up
  kind: action
  command: "(BRT+)"
  params: []
- id: brightness_down
  label: Brightness Down
  kind: action
  command: "(BRT-)"
  params: []
- id: brightness_set
  label: Set Brightness
  kind: action
  command: "(BRT{level})"
  params:
    - name: level
      type: integer
      description: Brightness 0-100
- id: brightness_up_return
  label: Brightness Up & Return
  kind: action
  command: "(BRT+!)"
  params: []
- id: brightness_down_return
  label: Brightness Down & Return
  kind: action
  command: "(BRT-!)"
  params: []
- id: brightness_set_return
  label: Set Brightness & Return
  kind: action
  command: "(BRT{level}!)"
  params:
    - name: level
      type: integer
      description: Brightness 0-100

- id: contrast_query
  label: Contrast Status Query
  kind: query
  command: "(CON?)"
  params: []
- id: contrast_up
  label: Contrast Up
  kind: action
  command: "(CON+)"
  params: []
- id: contrast_down
  label: Contrast Down
  kind: action
  command: "(CON-)"
  params: []
- id: contrast_set
  label: Set Contrast
  kind: action
  command: "(CON{level})"
  params:
    - name: level
      type: integer
      description: Contrast 0-100
- id: contrast_up_return
  label: Contrast Up & Return
  kind: action
  command: "(CON+!)"
  params: []
- id: contrast_down_return
  label: Contrast Down & Return
  kind: action
  command: "(CON-!)"
  params: []
- id: contrast_set_return
  label: Set Contrast & Return
  kind: action
  command: "(CON{level}!)"
  params:
    - name: level
      type: integer
      description: Contrast 0-100

- id: preset_query
  label: Preset Status Query
  kind: query
  command: "(PST?)"
  params: []
- id: preset_user
  label: Preset User
  kind: action
  command: "(PST1)"
  params: []
- id: preset_presentation
  label: Preset Presentation
  kind: action
  command: "(PST5)"
  params: []
- id: preset_movie
  label: Preset Movie
  kind: action
  command: "(PST7)"
  params: []
- id: preset_bright
  label: Preset Bright
  kind: action
  command: "(PST10)"
  params: []
- id: preset_srgb
  label: Preset sRGB
  kind: action
  command: "(PST11)"
  params: []
- id: preset_blackboard
  label: Preset Blackboard
  kind: action
  command: "(PST12)"
  params: []
- id: preset_user_return
  label: Preset User & Return
  kind: action
  command: "(PST1!)"
  params: []
- id: preset_presentation_return
  label: Preset Presentation & Return
  kind: action
  command: "(PST5!)"
  params: []
- id: preset_movie_return
  label: Preset Movie & Return
  kind: action
  command: "(PST7!)"
  params: []
- id: preset_bright_return
  label: Preset Bright & Return
  kind: action
  command: "(PST10!)"
  params: []
- id: preset_srgb_return
  label: Preset sRGB & Return
  kind: action
  command: "(PST11!)"
  params: []
- id: preset_blackboard_return
  label: Preset Blackboard & Return
  kind: action
  command: "(PST12!)"
  params: []

- id: freeze_query
  label: Freeze Status Query
  kind: query
  command: "(FRZ?)"
  params: []
- id: freeze_on
  label: Freeze On
  kind: action
  command: "(FRZ1)"
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  command: "(FRZ0)"
  params: []
- id: freeze_on_return
  label: Freeze On & Return
  kind: action
  command: "(FRZ1!)"
  params: []
- id: freeze_off_return
  label: Freeze Off & Return
  kind: action
  command: "(FRZ0!)"
  params: []

- id: keypad_menu
  label: Keypad Menu
  kind: action
  command: "(NAV0)"
  params: []
- id: keypad_up
  label: Keypad Up
  kind: action
  command: "(NAV1)"
  params: []
- id: keypad_down
  label: Keypad Down
  kind: action
  command: "(NAV2)"
  params: []
- id: keypad_select
  label: Keypad Select
  kind: action
  command: "(NAV3)"
  params: []
- id: keypad_left
  label: Keypad Left
  kind: action
  command: "(NAV4)"
  params: []
- id: keypad_right
  label: Keypad Right
  kind: action
  command: "(NAV5)"
  params: []
- id: keypad_menu_return
  label: Keypad Menu & Return
  kind: action
  command: "(NAV0!)"
  params: []
- id: keypad_up_return
  label: Keypad Up & Return
  kind: action
  command: "(NAV1!)"
  params: []
- id: keypad_down_return
  label: Keypad Down & Return
  kind: action
  command: "(NAV2!)"
  params: []
- id: keypad_select_return
  label: Keypad Select & Return
  kind: action
  command: "(NAV3!)"
  params: []
- id: keypad_left_return
  label: Keypad Left & Return
  kind: action
  command: "(NAV4!)"
  params: []
- id: keypad_right_return
  label: Keypad Right & Return
  kind: action
  command: "(NAV5!)"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
- id: blank_state
  type: enum
  values: [on, off]
- id: source_state
  type: enum
  values: [computer1, computer2, video, svideo, hdmi1, hdmi2, hdmi3, hdbaset]
- id: aspect_state
  type: enum
  values: [auto, native, 4x3, 16x9, letterbox, 16x10]
- id: eco_state
  type: enum
  values: [on, off]
- id: volume_level
  type: integer
  values: 0..10
- id: mute_state
  type: enum
  values: [on, off]
- id: firmware_version
  type: string
- id: lamp_eco_hours
  type: integer
- id: lamp_normal_hours
  type: integer
- id: lamp_dynamic_hours
  type: integer
- id: lamp_hours
  type: integer
- id: total_eco_hours
  type: integer
- id: total_normal_hours
  type: integer
- id: total_dynamic_hours
  type: integer
- id: total_hours
  type: integer
- id: lamp_reset_count
  type: integer
- id: ceiling_state
  type: enum
  values: [front_table, front_ceiling, rear_table, rear_ceiling]
- id: brightness_level
  type: integer
  values: 0..100
- id: contrast_level
  type: integer
  values: 0..100
- id: preset_state
  type: enum
  values: [user, presentation, movie, bright, srgb, blackboard]
- id: freeze_state
  type: enum
  values: [on, off]
- id: keypad_state
  type: enum
  values: [menu, up, down, select, left, right]
```

## Variables
```yaml
# No discrete variables beyond actions and feedbacks. Section retained for completeness.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notification events.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Source RS-232 setting row explicitly states: Lamp Ignition delay = 20s, Power Down delay = 10s, Source change delay = 8s, Intercommand delay minimum = 5ms, Intercharacter delay minimum = 2ms. Apply when driving the projector.
- Source enumerates three model columns: IN134ST/IN136ST/IN138HDST, IN2134/IN2136/IN2138HD, INL3148HD/INL3149WU/INL4128/INL4129/IN1048SL/IN1049SL. Some commands (SRC1/SRC2/SRC12/SRC17/IPT/IPM, lamp-hour queries, lamp reset) are flagged "No" for one or two columns — implementer should check target-model support column.
- The "Yes/No" support columns in source likely indicate whether each model supports the command; not derivable which models were the operator's "INF70xx" target.
- Device name in input was "InFocus INF70xx"; no INF70xx model appears in source. INL3148HD chosen as representative spec_id; compatible_with.models lists every model the source covers.
- No networking, auth, login, or HTTP/REST commands in source. Serial-only.
<!-- UNRESOLVED: firmware version compatibility, port number (if serial over USB-to-RS-232 adapter), and whether the commands require CR/LF framing not stated in source. -->

## Provenance

```yaml
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-05-14T23:45:29.050Z
last_checked_at: 2026-08-19T09:25:15.044Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:25:15.044Z
matched_actions: 121
action_count: 121
confidence: medium
summary: "All 121 spec actions (queries, sets, !-return variants) match source command table verbatim; transport row matches. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input device name was \"InFocus INF70xx\" but no INF70xx model appears in source — INL3148HD used as representative. The provided \"Known protocol\" was blank; populated serial from explicit RS-232 setting row in source."
- "source documents no unsolicited notification events."
- "source documents no multi-step macro sequences."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "firmware version compatibility, port number (if serial over USB-to-RS-232 adapter), and whether the commands require CR/LF framing not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
