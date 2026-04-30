---
schema_version: ai4av-public-spec-v1
device_id: jvc/lx-uh1
entity_id: jvc_lx_uh1
spec_id: admin/jvc-lx-uh1
revision: 1
author: admin
title: "JVC LX-UH1 Control Spec"
status: published
manufacturer: JVC
manufacturer_key: jvc
model_family: LX-UH1
aliases: []
compatible_with:
  manufacturers:
    - JVC
  models:
    - LX-UH1
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: jvc_lx_uh1_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:53:39.891Z
retrieved_at: 2026-04-25T20:53:39.891Z
last_checked_at: 2026-04-25T20:53:39.891Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:53:39.891Z
  matched_actions: 78
  action_count: 78
  confidence: high
  summary: "All 78 spec actions matched literally in source; transport parameters verified; command set fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# JVC LX-UH1 Control Spec

## Summary
The JVC LX-UH1 is a 4K projector controllable via RS-232 serial. The protocol uses ASCII command frames delimited by `<CR>` (carriage return, 0x0D) with the format `<CR>*command=value#<CR>`. Query commands use `?` as the value. This spec covers power, source selection, picture adjustments, gamma/HDR settings, lamp control, menu navigation, and various operational settings.

<!-- UNRESOLVED: source document title references "LX NZ3" — command set may be shared across JVC projector models; compatibility with LX-UH1 not explicitly stated in source text -->
<!-- UNRESOLVED: TCP/IP control mentioned in user context but not documented in source; TCP port, framing, and connection behavior unknown -->
<!-- UNRESOLVED: response format for query commands not documented — assumed to echo the command with the current value -->

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
traits:
  - powerable    # power on/off commands
  - routable     # source selection commands
  - queryable    # query commands returning state
  - levelable    # brightness, contrast, color, tint, sharpness, gains, offsets
```

## Actions
```yaml
# Command frame format: <CR>*command=value#<CR>
# <CR> = 0x0D carriage return; # = frame terminator
# ? = query value for read operations

actions:
  # --- Power ---
  - id: power_on
    label: Power On
    kind: action
    command: "*pow=on#"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "*pow=off#"
    params: []

  # --- Source Selection ---
  - id: select_source
    label: Select Source
    kind: action
    command: "*sour={source}#"
    params:
      - name: source
        type: enum
        values: [RGB, hdmi, hdmi2]
        description: "RGB=COMPUTER/YPbPr, hdmi=HDMI, hdmi2=HDMI 2"

  # --- Picture Mode ---
  - id: set_picture_mode
    label: Set Picture Mode
    kind: action
    command: "*appmod={mode}#"
    params:
      - name: mode
        type: enum
        values: [dynamic, cine, natural, user1, user2]
        description: "cine=Cinema"

  # --- Contrast ---
  - id: contrast_up
    label: Contrast Increase
    kind: action
    command: "*con=+#"
    params: []

  - id: contrast_down
    label: Contrast Decrease
    kind: action
    command: "*con=-#"
    params: []

  # --- Brightness ---
  - id: brightness_up
    label: Brightness Increase
    kind: action
    command: "*bri=+#"
    params: []

  - id: brightness_down
    label: Brightness Decrease
    kind: action
    command: "*bri=-#"
    params: []

  # --- Color ---
  - id: color_up
    label: Color Increase
    kind: action
    command: "*color=+#"
    params: []

  - id: color_down
    label: Color Decrease
    kind: action
    command: "*color=-#"
    params: []

  # --- Tint ---
  - id: tint_up
    label: Tint Increase
    kind: action
    command: "*tint=+#"
    params: []

  - id: tint_down
    label: Tint Decrease
    kind: action
    command: "*tint=-#"
    params: []

  # --- Sharpness ---
  - id: sharpness_up
    label: Sharpness Increase
    kind: action
    command: "*sharp=+#"
    params: []

  - id: sharpness_down
    label: Sharpness Decrease
    kind: action
    command: "*sharp=-#"
    params: []

  # --- Skin Tone ---
  - id: skin_tone_up
    label: Skin Tone Increase
    kind: action
    command: "*skintone=+#"
    params: []

  - id: skin_tone_down
    label: Skin Tone Decrease
    kind: action
    command: "*skintone=-#"
    params: []

  # --- Color Temperature ---
  - id: set_color_temperature
    label: Set Color Temperature
    kind: action
    command: "*ct={temp}#"
    params:
      - name: temp
        type: enum
        values: [low, normal, high]
        description: Color temperature preset

  # --- Aspect Ratio ---
  - id: set_aspect
    label: Set Aspect Ratio
    kind: action
    command: "*asp={ratio}#"
    params:
      - name: ratio
        type: enum
        values: ["4:3", "16:9", "16:10", AUTO]
        description: Aspect ratio mode

  # --- Overscan ---
  - id: overscan_up
    label: Overscan Increase
    kind: action
    command: "*overscan=+#"
    params: []

  - id: overscan_down
    label: Overscan Decrease
    kind: action
    command: "*overscan=-#"
    params: []

  # --- Auto Adjust ---
  - id: auto_adjust
    label: Auto Adjust
    kind: action
    command: "*auto#"
    params: []

  # --- Red Gain ---
  - id: red_gain_up
    label: Red Gain Increase
    kind: action
    command: "*RGain=+#"
    params: []

  - id: red_gain_down
    label: Red Gain Decrease
    kind: action
    command: "*RGain=-#"
    params: []

  # --- Green Gain ---
  - id: green_gain_up
    label: Green Gain Increase
    kind: action
    command: "*GGain=+#"
    params: []

  - id: green_gain_down
    label: Green Gain Decrease
    kind: action
    command: "*GGain=-#"
    params: []

  # --- Blue Gain ---
  - id: blue_gain_up
    label: Blue Gain Increase
    kind: action
    command: "*BGain=+#"
    params: []

  - id: blue_gain_down
    label: Blue Gain Decrease
    kind: action
    command: "*BGain=-#"
    params: []

  # --- Red Offset ---
  - id: red_offset_up
    label: Red Offset Increase
    kind: action
    command: "*ROffset=+#"
    params: []

  - id: red_offset_down
    label: Red Offset Decrease
    kind: action
    command: "*ROffset=-#"
    params: []

  # --- Green Offset ---
  - id: green_offset_up
    label: Green Offset Increase
    kind: action
    command: "*GOffset=+#"
    params: []

  - id: green_offset_down
    label: Green Offset Decrease
    kind: action
    command: "*GOffset=-#"
    params: []

  # --- Blue Offset ---
  - id: blue_offset_up
    label: Blue Offset Increase
    kind: action
    command: "*BOffset=+#"
    params: []

  - id: blue_offset_down
    label: Blue Offset Decrease
    kind: action
    command: "*BOffset=-#"
    params: []

  # --- Gamma ---
  - id: set_gamma
    label: Set Gamma
    kind: action
    command: "*gamma={value}#"
    params:
      - name: value
        type: enum
        values: ["1.8", "2.0", "2.1", "2.2", "2.3", "2.4", "2.6", CP, BP]
        description: "CP=Contrast Priority, BP=Brightness Priority"

  # --- HDR Setting ---
  - id: set_hdr
    label: Set HDR Mode
    kind: action
    command: "*HDRSETTING={mode}#"
    params:
      - name: mode
        type: enum
        values: [AUTO, HDR10, HLG, SDR]
        description: HDR processing mode

  # --- Picture Tone ---
  - id: set_picture_tone
    label: Set Picture Tone
    kind: action
    command: "*PICTURETONE={value}#"
    params:
      - name: value
        type: enum
        values: [-2, -1, 0, 1, 2]
        description: Picture tone adjustment value

  # --- Splash Screen ---
  - id: set_splash_screen
    label: Set Splash Screen
    kind: action
    command: "*splash={color}#"
    params:
      - name: color
        type: enum
        values: [black, blue]
        description: Splash screen color

  # --- Background Color ---
  - id: set_background_color
    label: Set Background Color
    kind: action
    command: "*background={color}#"
    params:
      - name: color
        type: enum
        values: [black, blue, Green]
        description: Background color (note: Green uses capital G in protocol)

  # --- Projector Position ---
  - id: set_projector_position
    label: Set Projector Position
    kind: action
    command: "*pp={position}#"
    params:
      - name: position
        type: enum
        values: [FT, RE, RC, FC]
        description: "FT=Front Table, RE=Rear Table, RC=Rear Ceiling, FC=Front Ceiling"

  # --- Quick Auto Search ---
  - id: set_auto_search
    label: Set Auto Source Search
    kind: action
    command: "*QAS={state}#"
    params:
      - name: state
        type: enum
        values: [on, off]
        description: Enable/disable quick auto search

  # --- Menu Display Time ---
  - id: set_menu_display_time
    label: Set Menu Display Time
    kind: action
    command: "*menutime={time}#"
    params:
      - name: time
        type: enum
        values: [on, 5s, 10s, 15s, 20s, 25s, 30s]
        description: "on=always visible, otherwise timeout in seconds"

  # --- Menu Position ---
  - id: set_menu_position
    label: Set Menu Position
    kind: action
    command: "*menuposition={position}#"
    params:
      - name: position
        type: enum
        values: [center, tl, tr, br, bl]
        description: "tl=Top-Left, tr=Top-Right, br=Bottom-Right, bl=Bottom-Left"

  # --- Reminder Message ---
  - id: set_reminder
    label: Set Reminder Message
    kind: action
    command: "*reminder={state}#"
    params:
      - name: state
        type: enum
        values: [on, off]
        description: Enable/disable reminder message

  # --- Direct Power On ---
  - id: set_direct_power_on
    label: Set Direct Power On
    kind: action
    command: "*directpower={state}#"
    params:
      - name: state
        type: enum
        values: [on, off]
        description: Enable/disable direct power on

  # --- E-Shift ---
  - id: set_eshift
    label: Set E-Shift
    kind: action
    command: "*eshift={state}#"
    params:
      - name: state
        type: enum
        values: [on, off]
        description: Enable/disable e-shift

  # --- Light Source Hour Reset ---
  - id: reset_light_source_hours
    label: Reset Light Source Hours
    kind: action
    command: "*ltim=reset#"
    params: []

  # --- Light Source Mode ---
  - id: set_light_source_mode
    label: Set Light Source Mode
    kind: action
    command: "*lampm={mode}#"
    params:
      - name: mode
        type: enum
        values: [lnor, eco, variablelow, variablehigh]
        description: "lnor=Normal, eco=Eco, variablelow=Variable Low, variablehigh=Variable High"

  # --- Blank ---
  - id: blank_on
    label: Blank On
    kind: action
    command: "*blank=on#"
    params: []

  - id: blank_off
    label: Blank Off
    kind: action
    command: "*blank=off#"
    params: []

  # --- Menu Navigation ---
  - id: menu_on
    label: Menu On
    kind: action
    command: "*menu=on#"
    params: []

  - id: menu_off
    label: Menu Off
    kind: action
    command: "*menu=off#"
    params: []

  - id: nav_up
    label: Navigate Up
    kind: action
    command: "*up#"
    params: []

  - id: nav_down
    label: Navigate Down
    kind: action
    command: "*down#"
    params: []

  - id: nav_right
    label: Navigate Right
    kind: action
    command: "*right#"
    params: []

  - id: nav_left
    label: Navigate Left
    kind: action
    command: "*left#"
    params: []

  - id: nav_enter
    label: Enter / OK
    kind: action
    command: "*enter#"
    params: []

  - id: nav_back
    label: Back
    kind: action
    command: "*back#"
    params: []

  # --- Language ---
  - id: language_next
    label: Language Next
    kind: action
    command: "*lang=+#"
    params: []

  - id: language_prev
    label: Language Previous
    kind: action
    command: "*lang=-#"
    params: []

  # --- Auto Power Off ---
  - id: set_auto_power_off
    label: Set Auto Power Off
    kind: action
    command: "*APOFF={value}#"
    params:
      - name: value
        type: enum
        values: [DIS, 5, 10, 15, 20, 25, 30]
        description: "DIS=disabled, otherwise minutes before auto power off"

  # --- High Altitude Mode ---
  - id: set_high_altitude
    label: Set High Altitude Mode
    kind: action
    command: "*Highaltitude={state}#"
    params:
      - name: state
        type: enum
        values: [on, off]
        description: Enable/disable high altitude fan mode

  # --- Key Lock ---
  - id: set_key_lock
    label: Set Key Lock
    kind: action
    command: "*keylock={state}#"
    params:
      - name: state
        type: enum
        values: [on, off]
        description: Enable/disable front panel key lock
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    query: "*pow=?#"
    type: enum
    values: [on, off]

  - id: current_source
    label: Current Source
    query: "*sour=?#"
    type: enum
    values: [RGB, hdmi, hdmi2]

  - id: picture_mode
    label: Picture Mode
    query: "*appmod=?#"
    type: enum
    values: [dynamic, cine, natural, user1, user2]

  - id: contrast_value
    label: Contrast Value
    query: "*con=?#"
    type: integer

  - id: brightness_value
    label: Brightness Value
    query: "*bri=?#"
    type: integer

  - id: color_value
    label: Color Value
    query: "*color=?#"
    type: integer

  - id: tint_value
    label: Tint Value
    query: "*tint=?#"
    type: integer

  - id: sharpness_value
    label: Sharpness Value
    query: "*sharp=?#"
    type: integer

  - id: skin_tone_value
    label: Skin Tone Value
    query: "*skintone=?#"
    type: integer

  - id: color_temperature
    label: Color Temperature
    query: "*ct=?#"
    type: enum
    values: [low, normal, high]

  - id: aspect_ratio
    label: Aspect Ratio
    query: "*asp=?#"
    type: enum
    values: ["4:3", "16:9", "16:10", AUTO]

  - id: overscan_value
    label: Overscan Value
    query: "*overscan=?#"
    type: integer

  - id: red_gain
    label: Red Gain
    query: "*RGain=?#"
    type: integer

  - id: green_gain
    label: Green Gain
    query: "*GGain=?#"
    type: integer

  - id: blue_gain
    label: Blue Gain
    query: "*BGain=?#"
    type: integer

  - id: red_offset
    label: Red Offset
    query: "*ROffset=?#"
    type: integer

  - id: green_offset
    label: Green Offset
    query: "*GOffset=?#"
    type: integer

  - id: blue_offset
    label: Blue Offset
    query: "*BOffset=?#"
    type: integer

  - id: gamma_selection
    label: Gamma Selection
    query: "*gamma=?#"
    type: enum
    values: ["1.8", "2.0", "2.1", "2.2", "2.3", "2.4", "2.6", CP, BP]

  - id: hdr_setting
    label: HDR Setting
    query: "*HDRSETTING=?#"
    type: enum
    values: [AUTO, HDR10, HLG, SDR]

  - id: picture_tone
    label: Picture Tone
    query: "*PICTURETONE=?#"
    type: enum
    values: [-2, -1, 0, 1, 2]

  - id: splash_screen
    label: Splash Screen
    query: "*splash=?#"
    type: enum
    values: [black, blue]

  - id: background_color
    label: Background Color
    query: "*background=?#"
    type: enum
    values: [black, blue, Green]

  - id: projector_position
    label: Projector Position
    query: "*pp=?#"
    type: enum
    values: [FT, RE, RC, FC]

  - id: auto_search_status
    label: Auto Source Search Status
    query: "*QAS=?#"
    type: enum
    values: [on, off]

  - id: menu_display_time
    label: Menu Display Time
    query: "*menutime=?#"
    type: enum
    values: [on, 5s, 10s, 15s, 20s, 25s, 30s]

  - id: menu_position
    label: Menu Position
    query: "*menuposition=?#"
    type: enum
    values: [center, tl, tr, br, bl]

  - id: reminder_status
    label: Reminder Status
    query: "*reminder=?#"
    type: enum
    values: [on, off]

  - id: direct_power_on_status
    label: Direct Power On Status
    query: "*directpower=?#"
    type: enum
    values: [on, off]

  - id: eshift_status
    label: E-Shift Status
    query: "*eshift=?#"
    type: enum
    values: [on, off]

  - id: light_source_hours
    label: Light Source Hours
    query: "*ltim=?#"
    type: integer

  - id: light_source_mode
    label: Light Source Mode
    query: "*lampm=?#"
    type: enum
    values: [lnor, eco, variablelow, variablehigh]

  - id: model_name
    label: Model Name
    query: "*modelname=?#"
    type: string

  - id: blank_status
    label: Blank Status
    query: "*blank=?#"
    type: enum
    values: [on, off]

  - id: language_status
    label: Language Status
    query: "*lang=?#"
    type: string

  - id: auto_power_off
    label: Auto Power Off Setting
    query: "*APOFF=?#"
    type: enum
    values: [DIS, 5, 10, 15, 20, 25, 30]

  - id: high_altitude_status
    label: High Altitude Mode Status
    query: "*Highaltitude=?#"
    type: enum
    values: [on, off]

  - id: key_lock_status
    label: Key Lock Status
    query: "*keylock=?#"
    type: enum
    values: [on, off]
```

## Variables
```yaml
# UNRESOLVED: no settable numeric ranges documented; adjustments are +/- incremental only
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety interlocks or power-on sequencing requirements
# Note: source indicates Power On command does not work during Warming Up or Cooling Down states
```

## Notes
- Command frame format: `<CR>*command=value#<CR>` where `<CR>` is 0x0D (carriage return) and `#` is the frame terminator.
- Character delay must be 0 ms between characters in a command.
- The "Standby", "Warming Up", and "Cooling Down" columns in the source indicate command availability per projector state. Most commands are unavailable during warm-up and cool-down. Only `*pow=?#` (read power status) works in all three states.
- Command names are case-sensitive: `*HDRSETTING=`, `*PICTURETONE=`, `*APOFF=`, `*Highaltitude=`, `*RGain=`, `*GGain=`, `*BGain=`, `*ROffset=`, `*GOffset=`, `*BOffset=` use mixed/PascalCase.
- Increment/decrement commands (`+`/`-`) are relative adjustments; no absolute value-set syntax is documented.

<!-- UNRESOLVED: response format for queries not documented — assumed response echoes command with current value -->
<!-- UNRESOLVED: valid numeric ranges for integer feedback values (contrast, brightness, etc.) not stated -->
<!-- UNRESOLVED: error response format not documented -->
<!-- UNRESOLVED: command acknowledgment format not documented -->
<!-- UNRESOLVED: concurrent command handling / minimum inter-command delay not stated (only character delay of 0 ms specified) -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: jvc_lx_uh1_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:53:39.891Z
retrieved_at: 2026-04-25T20:53:39.891Z
last_checked_at: 2026-04-25T20:53:39.891Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:53:39.891Z
matched_actions: 78
action_count: 78
confidence: high
summary: "All 78 spec actions matched literally in source; transport parameters verified; command set fully represented."
```

## Known Gaps

```yaml
[]
```
