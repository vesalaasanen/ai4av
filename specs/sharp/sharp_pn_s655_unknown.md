---
spec_id: admin/sharp-pn-s655
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN-S655 Control Spec"
manufacturer: Sharp
model_family: PN-S655
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - PN-S655
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.aws.sharp.eu
  - manualshelf.com
  - business.sharpusa.com
  - sharp.eu
source_urls:
  - https://docs.aws.sharp.eu/om/19_info-display/PNS655_OM_GB.pdf
  - https://www.manualshelf.com/manual/sharp/pn-s655/owner-s-manual-english.html
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_man_PNS655.pdf
  - https://www.sharp.eu/sharp-pn-s655
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_qguide_PNS655.pdf
retrieved_at: 2026-08-10T22:29:32.871Z
last_checked_at: 2026-08-19T09:46:23.441Z
generated_at: 2026-08-19T09:46:23.441Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP control endpoint paths beyond `/` and exact request/response payload shapes are not documented in the source."
  - "firmware version not stated in source. UNRESOLVED: TCP data/search port factory defaults not stated. UNRESOLVED: HTTP API endpoint paths beyond `/` not documented."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:46:23.441Z
  matched_actions: 238
  action_count: 238
  confidence: medium
  summary: "Every spec action maps to a documented RS-232C command in the source command table; all transport values match source verbatim. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Sharp PN-S655 Control Spec

## Summary
The Sharp PN-S655 is a 65-inch professional LCD monitor. This spec covers its RS-232C and LAN (HTTP) control interfaces, including the full ASCII command table, daisy-chain ID control, repeater control, and the embedded web-server configuration endpoints.

<!-- UNRESOLVED: HTTP control endpoint paths beyond `/` and exact request/response payload shapes are not documented in the source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  tcp_data_port: 1025-65535  # configurable, factory default not stated
  tcp_search_port: 1025-65535  # configurable, factory default not stated
  http_base_url: "http://{ip}/"
auth:
  type: basic  # HTTP web UI uses user name + password; default is blank/blank
  http_user_password:
    max_length: 8
    notes: "Up to 8 alphanumeric characters or symbols. Leave blank for no auth."
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# =====================================================================
# Power control / Input mode selection
# =====================================================================
- id: power_set
  label: Power Control
  kind: action
  command: "POWR{state}"   # 0=standby, 1=on
  params:
    - name: state
      type: integer
      description: "0=standby, 1=power on"
- id: power_query
  label: Power Status Query
  kind: query
  command: "POWR ?????"   # ???? reads current value
- id: input_mode_set
  label: Input Mode Select
  kind: action
  command: "INPS{input}"   # 0=toggle, 1=PC1 DVI-D, 2=PC3 D-SUB, 3=AV3 COMPONENT, 4=AV5 VIDEO, 6=PC4 RGB, 7=AV1 DVI-D, 8=AV4 S-VIDEO, 9=AV2 HDMI, 10=PC2 HDMI
  params:
    - name: input
      type: integer
      description: "Input number per source table"
- id: input_mode_query
  label: Input Mode Query
  kind: query
  command: "INPS????"

# =====================================================================
# SCREEN menu
# =====================================================================
- id: auto_sync
  label: Auto Sync (PC3/PC4)
  kind: action
  command: "ASNC1"
- id: clock_set
  label: Clock (PC3/PC4)
  kind: action
  command: "CLCK{value}"   # 0-1200
  params:
    - name: value
      type: integer
      description: "0-1200"
- id: clock_query
  label: Clock Query
  kind: query
  command: "CLCK????"
- id: phase_set
  label: Phase (PC3/PC4)
  kind: action
  command: "PHSE{value}"   # 0-63
  params:
    - name: value
      type: integer
      description: "0-63"
- id: phase_query
  label: Phase Query
  kind: query
  command: "PHSE????"
- id: hpos_set
  label: H-Position
  kind: action
  command: "HPOS{value}"   # 0-100 (0-800 on PC3/PC4)
  params:
    - name: value
      type: integer
      description: "0-100 (PC3/PC4 0-800)"
- id: hpos_query
  label: H-Position Query
  kind: query
  command: "HPOS????"
- id: vpos_set
  label: V-Position
  kind: action
  command: "VPOS{value}"   # 0-100 (0-200 on PC3/PC4)
  params:
    - name: value
      type: integer
      description: "0-100 (PC3/PC4 0-200)"
- id: vpos_query
  label: V-Position Query
  kind: query
  command: "VPOS????"
- id: hsiz_set
  label: H-Size
  kind: action
  command: "HSIZ{value}"   # 0-100
  params:
    - name: value
      type: integer
      description: "0-100"
- id: hsiz_query
  label: H-Size Query
  kind: query
  command: "HSIZ????"
- id: vsiz_set
  label: V-Size
  kind: action
  command: "VSIZ{value}"   # 0-100
  params:
    - name: value
      type: integer
      description: "0-100"
- id: vsiz_query
  label: V-Size Query
  kind: query
  command: "VSIZ????"
- id: hres_set
  label: H-Resolution
  kind: action
  command: "HRES{value}"   # 300-1920, even only
  params:
    - name: value
      type: integer
      description: "300-1920 (even numbers only)"
- id: hres_query
  label: H-Resolution Query
  kind: query
  command: "HRES????"
- id: vres_set
  label: V-Resolution
  kind: action
  command: "VRES{value}"   # 200-1200
  params:
    - name: value
      type: integer
      description: "200-1200"
- id: vres_query
  label: V-Resolution Query
  kind: query
  command: "VRES????"
- id: screen_reset
  label: Screen Reset
  kind: action
  command: "ARST1"

# =====================================================================
# PICTURE menu
# =====================================================================
- id: auto_gain
  label: Auto Gain (PC3/PC4)
  kind: action
  command: "AGIN1"
- id: contrast_set
  label: Contrast
  kind: action
  command: "CONT{value}"   # 0-60 (0-127 on PC3/PC4)
  params:
    - name: value
      type: integer
      description: "0-60 (0-127 on PC3/PC4)"
- id: contrast_query
  label: Contrast Query
  kind: query
  command: "CONT????"
- id: black_level_set
  label: Black Level
  kind: action
  command: "BLVL{value}"   # 0-60 (0-127 on PC3/PC4)
  params:
    - name: value
      type: integer
      description: "0-60 (0-127 on PC3/PC4)"
- id: black_level_query
  label: Black Level Query
  kind: query
  command: "BLVL????"
- id: tint_set
  label: Tint
  kind: action
  command: "TINT{value}"   # 0-60
  params:
    - name: value
      type: integer
      description: "0-60"
- id: tint_query
  label: Tint Query
  kind: query
  command: "TINT????"
- id: colors_set
  label: Color Saturation
  kind: action
  command: "COLR{value}"   # 0-60
  params:
    - name: value
      type: integer
      description: "0-60"
- id: colors_query
  label: Color Saturation Query
  kind: query
  command: "COLR????"
- id: sharpness_set
  label: Sharpness
  kind: action
  command: "SHRP{value}"   # 0-24
  params:
    - name: value
      type: integer
      description: "0-24"
- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "SHRP????"
- id: flesh_tone_set
  label: Flesh Tone
  kind: action
  command: "FLES{value}"   # 0=OFF, 1=LOW, 2=HIGH
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=LOW, 2=HIGH"
- id: flesh_tone_query
  label: Flesh Tone Query
  kind: query
  command: "FLES????"
- id: threed_nr_set
  label: 3D-NR
  kind: action
  command: "TDNR{value}"   # 0=OFF, 1=LOW, 2=HIGH
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=LOW, 2=HIGH"
- id: threed_nr_query
  label: 3D-NR Query
  kind: query
  command: "TDNR????"
- id: mpeg_nr_set
  label: MPEG-NR
  kind: action
  command: "MPNR{value}"   # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: mpeg_nr_query
  label: MPEG-NR Query
  kind: query
  command: "MPNR????"
- id: threed_yc_set
  label: 3D-Y/C
  kind: action
  command: "YCSP{value}"   # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON (AV5 only)"
- id: threed_yc_query
  label: 3D-Y/C Query
  kind: query
  command: "YCSP????"
- id: cms_hue_r_set
  label: C.M.S. Hue R
  kind: action
  command: "CMHR{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_hue_r_query
  label: C.M.S. Hue R Query
  kind: query
  command: "CMHR????"
- id: cms_hue_y_set
  label: C.M.S. Hue Y
  kind: action
  command: "CMHY{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_hue_y_query
  label: C.M.S. Hue Y Query
  kind: query
  command: "CMHY????"
- id: cms_hue_g_set
  label: C.M.S. Hue G
  kind: action
  command: "CMHG{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_hue_g_query
  label: C.M.S. Hue G Query
  kind: query
  command: "CMHG????"
- id: cms_hue_c_set
  label: C.M.S. Hue C
  kind: action
  command: "CMHC{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_hue_c_query
  label: C.M.S. Hue C Query
  kind: query
  command: "CMHC????"
- id: cms_hue_b_set
  label: C.M.S. Hue B
  kind: action
  command: "CMHB{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_hue_b_query
  label: C.M.S. Hue B Query
  kind: query
  command: "CMHB????"
- id: cms_hue_m_set
  label: C.M.S. Hue M
  kind: action
  command: "CMHM{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_hue_m_query
  label: C.M.S. Hue M Query
  kind: query
  command: "CMHM????"
- id: cms_hue_reset
  label: C.M.S. Hue Reset
  kind: action
  command: "CRST1"
- id: cms_sat_r_set
  label: C.M.S. Saturation R
  kind: action
  command: "CMSR{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_sat_r_query
  label: C.M.S. Saturation R Query
  kind: query
  command: "CMSR????"
- id: cms_sat_y_set
  label: C.M.S. Saturation Y
  kind: action
  command: "CMSY{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_sat_y_query
  label: C.M.S. Saturation Y Query
  kind: query
  command: "CMSY????"
- id: cms_sat_g_set
  label: C.M.S. Saturation G
  kind: action
  command: "CMSG{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_sat_g_query
  label: C.M.S. Saturation G Query
  kind: query
  command: "CMSG????"
- id: cms_sat_c_set
  label: C.M.S. Saturation C
  kind: action
  command: "CMSC{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_sat_c_query
  label: C.M.S. Saturation C Query
  kind: query
  command: "CMSC????"
- id: cms_sat_b_set
  label: C.M.S. Saturation B
  kind: action
  command: "CMSB{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_sat_b_query
  label: C.M.S. Saturation B Query
  kind: query
  command: "CMSB????"
- id: cms_sat_m_set
  label: C.M.S. Saturation M
  kind: action
  command: "CMSM{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_sat_m_query
  label: C.M.S. Saturation M Query
  kind: query
  command: "CMSM????"
- id: cms_sat_reset
  label: C.M.S. Saturation Reset
  kind: action
  command: "CRST2"
- id: cms_val_r_set
  label: C.M.S. Value R
  kind: action
  command: "CMVR{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_val_r_query
  label: C.M.S. Value R Query
  kind: query
  command: "CMVR????"
- id: cms_val_y_set
  label: C.M.S. Value Y
  kind: action
  command: "CMVY{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_val_y_query
  label: C.M.S. Value Y Query
  kind: query
  command: "CMVY????"
- id: cms_val_g_set
  label: C.M.S. Value G
  kind: action
  command: "CMVG{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_val_g_query
  label: C.M.S. Value G Query
  kind: query
  command: "CMVG????"
- id: cms_val_c_set
  label: C.M.S. Value C
  kind: action
  command: "CMVC{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_val_c_query
  label: C.M.S. Value C Query
  kind: query
  command: "CMVC????"
- id: cms_val_b_set
  label: C.M.S. Value B
  kind: action
  command: "CMVB{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_val_b_query
  label: C.M.S. Value B Query
  kind: query
  command: "CMVB????"
- id: cms_val_m_set
  label: C.M.S. Value M
  kind: action
  command: "CMVM{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: cms_val_m_query
  label: C.M.S. Value M Query
  kind: query
  command: "CMVM????"
- id: cms_val_reset
  label: C.M.S. Value Reset
  kind: action
  command: "CRST3"
- id: color_mode_set
  label: Color Mode
  kind: action
  command: "BMOD{value}"   # 0=STD, 2=VIVID, 3=sRGB (PC)
  params:
    - name: value
      type: integer
      description: "0=STD, 2=VIVID, 3=sRGB"
- id: color_mode_query
  label: Color Mode Query
  kind: query
  command: "BMOD????"
- id: color_temp_set
  label: Color Temperature
  kind: action
  command: "CTMP{value}"   # 0=THRU, 1-15=PRESET, 99=USER
  params:
    - name: value
      type: integer
      description: "0=THRU, 1-15=PRESET (3000K-10000K), 99=USER"
- id: color_temp_query
  label: Color Temperature Query
  kind: query
  command: "CTMP????"
- id: r_contrast_set
  label: R-Contrast (User)
  kind: action
  command: "CRTR{value}"   # 0-512, requires CTMP=99
  params:
    - name: value
      type: integer
      description: "0-512 (CTMP must be 99)"
- id: r_contrast_query
  label: R-Contrast Query
  kind: query
  command: "CRTR????"
- id: g_contrast_set
  label: G-Contrast (User)
  kind: action
  command: "CRTG{value}"   # 0-512, requires CTMP=99
  params:
    - name: value
      type: integer
      description: "0-512 (CTMP must be 99)"
- id: g_contrast_query
  label: G-Contrast Query
  kind: query
  command: "CRTG????"
- id: b_contrast_set
  label: B-Contrast (User)
  kind: action
  command: "CRTB{value}"   # 0-512, requires CTMP=99
  params:
    - name: value
      type: integer
      description: "0-512 (CTMP must be 99)"
- id: b_contrast_query
  label: B-Contrast Query
  kind: query
  command: "CRTB????"
- id: copy_to_user
  label: Copy Preset to User WB
  kind: action
  command: "CPTU0"
- id: gamma_set
  label: Gamma
  kind: action
  command: "GAMM{value}"   # 0=1.8, 1=2.2, 2=2.4
  params:
    - name: value
      type: integer
      description: "0=1.8, 1=2.2, 2=2.4"
- id: gamma_query
  label: Gamma Query
  kind: query
  command: "GAMM????"
- id: picture_reset
  label: Picture Reset
  kind: action
  command: "ARST2"

# =====================================================================
# AUDIO menu
# =====================================================================
- id: treble_set
  label: Treble
  kind: action
  command: "AUTR{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: treble_query
  label: Treble Query
  kind: query
  command: "AUTR????"
- id: bass_set
  label: Bass
  kind: action
  command: "AUBS{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: bass_query
  label: Bass Query
  kind: query
  command: "AUBS????"
- id: balance_set
  label: Balance
  kind: action
  command: "AUBL{value}"   # -10-10
  params:
    - name: value
      type: integer
      description: "-10 to 10"
- id: balance_query
  label: Balance Query
  kind: query
  command: "AUBL????"
- id: audio_reset
  label: Audio Reset
  kind: action
  command: "ARST3"

# =====================================================================
# SETUP menu
# =====================================================================
- id: osd_hpos_set
  label: OSD H-Position
  kind: action
  command: "OSDH{value}"   # 0-100
  params:
    - name: value
      type: integer
      description: "0-100"
- id: osd_hpos_query
  label: OSD H-Position Query
  kind: query
  command: "OSDH????"
- id: osd_vpos_set
  label: OSD V-Position
  kind: action
  command: "OSDV{value}"   # 0-100
  params:
    - name: value
      type: integer
      description: "0-100"
- id: osd_vpos_query
  label: OSD V-Position Query
  kind: query
  command: "OSDV????"
- id: language_set
  label: Language
  kind: action
  command: "LANG{value}"   # 14=EN, 1=DE, 2=FR, 3=IT, 4=ES, 5=RU, 6=JP
  params:
    - name: value
      type: integer
      description: "14=EN, 1=DE, 2=FR, 3=IT, 4=ES, 5=RU, 6=JP"
- id: language_query
  label: Language Query
  kind: query
  command: "LANG????"
- id: hdmi_auto_view_set
  label: HDMI Auto View
  kind: action
  command: "HDAW{value}"   # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: hdmi_auto_view_query
  label: HDMI Auto View Query
  kind: query
  command: "HDAW????"
- id: picture_flip_set
  label: Picture Flip
  kind: action
  command: "PFIL{value}"   # 0=STD, 1=MIRROR, 2=UPSIDE DOWN, 3=ROTATE
  params:
    - name: value
      type: integer
      description: "0=STANDARD, 1=MIRROR, 2=UPSIDE DOWN, 3=ROTATE"
- id: picture_flip_query
  label: Picture Flip Query
  kind: query
  command: "PFIL????"
- id: power_on_delay_set
  label: Power On Delay
  kind: action
  command: "PWOD{value}"   # 0=OFF, 1-60=ON seconds
  params:
    - name: value
      type: integer
      description: "0=OFF, 1-60=ON (seconds)"
- id: power_on_delay_query
  label: Power On Delay Query
  kind: query
  command: "PWOD????"
- id: standby_mode_set
  label: Standby Mode
  kind: action
  command: "STBM{value}"   # 0=STANDARD, 1=LOW POWER
  params:
    - name: value
      type: integer
      description: "0=STANDARD, 1=LOW POWER"
- id: standby_mode_query
  label: Standby Mode Query
  kind: query
  command: "STBM????"
- id: rs232_lan_select_set
  label: RS-232C/LAN Select
  kind: action
  command: "CTLS{value}"   # 0=RS-232C, 1=LAN
  params:
    - name: value
      type: integer
      description: "0=RS-232C, 1=LAN"
- id: rs232_lan_select_query
  label: RS-232C/LAN Select Query
  kind: query
  command: "CTLS????"
- id: rs232_lan_command_set
  label: RS-232C/LAN Command Mode
  kind: action
  command: "CMDM{value}"   # 0=NORMAL, 1=MODE1, 2=MODE2
  params:
    - name: value
      type: integer
      description: "0=NORMAL (CR+LF), 1=MODE1 (CR only), 2=MODE2 (CR only, fixed 4-digit)"
- id: rs232_lan_command_query
  label: RS-232C/LAN Command Mode Query
  kind: query
  command: "CMDM????"

# =====================================================================
# ID control
# =====================================================================
- id: idst_set
  label: Set Monitor ID
  kind: action
  command: "IDST{nnn}"   # 0=no ID, 1-255
  params:
    - name: nnn
      type: integer
      description: "0-255 (0=cleared)"
- id: idst_query
  label: Query Monitor ID
  kind: query
  command: "IDST????"
- id: idsl_set
  label: Set ID for Next Command
  kind: action
  command: "IDSL{nnn}"   # 0=clear, 1-255
  params:
    - name: nnn
      type: integer
      description: "0=clear, 1-255"
- id: idlk_set
  label: Set ID for Subsequent Commands
  kind: action
  command: "IDLK{nnn}"   # 0=clear, 1-255
  params:
    - name: nnn
      type: integer
      description: "0=clear, 1-255"
- id: idck
  label: Display ID on Screen
  kind: action
  command: "IDCK0"

# =====================================================================
# OPTION menu
# =====================================================================
- id: date_time_set
  label: Date/Time Set
  kind: action
  command: "DATE{AABBCCDDEE}"   # AA=year, BB=month, CC=day, DD=hour, EE=minute
  params:
    - name: AABBCCDDEE
      type: string
      description: "AA=year, BB=month, CC=day, DD=hour, EE=minute"
- id: date_time_query
  label: Date/Time Query
  kind: query
  command: "DATE????"
- id: schedule_1
  label: Schedule 1
  kind: action
  command: "SC01{ABCDEFFGGH}"
  params:
    - name: ABCDEFFGGH
      type: string
      description: "A=0/1 enable, B=0/1 power, C=once/week/daily, D=day1, E=day2, F=hour, G=min, H=input"
- id: schedule_1_query
  label: Schedule 1 Query
  kind: query
  command: "SC01????"
- id: schedule_2
  label: Schedule 2
  kind: action
  command: "SC02{ABCDEFFGGH}"
  params:
    - name: ABCDEFFGGH
      type: string
      description: "A=0/1 enable, B=0/1 power, C=once/week/daily, D=day1, E=day2, F=hour, G=min, H=input"
- id: schedule_2_query
  label: Schedule 2 Query
  kind: query
  command: "SC02????"
- id: schedule_3
  label: Schedule 3
  kind: action
  command: "SC03{ABCDEFFGGH}"
  params:
    - name: ABCDEFFGGH
      type: string
      description: "A=0/1 enable, B=0/1 power, C=once/week/daily, D=day1, E=day2, F=hour, G=min, H=input"
- id: schedule_3_query
  label: Schedule 3 Query
  kind: query
  command: "SC03????"
- id: schedule_4
  label: Schedule 4
  kind: action
  command: "SC04{ABCDEFFGGH}"
  params:
    - name: ABCDEFFGGH
      type: string
      description: "A=0/1 enable, B=0/1 power, C=once/week/daily, D=day1, E=day2, F=hour, G=min, H=input"
- id: schedule_4_query
  label: Schedule 4 Query
  kind: query
  command: "SC04????"
- id: schedule_5
  label: Schedule 5
  kind: action
  command: "SC05{ABCDEFFGGH}"
  params:
    - name: ABCDEFFGGH
      type: string
      description: "A=0/1 enable, B=0/1 power, C=once/week/daily, D=day1, E=day2, F=hour, G=min, H=input"
- id: schedule_5_query
  label: Schedule 5 Query
  kind: query
  command: "SC05????"
- id: schedule_6
  label: Schedule 6
  kind: action
  command: "SC06{ABCDEFFGGH}"
  params:
    - name: ABCDEFFGGH
      type: string
      description: "A=0/1 enable, B=0/1 power, C=once/week/daily, D=day1, E=day2, F=hour, G=min, H=input"
- id: schedule_6_query
  label: Schedule 6 Query
  kind: query
  command: "SC06????"
- id: schedule_7
  label: Schedule 7
  kind: action
  command: "SC07{ABCDEFFGGH}"
  params:
    - name: ABCDEFFGGH
      type: string
      description: "A=0/1 enable, B=0/1 power, C=once/week/daily, D=day1, E=day2, F=hour, G=min, H=input"
- id: schedule_7_query
  label: Schedule 7 Query
  kind: query
  command: "SC07????"
- id: schedule_8
  label: Schedule 8
  kind: action
  command: "SC08{ABCDEFFGGH}"
  params:
    - name: ABCDEFFGGH
      type: string
      description: "A=0/1 enable, B=0/1 power, C=once/week/daily, D=day1, E=day2, F=hour, G=min, H=input"
- id: schedule_8_query
  label: Schedule 8 Query
  kind: query
  command: "SC08????"
- id: dvi_select_set
  label: DVI Select
  kind: action
  command: "DVSL{value}"   # 0=PC1 DVI-D, 1=AV1 DVI-D
  params:
    - name: value
      type: integer
      description: "0=PC1 DVI-D, 1=AV1 DVI-D"
- id: dvi_select_query
  label: DVI Select Query
  kind: query
  command: "DVSL????"
- id: bnc_select_set
  label: BNC Select
  kind: action
  command: "BNSL{value}"   # 0=PC4 RGB, 1=AV3 COMPONENT
  params:
    - name: value
      type: integer
      description: "0=PC4 RGB, 1=AV3 COMPONENT"
- id: bnc_select_query
  label: BNC Select Query
  kind: query
  command: "BNSL????"
- id: hdmi_select_set
  label: HDMI Select
  kind: action
  command: "HDSL{value}"   # 0=PC2 HDMI, 1=AV2 HDMI
  params:
    - name: value
      type: integer
      description: "0=PC2 HDMI, 1=AV2 HDMI"
- id: hdmi_select_query
  label: HDMI Select Query
  kind: query
  command: "HDSL????"
- id: hdmi_audio_select_set
  label: HDMI Audio Select
  kind: action
  command: "HMDA{value}"   # 0=DIGITAL, 1=ANALOG
  params:
    - name: value
      type: integer
      description: "0=DIGITAL, 1=ANALOG"
- id: hdmi_audio_select_query
  label: HDMI Audio Select Query
  kind: query
  command: "HMDA????"
- id: quick_shoot_pc_set
  label: Quick Shoot (PC)
  kind: action
  command: "QSPC{value}"   # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: quick_shoot_pc_query
  label: Quick Shoot (PC) Query
  kind: query
  command: "QSPC????"
- id: quick_shoot_av_set
  label: Quick Shoot (AV)
  kind: action
  command: "QSAV{value}"   # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: quick_shoot_av_query
  label: Quick Shoot (AV) Query
  kind: query
  command: "QSAV????"
- id: audio_output_set
  label: Audio Output
  kind: action
  command: "AOUT{value}"   # 0=VARIABLE, 1=FIXED
  params:
    - name: value
      type: integer
      description: "0=VARIABLE, 1=FIXED"
- id: audio_output_query
  label: Audio Output Query
  kind: query
  command: "AOUT????"
- id: pxck_query
  label: Resolution Check (PC)
  kind: query
  command: "PXCK????"
- id: pxsl_set
  label: Pixel Setting (PC3/PC4)
  kind: action
  command: "PXSL{value}"   # 1-10
  params:
    - name: value
      type: integer
      description: "1-10 (resolution preset index)"
- id: pxsl_query
  label: Pixel Setting Query
  kind: query
  command: "PXSL????"
- id: reso_query
  label: Resolution Check (AV)
  kind: query
  command: "RESO????"
- id: scan_mode_set
  label: Scan Mode
  kind: action
  command: "SCAN{value}"   # 0=MODE1, 1=MODE2, 2=MODE3
  params:
    - name: value
      type: integer
      description: "0=MODE1, 1=MODE2, 2=MODE3 (AV only)"
- id: scan_mode_query
  label: Scan Mode Query
  kind: query
  command: "SCAN????"
- id: self_adjust_set
  label: Self Adjust
  kind: action
  command: "AADJ{value}"   # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: self_adjust_query
  label: Self Adjust Query
  kind: query
  command: "AADJ????"
- id: power_management_set
  label: Power Management
  kind: action
  command: "PMNG{value}"   # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: power_management_query
  label: Power Management Query
  kind: query
  command: "PMNG????"
- id: auto_input_change_set
  label: Auto Input Change
  kind: action
  command: "AINC{value}"   # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: auto_input_change_query
  label: Auto Input Change Query
  kind: query
  command: "AINC????"
- id: color_system_set
  label: Color System
  kind: action
  command: "CSYS{value}"   # 0=AUTO, 1=PAL, 2=PAL-60, 3=SECAM, 4=NTSC3.58, 5=NTSC4.43
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=PAL, 2=PAL-60, 3=SECAM, 4=NTSC3.58, 5=NTSC4.43"
- id: color_system_query
  label: Color System Query
  kind: query
  command: "CSYS????"

# =====================================================================
# ENLARGE menu
# =====================================================================
- id: enlarge_mode_set
  label: Enlarge Mode
  kind: action
  command: "EMAG{value}"   # 0=OFF, 1=2x2, 2=3x3, 3=4x4, 4=5x5
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=2x2, 2=3x3, 3=4x4, 4=5x5"
- id: enlarge_mode_query
  label: Enlarge Mode Query
  kind: query
  command: "EMAG????"
- id: enlarge_hv_set
  label: Enlarge H x V
  kind: action
  command: "EMHV{value}"   # 11-55 (mn: m=longest, n=shortest)
  params:
    - name: value
      type: string
      description: "11-55 (e.g. 22=2x2, 55=5x5)"
- id: enlarge_hv_query
  label: Enlarge H x V Query
  kind: query
  command: "EMHV????"
- id: bezel_h_set
  label: Bezel Width (Shorter Side)
  kind: action
  command: "BEZH{value}"   # 0-100
  params:
    - name: value
      type: integer
      description: "0-100"
- id: bezel_h_query
  label: Bezel Width (Shorter) Query
  kind: query
  command: "BEZH????"
- id: bezel_v_set
  label: Bezel Width (Longer Side)
  kind: action
  command: "BEZV{value}"   # 0-100
  params:
    - name: value
      type: integer
      description: "0-100"
- id: bezel_v_query
  label: Bezel Width (Longer) Query
  kind: query
  command: "BEZV????"
- id: enlarge_pos_hv_set
  label: Image Position (M x N)
  kind: action
  command: "EPHV{value}"   # 11-55
  params:
    - name: value
      type: string
      description: "11-55 (mn = H/V position indices)"
- id: enlarge_pos_hv_query
  label: Image Position (M x N) Query
  kind: query
  command: "EPHV????"
- id: enlarge_pos_set
  label: Image Position (2x2..5x5)
  kind: action
  command: "EPOS{value}"   # 0-3 (2x2), 0-8 (3x3), 0-15 (4x4), 0-24 (5x5)
  params:
    - name: value
      type: integer
      description: "0-3 (2x2), 0-8 (3x3), 0-15 (4x4), 0-24 (5x5)"
- id: enlarge_pos_query
  label: Image Position Query
  kind: query
  command: "EPOS????"
- id: enlarged_screen_h_set
  label: Enlarged Screen H-Position
  kind: action
  command: "EPSH{value}"   # -999 to 999
  params:
    - name: value
      type: integer
      description: "-999 to 999"
- id: enlarged_screen_h_query
  label: Enlarged Screen H-Position Query
  kind: query
  command: "EPSH????"
- id: enlarged_screen_v_set
  label: Enlarged Screen V-Position
  kind: action
  command: "EPSV{value}"   # -999 to 999
  params:
    - name: value
      type: integer
      description: "-999 to 999"
- id: enlarged_screen_v_query
  label: Enlarged Screen V-Position Query
  kind: query
  command: "EPSV????"
- id: enlarge_image_setting
  label: Enlarge/Image Position Combined
  kind: action
  command: "ESTG{XXYY}"   # XX=EMAG, YY=EPOS
  params:
    - name: XXYY
      type: string
      description: "XX=EMAG value, YY=EPOS value"
- id: enlarge_image_setting_query
  label: Enlarge/Image Position Combined Query
  kind: query
  command: "ESTG????"
- id: enlarge_hv_setting
  label: Enlarge H x V / Image Position Combined
  kind: action
  command: "ESHV{XXYY}"   # XX=EMHV, YY=EPHV
  params:
    - name: XXYY
      type: string
      description: "XX=EMHV value, YY=EPHV value"
- id: enlarge_hv_setting_query
  label: Enlarge H x V / Image Position Combined Query
  kind: query
  command: "ESHV????"

# =====================================================================
# PIP/PbyP menu
# =====================================================================
- id: pip_mode_set
  label: PIP Mode
  kind: action
  command: "MWIN{value}"   # 0=OFF, 1=PIP, 2=PbyP, 3=PbyP2
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=PIP, 2=PbyP, 3=PbyP2"
- id: pip_mode_query
  label: PIP Mode Query
  kind: query
  command: "MWIN????"
- id: pip_size_set
  label: PIP Size
  kind: action
  command: "MPSZ{value}"   # 1-12
  params:
    - name: value
      type: integer
      description: "1-12"
- id: pip_size_query
  label: PIP Size Query
  kind: query
  command: "MPSZ????"
- id: pip_pos_h_set
  label: PIP H-Position
  kind: action
  command: "MHPS{value}"   # 0-100
  params:
    - name: value
      type: integer
      description: "0-100"
- id: pip_pos_h_query
  label: PIP H-Position Query
  kind: query
  command: "MHPS????"
- id: pip_pos_v_set
  label: PIP V-Position
  kind: action
  command: "MVPS{value}"   # 0-100
  params:
    - name: value
      type: integer
      description: "0-100"
- id: pip_pos_v_query
  label: PIP V-Position Query
  kind: query
  command: "MVPS????"
- id: pip_vh_pos_set
  label: PIP V/H-Position Combined
  kind: action
  command: "MPOS{xxxyyy}"   # xxx=0-100 long, yyy=0-100 short
  params:
    - name: xxxyyy
      type: string
      description: "xxx=longer-side 0-100, yyy=shorter-side 0-100"
- id: pip_vh_pos_query
  label: PIP V/H-Position Query
  kind: query
  command: "MPOS????"
- id: pip_blend_set
  label: PIP Blend
  kind: action
  command: "MWBL{value}"   # 0-15
  params:
    - name: value
      type: integer
      description: "0-15"
- id: pip_blend_query
  label: PIP Blend Query
  kind: query
  command: "MWBL????"
- id: pip_source_set
  label: PIP Source
  kind: action
  command: "MWIP{value}"   # 1=PC1, 2=PC3, 3=AV3, 4=AV5, 6=PC4, 7=AV1, 8=AV4, 9=AV2, 10=PC2
  params:
    - name: value
      type: integer
      description: "1-10 per INPS source table"
- id: pip_source_query
  label: PIP Source Query
  kind: query
  command: "MWIP????"
- id: pip_sound_change
  label: PIP Sound Change
  kind: action
  command: "MWAD{value}"   # 1=MAIN, 2=SUB
  params:
    - name: value
      type: integer
      description: "1=MAIN, 2=SUB"
- id: pip_sound_change_query
  label: PIP Sound Change Query
  kind: query
  command: "MWAD????"
- id: pip_main_pos
  label: Main Screen Position
  kind: action
  command: "MWPP{value}"   # 0=POS1, 1=POS2
  params:
    - name: value
      type: integer
      description: "0=POS1, 1=POS2"
- id: pip_main_pos_query
  label: Main Screen Position Query
  kind: query
  command: "MWPP????"
- id: pip_pby2_pos
  label: PbyP2 Sub-Screen Position
  kind: action
  command: "MW2P{value}"   # 0=POS1, 1=POS2, 2=POS3
  params:
    - name: value
      type: integer
      description: "0=POS1, 1=POS2, 2=POS3"
- id: pip_pby2_pos_query
  label: PbyP2 Sub-Screen Position Query
  kind: query
  command: "MW2P????"
- id: pip_auto_off
  label: PIP Auto Off
  kind: action
  command: "MOFF{value}"   # 0=MANUAL, 1=AUTO
  params:
    - name: value
      type: integer
      description: "0=MANUAL, 1=AUTO"
- id: pip_auto_off_query
  label: PIP Auto Off Query
  kind: query
  command: "MOFF????"

# =====================================================================
# Initialization / Functional Restriction (FUNCTION) menu
# =====================================================================
- id: all_reset
  label: All Reset
  kind: action
  command: "RSET{value}"   # 0=ALL RESET 1, 1=ALL RESET 2
  params:
    - name: value
      type: integer
      description: "0=ALL RESET 1, 1=ALL RESET 2"
- id: adjustment_lock_set
  label: Adjustment Lock
  kind: action
  command: "ALCK{value}"   # 0-2
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=LOCK1, 2=LOCK2"
- id: adjustment_lock_query
  label: Adjustment Lock Query
  kind: query
  command: "ALCK????"
- id: osd_display_set
  label: OSD Display
  kind: action
  command: "LOSD{value}"   # 0=ON, 1=OFF
  params:
    - name: value
      type: integer
      description: "0=ON, 1=OFF"
- id: osd_display_query
  label: OSD Display Query
  kind: query
  command: "LOSD????"
- id: led_set
  label: LED
  kind: action
  command: "OFLD{value}"   # 0=ON, 1=OFF
  params:
    - name: value
      type: integer
      description: "0=ON, 1=OFF"
- id: led_query
  label: LED Query
  kind: query
  command: "OFLD????"
- id: temperature_alert_set
  label: Temperature Alert
  kind: action
  command: "TALT{value}"   # 0=OFF, 1=OSD&LED, 2=LED
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=OSD & LED, 2=LED"
- id: temperature_alert_query
  label: Temperature Alert Query
  kind: query
  command: "TALT????"
- id: status_alert_set
  label: Status Alert
  kind: action
  command: "SALT{value}"   # 0=OFF, 1=OSD&LED, 2=LED
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=OSD & LED, 2=LED"
- id: status_alert_query
  label: Status Alert Query
  kind: query
  command: "SALT????"

# =====================================================================
# Others
# =====================================================================
- id: screen_size_pc_set
  label: Screen Size (PC)
  kind: action
  command: "WIDE{value}"   # 1=WIDE, 2=NORMAL, 3=Dot by Dot, 4=ZOOM1, 5=ZOOM2
  params:
    - name: value
      type: integer
      description: "1=WIDE, 2=NORMAL, 3=Dot by Dot, 4=ZOOM1, 5=ZOOM2"
- id: screen_size_pc_query
  label: Screen Size (PC) Query
  kind: query
  command: "WIDE????"
- id: screen_size_av_set
  label: Screen Size (AV)
  kind: action
  command: "WIDE{value}"   # 1=WIDE, 2=ZOOM1, 3=ZOOM2, 4=NORMAL, 5=Dot by Dot
  params:
    - name: value
      type: integer
      description: "1=WIDE, 2=ZOOM1, 3=ZOOM2, 4=NORMAL, 5=Dot by Dot"
- id: volume_set
  label: Volume
  kind: action
  command: "VOLM{value}"   # 0-31
  params:
    - name: value
      type: integer
      description: "0-31"
- id: volume_query
  label: Volume Query
  kind: query
  command: "VOLM????"
- id: mute_set
  label: Mute
  kind: action
  command: "MUTE{value}"   # 0=OFF, 1=ON
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: mute_query
  label: Mute Query
  kind: query
  command: "MUTE????"
- id: inf1_query
  label: Information Model
  kind: query
  command: "INF1????"   # returns model name
- id: srno_query
  label: Information Serial Number
  kind: query
  command: "SRNO????"
- id: brightness_set
  label: Brightness (Backlight)
  kind: action
  command: "VLMP{value}"   # 0-31
  params:
    - name: value
      type: integer
      description: "0-31"
- id: brightness_query
  label: Brightness Query
  kind: query
  command: "VLMP????"
- id: dsta_query
  label: Temperature Sensor Status
  kind: query
  command: "DSTA????"   # 0=normal, 1=abnormal standby, 2=was abnormal, 3=backlight dimmed, 4=sensor abnormal
- id: errt_query
  label: Temperature Acquisition
  kind: query
  command: "ERRT????"   # returns [sensor1, sensor2, sensor3]; 126 = sensor abnormal
- id: stca_init
  label: Cause of Last Standby Init
  kind: action
  command: "STCA0"
- id: stca_query
  label: Cause of Last Standby Query
  kind: query
  command: "STCA????"   # 0=no error, 1=POWER button, 2=main power OFF, 3=RS-232C/LAN, 4=No Signal, 6=abnormal temp, 8=SCHEDULE
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, normal, input_signal_waiting]
- id: input_mode
  type: enum
  values: [pc1_dvi_d, pc3_d_sub, av3_component, av5_video, pc4_rgb, av1_dvi_d, av4_s_video, av2_hdmi, pc2_hdmi]
- id: temperature_status
  type: enum
  values: [normal, abnormal_standby, was_abnormal, backlight_dimmed, sensor_abnormal]
- id: standby_cause
  type: enum
  values: [no_error, power_button, main_power_off, rs232c_lan, no_signal, abnormal_temperature, schedule]
- id: ack_ok
  type: string
  values: ["OK"]
- id: ack_err
  type: string
  values: ["ERR"]
- id: ack_wait
  type: string
  values: ["WAIT"]
- id: ack_locked
  type: string
  values: ["LOCKED"]
- id: ack_unselected
  type: string
  values: ["UNSELECTED"]
```

## Variables
```yaml
# Variables that have dedicated set+query commands. Each maps to a single RS-232C command.
- id: volume
  command_set: "VOLM{value}"
  command_query: "VOLM????"
  type: integer
  range: [0, 31]
- id: brightness
  command_set: "VLMP{value}"
  command_query: "VLMP????"
  type: integer
  range: [0, 31]
- id: mute
  command_set: "MUTE{value}"
  command_query: "MUTE????"
  type: boolean
- id: contrast
  command_set: "CONT{value}"
  command_query: "CONT????"
  type: integer
  range: [0, 127]   # 0-60 AV, 0-127 PC
- id: color_temperature
  command_set: "CTMP{value}"
  command_query: "CTMP????"
  type: integer
  range: [0, 99]   # 0=THRU, 1-15=PRESET, 99=USER
- id: language
  command_set: "LANG{value}"
  command_query: "LANG????"
  type: integer
  range: [1, 14]   # 14=EN, 1=DE, 2=FR, 3=IT, 4=ES, 5=RU, 6=JP
- id: monitor_id
  command_set: "IDST{nnn}"
  command_query: "IDST????"
  type: integer
  range: [0, 255]   # 0=cleared
```

## Events
```yaml
# Unsolicited notifications (responses triggered by external state changes).
# The monitor does not appear to send unsolicited event-style messages on RS-232C
# or HTTP; all responses are command/response. Mail notifications are sent over SMTP,
# not as structured events.
- id: wait_response
  description: "WAIT returned when command execution is taking time (repeater control, IDSL/IDLK, RSET, INPS, ASNC, WIDE, EMAG, EPOS, PXSL, POWR, AGIN, MWIN, MWIP, MWPP, ESTG, EMHV, EPHV, ESHV)."
- id: locked_response
  description: "LOCKED returned when RS-232C is locked by operation lock."
- id: unselected_response
  description: "UNSELECTED returned when RS-232C/LAN SELECT is set to LAN."
```

## Macros
```yaml
# All Reset requires 30s timeout. IDLK sequence wraps commands for daisy-chain.
- id: idlk_volume_to_id2
  description: "Set the volume of monitor with ID 2 to 20 (daisy chain)."
  steps:
    - {command: "IDLK0002", wait: "WAIT", expect: "OK 002"}
    - {command: "VOLM0030", wait: "WAIT", expect: "OK 002"}
    - {command: "VOLM0020", expect: "OK 002"}
    - {command: "IDLK0000", wait: "WAIT", expect: "OK 002"}
- id: repeater_set_volume_all
  description: "Set all monitors in daisy chain to volume 30."
  steps:
    - {command: "VOLM030+", wait: "WAIT", expect: "OK 001..OK 00n"}
- id: repeater_query_volume_all
  description: "Query volume from all monitors in daisy chain."
  steps:
    - {command: "VOLM???+", wait: "WAIT", expect: "value 001..value 00n"}
- id: repeater_assign_ids
  description: "Auto-assign IDs 1..N to daisy-chained monitors."
  steps:
    - {command: "IDST001+", wait: "WAIT", expect: "OK 001..OK 00N"}
```

## Safety
```yaml
confirmation_required_for:
  - all_reset  # RSET wipes all settings, requires 30s timeout
interlocks: []
# The source documents no explicit safety interlocks or power-on sequencing
# beyond the standard timeout/interval requirements. POWER ON DELAY is a
# sequencing feature, not a safety interlock.
```

## Notes
- Command format: 4-character ASCII command field + 4-character ASCII parameter field, terminated with CR (0x0D) or CR+LF (0x0D 0x0A). When RS-232C/LAN COMMAND = MODE1, return is CR only; MODE2 fixes return value length to 4 digits with CR only.
- Negative parameters use 3-digit form (e.g. `AUTR-009`), not space-padded.
- MPOS, DATE, and SC01-SC08 use variable-length parameter strings with no padding.
- "WAIT" is returned for slow commands (RSET, INPS, ASNC, WIDE, EMAG, EPOS, PXSL, POWR, AGIN, MWIN, MWIP, MWPP, ESTG, EMHV, EPHV, ESHV, IDSL, IDLK, repeater control). No commands may be sent while WAIT is pending.
- "LOCKED" indicates RS-232C is disabled by operation lock. "UNSELECTED" indicates the SELECT is set to LAN.
- "ERR" is returned for unknown commands or commands invalid in the current state. No response is returned for a bad connection.
- Set timeout >= 10s per command. Wait >= 100 ms between command and next command. For ALL RESET, timeout >= 30s. For POWER ON with POWER ON DELAY, timeout >= POWER ON DELAY + 10s.
- Daisy chain: up to 25 monitors. ID numbers 1-255; "0" means no ID. The same physical command is used with the FOURTH character of the parameter set to "+" for repeater (broadcast) control. IDs can be assigned non-sequentially.
- When an ID is assigned, responses are suffixed with the responding monitor's ID (`OK 001`, `OK 002`, etc.).
- LAN control: HTTP web UI on configurable DATA port (1025-65535) and SEARCH port (1025-65535). Default factory IP: 192.168.150.2 / 255.255.255.0 / 0.0.0.0. Default credentials: blank user / blank password. Max user name and password length: 8 characters.
- Some commands are usable in standby mode ("A" = always, "B" = only when STANDBY MODE=STANDARD). When STANDBY MODE=LOW POWER, only "A" commands work in standby.
- Standby mode setting: STANDARD = faster wake, more standby power. LOW POWER = lower standby power, slower wake, fewer commands available in standby.
- HTTP control endpoint structure beyond `/` is not documented in the source (the manual describes the web UI by feature, not by URL path). WebSocket / REST / custom API endpoints are not exposed.
- E-mail notifications (SMTP) can be configured with optional POP-before-SMTP authentication. The monitor can send status, error, and periodical e-mail to a recipient list.

<!-- UNRESOLVED: firmware version not stated in source. UNRESOLVED: TCP data/search port factory defaults not stated. UNRESOLVED: HTTP API endpoint paths beyond `/` not documented. -->

## Provenance

```yaml
source_domains:
  - docs.aws.sharp.eu
  - manualshelf.com
  - business.sharpusa.com
  - sharp.eu
source_urls:
  - https://docs.aws.sharp.eu/om/19_info-display/PNS655_OM_GB.pdf
  - https://www.manualshelf.com/manual/sharp/pn-s655/owner-s-manual-english.html
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_man_PNS655.pdf
  - https://www.sharp.eu/sharp-pn-s655
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_qguide_PNS655.pdf
retrieved_at: 2026-08-10T22:29:32.871Z
last_checked_at: 2026-08-19T09:46:23.441Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:46:23.441Z
matched_actions: 238
action_count: 238
confidence: medium
summary: "Every spec action maps to a documented RS-232C command in the source command table; all transport values match source verbatim. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP control endpoint paths beyond `/` and exact request/response payload shapes are not documented in the source."
- "firmware version not stated in source. UNRESOLVED: TCP data/search port factory defaults not stated. UNRESOLVED: HTTP API endpoint paths beyond `/` not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
