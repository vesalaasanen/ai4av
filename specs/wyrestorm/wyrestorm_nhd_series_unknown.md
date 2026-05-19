---
spec_id: admin/wyrestorm-nhd-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm NHD Series Control Spec"
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
last_checked_at: 2026-05-18T17:09:46.757Z
generated_at: 2026-05-18T17:09:46.757Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T17:09:46.757Z
  matched_actions: 54
  action_count: 54
  confidence: high
  summary: "All 54 spec actions matched literally to source command tokens; transport parameters (57600 baud, port 23, no auth) verified; complete API coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Wyrestorm NHD Series Control Spec

## Summary
H2X/H2XC Matrix Switcher series supporting HDMI/HDBaseT input/output routing. Controls via RS-232 and TCP/IP (Telnet). ASCII command protocol with <CR><LF> termination. Supports video/audio switching, display power via CEC, HDCP/EDID management, preset scenes, volume control, and HDBaseT pass-through for remote device control.

<!-- UNRESOLVED: auth credentials not documented — no login procedure in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # inferred from "Default IP Port: 23"
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
- powerable       # CEC display power commands
- routable        # video/audio input/output switching
- queryable       # query commands for all state
- levelable       # volume/gain control
```

## Actions
```yaml
- id: set_video_switch
  label: Set Video Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-16)
    - name: output
      type: integer
      description: Output number (1-16 or all)
  command: SET SW{in}{out}<CR><LF>

- id: set_audio_switch_mode
  label: Set Audio Switch Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [on, off]
      description: "on: audio independent; off: audio follows video"
  command: SET AUDIOSW_M {mode}<CR><LF>

- id: set_audio_switch
  label: Set Audio Switch
  kind: action
  params:
    - name: input
      type: string
      description: "hdmi1-hdmi16, spdif1-spdif16, arc1-arc16"
    - name: output
      type: string
      description: "audioout1-audioout16, all"
  command: SET AUDIOSW{in}{out}<CR><LF>

- id: set_output_gain
  label: Set Output Gain
  kind: action
  params:
    - name: output
      type: string
      description: "audioout1-audioout16, all"
    - name: level
      type: integer
      description: "-10 to 10 (pre-v1.3) or -80 to 0 in 2dB steps (v1.3+)"
  command: SET VOLGAIN_DATA{output}{level}<CR><LF>

- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: output
      type: string
      description: "spdifout1-spdifout16, audioout1-audioout16, all"
    - name: state
      type: enum
      values: [on, off]
      description: "on=mute, off=unmute"
  command: SET MUTE{output}{state}<CR><LF>

- id: set_audio_out_fixed
  label: Set Audio Out Fixed/Variable
  kind: action
  params:
    - name: output
      type: string
      description: "audioout1-audioout16, all"
    - name: mode
      type: enum
      values: [on, off]
      description: "on=fixed, off=variable"
  command: SET VOLGAIN_FIX{output}{mode}<CR><LF>

- id: set_mute_method
  label: Set Mute Method
  kind: action
  params:
    - name: output
      type: string
      description: "audioout1-audioout16, all"
    - name: method
      type: enum
      values: [cut, ramp]
      description: "cut=immediate, ramp=gradual"
  command: SET MUTE_M{output}{method}<CR><LF>

- id: increase_volume
  label: Increase Volume
  kind: action
  params:
    - name: output
      type: string
      description: "audioout1-audioout16, all"
  command: SET VOLGAIN_INC{output}<CR><LF>

- id: decrease_volume
  label: Decrease Volume
  kind: action
  params:
    - name: output
      type: string
      description: "audioout1-audioout16, all"
  command: SET VOLGAIN_DEC{output}<CR><LF>

- id: set_volume_step
  label: Set Volume Step
  kind: action
  params:
    - name: output
      type: string
      description: "audioout1-audioout16, all"
    - name: step
      type: integer
      values: [2, 4, 8]
      description: "step size in dB"
  command: SET VOLGAIN_STEP{output}{step}<CR><LF>

- id: save_video_preset
  label: Save Video Preset
  kind: action
  params:
    - name: scene
      type: integer
      range: [1, 20]
  command: SAVE PRESET_V{scene}<CR><LF>

- id: restore_video_preset
  label: Restore Video Preset
  kind: action
  params:
    - name: scene
      type: integer
      range: [1, 20]
  command: RESTORE PRESET_V{scene}<CR><LF>

- id: save_audio_preset
  label: Save Audio Preset
  kind: action
  params:
    - name: scene
      type: integer
      range: [1, 20]
  command: SAVE PRESET_A{scene}<CR><LF>

- id: restore_audio_preset
  label: Restore Audio Preset
  kind: action
  params:
    - name: scene
      type: integer
      range: [1, 20]
  command: RESTORE PRESET_A{scene}<CR><LF>

- id: set_cec_power
  label: Set CEC Display Power
  kind: action
  params:
    - name: output
      type: string
      description: "hdmiout1-hdmiout16, hdbtout1-hdbtout16, all"
    - name: state
      type: enum
      values: [on, off]
  command: SET CEC_PWR{output}{state}<CR><LF>

- id: set_cec_power_delay
  label: Set CEC Power Delay
  kind: action
  params:
    - name: output
      type: string
      description: "hdmiout1-hdmiout16, hdbtout1-hdbtout16, all"
    - name: minutes
      type: integer
      range: [0, 30]
      description: "delay in minutes (default 2)"
  command: SET AUTOCEC_D{output}{minutes}<CR><LF>

- id: set_hdcp
  label: Set Input HDCP
  kind: action
  params:
    - name: input
      type: string
      description: "in1-in16, all"
    - name: state
      type: enum
      values: [on, off]
  command: SET HDCP_S{input}{state}<CR><LF>

- id: set_edid
  label: Set Input EDID
  kind: action
  params:
    - name: input
      type: string
      description: "in1-in16, all"
    - name: edid_code
      type: integer
      description: "EDID code (see EDID Parameter Table)"
  command: SET EDID{input}{edid_code}<CR><LF>

- id: set_ir_callback
  label: Set IR Call Back
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  command: SET IRBACK_FN{state}<CR><LF>

- id: set_long_reach
  label: Set Long Reach Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  command: SET LR_FN{hdbtall}{state}<CR><LF>

- id: set_ir_syscode
  label: Set IR System Codes
  kind: action
  params:
    - name: code
      type: string
      description: "00, 4E, or all"
  command: SET IR_SYSCODE{code}<CR><LF>

- id: set_switching_mode
  label: Set Matrix Switching Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [normal, quick]
  command: SET SW_M{mode}<CR><LF>

- id: set_zone_lock
  label: Set AVR Priority Zone Lock
  kind: action
  params:
    - name: output
      type: string
      description: "hdmiout1-hdmiout16, hdbtout1-hdbtout16, all"
    - name: state
      type: enum
      values: [on, off]
  command: SET ZONE_LOCK{output}{state}<CR><LF>

- id: set_zone_r
  label: Set Source Zone Lockout
  kind: action
  params:
    - name: output
      type: string
      description: "out1-out16, all"
    - name: lock_code
      type: string
      description: "hex code from Source Zone Lockout Parameter Table"
  command: SET ZONE_R{output}{lock_code}<CR><LF>

- id: reboot
  label: Reboot
  kind: action
  params:
    - name: target
      type: enum
      values: [all, mainboard, ledboard, card1-card16]
  command: REBOOT {target}<CR><LF>

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []
  command: RESET<CR><LF>
```

## Feedbacks
```yaml
- id: video_mapping
  label: Video Input Mapping
  type: object
  response_template: "MP{in#}{out#}"
  query_command: "GET MP{out}<CR><LF>"

- id: audio_switch_mode
  label: Audio Switch Mode
  type: enum
  values: [on, off]
  description: "on=independent, off=follows video"
  query_command: "GET AUDIOSW_M<CR><LF>"

- id: audio_mapping
  label: Audio Input Mapping
  type: object
  response_template: "AUDIOMP{in#}{out#}"
  query_command: "GET AUDIOMP{out}<CR><LF>"

- id: output_gain
  label: Output Gain Level
  type: integer
  range: [-10, 10]  # pre-v1.3; -80 to 0 (2dB steps) v1.3+
  query_command: "GET VOLGAIN_DATA{output}<CR><LF>"

- id: mute_state
  label: Audio Mute State
  type: enum
  values: [on, off]
  query_command: "GET MUTE{output}<CR><LF>"

- id: audio_fixed
  label: Audio Out Fixed/Variable
  type: enum
  values: [on, off]
  query_command: "GET VOLGAIN_FIX{output}<CR><LF>"

- id: mute_method
  label: Mute Method
  type: enum
  values: [cut, ramp]
  query_command: "GET MUTE_M{output}<CR><LF>"

- id: volume_step
  label: Volume Step Size
  type: integer
  values: [2, 4, 8]
  query_command: "GET VOLGAIN_STEP{output}<CR><LF>"

- id: cec_power
  label: CEC Display Power Status
  type: enum
  values: [on, off]
  query_command: "GET CEC_PWR{output}<CR><LF>"

- id: cec_delay
  label: CEC Power Delay
  type: integer
  range: [0, 30]
  description: "minutes"
  query_command: "GET AUTOCEC_D{output}<CR><LF>"

- id: hdcp_status
  label: Input HDCP Status
  type: enum
  values: [on, off]
  query_command: "GET HDCP_S{input}<CR><LF>"

- id: edid_dip
  label: EDID Dip Switch Status
  type: integer
  range: [0, 15]
  query_command: "GET EDID_DIP<CR><LF>"

- id: edid_status
  label: Input EDID Status
  type: object
  response_template: "EDID{in}{code}"
  query_command: "GET EDID{all}<CR><LF>"

- id: ir_callback
  label: IR Call Back Status
  type: enum
  values: [on, off]
  query_command: "GET IRBACK_FN<CR><LF>"

- id: long_reach
  label: Long Reach Mode
  type: enum
  values: [on, off]
  query_command: "GET LR_FN{hdbtall}<CR><LF>"

- id: ir_syscode
  label: IR System Codes
  type: string
  values: [00, 4E, all]
  query_command: "GET IR_SYSCODE<CR><LF>"

- id: switching_mode
  label: Matrix Switching Mode
  type: enum
  values: [normal, quick]
  query_command: "GET SW_M<CR><LF>"

- id: zone_lock
  label: AVR Priority Zone Lock
  type: enum
  values: [on, off]
  query_command: "GET ZONE_LOCK{output}<CR><LF>"

- id: zone_r
  label: Source Zone Lockout
  type: string
  query_command: "GET ZONE_R{output}<CR><LF>"

- id: cable_in_status
  label: Input Cable Connection
  type: enum
  values: [connected, not connected]
  query_command: "GET CABLEC_IN{in}<CR><LF>"

- id: cable_out_status
  label: Output Cable Connection
  type: enum
  values: [connected, not connected]
  query_command: "GET CABLEC_IN{output}<CR><LF>"

- id: hdbtl_in
  label: HDBaseT Input Link Quality
  type: integer
  range: [1, 10]
  description: "1-10 scale, no link if not connected"
  query_command: "GET HDBTL_IN{hdbtin}<CR><LF>"

- id: hdbtl_out
  label: HDBaseT Output Link Quality
  type: integer
  range: [1, 10]
  description: "1-10 scale, no link if not connected"
  query_command: "GET HDBTL_OUT{hdbtout}<CR><LF>"

- id: card_c
  label: Card Connection Status
  type: enum
  values: [connected, not connected]
  query_command: "GET CARD_C{slot}<CR><LF>"

- id: card_t
  label: Card Type
  type: enum
  values: [hdmi, hdbt]
  query_command: "GET CARD_T{slot}<CR><LF>"

- id: card_com
  label: Card Communication Status
  type: enum
  values: [good, none]
  query_command: "GET CARD_COM{slot}<CR><LF>"

- id: card_s
  label: Board/Card Status
  type: enum
  values: [good, none]
  query_command: "GET CARD_S{slot}<CR><LF>"

- id: fan_status
  label: Fan Status
  type: enum
  values: [working, unworking]
  query_command: "GET FANS{fan}<CR><LF>"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# HDBaseT Pass-through (Section 6): Commands routed to remote devices via matrix
# Syntax: [Header=05 55 55 57] [Card#] [BaudRate] [Length] [DeviceCommand]
# Card#: 01-10 for outputs, 11-20 for HDBT inputs
# See Baud Rate (6.3) and Parity (6.4) tables for encoded values
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command termination requires `<CR><LF>` (carriage return + line feed)
- All keywords are case sensitive
- Multiple models supported: 10x10 and 16x16 configurations
- Audio gain ranges changed with firmware: pre-v1.3 uses -10 to 10, v1.3+ uses -80 to 0 in 2dB increments
- HDBaseT pass-through allows serial control of remote devices through the matrix (Section 6)
- EDID configuration requires rear panel dipswitches set to Front Panel, Web UI, or API EDID Control (0000)
- CEC power delay default is 2 minutes; 0 immediately powers off if no active signal

<!-- UNRESOLVED: default login credentials not stated in source -->
<!-- UNRESOLVED: HTTP/REST API not documented — only RS-232 and Telnet TCP -->

## Provenance

```yaml
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-05-01T00:40:25.191Z
last_checked_at: 2026-05-18T17:09:46.757Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T17:09:46.757Z
matched_actions: 54
action_count: 54
confidence: high
summary: "All 54 spec actions matched literally to source command tokens; transport parameters (57600 baud, port 23, no auth) verified; complete API coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
