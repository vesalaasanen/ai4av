---
spec_id: admin/christie-fhq981l
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie FHQ981L Control Spec"
manufacturer: Christie
model_family: FHQ981L
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - FHQ981L
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000825-02-christie-lit-man-usr-fhq981-l.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-102271-04-christie-lit-tech-ref-gs-700-850-api.pdf
  - https://www.manualslib.com/manual/2301065/Christie-Rs232.html
retrieved_at: 2026-05-14T14:49:43.541Z
last_checked_at: 2026-05-20T10:00:33.965Z
generated_at: 2026-05-20T10:00:33.965Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Ethernet control not documented in source. Only RS232C documented."
  - "no unsolicited event notifications documented in source"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "Ethernet/Web control not documented. Only RS232C documented.OPS module is optional. No firmware version stated."
verification:
  verdict: verified
  checked_at: 2026-05-20T10:00:33.965Z
  matched_actions: 86
  action_count: 86
  confidence: medium
  summary: "All 86 spec action IDs matched wire tokens in source command table; transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Christie FHQ981L Control Spec

## Summary
Christie FHQ981L flat-panel display. RS232 serial control only. Text-based command protocol with ASCII command strings. No Ethernet or IP control documented.

<!-- UNRESOLVED: Ethernet control not documented in source. Only RS232C documented. -->

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
# powerable: PON/POF commands present
# routable: source selection commands present (SRC, SH1-SH7, W1X-W4X)
# queryable: status check commands present (SRC?, BLT?, etc.)
# levelable: value adjust commands present (VOL, BLT, CON, etc.)
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

- id: source_vga
  label: Source VGA
  kind: action
  params: []

- id: source_dp
  label: Source DisplayPort
  kind: action
  params: []

- id: source_hdmi1
  label: Source HDMI 1
  kind: action
  params: []

- id: source_hdmi2
  label: Source HDMI 2
  kind: action
  params: []

- id: source_hdmi3
  label: Source HDMI 3
  kind: action
  params: []

- id: source_hdmi4
  label: Source HDMI 4
  kind: action
  params: []

- id: source_ops_hdmi
  label: Source OPS/HDMI
  kind: action
  params: []

- id: source_ops_dp
  label: Source OPS/DP
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

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: Brightness level 0~100

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: Contrast level 0~100

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume level 0~100

- id: set_black_level
  label: Set Black Level
  kind: action
  params:
    - name: value
      type: integer
      description: Black level 0~100

- id: set_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: Color saturation 0~100

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Sharpness 0~100

- id: window_mode_off
  label: Multi-Window Mode Off
  kind: action
  params: []

- id: window_mode_pbp
  label: Multi-Window Mode PBP
  kind: action
  params: []

- id: window_mode_quadrant
  label: Multi-Window Mode Quadrant
  kind: action
  params: []

- id: window1_input
  label: Window 1 Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input index (0=DP, 1=HDMI1, 2=HDMI2, 3=HDMI3, 4=HDMI4, 5=OPS-HDMI, 6=OPS-DP)

- id: window2_input
  label: Window 2 Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input index (0=DP, 1=HDMI1, 2=HDMI2, 3=HDMI3, 4=HDMI4, 5=OPS-HDMI, 6=OPS-DP)

- id: window3_input
  label: Window 3 Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input index (0=DP, 1=HDMI1, 2=HDMI2, 3=HDMI3, 4=HDMI4, 5=OPS-HDMI, 6=OPS-DP)

- id: window4_input
  label: Window 4 Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input index (0=DP, 1=HDMI1, 2=HDMI2, 3=HDMI3, 4=HDMI4, 5=OPS-HDMI, 6=OPS-DP)

- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: Picture mode (0=Standard, 1=Dynamic, 2=User)

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: Color temp (0=Studio1, 1=Studio2, 2=Warm, 3=Normal, 4=Cool, 5=User)

- id: power_save
  label: Power Save
  kind: action
  params:
    - name: state
      type: integer
      description: Power save mode (0=Off, 1=On)

- id: movie_mode
  label: Movie Mode
  kind: action
  params:
    - name: level
      type: integer
      description: Movie mode (0=Off, 1=Low, 2=Middle, 3=High)

- id: osd_language
  label: OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: Language (0=English, 1=German, 2=Spanish, 3=French, 4=Italian, 5=Russian, 6=Korean)

- id: osd_time
  label: OSD Time
  kind: action
  params:
    - name: seconds
      type: integer
      description: OSD timeout (0=Off, 1=5sec, 2=10sec, 3=20sec)

- id: interface_select
  label: Interface Select
  kind: action
  params:
    - name: mode
      type: integer
      description: Interface (0=Off, 1=RS232, 2=OPS-RS232)

- id: auto_adjust
  label: Auto Adjust (VGA only)
  kind: action
  params: []

- id: audio_input
  label: Audio Input
  kind: action
  params:
    - name: input
      type: integer
      description: Audio input (0=AudioIn, 1=DP, 2=HDMI1, 3=HDMI2, 4=HDMI3, 5=HDMI4, 6=OPS-HDMI, 7=OPS-DP)
- id: remote_source
  label: Remote Source Key
  kind: action
  params: []

- id: remote_up
  label: Remote Up Key
  kind: action
  params: []

- id: remote_down
  label: Remote Down Key
  kind: action
  params: []

- id: remote_right
  label: Remote Right Key
  kind: action
  params: []

- id: remote_left
  label: Remote Left Key
  kind: action
  params: []

- id: remote_select
  label: Remote Select Key
  kind: action
  params: []

- id: remote_menu
  label: Remote Menu Key
  kind: action
  params: []

- id: remote_auto
  label: Remote Auto Key
  kind: action
  params: []

- id: remote_info
  label: Remote Info Key
  kind: action
  params: []

- id: brightness_up
  label: Brightness 1 Step Up
  kind: action
  params: []

- id: brightness_down
  label: Brightness 1 Step Down
  kind: action
  params: []

- id: contrast_up
  label: Contrast 1 Step Up
  kind: action
  params: []

- id: contrast_down
  label: Contrast 1 Step Down
  kind: action
  params: []

- id: black_level_up
  label: Black Level 1 Step Up
  kind: action
  params: []

- id: black_level_down
  label: Black Level 1 Step Down
  kind: action
  params: []

- id: saturation_up
  label: Color 1 Step Up
  kind: action
  params: []

- id: saturation_down
  label: Color 1 Step Down
  kind: action
  params: []

- id: sharpness_up
  label: Sharpness 1 Step Up
  kind: action
  params: []

- id: sharpness_down
  label: Sharpness 1 Step Down
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: current_source
  type: enum
  values: [VGA, DP, HDMI1, HDMI2, HDMI3, HDMI4, OPS-HDMI, OPS-DP]
  query: SRC?

- id: power_state
  type: enum
  values: [on, off]

- id: mute_status
  type: enum
  values: [on, off]

- id: brightness
  type: integer
  range: [0, 100]
  query: BLT?

- id: contrast
  type: integer
  range: [0, 100]
  query: CON?

- id: volume
  type: integer
  range: [0, 100]
  query: VOL?

- id: black_level
  type: integer
  range: [0, 100]
  query: BRT?

- id: saturation
  type: integer
  range: [0, 100]
  query: SAT?

- id: sharpness
  type: integer
  range: [0, 100]
  query: SHA?

- id: color_temperature
  type: enum
  values: [Studio1, Studio2, Warm, Normal, Cool, User]
  query: CTT?

- id: picture_mode
  type: enum
  values: [Standard, Dynamic, User]
  query: PMT?

- id: power_save
  type: enum
  values: [off, on]
  query: PST?

- id: movie_mode
  type: enum
  values: [off, low, middle, high]
  query: MMT?

- id: osd_language
  type: enum
  values: [English, German, Spanish, French, Italian, Russian, Korean]
  query: LAT?

- id: osd_time
  type: enum
  values: [off, 5sec, 10sec, 20sec]
  query: OTT?

- id: multi_window_mode
  type: enum
  values: [off, dual, quad]
  query: WMT?

- id: window1_source
  type: enum
  values: [DP, HDMI1, HDMI2, HDMI3, HDMI4, OPS-HDMI, OPS-DP]
  query: W1S?

- id: window2_source
  type: enum
  values: [DP, HDMI1, HDMI2, HDMI3, HDMI4, OPS-HDMI, OPS-DP]
  query: W2S?

- id: window3_source
  type: enum
  values: [DP, HDMI1, HDMI2, HDMI3, HDMI4, OPS-HDMI, OPS-DP]
  query: W3S?

- id: window4_source
  type: enum
  values: [DP, HDMI1, HDMI2, HDMI3, HDMI4, OPS-HDMI, OPS-DP]
  query: W4S?

- id: window_status
  type: enum
  values: [Window1, Window2, Window3, Window4]
  query: WIN?

- id: audio_input
  type: enum
  values: [AudioIn, DP, HDMI1, HDMI2, HDMI3, HDMI4, OPS-HDMI, OPS-DP]
  query: AUT?

- id: balance
  type: integer
  range: [0, 100]
  query: BCT?

- id: red_gain
  type: integer
  range: [0, 100]
  query: RGN?

- id: green_gain
  type: integer
  range: [0, 100]
  query: GGN?

- id: blue_gain
  type: integer
  range: [0, 100]
  query: BGN?

- id: h_position
  type: integer
  range: [0, 100]
  query: HPS?

- id: v_position
  type: integer
  range: [0, 100]
  query: VPS?

- id: clock
  type: integer
  range: [0, 100]
  query: CLK?

- id: phase
  type: integer
  range: [0, 100]
  query: PHS?

- id: input_resolution
  type: enum
  values: [1024x768, 1280x768, 1360x768, 1366x768, 1400x1050, 1680x1050]
  query: IRT?

- id: uart_status
  type: enum
  values: [Off, RS232, OPS-RS232]
  query: UAT?
```

## Variables
```yaml
# All settable parameters via value adjust commands are covered in Actions.
# No separate Variables section needed.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
<!-- UNRESOLVED: no safety warnings or interlock procedures in source -->
```

## Notes
Command format: `[HEAD][SET_ID][COMMAND][VALUE?][END]` where HEAD=K:, SET_ID=ALL, END=. for write or ? for read. Response format: `[SET_ID][:][COMMAND][=][REPLY]`. ACK format: `ALL:XXX=A`. Error format: `ALL:XXX=N`.

RS232 cable wiring: 3.5mm stereo plug to DB9 female. 3.5mm tip→DB9 pin2 (Tx), ring→DB9 pin3 (Rx), sleeve→DB9 pin5 (Gnd).

Interface Select: RS232 or OPS-RS232 modes prevent monitor from lowering power consumption.

<!-- UNRESOLVED: Ethernet/Web control not documented. Only RS232C documented.OPS module is optional. No firmware version stated. -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000825-02-christie-lit-man-usr-fhq981-l.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-102271-04-christie-lit-tech-ref-gs-700-850-api.pdf
  - https://www.manualslib.com/manual/2301065/Christie-Rs232.html
retrieved_at: 2026-05-14T14:49:43.541Z
last_checked_at: 2026-05-20T10:00:33.965Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T10:00:33.965Z
matched_actions: 86
action_count: 86
confidence: medium
summary: "All 86 spec action IDs matched wire tokens in source command table; transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Ethernet control not documented in source. Only RS232C documented."
- "no unsolicited event notifications documented in source"
- "no multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "Ethernet/Web control not documented. Only RS232C documented.OPS module is optional. No firmware version stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
