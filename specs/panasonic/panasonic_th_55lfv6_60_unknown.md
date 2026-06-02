---
spec_id: admin/panasonic-th-55lfv6-60
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-55LFV60 / TH-55LFV6 Control Spec"
manufacturer: Panasonic
model_family: TH-55LFV60
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-55LFV60
    - TH-55LFV6
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.connect.panasonic.com
  - pna-b2b-storage-mkt.s3.amazonaws.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LFV6_60_SerialCommandList.pdf
  - https://pna-b2b-storage-mkt.s3.amazonaws.com/production/266931_cq1_SerialCommandList_u_en.pdf
  - https://docs.connect.panasonic.com/prodisplays/
retrieved_at: 2026-05-13T11:24:04.598Z
last_checked_at: 2026-06-02T04:56:34.018Z
generated_at: 2026-06-02T04:56:34.018Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN TCP port not stated in source (Network Setup exposes the port number 1024..65535 with several exclusions, but no default value is documented). LAN framing above the TCP transport is also not documented."
  - "default LAN TCP port"
  - "port number not stated in source"
  - "no multi-step sequences documented in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "LAN TCP port — the SSU:LCP command accepts ports 1024..65535 with several exclusions, but the factory default port is not stated in the source."
  - "LAN framing above TCP — the source documents the same ASCII opcode set for LAN as for RS-232C, but the LAN transport wrapper (TCP framing, connection lifecycle) is not described."
  - "the difference between \"Protocol1\" and \"Protocol2\" (LP1 / LP2) under LAN control is not described."
  - "maximum end-to-end cable length for RS-232C is not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T04:56:34.018Z
  matched_actions: 295
  action_count: 295
  confidence: medium
  summary: "All 295 spec actions matched to 69 distinct source commands with correct wire-level mnemonics and parameter shapes; transport (9600 baud, 8N1, straight cable, STX/ETX framing) verified; coverage ratio 1.0. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Panasonic TH-55LFV60 / TH-55LFV6 Control Spec

## Summary
RS-232C and LAN control command list for the Panasonic TH-55LFV60 / TH-55LFV6 Ultra Narrow Bezel LCD Display. Every command is a 3-character ASCII opcode (sometimes with a `:` and parameters), framed by STX (0x02) and ETX (0x03). Both RS-232C and LAN use the same command set; LAN uses one of two selectable protocols (LP1 / LP2) chosen via OSD menu.

<!-- UNRESOLVED: LAN TCP port not stated in source (Network Setup exposes the port number 1024..65535 with several exclusions, but no default value is documented). LAN framing above the TCP transport is also not documented. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  cable: straight  # source: "type of cable : straight cable"
# TCP port not stated; Network Setup (SSU:LCP) allows 1024..65535 excluding 4352, 10000, 20000, 41794.
# UNRESOLVED: default LAN TCP port
addressing:
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
# Frame format from source: <STX> C1 C2 C3 [: P1 P2 P3 ...] <ETX>
# STX = 0x02, ETX = 0x03. Commands are 3 ASCII chars. Parameters are colon-prefixed and may be empty.
# For Display-ID addressing the prefix is <STX>AD94;RAD:{3-char-ID or group};<command><ETX>
# Error reply for unknown command: ER401
```

## Traits
```yaml
- powerable       # inferred from PON/POF/QPW commands
- routable        # inferred from IMS input change + audio input select commands
- queryable       # inferred from Q*-prefixed status query commands
- levelable       # inferred from AVL volume, VPC picture, AAC tone commands
```

## Actions
```yaml
# Basic Control
- id: power_on
  label: Power ON
  kind: action
  command: "<STX>PON<ETX>"
  params: []

- id: power_off
  label: Power OFF
  kind: action
  command: "<STX>POF<ETX>"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "<STX>QPW<ETX>"
  params: []
  # Reply: QPW:0 (Standby) / QPW:1 (Power ON)

- id: input_change
  label: Input Change (toggle)
  kind: action
  command: "<STX>IMS<ETX>"
  params: []
  # Cycles through HM1 / HM2 / DV1 / PC1 / VD1 / UD1

- id: input_select
  label: Input Select
  kind: action
  command: "<STX>IMS:{input}<ETX>"
  params:
    - name: input
      type: string
      description: "HM1 (HDMI1) / HM2 (HDMI2) / DV1 (DVI-D) / PC1 (PC) / VD1 (VIDEO) / UD1 (USB Display)"

- id: input_status_query
  label: Current Input Query
  kind: query
  command: "<STX>QMI<ETX>"
  params: []
  # Reply: QMI:{input}

- id: audio_volume_set
  label: Audio Volume Set
  kind: action
  command: "<STX>AVL:{level}<ETX>"
  params:
    - name: level
      type: integer
      description: "000..100 (zero-padded 3 digits)"

- id: volume_up
  label: Volume Up
  kind: action
  command: "<STX>AUU<ETX>"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "<STX>AUD<ETX>"
  params: []

- id: current_volume_query
  label: Current Audio Volume Query
  kind: query
  command: "<STX>QAV<ETX>"
  params: []
  # Reply: QAV:000..100

- id: audio_mute_toggle
  label: Audio Mute Toggle
  kind: action
  command: "<STX>AMT<ETX>"
  params: []
  # Toggle between mute off and mute on

- id: audio_mute_set
  label: Audio Mute Set
  kind: action
  command: "<STX>AMT:{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (mute off) / 1 (mute on)"

- id: audio_mute_query
  label: Audio Mute Query
  kind: query
  command: "<STX>QAM<ETX>"
  params: []
  # Reply: QAM:0 / QAM:1

- id: video_mute_toggle
  label: Video Mute Toggle
  kind: action
  command: "<STX>VMT<ETX>"
  params: []

- id: video_mute_set
  label: Video Mute Set
  kind: action
  command: "<STX>VMT:{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (video mute off) / 1 (video mute on)"

- id: video_mute_query
  label: Video Mute Query
  kind: query
  command: "<STX>QVM<ETX>"
  params: []
  # Reply: QVM:0 / QVM:1

- id: aspect_set
  label: Aspect Set
  kind: action
  command: "<STX>DAM:{aspect}<ETX>"
  params:
    - name: aspect
      type: string
      description: "FULL / NORM / ZOOM / ZOM2"

- id: aspect_query
  label: Aspect Query
  kind: query
  command: "<STX>QAS<ETX>"
  params: []
  # Reply: QAS:FULL / NORM / ZOOM / ZOM2

# Picture Adjustment
- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  command: "<STX>VPC:MEN{mode}<ETX>"
  params:
    - name: mode
      type: string
      description: "VIV (VIVID SIGNAGE) / NAT (NATURAL SIGNAGE) / STD (STANDARD) / SUV (SURVEILLANCE) / GRH (GRAPHIC) / DCM (DICOM)"

- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "<STX>QPC:MEN<ETX>"
  params: []
  # Reply: QPC:MEN{viv|nat|std|suv|grh|dcm}

- id: backlight_set
  label: Backlight Set
  kind: action
  command: "<STX>VPC:BLT{level}<ETX>"
  params:
    - name: level
      type: integer
      description: "000..100 or DEF (zero-padded 3 digits). Available when Power save is Off."

- id: backlight_query
  label: Backlight Query
  kind: query
  command: "<STX>QPC:BLT<ETX>"
  params: []

- id: contrast_set
  label: Contrast Set
  kind: action
  command: "<STX>VPC:PIC{level}<ETX>"
  params:
    - name: level
      type: integer
      description: "000..100 or DEF (zero-padded 3 digits)"

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "<STX>QPC:PIC<ETX>"
  params: []

- id: brightness_set
  label: Brightness Set
  kind: action
  command: "<STX>VPC:BLK{level}<ETX>"
  params:
    - name: level
      type: integer
      description: "000..100 or DEF (zero-padded 3 digits)"

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "<STX>QPC:BLK<ETX>"
  params: []

- id: color_set
  label: Color Set
  kind: action
  command: "<STX>VPC:COL{level}<ETX>"
  params:
    - name: level
      type: integer
      description: "000..100 or DEF (zero-padded 3 digits)"

- id: color_query
  label: Color Query
  kind: query
  command: "<STX>QPC:COL<ETX>"
  params: []

- id: tint_set
  label: Tint Set
  kind: action
  command: "<STX>VPC:TIN{level}<ETX>"
  params:
    - name: level
      type: integer
      description: "000..100 or DEF (zero-padded 3 digits)"

- id: tint_query
  label: Tint Query
  kind: query
  command: "<STX>QPC:TIN<ETX>"
  params: []

- id: sharpness_set
  label: Sharpness Set
  kind: action
  command: "<STX>VPC:SHP{level}<ETX>"
  params:
    - name: level
      type: integer
      description: "000..100 or DEF (zero-padded 3 digits)"

- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "<STX>QPC:SHP<ETX>"
  params: []

- id: enhance_level_set
  label: Enhance Level Set
  kind: action
  command: "<STX>VPC:SHE{level}<ETX>"
  params:
    - name: level
      type: string
      description: "1 (low) / 2 (high)"

- id: enhance_level_query
  label: Enhance Level Query
  kind: query
  command: "<STX>QPC:SHE<ETX>"
  params: []

- id: gamma_set
  label: Gamma Set
  kind: action
  command: "<STX>VWB:GMM{gamma}<ETX>"
  params:
    - name: gamma
      type: string
      description: "20 / 22 / 24 / 26 / DC (DC inquiry-only, valid when Picture Mode is DCM)"

- id: gamma_query
  label: Gamma Query
  kind: query
  command: "<STX>QWB:GMM<ETX>"
  params: []

- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  command: "<STX>VPC:TMP{temp}<ETX>"
  params:
    - name: temp
      type: string
      description: "032 / 040 / 050 / 065 / 075 / 093 / 107 / NTV / U01 / U02 (3200K..10700K / Native / USER1 / USER2)"

- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  command: "<STX>QPC:TMP<ETX>"
  params: []

- id: red_gain_set
  label: Red Gain Set
  kind: action
  command: "<STX>VWB:RGN{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "0000..0255 (zero-padded 4 digits). Available when Color Temperature is USER1 or USER2."

- id: red_gain_query
  label: Red Gain Query
  kind: query
  command: "<STX>QWB:RGN<ETX>"
  params: []

- id: green_gain_set
  label: Green Gain Set
  kind: action
  command: "<STX>VWB:GGN{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "0000..0255 (zero-padded 4 digits). Available when Color Temperature is USER1 or USER2."

- id: green_gain_query
  label: Green Gain Query
  kind: query
  command: "<STX>QWB:GGN<ETX>"
  params: []

- id: blue_gain_set
  label: Blue Gain Set
  kind: action
  command: "<STX>VWB:BGN{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "0000..0255 (zero-padded 4 digits). Available when Color Temperature is USER1 or USER2."

- id: blue_gain_query
  label: Blue Gain Query
  kind: query
  command: "<STX>QWB:BGN<ETX>"
  params: []

- id: red_bias_set
  label: Red Bias Set
  kind: action
  command: "<STX>VWB:RBS{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "-127..0128 (signed, sign in 5th position; e.g. -0010 / 0010)"

- id: red_bias_query
  label: Red Bias Query
  kind: query
  command: "<STX>QWB:RBS<ETX>"
  params: []

- id: green_bias_set
  label: Green Bias Set
  kind: action
  command: "<STX>VWB:GBS{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "-127..0128 (signed)"

- id: green_bias_query
  label: Green Bias Query
  kind: query
  command: "<STX>QWB:GBS<ETX>"
  params: []

- id: blue_bias_set
  label: Blue Bias Set
  kind: action
  command: "<STX>VWB:BBS{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "-127..0128 (signed)"

- id: blue_bias_query
  label: Blue Bias Query
  kind: query
  command: "<STX>QWB:BBS<ETX>"
  params: []

- id: dynamic_contrast_set
  label: Dynamic Contrast Set
  kind: action
  command: "<STX>VPC:DCO{level}<ETX>"
  params:
    - name: level
      type: integer
      description: "00..10 (zero-padded 2 digits)"

- id: dynamic_contrast_query
  label: Dynamic Contrast Query
  kind: query
  command: "<STX>QPC:DCO<ETX>"
  params: []

- id: color_enhancement_set
  label: Color Enhancement Set
  kind: action
  command: "<STX>VPC:PAJ{level}<ETX>"
  params:
    - name: level
      type: string
      description: "0 (Off) / 1 (Low) / 2 (Mid) / 3 (High)"

- id: color_enhancement_query
  label: Color Enhancement Query
  kind: query
  command: "<STX>QPC:PAJ<ETX>"
  params: []

- id: refine_enhancer_set
  label: Refine Enhancer Set
  kind: action
  command: "<STX>VPC:SRC{level}<ETX>"
  params:
    - name: level
      type: string
      description: "0 (Off) / 1 (Low) / 2 (Mid) / 3 (High)"

- id: refine_enhancer_query
  label: Refine Enhancer Query
  kind: query
  command: "<STX>QPC:SRC<ETX>"
  params: []

- id: gradation_smoother_set
  label: Gradation Smoother Set
  kind: action
  command: "<STX>VPC:GRS{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (off) / 1 (on)"

- id: gradation_smoother_query
  label: Gradation Smoother Query
  kind: query
  command: "<STX>QPC:GRS<ETX>"
  params: []

# Memory function
- id: memory_delete
  label: Memory Delete
  kind: action
  command: "<STX>VPF:DEL{slot}<ETX>"
  params:
    - name: slot
      type: integer
      description: "01..08 (Memory No.1 - Memory No.8)"

- id: memory_load
  label: Memory Load
  kind: action
  command: "<STX>VPF:LOD{slot}<ETX>"
  params:
    - name: slot
      type: integer
      description: "01..08"

- id: memory_name_change
  label: Memory Name Change
  kind: action
  command: "<STX>VPF:NAM{slot}{name}<ETX>"
  params:
    - name: slot
      type: integer
      description: "01..08"
    - name: name
      type: string
      description: "Memory name, max 20 characters from the documented character set"

- id: memory_name_query
  label: Memory Name Query
  kind: query
  command: "<STX>QPF:NAM{slot}<ETX>"
  params:
    - name: slot
      type: integer
      description: "01..08"

- id: memory_save
  label: Memory Save
  kind: action
  command: "<STX>VPF:SAV{slot}{name}<ETX>"
  params:
    - name: slot
      type: integer
      description: "01..08"
    - name: name
      type: string
      description: "Memory name, max 20 characters"

- id: memory_state_query
  label: Memory State Query
  kind: query
  command: "<STX>QPF:STA<ETX>"
  params: []
  # Reply: QPF:STA------ (each of 8 chars "-" for unused or "0" for used, Memory No.1..08)

# Sound Adjustment
- id: output_select_set
  label: Output Select Set
  kind: action
  command: "<STX>AAC:OUT{out}<ETX>"
  params:
    - name: out
      type: string
      description: "SPO (SPEAKERS) / LNO (AUDIO OUT)"

- id: output_select_query
  label: Output Select Query
  kind: query
  command: "<STX>QAC:OUT<ETX>"
  params: []

- id: sound_mode_set
  label: Sound Mode Set
  kind: action
  command: "<STX>AAC:MEN{mode}<ETX>"
  params:
    - name: mode
      type: string
      description: "STD (AUT, STANDARD) / DYN (DYNAMIC) / CLR (CLEAR). Available when Output Select is SPEAKERS."

- id: sound_mode_query
  label: Sound Mode Query
  kind: query
  command: "<STX>QAC:MEN<ETX>"
  params: []

- id: bass_set
  label: Bass Set
  kind: action
  command: "<STX>AAC:BAS{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "-20..+20 (signed, sign at 4th position). Available when Output Select is SPEAKERS."

- id: bass_query
  label: Bass Query
  kind: query
  command: "<STX>QAC:BAS<ETX>"
  params: []

- id: treble_set
  label: Treble Set
  kind: action
  command: "<STX>AAC:TRE{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "-20..+20 (signed)"

- id: treble_query
  label: Treble Query
  kind: query
  command: "<STX>QAC:TRE<ETX>"
  params: []

- id: balance_set
  label: Balance Set
  kind: action
  command: "<STX>AAC:BAL{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "-20..+20 (signed)"

- id: balance_query
  label: Balance Query
  kind: query
  command: "<STX>QAC:BAL<ETX>"
  params: []

- id: surround_set
  label: Surround Set
  kind: action
  command: "<STX>AAC:SUR{state}<ETX>"
  params:
    - name: state
      type: string
      description: "MON (ON) / OFF"

- id: surround_query
  label: Surround Query
  kind: query
  command: "<STX>QAC:SUR<ETX>"
  params: []

# Position/Size Adjustment
- id: hpos_set
  label: Horizontal Position Set
  kind: action
  command: "<STX>DGE:HPO{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "-100..+100 (signed; 5-digit field with sign in position 5, e.g. -0100 / 00100)"

- id: hpos_query
  label: Horizontal Position Query
  kind: query
  command: "<STX>QGE:HPO<ETX>"
  params: []

- id: hsize_set
  label: Horizontal Size Set
  kind: action
  command: "<STX>DGE:HSZ{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "-100..+100 (signed; 5-digit)"

- id: hsize_query
  label: Horizontal Size Query
  kind: query
  command: "<STX>QGE:HSZ<ETX>"
  params: []

- id: vpos_set
  label: Vertical Position Set
  kind: action
  command: "<STX>DGE:VPO{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "-100..+100 (signed; 5-digit)"

- id: vpos_query
  label: Vertical Position Query
  kind: query
  command: "<STX>QGE:VPO<ETX>"
  params: []

- id: vsize_set
  label: Vertical Size Set
  kind: action
  command: "<STX>DGE:VSZ{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "-100..+100 (signed; 5-digit)"

- id: vsize_query
  label: Vertical Size Query
  kind: query
  command: "<STX>QGE:VSZ<ETX>"
  params: []

- id: clock_phase_set
  label: Clock Phase Set
  kind: action
  command: "<STX>DGE:CLK{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "00..30 (zero-padded 2 digits)"

- id: clock_phase_query
  label: Clock Phase Query
  kind: query
  command: "<STX>QGE:CLK<ETX>"
  params: []

- id: dot_clock_set
  label: Dot Clock Set
  kind: action
  command: "<STX>DGE:DCL{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "-5..+5 (signed; 3-digit with sign at position 2)"

- id: dot_clock_query
  label: Dot Clock Query
  kind: query
  command: "<STX>QGE:DCL<ETX>"
  params: []

- id: dot_by_dot_set
  label: 1:1 Pixel Mode Set
  kind: action
  command: "<STX>DGE:DBD{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: dot_by_dot_query
  label: 1:1 Pixel Mode Query
  kind: query
  command: "<STX>QGE:DBD<ETX>"
  params: []

- id: overscan_set
  label: Overscan Set
  kind: action
  command: "<STX>DGE:OVS{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: overscan_query
  label: Overscan Query
  kind: query
  command: "<STX>QGE:OVS<ETX>"
  params: []

- id: pos_size_lump_set
  label: Pos/Size Lump Set
  kind: action
  command: "<STX>DGE:PSZ{hpos}{hsize}{vpos}{vsize}<ETX>"
  params:
    - name: hpos
      type: integer
      description: "-100..+100 (5-digit signed)"
    - name: hsize
      type: integer
      description: "-100..+100 (5-digit signed)"
    - name: vpos
      type: integer
      description: "-100..+100 (5-digit signed)"
    - name: vsize
      type: integer
      description: "-100..+100 (5-digit signed)"

- id: pos_size_lump_query
  label: Pos/Size Lump Query
  kind: query
  command: "<STX>QGE:PSZ<ETX>"
  params: []

- id: auto_setup
  label: Auto Setup
  kind: action
  command: "<STX>DGE:ASU1<ETX>"
  params: []

- id: auto_setup_query
  label: Auto Setup Query
  kind: query
  command: "<STX>QGE:ASU<ETX>"
  params: []
  # Reply: QGE:ASU{OK|NG|OF|NW}

# Set up
- id: wobbling_set
  label: Wobbling Set
  kind: action
  command: "<STX>OSP:WOB{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: wobbling_query
  label: Wobbling Query
  kind: query
  command: "<STX>QSP:WOB<ETX>"
  params: []

- id: no_activity_power_off_set
  label: No Activity Power Off Set
  kind: action
  command: "<STX>SSU:NAO{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: no_activity_power_off_query
  label: No Activity Power Off Query
  kind: query
  command: "<STX>QSU:NAO<ETX>"
  params: []

- id: power_on_screen_delay_set
  label: Power ON Screen Delay Set
  kind: action
  command: "<STX>OSP:POD{value}<ETX>"
  params:
    - name: value
      type: string
      description: "AT (Auto) or 00..30 seconds (zero-padded 2 digits)"

- id: power_on_screen_delay_query
  label: Power ON Screen Delay Query
  kind: query
  command: "<STX>QSP:POD<ETX>"
  params: []

- id: osd_language_set
  label: OSD Language Set
  kind: action
  command: "<STX>SSU:LNG{lang}<ETX>"
  params:
    - name: lang
      type: string
      description: "ENG / DEU / FRA / ITL / ESP / USA / CHA / JPN / RUS"

- id: osd_language_query
  label: OSD Language Query
  kind: query
  command: "<STX>QSU:LNG<ETX>"
  params: []

- id: power_management_mode_set
  label: Power Management Mode Set
  kind: action
  command: "<STX>SSU:ECS{mode}<ETX>"
  params:
    - name: mode
      type: string
      description: "0 (CUSTOM) / 1 (ON)"

- id: power_management_mode_query
  label: Power Management Mode Query
  kind: query
  command: "<STX>QSU:ECS<ETX>"
  params: []

- id: no_signal_power_off_set
  label: No Signal Power Off Set
  kind: action
  command: "<STX>SSU:AOF{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: no_signal_power_off_query
  label: No Signal Power Off Query
  kind: query
  command: "<STX>QSU:AOF<ETX>"
  params: []

- id: pc_power_management_set
  label: PC Power Management Set
  kind: action
  command: "<STX>SSU:DPM{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: pc_power_management_query
  label: PC Power Management Query
  kind: query
  command: "<STX>QSU:DPM<ETX>"
  params: []

- id: dvi_d1_power_management_set
  label: DVI-D1 Power Management Set
  kind: action
  command: "<STX>SSU:D1V{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: dvi_d1_power_management_query
  label: DVI-D1 Power Management Query
  kind: query
  command: "<STX>QSU:D1V<ETX>"
  params: []

- id: hdmi1_power_management_set
  label: HDMI1 Power Management Set
  kind: action
  command: "<STX>SSU:D1H{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: hdmi1_power_management_query
  label: HDMI1 Power Management Query
  kind: query
  command: "<STX>QSU:D1H<ETX>"
  params: []

- id: hdmi2_power_management_set
  label: HDMI2 Power Management Set
  kind: action
  command: "<STX>SSU:D2H{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: hdmi2_power_management_query
  label: HDMI2 Power Management Query
  kind: query
  command: "<STX>QSU:D2H<ETX>"
  params: []

- id: power_save_set
  label: Power Save Set
  kind: action
  command: "<STX>SSU:ECO{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: power_save_query
  label: Power Save Query
  kind: query
  command: "<STX>QSU:ECO<ETX>"
  params: []

- id: display_orientation_set
  label: Display Orientation Set
  kind: action
  command: "<STX>SSU:DOR{orient}<ETX>"
  params:
    - name: orient
      type: string
      description: "0 (Landscape) / 1 (Portrait)"

- id: display_orientation_query
  label: Display Orientation Query
  kind: query
  command: "<STX>QSU:DOR<ETX>"
  params: []

- id: menu_position_set
  label: Menu Position Set
  kind: action
  command: "<STX>SSU:OPS{pos}<ETX>"
  params:
    - name: pos
      type: string
      description: "1 (Upper/left) / 2 (Upper/right) / 3 (Center) / 4 (Lower/left) / 5 (Lower/right)"

- id: menu_position_query
  label: Menu Position Query
  kind: query
  command: "<STX>QSU:OPS<ETX>"
  params: []

- id: menu_duration_set
  label: Menu Display Duration Set
  kind: action
  command: "<STX>SSU:MDT{seconds}<ETX>"
  params:
    - name: seconds
      type: integer
      description: "005..180 (5-second unit, zero-padded 3 digits)"

- id: menu_duration_query
  label: Menu Display Duration Query
  kind: query
  command: "<STX>QSU:MDT<ETX>"
  params: []

- id: menu_transparency_set
  label: Menu Transparency Set
  kind: action
  command: "<STX>SSU:MTL{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "000..100 (10% unit)"

- id: menu_transparency_query
  label: Menu Transparency Query
  kind: query
  command: "<STX>QSU:MTL<ETX>"
  params: []

- id: network_setup_set
  label: Network Setup Set
  kind: action
  command: "<STX>SSU:NET{ip1}{ip2}{ip3}{ip4}{sn1}{sn2}{sn3}{sn4}{gw1}{gw2}{gw3}{gw4}{dhcp}<ETX>"
  params:
    - name: ip1..ip4
      type: integer
      description: "IP address bytes, 000..255 each"
    - name: sn1..sn4
      type: integer
      description: "Subnet mask bytes, 000..255 each"
    - name: gw1..gw4
      type: integer
      description: "Gateway bytes, 000..255 each"
    - name: dhcp
      type: string
      description: "0 (DHCP Off) / 1 (DHCP On)"

- id: network_setup_query
  label: Network Setup Query
  kind: query
  command: "<STX>QSU:NET<ETX>"
  params: []

- id: lan_port_set
  label: LAN Control Port Set
  kind: action
  command: "<STX>SSU:LCP{port}<ETX>"
  params:
    - name: port
      type: integer
      description: "1024..65535, excluding 4352, 10000, 20000, 41794"

- id: lan_port_query
  label: LAN Control Port Query
  kind: query
  command: "<STX>QSU:LCP<ETX>"
  params: []

- id: display_name_set
  label: Change Display Name
  kind: action
  command: "<STX>SSU:LDN{name}<ETX>"
  params:
    - name: name
      type: string
      description: "Display name, max 8 characters from the documented character set"

- id: display_name_query
  label: Display Name Query
  kind: query
  command: "<STX>QSU:LDN<ETX>"
  params: []

- id: amx_dd_set
  label: AMX D.D. Set
  kind: action
  command: "<STX>SSU:ADD{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: amx_dd_query
  label: AMX D.D. Query
  kind: query
  command: "<STX>QSU:ADD<ETX>"
  params: []

- id: crestron_connected_set
  label: Crestron Connected Set
  kind: action
  command: "<STX>SSU:CRV{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: crestron_connected_query
  label: Crestron Connected Query
  kind: query
  command: "<STX>QSU:CRV<ETX>"
  params: []

- id: setup_reset
  label: Reset (Setup)
  kind: action
  command: "<STX>SSU:LRT<ETX>"
  params: []

# Control Settings
- id: display_id_query
  label: Display ID Query
  kind: query
  command: "<STX>QID:DID<ETX>"
  params: []
  # Reply: QID:DID000..100 (read-only; set via Serial ID Setup)

- id: serial_id_function_set
  label: Serial ID Function Set
  kind: action
  command: "<STX>SID:SID{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: serial_id_function_query
  label: Serial ID Function Query
  kind: query
  command: "<STX>QID:SID<ETX>"
  params: []

- id: serial_response_id_all_set
  label: Serial Response (ID All) Set
  kind: action
  command: "<STX>SCT:RIA{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: serial_response_id_all_query
  label: Serial Response (ID All) Query
  kind: query
  command: "<STX>QCT:RIA<ETX>"
  params: []

- id: serial_id_group_set
  label: Serial ID Group Set
  kind: action
  command: "<STX>SCT:SIG{group}<ETX>"
  params:
    - name: group
      type: string
      description: "A / B / C / D / E / F / G"

- id: serial_id_group_query
  label: Serial ID Group Query
  kind: query
  command: "<STX>QCT:SIG<ETX>"
  params: []

- id: serial_response_id_group_set
  label: Serial Response (ID Group) Set
  kind: action
  command: "<STX>SCT:RIG{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: serial_response_id_group_query
  label: Serial Response (ID Group) Query
  kind: query
  command: "<STX>QCT:RIG<ETX>"
  params: []

- id: daisy_chain_position_set
  label: Serial Daisy Chain Position Set
  kind: action
  command: "<STX>SCT:DCP{pos}<ETX>"
  params:
    - name: pos
      type: string
      description: "TOP / DEF / END"

- id: daisy_chain_position_query
  label: Serial Daisy Chain Position Query
  kind: query
  command: "<STX>QCT:DCP<ETX>"
  params: []

- id: serial_id_setup_set
  label: Serial ID Setup (function + display ID)
  kind: action
  command: "<STX>SIF:{function}{id}<ETX>"
  params:
    - name: function
      type: string
      description: "0 (Off) / 1 (On)"
    - name: id
      type: integer
      description: "000..100 (Display ID)"

- id: serial_id_setup_query
  label: Serial ID Setup Query
  kind: query
  command: "<STX>QIF<ETX>"
  params: []
  # Reply: QIF:{function}{id}

- id: multi_control_auto_setting
  label: Multi Control Auto Setting
  kind: action
  command: "<STX>SID:AUS{id}{option}<ETX>"
  params:
    - name: id
      type: integer
      description: "001..100 (Display ID)"
    - name: option
      type: string
      description: "0 (Maintain settings) / 1 (Force Network control On, DHCP On). Control command does not reply."

- id: multi_control_auto_setting_query
  label: Multi Control Auto Setting Query
  kind: query
  command: "<STX>QID:AUS<ETX>"
  params: []

# Signal
- id: component_rgb_in_select_set
  label: Component/RGB-IN Select Set
  kind: action
  command: "<STX>SSU:CMP{sel}<ETX>"
  params:
    - name: sel
      type: string
      description: "YBR (YBR Signal) / RGB (RGB Signal). Available when PC1/YP1 is selected."

- id: component_rgb_in_select_query
  label: Component/RGB-IN Select Query
  kind: query
  command: "<STX>QSU:CMP<ETX>"
  params: []

- id: yuv_rgb_in_select_set
  label: YUV/RGB-IN Select Set
  kind: action
  command: "<STX>SSU:DYR{sel}<ETX>"
  params:
    - name: sel
      type: string
      description: "YUV / RGB. Available when HDMI1/HDMI2/DVI-D is selected."

- id: yuv_rgb_in_select_query
  label: YUV/RGB-IN Select Query
  kind: query
  command: "<STX>QSU:DYR<ETX>"
  params: []

- id: yc_filter_set
  label: 3D Y/C Filter Set
  kind: action
  command: "<STX>SSG:YCS{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: yc_filter_query
  label: 3D Y/C Filter Query
  kind: query
  command: "<STX>QSG:YCS<ETX>"
  params: []

- id: color_system_set
  label: Color System Set
  kind: action
  command: "<STX>SSG:COS{sys}<ETX>"
  params:
    - name: sys
      type: string
      description: "NTS (NTSC) / PAL / SCM (SECAM) / 4NT (NTSC4.43) / MPA (PAL-M) / NPA (PAL-N) / AUT (AUTO)"

- id: color_system_query
  label: Color System Query
  kind: query
  command: "<STX>QSG:COS<ETX>"
  params: []

- id: sync_signal_set
  label: Sync Signal Set
  kind: action
  command: "<STX>SSG:SNC{sync}<ETX>"
  params:
    - name: sync
      type: string
      description: "HAV (Auto detection) / GRN (Sync On Green) / HVS (H/V sync). PC input only."

- id: sync_signal_query
  label: Sync Signal Query
  kind: query
  command: "<STX>QSG:SNC<ETX>"
  params: []

- id: cinema_reality_set
  label: Cinema Reality 3:2 Pull Down Set
  kind: action
  command: "<STX>SSG:DCR{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: cinema_reality_query
  label: Cinema Reality 3:2 Pull Down Query
  kind: query
  command: "<STX>QSG:DCR<ETX>"
  params: []

- id: xga_mode_set
  label: XGA Mode Set
  kind: action
  command: "<STX>SSG:XGA{mode}<ETX>"
  params:
    - name: mode
      type: string
      description: "1 (1024x768) / 2 (1280x768) / 3 (1366x768) / 4 (Auto)"

- id: xga_mode_query
  label: XGA Mode Query
  kind: query
  command: "<STX>QSG:XGA<ETX>"
  params: []

- id: noise_reduction_set
  label: Noise Reduction Set
  kind: action
  command: "<STX>SSG:NRS{level}<ETX>"
  params:
    - name: level
      type: string
      description: "OFF / AUT / LOW / MID / HIG"

- id: noise_reduction_query
  label: Noise Reduction Query
  kind: query
  command: "<STX>QSG:NRS<ETX>"
  params: []

- id: mpeg_noise_reduction_set
  label: MPEG Noise Reduction Set
  kind: action
  command: "<STX>SSG:MNR{level}<ETX>"
  params:
    - name: level
      type: string
      description: "OFF / LOW / MID / HIG"

- id: mpeg_noise_reduction_query
  label: MPEG Noise Reduction Query
  kind: query
  command: "<STX>QSG:MNR<ETX>"
  params: []

- id: signal_range_set
  label: Signal Range Set
  kind: action
  command: "<STX>SSG:HRC{range}<ETX>"
  params:
    - name: range
      type: string
      description: "VID (Video) / FUL (FULL) / AUT (Auto). HDMI: VID/FUL/AUT; DVI-D: VID/FUL; other inputs: not available."

- id: signal_range_query
  label: Signal Range Query
  kind: query
  command: "<STX>QSG:HRC<ETX>"
  params: []

- id: input_level_set
  label: Input Level Set
  kind: action
  command: "<STX>VWB:ILV{value}<ETX>"
  params:
    - name: value
      type: integer
      description: "-16..+16 (signed)"

- id: input_level_query
  label: Input Level Query
  kind: query
  command: "<STX>QWB:ILV<ETX>"
  params: []

# Color matching
- id: color_matching_set
  label: Color Matching Set
  kind: action
  command: "<STX>SSU:CMG{color}{testpat}{r}{g}{b}<ETX>"
  params:
    - name: color
      type: string
      description: "R / Y / G / C / B / M"
    - name: testpat
      type: string
      description: "0 (Off) / 1 (On, test pattern)"
    - name: r
      type: integer
      description: "R value 0000..2048"
    - name: g
      type: integer
      description: "G value 0000..2048"
    - name: b
      type: integer
      description: "B value 0000..2048"

- id: color_matching_query
  label: Color Matching Query
  kind: query
  command: "<STX>QSU:CMG<ETX>"
  params: []

- id: color_matching_reset
  label: Color Matching Reset
  kind: action
  command: "<STX>SSU:CGR<ETX>"
  params: []

# Screensaver
- id: screensaver_set
  label: Screensaver ON/OFF
  kind: action
  command: "<STX>OSP:SCR{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (stop) / 5 (operating)"

- id: screensaver_query
  label: Screensaver Query
  kind: query
  command: "<STX>QSP:SCR<ETX>"
  params: []

- id: screensaver_mode_set
  label: Screensaver Mode Set
  kind: action
  command: "<STX>SSC:MOD{mode}<ETX>"
  params:
    - name: mode
      type: string
      description: "0 (Off) / 1 (Interval) / 2 (Time Designation) / 3 (ON) / 4 (Standby after Screensaver)"

- id: screensaver_mode_query
  label: Screensaver Mode Query
  kind: query
  command: "<STX>QSC:MOD<ETX>"
  params: []

- id: screensaver_interval_set
  label: Interval Screensaver Set
  kind: action
  command: "<STX>SSC:INT{periodic}{op}<ETX>"
  params:
    - name: periodic
      type: integer
      description: "Periodic time HHMM (0000..2359)"
    - name: op
      type: integer
      description: "Operating time HHMM (0000..2359)"

- id: screensaver_interval_query
  label: Interval Screensaver Query
  kind: query
  command: "<STX>QSC:INT<ETX>"
  params: []

- id: screensaver_time_set
  label: Time Designation Screensaver Set
  kind: action
  command: "<STX>SSC:TIM{start}{finish}<ETX>"
  params:
    - name: start
      type: integer
      description: "Start time HHMM (0000..2359)"
    - name: finish
      type: integer
      description: "Finish time HHMM (0000..2359)"

- id: screensaver_time_query
  label: Time Designation Screensaver Query
  kind: query
  command: "<STX>QSC:TIM<ETX>"
  params: []

- id: screensaver_standby_set
  label: Standby after Screensaver Set
  kind: action
  command: "<STX>SSC:AOF{time}<ETX>"
  params:
    - name: time
      type: integer
      description: "Time of operation HHMM (0000..2359)"

- id: screensaver_standby_query
  label: Standby after Screensaver Query
  kind: query
  command: "<STX>QSC:AOF<ETX>"
  params: []

# Input Label
- id: input_label_current_set
  label: Set Label for Current Input
  kind: action
  command: "<STX>SSU:ILA{label}<ETX>"
  params:
    - name: label
      type: string
      description: "INP (reset, except PC) / PCN (reset, PC) / DV1 / DV2 / DV3 / BD1 / BD2 / BD3 / CTV / VCR / STB / SKP"

- id: input_label_current_query
  label: Current Input Label Query
  kind: query
  command: "<STX>QSU:ILA<ETX>"
  params: []

- id: input_label_each_set
  label: Set Label for Each Input
  kind: action
  command: "<STX>SSU:ILA{input}{label}<ETX>"
  params:
    - name: input
      type: string
      description: "HM1 / HM2 / DV1 / PC1 / VD1 / YP1"
    - name: label
      type: string
      description: "INP / DV1 / DV2 / DV3 / BD1 / BD2 / BD3 / CTV / VCR / STB / SKP"

- id: input_label_each_query
  label: Each Input Label Query
  kind: query
  command: "<STX>QSU:ILA{input}<ETX>"
  params:
    - name: input
      type: string
      description: "HM1 / HM2 / DV1 / PC1 / VD1 / YP1"

# Function Button Settings
- id: function_group_set
  label: Function Group Set
  kind: action
  command: "<STX>OSP:KGR{group}<ETX>"
  params:
    - name: group
      type: string
      description: "INP (INPUT) / MEM (MEMORY) / ACT (ACTION & MENU/SHORTCUT)"

- id: function_group_query
  label: Function Group Query
  kind: query
  command: "<STX>QSP:KGR<ETX>"
  params: []

- id: function_button_set
  label: Function Button Set
  kind: action
  command: "<STX>OSP:KFN{key}{action}<ETX>"
  params:
    - name: key
      type: string
      description: "Function key 0..9"
    - name: action
      type: string
      description: "SIG / SSV / SUT / LNS / ECO / OSH / DZM / MLT (INPUT group) or HM1/HM2/DV1/PC1/VD1/YP1/UD1 (INPUT group) or 0-9 digit (ACTION & MENU group)"

- id: function_button_query
  label: Function Button Query
  kind: query
  command: "<STX>QSP:KFN<ETX>"
  params: []

- id: function_guide_set
  label: Function Guide Set
  kind: action
  command: "<STX>OSP:KFG{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: function_guide_query
  label: Function Guide Query
  kind: query
  command: "<STX>QSP:KFG<ETX>"
  params: []

# Multi Display Setup
- id: multi_display_set
  label: Multi Display ON/OFF
  kind: action
  command: "<STX>MDC:{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: multi_display_detail_set
  label: Multi Display Setup Detail
  kind: action
  command: "<STX>MDC:EXP{state}{hscale}{vscale}{bezelh}{bezelv}{loc}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"
    - name: hscale
      type: integer
      description: "Horizontal scale 01..10 (USB input: 1..2)"
    - name: vscale
      type: integer
      description: "Vertical scale 01..10 (USB input: 1..2)"
    - name: bezelh
      type: integer
      description: "Bezel H adjustment 000..100"
    - name: bezelv
      type: integer
      description: "Bezel V adjustment 000..100"
    - name: loc
      type: string
      description: "Location A1..J10 (USB input: A1..B2)"

- id: multi_display_detail_query
  label: Multi Display Detail Query
  kind: query
  command: "<STX>QDC:EXP<ETX>"
  params: []

- id: frame_control_set
  label: Frame Control Set
  kind: action
  command: "<STX>MDC:FCT{mode}<ETX>"
  params:
    - name: mode
      type: string
      description: "0 (Auto) / 1 / 2 / 3 / 4 / 5"

- id: frame_control_query
  label: Frame Control Query
  kind: query
  command: "<STX>QDC:FCT<ETX>"
  params: []

- id: reverse_scan_set
  label: Reverse Scan Set
  kind: action
  command: "<STX>MDC:RVS{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: reverse_scan_query
  label: Reverse Scan Query
  kind: query
  command: "<STX>QDC:RVS<ETX>"
  params: []

# Timer Setup
- id: timer_program_set
  label: Timer Program Set
  kind: action
  command: "<STX>TIM:PRG{prog}{function}{day}{action}{time}{input}<ETX>"
  params:
    - name: prog
      type: integer
      description: "Program number 01..20"
    - name: function
      type: string
      description: "0 (Off) / 1 (On)"
    - name: day
      type: string
      description: "SUN / MON / TUE / WED / THU / FRI / SAT / EVD (Everyday)"
    - name: action
      type: string
      description: "PON / POF"
    - name: time
      type: integer
      description: "HHMM (0000..2359)"
    - name: input
      type: string
      description: "Startup input HM1 / HM2 / DV1 / PC1 / VD1 / YP1 / UD1"

- id: timer_program_query
  label: Timer Program Query
  kind: query
  command: "<STX>QIM:PRG{prog}<ETX>"
  params:
    - name: prog
      type: integer
      description: "Program number 01..20"

- id: present_day_query
  label: Present Day Query
  kind: query
  command: "<STX>QIM:DAY<ETX>"
  params: []
  # Reply: QIM:DAY{SUN|MON|TUE|WED|THU|FRI|SAT}

- id: present_time_query
  label: Present Time Query
  kind: query
  command: "<STX>QIM:NOW<ETX>"
  params: []
  # Reply: QIM:NOW0HHMM (HHMM 0000..2359)

- id: day_time_set
  label: Day/Time Set
  kind: action
  command: "<STX>TIM:DAT{YYYY}{MM}{DD}{hh}{mm}<ETX>"
  params:
    - name: YYYY
      type: integer
      description: "Year 2015..2099"
    - name: MM
      type: integer
      description: "Month 01..12"
    - name: DD
      type: integer
      description: "Day 01..31"
    - name: hh
      type: integer
      description: "Hour 00..23"
    - name: mm
      type: integer
      description: "Minute 00..59"

- id: day_time_query
  label: Day/Time Query
  kind: query
  command: "<STX>QIM:DAT<ETX>"
  params: []

# USB media player
- id: usb_media_player_set
  label: USB Media Player Enable
  kind: action
  command: "<STX>SUS:UMP{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Disable) / 1 (Enable)"

- id: usb_media_player_query
  label: USB Media Player Query
  kind: query
  command: "<STX>QUS:UMP<ETX>"
  params: []

- id: resume_play_set
  label: Resume Play Set
  kind: action
  command: "<STX>SUS:RSP{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: resume_play_query
  label: Resume Play Query
  kind: query
  command: "<STX>QUS:RSP<ETX>"
  params: []

- id: slide_show_duration_set
  label: Slide Show Duration Set
  kind: action
  command: "<STX>SUS:SSD{seconds}<ETX>"
  params:
    - name: seconds
      type: integer
      description: "010..600 seconds (5-second unit)"

- id: slide_show_duration_query
  label: Slide Show Duration Query
  kind: query
  command: "<STX>QUS:SSD<ETX>"
  params: []

# Options Menu
- id: osd_set
  label: On Screen Display Set
  kind: action
  command: "<STX>OSP:OSD{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: osd_query
  label: On Screen Display Query
  kind: query
  command: "<STX>QSP:OSD<ETX>"
  params: []

- id: initial_input_set
  label: Initial Input Set
  kind: action
  command: "<STX>OSP:IIN{input}<ETX>"
  params:
    - name: input
      type: string
      description: "OFF / HM1 / HM2 / DV1 / PC1 / VD1 / YP1 / UD1"

- id: initial_input_query
  label: Initial Input Query
  kind: query
  command: "<STX>QSP:IIN<ETX>"
  params: []

- id: initial_volume_set
  label: Initial VOL Level Set
  kind: action
  command: "<STX>OSP:IVL{function}{volume}<ETX>"
  params:
    - name: function
      type: string
      description: "0 (Off) / 1 (On)"
    - name: volume
      type: integer
      description: "000..100 (zero-padded 3 digits)"

- id: initial_volume_query
  label: Initial VOL Level Query
  kind: query
  command: "<STX>QSP:IVL<ETX>"
  params: []

- id: maximum_volume_set
  label: Maximum VOL Level Set
  kind: action
  command: "<STX>OSP:MVL{function}{volume}<ETX>"
  params:
    - name: function
      type: string
      description: "0 (Off) / 1 (On)"
    - name: volume
      type: integer
      description: "000..100 (zero-padded 3 digits)"

- id: maximum_volume_query
  label: Maximum VOL Level Query
  kind: query
  command: "<STX>QSP:MVL<ETX>"
  params: []

- id: input_lock_set
  label: Input Lock Set
  kind: action
  command: "<STX>OSP:INL{input}<ETX>"
  params:
    - name: input
      type: string
      description: "OFF / HM1 / HM2 / DV1 / PC1 / VD1 / YP1 / UD1"

- id: input_lock_query
  label: Input Lock Query
  kind: query
  command: "<STX>QSP:INL<ETX>"
  params: []

- id: button_lock_set
  label: Button Lock Set
  kind: action
  command: "<STX>OSP:BTL{mode}<ETX>"
  params:
    - name: mode
      type: string
      description: "OFF / MEN (MENU&ENTER) / ALL (ON)"

- id: button_lock_query
  label: Button Lock Query
  kind: query
  command: "<STX>QSP:BTL<ETX>"
  params: []

- id: controller_user_level_set
  label: Controller User Level Set
  kind: action
  command: "<STX>OSP:RCM{level}<ETX>"
  params:
    - name: level
      type: string
      description: "0 (Off) / 1 (User1) / 2 (User2) / 3 (User3)"

- id: controller_user_level_query
  label: Controller User Level Query
  kind: query
  command: "<STX>QSP:RCM<ETX>"
  params: []

- id: pc_auto_setting_set
  label: PC Auto Setting Set
  kind: action
  command: "<STX>OSP:PAS{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: pc_auto_setting_query
  label: PC Auto Setting Query
  kind: query
  command: "<STX>QSP:PAS<ETX>"
  params: []

- id: offtimer_set
  label: Off Timer Set
  kind: action
  command: "<STX>OSP:OFT{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: offtimer_query
  label: Off Timer Query
  kind: query
  command: "<STX>QSP:OFT<ETX>"
  params: []

- id: initial_startup_set
  label: Initial Startup Set
  kind: action
  command: "<STX>OSP:ISU{mode}<ETX>"
  params:
    - name: mode
      type: string
      description: "LST (Last memory) / PON (ON) / STB (STANDBY)"

- id: initial_startup_query
  label: Initial Startup Query
  kind: query
  command: "<STX>QSP:ISU<ETX>"
  params: []

- id: startup_logo_set
  label: Startup Logo Set
  kind: action
  command: "<STX>OSP:LOG{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: startup_logo_query
  label: Startup Logo Query
  kind: query
  command: "<STX>QSP:LOG<ETX>"
  params: []

- id: lan_control_protocol_set
  label: LAN Control Protocol Set
  kind: action
  command: "<STX>OSP:LPN{proto}<ETX>"
  params:
    - name: proto
      type: string
      description: "LP1 (Protocol 1) / LP2 (Protocol 2)"

- id: lan_control_protocol_query
  label: LAN Control Protocol Query
  kind: query
  command: "<STX>QSP:LPN<ETX>"
  params: []

- id: clock_display_set
  label: Clock Display Set
  kind: action
  command: "<STX>OSP:CLK{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: clock_display_query
  label: Clock Display Query
  kind: query
  command: "<STX>QSP:CLK<ETX>"
  params: []

- id: no_activity_power_off_msg_set
  label: No Activity Power Off Message Set
  kind: action
  command: "<STX>OSP:NAP{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: no_activity_power_off_msg_query
  label: No Activity Power Off Message Query
  kind: query
  command: "<STX>QSP:NAP<ETX>"
  params: []

- id: power_management_msg_set
  label: Power Management Message Set
  kind: action
  command: "<STX>OSP:PMM{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"

- id: power_management_msg_query
  label: Power Management Message Query
  kind: query
  command: "<STX>QSP:PMM<ETX>"
  params: []

# Input search
- id: input_search_set
  label: Input Search Set
  kind: action
  command: "<STX>ISH:FNC{mode}<ETX>"
  params:
    - name: mode
      type: string
      description: "OFF / ALL (all inputs) / PRI (custom)"

- id: input_search_query
  label: Input Search Query
  kind: query
  command: "<STX>QSH:FNC<ETX>"
  params: []

- id: input_search_first_set
  label: 1st Search Input Set
  kind: action
  command: "<STX>ISH:PRI{input}<ETX>"
  params:
    - name: input
      type: string
      description: "NON / HM1 / HM2 / DV1 / PC1 / YP1 / VD1 / UD1"

- id: input_search_first_query
  label: 1st Search Input Query
  kind: query
  command: "<STX>QSH:PRI<ETX>"
  params: []

- id: input_search_second_set
  label: 2nd Search Input Set
  kind: action
  command: "<STX>ISH:SCI{input}<ETX>"
  params:
    - name: input
      type: string
      description: "NON / HM1 / HM2 / DV1 / PC1 / YP1 / VD1 / UD1"

- id: input_search_second_query
  label: 2nd Search Input Query
  kind: query
  command: "<STX>QSH:SCI<ETX>"
  params: []

# Failover / Failback
- id: failover_off
  label: Input Change Mode Off
  kind: action
  command: "<STX>SBI:OFF(NON NON 0)<ETX>"
  params: []

- id: failover_quick_set
  label: Input Change Mode Quick
  kind: action
  command: "<STX>SBI:QIC({primary}{secondary}{mode})<ETX>"
  params:
    - name: primary
      type: string
      description: "Primary backup input: NON / HM1 / HM2 / DV1"
    - name: secondary
      type: string
      description: "Secondary backup input: NON / HM1 / HM2 / DV1"
    - name: mode
      type: string
      description: "0 (Disable auto switch back) / 1 (Enable auto switch back)"

- id: failover_normal_set
  label: Input Change Mode Normal
  kind: action
  command: "<STX>SBI:NOR({primary}{secondary}{mode})<ETX>"
  params:
    - name: primary
      type: string
      description: "Primary backup input: NON / HM1 / HM2 / DV1 / PC1 / YP1 / VD1 / UD1"
    - name: secondary
      type: string
      description: "Secondary backup input: NON / HM1 / HM2 / DV1 / PC1 / YP1 / VD1 / UD1"
    - name: mode
      type: string
      description: "0 (Disable auto switch back) / 1 (Enable auto switch back)"

- id: failover_state_query
  label: Backup Input Status Query
  kind: query
  command: "<STX>QBI:STS<ETX>"
  params: []
  # Reply: QBI:STS{status}{main_input}{current_input_status}
  # status: 0=inactive / 1=active; main_input: HM1/HM2/DV1/PC1/YP1/VD1/UD1
  # current_input_status: 0=Main / 1=Primary Backup / 2=Secondary Backup

- id: failover_signal_query
  label: Backup Input Signal Status Query
  kind: query
  command: "<STX>QBI:SIG<ETX>"
  params: []
  # Reply: QBI:SIG{main}{primary}{secondary} - 0=no signal / 1=signal present

- id: changing_mode_set
  label: Changing Mode Set
  kind: action
  command: "<STX>SBI:CHM{mode}<ETX>"
  params:
    - name: mode
      type: string
      description: "2 (High speed) / 1 (Normal speed). Adjustable only when Quick is selected."

- id: changing_mode_query
  label: Changing Mode Query
  kind: query
  command: "<STX>QBI:CHM<ETX>"
  params: []

- id: manual_switch_back
  label: Manual Switch Back
  kind: action
  command: "<STX>BIP:FSB<ETX>"
  params: []
  # Enable when Input change mode is not Off and Auto switch back mode is Disable.

# Audio input select
- id: audio_input_current_set
  label: Audio Input Select (Current)
  kind: action
  command: "<STX>SAI:A{audio}<ETX>"
  params:
    - name: audio
      type: string
      description: "HM1 / HM2 / PC1 / VD1 / NAD (NO AUDIO)"

- id: audio_input_current_query
  label: Audio Input Select (Current) Query
  kind: query
  command: "<STX>QAI<ETX>"
  params: []
  # Reply: QAI:V{input}A{audio}

- id: audio_input_each_set
  label: Audio Input Select (Each)
  kind: action
  command: "<STX>SAI:V{input}A{audio}<ETX>"
  params:
    - name: input
      type: string
      description: "HM1 / HM2 / DV1 / PC1 / YP1 / VD1"
    - name: audio
      type: string
      description: "HM1 / HM2 / PC1 / VD1 / NAD (NO AUDIO)"

- id: audio_input_each_query
  label: Audio Input Select (Each) Query
  kind: query
  command: "<STX>QAI:V{input}<ETX>"
  params:
    - name: input
      type: string
      description: "HM1 / HM2 / DV1 / PC1 / YP1 / VD1"

# Information Timing
- id: no_signal_warning_set
  label: No Signal Warning Set
  kind: action
  command: "<STX>SIT:NSW{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On). When On, display sends QST:NSW* on no-signal detection."

- id: no_signal_warning_query
  label: No Signal Warning Query
  kind: query
  command: "<STX>QIT:NSW<ETX>"
  params: []

- id: no_signal_warning_timing_set
  label: No Signal Warning Timing Set
  kind: action
  command: "<STX>SIT:SWT{minutes}<ETX>"
  params:
    - name: minutes
      type: integer
      description: "01..60 minutes (zero-padded 2 digits)"

- id: no_signal_warning_timing_query
  label: No Signal Warning Timing Query
  kind: query
  command: "<STX>QIT:SWT<ETX>"
  params: []

- id: no_signal_error_set
  label: No Signal Error Set
  kind: action
  command: "<STX>SIT:NSE{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On). When On, display sends QST:NSE* on no-signal error."

- id: no_signal_error_query
  label: No Signal Error Query
  kind: query
  command: "<STX>QIT:NSE<ETX>"
  params: []

- id: no_signal_error_timing_set
  label: No Signal Error Timing Set
  kind: action
  command: "<STX>SIT:SET{minutes}<ETX>"
  params:
    - name: minutes
      type: integer
      description: "01..90 minutes (zero-padded 2 digits)"

- id: no_signal_error_timing_query
  label: No Signal Error Timing Query
  kind: query
  command: "<STX>QIT:SET<ETX>"
  params: []

- id: temperature_warning_set
  label: Temperature Warning Set
  kind: action
  command: "<STX>SIT:TPW{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On). When On, display sends QST:TO* on temperature warning."

- id: temperature_warning_query
  label: Temperature Warning Query
  kind: query
  command: "<STX>QIT:TPW<ETX>"
  params: []

- id: temperature_status_query
  label: Temperature Status Query
  kind: query
  command: "<STX>QST:TO<ETX>"
  params: []
  # Reply: QST:TO* - 0=NORMAL-MODE / 1=HIGH TEMPERATURE-MODE

# Others
- id: recall
  label: Recall Display
  kind: action
  command: "<STX>DDS<ETX>"
  params: []

- id: audio_mute_set_via_aoc
  label: Audio Mute (AOC)
  kind: action
  command: "<STX>AOC:{state}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (MUTE OFF) / 1 (MUTE ON)"

- id: osd_clear
  label: OSD Clear
  kind: action
  command: "<STX>VDO<ETX>"
  params: []

- id: digital_zoom
  label: Digital Zoom
  kind: action
  command: "<STX>DZM:{state}{enlarge}{hpos}{vpos}<ETX>"
  params:
    - name: state
      type: string
      description: "0 (Off) / 1 (On)"
    - name: enlarge
      type: string
      description: "Enlargement factor 1..4"
    - name: hpos
      type: string
      description: "Horizontal position 1..5"
    - name: vpos
      type: string
      description: "Vertical position 1..5"

- id: digital_zoom_query
  label: Digital Zoom Query
  kind: query
  command: "<STX>QDZ<ETX>"
  params: []

- id: off_timer_set
  label: Off Timer Set
  kind: action
  command: "<STX>ZOT:{minutes}<ETX>"
  params:
    - name: minutes
      type: integer
      description: "00..90 minutes (zero-padded 2 digits)"

- id: usb_skip_next
  label: USB Media Player - Skip Next
  kind: action
  command: "<STX>UMP:NXT<ETX>"
  params: []

- id: usb_skip_previous
  label: USB Media Player - Skip Previous
  kind: action
  command: "<STX>UMP:PRE<ETX>"
  params: []

- id: usb_replay
  label: USB Media Player - Replay
  kind: action
  command: "<STX>UMP:RPY<ETX>"
  params: []

- id: signal_frequency_query
  label: Signal Frequency Query
  kind: query
  command: "<STX>QFR<ETX>"
  params: []
  # Reply: QFR:H***.**V***.** (Hz / Hz, two decimal places)

- id: signal_format_query
  label: Signal Format Query
  kind: query
  command: "<STX>QSF<ETX>"
  params: []
  # Reply: QSF:******************** (max 20 characters)

- id: auto_command_send_set
  label: Auto Command Send Setting
  kind: action
  command: "<STX>RCM:{a}{b}<ETX>"
  params:
    - name: a
      type: string
      description: "0 (QSS off) / 1 (QSS on)"
    - name: b
      type: string
      description: "0 (QSS:STSERR off) / 1 (QSS:STSERR on)"

- id: model_name_query
  label: Model Name Query
  kind: query
  command: "<STX>QMN<ETX>"
  params: []
  # Reply: QMN:55F13  (55 inch / FHD / LFV60 or LFV6)

- id: model_query
  label: Model Query
  kind: query
  command: "<STX>QID<ETX>"
  params: []
  # Reply: QID:55.LFV60 or LFV6.{J|U|W|C}  (55 inch / model / market)

- id: software_version_main_query
  label: Software Version (Main MCU) Query
  kind: query
  command: "<STX>QRV<ETX>"
  params: []
  # Reply: QRV:*.****{LFV60|LFV6}

- id: software_version_sub_query
  label: Software Version (Sub MCU) Query
  kind: query
  command: "<STX>QRV:STB<ETX>"
  params: []
  # Reply: QRV:STB**.**

- id: software_version_eeprom_query
  label: Software Version (EEPROM) Query
  kind: query
  command: "<STX>QRV:EEP<ETX>"
  params: []
  # Reply: QRV:EEP**.

- id: serial_number_query
  label: Serial Number Query
  kind: query
  command: "<STX>QSN<ETX>"
  params: []
  # Reply: QSN:*****{9..15 ASCII chars from 0x30-0x39, 0x41-0x5A, 0x20, 0x2D}

- id: sos_history_query
  label: SOS History Query
  kind: query
  command: "<STX>QSS<ETX>"
  params: []
  # Reply: QSS:6 hex bytes (00..FF), counter + last 5 SOS classifications

- id: sos_status_query
  label: SOS Status Query
  kind: query
  command: "<STX>QSS:STS<ETX>"
  params: []
  # Reply: QSS:STS{NON|ERR|EXT}  (no history / SOS generating / history exists)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
  source: QPW reply (0=standby, 1=on)

- id: current_input
  type: enum
  values: [HM1, HM2, DV1, PC1, VD1, UD1]
  source: QMI reply

- id: audio_volume
  type: integer
  range: 0..100
  source: QAV reply

- id: audio_mute
  type: enum
  values: [off, on]
  source: QAM reply (0=off, 1=on)

- id: video_mute
  type: enum
  values: [off, on]
  source: QVM reply (0=off, 1=on)

- id: aspect
  type: enum
  values: [FULL, NORM, ZOOM, ZOM2]
  source: QAS reply

- id: picture_mode
  type: enum
  values: [VIV, NAT, STD, SUV, GRH, DCM]
  source: QPC:MEN reply

- id: backlight
  type: integer
  range: 0..100
  source: QPC:BLT reply

- id: contrast
  type: integer
  range: 0..100
  source: QPC:PIC reply

- id: brightness
  type: integer
  range: 0..100
  source: QPC:BLK reply

- id: color
  type: integer
  range: 0..100
  source: QPC:COL reply

- id: tint
  type: integer
  range: 0..100
  source: QPC:TIN reply

- id: sharpness
  type: integer
  range: 0..100
  source: QPC:SHP reply

- id: enhance_level
  type: enum
  values: ["1", "2"]
  source: QPC:SHE reply (1=low, 2=high)

- id: gamma
  type: enum
  values: [20, 22, 24, 26, DC]
  source: QWB:GMM reply

- id: color_temperature
  type: enum
  values: [032, 040, 050, 065, 075, 093, 107, NTV, U01, U02]
  source: QPC:TMP reply

- id: red_gain
  type: integer
  range: 0..255
  source: QWB:RGN reply

- id: green_gain
  type: integer
  range: 0..255
  source: QWB:GGN reply

- id: blue_gain
  type: integer
  range: 0..255
  source: QWB:BGN reply

- id: red_bias
  type: integer
  range: -127..128
  source: QWB:RBS reply

- id: green_bias
  type: integer
  range: -127..128
  source: QWB:GBS reply

- id: blue_bias
  type: integer
  range: -127..128
  source: QWB:BBS reply

- id: dynamic_contrast
  type: integer
  range: 0..10
  source: QPC:DCO reply

- id: color_enhancement
  type: enum
  values: [off, low, mid, high]
  source: QPC:PAJ reply (0/1/2/3)

- id: refine_enhancer
  type: enum
  values: [off, low, mid, high]
  source: QPC:SRC reply (0/1/2/3)

- id: gradation_smoother
  type: enum
  values: [off, on]
  source: QPC:GRS reply (0/1)

- id: memory_state
  type: array
  description: 8 slots; '-' = unused, '0' = used (Memory No.1..8)
  source: QPF:STA reply

- id: output_select
  type: enum
  values: [SPO, LNO]
  source: QAC:OUT reply (SPO=speakers, LNO=audio out)

- id: sound_mode
  type: enum
  values: [STD, DYN, CLR]
  source: QAC:MEN reply

- id: bass
  type: integer
  range: -20..20
  source: QAC:BAS reply

- id: treble
  type: integer
  range: -20..20
  source: QAC:TRE reply

- id: balance
  type: integer
  range: -20..20
  source: QAC:BAL reply

- id: surround
  type: enum
  values: [on, off]
  source: QAC:SUR reply (MON/OFF)

- id: hpos
  type: integer
  range: -100..100
  source: QGE:HPO reply

- id: hsize
  type: integer
  range: -100..100
  source: QGE:HSZ reply

- id: vpos
  type: integer
  range: -100..100
  source: QGE:VPO reply

- id: vsize
  type: integer
  range: -100..100
  source: QGE:VSZ reply

- id: clock_phase
  type: integer
  range: 0..30
  source: QGE:CLK reply

- id: dot_clock
  type: integer
  range: -5..5
  source: QGE:DCL reply

- id: dot_by_dot
  type: enum
  values: [off, on]
  source: QGE:DBD reply

- id: overscan
  type: enum
  values: [off, on]
  source: QGE:OVS reply

- id: auto_setup_result
  type: enum
  values: [OK, NG, OF, NW]
  source: QGE:ASU reply

- id: wobbling
  type: enum
  values: [off, on]
  source: QSP:WOB reply

- id: no_activity_power_off
  type: enum
  values: [off, on]
  source: QSU:NAO reply

- id: power_on_screen_delay
  type: string
  description: AT or 00..30 seconds
  source: QSP:POD reply

- id: osd_language
  type: enum
  values: [ENG, DEU, FRA, ITL, ESP, USA, CHA, JPN, RUS]
  source: QSU:LNG reply

- id: power_management_mode
  type: enum
  values: [custom, on]
  source: QSU:ECS reply (0/1)

- id: no_signal_power_off
  type: enum
  values: [off, on]
  source: QSU:AOF reply

- id: pc_power_management
  type: enum
  values: [off, on]
  source: QSU:DPM reply

- id: dvi_d1_power_management
  type: enum
  values: [off, on]
  source: QSU:D1V reply

- id: hdmi1_power_management
  type: enum
  values: [off, on]
  source: QSU:D1H reply

- id: hdmi2_power_management
  type: enum
  values: [off, on]
  source: QSU:D2H reply

- id: power_save
  type: enum
  values: [off, on]
  source: QSU:ECO reply

- id: display_orientation
  type: enum
  values: [landscape, portrait]
  source: QSU:DOR reply

- id: menu_position
  type: enum
  values: [upper_left, upper_right, center, lower_left, lower_right]
  source: QSU:OPS reply (1..5)

- id: menu_duration
  type: integer
  range: 5..180
  description: seconds (5-second unit)
  source: QSU:MDT reply

- id: menu_transparency
  type: integer
  range: 0..100
  description: percent (10% unit)
  source: QSU:MTL reply

- id: network_config
  type: string
  description: IP/subnet/gateway bytes + DHCP flag
  source: QSU:NET reply (13 fields, 3 bytes each)

- id: lan_port
  type: integer
  range: 1024..65535
  description: excludes 4352, 10000, 20000, 41794
  source: QSU:LCP reply

- id: display_name
  type: string
  description: max 8 chars from documented set
  source: QSU:LDN reply

- id: amx_dd
  type: enum
  values: [off, on]
  source: QSU:ADD reply

- id: crestron_connected
  type: enum
  values: [off, on]
  source: QSU:CRV reply

- id: display_id
  type: integer
  range: 0..100
  source: QID:DID reply

- id: serial_id_function
  type: enum
  values: [off, on]
  source: QID:SID reply

- id: serial_response_id_all
  type: enum
  values: [off, on]
  source: QCT:RIA reply

- id: serial_id_group
  type: enum
  values: [A, B, C, D, E, F, G]
  source: QCT:SIG reply

- id: serial_response_id_group
  type: enum
  values: [off, on]
  source: QCT:RIG reply

- id: daisy_chain_position
  type: enum
  values: [TOP, DEF, END]
  source: QCT:DCP reply

- id: serial_id_setup
  type: string
  description: "{function}{id}" (function 0/1, id 000..100)
  source: QIF reply

- id: multi_control_auto_setting
  type: string
  description: "Display ID + Network control state (0/1)"
  source: QID:AUS reply

- id: component_rgb_in_select
  type: enum
  values: [YBR, RGB]
  source: QSU:CMP reply

- id: yuv_rgb_in_select
  type: enum
  values: [YUV, RGB]
  source: QSU:DYR reply

- id: yc_filter
  type: enum
  values: [off, on]
  source: QSG:YCS reply

- id: color_system
  type: enum
  values: [NTS, PAL, SCM, 4NT, MPA, NPA, AUT]
  source: QSG:COS reply

- id: sync_signal
  type: enum
  values: [HAV, GRN, HVS]
  source: QSG:SNC reply

- id: cinema_reality
  type: enum
  values: [off, on]
  source: QSG:DCR reply

- id: xga_mode
  type: enum
  values: ["1024x768", "1280x768", "1366x768", auto]
  source: QSG:XGA reply (1..4)

- id: noise_reduction
  type: enum
  values: [OFF, AUT, LOW, MID, HIG]
  source: QSG:NRS reply

- id: mpeg_noise_reduction
  type: enum
  values: [OFF, LOW, MID, HIG]
  source: QSG:MNR reply

- id: signal_range
  type: enum
  values: [VID, FUL, AUT]
  source: QSG:HRC reply

- id: input_level
  type: integer
  range: -16..16
  source: QWB:ILV reply

- id: color_matching
  type: string
  description: per-color R/G/B values 0..2048 + test-pattern flag
  source: QSU:CMG reply

- id: screensaver
  type: enum
  values: [stop, operating]
  source: QSP:SCR reply (0/5)

- id: screensaver_mode
  type: enum
  values: [off, interval, time_designation, on, standby_after]
  source: QSC:MOD reply (0..4)

- id: screensaver_interval
  type: string
  description: "{periodic_HHMM}{op_HHMM}"
  source: QSC:INT reply

- id: screensaver_time
  type: string
  description: "{start_HHMM}{finish_HHMM}"
  source: QSC:TIM reply

- id: screensaver_standby
  type: string
  description: "HHMM"
  source: QSC:AOF reply

- id: input_label_current
  type: enum
  values: [INP, PCN, DV1, DV2, DV3, BD1, BD2, BD3, CTV, VCR, STB, SKP]
  source: QSU:ILA reply

- id: input_label_each
  type: string
  description: "{input}{label}"
  source: QSU:ILA{input} reply

- id: function_group
  type: enum
  values: [INP, MEM, ACT]
  source: QSP:KGR reply

- id: function_button
  type: string
  description: "{key}{action}"
  source: QSP:KFN reply

- id: function_guide
  type: enum
  values: [off, on]
  source: QSP:KFG reply

- id: multi_display_detail
  type: string
  description: "state,hscale,vscale,bezelh,bezelv,location"
  source: QDC:EXP reply

- id: frame_control
  type: enum
  values: [auto, "1", "2", "3", "4", "5"]
  source: QDC:FCT reply (0..5)

- id: reverse_scan
  type: enum
  values: [off, on]
  source: QDC:RVS reply

- id: timer_program
  type: string
  description: "program,function,day,action,time,input"
  source: QIM:PRG reply

- id: present_day
  type: enum
  values: [SUN, MON, TUE, WED, THU, FRI, SAT]
  source: QIM:DAY reply

- id: present_time
  type: string
  description: "HHMM (0000..2359)"
  source: QIM:NOW reply

- id: day_time
  type: string
  description: "YYYYMMDDhhmm"
  source: QIM:DAT reply

- id: usb_media_player
  type: enum
  values: [disabled, enabled]
  source: QUS:UMP reply

- id: resume_play
  type: enum
  values: [off, on]
  source: QUS:RSP reply

- id: slide_show_duration
  type: integer
  range: 10..600
  description: seconds (5-second unit)
  source: QUS:SSD reply

- id: osd
  type: enum
  values: [off, on]
  source: QSP:OSD reply

- id: initial_input
  type: enum
  values: [off, HM1, HM2, DV1, PC1, VD1, YP1, UD1]
  source: QSP:IIN reply

- id: initial_volume
  type: string
  description: "function(0/1),volume(000..100)"
  source: QSP:IVL reply

- id: maximum_volume
  type: string
  description: "function(0/1),volume(000..100)"
  source: QSP:MVL reply

- id: input_lock
  type: enum
  values: [off, HM1, HM2, DV1, PC1, VD1, YP1, UD1]
  source: QSP:INL reply

- id: button_lock
  type: enum
  values: [off, MEN, ALL]
  source: QSP:BTL reply

- id: controller_user_level
  type: enum
  values: [off, user1, user2, user3]
  source: QSP:RCM reply (0..3)

- id: pc_auto_setting
  type: enum
  values: [off, on]
  source: QSP:PAS reply

- id: offtimer_function
  type: enum
  values: [off, on]
  source: QSP:OFT reply

- id: initial_startup
  type: enum
  values: [LST, PON, STB]
  source: QSP:ISU reply

- id: startup_logo
  type: enum
  values: [off, on]
  source: QSP:LOG reply

- id: lan_control_protocol
  type: enum
  values: [LP1, LP2]
  source: QSP:LPN reply

- id: clock_display
  type: enum
  values: [off, on]
  source: QSP:CLK reply

- id: no_activity_power_off_msg
  type: enum
  values: [off, on]
  source: QSP:NAP reply

- id: power_management_msg
  type: enum
  values: [off, on]
  source: QSP:PMM reply

- id: input_search
  type: enum
  values: [off, ALL, PRI]
  source: QSH:FNC reply

- id: input_search_first
  type: enum
  values: [NON, HM1, HM2, DV1, PC1, YP1, VD1, UD1]
  source: QSH:PRI reply

- id: input_search_second
  type: enum
  values: [NON, HM1, HM2, DV1, PC1, YP1, VD1, UD1]
  source: QSH:SCI reply

- id: backup_input_status
  type: string
  description: "status(0/1) main_input current_input_status(0/1/2)"
  source: QBI:STS reply

- id: backup_input_signal
  type: string
  description: "main primary secondary - 0=no signal / 1=signal"
  source: QBI:SIG reply

- id: changing_mode
  type: enum
  values: [high_speed, normal_speed]
  source: QBI:CHM reply (2/1)

- id: audio_input_current
  type: string
  description: "V{input}A{audio}"
  source: QAI reply

- id: audio_input_each
  type: string
  description: "V{input}A{audio}"
  source: QAI:V{input} reply

- id: no_signal_warning_timing
  type: integer
  range: 1..60
  description: minutes
  source: QIT:SWT reply

- id: no_signal_error_timing
  type: integer
  range: 1..90
  description: minutes
  source: QIT:SET reply

- id: signal_frequency
  type: string
  description: "H***.**V***.** Hz"
  source: QFR reply

- id: signal_format
  type: string
  description: max 20 chars
  source: QSF reply

- id: model_name
  type: string
  description: "QMN:55F13 (55 inch / FHD / LFV60 or LFV6)"
  source: QMN reply

- id: model_id
  type: string
  description: "55.{LFV60|LFV6}.{J|U|W|C}"
  source: QID reply

- id: software_version_main
  type: string
  description: "*.**** + model suffix"
  source: QRV reply

- id: software_version_sub
  type: string
  description: "**.**"
  source: QRV:STB reply

- id: software_version_eeprom
  type: string
  description: "**.**"
  source: QRV:EEP reply

- id: serial_number
  type: string
  description: 9..15 ASCII chars from 0x30-0x39, 0x41-0x5A, 0x20, 0x2D
  source: QSN reply

- id: sos_history
  type: string
  description: "6 hex bytes; counter + last 5 SOS classifications"
  source: QSS reply

- id: sos_status
  type: enum
  values: [no_history, generating, history_exists]
  source: QSS:STS reply (NON/ERR/EXT)
```

## Variables
```yaml
# No long-lived client-side variables in the protocol. All state is queried
# server-side via the Q* commands documented in Feedbacks above.
```

## Events
```yaml
# When the corresponding warning/error feature is enabled in the OSD menu
# and "Auto Command Send Setting" (RCM) is set, the display automatically
# emits these messages over the serial / LAN control link.

- id: no_signal_warning_event
  trigger: SIT:NSW=1
  message: "QST:NSW{0|1}"  # 0=normal, 1=No Signal Warning
  source: Information Timing section

- id: no_signal_error_event
  trigger: SIT:NSE=1
  message: "QST:NSE{0|1}"  # 0=normal, 1=No Signal Error
  source: Information Timing section

- id: temperature_warning_event
  trigger: SIT:TPW=1
  message: "QST:TO{0|1}"  # 0=NORMAL-MODE, 1=HIGH TEMPERATURE-MODE
  source: Information Timing section

- id: sos_event
  trigger: SOS detected at runtime
  message: "QSS:STS{NON|ERR|EXT}"  # emitted via RCM auto-send
  source: QSS:STS reply
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements
```

## Notes
<!-- UNRESOLVED: LAN TCP port — the SSU:LCP command accepts ports 1024..65535 with several exclusions, but the factory default port is not stated in the source. -->
<!-- UNRESOLVED: LAN framing above TCP — the source documents the same ASCII opcode set for LAN as for RS-232C, but the LAN transport wrapper (TCP framing, connection lifecycle) is not described. -->
<!-- UNRESOLVED: the difference between "Protocol1" and "Protocol2" (LP1 / LP2) under LAN control is not described. -->
<!-- UNRESOLVED: maximum end-to-end cable length for RS-232C is not stated. -->

- Command framing (RS-232C): every command and reply is wrapped as `<STX>...<ETX>`. STX = 0x02, ETX = 0x03. The 3-character opcode follows STX; if parameters are present, they are introduced by `:` (0x3A). Example — Power On: `02 50 4F 4E 03` (STX 'P' 'O' 'N' ETX). Picture Contrast 85: `02 56 50 43 3A 50 49 43 30 38 35 03`.
- Display-ID addressing: prepend `<STX>AD94;RAD:{3-char ID or group};` before the command. Serial ID is `000`..`100` (3 characters, zero-padded). Group ID is three of the same letter A..G (e.g. `AAA`). `000` matches any display. `[Serial ID function]` must be On for ID-tagged commands to be honored.
- Daisy chaining: set `[Serial daisy chain position]` per display (TOP / DEF / END) and use a straight cable for the daisy chain with pin ②..⑧ hard-wired.
- Error reply for unknown / invalid command: `ER401`.
- In standby the display only accepts `PON` and `QPW`; the host must wait for the reply of each command before sending the next.
- Reply prefixes mirror command prefixes: control commands whose mnemonic starts with the letter group `P` query with `QPW`/`QPC`/`QPF`/`QPV` etc., `A*` control → `QA*` query, `V*`/`DGE`/`VWB`/`SSP` → `Q*` query of the same form. The pattern is not perfectly consistent (e.g. `IMS`→`QMI`, `SBI`→`QBI`); always consult the command list before assuming.
- The "Auto Command Send Setting" (`RCM`) controls whether the unsolicited `QST:NSW*`, `QST:NSE*`, `QST:TO*`, and `QSS:STS*` messages are auto-emitted on the control link.

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
  - pna-b2b-storage-mkt.s3.amazonaws.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LFV6_60_SerialCommandList.pdf
  - https://pna-b2b-storage-mkt.s3.amazonaws.com/production/266931_cq1_SerialCommandList_u_en.pdf
  - https://docs.connect.panasonic.com/prodisplays/
retrieved_at: 2026-05-13T11:24:04.598Z
last_checked_at: 2026-06-02T04:56:34.018Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T04:56:34.018Z
matched_actions: 295
action_count: 295
confidence: medium
summary: "All 295 spec actions matched to 69 distinct source commands with correct wire-level mnemonics and parameter shapes; transport (9600 baud, 8N1, straight cable, STX/ETX framing) verified; coverage ratio 1.0. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN TCP port not stated in source (Network Setup exposes the port number 1024..65535 with several exclusions, but no default value is documented). LAN framing above the TCP transport is also not documented."
- "default LAN TCP port"
- "port number not stated in source"
- "no multi-step sequences documented in source"
- "source contains no safety warnings, interlock procedures, or"
- "LAN TCP port — the SSU:LCP command accepts ports 1024..65535 with several exclusions, but the factory default port is not stated in the source."
- "LAN framing above TCP — the source documents the same ASCII opcode set for LAN as for RS-232C, but the LAN transport wrapper (TCP framing, connection lifecycle) is not described."
- "the difference between \"Protocol1\" and \"Protocol2\" (LP1 / LP2) under LAN control is not described."
- "maximum end-to-end cable length for RS-232C is not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
