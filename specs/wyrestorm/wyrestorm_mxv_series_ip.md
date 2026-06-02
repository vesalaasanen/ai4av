---
spec_id: admin/wyrestorm-mxv-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm MXV Series Control Spec"
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
retrieved_at: 2026-06-02T22:16:18.423Z
last_checked_at: 2026-06-02T22:16:18.423Z
generated_at: 2026-06-02T22:16:18.423Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Web UI and front-panel control are mentioned but not documented in the API source; authentication/login procedure not described"
  - "no persistent variable parameters (outside of actions/feedbacks above) found in source"
  - "no unsolicited notification/event messages documented in source"
  - "no explicit multi-step macros described in source"
  - "web UI and front-panel control interfaces are referenced but not documented in the API source"
  - "no documented error responses or NACK format found in source"
  - "H2XC models may have feature differences from H2X models; source does not enumerate per-model differences beyond firmware version thresholds"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:16:18.423Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Wyrestorm MXV Series Control Spec

## Summary

The Wyrestorm MXV Series (H2X/H2XC) are HDMI/HDBaseT matrix switchers available in 10x10 and 16x16 configurations. This spec covers the ASCII-based API for control via RS-232 serial and TCP/IP (Telnet), including video/audio routing, volume control, EQ, CEC display power, EDID management, HDCP, diagnostics, and remote device passthrough over HDBaseT. Commands are case-sensitive ASCII strings terminated with `<CR><LF>`.

<!-- UNRESOLVED: Web UI and front-panel control are mentioned but not documented in the API source; authentication/login procedure not described -->

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
- routable    # inferred from routing command examples (video and audio switching)
- queryable   # inferred from query command examples (GET commands throughout)
- powerable   # inferred from CEC display power on/off commands
- levelable   # inferred from volume gain, mute, and EQ commands
```

## Actions

```yaml
- id: switch_video_input
  label: Switch Video Input to Output
  kind: action
  params:
    - name: input
      type: string
      description: "Video input port, e.g. in1~in16"
    - name: output
      type: string
      description: "Video output port, e.g. out1~out16 or all"
  command: "SET SW{input} {output}<CR><LF>"
  response: "SW{input#} {output#}<CR><LF>"

- id: switch_audio_mode
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
    - name: level
      type: integer
      description: "FW <v1.3/v1.4: -10~10 dB; FW >=v1.3/v1.4: -80~0 in 2dB increments"
  command: "SET VOLGAIN_DATA{aout} {level}<CR><LF>"
  response: "VOLGAIN_DATA{aout} {level}<CR><LF>"

- id: mute_audio
  label: Mute/Unmute Audio Output
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output, e.g. spdifout1~spdifout16, audioout1~audioout16, or all"
    - name: state
      type: enum
      values: [on, off]
      description: "on = mute; off = unmute"
  command: "SET MUTE{aout} {state}<CR><LF>"
  response: "MUTE{aout} {state}<CR><LF>"

- id: set_volume_gain_fixed
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
      description: "cut = immediate; ramp = ramp to mute level"
  command: "SET MUTE_M{aout} {method}<CR><LF>"
  response: "MUTE_M{aout} {method}<CR><LF>"

- id: increase_volume
  label: Increase Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
  command: "SET VOLGAIN_INC{aout}<CR><LF>"
  response: "VOLGAIN_INC{aout} {level}<CR><LF>"
  notes: "Default step is 2dB. Requires FW v1.3/v1.4+"

- id: decrease_volume
  label: Decrease Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
  command: "SET VOLGAIN_DEC{aout}<CR><LF>"
  response: "VOLGAIN_DEC{aout} {level}<CR><LF>"
  notes: "Default step is 2dB. Requires FW v1.3/v1.4+"

- id: set_volume_step
  label: Configure Volume Step Length
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
      description: "on = enable; off = bypass"
  command: "SET EQ_FN{aout} {state}<CR><LF>"
  response: "EQ_FN{aout} {state}<CR><LF>"

- id: set_eq_level
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
      description: "Gain in dB: -10~10"
  command: "SET AUDIO_EQ{aout} {freq} {gain}<CR><LF>"
  response: "AUDIO_EQ{aout} {freq} {gain}<CR><LF>"

- id: save_video_scene
  label: Save Video Scene
  kind: action
  params:
    - name: preset
      type: integer
      description: "Scene number 1~20"
  command: "SAVE PRESET_V{preset}<CR><LF>"
  response: "PRESET_V{preset}<CR><LF>"

- id: recall_video_scene
  label: Recall Video Scene
  kind: action
  params:
    - name: preset
      type: integer
      description: "Scene number 1~20"
  command: "RESTORE PRESET_V{preset}<CR><LF>"
  response: "PRESET_V{preset}<CR><LF>"

- id: save_audio_scene
  label: Save Audio Scene
  kind: action
  params:
    - name: preset
      type: integer
      description: "Scene number 1~20"
  command: "SAVE PRESET_A{preset}<CR><LF>"
  response: "PRESET_A{preset}<CR><LF>"
  notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

- id: recall_audio_scene
  label: Recall Audio Scene
  kind: action
  params:
    - name: preset
      type: integer
      description: "Scene number 1~20"
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
  label: Set CEC Auto Power-Off Delay
  kind: action
  params:
    - name: output
      type: string
      description: "HDBaseT output port identifier"
    - name: delay_min
      type: integer
      description: "Delay in minutes 0~30; 0 = immediate power off on no signal"
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
      description: "EDID code 0~31; see EDID Parameter Table in source"
  command: "SET EDID{input} {edid_code}<CR><LF>"
  response: "EDID{input} {edid_code}<CR><LF>"
  notes: "Requires rear panel dipswitches set to Front Panel/Web UI/API EDID control (0000)"

- id: set_ir_callback
  label: Set IR Callback Enable/Disable
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  command: "SET IRBACK_FN{state}<CR><LF>"
  response: "IRBACK_FN{state}<CR><LF>"

- id: set_long_reach_mode
  label: Set Long Reach Mode
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

- id: set_ir_syscode
  label: Set IR System Codes
  kind: action
  params:
    - name: code
      type: enum
      values: ["00", "4E", "all"]
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

- id: set_avr_priority
  label: Set AVR Priority Mode (Theater Zone Locking)
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

- id: set_source_zone_lockout
  label: Select Sources a Zone Can Access
  kind: action
  params:
    - name: output
      type: string
      description: "out1~16 or all"
    - name: mask
      type: string
      description: "Hex mask per Source Zone Lockout Parameter Table (e.g. FFFF = all 16x16)"
  command: "SET ZONE_R{output} {mask}<CR><LF>"
  response: "ZONE_R{output} {mask}<CR><LF>"

- id: reboot_matrix
  label: Reboot Matrix Component
  kind: action
  params:
    - name: target
      type: string
      description: "all, mainboard, ledboard, card1~card16"
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

- id: audio_switch_mode
  label: Query Audio Switch Mode
  type: enum
  values: [on, off]
  command: "GET AUDIOSW_M<CR><LF>"
  response: "AUDIOSW_M {mode}<CR><LF>"

- id: audio_input_mapping
  label: Query Audio Input Mapping
  type: string
  command: "GET AUDIOMP{output}<CR><LF>"
  response: "AUDIOMP{input} {output}<CR><LF>"

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

- id: volume_gain_fixed_state
  label: Query Audio Output Level Fixed/Variable Setting
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

- id: volume_step_length
  label: Query Volume Step Length
  type: integer
  command: "GET VOLGAIN_STEP{aout}<CR><LF>"
  response: "VOLGAIN_STEP{aout} {step}<CR><LF>"

- id: audio_delay_time
  label: Query Audio Output Delay Time
  type: integer
  command: "GET AUDIO_D{aout}<CR><LF>"
  response: "AUDIO_D{aout} {delay_ms}<CR><LF>"

- id: eq_function_state
  label: Query EQ Function Status
  type: enum
  values: [on, off]
  command: "GET EQ_FN{aout}<CR><LF>"
  response: "EQ_FN{aout} {state}<CR><LF>"

- id: eq_level
  label: Query Audio EQ Level
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

- id: hdcp_status
  label: Query Input HDCP Status
  type: enum
  values: [on, off]
  command: "GET HDCP_S{input}<CR><LF>"
  response: "HDCP_S{input} {state}<CR><LF>"

- id: edid_dip_switch
  label: Query EDID Dip Switch Status
  type: integer
  command: "GET EDID_DIP<CR><LF>"
  response: "EDID_DIP{value}<CR><LF>"
  notes: "value range 0~15"

- id: all_inputs_edid
  label: Query All Inputs EDID Status
  type: string
  command: "GET EDID all<CR><LF>"
  response: "EDID{in} {code}<CR> per input, last line terminated <CR><LF>"

- id: ir_callback_status
  label: Query IR Callback Status
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

- id: ir_syscode_status
  label: Query IR System Codes
  type: string
  command: "GET IR_SYSCODE<CR><LF>"
  response: "IR_SYSCODE{code}<CR><LF>"

- id: switching_mode_status
  label: Query Matrix Switching Mode
  type: enum
  values: [normal, quick]
  command: "GET SW_M<CR><LF>"
  response: "SW_M{mode}<CR><LF>"

- id: avr_priority_status
  label: Query AVR Priority Mode Status
  type: enum
  values: [on, off]
  command: "GET ZONE_LOCK{output}<CR><LF>"
  response: "ZONE_LOCK{output} {state}<CR><LF>"

- id: source_zone_lockout
  label: Query Sources a Zone Can Access
  type: string
  command: "GET ZONE_R{output}<CR><LF>"
  response: "ZONE_R{output} {mask}<CR><LF>"

- id: input_cable_connection
  label: Query Input Cable Connection Status
  type: enum
  values: [connected, "not connected"]
  command: "GET CABLEC_IN{input}<CR><LF>"
  response: "CABLEC_IN{input} {status}<CR><LF>"

- id: output_cable_connection
  label: Query Output Cable Connection Status
  type: enum
  values: [connected, "not connected"]
  command: "GET CABLEC_IN{output}<CR><LF>"
  response: "CABLEC_IN{output} {status}<CR><LF>"

- id: hdbt_input_link_quality
  label: Query HDBaseT Input Link Quality
  type: string
  command: "GET HDBTL_IN{hdbtin}<CR><LF>"
  response: "HDBTL_IN{hdbtin} {quality}<CR><LF>"
  notes: "quality: 1~10 or 'no link'; value*10 = approximate %"

- id: hdbt_output_link_quality
  label: Query HDBaseT Output Link Quality
  type: string
  command: "GET HDBTL_OUT{hdbtout}<CR><LF>"
  response: "HDBTL_OUT{hdbtout} {quality}<CR><LF>"
  notes: "quality: 1~10 or 'no link'"

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
  label: Query Card Communication Status with Motherboard
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
  notes: "fan parameter: fan1~fan4 or all"
```

## Variables

```yaml
# UNRESOLVED: no persistent variable parameters (outside of actions/feedbacks above) found in source
```

## Events

```yaml
# UNRESOLVED: no unsolicited notification/event messages documented in source
```

## Macros

```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety

```yaml
confirmation_required_for:
  - restore_factory_defaults
  - reboot_matrix
interlocks: []
# Note: RESET (factory defaults) and REBOOT commands have no confirmation prompt in the protocol itself;
# control system implementers should confirm before sending these commands.
```

## Notes

- All commands are ASCII, case-sensitive, terminated with `<CR><LF>` (0x0D 0x0A).
- The default IP address is 192.168.11.143 and the default TCP port is 23 (Telnet). These are factory defaults; the operator may change them.
- RS-232 settings: 57600 baud, 8N1, no flow control. This is specific to the H2X/H2XC matrix's own control port.
- Some commands (volume step control, fixed/variable gain, audio scenes, mute ramp method, volume increment/decrement) require 10x10 Main Board FW v1.3 or 16x16 Main Board FW v1.4 or higher.
- Remote device control over HDBaseT (section 6) uses binary hex framing (header `05 55 55 57` + card slot byte + baud rate byte + parity byte + length byte + hex device command). This is a passthrough mechanism for controlling zone devices, not a matrix command itself.
- Source Zone Lockout uses a 4-digit hex bitmask where each bit represents one input; the source includes a full lookup table for standard configurations (odd, even, all, individual inputs).
- EDID codes 0–15 copy from output ports; codes 16–31 are fixed EDID profiles (1080p 2ch through Smart EDID/EDID Write); see EDID Parameter Table in source document.
- The `GET EDID all` response delivers one line per input terminated by `<CR>`, with the final line terminated by `<CR><LF>`.
- IR system code switching (00 vs 4E) requires the physical remote to be reprogrammed when 4E is selected.
- Long Reach mode (`LR_FN`) is intended for troubleshooting extended HDBaseT cable runs.
<!-- UNRESOLVED: web UI and front-panel control interfaces are referenced but not documented in the API source -->
<!-- UNRESOLVED: no documented error responses or NACK format found in source -->
<!-- UNRESOLVED: H2XC models may have feature differences from H2X models; source does not enumerate per-model differences beyond firmware version thresholds -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T22:16:18.423Z
last_checked_at: 2026-06-02T22:16:18.423Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:16:18.423Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Web UI and front-panel control are mentioned but not documented in the API source; authentication/login procedure not described"
- "no persistent variable parameters (outside of actions/feedbacks above) found in source"
- "no unsolicited notification/event messages documented in source"
- "no explicit multi-step macros described in source"
- "web UI and front-panel control interfaces are referenced but not documented in the API source"
- "no documented error responses or NACK format found in source"
- "H2XC models may have feature differences from H2X models; source does not enumerate per-model differences beyond firmware version thresholds"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
