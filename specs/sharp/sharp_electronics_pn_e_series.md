---
spec_id: admin/sharp-electronics-pn-e-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics PN-E Series Control Spec"
manufacturer: Sharp
model_family: "PN-E Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - "PN-E Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_man_PNE421_471.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_man_PNE521_601.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_man_PNE521_601_install.pdf
  - https://business.sharpusa.com/Portals/0/downloads/Manuals/PN_E603_703_Operation_Manual.pdf
retrieved_at: 2026-05-01T02:57:30.386Z
last_checked_at: 2026-09-19T22:17:16.715Z
generated_at: 2026-09-19T22:17:16.715Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN control method details (port, URL paths, API) not documented in source — only web-browser access mentioned."
  - "exact model list covered by this manual — only PN-E421 explicitly named in source text."
  - "firmware version compatibility not stated in source."
  - "no URL/path pattern stated in source"
  - "port number not stated in source"
  - "no additional settable parameters outside the command table found in source."
  - "LAN/e-mail notification content (PN-ZB01) not detailed in source."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "LAN control protocol details (port, HTTP API, e-mail notification format) not stated in source."
  - "LANG full 0-14 code mapping partially illegible in source table."
verification:
  verdict: verified
  checked_at: 2026-09-19T22:17:16.715Z
  matched_actions: 143
  action_count: 143
  confidence: medium
  summary: "All 143 spec actions map to distinct 4-char opcodes in the RS-232C command table; transport values verified; source command catalogue fully represented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-14
---

# Sharp Electronics PN-E Series Control Spec

## Summary
Sharp PN-E Series large-format LCD monitors (source explicitly references PN-E421; series also includes PN-E471/E521/E601) controlled via RS-232C with a 4-character command + 4-character parameter ASCII protocol, supporting daisy-chain control of up to 25 monitors with ID addressing. LAN control is available when the optional PN-ZB01 board is attached, configured via web browser (Internet Explorer); RS-232C and LAN cannot be used simultaneously. This spec covers the full RS-232C command table from the operation manual.

<!-- UNRESOLVED: LAN control method details (port, URL paths, API) not documented in source — only web-browser access mentioned. -->
<!-- UNRESOLVED: exact model list covered by this manual — only PN-E421 explicitly named in source text. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - http  # inferred: LAN control via web browser (Internet Explorer) mentioned in source; requires optional PN-ZB01
serial:
  baud_rate: 9600  # initial setting; settable to 9600/19200/38400 via BAUD command
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  base_url: null  # UNRESOLVED: no URL/path pattern stated in source
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (POWR standby/on command present)
# - queryable    (R-direction queries: POWR?, VOLM?, INF1, SRNO, DSTA, ERRT, STCA, PXCK, RESO, etc.)
# - routable     (INPS input mode selection commands present)
# - levelable    (VOLM, CONT, BLVL, VLMP, etc. level commands present)
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
# Command format: 4-char command field + 4-char parameter field, terminated by return code (0DH or 0AH).
# Parameter MUST be exactly 4 characters, padded with spaces. Negative values as 3 digits (e.g. AUTR-009).
# Query (R-direction): send "????" as parameter (e.g. VOLM????). Repeater control: 4th parameter char "+".
# W = set, R = readable via ???? query, WR = both.
- id: power_set
  label: Power Control
  kind: action
  command: "POWR{state}"
  params:
    - name: state
      type: integer
      description: "W: 0 = switch to standby mode, 1 = return from standby. R (POWR????): 0 = standby mode, 1 = normal mode, 2 = input signal waiting mode"
- id: input_mode_select
  label: Input Mode Selection
  kind: action
  command: "INPS{input}"
  params:
    - name: input
      type: integer
      description: "W: 0 = toggle, 1 = PC DVI-D, 2 = PC D-SUB, 3 = AV COMPONENT, 4 = AV VIDEO, 6 = PC RGB, 7 = AV DVI-D, 8 = AV S-VIDEO, 9 = AV HDMI, 10 = PC HDMI. R returns same codes 1-10. Some selections return ERR depending on INPUT SELECT settings"
- id: screen_auto_adjust
  label: Screen Auto Adjust
  kind: action
  command: "ASNC0001"
  params: []
  # AUTO (SCREEN menu); when input mode is PC D-SUB or PC RGB; returns WAIT
- id: clock_set
  label: Clock
  kind: action
  command: "CLCK{value}"
  params:
    - name: value
      type: integer
      description: "0-1200; PC D-SUB/PC RGB only; varies depending on signal; query via CLCK????"
- id: phase_set
  label: Phase
  kind: action
  command: "PHSE{value}"
  params:
    - name: value
      type: integer
      description: "0-63; PC D-SUB/PC RGB only; query via PHSE????"
- id: h_position_set
  label: H-Position
  kind: action
  command: "HPOS{value}"
  params:
    - name: value
      type: integer
      description: "0-100 (0-800 on PC D-SUB/PC RGB); query via HPOS????"
- id: v_position_set
  label: V-Position
  kind: action
  command: "VPOS{value}"
  params:
    - name: value
      type: integer
      description: "0-100 (0-200 on PC D-SUB/PC RGB); query via VPOS????"
- id: h_size_set
  label: H-Size
  kind: action
  command: "HSIZ{value}"
  params:
    - name: value
      type: integer
      description: "0-100; query via HSIZ????"
- id: v_size_set
  label: V-Size
  kind: action
  command: "VSIZ{value}"
  params:
    - name: value
      type: integer
      description: "0-100; query via VSIZ????"
- id: h_resolution_set
  label: H-Resolution
  kind: action
  command: "HRES{value}"
  params:
    - name: value
      type: integer
      description: "300-1920, only even numbers valid; PC D-SUB/PC RGB only; query via HRES????"
- id: v_resolution_set
  label: V-Resolution
  kind: action
  command: "VRES{value}"
  params:
    - name: value
      type: integer
      description: "200-1200, only even numbers valid; query via VRES????"
- id: screen_reset
  label: Screen/Picture/Audio Reset
  kind: action
  command: "ARST{value}"
  params:
    - name: value
      type: integer
      description: "1 = SCREEN menu reset, 2 = PICTURE menu reset, 3 = AUDIO menu reset"
- id: picture_auto_adjust
  label: Picture Auto Adjust
  kind: action
  command: "AGIN0001"
  params: []
  # AUTO (PICTURE menu); PC D-SUB/PC RGB only; returns WAIT
- id: contrast_set
  label: Contrast
  kind: action
  command: "CONT{value}"
  params:
    - name: value
      type: integer
      description: "0-60 (0-127 on PC D-SUB/PC RGB); query via CONT????"
- id: black_level_set
  label: Black Level
  kind: action
  command: "BLVL{value}"
  params:
    - name: value
      type: integer
      description: "0-60 (0-127 on PC D-SUB/PC RGB); query via BLVL????"
- id: tint_set
  label: Tint
  kind: action
  command: "TINT{value}"
  params:
    - name: value
      type: integer
      description: "0-60; query via TINT????"
- id: color_set
  label: Colors
  kind: action
  command: "COLR{value}"
  params:
    - name: value
      type: integer
      description: "0-60; query via COLR????"
- id: sharpness_set
  label: Sharpness
  kind: action
  command: "SHRP{value}"
  params:
    - name: value
      type: integer
      description: "0-24; query via SHRP????"
- id: flesh_tone_set
  label: Flesh Tone
  kind: action
  command: "FLES{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: LOW, 2: HIGH; AV input only; query via FLES????"
- id: three_d_nr_set
  label: 3D-NR
  kind: action
  command: "TDNR{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: LOW, 2: HIGH; query via TDNR????"
- id: mpeg_nr_set
  label: MPEG-NR
  kind: action
  command: "MPNR{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: ON; query via MPNR????"
- id: three_d_yc_set
  label: 3D-Y/C
  kind: action
  command: "YCSP{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: ON; AV VIDEO input only; query via YCSP????"
- id: cms_hue_r_set
  label: C.M.S.-Hue R
  kind: action
  command: "CMHR{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10 (negative as 3 digits, e.g. CMHR-009); query via CMHR????"
- id: cms_hue_y_set
  label: C.M.S.-Hue Y
  kind: action
  command: "CMHY{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMHY????"
- id: cms_hue_g_set
  label: C.M.S.-Hue G
  kind: action
  command: "CMHG{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMHG????"
- id: cms_hue_c_set
  label: C.M.S.-Hue C
  kind: action
  command: "CMHC{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMHC????"
- id: cms_hue_b_set
  label: C.M.S.-Hue B
  kind: action
  command: "CMHB{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMHB????"
- id: cms_hue_m_set
  label: C.M.S.-Hue M
  kind: action
  command: "CMHM{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMHM????"
- id: cms_saturation_r_set
  label: C.M.S.-Saturation R
  kind: action
  command: "CMSR{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMSR????"
- id: cms_saturation_y_set
  label: C.M.S.-Saturation Y
  kind: action
  command: "CMSY{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMSY????"
- id: cms_saturation_g_set
  label: C.M.S.-Saturation G
  kind: action
  command: "CMSG{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMSG????"
- id: cms_saturation_c_set
  label: C.M.S.-Saturation C
  kind: action
  command: "CMSC{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMSC????"
- id: cms_saturation_b_set
  label: C.M.S.-Saturation B
  kind: action
  command: "CMSB{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMSB????"
- id: cms_saturation_m_set
  label: C.M.S.-Saturation M
  kind: action
  command: "CMSM{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMSM????"
- id: cms_value_r_set
  label: C.M.S.-Value R
  kind: action
  command: "CMVR{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMVR????"
- id: cms_value_y_set
  label: C.M.S.-Value Y
  kind: action
  command: "CMVY{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMVY????"
- id: cms_value_g_set
  label: C.M.S.-Value G
  kind: action
  command: "CMVG{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMVG????"
- id: cms_value_c_set
  label: C.M.S.-Value C
  kind: action
  command: "CMVC{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMVC????"
- id: cms_value_b_set
  label: C.M.S.-Value B
  kind: action
  command: "CMVB{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMVB????"
- id: cms_value_m_set
  label: C.M.S.-Value M
  kind: action
  command: "CMVM{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via CMVM????"
- id: cms_reset
  label: C.M.S. Reset
  kind: action
  command: "CRST{value}"
  params:
    - name: value
      type: integer
      description: "1 = reset hue, 2 = reset saturation, 3 = reset brightness"
- id: color_mode_set
  label: Color Mode
  kind: action
  command: "BMOD{value}"
  params:
    - name: value
      type: integer
      description: "0: STD, 2: VIVID, 3: sRGB (PC input only); query via BMOD????"
- id: color_temp_set
  label: White Balance / Color Temperature
  kind: action
  command: "CTMP{value}"
  params:
    - name: value
      type: integer
      description: "0: THRU (PC DVI-D/PC HDMI), 1-17: preset approx 3000K (1) to 10000K (15) in 500K steps, 16: approx 5600K, 17: approx 9300K, 99: USER; query via CTMP????"
- id: r_contrast_set
  label: R-Contrast
  kind: action
  command: "CRTR{value}"
  params:
    - name: value
      type: integer
      description: "0-256; ERR when CTMP is not 99; query via CRTR????"
- id: g_contrast_set
  label: G-Contrast
  kind: action
  command: "CRTG{value}"
  params:
    - name: value
      type: integer
      description: "0-256; ERR when CTMP is not 99; query via CRTG????"
- id: b_contrast_set
  label: B-Contrast
  kind: action
  command: "CRTB{value}"
  params:
    - name: value
      type: integer
      description: "0-256; ERR when CTMP is not 99; query via CRTB????"
- id: copy_to_user
  label: Copy White Balance Preset to User
  kind: action
  command: "CPTU0000"
  params: []
- id: gamma_set
  label: Gamma
  kind: action
  command: "GAMM{value}"
  params:
    - name: value
      type: integer
      description: "0: 1.8, 1: 2.2, 2: 2.4, 4: USER, 5: 2.0; query via GAMM????"
- id: treble_set
  label: Treble
  kind: action
  command: "AUTR{value}"
  params:
    - name: value
      type: integer
      description: "-5 to 5 (negative as 3 digits, e.g. AUTR-009); query via AUTR????"
- id: bass_set
  label: Bass
  kind: action
  command: "AUBS{value}"
  params:
    - name: value
      type: integer
      description: "-5 to 5; query via AUBS????"
- id: balance_set
  label: Balance
  kind: action
  command: "AUBL{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10; query via AUBL????"
- id: osd_h_position_set
  label: OSD H-Position
  kind: action
  command: "OSDH{value}"
  params:
    - name: value
      type: integer
      description: "0-100; query via OSDH????"
- id: osd_v_position_set
  label: OSD V-Position
  kind: action
  command: "OSDV{value}"
  params:
    - name: value
      type: integer
      description: "0-100; query via OSDV????"
- id: monitor_orientation_set
  label: Monitor Orientation
  kind: action
  command: "STDR{value}"
  params:
    - name: value
      type: integer
      description: "0: LANDSCAPE, 1: PORTRAIT; PN-E421 only; query via STDR????"
- id: monaural_audio_set
  label: Monaural Audio
  kind: action
  command: "MONO{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: ON; query via MONO????"
- id: language_set
  label: Language
  kind: action
  command: "LANG{value}"
  params:
    - name: value
      type: integer
      description: "Language code; source table lists ENGLISH (first row), 1: DEUTSCH, 2: FRANÇAIS, 3: ITALIANO, 4: ESPAÑOL, 5: РУССКИЙ; full 0-14 mapping partially illegible in source; query via LANG????"
- id: power_on_delay_set
  label: Power On Delay
  kind: action
  command: "PWOD{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1-60: ON (delay in minutes); query via PWOD????"
- id: standby_mode_set
  label: Standby Mode
  kind: action
  command: "STBM{value}"
  params:
    - name: value
      type: integer
      description: "0: STANDARD, 1: LOW POWER (ERR when SCHEDULE is effective or OFF selected for LED); query via STBM????"
- id: hdmi_auto_view_set
  label: HDMI Auto View
  kind: action
  command: "HDAW{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: ON; query via HDAW????"
- id: hdmi_rgb_range_set
  label: HDMI RGB Input Range
  kind: action
  command: "HDRA{value}"
  params:
    - name: value
      type: integer
      description: "0: AUTO, 1: FULL, 2: LIMITED; query via HDRA????"
- id: hot_plug_dvi_set
  label: Hot Plug Control (DVI)
  kind: action
  command: "HPCT{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: ON; query via HPCT????"
- id: hot_plug_hdmi_set
  label: Hot Plug Control (HDMI)
  kind: action
  command: "HPCH{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: ON; query via HPCH????"
- id: rs232c_lan_select_set
  label: RS-232C/LAN Select
  kind: action
  command: "CTLS{value}"
  params:
    - name: value
      type: integer
      description: "0: RS-232C, 1: LAN; query via CTLS????"
- id: id_number_set
  label: ID Number Set
  kind: action
  command: "IDST{value}"
  params:
    - name: value
      type: integer
      description: "W: 0-255, 0 = no ID number; R (IDST????) returns current ID number 0-255"
- id: id_select_once
  label: ID Number Set (Once)
  kind: action
  command: "IDSL{value}"
  params:
    - name: value
      type: integer
      description: "1-255 = target monitor ID for the immediately following command only; 0 = clear ID designation. Returns WAIT while searching"
- id: id_lock
  label: ID Number Set (Subsequent)
  kind: action
  command: "IDLK{value}"
  params:
    - name: value
      type: integer
      description: "1-255 = target monitor ID for all subsequent commands until canceled or power off; 0 = cancel ID lock. Returns WAIT while searching"
- id: id_check
  label: ID Check
  kind: action
  command: "IDCK0000"
  params: []
  # Displays monitor's own ID and current IDLK ID on screen; reply "ID : xxx  IDLK : yyy"
- id: baud_rate_set
  label: Baud Rate Select
  kind: action
  command: "BAUD{value}"
  params:
    - name: value
      type: integer
      description: "0: 9600bps, 1: 19200bps, 2: 38400bps; query via BAUD????"
- id: speaker_select_set
  label: Speaker Select
  kind: action
  command: "SPSL{value}"
  params:
    - name: value
      type: integer
      description: "0: internal speaker, 1: external speaker; query via SPSL????"
- id: dc_out_set
  label: Option DC Out Setting
  kind: action
  command: "DCOT{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: MODE1, 2: MODE2; requires PN-ZB01; query via DCOT????"
- id: date_time_set
  label: Date/Time Setting
  kind: action
  command: "DATE{AABBCCDDEE}"
  params:
    - name: AABBCCDDEE
      type: string
      description: "AA: year, BB: month, CC: day, DD: hour, EE: minute; no spaces; query via DATE????"
- id: schedule_set
  label: Schedule Setting
  kind: action
  command: "SC{nn}{ABCDEFFGGH}"
  params:
    - name: nn
      type: integer
      description: "Schedule number 01-08 (commands SC01 through SC08 listed as one table row)"
    - name: ABCDEFFGGH
      type: string
      description: "A: 0=not effective, 1=effective; B: power 0=OFF, 1=ON; C: 0=only once, 1=every week, 2=every day; D/E: day of week 0=Sunday, 1-6=Monday-Saturday, 9=not exist; F: hour 00-23; G: minute 00-59; H: input 0=not specified, 1=PC/AV DVI-D, 2=PC D-SUB, 3=PC RGB/AV COMPONENT, 4=AV VIDEO, 5=AV S-VIDEO, 6=PC/AV HDMI. ERR when LOW POWER selected for STANDBY MODE. No spaces"
- id: dvi_input_select_set
  label: Input Select DVI
  kind: action
  command: "DVSL{value}"
  params:
    - name: value
      type: integer
      description: "0: PC DVI-D, 1: AV DVI-D; query via DVSL????"
- id: bnc_input_select_set
  label: Input Select BNC
  kind: action
  command: "BNSL{value}"
  params:
    - name: value
      type: integer
      description: "0: PC RGB, 1: AV COMPONENT; query via BNSL????"
- id: hdmi_input_select_set
  label: Input Select HDMI
  kind: action
  command: "HDSL{value}"
  params:
    - name: value
      type: integer
      description: "0: PC HDMI, 1: AV HDMI; query via HDSL????"
- id: audio_select_pc_dvi_set
  label: Audio Select PC DVI-D
  kind: action
  command: "ASDP{value}"
  params:
    - name: value
      type: integer
      description: "1: AUDIO, 2: AUDIO 1, 3: AUDIO 2; query via ASDP????"
- id: audio_select_pc_dsub_set
  label: Audio Select PC D-SUB
  kind: action
  command: "ASAP{value}"
  params:
    - name: value
      type: integer
      description: "1: AUDIO, 2: AUDIO 1, 3: AUDIO 2; query via ASAP????"
- id: audio_select_pc_hdmi_set
  label: Audio Select PC HDMI
  kind: action
  command: "ASHP{value}"
  params:
    - name: value
      type: integer
      description: "0: HDMI, 1: AUDIO, 2: AUDIO 1, 3: AUDIO 2; query via ASHP????"
- id: audio_select_pc_rgb_set
  label: Audio Select PC RGB
  kind: action
  command: "ASCP{value}"
  params:
    - name: value
      type: integer
      description: "1: AUDIO, 2: AUDIO 1, 3: AUDIO 2; query via ASCP????"
- id: audio_select_av_dvi_set
  label: Audio Select AV DVI-D
  kind: action
  command: "ASDA{value}"
  params:
    - name: value
      type: integer
      description: "1: AUDIO, 2: AUDIO 1, 3: AUDIO 2; query via ASDA????"
- id: audio_select_av_hdmi_set
  label: Audio Select AV HDMI
  kind: action
  command: "ASHA{value}"
  params:
    - name: value
      type: integer
      description: "0: HDMI, 1: AUDIO, 2: AUDIO 1, 3: AUDIO 2; query via ASHA????"
- id: audio_select_av_component_set
  label: Audio Select AV COMPONENT
  kind: action
  command: "ASCA{value}"
  params:
    - name: value
      type: integer
      description: "1: AUDIO, 2: AUDIO 1, 3: AUDIO 2; query via ASCA????"
- id: audio_select_av_svideo_set
  label: Audio Select AV S-VIDEO
  kind: action
  command: "ASSA{value}"
  params:
    - name: value
      type: integer
      description: "1: AUDIO, 2: AUDIO 1, 3: AUDIO 2; query via ASSA????"
- id: audio_select_av_video_set
  label: Audio Select AV VIDEO
  kind: action
  command: "ASVA{value}"
  params:
    - name: value
      type: integer
      description: "1: AUDIO, 2: AUDIO 1, 3: AUDIO 2; query via ASVA????"
- id: pc_resolution_check
  label: PC Resolution Check
  kind: query
  command: "PXCK????"
  params: []
  # Returns current resolution as hhh, vvv
- id: pixel_setting_set
  label: Pixel Setting (PC D-SUB, PC RGB)
  kind: action
  command: "PXSL{value}"
  params:
    - name: value
      type: integer
      description: "1: 1360x768, 2: 1280x768, 3: 1024x768, 5: 848x480, 6: 640x480, 7: 1680x1050, 8: 1400x1050, 9: 768 AUTO, 10: 480 AUTO; query via PXSL????; returns WAIT"
- id: av_resolution_check
  label: AV Resolution Check
  kind: query
  command: "RESO????"
  params: []
  # Returns 480i, 480p, 1080i, 720p, 1080p, VGA, etc.
- id: zoom2_special_set
  label: Zoom2 Special Setting (PC D-SUB, PC RGB)
  kind: action
  command: "Z2SP{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: ON; query via Z2SP????"
- id: scan_mode_set
  label: Scan Mode
  kind: action
  command: "SCAN{value}"
  params:
    - name: value
      type: integer
      description: "0: MODE1, 1: MODE2, 2: MODE3; AV input only; query via SCAN????"
- id: power_management_pc_set
  label: Power Management (PC)
  kind: action
  command: "PMNG{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: ON; query via PMNG????"
- id: power_management_av_set
  label: Power Management (AV)
  kind: action
  command: "PMAV{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: ON; query via PMAV????"
- id: color_system_set
  label: Color System
  kind: action
  command: "CSYS{value}"
  params:
    - name: value
      type: integer
      description: "0: AUTO, 1: PAL, 2: PAL-60, 3: SECAM, 4: NTSC3.58, 5: NTSC4.43; query via CSYS????"
- id: audio_output_set
  label: Audio Output
  kind: action
  command: "AOUT{value}"
  params:
    - name: value
      type: integer
      description: "0: VARIABLE, 1: FIXED; query via AOUT????"
- id: audio_input_level_set
  label: Audio Input Level
  kind: action
  command: "AIVP{value}"
  params:
    - name: value
      type: integer
      description: "0: 1.0Vrms, 1: 0.5Vrms; query via AIVP????"
- id: self_adjust_set
  label: Self Adjust
  kind: action
  command: "AADJ{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: ON; query via AADJ????"
- id: auto_input_change_set
  label: Auto Input Change
  kind: action
  command: "AINC{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: ON; query via AINC????"
- id: enlarge_mode_set
  label: Enlarge Mode
  kind: action
  command: "EMAG{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: 2x2, 2: 3x3, 3: 4x4, 4: 5x5; PC input only; query via EMAG????; returns WAIT"
- id: enlarge_mode_mxn_set
  label: Enlarge Mode MxN
  kind: action
  command: "EMHV{mn}"
  params:
    - name: mn
      type: integer
      description: "11-55; m x n expressed as mn (m = longest direction, n = shortest direction monitors); requires PN-ZB01; returns WAIT"
- id: bezel_width_h_set
  label: Bezel Width (Shorter Side)
  kind: action
  command: "BEZH{value}"
  params:
    - name: value
      type: integer
      description: "0-100; query via BEZH????"
- id: bezel_width_v_set
  label: Bezel Width (Longer Side)
  kind: action
  command: "BEZV{value}"
  params:
    - name: value
      type: integer
      description: "0-100; query via BEZV????"
- id: image_position_mxn_set
  label: Image Position MxN
  kind: action
  command: "EPHV{mn}"
  params:
    - name: mn
      type: integer
      description: "11-55; ENLARGE POSITION in longest/shortest direction; requires PN-ZB01; returns WAIT"
- id: image_position_set
  label: Image Position
  kind: action
  command: "EPOS{value}"
  params:
    - name: value
      type: integer
      description: "0-3 for 2x2, 0-8 for 3x3, 0-15 for 4x4, 0-24 for 5x5 (position grid, see source); returns WAIT"
- id: enlarge_screen_h_position_set
  label: Enlarged Screen Positioning (Longest Direction)
  kind: action
  command: "EPSH{value}"
  params:
    - name: value
      type: integer
      description: "-999 to 999 (negative as 3 digits); range depends on ENLARGE MODE and IMAGE POSITION; query via EPSH????"
- id: enlarge_screen_v_position_set
  label: Enlarged Screen Positioning (Shortest Direction)
  kind: action
  command: "EPSV{value}"
  params:
    - name: value
      type: integer
      description: "-999 to 999 (negative as 3 digits); query via EPSV????"
- id: enlarge_image_position_setting
  label: Enlarge/Image Position Setting
  kind: action
  command: "ESTG{XXYY}"
  params:
    - name: XXYY
      type: string
      description: "XX: ENLARGE MODE (same values as EMAG), YY: IMAGE POSITION (same values as EPOS)"
- id: enlarge_image_position_setting_mxn
  label: Enlarge/Image Position Setting MxN
  kind: action
  command: "ESHV{XXYY}"
  params:
    - name: XXYY
      type: string
      description: "XX: ENLARGE MODE (same values as EMHV), YY: IMAGE POSITION (same values as EPHV); returns WAIT"
- id: pip_mode_set
  label: PIP Modes
  kind: action
  command: "MWIN{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: PIP, 2: PbyP, 3: PbyP2; query via MWIN????; returns WAIT"
- id: pip_size_set
  label: PIP Size
  kind: action
  command: "MPSZ{value}"
  params:
    - name: value
      type: integer
      description: "1-12; query via MPSZ????"
- id: pip_pos_h_set
  label: PIP Pos (Longest Direction)
  kind: action
  command: "MHPS{value}"
  params:
    - name: value
      type: integer
      description: "0-100; query via MHPS????"
- id: pip_pos_v_set
  label: PIP Pos (Shortest Direction)
  kind: action
  command: "MVPS{value}"
  params:
    - name: value
      type: integer
      description: "0-100; query via MVPS????"
- id: pip_pos_batch_set
  label: PIP Pos LD+SD Batch
  kind: action
  command: "MPOS{xxx}{yyy}"
  params:
    - name: xxx
      type: integer
      description: "Longer side position 0-100, 3 digits, no spaces (e.g. MPOS010097)"
    - name: yyy
      type: integer
      description: "Shorter side position 0-100, 3 digits"
- id: pip_blend_set
  label: PIP Blend
  kind: action
  command: "MWBL{value}"
  params:
    - name: value
      type: integer
      description: "0-15; query via MWBL????"
- id: pip_source_set
  label: PIP Source
  kind: action
  command: "MWIP{value}"
  params:
    - name: value
      type: integer
      description: "1: PC DVI-D, 2: PC D-SUB, 3: AV COMPONENT, 4: AV VIDEO, 6: PC RGB, 7: AV DVI-D, 8: AV S-VIDEO, 9: AV HDMI, 10: PC HDMI; query via MWIP????; returns WAIT"
- id: sound_change
  label: Sound Change
  kind: action
  command: "MWAD{value}"
  params:
    - name: value
      type: integer
      description: "1: MAIN, 2: SUB; query via MWAD????"
- id: main_pos_set
  label: Main Pos
  kind: action
  command: "MWPP{value}"
  params:
    - name: value
      type: integer
      description: "0: POS1, 1: POS2; query via MWPP????"
- id: pbyp2_pos_set
  label: PbyP2 Pos
  kind: action
  command: "MW2P{value}"
  params:
    - name: value
      type: integer
      description: "0: POS1, 1: POS2, 2: POS3; query via MW2P????"
- id: pip_auto_off_set
  label: PIP Auto Off
  kind: action
  command: "MOFF{value}"
  params:
    - name: value
      type: integer
      description: "0: MANUAL, 1: AUTO; query via MOFF????"
- id: all_reset
  label: All Reset
  kind: action
  command: "RSET{value}"
  params:
    - name: value
      type: integer
      description: "0: ALL RESET (without PN-ZB01); 0: ALL RESET 1, 1: ALL RESET 2 (with PN-ZB01). Set timeout 30s or longer. ALL RESET 1 also initializes personal info (e-mail addresses); ALL RESET 2 does not"
- id: adjustment_lock_set
  label: Adjustment Lock
  kind: action
  command: "ALCK{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF (operation enabled), 1: disables all operations other than power on/off and FUNCTION, 2: only FUNCTION operation enabled; query via ALCK????"
- id: osd_display_set
  label: OSD Display
  kind: action
  command: "LOSD{value}"
  params:
    - name: value
      type: integer
      description: "0: ON, 1: OFF; query via LOSD????"
- id: led_set
  label: LED
  kind: action
  command: "OFLD{value}"
  params:
    - name: value
      type: integer
      description: "0: ON, 1: OFF; ERR when LOW POWER selected for STANDBY MODE; query via OFLD????"
- id: temperature_alert_set
  label: Temperature Alert
  kind: action
  command: "TALT{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: OSD & LED, 2: LED; query via TALT????"
- id: status_alert_set
  label: Status Alert
  kind: action
  command: "SALT{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: OSD & LED, 2: LED; query via SALT????"
- id: power_button_set
  label: Power Button
  kind: action
  command: "PBTN{value}"
  params:
    - name: value
      type: integer
      description: "0: MONITOR, 1: CONTROLLER; query via PBTN????"
- id: controller_input_set
  label: Controller Input
  kind: action
  command: "PCIP{value}"
  params:
    - name: value
      type: integer
      description: "0: D-SUB, 1: HDMI, 2: DVI-D; ERR when MONITOR selected for POWER BUTTON; query via PCIP????"
- id: screen_size_pc_set
  label: Screen Size (PC)
  kind: action
  command: "WIDE{value}"
  params:
    - name: value
      type: integer
      description: "PC: 1: WIDE, 2: NORMAL, 3: Dot by Dot, 4: ZOOM1, 5: ZOOM2; AV: 1: WIDE, 2: ZOOM1, 3: ZOOM2, 4: NORMAL, 5: Dot by Dot (same opcode WIDE for both); query via WIDE????; returns WAIT"
- id: volume_set
  label: Volume
  kind: action
  command: "VOLM{value}"
  params:
    - name: value
      type: integer
      description: "0-31, zero-padded 4 digits (e.g. VOLM0030); query VOLM???? returns current volume (e.g. 30)"
- id: mute_set
  label: Mute
  kind: action
  command: "MUTE{value}"
  params:
    - name: value
      type: integer
      description: "0: OFF, 1: ON; query via MUTE????"
- id: model_name_query
  label: Model Name Information
  kind: query
  command: "INF1????"
  params: []
  # Returns model name value
- id: serial_number_query
  label: Serial Number Information
  kind: query
  command: "SRNO????"
  params: []
  # Returns serial number value
- id: backlight_brightness_set
  label: Backlight Brightness
  kind: action
  command: "VLMP{value}"
  params:
    - name: value
      type: integer
      description: "0-31; query via VLMP????"
- id: temperature_sensor_status_query
  label: Temperature Sensor Status
  kind: query
  command: "DSTA????"
  params: []
  # Returns 0-4, see temperature_sensor_status feedback
- id: temperature_acquisition_query
  label: Temperature Acquisition
  kind: query
  command: "ERRT????"
  params: []
  # Returns [Sensor1],[Sensor2],[Sensor3]; 126 indicates sensor abnormality
- id: standby_cause_init
  label: Cause of Last Standby Initialization
  kind: action
  command: "STCA0000"
  params: []
- id: standby_cause_query
  label: Cause of Last Standby Mode
  kind: query
  command: "STCA????"
  params: []
  # Returns 0/1/2/3/4/6/8, see standby_cause feedback
- id: gamma_red_transfer
  label: Red Gamma Data Transfer
  kind: action
  command: "UGRW{aa}{xxxx...xxxx}{cc}"
  params:
    - name: aa
      type: integer
      description: "Block number 01-16 (512 data pieces split into 16 blocks of 32)"
    - name: xxxx
      type: string
      description: "32 pieces of 4-digit user data (0000-1023), zero-padded to 4 digits"
    - name: cc
      type: string
      description: "Checksum: lower-order 1 byte (hex 0-F) ASCII of sum of block number + 32 data pieces"
- id: gamma_green_transfer
  label: Green Gamma Data Transfer
  kind: action
  command: "UGGW{aa}{xxxx...xxxx}{cc}"
  params:
    - name: aa
      type: integer
      description: "Block number 01-16"
    - name: xxxx
      type: string
      description: "32 pieces of 4-digit user data (0000-1023)"
    - name: cc
      type: string
      description: "Checksum (same as UGRW)"
- id: gamma_blue_transfer
  label: Blue Gamma Data Transfer
  kind: action
  command: "UGBW{aa}{xxxx...xxxx}{cc}"
  params:
    - name: aa
      type: integer
      description: "Block number 01-16"
    - name: xxxx
      type: string
      description: "32 pieces of 4-digit user data (0000-1023)"
    - name: cc
      type: string
      description: "Checksum (same as UGRW)"
- id: gamma_red_read
  label: Red Gamma Data Read
  kind: query
  command: "UGRR{aa}"
  params:
    - name: aa
      type: integer
      description: "Block number 1-16; returns 32 pieces of user data (value from temporary display memory, not stored value)"
- id: gamma_green_read
  label: Green Gamma Data Read
  kind: query
  command: "UGGR{aa}"
  params:
    - name: aa
      type: integer
      description: "Block number 1-16"
- id: gamma_blue_read
  label: Blue Gamma Data Read
  kind: query
  command: "UGBR{aa}"
  params:
    - name: aa
      type: integer
      description: "Block number 1-16"
- id: gamma_user_data_initialize
  label: Gamma User Data Initialize
  kind: action
  command: "UGRS0000"
  params: []
- id: gamma_user_data_save
  label: Gamma User Data Save
  kind: action
  command: "UGSV0000"
  params: []
  # Saves transferred user data; otherwise cleared at main power off or LOW POWER standby
```

## Feedbacks
```yaml
- id: ok_response
  type: string
  values: ["OK"]
  # Returned after command executed correctly; with ID assigned: "OK 001" (space + ID)
- id: err_response
  type: string
  values: ["ERR"]
  # No relevant command or command unusable in current state
- id: wait_response
  type: string
  values: ["WAIT"]
  # Repeater control, IDSL/IDLK, or RSET/INPS/ASNC/WIDE/EMAG/EPOS/PXSL/POWR/AGIN/MWIN/MWIP/MWPP/ESTG/EMHV/EPHV/ESHV in progress; do not send commands; no ID attached
- id: locked_response
  type: string
  values: ["LOCKED"]
  # RS-232C control locked by operation lock (ALCK)
- id: unselected_response
  type: string
  values: ["UNSELECTED"]
  # Returned when RS-232C/LAN SELECT is set to LAN
- id: power_state
  type: enum
  values: [standby, normal, input_signal_waiting]
  # POWR???? reply: 0/1/2
- id: input_mode
  type: enum
  values: [pc_dvi_d, pc_d_sub, av_component, av_video, pc_rgb, av_dvi_d, av_s_video, av_hdmi, pc_hdmi]
  # INPS???? reply: 1/2/3/4/6/7/8/9/10
- id: volume_level
  type: integer
  values: "0-31"
  # VOLM???? reply
- id: id_number
  type: integer
  values: "0-255"
  # IDST???? reply; 0 = no ID assigned; responses append " nnn" (space + 3-digit ID) when ID assigned
- id: model_name
  type: string
  # INF1???? reply
- id: serial_number
  type: string
  # SRNO???? reply
- id: temperature_sensor_status
  type: enum
  values: [normal, abnormal_standby, abnormal_recovered, abnormal_backlight_dimmed, sensor_abnormal]
  # DSTA???? reply: 0/1/2/3/4
- id: sensor_temperatures
  type: string
  # ERRT???? reply "[Sensor1],[Sensor2],[Sensor3]"; 126 = sensor abnormality
- id: standby_cause
  type: enum
  values: [no_error, power_button, main_power_switch, rs232c_or_lan, no_signal, abnormal_temperature, schedule]
  # STCA???? reply: 0/1/2/3/4/6/8
- id: pc_resolution
  type: string
  # PXCK???? reply "hhh, vvv"
- id: av_resolution
  type: string
  # RESO???? reply: 480i, 480p, 1080i, 720p, 1080p, VGA, etc.
```

## Variables
```yaml
# All settable parameters in this source are exposed as discrete RS-232C commands
# and are represented as Actions above (VOLM, VLMP, CONT, etc.).
# UNRESOLVED: no additional settable parameters outside the command table found in source.
```

## Events
```yaml
# No unsolicited protocol-level notifications documented in source.
# Temperature Alert (TALT) and Status Alert (SALT) notify via OSD/LED only, not via RS-232C messages.
# UNRESOLVED: LAN/e-mail notification content (PN-ZB01) not detailed in source.
```

## Macros
```yaml
- id: auto_assign_ids_repeater
  label: Auto-assign ID numbers to daisy chain
  steps:
    - "IDST001+"  # repeater control (4th param char "+") assigns sequential IDs to all monitors
  notes: "Responses returned by all connected monitors; send next command only after last monitor replies"
- id: gamma_user_data_upload
  label: Upload and activate GAMMA user data
  steps:
    - "UGRW{block}{data}{checksum} x16 blocks (red)"
    - "UGGW{block}{data}{checksum} x16 blocks (green)"
    - "UGBW{block}{data}{checksum} x16 blocks (blue)"
    - "UGSV0000"  # save to monitor, otherwise cleared at main power off or LOW POWER standby
    - "GAMM0004"  # activate by selecting USER gamma
  notes: "512 data pieces per color, 32 per block; checksum = lower-order 1 byte ASCII hex of block number + data sum"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements for control. Temperature abnormality handling
# (standby, backlight dimming) is automatic device behavior, not a control-side interlock.
```

## Notes
- Command format: 4-character command field + 4-character parameter field (exactly 4 chars, pad with spaces, e.g. "VOLM  30" written as VOLM0030; wrong: VOLM30). Return code 0DH or 0AH (or both) terminates commands/responses.
- Negative parameters: 3-digit numeric with minus (e.g. AUTR-009). No spaces allowed for MPOS, DATE, SC01-SC08.
- Daisy chain: up to 25 monitors via RS-232C in/out terminals; all monitors must use same baud rate; assign unique IDs (0-255, 0 = no ID). IDSL targets next command only; IDLK persists until canceled (IDLK0000) or power off; repeater control cancels ID designation.
- Repeater control: set 4th parameter character to "+" (e.g. VOLM030+) to command all monitors; all monitors respond. Cannot be used in LOW POWER standby.
- Timing: wait for OK/ERR before next command; response timeout 10s or longer (daisy chain: monitor position x 10s, e.g. 3rd monitor = 30s); ALL RESET needs 30s+; POWER ON DELAY active: timeout = delay + 10s; minimum 100 ms between response and next command.
- WAIT returned for: repeater control, IDSL/IDLK, and commands RSET, INPS, ASNC, WIDE, EMAG, EPOS, PXSL, POWR, AGIN, MWIN, MWIP, MWPP, ESTG, EMHV, EPHV, ESHV. No ID attached to WAIT. Do not send commands during WAIT.
- If no monitor matches designated ID (e.g. IDSL0002 with no ID 2 present), no response returned. Bad connection = no response at all (not even ERR).
- PN-ZB01 (optional) required for LAN, EMHV/EPHV/ESHV and some commands marked in table with (A)/(B) columns; RS-232C and LAN control cannot be used simultaneously (CTLS selects). UNSELECTED returned over RS-232C when CTLS = LAN.
- Factory LAN defaults (PN-ZB01): IP 192.168.150.2, subnet 255.255.255.0, gateway 0.0.0.0; configure PC as 192.168.150.3 to access via Internet Explorer.
- STANDBY MODE LOW POWER restricts standby-mode commands (marked "-" in table) and repeater control in standby; OFF LED unavailable in LOW POWER.
- ALL RESET 1 (with PN-ZB01) initializes personal information including registered e-mail addresses — relevant before transfer/disposal.
- ARST opcode covers three resets (1=SCREEN, 2=PICTURE, 3=AUDIO); WIDE opcode covers both PC and AV screen-size mappings with different value meanings.
<!-- UNRESOLVED: LAN control protocol details (port, HTTP API, e-mail notification format) not stated in source. -->
<!-- UNRESOLVED: LANG full 0-14 code mapping partially illegible in source table. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_man_PNE421_471.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_man_PNE521_601.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_man_PNE521_601_install.pdf
  - https://business.sharpusa.com/Portals/0/downloads/Manuals/PN_E603_703_Operation_Manual.pdf
retrieved_at: 2026-05-01T02:57:30.386Z
last_checked_at: 2026-09-19T22:17:16.715Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-19T22:17:16.715Z
matched_actions: 143
action_count: 143
confidence: medium
summary: "All 143 spec actions map to distinct 4-char opcodes in the RS-232C command table; transport values verified; source command catalogue fully represented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN control method details (port, URL paths, API) not documented in source — only web-browser access mentioned."
- "exact model list covered by this manual — only PN-E421 explicitly named in source text."
- "firmware version compatibility not stated in source."
- "no URL/path pattern stated in source"
- "port number not stated in source"
- "no additional settable parameters outside the command table found in source."
- "LAN/e-mail notification content (PN-ZB01) not detailed in source."
- "source contains no explicit safety warnings, interlock procedures, or"
- "LAN control protocol details (port, HTTP API, e-mail notification format) not stated in source."
- "LANG full 0-14 code mapping partially illegible in source table."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
