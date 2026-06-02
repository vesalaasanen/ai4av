---
spec_id: admin/wyrestorm-mx-serial-0-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm MX (Serial 0 Series) Control Spec"
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
retrieved_at: 2026-04-29T12:48:05.737Z
last_checked_at: 2026-06-02T22:16:16.936Z
generated_at: 2026-06-02T22:16:16.936Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not document unsolicited notification events from the device"
  - "no explicit multi-step macro sequences in source"
  - "source does not contain safety warnings or interlock procedures"
  - "no unsolicited event/notification mechanism documented"
  - "no power-on sequencing or safety interlock requirements documented"
  - "firmware version compatibility ranges not fully specified"
  - "default IP address may vary by unit; only one default stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:16:16.936Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Wyrestorm MX (Serial 0 Series) Control Spec

## Summary
Wyrestorm H2X/H2XC modular HDMI/HDBaseT matrix switchers (10x10 and 16x16 configurations) controlled via RS-232 serial or TCP/IP. Supports video/audio routing, CEC display power control, audio volume/EQ/delay, EDID management, scene save/recall, zone lockout, and HDBaseT pass-through control of remote devices.

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
traits:
  - routable    # video and audio input/output routing commands
  - queryable   # extensive GET query commands for all state
  - levelable   # audio gain/volume control per output
  - powerable   # CEC power on/off for connected displays
```

## Actions
```yaml
actions:
  - id: switch_video
    label: Switch Video Input to Output
    kind: action
    command: "SET SW in{N} out{N}"
    params:
      - name: input
        type: string
        description: "Video input (in1~in16)"
      - name: output
        type: string
        description: "Video output (out1~out16, all)"
    response: "SW in{N} out{N}"

  - id: set_audio_switch_mode
    label: Configure Audio Switch Mode
    kind: action
    command: "SET AUDIOSW_M {on|off}"
    params:
      - name: mode
        type: enum
        values: [on, off]
        description: "On = audio independent from video; Off = audio follows video"
    response: "AUDIOSW_M {prm}"

  - id: switch_audio
    label: Switch Audio Input to Output
    kind: action
    command: "SET AUDIOSW in{N} out{N}"
    params:
      - name: input
        type: string
        description: "Audio source (hdmi1~hdmi16, spdif1~spdif16, arc1~arc16)"
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
    response: "AUDIOSW in{N} out{N}"

  - id: set_output_gain
    label: Set Audio Output Gain Level
    kind: action
    command: "SET VOLGAIN_DATA audioout{N} {prm}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
      - name: level
        type: integer
        description: "FW<v1.3/1.4: -10~10 dB; FW>=v1.3/1.4: -80~0 dB in 2dB steps"
    response: "VOLGAIN_DATA audioout{N} {prm}"

  - id: mute_audio
    label: Mute/Unmute Audio Output
    kind: action
    command: "SET MUTE {aout} {on|off}"
    params:
      - name: output
        type: string
        description: "Audio output (spdifout1~spdifout16, audioout1~audioout16, all)"
      - name: state
        type: enum
        values: [on, off]
        description: "On = mute; Off = unmute"
    response: "MUTE {aout} {prm}"

  - id: set_volume_step
    label: Set Volume Step Size
    kind: action
    command: "SET VOLGAIN_STEP {aout} {prm}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
      - name: step
        type: enum
        values: [2, 4, 8]
        description: "Step size in dB"
    response: "VOLGAIN_STEP {aout} {prm}"

  - id: increase_volume
    label: Increase Volume
    kind: action
    command: "SET VOLGAIN_INC {aout}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
    response: "VOLGAIN_INC {aout} {prm}"

  - id: decrease_volume
    label: Decrease Volume
    kind: action
    command: "SET VOLGAIN_DEC {aout}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
    response: "VOLGAIN_DEC {aout} {prm}"

  - id: set_gain_fixed_variable
    label: Set Audio Output Fixed/Variable
    kind: action
    command: "SET VOLGAIN_FIX {aout} {on|off}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
      - name: mode
        type: enum
        values: [on, off]
        description: "On = fixed level; Off = variable level"
    response: "VOLGAIN_FIX {aout} {prm}"
    notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

  - id: set_mute_method
    label: Set Mute Attenuation Method
    kind: action
    command: "SET MUTE_M {aout} {cut|ramp}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
      - name: method
        type: enum
        values: [cut, ramp]
        description: "Cut = instant mute; Ramp = gradual mute"
    response: "MUTE_M {aout} {prm}"
    notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

  - id: set_audio_delay
    label: Set Audio Output Delay
    kind: action
    command: "SET AUDIO_D {aout} {prm}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
      - name: delay_ms
        type: integer
        description: "Delay in milliseconds (0~500); 0 = no delay"
    response: "AUDIO_D {aout} {prm}"

  - id: set_eq_enable
    label: Enable/Disable EQ
    kind: action
    command: "SET EQ_FN {aout} {on|off}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
      - name: state
        type: enum
        values: [on, off]
        description: "On = enabled; Off = bypassed"
    response: "EQ_FN {aout} {prm}"

  - id: set_audio_eq
    label: Set Audio EQ Level
    kind: action
    command: "SET AUDIO_EQ {aout} {freq} {gain}"
    params:
      - name: output
        type: string
        description: "Audio output (audioout1~audioout16, all)"
      - name: frequency
        type: enum
        values: [31, 62, 125, 250, 500, 2000, 4000, 8000, 16000]
        description: "Frequency in Hz"
      - name: gain
        type: integer
        description: "Gain in dB (-10~10)"
    response: "AUDIO_EQ {aout} {freq} {gain}"

  - id: save_video_scene
    label: Save Video Scene
    kind: action
    command: "SAVE PRESET_V {N}"
    params:
      - name: scene
        type: integer
        description: "Scene number (1~20)"
    response: "PRESET_V {N}"

  - id: restore_video_scene
    label: Recall Video Scene
    kind: action
    command: "RESTORE PRESET_V {N}"
    params:
      - name: scene
        type: integer
        description: "Scene number (1~20)"
    response: "PRESET_V {N}"

  - id: save_audio_scene
    label: Save Audio Scene
    kind: action
    command: "SAVE PRESET_A {N}"
    params:
      - name: scene
        type: integer
        description: "Scene number (1~20)"
    response: "PRESET_A {N}"
    notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

  - id: restore_audio_scene
    label: Recall Audio Scene
    kind: action
    command: "RESTORE PRESET_A {N}"
    params:
      - name: scene
        type: integer
        description: "Scene number (1~20)"
    response: "PRESET_A {N}"
    notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

  - id: cec_power
    label: CEC Power Display On/Off
    kind: action
    command: "SET CEC_PWR {out} {on|off}"
    params:
      - name: output
        type: string
        description: "Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)"
      - name: state
        type: enum
        values: [on, off]
    response: "CEC_PWR {out} {prm}"

  - id: set_cec_power_delay
    label: Set CEC Power Off Delay
    kind: action
    command: "SET AUTOCEC_D {out} {N}"
    params:
      - name: output
        type: string
        description: "Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16)"
      - name: delay_min
        type: integer
        description: "Delay in minutes (0~30); 0 = immediate power off on no signal"
    response: "AUTOCEC_D {out} {prm}"

  - id: set_hdcp
    label: Set Input HDCP On/Off
    kind: action
    command: "SET HDCP_S {in} {on|off}"
    params:
      - name: input
        type: string
        description: "Input (in1~in16, all)"
      - name: state
        type: enum
        values: [on, off]
    response: "HDCP_S {in} {prm}"

  - id: set_edid
    label: Set Input EDID
    kind: action
    command: "SET EDID {in} {code}"
    params:
      - name: input
        type: string
        description: "Input (in1~in16, all)"
      - name: edid_code
        type: integer
        description: "EDID parameter code (see EDID table); 00~15=copy from output, 16~31=fixed presets, 30=Smart EDID, 31=EDID Write"
    response: "EDID {in} {code}"

  - id: set_ir_callback
    label: Set IR Callback On/Off
    kind: action
    command: "SET IRBACK_FN {on|off}"
    params:
      - name: state
        type: enum
        values: [on, off]
    response: "IRBACK_FN {prm}"

  - id: set_long_reach
    label: Set Long Reach Cable Mode
    kind: action
    command: "SET LR_FN hdbtall {on|off}"
    params:
      - name: state
        type: enum
        values: [on, off]
    response: "LR_FN hdbtall {prm}"

  - id: set_ir_syscode
    label: Set IR System Code
    kind: action
    command: "SET IR_SYSCODE {code}"
    params:
      - name: code
        type: enum
        values: ["00", "4E", all]
        description: "All = respond to both 00 and 4E code sets"
    response: "IR_SYSCODE {code}"

  - id: set_switching_mode
    label: Set Matrix Switching Mode
    kind: action
    command: "SET SW_M {normal|quick}"
    params:
      - name: mode
        type: enum
        values: [normal, quick]
        description: "Adjusts switching time between input selection and display"
    response: "SW_M {prm}"

  - id: set_zone_lock
    label: Set AVR Priority Mode (Zone Lock)
    kind: action
    command: "SET ZONE_LOCK {out} {on|off}"
    params:
      - name: output
        type: string
        description: "Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)"
      - name: state
        type: enum
        values: [on, off]
    response: "ZONE_LOCK {out} {prm}"

  - id: set_zone_lockout
    label: Set Source Zone Lockout
    kind: action
    command: "SET ZONE_R {out} {hex}"
    params:
      - name: output
        type: string
        description: "Output (out1~out16, all)"
      - name: mask
        type: string
        description: "Hex bitmask selecting accessible sources (e.g. AAAA=odd 16x16, FFFF=all 16x16, 03FF=all 10x10)"
    response: "ZONE_R {out} {prm}"

  - id: reboot
    label: Reboot Matrix Component
    kind: action
    command: "REBOOT {prm}"
    params:
      - name: target
        type: string
        description: "Target (all, mainboard, ledboard, card1~card16)"
    response: "REBOOT {prm}"

  - id: factory_reset
    label: Restore Factory Defaults
    kind: action
    command: "RESET"
    params: []
    response: "RESET"
```

## Feedbacks
```yaml
feedbacks:
  - id: video_mapping
    label: Video Input Mapping for Output
    type: string
    command: "GET MP out{N}"
    response: "MP in{N} out{N}"

  - id: audio_switch_mode
    label: Audio Switch Mode
    type: enum
    values: [on, off]
    command: "GET AUDIOSW_M"
    response: "AUDIOSW_M {prm}"

  - id: audio_mapping
    label: Audio Input Mapping for Output
    type: string
    command: "GET AUDIOMP out{N}"
    response: "AUDIOMP in{N} out{N}"

  - id: output_gain
    label: Audio Output Gain Level
    type: integer
    command: "GET VOLGAIN_DATA {aout}"
    response: "VOLGAIN_DATA {aout} {prm}"

  - id: mute_state
    label: Audio Mute State
    type: enum
    values: [on, off]
    command: "GET MUTE {aout}"
    response: "MUTE {aout} {prm}"

  - id: gain_fixed_variable
    label: Audio Output Fixed/Variable Setting
    type: enum
    values: [on, off]
    command: "GET VOLGAIN_FIX {aout}"
    response: "VOLGAIN_FIX {aout} {prm}"
    notes: "Requires 10x10 FW v1.3+ or 16x16 FW v1.4+"

  - id: mute_method
    label: Mute Attenuation Method
    type: enum
    values: [cut, ramp]
    command: "GET MUTE_M {aout}"
    response: "MUTE_M {aout} {prm}"

  - id: volume_step
    label: Volume Step Size
    type: enum
    values: [2, 4, 8]
    command: "GET VOLGAIN_STEP {aout}"
    response: "VOLGAIN_STEP {aout} {prm}"

  - id: audio_delay
    label: Audio Output Delay
    type: integer
    command: "GET AUDIO_D {aout}"
    response: "AUDIO_D {aout} {prm}"

  - id: eq_status
    label: EQ Enable Status
    type: enum
    values: [on, off]
    command: "GET EQ_FN {aout}"
    response: "EQ_FN {aout} {prm}"

  - id: eq_level
    label: Audio EQ Level
    type: string
    command: "GET AUDIO_EQ {aout} {freq}"
    response: "AUDIO_EQ {aout} {freq} {gain}"

  - id: cec_power_status
    label: CEC Display Power Status
    type: enum
    values: [on, off]
    command: "GET CEC_PWR {out}"
    response: "CEC_PWR {out} {prm}"

  - id: cec_power_delay
    label: CEC Power Off Delay
    type: integer
    command: "GET AUTOCEC_D {out}"
    response: "AUTOCEC_D {out} {prm}"

  - id: hdcp_status
    label: Input HDCP Status
    type: enum
    values: [on, off]
    command: "GET HDCP_S {in}"
    response: "HDCP_S {in} {prm}"

  - id: edid
    label: Input EDID Setting
    type: string
    command: "GET EDID {in|all}"
    response: "EDID in{N} {code} (one line per input if all)"

  - id: edid_dip
    label: EDID Dip Switch Status
    type: integer
    command: "GET EDID_DIP"
    response: "EDID_DIP {prm}"

  - id: ir_callback_status
    label: IR Callback Status
    type: enum
    values: [on, off]
    command: "GET IRBACK_FN"
    response: "IRBACK_FN {prm}"

  - id: long_reach_status
    label: Long Reach Cable Mode Status
    type: enum
    values: [on, off]
    command: "GET LR_FN hdbtall"
    response: "LR_FN hdbtall {prm}"

  - id: ir_syscode
    label: IR System Code
    type: string
    command: "GET IR_SYSCODE"
    response: "IR_SYSCODE {prm}"

  - id: switching_mode
    label: Matrix Switching Mode
    type: enum
    values: [normal, quick]
    command: "GET SW_M"
    response: "SW_M {prm}"

  - id: zone_lock_status
    label: AVR Priority Mode Status
    type: enum
    values: [on, off]
    command: "GET ZONE_LOCK {out}"
    response: "ZONE_LOCK {out} {prm}"

  - id: zone_lockout
    label: Source Zone Lockout Mask
    type: string
    command: "GET ZONE_R {out}"
    response: "ZONE_R {out} {prm}"

  - id: input_cable_status
    label: Input Cable Connection Status
    type: enum
    values: [connected, "not connected"]
    command: "GET CABLEC_IN in{N}"
    response: "CABLEC_IN in{N} {prm}"

  - id: output_cable_status
    label: Output Cable Connection Status
    type: enum
    values: [connected, "not connected"]
    command: "GET CABLEC_IN {hdmiout|hdmiout} {N}"
    response: "CABLEC_IN {out} {prm}"

  - id: hdbt_input_link
    label: HDBaseT Input Link Quality
    type: string
    command: "GET HDBTL_IN hdbtin{N}"
    response: "HDBTL_IN hdbtin{N} {1~10|no link}"

  - id: hdbt_output_link
    label: HDBaseT Output Link Quality
    type: string
    command: "GET HDBTL_OUT hdbtout{N}"
    response: "HDBTL_OUT hdbtout{N} {1~10|no link}"

  - id: card_connection
    label: Card Connection Status
    type: enum
    values: [connected, "not connected"]
    command: "GET CARD_C slot{N}"
    response: "CARD_C slot{N} {prm}"

  - id: card_type
    label: Card Type
    type: enum
    values: [hdmi, hdbt]
    command: "GET CARD_T {N}"
    response: "CARD_T slot{N} {prm}"

  - id: card_comms
    label: Card Communication Status with Motherboard
    type: enum
    values: [good, none]
    command: "GET CARD_COM {N}"
    response: "CARD_COM slot{N} {prm}"

  - id: card_status
    label: Board/Card Status
    type: enum
    values: [good, none]
    command: "GET CARD_S {mainboard|cardN|all}"
    response: "CARD_S {target} {prm}"

  - id: fan_status
    label: Fan Status
    type: enum
    values: [working, unworking]
    command: "GET FANS {fan1~fan4|all}"
    response: "FANS {fan} {prm}"
```

## Variables
```yaml
variables:
  - id: audio_output_gain
    label: Audio Output Gain
    type: integer
    min: -80
    max: 0
    unit: dB
    description: "Per-output gain level. Range varies by firmware version."

  - id: audio_delay
    label: Audio Output Delay
    type: integer
    min: 0
    max: 500
    unit: ms
    description: "Per-output audio delay in milliseconds."

  - id: eq_gain
    label: Audio EQ Band Gain
    type: integer
    min: -10
    max: 10
    unit: dB
    description: "Per-output, per-frequency EQ gain."
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notification events from the device
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings or interlock procedures
```

## Notes
- All commands are ASCII, terminated with `<CR><LF>`.
- Key words are case sensitive.
- Default IP address: 192.168.11.143; default TCP port: 23.
- Some commands are firmware-version gated: 10x10 Main Board FW v1.3+ or 16x16 Main Board FW v1.4+ required for `VOLGAIN_FIX`, `MUTE_M` (set/query mute method), `VOLGAIN_INC`, `VOLGAIN_DEC`, `VOLGAIN_STEP`, `SAVE PRESET_A`, `RESTORE PRESET_A`.
- Audio gain range changes with firmware: older FW uses -10~10 dB; newer FW uses -80~0 dB in 2 dB increments.
- Remote device control over HDBaseT uses binary command syntax with header `05 55 55 57` followed by card slot, baud rate, parity, command length, and device command bytes.
- EDID dipswitches must be set to Front Panel/Web UI/API control (0000) for EDID API commands to function.

<!-- UNRESOLVED: no unsolicited event/notification mechanism documented -->
<!-- UNRESOLVED: no power-on sequencing or safety interlock requirements documented -->
<!-- UNRESOLVED: firmware version compatibility ranges not fully specified -->
<!-- UNRESOLVED: default IP address may vary by unit; only one default stated -->

## Provenance

```yaml
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-04-29T12:48:05.737Z
last_checked_at: 2026-06-02T22:16:16.936Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:16:16.936Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not document unsolicited notification events from the device"
- "no explicit multi-step macro sequences in source"
- "source does not contain safety warnings or interlock procedures"
- "no unsolicited event/notification mechanism documented"
- "no power-on sequencing or safety interlock requirements documented"
- "firmware version compatibility ranges not fully specified"
- "default IP address may vary by unit; only one default stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
