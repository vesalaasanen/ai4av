---
spec_id: admin/panasonic-aj-cx4000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic AJ-CX4000 Control Spec"
manufacturer: Panasonic
model_family: AJ-CX4000
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - AJ-CX4000
  firmware: "\"Ver5.00 ~\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/CX350_CX4000_Command_for_PTZ_Control_Protocol.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/EN/top.html
retrieved_at: 2026-07-01T12:52:36.307Z
last_checked_at: 2026-07-07T11:46:03.356Z
generated_at: 2026-07-07T11:46:03.356Z
firmware_coverage: "\"Ver5.00 ~\""
protocol_coverage: []
known_gaps:
  - "user-supplied \"Known protocol: RS-232C\" — the provided source document describes only the HTTP/CGI PTZ Control Protocol (port 80); no RS-232C serial command set appears in this source. RS-232C transport is therefore not populated."
  - "voltage / power / current specs not in source."
  - "physical layer (cabling) and firmware upper bound not stated (only minimum applicable firmware per model given)."
  - "no serial config found in this source (user hint RS-232C not corroborated)."
  - "source lists no QSA:39 query row for Detail Gain(-)."
  - "full response payload field-by-field mapping for getinfo/get_state/get_video_over_ip"
  - "none beyond the setter actions enumerated above."
  - "source documents no asynchronous/event-push mechanism."
  - "populate if source contains macro sequences - none found."
  - "none - no safety content in source."
  - "user-supplied \"Known protocol: RS-232C\" is not corroborated by this source, which describes only the HTTP/CGI PTZ Control Protocol on TCP port 80. A separate RS-232C document would be needed to populate serial transport."
  - "firmware upper-bound compatibility not stated (only minimum per-command firmware given)."
  - "physical/electrical specs, error recovery sequences, and protocol version negotiation not in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:46:03.356Z
  matched_actions: 245
  action_count: 245
  confidence: medium
  summary: "All 245 spec actions have verbatim CGI command matches in the source; transport (port 80, /cgi-bin/ base) confirmed; source catalogue is fully represented. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Panasonic AJ-CX4000 Control Spec

## Summary
The Panasonic AJ-CX4000 is a 4K HDR shoulder-mount camcorder (CX series). This spec covers its PTZ Control Protocol, an HTTP/CGI (HTTP 1.1) interface over TCP port 80 used to control lens (zoom/focus/iris), image parameters (gain, color, detail, gamma, knee), tally, streaming, and recording. Commands are only served when NDI|HX mode is on or IP REMOTE is ENABLE(HOLD).

<!-- UNRESOLVED: user-supplied "Known protocol: RS-232C" — the provided source document describes only the HTTP/CGI PTZ Control Protocol (port 80); no RS-232C serial command set appears in this source. RS-232C transport is therefore not populated. -->
<!-- UNRESOLVED: voltage / power / current specs not in source. -->
<!-- UNRESOLVED: physical layer (cabling) and firmware upper bound not stated (only minimum applicable firmware per model given). -->

## Transport
```yaml
# Source states: "PTZ Control Protocol use port 80." Commands comply with HTTP1.1.
# All commands are HTTP GET against /cgi-bin/... on the camera IP. See Notes for the
# three endpoint families. Unless in NDI|HX mode or IP REMOTE ENABLE(HOLD), all
# commands return 404.
protocols:
  - http
addressing:
  port: 80  # verbatim: "PTZ Control Protocol use port 80."
  base_url: "http://{ip}/cgi-bin/"  # {ip} = camera IP address
auth:
  type: none  # inferred: no login/password procedure described in source
# No serial: block emitted - source documents no RS-232C serial config.
# UNRESOLVED: no serial config found in this source (user hint RS-232C not corroborated).
```

## Traits
```yaml
traits:
  - queryable   # inferred: many query commands returning state (Q*/#G*/#O etc.)
  - levelable   # inferred: gain, iris, chroma, detail, pedestal level controls present
# powerable NOT set: source explicitly states CX series cannot be turned On/Off by PTZ
#   control command (power query only).
# routable NOT set: no input/output routing commands in source.
```

## Actions
```yaml
# Endpoint families (verbatim from source):
#   Pan-tilt head control : GET /cgi-bin/aw_ptz?cmd=<mnemonic>&res=1   (res fixed "1")
#   Camera control        : GET /cgi-bin/aw_cam?cmd=<mnemonic>&res=<0|1>
#                            (res=1 normally; res=0 for AWB[OWS] and ABB[OAS] exec)
#   Video/network control : GET /cgi-bin/<path>?<param>=<value>
# Each command below carries its verbatim CGI payload. "{...}" = parameterized value.
# "#" in URLs may require ASCII-encoding as "%23" per source.
# Many setters are locked when V-Log is the selected Color Setting (per source remarks).

# ---------- 4.1 Pan-tilt head control (/cgi-bin/aw_ptz) ----------

- id: power_standby_query
  label: Power On/Standby Query
  kind: query
  command: "/cgi-bin/aw_ptz?cmd=%23O&res=1"
  params: []
  notes: Response value always 1 (Power On). Camera cannot be powered on/off by command.

- id: zoom_position_query
  label: Zoom Position Query
  kind: query
  command: "/cgi-bin/aw_ptz?cmd=%23GZ&res=1"
  params: []
  notes: Response gz[Data] 555h..FFFh = Wide..Tele. Availability on AJ-CX4000 depends on lens.

- id: zoom_speed_control
  label: Zoom Speed Control
  kind: action
  command: "/cgi-bin/aw_ptz?cmd=%23Z{speed}&res=1"
  params:
    - name: speed
      type: integer
      description: "01..49 Wide Max..Min Speed; 50 Zoom Stop; 51..99 Tele Min..Max Speed"
  notes: Not supported by AJ-CX4000/AJ-UPX900 (per source). Response zS[Data].

- id: focus_position_control_axf
  label: Focus Position Control (AXF)
  kind: action
  command: "/cgi-bin/aw_ptz?cmd=%23AXF{data}&res=1"
  params:
    - name: data
      type: string
      description: "555h..F93h = Near..Far(infinity). F93h = infinity. Invalid when AF On."
  notes: Not supported by AJ-CX4000/AJ-UPX900. Response axf[Data].

- id: focus_position_query_axf
  label: Focus Position Query (AXF)
  kind: query
  command: "/cgi-bin/aw_ptz?cmd=%23AXF&res=1"
  params: []
  notes: Response axf[Data] 555h..FFFh Near..Far(over infinity).

- id: focus_position_query_gf
  label: Focus Position Query (GF)
  kind: query
  command: "/cgi-bin/aw_ptz?cmd=%23GF&res=1"
  params: []
  notes: Response gf[Data] 555h..FFFh Near..Far.

- id: focus_speed_control
  label: Focus Speed Control
  kind: action
  command: "/cgi-bin/aw_ptz?cmd=%23F{speed}&res=1"
  params:
    - name: speed
      type: integer
      description: "01..49 Near Max..Min; 50 Focus Stop; 51..99 Far Min..Max. Invalid when AF On."
  notes: Not supported by AJ-CX4000/AJ-UPX900. Response fS[Data].

- id: autofocus_onoff_control
  label: Auto Focus On/Off Control
  kind: action
  command: "/cgi-bin/aw_ptz?cmd=%23D1{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0=Off(Manual), 1=On(Auto)"
  notes: Not supported by AJ-CX4000/AJ-UPX900. Response d1[Data].

- id: autofocus_onoff_query
  label: Auto Focus On/Off Query
  kind: query
  command: "/cgi-bin/aw_ptz?cmd=%23D1&res=1"
  params: []
  notes: Not supported by AJ-CX4000/AJ-UPX900.

- id: iris_position_control_i
  label: Iris Position Control (I)
  kind: action
  command: "/cgi-bin/aw_ptz?cmd=%23I{data}&res=1"
  params:
    - name: data
      type: integer
      description: "01..99 = Iris Close..Open"
  notes: Error if Iris mode Auto. Response iC[Data].

- id: iris_position_query_i
  label: Iris Position Query (I)
  kind: query
  command: "/cgi-bin/aw_ptz?cmd=%23I&res=1"
  params: []
  notes: Response iC[Data] 01..99 Close..Open.

- id: iris_position_control_axi
  label: Iris Position Control (AXI)
  kind: action
  command: "/cgi-bin/aw_ptz?cmd=%23AXI{data}&res=1"
  params:
    - name: data
      type: string
      description: "555h..FFFh = Iris Close..Open"
  notes: Response axi[Data].

- id: iris_position_query_axi
  label: Iris Position Query (AXI)
  kind: query
  command: "/cgi-bin/aw_ptz?cmd=%23AXI&res=1"
  params: []
  notes: Response axi[Data] 555h..FFFh Close..Open.

- id: iris_position_automode_query_gi
  label: Iris Position / Auto-Manual Query (GI)
  kind: query
  command: "/cgi-bin/aw_ptz?cmd=%23GI&res=1"
  params: []
  notes: Response gi[Data1][Data2]; [Data1] 555h..FFFh Close..Open; [Data2] 0=Manual,1=Auto.

- id: autoiris_onoff_control
  label: Auto Iris On/Off Control
  kind: action
  command: "/cgi-bin/aw_ptz?cmd=%23D3{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0=Manual Iris, 1=Auto Iris"
  notes: Response d3[Data].

- id: autoiris_onoff_query
  label: Auto Iris On/Off Query
  kind: query
  command: "/cgi-bin/aw_ptz?cmd=%23D3&res=1"
  params: []

- id: rtally_onoff_control
  label: R-Tally On/Off Control
  kind: action
  command: "/cgi-bin/aw_ptz?cmd=%23DA{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0=R-Tally Off, 1=R-Tally On"
  notes: Response dA[Data].

- id: rtally_onoff_query
  label: R-Tally On/Off Query
  kind: query
  command: "/cgi-bin/aw_ptz?cmd=%23DA&res=1"
  params: []

# ---------- 4.2 Camera control (/cgi-bin/aw_cam) ----------

# 4.2.1.1 Focus
- id: focus_automode_control
  label: Focus Auto/Manual Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OAF:{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0=Manual, 1=Auto"
  notes: Not supported by AJ-CX4000/AJ-UPX900.

- id: focus_automode_query
  label: Focus Auto/Manual Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QAF&res=1"
  params: []
  notes: Not supported by AJ-CX4000/AJ-UPX900.

- id: onetouch_focus_control
  label: One-Touch Focus Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSE:69:{data}&res=1"
  params:
    - name: data
      type: integer
      description: "1=One Touch AF On"
  notes: Not supported by AJ-CX4000/AJ-UPX900.

# 4.2.1.2 Iris
- id: iris_automode_control
  label: Iris Auto/Manual Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=ORS:{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0=Manual, 1=Auto"
  notes: Switching Auto->Manual restores held manual iris setting.

- id: iris_automode_query
  label: Iris Auto/Manual Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QRS&res=1"
  params: []

- id: autoiris_offset_control
  label: Picture Level Auto Iris Offset Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:48:{data}&res=1"
  params:
    - name: data
      type: string
      description: "00h..31h=-50..-1; 32h=0; 33h..64h=+1..+50"

- id: autoiris_offset_query
  label: Picture Level Auto Iris Offset Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:48&res=1"
  params: []

- id: iris_volume_control
  label: Iris Volume Control (Manual)
  kind: action
  command: "/cgi-bin/aw_cam?cmd=ORV:{data}&res=1"
  params:
    - name: data
      type: string
      description: "000h..3FFh = Close..Open"

- id: iris_volume_query
  label: Iris Volume Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QRV&res=1"
  params: []
  notes: Response ORV:[Data] 000h..3FFh.

- id: iris_volume_status_query
  label: Iris Volume Status Query (QSD:4F)
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:4F&res=1"
  params: []
  notes: Response OSD:4F:[Data] 00h..FFh Close..Open.

- id: autoiris_speed_control
  label: Auto Iris Speed Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:01:{data}&res=1"
  params:
    - name: data
      type: string
      description: "0h=Slow, 1h=Normal, 2h=Fast"
  notes: Not supported by AJ-CX4000/AJ-UPX900.

- id: autoiris_speed_query
  label: Auto Iris Speed Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:01&res=1"
  params: []
  notes: Not supported by AJ-CX4000/AJ-UPX900.

- id: autoiris_window_control
  label: Auto Iris Window Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:02:{data}&res=1"
  params:
    - name: data
      type: string
      description: "0h=Normal1, 1h=Normal2, 2h=Center"

- id: autoiris_window_query
  label: Auto Iris Window Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:02&res=1"
  params: []

# 4.2.1.3 ND filter
- id: ndfilter_control
  label: ND Filter Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OFT:{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0=Through, 1=1/4, 2=1/16, 3=1/64"
  notes: Not supported by AJ-CX4000/AJ-UPX900.

- id: ndfilter_query
  label: ND Filter Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QFT&res=1"
  params: []
  notes: Response 0..3 valid, 15=NG.

# 4.2.2.1 Color Bars
- id: colorbar_camera_control
  label: Color Bar/Camera Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=DCB:{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0=Camera, 1=Color Bars"

- id: colorbar_camera_query
  label: Color Bar/Camera Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QBR&res=1"
  params: []
  notes: Response OBR:[Data] 0/1.

# 4.2.3.1 Scene file
- id: scenefile_control
  label: Scene File Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=XSF:{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0..5 = Scene1..Scene6"

- id: scenefile_query
  label: Scene File Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSF&res=1"
  params: []
  notes: Response OSF:[Data] 0..5.

# 4.2.4.1 Shutter mode
- id: autoshutter_limit_control
  label: Auto Shutter Limit Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:BF:{data}&res=1"
  params:
    - name: data
      type: integer
      description: "2=1/100, 3=1/120, 4=1/250"
  notes: Not supported by AJ-CX4000/AJ-UPX900.

- id: autoshutter_limit_query
  label: Auto Shutter Limit Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:BF&res=1"
  params: []
  notes: Not supported by AJ-CX4000/AJ-UPX900.

# 4.2.5.1 Gain
- id: gain_control
  label: Gain Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OGU:{data}&res=1"
  params:
    - name: data
      type: string
      description: "02h..32h = -6dB..+42dB (1dB steps); 80h=Auto(AGC ON); 81h=Manual(AGC OFF)"
  notes: If 02h..32h set when AGC ON, behaves as 81h.

- id: gain_query
  label: Gain Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QGU&res=1"
  params: []
  notes: Response OGU:[Data].

- id: agc_max_gain_control
  label: AGC Maximum Gain Value Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:69:{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0=3dB, 1=6dB, 2=12dB, 3=18dB"

- id: agc_max_gain_query
  label: AGC Maximum Gain Value Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:69&res=1"
  params: []

# 4.2.6.1 R/B gain
- id: rgain_control_ori
  label: R Gain Control (ORI)
  kind: action
  command: "/cgi-bin/aw_cam?cmd=ORI:{data}&res=1"
  params:
    - name: data
      type: string
      description: "000h..096h..12Ch = -200..0..+200"

- id: rgain_query_ori
  label: R Gain Query (QRI)
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QRI&res=1"
  params: []

- id: rgain_control_sg39
  label: R Gain Control (OSG:39)
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSG:39:{data}&res=1"
  params:
    - name: data
      type: string
      description: "738h..800h..8C8h = -200..0..+200"

- id: rgain_query_sg39
  label: R Gain Query (QSG:39)
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSG:39&res=1"
  params: []

- id: bgain_control_obi
  label: B Gain Control (OBI)
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OBI:{data}&res=1"
  params:
    - name: data
      type: string
      description: "000h..096h..12Ch = -200..0..+200"

- id: bgain_query_qbi
  label: B Gain Query (QBI)
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QBI&res=1"
  params: []

- id: bgain_control_sg3a
  label: B Gain Control (OSG:3A)
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSG:3A:{data}&res=1"
  params:
    - name: data
      type: string
      description: "738h..800h..8C8h = -200..0..+200"

- id: bgain_query_sg3a
  label: B Gain Query (QSG:3A)
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSG:3A&res=1"
  params: []

# 4.2.6.2 R/B pedestal
- id: rpedestal_control
  label: R Pedestal Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=ORP:{data}&res=1"
  params:
    - name: data
      type: string
      description: "032h..096h..0FAh = -100..0..+100"
  notes: Locked when V-Log selected.

- id: rpedestal_query
  label: R Pedestal Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QRP&res=1"
  params: []

- id: bpedestal_control
  label: B Pedestal Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OBP:{data}&res=1"
  params:
    - name: data
      type: string
      description: "032h..096h..0FAh = -100..0..+100"
  notes: Locked when V-Log selected.

- id: bpedestal_query
  label: B Pedestal Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QBP&res=1"
  params: []

- id: master_pedestal_control
  label: Master Pedestal Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:0F:{data}&res=1"
  params:
    - name: data
      type: string
      description: "738h..800h..8C8h = -200..0..+200"
  notes: Locked when V-Log selected.

- id: master_pedestal_query
  label: Master Pedestal Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:0F&res=1"
  params: []

- id: gpedestal_control
  label: G Pedestal Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:10:{data}&res=1"
  params:
    - name: data
      type: string
      description: "032h..096h..0FAh = -100..0..+100"
  notes: Locked when V-Log selected.

- id: gpedestal_query
  label: G Pedestal Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:10&res=1"
  params: []

- id: pedestal_offset_control
  label: Pedestal Offset Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:11:{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0=Off, 1=On"
  notes: Locked when V-Log selected.

- id: pedestal_offset_query
  label: Pedestal Offset Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:11&res=1"
  params: []

# 4.2.6.3 Color matrix / linear matrix / color correction
- id: color_matrix_control
  label: Color Matrix Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSE:31:{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0=NORMAL1, 1=NORMAL2, 2=FULO., 3=CINELIKE"
  notes: Not supported by AJ-CX4000/AJ-UPX900. Locked when V-Log selected.

- id: color_matrix_query
  label: Color Matrix Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSE:31&res=1"
  params: []
  notes: Not supported by AJ-CX4000/AJ-UPX900.

# Linear matrix (all range 41h..80h..BFh = -63..0..+63), locked under V-Log
- id: linmatrix_rg_control
  label: Linear Matrix R-G Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:A4:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: linmatrix_rg_query
  label: Linear Matrix R-G Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:A4&res=1"
  params: []
- id: linmatrix_rb_control
  label: Linear Matrix R-B Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:A5:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: linmatrix_rb_query
  label: Linear Matrix R-B Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:A5&res=1"
  params: []
- id: linmatrix_gr_control
  label: Linear Matrix G-R Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:A6:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: linmatrix_gr_query
  label: Linear Matrix G-R Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:A6&res=1"
  params: []
- id: linmatrix_gb_control
  label: Linear Matrix G-B Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:A7:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: linmatrix_gb_query
  label: Linear Matrix G-B Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:A7&res=1"
  params: []
- id: linmatrix_br_control
  label: Linear Matrix B-R Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:A8:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: linmatrix_br_query
  label: Linear Matrix B-R Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:A8&res=1"
  params: []
- id: linmatrix_bg_control
  label: Linear Matrix B-G Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:A9:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: linmatrix_bg_query
  label: Linear Matrix B-G Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:A9&res=1"
  params: []

# Color correction axes (all range 41h..80h..BFh = -63..0..+63), locked under V-Log.
# Each GAIN/SAT and PHASE axis = distinct source row = distinct action.
- id: cc_r_gain_sat_control
  label: Color Correction R GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:86:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_r_gain_sat_query
  label: Color Correction R GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:86&res=1"
  params: []
- id: cc_r_phase_control
  label: Color Correction R PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:87:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_r_phase_query
  label: Color Correction R PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:87&res=1"
  params: []
- id: cc_r_ryi_gain_sat_control
  label: Color Correction R_R_YI GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:9C:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_r_ryi_gain_sat_query
  label: Color Correction R_R_YI GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:9C&res=1"
  params: []
- id: cc_r_ryi_phase_control
  label: Color Correction R_R_YI PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:9D:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_r_ryi_phase_query
  label: Color Correction R_R_YI PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:9D&res=1"
  params: []
- id: cc_ryi_gain_sat_control
  label: Color Correction R_YI GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:88:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_ryi_gain_sat_query
  label: Color Correction R_YI GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:88&res=1"
  params: []
- id: cc_ryi_phase_control
  label: Color Correction R_YI PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:89:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_ryi_phase_query
  label: Color Correction R_YI PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:89&res=1"
  params: []
- id: cc_ryi_yi_gain_sat_control
  label: Color Correction R_YI_YI GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:9E:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_ryi_yi_gain_sat_query
  label: Color Correction R_YI_YI GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:9E&res=1"
  params: []
- id: cc_ryi_yi_phase_control
  label: Color Correction R_YI_YI PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:9F:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_ryi_yi_phase_query
  label: Color Correction R_YI_YI PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:9F&res=1"
  params: []
- id: cc_yi_gain_sat_control
  label: Color Correction YI GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:8A:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_yi_gain_sat_query
  label: Color Correction YI GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:8A&res=1"
  params: []
- id: cc_yi_phase_control
  label: Color Correction YI PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:8B:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_yi_phase_query
  label: Color Correction YI PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:8B&res=1"
  params: []
- id: cc_yig_gain_sat_control
  label: Color Correction YI_G GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:8C:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_yig_gain_sat_query
  label: Color Correction YI_G GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:8C&res=1"
  params: []
- id: cc_yig_phase_control
  label: Color Correction YI_G PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:8D:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_yig_phase_query
  label: Color Correction YI_G PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:8D&res=1"
  params: []
- id: cc_g_gain_sat_control
  label: Color Correction G GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:8E:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_g_gain_sat_query
  label: Color Correction G GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:8E&res=1"
  params: []
- id: cc_g_phase_control
  label: Color Correction G PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:8F:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_g_phase_query
  label: Color Correction G PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:8F&res=1"
  params: []
- id: cc_gcy_gain_sat_control
  label: Color Correction G_Cy GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:90:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_gcy_gain_sat_query
  label: Color Correction G_Cy GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:90&res=1"
  params: []
- id: cc_gcy_phase_control
  label: Color Correction G_Cy PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:91:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_gcy_phase_query
  label: Color Correction G_Cy PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:91&res=1"
  params: []
- id: cc_cy_gain_sat_control
  label: Color Correction Cy GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:92:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_cy_gain_sat_query
  label: Color Correction Cy GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:92&res=1"
  params: []
- id: cc_cy_phase_control
  label: Color Correction Cy PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:93:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_cy_phase_query
  label: Color Correction Cy PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:93&res=1"
  params: []
- id: cc_cyb_gain_sat_control
  label: Color Correction Cy_B GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:94:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_cyb_gain_sat_query
  label: Color Correction Cy_B GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:94&res=1"
  params: []
- id: cc_cyb_phase_control
  label: Color Correction Cy_B PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:95:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_cyb_phase_query
  label: Color Correction Cy_B PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:95&res=1"
  params: []
- id: cc_b_gain_sat_control
  label: Color Correction B GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:96:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_b_gain_sat_query
  label: Color Correction B GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:96&res=1"
  params: []
- id: cc_b_phase_control
  label: Color Correction B PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:97:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_b_phase_query
  label: Color Correction B PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:97&res=1"
  params: []
- id: cc_bmg_gain_sat_control
  label: Color Correction B_Mg GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:80:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_bmg_gain_sat_query
  label: Color Correction B_Mg GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:80&res=1"
  params: []
- id: cc_bmg_phase_control
  label: Color Correction B_Mg PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:81:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_bmg_phase_query
  label: Color Correction B_Mg PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:81&res=1"
  params: []
- id: cc_mg_gain_sat_control
  label: Color Correction Mg GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:82:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_mg_gain_sat_query
  label: Color Correction Mg GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:82&res=1"
  params: []
- id: cc_mg_phase_control
  label: Color Correction Mg PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:83:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_mg_phase_query
  label: Color Correction Mg PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:83&res=1"
  params: []
- id: cc_mgr_gain_sat_control
  label: Color Correction Mg_R GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:84:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_mgr_gain_sat_query
  label: Color Correction Mg_R GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:84&res=1"
  params: []
- id: cc_mgr_phase_control
  label: Color Correction Mg_R PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:85:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_mgr_phase_query
  label: Color Correction Mg_R PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:85&res=1"
  params: []
- id: cc_mgrr_gain_control
  label: Color Correction Mg_R_R GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:9A:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_mgrr_gain_query
  label: Color Correction Mg_R_R GAIN Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:9A&res=1"
  params: []
- id: cc_mgrr_phase_control
  label: Color Correction Mg_R_R PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:9B:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_mgrr_phase_query
  label: Color Correction Mg_R_R PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:9B&res=1"
  params: []
- id: cc_yiyig_gain_control
  label: Color Correction YI_YI_G GAIN/SAT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:1C:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_yiyig_gain_query
  label: Color Correction YI_YI_G GAIN/SAT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:1C&res=1"
  params: []
- id: cc_yiyig_phase_control
  label: Color Correction YI_YI_G PHASE Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:1D:{data}&res=1"
  params: [{name: data, type: string, description: "41h..80h..BFh = -63..0..+63"}]
  notes: Locked when V-Log selected.
- id: cc_yiyig_phase_query
  label: Color Correction YI_YI_G PHASE Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:1D&res=1"
  params: []
- id: adaptive_matrix_control
  label: Adaptive Matrix Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:4F:{data}&res=1"
  params: [{name: data, type: integer, description: "0=OFF, 1=ON"}]
  notes: Locked when V-Log selected.
- id: adaptive_matrix_query
  label: Adaptive Matrix Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:4F&res=1"
  params: []

# 4.2.7.1 Chroma level
- id: chroma_level_control
  label: Chroma Level Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:B0:{data}&res=1"
  params:
    - name: data
      type: string
      description: "00h=OFF; 1Dh..80h..E3h = -99%..0..99%"
  notes: Locked when V-Log selected.
- id: chroma_level_query
  label: Chroma Level Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:B0&res=1"
  params: []
- id: chroma_phase_control
  label: Chroma Phase Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:0B:{data}&res=1"
  params: [{name: data, type: string, description: "61h..80h..9Fh = -31..0..+31"}]
  notes: Locked when V-Log selected.
- id: chroma_phase_query
  label: Chroma Phase Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:0B&res=1"
  params: []

# 4.2.8.1 AWB/ABB
- id: awb_execution_control
  label: AWB Execution Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OWS&res=0"
  params: []
  notes: "res=0. No response supports this command; if sent with res=1, returns 'OWS'."
- id: awb_mode_control
  label: AWB Mode Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OAW:{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0=ATW, 1=A, 2=B, 3=VAR, 4=3200K, 5=5600K"
  notes: Returns to physical switch setting on power-off or controller removal.
- id: awb_mode_query
  label: AWB Mode Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QAW&res=1"
  params: []
- id: abb_execution_control
  label: ABB Execution Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OAS&res=0"
  params: []
  notes: "res=0. No response supports this command; if sent with res=1, returns 'OAS'."
- id: color_temp_increment_control
  label: Color Temperature Increment Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSI:1E:{data}&res=1"
  params: [{name: data, type: string, description: "1h..Ah = 1..10 increment"}]
- id: color_temp_decrement_control
  label: Color Temperature Decrement Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSI:1F:{data}&res=1"
  params: [{name: data, type: string, description: "1h..Ah = 1..10 decrement"}]
- id: color_temp_query
  label: Color Temperature Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSI:20&res=1"
  params: []
  notes: Response OSI:20:[Data1]:[Data2]; [Data1]=K (00000h..FFFFFh, range 2000K..15000K); [Data2] 0h=Valid,1h=Invalid.
- id: atw_speed_control
  label: ATW Speed Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSI:25:{data}&res=1"
  params: [{name: data, type: integer, description: "0=Normal, 1=Slow, 2=Fast"}]
- id: atw_speed_query
  label: ATW Speed Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSI:25&res=1"
  params: []
- id: awb_gain_offset_control
  label: AWB Gain Offset Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:0C:{data}&res=1"
  params: [{name: data, type: string, description: "0h=Off, 1h=On"}]
- id: awb_gain_offset_query
  label: AWB Gain Offset Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:0C&res=1"
  params: []
- id: atw_target_r_control
  label: ATW Target R Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:0D:{data}&res=1"
  params: [{name: data, type: string, description: "76h..80h..8Ah = -10..0..+10"}]
- id: atw_target_r_query
  label: ATW Target R Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:0D&res=1"
  params: []
- id: atw_target_b_control
  label: ATW Target B Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:0E:{data}&res=1"
  params: [{name: data, type: string, description: "76h..80h..8Ah = -10..0..+10"}]
- id: atw_target_b_query
  label: ATW Target B Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:0E&res=1"
  params: []
- id: awb_colortemp_inc_control
  label: AWB Color Temperature INC Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:48:{data}&res=1"
  params: [{name: data, type: string, description: "1h..Ah = 1..10"}]
- id: awb_colortemp_dec_control
  label: AWB Color Temperature DEC Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:49:{data}&res=1"
  params: [{name: data, type: string, description: "1h..Ah = 1..10"}]
- id: awb_colortemp_query
  label: AWB Color Temperature Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:4A&res=1"
  params: []
  notes: Response OSJ:4A:[Data1]:[Data2]; [Data1]=K (00000h..FFFFFh, 2000K..15000K); [Data2] 0h=Valid,1h=Invalid.
- id: awb_r_gain_control
  label: AWB R Gain Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:4B:{data}&res=1"
  params: [{name: data, type: string, description: "670h..800h..990h = -400..0..400"}]
  notes: Returns 400 response if WB setting is PRESET.
- id: awb_r_gain_query
  label: AWB R Gain Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:4B&res=1"
  params: []
  notes: Returns 400 response if WB setting is PRESET.
- id: awb_b_gain_control
  label: AWB B Gain Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:4C:{data}&res=1"
  params: [{name: data, type: string, description: "670h..800h..990h = -400..0..400"}]
  notes: Returns 400 response if WB setting is PRESET.
- id: awb_b_gain_query
  label: AWB B Gain Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:4C&res=1"
  params: []
  notes: Returns 400 response if WB setting is PRESET.
- id: awb_g_axis_control
  label: AWB G Axis Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:4D:{data}&res=1"
  params: [{name: data, type: string, description: "670h..800h..990h = -400..0..400"}]
  notes: Returns 400 response if WB setting is PRESET.
- id: awb_g_axis_query
  label: AWB G Axis Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:4D&res=1"
  params: []
  notes: Returns 400 response if WB setting is PRESET.

# 4.2.9.1 Detail
- id: detail_control
  label: Detail Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=ODT:{data}&res=1"
  params: [{name: data, type: integer, description: "0=Off, 1=On"}]
  notes: Locked when V-Log selected.
- id: detail_query
  label: Detail Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QDT&res=1"
  params: []
- id: vdetail_level_control
  label: V Detail Level Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:A1:{data}&res=1"
  params: [{name: data, type: string, description: "79h..80h..87h = -7..0..7"}]
  notes: Locked when V-Log selected.
- id: vdetail_level_query
  label: V Detail Level Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:A1&res=1"
  params: []
- id: detail_frequency_control
  label: Detail Frequency Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:A2:{data}&res=1"
  params: [{name: data, type: string, description: "79h..80h..87h = -7..0..7"}]
  notes: Locked when V-Log selected.
- id: detail_frequency_query
  label: Detail Frequency Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:A2&res=1"
  params: []
- id: master_detail_control
  label: Master Detail Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:30:{data}&res=1"
  params: [{name: data, type: string, description: "61h..80h..9Fh = -31..0..+31"}]
  notes: Locked when V-Log selected.
- id: master_detail_query
  label: Master Detail Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:30&res=1"
  params: []
- id: detail_gain_pos_control
  label: Detail Gain(+) Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:38:{data}&res=1"
  params: [{name: data, type: string, description: "61h..80h..9Fh = -31..0..+31"}]
  notes: Locked when V-Log selected.
- id: detail_gain_pos_query
  label: Detail Gain(+) Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:38&res=1"
  params: []
- id: detail_gain_neg_control
  label: Detail Gain(-) Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:39:{data}&res=1"
  params: [{name: data, type: string, description: "61h..80h..9Fh = -31..0..+31"}]
  notes: Locked when V-Log selected.
  # UNRESOLVED: source lists no QSA:39 query row for Detail Gain(-).
- id: knee_aperture_level_control
  label: Knee Aperture Level Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSG:3F:{data}&res=1"
  params: [{name: data, type: string, description: "00h..05h = 0..5"}]
  notes: Locked when V-Log selected.
- id: knee_aperture_level_query
  label: Knee Aperture Level Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSG:3F&res=1"
  params: []
- id: detail_coring_control
  label: Detail Coring Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:12:{data}&res=1"
  params: [{name: data, type: string, description: "00h..3Ch = 0..60"}]
  notes: Locked when V-Log selected.
- id: detail_coring_query
  label: Detail Coring Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:12&res=1"
  params: []
- id: level_depend_control
  label: Level Depend Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:13:{data}&res=1"
  params: [{name: data, type: string, description: "00h..3Ch = 0..60"}]
  notes: Locked when V-Log selected.
- id: level_depend_query
  label: Level Depend Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:13&res=1"
  params: []
  notes: Response 79h..80h..87h = -7..0..7.

# 4.2.10.1 Gamma
- id: gamma_type_control
  label: Gamma Type Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSE:72:{data}&res=1"
  params:
    - name: data
      type: integer
      description: "0=HD, 1=SD, 2=FILMLIKE1, 3=FILMLIKE2, 4=FILMLIKE2, 5=FILM-REC, 6=VIDEO-REC, 7=HLG"
  notes: Locked when V-Log selected.
- id: gamma_type_query
  label: Gamma Type Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSE:72&res=1"
  params: []
- id: gamma_control
  label: Gamma Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:6A:{data}&res=1"
  params: [{name: data, type: string, description: "67h..6Ch..80h..94h = 0.30..0.35..0.55..0.75"}]
  notes: Locked when V-Log selected.
- id: gamma_query
  label: Gamma Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:6A&res=1"
  params: []
- id: black_gamma_control
  label: Black Gamma Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:07:{data}&res=1"
  params: [{name: data, type: string, description: "78h..80h..88h = -8..0..+8"}]
  notes: Locked when V-Log selected.
- id: black_gamma_query
  label: Black Gamma Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:07&res=1"
  params: []
- id: black_gamma_range_control
  label: Black Gamma Range Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSJ:1B:{data}&res=1"
  params: [{name: data, type: string, description: "1h/2h/3h = 1/2/3"}]
  notes: Locked when V-Log selected.
- id: black_gamma_range_query
  label: Black Gamma Range Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSJ:1B&res=1"
  params: []
- id: frec_dynamic_level_control
  label: F-REC Dynamic LVL Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:10:{data}&res=1"
  params: [{name: data, type: integer, description: "0=200%, 1=300%, 2=400%, 3=500%, 4=600%"}]
  notes: Locked when V-Log selected or FILM-REC not selected.
- id: frec_dynamic_level_query
  label: F-REC Dynamic LVL Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:10&res=1"
  params: []
- id: frec_black_str_level_control
  label: F-REC Black STR LVL Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:0F:{data}&res=1"
  params: [{name: data, type: string, description: "00h..1Eh = 0..30"}]
  notes: Locked when V-Log selected or FILM-REC not selected.
- id: frec_black_str_level_query
  label: F-REC Black STR LVL Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:0F&res=1"
  params: []
- id: vrec_knee_slope_control
  label: V-REC Knee Slope Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:25:{data}&res=1"
  params: [{name: data, type: string, description: "7Ch..80h..83h = 150%..350%..500% (1 step=50%)"}]
  notes: Locked when V-Log selected or VIDEO-REC not selected.
- id: vrec_knee_slope_query
  label: V-REC Knee Slope Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:25&res=1"
  params: []
- id: vrec_knee_point_control
  label: V-REC Knee Point Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:21:{data}&res=1"
  params: [{name: data, type: string, description: "62h..80h..9Eh..AFh = 30%..60%..90%..107%"}]
  notes: Locked when V-Log selected or VIDEO-REC not selected.
- id: vrec_knee_point_query
  label: V-REC Knee Point Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:21&res=1"
  params: []

# 4.2.11.1 Digital zoom
- id: izoom_control
  label: iZoom Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:B3:{data}&res=1"
  params: [{name: data, type: integer, description: "0=Off, 1=On"}]
  notes: Not supported by AJ-CX4000/AJ-UPX900.
- id: izoom_query
  label: iZoom Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:B3&res=1"
  params: []
  notes: Not supported by AJ-CX4000/AJ-UPX900.

# 4.2.12.1 Camera information
- id: model_number_query
  label: Model Number Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QID&res=1"
  params: []
  notes: Response OID:[Data]; for AJ-CX4000 returns "AJ-CX4000".

# 4.2.13.1 System frequency
- id: system_frequency_query
  label: System Frequency Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSE:77&res=1"
  params: []
  notes: Response OSE:77 0=59.94Hz, 1=50.00Hz. Requires AJ-CX4000 Ver6.00~.

# 4.2.14.1 Knee
- id: knee_mode_control
  label: Knee Mode Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:2D:{data}&res=1"
  params: [{name: data, type: integer, description: "0=OFF, 1=MANUAL, 2=AUTO"}]
  notes: Locked when V-Log selected. AJ-CX4000 returns to physical switch on power-off/controller removal.
- id: knee_mode_query
  label: Knee Mode Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:2D&res=1"
  params: []
- id: master_knee_point_control
  label: Master Knee Point Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:20:{data}&res=1"
  params: [{name: data, type: string, description: "22h..4Ah..80h..B6h = 70.00%..80.00%..93.50%..107.00% (1 step=0.5%)"}]
  notes: Locked when V-Log selected.
- id: master_knee_point_query
  label: Master Knee Point Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:20&res=1"
  params: []
- id: master_knee_slope_control
  label: Master Knee Slope Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:24:{data}&res=1"
  params: [{name: data, type: string, description: "00h..63h = 0..99"}]
  notes: Locked when V-Log selected.
- id: master_knee_slope_query
  label: Master Knee Slope Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:24&res=1"
  params: []
- id: auto_knee_response_control
  label: Auto Knee Response Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSG:97:{data}&res=1"
  params: [{name: data, type: integer, description: "1..8"}]
  notes: Locked when V-Log selected.
- id: auto_knee_response_query
  label: Auto Knee Response Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSG:97&res=1"
  params: []
- id: hlg_knee_sw_control
  label: HLG Knee SW Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSI:40:{data}&res=1"
  params: [{name: data, type: integer, description: "0=OFF, 1=ON"}]
  notes: Locked when V-Log selected.
- id: hlg_knee_sw_query
  label: HLG Knee SW Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSI:40&res=1"
  params: []
- id: hlg_knee_point_control
  label: HLG Knee Point Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSI:41:{data}&res=1"
  params: [{name: data, type: string, description: "1Ch..80h..D0h = 55.00%..80.00%..100.00% (1 step=0.25%, valid 4-step/1% units)"}]
  notes: Locked when V-Log selected.
- id: hlg_knee_point_query
  label: HLG Knee Point Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSI:41&res=1"
  params: []
- id: hlg_knee_slope_control
  label: HLG Knee Slope Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSI:42:{data}&res=1"
  params: [{name: data, type: string, description: "00h..64h = 0..100"}]
  notes: Locked when V-Log selected.
- id: hlg_knee_slope_query
  label: HLG Knee Slope Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSI:42&res=1"
  params: []

# 4.2.15.1 White Clip
- id: white_clip_settings_control
  label: White Clip Settings Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:2E:{data}&res=1"
  params: [{name: data, type: integer, description: "0=OFF, 1=ON"}]
  notes: Locked when V-Log selected.
- id: white_clip_settings_query
  label: White Clip Settings Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:2E&res=1"
  params: []
- id: white_clip_level_control
  label: White Clip Level Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:2A:{data}&res=1"
  params: [{name: data, type: string, description: "00h..13h = 90%..109%"}]
  notes: Changing White Clip while Knee Auto also changes Knee value. Locked when V-Log selected.
- id: white_clip_level_query
  label: White Clip Level Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:2A&res=1"
  params: []

# 4.2.16.1 OIS
- id: ois_settings_control
  label: OIS Settings Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OIS:{data}&res=1"
  params: [{name: data, type: integer, description: "0=Off, 1=On"}]
  notes: Not supported by AJ-CX4000/AJ-UPX900.
- id: ois_settings_query
  label: OIS Settings Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QIS&res=1"
  params: []
  notes: Not supported by AJ-CX4000/AJ-UPX900.

# 4.2.17.1 Tally
- id: red_tally_control
  label: RED Tally Settings Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=TLR:{data}&res=1"
  params: [{name: data, type: integer, description: "0=Off, 1=On"}]
- id: red_tally_query
  label: RED Tally Settings Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QLR&res=1"
  params: []
  notes: Response TLR:[Data].
- id: green_tally_control
  label: GREEN Tally Settings Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=TLG:{data}&res=1"
  params: [{name: data, type: integer, description: "0=Off, 1=On"}]
- id: green_tally_query
  label: GREEN Tally Settings Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QLG&res=1"
  params: []
  notes: Response OLG:[Data].

# 4.2.18.1 SKIN TONE DETAIL
- id: skin_tone_detail_control
  label: SKIN TONE DETAIL Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSA:40:{data}&res=1"
  params: [{name: data, type: integer, description: "0=Off, 1=On (controls SKIN TONE DTL A)"}]
  notes: OFF when V-Log selected.
- id: skin_tone_detail_query
  label: SKIN TONE DETAIL Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSA:40&res=1"
  params: []
- id: skin_detail_effect_control
  label: SKIN DETAIL EFFECT Control
  kind: action
  command: "/cgi-bin/aw_cam?cmd=OSD:A3:{data}&res=1"
  params: [{name: data, type: string, description: "80h..9Fh = 0..31"}]
  notes: Locked when V-Log selected.
- id: skin_detail_effect_query
  label: SKIN DETAIL EFFECT Query
  kind: query
  command: "/cgi-bin/aw_cam?cmd=QSD:A3&res=1"
  params: []

# ---------- 4.3 Video transmission & network application control ----------

- id: device_info_acquisition
  label: Device Information Acquisition
  kind: query
  command: "/cgi-bin/getinfo?FILE=1"
  params: []
  notes: Response includes MAC, SERIAL, VERSION, NAME, stream/audio params (see source for full field list).
- id: jpeg_snapshot_request
  label: JPEG Image 1-Shot Request
  kind: query
  command: "/cgi-bin/view.cgi?action=snapshot"
  params: []
  notes: CX series supports only "snapshot". Requires AJ-CX4000 Ver6.00~. Resolution fixed 416x240.
- id: basic_settings_acquisition
  label: Basic Settings Information Acquisition
  kind: query
  command: "/cgi-bin/get_basic"
  params: []
  notes: Response cam_title, plugin_download(disable), plugin_disp(0).
- id: videooverip_info_acquisition
  label: VideoOverIP Screen Information Acquisition
  kind: query
  command: "/cgi-bin/get_video_over_ip"
  params: []
  notes: Response fields issued in random order; missing ch fields mean transmission not possible for that ch.
- id: camera_status_acquisition
  label: Camera Status Acquisition
  kind: query
  command: "/cgi-bin/get_state"
  params: []
  notes: Requires AJ-CX4000 Ver6.00~. Response: rec, rec_counter, ftp_send, play, sd card states, etc.
- id: sd_recording_control
  label: MP4 Recording to SD Card Control
  kind: action
  command: "/cgi-bin/sdctrl?save={action}"
  params:
    - name: action
      type: string
      description: "start=Recording Start, end=Recording End"
  notes: Only available when camera ready for recording.
- id: rtmp_stream_control
  label: RTMP Stream Control
  kind: action
  command: "/cgi-bin/rtmp_ctrl?cmd={action}"
  params:
    - name: action
      type: string
      description: "start=RTMP Stream Start, stop=RTMP Stream Stop"
  notes: Only available when RTMP selected as streaming protocol.
- id: rtmp_server_setting
  label: RTMP Server Setting
  kind: action
  command: "/cgi-bin/set_rtmp_param?type={type}&url={url}&key={key}"
  params:
    - name: type
      type: integer
      description: "0=URL/Stream key concatenation, 1=URL/Stream key split"
    - name: url
      type: string
      description: Server URL
    - name: key
      type: string
      description: Stream Key (optional if type=0)
  notes: Requires AJ-CX4000 Ver6.00~ and RTMP selected.
- id: srt_stream_control
  label: SRT Stream Control
  kind: action
  command: "/cgi-bin/srt_ctrl?cmd={action}"
  params:
    - name: action
      type: string
      description: "start=SRT Stream Start, stop=SRT Stream Stop"
  notes: Only available when SRT CLIENT selected as streaming protocol.
- id: srt_streaming_setting
  label: SRT Streaming Setting
  kind: action
  command: "/cgi-bin/set_srt_info?mode={mode}&dip_addr={dip_addr}&dport={dport}&encryption={encryption}&passphrase={passphrase}&streamid={streamid}"
  params:
    - name: mode
      type: integer
      description: "0=Client (CX series only), 1=Listener (not supported on CX)"
    - name: dip_addr
      type: string
      description: Destination IP address (*.*.*.*)
    - name: dport
      type: integer
      description: Destination port number
    - name: encryption
      type: integer
      description: "0=OFF, 1=AES-128, 2=AES-256, 3=AES-192"
    - name: passphrase
      type: string
      description: Passphrase
    - name: streamid
      type: string
      description: Stream ID
  notes: Requires AJ-CX4000 Ver6.00~ and SRT CLIENT selected.
```

## Feedbacks
```yaml
# Observable states returned by query actions. Each query action above also has a
# corresponding response; the principal discrete/enum states are enumerated here.
- id: power_state
  type: enum
  values: ["on"]  # source: response value always 1 = Power On
- id: zoom_position
  type: range
  values: ["555h..FFFh"]  # Wide..Tele
- id: focus_position
  type: range
  values: ["555h..FFFh"]  # Near..Far
- id: auto_focus_state
  type: enum
  values: [manual, auto]
- id: iris_position
  type: range
  values: ["01..99 / 555h..FFFh"]  # Close..Open
- id: auto_iris_state
  type: enum
  values: [manual, auto]
- id: nd_filter_state
  type: enum
  values: [through, "1/4", "1/16", "1/64", ng]
- id: color_bar_state
  type: enum
  values: [camera, color_bars]
- id: scene_file
  type: enum
  values: ["scene1", "scene2", "scene3", "scene4", "scene5", "scene6"]
- id: gain
  type: range
  values: ["-6dB..+42dB", auto_agc_on, manual_agc_off]
- id: awb_mode
  type: enum
  values: [ATW, A, B, VAR, "3200K", "5600K"]
- id: gamma_type
  type: enum
  values: [HD, SD, FILMLIKE1, FILMLIKE2, FILM-REC, VIDEO-REC, HLG]
- id: knee_mode
  type: enum
  values: [off, manual, auto]
- id: system_frequency
  type: enum
  values: ["59.94Hz", "50.00Hz"]
- id: red_tally_state
  type: enum
  values: [off, on]
- id: green_tally_state
  type: enum
  values: [off, on]
- id: model_number
  type: string
  values: ["AJ-CX4000"]
# UNRESOLVED: full response payload field-by-field mapping for getinfo/get_state/get_video_over_ip
# not exhaustively enumerated here (see source for complete field lists).
```

## Variables
```yaml
# Settable continuous parameters are represented as Actions (the O*/OS*:*/OR* setters).
# No additional non-action variables are documented as a separate category.
# UNRESOLVED: none beyond the setter actions enumerated above.
```

## Events
```yaml
# No unsolicited notifications documented. All responses are request/response (HTTP GET).
# get_state is polled by the client; not a push event.
# UNRESOLVED: source documents no asynchronous/event-push mechanism.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: populate if source contains macro sequences - none found.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains no safety warnings, interlock procedures, or power-on sequencing
# requirements. Camera power cannot be toggled via protocol (query only).
# UNRESOLVED: none - no safety content in source.
```

## Notes
- Applicable models (verbatim from source): AG-CX350 Ver6.00~, AJ-UPX360 Ver6.00~, AG-CX200 Ver6.00~, **AJ-CX4000 Ver5.00~**, AJ-UPX900 Ver5.00~. Some commands (system_frequency_query, jpeg_snapshot, get_state, set_rtmp_param, set_srt_info) require AJ-CX4000 Ver6.00~.
- Control requires NDI|HX mode ON or IP REMOTE ENABLE(HOLD). On AG-CX350/AJ-UPX360/AG-CX200 also set body Auto/Manual switch to Auto. Otherwise all commands return HTTP 404.
- Three HTTP/CGI endpoint families: `/cgi-bin/aw_ptz` (pan-tilt, res=1 fixed), `/cgi-bin/aw_cam` (camera control, res=1; res=0 for AWB[OWS]/ABB[OAS] execution), and `/cgi-bin/<path>?<param>=<value>` (video/network).
- "#" in command strings may require URL-encoding as "%23" depending on client.
- Many image-parameter setters are locked (cannot be changed) when V-Log is the selected Color Setting.
- Several commands are explicitly marked "Not supported by the AJ-CX4000/AJ-UPX900" (zoom/focus speed control, AF on/off, one-touch focus, ND filter, auto iris speed, color matrix, iZoom, OIS). They remain listed here because the source documents them as command rows for the protocol family.
- ABB/AWB execution commands (OWS/OAS) use res=0 and have no supporting response.
- Source document revision: Rev.3.00 (2022-01-25).

<!-- UNRESOLVED: user-supplied "Known protocol: RS-232C" is not corroborated by this source, which describes only the HTTP/CGI PTZ Control Protocol on TCP port 80. A separate RS-232C document would be needed to populate serial transport. -->
<!-- UNRESOLVED: firmware upper-bound compatibility not stated (only minimum per-command firmware given). -->
<!-- UNRESOLVED: physical/electrical specs, error recovery sequences, and protocol version negotiation not in source. -->

## Provenance

```yaml
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/CX350_CX4000_Command_for_PTZ_Control_Protocol.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/EN/top.html
retrieved_at: 2026-07-01T12:52:36.307Z
last_checked_at: 2026-07-07T11:46:03.356Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:46:03.356Z
matched_actions: 245
action_count: 245
confidence: medium
summary: "All 245 spec actions have verbatim CGI command matches in the source; transport (port 80, /cgi-bin/ base) confirmed; source catalogue is fully represented. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "user-supplied \"Known protocol: RS-232C\" — the provided source document describes only the HTTP/CGI PTZ Control Protocol (port 80); no RS-232C serial command set appears in this source. RS-232C transport is therefore not populated."
- "voltage / power / current specs not in source."
- "physical layer (cabling) and firmware upper bound not stated (only minimum applicable firmware per model given)."
- "no serial config found in this source (user hint RS-232C not corroborated)."
- "source lists no QSA:39 query row for Detail Gain(-)."
- "full response payload field-by-field mapping for getinfo/get_state/get_video_over_ip"
- "none beyond the setter actions enumerated above."
- "source documents no asynchronous/event-push mechanism."
- "populate if source contains macro sequences - none found."
- "none - no safety content in source."
- "user-supplied \"Known protocol: RS-232C\" is not corroborated by this source, which describes only the HTTP/CGI PTZ Control Protocol on TCP port 80. A separate RS-232C document would be needed to populate serial transport."
- "firmware upper-bound compatibility not stated (only minimum per-command firmware given)."
- "physical/electrical specs, error recovery sequences, and protocol version negotiation not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
