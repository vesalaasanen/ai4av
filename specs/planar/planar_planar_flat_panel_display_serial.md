---
spec_id: admin/planar-planar-flat-panel-display
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar Planar Flat Panel Display Control Spec"
manufacturer: Planar
model_family: "Planar Flat Panel Display"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "Planar Flat Panel Display"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/c1dgmc05/020-1389-00c_ps-series-4k_rs232-manual-wm.pdf
retrieved_at: 2026-09-02T16:38:33.444Z
last_checked_at: 2026-09-18T22:17:38.804Z
generated_at: 2026-09-18T22:17:38.804Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model variant not stated in source; serial config (baud/data bits/parity/stop bits/flow) per-table reads only \"19200, 8, None, 1, None\" as fixed; some commands (e.g. DBR Baud Rate setter, Power On Input POI values 23/24/25/34/35/44) indicate later-firmware-only commands. Source note: \"Certain commands are only available in later versions of firmware. Please upgrade to the latest firmware version if unsupported commands are encountered.\" Firmware gating per command not enumerable from source."
  - "source describes request/response model only; no unsolicited device->host notifications documented."
  - "source does not document multi-step sequences beyond individual commands."
  - "no explicit high-voltage, interlocks, or personnel-safety warnings in source."
  - "firmware version gating per command not enumerable; specific password mechanism referenced by response code 11 not documented in source; full model variant (PS Series sub-model) not stated."
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-09-18T22:17:38.804Z
  matched_actions: 513
  action_count: 513
  confidence: medium
  summary: "All 513 spec actions map via wire-literal `(CMD?|=val|+|-)` strings to 119 source command codes; transport (19200/8/N/1, TCP 23) matches source verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Planar Planar Flat Panel Display Control Spec

## Summary
RS-232C serial control for the Planar PS Series 4K Flat Panel Display. Commands follow a `(www:xyz)[CR]` ASCII framing on a 19200-8-N-1 link, with responses `(u;www:x=z)[CR][LF]`. The same command set is also reachable over LAN via TCP port 23.

<!-- UNRESOLVED: model variant not stated in source; serial config (baud/data bits/parity/stop bits/flow) per-table reads only "19200, 8, None, 1, None" as fixed; some commands (e.g. DBR Baud Rate setter, Power On Input POI values 23/24/25/34/35/44) indicate later-firmware-only commands. Source note: "Certain commands are only available in later versions of firmware. Please upgrade to the latest firmware version if unsupported commands are encountered." Firmware gating per command not enumerable from source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # TCP port 23 used to expose RS232 commands over LAN
auth:
  type: none  # inferred: no auth procedure in source
```

Pinout (straight-through): Pin 2 Tx out, Pin 3 Rx in, Pin 5 Ground, Shell Ground. All other pins no connect.

## Traits
```yaml
- powerable       # inferred from PWR command
- routable        # inferred from INS input source command
- queryable       # inferred from ?-operand Get commands
- levelable       # inferred from BKL/BRT/CON/SHP/TNT/CLR/VOL/BAS/TRB/BLA commands
```

## Actions
```yaml
- id: pwr_set
  label: Power Control Set
  kind: action
  command: "(PWR={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0 = Off (soft power), 1 = On (soft power)

- id: pwr_query
  label: Power Control Query
  kind: query
  command: "(PWR?)[CR]"

- id: pwr_increment
  label: Power Control Increment
  kind: action
  command: "(PWR+)[CR]"

- id: pwr_decrement
  label: Power Control Decrement
  kind: action
  command: "(PWR-)[CR]"

- id: ins_set
  label: Input Source Set
  kind: action
  command: "(INS={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 7]
      description: 0=VGA, 1=HDMI1, 2=HDMI2, 3=DP1, 4=Android, 5=Web Browser, 7=Android App

- id: ins_query
  label: Input Source Query
  kind: query
  command: "(INS?)[CR]"

- id: ins_increment
  label: Input Source Increment
  kind: action
  command: "(INS+)[CR]"

- id: ins_decrement
  label: Input Source Decrement
  kind: action
  command: "(INS-)[CR]"

- id: bkl_set
  label: Backlight Level Set
  kind: action
  command: "(BKL={value})[CR]"
  params:
    - name: value
      type: integer
      range: [15, 100]
      description: Backlight level 15-100

- id: bkl_query
  label: Backlight Level Query
  kind: query
  command: "(BKL?)[CR]"

- id: bkl_increment
  label: Backlight Level Increment
  kind: action
  command: "(BKL+)[CR]"

- id: bkl_decrement
  label: Backlight Level Decrement
  kind: action
  command: "(BKL-)[CR]"

- id: brt_set
  label: Brightness Set
  kind: action
  command: "(BRT={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: brt_query
  label: Brightness Query
  kind: query
  command: "(BRT?)[CR]"

- id: brt_increment
  label: Brightness Increment
  kind: action
  command: "(BRT+)[CR]"

- id: brt_decrement
  label: Brightness Decrement
  kind: action
  command: "(BRT-)[CR]"

- id: ble_set
  label: Backlight Enable Set
  kind: action
  command: "(BLE={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On (Backlight)

- id: ble_query
  label: Backlight Enable Query
  kind: query
  command: "(BLE?)[CR]"

- id: ble_increment
  label: Backlight Enable Increment
  kind: action
  command: "(BLE+)[CR]"

- id: ble_decrement
  label: Backlight Enable Decrement
  kind: action
  command: "(BLE-)[CR]"

- id: con_set
  label: Contrast Set
  kind: action
  command: "(CON={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: con_query
  label: Contrast Query
  kind: query
  command: "(CON?)[CR]"

- id: con_increment
  label: Contrast Increment
  kind: action
  command: "(CON+)[CR]"

- id: con_decrement
  label: Contrast Decrement
  kind: action
  command: "(CON-)[CR]"

- id: shp_set
  label: Sharpness Set
  kind: action
  command: "(SHP={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: shp_query
  label: Sharpness Query
  kind: query
  command: "(SHP?)[CR]"

- id: shp_increment
  label: Sharpness Increment
  kind: action
  command: "(SHP+)[CR]"

- id: shp_decrement
  label: Sharpness Decrement
  kind: action
  command: "(SHP-)[CR]"

- id: tnt_set
  label: Hue Set
  kind: action
  command: "(TNT={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: tnt_query
  label: Hue Query
  kind: query
  command: "(TNT?)[CR]"

- id: tnt_increment
  label: Hue Increment
  kind: action
  command: "(TNT+)[CR]"

- id: tnt_decrement
  label: Hue Decrement
  kind: action
  command: "(TNT-)[CR]"

- id: clr_set
  label: Saturation Set
  kind: action
  command: "(CLR={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: clr_query
  label: Saturation Query
  kind: query
  command: "(CLR?)[CR]"

- id: clr_increment
  label: Saturation Increment
  kind: action
  command: "(CLR+)[CR]"

- id: clr_decrement
  label: Saturation Decrement
  kind: action
  command: "(CLR-)[CR]"

- id: mmp_set
  label: Scheme Set
  kind: action
  command: "(MMP={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [1, 2, 3, 7, 8, 9]
      description: 1=Standard, 2=Soft, 3=User, 7=Vivid, 8=Natural, 9=Sports

- id: mmp_query
  label: Scheme Query
  kind: query
  command: "(MMP?)[CR]"

- id: mmp_increment
  label: Scheme Increment
  kind: action
  command: "(MMP+)[CR]"

- id: mmp_decrement
  label: Scheme Decrement
  kind: action
  command: "(MMP-)[CR]"

- id: cts_set
  label: Color Temperature Set
  kind: action
  command: "(CTS={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5]
      description: 0=9300K, 1=6500K, 2=5000K, 3=User, 4=7500K, 5=3200K

- id: cts_query
  label: Color Temperature Query
  kind: query
  command: "(CTS?)[CR]"

- id: cts_increment
  label: Color Temperature Increment
  kind: action
  command: "(CTS+)[CR]"

- id: cts_decrement
  label: Color Temperature Decrement
  kind: action
  command: "(CTS-)[CR]"

- id: gms_set
  label: Gamma Set
  kind: action
  command: "(GMS={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      description: 0=Off, 1=1.85, 2=1.9, 3=1.95, 4=2.0, 5=2.05, 6=2.1, 7=2.15, 8=2.2, 9=2.25, 10=2.3, 11=2.35, 12=2.4, 13=2.45, 14=2.5, 15=2.55, 16=2.6

- id: gms_query
  label: Gamma Query
  kind: query
  command: "(GMS?)[CR]"

- id: gms_increment
  label: Gamma Increment
  kind: action
  command: "(GMS+)[CR]"

- id: gms_decrement
  label: Gamma Decrement
  kind: action
  command: "(GMS-)[CR]"

- id: drg_set
  label: Red Gain Set
  kind: action
  command: "(DRG={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 256]

- id: drg_query
  label: Red Gain Query
  kind: query
  command: "(DRG?)[CR]"

- id: drg_increment
  label: Red Gain Increment
  kind: action
  command: "(DRG+)[CR]"

- id: drg_decrement
  label: Red Gain Decrement
  kind: action
  command: "(DRG-)[CR]"

- id: dgg_set
  label: Green Gain Set
  kind: action
  command: "(DGG={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 256]

- id: dgg_query
  label: Green Gain Query
  kind: query
  command: "(DGG?)[CR]"

- id: dgg_increment
  label: Green Gain Increment
  kind: action
  command: "(DGG+)[CR]"

- id: dgg_decrement
  label: Green Gain Decrement
  kind: action
  command: "(DGG-)[CR]"

- id: dbg_set
  label: Blue Gain Set
  kind: action
  command: "(DBG={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 256]

- id: dbg_query
  label: Blue Gain Query
  kind: query
  command: "(DBG?)[CR]"

- id: dbg_increment
  label: Blue Gain Increment
  kind: action
  command: "(DBG+)[CR]"

- id: dbg_decrement
  label: Blue Gain Decrement
  kind: action
  command: "(DBG-)[CR]"

- id: dro_set
  label: Red Offset Set
  kind: action
  command: "(DRO={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 256]

- id: dro_query
  label: Red Offset Query
  kind: query
  command: "(DRO?)[CR]"

- id: dro_increment
  label: Red Offset Increment
  kind: action
  command: "(DRO+)[CR]"

- id: dro_decrement
  label: Red Offset Decrement
  kind: action
  command: "(DRO-)[CR]"

- id: dgo_set
  label: Green Offset Set
  kind: action
  command: "(DGO={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 256]

- id: dgo_query
  label: Green Offset Query
  kind: query
  command: "(DGO?)[CR]"

- id: dgo_increment
  label: Green Offset Increment
  kind: action
  command: "(DGO+)[CR]"

- id: dgo_decrement
  label: Green Offset Decrement
  kind: action
  command: "(DGO-)[CR]"

- id: dbo_set
  label: Blue Offset Set
  kind: action
  command: "(DBO={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 256]

- id: dbo_query
  label: Blue Offset Query
  kind: query
  command: "(DBO?)[CR]"

- id: dbo_increment
  label: Blue Offset Increment
  kind: action
  command: "(DBO+)[CR]"

- id: dbo_decrement
  label: Blue Offset Decrement
  kind: action
  command: "(DBO-)[CR]"

- id: phs_set
  label: Phase Set
  kind: action
  command: "(PHS=50)[CR]"

- id: phs_query
  label: Phase Query
  kind: query
  command: "(PHS?)[CR]"

- id: phs_increment
  label: Phase Increment
  kind: action
  command: "(PHS+)[CR]"

- id: phs_decrement
  label: Phase Decrement
  kind: action
  command: "(PHS-)[CR]"

- id: trk_set
  label: Clock Set
  kind: action
  command: "(TRK={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: trk_query
  label: Clock Query
  kind: query
  command: "(TRK?)[CR]"

- id: trk_increment
  label: Clock Increment
  kind: action
  command: "(TRK+)[CR]"

- id: trk_decrement
  label: Clock Decrement
  kind: action
  command: "(TRK-)[CR]"

- id: ipl_set
  label: Horizontal Position Set
  kind: action
  command: "(IPL={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: ipl_query
  label: Horizontal Position Query
  kind: query
  command: "(IPL?)[CR]"

- id: ipl_increment
  label: Horizontal Position Increment
  kind: action
  command: "(IPL+)[CR]"

- id: ipl_decrement
  label: Horizontal Position Decrement
  kind: action
  command: "(IPL-)[CR]"

- id: ipu_set
  label: Vertical Position Set
  kind: action
  command: "(IPU={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: ipu_query
  label: Vertical Position Query
  kind: query
  command: "(IPU?)[CR]"

- id: ipu_increment
  label: Vertical Position Increment
  kind: action
  command: "(IPU+)[CR]"

- id: ipu_decrement
  label: Vertical Position Decrement
  kind: action
  command: "(IPU-)[CR]"

- id: acb_set
  label: Auto Adjust
  kind: action
  command: "(ACB=1)[CR]"

- id: acb_increment
  label: Auto Adjust Increment
  kind: action
  command: "(ACB+)[CR]"

- id: acb_decrement
  label: Auto Adjust Decrement
  kind: action
  command: "(ACB-)[CR]"

- id: cty_set
  label: Current Time Year Set
  kind: action
  command: "(CTY={value})[CR]"
  params:
    - name: value
      type: integer
      description: Year value (e.g. 2019)

- id: cty_query
  label: Current Time Year Query
  kind: query
  command: "(CTY?)[CR]"

- id: cty_increment
  label: Current Time Year Increment
  kind: action
  command: "(CTY+)[CR]"

- id: cty_decrement
  label: Current Time Year Decrement
  kind: action
  command: "(CTY-)[CR]"

- id: ctm_set
  label: Current Time Month Set
  kind: action
  command: "(CTM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [1, 12]

- id: ctm_query
  label: Current Time Month Query
  kind: query
  command: "(CTM?)[CR]"

- id: ctm_increment
  label: Current Time Month Increment
  kind: action
  command: "(CTM+)[CR]"

- id: ctm_decrement
  label: Current Time Month Decrement
  kind: action
  command: "(CTM-)[CR]"

- id: ctd_set
  label: Current Time Day Set
  kind: action
  command: "(CTD={value})[CR]"
  params:
    - name: value
      type: integer
      range: [1, 31]

- id: ctd_query
  label: Current Time Day Query
  kind: query
  command: "(CTD?)[CR]"

- id: ctd_increment
  label: Current Time Day Increment
  kind: action
  command: "(CTD+)[CR]"

- id: ctd_decrement
  label: Current Time Day Decrement
  kind: action
  command: "(CTD-)[CR]"

- id: cth_set
  label: Current Time Hour Set
  kind: action
  command: "(CTH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: cth_query
  label: Current Time Hour Query
  kind: query
  command: "(CTH?)[CR]"

- id: cth_increment
  label: Current Time Hour Increment
  kind: action
  command: "(CTH+)[CR]"

- id: cth_decrement
  label: Current Time Hour Decrement
  kind: action
  command: "(CTH-)[CR]"

- id: ctn_set
  label: Current Time Minute Set
  kind: action
  command: "(CTN={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: ctn_query
  label: Current Time Minute Query
  kind: query
  command: "(CTN?)[CR]"

- id: ctn_increment
  label: Current Time Minute Increment
  kind: action
  command: "(CTN+)[CR]"

- id: ctn_decrement
  label: Current Time Minute Decrement
  kind: action
  command: "(CTN-)[CR]"

- id: tms_set
  label: Timer Mode Set
  kind: action
  command: "(TMS={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]
      description: 0=Everyday Mode, 1=Workday Mode, 2=User Mode

- id: tms_query
  label: Timer Mode Query
  kind: query
  command: "(TMS?)[CR]"

- id: tms_increment
  label: Timer Mode Increment
  kind: action
  command: "(TMS+)[CR]"

- id: tms_decrement
  label: Timer Mode Decrement
  kind: action
  command: "(TMS-)[CR]"

- id: aen_set
  label: Alarm Enable Day Set
  kind: action
  command: "(AEN={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [1, 2, 4, 8, 16, 32, 64]
      description: 1=Sunday, 2=Monday, 4=Tuesday, 8=Wednesday, 16=Thursday, 32=Friday, 64=Saturday

- id: aen_query
  label: Alarm Enable Query
  kind: query
  command: "(AEN?)[CR]"

- id: aen_increment
  label: Alarm Enable Increment
  kind: action
  command: "(AEN+)[CR]"

- id: aen_decrement
  label: Alarm Enable Decrement
  kind: action
  command: "(AEN+)[CR]"  # source shows "(AEN+)" for decrement column on Thursday row; reproduced verbatim

- id: aef_set
  label: Alarm Disable Day Set
  kind: action
  command: "(AEF={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [1, 2, 4, 8, 16, 32, 64]
      description: 1=Sunday, 2=Monday, 4=Tuesday, 8=Wednesday, 16=Thursday, 32=Friday, 64=Saturday

- id: aef_query
  label: Alarm Disable Query
  kind: query
  command: "(AEF?)[CR]"

- id: aef_increment
  label: Alarm Disable Increment
  kind: action
  command: "(AEF+)[CR]"

- id: aef_decrement
  label: Alarm Disable Decrement
  kind: action
  command: "(AEF+)[CR]"  # source shows "(AEF+)" in decrement column; reproduced verbatim

- id: snh_set
  label: Sunday On Hour Set
  kind: action
  command: "(SNH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: snh_query
  label: Sunday On Hour Query
  kind: query
  command: "(SNH?)[CR]"

- id: snh_increment
  label: Sunday On Hour Increment
  kind: action
  command: "(SNH+)[CR]"

- id: snh_decrement
  label: Sunday On Hour Decrement
  kind: action
  command: "(SNH-)[CR]"

- id: snm_set
  label: Sunday On Minute Set
  kind: action
  command: "(SNM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: snm_query
  label: Sunday On Minute Query
  kind: query
  command: "(SNM?)[CR]"

- id: snm_increment
  label: Sunday On Minute Increment
  kind: action
  command: "(SNM+)[CR]"

- id: snm_decrement
  label: Sunday On Minute Decrement
  kind: action
  command: "(SNM-)[CR]"

- id: sfh_set
  label: Sunday Off Hour Set
  kind: action
  command: "(SFH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: sfh_query
  label: Sunday Off Hour Query
  kind: query
  command: "(SFH?)[CR]"

- id: sfh_increment
  label: Sunday Off Hour Increment
  kind: action
  command: "(SFH+)[CR]"

- id: sfh_decrement
  label: Sunday Off Hour Decrement
  kind: action
  command: "(SFH-)[CR]"

- id: sfm_set
  label: Sunday Off Minute Set
  kind: action
  command: "(SFM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: sfm_query
  label: Sunday Off Minute Query
  kind: query
  command: "(SFM?)[CR]"

- id: sfm_increment
  label: Sunday Off Minute Increment
  kind: action
  command: "(SFM+)[CR]"

- id: sfm_decrement
  label: Sunday Off Minute Decrement
  kind: action
  command: "(SFM-)[CR]"

- id: nnh_set
  label: Monday On Hour Set
  kind: action
  command: "(NNH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: nnh_query
  label: Monday On Hour Query
  kind: query
  command: "(NNH?)[CR]"

- id: nnh_increment
  label: Monday On Hour Increment
  kind: action
  command: "(NNH+)[CR]"

- id: nnh_decrement
  label: Monday On Hour Decrement
  kind: action
  command: "(NNH-)[CR]"

- id: nnm_set
  label: Monday On Minute Set
  kind: action
  command: "(NNM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: nnm_query
  label: Monday On Minute Query
  kind: query
  command: "(NNM?)[CR]"

- id: nnm_increment
  label: Monday On Minute Increment
  kind: action
  command: "(NNM+)[CR]"

- id: nnm_decrement
  label: Monday On Minute Decrement
  kind: action
  command: "(NNM-)[CR]"

- id: nfh_set
  label: Monday Off Hour Set
  kind: action
  command: "(NFH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: nfh_query
  label: Monday Off Hour Query
  kind: query
  command: "(NFH?)[CR]"

- id: nfh_increment
  label: Monday Off Hour Increment
  kind: action
  command: "(NFH+)[CR]"

- id: nfh_decrement
  label: Monday Off Hour Decrement
  kind: action
  command: "(NFH-)[CR]"

- id: nfm_set
  label: Monday Off Minute Set
  kind: action
  command: "(NFM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: nfm_query
  label: Monday Off Minute Query
  kind: query
  command: "(NFM?)[CR]"

- id: nfm_increment
  label: Monday Off Minute Increment
  kind: action
  command: "(NFM+)[CR]"

- id: nfm_decrement
  label: Monday Off Minute Decrement
  kind: action
  command: "(NFM-)[CR]"

- id: enh_set
  label: Tuesday On Hour Set
  kind: action
  command: "(ENH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: enh_query
  label: Tuesday On Hour Query
  kind: query
  command: "(ENH?)[CR]"

- id: enh_increment
  label: Tuesday On Hour Increment
  kind: action
  command: "(ENH+)[CR]"

- id: enh_decrement
  label: Tuesday On Hour Decrement
  kind: action
  command: "(ENH-)[CR]"

- id: enm_set
  label: Tuesday On Minute Set
  kind: action
  command: "(ENM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: enm_query
  label: Tuesday On Minute Query
  kind: query
  command: "(ENM?)[CR]"

- id: enm_increment
  label: Tuesday On Minute Increment
  kind: action
  command: "(ENM+)[CR]"

- id: enm_decrement
  label: Tuesday On Minute Decrement
  kind: action
  command: "(ENM-)[CR]"

- id: efh_set
  label: Tuesday Off Hour Set
  kind: action
  command: "(EFH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: efh_query
  label: Tuesday Off Hour Query
  kind: query
  command: "(EFH?)[CR]"

- id: efh_increment
  label: Tuesday Off Hour Increment
  kind: action
  command: "(EFH+)[CR]"

- id: efh_decrement
  label: Tuesday Off Hour Decrement
  kind: action
  command: "(EFH-)[CR]"

- id: efm_set
  label: Tuesday Off Minute Set
  kind: action
  command: "(EFM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: efm_query
  label: Tuesday Off Minute Query
  kind: query
  command: "(EFM?)[CR]"

- id: efm_increment
  label: Tuesday Off Minute Increment
  kind: action
  command: "(EFM+)[CR]"

- id: efm_decrement
  label: Tuesday Off Minute Decrement
  kind: action
  command: "(EFM-)[CR]"

- id: dnh_set
  label: Wednesday On Hour Set
  kind: action
  command: "(DNH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: dnh_query
  label: Wednesday On Hour Query
  kind: query
  command: "(DNH?)[CR]"

- id: dnh_increment
  label: Wednesday On Hour Increment
  kind: action
  command: "(DNH+)[CR]"

- id: dnh_decrement
  label: Wednesday On Hour Decrement
  kind: action
  command: "(DNH-)[CR]"

- id: dnm_set
  label: Wednesday On Minute Set
  kind: action
  command: "(DNM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: dnm_query
  label: Wednesday On Minute Query
  kind: query
  command: "(DNM?)[CR]"

- id: dnm_increment
  label: Wednesday On Minute Increment
  kind: action
  command: "(DNM+)[CR]"

- id: dnm_decrement
  label: Wednesday On Minute Decrement
  kind: action
  command: "(DNM-)[CR]"

- id: dfh_set
  label: Wednesday Off Hour Set
  kind: action
  command: "(DFH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: dfh_query
  label: Wednesday Off Hour Query
  kind: query
  command: "(DFH?)[CR]"

- id: dfh_increment
  label: Wednesday Off Hour Increment
  kind: action
  command: "(DFH+)[CR]"

- id: dfh_decrement
  label: Wednesday Off Hour Decrement
  kind: action
  command: "(DFH-)[CR]"

- id: dfm_set
  label: Wednesday Off Minute Set
  kind: action
  command: "(DFM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: dfm_query
  label: Wednesday Off Minute Query
  kind: query
  command: "(DFM?)[CR]"

- id: dfm_increment
  label: Wednesday Off Minute Increment
  kind: action
  command: "(DFM+)[CR]"

- id: dfm_decrement
  label: Wednesday Off Minute Decrement
  kind: action
  command: "(DFM-)[CR]"

- id: unh_set
  label: Thursday On Hour Set
  kind: action
  command: "(UNH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: unh_query
  label: Thursday On Hour Query
  kind: query
  command: "(UNH?)[CR]"

- id: unh_increment
  label: Thursday On Hour Increment
  kind: action
  command: "(UNH+)[CR]"

- id: unh_decrement
  label: Thursday On Hour Decrement
  kind: action
  command: "(UNH-)[CR]"

- id: unm_set
  label: Thursday On Minute Set
  kind: action
  command: "(UNM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: unm_query
  label: Thursday On Minute Query
  kind: query
  command: "(UNM?)[CR]"

- id: unm_increment
  label: Thursday On Minute Increment
  kind: action
  command: "(UNM+)[CR]"

- id: unm_decrement
  label: Thursday On Minute Decrement
  kind: action
  command: "(UNM-)[CR]"

- id: ufh_set
  label: Thursday Off Hour Set
  kind: action
  command: "(UFH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: ufh_query
  label: Thursday Off Hour Query
  kind: query
  command: "(UFH?)[CR]"

- id: ufh_increment
  label: Thursday Off Hour Increment
  kind: action
  command: "(UFH+)[CR]"

- id: ufh_decrement
  label: Thursday Off Hour Decrement
  kind: action
  command: "(UFH-)[CR]"

- id: ufm_set
  label: Thursday Off Minute Set
  kind: action
  command: "(UFM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: ufm_query
  label: Thursday Off Minute Query
  kind: query
  command: "(UFM?)[CR]"

- id: ufm_increment
  label: Thursday Off Minute Increment
  kind: action
  command: "(UFM+)[CR]"

- id: ufm_decrement
  label: Thursday Off Minute Decrement
  kind: action
  command: "(UFM-)[CR]"

- id: inh_set
  label: Friday On Hour Set
  kind: action
  command: "(INH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: inh_query
  label: Friday On Hour Query
  kind: query
  command: "(INH?)[CR]"

- id: inh_increment
  label: Friday On Hour Increment
  kind: action
  command: "(INH+)[CR]"

- id: inh_decrement
  label: Friday On Hour Decrement
  kind: action
  command: "(INH-)[CR]"

- id: inm_set
  label: Friday On Minute Set
  kind: action
  command: "(INM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: inm_query
  label: Friday On Minute Query
  kind: query
  command: "(INM?)[CR]"

- id: inm_increment
  label: Friday On Minute Increment
  kind: action
  command: "(INM+)[CR]"

- id: inm_decrement
  label: Friday On Minute Decrement
  kind: action
  command: "(INM-)[CR]"

- id: ifh_set
  label: Friday Off Hour Set
  kind: action
  command: "(IFH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: ifh_query
  label: Friday Off Hour Query
  kind: query
  command: "(IFH?)[CR]"

- id: ifh_increment
  label: Friday Off Hour Increment
  kind: action
  command: "(IFH+)[CR]"

- id: ifh_decrement
  label: Friday Off Hour Decrement
  kind: action
  command: "(IFH-)[CR]"

- id: ifm_set
  label: Friday Off Minute Set
  kind: action
  command: "(IFM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: ifm_query
  label: Friday Off Minute Query
  kind: query
  command: "(IFM?)[CR]"

- id: ifm_increment
  label: Friday Off Minute Increment
  kind: action
  command: "(IFM+)[CR]"

- id: ifm_decrement
  label: Friday Off Minute Decrement
  kind: action
  command: "(IFM-)[CR]"

- id: tnh_set
  label: Saturday On Hour Set
  kind: action
  command: "(TNH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: tnh_query
  label: Saturday On Hour Query
  kind: query
  command: "(TNH?)[CR]"

- id: tnh_increment
  label: Saturday On Hour Increment
  kind: action
  command: "(TNH+)[CR]"

- id: tnh_decrement
  label: Saturday On Hour Decrement
  kind: action
  command: "(TNH-)[CR]"

- id: tnm_set
  label: Saturday On Minute Set
  kind: action
  command: "(TNM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: tnm_query
  label: Saturday On Minute Query
  kind: query
  command: "(TNM?)[CR]"

- id: tnm_increment
  label: Saturday On Minute Increment
  kind: action
  command: "(TNM+)[CR]"

- id: tnm_decrement
  label: Saturday On Minute Decrement
  kind: action
  command: "(TNM-)[CR]"

- id: tfh_set
  label: Saturday Off Hour Set
  kind: action
  command: "(TFH={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 23]

- id: tfh_query
  label: Saturday Off Hour Query
  kind: query
  command: "(TFH?)[CR]"

- id: tfh_increment
  label: Saturday Off Hour Increment
  kind: action
  command: "(TFH+)[CR]"

- id: tfh_decrement
  label: Saturday Off Hour Decrement
  kind: action
  command: "(TFH-)[CR]"

- id: tfm_set
  label: Saturday Off Minute Set
  kind: action
  command: "(TFM={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 59]

- id: tfm_query
  label: Saturday Off Minute Query
  kind: query
  command: "(TFM?)[CR]"

- id: tfm_increment
  label: Saturday Off Minute Increment
  kind: action
  command: "(TFM+)[CR]"

- id: tfm_decrement
  label: Saturday Off Minute Decrement
  kind: action
  command: "(TFM-)[CR]"

- id: vol_set
  label: Volume Set
  kind: action
  command: "(VOL={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: vol_query
  label: Volume Query
  kind: query
  command: "(VOL?)[CR]"

- id: vol_increment
  label: Volume Increment
  kind: action
  command: "(VOL+)[CR]"

- id: vol_decrement
  label: Volume Decrement
  kind: action
  command: "(VOL-)[CR]"

- id: bas_set
  label: Bass Set
  kind: action
  command: "(BAS={value})[CR]"
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: bas_query
  label: Bass Query
  kind: query
  command: "(BAS?)[CR]"

- id: bas_increment
  label: Bass Increment
  kind: action
  command: "(BAS+)[CR]"

- id: bas_decrement
  label: Bass Decrement
  kind: action
  command: "(BAS-)[CR]"

- id: trb_set
  label: Treble Set
  kind: action
  command: "(TRB={value})[CR]"
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: trb_query
  label: Treble Query
  kind: query
  command: "(TRB?)[CR]"

- id: trb_increment
  label: Treble Increment
  kind: action
  command: "(TRB+)[CR]"

- id: trb_decrement
  label: Treble Decrement
  kind: action
  command: "(TRB-)[CR]"

- id: bla_set
  label: Balance Set
  kind: action
  command: "(BLA={value})[CR]"
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: bla_query
  label: Balance Query
  kind: query
  command: "(BLA?)[CR]"

- id: bla_increment
  label: Balance Increment
  kind: action
  command: "(BLA+)[CR]"

- id: bla_decrement
  label: Balance Decrement
  kind: action
  command: "(BLA-)[CR]"

- id: aus_set
  label: Audio Source Select Set
  kind: action
  command: "(AUS={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Default, 1=Audio In

- id: aus_query
  label: Audio Source Select Query
  kind: query
  command: "(AUS?)[CR]"

- id: aus_increment
  label: Audio Source Select Increment
  kind: action
  command: "(AUS+)[CR]"

- id: aus_decrement
  label: Audio Source Select Decrement
  kind: action
  command: "(AUS-)[CR]"

- id: spk_set
  label: Internal Speakers Set
  kind: action
  command: "(SPK={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: spk_query
  label: Internal Speakers Query
  kind: query
  command: "(SPK?)[CR]"

- id: spk_increment
  label: Internal Speakers Increment
  kind: action
  command: "(SPK+)[CR]"

- id: spk_decrement
  label: Internal Speakers Decrement
  kind: action
  command: "(SPK-)[CR]"

- id: mut_set
  label: Mute Set
  kind: action
  command: "(MUT={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=On (muted), 1=Off (unmuted)  # source inverts typical mapping; reproduced verbatim

- id: mut_query
  label: Mute Query
  kind: query
  command: "(MUT?)[CR]"

- id: mut_increment
  label: Mute Increment
  kind: action
  command: "(MUT+)[CR]"

- id: mut_decrement
  label: Mute Decrement
  kind: action
  command: "(MUT-)[CR]"

- id: tsp_set
  label: OSD Transparency Set
  kind: action
  command: "(TSP={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 10]

- id: tsp_query
  label: OSD Transparency Query
  kind: query
  command: "(TSP?)[CR]"

- id: tsp_increment
  label: OSD Transparency Increment
  kind: action
  command: "(TSP+)[CR]"

- id: tsp_decrement
  label: OSD Transparency Decrement
  kind: action
  command: "(TSP-)[CR]"

- id: osd_set
  label: OSD H Position Set
  kind: action
  command: "(OSD={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: osd_query
  label: OSD H Position Query
  kind: query
  command: "(OSD?)[CR]"

- id: osd_increment
  label: OSD H Position Increment
  kind: action
  command: "(OSD+)[CR]"

- id: osd_decrement
  label: OSD H Position Decrement
  kind: action
  command: "(OSD-)[CR]"

- id: osv_set
  label: OSD V Position Set
  kind: action
  command: "(OSV={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: osv_query
  label: OSD V Position Query
  kind: query
  command: "(OSV?)[CR]"

- id: osv_increment
  label: OSD V Position Increment
  kind: action
  command: "(OSV+)[CR]"

- id: osv_decrement
  label: OSD V Position Decrement
  kind: action
  command: "(OSV-)[CR]"

- id: rot_set
  label: OSD Rotation Set
  kind: action
  command: "(ROT={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Landscape, 1=Portrait

- id: rot_query
  label: OSD Rotation Query
  kind: query
  command: "(ROT?)[CR]"

- id: rot_increment
  label: OSD Rotation Increment
  kind: action
  command: "(ROT+)[CR]"

- id: rot_decrement
  label: OSD Rotation Decrement
  kind: action
  command: "(ROT-)[CR]"

- id: lan_set
  label: OSD Language Set
  kind: action
  command: "(LAN={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8]
      description: 0=English, 1=French, 2=German, 3=Spanish, 4=Chinese (Traditional), 5=Chinese (Simplified), 6=Japanese, 7=Italian, 8=Portuguese

- id: lan_query
  label: OSD Language Query
  kind: query
  command: "(LAN?)[CR]"

- id: lan_increment
  label: OSD Language Increment
  kind: action
  command: "(LAN+)[CR]"

- id: lan_decrement
  label: OSD Language Decrement
  kind: action
  command: "(LAN-)[CR]"

- id: otm_set
  label: OSD Timeout Set
  kind: action
  command: "(OTM={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 5, 10, 20, 30, 60]
      description: 0=Off, 5=5s, 10=10s, 20=20s, 30=30s, 60=60s

- id: otm_query
  label: OSD Timeout Query
  kind: query
  command: "(OTM?)[CR]"

- id: otm_increment
  label: OSD Timeout Increment
  kind: action
  command: "(OTM+)[CR]"

- id: otm_decrement
  label: OSD Timeout Decrement
  kind: action
  command: "(OTM-)[CR]"

- id: spe_set
  label: Splash Screen Set
  kind: action
  command: "(SPE={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: spe_query
  label: Splash Screen Query
  kind: query
  command: "(SPE?)[CR]"

- id: spe_increment
  label: Splash Screen Increment
  kind: action
  command: "(SPE+)[CR]"

- id: spe_decrement
  label: Splash Screen Decrement
  kind: action
  command: "(SPE-)[CR]"

- id: osm_set
  label: Message Box Set
  kind: action
  command: "(OSM={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: osm_query
  label: Message Box Query
  kind: query
  command: "(OSM?)[CR]"

- id: osm_increment
  label: Message Box Increment
  kind: action
  command: "(OSM+)[CR]"

- id: osm_decrement
  label: Message Box Decrement
  kind: action
  command: "(OSM-)[CR]"

- id: eh1_set
  label: HDMI 1 EDID Set
  kind: action
  command: "(EH1={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [1, 2]
      description: 1=HDMI1.4, 2=HDMI2.0

- id: eh1_query
  label: HDMI 1 EDID Query
  kind: query
  command: "(EH1?)[CR]"

- id: eh1_increment
  label: HDMI 1 EDID Increment
  kind: action
  command: "(EH1+)[CR]"

- id: eh1_decrement
  label: HDMI 1 EDID Decrement
  kind: action
  command: "(EH1-)[CR]"

- id: eh2_set
  label: HDMI 2 EDID Set
  kind: action
  command: "(EH2={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [1, 2]
      description: 1=HDMI1.4, 2=HDMI2.0

- id: eh2_query
  label: HDMI 2 EDID Query
  kind: query
  command: "(EH2?)[CR]"

- id: eh2_increment
  label: HDMI 2 EDID Increment
  kind: action
  command: "(EH2+)[CR]"

- id: eh2_decrement
  label: HDMI 2 EDID Decrement
  kind: action
  command: "(EH2-)[CR]"

- id: ed1_set
  label: DP EDID Set
  kind: action
  command: "(ED1={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [1, 2]
      description: 1=4K30Hz, 2=4K60Hz

- id: ed1_query
  label: DP EDID Query
  kind: query
  command: "(ED1?)[CR]"

- id: ed1_increment
  label: DP EDID Increment
  kind: action
  command: "(ED1+)[CR]"

- id: ed1_decrement
  label: DP EDID Decrement
  kind: action
  command: "(ED1-)[CR]"

- id: asp_set
  label: Aspect Ratio Set
  kind: action
  command: "(ASP={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [1, 2, 8, 9]
      description: 1=Full Screen, 2=4:3, 8=Letterbox, 9=Native

- id: asp_query
  label: Aspect Ratio Query
  kind: query
  command: "(ASP?)[CR]"

- id: asp_increment
  label: Aspect Ratio Increment
  kind: action
  command: "(ASP+)[CR]"

- id: asp_decrement
  label: Aspect Ratio Decrement
  kind: action
  command: "(ASP-)[CR]"

- id: ovs_set
  label: Overscan Set
  kind: action
  command: "(OVS={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 10]

- id: ovs_query
  label: Overscan Query
  kind: query
  command: "(OVS?)[CR]"

- id: ovs_increment
  label: Overscan Increment
  kind: action
  command: "(OVS+)[CR]"

- id: ovs_decrement
  label: Overscan Decrement
  kind: action
  command: "(OVS-)[CR]"

- id: dbr_set
  label: Baud Rate Set
  kind: action
  command: "(DBR={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3]
      description: 0=9600, 1=19200, 2=38400, 3=115200

- id: dbr_query
  label: Baud Rate Query
  kind: query
  command: "(DBR?)[CR]"

- id: dbr_increment
  label: Baud Rate Increment
  kind: action
  command: "(DBR+)[CR]"

- id: dbr_decrement
  label: Baud Rate Decrement
  kind: action
  command: "(DBR-)[CR]"

- id: psc_set
  label: Power Saving Config Set
  kind: action
  command: "(PSC={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3]
      description: 0=Standby Mode, 1=Wake on All, 2=Always On, 3=Network Standby Mode

- id: psc_query
  label: Power Saving Config Query
  kind: query
  command: "(PSC?)[CR]"

- id: psc_increment
  label: Power Saving Config Increment
  kind: action
  command: "(PSC+)[CR]"

- id: psc_decrement
  label: Power Saving Config Decrement
  kind: action
  command: "(PSC-)[CR]"

- id: ats_set
  label: Auto Scan Set
  kind: action
  command: "(ATS={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: ats_query
  label: Auto Scan Query
  kind: query
  command: "(ATS?)[CR]"

- id: ats_increment
  label: Auto Scan Increment
  kind: action
  command: "(ATS+)[CR]"

- id: ats_decrement
  label: Auto Scan Decrement
  kind: action
  command: "(ATS-)[CR]"

- id: pxo_set
  label: Pixel Orbit Set
  kind: action
  command: "(PXO={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: pxo_query
  label: Pixel Orbit Query
  kind: query
  command: "(PXO?)[CR]"

- id: pxo_increment
  label: Pixel Orbit Increment
  kind: action
  command: "(PXO+)[CR]"

- id: pxo_decrement
  label: Pixel Orbit Decrement
  kind: action
  command: "(PXO-)[CR]"

- id: sbl_set
  label: Power LED Set
  kind: action
  command: "(SBL={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: sbl_query
  label: Power LED Query
  kind: query
  command: "(SBL?)[CR]"

- id: sbl_increment
  label: Power LED Increment
  kind: action
  command: "(SBL+)[CR]"

- id: sbl_decrement
  label: Power LED Decrement
  kind: action
  command: "(SBL-)[CR]"

- id: cls_set
  label: RGB Color Range Set
  kind: action
  command: "(CLS={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [2, 3, 4]
      description: 2=0~255, 3=16~235, 4=Auto

- id: cls_query
  label: RGB Color Range Query
  kind: query
  command: "(CLS?)[CR]"

- id: cls_increment
  label: RGB Color Range Increment
  kind: action
  command: "(CLS+)[CR]"

- id: cls_decrement
  label: RGB Color Range Decrement
  kind: action
  command: "(CLS-)[CR]"

- id: tuc_set
  label: Touch Control Set
  kind: action
  command: "(TUC={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]
      description: 0=Auto, 1=Internal, 2=External

- id: tuc_query
  label: Touch Control Query
  kind: query
  command: "(TUC?)[CR]"

- id: tuc_increment
  label: Touch Control Increment
  kind: action
  command: "(TUC+)[CR]"

- id: tuc_decrement
  label: Touch Control Decrement
  kind: action
  command: "(TUC-)[CR]"

- id: key_set
  label: Remote Control Key Set
  kind: action
  command: "(KEY={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
      description: 0=Power, 1=Mute, 2=1, 3=2, 4=3, 5=4, 6=5, 7=6, 8=7, 9=8, 10=9, 11=0, 12=Sleep, 13=Info, 14=Picture Mode, 15=Sound Mode, 16=Input source, 17=Auto, 18=Up, 19=Down, 20=Left, 21=Right, 22=Enter, 23=Exit, 24=Menu, 25=Volume+, 26=Volume-, 27=Aspect Ratio, 28=Freeze, 29=Root

- id: key_query
  label: Remote Control Key Query
  kind: query
  command: "(KEY?)[CR]"

- id: key_increment
  label: Remote Control Key Increment
  kind: action
  command: "(KEY+)[CR]"

- id: key_decrement
  label: Remote Control Key Decrement
  kind: action
  command: "(KEY-)[CR]"

- id: sys_set
  label: Reset All
  kind: action
  command: "(SYS=1)[CR]"

- id: sys_query
  label: Reset All Query
  kind: query
  command: "(SYS?)[CR]"

- id: sys_increment
  label: Reset All Increment
  kind: action
  command: "(SYS+)[CR]"

- id: sys_decrement
  label: Reset All Decrement
  kind: action
  command: "(SYS-)[CR]"

- id: klo_set
  label: Key Lock Set
  kind: action
  command: "(KLO={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Unlock, 1=Lock

- id: klo_query
  label: Key Lock Query
  kind: query
  command: "(KLO?)[CR]"

- id: klo_increment
  label: Key Lock Increment
  kind: action
  command: "(KLO+)[CR]"

- id: klo_decrement
  label: Key Lock Decrement
  kind: action
  command: "(KLO-)[CR]"

- id: isn_query
  label: Read Serial Number
  kind: query
  command: "(ISN?)[CR]"

- id: isn_set
  label: Read Serial Number Set
  kind: action
  command: "(ISN=)[CR]"

- id: isn_increment
  label: Read Serial Number Increment
  kind: action
  command: "(ISN+)[CR]"

- id: isn_decrement
  label: Read Serial Number Decrement
  kind: action
  command: "(ISN-)[CR]"

- id: mdl_query
  label: Read Model Name
  kind: query
  command: "(MDL?)[CR]"

- id: mdl_set
  label: Read Model Name Set
  kind: action
  command: "(MDL=)[CR]"

- id: mdl_increment
  label: Read Model Name Increment
  kind: action
  command: "(MDL+)[CR]"

- id: mdl_decrement
  label: Read Model Name Decrement
  kind: action
  command: "(MDL-)[CR]"

- id: ifv_set
  label: Read Firmware Version
  kind: action
  command: "(IFV=)[CR]"

- id: ifv_increment
  label: Read Firmware Version Increment
  kind: action
  command: "(IFV+)[CR]"

- id: ifv_decrement
  label: Read Firmware Version Decrement
  kind: action
  command: "(IFV-)[CR]"

- id: nen_set
  label: Network Enable Set
  kind: action
  command: "(NEN={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: nen_query
  label: Network Enable Query
  kind: query
  command: "(NEN?)[CR]"

- id: nen_increment
  label: Network Enable Increment
  kind: action
  command: "(NEN+)[CR]"

- id: nen_decrement
  label: Network Enable Decrement
  kind: action
  command: "(NEN-)[CR]"

- id: dip_set
  label: DHCP Set
  kind: action
  command: "(DIP={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Disable, 1=Enable

- id: dip_increment
  label: DHCP Increment
  kind: action
  command: "(DIP+)[CR]"

- id: dip_decrement
  label: DHCP Decrement
  kind: action
  command: "(DIP-)[CR]"

- id: psa_set
  label: Power Status Alert Set
  kind: action
  command: "(PSA={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: psa_query
  label: Power Status Alert Query
  kind: query
  command: "(PSA?)[CR]"

- id: psa_increment
  label: Power Status Alert Increment
  kind: action
  command: "(PSA+)[CR]"

- id: psa_decrement
  label: Power Status Alert Decrement
  kind: action
  command: "(PSA-)[CR]"

- id: ssa_set
  label: Source Status Alert Set
  kind: action
  command: "(SSA={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: ssa_query
  label: Source Status Alert Query
  kind: query
  command: "(SSA?)[CR]"

- id: ssa_increment
  label: Source Status Alert Increment
  kind: action
  command: "(SSA+)[CR]"

- id: ssa_decrement
  label: Source Status Alert Decrement
  kind: action
  command: "(SSA-)[CR]"

- id: sla_set
  label: Signal Lost Alert Set
  kind: action
  command: "(SLA={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: sla_query
  label: Signal Lost Alert Query
  kind: query
  command: "(SLA?)[CR]"

- id: sla_increment
  label: Signal Lost Alert Increment
  kind: action
  command: "(SLA+)[CR]"

- id: sla_decrement
  label: Signal Lost Alert Decrement
  kind: action
  command: "(SLA-)[CR]"

- id: ip1_set
  label: Static IP Address Octet 1 Set
  kind: action
  command: "(IP1={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: ip1_query
  label: Static IP Address Octet 1 Query
  kind: query
  command: "(IP1?)[CR]"

- id: ip1_increment
  label: Static IP Address Octet 1 Increment
  kind: action
  command: "(IP1+)[CR]"

- id: ip1_decrement
  label: Static IP Address Octet 1 Decrement
  kind: action
  command: "(IP1-)[CR]"

- id: ip2_set
  label: Static IP Address Octet 2 Set
  kind: action
  command: "(IP2={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: ip2_query
  label: Static IP Address Octet 2 Query
  kind: query
  command: "(IP2?)[CR]"

- id: ip2_increment
  label: Static IP Address Octet 2 Increment
  kind: action
  command: "(IP2+)[CR]"

- id: ip2_decrement
  label: Static IP Address Octet 2 Decrement
  kind: action
  command: "(IP2-)[CR]"

- id: ip3_set
  label: Static IP Address Octet 3 Set
  kind: action
  command: "(IP3={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: ip3_query
  label: Static IP Address Octet 3 Query
  kind: query
  command: "(IP3?)[CR]"

- id: ip3_increment
  label: Static IP Address Octet 3 Increment
  kind: action
  command: "(IP3+)[CR]"

- id: ip3_decrement
  label: Static IP Address Octet 3 Decrement
  kind: action
  command: "(IP3-)[CR]"

- id: ip4_set
  label: Static IP Address Octet 4 Set
  kind: action
  command: "(IP4={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: ip4_query
  label: Static IP Address Octet 4 Query
  kind: query
  command: "(IP4?)[CR]"

- id: ip4_increment
  label: Static IP Address Octet 4 Increment
  kind: action
  command: "(IP4+)[CR]"

- id: ip4_decrement
  label: Static IP Address Octet 4 Decrement
  kind: action
  command: "(IP4-)[CR]"

- id: mk1_set
  label: Subnet Mask Octet 1 Set
  kind: action
  command: "(MK1={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: mk1_query
  label: Subnet Mask Octet 1 Query
  kind: query
  command: "(MK1?)[CR]"

- id: mk1_increment
  label: Subnet Mask Octet 1 Increment
  kind: action
  command: "(MK1+)[CR]"

- id: mk1_decrement
  label: Subnet Mask Octet 1 Decrement
  kind: action
  command: "(MK1-)[CR]"

- id: mk2_set
  label: Subnet Mask Octet 2 Set
  kind: action
  command: "(MK2={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: mk2_query
  label: Subnet Mask Octet 2 Query
  kind: query
  command: "(MK2?)[CR]"

- id: mk2_increment
  label: Subnet Mask Octet 2 Increment
  kind: action
  command: "(MK2+)[CR]"

- id: mk2_decrement
  label: Subnet Mask Octet 2 Decrement
  kind: action
  command: "(MK2-)[CR]"

- id: mk3_set
  label: Subnet Mask Octet 3 Set
  kind: action
  command: "(MK3={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: mk3_query
  label: Subnet Mask Octet 3 Query
  kind: query
  command: "(MK3?)[CR]"

- id: mk3_increment
  label: Subnet Mask Octet 3 Increment
  kind: action
  command: "(MK3+)[CR]"

- id: mk3_decrement
  label: Subnet Mask Octet 3 Decrement
  kind: action
  command: "(MK3-)[CR]"

- id: mk4_set
  label: Subnet Mask Octet 4 Set
  kind: action
  command: "(MK4={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: mk4_query
  label: Subnet Mask Octet 4 Query
  kind: query
  command: "(MK4?)[CR]"

- id: mk4_increment
  label: Subnet Mask Octet 4 Increment
  kind: action
  command: "(MK4+)[CR]"

- id: mk4_decrement
  label: Subnet Mask Octet 4 Decrement
  kind: action
  command: "(MK4-)[CR]"

- id: gw1_set
  label: Gateway Octet 1 Set
  kind: action
  command: "(GW1={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: gw1_query
  label: Gateway Octet 1 Query
  kind: query
  command: "(GW1?)[CR]"

- id: gw1_increment
  label: Gateway Octet 1 Increment
  kind: action
  command: "(GW1+)[CR]"

- id: gw1_decrement
  label: Gateway Octet 1 Decrement
  kind: action
  command: "(GW1-)[CR]"

- id: gw2_set
  label: Gateway Octet 2 Set
  kind: action
  command: "(GW2={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: gw2_query
  label: Gateway Octet 2 Query
  kind: query
  command: "(GW2?)[CR]"

- id: gw2_increment
  label: Gateway Octet 2 Increment
  kind: action
  command: "(GW2+)[CR]"

- id: gw2_decrement
  label: Gateway Octet 2 Decrement
  kind: action
  command: "(GW2-)[CR]"

- id: gw3_set
  label: Gateway Octet 3 Set
  kind: action
  command: "(GW3={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: gw3_query
  label: Gateway Octet 3 Query
  kind: query
  command: "(GW3?)[CR]"

- id: gw3_increment
  label: Gateway Octet 3 Increment
  kind: action
  command: "(GW3+)[CR]"

- id: gw3_decrement
  label: Gateway Octet 3 Decrement
  kind: action
  command: "(GW3-)[CR]"

- id: gw4_set
  label: Gateway Octet 4 Set
  kind: action
  command: "(GW4={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: gw4_query
  label: Gateway Octet 4 Query
  kind: query
  command: "(GW4?)[CR]"

- id: gw4_increment
  label: Gateway Octet 4 Increment
  kind: action
  command: "(GW4+)[CR]"

- id: gw4_decrement
  label: Gateway Octet 4 Decrement
  kind: action
  command: "(GW4-)[CR]"

- id: dn1_set
  label: DNS Address Octet 1 Set
  kind: action
  command: "(DN1={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: dn1_query
  label: DNS Address Octet 1 Query
  kind: query
  command: "(DN1?)[CR]"

- id: dn1_increment
  label: DNS Address Octet 1 Increment
  kind: action
  command: "(DN1+)[CR]"

- id: dn1_decrement
  label: DNS Address Octet 1 Decrement
  kind: action
  command: "(DN1-)[CR]"

- id: dn2_set
  label: DNS Address Octet 2 Set
  kind: action
  command: "(DN2={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: dn2_query
  label: DNS Address Octet 2 Query
  kind: query
  command: "(DN2?)[CR]"

- id: dn2_increment
  label: DNS Address Octet 2 Increment
  kind: action
  command: "(DN2+)[CR]"

- id: dn2_decrement
  label: DNS Address Octet 2 Decrement
  kind: action
  command: "(DN2-)[CR]"

- id: dn3_set
  label: DNS Address Octet 3 Set
  kind: action
  command: "(DN3={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: dn3_query
  label: DNS Address Octet 3 Query
  kind: query
  command: "(DN3?)[CR]"

- id: dn3_increment
  label: DNS Address Octet 3 Increment
  kind: action
  command: "(DN3+)[CR]"

- id: dn3_decrement
  label: DNS Address Octet 3 Decrement
  kind: action
  command: "(DN3-)[CR]"

- id: dn4_set
  label: DNS Address Octet 4 Set
  kind: action
  command: "(DN4={value})[CR]"
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: dn4_query
  label: DNS Address Octet 4 Query
  kind: query
  command: "(DN4?)[CR]"

- id: dn4_increment
  label: DNS Address Octet 4 Increment
  kind: action
  command: "(DN4+)[CR]"

- id: dn4_decrement
  label: DNS Address Octet 4 Decrement
  kind: action
  command: "(DN4-)[CR]"

- id: sip_set
  label: Save Static IP Settings
  kind: action
  command: "(SIP=1)[CR]"

- id: sip_query
  label: Save Static IP Settings Query
  kind: query
  command: "(SIP?)[CR]"

- id: sip_increment
  label: Save Static IP Settings Increment
  kind: action
  command: "(SIP+)[CR]"

- id: sip_decrement
  label: Save Static IP Settings Decrement
  kind: action
  command: "(SIP-)[CR]"

- id: ma1_set
  label: Ethernet MAC Address Set
  kind: action
  command: "(MA1=0)[CR]"

- id: ma1_query
  label: Ethernet MAC Address Query
  kind: query
  command: "(MA1?)[CR]"

- id: ma1_increment
  label: Ethernet MAC Address Increment
  kind: action
  command: "(MA1+)[CR]"

- id: ma1_decrement
  label: Ethernet MAC Address Decrement
  kind: action
  command: "(MA1-)[CR]"

- id: ma2_set
  label: WiFi MAC Address Set
  kind: action
  command: "(MA2=0)[CR]"

- id: ma2_query
  label: WiFi MAC Address Query
  kind: query
  command: "(MA2?)[CR]"

- id: ma2_increment
  label: WiFi MAC Address Increment
  kind: action
  command: "(MA2+)[CR]"

- id: ma2_decrement
  label: WiFi MAC Address Decrement
  kind: action
  command: "(MA2-)[CR]"

- id: cec_set
  label: CEC Enable Set
  kind: action
  command: "(CEC={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: cec_query
  label: CEC Enable Query
  kind: query
  command: "(CEC?)[CR]"

- id: cec_increment
  label: CEC Enable Increment
  kind: action
  command: "(CEC+)[CR]"

- id: cec_decrement
  label: CEC Enable Decrement
  kind: action
  command: "(CEC-)[CR]"

- id: cas_set
  label: Auto Standby Set
  kind: action
  command: "(CAS={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=On, 1=Off  # source inverts typical mapping (row "On" = 0); reproduced verbatim

- id: cas_query
  label: Auto Standby Query
  kind: query
  command: "(CAS?)[CR]"

- id: cas_increment
  label: Auto Standby Increment
  kind: action
  command: "(CAS+)[CR]"

- id: cas_decrement
  label: Auto Standby Decrement
  kind: action
  command: "(CAS-)[CR]"

- id: cte_set
  label: Control Over TCP Set
  kind: action
  command: "(CTE={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: cte_query
  label: Control Over TCP Query
  kind: query
  command: "(CTE?)[CR]"

- id: cte_increment
  label: Control Over TCP Increment
  kind: action
  command: "(CTE+)[CR]"

- id: cte_decrement
  label: Control Over TCP Decrement
  kind: action
  command: "(CTE-)[CR]"

- id: hft_set
  label: 24-Hour Format Set
  kind: action
  command: "(HFT={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: hft_query
  label: 24-Hour Format Query
  kind: query
  command: "(HFT?)[CR]"

- id: hft_increment
  label: 24-Hour Format Increment
  kind: action
  command: "(HFT+)[CR]"

- id: hft_decrement
  label: 24-Hour Format Decrement
  kind: action
  command: "(HFT+)[CR]"  # source shows "(HFT+)" in decrement column; reproduced verbatim

- id: nor_set
  label: Noise Reduction Set
  kind: action
  command: "(NOR={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4]
      description: 0=Off, 1=Low, 2=Medium, 3=High, 4=Auto

- id: nor_query
  label: Noise Reduction Query
  kind: query
  command: "(NOR?)[CR]"

- id: nor_increment
  label: Noise Reduction Increment
  kind: action
  command: "(NOR+)[CR]"

- id: nor_decrement
  label: Noise Reduction Decrement
  kind: action
  command: "(NOR)[CR]"  # source shows "(NOR)" in decrement column for Off row; reproduced verbatim

- id: nvb_set
  label: Navigation Bar Set
  kind: action
  command: "(NVB={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: nvb_query
  label: Navigation Bar Query
  kind: query
  command: "(NVB?)[CR]"

- id: nvb_increment
  label: Navigation Bar Increment
  kind: action
  command: "(NVB+)[CR]"

- id: nvb_decrement
  label: Navigation Bar Decrement
  kind: action
  command: "(NVB-)[CR]"

- id: poi_set
  label: Power On Input Set
  kind: action
  command: "(POI={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 23, 24, 25, 34, 35, 44]
      description: 0=VGA, 23=HDMI2, 24=HDMI1, 25=DP, 34=Android, 35=Web Browser, 44=Last Input

- id: poi_query
  label: Power On Input Query
  kind: query
  command: "(POI?)[CR]"

- id: poi_increment
  label: Power On Input Increment
  kind: action
  command: "(POI+)[CR]"

- id: poi_decrement
  label: Power On Input Decrement
  kind: action
  command: "(POI-)[CR]"

- id: slc_set
  label: Smart Light Control Set
  kind: action
  command: "(SLC={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: slc_query
  label: Smart Light Control Query
  kind: query
  command: "(SLC?)[CR]"

- id: slc_increment
  label: Smart Light Control Increment
  kind: action
  command: "(SLC+)[CR]"

- id: slc_decrement
  label: Smart Light Control Decrement
  kind: action
  command: "(SLC-)[CR]"

- id: sme_set
  label: SMTP Enable Set
  kind: action
  command: "(SME={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: sme_query
  label: SMTP Enable Query
  kind: query
  command: "(SME?)[CR]"

- id: sme_increment
  label: SMTP Enable Increment
  kind: action
  command: "(SME+)[CR]"

- id: sme_decrement
  label: SMTP Enable Decrement
  kind: action
  command: "(SME-)[CR]"

- id: ssr_set
  label: Server Set
  kind: action
  command: "(SSR={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Gmail, 1=Other

- id: ssr_query
  label: Server Query
  kind: query
  command: "(SSR?)[CR]"

- id: ssr_increment
  label: Server Increment
  kind: action
  command: "(SSR+)[CR]"

- id: ssr_decrement
  label: Server Decrement
  kind: action
  command: "(SSR-)[CR]"

- id: unt_set
  label: Use Network Time Set
  kind: action
  command: "(UNT={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Off, 1=On

- id: unt_query
  label: Use Network Time Query
  kind: query
  command: "(UNT?)[CR]"

- id: unt_increment
  label: Use Network Time Increment
  kind: action
  command: "(UNT+)[CR]"

- id: unt_decrement
  label: Use Network Time Decrement
  kind: action
  command: "(UNT-)[CR]"

- id: whe_set
  label: WiFi Hotspot Enable Set
  kind: action
  command: "(WHE={value})[CR]"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: 0=Disable, 1=Enable

- id: whe_query
  label: WiFi Hotspot Enable Query
  kind: query
  command: "(WHE?)[CR]"

- id: whe_increment
  label: WiFi Hotspot Enable Increment
  kind: action
  command: "(WHE+)[CR]"

- id: whe_decrement
  label: WiFi Hotspot Enable Decrement
  kind: action
  command: "(WHE-)[CR]"

- id: wss_set
  label: WLAN Save Static IP Settings
  kind: action
  command: "(WSS=1)[CR]"

- id: wss_query
  label: WLAN Save Static IP Settings Query
  kind: query
  command: "(WSS?)[CR]"

- id: wss_increment
  label: WLAN Save Static IP Settings Increment
  kind: action
  command: "(WSS+)[CR]"

- id: wss_decrement
  label: WLAN Save Static IP Settings Decrement
  kind: action
  command: "(WSS-)[CR]"
```

## Feedbacks
```yaml
- id: response_ok
  type: enum
  values: [ok]
  description: Follower echoes `(0;<cmd>=<value>)[CR][LF]` after successful processing.

- id: response_error
  type: enum
  values: [unknown_command, invalid_operator, destination_unsupported, setting_unavailable, setting_value_unavailable, setting_value_unsupported, string_too_long, command_unsupported_in_standby, invalid_parameter, error_processing, password_not_entered]
  description: Response codes 1-11 mapped per source.

- id: power_state
  type: enum
  values: [0, 1]
  description: From (PWR?) - 0=Off, 1=On.

- id: input_source
  type: enum
  values: [0, 1, 2, 3, 4, 5, 7]
  description: From (INS?).

- id: backlight_level
  type: integer
  range: [15, 100]
  description: From (BKL?).

- id: brightness
  type: integer
  range: [0, 100]

- id: backlight_enable
  type: enum
  values: [0, 1]

- id: contrast
  type: integer
  range: [0, 100]

- id: sharpness
  type: integer
  range: [0, 100]

- id: hue
  type: integer
  range: [0, 100]

- id: saturation
  type: integer
  range: [0, 100]

- id: scheme
  type: enum
  values: [1, 2, 3, 7, 8, 9]

- id: color_temperature
  type: enum
  values: [0, 1, 2, 3, 4, 5]

- id: gamma
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

- id: rgb_gain_offset
  type: integer
  range: [0, 256]
  description: DRG/DGG/DBG (gains) and DRO/DGO/DBO (offsets).

- id: phase
  type: enum
  values: [50]

- id: clock
  type: integer
  range: [0, 100]

- id: position
  type: integer
  range: [0, 100]
  description: IPL (horizontal) and IPU (vertical).

- id: time_components
  type: integer
  description: CTY/CTM/CTD/CTH/CTN; ranges per source.

- id: timer_mode
  type: enum
  values: [0, 1, 2]

- id: alarm_day
  type: enum
  values: [1, 2, 4, 8, 16, 32, 64]
  description: AEN (enable) and AEF (disable) day bits.

- id: schedule_hours_minutes
  type: integer
  description: Per-day on/off hour+minute pair (SN*/NN*/EN*/DN*/UN*/IN*/TN*).

- id: volume
  type: integer
  range: [0, 100]

- id: bass_treble_balance
  type: integer
  range: [-50, 50]

- id: audio_source
  type: enum
  values: [0, 1]

- id: internal_speakers
  type: enum
  values: [0, 1]

- id: mute
  type: enum
  values: [0, 1]

- id: osd_transparency
  type: integer
  range: [0, 10]

- id: osd_position
  type: integer
  range: [0, 100]

- id: osd_rotation
  type: enum
  values: [0, 1]

- id: osd_language
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8]

- id: osd_timeout
  type: enum
  values: [0, 5, 10, 20, 30, 60]

- id: splash_screen
  type: enum
  values: [0, 1]

- id: message_box
  type: enum
  values: [0, 1]

- id: hdmi_edid
  type: enum
  values: [1, 2]
  description: EH1 (HDMI 1) and EH2 (HDMI 2).

- id: dp_edid
  type: enum
  values: [1, 2]

- id: aspect_ratio
  type: enum
  values: [1, 2, 8, 9]

- id: overscan
  type: integer
  range: [0, 10]

- id: baud_rate
  type: enum
  values: [0, 1, 2, 3]

- id: power_saving_config
  type: enum
  values: [0, 1, 2, 3]

- id: auto_scan
  type: enum
  values: [0, 1]

- id: pixel_orbit
  type: enum
  values: [0, 1]

- id: power_led
  type: enum
  values: [0, 1]

- id: rgb_color_range
  type: enum
  values: [2, 3, 4]

- id: touch_control
  type: enum
  values: [0, 1, 2]

- id: remote_key_state
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]

- id: key_lock
  type: enum
  values: [0, 1]

- id: network_enable
  type: enum
  values: [0, 1]

- id: alerts
  type: enum
  values: [0, 1]
  description: PSA/SSA/SLA alert enable flags.

- id: ip_octets
  type: integer
  range: [0, 255]
  description: IP1-4 static IP, MK1-4 subnet mask, GW1-4 gateway, DN1-4 DNS.

- id: cec_enable
  type: enum
  values: [0, 1]

- id: auto_standby
  type: enum
  values: [0, 1]

- id: control_over_tcp
  type: enum
  values: [0, 1]

- id: hour_format
  type: enum
  values: [0, 1]

- id: noise_reduction
  type: enum
  values: [0, 1, 2, 3, 4]

- id: navigation_bar
  type: enum
  values: [0, 1]

- id: power_on_input
  type: enum
  values: [0, 23, 24, 25, 34, 35, 44]

- id: smart_light_control
  type: enum
  values: [0, 1]

- id: smtp_enable
  type: enum
  values: [0, 1]

- id: server
  type: enum
  values: [0, 1]

- id: network_time
  type: enum
  values: [0, 1]

- id: wifi_hotspot
  type: enum
  values: [0, 1]
```

## Variables
```yaml
- id: serial_number
  type: string
  description: From (ISN?) - string value.

- id: model_name
  type: string
  description: From (MDL?) - string value.
```

## Events
```yaml
# UNRESOLVED: source describes request/response model only; no unsolicited device->host notifications documented.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences beyond individual commands.
```

## Safety
```yaml
confirmation_required_for:
  - sys_set  # Reset All - destructive factory reset
  - cec_set  # CEC enable alters device-side control surface
  - cas_set  # Auto Standby alters power behavior
  - psc_set  # Power Saving Config alters standby networking behavior
interlocks:
  # Source notes: with PSC=Standby Mode (0) or Networked Standby (3), serial/LAN commands are not
  # recognized in standby - they require PSC=Wake on All (1) or Always On (2).
  # Operators must ensure PSC is set to a non-zero value before relying on standby wake control.
  - description: "Standby networking requires PSC != 0 (Standby Mode). With PSC=0, neither RS-232 nor LAN commands are processed in standby. With PSC=3 (Network Standby), only the Wake-on-LAN magic packet is recognized; other serial commands are ignored."
    commands: [psc_set]
# UNRESOLVED: no explicit high-voltage, interlocks, or personnel-safety warnings in source.
```

## Notes
- Command frame: initiator sends `(www:xyz)[CR]`; follower replies `(u;www:x=z)[CR][LF]`. Response code `u` is 0 on success, 1-11 on error (codes verbatim from source).
- `www` is case-insensitive. `x` is a reserved destination parameter slot — none of the documented commands use it.
- Operands: `?` = Get, `=` = Set, `+` = Increment, `-` = Decrement.
- The `:` destination parameter is reserved/unused across all documented commands.
- `+`/`-` for some rows (AEN, AEF, HFT, NOR) appear to be a source-table artefact — reproduced verbatim; implementers should treat them as the operand shown.
- Source notes certain commands are firmware-gated: "Please upgrade to the latest firmware version if unsupported commands are encountered." Specific gating not enumerated.
- LAN access mirrors RS-232 verbatim over TCP port 23.
- Source response code 11 = "Password not entered" suggests a password mechanism exists somewhere in the broader system, but no password procedure is documented in this excerpt; auth inferred as none for this protocol surface.

<!-- UNRESOLVED: firmware version gating per command not enumerable; specific password mechanism referenced by response code 11 not documented in source; full model variant (PS Series sub-model) not stated. -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/c1dgmc05/020-1389-00c_ps-series-4k_rs232-manual-wm.pdf
retrieved_at: 2026-09-02T16:38:33.444Z
last_checked_at: 2026-09-18T22:17:38.804Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-18T22:17:38.804Z
matched_actions: 513
action_count: 513
confidence: medium
summary: "All 513 spec actions map via wire-literal `(CMD?|=val|+|-)` strings to 119 source command codes; transport (19200/8/N/1, TCP 23) matches source verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model variant not stated in source; serial config (baud/data bits/parity/stop bits/flow) per-table reads only \"19200, 8, None, 1, None\" as fixed; some commands (e.g. DBR Baud Rate setter, Power On Input POI values 23/24/25/34/35/44) indicate later-firmware-only commands. Source note: \"Certain commands are only available in later versions of firmware. Please upgrade to the latest firmware version if unsupported commands are encountered.\" Firmware gating per command not enumerable from source."
- "source describes request/response model only; no unsolicited device->host notifications documented."
- "source does not document multi-step sequences beyond individual commands."
- "no explicit high-voltage, interlocks, or personnel-safety warnings in source."
- "firmware version gating per command not enumerable; specific password mechanism referenced by response code 11 not documented in source; full model variant (PS Series sub-model) not stated."
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
