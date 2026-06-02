---
spec_id: admin/wyrestorm-wyr-mx-0-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm WYR-MX-0 Series Control Spec"
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
retrieved_at: 2026-05-17T00:37:27.528Z
last_checked_at: 2026-05-17T00:37:27.528Z
generated_at: 2026-05-17T00:37:27.528Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no persistent user-settable variables beyond those covered in Actions/Feedbacks"
  - "source does not describe unsolicited notifications from the device"
  - "no multi-step macro sequences described in source"
  - "HDBaseT remote control binary packet format fully documented in source (section 6) but not decomposed into structured Actions entries — operator should expand if binary tunneling control is required."
  - "Source mentions \"H2X Source Lockout Command Calculator\" for custom ZONE_R bitmask strings — tool not described in this document."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-05-17T00:37:27.528Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 actions matched literally in source; transport parameters verified; comprehensive coverage of ASCII command set. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Wyrestorm WYR-MX-0 Series Control Spec

## Summary

The Wyrestorm H2X/H2XC Matrix Switcher series (MX-1010-HDBT-H2X, MX-1616-HDBT-H2X, MX-1010-H2XC, MX-1616-H2XC) are HDMI/HDBaseT matrix switchers with 10x10 and 16x16 configurations. This spec covers RS-232 serial and TCP/IP (Telnet) control using ASCII commands with CR+LF termination. The API supports video/audio routing, volume control, EDID management, CEC display power, HDCP configuration, scene save/recall, and diagnostics.

## Transport

```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- routable    # inferred from video/audio switching command examples
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
      description: "Input number, e.g. in1~in16"
    - name: output
      type: string
      description: "Output number or 'all', e.g. out1~out16, all"
  command: "SET SW{input} {output}<CR><LF>"
  response: "SW{input#} {output#}<CR><LF>"
  example_send: "SET SWin2 out6<CR><LF>"
  example_response: "SWin2 out6<CR><LF>"

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
      description: "Audio input: hdmi1~hdmi16, spdif1~spdif16, arc1~arc16"
    - name: output
      type: string
      description: "Audio output: audioout1~audioout16, all"
  command: "SET AUDIOSW{input} {output}<CR><LF>"
  response: "AUDIOSW{input#} {output#}<CR><LF>"

- id: set_output_gain
  label: Set Output Gain Level
  kind: action
  params:
    - name: output
      type: string
      description: "Audio output: audioout1~audioout16, all"
    - name: level
      type: integer
      description: "Gain in dB; FW<v1.3/v1.4: -10~10; FW>=v1.3/v1.4: -80~0 in 2dB increments"
  command: "SET VOLGAIN_DATA{output} {level}<CR><LF>"
  response: "VOLGAIN_DATA{output} {level}<CR><LF>"

- id: mute_audio
  label: Mute Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: "Audio output: spdifout1~spdifout16, audioout1~audioout16, all"
    - name: state
      type: enum
      values: [on, off]
      description: "on = mute; off = unmute"
  command: "SET MUTE{output} {state}<CR><LF>"
  response: "MUTE{output} {state}<CR><LF>"

- id: set_volume_fixed
  label: Set Audio Out Level as Fixed or Variable
  kind: action
  params:
    - name: output
      type: string
      description: "Audio output: audioout1~audioout16, all"
    - name: mode
      type: enum
      values: [on, off]
      description: "on = fixed; off = variable"
  command: "SET VOLGAIN_FIX{output} {mode}<CR><LF>"
  response: "VOLGAIN_FIX{output} {mode}<CR><LF>"
  notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

- id: set_mute_method
  label: Set Attenuation Method for Mute
  kind: action
  params:
    - name: output
      type: string
      description: "Audio output: audioout1~audioout16, all"
    - name: method
      type: enum
      values: [cut, ramp]
      description: "cut = immediate; ramp = gradual"
  command: "SET MUTE_M{output} {method}<CR><LF>"
  response: "MUTE_M{output} {method}<CR><LF>"

- id: volume_increase
  label: Increase Volume Output Level
  kind: action
  params:
    - name: output
      type: string
      description: "Audio output: audioout1~audioout16, all"
  command: "SET VOLGAIN_INC{output}<CR><LF>"
  response: "VOLGAIN_INC{output} {level}<CR><LF>"

- id: volume_decrease
  label: Decrease Volume Output Level
  kind: action
  params:
    - name: output
      type: string
      description: "Audio output: audioout1~audioout16, all"
  command: "SET VOLGAIN_DEC{output}<CR><LF>"
  response: "VOLGAIN_DEC{output} {level}<CR><LF>"

- id: set_volume_step
  label: Configure Volume Increase/Decrease Step Length
  kind: action
  params:
    - name: output
      type: string
      description: "Audio output: audioout1~audioout16, all"
    - name: step
      type: enum
      values: [2, 4, 8]
      description: "Step size in dB"
  command: "SET VOLGAIN_STEP{output} {step}<CR><LF>"
  response: "VOLGAIN_STEP{output} {step}<CR><LF>"

- id: set_audio_delay
  label: Set Audio Output Delay Time
  kind: action
  params:
    - name: output
      type: string
      description: "Audio output: audioout1~audioout16, all"
    - name: delay_ms
      type: integer
      description: "Delay in milliseconds (0~500); 0 = no delay"
  command: "SET AUDIO_D{output} {delay_ms}<CR><LF>"
  response: "AUDIO_D{output} {delay_ms}<CR><LF>"

- id: enable_eq
  label: Enable EQ on Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: "Audio output: audioout1~audioout16, all"
    - name: state
      type: enum
      values: [on, off]
      description: "on = enabled; off = bypassed"
  command: "SET EQ_FN{output} {state}<CR><LF>"
  response: "EQ_FN{output} {state}<CR><LF>"

- id: set_audio_eq_level
  label: Set Audio Output EQ Level
  kind: action
  params:
    - name: output
      type: string
      description: "Audio output: audioout1~audioout16, all"
    - name: frequency
      type: enum
      values: [31, 62, 125, 250, 500, 2000, 4000, 8000, 16000]
      description: "Frequency in Hz"
    - name: gain
      type: integer
      description: "Gain in dB (-10~10)"
  command: "SET AUDIO_EQ{output} {frequency} {gain}<CR><LF>"
  response: "AUDIO_EQ{output} {frequency} {gain}<CR><LF>"

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

- id: power_display
  label: Power Display On/Off via CEC
  kind: action
  params:
    - name: output
      type: string
      description: "Output: hdmiout1~hdmiout16, hdbtout1~hdbtout16, all"
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
      description: "Output port identifier"
    - name: delay_minutes
      type: integer
      description: "Delay in minutes (0~30); 0 = power off immediately on signal loss"
  command: "SET AUTOCEC_D{output} {delay_minutes}<CR><LF>"
  response: "AUTOCEC_D{output} {delay_minutes}<CR><LF>"

- id: set_hdcp
  label: Set Input HDCP On/Off
  kind: action
  params:
    - name: input
      type: string
      description: "Input: in1~in16, all"
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
      description: "Input: in1~in16, all"
    - name: edid_code
      type: integer
      description: "EDID code per EDID Parameter Table (0~31)"
  command: "SET EDID{input} {edid_code}<CR><LF>"
  response: "EDID{input} {edid_code}<CR><LF>"
  notes: "Requires rear panel dipswitches set to Front Panel/Web UI/API EDID Control {0000}"

- id: set_ir_callback
  label: Set IR Call Back Control
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  command: "SET IRBACK_FN {state}<CR><LF>"
  response: "IRBACK_FN {state}<CR><LF>"

- id: set_long_reach_mode
  label: Set Long Reach Cable Mode
  kind: action
  params:
    - name: target
      type: string
      description: "Always 'hdbtall'"
    - name: state
      type: enum
      values: [on, off]
  command: "SET LR_FN{target} {state}<CR><LF>"
  response: "LR_FN{target} {state}<CR><LF>"

- id: set_ir_system_codes
  label: Set IR System Codes
  kind: action
  params:
    - name: code_set
      type: enum
      values: ["00", "4E", all]
      description: "00 = standard; 4E = alternate; all = respond to both"
  command: "SET IR_SYSCODE{code_set}<CR><LF>"
  response: "IR_SYSCODE{code_set}<CR><LF>"

- id: set_switching_mode
  label: Set Matrix Switching Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [normal, quick]
  command: "SET SW_M {mode}<CR><LF>"
  response: "SW_M {mode}<CR><LF>"

- id: set_avr_priority_mode
  label: Set AVR Priority Mode for Output
  kind: action
  params:
    - name: output
      type: string
      description: "Output: hdmiout1~hdmiout16, hdbtout1~hdbtout16, all"
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
      description: "Output zone: out1~16, all"
    - name: lockout_mask
      type: string
      description: "Hex bitmask per Source Zone Lockout Parameter Table"
  command: "SET ZONE_R{output} {lockout_mask}<CR><LF>"
  response: "ZONE_R{output} {lockout_mask}<CR><LF>"

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
  response: "MP{input#} {output#}<CR><LF>"
  params:
    - name: output
      type: string
      description: "Output: out1~out16, all"

- id: audio_switch_mode
  label: Audio Switch Mode State
  type: enum
  values: [on, off]
  command: "GET AUDIOSW_M<CR><LF>"
  response: "AUDIOSW_M {mode}<CR><LF>"

- id: audio_input_mapping
  label: Audio Input Mapping
  type: string
  command: "GET AUDIOMP{output}<CR><LF>"
  response: "AUDIOMP{input} {output}<CR><LF>"

- id: output_gain_level
  label: Current Output Gain Level
  type: integer
  command: "GET VOLGAIN_DATA{output}<CR><LF>"
  response: "VOLGAIN_DATA{output} {level}<CR><LF>"

- id: audio_mute_state
  label: Current Audio Mute State
  type: enum
  values: [on, off]
  command: "GET MUTE{output}<CR><LF>"
  response: "MUTE{output} {state}<CR><LF>"

- id: volume_fixed_state
  label: Audio Out Level Fixed/Variable Setting
  type: enum
  values: [on, off]
  command: "GET VOLGAIN_FIX{output}<CR><LF>"
  response: "VOLGAIN_FIX{output} {mode}<CR><LF>"

- id: mute_method_state
  label: Output Mute Method
  type: enum
  values: [cut, ramp]
  command: "GET MUTE_M{output}<CR><LF>"
  response: "MUTE_M{output} {method}<CR><LF>"

- id: volume_step_length
  label: Volume Step Length
  type: enum
  values: [2, 4, 8]
  command: "GET VOLGAIN_STEP{output}<CR><LF>"
  response: "VOLGAIN_STEP{output} {step}<CR><LF>"

- id: audio_delay_time
  label: Audio Output Delay Time
  type: integer
  command: "GET AUDIO_D{output}<CR><LF>"
  response: "AUDIO_D{output} {delay_ms}<CR><LF>"

- id: eq_function_status
  label: EQ Function Status
  type: enum
  values: [on, off]
  command: "GET EQ_FN{output}<CR><LF>"
  response: "EQ_FN{output} {state}<CR><LF>"

- id: audio_eq_level
  label: Audio Output EQ Level
  type: string
  command: "GET AUDIO_EQ{output} {frequency}<CR><LF>"
  response: "AUDIO_EQ{output} {frequency} {gain}<CR><LF>"

- id: cec_power_status
  label: CEC Power Status
  type: enum
  values: [on, off]
  command: "GET CEC_PWR{output}<CR><LF>"
  response: "CEC_PWR{output} {state}<CR><LF>"

- id: cec_power_delay
  label: CEC Power Delay Time
  type: integer
  command: "GET AUTOCEC_D{output}<CR><LF>"
  response: "AUTOCEC_D{output} {delay_minutes}<CR><LF>"

- id: hdcp_status
  label: Input HDCP Status
  type: enum
  values: [on, off]
  command: "GET HDCP_S{input}<CR><LF>"
  response: "HDCP_S{input} {state}<CR><LF>"

- id: edid_dip_switch_status
  label: EDID Dip Switch Status
  type: integer
  command: "GET EDID_DIP<CR><LF>"
  response: "EDID_DIP {value}<CR><LF>"

- id: all_inputs_edid
  label: Query All Inputs EDID Status
  type: string
  command: "GET EDID all<CR><LF>"
  response: "EDID{in1} {code}<CR>...<CR><LF>"

- id: ir_callback_status
  label: IR Call Back Status
  type: enum
  values: [on, off]
  command: "GET IRBACK_FN<CR><LF>"
  response: "IRBACK_FN {state}<CR><LF>"

- id: long_reach_mode_status
  label: Long Reach Mode Status
  type: enum
  values: [on, off]
  command: "GET LR_FN{target}<CR><LF>"
  response: "LR_FN{target} {state}<CR><LF>"

- id: ir_system_codes_status
  label: IR System Codes
  type: string
  command: "GET IR_SYSCODE<CR><LF>"
  response: "IR_SYSCODE {code_set}<CR><LF>"

- id: switching_mode_status
  label: Matrix Switching Mode
  type: enum
  values: [normal, quick]
  command: "GET SW_M<CR><LF>"
  response: "SW_M {mode}<CR><LF>"

- id: avr_priority_mode_status
  label: AVR Priority Mode Status
  type: enum
  values: [on, off]
  command: "GET ZONE_LOCK{output}<CR><LF>"
  response: "ZONE_LOCK{output} {state}<CR><LF>"

- id: source_zone_lockout_status
  label: Sources a Zone Can Access
  type: string
  command: "GET ZONE_R{output}<CR><LF>"
  response: "ZONE_R{output} {lockout_mask}<CR><LF>"

- id: input_cable_connection
  label: Input Cable Connection Status
  type: enum
  values: [connected, not connected]
  command: "GET CABLEC_IN{input}<CR><LF>"
  response: "CABLEC_IN{input} {status}<CR><LF>"

- id: output_cable_connection
  label: Output Cable Connection Status
  type: enum
  values: [connected, not connected]
  command: "GET CABLEC_IN{output}<CR><LF>"
  response: "CABLEC_IN{output} {status}<CR><LF>"

- id: hdbtin_link_quality
  label: HDBaseT Input Link Quality
  type: integer
  command: "GET HDBTL_IN{input}<CR><LF>"
  response: "HDBTL_IN{input} {quality}<CR><LF>"
  notes: "quality = 1~10 or 'no link'; value represents 10% increments"

- id: hdbtout_link_quality
  label: HDBaseT Output Link Quality
  type: integer
  command: "GET HDBTL_OUT{output}<CR><LF>"
  response: "HDBTL_OUT{output} {quality}<CR><LF>"

- id: card_connection_status
  label: Card Connection Status
  type: enum
  values: [connected, not connected]
  command: "GET CARD_C{slot}<CR><LF>"
  response: "CARD_C{slot} {status}<CR><LF>"

- id: card_type
  label: Card Type
  type: enum
  values: [hdmi, hdbt]
  command: "GET CARD_T{slot}<CR><LF>"
  response: "CARD_T{slot} {type}<CR><LF>"

- id: card_communication_status
  label: Card Communication Status with Motherboard
  type: enum
  values: [good, none]
  command: "GET CARD_COM{slot}<CR><LF>"
  response: "CARD_COM{slot} {status}<CR><LF>"

- id: card_health_status
  label: Board/Card Health Status
  type: enum
  values: [good, none]
  command: "GET CARD_S{slot}<CR><LF>"
  response: "CARD_S{slot} {status}<CR><LF>"

- id: fan_status
  label: Fan Status
  type: enum
  values: [working, unworking]
  command: "GET FANS{fan}<CR><LF>"
  response: "FANS{fan} {status}<CR><LF>"
  notes: "fan = fan1~fan4, all"
```

## Variables

```yaml
# UNRESOLVED: no persistent user-settable variables beyond those covered in Actions/Feedbacks
```

## Events

```yaml
# UNRESOLVED: source does not describe unsolicited notifications from the device
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
# factory_reset (RESET command) and reboot (REBOOT command) are irreversible operations;
# confirmation is recommended before sending. No interlock procedures stated in source.
```

## Notes

- Commands are ASCII, keywords are case-sensitive, and every command must be terminated with CR+LF (`<CR><LF>`).
- The matrix supports both RS-232 (57600 8N1) and TCP/IP Telnet on port 23 (default IP 192.168.11.143).
- Several commands behave differently depending on firmware version: 10x10 Main Board FW v1.3 or 16x16 Main Board FW v1.4 introduces the -80~0 dB gain range (in 2 dB increments) and audio scene presets, replacing the earlier -10~10 dB range.
- Remote device control via HDBaseT uses a binary packet format (header `05 55 55 57` + card slot byte + baud-rate byte + parity byte + command length byte + device command bytes in HEX). This is distinct from the ASCII matrix control commands.
- The EDID Parameter Table (codes 0~31) covers copy-from-output, fixed resolution presets, and Smart EDID modes. EDID control via API requires rear-panel dipswitches set to `0000`.
- Source Zone Lockout uses a 4-hex-digit bitmask; a calculator tool (H2X Source Lockout Command Calculator) is referenced for custom configurations.
- The `REBOOT` command accepts targets: `all`, `mainboard`, `ledboard`, `card1`~`card16`.
- Audio delay range is 0~500 ms; the source mentions a "default wait time of 2 minutes" in the CEC power delay context, not the audio delay context.
- AVR Priority Mode (ZONE_LOCK) is described as "Theater Zone Locking" for zones with an AVR connected.
- Long Reach mode (LR_FN) extends HDBaseT cable reach and should only be used when problems occur on longer runs.
- IR System Codes support `00`, `4E`, or `all`; when using 4E, the included remote must be reconfigured to send 4E commands.

<!-- UNRESOLVED: HDBaseT remote control binary packet format fully documented in source (section 6) but not decomposed into structured Actions entries — operator should expand if binary tunneling control is required. -->
<!-- UNRESOLVED: Source mentions "H2X Source Lockout Command Calculator" for custom ZONE_R bitmask strings — tool not described in this document. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-05-17T00:37:27.528Z
last_checked_at: 2026-05-17T00:37:27.528Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-17T00:37:27.528Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 actions matched literally in source; transport parameters verified; comprehensive coverage of ASCII command set. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no persistent user-settable variables beyond those covered in Actions/Feedbacks"
- "source does not describe unsolicited notifications from the device"
- "no multi-step macro sequences described in source"
- "HDBaseT remote control binary packet format fully documented in source (section 6) but not decomposed into structured Actions entries — operator should expand if binary tunneling control is required."
- "Source mentions \"H2X Source Lockout Command Calculator\" for custom ZONE_R bitmask strings — tool not described in this document."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
