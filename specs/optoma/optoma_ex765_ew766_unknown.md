---
spec_id: admin/optoma-ex765-ew766
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma EX765 / EW766 Control Spec"
manufacturer: Optoma
model_family: EX765
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - EX765
    - EW766
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - optoma.co.uk
  - region-resource.optoma.com
  - optomaeurope.com
source_urls:
  - https://www.optoma.co.uk/uploads/RS232/EW766W-RS232-en-GB.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://www.optomaeurope.com/uploads/RS232/EX765W-RS232-en.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/59f0495a-e989-4ad6-8242-0425d997880a.pdf
retrieved_at: 2026-05-18T20:02:56.535Z
last_checked_at: 2026-06-10T00:54:48.364Z
generated_at: 2026-06-10T00:54:48.364Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "WAN/network control not documented in source"
  - "power-on sequencing and warm-up/cool-down timing not stated"
  - "lamp hour limit and replacement procedure not stated"
  - "no discrete settable parameters outside the action tree"
  - "no explicit multi-step macro sequences in source"
  - "network/RS232 port switching command (~XX86) — source lists RS232 and Network as options but no Network protocol details provided"
  - "lamp life and replacement procedure not stated"
  - "firmware version range for compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:54:48.364Z
  matched_actions: 70
  action_count: 70
  confidence: medium
  summary: "All 70 spec actions matched source commands with verified parameters; source fully represented across SEND/REMOTE/READ sections. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Optoma EX765 / EW766 Control Spec

## Summary
Optoma EX765 and EW766 are DLP projectors supporting RS-232 control via a 5-pin mini DIN connector. The protocol uses 9600 baud 8-N-1 serial with ASCII command codes terminated by `<CR>` (0x0D). The projector responds with `OK` or `F` (fail) for write commands, and `OK<value>` for read queries. No authentication is required.

<!-- UNRESOLVED: WAN/network control not documented in source -->
<!-- UNRESOLVED: power-on sequencing and warm-up/cool-down timing not stated -->
<!-- UNRESOLVED: lamp hour limit and replacement procedure not stated -->

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
  fifo: disabled  # UART16550 FIFO disabled per source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: resync
  label: Resync
  kind: action
  params: []
- id: av_mute_on
  label: AV Mute On
  kind: action
  params: []
- id: av_mute_off
  label: AV Mute Off
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
- id: freeze
  label: Freeze
  kind: action
  params: []
- id: unfreeze
  label: Unfreeze
  kind: action
  params: []
- id: zoom_plus
  label: Zoom Plus
  kind: action
  params: []
- id: zoom_minus
  label: Zoom Minus
  kind: action
  params: []
- id: pan_up
  label: Up (Pan under zoom)
  kind: action
  params: []
- id: pan_down
  label: Down (Pan under zoom)
  kind: action
  params: []
- id: pan_left
  label: Left (Pan under zoom)
  kind: action
  params: []
- id: pan_right
  label: Right (Pan under zoom)
  kind: action
  params: []
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number 1-13
      values:
        1: HDMI
        2: DVI-D
        5: VGA 1
        6: VGA 2
        7: VGA 1 SCART
        8: VGA 1 Component
        9: S-Video
        10: Video
        11: Wireless (EX765W/EW766W only)
        13: VGA 2 Component
- id: display_mode
  label: Display Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: Display mode 1-6
      values:
        1: Presentation
        2: Bright
        3: Movie
        4: sRGB
        5: User1
        6: User2
- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: Brightness 0-100
- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: Contrast 0-100
- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Sharpness 0-31
- id: color_adjust
  label: Color Adjustment
  kind: action
  params:
    - name: parameter
      type: string
      description: Color parameter name
    - name: value
      type: integer
      description: Parameter value (range varies)
- id: brilliantcolor_set
  label: Set BrilliantColor
  kind: action
  params:
    - name: value
      type: integer
      description: BrilliantColor 0-10
- id: degamma_set
  label: Set Degamma
  kind: action
  params:
    - name: mode
      type: integer
      values:
        1: Film
        2: Video
        3: Graphics
        4: PC
- id: color_temp_set
  label: Set Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      values:
        1: Warm
        2: Medium
        3: Cold
- id: color_space_set
  label: Set Color Space
  kind: action
  params:
    - name: mode
      type: integer
      values:
        1: Auto
        2: RGB
        3: YUV
- id: aspect_ratio_set
  label: Set Aspect Ratio / Format
  kind: action
  params:
    - name: ratio
      type: integer
      values:
        1: 4:3
        2: 16:9-l
        3: 16:9-ll / 16:10 (WXGA)
        5: LBX (WXGA projector only)
        6: Native
        7: Auto
- id: overscan_set
  label: Set Overscan
  kind: action
  params:
    - name: value
      type: integer
      description: Overscan 0-3
- id: zoom_set
  label: Set Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: Zoom 0-20
- id: v_image_shift_set
  label: Set Vertical Image Shift
  kind: action
  params:
    - name: value
      type: integer
      description: Vertical Image Shift 0-100
- id: v_keystone_set
  label: Set Vertical Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: Vertical Keystone -40 to 40
- id: language_set
  label: Set Language
  kind: action
  params:
    - name: lang
      type: integer
      values:
        1: English
        2: German
        3: French
        4: Italian
        5: Spanish
        6: Portuguese
        7: Polish
        8: Dutch
        9: Swedish
        10: Norwegian/Danish
        11: Finnish
        12: Greek
        13: Traditional Chinese
        14: Simplified Chinese
        15: Japanese
        16: Korean
        17: Russian
        18: Hungarian
        19: Czechoslovak
        20: Arabic
        21: Thai
- id: projection_mode_set
  label: Set Projection Mode
  kind: action
  params:
    - name: mode
      type: integer
      values:
        1: Front-Desktop
        2: Rear-Desktop
        3: Front-Ceiling
        4: Rear-Ceiling
- id: menu_location_set
  label: Set Menu Location
  kind: action
  params:
    - name: location
      type: integer
      values:
        1: Top Left
        2: Top Right
        3: Centre
        4: Bottom Left
        5: Bottom Right
- id: signal_freq_set
  label: Set Signal Frequency
  kind: action
  params:
    - name: value
      type: integer
      description: Frequency -100 to 100
- id: phase_set
  label: Set Phase
  kind: action
  params:
    - name: value
      type: integer
      description: Phase 0-63
- id: h_position_set
  label: Set H. Position
  kind: action
  params:
    - name: value
      type: integer
      description: Horizontal Position -100 to 100
- id: v_position_set
  label: Set V. Position
  kind: action
  params:
    - name: value
      type: integer
      description: Vertical Position -100 to 100
- id: security_timer_set
  label: Set Security Timer
  kind: action
  params:
    - name: months
      type: integer
      description: Month (00-99)
    - name: days
      type: integer
      description: Day (00-29)
    - name: hours
      type: integer
      description: Hour (00-23)
- id: security_enable
  label: Security Enable
  kind: action
  params: []
- id: security_disable
  label: Security Disable
  kind: action
  params: []
- id: projector_id_set
  label: Set Projector ID
  kind: action
  params:
    - name: id
      type: integer
      description: Projector ID 01-99
- id: mute_on_set
  label: Mute On (Video)
  kind: action
  params: []
- id: mute_off_set
  label: Mute Off (Video)
  kind: action
  params: []
- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 0-10
- id: logo_set
  label: Set Logo
  kind: action
  params:
    - name: logo
      type: integer
      values:
        1: Optoma
        2: User
- id: logo_capture
  label: Logo Capture
  kind: action
  params: []
- id: rs232_port_set
  label: Set RS232 Port
  kind: action
  params:
    - name: port
      type: integer
      values:
        1: RS232
        2: Network
- id: closed_captioning_on
  label: Closed Captioning On
  kind: action
  params: []
- id: closed_captioning_off
  label: Closed Captioning Off
  kind: action
  params: []
- id: audio_input_set
  label: Set Audio Input
  kind: action
  params:
    - name: input
      type: integer
      values:
        1: Default
        2: RCA
        3: mini Audio IN 1
        4: mini Audio IN 2
- id: source_lock_set
  label: Source Lock
  kind: action
  params:
    - name: mode
      type: integer
      values:
        0: Off
        1: On
        3: Next Source
- id: high_altitude_on
  label: High Altitude On
  kind: action
  params: []
- id: high_altitude_off
  label: High Altitude Off
  kind: action
  params: []
- id: information_hide_on
  label: Information Hide On
  kind: action
  params: []
- id: information_hide_off
  label: Information Hide Off
  kind: action
  params: []
- id: keypad_lock_on
  label: Keypad Lock On
  kind: action
  params: []
- id: keypad_lock_off
  label: Keypad Lock Off
  kind: action
  params: []
- id: background_color_set
  label: Set Background Color
  kind: action
  params:
    - name: color
      type: integer
      values:
        1: Blue
        2: Black
        3: Red
        4: Green
        5: White
- id: direct_power_on_set
  label: Direct Power On
  kind: action
  params:
    - name: state
      type: integer
      values:
        0: Off
        1: On
- id: signal_power_on_set
  label: Signal Power On
  kind: action
  params:
    - name: state
      type: integer
      values:
        0: Off
        1: On
- id: auto_power_off_set
  label: Set Auto Power Off
  kind: action
  params:
    - name: minutes
      type: integer
      description: Minutes 0-180
- id: sleep_timer_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: Minutes 0-999
- id: eco_standby_set
  label: Eco Standby (1W)
  kind: action
  params:
    - name: state
      type: integer
      values:
        0: Off
        1: On
- id: lamp_hours_query
  label: Query Lamp Hours
  kind: action
  params: []
- id: lamp_reminder_set
  label: Lamp Reminder
  kind: action
  params:
    - name: state
      type: integer
      values:
        0: Off
        1: On
- id: brightness_mode_set
  label: Set Brightness Mode
  kind: action
  params:
    - name: mode
      type: integer
      values:
        0: STD
        1: Bright
- id: lamp_reset
  label: Lamp Reset
  kind: action
  params: []
- id: reset
  label: Reset
  kind: action
  params: []
- id: color_reset
  label: Color Reset
  kind: action
  params: []
- id: remote_key
  label: Remote Key
  kind: action
  params:
    - name: key
      type: integer
      description: Remote key code
      values:
        1: Power
        2: Re-sync
        3: Keystone +
        4: Keystone -
        5: AV Mute
        7: Zoom
        9: Volume +
        10: Volume -
        11: Enter
        12: Menu
        13: Left
        14: Up
        15: Right
        16: Down
        18: "1"
        19: "2"
        20: "3"
        21: "4"
        22: "5"
        23: "6"
        24: "7"
        25: "8"
        26: "9"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "0"
    - "1"
  description: 0=Off, 1=On
- id: input_source
  label: Input Source
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
    - "7"
  description: 0=None, 1=DVI, 2=VGA1, 3=VGA2, 4=S-Video, 5=Video, 6=HDMI, 7=Wireless
- id: software_version
  label: Software Version
  type: string
  description: Returns OK followed by 2-digit version
- id: display_mode_query
  label: Display Mode (Query)
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
  description: 0=None, 1=Presentation, 2=Bright, 3=Movie, 4=sRGB, 5=User1, 6=User2
- id: brightness_query
  label: Brightness (Query)
  type: integer
  description: Returns OK followed by value 0-100
- id: contrast_query
  label: Contrast (Query)
  type: integer
  description: Returns OK followed by value 0-100
- id: aspect_ratio_query
  label: Aspect Ratio (Query)
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
  description: 0=4:3, 1=16:9-l, 2=16:9-ll, 3=Window
- id: color_temperature_query
  label: Color Temperature (Query)
  type: enum
  values:
    - "0"
    - "1"
    - "2"
  description: 0=Warm, 1=Medium, 2=Cold
- id: projection_mode_query
  label: Projection Mode (Query)
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
  description: 0=Front-Desktop, 1=Rear-Desktop, 2=Front-Ceiling, 3=Rear-Ceiling
- id: information_query
  label: Information Query
  type: string
  description: "Format: OKabbbbccdddde - a=Power, bbbb=LampHour, cc=Source, dddd=FW version, e=Display mode"
- id: model_name_query
  label: Model Name
  type: enum
  values:
    - "1"
    - "2"
  description: "1=EX765, 2=EW766"
- id: projector_return
  label: Projector Return
  type: enum
  values:
    - OK
    - F
  description: Projector acknowledgement - OK on success, F on failure
- id: standby_status
  label: Standby Status (Unsolicited)
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "6"
    - "7"
    - "8"
  description: "0=Standby, 1=Warming, 2=Cooling, 3=Out of Range, 4=Lamp Fail, 6=Fan Lock, 7=Over Temperature, 8=Lamp Hours Running Out"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside the action tree
```

## Events
```yaml
- id: standby_status_event
  label: Standby Status Event
  description: Automatically sent by projector when standby/warming/cooling/out of range
  params:
    - name: status
      type: integer
      values:
        0: Standby
        1: Warming
        2: Cooling
        3: Out of Range
        4: Lamp Fail
        6: Fan Lock
        7: Over Temperature
        8: Lamp Hours Running Out
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences in source
```

## Safety
```yaml
confirmation_required_for:
  - lamp_reset
  - reset
  - security_timer_set
interlocks: []
```

## Notes
All ASCII commands are prefixed with `~XX` where XX is the projector ID (00 = broadcast to all projectors). Commands are terminated with `<CR>` (0x0D). The projector returns `OK` followed by `<CR>` on success, or `F` followed by `<CR>` on failure. Read queries return `OK<value><CR>`.

<!-- UNRESOLVED: network/RS232 port switching command (~XX86) — source lists RS232 and Network as options but no Network protocol details provided -->
<!-- UNRESOLVED: lamp life and replacement procedure not stated -->
<!-- UNRESOLVED: firmware version range for compatibility not stated -->

## Provenance

```yaml
source_domains:
  - optoma.co.uk
  - region-resource.optoma.com
  - optomaeurope.com
source_urls:
  - https://www.optoma.co.uk/uploads/RS232/EW766W-RS232-en-GB.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://www.optomaeurope.com/uploads/RS232/EX765W-RS232-en.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/59f0495a-e989-4ad6-8242-0425d997880a.pdf
retrieved_at: 2026-05-18T20:02:56.535Z
last_checked_at: 2026-06-10T00:54:48.364Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:54:48.364Z
matched_actions: 70
action_count: 70
confidence: medium
summary: "All 70 spec actions matched source commands with verified parameters; source fully represented across SEND/REMOTE/READ sections. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "WAN/network control not documented in source"
- "power-on sequencing and warm-up/cool-down timing not stated"
- "lamp hour limit and replacement procedure not stated"
- "no discrete settable parameters outside the action tree"
- "no explicit multi-step macro sequences in source"
- "network/RS232 port switching command (~XX86) — source lists RS232 and Network as options but no Network protocol details provided"
- "lamp life and replacement procedure not stated"
- "firmware version range for compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
