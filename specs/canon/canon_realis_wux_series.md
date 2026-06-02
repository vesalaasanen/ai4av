---
spec_id: admin/canon-realis-wux-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Canon REALiS WUX5000 / WUX4000 Control Spec"
manufacturer: Canon
model_family: WUX5000
aliases: []
compatible_with:
  manufacturers:
    - Canon
  models:
    - WUX5000
    - WUX4000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - downloads.canon.com
source_urls:
  - https://downloads.canon.com/nw/brochures/pdf/projector/realis-wux10-mark-ii-commands.pdf
retrieved_at: 2026-04-30T04:33:02.664Z
last_checked_at: 2026-05-14T18:17:14.891Z
generated_at: 2026-05-14T18:17:14.891Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "6AXG, 6AXB, 6AXC, 6AXM, 6AXY follow same pattern as 6AXR - not enumerated individually for brevity"
  - "FINE_GAMMA_G, FINE_GAMMA_B follow same pattern"
  - "no multi-step macro sequences described in source"
  - "6AXG, 6AXB, 6AXC, 6AXM, 6AXY commands follow same pattern as 6AXR but not individually enumerated"
  - "FINE_GAMMA_G and FINE_GAMMA_B follow same pattern as FINE_GAMMA_R but not individually enumerated"
  - "exact DZOOM_POS coordinate range not specified in source"
  - "exact Fine Gamma number of adjustment points not specified"
  - "KEYSTONE command parameters referenced in RC emulation but no standalone command documented"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.891Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 90 spec actions matched source commands literally; transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Canon REALiS WUX5000 / WUX4000 Control Spec

## Summary
The Canon REALiS WUX5000 and WUX4000 are multimedia projectors controllable via RS-232C serial or TCP/IP LAN connections. This spec covers 50 ASCII text-based commands for power control, input selection, image adjustment, audio volume, and status queries. Commands are case-insensitive and delimited by CR, LF, CR+LF, or Null.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 33336
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 2
  flow_control: none
  max_command_length: 256
  delimiter: "CR, LF, CR+LF, or Null (0x00)"
  inter_character_timeout_ms: 5000
  response_timeout_ms: 15000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from power on/off commands present
- powerable
# inferred from input routing commands present
- routable
# inferred from query commands returning state present
- queryable
# inferred from volume/brightness/gain control present
- levelable
```

## Actions
```yaml
# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "POWER ON"
  params: []
  response_ok: "i:OK"
  notes: "After sending, poll GET POWER to confirm transition complete."

- id: power_off
  label: Power Off
  kind: action
  command: "POWER OFF"
  params: []
  response_ok: "i:OK"
  notes: "Processing of other commands will be interrupted at POWER OFF."

# --- Input Selection ---
- id: select_input
  label: Select Input
  kind: action
  command: "INPUT=<input>"
  params:
    - name: input
      type: enum
      values: [D-RGB, A-RGB, COMP, HDMI]
      description: "Input source to select"

- id: select_signal
  label: Select Signal (Component)
  kind: action
  command: "SEL=<signal>"
  params:
    - name: signal
      type: enum
      values: [AUTO]
      description: "Input signal selection (AUTO auto-detects)"

# --- Volume ---
- id: set_volume
  label: Set Volume
  kind: action
  command: "AVOL=<level>"
  params:
    - name: level
      type: integer
      min: 0
      max: 20
      description: "Audio volume level"

- id: set_mute
  label: Set Mute
  kind: action
  command: "MUTE=<state>"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: "Mute ON prohibits audio/beep; OFF permits"

# --- Display ---
- id: set_blank
  label: Set Blank
  kind: action
  command: "BLANK=<state>"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_freeze
  label: Set Freeze
  kind: action
  command: "FREEZE=<state>"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

# --- Image Mode ---
- id: set_image_mode
  label: Set Image Mode
  kind: action
  command: "IMAGE=<mode>"
  params:
    - name: mode
      type: enum
      values: [STANDARD, PRESENTATION, VIVID_PHOTO, PHOTO_SRGB, DCM_SIM, DYNAMIC, VIDEO, CINEMA, USER_1, USER_2, USER_3, USER_4, USER_5]
      description: "Image mode preset. Changing may alter brightness, contrast, sharpness, gamma, saturation, lamp mode, and 6-axis settings."

# --- Aspect Ratio ---
- id: set_aspect
  label: Set Aspect Ratio
  kind: action
  command: "ASPECT=<mode>"
  params:
    - name: mode
      type: enum
      values: [AUTO, "4:3", "16:9", ZOOM, TRUE, FULL]

- id: set_screen_aspect
  label: Set Screen Aspect
  kind: action
  command: "SCRNASPECT=<mode>"
  params:
    - name: mode
      type: enum
      values: ["16:10", "16:9", "4:3", "16:9_DIS", "4:3_DIS"]

# --- Image Flip ---
- id: set_image_flip
  label: Set Image Flip
  kind: action
  command: "IMAGEFLIP=<mode>"
  params:
    - name: mode
      type: enum
      values: [NONE, CEILING, REAR, REAR_CEILING]
  notes: "Keystone settings are initialized when flip is changed."

# --- Brightness / Contrast / Sharpness ---
- id: set_brightness
  label: Set Brightness
  kind: action
  command: "BRI=<value>"
  params:
    - name: value
      type: integer
      min: -20
      max: 20

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "CONT=<value>"
  params:
    - name: value
      type: integer
      min: -20
      max: 20

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "SHARP=<value>"
  params:
    - name: value
      type: integer
      min: -10
      max: 10

# --- Color ---
- id: set_hue
  label: Set Hue
  kind: action
  command: "HUE=<value>"
  params:
    - name: value
      type: integer
      min: -20
      max: 20

- id: set_saturation
  label: Set Saturation
  kind: action
  command: "SAT=<value>"
  params:
    - name: value
      type: integer
      min: -20
      max: 20

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  command: "COLOR_TEMP=<value>"
  params:
    - name: value
      type: integer
      min: -17
      max: 21

- id: set_gamma
  label: Set Gamma
  kind: action
  command: "GAMMA=<value>"
  params:
    - name: value
      type: integer
      min: -10
      max: 10

- id: set_dynamic_gamma
  label: Set Dynamic Gamma
  kind: action
  command: "DGAMMA=<mode>"
  params:
    - name: mode
      type: enum
      values: [OFF, WEAK, MIDDLE, STRONG]

# --- Noise Reduction ---
- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  command: "NR=<mode>"
  params:
    - name: mode
      type: enum
      values: [OFF, WEAK, MIDDLE, STRONG]
  notes: "Not available when HDMI_IN is set to PC."

# --- RGB Gain / Offset ---
- id: set_rgb_gain
  label: Set RGB Gain
  kind: action
  command: "RGBGAIN=<r>,<g>,<b>"
  params:
    - name: r
      type: integer
      min: -60
      max: 60
    - name: g
      type: integer
      min: -60
      max: 60
    - name: b
      type: integer
      min: -60
      max: 60

- id: set_rgb_offset
  label: Set RGB Offset
  kind: action
  command: "RGBOFFSET=<r>,<g>,<b>"
  params:
    - name: r
      type: integer
      min: -60
      max: 60
    - name: g
      type: integer
      min: -60
      max: 60
    - name: b
      type: integer
      min: -60
      max: 60

# --- 6-Axis Color ---
- id: set_6axis_adj
  label: Set 6-Axis Adjustment
  kind: action
  command: "6AXADJ=<state>"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_6axis_r
  label: Set 6-Axis R Correction
  kind: action
  command: "6AXR=<hue>,<saturation>,<brightness>"
  params:
    - name: hue
      type: integer
      min: -20
      max: 20
    - name: saturation
      type: integer
      min: -20
      max: 20
    - name: brightness
      type: integer
      min: -20
      max: 20

# UNRESOLVED: 6AXG, 6AXB, 6AXC, 6AXM, 6AXY follow same pattern as 6AXR - not enumerated individually for brevity

# --- Fine Gamma ---
- id: set_fine_gamma_r
  label: Set Fine Gamma R
  kind: action
  command: "FINE_GAMMA_R=<v1>,...,<vn>"
  params:
    - name: values
      type: string
      description: "Comma-separated values, each 0-1024"

# UNRESOLVED: FINE_GAMMA_G, FINE_GAMMA_B follow same pattern

# --- Memory Color ---
- id: set_memory_color
  label: Set Memory Color Adjustment
  kind: action
  command: "MEMCADJ=<mode>"
  params:
    - name: mode
      type: enum
      values: [OFF, MEM_L, MEM_M, MEM_H]

# --- Ambient Light ---
- id: set_ambient_adj
  label: Set Ambient Light Correction
  kind: action
  command: "AMBADJ=<state>"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_ambient_level
  label: Set Ambient Light Level
  kind: action
  command: "AMBLEVEL=<level>"
  params:
    - name: level
      type: enum
      values: [WEAK, MIDDLE, STRONG]

- id: set_ambient_type
  label: Set Ambient Light Type
  kind: action
  command: "AMBTYPE=<type>"
  params:
    - name: type
      type: enum
      values: [TG, FL, FL_H]
      description: "TG=Tungsten, FL=Fluorescent, FL_H=Fluorescent H"

# --- HDMI ---
- id: set_hdmi_in
  label: Set HDMI Input Mode
  kind: action
  command: "HDMI_IN=<mode>"
  params:
    - name: mode
      type: enum
      values: [AUTO, PC]
      description: "AUTO for AV equipment, PC for computer"

- id: set_hdmi_overscan
  label: Set HDMI Overscan
  kind: action
  command: "HDMI_OVSCAN=<state>"
  params:
    - name: state
      type: enum
      values: [OFF, ON]

# --- DZOOM ---
- id: set_dzoom_ratio
  label: Set Digital Zoom Ratio
  kind: action
  command: "DZOOM_RAT=<ratio>"
  params:
    - name: ratio
      type: enum
      values: ["1", "1.5", "2", "3", "4", "5", "6", "8", "10", "12"]

- id: set_dzoom_position
  label: Set Digital Zoom Position
  kind: action
  command: "DZOOM_POS=<x>,<y>"
  params:
    - name: x
      type: integer
      description: "Horizontal offset in pixels, 0=center"
    - name: y
      type: integer
      description: "Vertical offset in pixels, 0=center"

# --- Lamp ---
- id: set_lamp_mode
  label: Set Lamp Mode
  kind: action
  command: "LAMP=<mode>"
  params:
    - name: mode
      type: enum
      values: [NORMAL, SILENT]

# --- Save Image Profile ---
- id: save_image_profile
  label: Save Image Profile
  kind: action
  command: "SAVEIMGPROF=<slot>"
  params:
    - name: slot
      type: enum
      values: [USER_1, USER_2, USER_3, USER_4, USER_5, DEL_ALL]

# --- Auto Setup ---
- id: auto_setup
  label: Auto Setup
  kind: action
  command: "AUTOSETEXE INPUT"
  params: []
  notes: "Executes automatic signal sensing."

- id: auto_pc
  label: Auto PC
  kind: action
  command: "AUTOPC"
  params: []
  notes: "Only available when input is A-RGB."

# --- Panel / Remote Emulation ---
- id: panel_emulate
  label: Front Panel Emulation
  kind: action
  command: "MAIN <button>"
  params:
    - name: button
      type: enum
      values: [POWER, POWER_OFF, MENU, LENS, INPUT, UP, "UP+REP", DOWN, "DOWN+REP", LEFT, "LEFT+REP", RIGHT, "RIGHT+REP", OK]
      description: "+REP = button hold; must send *-REP to release"

- id: remote_emulate
  label: Remote Control Emulation
  kind: action
  command: "RC <button>"
  params:
    - name: button
      type: enum
      values: [POWER, POWER_OFF, MENU, INPUT, ASPECT, AUTOPC, KEYSTONE, UP, "UP+REP", DOWN, "DOWN+REP", LEFT, "LEFT+REP", RIGHT, "RIGHT+REP", OK, IMAGE, GAMMA, FREEZE, VOL_P, "VOL_P+REP", VOL_M, "VOL_M+REP", BLANK, MUTE, P-TIMER, LAMP, DZOOM_P, "DZOOM_P+REP", DZOOM_M, "DZOOM_M+REP", FOCUS, ZOOM, SHIFT]
      description: "+REP = button hold; must send *-REP to release"

# --- Mode (compatibility) ---
- id: set_mode
  label: Set Control Mode (Legacy)
  kind: action
  command: "REMOTE or LOCAL"
  params: []
  notes: "Legacy compatibility command. No functional LOCAL/REMOTE modes in this firmware version."
- id: set_6axis_g
  label: Set 6-Axis G Correction
  kind: action
  command: "6AXG=<hue>,<saturation>,<brightness>"
  params:
    - name: hue
      type: integer
      min: -20
      max: 20
    - name: saturation
      type: integer
      min: -20
      max: 20
    - name: brightness
      type: integer
      min: -20
      max: 20

- id: set_6axis_b
  label: Set 6-Axis B Correction
  kind: action
  command: "6AXB=<hue>,<saturation>,<brightness>"
  params:
    - name: hue
      type: integer
      min: -20
      max: 20
    - name: saturation
      type: integer
      min: -20
      max: 20
    - name: brightness
      type: integer
      min: -20
      max: 20

- id: set_6axis_c
  label: Set 6-Axis C Correction
  kind: action
  command: "6AXC=<hue>,<saturation>,<brightness>"
  params:
    - name: hue
      type: integer
      min: -20
      max: 20
    - name: saturation
      type: integer
      min: -20
      max: 20
    - name: brightness
      type: integer
      min: -20
      max: 20

- id: set_6axis_m
  label: Set 6-Axis M Correction
  kind: action
  command: "6AXM=<hue>,<saturation>,<brightness>"
  params:
    - name: hue
      type: integer
      min: -20
      max: 20
    - name: saturation
      type: integer
      min: -20
      max: 20
    - name: brightness
      type: integer
      min: -20
      max: 20

- id: set_6axis_y
  label: Set 6-Axis Y Correction
  kind: action
  command: "6AXY=<hue>,<saturation>,<brightness>"
  params:
    - name: hue
      type: integer
      min: -20
      max: 20
    - name: saturation
      type: integer
      min: -20
      max: 20
    - name: brightness
      type: integer
      min: -20
      max: 20

- id: set_fine_gamma_g
  label: Set Fine Gamma G
  kind: action
  command: "FINE_GAMMA_G=<v1>,...,<vn>"
  params:
    - name: values
      type: string
      description: Comma-separated values each 0-1024

- id: set_fine_gamma_b
  label: Set Fine Gamma B
  kind: action
  command: "FINE_GAMMA_B=<v1>,...,<vn>"
  params:
    - name: values
      type: string
      description: Comma-separated values each 0-1024
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  query: "GET POWER"
  response_prefix: "g:POWER="
  values: [OFF, OFF2ON, ON, ON2PMM, PMM, PMM2ON, ON2OFF]
  description: "OFF=off, OFF2ON=transitioning on, ON=on, ON2PMM=transitioning to standby, PMM=standby, PMM2ON=standby transitioning on, ON2OFF=transitioning off"

- id: input_source
  label: Current Input Source
  type: enum
  query: "GET INPUT"
  response_prefix: "g:INPUT="
  values: [D-RGB, A-RGB, COMP, HDMI]

- id: volume_level
  label: Volume Level
  type: integer
  query: "GET AVOL"
  response_prefix: "g:AVOL="
  min: 0
  max: 20

- id: mute_state
  label: Mute State
  type: enum
  query: "GET MUTE"
  response_prefix: "g:MUTE="
  values: [ON, OFF]

- id: blank_state
  label: Blank State
  type: enum
  query: "GET BLANK"
  response_prefix: "g:BLANK="
  values: [ON, OFF]

- id: freeze_state
  label: Freeze State
  type: enum
  query: "GET FREEZE"
  response_prefix: "g:FREEZE="
  values: [ON, OFF]

- id: image_mode
  label: Image Mode
  type: enum
  query: "GET IMAGE"
  response_prefix: "g:IMAGE="
  values: [STANDARD, PRESENTATION, VIVID_PHOTO, PHOTO_SRGB, DCM_SIM, DYNAMIC, VIDEO, CINEMA, USER_1, USER_2, USER_3, USER_4, USER_5]

- id: aspect_ratio
  label: Aspect Ratio
  type: enum
  query: "GET ASPECT"
  response_prefix: "g:ASPECT="
  values: [AUTO, "4:3", "16:9", ZOOM, TRUE, FULL]

- id: screen_aspect
  label: Screen Aspect
  type: enum
  query: "GET SCRNASPECT"
  response_prefix: "g:SCRNASPECT="
  values: ["16:10", "16:9", "4:3", "16:9_DIS", "4:3_DIS"]

- id: image_flip
  label: Image Flip
  type: enum
  query: "GET IMAGEFLIP"
  response_prefix: "g:IMAGEFLIP="
  values: [NONE, CEILING, REAR, REAR_CEILING]

- id: brightness
  label: Brightness
  type: integer
  query: "GET BRI"
  response_prefix: "g:BRI="
  min: -20
  max: 20

- id: contrast
  label: Contrast
  type: integer
  query: "GET CONT"
  response_prefix: "g:CONT="
  min: -20
  max: 20

- id: sharpness
  label: Sharpness
  type: integer
  query: "GET SHARP"
  response_prefix: "g:SHARP="
  min: -10
  max: 10

- id: hue
  label: Hue
  type: integer
  query: "GET HUE"
  response_prefix: "g:HUE="
  min: -20
  max: 20

- id: saturation
  label: Saturation
  type: integer
  query: "GET SAT"
  response_prefix: "g:SAT="
  min: -20
  max: 20

- id: color_temp
  label: Color Temperature
  type: integer
  query: "GET COLOR_TEMP"
  response_prefix: "g:COLOR_TEMP="
  min: -17
  max: 21

- id: gamma
  label: Gamma
  type: integer
  query: "GET GAMMA"
  response_prefix: "g:GAMMA="
  min: -10
  max: 10

- id: dynamic_gamma
  label: Dynamic Gamma
  type: enum
  query: "GET DGAMMA"
  response_prefix: "g:DGAMMA="
  values: [OFF, WEAK, MIDDLE, STRONG]

- id: noise_reduction
  label: Noise Reduction
  type: enum
  query: "GET NR"
  response_prefix: "g:NR="
  values: [OFF, WEAK, MIDDLE, STRONG]

- id: lamp_mode
  label: Lamp Mode
  type: enum
  query: "GET LAMP"
  response_prefix: "g:LAMP="
  values: [NORMAL, SILENT]

- id: lamp_counter
  label: Lamp ON Time
  type: string
  query: "GET LAMPCOUNTER"
  response_prefix: 'g:LAMPCOUNTER="'
  description: "Returns bar-graph string like [GGGG____] indicating cumulative lamp hours."

- id: error_status
  label: Error Status
  type: enum
  query: "GET ERR"
  response_prefix: "g:ERR="
  values: [NO_ERROR, ABNORMAL_TEMPERATURE, FAULTY_LAMP, FAULTY_LAMP_COVER, FAULTY_COOLING_FAN, FAULTY_POWER_SUPPLY, FAULTY_AIR_FILTER, FAULTY_POWER_ZOOM, FAULTY_POWER_FOCUS, FAULTY_POWER_LENS_SHIFT, FAULTY_LENS_CONNECTOR]

- id: signal_status
  label: Signal Status
  type: enum
  query: "GET SIGNALSTATUS"
  response_prefix: "g:SIGNALSTATUS="
  values: [NO_SIGNAL, DISPLAYING, SETTING]

- id: signal_info
  label: Signal Info
  type: string
  query: "GET SIGNAL_INFO"
  response_prefix: 'g:SIGNAL_INFO="'
  description: "Returns resolution and refresh, e.g. 1920 x 1200 60"

- id: product_code
  label: Product Code
  type: enum
  query: "GET PRODCODE"
  response_prefix: 'g:PRODCODE="'
  values: [WUX5000, WUX4000]

- id: command_version
  label: Command Version
  type: string
  query: "GET COMVER"
  response_prefix: 'g:COMVER="'
  description: "2-digit.4-digit version string, e.g. 01.0000"

- id: rom_version
  label: ROM Version
  type: string
  query: "GET ROMVER"
  response_prefix: 'g:ROMVER="'
  description: "2-digit.6-digit version string, e.g. 01.030602"

- id: temperature
  label: Temperature Sensor
  type: string
  query: "GET TEMP"
  response_prefix: "g:TEMP="
  description: "Returns <sensor_count>,<value1>,...,<valueN>. May return 0 sensors."

- id: control_mode
  label: Control Mode (Legacy)
  type: enum
  query: "GET MODE"
  response_prefix: "g:MODE="
  values: [REMOTE, LOCAL]

- id: hdmi_input_mode
  label: HDMI Input Mode
  type: enum
  query: "GET HDMI_IN"
  response_prefix: "g:HDMI_IN="
  values: [AUTO, PC]

- id: hdmi_overscan
  label: HDMI Overscan
  type: enum
  query: "GET HDMI_OVSCAN"
  response_prefix: "g:HDMI_OVSCAN="
  values: [OFF, ON]

- id: dzoom_ratio
  label: Digital Zoom Ratio
  type: string
  query: "GET DZOOM_RAT"
  response_prefix: "g:DZOOM_RAT="

- id: dzoom_position
  label: Digital Zoom Position
  type: string
  query: "GET DZOOM_POS"
  response_prefix: "g:DZOOM_POS="

- id: 6axis_adj
  label: 6-Axis Adjustment
  type: enum
  query: "GET 6AXADJ"
  response_prefix: "g:6AXADJ="
  values: [ON, OFF]

- id: rgb_gain
  label: RGB Gain
  type: string
  query: "GET RGBGAIN"
  response_prefix: "g:RGBGAIN="
  description: "Returns R,G,B comma-separated values, each -60 to 60"

- id: rgb_offset
  label: RGB Offset
  type: string
  query: "GET RGBOFFSET"
  response_prefix: "g:RGBOFFSET="
  description: "Returns R,G,B comma-separated values, each -60 to 60"

- id: memory_color
  label: Memory Color Adjustment
  type: enum
  query: "GET MEMCADJ"
  response_prefix: "g:MEMCADJ="
  values: [OFF, MEM_L, MEM_M, MEM_H]

- id: ambient_adj
  label: Ambient Light Correction
  type: enum
  query: "GET AMBADJ"
  response_prefix: "g:AMBADJ="
  values: [ON, OFF]

- id: ambient_level
  label: Ambient Light Level
  type: enum
  query: "GET AMBLEVEL"
  response_prefix: "g:AMBLEVEL="
  values: [WEAK, MIDDLE, STRONG]

- id: ambient_type
  label: Ambient Light Type
  type: enum
  query: "GET AMBTYPE"
  response_prefix: "g:AMBTYPE="
  values: [TG, FL, FL_H]

- id: saveimgprof_status
  label: User Memory Presence
  type: string
  query: "GET SAVEIMGPROF"
  response_prefix: "g:SAVEIMGPROF="
  description: "Returns <count>:<u1>,<u2>,<u3>,<u4>,<u5> where each is 0 (not created) or 1 (created)"

- id: sel_signal
  label: Detected Signal
  type: enum
  query: "GET SEL"
  response_prefix: "g:SEL="
  values: [1080p, 1080i, 1035i, 720p, 576p, 480p, 576i, 480i]
```

## Variables
```yaml
# No settable continuous variables beyond those already covered by Actions with numeric params.
```

## Events
```yaml
# Device does not send unsolicited notifications. All responses are command-response pairs.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes: POWER OFF interrupts all other processing (including ZOOM/FOCUS).
# The source states: "If AC power is supplied to the projector, communication is
# possible regardless of whether the power is on or off."
# No explicit safety interlocks or confirmation sequences described.
```

## Notes
- Commands are case-insensitive. Query format: `GET <PARAM>` or `? <PARAM>`.
- Setting format: `<PARAM>=<VALUE>`. Response format: `i:OK`, `i:BUSY`, `w:<warning>`, `e:<code> <message>`, or `g:<PARAM>=<VALUE>`.
- Only one command in flight at a time. Sending a second command before response returns `e:0001 BAD_SEQUENCE`.
- Mute resets to OFF on power cycle. Volume can be set while muted.
- Changing image mode may alter brightness, contrast, sharpness, gamma, dynamic gamma, saturation/hue, memory color, RGB gain/offset, lamp mode, and 6-axis settings.
- Button hold emulation (+REP params) must be explicitly released with *-REP; holding ends if a panel/remote button is operated or any command is received.
- `POWER OFF` while ON interrupts all other command processing.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: 6AXG, 6AXB, 6AXC, 6AXM, 6AXY commands follow same pattern as 6AXR but not individually enumerated -->
<!-- UNRESOLVED: FINE_GAMMA_G and FINE_GAMMA_B follow same pattern as FINE_GAMMA_R but not individually enumerated -->
<!-- UNRESOLVED: exact DZOOM_POS coordinate range not specified in source -->
<!-- UNRESOLVED: exact Fine Gamma number of adjustment points not specified -->
<!-- UNRESOLVED: KEYSTONE command parameters referenced in RC emulation but no standalone command documented -->

## Provenance

```yaml
source_domains:
  - downloads.canon.com
source_urls:
  - https://downloads.canon.com/nw/brochures/pdf/projector/realis-wux10-mark-ii-commands.pdf
retrieved_at: 2026-04-30T04:33:02.664Z
last_checked_at: 2026-05-14T18:17:14.891Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.891Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 90 spec actions matched source commands literally; transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "6AXG, 6AXB, 6AXC, 6AXM, 6AXY follow same pattern as 6AXR - not enumerated individually for brevity"
- "FINE_GAMMA_G, FINE_GAMMA_B follow same pattern"
- "no multi-step macro sequences described in source"
- "6AXG, 6AXB, 6AXC, 6AXM, 6AXY commands follow same pattern as 6AXR but not individually enumerated"
- "FINE_GAMMA_G and FINE_GAMMA_B follow same pattern as FINE_GAMMA_R but not individually enumerated"
- "exact DZOOM_POS coordinate range not specified in source"
- "exact Fine Gamma number of adjustment points not specified"
- "KEYSTONE command parameters referenced in RC emulation but no standalone command documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
