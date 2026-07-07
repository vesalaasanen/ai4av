---
spec_id: admin/panasonic-ag-cx370
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic AG-CX370 Control Spec"
manufacturer: Panasonic
model_family: AG-CX370
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - AG-CX370
    - AG-CX350
    - AJ-UPX360
    - AG-CX200
    - AJ-CX4000
    - AJ-UPX900
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/CX350_CX4000_Command_for_PTZ_Control_Protocol.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/CX350_Command_for_PTZ_Control_Protocol.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/EN/top.html
retrieved_at: 2026-07-03T20:37:15.706Z
last_checked_at: 2026-07-07T11:48:26.738Z
generated_at: 2026-07-07T11:48:26.738Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not explicitly list AG-CX370 in its applicable-models list (lists AG-CX350/AJ-UPX360/AG-CX200/AJ-CX4000/AJ-UPX900). AG-CX370 inclusion inferred from CX-family lineage and the discover memo; not verified against device."
  - "no authentication procedure described in source."
  - "no safety / power-interlock warnings present in refined source."
  - "source does not document unsolicited event/notification messages."
  - "no multi-step sequences described in source."
  - "no safety warnings, interlock procedures, or power-on sequencing present in source."
  - "AG-CX370 not in source applicable-models list."
  - "AG-CX370 firmware version requirement not stated (source gives AG-CX350 Ver6.00~ etc.)."
  - "no authentication / credential model described."
  - "no event/notification push protocol documented."
  - "no safety interlock content in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:48:26.738Z
  matched_actions: 245
  action_count: 245
  confidence: medium
  summary: "All 245 spec action units matched verbatim against source command tables with correct shapes and transport parameters confirmed; source and spec are fully bidirectionally covered. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Panasonic AG-CX370 Control Spec

## Summary
The Panasonic AG-CX370 is a handheld camcorder in the CX series. This spec covers IP control of CX-series cameras via the Panasonic PTZ Control Protocol over HTTP 1.1 / CGI on TCP port 80, including pan-tilt head (lens) control, camera (paint) control, and video-transmission / network-application control. The source document is titled "CX350/CX4000 Control Using PTZ Control Protocol" (Rev.3.00, 2022-01-25).

<!-- UNRESOLVED: source does not explicitly list AG-CX370 in its applicable-models list (lists AG-CX350/AJ-UPX360/AG-CX200/AJ-CX4000/AJ-UPX900). AG-CX370 inclusion inferred from CX-family lineage and the discover memo; not verified against device. -->
<!-- UNRESOLVED: no authentication procedure described in source. -->
<!-- UNRESOLVED: no safety / power-interlock warnings present in refined source. -->

## Transport
```yaml
# Three CGI endpoint families (all HTTP 1.1 GET, port 80):
#   pan-tilt head control  -> /cgi-bin/aw_ptz?cmd={opcode}&res=1   (res always 1)
#   camera control         -> /cgi-bin/aw_cam?cmd={opcode}&res=1    (res=0 for AWB/ABB exec: OWS, OAS)
#   video/network control  -> /cgi-bin/{path}?{param}={value}
# Camera only responds when NDI HX mode is ON or IP REMOTE is ENABLE(HOLD); all commands return 404 otherwise.
# '#' in aw_ptz opcodes must be URL-encoded as %23 by some clients.
protocols:
  - http
addressing:
  port: 80
  base_url: "http://{ip_address}/cgi-bin/"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable: NO - source states CX series cannot be powered on/off via PTZ command (query only)
# - routable: NO routing commands in source
- queryable  # inferred: many query (Qxx / #Gxx / #Qxx) commands returning state present
- levelable  # inferred: gain, iris, zoom, pedestal, chroma, gamma level controls present
```

## Actions
```yaml
# =====================================================================
# 4.1.1.1 POWER ON/STANDBY  (endpoint: aw_ptz)
# CX series cannot be turned On/Off by PTZ command; query only.
# =====================================================================
- id: power_status_query
  label: Power On/Standby Query
  kind: query
  command: "#O"
  params: []
  note: response always "p1" (Power On)

# =====================================================================
# 4.1.2.1 ZOOM  (endpoint: aw_ptz)
# =====================================================================
- id: zoom_position_query
  label: Zoom Position Query
  kind: query
  command: "#GZ"
  params: []
- id: zoom_speed_control
  label: Zoom Speed Control
  kind: action
  command: "#Z{speed}"
  params:
    - name: speed
      type: integer
      description: "01-49 Wide Max->Wide Min speed; 50 Stop; 51-99 Tele Min->Tele Max speed"

# =====================================================================
# 4.1.2.2 FOCUS  (endpoint: aw_ptz)
# =====================================================================
- id: focus_position_control_axf
  label: Focus Position Control (AXF)
  kind: action
  command: "#AXF{position}"
  params:
    - name: position
      type: string
      description: "555h~F93h (Near~Far/infinity); invalid when auto focus On"
- id: focus_position_query_axf
  label: Focus Position Query (AXF)
  kind: query
  command: "#AXF"
  params: []
- id: focus_position_query_gf
  label: Focus Position Query (GF)
  kind: query
  command: "#GF"
  params: []
- id: focus_speed_control
  label: Focus Speed Control
  kind: action
  command: "#F{speed}"
  params:
    - name: speed
      type: integer
      description: "01-49 Near Max->Near Min; 50 Stop; 51-99 Far Min->Far Max; invalid when AF On"
- id: autofocus_onoff_control_ptz
  label: Auto Focus On/Off Control
  kind: action
  command: "#D1{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
      description: "0=Off(Manual), 1=On(Auto)"
- id: autofocus_onoff_query_ptz
  label: Auto Focus On/Off Query
  kind: query
  command: "#D1"
  params: []

# =====================================================================
# 4.1.2.3 IRIS  (endpoint: aw_ptz)
# =====================================================================
- id: iris_position_control_i
  label: Iris Position Control
  kind: action
  command: "#I{position}"
  params:
    - name: position
      type: integer
      description: "01-99 (Iris Close~Iris Open); error if Iris mode Auto"
- id: iris_position_query_i
  label: Iris Position Query (I)
  kind: query
  command: "#I"
  params: []
- id: iris_position_control_axi
  label: Iris Position Control (AXI)
  kind: action
  command: "#AXI{position}"
  params:
    - name: position
      type: string
      description: "555h~FFFh (Close~Open)"
- id: iris_position_query_axi
  label: Iris Position Query (AXI)
  kind: query
  command: "#AXI"
  params: []
- id: iris_automode_query_gi
  label: Iris Position / Auto-Manual Query (GI)
  kind: query
  command: "#GI"
  params: []
- id: autoiris_onoff_control
  label: Auto Iris On/Off Control
  kind: action
  command: "#D3{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
      description: "0=Manual Iris, 1=Auto Iris"
- id: autoiris_onoff_query
  label: Auto Iris On/Off Query
  kind: query
  command: "#D3"
  params: []

# =====================================================================
# 4.1.3.1 TALLY  (endpoint: aw_ptz)
# =====================================================================
- id: rtally_onoff_control_ptz
  label: R-Tally On/Off Control
  kind: action
  command: "#DA{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
      description: "0=R-Tally Off, 1=R-Tally On"
- id: rtally_onoff_query_ptz
  label: R-Tally On/Off Query
  kind: query
  command: "#DA"
  params: []

# =====================================================================
# 4.2.1.1 FOCUS  (endpoint: aw_cam)
# =====================================================================
- id: focus_automode_control
  label: Focus Auto/Manual Control
  kind: action
  command: "OAF:{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
      description: "0=Manual, 1=Auto"
- id: focus_automode_query
  label: Focus Auto/Manual Query
  kind: query
  command: "QAF"
  params: []
- id: onetouch_focus_control
  label: One-Touch Focus Control
  kind: action
  command: "OSE:69:1"
  params: []

# =====================================================================
# 4.2.1.2 IRIS  (endpoint: aw_cam)
# =====================================================================
- id: iris_automode_control_ors
  label: Iris Auto/Manual Control (ORS)
  kind: action
  command: "ORS:{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
      description: "0=Manual, 1=Auto"
- id: iris_automode_query_qrs
  label: Iris Auto/Manual Query (QRS)
  kind: query
  command: "QRS"
  params: []
- id: autoiris_offset_control
  label: Picture Level Auto Iris Offset Control
  kind: action
  command: "OSD:48:{offset}"
  params:
    - name: offset
      type: string
      description: "00h~64h (-50~+50; 32h=0)"
- id: autoiris_offset_query
  label: Picture Level Auto Iris Offset Query
  kind: query
  command: "QSD:48"
  params: []
- id: iris_volume_control
  label: Iris Volume Control (Manual)
  kind: action
  command: "ORV:{volume}"
  params:
    - name: volume
      type: string
      description: "000h~3FFh (Close~Open)"
- id: iris_volume_query_qrv
  label: Iris Volume Query (QRV)
  kind: query
  command: "QRV"
  params: []
- id: iris_volume_status_query
  label: Iris Volume Status Query (QSD:4F)
  kind: query
  command: "QSD:4F"
  params: []
- id: autoiris_speed_control
  label: Auto Iris Speed Control
  kind: action
  command: "OSJ:01:{speed}"
  params:
    - name: speed
      type: enum
      values: ["0h", "1h", "2h"]
      description: "Slow / Normal / Fast"
- id: autoiris_speed_query
  label: Auto Iris Speed Query
  kind: query
  command: "QSJ:01"
  params: []
- id: autoiris_window_control
  label: Auto Iris Window Control
  kind: action
  command: "OSJ:02:{window}"
  params:
    - name: window
      type: enum
      values: ["0h", "1h", "2h"]
      description: "Normal1 / Normal2 / Center"
- id: autoiris_window_query
  label: Auto Iris Window Query
  kind: query
  command: "QSJ:02"
  params: []

# =====================================================================
# 4.2.1.3 ND FILTER  (endpoint: aw_cam)
# =====================================================================
- id: ndfilter_control
  label: ND Filter Control
  kind: action
  command: "OFT:{filter}"
  params:
    - name: filter
      type: enum
      values: ["0", "1", "2", "3"]
      description: "Through / 1/4 / 1/16 / 1/64"
- id: ndfilter_query
  label: ND Filter Query
  kind: query
  command: "QFT"
  params: []

# =====================================================================
# 4.2.2.1 COLOR BARS  (endpoint: aw_cam)
# =====================================================================
- id: colorbar_camera_control
  label: Color Bar/Camera Control
  kind: action
  command: "DCB:{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
      description: "0=Camera, 1=Color Bars"
- id: colorbar_camera_query
  label: Color Bar/Camera Query
  kind: query
  command: "QBR"
  params: []

# =====================================================================
# 4.2.3.1 SCENE FILE  (endpoint: aw_cam)
# =====================================================================
- id: scenefile_control
  label: Scene File Control
  kind: action
  command: "XSF:{scene}"
  params:
    - name: scene
      type: enum
      values: ["0", "1", "2", "3", "4", "5"]
      description: "Scene1~Scene6"
- id: scenefile_query
  label: Scene File Query
  kind: query
  command: "QSF"
  params: []

# =====================================================================
# 4.2.4.1 SHUTTER  (endpoint: aw_cam)
# =====================================================================
- id: autoshutter_limit_control
  label: Auto Shutter Limit Control
  kind: action
  command: "OSD:BF:{limit}"
  params:
    - name: limit
      type: enum
      values: ["2", "3", "4"]
      description: "1/100 / 1/120 / 1/250"
- id: autoshutter_limit_query
  label: Auto Shutter Limit Query
  kind: query
  command: "QSD:BF"
  params: []

# =====================================================================
# 4.2.5.1 GAIN  (endpoint: aw_cam)
# =====================================================================
- id: gain_control
  label: Gain Control
  kind: action
  command: "OGU:{gain}"
  params:
    - name: gain
      type: string
      description: "02h~32h (-6~42dB, 1dB steps); 80h=Auto(AGC ON); 81h=Manual(AGC OFF)"
- id: gain_query
  label: Gain Query
  kind: query
  command: "QGU"
  params: []
- id: agc_maxgain_control
  label: AGC Maximum Gain Value Control
  kind: action
  command: "OSD:69:{value}"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2", "3"]
      description: "3dB / 6dB / 12dB / 18dB"
- id: agc_maxgain_query
  label: AGC Maximum Gain Value Query
  kind: query
  command: "QSD:69"
  params: []

# =====================================================================
# 4.2.6.1 R/B GAIN  (endpoint: aw_cam)
# =====================================================================
- id: rgain_control_ori
  label: R Gain Control (ORI)
  kind: action
  command: "ORI:{gain}"
  params:
    - name: gain
      type: string
      description: "000h~12Ch (-200~+200; 096h=0)"
- id: rgain_query_qri
  label: R Gain Query (QRI)
  kind: query
  command: "QRI"
  params: []
- id: rgain_control_osg39
  label: R Gain Control (OSG:39)
  kind: action
  command: "OSG:39:{gain}"
  params:
    - name: gain
      type: string
      description: "738h~8C8h (-200~+200; 800h=0)"
- id: rgain_query_qsg39
  label: R Gain Query (QSG:39)
  kind: query
  command: "QSG:39"
  params: []
- id: bgain_control_obi
  label: B Gain Control (OBI)
  kind: action
  command: "OBI:{gain}"
  params:
    - name: gain
      type: string
      description: "000h~12Ch (-200~+200)"
- id: bgain_query_qbi
  label: B Gain Query (QBI)
  kind: query
  command: "QBI"
  params: []
- id: bgain_control_osg3a
  label: B Gain Control (OSG:3A)
  kind: action
  command: "OSG:3A:{gain}"
  params:
    - name: gain
      type: string
      description: "738h~8C8h (-200~+200)"
- id: bgain_query_qsg3a
  label: B Gain Query (QSG:3A)
  kind: query
  command: "QSG:3A"
  params: []

# =====================================================================
# 4.2.6.2 R/B PEDESTAL  (endpoint: aw_cam)
# =====================================================================
- id: rpedestal_control
  label: R Pedestal Control
  kind: action
  command: "ORP:{value}"
  params:
    - name: value
      type: string
      description: "032h~0FAh (-100~+100; 096h=0); not changeable in V-Log"
- id: rpedestal_query
  label: R Pedestal Query
  kind: query
  command: "QRP"
  params: []
- id: bpedestal_control
  label: B Pedestal Control
  kind: action
  command: "OBP:{value}"
  params:
    - name: value
      type: string
      description: "032h~0FAh (-100~+100); not changeable in V-Log"
- id: bpedestal_query
  label: B Pedestal Query
  kind: query
  command: "QBP"
  params: []
- id: masterpedestal_control
  label: Master Pedestal Control
  kind: action
  command: "OSJ:0F:{value}"
  params:
    - name: value
      type: string
      description: "738h~8C8h (-200~+200); not changeable in V-Log"
- id: masterpedestal_query
  label: Master Pedestal Query
  kind: query
  command: "QSJ:0F"
  params: []
- id: gpedestal_control
  label: G Pedestal Control
  kind: action
  command: "OSJ:10:{value}"
  params:
    - name: value
      type: string
      description: "032h~0FAh (-100~+100); not changeable in V-Log"
- id: gpedestal_query
  label: G Pedestal Query
  kind: query
  command: "QSJ:10"
  params: []
- id: pedestal_offset_control
  label: Pedestal Offset Control
  kind: action
  command: "OSJ:11:{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
      description: "Off / On"
- id: pedestal_offset_query
  label: Pedestal Offset Query
  kind: query
  command: "QSJ:11"
  params: []

# =====================================================================
# 4.2.6.3 COLOR MATRIX & LINEAR MATRIX  (endpoint: aw_cam)
# =====================================================================
- id: colormatrix_control
  label: Color Matrix Control
  kind: action
  command: "OSE:31:{matrix}"
  params:
    - name: matrix
      type: enum
      values: ["0", "1", "2", "3"]
      description: "NORMAL1 / NORMAL2 / FULO. / CINELIKE"
- id: colormatrix_query
  label: Color Matrix Query
  kind: query
  command: "QSE:31"
  params: []
- id: linearmatrix_rg_control
  label: Linear Matrix R-G Control
  kind: action
  command: "OSD:A4:{value}"
  params:
    - {name: value, type: string, description: "41h~BFh (-63~+63; 80h=0)"}
- id: linearmatrix_rg_query
  label: Linear Matrix R-G Query
  kind: query
  command: "QSD:A4"
  params: []
- id: linearmatrix_rb_control
  label: Linear Matrix R-B Control
  kind: action
  command: "OSD:A5:{value}"
  params:
    - {name: value, type: string, description: "41h~BFh (-63~+63)"}
- id: linearmatrix_rb_query
  label: Linear Matrix R-B Query
  kind: query
  command: "QSD:A5"
  params: []
- id: linearmatrix_gr_control
  label: Linear Matrix G-R Control
  kind: action
  command: "OSD:A6:{value}"
  params:
    - {name: value, type: string, description: "41h~BFh (-63~+63)"}
- id: linearmatrix_gr_query
  label: Linear Matrix G-R Query
  kind: query
  command: "QSD:A6"
  params: []
- id: linearmatrix_gb_control
  label: Linear Matrix G-B Control
  kind: action
  command: "OSD:A7:{value}"
  params:
    - {name: value, type: string, description: "41h~BFh (-63~+63)"}
- id: linearmatrix_gb_query
  label: Linear Matrix G-B Query
  kind: query
  command: "QSD:A7"
  params: []
- id: linearmatrix_br_control
  label: Linear Matrix B-R Control
  kind: action
  command: "OSD:A8:{value}"
  params:
    - {name: value, type: string, description: "41h~BFh (-63~+63)"}
- id: linearmatrix_br_query
  label: Linear Matrix B-R Query
  kind: query
  command: "QSD:A8"
  params: []
- id: linearmatrix_bg_control
  label: Linear Matrix B-G Control
  kind: action
  command: "OSD:A9:{value}"
  params:
    - {name: value, type: string, description: "41h~BFh (-63~+63)"}
- id: linearmatrix_bg_query
  label: Linear Matrix B-G Query
  kind: query
  command: "QSD:A9"
  params: []

# ---- Color correction (multi-axis gain/saturation & phase) ----
- {id: cc_r_gain_control, label: "CC R GAIN/SAT Control", kind: action, command: "OSD:86:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_r_gain_query, label: "CC R GAIN/SAT Query", kind: query, command: "QSD:86", params: []}
- {id: cc_r_phase_control, label: "CC R PHASE Control", kind: action, command: "OSD:87:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_r_phase_query, label: "CC R PHASE Query", kind: query, command: "QSD:87", params: []}
- {id: cc_r_r_yi_gain_control, label: "CC R_R_YI GAIN/SAT Control", kind: action, command: "OSD:9C:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_r_r_yi_gain_query, label: "CC R_R_YI GAIN/SAT Query", kind: query, command: "QSD:9C", params: []}
- {id: cc_r_r_yi_phase_control, label: "CC R_R_YI PHASE Control", kind: action, command: "OSD:9D:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_r_r_yi_phase_query, label: "CC R_R_YI PHASE Query", kind: query, command: "QSD:9D", params: []}
- {id: cc_r_yi_gain_control, label: "CC R_YI GAIN/SAT Control", kind: action, command: "OSD:88:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_r_yi_gain_query, label: "CC R_YI GAIN/SAT Query", kind: query, command: "QSD:88", params: []}
- {id: cc_r_yi_phase_control, label: "CC R_YI PHASE Control", kind: action, command: "OSD:89:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_r_yi_phase_query, label: "CC R_YI PHASE Query", kind: query, command: "QSD:89", params: []}
- {id: cc_r_yi_yi_gain_control, label: "CC R_YI_YI GAIN/SAT Control", kind: action, command: "OSD:9E:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_r_yi_yi_gain_query, label: "CC R_YI_YI GAIN/SAT Query", kind: query, command: "QSD:9E", params: []}
- {id: cc_r_yi_yi_phase_control, label: "CC R_YI_YI PHASE Control", kind: action, command: "OSD:9F:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_r_yi_yi_phase_query, label: "CC R_YI_YI PHASE Query", kind: query, command: "QSD:9F", params: []}
- {id: cc_yi_gain_control, label: "CC YI GAIN/SAT Control", kind: action, command: "OSD:8A:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_yi_gain_query, label: "CC YI GAIN/SAT Query", kind: query, command: "QSD:8A", params: []}
- {id: cc_yi_phase_control, label: "CC YI PHASE Control", kind: action, command: "OSD:8B:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_yi_phase_query, label: "CC YI PHASE Query", kind: query, command: "QSD:8B", params: []}
- {id: cc_yi_g_gain_control, label: "CC YI_G GAIN/SAT Control", kind: action, command: "OSD:8C:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_yi_g_gain_query, label: "CC YI_G GAIN/SAT Query", kind: query, command: "QSD:8C", params: []}
- {id: cc_yi_g_phase_control, label: "CC YI_G PHASE Control", kind: action, command: "OSD:8D:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_yi_g_phase_query, label: "CC YI_G PHASE Query", kind: query, command: "QSD:8D", params: []}
- {id: cc_g_gain_control, label: "CC G GAIN/SAT Control", kind: action, command: "OSD:8E:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_g_gain_query, label: "CC G GAIN/SAT Query", kind: query, command: "QSD:8E", params: []}
- {id: cc_g_phase_control, label: "CC G PHASE Control", kind: action, command: "OSD:8F:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_g_phase_query, label: "CC G PHASE Query", kind: query, command: "QSD:8F", params: []}
- {id: cc_g_cy_gain_control, label: "CC G_Cy GAIN/SAT Control", kind: action, command: "OSD:90:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_g_cy_gain_query, label: "CC G_Cy GAIN/SAT Query", kind: query, command: "QSD:90", params: []}
- {id: cc_g_cy_phase_control, label: "CC G_Cy PHASE Control", kind: action, command: "OSD:91:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_g_cy_phase_query, label: "CC G_Cy PHASE Query", kind: query, command: "QSD:91", params: []}
- {id: cc_cy_gain_control, label: "CC Cy GAIN/SAT Control", kind: action, command: "OSD:92:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_cy_gain_query, label: "CC Cy GAIN/SAT Query", kind: query, command: "QSD:92", params: []}
- {id: cc_cy_phase_control, label: "CC Cy PHASE Control", kind: action, command: "OSD:93:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_cy_phase_query, label: "CC Cy PHASE Query", kind: query, command: "QSD:93", params: []}
- {id: cc_cy_b_gain_control, label: "CC Cy_B GAIN/SAT Control", kind: action, command: "OSD:94:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_cy_b_gain_query, label: "CC Cy_B GAIN/SAT Query", kind: query, command: "QSD:94", params: []}
- {id: cc_cy_b_phase_control, label: "CC Cy_B PHASE Control", kind: action, command: "OSD:95:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_cy_b_phase_query, label: "CC Cy_B PHASE Query", kind: query, command: "QSD:95", params: []}
- {id: cc_b_gain_control, label: "CC B GAIN/SAT Control", kind: action, command: "OSD:96:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_b_gain_query, label: "CC B GAIN/SAT Query", kind: query, command: "QSD:96", params: []}
- {id: cc_b_phase_control, label: "CC B PHASE Control", kind: action, command: "OSD:97:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_b_phase_query, label: "CC B PHASE Query", kind: query, command: "QSD:97", params: []}
- {id: cc_b_mg_gain_control, label: "CC B_Mg GAIN/SAT Control", kind: action, command: "OSD:80:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_b_mg_gain_query, label: "CC B_Mg GAIN/SAT Query", kind: query, command: "QSD:80", params: []}
- {id: cc_b_mg_phase_control, label: "CC B_Mg PHASE Control", kind: action, command: "OSD:81:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_b_mg_phase_query, label: "CC B_Mg PHASE Query", kind: query, command: "QSD:81", params: []}
- {id: cc_mg_gain_control, label: "CC Mg GAIN/SAT Control", kind: action, command: "OSD:82:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_mg_gain_query, label: "CC Mg GAIN/SAT Query", kind: query, command: "QSD:82", params: []}
- {id: cc_mg_phase_control, label: "CC Mg PHASE Control", kind: action, command: "OSD:83:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_mg_phase_query, label: "CC Mg PHASE Query", kind: query, command: "QSD:83", params: []}
- {id: cc_mg_r_gain_control, label: "CC Mg_R GAIN/SAT Control", kind: action, command: "OSD:84:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_mg_r_gain_query, label: "CC Mg_R GAIN/SAT Query", kind: query, command: "QSD:84", params: []}
- {id: cc_mg_r_phase_control, label: "CC Mg_R PHASE Control", kind: action, command: "OSD:85:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_mg_r_phase_query, label: "CC Mg_R PHASE Query", kind: query, command: "QSD:85", params: []}
- {id: cc_mg_r_r_gain_control, label: "CC Mg_R_R GAIN/SAT Control", kind: action, command: "OSD:9A:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_mg_r_r_gain_query, label: "CC Mg_R_R GAIN/SAT Query", kind: query, command: "QSD:9A", params: []}
- {id: cc_mg_r_r_phase_control, label: "CC Mg_R_R PHASE Control", kind: action, command: "OSD:9B:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_mg_r_r_phase_query, label: "CC Mg_R_R PHASE Query", kind: query, command: "QSD:9B", params: []}
- {id: cc_yi_yi_g_gain_control, label: "CC YI_YI_G GAIN/SAT Control", kind: action, command: "OSJ:1C:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_yi_yi_g_gain_query, label: "CC YI_YI_G GAIN/SAT Query", kind: query, command: "QSJ:1C", params: []}
- {id: cc_yi_yi_g_phase_control, label: "CC YI_YI_G PHASE Control", kind: action, command: "OSJ:1D:{value}", params: [{name: value, type: string, description: "41h~BFh (-63~+63)"}]}
- {id: cc_yi_yi_g_phase_query, label: "CC YI_YI_G PHASE Query", kind: query, command: "QSJ:1D", params: []}
- id: adaptive_matrix_control
  label: Adaptive Matrix Control
  kind: action
  command: "OSJ:4F:{mode}"
  params:
    - {name: mode, type: enum, values: ["0", "1"], description: "OFF / ON"}
- id: adaptive_matrix_query
  label: Adaptive Matrix Query
  kind: query
  command: "QSJ:4F"
  params: []

# =====================================================================
# 4.2.7.1 CHROMA LEVEL / PHASE  (endpoint: aw_cam)
# =====================================================================
- id: chroma_level_control
  label: Chroma Level Control
  kind: action
  command: "OSD:B0:{level}"
  params:
    - {name: level, type: string, description: "00h=OFF; 1Dh~E3h (-99%~+99%; 80h=0)"}
- id: chroma_level_query
  label: Chroma Level Query
  kind: query
  command: "QSD:B0"
  params: []
- id: chroma_phase_control
  label: Chroma Phase Control
  kind: action
  command: "OSJ:0B:{phase}"
  params:
    - {name: phase, type: string, description: "61h~9Fh (-31~+31; 80h=0)"}
- id: chroma_phase_query
  label: Chroma Phase Query
  kind: query
  command: "QSJ:0B"
  params: []

# =====================================================================
# 4.2.8.1 AWB / ABB  (endpoint: aw_cam; OWS/OAS use res=0)
# =====================================================================
- id: awb_execution_control
  label: AWB Execution Control
  kind: action
  command: "OWS"
  params: []
  note: use res=0; no normal response
- id: awb_mode_control
  label: AWB Mode Control
  kind: action
  command: "OAW:{mode}"
  params:
    - {name: mode, type: enum, values: ["0", "1", "2", "3", "4", "5"], description: "ATW / A / B / VAR / 3200K / 5600K"}
- id: awb_mode_query
  label: AWB Mode Query
  kind: query
  command: "QAW"
  params: []
- id: abb_execution_control
  label: ABB Execution Control
  kind: action
  command: "OAS"
  params: []
  note: use res=0; no normal response
- id: colortemp_inc_control
  label: Color Temperature Increment Control
  kind: action
  command: "OSI:1E:{step}"
  params:
    - {name: step, type: string, description: "1h~Ah (increment 1~10)"}
- id: colortemp_dec_control
  label: Color Temperature Decrement Control
  kind: action
  command: "OSI:1F:{step}"
  params:
    - {name: step, type: string, description: "1h~Ah (decrement 1~10)"}
- id: colortemp_query
  label: Color Temperature Query
  kind: query
  command: "QSI:20"
  params: []
- id: atw_speed_control
  label: ATW Speed Control
  kind: action
  command: "OSI:25:{speed}"
  params:
    - {name: speed, type: enum, values: ["0", "1", "2"], description: "Normal / Slow / Fast"}
- id: atw_speed_query
  label: ATW Speed Query
  kind: query
  command: "QSI:25"
  params: []
- id: awb_gain_offset_control
  label: AWB Gain Offset Control
  kind: action
  command: "OSJ:0C:{mode}"
  params:
    - {name: mode, type: enum, values: ["0h", "1h"], description: "Off / On"}
- id: awb_gain_offset_query
  label: AWB Gain Offset Query
  kind: query
  command: "QSJ:0C"
  params: []
- id: atw_target_r_control
  label: ATW Target R Control
  kind: action
  command: "OSJ:0D:{value}"
  params:
    - {name: value, type: string, description: "76h~8Ah (-10~+10; 80h=0)"}
- id: atw_target_r_query
  label: ATW Target R Query
  kind: query
  command: "QSJ:0D"
  params: []
- id: atw_target_b_control
  label: ATW Target B Control
  kind: action
  command: "OSJ:0E:{value}"
  params:
    - {name: value, type: string, description: "76h~8Ah (-10~+10; 80h=0)"}
- id: atw_target_b_query
  label: ATW Target B Query
  kind: query
  command: "QSJ:0E"
  params: []
- id: awb_colortemp_inc_control
  label: AWB Color Temperature Inc Control
  kind: action
  command: "OSJ:48:{step}"
  params:
    - {name: step, type: string, description: "1h~Ah (1~10)"}
- id: awb_colortemp_dec_control
  label: AWB Color Temperature Dec Control
  kind: action
  command: "OSJ:49:{step}"
  params:
    - {name: step, type: string, description: "1h~Ah (1~10)"}
- id: awb_colortemp_query
  label: AWB Color Temperature Query
  kind: query
  command: "QSJ:4A"
  params: []
- id: awb_r_gain_control
  label: AWB R Gain Control
  kind: action
  command: "OSJ:4B:{gain}"
  params:
    - {name: gain, type: string, description: "670h~990h (-400~+400; 800h=0); 400 if WB PRESET"}
- id: awb_r_gain_query
  label: AWB R Gain Query
  kind: query
  command: "QSJ:4B"
  params: []
- id: awb_b_gain_control
  label: AWB B Gain Control
  kind: action
  command: "OSJ:4C:{gain}"
  params:
    - {name: gain, type: string, description: "670h~990h (-400~+400); 400 if WB PRESET"}
- id: awb_b_gain_query
  label: AWB B Gain Query
  kind: query
  command: "QSJ:4C"
  params: []
- id: awb_g_axis_control
  label: AWB G Axis Control
  kind: action
  command: "OSJ:4D:{gain}"
  params:
    - {name: gain, type: string, description: "670h~990h (-400~+400); 400 if WB PRESET"}
- id: awb_g_axis_query
  label: AWB G Axis Query
  kind: query
  command: "QSJ:4D"
  params: []

# =====================================================================
# 4.2.9.1 DETAIL  (endpoint: aw_cam)
# =====================================================================
- id: detail_control
  label: Detail Control
  kind: action
  command: "ODT:{mode}"
  params:
    - {name: mode, type: enum, values: ["0", "1"], description: "Off / On"}
- id: detail_query
  label: Detail Query
  kind: query
  command: "QDT"
  params: []
- id: vdetail_level_control
  label: V Detail Level Control
  kind: action
  command: "OSD:A1:{level}"
  params:
    - {name: level, type: string, description: "79h~87h (-7~+7; 80h=0)"}
- id: vdetail_level_query
  label: V Detail Level Query
  kind: query
  command: "QSD:A1"
  params: []
- id: detail_frequency_control
  label: Detail Frequency Control
  kind: action
  command: "OSD:A2:{level}"
  params:
    - {name: level, type: string, description: "79h~87h (-7~+7)"}
- id: detail_frequency_query
  label: Detail Frequency Query
  kind: query
  command: "QSD:A2"
  params: []
- id: master_detail_control
  label: Master Detail Control
  kind: action
  command: "OSA:30:{level}"
  params:
    - {name: level, type: string, description: "61h~9Fh (-31~+31; 80h=0)"}
- id: master_detail_query
  label: Master Detail Query
  kind: query
  command: "QSA:30"
  params: []
- id: detail_gain_pos_control
  label: Detail Gain(+) Control
  kind: action
  command: "OSA:38:{level}"
  params:
    - {name: level, type: string, description: "61h~9Fh (-31~+31)"}
- id: detail_gain_pos_query
  label: Detail Gain(+) Query
  kind: query
  command: "QSA:38"
  params: []
- id: detail_gain_neg_control
  label: Detail Gain(-) Control
  kind: action
  command: "OSA:39:{level}"
  params:
    - {name: level, type: string, description: "61h~9Fh (-31~+31)"}
- id: knee_aperture_level_control
  label: Knee Aperture Level Control
  kind: action
  command: "OSG:3F:{level}"
  params:
    - {name: level, type: string, description: "00h~05h (0~5)"}
- id: knee_aperture_level_query
  label: Knee Aperture Level Query
  kind: query
  command: "QSG:3F"
  params: []
- id: detail_coring_control
  label: Detail Coring Control
  kind: action
  command: "OSJ:12:{level}"
  params:
    - {name: level, type: string, description: "00h~3Ch (0~60)"}
- id: detail_coring_query
  label: Detail Coring Query
  kind: query
  command: "QSJ:12"
  params: []
- id: level_depend_control
  label: Level Depend Control
  kind: action
  command: "OSJ:13:{level}"
  params:
    - {name: level, type: string, description: "00h~3Ch (0~60)"}
- id: level_depend_query
  label: Level Depend Query
  kind: query
  command: "QSJ:13"
  params: []

# =====================================================================
# 4.2.10.1 GAMMA  (endpoint: aw_cam)
# =====================================================================
- id: gamma_type_control
  label: Gamma Type Control
  kind: action
  command: "OSE:72:{type}"
  params:
    - {name: type, type: enum, values: ["0", "1", "2", "3", "4", "5", "6", "7"], description: "HD / SD / FILMLIKE1 / FILMLIKE2 / FILMLIKE2 / FILM-REC / VIDEO-REC / HLG"}
- id: gamma_type_query
  label: Gamma Type Query
  kind: query
  command: "QSE:72"
  params: []
- id: gamma_control
  label: Gamma Control
  kind: action
  command: "OSA:6A:{gamma}"
  params:
    - {name: gamma, type: string, description: "67h~94h (0.30~0.75; 6Ch=0.35, 80h=0.55)"}
- id: gamma_query
  label: Gamma Query
  kind: query
  command: "QSA:6A"
  params: []
- id: black_gamma_control
  label: Black Gamma Control
  kind: action
  command: "OSA:07:{level}"
  params:
    - {name: level, type: string, description: "78h~88h (-8~+8; 80h=0)"}
- id: black_gamma_query
  label: Black Gamma Query
  kind: query
  command: "QSA:07"
  params: []
- id: black_gamma_range_control
  label: Black Gamma Range Control
  kind: action
  command: "OSJ:1B:{range}"
  params:
    - {name: range, type: enum, values: ["1h", "2h", "3h"], description: "1 / 2 / 3"}
- id: black_gamma_range_query
  label: Black Gamma Range Query
  kind: query
  command: "QSJ:1B"
  params: []
- id: frec_dynamic_lvl_control
  label: F-REC Dynamic Level Control
  kind: action
  command: "OSA:10:{level}"
  params:
    - {name: level, type: enum, values: ["0", "1", "2", "3", "4"], description: "200% / 300% / 400% / 500% / 600%"}
- id: frec_dynamic_lvl_query
  label: F-REC Dynamic Level Query
  kind: query
  command: "QSA:10"
  params: []
- id: frec_black_str_lvl_control
  label: F-REC Black STR Level Control
  kind: action
  command: "OSA:0F:{level}"
  params:
    - {name: level, type: string, description: "00h~1Eh (0~30)"}
- id: frec_black_str_lvl_query
  label: F-REC Black STR Level Query
  kind: query
  command: "QSA:0F"
  params: []
- id: vrec_knee_slope_control
  label: V-REC Knee Slope Control
  kind: action
  command: "OSA:25:{slope}"
  params:
    - {name: slope, type: string, description: "7Ch~83h (150%~500%; 1 step=50%; 80h=350%)"}
- id: vrec_knee_slope_query
  label: V-REC Knee Slope Query
  kind: query
  command: "QSA:25"
  params: []
- id: vrec_knee_point_control
  label: V-REC Knee Point Control
  kind: action
  command: "OSA:21:{point}"
  params:
    - {name: point, type: string, description: "62h~AFh (30%~107%; 80h=60%)"}
- id: vrec_knee_point_query
  label: V-REC Knee Point Query
  kind: query
  command: "QSA:21"
  params: []

# =====================================================================
# 4.2.11.1 DIGITAL ZOOM  (endpoint: aw_cam)
# =====================================================================
- id: izoom_control
  label: iZoom Control
  kind: action
  command: "OSD:B3:{mode}"
  params:
    - {name: mode, type: enum, values: ["0", "1"], description: "Off / On"}
- id: izoom_query
  label: iZoom Query
  kind: query
  command: "QSD:B3"
  params: []

# =====================================================================
# 4.2.12.1 CAMERA INFORMATION  (endpoint: aw_cam)
# =====================================================================
- id: model_number_query
  label: Model Number Query
  kind: query
  command: "QID"
  params: []
  note: response OID:AG-CX350 / AJ-UPX360 / AG-CX200 / AJ-CX4000 / AJ-UPX900

# =====================================================================
# 4.2.13.1 SYSTEM FREQUENCY  (endpoint: aw_cam)
# =====================================================================
- id: frequency_query
  label: System Frequency Query
  kind: query
  command: "QSE:77"
  params: []
  note: response OSE:77 0=59.94Hz / 1=50.00Hz

# =====================================================================
# 4.2.14.1 KNEE  (endpoint: aw_cam)
# =====================================================================
- id: knee_mode_control
  label: Knee Mode Control
  kind: action
  command: "OSA:2D:{mode}"
  params:
    - {name: mode, type: enum, values: ["0", "1", "2"], description: "OFF / MANUAL / AUTO"}
- id: knee_mode_query
  label: Knee Mode Query
  kind: query
  command: "QSA:2D"
  params: []
- id: master_knee_point_control
  label: Master Knee Point Control
  kind: action
  command: "OSA:20:{point}"
  params:
    - {name: point, type: string, description: "22h~B6h (70.00%~107.00%; 1 step=0.5%; 80h=93.50%)"}
- id: master_knee_point_query
  label: Master Knee Point Query
  kind: query
  command: "QSA:20"
  params: []
- id: master_knee_slope_control
  label: Master Knee Slope Control
  kind: action
  command: "OSA:24:{slope}"
  params:
    - {name: slope, type: string, description: "00h~63h (0~99)"}
- id: master_knee_slope_query
  label: Master Knee Slope Query
  kind: query
  command: "QSA:24"
  params: []
- id: auto_knee_response_control
  label: Auto Knee Response Control
  kind: action
  command: "OSG:97:{value}"
  params:
    - {name: value, type: integer, description: "1~8"}
- id: auto_knee_response_query
  label: Auto Knee Response Query
  kind: query
  command: "QSG:97"
  params: []
- id: hlg_knee_sw_control
  label: HLG Knee SW Control
  kind: action
  command: "OSI:40:{mode}"
  params:
    - {name: mode, type: enum, values: ["0", "1"], description: "OFF / ON"}
- id: hlg_knee_sw_query
  label: HLG Knee SW Query
  kind: query
  command: "QSI:40"
  params: []
- id: hlg_knee_point_control
  label: HLG Knee Point Control
  kind: action
  command: "OSI:41:{point}"
  params:
    - {name: point, type: string, description: "1Ch~D0h (55.00%~100.00%; 1 step=0.25%, 4-step units; 80h=80.00%)"}
- id: hlg_knee_point_query
  label: HLG Knee Point Query
  kind: query
  command: "QSI:41"
  params: []
- id: hlg_knee_slope_control
  label: HLG Knee Slope Control
  kind: action
  command: "OSI:42:{slope}"
  params:
    - {name: slope, type: string, description: "00h~64h (0~100)"}
- id: hlg_knee_slope_query
  label: HLG Knee Slope Query
  kind: query
  command: "QSI:42"
  params: []

# =====================================================================
# 4.2.15.1 WHITE CLIP  (endpoint: aw_cam)
# =====================================================================
- id: white_clip_settings_control
  label: White Clip Settings Control
  kind: action
  command: "OSA:2E:{mode}"
  params:
    - {name: mode, type: enum, values: ["0", "1"], description: "OFF / ON"}
- id: white_clip_settings_query
  label: White Clip Settings Query
  kind: query
  command: "QSA:2E"
  params: []
- id: white_clip_level_control
  label: White Clip Level Control
  kind: action
  command: "OSA:2A:{level}"
  params:
    - {name: level, type: string, description: "00h~13h (90%~109%)"}
- id: white_clip_level_query
  label: White Clip Level Query
  kind: query
  command: "QSA:2A"
  params: []

# =====================================================================
# 4.2.16.1 OIS  (endpoint: aw_cam)
# =====================================================================
- id: ois_control
  label: OIS Settings Control
  kind: action
  command: "OIS:{mode}"
  params:
    - {name: mode, type: enum, values: ["0", "1"], description: "Off / On"}
- id: ois_query
  label: OIS Settings Query
  kind: query
  command: "QIS"
  params: []

# =====================================================================
# 4.2.17.1 TALLY SETTINGS  (endpoint: aw_cam)
# =====================================================================
- id: red_tally_control
  label: RED Tally Control
  kind: action
  command: "TLR:{mode}"
  params:
    - {name: mode, type: enum, values: ["0", "1"], description: "Off / On"}
- id: red_tally_query
  label: RED Tally Query
  kind: query
  command: "QLR"
  params: []
- id: green_tally_control
  label: GREEN Tally Control
  kind: action
  command: "TLG:{mode}"
  params:
    - {name: mode, type: enum, values: ["0", "1"], description: "Off / On"}
- id: green_tally_query
  label: GREEN Tally Query
  kind: query
  command: "QLG"
  params: []

# =====================================================================
# 4.2.18.1 SKIN TONE DETAIL  (endpoint: aw_cam)
# =====================================================================
- id: skin_tone_detail_control
  label: SKIN TONE DETAIL Control
  kind: action
  command: "OSA:40:{mode}"
  params:
    - {name: mode, type: enum, values: ["0", "1"], description: "Off / On"}
- id: skin_tone_detail_query
  label: SKIN TONE DETAIL Query
  kind: query
  command: "QSA:40"
  params: []
- id: skin_detail_effect_control
  label: SKIN DETAIL EFFECT Control
  kind: action
  command: "OSD:A3:{effect}"
  params:
    - {name: effect, type: string, description: "80h~9Fh (0~31)"}
- id: skin_detail_effect_query
  label: SKIN DETAIL EFFECT Query
  kind: query
  command: "QSD:A3"
  params: []

# =====================================================================
# 4.3 VIDEO TRANSMISSION / NETWORK APPLICATION CONTROL  (full CGI paths)
# =====================================================================
- id: get_device_info
  label: Device Information Acquisition
  kind: query
  command: "/cgi-bin/getinfo?FILE=1"
  params: []
  note: returns MAC, SERIAL, VERSION, NAME, stream/audio params
- id: jpeg_snapshot
  label: JPEG Image 1-Shot Request
  kind: action
  command: "/cgi-bin/view.cgi?action=snapshot"
  params: []
- id: get_basic_settings
  label: Basic Settings Information Acquisition
  kind: query
  command: "/cgi-bin/get_basic"
  params: []
- id: get_video_over_ip
  label: VideoOverIP Screen Information Acquisition
  kind: query
  command: "/cgi-bin/get_video_over_ip"
  params: []
- id: get_camera_state
  label: Camera Status Acquisition
  kind: query
  command: "/cgi-bin/get_state"
  params: []
- id: sd_recording_control
  label: MP4 SD Recording Start/End Control
  kind: action
  command: "/cgi-bin/sdctrl?save={action}"
  params:
    - {name: action, type: enum, values: ["start", "end"], description: "start=Recording Start, end=Recording end"}
- id: rtmp_stream_control
  label: RTMP Stream Control
  kind: action
  command: "/cgi-bin/rtmp_ctrl?cmd={action}"
  params:
    - {name: action, type: enum, values: ["start", "stop"], description: "start / stop RTMP stream"}
- id: set_rtmp_server
  label: RTMP Server Setting
  kind: action
  command: "/cgi-bin/set_rtmp_param?type={type}&url={url}&key={key}"
  params:
    - {name: type, type: enum, values: ["0", "1"], description: "0=URL+key concatenated, 1=URL+key split"}
    - {name: url, type: string, description: "Server URL"}
    - {name: key, type: string, description: "Stream Key (optional if type=0)"}
- id: srt_stream_control
  label: SRT Stream Control
  kind: action
  command: "/cgi-bin/srt_ctrl?cmd={action}"
  params:
    - {name: action, type: enum, values: ["start", "stop"], description: "start / stop SRT stream"}
- id: set_srt_info
  label: SRT Streaming Setting
  kind: action
  command: "/cgi-bin/set_srt_info?mode={mode}&dip_addr={addr}&dport={port}&encryption={enc}&passphrase={pass}&streamid={id}"
  params:
    - {name: mode, type: enum, values: ["0", "1"], description: "0=Client (only 0 supported in CX series), 1=Listener"}
    - {name: addr, type: string, description: "Destination IP address"}
    - {name: port, type: integer, description: "Destination port number"}
    - {name: enc, type: enum, values: ["0", "1", "2", "3"], description: "0=OFF, 1=AES-128, 2=AES-256, 3=AES-192"}
    - {name: pass, type: string, description: "Passphrase"}
    - {name: id, type: string, description: "Stream ID"}
```

## Feedbacks
```yaml
# Each query action above returns a corresponding state value.
# Representative observable states:
- id: power_state
  type: enum
  values: [on]  # query always returns 1 (Power On) per source
- id: zoom_position
  type: string
  values: ["555h~FFFh"]
- id: focus_position
  type: string
  values: ["555h~FFFh"]
- id: iris_position
  type: string
  values: ["000h~3FFh"]
- id: iris_mode
  type: enum
  values: [manual, auto]
- id: autofocus_state
  type: enum
  values: [off, on]
- id: gain_value
  type: string
- id: nd_filter_state
  type: enum
  values: [through, "1/4", "1/16", "1/64", NG]
- id: awb_mode
  type: enum
  values: [ATW, A, B, VAR, "3200K", "5600K"]
- id: scene_file
  type: enum
  values: [scene1, scene2, scene3, scene4, scene5, scene6]
- id: model_number
  type: enum
  values: ["AG-CX350", "AJ-UPX360", "AG-CX200", "AJ-CX4000", "AJ-UPX900"]
  note: source does not list AG-CX370 in QID response set
- id: system_frequency
  type: enum
  values: ["59.94Hz", "50.00Hz"]
- id: recording_state
  type: enum
  values: [on, off]  # from get_state rec field
- id: ftp_send_state
  type: enum
  values: [on, off]
- id: playback_state
  type: enum
  values: [on, off]
# Many additional paint-state feedbacks (color matrix, gamma, knee, detail, color-correction axes)
# are returned by their respective Qxx query actions listed in Actions.
```

## Variables
```yaml
# Settable parameters are expressed as params on the control actions in Actions above.
# No additional standalone variables documented.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event/notification messages.
# getinfo response exposes ePort=31004 (event notification port) and sAlarm, but no event
# message format or push protocol is described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing present in source.
```

## Notes
- The source document ("CX350/CX4000 Control Using PTZ Control Protocol", Rev.3.00) governs all CX-series cameras but its applicable-models list names AG-CX350 / AJ-UPX360 / AG-CX200 / AJ-CX4000 / AJ-UPX900 only. **AG-CX370 is not explicitly listed**; its inclusion here follows the discover memo's CX-family lineage inference and is unverified against a real AG-CX370.
- All commands return HTTP 404 unless the camera is in **NDI HX mode ON** or **IP REMOTE ENABLE(HOLD)**. For AG-CX350/AJ-UPX360/AG-CX200 the body Auto/Manual switch must be set to **Auto**.
- Two CGI endpoints for pan-tilt/camera commands: `/cgi-bin/aw_ptz?cmd={opcode}&res=1` and `/cgi-bin/aw_cam?cmd={opcode}&res={0|1}`. `res` must be **0** (not 1) for the AWB/ABB execution commands `OWS` and `OAS`; sent with res=1 they echo "OWS"/"OAS".
- The `#` character in aw_ptz opcodes must be URL-encoded as `%23` by some HTTP clients.
- Power On/Off is **not** controllable via this protocol — CX series supports power query only.
- Several lens commands are marked "Not supported by AJ-CX4000/AJ-UPX900" in the source; applicability to AG-CX370 specifically is UNRESOLVED.
- Many paint commands cannot be changed while **V-Log** is the selected Color Setting.

<!-- UNRESOLVED: AG-CX370 not in source applicable-models list. -->
<!-- UNRESOLVED: AG-CX370 firmware version requirement not stated (source gives AG-CX350 Ver6.00~ etc.). -->
<!-- UNRESOLVED: no authentication / credential model described. -->
<!-- UNRESOLVED: no event/notification push protocol documented. -->
<!-- UNRESOLVED: no safety interlock content in source. -->
````

Spec complete. ~200 actions enumerated across all source command tables. Model mismatch (CX370 not listed in source) flagged UNRESOLVED everywhere.

## Provenance

```yaml
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/CX350_CX4000_Command_for_PTZ_Control_Protocol.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/CX350_Command_for_PTZ_Control_Protocol.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/EN/top.html
retrieved_at: 2026-07-03T20:37:15.706Z
last_checked_at: 2026-07-07T11:48:26.738Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:48:26.738Z
matched_actions: 245
action_count: 245
confidence: medium
summary: "All 245 spec action units matched verbatim against source command tables with correct shapes and transport parameters confirmed; source and spec are fully bidirectionally covered. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not explicitly list AG-CX370 in its applicable-models list (lists AG-CX350/AJ-UPX360/AG-CX200/AJ-CX4000/AJ-UPX900). AG-CX370 inclusion inferred from CX-family lineage and the discover memo; not verified against device."
- "no authentication procedure described in source."
- "no safety / power-interlock warnings present in refined source."
- "source does not document unsolicited event/notification messages."
- "no multi-step sequences described in source."
- "no safety warnings, interlock procedures, or power-on sequencing present in source."
- "AG-CX370 not in source applicable-models list."
- "AG-CX370 firmware version requirement not stated (source gives AG-CX350 Ver6.00~ etc.)."
- "no authentication / credential model described."
- "no event/notification push protocol documented."
- "no safety interlock content in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
