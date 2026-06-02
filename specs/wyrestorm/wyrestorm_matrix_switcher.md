---
spec_id: admin/wyrestorm-matrix-switcher
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm Matrix Switcher Control Spec"
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
retrieved_at: 2026-04-30T02:55:48.096Z
last_checked_at: 2026-06-02T19:39:10.118Z
generated_at: 2026-06-02T19:39:10.118Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility ranges not fully stated in source"
  - "remove section if not applicable"
  - "no unsolicited event notifications described in source"
  - "populate if source describes multi-step sequences"
  - "no safety warnings or interlock procedures stated in source"
  - "firmware version compatibility ranges not fully enumerated for all commands"
  - "authentication credentials for web UI not documented"
  - "default username/password for IP interface not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T19:39:10.118Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 60 spec actions confirmed verbatim in source; get_cablec_out carries explicit command GET CABLEC_IN which the source documents for output cable queries; transport verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Wyrestorm Matrix Switcher Control Spec

## Summary
The Wyrestorm H2X/H2XC is an HDMI/HDBaseT matrix switcher supporting video and audio routing for inputs and outputs. Control is via RS-232 serial and TCP/IP (Telnet on port 23) using ASCII command strings terminated with `<CR><LF>`. Supports video/audio switching, CEC power control, EDID management, volume control, presets, and diagnostic queries.

<!-- UNRESOLVED: firmware version compatibility ranges not fully stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # default IP port stated in source
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
- powerable    # inferred from CEC power commands (SET CEC_PWR)
- routable     # inferred from SET SW (video) and SET AUDIOSW (audio)
- queryable    # inferred from GET commands returning state
- levelable    # inferred from volume/gain/EQ commands
```

## Actions
```yaml
- id: set_sw
  label: Switch Video Input to Output
  kind: action
  params:
    - name: in
      type: integer
      description: Video input number (1-16)
    - name: out
      type: integer
      description: Video output number (1-16) or "all"

- id: set_audiosw
  label: Switch Audio Input to Output
  kind: action
  params:
    - name: in
      type: string
      description: Audio input (hdmi1-16, spdif1-16, arc1-16)
    - name: out
      type: string
      description: Audio output (audioout1-16) or "all"

- id: set_audiosw_mode
  label: Configure Audio Switch Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [on, off]
      description: "on: audio independent from video; off: audio follows video"

- id: set_volgain_data
  label: Set Output Gain Level
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1-16) or "all"
    - name: prm
      type: integer
      description: "Gain value: {-10~10} dB for older firmware, {-80~0} (2dB increments) for v1.3+"

- id: set_mute
  label: Mute Audio
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (spdifout1-16, audioout1-16) or "all"
    - name: prm
      type: enum
      values: [on, off]

- id: set_volgain_fix
  label: Set Audio Out Level Fixed or Variable
  kind: action
  params:
    - name: aout
      type: string
    - name: prm
      type: enum
      values: [on, off]

- id: set_mute_m
  label: Set Attenuation Method for Mute
  kind: action
  params:
    - name: aout
      type: string
    - name: prm
      type: enum
      values: [cut, ramp]

- id: set_volgain_inc
  label: Increase Volume Output Level
  kind: action
  params:
    - name: aout
      type: string

- id: set_volgain_dec
  label: Decrease Volume Output Level
  kind: action
  params:
    - name: aout
      type: string

- id: set_volgain_step
  label: Configure Step Length of Volume Increase/Decrease
  kind: action
  params:
    - name: aout
      type: string
    - name: prm
      type: enum
      values: [2, 4, 8]

- id: set_audio_d
  label: Set Audio Output Delay Time
  kind: action
  params:
    - name: aout
      type: string
    - name: prm
      type: integer
      description: Delay in milliseconds (0-500)

- id: set_eq_fn
  label: Enable EQ
  kind: action
  params:
    - name: aout
      type: string
    - name: prm
      type: enum
      values: [on, off]

- id: set_audio_eq
  label: Set Audio Out EQ Level
  kind: action
  params:
    - name: aout
      type: string
    - name: freq
      type: integer
      description: Frequency in Hz (31, 62, 125, 250, 500, 2000, 4000, 8000, 16000)
    - name: gain
      type: integer
      description: Gain in dB (-10 to 10)

- id: save_preset_v
  label: Save Video Scene
  kind: action
  params:
    - name: prm
      type: integer
      description: Scene number (1-20)

- id: restore_preset_v
  label: Recall Video Scene
  kind: action
  params:
    - name: prm
      type: integer
      description: Scene number (1-20)

- id: save_preset_a
  label: Save Audio Scene
  kind: action
  params:
    - name: prm
      type: integer
      description: Scene number (1-20)

- id: restore_preset_a
  label: Recall Audio Scene
  kind: action
  params:
    - name: prm
      type: integer
      description: Scene number (1-20)

- id: set_cec_pwr
  label: Power Display On/Off via CEC
  kind: action
  params:
    - name: out
      type: string
      description: Output (hdmiout1-16, hdbtout1-16) or "all"
    - name: prm
      type: enum
      values: [on, off]

- id: set_autoccec_d
  label: Set CEC Power Delay Time
  kind: action
  params:
    - name: out
      type: string
    - name: prm
      type: integer
      description: Delay in minutes (0-30)

- id: set_hdcp_s
  label: Set Input HDCP On/Off
  kind: action
  params:
    - name: in
      type: integer
      description: Input number (1-16) or "all"
    - name: prm
      type: enum
      values: [on, off]

- id: set_edid
  label: Set Input EDID
  kind: action
  params:
    - name: in
      type: integer
      description: Input number (1-16) or "all"
    - name: prm
      type: integer
      description: EDID code (see EDID Parameter Table)

- id: set_irback_fn
  label: Set IR Call Back Control
  kind: action
  params:
    - name: prm
      type: enum
      values: [on, off]

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

- id: set_ir_syscode
  label: Set IR System Codes
  kind: action
  params:
    - name: prm1
      type: string
      description: "00, 4E, or all"

- id: set_sw_m
  label: Set Matrix Switching Mode
  kind: action
  params:
    - name: prm
      type: enum
      values: [normal, quick]

- id: set_zone_lock
  label: Set AVR Priority Mode
  kind: action
  params:
    - name: out
      type: string
      description: Output (hdmiout1-16, hdbtout1-16) or "all"
    - name: prm
      type: enum
      values: [on, off]

- id: set_zone_r
  label: Select Sources a Zone Can Access
  kind: action
  params:
    - name: out
      type: string
      description: Output number (1-16) or "all"
    - name: prm
      type: string
      description: Zone lockout parameter (see Source Zone Lockout Parameter Table)

- id: reboot
  label: Reboot the Matrix
  kind: action
  params:
    - name: prm
      type: string
      description: "all, mainboard, ledboard, card1-16"

- id: reset
  label: Restore Factory Defaults
  kind: action
  params: []
- id: get_mp
  label: Query Video Input Mapping
  kind: query
  params:
    - name: out
      type: string
      description: "Output number (out1~out16, all)"

- id: get_audiomp
  label: Query Audio Input Mapping
  kind: query
  params:
    - name: out
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: get_audiosw_m
  label: Query Audio Switch Mode
  kind: query
  params:
    - name: prm
      type: enum
      values: [on, off]
      description: "on: Audio independent from video; off: Audio follows video"

- id: get_volgain_data
  label: Query Current Output Gain
  kind: query
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: get_volgain_fix
  label: Query Audio Out Level Setting
  kind: query
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: get_mute
  label: Query Current Audio Mute State
  kind: query
  params:
    - name: aout
      type: string
      description: "Audio output (spdifout1~spdifout16, audioout1~audioout16, all)"

- id: get_mute_m
  label: Query Output Mute Method
  kind: query
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: get_volgain_step
  label: Query Step Length of Volume Increase/Decrease
  kind: query
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: get_audio_d
  label: Query Audio Output Delay Time
  kind: query
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: get_eq_fn
  label: Query EQ Function Status
  kind: query
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1, audioout2, ...audioout16, all)"

- id: get_audio_eq
  label: Query Audio Out EQ Level
  kind: query
  params:
    - name: out
      type: string
      description: "Audio output (audioout1~audioout16, all)"
    - name: freq
      type: integer
      description: "Frequency in Hz (31, 62, 125, 250, 500, 2000, 4000, 8000, 16000)"

- id: get_cec_pwr
  label: Query CEC Power Status
  kind: query
  params:
    - name: out
      type: string
      description: "Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)"

- id: get_autocec_d
  label: Query CEC Power Delay Time
  kind: query
  params:
    - name: out
      type: string
      description: "Output (hdbtout1~hdbtout16)"

- id: get_hdcp_s
  label: Query Input HDCP Status
  kind: query
  params:
    - name: in
      type: integer
      description: "Input number (in1~in16, all)"

- id: get_edid_dip
  label: Query EDID Dip Switch Status
  kind: query
  params: []

- id: get_edid
  label: Query All Inputs EDID Status
  kind: query
  params:
    - name: in
      type: string
      description: "Input (in1~in16, all)"

- id: get_irback_fn
  label: Query IR Call Back Status
  kind: query
  params: []

- id: get_lr_fn
  label: Query Long Reach Mode Status
  kind: query
  params:
    - name: prm1
      type: string
      description: "hdbtall"

- id: get_ir_syscode
  label: Query IR System Codes
  kind: query
  params: []

- id: get_sw_m
  label: Query Matrix Switching Mode
  kind: query
  params: []

- id: get_zone_lock
  label: Query AVR Priority Mode Status
  kind: query
  params:
    - name: out
      type: string
      description: "Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)"

- id: get_zone_r
  label: Query Sources a Zone Can Access
  kind: query
  params:
    - name: out
      type: string
      description: "Output (out1~out16, all)"

- id: get_cablec_in
  label: Query Input Cable Connection Status
  kind: query
  params:
    - name: prm1
      type: string
      description: "Input (in1~in16, all)"

- id: get_cablec_out
  label: Query Output Cable Connection Status
  kind: query
  command: "GET CABLEC_IN prm1"
  notes: "Output cable status uses the same GET CABLEC_IN command; prm1 accepts output identifiers. The source documents no separate GET CABLEC_OUT token."
  params:
    - name: prm1
      type: string
      description: "Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)"

- id: get_hdbtl_in
  label: Query HDBaseT Input Link Quality
  kind: query
  params:
    - name: prm1
      type: string
      description: "HDBaseT input (hdbtin1~hdbtin16, all)"

- id: get_hdbtl_out
  label: Query HDBaseT Output Link Quality
  kind: query
  params:
    - name: prm1
      type: string
      description: "HDBaseT output (hdbtout1~hdbtout16, all)"

- id: get_card_c
  label: Query Card Connection Status
  kind: query
  params:
    - name: prm1
      type: string
      description: "Card slot (Slot1~slot16, all)"

- id: get_card_t
  label: Query Card Type
  kind: query
  params:
    - name: prm1
      type: string
      description: "Card slot (Slot1~slot16, all)"

- id: get_card_com
  label: Query Card Communication Status With Motherboard
  kind: query
  params:
    - name: prm1
      type: string
      description: "Card slot (slot1~slot16, all)"

- id: get_card_s
  label: Query Board/Card Status
  kind: query
  params:
    - name: prm1
      type: string
      description: "Target (mainboard, card1~card16, all)"

- id: get_fans
  label: Query Fan Status
  kind: query
  params:
    - name: prm1
      type: string
      description: "Fan (fan1~fan4, all)"
```

## Feedbacks
```yaml
- id: mp_response
  label: Video Input Mapping Response
  type: string
  description: Returns current routing mapping

- id: audiosw_response
  label: Audio Switch Response
  type: string

- id: audiosw_m_response
  label: Audio Switch Mode Response
  type: enum
  values: [on, off]

- id: volgain_data_response
  label: Output Gain Level Response
  type: string

- id: mute_response
  label: Audio Mute State Response
  type: enum
  values: [on, off]

- id: volgain_fix_response
  label: Audio Out Level Fixed/Variable Response
  type: enum
  values: [on, off]

- id: mute_m_response
  label: Output Mute Method Response
  type: enum
  values: [cut, ramp]

- id: volgain_inc_response
  label: Volume Increase Response
  type: string

- id: volgain_dec_response
  label: Volume Decrease Response
  type: string

- id: volgain_step_response
  label: Step Length Response
  type: string

- id: audio_d_response
  label: Audio Delay Time Response
  type: string

- id: eq_fn_response
  label: EQ Function Status Response
  type: enum
  values: [on, off]

- id: audio_eq_response
  label: Audio EQ Level Response
  type: string

- id: preset_v_response
  label: Video Preset Response
  type: string

- id: preset_a_response
  label: Audio Preset Response
  type: string

- id: cec_pwr_response
  label: CEC Power Status Response
  type: enum
  values: [on, off]

- id: autoccec_d_response
  label: CEC Power Delay Time Response
  type: string

- id: hdcp_s_response
  label: Input HDCP Status Response
  type: enum
  values: [on, off]

- id: edid_response
  label: EDID Status Response
  type: string

- id: edid_dip_response
  label: EDID Dip Switch Status Response
  type: integer

- id: irback_fn_response
  label: IR Call Back Status Response
  type: enum
  values: [on, off]

- id: lr_fn_response
  label: Long Reach Mode Status Response
  type: string

- id: ir_syscode_response
  label: IR System Codes Response
  type: string

- id: sw_m_response
  label: Matrix Switching Mode Response
  type: enum
  values: [normal, quick]

- id: zone_lock_response
  label: AVR Priority Mode Status Response
  type: string

- id: zone_r_response
  label: Source Zone Access Response
  type: string

- id: cablec_in_response
  label: Input Cable Connection Status Response
  type: string

- id: cablec_out_response
  label: Output Cable Connection Status Response
  type: string

- id: hdbtl_in_response
  label: HDBaseT Input Link Quality Response
  type: string

- id: hdbtl_out_response
  label: HDBaseT Output Link Quality Response
  type: string

- id: card_c_response
  label: Card Connection Status Response
  type: string

- id: card_t_response
  label: Card Type Response
  type: string

- id: card_com_response
  label: Card Communication Status Response
  type: string

- id: card_s_response
  label: Board/Card Status Response
  type: string

- id: fans_response
  label: Fan Status Response
  type: string

- id: reboot_response
  label: Reboot Response
  type: string

- id: reset_response
  label: Factory Reset Response
  type: string
```

## Variables
```yaml
# No distinct variables - all parameters are action params or feedback responses.
# UNRESOLVED: remove section if not applicable
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# HDBaseT pass-through control requires binary command construction:
# [Header=05 55 55 57] [Card #] [Baud Rate] [Length] [Device Command]
# Refer to section 6 of source for hex encoding details.
# UNRESOLVED: populate if source describes multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Command termination requires `<CR><LF>` (carriage return + line feed). Commands are case-sensitive ASCII. Some audio features require specific firmware versions: 10x10 Main Board FW v1.3 or higher, 16x16 Main Board FW v1.4 or higher. EDID configuration requires rear panel dipswitches set to Front Panel, Web UI or API EDID Control. HDBaseT pass-through uses binary-encoded commands (see section 6).
<!-- UNRESOLVED: firmware version compatibility ranges not fully enumerated for all commands -->
<!-- UNRESOLVED: authentication credentials for web UI not documented -->
<!-- UNRESOLVED: default username/password for IP interface not stated in source -->

## Provenance

```yaml
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-04-30T02:55:48.096Z
last_checked_at: 2026-06-02T19:39:10.118Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T19:39:10.118Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 60 spec actions confirmed verbatim in source; get_cablec_out carries explicit command GET CABLEC_IN which the source documents for output cable queries; transport verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility ranges not fully stated in source"
- "remove section if not applicable"
- "no unsolicited event notifications described in source"
- "populate if source describes multi-step sequences"
- "no safety warnings or interlock procedures stated in source"
- "firmware version compatibility ranges not fully enumerated for all commands"
- "authentication credentials for web UI not documented"
- "default username/password for IP interface not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
