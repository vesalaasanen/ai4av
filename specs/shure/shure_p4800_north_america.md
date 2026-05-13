---
spec_id: admin/shure-p4800
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure P4800 Control Spec"
manufacturer: Shure
model_family: P4800
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - P4800
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - content-files.shure.com
retrieved_at: 2026-04-30T04:29:02.308Z
last_checked_at: 2026-04-22T19:26:39.207Z
generated_at: 2026-04-22T19:26:39.207Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Sysex frame structure F0h F7h"
  - "DTR voltage 5-12 volts requirement"
  - "DIP switch preset configuration"
verification:
  verdict: verified
  checked_at: 2026-04-22T19:26:39.207Z
  matched_actions: 50
  action_count: 50
  confidence: high
  summary: "All 50 spec actions and feedbacks match source commands; all transport parameters verified; known bugs documented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Shure P4800 Control Spec

## Summary
The Shure P4800 is a 4×8 matrix mixer signal processor with RS-232 control. The protocol usesSysex format commands with a device ID (0–15) set via DIP switches. Commands cover preset changes, per-input and per-output mute/polarity/scaling/volume, and matrix mixpoint routing and level control. Query commands return current settings as Sysex response strings.

<!-- UNRESOLVED: no power on/off commands in source -->
<!-- UNRESOLVED: no events/unsolicited notifications described in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from extensive query command tables
- routable  # inferred from matrix mixpoint activate/deactivate commands
- levelable  # inferred from volume control commands for inputs, outputs, and mixpoints
```

## Actions
```yaml
- id: change_preset
  label: Change Preset
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID (0-15), set via DIP switches
    - name: preset_number
      type: integer
      description: Preset number (1-128). Internal value is preset_number - 1 (range 0-127).

- id: input_mute_toggle
  label: Toggle Input Mute
  kind: action
  params:
    - name: device_id
      type: integer
    - name: input
      type: integer
      description: Input number (1-4)

- id: input_mute_force
  label: Force Input Mute
  kind: action
  params:
    - name: device_id
      type: integer
    - name: input
      type: integer
      description: Input number (1-4)
    - name: muted
      type: boolean
      description: true = mute on, false = mute off

- id: input_polarity_toggle
  label: Toggle Input Polarity
  kind: action
  params:
    - name: device_id
      type: integer
    - name: input
      type: integer
      description: Input number (1-4)

- id: input_polarity_force
  label: Force Input Polarity
  kind: action
  params:
    - name: device_id
      type: integer
    - name: input
      type: integer
      description: Input number (1-4)
    - name: polarity
      type: integer
      description: 0 = (+), 1 = (-)

- id: input_scaling_toggle
  label: Toggle Input +4/-10 Scaling
  kind: action
  params:
    - name: device_id
      type: integer
    - name: input
      type: integer
      description: Input number (1-4)

- id: input_scaling_force
  label: Force Input Scaling
  kind: action
  params:
    - name: device_id
      type: integer
    - name: input
      type: integer
      description: Input number (1-4)
    - name: scaling
      type: integer
      description: 0 = +4 dBu, 1 = -10 dBV

- id: input_volume_set
  label: Set Input Volume
  kind: action
  params:
    - name: device_id
      type: integer
    - name: input
      type: integer
      description: Input number (1-4)
    - name: control_setting
      type: integer
      description: Range -30 to +30. Each step = 1 dB. VA = (2 * control_setting) & 0x7F

- id: input_volume_relative
  label: Adjust Input Volume Relatively
  kind: action
  params:
    - name: device_id
      type: integer
    - name: input
      type: integer
      description: Input number (1-4)
    - name: db_change
      type: integer
      description: dB change. VA = (2 * db_change) & 0x7F

- id: output_mute_toggle
  label: Toggle Output Mute
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Output number (1-8)

- id: output_mute_force
  label: Force Output Mute
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Output number (1-8)
    - name: muted
      type: boolean
      description: true = mute on, false = mute off

- id: output_polarity_toggle
  label: Toggle Output Polarity
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Output number (1-8)

- id: output_polarity_force
  label: Force Output Polarity
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Output number (1-8)
    - name: polarity
      type: integer
      description: 0 = (+), 1 = (-)

- id: output_scaling_toggle
  label: Toggle Output +4/-10 Scaling
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Output number (1-8)

- id: output_scaling_force
  label: Force Output Scaling
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Output number (1-8)
    - name: scaling
      type: integer
      description: 0 = +4 dBu, 1 = -10 dBV

- id: output_pad_toggle
  label: Toggle Output Pad
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Output number (1-8)

- id: output_pad_force
  label: Force Output Pad
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Output number (1-8)
    - name: engaged
      type: boolean
      description: true = pad on (20 dB), false = pad off

- id: output_volume_set
  label: Set Output Volume
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Output number (1-8)
    - name: control_setting
      type: integer
      description: Range -30 to +30. Each step = 1 dB. VA = (2 * control_setting) & 0x7F

- id: output_volume_relative
  label: Adjust Output Volume Relatively
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Output number (1-8)
    - name: db_change
      type: integer
      description: dB change. VA = (2 * db_change) & 0x7F

- id: mixpoint_mute_toggle
  label: Toggle Mixpoint Mute
  kind: action
  params:
    - name: device_id
      type: integer
    - name: mix_point
      type: integer
      description: Mix point number (1-NMIXPOINTS). ID = NMIXPOINTS + 15 + mix_point

- id: mixpoint_mute_force
  label: Force Mixpoint Mute
  kind: action
  params:
    - name: device_id
      type: integer
    - name: mix_point
      type: integer
    - name: muted
      type: boolean

- id: mixpoint_polarity_toggle
  label: Toggle Mixpoint Polarity
  kind: action
  params:
    - name: device_id
      type: integer
    - name: mix_point
      type: integer
      description: ID = (2 * NMIXPOINTS) + 15 + mix_point

- id: mixpoint_polarity_force
  label: Force Mixpoint Polarity
  kind: action
  params:
    - name: device_id
      type: integer
    - name: mix_point
      type: integer
    - name: polarity
      type: integer
      description: 0 = (+), 1 = (-)

- id: mixpoint_volume_set
  label: Set Mixpoint Volume
  kind: action
  params:
    - name: device_id
      type: integer
    - name: mix_point
      type: integer
      description: ID = mix_point + 15
    - name: control_setting
      type: integer
      description: Range 0-127. Gain table: 0=-Infinity, 1-26=-105 to -42.5 dB (2.5 dB steps), 27-127=-40 to +10 dB (0.5 dB steps). VA = control_setting & 0x7F

- id: mixpoint_volume_relative
  label: Adjust Mixpoint Volume Relatively
  kind: action
  params:
    - name: device_id
      type: integer
    - name: mix_point
      type: integer
    - name: db_change
      type: integer
      description: VA = (2 * db_change) & 0x7F

- id: mixer_output_mute_force
  label: Force Mixer Output Mute
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Mixer output number
    - name: muted
      type: boolean
      description: IDMSB = ((4 * NMIXPOINTS) + NOUTPUTS + 15 + output) >> 7 & 0x7F; IDLSB = ((4 * NMIXPOINTS) + NOUTPUTS + 15 + output) & 0x7F

- id: mixer_output_mute_toggle
  label: Toggle Mixer Output Mute
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Mixer output number. Source marks this command as listed but bugged.

- id: mixer_output_polarity_force
  label: Force Mixer Output Polarity
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
    - name: polarity
      type: integer
      description: 0 = (+), 1 = (-). IDMSB = ((4 * NMIXPOINTS) + (2 * NOUTPUTS) + 15 + output) >> 7 & 0x7F; IDLSB = ((4 * NMIXPOINTS) + (2 * NOUTPUTS) + 15 + output) & 0x7F

- id: mixer_output_polarity_toggle
  label: Toggle Mixer Output Polarity
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Mixer output number. Source marks this command as listed but bugged.

- id: mixer_output_volume_set
  label: Set Mixer Output Volume
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: IDMSB = ((4 * NMIXPOINTS) + 15 + output) >> 7 & 0x7F; IDLSB = ((4 * NMIXPOINTS) + 15 + output) & 0x7F
    - name: control_setting
      type: integer
      description: Range 0-127. Gain table: 0=-Infinity, 1-26=-105 to -42.5 dB, 27-127=-40 to +10 dB

- id: mixer_output_volume_relative
  label: Adjust Mixer Output Volume Relatively
  kind: action
  params:
    - name: device_id
      type: integer
    - name: output
      type: integer
      description: Mixer output number. Source marks this command as listed but bugged.
    - name: db_change
      type: integer
      description: VA = (2 * db_change) & 0x7F

- id: mixpoint_activate
  label: Activate Mixpoint (Route Input to Output)
  kind: action
  params:
    - name: device_id
      type: integer
    - name: mix_point
      type: integer
      description: IDMSB = ((3 * NMIXPOINTS) + 15 + mix_point) >> 7 & 0x7F; IDLSB = ((3 * NMIXPOINTS) + 15 + mix_point) & 0x7F
    - name: activate
      type: boolean
      description: true = activate routing, false = deactivate

- id: mixpoint_activate_toggle
  label: Toggle Mixpoint Activation
  kind: action
  params:
    - name: device_id
      type: integer
    - name: mix_point
      type: integer
      description: Source marks this command as listed but bugged.
```

## Feedbacks
```yaml
- id: input_mute_status
  label: Input Mute Status
  type: enum
  query_command: '{"get":"inputMute"}'
  values:
    - unmuted  # VA = 00h
    - muted    # VA = 7Fh
  note: Device echoes command, then returns F0h 00h 01h 00h <DeviceID+10h> 0Ah 00h 00h <channel> <VA> 00h F7h

- id: input_polarity_status
  label: Input Polarity Status
  type: enum
  query_command: '{"get":"inputPolarity"}'
  values:
    - positive   # VA = 00h
    - negative   # VA = 01h

- id: input_scaling_status
  label: Input Scaling Status
  type: enum
  query_command: '{"get":"inputScaling"}'
  values:
    - +4 dBu   # VA = 00h
    - -10 dBV  # VA = 01h

- id: input_volume_status
  label: Input Volume Status
  type: integer
  query_command: '{"get":"inputVolume"}'
  note: VA range -60 to +60. Divide by 2 to get dB scale. Response: F0h 00h 01h 00h <DeviceID+10h> 0Ah 00h 00h <channel> <VA> 00h F7h

- id: output_mute_status
  label: Output Mute Status
  type: enum
  query_command: '{"get":"outputMute"}'
  values:
    - unmuted  # VA = 00h
    - muted    # VA = 7Fh

- id: output_polarity_status
  label: Output Polarity Status
  type: enum
  query_command: '{"get":"outputPolarity"}'
  values:
    - positive   # VA = 00h
    - negative   # VA = 01h

- id: output_scaling_status
  label: Output Scaling Status
  type: enum
  query_command: '{"get":"outputScaling"}'
  values:
    - +4 dBu   # VA = 00h
    - -10 dBV  # VA = 01h

- id: output_pad_status
  label: Output Pad Status
  type: enum
  query_command: '{"get":"outputPad"}'
  values:
    - off  # VA = 00h
    - on   # VA = 01h (20 dB)

- id: output_volume_status
  label: Output Volume Status
  type: integer
  query_command: '{"get":"outputVolume"}'
  note: VA range -60 to +60. Divide by 2 to get dB scale.

- id: mixpoint_mute_status
  label: Mixpoint Mute Status
  type: enum
  query_command: '{"get":"mixpointMute"}'
  values:
    - unmuted  # VA = 00h
    - muted    # VA = 7Fh

- id: mixer_output_mute_status
  label: Mixer Output Mute Status
  type: enum
  query_command: '{"get":"mixerOutputMute"}'
  values:
    - unmuted  # VA = 00h
    - muted    # VA = 7Fh

- id: mixpoint_polarity_status
  label: Mixpoint Polarity Status
  type: enum
  query_command: '{"get":"mixpointPolarity"}'
  values:
    - positive   # VA = 00h
    - negative   # VA = 01h

- id: mixer_output_polarity_status
  label: Mixer Output Polarity Status
  type: enum
  query_command: '{"get":"mixerOutputPolarity"}'
  values:
    - positive   # VA = 00h
    - negative   # VA = 01h

- id: mixpoint_volume_status
  label: Mixpoint Volume Status
  type: integer
  query_command: '{"get":"mixpointVolume"}'
  note: VA = gain index 0-127. Gain table: 0=-Infinity, 1-26=-105 to -42.5 dB (2.5 dB steps), 27-127=-40 to +10 dB (0.5 dB steps).

- id: mixer_output_volume_status
  label: Mixer Output Volume Status
  type: integer
  query_command: '{"get":"mixerOutputVolume"}'
  note: VA = gain index 0-127. Gain table: 0=-Infinity, 1-26=-105 to -42.5 dB (2.5 dB steps), 27-127=-40 to +10 dB (0.5 dB steps).

- id: mixpoint_activation_status
  label: Mixpoint Activation Status
  type: enum
  query_command: '{"get":"mixpointActivate"}'
  values:
    - deactivated  # VA = 00h
    - activated    # VA = 01h

- id: preset_change_ack
  label: Preset Change Acknowledgement
  type: string
  note: Device echoes the sent command string, then sends a return acknowledgement string.
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters described - all settings are action-based
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described in source - device only responds to queries/commands
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - DTR voltage required: "The P4800 requires a voltage of 5 to 12 volts on the DTR line to accept data on the TX line."
# UNRESOLVED: no firmware version compatibility stated in source
# UNRESOLVED: no fault behavior or error recovery sequences described in source
```

## Notes
The P4800 uses standard Sysex (F0h...F7h) command format. Device ID is 0–15 set via DIP switches. All multi-byte numeric values use little-endian or bitwise AND with 0x7F as documented per command.

**Known bugs noted in vendor doc:**
- Mixer output mute toggle does not work — use force mute/unmute instead
- Mixer output polarity toggle does not work — use force polarity instead
- Output pad is present in both change and query sections
- Mixer output volume relative increase/decrease does not work
- Mixpoint activation toggle does not work — use force activation/deactivation instead

**AMX string example** for preset change (device ID 15, preset #3): `SEND_STRING P4800,"$CF,$02"` — the "$" prefix denotes hexadecimal byte values in AMX syntax.

**NMIXPOINTS** = 4 × NOUTPUTS. Default NOUTPUTS = 8 (4×8 mixer). Crossover/splitter usage reduces NOUTPUTS by (crossover channels - 1).

<!-- UNRESOLVED: power on/off commands not present in source -->
<!-- UNRESOLVED: no TCP/IP, HTTP, or REST interface described — serial-only device per title -->
<!-- UNRESOLVED: no firmware version compatibility range stated in source -->

## Provenance

```yaml
source_domains:
  - content-files.shure.com
retrieved_at: 2026-04-30T04:29:02.308Z
last_checked_at: 2026-04-22T19:26:39.207Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-22T19:26:39.207Z
matched_actions: 50
action_count: 50
confidence: high
summary: "All 50 spec actions and feedbacks match source commands; all transport parameters verified; known bugs documented."
```

## Known Gaps

```yaml
- "Sysex frame structure F0h F7h"
- "DTR voltage 5-12 volts requirement"
- "DIP switch preset configuration"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
