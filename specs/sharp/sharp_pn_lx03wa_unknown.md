---
spec_id: admin/sharp-pn-lx03wa
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN-Lx03WA Control Spec"
manufacturer: Sharp
model_family: PN-L703WA
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - PN-L703WA
    - PN-L603WA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
  - docs.aws.sharp.eu
  - assets.sharpnecdisplays.us
  - github.com
  - manualsdump.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN_L603WA_L703WA_Operation_manual.pdf
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/PN-LC862_LC752_LC652_External_Control_N-Format_ver1-0.pdf
  - https://assets.sharpnecdisplays.us/documents/usermanuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
  - https://github.com/SharpNECDisplaySolutions/IMHRestAPI
  - https://manualsdump.com/en/manuals/sharp-led_tv/214345/74
retrieved_at: 2026-08-10T22:40:00.789Z
last_checked_at: 2026-08-19T09:47:40.178Z
generated_at: 2026-08-19T09:47:40.178Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version compatibility not stated; PN-L803CA also hinted at by sibling entries but not confirmed by this source."
  - "source states DATA PORT is configurable 1025-65535 but gives no fixed default."
  - "default TCP data port not stated in source"
  - "no unsolicited notifications documented for the RS-232C / TCP data-port"
  - "no mains voltage/current/power specs stated in this control-protocol"
  - "default DATA PORT value not stated in source."
  - "firmware version compatibility not stated."
  - "PN-L803CA sibling may share command set but not confirmed by this source."
  - "electrical/voltage/current specs not in this control excerpt."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:47:40.178Z
  matched_actions: 230
  action_count: 230
  confidence: medium
  summary: "All 230 spec opcodes (POWR, INPS, VOLM, UGRW, AUTR, SC01-08, SB01-08, etc.) verified verbatim in source; transport (38400 baud, 8/N/1, http://192.168.150.2/) matches source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Sharp PN-Lx03WA Control Spec

## Summary
Sharp AQUOS BOARD interactive LCD monitor (PN-L703WA / PN-L603WA). Supports RS-232C and LAN (TCP data port + web browser HTTP UI) control using a shared 8-character ASCII command set (4-char command + 4-char parameter, CR/CRLF terminated). Source: PN-L703WA/PN-L603WA operation manual, RS-232C/LAN control chapter.

<!-- UNRESOLVED: exact firmware version compatibility not stated; PN-L803CA also hinted at by sibling entries but not confirmed by this source. -->

## Transport
```yaml
# Source documents both RS-232C and LAN control. LAN exposes both a raw TCP
# "data port" (command-based, same opcode set as RS-232C) and an HTTP web UI.
# RS-232C and LAN cannot be used simultaneously (source p.34/42).
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 38400  # initial factory setting; selectable 9600/19200/38400 via BAUD command
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  # UNRESOLVED: source states DATA PORT is configurable 1025-65535 but gives no fixed default.
  port: null  # UNRESOLVED: default TCP data port not stated in source
  base_url: "http://{ip}/"  # web UI; factory monitor IP 192.168.150.2 (DHCP off)
auth:
  type: none  # inferred: no auth procedure on RS-232C. LAN command-mode + web UI use an OPTIONAL settable username/password (up to 8 alphanumeric chars, see source p.57/61).
```

## Traits
```yaml
- powerable    # POWR command present
- queryable    # many R-direction query commands (PW?, INPS?, DSTA, etc.)
- routable     # INPS input selection across HDMI1/2/3, D-SUB1/2, DisplayPort, etc.
- levelable    # VOLM, contrast, brightness, color, position ranges present
```

## Actions

```yaml
# Command format: 4-char command field + 4-char parameter field (pad with spaces),
# terminated by return code (0DH, 0AH, or 0DH). Negative values use 3 digits (e.g. AUTR-005).
# MPOS / DATE / SCxx / SBxx take non-space packed parameters.
# R-direction commands accept "????" or " ?" as parameter to query current value.
# Enumerated opcodes (SC01-SC08, SB01-SB08, IN1E-IN6E, APxx) emitted as separate
# actions per source rows.

# ---- Power control / Input mode selection ----
- id: power_set
  label: Power Control
  kind: action
  command: "POWR{state:4}"
  params:
    - name: state
      type: integer
      description: "0 = standby, 1 = power on"
- id: power_query
  label: Power State Query
  kind: query
  command: "POWR????"
  params: []
  # Reply: 0=standby, 1=normal, 2=input-signal-waiting
- id: input_mode_set
  label: Input Mode Selection
  kind: action
  command: "INPS{mode:4}"
  params:
    - name: mode
      type: integer
      description: "0=toggle, 2=D-SUB1[RGB], 3=D-SUB1[COMPONENT], 4=D-SUB1[VIDEO], 9=HDMI1[AV], 10=HDMI1[PC], 12=HDMI2[AV], 13=HDMI2[PC], 14=DisplayPort, 16=D-SUB2, 17=HDMI3[AV], 18=HDMI3[PC], 19=Direct Drawing, 20=Wireless"
- id: input_mode_query
  label: Input Mode Query
  kind: query
  command: "INPS????"
  params: []

# ---- SCREEN menu ----
- id: screen_auto
  label: Screen Auto Adjust
  kind: action
  command: "ASNC0001"
  params: []
- id: clock_set
  label: Clock
  kind: action
  command: "CLCK{value:4}"
  params:
    - name: value
      type: integer
      description: "0-1200 (PC inputs)"
- id: phase_set
  label: Phase
  kind: action
  command: "PHSE{value:4}"
  params:
    - name: value
      type: integer
      description: "0-63"
- id: h_position_set
  label: Horizontal Position
  kind: action
  command: "HPOS{value:4}"
  params:
    - name: value
      type: integer
      description: "0-100 (0-800 on PC inputs)"
- id: v_position_set
  label: Vertical Position
  kind: action
  command: "VPOS{value:4}"
  params:
    - name: value
      type: integer
      description: "0-100 (0-200 on PC inputs)"
- id: h_size_set
  label: Horizontal Size
  kind: action
  command: "HSIZ{value:4}"
  params:
    - name: value
      type: integer
      description: "0-100"
- id: v_size_set
  label: Vertical Size
  kind: action
  command: "VSIZ{value:4}"
  params:
    - name: value
      type: integer
      description: "0-100"
- id: h_resolution_set
  label: Horizontal Resolution
  kind: action
  command: "HRES{value:4}"
  params:
    - name: value
      type: integer
      description: "300-1920, even numbers only (PC inputs)"
- id: v_resolution_set
  label: Vertical Resolution
  kind: action
  command: "VRES{value:4}"
  params:
    - name: value
      type: integer
      description: "200-1200"
- id: screen_reset
  label: Screen Reset
  kind: action
  command: "ARST0001"
  params: []

# ---- PICTURE menu ----
- id: bright_set
  label: Brightness (VLMP)
  kind: action
  command: "VLMP{value:4}"
  params:
    - name: value
      type: integer
      description: "0-31"
- id: contrast_set
  label: Contrast
  kind: action
  command: "CONT{value:4}"
  params:
    - name: value
      type: integer
      description: "0-60"
- id: black_level_set
  label: Black Level
  kind: action
  command: "BLVL{value:4}"
  params:
    - name: value
      type: integer
      description: "0-60"
- id: tint_set
  label: Tint
  kind: action
  command: "TINT{value:4}"
  params:
    - name: value
      type: integer
      description: "0-60"
- id: colors_set
  label: Colors
  kind: action
  command: "COLR{value:4}"
  params:
    - name: value
      type: integer
      description: "0-60"
- id: sharpness_set
  label: Sharpness
  kind: action
  command: "SHRP{value:4}"
  params:
    - name: value
      type: integer
      description: "0-24"
- id: color_mode_set
  label: Color Mode (BMOD)
  kind: action
  command: "BMOD{value:4}"
  params:
    - name: value
      type: integer
      description: "0=STD, 2=VIVID, 3=sRGB (PC), 4=HIGH ILLUMINANCE"
- id: white_balance_ctmp_set
  label: White Balance (THRU/PRESET/USER)
  kind: action
  command: "CTMP{value:4}"
  params:
    - name: value
      type: integer
      description: "0=THRU (PC), 1-28=PRESET Kelvin steps, 99=USER"
- id: r_contrast_set
  label: R-Contrast
  kind: action
  command: "CRTR{value:4}"
  params:
    - name: value
      type: integer
      description: "0-256 (ERR if CTMP != 99)"
- id: g_contrast_set
  label: G-Contrast
  kind: action
  command: "CRTG{value:4}"
  params:
    - name: value
      type: integer
      description: "0-256"
- id: b_contrast_set
  label: B-Contrast
  kind: action
  command: "CRTB{value:4}"
  params:
    - name: value
      type: integer
      description: "0-256"
- id: r_offset_set
  label: R-Offset
  kind: action
  command: "OFSR{value:4}"
  params:
    - name: value
      type: integer
      description: "-127 to 127"
- id: g_offset_set
  label: G-Offset
  kind: action
  command: "OFSG{value:4}"
  params:
    - name: value
      type: integer
      description: "-127 to 127"
- id: b_offset_set
  label: B-Offset
  kind: action
  command: "OFSB{value:4}"
  params:
    - name: value
      type: integer
      description: "-127 to 127"
- id: copy_to_user
  label: Copy Preset to User
  kind: action
  command: "CPTU0000"
  params: []
- id: gamma_set
  label: Gamma
  kind: action
  command: "GAMM{value:4}"
  params:
    - name: value
      type: integer
      description: "PC: 0=1.8, 1=2.2, 2=2.4, 4=USER, 5=2.0, 6=STD. AV: 0=LIGHT2, 2=DARK, 4=USER, 5=LIGHT1, 6=STD."
- id: flesh_tone_set
  label: Flesh Tone (AV)
  kind: action
  command: "FLES{value:4}"
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=LOW, 2=HIGH"
# C.M.S.-HUE (AV) per-channel
- id: cms_hue_r
  label: C.M.S.-Hue R
  kind: action
  command: "CMHR{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_hue_y
  label: C.M.S.-Hue Y
  kind: action
  command: "CMHY{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_hue_g
  label: C.M.S.-Hue G
  kind: action
  command: "CMHG{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_hue_c
  label: C.M.S.-Hue C
  kind: action
  command: "CMHC{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_hue_b
  label: C.M.S.-Hue B
  kind: action
  command: "CMHB{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_hue_m
  label: C.M.S.-Hue M
  kind: action
  command: "CMHM{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_hue_reset
  label: C.M.S.-Hue Reset
  kind: action
  command: "CRST0001"
  params: []
# C.M.S.-SATURATION (AV) per-channel
- id: cms_sat_r
  label: C.M.S.-Saturation R
  kind: action
  command: "CMSR{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_sat_y
  label: C.M.S.-Saturation Y
  kind: action
  command: "CMSY{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_sat_g
  label: C.M.S.-Saturation G
  kind: action
  command: "CMSG{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_sat_c
  label: C.M.S.-Saturation C
  kind: action
  command: "CMSC{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_sat_b
  label: C.M.S.-Saturation B
  kind: action
  command: "CMSB{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_sat_m
  label: C.M.S.-Saturation M
  kind: action
  command: "CMSM{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_sat_reset
  label: C.M.S.-Saturation Reset
  kind: action
  command: "CRST0002"
  params: []
# C.M.S.-VALUE (AV) per-channel
- id: cms_val_r
  label: C.M.S.-Value R
  kind: action
  command: "CMVR{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_val_y
  label: C.M.S.-Value Y
  kind: action
  command: "CMVY{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_val_g
  label: C.M.S.-Value G
  kind: action
  command: "CMVG{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_val_c
  label: C.M.S.-Value C
  kind: action
  command: "CMVC{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_val_b
  label: C.M.S.-Value B
  kind: action
  command: "CMVB{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_val_m
  label: C.M.S.-Value M
  kind: action
  command: "CMVM{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: cms_val_reset
  label: C.M.S.-Value Reset
  kind: action
  command: "CRST0003"
  params: []

# ---- ADVANCED (PICTURE) ----
- id: advanced_auto
  label: Advanced Auto
  kind: action
  command: "AGIN0001"
  params: []
- id: analog_gain_set
  label: Analog Gain
  kind: action
  command: "ANGA{value:4}"
  params: [{name: value, type: integer, description: "0-127 (PC inputs)"}]
- id: analog_offset_set
  label: Analog Offset
  kind: action
  command: "ANOF{value:4}"
  params: [{name: value, type: integer, description: "0-127 (PC inputs)"}]
- id: tdnr_set
  label: 3D-NR (AV)
  kind: action
  command: "TDNR{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=LOW, 2=HIGH"}]
- id: mpnr_set
  label: MPEG-NR (AV)
  kind: action
  command: "MPNR{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: ycsp_set
  label: 3D-Y/C (D-SUB1[VIDEO])
  kind: action
  command: "YCSP{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: rgb_range_hdmi1_av
  label: RGB Input Range HDMI1[AV]
  kind: action
  command: "AHDR{value:4}"
  params: [{name: value, type: integer, description: "0=AUTO, 1=FULL, 2=LIMITED"}]
- id: rgb_range_hdmi1_pc
  label: RGB Input Range HDMI1[PC]
  kind: action
  command: "PHDR{value:4}"
  params: [{name: value, type: integer, description: "0=AUTO, 1=FULL, 2=LIMITED"}]
- id: rgb_range_hdmi2_av
  label: RGB Input Range HDMI2[AV]
  kind: action
  command: "AH2R{value:4}"
  params: [{name: value, type: integer, description: "0=AUTO, 1=FULL, 2=LIMITED"}]
- id: rgb_range_hdmi2_pc
  label: RGB Input Range HDMI2[PC]
  kind: action
  command: "PH2R{value:4}"
  params: [{name: value, type: integer, description: "0=AUTO, 1=FULL, 2=LIMITED"}]
- id: rgb_range_hdmi3_av
  label: RGB Input Range HDMI3[AV]
  kind: action
  command: "AH3R{value:4}"
  params: [{name: value, type: integer, description: "0=AUTO, 1=FULL, 2=LIMITED"}]
- id: rgb_range_hdmi3_pc
  label: RGB Input Range HDMI3[PC]
  kind: action
  command: "PH3R{value:4}"
  params: [{name: value, type: integer, description: "0=AUTO, 1=FULL, 2=LIMITED"}]
- id: rgb_range_dsub1
  label: RGB Input Range D-SUB1[RGB]
  kind: action
  command: "PDSR{value:4}"
  params: [{name: value, type: integer, description: "1=FULL, 2=LIMITED"}]
- id: rgb_range_dsub2
  label: RGB Input Range D-SUB2
  kind: action
  command: "PD2R{value:4}"
  params: [{name: value, type: integer, description: "1=FULL, 2=LIMITED"}]
- id: rgb_range_wireless
  label: RGB Input Range Wireless/Direct Drawing
  kind: action
  command: "PWHR{value:4}"
  params: [{name: value, type: integer, description: "1=FULL, 2=LIMITED"}]
- id: rgb_range_displayport
  label: RGB Input Range DisplayPort
  kind: action
  command: "PDPR{value:4}"
  params: [{name: value, type: integer, description: "0=AUTO, 1=FULL, 2=LIMITED"}]
- id: active_contrast_set
  label: Active Contrast (AV)
  kind: action
  command: "ACNT{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: display_color_pattern
  label: Display Color Pattern
  kind: action
  command: "PTDF{value:4}"
  params: [{name: value, type: integer, description: "0=none, 1=White, 2=Red, 3=Green, 4=Blue, 99=RGB mixed"}]
- id: color_pattern_r
  label: Color Pattern R Level
  kind: action
  command: "PTDR{value:4}"
  params: [{name: value, type: integer, description: "0-15 (ERR if PTDF!=99)"}]
- id: color_pattern_g
  label: Color Pattern G Level
  kind: action
  command: "PTDG{value:4}"
  params: [{name: value, type: integer, description: "0-15"}]
- id: color_pattern_b
  label: Color Pattern B Level
  kind: action
  command: "PTDB{value:4}"
  params: [{name: value, type: integer, description: "0-15"}]
- id: picture_reset
  label: Picture Reset
  kind: action
  command: "ARST0002"
  params: []

# ---- AUDIO menu ----
- id: treble_set
  label: Treble
  kind: action
  command: "AUTR{value:4}"
  params: [{name: value, type: integer, description: "-5 to 5 (use 3-digit negative form, e.g. AUTR-005)"}]
- id: bass_set
  label: Bass
  kind: action
  command: "AUBS{value:4}"
  params: [{name: value, type: integer, description: "-5 to 5"}]
- id: balance_set
  label: Balance
  kind: action
  command: "AUBL{value:4}"
  params: [{name: value, type: integer, description: "-10 to 10"}]
- id: audio_reset
  label: Audio Reset
  kind: action
  command: "ARST0003"
  params: []

# ---- SETUP menu ----
- id: date_time_set
  label: Date/Time Setting
  kind: action
  command: "DATE{AABBCCDDEE}"
  params: [{name: timestamp, type: string, description: "AA=Year, BB=Month, CC=Day, DD=Hour, EE=Minute"}]
- id: date_format_set
  label: Date Display Format
  kind: action
  command: "DTFT{value:4}"
  params: [{name: value, type: integer, description: "0=YYYY/MM/DD, 1=MM/DD/YYYY, 2=DD/MM/YYYY"}]
- id: time_format_set
  label: Time Display Format
  kind: action
  command: "TMFT{value:4}"
  params: [{name: value, type: integer, description: "0=24h, 1=12h"}]
# Schedule SC01-SC08 (8 distinct opcodes per source row)
- id: schedule_01
  label: Schedule 1
  kind: action
  command: "SC01{ABCDEFFGGH}"
  params: [{name: block, type: string, description: "A=effective, B=power, C/D/E=day, F=hour, G=minute, H=input (see source p.48)"}]
- id: schedule_02
  label: Schedule 2
  kind: action
  command: "SC02{ABCDEFFGGH}"
  params: [{name: block, type: string, description: "Schedule block, format per source p.48"}]
- id: schedule_03
  label: Schedule 3
  kind: action
  command: "SC03{ABCDEFFGGH}"
  params: [{name: block, type: string, description: "Schedule block, format per source p.48"}]
- id: schedule_04
  label: Schedule 4
  kind: action
  command: "SC04{ABCDEFFGGH}"
  params: [{name: block, type: string, description: "Schedule block, format per source p.48"}]
- id: schedule_05
  label: Schedule 5
  kind: action
  command: "SC05{ABCDEFFGGH}"
  params: [{name: block, type: string, description: "Schedule block, format per source p.48"}]
- id: schedule_06
  label: Schedule 6
  kind: action
  command: "SC06{ABCDEFFGGH}"
  params: [{name: block, type: string, description: "Schedule block, format per source p.48"}]
- id: schedule_07
  label: Schedule 7
  kind: action
  command: "SC07{ABCDEFFGGH}"
  params: [{name: block, type: string, description: "Schedule block, format per source p.48"}]
- id: schedule_08
  label: Schedule 8
  kind: action
  command: "SC08{ABCDEFFGGH}"
  params: [{name: block, type: string, description: "Schedule block, format per source p.48"}]
# Schedule brightness SB01-SB08 (8 distinct opcodes)
- id: schedule_brightness_01
  label: Schedule 1 Brightness
  kind: action
  command: "SB01{value:4}"
  params: [{name: value, type: integer, description: "0-31, 99=disable"}]
- id: schedule_brightness_02
  label: Schedule 2 Brightness
  kind: action
  command: "SB02{value:4}"
  params: [{name: value, type: integer, description: "0-31, 99=disable"}]
- id: schedule_brightness_03
  label: Schedule 3 Brightness
  kind: action
  command: "SB03{value:4}"
  params: [{name: value, type: integer, description: "0-31, 99=disable"}]
- id: schedule_brightness_04
  label: Schedule 4 Brightness
  kind: action
  command: "SB04{value:4}"
  params: [{name: value, type: integer, description: "0-31, 99=disable"}]
- id: schedule_brightness_05
  label: Schedule 5 Brightness
  kind: action
  command: "SB05{value:4}"
  params: [{name: value, type: integer, description: "0-31, 99=disable"}]
- id: schedule_brightness_06
  label: Schedule 6 Brightness
  kind: action
  command: "SB06{value:4}"
  params: [{name: value, type: integer, description: "0-31, 99=disable"}]
- id: schedule_brightness_07
  label: Schedule 7 Brightness
  kind: action
  command: "SB07{value:4}"
  params: [{name: value, type: integer, description: "0-31, 99=disable"}]
- id: schedule_brightness_08
  label: Schedule 8 Brightness
  kind: action
  command: "SB08{value:4}"
  params: [{name: value, type: integer, description: "0-31, 99=disable"}]
- id: language_set
  label: Language
  kind: action
  command: "LANG{value:4}"
  params: [{name: value, type: integer, description: "1=DEUTSCH, 2=FRANCAIS, 3=ITALIANO, 4=ESPANOL, 5=RUSSKI, 6=(undef), 14=ENGLISH"}]
# INPUT SELECT group
- id: input_select_hdmi1
  label: HDMI1 Input Select
  kind: action
  command: "HDSL{value:4}"
  params: [{name: value, type: integer, description: "0=PC, 1=AV"}]
- id: input_select_hdmi2
  label: HDMI2 Input Select
  kind: action
  command: "H2SL{value:4}"
  params: [{name: value, type: integer, description: "0=PC, 1=AV"}]
- id: input_select_hdmi3
  label: HDMI3 Input Select
  kind: action
  command: "H3SL{value:4}"
  params: [{name: value, type: integer, description: "0=PC, 1=AV"}]
- id: input_select_dsub1
  label: D-SUB1 Input Select
  kind: action
  command: "SLDS{value:4}"
  params: [{name: value, type: integer, description: "0=RGB, 1=COMPONENT, 2=VIDEO"}]
- id: hdmi1_auto_view
  label: HDMI1 Auto View
  kind: action
  command: "HDAW{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: hdmi2_auto_view
  label: HDMI2 Auto View
  kind: action
  command: "H2AW{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: hdmi3_auto_view
  label: HDMI3 Auto View
  kind: action
  command: "H3AW{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: hotplug_hdmi1
  label: Hot Plug Control HDMI1
  kind: action
  command: "HPCH{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: hotplug_hdmi2
  label: Hot Plug Control HDMI2
  kind: action
  command: "HPH2{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: hotplug_hdmi3
  label: Hot Plug Control HDMI3
  kind: action
  command: "HPH3{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
# INPUT MODE NAME (which name to edit)
- id: input_name_displayport
  label: Input Mode Name (DisplayPort)
  kind: action
  command: "INDP{value:4}"
  params: [{name: value, type: integer, description: "0-30 preset tag (see source p.48)"}]
- id: input_name_hdmi1
  label: Input Mode Name (HDMI1)
  kind: action
  command: "INH1{value:4}"
  params: []
- id: input_name_hdmi2
  label: Input Mode Name (HDMI2)
  kind: action
  command: "INH2{value:4}"
  params: []
- id: input_name_hdmi3
  label: Input Mode Name (HDMI3)
  kind: action
  command: "INH3{value:4}"
  params: []
- id: input_name_dsub1
  label: Input Mode Name (D-SUB1)
  kind: action
  command: "IND1{value:4}"
  params: []
- id: input_name_dsub2
  label: Input Mode Name (D-SUB2)
  kind: action
  command: "IND2{value:4}"
  params: []
# Edit input mode name IN1E-IN6E
- id: edit_input_name_1
  label: Edit Input Mode Name (INPUT1)
  kind: action
  command: "IN1E{text}"
  params: [{name: text, type: string, description: "Alphanumeric/symbols only, max 18 chars"}]
- id: edit_input_name_2
  label: Edit Input Mode Name (INPUT2)
  kind: action
  command: "IN2E{text}"
  params: [{name: text, type: string, description: "Max 18 chars"}]
- id: edit_input_name_3
  label: Edit Input Mode Name (INPUT3)
  kind: action
  command: "IN3E{text}"
  params: [{name: text, type: string, description: "Max 18 chars"}]
- id: edit_input_name_4
  label: Edit Input Mode Name (INPUT4)
  kind: action
  command: "IN4E{text}"
  params: [{name: text, type: string, description: "Max 18 chars"}]
- id: edit_input_name_5
  label: Edit Input Mode Name (INPUT5)
  kind: action
  command: "IN5E{text}"
  params: [{name: text, type: string, description: "Max 18 chars"}]
- id: edit_input_name_6
  label: Edit Input Mode Name (INPUT6)
  kind: action
  command: "IN6E{text}"
  params: [{name: text, type: string, description: "Max 18 chars"}]
# AUDIO SELECT (per input)
- id: audio_select_displayport
  label: Audio Select DisplayPort
  kind: action
  command: "ASDI{value:4}"
  params: [{name: value, type: integer, description: "1=AUDIO1, 2=AUDIO2, 3=DisplayPort"}]
- id: audio_select_hdmi1_pc
  label: Audio Select HDMI1[PC]
  kind: action
  command: "ASHP{value:4}"
  params: [{name: value, type: integer, description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"}]
- id: audio_select_hdmi1_av
  label: Audio Select HDMI1[AV]
  kind: action
  command: "ASHA{value:4}"
  params: [{name: value, type: integer, description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"}]
- id: audio_select_hdmi2_pc
  label: Audio Select HDMI2[PC]
  kind: action
  command: "AH2P{value:4}"
  params: [{name: value, type: integer, description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"}]
- id: audio_select_hdmi2_av
  label: Audio Select HDMI2[AV]
  kind: action
  command: "AH2A{value:4}"
  params: [{name: value, type: integer, description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"}]
- id: audio_select_hdmi3_pc
  label: Audio Select HDMI3[PC]
  kind: action
  command: "AH3P{value:4}"
  params: [{name: value, type: integer, description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"}]
- id: audio_select_hdmi3_av
  label: Audio Select HDMI3[AV]
  kind: action
  command: "AH3A{value:4}"
  params: [{name: value, type: integer, description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"}]
- id: audio_select_dsub1_rgb
  label: Audio Select D-SUB1[RGB]
  kind: action
  command: "ASAP{value:4}"
  params: [{name: value, type: integer, description: "1=AUDIO1, 2=AUDIO2"}]
- id: audio_select_dsub1_component
  label: Audio Select D-SUB1[COMPONENT]
  kind: action
  command: "ASC2{value:4}"
  params: [{name: value, type: integer, description: "1=AUDIO1, 2=AUDIO2"}]
- id: audio_select_dsub1_video
  label: Audio Select D-SUB1[VIDEO]
  kind: action
  command: "ASV2{value:4}"
  params: [{name: value, type: integer, description: "1=AUDIO1, 2=AUDIO2"}]
- id: audio_select_dsub2
  label: Audio Select D-SUB2
  kind: action
  command: "ASA2{value:4}"
  params: [{name: value, type: integer, description: "1=AUDIO1, 2=AUDIO2"}]
- id: audio_select_direct_drawing
  label: Audio Select Direct Drawing
  kind: action
  command: "ASWH{value:4}"
  params: [{name: value, type: integer, description: "1=AUDIO1, 2=AUDIO2"}]
- id: audio_select_wireless
  label: Audio Select Wireless
  kind: action
  command: "ASWL{value:4}"
  params: [{name: value, type: integer, description: "0=Wireless, 1=AUDIO1, 2=AUDIO2"}]
# AUDIO OPTION
- id: speaker_select
  label: Speaker Select
  kind: action
  command: "SPSL{value:4}"
  params: [{name: value, type: integer, description: "0=Internal, 1=External"}]
- id: audio_output_set
  label: Audio Output
  kind: action
  command: "AOUT{value:4}"
  params: [{name: value, type: integer, description: "0=VARIABLE1, 1=FIXED, 2=VARIABLE2"}]
- id: audio_input_level_1
  label: Audio Input Level 1
  kind: action
  command: "AIVP{value:4}"
  params: [{name: value, type: integer, description: "0=1.0Vrms, 1=0.5Vrms"}]
- id: audio_input_level_2
  label: Audio Input Level 2
  kind: action
  command: "AIV2{value:4}"
  params: [{name: value, type: integer, description: "0=1.0Vrms, 1=0.5Vrms"}]
# TOUCH INPUT SELECT
- id: touch_input_bottom_usb
  label: Touch Input (Bottom USB)
  kind: action
  command: "USCB{value:4}"
  params: [{name: value, type: integer, description: "0=INVALID, 1=BOTTOM INPUT TERM, 2=DisplayPort, 3=HDMI1, 4=HDMI2, 5=HDMI3, 6=D-SUB1, 7=D-SUB2"}]
- id: touch_input_side_usb
  label: Touch Input (Side USB)
  kind: action
  command: "USCS{value:4}"
  params: [{name: value, type: integer, description: "0=INVALID, 1=SIDE INPUT TERM, 2=DisplayPort, 3=HDMI1, 4=HDMI2, 5=HDMI3, 6=D-SUB1, 7=D-SUB2"}]
- id: start_input_mode
  label: Start Input Mode
  kind: action
  command: "SUIM{value:4}"
  params: [{name: value, type: integer, description: "0=Direct Drawing, 1=LAST INPUT MODE, 2=DisplayPort, 3=HDMI1, 4=HDMI2, 5=HDMI3, 7=D-SUB1, 8=D-SUB2, 9=Wireless"}]
# COMMUNICATION SETTING
- id: comm_select
  label: RS-232C/LAN Select
  kind: action
  command: "CTLS{value:4}"
  params: [{name: value, type: integer, description: "0=RS-232C, 1=LAN"}]
- id: baud_rate_set
  label: Baud Rate
  kind: action
  command: "BAUD{value:4}"
  params: [{name: value, type: integer, description: "0=9600, 1=19200, 2=38400 bps"}]
- id: wireless_function
  label: Wireless Function
  kind: action
  command: "WLFC{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: wireless_connect_auto_input
  label: Wireless Connect Auto Input Select
  kind: action
  command: "AICW{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]

# ---- MONITOR menu ----
- id: osd_h_position
  label: OSD H-Position
  kind: action
  command: "OSDH{value:4}"
  params: [{name: value, type: integer, description: "0-100"}]
- id: osd_v_position
  label: OSD V-Position
  kind: action
  command: "OSDV{value:4}"
  params: [{name: value, type: integer, description: "0-100"}]
- id: power_save_mode
  label: Power Save Mode
  kind: action
  command: "STBM{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON (ERR if ADJUSTMENT LOCK ON2 or SCHEDULE effective)"}]
- id: off_if_no_operation
  label: OFF IF NO OPERATION
  kind: action
  command: "ATOF{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: off_if_no_op_time
  label: OFF IF NO OPERATION Time
  kind: action
  command: "AOFT{value:4}"
  params: [{name: value, type: integer, description: "1-12 hours"}]
- id: power_on_delay
  label: Power On Delay
  kind: action
  command: "PODS{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: power_on_delay_interval
  label: Power On Delay Interval
  kind: action
  command: "PWOD{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1-60 seconds"}]
- id: self_adjust
  label: Self Adjust
  kind: action
  command: "AADJ{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: self_adjust_start_timing
  label: Self Adjust Start Timing
  kind: action
  command: "AADD{value:4}"
  params: [{name: value, type: integer, description: "10-200 (10=1s through 200=20s)"}]
- id: touch_output_invalid_icon
  label: Touch Output Invalid Icon
  kind: action
  command: "TOPI{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: touch_icon_position
  label: Touch Icon Display Position
  kind: action
  command: "TOIP{value:4}"
  params: [{name: value, type: integer, description: "0=UPPER RIGHT, 1=UPPER LEFT, 2=LOWER RIGHT, 3=LOWER LEFT"}]
- id: touch_operation_mode
  label: Touch Operation Mode
  kind: action
  command: "TOMD{value:4}"
  params: [{name: value, type: integer, description: "0=AUTO, 1=MULTI-TOUCH, 2=MOUSE (ERR if touch panel not connected or input=Direct Drawing/Wireless)"}]
- id: touch_panel_mode
  label: Touch Panel Mode (PC)
  kind: action
  command: "GMDP{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]

# ---- PIP/PbyP menu ----
- id: pip_modes
  label: PIP Modes
  kind: action
  command: "MWIN{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=PIP, 2=PbyP, 3=PbyP2"}]
- id: pip_size
  label: PIP Size
  kind: action
  command: "MPSZ{value:4}"
  params: [{name: value, type: integer, description: "1-64"}]
- id: pip_h_pos
  label: PIP H-Position
  kind: action
  command: "MHPS{value:4}"
  params: [{name: value, type: integer, description: "0-100"}]
- id: pip_v_pos
  label: PIP V-Position
  kind: action
  command: "MVPS{value:4}"
  params: [{name: value, type: integer, description: "0-100"}]
- id: pip_pos_batch
  label: PIP Position Batch (LD+SD)
  kind: action
  command: "MPOS{xxx}{yyy}"
  params:
    - name: xxx
      type: integer
      description: "Longest-direction position 0-100"
    - name: yyy
      type: integer
      description: "Shortest-direction position 0-100"
- id: pip_blend
  label: PIP Blend
  kind: action
  command: "MWBL{value:4}"
  params: [{name: value, type: integer, description: "0-15"}]
- id: pip_source
  label: PIP Source
  kind: action
  command: "MWIP{value:4}"
  params: [{name: value, type: integer, description: "2/3/4=D-SUB1[RGB/COMPONENT/VIDEO], 9/10=HDMI1[AV/PC], 12/13=HDMI2[AV/PC], 14=DisplayPort, 16=D-SUB2, 17/18=HDMI3[AV/PC], 19=Direct Drawing, 20=Wireless"}]
- id: sound_change
  label: Sound Change
  kind: action
  command: "MWAD{value:4}"
  params: [{name: value, type: integer, description: "1=MAIN, 2=SUB"}]
- id: main_pos
  label: Main Position (PbyP)
  kind: action
  command: "MWPP{value:4}"
  params: [{name: value, type: integer, description: "0=POS1, 1=POS2"}]
- id: pbyp2_pos
  label: PbyP2 Sub Position
  kind: action
  command: "MW2P{value:4}"
  params: [{name: value, type: integer, description: "0=POS1, 1=POS2, 2=POS3"}]
- id: pip_auto_off
  label: PIP Auto Off
  kind: action
  command: "MOFF{value:4}"
  params: [{name: value, type: integer, description: "0=MANUAL, 1=AUTO"}]

# ---- OTHERS menu ----
- id: screen_motion_pattern
  label: Screen Motion Pattern
  kind: action
  command: "SCSV{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1-4=PATTERN1-4"}]
- id: motion_time_1
  label: Motion Time 1
  kind: action
  command: "MTIM{value:4}"
  params: [{name: value, type: integer, description: "0-20"}]
- id: motion_time_2_pattern1
  label: Motion Time 2 (Pattern 1)
  kind: action
  command: "MINT{value:4}"
  params: [{name: value, type: integer, description: "10-990 per 10 seconds"}]
- id: motion_time_2_pattern2_4
  label: Motion Time 2 (Pattern 2-4)
  kind: action
  command: "MINT{value:4}"
  params: [{name: value, type: integer, description: "5-20 seconds"}]
- id: power_management_pc
  label: Power Management (PC)
  kind: action
  command: "PMNG{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: power_management_av
  label: Power Management (AV)
  kind: action
  command: "PMAV{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: connect_auto_input_select
  label: Connect Auto Input Select
  kind: action
  command: "AICO{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: no_signal_auto_input
  label: No Signal Auto Input Sel.
  kind: action
  command: "AINO{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
# AUTO INPUT SELECT PRIORITY (per-input opcodes)
- id: auto_input_priority_displayport
  label: Auto Input Priority DisplayPort
  kind: action
  command: "APDP{value:4}"
  params: [{name: value, type: integer, description: "0=not selected, 1-8=priority"}]
- id: auto_input_priority_hdmi1
  label: Auto Input Priority HDMI1
  kind: action
  command: "APH1{value:4}"
  params: [{name: value, type: integer, description: "0=not selected, 1-8=priority"}]
- id: auto_input_priority_hdmi2
  label: Auto Input Priority HDMI2
  kind: action
  command: "APH2{value:4}"
  params: [{name: value, type: integer, description: "0=not selected, 1-8=priority"}]
- id: auto_input_priority_hdmi3
  label: Auto Input Priority HDMI3
  kind: action
  command: "APH3{value:4}"
  params: [{name: value, type: integer, description: "0=not selected, 1-8=priority"}]
- id: auto_input_priority_dsub1
  label: Auto Input Priority D-SUB1
  kind: action
  command: "APD1{value:4}"
  params: [{name: value, type: integer, description: "0=not selected, 1-8=priority"}]
- id: auto_input_priority_dsub2
  label: Auto Input Priority D-SUB2
  kind: action
  command: "APD2{value:4}"
  params: [{name: value, type: integer, description: "0=not selected, 1-8=priority"}]
- id: auto_input_priority_direct_drawing
  label: Auto Input Priority Direct Drawing
  kind: action
  command: "APWB{value:4}"
  params: [{name: value, type: integer, description: "0=not selected, 1-8=priority"}]
- id: auto_input_priority_wireless
  label: Auto Input Priority Wireless
  kind: action
  command: "APWL{value:4}"
  params: [{name: value, type: integer, description: "0=not selected, 1-8=priority"}]
- id: logo_screen
  label: Logo Screen
  kind: action
  command: "BTSC{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: resolution_check_pc
  label: Resolution Check (PC)
  kind: query
  command: "PXCK    "
  params: []
  # Returns hhh,vvv
- id: pixel_setting
  label: Pixel Setting (PC)
  kind: action
  command: "PXSL{value:4}"
  params: [{name: value, type: integer, description: "1=1360x768, 2=1280x768, 3=1024x768, 5=848x480, 6=640x480, 7=1680x1050, 8=1400x1050, 9=768-AUTO, 10=480-AUTO"}]
- id: resolution_check_av
  label: Resolution Check (AV)
  kind: query
  command: "RESO    "
  params: []
  # Returns 480i/480p/1080i/720p/1080p etc.
- id: zoom2_special
  label: Zoom2 Special Setting
  kind: action
  command: "Z2SP{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: scan_mode
  label: Scan Mode (AV)
  kind: action
  command: "SCAN{value:4}"
  params: [{name: value, type: integer, description: "0=MODE1 (over-scan), 1=MODE2 (under-scan), 2=MODE3"}]
- id: color_system
  label: Color System
  kind: action
  command: "CSYS{value:4}"
  params: [{name: value, type: integer, description: "0=AUTO, 1=PAL, 2=PAL-60, 3=SECAM, 4=NTSC3.58, 5=NTSC4.43"}]

# ---- FUNCTION (Initialization/Lock) menu ----
- id: all_reset
  label: All Reset
  kind: action
  command: "RSET{value:4}"
  params: [{name: value, type: integer, description: "0=ALL RESET 1, 1=ALL RESET 2 (timeout 30s+)"}]
- id: adjustment_lock
  label: Adjustment Lock
  kind: action
  command: "ALCK{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON1, 2=ON2 (ERR if POWER SAVE MODE ON)"}]
- id: adjustment_lock_target
  label: Adjustment Lock Target
  kind: action
  command: "ALTG{value:4}"
  params: [{name: value, type: integer, description: "0=REMOTE CONTROL, 1=MONITOR BUTTONS, 2=BOTH"}]
- id: osd_display
  label: OSD Display
  kind: action
  command: "LOSD{value:4}"
  params: [{name: value, type: integer, description: "0=ON1, 1=OFF, 2=ON2"}]
- id: led_set
  label: LED
  kind: action
  command: "OFLD{value:4}"
  params: [{name: value, type: integer, description: "0=ON, 1=OFF"}]
- id: temperature_alert
  label: Temperature Alert
  kind: action
  command: "TALT{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=OSD&LED, 2=LED"}]
- id: status_alert
  label: Status Alert
  kind: action
  command: "SALT{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=OSD&LED, 2=LED"}]
- id: power_button_set
  label: Power Button
  kind: action
  command: "PBTN{value:4}"
  params: [{name: value, type: integer, description: "0=MONITOR, 1=EXT. CONTROLLER"}]
- id: external_controller_input
  label: External Controller Input
  kind: action
  command: "PCIP{value:4}"
  params: [{name: value, type: integer, description: "0=D-SUB1, 1=D-SUB2, 2=DisplayPort, 3=HDMI1, 4=HDMI2, 5=HDMI3"}]

# ---- Others (screen size, volume, info) ----
- id: screen_size_pc
  label: Screen Size (PC)
  kind: action
  command: "WIDE{value:4}"
  params: [{name: value, type: integer, description: "0=toggle, 1=WIDE, 2=NORMAL, 3=Dot by Dot, 4=ZOOM1, 5=ZOOM2"}]
- id: screen_size_av
  label: Screen Size (AV)
  kind: action
  command: "WIDE{value:4}"
  params: [{name: value, type: integer, description: "0=toggle, 1=WIDE, 2=ZOOM1, 3=ZOOM2, 4=NORMAL, 5=Dot by Dot"}]
- id: volume_set
  label: Volume
  kind: action
  command: "VOLM{value:4}"
  params: [{name: value, type: integer, description: "0-31"}]
- id: mute_set
  label: Mute
  kind: action
  command: "MUTE{value:4}"
  params: [{name: value, type: integer, description: "0=OFF, 1=ON"}]
- id: info_model
  label: Information - Model
  kind: query
  command: "INF1    "
  params: []
- id: info_serial
  label: Information - Serial No
  kind: query
  command: "SRNO    "
  params: []
- id: temperature_sensor
  label: Temperature Sensor Status
  kind: query
  command: "DSTA    "
  params: []
  # Reply: 0=normal, 1=abnormal+standby, 2=abnormal, 3=abnormal+dimmed backlight, 4=sensor abnormal
- id: temperature_acquisition
  label: Temperature Acquisition
  kind: query
  command: "ERRT    "
  params: []
  # Returns temperature value; 126 = sensor abnormal
- id: standby_cause_init
  label: Standby Cause Initialization
  kind: action
  command: "STCA0000"
  params: []
- id: standby_cause_query
  label: Cause of Last Standby
  kind: query
  command: "STCA????"
  params: []
  # Reply: 0=no error, 1=POWER btn, 2=main power switch, 3=RS-232C/LAN, 4=no signal, 6=abnormal temp, 8=SCHEDULE, 20=OFF IF NO OPERATION
- id: touch_operation_valid
  label: Touch Operation Valid/Invalid
  kind: action
  command: "TPEN{value:4}"
  params: [{name: value, type: integer, description: "0=Invalid, 1=Valid (ERR if TOUCH INPUT SELECT=INVALID or no panel)"}]

# ---- GAMMA user data ----
- id: gamma_red_transfer
  label: Red Gamma Data Transfer
  kind: action
  command: "UGRW{aa}{32xdata}{cc}"
  params:
    - {name: aa, type: integer, description: "Block 01-16"}
    - {name: data, type: string, description: "32 pieces, each 0000-1023 (4 digits)"}
    - {name: cc, type: string, description: "Checksum 00-FF (ASCII of low byte of sum in hex)"}
- id: gamma_green_transfer
  label: Green Gamma Data Transfer
  kind: action
  command: "UGGW{aa}{32xdata}{cc}"
  params:
    - {name: aa, type: integer, description: "Block 01-16"}
    - {name: data, type: string, description: "32 pieces, each 0000-1023"}
    - {name: cc, type: string, description: "Checksum 00-FF"}
- id: gamma_blue_transfer
  label: Blue Gamma Data Transfer
  kind: action
  command: "UGBW{aa}{32xdata}{cc}"
  params:
    - {name: aa, type: integer, description: "Block 01-16"}
    - {name: data, type: string, description: "32 pieces, each 0000-1023"}
    - {name: cc, type: string, description: "Checksum 00-FF"}
- id: gamma_red_read
  label: Red Gamma Data Read
  kind: query
  command: "UGRR{aa:2}"
  params: [{name: aa, type: integer, description: "Block 1-16; returns 32 pieces (0000-1023 each)"}]
- id: gamma_green_read
  label: Green Gamma Data Read
  kind: query
  command: "UGGR{aa:2}"
  params: [{name: aa, type: integer, description: "Block 1-16"}]
- id: gamma_blue_read
  label: Blue Gamma Data Read
  kind: query
  command: "UGBR{aa:2}"
  params: [{name: aa, type: integer, description: "Block 1-16"}]
- id: gamma_user_initialize
  label: Gamma User Data Initialize
  kind: action
  command: "UGRS0000"
  params: []
- id: gamma_user_save
  label: Gamma User Data Save
  kind: action
  command: "UGSV0000"
  params: []

# ---- LAN command-mode session control ----
- id: lan_bye
  label: LAN Command Session Disconnect
  kind: action
  command: "BYE\r"
  params: []
  # Monitor returns "goodbye" and disconnects the TCP data-port session.
```

## Feedbacks
```yaml
# Query responses / solicited state (R-direction). Same opcodes reused; the
# device replies with the current value when parameter is "????".
- id: power_state
  type: enum
  values: [standby, normal, input_signal_waiting]
  query_command: "POWR????"
- id: input_mode
  type: enum
  values: [D-SUB1_RGB, D-SUB1_COMPONENT, D-SUB1_VIDEO, HDMI1_AV, HDMI1_PC, HDMI2_AV, HDMI2_PC, DisplayPort, D-SUB2, HDMI3_AV, HDMI3_PC, Direct_Drawing, Wireless]
  query_command: "INPS????"
- id: volume
  type: integer
  range: [0, 31]
  query_command: "VOLM????"
- id: temperature_status
  type: enum
  values: [normal, abnormal_standby, abnormal, abnormal_dimmed, sensor_abnormal]
  query_command: "DSTA    "
- id: temperature_value
  type: integer
  query_command: "ERRT    "
  note: "126 indicates temperature sensor abnormality."
- id: standby_cause
  type: enum
  values: [none, power_button, main_power_switch, rs232_or_lan, no_signal, abnormal_temperature, schedule, off_if_no_operation]
  query_command: "STCA????"
- id: model_name
  type: string
  query_command: "INF1    "
- id: serial_number
  type: string
  query_command: "SRNO    "
- id: pc_resolution
  type: string
  query_command: "PXCK    "
  note: "Returns hhh,vvv form."
- id: av_resolution
  type: string
  query_command: "RESO    "
  note: "Returns 480i/480p/720p/1080i/1080p etc."
# Standard solicited response codes:
# "OK"            -> command executed successfully
# "ERR"           -> unknown/unavailable command in current state
# "WAIT"          -> long-running command in progress (RSET, INPS, ASNC, WIDE, PXSL, POWR, AGIN, MWIN, MWIP, MWPP, WLFC)
# "LOCKED"        -> RS-232C control locked (ADJUSTMENT LOCK active)
# "UNSELECTED"    -> RS-232C/LAN SELECT set to the other transport
```

## Variables
```yaml
# No additional continuous variables beyond the parameterized Actions above.
# All settable continuous values (VOLM, CONT, VLMP, HPOS, etc.) are exposed as
# Actions with integer params per source command-table rows.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented for the RS-232C / TCP data-port
# channel. WAIT / OK / ERR / LOCKED / UNSELECTED are solicited responses, not events.
# SNMP trap function exists (source p.60) but is SNMP-stack-level, not part of the
# RS-232C/LAN command protocol - out of scope for this command spec.
```

## Macros
```yaml
# LAN command-based control session login (source p.61).
# Required before sending any RS-232C-style command over the TCP data port when
# SECURITY username/password are configured.
- id: lan_command_login
  name: LAN Command-Mode Login
  steps:
    - send: "open TCP connection to monitor IP + DATA PORT"
      expect_response: "Login:"
    - send: "{username}\r"
      expect_response: "Password:"
      note: "If no username set, send bare carriage return."
    - send: "{password}\r"
      expect_response: "OK"
      note: "If no password set, send bare carriage return."
    - send: "<RS-232C command table commands>"
      note: "Same opcode set as RS-232C; terminate each with return code."
    - send: "BYE\r"
      expect_response: "goodbye"
      note: "Server closes the TCP connection."
```

## Safety
```yaml
confirmation_required_for:
  - all_reset       # RSET clears user settings; source recommends 30s+ timeout
  - gamma_user_initialize  # UGRS wipes user gamma data
interlocks:
  - condition: "POWER SAVE MODE = ON"
    effect: "RS-232C and LAN control are NOT possible in standby mode. POWR-on from standby will fail."
    source: p.34, p.42
  - condition: "RS-232C/LAN SELECT toggled"
    effect: "RS-232C and LAN cannot be used simultaneously; the inactive transport returns 'UNSELECTED'."
    source: p.42, p.44
  - condition: "ADJUSTMENT LOCK = ON2"
    effect: "POWER SAVE MODE cannot be set to ON (returns ERR). RS-232C control may return 'LOCKED'."
    source: p.48, p.42
  - condition: "Internal temperature abnormal"
    effect: "Monitor enters standby or dims backlight automatically (DSTA reply 1/2/3). Standby cause 6."
    source: p.51
  - condition: "SCHEDULE effective"
    effect: "POWER SAVE MODE cannot be set to ON (ERR). SCxx commands may return ERR."
    source: p.48
timing:
  min_command_interval_ms: 100   # >=100 ms between response and next command
  default_timeout_s: 10          # >=10 seconds recommended for normal commands
  all_reset_timeout_s: 30        # >=30 seconds for RSET
  power_on_delay_timeout: "POWER ON DELAY interval + 10 s"
  wait_commands: [RSET, INPS, ASNC, WIDE, PXSL, POWR, AGIN, MWIN, MWIP, MWPP, WLFC]
# UNRESOLVED: no mains voltage/current/power specs stated in this control-protocol
# excerpt; consult full operation manual electrical-spec section if needed.
```

## Notes

Command frame: 4-char command + 4-char parameter (space-padded), terminated by `0DH 0AH` (or lone `0DH`). Negative numeric params use 3 digits (`AUTR-005`). `MPOS`, `DATE`, `SCxx`, `SBxx` use packed (non-space) parameters. R-direction commands accept `????` or ` ?` to query current value; reply is the bare value.

Reply codes: `OK` (success), `ERR` (bad/locked cmd), `WAIT` (long op in progress — do not send another command until value returns), `LOCKED` (ADJUSTMENT LOCK active), `UNSELECTED` (RS-232C/LAN SELECT points at the other transport). If link is bad, nothing returns — caller must retry.

LAN command-mode uses the SAME opcode set as RS-232C, but requires a username/password handshake when SECURITY is configured (see Macros). Web-browser UI (`http://<IP>/`) is a parallel control surface, not a REST API; do not assume JSON endpoints. Factory monitor IP `192.168.150.2`, mask `255.255.255.0`, gateway `0.0.0.0` when DHCP off. DATA PORT is configurable 1025-65535 with no documented default — must be read from device.

<!-- UNRESOLVED: default DATA PORT value not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: PN-L803CA sibling may share command set but not confirmed by this source. -->
<!-- UNRESOLVED: electrical/voltage/current specs not in this control excerpt. -->
````

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
  - docs.aws.sharp.eu
  - assets.sharpnecdisplays.us
  - github.com
  - manualsdump.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN_L603WA_L703WA_Operation_manual.pdf
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/PN-LC862_LC752_LC652_External_Control_N-Format_ver1-0.pdf
  - https://assets.sharpnecdisplays.us/documents/usermanuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
  - https://github.com/SharpNECDisplaySolutions/IMHRestAPI
  - https://manualsdump.com/en/manuals/sharp-led_tv/214345/74
retrieved_at: 2026-08-10T22:40:00.789Z
last_checked_at: 2026-08-19T09:47:40.178Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:47:40.178Z
matched_actions: 230
action_count: 230
confidence: medium
summary: "All 230 spec opcodes (POWR, INPS, VOLM, UGRW, AUTR, SC01-08, SB01-08, etc.) verified verbatim in source; transport (38400 baud, 8/N/1, http://192.168.150.2/) matches source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version compatibility not stated; PN-L803CA also hinted at by sibling entries but not confirmed by this source."
- "source states DATA PORT is configurable 1025-65535 but gives no fixed default."
- "default TCP data port not stated in source"
- "no unsolicited notifications documented for the RS-232C / TCP data-port"
- "no mains voltage/current/power specs stated in this control-protocol"
- "default DATA PORT value not stated in source."
- "firmware version compatibility not stated."
- "PN-L803CA sibling may share command set but not confirmed by this source."
- "electrical/voltage/current specs not in this control excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
