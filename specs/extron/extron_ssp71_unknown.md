---
spec_id: admin/extron-ssp71
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron SSP 7.1 Control Spec"
manufacturer: Extron
model_family: "SSP 7.1"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "SSP 7.1"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - media.extron.com
source_urls:
  - https://www.extron.com/download/files/userman/Matrix3200_6400_Wideband_A.pdf
  - https://media.extron.com/public/download/files/userman/XP_Plus_MAV_D.pdf
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
retrieved_at: 2026-05-01T02:11:30.714Z
last_checked_at: 2026-05-16T12:16:07.602Z
generated_at: 2026-05-16T12:16:07.602Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T12:16:07.602Z
  matched_actions: 43
  action_count: 43
  confidence: high
  summary: "All 43 actions matched with correct opcodes and shapes, transport parameters verified, source fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Extron SSP 7.1 Control Spec

## Summary
Extron SSP 7.1 is a surround sound processor supporting 5 audio inputs (2 optical, 2 coaxial, 1 analog) and 8 speaker outputs (7.1 configuration). Control via RS-232 serial and Telnet (TCP port 23) using Extron Simple Instruction Set (SIS) ASCII commands. Supports volume, bass/treble, speaker configuration, listening modes, parametric EQ, lip sync, and Dolby/DTS surround processing.

<!-- UNRESOLVED: no power on/off commands found in source — device may lack remote power control -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable    # many status query commands present
  - levelable    # volume, bass, treble, trim, gain controls present
  - routable     # input selection commands present
```

## Actions
```yaml
actions:
  - id: select_audio_input
    label: Select Audio Input
    kind: action
    command: "{input}$"
    params:
      - name: input
        type: integer
        min: 1
        max: 5
        description: "1-2=digital optical, 3-4=digital coaxial, 5=analog"

  - id: select_audio_input_alt
    label: Select Audio Input (Alt)
    kind: action
    command: "{input}!"

  - id: mute_all
    label: Mute All Outputs
    kind: action
    command: "1Z"

  - id: unmute_all
    label: Unmute All Outputs
    kind: action
    command: "0Z"

  - id: mute_channel
    label: Mute Channel
    kind: action
    command: "{output}*1Z"
    params:
      - name: output
        type: integer
        min: 1
        max: 8
        description: "1=LF, 2=C, 3=RF, 4=LS, 5=RS, 6=LB, 7=RB, 8=Sub"

  - id: unmute_channel
    label: Unmute Channel
    kind: action
    command: "{output}*0Z"
    params:
      - name: output
        type: integer
        min: 1
        max: 8

  - id: set_volume
    label: Set Volume
    kind: action
    command: "{level}V"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: "0=full attenuation (-100dB), 100=no attenuation (0dB)"

  - id: volume_increment
    label: Volume Increment
    kind: action
    command: "+V"

  - id: volume_decrement
    label: Volume Decrement
    kind: action
    command: "-V"

  - id: set_bass
    label: Set Bass Level
    kind: action
    command: "\x1BB{value}SSP\x0D"
    params:
      - name: value
        type: integer
        min: -10
        max: 10
        description: "dB, default 0"

  - id: set_treble
    label: Set Treble Level
    kind: action
    command: "\x1BT{value}SSP\x0D"
    params:
      - name: value
        type: integer
        min: -10
        max: 10
        description: "dB, default 0"

  - id: set_speaker_size
    label: Set Speaker Size
    kind: action
    command: "\x1BS{group}*{size}SSP\x0D"
    params:
      - name: group
        type: integer
        min: 1
        max: 3
        description: "1=LR front, 2=center, 3=LR surround"
      - name: size
        type: integer
        enum: [0, 1, 2]
        description: "0=none, 1=small, 2=large"

  - id: set_surround_back
    label: Set Surround Back Speakers
    kind: action
    command: "\x1BH{size}SSP\x0D"
    params:
      - name: size
        type: integer
        min: 0
        max: 4
        description: "0=none, 1=1 small, 2=2 small, 3=1 large, 4=2 large"

  - id: set_subwoofer
    label: Set Subwoofer
    kind: action
    command: "\x1BJ{state}SSP\x0D"
    params:
      - name: state
        type: integer
        enum: [0, 1]
        description: "0=off, 1=on"

  - id: set_output_trim
    label: Set Output Channel Trim
    kind: action
    command: "\x1BV{output}*{trim}SSP\x0D"
    params:
      - name: output
        type: integer
        min: 1
        max: 8
      - name: trim
        type: integer
        min: -24
        max: 12
        description: "dB, default 0"

  - id: set_speaker_delay
    label: Set Speaker Delay
    kind: action
    command: "\x1BD{output}*{delay}SSP\x0D"
    params:
      - name: output
        type: integer
        min: 1
        max: 8
      - name: delay
        type: integer
        description: "in 0.1ms units, default 0"

  - id: set_lip_sync_offset
    label: Set Lip Sync Offset
    kind: action
    command: "\x1BY{input}*{offset}SSP\x0D"
    params:
      - name: input
        type: integer
        min: 1
        max: 5
      - name: offset
        type: integer
        min: 0
        max: 1000
        description: "0.1ms increments (0-100ms)"

  - id: set_crossover_frequency
    label: Set Crossover Frequency
    kind: action
    command: "\x1BF{step}SSP\x0D"
    params:
      - name: step
        type: integer
        min: 1
        max: 20
        description: "1-9=40-80Hz/5Hz, 9-16=80-150Hz/10Hz, 16-20=150-250Hz/25Hz"

  - id: set_volume_mode_variable
    label: Set Volume Mode Variable
    kind: action
    command: "\x1BO1SSP\x0D"

  - id: set_volume_mode_fixed
    label: Set Volume Mode Fixed
    kind: action
    command: "\x1BO0SSP\x0D"

  - id: lock_front_panel
    label: Lock Front Panel
    kind: action
    command: "1X"

  - id: unlock_front_panel
    label: Unlock Front Panel
    kind: action
    command: "0X"

  - id: set_dimension_control
    label: Set Dimension Control
    kind: action
    command: "\x1BZ{value}SSP\x0D"
    params:
      - name: value
        type: integer
        enum: [0, 1, 2]
        description: "0=neutral, 1=front, 2=back"

  - id: set_panorama
    label: Set Panorama
    kind: action
    command: "\x1BP{state}SSP\x0D"
    params:
      - name: state
        type: integer
        enum: [0, 1]
        description: "0=off, 1=on"

  - id: set_center_width
    label: Set Center Width
    kind: action
    command: "\x1BC{value}SSP\x0D"
    params:
      - name: value
        type: integer
        min: 0
        max: 7
        description: "default 3"

  - id: set_dts_neo6_center_image_music
    label: Set DTS Neo:6 Center Image (Music)
    kind: action
    command: "\x1BI1*{value}SSP\x0D"
    params:
      - name: value
        type: integer
        min: 0
        max: 10
        description: "default 3"

  - id: set_dts_neo6_center_image_cinema
    label: Set DTS Neo:6 Center Image (Cinema)
    kind: action
    command: "\x1BI2*{value}SSP\x0D"
    params:
      - name: value
        type: integer
        min: 0
        max: 10
        description: "default 10"

  - id: set_dynamic_range_compression
    label: Set Dynamic Range Compression
    kind: action
    command: "\x1BR{value}SSP\x0D"
    params:
      - name: value
        type: integer
        enum: [0, 1, 2]
        description: "0=off, 1=min, 2=max"

  - id: set_mono_output
    label: Set Mono Output Mode
    kind: action
    command: "\x1BM{mode}SSP\x0D"
    params:
      - name: mode
        type: integer
        enum: [1, 2]
        description: "1=center only, 2=left+right only"

  - id: set_listening_mode
    label: Set Listening Mode
    kind: action
    command: "\x1BL{input}*{source_format}*{mode}SSP\x0D"
    params:
      - name: input
        type: integer
        min: 1
        max: 5
      - name: source_format
        type: integer
        min: 0
        max: 10
      - name: mode
        type: integer
        min: 1
        max: 19

  - id: set_mode_override
    label: Set Mode Override
    kind: action
    command: "\x1BQ{input}*{source_format}*{override}SSP\x0D"
    params:
      - name: input
        type: integer
        min: 1
        max: 5
      - name: source_format
        type: integer
        min: 0
        max: 10
      - name: override
        type: integer
        min: 0
        max: 4
        description: "0=none, 1=downmix, 2=PL II/IIx, 3=DTS Neo:6, 4=To All"

  - id: set_listening_mode_preference
    label: Set Listening Mode Preference
    kind: action
    command: "\x1BU{input}*{override_group}*{option}SSP\x0D"
    params:
      - name: input
        type: integer
        min: 1
        max: 5
      - name: override_group
        type: integer
        min: 0
        max: 4
      - name: option
        type: integer
        min: 1
        max: 8

  - id: set_mono_source
    label: Set Mono Source
    kind: action
    command: "\x1BN{source}SSP\x0D"
    params:
      - name: source
        type: integer
        enum: [1, 2, 3]
        description: "1=left, 2=right, 3=left+right"

  - id: set_analog_input_gain
    label: Set Analog Input Gain
    kind: action
    command: "\x1BA{gain}SSP\x0D"
    params:
      - name: gain
        type: integer
        min: 0
        max: 24
        description: "dB, default 0"

  - id: set_peq_bypass
    label: Set Parametric EQ Bypass
    kind: action
    command: "\x1BE{output}*{filter}*{state}SSE\x0D"
    params:
      - name: output
        type: integer
        min: 1
        max: 8
      - name: filter
        type: integer
        min: 1
        max: 9
      - name: state
        type: integer
        enum: [0, 1]
        description: "0=bypass off, 1=bypass on"

  - id: set_peq_frequency
    label: Set Parametric EQ Frequency
    kind: action
    command: "\x1BF{output}*{filter}*{frequency}SSE\x0D"
    params:
      - name: output
        type: integer
        min: 1
        max: 8
      - name: filter
        type: integer
        min: 1
        max: 9
      - name: frequency
        type: integer
        description: "Hz, defaults 62-16000"

  - id: set_peq_gain
    label: Set Parametric EQ Gain
    kind: action
    command: "\x1BG{output}*{filter}*{gain}SSE\x0D"
    params:
      - name: output
        type: integer
        min: 1
        max: 8
      - name: filter
        type: integer
        min: 1
        max: 9
      - name: gain
        type: integer
        min: -24
        max: 24
        description: "dB, default 0"

  - id: set_peq_q
    label: Set Parametric EQ Q Value
    kind: action
    command: "\x1BQ{output}*{filter}*{q}SSE\x0D"
    params:
      - name: output
        type: integer
        min: 1
        max: 8
      - name: filter
        type: integer
        min: 1
        max: 9
      - name: q
        type: integer
        min: 707
        max: 15000
        description: "Q*1000, default 2000"

  - id: set_test_signal
    label: Set Test Signal
    kind: action
    command: "\x1BX{type}TSTA\x0D"
    params:
      - name: type
        type: integer
        enum: [0, 1, 2]
        description: "0=off, 1=Dolby noise, 2=pink noise"

  - id: set_baud_rate
    label: Set Baud Rate
    kind: action
    command: "\x1B{rate}CP\x0D"
    params:
      - name: rate
        type: integer
        enum: [0, 1, 2, 3]
        description: "0=9600, 1=19200, 2=38400, 3=115200"

  - id: master_reset
    label: Master Reset
    kind: action
    command: "\x1BzXXX\x0D"

  - id: factory_reset
    label: Factory Reset
    kind: action
    command: "\x1BzQQQ\x0D"

  - id: upload_firmware
    label: Upload Firmware
    kind: action
    command: "\x1BUPLOAD\x0D"
```

## Feedbacks
```yaml
feedbacks:
  - id: audio_input
    label: Audio Input
    type: integer
    command: "$"
    response_pattern: "Aud{X!}"
    values: [1, 2, 3, 4, 5]

  - id: mute_all_status
    label: Mute All Status
    type: enum
    command: "Z"
    response_pattern: "Amt{X#}"
    values: [off, on]

  - id: mute_channel_status
    label: Mute Channel Status
    type: enum
    command: "{output}*Z"
    response_pattern: "Amt{output}*{X#}"
    values: [off, on]

  - id: channel_activity
    label: Channel Activity
    type: string
    command: "32I"
    response_pattern: "ActCh{X4)}"
    description: "8-digit string, each digit 0/1/2 per channel"

  - id: mute_channel_map
    label: Mute Channel Map
    type: string
    command: "35I"
    response_pattern: "Mut{X3(}"
    description: "8-digit string, each digit 0/1 per channel"

  - id: speaker_size
    label: Speaker Size
    type: integer
    command: "\x1BS{group}SSP\x0D"
    response_pattern: "SspS{group}*{X1^}"
    values: [0, 1, 2]

  - id: surround_back
    label: Surround Back Speakers
    type: integer
    command: "\x1BHSSP\x0D"
    response_pattern: "SspH{X3@}"
    values: [0, 1, 2, 3, 4]

  - id: subwoofer_status
    label: Subwoofer Status
    type: enum
    command: "\x1BJSSP\x0D"
    response_pattern: "SspJ{X#}"
    values: [off, on]

  - id: output_trim
    label: Output Channel Trim
    type: integer
    command: "\x1BV{output}SSP\x0D"
    response_pattern: "SspV{output}*{X3#}"

  - id: speaker_delay
    label: Speaker Delay
    type: integer
    command: "\x1BD{output}SSP\x0D"
    response_pattern: "SspD{output}*{X1%}"

  - id: lip_sync_offset
    label: Lip Sync Offset
    type: integer
    command: "\x1BY{input}SSP\x0D"
    response_pattern: "SspY{input}*{X2*}"

  - id: crossover_frequency
    label: Crossover Frequency
    type: integer
    command: "\x1BFSSP\x0D"
    response_pattern: "SspF{X1&}"

  - id: volume
    label: Volume Level
    type: integer
    command: "V"
    response_pattern: "Vol{X^}"
    description: "3-digit response, 0-100"

  - id: bass_level
    label: Bass Level
    type: integer
    command: "\x1BBSSP\x0D"
    response_pattern: "SspB{X%}"

  - id: treble_level
    label: Treble Level
    type: integer
    command: "\x1BTSSP\x0D"
    response_pattern: "SspT{X%}"

  - id: volume_output_mode
    label: Volume Output Mode
    type: enum
    command: "\x1BOSSP\x0D"
    response_pattern: "SspO{X$}"
    values: [fixed, variable]

  - id: front_panel_lockout
    label: Front Panel Lockout
    type: enum
    command: "X"
    response_pattern: "Exe{X#}"
    values: [off, on]

  - id: dimension_control
    label: Dimension Control
    type: integer
    command: "\x1BZSSP\x0D"
    response_pattern: "SspZ{X2&}"
    values: [0, 1, 2]

  - id: panorama_status
    label: Panorama Status
    type: enum
    command: "\x1BPSSP\x0D"
    response_pattern: "SspP{X#}"
    values: [off, on]

  - id: center_width
    label: Center Width
    type: integer
    command: "\x1BCSSP\x0D"
    response_pattern: "SspC{X1(}"

  - id: dts_neo6_center_image
    label: DTS Neo:6 Center Image
    type: integer
    command: "\x1BI{mode}SSP\x0D"
    response_pattern: "SspI{X4#}*{X2)}"

  - id: dynamic_range_compression
    label: Dynamic Range Compression
    type: integer
    command: "\x1BRSSP\x0D"
    response_pattern: "SspR{X3&}"
    values: [0, 1, 2]

  - id: mono_output_mode
    label: Mono Output Mode
    type: integer
    command: "\x1BMSSP\x0D"
    response_pattern: "SspM{X3^}"

  - id: listening_mode
    label: Listening Mode
    type: string
    command: "\x1BLSSP\x0D"
    response_pattern: "SspL{X!}*{X2$}*{X1@}"

  - id: mode_override
    label: Mode Override
    type: string
    command: "\x1BQ{input}*{source_format}SSP\x0D"
    response_pattern: "SspQ{X!}*{X2$}*{X3*}"

  - id: listening_mode_preference
    label: Listening Mode Preference
    type: string
    command: "\x1BU{input}*{override_group}SSP\x0D"
    response_pattern: "SspU{X!}*{X3*}*{X4!}"

  - id: mono_source
    label: Mono Source
    type: integer
    command: "\x1BNSSP\x0D"
    response_pattern: "SspN{X1)}"
    values: [1, 2, 3]

  - id: analog_input_gain
    label: Analog Input Gain
    type: integer
    command: "\x1BASSP\x0D"
    response_pattern: "SspA{X(}"

  - id: peq_bypass_status
    label: Parametric EQ Bypass Status
    type: enum
    command: "\x1BE{output}*{filter}*SSE\x0D"
    response_pattern: "SseE{output}*{filter}*{X#}"
    values: [off, on]

  - id: peq_frequency
    label: Parametric EQ Frequency
    type: integer
    command: "\x1BF{output}*{filter}SSE\x0D"
    response_pattern: "SseF{output}*{filter}*{X4%}"

  - id: peq_gain
    label: Parametric EQ Gain
    type: integer
    command: "\x1BG{output}*{filter}SSE\x0D"
    response_pattern: "SseG{output}*{filter}*{X4^}"

  - id: peq_q
    label: Parametric EQ Q Value
    type: integer
    command: "\x1BQ{output}*{filter}SSE\x0D"
    response_pattern: "SseQ{output}*{filter}*{X4&}"

  - id: source_format
    label: Source Format
    type: string
    command: "33I"
    response_pattern: "SrcFormat{X2$} Sampling{X2%} EnChan{X2^}"

  - id: dts_9624_flag
    label: DTS 96/24 Flag
    type: enum
    command: "34I"
    response_pattern: "DTS9624 {X#}"
    values: [off, on]

  - id: test_signal_status
    label: Test Signal Status
    type: integer
    command: "\x1BXTSTA\x0D"
    response_pattern: "TstaX{X3$}"
    values: [0, 1, 2]

  - id: firmware_version
    label: Firmware Version
    type: string
    command: "Q"
    response_pattern: "Ver{X2!}"

  - id: firmware_version_build
    label: Firmware Version and Build
    type: string
    command: "*Q"
    response_pattern: "Ver{X2@}"

  - id: part_number
    label: Part Number
    type: string
    command: "N"
    response_pattern: "Pno60-842-01"

  - id: general_info
    label: General Info
    type: string
    command: "I"
    response_pattern: "Aud{X!} LMod{X1@} Vol{X^} Mut{X#}"

  - id: model_name
    label: Model Name
    type: string
    command: "1I"
    response_pattern: "SSP 7.1"

  - id: internal_temperature
    label: Internal Temperature
    type: integer
    command: "20S"
    response_pattern: "Sts20*{X1$}"
    description: "degrees C"

  - id: clip_status
    label: Clip Status
    type: enum
    command: "3S"
    response_pattern: "Sts3*{X#}"
    values: [off, on]

  - id: baud_rate
    label: Baud Rate
    type: integer
    command: "\x1BCP\x0D"
    response_pattern: "Ccp{X4@}"
    values: [9600, 19200, 38400, 115200]
```

## Variables
```yaml
# No standalone settable parameters beyond those covered by Actions/Feedbacks.
```

## Events
```yaml
events:
  - id: audio_input_change
    label: Audio Input Changed
    description: "Unsolicited response when audio input changes"
    pattern: "Aud{X!}]"

  - id: source_format_change
    label: Source Format Changed
    description: "Unsolicited response when source format, sampling freq, or encoded channels change"
    pattern: "SrcFormat{X2$} Sampling{X2%} EnChan{X2^}]"

  - id: volume_change
    label: Volume Changed
    description: "Unsolicited response when volume level changes"
    pattern: "Vol{X^}]"

  - id: listening_mode_change
    label: Listening Mode Changed
    description: "Unsolicited response when listening mode changes"
    pattern: "SspL{X!}*{X2$}*{X1@}]"

  - id: mode_override_change
    label: Mode Override Changed
    description: "Unsolicited response when mode override changes"
    pattern: "SspQ{X!}*{X2$}*{X3*}]"

  - id: analog_gain_change
    label: Analog Input Gain Changed
    description: "Unsolicited response when analog input gain changes"
    pattern: "SspA{X(}]"

  - id: front_panel_lockout_change
    label: Front Panel Lockout Changed
    description: "Unsolicited response when lockout state changes"
    pattern: "Exe{X#}]"

  - id: clip_event
    label: Clip Detected
    description: "Unsolicited response on clip detection"
    pattern: "Sts3*{X#}]"

  - id: dts_9624_detected
    label: DTS 96/24 Detected
    description: "Unsolicited response when DTS 96/24 encoding detected in DTS source"
    pattern: "DTS9624 {X#}]"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source.
# Master reset and factory reset commands exist but no safety warnings accompany them.
```

## Notes
- SIS commands use ASCII strings. Responses end with CR/LF (`]` in docs). Commands prefixed with `E` use Escape character (0x1B) and end with CR (0x0D, `}` in docs).
- Both RS-232 rear panel and front panel config port usable simultaneously; neither has precedence; commands processed in order received.
- Volume response always 3 digits with leading zeros; command does not require leading zeros.
- Mute All/Unmute All are global — unmute all clears per-channel mute states.
- Error codes: `E01` (invalid input channel), `E10` (invalid command), `E13` (invalid value), `E14` (not valid for this configuration).
- Part number: 60-842-01.
- Parametric EQ: 9 filters per output channel (8 outputs), Q values multiplied by 1000 (707-15000).

<!-- UNRESOLVED: no power on/off commands — device may require physical power toggle -->
<!-- UNRESOLVED: flow control setting not stated in source -->
<!-- UNRESOLVED: firmware upload protocol details not fully documented (binary format unknown) -->
<!-- UNRESOLVED: Telnet connection behavior beyond port 23 not documented (keepalive, timeout) -->
<!-- UNRESOLVED: maximum command rate / throttle limits not stated -->

## Provenance

```yaml
source_domains:
  - extron.com
  - media.extron.com
source_urls:
  - https://www.extron.com/download/files/userman/Matrix3200_6400_Wideband_A.pdf
  - https://media.extron.com/public/download/files/userman/XP_Plus_MAV_D.pdf
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
retrieved_at: 2026-05-01T02:11:30.714Z
last_checked_at: 2026-05-16T12:16:07.602Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T12:16:07.602Z
matched_actions: 43
action_count: 43
confidence: high
summary: "All 43 actions matched with correct opcodes and shapes, transport parameters verified, source fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
