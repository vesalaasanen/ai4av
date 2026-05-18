---
spec_id: admin/wyrestorm-av-switcher
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
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-05-01T00:40:25.191Z
last_checked_at: 2026-05-17T00:49:41.265Z
generated_at: 2026-05-17T00:49:41.265Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-17T00:49:41.265Z
  matched_actions: 60
  action_count: 60
  confidence: high
  summary: "All 60 spec actions matched with exact command mnemonics in source; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Wyrestorm H2X/H2XC Matrix Switcher Control Spec

## Summary

The Wyrestorm H2X/H2XC Matrix Switcher series (MX-1010-HDBT-H2X, MX-1616-HDBT-H2X, MX-1010-H2XC, MX-1616-H2XC) are HDMI/HDBaseT matrix switchers available in 10x10 and 16x16 configurations. Control is provided via RS-232 serial and TCP/IP (Telnet on port 23) using ASCII command strings terminated with CR+LF. This spec covers video/audio routing, volume control, EQ, EDID/HDCP management, scene save/recall, CEC display power, diagnostic queries, and remote device control over HDBaseT.

<!-- UNRESOLVED: exact firmware version compatibility per command is complex — some commands (audio volume range, scene audio presets, fixed/variable level, mute method, volume step) require 10x10 FW v1.3 or 16x16 FW v1.4 or higher; behavior differs on older firmware. -->

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
- queryable   # inferred from query command examples throughout the doc
- levelable   # inferred from volume gain, mute, and EQ control commands
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
      description: "Video input identifier, e.g. in1~in16"
    - name: output
      type: string
      description: "Video output identifier, e.g. out1~out16 or all"
  command_template: "SET SW{input} {output}<CR><LF>"
  response_template: "SW{input#} {output#}<CR><LF>"

- id: configure_audio_switch_mode
  label: Configure Audio Switch Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [on, off]
      description: "on = audio independent from video; off = audio follows video"
  command_template: "SET AUDIOSW_M {mode}<CR><LF>"
  response_template: "AUDIOSW_M {mode}<CR><LF>"

- id: switch_audio_input
  label: Switch Audio Input to Output
  kind: action
  params:
    - name: input
      type: string
      description: "Audio input: hdmi1~hdmi16, spdif1~spdif16, arc1~arc16"
    - name: output
      type: string
      description: "Audio output: audioout1~audioout16 or all"
  command_template: "SET AUDIOSW{input} {output}<CR><LF>"
  response_template: "AUDIOSW{input#} {output#}<CR><LF>"

- id: set_output_gain
  label: Set Output Gain Level
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output: audioout1~audioout16 or all"
    - name: level
      type: integer
      description: "Gain level. FW < v1.3/v1.4: -10 to 10 (dB). FW >= v1.3/v1.4: -80 to 0 in 2dB steps"
  command_template: "SET VOLGAIN_DATA{aout} {level}<CR><LF>"
  response_template: "VOLGAIN_DATA{aout} {level}<CR><LF>"

- id: mute_audio
  label: Mute Audio Output
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output: spdifout1~spdifout16, audioout1~audioout16, or all"
    - name: state
      type: enum
      values: [on, off]
      description: "on = mute; off = unmute"
  command_template: "SET MUTE{aout} {state}<CR><LF>"
  response_template: "MUTE{aout} {state}<CR><LF>"

- id: set_audio_out_level_fixed_variable
  label: Set Audio Output Level as Fixed or Variable
  kind: action
  notes: "Requires 10x10 FW v1.3 or higher / 16x16 FW v1.4 or higher"
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
    - name: mode
      type: enum
      values: [on, off]
      description: "on = fixed; off = variable"
  command_template: "SET VOLGAIN_FIX{aout} {mode}<CR><LF>"
  response_template: "VOLGAIN_FIX{aout} {mode}<CR><LF>"

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
      description: "cut = immediately to mute level; ramp = ramp to mute level"
  command_template: "SET MUTE_M{aout} {method}<CR><LF>"
  response_template: "MUTE_M{aout} {method}<CR><LF>"

- id: increase_volume
  label: Increase Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
  command_template: "SET VOLGAIN_INC{aout}<CR><LF>"
  response_template: "VOLGAIN_INC{aout} {prm}<CR><LF>"

- id: decrease_volume
  label: Decrease Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
  command_template: "SET VOLGAIN_DEC{aout}<CR><LF>"
  response_template: "VOLGAIN_DEC{aout} {prm}<CR><LF>"

- id: set_volume_step
  label: Configure Step Length of Volume Increase/Decrease
  kind: action
  params:
    - name: aout
      type: string
      description: "audioout1~audioout16 or all"
    - name: step
      type: enum
      values: ["2", "4", "8"]
      description: "Step size in dB"
  command_template: "SET VOLGAIN_STEP{aout} {step}<CR><LF>"
  response_template: "VOLGAIN_STEP{aout} {step}<CR><LF>"

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
  command_template: "SET AUDIO_D{aout} {delay_ms}<CR><LF>"
  response_template: "AUDIO_D{aout} {delay_ms}<CR><LF>"

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
  command_template: "SET EQ_FN{aout} {state}<CR><LF>"
  response_template: "EQ_FN{aout} {state}<CR><LF>"

- id: set_audio_eq_level
  label: Set Audio Output EQ Level
  kind: action
  params:
    - name: out
      type: string
      description: "audioout1~audioout16 or all"
    - name: freq
      type: integer
      description: "EQ frequency in Hz: 31, 62, 125, 250, 500, 2000, 4000, 8000, 16000"
    - name: gain
      type: integer
      description: "Gain in dB: -10 to 10"
  command_template: "SET AUDIO_EQ{out} {freq} {gain}<CR><LF>"
  response_template: "AUDIO_EQ{out} {freq} {gain}<CR><LF>"

- id: save_video_scene
  label: Save Video Scene
  kind: action
  params:
    - name: scene
      type: integer
      description: "Scene number 1~20"
  command_template: "SAVE PRESET_V{scene}<CR><LF>"
  response_template: "PRESET_V{scene}<CR><LF>"

- id: recall_video_scene
  label: Recall Video Scene
  kind: action
  params:
    - name: scene
      type: integer
      description: "Scene number 1~20"
  command_template: "RESTORE PRESET_V{scene}<CR><LF>"
  response_template: "PRESET_V{scene}<CR><LF>"

- id: save_audio_scene
  label: Save Audio Scene
  kind: action
  notes: "Requires 10x10 FW v1.3 or higher / 16x16 FW v1.4 or higher"
  params:
    - name: scene
      type: integer
      description: "Scene number 1~20"
  command_template: "SAVE PRESET_A{scene}<CR><LF>"
  response_template: "PRESET_A{scene}<CR><LF>"

- id: recall_audio_scene
  label: Recall Audio Scene
  kind: action
  notes: "Requires 10x10 FW v1.3 or higher / 16x16 FW v1.4 or higher"
  params:
    - name: scene
      type: integer
      description: "Scene number 1~20"
  command_template: "RESTORE PRESET_A{scene}<CR><LF>"
  response_template: "PRESET_A{scene}<CR><LF>"

- id: cec_power_display
  label: Power Display On/Off via CEC
  kind: action
  params:
    - name: out
      type: string
      description: "hdmiout1~hdmiout16, hdbtout1~hdbtout16, or all"
    - name: state
      type: enum
      values: [on, off]
  command_template: "SET CEC_PWR{out} {state}<CR><LF>"
  response_template: "CEC_PWR{out} {state}<CR><LF>"

- id: set_cec_power_delay
  label: Set CEC Power Delay Time
  kind: action
  params:
    - name: out
      type: string
      description: "hdmiout1~hdmiout16, hdbtout1~hdbtout16, or all"
    - name: delay_minutes
      type: integer
      description: "Delay in minutes 0~30; 0 = power off immediately if no active signal"
  command_template: "SET AUTOCEC_D{out} {delay_minutes}<CR><LF>"
  response_template: "AUTOCEC_D{out} {delay_minutes}<CR><LF>"

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
  command_template: "SET HDCP_S{input} {state}<CR><LF>"
  response_template: "HDCP_S{input} {state}<CR><LF>"

- id: set_input_edid
  label: Set Input EDID
  kind: action
  params:
    - name: input
      type: string
      description: "in1~in16 or all"
    - name: edid_code
      type: integer
      description: "EDID code 0~31 (see EDID Parameter Table in Notes)"
  command_template: "SET EDID{input} {edid_code}<CR><LF>"
  response_template: "EDID{input} {edid_code}<CR><LF>"

- id: set_ir_callback
  label: Set IR Call Back Control
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  command_template: "SET IRBACK_FN{state}<CR><LF>"
  response_template: "IRBACK_FN{state}<CR><LF>"

- id: set_long_reach_mode
  label: Set Long Reach Cable Mode
  kind: action
  params:
    - name: target
      type: string
      description: "hdbtall"
    - name: state
      type: enum
      values: [on, off]
  command_template: "SET LR_FN{target} {state}<CR><LF>"
  response_template: "LR_FN{target} {state}<CR><LF>"

- id: set_ir_system_codes
  label: Set IR System Codes
  kind: action
  params:
    - name: code
      type: enum
      values: ["00", "4E", all]
      description: "00 = standard; 4E = alternate; all = respond to both"
  command_template: "SET IR_SYSCODE{code}<CR><LF>"
  response_template: "IR_SYSCODE{code}<CR><LF>"

- id: set_matrix_switching_mode
  label: Set Matrix Switching Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [normal, quick]
  command_template: "SET SW_M{mode}<CR><LF>"
  response_template: "SW_M{mode}<CR><LF>"

- id: set_avr_priority_mode
  label: Set AVR Priority Mode (Theater Zone Locking)
  kind: action
  params:
    - name: out
      type: string
      description: "hdmiout1~hdmiout16, hdbtout1~hdbtout16, or all"
    - name: state
      type: enum
      values: [on, off]
  command_template: "SET ZONE_LOCK{out} {state}<CR><LF>"
  response_template: "ZONE_LOCK{out} {state}<CR><LF>"

- id: set_zone_source_lockout
  label: Select Sources a Zone Can Access
  kind: action
  params:
    - name: out
      type: string
      description: "out1~out16 or all"
    - name: mask
      type: string
      description: "Hex mask from Source Zone Lockout Parameter Table (e.g. FFFF = all 16x16)"
  command_template: "SET ZONE_R{out} {mask}<CR><LF>"
  response_template: "ZONE_R{out} {mask}<CR><LF>"

- id: reboot_matrix
  label: Reboot the Matrix
  kind: action
  params:
    - name: target
      type: string
      description: "all, mainboard, ledboard, card1~card16"
  command_template: "REBOOT {target}<CR><LF>"
  response_template: "REBOOT {target}<CR><LF>"

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  params: []
  command_template: "RESET<CR><LF>"
  response_template: "RESET<CR><LF>"
```

## Feedbacks

```yaml
- id: video_input_mapping
  label: Video Input Mapping Query
  type: string
  query_command: "GET MP{out}<CR><LF>"
  response_template: "MP{in#} {out#}<CR><LF>"

- id: audio_switch_mode
  label: Audio Switch Mode
  type: enum
  values: [on, off]
  query_command: "GET AUDIOSW_M<CR><LF>"
  response_template: "AUDIOSW_M {prm}<CR><LF>"

- id: audio_input_mapping
  label: Audio Input Mapping
  type: string
  query_command: "GET AUDIOMP{out}<CR><LF>"
  response_template: "AUDIOMP{in} {out}<CR><LF>"

- id: output_gain_level
  label: Current Output Gain Level
  type: integer
  query_command: "GET VOLGAIN_DATA{aout}<CR><LF>"
  response_template: "VOLGAIN_DATA{aout} {prm}<CR><LF>"

- id: audio_mute_state
  label: Current Audio Mute State
  type: enum
  values: [on, off]
  query_command: "GET MUTE{aout}<CR><LF>"
  response_template: "MUTE{aout} {prm}<CR><LF>"

- id: audio_out_level_setting
  label: Audio Output Level Fixed/Variable Setting
  type: enum
  values: [on, off]
  query_command: "GET VOLGAIN_FIX{aout}<CR><LF>"
  response_template: "VOLGAIN_FIX{aout} {prm}<CR><LF>"

- id: mute_method
  label: Output Mute Method
  type: enum
  values: [cut, ramp]
  query_command: "GET MUTE_M{aout}<CR><LF>"
  response_template: "MUTE_M{aout} {prm}<CR><LF>"

- id: volume_step_length
  label: Volume Step Length
  type: integer
  query_command: "GET VOLGAIN_STEP{aout}<CR><LF>"
  response_template: "VOLGAIN_STEP{aout} {prm}<CR><LF>"

- id: audio_delay
  label: Audio Output Delay Time
  type: integer
  query_command: "GET AUDIO_D{aout}<CR><LF>"
  response_template: "AUDIO_D{aout} {prm}<CR><LF>"

- id: eq_function_status
  label: EQ Function Status
  type: enum
  values: [on, off]
  query_command: "GET EQ_FN{aout}<CR><LF>"
  response_template: "EQ_FN{aout} {prm}<CR><LF>"

- id: audio_eq_level
  label: Audio Output EQ Level
  type: string
  query_command: "GET AUDIO_EQ{out} {freq}<CR><LF>"
  response_template: "AUDIO_EQ{out} {freq} {gain}<CR><LF>"

- id: cec_power_status
  label: CEC Power Status
  type: enum
  values: [on, off]
  query_command: "GET CEC_PWR{out}<CR><LF>"
  response_template: "CEC_PWR{out} {prm}<CR><LF>"

- id: cec_power_delay
  label: CEC Power Delay Time
  type: integer
  query_command: "GET AUTOCEC_D{out}<CR><LF>"
  response_template: "AUTOCEC_D{out} {prm}<CR><LF>"

- id: hdcp_status
  label: Input HDCP Status
  type: enum
  values: [on, off]
  query_command: "GET HDCP_S{in}<CR><LF>"
  response_template: "HDCP_S{in} {prm}<CR><LF>"

- id: edid_dip_switch_status
  label: EDID Dip Switch Status
  type: integer
  query_command: "GET EDID_DIP<CR><LF>"
  response_template: "EDID_DIP{prm}<CR><LF>"

- id: all_inputs_edid_status
  label: All Inputs EDID Status
  type: string
  query_command: "GET EDID all<CR><LF>"
  response_template: "EDID{in1} {prm}<CR>...<CR><LF>"

- id: ir_callback_status
  label: IR Call Back Status
  type: enum
  values: [on, off]
  query_command: "GET IRBACK_FN<CR><LF>"
  response_template: "IRBACK_FN{prm}<CR><LF>"

- id: long_reach_mode_status
  label: Long Reach Mode Status
  type: enum
  values: [on, off]
  query_command: "GET LR_FN{target}<CR><LF>"
  response_template: "LR_FN{target} {prm}<CR><LF>"

- id: ir_system_codes
  label: IR System Codes
  type: string
  query_command: "GET IR_SYSCODE<CR><LF>"
  response_template: "IR_SYSCODE{prm}<CR><LF>"

- id: matrix_switching_mode
  label: Matrix Switching Mode
  type: enum
  values: [normal, quick]
  query_command: "GET SW_M<CR><LF>"
  response_template: "SW_M{prm}<CR><LF>"

- id: avr_priority_mode_status
  label: AVR Priority Mode Status
  type: enum
  values: [on, off]
  query_command: "GET ZONE_LOCK{out}<CR><LF>"
  response_template: "ZONE_LOCK{out} {prm}<CR><LF>"

- id: zone_source_lockout
  label: Zone Source Lockout Access Mask
  type: string
  query_command: "GET ZONE_R{out}<CR><LF>"
  response_template: "ZONE_R{out} {mask}<CR><LF>"

- id: input_cable_connection_status
  label: Input Cable Connection Status
  type: enum
  values: [connected, "not connected"]
  query_command: "GET CABLEC_IN{in}<CR><LF>"
  response_template: "CABLEC_IN{in} {prm}<CR><LF>"

- id: output_cable_connection_status
  label: Output Cable Connection Status
  type: enum
  values: [connected, "not connected"]
  query_command: "GET CABLEC_IN{out}<CR><LF>"
  response_template: "CABLEC_IN{out} {prm}<CR><LF>"

- id: hdbt_input_link_quality
  label: HDBaseT Input Link Quality
  type: integer
  query_command: "GET HDBTL_IN{hdbtin}<CR><LF>"
  response_template: "HDBTL_IN{hdbtin} {prm}<CR><LF>"
  notes: "prm = 1~10 or 'no link'; value x10 = link quality percentage"

- id: hdbt_output_link_quality
  label: HDBaseT Output Link Quality
  type: integer
  query_command: "GET HDBTL_OUT{hdbtout}<CR><LF>"
  response_template: "HDBTL_OUT{hdbtout} {prm}<CR><LF>"
  notes: "prm = 1~10 or 'no link'"

- id: card_connection_status
  label: Card Connection Status
  type: enum
  values: [connected, "not connected"]
  query_command: "GET CARD_C{slot}<CR><LF>"
  response_template: "CARD_C{slot} {prm}<CR><LF>"

- id: card_type
  label: Card Type
  type: enum
  values: [hdmi, hdbt]
  query_command: "GET CARD_T{slot}<CR><LF>"
  response_template: "CARD_T{slot} {prm}<CR><LF>"

- id: card_communication_status
  label: Card Communication Status with Motherboard
  type: enum
  values: [good, none]
  query_command: "GET CARD_COM{slot}<CR><LF>"
  response_template: "CARD_COM{slot} {prm}<CR><LF>"

- id: card_board_status
  label: Board/Card Status
  type: enum
  values: [good, none]
  query_command: "GET CARD_S{slot}<CR><LF>"
  response_template: "CARD_S{slot} {prm}<CR><LF>"

- id: fan_status
  label: Fan Status
  type: enum
  values: [working, unworking]
  query_command: "GET FANS{fan}<CR><LF>"
  response_template: "FANS{fan} {prm}<CR><LF>"
```

## Variables

```yaml
# UNRESOLVED: no settable persistent parameters beyond those covered by Actions; remove if not applicable
```

## Events

```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety

```yaml
confirmation_required_for:
  - restore_factory_defaults
interlocks: []
# restore_factory_defaults (RESET command) will erase all configuration; confirmation recommended before sending.
# reboot_matrix sends REBOOT command which may disrupt active signal routing.
```

## Notes

**Command format:** All ASCII commands are case-sensitive and must be terminated with CR+LF (`<CR><LF>`). Commands follow the pattern `SET <COMMAND><params>` or `GET <COMMAND><params>`. Responses echo the command with current/resulting values.

**Default IP address:** 192.168.11.143 (as shipped). Default Telnet port: 23.

**Firmware-dependent behavior:** Several audio volume commands behave differently depending on firmware version. On 10x10 boards with FW below v1.3 (and 16x16 FW below v1.4), `VOLGAIN_DATA` accepts -10 to +10 dB in integer steps. On FW v1.3/v1.4 or higher, the range changes to -80 to 0 dB in 2 dB steps. Commands `VOLGAIN_FIX`, `MUTE_M`, `VOLGAIN_INC`, `VOLGAIN_DEC`, `VOLGAIN_STEP`, `PRESET_A` (audio scenes) all require FW v1.3 (10x10) or v1.4 (16x16) or higher.

**Remote device control over HDBaseT:** The matrix can route serial commands to remote devices connected via HDBaseT. The command format is a binary packet: `[Header: 05 55 55 57] [Card# hex] [Baud Rate hex] [Parity hex] [Length hex] [Device Command hex]`. See section 6 of the source document for full card slot, baud rate, and parity value tables.

**EDID Parameter Table (code → description):**
- 00~15: Copy from output #
- 16: Fix 1080P 2ch
- 17: Fix 1080P 5.1
- 18: Fix 1080P 7.1
- 19: Fix 4K@30 2ch 8bit
- 20: Fix 4K@30 5.1
- 21: Fix 4K@30 7.1
- 22: Fix 4K@30 2ch HDR
- 23: Fix 4K@30 5.1ch HDR
- 24: Fix 4K@30 7.1ch HDR
- 25: Fix 4K@60 2ch
- 26: Fix 4K@60 5.1
- 27: Fix 4K@60 7.1
- 28: Fix 1920x1200 2ch
- 29: Fix 1920x1200 with no audio
- 30: Smart EDID
- 31: EDID Write

**EDID control prerequisite:** EDID configuration commands require that rear panel dipswitches are set to Front Panel, Web UI, or API EDID Control (dipswitch position 0000).

**Source Zone Lockout:** Uses hexadecimal bitmasks to define which inputs are accessible in a given zone. Custom masks must be calculated using the H2X Source Lockout Command Calculator (not included in this spec).

<!-- UNRESOLVED: RS-232 pin wiring details (TX/RX swap) are described in the source but are physical installation notes, not control protocol; no additional protocol parameters are missing. -->
<!-- UNRESOLVED: Web UI control interface is referenced but no HTTP/REST API details are provided in this source document. -->

## Provenance

```yaml
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-05-01T00:40:25.191Z
last_checked_at: 2026-05-17T00:49:41.265Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-17T00:49:41.265Z
matched_actions: 60
action_count: 60
confidence: high
summary: "All 60 spec actions matched with exact command mnemonics in source; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
