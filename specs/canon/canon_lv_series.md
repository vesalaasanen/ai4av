---
spec_id: admin/canon-lv-7575
schema_version: ai4av-public-spec-v1
revision: 1
title: "Canon LV-7575 Control Spec"
manufacturer: Canon
model_family: LV-7575
aliases: []
compatible_with:
  manufacturers:
    - Canon
  models:
    - LV-7575
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - downloads.canon.com
  - manualslib.com
source_urls:
  - https://downloads.canon.com/cpr/software/projectors/LV-7575_ext_com.pdf
  - https://www.manualslib.com/manual/221112/Canon-Lv-7290.html
  - https://www.manualslib.com/manual/574489/Canon-Lv-7292a.html
  - https://www.manualslib.com/manual/422163/Canon-Lv-7392a.html
  - https://downloads.canon.com/cpr/software/projectors/LV-7575.pdf
retrieved_at: 2026-08-10T19:43:09.954Z
last_checked_at: 2026-08-19T09:05:18.467Z
generated_at: 2026-08-19T09:05:18.467Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - CR_CLPWIDTH
  - "PJLink / Telnet / HTTP / Web controls not covered in this source. Network control via LV-NI02 may add capability."
  - "source describes no unsolicited event/notification stream. All responses are request-reply."
  - "source does not describe multi-step macros."
  - "PJLink / Telnet / HTTP / Web operations may be available via LV-NI02 but not documented in this source."
  - "source says \\\"Farmware Ver. 1.x\\\"; exact range not enumerated\\nderived_from:\\n  - vendor_manual\\ndeclared_confidence: low\\nlicense: CC-BY-4.0\\ncreated_at: 2026-08-10\\n---\\n\\n# Canon LV-7575 Control Spec\\n\\n## Summary\\nCanon LV-7575 projector. Expand Serial Command set over RS-232C (D-Sub 9 on PC, mini 8-pin on projector). CF_ (Functional Execution) and CR_ (Status Read) opcodes, ASCII with CR (0x0D) terminator. Source only covers RS-232C; LAN/network control via LV-NI02 attachment not documented here.\\n\\n<!-- UNRESOLVED: PJLink / Telnet / HTTP / Web controls not covered in this source. -->\\n\\n## Transport\\n```yaml\\nprotocols:\\n  - serial\\nserial:\\n  baud_rate: 19200"
verification:
  verdict: verified
  checked_at: 2026-08-19T09:05:18.467Z
  matched_actions: 196
  action_count: 196
  confidence: medium
  summary: "All 196 spec wire-literal commands appear in source command tables; only CR_CLPWIDTH query is unrepresented (extra_in_source ≤ 5, ratio ~0.99). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-10
---

# Canon LV-7575 Control Spec

## Summary
Canon LV-7575 projector. Expand Serial Command set over RS-232C (D-Sub 9 on PC, mini 8-pin on projector). Builds on top of baseline "C" commands via CF_ (Functional Execution) and CR_ (Status Read) opcodes, sent ASCII with CR (0x0D) terminator. Source only covers the RS-232C control port; LAN/network control requires LV-NI02 attachment (not documented in this spec).

<!-- UNRESOLVED: PJLink / Telnet / HTTP / Web controls not covered in this source. Network control via LV-NI02 may add capability. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # initial setting; 9600 also selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no login procedure in source
```

## Traits
```yaml
- powerable       # inferred: CF_POWER_ON/OFF
- routable        # inferred: CF_INPUT / CF_SOURCE / CF_INPUT1-4
- queryable       # inferred: CR_ command family
- levelable       # inferred: volume, brightness, contrast, etc.
```

## Actions
```yaml
# CRITICAL: enumerate every CF_ row from source. Each is one action.
# Line terminator is CR (0x0D). "_" in source denotes a space character.

# --- Image ---
- id: cf_bright
  label: Set Brightness
  kind: action
  command: "CF_BRIGHT %{value}"
  params:
    - name: value
      type: string
      description: "000-063 direct, UP increment, DN decrement"
- id: cf_cont
  label: Set Contrast
  kind: action
  command: "CF_CONT %{value}"
  params:
    - name: value
      type: string
      description: "000-063 / UP / DN"
- id: cf_color
  label: Set Color
  kind: action
  command: "CF_COLOR %{value}"
  params:
    - name: value
      type: string
      description: "000-063 / UP / DN"
- id: cf_tint
  label: Set Tint
  kind: action
  command: "CF_TINT %{value}"
  params:
    - name: value
      type: string
      description: "000-063 / UP / DN"
- id: cf_sharp
  label: Set Sharpness
  kind: action
  command: "CF_SHARP %{value}"
  params:
    - name: value
      type: string
      description: "000-031 / UP / DN"
- id: cf_gamma
  label: Set Gamma
  kind: action
  command: "CF_GAMMA %{value}"
  params:
    - name: value
      type: string
      description: "000-015 / UP / DN"
- id: cf_wbal
  label: Set White Balance
  kind: action
  command: "CF_WBAL-%{channel} %{value}"
  params:
    - name: channel
      type: string
      description: "R / G / B"
    - name: value
      type: string
      description: "000-063 / UP / DN"
- id: cf_coltemp
  label: Set Color Temperature
  kind: action
  command: "CF_COLTEMP %{value}"
  params:
    - name: value
      type: string
      description: "000 Xlow / 001 Low / 002 Mid / 003 High"
- id: cf_nzred
  label: Set Noise Reduction
  kind: action
  command: "CF_NZRED %{value}"
  params:
    - name: value
      type: string
      description: "OFF / L1 / L2 / UP / DN"
- id: cf_progv
  label: Set Progressive Scan
  kind: action
  command: "CF_PROGV %{value}"
  params:
    - name: value
      type: string
      description: "ON / FILM / OFF / UP / DN"
- id: cf_image
  label: Set Image Mode
  kind: action
  command: "CF_IMAGE %{value}"
  params:
    - name: value
      type: string
      description: "STANDPC / STANDAV / REAL / CINEMA / CUSTOM1..CUSTOM10"
- id: cf_imageadj
  label: Reset/Store Image Adjustment
  kind: action
  command: "CF_IMAGEADJ %{value}"
  params:
    - name: value
      type: string
      description: "RST / STR1..STR10"
- id: cf_apctrl
  label: Set Auto Picture Control
  kind: action
  command: "CF_APCTRL %{value}"
  params:
    - name: value
      type: string
      description: "L1 / L2 / OFF / UP / DN"
- id: cf_colmnsav
  label: Store Color Management
  kind: action
  command: "CF_COLMNSAV %{area}"
  params:
    - name: area
      type: string
      description: "000-009"
- id: cf_colmnld
  label: Load Color Management
  kind: action
  command: "CF_COLMNLD %{area}"
  params:
    - name: area
      type: string
      description: "000-009"

# --- PC Adjust ---
- id: cf_fsync
  label: Set Fine Sync
  kind: action
  command: "CF_FSYNC %{value}"
  params:
    - name: value
      type: string
      description: "0000-0031 / UP / DN"
- id: cf_tdots
  label: Set Total Dots
  kind: action
  command: "CF_TDOTS %{value}"
  params:
    - name: value
      type: string
      description: "mmmm-nnnn / UP / DN"
- id: cf_clpphase
  label: Set Clamp Phase
  kind: action
  command: "CF_CLPPHASE %{value}"
  params:
    - name: value
      type: string
      description: "0001-0225 / UP / DN"
- id: cf_clpwidth
  label: Set Clamp Width
  kind: action
  command: "CF_CLPWIDTH %{value}"
  params:
    - name: value
      type: string
      description: value per source
- id: cf_hpos
  label: Set Horizontal Position
  kind: action
  command: "CF_H-POS %{value}"
  params:
    - name: value
      type: string
      description: "0000-nnnn / UP / DN"
- id: cf_vpos
  label: Set Vertical Position
  kind: action
  command: "CF_V-POS %{value}"
  params:
    - name: value
      type: string
      description: "0000-nnnn / UP / DN"
- id: cf_ddots
  label: Set Display Dots
  kind: action
  command: "CF_DDOTS %{value}"
  params:
    - name: value
      type: string
      description: "0100-nnnn / UP / DN (even)"
- id: cf_dline
  label: Set Display Line
  kind: action
  command: "CF_DLINE %{value}"
  params:
    - name: value
      type: string
      description: "0100-nnnn / UP / DN"
- id: cf_setpcadj
  label: Apply/Specify PC Adjust
  kind: action
  command: "CF_SETPCADJ %{value}"
  params:
    - name: value
      type: string
      description: "None applies, or EXT11-60"
- id: cf_orgmode
  label: Specify Original Signal (PC mode)
  kind: action
  command: "CF_ORGMODE %{value}"
  params:
    - name: value
      type: string
      description: "VGA1..WXGA3 / 1080I60 / 1080I50 / 1035I / 720p60 / 720p50 / 575p / 480p / 575I / 480I / 1080psf/24-30"
- id: cf_pcstore
  label: Store PC Adjust to Mode
  kind: action
  command: "CF_PCSTORE %{mode}"
  params:
    - name: mode
      type: string
      description: "1..10"
- id: cf_pcmodefree
  label: Free PC Adjust Mode
  kind: action
  command: "CF_PCMODEFREE %{mode}"
  params:
    - name: mode
      type: string
      description: "1..10"

# --- Input ---
- id: cf_input
  label: Select Input
  kind: action
  command: "CF_INPUT %{value}"
  params:
    - name: value
      type: string
      description: "1 / 2 / 3 / 4 / UP / DN"
- id: cf_source
  label: Select Source of Current Input
  kind: action
  command: "CF_SOURCE %{value}"
  params:
    - name: value
      type: string
      description: "DIGITAL / ANALOG / SCART / HDCP / VIDEO / YPBPR / S-VIDEO / NETWORK / UP / DN"
- id: cf_input1
  label: Select Input 1 + Source
  kind: action
  command: "CF_INPUT1 %{value}"
  params:
    - name: value
      type: string
      description: "DIGITAL / ANALOG / SCART / HDCP / OUT"
- id: cf_input2
  label: Select Input 2 + Source
  kind: action
  command: "CF_INPUT2 %{value}"
  params:
    - name: value
      type: string
      description: "VIDEO / YPBPR / ANALOG"
- id: cf_input3
  label: Select Input 3 + Source
  kind: action
  command: "CF_INPUT3 %{value}"
  params:
    - name: value
      type: string
      description: "VIDEO / S-VIDEO / YPBPR"
- id: cf_input4
  label: Select Input 4 (Network)
  kind: action
  command: "CF_INPUT4 %{value}"
  params:
    - name: value
      type: string
      description: "NETWORK"
- id: cf_system
  label: Select System of Current Input
  kind: action
  command: "CF_SYSTEM %{value}"
  params:
    - name: value
      type: string
      description: "VGA1..WXGA3 / 1080I..480I / D-XGA1..D-1080psf/30 / AUTO / NTSC..PAL-N"

# --- Screen ---
- id: cf_screen
  label: Select Screen Size
  kind: action
  command: "CF_SCREEN %{value}"
  params:
    - name: value
      type: string
      description: "NORMAL / WIDE / TRUE / FULL / DZOOM_UP / DZOOM_DN / UP / DN"
- id: cf_dzcent
  label: Cancel Digital Zoom
  kind: action
  command: "CF_DZCENT CENT"
  params: []
- id: cf_keystone
  label: Set Keystone Correction
  kind: action
  command: "CF_KEYSTONE %{value}"
  params:
    - name: value
      type: string
      description: "UP / FUP / DN / FDN / LEFT / FLFT / RIGHT / FRGT / RST"
- id: cf_kystnmode
  label: Set Keystone Store Mode
  kind: action
  command: "CF_KYSTNMODE %{value}"
  params:
    - name: value
      type: string
      description: "STR / RST"
- id: cf_anamorphic
  label: Set Anamorphic
  kind: action
  command: "CF_ANAMORPHIC %{value}"
  params:
    - name: value
      type: string
      description: "ON / OFF"

# --- Lamp ---
- id: cf_lamph
  label: Reset Lamp Running Time
  kind: action
  command: "CF_LAMPH RST"
  params: []
- id: cf_lampmode
  label: Select Lamp Mode
  kind: action
  command: "CF_LAMPMODE %{value}"
  params:
    - name: value
      type: string
      description: "NORMAL / ECO / AUTO"

# --- Sound ---
- id: cf_volume
  label: Set Volume
  kind: action
  command: "CF_VOLUME %{value}"
  params:
    - name: value
      type: string
      description: "000-063 / UP / DN"
- id: cf_mute
  label: Set Sound Mute
  kind: action
  command: "CF_MUTE %{value}"
  params:
    - name: value
      type: string
      description: "ON / OFF"
- id: cf_bltinsp
  label: Set Built-in Speaker
  kind: action
  command: "CF_BLTINSP %{value}"
  params:
    - name: value
      type: string
      description: "ON / OFF"

# --- Setting ---
- id: cf_backgnd
  label: Set Background Screen (No Signal)
  kind: action
  command: "CF_BACKGND %{value}"
  params:
    - name: value
      type: string
      description: "BLUE / USER / BLACK / UP / DN"
- id: cf_disp
  label: Set On Screen Display
  kind: action
  command: "CF_DISP %{value}"
  params:
    - name: value
      type: string
      description: "ON / CNTDWNOFF / OFF / UP / DN"
- id: cf_logo
  label: Set Logo PIN + Mode
  kind: action
  command: "CF_LOGO %{pin} %{mode}"
  params:
    - name: pin
      type: string
      description: "0000-9999 Logo PIN"
    - name: mode
      type: string
      description: "OFF / DFLT / USER / UP / DN"
- id: cf_ceil
  label: Set Ceiling Projection
  kind: action
  command: "CF_CEIL %{value}"
  params:
    - name: value
      type: string
      description: "ON / OFF"
- id: cf_rear
  label: Set Rear Projection
  kind: action
  command: "CF_REAR %{value}"
  params:
    - name: value
      type: string
      description: "ON / OFF"
- id: cf_rcode
  label: Select Remote Control Code
  kind: action
  command: "CF_RCODE %{value}"
  params:
    - name: value
      type: string
      description: "001-008 / UP / DN"
- id: cf_lang
  label: Select OSD Language
  kind: action
  command: "CF_LANG %{value}"
  params:
    - name: value
      type: string
      description: "ENG / DEU / FRA / ITA / ESP / POR / NED / SVE / JPN / CHI / KOR / RUS"
- id: cf_onsta
  label: Set Power On Start
  kind: action
  command: "CF_ON-STA %{value}"
  params:
    - name: value
      type: string
      description: "ON / OFF / UP / DN"
- id: cf_pmane
  label: Set Power Management
  kind: action
  command: "CF_P-MANE %{value}"
  params:
    - name: value
      type: string
      description: "OFF / READY / SHUTDOWN / UP / DN"
- id: cf_pmanetime
  label: Set Power Management Time
  kind: action
  command: "CF_P-MANETIME %{value}"
  params:
    - name: value
      type: string
      description: "01-30 / UP / DN"
- id: cf_fanspeed
  label: Set Fan Speed
  kind: action
  command: "CF_FANSPEED %{value}"
  params:
    - name: value
      type: string
      description: "MAX / NOR"
- id: cf_keydis
  label: Prohibit RC/KEY Control
  kind: action
  command: "CF_KEYDIS %{value}"
  params:
    - name: value
      type: string
      description: "NONE / RC / KEY"
- id: cf_fdefault
  label: Factory Default Reset
  kind: action
  command: "CF_FDEFAULT RST"
  params: []
- id: cf_pjpincode
  label: Enter PJ PIN Code
  kind: action
  command: "CF_PJPINCODE %{pin}"
  params:
    - name: pin
      type: string
      description: "0000-9999"
- id: cf_anamorphic_setting
  label: Set Anamorphic (Setting table)
  kind: action
  command: "CF_ANAMORPHIC %{value}"
  params:
    - name: value
      type: string
      description: "ON / OFF"

# --- Other ---
- id: cf_keyemu
  label: RC/Key Emulation
  kind: action
  command: "CF_KEYEMU %{value}"
  params:
    - name: value
      type: string
      description: "RIGHT / LEFT / UP / DN / SELECT / AUTOPC"
- id: cf_menu
  label: Show/Hide OSD Menu
  kind: action
  command: "CF_MENU %{value}"
  params:
    - name: value
      type: string
      description: "ON / OFF"
- id: cf_power
  label: Power On/Off
  kind: action
  command: "CF_POWER %{value}"
  params:
    - name: value
      type: string
      description: "ON / OFF"
- id: cf_freeze
  label: Set Freeze
  kind: action
  command: "CF_FREEZE %{value}"
  params:
    - name: value
      type: string
      description: "ON / OFF / UP / DN"

# --- Status Read (queries) ---
- id: cr_bright
  label: Get Brightness
  kind: query
  command: "CR_BRIGHT"
  params: []
- id: cr_cont
  label: Get Contrast
  kind: query
  command: "CR_CONT"
  params: []
- id: cr_color
  label: Get Color
  kind: query
  command: "CR_COLOR"
  params: []
- id: cr_tint
  label: Get Tint
  kind: query
  command: "CR_TINT"
  params: []
- id: cr_sharp
  label: Get Sharpness
  kind: query
  command: "CR_SHARP"
  params: []
- id: cr_gamma
  label: Get Gamma
  kind: query
  command: "CR_GAMMA"
  params: []
- id: cr_wbalr
  label: Get WB Red
  kind: query
  command: "CR_WBAL-R"
  params: []
- id: cr_wbalg
  label: Get WB Green
  kind: query
  command: "CR_WBAL-G"
  params: []
- id: cr_wbalb
  label: Get WB Blue
  kind: query
  command: "CR_WBAL-B"
  params: []
- id: cr_coltemp
  label: Get Color Temperature
  kind: query
  command: "CR_COLTEMP"
  params: []
- id: cr_nzred
  label: Get Noise Reduction
  kind: query
  command: "CR_NZRED"
  params: []
- id: cr_progv
  label: Get Progressive Scan
  kind: query
  command: "CR_PROGV"
  params: []
- id: cr_image
  label: Get Image Mode
  kind: query
  command: "CR_IMAGE"
  params: []
- id: cr_imggmd
  label: Get Image Gamma
  kind: query
  command: "CR_IMGGMD"
  params: []
- id: cr_apctrl
  label: Get Auto Picture Control
  kind: query
  command: "CR_APCTRL"
  params: []
- id: cr_fsync
  label: Get Fine Sync
  kind: query
  command: "CR_FSYNC"
  params: []
- id: cr_tdots
  label: Get Total Dots
  kind: query
  command: "CR_TDOTS"
  params: []
- id: cr_clpphase
  label: Get Clamp Phase
  kind: query
  command: "CR_CLPPHASE"
  params: []
- id: cr_hpos
  label: Get Horizontal Position
  kind: query
  command: "CR_H-POS"
  params: []
- id: cr_vpos
  label: Get Vertical Position
  kind: query
  command: "CR_V-POS"
  params: []
- id: cr_ddots
  label: Get Display Dots
  kind: query
  command: "CR_DDOTS"
  params: []
- id: cr_dline
  label: Get Display Line
  kind: query
  command: "CR_DLINE"
  params: []
- id: cr_orgmode
  label: Get Original Signal
  kind: query
  command: "CR_ORGMODE"
  params: []
- id: cr_pcstore
  label: Get PC Store Status
  kind: query
  command: "CR_PCSTORE"
  params: []
- id: cr_setpcadj
  label: Get Current PC Signal
  kind: query
  command: "CR_SETPCADJ"
  params: []
- id: cr_sersys
  label: Get Current Video Signal
  kind: query
  command: "CR_SERSYS"
  params: []
- id: cr_input
  label: Get Selected Input
  kind: query
  command: "CR_INPUT"
  params: []
- id: cr_source
  label: Get Selected Source
  kind: query
  command: "CR_SOURCE"
  params: []
- id: cr_srcinp1
  label: Get Source of Input 1
  kind: query
  command: "CR_SRCINP1"
  params: []
- id: cr_srcinp2
  label: Get Source of Input 2
  kind: query
  command: "CR_SRCINP2"
  params: []
- id: cr_srcinp3
  label: Get Source of Input 3
  kind: query
  command: "CR_SRCINP3"
  params: []
- id: cr_srcinp4
  label: Get Source of Input 4
  kind: query
  command: "CR_SRCINP4"
  params: []
- id: cr_system
  label: Get Selected System
  kind: query
  command: "CR_SYSTEM"
  params: []
- id: cr_syslist
  label: Get Possible System List
  kind: query
  command: "CR_SYSLIST"
  params: []
- id: cr_modelist
  label: Get Possible Mode List
  kind: query
  command: "CR_MODELIST"
  params: []
- id: cr_hmslot
  label: Get Total Inputs
  kind: query
  command: "CR_HMSLOT"
  params: []
- id: cr_nmslot1
  label: Get Terminal Info Input 1
  kind: query
  command: "CR_NMSLOT1"
  params: []
- id: cr_nmslot2
  label: Get Terminal Info Input 2
  kind: query
  command: "CR_NMSLOT2"
  params: []
- id: cr_nmslot3
  label: Get Terminal Info Input 3
  kind: query
  command: "CR_NMSLOT3"
  params: []
- id: cr_nmslot4
  label: Get Terminal Info Input 4
  kind: query
  command: "CR_NMSLOT4"
  params: []
- id: cr_idslot1
  label: Get ID Info Input 1
  kind: query
  command: "CR_IDSLOT1"
  params: []
- id: cr_idslot2
  label: Get ID Info Input 2
  kind: query
  command: "CR_IDSLOT2"
  params: []
- id: cr_idslot3
  label: Get ID Info Input 3
  kind: query
  command: "CR_IDSLOT3"
  params: []
- id: cr_idslot4
  label: Get ID Info Input 4
  kind: query
  command: "CR_IDSLOT4"
  params: []
- id: cr_screen
  label: Get Screen Size
  kind: query
  command: "CR_SCREEN"
  params: []
- id: cr_kystnmode
  label: Get Keystone Store Mode
  kind: query
  command: "CR_KYSTNMODE"
  params: []
- id: cr_anamorphic
  label: Get Anamorphic
  kind: query
  command: "CR_ANAMORPHIC"
  params: []
- id: cr_lamprepl
  label: Get Lamp Replacement Time
  kind: query
  command: "CR_LAMPREPL"
  params: []
- id: cr_lamph
  label: Get Lamp Running Time
  kind: query
  command: "CR_LAMPH"
  params: []
- id: cr_lampcorresph
  label: Get Lamp Time Coefficient
  kind: query
  command: "CR_LAMPCORRESPH"
  params: []
- id: cr_lampmode
  label: Get Lamp Mode
  kind: query
  command: "CR_LAMPMODE"
  params: []
- id: cr_lampsts
  label: Get Lamp Status
  kind: query
  command: "CR_LAMPSTS"
  params: []
- id: cr_projh
  label: Get Projector Total Hours
  kind: query
  command: "CR_PROJH"
  params: []
- id: cr_hmlamp
  label: Get Total Lamp Number
  kind: query
  command: "CR_HMLAMP"
  params: []
- id: cr_volume
  label: Get Volume
  kind: query
  command: "CR_VOLUME"
  params: []
- id: cr_mute
  label: Get Sound Mute
  kind: query
  command: "CR_MUTE"
  params: []
- id: cr_bltinsp
  label: Get Built-in Speaker
  kind: query
  command: "CR_BLTINSP"
  params: []
- id: cr_backgnd
  label: Get Background Setting
  kind: query
  command: "CR_BACKGND"
  params: []
- id: cr_disp
  label: Get OSD Display
  kind: query
  command: "CR_DISP"
  params: []
- id: cr_logo
  label: Get Logo Setting
  kind: query
  command: "CR_LOGO"
  params: []
- id: cr_logolock
  label: Get Logo Lock
  kind: query
  command: "CR_LOGOLOCK"
  params: []
- id: cr_ceil
  label: Get Ceiling Setting
  kind: query
  command: "CR_CEIL"
  params: []
- id: cr_rear
  label: Get Rear Setting
  kind: query
  command: "CR_REAR"
  params: []
- id: cr_rcode
  label: Get Remote Control Code
  kind: query
  command: "CR_RCODE"
  params: []
- id: cr_rtype
  label: Get Remote Control Type
  kind: query
  command: "CR_RTYPE"
  params: []
- id: cr_lang
  label: Get OSD Language
  kind: query
  command: "CR_LANG"
  params: []
- id: cr_onsta
  label: Get Power On Start
  kind: query
  command: "CR_ON-STA"
  params: []
- id: cr_pmane
  label: Get Power Management
  kind: query
  command: "CR_P-MANE"
  params: []
- id: cr_pmanetime
  label: Get Power Management Time
  kind: query
  command: "CR_P-MAETIME"
  params: []
- id: cr_fanspeed
  label: Get Fan Speed
  kind: query
  command: "CR_FANSPEED"
  params: []
- id: cr_keydis
  label: Get RC/KEY Status
  kind: query
  command: "CR_KEYDIS"
  params: []
- id: cr_security
  label: Get Security
  kind: query
  command: "CR_SECURITY"
  params: []
- id: cr_pjlocknow
  label: Get PIN Lock Status
  kind: query
  command: "CR_PJLOCKNOW"
  params: []
- id: cr_pjlockmenu
  label: Get PIN Lock Menu Setting
  kind: query
  command: "CR_PJLOCKMENU"
  params: []
- id: cr_status
  label: Get Projector Operating Status
  kind: query
  command: "CR_STATUS"
  params: []
- id: cr_pressure
  label: Get Air Pressure
  kind: query
  command: "CR_PRESSURE"
  params: []
- id: cr_signal
  label: Get Signal Presence
  kind: query
  command: "CR_SIGNAL"
  params: []
- id: cr_vmute
  label: Get No Show
  kind: query
  command: "CR_VMUTE"
  params: []
- id: cr_freeze
  label: Get Freeze
  kind: query
  command: "CR_FREEZE"
  params: []
- id: cr_allpfail
  label: Get All Power Failure Info
  kind: query
  command: "CR_ALLPFAIL"
  params: []
- id: cr_hmpfail
  label: Get Number of Detectable Power Failures
  kind: query
  command: "CR_HMPFAIL"
  params: []
- id: cr_pfail01
  label: Get Power Failure No.01
  kind: query
  command: "CR_PFAIL01"
  params: []
- id: cr_pfail02
  label: Get Power Failure No.02
  kind: query
  command: "CR_PFAIL02"
  params: []
- id: cr_pfail03
  label: Get Power Failure No.03
  kind: query
  command: "CR_PFAIL03"
  params: []
- id: cr_pfail04
  label: Get Power Failure No.04
  kind: query
  command: "CR_PFAIL04"
  params: []
- id: cr_pfail05
  label: Get Power Failure No.05
  kind: query
  command: "CR_PFAIL05"
  params: []
- id: cr_pfail06
  label: Get Power Failure No.06
  kind: query
  command: "CR_PFAIL06"
  params: []
- id: cr_pfail07
  label: Get Power Failure No.07
  kind: query
  command: "CR_PFAIL07"
  params: []
- id: cr_pfail08
  label: Get Power Failure No.08
  kind: query
  command: "CR_PFAIL08"
  params: []
- id: cr_pfail09
  label: Get Power Failure No.09
  kind: query
  command: "CR_PFAIL09"
  params: []
- id: cr_pfail10
  label: Get Power Failure No.10
  kind: query
  command: "CR_PFAIL10"
  params: []
- id: cr_pfail11
  label: Get Power Failure No.11
  kind: query
  command: "CR_PFAIL11"
  params: []
- id: cr_pfail12
  label: Get Power Failure No.12
  kind: query
  command: "CR_PFAIL12"
  params: []
- id: cr_pfail13
  label: Get Power Failure No.13
  kind: query
  command: "CR_PFAIL13"
  params: []
- id: cr_pfail14
  label: Get Power Failure No.14
  kind: query
  command: "CR_PFAIL14"
  params: []
- id: cr_pfail15
  label: Get Power Failure No.15
  kind: query
  command: "CR_PFAIL15"
  params: []
- id: cr_pfail16
  label: Get Power Failure No.16
  kind: query
  command: "CR_PFAIL16"
  params: []
- id: cr_pfail17
  label: Get Power Failure No.17
  kind: query
  command: "CR_PFAIL17"
  params: []
- id: cr_pfail18
  label: Get Power Failure No.18
  kind: query
  command: "CR_PFAIL18"
  params: []
- id: cr_pfail19
  label: Get Power Failure No.19
  kind: query
  command: "CR_PFAIL19"
  params: []
- id: cr_pfail20
  label: Get Power Failure No.20
  kind: query
  command: "CR_PFAIL20"
  params: []
- id: cr_pfail21
  label: Get Power Failure No.21
  kind: query
  command: "CR_PFAIL21"
  params: []
- id: cr_pfail22
  label: Get Power Failure No.22
  kind: query
  command: "CR_PFAIL22"
  params: []
- id: cr_pfail23
  label: Get Power Failure No.23
  kind: query
  command: "CR_PFAIL23"
  params: []
- id: cr_pfail24
  label: Get Power Failure No.24
  kind: query
  command: "CR_PFAIL24"
  params: []
- id: cr_pfail25
  label: Get Power Failure No.25
  kind: query
  command: "CR_PFAIL25"
  params: []
- id: cr_pfail26
  label: Get Power Failure No.26
  kind: query
  command: "CR_PFAIL26"
  params: []
- id: cr_pfail27
  label: Get Power Failure No.27
  kind: query
  command: "CR_PFAIL27"
  params: []
- id: cr_pfail28
  label: Get Power Failure No.28
  kind: query
  command: "CR_PFAIL28"
  params: []
- id: cr_pfail29
  label: Get Power Failure No.29
  kind: query
  command: "CR_PFAIL29"
  params: []
- id: cr_pfail30
  label: Get Power Failure No.30
  kind: query
  command: "CR_PFAIL30"
  params: []
- id: cr_pfail31
  label: Get Power Failure No.31
  kind: query
  command: "CR_PFAIL31"
  params: []
- id: cr_pfail32
  label: Get Power Failure No.32
  kind: query
  command: "CR_PFAIL32"
  params: []
- id: cr_pfail33
  label: Get Power Failure No.33
  kind: query
  command: "CR_PFAIL33"
  params: []
- id: cr_pfail34
  label: Get Power Failure No.34
  kind: query
  command: "CR_PFAIL34"
  params: []
- id: cr_pfail35
  label: Get Power Failure No.35
  kind: query
  command: "CR_PFAIL35"
  params: []
- id: cr_pfail36
  label: Get Power Failure No.36
  kind: query
  command: "CR_PFAIL36"
  params: []
- id: cr_pfail37
  label: Get Power Failure No.37
  kind: query
  command: "CR_PFAIL37"
  params: []
- id: cr_pfail38
  label: Get Power Failure No.38
  kind: query
  command: "CR_PFAIL38"
  params: []
- id: cr_pfail39
  label: Get Power Failure No.39
  kind: query
  command: "CR_PFAIL39"
  params: []
- id: cr_pfail40
  label: Get Power Failure No.40
  kind: query
  command: "CR_PFAIL40"
  params: []
- id: cr_pfail41
  label: Get Power Failure No.41
  kind: query
  command: "CR_PFAIL41"
  params: []
- id: cr_pfail42
  label: Get Power Failure No.42
  kind: query
  command: "CR_PFAIL42"
  params: []
- id: cr_pfail43
  label: Get Power Failure No.43
  kind: query
  command: "CR_PFAIL43"
  params: []
- id: cr_pfail44
  label: Get Power Failure No.44
  kind: query
  command: "CR_PFAIL44"
  params: []
- id: cr_pfail45
  label: Get Power Failure No.45
  kind: query
  command: "CR_PFAIL45"
  params: []
- id: cr_pfail46
  label: Get Power Failure No.46
  kind: query
  command: "CR_PFAIL46"
  params: []
- id: cr_pfail47
  label: Get Power Failure No.47
  kind: query
  command: "CR_PFAIL47"
  params: []
- id: cr_pfail48
  label: Get Power Failure No.48
  kind: query
  command: "CR_PFAIL48"
  params: []
- id: cr_pfail49
  label: Get Power Failure No.49
  kind: query
  command: "CR_PFAIL49"
  params: []
- id: cr_pfail50
  label: Get Power Failure No.50
  kind: query
  command: "CR_PFAIL50"
  params: []
- id: cr_tempfail
  label: Get Temperature at Abnormal
  kind: query
  command: "CR_TEMPFAIL"
  params: []
- id: cr_temp
  label: Get Current Temperature
  kind: query
  command: "CR_TEMP"
  params: []
```

## Feedbacks
```yaml
# Response format from source: "000" [CR] acceptable, "nnn" [CR] error code, "?" [CR] undecodable.
# Status Read commands return "000_<data>" [CR]. See Actions CR_ entries for per-query values.
error_code:
  type: enum
  values: ["000", "101", "102", "103", "201", "301", "402", "?"]
  description: Standard response/error codes returned by projector
operating_status:
  type: enum
  values: ["00", "80", "40", "20", "10", "28", "88", "02", "24", "04", "21", "81"]
  description: From CR_STATUS (Power ON, Standby, Countdown, Cooling, Power Failure, etc.)
```

## Variables
```yaml
# Removed: settable parameters covered as parameterized Actions (CF_BRIGHT, CF_VOLUME, etc.).
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited event/notification stream. All responses are request-reply.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macros.
```

## Safety
```yaml
confirmation_required_for:
  - CF_FDEFAULT   # Factory reset (destructive)
  - CF_LAMPH RST  # Resets lamp hour counter
interlocks: []
# Power-up safety: source states "It takes about 5 seconds for internal initialization after plugging in AC power. During this time, it cannot process commands."
# Abnormal temperature triggers "Cooling Down" / disabled execution state.
```

## Notes
- RS-232C only — D-Sub 9 on PC, mini 8-pin on projector. Dedicated cable required (per source).
- Baud rate: 19200 initial; 9600 selectable via Service mode.
- Commands are ASCII, terminated by CR (0x0D). "_" in payloads = literal space.
- Pipelining: wait ≥100 ms after receiving return value before next command.
- Source uses "C00" / "C01" basic commands alongside CF_/CR_ — these are referenced (e.g. C00 Power ON in Standby) but their full payload table is not in this source. Treat as not implemented here.
- LV-NI02 attachment changes input count (3→4) and unlocks network input; commands returning "103" if LV-NI02 absent.
- Document title in source is "LV-7575" — this spec targets LV-7575 explicitly. Applicability to other LV-series models (LV-7290/7295/7390/7490/8225) is not stated in this source and is therefore UNRESOLVED. The recovery notes mention these models existed in older Canon manuals but use a different command spec.
- Source documents "Farmware Ver. 1.x" of LV-NI02 for LV-7575 — exact version range not enumerated.
<!-- UNRESOLVED: PJLink / Telnet / HTTP / Web operations may be available via LV-NI02 but not documented in this source. -->
```

Wrapped for ingest:

```json
{
  "markdown": "---\nentity_id: canon_lv_series\nspec_id: admin/canon-lv-7575\nrevision: 1\nauthor: admin\nmanufacturer: Canon\ntitle: Canon LV-7575 Control Spec\nstatus: draft\ncompatible_with:\n  models:\n    - LV-7575\n  firmware: \"\"  # UNRESOLVED: source says \"Farmware Ver. 1.x\"; exact range not enumerated\nderived_from:\n  - vendor_manual\ndeclared_confidence: low\nlicense: CC-BY-4.0\ncreated_at: 2026-08-10\n---\n\n# Canon LV-7575 Control Spec\n\n## Summary\nCanon LV-7575 projector. Expand Serial Command set over RS-232C (D-Sub 9 on PC, mini 8-pin on projector). CF_ (Functional Execution) and CR_ (Status Read) opcodes, ASCII with CR (0x0D) terminator. Source only covers RS-232C; LAN/network control via LV-NI02 attachment not documented here.\n\n<!-- UNRESOLVED: PJLink / Telnet / HTTP / Web controls not covered in this source. -->\n\n## Transport\n```yaml\nprotocols:\n  - serial\nserial:\n  baud_rate: 19200  # initial setting; 9600 also selectable\n  data_bits: 8\n  parity: none\n  stop_bits: 1\n  flow_control: none\nauth:\n  type: none  # inferred: no login procedure in source\n```\n\n## Traits\n```yaml\n- powerable       # inferred: CF_POWER_ON/OFF\n- routable        # inferred: CF_INPUT / CF_SOURCE / CF_INPUT1-4\n- queryable       # inferred: CR_ command family\n- levelable       # inferred: volume, brightness, contrast, etc.\n```\n\n## Actions\n```yaml\n# CRITICAL: enumerate every CF_ row from source. Each is one action.\n# Line terminator is CR (0x0D). \"_\" in source denotes a space character.\n\n# --- Image ---\n- id: cf_bright\n  label: Set Brightness\n  kind: action\n  command: \"CF_BRIGHT %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"000-063 direct, UP increment, DN decrement\"\n- id: cf_cont\n  label: Set Contrast\n  kind: action\n  command: \"CF_CONT %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"000-063 / UP / DN\"\n- id: cf_color\n  label: Set Color\n  kind: action\n  command: \"CF_COLOR %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"000-063 / UP / DN\"\n- id: cf_tint\n  label: Set Tint\n  kind: action\n  command: \"CF_TINT %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"000-063 / UP / DN\"\n- id: cf_sharp\n  label: Set Sharpness\n  kind: action\n  command: \"CF_SHARP %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"000-031 / UP / DN\"\n- id: cf_gamma\n  label: Set Gamma\n  kind: action\n  command: \"CF_GAMMA %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"000-015 / UP / DN\"\n- id: cf_wbal\n  label: Set White Balance\n  kind: action\n  command: \"CF_WBAL-%{channel} %{value}\"\n  params:\n    - name: channel\n      type: string\n      description: \"R / G / B\"\n    - name: value\n      type: string\n      description: \"000-063 / UP / DN\"\n- id: cf_coltemp\n  label: Set Color Temperature\n  kind: action\n  command: \"CF_COLTEMP %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"000 Xlow / 001 Low / 002 Mid / 003 High\"\n- id: cf_nzred\n  label: Set Noise Reduction\n  kind: action\n  command: \"CF_NZRED %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"OFF / L1 / L2 / UP / DN\"\n- id: cf_progv\n  label: Set Progressive Scan\n  kind: action\n  command: \"CF_PROGV %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ON / FILM / OFF / UP / DN\"\n- id: cf_image\n  label: Set Image Mode\n  kind: action\n  command: \"CF_IMAGE %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"STANDPC / STANDAV / REAL / CINEMA / CUSTOM1..CUSTOM10\"\n- id: cf_imageadj\n  label: Reset/Store Image Adjustment\n  kind: action\n  command: \"CF_IMAGEADJ %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"RST / STR1..STR10\"\n- id: cf_apctrl\n  label: Set Auto Picture Control\n  kind: action\n  command: \"CF_APCTRL %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"L1 / L2 / OFF / UP / DN\"\n- id: cf_colmnsav\n  label: Store Color Management\n  kind: action\n  command: \"CF_COLMNSAV %{area}\"\n  params:\n    - name: area\n      type: string\n      description: \"000-009\"\n- id: cf_colmnld\n  label: Load Color Management\n  kind: action\n  command: \"CF_COLMNLD %{area}\"\n  params:\n    - name: area\n      type: string\n      description: \"000-009\"\n\n# --- PC Adjust ---\n- id: cf_fsync\n  label: Set Fine Sync\n  kind: action\n  command: \"CF_FSYNC %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"0000-0031 / UP / DN\"\n- id: cf_tdots\n  label: Set Total Dots\n  kind: action\n  command: \"CF_TDOTS %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"mmmm-nnnn / UP / DN\"\n- id: cf_clpphase\n  label: Set Clamp Phase\n  kind: action\n  command: \"CF_CLPPHASE %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"0001-0225 / UP / DN\"\n- id: cf_clpwidth\n  label: Set Clamp Width\n  kind: action\n  command: \"CF_CLPWIDTH %{value}\"\n  params:\n    - name: value\n      type: string\n      description: value per source\n- id: cf_hpos\n  label: Set Horizontal Position\n  kind: action\n  command: \"CF_H-POS %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"0000-nnnn / UP / DN\"\n- id: cf_vpos\n  label: Set Vertical Position\n  kind: action\n  command: \"CF_V-POS %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"0000-nnnn / UP / DN\"\n- id: cf_ddots\n  label: Set Display Dots\n  kind: action\n  command: \"CF_DDOTS %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"0100-nnnn / UP / DN (even)\"\n- id: cf_dline\n  label: Set Display Line\n  kind: action\n  command: \"CF_DLINE %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"0100-nnnn / UP / DN\"\n- id: cf_setpcadj\n  label: Apply/Specify PC Adjust\n  kind: action\n  command: \"CF_SETPCADJ %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"None applies, or EXT11-60\"\n- id: cf_orgmode\n  label: Specify Original Signal (PC mode)\n  kind: action\n  command: \"CF_ORGMODE %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"VGA1..WXGA3 / 1080I60 / 1080I50 / 1035I / 720p60 / 720p50 / 575p / 480p / 575I / 480I / 1080psf/24-30\"\n- id: cf_pcstore\n  label: Store PC Adjust to Mode\n  kind: action\n  command: \"CF_PCSTORE %{mode}\"\n  params:\n    - name: mode\n      type: string\n      description: \"1..10\"\n- id: cf_pcmodefree\n  label: Free PC Adjust Mode\n  kind: action\n  command: \"CF_PCMODEFREE %{mode}\"\n  params:\n    - name: mode\n      type: string\n      description: \"1..10\"\n\n# --- Input ---\n- id: cf_input\n  label: Select Input\n  kind: action\n  command: \"CF_INPUT %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"1 / 2 / 3 / 4 / UP / DN\"\n- id: cf_source\n  label: Select Source of Current Input\n  kind: action\n  command: \"CF_SOURCE %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"DIGITAL / ANALOG / SCART / HDCP / VIDEO / YPBPR / S-VIDEO / NETWORK / UP / DN\"\n- id: cf_input1\n  label: Select Input 1 + Source\n  kind: action\n  command: \"CF_INPUT1 %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"DIGITAL / ANALOG / SCART / HDCP / OUT\"\n- id: cf_input2\n  label: Select Input 2 + Source\n  kind: action\n  command: \"CF_INPUT2 %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"VIDEO / YPBPR / ANALOG\"\n- id: cf_input3\n  label: Select Input 3 + Source\n  kind: action\n  command: \"CF_INPUT3 %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"VIDEO / S-VIDEO / YPBPR\"\n- id: cf_input4\n  label: Select Input 4 (Network)\n  kind: action\n  command: \"CF_INPUT4 %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"NETWORK\"\n- id: cf_system\n  label: Select System of Current Input\n  kind: action\n  command: \"CF_SYSTEM %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"VGA1..WXGA3 / 1080I..480I / D-XGA1..D-1080psf/30 / AUTO / NTSC..PAL-N\"\n\n# --- Screen ---\n- id: cf_screen\n  label: Select Screen Size\n  kind: action\n  command: \"CF_SCREEN %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"NORMAL / WIDE / TRUE / FULL / DZOOM_UP / DZOOM_DN / UP / DN\"\n- id: cf_dzcent\n  label: Cancel Digital Zoom\n  kind: action\n  command: \"CF_DZCENT CENT\"\n  params: []\n- id: cf_keystone\n  label: Set Keystone Correction\n  kind: action\n  command: \"CF_KEYSTONE %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"UP / FUP / DN / FDN / LEFT / FLFT / RIGHT / FRGT / RST\"\n- id: cf_kystnmode\n  label: Set Keystone Store Mode\n  kind: action\n  command: \"CF_KYSTNMODE %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"STR / RST\"\n- id: cf_anamorphic\n  label: Set Anamorphic\n  kind: action\n  command: \"CF_ANAMORPHIC %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ON / OFF\"\n\n# --- Lamp ---\n- id: cf_lamph\n  label: Reset Lamp Running Time\n  kind: action\n  command: \"CF_LAMPH RST\"\n  params: []\n- id: cf_lampmode\n  label: Select Lamp Mode\n  kind: action\n  command: \"CF_LAMPMODE %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"NORMAL / ECO / AUTO\"\n\n# --- Sound ---\n- id: cf_volume\n  label: Set Volume\n  kind: action\n  command: \"CF_VOLUME %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"000-063 / UP / DN\"\n- id: cf_mute\n  label: Set Sound Mute\n  kind: action\n  command: \"CF_MUTE %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ON / OFF\"\n- id: cf_bltinsp\n  label: Set Built-in Speaker\n  kind: action\n  command: \"CF_BLTINSP %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ON / OFF\"\n\n# --- Setting ---\n- id: cf_backgnd\n  label: Set Background Screen (No Signal)\n  kind: action\n  command: \"CF_BACKGND %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"BLUE / USER / BLACK / UP / DN\"\n- id: cf_disp\n  label: Set On Screen Display\n  kind: action\n  command: \"CF_DISP %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ON / CNTDWNOFF / OFF / UP / DN\"\n- id: cf_logo\n  label: Set Logo PIN + Mode\n  kind: action\n  command: \"CF_LOGO %{pin} %{mode}\"\n  params:\n    - name: pin\n      type: string\n      description: \"0000-9999 Logo PIN\"\n    - name: mode\n      type: string\n      description: \"OFF / DFLT / USER / UP / DN\"\n- id: cf_ceil\n  label: Set Ceiling Projection\n  kind: action\n  command: \"CF_CEIL %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ON / OFF\"\n- id: cf_rear\n  label: Set Rear Projection\n  kind: action\n  command: \"CF_REAR %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ON / OFF\"\n- id: cf_rcode\n  label: Select Remote Control Code\n  kind: action\n  command: \"CF_RCODE %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"001-008 / UP / DN\"\n- id: cf_lang\n  label: Select OSD Language\n  kind: action\n  command: \"CF_LANG %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ENG / DEU / FRA / ITA / ESP / POR / NED / SVE / JPN / CHI / KOR / RUS\"\n- id: cf_onsta\n  label: Set Power On Start\n  kind: action\n  command: \"CF_ON-STA %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ON / OFF / UP / DN\"\n- id: cf_pmane\n  label: Set Power Management\n  kind: action\n  command: \"CF_P-MANE %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"OFF / READY / SHUTDOWN / UP / DN\"\n- id: cf_pmanetime\n  label: Set Power Management Time\n  kind: action\n  command: \"CF_P-MANETIME %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"01-30 / UP / DN\"\n- id: cf_fanspeed\n  label: Set Fan Speed\n  kind: action\n  command: \"CF_FANSPEED %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"MAX / NOR\"\n- id: cf_keydis\n  label: Prohibit RC/KEY Control\n  kind: action\n  command: \"CF_KEYDIS %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"NONE / RC / KEY\"\n- id: cf_fdefault\n  label: Factory Default Reset\n  kind: action\n  command: \"CF_FDEFAULT RST\"\n  params: []\n- id: cf_pjpincode\n  label: Enter PJ PIN Code\n  kind: action\n  command: \"CF_PJPINCODE %{pin}\"\n  params:\n    - name: pin\n      type: string\n      description: \"0000-9999\"\n- id: cf_anamorphic_setting\n  label: Set Anamorphic (Setting table)\n  kind: action\n  command: \"CF_ANAMORPHIC %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ON / OFF\"\n\n# --- Other ---\n- id: cf_keyemu\n  label: RC/Key Emulation\n  kind: action\n  command: \"CF_KEYEMU %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"RIGHT / LEFT / UP / DN / SELECT / AUTOPC\"\n- id: cf_menu\n  label: Show/Hide OSD Menu\n  kind: action\n  command: \"CF_MENU %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ON / OFF\"\n- id: cf_power\n  label: Power On/Off\n  kind: action\n  command: \"CF_POWER %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ON / OFF\"\n- id: cf_freeze\n  label: Set Freeze\n  kind: action\n  command: \"CF_FREEZE %{value}\"\n  params:\n    - name: value\n      type: string\n      description: \"ON / OFF / UP / DN\"\n\n# --- Status Read (queries) ---\n- id: cr_bright\n  label: Get Brightness\n  kind: query\n  command: \"CR_BRIGHT\"\n  params: []\n- id: cr_cont\n  label: Get Contrast\n  kind: query\n  command: \"CR_CONT\"\n  params: []\n- id: cr_color\n  label: Get Color\n  kind: query\n  command: \"CR_COLOR\"\n  params: []\n- id: cr_tint\n  label: Get Tint\n  kind: query\n  command: \"CR_TINT\"\n  params: []\n- id: cr_sharp\n  label: Get Sharpness\n  kind: query\n  command: \"CR_SHARP\"\n  params: []\n- id: cr_gamma\n  label: Get Gamma\n  kind: query\n  command: \"CR_GAMMA\"\n  params: []\n- id: cr_wbalr\n  label: Get WB Red\n  kind: query\n  command: \"CR_WBAL-R\"\n  params: []\n- id: cr_wbalg\n  label: Get WB Green\n  kind: query\n  command: \"CR_WBAL-G\"\n  params: []\n- id: cr_wbalb\n  label: Get WB Blue\n  kind: query\n  command: \"CR_WBAL-B\"\n  params: []\n- id: cr_coltemp\n  label: Get Color Temperature\n  kind: query\n  command: \"CR_COLTEMP\"\n  params: []\n- id: cr_nzred\n  label: Get Noise Reduction\n  kind: query\n  command: \"CR_NZRED\"\n  params: []\n- id: cr_progv\n  label: Get Progressive Scan\n  kind: query\n  command: \"CR_PROGV\"\n  params: []\n- id: cr_image\n  label: Get Image Mode\n  kind: query\n  command: \"CR_IMAGE\"\n  params: []\n- id: cr_imggmd\n  label: Get Image Gamma\n  kind: query\n  command: \"CR_IMGGMD\"\n  params: []\n- id: cr_apctrl\n  label: Get Auto Picture Control\n  kind: query\n  command: \"CR_APCTRL\"\n  params: []\n- id: cr_fsync\n  label: Get Fine Sync\n  kind: query\n  command: \"CR_FSYNC\"\n  params: []\n- id: cr_tdots\n  label: Get Total Dots\n  kind: query\n  command: \"CR_TDOTS\"\n  params: []\n- id: cr_clpphase\n  label: Get Clamp Phase\n  kind: query\n  command: \"CR_CLPPHASE\"\n  params: []\n- id: cr_hpos\n  label: Get Horizontal Position\n  kind: query\n  command: \"CR_H-POS\"\n  params: []\n- id: cr_vpos\n  label: Get Vertical Position\n  kind: query\n  command: \"CR_V-POS\"\n  params: []\n- id: cr_ddots\n  label: Get Display Dots\n  kind: query\n  command: \"CR_DDOTS\"\n  params: []\n- id: cr_dline\n  label: Get Display Line\n  kind: query\n  command: \"CR_DLINE\"\n  params: []\n- id: cr_orgmode\n  label: Get Original Signal\n  kind: query\n  command: \"CR_ORGMODE\"\n  params: []\n- id: cr_pcstore\n  label: Get PC Store Status\n  kind: query\n  command: \"CR_PCSTORE\"\n  params: []\n- id: cr_setpcadj\n  label: Get Current PC Signal\n  kind: query\n  command: \"CR_SETPCADJ\"\n  params: []\n- id: cr_sersys\n  label: Get Current Video Signal\n  kind: query\n  command: \"CR_SERSYS\"\n  params: []\n- id: cr_input\n  label: Get Selected Input\n  kind: query\n  command: \"CR_INPUT\"\n  params: []\n- id: cr_source\n  label: Get Selected Source\n  kind: query\n  command: \"CR_SOURCE\"\n  params: []\n- id: cr_srcinp1\n  label: Get Source of Input 1\n  kind: query\n  command: \"CR_SRCINP1\"\n  params: []\n- id: cr_srcinp2\n  label: Get Source of Input 2\n  kind: query\n  command: \"CR_SRCINP2\"\n  params: []\n- id: cr_srcinp3\n  label: Get Source of Input 3\n  kind: query\n  command: \"CR_SRCINP3\"\n  params: []\n- id: cr_srcinp4\n  label: Get Source of Input 4\n  kind: query\n  command: \"CR_SRCINP4\"\n  params: []\n- id: cr_system\n  label: Get Selected System\n  kind: query\n  command: \"CR_SYSTEM\"\n  params: []\n- id: cr_syslist\n  label: Get Possible System List\n  kind: query\n  command: \"CR_SYSLIST\"\n  params: []\n- id: cr_modelist\n  label: Get Possible Mode List\n  kind: query\n  command: \"CR_MODELIST\"\n  params: []\n- id: cr_hmslot\n  label: Get Total Inputs\n  kind: query\n  command: \"CR_HMSLOT\"\n  params: []\n- id: cr_nmslot1\n  label: Get Terminal Info Input 1\n  kind: query\n  command: \"CR_NMSLOT1\"\n  params: []\n- id: cr_nmslot2\n  label: Get Terminal Info Input 2\n  kind: query\n  command: \"CR_NMSLOT2\"\n  params: []\n- id: cr_nmslot3\n  label: Get Terminal Info Input 3\n  kind: query\n  command: \"CR_NMSLOT3\"\n  params: []\n- id: cr_nmslot4\n  label: Get Terminal Info Input 4\n  kind: query\n  command: \"CR_NMSLOT4\"\n  params: []\n- id: cr_idslot1\n  label: Get ID Info Input 1\n  kind: query\n  command: \"CR_IDSLOT1\"\n  params: []\n- id: cr_idslot2\n  label: Get ID Info Input 2\n  kind: query\n  command: \"CR_IDSLOT2\"\n  params: []\n- id: cr_idslot3\n  label: Get ID Info Input 3\n  kind: query\n  command: \"CR_IDSLOT3\"\n  params: []\n- id: cr_idslot4\n  label: Get ID Info Input 4\n  kind: query\n  command: \"CR_IDSLOT4\"\n  params: []\n- id: cr_screen\n  label: Get Screen Size\n  kind: query\n  command: \"CR_SCREEN\"\n  params: []\n- id: cr_kystnmode\n  label: Get Keystone Store Mode\n  kind: query\n  command: \"CR_KYSTNMODE\"\n  params: []\n- id: cr_anamorphic\n  label: Get Anamorphic\n  kind: query\n  command: \"CR_ANAMORPHIC\"\n  params: []\n- id: cr_lamprepl\n  label: Get Lamp Replacement Time\n  kind: query\n  command: \"CR_LAMPREPL\"\n  params: []\n- id: cr_lamph\n  label: Get Lamp Running Time\n  kind: query\n  command: \"CR_LAMPH\"\n  params: []\n- id: cr_lampcorresph\n  label: Get Lamp Time Coefficient\n  kind: query\n  command: \"CR_LAMPCORRESPH\"\n  params: []\n- id: cr_lampmode\n  label: Get Lamp Mode\n  kind: query\n  command: \"CR_LAMPMODE\"\n  params: []\n- id: cr_lampsts\n  label: Get Lamp Status\n  kind: query\n  command: \"CR_LAMPSTS\"\n  params: []\n- id: cr_projh\n  label: Get Projector Total Hours\n  kind: query\n  command: \"CR_PROJH\"\n  params: []\n- id: cr_hmlamp\n  label: Get Total Lamp Number\n  kind: query\n  command: \"CR_HMLAMP\"\n  params: []\n- id: cr_volume\n  label: Get Volume\n  kind: query\n  command: \"CR_VOLUME\"\n  params: []\n- id: cr_mute\n  label: Get Sound Mute\n  kind: query\n  command: \"CR_MUTE\"\n  params: []\n- id: cr_bltinsp\n  label: Get Built-in Speaker\n  kind: query\n  command: \"CR_BLTINSP\"\n  params: []\n- id: cr_backgnd\n  label: Get Background Setting\n  kind: query\n  command: \"CR_BACKGND\"\n  params: []\n- id: cr_disp\n  label: Get OSD Display\n  kind: query\n  command: \"CR_DISP\"\n  params: []\n- id: cr_logo\n  label: Get Logo Setting\n  kind: query\n  command: \"CR_LOGO\"\n  params: []\n- id: cr_logolock\n  label: Get Logo Lock\n  kind: query\n  command: \"CR_LOGOLOCK\"\n  params: []\n- id: cr_ceil\n  label: Get Ceiling Setting\n  kind: query\n  command: \"CR_CEIL\"\n  params: []\n- id: cr_rear\n  label: Get Rear Setting\n  kind: query\n  command: \"CR_REAR\"\n  params: []\n- id: cr_rcode\n  label: Get Remote Control Code\n  kind: query\n  command: \"CR_RCODE\"\n  params: []\n- id: cr_rtype\n  label: Get Remote Control Type\n  kind: query\n  command: \"CR_RTYPE\"\n  params: []\n- id: cr_lang\n  label: Get OSD Language\n  kind: query\n  command: \"CR_LANG\"\n  params: []\n- id: cr_onsta\n  label: Get Power On Start\n  kind: query\n  command: \"CR_ON-STA\"\n  params: []\n- id: cr_pmane\n  label: Get Power Management\n  kind: query\n  command: \"CR_P-MANE\"\n  params: []\n- id: cr_pmanetime\n  label: Get Power Management Time\n  kind: query\n  command: \"CR_P-MAETIME\"\n  params: []\n- id: cr_fanspeed\n  label: Get Fan Speed\n  kind: query\n  command: \"CR_FANSPEED\"\n  params: []\n- id: cr_keydis\n  label: Get RC/KEY Status\n  kind: query\n  command: \"CR_KEYDIS\"\n  params: []\n- id: cr_security\n  label: Get Security\n  kind: query\n  command: \"CR_SECURITY\"\n  params: []\n- id: cr_pjlocknow\n  label: Get PIN Lock Status\n  kind: query\n  command: \"CR_PJLOCKNOW\"\n  params: []\n- id: cr_pjlockmenu\n  label: Get PIN Lock Menu Setting\n  kind: query\n  command: \"CR_PJLOCKMENU\"\n  params: []\n- id: cr_status\n  label: Get Projector Operating Status\n  kind: query\n  command: \"CR_STATUS\"\n  params: []\n- id: cr_pressure\n  label: Get Air Pressure\n  kind: query\n  command: \"CR_PRESSURE\"\n  params: []\n- id: cr_signal\n  label: Get Signal Presence\n  kind: query\n  command: \"CR_SIGNAL\"\n  params: []\n- id: cr_vmute\n  label: Get No Show\n  kind: query\n  command: \"CR_VMUTE\"\n  params: []\n- id: cr_freeze\n  label: Get Freeze\n  kind: query\n  command: \"CR_FREEZE\"\n  params: []\n- id: cr_allpfail\n  label: Get All Power Failure Info\n  kind: query\n  command: \"CR_ALLPFAIL\"\n  params: []\n- id: cr_hmpfail\n  label: Get Number of Detectable Power Failures\n  kind: query\n  command: \"CR_HMPFAIL\"\n  params: []\n- id: cr_pfail01\n  label: Get Power Failure No.01\n  kind: query\n  command: \"CR_PFAIL01\"\n  params: []\n- id: cr_pfail02\n  label: Get Power Failure No.02\n  kind: query\n  command: \"CR_PFAIL02\"\n  params: []\n- id: cr_pfail03\n  label: Get Power Failure No.03\n  kind: query\n  command: \"CR_PFAIL03\"\n  params: []\n- id: cr_pfail04\n  label: Get Power Failure No.04\n  kind: query\n  command: \"CR_PFAIL04\"\n  params: []\n- id: cr_pfail05\n  label: Get Power Failure No.05\n  kind: query\n  command: \"CR_PFAIL05\"\n  params: []\n- id: cr_pfail06\n  label: Get Power Failure No.06\n  kind: query\n  command: \"CR_PFAIL06\"\n  params: []\n- id: cr_pfail07\n  label: Get Power Failure No.07\n  kind: query\n  command: \"CR_PFAIL07\"\n  params: []\n- id: cr_pfail08\n  label: Get Power Failure No.08\n  kind: query\n  command: \"CR_PFAIL08\"\n  params: []\n- id: cr_pfail09\n  label: Get Power Failure No.09\n  kind: query\n  command: \"CR_PFAIL09\"\n  params: []\n- id: cr_pfail10\n  label: Get Power Failure No.10\n  kind: query\n  command: \"CR_PFAIL10\"\n  params: []\n- id: cr_pfail11\n  label: Get Power Failure No.11\n  kind: query\n  command: \"CR_PFAIL11\"\n  params: []\n- id: cr_pfail12\n  label: Get Power Failure No.12\n  kind: query\n  command: \"CR_PFAIL12\"\n  params: []\n- id: cr_pfail13\n  label: Get Power Failure No.13\n  kind: query\n  command: \"CR_PFAIL13\"\n  params: []\n- id: cr_pfail14\n  label: Get Power Failure No.14\n  kind: query\n  command: \"CR_PFAIL14\"\n  params: []\n- id: cr_pfail15\n  label: Get Power Failure No.15\n  kind: query\n  command: \"CR_PFAIL15\"\n  params: []\n- id: cr_pfail16\n  label: Get Power Failure No.16\n  kind: query\n  command: \"CR_PFAIL16\"\n  params: []\n- id: cr_pfail17\n  label: Get Power Failure No.17\n  kind: query\n  command: \"CR_PFAIL17\"\n  params: []\n- id: cr_pfail18\n  label: Get Power Failure No.18\n  kind: query\n  command: \"CR_PFAIL18\"\n  params: []\n- id: cr_pfail19\n  label: Get Power Failure No.19\n  kind: query\n  command: \"CR_PFAIL19\"\n  params: []\n- id: cr_pfail20\n  label: Get Power Failure No.20\n  kind: query\n  command: \"CR_PFAIL20\"\n  params: []\n- id: cr_pfail21\n  label: Get Power Failure No.21\n  kind: query\n  command: \"CR_PFAIL21\"\n  params: []\n- id: cr_pfail22\n  label: Get Power Failure No.22\n  kind: query\n  command: \"CR_PFAIL22\"\n  params: []\n- id: cr_pfail23\n  label: Get Power Failure No.23\n  kind: query\n  command: \"CR_PFAIL23\"\n  params: []\n- id: cr_pfail24\n  label: Get Power Failure No.24\n  kind: query\n  command: \"CR_PFAIL24\"\n  params: []\n- id: cr_pfail25\n  label: Get Power Failure No.25\n  kind: query\n  command: \"CR_PFAIL25\"\n  params: []\n- id: cr_pfail26\n  label: Get Power Failure No.26\n  kind: query\n  command: \"CR_PFAIL26\"\n  params: []\n- id: cr_pfail27\n  label: Get Power Failure No.27\n  kind: query\n  command: \"CR_PFAIL27\"\n  params: []\n- id: cr_pfail28\n  label: Get Power Failure No.28\n  kind: query\n  command: \"CR_PFAIL28\"\n  params: []\n- id: cr_pfail29\n  label: Get Power Failure No.29\n  kind: query\n  command: \"CR_PFAIL29\"\n  params: []\n- id: cr_pfail30\n  label: Get Power Failure No.30\n  kind: query\n  command: \"CR_PFAIL30\"\n  params: []\n- id: cr_pfail31\n  label: Get Power Failure No.31\n  kind: query\n  command: \"CR_PFAIL31\"\n  params: []\n- id: cr_pfail32\n  label: Get Power Failure No.32\n  kind: query\n  command: \"CR_PFAIL32\"\n  params: []\n- id: cr_pfail33\n  label: Get Power Failure No.33\n  kind: query\n  command: \"CR_PFAIL33\"\n  params: []\n- id: cr_pfail34\n  label: Get Power Failure No.34\n  kind: query\n  command: \"CR_PFAIL34\"\n  params: []\n- id: cr_pfail35\n  label: Get Power Failure No.35\n  kind: query\n  command: \"CR_PFAIL35\"\n  params: []\n- id: cr_pfail36\n  label: Get Power Failure No.36\n  kind: query\n  command: \"CR_PFAIL36\"\n  params: []\n- id: cr_pfail37\n  label: Get Power Failure No.37\n  kind: query\n  command: \"CR_PFAIL37\"\n  params: []\n- id: cr_pfail38\n  label: Get Power Failure No.38\n  kind: query\n  command: \"CR_PFAIL38\"\n  params: []\n- id: cr_pfail39\n  label: Get Power Failure No.39\n  kind: query\n  command: \"CR_PFAIL39\"\n  params: []\n- id: cr_pfail40\n  label: Get Power Failure No.40\n  kind: query\n  command: \"CR_PFAIL40\"\n  params: []\n- id: cr_pfail41\n  label: Get Power Failure No.41\n  kind: query\n  command: \"CR_PFAIL41\"\n  params: []\n- id: cr_pfail42\n  label: Get Power Failure No.42\n  kind: query\n  command: \"CR_PFAIL42\"\n  params: []\n- id: cr_pfail43\n  label: Get Power Failure No.43\n  kind: query\n  command: \"CR_PFAIL43\"\n  params: []\n- id: cr_pfail44\n  label: Get Power Failure No.44\n  kind: query\n  command: \"CR_PFAIL44\"\n  params: []\n- id: cr_pfail45\n  label: Get Power Failure No.45\n  kind: query\n  command: \"CR_PFAIL45\"\n  params: []\n- id: cr_pfail46\n  label: Get Power Failure No.46\n  kind: query\n  command: \"CR_PFAIL46\"\n  params: []\n- id: cr_pfail47\n  label: Get Power Failure No.47\n  kind: query\n  command: \"CR_PFAIL47\"\n  params: []\n- id: cr_pfail48\n  label: Get Power Failure No.48\n  kind: query\n  command: \"CR_PFAIL48\"\n  params: []\n- id: cr_pfail49\n  label: Get Power Failure No.49\n  kind: query\n  command: \"CR_PFAIL49\"\n  params: []\n- id: cr_pfail50\n  label: Get Power Failure No.50\n  kind: query\n  command: \"CR_PFAIL50\"\n  params: []\n- id: cr_tempfail\n  label: Get Temperature at Abnormal\n  kind: query\n  command: \"CR_TEMPFAIL\"\n  params: []\n- id: cr_temp\n  label: Get Current Temperature\n  kind: query\n  command: \"CR_TEMP\"\n  params: []\n```\n\n## Feedbacks\n```yaml\nerror_code:\n  type: enum\n  values: [\"000\", \"101\", \"102\", \"103\", \"201\", \"301\", \"402\", \"?\"]\n  description: Standard response/error codes returned by projector\noperating_status:\n  type: enum\n  values: [\"00\", \"80\", \"40\", \"20\", \"10\", \"28\", \"88\", \"02\", \"24\", \"04\", \"21\", \"81\"]\n  description: From CR_STATUS (Power ON, Standby, Countdown, Cooling, Power Failure, etc.)\n```\n\n## Variables\n```yaml\n# Removed: settable parameters covered as parameterized Actions (CF_BRIGHT, CF_VOLUME, etc.).\n```\n\n## Events\n```yaml\n# UNRESOLVED: source describes no unsolicited event/notification stream. All responses are request-reply.\n```\n\n## Macros\n```yaml\n# UNRESOLVED: source does not describe multi-step macros.\n```\n\n## Safety\n```yaml\nconfirmation_required_for:\n  - CF_FDEFAULT\n  - CF_LAMPH RST\ninterlocks: []\n# Power-up safety: ~5s internal initialization after AC power; commands ignored during that window.\n# Abnormal temperature triggers Cooling Down / disabled execution state.\n```\n\n## Notes\n- RS-232C only — D-Sub 9 on PC, mini 8-pin on projector. Dedicated cable required.\n- Baud rate: 19200 initial; 9600 selectable via Service mode.\n- Commands ASCII, terminated by CR (0x0D). \"_\" in payloads = literal space.\n- Pipelining: wait ≥100 ms after receiving return value before next command.\n- \"C00\"/\"C01\" basic commands referenced (e.g. C00 Power ON in Standby) but full payload table not in this source.\n- LV-NI02 attachment changes input count (3→4) and unlocks network input; commands returning \"103\" if LV-NI02 absent.\n- Source title is \"LV-7575\" — spec targets LV-7575 explicitly. Applicability to other LV-series models (LV-7290/7295/7390/7490/8225) is UNRESOLVED; older recovery notes reference distinct command spec for those.\n- Source: \"Farmware Ver. 1.x\" of LV-NI02 for LV-7575 — exact version range not enumerated.\n<!-- UNRESOLVED: PJLink / Telnet / HTTP / Web operations may exist via LV-NI02 but not documented here. -->\n",
}

## Provenance

```yaml
source_domains:
  - downloads.canon.com
  - manualslib.com
source_urls:
  - https://downloads.canon.com/cpr/software/projectors/LV-7575_ext_com.pdf
  - https://www.manualslib.com/manual/221112/Canon-Lv-7290.html
  - https://www.manualslib.com/manual/574489/Canon-Lv-7292a.html
  - https://www.manualslib.com/manual/422163/Canon-Lv-7392a.html
  - https://downloads.canon.com/cpr/software/projectors/LV-7575.pdf
retrieved_at: 2026-08-10T19:43:09.954Z
last_checked_at: 2026-08-19T09:05:18.467Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:05:18.467Z
matched_actions: 196
action_count: 196
confidence: medium
summary: "All 196 spec wire-literal commands appear in source command tables; only CR_CLPWIDTH query is unrepresented (extra_in_source ≤ 5, ratio ~0.99). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- CR_CLPWIDTH
- "PJLink / Telnet / HTTP / Web controls not covered in this source. Network control via LV-NI02 may add capability."
- "source describes no unsolicited event/notification stream. All responses are request-reply."
- "source does not describe multi-step macros."
- "PJLink / Telnet / HTTP / Web operations may be available via LV-NI02 but not documented in this source."
- "source says \\\"Farmware Ver. 1.x\\\"; exact range not enumerated\\nderived_from:\\n  - vendor_manual\\ndeclared_confidence: low\\nlicense: CC-BY-4.0\\ncreated_at: 2026-08-10\\n---\\n\\n# Canon LV-7575 Control Spec\\n\\n## Summary\\nCanon LV-7575 projector. Expand Serial Command set over RS-232C (D-Sub 9 on PC, mini 8-pin on projector). CF_ (Functional Execution) and CR_ (Status Read) opcodes, ASCII with CR (0x0D) terminator. Source only covers RS-232C; LAN/network control via LV-NI02 attachment not documented here.\\n\\n<!-- UNRESOLVED: PJLink / Telnet / HTTP / Web controls not covered in this source. -->\\n\\n## Transport\\n```yaml\\nprotocols:\\n  - serial\\nserial:\\n  baud_rate: 19200"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
