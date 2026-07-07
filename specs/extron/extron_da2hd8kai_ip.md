---
spec_id: admin/extron-da2-hd-8k-ae
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DA2 HD 8K AE Control Spec"
manufacturer: Extron
model_family: "DA2 HD 8K AE"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DA2 HD 8K AE"
    - "DA2 HD 8K AI"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/da2_hd_8k_ae_ai_68-3732-01_A.pdf
  - https://www.extron.com/download/files/userman/da2_hd_8k_ae_ai_68-3732-50_A.pdf
retrieved_at: 2026-07-01T01:24:36.557Z
last_checked_at: 2026-07-07T11:36:53.284Z
generated_at: 2026-07-07T11:36:53.284Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no IP/TCP transport documented in source. Spec covers USB-C SIS only."
  - "no safety warnings or interlock procedures documented in source."
  - "no IP/Ethernet control protocol documented in source. Known protocol field \"TCP/IP\" in input likely incorrect — source covers USB-C SIS only. Firmware version not stated. Port number, baud rate, parity inferred from Extron SIS convention (not stated in this excerpt)."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:36:53.284Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions matched literal SIS commands in source; transport parameters are Extron SIS standard; full command catalogue represented. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Extron DA2 HD 8K AE Control Spec

## Summary
The Extron DA2 HD 8K AE and DA2 HD 8K AI are 1-input / 2-output HDMI distribution amplifiers supporting 8K signals up to 40.1 Gbps. This spec covers SIS (Simple Instruction Set) commands over the front panel USB-C configuration port, including signal/HDCP status queries, video mute, output HDCP mode, TMDS format, color bit depth, 5V hot-plug mode, HDCP notification, audio mute, analog audio gain, audio input format, and unit identity.

<!-- UNRESOLVED: no IP/TCP transport documented in source. Spec covers USB-C SIS only. -->

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
- queryable       # inferred from query command examples
- levelable       # inferred from analog audio gain control
```

## Actions
```yaml
- id: signal_status
  label: Input and Output Signal Status
  kind: query
  command: "E OLS↵"
- id: input_hdcp_status
  label: Input HDCP Status
  kind: query
  command: "E IHDCP↵"
- id: output_hdcp_status
  label: Output HDCP Status
  kind: query
  command: "E OHDCP↵"
- id: output_hdcp_encryption_status
  label: View Output HDCP Encryption Status
  kind: query
  command: "E B {output} HDCP↵"
  params:
    - name: output
      type: integer
      description: Output number (1-3; 3 = analog on AE model)

- id: video_mute
  label: Mute Individual Output (Video)
  kind: action
  command: "{output}*{mode}B Vmt↵"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: mode
      type: integer
      description: "0=disabled, 1=TMDS video mute, 2=video+sync mute"
- id: video_mute_all
  label: Video Mute All Outputs
  kind: action
  command: "{mode}B Vmt↵"
  params:
    - name: mode
      type: integer
      description: "0=disabled, 1=TMDS video mute, 2=video+sync mute"
- id: video_mute_status
  label: View Video Mute Status
  kind: query
  command: "B↵"

- id: input_hdcp_authorized
  label: Set HDCP Authorization
  kind: action
  command: "E E {status} HDCP↵"
  params:
    - name: status
      type: integer
      description: "0=disabled, 1=enabled (default)"
- id: input_hdcp_authorized_view
  label: View HDCP Authorization Status
  kind: query
  command: "E EHDCP↵"

- id: output_hdcp_mode
  label: Set Output HDCP Mode (per output)
  kind: action
  command: "E S {output}*{mode} HDCP↵"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: mode
      type: integer
      description: "1=follow input (default), 2=always encrypt with DVI trials"
- id: output_hdcp_mode_all
  label: Set Output HDCP Mode (all outputs)
  kind: action
  command: "E S {mode} HDCP↵"
  params:
    - name: mode
      type: integer
      description: "1=follow input (default), 2=always encrypt with DVI trials"
- id: output_hdcp_mode_view
  label: View Output HDCP Mode Status
  kind: query
  command: "E SHDCP↵"

- id: output_tmds_format
  label: Set Output TMDS Format (per output)
  kind: action
  command: "E {output}*{format} VTPO↵"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: format
      type: integer
      description: "1=auto (default), 2=DVI RGB 4:4:4, 3=HDMI RGB 4:4:4 Full, 4=HDMI RGB 4:4:4 Limited, 5=HDMI YUV 4:4:4 Limited, 6=HDMI YUV 4:2:2 Limited, 7=HDMI YUV 4:2:0 Limited"
- id: output_tmds_format_all
  label: Set Output TMDS Format (all outputs)
  kind: action
  command: "E {format} VTPO↵"
  params:
    - name: format
      type: integer
      description: "1=auto (default), 2=DVI RGB 4:4:4, 3=HDMI RGB 4:4:4 Full, 4=HDMI RGB 4:4:4 Limited, 5=HDMI YUV 4:4:4 Limited, 6=HDMI YUV 4:2:2 Limited, 7=HDMI YUV 4:2:0 Limited"
- id: output_tmds_format_view
  label: View Output TMDS Format Status
  kind: query
  command: "E VTPO↵"

- id: output_color_bit_depth
  label: Set Output Color Bit Depth (per output)
  kind: action
  command: "E V {output}*{depth} BITD↵"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: depth
      type: integer
      description: "0=auto based on sink EDID (default), 1=force 8-bit"
- id: output_color_bit_depth_all
  label: Set Output Color Bit Depth (all outputs)
  kind: action
  command: "E V {depth} BITD↵"
  params:
    - name: depth
      type: integer
      description: "0=auto based on sink EDID (default), 1=force 8-bit"
- id: output_color_bit_depth_view
  label: View Output Color Bit Depth Status
  kind: query
  command: "E VBITD↵"

- id: output_5v_mode
  label: Set Output 5V Mode (per output)
  kind: action
  command: "E M {output}*{mode} HPLG↵"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: mode
      type: integer
      description: "1=auto, 2=always enabled (default)"
- id: output_5v_mode_all
  label: Set Output 5V Mode (all outputs)
  kind: action
  command: "E M {mode} HPLG↵"
  params:
    - name: mode
      type: integer
      description: "1=auto, 2=always enabled (default)"
- id: output_5v_mode_view
  label: View Output 5V Mode Status
  kind: query
  command: "E MHPLG↵"

- id: hdcp_notification
  label: Set HDCP Notification (per output)
  kind: action
  command: "E N {output}*{status} HDCP↵"
  params:
    - name: output
      type: integer
      description: Output number (1-2)
    - name: status
      type: integer
      description: "0=disabled, 1=enabled (default)"
- id: hdcp_notification_all
  label: Set HDCP Notification (all outputs)
  kind: action
  command: "E N {status} HDCP↵"
  params:
    - name: status
      type: integer
      description: "0=disabled, 1=enabled (default)"
- id: hdcp_notification_view
  label: View HDCP Notification Status
  kind: query
  command: "E NHDCP↵"

- id: audio_mute
  label: Mute Individual Output (Audio)
  kind: action
  command: "{output}*{status}Z↵"
  params:
    - name: output
      type: integer
      description: Output number (1-3; 3=analog on AE model)
    - name: status
      type: integer
      description: "0=unmuted (default), 1=muted"
- id: audio_mute_all
  label: Mute All Outputs (Audio)
  kind: action
  command: "{status}Z↵"
  params:
    - name: status
      type: integer
      description: "0=unmuted (default), 1=muted"
- id: audio_mute_status
  label: View Audio Mute Status
  kind: query
  command: "Z↵"

- id: analog_audio_gain_set
  label: Set Analog Audio Input Gain (AI only)
  kind: action
  command: "{gain}G↵"
  params:
    - name: gain
      type: integer
      description: Gain in dB, -18 to +24 in 1dB steps (default 0)
- id: analog_audio_gain_inc
  label: Increment Analog Audio Gain (AI only)
  kind: action
  command: "+G↵"
- id: analog_audio_gain_dec
  label: Decrement Analog Audio Gain (AI only)
  kind: action
  command: "-G↵"
- id: analog_audio_gain_view
  label: View Analog Audio Gain (AI only)
  kind: query
  command: "G↵"

- id: audio_input_format_set
  label: Set Audio Input Format (AI only)
  kind: action
  command: "E I {format} AFMT↵"
  params:
    - name: format
      type: integer
      description: "0=pass embedded digital audio, 1=embed analog audio (default)"
- id: audio_input_format_view
  label: View Audio Input Format (AI only)
  kind: query
  command: "E I AFMT↵"

- id: audio_output_mode_set
  label: Set Audio Output Mode (AE only)
  kind: action
  command: "E S {mode} AFMT↵"
  params:
    - name: mode
      type: integer
      description: "1=stereo (default), 2=dual mono"
- id: audio_output_mode_view
  label: View Audio Output Mode (AE only)
  kind: query
  command: "E S AFMT↵"

- id: audio_input_status
  label: View Audio Input Status
  kind: query
  command: "1S↵"

- id: verbose_mode_set
  label: Set Verbose Mode
  kind: action
  command: "E {mode} CV↵"
  params:
    - name: mode
      type: integer
      description: "0=clear/none, 1=verbose (default), 2=tagged query responses, 3=verbose + tagged"
- id: verbose_mode_view
  label: View Verbose Mode
  kind: query
  command: "E CV↵"

- id: unit_name_set
  label: Set Unit Name
  kind: action
  command: "E {name} CN↵"
  params:
    - name: name
      type: string
      description: Unit name (up to 24 chars, alphanumeric and hyphens, default DA2-HD-8K)
- id: unit_name_reset
  label: Reset Unit Name to Factory Default
  kind: action
  command: "E •CN↵"
- id: unit_name_view
  label: View Unit Name
  kind: query
  command: "E CN↵"

- id: part_number_view
  label: View Unit Part Number
  kind: query
  command: "N↵"
- id: information
  label: Information (Audio, Signal, HDCP Status)
  kind: query
  command: "I↵"
- id: model_name
  label: Request Model Name
  kind: query
  command: "1I/i↵"
- id: model_description
  label: Request Model Description
  kind: query
  command: "2I/i↵"
- id: firmware_version
  label: View Firmware Version
  kind: query
  command: "Q↵"
- id: firmware_version_build
  label: View Firmware Version With Build
  kind: query
  command: "*Q↵"
- id: firmware_version_detailed
  label: View Detailed Firmware Versions
  kind: query
  command: "0Q↵"
- id: firmware_build_special
  label: View Build With Any Special Build Text
  kind: query
  command: "20Q↵"

- id: reset_factory
  label: Reset Device to Factory Default
  kind: action
  command: "E ZXXX↵"
- id: reboot
  label: Reboot System
  kind: action
  command: "E 1BOOT↵"
```

## Feedbacks
```yaml
- id: signal_status_input
  type: enum
  values: [undetected, detected]
- id: signal_status_outputs
  type: enum
  values: [undetected, detected]
- id: input_hdcp_status
  type: enum
  values: [no_source, source_no_hdcp, source_with_hdcp]
- id: output_hdcp_status
  type: enum
  values: [no_sink, sink_unencrypted, sink_encrypted]
- id: video_mute
  type: enum
  values: [disabled, tmds_muted, video_and_sync_muted]
- id: audio_mute
  type: enum
  values: [unmuted, muted]
- id: audio_input_status
  type: enum
  values: [none, lpcm_2ch, ac3_dts_bitstream, other]
- id: firmware_version
  type: string
- id: part_number
  type: string
```

## Variables
```yaml
- name: hdcp_authorization
  type: integer
  description: 0=disabled, 1=enabled (default)
- name: output_hdcp_mode
  type: integer
  description: "1=follow input (default), 2=always encrypt with DVI trials"
- name: output_tmds_format
  type: integer
  description: "1=auto (default), 2=DVI RGB 4:4:4, 3=HDMI RGB 4:4:4 Full, 4=HDMI RGB 4:4:4 Limited, 5=HDMI YUV 4:4:4 Limited, 6=HDMI YUV 4:2:2 Limited, 7=HDMI YUV 4:2:0 Limited"
- name: output_color_bit_depth
  type: integer
  description: "0=auto (default), 1=force 8-bit"
- name: output_5v_mode
  type: integer
  description: "1=auto, 2=always enabled (default)"
- name: hdcp_notification
  type: integer
  description: "0=disabled, 1=enabled (default)"
- name: analog_audio_gain
  type: integer
  description: Gain in dB, -18 to +24 in 1dB steps (default 0)
- name: audio_input_format
  type: integer
  description: "0=pass embedded digital audio, 1=embed analog audio (default)"
- name: audio_output_mode
  type: integer
  description: "1=stereo (default), 2=dual mono"
- name: verbose_mode
  type: integer
  description: "0=clear/none, 1=verbose (default), 2=tagged query responses, 3=verbose + tagged"
- name: unit_name
  type: string
  description: Up to 24 chars, alphanumeric and hyphens, default DA2-HD-8K
```

## Events
```yaml
- id: signal_change
  description: Broadcast when signal status changes on any input or output
  payload: "Sig X#*X#•X#•X#↵"
- id: input_hdcp_change
  description: Broadcast when HDCP status changes on the input
  payload: "HdcpI X1@↵"
- id: output_hdcp_change
  description: Broadcast when HDCP status changes on any output
  payload: "HdcpO X1#•X1#↵"
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures documented in source.
```

## Notes
SIS commands sent over front panel USB-C configuration port. Responses terminate with CR/LF (`↵`). Command characters can be upper or lower case. 10-second inter-character timeout aborts command. Device power-up message: `© Copyright 2024, Extron, DA2 HD 8K AE (AI), V.xx, 60-xxxx-01↵`. Error codes: E10 (invalid command), E13 (invalid parameter), E14 (invalid for this configuration), E17 (invalid command for signal type). DA2 HD 8K AE differs from AI: AE extracts analog audio from HDMI; AI embeds analog audio onto HDMI. Some commands (analog gain, audio input format) are AI-only; some (audio output mode) are AE-only.

<!-- UNRESOLVED: no IP/Ethernet control protocol documented in source. Known protocol field "TCP/IP" in input likely incorrect — source covers USB-C SIS only. Firmware version not stated. Port number, baud rate, parity inferred from Extron SIS convention (not stated in this excerpt). -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/da2_hd_8k_ae_ai_68-3732-01_A.pdf
  - https://www.extron.com/download/files/userman/da2_hd_8k_ae_ai_68-3732-50_A.pdf
retrieved_at: 2026-07-01T01:24:36.557Z
last_checked_at: 2026-07-07T11:36:53.284Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:36:53.284Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions matched literal SIS commands in source; transport parameters are Extron SIS standard; full command catalogue represented. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no IP/TCP transport documented in source. Spec covers USB-C SIS only."
- "no safety warnings or interlock procedures documented in source."
- "no IP/Ethernet control protocol documented in source. Known protocol field \"TCP/IP\" in input likely incorrect — source covers USB-C SIS only. Firmware version not stated. Port number, baud rate, parity inferred from Extron SIS convention (not stated in this excerpt)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
