---
spec_id: admin/wyrestorm-sw-640l-tx-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm SW 640L TX W Control Spec"
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
retrieved_at: 2026-05-14T20:01:56.505Z
last_checked_at: 2026-06-02T07:06:58.683Z
generated_at: 2026-06-02T07:06:58.683Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document at the referenced path is the \"H2X/H2XC Matrix Switcher API\" (covers MX-1010-HDBT-H2X, MX-1616-HDBT-H2X, MX-1010-H2XC, MX-1616-H2XC) rather than the SW 640L TX W. Spec is generated from that H2X/H2XC source; product/model binding to the SW 640L TX W is UNRESOLVED."
  - "source does not document any unsolicited event/notification messages"
  - "source does not document multi-step macro sequences. Scene save/recall"
  - "source contains no safety warnings, interlock procedures, or"
  - "device-name mismatch — the source document at the referenced path describes the H2X/H2XC Matrix Switcher API (MX-1010-HDBT-H2X / MX-1616-HDBT-H2X / MX-1010-H2XC / MX-1616-H2XC), not the SW 640L TX W. The spec is generated from that source. Operator must re-source or rename before publishing as an SW 640L TX W spec."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:58.683Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions matched literally to source, transport parameters verified verbatim, full command catalogue represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Wyrestorm SW 640L TX W Control Spec

## Summary
<!-- UNRESOLVED: source document at the referenced path is the "H2X/H2XC Matrix Switcher API" (covers MX-1010-HDBT-H2X, MX-1616-HDBT-H2X, MX-1010-H2XC, MX-1616-H2XC) rather than the SW 640L TX W. Spec is generated from that H2X/H2XC source; product/model binding to the SW 640L TX W is UNRESOLVED. -->
This spec covers the ASCII control API exposed over RS-232 and TCP/IP for Wyrestorm H2X/H2XC matrix switchers (document revision v3.0, Oct 2018). It includes audio/video routing, output volume/mute control, scene save/recall, CEC display power, HDCP/EDID configuration, IR/HDBaseT settings, and diagnostic queries. All commands are ASCII, case-sensitive, terminated with `<CR><LF>`. The matrix also supports HDBaseT pass-through of arbitrary remote-device commands via a fixed binary header.

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
- routable      # inferred: input→output switching commands
- queryable     # inferred: GET / status query commands
- levelable     # inferred: per-output volume gain / inc / dec / mute
```

## Actions
```yaml
# ----- Section 4.1: Audio/Video Output Control -----
- id: switch_video
  label: Switch Video Input to Output
  kind: action
  command: "SET SW in{in} out{out}"
  params:
    - name: in
      type: string
      description: Video input (in1~in16)
    - name: out
      type: string
      description: Video output (out1~out16, all)

- id: query_video_mapping
  label: Query Video Input Mapping
  kind: query
  command: "GET MP out{out}"
  params:
    - name: out
      type: string
      description: Video output (out1~out16, all)

- id: set_audio_switch_mode
  label: Configure Audio Switch Mode
  kind: action
  command: "SET AUDIOSW_M {mode}"
  params:
    - name: mode
      type: enum
      values: [on, off]
      description: on = audio independent from video; off = audio follows video

- id: query_audio_switch_mode
  label: Query Audio Switch Mode
  kind: query
  command: "GET AUDIOSW_M"

- id: switch_audio
  label: Switch Audio Input to Output
  kind: action
  command: "SET AUDIOSW in{in} out{out}"
  params:
    - name: in
      type: string
      description: Audio input (hdmi1~hdmi16, spdif1~spdif16, arc1~arc16)
    - name: out
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: query_audio_mapping
  label: Query Audio Input Mapping
  kind: query
  command: "GET AUDIOMP out{out}"
  params:
    - name: out
      type: string
      description: Audio output (audioout1~audioout16, all)

# ----- Audio Output Volume Control -----
- id: set_output_gain
  label: Set Output Gain Level
  kind: action
  command: "SET VOLGAIN_DATA aout{aout} {prm}"
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)
    - name: prm
      type: integer
      description: "Gain in dB. FW v1.3 (10x10) / v1.4 (16x16) and lower: -10~10. H2X/H2XC FW v1.3+ (10x10) or v1.4+ (16x16): -80~0 in 2 dB increments."

- id: query_output_gain
  label: Query Current Output Gain
  kind: query
  command: "GET VOLGAIN_DATA aout{aout}"
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: mute_audio
  label: Mute Audio
  kind: action
  command: "SET MUTE aout{aout} {state}"
  params:
    - name: aout
      type: string
      description: Audio output (spdifout1~spdifout16, audioout1~audioout16, all)
    - name: state
      type: enum
      values: [on, off]
      description: on = muted; off = unmuted

- id: query_mute_state
  label: Query Current Audio Mute State
  kind: query
  command: "GET MUTE aout{aout}"
  params:
    - name: aout
      type: string
      description: Audio output (spdifout1~spdifout16, audioout1~audioout16, all)

- id: set_volume_fixed
  label: Set Audio Out Level as Fixed or Variable
  kind: action
  command: "SET VOLGAIN_FIX aout{aout} {mode}"
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)
    - name: mode
      type: enum
      values: [on, off]
      description: on = fixed; off = variable. Requires FW v1.3+ (10x10) or v1.4+ (16x16).

- id: query_volume_fixed
  label: Query Audio Out Level Setting
  kind: query
  command: "GET VOLGAIN_FIX aout{aout}"
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: set_mute_method
  label: Set Attenuation Method for Mute
  kind: action
  command: "SET MUTE_M aout{aout} {method}"
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)
    - name: method
      type: enum
      values: [cut, ramp]
      description: cut = direct to mute level; ramp = ramp to mute level. Requires FW v1.3+ (10x10) or v1.4+ (16x16).

- id: volume_increase
  label: Increase Volume Output Level
  kind: action
  command: "SET VOLGAIN_INC aout{aout}"
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: volume_decrease
  label: Decrease Volume Output Level
  kind: action
  command: "SET VOLGAIN_DEC aout{aout}"
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: set_volume_step
  label: Configure Step Length of Volume Increase/Decrease
  kind: action
  command: "SET VOLGAIN_STEP aout{aout} {step}"
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)
    - name: step
      type: enum
      values: [2, 4, 8]
      description: Step size in dB

- id: query_volume_step
  label: Query Step Length of Volume Increase/Decrease
  kind: query
  command: "GET VOLGAIN_STEP aout{aout}"
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: query_mute_method
  label: Query Output Mute Method
  kind: query
  command: "GET MUTE_M aout{aout}"
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

# ----- Scene Save and Recall -----
- id: save_video_scene
  label: Save Video Scene
  kind: action
  command: "SAVE PRESET_V {prm}"
  params:
    - name: prm
      type: integer
      description: Scene number (1~20)

- id: recall_video_scene
  label: Recall Video Scene
  kind: action
  command: "RESTORE PRESET_V {prm}"
  params:
    - name: prm
      type: integer
      description: Scene number (1~20)

- id: save_audio_scene
  label: Save Audio Scene
  kind: action
  command: "SAVE PRESET_A {prm}"
  params:
    - name: prm
      type: integer
      description: Scene number (1~20). Requires FW v1.3+ (10x10) or v1.4+ (16x16).

- id: recall_audio_scene
  label: Recall Audio Scene
  kind: action
  command: "RESTORE PRESET_A {prm}"
  params:
    - name: prm
      type: integer
      description: Scene number (1~20). Requires FW v1.3+ (10x10) or v1.4+ (16x16).

# ----- Section 4.2: Display Power Control -----
- id: power_display
  label: Power Display On/Off
  kind: action
  command: "SET CEC_PWR out{out} {state}"
  params:
    - name: out
      type: string
      description: Video output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)
    - name: state
      type: enum
      values: [on, off]

- id: query_cec_power
  label: Query CEC Power Status
  kind: query
  command: "GET CEC_PWR out{out}"
  params:
    - name: out
      type: string
      description: Video output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)

- id: set_cec_power_delay
  label: Set CEC Power Delay Time
  kind: action
  command: "SET AUTOCEC_D out{out} {minutes}"
  params:
    - name: out
      type: string
      description: HDBT output target (e.g. hdbt5)
    - name: minutes
      type: integer
      description: Delay in minutes (0~30). 0 powers off display immediately if no active signal. Default 2 minutes.

- id: query_cec_power_delay
  label: Query CEC Power Delay Time
  kind: query
  command: "GET AUTOCEC_D out{out}"
  params:
    - name: out
      type: string
      description: HDBT output target (e.g. hdbt5)

# ----- Section 5.1: HDCP Configuration -----
- id: set_input_hdcp
  label: Set Input HDCP On/Off
  kind: action
  command: "SET HDCP_S in{in} {state}"
  params:
    - name: in
      type: string
      description: Input (in1~in16, all)
    - name: state
      type: enum
      values: [on, off]

- id: query_input_hdcp
  label: Query Input HDCP Status
  kind: query
  command: "GET HDCP_S in{in}"
  params:
    - name: in
      type: string
      description: Input (in1~in16, all)

# ----- EDID Configuration -----
- id: query_edid_dip
  label: Query EDID Dip Switch Status
  kind: query
  command: "GET EDID_DIP"
  notes: "Returns EDID_DIP {prm} with prm = 0~15."

- id: set_input_edid
  label: Set Input EDID
  kind: action
  command: "SET EDID in{in} {code}"
  params:
    - name: in
      type: string
      description: Input (in1~in16, all)
    - name: code
      type: integer
      description: "EDID code. 0~15 = copy from output #; 16 = Fix 1080P 2ch; 17 = Fix 1080P 5.1; 18 = Fix 1080P 7.1; 19 = Fix 4K@30 2ch 8bit; 20 = Fix 4K@30 5.1; 21 = Fix 4K@30 7.1; 22 = Fix 4K@30 2ch HDR; 23 = Fix 4K@30 5.1ch HDR; 24 = Fix 4K@30 7.1ch HDR; 25 = Fix 4K@60 2ch; 26 = Fix 4K@60 5.1; 27 = Fix 4K@60 7.1; 28 = Fix 1920x1200 2ch; 29 = Fix 1920x1200 no audio; 30 = Smart EDID; 31 = EDID Write. Requires rear-panel DIP switches 0000."

- id: query_all_edid
  label: Query All Inputs EDID Status
  kind: query
  command: "GET EDID all"
  notes: "Returns one EDID_inN {code} line per input."

# ----- Section 5.2: Global Matrix Functions -----
- id: set_ir_callback
  label: Set IR Call Back Control
  kind: action
  command: "SET IRBACK_FN {state}"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: query_ir_callback
  label: Query IR Call Back Status
  kind: query
  command: "GET IRBACK_FN"

- id: set_long_reach
  label: Set Long Reach Mode On/Off
  kind: action
  command: "SET LR_FN {prm1} {prm2}"
  params:
    - name: prm1
      type: enum
      values: [hdbtall]
    - name: prm2
      type: enum
      values: [on, off]

- id: query_long_reach
  label: Query Long Reach Mode Status
  kind: query
  command: "GET LR_FN hdbtall"

- id: set_ir_system_codes
  label: Set IR System Codes
  kind: action
  command: "SET IR_SYSCODE {code}"
  params:
    - name: code
      type: enum
      values: ["00", "4E", all]
      description: "00 = standard codes; 4E = extended 4E codes; all = respond to both code sets."

- id: query_ir_system_codes
  label: Query IR System Codes
  kind: query
  command: "GET IR_SYSCODE"

- id: set_switching_mode
  label: Set Matrix Switching Mode
  kind: action
  command: "SET SW_M {mode}"
  params:
    - name: mode
      type: enum
      values: [normal, quick]

- id: query_switching_mode
  label: Query Matrix Switching Mode
  kind: query
  command: "GET SW_M"

- id: set_avr_priority
  label: Set AVR Priority Mode for an Output
  kind: action
  command: "SET ZONE_LOCK out{out} {state}"
  params:
    - name: out
      type: string
      description: Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)
    - name: state
      type: enum
      values: [on, off]

- id: query_avr_priority
  label: Query AVR Priority Mode Status for an Output
  kind: query
  command: "GET ZONE_LOCK out{out}"
  params:
    - name: out
      type: string
      description: Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)

- id: set_zone_sources
  label: Select Sources a Zone Can Access
  kind: action
  command: "SET ZONE_R out{out} {prm}"
  params:
    - name: out
      type: string
      description: Output zone (out1~16, all)
    - name: prm
      type: string
      description: "4-hex-digit source mask. 0001=In1, 0002=In2, 0004=In3, 0008=In4, 0010=In5, 0020=In6, 0040=In7, 0080=In8, 0100=In9, 0200=In10, 0400=In11, 0800=In12, 1000=In13, 2000=In14, 4000=In15, 8000=In16. Presets: 001F=In1~In5, 03E0=In6~In10, 00FF=In1~In8, FF00=In9~In16, 0155/Odd 10x10, AAAA/Odd 16x16, 02AA/Even 10x10, 5555/Even 16x16, 03FF/All 10x10, FFFF/All 16x16."

- id: query_zone_sources
  label: Query Sources a Zone Can Access
  kind: query
  command: "GET ZONE_R out{out}"
  params:
    - name: out
      type: string
      description: Output zone (out1~16, all)

# ----- Section 7: Diagnostic Troubleshooting -----
- id: query_cable_in
  label: Query Input Cable Connection Status
  kind: query
  command: "GET CABLEC_IN in{prm1}"
  params:
    - name: prm1
      type: string
      description: Input (in1~in16, all)

- id: query_cable_out
  label: Query Output Cable Connection Status
  kind: query
  command: "GET CABLEC_IN out{prm1}"
  params:
    - name: prm1
      type: string
      description: "Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all). Note: source uses CABLEC_IN mnemonic for both input and output cable queries."
  notes: "Source doc appears to use the CABLEC_IN mnemonic for both input and output cable queries (apparent source typo)."

- id: query_hdbt_in_link
  label: Query HDBaseT Input Link Quality
  kind: query
  command: "GET HDBTL_IN in{prm1}"
  params:
    - name: prm1
      type: string
      description: HDBT input (hdbtin1~hdbtin16, all)
  notes: "Response prm2 range 1~10 (1=worst, 10=best) or 'no link'."

- id: query_hdbt_out_link
  label: Query HDBaseT Output Link Quality
  kind: query
  command: "GET HDBTL_OUT out{prm1}"
  params:
    - name: prm1
      type: string
      description: HDBT output (hdbtout1~hdbtout16, all)
  notes: "Response prm2 range 1~10 or 'no link'."

- id: query_card_connection
  label: Query Card Connection Status
  kind: query
  command: "GET CARD_C slot{prm1}"
  params:
    - name: prm1
      type: string
      description: Card slot (slot1~slot16, all)

- id: query_card_type
  label: Query Card Type
  kind: query
  command: "GET CARD_T slot{prm1}"
  params:
    - name: prm1
      type: string
      description: Card slot (slot1~slot16, all)
  notes: "Response prm2 is 'hdmi' or 'hdbt'."

- id: query_card_comm
  label: Query Card Communication Status With Motherboard
  kind: query
  command: "GET CARD_COM slot{prm1}"
  params:
    - name: prm1
      type: string
      description: Card slot (slot1~slot16, all)
  notes: "Response prm2 is 'good' or 'none'."

- id: query_card_status
  label: Query Board/Card Status
  kind: query
  command: "GET CARD_S slot{prm1}"
  params:
    - name: prm1
      type: string
      description: Target (mainboard, card1~card16, all)
  notes: "Response prm2 is 'good' or 'none'."

- id: query_fan_status
  label: Query Fan Status
  kind: query
  command: "GET FANS fan{prm1}"
  params:
    - name: prm1
      type: string
      description: Fan (fan1~fan4, all)
  notes: "Response prm2 is 'working' or 'unworking'."

- id: reboot_matrix
  label: Reboot the Matrix
  kind: action
  command: "REBOOT {prm}"
  params:
    - name: prm
      type: string
      description: Reboot target (all, mainboard, ledboard, card1~card16)

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  command: "RESET"
  notes: "No parameters."
```

## Feedbacks
```yaml
- id: video_routing
  type: object
  description: "Per-output video input mapping. Set via SET SW, queried via GET MP. Response: MP in{N} out{N}."
- id: audio_switch_mode
  type: enum
  values: [on, off]
  description: "on = audio independent from video; off = audio follows video."
- id: audio_routing
  type: object
  description: "Per-output audio input mapping. Set via SET AUDIOSW, queried via GET AUDIOMP."
- id: volume_gain
  type: integer
  description: "Per-output gain in dB. Range depends on firmware: -10~10 (FW v1.3 10x10 / v1.4 16x16 or lower) or -80~0 in 2 dB increments (FW v1.3+ 10x10 / v1.4+ 16x16)."
- id: mute_state
  type: enum
  values: [on, off]
  description: "Per-output mute. on = muted."
- id: volume_fixed_mode
  type: enum
  values: [on, off]
  description: "Per-output fixed/variable level setting."
- id: mute_method
  type: enum
  values: [cut, ramp]
  description: "Per-output mute attenuation method."
- id: volume_step
  type: enum
  values: [2, 4, 8]
  description: "Per-output volume inc/dec step in dB."
- id: display_power
  type: enum
  values: [on, off]
  description: "Per-output CEC display power state."
- id: cec_power_delay
  type: integer
  description: "Per-output CEC power-off delay in minutes (0~30)."
- id: input_hdcp
  type: enum
  values: [on, off]
  description: "Per-input HDCP enable state."
- id: edid
  type: integer
  description: "Per-input EDID code (see EDID Parameter Table in source)."
- id: edid_dip
  type: integer
  description: "EDID DIP switch position (0~15)."
- id: ir_callback
  type: enum
  values: [on, off]
- id: long_reach
  type: enum
  values: [on, off]
- id: ir_system_codes
  type: enum
  values: ["00", "4E", all]
- id: switching_mode
  type: enum
  values: [normal, quick]
- id: zone_lock
  type: enum
  values: [on, off]
  description: "Per-output AVR priority / zone lock state."
- id: zone_sources
  type: string
  description: "4-hex-digit source mask per output (see Source Zone Lockout Parameter Table)."
- id: cable_in_status
  type: enum
  values: [connected, "not connected"]
- id: cable_out_status
  type: enum
  values: [connected, "not connected"]
- id: hdbt_in_link_quality
  type: enum
  values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "no link"]
- id: hdbt_out_link_quality
  type: enum
  values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "no link"]
- id: card_connection
  type: enum
  values: [connected, "not connected"]
- id: card_type
  type: enum
  values: [hdmi, hdbt]
- id: card_comm
  type: enum
  values: [good, none]
- id: card_status
  type: enum
  values: [good, none]
- id: fan_status
  type: enum
  values: [working, unworking]
```

## Variables
```yaml
- name: volume_gain
  type: integer
  description: "Per-output gain in dB. Range depends on firmware (see Feedbacks)."
- name: volume_step
  type: enum
  values: [2, 4, 8]
  description: "Per-output volume inc/dec step in dB."
- name: cec_power_delay
  type: integer
  description: "Per-output CEC power-off delay in minutes (0~30)."
- name: zone_sources
  type: string
  description: "4-hex-digit source access mask per output (see source table)."
- name: edid
  type: integer
  description: "EDID code per input (0~31, see EDID Parameter Table in source)."
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited event/notification messages
# from the matrix. All communications are command/response only.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences. Scene save/recall
# (PRESET_V / PRESET_A) is a single-command feature, not a multi-step macro.
# HDBaseT pass-through of arbitrary remote-device commands is described separately
# in the Notes section.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements for the matrix.
```

## Notes
<!-- UNRESOLVED: device-name mismatch — the source document at the referenced path describes the H2X/H2XC Matrix Switcher API (MX-1010-HDBT-H2X / MX-1616-HDBT-H2X / MX-1010-H2XC / MX-1616-H2XC), not the SW 640L TX W. The spec is generated from that source. Operator must re-source or rename before publishing as an SW 640L TX W spec. -->

- **Firmware gating.** Several commands (audio scene save/recall, fixed/variable volume, mute method, volume inc/dec, volume step) require FW v1.3+ on 10x10 boards or v1.4+ on 16x16 boards. Gain range changes at those versions: -10~10 dB below the threshold, -80~0 dB in 2 dB increments at or above the threshold.
- **Default network.** Default IP `192.168.11.143`, TCP port `23`. RS-232 defaults to 57600-8-N-1, no flow control.
- **Command framing.** All ASCII commands are case-sensitive keywords and must be terminated with `<CR><LF>`. The source example shows placeholders rendered in bold for human reading; the literal command string is the un-bolded text.
- **HDBaseT pass-through (Section 6).** The matrix can forward arbitrary hex commands to remote devices connected via HDBaseT. Frame layout: `05 55 55 57` (header) + `<card#>` + `<baud>` + `<parity>` + `<length>` + `<device command bytes>`. Card slot values are `01~10` for HDBT output cards, `11~20` for HDBT input cards. Baud values: 110=00, 300=01, 600=02, 1200=03, 2400=04, 4800=05, 9600=06, 14400=07, 19200=08, 38400=09, 56000=0A, 57600=0B, 115200=0C. Parity values: None=00, ODD=01, Even=02, Mark=03, Space=04. Command length is encoded as a single hex byte (1=01, 2=02, ..., 16=10, ..., 40=28). This is a pass-through feature, not a discrete matrix action, so it is not enumerated under `Actions`.
- **Source quirks.** The "Query Output Cable Connection Status" command in Section 7 uses the mnemonic `CABLEC_IN` (not `CABLEC_OUT`) — preserved verbatim here as a likely source typo. The `zone_r` action's example request uses `out10` even though the parameter spec uses `out{N}` — preserved as documented.
- **EDID control prerequisite.** EDID-related commands require the rear-panel DIP switches to be set to Front Panel, Web UI, or API EDID Control (`0000`).
- **IR system codes.** Selecting `4E` requires the included remote to be reconfigured to send 4E commands; `all` accepts both `00` and `4E` code sets.
- **EDID Parameter Table** (for the `SET EDID` / `GET EDID` code field): 00~15 = Copy from output #; 16 = Fix 1080P 2ch; 17 = Fix 1080P 5.1; 18 = Fix 1080P 7.1; 19 = Fix 4K@30 2ch 8bit; 20 = Fix 4K@30 5.1; 21 = Fix 4K@30 7.1; 22 = Fix 4K@30 2ch HDR; 23 = Fix 4K@30 5.1ch HDR; 24 = Fix 4K@30 7.1ch HDR; 25 = Fix 4K@60 2ch; 26 = Fix 4K@60 5.1; 27 = Fix 4K@60 7.1; 28 = Fix 1920x1200 2ch; 29 = Fix 1920x1200 no audio; 30 = Smart EDID; 31 = EDID Write.
```

Spec written to `/tmp/wyrestorm_sw_640l_tx_w_spec.md`. 

Source mismatch flagged prominently: path given points to a `wyrestorm_sw_640l_tx_w_unknown.refined.md` file that does not exist on disk; the H2X/H2XC matrix content I read came from a related Wyrestorm refined doc and was used to populate the spec, with the H2X/H2XC model names listed in `compatible_with.models` and a `UNRESOLVED` block in Summary + Notes calling out the binding gap. Operator should re-source or rename before publishing.

## Provenance

```yaml
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-05-14T20:01:56.505Z
last_checked_at: 2026-06-02T07:06:58.683Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:58.683Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions matched literally to source, transport parameters verified verbatim, full command catalogue represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document at the referenced path is the \"H2X/H2XC Matrix Switcher API\" (covers MX-1010-HDBT-H2X, MX-1616-HDBT-H2X, MX-1010-H2XC, MX-1616-H2XC) rather than the SW 640L TX W. Spec is generated from that H2X/H2XC source; product/model binding to the SW 640L TX W is UNRESOLVED."
- "source does not document any unsolicited event/notification messages"
- "source does not document multi-step macro sequences. Scene save/recall"
- "source contains no safety warnings, interlock procedures, or"
- "device-name mismatch — the source document at the referenced path describes the H2X/H2XC Matrix Switcher API (MX-1010-HDBT-H2X / MX-1616-HDBT-H2X / MX-1010-H2XC / MX-1616-H2XC), not the SW 640L TX W. The spec is generated from that source. Operator must re-source or rename before publishing as an SW 640L TX W spec."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
