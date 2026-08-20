---
spec_id: admin/sharp-pnl803c
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PNL803C Control Spec"
manufacturer: Sharp
model_family: PNL803C
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - PNL803C
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - productadmin.sharp.ca
  - business.sharpusa.com
  - manualslib.com
source_urls:
  - https://productadmin.sharp.ca/uploads/product_downloads/PNL803C_OM.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN-L803C_operation_manual.pdf
  - https://www.manualslib.com/manual/973774/Sharp-Pn-L803c.html
retrieved_at: 2026-08-10T22:28:47.594Z
last_checked_at: 2026-08-19T09:47:31.415Z
generated_at: 2026-08-19T09:47:31.415Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default TCP data port number not stated (only range 1025-65535 configurable). Default IP 192.168.150.2 stated but not a port."
  - "firmware version compatibility not stated in source"
  - "power/voltage/current specifications not in this source excerpt"
  - "default TCP data port not stated in source; configurable 1025-65535"
  - "LAN push notification payload format not specified in source."
  - "no explicit power-on sequencing or temperature interlock reset"
  - "default TCP DATA PORT number not stated in source (only the configurable range 1025-65535)"
  - "firmware version compatibility not stated"
  - "power supply voltage/current/power specifications not in this source excerpt"
  - "SNMP trap payload / OID table not enumerated"
  - "e-mail notification body format not specified"
verification:
  verdict: verified
  checked_at: 2026-08-19T09:47:31.415Z
  matched_actions: 195
  action_count: 195
  confidence: medium
  summary: "All 195 spec actions map to wire-level mnemonics present in source command table; transport values all supported; bidirectional coverage complete. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Sharp PNL803C Control Spec

## Summary
The Sharp PNL803C is a large-format interactive LCD touch monitor. This spec covers control of the monitor from a PC via RS-232C and via LAN (TCP), using the Sharp 8-character command protocol (4-char command + 4-char parameter, CR/LF terminated). Both transports use the same command set; the LAN transport additionally requires a username/password login handshake when security is configured.

<!-- UNRESOLVED: default TCP data port number not stated (only range 1025-65535 configurable). Default IP 192.168.150.2 stated but not a port. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: power/voltage/current specifications not in this source excerpt -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 38400  # initial setting; configurable 9600/19200/38400 via BAUD command
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  # LAN: factory-default IP 192.168.150.2, subnet 255.255.255.0, gateway 0.0.0.0
  # DATA PORT configurable 1025-65535 (no default stated)
  base_url: "http://{monitor_ip}/"  # web control UI via Internet Explorer
  port: null  # UNRESOLVED: default TCP data port not stated in source; configurable 1025-65535
auth:
  # RS-232C has no auth. LAN command-based control uses a username/password
  # login handshake when SECURITY USER NAME/PASSWORD is configured; both
  # may be blank to disable auth.
  type: optional  # optional username/password on LAN; RS-232C unauthenticated
```

## Traits
```yaml
traits:
  - powerable      # POWR on/off/standby commands present
  - routable       # INPS input selection commands present
  - queryable      # many WR and R-direction commands return current values
  - levelable      # VOLM, brightness (VLMP), contrast, etc. continuous ranges
```

## Actions
```yaml
# Command format: C1C2C3C4 P1P2P3P4 + return code (0DH 0AH).
# Parameter field is always 4 chars; pad with spaces (" "). Use "?" to read.
# Examples below show the command template with variable part.

# ===== POWER CONTROL / INPUT MODE SELECTION =====
- id: power_set
  label: Power Control
  kind: action
  command: "POWR{state}"  # 0=standby, 1=power on
  params:
    - name: state
      type: integer
      description: "0=standby, 1=power on"

- id: power_query
  label: Power State Query
  kind: query
  command: "POWR????"
  params: []

- id: input_select
  label: Input Mode Selection
  kind: action
  command: "INPS{input}"  # 0=toggle; 2=D-SUB1[RGB], 3=D-SUB1[COMPONENT], 4=D-SUB1[VIDEO], 9=HDMI1[AV], 10=HDMI1[PC], 12=HDMI2[AV], 13=HDMI2[PC], 14=DisplayPort, 16=D-SUB2, 17=HDMI3[AV], 18=HDMI3[PC]
  params:
    - name: input
      type: integer
      description: "0=toggle, 2/3/4=D-SUB1 RGB/COMPONENT/VIDEO, 9/10=HDMI1 AV/PC, 12/13=HDMI2 AV/PC, 14=DisplayPort, 16=D-SUB2, 17/18=HDMI3 AV/PC"

- id: input_select_query
  label: Input Mode Query
  kind: query
  command: "INPS????"
  params: []

# ===== SCREEN menu =====
- id: screen_auto_adjust
  label: Screen Auto Adjust
  kind: action
  command: "ASNC   1"
  params: []

- id: clock_set
  label: Clock
  kind: action
  command: "CLCK{value}"  # 0-1200, D-SUB1[RGB]/D-SUB2 only
  params:
    - name: value
      type: integer
      description: "0-1200"

- id: phase_set
  label: Phase
  kind: action
  command: "PHSE{value}"  # 0-63
  params:
    - name: value
      type: integer
      description: "0-63"

- id: h_position_set
  label: Horizontal Position
  kind: action
  command: "HPOS{value}"  # 0-100 (0-800 on D-SUB1[RGB]/D-SUB2)
  params:
    - name: value
      type: integer
      description: "0-100"

- id: v_position_set
  label: Vertical Position
  kind: action
  command: "VPOS{value}"  # 0-100 (0-200 on D-SUB1[RGB]/D-SUB2)
  params:
    - name: value
      type: integer
      description: "0-100"

- id: h_size_set
  label: Horizontal Size
  kind: action
  command: "HSIZ{value}"  # 0-100
  params:
    - name: value
      type: integer
      description: "0-100"

- id: v_size_set
  label: Vertical Size
  kind: action
  command: "VSIZ{value}"  # 0-100
  params:
    - name: value
      type: integer
      description: "0-100"

- id: h_resolution_set
  label: Horizontal Resolution
  kind: action
  command: "HRES{value}"  # 300-1920, even numbers only, D-SUB1[RGB]/D-SUB2
  params:
    - name: value
      type: integer
      description: "300-1920, even numbers only"

- id: v_resolution_set
  label: Vertical Resolution
  kind: action
  command: "VRES{value}"  # 200-1200
  params:
    - name: value
      type: integer
      description: "200-1200"

- id: screen_reset
  label: Screen Reset
  kind: action
  command: "ARST   1"
  params: []

# ===== PICTURE menu =====
- id: brightness_set
  label: Brightness (VLMP)
  kind: action
  command: "VLMP{value}"  # 0-31
  params:
    - name: value
      type: integer
      description: "0-31"

- id: contrast_set
  label: Contrast
  kind: action
  command: "CONT{value}"  # 0-60
  params:
    - name: value
      type: integer
      description: "0-60"

- id: black_level_set
  label: Black Level
  kind: action
  command: "BLVL{value}"  # 0-60
  params:
    - name: value
      type: integer
      description: "0-60"

- id: tint_set
  label: Tint
  kind: action
  command: "TINT{value}"  # 0-60
  params:
    - name: value
      type: integer
      description: "0-60"

- id: colors_set
  label: Colors
  kind: action
  command: "COLR{value}"  # 0-60
  params:
    - name: value
      type: integer
      description: "0-60"

- id: sharpness_set
  label: Sharpness
  kind: action
  command: "SHRP{value}"  # 0-24
  params:
    - name: value
      type: integer
      description: "0-24"

- id: color_mode_set
  label: Color Mode (BMOD)
  kind: action
  command: "BMOD{value}"  # 0=STD, 2=VIVID, 3=sRGB (PC), 4=HIGH ILLUMINANCE
  params:
    - name: value
      type: integer
      description: "0=STD, 2=VIVID, 3=sRGB, 4=HIGH ILLUMINANCE"

- id: white_balance_thru_set
  label: White Balance THRU (CTMP=0, PC input)
  kind: action
  command: "CTMP   0"
  params: []

- id: white_balance_preset_set
  label: White Balance Preset (CTMP 1-28)
  kind: action
  command: "CTMP{value}"  # 1-28
  params:
    - name: value
      type: integer
      description: "1-28 (1=~3000K ... 15=~10000K in 500K steps; 16=~5600K, 17=~9300K, 18=~3200K; 19-28 ~10500K-15000K)"

- id: white_balance_user_set
  label: White Balance USER (CTMP=99)
  kind: action
  command: "CTMP  99"
  params: []

- id: r_contrast_set
  label: R-Contrast
  kind: action
  command: "CRTR{value}"  # 0-256, ERR unless CTMP=99
  params:
    - name: value
      type: integer
      description: "0-256"

- id: g_contrast_set
  label: G-Contrast
  kind: action
  command: "CRTG{value}"  # 0-256
  params:
    - name: value
      type: integer
      description: "0-256"

- id: b_contrast_set
  label: B-Contrast
  kind: action
  command: "CRTB{value}"  # 0-256
  params:
    - name: value
      type: integer
      description: "0-256"

- id: r_offset_set
  label: R-Offset
  kind: action
  command: "OFSR{value}"  # -127 to 127 (3-digit signed, e.g. -005)
  params:
    - name: value
      type: integer
      description: "-127 to 127"

- id: g_offset_set
  label: G-Offset
  kind: action
  command: "OFSG{value}"
  params:
    - name: value
      type: integer
      description: "-127 to 127"

- id: b_offset_set
  label: B-Offset
  kind: action
  command: "OFSB{value}"
  params:
    - name: value
      type: integer
      description: "-127 to 127"

- id: copy_to_user
  label: Copy Preset to User (CPTU)
  kind: action
  command: "CPTU   0"
  params: []

- id: gamma_set
  label: Gamma (GAMM)
  kind: action
  command: "GAMM{value}"  # PC: 0=1.8, 1=2.2, 2=2.4, 4=USER, 5=2.0, 6=STD; AV: 0=LIGHT2, 2=DARK, 4=USER, 5=LIGHT1, 6=STD
  params:
    - name: value
      type: integer
      description: "0-6 (PC and AV meanings differ)"

- id: flesh_tone_set
  label: Flesh Tone (AV input)
  kind: action
  command: "FLES{value}"  # 0=OFF, 1=LOW, 2=HIGH
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=LOW, 2=HIGH"

- id: cms_hue_r_set
  label: C.M.S.-HUE R (AV input)
  kind: action
  command: "CMHR{value}"  # -10 to 10, ERR unless FLESH TONE=OFF
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_hue_y_set
  label: C.M.S.-HUE Y
  kind: action
  command: "CMHY{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_hue_g_set
  label: C.M.S.-HUE G
  kind: action
  command: "CMHG{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_hue_c_set
  label: C.M.S.-HUE C
  kind: action
  command: "CMHC{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_hue_b_set
  label: C.M.S.-HUE B
  kind: action
  command: "CMHB{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_hue_m_set
  label: C.M.S.-HUE M
  kind: action
  command: "CMHM{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_hue_reset
  label: C.M.S.-HUE Reset (CRST=1)
  kind: action
  command: "CRST   1"
  params: []

- id: cms_sat_r_set
  label: C.M.S.-Saturation R
  kind: action
  command: "CMSR{value}"  # -10 to 10
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_sat_y_set
  label: C.M.S.-Saturation Y
  kind: action
  command: "CMSY{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_sat_g_set
  label: C.M.S.-Saturation G
  kind: action
  command: "CMSG{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_sat_c_set
  label: C.M.S.-Saturation C
  kind: action
  command: "CMSC{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_sat_b_set
  label: C.M.S.-Saturation B
  kind: action
  command: "CMSB{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_sat_m_set
  label: C.M.S.-Saturation M
  kind: action
  command: "CMSM{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_sat_reset
  label: C.M.S.-Saturation Reset (CRST=2)
  kind: action
  command: "CRST   2"
  params: []

- id: cms_value_r_set
  label: C.M.S.-Value R
  kind: action
  command: "CMVR{value}"  # -10 to 10
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_value_y_set
  label: C.M.S.-Value Y
  kind: action
  command: "CMVY{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_value_g_set
  label: C.M.S.-Value G
  kind: action
  command: "CMVG{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_value_c_set
  label: C.M.S.-Value C
  kind: action
  command: "CMVC{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_value_b_set
  label: C.M.S.-Value B
  kind: action
  command: "CMVB{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_value_m_set
  label: C.M.S.-Value M
  kind: action
  command: "CMVM{value}"
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: cms_value_reset
  label: C.M.S.-Value Reset (CRST=3)
  kind: action
  command: "CRST   3"
  params: []

- id: advanced_auto
  label: Advanced Auto (AGIN)
  kind: action
  command: "AGIN   1"  # D-SUB1[RGB]/D-SUB2 only
  params: []

- id: analog_gain_set
  label: Analog Gain (ANGA)
  kind: action
  command: "ANGA{value}"  # 0-127
  params:
    - name: value
      type: integer
      description: "0-127"

- id: analog_offset_set
  label: Analog Offset (ANOF)
  kind: action
  command: "ANOF{value}"  # 0-127
  params:
    - name: value
      type: integer
      description: "0-127"

- id: nr_3d_set
  label: 3D-NR (AV input, TDNR)
  kind: action
  command: "TDNR{value}"  # 0=OFF, 1=LOW, 2=HIGH
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=LOW, 2=HIGH"

- id: nr_mpeg_set
  label: MPEG-NR (AV input, MPNR)
  kind: action
  command: "MPNR{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: yc_3d_set
  label: 3D-Y/C (D-SUB1[VIDEO], YCSP)
  kind: action
  command: "YCSP{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: rgb_range_hdmi1_av_set
  label: RGB Input Range HDMI1[AV] (AHDR)
  kind: action
  command: "AHDR{value}"  # 0=AUTO, 1=FULL, 2=LIMITED
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=FULL, 2=LIMITED"

- id: rgb_range_hdmi1_pc_set
  label: RGB Input Range HDMI1[PC] (PHDR)
  kind: action
  command: "PHDR{value}"
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=FULL, 2=LIMITED"

- id: rgb_range_hdmi2_av_set
  label: RGB Input Range HDMI2[AV] (AH2R)
  kind: action
  command: "AH2R{value}"
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=FULL, 2=LIMITED"

- id: rgb_range_hdmi2_pc_set
  label: RGB Input Range HDMI2[PC] (PH2R)
  kind: action
  command: "PH2R{value}"
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=FULL, 2=LIMITED"

- id: rgb_range_hdmi3_av_set
  label: RGB Input Range HDMI3[AV] (AH3R)
  kind: action
  command: "AH3R{value}"
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=FULL, 2=LIMITED"

- id: rgb_range_hdmi3_pc_set
  label: RGB Input Range HDMI3[PC] (PH3R)
  kind: action
  command: "PH3R{value}"
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=FULL, 2=LIMITED"

- id: rgb_range_dsub1_set
  label: RGB Input Range D-SUB1[RGB] (PDSR)
  kind: action
  command: "PDSR{value}"  # 1=FULL, 2=LIMITED
  params:
    - name: value
      type: integer
      description: "1=FULL, 2=LIMITED"

- id: rgb_range_dsub2_set
  label: RGB Input Range D-SUB2 (PD2R)
  kind: action
  command: "PD2R{value}"
  params:
    - name: value
      type: integer
      description: "1=FULL, 2=LIMITED"

- id: rgb_range_displayport_set
  label: RGB Input Range DisplayPort (PDPR)
  kind: action
  command: "PDPR{value}"
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=FULL, 2=LIMITED"

- id: active_contrast_set
  label: Active Contrast (AV input, ACNT)
  kind: action
  command: "ACNT{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: display_color_pattern_set
  label: Display Color Pattern (PTDF)
  kind: action
  command: "PTDF{value}"  # 0=none, 1=White, 2=Red, 3=Green, 4=Blue, 99=RGB mixed
  params:
    - name: value
      type: integer
      description: "0=none, 1=White, 2=Red, 3=Green, 4=Blue, 99=RGB mixed"

- id: pattern_r_set
  label: Display Color Pattern R (PTDR)
  kind: action
  command: "PTDR{value}"  # 0-15, ERR unless PTDF=99
  params:
    - name: value
      type: integer
      description: "0-15"

- id: pattern_g_set
  label: Display Color Pattern G (PTDG)
  kind: action
  command: "PTDG{value}"
  params:
    - name: value
      type: integer
      description: "0-15"

- id: pattern_b_set
  label: Display Color Pattern B (PTDB)
  kind: action
  command: "PTDB{value}"
  params:
    - name: value
      type: integer
      description: "0-15"

- id: picture_reset
  label: Picture Reset (ARST=2)
  kind: action
  command: "ARST   2"
  params: []

# ===== AUDIO menu =====
- id: treble_set
  label: Treble (AUTR)
  kind: action
  command: "AUTR{value}"  # -5 to 5
  params:
    - name: value
      type: integer
      description: "-5 to 5"

- id: bass_set
  label: Bass (AUBS)
  kind: action
  command: "AUBS{value}"  # -5 to 5
  params:
    - name: value
      type: integer
      description: "-5 to 5"

- id: balance_set
  label: Balance (AUBL)
  kind: action
  command: "AUBL{value}"  # -10 to 10
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: audio_reset
  label: Audio Reset (ARST=3)
  kind: action
  command: "ARST   3"
  params: []

# ===== SETUP menu =====
- id: date_time_set
  label: Date/Time Setting (DATE)
  kind: action
  command: "DATE{value}"  # aaBBCCDDEE: aa=Year, BB=month, CC=Day, DD=Hour, EE=minute (no spaces)
  params:
    - name: value
      type: string
      description: "10-char: aaBBCCDDEE"

- id: date_format_set
  label: Date Display Format (DTFT)
  kind: action
  command: "DTFT{value}"  # 0=YYYY/MM/DD, 1=MM/DD/YYYY, 2=DD/MM/YYYY
  params:
    - name: value
      type: integer
      description: "0=YYYY/MM/DD, 1=MM/DD/YYYY, 2=DD/MM/YYYY"

- id: time_format_set
  label: Time Display Format (TMFT)
  kind: action
  command: "TMFT{value}"  # 0=24h, 1=12h
  params:
    - name: value
      type: integer
      description: "0=24h, 1=12h"

- id: schedule_set
  label: Schedule (SC01-SC08)
  kind: action
  command: "SC{nn}{value}"  # nn=01-08; value=aBCDEFFggH (no spaces). See source page 46 for field encoding.
  params:
    - name: nn
      type: integer
      description: "Schedule number 01-08"
    - name: value
      type: string
      description: "aBCDEFFggH: a=enable, B=power, C=day type, D/E=day-of-week, F=hour, g=minute, H=input"

- id: schedule_brightness_set
  label: Schedule Brightness (SB01-SB08)
  kind: action
  command: "SB{nn}{value}"  # nn=01-08; 0-31 or 99=disable
  params:
    - name: nn
      type: integer
      description: "01-08"
    - name: value
      type: integer
      description: "0-31, or 99 to disable"

- id: language_set
  label: Language (LANG)
  kind: action
  command: "LANG  {value}"  # 14=ENGLISH, 1=DEUTSCH, 2=FRANCAIS, 3=ITALIANO, 4=ESPANOL, 5=RUSSIAN, 6=other
  params:
    - name: value
      type: integer
      description: "14=EN, 1=DE, 2=FR, 3=IT, 4=ES, 5=RU, 6=other"

- id: input_select_hdmi1_set
  label: INPUT SELECT HDMI1 (HDSL)
  kind: action
  command: "HDSL{value}"  # 0=PC, 1=AV
  params:
    - name: value
      type: integer
      description: "0=PC, 1=AV"

- id: input_select_hdmi2_set
  label: INPUT SELECT HDMI2 (H2SL)
  kind: action
  command: "H2SL{value}"
  params:
    - name: value
      type: integer
      description: "0=PC, 1=AV"

- id: input_select_hdmi3_set
  label: INPUT SELECT HDMI3 (H3SL)
  kind: action
  command: "H3SL{value}"
  params:
    - name: value
      type: integer
      description: "0=PC, 1=AV"

- id: input_select_dsub1_set
  label: INPUT SELECT D-SUB1 (SLDS)
  kind: action
  command: "SLDS{value}"  # 0=RGB, 1=COMPONENT, 2=VIDEO
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=COMPONENT, 2=VIDEO"

- id: hdmi1_auto_view_set
  label: HDMI1 Auto View (HDAW)
  kind: action
  command: "HDAW{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: hdmi2_auto_view_set
  label: HDMI2 Auto View (H2AW)
  kind: action
  command: "H2AW{value}"
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: hdmi3_auto_view_set
  label: HDMI3 Auto View (H3AW)
  kind: action
  command: "H3AW{value}"
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: hot_plug_hdmi1_set
  label: Hot Plug Control HDMI1 (HPCH)
  kind: action
  command: "HPCH{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: hot_plug_hdmi2_set
  label: Hot Plug Control HDMI2 (HPH2)
  kind: action
  command: "HPH2{value}"
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: hot_plug_hdmi3_set
  label: Hot Plug Control HDMI3 (HPH3)
  kind: action
  command: "HPH3{value}"
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: input_name_dp_set
  label: Input Mode Name DisplayPort (INDP)
  kind: action
  command: "INDP{value}"  # 0-30 (see source for label table)
  params:
    - name: value
      type: integer
      description: "0=No setting, 1=PC1 ... 30=Surveillance Cam (see source page 46)"

- id: input_name_hdmi1_set
  label: Input Mode Name HDMI1 (INH1)
  kind: action
  command: "INH1{value}"  # 0-30
  params:
    - name: value
      type: integer
      description: "0-30 (same table as INDP)"

- id: input_name_hdmi2_set
  label: Input Mode Name HDMI2 (INH2)
  kind: action
  command: "INH2{value}"
  params:
    - name: value
      type: integer
      description: "0-30"

- id: input_name_hdmi3_set
  label: Input Mode Name HDMI3 (INH3)
  kind: action
  command: "INH3{value}"
  params:
    - name: value
      type: integer
      description: "0-30"

- id: input_name_dsub1_set
  label: Input Mode Name D-SUB1 (IND1)
  kind: action
  command: "IND1{value}"
  params:
    - name: value
      type: integer
      description: "0-30"

- id: input_name_dsub2_set
  label: Input Mode Name D-SUB2 (IND2)
  kind: action
  command: "IND2{value}"
  params:
    - name: value
      type: integer
      description: "0-30"

- id: audio_select_dp_set
  label: Audio Select DisplayPort (ASDI)
  kind: action
  command: "ASDI{value}"  # 1=AUDIO1, 2=AUDIO2, 3=DisplayPort
  params:
    - name: value
      type: integer
      description: "1=AUDIO1, 2=AUDIO2, 3=DisplayPort"

- id: audio_select_hdmi1_pc_set
  label: Audio Select HDMI1[PC] (ASHP)
  kind: action
  command: "ASHP{value}"  # 0=HDMI, 1=AUDIO1, 2=AUDIO2
  params:
    - name: value
      type: integer
      description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"

- id: audio_select_hdmi1_av_set
  label: Audio Select HDMI1[AV] (ASHA)
  kind: action
  command: "ASHA{value}"
  params:
    - name: value
      type: integer
      description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"

- id: audio_select_hdmi2_pc_set
  label: Audio Select HDMI2[PC] (AH2P)
  kind: action
  command: "AH2P{value}"
  params:
    - name: value
      type: integer
      description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"

- id: audio_select_hdmi2_av_set
  label: Audio Select HDMI2[AV] (AH2A)
  kind: action
  command: "AH2A{value}"
  params:
    - name: value
      type: integer
      description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"

- id: audio_select_hdmi3_pc_set
  label: Audio Select HDMI3[PC] (AH3P)
  kind: action
  command: "AH3P{value}"
  params:
    - name: value
      type: integer
      description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"

- id: audio_select_hdmi3_av_set
  label: Audio Select HDMI3[AV] (AH3A)
  kind: action
  command: "AH3A{value}"
  params:
    - name: value
      type: integer
      description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"

- id: audio_select_dsub1_rgb_set
  label: Audio Select D-SUB1[RGB] (ASAP)
  kind: action
  command: "ASAP{value}"  # 1=AUDIO1, 2=AUDIO2
  params:
    - name: value
      type: integer
      description: "1=AUDIO1, 2=AUDIO2"

- id: audio_select_dsub1_component_set
  label: Audio Select D-SUB1[COMPONENT] (ASC2)
  kind: action
  command: "ASC2{value}"
  params:
    - name: value
      type: integer
      description: "1=AUDIO1, 2=AUDIO2"

- id: audio_select_dsub1_video_set
  label: Audio Select D-SUB1[VIDEO] (ASV2)
  kind: action
  command: "ASV2{value}"
  params:
    - name: value
      type: integer
      description: "1=AUDIO1, 2=AUDIO2"

- id: audio_select_dsub2_set
  label: Audio Select D-SUB2 (ASA2)
  kind: action
  command: "ASA2{value}"
  params:
    - name: value
      type: integer
      description: "1=AUDIO1, 2=AUDIO2"

- id: speaker_select_set
  label: Speaker Select (SPSL)
  kind: action
  command: "SPSL{value}"  # 0=internal, 1=external
  params:
    - name: value
      type: integer
      description: "0=internal, 1=external"

- id: audio_output_set
  label: Audio Output (AOUT)
  kind: action
  command: "AOUT{value}"  # 0=VARIABLE1, 1=FIXED, 2=VARIABLE2
  params:
    - name: value
      type: integer
      description: "0=VARIABLE1, 1=FIXED, 2=VARIABLE2"

- id: audio_input_level1_set
  label: Audio Input Level1 (AIVP)
  kind: action
  command: "AIVP{value}"  # 0=1.0Vrms, 1=0.5Vrms
  params:
    - name: value
      type: integer
      description: "0=1.0Vrms, 1=0.5Vrms"

- id: audio_input_level2_set
  label: Audio Input Level2 (AIV2)
  kind: action
  command: "AIV2{value}"
  params:
    - name: value
      type: integer
      description: "0=1.0Vrms, 1=0.5Vrms"

- id: monaural_audio_set
  label: Monaural Audio (MONO)
  kind: action
  command: "MONO{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: touch_input_usb_bottom_set
  label: Touch Input Select Bottom USB (USCB)
  kind: action
  command: "USCB{value}"  # 0=INVALID, 1=Bottom term, 2=DP, 3=HDMI1, 4=HDMI2, 5=HDMI3, 6=D-SUB1, 7=D-SUB2
  params:
    - name: value
      type: integer
      description: "0-7"

- id: touch_input_usb_side_set
  label: Touch Input Select Side USB (USCS)
  kind: action
  command: "USCS{value}"  # 0=INVALID, 1=Side term, 2=DP, 3=HDMI1, 4=HDMI2, 5=HDMI3, 6=D-SUB1, 7=D-SUB2
  params:
    - name: value
      type: integer
      description: "0-7"

- id: start_input_mode_set
  label: Start Input Mode (SUIM)
  kind: action
  command: "SUIM{value}"  # 1=Last, 2=DP, 3=HDMI1, 4=HDMI2, 5=HDMI3, 7=D-SUB1, 8=D-SUB2
  params:
    - name: value
      type: integer
      description: "1-5, 7-8"

- id: comm_iface_select_set
  label: RS-232C/LAN Select (CTLS)
  kind: action
  command: "CTLS{value}"  # 0=RS-232C, 1=LAN
  params:
    - name: value
      type: integer
      description: "0=RS-232C, 1=LAN"

- id: baud_rate_set
  label: Baud Rate (BAUD)
  kind: action
  command: "BAUD{value}"  # 0=9600, 1=19200, 2=38400
  params:
    - name: value
      type: integer
      description: "0=9600, 1=19200, 2=38400"

# ===== MONITOR menu =====
- id: monitor_orientation_set
  label: Monitor Orientation (STDR)
  kind: action
  command: "STDR{value}"  # 0=LANDSCAPE, 1=PORTRAIT
  params:
    - name: value
      type: integer
      description: "0=LANDSCAPE, 1=PORTRAIT"

- id: osd_h_position_set
  label: OSD H-Position (OSDH)
  kind: action
  command: "OSDH{value}"  # 0-100
  params:
    - name: value
      type: integer
      description: "0-100"

- id: osd_v_position_set
  label: OSD V-Position (OSDV)
  kind: action
  command: "OSDV{value}"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: standby_mode_set
  label: Standby Mode (STBM)
  kind: action
  command: "STBM{value}"  # 0=STANDARD, 1=LOW POWER (ERR if ADJ LOCK=ON2 or SCHEDULE active)
  params:
    - name: value
      type: integer
      description: "0=STANDARD, 1=LOW POWER"

- id: off_if_no_operation_set
  label: Off If No Operation (ATOF)
  kind: action
  command: "ATOF{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: power_on_delay_set
  label: Power On Delay Set (PODS)
  kind: action
  command: "PODS{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: power_on_delay_interval_set
  label: Power On Delay Interval (PWOD)
  kind: action
  command: "PWOD{value}"  # 0=OFF, 1-60 seconds
  params:
    - name: value
      type: integer
      description: "0=OFF, 1-60 seconds"

- id: self_adjust_set
  label: Self Adjust (AADJ)
  kind: action
  command: "AADJ{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: self_adjust_start_timing_set
  label: Self Adjust Start Timing (AADD)
  kind: action
  command: "AADD{value}"  # 10-200 (10=1s ... 200=20s)
  params:
    - name: value
      type: integer
      description: "10-200"

- id: touch_output_invalid_icon_set
  label: Touch Output Invalid Icon (TOPI)
  kind: action
  command: "TOPI{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: touch_output_invalid_position_set
  label: Touch Output Display Position (TOIP)
  kind: action
  command: "TOIP{value}"  # 0=UPPER RIGHT, 1=UPPER LEFT, 2=LOWER RIGHT, 3=LOWER LEFT
  params:
    - name: value
      type: integer
      description: "0-3"

- id: touch_operation_mode_set
  label: Touch Operation Mode (TOMD)
  kind: action
  command: "TOMD{value}"  # 0=AUTO, 1=MULTI-TOUCH, 2=MOUSE (ERR if no touch panel)
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=MULTI-TOUCH, 2=MOUSE"

- id: touch_panel_mode_set
  label: Touch Panel Mode (GMDP)
  kind: action
  command: "GMDP{value}"  # 0=OFF, 1=ON (PC input only)
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

# ===== PIP/PbyP menu =====
- id: pip_mode_set
  label: PIP Modes (MWIN)
  kind: action
  command: "MWIN{value}"  # 0=OFF, 1=PIP, 2=PbyP, 3=PbyP2
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=PIP, 2=PbyP, 3=PbyP2"

- id: pip_size_set
  label: PIP Size (MPSZ)
  kind: action
  command: "MPSZ{value}"  # 1-64
  params:
    - name: value
      type: integer
      description: "1-64"

- id: pip_h_pos_set
  label: PIP H-Position (MHPS)
  kind: action
  command: "MHPS{value}"  # 0-100
  params:
    - name: value
      type: integer
      description: "0-100"

- id: pip_v_pos_set
  label: PIP V-Position (MVPS)
  kind: action
  command: "MVPS{value}"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: pip_pos_batch_set
  label: PIP Pos LD+SD Batch (MPOS)
  kind: action
  command: "MPOS{xxxyyy}"  # xxxyyy without spaces: xxx=longer-side pos 0-100, yyy=shorter-side pos 0-100
  params:
    - name: xxxyyy
      type: string
      description: "6 digits: xxx (0-100) + yyy (0-100)"

- id: pip_blend_set
  label: PIP Blend (MWBL)
  kind: action
  command: "MWBL{value}"  # 0-15
  params:
    - name: value
      type: integer
      description: "0-15"

- id: pip_source_set
  label: PIP Source (MWIP)
  kind: action
  command: "MWIP{value}"  # 2/3/4/9/10/12/13/14/16/17/18 (same encoding as INPS)
  params:
    - name: value
      type: integer
      description: "Same encoding as INPS input codes"

- id: sound_change_set
  label: Sound Change (MWAD)
  kind: action
  command: "MWAD{value}"  # 1=MAIN, 2=SUB
  params:
    - name: value
      type: integer
      description: "1=MAIN, 2=SUB"

- id: main_pos_set
  label: Main Pos (MWPP)
  kind: action
  command: "MWPP{value}"  # 0=POS1, 1=POS2
  params:
    - name: value
      type: integer
      description: "0=POS1, 1=POS2"

- id: pbyp2_pos_set
  label: PbyP2 Pos Sub screen (MW2P)
  kind: action
  command: "MW2P{value}"  # 0=POS1, 1=POS2, 2=POS3
  params:
    - name: value
      type: integer
      description: "0-2"

- id: pip_auto_off_set
  label: PIP Auto Off (MOFF)
  kind: action
  command: "MOFF{value}"  # 0=MANUAL, 1=AUTO
  params:
    - name: value
      type: integer
      description: "0=MANUAL, 1=AUTO"

# ===== OTHERS menu =====
- id: screen_motion_pattern_set
  label: Screen Motion Pattern (SCSV)
  kind: action
  command: "SCSV{value}"  # 0=OFF, 1-4=PATTERN1-4
  params:
    - name: value
      type: integer
      description: "0=OFF, 1-4=PATTERN1-4"

- id: motion_time1_set
  label: Motion Time1 (MTIM)
  kind: action
  command: "MTIM{value}"  # 0-20
  params:
    - name: value
      type: integer
      description: "0-20"

- id: motion_time2_pattern1_set
  label: Motion Time2 PATTERN1 (MINT)
  kind: action
  command: "MINT{value}"  # 10-990 per 10 seconds
  params:
    - name: value
      type: integer
      description: "10-990 (per 10 seconds)"

- id: motion_time2_pattern2_4_set
  label: Motion Time2 PATTERN2-4 (MINT)
  kind: action
  command: "MINT{value}"  # 5-20 per second
  params:
    - name: value
      type: integer
      description: "5-20 (per second)"

- id: power_management_pc_set
  label: Power Management PC (PMNG)
  kind: action
  command: "PMNG{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: power_management_av_set
  label: Power Management AV (PMAV)
  kind: action
  command: "PMAV{value}"
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: connect_auto_input_select_set
  label: Connect Auto Input Select (AICO)
  kind: action
  command: "AICO{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: no_signal_auto_input_sel_set
  label: No Signal Auto Input Sel. (AINO)
  kind: action
  command: "AINO{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: auto_input_priority_dp_set
  label: Auto Input Select Priority DisplayPort (APDP)
  kind: action
  command: "APDP{value}"  # 0=not selected, 1-6=priority
  params:
    - name: value
      type: integer
      description: "0-6"

- id: auto_input_priority_hdmi1_set
  label: Auto Input Select Priority HDMI1 (APH1)
  kind: action
  command: "APH1{value}"
  params:
    - name: value
      type: integer
      description: "0-6"

- id: auto_input_priority_hdmi2_set
  label: Auto Input Select Priority HDMI2 (APH2)
  kind: action
  command: "APH2{value}"
  params:
    - name: value
      type: integer
      description: "0-6"

- id: auto_input_priority_hdmi3_set
  label: Auto Input Select Priority HDMI3 (APH3)
  kind: action
  command: "APH3{value}"
  params:
    - name: value
      type: integer
      description: "0-6"

- id: auto_input_priority_dsub1_set
  label: Auto Input Select Priority D-SUB1 (APD1)
  kind: action
  command: "APD1{value}"
  params:
    - name: value
      type: integer
      description: "0-6"

- id: auto_input_priority_dsub2_set
  label: Auto Input Select Priority D-SUB2 (APD2)
  kind: action
  command: "APD2{value}"
  params:
    - name: value
      type: integer
      description: "0-6"

- id: logo_screen_set
  label: Logo Screen (BTSC)
  kind: action
  command: "BTSC{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: resolution_check_pc
  label: Resolution Check PC (PXCK)
  kind: query
  command: "PXCK   ?"
  params: []

- id: pixel_setting_set
  label: Pixel Setting D-SUB1[RGB]/D-SUB2 (PXSL)
  kind: action
  command: "PXSL{value}"  # 1=1360x768, 2=1280x768, 3=1024x768, 5=848x480, 6=640x480, 7=1680x1050, 8=1400x1050, 9=768 AUTO, 10=480 AUTO
  params:
    - name: value
      type: integer
      description: "1/2/3/5/6/7/8/9/10 (see source page 48)"

- id: resolution_check_av
  label: Resolution Check AV (RESO)
  kind: query
  command: "RESO   ?"
  params: []

- id: zoom2_special_set
  label: Zoom2 Special Setting D-SUB1[RGB]/D-SUB2 (Z2SP)
  kind: action
  command: "Z2SP{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: scan_mode_set
  label: Scan Mode AV (SCAN)
  kind: action
  command: "SCAN{value}"  # 0=MODE1, 1=MODE2, 2=MODE3
  params:
    - name: value
      type: integer
      description: "0=MODE1, 1=MODE2, 2=MODE3"

- id: color_system_set
  label: Color System (CSYS)
  kind: action
  command: "CSYS{value}"  # 0=AUTO, 1=PAL, 2=PAL-60, 3=SECAM, 4=NTSC3.58, 5=NTSC4.43
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=PAL, 2=PAL-60, 3=SECAM, 4=NTSC3.58, 5=NTSC4.43"

# ===== FUNCTION (Initialization/Restriction) menu =====
- id: all_reset
  label: All Reset (RSET)
  kind: action
  command: "RSET{value}"  # 0=ALL RESET1, 1=ALL RESET2; set timeout >=30s
  params:
    - name: value
      type: integer
      description: "0=ALL RESET1, 1=ALL RESET2"

- id: adjustment_lock_set
  label: Adjustment Lock (ALCK)
  kind: action
  command: "ALCK{value}"  # 0=OFF, 1=ON1, 2=ON2 (ERR if STANDBY MODE=LOW POWER for value 2)
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON1, 2=ON2"

- id: adjustment_lock_target_set
  label: Adjustment Lock Target (ALTG)
  kind: action
  command: "ALTG{value}"  # 0=REMOTE, 1=MONITOR, 2=BOTH
  params:
    - name: value
      type: integer
      description: "0=REMOTE, 1=MONITOR, 2=BOTH"

- id: osd_display_set
  label: OSD Display (LOSD)
  kind: action
  command: "LOSD{value}"  # 0=ON1, 1=OFF, 2=ON2
  params:
    - name: value
      type: integer
      description: "0=ON1, 1=OFF, 2=ON2"

- id: led_set
  label: LED (OFLD)
  kind: action
  command: "OFLD{value}"  # 0=ON, 1=OFF
  params:
    - name: value
      type: integer
      description: "0=ON, 1=OFF"

- id: temperature_alert_set
  label: Temperature Alert (TALT)
  kind: action
  command: "TALT{value}"  # 0=OFF, 1=OSD&LED, 2=LED
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=OSD&LED, 2=LED"

- id: status_alert_set
  label: Status Alert (SALT)
  kind: action
  command: "SALT{value}"  # 0=OFF, 1=OSD&LED, 2=LED
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=OSD&LED, 2=LED"

- id: power_button_set
  label: Power Button (PBTN)
  kind: action
  command: "PBTN{value}"  # 0=MONITOR, 1=EXT. CONTROLLER
  params:
    - name: value
      type: integer
      description: "0=MONITOR, 1=EXT. CONTROLLER"

- id: external_controller_input_set
  label: External Controller Input (PCIP)
  kind: action
  command: "PCIP{value}"  # 0=D-SUB1, 1=D-SUB2, 2=DisplayPort, 3=HDMI1, 4=HDMI2, 5=HDMI3
  params:
    - name: value
      type: integer
      description: "0-5"

# ===== Other standalone commands =====
- id: screen_size_pc_set
  label: Screen Size PC (WIDE)
  kind: action
  command: "WIDE{value}"  # 0=toggle, 1=WIDE, 2=NORMAL, 3=Dot by Dot, 4=ZOOM1, 5=ZOOM2
  params:
    - name: value
      type: integer
      description: "0=toggle, 1=WIDE, 2=NORMAL, 3=Dot by Dot, 4=ZOOM1, 5=ZOOM2"

- id: screen_size_av_set
  label: Screen Size AV (WIDE)
  kind: action
  command: "WIDE{value}"  # 0=toggle, 1=WIDE, 2=ZOOM1, 3=ZOOM2, 4=NORMAL, 5=Dot by Dot
  params:
    - name: value
      type: integer
      description: "0=toggle, 1=WIDE, 2=ZOOM1, 3=ZOOM2, 4=NORMAL, 5=Dot by Dot"

- id: volume_set
  label: Volume (VOLM)
  kind: action
  command: "VOLM{value}"  # 0-31
  params:
    - name: value
      type: integer
      description: "0-31"

- id: mute_set
  label: Mute (MUTE)
  kind: action
  command: "MUTE{value}"  # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: information_model_query
  label: Information MODEL (INF1)
  kind: query
  command: "INF1   ?"
  params: []

- id: serial_no_query
  label: Serial Number (SRNO)
  kind: query
  command: "SRNO   ?"
  params: []

- id: temperature_sensor_query
  label: Temperature Sensor Status (DSTA)
  kind: query
  command: "DSTA   ?"  # 0=normal, 1=abnormal+standby, 2=abnormal, 3=abnormal+dimmed, 4=sensor abnormal
  params: []

- id: temperature_acquisition_query
  label: Temperature Acquisition (ERRT)
  kind: query
  command: "ERRT   ?"  # value=temperature; 126=sensor abnormal
  params: []

- id: cause_of_last_standby_init
  label: Cause of Last Standby Initialization (STCA=0)
  kind: action
  command: "STCA   0"
  params: []

- id: cause_of_last_standby_query
  label: Cause of Last Standby Mode Query (STCA)
  kind: query
  command: "STCA   ?"  # 0=none, 1=POWER btn, 2=main switch, 3=RS-232C/LAN, 4=no signal, 6=temp, 8=SCHEDULE, 20=OFF IF NO OPERATION
  params: []

- id: touch_operation_valid_set
  label: Touch Operation Valid/Invalid (TPEN)
  kind: action
  command: "TPEN{value}"  # 0=Invalid, 1=Valid (ERR if touch invalid/not connected)
  params:
    - name: value
      type: integer
      description: "0=Invalid, 1=Valid"

# ===== GAMMA user data commands =====
- id: red_gamma_data_transfer
  label: RED Gamma Data Transfer (UGRW)
  kind: action
  command: "UGRW{aaxxxx...xxxxcc}"  # aa=01-16 block, xxxx=0000-1023 (32 pieces), cc=00-FF checksum
  params:
    - name: payload
      type: string
      description: "Block (01-16) + 32 pieces of 4-digit data + 2-char ASCII checksum"

- id: green_gamma_data_transfer
  label: GREEN Gamma Data Transfer (UGGW)
  kind: action
  command: "UGGW{aaxxxx...xxxxcc}"
  params:
    - name: payload
      type: string
      description: "Same format as UGRW"

- id: blue_gamma_data_transfer
  label: BLUE Gamma Data Transfer (UGBW)
  kind: action
  command: "UGBW{aaxxxx...xxxxcc}"
  params:
    - name: payload
      type: string
      description: "Same format as UGRW"

- id: red_gamma_data_read
  label: RED Gamma Data Read (UGRR)
  kind: query
  command: "UGRR{aa}"  # aa=01-16 block; returns 32 pieces of 4-digit data 0000-1023
  params:
    - name: aa
      type: integer
      description: "Block number 01-16"

- id: green_gamma_data_read
  label: GREEN Gamma Data Read (UGGR)
  kind: query
  command: "UGGR{aa}"
  params:
    - name: aa
      type: integer
      description: "Block number 01-16"

- id: blue_gamma_data_read
  label: BLUE Gamma Data Read (UGBR)
  kind: query
  command: "UGBR{aa}"
  params:
    - name: aa
      type: integer
      description: "Block number 01-16"

- id: user_data_initialize
  label: Gamma User Data Initialize (UGRS)
  kind: action
  command: "UGRS   0"
  params: []

- id: user_data_save
  label: Gamma User Data Save (UGSV)
  kind: action
  command: "UGSV   0"
  params: []
```

## Feedbacks
```yaml
# All WR/R commands return their current value when parameter is "????"/"? ?".
# Special responses returned unsolicited or as command acknowledgements:
- id: ok
  type: enum
  values: ["OK"]
  description: "Command executed correctly (0DH 0AH terminated)"

- id: err
  type: enum
  values: ["ERR"]
  description: "Command not recognized or not usable in current state (0DH 0AH)"

- id: wait
  type: enum
  values: ["WAIT"]
  description: "Returned by long-running commands (RSET, INPS, ASNC, WIDE, PXSL, POWR, AGIN, MWIN, MWIP, MWPP). Do not send next command until value returned."

- id: locked
  type: enum
  values: ["LOCKED"]
  description: "RS-232C/LAN control locked via FUNCTION menu"

- id: unselected
  type: enum
  values: ["UNSELECTED"]
  description: "RS-232C/LAN SELECT set to the other transport"

- id: power_state
  type: enum
  values: [standby, normal, input_signal_waiting]
  description: "POWR reply: 0/1/2"

- id: input_mode_state
  type: enum
  values: [D-SUB1_RGB, D-SUB1_COMPONENT, D-SUB1_VIDEO, HDMI1_AV, HDMI1_PC, HDMI2_AV, HDMI2_PC, DisplayPort, D-SUB2, HDMI3_AV, HDMI3_PC]
  description: "INPS reply 2/3/4/9/10/12/13/14/16/17/18"

- id: temperature_sensor_state
  type: enum
  values: [normal, abnormal_standby, abnormal, abnormal_dimmed, sensor_abnormal]
  description: "DSTA reply 0/1/2/3/4"

- id: standby_cause
  type: enum
  values: [none, power_button, main_switch, rs232c_lan, no_signal, abnormal_temperature_reserved5, schedule, reserved, off_if_no_operation]
  description: "STCA reply 0/1/2/3/4/6/8/20"
```

## Variables
```yaml
# Most settable parameters are exposed as Actions above (POWR, INPS, VOLM, etc.).
# The following are continuously settable variables of primary control interest:
- id: volume
  type: integer
  range: [0, 31]
  command: "VOLM"
  description: "Master audio volume"

- id: brightness
  type: integer
  range: [0, 31]
  command: "VLMP"
  description: "Backlight brightness"

- id: contrast
  type: integer
  range: [0, 60]
  command: "CONT"
  description: "Picture contrast"
```

## Events
```yaml
# Device-initiated notifications observed via LAN (e-mail/SNMP trap). No
# unsolicited RS-232C push events documented.
# UNRESOLVED: LAN push notification payload format not specified in source.
```

## Macros
```yaml
# No explicit multi-step command sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "RS-232C and LAN control cannot be used simultaneously."
  - "When STANDBY MODE=LOW POWER, RS-232C/LAN control is not possible in standby mode."
  - "When STANDBY MODE=LOW POWER, SCHEDULE cannot be set."
  - "When ADJUSTMENT LOCK=ON2, STANDBY MODE cannot be set to LOW POWER."
  - "All commands after OK/ERR must wait >=100ms before next command."
  - "ALL RESET timeout must be >=30 seconds."
  - "Power-on with POWER ON DELAY active: timeout >= (delay period + 10 seconds)."
  - "After WAIT response, do not send any command until the final value is returned."
# UNRESOLVED: no explicit power-on sequencing or temperature interlock reset
# procedure beyond TEMPERATURE ALERT LED/OSD indication.
```

## Notes
- Command format is fixed-width 8 ASCII characters: `C1C2C3C4 P1P2P3P4`, terminated by return code (0DH, 0AH, or 0DH). The 4-char parameter field must be space-padded on the right (e.g. `VOLM  30`, NOT `VOLM30`).
- Exceptions with no space padding: `MPOS`, `DATE`, and `SC01`–`SC08` use fixed-width numeric fields.
- Negative parameters are 3-digit signed (e.g. `AUTR-005`).
- Direction `R` rows support read-back via `?` / `????` parameter.
- Commands returning `WAIT`: `RSET, INPS, ASNC, WIDE, PXSL, POWR, AGIN, MWIN, MWIP, MWPP`.
- `BAUD` command configures RS-232C baud (9600/19200/38400). Initial setting is 38400 bps.
- LAN command-based control: after TCP connect to the DATA PORT, monitor returns `Login:`. Send `<username><CR>`, then `<password><CR>`. If unconfigured, send empty `<CR>` for both. On success, `OK<CR>` is returned. Send `BYE<CR>` to disconnect; monitor returns `goodbye`.
- LAN auto-logout after `AUTO LOGOUT TIME` minutes of no communication (1-65535; 0 disables).
- LAN web UI default factory IP: 192.168.150.2 (subnet 255.255.255.0, gateway 0.0.0.0). DATA PORT configurable in range 1025-65535.
- GAMMA user data is held in temporary memory and cleared on main power off or LOW POWER standby unless saved with `UGSV`.

<!-- UNRESOLVED: default TCP DATA PORT number not stated in source (only the configurable range 1025-65535) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: power supply voltage/current/power specifications not in this source excerpt -->
<!-- UNRESOLVED: SNMP trap payload / OID table not enumerated -->
<!-- UNRESOLVED: e-mail notification body format not specified -->

## Provenance

```yaml
source_domains:
  - productadmin.sharp.ca
  - business.sharpusa.com
  - manualslib.com
source_urls:
  - https://productadmin.sharp.ca/uploads/product_downloads/PNL803C_OM.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN-L803C_operation_manual.pdf
  - https://www.manualslib.com/manual/973774/Sharp-Pn-L803c.html
retrieved_at: 2026-08-10T22:28:47.594Z
last_checked_at: 2026-08-19T09:47:31.415Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:47:31.415Z
matched_actions: 195
action_count: 195
confidence: medium
summary: "All 195 spec actions map to wire-level mnemonics present in source command table; transport values all supported; bidirectional coverage complete. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default TCP data port number not stated (only range 1025-65535 configurable). Default IP 192.168.150.2 stated but not a port."
- "firmware version compatibility not stated in source"
- "power/voltage/current specifications not in this source excerpt"
- "default TCP data port not stated in source; configurable 1025-65535"
- "LAN push notification payload format not specified in source."
- "no explicit power-on sequencing or temperature interlock reset"
- "default TCP DATA PORT number not stated in source (only the configurable range 1025-65535)"
- "firmware version compatibility not stated"
- "power supply voltage/current/power specifications not in this source excerpt"
- "SNMP trap payload / OID table not enumerated"
- "e-mail notification body format not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
