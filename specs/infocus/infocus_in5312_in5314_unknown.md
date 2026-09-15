---
spec_id: admin/infocus-in5312-in5314
schema_version: ai4av-public-spec-v1
revision: 1
title: "InFocus IN5312 IN5314 Control Spec"
manufacturer: InFocus
model_family: IN5312
aliases: []
compatible_with:
  manufacturers:
    - InFocus
  models:
    - IN5312
    - IN5314
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-05-14T16:58:31.188Z
last_checked_at: 2026-09-11T22:17:14.039Z
generated_at: 2026-09-11T22:17:14.039Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source sheet is titled \"IN13xST IN213x INL314x INL412x\" and lists per-family support columns (IN134ST/IN136ST/IN138HDST, IN2134/IN2136/IN2138HD, INL3148HD/INL3149WU/INL4128/INL4129/IN1048SL/IN1049SL); IN5312/IN5314 are not explicitly named in the source, so per-command support for these exact models is unconfirmed"
  - "source contains no explicit safety warnings or interlock procedures."
  - "IN5312/IN5314 not explicitly named in source; which support column applies is unknown"
  - "no TCP/IP, UDP, or network control documented in source"
  - "physical connector type (DB9/DE9 pinout) not stated in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-11T22:17:14.039Z
  matched_actions: 121
  action_count: 121
  confidence: medium
  summary: "All 121 spec wire-literal commands appear verbatim in source RS-232 table; transport parameters (19200 baud / 8-N-1 / no flow control) are stated in source header. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# InFocus IN5312 IN5314 Control Spec

## Summary
RS-232 control command set for InFocus projectors, covering power, source selection, aspect ratio, volume, mute, lamp/firmware status queries, image settings (brightness/contrast/presets), orientation, freeze/blank, and remote keypad emulation. Commands are ASCII strings enclosed in parentheses.

<!-- UNRESOLVED: source sheet is titled "IN13xST IN213x INL314x INL412x" and lists per-family support columns (IN134ST/IN136ST/IN138HDST, IN2134/IN2136/IN2138HD, INL3148HD/INL3149WU/INL4128/INL4129/IN1048SL/IN1049SL); IN5312/IN5314 are not explicitly named in the source, so per-command support for these exact models is unconfirmed -->

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
# - powerable    (PWR1/PWR0 power commands)
# - queryable    (extensive ? status queries with return codes)
# - routable     (SRC source-selection commands)
# - levelable    (VOL/BRT/CON set commands)
traits:
  - powerable
  - queryable
  - routable
  - levelable
```

## Actions
```yaml
# Power
- id: power_status_query
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
  label: Power On & Return
  kind: action
  command: "(PWR1!)"
  params: []
- id: power_off_return
  label: Power Off & Return
  kind: action
  command: "(PWR0!)"
  params: []

# Blank Key
- id: blank_status_query
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
  label: Blank On & Return
  kind: action
  command: "(BLK1!)"
  params: []
- id: blank_off_return
  label: Blank Off & Return
  kind: action
  command: "(BLK0!)"
  params: []

# Source
- id: source_status_query
  label: Source Status Query
  kind: query
  command: "(SRC?)"
  params: []
- id: select_computer1
  label: Select Computer1
  kind: action
  command: "(SRC0)"
  params: []
- id: select_computer2
  label: Select Computer2
  kind: action
  command: "(SRC1)"
  params: []  # note: marked No for first two model families in source, Yes for third
- id: select_video
  label: Select VIDEO
  kind: action
  command: "(SRC11)"
  params: []
- id: select_svideo
  label: Select S-VIDEO
  kind: action
  command: "(SRC12)"
  params: []  # note: marked No for first two model families in source, Yes for third
- id: select_hdmi1
  label: Select HDMI1
  kind: action
  command: "(SRC4)"
  params: []
- id: select_hdmi2
  label: Select HDMI2
  kind: action
  command: "(SRC5)"
  params: []
- id: select_hdmi3
  label: Select HDMI3
  kind: action
  command: "(SRC6)"
  params: []
- id: select_hdbaset
  label: Select HDBaseT
  kind: action
  command: "(SRC17)"
  params: []  # note: marked No for first two model families in source, Yes for third
- id: select_computer1_return
  label: Select Computer1 & Return
  kind: action
  command: "(SRC0!)"
  params: []
- id: select_computer2_return
  label: Select Computer2 & Return
  kind: action
  command: "(SRC1!)"
  params: []
- id: select_video_return
  label: Select VIDEO & Return
  kind: action
  command: "(SRC11!)"
  params: []
- id: select_svideo_return
  label: Select S-VIDEO & Return
  kind: action
  command: "(SRC12!)"
  params: []
- id: select_hdmi1_return
  label: Select HDMI1 & Return
  kind: action
  command: "(SRC4!)"
  params: []
- id: select_hdmi2_return
  label: Select HDMI2 & Return
  kind: action
  command: "(SRC5!)"
  params: []
- id: select_hdmi3_return
  label: Select HDMI3 & Return
  kind: action
  command: "(SRC6!)"
  params: []
- id: select_hdbaset_return
  label: Select HDBaseT & Return
  kind: action
  command: "(SRC17!)"
  params: []

# Aspect
- id: aspect_status_query
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
  label: Aspect 4 X 3
  kind: action
  command: "(ARZ2)"
  params: []
- id: aspect_16x9
  label: Aspect 16 X 9
  kind: action
  command: "(ARZ3)"
  params: []
- id: aspect_letterbox
  label: Aspect Letterbox
  kind: action
  command: "(ARZ4)"
  params: []
- id: aspect_16x10
  label: Aspect 16 X 10
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
  label: Aspect 4 X 3 & Return
  kind: action
  command: "(ARZ2!)"
  params: []
- id: aspect_16x9_return
  label: Aspect 16 X 9 & Return
  kind: action
  command: "(ARZ3!)"
  params: []
- id: aspect_letterbox_return
  label: Aspect Letterbox & Return
  kind: action
  command: "(ARZ4!)"
  params: []
- id: aspect_16x10_return
  label: Aspect 16 X 10 & Return
  kind: action
  command: "(ARZ6!)"
  params: []

# Lamp Low Power (ECO Mode)
- id: eco_mode_status_query
  label: Lamp Low Power (ECO Mode) Status Query
  kind: query
  command: "(IPM?)"
  params: []  # note: marked No for third model family in source
- id: eco_mode_on
  label: ECO Mode On
  kind: action
  command: "(IPM1)"
  params: []
- id: eco_mode_off
  label: ECO Mode Off
  kind: action
  command: "(IPM0)"
  params: []
- id: eco_mode_on_return
  label: ECO Mode On & Return
  kind: action
  command: "(IPM1!)"
  params: []
- id: eco_mode_off_return
  label: ECO Mode Off & Return
  kind: action
  command: "(IPM0!)"
  params: []

# Volume
- id: volume_status_query
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

# Mute
- id: mute_status_query
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

# Firmware / Lamp status queries
- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  command: "(FVS?)"
  params: []
- id: lamp_eco_hours_query
  label: Lamp ECO Hours Query
  kind: query
  command: "(LME?)"
  params: []  # note: marked No for third model family in source
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
- id: lamp_reset_times_query
  label: Lamp Hours Reset Times Query
  kind: query
  command: "(LMR?)"
  params: []
- id: lamp_hours_reset
  label: Lamp Hours Reset
  kind: action
  command: "(LRT1)"
  params: []

# Ceiling / Orientation
- id: ceiling_status_query
  label: Ceiling Set Status Query
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

# Brightness
- id: brightness_status_query
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
  command: "(BRT{value})"
  params:
    - name: value
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
  command: "(BRT{value}!)"
  params:
    - name: value
      type: integer
      description: Brightness 0-100

# Contrast
- id: contrast_status_query
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
  command: "(CON{value})"
  params:
    - name: value
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
  command: "(CON{value}!)"
  params:
    - name: value
      type: integer
      description: Contrast 0-100

# Presets
- id: preset_status_query
  label: Presets Status Query
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

# Freeze
- id: freeze_status_query
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

# Key Pad (remote emulation)
- id: keypad_menu
  label: Key Pad Menu
  kind: action
  command: "(NAV0)"
  params: []
- id: keypad_up
  label: Key Pad Up
  kind: action
  command: "(NAV1)"
  params: []
- id: keypad_down
  label: Key Pad Down
  kind: action
  command: "(NAV2)"
  params: []
- id: keypad_select
  label: Key Pad Select
  kind: action
  command: "(NAV3)"
  params: []
- id: keypad_left
  label: Key Pad Left
  kind: action
  command: "(NAV4)"
  params: []
- id: keypad_right
  label: Key Pad Right
  kind: action
  command: "(NAV5)"
  params: []
- id: keypad_menu_return
  label: Key Pad Menu & Return
  kind: action
  command: "(NAV0!)"
  params: []
- id: keypad_up_return
  label: Key Pad Up & Return
  kind: action
  command: "(NAV1!)"
  params: []
- id: keypad_down_return
  label: Key Pad Down & Return
  kind: action
  command: "(NAV2!)"
  params: []
- id: keypad_select_return
  label: Key Pad Select & Return
  kind: action
  command: "(NAV3!)"
  params: []
- id: keypad_left_return
  label: Key Pad Left & Return
  kind: action
  command: "(NAV4!)"
  params: []
- id: keypad_right_return
  label: Key Pad Right & Return
  kind: action
  command: "(NAV5!)"
  params: []
```

## Feedbacks
```yaml
# Return-code formats as documented in source; "!" command variants elicit the return.
- id: power_state
  type: enum
  values: ["0", "1"]
  response_format: "(0-1,n)"
- id: blank_state
  type: enum
  values: ["0", "1"]
  response_format: "(0-1,n)"
- id: source_state
  type: integer
  values: "0-22"
  response_format: "(0-22,n)"
  value_map:
    0: Computer1
    1: Computer2
    4: HDMI1
    5: HDMI2
    6: HDMI3
    11: VIDEO
    12: S-VIDEO
    17: HDBaseT
- id: aspect_state
  type: integer
  values: "0,1,2,3,4,6"
  response_format: "(0-6,n)"
  value_map:
    0: Auto
    1: Native
    2: 4 X 3
    3: 16 X 9
    4: Letterbox
    6: 16 X 10
- id: eco_mode_state
  type: enum
  values: ["0", "1"]
  response_format: "(0-1,n)"
- id: volume_state
  type: integer
  values: "0-10"
  response_format: "(0-10,nn)"
- id: mute_state
  type: enum
  values: ["0", "1"]
  response_format: "(0-1,n)"
- id: firmware_version
  type: string
  response_format: "(nnnn) n=x.x.xx"
- id: lamp_eco_hours
  type: integer
  values: "0-65535"
  response_format: "(0-65535,n)"
- id: lamp_normal_hours
  type: integer
  values: "0-65535"
  response_format: "(0-65535,n)"
- id: lamp_dynamic_hours
  type: integer
  values: "0-65535"
  response_format: "(0-65535,n)"
- id: lamp_hours
  type: integer
  values: "0-65535"
  response_format: "(0-65535,n)"
- id: total_eco_hours
  type: integer
  values: "0-65535"
  response_format: "(0-65535,n)"
- id: total_normal_hours
  type: integer
  values: "0-65535"
  response_format: "(0-65535,n)"
- id: total_dynamic_hours
  type: integer
  values: "0-65535"
  response_format: "(0-65535,n)"
- id: total_hours
  type: integer
  values: "0-65535"
  response_format: "(0-65535,n)"
- id: lamp_reset_times
  type: integer
  values: "0-65535"
  response_format: "(0-65535,n)"
- id: ceiling_state
  type: integer
  values: "0-3"
  response_format: "(0-3,n)"
  value_map:
    0: Front table
    1: Front ceiling
    2: Rear table
    3: Rear ceiling
- id: brightness_state
  type: integer
  values: "0-100"
  response_format: "(0-100,nn)"
- id: contrast_state
  type: integer
  values: "0-100"
  response_format: "(0-100,nn)"
- id: preset_state
  type: integer
  values: "0-13"
  response_format: "(0-13,n)"
  value_map:
    1: User
    5: Presentation
    7: Movie
    10: Bright
    11: sRGB
    12: Blackboard
- id: freeze_state
  type: enum
  values: ["0", "1"]
  response_format: "(0-1,n)"
- id: keypad_state
  type: integer
  values: "0-5"
  response_format: "(0-5,n)"
  value_map:
    0: Menu
    1: Up
    2: Down
    3: Select
    4: Left
    5: Right
```

## Variables
```yaml
# Settable parameters are represented as parameterized Actions (VOLnn, BRTnn, CONnn).
# No additional settable variables documented in source.
```

## Events
```yaml
# No unsolicited notifications documented in source.
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures.
# Lamp ignition delay (20s) and power down delay (10s) noted in source are timing
# characteristics, not interlocks; see Notes.
```

## Notes
- RS-232 settings stated in source: 19200 baud, 8 data bits, no parity, 1 stop bit, no flow control.
- Timing constraints stated in source: lamp ignition delay 20s; power down delay 10s; source change delay 8s; minimum intercommand delay 5ms; minimum intercharacter delay 2ms.
- Commands are ASCII strings enclosed in parentheses; "!" suffix variants command the operation and elicit a return code.
- Source support matrix has three model-family columns (IN134ST/IN136ST/IN138HDST; IN2134/IN2136/IN2138HD; INL3148HD/INL3149WU/INL4128/INL4129/IN1048SL/IN1049SL). Computer2 (SRC1), S-VIDEO (SRC12), and HDBaseT (SRC17) are unsupported in the first two families; IPM (ECO mode) and all lamp-hour commands are unsupported in the third family.
<!-- UNRESOLVED: IN5312/IN5314 not explicitly named in source; which support column applies is unknown -->
<!-- UNRESOLVED: no TCP/IP, UDP, or network control documented in source -->
<!-- UNRESOLVED: physical connector type (DB9/DE9 pinout) not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-05-14T16:58:31.188Z
last_checked_at: 2026-09-11T22:17:14.039Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-11T22:17:14.039Z
matched_actions: 121
action_count: 121
confidence: medium
summary: "All 121 spec wire-literal commands appear verbatim in source RS-232 table; transport parameters (19200 baud / 8-N-1 / no flow control) are stated in source header. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source sheet is titled \"IN13xST IN213x INL314x INL412x\" and lists per-family support columns (IN134ST/IN136ST/IN138HDST, IN2134/IN2136/IN2138HD, INL3148HD/INL3149WU/INL4128/INL4129/IN1048SL/IN1049SL); IN5312/IN5314 are not explicitly named in the source, so per-command support for these exact models is unconfirmed"
- "source contains no explicit safety warnings or interlock procedures."
- "IN5312/IN5314 not explicitly named in source; which support column applies is unknown"
- "no TCP/IP, UDP, or network control documented in source"
- "physical connector type (DB9/DE9 pinout) not stated in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
