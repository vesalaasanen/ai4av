---
schema_version: ai4av-public-spec-v1
device_id: powersoft/powersoft-duecanali
entity_id: powersoft_powersoft_amplifier_power_amp
spec_id: admin/powersoft-duecanali-k-series
revision: 1
author: admin
title: "Powersoft Duecanali & K Series Amplifier Control Spec"
status: published
manufacturer: Powersoft
manufacturer_key: powersoft
model_family: "Powersoft Duecanali"
aliases: []
compatible_with:
  manufacturers:
    - Powersoft
  models:
    - "Powersoft Duecanali"
    - "Powersoft K Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: powersoft_powersoft_amplifier_power_amp.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:50:01.791Z
retrieved_at: 2026-04-25T21:50:01.791Z
last_checked_at: 2026-04-25T21:50:01.791Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:50:01.791Z
  matched_actions: 23
  action_count: 23
  confidence: low
  summary: "All 23 spec actions matched verbatim to source command channels; transport parameters verified"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# Powersoft Duecanali & K Series Amplifier Control Spec

## Summary
This spec covers IP control of Powersoft Duecanali and K Series amplifiers via UDP, as documented in the NetLinx module interface specification. The module communicates over UDP port 8002 and exposes power, mute, attenuation, input routing, and preset recall functions. Feedback includes voltage, temperature, impedance, protection status, and alarm states.

<!-- UNRESOLVED: exact command byte framing / protocol wire format not fully documented beyond command string names -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 8002
  discovery_port: 30718
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands present
  - routable     # input signal routing commands present
  - queryable    # feedback/status channels return state values
  - levelable    # attenuation/fader channels present
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    params: []
    notes: Requires external 12V DC power supply

  - id: power_off
    label: Power Off
    kind: action
    params: []
    notes: Requires external 12V DC power supply

  - id: power_toggle
    label: Power Toggle
    kind: action
    params: []
    notes: Requires external 12V DC power supply

  - id: mute_on_ch1
    label: Mute On Channel 1
    kind: action
    params: []

  - id: mute_off_ch1
    label: Mute Off Channel 1
    kind: action
    params: []

  - id: mute_on_ch2
    label: Mute On Channel 2
    kind: action
    params: []

  - id: mute_off_ch2
    label: Mute Off Channel 2
    kind: action
    params: []

  - id: toggle_mute_ch1
    label: Toggle Mute Channel 1
    kind: action
    params: []

  - id: toggle_mute_ch2
    label: Toggle Mute Channel 2
    kind: action
    params: []

  - id: toggle_main_mute
    label: Toggle Main Mute
    kind: action
    params: []

  - id: attenuation_up_ch1
    label: Attenuation Up Channel 1
    kind: action
    params: []

  - id: attenuation_up_ch2
    label: Attenuation Up Channel 2
    kind: action
    params: []

  - id: attenuation_up_both
    label: Attenuation Up Both Channels
    kind: action
    params: []

  - id: attenuation_down_ch1
    label: Attenuation Down Channel 1
    kind: action
    params: []

  - id: attenuation_down_ch2
    label: Attenuation Down Channel 2
    kind: action
    params: []

  - id: attenuation_down_both
    label: Attenuation Down Both Channels
    kind: action
    params: []

  - id: set_routing
    label: Set Input Signal Routing
    kind: action
    params:
      - name: source
        type: integer
        values: [1, 2, 3, 4, 5, 6, 7, 8]
        description: >
          1=Analog→Output, 2=Analog→DSP→Output,
          3=AES3 CH2→Output, 4=AES3 CH2→DSP→Output,
          5=AES3→Output, 6=AES3→DSP→Output,
          7=KAESOP→Output, 8=KAESOP→DSP→Output

  - id: recall_preset
    label: Recall Preset
    kind: action
    params:
      - name: preset
        type: integer
        min: 1
        max: 50
        description: Preset number to recall

  - id: store_preset
    label: Store Preset
    kind: action
    params: []

  - id: delete_preset
    label: Delete Preset
    kind: action
    params: []

  - id: connect_disconnect
    label: Connect/Disconnect Amplifier
    kind: action
    params: []
    notes: Toggles connection; only one client connection allowed at a time

  - id: debug_on
    label: Enable Debug
    kind: action
    params: []

  - id: debug_off
    label: Disable Debug
    kind: action
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: pos_aux_voltage
    type: string
    description: Positive auxiliary voltage reading

  - id: neg_aux_voltage
    type: string
    description: Negative auxiliary voltage reading

  - id: aux_analog_voltage
    type: string
    description: Auxiliary analog voltage

  - id: main_power_voltage
    type: string
    description: Main power voltage

  - id: main_power_ampere
    type: string
    description: Main power current draw

  - id: hub_voltage
    type: string
    description: Hub voltage

  - id: output_attenuation_ch1
    type: string
    description: Output attenuation channel 1

  - id: output_attenuation_ch2
    type: string
    description: Output attenuation channel 2

  - id: current_temp_c
    type: string
    description: Current temperature in Celsius

  - id: impedance_ch1
    type: string
    description: Impedance value channel 1

  - id: impedance_ch2
    type: string
    description: Impedance value channel 2

  - id: gains_ch1
    type: string
    description: Gain value channel 1

  - id: gains_ch2
    type: string
    description: Gain value channel 2

  - id: out_voltages_ch1
    type: string
    description: Output voltage channel 1

  - id: out_voltages_ch2
    type: string
    description: Output voltage channel 2

  - id: protection_ch1
    type: enum
    description: Protection status channel 1

  - id: protection_ch2
    type: enum
    description: Protection status channel 2

  - id: hw_mute_ch1
    type: enum
    description: Hardware mute status channel 1

  - id: hw_mute_ch2
    type: enum
    description: Hardware mute status channel 2

  - id: alarm_ch1
    type: enum
    description: Alarm triggered channel 1

  - id: alarm_ch2
    type: enum
    description: Alarm triggered channel 2

  - id: dsp_alarm_ch1
    type: enum
    description: DSP alarm triggered channel 1

  - id: dsp_alarm_ch2
    type: enum
    description: DSP alarm triggered channel 2

  - id: clip_ch1
    type: enum
    description: Clip status channel 1

  - id: clip_ch2
    type: enum
    description: Clip status channel 2

  - id: gate_ch1
    type: enum
    description: Gate status channel 1

  - id: gate_ch2
    type: enum
    description: Gate status channel 2

  - id: presence
    type: enum
    description: Device presence

  - id: device_on
    type: enum
    description: Device power state

  - id: idle_ch1
    type: enum
    description: Idle status channel 1

  - id: idle_ch2
    type: enum
    description: Idle status channel 2

  - id: input_routing
    type: integer
    description: Current input signal routing mode

  - id: active_preset
    type: integer
    description: Current active preset number

  - id: firmware_info
    type: string
    description: Firmware information

  - id: tone_in_alarm_ch1
    type: enum
    description: Tone IN alarm status channel 1

  - id: tone_in_alarm_ch2
    type: enum
    description: Tone IN alarm status channel 2

  - id: tone_out_alarm_ch1
    type: enum
    description: Tone OUT alarm status channel 1

  - id: tone_out_alarm_ch2
    type: enum
    description: Tone OUT alarm status channel 2

  - id: load_monitor_ch1
    type: enum
    description: Load monitor status channel 1

  - id: load_monitor_ch2
    type: enum
    description: Load monitor status channel 2
```

## Variables
```yaml
variables:
  - id: attenuation_ch1
    type: integer
    min: 0
    max: null  # UNRESOLVED: max attenuation value not stated
    description: Attenuation level channel 1

  - id: attenuation_ch2
    type: integer
    min: 0
    max: null  # UNRESOLVED: max attenuation value not stated
    description: Attenuation level channel 2

  - id: main_fader
    type: integer
    description: Main fader level (both channels)
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event/notification mechanisms
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  Power On/Off commands require external 12V DC power supply to be present.
  Amplifier accepts only one connection at a time — using Armonia software
  requires disconnecting from the control system first.
```

## Notes
- This spec is derived from a NetLinx (AMX) module interface, which wraps the native Powersoft protocol into a simplified control interface. The raw wire protocol format (command framing, delimiters, checksums) is not documented in this source.
- Device ID parameter (`DSP1ID`) supports multi-amplifier installations via module instantiation.
- KAESOP routing option (source 7) noted as "not implemented yet" in the source document.
- Auto-unmute on fader movement is configurable per channel.

<!-- UNRESOLVED: exact UDP packet framing / command string encoding not documented -->
<!-- UNRESOLVED: feedback value units (e.g., attenuation in dB, impedance in ohms) not stated -->
<!-- UNRESOLVED: response format for feedback channels not documented -->
<!-- UNRESOLVED: discovery protocol on port 30718 not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: powersoft_powersoft_amplifier_power_amp.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:50:01.791Z
retrieved_at: 2026-04-25T21:50:01.791Z
last_checked_at: 2026-04-25T21:50:01.791Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:50:01.791Z
matched_actions: 23
action_count: 23
confidence: low
summary: "All 23 spec actions matched verbatim to source command channels; transport parameters verified"
```

## Known Gaps

```yaml
[]
```
