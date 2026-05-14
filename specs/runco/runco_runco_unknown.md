---
spec_id: admin/runco-vx2000d-dhd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Runco VX-2000d / DHD Controller Control Spec"
manufacturer: Runco
model_family: "Runco VX-2000d"
aliases: []
compatible_with:
  manufacturers:
    - Runco
  models:
    - "Runco VX-2000d"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manualsdir.com
  - mans.io
  - manualslib.com
source_urls:
  - "https://www.manualsdir.com/manuals/202495/runco-vx-2000d.html?page=77"
  - https://mans.io/files/viewer/2563745/40
  - https://www.manualslib.com/manual/515002/Runco-Rs232.html
retrieved_at: 2026-04-29T22:01:18.063Z
last_checked_at: 2026-05-14T18:17:20.172Z
generated_at: 2026-05-14T18:17:20.172Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.172Z
  matched_actions: 57
  action_count: 88
  confidence: high
  summary: "All 57 spec actions map cleanly to source commands; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Runco VX-2000d / DHD Controller Control Spec

## Summary
RS-232 serial projector controller. 19200 baud, 8N1, no flow control. Accepts ASCII commands with acknowledgement responses (+/-). Controls power, input routing, aspect ratio, and image parameters.

<!-- UNRESOLVED: no IP or network control documented — serial only -->

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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = off, 1 = on

- id: power_query
  label: Power Status Query
  kind: action
  params: []

- id: select_component
  label: Select Component Input
  kind: action
  params: []

- id: select_composite
  label: Select Composite Video Input
  kind: action
  params: []

- id: select_hdmi1
  label: Select HDMI 1 Input
  kind: action
  params: []

- id: select_hdmi2
  label: Select HDMI 2 Input
  kind: action
  params: []

- id: select_hd1
  label: Select HD 1 Input
  kind: action
  params: []

- id: select_hd2
  label: Select HD 2 Input
  kind: action
  params: []

- id: select_svideo1
  label: Select S-Video 1 Input
  kind: action
  params: []

- id: select_svideo2
  label: Select S-Video 2 Input
  kind: action
  params: []

- id: input_query
  label: Active Input Query
  kind: action
  params: []

- id: aspect_anamorphic
  label: Select Anamorphic Aspect Ratio
  kind: action
  params: []

- id: aspect_cinema
  label: Select Cinema Aspect Ratio
  kind: action
  params: []

- id: aspect_letterbox
  label: Select Letterbox Aspect Ratio
  kind: action
  params: []

- id: aspect_standard
  label: Select Standard (4:3) Aspect Ratio
  kind: action
  params: []

- id: aspect_virtualwide
  label: Select VirtualWide Aspect Ratio
  kind: action
  params: []

- id: aspect_virtual235
  label: Select VirtualWide 2.35 Aspect Ratio
  kind: action
  params: []

- id: output_169
  label: Set Output to 16:9 (1.78:1)
  kind: action
  params: []

- id: output_235
  label: Set Output to 2.35:1
  kind: action
  params: []

- id: aspect_query
  label: Aspect Ratio Query
  kind: action
  params: []

- id: aspectin_query
  label: Input Source Aspect Ratio Query
  kind: action
  params: []

- id: aspectout_query
  label: Output Screen Size Query
  kind: action
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: brightness_query
  label: Brightness Query
  kind: action
  params: []

- id: set_chromadelay
  label: Set Chroma Delay
  kind: action
  params:
    - name: value
      type: integer
      description: -12 to 12

- id: chromadelay_query
  label: Chroma Delay Query
  kind: action
  params: []

- id: set_color
  label: Set Color
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: color_query
  label: Color Query
  kind: action
  params: []

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: contrast_query
  label: Contrast Query
  kind: action
  params: []

- id: set_filmmode
  label: Set Film Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = off, 1 = on

- id: filmmode_query
  label: Film Mode Query
  kind: action
  params: []

- id: set_filter
  label: Set Filter
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 15

- id: filter_query
  label: Filter Query
  kind: action
  params: []

- id: set_phase
  label: Set Phase
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 3

- id: phase_query
  label: Phase Query
  kind: action
  params: []

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: -6 to 6

- id: sharpness_query
  label: Sharpness Query
  kind: action
  params: []

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: tint_query
  label: Tint Query
  kind: action
  params: []

- id: preset_custom1
  label: Load Custom 1 Preset
  kind: action
  params: []

- id: preset_custom2
  label: Load Custom 2 Preset
  kind: action
  params: []

- id: preset_day
  label: Load ISF Day Preset
  kind: action
  params: []

- id: preset_night
  label: Load ISF Night Preset
  kind: action
  params: []

- id: preset_query
  label: Preset Query
  kind: action
  params: []

- id: set_iheight
  label: Set Input Height
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: iheight_query
  label: Input Height Query
  kind: action
  params: []

- id: set_ihpos
  label: Set Horizontal Input Position
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: ihpos_query
  label: Horizontal Input Position Query
  kind: action
  params: []

- id: set_ivpos
  label: Set Vertical Input Position
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: ivpos_query
  label: Vertical Input Position Query
  kind: action
  params: []

- id: set_iwidth
  label: Set Input Width
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: iwidth_query
  label: Input Width Query
  kind: action
  params: []

- id: set_overscan
  label: Set Overscan Percentage
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 10

- id: overscan_query
  label: Overscan Query
  kind: action
  params: []

- id: set_oheight
  label: Set Output Height
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: oheight_query
  label: Output Height Query
  kind: action
  params: []

- id: set_ohpos
  label: Set Horizontal Output Position
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: ohpos_query
  label: Horizontal Output Position Query
  kind: action
  params: []

- id: set_ovpos
  label: Set Vertical Output Position
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: ovpos_query
  label: Vertical Output Position Query
  kind: action
  params: []

- id: set_owidth
  label: Set Output Width
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: owidth_query
  label: Output Width Query
  kind: action
  params: []

- id: set_bkgd
  label: Set Background Color
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100 (-100=black, 100=white)

- id: bkgd_query
  label: Background Query
  kind: action
  params: []

- id: date_query
  label: Manufacture Date Query
  kind: action
  params: []

- id: set_display
  label: Set Display Device Input Source
  kind: action
  params:
    - name: value
      type: integer
      description: Always 1

- id: display_query
  label: Display Device Input Source Query
  kind: action
  params: []

- id: set_hdinputres
  label: Set HD Input Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: 0=480i, 1=480p, 2=576i, 3=576p, 4=720p/60Hz, 5=1080i/60Hz, 6=720p/50Hz, 7=1080i/25Hz, other=Auto

- id: set_outres
  label: Set Output Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: 0=480i, 1=576i, 2=480p, 3=576p, 4=720p, 5=1080i

- id: outres_query
  label: Output Resolution Query
  kind: action
  params: []

- id: hwver_query
  label: Hardware Version Query
  kind: action
  params: []

- id: inres_query
  label: Input Resolution Query
  kind: action
  params: []

- id: lens1_query
  label: Lens 1 Configuration Query
  kind: action
  params: []

- id: set_rgbnn
  label: Set RGB Negative Sync Color Space
  kind: action
  params: []

- id: set_rgbpp
  label: Set RGB Positive Sync Color Space
  kind: action
  params: []

- id: set_rgbs
  label: Set RGB Composite Sync Color Space
  kind: action
  params: []

- id: status_query
  label: Operating Status Query
  kind: action
  params: []

- id: swver_query
  label: Software Version Query
  kind: action
  params: []

- id: set_trigger
  label: Assign Trigger
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 3

- id: ir_down
  label: Down-Arrow Button
  kind: action
  params: []

- id: ir_enter
  label: ENTER Key
  kind: action
  params: []

- id: ir_left
  label: Left-Arrow Button
  kind: action
  params: []

- id: ir_menu
  label: MENU Button
  kind: action
  params: []

- id: ir_right
  label: Right-Arrow Button
  kind: action
  params: []

- id: ir_up
  label: Up-Arrow Button
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]

- id: input_state
  type: enum
  values: [component, composite, hdmi1, hdmi2, hd1, hd2, svideo1, svideo2]

- id: aspect_ratio
  type: enum
  values: [anamorphic, cinema, letterbox, standard, virtualwide, virtual235, out169, out235]

- id: brightness_value
  type: integer
  range: [-100, 100]

- id: chromadelay_value
  type: integer
  range: [-12, 12]

- id: color_value
  type: integer
  range: [-100, 100]

- id: contrast_value
  type: integer
  range: [-100, 100]

- id: filmmode_value
  type: enum
  values: [0, 1]

- id: filter_value
  type: integer
  range: [0, 15]

- id: phase_value
  type: integer
  range: [0, 3]

- id: sharpness_value
  type: integer
  range: [-6, 6]

- id: tint_value
  type: integer
  range: [-100, 100]

- id: preset_state
  type: enum
  values: [custom1, custom2, day, night]

- id: iheight_value
  type: integer
  range: [-100, 100]

- id: ihpos_value
  type: integer
  range: [-100, 100]

- id: ivpos_value
  type: integer
  range: [-100, 100]

- id: iwidth_value
  type: integer
  range: [-100, 100]

- id: overscan_value
  type: integer
  range: [0, 10]

- id: oheight_value
  type: integer
  range: [-100, 100]

- id: ohpos_value
  type: integer
  range: [-100, 100]

- id: ovpos_value
  type: integer
  range: [-100, 100]

- id: owidth_value
  type: integer
  range: [-100, 100]

- id: bkgd_value
  type: integer
  range: [-100, 100]

- id: display_value
  type: integer

- id: hdinputres_value
  type: enum
  values: [480i, 480p, 576i, 576p, 720p60, 1080i60, 720p50, 1080i25, auto]

- id: outres_value
  type: enum
  values: [480i, 576i, 480p, 576p, 720p, 1080i]

- id: hwver_value
  type: string

- id: inres_value
  type: string

- id: swver_value
  type: string

- id: date_value
  type: string

- id: status_value
  type: string

- id: lens1_value
  type: string

- id: ack_positive
  type: enum
  values: ["+ >"]

- id: ack_negative
  type: enum
  values: ["- >"]
```

## Variables
```yaml
# UNRESOLVED: all settable parameters represented as Actions with params;
# no separate Variables section needed for this device
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_delay
    description: After sending ON or POWER 1, allow at least 15 seconds for the DHD Controller to power up before sending additional commands
  - id: rs232_power_always_on
    description: Always set RS-232C Port power option to On. Setting it to Off may disrupt communication between the projector and DHD Controller
```

## Notes
- Commands are case-insensitive ASCII strings terminated by carriage return.
- Multiple commands can be combined on one line separated by commas (up to 255 chars).
- Valid command returns acknowledgement "+ >"; invalid command returns "- >".
- Image adjustment commands (BRIGHTNESS, COLOR, CONTRAST, etc.) are not available on HDMI 1 or HDMI 2 inputs.
- Image preset commands (CUSTOM1, CUSTOM2, DAY, NIGHT) are not available on HDMI 1 or HDMI 2 inputs.
- Input position commands (IHEIGHT, IHPOS, IVPOS, IWIDTH, OVERSCAN) are not available on HDMI 1 or HDMI 2 inputs.
- Output shift commands (OHEIGHT, OHPOS, OVPOS, OWIDTH) are not available on HDMI 1 or HDMI 2 inputs.
- VIRTUAL235 available only on VX-2000d/CineWide and only on analog inputs.
<!-- UNRESOLVED: HDINPUTRES parameter encoding values 0-7 not confirmed against real device -->
<!-- UNRESOLVED: OUTRES parameter encoding values 0-5 not confirmed against real device -->
<!-- UNRESOLVED: no firmware version compatibility range stated in source -->
<!-- UNRESOLVED: no IP/network control protocol documented -->

## Provenance

```yaml
source_domains:
  - manualsdir.com
  - mans.io
  - manualslib.com
source_urls:
  - "https://www.manualsdir.com/manuals/202495/runco-vx-2000d.html?page=77"
  - https://mans.io/files/viewer/2563745/40
  - https://www.manualslib.com/manual/515002/Runco-Rs232.html
retrieved_at: 2026-04-29T22:01:18.063Z
last_checked_at: 2026-05-14T18:17:20.172Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.172Z
matched_actions: 57
action_count: 88
confidence: high
summary: "All 57 spec actions map cleanly to source commands; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
