---
spec_id: admin/toa-m_9000m2
schema_version: ai4av-public-spec-v1
revision: 1
title: "TOA M-9000M2 Control Spec"
manufacturer: TOA
model_family: M-9000M2
aliases: []
compatible_with:
  manufacturers:
    - TOA
  models:
    - M-9000M2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - toacanada.com
  - toaelectronics.com
  - toa-products.com
source_urls:
  - https://www.toacanada.com/toa-assets/9000M2_PROTOCOL_MANUAL_EN.pdf
  - "https://www.toaelectronics.com/en-us/downloads?product_number=M-9000M2"
  - https://www.toa-products.com/international/download/manual/m-9000m2_ce_mt1e.pdf
  - "https://www.toa-products.com/international/file.php?sid=4976"
retrieved_at: 2026-04-30T12:37:28.723Z
last_checked_at: 2026-04-30T15:23:26.169Z
generated_at: 2026-04-30T15:23:26.169Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:23:26.169Z
  matched_actions: 16
  action_count: 16
  confidence: high
  summary: "All 16 spec actions matched with correct opcodes; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# TOA M-9000M2 Control Spec

## Summary
RS-232C protocol spec for the 9000M2 Series Mixer/Amplifier. Controls fader gain, crosspoint routing, tone/EQ, filter, phantom power, paging events, speaker presets, and ANC. Supports 8 input + 8 output channels. Firmware v1.00+.

<!-- UNRESOLVED: matrix mode not available on M-9000M2 series (mixer mode only). -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # also supports: 19200, 38400, 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: D-sub 9 pin
  pinout:
    tx: 2
    rx: 3
    gnd: 5
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: power on/off commands documented
- levelable  # inferred: fader gain, tone control, EQ gain commands present
- routable   # inferred: crosspoint gain routing between input/output channels
- queryable  # inferred: channel name request command present
```

## Actions
```yaml
- id: channel_fader_gain
  label: Channel Fader Gain Set
  kind: action
  params:
    - name: channel_attribute
      type: integer
      description: 00H=Input channel, 01H=Output channel
    - name: channel_number
      type: integer
      description: "00H-07H (ch 1-8)"
    - name: value
      type: integer
      description: 00H-7EH = -∞ to +10 dB position

- id: channel_fader_gain_step
  label: Channel Fader Gain Step Up/Down
  kind: action
  params:
    - name: channel_attribute
      type: integer
      description: 00H=Input, 01H=Output
    - name: channel_number
      type: integer
      description: "00H-07H"
    - name: step
      type: integer
      description: "41H-5FH = 1-31 step up, 61H-7FH = 1-31 step down"

- id: paging_output_fader_gain
  label: Paging Output Fader Gain Set
  kind: action
  params:
    - name: channel_number
      type: integer
      description: "00H-07H (Paging Output ch 1-8)"
    - name: value
      type: integer
      description: 00H-7EH = -∞ to +10 dB

- id: crosspoint_gain
  label: Crosspoint Gain Set
  kind: action
  params:
    - name: source_channel_attribute
      type: integer
      description: 00H=Input channel
    - name: source_channel_number
      type: integer
      description: "00H-07H"
    - name: destination_channel_attribute
      type: integer
      description: 01H=Output channel
    - name: destination_channel_number
      type: integer
      description: "00H-07H"
    - name: value
      type: integer
      description: "00H-51H = fixed gain (-∞ to +10dB), 60H-6FH = step down, 70H-7FH = step up"

- id: preset_memory_recall
  label: Preset Memory Recall
  kind: action
  params:
    - name: preset_number
      type: integer
      description: "00H-1FH = Preset 1-32"

- id: channel_on_off
  label: Channel ON/OFF
  kind: action
  params:
    - name: channel_attribute
      type: integer
      description: 00H=Input, 01H=Output
    - name: channel_number
      type: integer
      description: "00H-07H"
    - name: on_off
      type: integer
      description: 00H=OFF, 01H=ON

- id: power_on_off
  label: Power ON/OFF
  kind: action
  params:
    - name: on_off
      type: integer
      description: 00H=Power OFF, 01H=Power ON

- id: tone_control
  label: Tone Control (Bass/Treble)
  kind: action
  params:
    - name: channel_attribute
      type: integer
      description: 00H=Input, 01H=Output
    - name: channel_number
      type: integer
      description: "00H-07H"
    - name: bass_treble
      type: integer
      description: 00H=Bass Gain, 01H=Treble Gain
    - name: value
      type: integer
      description: "00H-18H = -12 to +12dB fixed, 21H-2CH = step down, 2DH-38H = step up"

- id: eq_settings
  label: EQ Settings
  kind: action
  params:
    - name: channel_attribute
      type: integer
      description: 00H=Input, 01H=Output
    - name: channel_number
      type: integer
      description: "00H-07H"
    - name: off_on
      type: integer
      description: 00H=EQ OFF, 01H=EQ ON
    - name: band_number
      type: integer
      description: "00H-09H = Filter 1-10"
    - name: gain_value
      type: integer
      description: "00H-18H = -12 to +12 dB"
    - name: q_value
      type: integer
      description: "00H=0.3, 01H=0.5, 02H=0.7, 03H=1, 04H=1.5, 05H=2, 06H=3, 07H=5"
    - name: freq_value
      type: integer
      description: "00H-1FH = 20Hz-20kHz (see EQ-FREQUENCY TABLE)"

- id: loudness_compensation
  label: Loudness Compensation
  kind: action
  params:
    - name: channel_attribute
      type: integer
      description: 00H=Input, 01H=Output
    - name: channel_number
      type: integer
      description: "00H-07H"
    - name: off_on
      type: integer
      description: 00H=Loudness OFF, 01H=Loudness ON

- id: filter_settings
  label: Filter Settings (HPF/LPF)
  kind: action
  params:
    - name: channel_attribute
      type: integer
      description: 00H=Input, 01H=Output
    - name: channel_number
      type: integer
      description: "00H-07H"
    - name: hpf_lpf
      type: integer
      description: 00H=High Pass Filter, 01H=Low Pass Filter
    - name: frequency_value
      type: integer
      description: "00H-1FH = frequency table value (OFF, 20Hz-20kHz)"

- id: input_sensitivity
  label: Input Sensitivity Setting
  kind: action
  params:
    - name: channel_number
      type: integer
      description: "00H-07H (Input channel only)"
    - name: value
      type: integer
      description: "00H-08H = -10 to -60 dB sensitivity"

- id: phantom_power
  label: Phantom Power ON/OFF
  kind: action
  params:
    - name: channel_number
      type: integer
      description: "00H-07H (Input channel only)"
    - name: off_on
      type: integer
      description: 00H=PHANTOM OFF, 01H=PHANTOM ON

- id: paging_event_preset_recall
  label: Paging Event Preset Recall
  kind: action
  params:
    - name: paging_event_no
      type: integer
      description: "00H-1FH = Paging Event 1-32"
    - name: control
      type: integer
      description: 00H=Stop, 01H=Start

- id: speaker_preset
  label: Speaker Preset Setting
  kind: action
  params:
    - name: output_channel_number
      type: integer
      description: "00H-07H"
    - name: value
      type: integer
      description: "00H-1FH = speaker preset (see SPEAKER PRESET TABLE)"

- id: anc_adjust
  label: ANC Adjust Setting
  kind: action
  params:
    - name: channel_number
      type: integer
      description: "00H-07H (AN channel)"
    - name: adjust_value
      type: integer
      description: "00H-14H = -10dB to +10dB"
```

## Feedbacks
```yaml
- id: command_echo
  description: Device echoes received command data back on normal reception

- id: channel_fader_gain_response
  description: Echo of fader gain command on normal reception; bit-inverted on out-of-range

- id: crosspoint_gain_response
  description: Echo of crosspoint gain command on normal reception

- id: channel_name_response
  type: bytes
  description: |
    Response to channel name request (F0H).
    Format: C0H, 09H, <Channel Attribute>, <Channel Number>, <ASCII Data 7 bytes>
    Example: C0H, 09H, 00H, 00H, 49H, 4EH, 50H, 55H, 54H, 31H, 00H = "INPUT1"

- id: anc_response
  description: |
    Response to ANC Adjust (AEH): C1H, 01H, <OK/NG>
    00H=OK, 01H=NG

- id: anc_reference_response
  description: |
    Response to ANC Reference (F3H): C2H, 01H, <Ref Level>
    <Ref Level> 00H-7FH maps to -50 to +77 dB
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command bytes use the high bit (80H-FFH) for command opcode; data parameters use 00H-7FH range.
- When channel data is out of range, the device responds with bit-inverted data.
- When non-channel data is out of range, the device sends no response.
- Preset Memory Recall (F1H) cannot be received during power off.
- EQ settings (A1H) cannot be received during power off — band number, gain, Q, and frequency only valid when EQ is ON.
- Filter settings (A2H) cannot be received during power off.
- Input sensitivity (ACH) only enabled for channels using D-001T or AN-001T modules.
- Hyperterminal HEX value 0DH may cause issues; use HEX 0DH in applications.
- Matrix mode "EVENT" terminate command (F1H, 02H, 01H) is ignored by M-9000M2 series.
<!-- UNRESOLVED: connector pinout details beyond TX/RX/GND not confirmed -->

## Provenance

```yaml
source_domains:
  - toacanada.com
  - toaelectronics.com
  - toa-products.com
source_urls:
  - https://www.toacanada.com/toa-assets/9000M2_PROTOCOL_MANUAL_EN.pdf
  - "https://www.toaelectronics.com/en-us/downloads?product_number=M-9000M2"
  - https://www.toa-products.com/international/download/manual/m-9000m2_ce_mt1e.pdf
  - "https://www.toa-products.com/international/file.php?sid=4976"
retrieved_at: 2026-04-30T12:37:28.723Z
last_checked_at: 2026-04-30T15:23:26.169Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:23:26.169Z
matched_actions: 16
action_count: 16
confidence: high
summary: "All 16 spec actions matched with correct opcodes; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
