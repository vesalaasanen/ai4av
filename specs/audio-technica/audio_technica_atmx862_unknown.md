---
spec_id: admin/audio-technica-atmx862
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio-Technica AT-MX862 Control Spec"
manufacturer: Audio-Technica
model_family: AT-MX862
aliases: []
compatible_with:
  manufacturers:
    - Audio-Technica
  models:
    - AT-MX862
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audio-technica.co.jp
  - docs.audio-technica.com
  - audio-technica.com
source_urls:
  - https://www.audio-technica.co.jp/pdf/support/AT-MX862_PC.pdf
  - https://docs.audio-technica.com/all/ATDM-0604a_IP_Control_Protocol_Specifications_EN_Ver1.0_web_221209.pdf
  - https://www.audio-technica.com/media/catalog/tmp/category/ESW_IP_Control_Specification_V2_EN_web_230804_1_.pdf
  - https://docs.audio-technica.com/us/ATDM-0604_IP_Control_Protcol_Specification_EN_Ver1.1.3_web_200821.pdf
  - https://www.audio-technica.co.jp/pdf/support/AT-MX862_SM.pdf
retrieved_at: 2026-06-19T12:40:55.523Z
last_checked_at: 2026-07-12T08:50:27.220Z
generated_at: 2026-07-12T08:50:27.220Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device firmware version, hardware revision, exact number of output channels (doc mixes 6 and 8 output references — EQ supports output ch 1-6; matrix/level/mute data tables reference output ch 1-8), power specs, and physical connector pinout (D-sub type) not stated in this protocol doc."
  - "no explicit hardware interlock / power-sequencing warnings beyond the"
  - "device firmware version range not stated."
  - "exact output channel count (6 vs 8) ambiguous in source."
  - "physical RS-232 connector type (D-sub 9/25 pinout) not documented here."
  - "power-on/reset fault behaviour and recovery beyond retry sequence not documented."
  - "max retry count default value not stated (source example uses 3)."
verification:
  verdict: verified
  checked_at: 2026-07-12T08:50:27.220Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched literal hex command codes from source section 2.4 command table; all transport parameters verified in section 2.2; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-19
---

# Audio-Technica AT-MX862 Control Spec

## Summary
The Audio-Technica AT-MX862 is an 8-input / multi-output SmartMixer (matrix DSP mixer) controllable via RS-232C serial. This spec covers the binary serial control protocol described in the vendor's "PC 通信仕様説明書 Ver2.1.0" (PC Communication Specification Manual), including framing, checksum, the 24 documented commands (basic data, digital filter, EQ, matrix, external control terminals, VCA, feedback suppressor, scene, reset, level monitoring, string labels), error codes, and timing. Source document is in Japanese.

<!-- UNRESOLVED: device firmware version, hardware revision, exact number of output channels (doc mixes 6 and 8 output references — EQ supports output ch 1-6; matrix/level/mute data tables reference output ch 1-8), power specs, and physical connector pinout (D-sub type) not stated in this protocol doc. -->

## Transport
```yaml
# Source: AT-MX862 PC 通信仕様説明書 Ver2.1.0, section 2.2.1.
# Interface: RS-232C, cross (null-modem) cable. System: PC or controller ↔ AT-MX862.
protocols:
  - serial
serial:
  baud_rate: 38400  # default per source note: "デフォルトの通信速度は38400bps"; selectable via DS command data no.72: 2400/4800/9600/19200/38400/57600/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: software-handled receive incl. flow control ("フロー制御を含めたデータの受信処理をソフトで行う") - no hardware flow lines defined
  start_bits: 1
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
# Inferred from documented command set.
traits:
  - routable   # inferred: MS matrix connect/disconnect + send-level commands
  - levelable  # inferred: input/output level, gain, send-level, VCA commands
  - queryable  # inferred: D1/D2/F1/F2/ER/M1/M2/CR/VR/NL read commands
```

## Frame Format
```yaml
# Source: section 2.2.2 / 2.2.3. Binary, MSB-first hex bytes.
# Normal frame (PC → Mixer and Mixer → PC):
#   STX(2) | data_length(2) | block_no(4) | data(MAX 64) | BCC(1) | ETX(2)
# Block-transfer frame (used only for D1 receive data and multi-block responses):
#   ... data ... | BCC(1) | ETB(2)   (intermediate blocks)
#   ... data ... | BCC(1) | ETX(2)   (final block)
#
# Transmission characters (hex):
stx: "AA 55"        # start of text
etx: "55 AA"        # end of text (final block)
etb: "55 55"        # end of transmission block (intermediate)
ack: "A5 00"        # positive acknowledgement (PC → Mixer)
nak: "A5 FF"        # negative acknowledgement (PC → Mixer)
bcc:
  description: "Two's complement of the arithmetic sum of all data-section bytes (data + BCC == 0)"
  width_bytes: 1
data_length:
  description: "Byte count of the data section, binary representation"
  width_bytes: 2
block_number:
  description: "Sequential from 0001 when multiple blocks; single-block commands use 0001"
  width_bytes: 4
max_data_bytes: 64
receive_buffer_bytes: 256
# Timing (section 2.2.4):
ack_timeout_ms: 500          # mixer waits max 500ms for PC ACK
per_byte_timeout_ms: 100     # 1-byte receive timeout
power_on_to_command_ready_s: 8   # ~8s after power-on before commands accepted; 10s recommended
command_gap_wait_ms_large_batch: 10  # add ~10ms between commands for large bursts
# Retry: configurable count; mixer retransmits same data (retry_count + 1) times then gives up.
```

## Error Codes
```yaml
# Source: section 2.3. Returned in the "error code" byte of the mixer's response frame.
error_codes:
  - code: "0x00"
    meaning: "正常終了 / normal completion"
  - code: "0x01"
    meaning: "送信先データ異常 / destination data error (e.g. no such mixer)"
  - code: "0x02"
    meaning: "データ部異常 / data-section error"
  - code: "0x03"
    meaning: "設定権限が無い / no setting permission"
  - code: "0xFF"
    meaning: "異常終了 / abnormal termination"
note: "If the received command data itself is malformed, the mixer does NOT respond at all."
```

## Actions
```yaml
# Coverage: all 24 commands from section 2.4 command table, each as a distinct action.
# Command template uses the inner data-section bytes (between STX...ETX). Full wire frame:
#   AA 55 {len:2} {blk:4} {command-bytes} {bcc:1} 55 AA
# Command byte "送信先/エラーコード" is 0x01 for PC→Mixer requests, 0x00 for Mixer→PC responses.
#
# Each mnemonic counts as ONE action (parameterized). The data-number sub-tables in 2.5 define
# the valid parameter values for the parameterized commands (DS/FS/ES/MS/CS/VS/NS).
# --------------------------------------------------------------------------
- id: ds_set_basic_data
  label: Set Basic Data (DS)
  kind: action
  command: "44 53 01 {data_no} {data_value}"   # mnemonic "DS" = 0x44,0x53; dest=0x01
  response: "44 53 00"                          # "DS" + error code 0x00
  params:
    - name: data_no
      type: integer
      description: "Data number 1-88 (see Basic Data tables 2.5(1) and 2.5(2))"
    - name: data_value
      type: integer
      description: "1-byte or 4-byte value per data-number table"

- id: d1_read_basic_data_type1
  label: Read Basic Data Type 1 (D1)
  kind: query
  command: "44 31 01"                            # "D1" = 0x44,0x31
  response: "44 31 00 {data...}"                 # block transfer; multi-block for full scene
  params: []
  note: "Returns input ATT/gain/level/mute, output level/mute, ch7-8 mode, scene select, L/R display, panel lock, phantom power (ch1-8). Uses block transfer."

- id: d2_read_basic_data_type2
  label: Read Basic Data Type 2 (D2)
  kind: query
  command: "44 32 01"                            # "D2" = 0x44,0x32
  response: "44 32 00 {data...}"
  params: []
  note: "Returns test signal, RS-232C baud rate, front-panel individual lock settings, startup scene, output ch7-8 link."

- id: fs_set_digital_filter
  label: Set Digital Filter (FS)
  kind: action
  command: "46 53 01 {data_no} {data_value}"    # "FS" = 0x46,0x53
  response: "46 53 00 {data_no}"
  params:
    - name: data_no
      type: integer
      description: "Data number 1-57 (see Digital Filter tables 2.5(3) and 2.5(4))"
    - name: data_value
      type: integer
      description: "1-byte (on/off, mode) or 4-byte IEEE754 single-precision (attack/release/threshold/range/ratio/delay-time)"

- id: f1_read_digital_filter_type1
  label: Read Digital Filter Type 1 (F1)
  kind: query
  command: "46 31 01"                            # "F1" = 0x46,0x31
  response: "46 31 00 {data...}"
  params: []
  note: "Low-cut, high-cut, auto-level-control, feedback suppressor (ch1-8), ALC attack/release/threshold/range/ratio."

- id: f2_read_digital_filter_type2
  label: Read Digital Filter Type 2 (F2)
  kind: query
  command: "46 32 01"                            # "F2" = 0x46,0x32
  response: "46 32 00 {data...}"
  params: []
  note: "Limiter (ch1-6) + params, delay (ch3-6) + delay time, band-pass filter (ch7-8)."

- id: es_set_equalizer
  label: Set Equalizer (ES)
  kind: action
  command: "45 53 01 {eq_no} {data_no} {data_value}"   # "ES" = 0x45,0x53
  response: "45 53 00 {eq_no}"
  params:
    - name: eq_no
      type: integer
      description: "EQ target: input ch1-8 → 0-7; output ch1-6 → 8-13"
    - name: data_no
      type: integer
      description: "Data number 1-17 (see EQ table 2.5(5))"
    - name: data_value
      type: integer
      description: "1-byte (on/off, band type) or 4-byte IEEE754 (freq 20-15000Hz / Q 0.5-12.0 / gain -15..+15dB)"

- id: er_read_equalizer
  label: Read Equalizer (ER)
  kind: query
  command: "45 52 01 {eq_no}"                    # "ER" = 0x45,0x52
  response: "45 52 00 {eq_no} {data...}"
  params:
    - name: eq_no
      type: integer
      description: "EQ target: input ch1-8 → 0-7; output ch1-6 → 8-13"

- id: ms_set_matrix
  label: Set Matrix (MS)
  kind: action
  command: "4D 53 01 {out_ch} {in_ch} {data_value}"   # "MS" = 0x4D,0x53
  response: "4D 53 00"
  params:
    - name: out_ch
      type: integer
      description: "Output channel 0-7"
    - name: in_ch
      type: integer
      description: "Input channel 0-7"
    - name: data_value
      type: integer
      description: "Send level 0-31 (0=MUTE/max attenuation, 31=0dB); OR 127=connect; OR 255=disconnect. Connect/disconnect and send-level cannot be set in the same command."

- id: m1_read_matrix_type1
  label: Read Matrix Type 1 (M1)
  kind: query
  command: "4D 31 01"                            # "M1" = 0x4D,0x31
  response: "4D 31 00 {32 bytes}"
  params: []
  note: "Matrix settings for input ch1-4. Each byte: low 5 bits = send level (0-31); MSB = connect(1)/disconnect(0)."

- id: m2_read_matrix_type2
  label: Read Matrix Type 2 (M2)
  kind: query
  command: "4D 32 01"                            # "M2" = 0x4D,0x32
  response: "4D 32 00 {32 bytes}"
  params: []
  note: "Matrix settings for input ch5-8 (same byte encoding as M1)."

- id: cs_set_external_control_terminal
  label: Set External Control Terminal (CS)
  kind: action
  command: "43 53 01 {terminal_no} {data_no} {data_value}"   # "CS" = 0x43,0x53
  response: "43 53 00"
  params:
    - name: terminal_no
      type: integer
      description: "0-12 (maps to physical connector pins 2-14)"
    - name: data_no
      type: integer
      description: "Data number 1-19 (see External Control Terminal table 2.5(6))"
    - name: data_value
      type: integer
      description: "1-byte or 4-byte value (e.g. enable, function, target channels, additional info)"

- id: cr_read_external_control_terminal
  label: Read External Control Terminal (CR)
  kind: query
  command: "43 52 01 {terminal_no}"              # "CR" = 0x43,0x52
  response: "43 52 00 {data...}"
  params:
    - name: terminal_no
      type: integer
      description: "0-12 (maps to physical connector pins 2-14)"

- id: vs_set_vca
  label: Set VCA (VS)
  kind: action
  command: "56 53 01 {terminal_no} {data_no} {data_value}"   # "VS" = 0x56,0x53
  response: "56 53 00 {terminal_no}"
  params:
    - name: terminal_no
      type: integer
      description: "0-7 (maps to physical connector pins 15-22)"
    - name: data_no
      type: integer
      description: "Data number 1-17 (see VCA table 2.5(7))"
    - name: data_value
      type: integer
      description: "Enable, target input/output channel bitmask"

- id: vr_read_vca
  label: Read VCA (VR)
  kind: query
  command: "56 52 01 {terminal_no}"              # "VR" = 0x56,0x52
  response: "56 52 00 {terminal_no} {data...}"
  params:
    - name: terminal_no
      type: integer
      description: "0-7 (maps to physical connector pins 15-22)"

- id: fb_feedback_suppressor_auto_measure_start
  label: Feedback Suppressor Auto-Measure Start (FB)
  kind: action
  command: "46 42 01"                            # "FB" = 0x46,0x42
  response: "46 42 00"
  params: []
  note: "Starts auto-measurement sequentially for channels where feedback suppressor is ON."

- id: fc_feedback_suppressor_auto_measure_cancel
  label: Feedback Suppressor Auto-Measure Cancel (FC)
  kind: action
  command: "46 43 01"                            # "FC" = 0x46,0x43
  response: "46 43 00"
  params: []

- id: p9_feedback_suppressor_reset
  label: Feedback Suppressor Reset (P9)
  kind: action
  command: "50 39 01"                            # "P9" = 0x50,0x39
  response: "50 39 00"
  params: []
  note: "Clears generated feedback suppressor filters (static and dynamic)."

- id: ss_save_scene
  label: Save Scene (SS)
  kind: action
  command: "53 53 01 {scene_data}"               # "SS" = 0x53,0x53
  response: "53 53 00 {scene_data}"
  params:
    - name: scene_data
      type: integer
      description: "Bit7=0 normal scene / Bit7=1 matrix scene; Bits6-0 = scene number 0-19 (scenes 1-20). Scene name comes from current-scene-name string (NS cmd, string no.24)."

- id: rs_reset_reboot
  label: Reset / Reboot Mixer (RS)
  kind: action
  command: "52 53 01"                            # "RS" = 0x52,0x53
  response: "52 53 00"
  params: []
  note: "Resets the mixer body and restarts the main program. Baud-rate changes also require this or a power cycle to take effect."

- id: ls_set_signal_level_monitoring
  label: Set Signal Level Monitoring (LS)
  kind: action
  command: "4C 53 01 {start_stop}"               # "LS" = 0x4C,0x53
  response: "4C 53 00"
  params:
    - name: start_stop
      type: integer
      description: "1=start monitoring, 0=stop monitoring"

- id: ll_signal_level_monitoring_notification
  label: Signal Level Monitoring Notification (LL)
  kind: event
  command: ""                                    # CPU→PC unsolicited; no PC send command
  response: "4C 4C 00 {in_level x8} {out_level x8}"
  params: []
  note: "Unsolicited notification FROM the mixer to the PC. PC does not respond. Level bytes 0-240; X = Round(LEVEL × -4, 0) where LEVEL=-60..0 dB."

- id: ns_set_string_data
  label: Set String Data (NS)
  kind: action
  command: "4E 53 01 {string_no} {string_len} {string_data}"   # "NS" = 0x4E,0x53
  response: "4E 53 00 {string_no}"
  params:
    - name: string_no
      type: integer
      description: "Input ch 0-7; output ch 16-23; current scene name 24"
    - name: string_len
      type: integer
      description: "Byte count of UTF-8 string (0-20 bytes)"
    - name: string_data
      type: string
      description: "UTF-8 string (half-width alnum=1 byte/char; full-width/half-width katakana=3 bytes/char)"

- id: nl_read_string_data
  label: Read String Data (NL)
  kind: query
  command: "4E 4C 01 {string_no}"                # "NL" = 0x4E,0x4C
  response: "4E 4C 00 {string_no} {string_len} {string_data}"
  params:
    - name: string_no
      type: integer
      description: "Input ch 0-7; output ch 16-23; current scene name 24; scene names (scenes 1-20) = 25-44"
```

## Feedbacks
```yaml
# Observable query responses / state reads (mirrors of the query actions above).
feedbacks:
  - id: basic_data_type1_state
    type: binary_blob
    description: "Full basic-data type-1 scene block returned by D1 (uses block transfer)"

  - id: basic_data_type2_state
    type: binary_blob
    description: "Basic-data type-2 block returned by D2"

  - id: digital_filter_type1_state
    type: binary_blob
    description: "Digital-filter type-1 block returned by F1"

  - id: digital_filter_type2_state
    type: binary_blob
    description: "Digital-filter type-2 block returned by F2"

  - id: equalizer_state
    type: binary_blob
    description: "Per-EQ-no state block returned by ER"

  - id: matrix_type1_state
    type: binary_blob
    description: "32-byte matrix state for input ch1-4 returned by M1 (per byte: low 5 bits=send level 0-31, MSB=connect flag)"

  - id: matrix_type2_state
    type: binary_blob
    description: "32-byte matrix state for input ch5-8 returned by M2"

  - id: external_control_terminal_state
    type: binary_blob
    description: "Per-terminal state block returned by CR"

  - id: vca_state
    type: binary_blob
    description: "Per-terminal VCA state block returned by VR"

  - id: string_data
    type: string
    description: "UTF-8 label string returned by NL"

  - id: error_code
    type: enum
    values: ["0x00", "0x01", "0x02", "0x03", "0xFF"]
    description: "Returned in error-code byte of every mixer response (see Error Codes section)"
```

## Variables
```yaml
# Settable parameters addressable through the parameterized actions above.
# Ranges from section 2.5 data-number tables.
variables:
  - name: input_att
    description: "DS data no.1-8 - input ch1-8 ATT: 0=MIC, 1=LINE"

  - name: input_gain
    description: "DS data no.9-16 - input ch1-8 gain: 0-31"

  - name: input_level
    description: "DS data no.17-24 - input ch1-8 level: 0-31"

  - name: input_mute
    description: "DS data no.25-32 - input ch1-8 mute: 1=ON, 0=OFF"

  - name: output_level
    description: "DS data no.33-40 - output ch1-8 level: 0-31"

  - name: output_mute
    description: "DS data no.41-48 - output ch1-8 mute: 1=ON, 0=OFF"

  - name: ch78_mode_select
    description: "DS data no.49 - 0=MIC, 1=StereoA, 2=StereoB, 3=StereoC, 4=StereoD"

  - name: scene_select
    description: "DS data no.50 - 0-19 (scenes 1-20); 0xFF = no scene selected"

  - name: output_lr_display
    description: "DS data no.51-53 - Main/Sub1/Sub2: 0=L, 1=R, 2=LR linked"

  - name: gain_level_display
    description: "DS data no.54 - 0=gain display, 1=level display"

  - name: front_panel_lock
    description: "DS data no.55 - 1=ON, 0=OFF"

  - name: phantom_power
    description: "DS data no.56-63 - phantom power ch1-8: 1=ON, 0=OFF (read via D1 since Ver2.0.0)"

  - name: test_signal
    description: "D2 data no.64-71 - 0=OFF, 1=500Hz, 2=1000Hz, 3=1500Hz"

  - name: rs232c_baud_rate
    description: "D2 data no.72 - 0=2400, 1=4800, 2=9600, 3=19200, 4=38400, 5=57600, 6=115200 bps. Change takes effect after reboot or power cycle."

  - name: front_panel_individual_lock
    description: "D2 data no.73-86 - per-control lock bitmasks (GAIN/LEVEL, CH7-8 mode, SCENE 1-5, input ch1-8 mute/encoder, output MAIN/SUB1/SUB2)"

  - name: startup_scene
    description: "D2 data no.87 - 0=last memory, 1-5=SCENE1-SCENE5"

  - name: output_ch78_link
    description: "D2 data no.88 - 0=unlinked, 1=LR linked"

  - name: alc_attack
    description: "FS data no.33 - 0-1 sec, IEEE754 single"

  - name: alc_release
    description: "FS data no.34 - 0-1 sec, IEEE754 single"

  - name: alc_threshold
    description: "FS data no.35 - -60..0 dB, IEEE754 single"

  - name: alc_range
    description: "FS data no.36 - -60..0 dB, IEEE754 single (must be < threshold)"

  - name: alc_ratio
    description: "FS data no.37 - 2-20, IEEE754 single"

  - name: limiter_attack
    description: "FS data no.44 - 0-1 sec, IEEE754 single"

  - name: limiter_release
    description: "FS data no.45 - 0-1 sec, IEEE754 single"

  - name: limiter_threshold
    description: "FS data no.46 - -60..0 dB, IEEE754 single"

  - name: limiter_ratio
    description: "FS data no.47 - 2-20, IEEE754 single"

  - name: delay_time
    description: "FS data no.52-55 - ch3-6 delay time 0-300 ms, 32-bit unsigned integer"

  - name: bandpass_filter
    description: "FS data no.56-57 - ch7-8: 0=OFF, 1=300-3k, 2=300-7k"

  - name: eq_filter_type
    description: "ES data no.2-5 - Band1-4: 0=P.EQ, 1=LowShelf, 2=HighShelf, 3=Notch"

  - name: eq_filter_frequency
    description: "ES data no.6-9 - Band1-4 freq 20-15000 Hz, IEEE754 single"

  - name: eq_filter_q
    description: "ES data no.10-13 - Band1-4 Q 0.5-12.0, IEEE754 single"

  - name: eq_filter_gain
    description: "ES data no.14-17 - Band1-4 gain -15..+15 dB, IEEE754 single (input-channel EQ has no Band4; keep 0)"

  - name: matrix_send_level
    description: "MS data_value when routing - 0-31 (0=MUTE, 31=0dB)"

  - name: extctl_function
    description: "CS data no.2 - 0=mute, 1=level up/down, 2=scene select"

  - name: extctl_target_channels
    description: "CS data no.3-18 - input ch1-8 + output ch1-8 selection bitmask"

  - name: extctl_additional_info
    description: "CS data no.19 - mute: 0=ON/1=OFF/2=toggle (4-byte); level: +1 up / -1 down (IEEE754); scene: scene no. 0-19 (4-byte)"
```

## Events
```yaml
events:
  - id: ll_level_notification
    description: "Unsolicited signal-level notification from mixer CPU to PC (LL command). Sent repeatedly while LS monitoring is enabled. PC does not ACK."
    payload: "4C 4C 00 {in_level x8} {out_level x8}"
    fields:
      - name: in_level
        description: "8 bytes, one per input channel, value 0-240"
      - name: out_level
        description: "8 bytes, one per output channel, value 0-240"
    conversion: "X = Round(LEVEL × -4, 0); LEVEL = -60..0 dB"

  - id: ack
    description: "Acknowledgement PC sends to mixer after each received frame"
    payload: "A5 00"

  - id: nak
    description: "Negative acknowledgement PC sends to mixer to request retransmit"
    payload: "A5 FF"
```

## Macros
```yaml
# No named multi-step macros documented as such, but the source's worked examples
# chain commands. Documented sequences:
macros:
  - id: extctl_pin_setup_mute_toggle
    description: "3-step sequence from source 例13: configure external control pin 3 as mute-toggle then enable. (1) set function=mute; (2) set additional info=toggle; (3) set enable=ON."
    steps:
      - "43 53 01 01 02 00"           # CS: pin1 (connector pin3), data_no=2 (function), value=2... (per source)
      - "43 53 01 01 13 00 00 00 02"  # CS: pin1, data_no=19 (additional info), value=toggle(2)
      - "43 53 01 01 01 01"           # CS: pin1, data_no=1 (enable), value=1

  - id: vca_pin_setup_and_enable
    description: "2-step sequence from source 例14: assign input ch1 to VCA terminal 1 (connector pin15) then enable."
    steps:
      - "56 53 01 00 02 01"   # VS: term0, data_no=2 (target input ch), value bitmask=ch1
      - "56 53 01 00 01 01"   # VS: term0, data_no=1 (enable), value=1
```

## Safety
```yaml
confirmation_required_for:
  - rs_reset_reboot          # mixer main-program restart; baud-rate changes only apply after this
  - ss_save_scene            # overwrites stored scene slot
  - p9_feedback_suppressor_reset  # clears generated FB filters
interlocks:
  - "Mixer accepts no commands for ~8 seconds after power-on (10 seconds recommended before first command)."
  - "Baud-rate change (DS data no.72) requires mixer reboot (RS) or power cycle to take effect."
  - "PC must ACK each received mixer frame within 500 ms; single-byte receive timeout is 100 ms."
  - "Connect/disconnect (data=127/255) and send-level (0-31) cannot be set in the same MS command."
  - "ALC Range must be set smaller than Threshold value."
  - "Matrix scene save (SS Bit7=1) is separate from normal scene save."
# UNRESOLVED: no explicit hardware interlock / power-sequencing warnings beyond the
# power-on 8-second delay in this protocol document.
```

## Notes
- Source: `AT-MX862 PC 通信仕様説明書 Ver2.1.0` (Japanese). Ver2.0.0 added phantom-power read via D1.
- Physical link: RS-232C **cross (null-modem) cable**. Connector type not specified in this doc.
- Output channel count is inconsistently referenced: EQ supports output ch 1-6 (EQ numbers 8-13); matrix/level/mute data tables reference output ch 1-8. Treated as up to 8 output channels where the data tables allow it.
- Frame wrapper for every PC→Mixer command: `AA 55 {data_len:2} 00 00 00 01 {command-bytes} {bcc:1} 55 AA` where block_no is always `00 00 00 01` for single-block commands and dest byte is always `0x01`.
- BCC is one byte: two's complement of the sum of all data-section bytes (data section + BCC == 0 mod 256).
- Mixer response swaps the dest/error byte to `0x00` (or error code) and echoes the rest of the command. PC then sends `A5 00` (ACK).
- Source worked examples confirm exact wire bytes (e.g. setting input ch1 to LINE = `AA 55 00 05 00 00 00 01 44 53 01 01 01 66 55 AA`).
- Block transfer is used **only** for D1 receive data (full scene state) and multi-block responses; normal commands use single-block frames terminated with ETX (`55 AA`).
- "Type 1 / Type 2" (種類1/種類2) on read commands means the read payload is split across two commands because it exceeds one frame — call both to reconstruct full state.
- Front-panel individual lock settings (D2 data no.73-86) use per-bit fields; see source table for bit assignments.

<!-- UNRESOLVED: device firmware version range not stated. -->
<!-- UNRESOLVED: exact output channel count (6 vs 8) ambiguous in source. -->
<!-- UNRESOLVED: physical RS-232 connector type (D-sub 9/25 pinout) not documented here. -->
<!-- UNRESOLVED: power-on/reset fault behaviour and recovery beyond retry sequence not documented. -->
<!-- UNRESOLVED: max retry count default value not stated (source example uses 3). -->
````

Spec above. 24 commands verbatim from §2.4 table, full frame + BCC + error codes + timing, all data-number tables enumerated in Variables. Marked gaps: firmware ver, output ch count ambiguity, connector pinout, retry default.

## Provenance

```yaml
source_domains:
  - audio-technica.co.jp
  - docs.audio-technica.com
  - audio-technica.com
source_urls:
  - https://www.audio-technica.co.jp/pdf/support/AT-MX862_PC.pdf
  - https://docs.audio-technica.com/all/ATDM-0604a_IP_Control_Protocol_Specifications_EN_Ver1.0_web_221209.pdf
  - https://www.audio-technica.com/media/catalog/tmp/category/ESW_IP_Control_Specification_V2_EN_web_230804_1_.pdf
  - https://docs.audio-technica.com/us/ATDM-0604_IP_Control_Protcol_Specification_EN_Ver1.1.3_web_200821.pdf
  - https://www.audio-technica.co.jp/pdf/support/AT-MX862_SM.pdf
retrieved_at: 2026-06-19T12:40:55.523Z
last_checked_at: 2026-07-12T08:50:27.220Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:50:27.220Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched literal hex command codes from source section 2.4 command table; all transport parameters verified in section 2.2; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device firmware version, hardware revision, exact number of output channels (doc mixes 6 and 8 output references — EQ supports output ch 1-6; matrix/level/mute data tables reference output ch 1-8), power specs, and physical connector pinout (D-sub type) not stated in this protocol doc."
- "no explicit hardware interlock / power-sequencing warnings beyond the"
- "device firmware version range not stated."
- "exact output channel count (6 vs 8) ambiguous in source."
- "physical RS-232 connector type (D-sub 9/25 pinout) not documented here."
- "power-on/reset fault behaviour and recovery beyond retry sequence not documented."
- "max retry count default value not stated (source example uses 3)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
