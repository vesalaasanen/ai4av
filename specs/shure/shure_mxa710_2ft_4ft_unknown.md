---
spec_id: admin/shure-mxa710
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure MXA710 Control Spec"
manufacturer: Shure
model_family: MXA710-2FT
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - MXA710-2FT
    - MXA710-4FT
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shure.com
  - content-files.shure.com
  - pubs.shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/MXN5-C
  - https://content-files.shure.com/KnowledgeBaseFiles/dfr22_rs232.pdf
  - https://content-files.shure.com/KnowledgeBaseFiles/p4800_rs232_commands.pdf
  - https://pubs.shure.com/command-strings/MXW/en-US
  - https://www.shure.com/en-US/docs/commandstrings/P300
retrieved_at: 2026-04-30T13:38:16.296Z
last_checked_at: 2026-05-18T17:04:26.397Z
generated_at: 2026-05-18T17:04:26.397Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T17:04:26.397Z
  matched_actions: 49
  action_count: 49
  confidence: high
  summary: "All 49 spec actions matched verbatim in source; transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Shure MXA710 Control Spec

## Summary
Ceiling/wall microphone array with Dante networked audio. Control via TCP/IP on port 2202 using ASCII command strings in angle-bracket format. Supports gain, mute, routing, LED status, metering, and preset recall.

<!-- UNRESOLVED: Dante audio transport details not documented in control spec -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 2202
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from GET/REP command pairs
- levelable  # inferred from AUDIO_GAIN_HI_RES, AUDIO_GAIN_POSTGATE
- routable   # inferred from channel mute, automixer, beam control
```

## Actions
```yaml
- id: get_all
  label: Get All
  kind: action
  params: []
- id: get_model
  label: Get Model
  kind: action
  params: []
- id: get_serial_num
  label: Get Serial Number
  kind: action
  params: []
- id: get_fw_ver
  label: Get Firmware Version
  kind: action
  params: []
- id: get_ip_addr_net_audio_primary
  label: Get Primary Audio Network IP Address
  kind: action
  params: []
- id: get_ip_subnet_net_audio_primary
  label: Get Primary Audio Network Subnet Mask
  kind: action
  params: []
- id: get_ip_gateway_net_audio_primary
  label: Get Primary Audio Network Gateway
  kind: action
  params: []
- id: get_control_mac_addr
  label: Get Control MAC Address
  kind: action
  params: []
- id: get_device_id
  label: Get Device ID
  kind: action
  params: []
- id: get_na_device_name
  label: Get Dante Device Name
  kind: action
  params: []
- id: get_chan_name
  label: Get Channel Name
  kind: action
  params:
    - name: index
      type: integer
      description: Channel index (0 = all channels)
- id: get_na_chan_name
  label: Get Dante Channel Name
  kind: action
  params:
    - name: index
      type: integer
      description: Channel index (0 = all channels)
- id: set_flash
  label: Flash LED
  kind: action
  params:
    - name: flash_state
      type: enum
      values: [ON, OFF]
- id: set_default_settings
  label: Restore Default Settings
  kind: action
  params: []
- id: set_preset
  label: Set Preset
  kind: action
  params:
    - name: "##"
      type: integer
      description: Preset number 1-10
- id: get_preset_name
  label: Get Preset Name
  kind: action
  params:
    - name: nn
      type: integer
      description: Preset number 1-10
- id: set_device_installation
  label: Set Device Installation
  kind: action
  params:
    - name: pos
      type: enum
      values: [CEILING, WALL_HORIZONTAL, WALL_VERTICAL, TABLE]
- id: get_audio_out_clip_indicator
  label: Get Audio Clip Indicator
  kind: action
  params:
    - name: index
      type: integer
      description: Channel index (0 = all channels)
- id: set_audio_gain_hi_res
  label: Set Audio Gain (Digital)
  kind: action
  params:
    - name: index
      type: integer
      description: Channel index (0 = all channels)
    - name: gain
      type: integer
      description: Gain value 0-1400 representing -110.0 dB to 30.0 dB
- id: set_audio_gain_hi_res_inc
  label: Set Audio Gain (Digital) Increment
  kind: action
  params:
    - name: index
      type: integer
      description: Channel index
    - name: step
      type: integer
      description: Step in one-tenth dB
- id: set_audio_gain_hi_res_dec
  label: Set Audio Gain (Digital) Decrement
  kind: action
  params:
    - name: index
      type: integer
      description: Channel index
    - name: step
      type: integer
      description: Step in one-tenth dB
- id: set_audio_gain_postgate
  label: Set Audio Gain Postgate
  kind: action
  params:
    - name: index
      type: integer
      description: Channel index (0 = all channels)
    - name: gain
      type: integer
      description: Gain value 0-1400 representing -109.9 dB to 30.0 dB
- id: set_audio_gain_postgate_inc
  label: Set Audio Gain Postgate Increment
  kind: action
  params:
    - name: index
      type: integer
      description: Channel index
    - name: step
      type: integer
      description: Step in one-tenth dB
- id: set_audio_gain_postgate_dec
  label: Set Audio Gain Postgate Decrement
  kind: action
  params:
    - name: index
      type: integer
      description: Channel index
    - name: step
      type: integer
      description: Step in one-tenth dB
- id: get_audio_in_rms_lvl
  label: Get Audio Level RMS
  kind: action
  params:
    - name: index
      type: integer
      description: Channel index (0 = all channels)
- id: get_audio_in_peak_lvl
  label: Get Audio Level Peak
  kind: action
  params:
    - name: index
      type: integer
      description: Channel index (0 = all channels)
- id: set_device_audio_mute
  label: Set Device Mute
  kind: action
  params:
    - name: cmd
      type: enum
      values: [ON, OFF, TOGGLE]
- id: set_audio_mute
  label: Set Channel Mute
  kind: action
  params:
    - name: nn
      type: integer
      description: Channel number per channel assignment
    - name: cmd
      type: enum
      values: [ON, OFF, TOGGLE]
- id: set_chan_automix_solo_en
  label: Set Solo Channel to Automix
  kind: action
  params:
    - name: index
      type: integer
      description: Mic input channel index (0 = all channels)
    - name: sts
      type: enum
      values: [ENABLE, DISABLE]
- id: set_beam_angle
  label: Set Lobe Beam Angle
  kind: action
  params:
    - name: index
      type: integer
      description: Beam index (1-8 for 4FT, 1-4 for 2FT)
    - name: position
      type: integer
      description: Angle from -90 to +90 degrees
- id: set_beam_w
  label: Set Lobe Beam Width
  kind: action
  params:
    - name: index
      type: integer
      description: Beam index (1-8 for 4FT, 1-4 for 2FT)
    - name: width
      type: enum
      values: [NARROW, MEDIUM, WIDE]
- id: set_speech_gating
  label: Set Speech Gating
  kind: action
  params:
    - name: nn
      type: integer
      description: Automix output channel
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_noise_filter
  label: Set Enhanced Noise Filtering
  kind: action
  params:
    - name: nn
      type: integer
      description: Automix output channel
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_autofocus
  label: Set Autofocus
  kind: action
  params:
    - name: status
      type: enum
      values: [ON, OFF]
- id: set_meter_rate
  label: Set Metering Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: Rate in ms (100-99999, 0=off)
- id: set_meter_rate_postgate
  label: Set Post-Gate Metering Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: Rate in ms (100-99999, 0=off)
- id: set_meter_rate_mxr_gain
  label: Set Automixer Gain Metering Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: Rate in ms (100-99999, 0=off)
- id: set_meter_rate_aecref
  label: Set AEC Reference Metering Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: Rate in ms (100-99999, 0=off)
- id: set_led_brightness
  label: Set LED Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: Brightness level 0-5 (0=disabled, 5=100%)
- id: set_led_color_unmuted
  label: Set LED Color Unmuted
  kind: action
  params:
    - name: color
      type: enum
      values: [RED, ORANGE, GOLD, YELLOW, YELLOWGREEN, GREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, BLUE, PURPLE, LIGHTPURPLE, VIOLET, ORCHID, PINK, WHITE]
- id: set_led_color_muted
  label: Set LED Color Muted
  kind: action
  params:
    - name: color
      type: enum
      values: [RED, ORANGE, GOLD, YELLOW, YELLOWGREEN, GREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, BLUE, PURPLE, LIGHTPURPLE, VIOLET, ORCHID, PINK, WHITE]
- id: set_led_state_muted
  label: Set LED State Muted
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, FLASHING, OFF]
- id: set_led_state_unmuted
  label: Set LED State Unmuted
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, FLASHING, OFF]
- id: set_dev_led_in_state
  label: Set Device LED In State
  kind: action
  params:
    - name: sts
      type: enum
      values: [OFF, ON]
- id: set_peq
  label: Set PEQ Filter Enable
  kind: action
  params:
    - name: index
      type: integer
      description: Channel index (0 = all channels)
    - name: filter
      type: integer
      description: Filter number (0 = all filters)
    - name: sts
      type: enum
      values: [ON, OFF, TOGGLE]
- id: set_bypass_all_eq
  label: Bypass All EQ
  kind: action
  params:
    - name: sts
      type: enum
      values: [ON, OFF, TOGGLE]
- id: set_bypass_imx
  label: Bypass IntelliMix
  kind: action
  params:
    - name: sts
      type: enum
      values: [ON, OFF, TOGGLE]
- id: set_eq_contour
  label: Set EQ Contour
  kind: action
  params:
    - name: sts
      type: enum
      values: [OFF, LOWSHELF]
- id: set_reboot
  label: Reboot Device
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: rep_all
  label: All Properties Response
  type: string
- id: rep_model
  label: Model Response
  type: string
- id: rep_serial_num
  label: Serial Number Response
  type: string
- id: rep_fw_ver
  label: Firmware Version Response
  type: string
- id: rep_ip_addr_net_audio_primary
  label: Primary Audio Network IP Response
  type: string
- id: rep_ip_subnet_net_audio_primary
  label: Primary Audio Network Subnet Mask Response
  type: string
- id: rep_ip_gateway_net_audio_primary
  label: Primary Audio Network Gateway Response
  type: string
- id: rep_control_mac_addr
  label: Control MAC Address Response
  type: string
- id: rep_device_id
  label: Device ID Response
  type: string
- id: rep_na_device_name
  label: Dante Device Name Response
  type: string
- id: rep_chan_name
  label: Channel Name Response
  type: string
- id: rep_na_chan_name
  label: Dante Channel Name Response
  type: string
- id: rep_flash
  label: Flash LED Response
  type: enum
  values: [ON, OFF]
- id: rep_default_settings
  label: Restore Default Settings Response
  type: string
- id: rep_preset
  label: Preset Response
  type: string
- id: rep_preset_name
  label: Preset Name Response
  type: string
- id: rep_encryption
  label: Encryption Status Response
  type: enum
  values: [ON, OFF]
- id: rep_device_installation
  label: Device Installation Response
  type: enum
  values: [CEILING, WALL_HORIZONTAL, WALL_VERTICAL, TABLE]
- id: rep_audio_out_clip_indicator
  label: Audio Clip Indicator Response
  type: enum
  values: [OFF, ON]
- id: rep_audio_gain_hi_res
  label: Audio Gain (Digital) Response
  type: integer
- id: rep_audio_gain_postgate
  label: Audio Gain Postgate Response
  type: integer
- id: rep_audio_in_rms_lvl
  label: Audio Level RMS Response
  type: integer
- id: rep_audio_in_peak_lvl
  label: Audio Level Peak Response
  type: integer
- id: rep_device_audio_mute
  label: Device Mute Response
  type: enum
  values: [ON, OFF]
- id: rep_audio_mute
  label: Channel Mute Response
  type: enum
  values: [ON, OFF]
- id: rep_num_active_mics
  label: Active Mic Channels Response
  type: integer
- id: rep_chan_automix_solo_en
  label: Solo Channel to Automix Response
  type: enum
  values: [ENABLE, DISABLE]
- id: rep_automix_gate_out_ext_sig
  label: Automixer Gate Out Status for Lobes Response
  type: enum
  values: [ON, OFF]
- id: rep_beam_angle
  label: Lobe Beam Angle Response
  type: integer
- id: rep_beam_w
  label: Lobe Beam Width Response
  type: enum
  values: [NARROW, MEDIUM, WIDE]
- id: rep_speech_gating
  label: Speech Gating Response
  type: enum
  values: [ON, OFF]
- id: rep_noise_filter
  label: Enhanced Noise Filtering Response
  type: enum
  values: [ON, OFF]
- id: rep_autofocus
  label: Autofocus Response
  type: enum
  values: [ON, OFF]
- id: rep_meter_rate
  label: Metering Rate Response
  type: integer
- id: rep_meter_rate_postgate
  label: Post-Gate Metering Rate Response
  type: integer
- id: rep_meter_rate_mxr_gain
  label: Automixer Gain Metering Rate Response
  type: integer
- id: rep_meter_rate_aecref
  label: AEC Reference Metering Rate Response
  type: integer
- id: rep_err
  label: Error Response
  type: string
- id: rep_dev_mute_status_led_state
  label: Mute LED State Response
  type: enum
  values: [ON, OFF]
- id: rep_led_brightness
  label: LED Brightness Response
  type: integer
- id: rep_led_color_unmuted
  label: LED Color Unmuted Response
  type: enum
  values: [RED, ORANGE, GOLD, YELLOW, YELLOWGREEN, GREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, BLUE, PURPLE, LIGHTPURPLE, VIOLET, ORCHID, PINK, WHITE]
- id: rep_led_color_muted
  label: LED Color Muted Response
  type: enum
  values: [RED, ORANGE, GOLD, YELLOW, YELLOWGREEN, GREEN, TURQUOISE, POWDERBLUE, CYAN, SKYBLUE, BLUE, PURPLE, LIGHTPURPLE, VIOLET, ORCHID, PINK, WHITE]
- id: rep_led_state_muted
  label: LED State Muted Response
  type: enum
  values: [ON, FLASHING, OFF]
- id: rep_led_state_unmuted
  label: LED State Unmuted Response
  type: enum
  values: [ON, FLASHING, OFF]
- id: rep_dev_led_in_state
  label: Device LED In State Response
  type: enum
  values: [OFF, ON]
- id: rep_peq
  label: PEQ Filter Enable Response
  type: enum
  values: [ON, OFF, TOGGLE]
- id: rep_bypass_all_eq
  label: Bypass All EQ Response
  type: enum
  values: [ON, OFF, TOGGLE]
- id: rep_bypass_imx
  label: Bypass IntelliMix Response
  type: enum
  values: [ON, OFF, TOGGLE]
- id: rep_eq_contour
  label: EQ Contour Response
  type: enum
  values: [OFF, LOWSHELF]
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside action scope identified beyond those in Actions
```

## Events
```yaml
- id: sample
  label: Audio Levels Sample
  params:
    - name: aaa
      type: integer
      description: Audio level 000-060 for channel 1
    - name: bbb
      type: integer
      description: Audio level 000-060 for channel 2
    - name: ccc
      type: integer
      description: Audio level 000-060 for channel 3
    - name: ddd
      type: integer
      description: Audio level 000-060 for channel 4
- id: sample_postgate
  label: Post-Gate Audio Levels Sample
  params:
    - name: aaa
      type: integer
    - name: bbb
      type: integer
    - name: ccc
      type: integer
    - name: ddd
      type: integer
- id: sample_mxr_gain
  label: Automixer Gain Metering Sample
  params:
    - name: aaa
      type: integer
    - name: bbb
      type: integer
    - name: ccc
      type: integer
    - name: ddd
      type: integer
- id: sample_aecref
  label: AEC Reference Audio Level Sample
  params:
    - name: aaa
      type: integer
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
<!-- UNRESOLVED: no safety warnings or interlock procedures in source -->
```

## Notes
Connection: TCP/IP on port 2202. Telnet negotiation must be disabled or passive on client. First command via PuTTY may return error — resend to resolve.

Channel assignments differ by model:
- MXA710-2FT: Dante outputs 1-4, automixer output 5, post-gate channels 1-4
- MXA710-4FT: Dante outputs 1-8, automixer output 9, post-gate channels 1-8

Audio gain (AUDIO_GAIN_HI_RES) range: 0-1400 representing -110.0 dB to 30.0 dB, scaled as (value * 10) + 1100.

Audio level metering values 000-060 represent -60 to 0 dBFS.

REBOOT command does not send acknowledgement.
<!-- UNRESOLVED: Dante audio transport protocol details, device password/encryption key management, precise firmware version compatibility -->

## Provenance

```yaml
source_domains:
  - shure.com
  - content-files.shure.com
  - pubs.shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/MXN5-C
  - https://content-files.shure.com/KnowledgeBaseFiles/dfr22_rs232.pdf
  - https://content-files.shure.com/KnowledgeBaseFiles/p4800_rs232_commands.pdf
  - https://pubs.shure.com/command-strings/MXW/en-US
  - https://www.shure.com/en-US/docs/commandstrings/P300
retrieved_at: 2026-04-30T13:38:16.296Z
last_checked_at: 2026-05-18T17:04:26.397Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T17:04:26.397Z
matched_actions: 49
action_count: 49
confidence: high
summary: "All 49 spec actions matched verbatim in source; transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
