---
spec_id: admin/wyrestorm-h2x-h2xc-matrix
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm H2X/H2XC Matrix Switcher Control Spec"
manufacturer: Wyrestorm
model_family: MX-1010-HDBT-H2X
aliases: []
compatible_with:
  manufacturers:
    - Wyrestorm
  models:
    - MX-1010-HDBT-H2X
    - MX-1616-HDBT-H2X
    - MX-1010-H2XC
    - MX-1616-H2XC
  firmware: "10x10 Main Board FW v1.3, 16x16 Main Board FW v1.4"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-05-22T21:02:16.398Z
last_checked_at: 2026-10-07T13:12:01.311Z
generated_at: 2026-10-07T13:12:01.311Z
firmware_coverage: "10x10 Main Board FW v1.3, 16x16 Main Board FW v1.4"
protocol_coverage: []
known_gaps:
  - "H2XC-specific differences from H2X not documented in source"
  - "no unsolicited event/notification protocol described in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures found in source"
  - "exact differences between H2X and H2XC models not documented"
  - "maximum concurrent connection count for TCP not stated"
  - "command response timing / timeout behavior not documented"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:12:01.311Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 action units match source commands, transport (port 23, 57600 8N1) supported, spec covers full source catalogue; auth honestly UNRESOLVED. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-23
---

# Wyrestorm H2X/H2XC Matrix Switcher Control Spec

## Summary
HDMI/HDBaseT matrix switchers in 10x10 and 16x16 configurations (H2X and H2XC series). Controlled via RS-232 or TCP/IP using ASCII command strings terminated with `<CR><LF>`. Supports video/audio routing, volume control, CEC display power, EDID management, scene presets, and HDBaseT diagnostics.

<!-- UNRESOLVED: H2XC-specific differences from H2X not documented in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - routable      # video/audio input-to-output switching
  - queryable     # extensive GET commands for state queries
  - levelable     # volume gain control per audio output
  - powerable     # CEC display power on/off
```

## Actions
```yaml
actions:
  - id: switch_video
    label: Switch Video Input to Output
    kind: action
    command: "SET SW in{N} out{N}"
    response: "SW in{N} out{N}"
    params:
      - name: input
        type: string
        description: "Input identifier (in1~in16)"
      - name: output
        type: string
        description: "Output identifier (out1~out16, all)"

  - id: set_audio_switch_mode
    label: Configure Audio Switch Mode
    kind: action
    command: "SET AUDIOSW_M {prm}"
    response: "AUDIOSW_M {prm}"
    params:
      - name: mode
        type: enum
        values: [on, off]
        description: "On = audio independent from video; Off = audio follows video"

  - id: switch_audio
    label: Switch Audio Input to Output
    kind: action
    command: "SET AUDIOSW in{N} out{N}"
    response: "AUDIOSW in{N} out{N}"
    params:
      - name: input
        type: string
        description: "Audio input (hdmi1~hdmi16, spdif1~spdif16, arc1~arc16)"
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"

  - id: set_volume_gain
    label: Set Output Gain Level
    kind: action
    command: "SET VOLGAIN_DATA aout{N} {prm}"
    response: "VOLGAIN_DATA aout{N} {prm}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
      - name: level
        type: integer
        description: "Gain in dB. FW<v1.3/v1.4: -10~10 (default 0). FW>=v1.3/v1.4: -80~0 in 2dB steps"

  - id: mute_audio
    label: Mute Audio Output
    kind: action
    command: "SET MUTE aout{N} {prm}"
    response: "MUTE aout{N} {prm}"
    params:
      - name: output
        type: string
        description: "Audio output (spdifout1~16, audioout1~16, all)"
      - name: state
        type: enum
        values: [on, off]
        description: "On = mute, Off = unmute"

  - id: set_volume_gain_fixed
    label: Set Audio Output Fixed/Variable
    kind: action
    command: "SET VOLGAIN_FIX aout{N} {prm}"
    response: "VOLGAIN_FIX aout{N} {prm}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
      - name: mode
        type: enum
        values: [on, off]
        description: "On = fixed level, Off = variable level"
    notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

  - id: set_mute_method
    label: Set Attenuation Method for Mute
    kind: action
    command: "SET MUTE_M aout{N} {prm}"
    response: "MUTE_M aout{N} {prm}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
      - name: method
        type: enum
        values: [cut, ramp]
        description: "Cut = immediate mute, Ramp = gradual ramp to mute level"
    notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

  - id: volume_increase
    label: Increase Volume Output Level
    kind: action
    command: "SET VOLGAIN_INC aout{N}"
    response: "VOLGAIN_INC aout{N} {prm}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
    notes: "Default step 2dB. Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

  - id: volume_decrease
    label: Decrease Volume Output Level
    kind: action
    command: "SET VOLGAIN_DEC aout{N}"
    response: "VOLGAIN_DEC aout{N} {prm}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
    notes: "Default step 2dB. Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

  - id: set_volume_step
    label: Configure Volume Step Size
    kind: action
    command: "SET VOLGAIN_STEP aout{N} {prm}"
    response: "VOLGAIN_STEP aout{N} {prm}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
      - name: step
        type: enum
        values: ["2", "4", "8"]
        description: "Step size in dB"
    notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

  - id: save_video_scene
    label: Save Video Scene
    kind: action
    command: "SAVE PRESET_V {prm}"
    response: "PRESET_V {prm}"
    params:
      - name: scene
        type: integer
        description: "Scene number (1~20)"

  - id: recall_video_scene
    label: Recall Video Scene
    kind: action
    command: "RESTORE PRESET_V {prm}"
    response: "PRESET_V {prm}"
    params:
      - name: scene
        type: integer
        description: "Scene number (1~20)"

  - id: save_audio_scene
    label: Save Audio Scene
    kind: action
    command: "SAVE PRESET_A {prm}"
    response: "PRESET_A {prm}"
    params:
      - name: scene
        type: integer
        description: "Scene number (1~20)"
    notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

  - id: recall_audio_scene
    label: Recall Audio Scene
    kind: action
    command: "RESTORE PRESET_A {prm}"
    response: "PRESET_A {prm}"
    params:
      - name: scene
        type: integer
        description: "Scene number (1~20)"
    notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

  - id: cec_power
    label: Power Display On/Off via CEC
    kind: action
    command: "SET CEC_PWR out{N} {prm}"
    response: "CEC_PWR out{N} {prm}"
    params:
      - name: output
        type: string
        description: "Output (hdmiout1~16, hdbtout1~16, all)"
      - name: state
        type: enum
        values: [on, off]

  - id: set_cec_power_delay
    label: Set CEC Power Off Delay
    kind: action
    command: "SET AUTOCEC_D out{N} {prm}"
    response: "AUTOCEC_D out{N} {prm}"
    params:
      - name: output
        type: string
        description: "Output identifier"
      - name: delay
        type: integer
        description: "Delay in minutes (0~30, default 2). 0 = immediate power off on no signal"

  - id: set_hdcp
    label: Set Input HDCP On/Off
    kind: action
    command: "SET HDCP_S in{N} {prm}"
    response: "HDCP_S in{N} {prm}"
    params:
      - name: input
        type: string
        description: "Input (in1~in16, all)"
      - name: state
        type: enum
        values: [on, off]

  - id: set_edid
    label: Set Input EDID
    kind: action
    command: "SET EDID in{N} {prm}"
    response: "EDID in{N} {prm}"
    params:
      - name: input
        type: string
        description: "Input (in1~in16, all)"
      - name: edid_code
        type: integer
        description: "EDID parameter code (0~31, see EDID table)"

  - id: set_ir_callback
    label: Set IR Callback On/Off
    kind: action
    command: "SET IRBACK_FN {prm}"
    response: "IRBACK_FN {prm}"
    params:
      - name: state
        type: enum
        values: [on, off]

  - id: set_long_reach
    label: Set Long Reach Cable Mode
    kind: action
    command: "SET LR_FN hdbtall {prm}"
    response: "LR_FN hdbtall {prm}"
    params:
      - name: state
        type: enum
        values: [on, off]

  - id: set_ir_syscode
    label: Set IR System Codes
    kind: action
    command: "SET IR_SYSCODE {prm}"
    response: "IR_SYSCODE {prm}"
    params:
      - name: code
        type: enum
        values: ["00", "4E", all]
        description: "00 = standard, 4E = alternate, all = respond to both"

  - id: set_switching_mode
    label: Set Matrix Switching Mode
    kind: action
    command: "SET SW_M {prm}"
    response: "SW_M {prm}"
    params:
      - name: mode
        type: enum
        values: [normal, quick]
        description: "Adjusts switching time between input selection and display"

  - id: set_zone_lock
    label: Set AVR Priority Mode for Output
    kind: action
    command: "SET ZONE_LOCK out{N} {prm}"
    response: "ZONE_LOCK out{N} {prm}"
    params:
      - name: output
        type: string
        description: "Output (hdmiout1~16, hdbtout1~16, all)"
      - name: state
        type: enum
        values: [on, off]

  - id: set_zone_source_access
    label: Set Source Zone Lockout
    kind: action
    command: "SET ZONE_R out{N} {prm}"
    response: "ZONE_R out{N} {prm}"
    params:
      - name: output
        type: string
        description: "Output (out1~16, all)"
      - name: bitmask
        type: string
        description: "Hex bitmask for accessible sources (see Source Zone Lockout Parameter Table)"

  - id: reboot
    label: Reboot Matrix
    kind: action
    command: "REBOOT {prm}"
    response: "REBOOT {prm}"
    params:
      - name: target
        type: string
        description: "all, mainboard, ledboard, card1~card16"

  - id: factory_reset
    label: Restore Factory Defaults
    kind: action
    command: "RESET"
    response: "RESET"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: video_mapping
    label: Video Input Mapping
    type: string
    command: "GET MP out{N}"
    query_command: "GET MP out{N}"
    response: "MP in{N} out{N}"
    description: "Returns which input is routed to specified output"

  - id: audio_switch_mode
    label: Audio Switch Mode
    type: enum
    values: [on, off]
    command: "GET AUDIOSW_M {prm}"
    query_command: "GET AUDIOSW_M {prm}"
    response: "AUDIOSW_M {prm}"

  - id: audio_mapping
    label: Audio Input Mapping
    type: string
    command: "GET AUDIOMP out{N}"
    query_command: "GET AUDIOMP out{N}"
    response: "AUDIOMP in{N} out{N}"

  - id: volume_gain
    label: Output Gain Level
    type: integer
    command: "GET VOLGAIN_DATA aout{N}"
    query_command: "GET VOLGAIN_DATA aout{N}"
    response: "VOLGAIN_DATA aout{N} {prm}"
    description: "Current gain in dB"

  - id: mute_state
    label: Audio Mute State
    type: enum
    values: [on, off]
    command: "GET MUTE aout{N}"
    query_command: "GET MUTE aout{N}"
    response: "MUTE aout{N} {prm}"

  - id: volume_gain_fixed
    label: Audio Output Fixed/Variable Setting
    type: enum
    values: [on, off]
    command: "GET VOLGAIN_FIX aout{N}"
    query_command: "GET VOLGAIN_FIX aout{N}"
    response: "VOLGAIN_FIX aout{N} {prm}"

  - id: mute_method
    label: Mute Attenuation Method
    type: enum
    values: [cut, ramp]
    command: "GET MUTE_M aout{N}"
    query_command: "GET MUTE_M aout{N}"
    response: "MUTE_M aout{N} {prm}"

  - id: volume_step
    label: Volume Step Size
    type: enum
    values: ["2", "4", "8"]
    command: "GET VOLGAIN_STEP aout{N}"
    query_command: "GET VOLGAIN_STEP aout{N}"
    response: "VOLGAIN_STEP aout{N} {prm}"

  - id: cec_power_status
    label: CEC Power Status
    type: enum
    values: [on, off]
    command: "GET CEC_PWR out{N}"
    query_command: "GET CEC_PWR out{N}"
    response: "CEC_PWR out{N} {prm}"

  - id: cec_power_delay
    label: CEC Power Delay
    type: integer
    command: "GET AUTOCEC_D out{N}"
    query_command: "GET AUTOCEC_D out{N}"
    response: "AUTOCEC_D out{N} {prm}"
    description: "Delay in minutes (0~30)"

  - id: hdcp_status
    label: Input HDCP Status
    type: enum
    values: [on, off]
    command: "GET HDCP_S in{N}"
    query_command: "GET HDCP_S in{N}"
    response: "HDCP_S in{N} {prm}"

  - id: edid_dip
    label: EDID Dip Switch Status
    type: integer
    command: "GET EDID_DIP"
    query_command: "GET EDID_DIP"
    response: "EDID_DIP {prm}"
    description: "Value 0~15"

  - id: edid_all_inputs
    label: All Inputs EDID Status
    type: string
    command: "GET EDID all"
    query_command: "GET EDID all"
    response: "EDID in{N} {prm} (one per input)"

  - id: ir_callback_status
    label: IR Callback Status
    type: enum
    values: [on, off]
    command: "GET IRBACK_FN"
    query_command: "GET IRBACK_FN"
    response: "IRBACK_FN {prm}"

  - id: long_reach_status
    label: Long Reach Mode Status
    type: enum
    values: [on, off]
    command: "GET LR_FN hdbtall"
    query_command: "GET LR_FN hdbtall"
    response: "LR_FN hdbtall {prm}"

  - id: ir_syscode
    label: IR System Codes
    type: string
    command: "GET IR_SYSCODE"
    query_command: "GET IR_SYSCODE"
    response: "IR_SYSCODE {prm}"

  - id: switching_mode
    label: Matrix Switching Mode
    type: enum
    values: [normal, quick]
    command: "GET SW_M"
    query_command: "GET SW_M"
    response: "SW_M {prm}"

  - id: zone_lock_status
    label: AVR Priority Mode Status
    type: enum
    values: [on, off]
    command: "GET ZONE_LOCK out{N}"
    query_command: "GET ZONE_LOCK out{N}"
    response: "ZONE_LOCK out{N} {prm}"

  - id: zone_source_access
    label: Source Zone Access
    type: string
    command: "GET ZONE_R out{N}"
    query_command: "GET ZONE_R out{N}"
    response: "ZONE_R out{N} {prm}"
    description: "Hex bitmask of accessible sources"

  - id: input_cable_status
    label: Input Cable Connection Status
    type: enum
    values: [connected, "not connected"]
    command: "GET CABLEC_IN in{N}"
    query_command: "GET CABLEC_IN in{N}"

  - id: output_cable_status
    label: Output Cable Connection Status
    type: enum
    values: [connected, "not connected"]
    command: "GET CABLEC_IN hdmiout{N}|hdbtout{N}"
    query_command: "GET CABLEC_IN hdmiout{N}|hdbtout{N}"

  - id: hdbt_input_link_quality
    label: HDBaseT Input Link Quality
    type: integer
    command: "GET HDBTL_IN hdbtin{N}"
    query_command: "GET HDBTL_IN hdbtin{N}"
    response: "HDBTL_IN hdbtin{N} {prm}"
    description: "Link quality 1~10 or 'no link'"

  - id: hdbt_output_link_quality
    label: HDBaseT Output Link Quality
    type: integer
    command: "GET HDBTL_OUT hdbtout{N}"
    query_command: "GET HDBTL_OUT hdbtout{N}"
    response: "HDBTL_OUT hdbtout{N} {prm}"
    description: "Link quality 1~10 or 'no link'"

  - id: card_connection
    label: Card Connection Status
    type: enum
    values: [connected, "not connected"]
    command: "GET CARD_C slot{N}"
    query_command: "GET CARD_C slot{N}"
    response: "CARD_C slot{N} {prm}"

  - id: card_type
    label: Card Type
    type: enum
    values: [hdmi, hdbt]
    command: "GET CARD_T slot{N}"
    query_command: "GET CARD_T slot{N}"
    response: "CARD_T slot{N} {prm}"

  - id: card_communication
    label: Card Communication with Motherboard
    type: enum
    values: [good, none]
    command: "GET CARD_COM slot{N}"
    query_command: "GET CARD_COM slot{N}"
    response: "CARD_COM slot{N} {prm}"

  - id: board_card_status
    label: Board/Card Status
    type: enum
    values: [good, none]
    command: "GET CARD_S {prm}"
    query_command: "GET CARD_S {prm}"
    response: "CARD_S {prm} {prm2}"
    description: "prm = mainboard, card1~card16, all"

  - id: fan_status
    label: Fan Status
    type: enum
    values: [working, unworking]
    command: "GET FANS fan{N}"
    query_command: "GET FANS fan{N}"
    response: "FANS fan{N} {prm}"
    description: "fan1~fan4, all"
```

## Variables
```yaml
variables:
  - id: edid_parameter
    label: EDID Parameter Code
    type: integer
    values:
      - code: 0
        label: "Copy from output # (0~15)"
      - code: 16
        label: "Fix 1080P 2ch"
      - code: 17
        label: "Fix 1080P 5.1"
      - code: 18
        label: "Fix 1080P 7.1"
      - code: 19
        label: "Fix 4K@30 2ch 8bit"
      - code: 20
        label: "Fix 4K@30 5.1"
      - code: 21
        label: "Fix 4K@30 7.1"
      - code: 22
        label: "Fix 4K@30 2ch HDR"
      - code: 23
        label: "Fix 4K@30 5.1ch HDR"
      - code: 24
        label: "Fix 4K@30 7.1ch HDR"
      - code: 25
        label: "Fix 4K@60 2ch"
      - code: 26
        label: "Fix 4K@60 5.1"
      - code: 27
        label: "Fix 4K@60 7.1"
      - code: 28
        label: "Fix 1920x1200 2ch"
      - code: 29
        label: "Fix 1920x1200 no audio"
      - code: 30
        label: "Smart EDID"
      - code: 31
        label: "EDID Write"
    description: "EDID configuration parameter lookup table"

  - id: zone_lockout_bitmask
    label: Source Zone Lockout Bitmask
    type: string
    description: "Hex bitmask controlling which sources a zone can access. Each bit maps to an input (In1=0001, In2=0002, etc.)"
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
  - reboot
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- All commands are ASCII, case sensitive, terminated with `<CR><LF>`.
- Default IP address: 192.168.11.143.
- EDID control requires rear panel dipswitches set to Front Panel/Web UI/API mode (0000).
- Volume gain range differs by firmware version: older FW uses -10~10 dB (default 0), newer FW uses -80~0 dB in 2 dB steps.
- Remote device control over HDBaseT uses a binary command format with header `05 55 55 57` followed by card slot, baud rate, parity, command length, and device command bytes.
- Volume step configuration (VOLGAIN_STEP), volume increment/decrement (VOLGAIN_INC/DEC), fixed/variable gain (VOLGAIN_FIX), and mute method (MUTE_M) require 10x10 FW v1.3+ or 16x16 FW v1.4+.
- Audio scene save/recall (PRESET_A) requires 10x10 FW v1.3+ or 16x16 FW v1.4+.

<!-- UNRESOLVED: exact differences between H2X and H2XC models not documented -->
<!-- UNRESOLVED: maximum concurrent connection count for TCP not stated -->
<!-- UNRESOLVED: command response timing / timeout behavior not documented -->

## Provenance

```yaml
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-05-22T21:02:16.398Z
last_checked_at: 2026-10-07T13:12:01.311Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:12:01.311Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 action units match source commands, transport (port 23, 57600 8N1) supported, spec covers full source catalogue; auth honestly UNRESOLVED. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "H2XC-specific differences from H2X not documented in source"
- "no unsolicited event/notification protocol described in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures found in source"
- "exact differences between H2X and H2XC models not documented"
- "maximum concurrent connection count for TCP not stated"
- "command response timing / timeout behavior not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
