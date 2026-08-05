---
spec_id: admin/ashly-audio-nxe1-52bd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ashly Audio Nxe1 52Bd Control Spec"
manufacturer: "Ashly Audio"
model_family: "Nxe1 52Bd"
aliases: []
compatible_with:
  manufacturers:
    - "Ashly Audio"
  models:
    - "Nxe1 52Bd"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/08/NE_RS-232_Protocol.pdf
  - https://ashly.com/wp-content/uploads/2026/03/nX-amp-full-manual-r12.pdf
retrieved_at: 2026-07-13T18:40:21.468Z
last_checked_at: 2026-07-21T20:19:45.791Z
generated_at: 2026-07-21T20:19:45.791Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number not stated in source (source documents RS-232 only; TCP/IP confirmed by operator)"
  - "firmware version compatibility not stated in source"
  - "exact channel count for Nxe1 52Bd not stated (source covers up to 60 in/out)"
  - "TCP port not stated in source"
  - "flow control not stated in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "TCP port number not stated in source"
  - "firmware version compatibility not stated"
  - "exact input/output channel count for Nxe1 52Bd not stated"
  - "serial flow control not stated in source"
  - "WR identification bytes 8-9 — only value 00 01 documented; unclear if other WR IDs exist"
verification:
  verdict: verified
  checked_at: 2026-07-21T20:19:45.791Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched wire-level message types in source with correct shapes and transport parameters verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Ashly Audio Nxe1 52Bd Control Spec

## Summary
Binary control protocol for the Ashly Audio Nxe1 52Bd, a network-capable DSP audio processor in the ne/Pêma series family. The protocol uses MIDI SysEx-style framing (F0…F7) with a 6-byte fixed header (F0 00 01 2A 06 00) for standard messages and a Wall Remote variant (F0 00 01 2A 0C 00). All byte values are hexadecimal, transmitted as raw bytes (not ASCII). Commands cover preset recall/save, channel gain, mute, EQ filters, gates, compressors, auto-levelers, duckers, mixers/routing, HPF/LPF, delay, polarity, preamp, metering, and data upload/download.

<!-- UNRESOLVED: TCP port number not stated in source (source documents RS-232 only; TCP/IP confirmed by operator) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact channel count for Nxe1 52Bd not stated (source covers up to 60 in/out) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
serial:
  baud_rate: 9600  # source: "Baud rate is 9600bps for all products, except the ne24.24M"
  data_bits: 8  # source: "8 Data Bits"
  parity: none  # source: "No Parity"
  stop_bits: 1  # source: "1 Start Bit ... 1 Stop Bit"
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: data request, meter request, preset names request, WR inquiry commands
  - levelable  # inferred: gain, mixer fader, preamp gain commands
  - routable  # inferred: mixer message with routing enable/disable
```

## Actions
```yaml
# All byte values are hexadecimal. Channel encoding:
#   Inputs:  00-3B = Inputs 1-60
#   Outputs: 40-7B = Outputs 1-60
# Preset encoding: 00 = preset 1, 01 = preset 2, 02 = preset 3, ...
#
# Standard header: F0 00 01 2A 06 00 {msg_type}
# Wall Remote header: F0 00 01 2A 0C 00 {msg_type} 00 01
#
# Message types 06 thru 1A, WR-0A, WR-0B, WR-0C are always echoed back from unit to confirm reception.
# Message types 06, 08, 09 are ne24.24M only.

# --- Standard message types ---

- id: data_request
  label: Data Request
  kind: query
  command: "F0 00 01 2A 06 00 00 {data_type} {channel} F7"
  params:
    - name: data_type
      type: enum
      values: ["00=configuration", "01=input_channel_settings", "02=output_channel_settings"]
      description: "Type of data to request"
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60; use 00 during configuration request"

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
  label: Preset Save
  kind: action
  command: "F0 00 01 2A 06 00 06 {preset_num} {name_20_chars} F7"
  params:
    - name: preset_num
      type: hex
      description: "Preset slot to save to, 00 = preset 1, 01 = preset 2, ..."
    - name: name_20_chars
      type: hex
      description: "20 ASCII name characters as hex values in range 20-7A"
  notes: "ne24.24M only"

- id: preset_recall
  label: Preset Recall
  kind: action
  command: "F0 00 01 2A 06 00 07 {preset_num} {mute_status} F7"
  params:
    - name: preset_num
      type: hex
      description: "00 = preset 1, 01 = preset 2, 02 = preset 3, ..."
    - name: mute_status
      type: enum
      values: ["00=as_per_preset_settings", "01=force_all_channels_mute"]
      description: "Mute behavior on recall"

- id: channel_data_download_input
  label: Channel Data Download - Input
  kind: action
  command: "F0 00 01 2A 06 00 08 01 {channel_num} {160_byte_data_block} F7"
  params:
    - name: channel_num
      type: hex
      description: "00-13 = input channels 1-20 (as available)"
    - name: data_block
      type: hex
      description: "Full input channel data block; see ne24.24M Input Channel Message structure (bytes 10-159)"
  notes: "ne24.24M only. Message type 08, subtype 01."

- id: channel_data_download_output
  label: Channel Data Download - Output
  kind: action
  command: "F0 00 01 2A 06 00 08 02 {channel_num} {180_byte_data_block} F7"
  params:
    - name: channel_num
      type: hex
      description: "00-13 = output channels 1-20 (as available)"
    - name: data_block
      type: hex
      description: "Full output channel data block; see ne24.24M Output Channel Message structure (bytes 10-179)"
  notes: "ne24.24M only. Message type 08, subtype 02."

- id: preset_channel_name
  label: Preset / Channel Name
  kind: action
  command: "F0 00 01 2A 06 00 09 {target_type} {name_20_chars} F7"
  params:
    - name: target_type
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60, 7F (127) = Working Preset"
    - name: name_20_chars
      type: hex
      description: "20 ASCII name characters as hex values in range 20-7A"
  notes: "ne24.24M only"

- id: polarity_set
  label: Polarity Message
  kind: action
  command: "F0 00 01 2A 06 00 0A {channel} {polarity} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
    - name: polarity
      type: enum
      values: ["00=normal", "01=inverted"]

- id: preamp_set
  label: Preamp Message
  kind: action
  command: "F0 00 01 2A 06 00 0B {channel} {gain} {phantom} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60"
    - name: gain
      type: enum
      values: ["00=0dB", "14=20dB", "28=40dB", "3C=60dB"]
      description: "Preamp gain in hex"
    - name: phantom
      type: enum
      values: ["00=off", "01=on"]

- id: gain_set
  label: Gain Message
  kind: action
  command: "F0 00 01 2A 06 00 0C {channel} {gain_byte1} {gain_byte2} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
    - name: gain_byte1
      type: hex
      description: "Gain word bits 13-7; gainWord = (byte1 * 128) + byte2; decimal range 7692-8312 = -50 to +12 dB in 0.1 dB steps (8192 = 0 dB)"
    - name: gain_byte2
      type: hex
      description: "Gain word bits 6-0; see Sample Gain Bytes table in source"
  notes: "Affects 'Gain' function on Hot-plug DSP products."

- id: delay_set
  label: Delay Message
  kind: action
  command: "F0 00 01 2A 06 00 0D {channel} {delay_byte1} {delay_byte2} {delay_byte3} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
    - name: delay_byte1
      type: hex
      description: "21-bit delay word bits 20-14"
    - name: delay_byte2
      type: hex
      description: "21-bit delay word bits 13-7"
    - name: delay_byte3
      type: hex
      description: "21-bit delay word bits 6-0; delay_seconds = 21bit_word / 48000; range 0-32760 (0-682.500 ms)"
  notes: "Additional 1.46 ms propagation delay from any input to any output due to digital converters and DSP."

- id: eq_filter_set
  label: EQ Filter Message
  kind: action
  command: "F0 00 01 2A 06 00 0E {channel} {filter_num} {freq_byte1} {freq_byte2} {freq_byte3} {q_index} {gain_byte1} {gain_byte2} {status_type} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
    - name: filter_num
      type: hex
      description: "00 = filter 1, 01 = filter 2, 02 = filter 3, etc."
    - name: freq_byte1
      type: hex
      description: "15-bit frequency word bit 14; frequency in Hz"
    - name: freq_byte2
      type: hex
      description: "15-bit frequency word bits 13-7"
    - name: freq_byte3
      type: hex
      description: "15-bit frequency word bits 6-0; PEQ range 20-20000 Hz; Low Shelf 20-2000 Hz; High Shelf 3890-20000 Hz"
    - name: q_index
      type: hex
      description: "Q-index range 0B-6B = 1/64 to 4 oct; BW = (1/3) * 2^[(Q-index - 64)/12]"
    - name: gain_byte1
      type: hex
      description: "14-bit filter gain word bits 13-7; PEQ range -30 to +15 dB (0.1 dB steps, word 7892-8342, 8192=0dB); Shelf range -15 to +15 dB (word 8042-8342)"
    - name: gain_byte2
      type: hex
      description: "14-bit filter gain word bits 6-0"
    - name: status_type
      type: hex
      description: "Bit 6 status: 00=bypass, 01=active; lower nibble type: 00-05 = PEQ, LS1, LS2, HS1, HS2, Allpass"

- id: gate_set
  label: Gate Message
  kind: action
  command: "F0 00 01 2A 06 00 0F {channel} {threshold} {floor} {attack} {release} {status} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
    - name: threshold
      type: hex
      description: "14-78 = -80 to +20 dBu"
    - name: floor
      type: hex
      description: "13 = Off (-INF); 14-64 = -80 to 0 dBu"
    - name: attack
      type: enum
      values: ["00=0.2", "01=0.5", "02=1", "03=2", "04=5", "05=10", "06=20", "07=50"]
      description: "Attack rate in ms/dB"
    - name: release
      type: enum
      values: ["00=5", "01=10", "02=20", "03=50", "04=100", "05=200", "06=500", "07=1000"]
      description: "Release rate in ms/dB"
    - name: status
      type: enum
      values: ["00=bypass", "01=active"]

- id: auto_leveler_set
  label: Auto-Leveler Message
  kind: action
  command: "F0 00 01 2A 06 00 10 {channel} {target_level} {threshold} {ratio} {gain_rate} {hold_time} {status} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
    - name: target_level
      type: hex
      description: "3C-78 = -40 to +20 dBu"
    - name: threshold
      type: hex
      description: "46-64 = -30 to 0 dB below target level"
    - name: ratio
      type: enum
      values: ["00=1.2:1", "01=1.5:1", "02=2:1", "03=3:1", "04=4:1", "05=6:1", "06=10:1"]
    - name: gain_rate
      type: hex
      description: "Bits 3-0 = increase rate, bits 7-4 = decrease rate; values 00-07 = 5,10,20,50,100,200,500,1000 ms/dB"
    - name: hold_time
      type: enum
      values: ["00=0s", "01=1s", "02=2s", "03=3s", "04=4s", "05=5s", "06=6s"]
    - name: status
      type: enum
      values: ["00=bypass", "01=active"]

- id: dynamic_ducker_set
  label: Dynamic Ducker Message
  kind: action
  command: "F0 00 01 2A 06 00 11 {channel} {threshold} {depth} {release} {status} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
    - name: threshold
      type: hex
      description: "14-78 = -80 to +20 dBu"
    - name: depth
      type: hex
      description: "45 = Off (-INF); 46-64 = -30 to 0 dBu"
    - name: release
      type: enum
      values: ["00=5", "01=10", "02=20", "03=50", "04=100", "05=200", "06=500", "07=1000"]
      description: "Release rate in ms/dB"
    - name: status
      type: enum
      values: ["00=bypass", "01=high_priority_trigger", "02=low_priority_trigger", "03=ducked_program"]

- id: mixer_set
  label: Mixer Message
  kind: action
  command: "F0 00 01 2A 06 00 12 {channel} {source} {level} {routing} {mute} F7"
  params:
    - name: channel
      type: hex
      description: "40-7B = Outputs 1-60 (selects output whose mixer to address)"
    - name: source
      type: hex
      description: "00-3B = Inputs 1-60 (mix fader source)"
    - name: level
      type: hex
      description: "00 = -INF; 01-3F = -50 to +12 dB in 1 dB steps"
    - name: routing
      type: enum
      values: ["00=disable", "01=enable"]
      description: "Enable to allow source-to-output routing"
    - name: mute
      type: enum
      values: ["00=not_muted", "01=muted"]
      description: "Mute status for the mixer fader"

- id: hpf_lpf_set
  label: HPF/LPF Message
  kind: action
  command: "F0 00 01 2A 06 00 13 {channel} {filter_sel} {freq_byte1} {freq_byte2} {freq_byte3} {filter_type} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
    - name: filter_sel
      type: enum
      values: ["00=high_pass_filter", "01=low_pass_filter"]
    - name: freq_byte1
      type: hex
      description: "15-bit frequency word bit 14; frequency in Hz"
    - name: freq_byte2
      type: hex
      description: "15-bit frequency word bits 13-7"
    - name: freq_byte3
      type: hex
      description: "15-bit frequency word bits 6-0; range 20-20000 Hz"
    - name: filter_type
      type: enum
      values: ["00=Butterworth2", "01=Bessel2", "02=LinkwitzRiley2", "03=BW/LR3", "04=B3", "05=Butterworth4", "06=Bessel4", "07=LinkwitzRiley4", "08=Butterworth8", "09=Bessel8", "0A=LinkwitzRiley8"]

- id: compressor_limiter_set
  label: Compressor-Limiter Message
  kind: action
  command: "F0 00 01 2A 06 00 14 {channel} {threshold} {ratio} {attack} {release} {status} {link} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
    - name: threshold
      type: hex
      description: "50-78 = -20 to +20 dBu"
    - name: ratio
      type: enum
      values: ["00=1.2:1", "01=1.5:1", "02=2:1", "03=3:1", "04=4:1", "05=6:1", "06=10:1", "07=20:1", "08=INF:1"]
    - name: attack
      type: enum
      values: ["00=0.2", "01=0.5", "02=1", "03=2", "04=5", "05=10", "06=20", "07=50"]
      description: "Attack rate in ms/dB"
    - name: release
      type: enum
      values: ["00=5", "01=10", "02=20", "03=50", "04=100", "05=200", "06=500", "07=1000"]
      description: "Release rate in ms/dB"
    - name: status
      type: enum
      values: ["00=bypass", "01=active"]
    - name: link
      type: enum
      values: ["00=not_linked", "01=linked"]
      description: "Linked channels track the channel with most gain reduction"

- id: channel_mute
  label: Channel Mute Message
  kind: action
  command: "F0 00 01 2A 06 00 15 {channel} {mute_status} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
    - name: mute_status
      type: enum
      values: ["00=not_muted", "01=muted"]

- id: eq_status_set
  label: EQ Status Message
  kind: action
  command: "F0 00 01 2A 06 00 16 {channel} {eq_status} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
    - name: eq_status
      type: enum
      values: ["00=bypass", "01=active"]

- id: mute_unmute_all_outputs
  label: Mute/Unmute All Outputs
  kind: action
  command: "F0 00 01 2A 06 00 17 {status} F7"
  params:
    - name: status
      type: enum
      values: ["00=unmute_all_outputs", "01=mute_all_outputs"]

- id: mixer_fader_mute
  label: Mixer Fader Mute/Unmute (Source Selection)
  kind: action
  command: "F0 00 01 2A 06 00 19 {channel} {source} {mute_status} F7"
  params:
    - name: channel
      type: hex
      description: "40-7B = Outputs 1-60"
    - name: source
      type: hex
      description: "00-3B = Inputs 1-60 (mix fader source)"
    - name: mute_status
      type: enum
      values: ["00=not_muted", "01=muted"]

- id: gain_increment_decrement
  label: Gain Increment/Decrement
  kind: action
  command: "F0 00 01 2A 06 00 1A {channel} {step} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
    - name: step
      type: enum
      values: ["00=0.5dB_decrement", "01=1dB_decrement", "02=2dB_decrement", "03=3dB_decrement", "10=0.5dB_increment", "11=1dB_increment", "12=2dB_increment", "13=3dB_increment"]
  notes: "Affects 'Gain' function on Hot-plug DSP products."

# --- Wall Remote (WR) message types ---
# Header byte 5 = 0C (Wall Remote class). Bytes 8-9 = WR ID (00 01).

- id: wr_preset_mute_inquiry
  label: WR Preset Number & Mute Status Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 03 00 01 F7"
  params: []

- id: wr_output_gain_mixer_mutes_inquiry
  label: WR Output Gain & Mixer Mutes Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 05 00 01 {channel} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Outputs 1-60"

- id: wr_channel_gain_inquiry
  label: WR Channel Gain Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 07 00 01 {channel} F7"
  params:
    - name: channel
      type: hex
      description: "00-3B = Inputs 1-60, 40-7B = Outputs 1-60"
  notes: "Pertains to '(ne)WR5 Remote Gain' function on Hot-plug DSP products."

- id: wr_mute_multi_channel
  label: WR Mute/Unmute with Multiple Channel Selection
  kind: action
  command: "F0 00 01 2A 0C 00 0A 00 01 {action} {in_sel_1} {in_sel_2} {in_sel_3} 00 {out_sel_1} {out_sel_2} {out_sel_3} 00 F7"
  params:
    - name: action
      type: enum
      values: ["00=unmute_selected", "01=mute_selected"]
    - name: in_sel_1
      type: hex
      description: "Bits 0-6 = Inputs 1-7 selection; high bit = selected for muting/unmuting"
    - name: in_sel_2
      type: hex
      description: "Inputs 8-14 selection bitmask"
    - name: in_sel_3
      type: hex
      description: "Inputs 15-20 selection bitmask (bit 6 unused)"
    - name: out_sel_1
      type: hex
      description: "Outputs 1-7 selection bitmask"
    - name: out_sel_2
      type: hex
      description: "Outputs 8-14 selection bitmask"
    - name: out_sel_3
      type: hex
      description: "Outputs 15-20 selection bitmask (bit 6 unused)"

- id: wr_gain_multi_channel
  label: WR Gain Message with Multiple Channel Selection
  kind: action
  command: "F0 00 01 2A 0C 00 0B 00 01 {gain} {in_sel_1} {in_sel_2} {in_sel_3} 00 {out_sel_1} {out_sel_2} {out_sel_3} 00 F7"
  params:
    - name: gain
      type: hex
      description: "New gain value 00-63 hex (0-99 decimal); 00 = minimum, 63 = max gain"
    - name: in_sel_1
      type: hex
      description: "Inputs 1-7 selection bitmask; high bit = selected to receive new gain"
    - name: in_sel_2
      type: hex
      description: "Inputs 8-14 selection bitmask"
    - name: in_sel_3
      type: hex
      description: "Inputs 15-20 selection bitmask"
    - name: out_sel_1
      type: hex
      description: "Outputs 1-7 selection bitmask"
    - name: out_sel_2
      type: hex
      description: "Outputs 8-14 selection bitmask"
    - name: out_sel_3
      type: hex
      description: "Outputs 15-20 selection bitmask"
  notes: "Affects '(ne)WR5 Remote Gain' function on Hot-plug DSP products."

- id: wr_mixer_mute_multi_source
  label: WR Mixer Faders Mute/Unmute with Multiple Source Selection
  kind: action
  command: "F0 00 01 2A 0C 00 0C 00 01 {out_sel_1} {out_sel_2} {out_sel_3} 00 {mute_1} {mute_2} {mute_3} 00 {unmute_1} {unmute_2} {unmute_3} 00 F7"
  params:
    - name: out_sel_1
      type: hex
      description: "Mixer (output channel) 1-7 selection; high bit = output selected"
    - name: out_sel_2
      type: hex
      description: "Mixer (output channel) 8-14 selection"
    - name: out_sel_3
      type: hex
      description: "Mixer (output channel) 15-20 selection"
    - name: mute_1
      type: hex
      description: "Mix faders 1-7 to mute; high bit = will be muted, low bit = not affected"
    - name: mute_2
      type: hex
      description: "Mix faders 8-14 to mute"
    - name: mute_3
      type: hex
      description: "Mix faders 15-20 to mute"
    - name: unmute_1
      type: hex
      description: "Mix faders 1-7 to unmute; high bit = will be unmuted"
    - name: unmute_2
      type: hex
      description: "Mix faders 8-14 to unmute"
    - name: unmute_3
      type: hex
      description: "Mix faders 15-20 to unmute"
```

## Feedbacks
```yaml
# Device-initiated responses to inquiry/request messages.

- id: data_response_config
  type: binary
  description: "Data Response: Configuration (msg type 01, sub-type 00). Returns preset name (20 ASCII hex), expansion card status, front switch status, current preset number, DSP status."
  command: "F0 00 01 2A 06 00 01 00 {preset_name_20} {exp_card_1} {exp_card_2} {current_preset} {dsp_status} F7"

- id: data_response_input
  type: binary
  description: "Data Response: Input Channel Settings (msg type 01, sub-type 01). 160-byte structure; see ne24.24M Input Channel Message in source."
  command: "F0 00 01 2A 06 00 01 01 {160_byte_input_data} F7"

- id: data_response_output
  type: binary
  description: "Data Response: Output Channel Settings (msg type 01, sub-type 02). 180-byte structure; see ne24.24M Output Channel Message in source."
  command: "F0 00 01 2A 06 00 01 02 {180_byte_output_data} F7"

- id: meter_response
  type: binary
  description: "Meter Response (msg type 03). Input and output level bytes. Format: 0CLLLLLL where bits 5-0 = dBu level (0 = <-42 dBu, 1-3F = -42 to +20 dBu), bit 6 = clip detector. Level bytes for unavailable channels are undefined."
  command: "F0 00 01 2A 06 00 03 {input_levels} {output_levels} F7"

- id: preset_names_response
  type: binary
  description: "Preset Names Response (msg type 05). 700 ASCII name character hex values, 20 per preset starting with preset 1 (valid range 20-7A)."
  command: "F0 00 01 2A 06 00 05 {700_ascii_name_chars} F7"

- id: wr_preset_mute_response
  type: binary
  description: "WR Preset Number & Mute Status Response (WR-04). Returns preset number and mute status bitmasks for inputs 1-20 and outputs 1-20."
  command: "F0 00 01 2A 0C 00 04 00 01 {preset_num} {in_mute_1} {in_mute_2} {in_mute_3} {spare} {out_mute_1} {out_mute_2} {out_mute_3} {spare} F7"

- id: wr_output_gain_mixer_mutes_response
  type: binary
  description: "WR Output Gain & Mixer Mutes Response (WR-06). Returns output channel gain and mixer fader mute status bitmasks."
  command: "F0 00 01 2A 0C 00 06 00 01 {channel} {gain} {mix_mute_1} {mix_mute_2} {mix_mute_3} {spare} F7"

- id: wr_channel_gain_response
  type: binary
  description: "WR Channel Gain Response (WR-08). Returns channel gain in range 00-3F (00 = -INF, 01-3F = -50 to +12 dB)."
  command: "F0 00 01 2A 0C 00 08 00 01 {channel} {gain} F7"
```

## Variables
```yaml
# No standalone settable variables; all parameters are set via explicit action messages.
# Queryable state includes: current preset, mute status, gain, meter levels, EQ status,
# configuration, channel names - all accessed via Data Request (00) and WR inquiry commands.
```

## Events
```yaml
- id: local_preset_recall_update
  type: binary
  description: "Unsolicited message transmitted from the unit when a local preset change event occurs (contact closure, front panel buttons, etc.). Message type 42."
  command: "F0 00 01 2A 06 00 42 {preset_num} F7"
  params:
    - name: preset_num
      type: hex
      description: "Newly loaded preset number: 00 = preset 1, 01 = preset 2, ..."
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements found in source.
```

## Notes
- All byte values in this protocol are hexadecimal, transmitted as raw hex bytes (not ASCII characters). In Crestron, use `\x` prefix (e.g. F0 = `\xF0`).
- Standard message header: bytes 1-6 = `F0 00 01 2A 06 00`. Wall Remote messages use `F0 00 01 2A 0C 00` (byte 5 = 0C) plus 2 WR identification bytes (00 01) before payload data.
- Message types 06, 08, 09 are ne24.24M only — not supported on other ne/Pêma products including the Nxe1 52Bd.
- Message types 06 thru 1A, WR-0A, WR-0B, WR-0C are always echoed back from the unit to confirm reception.
- Message types 00, 02, 04, WR-03, WR-05, WR-07 invoke a specific response message from the unit.
- Non-applicable or invalid messages are echoed back as received with no other action.
- All products except the ne24.24M require associated DSP functions to be populated via Ashly software for each message type.
- ne24.24M power-on baud rate is 38,400 bps; it changes to 9,600 bps when ten `F9` bytes at 9,600 bps are received. All other products default to 9,600 bps.
- Additional propagation delay of 1.46 ms from any input to any output due to digital converters and DSP.
- Gain Word: 14-bit integer, decimal range 7692-8312 = -50 to +12 dB in 0.1 dB steps (8192 = 0 dB). Byte N = gainWord / 128 (bits 13-7); byte N+1 = gainWord AND 127 (bits 6-0).
- Sample gain transmit for Input 7 at -50 dB: `F0 00 01 2A 06 00 0C 06 3C 0C F7` (hex) or `240 0 1 42 6 0 12 6 60 12 247` (decimal).
- Meter level byte format: `0CLLLLLL` — bits 5-0 = dBu level (0 = <-42 dBu, 1-3F = -42 to +20 dBu), bit 6 = clip (0 = not clipped, 1 = clipped).

<!-- UNRESOLVED: TCP port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact input/output channel count for Nxe1 52Bd not stated -->
<!-- UNRESOLVED: serial flow control not stated in source -->
<!-- UNRESOLVED: WR identification bytes 8-9 — only value 00 01 documented; unclear if other WR IDs exist -->

## Provenance

```yaml
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/08/NE_RS-232_Protocol.pdf
  - https://ashly.com/wp-content/uploads/2026/03/nX-amp-full-manual-r12.pdf
retrieved_at: 2026-07-13T18:40:21.468Z
last_checked_at: 2026-07-21T20:19:45.791Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:19:45.791Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched wire-level message types in source with correct shapes and transport parameters verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number not stated in source (source documents RS-232 only; TCP/IP confirmed by operator)"
- "firmware version compatibility not stated in source"
- "exact channel count for Nxe1 52Bd not stated (source covers up to 60 in/out)"
- "TCP port not stated in source"
- "flow control not stated in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "TCP port number not stated in source"
- "firmware version compatibility not stated"
- "exact input/output channel count for Nxe1 52Bd not stated"
- "serial flow control not stated in source"
- "WR identification bytes 8-9 — only value 00 01 documented; unclear if other WR IDs exist"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
