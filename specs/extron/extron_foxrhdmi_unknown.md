---
spec_id: admin/extron-foxrhdmi
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron FOXBOX Tx/Rx HDMI Control Spec"
manufacturer: Extron
model_family: "FOXBOX Tx HDMI"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "FOXBOX Tx HDMI"
    - "FOXBOX Rx HDMI"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-1984-01_FOXBOX_Tx_Rx_HDMI_D_.pdf
  - https://www.extron.com
retrieved_at: 2026-07-01T01:00:03.874Z
last_checked_at: 2026-07-07T11:42:07.312Z
generated_at: 2026-07-07T11:42:07.312Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility ranges not stated; TCP/IP control not mentioned"
  - "source does not define multi-step sequences"
  - "no voltage / current / fault-recovery information in source"
  - "TCP/IP / network control not present in source; firmware compatibility range not stated; EDID sub-table for HDMI PC values 31+ truncated in refined source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:42:07.312Z
  matched_actions: 76
  action_count: 76
  confidence: medium
  summary: "All 76 spec actions matched literally against source; transport parameters fully supported; complete bidirectional coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Extron FOXBOX Tx/Rx HDMI Control Spec

## Summary
Spec covers Extron FOXBOX Tx HDMI (60-1174-xx) and FOXBOX Rx HDMI fiber-optic extenders via RS-232 SIS (Simple Instruction Set). Default serial config 9600 baud / 8-N-1, no flow control. Two physical RS-232 paths: front-panel 2.5 mm TRS config port, rear-panel captive-screw remote RS-232 (Rx only), and an RS-232-over-fiber pass-through (Tx+Rx) up to 115200 baud. All host-to-unit commands are ASCII SIS strings terminated by CR/LF; responses also CR/LF.

<!-- UNRESOLVED: firmware version compatibility ranges not stated; TCP/IP control not mentioned -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - levelable       (audio gain/attenuation X&/X( on transmitter)
# - queryable       (G, B, Z, H, /, J, 1S..7S, 20S, I, Q, N, 1LS, E*Stat, etc.)
# - routable        (HDCP authorized-device toggle, auto memory, return link/daisy chain enable)
# No power on/off command surfaced; power is implicit via "equipment power-up" unit-initiated message.
```

## Actions
```yaml
# ============================================================
# Transmitter SIS Commands
# ============================================================

- id: tx_request_edid_vrate_switch_positions
  label: Request EDID and refresh rate switch positions (Tx)
  kind: query
  command: "E Stat"
  params: []

- id: tx_request_edid_switch_position
  label: Request EDID switch position (Tx)
  kind: query
  command: "E 2Stat"
  params: []

- id: tx_request_refresh_rate_switch_position
  label: Request Refresh rate switch position (Tx)
  kind: query
  command: "E 3Stat"
  params: []

- id: tx_set_edid_resolution_refresh
  label: Set EDID resolution and refresh rate (Tx)
  kind: action
  command: "E A{X#}EDID"
  params:
    - name: X#
      type: integer
      description: "EDID value 00-30 per source table (00=user-captured, 01-30=discrete timings)."

- id: tx_view_assigned_edid
  label: View assigned EDID (Tx)
  kind: query
  command: "E AEDID"
  params: []

- id: tx_save_edid
  label: Save EDID (Tx)
  kind: action
  command: "E S0EDID"
  params: []

- id: tx_show_native_edid
  label: Show native EDID value (Tx)
  kind: query
  command: "E NEDID"
  params: []

- id: tx_import_edid
  label: Import EDID (Tx)
  kind: action
  command: "E I0EDID"
  params: []

- id: tx_set_input_audio_format
  label: Set input audio format (Tx)
  kind: action
  command: "E I{X^}AFMT"
  params:
    - name: X^
      type: integer
      description: "0=follow switch, 1=force digital, 2=force analog, 3=Auto."

- id: tx_view_input_audio_format
  label: View input audio format (Tx)
  kind: query
  command: "E IAFMT"
  params: []

- id: tx_set_input_audio_gain
  label: Set input audio gain (Tx)
  kind: action
  command: "{X&}G Aud"
  params:
    - name: X&
      type: integer
      description: "Gain 00-10."

- id: tx_set_input_audio_attenuation
  label: Set input audio attenuation (Tx)
  kind: action
  command: "{X(}g Aud"
  params:
    - name: X(
      type: integer
      description: "Attenuation 00-18."

- id: tx_increment_input_level
  label: Increment input level (Tx)
  kind: action
  command: "+G Aud"
  params: []

- id: tx_decrement_input_level
  label: Decrement input level (Tx)
  kind: action
  command: "-G Aud"
  params: []

- id: tx_show_input_level
  label: Show input level (Tx)
  kind: query
  command: "G"
  params: []

- id: tx_hdcp_authorized_on
  label: HDCP authorized device on (Tx)
  kind: action
  command: "E E1HDCP"
  params: []

- id: tx_hdcp_authorized_off
  label: HDCP authorized device off (Tx)
  kind: action
  command: "E E0HDCP"
  params: []

- id: tx_view_hdcp_authorized_status
  label: View HDCP authorized device status (Tx)
  kind: query
  command: "E EHDCP"
  params: []

- id: tx_view_link1_status
  label: View link 1 Tx-to-Rx status
  kind: query
  command: "1S"
  params: []

- id: tx_view_link2_status
  label: View link 2 Rx-to-Tx status
  kind: query
  command: "2S"
  params: []

- id: tx_view_input_video_status
  label: View input video status
  kind: query
  command: "3S"
  params: []

- id: tx_view_input_audio_status
  label: View input audio status
  kind: query
  command: "4S"
  params: []

- id: tx_view_all_signal_status
  label: View all signal status
  kind: query
  command: "5S"
  params: []

- id: tx_view_hdmi_signal_status
  label: View HDMI signal status
  kind: query
  command: "6S"
  params: []

- id: tx_view_hdcp_status
  label: View HDCP status
  kind: query
  command: "7S"
  params: []

- id: tx_view_temperature
  label: View temperature (Tx)
  kind: query
  command: "20S"
  params: []

- id: tx_information_request
  label: Information request (Tx)
  kind: query
  command: "I"
  params: []

- id: tx_show_firmware_version
  label: Show firmware version (Tx)
  kind: query
  command: "Q"
  params: []

- id: tx_request_part_number
  label: Request part number (Tx)
  kind: query
  command: "N"
  params: []

- id: tx_input_sync_detection
  label: Input sync detection (Tx)
  kind: query
  command: "1LS"
  params: []

- id: tx_reset_audio
  label: Reset audio (Tx)
  kind: action
  command: "E ZA"
  params: []

- id: tx_system_reset
  label: System reset (Tx)
  kind: action
  command: "E ZXXX"
  params: []

# ============================================================
# Receiver SIS Commands
# ============================================================

- id: rx_mute_output
  label: Mute output (Rx video)
  kind: action
  command: "1B"
  params: []

- id: rx_unmute_output
  label: Unmute output (Rx video)
  kind: action
  command: "0B"
  params: []

- id: rx_show_video_mute_status
  label: Show video mute status (Rx)
  kind: query
  command: "B"
  params: []

- id: rx_set_horizontal_position
  label: Set horizontal position (Rx)
  kind: action
  command: "{X1*}H"
  params:
    - name: X1*
      type: integer
      description: "Position 000-255."

- id: rx_increment_horizontal
  label: Increment horizontal position (Rx)
  kind: action
  command: "+H"
  params: []

- id: rx_decrement_horizontal
  label: Decrement horizontal position (Rx)
  kind: action
  command: "-H"
  params: []

- id: rx_show_horizontal_position
  label: Show horizontal position (Rx)
  kind: query
  command: "H"
  params: []

- id: rx_set_vertical_position
  label: Set vertical position (Rx)
  kind: action
  command: "{X1*}/"
  params:
    - name: X1*
      type: integer
      description: "Position 000-255."

- id: rx_increment_vertical
  label: Increment vertical position (Rx)
  kind: action
  command: "+/"
  params: []

- id: rx_decrement_vertical
  label: Decrement vertical position (Rx)
  kind: action
  command: "-/"
  params: []

- id: rx_show_vertical_position
  label: Show vertical position (Rx)
  kind: query
  command: "/"
  params: []

- id: rx_view_input_frequency
  label: View input frequency (Rx)
  kind: query
  command: "1LS"
  params: []

- id: rx_save_preset
  label: Save preset (Rx)
  kind: action
  command: "{X1(},"
  params:
    - name: X1(
      type: integer
      description: "Preset number 01-30."

- id: rx_recall_preset
  label: Recall preset (Rx)
  kind: action
  command: "{X1(}."
  params:
    - name: X1(
      type: integer
      description: "Preset number 01-30."

- id: rx_disable_auto_memory
  label: Disable auto memory (Rx)
  kind: action
  command: "55*0#"
  params: []

- id: rx_enable_auto_memory
  label: Enable auto memory (Rx)
  kind: action
  command: "55*1#"
  params: []

- id: rx_show_auto_memory_status
  label: Show auto memory status (Rx)
  kind: query
  command: "55#"
  params: []

- id: rx_mute_audio
  label: Mute audio (Rx)
  kind: action
  command: "1Z"
  params: []

- id: rx_unmute_audio
  label: Unmute audio (Rx)
  kind: action
  command: "0Z"
  params: []

- id: rx_show_audio_mute_status
  label: Show audio mute status (Rx)
  kind: query
  command: "Z"
  params: []

- id: rx_output_color_bars
  label: Output color bars test pattern (Rx)
  kind: action
  command: "1J"
  params: []

- id: rx_output_grayscale
  label: Output grayscale test pattern (Rx)
  kind: action
  command: "2J"
  params: []

- id: rx_output_alternating_pixels
  label: Output alternating pixels test pattern (Rx)
  kind: action
  command: "3J"
  params: []

- id: rx_test_pattern_off
  label: Turn test pattern off (Rx)
  kind: action
  command: "0J"
  params: []

- id: rx_show_test_pattern_status
  label: Show test pattern status (Rx)
  kind: query
  command: "J"
  params: []

- id: rx_disable_return_link
  label: Disable return link (Rx)
  kind: action
  command: "66*0*0#"
  params: []

- id: rx_enable_return_link
  label: Enable return link to transmitter (Rx)
  kind: action
  command: "66*0*1#"
  params: []

- id: rx_enable_daisy_chain
  label: Enable daisy chain (Rx)
  kind: action
  command: "66*0*2#"
  params: []

- id: rx_show_return_link_daisy_chain_status
  label: Show return link and daisy chain status (Rx)
  kind: query
  command: "66*0#"
  params: []

- id: rx_set_video_bit_depth_auto
  label: Set video bit depth to auto (Rx)
  kind: action
  command: "E V0BITD"
  params: []

- id: rx_force_video_8bit
  label: Force video to 8-bit depth (Rx)
  kind: action
  command: "E V1BITD"
  params: []

- id: rx_view_video_bit_depth
  label: View video bit depth (Rx)
  kind: query
  command: "E VBITD"
  params: []

- id: rx_enable_hdcp_notification
  label: Enable HDCP notification (Rx)
  kind: action
  command: "E N1HDCP"
  params: []

- id: rx_disable_hdcp_notification
  label: Disable HDCP notification (Rx)
  kind: action
  command: "E N0HDCP"
  params: []

- id: rx_view_hdcp_notification_status
  label: View HDCP notification status (Rx)
  kind: query
  command: "E NHDCP"
  params: []

- id: rx_set_video_delay
  label: Set video delay (Rx)
  kind: action
  command: "3*{X2@}#"
  params:
    - name: X2@
      type: integer
      description: "Delay step 0-6 (0=0s, 2=0.5s default, 6=1.5s, 0.25s per step)."

- id: rx_view_video_delay
  label: View video delay (Rx)
  kind: query
  command: "3#"
  params: []

- id: rx_request_audio_switch_status
  label: Request Audio switch status (Rx)
  kind: query
  command: "E Stat"
  params: []

- id: rx_check_audio_embed
  label: Check audio embed (Rx)
  kind: query
  command: "E 5Stat"
  params: []

- id: rx_information_request
  label: Information request (Rx)
  kind: query
  command: "I"
  params: []

- id: rx_show_firmware_version
  label: Show firmware version (Rx)
  kind: query
  command: "Q"
  params: []

- id: rx_request_part_number
  label: Request part number (Rx)
  kind: query
  command: "N"
  params: []

- id: rx_reset_audio
  label: Reset audio (Rx)
  kind: action
  command: "E ZA"
  params: []

- id: rx_system_reset
  label: System reset (Rx)
  kind: action
  command: "E ZXXX"
  params: []
```

## Feedbacks
```yaml
- id: tx_edid_vrate_switch_positions
  type: string
  description: "Response to E Stat: EdidMdr[X!]•Vrate[X@]"
- id: tx_link_status
  type: enum
  values: [not_detected, detected]
  description: "X1@ returned by 1S/2S/3S/4S/6S/7S and I request."
- id: tx_temperature
  type: string
  description: "X1# F•X1# C returned by 20S."
- id: tx_firmware_version
  type: string
  description: "X1% returned by Q (e.g. 1.23)."
- id: tx_part_number
  type: string
  description: "60-nnnn-nn returned by N."
- id: tx_audio_level
  type: string
  description: "X* dB returned by G and gain/attenuation commands (-18 to +10 dB)."
- id: tx_sync_frequency
  type: string
  description: "horizontal kHz,vertical Hz returned by 1LS."
- id: rx_video_mute_status
  type: enum
  values: [off, on]
  description: "X1) returned by B."
- id: rx_audio_mute_status
  type: enum
  values: [off, on]
  description: "X1) returned by Z."
- id: rx_test_pattern_status
  type: enum
  values: [none, color_bars, grayscale, alternating_pixels]
  description: "X2) returned by J."
- id: rx_video_delay_step
  type: integer
  description: "X2@ step 0-6 returned by 3#."
- id: rx_video_bit_depth
  type: enum
  values: [auto, eight_bit]
  description: "X2# returned by E VBITD."
- id: rx_hdcp_notification_status
  type: enum
  values: [off, on]
  description: "X1) returned by E NHDCP."
- id: rx_auto_memory_status
  type: enum
  values: [off, on]
  description: "X1) returned by 55#."
- id: rx_return_link_status
  type: enum
  values: [disable, return_link_enable, daisy_chain_enable]
  description: "X2! returned by 66*0#."
- id: rx_audio_embed
  type: enum
  values: [not_detected, detected]
  description: "X1@ returned by E 5Stat."
- id: rx_audio_switch_position
  type: enum
  values: [off, on]
  description: "X1& returned by E Stat."
- id: hdcp_authorized_status
  type: enum
  values: [off, on]
  description: "X1! returned by E EHDCP."
- id: error_code
  type: enum
  values: [E10, E11, E13, E14]
  description: "Invalid command / invalid preset / invalid parameter / invalid for this configuration."
```

## Variables
```yaml
# Discrete commands handle all parameter changes; no separate settable-parameter variables.
```

## Events
```yaml
- id: power_up_copyright
  description: "Sent at first power-on: `(c) Copyright 20nn, Extron Electronics FOXBOX Tx HDMI, Vx.xx, 60-1174-xx` (or Rx variant)."
- id: reconfig
  description: "Sent on video input signal change to transmitter: `Reconfig`."
- id: link_status_change
  description: "Sent on fiber link / video change: `1Lnk{X1@}•2Lnk{X1@}•Vid{X1@}•Aud{X1@}`."
- id: embedded_audio_change
  description: "Sent on Rx rear-panel HDMI Audio switch change: `EmbedAud{X1)}`."
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step sequences
```

## Safety
```yaml
confirmation_required_for:
  - tx_system_reset
  - rx_system_reset
interlocks:
  - description: "EDID variables can only be set via SIS when front-panel EDID minder rotary switch is in position 1; otherwise E14 returned."
  - description: "Audio gain/attenuation command via receiver requires receiver-Tx-to-transmitter-Rx fiber cable connected; otherwise E14."
  - description: "Link 2 must be enabled (default) and both fiber optic cables installed for transmitter/receiver to receive RS-232 reports."
  - description: "Both fiber optic cables must be installed for HDCP compliance."
  - description: "RS-232 over fiber pass-through up to 115200 baud; cross Tx and Rx lines once between source and target."
# UNRESOLVED: no voltage / current / fault-recovery information in source
```

## Notes
- Source documents FOXBOX Tx HDMI (60-1174-xx) and FOXBOX Rx HDMI as paired extender; many commands differ between Tx and Rx (e.g. `E Stat`, `I`, `20S` responses include device-type token).
- EDID values are split across multiple sub-tables (DVI Pro, HDMI PC, etc.); only DVI Pro portion fully enumerated in source. Values 31+ (HDMI PC) appear truncated in refined excerpt.
- Test pattern turns off if input signal rate changes, signal disconnects, or power is removed.
- 10-second ASCII-character inter-command timeout aborts command with no indication.
- RS-232 over fiber (RS-232 Over Fiber port) supports up to 115200 baud — separate from the 9600 config port.

<!-- UNRESOLVED: TCP/IP / network control not present in source; firmware compatibility range not stated; EDID sub-table for HDMI PC values 31+ truncated in refined source. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-1984-01_FOXBOX_Tx_Rx_HDMI_D_.pdf
  - https://www.extron.com
retrieved_at: 2026-07-01T01:00:03.874Z
last_checked_at: 2026-07-07T11:42:07.312Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:42:07.312Z
matched_actions: 76
action_count: 76
confidence: medium
summary: "All 76 spec actions matched literally against source; transport parameters fully supported; complete bidirectional coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility ranges not stated; TCP/IP control not mentioned"
- "source does not define multi-step sequences"
- "no voltage / current / fault-recovery information in source"
- "TCP/IP / network control not present in source; firmware compatibility range not stated; EDID sub-table for HDMI PC values 31+ truncated in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
