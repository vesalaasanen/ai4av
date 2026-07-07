---
spec_id: admin/panasonic-media-production-suite-mps-400
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic CX350/CX4000 PTZ Control Protocol Spec"
manufacturer: Panasonic
model_family: AG-CX350
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
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
retrieved_at: 2026-07-01T13:17:41.285Z
last_checked_at: 2026-07-07T11:48:29.103Z
generated_at: 2026-07-07T11:48:29.103Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source document title covers \"CX350/CX4000\" cameras; the supplied entity/device name \"MEDIA-PRODUCTION-SUITE-MPS-400\" does not appear anywhere in the source text. Models populated from source's \"Applicable models\" list. Supplied \"Known protocol: RS-232C\" contradicts the source, which documents HTTP/CGI control on port 80 — transport populated from source evidence."
  - "bitrate keys appear in getinfo/get_video_over_ip responses but no dedicated setter command documented"
  - "source documents no unsolicited push/event mechanism. All status is"
  - "source documents no named multi-step command sequences."
  - "no explicit safety warnings, interlock procedures, or power-on"
  - "firmware version compatibility stated only per-command/per-model in source, not as a single range."
  - "no authentication credential/token format documented (auth inferred none)."
  - "no unsolicited event/notification mechanism documented."
  - "precise relationship of entity \"MEDIA-PRODUCTION-SUITE-MPS-400\" to the documented CX-series cameras could not be determined from this source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:48:29.103Z
  matched_actions: 245
  action_count: 245
  confidence: medium
  summary: "All 245 spec action commands confirmed verbatim in source tables; transport (HTTP port 80, /cgi-bin base) explicitly documented in source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Panasonic CX350/CX4000 PTZ Control Protocol Spec

## Summary
Panasonic CX-series camcorders (AG-CX350, AJ-UPX360, AG-CX200, AJ-CX4000, AJ-UPX900) controlled over HTTP1.1 PTZ Control Protocol on port 80 via CGI endpoints (`/cgi-bin/aw_ptz`, `/cgi-bin/aw_cam`, `/cgi-bin/*`). Commands cover pan-tilt/lens head control, camera control (iris, gain, color, gamma, knee, detail, tally), and video-transmission/network control (recording, RTMP/SRT streaming, status acquisition). Control is only available when NDI|HX mode is on or IP REMOTE is ENABLE(HOLD).

<!-- UNRESOLVED: Source document title covers "CX350/CX4000" cameras; the supplied entity/device name "MEDIA-PRODUCTION-SUITE-MPS-400" does not appear anywhere in the source text. Models populated from source's "Applicable models" list. Supplied "Known protocol: RS-232C" contradicts the source, which documents HTTP/CGI control on port 80 — transport populated from source evidence. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://{ip}/cgi-bin
  port: 80
auth:
  type: none  # inferred: no auth/login procedure in source
# Endpoints used by commands below:
#   /cgi-bin/aw_ptz?cmd=[Command]&res=[Type]   (pan-tilt head control; Type fixed "1")
#   /cgi-bin/aw_cam?cmd=[Command]&res=[Type]   (camera control; Type "1", except "0" for AWB[OWS]/ABB[OAS])
#   /cgi-bin/[Command]?[Param]=[Value]         (video transmission & network control)
```

## Traits
```yaml
traits:
  - queryable  # inferred: extensive query commands returning state
  - levelable  # inferred: gain, iris, chroma, detail level controls present
```

## Actions
```yaml
# Legend - endpoint key in each action's `command`:
#   aw_ptz: /cgi-bin/aw_ptz?cmd=<command>&res=1
#   aw_cam: /cgi-bin/aw_cam?cmd=<command>&res=1   (use res=0 for OWS/OAS)
#   cgi:    /cgi-bin/<path>?<param>=<value>
# All command strings verbatim from source. {data} = parameterized data value.

# === Pan-tilt head control (endpoint: aw_ptz) ===
- id: power_standby_query
  label: Power On/Standby Query
  kind: query
  command: "#O"  # aw_ptz; response always p1
  endpoint: aw_ptz
  params: []

- id: zoom_position_query
  label: Zoom Position Query
  kind: query
  command: "#GZ"  # aw_ptz; resp gz[555h~FFFh]
  endpoint: aw_ptz
  params: []

- id: zoom_speed_control
  label: Zoom Speed Control
  kind: action
  command: "#Z{data}"  # aw_ptz; 01~49 WideMax~WideMin, 50 Stop, 51~99 TeleMin~TeleMax
  endpoint: aw_ptz
  params:
    - name: data
      type: string
      description: "01~99 (50 = stop)"

- id: focus_position_control_axf
  label: Focus Position Control (AXF)
  kind: action
  command: "#AXF{data}"  # aw_ptz; 555h~F93h Near~Far(inf); invalid when AF On
  endpoint: aw_ptz
  params:
    - name: data
      type: string
      description: "555h~F93h hex"

- id: focus_position_query_axf
  label: Focus Position Query (AXF)
  kind: query
  command: "#AXF"  # aw_ptz
  endpoint: aw_ptz
  params: []

- id: focus_position_query_gf
  label: Focus Position Query (GF)
  kind: query
  command: "#GF"  # aw_ptz; resp gf[555h~FFFh]
  endpoint: aw_ptz
  params: []

- id: focus_speed_control
  label: Focus Speed Control
  kind: action
  command: "#F{data}"  # aw_ptz; 01~49/50/51~99; invalid when AF On
  endpoint: aw_ptz
  params:
    - name: data
      type: string
      description: "01~99 (50 = stop)"

- id: autofocus_onoff_control_d1
  label: Auto Focus On/Off Control (D1)
  kind: action
  command: "#D1{data}"  # aw_ptz; 0 Off(Manual)/1 On(Auto)
  endpoint: aw_ptz
  params:
    - name: data
      type: integer
      description: "0=Manual, 1=Auto"

- id: autofocus_onoff_query_d1
  label: Auto Focus On/Off Query (D1)
  kind: query
  command: "#D1"  # aw_ptz
  endpoint: aw_ptz
  params: []

- id: iris_position_control_i
  label: Iris Position Control (I)
  kind: action
  command: "#I{data}"  # aw_ptz; 01~99 Close~Open
  endpoint: aw_ptz
  params:
    - name: data
      type: string
      description: "01~99"

- id: iris_position_query_i
  label: Iris Position Query (I)
  kind: query
  command: "#I"  # aw_ptz
  endpoint: aw_ptz
  params: []

- id: iris_position_control_axi
  label: Iris Position Control (AXI)
  kind: action
  command: "#AXI{data}"  # aw_ptz; 555h~FFFh Close~Open
  endpoint: aw_ptz
  params:
    - name: data
      type: string
      description: "555h~FFFh hex"

- id: iris_position_query_axi
  label: Iris Position Query (AXI)
  kind: query
  command: "#AXI"  # aw_ptz
  endpoint: aw_ptz
  params: []

- id: iris_automode_query_gi
  label: Iris Auto/Manual Query (GI)
  kind: query
  command: "#GI"  # aw_ptz; resp gi[Data1][Data2]
  endpoint: aw_ptz
  params: []

- id: autoiris_onoff_control_d3
  label: Auto Iris On/Off Control (D3)
  kind: action
  command: "#D3{data}"  # aw_ptz; 0 Manual/1 Auto
  endpoint: aw_ptz
  params:
    - name: data
      type: integer
      description: "0=Manual, 1=Auto"

- id: autoiris_onoff_query_d3
  label: Auto Iris On/Off Query (D3)
  kind: query
  command: "#D3"  # aw_ptz
  endpoint: aw_ptz
  params: []

- id: rtally_onoff_control_da
  label: R-Tally On/Off Control (DA)
  kind: action
  command: "#DA{data}"  # aw_ptz; 0 Off/1 On
  endpoint: aw_ptz
  params:
    - name: data
      type: integer
      description: "0=Off, 1=On"

- id: rtally_onoff_query_da
  label: R-Tally On/Off Query (DA)
  kind: query
  command: "#DA"  # aw_ptz
  endpoint: aw_ptz
  params: []

# === Camera control (endpoint: aw_cam) ===
# --- Lens ---
- id: focus_automode_control_oaf
  label: Focus Auto/Manual Control (OAF)
  kind: action
  command: "OAF:{data}"  # aw_cam; 0 Manual/1 Auto
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=Manual, 1=Auto"

- id: focus_automode_query_qaf
  label: Focus Auto/Manual Query (QAF)
  kind: query
  command: "QAF"  # aw_cam
  endpoint: aw_cam
  params: []

- id: onetouch_focus_control
  label: One-touch Focus Control
  kind: action
  command: "OSE:69:{data}"  # aw_cam; 1 = One Touch AF On
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "1 = One Touch AF"

# --- Iris ---
- id: iris_automode_control_ors
  label: Iris Auto/Manual Control (ORS)
  kind: action
  command: "ORS:{data}"  # aw_cam; 0 Manual/1 Auto
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=Manual, 1=Auto"

- id: iris_automode_query_qrs
  label: Iris Auto/Manual Query (QRS)
  kind: query
  command: "QRS"  # aw_cam
  endpoint: aw_cam
  params: []

- id: autoiris_offset_control_osd48
  label: Picture Level Auto Iris Offset Control (OSD:48)
  kind: action
  command: "OSD:48:{data}"  # aw_cam; 00h~64h = -50~+50
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "00h~64h (-50~+50)"

- id: autoiris_offset_query_qsd48
  label: Picture Level Auto Iris Offset Query (QSD:48)
  kind: query
  command: "QSD:48"  # aw_cam
  endpoint: aw_cam
  params: []

- id: iris_volume_control_orv
  label: Iris Volume Control (ORV)
  kind: action
  command: "ORV:{data}"  # aw_cam; 000h~3FFh Close~Open (Manual)
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "000h~3FFh hex"

- id: iris_volume_query_qrv
  label: Iris Volume Query (QRV)
  kind: query
  command: "QRV"  # aw_cam
  endpoint: aw_cam
  params: []

- id: iris_volume_query_qsd4f
  label: Iris Volume Status Query (QSD:4F)
  kind: query
  command: "QSD:4F"  # aw_cam; resp OSD:4F:[00h~FFh]
  endpoint: aw_cam
  params: []

- id: autoiris_speed_control_osj01
  label: Auto Iris Speed Control (OSJ:01)
  kind: action
  command: "OSJ:01:{data}"  # aw_cam; 0h Slow/1h Normal/2h Fast
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "0h/1h/2h"

- id: autoiris_speed_query_qsj01
  label: Auto Iris Speed Query (QSJ:01)
  kind: query
  command: "QSJ:01"  # aw_cam
  endpoint: aw_cam
  params: []

- id: autoiris_window_control_osj02
  label: Auto Iris Window Control (OSJ:02)
  kind: action
  command: "OSJ:02:{data}"  # aw_cam; 0h Normal1/1h Normal2/2h Center
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "0h/1h/2h"

- id: autoiris_window_query_qsj02
  label: Auto Iris Window Query (QSJ:02)
  kind: query
  command: "QSJ:02"  # aw_cam
  endpoint: aw_cam
  params: []

# --- ND filter ---
- id: ndfilter_control_oft
  label: ND Filter Control (OFT)
  kind: action
  command: "OFT:{data}"  # aw_cam; 0 Through/1 1/4/2 1/16/3 1/64
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=Through,1=1/4,2=1/16,3=1/64"

- id: ndfilter_query_qft
  label: ND Filter Query (QFT)
  kind: query
  command: "QFT"  # aw_cam; resp may include 15=NG
  endpoint: aw_cam
  params: []

# --- Color Bars ---
- id: colorbar_camera_control_dcb
  label: Color Bar/Camera Control (DCB)
  kind: action
  command: "DCB:{data}"  # aw_cam; 0 Camera/1 Color Bars
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=Camera, 1=Color Bars"

- id: colorbar_camera_query_qbr
  label: Color Bar/Camera Query (QBR)
  kind: query
  command: "QBR"  # aw_cam
  endpoint: aw_cam
  params: []

# --- Scene file ---
- id: scenefile_control_xsf
  label: Scene File Control (XSF)
  kind: action
  command: "XSF:{data}"  # aw_cam; 0~5 Scene1~Scene6
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0~5"

- id: scenefile_query_qsf
  label: Scene File Query (QSF)
  kind: query
  command: "QSF"  # aw_cam
  endpoint: aw_cam
  params: []

# --- Shutter ---
- id: autoshutter_limit_control_osdbf
  label: Auto Shutter Limit Control (OSD:BF)
  kind: action
  command: "OSD:BF:{data}"  # aw_cam; 2=1/100,3=1/120,4=1/250
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "2=1/100,3=1/120,4=1/250"

- id: autoshutter_limit_query_qsdbf
  label: Auto Shutter Limit Query (QSD:BF)
  kind: query
  command: "QSD:BF"  # aw_cam
  endpoint: aw_cam
  params: []

# --- Gain ---
- id: gain_control_ogu
  label: Gain Control (OGU)
  kind: action
  command: "OGU:{data}"  # aw_cam; 02h~32h, 80h Auto(AGC ON), 81h Manual(AGC OFF)
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "02h~32h / 80h / 81h"

- id: gain_query_qgu
  label: Gain Query (QGU)
  kind: query
  command: "QGU"  # aw_cam
  endpoint: aw_cam
  params: []

- id: agc_maxgain_control_osd69
  label: AGC Max Gain Control (OSD:69)
  kind: action
  command: "OSD:69:{data}"  # aw_cam; 0=3dB,1=6dB,2=12dB,3=18dB
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0~3"

- id: agc_maxgain_query_qsd69
  label: AGC Max Gain Query (QSD:69)
  kind: query
  command: "QSD:69"  # aw_cam
  endpoint: aw_cam
  params: []

# --- R/B gain ---
- id: rgain_control_ori
  label: R Gain Control (ORI)
  kind: action
  command: "ORI:{data}"  # aw_cam; 000h~12Ch = -200~+200
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "000h~12Ch"

- id: rgain_query_qri
  label: R Gain Query (QRI)
  kind: query
  command: "QRI"  # aw_cam
  endpoint: aw_cam
  params: []

- id: rgain_control_osg39
  label: R Gain Control (OSG:39)
  kind: action
  command: "OSG:39:{data}"  # aw_cam; 738h~8C8h = -200~+200
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "738h~8C8h"

- id: rgain_query_qsg39
  label: R Gain Query (QSG:39)
  kind: query
  command: "QSG:39"  # aw_cam
  endpoint: aw_cam
  params: []

- id: bgain_control_obi
  label: B Gain Control (OBI)
  kind: action
  command: "OBI:{data}"  # aw_cam; 000h~12Ch = -200~+200
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "000h~12Ch"

- id: bgain_query_qbi
  label: B Gain Query (QBI)
  kind: query
  command: "QBI"  # aw_cam
  endpoint: aw_cam
  params: []

- id: bgain_control_osg3a
  label: B Gain Control (OSG:3A)
  kind: action
  command: "OSG:3A:{data}"  # aw_cam; 738h~8C8h = -200~+200
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "738h~8C8h"

- id: bgain_query_qsg3a
  label: B Gain Query (QSG:3A)
  kind: query
  command: "QSG:3A"  # aw_cam
  endpoint: aw_cam
  params: []

# --- R/B pedestal ---
- id: rpedestal_control_orp
  label: R Pedestal Control (ORP)
  kind: action
  command: "ORP:{data}"  # aw_cam; 032h~0FAh = -100~+100
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "032h~0FAh"

- id: rpedestal_query_qrp
  label: R Pedestal Query (QRP)
  kind: query
  command: "QRP"  # aw_cam
  endpoint: aw_cam
  params: []

- id: bpedestal_control_obp
  label: B Pedestal Control (OBP)
  kind: action
  command: "OBP:{data}"  # aw_cam; 032h~0FAh = -100~+100
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "032h~0FAh"

- id: bpedestal_query_qbp
  label: B Pedestal Query (QBP)
  kind: query
  command: "QBP"  # aw_cam
  endpoint: aw_cam
  params: []

- id: masterpedestal_control_osj0f
  label: Master Pedestal Control (OSJ:0F)
  kind: action
  command: "OSJ:0F:{data}"  # aw_cam; 738h~8C8h = -200~+200
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "738h~8C8h"

- id: masterpedestal_query_qsj0f
  label: Master Pedestal Query (QSJ:0F)
  kind: query
  command: "QSJ:0F"  # aw_cam
  endpoint: aw_cam
  params: []

- id: gpedestal_control_osj10
  label: G Pedestal Control (OSJ:10)
  kind: action
  command: "OSJ:10:{data}"  # aw_cam; 032h~0FAh = -100~+100
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "032h~0FAh"

- id: gpedestal_query_qsj10
  label: G Pedestal Query (QSJ:10)
  kind: query
  command: "QSJ:10"  # aw_cam
  endpoint: aw_cam
  params: []

- id: pedestaloffset_control_osj11
  label: Pedestal Offset Control (OSJ:11)
  kind: action
  command: "OSJ:11:{data}"  # aw_cam; 0 Off/1 On
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=Off,1=On"

- id: pedestaloffset_query_qsj11
  label: Pedestal Offset Query (QSJ:11)
  kind: query
  command: "QSJ:11"  # aw_cam
  endpoint: aw_cam
  params: []

# --- Color matrix ---
- id: colormatrix_control_ose31
  label: Color Matrix Control (OSE:31)
  kind: action
  command: "OSE:31:{data}"  # aw_cam; 0 NORMAL1/1 NORMAL2/2 FULO./3 CINELIKE
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0~3"

- id: colormatrix_query_qse31
  label: Color Matrix Query (QSE:31)
  kind: query
  command: "QSE:31"  # aw_cam
  endpoint: aw_cam
  params: []

- id: linearmatrix_rg_control_osda4
  label: Linear Matrix R-G Control (OSD:A4)
  kind: action
  command: "OSD:A4:{data}"  # aw_cam; 41h~BFh = -63~+63
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: linearmatrix_rg_query_qsda4
  label: Linear Matrix R-G Query (QSD:A4)
  kind: query
  command: "QSD:A4"  # aw_cam
  endpoint: aw_cam
  params: []

- id: linearmatrix_rb_control_osda5
  label: Linear Matrix R-B Control (OSD:A5)
  kind: action
  command: "OSD:A5:{data}"  # aw_cam; 41h~BFh = -63~+63
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: linearmatrix_rb_query_qsda5
  label: Linear Matrix R-B Query (QSD:A5)
  kind: query
  command: "QSD:A5"  # aw_cam
  endpoint: aw_cam
  params: []

- id: linearmatrix_gr_control_osda6
  label: Linear Matrix G-R Control (OSD:A6)
  kind: action
  command: "OSD:A6:{data}"  # aw_cam; 41h~BFh
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: linearmatrix_gr_query_qsda6
  label: Linear Matrix G-R Query (QSD:A6)
  kind: query
  command: "QSD:A6"  # aw_cam
  endpoint: aw_cam
  params: []

- id: linearmatrix_gb_control_osda7
  label: Linear Matrix G-B Control (OSD:A7)
  kind: action
  command: "OSD:A7:{data}"  # aw_cam; 41h~BFh
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: linearmatrix_gb_query_qsda7
  label: Linear Matrix G-B Query (QSD:A7)
  kind: query
  command: "QSD:A7"  # aw_cam
  endpoint: aw_cam
  params: []

- id: linearmatrix_br_control_osda8
  label: Linear Matrix B-R Control (OSD:A8)
  kind: action
  command: "OSD:A8:{data}"  # aw_cam; 41h~BFh
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: linearmatrix_br_query_qsda8
  label: Linear Matrix B-R Query (QSD:A8)
  kind: query
  command: "QSD:A8"  # aw_cam
  endpoint: aw_cam
  params: []

- id: linearmatrix_bg_control_osda9
  label: Linear Matrix B-G Control (OSD:A9)
  kind: action
  command: "OSD:A9:{data}"  # aw_cam; 41h~BFh
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: linearmatrix_bg_query_qsda9
  label: Linear Matrix B-G Query (QSD:A9)
  kind: query
  command: "QSD:A9"  # aw_cam
  endpoint: aw_cam
  params: []

# --- Color correction (multi-axis gain/phase) ---
- id: cc_rg_gain_control_osd86
  label: Color Correction R GAIN/SAT Control (OSD:86)
  kind: action
  command: "OSD:86:{data}"  # aw_cam; 41h~BFh = -63~+63
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_rg_gain_query_qsd86
  label: Color Correction R GAIN/SAT Query (QSD:86)
  kind: query
  command: "QSD:86"
  endpoint: aw_cam
  params: []

- id: cc_r_phase_control_osd87
  label: Color Correction R PHASE Control (OSD:87)
  kind: action
  command: "OSD:87:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_r_phase_query_qsd87
  label: Color Correction R PHASE Query (QSD:87)
  kind: query
  command: "QSD:87"
  endpoint: aw_cam
  params: []

- id: cc_rryi_gain_control_osd9c
  label: Color Correction R_R_YI GAIN/SAT Control (OSD:9C)
  kind: action
  command: "OSD:9C:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_rryi_gain_query_qsd9c
  label: Color Correction R_R_YI GAIN/SAT Query (QSD:9C)
  kind: query
  command: "QSD:9C"
  endpoint: aw_cam
  params: []

- id: cc_rryi_phase_control_osd9d
  label: Color Correction R_R_YI PHASE Control (OSD:9D)
  kind: action
  command: "OSD:9D:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_rryi_phase_query_qsd9d
  label: Color Correction R_R_YI PHASE Query (QSD:9D)
  kind: query
  command: "QSD:9D"
  endpoint: aw_cam
  params: []

- id: cc_ryi_gain_control_osd88
  label: Color Correction R_YI GAIN/SAT Control (OSD:88)
  kind: action
  command: "OSD:88:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_ryi_gain_query_qsd88
  label: Color Correction R_YI GAIN/SAT Query (QSD:88)
  kind: query
  command: "QSD:88"
  endpoint: aw_cam
  params: []

- id: cc_ryi_phase_control_osd89
  label: Color Correction R_YI PHASE Control (OSD:89)
  kind: action
  command: "OSD:89:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_ryi_phase_query_qsd89
  label: Color Correction R_YI PHASE Query (QSD:89)
  kind: query
  command: "QSD:89"
  endpoint: aw_cam
  params: []

- id: cc_ryiyi_gain_control_osd9e
  label: Color Correction R_YI_YI GAIN/SAT Control (OSD:9E)
  kind: action
  command: "OSD:9E:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_ryiyi_gain_query_qsd9e
  label: Color Correction R_YI_YI GAIN/SAT Query (QSD:9E)
  kind: query
  command: "QSD:9E"
  endpoint: aw_cam
  params: []

- id: cc_ryiyi_phase_control_osd9f
  label: Color Correction R_YI_YI PHASE Control (OSD:9F)
  kind: action
  command: "OSD:9F:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_ryiyi_phase_query_qsd9f
  label: Color Correction R_YI_YI PHASE Query (QSD:9F)
  kind: query
  command: "QSD:9F:{data}"  # source lists QSD:9F:[Data] verbatim
  endpoint: aw_cam
  params: []

- id: cc_yi_gain_control_osd8a
  label: Color Correction YI GAIN/SAT Control (OSD:8A)
  kind: action
  command: "OSD:8A:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_yi_gain_query_qsd8a
  label: Color Correction YI GAIN/SAT Query (QSD:8A)
  kind: query
  command: "QSD:8A"
  endpoint: aw_cam
  params: []

- id: cc_yi_phase_control_osd8b
  label: Color Correction YI PHASE Control (OSD:8B)
  kind: action
  command: "OSD:8B:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_yi_phase_query_qsd8b
  label: Color Correction YI PHASE Query (QSD:8B)
  kind: query
  command: "QSD:8B"
  endpoint: aw_cam
  params: []

- id: cc_yig_gain_control_osd8c
  label: Color Correction YI_G GAIN/SAT Control (OSD:8C)
  kind: action
  command: "OSD:8C:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_yig_gain_query_qsd8c
  label: Color Correction YI_G GAIN/SAT Query (QSD:8C)
  kind: query
  command: "QSD:8C"
  endpoint: aw_cam
  params: []

- id: cc_yig_phase_control_osd8d
  label: Color Correction YI_G PHASE Control (OSD:8D)
  kind: action
  command: "OSD:8D:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_yig_phase_query_qsd8d
  label: Color Correction YI_G PHASE Query (QSD:8D)
  kind: query
  command: "QSD:8D"
  endpoint: aw_cam
  params: []

- id: cc_g_gain_control_osd8e
  label: Color Correction G GAIN/SAT Control (OSD:8E)
  kind: action
  command: "OSD:8E:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_g_gain_query_qsd8e
  label: Color Correction G GAIN/SAT Query (QSD:8E)
  kind: query
  command: "QSD:8E"
  endpoint: aw_cam
  params: []

- id: cc_g_phase_control_osd8f
  label: Color Correction G PHASE Control (OSD:8F)
  kind: action
  command: "OSD:8F:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_g_phase_query_qsd8f
  label: Color Correction G PHASE Query (QSD:8F)
  kind: query
  command: "QSD:8F"
  endpoint: aw_cam
  params: []

- id: cc_gcy_gain_control_osd90
  label: Color Correction G_Cy GAIN/SAT Control (OSD:90)
  kind: action
  command: "OSD:90:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_gcy_gain_query_qsd90
  label: Color Correction G_Cy GAIN/SAT Query (QSD:90)
  kind: query
  command: "QSD:90"
  endpoint: aw_cam
  params: []

- id: cc_gcy_phase_control_osd91
  label: Color Correction G_Cy PHASE Control (OSD:91)
  kind: action
  command: "OSD:91:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_gcy_phase_query_qsd91
  label: Color Correction G_Cy PHASE Query (QSD:91)
  kind: query
  command: "QSD:91"
  endpoint: aw_cam
  params: []

- id: cc_cy_gain_control_osd92
  label: Color Correction Cy GAIN/SAT Control (OSD:92)
  kind: action
  command: "OSD:92:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_cy_gain_query_qsd92
  label: Color Correction Cy GAIN/SAT Query (QSD:92)
  kind: query
  command: "QSD:92"
  endpoint: aw_cam
  params: []

- id: cc_cy_phase_control_osd93
  label: Color Correction Cy PHASE Control (OSD:93)
  kind: action
  command: "OSD:93:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_cy_phase_query_qsd93
  label: Color Correction Cy PHASE Query (QSD:93)
  kind: query
  command: "QSD:93"
  endpoint: aw_cam
  params: []

- id: cc_cyb_gain_control_osd94
  label: Color Correction Cy_B GAIN/SAT Control (OSD:94)
  kind: action
  command: "OSD:94:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_cyb_gain_query_qsd94
  label: Color Correction Cy_B GAIN/SAT Query (QSD:94)
  kind: query
  command: "QSD:94"
  endpoint: aw_cam
  params: []

- id: cc_cyb_phase_control_osd95
  label: Color Correction Cy_B PHASE Control (OSD:95)
  kind: action
  command: "OSD:95:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_cyb_phase_query_qsd95
  label: Color Correction Cy_B PHASE Query (QSD:95)
  kind: query
  command: "QSD:95"
  endpoint: aw_cam
  params: []

- id: cc_b_gain_control_osd96
  label: Color Correction B GAIN/SAT Control (OSD:96)
  kind: action
  command: "OSD:96:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_b_gain_query_qsd96
  label: Color Correction B GAIN/SAT Query (QSD:96)
  kind: query
  command: "QSD:96"
  endpoint: aw_cam
  params: []

- id: cc_b_phase_control_osd97
  label: Color Correction B PHASE Control (OSD:97)
  kind: action
  command: "OSD:97:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_b_phase_query_qsd97
  label: Color Correction B PHASE Query (QSD:97)
  kind: query
  command: "QSD:97"
  endpoint: aw_cam
  params: []

- id: cc_bmg_gain_control_osd80
  label: Color Correction B_Mg GAIN/SAT Control (OSD:80)
  kind: action
  command: "OSD:80:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_bmg_gain_query_qsd80
  label: Color Correction B_Mg GAIN/SAT Query (QSD:80)
  kind: query
  command: "QSD:80"
  endpoint: aw_cam
  params: []

- id: cc_bmg_phase_control_osd81
  label: Color Correction B_Mg PHASE Control (OSD:81)
  kind: action
  command: "OSD:81:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_bmg_phase_query_qsd81
  label: Color Correction B_Mg PHASE Query (QSD:81)
  kind: query
  command: "QSD:81"
  endpoint: aw_cam
  params: []

- id: cc_mg_gain_control_osd82
  label: Color Correction Mg GAIN/SAT Control (OSD:82)
  kind: action
  command: "OSD:82:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_mg_gain_query_qsd82
  label: Color Correction Mg GAIN/SAT Query (QSD:82)
  kind: query
  command: "QSD:82"
  endpoint: aw_cam
  params: []

- id: cc_mg_phase_control_osd83
  label: Color Correction Mg PHASE Control (OSD:83)
  kind: action
  command: "OSD:83:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_mg_phase_query_qsd83
  label: Color Correction Mg PHASE Query (QSD:83)
  kind: query
  command: "QSD:83"
  endpoint: aw_cam
  params: []

- id: cc_mgr_gain_control_osd84
  label: Color Correction Mg_R GAIN/SAT Control (OSD:84)
  kind: action
  command: "OSD:84:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_mgr_gain_query_qsd84
  label: Color Correction Mg_R GAIN/SAT Query (QSD:84)
  kind: query
  command: "QSD:84"
  endpoint: aw_cam
  params: []

- id: cc_mgr_phase_control_osd85
  label: Color Correction Mg_R PHASE Control (OSD:85)
  kind: action
  command: "OSD:85:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_mgr_phase_query_qsd85
  label: Color Correction Mg_R PHASE Query (QSD:85)
  kind: query
  command: "QSD:85"
  endpoint: aw_cam
  params: []

- id: cc_mgrr_gain_control_osd9a
  label: Color Correction Mg_R_R GAIN Control (OSD:9A)
  kind: action
  command: "OSD:9A:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_mgrr_gain_query_qsd9a
  label: Color Correction Mg_R_R GAIN Query (QSD:9A)
  kind: query
  command: "QSD:9A"
  endpoint: aw_cam
  params: []

- id: cc_mgrr_phase_control_osd9b
  label: Color Correction Mg_R_R PHASE Control (OSD:9B)
  kind: action
  command: "OSD:9B:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_mgrr_phase_query_qsd9b
  label: Color Correction Mg_R_R PHASE Query (QSD:9B)
  kind: query
  command: "QSD:9B"
  endpoint: aw_cam
  params: []

- id: cc_yiyig_gain_control_osj1c
  label: Color Correction YI_YI_G GAIN/SAT Control (OSJ:1C)
  kind: action
  command: "OSJ:1C:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_yiyig_gain_query_qsj1c
  label: Color Correction YI_YI_G GAIN/SAT Query (QSJ:1C)
  kind: query
  command: "QSJ:1C"
  endpoint: aw_cam
  params: []

- id: cc_yiyig_phase_control_osj1d
  label: Color Correction YI_YI_G PHASE Control (OSJ:1D)
  kind: action
  command: "OSJ:1D:{data}"
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "41h~BFh"

- id: cc_yiyig_phase_query_qsj1d
  label: Color Correction YI_YI_G PHASE Query (QSJ:1D)
  kind: query
  command: "QSJ:1D"
  endpoint: aw_cam
  params: []

- id: adaptive_matrix_control_osj4f
  label: Adaptive Matrix Control (OSJ:4F)
  kind: action
  command: "OSJ:4F:{data}"  # aw_cam; 0 OFF/1 ON
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=OFF,1=ON"

- id: adaptive_matrix_query_qsj4f
  label: Adaptive Matrix Query (QSJ:4F)
  kind: query
  command: "QSJ:4F"
  endpoint: aw_cam
  params: []

# --- Chroma level ---
- id: chromalevel_control_osdb0
  label: Chroma Level Control (OSD:B0)
  kind: action
  command: "OSD:B0:{data}"  # aw_cam; 00h OFF, 1Dh~E3h = -99%~+99%
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "00h/1Dh~E3h"

- id: chromalevel_query_qsdb0
  label: Chroma Level Query (QSD:B0)
  kind: query
  command: "QSD:B0"
  endpoint: aw_cam
  params: []

- id: chromaphase_control_osj0b
  label: Chroma Phase Control (OSJ:0B)
  kind: action
  command: "OSJ:0B:{data}"  # aw_cam; 61h~9Fh = -31~+31
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "61h~9Fh"

- id: chromaphase_query_qsj0b
  label: Chroma Phase Query (QSJ:0B)
  kind: query
  command: "QSJ:0B"
  endpoint: aw_cam
  params: []

# --- AWB/ABB ---
- id: awb_execution_control_ows
  label: AWB Execution Control (OWS)
  kind: action
  command: "OWS"  # aw_cam; use res=0 (no response); res=1 returns "OWS"
  endpoint: aw_cam
  params: []

- id: awb_mode_control_oaw
  label: AWB Mode Control (OAW)
  kind: action
  command: "OAW:{data}"  # aw_cam; 0 ATW/1 A/2 B/3 VAR/4 3200K/5 5600K
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0~5"

- id: awb_mode_query_qaw
  label: AWB Mode Query (QAW)
  kind: query
  command: "QAW"
  endpoint: aw_cam
  params: []

- id: abb_execution_control_oas
  label: ABB Execution Control (OAS)
  kind: action
  command: "OAS"  # aw_cam; use res=0 (no response); res=1 returns "OAS"
  endpoint: aw_cam
  params: []

- id: colortemp_inc_control_osi1e
  label: Color Temperature Increment Control (OSI:1E)
  kind: action
  command: "OSI:1E:{data}"  # aw_cam; 1h~Ah = 1~10
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "1h~Ah"

- id: colortemp_dec_control_osi1f
  label: Color Temperature Decrement Control (OSI:1F)
  kind: action
  command: "OSI:1F:{data}"  # aw_cam; 1h~Ah = 1~10
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "1h~Ah"

- id: colortemp_query_qsi20
  label: Color Temperature Query (QSI:20)
  kind: query
  command: "QSI:20"  # aw_cam; resp OSI:20:[Data1]:[Data2]
  endpoint: aw_cam
  params: []

- id: atw_speed_control_osi25
  label: ATW Speed Control (OSI:25)
  kind: action
  command: "OSI:25:{data}"  # aw_cam; 0 Normal/1 Slow/2 Fast
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0/1/2"

- id: atw_speed_query_qsi25
  label: ATW Speed Query (QSI:25)
  kind: query
  command: "QSI:25"
  endpoint: aw_cam
  params: []

- id: awb_gainoffset_control_osj0c
  label: AWB Gain Offset Control (OSJ:0C)
  kind: action
  command: "OSJ:0C:{data}"  # aw_cam; 0h Off/1h On
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "0h/1h"

- id: awb_gainoffset_query_qsj0c
  label: AWB Gain Offset Query (QSJ:0C)
  kind: query
  command: "QSJ:0C"
  endpoint: aw_cam
  params: []

- id: atw_targetr_control_osj0d
  label: ATW Target R Control (OSJ:0D)
  kind: action
  command: "OSJ:0D:{data}"  # aw_cam; 76h~8Ah = -10~+10
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "76h~8Ah"

- id: atw_targetr_query_qsj0d
  label: ATW Target R Query (QSJ:0D)
  kind: query
  command: "QSJ:0D"
  endpoint: aw_cam
  params: []

- id: atw_targetb_control_osj0e
  label: ATW Target B Control (OSJ:0E)
  kind: action
  command: "OSJ:0E:{data}"  # aw_cam; 76h~8Ah = -10~+10
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "76h~8Ah"

- id: atw_targetb_query_qsj0e
  label: ATW Target B Query (QSJ:0E)
  kind: query
  command: "QSJ:0E"
  endpoint: aw_cam
  params: []

- id: awb_colortemp_inc_control_osj48
  label: AWB Color Temperature Inc Control (OSJ:48)
  kind: action
  command: "OSJ:48:{data}"  # aw_cam; 1h~Ah = 1~10
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "1h~Ah"

- id: awb_colortemp_dec_control_osj49
  label: AWB Color Temperature Dec Control (OSJ:49)
  kind: action
  command: "OSJ:49:{data}"  # aw_cam; 1h~Ah = 1~10
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "1h~Ah"

- id: awb_colortemp_query_qsj4a
  label: AWB Color Temperature Query (QSJ:4A)
  kind: query
  command: "QSJ:4A"  # aw_cam; resp OSJ:4A:[Data1]:[Data2]
  endpoint: aw_cam
  params: []

- id: awb_rgain_control_osj4b
  label: AWB R Gain Control (OSJ:4B)
  kind: action
  command: "OSJ:4B:{data}"  # aw_cam; 670h~990h = -400~+400
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "670h~990h"

- id: awb_rgain_query_qsj4b
  label: AWB R Gain Query (QSJ:4B)
  kind: query
  command: "QSJ:4B"
  endpoint: aw_cam
  params: []

- id: awb_bgain_control_osj4c
  label: AWB B Gain Control (OSJ:4C)
  kind: action
  command: "OSJ:4C:{data}"  # aw_cam; 670h~990h = -400~+400
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "670h~990h"

- id: awb_bgain_query_qsj4c
  label: AWB B Gain Query (QSJ:4C)
  kind: query
  command: "QSJ:4C"
  endpoint: aw_cam
  params: []

- id: awb_gaxis_control_osj4d
  label: AWB G Axis Control (OSJ:4D)
  kind: action
  command: "OSJ:4D:{data}"  # aw_cam; 670h~990h = -400~+400
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "670h~990h"

- id: awb_gaxis_query_qsj4d
  label: AWB G Axis Query (QSJ:4D)
  kind: query
  command: "QSJ:4D"
  endpoint: aw_cam
  params: []

# --- Detail ---
- id: detail_control_odt
  label: Detail Control (ODT)
  kind: action
  command: "ODT:{data}"  # aw_cam; 0 Off/1 On
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=Off,1=On"

- id: detail_query_qdt
  label: Detail Query (QDT)
  kind: query
  command: "QDT"
  endpoint: aw_cam
  params: []

- id: vdetaillevel_control_osda1
  label: V Detail Level Control (OSD:A1)
  kind: action
  command: "OSD:A1:{data}"  # aw_cam; 79h~87h = -7~+7
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "79h~87h"

- id: vdetaillevel_query_qsda1
  label: V Detail Level Query (QSD:A1)
  kind: query
  command: "QSD:A1"
  endpoint: aw_cam
  params: []

- id: detailfreq_control_osda2
  label: Detail Frequency Control (OSD:A2)
  kind: action
  command: "OSD:A2:{data}"  # aw_cam; 79h~87h = -7~+7
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "79h~87h"

- id: detailfreq_query_qsda2
  label: Detail Frequency Query (QSD:A2)
  kind: query
  command: "QSD:A2"
  endpoint: aw_cam
  params: []

- id: masterdetail_control_osa30
  label: Master Detail Control (OSA:30)
  kind: action
  command: "OSA:30:{data}"  # aw_cam; 61h~9Fh = -31~+31
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "61h~9Fh"

- id: masterdetail_query_qsa30
  label: Master Detail Query (QSA:30)
  kind: query
  command: "QSA:30"
  endpoint: aw_cam
  params: []

- id: detailgainp_control_osa38
  label: Detail Gain(+) Control (OSA:38)
  kind: action
  command: "OSA:38:{data}"  # aw_cam; 61h~9Fh = -31~+31
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "61h~9Fh"

- id: detailgainp_query_qsa38
  label: Detail Gain(+) Query (QSA:38)
  kind: query
  command: "QSA:38"
  endpoint: aw_cam
  params: []

- id: detailgainn_control_osa39
  label: Detail Gain(-) Control (OSA:39)
  kind: action
  command: "OSA:39:{data}"  # aw_cam; 61h~9Fh = -31~+31
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "61h~9Fh"

- id: kneeaperture_control_osg3f
  label: Knee Aperture Level Control (OSG:3F)
  kind: action
  command: "OSG:3F:{data}"  # aw_cam; 00h~05h = 0~5
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "00h~05h"

- id: kneeaperture_query_qsg3f
  label: Knee Aperture Level Query (QSG:3F)
  kind: query
  command: "QSG:3F"
  endpoint: aw_cam
  params: []

- id: detailcoring_control_osj12
  label: Detail Coring Control (OSJ:12)
  kind: action
  command: "OSJ:12:{data}"  # aw_cam; 00h~3Ch = 0~60
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "00h~3Ch"

- id: detailcoring_query_qsj12
  label: Detail Coring Query (QSJ:12)
  kind: query
  command: "QSJ:12"
  endpoint: aw_cam
  params: []

- id: leveldepend_control_osj13
  label: Level Depend Control (OSJ:13)
  kind: action
  command: "OSJ:13:{data}"  # aw_cam; 00h~3Ch = 0~60
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "00h~3Ch"

- id: leveldepend_query_qsj13
  label: Level Depend Query (QSJ:13)
  kind: query
  command: "QSJ:13"  # aw_cam; resp 79h~87h = -7~+7
  endpoint: aw_cam
  params: []

# --- Gamma ---
- id: gammatype_control_ose72
  label: Gamma Type Control (OSE:72)
  kind: action
  command: "OSE:72:{data}"  # aw_cam; 0 HD/1 SD/2 FILMLIKE1/3 FILMLIKE2/4 FILMLIKE2/5 FILM-REC/6 VIDEO-REC/7 HLG
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0~7"

- id: gammatype_query_qse72
  label: Gamma Type Query (QSE:72)
  kind: query
  command: "QSE:72"
  endpoint: aw_cam
  params: []

- id: gamma_control_osa6a
  label: Gamma Control (OSA:6A)
  kind: action
  command: "OSA:6A:{data}"  # aw_cam; 67h~94h = 0.30~0.75
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "67h~94h"

- id: gamma_query_qsa6a
  label: Gamma Query (QSA:6A)
  kind: query
  command: "QSA:6A"
  endpoint: aw_cam
  params: []

- id: blackgamma_control_osa07
  label: Black Gamma Control (OSA:07)
  kind: action
  command: "OSA:07:{data}"  # aw_cam; 78h~88h = -8~+8
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "78h~88h"

- id: blackgamma_query_qsa07
  label: Black Gamma Query (QSA:07)
  kind: query
  command: "QSA:07"
  endpoint: aw_cam
  params: []

- id: blackgammarange_control_osj1b
  label: Black Gamma Range Control (OSJ:1B)
  kind: action
  command: "OSJ:1B:{data}"  # aw_cam; 1h/2h/3h
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "1h/2h/3h"

- id: blackgammarange_query_qsj1b
  label: Black Gamma Range Query (QSJ:1B)
  kind: query
  command: "QSJ:1B"
  endpoint: aw_cam
  params: []

- id: frec_dynamiclvl_control_osa10
  label: F-REC Dynamic LVL Control (OSA:10)
  kind: action
  command: "OSA:10:{data}"  # aw_cam; 0~4 = 200%~600%
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0~4"

- id: frec_dynamiclvl_query_qsa10
  label: F-REC Dynamic LVL Query (QSA:10)
  kind: query
  command: "QSA:10"
  endpoint: aw_cam
  params: []

- id: frec_blackstrlvl_control_osa0f
  label: F-REC Black STR LVL Control (OSA:0F)
  kind: action
  command: "OSA:0F:{data}"  # aw_cam; 00h~1Eh = 0~30
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "00h~1Eh"

- id: frec_blackstrlvl_query_qsa0f
  label: F-REC Black STR LVL Query (QSA:0F)
  kind: query
  command: "QSA:0F"
  endpoint: aw_cam
  params: []

- id: vrec_kneeslope_control_osa25
  label: V-REC Knee Slope Control (OSA:25)
  kind: action
  command: "OSA:25:{data}"  # aw_cam; 7Ch~83h = 150%~500% (1step=50%)
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "7Ch~83h"

- id: vrec_kneeslope_query_qsa25
  label: V-REC Knee Slope Query (QSA:25)
  kind: query
  command: "QSA:25"
  endpoint: aw_cam
  params: []

- id: vrec_kneepoint_control_osa21
  label: V-REC Knee Point Control (OSA:21)
  kind: action
  command: "OSA:21:{data}"  # aw_cam; 62h~AFh = 30%~107%
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "62h~AFh"

- id: vrec_kneepoint_query_qsa21
  label: V-REC Knee Point Query (QSA:21)
  kind: query
  command: "QSA:21"
  endpoint: aw_cam
  params: []

# --- Digital zoom ---
- id: izoom_control_osdb3
  label: iZoom Control (OSD:B3)
  kind: action
  command: "OSD:B3:{data}"  # aw_cam; 0 Off/1 On
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=Off,1=On"

- id: izoom_query_qsdb3
  label: iZoom Query (QSD:B3)
  kind: query
  command: "QSD:B3"
  endpoint: aw_cam
  params: []

# --- Camera information ---
- id: modelnumber_query_qid
  label: Model Number Query (QID)
  kind: query
  command: "QID"  # aw_cam; resp OID:<model>
  endpoint: aw_cam
  params: []

# --- Frequency ---
- id: frequency_query_qse77
  label: System Frequency Query (QSE:77)
  kind: query
  command: "QSE:77"  # aw_cam; resp OSE:77 0=59.94Hz/1=50.00Hz
  endpoint: aw_cam
  params: []

# --- Knee ---
- id: kneemode_control_osa2d
  label: Knee Mode Control (OSA:2D)
  kind: action
  command: "OSA:2D:{data}"  # aw_cam; 0 OFF/1 MANUAL/2 AUTO
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0/1/2"

- id: kneemode_query_qsa2d
  label: Knee Mode Query (QSA:2D)
  kind: query
  command: "QSA:2D"
  endpoint: aw_cam
  params: []

- id: masterkneepoint_control_osa20
  label: Master Knee Point Control (OSA:20)
  kind: action
  command: "OSA:20:{data}"  # aw_cam; 22h~B6h = 70.00%~107.00% (1step=0.5%)
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "22h~B6h"

- id: masterkneepoint_query_qsa20
  label: Master Knee Point Query (QSA:20)
  kind: query
  command: "QSA:20"
  endpoint: aw_cam
  params: []

- id: masterkneeslope_control_osa24
  label: Master Knee Slope Control (OSA:24)
  kind: action
  command: "OSA:24:{data}"  # aw_cam; 00h~63h = 0~99
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "00h~63h"

- id: masterkneeslope_query_qsa24
  label: Master Knee Slope Query (QSA:24)
  kind: query
  command: "QSA:24"
  endpoint: aw_cam
  params: []

- id: autokneeresponse_control_osg97
  label: Auto Knee Response Control (OSG:97)
  kind: action
  command: "OSG:97:{data}"  # aw_cam; 1~8
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "1~8"

- id: autokneeresponse_query_qsg97
  label: Auto Knee Response Query (QSG:97)
  kind: query
  command: "QSG:97"
  endpoint: aw_cam
  params: []

- id: hlgkneesw_control_osi40
  label: HLG Knee SW Control (OSI:40)
  kind: action
  command: "OSI:40:{data}"  # aw_cam; 0 OFF/1 ON
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=OFF,1=ON"

- id: hlgkneesw_query_qsi40
  label: HLG Knee SW Query (QSI:40)
  kind: query
  command: "QSI:40"
  endpoint: aw_cam
  params: []

- id: hlgkneepoint_control_osi41
  label: HLG Knee Point Control (OSI:41)
  kind: action
  command: "OSI:41:{data}"  # aw_cam; 1Ch~D0h = 55.00%~100.00% (1step=0.25%, 4-step units)
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "1Ch~D0h"

- id: hlgkneepoint_query_qsi41
  label: HLG Knee Point Query (QSI:41)
  kind: query
  command: "QSI:41"
  endpoint: aw_cam
  params: []

- id: hlgkneeslope_control_osi42
  label: HLG Knee Slop Control (OSI:42)
  kind: action
  command: "OSI:42:{data}"  # aw_cam; 00h~64h = 0~100
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "00h~64h"

- id: hlgkneeslope_query_qsi42
  label: HLG Knee Slop Query (QSI:42)
  kind: query
  command: "QSI:42"
  endpoint: aw_cam
  params: []

# --- White Clip ---
- id: whiteclip_control_osa2e
  label: White Clip Settings Control (OSA:2E)
  kind: action
  command: "OSA:2E:{data}"  # aw_cam; 0 OFF/1 ON
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=OFF,1=ON"

- id: whiteclip_query_qsa2e
  label: White Clip Settings Query (QSA:2E)
  kind: query
  command: "QSA:2E"
  endpoint: aw_cam
  params: []

- id: whitecliplevel_control_osa2a
  label: White Clip Level Control (OSA:2A)
  kind: action
  command: "OSA:2A:{data}"  # aw_cam; 00h~13h = 90%~109%
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "00h~13h"

- id: whitecliplevel_query_qsa2a
  label: White Clip Level Query (QSA:2A)
  kind: query
  command: "QSA:2A"
  endpoint: aw_cam
  params: []

# --- OIS ---
- id: ois_control_ois
  label: OIS Control (OIS)
  kind: action
  command: "OIS:{data}"  # aw_cam; 0 Off/1 On
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=Off,1=On"

- id: ois_query_qis
  label: OIS Query (QIS)
  kind: query
  command: "QIS"
  endpoint: aw_cam
  params: []

# --- Tally ---
- id: redtally_control_tlr
  label: RED Tally Control (TLR)
  kind: action
  command: "TLR:{data}"  # aw_cam; 0 Off/1 On
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=Off,1=On"

- id: redtally_query_qlr
  label: RED Tally Query (QLR)
  kind: query
  command: "QLR"
  endpoint: aw_cam
  params: []

- id: greentally_control_tlg
  label: GREEN Tally Control (TLG)
  kind: action
  command: "TLG:{data}"  # aw_cam; 0 Off/1 On
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=Off,1=On"

- id: greentally_query_qlg
  label: GREEN Tally Query (QLG)
  kind: query
  command: "QLG"  # aw_cam; resp OLG:[Data]
  endpoint: aw_cam
  params: []

# --- Skin tone detail ---
- id: skintonedetail_control_osa40
  label: Skin Tone Detail Control (OSA:40)
  kind: action
  command: "OSA:40:{data}"  # aw_cam; 0 Off/1 On
  endpoint: aw_cam
  params:
    - name: data
      type: integer
      description: "0=Off,1=On"

- id: skintonedetail_query_qsa40
  label: Skin Tone Detail Query (QSA:40)
  kind: query
  command: "QSA:40"
  endpoint: aw_cam
  params: []

- id: skindetaileffect_control_osda3
  label: Skin Detail Effect Control (OSD:A3)
  kind: action
  command: "OSD:A3:{data}"  # aw_cam; 80h~9Fh = 0~31
  endpoint: aw_cam
  params:
    - name: data
      type: string
      description: "80h~9Fh"

- id: skindetaileffect_query_qsda3
  label: Skin Detail Effect Query (QSD:A3)
  kind: query
  command: "QSD:A3"
  endpoint: aw_cam
  params: []

# === Video transmission & network application control (endpoint: cgi) ===
- id: device_info_acquisition
  label: Device Information Acquisition
  kind: query
  command: "/cgi-bin/getinfo?FILE=1"  # resp key=value lines (MAC, SERIAL, VERSION, NAME, streaming params...)
  endpoint: cgi
  params: []

- id: jpeg_snapshot_request
  label: JPEG Image 1 Shot Request
  kind: action
  command: "/cgi-bin/view.cgi?action=snapshot"
  endpoint: cgi
  params: []

- id: basic_settings_acquisition
  label: Basic Settings Information Acquisition
  kind: query
  command: "/cgi-bin/get_basic"  # resp cam_title, plugin_download, plugin_disp
  endpoint: cgi
  params: []

- id: videooverip_screen_acquisition
  label: VideoOverIP Screen Information Acquisition
  kind: query
  command: "/cgi-bin/get_video_over_ip"  # resp h264_*/h265_* stream params (random order)
  endpoint: cgi
  params: []

- id: camera_state_acquisition
  label: Camera Status Acquisition
  kind: query
  command: "/cgi-bin/get_state"  # resp rec, rec_counter, play, sd_*, etc.
  endpoint: cgi
  params: []

- id: mp4_recording_control
  label: MP4 Recording Start/End Control
  kind: action
  command: "/cgi-bin/sdctrl?save={action}"  # start/end
  endpoint: cgi
  params:
    - name: action
      type: string
      description: "start | end"

- id: rtmp_stream_control
  label: RTMP Stream Start/Stop Control
  kind: action
  command: "/cgi-bin/rtmp_ctrl?cmd={action}"  # start/stop
  endpoint: cgi
  params:
    - name: action
      type: string
      description: "start | stop"

- id: rtmp_server_setting
  label: RTMP Server Setting
  kind: action
  command: "/cgi-bin/set_rtmp_param"  # params: type(0/1), url(String), key(String)
  endpoint: cgi
  params:
    - name: type
      type: integer
      description: "0=URL+key concat, 1=URL+key split"
    - name: url
      type: string
      description: "Server URL"
    - name: key
      type: string
      description: "Stream Key (optional if type=0)"

- id: srt_stream_control
  label: SRT Stream Start/Stop Control
  kind: action
  command: "/cgi-bin/srt_ctrl?cmd={action}"  # start/stop
  endpoint: cgi
  params:
    - name: action
      type: string
      description: "start | stop"

- id: srt_streaming_setting
  label: SRT Streaming Setting
  kind: action
  command: "/cgi-bin/set_srt_info"  # params: mode, dip_addr, dport, encryption, passphrase, streamid
  endpoint: cgi
  params:
    - name: mode
      type: integer
      description: "0=Client, 1=Listener (only 0 supported in CX series)"
    - name: dip_addr
      type: string
      description: "Destination IP (*.*.*.*)"
    - name: dport
      type: integer
      description: "Destination port number"
    - name: encryption
      type: integer
      description: "0=OFF,1=AES-128,2=AES-256,3=AES-192"
    - name: passphrase
      type: string
      description: "Passphrase"
    - name: streamid
      type: string
      description: "Stream ID"
```

## Feedbacks
```yaml
# Observable states surfaced via query responses / CGI status payloads.
- id: power_state
  type: enum
  values: ["on"]  # response to #O always 1 (Power On); source states camera cannot be powered off via command
  source: power_standby_query

- id: zoom_position
  type: range
  values: ["555h~FFFh (Wide~Tele)"]
  source: zoom_position_query

- id: focus_position
  type: range
  values: ["555h~FFFh (Near~Far)"]
  source: focus_position_query_gf

- id: autofocus_state
  type: enum
  values: [manual, auto]

- id: iris_position
  type: range
  values: ["01~99 / 555h~FFFh (Close~Open)"]

- id: iris_automode
  type: enum
  values: [manual, auto]

- id: ndfilter_state
  type: enum
  values: [through, "1/4", "1/16", "1/64", ng]

- id: gain_value
  type: range
  values: ["02h~32h / 80h(AGC ON)"]

- id: awb_mode_state
  type: enum
  values: [ATW, A, B, VAR, "3200K", "5600K"]

- id: recording_state
  type: enum
  values: [on, off]
  source: camera_state_acquisition

- id: sd_card_inserted
  type: enum
  values: [on, off]
  source: camera_state_acquisition

- id: model_number
  type: enum
  values: [AG-CX350, AJ-UPX360, AG-CX200, AJ-CX4000, AJ-UPX900]
  source: modelnumber_query_qid

- id: system_frequency
  type: enum
  values: ["59.94Hz", "50.00Hz"]
  source: frequency_query_qse77
```

## Variables
```yaml
# Settable parameters exposed above as Actions (level/range type). Representative
# entries; full set see Actions with kind: action.
- id: zoom_speed
  type: range
  range: "01~99 (50=stop)"
- id: iris_volume
  type: range
  range: "000h~3FFh"
- id: gain
  type: range
  range: "02h~32h / 80h / 81h"
- id: chroma_level
  type: range
  range: "00h / 1Dh~E3h"
- id: rtmp_bitrate  # UNRESOLVED: bitrate keys appear in getinfo/get_video_over_ip responses but no dedicated setter command documented
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited push/event mechanism. All status is
# acquired via polling query/CGI commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source (informational, not explicit safety procedures):
#   - AWB (OWS) and ABB (OAS) execution commands expect res=0 and return NO response.
#   - Many color/detail/gamma settings cannot be changed when V-Log is the active Color Setting.
#   - Camera cannot be powered On/Off via PTZ control command (power query only).
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements stated in source.
```

## Notes
- **Protocol mismatch:** Supplied input claimed "Known protocol: RS-232C", but the source document describes HTTP1.1 PTZ Control Protocol over port 80 (CGI). Transport populated from source evidence, not the supplied hint.
- **Device-name mismatch:** Supplied entity/device "MEDIA-PRODUCTION-SUITE-MPS-400" is not mentioned anywhere in the source. Source title is "CX350/CX4000 Control Using PTZ Control Protocol"; `compatible_with.models` populated from the source's Applicable Models list.
- **Prerequisites:** Commands return HTTP 404 unless NDI|HX mode is on or IP REMOTE is ENABLE(HOLD). For AG-CX350/AJ-UPX360/AG-CX200 the body Auto/Manual switch must be set to Auto.
- **Endpoint variants:** Pan-tilt head commands use `/cgi-bin/aw_ptz`; camera-control commands use `/cgi-bin/aw_cam`; video/network commands use `/cgi-bin/<cmd>`. `res=1` normally; `res=0` for OWS (AWB) and OAS (ABB), which then return no response.
- **`#` encoding:** The `#` in aw_ptz commands may require URL-encoding as `%23` depending on middleware.
- **Model limitations:** Many commands are marked "Not supported by the AJ-CX4000/AJ-UPX900" in source Remarks (see individual action descriptions). Availability of some lens commands on AJ-CX4000/AJ-UPX900 depends on the fitted lens.
- **Version gating:** Several CGI commands (get_state, view.cgi, QSE:77, set_rtmp_param, set_srt_info) are only available from specific firmware versions onward (e.g. AJ-CX4000 Ver6.00~, AG-CX350 Ver7.00~).

<!-- UNRESOLVED: firmware version compatibility stated only per-command/per-model in source, not as a single range. -->
<!-- UNRESOLVED: no authentication credential/token format documented (auth inferred none). -->
<!-- UNRESOLVED: no unsolicited event/notification mechanism documented. -->
<!-- UNRESOLVED: precise relationship of entity "MEDIA-PRODUCTION-SUITE-MPS-400" to the documented CX-series cameras could not be determined from this source. -->
```

Spec output above. Key caveats: source = HTTP/CGI on port 80 (not RS-232C as input claimed), device name MPS-400 absent from source (models taken from source Applicable list), full command catalogue enumerated including all ~80 color-correction axes + AWB/ABB/gamma/knee/detail sets + CGI video/network commands.

## Provenance

```yaml
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/CX350_CX4000_Command_for_PTZ_Control_Protocol.pdf
retrieved_at: 2026-07-01T13:17:41.285Z
last_checked_at: 2026-07-07T11:48:29.103Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:48:29.103Z
matched_actions: 245
action_count: 245
confidence: medium
summary: "All 245 spec action commands confirmed verbatim in source tables; transport (HTTP port 80, /cgi-bin base) explicitly documented in source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source document title covers \"CX350/CX4000\" cameras; the supplied entity/device name \"MEDIA-PRODUCTION-SUITE-MPS-400\" does not appear anywhere in the source text. Models populated from source's \"Applicable models\" list. Supplied \"Known protocol: RS-232C\" contradicts the source, which documents HTTP/CGI control on port 80 — transport populated from source evidence."
- "bitrate keys appear in getinfo/get_video_over_ip responses but no dedicated setter command documented"
- "source documents no unsolicited push/event mechanism. All status is"
- "source documents no named multi-step command sequences."
- "no explicit safety warnings, interlock procedures, or power-on"
- "firmware version compatibility stated only per-command/per-model in source, not as a single range."
- "no authentication credential/token format documented (auth inferred none)."
- "no unsolicited event/notification mechanism documented."
- "precise relationship of entity \"MEDIA-PRODUCTION-SUITE-MPS-400\" to the documented CX-series cameras could not be determined from this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
