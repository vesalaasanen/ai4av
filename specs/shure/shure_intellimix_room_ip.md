---
spec_id: admin/shure-intellimix-room
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure IntelliMix Room Control Spec"
manufacturer: Shure
model_family: "IntelliMix Room"
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - "IntelliMix Room"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pubs.shure.com
  - techportal.shure.com
source_urls:
  - https://pubs.shure.com/command-strings/IntelliMixRoom/en-US
  - https://techportal.shure.com/
retrieved_at: 2026-05-14T10:38:08.504Z
last_checked_at: 2026-06-02T22:14:24.758Z
generated_at: 2026-06-02T22:14:24.758Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial RS-232 not supported; no auth mechanism described in source"
  - "no power on/off commands in source"
  - "no safety warnings or interlock procedures in source"
  - "power on/off commands not present in source"
  - "authentication mechanism not described in source"
  - "SAMPLE command for metering not fully documented in source"
  - "VAD input right (channel 55) only active when stereo audio is on — stereo configuration not covered"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:14:24.758Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-11
---

# Shure IntelliMix Room Control Spec

## Summary
IntelliMix Room is a software-based audio DSP processor for conference rooms, supporting TCP/IP command strings (default port 2202, configurable 1025-65534). Controls Dante mic/line inputs, virtual audio, PC audio, matrix routing, automixing, denoiser, and license management. All messages are ASCII.

<!-- UNRESOLVED: serial RS-232 not supported; no auth mechanism described in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 2202  # default; configurable 1025-65534
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # UNRESOLVED: no power on/off commands in source
- routable  # inferred from MATRIX_MXR_ROUTE commands
- queryable  # inferred from GET command + REP pattern
- levelable  # inferred from AUDIO_GAIN_HI_RES, MATRIX_MXR_GAIN
```

## Actions
```yaml
- id: get_all
  label: Get All
  kind: action
  params: []
  description: Requests REP for all device and channel properties.

- id: get_model
  label: Get Model
  kind: action
  params: []
  description: Returns model name as 32-char padded string.

- id: get_fw_ver
  label: Get Firmware Version
  kind: action
  params: []
  description: Returns firmware version as 3-part version string.

- id: get_device_id
  label: Get Device ID
  kind: action
  params: []
  description: Returns device ID as 31-char padded string.

- id: get_na_device_name
  label: Get Dante Device Name
  kind: action
  params: []
  description: Returns Dante audio device name.

- id: preset
  label: Preset
  kind: action
  params:
    - name: preset_number
      type: integer
      description: Preset number (1-10)
  description: Recalls preset ##.

- id: onhook_enable
  label: Set On/Off-Hook Enable
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
  description: Enables/disables on-hook support.

- id: audio_gain_hi_res
  label: Set Audio Gain
  kind: action
  params:
    - name: channel
      type: string
      description: Channel index (2 digits, 01-36, 00=all inputs)
    - name: gain
      type: integer
      description: Gain value 0-1400 representing -110.0 dB to +30.0 dB (scaled by 10 and offset by 1100)
    - name: mode
      type: enum
      values: [set, inc, dec]
  description: Sets gain on Dante mic/line inputs. Supports inc/dec steps.

- id: device_audio_mute
  label: Device Mute
  kind: action
  params:
    - name: cmd
      type: enum
      values: [ON, OFF, TOGGLE]
  description: Mutes all audio outputs.

- id: channel_mute
  label: Channel Mute
  kind: action
  params:
    - name: channel
      type: string
      description: Channel number (2 digits, e.g. 01-36)
    - name: cmd
      type: enum
      values: [ON, OFF, TOGGLE]
  description: Mutes a specific channel.

- id: matrix_mxr_route
  label: Matrix Mixer Routing
  kind: action
  params:
    - name: input
      type: string
      description: Input channel (2 digits, 00=all)
    - name: output
      type: string
      description: Output channel (2 digits, 00=all)
    - name: state
      type: enum
      values: [ON, OFF]
  description: Enables/disables routing from input to output in matrix mixer.

- id: matrix_mxr_gain
  label: Matrix Mixer Gain
  kind: action
  params:
    - name: input
      type: string
      description: Input channel (2 digits, 00=all)
    - name: output
      type: string
      description: Output channel (2 digits, 00=all)
    - name: gain
      type: integer
      description: Gain 0-1400 representing -110.0 dB to +30.0 dB (4-digit, scaled)
    - name: mode
      type: enum
      values: [set, inc, dec]
  description: Sets matrix mixer crosspoint gain.

- id: automxr_mute
  label: Automixer Post-Gate Mute
  kind: action
  params:
    - name: channel
      type: string
      description: Channel 01-16 (input) or 37 (automix output)
    - name: cmd
      type: enum
      values: [On, Off, Toggle]
  description: Mutes automixer post-gate output.

- id: audio_gain_postgate
  label: Audio Gain Postgate
  kind: action
  params:
    - name: channel
      type: string
      description: Channel 01-16 (input) or 37 (automix output)
    - name: gain
      type: integer
      description: Gain 0-1400 representing -109.9 dB to +30.0 dB
    - name: mode
      type: enum
      values: [set, inc, dec]
  description: Sets gain after automixer gate.

- id: automxr_gate
  label: Get Automixer Gate Status
  kind: action
  params:
    - name: channel
      type: string
      description: Channel number (2 digits)
  description: Queries current gate status (ON/OFF).

- id: denoiser_enable
  label: Denoiser Enable
  kind: action
  params:
    - name: channel
      type: string
      description: Channel 00 (all) or 37 (automix output)
    - name: state
      type: enum
      values: [ON, OFF]
  description: Enables/disables denoiser on specified output.

- id: denoiser_level
  label: Denoiser Level
  kind: action
  params:
    - name: channel
      type: string
      description: Channel 00 (all) or 37 (automix output)
    - name: level
      type: enum
      values: [LOW, MEDIUM, HIGH]
  description: Sets denoiser strength level.
```

## Feedbacks
```yaml
- id: rep_all
  label: All Properties Report
  type: string
  description: Unsolicited report of all device and channel properties.

- id: rep_model
  label: Model Report
  type: string
  description: 32-character padded model name string.

- id: rep_fw_ver
  label: Firmware Version Report
  type: string
  description: 18-character version string (3 parts, e.g. "65535.65535.65535").

- id: rep_device_id
  label: Device ID Report
  type: string
  description: 31-character padded device ID string.

- id: rep_na_device_name
  label: Dante Device Name Report
  type: string
  description: Dante audio device name string.

- id: rep_preset
  label: Preset Report
  type: integer
  description: Current preset number (1-10).

- id: rep_err
  label: Error Report
  type: string
  description: Error response for invalid commands.

- id: rep_onhook_enable
  label: On/Off-Hook Enable Report
  type: enum
  values: [ON, OFF]

- id: rep_onhook_state
  label: On/Off-Hook State Report
  type: enum
  values: [ONHOOK, OFFHOOK]

- id: rep_audio_gain_hi_res
  label: Audio Gain Report
  type: integer
  description: Current gain 0-1400.

- id: rep_device_audio_mute
  label: Device Mute Report
  type: enum
  values: [ON, OFF]

- id: rep_audio_mute
  label: Channel Mute Report
  type: enum
  values: [ON, OFF]

- id: rep_matrix_mxr_route
  label: Matrix Route Report
  type: enum
  values: [ON, OFF]

- id: rep_matrix_mxr_gain
  label: Matrix Gain Report
  type: integer
  description: 4-digit gain value.

- id: rep_automxr_mute
  label: Automixer Post-Gate Mute Report
  type: enum
  values: [ON, OFF]

- id: rep_audio_gain_postgate
  label: Postgate Gain Report
  type: integer

- id: rep_automxr_gate
  label: Automixer Gate Status Report
  type: enum
  values: [ON, OFF]

- id: rep_denoiser_enable
  label: Denoiser Enable Report
  type: enum
  values: [ON, OFF]

- id: rep_denoiser_level
  label: Denoiser Level Report
  type: enum
  values: [LOW, MEDIUM, HIGH]

- id: rep_chan_config
  label: Channels Configured Report
  type: boolean

- id: rep_chan_count
  label: Channel Count Report
  type: integer
  values: [8, 16]

- id: rep_lic_exp_date
  label: License Expiration Date Report
  type: string
  description: 10-char date string yyyy-mm-dd.

- id: rep_lic_type
  label: License Type Report
  type: enum
  values: [DEMO, PAID, TRIAL, UNKNOWN]

- id: rep_lic_valid
  label: License Validity Report
  type: boolean
```

## Variables
```yaml
# No discrete settable parameters outside action/feedback pattern.
# All parameters are controlled via GET/SET/REP command pairs.
```

## Events
```yaml
# Device sends REP strings unsolicited when parameters change.
# No separate event subscription mechanism described in source.
- id: unsolicited_report
  label: Unsolicited Parameter Report
  description: Device sends REP for any parameter change without subscription. Pattern: < REP {PARAM} {value} >
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Default port 2202, configurable 1025-65534. Port must be unused on the computer running IntelliMix Room.
- Test port availability with `< GET NA_DEVICE_NAME >` — successful response confirms port is open.
- Channel numbering is 2 digits (padded). Dante mic inputs 01-16, Dante line inputs 17-24, virtual audio I/O 25/35, PC I/O 26/36, automix output 37, VAD right 55.
- All messages are ASCII. No binary encoding.
- 8-channel and 16-channel versions exist. Commands for unlicensed channels fail silently.
- Licensing types: DEMO, PAID, TRIAL, UNKNOWN.
- Level encodings: gain values scaled by 10 and offset by 1100 (range 0-1400 representing -110 to +30 dB). Step values multiplied by 10 before sending.
<!-- UNRESOLVED: power on/off commands not present in source -->
<!-- UNRESOLVED: authentication mechanism not described in source -->
<!-- UNRESOLVED: SAMPLE command for metering not fully documented in source -->
<!-- UNRESOLVED: VAD input right (channel 55) only active when stereo audio is on — stereo configuration not covered -->

## Provenance

```yaml
source_domains:
  - pubs.shure.com
  - techportal.shure.com
source_urls:
  - https://pubs.shure.com/command-strings/IntelliMixRoom/en-US
  - https://techportal.shure.com/
retrieved_at: 2026-05-14T10:38:08.504Z
last_checked_at: 2026-06-02T22:14:24.758Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:14:24.758Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial RS-232 not supported; no auth mechanism described in source"
- "no power on/off commands in source"
- "no safety warnings or interlock procedures in source"
- "power on/off commands not present in source"
- "authentication mechanism not described in source"
- "SAMPLE command for metering not fully documented in source"
- "VAD input right (channel 55) only active when stereo audio is on — stereo configuration not covered"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
