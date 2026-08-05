---
spec_id: admin/ashly-audio-ne8250-70pe
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ashly Audio ne8250.70Pe Control Spec"
manufacturer: "Ashly Audio"
model_family: ne8250.70Pe
aliases: []
compatible_with:
  manufacturers:
    - "Ashly Audio"
  models:
    - ne8250.70Pe
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/10/ne_Processors_RS-232_Protocol.pdf
  - https://ashly.com/wp-content/uploads/2026/03/NE-Multi-Channel-Amps-r14.pdf
  - https://ashly.com/ne-network-enabled/
retrieved_at: 2026-07-13T18:23:14.126Z
last_checked_at: 2026-07-21T20:11:37.920Z
generated_at: 2026-07-21T20:11:37.920Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document explicitly names ne24.24M, ne8800, ne4800, and ne4404 as the covered products; the ne8250.70Pe is NOT explicitly named. Compatibility is inferred from ne-family membership but is unverified."
  - "Which subset of message types applies to the ne8250.70Pe specifically is not stated. Several message types (06, 08, 09) are documented as ne24.24M-only."
  - "flow control not stated in source"
  - "no separate variable model stated in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "flow control setting not stated in source"
  - "firmware version compatibility not stated in source"
  - "which message types subset applies to ne8250.70Pe specifically"
verification:
  verdict: verified
  checked_at: 2026-07-21T20:11:37.920Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions map literally to distinct source message types with matching byte shapes; transport params and remaining source commands (responses/event) are covered by Feedbacks/Events. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Ashly Audio ne8250.70Pe Control Spec

## Summary
RS-232 serial control protocol for the Ashly Audio "ne" series DSP products. The ne8250.70Pe is a networkable multichannel power amplifier in the ne family. This spec covers the binary SysEx-framed (F0…F7) message catalogue documented in the Ashly ne-series RS-232 control protocol reference, including data request/response, meter, preset, gain, EQ, gate, compressor, mixer, and wall-remote (WR) command sets.

<!-- UNRESOLVED: The source document explicitly names ne24.24M, ne8800, ne4800, and ne4404 as the covered products; the ne8250.70Pe is NOT explicitly named. Compatibility is inferred from ne-family membership but is unverified. -->
<!-- UNRESOLVED: Which subset of message types applies to the ne8250.70Pe specifically is not stated. Several message types (06, 08, 09) are documented as ne24.24M-only. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # stated: "9600bps for all products, except the ne24.24M"
  data_bits: 8  # stated
  parity: none  # stated: "No Parity"
  stop_bits: 1  # stated
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth/login procedure in source
```

**Framing notes (from source):**
- All data transmitted as hex bytes (not ASCII characters). In Crestron use `\x` (e.g. F0 → `\xF0`).
- Every message uses SysEx-style framing: start byte `F0`, stop byte `F7`.
- Device-class header bytes: `00 01 2A 06 00` (bytes 2–6) for native message types.
- Wall-Remote (WR) messages use class identifier `0C` at byte 5: header `00 01 2A 0C 00`.
- Byte 7 is always the message type identifier.
- Message types `06`–`1A` and `WR-0A`/`WR-0B`/`WR-0C` are echoed back from the unit to confirm reception.
- Message types `00`, `02`, `04`, `WR-03`, `WR-05`, `WR-07` invoke a specific response from the unit.
- Non-applicable or invalid messages are echoed back as received with no action taken.
- Hardware setup: 1 Start Bit, 8 Data Bits, 1 Stop Bit, No Parity.

## Traits
```yaml
traits:
  - queryable  # inferred: data request, meter request, preset names request, WR inquiries
  - routable  # inferred: mixer message (12) enables source→output routing
  - levelable  # inferred: gain messages (0C, 1A), mixer fader levels
```

## Actions
```yaml
# Native message header: F0 00 01 2A 06 00 ; WR header: F0 00 01 2A 0C 00
# Channel encoding: 00-3B = Inputs 1-60 ; 40-7B = Outputs 1-60

- id: data_request
  label: Data Request (Configuration/Input/Output)
  kind: query
  command: "F0 00 01 2A 06 00 00 {request_type} {channel} F7"
  params:
    - name: request_type
      type: enum
      description: "00 = configuration; 01 = input channel settings; 02 = output channel settings"
    - name: channel
      type: integer
      description: "Channel number 00-3B = Inputs/Outputs 1-60; use 00 during a configuration request"

- id: meter_request
  label: Meter Request
  kind: query
  command: "F0 00 01 2A 06 00 02 F7"
  params: []

- id: preset_names_request
  label: Preset Names Request
  kind: query
  command: "F0 00 01 2A 06 00 04 F7"
  params: []

- id: preset_save
  label: Preset Save (ne24.24M only)
  kind: action
  command: "F0 00 01 2A 06 00 06 {preset} {name_char_1..20} F7"
  params:
    - name: preset
      type: integer
      description: "Preset number to save to: 00 = preset 1, 01 = preset 2, …"
    - name: name
      type: string
      description: "20 ASCII name characters, hex range 20-7A"

- id: preset_recall
  label: Preset Recall
  kind: action
  command: "F0 00 01 2A 06 00 07 {preset} {mute_status} F7"
  params:
    - name: preset
      type: integer
      description: "Preset number to recall: 00 = preset 1, 01 = preset 2, …"
    - name: mute_status
      type: enum
      description: "00 = as per preset settings; 01 = force all channels to mute"

- id: data_download_input
  label: Data Download - Input Channel (ne24.24M only)
  kind: action
  command: "F0 00 01 2A 06 00 08 01 {channel} {input_channel_data} F7"
  params:
    - name: channel
      type: integer
      description: "00-13 = input channels 1-20 (as available)"
    - name: input_channel_data
      type: binary
      description: "Full input channel message body per ne24.24M Input Channel Message table (bytes 10-159)"

- id: data_download_output
  label: Data Download - Output Channel (ne24.24M only)
  kind: action
  command: "F0 00 01 2A 06 00 08 02 {channel} {output_channel_data} F7"
  params:
    - name: channel
      type: integer
      description: "00-13 = output channels 1-20 (as available)"
    - name: output_channel_data
      type: binary
      description: "Full output channel message body per ne24.24M Output Channel Message table (bytes 10-179)"

- id: preset_channel_name
  label: Preset/Channel Name Message (ne24.24M only)
  kind: action
  command: "F0 00 01 2A 06 00 09 {type} {name_char_1..20} F7"
  params:
    - name: type
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60; 127 (7F) = Working Preset"
    - name: name
      type: string
      description: "20 ASCII name characters, hex range 20-7A"

- id: polarity_message
  label: Polarity Message
  kind: action
  command: "F0 00 01 2A 06 00 0A {channel} {polarity} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    - name: polarity
      type: enum
      description: "00 = normal; 01 = inverted"

- id: preamp_message
  label: Preamp Message
  kind: action
  command: "F0 00 01 2A 06 00 0B {channel} {preamp_gain} {phantom} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60"
    - name: preamp_gain
      type: enum
      description: "00 = 0 dB; 14 = 20 dB; 28 = 40 dB; 3C = 60 dB"
    - name: phantom
      type: enum
      description: "00 = off; 01 = on"

- id: gain_message
  label: Gain Message
  kind: action
  command: "F0 00 01 2A 06 00 0C {channel} {gain_bits_13_7} {gain_bits_6_0} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    - name: gain_bits_13_7
      type: integer
      description: "Upper 7 bits of 14-bit Gain Word; Word decimal 7692-8312 = -50 to +12 dB in 0.1 dB steps (8192 = 0 dB). Byte9 = gainWord/128"
    - name: gain_bits_6_0
      type: integer
      description: "Lower 7 bits of Gain Word. Byte10 = gainWord & 127"

- id: delay_message
  label: Delay Message
  kind: action
  command: "F0 00 01 2A 06 00 0D {channel} {delay_bits_20_14} {delay_bits_13_7} {delay_bits_6_0} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    - name: delay
      type: integer
      description: "21-bit Delay Word (0-32760); Delay seconds = DelayWord / 48000 (0-682.500 ms). Note: +1.46 ms propagation delay input-to-output"

- id: eq_filter_message
  label: EQ Filter Message
  kind: action
  command: "F0 00 01 2A 06 00 0E {channel} {filter_num} {freq_bit14} {freq_bits_13_7} {freq_bits_6_0} {q_index} {gain_bits_13_7} {gain_bits_6_0} {status_type} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    - name: filter_num
      type: integer
      description: "00 = filter 1, 01 = filter 2, …"
    - name: frequency
      type: integer
      description: "15-bit Frequency Word = actual frequency in Hz. PEQ range 20-20000 Hz; Low Shelf 20-2000 Hz; High Shelf 3890-20000 Hz"
    - name: q_index
      type: integer
      description: "Range 0B-6B = 1/64 to 4 oct (see Bandwidth vs Q-index table)"
    - name: gain
      type: integer
      description: "14-bit Gain Word; PEQ range 7892-8342 = -30 to +15 dB; Shelf range 8042-8342 = -15 to +15 dB (8192 = 0 dB)"
    - name: status_type
      type: integer
      description: "Bit 6 status: 0 = bypass, 1 = active; lower nibble type: 00-05 = PEQ, LS1, LS2, HS1, HS2, Allpass"

- id: gate_message
  label: Gate Message
  kind: action
  command: "F0 00 01 2A 06 00 0F {channel} {threshold} {floor} {attack_rate} {release_rate} {status} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    - name: threshold
      type: integer
      description: "14-78 = -80 to +20 dBu"
    - name: floor
      type: integer
      description: "13 = Off (-INF); 14-64 = -80 to 0 dBu"
    - name: attack_rate
      type: enum
      description: "00-07 = 0.2, 0.5, 1, 2, 5, 10, 20, 50 ms/dB"
    - name: release_rate
      type: enum
      description: "00-07 = 5, 10, 20, 50, 100, 200, 500, 1000 ms/dB"
    - name: status
      type: enum
      description: "00 = bypass; 01 = active"

- id: auto_leveler_message
  label: Auto-Leveler Message
  kind: action
  command: "F0 00 01 2A 06 00 10 {channel} {target_level} {threshold} {ratio} {gain_rate} {hold_time} {status} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    - name: target_level
      type: integer
      description: "3C-78 = -40 to +20 dBu"
    - name: threshold
      type: integer
      description: "46-64 = -30 to 0 dB below target level"
    - name: ratio
      type: enum
      description: "00-06 = 1.2, 1.5, 2, 3, 4, 6, 10 to 1"
    - name: gain_rate
      type: integer
      description: "Bits3-0 = increase rate; Bits7-4 = decrease rate; each nibble 00-07 = 5,10,20,50,100,200,500,1000 ms/dB"
    - name: hold_time
      type: enum
      description: "00-06 = 0 to 6 seconds"
    - name: status
      type: enum
      description: "00 = bypass; 01 = active"

- id: dynamic_ducker_message
  label: Dynamic Ducker Message
  kind: action
  command: "F0 00 01 2A 06 00 11 {channel} {threshold} {depth} {release_rate} {status} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    - name: threshold
      type: integer
      description: "14-78 = -80 to +20 dBu"
    - name: depth
      type: integer
      description: "45 = Off (-INF); 46-64 = -30 to 0 dBu"
    - name: release_rate
      type: enum
      description: "00-07 = 5, 10, 20, 50, 100, 200, 500, 1000 ms/dB"
    - name: status
      type: enum
      description: "00 = bypass; 01 = high priority trigger; 02 = low priority trigger; 03 = ducked program"

- id: mixer_message
  label: Mixer Message
  kind: action
  command: "F0 00 01 2A 06 00 12 {channel} {source} {level} {routing} {mute} F7"
  params:
    - name: channel
      type: integer
      description: "40-7B = Outputs 1-60 (output whose mixer to address)"
    - name: source
      type: integer
      description: "00-3B = Inputs 1-60 (mix fader)"
    - name: level
      type: enum
      description: "00 = -INF; 01-3F = -50 to +12 dB in 1 dB steps"
    - name: routing
      type: enum
      description: "00 = disable; 01 = enable (allow source to output routing)"
    - name: mute
      type: enum
      description: "00 = not muted; 01 = muted (mixer fader mute status)"

- id: hpf_lpf_message
  label: HPF/LPF Message
  kind: action
  command: "F0 00 01 2A 06 00 13 {channel} {filter} {freq_bit14} {freq_bits_13_7} {freq_bits_6_0} {type} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    - name: filter
      type: enum
      description: "00 = high-pass filter; 01 = low-pass filter"
    - name: frequency
      type: integer
      description: "15-bit Frequency Word = frequency in Hz"
    - name: type
      type: enum
      description: "00-0A = ButterWorth2, Bessel2, LinkwitzRiley2, BW/LR3, B3, BW4, B4, LR4, BW8, B8, LR8"

- id: compressor_limiter_message
  label: Compressor-Limiter Message
  kind: action
  command: "F0 00 01 2A 06 00 14 {channel} {threshold} {ratio} {attack_rate} {release_rate} {status} {link} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    - name: threshold
      type: integer
      description: "50-78 = -20 to +20 dBu"
    - name: ratio
      type: enum
      description: "00-08 = 1.2, 1.5, 2, 3, 4, 6, 10, 20, INF to 1"
    - name: attack_rate
      type: enum
      description: "00-07 = 0.2, 0.5, 1, 2, 5, 10, 20, 50 ms/dB"
    - name: release_rate
      type: enum
      description: "00-07 = 5, 10, 20, 50, 100, 200, 500, 1000 ms/dB"
    - name: status
      type: enum
      description: "00 = bypass; 01 = active"
    - name: link
      type: enum
      description: "00 = not linked; 01 = linked (linked channels track channel with most gain reduction)"

- id: channel_mute_message
  label: Channel Mute Message
  kind: action
  command: "F0 00 01 2A 06 00 15 {channel} {mute_status} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    - name: mute_status
      type: enum
      description: "00 = not muted; 01 = muted"

- id: eq_status_message
  label: EQ Status Message
  kind: action
  command: "F0 00 01 2A 06 00 16 {channel} {eq_status} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    - name: eq_status
      type: enum
      description: "00 = bypass; 01 = active"

- id: mute_unmute_all_outputs
  label: Mute/Unmute All Outputs Message
  kind: action
  command: "F0 00 01 2A 06 00 17 {status} F7"
  params:
    - name: status
      type: enum
      description: "00 = unmute all outputs; 01 = mute all outputs"

- id: mixer_fader_mute_message
  label: Mixer Fader Mute/Unmute Message (Routing Source Enable/Disable)
  kind: action
  command: "F0 00 01 2A 06 00 19 {channel} {source} {mute_status} F7"
  params:
    - name: channel
      type: integer
      description: "40-7B = Outputs 1-60"
    - name: source
      type: integer
      description: "00-3B = Inputs 1-60 (mix fader)"
    - name: mute_status
      type: enum
      description: "00 = not muted; 01 = muted"

- id: gain_increment_decrement
  label: Gain Increment/Decrement Message
  kind: action
  command: "F0 00 01 2A 06 00 1A {channel} {value} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    - name: value
      type: enum
      description: "00-03 = .5dB, 1dB, 2dB, 3dB decrement; 10-13 = .5dB, 1dB, 2dB, 3dB increment"

# --- Wall Remote (WR) messages. Header byte 5 = 0C (WR class identifier). ---

- id: wr_preset_mute_status_inquiry
  label: WR-03 Preset Number & Mute Status Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 03 00 01 F7"
  # WR id bytes (00 01) inferred from WR-07 pattern; source table truncated
  params: []

- id: wr_output_gain_mixer_mutes_inquiry
  label: WR-05 Output Gain & Mixer Mutes Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 05 00 01 {channel} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Outputs 1-60"

- id: wr_channel_gain_inquiry
  label: WR-07 Channel Gain Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 07 00 01 {channel} F7"
  params:
    - name: channel
      type: integer
      description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"

- id: wr_mute_unmute_multi_channel
  label: WR-0A Mute/Unmute with Multiple Channel Selection
  kind: action
  command: "F0 00 01 2A 0C 00 0A 00 01 {um} {in_1_7} {in_8_14} {in_15_20} 00 {out_1_7} {out_8_14} {out_15_20} 00 F7"
  params:
    - name: um
      type: enum
      description: "00 = unmute selected channels; 01 = mute selected channels"
    - name: in_1_7
      type: integer
      description: "Inputs 1-7 selection bitmask (bit high = selected)"
    - name: in_8_14
      type: integer
      description: "Inputs 8-14 selection bitmask"
    - name: in_15_20
      type: integer
      description: "Inputs 15-20 selection bitmask"
    - name: out_1_7
      type: integer
      description: "Outputs 1-7 selection bitmask"
    - name: out_8_14
      type: integer
      description: "Outputs 8-14 selection bitmask"
    - name: out_15_20
      type: integer
      description: "Outputs 15-20 selection bitmask"

- id: wr_gain_multi_channel
  label: WR-0B Gain Message with Multiple Channel Selection
  kind: action
  command: "F0 00 01 2A 0C 00 0B 00 01 {gain} {in_1_7} {in_8_14} {in_15_20} 00 {out_1_7} {out_8_14} {out_15_20} 00 F7"
  params:
    - name: gain
      type: integer
      description: "New gain value 00-63 hex; 00 = minimum, 63 = max gain"
    - name: in_1_7
      type: integer
      description: "Inputs 1-7 selection bitmask (bit high = selected)"
    - name: in_8_14
      type: integer
      description: "Inputs 8-14 selection bitmask"
    - name: in_15_20
      type: integer
      description: "Inputs 15-20 selection bitmask"
    - name: out_1_7
      type: integer
      description: "Outputs 1-7 selection bitmask"
    - name: out_8_14
      type: integer
      description: "Outputs 8-14 selection bitmask"
    - name: out_15_20
      type: integer
      description: "Outputs 15-20 selection bitmask"

- id: wr_mixer_faders_mute_multi_source
  label: WR-0C Mixer Faders Mute/Unmute with Multiple Source Selection
  kind: action
  command: "F0 00 01 2A 0C 00 0C 00 01 {mix_out_1_7} {mix_out_8_14} {mix_out_15_20} 00 {mute_1_7} {mute_8_14} {mute_15_20} 00 {unmute_1_7} {unmute_8_14} {unmute_15_20} 00 F7"
  params:
    - name: mix_out_1_7
      type: integer
      description: "Mixer (output channel) 1-7 selection bitmask (bit high = selected)"
    - name: mix_out_8_14
      type: integer
      description: "Mixer 8-14 selection bitmask"
    - name: mix_out_15_20
      type: integer
      description: "Mixer 15-20 selection bitmask"
    - name: mute_1_7
      type: integer
      description: "Mix faders 1-7 to mute (bit high = mute)"
    - name: mute_8_14
      type: integer
      description: "Mix faders 8-14 to mute"
    - name: mute_15_20
      type: integer
      description: "Mix faders 15-20 to mute"
    - name: unmute_1_7
      type: integer
      description: "Mix faders 1-7 to unmute (bit high = unmute)"
    - name: unmute_8_14
      type: integer
      description: "Mix faders 8-14 to unmute"
    - name: unmute_15_20
      type: integer
      description: "Mix faders 15-20 to unmute"
```

## Feedbacks
```yaml
- id: data_response_config
  label: "01 (type 00) Data Response: Configuration"
  type: binary
  description: "Reply to configuration Data Request. Payload includes 20-byte preset name, expansion card status, current preset number, DSP status."

- id: data_response_input
  label: "01 (type 1) Data Response: Input Channel Settings"
  type: binary
  description: "Reply to input channel Data Request. See ne24.24M Input Channel Message table."

- id: data_response_output
  label: "01 (type 2) Data Response: Output Channel Settings"
  type: binary
  description: "Reply to output channel Data Request. See ne24.24M Output Channel Message table."

- id: meter_response
  label: "03 Meter Response"
  type: binary
  description: "Reply to Meter Request. Per-channel input/output level bytes (format 0CLLLLLL: bits5-0 = dBu level 0..3F, bit6 = clip). Unavailable channel bytes undefined."

- id: meter_response_ne2424m
  label: "03(b) Meter Response (ne24.24M)"
  type: binary
  description: "Extended ne24.24M meter reply including level, auto-level/gate status (0GALLLLLL), and limiter gain reduction bytes."

- id: preset_names_response
  label: "05 Preset Names Response"
  type: binary
  description: "Reply to Preset Names Request. 700 ASCII name characters (20 per preset, preset 1 first), hex range 20-7A."

- id: wr_preset_mute_status_response
  label: "WR-04 Preset Number & Mute Status Response"
  type: binary
  description: "Reply to WR-03. Includes preset number and input/output mute status bitmasks."

- id: wr_output_gain_mixer_mutes_response
  label: "WR-06 Output Gain & Mixer Mutes Response"
  type: binary
  description: "Reply to WR-05. Includes output channel gain (00-3F) and mixer fader mute status bitmasks."

- id: wr_channel_gain_response
  label: "WR-08 Channel Gain Response"
  type: binary
  description: "Reply to WR-07. Includes channel (00-3B/40-7B) and gain (00-3F: 00=-INF, 01-3F=-50 to +12 dB)."
```

## Variables
```yaml
# Settable parameters exposed above as parameterized actions. No additional
# standalone settable variables documented beyond the action parameters.
# UNRESOLVED: no separate variable model stated in source
```

## Events
```yaml
- id: local_preset_recall_update
  label: "42 Local Preset Recall Update"
  type: binary
  description: "Unsolicited notification transmitted from the unit when a local preset change occurs (contact closure, front panel, etc.). Payload: F0 00 01 2A 06 00 42 {preset} F7, where 00 = Preset 1, 01 = Preset 2, …"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source. Never inferred.
```

## Notes
- **Model coverage gap:** The source document is titled "RS-232 Control Protocol for: ne24.24M, ne8800, ne4800, ne4400". The ne8250.70Pe is not explicitly named; ne-family compatibility is inferred and unverified.
- **ne24.24M-only message types:** `06` (Preset Save), `08` (Data Download), `09` (Preset/Channel Name) are documented as ne24.24M-only. Applicability to ne8250.70Pe is unverified.
- **DSP function population:** All products except ne24.24M require associated DSP functions to be populated via Ashly software for each message type. Some DSP functions are not available in all products.
- **Echo confirmation:** Message types `06`–`1A` and `WR-0A`/`WR-0B`/`WR-0C` are always echoed back by the unit to confirm reception.
- **Invalid messages:** Non-applicable or invalid messages are echoed back as received with no action taken.
- **Propagation delay:** Additional 1.46 ms propagation delay from any input to any output due to digital converters and DSP.
- **Gain Word encoding:** 14-bit decimal range 7692–8312 = -50 to +12 dB in 0.1 dB steps (8192 = 0 dB). Byte9 = gainWord/128; Byte10 = gainWord & 127. Worked example: set Input 7 to -50 dB → `F0 00 01 2A 06 00 0C 06 3C 0C F7`.
- **Frequency Word encoding:** 15-bit Frequency Word = actual frequency in Hz; transmitted across 3 bytes (bit14, bits13-7, bits6-0). See Sample Frequency Bytes table in source.
- **Q-index:** Bandwidth = (1/3) × 2^[(Q-index - 64)/12]; range 0B–6B = 1/64 to 4 oct.
- **ne24.24M baud switching:** ne24.24M powers on at 38400 bps and switches to 9600 bps upon receiving ten `F9` bytes at 9600 bps. All other ne products use 9600 bps at power-on.
<!-- UNRESOLVED: flow control setting not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: which message types subset applies to ne8250.70Pe specifically -->
````

## Provenance

```yaml
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/10/ne_Processors_RS-232_Protocol.pdf
  - https://ashly.com/wp-content/uploads/2026/03/NE-Multi-Channel-Amps-r14.pdf
  - https://ashly.com/ne-network-enabled/
retrieved_at: 2026-07-13T18:23:14.126Z
last_checked_at: 2026-07-21T20:11:37.920Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:11:37.920Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions map literally to distinct source message types with matching byte shapes; transport params and remaining source commands (responses/event) are covered by Feedbacks/Events. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document explicitly names ne24.24M, ne8800, ne4800, and ne4404 as the covered products; the ne8250.70Pe is NOT explicitly named. Compatibility is inferred from ne-family membership but is unverified."
- "Which subset of message types applies to the ne8250.70Pe specifically is not stated. Several message types (06, 08, 09) are documented as ne24.24M-only."
- "flow control not stated in source"
- "no separate variable model stated in source"
- "no multi-step sequences documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "flow control setting not stated in source"
- "firmware version compatibility not stated in source"
- "which message types subset applies to ne8250.70Pe specifically"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
