---
spec_id: admin/christie-crimson-wu25
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie Crimson WU25 Control Spec"
manufacturer: Christie
model_family: "Crimson WU25"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "Crimson WU25"
    - "Crimson HD25"
    - "Crimson HD31"
    - "Crimson WU31"
    - "Mirage HD25"
    - "Mirage WU25"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sslcdbucket.s3.ap-northeast-2.amazonaws.com
  - christiedigital.com
  - projectorcentral.com
source_urls:
  - "https://sslcdbucket.s3.ap-northeast-2.amazonaws.com/product/Crimson%20WU31/Crimson%20Series_manual(tech)_eng.pdf"
  - https://www.christiedigital.com/globalassets/resources/public/020-102649-07-Christie-LIT-MAN-USR-Crimson.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-102271-04-christie-lit-tech-ref-gs-700-850-api.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-102647-07-christie-lit-guid-set-crimson.pdf
  - https://www.projectorcentral.com/pdf/projector_manual_11145.pdf
retrieved_at: 2026-08-10T21:29:47.760Z
last_checked_at: 2026-08-19T09:01:37.698Z
generated_at: 2026-08-19T09:01:37.698Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS232 cable pinout not in source; default credentials beyond example not enumerated"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "no separate settable variable outside of action commands identified in source"
  - "source documents no explicit multi-step macros"
  - "no power-on sequencing procedure documented in source"
  - "RS232 connector pinout not in source — refer to Crimson and Mirage User Guide (P/N 020-102649-XX)"
  - "factory default baud rate for first connection not explicitly stated; 115200 is documented default value but also \"default baud rate on each port\" — needs device verification"
  - "serial data_bits/parity/stop_bits not stated in source"
  - "default service password is example only (\"service\"/\"service\") — not confirmed as factory default"
  - "full list of status groups/items not enumerated — refer to Crimson and Mirage Status System Guide (P/N 020-102661-XX)"
verification:
  verdict: verified
  checked_at: 2026-08-19T09:01:37.698Z
  matched_actions: 191
  action_count: 191
  confidence: medium
  summary: "All 191 spec commands map to literal tokens in the source; transport port 3002 and 115200 baud are confirmed; no fabricated, missing, or drifted entries. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Christie Crimson WU25 Control Spec

## Summary
Christie Crimson (HD25/WU25/HD31/WU31) and Mirage (HD25/WU25) series 3DLP laser projectors. Remotely controllable via the RS232 IN port or Ethernet using Christie's text-message serial protocol. This spec covers the full command catalogue from the Crimson and Crimson Mirage Serial Commands reference: power, input routing, lens motor, color/gamma, test patterns, networking, status, SNMP, 3D (Mirage only), and more.

<!-- UNRESOLVED: RS232 cable pinout not in source; default credentials beyond example not enumerated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 3002  # Christie serial protocol over Ethernet, stated in source
serial:
  baud_rate: 115200  # default for RS232-IN per source; configurable 2400-115200
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: none  # inferred: source describes Xon/Xoff software flow control
auth:
  type: optional  # source describes access levels and UID login; default Free Access
```

## Traits
```yaml
- powerable  # inferred from PWR command examples
- queryable  # inferred from extensive ?-query command examples
- routable  # inferred from SIN input selection commands
- levelable  # inferred from continuous-range set commands (LPP, DTL, GAM, FCS, ZOM, etc.)
```

## Actions
```yaml
# Message format: commands wrapped in parens, e.g. (PWR 1). Replies use ! suffix.
# Optional prefix chars after opening bracket: $ (simple ack), # (full ack), & (checksum).

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
    - { name: value, type: integer, description: "0 to 999; 65535 = reserved broadcast address" }

- id: alc_set
  label: Set Ambient Light Correction
  kind: action
  command: "(ALC {value})"
  params:
    - { name: value, type: integer, description: "0 = none (default); 1-100 darker; -1 to -100 brighter" }

- id: apw_set
  label: Set Auto Power On
  kind: action
  command: "(APW {value})"
  params:
    - { name: value, type: integer, description: "0 = disable; 1 = enable" }

- id: asu
  label: Auto Setup
  kind: action
  command: "(ASU)"
  params: []

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
    - { name: value, type: integer, description: "1=2400, 2=9600, 3=19200, 4=38400, 5=57600, 6=115200 (default). Service-level access required." }

- id: bgc_set
  label: Set Gamma Function
  kind: action
  command: "(BGC {value})"
  params:
    - { name: value, type: integer, description: "0 = sRGB (default); 2 = Power Law; 3 = M-Series; 4 = ITU-R BT.1886" }

- id: bst_list
  label: List Test Suites
  kind: query
  command: "(BST?L)"
  params: []

- id: bst_run
  label: Run Test Suite
  kind: action
  command: "(BST {suite})"
  params:
    - { name: suite, type: integer, description: "0 = All Tests; 1 = Image Processor Board; 2 = Formatter; 3 = Active Backplane; 4 = Video Path" }

- id: bst_test_list
  label: List Individual Tests
  kind: query
  command: "(BST+TEST?L)"
  params: []

- id: bst_test_run
  label: Run Individual Test
  kind: action
  command: "(BST+TEST {index})"
  params:
    - { name: index, type: integer, description: "0-15 enumerated video-path/FPGA/memory tests" }

- id: cca_copy
  label: Copy Color Table
  kind: action
  command: "(CCA+COPY {value})"
  params:
    - { name: value, type: integer, description: "0 = Max Drives; 1 = Color Temperature; 2 = HD Video (ITU-R BT.709)" }

- id: cca_ctmp
  label: Set Color Temperature
  kind: action
  command: "(CCA+CTMP {value})"
  params:
    - { name: value, type: integer, description: "3200 to 9300; 6500 default" }

- id: cca_slct
  label: Select Color Table
  kind: action
  command: "(CCA+SLCT {value})"
  params:
    - { name: value, type: integer, description: "1 = Color Temperature; 2 = HD Video; 3 = Custom" }

- id: cca_rdpx
  label: Custom Color Red X Coordinate
  kind: action
  command: "(CCA+RDCX {value})"
  params:
    - { name: value, type: integer, description: "x coordinate for red, scaled by 10000" }

- id: cca_rdcy
  label: Custom Color Red Y Coordinate
  kind: action
  command: "(CCA+RDCY {value})"
  params:
    - { name: value, type: integer, description: "y coordinate for red, scaled by 10000" }

- id: cca_gncx
  label: Custom Color Green X Coordinate
  kind: action
  command: "(CCA+GNCX {value})"
  params:
    - { name: value, type: integer, description: "x coordinate for green, scaled by 10000" }

- id: cca_gncy
  label: Custom Color Green Y Coordinate
  kind: action
  command: "(CCA+GNCY {value})"
  params:
    - { name: value, type: integer, description: "y coordinate for green, scaled by 10000" }

- id: cca_blcx
  label: Custom Color Blue X Coordinate
  kind: action
  command: "(CCA+BLCX {value})"
  params:
    - { name: value, type: integer, description: "x coordinate for blue, scaled by 10000" }

- id: cca_blcy
  label: Custom Color Blue Y Coordinate
  kind: action
  command: "(CCA+BLCY {value})"
  params:
    - { name: value, type: integer, description: "y coordinate for blue, scaled by 10000" }

- id: cca_whcx
  label: Custom Color White X Coordinate
  kind: action
  command: "(CCA+WHCX {value})"
  params:
    - { name: value, type: integer, description: "x coordinate for white, scaled by 10000" }

- id: cca_whcy
  label: Custom Color White Y Coordinate
  kind: action
  command: "(CCA+WHCY {value})"
  params:
    - { name: value, type: integer, description: "y coordinate for white, scaled by 10000" }

- id: cca_gofr
  label: Custom Color Green-of-Red Saturation
  kind: action
  command: "(CCA+GOFR {value})"
  params:
    - { name: value, type: integer, description: "-1000 to 1000; 1000 = 100%" }

- id: cca_bofr
  label: Custom Color Blue-of-Red Saturation
  kind: action
  command: "(CCA+BOFR {value})"
  params:
    - { name: value, type: integer, description: "-1000 to 1000; 1000 = 100%" }

- id: cca_rofg
  label: Custom Color Red-of-Green Saturation
  kind: action
  command: "(CCA+ROFG {value})"
  params:
    - { name: value, type: integer, description: "-1000 to 1000; 1000 = 100%" }

- id: cca_bofg
  label: Custom Color Blue-of-Green Saturation
  kind: action
  command: "(CCA+BOFG {value})"
  params:
    - { name: value, type: integer, description: "-1000 to 1000; 1000 = 100%" }

- id: cca_rofb
  label: Custom Color Red-of-Blue Saturation
  kind: action
  command: "(CCA+ROFB {value})"
  params:
    - { name: value, type: integer, description: "-1000 to 1000; 1000 = 100%" }

- id: cca_gofb
  label: Custom Color Green-of-Blue Saturation
  kind: action
  command: "(CCA+GOFB {value})"
  params:
    - { name: value, type: integer, description: "-1000 to 1000; 1000 = 100%" }

- id: cca_rofr
  label: Native Red-of-Red Saturation
  kind: action
  command: "(CCA+ROFR {value})"
  params:
    - { name: value, type: integer, description: "0 to 1000; 1000 = 100%" }

- id: cca_gofg
  label: Native Green-of-Green Saturation
  kind: action
  command: "(CCA+GOFG {value})"
  params:
    - { name: value, type: integer, description: "0 to 1000; 1000 = 100%" }

- id: cca_bofb_native
  label: Native Blue-of-Blue Saturation
  kind: action
  command: "(CCA+BOFB {value})"
  params:
    - { name: value, type: integer, description: "0 to 1000; 1000 = 100%" }

- id: cca_rofw
  label: Custom Color Red-of-White Saturation
  kind: action
  command: "(CCA+ROFW {value})"
  params:
    - { name: value, type: integer, description: "0 to 1000; 1000 = 100%" }

- id: cca_gofw
  label: Custom Color Green-of-White Saturation
  kind: action
  command: "(CCA+GOFW {value})"
  params:
    - { name: value, type: integer, description: "0 to 1000; 1000 = 100%" }

- id: cca_bofw
  label: Custom Color Blue-of-White Saturation
  kind: action
  command: "(CCA+BOFW {value})"
  params:
    - { name: value, type: integer, description: "0 to 1000; 1000 = 100%" }

- id: cca_rdpx_native
  label: Native Red Primary X Coordinate
  kind: action
  command: "(CCA+RDPX {value})"
  params:
    - { name: value, type: integer, description: "x coordinate for red native primary, scaled by 10000. Service user only." }

- id: cca_rdpy_native
  label: Native Red Primary Y Coordinate
  kind: action
  command: "(CCA+RDPY {value})"
  params:
    - { name: value, type: integer, description: "y coordinate for red native primary, scaled by 10000. Service user only." }

- id: cca_gnpx_native
  label: Native Green Primary X Coordinate
  kind: action
  command: "(CCA+GNPX {value})"
  params:
    - { name: value, type: integer, description: "x coordinate for green native primary, scaled by 10000. Service user only." }

- id: cca_gnpy_native
  label: Native Green Primary Y Coordinate
  kind: action
  command: "(CCA+GNPY {value})"
  params:
    - { name: value, type: integer, description: "y coordinate for green native primary, scaled by 10000. Service user only." }

- id: cca_blpx_native
  label: Native Blue Primary X Coordinate
  kind: action
  command: "(CCA+BLPX {value})"
  params:
    - { name: value, type: integer, description: "x coordinate for blue native primary, scaled by 10000. Service user only." }

- id: cca_blpy_native
  label: Native Blue Primary Y Coordinate
  kind: action
  command: "(CCA+BLPY {value})"
  params:
    - { name: value, type: integer, description: "y coordinate for blue native primary, scaled by 10000. Service user only." }

- id: cca_whpx_native
  label: Native White Primary X Coordinate
  kind: action
  command: "(CCA+WHPX {value})"
  params:
    - { name: value, type: integer, description: "x coordinate for white native primary, scaled by 10000. Service user only." }

- id: cca_whpy_native
  label: Native White Primary Y Coordinate
  kind: action
  command: "(CCA+WHPY {value})"
  params:
    - { name: value, type: integer, description: "y coordinate for white native primary, scaled by 10000. Service user only." }

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

- id: cle
  label: Set Color Enable
  kind: action
  command: "(CLE {color})"
  params:
    - { name: color, type: integer, description: "0=White, 1=Red, 2=Green, 3=Blue, 4=Yellow, 5=Cyan, 6=Magenta" }

- id: csp
  label: Set Color Space
  kind: action
  command: "(CSP {color_space})"
  params:
    - { name: color_space, type: integer, description: "0=Auto (default), 1=RGB full, 2=YCbCr HDTV, 3=RGB limited, 4=YCbCr expanded" }

- id: ddd
  label: Disable Dual-Link DVI Inputs
  kind: action
  command: "(DDD {value})"
  params:
    - { name: value, type: integer, description: "0 = enable dual-link (default); 1 = disable dual-link" }

- id: def
  label: Factory Defaults
  kind: action
  command: "(DEF 111)"
  params: []

- id: dmx_chan
  label: Set DMX/Art-Net Base Channel
  kind: action
  command: "(DMX+CHAN {value})"
  params:
    - { name: value, type: integer, description: "1 to 488; default 1" }

- id: dmx_enbl
  label: Enable DMX/Art-Net Interface
  kind: action
  command: "(DMX+ENBL {value})"
  params:
    - { name: value, type: integer, description: "0 = disable (default); 1 = enable" }

- id: dmx_nets
  label: Set Art-Net Network
  kind: action
  command: "(DMX+NETS {value})"
  params:
    - { name: value, type: integer, description: "0 to 127; default 0" }

- id: dmx_subn
  label: Set Art-Net Subnet
  kind: action
  command: "(DMX+SUBN {value})"
  params:
    - { name: value, type: integer, description: "0 to 15; default 0" }

- id: dmx_unvs
  label: Set Art-Net Universe
  kind: action
  command: "(DMX+UNVS {value})"
  params:
    - { name: value, type: integer, description: "0 to 15; default 0" }

- id: dtl
  label: Set Sharpness
  kind: action
  command: "(DTL {value})"
  params:
    - { name: value, type: integer, description: "0-49 soften, 50 default, 51-100 sharpen" }

- id: ebb_slct_list
  label: List Black Level Blends
  kind: query
  command: "(EBB+SLCT?L)"
  params: []

- id: ebb_slct
  label: Select Black Level Blend
  kind: action
  command: "(EBB+SLCT {value})"
  params:
    - { name: value, type: integer, description: "0 = off (default); 1 to 4 = select blend" }

- id: ebl_slct_list
  label: List Edge Blends
  kind: query
  command: "(EBL+SLCT?L)"
  params: []

- id: ebl_slct
  label: Select Edge Blend
  kind: action
  command: "(EBL+SLCT {value})"
  params:
    - { name: value, type: integer, description: "0 = off; 1 to 4 = select blend" }

- id: edo
  label: Set EDID Override Frame Rate
  kind: action
  command: "(EDO {rate})"
  params:
    - { name: rate, type: integer, description: "24, 25, 30, 48, 50, 60 (default)" }

- id: eme
  label: Enable Asynchronous Serial Messages
  kind: action
  command: "(EME {value})"
  params:
    - { name: value, type: integer, description: "0 = disable; 1 = enable (default)" }

- id: etp
  label: Engine Test Pattern
  kind: action
  command: "(ETP {index})"
  params:
    - name: index
      type: integer
      description: "0=Flat Black, 1=Green, 2=Red, 3=Blue, 4=White, 5-7 Checkers, 9-22 Convergence, 29/45 Multi-color, 235-237 Moving Circles, 238 Color Bars, 239-242 Edge Blend Grids, 243 17 Point, 244 Magenta, 245 Cyan, 246 Yellow, 247 Diagonal Lines, 248-249 Ramps, 255=Off"

- id: evt_all
  label: Get All Events
  kind: query
  command: "(EVT)"
  params: []

- id: evt_max
  label: Get N Most Recent Events
  kind: query
  command: "(EVT {max})"
  params:
    - { name: max, type: integer, description: "Maximum number of events to return" }

- id: evt_from
  label: Get Events Since Timestamp
  kind: query
  command: "(EVT \"{start_timestamp}\")"
  params:
    - { name: start_timestamp, type: string, description: "yyyy-mm-dd hh:mm:ss" }

- id: evt_range
  label: Get Events Between Timestamps
  kind: query
  command: "(EVT \"{start_timestamp}\" \"{end_timestamp}\")"
  params:
    - { name: start_timestamp, type: string, description: "yyyy-mm-dd hh:mm:ss" }
    - { name: end_timestamp, type: string, description: "yyyy-mm-dd hh:mm:ss" }

- id: fcs_minmax
  label: Query Lens Focus Range
  kind: query
  command: "(FCS?m)"
  params: []

- id: fcs
  label: Set Lens Focus Position
  kind: action
  command: "(FCS {position})"
  params:
    - { name: position, type: integer, description: "Subject to range from FCS?m" }

- id: fib_slta
  label: Christie Link Video Slot A
  kind: action
  command: "(FIB+SLTA {value})"
  params:
    - { name: value, type: integer, description: "0 = disable (default); 1 = enable" }

- id: fib_sltb
  label: Christie Link Video Slot B
  kind: action
  command: "(FIB+SLTB {value})"
  params:
    - { name: value, type: integer, description: "0 = disable (default); 1 = enable" }

- id: fmd
  label: Film Mode Detect
  kind: action
  command: "(FMD {value})"
  params:
    - { name: value, type: integer, description: "0 = off; 1 = on (default)" }

- id: frd
  label: Set Frame Delay
  kind: action
  command: "(FRD {delay})"
  params:
    - { name: delay, type: integer, description: "1000 to 3000; 2000 default (2 frames)" }

- id: frd_stat_query
  label: Query Actual Frame Delay
  kind: query
  command: "(FRD+STAT?)"
  params: []

- id: frd_time_query
  label: Query Frame Delay Time (ms)
  kind: query
  command: "(FRD+TIME?)"
  params: []

- id: frz
  label: Image Freeze
  kind: action
  command: "(FRZ {value})"
  params:
    - { name: value, type: integer, description: "0 = unfreeze (default); 1 = freeze" }

- id: ftb_time
  label: Set Fade to Black Time
  kind: action
  command: "(FTB+TIME {value})"
  params:
    - { name: value, type: integer, description: "0 to 250 in 10ms increments; 0 = no fade" }

- id: gam
  label: Set Gamma Power Value
  kind: action
  command: "(GAM {exponent})"
  params:
    - { name: exponent, type: integer, description: "1000 to 3000; 2200 default" }

- id: gam_maxl
  label: Set Gamma Max Luminance
  kind: action
  command: "(GAM+MAXL {value})"
  params:
    - { name: value, type: integer, description: "100 to 2000; 1000 default" }

- id: gam_minl
  label: Set Gamma Min Luminance
  kind: action
  command: "(GAM+MINL {value})"
  params:
    - { name: value, type: integer, description: "0 to 1000; 10 default" }

- id: gam_slop
  label: Set Gamma Slope
  kind: action
  command: "(GAM+SLOP {value})"
  params:
    - { name: value, type: integer, description: "1 to 100; 1 default" }

- id: gio_cnfg_query
  label: Query GPIO Configuration
  kind: query
  command: "(GIO+CNFG?)"
  params: []

- id: gio_stat_query
  label: Query GPIO Input Status
  kind: query
  command: "(GIO+STAT?)"
  params: []

- id: gio_stat_set
  label: Set GPIO Outputs
  kind: action
  command: "(GIO+STAT \"{state}\")"
  params:
    - { name: state, type: string, description: "Per-pin string of H/L/X (High/Low/No-change)" }

- id: itp
  label: Test Pattern
  kind: action
  command: "(ITP {index})"
  params:
    - name: index
      type: integer
      description: "0=Off, 1=Grid, 2=Grey Scale 16, 3=Flat White, 4=Flat Grey, 5=Flat Black, 6=Checker, 7=17 Point, 8=Edge Blend, 9=Color Bars, 10=Multi Color, 11=RGBW Ramp, 12=Horiz Ramp, 13=Vert Ramp, 14=Diag Ramp, 15=Square Grid, 16=Diag Grid, 17=Max Activity, 18=Prism/Convergence, 19=FLIR, 20=Focus Fidelity, 21=Boresight, 22=Convergence, 23=Integrator Rod, 24=Flare"

- id: itp_freq
  label: Set Test Pattern Frequency
  kind: action
  command: "(ITP+FREQ {value})"
  params:
    - { name: value, type: integer, description: "24 to 500; 60 default" }

- id: itp_grdc
  label: Set Grid Color Mode
  kind: action
  command: "(ITP+GRDC {value})"
  params:
    - { name: value, type: integer, description: "0 = white-on-black; 1 = multi-color (default)" }

- id: itp_grdm
  label: Set Grid Motion Mode
  kind: action
  command: "(ITP+GRDM {value})"
  params:
    - { name: value, type: integer, description: "0 = static (default); 1 = moving" }

- id: itp_grdp
  label: Set Grid Pitch
  kind: action
  command: "(ITP+GRDP {pitch})"
  params:
    - { name: pitch, type: integer, description: "2 to 127; 32 default" }

- id: itp_grey
  label: Set Flat Grey Level
  kind: action
  command: "(ITP+GREY {level})"
  params:
    - { name: level, type: integer, description: "0 to 4095; 2048 default" }

- id: itp_rmpl
  label: Set Ramp Starting Level
  kind: action
  command: "(ITP+RMPL {level})"
  params:
    - { name: level, type: integer, description: "0 to 4095; 0 default" }

- id: itp_rmpm
  label: Set Ramp Motion Speed
  kind: action
  command: "(ITP+RMPM {speed})"
  params:
    - { name: speed, type: integer, description: "0 to 100; 0 default" }

- id: itp_rmps
  label: Set Ramp Slope
  kind: action
  command: "(ITP+RMPS {slope})"
  params:
    - { name: slope, type: integer, description: "1 to 5; 1 default" }

- id: ken_frnt
  label: Set Front IR Keypad
  kind: action
  command: "(KEN+FRNT {value})"
  params:
    - { name: value, type: integer, description: "0 = disable; 1 = enable (default)" }

- id: ken_hdbt
  label: Set IR over HDBaseT
  kind: action
  command: "(KEN+HDBT {value})"
  params:
    - { name: value, type: integer, description: "0 = disable (default); 1 = enable" }

- id: ken_rear
  label: Set Rear IR Keypad
  kind: action
  command: "(KEN+REAR {value})"
  params:
    - { name: value, type: integer, description: "0 = disable; 1 = enable (default)" }

- id: ken_wire_query
  label: Query Wired Keypad State
  kind: query
  command: "(KEN+WIRE?)"
  params: []

- id: ken_wire
  label: Set Wired Keypad
  kind: action
  command: "(KEN+WIRE {value})"
  params:
    - { name: value, type: integer, description: "0 = disable; 1 = enable (default)" }

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

- id: lcb_lock
  label: Lock Lens Motors
  kind: action
  command: "(LCB+LOCK {value})"
  params:
    - { name: value, type: integer, description: "0 = unlock (default); 1 = lock" }

- id: lcb_zomr
  label: Set Lens Motorized Zoom Flag
  kind: action
  command: "(LCB+ZOMR {value})"
  params:
    - { name: value, type: integer, description: "0 = no zoom (default); 1 = has zoom motor" }

- id: lcb_zoom
  label: Calibrate Zoom Motor
  kind: action
  command: "(LCB+ZOOM 1)"
  params: []

- id: lho_minmax
  label: Query Lens Horizontal Range
  kind: query
  command: "(LHO?m)"
  params: []

- id: lho
  label: Set Lens Horizontal Position
  kind: action
  command: "(LHO {position})"
  params:
    - { name: position, type: integer, description: "Subject to range from LHO?m" }

- id: lmv
  label: Move Lens Absolute
  kind: action
  command: "(LMV {horizontal} {vertical} {zoom} {focus})"
  params:
    - { name: horizontal, type: integer, description: "H axis value" }
    - { name: vertical, type: integer, description: "V axis value" }
    - { name: zoom, type: integer, description: "Z axis value" }
    - { name: focus, type: integer, description: "F axis value" }

- id: lmv_hstp
  label: Move Lens Horizontal Relative
  kind: action
  command: "(LMV+HSTP {steps})"
  params:
    - { name: steps, type: integer, description: "Negative=left; positive=right" }

- id: lmv_vstp
  label: Move Lens Vertical Relative
  kind: action
  command: "(LMV+VSTP {steps})"
  params:
    - { name: steps, type: integer, description: "Negative=down; positive=up" }

- id: lmv_fstp
  label: Move Lens Focus Relative
  kind: action
  command: "(LMV+FSTP {steps})"
  params:
    - { name: steps, type: integer, description: "Negative=outward; positive=inward" }

- id: lmv_zstp
  label: Move Lens Zoom Relative
  kind: action
  command: "(LMV+ZSTP {steps})"
  params:
    - { name: steps, type: integer, description: "Negative=smaller; positive=larger" }

- id: lmv_hrun
  label: Run Lens Horizontal Motor
  kind: action
  command: "(LMV+HRUN {value})"
  params:
    - { name: value, type: integer, description: "-1 = left; 0 = stop; 1 = right" }

- id: lmv_vrun
  label: Run Lens Vertical Motor
  kind: action
  command: "(LMV+VRUN {value})"
  params:
    - { name: value, type: integer, description: "-1 = down; 0 = stop; 1 = up" }

- id: lmv_frun
  label: Run Lens Focus Motor
  kind: action
  command: "(LMV+FRUN {value})"
  params:
    - { name: value, type: integer, description: "-1 = outward; 0 = stop; 1 = inward" }

- id: lmv_zrun
  label: Run Lens Zoom Motor
  kind: action
  command: "(LMV+ZRUN {value})"
  params:
    - { name: value, type: integer, description: "-1 = smaller; 0 = stop; 1 = larger" }

- id: loc_lang_query
  label: Query System Language
  kind: query
  command: "(LOC+LANG?)"
  params: []

- id: loc_lang
  label: Set System Language
  kind: action
  command: "(LOC+LANG {value})"
  params:
    - name: value
      type: integer
      description: "0=English (default), 1=French, 2=German, 3=Spanish, 4=Italian, 5=Chinese, 6=Japanese, 7=Korean, 8=Russian"

- id: loc_temp_query
  label: Query Temperature Units
  kind: query
  command: "(LOC+TEMP?)"
  params: []

- id: loc_temp
  label: Set Temperature Units
  kind: action
  command: "(LOC+TEMP {value})"
  params:
    - { name: value, type: integer, description: "0 = Celsius; 1 = Fahrenheit" }

- id: loe
  label: Video Loop Out Enable
  kind: action
  command: "(LOE {value})"
  params:
    - { name: value, type: integer, description: "0 = disable; 1 = enable (default)" }

- id: lpp
  label: Set Light Output Power
  kind: action
  command: "(LPP {percentage})"
  params:
    - { name: percentage, type: integer, description: "500 to 1000; 1000 default" }

- id: lpp_blua
  label: Subtract Blue Light Output
  kind: action
  command: "(LPP+BLUA {percentage})"
  params:
    - { name: percentage, type: integer, description: "-300 to 0; 0 default" }

- id: lpp_grna
  label: Subtract Green Light Output
  kind: action
  command: "(LPP+GRNA {percentage})"
  params:
    - { name: percentage, type: integer, description: "-300 to 0; 0 default" }

- id: lpp_reda
  label: Subtract Red Light Output
  kind: action
  command: "(LPP+REDA {percentage})"
  params:
    - { name: percentage, type: integer, description: "-300 to 0; 0 default" }

- id: lpp_rset
  label: Reset Light Output Settings
  kind: action
  command: "(LPP+RSET)"
  params: []

- id: lvo_minmax
  label: Query Lens Vertical Range
  kind: query
  command: "(LVO?m)"
  params: []

- id: lvo
  label: Set Lens Vertical Position
  kind: action
  command: "(LVO {position})"
  params:
    - { name: position, type: integer, description: "Subject to range from LVO?m" }

- id: msp_query
  label: Query OSD Menu Position
  kind: query
  command: "(MSP?)"
  params: []

- id: msp
  label: Set OSD Menu Position
  kind: action
  command: "(MSP {value})"
  params:
    - name: value
      type: integer
      description: "0=Top left (default), 1=Top center, 2=Top right, 3=Center left, 4=Center, 5=Center right, 6=Bottom left, 7=Bottom center, 8=Bottom right"

- id: net_static
  label: Set Static Network
  kind: action
  command: "(NET \"{ip}\" \"{subnet}\" \"{gateway}\")"
  params:
    - { name: ip, type: string, description: "IP address" }
    - { name: subnet, type: string, description: "Subnet mask" }
    - { name: gateway, type: string, description: "Gateway (optional)" }

- id: net_dgrp
  label: Set Device Group Name
  kind: action
  command: "(NET+DGRP \"{group}\")"
  params:
    - { name: group, type: string, description: "Group name for the projector" }

- id: net_dhcp
  label: Enable DHCP
  kind: action
  command: "(NET+DHCP 1)"
  params: []

- id: net_eth0_query
  label: Query Projector IP
  kind: query
  command: "(NET+ETH0?)"
  params: []

- id: net_gate_query
  label: Query Gateway Address
  kind: query
  command: "(NET+GATE?)"
  params: []

- id: net_host
  label: Set Projector Host Name
  kind: action
  command: "(NET+HOST \"{name}\")"
  params:
    - { name: name, type: string, description: "Projector name" }

- id: net_mac0_query
  label: Query MAC Address
  kind: query
  command: "(NET+MAC0?)"
  params: []

- id: net_port_query
  label: Query Christie Serial TCP Port
  kind: query
  command: "(NET+PORT?)"
  params: []

- id: net_sub0_query
  label: Query Projector Netmask
  kind: query
  command: "(NET+SUB0?)"
  params: []

- id: net_swit
  label: Set Network Switching Mode
  kind: action
  command: "(NET+SWIT {value})"
  params:
    - { name: value, type: integer, description: "0 = Split (default); 1 = All ports joined; 2 = HDBaseT joined with Ethernet" }

- id: osd_query
  label: Query OSD State
  kind: query
  command: "(OSD?)"
  params: []

- id: osd
  label: Set OSD Display
  kind: action
  command: "(OSD {value})"
  params:
    - { name: value, type: integer, description: "0 = hide; 1 = display" }

- id: otr_query
  label: Query Output Resolution
  kind: query
  command: "(OTR?)"
  params: []

- id: otr_hres_query
  label: Query Horizontal Resolution
  kind: query
  command: "(OTR+HRES?)"
  params: []

- id: otr_vres_query
  label: Query Vertical Resolution
  kind: query
  command: "(OTR+VRES?)"
  params: []

- id: png_query
  label: Ping Projector
  kind: query
  command: "(PNG?)"
  params: []

- id: pro_list
  label: List Local Profiles
  kind: query
  command: "(PRO?L)"
  params: []

- id: pro_select
  label: Select Local Profile
  kind: action
  command: "(PRO {x})"
  params:
    - { name: x, type: integer, description: "0 = Default; 1-4 = custom profiles" }

- id: pwr_query
  label: Query Power State
  kind: query
  command: "(PWR?)"
  params: []

- id: pwr_set
  label: Set Power State
  kind: action
  command: "(PWR {value})"
  params:
    - { name: value, type: integer, description: "0 = off; 1 = on" }

- id: pwr_elec
  label: Set Video Electronics Override
  kind: action
  command: "(PWR+ELEC {value})"
  params:
    - { name: value, type: integer, description: "0 = disable override; 1 = keep electronics on in standby" }

- id: ral
  label: Set Ethernet Access Level
  kind: action
  command: "(RAL {value})"
  params:
    - { name: value, type: integer, description: "0 = No Access; 1 = Login Required; 2 = Free Access (default)" }

- id: ral_prta
  label: Set RS232 Access Level
  kind: action
  command: "(RAL+PRTA {value})"
  params:
    - { name: value, type: integer, description: "0 = No Access; 1 = Login Required; 2 = Free Access (default)" }

- id: sdi
  label: Set SDI Payload Override
  kind: action
  command: "(SDI {value})"
  params:
    - name: value
      type: integer
      description: "0=Auto (default), 1=Custom, 2=3G-A 1080p60, 3=3G-A 1080p59.94, 4=3G-A 1080p50, 5=3G-A 2K60, 6=3G-A 2K59.94, 7=3G-A 2K50"

- id: sdi_payl
  label: Set Custom SDI Payload
  kind: action
  command: "(SDI+PAYL \"{custom_string}\")"
  params:
    - { name: custom_string, type: string, description: "4-byte hex string in big-endian order" }

- id: shu_query
  label: Query Shutter State
  kind: query
  command: "(SHU?)"
  params: []

- id: shu
  label: Set Shutter
  kind: action
  command: "(SHU {value})"
  params:
    - { name: value, type: integer, description: "0 = open; 1 = close (default)" }

- id: sin_list
  label: List Available Inputs
  kind: query
  command: "(SIN?L)"
  params: []

- id: sin_select
  label: Select Input
  kind: action
  command: "(SIN {input})"
  params:
    - { name: input, type: integer, description: "Subject to range from SIN?L" }

- id: sin_port
  label: Set Input Port Configuration
  kind: action
  command: "(SIN+PORT {config})"
  params:
    - { name: config, type: integer, description: "1 = One-Port (default); 5 = One-Port Dual-Input 3D (Mirage HD25/WU25 only)" }

- id: snm_lamp
  label: SNMP Lamp Faults
  kind: action
  command: "(SNM+LAMP {value})"
  params:
    - { name: value, type: integer, description: "0 = disable; 1 = enable (default)" }

- id: snm_powr
  label: SNMP Power State Traps
  kind: action
  command: "(SNM+POWR {value})"
  params:
    - { name: value, type: integer, description: "0 = disable; 1 = enable (default)" }

- id: snm_read
  label: Set SNMP Read Password
  kind: action
  command: "(SNM+READ \"{password}\")"
  params:
    - { name: password, type: string, description: "Max 32 chars; default = private" }

- id: snm_sign
  label: SNMP Signal Traps
  kind: action
  command: "(SNM+SIGN {value})"
  params:
    - { name: value, type: integer, description: "0 = disable; 1 = enable (default)" }

- id: snm_stal
  label: SNMP Fan/Cooling Faults
  kind: action
  command: "(SNM+STAL {value})"
  params:
    - { name: value, type: integer, description: "0 = disable; 1 = enable (default)" }

- id: snm_tip1
  label: Set SNMP Trap IP 1
  kind: action
  command: "(SNM+TIP1 \"{ip}\")"
  params:
    - { name: ip, type: string, description: "Trap IP; 0.0.0.0 = disable (default)" }

- id: snm_tip2
  label: Set SNMP Trap IP 2
  kind: action
  command: "(SNM+TIP2 \"{ip}\")"
  params:
    - { name: ip, type: string, description: "Trap IP; 0.0.0.0 = disable (default)" }

- id: snm_tip3
  label: Set SNMP Trap IP 3
  kind: action
  command: "(SNM+TIP3 \"{ip}\")"
  params:
    - { name: ip, type: string, description: "Trap IP; 0.0.0.0 = disable (default)" }

- id: snm_thrm
  label: SNMP Temperature Faults
  kind: action
  command: "(SNM+THRM {value})"
  params:
    - { name: value, type: integer, description: "0 = disable; 1 = enable (default)" }

- id: sor
  label: Set Screen Orientation
  kind: action
  command: "(SOR {value})"
  params:
    - { name: value, type: integer, description: "0 = Front (default); 1 = Rear; 2 = Front inverted; 3 = Rear inverted" }

- id: sps_colr
  label: Set Splash Screen Color
  kind: action
  command: "(SPS+COLR {value})"
  params:
    - { name: value, type: integer, description: "1 = Red; 2 = Green; 3 = Blue; 7 = Black (default)" }

- id: sst_query_all
  label: Query All Status Items
  kind: query
  command: "(SST?)"
  params: []

- id: sst_query_group
  label: Query Status Group
  kind: query
  command: "(SST+{group}?)"
  params:
    - { name: group, type: string, description: "Four-letter status group identifier (e.g. TEMP, LAMP, VERS)" }

- id: sst_query_item
  label: Query Status Item
  kind: query
  command: "(SST+{group}?{index})"
  params:
    - { name: group, type: string, description: "Four-letter status group identifier" }
    - { name: index, type: integer, description: "Item index within group" }

- id: szp
  label: Set Resize Preset
  kind: action
  command: "(SZP {value})"
  params:
    - { name: value, type: integer, description: "0 = Auto (default); 1 = None; 2 = Full size; 3 = Full width; 4 = Full height" }

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
    - { name: value, type: integer, description: "0 = aligned (default); negative = before; positive = after" }

- id: tdm
  label: Set 3D Mode
  kind: action
  command: "(TDM {mode})"
  params:
    - { name: mode, type: integer, description: "0 = off; 1 = auto (default); 2 = force 3D" }

- id: tdn_query
  label: Query 3D Input Inversion
  kind: query
  command: "(TDN?)"
  params: []

- id: tdn_set
  label: Set 3D Input Inversion
  kind: action
  command: "(TDN {value})"
  params:
    - { name: value, type: integer, description: "0 = normal (default); 1 = invert" }

- id: tdo_query
  label: Query 3D Sync Out
  kind: query
  command: "(TDO?)"
  params: []

- id: tdo_set
  label: Set 3D Sync Out
  kind: action
  command: "(TDO {value})"
  params:
    - { name: value, type: integer, description: "0 = emitter (default); 1 = downstream projector" }

- id: tdt
  label: Set 3D Test Pattern
  kind: action
  command: "(TDT {value})"
  params:
    - { name: value, type: integer, description: "0 = disable; 1 = enable" }

- id: thm
  label: Set Video Thumbnails
  kind: action
  command: "(THM {value})"
  params:
    - { name: value, type: integer, description: "0 = off; 1 = on (default)" }

- id: tmd_date
  label: Set Date
  kind: action
  command: "(TMD+DATE \"{date}\")"
  params:
    - { name: date, type: string, description: "YYYY/MM/DD" }

- id: tmd_time
  label: Set Time
  kind: action
  command: "(TMD+TIME \"{time}\")"
  params:
    - { name: time, type: string, description: "hh:mm:ss" }

- id: tmd_time_query
  label: Query Time
  kind: query
  command: "(TMD+TIME?)"
  params: []

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

- id: uid_login
  label: Login User
  kind: action
  command: "(UID \"{username}\" \"{password}\")"
  params:
    - { name: username, type: string, description: "Username (e.g. service)" }
    - { name: password, type: string, description: "Password" }

- id: wrp_slct_list
  label: List Warp Maps
  kind: query
  command: "(WRP+SLCT?L)"
  params: []

- id: wrp_slct
  label: Select Warp Map
  kind: action
  command: "(WRP+SLCT {value})"
  params:
    - { name: value, type: integer, description: "0 = off; 1 to 4 = select warp map" }

- id: zom_minmax
  label: Query Lens Zoom Range
  kind: query
  command: "(ZOM?m)"
  params: []

- id: zom
  label: Set Lens Zoom Position
  kind: action
  command: "(ZOM {position})"
  params:
    - { name: position, type: integer, description: "Subject to range from ZOM?m" }
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on, cooling_down, warming_up]
  description: "Reply: (PWR!000 \"Power Off\") - 000=Standby, 001=On, 010=Cooling down, 011=Warming up"

- id: shutter_state
  type: enum
  values: [open, closed]
  description: "Reply: (SHU!0)=open, (SHU!1)=closed"

- id: osd_state
  type: enum
  values: [hidden, displayed]

- id: projector_address
  type: integer
  description: "Reply: (ADR!005)"

- id: baud_rate
  type: enum
  values: ["2400", "9600", "19200", "38400", "57600", "115200"]
  description: "Reply: (BDR+PRTA!006 \"115200\")"

- id: frame_delay
  type: integer
  description: "Reply: (FRD+STAT!1250)"

- id: frame_delay_time_ms
  type: string
  description: "Reply: (FRD+TIME!\"33.33\")"

- id: input_port_config
  type: enum
  values: [one_port, one_port_dual_input_3d]

- id: network_ip
  type: string

- id: network_gateway
  type: string

- id: network_netmask
  type: string

- id: network_mac
  type: string

- id: serial_tcp_port
  type: integer

- id: language
  type: enum
  values: [english, french, german, spanish, italian, chinese, japanese, korean, russian]

- id: temperature_units
  type: enum
  values: [celsius, fahrenheit]

- id: menu_position
  type: enum
  values: [top_left, top_center, top_right, center_left, center, center_right, bottom_left, bottom_center, bottom_right]

- id: output_resolution
  type: string

- id: projector_info
  type: string
  description: "Reply: (PNG!054 001 001 000) - type, major, minor, build. Type 64 = Crimson"

- id: gpio_input_state
  type: string
  description: "Per-pin string of H/L; e.g. (GIO+STAT!\"LLLLLLL\")"

- id: profile_list
  type: list

- id: input_list
  type: list

- id: test_suite_list
  type: list

- id: test_list
  type: list

- id: black_level_blend_list
  type: list

- id: edge_blend_list
  type: list

- id: warp_map_list
  type: list

- id: status_items
  type: list
  description: "Reply: (SST+<group>!<index> <state> \"<value>\" \"<description>\"). State 000=OK, 001=Warning, 002=Error."
```

## Variables
```yaml
# All settable parameters represented as Actions above (parameterized commands).
# UNRESOLVED: no separate settable variable outside of action commands identified in source
```

## Events
```yaml
- id: card_detected
  description: "(65535 00000 FYI01901 \"Card x detected\") - new card detected in slot X while video electronics on"

- id: card_removed
  description: "(65535 00000 FYI01901 \"Card x removed\") - card removed from slot X while video electronics on"

- id: date_time_changed
  description: "(65535 00000 FYI00916 \"Setting Date to YYYY/MM/DD\") or (65535 00000 FYI00916 \"Setting Time to hh:mm:ss\")"

- id: factory_defaults
  description: "(65535 00000 FYI00919 \"All settings have been restored to their factory defaults. Reboot is required to take effect.\")"

- id: network_changed
  description: "(65535 00000 FYI00915 \"Configured network: IP:... Mask:... Gateway:...\") - operator change, DHCP renewal, cable (un)plug"

- id: status_change
  description: "(65535 00000 FYI00000 \"(SST+LAMP?001) Lamp Hours = 00:00 (h:m)\") - status item changes between OK/Warning/Error"

- id: status_warning
  description: "(65535 00000 ERR00000 \"System Warning: (SST+...) ...\")"

- id: status_error
  description: "(65535 00000 ERR00000 \"System Error: (SST+...) ...\")"
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macros
```

## Safety
```yaml
confirmation_required_for:
  - "(DEF 111)"  # Factory defaults: deletes all user profiles, warps, blends
  - "(PWR 0)"  # Power off - projector enters cooling cycle (PWR!010)
interlocks:
  - "Some commands are operational only when projector is powered up."
  - "Many color/gamma/image commands require video electronics on (stated per command)."
  - "Service-level commands (CCA native primaries, BDR baud set) require service-user login."
  - "LCB / LHO / LVO / ZOM / LMV lens commands only available when projector is on."
  - "Do not execute BST while Crimson is warming up (source explicit warning)."
  - "DEF 111 resets network to DHCP - drops connection if static IP was in use."
# UNRESOLVED: no power-on sequencing procedure documented in source
```

## Notes
- Messages wrapped in parentheses. Format: `(Code Data)` SET, `(Code?)` REQUEST, `(Code!Data)` REPLY.
- Optional subcode (4 chars) appended to function code with `+` (e.g. `CCA+CTMP`).
- Optional prefix chars after opening bracket: `$` (simple ack, returns `$` on success or `^` NAK), `#` (full ack, echoes message), `&` (checksum — low byte of ASCII sum 0-255, placed before closing bracket with leading space).
- Replies have fixed-width integer parameters padded with leading zeros; minimum 3 chars. Negative values get one fewer digit to fit sign.
- Set messages do not require padding.
- Multiple parameters in a message separated by single space.
- Text parameters enclosed in double quotes; special chars `"` `\` `(` `)` require `\` escape; `\n` = newline; `\h##` = arbitrary hex byte.
- Error reply example: `(ITP) - (65535 00000 ERR00005 "ITP: Too Few Parameters")`.
- Error codes 3-10 and 101-118 documented (see source table).
- Flow control: Xoff = 0x13 (pause), Xon = 0x11 (resume). Buffer accepts up to 10 bytes after Xoff; Crimson sends at most 3 chars after receiving Xoff.
- Crimson model type code in PNG? reply = `64`.
- Models covered by this command reference: Crimson HD25, Crimson WU25, Crimson HD31, Crimson WU31, Mirage HD25, Mirage WU25.
- 3D commands (TDD/TDM/TDN/TDO/TDT) and Dual-Input 3D port config (SIN+PORT 5) apply to Mirage HD25 / Mirage WU25 only.

<!-- UNRESOLVED: RS232 connector pinout not in source — refer to Crimson and Mirage User Guide (P/N 020-102649-XX) -->
<!-- UNRESOLVED: factory default baud rate for first connection not explicitly stated; 115200 is documented default value but also "default baud rate on each port" — needs device verification -->
<!-- UNRESOLVED: serial data_bits/parity/stop_bits not stated in source -->
<!-- UNRESOLVED: default service password is example only ("service"/"service") — not confirmed as factory default -->
<!-- UNRESOLVED: full list of status groups/items not enumerated — refer to Crimson and Mirage Status System Guide (P/N 020-102661-XX) -->

## Provenance

```yaml
source_domains:
  - sslcdbucket.s3.ap-northeast-2.amazonaws.com
  - christiedigital.com
  - projectorcentral.com
source_urls:
  - "https://sslcdbucket.s3.ap-northeast-2.amazonaws.com/product/Crimson%20WU31/Crimson%20Series_manual(tech)_eng.pdf"
  - https://www.christiedigital.com/globalassets/resources/public/020-102649-07-Christie-LIT-MAN-USR-Crimson.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-102271-04-christie-lit-tech-ref-gs-700-850-api.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-102647-07-christie-lit-guid-set-crimson.pdf
  - https://www.projectorcentral.com/pdf/projector_manual_11145.pdf
retrieved_at: 2026-08-10T21:29:47.760Z
last_checked_at: 2026-08-19T09:01:37.698Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:01:37.698Z
matched_actions: 191
action_count: 191
confidence: medium
summary: "All 191 spec commands map to literal tokens in the source; transport port 3002 and 115200 baud are confirmed; no fabricated, missing, or drifted entries. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS232 cable pinout not in source; default credentials beyond example not enumerated"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "no separate settable variable outside of action commands identified in source"
- "source documents no explicit multi-step macros"
- "no power-on sequencing procedure documented in source"
- "RS232 connector pinout not in source — refer to Crimson and Mirage User Guide (P/N 020-102649-XX)"
- "factory default baud rate for first connection not explicitly stated; 115200 is documented default value but also \"default baud rate on each port\" — needs device verification"
- "serial data_bits/parity/stop_bits not stated in source"
- "default service password is example only (\"service\"/\"service\") — not confirmed as factory default"
- "full list of status groups/items not enumerated — refer to Crimson and Mirage Status System Guide (P/N 020-102661-XX)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
