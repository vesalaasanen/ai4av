---
spec_id: admin/ashly-audio-nxe4004bd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ashly Audio Nxe4004Bd Control Spec"
manufacturer: "Ashly Audio"
model_family: Nxe4004Bd
aliases: []
compatible_with:
  manufacturers:
    - "Ashly Audio"
  models:
    - Nxe4004Bd
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/08/NE_RS-232_Protocol.pdf
  - https://ashly.com/wp-content/uploads/2015/08/ina1-rs232-adapter-r03.pdf
  - https://ashly.com/wp-content/uploads/2026/03/nX-amp-full-manual-r12.pdf
  - https://ashly.com/wp-content/uploads/2026/03/nXe-amp-2U-datasheet-Mar-2026.pdf
  - https://ashly.com/wp-content/uploads/2015/10/WR5_Protocol.pdf
retrieved_at: 2026-07-13T18:38:45.408Z
last_checked_at: 2026-07-21T20:25:41.318Z
generated_at: 2026-07-21T20:25:41.318Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The protocol manual is shared across the entire ne/Pêma series and does not state the specific input/output channel count, preset count, or available DSP functions for the Nxe4004Bd model. Channel ranges in the source go up to 60 (hex 00-3B); the actual Nxe4004Bd channel availability is unstated."
  - "firmware version compatibility not stated in source"
  - "Message types 06, 08, 09, and the 03(b) meter response are documented as ne24.24M-only; applicability to the Nxe4004Bd is unstated. They are included for source coverage."
  - "flow control not stated in source"
  - "no explicit multi-step sequences described in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "Nxe4004Bd-specific input/output channel count, preset count, and available DSP functions not stated (shared manual)."
  - "flow control not stated in source."
  - "firmware version compatibility not stated in source."
  - "voltage / current / power specifications not in this protocol document."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:25:41.318Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched literally to source commands with correct wire-level tokens; transport parameters verified; source command catalogue fully represented by spec. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Ashly Audio Nxe4004Bd Control Spec

## Summary
The Ashly Audio Nxe4004Bd is a DSP matrix mixer / processor in Ashly's ne series. This spec covers RS-232 serial control using Ashly's binary (hex-byte) SysEx-style protocol, shared across the ne and Pêma product families. All payloads are raw hexadecimal bytes (not ASCII), framed by a `F0` start byte and `F7` stop byte with a fixed six-byte header. The source documents a large catalogue of message types covering preset recall, per-channel gain/mute/polarity/delay, EQ filters, gates, compressors, auto-levelers, duckers, mixer routing, metering, and Ashly WR wall-remote commands.

<!-- UNRESOLVED: The protocol manual is shared across the entire ne/Pêma series and does not state the specific input/output channel count, preset count, or available DSP functions for the Nxe4004Bd model. Channel ranges in the source go up to 60 (hex 00-3B); the actual Nxe4004Bd channel availability is unstated. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: Message types 06, 08, 09, and the 03(b) meter response are documented as ne24.24M-only; applicability to the Nxe4004Bd is unstated. They are included for source coverage. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
  start_bits: 1  # stated: "1 Start Bit, 8 Data Bits, 1 Stop Bit, No Parity"
auth:
  type: none  # inferred: no auth procedure in source
# NOTE: Source states all ne-series products use 9600 bps except ne24.24M
# (38400 power-on, drops to 9600 on ten 0xF9 bytes at 9600). The Nxe4004Bd
# is assumed to follow the 9600 bps rule per the "all products" clause.
```

## Traits
```yaml
traits:
  - queryable   # inferred: query commands present (00 Data Request, 02 Meter Request, 04 Preset Names Request, WR-03/05/07 inquiries)
  - levelable   # inferred: gain/level control present (0C Gain, 0B Preamp, 12 Mixer level, 1A Gain Inc/Dec)
  - routable    # inferred: input-to-output mixer routing present (12 Mixer, 19 Mixer Fader)
```

## Actions
```yaml
# All payloads are raw hexadecimal bytes (not ASCII). Fixed frame:
#   Regular messages : F0 00 01 2A 06 00 <msgtype> ... F7
#   Wall-Remote (WR) : F0 00 01 2A 0C 00 <msgtype> ... F7
# Source note 1: "all byte values ... hexadecimal ... Data must be transmitted
# as Hex ... not ASCII characters". In Crestron use \x prefix (e.g. \xF0).
# Source note 4: msg types 06-1A, WR-0A/0B/0C are echoed back by the unit.
# Source note 5: msg types 00, 02, 04, WR-03, WR-05, WR-07 invoke a response.
# Source note 6: invalid messages echoed back unchanged, no action taken.
#
# Channel index encoding (used by many actions below):
#   Inputs 1-60  : hex 00-3B
#   Outputs 1-60 : hex 40-7B
actions:
  # ---------- Data / meter / preset-name requests ----------
  - id: data_request
    label: Data Request (configuration / input / output)
    kind: query
    command: "F0 00 01 2A 06 00 00 {data_type} {channel} F7"
    params:
      - name: data_type
        type: integer
        description: "00 = configuration; 01 = input channel settings; 02 = output channel settings"
      - name: channel
        type: integer
        description: "Input/Output channel 00-3B (00-59 = channels 1-60); use 00 during a configuration request"
    notes: Invokes message type 01 Data Response.

  - id: meter_request
    label: Meter Request
    kind: query
    command: "F0 00 01 2A 06 00 02 F7"
    params: []
    notes: Invokes message type 03 Meter Response (03a standard / 03b ne24.24M).

  - id: preset_names_request
    label: Preset Names Request
    kind: query
    command: "F0 00 01 2A 06 00 04 F7"
    params: []
    notes: Invokes message type 05 Preset Names Response.

  # ---------- Preset control ----------
  - id: preset_save_ne2424m
    label: Preset Save (ne24.24M only)
    kind: action
    command: "F0 00 01 2A 06 00 06 {preset} {name_20_chars} F7"
    params:
      - name: preset
        type: integer
        description: "Preset number to save to: 00 = preset 1, 01 = preset 2, ..."
      - name: name_20_chars
        type: string
        description: "20 ASCII name characters as hex values, valid range 20-7A (bytes 9-28)"
    notes: "Source note 3: message type 06 is ne24.24M-only. Always echoed back by the unit."

  - id: preset_recall
    label: Preset Recall
    kind: action
    command: "F0 00 01 2A 06 00 07 {preset} {mute_status} F7"
    params:
      - name: preset
        type: integer
        description: "Preset to recall: 00 = preset 1, 01 = preset 2, ..."
      - name: mute_status
        type: integer
        description: "00 = as per preset settings; 01 = force all channels to mute"

  - id: channel_data_download_ne2424m
    label: Channel Data Download - Input/Output (ne24.24M only)
    kind: action
    command: "F0 00 01 2A 06 00 08 {subtype} {channel} {channel_data...} F7"
    params:
      - name: subtype
        type: integer
        description: "01 = input channel data; 02 = output channel data"
      - name: channel
        type: integer
        description: "00-13 = channels 1-20 (as available)"
      - name: channel_data
        type: string
        description: "Full ne24.24M input/output channel message body (see source Input/Output Channel Message tables, bytes 10..N)"
    notes: "Source note 3: message type 08 is ne24.24M-only. Refer to source 'ne24.24M Input/Output Channel Message' for byte layout."

  - id: preset_channel_name_ne2424m
    label: Preset / Channel Name Message (ne24.24M only)
    kind: action
    command: "F0 00 01 2A 06 00 09 {type} {name_20_chars} F7"
    params:
      - name: type
        type: integer
        description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60; 127 (0x7F) = Working Preset"
      - name: name_20_chars
        type: string
        description: "20 ASCII name characters as hex values, valid range 20-7A (bytes 9-28)"
    notes: "Source note 3: message type 09 is ne24.24M-only."

  # ---------- Per-channel DSP control ----------
  - id: polarity_set
    label: Polarity Message
    kind: action
    command: "F0 00 01 2A 06 00 0A {channel} {polarity} F7"
    params:
      - name: channel
        type: integer
        description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
      - name: polarity
        type: integer
        description: "00 = normal; 01 = inverted"

  - id: preamp_set
    label: Preamp Message (products with mic preamps)
    kind: action
    command: "F0 00 01 2A 06 00 0B {channel} {gain} {phantom} F7"
    params:
      - name: channel
        type: integer
        description: "00-3B = Inputs 1-60"
      - name: gain
        type: integer
        description: "Preamp gain: 00 = 0 dB; 14 = 20 dB; 28 = 40 dB; 3C = 60 dB"
      - name: phantom
        type: integer
        description: "00 = phantom power off; 01 = phantom power on"

  - id: gain_set
    label: Gain Message
    kind: action
    command: "F0 00 01 2A 06 00 0C {channel} {gain_hi} {gain_lo} F7"
    params:
      - name: channel
        type: integer
        description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
      - name: gain_hi
        type: integer
        description: "Gain bits 13-7 = (gainWord / 128)"
      - name: gain_lo
        type: integer
        description: "Gain bits 6-0 = (gainWord & 127)"
    notes: "Gain Word decimal range 7692-8312 = -50 to +12 dB in 0.1 dB steps (8192 = 0 dB). Worked example from source: set Input 7 to -50 dB -> F0 00 01 2A 06 00 0C 06 3C 0C F7. Affects 'Gain' function on Hot-plug DSP products."

  - id: delay_set
    label: Delay Message
    kind: action
    command: "F0 00 01 2A 06 00 0D {channel} {delay_b1} {delay_b2} {delay_b3} F7"
    params:
      - name: channel
        type: integer
        description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
      - name: delay_b1
        type: integer
        description: "Delay bits 20-14"
      - name: delay_b2
        type: integer
        description: "Delay bits 13-7"
      - name: delay_b3
        type: integer
        description: "Delay bits 6-0"
    notes: "Delay time in seconds = (21-bit Delay Word) / 48000. Delay word decimal range 0-32760 (0-682.500 ms). Additional 1.46 ms propagation delay input-to-output."

  - id: eq_filter_set
    label: EQ Filter Message
    kind: action
    command: "F0 00 01 2A 06 00 0E {channel} {filter_num} {freq_b1} {freq_b2} {freq_b3} {q_index} {gain_b1} {gain_b2} {status_type} F7"
    params:
      - name: channel
        type: integer
        description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
      - name: filter_num
        type: integer
        description: "00 = filter 1, 01 = filter 2, 02 = filter 3, etc."
      - name: freq_b1
        type: integer
        description: "Frequency bit 14 (15-bit Frequency Word = actual frequency in Hz)"
      - name: freq_b2
        type: integer
        description: "Frequency bits 13-7"
      - name: freq_b3
        type: integer
        description: "Frequency bits 6-0"
      - name: q_index
        type: integer
        description: "Q-index: 0B-6B = 1/64 to 4 oct (see source Bandwidth vs Q-index table)"
      - name: gain_b1
        type: integer
        description: "Filter Gain bits 13-7 (PEQ range 7892-8342; shelf range 8042-8342)"
      - name: gain_b2
        type: integer
        description: "Filter Gain bits 6-0"
      - name: status_type
        type: integer
        description: "bit 6 status: 0 = bypass, 1 = active; lower nibble type: 00-05 = PEQ, LS1, LS2, HS1, HS2, Allpass"
    notes: "PEQ freq 20-20kHz, gain -30..+15 dB / 0.1 dB; Low Shelf 20-2kHz; High Shelf 3890-20kHz; shelf gain -15..+15 dB."

  - id: gate_set
    label: Gate Message
    kind: action
    command: "F0 00 01 2A 06 00 0F {channel} {threshold} {floor} {attack} {release} {status} F7"
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
      - name: attack
        type: integer
        description: "00-07 = 0.2, 0.5, 1, 2, 5, 10, 20, 50 ms/dB"
      - name: release
        type: integer
        description: "00-07 = 5, 10, 20, 50, 100, 200, 500, 1000 ms/dB"
      - name: status
        type: integer
        description: "00 = bypass; 01 = active"

  - id: auto_leveler_set
    label: Auto-Leveler Message
    kind: action
    command: "F0 00 01 2A 06 00 10 {channel} {target} {threshold} {ratio} {gain_rate} {hold_time} {status} F7"
    params:
      - name: channel
        type: integer
        description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
      - name: target
        type: integer
        description: "3C-78 = -40 to +20 dBu"
      - name: threshold
        type: integer
        description: "46-64 = -30 to 0 dB below target level"
      - name: ratio
        type: integer
        description: "00-06 = 1.2, 1.5, 2, 3, 4, 6, 10 to 1"
      - name: gain_rate
        type: integer
        description: "Bits 3-0 = increase rate; bits 7-4 = decrease rate; value 00-07 = 5,10,20,50,100,200,500,1000 ms/dB"
      - name: hold_time
        type: integer
        description: "00-06 = 0 to 6 seconds"
      - name: status
        type: integer
        description: "00 = bypass; 01 = active"

  - id: dynamic_ducker_set
    label: Dynamic Ducker Message
    kind: action
    command: "F0 00 01 2A 06 00 11 {channel} {threshold} {depth} {release} {status} F7"
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
      - name: release
        type: integer
        description: "00-07 = 5, 10, 20, 50, 100, 200, 500, 1000 ms/dB"
      - name: status
        type: integer
        description: "00 = bypass; 01 = high priority trigger; 02 = low priority trigger; 03 = ducked program"

  - id: mixer_set
    label: Mixer Message
    kind: action
    command: "F0 00 01 2A 06 00 12 {output_channel} {source} {level} {routing} {mute} F7"
    params:
      - name: output_channel
        type: integer
        description: "40-7B = Outputs 1-60 (selects output mixer to address)"
      - name: source
        type: integer
        description: "00-3B = Inputs 1-60 (mix fader / source)"
      - name: level
        type: integer
        description: "00 = -INF; 01-3F = -50 to +12 dB in 1 dB steps"
      - name: routing
        type: integer
        description: "00 = disable; 01 = enable (allow source-to-output routing)"
      - name: mute
        type: integer
        description: "00 = not muted; 01 = muted (mute status for the mixer fader)"

  - id: hpf_lpf_set
    label: HPF/LPF Message
    kind: action
    command: "F0 00 01 2A 06 00 13 {channel} {filter} {freq_b1} {freq_b2} {freq_b3} {type} F7"
    params:
      - name: channel
        type: integer
        description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
      - name: filter
        type: integer
        description: "00 = high-pass filter; 01 = low-pass filter"
      - name: freq_b1
        type: integer
        description: "Frequency bit 14 (15-bit Frequency Word = actual frequency in Hz)"
      - name: freq_b2
        type: integer
        description: "Frequency bits 13-7"
      - name: freq_b3
        type: integer
        description: "Frequency bits 6-0"
      - name: type
        type: integer
        description: "00-0A = ButterWorth2, Bessel2, LinkwitzRiley2, BW/LR3, B3, BW4, B4, LR4, BW8, B8, LR8"

  - id: compressor_limiter_set
    label: Compressor-Limiter Message
    kind: action
    command: "F0 00 01 2A 06 00 14 {channel} {threshold} {ratio} {attack} {release} {status} {link} F7"
    params:
      - name: channel
        type: integer
        description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
      - name: threshold
        type: integer
        description: "50-78 = -20 to +20 dBu"
      - name: ratio
        type: integer
        description: "00-08 = 1.2, 1.5, 2, 3, 4, 6, 10, 20, INF to 1"
      - name: attack
        type: integer
        description: "00-07 = 0.2, 0.5, 1, 2, 5, 10, 20, 50 ms/dB"
      - name: release
        type: integer
        description: "00-07 = 5, 10, 20, 50, 100, 200, 500, 1000 ms/dB"
      - name: status
        type: integer
        description: "00 = bypass; 01 = active"
      - name: link
        type: integer
        description: "00 = not linked; 01 = linked (linked channels track channel with most gain reduction)"

  - id: channel_mute_set
    label: Channel Mute Message
    kind: action
    command: "F0 00 01 2A 06 00 15 {channel} {mute_status} F7"
    params:
      - name: channel
        type: integer
        description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
      - name: mute_status
        type: integer
        description: "00 = not muted; 01 = muted"

  - id: eq_status_set
    label: EQ Status Message
    kind: action
    command: "F0 00 01 2A 06 00 16 {channel} {eq_status} F7"
    params:
      - name: channel
        type: integer
        description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
      - name: eq_status
        type: integer
        description: "00 = bypass; 01 = active"

  - id: mute_all_outputs
    label: Mute/Unmute All Outputs Message
    kind: action
    command: "F0 00 01 2A 06 00 17 {status} F7"
    params:
      - name: status
        type: integer
        description: "00 = unmute all outputs; 01 = mute all outputs"

  - id: mixer_fader_mute_set
    label: Mixer Fader Mute/Unmute Message (Source Selection)
    kind: action
    command: "F0 00 01 2A 06 00 19 {output_channel} {source} {mute_status} F7"
    params:
      - name: output_channel
        type: integer
        description: "40-7B = Outputs 1-60"
      - name: source
        type: integer
        description: "00-3B = Inputs 1-60 (mix fader)"
      - name: mute_status
        type: integer
        description: "00 = not muted; 01 = muted"

  - id: gain_increment_decrement
    label: Channel Gain Increment/Decrement Message
    kind: action
    command: "F0 00 01 2A 06 00 1A {channel} {value} F7"
    params:
      - name: channel
        type: integer
        description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
      - name: value
        type: integer
        description: "00-03 = .5/1/2/3 dB decrement; 10-13 = .5/1/2/3 dB increment"
    notes: Affects 'Gain' function on Hot-plug DSP products.

  # ---------- Ashly WR Wall-Remote inquiries ----------
  - id: wr_preset_mute_inquiry
    label: WR-03 Preset Number & Mute Status Inquiry
    kind: query
    command: "F0 00 01 2A 0C 00 03 F7"
    params: []
    notes: Invokes WR-04 Preset Number & Mute Status Response. WR header uses 0C at byte 5.

  - id: wr_output_gain_mixer_mute_inquiry
    label: WR-05 Output Gain & Mixer Mutes Inquiry
    kind: query
    command: "F0 00 01 2A 0C 00 05 {output_channel} F7"
    params:
      - name: output_channel
        type: integer
        description: "00-3B = Outputs 1-60"
    notes: Invokes WR-06 Output Gain & Mixer Mutes Response.

  - id: wr_channel_gain_inquiry
    label: WR-07 Channel Gain Inquiry
    kind: query
    command: "F0 00 01 2A 0C 00 07 00 01 {channel} F7"
    params:
      - name: channel
        type: integer
        description: "00-3B = Inputs 1-60; 40-7B = Outputs 1-60"
    notes: "Invokes WR-08 Channel Gain Response. Bytes 8-9 are fixed WR identification bytes 00 01. Pertains to '(ne)WR5 Remote Gain' function on Hot-plug DSP products."

  # ---------- Ashly WR Wall-Remote multi-channel commands ----------
  - id: wr_mute_multiple
    label: WR-0A Mute/Unmute with Multiple Channel Selection
    kind: action
    command: "F0 00 01 2A 0C 00 0A {mute} {in_sel_1} {in_sel_2} {in_sel_3} 00 {out_sel_1} {out_sel_2} {out_sel_3} 00 F7"
    params:
      - name: mute
        type: integer
        description: "00 = unmute selected channels; 01 = mute selected channels"
      - name: in_sel_1
        type: integer
        description: "Inputs 1-7 selection bitmask (bit set = selected)"
      - name: in_sel_2
        type: integer
        description: "Inputs 8-14 selection bitmask"
      - name: in_sel_3
        type: integer
        description: "Inputs 15-20 selection bitmask"
      - name: out_sel_1
        type: integer
        description: "Outputs 1-7 selection bitmask"
      - name: out_sel_2
        type: integer
        description: "Outputs 8-14 selection bitmask"
      - name: out_sel_3
        type: integer
        description: "Outputs 15-20 selection bitmask"

  - id: wr_gain_multiple
    label: WR-0B Gain Message with Multiple Channel Selection
    kind: action
    command: "F0 00 01 2A 0C 00 0B {gain} {in_sel_1} {in_sel_2} {in_sel_3} 00 {out_sel_1} {out_sel_2} {out_sel_3} 00 F7"
    params:
      - name: gain
        type: integer
        description: "New gain value 00-99 (hex 00-63); 00 = min, 99 = max gain"
      - name: in_sel_1
        type: integer
        description: "Inputs 1-7 selection bitmask"
      - name: in_sel_2
        type: integer
        description: "Inputs 8-14 selection bitmask"
      - name: in_sel_3
        type: integer
        description: "Inputs 15-20 selection bitmask"
      - name: out_sel_1
        type: integer
        description: "Outputs 1-7 selection bitmask"
      - name: out_sel_2
        type: integer
        description: "Outputs 8-14 selection bitmask"
      - name: out_sel_3
        type: integer
        description: "Outputs 15-20 selection bitmask"
    notes: Affects '(ne)WR5 Remote Gain' function on Hot-plug DSP products.

  - id: wr_mixer_mute_multiple
    label: WR-0C Mixer Faders Mute/Unmute with Multiple Source Selection
    kind: action
    command: "F0 00 01 2A 0C 00 0C {out_sel_1} {out_sel_2} {out_sel_3} 00 {mute_1} {mute_2} {mute_3} 00 {unmute_1} {unmute_2} {unmute_3} 00 F7"
    params:
      - name: out_sel_1
        type: integer
        description: "Mixer (output channel) 1-7 selection bitmask (selected outputs receive fader mute/unmute)"
      - name: out_sel_2
        type: integer
        description: "Mixer (output channel) 8-14 selection bitmask"
      - name: out_sel_3
        type: integer
        description: "Mixer (output channel) 15-20 selection bitmask"
      - name: mute_1
        type: integer
        description: "Mix faders 1-7 to mute bitmask (bit set = muted, 0 = not affected)"
      - name: mute_2
        type: integer
        description: "Mix faders 8-14 to mute bitmask"
      - name: mute_3
        type: integer
        description: "Mix faders 15-20 to mute bitmask"
      - name: unmute_1
        type: integer
        description: "Mix faders 1-7 to unmute bitmask"
      - name: unmute_2
        type: integer
        description: "Mix faders 8-14 to unmute bitmask"
      - name: unmute_3
        type: integer
        description: "Mix faders 15-20 to unmute bitmask"
```

## Feedbacks
```yaml
feedbacks:
  - id: data_response_config
    type: structured
    description: "Message type 01, type 00 = Data Response: Configuration. Bytes 9-28 = 20-char preset name; byte 29-30 = expansion card status; byte 31 = current loaded preset number (00 = preset 1); byte 32 = DSP status (bit value 1 = DSP valid). Reply to 00 Data Request."

  - id: data_response_input_channel
    type: structured
    description: "Message type 01, type 01 = Data Response: Input Channel Settings. Full ne24.24M Input Channel Message layout (bytes 10-159: name, mute, EQ, preamp, gain, polarity, delay, gate, auto-leveler, 15 EQ filters, ducker). Reply to 00 Data Request."

  - id: data_response_output_channel
    type: structured
    description: "Message type 01, type 02 = Data Response: Output Channel Settings. Full ne24.24M Output Channel Message layout (bytes 10-180: name, mute, EQ, mix/routing, HPF/LPF, delay, 15 EQ filters, gain, polarity, limiter). Reply to 00 Data Request."

  - id: meter_response_standard
    type: structured
    description: "Message type 03(a) = Meter Response (non-ne24.24M). Bytes 8-15 = input 1-8 level; bytes 16-23 = output 1-8 level. Level byte format 0CLLLLLL: bits 5-0 = dBu (0 = <-42 dBu, 1-3F = -42..+20 dBu), bit 6 = clip (1 = clipped). Unavailable channels undefined. Reply to 02 Meter Request."

  - id: meter_response_ne2424m
    type: structured
    description: "Message type 03(b) = Meter Response (ne24.24M). 44+ data bytes: input 1-20 levels, output 1-20 levels, per-channel auto-level/gate status, limiter gain reduction, and input ducker status bitmasks. Reply to 02 Meter Request. ne24.24M-only."

  - id: preset_names_response
    type: structured
    description: "Message type 05 = Preset Names Response. Bytes 8-707 = 700 ASCII name characters' hex values, 20 per preset starting with preset 1 (valid range 20-7A). Reply to 04 Preset Names Request."

  - id: wr_preset_mute_response
    type: structured
    description: "WR-04 = Preset Number & Mute Status Response. Byte 10 = preset number; bytes 11-13 = inputs 1-20 mute bitmasks; bytes 15-17 = outputs 1-20 mute bitmasks. Reply to WR-03 inquiry."

  - id: wr_output_gain_mixer_mute_response
    type: structured
    description: "WR-06 = Output Gain & Mixer Mutes Response. Byte 10 = output channel; byte 11 = gain (00-3F: 00 = -INF, 01-3F = -50..+12 dB); bytes 12-14 = mixer faders 1-20 mute bitmasks. Reply to WR-05 inquiry."

  - id: wr_channel_gain_response
    type: structured
    description: "WR-08 = Channel Gain Response. Byte 10 = channel; byte 11 = gain (00-3F: 00 = -INF, 01-3F = -50..+12 dB). Reply to WR-07 inquiry."
```

## Variables
```yaml
variables:
  - id: input_channel_gain
    type: number
    unit: dB
    range: "-50 to +12"
    resolution: "0.1 dB"
    description: "Per input channel gain (message 0C). Gain Word 7692-8312, 8192 = 0 dB."
  - id: output_channel_gain
    type: number
    unit: dB
    range: "-50 to +12"
    resolution: "0.1 dB"
    description: "Per output channel gain (message 0C). Gain Word 7692-8312, 8192 = 0 dB."
  - id: channel_delay
    type: number
    unit: ms
    range: "0 to 682.5"
    description: "Per channel delay (message 0D). Delay Word / 48000. Plus 1.46 ms fixed propagation."
  - id: channel_mute
    type: boolean
    description: "Per channel mute state (message 15). 0 = unmuted, 1 = muted."
  - id: eq_filter_frequency
    type: number
    unit: Hz
    range: "20 to 20000"
    description: "PEQ filter frequency (message 0E). Shelf filters have narrower ranges."
  - id: preset_number
    type: integer
    description: "Currently loaded preset (message 07 recall / 42 update). 00 = preset 1."
```

## Events
```yaml
events:
  - id: local_preset_recall_update
    description: "Message type 42 = Local Preset Recall Update. Transmitted unsolicited from the unit when a local preset change event occurs via contact closure or front panel buttons."
    payload: "F0 00 01 2A 06 00 42 {preset} F7"
    params:
      - name: preset
        type: integer
        description: "New preset number loaded: 00 = preset 1, 01 = preset 2, ..."
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Phantom power (message 0B) and force-mute
# (message 07 mute_status=01) are noted but no safety interlock documented.
```

## Notes
- All payloads are raw **hexadecimal bytes**, not ASCII (source note 1). Crestron: use `\x` prefix (e.g. `\xF0`).
- Frame: every message begins `F0` (start) and ends `F7` (stop). Regular message header = `F0 00 01 2A 06 00`; Wall-Remote header = `F0 00 01 2A 0C 00`.
- Serial hardware: 1 Start Bit, 8 Data Bits, 1 Stop Bit, No Parity. Baud 9600 for all ne/Pêma products except ne24.24M (38400 power-on, drops to 9600 on ten `0xF9` bytes at 9600 bps).
- Echo behavior: message types 06-1A and WR-0A/0B/0C are echoed back by the unit to confirm reception (source note 4). Message types 00, 02, 04, WR-03, WR-05, WR-07 invoke a specific response message (source note 5). Invalid/non-applicable messages are echoed back unchanged with no action (source note 6).
- ne24.24M-only message types: 06 (Preset Save), 08 (Channel Data Download), 09 (Preset/Channel Name), and the 03(b) meter response. Included here for source coverage; applicability to the Nxe4004Bd is unstated.
- All products except ne24.24M require associated DSP functions to be populated via Ashly software for each message type (source note 8).
- 14-bit Gain Word encoding: Byte N = `gainWord / 128`, Byte N+1 = `gainWord & 127`. Range 7692 (-50 dB) to 8312 (+12 dB), 8192 = 0 dB. See source "Sample Gain Bytes to Transmit" table.
- 15-bit Frequency Word = actual frequency in Hz, split across 3 bytes (bit 14 / bits 13-7 / bits 6-0). See source "Sample Frequency Bytes to Transmit" table.
- Q-index / bandwidth: `BW = (1/3) * 2^[(Q-index - 64)/12]`, Q-index 0B-6B = 1/64 to 4 oct.
- Additional 1.46 ms propagation delay input-to-output due to digital converters & DSP (source 0D note).

<!-- UNRESOLVED: Nxe4004Bd-specific input/output channel count, preset count, and available DSP functions not stated (shared manual). -->
<!-- UNRESOLVED: flow control not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: voltage / current / power specifications not in this protocol document. -->

## Provenance

```yaml
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/08/NE_RS-232_Protocol.pdf
  - https://ashly.com/wp-content/uploads/2015/08/ina1-rs232-adapter-r03.pdf
  - https://ashly.com/wp-content/uploads/2026/03/nX-amp-full-manual-r12.pdf
  - https://ashly.com/wp-content/uploads/2026/03/nXe-amp-2U-datasheet-Mar-2026.pdf
  - https://ashly.com/wp-content/uploads/2015/10/WR5_Protocol.pdf
retrieved_at: 2026-07-13T18:38:45.408Z
last_checked_at: 2026-07-21T20:25:41.318Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:25:41.318Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched literally to source commands with correct wire-level tokens; transport parameters verified; source command catalogue fully represented by spec. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The protocol manual is shared across the entire ne/Pêma series and does not state the specific input/output channel count, preset count, or available DSP functions for the Nxe4004Bd model. Channel ranges in the source go up to 60 (hex 00-3B); the actual Nxe4004Bd channel availability is unstated."
- "firmware version compatibility not stated in source"
- "Message types 06, 08, 09, and the 03(b) meter response are documented as ne24.24M-only; applicability to the Nxe4004Bd is unstated. They are included for source coverage."
- "flow control not stated in source"
- "no explicit multi-step sequences described in source"
- "source contains no safety warnings, interlock procedures, or"
- "Nxe4004Bd-specific input/output channel count, preset count, and available DSP functions not stated (shared manual)."
- "flow control not stated in source."
- "firmware version compatibility not stated in source."
- "voltage / current / power specifications not in this protocol document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
