---
spec_id: admin/atlona-at-line-pro5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-LINE-PRO5 Control Spec"
manufacturer: Atlona
model_family: AT-LINE-PRO5
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-LINE-PRO5
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-LINE-PRO5-GEN2_V3.pdf
  - https://atlona.com/pdf/manuals/AT-LINE-PRO5-GEN2.pdf
  - https://atlona.com/pdf/FAQ-AT-LINE-PRO5-GEN2.pdf
  - https://atlona.com/support/
retrieved_at: 2026-06-12T02:01:48.458Z
last_checked_at: 2026-06-12T19:07:32.413Z
generated_at: 2026-06-12T19:07:32.413Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP, REST, or any network control not mentioned in source. Only RS-232 is documented."
  - "flow control not stated; omitted rather than assumed"
  - "source documents no persistent settable variables distinct from"
  - "source documents no unsolicited device-initiated notifications."
  - "source documents no multi-step macro sequences."
  - "source contains no safety warnings, interlocks, or power-on"
  - "firmware version compatibility not stated in source."
  - "TCP/IP, REST, or any network control protocol not mentioned in source."
  - "flow control (RTS/CTS, XON/XOFF, none) not explicitly stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:07:32.413Z
  matched_actions: 83
  action_count: 83
  confidence: medium
  summary: "All 83 spec actions matched source mnemonics; all shapes and transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-LINE-PRO5 Control Spec

## Summary
Atlona AT-LINE-PRO5 Gen2 video scaler/switcher. RS-232C control on a DB-9 female connector at 19200 baud, 8N1. ASCII command set with case-sensitive `S` (set), `R` (read/status), and `K` (key) command families terminated by CR+LF.

<!-- UNRESOLVED: TCP/IP, REST, or any network control not mentioned in source. Only RS-232 is documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; omitted rather than assumed
  connector: DB-9 female
  pins_used:
    tx: 2
    rx: 3
    gnd: 5
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from S POWER 0/1 commands
- routable        # inferred from S SOURCE 0-10 input-select commands
- queryable       # inferred from R-prefix status query commands
- levelable       # inferred from S CONTRAST/BRIGHTNESS/HUE/SATURATION/SHARPNESS 0-100 commands
```

## Actions
```yaml
# Set commands (S prefix) - parameterized per source parameterization
- id: power_set
  label: Power On/Off
  kind: action
  command: "S POWER {state}"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0 = off, 1 = on

- id: source_select
  label: Select Input Source
  kind: action
  command: "S SOURCE {input}"
  params:
    - name: input
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      description: 0=CV1, 1=CV2, 2=COMP1, 3=COMP2, 4=PC1, 5=PC2, 6=DVI, 7=HDMI1, 8=HDMI2, 9=HDMI3, 10=HDMI4

- id: output_edid_set
  label: Set Output EDID / Resolution
  kind: action
  command: "S OUTPUT {output}"
  params:
    - name: output
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
      description: "0=NATIVE, 1=VGA(640x480@60), 2=SVGA(800x600@60), 3=XGA(1024x768@60), 4=SXGA(1280x1024@60), 5=UXGA(1600x1200@60), 6=480i, 7=480p, 8=720p@60, 9=1080i@60, 10=1080p@60, 11=576i@60, 12=576p@60, 13=720p@50, 14=1080i@50, 15=1080p@50, 16=WXGA(1280x800@60), 17=WSXGA(1680x1050@60), 18=WUXGA(1920x1200@60), 19=1080p@30, 20=WXGA+(1440x900@60), 21=SXGA+(1400x1050@60)"

- id: size_set
  label: Set Output Scale
  kind: action
  command: "S SIZE {mode}"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3, 4]
      description: "0=FULL, 1=OVERSCAN, 2=UNDERSCAN, 3=LETTERBOX, 4=PANSCAN"

- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  command: "S PICTUREMODE {mode}"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=STANDARD, 1=MOVIE, 2=VIVID, 3=USER"

- id: contrast_set
  label: Set Contrast
  kind: action
  command: "S CONTRAST {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: brightness_set
  label: Set Brightness
  kind: action
  command: "S BRIGHTNESS {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: hue_set
  label: Set Hue
  kind: action
  command: "S HUE {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: saturation_set
  label: Set Saturation
  kind: action
  command: "S SATURATION {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: "S SHARPNESS {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: nr_set
  label: Set Noise Reduction
  kind: action
  command: "S NR {mode}"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=OFF, 1=LOW, 2=MIDDLE, 3=HIGH"

- id: pc_phase_set
  label: Set PC Phase
  kind: action
  command: "S PCPHASE {value}"
  params:
    - name: value
      type: integer
      range: [0, 63]

- id: pc_clock_set
  label: Set PC Clock
  kind: action
  command: "S PCCLOCK {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: pc_hposition_set
  label: Set PC Horizontal Position
  kind: action
  command: "S PCHPOSITION {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: pc_vposition_set
  label: Set PC Vertical Position
  kind: action
  command: "S PCVPOSITION {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: color_temp_set
  label: Set Color Temperature
  kind: action
  command: "S COLORTEMP {mode}"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=NORMAL, 1=WARM, 2=COOL, 3=USER"

- id: red_gain_set
  label: Set Red Gain
  kind: action
  command: "S RED {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: green_gain_set
  label: Set Green Gain
  kind: action
  command: "S GREEN {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: blue_gain_set
  label: Set Blue Gain
  kind: action
  command: "S BLUE {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: osd_hposition_set
  label: Set OSD Horizontal Position
  kind: action
  command: "S OSDHPOSITION {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: osd_vposition_set
  label: Set OSD Vertical Position
  kind: action
  command: "S OSDVPOSITION {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: osd_timeout_set
  label: Set OSD Timeout
  kind: action
  command: "S OSDTIMEOUT {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: osd_background_set
  label: Set OSD Background
  kind: action
  command: "S OSDBACKGROUND {value}"
  params:
    - name: value
      type: integer
      range: [0, 8]

- id: audio_volume_set
  label: Set Audio Volume / Mute
  kind: action
  command: "S AAUD {level}"
  params:
    - name: level
      type: integer
      range: [0, 41]
      description: "0 = mute; 1-41 = volume level"

- id: audio_delay_set
  label: Set Audio Delay
  kind: action
  command: "S AUDIODELAY {mode}"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=OFF, 1=40ms, 2=110ms, 3=150ms"

# Status / read commands (R prefix) - one action per named mnemonic
- id: power_status
  label: Power Status Query
  kind: query
  command: "R POWER"
  params: []

- id: source_status
  label: Source Status Query
  kind: query
  command: "R SOURCE"
  params: []

- id: output_status
  label: Output EDID Status Query
  kind: query
  command: "R OUTPUT"
  params: []

- id: size_status
  label: Output Scale Status Query
  kind: query
  command: "R SIZE"
  params: []

- id: picture_mode_status
  label: Picture Mode Status Query
  kind: query
  command: "R PICTUREMODE"
  params: []

- id: contrast_status
  label: Contrast Value Query
  kind: query
  command: "R CONTRAST"
  params: []

- id: brightness_status
  label: Brightness Value Query
  kind: query
  command: "R BRIGHTNESS"
  params: []

- id: hue_status
  label: Hue Value Query
  kind: query
  command: "R HUE"
  params: []

- id: saturation_status
  label: Saturation Value Query
  kind: query
  command: "R SATURATION"
  params: []

- id: sharpness_status
  label: Sharpness Value Query
  kind: query
  command: "R SHARPNESS"
  params: []

- id: nr_status
  label: Noise Reduction Status Query
  kind: query
  command: "R NR"
  params: []

- id: pc_hposition_status
  label: PC H-Position Value Query
  kind: query
  command: "R PCHPOSITION"
  params: []

- id: pc_vposition_status
  label: PC V-Position Value Query
  kind: query
  command: "R PCVPOSITION"
  params: []

- id: pc_clock_status
  label: PC Clock Value Query
  kind: query
  command: "R PCCLOCK"
  params: []

- id: pc_phase_status
  label: PC Phase Value Query
  kind: query
  command: "R PCPHASE"
  params: []

- id: color_temp_status
  label: Color Temperature Status Query
  kind: query
  command: "R COLORTEMP"
  params: []

- id: red_status
  label: Red Gain Value Query
  kind: query
  command: "R RED"
  params: []

- id: green_status
  label: Green Gain Value Query
  kind: query
  command: "R GREEN"
  params: []

- id: blue_status
  label: Blue Gain Value Query
  kind: query
  command: "R BLUE"
  params: []

- id: osd_hposition_status
  label: OSD H-Position Value Query
  kind: query
  command: "R OSDHPOSITION"
  params: []

- id: osd_vposition_status
  label: OSD V-Position Value Query
  kind: query
  command: "R OSDVPOSITION"
  params: []

- id: osd_timeout_status
  label: OSD Timeout Value Query
  kind: query
  command: "R OSDTIMEOUT"
  params: []

- id: osd_background_status
  label: OSD Background Status Query
  kind: query
  command: "R OSDBACKGROUND"
  params: []

- id: audio_mute_status
  label: Audio Mute Status Query
  kind: query
  command: "R AUDIOMUTE"
  params: []

- id: audio_delay_status
  label: Audio Delay Status Query
  kind: query
  command: "R AUDIODELAY"
  params: []

# Key commands (K prefix) - one action per panel/remote key
- id: key_power
  label: Panel/Remote Power Key
  kind: action
  command: "K POWER"
  params: []

- id: key_cv1
  label: Panel Key CV1
  kind: action
  command: "K CV1"
  params: []

- id: key_cv2
  label: Panel Key CV2
  kind: action
  command: "K CV2"
  params: []

- id: key_comp1
  label: Panel Key COMP1
  kind: action
  command: "K COMP1"
  params: []

- id: key_comp2
  label: Panel Key COMP2
  kind: action
  command: "K COMP2"
  params: []

- id: key_pc1
  label: Panel Key PC1
  kind: action
  command: "K PC1"
  params: []

- id: key_pc2
  label: Panel Key PC2
  kind: action
  command: "K PC2"
  params: []

- id: key_dvi
  label: Panel Key DVI
  kind: action
  command: "K DVI"
  params: []

- id: key_hdmi1
  label: Panel Key HDMI1
  kind: action
  command: "K HDMI1"
  params: []

- id: key_hdmi2
  label: Panel Key HDMI2
  kind: action
  command: "K HDMI2"
  params: []

- id: key_hdmi3
  label: Panel Key HDMI3
  kind: action
  command: "K HDMI3"
  params: []

- id: key_hdmi4
  label: Panel Key HDMI4
  kind: action
  command: "K HDMI4"
  params: []

- id: key_menu
  label: Panel Key MENU
  kind: action
  command: "K MENU"
  params: []

- id: key_dec
  label: Panel Key DEC
  kind: action
  command: "K DEC"
  params: []

- id: key_inc
  label: Panel Key INC
  kind: action
  command: "K INC"
  params: []

- id: key_enter
  label: Panel Key ENTER
  kind: action
  command: "K ENTER"
  params: []

- id: key_source
  label: Remote Key SOURCE
  kind: action
  command: "K SOURCE"
  params: []

- id: key_vga
  label: Remote Key VGA
  kind: action
  command: "K VGA"
  params: []

- id: key_svga
  label: Remote Key SVGA
  kind: action
  command: "K SVGA"
  params: []

- id: key_xga
  label: Remote Key XGA
  kind: action
  command: "K XGA"
  params: []

- id: key_sxga
  label: Remote Key SXGA
  kind: action
  command: "K SXGA"
  params: []

- id: key_uxga
  label: Remote Key UXGA
  kind: action
  command: "K UXGA"
  params: []

- id: key_1080i60
  label: Remote Key 1080i60
  kind: action
  command: "K 1080i60"
  params: []

- id: key_480p
  label: Remote Key 480p
  kind: action
  command: "K 480p"
  params: []

- id: key_720p60
  label: Remote Key 720p60
  kind: action
  command: "K 720P60"
  params: []

- id: key_1080p60
  label: Remote Key 1080p60
  kind: action
  command: "K 1080P60"
  params: []

- id: key_up
  label: Remote Key UP
  kind: action
  command: "K UP"
  params: []

- id: key_down
  label: Remote Key DOWN
  kind: action
  command: "K DOWN"
  params: []

- id: key_left
  label: Remote Key LEFT
  kind: action
  command: "K LEFT"
  params: []

- id: key_right
  label: Remote Key RIGHT
  kind: action
  command: "K RIGHT"
  params: []

- id: key_exit
  label: Remote Key EXIT
  kind: action
  command: "K EXIT"
  params: []

- id: key_auto
  label: Remote Key AUTO
  kind: action
  command: "K AUTO"
  params: []

- id: key_reset
  label: Remote Key RESET
  kind: action
  command: "K RESET"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
- id: source_state
  type: enum
  values: [CV1, CV2, COMP1, COMP2, PC1, PC2, DVI, HDMI1, HDMI2, HDMI3, HDMI4]
- id: output_state
  type: enum
  values: [NATIVE, VGA, SVGA, XGA, SXGA, UXGA, "480i", "480p", "720p", "1080i", "1080p", "576i", "576p", "720p50", "1080i50", "1080p50", WXGA, WSXGA, WUXGA, "1080p30", "WXGA+", "SXGA+"]
- id: size_state
  type: enum
  values: [FULL, OVERSCAN, UNDERSCAN, LETTERBOX, PANSCAN]
- id: picture_mode_state
  type: enum
  values: [STANDARD, MOVIE, VIVID, USER]
- id: contrast_value
  type: integer
  range: [0, 100]
- id: brightness_value
  type: integer
  range: [0, 100]
- id: hue_value
  type: integer
  range: [0, 100]
- id: saturation_value
  type: integer
  range: [0, 100]
- id: sharpness_value
  type: integer
  range: [0, 100]
- id: nr_state
  type: enum
  values: [OFF, LOW, MIDDLE, HIGH]
- id: pc_phase_value
  type: integer
  range: [0, 63]
- id: pc_clock_value
  type: integer
  range: [0, 100]
- id: pc_hposition_value
  type: integer
  range: [0, 100]
- id: pc_vposition_value
  type: integer
  range: [0, 100]
- id: color_temp_state
  type: enum
  values: [NORMAL, WARM, COOL, USER]
- id: red_value
  type: integer
  range: [0, 100]
- id: green_value
  type: integer
  range: [0, 100]
- id: blue_value
  type: integer
  range: [0, 100]
- id: osd_hposition_value
  type: integer
  range: [0, 100]
- id: osd_vposition_value
  type: integer
  range: [0, 100]
- id: osd_timeout_value
  type: integer
  range: [0, 100]
- id: osd_background_value
  type: integer
  range: [0, 8]
- id: audio_mute_state
  type: enum
  values: [off, on]
- id: audio_delay_state
  type: enum
  values: [OFF, "40ms", "110ms", "150ms"]
- id: command_failed
  type: string
  values: ["Command FAILED"]
  description: Returned when a command is unrecognized or rejected.
```

## Variables
```yaml
# UNRESOLVED: source documents no persistent settable variables distinct from
# the discrete S-prefix set commands above; no extras to enumerate.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited device-initiated notifications.
# All feedback is solicited response to S / R / K commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on
# sequencing requirements.
```

## Notes
- Commands and feedback are case-sensitive — do not change capitalization, spacing, or lettering. Each command and feedback is terminated with CR+LF.
- A failed or unrecognized command produces the feedback `Command FAILED`.
- Two key commands in the source return feedback without the leading `>` delimiter: `K COMP2` echoes back as `K COMP2` and `K DVI` echoes back as `K DVI`. All other key commands echo back as `>KEYNAME`. This appears to be a source-document typo rather than device behavior; implementations should treat the `>` as optional on these two.
- Connector: DB-9 female. Pin 2 = Tx, pin 3 = Rx, pin 5 = Gnd. All other pins are unused (null-modem-style wiring on the host side).
- Audio volume (`S AAUD`) doubles as mute: `S AAUD 0` mutes; `S AAUD 1` through `S AAUD 41` set volume level. There is no separate `R AUDIO` for volume — only `R AUDIOMUTE` reports the mute state.
- The resolution key commands use inconsistent capitalization vs. the corresponding `S OUTPUT` mnemonic: `K 720P60` is uppercase `P`, `K 1080P60` is uppercase `P`, but `K 1080i60` is lowercase `i`. Reproduce the source spelling verbatim.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: TCP/IP, REST, or any network control protocol not mentioned in source. -->
<!-- UNRESOLVED: flow control (RTS/CTS, XON/XOFF, none) not explicitly stated in source. -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-LINE-PRO5-GEN2_V3.pdf
  - https://atlona.com/pdf/manuals/AT-LINE-PRO5-GEN2.pdf
  - https://atlona.com/pdf/FAQ-AT-LINE-PRO5-GEN2.pdf
  - https://atlona.com/support/
retrieved_at: 2026-06-12T02:01:48.458Z
last_checked_at: 2026-06-12T19:07:32.413Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:07:32.413Z
matched_actions: 83
action_count: 83
confidence: medium
summary: "All 83 spec actions matched source mnemonics; all shapes and transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP, REST, or any network control not mentioned in source. Only RS-232 is documented."
- "flow control not stated; omitted rather than assumed"
- "source documents no persistent settable variables distinct from"
- "source documents no unsolicited device-initiated notifications."
- "source documents no multi-step macro sequences."
- "source contains no safety warnings, interlocks, or power-on"
- "firmware version compatibility not stated in source."
- "TCP/IP, REST, or any network control protocol not mentioned in source."
- "flow control (RTS/CTS, XON/XOFF, none) not explicitly stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
