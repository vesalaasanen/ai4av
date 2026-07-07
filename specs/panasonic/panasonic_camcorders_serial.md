---
spec_id: admin/panasonic-povcam
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic POVCAM (AG-UCK20/AG-UMR20/AG-MDC20/AG-MDR25) Control Spec"
manufacturer: Panasonic
model_family: AG-UCK20
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - AG-UCK20
    - AG-UMR20
    - AG-MDC20
    - AG-MDR25
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - "https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/POVCAM/POVCAM_IF(MENU_CAM)_V1.0E.pdf"
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/EN/top.html
  - "https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/POVCAM/POVCAM_IF(IP_CLIP)_V1.0E.pdf"
retrieved_at: 2026-07-02T10:13:13.117Z
last_checked_at: 2026-07-07T11:48:27.527Z
generated_at: 2026-07-07T11:48:27.527Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "assumed family was \"RS-232C camcorders\" but source documents HTTP/CGI control only — no RS-232 in source. HTTP control port not explicitly stated. Auth/token behavior undocumented beyond \"no login shown\"."
  - "HTTP port number not stated in source"
  - "source documents no named multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "HTTP control port number not stated in source (do not assume 80)."
  - "firmware version compatibility not stated."
  - "RS-232C command list (if any) not present in this source — confirm whether a separate serial doc exists."
  - "auth model undocumented beyond no-login evidence; no token/credential format in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:48:27.527Z
  matched_actions: 208
  action_count: 208
  confidence: medium
  summary: "All 208 spec actions map exactly to commands documented in the source; transport URLs and event endpoint match verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# Panasonic POVCAM Control Spec

## Summary
POVCAM interface spec for Panasonic memory-card portable recorder + compact camera head (AG-UCK20/AG-UMR20, AG-MDC20/AG-MDR25). External menu + camera operation over network. Host protocol HTTP/1.1 over TCP. Two CGI endpoints: `aw_ptz` (commands starting `#`) and `aw_cam` (all others). Supports zoom/iris/focus control, scene-file/switch/output settings, queries, camera-info update notification (push over TCP) and batch acquisition. Command system partly compatible with Panasonic HD integrated cameras.

<!-- UNRESOLVED: assumed family was "RS-232C camcorders" but source documents HTTP/CGI control only — no RS-232 in source. HTTP control port not explicitly stated. Auth/token behavior undocumented beyond "no login shown". -->

## Transport
```yaml
protocols:
  - http
  - tcp  # tcp push channel for camera-info update notifications only
addressing:
  # HTTP control port not explicitly stated in source
  port: null  # UNRESOLVED: HTTP port number not stated in source
  base_url:
    aw_ptz: "http://{ip}/cgi-bin/aw_ptz?cmd={command}&res={type}"
    aw_cam: "http://{ip}/cgi-bin/aw_cam?cmd={command}&res={type}"
    event: "http://{ip}/cgi-bin/event?connect={start|stop}&my_port=31004&uid=0"
    batch: "http://{ip}/live/camdata.html"
  # res (Type) fixed to "1" for most commands; "0" for AWB[OWS] and ABB[OAS]
auth:
  type: none  # inferred: no auth/login procedure in source
tcp_event:
  # camera pushes update notifications to terminal TCP port (fixed 31004)
  terminal_port: 31004
  note: "terminal receiving port fixed to 31004; camera initiates TCP to terminal"
```

**Endpoint routing rule:** any command whose token begins with `#` → use `aw_ptz`; all others → use `aw_cam`. `#` must be URL-encoded as `%23`. When issuing commands in succession, leave >=130 ms gap.

## Traits
```yaml
traits:
  - powerable  # inferred: PowerON/Standby command #O present
  - queryable  # inferred: many query commands (Q*-prefixed) returning values
  - levelable  # inferred: zoom/iris/focus/gain level control present
```

## Actions
```yaml
# === 3.3 Scene File Control (aw_cam unless noted) ===
- id: scene_select_set
  label: "Select Scene (set)"
  kind: action
  command: "XSF:[Data]"
  params: [{name: data, type: string, description: "1h(F1) 2h(F2) 3h(F3) 4h(AUTO)"}]
- id: scene_select_query
  label: "Select Scene (query)"
  kind: query
  command: "QSF"
  params: []
- id: detail_level_set
  label: "Detail Level (set)"
  kind: action
  command: "OSA:30:[Data]"
  params: [{name: data, type: string, description: "76h(-10)~80h(0)~8Ah(+10)"}]
- id: detail_level_query
  label: "Detail Level (query)"
  kind: query
  command: "QSA:30"
  params: []
- id: v_detail_level_set
  label: "V Detail Level (set)"
  kind: action
  command: "OSD:16:[Data]"
  params: [{name: data, type: string, description: "00h(-7)~07h(0)~0Eh(+7)"}]
- id: v_detail_level_query
  label: "V Detail Level (query)"
  kind: query
  command: "QSD:16"
  params: []
- id: detail_coring_set
  label: "Detail Coring (set)"
  kind: action
  command: "OSK:01:[Data]"
  params: [{name: data, type: string, description: "80h(0)~94h(+20)"}]
- id: detail_coring_query
  label: "Detail Coring (query)"
  kind: query
  command: "QSK:01"
  params: []
- id: skin_tone_dtl_set
  label: "Skin Tone DTL (set)"
  kind: action
  command: "OSE:32:[Data]"
  params: [{name: data, type: string, description: "0(OFF) 1(LOW) 3(HIGH)"}]
- id: skin_tone_dtl_query
  label: "Skin Tone DTL (query)"
  kind: query
  command: "QSE:32"
  params: []
- id: wb_r_gain_set
  label: "WB R Gain (set)"
  kind: action
  command: "ORG:[Data]"
  params: [{name: data, type: string, description: "00h(-30)~1Eh(0)~3Ch(+30)"}]
- id: wb_r_gain_query
  label: "WB R Gain (query)"
  kind: query
  command: "QGR"
  params: []
- id: wb_b_gain_set
  label: "WB B Gain (set)"
  kind: action
  command: "OBG:[Data]"
  params: [{name: data, type: string, description: "00h(-30)~1Eh(0)~3Ch(+30)"}]
- id: wb_b_gain_query
  label: "WB B Gain (query)"
  kind: query
  command: "QGB"
  params: []
- id: chroma_level_set
  label: "Chroma Level (set)"
  kind: action
  command: "OSK:02:[Data]"
  params: [{name: data, type: string, description: "3Ah(-70)~80h(0)~9Eh(+30)"}]
- id: chroma_level_query
  label: "Chroma Level (query)"
  kind: query
  command: "QSK:02"
  params: []
- id: chroma_phase_set
  label: "Chroma Phase (set)"
  kind: action
  command: "OSK:03:[Data]"
  params: [{name: data, type: string, description: "62h(-31)~80h(0)~9Fh(+31)"}]
- id: chroma_phase_query
  label: "Chroma Phase (query)"
  kind: query
  command: "QSK:03"
  params: []
- id: matrix_set
  label: "Matrix (set)"
  kind: action
  command: "OSE:31:[Data]"
  params: [{name: data, type: string, description: "0h(NORM) 1h(CINE-LIKE) 2h(STILL-LIKE) 3h(SURGICAL LIGHT, MDC20 only)"}]
- id: matrix_query
  label: "Matrix (query)"
  kind: query
  command: "QSE:31"
  params: []
- id: master_ped_set
  label: "Master PED (set)"
  kind: action
  command: "OTD:[Data]"
  params: [{name: data, type: string, description: "0Fh(-15)~1Eh(0)~2Dh(+15)"}]
- id: master_ped_query
  label: "Master PED (query)"
  kind: query
  command: "QTD"
  params: []
- id: gamma_set
  label: "Gamma (set)"
  kind: action
  command: "OSE:72:[Data]"
  params: [{name: data, type: string, description: "1h(HD NORM) 2h(CINE-LIKE D) 3h(STILL-LIKE)"}]
- id: gamma_query
  label: "Gamma (query)"
  kind: query
  command: "QSE:72"
  params: []
- id: black_gamma_set
  label: "Black Gamma (set)"
  kind: action
  command: "OSK:04:[Data]"
  params: [{name: data, type: string, description: "79h(-7)~80h(0)~87h(+7)"}]
- id: black_gamma_query
  label: "Black Gamma (query)"
  kind: query
  command: "QSK:04"
  params: []
- id: knee_set
  label: "Knee (set)"
  kind: action
  command: "OSA:2D:[Data]"
  params: [{name: data, type: string, description: "2h(AUTO) 3h(LOW) 4h(MID) 5h(HIGH)"}]
- id: knee_query
  label: "Knee (query)"
  kind: query
  command: "QSA:2D"
  params: []
- id: drs_set
  label: "DRS (set)"
  kind: action
  command: "OSE:33:[Data]"
  params: [{name: data, type: string, description: "0h(OFF) 1h(LOW) 2h(MID) 3h(HIGH)"}]
- id: drs_query
  label: "DRS (query)"
  kind: query
  command: "QSE:33"
  params: []
- id: nr_control_set
  label: "NR Control (set)"
  kind: action
  command: "OSK:05:[Data]"
  params: [{name: data, type: string, description: "79h(-7)~80h(0)~87h(+7)"}]
- id: nr_control_query
  label: "NR Control (query)"
  kind: query
  command: "QSK:05"
  params: []

# === 3.3.1 Color Correction Settings (aw_cam). SAT range 61h(-31)~80h(0)~9Fh(+31); PHASE range 41h(-63)~80h(0)~BFh(+63) ===
- {id: cc_mg_sat_set, label: "Color Correction Mg (SAT) set", kind: action, command: "OSD:82:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_mg_sat_query, label: "Color Correction Mg (SAT) query", kind: query, command: "QSD:82", params: []}
- {id: cc_mg_phase_set, label: "Color Correction Mg (PHASE) set", kind: action, command: "OSD:83:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_mg_phase_query, label: "Color Correction Mg (PHASE) query", kind: query, command: "QSD:83", params: []}
- {id: cc_mg_r_sat_set, label: "Color Correction Mg_R (SAT) set", kind: action, command: "OSD:84:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_mg_r_sat_query, label: "Color Correction Mg_R (SAT) query", kind: query, command: "QSD:84", params: []}
- {id: cc_mg_r_phase_set, label: "Color Correction Mg_R (PHASE) set", kind: action, command: "OSD:85:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_mg_r_phase_query, label: "Color Correction Mg_R (PHASE) query", kind: query, command: "QSD:85", params: []}
- {id: cc_r_sat_set, label: "Color Correction R (SAT) set", kind: action, command: "OSD:86:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_r_sat_query, label: "Color Correction R (SAT) query", kind: query, command: "QSD:86", params: []}
- {id: cc_r_phase_set, label: "Color Correction R (PHASE) set", kind: action, command: "OSD:87:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_r_phase_query, label: "Color Correction R (PHASE) query", kind: query, command: "QSD:87", params: []}
- {id: cc_r_r_yi_sat_set, label: "Color Correction R_R_YI (SAT) set", kind: action, command: "OSD:9C:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_r_r_yi_sat_query, label: "Color Correction R_R_YI (SAT) query", kind: query, command: "QSD:9C", params: []}
- {id: cc_r_r_yi_phase_set, label: "Color Correction R_R_YI (PHASE) set", kind: action, command: "OSD:9D:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_r_r_yi_phase_query, label: "Color Correction R_R_YI (PHASE) query", kind: query, command: "QSD:9D", params: []}
- {id: cc_r_yl_yl_sat_set, label: "Color Correction R_Yl_Yl (SAT) set", kind: action, command: "OSD:9E:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_r_yl_yl_sat_query, label: "Color Correction R_Yl_Yl (SAT) query", kind: query, command: "QSD:9E", params: []}
- {id: cc_r_yl_yl_phase_set, label: "Color Correction R_Yl_Yl (PHASE) set", kind: action, command: "OSD:9F:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_r_yl_yl_phase_query, label: "Color Correction R_Yl_Yl (PHASE) query", kind: query, command: "QSD:9F", params: []}
- {id: cc_yl_sat_set, label: "Color Correction Yl (SAT) set", kind: action, command: "OSD:8A:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_yl_sat_query, label: "Color Correction Yl (SAT) query", kind: query, command: "QSD:8A", params: []}
- {id: cc_yl_phase_set, label: "Color Correction Yl (PHASE) set", kind: action, command: "OSD:8B:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_yl_phase_query, label: "Color Correction Yl (PHASE) query", kind: query, command: "QSD:8B", params: []}
- {id: cc_g_sat_set, label: "Color Correction G (SAT) set", kind: action, command: "OSD:8E:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_g_sat_query, label: "Color Correction G (SAT) query", kind: query, command: "QSD:8E", params: []}
- {id: cc_g_phase_set, label: "Color Correction G (PHASE) set", kind: action, command: "OSD:8F:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_g_phase_query, label: "Color Correction G (PHASE) query", kind: query, command: "QSD:8F", params: []}
- {id: cc_g_cy_sat_set, label: "Color Correction G_Cy (SAT) set", kind: action, command: "OSD:90:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_g_cy_sat_query, label: "Color Correction G_Cy (SAT) query", kind: query, command: "QSD:90", params: []}
- {id: cc_g_cy_phase_set, label: "Color Correction G_Cy (PHASE) set", kind: action, command: "OSD:91:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_g_cy_phase_query, label: "Color Correction G_Cy (PHASE) query", kind: query, command: "QSD:91", params: []}
- {id: cc_cy_sat_set, label: "Color Correction Cy (SAT) set", kind: action, command: "OSD:92:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_cy_sat_query, label: "Color Correction Cy (SAT) query", kind: query, command: "QSD:92", params: []}
- {id: cc_cy_phase_set, label: "Color Correction Cy (PHASE) set", kind: action, command: "OSD:93:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_cy_phase_query, label: "Color Correction Cy (PHASE) query", kind: query, command: "QSD:93", params: []}
- {id: cc_b_sat_set, label: "Color Correction B (SAT) set", kind: action, command: "OSD:96:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_b_sat_query, label: "Color Correction B (SAT) query", kind: query, command: "QSD:96", params: []}
- {id: cc_b_phase_set, label: "Color Correction B (PHASE) set", kind: action, command: "OSD:97:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_b_phase_query, label: "Color Correction B (PHASE) query", kind: query, command: "QSD:97", params: []}
- {id: cc_cy_cy_b_sat_set, label: "Color Correction Cy_Cy_B (SAT) set", kind: action, command: "OSD:AA:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_cy_cy_b_sat_query, label: "Color Correction Cy_Cy_B (SAT) query", kind: query, command: "QSD:AA", params: []}
- {id: cc_cy_cy_b_phase_set, label: "Color Correction Cy_Cy_B (PHASE) set", kind: action, command: "OSD:AB:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_cy_cy_b_phase_query, label: "Color Correction Cy_Cy_B (PHASE) query", kind: query, command: "QSD:AB", params: []}
- {id: cc_cy_b_b_sat_set, label: "Color Correction Cy_B_B (SAT) set", kind: action, command: "OSD:AC:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_cy_b_b_sat_query, label: "Color Correction Cy_B_B (SAT) query", kind: query, command: "QSD:AC", params: []}
- {id: cc_cy_b_b_phase_set, label: "Color Correction Cy_B_B (PHASE) set", kind: action, command: "OSD:AD:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_cy_b_b_phase_query, label: "Color Correction Cy_B_B (PHASE) query", kind: query, command: "QSD:AD", params: []}
- {id: cc_b_b_mg_sat_set, label: "Color Correction B_B_Mg (SAT) set", kind: action, command: "OSD:C0:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_b_b_mg_sat_query, label: "Color Correction B_B_Mg (SAT) query", kind: query, command: "QSD:C0", params: []}
- {id: cc_b_b_mg_phase_set, label: "Color Correction B_B_Mg (PHASE) set", kind: action, command: "OSD:C1:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_b_b_mg_phase_query, label: "Color Correction B_B_Mg (PHASE) query", kind: query, command: "QSD:C1", params: []}
- {id: cc_b_mg_mg_sat_set, label: "Color Correction B_Mg_Mg (SAT) set", kind: action, command: "OSD:C2:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_b_mg_mg_sat_query, label: "Color Correction B_Mg_Mg (SAT) query", kind: query, command: "QSD:C2", params: []}
- {id: cc_b_mg_mg_phase_set, label: "Color Correction B_Mg_Mg (PHASE) set", kind: action, command: "OSD:C3:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_b_mg_mg_phase_query, label: "Color Correction B_Mg_Mg (PHASE) query", kind: query, command: "QSD:C3", params: []}
- {id: cc_yl_yl_g_sat_set, label: "Color Correction Yl_Yl_G (SAT) set", kind: action, command: "OSD:C4:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_yl_yl_g_sat_query, label: "Color Correction Yl_Yl_G (SAT) query", kind: query, command: "QSD:C4", params: []}
- {id: cc_yl_yl_g_phase_set, label: "Color Correction Yl_Yl_G (PHASE) set", kind: action, command: "OSD:C5:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_yl_yl_g_phase_query, label: "Color Correction Yl_Yl_G (PHASE) query", kind: query, command: "QSD:C5", params: []}
- {id: cc_yl_g_g_sat_set, label: "Color Correction Yl_G_G (SAT) set", kind: action, command: "OSD:C6:[Data]", params: [{name: data, type: string, description: "61h(-31)~80h(0)~9Fh(+31)"}]}
- {id: cc_yl_g_g_sat_query, label: "Color Correction Yl_G_G (SAT) query", kind: query, command: "QSD:C6", params: []}
- {id: cc_yl_g_g_phase_set, label: "Color Correction Yl_G_G (PHASE) set", kind: action, command: "OSD:C7:[Data]", params: [{name: data, type: string, description: "41h(-63)~80h(0)~BFh(+63)"}]}
- {id: cc_yl_g_g_phase_query, label: "Color Correction Yl_G_G (PHASE) query", kind: query, command: "QSD:C7", params: []}

# === 3.4 Switch Setting Control (aw_cam unless noted) ===
- {id: backlight_comp_set, label: "Backlight Compens. (set)", kind: action, command: "OSE:73:[Data]", params: [{name: data, type: string, description: "0h(OFF) 1h(ON)"}]}
- {id: backlight_comp_query, label: "Backlight Compens. (query)", kind: query, command: "QSE:73", params: []}
- {id: spotlight_comp_set, label: "Spotlight Compens. (set)", kind: action, command: "OSK:09:[Data]", params: [{name: data, type: string, description: "0h(OFF) 1h(ON)"}]}
- {id: spotlight_comp_query, label: "Spotlight Compens. (query)", kind: query, command: "QSK:09", params: []}
- {id: nd_filter_set, label: "ND Filter (set)", kind: action, command: "OFT:[Data]", params: [{name: data, type: string, description: "0h(OFF) 1h(1/4 ND) 2h(1/16 ND) 3h(1/64 ND)"}]}
- {id: nd_filter_query, label: "ND Filter (query)", kind: query, command: "QFT", params: []}
- {id: iris_mode_set, label: "Iris Mode (set)", kind: action, command: "ORS:[Data]", params: [{name: data, type: string, description: "0(Manual) 1(Auto)"}]}
- {id: iris_mode_query, label: "Iris Mode (query)", kind: query, command: "QRS", params: []}
- {id: gain_set, label: "Gain Mode/Gain (set)", kind: action, command: "OGU:[Data]", params: [{name: data, type: string, description: "08h(0dB)~26h(30dB), 80h(AGC ON)"}]}
- {id: gain_query, label: "Gain Mode/Gain (query)", kind: query, command: "QGU", params: []}
- {id: agc_limit_set, label: "AGC Limit (set)", kind: action, command: "OSK:11:[Data]", params: [{name: data, type: string, description: "01h(3dB)~0Ah(30dB)"}]}
- {id: agc_limit_query, label: "AGC Limit (query)", kind: query, command: "QSK:11", params: []}
- {id: super_gain_set, label: "Super Gain (set)", kind: action, command: "OSK:12:[Data]", params: [{name: data, type: string, description: "0h(OFF) 1h(ON)"}]}
- {id: super_gain_query, label: "Super Gain (query)", kind: query, command: "QSK:12", params: []}
- {id: super_gain_effect_set, label: "Super Gain Effect (set)", kind: action, command: "OSK:13:[Data]", params: [{name: data, type: string, description: "1h(33dB) 2h(36dB)"}]}
- {id: super_gain_effect_query, label: "Super Gain Effect (query)", kind: query, command: "QSK:13", params: []}
- {id: shutter_set, label: "Shutter Mode/Speed (set)", kind: action, command: "OSK:08:[Data]", params: [{name: data, type: string, description: "00h(Auto) FFh(SyncScan) 74h(1/2)~8Eh(1/8000); steps differ by CamFormat (see 3.4.1)"}]}
- {id: shutter_query, label: "Shutter Mode/Speed (query)", kind: query, command: "QSK:08", params: []}
- {id: synchro_scan_set, label: "Synchro Scan (set)", kind: action, command: "OMS:[Data]", params: [{name: data, type: string, description: "001h~0FFh; mapped shutter differs by CamFormat (see 3.4.2)"}]}
- {id: synchro_scan_query, label: "Synchro Scan (query)", kind: query, command: "QMS", params: []}
- {id: auto_slow_shutter_limit_set, label: "Auto Slow Shutter Limit (set)", kind: action, command: "OSK:07:[Data]", params: [{name: data, type: string, description: "0h(OFF) 1h(1/30) 2h(1/25) 3h(1/24) 4h(1/15) 5h(1/12) 6h(1/8) 7h(1/6); steps differ by CamFormat (see 3.4.3)"}]}
- {id: auto_slow_shutter_limit_query, label: "Auto Slow Shutter Limit (query)", kind: query, command: "QSK:07", params: []}
- {id: auto_shutter_limit_set, label: "Auto Shutter Limit (set)", kind: action, command: "OSD:BF:[Data]", params: [{name: data, type: string, description: "0h(Off) 2h(1/100) 3h(1/120 or 1/125) 4h(1/250); differs by CamFormat (see 3.4.4)"}]}
- {id: auto_shutter_limit_query, label: "Auto Shutter Limit (query)", kind: query, command: "QSD:BF", params: []}
- {id: ae_level_set, label: "AE Level (set)", kind: action, command: "OSD:48:[Data]", params: [{name: data, type: string, description: "00h(-10)~32h(0)~64h(+10); supports only 5 steps"}]}
- {id: ae_level_query, label: "AE Level (query)", kind: query, command: "QSD:48", params: []}
- {id: white_balance_mode_set, label: "White Balance Mode (set)", kind: action, command: "OAW:[Data]", params: [{name: data, type: string, description: "0h(ATW) 1h(AWB A) 2h(AWB B) 4h(PRESET 3200K) 5h(PRESET 5600K) 9h(VAR) Eh(ATW_LOCK)"}]}
- {id: white_balance_mode_query, label: "White Balance Mode (query)", kind: query, command: "QAW", params: []}
- {id: var_set, label: "VAR (set)", kind: action, command: "OSD:B1:[Data]", params: [{name: data, type: string, description: "000h(2000K)~078h(15000K) (see 3.4.5)"}]}
- {id: var_query, label: "VAR (query)", kind: query, command: "QSD:B1", params: []}
- {id: izoom_set, label: "i.ZOOM (set)", kind: action, command: "OSD:B3:[Data]", params: [{name: data, type: string, description: "0h(OFF) 1h(ON)"}]}
- {id: izoom_query, label: "i.ZOOM (query)", kind: query, command: "QSD:B3", params: []}
- {id: dzoom_set, label: "D.ZOOM (set)", kind: action, command: "ODE:[Data]", params: [{name: data, type: string, description: "0(OFF) 1(ON)"}]}
- {id: dzoom_query, label: "D.ZOOM (query)", kind: query, command: "QDE", params: []}
- {id: dzoom_ratio_set, label: "D.ZOOM Ratio (set)", kind: action, command: "OSD:B8:[Data]", params: [{name: data, type: string, description: "0h(x1.4) 1h(x2.0) 2h(x4.0) 3h(x6.0) 4h(x8.0)"}]}
- {id: dzoom_ratio_query, label: "D.ZOOM Ratio (query)", kind: query, command: "QSD:B8", params: []}
- {id: ois_set, label: "O.I.S. (set)", kind: action, command: "OIS:[Data]", params: [{name: data, type: string, description: "0h(OFF) 1h(ON)"}]}
- {id: ois_query, label: "O.I.S. (query)", kind: query, command: "QIS", params: []}
- {id: hybrid_ois_set, label: "Hybrid O.I.S. Mode (set)", kind: action, command: "OSK:15:[Data]", params: [{name: data, type: string, description: "0h(OFF) 1h(ON)"}]}
- {id: hybrid_ois_query, label: "Hybrid O.I.S. Mode (query)", kind: query, command: "QSK:15", params: []}
- {id: custom_ois_setup_set, label: "Custom O.I.S. Setup (set)", kind: action, command: "OSK:14:[Data]", params: [{name: data, type: string, description: "0h(Standard) 1h(Fixed installation)"}]}
- {id: custom_ois_setup_query, label: "Custom O.I.S. Setup (query)", kind: query, command: "QSK:14", params: []}
- {id: focus_set, label: "Focus (set)", kind: action, command: "OAF:[Data]", params: [{name: data, type: string, description: "0h(Manual) 1h(AUTO)"}]}
- {id: focus_query, label: "Focus (query)", kind: query, command: "QAF", params: []}
- {id: custom_af_stability_set, label: "Custom AF Stability (set)", kind: action, command: "OSK:06:[Data]", params: [{name: data, type: string, description: "1h(level1) 2h(level2) 3h(level3)"}]}
- {id: custom_af_stability_query, label: "Custom AF Stability (query)", kind: query, command: "QSK:06", params: []}
- id: infrared_rec_set
  label: "Infrared Rec (set)"
  kind: action
  command: "#D6[Data]"  # aw_ptz
  params: [{name: data, type: string, description: "0h(OFF) 1h(ON)"}]
- id: infrared_rec_query
  label: "Infrared Rec (query)"
  kind: query
  command: "#D6"  # aw_ptz; response d6[Data]
  params: []
- {id: ir_rec_color_set, label: "IR Rec Color (set)", kind: action, command: "OSK:16:[Data]", params: [{name: data, type: string, description: "0h(White) 1h(Green)"}]}
- {id: ir_rec_color_query, label: "IR Rec Color (query)", kind: query, command: "QSK:16", params: []}
- id: scan_reverse_set
  label: "Scan Reverse (set)"
  kind: action
  command: "#INS[Data]"  # aw_ptz; response iNS[Data]
  params: [{name: data, type: string, description: "0(OFF) 1(ON)"}]
- id: scan_reverse_query
  label: "Scan Reverse (query)"
  kind: query
  command: "#INS"  # aw_ptz; response iNS[Data]
  params: []

# === 3.5 Direct Control ===
- id: zoom_speed
  label: "Zoom Speed"
  kind: action
  command: "#Z[Data]"  # aw_ptz; response zS[Data]
  params: [{name: data, type: string, description: "01(Wide Max)~49(Wide Min) 50(Stop) 51(Tele Min)~99(Tele Max)"}]
- {id: zoom_tele, label: "Zoom (TELE)", kind: action, command: "HZT", params: []}
- {id: zoom_wide, label: "Zoom (WIDE)", kind: action, command: "HZW", params: []}
- {id: zoom_stop, label: "Zoom (STOP)", kind: action, command: "HZS", params: []}
- {id: zoom_speed_lzs, label: "Zoom Speed (LZS)", kind: action, command: "LZS:[Data]", params: [{name: data, type: string, description: "0(Slow)~9(Fast)"}]}
- id: zoom_position_set
  label: "Zoom Position Control (set)"
  kind: action
  command: "#AXZ[Data]"  # aw_ptz; response axz[Data]
  params: [{name: data, type: string, description: "555h(Wide)~FFFh(Tele)"}]
- id: zoom_position_query
  label: "Zoom Position Control (query)"
  kind: query
  command: "#AXZ"  # aw_ptz; response axz[Data]
  params: []
- {id: push_auto, label: "Push Auto", kind: action, command: "OSE:69:[Data]", params: [{name: data, type: string, description: "1h(Execute)"}]}
- id: focus_speed
  label: "Focus Speed"
  kind: action
  command: "#F[Data]"  # aw_ptz; response fS[Data]
  params: [{name: data, type: string, description: "01(Near Max)~49(Near Min) 50(Stop) 51(Far Min)~99(Far Max)"}]
- {id: focus_far, label: "Focus (FAR)", kind: action, command: "HFF", params: []}
- {id: focus_near, label: "Focus (NEAR)", kind: action, command: "HFN", params: []}
- {id: focus_stop, label: "Focus (STOP)", kind: action, command: "HFS", params: []}
- {id: focus_speed_lfs, label: "Focus Speed (LFS)", kind: action, command: "LFS:[Data]", params: [{name: data, type: string, description: "0(Slow)~9(Fast)"}]}
- id: focus_position_set
  label: "Focus Position Control (set)"
  kind: action
  command: "#AXF[Data]"  # aw_ptz; response axf[Data]
  params: [{name: data, type: string, description: "555h(Near)~FFFh(Far)"}]
- id: focus_position_query
  label: "Focus Position Control (query)"
  kind: query
  command: "#AXF"  # aw_ptz; response axf[Data]
  params: []
- id: iris_control_set
  label: "Iris Control (set)"
  kind: action
  command: "#AXI[Data]"  # aw_ptz; response axi[Data]
  params: [{name: data, type: string, description: "555h(Iris Close)~FFFh(Iris Open)"}]
- id: iris_control_query
  label: "Iris Control (query)"
  kind: query
  command: "#AXI"  # aw_ptz; response axi[Data]
  params: []
- {id: iris_open, label: "IRIS (OPEN)", kind: action, command: "LIO", params: []}
- {id: iris_close, label: "IRIS (CLOSE)", kind: action, command: "LIC", params: []}
- {id: iris_stop, label: "IRIS (STOP)", kind: action, command: "LIT", params: []}
- {id: iris_speed, label: "IRIS (SPEED)", kind: action, command: "LIS:[Data]", params: [{name: data, type: string, description: "0(Slow)~9(Fast)"}]}
- {id: wbset, label: "WBSET (AWB execute)", kind: action, command: "OWS", params: []}
- {id: bbset, label: "BBSET (ABB execute)", kind: action, command: "OAS", params: []}

# === 3.6 Other Camera Information ===
- {id: camformat_query, label: "CamFormat (query)", kind: query, command: "QSK:20", params: []}
  # response OSK:20:[Data]: 01h(59.94p/i) 02h(29.97p) 03h(23.98p) 04h(50p/i) 05h(25p)
- {id: freeze_frame_set, label: "Freeze Frame (set)", kind: action, command: "OSK:23:[Data]", params: [{name: data, type: string, description: "0h(NORMAL) 1h(FREEZE FRAME)"}]}
- {id: freeze_frame_query, label: "Freeze Frame (query)", kind: query, command: "QSK:23", params: []}
- id: lens_position_info_set
  label: "Lens Position Information Control (set)"
  kind: action
  command: "#LPC[Data]"  # aw_ptz; response lPC[Data]
  params: [{name: data, type: string, description: "0(OFF) 1(ON)"}]
- id: lens_position_info_query
  label: "Lens Position Information Control (query)"
  kind: query
  command: "#LPC"  # aw_ptz; response lPC[Data]
  params: []
- id: power_set
  label: "PowerON/Standby (set)"
  kind: action
  command: "#O[Data]"  # aw_ptz; response p[Data]
  params: [{name: data, type: string, description: "0h(Standby) 1h(Power ON) 4h(Power OFF) 5h(Reboot)"}]
- id: power_query
  label: "PowerON/Standby (query)"
  kind: query
  command: "#O"  # aw_ptz; response p[Data]
  params: []
- {id: model_number_query, label: "Model Number (query)", kind: query, command: "QID", params: []}
  # response OID:[Data] e.g. "AG-UCK20"/"AG-MDC20"/"AG-UMR20"/"AG-MDR25"
- {id: software_version_query, label: "Software Version (query)", kind: query, command: "QSV", params: []}
  # response OSV:[Data] e.g. "Ver.*****"

# === 3.7 Recording Settings ===
- {id: system_freq_set, label: "System Freq (set)", kind: action, command: "OSE:77:[Data]", params: [{name: data, type: string, description: "0h(59.94Hz) 1h(50.00Hz)"}]}
- {id: system_freq_query, label: "System Freq (query)", kind: query, command: "QSE:77", params: []}

# === 3.8 Output Settings ===
- {id: sdi_mode_sel_set, label: "SDI Mode Sel (set)", kind: action, command: "OSK:24:[Data]", params: [{name: data, type: string, description: "0h(NORMAL) 1h(THROUGH)"}]}
- {id: sdi_mode_sel_query, label: "SDI Mode Sel (query)", kind: query, command: "QSK:24", params: []}
- {id: output_sel_set, label: "Output Sel (set)", kind: action, command: "OSK:18:[Data]", params: [{name: data, type: string, description: "1h(HDMI) 2h(SDI) 3h(HDMI+SDI)"}]}
- {id: output_sel_query, label: "Output Sel (query)", kind: query, command: "QSK:18", params: []}
- {id: char_output_set, label: "Char Output (set)", kind: action, command: "OSE:7B:[Data]", params: [{name: data, type: string, description: "00h(CHAR OFF) 03h(CHAR ON)"}]}
- {id: char_output_query, label: "Char Output (query)", kind: query, command: "QSE:7B", params: []}
- {id: test_tone_set, label: "Test Tone (set)", kind: action, command: "OSK:19:[Data]", params: [{name: data, type: string, description: "0h(OFF) 1h(Level1) 2h(Level2)"}]}
- {id: test_tone_query, label: "Test Tone (query)", kind: query, command: "QSK:19", params: []}

# === 3.9 Display Settings ===
- {id: color_bars_set, label: "Color Bars (set)", kind: action, command: "DCB:[Data]", params: [{name: data, type: string, description: "0(OFF) 1(ON)"}]}
- {id: color_bars_query, label: "Color Bars (query)", kind: query, command: "QBR", params: []}
  # query response OBR:[Data]
- {id: bars_type_set, label: "Bars Type (set)", kind: action, command: "OSD:BA:[Data]", params: [{name: data, type: string, description: "0h(TYPE2) 1h(TYPE1)"}]}
- {id: bars_type_query, label: "Bars Type (query)", kind: query, command: "QSD:BA", params: []}

# === 3.10 Other Settings ===
- {id: display_menu_set, label: "Display Menu (set)", kind: action, command: "OSK:17:[Data]", params: [{name: data, type: string, description: "0(Touch) 1(Text)"}]}
- {id: display_menu_query, label: "Display Menu (query)", kind: query, command: "QSK:17", params: []}
- {id: osd_status_set, label: "OSD Status (set)", kind: action, command: "OSA:88:[Data]", params: [{name: data, type: string, description: "0(OFF) 1(ON)"}]}
- {id: osd_status_query, label: "OSD Status (query)", kind: query, command: "QSA:88", params: []}
- {id: initial_settings, label: "Initial Settings (scene + user)", kind: action, command: "INM", params: []}

# === 3.11 Menu Control ===
- {id: menu_onoff_set, label: "Menu On/Off (set)", kind: action, command: "DUS:[Data]", params: [{name: data, type: string, description: "0h(OFF) 1h(ON menu settings) 2h(Force text, UCK20/MDC20) 3h(Force touch)"}]}
- {id: menu_onoff_query, label: "Menu On/Off (query)", kind: query, command: "QUS", params: []}
  # query response OUS:[Data]
- {id: menu_cancel, label: "Menu Cancel", kind: action, command: "DPG:[Data]", params: [{name: data, type: string, description: "1h(Execute)"}]}
- {id: menu_set_button, label: "SET Button", kind: action, command: "DIT:[Data]", params: [{name: data, type: string, description: "1h(Execute)"}]}
- {id: menu_up, label: "Menu UP", kind: action, command: "DUP:[Data]", params: [{name: data, type: string, description: "1h(1Step) Ah(10Step)"}]}
- {id: menu_down, label: "Menu DOWN", kind: action, command: "DDW:[Data]", params: [{name: data, type: string, description: "1h(1Step) Ah(10Step)"}]}

# === 4. Update notification session control + 5. batch acquisition ===
- {id: event_connect_start, label: "Update Notification Receive Start", kind: action, command: "GET /cgi-bin/event?connect=start&my_port=31004&uid=0", params: []}
  # response: 204 No Content
- {id: event_connect_stop, label: "Update Notification Receive End", kind: action, command: "GET /cgi-bin/event?connect=stop&my_port=31004&uid=0", params: []}
  # response: 204 No Content
- {id: get_camera_info_batch, label: "Camera Info Batch Acquisition", kind: query, command: "GET /live/camdata.html", params: []}
  # response 200 OK with camera info block (see Feedbacks), [CR][LF]-separated
```

## Feedbacks
```yaml
# Query responses echo the set-command token (e.g. set OGU:08 -> response "OGU:08").
# Query responses use the documented response token (e.g. QSF -> "OSF:[Data]").
# Below are the distinct observable states, including the batch camdata.html fields.
- id: power_state
  type: enum
  values: [standby, power_on]
  token: "p[data]"  # 0=Standby 1=PowerOn
- id: error_state
  type: enum
  values: [normal, error]
  token: "OER:[data]"  # 0=Normal 1=Error
- id: iris_mode_state
  type: enum
  values: [manual, auto]
  token: "d3[data]"
- id: focus_mode_state
  type: enum
  values: [manual, auto]
  token: "d1[data]"
- id: iris_position
  type: range
  token: "OSD:4F:[data]"  # 00=Close ... FF=Open
- id: zoom_position
  type: range
  token: "axz[data]"  # 555h~FFFh
- id: focus_position
  type: range
  token: "axf[data]"  # 555h~FFFh
- id: model_name
  type: string
  token: "OID:[data]"
- id: camera_title
  type: string
  token: "TITLE:[data]"  # max 20 half-size chars
- id: series_signal
  type: string
  token: "OSK:22:[data]"  # "AG-POVCAM2"
- id: output_format
  type: enum
  token: "OSA:87:[data]"  # video format code
- id: cgi_send_interval
  type: integer
  token: "CGI_TIME:[data]"  # fixed 0
# All set-commands listed in Actions also return their token as feedback.
```

## Variables
```yaml
# Settable parameters that are not discrete actions are represented as the
# parameterized actions in the Actions section (each carries a `data` param).
# No additional standalone variables beyond those actions.
```

## Events
```yaml
# Unsolicited push notifications camera sends to terminal TCP port (31004) once
# event receive started. Framed as [CR][LF]<command-response>[CR][LF].
# Receive frame: Reserve(22) | Size(2) | Reserve(4) | UpdateInfo(var max 504) | Reserve(24)
# UpdateInfo length = Size - 8 bytes.
- id: setting_change_notification
  description: "Posted on any setting/status change (local or other terminal). Body mirrors the command-response token, e.g. OGU:08."
- id: power_change_notification
  token: "p1"  # e.g. Power On
- id: color_bar_notification
  token: "DCB:1"  # e.g. Color bar On
- id: version_info_notification
  cycle_seconds: 60
  token: "qSV3V*****L000"  # version posted every 60s
- id: lpi_notification
  cycle_ms: 300
  description: "Lens position info, posted every 300ms when #LPC=ON and lens info changed."
  token: "lPI [ZZZ] [FFF] [III]"  # ZZZ=zoom FFF=focus III=iris position
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Note: Power set command supports reboot
# (#O5h) and power-off (#O4h) - treat as potentially impactful; source states no
# confirmation procedure.
```

## Notes
- Protocol mismatch vs family assumption: family labelled "RS-232C camcorders" but refined source describes **HTTP/CGI over TCP only** — no RS-232 in document. Probably shares Panasonic IP ROP protocol lineage with AW-/AK-HRP controllers.
- Endpoint routing: command token starting `#` → `aw_ptz`; everything else → `aw_cam`. URL-encode `#` as `%23`.
- `res` (Type) param: fixed `1` normally; `0` for AWB (`OWS`) and ABB (`OAS`) commands.
- Command spacing: >=130 ms between successive commands.
- Some functions restricted depending on POVCAM-side state; details in instruction manual (not in source).
- Shutter/SynchroScan/AutoSlowShutter/AutoShutterLimit/VAR step tables differ by `CamFormat` (OSK:20) — large lookup tables in source sections 3.4.1–3.4.5.
- Error returns: `ER1` (unsupported command), `ER2` (busy / standby), `ER3` (data outside acceptable range). Format `200 OK "ER3:OGU"`.
- Batch endpoint `/live/camdata.html` returns all camera info in one body, `[CR][LF]`-separated.
- Update notification requires explicit start/stop session; re-run start step if LAN drops.

<!-- UNRESOLVED: HTTP control port number not stated in source (do not assume 80). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: RS-232C command list (if any) not present in this source — confirm whether a separate serial doc exists. -->
<!-- UNRESOLVED: auth model undocumented beyond no-login evidence; no token/credential format in source. -->
```

## Provenance

```yaml
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - "https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/POVCAM/POVCAM_IF(MENU_CAM)_V1.0E.pdf"
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/EN/top.html
  - "https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/POVCAM/POVCAM_IF(IP_CLIP)_V1.0E.pdf"
retrieved_at: 2026-07-02T10:13:13.117Z
last_checked_at: 2026-07-07T11:48:27.527Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:48:27.527Z
matched_actions: 208
action_count: 208
confidence: medium
summary: "All 208 spec actions map exactly to commands documented in the source; transport URLs and event endpoint match verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "assumed family was \"RS-232C camcorders\" but source documents HTTP/CGI control only — no RS-232 in source. HTTP control port not explicitly stated. Auth/token behavior undocumented beyond \"no login shown\"."
- "HTTP port number not stated in source"
- "source documents no named multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "HTTP control port number not stated in source (do not assume 80)."
- "firmware version compatibility not stated."
- "RS-232C command list (if any) not present in this source — confirm whether a separate serial doc exists."
- "auth model undocumented beyond no-login evidence; no token/credential format in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
