---
spec_id: admin/projectiondesign-f32-sx-plus-north_america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Projectiondesign F32 sx+ Control Spec"
manufacturer: Projectiondesign
model_family: "F32 sx+ (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Projectiondesign
  models:
    - "F32 sx+ (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
  - manualslib.com
  - applicationmarket.crestron.com
source_urls:
  - "https://web.archive.org/web/20131222040438/http://www.projectiondesign.com/products/f32-series/_attachment/1663?_ts=13e30ff66f4&download=true"
  - "https://www.manualslib.com/manual/2456229/Projectiondesign-F32-SxPlus.html?page=46"
  - https://applicationmarket.crestron.com/content/Help/ProjectionDesign/projectiondesign_f32_sx_serial_v1_0_help.pdf
  - "https://www.manualslib.com/manual/1133778/Projectiondesign-F32.html?page=46"
retrieved_at: 2026-08-18T12:44:23.806Z
last_checked_at: 2026-08-19T09:40:26.970Z
generated_at: 2026-08-19T09:40:26.970Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "F32 sx+ platform generation (GP1/GP2/GP3/GP4) not stated in source — per-command applicability to F32 sx+ is unresolved. Referenced value tables (POST, IABS, SABS, GABS, BCCR, BCMO, BCPR, PRES, DSCR, CMTG, ORIE, OSDC, SMOD, AMOD, EDIR, EDIT, PSTO, PRER, LEST, LMOD) are not included in the source."
  - "POST value table not in source"
  - "value semantics not stated in source"
  - "LEST value table not in source"
  - "value ranges for most level-type commands (BRIG, CNTR, CSAT, VHUE, SHRP,"
  - "no unsolicited notifications documented in source. Some commands generate"
  - "no multi-step sequences described explicitly in source."
  - "no other safety warnings or interlock procedures in source."
  - "firmware version compatibility not stated in source"
  - "F32 sx+ platform generation (GP1-GP4) not stated; per-command applicability unknown"
  - "value tables referenced but absent from source"
  - "UDP control behavior only implied by \"TCP/UDP port\" label; LAN control framing identical to RS-232 assumed from \"connected to either RS232 or LAN ... through this ASCII based protocol\""
verification:
  verdict: verified
  checked_at: 2026-08-19T09:40:26.970Z
  matched_actions: 270
  action_count: 270
  confidence: medium
  summary: "All 270 spec mnemonics appear verbatim in the source ASCII command table; transport values (port 1025, baud 19200, 8N1, no flow control) all supported. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# Projectiondesign F32 sx+ Control Spec

## Summary
DLP projector controllable over RS-232 and LAN (TCP/UDP port 1025) using an ASCII-framed protocol (`:` header, 4-byte mnemonic, optional modifier/value, CR terminator). This spec covers transport setup, the command frame format, and all documented ASCII commands. A browser-based configuration web page (default login admin/admin) is used for IP setup.

<!-- UNRESOLVED: F32 sx+ platform generation (GP1/GP2/GP3/GP4) not stated in source — per-command applicability to F32 sx+ is unresolved. Referenced value tables (POST, IABS, SABS, GABS, BCCR, BCMO, BCPR, PRES, DSCR, CMTG, ORIE, OSDC, SMOD, AMOD, EDIR, EDIT, PSTO, PRER, LEST, LMOD) are not included in the source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp  # inferred: source labels the control port "TCP/UDP port" 1025; UDP usage not further described
serial:
  baud_rate: 19200  # default; configurable 4800/9600/19200 from projector menu
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 1025  # default TCP/UDP port; DHCP on by default
auth:
  type: none  # inferred: no login procedure described for the ASCII control protocol; source hints at access levels (ACSS command, error !00001). Web config page login: admin/admin - see Notes
```

## Traits
```yaml
# - powerable: POWR power on/off command present
# - queryable: '?' modifier and Get-only commands (POST, ISTS, THRM, ...) present
# - levelable: BRIG, CNTR, SHRP, VKEY, etc. with relative modifier R
# - routable: source-select commands (IVGA, IDVI, IHDM, ...)
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# Frame format (all commands): ':' HEADER + optional 1-3 byte ADDRESS + 4-byte MNEMONIC
# + optional MODIFIER/VALUE/TARGET + CR (0x0D). Single optional SPACE between fields.
# Mnemonics are not case sensitive. Values max 6 bytes, targets max 4 bytes.
#
# Modifiers: R = relative change (e.g. :BRIG R10 = +10 steps); A = request acknowledge;
# ? = get current value; ?M = max; ?N = min; ?D = default; ?S = default step.
# All commands listed as "Get, Set" support the query forms via these modifiers.
# Acknowledge is ON by default; toggle with ECHO. {value} placeholders: the source
# documents value semantics only where noted; otherwise value semantics are
# UNRESOLVED (not stated in source).
#
# NOTE: source command table lists several mnemonics twice with conflicting
# descriptions (SABS, S1T1, S169, SS43, SFLA, SFAR, SLET, SLST, SANL and
# LDMM, LPW1, DBDI, LDCR, LDCG, LDCB) - deduplicated here, first occurrence kept.

# ---- Power ----
- id: powr
  label: "Power"
  kind: action
  command: ":POWR{value}"
  notes: "Ops: Get, Set. 0 - power off, 1 - power on"
- id: post
  label: "Power State"
  kind: query
  command: ":POST?"
  notes: "Ops: Get. See value table POST (table not in source)"

# ---- Source selection ----
- id: iabs
  label: "Set Source Abs Values"
  kind: action
  command: ":IABS{value}"
  notes: "Ops: Get, Set. See value table IABS (table not in source)"
- id: ivga
  label: "Select VGA"
  kind: action
  command: ":IVGA{value}"
  notes: "Ops: Get, Set"
- id: isvi
  label: "Select S-Video"
  kind: action
  command: ":ISVI{value}"
  notes: "Ops: Get, Set"
- id: idvi
  label: "Select DVI"
  kind: action
  command: ":IDVI{value}"
  notes: "Ops: Get, Set"
- id: icvi
  label: "Select Composite Video"
  kind: action
  command: ":ICVI{value}"
  notes: "Ops: Get, Set"
- id: iypp
  label: "Select Component YPbPr"
  kind: action
  command: ":IYPP{value}"
  notes: "Ops: Get, Set"
- id: irgs
  label: "Select RGB Video"
  kind: action
  command: ":IRGS{value}"
  notes: "Ops: Get, Set"
- id: ihdm
  label: "Select HDMI"
  kind: action
  command: ":IHDM{value}"
  notes: "Ops: Get, Set"
- id: ibnc
  label: "Select BNC"
  kind: action
  command: ":IBNC{value}"
  notes: "Ops: Get, Set. Platforms: GP3, GP4"
- id: ixp2
  label: "Select Source XP2"
  kind: query
  command: ":IXP2?"
  notes: "Ops: Get. Platforms: GP3, GP4"
- id: ists
  label: "Signal Status"
  kind: query
  command: ":ISTS?"
  notes: "Ops: Get. 0 - searching, 1 - locked to source"

# ---- Picture ----
- id: brig
  label: "Brightness"
  kind: action
  command: ":BRIG{value}"
  notes: "Ops: Get, Set. Relative modifier supported (source example :BRIG R10)"
- id: cntr
  label: "Contrast"
  kind: action
  command: ":CNTR{value}"
  notes: "Ops: Get, Set. Source examples: :CNTR R1 increment, :CNTR R-2 decrement 2 steps"
- id: csat
  label: "Color"
  kind: action
  command: ":CSAT{value}"
  notes: "Ops: Get, Set"
- id: vhue
  label: "Hue Video"
  kind: action
  command: ":VHUE{value}"
  notes: "Ops: Get, Set"
- id: shrp
  label: "Sharpness"
  kind: action
  command: ":SHRP{value}"
  notes: "Ops: Get, Set"
- id: prst
  label: "Picture Reset"
  kind: action
  command: ":PRST{value}"
  notes: "Ops: Get, Set"
- id: auto
  label: "Auto"
  kind: action
  command: ":AUTO"
  notes: "Ops: Set"
- id: pmut
  label: "Picture Mute"
  kind: action
  command: ":PMUT{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable"
- id: frze
  label: "Freeze Image"
  kind: action
  command: ":FRZE{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable"
- id: sabs
  label: "Set Scaling Abs Value"
  kind: action
  command: ":SABS{value}"
  notes: "Ops: Get, Set. See value table SABS (table not in source). Duplicate source row also labels SABS 'Select Gamma Film' - probable table corruption"
- id: s1t1
  label: "Select Scaling 1:1"
  kind: action
  command: ":S1T1{value}"
  notes: "Ops: Get, Set. Duplicate source row also labels S1T1 'Select Gamma Video'"
- id: s169
  label: "Select Scaling 16:9"
  kind: action
  command: ":S169{value}"
  notes: "Ops: Get, Set. Duplicate source row also labels S169 'Select Gamma Computer'"
- id: ss43
  label: "Select Scaling 4:3"
  kind: action
  command: ":SS43{value}"
  notes: "Ops: Get, Set. Duplicate source row also labels SS43 'Set Gamma abs value' (see value table GABS)"
- id: sfla
  label: "Select Scaling FillAll"
  kind: action
  command: ":SFLA{value}"
  notes: "Ops: Get, Set. Duplicate source row also labels SFLA 'BrilliantColor Control'"
- id: sfar
  label: "Select Scaling FillAspectRatio"
  kind: action
  command: ":SFAR{value}"
  notes: "Ops: Get, Set. Duplicate source row also labels SFAR 'BrilliantColor Control'"
- id: slet
  label: "Select Scaling Letterbox to 16:9"
  kind: action
  command: ":SLET{value}"
  notes: "Ops: Get, Set. Duplicate source row also labels SLET 'BrilliantColor Control'"
- id: slst
  label: "Select Scaling Letterbox St to 16:9"
  kind: action
  command: ":SLST{value}"
  notes: "Ops: Get, Set. Duplicate source row also labels SLST 'BrilliantColor Mode'"
- id: sanl
  label: "Scale Anamorphic"
  kind: action
  command: ":SANL{value}"
  notes: "Ops: Get, Set. Platforms: GP1 1080, GP2 1080, GP3 1080, GP4 1080. 1 - flm 1, 2 - flm 2. Duplicate source row also labels SANL 'BrilliantColor Look'"
- id: gafi
  label: "Select Gamma Film"
  kind: action
  command: ":GAFI{value}"
  notes: "Ops: Get, Set. 1 - Film 1, 2 - Film 2"
- id: gavi
  label: "Select Gamma Video"
  kind: action
  command: ":GAVI{value}"
  notes: "Ops: Get, Set. 1 - Video 1, 2 - Video 2"
- id: gaco
  label: "Select Gamma Computer"
  kind: action
  command: ":GACO{value}"
  notes: "Ops: Get, Set. 1 - Computer 1, 2 - Computer 2"
- id: gabs
  label: "Set Gamma Abs Value"
  kind: action
  command: ":GABS{value}"
  notes: "Ops: Get, Set. See value table GABS (table not in source)"
- id: bccr
  label: "BrilliantColor Control"
  kind: action
  command: ":BCCR{value}"
  notes: "Ops: Get, Set. See value table BCCR (table not in source). Platforms: GP1, GP2, GP3"
- id: bcmo
  label: "BrilliantColor Mode"
  kind: action
  command: ":BCMO{value}"
  notes: "Ops: Get, Set. See value table BCMO (table not in source). Platforms: GP1, GP2, GP3"
- id: bcpr
  label: "BrilliantColor Look"
  kind: action
  command: ":BCPR{value}"
  notes: "Ops: Get, Set. See value table BCPR (table not in source). Platforms: GP1, GP2, GP3"
- id: pres
  label: "BrilliantColor Preset Settings"
  kind: action
  command: ":PRES{value}"
  notes: "Ops: Get, Set. See value table PRES (table not in source). Platforms: GP1"
- id: wpek
  label: "BrilliantColor Boost"
  kind: action
  command: ":WPEK{value}"
  notes: "Ops: Get, Set. Platforms: GP1, GP2, GP3"
- id: cmxv
  label: "Color Management X-Coordinate"
  kind: action
  command: ":CMXV{value}"
  notes: "Ops: Get, Set"
- id: cmyv
  label: "Color Management Y-Coordinate"
  kind: action
  command: ":CMYV{value}"
  notes: "Ops: Get, Set"
- id: cmtv
  label: "Color Management Temperature"
  kind: action
  command: ":CMTV{value}"
  notes: "Ops: Get, Set. Range 3200 - 9300"
- id: cmna
  label: "Color Management Mode Not Corrected"
  kind: action
  command: ":CMNA{value}"
  notes: "Ops: Get, Set"
- id: cmte
  label: "Color Management Mode Color Temperature"
  kind: action
  command: ":CMTE{value}"
  notes: "Ops: Get, Set"
- id: ccxy
  label: "Color Management Mode Custom Coordinates"
  kind: action
  command: ":CCXY{value}"
  notes: "Ops: Get, Set"
- id: cmhs
  label: "Color Management Mode HSG"
  kind: action
  command: ":CMHS{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmpr
  label: "Color Management Mode Presets"
  kind: action
  command: ":CMPR{value}"
  notes: "Ops: not stated in source. Platforms: GP1"
- id: rd65
  label: "Reset to D65"
  kind: action
  command: ":RD65"
  notes: "Ops: Set"
- id: dscr
  label: "Desired Coords Mode"
  kind: action
  command: ":DSCR{value}"
  notes: "Ops: Get, Set. See value table DSCR (table not in source)"
- id: baga
  label: "Balance Gains Enable"
  kind: action
  command: ":BAGA{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable. Platforms: GP1, GP2, GP3"
- id: dsrx
  label: "Desired Red X"
  kind: action
  command: ":DSRX{value}"
  notes: "Ops: Get, Set"
- id: dsry
  label: "Desired Red Y"
  kind: action
  command: ":DSRY{value}"
  notes: "Ops: Get, Set"
- id: dsrg
  label: "Desired Red Gain"
  kind: action
  command: ":DSRG{value}"
  notes: "Ops: Get, Set"
- id: dsgx
  label: "Desired Green X"
  kind: action
  command: ":DSGX{value}"
  notes: "Ops: Get, Set"
- id: dsgy
  label: "Desired Green Y"
  kind: action
  command: ":DSGY{value}"
  notes: "Ops: Get, Set"
- id: dsgg
  label: "Desired Green Gain"
  kind: action
  command: ":DSGG{value}"
  notes: "Ops: Get, Set"
- id: dsbx
  label: "Desired Blue X"
  kind: action
  command: ":DSBX{value}"
  notes: "Ops: Get, Set"
- id: dsby
  label: "Desired Blue Y"
  kind: action
  command: ":DSBY{value}"
  notes: "Ops: Get, Set"
- id: dsbg
  label: "Desired Blue Gain"
  kind: action
  command: ":DSBG{value}"
  notes: "Ops: Get, Set"
- id: dscx
  label: "Desired Cyan X"
  kind: action
  command: ":DSCX{value}"
  notes: "Ops: Get, Set"
- id: dscy
  label: "Desired Cyan Y"
  kind: action
  command: ":DSCY{value}"
  notes: "Ops: Get, Set"
- id: dscg
  label: "Desired Cyan Gain"
  kind: action
  command: ":DSCG{value}"
  notes: "Ops: Get, Set"
- id: dsmx
  label: "Desired Magenta X"
  kind: action
  command: ":DSMX{value}"
  notes: "Ops: Get, Set"
- id: dsmy
  label: "Desired Magenta Y"
  kind: action
  command: ":DSMY{value}"
  notes: "Ops: Get, Set"
- id: dsmg
  label: "Desired Magenta Gain"
  kind: action
  command: ":DSMG{value}"
  notes: "Ops: Get, Set"
- id: dsyx
  label: "Desired Yellow X"
  kind: action
  command: ":DSYX{value}"
  notes: "Ops: Get, Set"
- id: dsyy
  label: "Desired Yellow Y"
  kind: action
  command: ":DSYY{value}"
  notes: "Ops: Get, Set"
- id: dsyg
  label: "Desired Yellow Gain"
  kind: action
  command: ":DSYG{value}"
  notes: "Ops: Get, Set"
- id: dswg
  label: "Desired White Gain"
  kind: action
  command: ":DSWG{value}"
  notes: "Ops: Get, Set"
- id: msrx
  label: "Measured Red X"
  kind: action
  command: ":MSRX{value}"
  notes: "Ops: Get, Set"
- id: msry
  label: "Measured Red Y"
  kind: action
  command: ":MSRY{value}"
  notes: "Ops: Get, Set"
- id: msrl
  label: "Measured Red Luminance"
  kind: action
  command: ":MSRL{value}"
  notes: "Ops: Get, Set"
- id: msgx
  label: "Measured Green X"
  kind: action
  command: ":MSGX{value}"
  notes: "Ops: Get, Set"
- id: msgy
  label: "Measured Green Y"
  kind: action
  command: ":MSGY{value}"
  notes: "Ops: Get, Set"
- id: msgl
  label: "Measured Green Luminance"
  kind: action
  command: ":MSGL{value}"
  notes: "Ops: Get, Set"
- id: msbx
  label: "Measured Blue X"
  kind: action
  command: ":MSBX{value}"
  notes: "Ops: Get, Set"
- id: msby
  label: "Measured Blue Y"
  kind: action
  command: ":MSBY{value}"
  notes: "Ops: Get, Set"
- id: msbl
  label: "Measured Blue Luminance"
  kind: action
  command: ":MSBL{value}"
  notes: "Ops: Get, Set"
- id: mswx
  label: "Measure White X"
  kind: action
  command: ":MSWX{value}"
  notes: "Ops: Get, Set"
- id: mswy
  label: "Measure White Y"
  kind: action
  command: ":MSWY{value}"
  notes: "Ops: Get, Set"
- id: mswl
  label: "Measure White Luminance"
  kind: action
  command: ":MSWL{value}"
  notes: "Ops: Get, Set"
- id: cmhr
  label: "ColorManagement Hue Red"
  kind: action
  command: ":CMHR{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmhg
  label: "ColorManagement Hue Green"
  kind: action
  command: ":CMHG{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmhb
  label: "ColorManagement Hue Blue"
  kind: action
  command: ":CMHB{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmhc
  label: "ColorManagement Hue Cyan"
  kind: action
  command: ":CMHC{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmhm
  label: "ColorManagement Hue Magenta"
  kind: action
  command: ":CMHM{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmhy
  label: "ColorManagement Hue Yellow"
  kind: action
  command: ":CMHY{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmsr
  label: "ColorManagement Saturation Red"
  kind: action
  command: ":CMSR{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmsg
  label: "ColorManagement Saturation Green"
  kind: action
  command: ":CMSG{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmsb
  label: "ColorManagement Saturation Blue"
  kind: action
  command: ":CMSB{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmsc
  label: "ColorManagement Saturation Cyan"
  kind: action
  command: ":CMSC{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmsm
  label: "ColorManagement Saturation Magenta"
  kind: action
  command: ":CMSM{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmsy
  label: "ColorManagement Saturation Yellow"
  kind: action
  command: ":CMSY{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmgr
  label: "ColorManagement Gain Red"
  kind: action
  command: ":CMGR{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmgg
  label: "ColorManagement Gain Green"
  kind: action
  command: ":CMGG{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmgb
  label: "ColorManagement Gain Blue"
  kind: action
  command: ":CMGB{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmgc
  label: "ColorManagement Gain Cyan"
  kind: action
  command: ":CMGC{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmgm
  label: "ColorManagement Gain Magenta"
  kind: action
  command: ":CMGM{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmgy
  label: "ColorManagement Gain Yellow"
  kind: action
  command: ":CMGY{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmwr
  label: "ColorManagement White Balance Red"
  kind: action
  command: ":CMWR{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmwg
  label: "ColorManagement White Balance Green"
  kind: action
  command: ":CMWG{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmwb
  label: "ColorManagement White Balance Blue"
  kind: action
  command: ":CMWB{value}"
  notes: "Ops: Get, Set. Platforms: GP1"
- id: cmtp
  label: "Color Management Test Patterns"
  kind: action
  command: ":CMTP{value}"
  notes: "Ops: Get, Set"
- id: cmtg
  label: "PW Test Patterns"
  kind: action
  command: ":CMTG{value}"
  notes: "Ops: Get, Set. See value table CMTG (table not in source)"

# ---- Picture->RealColor->Display Customization ----
- id: bred
  label: "Red Offset"
  kind: action
  command: ":BRED{value}"
  notes: "Ops: Get, Set. Platforms: GP1, GP2, GP3, GP1_AS3D"
- id: bgre
  label: "Green Offset"
  kind: action
  command: ":BGRE{value}"
  notes: "Ops: Get, Set. Platforms: GP1, GP2, GP3, GP1_AS3D"
- id: bblu
  label: "Blue Offset"
  kind: action
  command: ":BBLU{value}"
  notes: "Ops: Get, Set. Platforms: GP1, GP2, GP3, GP1_AS3D"
- id: cred
  label: "Red Gain"
  kind: action
  command: ":CRED{value}"
  notes: "Ops: Get, Set. Platforms: GP1, GP2, GP3, GP1_AS3D"
- id: cgre
  label: "Green Gain"
  kind: action
  command: ":CGRE{value}"
  notes: "Ops: Get, Set. Platforms: GP1, GP2, GP3, GP1_AS3D"
- id: cblu
  label: "Blue Gain"
  kind: action
  command: ":CBLU{value}"
  notes: "Ops: Get, Set. Platforms: GP1, GP2, GP3, GP1_AS3D"

# ---- Picture->Advanced ----
- id: vpos
  label: "Vertical Position"
  kind: action
  command: ":VPOS{value}"
  notes: "Ops: Get, Set. Platforms: GP1, GP2, GP3, GP1_AS3D"
- id: hpos
  label: "Horizontal Position"
  kind: action
  command: ":HPOS{value}"
  notes: "Ops: Get, Set"
- id: phse
  label: "Phase"
  kind: action
  command: ":PHSE{value}"
  notes: "Ops: Get, Set"
- id: freq
  label: "Frequency"
  kind: action
  command: ":FREQ{value}"
  notes: "Ops: Get, Set"
- id: nire
  label: "IRE Setup"
  kind: action
  command: ":NIRE{value}"
  notes: "Ops: Get, Set"
- id: dlsp
  label: "Digital Level and Colorspace"
  kind: action
  command: ":DLSP{value}"
  notes: "Ops: Get, Set. 0 - manual, 1 - auto"
- id: dvst
  label: "Digital Level"
  kind: action
  command: ":DVST{value}"
  notes: "Ops: Get, Set. 0 - computer, 1 - video"
- id: dcsp
  label: "Digital Colorspace"
  kind: action
  command: ":DCSP{value}"
  notes: "Ops: Get, Set"

# ---- Picture->Enhancements ----
- id: dlti
  label: "DLTI Level"
  kind: action
  command: ":DLTI{value}"
  notes: "Ops: Get, Set"
- id: dcti
  label: "DCTI Level"
  kind: action
  command: ":DCTI{value}"
  notes: "Ops: Get, Set"
- id: cb3d
  label: "3D Comb Filter"
  kind: action
  command: ":CB3D{value}"
  notes: "Ops: Get, Set"
- id: pk2d
  label: "2D Peaking"
  kind: action
  command: ":PK2D{value}"
  notes: "Ops: Get, Set"
- id: anoi
  label: "Adaptive Noise Reduction"
  kind: action
  command: ":ANOI{value}"
  notes: "Ops: Get, Set"
- id: cehr
  label: "CEH Red"
  kind: action
  command: ":CEHR{value}"
  notes: "Ops: Get, Set"
- id: cehb
  label: "CEH Blue"
  kind: action
  command: ":CEHB{value}"
  notes: "Ops: Get, Set"
- id: cehg
  label: "CEH Green"
  kind: action
  command: ":CEHG{value}"
  notes: "Ops: Get, Set"
- id: cehy
  label: "CEH Yellow"
  kind: action
  command: ":CEHY{value}"
  notes: "Ops: Get, Set"
- id: cehf
  label: "CEH Fleshtone"
  kind: action
  command: ":CEHF{value}"
  notes: "Ops: Get, Set"
- id: dync
  label: "Dynamic Contrast Enable"
  kind: action
  command: ":DYNC{value}"
  notes: "Ops: Get, Set"
- id: dynl
  label: "Dynamic Contrast Level"
  kind: action
  command: ":DYNL{value}"
  notes: "Ops: Get, Set"
- id: hdbl
  label: "Horizontal Deblocking"
  kind: action
  command: ":HDBL{value}"
  notes: "Ops: Get, Set"

# ---- Picture->Dynamic Black ----
- id: dben
  label: "Dynamic Black"
  kind: action
  command: ":DBEN{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable. Platforms: GP4, GP3 LED"

# ---- Installation ----
- id: desk
  label: "Select Orientation Desktop Front"
  kind: action
  command: ":DESK{value}"
  notes: "Ops: Get, Set"
- id: ceil
  label: "Select Orientation Ceiling Front"
  kind: action
  command: ":CEIL{value}"
  notes: "Ops: Get, Set"
- id: rdes
  label: "Select Orientation Desktop Rear"
  kind: action
  command: ":RDES{value}"
  notes: "Ops: Get, Set"
- id: rcei
  label: "Select Orientation Ceiling Rear"
  kind: action
  command: ":RCEI{value}"
  notes: "Ops: Get, Set"
- id: orie
  label: "Select Orientation Abs Value"
  kind: action
  command: ":ORIE{value}"
  notes: "Ops: Get, Set. See value table ORIE (table not in source)"
- id: scan
  label: "Source Scan"
  kind: action
  command: ":SCAN{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable"
- id: vrgb
  label: "RGB Video"
  kind: action
  command: ":VRGB{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable"
- id: bncr
  label: "BNC Colorspace RGB"
  kind: action
  command: ":BNCR{value}"
  notes: "Ops: Get, Set. Platforms: GP3, GP4"
- id: bncc
  label: "BNC Colorspace YPbPr"
  kind: action
  command: ":BNCC{value}"
  notes: "Ops: Get, Set. Platforms: GP3, GP4"
- id: ir01
  label: "IR Enable 1"
  kind: action
  command: ":IR01{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable"
- id: ir02
  label: "IR Enable 2"
  kind: action
  command: ":IR02{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable"
- id: ir03
  label: "IR Enable 3"
  kind: action
  command: ":IR03{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable. Platforms: GP3"
- id: wide
  label: "Wide Setup"
  kind: action
  command: ":WIDE{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable"
- id: svga
  label: "Sync Termination VGA"
  kind: action
  command: ":SVGA{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable"
- id: svg2
  label: "Sync Termination VGA 2"
  kind: action
  command: ":SVG2{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable. Platforms: GP1"
- id: sdvi
  label: "Sync Termination DVI-A"
  kind: action
  command: ":SDVI{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable. Platforms: GP2"
- id: sbnc
  label: "Sync Termination BNC"
  kind: action
  command: ":SBNC{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable. Platforms: GP3, GP4"
- id: osdc
  label: "OSD Enable"
  kind: action
  command: ":OSDC{value}"
  notes: "Ops: Get, Set. See value table OSDC (table not in source). Protocol section: 0 = OSD off, 1 = OSD show only warnings"
- id: test
  label: "Test Image"
  kind: action
  command: ":TEST{value}"
  notes: "Ops: Get, Set. 0 - 7 different test patterns"
- id: vkey
  label: "Vertical Keystone"
  kind: action
  command: ":VKEY{value}"
  notes: "Ops: Get, Set"
- id: sncl
  label: "Sync Level"
  kind: action
  command: ":SNCL{value}"
  notes: "Ops: Get, Set. Inftec only"
- id: sncs
  label: "Sync Level RGB Video"
  kind: action
  command: ":SNCS{value}"
  notes: "Ops: Get, Set. Inftec only. Platforms: GP1, GP2, GP3, GP4"
- id: csfi
  label: "Enable Color Space Convert"
  kind: action
  command: ":CSFI{value}"
  notes: "Ops: Get, Set. Inftec only"
- id: opfi
  label: "Enable Optical Filter"
  kind: action
  command: ":OPFI{value}"
  notes: "Ops: Get, Set. Inftec only. Platforms: GP3, GP4"
- id: vfve
  label: "Video Filter VGA Enable"
  kind: action
  command: ":VFVE{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable. Platforms: GP3, GP4"
- id: vfbe
  label: "Video Filter BNC Enable"
  kind: action
  command: ":VFBE{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable. Platforms: GP3, GP4"
- id: opfa
  label: "Optical Filter All"
  kind: action
  command: ":OPFA{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable. Platforms: GP4"

# ---- Installation->lamp/LED ----
- id: ecom
  label: "Eco Mode"
  kind: action
  command: ":ECOM{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable"
- id: lpw1
  label: "Lamp1 Power / LED Power"
  kind: action
  command: ":LPW1{value}"
  notes: "Ops: Get, Set. Platforms: GP1, GP2, GP3, GP4, GP1_AS3D, GP3 LED. Duplicate row in IR-control section labels LPW1 'LED Power'"
- id: lpw2
  label: "Lamp2 Power"
  kind: action
  command: ":LPW2{value}"
  notes: "Ops: Get, Set. Platforms: GP3, GP4"
- id: dbdi
  label: "LED Power"
  kind: action
  command: ":DBDI{value}"
  notes: "Ops: Get, Set. See value table LMOD (table not in source). Platforms: GP3 LED"
- id: lmod
  label: "Lamp Mode"
  kind: action
  command: ":LMOD{value}"
  notes: "Ops: Get, Set. Platforms: GP3, GP4"
- id: ldly
  label: "Lamp Auto Switch Delay"
  kind: action
  command: ":LDLY{value}"
  notes: "Ops: Get, Set. Platforms: GP3, GP4"
- id: dual
  label: "Lamp Mode Dual"
  kind: action
  command: ":DUAL{value}"
  notes: "Ops: Get, Set. Use LMOD, this is for legacy support. Platforms: GP3, GP4"
- id: sngl
  label: "Lamp Mode Single"
  kind: action
  command: ":SNGL{value}"
  notes: "Ops: Get, Set. Use LMOD, this is for legacy support. Platforms: GP3, GP4"
- id: laut
  label: "Lamp Mode Auto"
  kind: action
  command: ":LAUT{value}"
  notes: "Ops: Get, Set. Use LMOD, this is for legacy support. Platforms: GP3, GP4"
- id: lact
  label: "Select Lamp In Single Mode"
  kind: action
  command: ":LACT{value}"
  notes: "Ops: Get, Set. Use LMOD, this is for legacy support. Platforms: GP3, GP4"
- id: ldmm
  label: "LED Dim Mode"
  kind: action
  command: ":LDMM{value}"
  notes: "Ops: Get, Set. 0 - standard, 1 - custom. Platforms: GP3 LED"
- id: ldcr
  label: "Custom LED Dim Red"
  kind: action
  command: ":LDCR{value}"
  notes: "Ops: Get, Set. 0-20. Platforms: GP3 LED"
- id: ldcg
  label: "Custom LED Dim Green"
  kind: action
  command: ":LDCG{value}"
  notes: "Ops: Get, Set. 0-20. Platforms: GP3 LED"
- id: ldcb
  label: "Custom LED Dim Blue"
  kind: action
  command: ":LDCB{value}"
  notes: "Ops: Get, Set. 0-20. Platforms: GP3 LED"

# ---- Installation->trigger ----
- id: smod
  label: "Screen Trigger Mode"
  kind: action
  command: ":SMOD{value}"
  notes: "Ops: Get, Set. See value table SMOD (table not in source)"
- id: amod
  label: "Aspect Trigger Mode"
  kind: action
  command: ":AMOD{value}"
  notes: "Ops: Get, Set. See value table AMOD (table not in source). Platforms: GP1, GP3, GP4, GP1_AS3D"

# ---- Installation->EDID ----
- id: edir
  label: "EDID Resolution"
  kind: action
  command: ":EDIR{value}"
  notes: "Ops: Get, Set. See value table EDIR (table not in source). Platforms: GP1, GP2, GP3, GP4"
- id: edit
  label: "EDID Type"
  kind: action
  command: ":EDIT{value}"
  notes: "Ops: Get, Set. See value table EDIT (table not in source). Platforms: GP1, GP2, GP3, GP4"
- id: edmd
  label: "EDID Mailbox Data, Auto Increment"
  kind: action
  command: ":EDMD{value}"
  notes: "Ops: Get, Set. Platforms: GP1, GP2, GP3, GP4"
- id: edmr
  label: "EDID Mailbox Counter Reset"
  kind: action
  command: ":EDMR{value}"
  notes: "Ops: Get, Set. Platforms: GP1, GP2, GP3, GP4"

# ---- Settings ----
- id: fcre
  label: "Factory Reset"
  kind: action
  command: ":FCRE"
  notes: "Ops: Set"
- id: fcrl
  label: "Factory Reset Level"
  kind: action
  command: ":FCRL{value}"
  notes: "Ops: Get, Set"
- id: pinc
  label: "PIN Code"
  kind: action
  command: ":PINC{value}"
  notes: "Ops: Set. Must be run in standby"
- id: code
  label: "Service Code"
  kind: action
  command: ":CODE{value}"
  notes: "Ops: Set"
- id: rcid
  label: "RCID Internal"
  kind: action
  command: ":RCID{value}"
  notes: "Ops: Get, Set"
- id: dpms
  label: "DPMS"
  kind: action
  command: ":DPMS{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable"
- id: dpmt
  label: "DPMS Timeout"
  kind: action
  command: ":DPMT{value}"
  notes: "Ops: Get, Set"
- id: keyb
  label: "Backlight Timeout"
  kind: action
  command: ":KEYB{value}"
  notes: "Ops: Get, Set"

# ---- Profiles ----
- id: umst
  label: "Store User Settings"
  kind: action
  command: ":UMST{value}"
  notes: "Ops: Get, Set. User Settings is replaced by Profile in some software versions"
- id: umrc
  label: "Recall User Settings"
  kind: action
  command: ":UMRC{value}"
  notes: "Ops: Get, Set. User Settings is replaced by Profile in some software versions"
- id: stmo
  label: "Store Motor Position"
  kind: action
  command: ":STMO{value}"
  notes: "Ops: Set. Platforms: GP4"
- id: rcmo
  label: "Recall Motor Position"
  kind: action
  command: ":RCMO{value}"
  notes: "Ops: Set. Platforms: GP4"
- id: prmo
  label: "Profile Mode"
  kind: action
  command: ":PRMO{value}"
  notes: "Ops: Get, Set. 0 - Auto, 1 - Custom, 2 - ISF"
- id: pimo
  label: "Profile ISF Mode"
  kind: action
  command: ":PIMO{value}"
  notes: "Ops: Get, Set. 0 - ISF Day, 1 - ISF Night"
- id: pcen
  label: "Profile Custom Enable"
  kind: action
  command: ":PCEN {value} {target}"
  params:
    - name: value
      type: integer
      description: "0 - disable, 1 - enable"
    - name: target
      type: integer
      description: "Custom profile number (0 - 9)"
  notes: "Ops: Get, Set. Source example: ':PCEN 1 2' enables custom profile number 2"
- id: pcna
  label: "Profile Custom Name"
  kind: action
  command: ":PCNA {value} {target}"
  params:
    - name: value
      type: string
      description: "Profile name as string"
    - name: target
      type: integer
      description: "Custom profile number (0 - 9)"
  notes: "Ops: Get, Set"
- id: pcco
  label: "Profile Custom Connector"
  kind: query
  command: ":PCCO ? {target}"
  params:
    - name: target
      type: integer
      description: "Custom profile number (0 - 9)"
  notes: "Ops: Get. Value: Connector (see Profile Con List, not in source). Source example: ':PCCO ? 2' -> '%001 PCCO 000003'"
- id: prcc
  label: "Profile Custom Current Profile"
  kind: query
  command: ":PRCC?"
  notes: "Ops: Get"
- id: psto
  label: "Profile Custom Store"
  kind: action
  command: ":PSTO{value}"
  notes: "Ops: Set. See value table PSTO (table not in source)"
- id: pcrc
  label: "Profile Custom Recall"
  kind: action
  command: ":PCRC{value}"
  notes: "Ops: Set"
- id: prrc
  label: "Profile Custom Recall Current"
  kind: action
  command: ":PRRC{value}"
  notes: "Ops: Set"
- id: prer
  label: "Profile Custom Erase"
  kind: action
  command: ":PRER{value}"
  notes: "Ops: Set. See value table PRER (table not in source)"
- id: prch
  label: "Current Profile Changed?"
  kind: query
  command: ":PRCH?"
  notes: "Ops: Get. Returns string * (asterisk) if changed"

# ---- Lens control ----
- id: foin
  label: "Focus In"
  kind: action
  command: ":FOIN{value}"
  notes: "Ops: Set. 1 - Slow, 2 - Medium, 3 - Fast. Platforms: GP3, GP4"
- id: fout
  label: "Focus Out"
  kind: action
  command: ":FOUT{value}"
  notes: "Ops: Set. 1 - Slow, 2 - Medium, 3 - Fast. Platforms: GP3, GP4"
- id: zoin
  label: "Zoom In"
  kind: action
  command: ":ZOIN{value}"
  notes: "Ops: Set. 1 - Slow, 2 - Medium, 3 - Fast. Platforms: GP3, GP4"
- id: zout
  label: "Zoom Out"
  kind: action
  command: ":ZOUT{value}"
  notes: "Ops: Set. 1 - Slow, 2 - Medium, 3 - Fast. Platforms: GP3, GP4"
- id: irop
  label: "Iris Open"
  kind: action
  command: ":IROP{value}"
  notes: "Ops: Set. 1 - Slow, 2 - Medium, 3 - Fast. Platforms: GP3, GP4"
- id: ircl
  label: "Iris Close"
  kind: action
  command: ":IRCL{value}"
  notes: "Ops: Set. 1 - Slow, 2 - Medium, 3 - Fast. Platforms: GP3, GP4"
- id: lsdw
  label: "Lens Shift Down"
  kind: action
  command: ":LSDW{value}"
  notes: "Ops: Set. 1 - Slow, 2 - Medium, 3 - Fast. Platforms: GP3, GP4"
- id: lsup
  label: "Lens Shift Up"
  kind: action
  command: ":LSUP{value}"
  notes: "Ops: Set. 1 - Slow, 2 - Medium, 3 - Fast. Platforms: GP3, GP4"
- id: lslf
  label: "Lens Shift Left"
  kind: action
  command: ":LSLF{value}"
  notes: "Ops: Set. 1 - Slow, 2 - Medium, 3 - Fast. Platforms: GP3, GP4"
- id: lsrh
  label: "Lens Shift Right"
  kind: action
  command: ":LSRH{value}"
  notes: "Ops: Set. 1 - Slow, 2 - Medium, 3 - Fast. Platforms: GP3, GP4"
- id: shut
  label: "Shutter"
  kind: action
  command: ":SHUT{value}"
  notes: "Ops: Set. Platforms: GP3, GP4"

# ---- Menu navigate ----
- id: menu
  label: "Menu Navigate Toggle OSD Menu"
  kind: action
  command: ":MENU"
  notes: "Ops: Set"
- id: nvup
  label: "Menu Navigate Up"
  kind: action
  command: ":NVUP"
  notes: "Ops: Set"
- id: nvdw
  label: "Menu Navigate Down"
  kind: action
  command: ":NVDW"
  notes: "Ops: Set"
- id: nvlf
  label: "Menu Navigate Left"
  kind: action
  command: ":NVLF"
  notes: "Ops: Set"
- id: nvrh
  label: "Menu Navigate Right"
  kind: action
  command: ":NVRH"
  notes: "Ops: Set"
- id: nvok
  label: "Menu Navigate Ok"
  kind: action
  command: ":NVOK"
  notes: "Ops: Set"

# ---- Miscellaneous ----
- id: echo
  label: "Communication Response (On/Off)"
  kind: action
  command: ":ECHO{value}"
  notes: "Ops: Set. Toggles auto-acknowledge on/off; value semantics not stated in source"
- id: lang
  label: "Language"
  kind: action
  command: ":LANG{value}"
  notes: "Ops: Get, Set. Platforms: GP1, GP2, GP3, GP4"
- id: osdp
  label: "OSD Menu Position"
  kind: action
  command: ":OSDP{value}"
  notes: "Ops: Get, Set. 0 - standard, 1 - anamorph. Platforms: GP1 Avielo, GP2 Avielo, GP3 Avielo, GP4 Avielo"
- id: snam
  label: "Show OSD Projector ID"
  kind: action
  command: ":SNAM{value}"
  notes: "Ops: Set. Extended Protocol. Platforms: GP1, GP2, GP3, GP4"
- id: sinf
  label: "Show OSD Info"
  kind: action
  command: ":SINF{value}"
  notes: "Ops: Set. Extended Protocol. Platforms: GP1, GP2, GP3, GP4"
- id: mess
  label: "Show OSD Message"
  kind: action
  command: ":MESS{value}"
  notes: "Ops: Get, Set. Extended Protocol. Platforms: GP1, GP2, GP3, GP4"
- id: name
  label: "Projector ID"
  kind: action
  command: ":NAME{value}"
  notes: "Ops: Get, Set. Extended Protocol. Platforms: GP1, GP2, GP3, GP4"

# ---- Medical (GP2 medical only) ----
- id: mdof
  label: "Medical Off"
  kind: action
  command: ":MDOF{value}"
  notes: "Ops: Get, Set. Medical only. Platforms: GP2"
- id: mdcl
  label: "Medical Clearbase"
  kind: action
  command: ":MDCL{value}"
  notes: "Ops: Get, Set. Medical only. Platforms: GP2"
- id: mdbl
  label: "Medical Bluebase"
  kind: action
  command: ":MDBL{value}"
  notes: "Ops: Get, Set. Medical only. Platforms: GP2"
- id: mdfw
  label: "Medical Full White"
  kind: action
  command: ":MDFW{value}"
  notes: "Ops: Get, Set. Medical only. Platforms: GP2"
- id: mdcx
  label: "DICOM Clearbase X"
  kind: action
  command: ":MDCX{value}"
  notes: "Ops: Get, Set. Medical only. Platforms: GP2"
- id: mdcy
  label: "DICOM Clearbase Y"
  kind: action
  command: ":MDCY{value}"
  notes: "Ops: Get, Set. Medical only. Platforms: GP2"
- id: mdbx
  label: "DICOM Bluebase X"
  kind: action
  command: ":MDBX{value}"
  notes: "Ops: Get, Set. Medical only. Platforms: GP2"
- id: mdby
  label: "DICOM Bluebase Y"
  kind: action
  command: ":MDBY{value}"
  notes: "Ops: Get, Set. Medical only. Platforms: GP2"

# ---- Thermal ----
- id: thrm
  label: "Thermal Status"
  kind: query
  command: ":THRM?"
  notes: "Ops: Get"
- id: fan1
  label: "Fan Speed 1"
  kind: query
  command: ":FAN1?"
  notes: "Ops: Get"
- id: fan2
  label: "Fan Speed 2"
  kind: query
  command: ":FAN2?"
  notes: "Ops: Get"
- id: fan3
  label: "Fan Speed 3"
  kind: query
  command: ":FAN3?"
  notes: "Ops: Get"
- id: fan4
  label: "Fan Speed 4"
  kind: query
  command: ":FAN4?"
  notes: "Ops: Get"
- id: fan5
  label: "Fan Speed 5"
  kind: query
  command: ":FAN5?"
  notes: "Ops: Get"
- id: fan6
  label: "Fan Speed 6"
  kind: query
  command: ":FAN6?"
  notes: "Ops: Get"
- id: fan7
  label: "Fan Speed 7"
  kind: query
  command: ":FAN7?"
  notes: "Ops: Get"
- id: fan8
  label: "Fan Speed 8"
  kind: query
  command: ":FAN8?"
  notes: "Ops: Get"
- id: sns1
  label: "Sensor Value 1"
  kind: query
  command: ":SNS1?"
  notes: "Ops: Get"
- id: sns2
  label: "Sensor Value 2"
  kind: query
  command: ":SNS2?"
  notes: "Ops: Get"
- id: sns3
  label: "Sensor Value 3"
  kind: query
  command: ":SNS3?"
  notes: "Ops: Get"
- id: sns4
  label: "Sensor Value 4"
  kind: query
  command: ":SNS4?"
  notes: "Ops: Get"
- id: sns5
  label: "Sensor Value 5"
  kind: query
  command: ":SNS5?"
  notes: "Ops: Get"
- id: sns6
  label: "Sensor Value 6"
  kind: query
  command: ":SNS6?"
  notes: "Ops: Get"
- id: sns7
  label: "Sensor Value 7"
  kind: query
  command: ":SNS7?"
  notes: "Ops: Get"
- id: sns8
  label: "Sensor Value 8"
  kind: query
  command: ":SNS8?"
  notes: "Ops: Get"

# ---- Status ----
- id: plat
  label: "Platform Name String"
  kind: query
  command: ":PLAT?"
  notes: "Ops: Get. Extended Protocol"
- id: seri
  label: "Serial Number String"
  kind: query
  command: ":SERI?"
  notes: "Ops: Get. Extended Protocol. Source example: ':seri ?' -> '%001 SERI e00001 07010001'"
- id: modl
  label: "Model Name String"
  kind: query
  command: ":MODL?"
  notes: "Ops: Get. Extended Protocol"
- id: part
  label: "Part Number String"
  kind: query
  command: ":PART?"
  notes: "Ops: Get. Extended Protocol"
- id: sver
  label: "Software Version"
  kind: query
  command: ":SVER?"
  notes: "Ops: Get. Extended Protocol"
- id: swvr
  label: "Software Version"
  kind: query
  command: ":SWVR?"
  notes: "Ops: Get"
- id: acss
  label: "Current Access Level"
  kind: query
  command: ":ACSS?"
  notes: "Ops: Get"
- id: lest
  label: "Status LED State"
  kind: query
  command: ":LEST?"
  notes: "Ops: Get. See value table LEST (table not in source)"
- id: swsn
  label: "SVN SW Revision"
  kind: query
  command: ":SWSN?"
  notes: "Ops: Get. Extended Protocol. Platforms: GP1, GP2, GP3, GP4"

# ---- ZoneCorrection ----
- id: zcen
  label: "ZoneCorrection Enable"
  kind: action
  command: ":ZCEN{value}"
  notes: "Ops: Get, Set. 0 - disable, 1 - enable. Platforms: GP4"

# ---- 3D stereo ----
- id: tdfs
  label: "3D Flash Slave"
  kind: action
  command: ":TDFS{value}"
  notes: "Ops: Set. Platforms: GP1_AS3D"
- id: tdgt
  label: "Glass Type"
  kind: action
  command: ":TDGT{value}"
  notes: "Ops: Get, Set. Platforms: GP1_AS3D"
- id: tdgd
  label: "Genlock Phase Delay"
  kind: action
  command: ":TDGD{value}"
  notes: "Ops: Get, Set. Platforms: GP1_AS3D"
- id: tdsm
  label: "Stereo Mode"
  kind: action
  command: ":TDSM{value}"
  notes: "Ops: Get, Set. Platforms: GP1_AS3D"
- id: tdsc
  label: "Connector Select Slave"
  kind: action
  command: ":TDSC{value}"
  notes: "Ops: Get, Set. Platforms: GP1_AS3D"

# ---- IR control ----
- id: auxl
  label: "IR LED Enable"
  kind: action
  command: ":AUXL{value}"
  notes: "Ops: Get, Set. Platforms: GP3_LED_IR"
- id: auxd
  label: "IR LED Dim"
  kind: action
  command: ":AUXD{value}"
  notes: "Ops: Get, Set. Platforms: GP3_LED_IR"
- id: disl
  label: "Turn Off RGB LEDs"
  kind: action
  command: ":DISL{value}"
  notes: "Ops: Get, Set. Platforms: GP3_LED_IR"
```

## Feedbacks
```yaml
# Acknowledge format: '%' + ADDRESS (3 bytes) + SPACE + COMMAND (4 bytes) + SPACE + VALUE (6 bytes) + CR (0x0D)
# Example: ":POWR1" -> "%001 POWR 000001"
- id: acknowledge
  type: string
  description: "Acknowledge response: %<addr> <MNEM> <6-byte value> CR. Acknowledge ON by default, toggled by ECHO or per-command modifier A"

# Error responses (returned in place of value when command invalid):
- id: error_access_denied
  type: enum
  values: ["!00001"]
  description: "Access denied - current access level is too low"
- id: error_not_available
  type: enum
  values: ["!00002"]
  description: "Not available - command currently not available (e.g. contrast not available when projector is searching)"
- id: error_not_implemented
  type: enum
  values: ["!00003"]
  description: "Not implemented"
- id: error_value_out_of_range
  type: enum
  values: ["!00004"]
  description: "Value out of range"
- id: extended_info_string
  type: string
  description: "'e00001' - extended info, a description string follows (for values longer than 6 characters)"

# Observable state via queries:
- id: power_state
  type: enum  # UNRESOLVED: POST value table not in source
  description: "Power state via POST query"
- id: signal_status
  type: enum
  values: [searching, locked]
  description: "Signal status via ISTS query: 0 - searching, 1 - locked to source"
- id: thermal_status
  type: string  # UNRESOLVED: value semantics not stated in source
  description: "Thermal status via THRM query"
- id: status_led_state
  type: enum  # UNRESOLVED: LEST value table not in source
  description: "Status LED state via LEST query"
- id: profile_changed
  type: enum
  values: ["*"]
  description: "PRCH query returns * (asterisk) if current profile changed"
```

## Variables
```yaml
# All settable parameters are modeled as Actions in this spec (one action per source
# command row); no additional variables documented in source.
# UNRESOLVED: value ranges for most level-type commands (BRIG, CNTR, CSAT, VHUE, SHRP,
# VKEY, ...) not stated in source; runtime discovery possible via ?M/?N/?D/?S modifiers.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source. Some commands generate
# OSD feedback (suppressible via OSDC 0/1), but no push events described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Wait 30 seconds after power on before sending next command (explicit source requirement)"
  - "PINC (PIN Code) must be run in standby (explicit source requirement)"
# UNRESOLVED: no other safety warnings or interlock procedures in source.
```

## Notes
- Protocol frame: `:` header (required) + optional address (1-3 bytes) + message body + CR (0x0D) terminator (required). Optional single SPACE between fields; with or without space accepted. Mnemonics not case sensitive.
- Timing constraints (source): wait for response before sending next command; minimum 2 s delay before resending if no response; minimum 500 ms between commands; minimum 5 s delay after sending 20 commands.
- RS-232 wiring: standard serial cable, 9-pin female to host, 9-pin male to projector; pin 2-2, pin 3-3, pin 5-5.
- LAN defaults: DHCP On, IP/subnet/gateway 0.0.0.0 (until assigned), TCP/UDP port 1025, web login username `admin` password `admin` (both case sensitive). Web page (browser-based) configures IP settings, port, password, and shows network firmware version; it is not documented as a REST/HTTP control API.
- Acknowledges ON by default; ECHO toggles them; modifier A requests acknowledge per command.
- Extended Protocol commands (SNAM, SINF, MESS, NAME, PLAT, SERI, MODL, PART, SVER, SWSN) marked as such in source; distinction from base protocol not explained.
- Platform note: source maps GP1=F10 series, GP2=F20/evo 20/cineo 20, GP3=F30/cineo 30; GP4 products not enumerated. F32 is not listed, so which commands apply to F32 sx+ is unresolved; all documented commands included for coverage.
- Source command table contains duplicate mnemonic rows with conflicting descriptions (SABS, S1T1, S169, SS43, SFLA, SFAR, SLET, SLST, SANL; and LDMM, LPW1, DBDI, LDCR, LDCG, LDCB in the IR-control section) — probable PDF-extraction corruption; deduplicated with both meanings noted.
- Referenced value tables (POST, IABS, SABS, GABS, BCCR, BCMO, BCPR, PRES, DSCR, CMTG, ORIE, OSDC, SMOD, AMOD, EDIR, EDIT, PSTO, PRER, LEST, LMOD) are not included in the source document.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: F32 sx+ platform generation (GP1-GP4) not stated; per-command applicability unknown -->
<!-- UNRESOLVED: value tables referenced but absent from source -->
<!-- UNRESOLVED: UDP control behavior only implied by "TCP/UDP port" label; LAN control framing identical to RS-232 assumed from "connected to either RS232 or LAN ... through this ASCII based protocol" -->

## Provenance

```yaml
source_domains:
  - web.archive.org
  - manualslib.com
  - applicationmarket.crestron.com
source_urls:
  - "https://web.archive.org/web/20131222040438/http://www.projectiondesign.com/products/f32-series/_attachment/1663?_ts=13e30ff66f4&download=true"
  - "https://www.manualslib.com/manual/2456229/Projectiondesign-F32-SxPlus.html?page=46"
  - https://applicationmarket.crestron.com/content/Help/ProjectionDesign/projectiondesign_f32_sx_serial_v1_0_help.pdf
  - "https://www.manualslib.com/manual/1133778/Projectiondesign-F32.html?page=46"
retrieved_at: 2026-08-18T12:44:23.806Z
last_checked_at: 2026-08-19T09:40:26.970Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:40:26.970Z
matched_actions: 270
action_count: 270
confidence: medium
summary: "All 270 spec mnemonics appear verbatim in the source ASCII command table; transport values (port 1025, baud 19200, 8N1, no flow control) all supported. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "F32 sx+ platform generation (GP1/GP2/GP3/GP4) not stated in source — per-command applicability to F32 sx+ is unresolved. Referenced value tables (POST, IABS, SABS, GABS, BCCR, BCMO, BCPR, PRES, DSCR, CMTG, ORIE, OSDC, SMOD, AMOD, EDIR, EDIT, PSTO, PRER, LEST, LMOD) are not included in the source."
- "POST value table not in source"
- "value semantics not stated in source"
- "LEST value table not in source"
- "value ranges for most level-type commands (BRIG, CNTR, CSAT, VHUE, SHRP,"
- "no unsolicited notifications documented in source. Some commands generate"
- "no multi-step sequences described explicitly in source."
- "no other safety warnings or interlock procedures in source."
- "firmware version compatibility not stated in source"
- "F32 sx+ platform generation (GP1-GP4) not stated; per-command applicability unknown"
- "value tables referenced but absent from source"
- "UDP control behavior only implied by \"TCP/UDP port\" label; LAN control framing identical to RS-232 assumed from \"connected to either RS232 or LAN ... through this ASCII based protocol\""
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
