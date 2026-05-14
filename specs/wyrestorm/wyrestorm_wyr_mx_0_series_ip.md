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
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-05-01T00:40:25.191Z
last_checked_at: 2026-04-27T10:13:23.183Z
generated_at: 2026-04-27T10:13:23.183Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:23.183Z
  matched_actions: 59
  action_count: 59
  confidence: high
  summary: "All 59 ASCII command actions match source verbatim; transport parameters verified in source; spec is complete and accurate."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Wyrestorm WYR-MX-0 Series Control Spec

## Summary
The Wyrestorm H2X/H2XC series matrix switchers support HDMI/HDBaseT video and audio routing. Models include MX-1010-HDBT-H2X, MX-1616-HDBT-H2X, MX-1010-H2XC, and MX-1616-H2XC. Control is available via RS-232 serial and TCP/IP. All commands are ASCII-based, case-sensitive, and terminated with `<CR><LF>`.

<!-- UNRESOLVED: power-on sequencing requirements not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # stated: default IP port
serial:
  baud_rate: 57600  # stated
  data_bits: 8  # stated
  parity: none  # stated
  stop_bits: 1  # stated
  flow_control: none  # stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# UNRESOLVED: matrix has no explicit master power commands; powerable applies only to CEC-connected displays
# levelable: volume, mute, EQ gain, delay commands present
# routable: video and audio matrix switching commands present
# queryable: GET commands returning state present
traits:
  - routable
  - levelable
  - queryable
```

## Actions
```yaml
# Video Switching
- id: set_sw
  label: Switch Video Input to Output
  kind: action
  params:
    - name: in
      type: integer
      description: Video input number (1-16)
    - name: out
      type: integer
      description: Video output number (1-16, or 'all')

- id: get_mp
  label: Query Video Input Mapping
  kind: query
  params:
    - name: out
      type: integer
      description: Video output number (1-16, or 'all')

# Audio Switching
- id: set_audiosw_m
  label: Configure Audio Switch Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [on, off]
      description: "on: audio independent from video; off: audio follows video"

- id: get_audiosw_m
  label: Query Audio Switch Mode
  kind: query
  params:
    - name: mode
      type: enum
      values: [on, off]

- id: set_audiosw
  label: Switch Audio Input to Output
  kind: action
  params:
    - name: in
      type: string
      description: Audio input source (hdmi1~hdmi16, spdif1~spdif16, arc1~arc16)
    - name: out
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: get_audiomp
  label: Query Audio Input Mapping
  kind: query
  params:
    - name: out
      type: string
      description: Audio output (audioout1~audioout16, all)

# Audio Volume Control
- id: set_volgain_data
  label: Set Output Audio Gain Level
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)
    - name: prm
      type: integer
      description: "Gain value: {-10~10} for older firmware, {-80~0} (2dB increments) for v1.3+"

- id: get_volgain_data
  label: Query Current Output Gain
  kind: query
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: set_mute
  label: Mute Audio
  kind: action
  params:
    - name: aout
      type: string
      description: "Audio output: spdifout1~spdifout16, audioout1~audioout16, all"
    - name: prm
      type: enum
      values: [on, off]
      description: "on: mute, off: unmute"

- id: get_mute
  label: Query Current Audio Mute State
  kind: query
  params:
    - name: aout
      type: string
      description: "Audio output: spdifout1~spdifout16, audioout1~audioout16, all"

- id: set_volgain_fix
  label: Set Audio Out Level as Fixed or Variable
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)
    - name: prm
      type: enum
      values: [on, off]
      description: "On: fixed level; Off: variable level"

- id: get_volgain_fix
  label: Query Audio Out Level Setting
  kind: query
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: set_mute_m
  label: Set Attenuation Method for Mute
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)
    - name: prm
      type: enum
      values: [cut, ramp]
      description: "cut: direct to mute level; ramp: ramp to mute level"

- id: get_mute_m
  label: Query Output Mute Method
  kind: query
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: set_volgain_inc
  label: Increase Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: set_volgain_dec
  label: Decrease Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: set_volgain_step
  label: Configure Step Length of Volume Increase/Decrease
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)
    - name: prm
      type: enum
      values: [2, 4, 8]
      description: Step size in dB

- id: get_volgain_step
  label: Query Step Length of Volume Increase/Decrease
  kind: query
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

# Audio Delay
- id: set_audio_d
  label: Set Audio Output Delay Time
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)
    - name: prm
      type: integer
      description: "Delay in milliseconds {0~500}; 0 = no delay; default wait time 2 minutes"

- id: get_audio_d
  label: Query Audio Output Delay Time
  kind: query
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

# Audio EQ
- id: set_eq_fn
  label: Enable EQ
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)
    - name: prm
      type: enum
      values: [on, off]
      description: "on: enable; off: bypassed"

- id: get_eq_fn
  label: Query EQ Function Status
  kind: query
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)

- id: set_audio_eq
  label: Set Audio Out EQ Level
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)
    - name: freq
      type: integer
      description: "Frequency in Hz: 31, 62, 125, 250, 500, 2000, 4000, 8000, 16000"
    - name: gain
      type: integer
      description: "Gain in dB: {-10~10}"

- id: get_audio_eq
  label: Query Audio Out EQ Level
  kind: query
  params:
    - name: aout
      type: string
      description: Audio output (audioout1~audioout16, all)
    - name: freq
      type: integer
      description: Frequency in Hz

# Scene Save/Recall
- id: save_preset_v
  label: Save Video Scene
  kind: action
  params:
    - name: prm
      type: integer
      description: Scene number {1~20}

- id: restore_preset_v
  label: Recall Video Scene
  kind: action
  params:
    - name: prm
      type: integer
      description: Scene number {1~20}

- id: save_preset_a
  label: Save Audio Scene
  kind: action
  params:
    - name: prm
      type: integer
      description: Scene number {1~20}

- id: restore_preset_a
  label: Recall Audio Scene
  kind: action
  params:
    - name: prm
      type: integer
      description: Scene number {1~20}

# Display Power (CEC)
- id: set_cec_pwr
  label: Power Display On/Off
  kind: action
  params:
    - name: out
      type: string
      description: "Output: hdmiout1~hdmiout16, hdbtout1~hdbtout16, all"
    - name: prm
      type: enum
      values: [on, off]

- id: get_cec_pwr
  label: Query CEC Power Status
  kind: query
  params:
    - name: out
      type: string
      description: "Output: hdmiout1~hdmiout16, hdbtout1~hdbtout16, all"

- id: set_autocec_d
  label: Set CEC Power Delay Time
  kind: action
  params:
    - name: out
      type: string
      description: "Output: hdmiout1~hdmiout16, hdbtout1~hdbtout16, all"
    - name: prm
      type: integer
      description: "Delay in minutes {0~30}; default wait time 2 minutes; 0 = power off immediately if no active signal"

- id: get_autocec_d
  label: Query CEC Power Delay Time
  kind: query
  params:
    - name: out
      type: string
      description: "Output: hdmiout1~hdmiout16, hdbtout1~hdbtout16, all"

# HDCP Configuration
- id: set_hdcp_s
  label: Set Input HDCP On/Off
  kind: action
  params:
    - name: in
      type: integer
      description: "Input number {1~16, all}"
    - name: prm
      type: enum
      values: [on, off]

- id: get_hdcp_s
  label: Query Input HDCP Status
  kind: query
  params:
    - name: in
      type: integer
      description: "Input number {1~16, all}"

# EDID Configuration
- id: get_edid_dip
  label: Query EDID Dip Switch Status
  kind: query
  params: []

- id: set_edid
  label: Set Input EDID
  kind: action
  params:
    - name: in
      type: integer
      description: "Input number {1~16, all}"
    - name: prm
      type: integer
      description: "EDID code; see EDID Parameter Table in source"

- id: get_edid
  label: Query All Inputs EDID Status
  kind: query
  params:
    - name: in
      type: string
      description: "Use 'all' to query all inputs"

# Global Matrix Functions
- id: set_irback_fn
  label: Set IR Call Back Control
  kind: action
  params:
    - name: prm
      type: enum
      values: [on, off]

- id: get_irback_fn
  label: Query IR Call Back Status
  kind: query
  params: []

- id: set_lr_fn
  label: Set Long Reach Mode
  kind: action
  params:
    - name: prm1
      type: string
      description: "hdbtall"
    - name: prm2
      type: enum
      values: [on, off]

- id: get_lr_fn
  label: Query Long Reach Mode Status
  kind: query
  params:
    - name: prm1
      type: string
      description: "hdbtall"

- id: set_ir_syscode
  label: Set IR System Codes
  kind: action
  params:
    - name: prm1
      type: enum
      values: [00, 4E, all]
      description: "System code set; 'all' allows both 00 and 4E code sets"

- id: get_ir_syscode
  label: Query IR System Codes
  kind: query
  params: []

- id: set_sw_m
  label: Set Matrix Switching Mode
  kind: action
  params:
    - name: prm
      type: enum
      values: [normal, quick]
      description: "Switching time between input selection and image display"

- id: get_sw_m
  label: Query Matrix Switching Mode
  kind: query
  params: []

- id: set_zone_lock
  label: Set AVR Priority Mode for an Output
  kind: action
  params:
    - name: out
      type: string
      description: "Output: hdmiout1~hdmiout16, hdbtout1~hdbtout16, all"
    - name: prm
      type: enum
      values: [on, off]

- id: get_zone_lock
  label: Query AVR Priority Mode Status
  kind: query
  params:
    - name: out
      type: string
      description: "Output: hdmiout1~hdmiout16, hdbtout1~hdbtout16, all"

- id: set_zone_r
  label: Select Sources a Zone Can Access
  kind: action
  params:
    - name: out
      type: integer
      description: "Output number {1~16, all}"
    - name: prm
      type: string
      description: "Source zone lockout parameter (see Source Zone Lockout Parameter Table)"

- id: get_zone_r
  label: Query Sources a Zone Can Access
  kind: query
  params:
    - name: out
      type: integer
      description: "Output number {1~16, all}"

# Diagnostics
- id: get_cablec_in
  label: Query Input Cable Connection Status
  kind: query
  params:
    - name: prm1
      type: string
      description: "Input: in1~in16, all"
    - name: prm2
      type: enum
      values: [connected, not connected]
      description: "Response parameter"

- id: get_hdbtl_in
  label: Query HDBaseT Input Link Quality
  kind: query
  params:
    - name: prm1
      type: string
      description: "HDBaseT input: hdbtin1~hdbtin16, all"
    - name: prm2
      type: string
      description: "Link quality {1~10, no link}"

- id: get_hdbtl_out
  label: Query HDBaseT Output Link Quality
  kind: query
  params:
    - name: prm1
      type: string
      description: "HDBaseT output: hdbtout1~hdbtout16, all"
    - name: prm2
      type: string
      description: "Link quality {1~10, no link}"

- id: get_card_c
  label: Query Card Connection Status
  kind: query
  params:
    - name: prm1
      type: string
      description: "Slot: slot1~slot16, all"
    - name: prm2
      type: enum
      values: [connected, not connected]
      description: "Response parameter"

- id: get_card_t
  label: Query Card Type
  kind: query
  params:
    - name: prm1
      type: string
      description: "Slot: slot1~slot16, all"
    - name: prm2
      type: enum
      values: [hdmi, hdbt]
      description: "Response parameter"

- id: get_card_com
  label: Query Card Communication Status With Motherboard
  kind: query
  params:
    - name: prm1
      type: string
      description: "Slot: slot1~slot16, all"
    - name: prm2
      type: enum
      values: [good, none]
      description: "Response parameter"

- id: get_card_s
  label: Query Board/Card Status
  kind: query
  params:
    - name: prm1
      type: string
      description: "Main board or card: mainboard, card1~card16, all"
    - name: prm2
      type: enum
      values: [good, none]
      description: "Response parameter"

- id: get_fans
  label: Query Fan Status
  kind: query
  params:
    - name: prm1
      type: string
      description: "Fan: fan1~fan4, all"
    - name: prm2
      type: enum
      values: [working, unworking]
      description: "Response parameter"

# Reboot/Reset
- id: reboot
  label: Reboot the Matrix
  kind: action
  params:
    - name: prm
      type: string
      description: "Target: all mainboard, ledboard, card1~card16"

- id: reset
  label: Restore Factory Defaults
  kind: action
  params: []
```

## Feedbacks
```yaml
# Feedback strings are returned as command echoes with resolved parameter values.
# All commands return an echo response of the form <COMMAND><resolved_params><CR><LF>
# Example: SET SW in2 out6<CR><LF> → SW in2 out6<CR><LF>
# Specific feedbacks:
- id: sw_feedback
  label: Video Switch Confirmation
  type: string
  description: Echo of resolved command, e.g. "SW in2 out6"
  kind: echo

- id: audiodata_feedback
  label: Audio Output Gain Response
  type: string
  description: Echo response for VOLGAIN_DATA commands

- id: mute_feedback
  label: Audio Mute Response
  type: string
  description: Echo response for MUTE commands

- id: audiodelay_feedback
  label: Audio Delay Response
  type: string
  description: Echo response for AUDIO_D commands

- id: cablec_in_feedback
  label: Cable Connection Status Response
  type: string
  description: "Response: CABLEC_IN <input> <connected|not connected>"

- id: hdbtl_in_feedback
  label: HDBaseT Input Link Quality Response
  type: string
  description: "Response: HDBTL_IN <hdbtin> <1~10|no link>"

- id: card_c_feedback
  label: Card Connection Status Response
  type: string
  description: "Response: CARD_C <slot> <connected|not connected>"

- id: card_t_feedback
  label: Card Type Response
  type: string
  description: "Response: CARD_T <slot> <hdmi|hdbt>"

- id: card_com_feedback
  label: Card Communication Status Response
  type: string
  description: "Response: CARD_COM <slot> <good|none>"

- id: card_s_feedback
  label: Board/Card Status Response
  type: string
  description: "Response: CARD_S <slot> <good|none>"

- id: fans_feedback
  label: Fan Status Response
  type: string
  description: "Response: FANS <fan> <working|unworking>"

- id: reboot_feedback
  label: Reboot Confirmation
  type: string
  description: "Echo response: REBOOT <target>"

- id: reset_feedback
  label: Factory Reset Confirmation
  type: string
  description: "Echo response: RESET"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond enumerated commands;
# all configurable values are expressed as action params above
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source;
# device only responds to commands (polling architecture)
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source;
# scene save/recall (PRESET_V, PRESET_A) provide preset functionality
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power sequencing
# requirements explicitly stated in source
```

## Notes
- All commands are ASCII, case-sensitive, terminated with `<CR><LF>`.
- Telnet uses default IP port 23; no authentication required per source.
- Serial configuration: 57600 baud, 8 data bits, no parity, 1 stop bit, no flow control.
- Audio gain range differs by firmware version: older firmware uses {-10~10} dB; v1.3+ (10x10) and v1.4+ (16x16) use {-80~0} dB in 2 dB increments.
- Audio delay default wait time is 2 minutes; entering 0 sets no delay.
- CEC power delay default is 2 minutes; 0 powers off immediately if no active signal.
- HDBaseT pass-through commands use a binary header syntax (05 55 55 57) for routing commands to remote devices; this spec covers only the ASCII command layer.
- IR Call Back must be enabled for IR pass-through over HDBaseT.
- Source zone lockout uses a bitmask parameter table for multi-source configuration.
<!-- UNRESOLVED: binary command encodings for HDBaseT pass-through (section 6) not fully detailed -->
<!-- UNRESOLVED: EDID parameter table reference — full EDID code meanings not reproduced in source excerpt -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not stated in source -->
<!-- UNRESOLVED: protocol version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-05-01T00:40:25.191Z
last_checked_at: 2026-04-27T10:13:23.183Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:23.183Z
matched_actions: 59
action_count: 59
confidence: high
summary: "All 59 ASCII command actions match source verbatim; transport parameters verified in source; spec is complete and accurate."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
