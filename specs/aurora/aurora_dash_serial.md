---
spec_id: admin/aurora-dtx-dash
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora DTX Dash Control Spec"
manufacturer: Aurora
model_family: DTX-44D
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - DTX-44D
    - DTX-88D
    - DTX-1616D
    - DTX-3232D
    - DTX-6464D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ute.de
  - files.avprosupply.com
source_urls:
  - https://www.ute.de/images/downloads/handbuecher/user-manual_aurora_dtx-dash.pdf
  - https://files.avprosupply.com/files/attachments/487392/aurora-multimedia-dtx-44d-manual.pdf
retrieved_at: 2026-07-01T05:22:28.926Z
last_checked_at: 2026-07-07T10:58:24.287Z
generated_at: 2026-07-07T10:58:24.287Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-485 transport details (separate from RS-232) not fully specified; flow_control not stated; auth behavior over RS-232 not explicitly stated (only UDP confirmed unaffected by User Admin)."
  - "flow control not stated in source"
  - "source does not document the name byte layout (Param2 shown only as 0x00)"
  - "name byte layout not documented"
  - "source table for 0x0009 lists no parameter detail"
  - "enable value mapping not documented in source table"
  - "enable value mapping not documented"
  - "source shows b[8]-b[11] Direction but no full worked example"
  - "source Control Type table lists 0x09 DebugEnable but byte table header shows b4=0x07 (likely typo); Enable value 0x01=On,0x00=Off"
  - "reset hex code is device-specific, printed on a sticker affixed to the DTX, starts with 'A5'. Obtain from Aurora support if sticker missing."
  - "source documents no unsolicited/asynchronous notification stream; all responses are replies to GET."
  - "no additional standalone variable entries documented in source beyond the param tables."
  - "source documents no unsolicited event/notification messages. Device only replies to GET when Control Center Response is ON."
  - "source documents no named multi-step command sequences."
  - "source contains no explicit safety warnings, interlock procedures, or power-on"
  - "flow_control not stated. Channel-name SET byte layout undocumented. Output Filter HP/LP enable value mapping undocumented. AutoMix Enable (0x0009) parameter detail missing. RS-485 Direction and Debug worked examples incomplete/ambiguous (Debug table header shows b4=0x07, likely typo for 0x09). FBS Reserved (0x0007) is n/a. Module ID ranges assume contiguous 32-channel coverage per source statement. No firmware compatibility range stated."
verification:
  verdict: verified
  checked_at: 2026-07-07T10:58:24.287Z
  matched_actions: 100
  action_count: 100
  confidence: medium
  summary: "All 100 spec actions matched verbatim in the Aurora DTX Dash control protocol. Every message type, module ID, parameter type, and transport setting is documented in the source. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Aurora DTX Dash Control Spec

## Summary
Aurora DTX series DSP matrix mixers (DTX-44D / DTX-88D / DTX-1616D / DTX-3232D / DTX-6464D) controlled via the Dash binary protocol over RS-232/RS-485 serial or UDP. Two protocol versions: V1 (fixed 12-byte messages, single channel/module) and V2 (variable-length, multi-channel). Supports full DSP parameter set/get, preset recall, matrix routing, GPIO, and serial/UDP bridging.

<!-- UNRESOLVED: RS-485 transport details (separate from RS-232) not fully specified; flow_control not stated; auth behavior over RS-232 not explicitly stated (only UDP confirmed unaffected by User Admin). -->

## Transport
```yaml
# Source (Appendix C): default baud 115200, 8 bits, 1 stop bit, no parity; UDP default port 50000.
# UART settings (baud/data/stop/parity) are user-configurable per device; defaults below.
protocols:
  - serial
  - udp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  # UDP control port (default 50000). Factory-reset hex is sent to a separate port 6001.
  port: 50000
auth:
  # Source: "UDP control is not affected by User Admin settings." User Admin only gates Dash
  # software login. Appendix C describes external RS-232/UDP control without a login procedure.
  type: none  # inferred: no auth procedure in source for external control
```

## Traits
```yaml
- queryable   # inferred: Parameter GET (0x22) message type documented with response examples
- levelable   # inferred: gain/volume/level parameter types documented across modules
- routable    # inferred: Matrix Point (0x00A6) routing documented
```

## Actions
```yaml
# ============================================================================
# PROTOCOL FRAMING (applies to every action below)
#
# V1 header (12 bytes fixed):
#   b0=0xB3  b1=MsgType  b2=Checksum  b3=Version(0x00 for V1)
#   b4..b11 = payload (treated as little-endian 16-bit WORDs: lower byte = LSB)
#
#   MsgType: 0x21=ParamSET  0x22=ParamGET  0x13=PresetSET  0x74=OtherControls
#
#   Checksum (b2): set b2=0x00, sum b0..b11, take the LSB (low 8 bits), put in b2.
#
# V2 header (variable):
#   b0=0xB3  b1=MsgType  b2=Length  b3=Version(0x01 for V2)  b4.. = Data
#
# Response messages set the Version byte: V1 response b3=0xE0, V2 response b3=0xE1.
# RS-232 inter-message interval must be > 100ms.
# Every "{checksum}" placeholder below = LSB(sum of all bytes with checksum byte held at 0x00).
# ============================================================================

# ----------------------------------------------------------------------------
# Module: Input Source (0x012B)  - applies to input channels 1-32 (zero-based 0-31)
# ----------------------------------------------------------------------------
- id: input_gain_set
  label: Input Channel Gain Set
  kind: action
  command: "B3 21 {checksum} 00 2B 01 01 00 {ch_l} {ch_h} {gain_l} {gain_h}"
  params:
    - name: channel
      type: integer
      description: "Zero-based input channel (0-31 = Ch1-Ch32)"
    - name: gain
      type: number
      description: "Signed Integer/100, -72.0 to +12.0 dB"
  notes: "Example (Input Ch4 = -4.50dB): B3 21 40 00 2B 01 01 00 03 00 3E FE"

- id: input_mute_set
  label: Input Channel Mute Set
  kind: action
  command: "B3 21 {checksum} 00 2B 01 02 00 {ch_l} {ch_h} {mute_l} {mute_h}"
  params:
    - name: channel
      type: integer
      description: "Zero-based input channel (0-31)"
    - name: mute
      type: integer
      description: "0 = Off, 1 = On"

- id: input_sensitivity_set
  label: Input Channel Sensitivity Set
  kind: action
  command: "B3 21 {checksum} 00 2B 01 03 00 00 00 {sens_l} {sens_h}"
  params:
    - name: sensitivity
      type: integer
      description: "Integer Value * 3; 0 to 48 dB in 3 dB steps"

- id: input_phantom_power_set
  label: Input Phantom Power Set
  kind: action
  command: "B3 21 {checksum} 00 2B 01 04 00 00 00 {power_l} {power_h}"
  params:
    - name: power
      type: integer
      description: "0 = Off, 1 = On"

- id: input_signal_generator_type_set
  label: Input Signal Generator Type Set
  kind: action
  command: "B3 21 {checksum} 00 2B 01 05 00 00 00 {type_l} {type_h}"
  params:
    - name: type
      type: integer
      description: "0 = Off, 1 = Sine, 2 = White, 3 = Pink"

- id: input_signal_generator_frequency_set
  label: Input Signal Generator Frequency Set
  kind: action
  command: "B3 21 {checksum} 00 2B 01 06 00 00 00 {freq_l} {freq_h}"
  params:
    - name: frequency
      type: integer
      description: "Integer Value of Hex; 20 to 20000 Hz"

- id: input_sine_wave_gain_set
  label: Input Sine Wave Gain Set
  kind: action
  command: "B3 21 {checksum} 00 2B 01 07 00 00 00 {gain_l} {gain_h}"
  params:
    - name: gain
      type: number
      description: "Signed Integer/100, -72.0 to 0.0 dB"

- id: input_channel_name_set
  label: Input Channel Name Set
  kind: action
  command: "B3 21 {checksum} 00 2B 01 08 00 {name_bytes}"  # UNRESOLVED: source does not document the name byte layout (Param2 shown only as 0x00)
  params: []

- id: input_phase_set
  label: Input Phase Reverse Set
  kind: action
  command: "B3 21 {checksum} 00 2B 01 09 00 00 00 {phase_l} {phase_h}"
  params:
    - name: phase
      type: integer
      description: "Phase Reverse: 0 = Off, 1 = On"

- id: input_gain_nudge_set
  label: Input Gain Nudge Set
  kind: action
  command: "B3 21 {checksum} 00 2B 01 0A 00 00 00 {inc_l} {inc_h}"
  params:
    - name: increment
      type: number
      description: "Signed Integer/100; -3, -2, -1, +1, +2 or +3 dB"

- id: input_link_set
  label: Input Channel Link Set
  kind: action
  command: "B3 21 {checksum} 00 2B 01 0B 00 {lowch_l} {lowch_h} {link_l} {link_h}"
  params:
    - name: lowest_channel
      type: integer
      description: "Integer of lowest channel in link pair, 1 to 32 (NOT zero-based)"
    - name: link
      type: integer
      description: "0 = Off, 1 = On"

- id: input_channel_level_set
  label: Input Channel Level Set
  kind: action
  command: "B3 21 {checksum} 00 2B 01 0C 00 00 00 {level_l} {level_h}"
  params:
    - name: level
      type: number
      description: "Signed Integer/100, -72.0 to +12.0 dB"

# ----------------------------------------------------------------------------
# Module: System Control (0x0128)
# ----------------------------------------------------------------------------
- id: system_gain_set
  label: System Gain Set
  kind: action
  command: "B3 21 {checksum} 00 28 01 01 00 00 00 00 00"  # Param1=0x00, Param2=0x00 per source table
  params: []

- id: system_mute_set
  label: System Mute Set
  kind: action
  command: "B3 21 {checksum} 00 28 01 02 00 {mute_l} {mute_h} 00 00"
  params:
    - name: mute
      type: integer
      description: "0 = Off, 1 = On"

# ----------------------------------------------------------------------------
# Module: Output (0x0127)  - output channels 1-32 (zero-based 0-31)
# ----------------------------------------------------------------------------
- id: output_gain_set
  label: Output Channel Gain Set
  kind: action
  command: "B3 21 {checksum} 00 27 01 01 00 {ch_l} {ch_h} {gain_l} {gain_h}"
  params:
    - name: channel
      type: integer
      description: "Zero-based output channel (0-31 = Ch1-Ch32)"
    - name: gain
      type: number
      description: "Signed Integer/100, -72.0 to +12.0 dB"

- id: output_mute_set
  label: Output Channel Mute Set
  kind: action
  command: "B3 21 {checksum} 00 27 01 02 00 {ch_l} {ch_h} {mute_l} {mute_h}"
  params:
    - name: channel
      type: integer
      description: "Zero-based output channel (0-31)"
    - name: mute
      type: integer
      description: "0 = Off, 1 = On"

- id: output_channel_name_set
  label: Output Channel Name Set
  kind: action
  command: "B3 21 {checksum} 00 27 01 03 00 {name_bytes}"  # UNRESOLVED: name byte layout not documented
  params: []

- id: output_phase_set
  label: Output Phase Reverse Set
  kind: action
  command: "B3 21 {checksum} 00 27 01 04 00 00 00 {phase_l} {phase_h}"
  params:
    - name: phase
      type: integer
      description: "0 = Off, 1 = On"

- id: output_sensitivity_set
  label: Output Channel Sensitivity Set
  kind: action
  command: "B3 21 {checksum} 00 27 01 05 00 00 00 {sens_l} {sens_h}"
  params:
    - name: sensitivity
      type: integer
      description: "Integer Value * 3; 0 to 48 dB in 3 dB steps"

- id: output_gain_nudge_set
  label: Output Gain Nudge Set
  kind: action
  command: "B3 21 {checksum} 00 27 01 06 00 00 00 {inc_l} {inc_h}"
  params:
    - name: increment
      type: number
      description: "Signed Integer/100; -3, -2, -1, +1, +2 or +3 dB"

- id: output_link_set
  label: Output Channel Link Set
  kind: action
  command: "B3 21 {checksum} 00 27 01 07 00 {lowch_l} {lowch_h} {link_l} {link_h}"
  params:
    - name: lowest_channel
      type: integer
      description: "Integer of lowest channel in link pair, 1 to 32 (NOT zero-based)"
    - name: link
      type: integer
      description: "0 = Off, 1 = On"

- id: output_channel_level_set
  label: Output Channel Level Set
  kind: action
  command: "B3 21 {checksum} 00 27 01 08 00 00 00 {level_l} {level_h}"
  params:
    - name: level
      type: number
      description: "Signed Integer/100, -72.0 to +12.0 dB"

# ----------------------------------------------------------------------------
# Module: Matrix (0x00A6)
#   Param1 = channels: LSB input channel, MSB output channel (zero-based).
#   In ch 32=AutoMix, 33=USB, 34=AEC, 35=ANS. Out ch 32=USB.
# ----------------------------------------------------------------------------
- id: matrix_point_set
  label: Matrix Point Set
  kind: action
  command: "B3 21 {checksum} 00 A6 00 01 00 {in_ch} {out_ch} {active_l} {active_h}"
  params:
    - name: input_channel
      type: integer
      description: "Zero-based input channel (0-35 special)"
    - name: output_channel
      type: integer
      description: "Zero-based output channel (0-32 special)"
    - name: active
      type: integer
      description: "0 = Off, 1 = On"
  notes: "Example (clear matrix pt In20->USB Out): B3 21 AF 00 A6 00 01 00 14 20 00 00"

- id: matrix_point_gain_set
  label: Matrix Point Gain Set
  kind: action
  command: "B3 21 {checksum} 00 A6 00 02 00 {in_ch} {out_ch} {gain_l} {gain_h}"
  params:
    - name: input_channel
      type: integer
    - name: output_channel
      type: integer
    - name: gain
      type: number
      description: "Signed Integer/100, -72.0 to +12.0 dB"

# ----------------------------------------------------------------------------
# Module: Input Expander (CH1=0x0001 .. CH32=0x0020)
# ----------------------------------------------------------------------------
- id: input_expander_threshold_set
  label: Input Expander Threshold Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 02 00 {thr_l} {thr_h} 00 00"
  params:
    - name: channel
      type: integer
      description: "Sets Module ID 0x0001..0x0020 (ch1=0x0001..ch32=0x0020)"
    - name: threshold
      type: number
      description: "Signed Integer/100, -72.0 to 0.0 dB"

- id: input_expander_ratio_set
  label: Input Expander Ratio Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 03 00 {ratio_l} {ratio_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: ratio
      type: number
      description: "Signed Integer/100, 1.00 to 20.00"

- id: input_expander_attack_set
  label: Input Expander Attack Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 04 00 {atk_l} {atk_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: attack
      type: integer
      description: "Signed Integer, 1 to 500 ms"

- id: input_expander_release_set
  label: Input Expander Release Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 05 00 {rel_l} {rel_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: release
      type: integer
      description: "Signed Integer, 1 to 10000 ms"

# ----------------------------------------------------------------------------
# Module: Input Compressor (CH1=0x0021 .. CH32=0x0040)
# ----------------------------------------------------------------------------
- id: input_compressor_threshold_set
  label: Input Compressor Threshold Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 02 00 {thr_l} {thr_h} 00 00"
  params:
    - name: channel
      type: integer
      description: "Module ID 0x0021..0x0040"
    - name: threshold
      type: number
      description: "Signed Integer/100, -48.0 to 0.0 dB"

- id: input_compressor_ratio_set
  label: Input Compressor Ratio Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 03 00 {ratio_l} {ratio_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: ratio
      type: number
      description: "Signed Integer/100, 1.00 to 20.00"
  notes: "Example (In Ch24 ratio 4.8): B3 21 F0 00 38 00 03 00 E0 01 00 00"

- id: input_compressor_attack_set
  label: Input Compressor Attack Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 04 00 {atk_l} {atk_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: attack
      type: integer
      description: "1 to 500 ms"

- id: input_compressor_release_set
  label: Input Compressor Release Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 05 00 {rel_l} {rel_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: release
      type: integer
      description: "1 to 10000 ms"

- id: input_compressor_gain_compensation_set
  label: Input Compressor Gain Compensation Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 06 00 {gc_l} {gc_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: gain_compensation
      type: number
      description: "Signed Integer/100, -72.0 to +6.0 dB"
  notes: "Source labels Param1 'Release' (typo); field is Gain Compensation."

# ----------------------------------------------------------------------------
# Module: Input AutoGain (CH1=0x0041 .. CH32=0x0060)
# ----------------------------------------------------------------------------
- id: input_autogain_threshold_set
  label: Input AutoGain Threshold Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 02 00 {thr_l} {thr_h} 00 00"
  params:
    - name: channel
      type: integer
      description: "Module ID 0x0041..0x0060"
    - name: threshold
      type: number
      description: "Signed Integer/100, -72.0 to -20.0 dB"

- id: input_autogain_target_level_set
  label: Input AutoGain Target Level Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 03 00 {tl_l} {tl_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: target_level
      type: number
      description: "Signed Integer/100, -20.0 to 0.0 dB"
  notes: "Source labels Param1 'Release' (typo); field is Target Level."

- id: input_autogain_ratio_set
  label: Input AutoGain Ratio Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 04 00 {ratio_l} {ratio_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: ratio
      type: number
      description: "Signed Integer/100, 1.00 to 20.00"

- id: input_autogain_attack_set
  label: Input AutoGain Attack Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 05 00 {atk_l} {atk_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: attack
      type: integer
      description: "1 to 500 ms"

- id: input_autogain_release_set
  label: Input AutoGain Release Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 06 00 {rel_l} {rel_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: release
      type: integer
      description: "1 to 10000 ms"

# ----------------------------------------------------------------------------
# Module: Input EQ (CH1=0x0061 .. CH32=0x0080) - 12 parametric bands (0-11)
# ----------------------------------------------------------------------------
- id: input_eq_band_enable_set
  label: Input EQ Band Enable Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 02 00 {band_l} {band_h} {en_l} {en_h}"
  params:
    - name: channel
      type: integer
      description: "Module ID 0x0061..0x0080"
    - name: band
      type: integer
      description: "Parametric: zero-based band 0-11. Graphic: Q (1=Wide,2=Normal,3=Narrow)"
    - name: enable
      type: integer
      description: "0 = On, 1 = Off (note inverted logic)"

- id: input_eq_frequency_set
  label: Input EQ Frequency Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 03 00 {band_l} {band_h} {freq_l} {freq_h}"
  params:
    - name: channel
      type: integer
    - name: band
      type: integer
    - name: frequency
      type: number
      description: "Parametric: Signed Integer, 20-20000 Hz. Graphic: Signed Integer/100 gain -24.0..+12.0 dB"

- id: input_eq_gain_set
  label: Input EQ Gain Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 04 00 {band_l} {band_h} {gain_l} {gain_h}"
  params:
    - name: channel
      type: integer
    - name: band
      type: integer
    - name: gain
      type: number
      description: "Signed Integer/100, -24.0 to +18.0 dB"

- id: input_eq_q_value_set
  label: Input EQ Q Value Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 05 00 {band_l} {band_h} {q_l} {q_h}"
  params:
    - name: channel
      type: integer
    - name: band
      type: integer
    - name: q
      type: number
      description: "Signed Integer/100, 0.02 to 50.0"

- id: input_eq_type_set
  label: Input EQ Band Type Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 06 00 {band_l} {band_h} {type_l} {type_h}"
  params:
    - name: channel
      type: integer
    - name: band
      type: integer
      description: "Zero-based band 0-30 (Bands 1-31)"
    - name: type
      type: integer
      description: "0=LowPass,1=HighPass,6=Parametric,7=LowShelf,8=HighShelf (2-5 reserved)"

# ----------------------------------------------------------------------------
# Module: Input Feedback Suppression (CH1=0x0081 .. CH32=0x00A0)
#   Storage slots 0-7.
# ----------------------------------------------------------------------------
- id: input_fbs_point_frequency_set
  label: Input FBS Feedback Point Frequency Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 02 00 {slot_l} {slot_h} {freq_l} {freq_h}"
  params:
    - name: channel
      type: integer
      description: "Module ID 0x0081..0x00A0"
    - name: slot
      type: integer
      description: "Feedback storage slot, zero-based 0-7"
    - name: frequency
      type: integer
      description: "Signed Integer, 20 to 20000 Hz"

- id: input_fbs_point_gain_set
  label: Input FBS Feedback Point Gain Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 03 00 {slot_l} {slot_h} {gain_l} {gain_h}"
  params:
    - name: channel
      type: integer
    - name: slot
      type: integer
    - name: gain
      type: number
      description: "Signed Integer/100, -24.0 to 0.0 dB"

- id: input_fbs_octave_set
  label: Input FBS Octave Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 04 00 {oct_l} {oct_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: octave
      type: integer
      description: "0x000A = 1/10th, 0x0014 = 1/5th"

- id: input_fbs_type_set
  label: Input FBS Filter Type Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 05 00 {slot_l} {slot_h} {type_l} {type_h}"
  params:
    - name: channel
      type: integer
    - name: slot
      type: integer
    - name: type
      type: integer
      description: "0 = Dynamic, 1 = Manual"

- id: input_fbs_step_set
  label: Input FBS Step Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 06 00 {step_l} {step_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: step
      type: number
      description: "Signed Integer/100, 0.5 to 3.0"
  notes: "Source labels Param1 'Release'; field is Step."

- id: input_fbs_panic_limit_threshold_set
  label: Input FBS Panic Limit Threshold Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 08 00 {thr_l} {thr_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: threshold
      type: number
      description: "Signed Integer/100, -36.0 to 0.0 dB"

- id: input_fbs_filter_depth_set
  label: Input FBS Filter Depth Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 09 00 {depth_l} {depth_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: depth
      type: number
      description: "Signed Integer/100, 1.0 to 24.0"

- id: input_fbs_feedback_threshold_set
  label: Input FBS Feedback Threshold Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 0A 00 {thr_l} {thr_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: threshold
      type: number
      description: "Signed Integer/100, -96.0 to -24.0 dB"

# ----------------------------------------------------------------------------
# Module: Echo Cancellation (0x00A3)
# ----------------------------------------------------------------------------
- id: aec_nonlinear_processor_set
  label: AEC Non-Linear Processor Set
  kind: action
  command: "B3 21 {checksum} 00 A3 00 02 00 {nlp_l} {nlp_h} 00 00"
  params:
    - name: nlp
      type: integer
      description: "0 = Conservative, 1 = Moderate, 2 = Aggressive"

# ----------------------------------------------------------------------------
# Module: Echo Cancellation Source (0x00A2)
# ----------------------------------------------------------------------------
- id: aec_source_set
  label: AEC Source Select Set
  kind: action
  command: "B3 21 {checksum} 00 A2 00 01 00 {ch_l} {ch_h} {sel_l} {sel_h}"
  params:
    - name: channel
      type: integer
      description: "Local: zero-based, 0x0020=AutoMixer; Remote: 0x0100 && zero-based ch, 0x0121=USB"
    - name: select
      type: integer
      description: "0 = Off, 1 = On"

# ----------------------------------------------------------------------------
# Module: AutoMix (0x00A1)
# ----------------------------------------------------------------------------
- id: automix_total_mute_set
  label: AutoMix Total Mute Set
  kind: action
  command: "B3 21 {checksum} 00 A1 00 01 00 {mute_l} {mute_h} 00 00"
  params:
    - name: mute
      type: integer
      description: "0 = Off, 1 = On"

- id: automix_total_gain_set
  label: AutoMix Total Gain Set
  kind: action
  command: "B3 21 {checksum} 00 A1 00 02 00 {gain_l} {gain_h} 00 00"
  params:
    - name: gain
      type: number
      description: "Signed Integer/100, -72.0 to +12.0 dB"

- id: automix_slope_set
  label: AutoMix Slope Set
  kind: action
  command: "B3 21 {checksum} 00 A1 00 03 00 {slope_l} {slope_h} 00 00"
  params:
    - name: slope
      type: number
      description: "Signed Integer/100, 1.0 to 3.0"

- id: automix_response_time_set
  label: AutoMix Response Time Set
  kind: action
  command: "B3 21 {checksum} 00 A1 00 04 00 {resp_l} {resp_h} 00 00"
  params:
    - name: response
      type: integer
      description: "Signed Integer, 1 to 5000 ms"

- id: automix_channel_enable_set
  label: AutoMix Channel Enable Set
  kind: action
  command: "B3 21 {checksum} 00 A1 00 05 00 {ch_l} {ch_h} {act_l} {act_h}"
  params:
    - name: channel
      type: integer
    - name: activate
      type: integer
      description: "0 = Off, 1 = On"

- id: automix_channel_mute_set
  label: AutoMix Channel Mute Set
  kind: action
  command: "B3 21 {checksum} 00 A1 00 06 00 {ch_l} {ch_h} {mute_l} {mute_h}"
  params:
    - name: channel
      type: integer
    - name: mute
      type: integer
      description: "0 = Off, 1 = On"

- id: automix_channel_gain_set
  label: AutoMix Channel Gain Set
  kind: action
  command: "B3 21 {checksum} 00 A1 00 07 00 {ch_l} {ch_h} {gain_l} {gain_h}"
  params:
    - name: channel
      type: integer
    - name: gain
      type: number
      description: "Signed Integer/100, -72.0 to +12.0 dB"

- id: automix_priority_set
  label: AutoMix Channel Priority Set
  kind: action
  command: "B3 21 {checksum} 00 A1 00 08 00 {ch_l} {ch_h} {pri_l} {pri_h}"
  params:
    - name: channel
      type: integer
    - name: priority
      type: integer
      description: "Signed Integer, 1 to 10"

- id: automix_enable_set
  label: AutoMix Enable Set
  kind: action
  command: "B3 21 {checksum} 00 A1 00 09 00 {en_l} {en_h} 00 00"  # UNRESOLVED: source table for 0x0009 lists no parameter detail
  params: []

# ----------------------------------------------------------------------------
# Module: Noise Suppression (0x00A5)
# ----------------------------------------------------------------------------
- id: noise_suppression_level_set
  label: Noise Suppression Level Set
  kind: action
  command: "B3 21 {checksum} 00 A5 00 02 00 {lvl_l} {lvl_h} 00 00"
  params:
    - name: level
      type: integer
      description: "0 = 6dB, 1 = 10dB, 2 = 15dB, 3 = 18dB"

# ----------------------------------------------------------------------------
# Module: Noise Suppression Source (0x00A4)
# ----------------------------------------------------------------------------
- id: noise_suppression_source_set
  label: Noise Suppression Source Select Set
  kind: action
  command: "B3 21 {checksum} 00 A4 00 01 00 {ch_l} {ch_h} {sel_l} {sel_h}"
  params:
    - name: channel
      type: integer
      description: "Local zero-based; 0x0020=AutoMixer, 0x0021=USB, 0x0022=AEC"
    - name: select
      type: integer
      description: "0 = Off, 1 = On"

# ----------------------------------------------------------------------------
# Module: Output Filter (CH1=0x00A7 .. CH32=0x00C6) - HP + LP per channel
# ----------------------------------------------------------------------------
- id: output_filter_hp_enable_set
  label: Output Filter High Pass Enable Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 01 00 {en_l} {en_h} 00 00"  # UNRESOLVED: enable value mapping not documented in source table
  params:
    - name: channel
      type: integer
      description: "Module ID 0x00A7..0x00C6"

- id: output_filter_hp_type_set
  label: Output Filter High Pass Type Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 02 00 {type_l} {type_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: type
      type: integer
      description: "0 = Bessel, 1 = Butterworth, 2 = Linkwitz Riley"

- id: output_filter_hp_slope_set
  label: Output Filter High Pass Slope Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 03 00 {slope_l} {slope_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: slope
      type: integer
      description: "6,12,18,24,32,36,42,48 dB/Octave"

- id: output_filter_hp_frequency_set
  label: Output Filter High Pass Frequency Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 04 00 {freq_l} {freq_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: frequency
      type: integer
      description: "Signed Integer, 20 to 20000 Hz"

- id: output_filter_hp_gain_set
  label: Output Filter High Pass Gain Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 05 00 {gain_l} {gain_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: gain
      type: number
      description: "Signed Integer/100, -15.0 to +15.0 dB"

- id: output_filter_lp_enable_set
  label: Output Filter Low Pass Enable Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 06 00 {en_l} {en_h} 00 00"  # UNRESOLVED: enable value mapping not documented
  params:
    - name: channel
      type: integer

- id: output_filter_lp_type_set
  label: Output Filter Low Pass Type Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 07 00 {type_l} {type_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: type
      type: integer
      description: "0 = Bessel, 1 = Butterworth, 2 = Linkwitz Riley"

- id: output_filter_lp_slope_set
  label: Output Filter Low Pass Slope Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 08 00 {slope_l} {slope_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: slope
      type: integer
      description: "6,12,18,24,32,36,42,48 dB/Octave"

- id: output_filter_lp_frequency_set
  label: Output Filter Low Pass Frequency Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 09 00 {freq_l} {freq_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: frequency
      type: integer
      description: "Signed Integer, 20 to 20000 Hz"

- id: output_filter_lp_gain_set
  label: Output Filter Low Pass Gain Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 0A 00 {gain_l} {gain_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: gain
      type: number
      description: "Signed Integer/100, -15.0 to +15.0 dB"

# ----------------------------------------------------------------------------
# Module: Output Delay (CH1=0x00E7 .. CH32=0x0106) - ms + us add together
# ----------------------------------------------------------------------------
- id: output_delay_milliseconds_set
  label: Output Delay Milliseconds Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 02 00 {ms_l} {ms_h} 00 00"
  params:
    - name: channel
      type: integer
      description: "Module ID 0x00E7..0x0106"
    - name: milliseconds
      type: integer
      description: "Signed Integer (add to Microseconds), 0 to 1200 ms"

- id: output_delay_microseconds_set
  label: Output Delay Microseconds Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 03 00 {us_l} {us_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: microseconds
      type: number
      description: "Signed Integer/100 (add to Milliseconds), 0 to 999 us"

# ----------------------------------------------------------------------------
# Module: Output EQ (CH1=0x00C7 .. CH32=0x00E6)
# ----------------------------------------------------------------------------
- id: output_eq_band_enable_set
  label: Output EQ Band Enable Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 02 00 {band_l} {band_h} {en_l} {en_h}"
  params:
    - name: channel
      type: integer
      description: "Module ID 0x00C7..0x00E6"
    - name: band
      type: integer
      description: "Parametric zero-based 0-11; Graphic Q 1/2/3"
    - name: enable
      type: integer
      description: "0 = On, 1 = Off"

- id: output_eq_frequency_set
  label: Output EQ Frequency Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 03 00 {band_l} {band_h} {freq_l} {freq_h}"
  params:
    - name: channel
      type: integer
    - name: band
      type: integer
    - name: frequency
      type: number
      description: "Parametric Signed Integer 20-20000 Hz; Graphic gain -24.0..+12.0 dB"

- id: output_eq_gain_set
  label: Output EQ Gain Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 04 00 {band_l} {band_h} {gain_l} {gain_h}"
  params:
    - name: channel
      type: integer
    - name: band
      type: integer
    - name: gain
      type: number
      description: "Signed Integer/100, -24.0 to +18.0 dB"

- id: output_eq_q_value_set
  label: Output EQ Q Value Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 05 00 {band_l} {band_h} {q_l} {q_h}"
  params:
    - name: channel
      type: integer
    - name: band
      type: integer
    - name: q
      type: number
      description: "Signed Integer/100, 0.02 to 50.0"

- id: output_eq_type_set
  label: Output EQ Band Type Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 06 00 {band_l} {band_h} {type_l} {type_h}"
  params:
    - name: channel
      type: integer
    - name: band
      type: integer
      description: "Zero-based 0-30 (Bands 1-31)"
    - name: type
      type: integer
      description: "0=LowPass,1=HighPass,6=Parametric,7=LowShelf,8=HighShelf (2-5 reserved)"

# ----------------------------------------------------------------------------
# Module: Output Limiter (CH1=0x0107 .. CH32=0x0126)
# ----------------------------------------------------------------------------
- id: output_limiter_threshold_set
  label: Output Limiter Threshold Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 02 00 {thr_l} {thr_h} 00 00"
  params:
    - name: channel
      type: integer
      description: "Module ID 0x0107..0x0126"
    - name: threshold
      type: number
      description: "Signed Integer/100, -72.0 to 0.0 dB"

- id: output_limiter_release_set
  label: Output Limiter Release Set
  kind: action
  command: "B3 21 {checksum} 00 {mid_l} {mid_h} 05 00 {rel_l} {rel_h} 00 00"
  params:
    - name: channel
      type: integer
    - name: release
      type: integer
      description: "Signed Integer, 1 to 10000 ms"

# ============================================================================
# Preset operations
# ============================================================================
- id: preset_recall_v1
  label: Preset Recall (V1)
  kind: action
  command: "B3 13 {checksum} 00 {preset} 00 00 00 00 00 00 00"
  params:
    - name: preset
      type: integer
      description: "Zero-based preset number (Preset 1 = 0x00)"
  notes: "Example (recall preset 5): B3 13 F4 00 04 00 00 00 00 00 00 00"

- id: preset_recall_v2
  label: Preset Recall (V2)
  kind: action
  command: "B3 13 01 01 {preset}"
  params:
    - name: preset
      type: integer
      description: "Zero-based preset number (0x00-0x0F)"
  notes: "Example (recall preset 2): B3 13 01 01 01. Length byte b2 always 0x01, version b3=0x01."

# ============================================================================
# Parameter GET (query) - V1 and V2. Requires Control Center Response ON.
# ============================================================================
- id: parameter_get_v1
  label: Parameter Get (V1)
  kind: query
  command: "B3 22 {checksum} 00 {mid_l} {mid_h} {pt_l} {pt_h} {p1_l} {p1_h} 00 00"
  params:
    - name: module_id
      type: integer
      description: "Target Module ID (e.g. 0x012B Input Source)"
    - name: parameter_type
      type: integer
      description: "Target Parameter Type"
    - name: channel
      type: integer
      description: "Channel/bank selector (Param1) when applicable; else 0x0000"
  notes: "Response: same GET message with b3=0xE0 and params filled. Example (GET mute In Ch14): B3 22 10 00 2B 01 02 00 0D 00 00 00 -> B3 22 10 E0 2B 01 02 00 0D 00 01 00"

- id: parameter_get_v2
  label: Parameter Get Multi-Channel (V2)
  kind: query
  command: "B3 22 {length} 01 {inout} {start} {end} {pt} {value_placeholders}"
  params:
    - name: input_output
      type: integer
      description: "0x02=Input, 0x01=Output"
    - name: start_channel
      type: integer
      description: "Zero-based start channel"
    - name: end_channel
      type: integer
      description: "Zero-based end channel"
    - name: parameter_type
      type: integer
    - name: value_placeholders
      type: string
      description: "Zeroed bytes, 2 per channel; length b2 = (end-start+1)*2"
  notes: "Response b3=0xE1. Example (GET gain In 1-8): B3 22 10 01 02 00 07 01 00 00 00 00 00 00 00 00 00 00 00 00 00 -> B3 22 10 E1 02 00 07 01 96 F6 32 02 3D FD 0B 02 03 FC 32 02 B5 FB 75 02"

- id: parameter_set_v2_multichannel
  label: Parameter Set Multi-Channel (V2)
  kind: action
  command: "B3 21 {length} 01 {inout} {start} {end} {pt} {values}"
  params:
    - name: input_output
      type: integer
      description: "0x02=Input, 0x01=Output"
    - name: start_channel
      type: integer
    - name: end_channel
      type: integer
    - name: parameter_type
      type: integer
      description: "Use Input Source (0x012B) params for inputs, Output (0x0127) for outputs"
    - name: values
      type: string
      description: "2 bytes per channel, only Parameter 2 values"
  notes: "Example (SET gain In 1-8 = -6.0dB): B3 21 10 01 02 00 07 01 AB FD AB FD AB FD AB FD AB FD AB FD AB FD AB FD"

# ============================================================================
# Other Controls (MsgType 0x74, V2)
# ============================================================================
- id: control_center_response_set
  label: Control Center Response Set
  kind: action
  command: "B3 74 08 01 04 00 00 00 {switch}"
  params:
    - name: switch
      type: integer
      description: "0x00 = OFF, 0x01 = ON. MUST be ON for GET responses."
  notes: "Enable command verbatim: B3 74 08 01 04 00 00 00 01. Send at least once on controller startup."

- id: gpio_set
  label: GPIO Output Set
  kind: action
  command: "B3 74 08 01 01 04 00 00 01 {start} {end} {value}"
  params:
    - name: start_gpio
      type: integer
      description: "Zero-based start pin (0-7)"
    - name: end_gpio
      type: integer
      description: "Zero-based end pin"
    - name: value
      type: integer
      description: "Bit-mapped ch1=lsb..ch8=msb; 0=Low,1=High"
  notes: "Example (GPIO 1-8 High): B3 74 08 01 01 04 00 00 01 00 07 FF. Example (5,7 High; 6,8 Low): B3 74 08 01 01 04 00 00 01 04 07 50"

- id: gpio_get
  label: GPIO Input Get
  kind: query
  command: "B3 74 08 01 01 04 00 00 00 {start} {end} 00"
  params:
    - name: start_gpio
      type: integer
    - name: end_gpio
      type: integer
  notes: "GPIO Dir=0x00 = Input GET. Example (GET all GPIO): B3 74 08 01 01 04 00 00 00 00 07 00"

- id: rs232_send
  label: RS-232 Send
  kind: action
  command: "B3 74 {length} 01 02 {msg_len} 00 00 {message_hex}"
  params:
    - name: message
      type: string
      description: "ASCII message payload as hex bytes"
  notes: "Example (output 'Hello, DSP.' from RS232): B3 74 10 01 02 00 00 00 48 65 6C 6C 6F A3 AC 44 53 50 2E 00"

- id: rs485_send
  label: RS-485 Send
  kind: action
  command: "B3 74 {length} 01 03 {msg_len} 00 00 {message_hex}"
  params:
    - name: message
      type: string
      description: "ASCII message payload as hex bytes"

- id: device_info_query
  label: Device Info Query
  kind: query
  command: "B3 74 14 01 05 14 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []
  notes: "Returns device name (b8-b23 ASCII) + AIn(b24), AOut(b25), DIn(b26), DOut(b27). Example resp: B3 74 14 E1 05 14 00 00 44 54 58 2D 31 36 31 36 44 00 00 00 00 00 00 00 10 10 10 10 (DTX-1616D, 16x16 analog, 16x16 Dante)"

- id: preset_reset
  label: Preset Reset
  kind: action
  command: "B3 74 04 01 06 00 00 00"
  params: []
  notes: "Discards unsaved changes, reverts to current preset values."

- id: rs485_direction_set
  label: RS-485 Direction Set
  kind: action
  command: "B3 74 {length} 01 07 00 00 00 {direction}"  # UNRESOLVED: source shows b[8]-b[11] Direction but no full worked example
  params:
    - name: direction
      type: integer
      description: "0x01 = Input, 0x00 = Output"

- id: udp_forward
  label: UDP Forward
  kind: action
  command: "B3 74 {length} 01 08 00 00 00 {ip_b8_b11} {port_l} {port_h} {datalen_l} {datalen_h} {data_hex}"
  params:
    - name: ip_address
      type: string
      description: "Destination IP, each octet one byte (b8..b11)"
    - name: port
      type: integer
      description: "Destination UDP port (2-byte WORD, b12=LSB)"
    - name: data
      type: string
      description: "UDP payload (ASCII -> hex)"
  notes: "Example (forward 'HELLO, DSP!' to 192.168.0.99:7000): B3 74 18 01 08 00 00 00 C0 A8 00 63 58 1B 0C 00 48 65 6C 6C 6F 2C 20 44 53 50 21 00"

- id: debug_enable
  label: Debug Enable
  kind: action
  command: "B3 74 {length} 01 09 00 00 00 {enable}"  # UNRESOLVED: source Control Type table lists 0x09 DebugEnable but byte table header shows b4=0x07 (likely typo); Enable value 0x01=On,0x00=Off
  params:
    - name: enable
      type: integer
      description: "0x01 = Debugging On, 0x00 = Off (runtime log to serial port)"

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "{factory_reset_code}"  # UNRESOLVED: reset hex code is device-specific, printed on a sticker affixed to the DTX, starts with 'A5'. Obtain from Aurora support if sticker missing.
  params: []
  notes: "Send factory-reset hex via UDP to port 6001 (NOT 50000). Requires firmware >= 2.1.210611."

- id: serial_to_udp_translation
  label: Serial-to-UDP Translation (RS-232 inbound)
  kind: action
  command: "3A 50 44 55 {ip_b4_b7} {port_b8_b9} {datalen_b10} {reserved_b11} {data}"
  params:
    - name: ip_address
      type: string
      description: "Destination IP, 4 bytes b4-b7"
    - name: port
      type: integer
      description: "UDP port b8-b9"
    - name: data
      type: string
      description: "Payload, max 128 bytes"
  notes: "Prefix ASCII 'UDP:' = 0x3A504455. When DTX receives serial msg starting with this prefix it forwards via LAN. Example ('HELLO DSP' to 192.168.1.22:50000): 3A 50 44 55 16 10 A8 C0 C3 50 09 00 50 53 44 20 4F 4C 4C 45 48"
```

## Feedbacks
```yaml
# Parameter GET responses (require Control Center Response ON).
# Response frames reuse the GET message shape with Version byte set: V1 -> b3=0xE0, V2 -> b3=0xE1.
- id: parameter_get_response
  type: object
  description: "Response to Parameter GET; payload carries current param values in Param1/Param2 bytes."
  notes: "Example GET-mute response (In Ch14 muted): B3 22 10 E0 2B 01 02 00 0D 00 01 00"

- id: device_info_response
  type: object
  description: "Response to Device Info query: device name + analog/Dante channel counts."
  notes: "Example: B3 74 14 E1 05 14 00 00 44 54 58 2D 31 36 31 36 44 00 00 00 00 00 00 00 10 10 10 10"

- id: gpio_input_state
  type: integer
  description: "GPIO input pin state returned in value byte (bit-mapped, ch1=lsb). 0=Low,1=High"
  notes: "Value semantics: >2VDC=High, <0.3VDC=Low (per GPIO Input definition)."

# UNRESOLVED: source documents no unsolicited/asynchronous notification stream; all responses are replies to GET.
```

## Variables
```yaml
# All settable DSP parameters are exposed via the SET actions above (parameterized by channel/slot/band).
# This section reserves device-wide runtime variables not covered by a discrete action.
# UNRESOLVED: no additional standalone variable entries documented in source beyond the param tables.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited event/notification messages. Device only replies to GET when Control Center Response is ON.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements for the control protocol. GPIO output drive limit (100mA/pin, 500mA
# total across 8 pins) and input voltage limits are electrical ratings, not protocol interlocks.
```

## Notes
- **Two protocol versions:** V1 = fixed 12-byte single-channel messages (default, preferred for automation). V2 = variable-length multi-channel/system messages. Version byte: V1 request `0x00`, V2 request `0x01`, V1 response `0xE0`, V2 response `0xE1`.
- **Checksum:** every message's b2 = LSB of the sum of all bytes with b2 held at `0x00`. Must be recomputed for any parameterized value before transmission.
- **Little-endian WORDs:** b[4]..b[11] are 16-bit WORDs (low byte = LSB, high byte = MSB). Matrix Point is the exception — b8/b9 are individual BYTEs (in channel, out channel).
- **Value encodings:** Boolean (0x0000/0x0001, note some Enable values invert), Integer, Zero-Based Integer (channel id), Signed Integer, Signed Integer/100 (decimals like gain).
- **RS-232 timing:** inter-message interval must be > 100ms for stable comms.
- **Control Center Response** must be ON (`B3 74 08 01 04 00 00 00 01`) to receive any GET reply. Recommended to send once at controller startup.
- **RS-485** is available on the same serial connector (shared GND with RS-232); +12VDC aux power can drive a remote RS-485 panel. Direction is settable via `rs485_direction_set`.
- **Dante vs analog channel numbering** is model-dependent (see Channel Layout table); Dante channels follow analog in sequence.
- **UDP factory reset** targets port 6001 (separate from the 50000 control port) and needs a device-specific code from a physical sticker.
- **Dash User Admin** (username/password) gates only Dash *software* login; external UDP/RS-232 control is not authenticated.

<!-- UNRESOLVED: flow_control not stated. Channel-name SET byte layout undocumented. Output Filter HP/LP enable value mapping undocumented. AutoMix Enable (0x0009) parameter detail missing. RS-485 Direction and Debug worked examples incomplete/ambiguous (Debug table header shows b4=0x07, likely typo for 0x09). FBS Reserved (0x0007) is n/a. Module ID ranges assume contiguous 32-channel coverage per source statement. No firmware compatibility range stated. -->

## Provenance

```yaml
source_domains:
  - ute.de
  - files.avprosupply.com
source_urls:
  - https://www.ute.de/images/downloads/handbuecher/user-manual_aurora_dtx-dash.pdf
  - https://files.avprosupply.com/files/attachments/487392/aurora-multimedia-dtx-44d-manual.pdf
retrieved_at: 2026-07-01T05:22:28.926Z
last_checked_at: 2026-07-07T10:58:24.287Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T10:58:24.287Z
matched_actions: 100
action_count: 100
confidence: medium
summary: "All 100 spec actions matched verbatim in the Aurora DTX Dash control protocol. Every message type, module ID, parameter type, and transport setting is documented in the source. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-485 transport details (separate from RS-232) not fully specified; flow_control not stated; auth behavior over RS-232 not explicitly stated (only UDP confirmed unaffected by User Admin)."
- "flow control not stated in source"
- "source does not document the name byte layout (Param2 shown only as 0x00)"
- "name byte layout not documented"
- "source table for 0x0009 lists no parameter detail"
- "enable value mapping not documented in source table"
- "enable value mapping not documented"
- "source shows b[8]-b[11] Direction but no full worked example"
- "source Control Type table lists 0x09 DebugEnable but byte table header shows b4=0x07 (likely typo); Enable value 0x01=On,0x00=Off"
- "reset hex code is device-specific, printed on a sticker affixed to the DTX, starts with 'A5'. Obtain from Aurora support if sticker missing."
- "source documents no unsolicited/asynchronous notification stream; all responses are replies to GET."
- "no additional standalone variable entries documented in source beyond the param tables."
- "source documents no unsolicited event/notification messages. Device only replies to GET when Control Center Response is ON."
- "source documents no named multi-step command sequences."
- "source contains no explicit safety warnings, interlock procedures, or power-on"
- "flow_control not stated. Channel-name SET byte layout undocumented. Output Filter HP/LP enable value mapping undocumented. AutoMix Enable (0x0009) parameter detail missing. RS-485 Direction and Debug worked examples incomplete/ambiguous (Debug table header shows b4=0x07, likely typo for 0x09). FBS Reserved (0x0007) is n/a. Module ID ranges assume contiguous 32-channel coverage per source statement. No firmware compatibility range stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
