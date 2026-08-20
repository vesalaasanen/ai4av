---
spec_id: admin/christie-sapphire-4k40-rgbh
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie Sapphire 4K40-RGBH Control Spec"
manufacturer: Christie
model_family: "Christie Sapphire 4K40-RGBH"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "Christie Sapphire 4K40-RGBH"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-103316-13-Christie-LIT-TECH-REF-TruLifePlus-API.pdf
  - "https://www.manualslib.com/manual/3714733/Christie-Sapphire-4k40-Rgbh.html?page=75"
retrieved_at: 2026-08-11T05:36:19.357Z
last_checked_at: 2026-08-19T09:06:22.133Z
generated_at: 2026-08-19T09:06:22.133Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial data_bits/parity/stop_bits not stated in source."
  - "firmware version compatibility not stated in source."
  - "exact default voltage/power specs not covered (out of scope for control doc)."
  - "not stated in source"
  - "additional feedback values (e.g. CUC readings, FRD actual delay) not exhaustively enumerated"
  - "none identified beyond Actions"
  - "full interlock/error-recovery sequences (e.g. thermal shutdown behavior)"
  - "firmware version compatibility not stated."
  - "connector pinout / cable wiring references User Guide (P/N 020-103315-XX), not in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:06:22.133Z
  matched_actions: 232
  action_count: 232
  confidence: medium
  summary: "Spec enumerates 232 action units that all map verbatim to documented TruLife+ mnemonics; transport (port 3002, baud 115200) is stated in source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Christie Sapphire 4K40-RGBH Control Spec

## Summary
Christie Sapphire 4K40-RGBH is a 4K RGB laser projector in the Christie TruLife+ family. This spec covers the Christie TruLife+ ASCII serial command protocol over both RS-232 (RS232C) and Ethernet/TCP. Messages are parenthesized text: `(CODE data)`, `(CODE? )` requests, `(CODE!data)` replies, with optional `+SUBCODE`, `$`/`#` acknowledgment, and `&` checksum prefixes.

<!-- UNRESOLVED: serial data_bits/parity/stop_bits not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: exact default voltage/power specs not covered (out of scope for control doc). -->

## Transport
```yaml
# Source documents both RS232 IN port and Ethernet port. Serial-over-Ethernet
# uses the Christie serial protocol on TCP port 3002 (stated). Default RS232
# baud is 115200 (stated via BDR default value 6). Data bits/parity/stop bits
# not stated. Flow control: Xon/Xoff (11h/13h) described in Flow control section.
protocols:
  - tcp
  - serial
addressing:
  port: 3002  # stated: "connect to port 3002" for Christie serial protocol over Ethernet; configurable via NET+PORT (1024-49151, 3003 reserved)
serial:
  baud_rate: 115200  # stated default (BDR+PRTA value 6); configurable 2400/9600/19200/38400/57600/115200
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: xon_xoff  # inferred: Xon(11h)/Xoff(13h) flow control described in source
auth:
  type: none  # inferred: default Remote Access Level (RAL) = Free Access = operator level without login; UID login exists for elevated/service access
```

## Traits
```yaml
traits:
  - powerable   # inferred: PWR on/off commands present
  - queryable   # inferred: many request (?) commands returning state (PWR?, SHU?, SST?, etc.)
  - routable    # inferred: input/channel selection commands (SIN, CHA, SIN+PORT)
  - levelable   # inferred: laser power, lens position, gamma, sharpness set commands
```

## Actions
```yaml
# All command payloads verbatim from source (parenthesized ASCII). kind: query
# for request (?) forms, kind: action for set forms. Per coverage rule every
# documented opcode/subcode enumerated.

# --- ADR - Projector Address ---
- id: adr_query
  label: Query Projector Address
  kind: query
  command: "(ADR?)"
  params: []

- id: adr_set
  label: Set Projector Address
  kind: action
  command: "(ADR {value})"
  params:
    - name: value
      type: integer
      description: "0 to 999; 65535 = reserved broadcast address"

# --- APW - Auto Power On ---
- id: apw_set
  label: Set Auto Power On
  kind: action
  command: "(APW {value})"
  params:
    - name: value
      type: integer
      description: "0 = disable auto power up, 1 = enable auto power up"

# --- BDR - Baud Rate ---
- id: bdr_prta_query
  label: Query RS232-IN Baud Rate
  kind: query
  command: "(BDR+PRTA?)"
  params: []

- id: bdr_prta_set
  label: Set RS232-IN Baud Rate
  kind: action
  command: "(BDR+PRTA {value})"
  params:
    - name: value
      type: integer
      description: "1=2400, 2=9600, 3=19200, 4=38400, 5=57600, 6=115200 (default). Service access required."

# --- BGC - Gamma Function ---
- id: bgc_set
  label: Set Gamma Transfer Function
  kind: action
  command: "(BGC {value})"
  params:
    - name: value
      type: integer
      description: "0=Auto Detect, 1=sRGB, 2=Power Law, 3=Classic, 4=ITU-R BT.1886, 6=HDR/PQ, 7=Raw PQ clipped, 100+=custom"

# --- BLO - Black Level Offset ---
- id: blo_cali
  label: Save Black Level Offset Factory Defaults
  kind: action
  command: "(BLO+CALI 1)"
  params: []

- id: blo_bluo_set
  label: Set Blue DMD Black Offset
  kind: action
  command: "(BLO+BLUO {value})"
  params:
    - name: value
      type: integer
      description: "0 to 100, 100 = 0.0010 (default)"

- id: blo_grno_set
  label: Set Green DMD Black Offset
  kind: action
  command: "(BLO+GRNO {value})"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: blo_redo_set
  label: Set Red DMD Black Offset
  kind: action
  command: "(BLO+REDO {value})"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: blo_maxo_set
  label: Set Max Black Level Offset
  kind: action
  command: "(BLO+MAXO {value})"
  params:
    - name: value
      type: integer
      description: maximum value of black level offset

- id: blo_slct_set
  label: Enable/Disable Black Level Offsets
  kind: action
  command: "(BLO+SLCT {value})"
  params:
    - name: value
      type: integer
      description: "0 = disable, 1 = enable (default)"

# --- CAV - Video Input Configuration ---
- id: cav_mode_query
  label: Query Scaler FPGA Mode
  kind: query
  command: "(CAV+MODE?)"
  params: []

- id: cav_mode_set
  label: Set Scaler FPGA Mode
  kind: action
  command: "(CAV+MODE {value})"
  params:
    - name: value
      type: integer
      description: "0 = DP mode (default), 1 = SDVoE mode"

# --- CCA - Color Adjustment ---
- id: cca_copy_set
  label: Copy Color Table
  kind: action
  command: "(CCA+COPY {value})"
  params:
    - name: value
      type: integer
      description: "0=Max Drives, 1=Color Temp, 2=HD Video, 5=DCI P3, 6=DCI P3 D65, 7=BT.2020"

- id: cca_ctmp_set
  label: Set Color Temperature
  kind: action
  command: "(CCA+CTMP {value})"
  params:
    - name: value
      type: integer
      description: "3200 to 9300; 6500 default"

- id: cca_slct_set
  label: Select Color Table
  kind: action
  command: "(CCA+SLCT {value})"
  params:
    - name: value
      type: integer
      description: "0=Max Drives,1=Color Temp,2=HD Video,3=Custom,4=Auto Detect(default),5=DCI P3,6=DCI P3 D65,7=BT.2020"

- id: cca_rdcx_set
  label: Set Custom Red X Coordinate
  kind: action
  command: "(CCA+RDCX {value})"
  params:
    - name: value
      type: integer
      description: x coordinate for red, scaled by 10000

- id: cca_rdcy_set
  label: Set Custom Red Y Coordinate
  kind: action
  command: "(CCA+RDCY {value})"
  params:
    - name: value
      type: integer
      description: y coordinate for red, scaled by 10000

- id: cca_gncx_set
  label: Set Custom Green X Coordinate
  kind: action
  command: "(CCA+GNCX {value})"
  params:
    - name: value
      type: integer
      description: x coordinate for green, scaled by 10000

- id: cca_gncy_set
  label: Set Custom Green Y Coordinate
  kind: action
  command: "(CCA+GNCY {value})"
  params:
    - name: value
      type: integer
      description: y coordinate for green, scaled by 10000

- id: cca_blcx_set
  label: Set Custom Blue X Coordinate
  kind: action
  command: "(CCA+BLCX {value})"
  params:
    - name: value
      type: integer
      description: x coordinate for blue, scaled by 10000

- id: cca_blcy_set
  label: Set Custom Blue Y Coordinate
  kind: action
  command: "(CCA+BLCY {value})"
  params:
    - name: value
      type: integer
      description: y coordinate for blue, scaled by 10000

- id: cca_whcx_set
  label: Set Custom White X Coordinate
  kind: action
  command: "(CCA+WHCX {value})"
  params:
    - name: value
      type: integer
      description: x coordinate for white, scaled by 10000

- id: cca_whcy_set
  label: Set Custom White Y Coordinate
  kind: action
  command: "(CCA+WHCY {value})"
  params:
    - name: value
      type: integer
      description: y coordinate for white, scaled by 10000

- id: cca_gofr_set
  label: Set Green-of-Red Saturation
  kind: action
  command: "(CCA+GOFR {value})"
  params:
    - name: value
      type: integer
      description: "-1000 to 1000, 1000 = 100%"

- id: cca_bofr_set
  label: Set Blue-of-Red Saturation
  kind: action
  command: "(CCA+BOFR {value})"
  params:
    - name: value
      type: integer
      description: "-1000 to 1000"

- id: cca_rofg_set
  label: Set Red-of-Green Saturation
  kind: action
  command: "(CCA+ROFG {value})"
  params:
    - name: value
      type: integer
      description: "-1000 to 1000"

- id: cca_bofg_set
  label: Set Blue-of-Green Saturation
  kind: action
  command: "(CCA+BOFG {value})"
  params:
    - name: value
      type: integer
      description: "-1000 to 1000"

- id: cca_rofb_set
  label: Set Red-of-Blue Saturation
  kind: action
  command: "(CCA+ROFB {value})"
  params:
    - name: value
      type: integer
      description: "-1000 to 1000"

- id: cca_gofb_set
  label: Set Green-of-Blue Saturation
  kind: action
  command: "(CCA+GOFB {value})"
  params:
    - name: value
      type: integer
      description: "-1000 to 1000"

- id: cca_rofr_set
  label: Set Red-of-Red Saturation
  kind: action
  command: "(CCA+ROFR {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000, 1000 = 100%"

- id: cca_gofg_set
  label: Set Green-of-Green Saturation
  kind: action
  command: "(CCA+GOFG {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000"

- id: cca_bofb_set_native
  label: Set Blue-of-Blue Saturation
  kind: action
  command: "(CCA+BOFB {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000"

- id: cca_rofw_set
  label: Set Red-of-White Saturation
  kind: action
  command: "(CCA+ROFW {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000"

- id: cca_gofw_set
  label: Set Green-of-White Saturation
  kind: action
  command: "(CCA+GOFW {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000"

- id: cca_bofw_set
  label: Set Blue-of-White Saturation
  kind: action
  command: "(CCA+BOFW {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000"

- id: cca_rdpx_set
  label: Set Native Red X Primary
  kind: action
  command: "(CCA+RDPX {value})"
  params:
    - name: value
      type: integer
      description: native red x coordinate, scaled by 10000. Service user only.

- id: cca_rdpy_set
  label: Set Native Red Y Primary
  kind: action
  command: "(CCA+RDPY {value})"
  params:
    - name: value
      type: integer
      description: native red y coordinate, scaled by 10000. Service user only.

- id: cca_gnpx_set
  label: Set Native Green X Primary
  kind: action
  command: "(CCA+GNPX {value})"
  params:
    - name: value
      type: integer
      description: native green x coordinate, scaled by 10000. Service user only.

- id: cca_gnpy_set
  label: Set Native Green Y Primary
  kind: action
  command: "(CCA+GNPY {value})"
  params:
    - name: value
      type: integer
      description: native green y coordinate, scaled by 10000. Service user only.

- id: cca_blpx_set
  label: Set Native Blue X Primary
  kind: action
  command: "(CCA+BLPX {value})"
  params:
    - name: value
      type: integer
      description: native blue x coordinate, scaled by 10000. Service user only.

- id: cca_blpy_set
  label: Set Native Blue Y Primary
  kind: action
  command: "(CCA+BLPY {value})"
  params:
    - name: value
      type: integer
      description: native blue y coordinate, scaled by 10000. Service user only.

- id: cca_whpx_set
  label: Set Native White X Primary
  kind: action
  command: "(CCA+WHPX {value})"
  params:
    - name: value
      type: integer
      description: native white x coordinate, scaled by 10000. Service user only.

- id: cca_whpy_set
  label: Set Native White Y Primary
  kind: action
  command: "(CCA+WHPY {value})"
  params:
    - name: value
      type: integer
      description: native white y coordinate, scaled by 10000. Service user only.

- id: cca_rset
  label: Reset Native Color Primaries
  kind: action
  command: "(CCA+RSET)"
  params: []

- id: cca_save
  label: Save Native Color Primaries
  kind: action
  command: "(CCA+SAVE)"
  params: []

# --- CHA - Channel ---
- id: cha_list_query
  label: Query Available Channels List
  kind: query
  command: "(CHA?L)"
  params: []

- id: cha_select
  label: Select Channel
  kind: action
  command: "(CHA {channel})"
  params:
    - name: channel
      type: integer
      description: "channel id (e.g. 600=One-port HDMI0, 603=DP0, 622=Four-Port SDI, 636=Four-Port DP)"

# --- CHL - Christie Link Input Select ---
- id: chl_inpt_set
  label: Set Christie Link Input
  kind: action
  command: "(CHL+INPT {value})"
  params:
    - name: value
      type: integer
      description: "0=default loopout, 1=port 1, 2=port 2"

# --- CLE - Color Enable ---
- id: cle_set
  label: Enable Color in Video Path
  kind: action
  command: "(CLE {color})"
  params:
    - name: color
      type: integer
      description: "0=White,1=Red,2=Green,3=Blue,4=Yellow,5=Cyan,6=Magenta"

# --- COO - Cooling Option ---
- id: coo_hepa_set
  label: Set Pressurized Filter Installed
  kind: action
  command: "(COO+HEPA {value})"
  params:
    - name: value
      type: integer
      description: "0 = not installed, 1 = installed"

# --- CSP - Color Space Selection ---
- id: csp_set
  label: Set Color Space
  kind: action
  command: "(CSP {color_space})"
  params:
    - name: color_space
      type: integer
      description: "0=Auto,1=RGB full,2=YCbCr 709,3=RGB limited,4=YCbCr exp,5=YCbCr JPEG,6=YCbCr 2020,7=YCbCr 2020 full,8=XYZ"

# --- CUC - 1D Color Uniformity ---
- id: cuc_habl_set
  label: Set Color Uniformity Luminance
  kind: action
  command: "(CUC+H{a}{b}L {luminance})"
  params:
    - name: a
      type: integer
      description: "point being measured (1 to 5)"
    - name: b
      type: string
      description: "color R/G/B"
    - name: luminance
      type: integer
      description: measured luminance value

- id: cuc_habx_set
  label: Set Color Uniformity X Reading
  kind: action
  command: "(CUC+H{a}{b}X {measurement})"
  params:
    - name: a
      type: integer
      description: "point 1 to 5"
    - name: b
      type: string
      description: "color R/G/B"
    - name: measurement
      type: integer
      description: X coordinate of color

- id: cuc_haby_set
  label: Set Color Uniformity Y Reading
  kind: action
  command: "(CUC+H{a}{b}Y {measurement})"
  params:
    - name: a
      type: integer
      description: "point 1 to 5"
    - name: b
      type: string
      description: "color R/G/B"
    - name: measurement
      type: integer
      description: Y coordinate of color

- id: cuc_slct_set
  label: Enable/Disable Color Uniformity
  kind: action
  command: "(CUC+SLCT {value})"
  params:
    - name: value
      type: integer
      description: "0=disable(default),1=enable 1D,2=custom from file"

# --- DEF - Factory Defaults ---
- id: def_factory_reset
  label: Factory Defaults Reset
  kind: action
  command: "(DEF 111)"
  params: []

# --- DMX - DMX/ArtNet ---
- id: dmx_chan_set
  label: Set Art-Net Base Channel
  kind: action
  command: "(DMX+CHAN {value})"
  params:
    - name: value
      type: integer
      description: "1 to 488; 1 default"

- id: dmx_enbl_set
  label: Enable/Disable Art-Net Interface
  kind: action
  command: "(DMX+ENBL {value})"
  params:
    - name: value
      type: integer
      description: "0 = disable (default), 1 = enable"

- id: dmx_nets_set
  label: Set Art-Net Network
  kind: action
  command: "(DMX+NETS {value})"
  params:
    - name: value
      type: integer
      description: "0 to 127; 0 default"

- id: dmx_subn_set
  label: Set Art-Net Subnet
  kind: action
  command: "(DMX+SUBN {value})"
  params:
    - name: value
      type: integer
      description: "0 to 15; 0 default"

- id: dmx_unvs_set
  label: Set Art-Net Universe
  kind: action
  command: "(DMX+UNVS {value})"
  params:
    - name: value
      type: integer
      description: "0 to 15; 0 default"

# --- DRK - 3D Dark Interval ---
- id: drk_set
  label: Set 3D Dark Interval
  kind: action
  command: "(DRK {value})"
  params:
    - name: value
      type: integer
      description: "250 to 3000 microseconds; 690 default"

# --- DTL - Sharpness ---
- id: dtl_set
  label: Set Sharpness
  kind: action
  command: "(DTL {value})"
  params:
    - name: value
      type: integer
      description: "0-49 soften, 50 default, 51-100 sharpen"

# --- EBB - Black Level Blending ---
- id: ebb_slct_list_query
  label: Query Black Level Blends List
  kind: query
  command: "(EBB+SLCT?L)"
  params: []

- id: ebb_slct_set
  label: Select Black Level Blend
  kind: action
  command: "(EBB+SLCT {value})"
  params:
    - name: value
      type: integer
      description: "0=off(default),1-4=blend,11=basic"

# --- EBL - Edge Blending Select ---
- id: ebl_slct_list_query
  label: Query Edge Blends List
  kind: query
  command: "(EBL+SLCT?L)"
  params: []

- id: ebl_slct_set
  label: Select Edge Blend
  kind: action
  command: "(EBL+SLCT {value})"
  params:
    - name: value
      type: integer
      description: "0=off,1-4=blend,11=basic"

# --- EDO - EDID Override ---
- id: edo_set
  label: Set Expected Frame Rate
  kind: action
  command: "(EDO {rate})"
  params:
    - name: rate
      type: integer
      description: "24,25,30,50,60(default),120(3D license)"

- id: edo_advn_set
  label: Set EDID Mode
  kind: action
  command: "(EDO+ADVN {value})"
  params:
    - name: value
      type: integer
      description: "0=legacy, 1=default"

# --- EME - Enable Asynchronous Serial Messages ---
- id: eme_set
  label: Enable/Disable Async Serial Messages
  kind: action
  command: "(EME {value})"
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable (default)"

# --- ENH - Enhanced Healing ---
- id: enh_slct_set
  label: Set Enhanced DMD Healing
  kind: action
  command: "(ENH+SLCT {value})"
  params:
    - name: value
      type: integer
      description: "0=off(default),1=on"

# --- ETP - Engine Test Pattern ---
- id: etp_set
  label: Set Engine Test Pattern
  kind: action
  command: "(ETP {index})"
  params:
    - name: index
      type: integer
      description: "0=Flat Black ... 238=Color Bars ... 255=Off"

# --- EVT - Event Manager ---
- id: evt_all_query
  label: Query All Events
  kind: query
  command: "(EVT)"
  params: []

- id: evt_max_query
  label: Query N Most Recent Events
  kind: query
  command: "(EVT {max})"
  params:
    - name: max
      type: integer
      description: maximum number of events to return

- id: evt_range_query
  label: Query Events Between Timestamps
  kind: query
  command: "(EVT \"{start}\" \"{end}\")"
  params:
    - name: start
      type: string
      description: "yyyy-mm-dd hh:mm:ss"
    - name: end
      type: string
      description: "yyyy-mm-dd hh:mm:ss"

# --- FCS - Lens Focus Position ---
- id: fcs_range_query
  label: Query Focus Position Range
  kind: query
  command: "(FCS?m)"
  params: []

- id: fcs_set
  label: Set Lens Focus Position
  kind: action
  command: "(FCS {position})"
  params:
    - name: position
      type: integer
      description: numeric value within range returned by FCS?m

# --- FMD - Film Mode Detect ---
- id: fmd_set
  label: Set Film Mode Detect
  kind: action
  command: "(FMD {value})"
  params:
    - name: value
      type: integer
      description: "0=off, 1=on (default)"

# --- FRD - Frame Delay ---
- id: frd_set
  label: Set Frame Delay
  kind: action
  command: "(FRD {delay})"
  params:
    - name: delay
      type: integer
      description: "1000 to 3000 (1/1000ths of frame); 2000 default"

- id: frd_stat_query
  label: Query Actual Frame Delay
  kind: query
  command: "(FRD+STAT?)"
  params: []

- id: frd_time_query
  label: Query Actual Frame Delay (ms)
  kind: query
  command: "(FRD+TIME?)"
  params: []

# --- FRZ - Image Freeze ---
- id: frz_set
  label: Freeze/Unfreeze Image
  kind: action
  command: "(FRZ {value})"
  params:
    - name: value
      type: integer
      description: "0=unfreeze(default),1=freeze"

# --- GAM - Gamma Power Value ---
- id: gam_set
  label: Set Gamma Power Exponent
  kind: action
  command: "(GAM {exponent})"
  params:
    - name: exponent
      type: integer
      description: "1000 to 3000; 2200 default"

- id: gam_maxl_set
  label: Set Max Screen Luminance
  kind: action
  command: "(GAM+MAXL {value})"
  params:
    - name: value
      type: integer
      description: "100 to 2000; 1000 default"

- id: gam_minl_set
  label: Set Min Screen Luminance
  kind: action
  command: "(GAM+MINL {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000; 10 default"

- id: gam_pqwl_set
  label: Set PQ White Level
  kind: action
  command: "(GAM+PQWL {value})"
  params:
    - name: value
      type: integer
      description: "50 to 2000; 1000 default"

- id: gam_slop_set
  label: Set Gamma Linear Section Slope
  kind: action
  command: "(GAM+SLOP {value})"
  params:
    - name: value
      type: integer
      description: "1 to 100; 1 default"

# --- GIO - General Purpose Input/Output ---
- id: gio_cnfg_query
  label: Query GPIO Pin Directions
  kind: query
  command: "(GIO+CNFG?)"
  params: []

- id: gio_cnfg_set
  label: Set GPIO Pin Directions
  kind: action
  command: "(GIO+CNFG \"{config}\")"
  params:
    - name: config
      type: string
      description: 7-char string of I/O/X

- id: gio_stat_query
  label: Query GPIO Input States
  kind: query
  command: "(GIO+STAT?)"
  params: []

- id: gio_stat_set
  label: Set GPIO Output States
  kind: action
  command: "(GIO+STAT \"{config}\")"
  params:
    - name: config
      type: string
      description: 7-char string of H/L/X

- id: gpio_trig_set
  label: Set GPIO Camera Trigger
  kind: action
  command: "(GPIO+TRIG {config})"
  params:
    - name: config
      type: string
      description: 7-char string of N/T/X

# --- HFR - High Frame Rate ---
- id: hfr_enbl_toggle
  label: Toggle High Frame Rate Mode
  kind: action
  command: "(HFR+ENBL)"
  params: []

# --- ITP - Test Pattern ---
- id: itp_set
  label: Set Test Pattern
  kind: action
  command: "(ITP {index})"
  params:
    - name: index
      type: integer
      description: "0=Off ... 23=Integrator Rod ... 100-109=user"

- id: itp_freq_set
  label: Set Test Pattern Frequency
  kind: action
  command: "(ITP+FREQ {value})"
  params:
    - name: value
      type: integer
      description: "2300 to 50000; 6000 default"

- id: itp_grdc_set
  label: Set Grid Color Mode
  kind: action
  command: "(ITP+GRDC {value})"
  params:
    - name: value
      type: integer
      description: "0=white-on-black, 1=multi-color (default)"

- id: itp_grdm_set
  label: Set Grid Motion
  kind: action
  command: "(ITP+GRDM {value})"
  params:
    - name: value
      type: integer
      description: "0=static(default), 1=moving"

- id: itp_grdp_set
  label: Set Grid Pitch
  kind: action
  command: "(ITP+GRDP {pitch})"
  params:
    - name: pitch
      type: integer
      description: "2 to 127; 32 default"

- id: itp_grey_set
  label: Set Flat Grey Level
  kind: action
  command: "(ITP+GREY {level})"
  params:
    - name: level
      type: integer
      description: "0 to 4095; 2048 default"

- id: itp_rmpl_set
  label: Set Ramp Start Grey Level
  kind: action
  command: "(ITP+RMPL {level})"
  params:
    - name: level
      type: integer
      description: "0 to 4095; 0 default"

- id: itp_rmpm_set
  label: Set Ramp Motion Speed
  kind: action
  command: "(ITP+RMPM {speed})"
  params:
    - name: speed
      type: integer
      description: "0 to 100; 0 default"

- id: itp_rmps_set
  label: Set Ramp Slope
  kind: action
  command: "(ITP+RMPS {slope})"
  params:
    - name: slope
      type: integer
      description: "-10 to 10; 1 default"

# --- KEN - Keypad Enable ---
- id: ken_frnt_set
  label: Enable/Disable Front IR Keypad
  kind: action
  command: "(KEN+FRNT {value})"
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable (default)"

- id: ken_rear_set
  label: Enable/Disable Rear IR Keypad
  kind: action
  command: "(KEN+REAR {value})"
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable (default)"

- id: ken_wire_query
  label: Query Wired Keypad State
  kind: query
  command: "(KEN+WIRE?)"
  params: []

- id: ken_wire_set
  label: Enable/Disable Wired Keypad
  kind: action
  command: "(KEN+WIRE {value})"
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable (default)"

# --- LAS - Light & Output Settings ---
- id: las_blup_set
  label: Set Blue Laser Drive Level
  kind: action
  command: "(LAS+BLUP {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000 (1000=100%); 635 default"

- id: las_cfcm_set
  label: Set Camera Friendly Color Mode
  kind: action
  command: "(LAS+CFCM {value})"
  params:
    - name: value
      type: integer
      description: "0=off(default),1=on"

- id: las_cfwx_set
  label: Set Camera Friendly White X
  kind: action
  command: "(LAS+CFWX {value})"
  params:
    - name: value
      type: integer
      description: "2500 to 4500; 2740 default"

- id: las_cfwy_set
  label: Set Camera Friendly White Y
  kind: action
  command: "(LAS+CFWY {value})"
  params:
    - name: value
      type: integer
      description: "2500 to 4500; 3250 default"

- id: las_csrx_query
  label: Query Color Sensor X Reading
  kind: query
  command: "(LAS+CSRX?)"
  params: []

- id: las_csry_query
  label: Query Color Sensor Y Reading
  kind: query
  command: "(LAS+CSRY?)"
  params: []

- id: las_csrz_query
  label: Query Color Sensor Z Reading
  kind: query
  command: "(LAS+CSRZ?)"
  params: []

- id: las_elbm_set
  label: Set Low Brightness Mode
  kind: action
  command: "(LAS+ELBM {value})"
  params:
    - name: value
      type: integer
      description: "0=disable(default),1=enable"

- id: las_grnp_set
  label: Set Green Laser Drive Level
  kind: action
  command: "(LAS+GRNP {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000; 615 default"

- id: las_maxa_set
  label: Set Max Ambient Temperature
  kind: action
  command: "(LAS+MAXA {value})"
  params:
    - name: value
      type: integer
      description: "0 to 50 Celsius; 35 default"

- id: las_maxh_set
  label: Set Expected Relative Humidity
  kind: action
  command: "(LAS+MAXH {value})"
  params:
    - name: value
      type: integer
      description: "0 to 100 percent; 80 default"

- id: las_mode_set
  label: Set LiteLOC Mode
  kind: action
  command: "(LAS+MODE {value})"
  params:
    - name: value
      type: integer
      description: "0/2 deprecated, 1=disable, 3=enable, 4=enable (Sapphire 4K40-RGBH default)"

- id: las_phop_set
  label: Set Phosphor Pump Drive Level
  kind: action
  command: "(LAS+PHOP {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000; 0 default (Sapphire 4K40-RGBH)"

- id: las_powr_set
  label: Set Laser Power
  kind: action
  command: "(LAS+POWR {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000 (1000=100%); 750 default"

- id: las_redp_set
  label: Set Red Laser Drive Level
  kind: action
  command: "(LAS+REDP {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000; 820 default"

- id: las_udec_set
  label: Set LiteLOC Environmental Control Mode
  kind: action
  command: "(LAS+UDEC {value})"
  params:
    - name: value
      type: integer
      description: "0=automatic(default),1=manual"

- id: las_whtx_set
  label: Set White X Color Target
  kind: action
  command: "(LAS+WHTX {value})"
  params:
    - name: value
      type: integer
      description: "2500 to 4500; 3127 default"

- id: las_whty_set
  label: Set White Y Color Target
  kind: action
  command: "(LAS+WHTY {value})"
  params:
    - name: value
      type: integer
      description: "2500 to 4500; 3290 default"

# --- LCB - Lens Motor Calibration ---
- id: lcb_calibrate
  label: Calibrate All Lens Motors
  kind: action
  command: "(LCB 1)"
  params: []

- id: lcb_home
  label: Home Lens Motors
  kind: action
  command: "(LCB+HOME)"
  params: []

- id: lcb_lock_set
  label: Lock/Unlock Lens Motors
  kind: action
  command: "(LCB+LOCK {value})"
  params:
    - name: value
      type: integer
      description: "0=unlock(default),1=lock"

- id: lcb_zomr_set
  label: Set Lens Motorized Flag
  kind: action
  command: "(LCB+ZOMR {value})"
  params:
    - name: value
      type: integer
      description: "0=no zoom(default),1=zoom motor"

- id: lcb_zoom_calibrate
  label: Calibrate Zoom Motor
  kind: action
  command: "(LCB+ZOOM 1)"
  params: []

# --- LHO - Lens Horizontal Position ---
- id: lho_range_query
  label: Query Horizontal Position Range
  kind: query
  command: "(LHO?m)"
  params: []

- id: lho_set
  label: Set Lens Horizontal Position
  kind: action
  command: "(LHO {position})"
  params:
    - name: position
      type: integer
      description: numeric value within range returned by LHO?m

# --- LMV - Lens Move ---
- id: lmv_absolute
  label: Move Lens to Absolute Position
  kind: action
  command: "(LMV {horizontal} {vertical} {zoom} {focus})"
  params:
    - name: horizontal
      type: integer
    - name: vertical
      type: integer
    - name: zoom
      type: integer
    - name: focus
      type: integer

- id: lmv_frun_set
  label: Run/Stop Focus Motor
  kind: action
  command: "(LMV+FRUN {value})"
  params:
    - name: value
      type: integer
      description: "-1=outward,0=stop,1=inward"

- id: lmv_fstp_set
  label: Step Focus Motor
  kind: action
  command: "(LMV+FSTP {steps})"
  params:
    - name: steps
      type: integer
      description: "negative=outward, positive=inward"

- id: lmv_hrun_set
  label: Run/Stop Horizontal Motor
  kind: action
  command: "(LMV+HRUN {value})"
  params:
    - name: value
      type: integer
      description: "-1=left,0=stop,1=right"

- id: lmv_hstp_set
  label: Step Horizontal Motor
  kind: action
  command: "(LMV+HSTP {steps})"
  params:
    - name: steps
      type: integer
      description: "negative=left, positive=right"

- id: lmv_vrun_set
  label: Run/Stop Vertical Motor
  kind: action
  command: "(LMV+VRUN {value})"
  params:
    - name: value
      type: integer
      description: "-1=down,0=stop,1=up"

- id: lmv_vstp_set
  label: Step Vertical Motor
  kind: action
  command: "(LMV+VSTP {steps})"
  params:
    - name: steps
      type: integer
      description: "negative=down, positive=up"

- id: lmv_zrun_set
  label: Run/Stop Zoom Motor
  kind: action
  command: "(LMV+ZRUN {value})"
  params:
    - name: value
      type: integer
      description: "-1=smaller,0=stop,1=larger"

- id: lmv_zstp_set
  label: Step Zoom Motor
  kind: action
  command: "(LMV+ZSTP {steps})"
  params:
    - name: steps
      type: integer
      description: "negative=smaller, positive=larger"

# --- LOC - Localization Settings ---
- id: loc_lang_query
  label: Query UI Language
  kind: query
  command: "(LOC+LANG?)"
  params: []

- id: loc_lang_set
  label: Set UI Language
  kind: action
  command: "(LOC+LANG {value})"
  params:
    - name: value
      type: integer
      description: "0=English(default),1=French,2=German,3=Spanish,4=Italian,5=Chinese,6=Japanese,7=Korean,8=Russian"

- id: loc_temp_query
  label: Query Temperature Units
  kind: query
  command: "(LOC+TEMP?)"
  params: []

- id: loc_temp_set
  label: Set Temperature Units
  kind: action
  command: "(LOC+TEMP {value})"
  params:
    - name: value
      type: integer
      description: "0=Celsius(default),1=Fahrenheit"

# --- LVO - Lens Vertical Position ---
- id: lvo_range_query
  label: Query Vertical Position Range
  kind: query
  command: "(LVO?m)"
  params: []

- id: lvo_set
  label: Set Lens Vertical Position
  kind: action
  command: "(LVO {position})"
  params:
    - name: position
      type: integer
      description: numeric value within range returned by LVO?m

# --- MSP - OSD Menu Position ---
- id: msp_query
  label: Query OSD Position
  kind: query
  command: "(MSP?)"
  params: []

- id: msp_set
  label: Set OSD Position
  kind: action
  command: "(MSP {value})"
  params:
    - name: value
      type: integer
      description: "0=top-left(default) ... 8=bottom-right"

# --- NET - Network Setup ---
- id: net_static_set
  label: Set Static IP/Netmask/Gateway
  kind: action
  command: "(NET \"{ip}\" \"{subnet}\" \"{gateway}\")"
  params:
    - name: ip
      type: string
    - name: subnet
      type: string
    - name: gateway
      type: string
      description: optional

- id: net_dgrp_set
  label: Set Device Group Name
  kind: action
  command: "(NET+DGRP \"{group}\")"
  params:
    - name: group
      type: string

- id: net_dhcp_set
  label: Enable DHCP
  kind: action
  command: "(NET+DHCP 1)"
  params: []

- id: net_eth0_query
  label: Query Projector IP Address
  kind: query
  command: "(NET+ETH0?)"
  params: []

- id: net_gate_query
  label: Query Gateway Address
  kind: query
  command: "(NET+GATE?)"
  params: []

- id: net_host_set
  label: Set Projector Host Name
  kind: action
  command: "(NET+HOST \"{name}\")"
  params:
    - name: name
      type: string

- id: net_mac0_query
  label: Query MAC Address
  kind: query
  command: "(NET+MAC0?)"
  params: []

- id: net_port_query
  label: Query Serial-over-TCP Port
  kind: query
  command: "(NET+PORT?)"
  params: []

- id: net_port_set
  label: Set Serial-over-TCP Port
  kind: action
  command: "(NET+PORT {port})"
  params:
    - name: port
      type: integer
      description: "1024 to 49151 (3003 reserved)"

- id: net_sub0_query
  label: Query Netmask
  kind: query
  command: "(NET+SUB0?)"
  params: []

# --- OSD - On Screen Display ---
- id: osd_query
  label: Query OSD State
  kind: query
  command: "(OSD?)"
  params: []

- id: osd_set
  label: Show/Hide OSD
  kind: action
  command: "(OSD {value})"
  params:
    - name: value
      type: integer
      description: "0=hide, 1=show (default)"

# --- OTR - Output Resolution ---
- id: otr_query
  label: Query Output Resolution
  kind: query
  command: "(OTR?)"
  params: []

- id: otr_hres_query
  label: Query Max Horizontal Resolution
  kind: query
  command: "(OTR+HRES?)"
  params: []

- id: otr_vres_query
  label: Query Max Vertical Resolution
  kind: query
  command: "(OTR+VRES?)"
  params: []

# --- PHL - Disable Phase Locking (Sapphire 4K40-RGBH) ---
- id: phl_query
  label: Query Phase Locking State
  kind: query
  command: "(PHL?)"
  params: []

- id: phl_set
  label: Enable/Disable Phase Locking
  kind: action
  command: "(PHL {value})"
  params:
    - name: value
      type: integer
      description: "0=enable locking(default),1=disable locking"

# --- PNG - Ping ---
- id: png_query
  label: Ping Projector
  kind: query
  command: "(PNG?)"
  params: []

# --- PRO - Profile ---
- id: pro_list_query
  label: Query Available Profiles
  kind: query
  command: "(PRO?L)"
  params: []

- id: pro_select
  label: Select Profile
  kind: action
  command: "(PRO {x})"
  params:
    - name: x
      type: integer
      description: "0=default, 1-20=custom"

- id: pro_rset
  label: Clear Profile
  kind: action
  command: "(PRO+RSET {x})"
  params:
    - name: x
      type: integer
      description: "1-20"

# --- PWR - Power ---
- id: pwr_query
  label: Query Power State
  kind: query
  command: "(PWR?)"
  params: []

- id: pwr_set
  label: Set Power On/Off
  kind: action
  command: "(PWR {value})"
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"

- id: pwr_elec_set
  label: Set Video Electronics Override in Standby
  kind: action
  command: "(PWR+ELEC {value})"
  params:
    - name: value
      type: integer
      description: "0=disable(default),1=enable"

# --- RAL - Remote Access Level ---
- id: ral_set
  label: Set Ethernet Port Access Level
  kind: action
  command: "(RAL {value})"
  params:
    - name: value
      type: integer
      description: "0=No Access,1=Login Required,2=Free Access (default)"

- id: ral_prta_set
  label: Set RS232 Port Access Level
  kind: action
  command: "(RAL+PRTA {value})"
  params:
    - name: value
      type: integer
      description: "0=No Access,1=Login Required,2=Free Access"

# --- RBK - RealBlack ---
- id: rbk_losl_set
  label: Set RealBlack Min Pixel Threshold
  kind: action
  command: "(RBK+LOSL {value})"
  params:
    - name: value
      type: integer
      description: "0 to 255; 0 default"

- id: rbk_slct_set
  label: Enable/Disable RealBlack
  kind: action
  command: "(RBK+SLCT {value})"
  params:
    - name: value
      type: integer
      description: "0=disable(default),1=enable"

- id: rbk_time_set
  label: Set RealBlack Dark Frame Time
  kind: action
  command: "(RBK+TIME {value})"
  params:
    - name: value
      type: integer
      description: "0 to 25 (tenths of seconds); 5 default"

# --- SDI - SDI Payload Override ---
- id: sdi_set
  label: Set SDI Payload Override
  kind: action
  command: "(SDI {value})"
  params:
    - name: value
      type: integer
      description: "0=Auto(default),1=Custom,2-7=3G-A presets"

- id: sdi_payl_set
  label: Set Custom SDI Payload
  kind: action
  command: "(SDI+PAYL \"{custom_string}\")"
  params:
    - name: custom_string
      type: string
      description: 4-byte hex string big-endian

# --- SHU - Shutter ---
- id: shu_query
  label: Query Shutter State
  kind: query
  command: "(SHU?)"
  params: []

- id: shu_set
  label: Open/Close Shutter
  kind: action
  command: "(SHU {value})"
  params:
    - name: value
      type: integer
      description: "0=open, 1=close (default)"

- id: shu_inhb_query
  label: Query Shutter Inhibit State
  kind: query
  command: "(SHU+INHB?)"
  params: []

- id: shu_inhb_set
  label: Set Shutter Inhibit
  kind: action
  command: "(SHU+INHB {value})"
  params:
    - name: value
      type: integer
      description: "0=enable opening on power on(default),1=disable"

# --- SIN - Select Input ---
- id: sin_list_query
  label: Query Available Inputs List
  kind: query
  command: "(SIN?L)"
  params: []

- id: sin_select
  label: Select Input
  kind: action
  command: "(SIN {input})"
  params:
    - name: input
      type: integer
      description: subject to range returned by SIN?L

- id: sin_port_set
  label: Set Input Port Configuration
  kind: action
  command: "(SIN+PORT {config})"
  params:
    - name: config
      type: integer
      description: "1=One-Port(default),2=Two-Port,4=Four-Port Quadrants,5/9/10=Mirage license"

# --- SNM - SNMP Configuration ---
- id: snm_lamp_set
  label: Enable/Disable Light Source Faults Trap
  kind: action
  command: "(SNM+LAMP {value})"
  params:
    - name: value
      type: integer
      description: "0=disable,1=enable(default)"

- id: snm_life_set
  label: Enable/Disable Light Source Life Trap
  kind: action
  command: "(SNM+LIFE {value})"
  params:
    - name: value
      type: integer
      description: "0=disable,1=enable(default)"

- id: snm_powr_set
  label: Enable/Disable Power State Trap
  kind: action
  command: "(SNM+POWR {value})"
  params:
    - name: value
      type: integer
      description: "0=disable,1=enable(default)"

- id: snm_read_set
  label: Set SNMP Read Community Name
  kind: action
  command: "(SNM+READ \"{name}\")"
  params:
    - name: name
      type: string
      description: max 32 chars; default "private"

- id: snm_sign_set
  label: Enable/Disable Video Signal Trap
  kind: action
  command: "(SNM+SIGN {value})"
  params:
    - name: value
      type: integer
      description: "0=disable,1=enable(default)"

- id: snm_stal_set
  label: Enable/Disable Fan/Cooling Faults Trap
  kind: action
  command: "(SNM+STAL {value})"
  params:
    - name: value
      type: integer
      description: "0=disable,1=enable(default)"

- id: snm_tip1_set
  label: Set SNMP Trap IP 1
  kind: action
  command: "(SNM+TIP1 \"{ip}\")"
  params:
    - name: ip
      type: string
      description: 0.0.0.0 disables (default)

- id: snm_tip2_set
  label: Set SNMP Trap IP 2
  kind: action
  command: "(SNM+TIP2 \"{ip}\")"
  params:
    - name: ip
      type: string

- id: snm_tip3_set
  label: Set SNMP Trap IP 3
  kind: action
  command: "(SNM+TIP3 \"{ip}\")"
  params:
    - name: ip
      type: string

- id: snm_thrm_set
  label: Enable/Disable Temperature Faults Trap
  kind: action
  command: "(SNM+THRM {value})"
  params:
    - name: value
      type: integer
      description: "0=disable,1=enable(default)"

# --- SOR - Screen Orientation ---
- id: sor_set
  label: Set Screen Orientation
  kind: action
  command: "(SOR {value})"
  params:
    - name: value
      type: integer
      description: "0=Front(default),1=Rear,2=Front inverted,3=Rear inverted"

# --- SPS - Splash Screen ---
- id: sps_colr_set
  label: Set Splash Screen Color
  kind: action
  command: "(SPS+COLR {value})"
  params:
    - name: value
      type: integer
      description: "1=Red,2=Green,3=Blue,7=Black(default)"

# --- SSP - Shifted Superposition ---
- id: ssp_slct_query
  label: Query Actuator State
  kind: query
  command: "(SSP+SLCT?)"
  params: []

- id: ssp_slct_set
  label: Enable/Disable Shifted Superposition
  kind: action
  command: "(SSP+SLCT {value})"
  params:
    - name: value
      type: integer
      description: "0=disable,1=enable(default)"

- id: ssp_tmul_set
  label: Set Actuator Multiplication Mode
  kind: action
  command: "(SSP+TMUL {val})"
  params:
    - name: val
      type: integer
      description: "0=disable,1=enable(default)"

# --- SST - Status ---
- id: sst_all_query
  label: Query All Status Items
  kind: query
  command: "(SST?)"
  params: []

- id: sst_group_query
  label: Query Status Group
  kind: query
  command: "(SST+{group}?)"
  params:
    - name: group
      type: string
      description: four-letter status group identifier

- id: sst_item_query
  label: Query Specific Status Item
  kind: query
  command: "(SST+{group}?{index})"
  params:
    - name: group
      type: string
    - name: index
      type: integer

# --- STH - Stealth Mode ---
- id: sth_mode_query
  label: Query Stealth Mode State
  kind: query
  command: "(STH+MODE?)"
  params: []

- id: sth_mode_set
  label: Enable/Disable Stealth Mode
  kind: action
  command: "(STH+MODE {value})"
  params:
    - name: value
      type: integer
      description: "0=disable(default),1=enable"

# --- SZP - Resize Presets ---
- id: szp_set
  label: Set Resize/Aspect Ratio
  kind: action
  command: "(SZP {value})"
  params:
    - name: value
      type: integer
      description: "0=auto(default),1=no resize,2=full size,3=full width,4=full height"

# --- TDD - 3D Sync Delay ---
- id: tdd_query
  label: Query 3D Sync Delay
  kind: query
  command: "(TDD?)"
  params: []

- id: tdd_set
  label: Set 3D Sync Delay
  kind: action
  command: "(TDD {value})"
  params:
    - name: value
      type: integer
      description: negative=before transition, 0=default, positive=after

# --- TDM - 3D Mode ---
- id: tdm_set
  label: Set 3D Mode
  kind: action
  command: "(TDM {mode})"
  params:
    - name: mode
      type: integer
      description: "0=off,1=auto(default),2=force 3D,3=SbS,5=Tb,6=Frame Packing"

# --- TDN - Invert 3D Input ---
- id: tdn_set
  label: Invert 3D Left/Right Eyes
  kind: action
  command: "(TDN {value})"
  params:
    - name: value
      type: integer
      description: "0=default order(default),1=inverted"

# --- TDO - 3D Sync Out ---
- id: tdo_query
  label: Query 3D Sync Out
  kind: query
  command: "(TDO?)"
  params: []

- id: tdo_set
  label: Set 3D Sync Out Mode
  kind: action
  command: "(TDO {value})"
  params:
    - name: value
      type: integer
      description: "0=emitter(default),1=downstream projector"

# --- TDT - 3D Test Pattern ---
- id: tdt_set
  label: Enable/Disable 3D Test Pattern
  kind: action
  command: "(TDT {value})"
  params:
    - name: value
      type: integer
      description: "0=disable,1=enable"

# --- THM - Video Thumbnails ---
- id: thm_set
  label: Enable/Disable Video Thumbnails
  kind: action
  command: "(THM {value})"
  params:
    - name: value
      type: integer
      description: "0=off,1=on(default)"

# --- TMC - Thermal Management Control ---
- id: tmc_mode_query
  label: Query Fan Control Profile
  kind: query
  command: "(TMC+MODE?)"
  params: []

- id: tmc_mode_set
  label: Set Fan Control Profile
  kind: action
  command: "(TMC+MODE {value})"
  params:
    - name: value
      type: integer
      description: "0=Standard(default),1=Quiet,2=Performance"

# --- TMD - Time and Date ---
- id: tmd_date_set
  label: Set Date
  kind: action
  command: "(TMD+DATE \"{date}\")"
  params:
    - name: date
      type: string
      description: "YYYY/MM/DD"

- id: tmd_time_query
  label: Query Time
  kind: query
  command: "(TMD+TIME?)"
  params: []

- id: tmd_time_set
  label: Set Time
  kind: action
  command: "(TMD+TIME \"{time}\")"
  params:
    - name: time
      type: string
      description: "hh:mm:ss"

# --- TWE - Disable Optimization ---
- id: twe_set
  label: Enable/Disable Warp Optimization
  kind: action
  command: "(TWE {value})"
  params:
    - name: value
      type: integer
      description: "0=enable optimization(default),1=disable"

# --- UID - User ID ---
- id: uid_login
  label: Login User
  kind: action
  command: "(UID \"{username}\" \"{password}\")"
  params:
    - name: username
      type: string
    - name: password
      type: string

- id: uid_query
  label: Query Current User
  kind: query
  command: "(UID?)"
  params: []

- id: uid_logout
  label: Logout Current User
  kind: action
  command: "(UID)"
  params: []

# --- WRP - Warp Selection ---
- id: wrp_kgan_query
  label: Query 2D Keystone Gain Compensation
  kind: query
  command: "(WRP+KGAN?)"
  params: []

- id: wrp_kgan_set
  label: Set 2D Keystone Gain Compensation
  kind: action
  command: "(WRP+KGAN {value})"
  params:
    - name: value
      type: integer
      description: "0=disable(default),1=enable"

- id: wrp_slct_list_query
  label: Query Available Warp Maps
  kind: query
  command: "(WRP+SLCT?L)"
  params: []

- id: wrp_slct_set
  label: Select Warp Map
  kind: action
  command: "(WRP+SLCT {value})"
  params:
    - name: value
      type: integer
      description: "0=off,1-4=warp map,11=2D keystone"

# --- ZOM - Lens Zoom Position ---
- id: zom_range_query
  label: Query Zoom Position Range
  kind: query
  command: "(ZOM?m)"
  params: []

- id: zom_set
  label: Set Lens Zoom Position
  kind: action
  command: "(ZOM {position})"
  params:
    - name: position
      type: integer
      description: numeric value within range returned by ZOM?m
```

## Feedbacks
```yaml
# Observable states returned by query/reply messages.
- id: power_state
  type: enum
  values: [standby, on, cooling_down, warming_up]
  query: "(PWR?)"
  reply_format: "(PWR!{code} \"{label}\")  # 000=Standby,001=On,010=Cooling down,011=Warming up"

- id: shutter_state
  type: enum
  values: [open, closed]
  query: "(SHU?)"
  reply_format: "(SHU!{value})  # 0=open, 1=closed"

- id: laser_power
  type: range
  query: "(LAS+POWR?)"
  reply_format: "(LAS+POWR!{value})"

- id: channel_list
  type: list
  query: "(CHA?L)"
  reply_format: "(CHA!L001 001 {index} \"{label}\")"

- id: status_item
  type: object
  query: "(SST+{group}?{index})"
  reply_format: "(SST+{group}!{index} {state} \"{value}\" \"{description}\")  # state 000=OK,001=Warning,002=Error"

# UNRESOLVED: additional feedback values (e.g. CUC readings, FRD actual delay) not exhaustively enumerated
```

## Variables
```yaml
# Most settable parameters are exposed as discrete set actions in the Actions
# section (LAS+POWR, GAM, DTL, FCS, LHO, LVO, ZOM, etc.). No additional
# continuous variables beyond those actions are documented.
# UNRESOLVED: none identified beyond Actions
```

## Events
```yaml
# Asynchronous FYI/ERR messages generated by the projector (controlled by EME).
# Format: (65535 00000 {FYI|ERR}{code} "{message}")
- id: datetime_changed
  description: "Generated when date or time changes."
  message_format: "(65535 00000 FYI00916 \"Setting Date to {date}\")"
  message_format_2: "(65535 00000 FYI00916 \"Setting Time to {time}\")"

- id: factory_defaults_applied
  description: "Generated when factory defaults performed; reboot required."
  message_format: "(65535 00000 FYI00919 \"All settings have been restored to their factory defaults. Reboot is required to take effect.\")"

- id: network_changed
  description: "Generated when network settings change (operator change, DHCP renewal, cable event)."
  message_format: "(65535 00000 FYI00915 \"Configured network: IP:{ip} Mask:{mask} Gateway:{gw}\")"

- id: status_change
  description: "Generated when a status item transitions between OK/Warning/Error states."
  message_format: "(65535 00000 FYI00000 \"(SST+{group}?{index}) {label} = {value}\")"
  message_format_2: "(65535 00000 ERR00000 \"System Warning: (SST+{group}?{index}) {label} = {value}\")"
  message_format_3: "(65535 00000 ERR00000 \"System Error: (SST+{group}?{index}) {label} = {value}\")"
```

## Macros
```yaml
# Explicit multi-step sequences documented in source.
- id: power_on_confirm
  description: "Power on and confirm steady powered-on state (can take 20+ seconds)."
  steps:
    - "(PWR 1)"
    - "poll (PWR?) until reply (PWR!001 \"On\") arrives (passes through (PWR!011 \"Warming Up\"))"

- id: power_off_confirm
  description: "Power off; cool-down typically ~3 minutes. Projector may be powered on again before cool-down completes."
  steps:
    - "(PWR 0)"
    - "poll (PWR?) until reply (PWR!000 \"Standby Mode\") arrives (passes through (PWR!010 \"Cooling Down\"))"
```

## Safety
```yaml
confirmation_required_for:
  - "(DEF 111)"  # factory reset; guarded by mandatory 111 argument per source
  - "(PWR 1)"    # power-on transitions through ~20s warm-up; commands may be delayed
  - "(PWR 0)"    # cool-down phase ~3 min (model dependent)
interlocks:
  - "Shutter reports closed in Standby; shutter only operable when projector is On."
  - "Some commands operational only when projector powered up / video electronics on."
  - "BDR+PRTA set requires service level access."
  - "CCA native-primary controls (RDPX/RDPY/GNPX/GNPY/BLPX/BLPY/WHPX/WHPY, RSET, SAVE) require service user."
# UNRESOLVED: full interlock/error-recovery sequences (e.g. thermal shutdown behavior)
# not exhaustively described in this control-protocol source.
```

## Notes
- **Message format:** All commands are ASCII, wrapped in parentheses `( ... )`. Three-letter function code, optional `+` four-letter subcode, optional data. Request = `?` after code, reply = `!` after code. Data is ASCII-decimal, fixed-width in replies (min 3 chars, zero-padded).
- **Acknowledgment prefixes:** `$` (simple ack, returns `$` on success / `^` NAK on failure), `#` (full ack, echoes message), `&` (checksum — low byte of ASCII sum of chars between `(` and checksum space, range 0-255, placed before `)` with leading space).
- **Flow control:** Xon/Xoff software flow control (11h Xon / 13h Xoff) in both directions. Projector sends no more than 3 chars after receiving Xoff; controller may send up to 10 extra bytes after Xoff.
- **Addressing for daisy-chained RS232:** address prefix supported via ADR command; `65535` = broadcast.
- **Error replies:** `(CODE) - (65535 00000 ERR{code} "{message}")`. Documented error codes 3-118 (e.g. 5=Too few parameters, 8=Checksum error, 118=System busy).
- **Sapphire 4K40-RGBH specifics:** LAS+MODE default 4; LAS+PHOP (phosphor pump) applies; PHL (phase locking disable) applies.
<!-- UNRESOLVED: serial data_bits/parity/stop_bits not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: connector pinout / cable wiring references User Guide (P/N 020-103315-XX), not in source. -->
````

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-103316-13-Christie-LIT-TECH-REF-TruLifePlus-API.pdf
  - "https://www.manualslib.com/manual/3714733/Christie-Sapphire-4k40-Rgbh.html?page=75"
retrieved_at: 2026-08-11T05:36:19.357Z
last_checked_at: 2026-08-19T09:06:22.133Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:06:22.133Z
matched_actions: 232
action_count: 232
confidence: medium
summary: "Spec enumerates 232 action units that all map verbatim to documented TruLife+ mnemonics; transport (port 3002, baud 115200) is stated in source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial data_bits/parity/stop_bits not stated in source."
- "firmware version compatibility not stated in source."
- "exact default voltage/power specs not covered (out of scope for control doc)."
- "not stated in source"
- "additional feedback values (e.g. CUC readings, FRD actual delay) not exhaustively enumerated"
- "none identified beyond Actions"
- "full interlock/error-recovery sequences (e.g. thermal shutdown behavior)"
- "firmware version compatibility not stated."
- "connector pinout / cable wiring references User Guide (P/N 020-103315-XX), not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
