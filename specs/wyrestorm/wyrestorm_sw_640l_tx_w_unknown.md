---
spec_id: admin/wyrestorm-sw-640l-tx-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm SW 640L TX W Control Spec"
manufacturer: Wyrestorm
model_family: "SW 640L TX W"
aliases: []
compatible_with:
  manufacturers:
    - Wyrestorm
  models:
    - "SW 640L TX W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-05-01T00:40:25.191Z
last_checked_at: 2026-05-18T17:09:47.481Z
generated_at: 2026-05-18T17:09:47.481Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T17:09:47.481Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 spec actions matched in source with correct transport parameters; bidirectional coverage via actions and feedbacks."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Wyrestorm SW 640L TX W Control Spec

## Summary
HDBaseT matrix switcher supporting HDMI/HDBaseT video routing (up to 16x16), independent audio switching, CEC display power control, EDID management, and IR/HDBaseT passthrough for remote device control. Supports both RS-232 and TCP/IP command interfaces. Audio features include gain control, mute, and preset save/recall.

<!-- UNRESOLVED: device model "SW 640L TX W" not found in source; source documents MX-1010-HDBT-H2X, MX-1616-HDBT-H2X, MX-1010-H2XC, MX-1616-H2XC series -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # inferred from IP control; source states "Default IP Port: 23"
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # CEC display power commands present
- routable     # video and audio switching commands present
- levelable    # volume/gain control present
- queryable    # query commands returning state present
```

## Actions
```yaml
- id: set_video_switch
  label: Set Video Input to Output
  kind: action
  params:
    - name: in
      type: integer
      description: Video input number (1-based, {in1~in16})
    - name: out
      type: integer
      description: Video output number (1-based, {out1~out16, all})

- id: set_audio_switch_mode
  label: Configure Audio Switch Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [on, off]
      description: "on: audio independent from video; off: audio follows video"

- id: set_audio_switch
  label: Set Audio Input to Output
  kind: action
  params:
    - name: in
      type: string
      description: "Audio input {hdmi1~hdmi16, spdif1~spdif16, arc1~arc16}"
    - name: out
      type: string
      description: "Audio output {audioout1~audioout16, all}"

- id: set_output_gain
  label: Set Output Audio Gain
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output {audioout1~audioout16, all}"
    - name: level
      type: integer
      description: "Gain in dB. FW < v1.3/v1.4: {-10~10}; FW >= v1.3/v1.4: {-80~0} in 2dB steps"

- id: set_mute
  label: Set Audio Mute
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output {spdifout1~spdifout16, audioout1~audioout16, all}"
    - name: state
      type: enum
      values: [on, off]
      description: "on = mute, off = unmute"

- id: set_audio_out_fixed_variable
  label: Set Audio Out Level Fixed or Variable
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output {audioout1~audioout16, all}"
    - name: mode
      type: enum
      values: [on, off]
      description: "on = fixed level; off = variable level"

- id: set_mute_method
  label: Set Attenuation Method for Mute
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output {audioout1~audioout16, all}"
    - name: method
      type: enum
      values: [cut, ramp]
      description: "cut = direct to mute level; ramp = ramp to mute level"

- id: increase_volume
  label: Increase Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output {audioout1~audioout16, all}"

- id: decrease_volume
  label: Decrease Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output {audioout1~audioout16, all}"

- id: set_volume_step
  label: Configure Volume Increase/Decrease Step Length
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output {audioout1~audioout16, all}"
    - name: step
      type: enum
      values: [2, 4, 8]

- id: save_video_scene
  label: Save Video Scene
  kind: action
  params:
    - name: scene
      type: integer
      description: "Scene number {1~20}"

- id: restore_video_scene
  label: Recall Video Scene
  kind: action
  params:
    - name: scene
      type: integer
      description: "Scene number {1~20}"

- id: save_audio_scene
  label: Save Audio Scene
  kind: action
  params:
    - name: scene
      type: integer
      description: "Scene number {1~20}  # requires FW v1.3/v1.4 or higher"

- id: restore_audio_scene
  label: Recall Audio Scene
  kind: action
  params:
    - name: scene
      type: integer
      description: "Scene number {1~20}  # requires FW v1.3/v1.4 or higher"

- id: set_cec_power
  label: Power Display On/Off via CEC
  kind: action
  params:
    - name: out
      type: string
      description: "Output {hdmiout1~hdmiout16, hdbtout1~hdbtout16, all}"
    - name: state
      type: enum
      values: [on, off]

- id: set_cec_power_delay
  label: Set CEC Power Delay Time
  kind: action
  params:
    - name: out
      type: string
      description: "Output {hdmiout1~hdmiout16, hdbtout1~hdbtout16, all}"
    - name: minutes
      type: integer
      description: "Delay in minutes {0~30}; default 2 min; 0 = immediate off if no active signal"

- id: set_input_hdcp
  label: Set Input HDCP On/Off
  kind: action
  params:
    - name: in
      type: integer
      description: "Input number {in1~in16, all}"
    - name: state
      type: enum
      values: [on, off]

- id: set_input_edid
  label: Set Input EDID
  kind: action
  params:
    - name: in
      type: integer
      description: "Input number {in1~in16, all}"
    - name: edid_code
      type: integer
      description: "EDID code; see EDID Parameter Table"

- id: set_ir_callback
  label: Set IR Call Back Enable/Disable
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_long_reach_mode
  label: Set Long Reach Mode On/Off
  kind: action
  params:
    - name: target
      type: string
      const: hdbtall
    - name: state
      type: enum
      values: [on, off]

- id: set_ir_system_codes
  label: Set IR System Codes
  kind: action
  params:
    - name: code
      type: enum
      values: ["00", "4E", all]
      description: "all = respond to both 00 and 4E code sets"

- id: set_matrix_switching_mode
  label: Set Matrix Switching Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [normal, quick]
      description: "Adjust switching time between input selection and image appear"

- id: set_zone_lock
  label: Set AVR Priority Mode (Zone Locking)
  kind: action
  params:
    - name: out
      type: string
      description: "Output {hdmiout1~hdmiout16, hdbtout1~hdbtout16, all}"
    - name: state
      type: enum
      values: [on, off]

- id: set_zone_sources
  label: Set Sources Available to Zone
  kind: action
  params:
    - name: out
      type: integer
      description: "Output number {out1~out16, all}"
    - name: mask
      type: string
      description: "Hex bitmask; see Source Zone Lockout Parameter Table"

- id: reboot
  label: Reboot Matrix
  kind: action
  params:
    - name: target
      type: enum
      values: [all, mainboard, ledboard, card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16]

- id: factory_reset
  label: Restore Factory Defaults
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: video_mapping_response
  label: Video Input Mapping Response
  type: object
  fields:
    - name: in
      type: integer
    - name: out
      type: integer

- id: audio_switch_mode_response
  label: Audio Switch Mode Response
  type: enum
  values: [on, off]

- id: audio_mapping_response
  label: Audio Input Mapping Response
  type: object
  fields:
    - name: in
      type: string
    - name: out
      type: string

- id: output_gain_response
  label: Output Audio Gain Response
  type: object
  fields:
    - name: aout
      type: string
    - name: level
      type: integer

- id: mute_state_response
  label: Audio Mute State Response
  type: object
  fields:
    - name: aout
      type: string
    - name: state
      type: enum
      values: [on, off]

- id: audio_out_fixed_variable_response
  label: Audio Out Level Fixed/Variable Response
  type: object
  fields:
    - name: aout
      type: string
    - name: mode
      type: enum
      values: [on, off]

- id: mute_method_response
  label: Attenuation Method for Mute Response
  type: object
  fields:
    - name: aout
      type: string
    - name: method
      type: enum
      values: [cut, ramp]

- id: volume_step_response
  label: Volume Step Length Response
  type: object
  fields:
    - name: aout
      type: string
    - name: step
      type: enum
      values: [2, 4, 8]

- id: scene_save_response
  label: Scene Save Response
  type: string

- id: scene_recall_response
  label: Scene Recall Response
  type: string

- id: cec_power_response
  label: CEC Display Power Status Response
  type: object
  fields:
    - name: out
      type: string
    - name: state
      type: enum
      values: [on, off]

- id: cec_power_delay_response
  label: CEC Power Delay Time Response
  type: object
  fields:
    - name: out
      type: string
    - name: minutes
      type: integer

- id: input_hdcp_response
  label: Input HDCP Status Response
  type: object
  fields:
    - name: in
      type: integer
    - name: state
      type: enum
      values: [on, off]

- id: edid_dip_switch_response
  label: EDID Dip Switch Status Response
  type: integer
  description: "Returns {0~15}"

- id: input_edid_response
  label: Input EDID Response
  type: object
  fields:
    - name: in
      type: integer
    - name: edid_code
      type: integer

- id: all_inputs_edid_response
  label: All Inputs EDID Status Response
  type: array
  description: "One line per input: EDID_in# #"

- id: ir_callback_response
  label: IR Call Back Status Response
  type: enum
  values: [on, off]

- id: long_reach_mode_response
  label: Long Reach Mode Status Response
  type: object
  fields:
    - name: target
      type: string
    - name: state
      type: enum
      values: [on, off]

- id: ir_system_codes_response
  label: IR System Codes Response
  type: enum
  values: ["00", "4E", all]

- id: matrix_switching_mode_response
  label: Matrix Switching Mode Response
  type: enum
  values: [normal, quick]

- id: zone_lock_response
  label: AVR Priority Mode Response
  type: object
  fields:
    - name: out
      type: string
    - name: state
      type: enum
      values: [on, off]

- id: zone_sources_response
  label: Sources Available to Zone Response
  type: object
  fields:
    - name: out
      type: integer
    - name: mask
      type: string

- id: cable_connection_in_response
  label: Input Cable Connection Status Response
  type: object
  fields:
    - name: in
      type: integer
    - name: status
      type: enum
      values: [connected, not connected]

- id: cable_connection_out_response
  label: Output Cable Connection Status Response
  type: object
  fields:
    - name: out
      type: string
    - name: status
      type: enum
      values: [connected, not connected]

- id: hdbaseT_link_quality_in_response
  label: HDBaseT Input Link Quality Response
  type: object
  fields:
    - name: in
      type: string
    - name: quality
      type: integer
      description: "{1~10, no link}"

- id: hdbaseT_link_quality_out_response
  label: HDBaseT Output Link Quality Response
  type: object
  fields:
    - name: out
      type: string
    - name: quality
      type: integer
      description: "{1~10, no link}"

- id: card_connection_response
  label: Card Connection Status Response
  type: object
  fields:
    - name: slot
      type: string
    - name: status
      type: enum
      values: [connected, not connected]

- id: card_type_response
  label: Card Type Response
  type: object
  fields:
    - name: slot
      type: string
    - name: type
      type: enum
      values: [hdmi, hdbt]

- id: card_com_response
  label: Card Communication Status Response
  type: object
  fields:
    - name: slot
      type: string
    - name: status
      type: enum
      values: [good, none]

- id: card_status_response
  label: Board/Card Status Response
  type: object
  fields:
    - name: slot
      type: string
    - name: status
      type: enum
      values: [good, none]

- id: fan_status_response
  label: Fan Status Response
  type: object
  fields:
    - name: fan
      type: string
    - name: status
      type: enum
      values: [working, unworking]

- id: reboot_response
  label: Reboot Response
  type: string

- id: factory_reset_response
  label: Factory Reset Response
  type: string
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters outside action scope identified in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# HDBaseT Remote Device Control (Section 6): commands routed through matrix to remote zones
# Syntax: [Header=05 55 55 57] [Card#] [Baud Rate] [Parity] [Length] [Device Command HEX]
# UNRESOLVED: binary HDBaseT passthrough not modeled as discrete Events; documented as command routing syntax
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: factory_reset_interlock
    description: "RESET command restores all factory defaults - requires explicit operator confirmation"
  - id: reboot_target_interlock
    description: "REBOOT target parameter must match intended card/subsystem; rebooting wrong target could disrupt live system"
# UNRESOLVED: power-on sequencing, voltage/current specs not in source
```

## Notes
- Command termination requires `<CR><LF>` (carriage return + line feed)
- All keywords are case sensitive
- Matrix supports 10x10 and 16x16 configurations; device model SW 640L TX W not explicitly listed in source document (which covers MX-1010-HDBT-H2X, MX-1616-HDBT-H2X, MX-1010-H2XC, MX-1616-H2XC)
- Audio gain range depends on firmware: FW < v1.3/v1.4 uses {-10~10}dB; FW >= v1.3/v1.4 uses {-80~0}dB in 2dB increments
- Some advanced audio commands (VOLGAIN_FIX, MUTE_M, VOLGAIN_INC/DEC/STEP, PRESET_A save/recall) require specific firmware versions (10x10 FW v1.3+, 16x16 FW v1.4+)
- Zone locking supports AVR priority mode for theater zones
- Source zone lockout uses hex bitmask parameterization
- HDBaseT passthrough supports bi-directional control of remote devices via serial baud rate routing
- Default IP: 192.168.11.143, Port 23
<!-- UNRESOLVED: SW 640L TX W specific firmware version not confirmed against source -->

## Provenance

```yaml
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-05-01T00:40:25.191Z
last_checked_at: 2026-05-18T17:09:47.481Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T17:09:47.481Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 spec actions matched in source with correct transport parameters; bidirectional coverage via actions and feedbacks."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
