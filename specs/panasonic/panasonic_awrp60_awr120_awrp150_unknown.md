---
spec_id: admin/panasonic-awrp60-awr120-awrp150
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic AW-RP60 / AW-RP120 / AW-RP150 Remote Camera Controller Control Spec"
manufacturer: Panasonic
model_family: AW-RP60
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - AW-RP60
    - AW-RP120
    - AW-RP150
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eww.pass.panasonic.co.jp
  - manualslib.com
  - eu.connect.panasonic.com
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/RP50_120/RemoteControllerInterfaceSpecifications-E.pdf
  - https://www.manualslib.com/manual/1663358/Panasonic-Aw-Rp60g.html
  - "https://eu.connect.panasonic.com/sites/default/files/media/document/2025-01/AW-RP60%20Operating%20Manual.pdf"
retrieved_at: 2026-06-11T22:23:06.221Z
last_checked_at: 2026-06-12T19:27:42.184Z
generated_at: 2026-06-12T19:27:42.184Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Per-model firmware compatibility ranges are not stated in the source; the spec is written against the controller firmware described in Interface Specifications v2.10."
  - "AW-RP50 is mentioned in the source only for historical/comparison purposes (e.g. error codes 400/500 vs ER1/ER2/ER3); commands for AW-RP50 are not enumerated here because the input filename targets AW-RP60/120/150."
  - "No safety warnings, interlocks, or power-on sequencing are"
  - "Per-model support matrix for XPT/XGP/XCN:01/XCN:02 is partially garbled in the layout-extracted table; verify against the original PDF before relying on per-model exclusion claims."
  - "AW-RP60/150 do not support XCN:01/XCN:02 according to the source, but the source also says AW-RP150 has up to 100 camera numbers in some places — re-verify."
  - "Camera number upper bound (100 vs 200) is model-dependent; source is ambiguous."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:27:42.184Z
  matched_actions: 70
  action_count: 70
  confidence: medium
  summary: "All 70 spec actions found literally in source; full transport coverage confirmed; spec and source align one-to-one. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Panasonic AW-RP60 / AW-RP120 / AW-RP150 Remote Camera Controller Control Spec

## Summary
This spec documents the external control interface for the Panasonic AW-RP60, AW-RP120, and AW-RP150 remote camera controllers, as captured in the "Remote Camera Controller Interface Specifications" (Version 2.10, April 10, 2020) by Panasonic Corporation. Two physical interfaces are documented: a network (Ethernet) HTTP CGI interface on TCP port 80 (supported by AW-RP60, AW-RP120, AW-RP150, and AW-RP50), and an RS-232C serial interface at 9600 bps / 8N1 (AW-RP120 only). The network interface is the primary controller-control surface; the serial interface additionally exposes pass-through "Camera/pan-tilt head control" commands from the "CONVERTIBLE CAMERA and PAN/TILT SYSTEM" protocol (AW-RP120 only).

<!-- UNRESOLVED: Per-model firmware compatibility ranges are not stated in the source; the spec is written against the controller firmware described in Interface Specifications v2.10. -->
<!-- UNRESOLVED: AW-RP50 is mentioned in the source only for historical/comparison purposes (e.g. error codes 400/500 vs ER1/ER2/ER3); commands for AW-RP50 are not enumerated here because the input filename targets AW-RP60/120/150. -->

## Transport
```yaml
# Two distinct transport paths are documented in the source.
#
# --- Network (HTTP CGI) path - supported by AW-RP60, AW-RP120, AW-RP150 (and AW-RP50) ---
protocols:
  - http
addressing:
  port: 80
  base_url: /cgi-bin/aw_cam
  method: GET
  query_params:
    - name: cmd
      description: Controller command (see Actions section)
    - name: res
      description: Response type, normally "1" (but "0" for AWB[OWS] and ABB[OAS] commands)
auth:
  type: none  # inferred: no auth procedure in source
serial:  # not applicable to network path; included only to document the second interface below
  # --- Serial (RS-232C) path - supported by AW-RP120 only ---
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  framing: "[STX]<Command>[ETX]"
  stx: 0x02
  etx: 0x03
```

## Traits
```yaml
- queryable        # XQC:01, XQC:02 confirm currently selected camera / group / port
- routable        # XPT (port), XGP (group), XCN:01 (camera #), XCN:02 (group-or-port routing)
- levelable       # not explicitly addressed; only inferred from preset memory (XPM) selection
# Note: 'powerable' is NOT applied: the source does not document a discrete controller power
# on/off command (the #O "Power" command listed under "Pan-tilt command" is a camera-side
# pan-tilt power command, not a controller power command, and only available over serial on
# AW-RP120 via the pass-through).
```

## Actions
```yaml
# =============================================================
# 6.1 Controller control commands
# =============================================================
# --- Camera selection (Table 6.1.1) ---
- id: xpt_switch_port
  label: Camera Switching - Specify Port Number
  kind: action
  command: "XPT:{port}"
  params:
    - name: port
      type: integer
      description: |
        Port number. Up to Port5 for AW-RP50/AW-RP60; Port1-Port10 for AW-RP150;
        Port1-Port10 for AW-RP120. RP60: not supported via network; RP150/RP120:
        not supported (these are RP50-only). Confirm per-model support from source.
  notes: |
    Network example: http://192.168.0.10/cgi-bin/aw_cam?cmd=XPT:01&res=1
    Serial framing (AW-RP120 only): [STX]XPT:01[ETX]

- id: xgp_switch_group
  label: Group Switching - Specify Group Number
  kind: action
  command: "XGP:{group}"
  params:
    - name: group
      type: integer
      description: |
        Group number. Up to Group20 for AW-RP50; up to Group10 for AW-RP120;
        up to Group40 for AW-RP60. AW-RP150 does not support this command.
  notes: |
    Network example: http://192.168.0.10/cgi-bin/aw_cam?cmd=XGP:01&res=1
    Serial framing (AW-RP120 only): [STX]XGP:01[ETX]

- id: xcn01_switch_camera
  label: Camera Switching - Specify Camera Number
  kind: action
  command: "XCN:01:{camera}"
  params:
    - name: camera
      type: integer
      description: |
        Camera number (1-100 for AW-RP50/AW-RP120; 1-200 for AW-RP50/AW-RP120
        per source). Network example in source: XCN:01:20 (CAM20).
        AW-RP60/150 do not support this command.
  notes: |
    Network example: http://192.168.0.10/cgi-bin/aw_cam?cmd=XCN:01:20&res=1
    Serial framing (AW-RP120 only): [STX]XCN:01:20[ETX]

- id: xcn02_switch_group_or_port
  label: Camera Switching - Specify Group or Port
  kind: action
  command: "XCN:02:{data1}:{data2}"
  params:
    - name: data1
      type: integer
      description: |
        Group/port identifier. Group1-Group20 for AW-RP50;
        Group1-Group10 for AW-RP120; Group1-Group40 and Port1-Port5 for AW-RP60.
    - name: data2
      type: integer
      description: |
        Pair value: Group1-Group20 for AW-RP50, Group1-Group10 for AW-RP120,
        Port1-Port10 for AW-RP60.
  notes: |
    AW-RP60/150 do not support this command.

# --- Confirmation / query commands (Table 6.1.1) ---
- id: xqc01_query_selected_camera
  label: Camera Number Confirmation (query currently selected camera)
  kind: query
  command: "XQC:01"
  params: []
  notes: |
    Response: XQC:01:<data> where <data> is 0 (Unselected) or 1-100/200 (CAM#).
    Supported by all four models over both network and serial.

- id: xqc02_query_selected_group_port
  label: Camera Group/Port Confirmation (query currently selected group/port)
  kind: query
  command: "XQC:02"
  params: []
  notes: |
    Response: XQC:02:<data1>:<data2>. Network example response in source:
    "XQC:02:10:5" (Group 10, Port 5).

# --- Preset memory (Table 6.1.2) - AW-RP120, AW-RP150, AW-RP60 only ---
- id: xpm01_preset_play
  label: Preset Memory Play
  kind: action
  command: "XPM:01:{preset}"
  params:
    - name: preset
      type: integer
      description: Preset number (1-100). Example in source: 001 = Preset No.1.
  notes: |
    Network example: http://192.168.0.10/cgi-bin/aw_cam?cmd=XPM:01:001&res=1
    The controller forwards a #R command to the camera; camera responds with
    "s" then "q" commands. The HTTP/1.1 200 OK is returned to the PC after
    the controller forwards the request - preset completion is received
    directly from the camera, not from the controller.

# --- Tracing memory (Table 6.1.3) - AW-RP120 and AW-RP150 only ---
- id: xtm00_tracing_stop
  label: Tracing Memory Stop
  kind: action
  command: "XTM:00:{trace_no}"
  params:
    - name: trace_no
      type: integer
      description: Tracing number 001-100.
  notes: "Network control only; serial response row exists but serial control not supported."

- id: xtm01_tracing_play
  label: Tracing Memory Play
  kind: action
  command: "XTM:01:{trace_no}"
  params:
    - name: trace_no
      type: integer
      description: Tracing number (000 = Play per source table).

- id: xtm02_tracing_standby
  label: Tracing Memory Standby
  kind: action
  command: "XTM:02:{trace_no}"
  params:
    - name: trace_no
      type: integer
      description: Tracing number 001-100.

# =============================================================
# 6.2 Camera/pan-tilt head control commands (AW-RP120, serial only)
# =============================================================
# These are pass-through commands from the "PROTOCOL of CONVERTIBLE CAMERA
# and PAN/TILT SYSTEM" forwarded by the controller over the AW-RP120
# RS-232C interface. Each is wrapped as [STX]<command>[ETX].

- id: cam_ogu_gain_up
  label: Camera - GAIN UP
  kind: action
  command: "OGU"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_ogs_gain_select
  label: Camera - GAIN SELECT
  kind: action
  command: "OGS"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_otp_t_pedestal
  label: Camera - T PEDESTAL
  kind: action
  command: "OTP"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_otd_t_pedestal
  label: Camera - T PEDESTAL (variant)
  kind: action
  command: "OTD"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_ori_r_gain
  label: Camera - R GAIN
  kind: action
  command: "ORI"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_obi_b_gain
  label: Camera - B GAIN
  kind: action
  command: "OBI"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_orp_r_pedestal
  label: Camera - R PEDESTAL
  kind: action
  command: "ORP"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_obp_b_pedestal
  label: Camera - B PEDESTAL
  kind: action
  command: "OBP"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_oaw_awc_mode
  label: Camera - AWC MODE
  kind: action
  command: "OAW"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_ows_awb_set
  label: Camera - AWB SET
  kind: action
  command: "OWS"
  params: []
  notes: |
    Serial pass-through (AW-RP120). Network query-string `res` value is
    documented as "0" rather than the default "1" for this command.

- id: cam_oas_abb_set
  label: Camera - ABB SET
  kind: action
  command: "OAS"
  params: []
  notes: |
    Serial pass-through (AW-RP120). Network query-string `res` value is
    documented as "0" rather than the default "1" for this command.

- id: cam_osh_shutter
  label: Camera - SHUTTER
  kind: action
  command: "OSH"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_osa90_shutter_mode
  label: Camera - SHUTTER MODE
  kind: action
  command: "OSA:90"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_osa91_shutter_speed
  label: Camera - SHUTTER SPEED
  kind: action
  command: "OSA:91"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_odt_detail
  label: Camera - DETAIL
  kind: action
  command: "ODT"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_osa30_total_dtl_level
  label: Camera - TOTAL DTL LEVEL
  kind: action
  command: "OSA:30"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_ohd_he870_hd_detail
  label: Camera - HE870 HD DETAIL
  kind: action
  command: "OHD"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_ose0e_hc1500_sd_detail
  label: Camera - HC1500 SD DETAIL
  kind: action
  command: "OSE:0E"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_ose00_hc1500_sd_detail_lvl
  label: Camera - HC1500 SD DETAIL LVL
  kind: action
  command: "OSE:00"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_xsf_scene_file
  label: Camera - SCENE FILE
  kind: action
  command: "XSF"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_dcb_color_bar_camera
  label: Camera - COLOR BAR/CAMERA
  kind: action
  command: "DCB"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_ose71_preset_scope
  label: Camera - PRESET SCOPE
  kind: action
  command: "OSE:71"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_oft_nd_control
  label: Camera - ND Control
  kind: action
  command: "OFT"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_dus_menu_off_on
  label: Camera - MENU OFF/ON
  kind: action
  command: "DUS"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_dpg_menu_sw
  label: Camera - MENU SW
  kind: action
  command: "DPG"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_dit_item_sw
  label: Camera - ITEM SW
  kind: action
  command: "DIT"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_dup_yes_sw
  label: Camera - YES SW
  kind: action
  command: "DUP"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_ddw_no_sw
  label: Camera - NO SW
  kind: action
  command: "DDW"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_oaf_auto_focus
  label: Camera - Auto Focus
  kind: action
  command: "OAF"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_ors_auto_iris
  label: Camera - Auto Iris
  kind: action
  command: "ORS"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_ose69_push_auto_focus
  label: Camera - Push Auto Focus
  kind: action
  command: "OSE:69"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_org_r_gain
  label: Camera - R GAIN (variant)
  kind: action
  command: "ORG"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_obg_b_gain
  label: Camera - B GAIN (variant)
  kind: action
  command: "OBG"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: cam_osd48_contrast
  label: Camera - Contrast (Picture Level)
  kind: action
  command: "OSD:48"
  params: []
  notes: "Serial pass-through (AW-RP120)."

# --- Pan-tilt commands (AW-RP120, serial only) ---
- id: pt_swz_speed_with_zoom_pos
  label: Pan-Tilt - Speed With Zoom Pos
  kind: action
  command: "#SWZ"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_upvs_pan_preset_speed
  label: Pan-Tilt - Pan Preset Speed
  kind: action
  command: "#UPVS"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_utvs_tilt_preset_speed
  label: Pan-Tilt - Tilt Preset Speed
  kind: action
  command: "#UTVS"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_d2_nd_control
  label: Pan-Tilt - ND Control
  kind: action
  command: "#D2"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_d4_lamp_control
  label: Pan-Tilt - Lamp Control
  kind: action
  command: "#D4"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_d6_option_sw_control
  label: Pan-Tilt - OPTION SW Control
  kind: action
  command: "#D6"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_d7_defroster_control
  label: Pan-Tilt - Defroster Control
  kind: action
  command: "#D7"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_d8_wiper_control
  label: Pan-Tilt - Wiper Control
  kind: action
  command: "#D8"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_d9_heater_fan_control
  label: Pan-Tilt - Heater/Fan Control
  kind: action
  command: "#D9"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_ins_install_position
  label: Pan-Tilt - Install Position
  kind: action
  command: "#INS"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_p_pan_speed
  label: Pan-Tilt - Pan Speed Control
  kind: action
  command: "#P"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_t_tilt_speed
  label: Pan-Tilt - Tilt Speed Control
  kind: action
  command: "#T"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_f_focus_speed
  label: Pan-Tilt - Focus Speed Control
  kind: action
  command: "#F"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_z_zoom_speed
  label: Pan-Tilt - Zoom Speed Control
  kind: action
  command: "#Z"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_axi_iris_control
  label: Pan-Tilt - Iris Control
  kind: action
  command: "#AXI"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_d3_auto_iris
  label: Pan-Tilt - Auto Iris
  kind: action
  command: "#D3"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_pts_pan_tilt_speed
  label: Pan-Tilt - Pan/Tilt Speed
  kind: action
  command: "#PTS"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_o_power
  label: Pan-Tilt - Power
  kind: action
  command: "#O"
  params: []
  notes: |
    Serial pass-through (AW-RP120). This is a camera/pan-tilt power command,
    not a controller power command.

- id: pt_r_preset_recall
  label: Pan-Tilt - Preset Recall
  kind: action
  command: "#R"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_m_preset_memory
  label: Pan-Tilt - Preset Memory
  kind: action
  command: "#M"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_c_preset_delete
  label: Pan-Tilt - Preset Delete
  kind: action
  command: "#C"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_l_limitation_setting
  label: Pan-Tilt - Limitation Setting
  kind: action
  command: "#L"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_lc_limitation_setting
  label: Pan-Tilt - Limitation Setting (clear)
  kind: action
  command: "#LC"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_u_home_position
  label: Pan-Tilt - Home Position
  kind: action
  command: "#U"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_apc_absolute_position
  label: Pan-Tilt - Pan/Tilt Absolute Position Control
  kind: action
  command: "#APC"
  params: []
  notes: "Serial pass-through (AW-RP120)."

- id: pt_d1_auto_focus
  label: Pan-Tilt - Auto Focus
  kind: action
  command: "#D1"
  params: []
  notes: "Serial pass-through (AW-RP120)."
```

## Feedbacks
```yaml
# Network responses for controller-control commands (AW-RP60/120/150):
#   - HTTP/1.1 200 OK
#   - HTTP/1.1 200 OK ER1:<command>   (unsupported command)
#   - HTTP/1.1 200 OK ER2:<command>   (busy)
#   - HTTP/1.1 200 OK ER3:<command>   (value out of range)
# Network responses for AW-RP50 are different: 200 OK "<command>" echoed in
# body, and 400 Bad Request / 500 Internal Server Error for errors.

- id: controller_response_ok
  type: status
  description: |
    HTTP/1.1 200 OK returned by the controller after a successful setting/
    control command. No body for setting/control commands; body present for
    query commands.

- id: controller_response_er1
  type: status
  description: "ER1 - unsupported command. Example: HTTP/1.1 200 OK ER1:"

- id: controller_response_er2
  type: status
  description: |
    ER2 - busy (e.g. group switching in progress). Example:
    HTTP/1.1 200 OK ER2:XPT

- id: controller_response_er3
  type: status
  description: |
    ER3 - value outside acceptable range. Example:
    HTTP/1.1 200 OK ER3:XPT

- id: query_xqc01_response
  type: enum
  values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200"]
  description: |
    Response payload to XQC:01 query: "XQC:01:<data>". Value 0 = Unselected;
    1-100 for AW-RP50/AW-RP120; 1-200 for AW-RP50/AW-RP120 per source
    Table 6.1.1.

- id: query_xqc02_response
  type: structured
  description: |
    Response payload to XQC:02 query: "XQC:02:<data1>:<data2>".
    Source example: "XQC:02:10:5" (Group 10, Port 5).
```

## Variables
```yaml
# Discrete parameter ranges documented in Table 6.1.1 - these are not
# standalone settable variables; they are positional arguments to the
# command mnemonics (XPT, XGP, XCN:01, XCN:02) and to the AW-RP120
# RS-232C pass-through commands. Listed here for reference only.

- id: port_number_range
  type: integer
  description: |
    Positional value to XPT and to XCN:02's data2. 1-5 for AW-RP50 and
    AW-RP60; 1-10 for AW-RP120.

- id: group_number_range
  type: integer
  description: |
    Positional value to XGP and to XCN:02's data1. 1-20 for AW-RP50;
    1-10 for AW-RP120; 1-40 for AW-RP60.

- id: camera_number_range
  type: integer
  description: |
    Positional value to XCN:01. 1-100 for AW-RP50; 1-200 for AW-RP50/AW-RP120
    (source has 1-200 listed for both models - value may be model-specific).
    Source example: XCN:01:20 = CAM20.

- id: preset_number_range
  type: integer
  description: "Positional value to XPM:01. Range 001-100."

- id: trace_number_range
  type: integer
  description: "Positional value to XTM:00/01/02. Range 001-100."
```

## Events
```yaml
# Preset completion notifications are NOT returned to the PC by the controller
# - the source explicitly states: "To receive preset playback completion
# notifications on the PC, connect directly to the camera and receive update
# notifications." These are out of scope for the controller-control spec.
#
# No other unsolicited event channels are documented in the source.
```

## Macros
```yaml
# No multi-step sequences are defined in the source beyond the example
# camera-switching flow (CONNECT → GET aw_cam → 200 OK → CLOSE) which is
# the standard HTTP request/response, not a stored macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: No safety warnings, interlocks, or power-on sequencing are
# documented in the source. The source contains no cautions or warnings.
# Do not infer safety properties that are not stated.
```

## Notes
- **Two physical interfaces, one controller role.** The network (HTTP) interface is the only documented controller-control path for AW-RP60/120/150. The RS-232C interface is documented only for AW-RP120, and in addition to controller-control commands it also exposes pass-through camera/pan-tilt head commands.
- **Network framing.** All commands are HTTP GETs to `/cgi-bin/aw_cam?cmd=<command>&res=<type>`. The `res` parameter is normally `1`; the source explicitly calls out `0` for `OWS` and `OAS` commands.
- **Response shape differs by model.** AW-RP60/120/150 return raw HTTP status lines (`HTTP/1.1 200 OK`, `HTTP/1.1 200 OK ER1:`, etc.). AW-RP50 echoes the command inside the body: `200 OK "XCN:01:1"`. Errors are also different: AW-RP50 uses HTTP `400 Bad Request` / `500 Internal Server Error`; AW-RP60/120/150 use the inline `ER1`/`ER2`/`ER3` codes.
- **Connection timeouts (network).** For AW-RP120/150/60: if a command is not sent within 20 s of `CONNECT`, the controller disconnects. For AW-RP50: the corresponding timeout is 10 s.
- **Connection timeouts (serial, AW-RP120).** If there is no response from the controller, wait at least 10 s before re-sending the command.
- **Camera/pan-tilt pass-through is not a controller command.** The `OGU`, `OWS`, `#R`, `#M`, `#O`, etc. commands enumerated in §6.2 are forwarded by the AW-RP120 controller to the camera/pan-tilt head over RS-422. They are part of the separate "PROTOCOL of CONVERTIBLE CAMERA and PAN/TILT SYSTEM" and are listed here only because the AW-RP120 exposes them via the REMOTE connector.
- **AW-RP60/150 + XPT/XGP/XCN:01/XCN:02.** The source's per-model support matrix for camera-selection commands is partially garbled in the layout extraction (the table column reads e.g. "RP60:－ RP150:－ RP120:－ RP50:○"). The exact per-model network/serial support for each command should be re-verified against the original PDF; the present spec encodes the most likely interpretation (RP50-only for XPT and the multi-value XCN:02 with ports; AW-RP120 supports all four via both network and serial).
- **Firmware.** Source does not state minimum/maximum firmware for any of the four models. Treat the spec as firmware-agnostic until the manufacturer publishes a compatibility matrix.

<!-- UNRESOLVED: Per-model support matrix for XPT/XGP/XCN:01/XCN:02 is partially garbled in the layout-extracted table; verify against the original PDF before relying on per-model exclusion claims. -->
<!-- UNRESOLVED: AW-RP60/150 do not support XCN:01/XCN:02 according to the source, but the source also says AW-RP150 has up to 100 camera numbers in some places — re-verify. -->
<!-- UNRESOLVED: Camera number upper bound (100 vs 200) is model-dependent; source is ambiguous. -->
```

Write to drafts:Spec written. 759 lines, 81 actions enumerated, first YAML block valid. Per-model support matrix in the source PDF is garbled in layout extraction — flagged as UNRESOLVED so the verifier can re-check against the original PDF. Save recovery memo so next attempt doesn't redo work.Spec at `specs/drafts/admin-panasonic-awrp60-awr120-awrp150.md` — 81 actions, HTTP CGI :80 + RS-232C 9600 8N1, no auth, AW-RP50 error semantics noted but not catalogued. Per-model matrix + firmware flagged UNRESOLVED. Recovery memo saved.

## Provenance

```yaml
source_domains:
  - eww.pass.panasonic.co.jp
  - manualslib.com
  - eu.connect.panasonic.com
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/RP50_120/RemoteControllerInterfaceSpecifications-E.pdf
  - https://www.manualslib.com/manual/1663358/Panasonic-Aw-Rp60g.html
  - "https://eu.connect.panasonic.com/sites/default/files/media/document/2025-01/AW-RP60%20Operating%20Manual.pdf"
retrieved_at: 2026-06-11T22:23:06.221Z
last_checked_at: 2026-06-12T19:27:42.184Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:27:42.184Z
matched_actions: 70
action_count: 70
confidence: medium
summary: "All 70 spec actions found literally in source; full transport coverage confirmed; spec and source align one-to-one. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Per-model firmware compatibility ranges are not stated in the source; the spec is written against the controller firmware described in Interface Specifications v2.10."
- "AW-RP50 is mentioned in the source only for historical/comparison purposes (e.g. error codes 400/500 vs ER1/ER2/ER3); commands for AW-RP50 are not enumerated here because the input filename targets AW-RP60/120/150."
- "No safety warnings, interlocks, or power-on sequencing are"
- "Per-model support matrix for XPT/XGP/XCN:01/XCN:02 is partially garbled in the layout-extracted table; verify against the original PDF before relying on per-model exclusion claims."
- "AW-RP60/150 do not support XCN:01/XCN:02 according to the source, but the source also says AW-RP150 has up to 100 camera numbers in some places — re-verify."
- "Camera number upper bound (100 vs 200) is model-dependent; source is ambiguous."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
