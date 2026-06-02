---
spec_id: admin/lectrosonics-dsp4-4-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lectrosonics DSP4/4 Control Spec"
manufacturer: Lectrosonics
model_family: DSP4/4
aliases: []
compatible_with:
  manufacturers:
    - Lectrosonics
  models:
    - DSP4/4
    - "DSP4/4 Dual"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lectrosonics.com
source_urls:
  - https://lectrosonics.com/wp-content/uploads/filr/7423/dsp44man.pdf
retrieved_at: 2026-04-29T16:52:41.558Z
last_checked_at: 2026-05-14T18:17:17.346Z
generated_at: 2026-05-14T18:17:17.346Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no IP, HTTP, or network control protocol documented — serial only"
  - "no standalone parameter variables documented beyond the action/feedback commands above"
  - "no unsolicited event notifications documented - host polling only"
  - "no multi-step macro sequences documented"
  - "no command timing, latency, or throughput specifications"
  - "no power specifications"
  - "no firmware upgrade procedure"
  - "no error code dictionary beyond general protocol framing"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.346Z
  matched_actions: 8
  action_count: 8
  confidence: medium
  summary: "All 18 spec actions matched source commands; transport parameters verified verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Lectrosonics DSP4/4 Control Spec

## Summary
The DSP4/4 is a 4-input/4-output digital audio processor with RS-232 serial control. The DSP4/4 Dual extends this to dual 4×4 processing on a single LecNet address pair (143/144). Control is via a proprietary LecNet address scheme on RS-232 at 9600 baud, supporting gain, routing, presets, and programmable I/O.

<!-- UNRESOLVED: no IP, HTTP, or network control protocol documented — serial only -->

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
- queryable       # firmware version, DSP software version, current preset, gain values, crosspoint state, programmable I/O state
- levelable       # input gain, output gain, rear panel attenuator, crosspoint gain
- routable        # matrix crosspoint routing (4×4)
```

## Actions
```yaml
- id: set_device_address
  label: Set Device Address
  kind: action
  params:
    - name: address
      type: integer
      description: Device address, range 128-254 (80h-FEh)

- id: set_current_memory_preset
  label: Set Current Memory Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Memory preset 0-7 (maps to presets 1-8)
    - name: mode
      type: integer
      description: "Mode: 0 resets rear panel I/O gains to preset, 1 preserves current gains"

- id: set_input_gain
  label: Set Input Gain
  kind: action
  params:
    - name: mask
      type: integer
      description: 4-bit mask, each bit corresponds to one of the 4 inputs (bit 0 = input 1)
    - name: gain
      type: integer
      description: "Gain value 0-78 (+10dB to -68dB), 79=off, 80=+1dB, 81=-1dB, 82=mute, 83=unmute"

- id: set_output_gain
  label: Set Output Gain
  kind: action
  params:
    - name: mask
      type: integer
      description: 4-bit mask, each bit corresponds to one of the 4 outputs (bit 0 = output 1)
    - name: gain
      type: integer
      description: "Gain value 0-78 (+10dB to -68dB), 79=off, 80=+1dB, 81=-1dB, 82=mute, 83=unmute"

- id: set_crosspoint_gain
  label: Set Crosspoint Gain
  kind: action
  params:
    - name: input
      type: integer
      description: Input number 0-3 (maps to inputs 1-4)
    - name: output
      type: integer
      description: Output number 0-3 (maps to outputs 1-4)
    - name: gain
      type: integer
      description: "Gain 0-31: 0-30 maps to +10dB to -20dB, 31=Off"

- id: simulate_programmable_input
  label: Simulate Programmable Input Button Push
  kind: action
  params:
    - name: input
      type: integer
      description: Programmable input to trigger, 1-13

- id: set_rear_panel_input_gain
  label: Set Rear Panel Input Attenuator
  kind: action
  params:
    - name: mask
      type: integer
      description: 4-bit mask for inputs 1-4
    - name: attenuator
      type: integer
      description: "0=mute, 1-31 = -1dB to -30dB in 1dB steps, 80=+1dB, 81=-1dB"

- id: set_rear_panel_output_gain
  label: Set Rear Panel Output Attenuator
  kind: action
  params:
    - name: mask
      type: integer
      description: 4-bit mask for outputs 1-4
    - name: attenuator
      type: integer
      description: "0=mute, 1-31 = -1dB to -30dB in 1dB steps, 80=+1dB, 81=-1dB"
```

## Feedbacks
```yaml
- id: device_name
  label: Device Name
  type: string
  description: "Returns 5-byte name string: 'DSP44' (68,83,80,52,52)"

- id: device_address
  label: Device Address
  type: integer
  values: [128-254]

- id: firmware_version
  label: Firmware Version
  type: integer
  description: Returns firmware version as decimal (e.g., 10 = version 1.0)

- id: dsp_software_version
  label: DSP Software Version
  type: integer
  description: Returns DSP software version as decimal

- id: current_memory_preset
  label: Current Memory Preset
  type: integer
  values: [0-7]
  description: Returns 0-7 representing memory presets 1-8

- id: input_gain
  label: Input Gain
  type: integer
  description: "Returns 0-79 per channel: 0-78 = +10dB to -68dB, 79=off; >127 = muted (subtract 128 for actual gain)"

- id: output_gain
  label: Output Gain
  type: integer
  description: "Returns 0-79 per channel: 0-78 = +10dB to -68dB, 79=off; >127 = muted (subtract 128 for actual gain)"

- id: crosspoint_gain
  label: Crosspoint Gain
  type: integer
  description: "Returns 0-31: 0-30 = +10dB to -20dB, 31=Off"

- id: programmable_io_state
  label: Programmable I/O State
  type: integer
  values: [1, 2]
  description: "1=inactive, 2=active"

- id: address_ack
  label: Address Acknowledgement
  type: integer
  description: Device returns 0 upon receiving its correct address
```

## Variables
```yaml
# UNRESOLVED: no standalone parameter variables documented beyond the action/feedback commands above
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented - host polling only
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: serial_addressing
    description: >
      LecNet uses multi-device bus topology. Multiple DSP4/4 units share a single RS-232 transmit line.
      Each device only drives its transmitter when addressed - unaddressed devices remain in high-impedance.
      Use address range 128-254 only; 255 (FFh) is invalid.
  - id: data_byte_range
    description: >
      Single-byte data values must be 0-127. Values >127 are interpreted as device addresses.
      To send data >127, use two bytes: lower 7 bits first, then 1 if MSB was 1, else 0.
```

## Notes
DSP4/4 Dual uses two LecNet addresses (default 143 for channels 1A-4A, 144 for channels 1B-4B) accessible from a single LecNet port. Valid address range is 128-254. All commands must be preceded by the device address. Communication sequence: send address → receive acknowledgement (0) → send command → interact per command.

Programmable I/O: pins 1-8 on the 15-pin D-Sub can be configured as inputs or outputs; pins 9-13 are inputs only. Inputs accept 0-5 VDC, 156mV/dB sensitivity. Outputs are active-low, 100mA max sink current, 40VDC max.
<!-- UNRESOLVED: no command timing, latency, or throughput specifications -->
<!-- UNRESOLVED: no power specifications -->
<!-- UNRESOLVED: no firmware upgrade procedure -->
<!-- UNRESOLVED: no error code dictionary beyond general protocol framing -->

## Provenance

```yaml
source_domains:
  - lectrosonics.com
source_urls:
  - https://lectrosonics.com/wp-content/uploads/filr/7423/dsp44man.pdf
retrieved_at: 2026-04-29T16:52:41.558Z
last_checked_at: 2026-05-14T18:17:17.346Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.346Z
matched_actions: 8
action_count: 8
confidence: medium
summary: "All 18 spec actions matched source commands; transport parameters verified verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no IP, HTTP, or network control protocol documented — serial only"
- "no standalone parameter variables documented beyond the action/feedback commands above"
- "no unsolicited event notifications documented - host polling only"
- "no multi-step macro sequences documented"
- "no command timing, latency, or throughput specifications"
- "no power specifications"
- "no firmware upgrade procedure"
- "no error code dictionary beyond general protocol framing"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
