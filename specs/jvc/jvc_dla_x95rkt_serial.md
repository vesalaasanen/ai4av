---
spec_id: admin/jvc-dla-x95rkt
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC DLA-X95RKT Control Spec"
manufacturer: JVC
model_family: DLA-X95RKT
aliases: []
compatible_with:
  manufacturers:
    - JVC
  models:
    - DLA-X95RKT
    - DLA-X950R
    - DLA-X9000
    - DLA-RS600
    - DLA-PX1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/2015model_JVC_External_Control_Command_spec_v1_0.pdf
retrieved_at: 2026-06-16T06:44:03.736Z
last_checked_at: 2026-06-16T07:08:32.835Z
generated_at: 2026-06-16T07:08:32.835Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PM AR query"
  - "PM AY query"
  - "PM AG query"
  - "PM AC query"
  - "PM AB query"
  - "PM AM query"
  - "PM HR query"
  - "PM HY query"
  - "PM HG query"
  - "PM HC query"
  - "PM HB query"
  - "PM HM query"
  - "DLA-X95RKT is not named verbatim in source — coverage inferred from X950R family membership. No firmware compatibility range stated."
  - "only Off(Static) is documented in the response table; On state response byte not stated in source.\""
  - "numeric min/max not stated in source"
  - "source describes no asynchronous event channel; all state changes are confirmable via reference queries."
  - "source does not document device-side macros; composite sequences must be built client-side."
  - "source does not document additional safety warnings, lockout procedures, or sequencing requirements."
  - "DLA-X95RKT specific model not named in source — coverage inferred from X950R family. No firmware version compatibility range stated. No safety / fault-recovery sequences documented. No range bounds for numeric picture adjustments."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:08:32.835Z
  matched_actions: 290
  action_count: 290
  confidence: medium
  summary: "All 290 spec actions confirmed verbatim in source; transport fully supported; 28 source query variants for axis-position/hue/saturation/brightness-color and mask adjustments not represented but coverage ratio 0.91. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# JVC DLA-X95RKT Control Spec

## Summary
D-ILA projector controlled via RS-232C. Source document ("External Control Command Communication Specification" Ver. 1.0, 11/Dec/2015) explicitly covers DLA-X750R/X7000/XC7890R/RS500, DLA-X950R/X9000/RS600/PX1 series. DLA-X95RKT is the K-tier variant of DLA-X950R and is functionally covered by this command set.

<!-- UNRESOLVED: DLA-X95RKT is not named verbatim in source — coverage inferred from X950R family membership. No firmware compatibility range stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: "D-SUB 9-pin male (RS-232C)"
  cable: "RS-232C crossover"
  communication_system: asynchronous
  code: ASCII
auth:
  type: none  # inferred: no auth procedure in source
unit_id:
  unit_code: "0x89"
  individual_code: "0x01"
  framing: "Header + Unit ID + Command + Data[0..n] + End(0x0A)"
  headers:
    operation: "0x21 '!'"
    reference: "0x3F '?'"
    response: "0x40 '@'"
    ack: "0x06"
```

## Traits
```yaml
powerable: true       # PW on/off commands present
routable: true        # IP input switch (HDMI-1, HDMI-2) present
queryable: true       # PW?, IP?, SC?, MD? reference commands present
levelable: true       # PM CN (contrast), PM BR (brightness), etc. numeric adjustments
```

## Actions
```yaml
# Top-level commands (per §3.5 Command table)
- id: null_cmd
  label: NULL Command (connectivity check)
  kind: action
  command: "21 89 01 00 00 0A"
  params: []

- id: pw_set
  label: Power Set
  kind: action
  command: "21 89 01 50 57 {state} 0A"
  params:
    - name: state
      type: string
      description: "0x30 = Power OFF, 0x31 = Power ON"

- id: pw_query
  label: Power Status Query
  kind: query
  command: "3F 89 01 50 57 0A"
  params: []

- id: ip_set
  label: Input Switch Set
  kind: action
  command: "21 89 01 49 50 {input} 0A"
  params:
    - name: input
      type: string
      description: "0x36 = HDMI-1, 0x37 = HDMI-2"

- id: ip_query
  label: Input Switch Query
  kind: query
  command: "3F 89 01 49 50 0A"
  params: []

- id: rc_passthrough
  label: Remote Control Code Pass-through
  kind: action
  command: "21 89 01 52 43 {c1}{c2}{c3}{c4} 0A"
  params:
    - name: c1
      type: string
      description: "Hex digit 0-9 / A-F (high nibble of custom code)"
    - name: c2
      type: string
      description: "Hex digit 0-9 / A-F (low nibble of custom code)"
    - name: c3
      type: string
      description: "Hex digit 0-9 / A-F (high nibble of function code)"
    - name: c4
      type: string
      description: "Hex digit 0-9 / A-F (low nibble of function code)"

- id: su_rs_set
  label: Setup - Switch External Control Protocol
  kind: action
  command: "21 89 01 53 55 52 53 31 0A"
  params: []
  notes: "Switch to Compatible command protocol."

- id: su_rc_set
  label: Setup - Switch IR Code
  kind: action
  command: "21 89 01 53 55 52 43 {code} 0A"
  params:
    - name: code
      type: string
      description: "0x30 = A code (0x73), 0x31 = B code (0x63)"

- id: su_rc_query
  label: Setup - IR Code Query
  kind: query
  command: "3F 89 01 53 55 52 43 0A"
  params: []

- id: gr_set
  label: Gamma Data (Red) Set
  kind: action
  command: "21 89 01 47 52 0A"  # followed by 512 binary bytes
  params: []
  notes: "Header 21 89 01 47 52 0A, then external controller sends 512 binary bytes (little-endian 256 points). Requires Gamma table set to Custom1/2/3."

- id: gr_query
  label: Gamma Data (Red) Query
  kind: query
  command: "3F 89 01 47 52 0A"
  params: []
  notes: "Returns 512 bytes binary data (little-endian)."

- id: gg_set
  label: Gamma Data (Green) Set
  kind: action
  command: "21 89 01 47 47 0A"  # followed by 512 binary bytes
  params: []

- id: gg_query
  label: Gamma Data (Green) Query
  kind: query
  command: "3F 89 01 47 47 0A"
  params: []

- id: gb_set
  label: Gamma Data (Blue) Set
  kind: action
  command: "21 89 01 47 42 0A"  # followed by 512 binary bytes
  params: []

- id: gb_query
  label: Gamma Data (Blue) Query
  kind: query
  command: "3F 89 01 47 42 0A"
  params: []

- id: pr_set
  label: Panel Alignment (Zone) Red Set
  kind: action
  command: "21 89 01 50 52 0A"  # followed by 256 binary bytes
  params: []
  notes: "11x11 zones, each H/V signed byte (-31..+31), little-endian, 2 bytes/zone + 13 reserved = 256 bytes total."

- id: pr_query
  label: Panel Alignment (Zone) Red Query
  kind: query
  command: "3F 89 01 50 52 0A"
  params: []

- id: pb_set
  label: Panel Alignment (Zone) Blue Set
  kind: action
  command: "21 89 01 50 42 0A"  # followed by 256 binary bytes
  params: []

- id: pb_query
  label: Panel Alignment (Zone) Blue Query
  kind: query
  command: "3F 89 01 50 42 0A"
  params: []

- id: sc_query
  label: Source Signal Status Query
  kind: query
  command: "3F 89 01 53 43 0A"
  params: []
  notes: "Response: 0x30 = no signal/out of range, 0x31 = signal present."

- id: md_query
  label: Model Status Query
  kind: query
  command: "3F 89 01 4D 44 0A"
  params: []
  notes: "Returns 14-byte ASCII 'ILAFPJ -- XHP?' where ? = '1' (X550R/X5000/RS400/XC5890), '2' (XC6890), '3' (X750R/X950R/XC7890/RS500/RS600/X7000/X9000/PX1)."

# Adjustment commands (PM, IS, IN, DS, FU, IF) - all use command 0x50 0x4D/0x49 0x53/etc. + 2-byte sub + Parameter2

- id: pm_pm_set
  label: Picture Mode Set
  kind: action
  command: "21 89 01 50 4D 50 4D {param} 0A"
  params:
    - name: param
      type: string
      description: "2 ASCII bytes per Table 4-19: '00'=Film, '01'=Cinema, '02'=Animation, '03'=Natural, '06'=THX, '0C'=User1, '0D'=User2, '0E'=User3, '0F'=User4, '10'=User5, '11'=User6."

- id: pm_pm_query
  label: Picture Mode Query
  kind: query
  command: "3F 89 01 50 4D 50 4D 0A"
  params: []

- id: pm_an_set
  label: Clear Black Set
  kind: action
  command: "21 89 01 50 4D 41 4E {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Off, 0x31=Low, 0x32=High"

- id: pm_an_query
  label: Clear Black Query
  kind: query
  command: "3F 89 01 50 4D 41 4E 0A"
  params: []

- id: pm_di_set
  label: Intelligent Lens Aperture Set
  kind: action
  command: "21 89 01 50 4D 44 49 {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (0/1/2/3 etc., per OSD values)"

- id: pm_di_query
  label: Intelligent Lens Aperture Query
  kind: query
  command: "3F 89 01 50 4D 44 49 0A"
  params: []

- id: pm_pr_set
  label: Color Profile Set
  kind: action
  command: "21 89 01 50 4D 50 52 {param} 0A"
  params:
    - name: param
      type: string
      description: "2 ASCII bytes per Table 4-22: '00'=Off, '03'=Standard, '04'=Cinema1, '06'=Anime1, '08'=Video, '0C'=3DCinema, '0E'=Custom1, '0F'=Custom2, '10'=Custom3, '11'=Custom4, '12'=Custom5, '14'=3D Video, '15'=3D Animation, '22'=Custom6; X95 family only: '01'=Film1, '02'=Film2, '05'=Cinema2, '07'=Anime2, '09'=x.v.Color, '0D'=THX, '13'=Film3, '1E'=3D Film, '20'=3D THX, '21'=Reference"

- id: pm_pr_query
  label: Color Profile Query
  kind: query
  command: "3F 89 01 50 4D 50 52 0A"
  params: []

- id: pm_cl_set
  label: Color Temperature Table Set
  kind: action
  command: "21 89 01 50 4D 43 4C {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=5500K, 0x32=6500K, 0x34=7500K, 0x38=9300K, 0x39=High Bright, 0x41=Custom1, 0x42=Custom2, 0x43=Custom3, 0x44=Xenon1, 0x45=Xenon2, 0x46=Xenon3"

- id: pm_cl_query
  label: Color Temperature Table Query
  kind: query
  command: "3F 89 01 50 4D 43 4C 0A"
  params: []

- id: pm_cc_set
  label: Color Temperature Correction Set
  kind: action
  command: "21 89 01 50 4D 43 43 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=5500K, 0x32=6500K, 0x34=7500K, 0x38=9300K, 0x39=High Bright, 0x44=Xenon1, 0x45=Xenon2, 0x46=Xenon3"

- id: pm_cc_query
  label: Color Temperature Correction Query
  kind: query
  command: "3F 89 01 50 4D 43 43 0A"
  params: []

- id: pm_gr_set
  label: Color Temperature Gain (Red) Set
  kind: action
  command: "21 89 01 50 4D 47 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars (e.g. +20 = '0014', -2 = 'FFFE')"

- id: pm_gr_query
  label: Color Temperature Gain (Red) Query
  kind: query
  command: "3F 89 01 50 4D 47 52 0A"
  params: []

- id: pm_gg_set
  label: Color Temperature Gain (Green) Set
  kind: action
  command: "21 89 01 50 4D 47 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_gg_query
  label: Color Temperature Gain (Green) Query
  kind: query
  command: "3F 89 01 50 4D 47 47 0A"
  params: []

- id: pm_gb_set
  label: Color Temperature Gain (Blue) Set
  kind: action
  command: "21 89 01 50 4D 47 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_gb_query
  label: Color Temperature Gain (Blue) Query
  kind: query
  command: "3F 89 01 50 4D 47 42 0A"
  params: []

- id: pm_or_set
  label: Color Temperature Offset (Red) Set
  kind: action
  command: "21 89 01 50 4D 4F 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_or_query
  label: Color Temperature Offset (Red) Query
  kind: query
  command: "3F 89 01 50 4D 4F 52 0A"
  params: []

- id: pm_og_set
  label: Color Temperature Offset (Green) Set
  kind: action
  command: "21 89 01 50 4D 4F 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_og_query
  label: Color Temperature Offset (Green) Query
  kind: query
  command: "3F 89 01 50 4D 4F 47 0A"
  params: []

- id: pm_ob_set
  label: Color Temperature Offset (Blue) Set
  kind: action
  command: "21 89 01 50 4D 4F 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_ob_query
  label: Color Temperature Offset (Blue) Query
  kind: query
  command: "3F 89 01 50 4D 4F 42 0A"
  params: []

- id: pm_gt_set
  label: Gamma Table Switch
  kind: action
  command: "21 89 01 50 4D 47 54 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Normal, 0x31=A, 0x32=B, 0x33=C, 0x34=Custom1, 0x35=Custom2, 0x36=Custom3, 0x37=D, 0x41=Film1, 0x42=Film2"

- id: pm_gt_query
  label: Gamma Table Query
  kind: query
  command: "3F 89 01 50 4D 47 54 0A"
  params: []

- id: pm_fw_set
  label: PictureTone (White) Adjustment
  kind: action
  command: "21 89 01 50 4D 46 57 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_fw_query
  label: PictureTone (White) Query
  kind: query
  command: "3F 89 01 50 4D 46 57 0A"
  params: []

- id: pm_fr_set
  label: Picture Tone (Red) Adjustment
  kind: action
  command: "21 89 01 50 4D 46 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_fr_query
  label: Picture Tone (Red) Query
  kind: query
  command: "3F 89 01 50 4D 46 52 0A"
  params: []

- id: pm_fg_set
  label: Picture Tone (Green) Adjustment
  kind: action
  command: "21 89 01 50 4D 46 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_fg_query
  label: Picture Tone (Green) Query
  kind: query
  command: "3F 89 01 50 4D 46 47 0A"
  params: []

- id: pm_fb_set
  label: Picture Tone (Blue) Adjustment
  kind: action
  command: "21 89 01 50 4D 46 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_fb_query
  label: Picture Tone (Blue) Query
  kind: query
  command: "3F 89 01 50 4D 46 42 0A"
  params: []

- id: pm_cn_set
  label: Contrast Adjustment
  kind: action
  command: "21 89 01 50 4D 43 4E {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars (e.g. +20 = '0014')"

- id: pm_cn_query
  label: Contrast Query
  kind: query
  command: "3F 89 01 50 4D 43 4E 0A"
  params: []

- id: pm_br_set
  label: Brightness Adjustment
  kind: action
  command: "21 89 01 50 4D 42 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars (e.g. -3 = 'FFFD')"

- id: pm_br_query
  label: Brightness Query
  kind: query
  command: "3F 89 01 50 4D 42 52 0A"
  params: []

- id: pm_co_set
  label: Color Adjustment
  kind: action
  command: "21 89 01 50 4D 43 4F {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_co_query
  label: Color Query
  kind: query
  command: "3F 89 01 50 4D 43 4F 0A"
  params: []

- id: pm_ti_set
  label: Tint Adjustment
  kind: action
  command: "21 89 01 50 4D 54 49 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_ti_query
  label: Tint Query
  kind: query
  command: "3F 89 01 50 4D 54 49 0A"
  params: []

- id: pm_rn_set
  label: NR Adjustment
  kind: action
  command: "21 89 01 50 4D 52 4E {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_rn_query
  label: NR Query
  kind: query
  command: "3F 89 01 50 4D 52 4E 0A"
  params: []

- id: pm_gc_set
  label: Gamma Correction Switch
  kind: action
  command: "21 89 01 50 4D 47 43 {param} 0A"
  params:
    - name: param
      type: string
      description: "2 ASCII bytes per Table 4-26: '00'=Normal, '01'=A, '02'=B, '03'=C, '04'=Import, '05'=1.8, '06'=1.9, '07'=2.0, '08'=2.1, '09'=2.2, '0A'=2.3, '0B'=2.4, '0C'=2.5, '0D'=2.6, '0E'=Film1, '0F'=Film2, '14'=D"

- id: pm_gc_query
  label: Gamma Correction Query
  kind: query
  command: "3F 89 01 50 4D 47 43 0A"
  params: []

- id: pm_dr_set
  label: Gamma Red Data Set
  kind: action
  command: "21 89 01 50 4D 44 52 0A"  # followed by 512 binary bytes
  params: []
  notes: "Same encoding as Gamma Data (Red) [GR]."

- id: pm_dr_query
  label: Gamma Red Data Query
  kind: query
  command: "3F 89 01 50 4D 44 52 0A"
  params: []

- id: pm_dg_set
  label: Gamma Green Data Set
  kind: action
  command: "21 89 01 50 4D 44 47 0A"  # followed by 512 binary bytes
  params: []

- id: pm_dg_query
  label: Gamma Green Data Query
  kind: query
  command: "3F 89 01 50 4D 44 47 0A"
  params: []

- id: pm_db_set
  label: Gamma Blue Data Set
  kind: action
  command: "21 89 01 50 4D 44 42 0A"  # followed by 512 binary bytes
  params: []

- id: pm_db_query
  label: Gamma Blue Data Query
  kind: query
  command: "3F 89 01 50 4D 44 42 0A"
  params: []

- id: pm_rw_set
  label: Bright Level White Adjustment
  kind: action
  command: "21 89 01 50 4D 52 57 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_rw_query
  label: Bright Level White Query
  kind: query
  command: "3F 89 01 50 4D 52 57 0A"
  params: []

- id: pm_rr_set
  label: Bright Level Red Adjustment
  kind: action
  command: "21 89 01 50 4D 52 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_rr_query
  label: Bright Level Red Query
  kind: query
  command: "3F 89 01 50 4D 52 52 0A"
  params: []

- id: pm_rg_set
  label: Dark Level Green Adjustment
  kind: action
  command: "21 89 01 50 4D 52 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_rg_query
  label: Dark Level Green Query
  kind: query
  command: "3F 89 01 50 4D 52 47 0A"
  params: []

- id: pm_rb_set
  label: Dark Level Blue Adjustment
  kind: action
  command: "21 89 01 50 4D 52 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_rb_query
  label: Dark Level Blue Query
  kind: query
  command: "3F 89 01 50 4D 52 42 0A"
  params: []

- id: pm_kw_set
  label: Dark Level White Adjustment
  kind: action
  command: "21 89 01 50 4D 4B 57 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_kw_query
  label: Dark Level White Query
  kind: query
  command: "3F 89 01 50 4D 4B 57 0A"
  params: []

- id: pm_kr_set
  label: Dark Level Red Adjustment
  kind: action
  command: "21 89 01 50 4D 4B 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_kr_query
  label: Dark Level Red Query
  kind: query
  command: "3F 89 01 50 4D 4B 52 0A"
  params: []

- id: pm_kg_set
  label: Dark Level Green Adjustment
  kind: action
  command: "21 89 01 50 4D 4B 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_kg_query
  label: Dark Level Green Query
  kind: query
  command: "3F 89 01 50 4D 4B 47 0A"
  params: []

- id: pm_kb_set
  label: Dark Level Blue Adjustment
  kind: action
  command: "21 89 01 50 4D 4B 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_kb_query
  label: Dark Level Blue Query
  kind: query
  command: "3F 89 01 50 4D 4B 42 0A"
  params: []

- id: pm_cb_set
  label: Color Management Table Set
  kind: action
  command: "21 89 01 50 4D 43 42 {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (per OSD Color Management values)"

- id: pm_cb_query
  label: Color Management Table Query
  kind: query
  command: "3F 89 01 50 4D 43 42 0A"
  params: []

- id: pm_ar_set
  label: Axis Position (Red) Adjustment
  kind: action
  command: "21 89 01 50 4D 41 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_ay_set
  label: Axis Position (Yellow) Adjustment
  kind: action
  command: "21 89 01 50 4D 41 59 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_ag_set
  label: Axis Position (Green) Adjustment
  kind: action
  command: "21 89 01 50 4D 41 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_ac_set
  label: Axis Position (Cyan) Adjustment
  kind: action
  command: "21 89 01 50 4D 41 43 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_ab_set
  label: Axis Position (Blue) Adjustment
  kind: action
  command: "21 89 01 50 4D 41 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_am_set
  label: Axis Position (Magenta) Adjustment
  kind: action
  command: "21 89 01 50 4D 41 4D {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_hr_set
  label: HUE (Red) Adjustment
  kind: action
  command: "21 89 01 50 4D 48 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_hy_set
  label: HUE (Yellow) Adjustment
  kind: action
  command: "21 89 01 50 4D 48 59 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_hg_set
  label: HUE (Green) Adjustment
  kind: action
  command: "21 89 01 50 4D 48 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_hc_set
  label: HUE (Cyan) Adjustment
  kind: action
  command: "21 89 01 50 4D 48 43 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_hb_set
  label: HUE (Blue) Adjustment
  kind: action
  command: "21 89 01 50 4D 48 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_hm_set
  label: HUE (Magenta) Adjustment
  kind: action
  command: "21 89 01 50 4D 48 4D {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_sr_set
  label: SATURATION (Red) Adjustment
  kind: action
  command: "21 89 01 50 4D 53 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_sy_set
  label: SATURATION (Yellow) Adjustment
  kind: action
  command: "21 89 01 50 4D 53 59 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_sg_set
  label: SATURATION (Green) Adjustment
  kind: action
  command: "21 89 01 50 4D 53 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_sc_set
  label: SATURATION (Cyan) Adjustment
  kind: action
  command: "21 89 01 50 4D 53 43 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_sb_set
  label: SATURATION (Blue) Adjustment
  kind: action
  command: "21 89 01 50 4D 53 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_sm_set
  label: SATURATION (Magenta) Adjustment
  kind: action
  command: "21 89 01 50 4D 53 4D {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_lr_set
  label: BRIGHTNESS (Red) Adjustment
  kind: action
  command: "21 89 01 50 4D 4C 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_ly_set
  label: BRIGHTNESS (Yellow) Adjustment
  kind: action
  command: "21 89 01 50 4D 4C 59 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_lg_set
  label: BRIGHTNESS (Green) Adjustment
  kind: action
  command: "21 89 01 50 4D 4C 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_lc_set
  label: BRIGHTNESS (Cyan) Adjustment
  kind: action
  command: "21 89 01 50 4D 4C 43 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_lb_set
  label: BRIGHTNESS (Blue) Adjustment
  kind: action
  command: "21 89 01 50 4D 4C 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_lm_set
  label: BRIGHTNESS (Magenta) Adjustment
  kind: action
  command: "21 89 01 50 4D 4C 4D {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_cm_set
  label: Clear Motion Drive Set
  kind: action
  command: "21 89 01 50 4D 43 4D {param} 0A"
  params:
    - name: param
      type: string
      description: "0x33=Low, 0x34=High, 0x35=Inverse Telecine"

- id: pm_cm_query
  label: Clear Motion Drive Query
  kind: query
  command: "3F 89 01 50 4D 43 4D 0A"
  params: []

- id: pm_me_set
  label: Motion Enhance Set
  kind: action
  command: "21 89 01 50 4D 4D 45 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x31=Low, 0x32=High"

- id: pm_me_query
  label: Motion Enhance Query
  kind: query
  command: "3F 89 01 50 4D 4D 45 0A"
  params: []

- id: pm_la_set
  label: Lens Aperture Set
  kind: action
  command: "21 89 01 50 4D 4C 41 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_la_query
  label: Lens Aperture Query
  kind: query
  command: "3F 89 01 50 4D 4C 41 0A"
  params: []

- id: pm_lp_set
  label: Lamp Power Set
  kind: action
  command: "21 89 01 50 4D 4C 50 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Normal, 0x31=High"

- id: pm_lp_query
  label: Lamp Power Query
  kind: query
  command: "3F 89 01 50 4D 4C 50 0A"
  params: []

- id: pm_ma_set
  label: MPC Analyze Set
  kind: action
  command: "21 89 01 50 4D 4D 41 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x31=Analyze, 0x32=Analyze Enhance, 0x33=Analyze Dynamic Contrast, 0x34=Analyze Smoothing, 0x35=Analyze histogram"

- id: pm_ma_query
  label: MPC Analyze Query
  kind: query
  command: "3F 89 01 50 4D 4D 41 0A"
  params: []

- id: pm_us_set
  label: 4K e-shift Set
  kind: action
  command: "21 89 01 50 4D 55 53 {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (per OSD 4K e-shift values)"

- id: pm_us_query
  label: 4K e-shift Query
  kind: query
  command: "3F 89 01 50 4D 55 53 0A"
  params: []

- id: pm_rp_set
  label: Original Resolution Set
  kind: action
  command: "21 89 01 50 4D 52 50 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Auto, 0x33=1080p, 0x34=4K"

- id: pm_rp_query
  label: Original Resolution Query
  kind: query
  command: "3F 89 01 50 4D 52 50 0A"
  params: []

- id: pm_en_set
  label: Enhance Adjustment
  kind: action
  command: "21 89 01 50 4D 45 4E {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_en_query
  label: Enhance Query
  kind: query
  command: "3F 89 01 50 4D 45 4E 0A"
  params: []

- id: pm_dy_set
  label: Dynamic Contrast Adjustment
  kind: action
  command: "21 89 01 50 4D 44 59 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_dy_query
  label: Dynamic Contrast Query
  kind: query
  command: "3F 89 01 50 4D 44 59 0A"
  params: []

- id: pm_st_set
  label: Smoothing Adjustment
  kind: action
  command: "21 89 01 50 4D 53 54 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: pm_st_query
  label: Smoothing Query
  kind: query
  command: "3F 89 01 50 4D 53 54 0A"
  params: []

- id: pm_u1_set
  label: Name Edit Picture Mode User1
  kind: action
  command: "21 89 01 50 4D 55 31 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: pm_u1_query
  label: Name Edit Picture Mode User1 Query
  kind: query
  command: "3F 89 01 50 4D 55 31 0A"
  params: []

- id: pm_u2_set
  label: Name Edit Picture Mode User2
  kind: action
  command: "21 89 01 50 4D 55 32 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters"

- id: pm_u2_query
  label: Name Edit Picture Mode User2 Query
  kind: query
  command: "3F 89 01 50 4D 55 32 0A"
  params: []

- id: pm_u3_set
  label: Name Edit Picture Mode User3
  kind: action
  command: "21 89 01 50 4D 55 33 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters"

- id: pm_u3_query
  label: Name Edit Picture Mode User3 Query
  kind: query
  command: "3F 89 01 50 4D 55 33 0A"
  params: []

- id: pm_u4_set
  label: Name Edit Picture Mode User4
  kind: action
  command: "21 89 01 50 4D 55 34 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters"

- id: pm_u4_query
  label: Name Edit Picture Mode User4 Query
  kind: query
  command: "3F 89 01 50 4D 55 34 0A"
  params: []

- id: pm_u5_set
  label: Name Edit Picture Mode User5
  kind: action
  command: "21 89 01 50 4D 55 35 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters"

- id: pm_u5_query
  label: Name Edit Picture Mode User5 Query
  kind: query
  command: "3F 89 01 50 4D 55 35 0A"
  params: []

- id: pm_u6_set
  label: Name Edit Picture Mode User6
  kind: action
  command: "21 89 01 50 4D 55 36 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters"

- id: pm_u6_query
  label: Name Edit Picture Mode User6 Query
  kind: query
  command: "3F 89 01 50 4D 55 36 0A"
  params: []

# IS (Input Signal) sub-commands

- id: is_il_set
  label: HDMI Input Level Switch
  kind: action
  command: "21 89 01 49 53 49 4C {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Standard(16-235), 0x31=Enhanced(0-255), 0x32=Super White(16-255), 0x33=Auto"

- id: is_il_query
  label: HDMI Input Level Query
  kind: query
  command: "3F 89 01 49 53 49 4C 0A"
  params: []

- id: is_hs_set
  label: HDMI Color Space Switch
  kind: action
  command: "21 89 01 49 53 48 53 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Auto, 0x31=YCbCr(4:4:4), 0x32=YCbCr(4:2:2), 0x33=RGB"

- id: is_hs_query
  label: HDMI Color Space Query
  kind: query
  command: "3F 89 01 49 53 48 53 0A"
  params: []

- id: is_3d_set
  label: HDMI 2D/3D Switch
  kind: action
  command: "21 89 01 49 53 33 44 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=2D, 0x31=Auto, 0x33=Side By Side, 0x34=Top and Bottom"

- id: is_3d_query
  label: HDMI 2D/3D Query
  kind: query
  command: "3F 89 01 49 53 33 44 0A"
  params: []

- id: is_3p_set
  label: HDMI 3D Phase Adjustment
  kind: action
  command: "21 89 01 49 53 33 50 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: is_3p_query
  label: HDMI 3D Phase Query
  kind: query
  command: "3F 89 01 49 53 33 50 0A"
  params: []

- id: is_ph_set
  label: Picture Position (Horizontal) Adjustment
  kind: action
  command: "21 89 01 49 53 50 48 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: is_ph_query
  label: Picture Position (Horizontal) Query
  kind: query
  command: "3F 89 01 49 53 50 48 0A"
  params: []

- id: is_pv_set
  label: Picture Position (Vertical) Adjustment
  kind: action
  command: "21 89 01 49 53 50 56 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: is_pv_query
  label: Picture Position (Vertical) Query
  kind: query
  command: "3F 89 01 49 53 50 56 0A"
  params: []

- id: is_as_set
  label: Aspect Switch
  kind: action
  command: "21 89 01 49 53 41 53 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=4:3, 0x31=16:9, 0x32=Zoom, 0x33=Auto, 0x34=Just, 0x35=Full"

- id: is_as_query
  label: Aspect Query
  kind: query
  command: "3F 89 01 49 53 41 53 0A"
  params: []

- id: is_ma_set
  label: Mask Switch
  kind: action
  command: "21 89 01 49 53 4D 41 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Custom1, 0x31=Custom2, 0x32=Off, 0x33=Custom3"

- id: is_ma_query
  label: Mask Query
  kind: query
  command: "3F 89 01 49 53 4D 41 0A"
  params: []

- id: is_ml_set
  label: Mask (Left) Adjustment
  kind: action
  command: "21 89 01 49 53 4D 4C {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars. Effective only when Mask is Custom1-3."

- id: is_mr_set
  label: Mask (Right) Adjustment
  kind: action
  command: "21 89 01 49 53 4D 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars. Effective only when Mask is Custom1-3."

- id: is_mt_set
  label: Mask (Top) Adjustment
  kind: action
  command: "21 89 01 49 53 4D 54 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars. Effective only when Mask is Custom1-3."

- id: is_mb_set
  label: Mask (Bottom) Adjustment
  kind: action
  command: "21 89 01 49 53 4D 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars. Effective only when Mask is Custom1-3."

- id: is_fm_set
  label: Film Mode Switch
  kind: action
  command: "21 89 01 49 53 46 4D {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (per OSD Film Mode values)"

- id: is_fm_query
  label: Film Mode Query
  kind: query
  command: "3F 89 01 49 53 46 4D 0A"
  params: []

- id: is_lv_set
  label: Parallax of 3D Conversion Adjustment
  kind: action
  command: "21 89 01 49 53 4C 56 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: is_lv_query
  label: Parallax of 3D Conversion Query
  kind: query
  command: "3F 89 01 49 53 4C 56 0A"
  params: []

- id: is_ca_set
  label: Crosstalk Cancel (White) Adjustment
  kind: action
  command: "21 89 01 49 53 43 41 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: is_ca_query
  label: Crosstalk Cancel (White) Query
  kind: query
  command: "3F 89 01 49 53 43 41 0A"
  params: []

# IN (Installation) sub-commands

- id: in_fn_set
  label: Focus Near Adjustment (continuous)
  kind: action
  command: "21 89 01 49 4E 46 4E {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Stop, 0x31=Start. Only one motor may drive at a time; project rejects concurrent drive requests."

- id: in_ff_set
  label: Focus Far Adjustment (continuous)
  kind: action
  command: "21 89 01 49 4E 46 46 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Stop, 0x31=Start"

- id: in_zt_set
  label: Zoom Tele Adjustment (continuous)
  kind: action
  command: "21 89 01 49 4E 5A 54 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Stop, 0x31=Start"

- id: in_zw_set
  label: Zoom Wide Adjustment (continuous)
  kind: action
  command: "21 89 01 49 4E 5A 57 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Stop, 0x31=Start"

- id: in_sl_set
  label: Shift Left Adjustment (continuous)
  kind: action
  command: "21 89 01 49 4E 53 4C {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Stop, 0x31=Start"

- id: in_sr_set
  label: Shift Right Adjustment (continuous)
  kind: action
  command: "21 89 01 49 4E 53 52 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Stop, 0x31=Start"

- id: in_su_set
  label: Shift Up Adjustment (continuous)
  kind: action
  command: "21 89 01 49 4E 53 55 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Stop, 0x31=Start"

- id: in_sd_set
  label: Shift Down Adjustment (continuous)
  kind: action
  command: "21 89 01 49 4E 53 44 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Stop, 0x31=Start"

- id: in_cv_set
  label: Lens Cover Switch
  kind: action
  command: "21 89 01 49 4E 43 56 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Auto, 0x31=Open. X95 family only - not on X550R/X5000/RS400/XC5890 or XC6890."

- id: in_cv_query
  label: Lens Cover Query
  kind: query
  command: "3F 89 01 49 4E 43 56 0A"
  params: []

- id: in_ip_set
  label: Image Pattern Switch
  kind: action
  command: "21 89 01 49 4E 49 50 {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (per OSD Image Pattern values)"

- id: in_ip_query
  label: Image Pattern Query
  kind: query
  command: "3F 89 01 49 4E 49 50 0A"
  params: []

- id: in_ll_set
  label: Lens Lock Switch
  kind: action
  command: "21 89 01 49 4E 4C 4C {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (per OSD Lens Lock values)"

- id: in_ll_query
  label: Lens Lock Query
  kind: query
  command: "3F 89 01 49 4E 4C 4C 0A"
  params: []

- id: in_xr_set
  label: Pixel Adjust (Horizontal Red)
  kind: action
  command: "21 89 01 49 4E 58 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: in_xr_query
  label: Pixel Adjust (Horizontal Red) Query
  kind: query
  command: "3F 89 01 49 4E 58 52 0A"
  params: []

- id: in_xb_set
  label: Pixel Adjust (Horizontal Blue)
  kind: action
  command: "21 89 01 49 4E 58 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: in_xb_query
  label: Pixel Adjust (Horizontal Blue) Query
  kind: query
  command: "3F 89 01 49 4E 58 42 0A"
  params: []

- id: in_yr_set
  label: Pixel Adjust (Vertical Red)
  kind: action
  command: "21 89 01 49 4E 59 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: in_yr_query
  label: Pixel Adjust (Vertical Red) Query
  kind: query
  command: "3F 89 01 49 4E 59 52 0A"
  params: []

- id: in_yb_set
  label: Pixel Adjust (Vertical Blue)
  kind: action
  command: "21 89 01 49 4E 59 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: in_yb_query
  label: Pixel Adjust (Vertical Blue) Query
  kind: query
  command: "3F 89 01 49 4E 59 42 0A"
  params: []

- id: in_is_set
  label: Installation Style Switch
  kind: action
  command: "21 89 01 49 4E 49 53 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Front, 0x31=CeilingMount(F), 0x32=Rear, 0x33=CeilingMount(R)"

- id: in_is_query
  label: Installation Style Query
  kind: query
  command: "3F 89 01 49 4E 49 53 0A"
  params: []

- id: in_kv_set
  label: Keystone (Vertical) Adjustment
  kind: action
  command: "21 89 01 49 4E 4B 56 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: in_kv_query
  label: Keystone (Vertical) Query
  kind: query
  command: "3F 89 01 49 4E 4B 56 0A"
  params: []

- id: in_vs_set
  label: Anamorphic Switch
  kind: action
  command: "21 89 01 49 4E 56 53 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x31=A, 0x32=B"

- id: in_vs_query
  label: Anamorphic Query
  kind: query
  command: "3F 89 01 49 4E 56 53 0A"
  params: []

- id: in_sa_set
  label: Screen Adjust Data
  kind: action
  command: "21 89 01 49 4E 53 41 {value} 0A"
  params:
    - name: value
      type: string
      description: "Signed 2-byte hex as 4 ASCII chars"

- id: in_sa_query
  label: Screen Adjust Data Query
  kind: query
  command: "3F 89 01 49 4E 53 41 0A"
  params: []

- id: in_sc_set
  label: Screen Adjust Switch
  kind: action
  command: "21 89 01 49 4E 53 43 {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (per OSD Screen Adjust values)"

- id: in_sc_query
  label: Screen Adjust Query
  kind: query
  command: "3F 89 01 49 4E 53 43 0A"
  params: []

- id: in_pa_set
  label: Panel Alignment Switch
  kind: action
  command: "21 89 01 49 4E 50 41 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x31=Memory1, 0x32=Memory2"

- id: in_pa_query
  label: Panel Alignment Query
  kind: query
  command: "3F 89 01 49 4E 50 41 0A"
  params: []

- id: in_ms_set
  label: Store Lens Memory
  kind: action
  command: "21 89 01 49 4E 4D 53 {param} 0A"
  params:
    - name: param
      type: string
      description: "1 ASCII byte per Table 4-59: '0'=Memory1, '1'=Memory2, '2'=Memory3, '3'=Memory4, '4'=Memory5, '5'=Memory6 (X95 only), '6'=Memory7, '7'=Memory8, '8'=Memory9, '9'=Memory10"

- id: in_ms_query
  label: Lens Memory Save State Query
  kind: query
  command: "3F 89 01 49 4E 4D 53 0A"
  params: []
  notes: "Returns 10 bytes, one per Memory1-10: '0'=Not-Saved, '1'=Saved."

- id: in_ml_set
  label: Load Lens Memory
  kind: action
  command: "21 89 01 49 4E 4D 4C {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (Memory number)"

- id: in_m1_set
  label: Name Edit Lens Memory 1
  kind: action
  command: "21 89 01 49 4E 4D 31 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters"

- id: in_m1_query
  label: Name Edit Lens Memory 1 Query
  kind: query
  command: "3F 89 01 49 4E 4D 31 0A"
  params: []

- id: in_m2_set
  label: Name Edit Lens Memory 2
  kind: action
  command: "21 89 01 49 4E 4D 32 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters"

- id: in_m2_query
  label: Name Edit Lens Memory 2 Query
  kind: query
  command: "3F 89 01 49 4E 4D 32 0A"
  params: []

- id: in_m3_set
  label: Name Edit Lens Memory 3
  kind: action
  command: "21 89 01 49 4E 4D 33 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters"

- id: in_m3_query
  label: Name Edit Lens Memory 3 Query
  kind: query
  command: "3F 89 01 49 4E 4D 33 0A"
  params: []

- id: in_m4_set
  label: Name Edit Lens Memory 4
  kind: action
  command: "21 89 01 49 4E 4D 34 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters"

- id: in_m4_query
  label: Name Edit Lens Memory 4 Query
  kind: query
  command: "3F 89 01 49 4E 4D 34 0A"
  params: []

- id: in_m5_set
  label: Name Edit Lens Memory 5
  kind: action
  command: "21 89 01 49 4E 4D 35 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters"

- id: in_m5_query
  label: Name Edit Lens Memory 5 Query
  kind: query
  command: "3F 89 01 49 4E 4D 35 0A"
  params: []

- id: in_m6_set
  label: Name Edit Lens Memory 6
  kind: action
  command: "21 89 01 49 4E 4D 36 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters. X95 family only."

- id: in_m6_query
  label: Name Edit Lens Memory 6 Query
  kind: query
  command: "3F 89 01 49 4E 4D 36 0A"
  params: []

- id: in_m7_set
  label: Name Edit Lens Memory 7
  kind: action
  command: "21 89 01 49 4E 4D 37 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters. X95 family only."

- id: in_m7_query
  label: Name Edit Lens Memory 7 Query
  kind: query
  command: "3F 89 01 49 4E 4D 37 0A"
  params: []

- id: in_m8_set
  label: Name Edit Lens Memory 8
  kind: action
  command: "21 89 01 49 4E 4D 38 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters. X95 family only."

- id: in_m8_query
  label: Name Edit Lens Memory 8 Query
  kind: query
  command: "3F 89 01 49 4E 4D 38 0A"
  params: []

- id: in_m9_set
  label: Name Edit Lens Memory 9
  kind: action
  command: "21 89 01 49 4E 4D 39 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters. X95 family only."

- id: in_m9_query
  label: Name Edit Lens Memory 9 Query
  kind: query
  command: "3F 89 01 49 4E 4D 39 0A"
  params: []

- id: in_ma_set
  label: Name Edit Lens Memory 10
  kind: action
  command: "21 89 01 49 4E 4D 41 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters. X95 family only."

- id: in_ma_query
  label: Name Edit Lens Memory 10 Query
  kind: query
  command: "3F 89 01 49 4E 4D 41 0A"
  params: []

- id: in_1n_set
  label: Focus Near (1 shot)
  kind: action
  command: "21 89 01 49 4E 31 4E 0A"
  params: []

- id: in_1n_query
  label: Focus Near (1 shot) Query
  kind: query
  command: "3F 89 01 49 4E 31 4E 0A"
  params: []

- id: in_1f_set
  label: Focus Far (1 shot)
  kind: action
  command: "21 89 01 49 4E 31 46 0A"
  params: []

- id: in_1f_query
  label: Focus Far (1 shot) Query
  kind: query
  command: "3F 89 01 49 4E 31 46 0A"
  params: []

- id: in_1t_set
  label: Zoom Tele (1 shot)
  kind: action
  command: "21 89 01 49 4E 31 54 0A"
  params: []

- id: in_1t_query
  label: Zoom Tele (1 shot) Query
  kind: query
  command: "3F 89 01 49 4E 31 54 0A"
  params: []

- id: in_1w_set
  label: Zoom Wide (1 shot)
  kind: action
  command: "21 89 01 49 4E 31 57 0A"
  params: []

- id: in_1w_query
  label: Zoom Wide (1 shot) Query
  kind: query
  command: "3F 89 01 49 4E 31 57 0A"
  params: []

- id: in_1l_set
  label: Shift Left (1 shot)
  kind: action
  command: "21 89 01 49 4E 31 4C 0A"
  params: []

- id: in_1l_query
  label: Shift Left (1 shot) Query
  kind: query
  command: "3F 89 01 49 4E 31 4C 0A"
  params: []

- id: in_1r_set
  label: Shift Right (1 shot)
  kind: action
  command: "21 89 01 49 4E 31 52 0A"
  params: []

- id: in_1r_query
  label: Shift Right (1 shot) Query
  kind: query
  command: "3F 89 01 49 4E 31 52 0A"
  params: []

- id: in_1u_set
  label: Shift Up (1 shot)
  kind: action
  command: "21 89 01 49 4E 31 55 0A"
  params: []

- id: in_1u_query
  label: Shift Up (1 shot) Query
  kind: query
  command: "3F 89 01 49 4E 31 55 0A"
  params: []

- id: in_1d_set
  label: Shift Down (1 shot)
  kind: action
  command: "21 89 01 49 4E 31 44 0A"
  params: []

- id: in_1d_query
  label: Shift Down (1 shot) Query
  kind: query
  command: "3F 89 01 49 4E 31 44 0A"
  params: []

- id: in_ha_set
  label: High Altitude Mode Switch
  kind: action
  command: "21 89 01 49 4E 48 41 {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (per OSD High Altitude values)"

- id: in_ha_query
  label: High Altitude Mode Query
  kind: query
  command: "3F 89 01 49 4E 48 41 0A"
  params: []

# DS (Display Setup) sub-commands

- id: ds_bc_set
  label: Back Color Switch
  kind: action
  command: "21 89 01 44 53 42 43 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Blue, 0x31=Black"

- id: ds_bc_query
  label: Back Color Query
  kind: query
  command: "3F 89 01 44 53 42 43 0A"
  params: []

- id: ds_mp_set
  label: Menu Position Switch
  kind: action
  command: "21 89 01 44 53 4D 50 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Left-Top, 0x31=Right-Top, 0x32=Center, 0x33=Left-Bottom, 0x34=Right-Bottom, 0x35=Left, 0x36=Right"

- id: ds_mp_query
  label: Menu Position Query
  kind: query
  command: "3F 89 01 44 53 4D 50 0A"
  params: []

- id: ds_sd_set
  label: Source Display Switch
  kind: action
  command: "21 89 01 44 53 53 44 {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (per OSD Source Display values)"

- id: ds_sd_query
  label: Source Display Query
  kind: query
  command: "3F 89 01 44 53 53 44 0A"
  params: []

- id: ds_lo_set
  label: Logo Switch
  kind: action
  command: "21 89 01 44 53 4C 4F {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (per OSD Logo values)"

- id: ds_lo_query
  label: Logo Query
  kind: query
  command: "3F 89 01 44 53 4C 4F 0A"
  params: []

- id: ds_la_set
  label: Language Switch
  kind: action
  command: "21 89 01 44 53 4C 41 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x30=Japanese, 0x31=English, 0x32=German, 0x33=Spanish, 0x34=Italian, 0x35=French, 0x36=Portuguese, 0x37=Dutch, 0x38=Swedish, 0x39=Norwegian, 0x41=Russian, 0x42=Chinese(Simplified), 0x43=Chinese(Traditional)"

- id: ds_la_query
  label: Language Query
  kind: query
  command: "3F 89 01 44 53 4C 41 0A"
  params: []

# FU (Function) sub-commands

- id: fu_tr_set
  label: Trigger Switch
  kind: action
  command: "21 89 01 46 55 54 52 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x31=On(Power), 0x32=On(Anamo)"

- id: fu_tr_query
  label: Trigger Query
  kind: query
  command: "3F 89 01 46 55 54 52 0A"
  params: []

- id: fu_ot_set
  label: Off Timer Switch
  kind: action
  command: "21 89 01 46 55 4F 54 {param} 0A"
  params:
    - name: param
      type: string
      description: "0x31=1 Hour, 0x32=2 Hours, 0x33=3 Hours, 0x34=4 Hours"

- id: fu_ot_query
  label: Off Timer Query
  kind: query
  command: "3F 89 01 46 55 4F 54 0A"
  params: []

- id: fu_em_set
  label: Eco Mode Switch
  kind: action
  command: "21 89 01 46 55 45 4D {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (per OSD Eco Mode values)"

- id: fu_em_query
  label: Eco Mode Query
  kind: query
  command: "3F 89 01 46 55 45 4D 0A"
  params: []

- id: fu_cf_set
  label: Control4 Switch
  kind: action
  command: "21 89 01 46 55 43 46 {param} 0A"
  params:
    - name: param
      type: string
      description: "Special parameter (per OSD Control4 values)"

- id: fu_cf_query
  label: Control4 Query
  kind: query
  command: "3F 89 01 46 55 43 46 0A"
  params: []

# IF (Information) - all read-only

- id: if_in_query
  label: Input Display Query
  kind: query
  command: "3F 89 01 49 46 49 4E 0A"
  params: []

- id: if_is_query
  label: Source Display Query
  kind: query
  command: "3F 89 01 49 46 49 53 0A"
  params: []

- id: if_rh_query
  label: Horizontal Resolution Display Query
  kind: query
  command: "3F 89 01 49 46 52 48 0A"
  params: []
  notes: "Returns signed 2-byte hex (4 ASCII chars) representing the horizontal resolution value."

- id: if_rv_query
  label: Vertical Resolution Display Query
  kind: query
  command: "3F 89 01 49 46 52 56 0A"
  params: []

- id: if_fh_query
  label: Horizontal Frequency Display Query
  kind: query
  command: "3F 89 01 49 46 46 48 0A"
  params: []
  notes: "Parameter = actual value × 100 (e.g. 63.98 kHz → 6398 = 0x18FE)."

- id: if_fv_query
  label: Vertical Frequency Display Query
  kind: query
  command: "3F 89 01 49 46 46 56 0A"
  params: []
  notes: "Parameter = actual value × 100."

- id: if_dc_query
  label: Deep Color Display Query
  kind: query
  command: "3F 89 01 49 46 44 43 0A"
  params: []
  notes: "Response: 0x30=8 bit, 0x31=10 bit, 0x32=12 bit."

- id: if_xv_query
  label: Color Space Display Query
  kind: query
  command: "3F 89 01 49 46 58 56 0A"
  params: []
  notes: "Response: 0x30=RGB, 0x31=YUV, 0x32=x.v.Color."

- id: if_lt_query
  label: Lamp Time Display Query
  kind: query
  command: "3F 89 01 49 46 4C 54 0A"
  params: []
  notes: "Returns signed 2-byte hex (4 ASCII chars) of lamp hours."

- id: if_sv_query
  label: Software Version Display Query
  kind: query
  command: "3F 89 01 49 46 53 56 0A"
  params: []
  notes: "Returns 6-byte ASCII: NN-NNN format (e.g. '03-005' = version 03.005)."

- id: if_ci_query
  label: Calibrator Information Display Query
  kind: query
  command: "3F 89 01 49 46 43 49 0A"
  params: []
  notes: "Returns 18 ASCII bytes (Special3). X95 family supported; X550R/X5000/RS400/XC5890 not supported."

- id: pm_ci_set
  label: Calibrator Information Set
  kind: action
  command: "21 89 01 50 4D 43 49 {data} 0A"
  params:
    - name: data
      type: string
      description: "18 ASCII characters (Special3). XC6890 and X95 family only."

- id: pm_ci_query
  label: Calibrator Information Query
  kind: query
  command: "3F 89 01 50 4D 43 49 0A"
  params: []

# LAN Setup (LS) sub-commands

- id: ls_ds_set
  label: DHCP Client Set
  kind: action
  command: "21 89 01 4C 53 44 53 31 0A"
  params: []
  notes: "0x31 = On. Only On is documented; setting to Off is not stated in source."

- id: ls_ds_query
  label: DHCP Client Query
  kind: query
  command: "3F 89 01 4C 53 44 53 0A"
  params: []
  notes: "Response: 0x30 = Off(Static)."

- id: ls_ip_set
  label: IP Address Set
  kind: action
  command: "21 89 01 4C 53 49 50 {octet1}{octet2}{octet3}{octet4} 0A"
  params:
    - name: octet1
      type: string
      description: "Octet 1 as 2 ASCII hex chars (e.g. 'C0' for 192)"
    - name: octet2
      type: string
      description: "Octet 2 as 2 ASCII hex chars (e.g. 'A8' for 168)"
    - name: octet3
      type: string
      description: "Octet 3 as 2 ASCII hex chars (e.g. '01')"
    - name: octet4
      type: string
      description: "Octet 4 as 2 ASCII hex chars (e.g. '0A')"
  notes: "Valid only when DHCP Client is Off. Takes effect after network reboot."

- id: ls_sm_set
  label: Subnet Mask Set
  kind: action
  command: "21 89 01 4C 53 53 4D {octets} 0A"
  params:
    - name: octets
      type: string
      description: "8 ASCII hex chars (4 octets)"
  notes: "Valid only when DHCP Client is Off."

- id: ls_sm_query
  label: Subnet Mask Query
  kind: query
  command: "3F 89 01 4C 53 53 4D 0A"
  params: []

- id: ls_dg_set
  label: Default Gateway Set
  kind: action
  command: "21 89 01 4C 53 44 47 {octets} 0A"
  params:
    - name: octets
      type: string
      description: "8 ASCII hex chars (4 octets)"
  notes: "Valid only when DHCP Client is Off."

- id: ls_dg_query
  label: Default Gateway Query
  kind: query
  command: "3F 89 01 4C 53 44 47 0A"
  params: []

- id: ls_ma_query
  label: MAC Address Query
  kind: query
  command: "3F 89 01 4C 53 4D 41 0A"
  params: []
  notes: "Returns 12 ASCII hex chars (e.g. '008088123456' = 00:80:88:12:34:56)."

- id: ls_rs_set
  label: Network Reboot
  kind: action
  command: "21 89 01 4C 53 52 53 31 0A"
  params: []
  notes: "0x31 = Network Restart (reboots network interface)."

- id: ls_pt_set
  label: Port Setting Set
  kind: action
  command: "21 89 01 4C 53 50 54 {port} 0A"
  params:
    - name: port
      type: string
      description: "Port as 4 ASCII hex chars (e.g. '2710' = 10000)"

- id: ls_pt_query
  label: Port Setting Query
  kind: query
  command: "3F 89 01 4C 53 50 54 0A"
  params: []
  notes: "Returns 4 ASCII hex chars; default 0x504A = 20554."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, lamp_on, cooling, reserved, error]
  notes: "PW? response byte 0x30/0x31/0x32/0x33/0x34."

- id: input_state
  type: enum
  values: [hdmi1, hdmi2]
  notes: "IP? response byte 0x36/0x37."

- id: source_signal
  type: enum
  values: [no_signal_or_out_of_range, signal_present]
  notes: "SC? response byte 0x30/0x31."

- id: model_status
  type: string
  notes: "MD? returns 14 ASCII bytes 'ILAFPJ -- XHP?' (model family identifier)."

- id: dhcp_client
  type: enum
  values: [off]
  notes: "LSDS? response 0x30. UNRESOLVED: only Off(Static) is documented in the response table; On state response byte not stated in source."

- id: mac_address
  type: string
  notes: "LSMA? returns 12 ASCII hex chars."

- id: lan_port
  type: integer
  notes: "LSPT? returns 4 ASCII hex chars; default 0x504A = 20554."

- id: software_version
  type: string
  notes: "IFSV? returns 6 ASCII chars 'NN-NNN' (e.g. '03-005' = 03.005)."

- id: deep_color
  type: enum
  values: ["8_bit", "10_bit", "12_bit"]
  notes: "IFDC? response 0x30/0x31/0x32."

- id: color_space_info
  type: enum
  values: [rgb, yuv, xvcolor]
  notes: "IFXV? response 0x30/0x31/0x32."

- id: lamp_time
  type: integer
  notes: "IFLT? returns signed 2-byte hex (4 ASCII chars) representing lamp hours."

- id: horizontal_resolution
  type: integer
  notes: "IFRH? returns signed 2-byte hex (4 ASCII chars)."

- id: vertical_resolution
  type: integer
  notes: "IFRV? returns signed 2-byte hex (4 ASCII chars)."

- id: horizontal_frequency
  type: integer
  notes: "IFFH? returns value × 100 (e.g. 63.98 kHz → 6398 = 0x18FE)."

- id: vertical_frequency
  type: integer
  notes: "IFFV? returns value × 100."

- id: lens_memory_saved
  type: array
  notes: "INMS? returns 10 bytes, one per Memory1-10: '0'=Not-Saved, '1'=Saved."

- id: source_info
  type: enum
  values: ["480p", "576p", "720p50", "720p60", "1080i50", "1080i60", "1080p24", "1080p50", "1080p60", "no_signal", "720p_3d", "1080i_3d", "1080p_3d", "4k4096_60", "4k4096_50", "4k4096_30", "4k4096_25", "4k4096_24", "4k3840_60", "4k3840_50", "4k3840_30", "4k3840_25", "4k3840_24"]
  notes: "IFIS? response per Table 4-56."
```

## Variables
```yaml
# Continuously adjustable picture controls. All use signed 2-byte hex (4 ASCII chars).
- id: contrast
  command: "21 89 01 50 4D 43 4E {value} 0A"
  range: ""  # UNRESOLVED: numeric min/max not stated in source
- id: brightness
  command: "21 89 01 50 4D 42 52 {value} 0A"
  range: ""  # UNRESOLVED
- id: color
  command: "21 89 01 50 4D 43 4F {value} 0A"
  range: ""  # UNRESOLVED
- id: tint
  command: "21 89 01 50 4D 54 49 {value} 0A"
  range: ""  # UNRESOLVED
- id: nr
  command: "21 89 01 50 4D 52 4E {value} 0A"
  range: ""  # UNRESOLVED
- id: color_temp_gain_r
  command: "21 89 01 50 4D 47 52 {value} 0A"
  range: ""  # UNRESOLVED
- id: color_temp_gain_g
  command: "21 89 01 50 4D 47 47 {value} 0A"
  range: ""  # UNRESOLVED
- id: color_temp_gain_b
  command: "21 89 01 50 4D 47 42 {value} 0A"
  range: ""  # UNRESOLVED
- id: color_temp_offset_r
  command: "21 89 01 50 4D 4F 52 {value} 0A"
  range: ""  # UNRESOLVED
- id: color_temp_offset_g
  command: "21 89 01 50 4D 4F 47 {value} 0A"
  range: ""  # UNRESOLVED
- id: color_temp_offset_b
  command: "21 89 01 50 4D 4F 42 {value} 0A"
  range: ""  # UNRESOLVED
- id: picture_tone_w
  command: "21 89 01 50 4D 46 57 {value} 0A"
  range: ""  # UNRESOLVED
- id: lens_aperture
  command: "21 89 01 50 4D 4C 41 {value} 0A"
  range: ""  # UNRESOLVED
- id: enhance
  command: "21 89 01 50 4D 45 4E {value} 0A"
  range: ""  # UNRESOLVED
- id: dynamic_contrast
  command: "21 89 01 50 4D 44 59 {value} 0A"
  range: ""  # UNRESOLVED
- id: smoothing
  command: "21 89 01 50 4D 53 54 {value} 0A"
  range: ""  # UNRESOLVED
```

## Events
```yaml
# No unsolicited notifications are documented in the source. Projector is purely request/response.
# UNRESOLVED: source describes no asynchronous event channel; all state changes are confirmable via reference queries.
```

## Macros
```yaml
# No multi-step macro sequences are described in the source.
# UNRESOLVED: source does not document device-side macros; composite sequences must be built client-side.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Power-OFF is acknowledged before the projector turns off. Power-ON during cooling state is silently ignored (§3.8).
# Motor drive (focus/zoom/shift): only one motor may drive at a time; concurrent requests are rejected; motor auto-stops at limit (§4.10 footnotes).
# UNRESOLVED: source does not document additional safety warnings, lockout procedures, or sequencing requirements.
```

## Notes
- Document: "External Control Command Communication Specification" Ver. 1.0, 11/Dec/2015, JVCKENWOOD Corp. Projector Division, Doc No. PJ06030001B.
- Frame format: Header (1B) + Unit ID (2B: 0x89 unit + 0x01 individual) + Command (2B ASCII) + Data (nB) + End (1B: 0x0A). Headers: 0x21 operation, 0x3F reference, 0x40 response, 0x06 ACK.
- Numeric parameters encoded as signed 2-byte hex in 4 ASCII chars; ASCII 0x30='0' (off/no), 0x31='1' (on/yes), 0x2B='+', 0x2D='-'.
- Gamma/gamma-adjustment data: 512 bytes binary (little-endian, 256 adjustment points). Panel Alignment: 256 bytes binary (11x11 zones, H/V signed byte, -31..+31).
- 50 ms inter-byte silence invalidates a frame (§3.8). External controller must not transmit the next command until ACK is received.
- Operation commands during user-driven operation are silently dropped (no ACK). Reference commands are queued until user operation completes.
- Model string "ILAFPJ -- XHP3" identifies X95-family units (DLA-X750R/X7000/XC7890R/RS500, DLA-X950R/X9000/RS600/PX1).
- X95-family-specific commands: INCV (Lens Cover), Lens Memory 6-10, IFCC/PMCI Calibrator Info, additional Color Profile values (Film1/2, Cinema2, Anime2, x.v.Color, THX, Film3, 3D Film, 3D THX, Reference).
- DLA-X95RKT is not named verbatim in the source. Coverage inferred from DLA-X950R family membership.
- Document: `https://support.jvc.com/consumer/support/documents/2015model_JVC_External_Control_Command_spec_v1_0.pdf`

<!-- UNRESOLVED: DLA-X95RKT specific model not named in source — coverage inferred from X950R family. No firmware version compatibility range stated. No safety / fault-recovery sequences documented. No range bounds for numeric picture adjustments. -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/2015model_JVC_External_Control_Command_spec_v1_0.pdf
retrieved_at: 2026-06-16T06:44:03.736Z
last_checked_at: 2026-06-16T07:08:32.835Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:08:32.835Z
matched_actions: 290
action_count: 290
confidence: medium
summary: "All 290 spec actions confirmed verbatim in source; transport fully supported; 28 source query variants for axis-position/hue/saturation/brightness-color and mask adjustments not represented but coverage ratio 0.91. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PM AR query"
- "PM AY query"
- "PM AG query"
- "PM AC query"
- "PM AB query"
- "PM AM query"
- "PM HR query"
- "PM HY query"
- "PM HG query"
- "PM HC query"
- "PM HB query"
- "PM HM query"
- "DLA-X95RKT is not named verbatim in source — coverage inferred from X950R family membership. No firmware compatibility range stated."
- "only Off(Static) is documented in the response table; On state response byte not stated in source.\""
- "numeric min/max not stated in source"
- "source describes no asynchronous event channel; all state changes are confirmable via reference queries."
- "source does not document device-side macros; composite sequences must be built client-side."
- "source does not document additional safety warnings, lockout procedures, or sequencing requirements."
- "DLA-X95RKT specific model not named in source — coverage inferred from X950R family. No firmware version compatibility range stated. No safety / fault-recovery sequences documented. No range bounds for numeric picture adjustments."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
