---
spec_id: admin/canon-wux5000-wux4000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Canon WUX5000 / WUX4000 Control Spec"
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
  - manualslib.com
  - manualshelf.com
  - canon.a.bigcontent.io
  - gdlp01.c-wss.com
source_urls:
  - https://downloads.canon.com/nw/brochures/pdf/projector/WUX5000_WUX4000_Command_List.pdf
  - https://www.manualslib.com/manual/2034638/Canon-Wux500st.html
  - https://www.manualshelf.com/manual/canon/realis-wux10/wux10-command-list.html
  - https://canon.a.bigcontent.io/v1/static/636349338420159846SJ_xeed_wux6500_02/
  - https://gdlp01.c-wss.com/gds/8/0300023908/03/wux500-450st-um4-eng.pdf
retrieved_at: 2026-05-15T01:04:12.983Z
last_checked_at: 2026-06-02T22:04:55.354Z
generated_at: 2026-06-02T22:04:55.354Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated; exact model variants (e.g. DICOM) not enumerated"
  - "no multi-step sequences explicitly described in source beyond"
  - "source states POWER OFF interrupts processing of other commands"
  - "exact physical connector pinout beyond 3-wire SD/RD/SG not specified"
  - "whether LAN connection shares the same command set or has protocol differences"
  - "DHCP/static IP configuration for LAN not documented"
  - "fine gamma adjustment point count is variable; exact range not constrained beyond 0-1024 per point"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:04:55.354Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Canon WUX5000 / WUX4000 Control Spec

## Summary

Canon WUX5000 and WUX4000 multimedia projectors controllable via RS-232C serial or TCP/IP LAN (port 33336). Supports power, input selection, image adjustment, audio, and diagnostics through ASCII command/response protocol with CR/LF/null delimiters.

<!-- UNRESOLVED: firmware version compatibility not stated; exact model variants (e.g. DICOM) not enumerated -->

## Transport

```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 2
  flow_control: none
addressing:
  port: 33336
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- powerable  # inferred from POWER ON/OFF commands
- routable  # inferred from INPUT selection commands
- queryable  # inferred from GET/? query commands
- levelable  # inferred from AVOL, BRI, CONT, GAMMA, etc.
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

- id: input_select
  label: Select Input
  kind: action
  params:
    - name: source
      type: enum
      values: [D-RGB, A-RGB, COMP, HDMI]
      description: Input source to select

- id: image_mode
  label: Set Image Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [STANDARD, PRESENTATION, VIVID_PHOTO, PHOTO_SRGB, DCM_SIM, DYNAMIC, VIDEO, CINEMA, USER_1, USER_2, USER_3, USER_4, USER_5]
      description: Image quality preset

- id: aspect
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, "4:3", "16:9", ZOOM, TRUE, FULL]
      description: Screen display mode

- id: blank_on
  label: Blank On
  kind: action
  params: []

- id: blank_off
  label: Blank Off
  kind: action
  params: []

- id: freeze_on
  label: Freeze On
  kind: action
  params: []

- id: freeze_off
  label: Freeze Off
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

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Audio volume level 0-20

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: Brightness -20 to 20

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: Contrast -20 to 20

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Sharpness -10 to 10

- id: gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: Gamma adjustment -10 to 10

- id: color_temp_set
  label: Set Color Temperature
  kind: action
  params:
    - name: value
      type: integer
      description: Color temperature -17 to 21

- id: hue_set
  label: Set Hue
  kind: action
  params:
    - name: value
      type: integer
      description: Hue -20 to 20

- id: saturation_set
  label: Set Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: Color saturation -20 to 20

- id: lamp_mode
  label: Set Lamp Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [NORMAL, SILENT]
      description: Lamp output mode

- id: image_flip
  label: Set Image Flip
  kind: action
  params:
    - name: mode
      type: enum
      values: [NONE, CEILING, REAR, REAR_CEILING]
      description: Display orientation

- id: dgamma
  label: Set Dynamic Gamma
  kind: action
  params:
    - name: mode
      type: enum
      values: [OFF, WEAK, MIDDLE, STRONG]
      description: Dynamic gamma strength

- id: noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: mode
      type: enum
      values: [OFF, WEAK, MIDDLE, STRONG]
      description: Noise reduction level

- id: dzoom_ratio
  label: Set Digital Zoom Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values: [1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12]
      description: Digital zoom multiplier

- id: dzoom_position
  label: Set Digital Zoom Position
  kind: action
  params:
    - name: x
      type: integer
      description: Horizontal offset in pixels
    - name: y
      type: integer
      description: Vertical offset in pixels

- id: hdmi_input_mode
  label: Set HDMI Input Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, PC]
      description: HDMI input type (AV or PC)

- id: hdmi_overscan
  label: Set HDMI Overscan
  kind: action
  params:
    - name: mode
      type: enum
      values: [OFF, ON]
      description: HDMI overscan setting

- id: screen_aspect
  label: Set Screen Aspect
  kind: action
  params:
    - name: mode
      type: enum
      values: ["16:10", "16:9", "4:3", "16:9_DIS", "4:3_DIS"]
      description: Screen aspect setting

- id: rgb_gain
  label: Set RGB Gain
  kind: action
  params:
    - name: r
      type: integer
      description: R gain -60 to 60
    - name: g
      type: integer
      description: G gain -60 to 60
    - name: b
      type: integer
      description: B gain -60 to 60

- id: rgb_offset
  label: Set RGB Offset
  kind: action
  params:
    - name: r
      type: integer
      description: R offset -60 to 60
    - name: g
      type: integer
      description: G offset -60 to 60
    - name: b
      type: integer
      description: B offset -60 to 60

- id: 6axadj
  label: Set 6-Axis Adjustment
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: Enable/disable 6-axis color adjustment

- id: 6axr_set
  label: Set R Axis Correction
  kind: action
  params:
    - name: hue
      type: integer
      description: R hue -20 to 20
    - name: saturation
      type: integer
      description: R saturation -20 to 20
    - name: brightness
      type: integer
      description: R brightness -20 to 20

- id: 6axg_set
  label: Set G Axis Correction
  kind: action
  params:
    - name: hue
      type: integer
      description: G hue -20 to 20
    - name: saturation
      type: integer
      description: G saturation -20 to 20
    - name: brightness
      type: integer
      description: G brightness -20 to 20

- id: 6axb_set
  label: Set B Axis Correction
  kind: action
  params:
    - name: hue
      type: integer
      description: B hue -20 to 20
    - name: saturation
      type: integer
      description: B saturation -20 to 20
    - name: brightness
      type: integer
      description: B brightness -20 to 20

- id: 6axc_set
  label: Set C Axis Correction
  kind: action
  params:
    - name: hue
      type: integer
      description: C hue -20 to 20
    - name: saturation
      type: integer
      description: C saturation -20 to 20
    - name: brightness
      type: integer
      description: C brightness -20 to 20

- id: 6axm_set
  label: Set M Axis Correction
  kind: action
  params:
    - name: hue
      type: integer
      description: M hue -20 to 20
    - name: saturation
      type: integer
      description: M saturation -20 to 20
    - name: brightness
      type: integer
      description: M brightness -20 to 20

- id: 6axy_set
  label: Set Y Axis Correction
  kind: action
  params:
    - name: hue
      type: integer
      description: Y hue -20 to 20
    - name: saturation
      type: integer
      description: Y saturation -20 to 20
    - name: brightness
      type: integer
      description: Y brightness -20 to 20

- id: ambadj
  label: Set Ambient Light Correction
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: Enable/disable ambient light correction

- id: amblevel
  label: Set Ambient Light Level
  kind: action
  params:
    - name: level
      type: enum
      values: [WEAK, MIDDLE, STRONG]
      description: Ambient light level

- id: ambtype
  label: Set Ambient Light Type
  kind: action
  params:
    - name: type
      type: enum
      values: [TG, FL, FL_H]
      description: "Ambient light type (Tungsten, Fluorescent, Fluorescent H)"

- id: memcadj
  label: Set Memory Color Adjustment
  kind: action
  params:
    - name: mode
      type: enum
      values: [OFF, MEM_L, MEM_M, MEM_H]
      description: Memory color adjustment level

- id: fine_gamma_r
  label: Set Fine Gamma R
  kind: action
  params:
    - name: values
      type: string
      description: Comma-separated adjustment values 0-1024

- id: fine_gamma_g
  label: Set Fine Gamma G
  kind: action
  params:
    - name: values
      type: string
      description: Comma-separated adjustment values 0-1024

- id: fine_gamma_b
  label: Set Fine Gamma B
  kind: action
  params:
    - name: values
      type: string
      description: Comma-separated adjustment values 0-1024

- id: save_image_profile
  label: Save Image Profile
  kind: action
  params:
    - name: slot
      type: enum
      values: [USER_1, USER_2, USER_3, USER_4, USER_5, DEL_ALL]
      description: User memory slot or delete all

- id: auto_pc
  label: Auto PC
  kind: action
  params: []

- id: auto_setup
  label: Auto Setup
  kind: action
  params:
    - name: mode
      type: enum
      values: [INPUT]
      description: Automatic signal sensing execution

- id: sel_signal
  label: Select Input Signal
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO]
      description: Auto-detect input signal

- id: mode_switch
  label: Switch Control Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [REMOTE, LOCAL]
      description: "Control mode (compatibility only, no functional difference)"

- id: main_panel
  label: Front Panel Emulation
  kind: action
  params:
    - name: button
      type: enum
      values: [POWER, POWER_OFF, MENU, LENS, INPUT, UP, "UP+REP", DOWN, "DOWN+REP", LEFT, "LEFT+REP", RIGHT, "RIGHT+REP", OK, "*-REP"]
      description: Front panel button to emulate

- id: remote_emulation
  label: Remote Control Emulation
  kind: action
  params:
    - name: button
      type: enum
      values: [POWER, POWER_OFF, MENU, INPUT, ASPECT, AUTOPC, KEYSTONE, UP, "UP+REP", DOWN, "DOWN+REP", LEFT, "LEFT+REP", RIGHT, "RIGHT+REP", OK, IMAGE, GAMMA, FREEZE, VOL_P, "VOL_P+REP", VOL_M, "VOL_M+REP", BLANK, MUTE, P-TIMER, LAMP, DZOOM_P, "DZOOM_P+REP", DZOOM_M, "DZOOM_M+REP", FOCUS, ZOOM, SHIFT, "*-REP"]
      description: Remote control button to emulate
```

## Feedbacks

```yaml
- id: power_state
  type: enum
  values: [OFF, OFF2ON, ON, ON2PMM, PMM, PMM2ON, ON2OFF]
  description: "Current power state including transitions"

- id: input_source
  type: enum
  values: [D-RGB, A-RGB, COMP, HDMI]
  description: Current input selection

- id: image_mode
  type: enum
  values: [STANDARD, PRESENTATION, VIVID_PHOTO, PHOTO_SRGB, DCM_SIM, DYNAMIC, VIDEO, CINEMA, USER_1, USER_2, USER_3, USER_4, USER_5]
  description: Current image mode

- id: aspect_ratio
  type: enum
  values: [AUTO, "4:3", "16:9", ZOOM, TRUE, FULL]
  description: Current screen display mode

- id: blank_state
  type: enum
  values: [ON, OFF]
  description: Blank state

- id: freeze_state
  type: enum
  values: [ON, OFF]
  description: Freeze state

- id: mute_state
  type: enum
  values: [ON, OFF]
  description: Mute state

- id: volume_level
  type: integer
  description: "Current volume level 0-20"

- id: brightness
  type: integer
  description: "Current brightness -20 to 20"

- id: contrast
  type: integer
  description: "Current contrast -20 to 20"

- id: sharpness
  type: integer
  description: "Current sharpness -10 to 10"

- id: gamma
  type: integer
  description: "Current gamma -10 to 10"

- id: color_temp
  type: integer
  description: "Current color temperature -17 to 21"

- id: hue
  type: integer
  description: "Current hue -20 to 20"

- id: saturation
  type: integer
  description: "Current saturation -20 to 20"

- id: lamp_mode
  type: enum
  values: [NORMAL, SILENT]
  description: Current lamp output mode

- id: lamp_counter
  type: string
  description: "Lamp ON time bracket string e.g. [GG______]"

- id: image_flip
  type: enum
  values: [NONE, CEILING, REAR, REAR_CEILING]
  description: Current display orientation

- id: dgamma
  type: enum
  values: [OFF, WEAK, MIDDLE, STRONG]
  description: Current dynamic gamma setting

- id: noise_reduction
  type: enum
  values: [OFF, WEAK, MIDDLE, STRONG]
  description: Current noise reduction setting

- id: dzoom_ratio
  type: number
  description: "Current digital zoom ratio"

- id: dzoom_position
  type: string
  description: "Current DZOOM position as X,Y pixel values"

- id: hdmi_input_mode
  type: enum
  values: [AUTO, PC]
  description: Current HDMI input mode

- id: hdmi_overscan
  type: enum
  values: [OFF, ON]
  description: Current HDMI overscan setting

- id: screen_aspect
  type: enum
  values: ["16:10", "16:9", "4:3", "16:9_DIS", "4:3_DIS"]
  description: Current screen aspect

- id: rgb_gain
  type: string
  description: "Current R,G,B gain values -60 to 60"

- id: rgb_offset
  type: string
  description: "Current R,G,B offset values -60 to 60"

- id: six_axis_adj
  type: enum
  values: [ON, OFF]
  description: 6-axis adjustment state

- id: ambient_adj
  type: enum
  values: [ON, OFF]
  description: Ambient light correction state

- id: ambient_level
  type: enum
  values: [WEAK, MIDDLE, STRONG]
  description: Ambient light level

- id: ambient_type
  type: enum
  values: [TG, FL, FL_H]
  description: Ambient light type

- id: memory_color_adj
  type: enum
  values: [OFF, MEM_L, MEM_M, MEM_H]
  description: Memory color adjustment level

- id: control_mode
  type: enum
  values: [REMOTE, LOCAL]
  description: "Current control mode (compatibility only)"

- id: error_info
  type: enum
  values: [NO_ERROR, ABNORMAL_TEMPERATURE, FAULTY_LAMP, FAULTY_LAMP_COVER, FAULTY_COOLING_FAN, FAULTY_POWER_SUPPLY, FAULTY_AIR_FILTER, FAULTY_POWER_ZOOM, FAULTY_POWER_FOCUS, FAULTY_POWER_LENS_SHIFT, FAULTY_LENS_CONNECTOR]
  description: Current error state

- id: signal_status
  type: enum
  values: [NO_SIGNAL, DISPLAYING, SETTING]
  description: Current signal input status

- id: signal_info
  type: string
  description: "Input signal info e.g. 1920 x 1200 60"

- id: detected_signal
  type: enum
  values: [1080p, 1080i, 1035i, 720p, 576p, 480p, 576i, 480i]
  description: Detected component input signal type

- id: product_code
  type: enum
  values: [WUX5000, WUX4000]
  description: Projector model identification

- id: command_version
  type: string
  description: "User command version e.g. 01.0000"

- id: rom_version
  type: string
  description: "ROM firmware version e.g. 01.030602"

- id: temperature
  type: string
  description: "Temperature sensor readings as count,value1,...,valueN"

- id: saveimgprof_status
  type: string
  description: "User memory presence as count:u1,u2,u3,u4,u5"
```

## Variables

```yaml
# All settable parameters are covered as Actions with explicit SET syntax.
# No additional variables beyond action parameters.
```

## Events

```yaml
# Device does not send unsolicited notifications.
# All responses are command-response pairs initiated by the PC.
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source beyond
# the general note to poll GET POWER after POWER ON/OFF commands.
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source states POWER OFF interrupts processing of other commands
# including ZOOM/FOCUS, and that GET POWER should be polled at regular intervals
# after power commands to confirm target state. No explicit interlock sequences documented.
```

## Notes

- Communication is 1:1 (one PC to one projector), half-duplex. The PC must wait for a response before sending the next command; otherwise BAD_SEQUENCE (e:0001) is returned.
- Maximum command length is 256 bytes including delimiters. Delimiters: CR (0Dh), LF (0Ah), CR+LF, or Null (00h).
- Character timeout (Tc): 5s between characters; response timeout (Tr): 15s between command and response.
- Commands are case-insensitive. Only ASCII 20h-7Eh usable in command strings.
- Setting commands use format `<PARAM>=<VALUE>`. Reference/query commands use `GET <PARAM>` or `? <PARAM>`.
- Response prefix indicates type: `i:` (state), `w:` (warning), `e:` (error), `g:` (GET response).
- MODE command (REMOTE/LOCAL) exists for backward compatibility only; no functional mode distinction on this model.
- Volume can be set while muted; mute resets to OFF at power-on.
- POWER command: `POWER ON` / `POWER OFF` (space separator, not `=`). Power state includes transition states (OFF2ON, ON2OFF, ON2PMM, PMM2ON).
- LAN communication uses TCP/IP on port 33336.
- Communication possible whenever AC power is supplied, regardless of projector power state.

<!-- UNRESOLVED: exact physical connector pinout beyond 3-wire SD/RD/SG not specified -->
<!-- UNRESOLVED: whether LAN connection shares the same command set or has protocol differences -->
<!-- UNRESOLVED: DHCP/static IP configuration for LAN not documented -->
<!-- UNRESOLVED: fine gamma adjustment point count is variable; exact range not constrained beyond 0-1024 per point -->

## Provenance

```yaml
source_domains:
  - downloads.canon.com
  - manualslib.com
  - manualshelf.com
  - canon.a.bigcontent.io
  - gdlp01.c-wss.com
source_urls:
  - https://downloads.canon.com/nw/brochures/pdf/projector/WUX5000_WUX4000_Command_List.pdf
  - https://www.manualslib.com/manual/2034638/Canon-Wux500st.html
  - https://www.manualshelf.com/manual/canon/realis-wux10/wux10-command-list.html
  - https://canon.a.bigcontent.io/v1/static/636349338420159846SJ_xeed_wux6500_02/
  - https://gdlp01.c-wss.com/gds/8/0300023908/03/wux500-450st-um4-eng.pdf
retrieved_at: 2026-05-15T01:04:12.983Z
last_checked_at: 2026-06-02T22:04:55.354Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:04:55.354Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated; exact model variants (e.g. DICOM) not enumerated"
- "no multi-step sequences explicitly described in source beyond"
- "source states POWER OFF interrupts processing of other commands"
- "exact physical connector pinout beyond 3-wire SD/RD/SG not specified"
- "whether LAN connection shares the same command set or has protocol differences"
- "DHCP/static IP configuration for LAN not documented"
- "fine gamma adjustment point count is variable; exact range not constrained beyond 0-1024 per point"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
