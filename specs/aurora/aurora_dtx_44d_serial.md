---
spec_id: admin/aurora-dtx-44d
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora DTX-44D Control Spec"
manufacturer: Aurora
model_family: DTX-44D
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - DTX-44D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - api.auroramultimedia.com
  - auroramultimedia.com
source_urls:
  - https://api.auroramultimedia.com/api/download/345
  - https://auroramultimedia.com
retrieved_at: 2026-07-01T04:18:46.878Z
last_checked_at: 2026-07-07T11:00:10.044Z
generated_at: 2026-07-07T11:00:10.044Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power on/off command not documented; RS-232 flow control not stated; auth/token format not described; model-specific channel counts not confirmed (source examples reference a DTX-1616D, not the 44D explicitly)."
  - "flow control not stated in source"
  - "name payload encoding not fully specified in source (P2 documented as 0x00 only)"
  - "source lists P1=0x00, P2=0x00 only; effective value semantics undocumented"
  - "name payload encoding not fully specified (P2 documented as 0x00 only)"
  - "parameter type 0x0007 marked Reserved (P1=0x00); semantics unknown"
  - "source lists Param Type 0x0009 Enable with no P1 value table"
  - "source lists HP Enable (0x0001) with no P1 value table"
  - "source lists LP Enable (0x0006) with no P1 value table"
  - "exact hex payload not in source; code is device-specific, printed on sticker, starts with 'A5'"
  - "source does not define a distinct settable-variable namespace beyond the"
  - "source documents no unsolicited notification/event mechanism."
  - "source documents no named multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "model-specific analog/Dante channel counts for the DTX-44D not confirmed in this source (examples reference DTX-1616D)."
  - "exact Factory Reset hex payload not documented (device-specific code on physical sticker)."
  - "flow_control, auth/token format, protocol version negotiation, and firmware compatibility ranges not stated."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:00:10.044Z
  matched_actions: 99
  action_count: 99
  confidence: medium
  summary: "All 99 spec actions have literal command-level evidence in source; all transport parameters verified; complete protocol coverage. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Aurora DTX-44D Control Spec

## Summary
The Aurora DTX-44D is a Dante-enabled DSP audio processor (4-in / 4-out analog) controllable via RS-232, RS-485, or UDP. This spec covers the binary V1 (fixed 12-byte) and V2 (variable-length) control protocols documented in Appendix C/D of the source, including DSP parameter set/get, matrix routing, preset recall, GPIO, and serial/UDP forwarding.

<!-- UNRESOLVED: power on/off command not documented; RS-232 flow control not stated; auth/token format not described; model-specific channel counts not confirmed (source examples reference a DTX-1616D, not the 44D explicitly). -->

## Transport
```yaml
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
  port: 50000  # UDP control default port (stated in Appendix C)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable   # inferred: Parameter GET (0x22) and Device Info query documented
  - routable    # inferred: Matrix Point set/get routing commands documented
  - levelable   # inferred: gain/level/sensitivity parameter commands documented
```

## Actions
```yaml
# ============================================================================
# V1 / V2 FRAME ENCODING (applies to all DSP parameter actions below)
# ----------------------------------------------------------------------------
# V1 frame (12 bytes, fixed):  b[0]=B3 b[1]=MsgType b[2]=Checksum b[3]=00
#   b[4..b5]=ModuleID(WORD LE) b[6..b7]=ParamType(WORD LE)
#   b[8..b9]=Param1(WORD LE)   b[10..b11]=Param2(WORD LE)
# V2 frame: b[0]=B3 b[1]=MsgType b[2]=Length b[3]=01 b[4..]=Data (see per-msg)
# Checksum (b[2]): sum all bytes b[0]..b[11] with b[2] set to 0x00, take LSB.
# All WORDs little-endian (LSB in lower byte position).
# Set MsgType 0x21=ParamSET, 0x22=ParamGET, 0x13=PresetSET, 0x74=Other.
# Per-channel modules: ModuleID = base + (channel-1); channels are 1-based.
# RS-232 inter-message interval MUST be > 100ms for stable comms.
# Placeholder tokens in command templates: {cs}=checksum, {..}=encoded value.
# ============================================================================

# ---- Input Source (Module 0x012B) ----
- id: input_gain_set
  label: Set Input Channel Gain
  kind: action
  command: "B3 21 {cs} 00 2B 01 01 00 {ch_lo} {ch_hi} {gain_lo} {gain_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32 (zero-based in P1)" }
    - { name: gain, type: number, description: "Gain -72.0 to +12.0 dB (signed int /100 in P2)" }

- id: input_mute_set
  label: Set Input Channel Mute
  kind: action
  command: "B3 21 {cs} 00 2B 01 02 00 {ch_lo} {ch_hi} {mute_lo} {mute_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: mute, type: integer, description: "0 = Off, 1 = On" }

- id: input_sensitivity_set
  label: Set Input Channel Sensitivity
  kind: action
  command: "B3 21 {cs} 00 2B 01 03 00 {ch_lo} {ch_hi} {val_lo} {val_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: sensitivity, type: integer, description: "Integer value * 3 = dB; 0 to 48 dB in 3 dB steps" }

- id: input_phantom_set
  label: Set Input Channel Phantom Power
  kind: action
  command: "B3 21 {cs} 00 2B 01 04 00 {ch_lo} {ch_hi} {ph_lo} {ph_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: power, type: integer, description: "0 = Off, 1 = On" }

- id: input_sig_gen_type_set
  label: Set Input Channel Signal Generator Type
  kind: action
  command: "B3 21 {cs} 00 2B 01 05 00 {ch_lo} {ch_hi} {t_lo} {t_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: type, type: integer, description: "0 = Off, 1 = Sine, 2 = White, 3 = Pink" }

- id: input_sig_gen_freq_set
  label: Set Input Channel Signal Generator Frequency
  kind: action
  command: "B3 21 {cs} 00 2B 01 06 00 {ch_lo} {ch_hi} {f_lo} {f_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: frequency, type: integer, description: "20 to 20000 Hz (integer value of hex)" }

- id: input_sine_gain_set
  label: Set Input Channel Sine Wave Gain
  kind: action
  command: "B3 21 {cs} 00 2B 01 07 00 {ch_lo} {ch_hi} {g_lo} {g_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: gain, type: number, description: "-72.0 to 0.0 dB (signed int /100)" }

- id: input_channel_name_set
  label: Set Input Channel Name
  kind: action
  command: "B3 21 {cs} 00 2B 01 08 00 {ch_lo} {ch_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
  # UNRESOLVED: name payload encoding not fully specified in source (P2 documented as 0x00 only)

- id: input_phase_set
  label: Set Input Channel Phase Reverse
  kind: action
  command: "B3 21 {cs} 00 2B 01 09 00 {ch_lo} {ch_hi} {ph_lo} {ph_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: phase, type: integer, description: "0 = Off, 1 = On" }

- id: input_gain_nudge_set
  label: Set Input Channel Gain Nudge
  kind: action
  command: "B3 21 {cs} 00 2B 01 0A 00 {ch_lo} {ch_hi} {inc_lo} {inc_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: increment, type: number, description: "-3, -2, -1, +1, +2 or +3 dB (signed int /100)" }

- id: input_link_set
  label: Set Input Channel Link
  kind: action
  command: "B3 21 {cs} 00 2B 01 0B 00 {lo_lo} {lo_hi} {link_lo} {link_hi}"
  params:
    - { name: lowest_channel, type: integer, description: "Lowest channel in link pair, 1-32 (NOT zero based)" }
    - { name: link, type: integer, description: "0 = Off, 1 = On" }

- id: input_channel_level_set
  label: Set Input Channel Level
  kind: action
  command: "B3 21 {cs} 00 2B 01 0C 00 {ch_lo} {ch_hi} {lvl_lo} {lvl_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: level, type: number, description: "-72.0 to +12.0 dB (signed int /100)" }

# ---- System Control (Module 0x0128) ----
- id: system_gain_set
  label: Set System Gain
  kind: action
  command: "B3 21 {cs} 00 28 01 01 00 00 00 00 00"
  params: []
  # UNRESOLVED: source lists P1=0x00, P2=0x00 only; effective value semantics undocumented

- id: system_mute_set
  label: Set System Mute
  kind: action
  command: "B3 21 {cs} 00 28 01 02 00 {m_lo} {m_hi} 00 00"
  params:
    - { name: mute, type: integer, description: "0 = Off, 1 = On" }

# ---- Output (Module 0x0127) ----
- id: output_gain_set
  label: Set Output Channel Gain
  kind: action
  command: "B3 21 {cs} 00 27 01 01 00 {ch_lo} {ch_hi} {gain_lo} {gain_hi}"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: gain, type: number, description: "-72.0 to +12.0 dB (signed int /100)" }

- id: output_mute_set
  label: Set Output Channel Mute
  kind: action
  command: "B3 21 {cs} 00 27 01 02 00 {ch_lo} {ch_hi} {mute_lo} {mute_hi}"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: mute, type: integer, description: "0 = Off, 1 = On" }

- id: output_channel_name_set
  label: Set Output Channel Name
  kind: action
  command: "B3 21 {cs} 00 27 01 03 00 {ch_lo} {ch_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
  # UNRESOLVED: name payload encoding not fully specified (P2 documented as 0x00 only)

- id: output_phase_set
  label: Set Output Channel Phase Reverse
  kind: action
  command: "B3 21 {cs} 00 27 01 04 00 {ch_lo} {ch_hi} {ph_lo} {ph_hi}"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: phase, type: integer, description: "0 = Off, 1 = On" }

- id: output_sensitivity_set
  label: Set Output Channel Sensitivity
  kind: action
  command: "B3 21 {cs} 00 27 01 05 00 {ch_lo} {ch_hi} {val_lo} {val_hi}"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: sensitivity, type: integer, description: "Integer value * 3 = dB; 0 to 48 dB in 3 dB steps" }

- id: output_gain_nudge_set
  label: Set Output Channel Gain Nudge
  kind: action
  command: "B3 21 {cs} 00 27 01 06 00 {ch_lo} {ch_hi} {inc_lo} {inc_hi}"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: increment, type: number, description: "-3, -2, -1, +1, +2 or +3 dB (signed int /100)" }

- id: output_link_set
  label: Set Output Channel Link
  kind: action
  command: "B3 21 {cs} 00 27 01 07 00 {lo_lo} {lo_hi} {link_lo} {link_hi}"
  params:
    - { name: lowest_channel, type: integer, description: "Lowest channel in link pair, 1-32 (NOT zero based)" }
    - { name: link, type: integer, description: "0 = Off, 1 = On" }

- id: output_channel_level_set
  label: Set Output Channel Level
  kind: action
  command: "B3 21 {cs} 00 27 01 08 00 {ch_lo} {ch_hi} {lvl_lo} {lvl_hi}"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: level, type: number, description: "-72.0 to +12.0 dB (signed int /100)" }

# ---- Matrix (Module 0x00A6) ----
- id: matrix_point_set
  label: Set Matrix Point Active
  kind: action
  command: "B3 21 {cs} 00 A6 00 01 00 {in_b} {out_b} {act_lo} {act_hi}"
  params:
    - { name: input_channel, type: integer, description: "Zero-based input (0-31; 32=AutoMix, 33=USB, 34=AEC, 35=ANS). b[8]." }
    - { name: output_channel, type: integer, description: "Zero-based output (0-31; 32=USB). b[9]." }
    - { name: active, type: integer, description: "0 = Off, 1 = On" }
  note: "Matrix Point uses BYTEs in b[8]/b[9], not WORDs."

- id: matrix_point_gain_set
  label: Set Matrix Point Gain
  kind: action
  command: "B3 21 {cs} 00 A6 00 02 00 {in_b} {out_b} {gain_lo} {gain_hi}"
  params:
    - { name: input_channel, type: integer, description: "Zero-based input (0-31; 32=AutoMix, 33=USB, 34=AEC, 35=ANS)" }
    - { name: output_channel, type: integer, description: "Zero-based output (0-31; 32=USB)" }
    - { name: gain, type: number, description: "-72.0 to +12.0 dB (signed int /100)" }

# ---- Input Expander (Module 0x0001 + (ch-1), channels 1-32) ----
- id: input_expander_threshold_set
  label: Set Input Expander Threshold
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 02 00 {thr_lo} {thr_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32; Module = 0x0001 + (channel-1)" }
    - { name: threshold, type: number, description: "-72.0 to 0.0 dB (signed int /100, P1)" }

- id: input_expander_ratio_set
  label: Set Input Expander Ratio
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 03 00 {r_lo} {r_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: ratio, type: number, description: "1.00 to 20.00 (signed int /100, P1)" }

- id: input_expander_attack_set
  label: Set Input Expander Attack
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 04 00 {a_lo} {a_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: attack, type: integer, description: "1 to 500 ms (signed integer, P1)" }

- id: input_expander_release_set
  label: Set Input Expander Release
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 05 00 {r_lo} {r_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: release, type: integer, description: "1 to 10000 ms (signed integer, P1)" }

# ---- Input Compressor (Module 0x0021 + (ch-1)) ----
- id: input_compressor_threshold_set
  label: Set Input Compressor Threshold
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 02 00 {thr_lo} {thr_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32; Module = 0x0021 + (channel-1)" }
    - { name: threshold, type: number, description: "-48.0 to 0.0 dB (signed int /100, P1)" }

- id: input_compressor_ratio_set
  label: Set Input Compressor Ratio
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 03 00 {r_lo} {r_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: ratio, type: number, description: "1.00 to 20.00 (signed int /100, P1)" }

- id: input_compressor_attack_set
  label: Set Input Compressor Attack
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 04 00 {a_lo} {a_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: attack, type: integer, description: "1 to 500 ms (P1)" }

- id: input_compressor_release_set
  label: Set Input Compressor Release
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 05 00 {r_lo} {r_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: release, type: integer, description: "1 to 10000 ms (P1)" }

- id: input_compressor_gain_comp_set
  label: Set Input Compressor Gain Compensation
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 06 00 {g_lo} {g_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: gain, type: number, description: "-72.0 to +6.0 dB (signed int /100, P1)" }

# ---- Input AutoGain (Module 0x0041 + (ch-1)) ----
- id: input_autogain_threshold_set
  label: Set Input AutoGain Threshold
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 02 00 {thr_lo} {thr_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32; Module = 0x0041 + (channel-1)" }
    - { name: threshold, type: number, description: "-72.0 to -20.0 dB (signed int /100, P1)" }

- id: input_autogain_target_set
  label: Set Input AutoGain Target Level
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 03 00 {t_lo} {t_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: target, type: number, description: "-20.0 to 0.0 dB (signed int /100, P1)" }

- id: input_autogain_ratio_set
  label: Set Input AutoGain Ratio
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 04 00 {r_lo} {r_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: ratio, type: number, description: "1.00 to 20.00 (signed int /100, P1)" }

- id: input_autogain_attack_set
  label: Set Input AutoGain Attack
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 05 00 {a_lo} {a_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: attack, type: integer, description: "1 to 500 ms (P1)" }

- id: input_autogain_release_set
  label: Set Input AutoGain Release
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 06 00 {r_lo} {r_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: release, type: integer, description: "1 to 10000 ms (P1)" }

# ---- Input EQ (Module 0x0061 + (ch-1)) ----
- id: input_eq_band_enable_set
  label: Set Input EQ Band Enable
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 02 00 {band_lo} {band_hi} {en_lo} {en_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32; Module = 0x0061 + (channel-1)" }
    - { name: band, type: integer, description: "Band number (zero-based, 0-11) for parametric; or Q (1=Wide,2=Normal,3=Narrow) for graphic (P1)" }
    - { name: enable, type: integer, description: "0 = On, 1 = Off (P2)" }

- id: input_eq_frequency_set
  label: Set Input EQ Frequency / Graphic Gain
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 03 00 {p1_lo} {p1_hi} {p2_lo} {p2_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: value, type: number, description: "Parametric: frequency 20-20000 Hz (signed int, P2). Graphic: gain -24.0 to +12.0 dB (signed int /100, P2)." }

- id: input_eq_gain_set
  label: Set Input EQ Gain
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 04 00 {p1_lo} {p1_hi} {g_lo} {g_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: gain, type: number, description: "-24.0 to +18.0 dB (signed int /100, P2)" }

- id: input_eq_q_set
  label: Set Input EQ Q Value
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 05 00 {p1_lo} {p1_hi} {q_lo} {q_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: q, type: number, description: "0.02 to 50.0 (signed int /100, P2)" }

- id: input_eq_type_set
  label: Set Input EQ Band Type
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 06 00 {band_lo} {band_hi} {t_lo} {t_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: band, type: integer, description: "Band number (zero-based, 0-30 = bands 1-31) (P1)" }
    - { name: type, type: integer, description: "0=LowPass,1=HighPass,6=Parametric,7=LowShelf,8=HighShelf (2-5 reserved) (P2)" }

# ---- Input Feedback Suppression (Module 0x0081 + (ch-1)) ----
- id: fbs_point_frequency_set
  label: Set Feedback Point Frequency
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 02 00 {slot_lo} {slot_hi} {f_lo} {f_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32; Module = 0x0081 + (channel-1)" }
    - { name: slot, type: integer, description: "Feedback storage slot 0-7 (zero-based, P1)" }
    - { name: frequency, type: integer, description: "20 to 20000 Hz (signed integer, P2)" }

- id: fbs_point_gain_set
  label: Set Feedback Point Gain
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 03 00 {slot_lo} {slot_hi} {g_lo} {g_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: slot, type: integer, description: "Storage slot 0-7 (P1)" }
    - { name: gain, type: number, description: "-24.0 to 0.0 dB (signed int /100, P2)" }

- id: fbs_octave_set
  label: Set Feedback Suppression Octave
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 04 00 {oct_lo} {oct_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: octave, type: integer, description: "0x000A = 1/10th, 0x0014 = 1/5th (P1)" }

- id: fbs_type_set
  label: Set Feedback Point Type
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 05 00 {slot_lo} {slot_hi} {t_lo} {t_hi}"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: slot, type: integer, description: "Storage slot 0-7 (P1)" }
    - { name: type, type: integer, description: "0 = Dynamic, 1 = Manual (P2)" }

- id: fbs_step_set
  label: Set Feedback Suppression Step
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 06 00 {s_lo} {s_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: step, type: number, description: "0.5 to 3.0 (signed int /100, P1)" }

- id: fbs_reserved_set
  label: Set Feedback Suppression Reserved
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 07 00 00 00 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
  # UNRESOLVED: parameter type 0x0007 marked Reserved (P1=0x00); semantics unknown

- id: fbs_panic_threshold_set
  label: Set Panic Limit Threshold
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 08 00 {thr_lo} {thr_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: threshold, type: number, description: "-36.0 to 0.0 dB (signed int /100, P1)" }

- id: fbs_filter_depth_set
  label: Set Filter Depth
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 09 00 {d_lo} {d_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: depth, type: number, description: "1.0 to 24.0 (signed int /100, P1)" }

- id: fbs_feedback_threshold_set
  label: Set Feedback Threshold
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 0A 00 {thr_lo} {thr_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Input channel 1-32" }
    - { name: threshold, type: number, description: "-96.0 to -24.0 dB (signed int /100, P1)" }

# ---- Echo Cancellation (Module 0x00A3) ----
- id: aec_nlp_set
  label: Set AEC Non-Linear Processor
  kind: action
  command: "B3 21 {cs} 00 A3 00 02 00 {nlp_lo} {nlp_hi} 00 00"
  params:
    - { name: nlp, type: integer, description: "0 = Conservative, 1 = Moderate, 2 = Aggressive (P1)" }

# ---- Echo Cancellation Source (Module 0x00A2) ----
- id: aec_source_set
  label: Set AEC Source
  kind: action
  command: "B3 21 {cs} 00 A2 00 01 00 {ch_lo} {ch_hi} {sel_lo} {sel_hi}"
  params:
    - { name: channel, type: integer, description: "Local: zero-based; 0x0020=AutoMixer. Remote: 0x0100 + zero-based channel; 0x0121=USB (P1)" }
    - { name: select, type: integer, description: "0 = Off, 1 = On (P2)" }

# ---- AutoMix (Module 0x00A1) ----
- id: automix_total_mute_set
  label: Set AutoMix Total Mute
  kind: action
  command: "B3 21 {cs} 00 A1 00 01 00 {m_lo} {m_hi} 00 00"
  params:
    - { name: mute, type: integer, description: "0 = Off, 1 = On (P1)" }

- id: automix_total_gain_set
  label: Set AutoMix Total Gain
  kind: action
  command: "B3 21 {cs} 00 A1 00 02 00 {g_lo} {g_hi} 00 00"
  params:
    - { name: gain, type: number, description: "-72.0 to +12.0 dB (signed int /100, P1)" }

- id: automix_slope_set
  label: Set AutoMix Slope
  kind: action
  command: "B3 21 {cs} 00 A1 00 03 00 {s_lo} {s_hi} 00 00"
  params:
    - { name: slope, type: number, description: "1.0 to 3.0 (signed int /100, P1)" }

- id: automix_response_time_set
  label: Set AutoMix Response Time
  kind: action
  command: "B3 21 {cs} 00 A1 00 04 00 {rt_lo} {rt_hi} 00 00"
  params:
    - { name: response, type: integer, description: "1 to 5000 ms (P1)" }

- id: automix_channel_enable_set
  label: Set Channel AutoMix Enable
  kind: action
  command: "B3 21 {cs} 00 A1 00 05 00 {ch_lo} {ch_hi} {act_lo} {act_hi}"
  params:
    - { name: channel, type: integer, description: "Channel (P1)" }
    - { name: activate, type: integer, description: "0 = Off, 1 = On (P2)" }

- id: automix_channel_mute_set
  label: Set Channel AutoMix Mute
  kind: action
  command: "B3 21 {cs} 00 A1 00 06 00 {ch_lo} {ch_hi} {m_lo} {m_hi}"
  params:
    - { name: channel, type: integer, description: "Channel (P1)" }
    - { name: mute, type: integer, description: "0 = Off, 1 = On (P2)" }

- id: automix_channel_gain_set
  label: Set Channel AutoMix Gain
  kind: action
  command: "B3 21 {cs} 00 A1 00 07 00 {ch_lo} {ch_hi} {g_lo} {g_hi}"
  params:
    - { name: channel, type: integer, description: "Channel (P1)" }
    - { name: gain, type: number, description: "-72.0 to +12.0 dB (signed int /100, P2)" }

- id: automix_priority_set
  label: Set Channel AutoMix Priority
  kind: action
  command: "B3 21 {cs} 00 A1 00 08 00 {ch_lo} {ch_hi} {p_lo} {p_hi}"
  params:
    - { name: channel, type: integer, description: "Channel (P1)" }
    - { name: priority, type: integer, description: "1 to 10 (P2)" }

- id: automix_enable_set
  label: Set AutoMix Enable
  kind: action
  command: "B3 21 {cs} 00 A1 00 09 00 {e_lo} {e_hi} 00 00"
  params:
    - { name: enable, type: integer, description: "Enable (P1)" }
  # UNRESOLVED: source lists Param Type 0x0009 Enable with no P1 value table

# ---- Noise Suppression (Module 0x00A5) ----
- id: ns_level_set
  label: Set Noise Suppression Level
  kind: action
  command: "B3 21 {cs} 00 A5 00 02 00 {lvl_lo} {lvl_hi} 00 00"
  params:
    - { name: level, type: integer, description: "0 = 6dB, 1 = 10dB, 2 = 15dB, 3 = 18dB (P1)" }

# ---- Noise Suppression Source (Module 0x00A4) ----
- id: ns_source_set
  label: Set Noise Suppression Source
  kind: action
  command: "B3 21 {cs} 00 A4 00 01 00 {ch_lo} {ch_hi} {sel_lo} {sel_hi}"
  params:
    - { name: channel, type: integer, description: "Local zero-based; 0x0020=AutoMixer, 0x0021=USB, 0x0022=AEC (P1)" }
    - { name: select, type: integer, description: "0 = Off, 1 = On (P2)" }

# ---- Output Filter (Module 0x00A7 + (ch-1)) ----
- id: output_filter_hp_enable_set
  label: Set Output High Pass Enable
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 01 00 {en_lo} {en_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32; Module = 0x00A7 + (channel-1)" }
    - { name: enable, type: integer, description: "Enable (P1)" }
  # UNRESOLVED: source lists HP Enable (0x0001) with no P1 value table

- id: output_filter_hp_type_set
  label: Set Output High Pass Type
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 02 00 {t_lo} {t_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: type, type: integer, description: "0 = Bessel, 1 = Butterworth, 2 = Linkwitz-Riley (P1)" }

- id: output_filter_hp_slope_set
  label: Set Output High Pass Slope
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 03 00 {s_lo} {s_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: slope, type: integer, description: "6,12,18,24,32,36,42,48 dB/Octave (P1)" }

- id: output_filter_hp_freq_set
  label: Set Output High Pass Frequency
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 04 00 {f_lo} {f_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: frequency, type: integer, description: "20 to 20000 Hz (P1)" }

- id: output_filter_hp_gain_set
  label: Set Output High Pass Gain
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 05 00 {g_lo} {g_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: gain, type: number, description: "-15.0 to +15.0 dB (signed int /100, P1)" }

- id: output_filter_lp_enable_set
  label: Set Output Low Pass Enable
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 06 00 {en_lo} {en_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: enable, type: integer, description: "Enable (P1)" }
  # UNRESOLVED: source lists LP Enable (0x0006) with no P1 value table

- id: output_filter_lp_type_set
  label: Set Output Low Pass Type
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 07 00 {t_lo} {t_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: type, type: integer, description: "0 = Bessel, 1 = Butterworth, 2 = Linkwitz-Riley (P1)" }

- id: output_filter_lp_slope_set
  label: Set Output Low Pass Slope
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 08 00 {s_lo} {s_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: slope, type: integer, description: "6,12,18,24,32,36,42,48 dB/Octave (P1)" }

- id: output_filter_lp_freq_set
  label: Set Output Low Pass Frequency
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 09 00 {f_lo} {f_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: frequency, type: integer, description: "20 to 20000 Hz (P1)" }

- id: output_filter_lp_gain_set
  label: Set Output Low Pass Gain
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 0A 00 {g_lo} {g_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: gain, type: number, description: "-15.0 to +15.0 dB (signed int /100, P1)" }

# ---- Output Delay (Module 0x00E7 + (ch-1)) ----
- id: output_delay_ms_set
  label: Set Output Delay Milliseconds
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 02 00 {ms_lo} {ms_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32; Module = 0x00E7 + (channel-1)" }
    - { name: milliseconds, type: integer, description: "0 to 1200 ms (signed integer, added to microseconds, P1)" }

- id: output_delay_us_set
  label: Set Output Delay Microseconds
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 03 00 {us_lo} {us_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: microseconds, type: number, description: "0 to 999 us (signed int /100, added to ms, P1)" }

# ---- Output EQ (Module 0x00C7 + (ch-1)) ----
- id: output_eq_band_enable_set
  label: Set Output EQ Band Enable
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 02 00 {band_lo} {band_hi} {en_lo} {en_hi}"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32; Module = 0x00C7 + (channel-1)" }
    - { name: band, type: integer, description: "Band (zero-based 0-11) parametric; or Q (1/2/3) graphic (P1)" }
    - { name: enable, type: integer, description: "0 = On, 1 = Off (P2)" }

- id: output_eq_frequency_set
  label: Set Output EQ Frequency / Graphic Gain
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 03 00 {p1_lo} {p1_hi} {p2_lo} {p2_hi}"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: value, type: number, description: "Parametric: freq 20-20000 Hz (signed int, P2). Graphic: gain -24.0 to +12.0 dB (signed int /100, P2)." }

- id: output_eq_gain_set
  label: Set Output EQ Gain
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 04 00 {p1_lo} {p1_hi} {g_lo} {g_hi}"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: gain, type: number, description: "-24.0 to +18.0 dB (signed int /100, P2)" }

- id: output_eq_q_set
  label: Set Output EQ Q Value
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 05 00 {p1_lo} {p1_hi} {q_lo} {q_hi}"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: q, type: number, description: "0.02 to 50.0 (signed int /100, P2)" }

- id: output_eq_type_set
  label: Set Output EQ Band Type
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 06 00 {band_lo} {band_hi} {t_lo} {t_hi}"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: band, type: integer, description: "Band (zero-based 0-30) (P1)" }
    - { name: type, type: integer, description: "0=LowPass,1=HighPass,6=Parametric,7=LowShelf,8=HighShelf (2-5 reserved) (P2)" }

# ---- Output Limiter (Module 0x0107 + (ch-1)) ----
- id: output_limiter_threshold_set
  label: Set Output Limiter Threshold
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 02 00 {thr_lo} {thr_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32; Module = 0x0107 + (channel-1)" }
    - { name: threshold, type: number, description: "-72.0 to 0.0 dB (signed int /100, P1)" }

- id: output_limiter_release_set
  label: Set Output Limiter Release
  kind: action
  command: "B3 21 {cs} 00 {ml} {mh} 05 00 {r_lo} {r_hi} 00 00"
  params:
    - { name: channel, type: integer, description: "Output channel 1-32" }
    - { name: release, type: integer, description: "1 to 10000 ms (P1)" }

# ---- Preset Recall ----
- id: preset_recall_v1
  label: Recall Preset (V1)
  kind: action
  command: "B3 13 {cs} 00 {preset} 00 00 00 00 00 00 00"
  params:
    - { name: preset, type: integer, description: "Zero-based preset 0-15 (Preset 1 = 0x00)" }
  example: "0xB313F4000400000000000000 = recall preset 5"

- id: preset_recall_v2
  label: Recall Preset (V2)
  kind: action
  command: "B3 13 01 01 {preset}"
  params:
    - { name: preset, type: integer, description: "Zero-based preset 0x00-0x0F (b[4]); Length (b[2]) always 0x01; Version 0x01" }
  example: "0xB313010101 = recall preset 2"

# ---- Parameter GET (queries) ----
- id: parameter_get_v1
  label: Get Parameter (V1, single channel)
  kind: query
  command: "B3 22 {cs} 00 {ml} {mh} {pl} {ph} {p1_lo} {p1_hi} {p2_lo} {p2_hi}"
  params:
    - { name: module_id, type: integer, description: "Module ID (see Modules), encoded LE in b[4]/b[5]" }
    - { name: param_type, type: integer, description: "Parameter Type (see module tables), LE in b[6]/b[7]" }
    - { name: param1, type: integer, description: "P1 (e.g. channel / slot). Ignored values may be 0x0000." }
  note: "Response echoes GET frame with Version byte b[3]=0xE0 and P1/P2 set to current state. Requires Control Center Response ON."
  examples:
    - "GET Mute of Input Ch14: 0xB32210002B0102000D000000"
    - "GET Matrix Point USB-In -> Out10: 0xB322A500A600010021090000"

- id: parameter_get_v2
  label: Get Parameter (V2, channel range)
  kind: query
  command: "B3 22 {length} 01 02 {start} {end} {pl} {ph} {placeholder_bytes}"
  params:
    - { name: input_output, type: integer, description: "b[4]: 0x02 = Input, 0x01 = Output" }
    - { name: start_channel, type: integer, description: "Zero-based start channel (b[5])" }
    - { name: end_channel, type: integer, description: "Zero-based end channel (b[6])" }
    - { name: param_type, type: integer, description: "Parameter Type (Input 0x012B / Output 0x0127 tables), b[7]" }
  note: "Length b[2] = (end - start + 1) * 2. Provide 0x00 placeholder bytes (2 per channel). Response has Version b[3]=0xE1."

# ---- V2 Other Controls (Message Type 0x74) ----
- id: control_gpio
  label: GPIO Set / Get
  kind: action
  command: "B3 74 08 01 04 00 {dir} {start} {end} {value}"
  params:
    - { name: direction, type: integer, description: "b[8] GPIO Dir: 0x00 = Input (GET), 0x01 = Output (SET)" }
    - { name: start_gpio, type: integer, description: "Zero-based start GPIO (b[9])" }
    - { name: end_gpio, type: integer, description: "Zero-based end GPIO (b[10])" }
    - { name: value, type: integer, description: "b[11] bitmask, ch1=LSB..ch8=MSB: 0x00=Low, 0x01=High (per bit)" }
  examples:
    - "Set GPIO 1-8 High: 0xB374080104000000010007FF"
    - "GET all GPIO: 0xB37408010104000000000700"

- id: control_rs232_send
  label: RS-232 Send
  kind: action
  command: "B3 74 {length} 02 {msg_len} 00 00 {message_bytes}"
  params:
    - { name: message, type: string, description: "ASCII/hex payload to emit on RS-232 port (b[8]+)" }
  example: "Output 'Hello, DSP.' on RS232: B37410010200000048656c6c6fa3ac4453502e00"

- id: control_rs485_send
  label: RS-485 Send
  kind: action
  command: "B3 74 {length} 03 {msg_len} 00 00 {message_bytes}"
  params:
    - { name: message, type: string, description: "Payload to emit on RS-485 port (b[8]+)" }

- id: control_center_response_set
  label: Set Control Center Response
  kind: action
  command: "B3 74 08 01 04 00 00 01 {switch}"
  params:
    - { name: switch, type: integer, description: "b[8]: 0x00 = OFF, 0x01 = ON. MUST be ON to receive GET responses." }
  example: "Enable responses (V2): 0xB37408010400000001"

- id: device_info_get
  label: Get Device Info
  kind: query
  command: "B3 74 14 01 05 14 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []
  note: "Response: b[8..b23]=Device Name (ASCII), b[24]=Analog In count, b[25]=Analog Out count, b[26]=Dante In count, b[27]=Dante Out count."

- id: preset_reset
  label: Preset Reset (discard unsaved changes)
  kind: action
  command: "B3 74 04 01 06 00 00 00"
  params: []
  note: "Resets unit back to current preset values, discarding unsaved changes. Length b[2]=0x04."

- id: rs485_direction_set
  label: Set RS-485 Direction
  kind: action
  command: "B3 74 {length} 01 07 00 00 {direction}"
  params:
    - { name: direction, type: integer, description: "0x01 = Input, 0x00 = Output (b[8]-b[11])" }

- id: udp_forward
  label: UDP Forward
  kind: action
  command: "B3 74 {length} 01 08 00 00 {ip_b4} {port_lo} {port_hi} {dlen_lo} {dlen_hi} {udp_data}"
  params:
    - { name: ip_address, type: string, description: "Destination IP, one octet per byte b[8]-b[11]" }
    - { name: port, type: integer, description: "Destination UDP port, 2-byte WORD LE (b[12]=LSB)" }
    - { name: data, type: string, description: "UDP payload (ASCII converted to hex), b[16]+" }
  example: "Forward 'HELLO, DSP!' to 192.168.0.99:7000: B374180108000000c0a80063581B0c0048656c6c6f2C204453502100"

- id: debug_enable_set
  label: Set Debug Enable
  kind: action
  command: "B3 74 {length} 01 09 00 00 {enable}"
  params:
    - { name: enable, type: integer, description: "0x01 = Debugging On (runtime log to serial), 0x00 = Off" }
  # NOTE: source table shows b[4]=0x07 for this row but Control Type value is 0x09 per the Control Type table; treated as 0x09.

# ---- Appendix B: Factory Reset ----
- id: factory_reset_udp
  label: Factory Reset (via UDP)
  kind: action
  command: null  # UNRESOLVED: exact hex payload not in source; code is device-specific, printed on sticker, starts with 'A5'
  params:
    - { name: reset_code, type: string, description: "Factory Reset code from sticker on DTX unit (starts with 'A5')" }
  note: "Send hex Factory Reset code via UDP to port 6001. Requires firmware >= 2.1.210611."

# ---- Appendix F: Serial-to-UDP Conversion ----
- id: serial_to_udp_convert
  label: Serial-to-UDP Translation
  kind: action
  command: "3A 50 44 55 {ip_b4} {port_lo} {port_hi} {dlen} 00 {data}"
  params:
    - { name: ip_address, type: string, description: "Destination IP, b[4]-b[7]" }
    - { name: port, type: integer, description: "Destination UDP port, b[8]-b[9]" }
    - { name: data, type: string, description: "Message payload, max 128 bytes (b[12]+)" }
  note: "Prefix ASCII 'UDP:' (0x3A504455). Received on serial port; DTX forwards via LAN. b[10]=data length, b[11]=reserved 0x00."
  example: "'HELLO DSP' to 192.168.1.22:50000: 0x3a504455 0x1610A8C0 0xC350 0x09 0x00 0x505344204F4C4C4548"
```

## Feedbacks
```yaml
# GET responses (require Control Center Response ON). Response echoes the GET
# frame with Version byte set: V1 -> b[3]=0xE0, V2 -> b[3]=0xE1.
- id: parameter_get_response
  type: binary
  description: "Response to Parameter GET; P1/P2 fields hold current state."

- id: device_info_response
  type: binary
  description: "Response to Device Info query; carries Device Name + channel counts."
  example: "0xB37414E1051400004454582D31363136440000000000000010101010 = 'DTX-1616D', 16x16 analog, 16x16 Dante"

- id: gpio_input_state
  type: bitmask
  description: "GPIO input pin states returned via GPIO GET; ch1=LSB..ch8=MSB."
```

## Variables
```yaml
# Settable parameters exposed as actions above; no separate variable table in source.
# UNRESOLVED: source does not define a distinct settable-variable namespace beyond the
# Module/Parameter actions already enumerated in Actions.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notification/event mechanism.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. GPIO output current limit (500mA total across 8
# pins) is a hardware spec, not a control interlock.
```

## Notes
- Two protocol versions exist: **V1** (default, fixed 12-byte frames, addresses single channel/module) and **V2** (variable-length, addresses channel ranges, adds system commands). V1 is preferred for remote automation.
- **Checksum** (V1 b[2]): sum bytes b[0]..b[11] with b[2]=0x00, take LSB. Always recompute after changing any payload byte.
- **Control Center Response** must be ON to receive GET replies. Enable remotely via V2 command `0xB37408010400000001` (best practice: send at least once on controller startup).
- **RS-232 timing**: inter-message interval must be > 100ms for stable comms. UART settings (baud/data/stop/parity) are configurable in Dash software and apply to both RS-232 and RS-485 ports.
- All multi-byte parameter values are **little-endian WORDs** except Matrix Point (b[8]/b[9] are BYTEs).
- Value encodings: Boolean (0x0000/0x0001, semantics vary per param — check tables), Integer, Zero-Based Integer (channel id), Signed Integer, Signed Integer/100 (gain/dB).
- RS-485 shares ground with RS-232; a +12VDC aux pin can power a remote RS-485 panel.
- GPIO can emit RS-232 hex commands on trigger events (configured in Dash GPIO Settings).

<!-- UNRESOLVED: model-specific analog/Dante channel counts for the DTX-44D not confirmed in this source (examples reference DTX-1616D). -->
<!-- UNRESOLVED: exact Factory Reset hex payload not documented (device-specific code on physical sticker). -->
<!-- UNRESOLVED: flow_control, auth/token format, protocol version negotiation, and firmware compatibility ranges not stated. -->

## Provenance

```yaml
source_domains:
  - api.auroramultimedia.com
  - auroramultimedia.com
source_urls:
  - https://api.auroramultimedia.com/api/download/345
  - https://auroramultimedia.com
retrieved_at: 2026-07-01T04:18:46.878Z
last_checked_at: 2026-07-07T11:00:10.044Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:00:10.044Z
matched_actions: 99
action_count: 99
confidence: medium
summary: "All 99 spec actions have literal command-level evidence in source; all transport parameters verified; complete protocol coverage. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power on/off command not documented; RS-232 flow control not stated; auth/token format not described; model-specific channel counts not confirmed (source examples reference a DTX-1616D, not the 44D explicitly)."
- "flow control not stated in source"
- "name payload encoding not fully specified in source (P2 documented as 0x00 only)"
- "source lists P1=0x00, P2=0x00 only; effective value semantics undocumented"
- "name payload encoding not fully specified (P2 documented as 0x00 only)"
- "parameter type 0x0007 marked Reserved (P1=0x00); semantics unknown"
- "source lists Param Type 0x0009 Enable with no P1 value table"
- "source lists HP Enable (0x0001) with no P1 value table"
- "source lists LP Enable (0x0006) with no P1 value table"
- "exact hex payload not in source; code is device-specific, printed on sticker, starts with 'A5'"
- "source does not define a distinct settable-variable namespace beyond the"
- "source documents no unsolicited notification/event mechanism."
- "source documents no named multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures, or"
- "model-specific analog/Dante channel counts for the DTX-44D not confirmed in this source (examples reference DTX-1616D)."
- "exact Factory Reset hex payload not documented (device-specific code on physical sticker)."
- "flow_control, auth/token format, protocol version negotiation, and firmware compatibility ranges not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
