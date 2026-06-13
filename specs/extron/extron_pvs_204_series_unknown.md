---
spec_id: admin/extron-pvs-204sa
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron PVS 204SA Control Spec"
manufacturer: Extron
model_family: "PVS 204SA"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "PVS 204SA"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - manualmachine.com
source_urls:
  - https://www.extron.com/download/files/userman/PVS204SARevD092608.pdf
  - https://www.extron.com/download/files/userman/68-1512-01PVS204SAPlusAddendumrevBweb040909.pdf
  - https://www.extron.com/download/files/label/PVS204SAlabel33-1379-01B02.pdf
  - https://www.extron.com/download/
  - https://manualmachine.com/extronelectronics/pvs204sa/1450431-user-manual/
retrieved_at: 2026-06-11T21:56:00.395Z
last_checked_at: 2026-06-12T19:17:36.549Z
generated_at: 2026-06-12T19:17:36.549Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility, GC2 software command set, IR remote command set, exact IR Link wiring/handshake, MLC interaction commands"
  - "no explicit AC power on/off state in source; only power-amp control"
  - "settable parameters are covered as discrete actions above; no continuous settable variables beyond the dB scales already enumerated."
  - "no multi-step sequences described in source"
  - "firmware version compatibility, GC2 software command set, IR remote command set, exact IR Link wiring/handshake, MLC interaction commands, factory defaults not enumerated in refined excerpt may exist for additional parameters."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:17:36.549Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 spec actions matched literally with corresponding source commands; transport parameters (9600 baud, 8 bits, no parity, 1 stop bit, no flow control) verified; source fully represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Extron PVS 204SA Control Spec

## Summary
The Extron PVS 204SA is a PoleVault switcher providing RGB/composite video input switching, audio switching, and a built-in stereo power amplifier. This spec covers control via RS-232 using Extron's Simple Instruction Set (SIS) over the rear panel RS-232/MLC/IR captive-screw port and the front-panel 2.5 mm Config port (both share the same protocol).

<!-- UNRESOLVED: firmware version compatibility, GC2 software command set, IR remote command set, exact IR Link wiring/handshake, MLC interaction commands -->

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
  type: none  # inferred: no login/auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power-amp sections; no explicit AC power on/off command documented
- routable        # inferred from input selection commands (X!, X!*, X!$, X!&)
- queryable       # inferred from query commands (Z, G, V, X, Q, 3S, 40S, 41S, 20S, 1I, I, 0I, N, 3#, 18#, 29#, 1#, 72#, 56#, 59#)
- levelable       # inferred from volume/gain/treble/bass commands
```

## Actions
```yaml
# Input selection (single switcher mode)
- id: select_input_single
  label: Select input (video and audio, single switcher mode)
  kind: action
  command: "{X!}!"
  params:
    - name: input
      type: integer
      description: Input number (X!). Valid values: 0 (all output mute, both audio and video), 1 or 2 (RGB inputs), 3 or 4 (composite video inputs in single switcher mode), 7 (Aux/Mix input).
  notes: "X! syntax. Example: 2! selects input 2. Response: ChnX!]"

- id: select_input_separate_video
  label: Select composite video input (separate switcher mode)
  kind: action
  command: "{X!}*{X1%}!"
  params:
    - name: composite_input
      type: integer
      description: Composite video input number (X!) in separate switcher mode (1 or 2)
    - name: group
      type: integer
      description: Group selector (X1%) - 1 selects from video group, 2 selects from RGB group
  notes: "Example: 1*2! selects input 1 of the composite video group. Response: ChnX1%*X!!]"

- id: select_audio_input
  label: Select audio input only
  kind: action
  command: "{X!}$"
  params:
    - name: input
      type: integer
      description: Input number (X!) - 0 (mute), 1-2 (RGB), 3-4 (composite), 7 (Aux/Mix)
  notes: "Response: AudX! ]"

- id: select_video_input_single
  label: Select video input (single switcher mode)
  kind: action
  command: "{X!}&"
  params:
    - name: input
      type: integer
      description: Input number (X!)
  notes: "Response: VidX! ]"

- id: select_video_input_separate
  label: Select video input (separate switcher mode)
  kind: action
  command: "{X1%}*{X!}&"
  params:
    - name: group
      type: integer
      description: Group selector (X1%) - 1 video group, 2 RGB group
    - name: input
      type: integer
      description: Input number (X!) within the group
  notes: "Response: VidX1%*X! ]"

# Audio gain/attenuation per input (note: G uppercase = set/increment gain, g lowercase = set attenuation)
- id: set_input_gain
  label: Set a specific input's gain
  kind: action
  command: "{X!}*{X&}G"
  params:
    - name: input
      type: integer
      description: Input number (X!) - note Aux/Mix is input 7
    - name: gain_value
      type: integer
      description: Gain in dB on X& scale 0-24 (default 0, see table: 0=-10.5dB ... 14=+10.5dB relative)
  notes: "Set gain command is case-sensitive (G uppercase). Response: InX! Aud=X( ]. Example: 2*9G sets input 2's gain to +9 dB (using absolute dB scale X(): -18 to +24 dB)."

- id: set_input_attenuation
  label: Set a specific input's attenuation
  kind: action
  command: "{X!}*{X*}g"
  params:
    - name: input
      type: integer
      description: Input number (X!)
    - name: attenuation_value
      type: integer
      description: Attenuation value (X*) - range 1-42, in dB
  notes: "Attenuation command is case-sensitive (g lowercase). Response: InX!Aud=X( ]. Example: 1*12g sets input 1's attenuation to -12 dB."

- id: increment_specific_input_gain
  label: Increment a specific input's gain by 1 dB
  kind: action
  command: "{X!}*+G"
  params:
    - name: input
      type: integer
      description: Input number (X!)
  notes: "Response: InX!Aud=X( ]"

- id: decrement_specific_input_gain
  label: Decrement a specific input's gain by 1 dB
  kind: action
  command: "{X!}*-G"
  params:
    - name: input
      type: integer
      description: Input number (X!)
  notes: "Response: InX!Aud=X( ]"

- id: view_specific_input_gain
  label: View a specific input's gain
  kind: query
  command: "{X!}*G"
  params:
    - name: input
      type: integer
      description: Input number (X!)
  notes: "Response: InX!Aud=X( ]"

- id: set_current_input_gain
  label: Set the current input's gain
  kind: action
  command: "{X&}G"
  params:
    - name: gain_value
      type: integer
      description: Gain value on X& scale 0-24
  notes: "Response: InX!Aud=X( ]"

- id: set_current_input_attenuation
  label: Set the current input's attenuation
  kind: action
  command: "{X*}g"
  params:
    - name: attenuation_value
      type: integer
      description: Attenuation value on X* scale 1-42
  notes: "Response: InX!Aud=X( ]"

- id: increment_current_input_gain
  label: Increment the current input's gain by 1 dB
  kind: action
  command: "+G"
  params: []
  notes: "Response: InX!Aud=X( ]"

- id: decrement_current_input_gain
  label: Decrement the current input's gain by 1 dB
  kind: action
  command: "-G"
  params: []
  notes: "Response: InX!Aud=X( ]"

- id: view_current_input_audio_gain
  label: View the current input's audio gain
  kind: query
  command: "G"
  params: []
  notes: "Response: InX!Aud=X( ]"

# Audio treble adjustment (applies to inputs 1-4, twisted-pair audio only)
- id: set_treble_level
  label: Set the global treble level
  kind: action
  command: "{X$}>"
  params:
    - name: treble_value
      type: integer
      description: Treble value (X$) range 0-14, default 7 (0 dB). Steps: 0=-10.5dB, 1=-9dB, ..., 7=0dB, ..., 14=+10.5dB in 1.5 dB increments
  notes: "Response: Trb=X% ]. Example: 2> sets treble to -7.5 dB."

- id: increment_treble
  label: Increment the treble level by 1.5 dB
  kind: action
  command: "+>"
  params: []
  notes: "Response: Trb=X% ]"

- id: decrement_treble
  label: Decrement the treble level by 1.5 dB
  kind: action
  command: "->"
  params: []
  notes: "Response: Trb=X% ]"

- id: view_treble_level
  label: View the treble level
  kind: query
  command: ">"
  params: []
  notes: "Response: Trb=X% ]"

# Audio bass adjustment (applies to inputs 1-4, twisted-pair audio only)
- id: set_bass_level
  label: Set the global bass level
  kind: action
  command: "{X$}<"
  params:
    - name: bass_value
      type: integer
      description: Bass value (X$) range 0-14, default 7 (0 dB). Steps: 0=-10.5dB, ..., 7=0dB, ..., 14=+10.5dB in 1.5 dB increments
  notes: "Response: Bas=X% ]. Example: 10< sets bass to +4.5 dB."

- id: increment_bass
  label: Increment the bass level by 1.5 dB
  kind: action
  command: "+<"
  params: []
  notes: "Response: Bas=X% ]"

- id: decrement_bass
  label: Decrement the bass level by 1.5 dB
  kind: action
  command: "-<"
  params: []
  notes: "Response: Bas=X% ]"

- id: view_bass_level
  label: View the bass level
  kind: query
  command: "<"
  params: []
  notes: "Response: Bas=X% ]"

# Audio mute
- id: audio_mute_on
  label: Mute audio output
  kind: action
  command: "1Z"
  params: []
  notes: "Response: AmtX# ]"

- id: audio_mute_off
  label: Unmute audio output
  kind: action
  command: "0Z"
  params: []
  notes: "Response: AmtX# ]"

- id: view_audio_mute_status
  label: View the audio mute status
  kind: query
  command: "Z"
  params: []
  notes: "Response: AmtX# ] where 0=off, 1=on"

# Volume adjustment
- id: set_volume
  label: Set the overall output volume
  kind: action
  command: "{X^}V"
  params:
    - name: volume
      type: integer
      description: Volume (X^) range 0-100, default 50
  notes: "Response: VolX^ ]. Example: 27V sets volume to 27."

- id: increment_volume
  label: Increment the volume
  kind: action
  command: "+V"
  params: []
  notes: "Response: VolX^ ]"

- id: decrement_volume
  label: Decrement the volume
  kind: action
  command: "-V"
  params: []
  notes: "Response: VolX^ ]"

- id: view_volume
  label: View the volume level
  kind: query
  command: "V"
  params: []
  notes: "Response: VolX^ ]"

# Status commands
- id: view_clip_status
  label: View the clip (max) status
  kind: query
  command: "3S"
  params: []
  notes: "Response: Sts3*X# ]"

- id: view_vcm_present_status
  label: View the VCM present status
  kind: query
  command: "40S"
  params: []
  notes: "Response: Sts40*X1# ]"

- id: view_high_pass_filter_status
  label: View the high pass filter status
  kind: query
  command: "41S"
  params: []
  notes: "Response: Sts41*X# ]"

- id: view_internal_temperature
  label: View the internal temperature (°C)
  kind: query
  command: "20S"
  params: []
  notes: "Response: Sts20*X1$ ]"

# Front panel security lockout (executive modes)
- id: disable_executive_mode
  label: Disable executive mode (unlock)
  kind: action
  command: "0X"
  params: []
  notes: "Response: ExeX# ]. Adjustments and selections can be made from the front panel."

- id: enable_executive_mode_1
  label: Enable executive mode 1 (lock)
  kind: action
  command: "1X"
  params: []
  notes: "Response: ExeX# ]. Locks front panel input selection buttons; inputs selectable via RS-232 or IR only. Volume still adjustable from front panel. Equivalent to pressing and holding front panel buttons 1 and 4."

- id: view_executive_mode_status
  label: View the executive mode status
  kind: query
  command: "X"
  params: []
  notes: "Response: ExeX# ]. Example: X returns Exe0] when executive mode is off."

# Firmware version / part number / info requests
- id: query_firmware_version
  label: Query firmware version number
  kind: query
  command: "Q"
  params: []
  notes: "Response: X2! ] (X.XX format)"

- id: request_part_number
  label: Request the part number
  kind: query
  command: "N"
  params: []
  notes: "Response: N60-800-01]"

- id: request_model_name
  label: Request model name
  kind: query
  command: "1I"
  params: []
  notes: "Response: PVS 204SA]"

- id: request_general_info
  label: Request general info
  kind: query
  command: "I"
  params: []
  notes: "Single switcher mode returns: Video input # X1 is selected/active, Audio input # X1 is selected/active, Audio volume X6, Switcher mode X4"

- id: request_general_info_alt
  label: Request general info (alternate form)
  kind: query
  command: "0I"
  params: []
  notes: "Separate switcher mode returns: RGB input # X1 is selected/active, Video input # X1 is selected/active, Audio input # X1 is selected/active, Audio volume X6, Switcher mode X4"

# Firmware upload
- id: upload_firmware
  label: Upload firmware
  kind: action
  command: "EUpload]"
  params: []
  notes: "Response: Go] then Upl] on success. The switcher starts uploading firmware code into its memory. Firmware file must have .s19 extension. Each firmware replacement resets the switcher to factory defaults. Performed only via front panel Config port."

# Special functions (syntax: __ * X? # for set, __ # for view)
- id: zap_all_settings
  label: Zap (reset to default settings)
  kind: action
  command: "EzXXX]"
  params: []
  notes: "Response: ZapXXX]. Resets everything (all settings and adjustments) to factory defaults."

- id: set_rgb_delay
  label: Set the RGB delay
  kind: action
  command: "3*{X2@}#"
  params:
    - name: delay
      type: integer
      description: RGB delay (X2@) 0-10, in 0.5 second steps. 0=0.0s (default), 1=0.5s, ..., 10=5.0s
  notes: "Response: RGBDly*X2@ ]. Example: 3*7# sets a 3.5 second RGB delay."

- id: view_rgb_delay
  label: View the RGB delay
  kind: query
  command: "3#"
  params: []
  notes: "Response: RGBDly*X2@ ]"

- id: view_audio_output_mode
  label: View the audio output mode status
  kind: query
  command: "18#"
  params: []
  notes: "Response: PreAmpMod*X@ ]. X@ = 1 (dual mono) or 2 (stereo). Reflects the Audio Output Mode DIP switch on rear panel."

- id: set_loudness_off
  label: Set the loudness to off
  kind: action
  command: "29*0#"
  params: []
  notes: "Response: Loudness*0]"

- id: set_loudness_on
  label: Set the loudness to on
  kind: action
  command: "29*1#"
  params: []
  notes: "Response: Loudness*1]"

- id: view_loudness_control
  label: View the loudness control
  kind: query
  command: "29#"
  params: []
  notes: "Response: Loudness*X# ]. 0=Off, 1=On"

- id: set_single_switcher_mode
  label: Set to single switcher mode
  kind: action
  command: "1*1#"
  params: []
  notes: "Response: SwMode*1]"

- id: set_separate_switcher_mode
  label: Set to separate switcher mode
  kind: action
  command: "1*2#"
  params: []
  notes: "Response: SwMode*2]. In Separate Switcher mode, audio follows the last video/RGB selection."

- id: view_switcher_mode
  label: View the switcher mode
  kind: query
  command: "1#"
  params: []
  notes: "Response: SwMode*X1! ]. 1=single, 2=separate"

- id: set_auto_switching_on
  label: Set auto switching to on
  kind: action
  command: "72*1#"
  params: []
  notes: "Response: Asw*1]"

- id: set_auto_switching_off
  label: Set auto switching to off
  kind: action
  command: "72*0#"
  params: []
  notes: "Response: Asw*0]"

- id: view_auto_switching
  label: View the auto switching setting
  kind: query
  command: "72#"
  params: []
  notes: "Response: Asw*X# ]. 0=off, 1=on"

- id: set_power_amp_attenuation
  label: Set the power amp attenuation
  kind: action
  command: "56*{X1@}#"
  params:
    - name: range
      type: integer
      description: Power amp attenuation (X1@) 0-20, where 0=-10dB, 20=+10dB, 1 dB increments
  notes: "Response: AmpLimit*X1) ]"

- id: view_power_amp_gain
  label: View the power amp gain
  kind: query
  command: "56#"
  params: []
  notes: "Response: AmpLimit*X1) ]. X1) = -10 to +10 dB"

- id: set_clip_limiter_off
  label: Set the Clip Limiter switch to off
  kind: action
  command: "59*0#"
  params: []
  notes: "Response: ClipLimit*0]"

- id: set_clip_limiter_on
  label: Set the Clip Limiter switch to on
  kind: action
  command: "59*1#"
  params: []
  notes: "Response: ClipLimit*1]"

- id: view_clip_limiter
  label: View the Clip Limiter control
  kind: query
  command: "59#"
  params: []
  notes: "Response: ClipLimit*X# ]. 0=off, 1=on"
```

## Feedbacks
```yaml
- id: power_state  # UNRESOLVED: no explicit AC power on/off state in source; only power-amp control
  type: enum
  values: [on, off]

- id: audio_mute_state
  type: enum
  values: [off, on]
  description: 0=off, 1=on (from Z query response)

- id: active_input_single
  type: integer
  description: Currently selected input in single switcher mode (0=all mute, 1-4, 7=Aux/Mix)

- id: active_input_separate_rgb
  type: integer
  description: Currently selected RGB input in separate switcher mode

- id: active_input_separate_video
  type: integer
  description: Currently selected composite video input in separate switcher mode

- id: active_audio_input
  type: integer
  description: Currently selected audio input

- id: active_volume
  type: integer
  description: Current volume 0-100 (from V query)

- id: treble_level_db
  type: number
  description: Current treble level in dB, range -10.5 to +10.5

- id: bass_level_db
  type: number
  description: Current bass level in dB, range -10.5 to +10.5

- id: switcher_mode
  type: enum
  values: [single, separate]
  description: 1=single, 2=separate

- id: audio_output_mode
  type: enum
  values: [dual_mono, stereo]
  description: 1=dual mono, 2=stereo

- id: loudness_state
  type: enum
  values: [off, on]

- id: auto_switching_state
  type: enum
  values: [off, on]

- id: clip_limiter_state
  type: enum
  values: [off, on]

- id: clip_status
  type: enum
  values: [off, on]
  description: From 3S query

- id: vcm_present
  type: enum
  values: [off, on]
  description: From 40S query

- id: high_pass_filter
  type: enum
  values: [off, on]
  description: From 41S query

- id: internal_temperature_c
  type: integer
  description: From 20S query

- id: executive_mode
  type: enum
  values: [unlocked, locked]
  description: 0=unlocked, 1=locked (from X query)

- id: rgb_delay
  type: number
  description: RGB delay in 0.5s steps, 0-10 (0.0 to 5.0 seconds)

- id: power_amp_gain_db
  type: integer
  description: -10 to +10 dB

- id: firmware_version
  type: string
  description: X.XX format

- id: part_number
  type: string
  description: 60-800-01

- id: model_name
  type: string
  description: PVS 204SA

- id: unsolicited_input_change
  type: string
  description: "ChnX! ] sent unsolicited whenever an input changes (front panel, RS-232, or auto switching)"
```

## Variables
```yaml
# UNRESOLVED: settable parameters are covered as discrete actions above; no continuous settable variables beyond the dB scales already enumerated.
```

## Events
```yaml
- id: power_on_copyright
  description: "© Copyright 2006, Extron Electronics, PVS 204SA, V1.xx Chn x ] sent when the PVS first powers on (V1.xx is firmware version, Chn x indicates initial channel)."

- id: input_change_notification
  description: "ChnX! ] (where X! is the input number) sent whenever an input is switched, including via front panel, RS-232, or auto switching. No host response required."

- id: error_E01
  description: "Invalid input channel number (too large)"

- id: error_E06
  description: "Invalid channel change"

- id: error_E10
  description: "Invalid command"

- id: error_E13
  description: "Invalid value (too large)"

- id: error_E14
  description: "Invalid command for this configuration"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: do not control PVS volume via RS-232 if DC Volume control port is connected to a VCM 100, VC 50, or MLC 52 VC. If a VCM is controlling the volume, an MLC should not be connected to the MLC/IR/RS-232 port. Firmware update must use .s19 extension or unit may stop functioning. Each firmware replacement resets the switcher to factory defaults.
```

## Notes
- Captive-screw connector pinout (rear panel RS-232/MLC/IR): A=TX, B=RX, C=IR receive, D=GND, E=+12 VDC.
- 2.5 mm mini stereo jack pinout (front panel Config and rear MLC ports): tip=TX, ring=RX, sleeve=GND.
- Configuration cable Extron part # 70-335-01 (2.5 mm to DB9, 6 ft): DB9 pin 2 = TRS tip, DB9 pin 3 = TRS ring, DB9 pin 5 = TRS sleeve.
- Maximum RS-232 cable lengths: 50 ft to MLC 104, 50 ft to host/control system, 150 ft to IR Link.
- DC Volume port (analog, NOT RS-232): 0-10 V where 0 V = mute, 10 V = max. Pins: 1=10 VDC, 2=variable voltage/mute, 3=GND. When a VCM/VC 50/MLC 52 VC is connected, that device is the sole volume controller and RS-232 volume commands must not be used.
- Tone (bass/treble) commands are global and apply only to twisted-pair audio signals on inputs 1-4, not the Aux/Mix input.
- Auto Switching sends unsolicited ChnX! ] messages on every input change.
- Gain (G) and attenuation (g) commands are case-sensitive.
- Front panel Config port and rear RS-232/MLC/IR port share identical protocol; firmware updates are supported only via the front panel Config port.
- All responses end with CR/LF (0D 0A, shown as ] in the source).

<!-- UNRESOLVED: firmware version compatibility, GC2 software command set, IR remote command set, exact IR Link wiring/handshake, MLC interaction commands, factory defaults not enumerated in refined excerpt may exist for additional parameters. -->

## Provenance

```yaml
source_domains:
  - extron.com
  - manualmachine.com
source_urls:
  - https://www.extron.com/download/files/userman/PVS204SARevD092608.pdf
  - https://www.extron.com/download/files/userman/68-1512-01PVS204SAPlusAddendumrevBweb040909.pdf
  - https://www.extron.com/download/files/label/PVS204SAlabel33-1379-01B02.pdf
  - https://www.extron.com/download/
  - https://manualmachine.com/extronelectronics/pvs204sa/1450431-user-manual/
retrieved_at: 2026-06-11T21:56:00.395Z
last_checked_at: 2026-06-12T19:17:36.549Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:17:36.549Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 spec actions matched literally with corresponding source commands; transport parameters (9600 baud, 8 bits, no parity, 1 stop bit, no flow control) verified; source fully represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility, GC2 software command set, IR remote command set, exact IR Link wiring/handshake, MLC interaction commands"
- "no explicit AC power on/off state in source; only power-amp control"
- "settable parameters are covered as discrete actions above; no continuous settable variables beyond the dB scales already enumerated."
- "no multi-step sequences described in source"
- "firmware version compatibility, GC2 software command set, IR remote command set, exact IR Link wiring/handshake, MLC interaction commands, factory defaults not enumerated in refined excerpt may exist for additional parameters."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
