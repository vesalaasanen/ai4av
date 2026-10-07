---
spec_id: admin/wyrestorm-mx-hdbt
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm MX-HDBT Control Spec"
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
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T13:32:02.921Z
last_checked_at: 2026-10-07T13:32:02.921Z
generated_at: 2026-10-07T13:32:02.921Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Some commands differ between firmware versions (10x10 FW v1.3 / 16x16 FW v1.4 and earlier vs. later). Firmware version compatibility ranges are not fully enumerated for all commands."
  - "no settable parameters outside of discrete actions found in source"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences explicitly described in source"
  - "No information on whether any commands produce unsolicited/async responses (e.g., hot-plug events, signal loss notifications)."
  - "Web UI referenced but no HTTP/REST API documented in this source."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:32:02.921Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 60 action units (29 actions, 31 query feedbacks) match source commands; transport verbatim in section 2.2. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Wyrestorm MX-HDBT Control Spec

## Summary

The Wyrestorm MX-HDBT (H2X/H2XC series) is a modular HDMI/HDBaseT matrix switcher available in 10x10 and 16x16 configurations. This spec covers the ASCII-based TCP/IP and RS-232 control API documented in the H2X/H2XC Matrix Switcher API v3.0 (October 2018). Commands are sent as ASCII strings terminated with `<CR><LF>` and cover video/audio routing, display power via CEC, EDID management, diagnostics, and remote device control over HDBaseT.

<!-- UNRESOLVED: Some commands differ between firmware versions (10x10 FW v1.3 / 16x16 FW v1.4 and earlier vs. later). Firmware version compatibility ranges are not fully enumerated for all commands. -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
  default_ip: 192.168.11.143
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
- routable    # inferred from video/audio switching command examples
- queryable   # inferred from query command examples throughout
- powerable   # inferred from CEC display power on/off commands
- levelable   # inferred from audio output gain/volume control commands
```

## Actions

```yaml
- id: switch_video_input
  label: Switch Video Input to Output
  kind: action
  params:
    - name: input
      type: string
      description: "Video input number, e.g. in1~in16"
    - name: output
      type: string
      description: "Video output number, e.g. out1~out16 or all"
  command: "SET SW{input} {output}<CR><LF>"
  response: "SW{input#} {output#}<CR><LF>"

- id: configure_audio_switch_mode
  label: Configure Audio Switch Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [on, off]
      description: "on = audio independent from video; off = audio follows video"
  command: "SET AUDIOSW_M {mode}<CR><LF>"
  response: "AUDIOSW_M {mode}<CR><LF>"

- id: switch_audio_input
  label: Switch Audio Input to Output
  kind: action
  params:
    - name: input
      type: string
      description: "Audio input, e.g. hdmi1~hdmi16, spdif1~spdif16, arc1~arc16"
    - name: output
      type: string
      description: "Audio output, e.g. audioout1~audioout16 or all"
  command: "SET AUDIOSW{input} {output}<CR><LF>"
  response: "AUDIOSW{input#} {output#}<CR><LF>"

- id: set_output_gain
  label: Set Output Gain Level
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output, e.g. audioout1~audioout16 or all"
    - name: gain
      type: integer
      description: "FW<v1.3/v1.4: -10 to 10 dB; FW>=v1.3/v1.4: -80 to 0 dB in 2dB steps"
  command: "SET VOLGAIN_DATA{aout} {gain}<CR><LF>"
  response: "VOLGAIN_DATA{aout} {gain}<CR><LF>"

- id: mute_audio
  label: Mute Audio Output
  kind: action
  params:
    - name: aout
      type: string
      description: "spdifout1~spdifout16, audioout1~audioout16, or all"
    - name: state
      type: enum
      values: [on, off]
      description: "on = mute; off = unmute"
  command: "SET MUTE{aout} {state}<CR><LF>"
  response: "MUTE{aout} {state}<CR><LF>"

- id: set_audio_level_fixed_variable
  label: Set Audio Output Level as Fixed or Variable
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
    - name: mode
      type: enum
      values: [on, off]
      description: "on = fixed; off = variable"
  command: "SET VOLGAIN_FIX{aout} {mode}<CR><LF>"
  response: "VOLGAIN_FIX{aout} {mode}<CR><LF>"
  notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

- id: set_mute_method
  label: Set Attenuation Method for Mute
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
    - name: method
      type: enum
      values: [cut, ramp]
      description: "cut = immediate; ramp = ramp down to mute level"
  command: "SET MUTE_M{aout} {method}<CR><LF>"
  response: "MUTE_M{aout} {method}<CR><LF>"

- id: volume_increase
  label: Increase Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
  command: "SET VOLGAIN_INC{aout}<CR><LF>"
  response: "VOLGAIN_INC{aout} {prm}<CR><LF>"
  notes: "prm in range -80~0; step size set by VOLGAIN_STEP"

- id: volume_decrease
  label: Decrease Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
  command: "SET VOLGAIN_DEC{aout}<CR><LF>"
  response: "VOLGAIN_DEC{aout} {prm}<CR><LF>"
  notes: "prm in range -80~0; step size set by VOLGAIN_STEP"

- id: set_volume_step
  label: Configure Volume Increase/Decrease Step Length
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
    - name: step
      type: enum
      values: [2, 4, 8]
      description: "Step size in dB"
  command: "SET VOLGAIN_STEP{aout} {step}<CR><LF>"
  response: "VOLGAIN_STEP{aout} {step}<CR><LF>"

- id: set_audio_delay
  label: Set Audio Output Delay Time
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
    - name: delay_ms
      type: integer
      description: "Delay in milliseconds, 0~500; 0 = no delay"
  command: "SET AUDIO_D{aout} {delay_ms}<CR><LF>"
  response: "AUDIO_D{aout} {delay_ms}<CR><LF>"

- id: enable_eq
  label: Enable/Disable EQ on Audio Output
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
    - name: state
      type: enum
      values: [on, off]
      description: "on = enabled; off = bypassed"
  command: "SET EQ_FN{aout} {state}<CR><LF>"
  response: "EQ_FN{aout} {state}<CR><LF>"

- id: set_audio_eq_level
  label: Set Audio Output EQ Level
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
    - name: freq
      type: integer
      description: "Frequency in Hz: 31, 62, 125, 250, 500, 2000, 4000, 8000, 16000"
    - name: gain
      type: integer
      description: "Gain in dB: -10 to 10"
  command: "SET AUDIO_EQ{aout} {freq} {gain}<CR><LF>"
  response: "AUDIO_EQ{aout} {freq} {gain}<CR><LF>"

- id: save_video_scene
  label: Save Video Scene (Preset)
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 1~20"
  command: "SAVE PRESET_V{preset}<CR><LF>"
  response: "PRESET_V{preset}<CR><LF>"

- id: recall_video_scene
  label: Recall Video Scene (Preset)
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 1~20"
  command: "RESTORE PRESET_V{preset}<CR><LF>"
  response: "PRESET_V{preset}<CR><LF>"

- id: save_audio_scene
  label: Save Audio Scene (Preset)
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 1~20"
  command: "SAVE PRESET_A{preset}<CR><LF>"
  response: "PRESET_A{preset}<CR><LF>"
  notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

- id: recall_audio_scene
  label: Recall Audio Scene (Preset)
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 1~20"
  command: "RESTORE PRESET_A{preset}<CR><LF>"
  response: "PRESET_A{preset}<CR><LF>"
  notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

- id: cec_power_display
  label: Power Display On/Off via CEC
  kind: action
  params:
    - name: output
      type: string
      description: "hdmiout1~hdmiout16, hdbtout1~hdbtout16, or all"
    - name: state
      type: enum
      values: [on, off]
  command: "SET CEC_PWR{output} {state}<CR><LF>"
  response: "CEC_PWR{output} {state}<CR><LF>"

- id: set_cec_power_delay
  label: Set CEC Power Delay Time
  kind: action
  params:
    - name: output
      type: string
      description: "hdbtN (HDBaseT output port)"
    - name: delay_min
      type: integer
      description: "Delay in minutes, 0~30; 0 = power off immediately on no signal"
  command: "SET AUTOCEC_D{output} {delay_min}<CR><LF>"
  response: "AUTOCEC_D{output} {delay_min}<CR><LF>"

- id: set_hdcp
  label: Set Input HDCP On/Off
  kind: action
  params:
    - name: input
      type: string
      description: "in1~in16 or all"
    - name: state
      type: enum
      values: [on, off]
  command: "SET HDCP_S{input} {state}<CR><LF>"
  response: "HDCP_S{input} {state}<CR><LF>"

- id: set_input_edid
  label: Set Input EDID
  kind: action
  params:
    - name: input
      type: string
      description: "in1~in16 or all"
    - name: edid_code
      type: integer
      description: "EDID parameter code; see EDID Parameter Table (00~31)"
  command: "SET EDID{input} {edid_code}<CR><LF>"
  response: "EDID{input} {edid_code}<CR><LF>"
  notes: "Requires rear panel dipswitches set to Front Panel/Web UI/API EDID Control (0000)"

- id: set_ir_callback
  label: Set IR Callback Control On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  command: "SET IRBACK_FN{state}<CR><LF>"
  response: "IRBACK_FN{state}<CR><LF>"

- id: set_long_reach_mode
  label: Set Long Reach HDBaseT Mode On/Off
  kind: action
  params:
    - name: target
      type: string
      description: "hdbtall"
    - name: state
      type: enum
      values: [on, off]
  command: "SET LR_FN{target} {state}<CR><LF>"
  response: "LR_FN{target} {state}<CR><LF>"

- id: set_ir_system_codes
  label: Set IR System Codes
  kind: action
  params:
    - name: code
      type: enum
      values: [00, 4E, all]
      description: "00 = standard; 4E = alternate; all = respond to both"
  command: "SET IR_SYSCODE{code}<CR><LF>"
  response: "IR_SYSCODE{code}<CR><LF>"

- id: set_switching_mode
  label: Set Matrix Switching Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [normal, quick]
  command: "SET SW_M{mode}<CR><LF>"
  response: "SW_M{mode}<CR><LF>"

- id: set_avr_priority_mode
  label: Set AVR Priority Mode for an Output
  kind: action
  params:
    - name: output
      type: string
      description: "hdmiout1~hdmiout16, hdbtout1~hdbtout16, or all"
    - name: state
      type: enum
      values: [on, off]
  command: "SET ZONE_LOCK{output} {state}<CR><LF>"
  response: "ZONE_LOCK{output} {state}<CR><LF>"

- id: set_zone_source_lockout
  label: Select Sources a Zone Can Access
  kind: action
  params:
    - name: output
      type: string
      description: "out1~16 or all"
    - name: mask
      type: string
      description: "4-char hex mask per Source Zone Lockout Parameter Table"
  command: "SET ZONE_R{output} {mask}<CR><LF>"
  response: "ZONE_R{output} {mask}<CR><LF>"

- id: reboot
  label: Reboot Matrix Component
  kind: action
  params:
    - name: target
      type: string
      description: "all, mainboard, ledboard, card1~card16"
  command: "REBOOT {target}<CR><LF>"
  response: "REBOOT {target}<CR><LF>"

- id: factory_reset
  label: Restore Factory Defaults
  kind: action
  params: []
  command: "RESET<CR><LF>"
  response: "RESET<CR><LF>"
```

## Feedbacks

```yaml
- id: video_input_mapping
  label: Query Video Input Mapping
  type: string
  command: "GET MP{output}<CR><LF>"
  query_command: "GET MP{output}<CR><LF>"
  response: "MP{input#} {output#}<CR><LF>"

- id: audio_switch_mode
  label: Query Audio Switch Mode
  type: enum
  values: [on, off]
  command: "GET AUDIOSW_M<CR><LF>"
  query_command: "GET AUDIOSW_M prm<CR><LF>"
  response: "AUDIOSW_M {prm}<CR><LF>"

- id: audio_input_mapping
  label: Query Audio Input Mapping
  type: string
  command: "GET AUDIOMP{output}<CR><LF>"
  query_command: "GET AUDIOMP{output}<CR><LF>"
  response: "AUDIOMP{input} {output}<CR><LF>"

- id: output_gain
  label: Query Current Output Gain
  type: integer
  command: "GET VOLGAIN_DATA{aout}<CR><LF>"
  query_command: "GET VOLGAIN_DATA{aout}<CR><LF>"
  response: "VOLGAIN_DATA{aout} {gain}<CR><LF>"

- id: audio_mute_state
  label: Query Current Audio Mute State
  type: enum
  values: [on, off]
  command: "GET MUTE{aout}<CR><LF>"
  query_command: "GET MUTE{aout}<CR><LF>"
  response: "MUTE{aout} {state}<CR><LF>"

- id: audio_level_fixed_variable
  label: Query Audio Output Level Setting
  type: enum
  values: [on, off]
  command: "GET VOLGAIN_FIX{aout}<CR><LF>"
  query_command: "GET VOLGAIN_FIX{aout} prm<CR><LF>"
  response: "VOLGAIN_FIX{aout} {mode}<CR><LF>"

- id: mute_method
  label: Query Output Mute Method
  type: enum
  values: [cut, ramp]
  command: "GET MUTE_M{aout}<CR><LF>"
  query_command: "GET MUTE_M{aout}<CR><LF>"
  response: "MUTE_M{aout} {method}<CR><LF>"

- id: volume_step
  label: Query Volume Step Length
  type: enum
  values: [2, 4, 8]
  command: "GET VOLGAIN_STEP{aout}<CR><LF>"
  query_command: "GET VOLGAIN_STEP{aout} prm<CR><LF>"
  response: "VOLGAIN_STEP{aout} {step}<CR><LF>"

- id: audio_delay
  label: Query Audio Output Delay Time
  type: integer
  command: "GET AUDIO_D{aout}<CR><LF>"
  query_command: "GET AUDIO_D{aout}<CR><LF>"
  response: "AUDIO_D{aout} {delay_ms}<CR><LF>"

- id: eq_function_status
  label: Query EQ Function Status
  type: enum
  values: [on, off]
  command: "GET EQ_FN{aout}<CR><LF>"
  query_command: "GET EQ_FN{aout}<CR><LF>"
  response: "EQ_FN{aout} {state}<CR><LF>"

- id: audio_eq_level
  label: Query Audio Output EQ Level
  type: string
  command: "GET AUDIO_EQ{aout} {freq}<CR><LF>"
  query_command: "GET AUDIO_EQ{aout} {freq}<CR><LF>"
  response: "AUDIO_EQ{aout} {freq} {gain}<CR><LF>"

- id: cec_power_status
  label: Query CEC Power Status
  type: enum
  values: [on, off]
  command: "GET CEC_PWR{output}<CR><LF>"
  query_command: "GET CEC_PWR{output}<CR><LF>"
  response: "CEC_PWR{output} {state}<CR><LF>"

- id: cec_power_delay
  label: Query CEC Power Delay Time
  type: integer
  command: "GET AUTOCEC_D{output}<CR><LF>"
  query_command: "GET AUTOCEC_D{output}<CR><LF>"
  response: "AUTOCEC_D{output} {delay_min}<CR><LF>"

- id: hdcp_status
  label: Query Input HDCP Status
  type: enum
  values: [on, off]
  command: "GET HDCP_S{input}<CR><LF>"
  query_command: "GET HDCP_S{input}<CR><LF>"
  response: "HDCP_S{input} {state}<CR><LF>"

- id: edid_dip_switch
  label: Query EDID Dip Switch Status
  type: integer
  command: "GET EDID_DIP<CR><LF>"
  query_command: "GET EDID_DIP<CR><LF>"
  response: "EDID_DIP{prm}<CR><LF>"
  notes: "prm = 0~15"

- id: all_inputs_edid
  label: Query All Inputs EDID Status
  type: string
  command: "GET EDID all<CR><LF>"
  query_command: "GET EDID all<CR><LF>"
  response: "EDID{in} {code}<CR> ... EDID{in16} {code}<CR><LF>"

- id: ir_callback_status
  label: Query IR Callback Status
  type: enum
  values: [on, off]
  command: "GET IRBACK_FN<CR><LF>"
  query_command: "GET IRBACK_FN <CR><LF>"
  response: "IRBACK_FN{state}<CR><LF>"

- id: long_reach_mode_status
  label: Query Long Reach Mode Status
  type: enum
  values: [on, off]
  command: "GET LR_FN{target}<CR><LF>"
  query_command: "GET LR_FN{target}<CR><LF>"
  response: "LR_FN{target} {state}<CR><LF>"

- id: ir_system_codes
  label: Query IR System Codes
  type: enum
  values: [00, 4E, all]
  command: "GET IR_SYSCODE<CR><LF>"
  query_command: "GET IR_SYSCODE <CR><LF>"
  response: "IR_SYSCODE{code}<CR><LF>"

- id: switching_mode
  label: Query Matrix Switching Mode
  type: enum
  values: [normal, quick]
  command: "GET SW_M<CR><LF>"
  query_command: "GET SW_M <CR><LF>"
  response: "SW_M{mode}<CR><LF>"

- id: avr_priority_mode
  label: Query AVR Priority Mode Status
  type: enum
  values: [on, off]
  command: "GET ZONE_LOCK{output}<CR><LF>"
  query_command: "GET ZONE_LOCK{output}<CR><LF>"
  response: "ZONE_LOCK{output} {state}<CR><LF>"

- id: zone_source_access
  label: Query Sources a Zone Can Access
  type: string
  command: "GET ZONE_R{output}<CR><LF>"
  query_command: "GET ZONE_R{output}<CR><LF>"
  response: "ZONE_R{output} {mask}<CR><LF>"

- id: input_cable_connection
  label: Query Input Cable Connection Status
  type: enum
  values: [connected, not connected]
  command: "GET CABLEC_IN{input}<CR><LF>"
  query_command: "GET CABLEC_IN{input}<CR><LF>"
  response: "CABLEC_IN{input} {status}<CR><LF>"

- id: output_cable_connection
  label: Query Output Cable Connection Status
  type: enum
  values: [connected, not connected]
  command: "GET CABLEC_IN{output}<CR><LF>"
  query_command: "GET CABLEC_IN{output}<CR><LF>"
  response: "CABLEC_IN{output} {status}<CR><LF>"

- id: hdbt_input_link_quality
  label: Query HDBaseT Input Link Quality
  type: integer
  command: "GET HDBTL_IN{input}<CR><LF>"
  query_command: "GET HDBTL_IN{input}<CR><LF>"
  response: "HDBTL_IN{input} {quality}<CR><LF>"
  notes: "quality = 1~10 or 'no link'"

- id: hdbt_output_link_quality
  label: Query HDBaseT Output Link Quality
  type: integer
  command: "GET HDBTL_OUT{output}<CR><LF>"
  query_command: "GET HDBTL_OUT{output}<CR><LF>"
  response: "HDBTL_OUT{output} {quality}<CR><LF>"
  notes: "quality = 1~10 or 'no link'"

- id: card_connection_status
  label: Query Card Connection Status
  type: enum
  values: [connected, not connected]
  command: "GET CARD_C{slot}<CR><LF>"
  query_command: "GET CARD_C{slot}<CR><LF>"
  response: "CARD_C{slot} {status}<CR><LF>"

- id: card_type
  label: Query Card Type
  type: enum
  values: [hdmi, hdbt]
  command: "GET CARD_T{slot}<CR><LF>"
  query_command: "GET CARD_T{slot}<CR><LF>"
  response: "CARD_T{slot} {type}<CR><LF>"

- id: card_communication_status
  label: Query Card Communication Status With Motherboard
  type: enum
  values: [good, none]
  command: "GET CARD_COM{slot}<CR><LF>"
  query_command: "GET CARD_COM{slot}<CR><LF>"
  response: "CARD_COM{slot} {status}<CR><LF>"

- id: card_board_status
  label: Query Board/Card Status
  type: enum
  values: [good, none]
  command: "GET CARD_S{slot}<CR><LF>"
  query_command: "GET CARD_S{slot}<CR><LF>"
  response: "CARD_S{slot} {status}<CR><LF>"

- id: fan_status
  label: Query Fan Status
  type: enum
  values: [working, unworking]
  command: "GET FANS{fan}<CR><LF>"
  query_command: "GET FANS{fan}<CR><LF>"
  response: "FANS{fan} {status}<CR><LF>"
  notes: "fan = fan1~fan4 or all"
```

## Variables

```yaml
# UNRESOLVED: no settable parameters outside of discrete actions found in source
```

## Events

```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety

```yaml
confirmation_required_for:
  - factory_reset
  - reboot
interlocks: []
# Note: RESET restores factory defaults with no prompt; REBOOT affects live switching.
# No explicit safety interlocks described in source.
```

## Notes

- All commands are ASCII, case-sensitive, terminated with `<CR><LF>`.
- Default IP address is 192.168.11.143, default TCP port is 23 (Telnet).
- Serial settings: 57600 baud, 8 data bits, no parity, 1 stop bit, no flow control.
- Several audio volume/EQ commands differ between firmware versions: 10x10 FW below v1.3 / 16x16 FW below v1.4 use gain range -10~10 dB; v1.3+/v1.4+ use -80~0 dB in 2 dB increments.
- Commands requiring FW v1.3+/v1.4+ include: VOLGAIN_FIX, MUTE_M, VOLGAIN_INC, VOLGAIN_DEC, VOLGAIN_STEP, PRESET_A (audio scenes).
- HDBaseT remote device control (Section 6) uses a binary header syntax (`05 55 55 57`) and is not covered as discrete actions here; refer to source document sections 6.1–6.4 for card slot, baud rate, parity, and command length HEX tables.
- Source Zone Lockout parameters use 4-character hex masks (e.g., FFFF = all 16x16, 03FF = all 10x10). Refer to the Source Zone Lockout Parameter Table in the source doc for per-input codes.
- EDID parameter codes 00~15 copy from a connected output; 16~31 set fixed EDID profiles. Requires rear panel dipswitches set to Front Panel/Web UI/API EDID Control (0000).
- The `GET CABLEC_IN` command is documented for both input and output cable status queries using the same command keyword (apparent doc inconsistency in source).

<!-- UNRESOLVED: No information on whether any commands produce unsolicited/async responses (e.g., hot-plug events, signal loss notifications). -->
<!-- UNRESOLVED: Web UI referenced but no HTTP/REST API documented in this source. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T13:32:02.921Z
last_checked_at: 2026-10-07T13:32:02.921Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:32:02.921Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 60 action units (29 actions, 31 query feedbacks) match source commands; transport verbatim in section 2.2. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Some commands differ between firmware versions (10x10 FW v1.3 / 16x16 FW v1.4 and earlier vs. later). Firmware version compatibility ranges are not fully enumerated for all commands."
- "no settable parameters outside of discrete actions found in source"
- "no unsolicited notification events documented in source"
- "no multi-step sequences explicitly described in source"
- "No information on whether any commands produce unsolicited/async responses (e.g., hot-plug events, signal loss notifications)."
- "Web UI referenced but no HTTP/REST API documented in this source."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
