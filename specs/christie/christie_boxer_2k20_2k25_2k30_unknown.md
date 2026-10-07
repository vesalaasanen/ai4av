---
spec_id: admin/christie-boxer-2k20-2k25-2k30
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie Boxer 2K20 / 2K25 / 2K30 Control Spec"
manufacturer: Christie
model_family: "Boxer 2K20"
aliases: []
compatible_with:
  manufacturers:
    - Christie
    - "Christie Digital Systems USA, Inc."
  models:
    - "Boxer 2K20"
    - "Boxer 2K25"
    - "Boxer 2K30"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102417-08-Christie-LIT-TECH-REF-Boxer-2K-API.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-102265-12-Christie-LIT-GUID-SET-Boxer-2K.pdf
retrieved_at: 2026-05-14T21:26:37.242Z
last_checked_at: 2026-10-07T13:16:16.078Z
generated_at: 2026-10-07T13:16:16.078Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ITP?L"
  - "ITP?E"
  - "GAM?M"
  - "full command catalogue is present but firmware-version-specific behavior (e.g. EVT/EVT?L format, BST list availability \"as of v1.1.0\") is noted in source. Minimum firmware not stated."
  - "data_bits, parity, stop_bits, flow_control for RS-232 not stated in source."
  - "full CRM parameter range not in the supplied excerpt."
  - "explicit electrical/voltage safety warnings for the projector itself"
  - "per-command minimum/maximum ranges that depend on installed lens (LMV, FCS, ZOM, LHO, LVO) are returned by the corresponding `?m` query — they are not hard-coded constants. Firmware version compatibility and per-firmware command availability are referenced (\"as of v1.1.0 software\") but not enumerated. CRM (contrast) is referenced as a sample message but its dedicated section is outside this excerpt. The Boxer Product Safety Guide and Boxer 2K Status System Guide contain material outside this excerpt that may affect Safety/Feedbacks entries."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:16:16.078Z
  matched_actions: 200
  action_count: 200
  confidence: medium
  summary: "All 200 action units match source command rows with correct shapes; port 3002 and baud 115200 supported; only generic ?L/?E/?M query forms unmapped. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Christie Boxer 2K20 / 2K25 / 2K30 Control Spec

## Summary
The Christie Boxer 2K20, 2K25, and 2K30 are 3-chip DLP projectors sharing a common Christie-proprietary serial command set ("Christie serial protocol") documented in the manufacturer Technical Reference. The protocol can be carried over an RS-232 IN connection (RS-232 on the IMXB faceplate) or over TCP on the Ethernet port (default TCP port 3002). Messages are bracketed ASCII with three-character function codes, optional four-character subcodes, and optional parameters; query and reply use `?` and `!` respectively.

<!-- UNRESOLVED: full command catalogue is present but firmware-version-specific behavior (e.g. EVT/EVT?L format, BST list availability "as of v1.1.0") is noted in source. Minimum firmware not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 3002
serial:
  baud_rate: 115200
  data_bits: UNRESOLVED  # source does not state this (was 8)
  parity: UNRESOLVED  # source does not state this (was none)
  stop_bits: UNRESOLVED  # source does not state this (was 1)
  flow_control: UNRESOLVED  # source does not state this (was none)
auth:
  type: UNRESOLVED
```

**Notes on transport:**
- The source documents an RS-232 IN port on the projector IMXB faceplate and a Christie serial protocol carried over Ethernet on TCP port 3002 (with `NET+PORT?` query returning the configurable port and port 3003 reserved).
- The source names a default RS-232 baud rate of 115200 but does not state the other serial line parameters (data bits, parity, stop bits, flow control); those values are unresolved.
- The source documents `UID "<username>" "<password>"` for logging in and `RAL`/`RAL+PRTA` for per-port access levels. It does not state whether authentication is required when opening a connection.
<!-- UNRESOLVED: data_bits, parity, stop_bits, flow_control for RS-232 not stated in source. -->

## Traits
```yaml
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

**Traits rationale:**
- `powerable`: PWR, RBT, DEF, APW commands present.
- `routable`: SIN/SIN+PORT input selection; FIB+SLTA/SLTB input-card enabling; DMX Art-Net configuration.
- `queryable`: many `?` request commands and `!` replies (PWR?, SIN?L, BDR+PRTA?, PNG?, SST+, etc.).
- `levelable`: brightness/contrast/sharpness/gamma/color commands (BGC, GAM, DTL, CSP, CLE, CCA*, FRD, LPP, ALC, EBB/EBL blends).

## Actions
```yaml
# Every distinct command row documented in the source is enumerated below.
# Parameterized values within a single command row (e.g. PWR 0/1, SIN+PORT 1) are
# represented as a single action with a templated `command` and a `params` entry;
# they are NOT exploded into separate actions.

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
      description: "0-999; 65535 = reserved broadcast address"

- id: alc_set
  label: Ambient Light Correction
  kind: action
  command: "(ALC {value})"
  params:
    - name: value
      type: integer
      description: "0=no correction; 1-100 darker compensation; -1 to -100 brighter compensation"

- id: apw_set
  label: Auto Power On
  kind: action
  command: "(APW {value})"
  params:
    - name: value
      type: integer
      description: "0=disable auto power up, 1=enable auto power up"

- id: asu_run
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
    - name: value
      type: integer
      description: "1=2400, 2=9600, 3=19200, 4=38400, 5=57600, 6=115200 (default). Requires service-level access."

- id: bgc_set
  label: Base Gamma Curve
  kind: action
  command: "(BGC {value})"
  params:
    - name: value
      type: integer
      description: "0=sRGB, 2=Power Law Function, 3=M-Series, 4=ITU-R BT.1886"

- id: blk_query
  label: Query Blanking Subcommand Value
  kind: query
  command: "(BLK+{command}?)"
  params:
    - name: command
      type: string
      description: "BOTP, LFTP, RGTP, or TOPP"

- id: blk_botp_set
  label: Blanking Bottom
  kind: action
  command: "(BLK+BOTP {percentage})"
  params:
    - name: percentage
      type: integer
      description: "0-250 (0=0%, 250=25%)"

- id: blk_lftp_set
  label: Blanking Left
  kind: action
  command: "(BLK+LFTP {percentage})"
  params:
    - name: percentage
      type: integer
      description: "0-250 (0=0%, 250=25%)"

- id: blk_rgtp_set
  label: Blanking Right
  kind: action
  command: "(BLK+RGTP {percentage})"
  params:
    - name: percentage
      type: integer
      description: "0-250 (0=0%, 250=25%)"

- id: blk_topp_set
  label: Blanking Top
  kind: action
  command: "(BLK+TOPP {percentage})"
  params:
    - name: percentage
      type: integer
      description: "0-250 (0=0%, 250=25%)"

- id: blk_rstp_reset
  label: Reset Blanking
  kind: action
  command: "(BLK+RSTP)"
  params: []

- id: bst_list_suites
  label: List Built-in Self Test Suites
  kind: query
  command: "(BST?L)"
  params: []

- id: bst_run
  label: Run Built-in Self Test Suite
  kind: action
  command: "(BST {suite})"
  params:
    - name: suite
      type: integer
      description: "0=All Tests, 1=Image processor board, 2=Formatter, 3=Active backplane, 4=Video path"

- id: bst_test_list
  label: List Built-in Self Test Cases
  kind: query
  command: "(BST+TEST?L)"
  params: []

- id: bst_test_run
  label: Run Built-in Self Test Case
  kind: action
  command: "(BST+TEST {index})"
  params:
    - name: index
      type: integer
      description: "Test index returned by BST+TEST?L"

- id: cca_copy
  label: Color Adjustment Copy
  kind: action
  command: "(CCA+COPY {value})"
  params:
    - name: value
      type: integer
      description: "0=Max Drives, 1=Color Temperature, 2=HD Video (ITU-R BT.709)"

- id: cca_ctmp_set
  label: Color Temperature
  kind: action
  command: "(CCA+CTMP {value})"
  params:
    - name: value
      type: integer
      description: "3200-9300"

- id: cca_slct_set
  label: Select Color Table
  kind: action
  command: "(CCA+SLCT {value})"
  params:
    - name: value
      type: integer
      description: "1=Color Temperature, 2=HD Video (ITU-R BT.709), 3=Custom"

- id: cca_rdcx_set
  label: Custom Color Red X
  kind: action
  command: "(CCA+RDCX {x})"
  params:
    - name: x
      type: integer
      description: "x coordinate scaled x10000 (e.g. 3350 = 0.3350 CIE 1931)"

- id: cca_rdcy_set
  label: Custom Color Red Y
  kind: action
  command: "(CCA+RDCY {y})"
  params:
    - name: y
      type: integer
      description: "y coordinate scaled x10000"

- id: cca_gncx_set
  label: Custom Color Green X
  kind: action
  command: "(CCA+GNCX {x})"
  params:
    - name: x
      type: integer
      description: "x coordinate scaled x10000"

- id: cca_gncy_set
  label: Custom Color Green Y
  kind: action
  command: "(CCA+GNCY {y})"
  params:
    - name: y
      type: integer
      description: "y coordinate scaled x10000"

- id: cca_blcx_set
  label: Custom Color Blue X
  kind: action
  command: "(CCA+BLCX {x})"
  params:
    - name: x
      type: integer
      description: "x coordinate scaled x10000"

- id: cca_blcy_set
  label: Custom Color Blue Y
  kind: action
  command: "(CCA+BLCY {y})"
  params:
    - name: y
      type: integer
      description: "y coordinate scaled x10000"

- id: cca_whcx_set
  label: Custom Color White X
  kind: action
  command: "(CCA+WHCX {x})"
  params:
    - name: x
      type: integer
      description: "x coordinate scaled x10000"

- id: cca_whcy_set
  label: Custom Color White Y
  kind: action
  command: "(CCA+WHCY {y})"
  params:
    - name: y
      type: integer
      description: "y coordinate scaled x10000"

- id: cca_gofr_set
  label: Color Adjustment Green of Red
  kind: action
  command: "(CCA+GOFR {value})"
  params:
    - name: value
      type: integer
      description: "-1000 to 1000 (1000=100%); negative scales up other two components"

- id: cca_bofr_set
  label: Color Adjustment Blue of Red
  kind: action
  command: "(CCA+BOFR {value})"
  params:
    - name: value
      type: integer
      description: "-1000 to 1000"

- id: cca_rofg_set
  label: Color Adjustment Red of Green
  kind: action
  command: "(CCA+ROFG {value})"
  params:
    - name: value
      type: integer
      description: "-1000 to 1000"

- id: cca_bofg_set
  label: Color Adjustment Blue of Green
  kind: action
  command: "(CCA+BOFG {value})"
  params:
    - name: value
      type: integer
      description: "-1000 to 1000"

- id: cca_rofb_set
  label: Color Adjustment Red of Blue
  kind: action
  command: "(CCA+ROFB {value})"
  params:
    - name: value
      type: integer
      description: "-1000 to 1000"

- id: cca_gofb_set
  label: Color Adjustment Green of Blue
  kind: action
  command: "(CCA+GOFB {value})"
  params:
    - name: value
      type: integer
      description: "-1000 to 1000"

- id: cca_rofr_set
  label: Color Adjustment Red of Red
  kind: action
  command: "(CCA+ROFR {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000 (1000=100%)"

- id: cca_gofg_set
  label: Color Adjustment Green of Green
  kind: action
  command: "(CCA+GOFG {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000 (1000=100%)"

- id: cca_bofb_set
  label: Color Adjustment Blue of Blue
  kind: action
  command: "(CCA+BOFB {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000 (1000=100%)"

- id: cca_rofw_set
  label: Color Adjustment Red of White
  kind: action
  command: "(CCA+ROFW {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000 (1000=100%)"

- id: cca_gofw_set
  label: Color Adjustment Green of White
  kind: action
  command: "(CCA+GOFW {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000 (1000=100%)"

- id: cca_bofw_set
  label: Color Adjustment Blue of White
  kind: action
  command: "(CCA+BOFW {value})"
  params:
    - name: value
      type: integer
      description: "0 to 1000 (1000=100%)"

- id: cca_rdpx_set
  label: Native Color Red X
  kind: action
  command: "(CCA+RDPX {x})"
  params:
    - name: x
      type: integer
      description: "Native red x coordinate scaled x10000 (service-level, Max Drives)"

- id: cca_rdpy_set
  label: Native Color Red Y
  kind: action
  command: "(CCA+RDPY {y})"
  params:
    - name: y
      type: integer
      description: "Native red y coordinate scaled x10000 (service-level)"

- id: cca_gnpx_set
  label: Native Color Green X
  kind: action
  command: "(CCA+GNPX {x})"
  params:
    - name: x
      type: integer
      description: "Native green x coordinate scaled x10000 (service-level)"

- id: cca_gnpy_set
  label: Native Color Green Y
  kind: action
  command: "(CCA+GNPY {y})"
  params:
    - name: y
      type: integer
      description: "Native green y coordinate scaled x10000 (service-level)"

- id: cca_blpx_set
  label: Native Color Blue X
  kind: action
  command: "(CCA+BLPX {x})"
  params:
    - name: x
      type: integer
      description: "Native blue x coordinate scaled x10000 (service-level)"

- id: cca_blpy_set
  label: Native Color Blue Y
  kind: action
  command: "(CCA+BLPY {y})"
  params:
    - name: y
      type: integer
      description: "Native blue y coordinate scaled x10000 (service-level)"

- id: cca_whpx_set
  label: Native Color White X
  kind: action
  command: "(CCA+WHPX {x})"
  params:
    - name: x
      type: integer
      description: "Native white x coordinate scaled x10000 (service-level)"

- id: cca_whpy_set
  label: Native Color White Y
  kind: action
  command: "(CCA+WHPY {y})"
  params:
    - name: y
      type: integer
      description: "Native white y coordinate scaled x10000 (service-level)"

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

- id: cle_set
  label: Color Enable
  kind: action
  command: "(CLE {color})"
  params:
    - name: color
      type: integer
      description: "0=White, 1=Red, 2=Green, 3=Blue, 4=Yellow, 5=Cyan, 6=Magenta"

- id: csp_set
  label: Color Space
  kind: action
  command: "(CSP {colorSpace})"
  params:
    - name: colorSpace
      type: integer
      description: "0=Auto Detect, 1=RGB full, 2=YCbCr HDTV BT.709, 3=RGB limited, 4=YCbCr HDTV expanded"

- id: ddd_set
  label: Disable Dual-Link DVI
  kind: action
  command: "(DDD {value})"
  params:
    - name: value
      type: integer
      description: "0=enable Dual-Link, 1=disable Dual-Link"

- id: def_run
  label: Factory Defaults
  kind: action
  command: "(DEF 111)"
  params: []

- id: dmx_chan_set
  label: DMX/Art-Net Base Channel
  kind: action
  command: "(DMX+CHAN {value})"
  params:
    - name: value
      type: integer
      description: "1-488 (default 1)"

- id: dmx_enbl_set
  label: DMX/Art-Net Enable
  kind: action
  command: "(DMX+ENBL {value})"
  params:
    - name: value
      type: integer
      description: "0=disable Art-Net, 1=enable Art-Net"

- id: dmx_nets_set
  label: DMX/Art-Net Net
  kind: action
  command: "(DMX+NETS {value})"
  params:
    - name: value
      type: integer
      description: "0-127"

- id: dmx_subn_set
  label: DMX/Art-Net Subnet
  kind: action
  command: "(DMX+SUBN {value})"
  params:
    - name: value
      type: integer
      description: "0-15"

- id: dmx_unvs_set
  label: DMX/Art-Net Universe
  kind: action
  command: "(DMX+UNVS {value})"
  params:
    - name: value
      type: integer
      description: "0-15"

- id: dtl_set
  label: Sharpness Detail
  kind: action
  command: "(DTL {value})"
  params:
    - name: value
      type: integer
      description: "0-49 softens, 50 default moderate, 51-100 sharpens"

- id: ebb_slct_list
  label: List Black Level Blends
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
      description: "0=off, 1-4=blends, 11=basic built-in"

- id: ebl_slct_list
  label: List Edge Blends
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
      description: "0=off, 1-4=blends, 11=basic built-in"

- id: edo_set
  label: EDID Override Frame Rate
  kind: action
  command: "(EDO {rate})"
  params:
    - name: rate
      type: integer
      description: "24, 25, 30, 48, 50, or 60 (default 60)"

- id: eme_set
  label: Enable Asynchronous Serial Messages
  kind: action
  command: "(EME {value})"
  params:
    - name: value
      type: integer
      description: "0=disable async FYI/ERR, 1=enable"

- id: etp_set
  label: Engine Test Pattern
  kind: action
  command: "(ETP {index})"
  params:
    - name: index
      type: integer
      description: "Engine diagnostic test pattern index (0-255, see source for full enumeration)"

- id: evt_all
  label: Retrieve All Events Since AC Start
  kind: query
  command: "(EVT)"
  params: []

- id: evt_max
  label: Retrieve Most Recent N Events
  kind: query
  command: "(EVT {max})"
  params:
    - name: max
      type: integer
      description: "Maximum number of events to return"

- id: evt_from
  label: Retrieve Events From Timestamp
  kind: query
  command: "(EVT \"{startTimestamp}\")"
  params:
    - name: startTimestamp
      type: string
      description: "Format yyyy-mm-dd hh:mm:ss"

- id: evt_range
  label: Retrieve Events Between Two Timestamps
  kind: query
  command: "(EVT \"{start}\" \"{end}\")"
  params:
    - name: start
      type: string
      description: "yyyy-mm-dd hh:mm:ss"
    - name: end
      type: string
      description: "yyyy-mm-dd hh:mm:ss"

- id: fcs_range
  label: Query Focus Position Min/Max
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
      description: "Numeric position subject to FCS?m range"

- id: fib_slta_set
  label: Christie Link Slot 1 Enable
  kind: action
  command: "(FIB+SLTA {value})"
  params:
    - name: value
      type: integer
      description: "0=disable Christie Link input on slot 1, 1=enable"

- id: fib_sltb_set
  label: Christie Link Slot 2 Enable
  kind: action
  command: "(FIB+SLTB {value})"
  params:
    - name: value
      type: integer
      description: "0=disable Christie Link input on slot 2, 1=enable"

- id: fmd_set
  label: Film Mode Detect
  kind: action
  command: "(FMD {value})"
  params:
    - name: value
      type: integer
      description: "0=turn off film mode detect, 1=turn on (default)"

- id: frd_set
  label: Frame Delay
  kind: action
  command: "(FRD {delay})"
  params:
    - name: delay
      type: integer
      description: "1000-3000 (units of 1/1000 frame; 2000=2 frames default)"

- id: frd_stat_query
  label: Query Actual Frame Delay
  kind: query
  command: "(FRD+STAT?)"
  params: []

- id: frd_time_query
  label: Query Frame Delay in Milliseconds
  kind: query
  command: "(FRD+TIME?)"
  params: []

- id: frz_set
  label: Image Freeze
  kind: action
  command: "(FRZ {value})"
  params:
    - name: value
      type: integer
      description: "0=disable freeze, 1=freeze"

- id: gam_set
  label: Gamma Power Value
  kind: action
  command: "(GAM {exponent})"
  params:
    - name: exponent
      type: integer
      description: "1000-3000 (default 2200). Requires BGC=2 Power Law."

- id: gam_maxl
  label: Gamma Maximum Screen Luminance
  kind: action
  command: "(GAM+MAXL {value})"
  params:
    - name: value
      type: integer
      description: "100-2000 (default 1000). Used by ITU-R BT.1886."

- id: gam_minl
  label: Gamma Minimum Screen Luminance
  kind: action
  command: "(GAM+MINL {value})"
  params:
    - name: value
      type: integer
      description: "0-1000 (default 10). Used by ITU-R BT.1886."

- id: gam_slop_set
  label: Gamma Slope
  kind: action
  command: "(GAM+SLOP {value})"
  params:
    - name: value
      type: integer
      description: "1-100 (default 1)"

- id: gio_cnfg_query
  label: Query GPIO Pin Direction
  kind: query
  command: "(GIO+CNFG?)"
  params: []

- id: gio_stat_query
  label: Query GPIO Input Status
  kind: query
  command: "(GIO+STAT?)"
  params: []

- id: gio_stat_set
  label: Set GPIO Output Status
  kind: action
  command: "(GIO+STAT \"{xxxxxxx}\")"
  params:
    - name: xxxxxxx
      type: string
      description: "7-char pattern: H=high, L=low, X=no change"

- id: his_query
  label: Query Lamp History
  kind: query
  command: "(HIS?)"
  params: []

- id: his_lmp1_query
  label: Query Lamp A1 Memory Module
  kind: query
  command: "(HIS+LMP1?)"
  params: []

- id: his_lmp2_query
  label: Query Lamp A2 Memory Module
  kind: query
  command: "(HIS+LMP2?)"
  params: []

- id: his_lmp3_query
  label: Query Lamp A3 Memory Module
  kind: query
  command: "(HIS+LMP3?)"
  params: []

- id: his_lmp4_query
  label: Query Lamp B1 Memory Module
  kind: query
  command: "(HIS+LMP4?)"
  params: []

- id: his_lmp5_query
  label: Query Lamp B2 Memory Module
  kind: query
  command: "(HIS+LMP5?)"
  params: []

- id: his_lmp6_query
  label: Query Lamp B3 Memory Module
  kind: query
  command: "(HIS+LMP6?)"
  params: []

- id: itp_set
  label: Test Pattern
  kind: action
  command: "(ITP {index})"
  params:
    - name: index
      type: integer
      description: "Test pattern index (0=Off, see source for full list 0-25)"

- id: itp_freq_set
  label: Internal Test Pattern Frequency
  kind: action
  command: "(ITP+FREQ {value})"
  params:
    - name: value
      type: integer
      description: "24-500 Hz (default 60)"

- id: itp_grdc_set
  label: Grid Test Pattern Color
  kind: action
  command: "(ITP+GRDC {value})"
  params:
    - name: value
      type: integer
      description: "0=white-on-black, 1=multi-color"

- id: itp_grdm_set
  label: Grid Test Pattern Motion
  kind: action
  command: "(ITP+GRDM {value})"
  params:
    - name: value
      type: integer
      description: "0=static, 1=moving"

- id: itp_grdp_set
  label: Grid Test Pattern Pitch
  kind: action
  command: "(ITP+GRDP {pitch})"
  params:
    - name: pitch
      type: integer
      description: "2-127 (default 32)"

- id: itp_grey_set
  label: Flat Grey Test Pattern Level
  kind: action
  command: "(ITP+GREY {greyLevel})"
  params:
    - name: greyLevel
      type: integer
      description: "0-4095 (default 2048)"

- id: itp_rmpl_set
  label: Ramp Test Pattern Start Level
  kind: action
  command: "(ITP+RMPL {greyLevel})"
  params:
    - name: greyLevel
      type: integer
      description: "0-4095 (default 0). Has no effect when ITP+RMPM is non-zero."

- id: itp_rmpm_set
  label: Ramp Test Pattern Motion Speed
  kind: action
  command: "(ITP+RMPM {speed})"
  params:
    - name: speed
      type: integer
      description: "0-100 (default 0)"

- id: itp_rmps_set
  label: Ramp Test Pattern Slope
  kind: action
  command: "(ITP+RMPS {slope})"
  params:
    - name: slope
      type: integer
      description: "1-5 (default 1)"

- id: ken_frnt_set
  label: Front IR Keypad Enable
  kind: action
  command: "(KEN+FRNT {value})"
  params:
    - name: value
      type: integer
      description: "0=disable front IR, 1=enable (default)"

- id: ken_hdbt_set
  label: IR Over HDBaseT Enable
  kind: action
  command: "(KEN+HDBT {value})"
  params:
    - name: value
      type: integer
      description: "0=disable IR over HDBaseT, 1=enable"

- id: ken_rear_set
  label: Rear IR Keypad Enable
  kind: action
  command: "(KEN+REAR {value})"
  params:
    - name: value
      type: integer
      description: "0=disable rear IR, 1=enable (default)"

- id: ken_wire_query
  label: Query Wired Keypad State
  kind: query
  command: "(KEN+WIRE?)"
  params: []

- id: ken_wire_set
  label: Wired Keypad Enable
  kind: action
  command: "(KEN+WIRE {value})"
  params:
    - name: value
      type: integer
      description: "0=disable wired keypad jack, 1=enable (default)"

- id: lcb_run
  label: Run Lens Motor Calibration
  kind: action
  command: "(LCB 1)"
  params: []

- id: lcb_home
  label: Lens Motor Home
  kind: action
  command: "(LCB+HOME)"
  params: []

- id: lho_range
  label: Query Lens Horizontal Min/Max
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
      description: "Numeric value subject to LHO?m range"

- id: lmv_set
  label: Lens Move (4-axis absolute)
  kind: action
  command: "(LMV {horizontal} {vertical} {zoom} {focus})"
  params:
    - name: horizontal
      type: integer
      description: "Range dependent on projector/lens; documented maximum -1600 to 1600"
    - name: vertical
      type: integer
      description: "Range dependent; maximum -1600 to 1600"
    - name: zoom
      type: integer
      description: "Range dependent"
    - name: focus
      type: integer
      description: "Range dependent"

- id: lmv_hstp
  label: Lens Horizontal Relative Steps
  kind: action
  command: "(LMV+HSTP {relativeSteps})"
  params:
    - name: relativeSteps
      type: integer
      description: "Negative=left, positive=right"

- id: lmv_vstp
  label: Lens Vertical Relative Steps
  kind: action
  command: "(LMV+VSTP {relativeSteps})"
  params:
    - name: relativeSteps
      type: integer
      description: "Negative=down, positive=up"

- id: lmv_fstp
  label: Lens Focus Relative Steps
  kind: action
  command: "(LMV+FSTP {relativeSteps})"
  params:
    - name: relativeSteps
      type: integer
      description: "Negative=outward, positive=inward"

- id: lmv_zstp
  label: Lens Zoom Relative Steps
  kind: action
  command: "(LMV+ZSTP {relativeSteps})"
  params:
    - name: relativeSteps
      type: integer
      description: "Negative=smaller, positive=larger"

- id: lmv_hrun
  label: Lens Horizontal Motor Run
  kind: action
  command: "(LMV+HRUN {value})"
  params:
    - name: value
      type: integer
      description: "-1=left, 0=stop, 1=right"

- id: lmv_vrun
  label: Lens Vertical Motor Run
  kind: action
  command: "(LMV+VRUN {value})"
  params:
    - name: value
      type: integer
      description: "-1=down, 0=stop, 1=up"

- id: lmv_frun
  label: Lens Focus Motor Run
  kind: action
  command: "(LMV+FRUN {value})"
  params:
    - name: value
      type: integer
      description: "-1=outward, 0=stop, 1=inward"

- id: lmv_zrun
  label: Lens Zoom Motor Run
  kind: action
  command: "(LMV+ZRUN {value})"
  params:
    - name: value
      type: integer
      description: "-1=smaller, 0=stop, 1=larger"

- id: loc_lang_query
  label: Query Language
  kind: query
  command: "(LOC+LANG?)"
  params: []

- id: loc_lang_set
  label: Set Language
  kind: action
  command: "(LOC+LANG {value})"
  params:
    - name: value
      type: integer
      description: "0=English, 1=French, 2=German, 3=Spanish, 4=Italian, 5=Chinese Simplified, 6=Japanese, 7=Korean, 8=Russian"

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
      description: "0=Celsius, 1=Fahrenheit"

- id: loe_set
  label: Video Loop Out Enable
  kind: action
  command: "(LOE {value})"
  params:
    - name: value
      type: integer
      description: "0=disable loop out, 1=enable (default)"

- id: lop_set
  label: Lamp Selection (Limited Power)
  kind: action
  command: "(LOP {lamp})"
  params:
    - name: lamp
      type: integer
      description: "1=A1, 2=A2, 3=A3, 4=B1, 5=B2, 6=B3. Disabled while power on."

- id: lop_mult_set
  label: Lamp Selection (Multi-bitmap)
  kind: action
  command: "(LOP+MULT {value})"
  params:
    - name: value
      type: integer
      description: "1-63 bitmapped: bit0=A1..bit5=B3; 63=all active. Full power only."

- id: lpl_set
  label: Lamp Life (hours)
  kind: action
  command: "(LPL {hours})"
  params:
    - name: hours
      type: integer
      description: "Any positive number"

- id: lpp_set
  label: Lamp Power (watts)
  kind: action
  command: "(LPP {power})"
  params:
    - name: power
      type: integer
      description: "Watts; dependent on lamp type. Subject to LPP?m range."

- id: lpp_range
  label: Query Lamp Power Min/Max
  kind: query
  command: "(LPP?m)"
  params: []

- id: lvo_range
  label: Query Lens Vertical Min/Max
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
      description: "Numeric value subject to LVO?m range"

- id: msp_query
  label: Query OSD Menu Position Preset
  kind: query
  command: "(MSP?)"
  params: []

- id: msp_set
  label: Set OSD Menu Position Preset
  kind: action
  command: "(MSP {value})"
  params:
    - name: value
      type: integer
      description: "0=Top left, 1=Top center, 2=Top right, 3=Center left, 4=Center, 5=Center right, 6=Bottom left, 7=Bottom center, 8=Bottom right"

- id: net_set_static
  label: Set Static Network Settings
  kind: action
  command: "(NET \"{ip}\" \"{subnet}\" \"{gateway}\")"
  params:
    - name: ip
      type: string
      description: "IP address string"
    - name: subnet
      type: string
      description: "Subnet mask string"
    - name: gateway
      type: string
      description: "Optional gateway string"

- id: net_dgrp_set
  label: Set Device Group
  kind: action
  command: "(NET+DGRP \"{group}\")"
  params:
    - name: group
      type: string
      description: "Group name string"

- id: net_dhcp_set
  label: Enable DHCP
  kind: action
  command: "(NET+DHCP 1)"
  params: []

- id: net_eth0_query
  label: Query IP Address
  kind: query
  command: "(NET+ETH0?)"
  params: []

- id: net_gate_query
  label: Query Gateway Address
  kind: query
  command: "(NET+GATE?)"
  params: []

- id: net_host_set
  label: Set Projector Hostname
  kind: action
  command: "(NET+HOST \"{name}\")"
  params:
    - name: name
      type: string
      description: "Projector hostname (reachable as <name>.local)"

- id: net_mac0_query
  label: Query Ethernet MAC Address
  kind: query
  command: "(NET+MAC0?)"
  params: []

- id: net_port_query
  label: Query Christie Serial TCP Port
  kind: query
  command: "(NET+PORT?)"
  params: []

- id: net_sub0_query
  label: Query Netmask
  kind: query
  command: "(NET+SUB0?)"
  params: []

- id: net_swit_set
  label: Network Switching Mode
  kind: action
  command: "(NET+SWIT {value})"
  params:
    - name: value
      type: integer
      description: "0=Split (default), 1=All ports joined, 2=HDBaseT joined with Ethernet"

- id: osd_query
  label: Query OSD State
  kind: query
  command: "(OSD?)"
  params: []

- id: osd_set
  label: OSD Enable
  kind: action
  command: "(OSD {value})"
  params:
    - name: value
      type: integer
      description: "0=hide OSD, 1=display OSD (default)"

- id: otr_query
  label: Query Output Resolution
  kind: query
  command: "(OTR?)"
  params: []

- id: otr_hres_query
  label: Query Maximum Columns
  kind: query
  command: "(OTR+HRES?)"
  params: []

- id: otr_vres_query
  label: Query Maximum Rows
  kind: query
  command: "(OTR+VRES?)"
  params: []

- id: png_query
  label: Ping / Projector Info
  kind: query
  command: "(PNG?)"
  params: []

- id: pro_list
  label: List Profiles
  kind: query
  command: "(PRO?L)"
  params: []

- id: pro_set
  label: Select Profile
  kind: action
  command: "(PRO {x})"
  params:
    - name: x
      type: integer
      description: "0=Default, 1..10=custom profiles"

- id: pwr_query
  label: Query Power State
  kind: query
  command: "(PWR?)"
  params: []

- id: pwr_set
  label: Set Power
  kind: action
  command: "(PWR {value})"
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"

- id: pwr_elec_set
  label: Power Electronics Override
  kind: action
  command: "(PWR+ELEC {value})"
  params:
    - name: value
      type: integer
      description: "0=disable electronics override, 1=enable. Cannot be set during cool down."

- id: ral_set
  label: Remote Access Level (Ethernet)
  kind: action
  command: "(RAL {value})"
  params:
    - name: value
      type: integer
      description: "0=No Access, 1=Login Required, 2=Free Access (default)"

- id: ral_prta_set
  label: Remote Access Level (RS232 Port)
  kind: action
  command: "(RAL+PRTA {value})"
  params:
    - name: value
      type: integer
      description: "Access-level values and default are not stated in the supplied source."

- id: rbt_run
  label: Reboot Projector
  kind: action
  command: "(RBT 111)"
  params: []

- id: sdi_set
  label: SDI Payload Override
  kind: action
  command: "(SDI {value})"
  params:
    - name: value
      type: integer
      description: "0=Auto Detect, 1=Custom, 2-7 predefined 3G-A SMPTE 352M payloads"

- id: sdi_payl_set
  label: SDI Custom Payload
  kind: action
  command: "(SDI+PAYL \"{customString}\")"
  params:
    - name: customString
      type: string
      description: "4-byte hex string big-endian, e.g. \"04C20500\". Applies when SDI=1 (custom)."

- id: shu_query
  label: Query Shutter State
  kind: query
  command: "(SHU?)"
  params: []

- id: shu_set
  label: Set Shutter
  kind: action
  command: "(SHU {value})"
  params:
    - name: value
      type: integer
      description: "0=open shutter, 1=close shutter (default)"

- id: sin_list
  label: List Available Inputs
  kind: query
  command: "(SIN?L)"
  params: []

- id: sin_set
  label: Select Active Input
  kind: action
  command: "(SIN {input})"
  params:
    - name: input
      type: integer
      description: "Input subject to range returned by SIN?L"

- id: sin_port_set
  label: Select Input Port Configuration
  kind: action
  command: "(SIN+PORT {config})"
  params:
    - name: config
      type: integer
      description: "1=One-Port (default)"

- id: snm_lamp_set
  label: SNMP Light Source Faults
  kind: action
  command: "(SNM+LAMP {value})"
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable (default)"

- id: snm_life_set
  label: SNMP Lamp Life Warnings
  kind: action
  command: "(SNM+LIFE {value})"
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable (default)"

- id: snm_powr_set
  label: SNMP Power State Traps
  kind: action
  command: "(SNM+POWR {value})"
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable (default)"

- id: snm_read_set
  label: SNMP Read Community Password
  kind: action
  command: "(SNM+READ \"{password}\")"
  params:
    - name: password
      type: string
      description: "Up to 32 chars; default \"private\""

- id: snm_sign_set
  label: SNMP Video Signal Traps
  kind: action
  command: "(SNM+SIGN {value})"
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable (default)"

- id: snm_stal_set
  label: SNMP Cooling/Fan Faults
  kind: action
  command: "(SNM+STAL {value})"
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable (default)"

- id: snm_tip1_set
  label: SNMP Trap IP 1
  kind: action
  command: "(SNM+TIP1 \"{ip}\")"
  params:
    - name: ip
      type: string
      description: "IP address; 0.0.0.0 disables (default)"

- id: snm_tip2_set
  label: SNMP Trap IP 2
  kind: action
  command: "(SNM+TIP2 \"{ip}\")"
  params:
    - name: ip
      type: string
      description: "IP address; 0.0.0.0 disables (default)"

- id: snm_tip3_set
  label: SNMP Trap IP 3
  kind: action
  command: "(SNM+TIP3 \"{ip}\")"
  params:
    - name: ip
      type: string
      description: "IP address; 0.0.0.0 disables (default)"

- id: snm_thrm_set
  label: SNMP Temperature Faults
  kind: action
  command: "(SNM+THRM {value})"
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable (default)"

- id: sor_set
  label: Screen Orientation
  kind: action
  command: "(SOR {value})"
  params:
    - name: value
      type: integer
      description: "0=Front, 1=Rear, 2=Front inverted, 3=Rear inverted"

- id: sps_colr_set
  label: Splash Screen Background Color
  kind: action
  command: "(SPS+COLR {value})"
  params:
    - name: value
      type: integer
      description: "1=Red, 2=Green, 3=Blue, 7=Black (default)"

- id: sst_query_all
  label: Query All Status Items
  kind: query
  command: "(SST?)"
  params: []

- id: sst_group_query
  label: Query Status Group Items
  kind: query
  command: "(SST+{group}?)"
  params:
    - name: group
      type: string
      description: "ALRM, CONF, SYST, SIGN, LAMP, VERS, TEMP, COOL, SERI"

- id: sst_item_query
  label: Query Specific Status Item
  kind: query
  command: "(SST+{group}?{index})"
  params:
    - name: group
      type: string
      description: "Status group 4-letter identifier"
    - name: index
      type: integer
      description: "Status item index within group"

- id: sth_mode_query
  label: Query Stealth Mode
  kind: query
  command: "(STH+MODE?)"
  params: []

- id: sth_mode_set
  label: Set Stealth Mode
  kind: action
  command: "(STH+MODE {value})"
  params:
    - name: value
      type: integer
      description: "0=disable (default), 1=enable"

- id: szp_set
  label: Size and Position (Aspect Ratio)
  kind: action
  command: "(SZP {value})"
  params:
    - name: value
      type: integer
      description: "0=auto (default), 1=None, 2=Full size, 3=Full width, 4=Full height"

- id: thm_set
  label: Video Thumbnails Enable
  kind: action
  command: "(THM {value})"
  params:
    - name: value
      type: integer
      description: "0=off, 1=on (default)"

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

- id: uid_query
  label: Query Current User
  kind: query
  command: "(UID?)"
  params: []

- id: uid_login
  label: User Login
  kind: action
  command: "(UID \"{username}\" \"{password}\")"
  params:
    - name: username
      type: string
      description: "User name string"
    - name: password
      type: string
      description: "Password string"

- id: uid_logout
  label: User Logout
  kind: action
  command: "(UID)"
  params: []

- id: ust_enbl_query
  label: Query UST Lens Keep-out
  kind: query
  command: "(UST+ENBL?)"
  params: []

- id: ust_enbl_set
  label: Set UST Lens Keep-out
  kind: action
  command: "(UST+ENBL {value})"
  params:
    - name: value
      type: integer
      description: "0=normal keep-out (default), 1=UST keep-out"

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
      description: "0=disable, 1=enable (default)"

- id: wrp_slct_list
  label: List Warp Maps
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
      description: "0=off, 1-4=warp maps, 11=on-board keystone"

- id: zom_range
  label: Query Lens Zoom Min/Max
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
      description: "Numeric position subject to ZOM?m range"
```

## Feedbacks
```yaml
# Observable query/reply states documented in the source.
# Each Feedback is a state value returned by a corresponding query action above.

- id: power_state
  type: enum
  values:
    - "000 (Standby)"
    - "001 (On)"
    - "010 (Cooling down)"
    - "011 (Warming up)"

- id: shutter_state
  type: enum
  values:
    - "0 (Open)"
    - "1 (Closed)"

- id: rs232_baud
  type: enum
  values:
    - "1 (2400)"
    - "2 (9600)"
    - "3 (19200)"
    - "4 (38400)"
    - "5 (57600)"
    - "6 (115200)"

- id: lamp_history_entry
  type: string
  description: |
    <entry> <install date> <serial #> <lamp type> <strikes> <failed strikes>
    <failed re-strikes> <unexpected lamp offs> <pre-installation hours> <total lamp hours>

- id: png_info
  type: string
  description: "<type> <major> <minor> <build>; type 55 = Boxer"

- id: status_item
  type: string
  description: "(SST+<group>!<index> <state> \"<value>\" \"<description>\"); state 000=OK, 001=Warning, 002=Error"

- id: error_code
  type: enum
  values:
    - "3 (Invalid parameter)"
    - "4 (Too many parameters)"
    - "5 (Too few parameters)"
    - "6 (Channel not found)"
    - "7 (Command not executed)"
    - "8 (Checksum error)"
    - "9 (Unknown request)"
    - "10 (Error receiving serial data)"
    - "101 (Control not found)"
    - "102 (Subcontrol not found)"
    - "103 (Wrong control type)"
    - "104 (Invalid value)"
    - "105 (Disabled control)"
    - "106 (Invalid language)"
    - "107 (Exceeded list size)"
    - "110 (Communication timeout)"
    - "111 (Communications failure)"
    - "112 (Failed to set hardware)"
    - "113 (Bad file)"
    - "114 (Memory failure)"
    - "115 (Not implemented)"
    - "116 (Invalid security)"
    - "117 (Invalid access group)"
    - "118 (System busy)"
```

## Variables
```yaml
# Settable parameters that are not discrete actions but continuous/configuration values.
# They are still operated via the Actions above; this section catalogues the
# underlying state variables for controller binding purposes.

- id: brightness_ambient_correction
  type: integer
  description: "ALC value (-100..100). Operated via alc_set."

- id: auto_power_on
  type: boolean
  description: "APW 0/1"

- id: base_gamma_curve
  type: integer
  description: "BGC value (0=sRGB, 2=Power Law, 3=M-Series, 4=ITU-R BT.1886)"

- id: gamma_exponent
  type: integer
  description: "GAM 1000..3000 (only meaningful when BGC=2)"

- id: gamma_max_luminance
  type: integer
  description: "GAM+MAXL 100..2000 (BT.1886)"

- id: gamma_min_luminance
  type: integer
  description: "GAM+MINL 0..1000 (BT.1886)"

- id: gamma_slope
  type: integer
  description: "GAM+SLOP 1..100"

- id: color_space
  type: integer
  description: "CSP 0..4"

- id: color_enable
  type: integer
  description: "CLE 0..6"

- id: sharpness_detail
  type: integer
  description: "DTL 0..100"

- id: contrast_offset
  type: integer
  description: |
    Contrast control (CRM) documented in source as a sample message but its
    dedicated section is not present in this excerpt; referenced in the
    message-format description. See CRM in the full Boxer 2K Technical Reference.
  # UNRESOLVED: full CRM parameter range not in the supplied excerpt.

- id: lamp_power_watts
  type: integer
  description: "LPP value (watts); subject to LPP?m for the installed lamp type"

- id: lamp_life_hours
  type: integer
  description: "LPL value (positive hours)"

- id: lamp_multiplex
  type: integer
  description: "LOP+MULT 1..63 bitmap; see LOP+MULT valid-values table"

- id: frame_delay
  type: integer
  description: "FRD 1000..3000 (1/1000 frame units); 2000 default"

- id: edid_override_rate
  type: integer
  description: "EDO {24,25,30,48,50,60}"

- id: blanking_pct_top
  type: integer
  description: "BLK+TOPP 0..250"

- id: blanking_pct_bottom
  type: integer
  description: "BLK+BOTP 0..250"

- id: blanking_pct_left
  type: integer
  description: "BLK+LFTP 0..250"

- id: blanking_pct_right
  type: integer
  description: "BLK+RGTP 0..250"

- id: black_level_blend
  type: integer
  description: "EBB+SLCT value (0..4 or 11)"

- id: edge_blend
  type: integer
  description: "EBL+SLCT value (0..4 or 11)"

- id: warp_map
  type: integer
  description: "WRP+SLCT value (0..4 or 11)"

- id: language
  type: integer
  description: "LOC+LANG 0..8"

- id: temperature_units
  type: integer
  description: "LOC+TEMP 0=Celsius, 1=Fahrenheit"

- id: projector_address
  type: integer
  description: "ADR 0..999; 65535 reserved broadcast"

- id: screen_orientation
  type: integer
  description: "SOR 0..3"

- id: size_position_aspect
  type: integer
  description: "SZP 0..4"

- id: loop_out_enable
  type: boolean
  description: "LOE 0/1"

- id: ddd_enable
  type: boolean
  description: "DDD 0/1 (Dual-Link DVI enable)"

- id: artnet_enabled
  type: boolean
  description: "DMX+ENBL 0/1"

- id: artnet_universe
  type: integer
  description: "DMX+UNVS 0..15"

- id: artnet_subnet
  type: integer
  description: "DMX+SUBN 0..15"

- id: artnet_net
  type: integer
  description: "DMX+NETS 0..127"

- id: artnet_base_channel
  type: integer
  description: "DMX+CHAN 1..488"

- id: christie_link_slot1
  type: boolean
  description: "FIB+SLTA 0/1"

- id: christie_link_slot2
  type: boolean
  description: "FIB+SLTB 0/1"

- id: ustlens_keepout
  type: boolean
  description: "UST+ENBL 0/1"

- id: input_port_config
  type: integer
  description: "SIN+PORT 1=One-Port (default)"

- id: active_input
  type: integer
  description: "SIN input; subject to SIN?L"

- id: hostname
  type: string
  description: "NET+HOST"

- id: device_group
  type: string
  description: "NET+DGRP"

- id: christie_tcp_port
  type: integer
  description: "NET+PORT? returns port; 1024..49151 with 3003 reserved"

- id: net_switch_mode
  type: integer
  description: "NET+SWIT 0/1/2"

- id: dhcp_enabled
  type: boolean
  description: "NET+DHCP 1 enables"

- id: keyst_gain_compensation
  type: boolean
  description: "WRP+KGAN 0/1"

- id: profile_index
  type: integer
  description: "PRO 0..10"

- id: osd_enabled
  type: boolean
  description: "OSD 0/1"

- id: stealth_mode
  type: boolean
  description: "STH+MODE 0/1"

- id: video_thumbnails
  type: boolean
  description: "THM 0/1"

- id: freeze
  type: boolean
  description: "FRZ 0/1"

- id: film_mode_detect
  type: boolean
  description: "FMD 0/1"

- id: async_messages_enable
  type: boolean
  description: "EME 0/1"

- id: splash_screen_color
  type: integer
  description: "SPS+COLR 1/2/3/7"

- id: menu_position_preset
  type: integer
  description: "MSP 0..8"

- id: ir_front_enable
  type: boolean
  description: "KEN+FRNT 0/1"

- id: ir_rear_enable
  type: boolean
  description: "KEN+REAR 0/1"

- id: ir_hdbt_enable
  type: boolean
  description: "KEN+HDBT 0/1"

- id: wired_keypad_enable
  type: boolean
  description: "KEN+WIRE 0/1"

- id: remote_access_level
  type: integer
  description: "RAL 0/1/2"

- id: rs232_access_level
  type: integer
  description: "RAL+PRTA; values and default not stated in the supplied source"

- id: sdi_payload_override
  type: integer
  description: "SDI 0..7"

- id: sdi_custom_payload_hex
  type: string
  description: "SDI+PAYL 4-byte hex big-endian string"

- id: snm_lamp_traps
  type: boolean
  description: "SNM+LAMP 0/1"

- id: snm_life_traps
  type: boolean
  description: "SNM+LIFE 0/1"

- id: snm_power_traps
  type: boolean
  description: "SNM+POWR 0/1"

- id: snm_signal_traps
  type: boolean
  description: "SNM+SIGN 0/1"

- id: snm_cooling_traps
  type: boolean
  description: "SNM+STAL 0/1"

- id: snm_temperature_traps
  type: boolean
  description: "SNM+THRM 0/1"

- id: snm_read_community
  type: string
  description: "SNM+READ; max 32 chars; default \"private\""

- id: snm_trap_ip1
  type: string
  description: "SNM+TIP1"

- id: snm_trap_ip2
  type: string
  description: "SNM+TIP2"

- id: snm_trap_ip3
  type: string
  description: "SNM+TIP3"
```

## Events
```yaml
# Asynchronous messages the projector can emit. EME controls whether these are sent.
# Message format examples per source.

- id: card_detected
  message: '(65535 00000 FYI01901 "Card x detected")'
  description: "Card insertion in slot x while video electronics are on."

- id: card_removed
  message: '(65535 00000 FYI01901 "Card x removed")'
  description: "Card removal while video electronics are on."

- id: date_changed
  message: '(65535 00000 FYI00916 "Setting Date to YYYY/MM/DD")'

- id: time_changed
  message: '(65535 00000 FYI00916 "Setting Time to hh:mm:ss")'

- id: factory_defaults_performed
  message: '(65535 00000 FYI00919 "All settings have been restored to their factory defaults. Reboot is required to take effect.")'

- id: network_changed
  message: '(65535 00000 FYI00915 "Configured network: IP:... Mask:... Gateway:...")'
  description: "Triggered by operator changes, DHCP lease renewal, or cable plug/unplug."

- id: status_ok_transition
  message: '(65535 00000 FYI00000 "(SST+LAMP?001) Lamp Hours = ...")'
  description: "Status item transitioned to/from warning/error."

- id: status_warning
  message: '(65535 00000 ERR00000 "System Warning: ...")'

- id: status_error
  message: '(65535 00000 ERR00000 "System Error: ...")'

- id: ack_ok
  message: '$'
  description: "Simple acknowledgment returned after processing a $ prefixed set message."

- id: ack_fail
  message: '^'
  description: "NAK returned when an acknowledged set message cannot be processed (invalid parameters, timeout, etc.)."

- id: xon
  message: "11h"
  description: "Sent by projector to instruct controller to resume transmission (Xon)."

- id: xoff
  message: "13h"
  description: "Sent by projector to instruct controller to cease transmission (Xoff)."
```

## Macros
```yaml
# Multi-step sequences explicitly described in source.
# The source documents BST (self test), LCB (lens calibration), and RBT/DEF (reboot / factory defaults) as guarded multi-step commands.

- id: lens_calibration
  description: "Run lens motor calibration; requires projector on."
  steps:
    - "(LCB 1)"

- id: lens_home
  description: "Return lens motors to home and zero positions."
  steps:
    - "(LCB+HOME)"

- id: reboot_projector
  description: "Reboot projector (only in standby)."
  steps:
    - "(RBT 111)"

- id: factory_defaults
  description: "Reset to factory defaults; deletes user profiles, warps, blends; resets network to DHCP."
  steps:
    - "(DEF 111)"

- id: enable_electronics_in_standby
  description: "Keep video electronics on while lamp is off."
  steps:
    - "(PWR+ELEC 1)"
```

## Safety
```yaml
confirmation_required_for:
  - "(DEF 111)"  # requires literal magic number 111
  - "(RBT 111)"  # requires literal magic number 111
interlocks:
  - "(PWR 0) fails if housekeeping board has failed and projector is in latched-on state."
  - "(LOP {lamp}) disabled while projector is in Power On state; LOP+MULT only available in full power mode."
  - "(LCB 1) only enabled when projector is on."
  - "(FCS/LHO/LMV/LVO/ZOM) only enabled when projector is on."
  - "(BDR+PRTA) requires service-level access."
  - "(CCA+RSET, CCA+SAVE, CCA+RPxx/RGxx/RBxx/RWxx native-primary settings) service-level access only."
  - "(SIN, SIN+PORT) only available if video electronics are on."
  - "(ALC, BGC, GAM, GAM+SLOP, DTL, CLE, CSP, FRD, FRZ, EBB+SLCT, EBL+SLCT, EDO, FMD, ITP*, ETP, LOE, SDI, SDI+PAYL, SPS+COLR, SZP, THM, SOR, WRP+SLCT) only available if video electronics are on."
  - "(BST) Do not execute while projector is warming up."
  - "(UST+ENBL {value}) resets lens to default home position when changed."
# UNRESOLVED: explicit electrical/voltage safety warnings for the projector itself
# are referenced as residing in the companion Boxer Product Safety Guide
# (P/N: 020-101780-XX), which is not part of this excerpt.
```

## Notes
- **Message framing.** Every command begins with `(` and ends with `)`. Optional prefixes between the start bracket and the function code: `$` (simple acknowledgment), `#` (full/echo acknowledgment), `&` (checksum; last parameter is the low-byte sum of ASCII values between `(` and the start of the checksum, not including either). Optional projector-address digits may also precede the function code.
- **Reply punctuation.** Request: `?` directly after function code or `+subcode`. Reply: `!` directly after function code or `+subcode`. The first reply data parameter has no space after `!`; subsequent parameters are space-separated. Set messages allow an optional space after the function code/subcode.
- **Negative numbers.** A space is required between the code/subcode and a leading-minus value (e.g. `(CRM -2)` is acceptable, `(CRM-2)` is not).
- **Data padding.** Reply values are fixed length per parameter, zero-padded on the left; the minimum parameter size is 3 characters. Set messages do not need zero-padding. Negative signs reduce the digit count by one to make space.
- **Special characters in text.** Quotation marks, backslashes, brackets, line breaks, and arbitrary byte codes have two-character combinations (`\"`, `\\`, `\(`, `\)`, `\n`, `\h##`).
- **Flow control.** Projector sends `13h` (Xoff) when its input buffer is full; controller must stop after at most 10 additional bytes. Projector sends `11h` (Xon) when ready. The projector will not send more than three characters after receiving `13h`.
- **Network notes.** Default Ethernet behavior is DHCP-on. Static configuration is via `NET "<ip>" "<subnet>" "<gateway>"`. Hostname resolution: `<name>.local`. Christie recommends the Ethernet port on the IMXB for the control connection — the HDBaseT port is limited to 100 Mb/s.
- **TCP port.** Default Christie serial protocol over Ethernet is port 3002; `NET+PORT?` returns the configured port; 3003 is reserved.
- **Authentication.** `UID "<username>" "<password>"` logs in; the source gives `user/user` as default service credentials. `RAL` sets Ethernet port access levels (0=No Access, 1=Login Required, 2=Free Access default). `RAL+PRTA` sets the RS232 port access level, but the supplied source does not state its values or default. `UID` alone logs out; `UID?` reports the current user and access level. The source does not specify whether authentication is required when opening a connection.
- **Lamp history.** Up to 50 entries, reverse-chronological; `HIS?L` lists and `HIS+LMP1?..LMP6?` reads entries per individual lamp memory module.
- **Status system.** `SST?` returns all status items across groups `ALRM, CONF, SYST, SIGN, LAMP, VERS, TEMP, COOL, SERI`. Per-item state codes: 000=OK, 001=Warning, 002=Error. Refer to the separate *Boxer 2K Status System Guide (P/N: 020-102418-XX)* for the full item catalog (not in this excerpt).
- **Lamp selection (LOP+MULT).** Bitmap 1..63 covering lamps A1..B3; see the LOP+MULT valid values table in the source for the lamp combinations available on each Boxer model variant.
- **Power state recovery.** If the housekeeping board fails while the projector is on, the projector remains on with fans running until AC is removed; `(PWR 0)` will fail in that state.
- **Model applicability.** This protocol applies across the Boxer 2K20, 2K25, and 2K30 variants. The lamp count and lamp-multiplex map (LOP+MULT) vary by model — the LOP+MULT valid-values table in the source enumerates which lamp combinations are meaningful on which model.
- **Serial port configuration.** RS-232-IN default baud rate is 115200. Source documents selectable baud rates 2400 / 9600 / 19200 / 38400 / 57600 / 115200 via `BDR+PRTA`. Other RS-232 line parameters (data bits, parity, stop bits, flow control) are not specified in this excerpt.
- **Inferred values.** Trait set inferred from the documented command families. RS-232 data bits, parity, stop bits, and flow control are not specified in the source. Authentication requirements when opening a connection are not specified in the source.
<!-- UNRESOLVED: per-command minimum/maximum ranges that depend on installed lens (LMV, FCS, ZOM, LHO, LVO) are returned by the corresponding `?m` query — they are not hard-coded constants. Firmware version compatibility and per-firmware command availability are referenced ("as of v1.1.0 software") but not enumerated. CRM (contrast) is referenced as a sample message but its dedicated section is outside this excerpt. The Boxer Product Safety Guide and Boxer 2K Status System Guide contain material outside this excerpt that may affect Safety/Feedbacks entries. -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102417-08-Christie-LIT-TECH-REF-Boxer-2K-API.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-102265-12-Christie-LIT-GUID-SET-Boxer-2K.pdf
retrieved_at: 2026-05-14T21:26:37.242Z
last_checked_at: 2026-10-07T13:16:16.078Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:16:16.078Z
matched_actions: 200
action_count: 200
confidence: medium
summary: "All 200 action units match source command rows with correct shapes; port 3002 and baud 115200 supported; only generic ?L/?E/?M query forms unmapped. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ITP?L"
- "ITP?E"
- "GAM?M"
- "full command catalogue is present but firmware-version-specific behavior (e.g. EVT/EVT?L format, BST list availability \"as of v1.1.0\") is noted in source. Minimum firmware not stated."
- "data_bits, parity, stop_bits, flow_control for RS-232 not stated in source."
- "full CRM parameter range not in the supplied excerpt."
- "explicit electrical/voltage safety warnings for the projector itself"
- "per-command minimum/maximum ranges that depend on installed lens (LMV, FCS, ZOM, LHO, LVO) are returned by the corresponding `?m` query — they are not hard-coded constants. Firmware version compatibility and per-firmware command availability are referenced (\"as of v1.1.0 software\") but not enumerated. CRM (contrast) is referenced as a sample message but its dedicated section is outside this excerpt. The Boxer Product Safety Guide and Boxer 2K Status System Guide contain material outside this excerpt that may affect Safety/Feedbacks entries."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
