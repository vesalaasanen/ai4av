---
spec_id: admin/wyrestorm-versatile-matrix
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm Versatile Matrix Control Spec"
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
retrieved_at: 2026-10-07T20:33:47.898Z
last_checked_at: 2026-10-07T20:33:47.898Z
generated_at: 2026-10-07T20:33:47.898Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "auth mechanism not documented; no login/password procedure described"
  - "no unsolicited event descriptions in source; device may send responses only in reply to commands"
  - "no safety warnings or interlock procedures in source"
  - "auth mechanism not documented; no login/password or token-based auth described in source"
  - "unsolicited event/notification format not described in source"
  - "TCP keepalive or connection persistence characteristics not stated"
  - "command rate limiting or throttling not documented"
  - "firmware version compatibility range for command syntax not fully specified"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:33:47.898Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 action units (30 actions, 31 query feedbacks) match source commands, transport port 23 and serial 57600 8N1 are in the source, and coverage is complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Wyrestorm Versatile Matrix Control Spec

## Summary
HDBaseT matrix switcher supporting 10x10 or 16x16 HDMI/HDBaseT input/output routing. Controlled via RS-232 serial or TCP/IP (Telnet-style). Supports audio/video switching, per-output audio gain/mute/EQ, CEC power control for downstream displays, scene presets, EDID management, HDCP configuration, and HDBaseT passthrough for remote device control.

<!-- UNRESOLVED: auth mechanism not documented; no login/password procedure described -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # default IP port stated in source
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
- powerable      # CEC power on/off commands present
- routable       # video/audio input→output routing commands present
- queryable      # query commands for all major states present
- levelable      # audio volume/gain control present
```

## Actions
```yaml
- id: video_switch
  label: Switch Video Input to Output
  kind: action
  params:
    - name: in
      type: integer
      description: Input number (1–16)
    - name: out
      type: integer
      description: Output number (1–16) or 'all'

- id: audio_switch_mode
  label: Configure Audio Switch Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [on, off]
      description: on=audio independent from video; off=audio follows video

- id: audio_switch
  label: Switch Audio Input to Output
  kind: action
  params:
    - name: in
      type: string
      description: Audio input (hdmi1–hdmi16, spdif1–spdif16, arc1–arc16)
    - name: out
      type: string
      description: Audio output (audioout1–audioout16, all)

- id: set_volume_gain
  label: Set Audio Output Gain
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1–audioout16, all)
    - name: level
      type: integer
      description: Gain in dB; legacy firmware v1.3/v1.4- uses -10–10; current firmware uses -80–0 in 2dB steps

- id: mute_audio
  label: Mute Audio Output
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (spdifout1–spdifout16, audioout1–audioout16, all)
    - name: state
      type: enum
      values: [on, off]
      description: on=mute, off=unmute

- id: set_audio_out_fixed
  label: Set Audio Out Level as Fixed or Variable
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1–audioout16, all)
    - name: mode
      type: enum
      values: [on, off]
      description: on=fixed level, off=variable level

- id: set_mute_method
  label: Set Mute Attenuation Method
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1–audioout16, all)
    - name: method
      type: enum
      values: [cut, ramp]
      description: cut=instant mute, ramp=gradual mute

- id: increase_volume
  label: Increase Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1–audioout16, all)

- id: decrease_volume
  label: Decrease Volume Output Level
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1–audioout16, all)

- id: configure_volume_step
  label: Configure Volume Increase/Decrease Step Length
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1–audioout16, all)
    - name: step
      type: enum
      values: [2, 4, 8]
      description: Step size in dB

- id: set_audio_delay
  label: Set Audio Output Delay Time
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1–audioout16, all)
    - name: delay_ms
      type: integer
      description: Delay in milliseconds (0–500); default wait 2 minutes; 0=no delay

- id: enable_eq
  label: Enable/Disable Audio EQ
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1–audioout16, all)
    - name: state
      type: enum
      values: [on, off]
      description: on=enable EQ, off=bypass EQ

- id: set_audio_eq
  label: Set Audio Output EQ Level
  kind: action
  params:
    - name: aout
      type: string
      description: Audio output (audioout1–audioout16, all)
    - name: freq
      type: integer
      description: Frequency in Hz (31, 62, 125, 250, 500, 2000, 4000, 8000, 16000)
    - name: gain
      type: integer
      description: Gain in dB (-10 to 10)

- id: save_video_scene
  label: Save Video Scene (Preset)
  kind: action
  params:
    - name: scene
      type: integer
      description: Scene number (1–20)

- id: restore_video_scene
  label: Restore Video Scene (Preset)
  kind: action
  params:
    - name: scene
      type: integer
      description: Scene number (1–20)

- id: save_audio_scene
  label: Save Audio Scene (Preset)
  kind: action
  params:
    - name: scene
      type: integer
      description: Scene number (1–20); requires firmware v1.3+ (10x10) or v1.4+ (16x16)

- id: restore_audio_scene
  label: Restore Audio Scene (Preset)
  kind: action
  params:
    - name: scene
      type: integer
      description: Scene number (1–20); requires firmware v1.3+ (10x10) or v1.4+ (16x16)

- id: cec_power
  label: Power Display On/Off via CEC
  kind: action
  params:
    - name: out
      type: string
      description: Output (hdmiout1–hdmiout16, hdbtout1–hdbtout16, all)
    - name: state
      type: enum
      values: [on, off]

- id: set_cec_power_delay
  label: Set CEC Power Delay Time
  kind: action
  params:
    - name: out
      type: string
      description: Output (hdmiout1–hdmiout16, hdbtout1–hdbtout16, all)
    - name: delay_min
      type: integer
      description: Delay in minutes (0–30); default 2 minutes; 0=immediate power off if no active signal

- id: set_hdcp
  label: Set Input HDCP On/Off
  kind: action
  params:
    - name: in
      type: string
      description: Input (in1–in16, all)
    - name: state
      type: enum
      values: [on, off]

- id: set_edid
  label: Set Input EDID
  kind: action
  params:
    - name: in
      type: string
      description: Input (in1–in16, all)
    - name: edid_code
      type: integer
      description: EDID code (see EDID parameter table); codes 0–15=copy from output, 16–29=fixed EDIDs, 30=smart EDID, 31=EDID write

- id: set_ir_callback
  label: Set IR Call Back Enable/Disable
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_long_reach
  label: Set Long Reach Cable Mode
  kind: action
  params:
    - name: prm1
      type: string
      description: Target (hdbtall)
    - name: state
      type: enum
      values: [on, off]

- id: set_ir_syscode
  label: Set IR System Codes
  kind: action
  params:
    - name: code
      type: string
      description: IR system code (00, 4E, all)

- id: set_matrix_switching_mode
  label: Set Matrix Switching Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [normal, quick]

- id: set_zone_lock
  label: Set AVR Priority Mode (Zone Locking)
  kind: action
  params:
    - name: out
      type: string
      description: Output (hdmiout1–hdmiout16, hdbtout1–hdbtout16, all)
    - name: state
      type: enum
      values: [on, off]

- id: set_zone_sources
  label: Select Sources a Zone Can Access
  kind: action
  params:
    - name: out
      type: string
      description: Output (out1–out16, all)
    - name: prm
      type: string
      description: Source zone lockout parameter (4-char hex string; see Source Zone Lockout Parameter Table)

- id: reboot
  label: Reboot Device
  kind: action
  params:
    - name: target
      type: string
      description: Target (all, mainboard, ledboard, card1–card16)

- id: reset_factory
  label: Restore Factory Defaults
  kind: action
  params: []

- id: hdbt_remote_device_command
  label: Route Command to Remote HDBaseT Device
  kind: action
  params:
    - name: card
      type: string
      description: Card slot value; output to zone values 01–0f, 10; input from zone (HDBT In Card TX-H2X-HDBT) values 11–1f, 20
    - name: baud_rate
      type: string
      description: Baud rate HEX value (110=00, 300=01, 600=02, 1200=03, 2400=04, 4800=05, 9600=06, 14400=07, 19200=08, 38400=09, 56000=0A, 57600=0B, 115200=0C)
    - name: parity
      type: string
      description: Parity value (None=00, ODD=01, Even=02, Mark=03, Space=04)
    - name: command_length
      type: string
      description: Length in bytes and HEX value; 1=01 through 40=28
    - name: device_command
      type: string
      description: Command to be sent in HEX to control the device. ASCII commands must be converted to HEX. Header=05 55 55 57
```

## Feedbacks
```yaml
- id: video_mapping
  type: string
  description: Returns MP_in# out# — current video routing
  query_command: GET MP_out

- id: audio_switch_mode
  type: enum
  values: [on, off]
  description: on=audio independent from video; off=audio follows video
  query_command: GET AUDIOSW_M prm

- id: audio_mapping
  type: string
  description: Returns AUDIOMP_in out — current audio routing
  query_command: GET AUDIOMP_out

- id: audio_gain
  type: integer
  description: Returns VOLGAIN_DATA aout prm — current gain in dB
  query_command: GET VOLGAIN_DATA aout

- id: audio_mute_state
  type: enum
  values: [on, off]
  description: on=mute, off=unmute
  query_command: GET MUTE aout

- id: audio_out_fixed
  type: enum
  values: [on, off]
  description: on=fixed level, off=variable level
  query_command: GET VOLGAIN_FIX aout prm

- id: mute_method
  type: enum
  values: [cut, ramp]
  description: Current mute attenuation method
  query_command: GET MUTE_M aout

- id: volume_step
  type: enum
  values: [2, 4, 8]
  description: Current volume step size in dB
  query_command: GET VOLGAIN_STEP aout prm

- id: audio_delay
  type: integer
  description: Current audio delay in milliseconds
  query_command: GET AUDIO_D aout

- id: eq_status
  type: enum
  values: [on, off]
  description: EQ enabled or bypassed
  query_command: GET EQ_FN aout

- id: audio_eq_level
  type: string
  description: Returns AUDIO_EQ out freq gain — current EQ settings
  query_command: GET AUDIO_EQ out freq

- id: cec_power_status
  type: enum
  values: [on, off]
  description: CEC power state of display on specified output
  query_command: GET CEC_PWR out

- id: cec_power_delay
  type: integer
  description: Current CEC power delay in minutes
  query_command: GET AUTOCEC_D out prm

- id: hdcp_status
  type: enum
  values: [on, off]
  description: HDCP state for specified input
  query_command: GET HDCP_S in

- id: edid_dip_switch
  type: integer
  description: Returns EDID_DIP prm — current EDID dip switch setting (0–15)
  query_command: GET EDID_DIP

- id: edid_setting
  type: string
  description: Returns EDID_in prm — EDID code assigned to input
  query_command: GET EDID all

- id: ir_callback_status
  type: enum
  values: [on, off]
  query_command: GET IRBACK_FN

- id: long_reach_status
  type: enum
  values: [on, off]
  query_command: GET LR_FN prm1

- id: ir_syscode
  type: string
  description: Current IR system code (00, 4E, all)
  query_command: GET IR_SYSCODE

- id: matrix_switching_mode
  type: enum
  values: [normal, quick]
  query_command: GET SW_M

- id: zone_lock_status
  type: enum
  values: [on, off]
  query_command: GET ZONE_LOCK out

- id: zone_sources
  type: string
  description: Returns 4-character hex string indicating sources accessible to zone
  query_command: GET ZONE_R out

- id: cable_in_status
  type: enum
  values: [connected, not connected]
  description: Input cable connection status
  query_command: GET CABLEC_IN prm1

- id: cable_out_status
  type: enum
  values: [connected, not connected]
  description: Output cable connection status
  query_command: GET CABLEC_IN prm1

- id: hdbasel_in_quality
  type: integer
  description: HDBaseT input link quality (1–10, or 'no link')
  query_command: GET HDBTL_IN prm1

- id: hdbasel_out_quality
  type: integer
  description: HDBaseT output link quality (1–10, or 'no link')
  query_command: GET HDBTL_OUT prm1

- id: card_connection
  type: enum
  values: [connected, not connected]
  description: Card slot connection status
  query_command: GET CARD_C prm1

- id: card_type
  type: enum
  values: [hdmi, hdbt]
  description: Card type in specified slot
  query_command: GET CARD_T prm1

- id: card_com_status
  type: enum
  values: [good, none]
  description: Card communication status with motherboard
  query_command: GET CARD_COM prm1

- id: card_status
  type: enum
  values: [good, none]
  description: Board/card operational status
  query_command: GET CARD_S prm1

- id: fan_status
  type: enum
  values: [working, unworking]
  description: Fan operational status
  query_command: GET FANS prm1
```

## Variables
```yaml
# No standalone settable parameters — all parameters are action operands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source; device may send responses only in reply to commands
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command termination requires `<CR><LF>` (carriage return + line feed). All commands are ASCII; keywords are case sensitive.

HDBaseT passthrough commands (section 6) use binary (HEX) encoding routed through the matrix to remote devices. Header is `05 55 55 57`. Card slot values differ for HDBaseT input vs output cards. This protocol is for controlling devices connected via HDBaseT extenders, not for matrix configuration.

Audio gain parameter range depends on firmware: legacy (pre-v1.3/v1.4) uses -10–10 dB; current firmware uses -80–0 dB in 2dB increments.

EDID configuration requires rear panel dipswitches set to Front Panel, Web UI, or API EDID Control (0000).

Default IP address: 192.168.11.143. Default IP port: 23.
<!-- UNRESOLVED: auth mechanism not documented; no login/password or token-based auth described in source -->
<!-- UNRESOLVED: unsolicited event/notification format not described in source -->
<!-- UNRESOLVED: TCP keepalive or connection persistence characteristics not stated -->
<!-- UNRESOLVED: command rate limiting or throttling not documented -->
<!-- UNRESOLVED: firmware version compatibility range for command syntax not fully specified -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T20:33:47.898Z
last_checked_at: 2026-10-07T20:33:47.898Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:33:47.898Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 action units (30 actions, 31 query feedbacks) match source commands, transport port 23 and serial 57600 8N1 are in the source, and coverage is complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "auth mechanism not documented; no login/password procedure described"
- "no unsolicited event descriptions in source; device may send responses only in reply to commands"
- "no safety warnings or interlock procedures in source"
- "auth mechanism not documented; no login/password or token-based auth described in source"
- "unsolicited event/notification format not described in source"
- "TCP keepalive or connection persistence characteristics not stated"
- "command rate limiting or throttling not documented"
- "firmware version compatibility range for command syntax not fully specified"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
