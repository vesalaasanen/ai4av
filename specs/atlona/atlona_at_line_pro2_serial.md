---
spec_id: admin/atlona-at-line-pro2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-LINE-PRO2 Control Spec"
manufacturer: Atlona
model_family: AT-LINE-PRO2
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-LINE-PRO2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AT-LINE-PRO2_RS232.xls
retrieved_at: 2026-05-19T19:21:35.183Z
last_checked_at: 2026-05-20T04:51:32.153Z
generated_at: 2026-05-20T04:51:32.153Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "flow control not stated in source"
  - "no unsolicited event notifications described in source"
  - "flow control (RTS/CTS/XON/XOFF) not stated in source"
  - "firmware version compatibility not stated in source"
  - "unsolicited event notifications not described in source"
verification:
  verdict: verified
  checked_at: 2026-05-20T04:51:32.153Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched source command table; transport parameters verified; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Atlona AT-LINE-PRO2 Control Spec

## Summary
Video scaler/converter with RS-232C control interface. Supports multiple input sources (CV, SV, COMP, PC, HDMI) and output resolutions up to 1080P60/WUXGA. Control via set commands (S CMD) and status queries (R CMD).

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
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
- id: set_source
  label: Set Source
  kind: action
  params:
    - name: input
      type: integer
      description: "0:CV, 1:SV, 2:COMP, 3:PC, 4:HDMI"
- id: set_output
  label: Set Output Resolution
  kind: action
  params:
    - name: resolution
      type: integer
      description: "0:NATIVE, 1:VGA, 2:SVGA, 3:XGA, 4:SXGA, 5:UXGA, 6:480I, 7:480P, 8:720P60, 9:1080I60, 10:1080P60, 11:576I, 12:576P, 13:720P50, 14:1080I50, 15:1080P50, 16:WXGA, 17:WSXGA, 18:WUXGA"
- id: set_size
  label: Set Scaler Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0:FULL, 1:OVERSCAN, 2:UNDERSCAN, 3:LETTERBOX, 4:PANSCAN"
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0:STANDARD, 1:MOVIE, 2:VIVID, 3:USER"
- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, default 45"
- id: set_hue
  label: Set Hue
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: set_saturation
  label: Set Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, default 60"
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, default 32"
- id: set_nr
  label: Set Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: "0:OFF, 1:LOW, 2:MIDDLE, 3:HIGH"
- id: set_pc_h_position
  label: Set PC H Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
- id: set_pc_v_position
  label: Set PC V Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
- id: set_pc_clock
  label: Set PC Clock
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
- id: set_pc_phase
  label: Set PC Phase
  kind: action
  params:
    - name: value
      type: integer
      description: "0-63"
- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: "0:NORMAL, 1:WARM, 2:COOL, 3:USER"
- id: set_red_gain
  label: Set Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, default 47"
- id: set_green_gain
  label: Set Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, default 47"
- id: set_blue_gain
  label: Set Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, default 47"
- id: set_osd_h_position
  label: Set OSD H Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: set_osd_v_position
  label: Set OSD V Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: set_osd_timeout
  label: Set OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, default 10"
- id: set_osd_background
  label: Set OSD Background
  kind: action
  params:
    - name: value
      type: integer
      description: "0-8, default 5"
- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0:OFF, 1:ON"
- id: set_audio_delay
  label: Set Audio Delay
  kind: action
  params:
    - name: delay
      type: integer
      description: "0:OFF, 1:40MS, 2:110MS, 3:150MS"
- id: reset
  label: Reset
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values: [on, off]
- id: source_status
  label: Source Status
  type: enum
  values: [CV, SV, COMP, PC, HDMI]
- id: output_status
  label: Output Resolution Status
  type: enum
  values: [NATIVE, VGA, SVGA, XGA, SXGA, UXGA, "480I", "480P", "720P60", "1080I60", "1080P60", "576I", "576P", "720P50", "1080I50", "1080P50", WXGA, WSXGA, WUXGA]
- id: size_status
  label: Scaler Mode Status
  type: enum
  values: [FULL, OVERSCAN, UNDERSCAN, LETTERBOX, PANSCAN]
- id: picture_mode_status
  label: Picture Mode Status
  type: enum
  values: [STANDARD, MOVIE, VIVID, USER]
- id: contrast_status
  label: Contrast Status
  type: integer
  range: [0, 100]
- id: brightness_status
  label: Brightness Status
  type: integer
  range: [0, 100]
- id: hue_status
  label: Hue Status
  type: integer
  range: [0, 100]
- id: saturation_status
  label: Saturation Status
  type: integer
  range: [0, 100]
- id: sharpness_status
  label: Sharpness Status
  type: integer
  range: [0, 100]
- id: nr_status
  label: Noise Reduction Status
  type: enum
  values: [OFF, LOW, MIDDLE, HIGH]
- id: pc_h_position_status
  label: PC H Position Status
  type: integer
  range: [0, 100]
- id: pc_v_position_status
  label: PC V Position Status
  type: integer
  range: [0, 100]
- id: pc_clock_status
  label: PC Clock Status
  type: integer
  range: [0, 100]
- id: pc_phase_status
  label: PC Phase Status
  type: integer
  range: [0, 63]
- id: color_temp_status
  label: Color Temperature Status
  type: enum
  values: [NORMAL, WARM, COOL, USER]
- id: red_gain_status
  label: Red Gain Status
  type: integer
  range: [0, 100]
- id: green_gain_status
  label: Green Gain Status
  type: integer
  range: [0, 100]
- id: blue_gain_status
  label: Blue Gain Status
  type: integer
  range: [0, 100]
- id: osd_h_position_status
  label: OSD H Position Status
  type: integer
  range: [0, 100]
- id: osd_v_position_status
  label: OSD V Position Status
  type: integer
  range: [0, 100]
- id: osd_timeout_status
  label: OSD Timeout Status
  type: integer
  range: [0, 100]
- id: osd_background_status
  label: OSD Background Status
  type: integer
  range: [0, 8]
- id: audio_mute_status
  label: Audio Mute Status
  type: enum
  values: [OFF, ON]
- id: audio_delay_status
  label: Audio Delay Status
  type: enum
  values: [OFF, "40MS", "110MS", "150MS"]
```

## Variables
```yaml
# All settable parameters are covered by Actions above.
# No additional variables beyond action params.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
RS-232 pinout: AT-LINE-PRO2 pins 2(TxD), 3(RxD), 5(GND) connect to remote controller pins 3(TxD), 2(RxD), 5(GND) respectively (cross-over/modem cable). Command format: prefix with "S " for set commands, "R " for status queries. Responses prefixed with "> ".
<!-- UNRESOLVED: flow control (RTS/CTS/XON/XOFF) not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: unsolicited event notifications not described in source -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AT-LINE-PRO2_RS232.xls
retrieved_at: 2026-05-19T19:21:35.183Z
last_checked_at: 2026-05-20T04:51:32.153Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T04:51:32.153Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched source command table; transport parameters verified; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow control not stated in source"
- "no unsolicited event notifications described in source"
- "flow control (RTS/CTS/XON/XOFF) not stated in source"
- "firmware version compatibility not stated in source"
- "unsolicited event notifications not described in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
