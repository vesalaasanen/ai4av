---
spec_id: admin/shure-mxn5-c
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure MXN5-C Control Spec"
manufacturer: Shure
model_family: MXN5-C
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - MXN5-C
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/MXN5-C
retrieved_at: 2026-04-30T01:18:53.215Z
last_checked_at: 2026-04-30T14:54:06.582Z
generated_at: 2026-04-30T14:54:06.582Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power consumption, thermal limits not stated in source"
  - "LED behavior during normal operation not detailed (flash command only)"
  - "specific event triggering conditions not enumerated in source (only general behavior described)"
  - "no explicit multi-step macros defined in source"
  - "no safety warnings or interlock procedures in source"
  - "Dante/AES67 audio transport parameters not detailed in source"
  - "LED behavior (normal operation, status colors) not documented"
  - "factory preset contents not documented"
verification:
  verdict: verified
  checked_at: 2026-04-30T14:54:06.582Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions found in source; transport verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Shure MXN5-C Control Spec

## Summary
Shure MXN5-C is a Dante-enabled ceiling loudspeaker with integrated DSP. Controlled via TCP/IP on port 2202 using ASCII command strings. Supports mute, gain, delay, routing, preset recall, and signal generator. Device sends unsolicited REP reports on parameter changes; clients do not need to poll.

<!-- UNRESOLVED: power consumption, thermal limits not stated in source -->
<!-- UNRESOLVED: LED behavior during normal operation not detailed (flash command only) -->

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
- powerable       # inferred: DEVICE_AUDIO_MUTE present
- routable        # inferred: CHAN_NAME, NA_CHAN_NAME routing present
- queryable       # inferred: GET commands + REP unsolicited reports present
- levelable       # inferred: AUDIO_GAIN_HI_RES with inc/dec present
```

## Actions
```yaml
- id: device_audio_mute
  label: Device Mute
  kind: action
  params:
    - name: cmd
      type: enum
      values: [ON, OFF, TOGGLE]

- id: audio_mute
  label: Channel Mute
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (01-03 per Channel Number Assignments)
    - name: cmd
      type: enum
      values: [ON, OFF, TOGGLE]

- id: set_audio_gain_hi_res
  label: Set Audio Gain (High Resolution)
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (01-03)
    - name: gain
      type: integer
      description: Gain value 0-1400 representing -110.0 dB to +30.0 dB in 0.1 dB steps
    - name: mode
      type: enum
      values: [SET, INC, DEC]
      description: SET=absolute, INC=increment, DEC=decrement

- id: set_delay
  label: Set Delay
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (03 for MXN5-C output)
    - name: delay_ms
      type: integer
      description: Delay in milliseconds (0=disabled, 1-160 for MXN5-C)

- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: preset_number
      type: integer
      description: Preset number 1-10

- id: set_channel_name
  label: Set Channel Name
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0=all channels per Channel Number Assignments)
    - name: name
      type: string
      description: Up to 31 alphanumeric characters; blank spaces, {} and <> not allowed

- id: flash_led
  label: Flash LED (Identify Device)
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_peq_filter
  label: Set PEQ Filter Enable
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (03 for MXN5-C)
    - name: filter
      type: integer
      description: Filter number (0=all filters in PEQ block)
    - name: state
      type: enum
      values: [ON, OFF, TOGGLE]

- id: set_bypass_dsp
  label: Set DSP Bypass
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF, TOGGLE]
      description: Bypasses EQ, delay, and limiter

- id: set_signal_generator_type
  label: Set Signal Generator Type
  kind: action
  params:
    - name: index
      type: integer
      description: Index 0 or 3
    - name: type
      type: enum
      values: [PINK, WHITE, TONE, SWEEP]

- id: set_signal_generator_frequency
  label: Set Signal Generator Frequency
  kind: action
  params:
    - name: index
      type: integer
      description: Index 0 or 3
    - name: frequency_hz
      type: integer
      description: Frequency in Hz (125-20000, 1 Hz increments)

- id: set_signal_generator_gain
  label: Set Signal Generator Gain
  kind: action
  params:
    - name: index
      type: integer
      description: Index 0 or 3
    - name: gain
      type: integer
      description: Gain 0-1310 representing -110.0 to +21.0 dB in 0.1 dB steps

- id: control_signal_generator
  label: Signal Generator Start/Stop
  kind: action
  params:
    - name: index
      type: integer
      description: Index 0 or 3
    - name: state
      type: enum
      values: [START, STOP, TOGGLE]

- id: reboot
  label: Reboot Device
  kind: action
  params: []
  note: No acknowledgement sent on this command

- id: restore_default_settings
  label: Restore Default Settings
  kind: action
  params: []
- id: get_model
  label: Get Model
  kind: query
  params: []
- id: get_serial_num
  label: Get Serial Number
  kind: query
  params: []
- id: get_fw_ver
  label: Get Firmware Version
  kind: query
  params: []
- id: get_ip_addr_net_audio_primary
  label: Get Primary Audio Network IP Address
  kind: query
  params: []
- id: get_ip_subnet_net_audio_primary
  label: Get Primary Audio Network Subnet Mask
  kind: query
  params: []
- id: get_ip_gateway_net_audio_primary
  label: Get Primary Audio Network Gateway
  kind: query
  params: []
- id: get_control_mac_addr
  label: Get Control MAC Address
  kind: query
  params: []
- id: get_device_id
  label: Get Device ID
  kind: query
  params: []
- id: get_na_device_name
  label: Get Dante Device Name
  kind: query
  params: []
- id: get_audio_out_clip_indicator
  label: Get Audio Clip Indicator
  kind: query
  params:
    - name: channel
      type: integer
- id: get_meter_rate
  label: Get Metering Rate
  kind: query
  params: []
- id: set_meter_rate
  label: Set Metering Rate
  kind: action
  params:
    - name: rate
      type: integer
- id: get_limiter_engaged
  label: Get Limiter Engaged Status
  kind: query
  params:
    - name: channel
      type: integer
- id: get_encryption
  label: Get Device Encryption Status
  kind: query
  params: []
- id: get_preset_name
  label: Get Preset Name
  kind: query
  params:
    - name: preset_number
      type: integer
- id: get_all
  label: Get All Device Parameters
  kind: query
  params: []
- id: get_channel_all
  label: Get All Parameters for Channel
  kind: query
  params:
    - name: channel
      type: integer
```

## Feedbacks
```yaml
- id: device_audio_mute_status
  type: enum
  values: [ON, OFF]
  description: Device mute state, reported via REP

- id: channel_mute_status
  type: enum
  values: [ON, OFF]
  description: Per-channel mute state

- id: audio_gain_hi_res_status
  type: range
  description: Gain 0-1400 representing -110.0 dB to +30.0 dB in 0.1 dB steps

- id: delay_status
  type: integer
  description: Delay in ms (0=disabled, 1-160 for MXN5-C)

- id: audio_out_clip_indicator
  type: enum
  values: [ON, OFF]
  description: Audio output clip status per channel

- id: limiter_engaged
  type: enum
  values: [ON, OFF]
  description: Limiter engaged status for channel 03

- id: peq_filter_status
  type: enum
  values: [ON, OFF, TOGGLE]
  description: PEQ filter enable status

- id: bypass_dsp_status
  type: enum
  values: [ON, OFF, TOGGLE]
  description: DSP bypass status (EQ, delay, limiter)

- id: signal_generator_type_status
  type: enum
  values: [PINK, WHITE, TONE, SWEEP]

- id: signal_generator_frequency_status
  type: integer
  description: Signal generator frequency in Hz

- id: signal_generator_gain_status
  type: integer
  description: Signal generator gain 0-1310

- id: signal_generator_status
  type: enum
  values: [START, STOP, TOGGLE]

- id: preset_recall_status
  type: integer
  description: Currently active preset number 1-10

- id: channel_name_status
  type: string
  description: Up to 31 character channel name

- id: na_channel_name_status
  type: string
  description: Dante channel name (up to 31 chars)

- id: flash_status
  type: enum
  values: [ON, OFF]
  description: Flash LED state

- id: encryption_status
  type: enum
  values: [ON, OFF]
  description: Device encryption status

- id: default_settings_status
  type: integer
  description: "00" indicates restore successful

- id: error_response
  type: enum
  values: [ERR]
  description: Error response, returned when a command is invalid

- id: audio_levels_sample
  type: string
  description: "SAMPLE aaa bbb ccc ddd" - audio levels 000-060 representing -60 to 0 dBFS for channels 01-04
```

## Variables
```yaml
# Device identity
- id: model
  type: string
  description: 32-character quoted model name string

- id: serial_number
  type: string
  description: 32 alphanumeric character serial number

- id: firmware_version
  type: string
  description: 3 version numbers separated by periods (e.g. 65535.65535.65535)

- id: device_id
  type: string
  description: Up to 31 character device identifier string

- id: control_mac_address
  type: string
  description: MAC address formatted as 6 octets separated by colons (e.g. 00:0E:DD:FF:F1:63)

- id: na_device_name
  type: string
  description: Dante device name (up to 31 chars)

# Network
- id: ip_addr_net_audio_primary
  type: string
  description: IP address of primary audio network (4 octets, 15 chars padded)

- id: ip_subnet_net_audio_primary
  type: string
  description: Subnet mask (15 chars padded)

- id: ip_gateway_net_audio_primary
  type: string
  description: Gateway address (15 chars padded)

# Metering
- id: metering_rate
  type: integer
  description: Meter rate in milliseconds (100-99999, 0=off)

- id: preset_name
  type: string
  description: Preset name (25 chars, alphanumeric + special chars, {empty} if unused)
```

## Events
```yaml
# All REP commands listed above also serve as unsolicited events when parameters change on the device.
# REP ERR is sent on invalid commands.
# SAMPLE messages are sent at the configured METER_RATE.
# UNRESOLVED: specific event triggering conditions not enumerated in source (only general behavior described)
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Channel Number Assignments for MXN5-C:
- Dante inputs: 01-02
- Summed input (no Dante name): 03
- Dante output: 04

All messages are ASCII. GET/SET/REP/SAMPLE command types documented. Device sends REP on every parameter change — clients do not need to poll. Reboot command sends no acknowledgement.

<!-- UNRESOLVED: Dante/AES67 audio transport parameters not detailed in source -->
<!-- UNRESOLVED: LED behavior (normal operation, status colors) not documented -->
<!-- UNRESOLVED: factory preset contents not documented -->

## Provenance

```yaml
source_domains:
  - shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/MXN5-C
retrieved_at: 2026-04-30T01:18:53.215Z
last_checked_at: 2026-04-30T14:54:06.582Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T14:54:06.582Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions found in source; transport verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power consumption, thermal limits not stated in source"
- "LED behavior during normal operation not detailed (flash command only)"
- "specific event triggering conditions not enumerated in source (only general behavior described)"
- "no explicit multi-step macros defined in source"
- "no safety warnings or interlock procedures in source"
- "Dante/AES67 audio transport parameters not detailed in source"
- "LED behavior (normal operation, status colors) not documented"
- "factory preset contents not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
