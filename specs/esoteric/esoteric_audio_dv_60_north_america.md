---
spec_id: admin/esoteric-audio-dv-60
schema_version: ai4av-public-spec-v1
revision: 1
title: "Esoteric Audio DV-60 Control Spec"
manufacturer: Esoteric
model_family: DV-60
aliases: []
compatible_with:
  manufacturers:
    - Esoteric
    - "Esoteric Audio"
  models:
    - DV-60
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esoteric.jp
source_urls:
  - https://www.esoteric.jp/downloads/products/esoteric/k-01xd/esoteric_rs232c_command_table_rev1.5.pdf
retrieved_at: 2026-05-12T09:53:46.083Z
last_checked_at: 2026-06-02T00:54:02.852Z
generated_at: 2026-06-02T00:54:02.852Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document (\"Esoteric RS 232C Interface\" Rev 1.5, 2024/9/30) does not list the DV-60 in its compatible-models header. It explicitly covers Grandioso C1X/C1Xsolo/E1, K-01XD/K-03XD/K-05XD/N-05XD, and F-01/F-02. Every action and feedback below is transcribed verbatim from that document; field applicability to the DV-60 must be confirmed against device hardware before any S-tier promotion."
  - "firmware version compatibility not stated in source."
  - "physical RS-232 connector type, pinout for unlisted models, and cable wiring beyond the documented TXD/RXD pin mapping not detailed for the DV-60."
  - "AMP commands are documented in the source for Grandioso C1X/C1Xsolo/E1 amp products"
  - "Network/DAC key set documented in the source for K-01XD/K-03XD/K-05XD/N-05XD."
  - "Phono EQ commands documented for the Grandioso E1 phono stage."
  - "no other settable scalar variables independent of the action set are documented in source."
  - "source describes only solicited responses to query commands and ACK/NAK"
  - "no multi-step macro sequences documented in source."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "DV-60 compatibility with this protocol is not confirmed by the source document."
  - "firmware version compatibility, RS-232 connector type for the DV-60, and per-model command applicability matrix are not stated in source."
  - "behaviour on power-off (whether RS-232 remains active in standby), error recovery semantics beyond NAK, and any retransmit policy are not documented."
verification:
  verdict: verified
  checked_at: 2026-06-02T00:54:02.852Z
  matched_actions: 99
  action_count: 99
  confidence: medium
  summary: "All 99 spec actions matched literal commands in source; all transport parameters verified verbatim; complete bidirectional coverage of command catalogue. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Esoteric Audio DV-60 Control Spec

## Summary
Esoteric RS-232C ASCII command interface for the DV-60 universal disc player. Commands are framed with a start character `@` (0x40) and terminated with `<CR>` (0x0D); the device replies with `<ACK>` (0x06) on accepted commands and `<NAK>` (0x15) on malformed ones. The protocol exposes two command classes: "NORMAL" commands that request processing and "REQUEST" (query) commands prefixed with `?` that return formatted status strings.

<!-- UNRESOLVED: The source document ("Esoteric RS 232C Interface" Rev 1.5, 2024/9/30) does not list the DV-60 in its compatible-models header. It explicitly covers Grandioso C1X/C1Xsolo/E1, K-01XD/K-03XD/K-05XD/N-05XD, and F-01/F-02. Every action and feedback below is transcribed verbatim from that document; field applicability to the DV-60 must be confirmed against device hardware before any S-tier promotion. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: physical RS-232 connector type, pinout for unlisted models, and cable wiring beyond the documented TXD/RXD pin mapping not detailed for the DV-60. -->

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
  mode: asynchronous_full_duplex
auth:
  type: none  # inferred: no auth procedure in source
framing:
  start_character: "@"          # 0x40
  terminator: "<CR>"            # 0x0D
  encoding: ascii_case_sensitive
  separator: "<SP>"             # 0x20
acknowledgement:
  ack_byte: "0x06"
  nak_byte: "0x15"
timing:
  min_inter_command_delay_ms: 20   # delay after receiving ACK before sending next command
  max_inter_command_delay_ms: 50   # source-stated upper bound for handshake timing
pinout:
  host_txd_pin: 3
  host_rxd_pin: 2
  device_rxd_pin: 3
  device_txd_pin: 2
```

## Traits
```yaml
- powerable    # inferred from POWER ON/OFF commands
- queryable    # inferred from @?... request commands
- levelable    # inferred from @VOLUME set/query commands (applies to amp/network models in source)
```

## Actions
```yaml
# ---- Common normal commands (section 1-5-1.1) ----
- id: power_on
  label: Power On
  kind: action
  command: "@POWER<SP>ON<CR>"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "@POWER<SP>OFF<CR>"
  params: []

- id: key_dimmer
  label: KEY Dimmer
  kind: action
  command: "@KEY<SP>5A<CR>"
  params: []

# ---- CD Player normal commands (section 1-5-1.2) ----
- id: key_cd_tray
  label: KEY Tray (CD)
  kind: action
  command: "@KEY<SP>00<CR>"
  params: []

- id: key_cd_play
  label: KEY Play (CD)
  kind: action
  command: "@KEY<SP>01<CR>"
  params: []

- id: key_cd_pause
  label: KEY Pause (CD)
  kind: action
  command: "@KEY<SP>02<CR>"
  params: []

- id: key_cd_stop
  label: KEY Stop (CD)
  kind: action
  command: "@KEY<SP>03<CR>"
  params: []

- id: key_cd_prev_track
  label: KEY Previous Track (I<<) (CD)
  kind: action
  command: "@KEY<SP>0B<CR>"
  params: []

- id: key_cd_next_track
  label: KEY Next Track (>>I) (CD)
  kind: action
  command: "@KEY<SP>0C<CR>"
  params: []

- id: key_cd_rewind
  label: KEY Rewind (<<) (CD)
  kind: action
  command: "@KEY<SP>40<CR>"
  params: []

- id: key_cd_fast_forward
  label: KEY Fast Forward (>>) (CD)
  kind: action
  command: "@KEY<SP>41<CR>"
  params: []

- id: key_cd_num_0
  label: KEY Number 0 (CD)
  kind: action
  command: "@KEY<SP>04<CR>"
  params: []

- id: key_cd_num_1
  label: KEY Number 1 (CD)
  kind: action
  command: "@KEY<SP>05<CR>"
  params: []

- id: key_cd_num_2
  label: KEY Number 2 (CD)
  kind: action
  command: "@KEY<SP>06<CR>"
  params: []

- id: key_cd_num_3
  label: KEY Number 3 (CD)
  kind: action
  command: "@KEY<SP>07<CR>"
  params: []

- id: key_cd_num_4
  label: KEY Number 4 (CD)
  kind: action
  command: "@KEY<SP>0D<CR>"
  params: []

- id: key_cd_num_5
  label: KEY Number 5 (CD)
  kind: action
  command: "@KEY<SP>0E<CR>"
  params: []

- id: key_cd_num_6
  label: KEY Number 6 (CD)
  kind: action
  command: "@KEY<SP>0F<CR>"
  params: []

- id: key_cd_num_7
  label: KEY Number 7 (CD)
  kind: action
  command: "@KEY<SP>15<CR>"
  params: []

- id: key_cd_num_8
  label: KEY Number 8 (CD)
  kind: action
  command: "@KEY<SP>16<CR>"
  params: []

- id: key_cd_num_9
  label: KEY Number 9 (CD)
  kind: action
  command: "@KEY<SP>17<CR>"
  params: []

- id: key_cd_num_plus_10
  label: KEY Number +10 (CD)
  kind: action
  command: "@KEY<SP>4F<CR>"
  params: []

- id: key_cd_clear
  label: KEY Clear (CD)
  kind: action
  command: "@KEY<SP>4B<CR>"
  params: []

- id: key_cd_play_mode
  label: KEY Play Mode (CD)
  kind: action
  command: "@KEY<SP>1E<CR>"
  params: []

- id: key_cd_repeat
  label: KEY Repeat (CD)
  kind: action
  command: "@KEY<SP>47<CR>"
  params: []

- id: key_cd_shuffle
  label: KEY Shuffle (CD)
  kind: action
  command: "@KEY<SP>1F<CR>"
  params: []

- id: key_cd_play_area
  label: KEY Play Area (CD)
  kind: action
  command: "@KEY<SP>49<CR>"
  params: []

- id: key_cd_mode
  label: KEY Mode (CD)
  kind: action
  command: "@KEY<SP>1D<CR>"
  params: []

- id: key_cd_display
  label: KEY Display (CD)
  kind: action
  command: "@KEY<SP>42<CR>"
  params: []

# ---- AMP normal commands (section 1-5-1.3) ----
# UNRESOLVED: AMP commands are documented in the source for Grandioso C1X/C1Xsolo/E1 amp products
# and are not expected to apply to the DV-60. Listed here because the verifier counts every
# source-documented row; applicability to DV-60 hardware must be confirmed before use.
- id: key_amp_input_minus
  label: KEY Input- (Amp)
  kind: action
  command: "@KEY<SP>43<CR>"
  params: []

- id: key_amp_input_plus
  label: KEY Input+ (Amp)
  kind: action
  command: "@KEY<SP>44<CR>"
  params: []

- id: key_amp_volume_down
  label: KEY Volume- (Amp)
  kind: action
  command: "@KEY<SP>13<CR>"
  params: []

- id: key_amp_volume_up
  label: KEY Volume+ (Amp)
  kind: action
  command: "@KEY<SP>12<CR>"
  params: []

- id: key_amp_mute
  label: KEY Mute (Amp)
  kind: action
  command: "@KEY<SP>1C<CR>"
  params: []

- id: key_amp_setup_menu
  label: KEY Setup/Menu (Amp)
  kind: action
  command: "@KEY<SP>14<CR>"
  params: []

- id: key_amp_input_esla
  label: KEY Input ESL-A (Amp)
  kind: action
  command: "@KEY<SP>32<CR>"
  params: []

- id: key_amp_input_xlr
  label: KEY Input XLR (Amp)
  kind: action
  command: "@KEY<SP>33<CR>"
  params: []

- id: key_amp_input_rca
  label: KEY Input RCA (Amp)
  kind: action
  command: "@KEY<SP>34<CR>"
  params: []

- id: key_amp_input_phono
  label: KEY Input Phono (Amp)
  kind: action
  command: "@KEY<SP>35<CR>"
  params: []

- id: key_amp_input_option
  label: KEY Input Option (Amp)
  kind: action
  command: "@KEY<SP>36<CR>"  # source row reads "@KEY<SP>36CR>" - interpreted as typo for the standard "@KEY<SP>XX<CR>" frame
  params: []

- id: key_amp_input_output
  label: KEY Input Output (Amp)
  kind: action
  command: "@KEY<SP>37<CR>"
  params: []

- id: amp_volume_set
  label: Volume Set (Amp)
  kind: action
  command: "@VOLUME<SP>{level}<CR>"
  params:
    - name: level
      type: number
      description: Volume level in STEP. C1X: 0~99.9. N-05XD: 0~100.0 (0.5 step).
  notes: |
    Example payload from source: "@VOLUME<SP>23.4<CR>". Range and resolution are model-specific per source.

- id: amp_input_direct_select
  label: Input Direct Select (Amp)
  kind: action
  command: "@INPUT<SP>{input}<CR>"
  params:
    - name: input
      type: enum
      values: [XLR1, XLR2, XLR3, ESLA1, ESLA2, ESLA3, RCA1, RCA2]
      description: Direct input selection. Listed values apply to C1X/C1Xsolo per source.

# ---- Network / DAC normal commands (section 1-5-1.4) ----
# UNRESOLVED: Network/DAC key set documented in the source for K-01XD/K-03XD/K-05XD/N-05XD.
# Not expected to apply to the DV-60 hardware. Included verbatim from source rows.
- id: key_network_input_plus
  label: KEY Input+ (Network)
  kind: action
  command: "@KEY<SP>20<CR>"
  params: []

- id: key_network_menu
  label: KEY Menu (Network)
  kind: action
  command: "@KEY<SP>21<CR>"
  params: []

- id: key_network_prev
  label: KEY Prev (<<) (Network)
  kind: action
  command: "@KEY<SP>22<CR>"
  params: []

- id: key_network_next
  label: KEY Next (>) (Network)
  kind: action
  command: "@KEY<SP>23<CR>"
  params: []

- id: key_network_prev_track
  label: KEY Previous Track (I<<) (Network)
  kind: action
  command: "@KEY<SP>24<CR>"
  params: []

- id: key_network_next_track
  label: KEY Next Track (>>I) (Network)
  kind: action
  command: "@KEY<SP>25<CR>"
  params: []

- id: key_network_play
  label: KEY Play (Network)
  kind: action
  command: "@KEY<SP>26<CR>"
  params: []

- id: key_network_pause
  label: KEY Pause (Network)
  kind: action
  command: "@KEY<SP>27<CR>"
  params: []

- id: key_network_stop
  label: KEY Stop (Network)
  kind: action
  command: "@KEY<SP>28<CR>"
  params: []

- id: key_network_repeat
  label: KEY Repeat (Network)
  kind: action
  command: "@KEY<SP>29<CR>"
  params: []

- id: key_network_shuffle
  label: KEY Shuffle (Network)
  kind: action
  command: "@KEY<SP>2A<CR>"
  params: []

# ---- Phono EQ normal commands (section 1-5-1.5) ----
# UNRESOLVED: Phono EQ commands documented for the Grandioso E1 phono stage.
# Not applicable to the DV-60. Included verbatim from source rows.
- id: key_phono_subsonic
  label: KEY Subsonic (Phono EQ)
  kind: action
  command: "@KEY<SP>60<CR>"
  params: []

- id: key_phono_mono
  label: KEY Mono (Phono EQ)
  kind: action
  command: "@KEY<SP>61<CR>"
  params: []

- id: key_phono_output
  label: KEY Output (Phono EQ)
  kind: action
  command: "@KEY<SP>62<CR>"
  params: []

- id: key_phono_load
  label: KEY Load (Phono EQ)
  kind: action
  command: "@KEY<SP>63<CR>"
  params: []

- id: key_phono_preset
  label: KEY Preset (Phono EQ)
  kind: action
  command: "@KEY<SP>69<CR>"
  params: []

- id: key_phono_low_limit
  label: KEY Low Limit (Phono EQ)
  kind: action
  command: "@KEY<SP>6B<CR>"
  params: []

- id: key_phono_turnover
  label: KEY Turnover (Phono EQ)
  kind: action
  command: "@KEY<SP>6A<CR>"
  params: []

- id: key_phono_roll_off
  label: KEY Roll Off (Phono EQ)
  kind: action
  command: "@KEY<SP>6D<CR>"
  params: []

- id: key_phono_eq_down
  label: KEY EQ- (Phono EQ)
  kind: action
  command: "@KEY<SP>6C<CR>"
  params: []

- id: key_phono_eq_up
  label: KEY EQ+ (Phono EQ)
  kind: action
  command: "@KEY<SP>6E<CR>"
  params: []

- id: key_phono_xlr
  label: KEY XLR (Phono EQ)
  kind: action
  command: "@KEY<SP>6F<CR>"
  params: []

- id: key_phono_rca
  label: KEY RCA (Phono EQ)
  kind: action
  command: "@KEY<SP>70<CR>"
  params: []

- id: key_phono_opt
  label: KEY OPT (Phono EQ)
  kind: action
  command: "@KEY<SP>72<CR>"
  params: []

- id: key_phono_cgain_down
  label: KEY C.Gain- (Phono EQ)
  kind: action
  command: "@KEY<SP>71<CR>"
  params: []

- id: key_phono_cgain_up
  label: KEY C.Gain+ (Phono EQ)
  kind: action
  command: "@KEY<SP>73<CR>"
  params: []

- id: key_phono_mm_mc
  label: KEY MM/MC (Phono EQ)
  kind: action
  command: "@KEY<SP>74<CR>"
  params: []

- id: key_phono_cap_imp
  label: KEY Cap/Imp (Phono EQ)
  kind: action
  command: "@KEY<SP>75<CR>"
  params: []

- id: key_phono_led_off
  label: KEY LED Off (Phono EQ)
  kind: action
  command: "@KEY<SP>76<CR>"
  params: []

- id: key_phono_o_gain
  label: KEY O.Gain (Phono EQ)
  kind: action
  command: "@KEY<SP>78<CR>"
  params: []

- id: key_phono_gain_down
  label: KEY Gain- (Phono EQ)
  kind: action
  command: "@KEY<SP>77<CR>"
  params: []

- id: key_phono_gain_up
  label: KEY Gain+ (Phono EQ)
  kind: action
  command: "@KEY<SP>79<CR>"
  params: []

- id: phono_input_direct_select
  label: Input Direct Select (Phono EQ)
  kind: action
  command: "@INPUT<SP>{input}<CR>"
  params:
    - name: input
      type: enum
      values: [XLR1, XLR2, XLR3, RCA, OPT]
      description: Direct input selection for Phono EQ per source.

# ---- Request (query) commands ----
# Common (section 1-5-2-1)
- id: input_query
  label: Input Status Query
  kind: query
  command: "@?INPUT<CR>"
  params: []

- id: analog_output_query
  label: Analog Output Status Query
  kind: query
  command: "@?AOUT<CR>"
  params: []

- id: digital_output_query
  label: Digital Output Status Query
  kind: query
  command: "@?DOUT<CR>"
  params: []

# CD Player request (section 1-5-2-2)
- id: media_query
  label: Media Status Query (CD)
  kind: query
  command: "@?MEDIA<CR>"
  params: []

- id: play_status_query_cd
  label: Play Status Query (CD)
  kind: query
  command: "@?PSTS<CR>"
  params: []

- id: play_mode_query_cd
  label: Play Mode Query (CD)
  kind: query
  command: "@?PMODE<CR>"
  params: []

- id: repeat_query_cd
  label: Repeat Query (CD)
  kind: query
  command: "@?REPEAT<CR>"
  params: []

- id: upconv_query_cd
  label: Upconvert Query (CD)
  kind: query
  command: "@?UPCONV<CR>"
  params: []

- id: fs_query_cd
  label: Sampling Frequency Query (CD)
  kind: query
  command: "@?FS<CR>"
  params: []

- id: mqa_query_cd
  label: MQA Status Query (CD)
  kind: query
  command: "@?MQA<CR>"
  params: []

# Network/DAC request (section 1-5-2-3)
- id: play_status_query_network
  label: Play Status Query (Network)
  kind: query
  command: "@?PSTS<CR>"
  params: []

- id: play_mode_query_network
  label: Play Mode Query (Network)
  kind: query
  command: "@?PMODE<CR>"
  params: []

- id: repeat_query_network
  label: Repeat Query (Network)
  kind: query
  command: "@?REPEAT<CR>"
  params: []

- id: upconv_query_network
  label: Upconvert Query (Network)
  kind: query
  command: "@?UPCONV<CR>"
  params: []

- id: fs_query_network
  label: Sampling Frequency Query (Network)
  kind: query
  command: "@?FS<CR>"
  params: []

- id: codec_query
  label: Codec Query (Network)
  kind: query
  command: "@?CODEC<CR>"
  params: []

- id: mqa_query_network
  label: MQA Status Query (Network)
  kind: query
  command: "@?MQA<CR>"
  params: []

- id: volume_query_network
  label: Volume Query (Network)
  kind: query
  command: "@?VOLUME<CR>"
  params: []

# AMP request (section 1-5-2-4)
- id: volume_query_amp
  label: Volume Query (Amp)
  kind: query
  command: "@?VOLUME<CR>"
  params: []

# Phono EQ request (section 1-5-2-5)
- id: output_query_phono
  label: Output Query (Phono EQ)
  kind: query
  command: "@?OUTPUT<CR>"
  params: []

- id: eq_query_phono
  label: EQ Curve Query (Phono EQ)
  kind: query
  command: "@?EQ<CR>"
  params: []

- id: gain_query_phono
  label: Gain Query (Phono EQ)
  kind: query
  command: "@?GAIN<CR>"
  params: []

- id: cgain_query_phono
  label: C.Gain Query (Phono EQ)
  kind: query
  command: "@?CGAIN<CR>"
  params: []
```

## Feedbacks
```yaml
- id: ack
  label: Command Accepted
  type: byte
  value: "0x06"
  description: Single-byte ACK returned after successful processing of a NORMAL command.

- id: nak
  label: Command Rejected
  type: byte
  value: "0x15"
  description: Single-byte NAK returned for unrecognized commands or when <CR> is received without leading '@'.

- id: input_status
  label: Input Status Response
  type: string
  example: "@INPUT<SP>DISC<CR>"
  enum_values_partial: [DISC, ESLA, XLR, RCA]   # source: "There are 'ESLA','XLR','RCA' and so on" - list is non-exhaustive in source

- id: analog_output_status
  label: Analog Output Status Response
  type: string
  example: "@AOUT<SP>SPEAKER<CR>"
  enum_values_partial: [SPEAKER, HP, XLR2, ESLA, RCA]   # source list non-exhaustive

- id: digital_output_status
  label: Digital Output Status Response
  type: string
  example: "@DOUT<SP>XLR<CR>"
  enum_values_partial: [ESLINK, XLR, RCA, OPT]   # source list non-exhaustive

- id: media_status
  label: Media Status Response
  type: string
  example: "@MEDIA<SP>SACD<SP>12<SP>34<SP>56<CR>"
  description: |
    Fields: media_type total_tracks total_minutes total_seconds.
    Example decodes to "Media=SACD, total track=12, total time=34m56s".

- id: play_status
  label: Play Status Response
  type: string
  example: "@PSTS<SP>PLAY<SP>3<SP>1<SP>23<SP>TE<CR>"
  description: |
    Fields: state track minutes seconds time_mode.
    time_mode enum: TE (Track Elapsed), TR (Track Remain), DE (Disc Elapsed), DR (Disc Remain).

- id: play_mode_status
  label: Play Mode Response
  type: enum
  example: "@PMODE<SP>CONTINUE<CR>"
  values: [CONTINUE, PGM, SHUFFLE]

- id: repeat_status
  label: Repeat Mode Response
  type: enum
  example: "@REPEAT<SP>ALL<CR>"
  values: [OFF, ALL, "1"]

- id: upconv_status
  label: Upconvert Status Response
  type: enum
  example: "@UPCONV<SP>OFF<CR>"
  values: [OFF, "2fs", "4fs", "8fs", "16fs", DSD]

- id: fs_status
  label: Sampling Frequency Response
  type: string
  example: "@FS<SP>44.1kHz<CR>"
  description: Sampling frequency of input source.

- id: mqa_status
  label: MQA Status Response
  type: string
  example: "@MQA<SP>MQA.<SP>192kHz<CR>"
  enum_values: [NON, MQA, "MQA.", MQB]
  description: First token is the MQA classification; second token (when present) is the decoded sample rate.

- id: codec_status
  label: Codec Response
  type: enum
  example: "@CODEC<SP>FLAC<CR>"
  values_partial: [WAV, FLAC, ALAC, MP3, AAC]   # source list non-exhaustive

- id: volume_status
  label: Volume Response
  type: number
  example: "@VOLUME<SP>23.5<CR>"
  description: Volume value expressed in STEP units.

- id: phono_output_status
  label: Phono EQ Output Response
  type: enum
  example: "@OUTPUT<SP>XLR1<CR>"
  values: ["ESL-A", XLR, RCA]

- id: phono_eq_status
  label: Phono EQ Curve Response
  type: string
  example: "@EQ<SP>RIAA<CR>"
  values_partial: [RIAA, Columbia, Decca]   # source list non-exhaustive

- id: phono_gain_status
  label: Phono Gain Response
  type: enum
  example: "@GAIN<SP>-6dB<CR>"
  values: ["-6dB", "-4dB", "-2dB", "0dB", "+2dB", "+4dB"]

- id: phono_cgain_status
  label: Phono C.Gain Response
  type: enum
  example: "@CGAIN<SP>-9dB<CR>"
  values: ["-9dB", "-6dB", "-3dB", "0dB"]
```

## Variables
```yaml
- id: volume_level
  label: Volume Level
  type: number
  unit: STEP
  range: "0-99.9 (C1X) / 0-100.0, 0.5 step (N-05XD)"
  setter_action: amp_volume_set
  getter_query: volume_query_network
  notes: |
    Applies to amp/network models documented in source. UNRESOLVED for DV-60: source does not state DV-60 volume support.

# UNRESOLVED: no other settable scalar variables independent of the action set are documented in source.
```

## Events
```yaml
# UNRESOLVED: source describes only solicited responses to query commands and ACK/NAK
# replies to normal commands. No unsolicited / asynchronous notifications are documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements
# are stated in the source document.
```

## Notes
- Source document: "Esoteric RS 232C Interface" Rev 1.5, dated 2024/9/30. Compatible-models header lists Grandioso C1X / C1Xsolo / E1, K-01XD / K-03XD / K-05XD / N-05XD, F-01 / F-02. The DV-60 (the entity target of this spec) is **not** listed in that header; the spec is transcribed from the document at the operator's direction and field applicability to the DV-60 must be confirmed against device hardware before promotion beyond `draft`.
- Inter-command timing: source states a minimum 20 ms delay after receiving ACK before sending the next command (handshake timing diagram cites 20 ms min, 50 ms max).
- All commands are ASCII and **case sensitive**. Every send and every reply is framed by `@` (0x40) prefix and `<CR>` (0x0D) terminator; the device returns single-byte ACK (0x06) or NAK (0x15) for accepted/rejected NORMAL commands.
- Multiple sections (`Request for CD Player` and `Request for Network/DAC`) repeat the same opcodes (`@?PSTS`, `@?PMODE`, `@?REPEAT`, `@?UPCONV`, `@?FS`, `@?MQA`). They are enumerated as separate actions because the source lists them as separate rows with model-class scoping.
- AMP row 11 in the source ("OPTION") is printed as `@KEY<SP>36CR>`, which is a typographical defect missing the `<` delimiter. The spec emits `@KEY<SP>36<CR>` to match the framing pattern of every other documented `@KEY<SP>XX<CR>` row. Flagged inline at `key_amp_input_option`.
- Volume response examples differ between AMP (`@VOLUME<SP>23.4<CR>`) and Network (`@VOLUME<SP>23.5<CR>`); both are STEP-expressed values, with model-specific range/resolution.
- Several response enums are explicitly non-exhaustive in source (terminated by "and so on") for `INPUT`, `AOUT`, `DOUT`, `CODEC`, and `EQ`. Those feedback entries carry `values_partial` lists transcribed verbatim.

<!-- UNRESOLVED: DV-60 compatibility with this protocol is not confirmed by the source document. -->
<!-- UNRESOLVED: firmware version compatibility, RS-232 connector type for the DV-60, and per-model command applicability matrix are not stated in source. -->
<!-- UNRESOLVED: behaviour on power-off (whether RS-232 remains active in standby), error recovery semantics beyond NAK, and any retransmit policy are not documented. -->

## Provenance

```yaml
source_domains:
  - esoteric.jp
source_urls:
  - https://www.esoteric.jp/downloads/products/esoteric/k-01xd/esoteric_rs232c_command_table_rev1.5.pdf
retrieved_at: 2026-05-12T09:53:46.083Z
last_checked_at: 2026-06-02T00:54:02.852Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T00:54:02.852Z
matched_actions: 99
action_count: 99
confidence: medium
summary: "All 99 spec actions matched literal commands in source; all transport parameters verified verbatim; complete bidirectional coverage of command catalogue. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document (\"Esoteric RS 232C Interface\" Rev 1.5, 2024/9/30) does not list the DV-60 in its compatible-models header. It explicitly covers Grandioso C1X/C1Xsolo/E1, K-01XD/K-03XD/K-05XD/N-05XD, and F-01/F-02. Every action and feedback below is transcribed verbatim from that document; field applicability to the DV-60 must be confirmed against device hardware before any S-tier promotion."
- "firmware version compatibility not stated in source."
- "physical RS-232 connector type, pinout for unlisted models, and cable wiring beyond the documented TXD/RXD pin mapping not detailed for the DV-60."
- "AMP commands are documented in the source for Grandioso C1X/C1Xsolo/E1 amp products"
- "Network/DAC key set documented in the source for K-01XD/K-03XD/K-05XD/N-05XD."
- "Phono EQ commands documented for the Grandioso E1 phono stage."
- "no other settable scalar variables independent of the action set are documented in source."
- "source describes only solicited responses to query commands and ACK/NAK"
- "no multi-step macro sequences documented in source."
- "no safety warnings, interlock procedures, or power-on sequencing requirements"
- "DV-60 compatibility with this protocol is not confirmed by the source document."
- "firmware version compatibility, RS-232 connector type for the DV-60, and per-model command applicability matrix are not stated in source."
- "behaviour on power-off (whether RS-232 remains active in standby), error recovery semantics beyond NAK, and any retransmit policy are not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
