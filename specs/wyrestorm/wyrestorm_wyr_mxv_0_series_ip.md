---
spec_id: admin/wyrestorm-wyr-mxv-0-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm WYR-MXV-0 Series Control Spec"
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
retrieved_at: 2026-05-17T00:43:30.390Z
last_checked_at: 2026-05-17T00:43:30.390Z
generated_at: 2026-05-17T00:43:30.390Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source Zone Lockout custom parameter strings require the H2X Source Lockout Command Calculator tool, not fully enumerable from source alone. HDBaseT remote device passthrough commands use binary/HEX framing distinct from ASCII matrix commands."
  - "no standalone settable variables beyond actions/feedbacks described above"
  - "source does not describe unsolicited notifications from the device"
  - "source does not describe multi-step macros"
  - "No web/REST API endpoints documented in this source. No authentication/session handling described. No firmware download URLs or version compatibility matrix fully enumerated."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-05-17T00:43:30.390Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched verbatim in source; all transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Wyrestorm WYR-MXV-0 Series Control Spec

## Summary

The Wyrestorm H2X/H2XC Matrix Switcher series (MX-1010-HDBT-H2X, MX-1616-HDBT-H2X, MX-1010-H2XC, MX-1616-H2XC) are HDMI/HDBaseT matrix switchers available in 10x10 and 16x16 configurations. This spec covers the ASCII TCP/IP (Telnet) and serial control API documented in API revision v3.0 (October 2018), including video/audio routing, volume control, EDID management, CEC power control, diagnostics, and remote HDBaseT device control.

<!-- UNRESOLVED: Source Zone Lockout custom parameter strings require the H2X Source Lockout Command Calculator tool, not fully enumerable from source alone. HDBaseT remote device passthrough commands use binary/HEX framing distinct from ASCII matrix commands. -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- routable    # inferred from video and audio switching command examples
- queryable   # inferred from extensive GET query command examples
- levelable   # inferred from volume gain and EQ control commands
- powerable   # inferred from CEC display power on/off commands
```

## Actions

```yaml
- id: switch_video_input
  label: Switch Video Input to Output
  kind: action
  params:
    - name: input
      type: string
      description: "Video input (in1~in16)"
    - name: output
      type: string
      description: "Video output (out1~out16, all)"
  command: "SET SW{input} {output}<CR><LF>"
  response: "SW{input#} {output#}<CR><LF>"

- id: set_audio_switch_mode
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
      description: "Audio input (hdmi1~hdmi16, spdif1~spdif16, arc1~arc16)"
    - name: output
      type: string
      description: "Audio output (audioout1~audioout16, all)"
  command: "SET AUDIOSW{input} {output}<CR><LF>"
  response: "AUDIOSW{input#} {output#}<CR><LF>"

- id: set_output_gain
  label: Set Output Gain Level
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
    - name: level
      type: integer
      description: "FW < v1.3/v1.4: -10 to 10 (dB); FW >= v1.3/v1.4: -80 to 0 (2dB increments)"
  command: "SET VOLGAIN_DATA{aout} {level}<CR><LF>"
  response: "VOLGAIN_DATA{aout} {level}<CR><LF>"

- id: mute_audio
  label: Mute Audio Output
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output (spdifout1~spdifout16, audioout1~audioout16, all)"
    - name: state
      type: enum
      values: [on, off]
      description: "on = mute; off = unmute"
  command: "SET MUTE{aout} {state}<CR><LF>"
  response: "MUTE{aout} {state}<CR><LF>"

- id: set_volume_gain_fix
  label: Set Audio Output Level as Fixed or Variable
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
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
      description: "Audio output (audioout1~audioout16, all)"
    - name: method
      type: enum
      values: [cut, ramp]
      description: "cut = immediate mute; ramp = ramp to mute level"
  command: "SET MUTE_M{aout} {method}<CR><LF>"
  response: "MUTE_M{aout} {method}<CR><LF>"

- id: volume_increase
  label: Increase Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
  command: "SET VOLGAIN_INC{aout}<CR><LF>"
  response: "VOLGAIN_INC{aout} {level}<CR><LF>"

- id: volume_decrease
  label: Decrease Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
  command: "SET VOLGAIN_DEC{aout}<CR><LF>"
  response: "VOLGAIN_DEC{aout} {level}<CR><LF>"

- id: set_volume_step
  label: Configure Step Length of Volume Increase/Decrease
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
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
      description: "Audio output (audioout1~audioout16, all)"
    - name: delay_ms
      type: integer
      description: "Delay in milliseconds (0~500); 0 = no delay"
  command: "SET AUDIO_D{aout} {delay_ms}<CR><LF>"
  response: "AUDIO_D{aout} {delay_ms}<CR><LF>"

- id: set_eq_enable
  label: Enable/Disable EQ on Audio Output
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
    - name: state
      type: enum
      values: [on, off]
      description: "on = enable; off = bypass"
  command: "SET EQ_FN{aout} {state}<CR><LF>"
  response: "EQ_FN{aout} {state}<CR><LF>"

- id: set_audio_eq_level
  label: Set Audio Output EQ Level
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
    - name: freq
      type: enum
      values: [31, 62, 125, 250, 500, 2000, 4000, 8000, 16000]
      description: "Frequency in Hz"
    - name: gain
      type: integer
      description: "Gain in dB (-10~10)"
  command: "SET AUDIO_EQ{aout} {freq} {gain}<CR><LF>"
  response: "AUDIO_EQ{aout} {freq} {gain}<CR><LF>"

- id: save_video_scene
  label: Save Video Scene
  kind: action
  params:
    - name: scene
      type: integer
      description: "Scene number (1~20)"
  command: "SAVE PRESET_V{scene}<CR><LF>"
  response: "PRESET_V{scene}<CR><LF>"

- id: recall_video_scene
  label: Recall Video Scene
  kind: action
  params:
    - name: scene
      type: integer
      description: "Scene number (1~20)"
  command: "RESTORE PRESET_V{scene}<CR><LF>"
  response: "PRESET_V{scene}<CR><LF>"

- id: save_audio_scene
  label: Save Audio Scene
  kind: action
  params:
    - name: scene
      type: integer
      description: "Scene number (1~20)"
  command: "SAVE PRESET_A{scene}<CR><LF>"
  response: "PRESET_A{scene}<CR><LF>"
  notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

- id: recall_audio_scene
  label: Recall Audio Scene
  kind: action
  params:
    - name: scene
      type: integer
      description: "Scene number (1~20)"
  command: "RESTORE PRESET_A{scene}<CR><LF>"
  response: "PRESET_A{scene}<CR><LF>"
  notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

- id: cec_power_display
  label: Power Display On/Off via CEC
  kind: action
  params:
    - name: output
      type: string
      description: "Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)"
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
      description: "Output port (e.g. hdbt5)"
    - name: delay_min
      type: integer
      description: "Delay in minutes (0~30); 0 = power off immediately on no signal"
  command: "SET AUTOCEC_D{output} {delay_min}<CR><LF>"
  response: "AUTOCEC_D{output} {delay_min}<CR><LF>"

- id: set_input_hdcp
  label: Set Input HDCP On/Off
  kind: action
  params:
    - name: input
      type: string
      description: "Input (in1~in16, all)"
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
      description: "Input (in1~in16, all)"
    - name: edid_code
      type: integer
      description: "EDID code (0~31); see EDID Parameter Table in source"
  command: "SET EDID{input} {edid_code}<CR><LF>"
  response: "EDID{input} {edid_code}<CR><LF>"
  notes: "Requires rear panel dipswitches set to Front Panel/Web UI/API EDID Control (0000)"

- id: set_ir_callback
  label: Set IR Call Back Control
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  command: "SET IRBACK_FN{state}<CR><LF>"
  response: "IRBACK_FN{state}<CR><LF>"

- id: set_long_reach_mode
  label: Set Long Reach Cable Mode
  kind: action
  params:
    - name: target
      type: string
      description: "Target (hdbtall)"
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
      values: ["00", "4E", all]
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
  label: Set AVR Priority Mode for Output
  kind: action
  params:
    - name: output
      type: string
      description: "Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)"
    - name: state
      type: enum
      values: [on, off]
  command: "SET ZONE_LOCK{output} {state}<CR><LF>"
  response: "ZONE_LOCK{output} {state}<CR><LF>"

- id: set_zone_source_access
  label: Select Sources a Zone Can Access
  kind: action
  params:
    - name: output
      type: string
      description: "Output (out1~16, all)"
    - name: lockout_param
      type: string
      description: "HEX parameter from Source Zone Lockout Parameter Table (e.g. FFFF for all 16x16)"
  command: "SET ZONE_R{output} {lockout_param}<CR><LF>"
  response: "ZONE_R{output} {lockout_param}<CR><LF>"

- id: reboot_matrix
  label: Reboot the Matrix
  kind: action
  params:
    - name: target
      type: string
      description: "Target (all, mainboard, ledboard, card1~card16)"
  command: "REBOOT {target}<CR><LF>"
  response: "REBOOT {target}<CR><LF>"

- id: restore_factory_defaults
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
  response: "MP{input#} {output#}<CR><LF>"
  description: "Returns current input mapped to specified output"

- id: audio_switch_mode
  label: Query Audio Switch Mode
  type: enum
  values: [on, off]
  command: "GET AUDIOSW_M<CR><LF>"
  response: "AUDIOSW_M {mode}<CR><LF>"

- id: audio_input_mapping
  label: Query Audio Input Mapping
  type: string
  command: "GET AUDIOMP{aout}<CR><LF>"
  response: "AUDIOMP{input} {aout}<CR><LF>"

- id: output_gain_level
  label: Query Current Output Gain
  type: integer
  command: "GET VOLGAIN_DATA{aout}<CR><LF>"
  response: "VOLGAIN_DATA{aout} {level}<CR><LF>"

- id: audio_mute_state
  label: Query Current Audio Mute State
  type: enum
  values: [on, off]
  command: "GET MUTE{aout}<CR><LF>"
  response: "MUTE{aout} {state}<CR><LF>"

- id: volume_gain_fix_state
  label: Query Audio Output Level Setting (Fixed/Variable)
  type: enum
  values: [on, off]
  command: "GET VOLGAIN_FIX{aout}<CR><LF>"
  response: "VOLGAIN_FIX{aout} {mode}<CR><LF>"

- id: mute_method_state
  label: Query Output Mute Method
  type: enum
  values: [cut, ramp]
  command: "GET MUTE_M{aout}<CR><LF>"
  response: "MUTE_M{aout} {method}<CR><LF>"

- id: volume_step
  label: Query Step Length of Volume Increase/Decrease
  type: enum
  values: [2, 4, 8]
  command: "GET VOLGAIN_STEP{aout}<CR><LF>"
  response: "VOLGAIN_STEP{aout} {step}<CR><LF>"

- id: audio_delay
  label: Query Audio Output Delay Time
  type: integer
  command: "GET AUDIO_D{aout}<CR><LF>"
  response: "AUDIO_D{aout} {delay_ms}<CR><LF>"

- id: eq_function_status
  label: Query EQ Function Status
  type: enum
  values: [on, off]
  command: "GET EQ_FN{aout}<CR><LF>"
  response: "EQ_FN{aout} {state}<CR><LF>"

- id: audio_eq_level
  label: Query Audio Output EQ Level
  type: string
  command: "GET AUDIO_EQ{aout} {freq}<CR><LF>"
  response: "AUDIO_EQ{aout} {freq} {gain}<CR><LF>"

- id: cec_power_status
  label: Query CEC Power Status
  type: enum
  values: [on, off]
  command: "GET CEC_PWR{output}<CR><LF>"
  response: "CEC_PWR{output} {state}<CR><LF>"

- id: cec_power_delay
  label: Query CEC Power Delay Time
  type: integer
  command: "GET AUTOCEC_D{output}<CR><LF>"
  response: "AUTOCEC_D{output} {delay_min}<CR><LF>"

- id: input_hdcp_status
  label: Query Input HDCP Status
  type: enum
  values: [on, off]
  command: "GET HDCP_S{input}<CR><LF>"
  response: "HDCP_S{input} {state}<CR><LF>"

- id: edid_dip_switch_status
  label: Query EDID Dip Switch Status
  type: integer
  command: "GET EDID_DIP<CR><LF>"
  response: "EDID_DIP{value}<CR><LF>"
  description: "Value range 0~15"

- id: all_inputs_edid_status
  label: Query All Inputs EDID Status
  type: string
  command: "GET EDID all<CR><LF>"
  response: "EDID{in} {code}<CR> per input, final line with <CR><LF>"

- id: ir_callback_status
  label: Query IR Call Back Status
  type: enum
  values: [on, off]
  command: "GET IRBACK_FN<CR><LF>"
  response: "IRBACK_FN{state}<CR><LF>"

- id: long_reach_mode_status
  label: Query Long Reach Mode Status
  type: enum
  values: [on, off]
  command: "GET LR_FN{target}<CR><LF>"
  response: "LR_FN{target} {state}<CR><LF>"

- id: ir_system_codes
  label: Query IR System Codes
  type: string
  command: "GET IR_SYSCODE<CR><LF>"
  response: "IR_SYSCODE{code}<CR><LF>"

- id: switching_mode
  label: Query Matrix Switching Mode
  type: enum
  values: [normal, quick]
  command: "GET SW_M<CR><LF>"
  response: "SW_M{mode}<CR><LF>"

- id: avr_priority_mode_status
  label: Query AVR Priority Mode Status
  type: enum
  values: [on, off]
  command: "GET ZONE_LOCK{output}<CR><LF>"
  response: "ZONE_LOCK{output} {state}<CR><LF>"

- id: zone_source_access
  label: Query Sources a Zone Can Access
  type: string
  command: "GET ZONE_R{output}<CR><LF>"
  response: "ZONE_R{output} {lockout_param}<CR><LF>"

- id: input_cable_connection_status
  label: Query Input Cable Connection Status
  type: enum
  values: [connected, "not connected"]
  command: "GET CABLEC_IN{input}<CR><LF>"
  response: "CABLEC_IN{input} {status}<CR><LF>"

- id: output_cable_connection_status
  label: Query Output Cable Connection Status
  type: enum
  values: [connected, "not connected"]
  command: "GET CABLEC_IN{output}<CR><LF>"
  response: "CABLEC_IN{output} {status}<CR><LF>"

- id: hdbtin_link_quality
  label: Query HDBaseT Input Link Quality
  type: string
  command: "GET HDBTL_IN{input}<CR><LF>"
  response: "HDBTL_IN{input} {quality}<CR><LF>"
  description: "Quality 1~10 or 'no link'"

- id: hdbtout_link_quality
  label: Query HDBaseT Output Link Quality
  type: string
  command: "GET HDBTL_OUT{output}<CR><LF>"
  response: "HDBTL_OUT{output} {quality}<CR><LF>"
  description: "Quality 1~10 or 'no link'"

- id: card_connection_status
  label: Query Card Connection Status
  type: enum
  values: [connected, "not connected"]
  command: "GET CARD_C{slot}<CR><LF>"
  response: "CARD_C{slot} {status}<CR><LF>"

- id: card_type
  label: Query Card Type
  type: enum
  values: [hdmi, hdbt]
  command: "GET CARD_T{slot}<CR><LF>"
  response: "CARD_T{slot} {type}<CR><LF>"

- id: card_communication_status
  label: Query Card Communication Status With Motherboard
  type: enum
  values: [good, none]
  command: "GET CARD_COM{slot}<CR><LF>"
  response: "CARD_COM{slot} {status}<CR><LF>"

- id: card_board_status
  label: Query Board/Card Status
  type: enum
  values: [good, none]
  command: "GET CARD_S{slot}<CR><LF>"
  response: "CARD_S{slot} {status}<CR><LF>"

- id: fan_status
  label: Query Fan Status
  type: enum
  values: [working, unworking]
  command: "GET FANS{fan}<CR><LF>"
  response: "FANS{fan} {status}<CR><LF>"
  description: "Fan target: fan1~fan4, all"
```

## Variables

```yaml
# UNRESOLVED: no standalone settable variables beyond actions/feedbacks described above
```

## Events

```yaml
# UNRESOLVED: source does not describe unsolicited notifications from the device
```

## Macros

```yaml
# UNRESOLVED: source does not describe multi-step macros
```

## Safety

```yaml
confirmation_required_for:
  - restore_factory_defaults
  - reboot_matrix
interlocks: []
# Note: RESET (factory defaults) and REBOOT are instantaneous with no confirmation prompt described in source.
# Operator should confirm before sending these commands in production environments.
```

## Notes

- Commands use ASCII text terminated with `<CR><LF>` (0x0D 0x0A). Keywords are case-sensitive.
- The default IP address is 192.168.11.143 and the default Telnet port is 23.
- Serial settings: 57600 baud, 8 data bits, no parity, 1 stop bit, no flow control.
- Several commands have firmware version requirements: 10x10 Main Board FW v1.3 or higher, or 16x16 Main Board FW v1.4 or higher. These include: Set/Query VOLGAIN_FIX, MUTE_M (method), VOLGAIN_INC/DEC/STEP, PRESET_A save/recall, and ZONE_LOCK/ZONE_R zone functions.
- Volume gain range differs by firmware: older FW uses -10 to 10 dB; newer FW uses -80 to 0 dB in 2 dB increments.
- Remote HDBaseT device control (Section 6) uses a binary framing protocol (HEX header 05 55 55 57) distinct from the main ASCII command set; this spec does not enumerate individual passthrough commands.
- EDID control requires rear panel dipswitches set to Front Panel/Web UI/API control mode (all dipswitch positions at 0000).
- Source Zone Lockout uses bitmask HEX parameters; custom configurations require the H2X Source Zone Lockout Command Calculator referenced in the source document.
- IR System Codes feature allows switching between standard (00) and 4E IR code sets; the physical remote must also be reprogrammed when 4E is selected.

<!-- UNRESOLVED: No web/REST API endpoints documented in this source. No authentication/session handling described. No firmware download URLs or version compatibility matrix fully enumerated. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-05-17T00:43:30.390Z
last_checked_at: 2026-05-17T00:43:30.390Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-17T00:43:30.390Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched verbatim in source; all transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source Zone Lockout custom parameter strings require the H2X Source Lockout Command Calculator tool, not fully enumerable from source alone. HDBaseT remote device passthrough commands use binary/HEX framing distinct from ASCII matrix commands."
- "no standalone settable variables beyond actions/feedbacks described above"
- "source does not describe unsolicited notifications from the device"
- "source does not describe multi-step macros"
- "No web/REST API endpoints documented in this source. No authentication/session handling described. No firmware download URLs or version compatibility matrix fully enumerated."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
